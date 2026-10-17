import { describe, expect, it, vi } from 'vitest'
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils'
import { sha256 } from '@noble/hashes/sha256'
import { Application, type Platform } from './application'
import { ContentRepository } from '../services/content'
import { StateStore, STORAGE_KEY, checkedState } from '../services/storage'
import { dailyPlan } from '../core/planner'
import { DAY, dueLessonReviews } from '../core/learning'
import { NOW, catalog, q, state } from '../test-fixtures'
import { markAudioPlayed, checkCurrent, startLesson, startExam, moveQuestion, useHint, saveAnswer, startSession, submitSession, reviewSubmittedAnswer } from '../core/sessions'
import { utf8Bytes } from '../core/utf8'
import { editionQuestion, editionText } from '../core/spelling'
import type { Question } from '../core/types'
import { createLessonTeaching, freshTeaching } from '../core/lesson-teaching'
function harness(overrides: Partial<Platform> = {}, configure?: (c: ReturnType<typeof catalog>) => void) {
  const c = catalog(); configure?.(c)
  const text = JSON.stringify({ version: 1, topicId: q.topicId, questions: c.questions }), data = new Map([[STORAGE_KEY, JSON.stringify(state())]])
  const adapter = { read: (key: string) => data.get(key) ?? null, write: (key: string, value: string) => { data.set(key, value) }, remove: (key: string) => { data.delete(key) } }
  const store = new StateStore(adapter, c, NOW), repo = new ContentRepository(c, [{ topicId: q.topicId, file: 'test.json', sha256: bytesToHex(sha256(utf8ToBytes(text))), questionIds: c.questions.map(q => q.id) }], async () => text)
  let now = NOW, app: Application
  const platform: Platform = { now: () => now, navigate: (page, params) => app.open(page, params), back() {}, toast() {}, confirm: async () => true, exportText: async () => {}, importText: async () => null, copy: async () => {}, play: async () => {}, stopAudio() {}, startRecording: async () => {}, stopRecording: async () => ({ path: 'recording:local', durationMs: 1000 }), removeRecordings: async () => {}, ...overrides }
  app = new Application(repo, store, platform)
  return { app, repo, store, data, adapter, c, platform, setNow: (value: number) => { now = value } }
}
describe('product entry points', () => {
  it('validates onboarding steps before creating a profile and preserves choices when going back', async () => {
    const h=harness();h.store.save({...h.store.get(),profile:null});h.app.open('onboarding')
    await h.app.action('setup-next');expect(h.app.render().error).toContain('所在城市和学校学制');expect(h.store.get().profile).toBeNull()
    h.app.setField('cityId',state().profile.cityId);h.app.setField('structure','63');await h.app.action('setup-next')
    expect(h.app.render().setup!.step).toBe(1);await h.app.action('setup-next');expect(h.app.render().error).toContain('教材版本')
    h.app.setField('grade','7');h.app.setField('editionId','pep-2024');await h.app.action('setup-back')
    expect(h.app.render().setup!.step).toBe(0);await h.app.action('setup-next');expect(h.app.render().fields.find(f=>f.name==='grade')!.value).toBe('7')
    await h.app.action('setup-next');expect(h.app.render().setup!.step).toBe(2);await h.app.action('save-profile')
    expect(h.app.render().id).toBe('home');expect(h.store.get().profile!.editionId).toBe('pep-2024')
  })
  it('offers consolidation after a completed studio without inventing a lesson pass', async () => {
    const h=harness(), lesson=h.c.lessons[0], model=createLessonTeaching(h.c,lesson,'american'), progress={...freshTeaching(model,NOW),step:5 as const}
    h.store.save({...h.store.get(),teaching:{[lesson.id]:progress}})
    h.app.open('home')
    expect(h.app.render().overview!.next!.action.id).toBe('start-lesson')
    expect(h.store.get().lessonDoneAt).toEqual({});expect(h.store.get().mastery).toEqual({})
    const action=h.app.render().overview!.next!.action;await h.app.action(action.id,action.value)
    expect(h.app.render().id).toBe('session')
  })
  it('routes listening preparation to filtered text courses and leaves evidence unchanged', async () => {
    const h=harness();h.app.open('practice')
    const entry=h.app.render().overview!.skills.find(s=>s.id==='listening')!
    expect(entry.text).toContain('音频待配');await h.app.action(entry.action.id,entry.action.value)
    expect(h.app.render().id).toBe('learn');expect(h.app.render().overview!.currentSkill).toBe('listening')
    expect(h.store.get().attempts).toEqual([]);expect(h.store.get().mastery).toEqual({})
  })
})
describe('recording lifecycle (simulated platform permissions and recorder)', () => {
  function deferred<T>() {
    let resolve!: (value: T) => void, reject!: (reason: Error) => void
    const promise = new Promise<T>((done, fail) => { resolve = done; reject = fail })
    return { promise, resolve, reject }
  }
  function speaking(overrides: Partial<Platform> = {}) {
    const h = harness(overrides, c => {
      c.questions[0] = { ...c.questions[0], kind: 'speaking', skill: 'speaking', options: undefined, answer: { display: 'Hello, I am Mia.' }, marks: 2,
        rubric: [{ id: 'content', label: '内容', guidance: '介绍自己。', marks: 1 }, { id: 'clarity', label: '表达', guidance: '让听者听清楚。', marks: 1 }] }
    })
    h.store.save(startSession(h.store.get(), [q.id], 'practice', NOW).state); h.app.open('session')
    return h
  }
  it('returns from hide before a pending start and saves its late recording only for its original question', async () => {
    const started = deferred<void>(), startRecording = vi.fn(() => started.promise), stopRecording = vi.fn(async () => ({ path: 'late.mp3', durationMs: 20 }))
    const h = speaking({ startRecording, stopRecording }), starting = h.app.action('record-start')
    await h.app.suspend(); await h.app.suspend()
    expect(stopRecording).not.toHaveBeenCalled()
    await h.app.action('record-start'); expect(startRecording).toHaveBeenCalledTimes(1)
    // A native page can reopen/change its session while an old permission flow settles.
    h.store.save(startSession(h.store.get(), [h.c.questions[1].id], 'practice', NOW + 1).state); h.app.open('session')
    started.resolve(); await starting
    expect(stopRecording).toHaveBeenCalledTimes(1); expect(h.app.render().question?.recording).toBe(false)
    expect(h.store.get().recordings).toEqual([expect.objectContaining({ questionId: q.id, path: 'late.mp3' })])
    expect(h.app.form.answer).toBe(''); expect(h.store.get().attempts).toEqual([]); expect(h.store.get().mastery).toEqual({}); expect(h.app.busy).toBe(false)
  })
  it('cancels a permission-aware adapter before it starts and allows a fresh start on resume', async () => {
    const permission = deferred<void>(), recorderStart = vi.fn(), stopRecording = vi.fn(async () => ({ path: 'fresh.mp3', durationMs: 1000 }))
    const startRecording = vi.fn(async (isCurrent?: () => boolean) => {
      await permission.promise
      if (!isCurrent?.()) return 'cancelled' as const
      recorderStart()
    })
    const h = speaking({ startRecording, stopRecording }), starting = h.app.action('record-start')
    await h.app.suspend(); h.app.open('session'); permission.resolve(); await starting
    expect(recorderStart).not.toHaveBeenCalled(); expect(stopRecording).not.toHaveBeenCalled(); expect(h.store.get().recordings).toEqual([])
    await h.app.action('record-start'); await h.app.action('record-start')
    expect(recorderStart).toHaveBeenCalledTimes(1); expect(startRecording).toHaveBeenCalledTimes(2); expect(h.app.render().question?.recording).toBe(true)
    await h.app.action('record-stop')
    expect(stopRecording).toHaveBeenCalledTimes(1); expect(h.store.get().recordings).toHaveLength(1); expect(h.store.get().attempts).toEqual([])
  })
  it('ignores a stale permission rejection and accepts the next request', async () => {
    const permission = deferred<void>(), toast = vi.fn(), h = speaking({ startRecording: () => permission.promise, toast })
    const starting = h.app.action('record-start'); await h.app.suspend()
    permission.reject(new Error('Permission denied after hide')); await starting
    expect(toast).not.toHaveBeenCalled(); expect(h.app.error).toBe(''); expect(h.app.busy).toBe(false)
    h.app.open('session'); h.platform.startRecording = async () => {}; await h.app.action('record-start')
    expect(h.app.render().question?.recording).toBe(true); await h.app.action('record-stop')
  })
  it('stops once across duplicate hide callbacks even while another action is busy', async () => {
    const copying = deferred<void>(), saved = deferred<{ path: string; durationMs: number }>(), stopRecording = vi.fn(() => saved.promise)
    const h = speaking({ copy: () => copying.promise, stopRecording })
    await h.app.action('record-start'); const copy = h.app.action('copy', 'example')
    const hide = h.app.suspend(), duplicateHide = h.app.suspend()
    expect(stopRecording).toHaveBeenCalledTimes(1)
    saved.resolve({ path: 'saved.mp3', durationMs: 1000 }); await Promise.all([hide, duplicateHide]); copying.resolve(); await copy
    expect(h.store.get().recordings).toHaveLength(1); expect(h.app.render().question?.recording).toBe(false); expect(h.store.get().attempts).toEqual([])
  })
  it('does not restart from a queued tap if another hide occurs while the previous recording saves', async () => {
    const saved = deferred<{ path: string; durationMs: number }>(), startRecording = vi.fn(async () => {})
    const h = speaking({ startRecording, stopRecording: () => saved.promise })
    await h.app.action('record-start'); const hide = h.app.suspend()
    h.app.open('session'); const restart = h.app.action('record-start'), hiddenAgain = h.app.suspend()
    saved.resolve({ path: 'first.mp3', durationMs: 1000 }); await Promise.all([hide, hiddenAgain, restart])
    expect(startRecording).toHaveBeenCalledTimes(1); expect(h.app.render().question?.recording).toBe(false); expect(h.store.get().recordings).toHaveLength(1)
  })
  it('measures the recording limit from actual start, excluding time spent granting permission', async () => {
    const permission = deferred<void>(), stopRecording = vi.fn(async () => ({ path: 'normal.mp3', durationMs: 59000 }))
    const h = speaking({ startRecording: () => permission.promise, stopRecording }), starting = h.app.action('record-start')
    h.setNow(NOW + 60000); permission.resolve(); await starting; await h.app.tick()
    expect(stopRecording).not.toHaveBeenCalled()
    h.setNow(NOW + 119000); await h.app.tick()
    expect(stopRecording).toHaveBeenCalledTimes(1); expect(h.store.get().recordings).toHaveLength(1)
  })
})
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

