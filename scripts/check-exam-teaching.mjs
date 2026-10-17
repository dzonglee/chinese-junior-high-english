import { build } from 'esbuild'
import {mkdirSync,writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {pathToFileURL} from 'node:url'
import assert from 'node:assert/strict'
import {authorCatalog} from './lib/author-content.mjs'
const root=resolve(import.meta.dirname,'..'),target=resolve(root,'.local/tools/exam-teaching.mjs')
mkdirSync(resolve(target,'..'),{recursive:true})
await build({entryPoints:[resolve(root,'src/core/lesson-teaching.ts')],bundle:true,platform:'node',format:'esm',outfile:target})
const {createLessonTeaching,teachingProblems,sourceEvidence}=await import(pathToFileURL(target)),catalog=authorCatalog(root),rows=[]
for(const lesson of catalog.lessons){
 const s=createLessonTeaching(catalog,lesson)
 assert.deepEqual(teachingProblems(s,lesson),[],lesson.id)
 assert(lesson.examCoaching?.task&&lesson.examCoaching?.check,lesson.id)
 assert(s.diagnoses.length>=1)
 if(s.mode==='language')assert(s.coaching.reasoning,lesson.id)
 if(s.mode==='communication')assert(s.rubric.every(r=>s.roleAnchors[r.id].length===1))
 rows.push({id:lesson.id,title:lesson.title,mode:s.mode,examSkill:s.coaching.task,check:s.coaching.check,coachedQuestionIds:s.exposedIds,protectedDelayedIds:lesson.delayedQuestionIds,clinics:s.diagnoses.map(d=>({prompt:d.prompt,options:d.options,correct:d.correct,feedback:d.reasons})),evidenceTasks:['reading','transcript'].includes(s.mode)?s.cases.map(q=>({questionId:q.id,quotes:sourceEvidence(q).filter(e=>e.supports).map(e=>e.text)})):[],modelRoles:s.rubric.map(r=>({role:r.label,anchor:s.roleAnchors[r.id]?.map(id=>s.modelSentences.find(t=>t.id===id)?.text)})),revisionChecks:s.revisionRubric.map(r=>r.label),audioPending:s.mediaPending})
}
mkdirSync(resolve(root,'docs/reviews'),{recursive:true})
writeFileSync(resolve(root,'docs/reviews/exam-teaching-2026-10-17.json'),JSON.stringify({scope:'Authored lesson-by-lesson exam coaching bindings and structural audit; not human semantic review or real-device evidence.',lessons:rows.length,rows},null,2)+'\n')
console.log(`Exam teaching audit: ${rows.length} lessons; ${rows.reduce((n,r)=>n+r.clinics.length,0)} clinic decisions; delayed items remain protected.`)
