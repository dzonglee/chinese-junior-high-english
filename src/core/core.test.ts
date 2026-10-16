import { describe, expect, it } from 'vitest'
import { checkAnswer, selfReviewScore, wordCount } from './answers'
import { chinaDate, currentSchoolYear, daysToConfirmedExam, examYear, localGradeLabel } from './cohort'
import { addMistake, DAY, dueLessonReviews, emptyState, masteryLabel, redoMistake, reviewWord, updateMastery } from './learning'
import { checkCurrent, moveQuestion, retryCurrent, saveAnswer, selectQuestions, startExam, startLesson, startSession, submitSession, useHint } from './sessions'
import { contentProblems, questionProblems } from './validation'
import type { Attempt, ContentCatalog, LearnerProfile, Question } from './types'

const NOW = Date.parse('2026-10-16T08:00:00+08:00')
const profile: LearnerProfile = { cityId: '河南-郑州', structure: '63', grade: 7, term: 'upper', editionId: 'pep-2024', dailyMinutes: 15, schoolYear: 2026, createdAt: NOW }
const q: Question = { id: 'q-test-001', topicId: 'g-be', skill: 'grammar', kind: 'choice', difficulty: 1, grades: [7], stem: 'Mia ___ ready for school.', options: [{ id: 'a', text: 'am' }, { id: 'b', text: 'is' }, { id: 'c', text: 'are' }], answer: { option: 'b', display: 'Mia is ready for school.' }, marks: 1, estimatedSeconds: 30,
  explanation: { strategy: '先确定主语的人称和单复数。', steps: [{ text: '主语是 Mia。', reason: '一个人的名字对应第三人称单数。' }, { text: '选 is。', reason: '现在时中，第三人称单数与 is 搭配。' }], distractors: [{ option: 'a', reason: 'am 只与 I 搭配。' }, { option: 'c', reason: 'are 与 you 或复数主语搭配。' }], pitfall: '不要因为人名不熟悉就忽略主语的单复数。', transfer: '把主语改成 Mia and Ben，be 动词应该怎么变？', visual: { kind: 'sentence', title: '主语决定 be 动词', segments: [{ text: 'Mia', role: 'subject', note: '第三人称单数' }, { text: 'is', role: 'verb' }, { text: 'ready for school', role: 'neutral' }], caption: '先看主语，再确定谓语。' } }, source: { kind: 'original', author: 'Project authors' }, review: 'draft' }
function catalog(): ContentCatalog {
  const questions = Array.from({ length: 8 }, (_, i) => ({ ...structuredClone(q), id: `q-test-00${i + 1}` }))
  return { version: 1, topics: [{ id: 'g-be', title: 'be 动词', skill: 'grammar', grades: [7], goal: '能根据主语选择 be 动词。', commonError: '主语和谓语不一致。', prerequisites: [], order: 1 }], questions, lessons: [{ id: 'l-be', topicId: 'g-be', title: '先看主语', grades: [7], objective: '选择正确的 be 动词。', questionIds: questions.slice(0, 4).map((x) => x.id), delayedQuestionIds: questions.slice(4, 6).map((x) => x.id), summary: ['I 用 am，单数用 is，其余情况辨认 are。'], estimatedMinutes: 8, order: 1, review: 'draft' }], vocabulary: [], media: [], cities: [{ id: profile.cityId, name: '郑州', province: '河南', stream: 'central-west' }], editions: [{ id: profile.editionId, name: '人教版', version: '2024', structures: ['63'], spelling: 'american', verification: 'unverified', sourceIds: [] }], books: [], blueprints: [] }
}
function state() { return { ...emptyState(NOW), profile } }

