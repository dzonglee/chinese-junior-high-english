#!/usr/bin/env node
// Source-only assessment regressions: compile in memory and never emit content packs.
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { authorCatalog } from './lib/author-content.mjs'
import { checkAnswer } from '../src/core/answers.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const authored = JSON.parse(readFileSync(resolve(root, 'content/grammar.json'), 'utf8'))
const catalog = authorCatalog(root)
const questions = new Map(catalog.questions.map(question => [question.id, question]))
const question = id => { const value = questions.get(id); assert.ok(value, `Missing ${id}`); return value }
const check = (id, attempt, expected) => assert.equal(checkAnswer(question(id), attempt), expected, `${id}: ${JSON.stringify(attempt)}`)

// These were grammatical answers to the old underdetermined prompts. The new prompts
// explicitly supply the lexical/meaning constraint; they are no longer equivalent answers.
const constrained = [
  ['q-g-present-002', ['ride', '一般现在时肯定'], 'ride', 'wash'],
  ['q-g-past-002', ['buy', '一般过去时肯定'], 'bought', 'lost'],
  ['q-g-future-002', ['start', 'will'], 'will start', 'will end'],
  ['q-g-perfect-010', ['repair', '现在完成时肯定'], 'has repaired', 'has fixed'],
  ['q-g-passive-002', ['build', '一般过去时被动语态肯定'], 'was built', 'was repaired'],
  ['q-g-infinitives-002', ['buy', '目的'], 'to buy', 'to get'],
  ['q-g-gerunds-002', ['make', '动词-ing'], 'making', 'painting'],
  ['q-g-object-clauses-006', ['你是如何制作这个模型的', 'how、you、made、this、model', '各词只用一次'], 'how you made this model', 'where the library is'],
  ['q-g-pronouns-002', ['belongs to you', '名词性物主代词'], 'yours', 'mine'],
]

test('all 52 blanks and 38 corrections have authored constraints and preserve their declared answer lists', () => {
  let blanks = 0, corrections = 0
  for (const topic of authored) for (const [index, entry] of topic.cases.entries()) {
    const id = `q-${topic.id}-${String(index + 1).padStart(3, '0')}`, q = question(id)
    if (q.kind !== 'blank' && q.kind !== 'correction') continue
    q.kind === 'blank' ? blanks++ : corrections++
    const response = entry[5]
    assert.ok(response?.instruction?.trim(), `${id}: missing authored constraint`)
    assert.ok(q.stem.startsWith(response.instruction + '\n'), `${id}: learner cannot see the constraint`)
    assert.deepEqual(q.answer.accepted, response.accepted, `${id}: authored alternatives were lost`)
    for (const accepted of response.accepted) check(id, accepted, true)
    check(id, entry[1], true)
    check(id, entry[2], false)
    check(id, entry[3], false)
  }
  assert.equal(blanks, 52)
  assert.equal(corrections, 38)
})

test('formerly underdetermined prompts now state their lexical or meaning cues', () => {
  for (const [id, cues, intended, differentMeaning] of constrained) {
    const q = question(id)
    for (const cue of cues) assert.ok(q.stem.includes(cue), `${id}: missing ${cue}`)
    check(id, intended, true)
    check(id, differentMeaning, false)
  }
})

test('genuine grammatical equivalents, contractions and case variants remain correct', () => {
  const equivalents = {
    'q-g-object-clauses-002': ['whether', 'if', ' IF '],
    'q-g-relatives-002': ['which', 'that'],
    'q-g-relatives-003': ['that', 'which'],
    'q-g-modals-002': ['must not', "mustn't", 'mustn’t', 'cannot', "can't", 'can not'],
    'q-g-modals-003': ['do not have to', "don't have to", 'need not', "needn't", 'do not need to', "don't need to"],
    'q-g-conditionals-002': ['do not leave', "don't leave"],
    'q-g-conditionals-003': ['can', 'could', 'may'],
    'q-g-conjunctions-002': ['Although', 'though', 'While', 'whilst'],
  }
  for (const [id, answers] of Object.entries(equivalents)) for (const answer of answers) check(id, answer, true)
})

test('wrong grammar, the wrong relation and unsupported extra words still fail', () => {
  const wrong = {
    'q-g-present-002': ['rides', 'riding', 'do not ride'],
    'q-g-past-002': ['buy', 'buyed', 'did not buy'],
    'q-g-future-002': ['will starts', 'will started'],
    'q-g-perfect-010': ['have repaired', 'has repair', 'has been repairing'],
    'q-g-passive-002': ['built', 'is built', 'were built'],
    'q-g-modals-002': ['need not', 'do not have to', 'must not to', 'should not'],
    'q-g-infinitives-002': ['buying', 'to buying'],
    'q-g-gerunds-002': ['to make', 'made'],
    'q-g-object-clauses-002': ['that', 'what'],
    'q-g-object-clauses-006': ['how did you make this model', 'how you made the model'],
    'q-g-relatives-002': ['who', 'where', 'which it'],
    'q-g-relatives-003': ['who', 'where', 'which they'],
    'q-g-pronouns-002': ['your', 'you'],
    'q-g-conjunctions-002': ['Because', 'Unless', 'Even if'],
    'q-g-questions-003': ["don't", "aren't", 'have not'],
    'q-g-questions-006': ["didn't", "aren't", 'were not'],
  }
  for (const [id, answers] of Object.entries(wrong)) for (const answer of answers) check(id, answer, false)
})

