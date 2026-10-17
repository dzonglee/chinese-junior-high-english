import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { authorCatalog } from '../scripts/lib/author-content.mjs'
import { courseProblems } from '../scripts/lib/course-validation.mjs'
import { Application, type Platform } from './app/application'
import { ContentRepository } from './services/content'
import { StateStore } from './services/storage'
import { emptyState, DAY } from './core/learning'
import { playable } from './core/sessions'
import { checkAnswer } from './core/answers'
import { contentProblems, questionProblems } from './core/validation'
import type { ContentCatalog, Lesson, Question } from './core/types'

const root = process.cwd(), read = (file: string) => JSON.parse(readFileSync(resolve(root, file), 'utf8'))
const source: ContentCatalog = authorCatalog(root), plan = read('content/course-plan.json'), coverage = read('content/course-coverage.json')
const manifest = read('dist/manifest.json')
function harness(lesson?: Lesson, simulatedAudio = false) {
  const topicIds = lesson ? [lesson.topicId] : source.topics.map(t => t.id)
  const all = source.questions.filter(q => topicIds.includes(q.topicId))
  const catalog: ContentCatalog = { ...source, topics: source.topics.filter(t => topicIds.includes(t.id)), lessons: lesson ? [lesson] : source.lessons, vocabulary: source.vocabulary.filter(w => topicIds.includes(w.topicId)), media: source.media.map(m => simulatedAudio ? { ...m, approvedByOwner: true, path: 'synthetic-playback:' + m.id } : { ...m }), questions: [], questionIndex: all.map(({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, mediaId, review }) => ({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, mediaId, review })) }
  const data = new Map<string, string>(), adapter = { read: (key: string) => data.get(key) ?? null, write: (key: string, value: string) => { data.set(key, value) }, remove: (key: string) => { data.delete(key) } }
  let now = Date.UTC(2026, 9, 17, 2), app: Application
  const store = new StateStore(adapter, catalog, now), grade = lesson ? Math.min(...lesson.grades) as 6 | 7 | 8 | 9 : 9
  store.save({ ...emptyState(now), profile: { cityId: '北京-北京', structure: grade === 6 ? '54' : '63', grade, term: catalog.topics.find(t => t.id === lesson?.topicId)?.course?.term ?? 'upper', editionId: grade === 6 ? 'pep-54' : 'pep-legacy', schoolYear: 2026, dailyMinutes: 20, createdAt: now } })
  const repo = new ContentRepository(catalog, manifest, async pack => readFileSync(resolve(root, 'dist/packs', pack.file), 'utf8'))
  const errors: string[] = []
  const platform: Platform = { now: () => now, navigate: (page, params) => app.open(page, params), back() {}, toast: text => { errors.push(text) }, confirm: async () => true, exportText: async () => {}, importText: async () => null, copy: async () => {}, play: async () => {}, stopAudio() {}, startRecording: async () => {}, stopRecording: async () => ({ path: 'synthetic-recording', durationMs: 1000 }), removeRecordings: async () => {} }
  app = new Application(repo, store, platform)
  return { app, repo, catalog, store, adapter, errors, advance: (ms: number) => { now += ms } }
}

