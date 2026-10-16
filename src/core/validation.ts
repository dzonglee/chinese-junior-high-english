import type { ContentCatalog, Question } from './types'

const SKILLS = new Set(['vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing'])
const KINDS = new Set(['choice', 'blank', 'order', 'correction', 'writing', 'speaking'])
const ID = /^[a-z][a-z0-9-]{1,90}$/
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value)
const text = (value: unknown, max = 10000): value is string => typeof value === 'string' && value.trim().length > 0 && value.length <= max
const list = (value: unknown): value is unknown[] => Array.isArray(value)

/** Shared by the compiler, cloud pack loader and private-question editor. */
export function questionProblems(value: unknown, path = 'question'): string[] {
  const errors: string[] = []
  const expect = (condition: unknown, message: string) => { if (!condition) errors.push(`${path}: ${message}`) }
  if (!object(value)) return [`${path}: expected an object`]
  const q = value
  expect(typeof q.id === 'string' && ID.test(q.id), 'invalid id')
  expect(typeof q.topicId === 'string' && ID.test(q.topicId), 'invalid topic')
  expect(SKILLS.has(String(q.skill)), 'invalid skill')
  expect(KINDS.has(String(q.kind)), 'invalid question kind')
  expect(typeof q.difficulty === 'number' && [1, 2, 3].includes(q.difficulty), 'invalid difficulty')
  expect(list(q.grades) && q.grades.length > 0 && q.grades.every((g) => typeof g === 'number' && [6, 7, 8, 9].includes(g)), 'invalid grades')
  expect(text(q.stem, 2000), 'missing or overlong stem')
  if (q.passage !== undefined) expect(text(q.passage, 10000), 'invalid passage')
  if (q.prompt !== undefined) expect(text(q.prompt, 2000), 'invalid prompt')
  if (q.feedbackGroup !== undefined) expect(typeof q.feedbackGroup === 'string' && ID.test(q.feedbackGroup), 'invalid feedback group')
  expect(typeof q.marks === 'number' && q.marks > 0 && q.marks <= 100, 'invalid marks')
  expect(typeof q.estimatedSeconds === 'number' && q.estimatedSeconds > 0 && q.estimatedSeconds <= 7200, 'invalid time estimate')
  expect(['draft', 'reviewed', 'released'].includes(String(q.review)), 'missing editorial state')
  if (!object(q.answer)) errors.push(`${path}: missing answer`)
  else {
    if (q.answer.caseSensitive !== undefined) expect(typeof q.answer.caseSensitive === 'boolean', 'invalid answer case rule')
    expect(text(q.answer.display, 4000), 'missing displayed answer')
    if (q.kind === 'choice') {
      const options = list(q.options) ? q.options : []
      expect(options.length >= 2 && options.length <= 7 && options.every((o) => object(o) && text(o.id, 20) && text(o.text, 1000)), 'invalid choice options')
      const ids = options.filter(object).map((o) => o.id)
      expect(new Set(ids).size === ids.length && ids.includes(q.answer.option), 'answer must name one unique option')
      const labels = options.filter(object).map((o) => typeof o.text === 'string' ? o.text.trim().toLowerCase() : '')
      expect(new Set(labels).size === labels.length, 'choice texts must be distinct')
    }
    if (q.kind === 'blank' || q.kind === 'correction') expect(list(q.answer.accepted) && q.answer.accepted.length > 0 && q.answer.accepted.every((a) => text(a, 4000)), 'missing accepted answer variants')
    if (q.kind === 'order') {
      const tokens = list(q.tokens) ? q.tokens.filter(object) : []
      const ids = tokens.map((t) => t.id), order = list(q.answer.order) ? q.answer.order : []
      expect(tokens.length >= 2 && tokens.length <= 30 && tokens.every((t) => text(t.id, 30) && text(t.text, 100)), 'invalid sentence tokens')
      expect(ids.length === new Set(ids).size && order.length === ids.length && new Set(order).size === order.length && order.every((id) => ids.includes(id)), 'sentence answer must use every token exactly once')
    }
  }
  if (!object(q.explanation)) errors.push(`${path}: missing explanation`)
  else {
    const e = q.explanation
    expect(text(e.strategy, 2000), 'explanation needs a strategy')
    expect(list(e.steps) && e.steps.length >= 2 && e.steps.every((s) => object(s) && text(s.text, 2000) && text(s.reason, 2000)), 'explanation needs reasoned steps')
    expect(text(e.pitfall, 2000), 'explanation needs a specific pitfall')
    expect(text(e.transfer, 2000), 'explanation needs a transfer prompt')
    const visual = object(e.visual) ? e.visual : {}
    expect(['sentence', 'timeline', 'evidence', 'comparison', 'paragraph'].includes(String(visual.kind)) && text(visual.title, 200) && text(visual.caption, 2000), 'explanation needs a named instructional visual')
    expect(list(visual.segments) && visual.segments.length >= 2 && visual.segments.every((s) => object(s) && text(s.text, 1500) && ['subject', 'verb', 'object', 'time', 'evidence', 'neutral'].includes(String(s.role))), 'invalid visual segments')
    if (q.kind === 'choice' && list(q.options) && object(q.answer)) {
      const distractors = list(e.distractors) ? e.distractors.filter(object) : []
      const expected = q.options.filter(object).filter((o) => o.id !== (q.answer as Record<string, unknown>).option)
      expect(distractors.length === expected.length && new Set(distractors.map((d) => d.option)).size === expected.length && expected.every((o) => distractors.some((d) => d.option === o.id && text(d.reason, 2000))), 'each wrong option needs its own reason')
    }
  }
  if (q.kind === 'writing' || q.kind === 'speaking') {
    const rubric = list(q.rubric) ? q.rubric.filter(object) : []
    expect(rubric.length >= 2 && new Set(rubric.map((p) => p.id)).size === rubric.length && rubric.every((p) => text(p.id, 40) && text(p.label, 300) && text(p.guidance, 1000) && typeof p.marks === 'number' && p.marks > 0), 'self-review needs clear, unique rubric points')
    expect(rubric.reduce((sum, p) => sum + (typeof p.marks === 'number' ? p.marks : 0), 0) === q.marks, 'rubric marks must match the question')
  }
  if (!object(q.source) || !['original', 'licensed'].includes(String(q.source.kind)) || !text(q.source.author, 200)) errors.push(`${path}: missing authorship/rights`)
  else if (q.source.kind === 'licensed') expect(text(q.source.license, 2000), 'licensed content needs a license record')
  return errors
}