test('explanations and diagrams acknowledge alternatives rather than claiming a unique expression', () => {
  for (const id of ['q-g-object-clauses-002', 'q-g-relatives-002', 'q-g-relatives-003', 'q-g-modals-002']) {
    const q = question(id)
    assert.ok(q.explanation.steps[1].text.startsWith('一种正确写法：'), id)
    for (const alternative of q.answer.accepted.slice(1)) assert.ok(q.explanation.steps[1].reason.includes(alternative), `${id}: missing alternative explanation`)
    assert.equal(q.explanation.visual.segments[1].note, '一种可用的表达')
  }
  assert.ok(!question('q-g-modals-002').explanation.steps[0].text.includes('必须用 must not'))
})

test('choice and order examples retain their closed, correct tasks', () => {
  const choice = question('q-g-be-001')
  assert.equal(choice.stem, 'Mia _____ ready for the class photo.')
  assert.deepEqual(choice.options.map(o => o.text), ['is', 'am', 'are'])
  check(choice.id, 'a', true)
  check(choice.id, 'b', false)
  const order = question('q-g-be-004')
  assert.deepEqual(order.tokens.map(t => t.text), ['is', 'cold.', 'The water in this bottle'])
  check(order.id, JSON.stringify(['start', 'target', 'end']), true)
  check(order.id, JSON.stringify(['target', 'start', 'end']), false)
})

test('the compiler refuses to silently regenerate singleton blanks without authored response data', () => {
  const fixture = mkdtempSync(resolve(tmpdir(), 'english-grammar-response-'))
  try {
    mkdirSync(resolve(fixture, 'content'))
    writeFileSync(resolve(fixture, 'content/course-grammar.json'), '[]')
    const rejects = [
      [undefined, /q-g-be-002: blank needs an authored instruction/],
      [{ instruction: '用 be 的一般现在时肯定形式填空。', accepted: [] }, /q-g-be-002: blank needs explicit accepted answers/],
      [{ instruction: '用 be 的一般现在时肯定形式填空。', accepted: ['is'] }, /q-g-be-002: blank needs explicit accepted answers/],
      [{ instruction: '用 be 的一般现在时肯定形式填空。', accepted: ['am', 'AM'] }, /q-g-be-002: duplicate accepted grammar answers/],
    ]
    for (const [response, expected] of rejects) {
      const topic = structuredClone(authored[0])
      topic.cases[1] = [...topic.cases[1].slice(0, 5), ...(response ? [response] : [])]
      writeFileSync(resolve(fixture, 'content/grammar.json'), JSON.stringify([topic]))
      assert.throws(() => authorCatalog(fixture), expected)
    }
  } finally { rmSync(fixture, { recursive: true, force: true }) }
})

test('grammar diagrams attach ending punctuation to the expression and retain meaningful trailing context', () => {
  const compact = question('q-g-linking-verbs-002')
  assert.deepEqual(compact.explanation.visual.segments.map(segment => segment.text), ['This blanket feels', 'soft.'])
  assert.deepEqual(compact.answer.accepted, ['soft'])
  assert.deepEqual(question('q-g-demonstratives-002').explanation.visual.segments.map(segment => segment.text), ['This', 'is my bag right here.'])
  const withContext = question('q-g-auxiliaries-002')
  assert.deepEqual(withContext.explanation.visual.segments.map(segment => segment.text), ['He does not', 'drink', 'coffee.'])
  for (const q of catalog.questions.filter(q => q.explanation.visual.title === '把线索与目标表达连起来')) {
    assert.ok(q.explanation.visual.segments.every(segment => !['先看句意', '句子完整'].includes(segment.text)), `${q.id}: empty context replaced with a placeholder`)
    assert.ok(q.explanation.visual.segments.length >= 2, `${q.id}: lost the explanation relationship`)
    assert.ok(q.explanation.visual.segments.every(segment => !/^[\p{P}\s]+$/u.test(segment.text)), `${q.id}: punctuation presented as a separate fact`)
  }
})

test('explicit sentence-initial capitalization is enforced per response without changing ordinary word-form answers', () => {
  for (const [id, correct, wrong] of [['q-g-demonstratives-002', 'This', 'this'], ['q-g-demonstratives-003', 'Those', 'those'], ['q-g-demonstratives-007', 'These', 'these'], ['q-g-auxiliaries-003', 'Did', 'did'], ['q-g-question-words-002', 'How', 'how'], ['q-g-question-words-003', 'Why', 'why'], ['q-g-question-words-006', 'When', 'when'], ['q-g-question-words-007', 'Where', 'where'], ['q-g-cardinals-003', 'Thousands', 'thousands'], ['q-g-contractions-003', "You're", "you're"], ['q-g-contractions-007', "Let's", "let's"], ['q-g-imperatives-002', 'Do not', 'do not'], ['q-g-imperatives-006', 'Wash', 'wash']]) {
    assert.equal(question(id).answer.caseSensitive, true)
    check(id, correct, true); check(id, wrong, false)
  }
  check('q-g-auxiliaries-002', 'DRINK', true)
  assert.ok(question('q-g-demonstratives-007').stem.includes('right here beside us'))
  assert.equal(question('q-g-proper-nouns-002').answer.caseSensitive, true)
})
