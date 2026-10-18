import { describe, expect, it } from 'vitest'
import { authorCatalog } from '../../scripts/lib/author-content.mjs'
import { evidenceFeedback, evidenceSentences } from './reading-evidence'
import type { ContentCatalog, Question } from './types'
import { q as fixture } from '../test-fixtures'

function reading(passage: string, quote: string): Question {
  return { ...structuredClone(fixture), skill: 'reading', passage, answer: { display: 'A model answer that must not be used as evidence.' },
    explanation: { ...structuredClone(fixture.explanation),
      visual: { kind: 'evidence', title: '原文线索', caption: '找到原文依据。', segments: [{ text: quote, role: 'evidence' }] },
      steps: [{ text: `定位原文：“${quote}”`, reason: '这句说明他们最终选择的地点，原计划已经改变。' }],
    } }
}
const source: ContentCatalog = authorCatalog(process.cwd())

describe('literal post-answer reading evidence', () => {
  it('returns complete original sentences with stable IDs and leaves other sentences selectable', () => {
    const item = reading('The class planned to meet outside. Rain changed the plan. We will meet in the hall instead.', 'meet in the hall')
    expect(evidenceSentences(item)).toEqual([
      { id: 'evidence-sentence-1', text: 'The class planned to meet outside.', matched: false },
      { id: 'evidence-sentence-2', text: 'Rain changed the plan.', matched: false },
      { id: 'evidence-sentence-3', text: 'We will meet in the hall instead.', matched: true },
    ])
    expect(evidenceSentences(item)).toEqual(evidenceSentences(item))
  })

  it('normalizes case, canonical Unicode and whitespace without changing returned source text', () => {
    const text = 'We visited the cafe\u0301\nwith our class.'
    const item = reading(text, 'THE CAFÉ with our class')
    expect(evidenceSentences(item)).toEqual([{ id: 'evidence-sentence-1', text, matched: true }])
  })

  it.each(['hall', 'the hall', 'it was a', 'at the end'])('rejects short or wholly generic evidence: %s', quote => {
    expect(evidenceSentences(reading(`We were in the hall; it was a surprise at the end.`, quote))).toEqual([])
  })

  it('requires literal whole words rather than suffixes, punctuation repair or paraphrases', () => {
    expect(evidenceSentences(reading('She read books at home.', 'he read books'))).toEqual([])
    expect(evidenceSentences(reading('We go to schoolbag displays.', 'go to school'))).toEqual([])
    expect(evidenceSentences(reading('It was a two-year project.', 'a two year project'))).toEqual([])
    expect(evidenceSentences(reading('She left early and returned at noon.', 'She ... returned at noon'))).toEqual([])
    expect(evidenceSentences(reading('They met in the library.', 'They chose the library'))).toEqual([])
  })

  it('does not derive evidence from an answer, a model, a neutral segment or an invented source quote', () => {
    const item = reading('They chose the community hall.', 'A model answer that must not be used as evidence.')
    expect(evidenceSentences(item)).toEqual([])
    item.explanation.visual.segments = [{ text: item.passage!, role: 'object' }, { text: item.passage!, role: 'neutral' }]
    expect(evidenceSentences(item)).toEqual([])
    item.explanation.visual.segments = []
    expect(evidenceSentences(item)).toEqual([])
  })

  it('requires a source quote to fit wholly inside one complete passage sentence', () => {
    expect(evidenceSentences(reading('They walked home. They met Ben.', 'walked home. They met'))).toEqual([])
  })

  it('supports meaningful Chinese evidence without promoting very short generic fragments', () => {
    const item = reading('活动在明天举行。学生需要自带水杯。请提前到达。', '学生需要自带水杯')
    expect(evidenceSentences(item).map(sentence => [sentence.text, sentence.matched])).toEqual([
      ['活动在明天举行。', false], ['学生需要自带水杯。', true], ['请提前到达。', false],
    ])
    expect(evidenceSentences(reading('它是在那里的。', '它是在那里'))).toEqual([])
  })

  it('ignores non-reading and empty passages even when their explanation contains a quote', () => {
    const item = reading('We met in the hall.', 'met in the hall')
    expect(evidenceSentences({ ...item, skill: 'listening' })).toEqual([])
    expect(evidenceSentences({ ...item, passage: undefined })).toEqual([])
    expect(evidenceSentences({ ...item, passage: ' \n ' })).toEqual([])
  })
})

describe('complete passage sentence boundaries', () => {
  it('preserves Mr./Ms./Dr. titles, initials and decimal prices', () => {
    const item = reading('Mr. Li met Ms. Green and Dr. A. Chen. They paid 3.50 yuan each. The total was 10.50 yuan.', 'They paid 3.50 yuan each')
    expect(evidenceSentences(item).map(sentence => sentence.text)).toEqual([
      'Mr. Li met Ms. Green and Dr. A. Chen.', 'They paid 3.50 yuan each.', 'The total was 10.50 yuan.',
    ])
  })

  it('keeps time abbreviations and examples inside a sentence while allowing the next sentence', () => {
    const item = reading('The U.S. team meets at 4 p.m. on Friday. Bring supplies, e.g. paper and pens. We finish at 5 p.m. Please arrive early.', 'paper and pens')
    expect(evidenceSentences(item).map(sentence => sentence.text)).toEqual([
      'The U.S. team meets at 4 p.m. on Friday.', 'Bring supplies, e.g. paper and pens.', 'We finish at 5 p.m.', 'Please arrive early.',
    ])
  })

  it('keeps quoted punctuation and a reporting clause with the complete sentence', () => {
    const item = reading('“Are you ready?” asked Dr. Li. “Bring the blue notebook,” she added. “I have it!” Ben replied. Then they left.', 'Bring the blue notebook')
    expect(evidenceSentences(item).map(sentence => sentence.text)).toEqual([
      '“Are you ready?” asked Dr. Li.', '“Bring the blue notebook,” she added.', '“I have it!” Ben replied.', 'Then they left.',
    ])
  })

  it('retains closing quotes, ellipses and an unpunctuated final line', () => {
    const item = reading('Ben waited... Then he said, "We will use the hall." The others agreed!\nBring your own notebook', 'use the hall')
    expect(evidenceSentences(item).map(sentence => sentence.text)).toEqual([
      'Ben waited...', 'Then he said, "We will use the hall."', 'The others agreed!', 'Bring your own notebook',
    ])
  })

  it('preserves source blank labels and numbered instructions instead of filling or stripping them', () => {
    const item = reading('1. Read the whole paragraph. 〔1〕_____ Look for the final decision.\n2. Check the next paragraph.', 'Look for the final decision')
    expect(evidenceSentences(item).map(sentence => sentence.text)).toEqual([
      '1. Read the whole paragraph.', '〔1〕_____ Look for the final decision.', '2. Check the next paragraph.',
    ])
    expect(evidenceSentences(reading(item.passage!, '〔本空〕 Look for the final decision'))).toEqual([])
  })
})

