import { it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { authorCatalog } from '../scripts/lib/author-content.mjs'
import { Application } from './app/application'
import { ContentRepository } from './services/content'
import { StateStore } from './services/storage'
import { emptyState } from './core/learning'
import { createLessonTeaching, freshTeaching } from './core/lesson-teaching'

it.each(['before','after'] as const)('retains the native controlled %s draft through consecutive input events',field=>{
 const c=authorCatalog(process.cwd()),lesson=c.lessons.find((l:any)=>l.topicId==='w-email')!,s=createLessonTeaching(c,lesson),p=freshTeaching(s,1)
 p.step=field==='before'?0:2;p.before=field==='before'?'':'My original own draft.'
 const data=new Map<string,string>(),store=new StateStore({read:k=>data.get(k)??null,write:(k,v)=>{data.set(k,v)},remove:k=>{data.delete(k)}},c,1)
 store.save({...emptyState(1),profile:{cityId:'北京-北京',structure:'63',grade:Math.min(...lesson.grades),term:'upper',editionId:'pep-legacy',dailyMinutes:20,schoolYear:2026,createdAt:1},teaching:{[lesson.id]:p}})
 const app=new Application(new ContentRepository(c,[],async()=>''),store,{now:()=>1,navigate(){},back(){},toast(){},confirm:async()=>true,exportText:async()=>{},importText:async()=>null,copy:async()=>{},play:async()=>{},stopAudio(){},startRecording:async()=>{},stopRecording:async()=>({path:'test',durationMs:1}),removeRecordings:async()=>{}})
 app.open('lesson',{id:lesson.id})
 let component:any
 vm.runInNewContext(readFileSync('miniprogram/components/app-shell/index.js','utf8'),{Component:(value:any)=>{component=value}})
 const model:any={screen:structuredClone(app.render())},context={application:app,setData(patch:Record<string,unknown>){for(const [path,value]of Object.entries(patch)){const keys=path.split('.');let current=model;for(const key of keys.slice(0,-1))current=current[key];current[keys[keys.length-1]]=structuredClone(value)}}}
 for(const text of ['My own','My own new draft explains the task.']){
  component.methods.studioInput.call(context,{detail:{name:field==='before'?'studioBefore':'studioAfter',value:text}})
  // This is the actual textarea's bound value, not merely the persisted application field.
  expect(model.screen.teaching.progress[field]).toBe(text)
  expect(store.get().teaching![lesson.id][field]).toBe(text)
 }
 expect(store.get().attempts).toEqual([])
})
