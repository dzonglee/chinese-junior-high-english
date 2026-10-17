import type { Question } from './types'

export interface EvidenceSentence { id: string; text: string; matched: boolean }

const genericEnglish = new Set(('a an the and or but so if then than as at by for from in into of on to with ' +
  'i me my mine we us our ours you your yours he him his she her hers it its they them their theirs ' +
  'this that these those there here who what which when where how why is am are was were be been being ' +
  'have has had do does did can could may might must shall should will would not no yes some any all one ' +
  'also just only very more most other another each every end beginning').split(' '))
const titleAbbreviations = new Set(['mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'st', 'mt', 'no'])
const sentenceStarters = /^(?:I|We|You|He|She|It|They|The|This|That|These|Those|Then|Next|After|Before|Finally|Please|Bring|Do|Can|Could|Would|Why|How|What|When|Where)\b/
const closingPunctuation = /["'”’»）)\]】〕}]/
const wordEdge = /[\p{L}\p{N}_'’\-]/u

// Normalization does not repair punctuation, fill blanks or paraphrase an authored quote.
function normalized(text: string): string {
  return text.normalize('NFC').replace(/\s+/g, ' ').trim().toLocaleLowerCase('en')
}

function meaningful(text: string): boolean {
  const words = text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g) ?? []
  if (words.length >= 3 && words.some(word => !genericEnglish.has(word.toLowerCase()))) return true
  const han = text.match(/[\u3400-\u9fff]/g) ?? []
  return han.length >= 6 && han.filter(char => !'的一了是在有这那它我们你他她个和与为也不就着'.includes(char)).length >= 2
}

function containsQuote(text: string, quote: string): boolean {
  let start = text.indexOf(quote)
  while (start !== -1) {
    const end = start + quote.length
    // Do not locate "he read books" inside "she read books", or school inside schoolbag.
    const left = !/[A-Za-z0-9]/.test(quote[0]) || !start || !wordEdge.test(text[start - 1])
    const right = !/[A-Za-z0-9]/.test(quote[quote.length - 1]) || end === text.length || !wordEdge.test(text[end])
    if (left && right) return true
    start = text.indexOf(quote, start + 1)
  }
  return false
}

function abbreviation(passage: string, index: number, next: number): boolean {
  const prefix = passage.slice(0, index)
  const word = prefix.match(/[A-Za-z]+$/)?.[0] ?? ''
  if (titleAbbreviations.has(word.toLowerCase())) return true
  // The first stop in e.g., p.m. or U.S. is internal, rather than a sentence ending.
  if (/[A-Za-z]/.test(passage[index + 1] ?? '') && passage[index + 2] === '.') return true
  const dotted = passage.slice(0, index + 1).match(/\b(?:[A-Za-z]\.){2,}$/)?.[0]
  const following = passage.slice(next)
  if (dotted) {
    if (/^(?:e\.g\.|i\.e\.)$/i.test(dotted)) return true
    if (/^(?:a\.m\.|p\.m\.)$/i.test(dotted)) return /^[a-z]/.test(following) || /^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/.test(following)
    return !sentenceStarters.test(following)
  }
  if (/^(?:etc|vs)$/i.test(word)) return /^[a-z]/.test(following)
  // Initials before a name stay together, but a following "We" can start a new sentence.
  return /^[A-Z]$/.test(word) && /^[A-Z]/.test(following) && !sentenceStarters.test(following)
}

function quotedContinuation(text: string): boolean {
  return /^[a-z]/.test(text) ||
    /^(?:(?:Mr|Mrs|Ms|Dr|Prof)\.\s+)?[A-Z][A-Za-z'’\-]*(?:\s+[A-Z][A-Za-z'’\-]*)?\s+(?:said|asked|replied|answered|added|shouted|whispered|cried|explained|continued)\b/.test(text) ||
    /^[\u3400-\u9fff]{1,8}(?:说|问|回答|提醒|喊道|说道)/.test(text)
}

function passageSentences(passage: string): string[] {
  const sentences: string[] = []
  let start = 0
  for (let i = 0; i < passage.length; i++) {
    if (!/[.!?。！？]/.test(passage[i])) continue
    if (passage[i] === '.' && /\d/.test(passage[i - 1] ?? '') && /\d/.test(passage[i + 1] ?? '')) continue
    // A numbered instruction is one unit with its following words, not a sentence "1.".
    if (passage[i] === '.' && /^\s*\d+\.$/.test(passage.slice(passage.lastIndexOf('\n', i - 1) + 1, i + 1))) continue
    let end = i + 1
    while (end < passage.length && /[.!?。！？]/.test(passage[end])) end++
    const punctuationEnd = end
    while (end < passage.length && closingPunctuation.test(passage[end])) end++
    if (end < passage.length && !/\s/.test(passage[end]) && /[.!?]/.test(passage[i])) continue
    let next = end
    while (next < passage.length && /\s/.test(passage[next])) next++
    if (passage[i] === '.' && punctuationEnd === i + 1 && abbreviation(passage, i, next)) continue
    if (end > punctuationEnd && next < passage.length && quotedContinuation(passage.slice(next))) continue
    const sentence = passage.slice(start, end).trim()
    if (sentence) sentences.push(sentence)
    start = end
    i = end - 1
  }
  const tail = passage.slice(start).trim()
  if (tail) sentences.push(tail)
  return sentences
}

function locatedEvidence(q: Question): { sentences: EvidenceSentence[]; quotes: string[] } {
  if (q.skill !== 'reading' || !q.passage?.trim()) return { sentences: [], quotes: [] }
  const quotes = q.explanation.visual.segments.filter(segment => segment.role === 'evidence' && meaningful(segment.text))
    .map(segment => normalized(segment.text)).filter(Boolean)
  if (!quotes.length) return { sentences: [], quotes: [] }
  const sentences = passageSentences(q.passage).map((text, i) => ({
    id: `evidence-sentence-${i + 1}`, text, matched: quotes.some(quote => containsQuote(normalized(text), quote)),
  }))
  return sentences.some(sentence => sentence.matched) ? { sentences, quotes } : { sentences: [], quotes: [] }
}

/** Post-answer exploration only. These selections never become independent answers or marks. */
export function evidenceSentences(q: Question): EvidenceSentence[] {
  return locatedEvidence(q).sentences
}

/** The caller must withhold this exploration until the whole answer-feedback group is unlocked. */
export function evidenceFeedback(q: Question, id: string): { correct: boolean; message: string } {
  const { sentences, quotes } = locatedEvidence(q)
  const sentence = sentences.find(candidate => candidate.id === id)
  if (!sentence) return { correct: false, message: '请从原文中的句子里重新选择，再对照题目找线索。' }
  if (!sentence.matched) return { correct: false, message: '再读一遍这句，对照题目问的人物、时间或事件，找能直接支持判断的原文线索，再试一次。' }
  const matched = quotes.filter(quote => containsQuote(normalized(sentence.text), quote))
  const step = q.explanation.steps.find(step => step.reason.trim() && matched.some(quote => containsQuote(normalized(step.text), quote)))
  return { correct: true, message: step ? `找对了。解析中对应的理由：${step.reason}` : '找对了，这句包含解析引用的原文线索。再联系问题，说说这处信息为什么有用。' }
}
