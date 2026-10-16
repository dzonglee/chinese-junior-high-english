import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
const read = (root, file) => JSON.parse(readFileSync(resolve(root, file), 'utf8'))
export function attachCourse(root, catalog) {
  const plan = read(root, 'content/course-plan.json'), assignments = new Map()
  for (const file of ['course-reading.json', 'course-expression.json', 'course-listening.json']) for (const record of read(root, `content/${file}`)) {
    const theme = plan.themes.find(t => t.id === record.themeId)
    if (!theme || theme.grade !== record.minGrade) throw new Error(`Course theme/grade mismatch: ${record.id}`)
    assignments.set(record.id, { grade: theme.grade, term: theme.term, themeId: theme.id })
  }
  for (const group of read(root, 'content/course-vocabulary-groups.json')) assignments.set(group.id, { grade: group.minGrade, term: group.term })
  const lower = new Set(['g-past', 'g-future', 'g-comparison', 'g-perfect', 'g-past-continuous', 'g-infinitives', 'g-gerunds', 'g-conditionals', 'g-relatives', 'g-concession', 'g-time-clauses', 'g-reason-purpose', 'g-adverb-comparison', 'g-ordinals', 'g-conversion', 'g-object-complements', 'g-participles'])
  for (const topic of catalog.topics) topic.course = assignments.get(topic.id) ?? { grade: Math.min(...topic.grades), term: lower.has(topic.id) ? 'lower' : 'upper' }
  catalog.course = { id: plan.id, title: plan.title, sequence: 'original', themes: plan.themes }
  return catalog
}
