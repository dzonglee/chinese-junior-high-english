import {createHash} from 'node:crypto'

const rank = text => createHash('sha256').update(text).digest('hex')
// A stable paper-specific permutation avoids identical reading keys across papers.
// The 21 choice tasks receive seven A/B/C answers, without a repeating cycle.
export function mockAnswerLayout(paperId, count) {
  return Array.from({length: count}, (_, i) => ({letter: 'abc'[i % 3], rank: rank(`${paperId}:answer-position:${i}`)}))
    .sort((a, b) => a.rank.localeCompare(b.rank)).map(item => item.letter)
}
export function mockChoiceOptions(questionId, canonical, correctLetter) {
  const distractors = canonical.slice(1).map((text, i) => ({text, rank: rank(`${questionId}:distractor:${i}`)}))
    .sort((a, b) => a.rank.localeCompare(b.rank)).map(item => item.text)
  distractors.splice('abc'.indexOf(correctLetter), 0, canonical[0])
  return distractors.map((text, i) => ({id: 'abc'[i], text}))
}
