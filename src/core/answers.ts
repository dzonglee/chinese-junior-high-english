import type { Question, RubricPoint } from './types'

export function normalizedAnswer(value: string, caseSensitive = false): string {
  const text = value.normalize('NFC').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim()
  return caseSensitive ? text : text.toLocaleLowerCase('en')
}

/** Preserve contractions, word order and punctuation; accepted alternatives are authored explicitly. */
export function checkAnswer(question: Question, answer: string): boolean {
  if (question.kind === 'writing' || question.kind === 'speaking') return false
  if (question.kind === 'choice') return answer === question.answer.option
  if (question.kind === 'order') {
    try {
      const ids: unknown = JSON.parse(answer)
      return Array.isArray(ids) && ids.length === question.answer.order?.length &&
        ids.every((id, i) => typeof id === 'string' && id === question.answer.order?.[i])
    } catch { return false }
  }
  const normalized = normalizedAnswer(answer, question.answer.caseSensitive)
  return (question.answer.accepted ?? []).some((accepted) => normalizedAnswer(accepted, question.answer.caseSensitive) === normalized)
}

export function selfReviewScore(rubric: RubricPoint[], selected: string[]): number {
  const ids = new Set(selected)
  return rubric.reduce((score, point) => score + (ids.has(point.id) ? point.marks : 0), 0)
}

export function wordCount(text: string): number {
  return (text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g) ?? []).length
}

export function answerText(question: Question, answer: string): string {
  if (question.kind === 'choice') return question.options?.find((option) => option.id === answer)?.text ?? '未作答'
  if (question.kind === 'order') {
    try {
      const ids: unknown = JSON.parse(answer)
      if (!Array.isArray(ids)) return '未作答'
      return ids.map((id) => question.tokens?.find((token) => token.id === id)?.text ?? '').join(' ')
    } catch { return '未作答' }
  }
  return answer || '未作答'
}
