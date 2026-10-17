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

it('preserves the native practice form on foreground, but opens a different returning route',()=>{
 let component:any
 let visibleRoute='pages/builder/index'
 vm.runInNewContext(readFileSync('miniprogram/components/app-shell/index.js','utf8'),{getCurrentPages:()=>[{route:visibleRoute}],Component:(value:any)=>{component=value}})
 let opens=0,ticks=0,starts=0,model:any
 const application={state:{profile:{}},page:'builder',params:{skill:'grammar'},form:{count:'2',kind:'choice',builderMore:'true'},open(page:string,params:Record<string,string>){opens++;this.page=page;this.params=params;this.form={count:'8',kind:'all',builderMore:'false'}},render(){return {page:this.page,fields:{...this.form}}},tick(){ticks++;return Promise.resolve()}}
 const context={application,data:{page:'builder',params:{skill:'grammar'}},setData(value:any){model=value.screen},startTicker(){starts++},showScreen(){component.methods.showScreen.call(this)}}
 component.pageLifetimes.show.call(context)
 expect(opens).toBe(0);expect(model.fields).toEqual({count:'2',kind:'choice',builderMore:'true'});expect(ticks).toBe(1);expect(starts).toBe(1)
 application.page='session'
 component.pageLifetimes.show.call(context)
 expect(opens).toBe(1);expect(application.page).toBe('builder')
 context.data.params={skill:'reading'}
 component.pageLifetimes.show.call(context)
 expect(opens).toBe(2);expect(application.params.skill).toBe('reading')
 visibleRoute='pages/session/index';application.page='session'
 component.pageLifetimes.show.call(context)
 expect(opens).toBe(2);expect(application.page).toBe('session')
})

it('opens setup on a fresh native home page and preserves that setup on foreground',async()=>{
 const c=authorCatalog(process.cwd()),data=new Map<string,string>(),store=new StateStore({read:k=>data.get(k)??null,write:(k,v)=>{data.set(k,v)},remove:k=>{data.delete(k)}},c,1)
 const app=new Application(new ContentRepository(c,[],async()=>''),store,{now:()=>1,navigate(){},back(){},toast(){},confirm:async()=>true,exportText:async()=>{},importText:async()=>null,copy:async()=>{},play:async()=>{},stopAudio(){},startRecording:async()=>{},stopRecording:async()=>({path:'test',durationMs:1}),removeRecordings:async()=>{}})
 let component:any,screen:any
 vm.runInNewContext(readFileSync('miniprogram/components/app-shell/index.js','utf8'),{getApp:()=>({globalData:{application:app,ready:Promise.resolve()}}),getCurrentPages:()=>[{route:'pages/home/index'}],Component:(value:any)=>{component=value}})
 const context:any={connectApplication(){return component.methods.connectApplication.call(this)},data:{page:'home',params:{}},setData(value:any){screen=value.screen},startTicker(){},showScreen(reset=false){component.methods.showScreen.call(this,reset)}}
 await component.lifetimes.attached.call(context)
 expect(screen.id).toBe('onboarding');expect(screen.setup.step).toBe(0)
 app.setField('cityId','北京-北京');app.setField('structure','63');await app.action('setup-next')
 component.pageLifetimes.show.call(context)
 expect(screen.setup.step).toBe(1);expect(app.form.cityId).toBe('北京-北京');expect(store.get().profile).toBeNull()
 context.unsubscribe()
})

it('shows a recoverable native startup failure and connects after retry',async()=>{
 let component:any,opens=0,subscriptions=0
 const application={subscribe(){subscriptions++;return()=>{}},render(){return{}},state:{profile:{}}}
 const globals:any={application:null,ready:Promise.reject(new Error('Synthetic catalog download failure'))}
 globals.start=()=>globals.ready=Promise.resolve().then(()=>{globals.application=application})
 vm.runInNewContext(readFileSync('miniprogram/components/app-shell/index.js','utf8'),{getApp:()=>({globalData:globals}),Component:(v:any)=>{component=v}})
 const context:any={data:{},setData(v:any){Object.assign(this.data,v)},showScreen(){opens++},startTicker(){},connectApplication(){return component.methods.connectApplication.call(this)}}
 await component.lifetimes.attached.call(context)
 expect(context.data.startupError).toBe(true);expect(opens).toBe(0)
 await component.methods.retryStartup.call(context)
 expect(context.data.startupError).toBe(false);expect(opens).toBe(1);expect(subscriptions).toBe(1)
})
it('does not attach a native page after it has been detached during startup',async()=>{
 let component:any,resolveReady!:()=>void,subscriptions=0
 const globals={application:{subscribe(){subscriptions++;return()=>{}}},ready:new Promise<void>(resolve=>{resolveReady=resolve})}
 vm.runInNewContext(readFileSync('miniprogram/components/app-shell/index.js','utf8'),{getApp:()=>({globalData:globals}),clearInterval(){},Component:(v:any)=>{component=v}})
 const context:any={connectApplication(){return component.methods.connectApplication.call(this)}}
 const attaching=component.lifetimes.attached.call(context);component.lifetimes.detached.call(context);resolveReady();await attaching
 expect(subscriptions).toBe(0)
})
