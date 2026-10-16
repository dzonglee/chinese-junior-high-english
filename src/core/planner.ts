import { playable } from './sessions'
import { chinaDate } from './cohort'
import { dueLessonReviews, masteryLabel } from './learning'
import type { ContentCatalog, LearnerState, Lesson, Topic } from './types'

export interface DailyTask { id: string; title: string; description: string; action: string; value: string; minutes: number; done: boolean }
export function orderedTopics(catalog: ContentCatalog, state: LearnerState): { topics: Topic[]; mapped: boolean; notice: string } {
  const p = state.profile
  if (!p) return { topics: [], mapped: false, notice: '先确认你的年级和教材。' }
  const book = catalog.books.find((b) => b.editionId === p.editionId && b.grade === p.grade && b.term === p.term)
  if (book?.units.length) {
    const ids = [...new Set(book.units.flatMap((unit) => unit.topicIds))]
    const topics = ids.map((id) => catalog.topics.find((topic) => topic.id === id)).filter((topic): topic is Topic => !!topic && topic.grades.includes(p.grade))
    return { topics, mapped: true, notice: book.verification === 'official' ? '按你确认的教材安排。' : '教材单元对应仍待核对，请与自己的课本确认。' }
  }
  return { topics: catalog.topics.filter((topic) => topic.grades.includes(p.grade)).sort((a, b) => a.order - b.order), mapped: false,
    notice: '这版教材的单元对应还在核对。下面先按本年级基础能力安排，不混用其他版本。' }
}
export function nextLesson(catalog: ContentCatalog, state: LearnerState): Lesson | undefined {
  for (const topic of orderedTopics(catalog, state).topics) {
    const lesson = catalog.lessons.filter((l) => l.topicId === topic.id && l.grades.includes(state.profile!.grade)).sort((a, b) => a.order - b.order).find((l) => !state.lessonDoneAt[l.id] && (catalog.questionIndex ?? catalog.questions).filter(q => l.questionIds.includes(q.id)).every(q => playable(q, catalog)))
    if (lesson) return lesson
  }
  return undefined
}
export function dailyPlan(catalog: ContentCatalog, state: LearnerState, now: number): DailyTask[] {
  const tasks: DailyTask[] = [], p = state.profile
  if (!p) return tasks
  const day = chinaDate(now).key
  const today = state.attempts.filter((a) => chinaDate(a.at).key === day)
  const words = Object.values(state.words).filter((w) => w.dueAt <= now)
  tasks.push({ id: 'words', title: words.length ? '先复习到期单词' : '单词热身', description: words.length ? `今天有 ${words.length} 个单词等你复习。` : '用拼写和例句检验词义，不只看一遍。', action: 'navigate', value: 'vocabulary', minutes: 3, done: Object.values(state.words).some((w) => chinaDate(w.lastAt).key === day && w.independentCorrect > 0) })
  const mistakes = Object.values(state.mistakes).filter((m) => !m.cleared && m.dueAt <= now)
  if (mistakes.length) tasks.push({ id: 'mistakes', title: '把旧错题练明白', description: `${mistakes.length} 道错题到期，先重新想一遍。`, action: 'start-mistakes', value: '', minutes: 4, done: today.some((a) => state.sessions[a.sessionId]?.mode === 'mistakes') })
  const review = dueLessonReviews(state, now)[0]
  if (review) tasks.push({ id: 'review', title: '隔几天再检验一次', description: catalog.lessons.find((l) => l.id === review.lessonId)?.title ?? '回顾已学内容', action: 'start-review', value: `${review.lessonId}:${review.stage}`, minutes: 5, done: false })
  const lesson = nextLesson(catalog, state)
  if (lesson) tasks.push({ id: 'lesson', title: '接着学这一课', description: lesson.title, action: 'start-lesson', value: lesson.id, minutes: lesson.estimatedMinutes, done: !!state.lessonDoneAt[lesson.id] })
  else {
    const weakest = orderedTopics(catalog, state).topics.sort((a, b) => (state.mastery[a.id]?.score ?? 0) - (state.mastery[b.id]?.score ?? 0))[0]
    if (weakest) tasks.push({ id: 'strengthen', title: '巩固薄弱处', description: `${weakest.title} · ${masteryLabel(state.mastery[weakest.id], now)}`, action: 'start-topic', value: weakest.id, minutes: 6, done: today.some((a) => a.topicId === weakest.id) })
  }
  return tasks
}
export function learningStats(state: LearnerState, now: number): { total: number; independent: number; correct: number; accuracy: number; selfReviews: number; retainedTopics: number; streak: number; minutes: number; week: { label: string; active: boolean }[] } {
  const independent = state.attempts.filter((a) => a.evidence === 'independent' && a.firstTry), correct = independent.filter((a) => a.correct).length
  const activeDays = new Set(state.attempts.map((a) => chinaDate(a.at).key))
  let cursor = now, streak = 0
  if (!activeDays.has(chinaDate(cursor).key)) cursor -= 86_400_000
  while (activeDays.has(chinaDate(cursor).key)) { streak++; cursor -= 86_400_000 }
  return { total: state.attempts.length, independent: independent.length, correct, accuracy: independent.length ? Math.round(correct / independent.length * 100) : 0,
    selfReviews: state.attempts.filter((a) => a.evidence === 'self_review').length, retainedTopics: Object.values(state.mastery).filter((m) => masteryLabel(m, now) === '延时复习通过').length,
    streak, minutes: Math.round(state.attempts.reduce((sum, a) => sum + a.seconds, 0) / 60),
    week: Array.from({ length: 7 }, (_, i) => { const d = chinaDate(now - (6 - i) * 86_400_000); return { label: `${d.month}/${d.day}`, active: activeDays.has(d.key) } }) }
}
