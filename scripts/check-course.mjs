import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { authorCatalog } from './lib/author-content.mjs'
import { courseProblems } from './lib/course-validation.mjs'
const root = resolve(import.meta.dirname, '..'), read = file => JSON.parse(readFileSync(resolve(root, 'content', file), 'utf8'))
const catalog = authorCatalog(root), plan = read('course-plan.json'), coverage = read('course-coverage.json'), errors = courseProblems(catalog, plan, coverage)
const wordCount = text => (text.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) ?? []).length
for (const record of read('course-reading.json')) for (const text of record.texts) {
  const [minimum, maximum] = { 7: [80, 130], 8: [120, 170], 9: [150, 200] }[record.minGrade]
  if (wordCount(text.text) < minimum || wordCount(text.text) > maximum) errors.push(`Reading length misses its authored grade band: ${record.id}`)
  for (const item of text.items) if (!text.text.includes(item[4])) errors.push(`Reading evidence is absent: ${record.id}`)
}
for (const record of read('course-expression.json')) {
  if (new Set(record.cases.map(t => t.stem)).size !== 6 || new Set(record.cases.map(t => t.model)).size !== 6) errors.push(`Expression lesson must contain six distinct tasks: ${record.id}`)
  for (const task of record.cases) {
    if (!task.model.includes(task.evidence)) errors.push(`Expression model omits its evidence: ${record.id}`)
    const band = task.stem.match(/(\d+)[—–-](\d+)词/)
    if (band && (wordCount(task.model) < Number(band[1]) || wordCount(task.model) > Number(band[2]))) errors.push(`Expression model misses its word band: ${record.id}`)
    const sentences = task.stem.match(/(?:说|写)(\d+)[—–-](\d+)句/)
    const count = task.model.split(/[.!?]+(?:\s|$)/).filter(s => s.trim()).length
    if (sentences && (count < Number(sentences[1]) || count > Number(sentences[2]))) errors.push(`Expression model misses its sentence band: ${record.id}`)
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
const report = { scope: 'Original junior-high capability course; not verified publisher-unit or local exam coverage.', lessons: catalog.lessons.length, questions: catalog.questions.length, vocabulary: catalog.vocabulary.length, themes: plan.themes.length, grammarObjectives: coverage.grammarObjectives.length, pronunciationUnits: coverage.pronunciationTopics.length, pendingAudio: catalog.media.filter(m => !m.approvedByOwner).length, skills: Object.fromEntries(plan.requiredThemeSkills.map(skill => [skill, plan.themes.filter(theme => catalog.topics.some(t => t.course?.themeId === theme.id && t.skill === skill)).length])), orphanQuestions: 0, topicsWithoutLessons: 0 }
mkdirSync(resolve(root, 'dist'), { recursive: true }); writeFileSync(resolve(root, 'dist/course-coverage.json'), JSON.stringify(report, null, 2) + '\n')
console.log(`Course coverage passed: ${report.lessons} full lessons, ${report.questions} tasks, ${report.vocabulary} words; all 29 themes across four skills, 58 grammar objectives and eight pronunciation-knowledge units.`)
console.log(`${report.pendingAudio} scripts await approved audio. Videos deferred; source remains draft.`)
