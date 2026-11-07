import { expect, it } from 'vitest'
import vm from 'node:vm'
import { build } from 'esbuild'
import { resolve } from 'node:path'
import { authorCatalog } from '../scripts/lib/author-content.mjs'
import { catalogModule } from '../scripts/lib/catalog-code.mjs'

it('round-trips every course catalog field through compact generated JavaScript', async () => {
  const full = authorCatalog(process.cwd())
  const metadata = { ...full, questions: [], questionIndex: full.questions.map(({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, mediaId, review, stem }) => ({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, ...(mediaId ? { mediaId } : {}), review, ...(['speaking','writing'].includes(kind) ? {prompt:stem.slice(0,24)} : {}) })) }
  const source = catalogModule(metadata)
  const compiled = await build({ stdin: { contents: source, loader: 'ts', resolveDir: resolve('src/generated') }, bundle: true, write: false, format: 'cjs', platform: 'neutral', charset: 'utf8' })
  const module = { exports: {} as { catalog?: typeof metadata } }
  // Execute the real decoder in a fresh mini-program-like context without Node Buffer or atob.
  vm.runInNewContext(compiled.outputFiles[0].text, { module, exports: module.exports })
  expect(JSON.parse(JSON.stringify(module.exports.catalog))).toEqual(JSON.parse(JSON.stringify(metadata)))
// This traverses the entire authored catalog, compiles it and compares every field.
// Its budget is separate from the default timeout for individual interaction tests.
}, 20000)
