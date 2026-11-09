import {expect,it} from 'vitest'
import {readFileSync,readdirSync} from 'node:fs'
import {authorCatalog} from '../scripts/lib/author-content.mjs'
import {checkAnswer} from './core/answers'
import type {ContentCatalog} from './core/types'
const catalog:ContentCatalog=authorCatalog(process.cwd())
it('avoids a reusable reading answer key and balances all eight written papers',()=>{
 const readingKeys=[]
 for(const paper of catalog.mockPapers!){
  const questions=paper.sections.flatMap(s=>s.questionIds.map(id=>catalog.questions.find(q=>q.id===id)!)).filter(q=>q.kind==='choice')
  expect(['a','b','c'].map(letter=>questions.filter(q=>q.answer.option===letter).length)).toEqual([7,7,7])
  readingKeys.push(paper.sections.filter(s=>s.id==='reading').flatMap(s=>s.questionIds.map(id=>catalog.questions.find(q=>q.id===id)!.answer.option)).join(''))
 }
 expect(new Set(readingKeys).size).toBe(8)
 expect(authorCatalog(process.cwd()).mockPapers).toEqual(catalog.mockPapers)
})
it('keeps every authored mock answer and specific wrong reason attached to its text after rearrangement',()=>{
 let checked=0
 for(const file of readdirSync('content/mocks').filter(f=>f.endsWith('.json'))){
  const p=JSON.parse(readFileSync('content/mocks/'+file,'utf8'))
  const rows=[...p.language.map((r:string[],i:number)=>({id:`${p.id}-language-${i+1}`,answer:r[2],wrong:[[r[3],r[6]],[r[4],r[7]]]})),...p.cloze.items.map((r:string[],i:number)=>({id:`${p.id}-cloze-${i+1}`,answer:r[0],wrong:[[r[1],r[5]],[r[2],r[6]]]})),...p.reading.flatMap((reading:{items:string[][]},k:number)=>reading.items.map((r,i)=>({id:`${p.id}-reading-${k+1}-${i+1}`,answer:r[1],wrong:[[r[2],r[6]],[r[3],r[7]]]})))]
  for(const row of rows){
   const q=catalog.questions.find(q=>q.id===row.id)!
   expect(q.options!.find(o=>o.id===q.answer.option)!.text).toBe(row.answer)
   expect(checkAnswer(q,q.answer.option!)).toBe(true)
   for(const[text,reason]of row.wrong){const option=q.options!.find(o=>o.text===text)!;expect(checkAnswer(q,option.id)).toBe(false);expect(q.explanation.distractors.find(d=>d.option===option.id)!.reason).toBe(reason)}
   checked++
  }
 }
 expect(checked).toBe(168)
})

it('requires weekday capitals in paper blanks without imposing case sensitivity on ordinary nouns',()=>{
 for(const id of ['mock-6-upper-task-2','mock-6-lower-task-1']){
  const q=catalog.questions.find(q=>q.id===id)!,correct=q.answer.accepted![0]
  expect(checkAnswer(q,correct)).toBe(true);expect(checkAnswer(q,correct.toLowerCase())).toBe(false)
 }
 const ordinary=catalog.questions.find(q=>q.id==='mock-7-upper-task-1')!
 expect(checkAnswer(ordinary,'library')).toBe(true);expect(checkAnswer(ordinary,'Library')).toBe(true)
})