it('covers every required original-course domain without orphan topics, questions or words', () => {
  expect(courseProblems(source, plan, coverage)).toEqual([])
  expect(contentProblems(source)).toEqual([])
  for (const entry of manifest) {
    const packed = read('dist/packs/' + entry.file)
    expect(packed.questions, entry.topicId).toEqual(source.questions.filter(q => q.topicId === entry.topicId))
  }
  const research = read('reference/source-register/curriculum/grammar-appendix.json').items
  expect(coverage.grammarObjectives.map((o: { id: string }) => o.id).sort()).toEqual(research.map((o: { id: string }) => o.id).sort())
  for (const objective of coverage.grammarObjectives) expect(objective.understandingOnly).toBe(research.find((r: { id: string }) => r.id === objective.id).plus_marked)
  const restoration = read('content/reading-tasks.json').restoration
  for (const [index, passage] of restoration.entries()) for (let gap = 1; gap <= 5; gap++) {
    const q = source.questions.find(q => q.id === `q-r-restoration-${index + 1}-${gap}`)!
    const paragraph = passage.text.split('\n').find((line: string) => line.includes(`[[${gap}]]`))
    expect(q.explanation.visual.segments[0].text).toBe(paragraph.replace(/\[\[(\d+)\]\]/g, (_: string, number: string) => Number(number) === gap ? '[本空]' : `[第 ${number} 空]`))
    expect(q.explanation.visual.segments[0].text).not.toMatch(/\[\[|\]\]/)
  }
})
it('rejects a missing theme lesson, orphan question, missing word review and missing grammar anchor', () => {
  const theme = source.topics.find(t => t.course?.themeId === 't29' && t.skill === 'writing')!
  const changed = { ...source, lessons: source.lessons.filter(l => l.topicId !== theme.id) }
  expect(courseProblems(changed, plan, coverage).join(' ')).toContain('Missing writing lesson for t29')
  expect(courseProblems({ ...source, questions: [...source.questions, { ...source.questions[0], id: 'orphan-question' }] }, plan, coverage).join(' ')).toContain('Question is outside')
  const word = source.vocabulary[0], id = `q-${word.topicId}-${word.id.slice(5)}-meaning`
  expect(courseProblems({ ...source, lessons: source.lessons.map(l => ({ ...l, delayedQuestionIds: l.delayedQuestionIds.filter(qid => qid !== id) })) }, plan, coverage).join(' ')).toContain('Vocabulary has no immediate and delayed check')
  const broken = { ...coverage, grammarObjectives: coverage.grammarObjectives.map((o: { id: string; questionIds: string[] }, i: number) => i ? o : { ...o, questionIds: ['missing-question'] }) }
  expect(courseProblems(source, plan, broken).join(' ')).toContain('Missing executable grammar anchors')
})
it('requires exact capitalization only when the authored task explicitly teaches it', () => {
  const q = source.questions.find(q => q.id === 'q-g-proper-nouns-002')!
  expect(checkAnswer(q, 'Monday')).toBe(true); expect(checkAnswer(q, 'monday')).toBe(false)
  const choice = source.questions.find(q => q.id === 'q-g-proper-nouns-001')!
  expect(questionProblems(choice)).toEqual([])
  expect(questionProblems({ ...choice, answer: { ...choice.answer, caseSensitive: false } }).join(' ')).toContain('choice texts must be distinct')
})
it('states the intended meaning before grading the corrected ambiguous grammar choices', () => {
  expect(source.questions.find(q => q.id === 'q-g-alternative-questions-001')!.stem).toContain('选一种')
  expect(source.questions.find(q => q.id === 'q-g-concession-001')!.stem).toContain('虽然天气冷')
  expect(source.questions.find(q => q.id === 'q-g-reflexives-005')!.options!.map(o => o.text)).not.toContain('them')
})
it('does not count spelling recall immediately after its meaning task exposed the word', async () => {
  const h = harness(), word = h.catalog.vocabulary[0], qid = `q-${word.topicId}-${word.id.slice(5)}-meaning`
  await h.app.action('start-question', qid)
  const q = h.repo.getQuestion(qid)!
  await h.app.action('choose', q.answer.option!); await h.app.action('check')
  h.app.open('vocabulary'); expect(h.app.render().word?.id).toBe(word.id)
  h.app.setField('wordAnswer', word.word); await h.app.action('word-check')
  expect(h.store.get().attempts.at(-1)?.evidence).toBe('assisted')
})
it('withholds shared-passage review feedback and evidence through reload until the whole review is submitted', async () => {
  const lesson = source.lessons.find(l => l.id === 'l-r-course-t01')!, h = harness(lesson)
  await h.app.action('start-lesson', lesson.id); await finish(h); h.advance(2 * DAY)
  await h.app.action('start-review', lesson.id + ':0')
  const before = h.store.get().attempts.length
  const state = h.store.get(), session = state.sessions[state.activeSessionId!], q = h.repo.getQuestion(session.questionIds[0])!
  await h.app.action('choose', q.answer.option!); await h.app.action('check')
  expect(h.app.render().question?.feedback).toBeUndefined(); expect(h.app.render().question?.explanation).toBeUndefined()
  expect(h.app.render().question?.options.every(o => o.state === '')).toBe(true)
  expect(h.store.get().attempts).toHaveLength(before)
  h.app.open('session'); expect(h.store.get().answerSeenAt?.[q.id]).toBeUndefined()
  await h.app.action('next'); await finish(h)
  const review = h.store.get().sessions[h.store.get().activeSessionId!]
  expect(h.store.get().attempts.filter(a => a.sessionId === review.id).every(a => a.delayed && a.evidence === 'independent')).toBe(true)
  await h.app.action('review-question', '0'); expect(h.app.render().question?.explanation).toBeTruthy()
})
it('filters, searches and pages the entire course without hiding pending media or changing the learner profile', async () => {
  const h = harness(); h.app.open('learn')
  expect(h.app.render().metrics[0].value).toBe(String(source.lessons.length)); expect(h.app.render().cards).toHaveLength(24)
  const first = h.app.render().cards[0].id; await h.app.action('course-next'); expect(h.app.render().cards[0].id).not.toBe(first)
  h.app.setField('courseTheme', 't29'); expect(h.app.render().cards).toHaveLength(4)
  h.app.setField('courseSkill', 'writing'); expect(h.app.render().cards).toHaveLength(1)
  h.app.setField('courseTerm', 'upper'); expect(h.app.render().cards).toHaveLength(0)
  h.app.setField('courseTerm', 'lower'); h.app.setField('courseQuery', '不存在的课程标题'); expect(h.app.render().cards).toHaveLength(0)
  h.app.open('learn'); h.app.setField('courseStatus', 'pending')
  expect(h.app.render().cards.length).toBeGreaterThan(0); expect(h.app.render().cards.every(c => c.actions.find(a=>a.id==='start-lesson')?.disabled)).toBe(true); expect(h.app.render().cards.every(c=>c.actions.find(a=>a.id==='open-lesson-studio')&&!c.actions.find(a=>a.id==='open-lesson-studio')!.disabled)).toBe(true)
  expect(h.store.get().profile?.grade).toBe(9)
})

