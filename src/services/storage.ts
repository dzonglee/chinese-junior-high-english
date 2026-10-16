import { emptyState } from '../core/learning'
import { assertQuestion } from '../core/validation'
import type { ContentCatalog, LearnerProfile, LearnerState, PrivateQuestion } from '../core/types'

export interface StorageAdapter { read(key: string): string | null; write(key: string, value: string): void; remove(key: string): void }
export const STORAGE_KEY = 'cjhe.state.v1'
export class StateStore {
  private state: LearnerState
  private unreadable: string | null = null
  readonly notices: string[] = []
  constructor(private adapter: StorageAdapter, private catalog: ContentCatalog, now = Date.now()) {
    this.state = emptyState(now)
    let text: string | null = null
    try { text = adapter.read(STORAGE_KEY) }
    catch { this.unreadable = ''; this.notices.push('本机存储暂时无法读取，请稍后重试。') }
    if (text) {
      try { this.state = checkedState(text, catalog, now, true) }
      catch { this.unreadable = text; this.notices.push('本机学习记录暂时无法读取。原记录已保留，请先导出备份再重置。') }
    }
  }
  get(): LearnerState { return this.state }
  save(next: LearnerState): void {
    if (this.unreadable !== null) throw new Error('原记录还没读取成功。请先导出备份，再决定是否重置。')
    const serialized = JSON.stringify(next)
    if (serialized.length > 4_000_000) throw new Error('本机记录空间不足，请先导出备份，再清理旧记录。')
    try { this.adapter.write(STORAGE_KEY, serialized) }
    catch { throw new Error('这次记录还没保存成功。请检查设备空间后重试，当前页面会保留。') }
    this.state = next
  }
  export(): string { return this.unreadable ?? JSON.stringify({ app: 'chinese-junior-high-english', exportedAt: Date.now(), state: { ...this.state, recordings: [] } }, null, 2) }
  import(text: string, now = Date.now()): void {
    const next = checkedState(text, this.catalog, now)
    this.adapter.write(STORAGE_KEY, JSON.stringify(next)); this.state = next; this.unreadable = null; this.notices.length = 0
  }
  reset(now = Date.now()): void {
    const next = emptyState(now)
    this.adapter.write(STORAGE_KEY, JSON.stringify(next)); this.state = next; this.unreadable = null; this.notices.length = 0
  }
}

function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === 'object' && !Array.isArray(value) }
function safeMap(value: unknown): value is Record<string, unknown> { return record(value) && Object.keys(value).every((key) => /^[a-zA-Z0-9\-:]+$/.test(key) && !['constructor', 'prototype', '__proto__'].includes(key)) }
const finite = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0
const count = (v: unknown): v is number => finite(v) && Number.isInteger(v)
function validAttempt(a: unknown): boolean {
  return record(a) && typeof a.id === 'string' && typeof a.questionId === 'string' && typeof a.topicId === 'string' && typeof a.sessionId === 'string' && typeof a.answer === 'string' && a.answer.length <= 5000 && ['vocabulary', 'grammar', 'reading', 'listening', 'writing', 'speaking'].includes(String(a.skill)) && ['independent', 'assisted', 'self_review'].includes(String(a.evidence)) && finite(a.at) && finite(a.score) && finite(a.maxScore) && a.maxScore > 0 && a.score <= a.maxScore && finite(a.seconds) && typeof a.correct === 'boolean' && typeof a.firstTry === 'boolean' && typeof a.delayed === 'boolean'
}
export function checkedProfile(value: unknown, catalog: ContentCatalog): LearnerProfile {
  if (!record(value) || !catalog.cities.some((c) => c.id === value.cityId) || !['63', '54'].includes(String(value.structure)) || typeof value.grade !== 'number' || ![6, 7, 8, 9].includes(value.grade) || (value.structure === '63' && value.grade === 6) || !['upper', 'lower'].includes(String(value.term)) || !catalog.editions.some((e) => e.id === value.editionId && e.structures.includes(value.structure as '63' | '54')) || typeof value.dailyMinutes !== 'number' || ![10, 15, 20, 30].includes(value.dailyMinutes) || !Number.isInteger(value.schoolYear) || Number(value.schoolYear) < 2020 || Number(value.schoolYear) > 2100 || typeof value.createdAt !== 'number' || !Number.isFinite(value.createdAt)) throw new Error('学习资料有误，请重新确认城市、年级和教材。')
  if (value.examDate !== undefined) {
    if (typeof value.examDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value.examDate) || !Number.isFinite(Date.parse(`${value.examDate}T00:00:00Z`)) || new Date(`${value.examDate}T00:00:00Z`).toISOString().slice(0, 10) !== value.examDate) throw new Error('请填写有效的考试日期。')
  }
  return { cityId: String(value.cityId), structure: value.structure as '63' | '54', grade: value.grade as 6 | 7 | 8 | 9, term: value.term as 'upper' | 'lower', editionId: String(value.editionId), dailyMinutes: value.dailyMinutes, schoolYear: Number(value.schoolYear), createdAt: value.createdAt, ...(value.examDate ? { examDate: String(value.examDate) } : {}) }
}

