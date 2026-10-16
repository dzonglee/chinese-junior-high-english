import { emptyState } from './core/learning'
import type { ContentCatalog, LearnerProfile, Question } from './core/types'

export const NOW = Date.parse('2026-10-16T08:00:00+08:00')
export const profile: LearnerProfile = { cityId: '河南-郑州', structure: '63', grade: 7, term: 'upper', editionId: 'pep-2024', dailyMinutes: 15, schoolYear: 2026, createdAt: NOW }
export const q: Question = { id: 'q-test-001', topicId: 'g-be', skill: 'grammar', kind: 'choice', difficulty: 1, grades: [7], stem: 'Mia ___ ready for school.', options: [{ id: 'a', text: 'am' }, { id: 'b', text: 'is' }, { id: 'c', text: 'are' }], answer: { option: 'b', display: 'Mia is ready for school.' }, marks: 1, estimatedSeconds: 30,
  explanation: { strategy: '先确定主语的人称和单复数。', steps: [{ text: '主语是 Mia。', reason: '一个人的名字对应第三人称单数。' }, { text: '选 is。', reason: '现在时中，第三人称单数与 is 搭配。' }], distractors: [{ option: 'a', reason: 'am 只与 I 搭配。' }, { option: 'c', reason: 'are 与 you 或复数主语搭配。' }], pitfall: '不要因为人名不熟悉就忽略主语的单复数。', transfer: '把主语改成 Mia and Ben，be 动词应该怎么变？', visual: { kind: 'sentence', title: '主语决定 be 动词', segments: [{ text: 'Mia', role: 'subject', note: '第三人称单数' }, { text: 'is', role: 'verb' }, { text: 'ready for school', role: 'neutral' }], caption: '先看主语，再确定谓语。' } }, source: { kind: 'original', author: 'Project authors' }, review: 'draft' }
export function catalog(): ContentCatalog {
  const questions = Array.from({ length: 8 }, (_, i) => ({ ...structuredClone(q), id: `q-test-00${i + 1}` }))
  return { version: 1, topics: [{ id: 'g-be', title: 'be 动词', skill: 'grammar', grades: [7], goal: '能根据主语选择 be 动词。', commonError: '主语和谓语不一致。', prerequisites: [], order: 1 }], questions, lessons: [{ id: 'l-be', topicId: 'g-be', title: '先看主语', grades: [7], objective: '选择正确的 be 动词。', questionIds: questions.slice(0, 4).map((x) => x.id), delayedQuestionIds: questions.slice(4, 6).map((x) => x.id), summary: ['I 用 am，单数用 is，其余情况辨认 are。'], estimatedMinutes: 8, order: 1, review: 'draft' }], vocabulary: [], media: [], cities: [{ id: profile.cityId, name: '郑州', province: '河南', stream: 'central-west' }], editions: [{ id: profile.editionId, name: '人教版', version: '2024', structures: ['63'], spelling: 'american', verification: 'unverified', sourceIds: [] }], books: [], blueprints: [] }
}
export function state() { return { ...emptyState(NOW), profile: { ...profile } } }

