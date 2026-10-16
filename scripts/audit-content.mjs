import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import { authorCatalog } from './lib/author-content.mjs'
import { validationModule } from './lib/compile.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const catalog = authorCatalog(root)
const { contentProblems } = await validationModule(root)
const errors = contentProblems(catalog)
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log(`Content audit passed: ${catalog.topics.length} topics, ${catalog.lessons.length} lessons, ${catalog.questions.length} original questions, ${catalog.vocabulary.length} vocabulary entries.`)
console.log('Editorial state: draft. Research files are not included in learner content packs.')