describe('answer evaluation', () => {
  it('checks exact choice IDs rather than text guesses', () => { expect(checkAnswer(q, 'b')).toBe(true); expect(checkAnswer(q, 'is')).toBe(false) })
  it('normalizes curly apostrophes but preserves missing apostrophes', () => {
    const item = { ...q, kind: 'blank' as const, answer: { accepted: ["don't"], display: "don't" } }
    expect(checkAnswer(item, ' DON’T ')).toBe(true); expect(checkAnswer(item, 'dont')).toBe(false)
  })
  it('can enforce capitalization where that is the target', () => {
    const item = { ...q, kind: 'correction' as const, answer: { accepted: ['I am ready.'], display: 'I am ready.', caseSensitive: true } }
    expect(checkAnswer(item, 'i am ready.')).toBe(false)
  })
  it('requires ordered token identities and rejects malformed input', () => {
    const item = { ...q, kind: 'order' as const, tokens: [{ id: 'i', text: 'I' }, { id: 'a', text: 'am' }], answer: { order: ['i', 'a'], display: 'I am' } }
    expect(checkAnswer(item, '["i","a"]')).toBe(true); expect(checkAnswer(item, '["a","i"]')).toBe(false); expect(checkAnswer(item, 'I am')).toBe(false)
  })
  it('does not machine-grade a writing response', () => expect(checkAnswer({ ...q, kind: 'writing' }, q.answer.display)).toBe(false))
  it('deduplicates self-review points and ignores unknown IDs', () => expect(selfReviewScore([{ id: 'a', label: '要点', marks: 2, guidance: '包含指定信息。' }], ['a', 'a', 'other'])).toBe(2))
  it('counts contractions and hyphenated words as single words', () => expect(wordCount("I'm a part-time helper.")).toBe(4))
})

describe('school routing', () => {
  it('uses the China calendar at the September boundary', () => { const at = Date.parse('2026-08-31T16:01:00Z'); expect(chinaDate(at).key).toBe('2026-09-01'); expect(currentSchoolYear(at)).toBe(2026) })
  it('retains the learner-confirmed school year for cohort arithmetic', () => expect(examYear(profile)).toBe(2029))
  it('keeps Shanghai preparatory grade separate from Shandong labels', () => { expect(localGradeLabel(6, '54', '上海-上海')).toBe('预备'); expect(localGradeLabel(6, '54', '山东-烟台')).toBe('初一') })
  it('never invents an exam date', () => expect(daysToConfirmedExam(profile, NOW)).toBeNull())
})

describe('spaced review and evidence', () => {
  it('does not promote early mistake practice into retained success', () => {
    const entry = addMistake(undefined, q.id, NOW)
    const early = redoMistake(entry, true, NOW + 1000, NOW + 2000)
    expect(early.streak).toBe(0); expect(early.dueAt).toBe(entry.dueAt)
    const due = redoMistake(entry, true, entry.dueAt, entry.dueAt + 1000)
    expect(due.streak).toBe(1); expect(due.stage).toBe(1)
  })
  it('resets a wrong redo without silently clearing the item', () => {
    const entry = { ...addMistake(undefined, q.id, NOW), streak: 3, stage: 3 }
    const wrong = redoMistake(entry, false, NOW + DAY, NOW + DAY)
    expect(wrong.streak).toBe(0); expect(wrong.cleared).toBe(false)
  })
  it('does not advance vocabulary on a reveal or an early repeat', () => {
    let item = reviewWord(undefined, 'w-test', true, false, NOW)
    expect(item.independentCorrect).toBe(0)
    item = reviewWord(item, 'w-test', true, true, NOW)
    expect(item.stage).toBe(1)
    const repeated = reviewWord(item, 'w-test', true, true, NOW + 1000)
    expect(repeated.stage).toBe(1)
  })
  it('reaches the sixty-day vocabulary interval', () => {
    let item = reviewWord(undefined, 'w-test', true, true, NOW)
    for (let i = 0; i < 8; i++) item = reviewWord(item, 'w-test', true, true, item.dueAt)
    expect(item.dueAt - item.lastAt).toBe(60 * DAY)
  })
  it('requires a successful delayed response for the retained label', () => {
    const attempt: Attempt = { id: 'a-test', questionId: q.id, topicId: q.topicId, skill: q.skill, answer: 'b', correct: true, score: 1, maxScore: 1, evidence: 'independent', firstTry: true, delayed: false, at: NOW, seconds: 10, sessionId: 's-test' }
    const current = { topicId: q.topicId, score: 90, attempts: 10, lastAt: NOW }
    expect(masteryLabel(updateMastery(current, attempt, 1), NOW)).toBe('当堂表现较好')
    expect(masteryLabel(updateMastery(current, { ...attempt, delayed: true }, 1), NOW)).toBe('延时复习通过')
    expect(updateMastery(current, { ...attempt, evidence: 'self_review' }, 1)).toEqual(current)
  })
  it('keeps a missed early lesson review ahead of the later one', () => {
    const s = { ...state(), lessonDoneAt: { 'l-be': NOW } }
    expect(dueLessonReviews(s, NOW + 10 * DAY)).toEqual([{ lessonId: 'l-be', stage: 0 }])
  })
})

