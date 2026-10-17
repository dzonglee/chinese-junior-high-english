import type { Question, VocabularyItem } from './types'
export type Spelling = 'american' | 'british'
const pairs: [string, string][] = [['summarise', 'summarize'], ['summarised', 'summarized'], ['summarising', 'summarizing'], ['mum', 'mom'], ['yoghurt', 'yogurt'], ['memorise', 'memorize'], ['memorised', 'memorized'], ['memorising', 'memorizing'], ['theatre', 'theater'], ['aeroplane', 'airplane'], ['tyre', 'tire'], ['harbour', 'harbor'], ['neighbourhood', 'neighborhood'], ['grey', 'gray'], ['centre', 'center'], ['centres', 'centers'], ['colour', 'color'], ['colours', 'colors'], ['coloured', 'colored'], ['favourite', 'favorite'], ['neighbour', 'neighbor'], ['neighbours', 'neighbors'], ['organise', 'organize'], ['organised', 'organized'], ['organising', 'organizing'], ['practise', 'practice'], ['practises', 'practices'], ['practising', 'practicing'], ['travelled', 'traveled'], ['travelling', 'traveling'], ['cancelled', 'canceled']]
export function editionText(text: string, spelling: Spelling): string {
  // Preserve explicit teaching notes that compare the two spelling systems.
  if (text.includes('英式') && text.includes('美式')) return text
  const entries = spelling === 'american' ? pairs : pairs.filter(([british]) => !british.startsWith('practis')).map(([british, american]) => [american, british] as [string, string])
  const dictionary = new Map(entries)
  return text.replace(/\b[A-Za-z]+\b/g, word => {
    const target = dictionary.get(word.toLowerCase())
    return target ? /^[A-Z]/.test(word) ? target[0].toUpperCase() + target.slice(1) : target : word
  })
}
export function editionQuestion(q: Question, spelling: Spelling): Question {
  const convert = (text: string) => editionText(text, spelling)
  return { ...q, stem: convert(q.stem), ...(q.passage ? { passage: convert(q.passage) } : {}), options: q.options?.map(o => ({ ...o, text: convert(o.text) })), tokens: q.tokens?.map(t => ({ ...t, text: convert(t.text) })),
    answer: { ...q.answer, display: convert(q.answer.display), ...(q.answer.accepted ? { accepted: [...new Set([...q.answer.accepted, ...q.answer.accepted.map(convert)])] } : {}) },
    explanation: { ...q.explanation, strategy: convert(q.explanation.strategy), steps: q.explanation.steps.map(s => ({ text: convert(s.text), reason: convert(s.reason) })), distractors: q.explanation.distractors.map(d => ({ ...d, reason: convert(d.reason) })), pitfall: convert(q.explanation.pitfall), transfer: convert(q.explanation.transfer), visual: { ...q.explanation.visual, caption: convert(q.explanation.visual.caption), segments: q.explanation.visual.segments.map(s => ({ ...s, text: convert(s.text), ...(s.note ? { note: convert(s.note) } : {}) })) } } }
}
export function editionWord(w: VocabularyItem, spelling: Spelling): VocabularyItem {
  return { ...w, word: editionText(w.word, spelling), example: editionText(w.example, spelling), acceptedSpellings: [...new Set([w.word, ...w.acceptedSpellings, editionText(w.word, spelling)])] }
}
