import { describe, expect, it } from 'vitest'
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils'
import { sha256 } from '@noble/hashes/sha256'
import { Application, type Platform } from './application'
import { ContentRepository } from '../services/content'
import { StateStore, STORAGE_KEY, checkedState } from '../services/storage'
import { NOW, catalog, q, state } from '../test-fixtures'
import { saveAnswer, startSession, submitSession, reviewSubmittedAnswer } from '../core/sessions'
import { utf8Bytes } from '../core/utf8'
import { editionQuestion, editionText } from '../core/spelling'
import type { Question } from '../core/types'
function harness() {
  const c = catalog(), text = JSON.stringify({ version: 1, topicId: q.topicId, questions: c.questions }), data = new Map([[STORAGE_KEY, JSON.stringify(state())]])
  const adapter = { read: (key: string) => data.get(key) ?? null, write: (key: string, value: string) => { data.set(key, value) }, remove: (key: string) => { data.delete(key) } }
  const store = new StateStore(adapter, c, NOW), repo = new ContentRepository(c, [{ topicId: q.topicId, file: 'test.json', sha256: bytesToHex(sha256(utf8ToBytes(text))), questionIds: c.questions.map(q => q.id) }], async () => text)
  let now = NOW, app: Application
  const platform: Platform = { now: () => now, navigate: (page, params) => app.open(page, params), back() {}, toast() {}, confirm: async () => true, exportText: async () => {}, importText: async () => null, copy: async () => {}, play: async () => {}, startRecording: async () => {}, stopRecording: async () => ({ path: 'recording:local', durationMs: 1000 }), removeRecordings: async () => {} }
  app = new Application(repo, store, platform)
  return { app, repo, store, data, adapter, c, setNow: (value: number) => { now = value } }
}
describe('application persistence and deadlines', () => {
  it('restores both the active answer and device recording after a local restart, but not portable import', async () => {
    const h = harness(); h.app.open('learn'); await h.app.action('start-lesson', 'l-be')
    h.app.setField('answer', 'b'); h.app.flush()
    h.store.save({ ...h.store.get(), recordings: [{ id: 'r-one', questionId: q.id, path: 'recording:local', createdAt: NOW, durationMs: 1000 }] })
    const restored = new StateStore(h.adapter, h.c, NOW + 1000)
    expect(restored.get().activeSessionId).toBeTruthy(); expect(restored.get().recordings).toHaveLength(1)
    expect(restored.get().sessions[restored.get().activeSessionId!].answers[q.id].answer).toBe('b')
    const portable = checkedState(restored.export(), h.c, NOW + 1000)
    expect(portable.activeSessionId).toBeNull(); expect(portable.recordings).toEqual([])
  })
  it('automatically grades only the last saved answer when time expires', async () => {
    const h = harness(); h.app.open('exam'); h.app.setField('count', '1'); h.app.setField('minutes', '5'); await h.app.action('start-custom')
    h.app.setField('answer', 'b'); h.app.flush(); h.setNow(NOW + 301000); h.app.setField('answer', 'a'); h.app.flush(); await h.app.tick()
    expect(h.app.page).toBe('result'); expect(h.store.get().attempts[0].answer).toBe('b'); expect(h.store.get().attempts[0].correct).toBe(true)
  })
  it('does not record empty exam answers as independent learning evidence', () => {
    const c = catalog(); const s = startSession(state(), [q.id], 'exam', NOW).state
    const submitted = submitSession(s, c, NOW + 1000)
    expect(submitted.attempts[0].score).toBe(0); expect(submitted.attempts[0].evidence).toBe('assisted')
  })
  it('preserves the first independently wrong answer after an assisted retry', async () => {
    const h = harness(); h.app.open('learn'); await h.app.action('start-lesson', 'l-be'); await h.app.action('choose', 'a'); await h.app.action('check'); await h.app.action('retry'); await h.app.action('choose', 'b'); await h.app.action('check')
    expect(h.store.get().attempts.map(a => a.evidence)).toEqual(['independent', 'assisted']); expect(h.store.get().mastery[q.topicId].attempts).toBe(1)
  })
})
describe('subjective exam scoring', () => {
  const writing: Question = { ...q, id: 'q-writing', kind: 'writing', skill: 'writing', options: undefined, answer: { display: 'A sample answer.' }, marks: 10, rubric: [{ id: 'content', label: '完整信息', guidance: '检查任务中的所有信息。', marks: 6 }, { id: 'language', label: '表达清楚', guidance: '检查句子是否清楚。', marks: 4 }] }
  it('leaves subjective marks pending until explicit self-review and never creates mastery evidence', () => {
    const c = catalog(); c.questions.push(writing)
    let s = startSession(state(), [writing.id], 'exam', NOW, { examMarks: { [writing.id]: 20 } }).state
    s = saveAnswer(s, 'My own answer.', NOW + 1000); s = submitSession(s, c, NOW + 2000)
    expect(s.attempts).toEqual([])
    s = reviewSubmittedAnswer(s, c, NOW + 3000, ['content'])
    expect(s.attempts[0].score).toBe(12); expect(s.attempts[0].evidence).toBe('self_review'); expect(s.mastery[q.topicId].attempts).toBe(0)
    expect(reviewSubmittedAnswer(s, c, NOW + 4000, ['content', 'language']).attempts).toHaveLength(1)
  })
  it('does not award self-review marks for an unanswered question', () => {
    const c = catalog(); c.questions.push(writing)
    let s = startSession(state(), [writing.id], 'exam', NOW).state
    s = submitSession(s, c, NOW + 1000); s = reviewSubmittedAnswer(s, c, NOW + 2000, ['content', 'language'])
    expect(s.attempts[0].score).toBe(0)
  })
})
describe('edition spelling', () => {
  it('adapts display and answers without changing IDs or erasing authored variants', () => {
    const adapted = editionQuestion({ ...q, kind: 'blank', options: undefined, stem: 'Our neighbour likes the community centre.', answer: { accepted: ['neighbour'], display: 'neighbour' } }, 'american')
    expect(adapted.id).toBe(q.id); expect(adapted.stem).toBe('Our neighbor likes the community center.'); expect(adapted.answer.accepted).toEqual(['neighbour', 'neighbor'])
  })
  it('keeps British noun practice and explicit spelling comparisons intact', () => {
    expect(editionText('Practice helps. Mia practises daily.', 'british')).toBe('Practice helps. Mia practises daily.')
    expect(editionText('英式 neighbour 对应美式 neighbor。', 'american')).toContain('neighbour')
  })
})

describe('native-compatible UTF-8', () => {
  it('matches standard encoding for Chinese explanations, emoji and isolated surrogates', () => {
    for (const value of ['Mia is ready.', '先看主语，再选 is。', 'A😀中', '\ud800x\udfff']) expect(utf8Bytes(value)).toEqual(new TextEncoder().encode(value))
  })
})