describe('learning sessions', () => {
  it('records a wrong first try, allows recovery and preserves independent evidence', () => {
    const c = catalog(); let s = startSession(state(), [q.id], 'practice', NOW).state
    s = checkCurrent(saveAnswer(s, 'a', NOW + 1000), c, NOW + 2000)
    expect(s.attempts[0].evidence).toBe('independent'); expect(s.mistakes[q.id]).toBeDefined()
    s = retryCurrent(s, NOW + 3000); s = checkCurrent(saveAnswer(s, 'b', NOW + 4000), c, NOW + 5000)
    expect(s.attempts[1].evidence).toBe('assisted'); expect(s.mastery[q.topicId].attempts).toBe(1)
  })
  it('does not count a hint-assisted first answer as independent', () => {
    const c = catalog(); let s = startSession(state(), [q.id], 'practice', NOW).state
    s = useHint(s, NOW + 500); s = checkCurrent(saveAnswer(s, 'b', NOW + 1000), c, NOW + 2000)
    expect(s.attempts[0].evidence).toBe('assisted'); expect(s.mastery[q.topicId].attempts).toBe(0)
  })
  it('does not permit skipping unchecked lesson questions', () => {
    const s = startLesson(state(), catalog(), 'l-be', NOW).state
    expect(() => moveQuestion(s, 1, NOW + 1000)).toThrow('先检查')
  })
  it('does not allow fabricated early delayed review', () => expect(() => startLesson(state(), catalog(), 'l-be', NOW, 0)).toThrow('还没到时间'))
  it('does not grant independent credit for grinding the same item immediately', () => {
    const c = catalog(); let s = startSession(state(), [q.id], 'practice', NOW).state
    s = checkCurrent(saveAnswer(s, 'b', NOW + 1000), c, NOW + 2000)
    s = startSession(s, [q.id], 'practice', NOW + 3000).state
    s = checkCurrent(saveAnswer(s, 'b', NOW + 4000), c, NOW + 5000)
    expect(s.attempts[1].evidence).toBe('assisted')
  })
  it('hides feedback and refuses answers after a timed deadline', () => {
    const c = catalog(); let s = startSession(state(), [q.id], 'exam', NOW, { deadlineAt: NOW + 60_000 }).state
    expect(() => useHint(s, NOW + 1000)).toThrow('不显示提示')
    expect(() => checkCurrent(saveAnswer(s, 'b', NOW + 1000), c, NOW + 2000)).toThrow('交卷后')
    expect(() => saveAnswer(s, 'b', NOW + 60_000)).toThrow('时间到了')
    s = submitSession(s, c, NOW + 60_001)
    expect(s.attempts[0].score).toBe(0); expect(submitSession(s, c, NOW + 60_100)).toEqual(s)
  })
  it('uses the selected blueprint marks when grading', () => {
    const c = catalog(); let s = startSession(state(), [q.id], 'exam', NOW, { examMarks: { [q.id]: 3 } }).state
    s = saveAnswer(s, 'b', NOW + 1000); s = submitSession(s, c, NOW + 2000)
    expect(s.attempts[0].score).toBe(3)
  })
  it('blocks unverified or wrong-cohort local mocks', () => expect(() => startExam(state(), catalog(), 'missing', NOW, 1)).toThrow('核实完整'))
  it('does not silently repeat questions to satisfy an impossible builder request', () => expect(() => selectQuestions(catalog(), state(), { count: 20 }, 1)).toThrow('8 道题'))
})

describe('content compiler boundaries', () => {
  it('accepts the complete original fixture and its distinct delayed items', () => expect(contentProblems(catalog())).toEqual([]))
  it('rejects a missing distractor explanation', () => {
    const broken = structuredClone(q); broken.explanation.distractors.pop()
    expect(questionProblems(broken).join(' ')).toContain('each wrong option')
  })
  it('rejects repeated guided questions in delayed practice', () => {
    const c = catalog(); c.lessons[0].delayedQuestionIds[0] = q.id
    expect(contentProblems(c).join(' ')).toContain('must be distinct')
  })
  it('rejects invented rights and invalid sentence-order identities', () => {
    const broken = { ...q, source: { kind: 'copied', author: 'unknown' } }
    expect(questionProblems(broken).join(' ')).toContain('authorship/rights')
  })
})
