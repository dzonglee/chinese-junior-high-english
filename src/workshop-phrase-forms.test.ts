// Explicit phrase alternatives must work without accepting malformed metadata.
// These assertions target the actual metadata defect and preserve phrase boundaries.
import {it,expect} from 'vitest'
import {workshopProblems,containsWorkshopWord} from './core/lesson-workshop'
import type {LessonWorkshop} from './core/lesson-workshop'
const phraseWorkshop=(form:string):LessonWorkshop=>({kind:'word-use',title:'Phrase spelling',instruction:'Use the explicitly authored form.',items:[{id:'word-stomachache',label:'腹痛',prompt:'Read and write.',answer:'stomachache',meaning:'腹痛',material:'I have a stomachache.',reason:'The alternate form is stomach ache.',hint:'Use the given form.',spellings:['stomachache',form],ownForms:['stomachache',form]}]})
it('retains bounded multiword spelling alternatives without accepting malformed metadata',()=>{
 expect(workshopProblems(phraseWorkshop('stomach ache'))).toEqual([])
 for(const form of [' stomach ache','stomach ache ','stomach  ache','stomach\tache','stomach\nache','stomach ache now please','stomach <ache>','stomach/ache','stomachache'])expect(workshopProblems(phraseWorkshop(form)).length).toBeGreaterThan(0)
 const upper=phraseWorkshop('STOMACH ACHE');expect(workshopProblems(upper)).toContain('Invalid own-use word forms')
})
it('matches explicit phrase forms as whole terms and keeps unlisted inflections outside guided evidence',()=>{
 const item=phraseWorkshop('stomach ache').items[0]
 expect(containsWorkshopWord('I have a stomach ache after lunch.',item)).toBe(true)
 expect(containsWorkshopWord('I have a stomachache after lunch.',item)).toBe(true)
 for(const text of ['I have a stomach aching after lunch.','I have a badstomach ache after lunch.','I have a stomach acheful feeling.'])expect(containsWorkshopWord(text,item)).toBe(false)
 const pencil={...item,answer:'pencil-case',ownForms:['pencil-case','pencil case']}
 expect(containsWorkshopWord('My pencil case has a broken zip.',pencil)).toBe(true)
 expect(containsWorkshopWord('My pencil-case has a broken zip.',pencil)).toBe(true)
 expect(containsWorkshopWord('My pencil cases have broken zips.',pencil)).toBe(false)
})

import {authorCatalog} from '../scripts/lib/author-content.mjs'
import {checkAnswer} from './core/answers'
import {createLessonTeaching,freshTeaching,changeTeaching} from './core/lesson-teaching'
import {workshopView} from './core/lesson-workshop'
it('accepts both taught stomachache forms in independent questions, word cards and the full guided writing lifecycle',()=>{
 const c=authorCatalog(process.cwd()),q=c.questions.find(q=>q.id==='q-v-course-health-stomachache')!,card=c.vocabulary.find(v=>v.word==='stomachache')!
 expect(q.answer).toMatchObject({accepted:['stomachache','stomach ache']});expect(q.stem).toContain('两种常用写法均可');expect(q.stem).not.toContain('英美')
 expect(checkAnswer(q,'stomach ache')).toBe(true);expect(checkAnswer(q,'stomachache')).toBe(true);expect(checkAnswer(q,'stomach aching')).toBe(false)
 expect(card.acceptedSpellings).toEqual(['stomach ache'])
 const british=c.questions.find(q=>q.id==='q-v-course-arts-colour')!;expect(british.stem).toContain('英美拼写均可');expect(checkAnswer(british,'color')).toBe(true)
 const s=createLessonTeaching(c,c.lessons.find(l=>l.id==='l-v-course-health-2')!),w=s.mission!.workshop!
 for(const form of ['stomachache','stomach ache']){
  let p={...freshTeaching(s,1),step:1};p=changeTeaching(s,p,'workshop-item','2',2);p=changeTeaching(s,p,'workshop-input',form,3)
  for(const id of ['pain','nurse'])p=changeTeaching(s,p,'workshop-record-toggle',id,4)
  p=changeTeaching(s,p,'workshop-check','',5);expect(workshopView(w,p).correct).toBe(true)
  p=changeTeaching(s,p,'workshop-own','I told my mother about my '+form+' after lunch.',6);p=changeTeaching(s,p,'workshop-save','',7);expect(workshopView(w,p).complete).toBe(true)
  p=changeTeaching(s,p,'workshop-record-toggle','pain',8);expect(workshopView(w,p).complete).toBe(false);expect(workshopView(w,p).own).toContain(form)
 }
})
