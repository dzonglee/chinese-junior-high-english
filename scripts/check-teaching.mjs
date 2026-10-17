import assert from 'node:assert/strict'
import { build } from 'esbuild'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { authorCatalog } from './lib/author-content.mjs'
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'.local/tools/teaching.mjs')
mkdirSync(resolve(root,'.local/tools'),{recursive:true})
await build({stdin:{contents:"export * from './src/core/lesson-teaching';export * from './src/core/spelling'",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:out})
const {createLessonTeaching,teachingProblems,editionQuestion,editionWord}=await import(pathToFileURL(out)),source=authorCatalog(root),rows=[]
for(const spelling of ['american','british']){
 const c={...source,questions:source.questions.map(q=>editionQuestion(q,spelling)),vocabulary:source.vocabulary.map(w=>editionWord(w,spelling))}
 for(const lesson of c.lessons){const s=createLessonTeaching(c,lesson,spelling);assert.deepEqual(teachingProblems(s,lesson),[]);assert.notEqual(s.prediction.id,s.transfer.id);rows.push({id:lesson.id,topicId:lesson.topicId,spelling,mode:s.mode,assemblies:s.assemblies.length,tiles:s.assemblies.reduce((n,a)=>n+a.tiles.length,0),contexts:s.cases.length,evidence:s.evidence.length,sortingCards:s.sorting?.cards.length??0,revisionCriteria:s.rubric.length,mediaPending:s.mediaPending,fingerprint:s.fingerprint})}
}
const report={lessons:source.lessons.length,variants:rows.length,modes:Object.fromEntries([...new Set(rows.map(r=>r.mode))].map(mode=>[mode,rows.filter(r=>r.mode===mode&&r.spelling==='american').length])),rows}
mkdirSync(resolve(root,'dist'),{recursive:true});writeFileSync(resolve(root,'dist/teaching-coverage.json'),JSON.stringify(report,null,2)+'\n')
console.log(`Teaching audit passed: ${report.lessons} lessons, ${report.variants} spelling variants; ${JSON.stringify(report.modes)}. All phases substantive; delayed items unexposed.`)