/** An imported backup is untrusted. Reject it atomically rather than partially restoring it. */
export function checkedState(text: string, catalog: ContentCatalog, now: number, local = false): LearnerState {
  if (text.length > 4_000_000) throw new Error('备份太大，无法导入。')
  const envelope: unknown = JSON.parse(text)
  const data = record(envelope) && envelope.app === 'chinese-junior-high-english' ? envelope.state : envelope
  if (!record(data) || data.schemaVersion !== 1) throw new Error('这不是受支持的英语学习备份。')
  const base = emptyState(now)
  if (data.profile !== null) base.profile = checkedProfile(data.profile, catalog)
  for (const key of ['mastery', 'mistakes', 'words', 'lessonDoneAt', 'lessonReviews', 'sessions', 'writing'] as const) {
    if (!safeMap(data[key]) || Object.keys(data[key]).length > 5000) throw new Error('备份记录有误，未导入任何数据。')
  }
  if (!Array.isArray(data.attempts) || data.attempts.length > 3000 || !Array.isArray(data.privateQuestions) || data.privateQuestions.length > 200 || !Array.isArray(data.favorites) || !data.favorites.every((id) => typeof id === 'string' && id.length < 100)) throw new Error('备份记录超过支持范围。')
  for (const q of data.privateQuestions) { assertQuestion(q); if (!q.id.startsWith('private-') || !record(q) || q.private !== true) throw new Error('备份包含无效的私人题目。') }
  for (const a of data.attempts) if (!validAttempt(a)) throw new Error('备份中的作答记录有误。')
  for (const m of Object.values(data.mistakes as Record<string, unknown>)) if (!record(m) || typeof m.questionId !== 'string' || !finite(m.dueAt) || !finite(m.addedAt) || !count(m.streak) || !count(m.stage) || m.stage > 5 || !['unclassified', 'vocabulary', 'grammar', 'evidence', 'misread', 'expression', 'careless'].includes(String(m.reason)) || !Array.isArray(m.history) || m.history.length > 60 || !m.history.every(h => record(h) && finite(h.at) && typeof h.correct === 'boolean' && typeof h.scheduled === 'boolean') || typeof m.cleared !== 'boolean') throw new Error('备份中的错题记录有误。')
  for (const m of Object.values(data.mastery as Record<string, unknown>)) if (!record(m) || typeof m.topicId !== 'string' || !finite(m.score) || m.score > 100 || !count(m.attempts) || !finite(m.lastAt) || (m.retainedAt !== undefined && !finite(m.retainedAt))) throw new Error('备份中的学习记录有误。')
  for (const w of Object.values(data.words as Record<string, unknown>)) if (!record(w) || typeof w.wordId !== 'string' || !finite(w.dueAt) || !finite(w.lastAt) || !count(w.stage) || w.stage > 6 || !count(w.independentCorrect) || !count(w.lapses)) throw new Error('备份中的单词记录有误。')
  for (const at of Object.values(data.lessonDoneAt as Record<string, unknown>)) if (!finite(at)) throw new Error('备份中的课程记录有误。')
  for (const stages of Object.values(data.lessonReviews as Record<string, unknown>)) if (!Array.isArray(stages) || !stages.every(s => s === 0 || s === 1)) throw new Error('备份中的复习记录有误。')
  for (const d of Object.values(data.writing as Record<string, unknown>)) if (!record(d) || typeof d.text !== 'string' || d.text.length > 5000 || typeof d.questionId !== 'string' || !finite(d.updatedAt) || !Array.isArray(d.checkedRubricIds) || !d.checkedRubricIds.every(id => typeof id === 'string')) throw new Error('备份中的写作记录有误。')
  const sessions = checkedSessions(data.sessions)
  const recordings = local && Array.isArray(data.recordings) ? data.recordings.filter((r) => record(r) && typeof r.id === 'string' && typeof r.path === 'string' && typeof r.questionId === 'string' && typeof r.createdAt === 'number' && typeof r.durationMs === 'number') as LearnerState['recordings'] : []
  // Only same-device restoration may retain file paths and the active session.
  return { ...base, profile: base.profile, attempts: data.attempts as LearnerState['attempts'], mastery: data.mastery as LearnerState['mastery'], mistakes: data.mistakes as LearnerState['mistakes'], words: data.words as LearnerState['words'], lessonDoneAt: data.lessonDoneAt as LearnerState['lessonDoneAt'], lessonReviews: data.lessonReviews as LearnerState['lessonReviews'], favorites: data.favorites as string[], writing: data.writing as LearnerState['writing'], privateQuestions: data.privateQuestions as PrivateQuestion[],
    sessions, recordings, activeSessionId: local && typeof data.activeSessionId === 'string' && sessions[data.activeSessionId] ? data.activeSessionId : null, updatedAt: now }
}
function checkedSessions(value: unknown): LearnerState['sessions'] {
  if (!safeMap(value)) return {}
  const result: LearnerState['sessions'] = {}
  for (const [id, s] of Object.entries(value).slice(-40)) {
    if (!record(s) || s.id !== id || !Array.isArray(s.questionIds) || !s.questionIds.length || !s.questionIds.every((q) => typeof q === 'string') || new Set(s.questionIds).size !== s.questionIds.length || s.questionIds.length > 100 || !safeMap(s.answers) || !finite(s.startedAt) || !count(s.current) || s.current >= s.questionIds.length || !finite(s.seed) || !['lesson', 'practice', 'mistakes', 'review', 'exam'].includes(String(s.mode)) || (s.deadlineAt !== undefined && (!finite(s.deadlineAt) || s.deadlineAt < s.startedAt)) || (s.submittedAt !== undefined && !finite(s.submittedAt))) throw new Error('备份中的练习记录有误。')
    for (const [qid, a] of Object.entries(s.answers)) if (!s.questionIds.includes(qid) || !record(a) || typeof a.answer !== 'string' || a.answer.length > 5000 || !count(a.hints) || !count(a.attempts) || typeof a.checked !== 'boolean' || (a.audioPlayed !== undefined && typeof a.audioPlayed !== 'boolean') || (a.result !== undefined && !validAttempt(a.result)) || (a.checked && !a.result)) throw new Error('备份中的答案记录有误。')
    if (s.examMarks !== undefined && (!safeMap(s.examMarks) || !Object.entries(s.examMarks).every(([qid, marks]) => (s.questionIds as string[]).includes(qid) && finite(marks) && marks > 0))) throw new Error('备份中的分值记录有误。')
    result[id] = s as unknown as LearnerState['sessions'][string]
  }
  return result
}