describe('listening and shared-passage evidence', () => {
  it('requires audio playback before checking a listening answer and preserves that evidence when saving', () => {
    const c = catalog(); c.questions[0] = { ...q, skill: 'listening', mediaId: 'm-one' }
    let s = startSession(state(), [q.id], 'practice', NOW).state
    s = saveAnswer(s, 'b', NOW + 1000)
    expect(() => checkCurrent(s, c, NOW + 2000)).toThrow('先播放音频')
    s = markAudioPlayed(s, q.id, NOW + 2000); s = saveAnswer(s, 'b', NOW + 3000); s = checkCurrent(s, c, NOW + 4000)
    expect(s.attempts[0].evidence).toBe('independent')
  })
  it('treats guesses in an unplayed timed listening task as assisted evidence', () => {
    const c = catalog(); c.questions[0] = { ...q, skill: 'listening', mediaId: 'm-one' }
    let s = startSession(state(), [q.id], 'exam', NOW).state
    s = submitSession(saveAnswer(s, 'b', NOW + 1000), c, NOW + 2000)
    expect(s.attempts[0].score).toBe(1); expect(s.attempts[0].evidence).toBe('assisted')
  })
  it('separates feedback-exposed sentence restoration from a full independent timed sitting', () => {
    const c = catalog(); c.questions[0].feedbackGroup = 'reading-group'; c.questions[1].feedbackGroup = 'reading-group'
    let s = startSession(state(), c.questions.slice(0, 2).map(q => q.id), 'practice', NOW).state
    s = checkCurrent(saveAnswer(s, 'b', NOW + 1000), c, NOW + 2000)
    s.sessions[s.activeSessionId!].current = 1
    s = checkCurrent(saveAnswer(s, 'b', NOW + 3000), c, NOW + 4000)
    expect(s.attempts.map(a => a.evidence)).toEqual(['independent', 'assisted'])
    let timed = startSession(state(), c.questions.slice(0, 2).map(q => q.id), 'exam', NOW).state
    timed = saveAnswer(timed, 'b', NOW + 1000); timed.sessions[timed.activeSessionId!].current = 1; timed = saveAnswer(timed, 'b', NOW + 2000); timed = submitSession(timed, c, NOW + 3000)
    expect(timed.attempts.map(a => a.evidence)).toEqual(['independent', 'independent'])
  })
})

