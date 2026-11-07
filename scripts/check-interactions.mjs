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
const assets=JSON.parse(readFileSync(resolve(root,'content/visual-assets.json'),'utf8')).assets
for(const asset of assets){
 assert.equal(createHash('sha256').update(readFileSync(resolve(root,asset.file))).digest('hex'),asset.sha256)
 assert(asset.ownerAuthorization && asset.inspection);assert(Array.isArray(asset.referencesUsed))
 const ids=asset.referenceAssetIds??[];assert(Array.isArray(ids));assert.equal(ids.length,asset.referencesUsed.length,`Every image reference needs an explicit original asset ID: ${asset.id}`);assert.equal(new Set(ids).size,ids.length)
 for(const id of ids){const source=assets.find(a=>a.id===id);assert(source&&id!==asset.id&&source.kind==='original-ai-generated'&&source.ownerAuthorization&&source.originalWorkspacePath,`Image references must resolve to an authorized owner-original asset: ${asset.id}`)}
}
// Reference provenance forms an acyclic graph; no unregistered external image is accepted.
const trace=(id,seen=new Set())=>{assert(!seen.has(id),'Cyclic image provenance');const next=new Set([...seen,id]);for(const ref of assets.find(a=>a.id===id).referenceAssetIds??[])trace(ref,next)}
for(const a of assets)trace(a.id)
const reading=c.questions.filter(q=>q.skill==='reading'), mapped=reading.filter(q=>evidenceSentences(q).length)
assert(mapped.length>0);assert(c.questions.filter(q=>q.skill!=='reading').every(q=>!evidenceSentences(q).length))
console.log(`Interaction audit passed: ${all.length} workshops, ${all.reduce((n,e)=>n+e.conditions.length,0)} live conditions; exact evidence locator for ${mapped.length}/${reading.length} reading tasks. No exploration is a mastery score.`)