export function contentProblems(catalog: ContentCatalog): string[] {
  const errors = catalog.questions.flatMap((q) => questionProblems(q, q.id))
  for (const key of ['topics', 'lessons', 'questions', 'vocabulary', 'media', 'cities', 'editions', 'blueprints'] as const) {
    const ids = catalog[key].map((item) => item.id)
    if (ids.length !== new Set(ids).size) errors.push(`${key}: duplicate IDs`)
  }
  const topics = new Set(catalog.topics.map((t) => t.id)), questions = new Map(catalog.questions.map((q) => [q.id, q]))
  for (const q of catalog.questions) {
    if (!topics.has(q.topicId)) errors.push(`${q.id}: unknown topic`)
    if (q.skill === 'listening' && (!q.mediaId || !catalog.media.some(m => m.id === q.mediaId))) errors.push(`${q.id}: listening question has no matching media record`)
  }
  for (const media of catalog.media) {
    if (!text(media.transcript) || typeof media.approvedByOwner !== 'boolean') errors.push(`${media.id}: incomplete audio transcript or approval state`)
    if (media.approvedByOwner && (!text(media.path) || !text(media.voice) || !text(media.model) || !text(media.license) || !/^[a-f0-9]{64}$/.test(media.sha256))) errors.push(`${media.id}: approved audio needs a file, model, voice, rights and checksum`)
  }
  for (const lesson of catalog.lessons) {
    if (!topics.has(lesson.topicId)) errors.push(`${lesson.id}: unknown lesson topic`)
    if (lesson.questionIds.length < 4 || lesson.delayedQuestionIds.length < 2) errors.push(`${lesson.id}: insufficient independent or delayed practice`)
    const all = [...lesson.questionIds, ...lesson.delayedQuestionIds]
    if (new Set(all).size !== all.length) errors.push(`${lesson.id}: guided and delayed questions must be distinct`)
    for (const id of all) {
      const q = questions.get(id)
      if (!q || q.topicId !== lesson.topicId || !lesson.grades.every((g) => q.grades.includes(g))) errors.push(`${lesson.id}: invalid topic/grade question reference ${id}`)
    }
  }
  for (const word of catalog.vocabulary) {
    if (!topics.has(word.topicId) || !text(word.word) || !text(word.meaning) || !text(word.example) || !text(word.exampleMeaning) || !text(word.explanation) || ![6, 7, 8, 9].includes(word.grade) || !['american', 'british', 'shared'].includes(word.spelling) || !Array.isArray(word.acceptedSpellings) || !word.acceptedSpellings.every(s => text(s))) errors.push(`${word.id}: incomplete original vocabulary entry`)
  }
  for (const book of catalog.books) {
    if (!catalog.editions.some(e => e.id === book.editionId) || ![6, 7, 8, 9].includes(book.grade) || !['upper', 'lower'].includes(book.term) || !book.units.length || new Set(book.units.map(u => u.id)).size !== book.units.length || book.units.some(u => !u.topicIds.length || !u.topicIds.every(id => topics.has(id)) || (u.verification === 'official' && !u.sourceIds.length)) || (book.verification === 'official' && (!book.sourceIds.length || book.units.some(u => u.verification !== 'official')))) errors.push(`${book.editionId}: incomplete or inconsistent exact-book mapping`)
  }
  for (const b of catalog.blueprints) {
    if (!catalog.cities.some((c) => c.id === b.cityId) || !Number.isInteger(b.examYear) || b.examYear < 2020 || !Number.isFinite(b.minutes) || b.minutes <= 0 || !Number.isFinite(b.totalMarks) || b.totalMarks <= 0 || !b.structures.length || !b.structures.every(s => s === '63' || s === '54') || !b.sections.length || b.sections.some((s) => !Number.isInteger(s.count) || s.count < 1 || !Number.isFinite(s.marksEach) || s.marksEach <= 0 || !SKILLS.has(s.skill)) || Math.abs(b.sections.reduce((sum, s) => sum + s.count * s.marksEach, 0) - b.totalMarks) > 1e-8 || !b.sourceIds.length) errors.push(`${b.id}: incomplete or inconsistent exam blueprint`)
  }
  return errors
}
export function assertQuestion(value: unknown): asserts value is Question {
  const errors = questionProblems(value)
  if (errors.length) throw new Error(errors.join('\n'))
}