describe('answer exposure across sessions', () => {
  it('does not convert a hint into independent credit by starting a fresh session', () => {
    const c = catalog(); let s = startSession(state(), [q.id], 'practice', NOW).state
    s = useHint(s, NOW + 1000); s = startSession(s, [q.id], 'practice', NOW + 2000).state
    s = checkCurrent(saveAnswer(s, 'b', NOW + 3000), c, NOW + 4000)
    expect(s.attempts[0].evidence).toBe('assisted')
  })
  it('records opening an old solution before a new attempt', async () => {
    const h = harness(); h.app.open('learn'); await h.app.action('start-lesson', 'l-be'); await h.app.action('choose', 'b'); await h.app.action('check')
    h.setNow(NOW + 3 * DAY); h.app.open('session'); await h.app.action('start-question', q.id); await h.app.action('choose', 'b'); await h.app.action('check')
    expect(h.store.get().attempts.at(-1)?.evidence).toBe('assisted')
  })
  it('spaces an overdue first review and its next stage instead of serving them back to back', () => {
    const c = catalog(), at = NOW + 10 * DAY
    let s = startLesson({ ...state(), lessonDoneAt: { 'l-be': NOW } }, c, 'l-be', at, 0).state
    s = checkCurrent(saveAnswer(s, 'b', at + 1000), c, at + 2000); s = moveQuestion(s, 1, at + 3000); s = checkCurrent(saveAnswer(s, 'b', at + 4000), c, at + 5000); s = submitSession(s, c, at + 6000)
    expect(s.lessonReviews['l-be']).toEqual([0]); expect(dueLessonReviews(s, at + DAY)).toEqual([])
    expect(dueLessonReviews(s, at + 6000 + 2 * DAY)).toEqual([{ lessonId: 'l-be', stage: 1 }])
  })
})

