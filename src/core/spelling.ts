import type { Question, VocabularyItem } from './types'
export type Spelling = 'american' | 'british'
const pairs: [string, string][] = [['aluminium', 'aluminum'], ['programme', 'program'], ['programmes', 'programs'], ['behaviour', 'behavior'], ['behaviours', 'behaviors'], ['realise', 'realize'], ['realises', 'realizes'], ['realised', 'realized'], ['realising', 'realizing'], ['realisation', 'realization'], ['realisations', 'realizations'], ['colourful', 'colorful'], ['colourfully', 'colorfully'], ['colourless', 'colorless'], ['colouring', 'coloring'], ['kilometre', 'kilometer'], ['kilometres', 'kilometers'], ['centimetre', 'centimeter'], ['centimetres', 'centimeters'], ['metre', 'meter'], ['metres', 'meters'], ['litre', 'liter'], ['litres', 'liters'], ['equalise', 'equalize'], ['equalises', 'equalizes'], ['equalised', 'equalized'], ['equalising', 'equalizing'], ['summarise', 'summarize'], ['summarised', 'summarized'], ['summarising', 'summarizing'], ['mum', 'mom'], ['yoghurt', 'yogurt'], ['memorise', 'memorize'], ['memorised', 'memorized'], ['memorising', 'memorizing'], ['theatre', 'theater'], ['aeroplane', 'airplane'], ['tyre', 'tire'], ['harbour', 'harbor'], ['neighbourhood', 'neighborhood'], ['grey', 'gray'], ['centre', 'center'], ['centres', 'centers'], ['colour', 'color'], ['colours', 'colors'], ['coloured', 'colored'], ['favourite', 'favorite'], ['neighbour', 'neighbor'], ['neighbours', 'neighbors'], ['organise', 'organize'], ['organised', 'organized'], ['organising', 'organizing'], ['organises', 'organizes'], ['organiser', 'organizer'], ['organisers', 'organizers'], ['organisation', 'organization'], ['organisations', 'organizations'], ['recognise', 'recognize'], ['recognises', 'recognizes'], ['recognised', 'recognized'], ['recognising', 'recognizing'], ['practise', 'practice'], ['practises', 'practices'], ['practised', 'practiced'], ['practising', 'practicing'], ['travelled', 'traveled'], ['travelling', 'traveling'], ['cancelled', 'canceled']]
const dictionaries: Record<Spelling, Map<string, string>> = {
  american: new Map(pairs),
  british: new Map(pairs.filter(([british]) => !['metre', 'metres', 'programme', 'programmes'].includes(british) && (british === 'practised' || !british.startsWith('practis'))).map(([british, american]) => [american, british])),
}
export function editionText(text: string, spelling: Spelling): string {
  // Keep English names and contractions together when CJK heading fonts supply curly punctuation.
  const readable = text.replace(/([A-Za-z])’(?=[A-Za-z])/g, "$1'")
  // Preserve explicit teaching notes that compare the two spelling systems.
  if (text.includes('英式') && text.includes('美式')) return readable
  const dictionary = dictionaries[spelling]
  // Standalone meter can mean a device in British English. Convert it only after
  // an explicit written quantity; compounds such as parking/water meter stay intact.
  const quantity = '(?:[0-9]+(?:,[0-9]{3})*(?:[.][0-9]+)?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)'
  const units = spelling === 'british' ? readable.replace(new RegExp('\\b(' + quantity + ')([ -])(meters?)\\b', 'gi'), (_match, amount: string, gap: string, unit: string) => amount + gap + (/^[A-Z]/.test(unit) ? 'M' : 'm') + (unit.toLowerCase() === 'meters' ? 'etres' : 'etre')) : readable
  return units.replace(/\b[A-Za-z]+\b/g, word => {
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
