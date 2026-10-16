import { checkAnswer, selfReviewScore } from './answers'
import { DAY, dueLessonReviews, recordAttempt, redoMistake } from './learning'
import { examYear } from './cohort'
import type { Attempt, ContentCatalog, Evidence, LearnerState, LearningSession, Question, QuestionFilter, QuestionMetadata } from './types'

let serial = 0
export function makeId(prefix: string, now: number): string { return `${prefix}-${now.toString(36)}-${(++serial).toString(36)}` }
export function shuffled<T>(items: readonly T[], seed: number): T[] {
  const result = [...items]
  let x = seed >>> 0 || 123456789
  for (let i = result.length - 1; i > 0; i--) {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5
    const j = (x >>> 0) % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
export function questionById(catalog: ContentCatalog, state: LearnerState, id: string): Question | undefined {
  return catalog.questions.find((q) => q.id === id) ?? state.privateQuestions.find((q) => q.id === id)
}
export function playable(question: Pick<Question, 'skill' | 'mediaId'>, catalog: ContentCatalog): boolean {
  return question.skill !== 'listening' || catalog.media.some((m) => m.id === question.mediaId && m.approvedByOwner && !!m.path)
}
export function availableQuestions(catalog: ContentCatalog, state: LearnerState, filter: Omit<QuestionFilter, 'count'>): QuestionMetadata[] {
  const grade = state.profile?.grade
  if (!grade) throw new Error('请先确认年级和教材。')
  return [...(catalog.questionIndex ?? catalog.questions), ...state.privateQuestions].filter((q) => q.grades.includes(grade) &&
    (!filter.topicIds?.length || filter.topicIds.includes(q.topicId)) &&
    (!filter.skills?.length || filter.skills.includes(q.skill)) &&
    (!filter.kinds?.length || filter.kinds.includes(q.kind)) &&
    (!filter.difficulties?.length || filter.difficulties.includes(q.difficulty)) && playable(q, catalog))
}
export function selectQuestions(catalog: ContentCatalog, state: LearnerState, filter: QuestionFilter, seed: number): QuestionMetadata[] {
  const pool = availableQuestions(catalog, state, filter)
  if (!Number.isInteger(filter.count) || filter.count < 1 || filter.count > 100) throw new Error('题量请填写 1—100 之间的整数。')
  const count = filter.count
  if (pool.length < count) throw new Error(`当前条件下有 ${pool.length} 道题，请减少题量或放宽条件。`)
  return shuffled(pool, seed).slice(0, count)
}

export function startSession(state: LearnerState, questionIds: string[], mode: LearningSession['mode'], now: number, options: Partial<LearningSession> = {}): { state: LearnerState; session: LearningSession } {
  if (!questionIds.length || questionIds.length > 100 || new Set(questionIds).size !== questionIds.length) throw new Error('这组题暂时无法开始，请重新选题。')
  const session: LearningSession = { ...options, id: makeId('session', now), questionIds, mode, startedAt: now, current: 0, answers: {}, seed: options.seed ?? now >>> 0 }
  const entries = Object.values(state.sessions).sort((a, b) => b.startedAt - a.startedAt).slice(0, 39)
  const sessions = Object.fromEntries(entries.map((item) => [item.id, item]))
  sessions[session.id] = session
  return { session, state: { ...state, sessions, activeSessionId: session.id, updatedAt: now } }
}
export function startLesson(state: LearnerState, catalog: ContentCatalog, lessonId: string, now: number, reviewStage?: number): { state: LearnerState; session: LearningSession } {
  const lesson = catalog.lessons.find((item) => item.id === lessonId)
  if (!lesson || !state.profile || !lesson.grades.includes(state.profile.grade)) throw new Error('请先选择适合当前年级的课程。')
  if (reviewStage !== undefined && !dueLessonReviews(state, now).some((r) => r.lessonId === lessonId && r.stage === reviewStage)) throw new Error('这次延时复习还没到时间。可以先做普通练习。')
  const ids = reviewStage === undefined ? lesson.questionIds : lesson.delayedQuestionIds
  if (ids.some((id) => !questionById(catalog, state, id) || !playable(questionById(catalog, state, id)!, catalog))) throw new Error('这节课的音频尚未准备好，请先练其他内容。')
  return startSession(state, ids, reviewStage === undefined ? 'lesson' : 'review', now, { lessonId, reviewStage })
}

export function startExam(state: LearnerState, catalog: ContentCatalog, blueprintId: string, now: number, seed: number): { state: LearnerState; session: LearningSession } {
  const p = state.profile, blueprint = catalog.blueprints.find((b) => b.id === blueprintId)
  if (!p || !blueprint || blueprint.verification !== 'official' || blueprint.cityId !== p.cityId || blueprint.examYear !== examYear(p) || !blueprint.structures.includes(p.structure)) throw new Error('当前城市和届别还没有核实完整的试卷结构。可以先做自主限时练。')
  if (!Number.isFinite(blueprint.minutes) || blueprint.minutes <= 0 || !Number.isFinite(blueprint.totalMarks) || blueprint.totalMarks <= 0 || !blueprint.sections.length || blueprint.sections.some(s => !Number.isInteger(s.count) || s.count < 1 || !Number.isFinite(s.marksEach) || s.marksEach <= 0) || Math.abs(blueprint.sections.reduce((sum, section) => sum + section.count * section.marksEach, 0) - blueprint.totalMarks) > 1e-8) throw new Error('试卷分值尚未核对，暂时不能生成本地模考。')
  const used = new Set<string>(), ids: string[] = [], marks: Record<string, number> = {}
  for (const section of blueprint.sections) {
    const pool = shuffled((catalog.questionIndex ?? catalog.questions).filter((q) => q.grades.includes(p.grade) && q.skill === section.skill && !used.has(q.id) && playable(q, catalog)), seed + ids.length)
    if (pool.length < section.count) throw new Error('当前原创题量还不足以完整匹配这份试卷，请先做专项练习。')
    for (const q of pool.slice(0, section.count).sort((a, b) => a.difficulty - b.difficulty)) { ids.push(q.id); used.add(q.id); marks[q.id] = section.marksEach }
  }
  return startSession(state, ids, 'exam', now, { blueprintId, deadlineAt: now + blueprint.minutes * 60_000, examMarks: marks, seed })
}

function active(state: LearnerState): LearningSession {
  const session = state.activeSessionId ? state.sessions[state.activeSessionId] : undefined
  if (!session) throw new Error('没有正在进行的练习。')
  return session
}
function replaceSession(state: LearnerState, session: LearningSession, now: number): LearnerState { return { ...state, sessions: { ...state.sessions, [session.id]: session }, updatedAt: now } }
export function saveAnswer(state: LearnerState, answer: string, now: number): LearnerState {
  const session = active(state)
  if (session.submittedAt) throw new Error('这次练习已经结束。')
  if (session.deadlineAt && now >= session.deadlineAt) throw new Error('时间到了，请交卷查看结果。')
  const id = session.questionIds[session.current], previous = session.answers[id]
  if (previous?.checked) throw new Error('请先进入下一题，再继续作答。')
  const record = { answer: answer.slice(0, 5000), hints: previous?.hints ?? 0, attempts: previous?.attempts ?? 0, audioPlayed: previous?.audioPlayed, checked: false }
  return replaceSession(state, { ...session, answers: { ...session.answers, [id]: record } }, now)
}
export function markAudioPlayed(state: LearnerState, questionId: string, now: number): LearnerState {
  const session = active(state)
  if (session.submittedAt || (session.deadlineAt && now >= session.deadlineAt) || session.questionIds[session.current] !== questionId) return state
  const previous = session.answers[questionId] ?? { answer: '', hints: 0, attempts: 0, checked: false }
  return replaceSession(state, { ...session, answers: { ...session.answers, [questionId]: { ...previous, audioPlayed: true } } }, now)
}
export function useHint(state: LearnerState, now: number): LearnerState {
  const session = active(state)
  if (session.mode === 'exam') throw new Error('限时作答中不显示提示，交卷后再看解析。')
  if (session.submittedAt) throw new Error('这次练习已经结束。')
  const id = session.questionIds[session.current], previous = session.answers[id] ?? { answer: '', attempts: 0, hints: 0, checked: false }
  return replaceSession({ ...state, answerSeenAt: { ...state.answerSeenAt, [id]: now } }, { ...session, answers: { ...session.answers, [id]: { ...previous, hints: previous.hints + 1 } } }, now)
}

function makeAttempt(state: LearnerState, catalog: ContentCatalog, session: LearningSession, q: Question, answer: string, now: number, selfSelected?: string[]): Attempt {
  const prior = session.answers[q.id], selfReview = q.kind === 'writing' || q.kind === 'speaking'
  const firstTry = (prior?.attempts ?? 0) === 0
  const previousIndependent = [...state.attempts].reverse().find((a) => a.questionId === q.id && a.evidence === 'independent')
  const previousAttempt = [...state.attempts].reverse().find(a => a.questionId === q.id)
  const lastExposure = Math.max(previousAttempt?.at ?? 0, state.answerSeenAt?.[q.id] ?? 0)
  const repeatsImmediately = lastExposure && now - lastExposure < DAY
  const groupExposed = !!q.feedbackGroup && ((session.mode !== 'exam' && Object.entries(session.answers).some(([id, record]) => id !== q.id && record.checked && questionById(catalog, state, id)?.feedbackGroup === q.feedbackGroup)) || Object.entries(state.answerSeenAt ?? {}).some(([id, at]) => now - at < DAY && questionById(catalog, state, id)?.feedbackGroup === q.feedbackGroup))
  const evidence: Evidence = selfReview ? 'self_review' : !!answer.trim() && answer.trim() !== '[]' && (q.skill !== 'listening' || prior?.audioPlayed) && firstTry && !(prior?.hints) && !repeatsImmediately && !groupExposed ? 'independent' : 'assisted'
  const maxScore = session.examMarks?.[q.id] ?? q.marks
  const rawSelfScore = selfReviewScore(q.rubric ?? [], selfSelected ?? [])
  const rubricMax = (q.rubric ?? []).reduce((sum, p) => sum + p.marks, 0)
  const score = selfReview ? (rubricMax ? Math.round(rawSelfScore / rubricMax * maxScore * 10) / 10 : 0) : checkAnswer(q, answer) ? maxScore : 0
  const lastLessonAt = session.lessonId ? state.lessonDoneAt[session.lessonId] : undefined
  const delayed = evidence === 'independent' && (!lastExposure || session.startedAt - lastExposure >= 2 * DAY) && ((session.mode === 'review' && !!lastLessonAt && session.startedAt - lastLessonAt >= 2 * DAY) ||
    (session.mode === 'mistakes' && !!state.mistakes[q.id] && session.startedAt >= state.mistakes[q.id].dueAt) ||
    (!!previousIndependent && session.startedAt - previousIndependent.at >= 2 * DAY))
  const last = state.attempts[state.attempts.length - 1]
  return { id: makeId('attempt', now), questionId: q.id, topicId: q.topicId, skill: q.skill, answer, correct: score === maxScore, score, maxScore, evidence, firstTry, delayed,
    at: now, seconds: Math.max(0, Math.min(7200, Math.round((now - (last?.sessionId === session.id ? last.at : session.startedAt)) / 1000))), sessionId: session.id }
}

export function checkCurrent(state: LearnerState, catalog: ContentCatalog, now: number, rubric?: string[]): LearnerState {
  const session = active(state)
  if (session.mode === 'exam') throw new Error('交卷后才能核对答案。')
  if (session.submittedAt) throw new Error('这次练习已经结束。')
  const id = session.questionIds[session.current], q = questionById(catalog, state, id), record = session.answers[id]
  if (!q || !record?.answer.trim()) throw new Error('先写下你的答案。')
  if (q.skill === 'listening' && !record.audioPlayed) throw new Error('先播放音频，再检查自己的答案。')
  if (record.checked) return state
  const attempt = makeAttempt(state, catalog, session, q, record.answer, now, rubric)
  let next = recordAttempt(state, attempt, q.difficulty)
  if (session.mode === 'mistakes' && state.mistakes[id] && (!attempt.correct || attempt.evidence === 'independent')) {
    next = { ...next, mistakes: { ...next.mistakes, [id]: redoMistake(state.mistakes[id], attempt.correct && attempt.evidence === 'independent', session.startedAt, now) } }
  }
  return replaceSession({ ...next, answerSeenAt: { ...next.answerSeenAt, [id]: now } }, { ...session, answers: { ...session.answers, [id]: { ...record, attempts: record.attempts + 1, checked: true, result: attempt } } }, now)
}
export function retryCurrent(state: LearnerState, now: number): LearnerState {
  const session = active(state), id = session.questionIds[session.current], record = session.answers[id]
  if (session.mode === 'exam' || session.submittedAt || !record?.checked) return state
  return replaceSession(state, { ...session, answers: { ...session.answers, [id]: { answer: '', attempts: record.attempts, hints: record.hints + 1, audioPlayed: record.audioPlayed, checked: false } } }, now)
}

/** Subjective answers are reviewed after an exam; their scores stay explicitly self-marked. */
export function reviewSubmittedAnswer(state: LearnerState, catalog: ContentCatalog, now: number, rubric: string[]): LearnerState {
  const session = active(state), id = session.questionIds[session.current]
  const q = questionById(catalog, state, id), record = session.answers[id]
  if (!session.submittedAt || !q || !['writing', 'speaking'].includes(q.kind)) throw new Error('这道题不能进行交卷后自评。')
  if (record?.checked) return state
  const answer = record?.answer ?? ''
  const attempt = makeAttempt(state, catalog, session, q, answer, now, answer.trim() ? rubric : [])
  const next = recordAttempt(state, attempt, q.difficulty)
  return replaceSession(next, { ...session, answers: { ...session.answers, [id]: { answer, hints: 0, attempts: 1, checked: true, result: attempt } } }, now)
}
export function moveQuestion(state: LearnerState, index: number, now: number): LearnerState {
  const session = active(state)
  if (!Number.isInteger(index) || index < 0 || index >= session.questionIds.length) return state
  if (session.mode !== 'exam' && !session.submittedAt && index > session.current && !session.answers[session.questionIds[session.current]]?.checked) throw new Error('先检查这一题，再继续。')
  return replaceSession(state, { ...session, current: index }, now)
}

export function submitSession(state: LearnerState, catalog: ContentCatalog, now: number): LearnerState {
  const session = active(state)
  if (session.submittedAt) return state
  let next = state, answers = { ...session.answers }
  if (session.mode === 'exam') {
    for (const id of session.questionIds) {
      const q = questionById(catalog, state, id)
      if (!q) throw new Error('题目加载不完整，请重试，已作答案会保留。')
      if (q.kind === 'writing' || q.kind === 'speaking') continue
      const record = answers[id] ?? { answer: '', hints: 0, attempts: 0, checked: false }
      const attempt = makeAttempt(next, catalog, session, q, record.answer, now)
      next = recordAttempt(next, attempt, q.difficulty)
      answers[id] = { ...record, checked: true, attempts: 1, result: attempt }
    }
  } else if (session.questionIds.some((id) => !answers[id]?.checked)) throw new Error('还有题没检查，先完成这组练习。')
  if (session.lessonId && session.mode === 'lesson' && !next.lessonDoneAt[session.lessonId]) next = { ...next, lessonDoneAt: { ...next.lessonDoneAt, [session.lessonId]: now } }
  if (session.mode === 'review' && session.lessonId && session.reviewStage !== undefined) {
    const attempts = session.questionIds.map((id) => answers[id]?.result)
    if (attempts.every((a) => a?.correct && a.evidence === 'independent' && a.delayed)) {
      const stages = next.lessonReviews[session.lessonId] ?? []
      next = { ...next, lessonReviews: { ...next.lessonReviews, [session.lessonId]: [...new Set([...stages, session.reviewStage])] } }
    }
  }
  return replaceSession(next, { ...session, submittedAt: now, answers }, now)
}
