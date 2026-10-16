import type { Attempt, ErrorReason, LearnerState, Mistake, TopicMastery, WordReview } from './types'

export const DAY = 86_400_000
export const MISTAKE_DAYS = [1, 2, 4, 7, 15, 30] as const
export const WORD_DAYS = [1, 3, 7, 14, 30, 60] as const
export const LESSON_REVIEW_DAYS = [2, 7] as const
export const ERROR_REASONS: { id: ErrorReason; label: string; hint: string }[] = [
  { id: 'vocabulary', label: '词义没记牢', hint: '认错词、拼写不准或搭配不熟' },
  { id: 'grammar', label: '语法没弄清', hint: '时态、句型或词形判断有误' },
  { id: 'evidence', label: '依据没找准', hint: '答案没有对应到原文或听力线索' },
  { id: 'misread', label: '题意看错了', hint: '漏看条件、否定词或题目要求' },
  { id: 'expression', label: '表达不完整', hint: '遗漏要点、句子不完整或衔接不清' },
  { id: 'careless', label: '检查不仔细', hint: '大小写、标点或抄写失误' },
]

export function emptyState(now = Date.now()): LearnerState {
  return { schemaVersion: 1, profile: null, attempts: [], answerSeenAt: {}, mastery: {}, mistakes: {}, words: {}, lessonDoneAt: {}, lessonReviews: {}, favorites: [], sessions: {}, activeSessionId: null, writing: {}, privateQuestions: [], recordings: [], updatedAt: now }
}

/** Adapted from the sister app: only independent answers affect evidence; retention needs a delay. */
export function updateMastery(current: TopicMastery | undefined, attempt: Attempt, difficulty: number): TopicMastery {
  const m = current ?? { topicId: attempt.topicId, score: 0, attempts: 0, lastAt: 0 }
  if (attempt.evidence !== 'independent' || !attempt.firstTry) return m
  const ratio = attempt.maxScore > 0 ? Math.max(0, Math.min(1, attempt.score / attempt.maxScore)) : 0
  const gain = [0, 9, 12, 16][difficulty] ?? 9
  const loss = [0, 12, 10, 8][difficulty] ?? 12
  const score = Math.max(0, Math.min(100, Math.round((m.score + gain * ratio * (1 - m.score / 110) - loss * (1 - ratio)) * 10) / 10))
  return { topicId: m.topicId, score, attempts: m.attempts + 1, lastAt: attempt.at,
    retainedAt: ratio < 0.8 ? undefined : (attempt.delayed ? attempt.at : m.retainedAt) }
}
export function masteryLabel(m: TopicMastery | undefined, now = Date.now()): string {
  if (!m?.attempts) return '还没练过'
  const elapsedDays = Math.max(0, (now - m.lastAt) / DAY - 7)
  const score = m.score * Math.pow(0.5, elapsedDays / (m.retainedAt ? 90 : 30))
  if (score < 40) return '需要巩固'
  if (score < 65) return '逐步熟悉'
  return score >= 85 && m.retainedAt && now - m.retainedAt <= 90 * DAY ? '延时复习通过' : '当堂表现较好'
}
export function addMistake(current: Mistake | undefined, questionId: string, now: number): Mistake {
  return { questionId, addedAt: current?.addedAt ?? now, reason: current?.reason ?? 'unclassified', stage: 0,
    dueAt: now + DAY, streak: 0, cleared: false, history: current?.history ?? [] }
}
export function redoMistake(m: Mistake, correct: boolean, startedAt: number, now: number): Mistake {
  const scheduled = !m.cleared && startedAt >= m.dueAt
  const history = [...m.history, { at: now, correct, scheduled }].slice(-60)
  if (!correct) return { ...m, stage: 0, streak: 0, cleared: false, dueAt: now + DAY, history }
  if (!scheduled) return { ...m, history }
  const stage = Math.min(m.stage + 1, MISTAKE_DAYS.length - 1)
  return { ...m, stage, streak: m.streak + 1, dueAt: now + MISTAKE_DAYS[stage] * DAY, history }
}
export function reviewWord(current: WordReview | undefined, wordId: string, correct: boolean, independent: boolean, now: number): WordReview {
  const previous = current ?? { wordId, stage: 0, dueAt: now, lastAt: 0, independentCorrect: 0, lapses: 0 }
  if (!correct) return { ...previous, stage: 0, dueAt: now + DAY, lastAt: now, lapses: previous.lapses + 1 }
  if (!independent || now < previous.dueAt) return { ...previous, lastAt: now }
  const stage = Math.min(previous.stage + 1, WORD_DAYS.length)
  return { ...previous, stage, dueAt: now + WORD_DAYS[Math.max(0, stage - 1)] * DAY, lastAt: now, independentCorrect: previous.independentCorrect + 1 }
}
export function dueLessonReviews(state: LearnerState, now: number): { lessonId: string; stage: number }[] {
  return Object.entries(state.lessonDoneAt).flatMap(([lessonId, at]) => {
    const done = state.lessonReviews[lessonId] ?? []
    const stage = LESSON_REVIEW_DAYS.findIndex((_, i) => !done.includes(i))
    const previous = Object.values(state.sessions).filter(s => s.mode === 'review' && s.lessonId === lessonId && (s.reviewStage ?? 0) <= stage)
    const lastExposure = Math.max(0, ...previous.map(s => s.submittedAt ?? 0), ...previous.flatMap(s => s.questionIds.map(id => state.answerSeenAt?.[id] ?? 0)))
    return stage >= 0 && now - at >= LESSON_REVIEW_DAYS[stage] * DAY && (!lastExposure || now - lastExposure >= 2 * DAY) ? [{ lessonId, stage }] : []
  }).sort((a, b) => state.lessonDoneAt[a.lessonId] - state.lessonDoneAt[b.lessonId])
}

export function recordAttempt(state: LearnerState, attempt: Attempt, difficulty: number): LearnerState {
  if (state.attempts.some((a) => a.id === attempt.id)) return state
  const mastery = { ...state.mastery }
  mastery[attempt.topicId] = updateMastery(mastery[attempt.topicId], attempt, difficulty)
  const mistakes = { ...state.mistakes }
  if (!attempt.correct) mistakes[attempt.questionId] = addMistake(mistakes[attempt.questionId], attempt.questionId, attempt.at)
  return { ...state, attempts: [...state.attempts, attempt].slice(-3000), mastery, mistakes, updatedAt: attempt.at }
}
