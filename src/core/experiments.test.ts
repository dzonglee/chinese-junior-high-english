import { describe, expect, it } from 'vitest'
import grammar from '../../content/grammar.json'
import courseGrammar from '../../content/course-grammar.json'
import { experiments, getExperiment, validateExperiments } from './experiments'

const topics = [...grammar, ...courseGrammar]
const answer = (task: { options: { id: string; text: string }[]; correct: string }) => task.options.find(o => o.id === task.correct)?.text

describe('original language experiments', () => {
  it('covers twelve real, distinct topics at their catalog entry grade', () => {
    expect(experiments).toHaveLength(12)
    expect(validateExperiments(topics.map(t => t.id))).toEqual([])
    for (const e of experiments) expect(e.grade).toBe(topics.find(t => t.id === e.topicId)?.minGrade)
    expect(getExperiment('not-a-workshop')).toBeUndefined()
    for (const e of experiments) expect(getExperiment(e.id)).toBe(e)
  })
  it('keeps three complete, genuinely distinct manipulable conditions per workshop', () => {
    for (const e of experiments) {
      expect(e.conditions).toHaveLength(3)
      expect(new Set(e.conditions.map(c => c.label)).size).toBe(3)
      for (const c of e.conditions) {
        expect(c.parts.map(p => p.text).join('')).toBe(c.sentence)
        expect(c.sentence).toMatch(/[.?]$/)
        expect(c.sentence).not.toMatch(/\[\[|___/)
      }
    }
  })
  it('keys predictions to the explicitly described initial condition', () => {
    const expected: Record<string, string> = {
      'e-be': 'is', 'e-present': 'feed', 'e-continuous': 'is drawing', 'e-past': 'walked',
      'e-future': 'are going to', 'e-perfect': 'has', 'e-comparison': 'longer', 'e-pronouns': 'She',
      'e-passive': 'repaired', 'e-modals': 'must not', 'e-conditionals': 'rains', 'e-object-clauses': 'is the map',
    }
    for (const e of experiments) expect(answer(e.prediction), e.id).toBe(expected[e.id])
  })
  it('identifies the actual error rather than a grammatical alternative', () => {
    const errors: Record<string, string> = {
      'e-be': 'The bag are by the door.', 'e-present': 'He does not feeds the rabbit.',
      'e-continuous': 'The boy painting now.', 'e-past': 'Did he opened the gate?',
      'e-future': 'She is going to paints the fence.', 'e-perfect': 'He has broke the cup.',
      'e-comparison': 'This path is as longer as that one.', 'e-pronouns': 'She knows I.',
      'e-passive': 'The gate was lock at six.', 'e-modals': 'You must to wait outside.',
      'e-conditionals': 'If it will snow tomorrow, we will stay inside.', 'e-object-clauses': 'I wonder where is the key.',
    }
    for (const e of experiments) {
      expect(answer(e.spot), e.id).toBe(errors[e.id])
      expect(new Set(Object.values(e.spot.reasons)).size).toBe(3)
    }
  })
  it('transfers each discovery into a new, correctly keyed context', () => {
    const expected = [
      'The teacher is by the window.', 'My sister washes her bike at weekends.',
      'The cats are sleeping now.', 'Did you watch the match last night?',
      'I am going to visit my aunt tomorrow.', 'I have eaten breakfast.',
      'This tower is the shortest of the three.', 'Tom helps us.',
      'The desks were cleaned yesterday.', 'You need not bring a bottle.',
      'If the bus arrives early, we will catch the train.', 'I wonder where the station is.',
    ]
    expect(experiments.map(e => answer(e.transfer))).toEqual(expected)
    for (const e of experiments) expect(e.conditions.map(c => c.sentence)).not.toContain(answer(e.transfer))
  })
  it('preserves the distinction between tense, voice and sentence roles', () => {
    const passive = getExperiment('e-passive')!
    expect(passive.conditions.map(c => c.time)).toEqual(['past', 'past', 'future'])
    expect(passive.conditions[0].parts.find(p => p.role === 'subject')?.text).toBe('Leo ')
    expect(passive.conditions[1].parts.find(p => p.role === 'subject')?.text).toBe('The bike ')
    expect(passive.conditions[2].sentence).toContain('will be repaired')
    const embedded = getExperiment('e-object-clauses')!
    expect(embedded.conditions.map(c => c.sentence)).toEqual(['Where is the map?', 'I wonder where the map is.', 'I wonder where the maps are.'])
    expect(getExperiment('e-perfect')!.conditions[2].sentence).toBe('She has not washed the cups yet.')
  })
  it('detects unknown topics and broken answer/explanation/diagram contracts', () => {
    expect(validateExperiments([])).toHaveLength(12)
    const e = experiments[0], original = structuredClone(e)
    try {
      e.prediction.correct = 'missing'
      e.spot.reasons = {}
      e.conditions[0].parts[0].text = 'broken '
      e.conditions[1].sentence = e.conditions[2].sentence
      const problems = validateExperiments(topics.map(t => t.id))
      expect(problems).toContain('e-be: prediction: correct answer is not an option')
      expect(problems).toContain('e-be: spot: explain every option')
      expect(problems).toContain('e-be: one: parts must reconstruct the complete sentence')
      expect(problems).toContain('e-be: conditions must change the sentence')
    } finally { Object.assign(e, original) }
    expect(validateExperiments(topics.map(t => t.id))).toEqual([])
  })
})
