// Vary learner-facing letters without changing any authored meaning or explanation.
// Input is always the canonical author file, never an already compiled question.
export function individualChoiceLayout(question) {
  if (question.kind !== 'choice') return question
  let seed = 2166136261
  for (const character of question.id) seed = Math.imul(seed ^ character.charCodeAt(0), 16777619) >>> 0
  const options = question.options, offset = seed % options.length
  const ordered = [...options.slice(offset), ...options.slice(0, offset)]
  const letters = new Map(ordered.map((option, index) => [option.id, String.fromCharCode(97 + index)]))
  return {
    ...question,
    options: ordered.map(option => ({ ...option, id: letters.get(option.id) })),
    answer: { ...question.answer, option: letters.get(question.answer.option) },
    explanation: {
      ...question.explanation,
      distractors: question.explanation.distractors.map(distractor => ({ ...distractor, option: letters.get(distractor.option) })),
    },
  }
}
