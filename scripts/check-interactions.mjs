import assert from 'node:assert/strict'
import { build } from 'esbuild'
import { createHash } from 'node:crypto'
import { readFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { authorCatalog } from './lib/author-content.mjs'
const root = resolve(import.meta.dirname,'..'), target = resolve(root,'.local/tools/interactions.mjs')
mkdirSync(resolve(root,'.local/tools'),{recursive:true})
await build({ stdin: { contents: "export * from './src/core/experiments';export * from './src/core/scene-experiment';export * from './src/core/reading-evidence'",resolveDir:root,loader:'ts' },bundle:true,platform:'node',format:'esm',outfile:target })
const {experiments,sceneExperiment,validateExperiments,evidenceSentences}=await import(pathToFileURL(target))
const c=authorCatalog(root), all=[sceneExperiment,...experiments]
assert.deepEqual(validateExperiments(c.topics.map(t=>t.id),all),[])
assert(Object.keys(c.instructionalFiles).length>=15);for(const file of ['src/core/lesson-teaching.ts','src/core/teaching-transfers.ts','src/core/phonetic-sorting.ts','web/lesson-studio.ts','miniprogram/components/lesson-studio/index.wxml'])assert(c.instructionalFiles[file],`Missing approval coverage: ${file}`)
for(const [file,sha256] of Object.entries(c.instructionalFiles)) assert.equal(createHash('sha256').update(readFileSync(resolve(root,file))).digest('hex'),sha256)
for(const e of all) assert.equal(e.grade,Math.min(...c.topics.find(t=>t.id===e.topicId).grades))
for(const asset of JSON.parse(readFileSync(resolve(root,'content/visual-assets.json'),'utf8')).assets){assert.equal(createHash('sha256').update(readFileSync(resolve(root,asset.file))).digest('hex'),asset.sha256);assert(asset.ownerAuthorization && asset.inspection);assert.deepEqual(asset.referencesUsed,[])}
const reading=c.questions.filter(q=>q.skill==='reading'), mapped=reading.filter(q=>evidenceSentences(q).length)
assert(mapped.length>0);assert(c.questions.filter(q=>q.skill!=='reading').every(q=>!evidenceSentences(q).length))
console.log(`Interaction audit passed: ${all.length} workshops, ${all.reduce((n,e)=>n+e.conditions.length,0)} live conditions; exact evidence locator for ${mapped.length}/${reading.length} reading tasks. No exploration is a mastery score.`)