describe('post-answer exploratory feedback', () => {
  const item = reading('They first chose the playground. They will meet in the hall instead.', 'meet in the hall')
  it('quotes only the exact authored reason from a step linked to the matched source segment', () => {
    item.explanation.steps.unshift({ text: 'A different step about a different clue.', reason: 'Unrelated reason must not appear.' })
    const feedback = evidenceFeedback(item, 'evidence-sentence-2')
    expect(feedback.correct).toBe(true)
    expect(feedback.message).toContain(item.explanation.steps[1].reason)
    expect(feedback.message).not.toContain('Unrelated reason')
  })

  it('uses a neutral confirmation when no step explicitly identifies that evidence', () => {
    const changed = structuredClone(item)
    changed.explanation.steps = [{ text: 'They chose a building.', reason: 'A reason without a direct quotation.' }]
    expect(evidenceFeedback(changed, 'evidence-sentence-2')).toEqual({ correct: true, message: '找对了，这句包含解析引用的原文线索。再联系问题，说说这处信息为什么有用。' })
  })

  it('encourages rereading on wrong, invalid or unsupported selections without revealing the answer', () => {
    for (const id of ['evidence-sentence-1', 'invented', 'evidence-sentence-02', '']) {
      const feedback = evidenceFeedback(item, id)
      expect(feedback.correct).toBe(false)
      expect(feedback.message).not.toContain('hall')
      expect(feedback.message).not.toContain(item.answer.display)
      expect(feedback.message).not.toContain(item.explanation.steps.at(-1)!.reason)
    }
    expect(evidenceFeedback({ ...item, skill: 'grammar' }, 'evidence-sentence-2').correct).toBe(false)
  })

  it('does not modify answers, marks, explanations or the source question', () => {
    const before = JSON.stringify(item)
    for (const sentence of evidenceSentences(item)) evidenceFeedback(item, sentence.id)
    expect(JSON.stringify(item)).toBe(before)
    expect(Object.keys(evidenceFeedback(item, 'evidence-sentence-2')).sort()).toEqual(['correct', 'message'])
  })
})

describe('real authored course evidence boundaries', () => {
  it.each(['q-r-course-t01-1-1', 'q-r-course-t20-1-1', 'q-r-course-t24-1-1', 'q-r-short-answers-1-1'])('locates complete literal evidence in %s', id => {
    const item = source.questions.find(question => question.id === id)!
    const sentences = evidenceSentences(item), matches = sentences.filter(sentence => sentence.matched)
    expect(matches.length).toBeGreaterThan(0)
    for (const sentence of matches) {
      expect(item.passage).toContain(sentence.text)
      expect(evidenceFeedback(item, sentence.id).correct).toBe(true)
      expect(evidenceFeedback(item, sentence.id).message).toContain(item.explanation.steps[0].reason)
    }
    expect(sentences.some(sentence => !sentence.matched)).toBe(true)
  })

  it('accepts literal cloze context while withholding an absent answer word and altered restoration blanks', () => {
    const item = source.questions.find(question => question.id === 'q-r-cloze-1-1')!
    const matches = evidenceSentences(item).filter(sentence => sentence.matched)
    expect(matches.map(sentence => sentence.text)).toEqual(['At first, we thought growing vegetables would be easy.', 'We planted seeds and waited, but very little happened.'])
    expect(item.passage).toContain('turn it into a _____.')
    const answerOnly = structuredClone(item)
    answerOnly.explanation.visual.segments = [{text: item.answer.display, role: 'evidence', note: 'Absent missing word'}]
    expect(evidenceSentences(answerOnly)).toEqual([])
    expect(evidenceSentences(source.questions.find(question => question.id === 'q-r-restoration-1-1')!)).toEqual([])
  })

  it('offers only literal source evidence across the real catalog, never non-reading tasks', () => {
    let supported = 0
    for (const item of source.questions) {
      const sentences = evidenceSentences(item)
      if (!sentences.length) continue
      supported++
      expect(item.skill).toBe('reading')
      expect(sentences.some(sentence => sentence.matched)).toBe(true)
      for (const sentence of sentences) {
        expect(item.passage).toContain(sentence.text)
        expect(evidenceFeedback(item, sentence.id).correct).toBe(sentence.matched)
      }
    }
    expect(supported).toBeGreaterThan(200)
    expect(supported).toBeLessThan(source.questions.filter(question => question.skill === 'reading').length)
  })
})
