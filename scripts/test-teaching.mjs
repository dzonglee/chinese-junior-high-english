import { fillInitialProfile, openCourseFilters } from './lib/browser-profile.mjs'
import { build } from 'esbuild'
import { chromium,expect } from '@playwright/test'
import { spawn } from 'node:child_process'
import { existsSync,mkdirSync,readFileSync,writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { authorCatalog } from './lib/author-content.mjs'
const layoutOnly=process.env.TEACHING_LAYOUT_ONLY==='1'
const root=resolve(import.meta.dirname,'..'),out=resolve(root,process.env.TEACHING_REVIEW_OUTPUT||'test-results/teaching'),tools=resolve(root,'.local/tools/teaching-ui.mjs'),url='http://127.0.0.1:4185',source=authorCatalog(root)
mkdirSync(out,{recursive:true});mkdirSync(resolve(root,'.local/tools'),{recursive:true})
await build({stdin:{contents:"export {Application} from './src/app/application';export {ContentRepository} from './src/services/content';export {StateStore} from './src/services/storage';export {emptyState} from './src/core/learning';export * from './src/core/lesson-teaching';export {renderLessonStudio} from './web/lesson-studio'",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:tools})
const {Application,ContentRepository,StateStore,emptyState,createLessonTeaching,freshTeaching,renderLessonStudio}=await import(pathToFileURL(tools))
const server=spawn(process.execPath,['scripts/dev.mjs'],{cwd:root,env:{...process.env,PORT:'4185'},stdio:'pipe'});let browser;const errors=[],checks=[]
try{
 for(let i=0;;i++){try{if((await fetch(url)).ok)break}catch{}if(i>60)throw new Error('Server unavailable');await new Promise(r=>setTimeout(r,100))}
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),headless:true,args:['--no-sandbox']})
 const page=await browser.newPage({viewport:{width:390,height:844}});page.on('pageerror',e=>errors.push(e.message));await page.goto(url)
 await fillInitialProfile(page,{cityId:'北京-北京',structure:'63',grade:'9',editionId:'pep-legacy'})
 const act=async(id,value)=>{const b=page.locator(`[data-action="${id}"]${value===undefined?'':`[data-value="${value}"]`}`).first();await expect(b).toBeEnabled();await b.click()}
 await act('save-profile');await act('open-lesson-studio','l-g-be');await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','0')
 const model=createLessonTeaching(source,source.lessons.find(l=>l.id==='l-g-be'))
 await act('studio-answer',model.prediction.options.find(o=>o.id!==model.prediction.answer.option).id);await act('studio-check');await act('studio-next')
 await act('studio-assemble');await expect(page.locator('[data-action=studio-next]')).toBeDisabled()
 for(const[i,u]of model.assemblies.entries()){await act('studio-unit',String(i));for(const id of u.target)await act('studio-tile',id);await act('studio-assemble')}
 await act('studio-next');for(const[i,q]of model.cases.slice(0,2).entries()){await act('studio-case',String(i));if(q.kind==='choice')await act('studio-answer',q.answer.option);else await page.locator('[name=studioAnswer]').fill(q.answer.accepted[0]);await act('studio-check')}
 await page.reload();await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','2');await act('studio-next');await act('studio-diagnose',model.diagnosis.correct);await act('studio-next')
 if(model.transfer.kind==='choice')await act('studio-answer',model.transfer.answer.option);else if(model.transfer.kind==='order')for(const id of model.transfer.answer.order)await act('studio-response-add',id);else await page.locator('[name=studioAnswer]').fill(model.transfer.answer.accepted[0])
 await act('studio-check');await act('studio-next');await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','5');await act('start-lesson','l-g-be');await expect(page.locator('[data-screen=session]')).toBeVisible();checks.push('Actual browser taps complete prediction, assembly, contrast, diagnosis, transfer, reload and practice handoff')
 // Render every studio and every assembly with the same Application view and browser renderer.
 const repo=new ContentRepository({...source,questions:[...source.questions]},[],async()=>''),data=new Map(),adapter={read:k=>data.get(k)??null,write:(k,v)=>data.set(k,v),remove:k=>data.delete(k)},store=new StateStore(adapter,repo.catalog,1)
 const platform={now:()=>1,navigate(){},back(){},toast(){},confirm:async()=>true,exportText:async()=>{},importText:async()=>null,copy:async()=>{},play:async()=>{},stopAudio(){},startRecording:async()=>{},stopRecording:async()=>({path:'fixture',durationMs:1}),removeRecordings:async()=>{}}
 const app=new Application(repo,store,platform),fixtures=[],assemblies=[];repo.setSpelling('american')
 for(const l of source.lessons){
  const grade=Math.min(...l.grades),profile={cityId:'北京-北京',structure:grade===6?'54':'63',grade,term:'upper',editionId:grade===6?'pep-54':'pep-legacy',schoolYear:2026,dailyMinutes:20,createdAt:1};store.save({...emptyState(1),profile});app.open('lesson',{id:l.id});const s=app.render().teaching.lesson
  for(let step=0;step<=5;step++){const p={...freshTeaching(s,1),step};store.save({...store.get(),teaching:{[l.id]:p}});const html=renderLessonStudio(app.render());fixtures.push({id:l.id,step,html});}
  for(const [unit,u]of s.assemblies.entries()){const p={...freshTeaching(s,1),step:1,unit};store.save({...store.get(),teaching:{[l.id]:p}});assemblies.push({id:l.id+' / '+u.id,html:renderLessonStudio(app.render())})}
 }
 const layoutSamples=[...fixtures,...assemblies],css=readFileSync(resolve(root,'dist/web/app.css'),'utf8'),review=await browser.newPage({viewport:{width:390,height:844}}),layouts=[]
 for(const width of [320,390,768]){
  await review.setViewportSize({width,height:844});let count=0
  for(let start=0;start<layoutSamples.length;start+=50){await review.setContent(`<style>${css}</style>${layoutSamples.slice(start,start+50).map(f=>`<article data-id="${f.id}:${f.step}">${f.html}</article>`).join('')}`);const problems=await review.locator('article').evaluateAll(els=>els.filter(el=>el.scrollWidth>el.clientWidth+1||!el.getBoundingClientRect().height).map(el=>el.dataset.id));expect(problems).toEqual([]);count+=Math.min(50,layoutSamples.length-start)}layouts.push({width,states:fixtures.length,assemblies:assemblies.length,totalStates:count})
 }
 // Contact sheets retain all text. Review every assembly and the distinctive explore/diagnose/transfer phases.
 const panels=[...assemblies,...fixtures.filter(f=>[2,3,4].includes(f.step)).map(f=>({...f,id:f.id+' / phase '+f.step}))]
 for(let start=0;!layoutOnly&&start<panels.length;start+=16){const batch=panels.slice(start,start+16),sheet=await browser.newPage({viewport:{width:1560,height:1000}});await sheet.setContent(`<style>${css}body{font-size:12px}.sheet{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:8px;align-items:start}.panel{padding:12px}.studio-unit-tabs,.phase-strip{display:none}.token{font-size:12px;padding:6px;min-width:24px}.letter-tile{font-size:15px;min-width:25px;min-height:30px}.section-title{font-size:16px}.input{min-height:35px}h3{font-size:11px;overflow-wrap:anywhere}.sheet>section{min-width:0;border:1px solid #dbe2f0}</style><div class="sheet">${batch.map(f=>`<section><h3>${f.id}</h3>${f.html}</section>`).join('')}</div>`);await sheet.evaluate(()=>document.fonts.ready);await sheet.screenshot({path:resolve(out,'sheet-'+String(start/16+1).padStart(3,'0')+'.png'),fullPage:true});await sheet.close()}
 expect(errors).toEqual([]);writeFileSync(resolve(out,'results.json'),JSON.stringify({fixtureSpelling:'american',lessons:source.lessons.length,assemblies:assemblies.length,layouts,sheets:layoutOnly?0:Math.ceil(panels.length/16),layoutOnly,checks,errors,platform:'Chromium actual tap flow plus exhaustive authored view fixtures; not native evidence'},null,2));console.log(`Teaching browser checks passed: ${source.lessons.length} lessons / ${fixtures.length} states at three widths / ${assemblies.length} assemblies; ${layoutOnly?0:Math.ceil(panels.length/16)} contact sheets${layoutOnly?' (layout-only verification)':''}.`)
}finally{if(browser)await browser.close();server.kill('SIGTERM')}