describe('verified-blueprint behavior using synthetic test data', () => {
  function setup() {
    const c = catalog(); c.blueprints = [{ id: 'blueprint-test-only', cityId: state().profile.cityId, examYear: 2029, structures: ['63'], minutes: 45, totalMarks: 12, sections: [{ id: 'grammar', title: 'Synthetic section', skill: 'grammar', count: 4, marksEach: 3 }], verification: 'official', sourceIds: ['synthetic-test-evidence'] }]
    return c
  }
  it('creates unique, changing selections for an exact city, structure and cohort', () => {
    const c = setup(), a = startExam(state(), c, c.blueprints[0].id, NOW, 1), b = startExam(state(), c, c.blueprints[0].id, NOW, 2)
    expect(new Set(a.session.questionIds).size).toBe(4); expect(a.session.questionIds).not.toEqual(b.session.questionIds); expect(a.session.deadlineAt).toBe(NOW + 45 * 60000)
    expect(Object.values(a.session.examMarks!)).toEqual([3, 3, 3, 3])
  })
  it('rejects a blueprint for a different graduation cohort', () => {
    const c = setup(); c.blueprints[0].examYear = 2027
    expect(() => startExam(state(), c, c.blueprints[0].id, NOW, 1)).toThrow('当前城市和届别')
  })
  it('rejects a neighboring city and a different school structure', () => {
    const c = setup(); c.blueprints[0].cityId = '河南-洛阳'; expect(() => startExam(state(), c, c.blueprints[0].id, NOW, 1)).toThrow('当前城市和届别')
    c.blueprints[0].cityId = state().profile.cityId; c.blueprints[0].structures = ['54']; expect(() => startExam(state(), c, c.blueprints[0].id, NOW, 1)).toThrow('当前城市和届别')
  })
  it('refuses incomplete sections without modifying the saved state', () => {
    const c = setup(), s = state(); c.blueprints[0].sections[0].skill = 'reading'
    expect(() => startExam(s, c, c.blueprints[0].id, NOW, 1)).toThrow('原创题量还不足'); expect(s.sessions).toEqual({})
  })
  it('rejects malformed mark totals before starting a timer', () => {
    const c = setup(); c.blueprints[0].totalMarks = 15
    expect(() => startExam(state(), c, c.blueprints[0].id, NOW, 1)).toThrow('分值尚未核对')
  })
})

describe('daily study target', () => {
  it('keeps new-word warmup optional when the course fills the chosen time', () => {
    const s = state(); s.profile.dailyMinutes = 10
    const plan = dailyPlan(catalog(), s, NOW)
    expect(plan[0].id).toBe('lesson'); expect(plan.find(t => t.id === 'words')?.optional).toBe(true)
    expect(plan.filter(t => !t.optional && !t.done).reduce((sum, t) => sum + t.minutes, 0)).toBeLessThanOrEqual(10)
  })
  it('keeps due vocabulary ahead of a new course without hiding the course', () => {
    const s = state(); s.profile.dailyMinutes = 10; s.words['word-test'] = { wordId: 'word-test', stage: 1, dueAt: NOW, lastAt: NOW - DAY, independentCorrect: 1, lapses: 0 }
    const plan = dailyPlan(catalog(), s, NOW)
    expect(plan[0].id).toBe('words'); expect(plan.find(t => t.id === 'lesson')?.optional).toBe(true)
  })
})

it('identifies checked capitalization errors from the saved answer and keeps word errors distinct', async () => {
 const h=harness({},c=>{const original=c.questions[0];c.questions[0]={...original,kind:'correction',options:undefined,stem:'改正句首大小写：(this) is my bag.',answer:{accepted:['This'],display:'This',caseSensitive:true},explanation:{...original.explanation,pitfall:'请核对远近和数量。'}}})
 h.app.open('learn');await h.app.action('start-lesson','l-be');h.app.setField('answer','this');await h.app.action('check');expect(h.app.render().question!.feedback).toContain('大小写')
 h.app.open('home');h.app.open('session');expect(h.app.render().question!.feedback).toContain('大小写')
 await h.app.action('retry');h.app.setField('answer','That');await h.app.action('check');expect(h.app.render().question!.feedback).not.toContain('大小写');expect(h.app.render().question!.feedback).toContain('远近和数量')
})