async function finish(h: ReturnType<typeof harness>) {
  while (h.app.page === 'session') {
    const state = h.store.get(), session = state.sessions[state.activeSessionId!], q = h.repo.getQuestion(session.questionIds[session.current])!
    if (q.skill === 'listening') await h.app.action('play', q.mediaId!)
    if (q.kind === 'choice') await h.app.action('choose', q.answer.option!)
    else h.app.setField('answer', q.kind === 'order' ? JSON.stringify(q.answer.order) : q.answer.accepted?.[0] ?? q.answer.display)
    if (q.rubric) h.app.form.rubric = q.rubric.map(r => r.id).join(',')
    await h.app.action('check'); expect(h.app.error, q.id).toBe('')
    expect(h.store.get().sessions[state.activeSessionId!].answers[q.id].result?.correct, q.id).toBe(true)
    h.advance(1000); await h.app.action('next'); expect(h.app.error, q.id).toBe('')
  }
  expect(h.app.page).toBe('result')
}
describe('every authored lesson: checked pack, controller, persistence and distinct delayed review', () => {
  it.each(source.lessons)('$id', async lesson => {
    const blocked = lesson.questionIds.some(id => !playable(source.questions.find(q => q.id === id)!, source))
    if (blocked) {
      const real = harness(lesson); await real.app.action('start-lesson', lesson.id)
      expect(real.app.error).toContain('音频尚未准备好'); expect(real.store.get().attempts).toEqual([])
    }
    // Missing listening assets are simulated ONLY in this test. No source approval/file is changed.
    const h = harness(lesson, blocked); await h.app.action('start-lesson', lesson.id); expect(h.app.error, lesson.id).toBe('')
    await finish(h); expect(h.store.get().lessonDoneAt[lesson.id]).toBeTruthy()
    const restored = new StateStore(h.adapter, h.catalog).get(); expect(restored.lessonDoneAt[lesson.id]).toBeTruthy()
    expect(restored.attempts).toHaveLength(lesson.questionIds.length)
    h.advance(2 * DAY); await h.app.action('start-review', lesson.id + ':0'); expect(h.app.error, lesson.id).toBe('')
    await finish(h); expect(h.store.get().lessonReviews[lesson.id]).toContain(0)
    const finished = h.store.get(), review = finished.sessions[finished.activeSessionId!], attempts = finished.attempts.filter(a => a.sessionId === review.id)
    expect(attempts).toHaveLength(lesson.delayedQuestionIds.length)
    expect(attempts.every(a => lesson.delayedQuestionIds.includes(a.questionId))).toBe(true)
    expect(attempts.filter(a => a.evidence === 'independent').every(a => a.delayed)).toBe(true)
    expect(attempts.filter(a => a.evidence === 'self_review').every(a => !a.delayed)).toBe(true)
    expect(h.errors).toEqual([])
  })
})
