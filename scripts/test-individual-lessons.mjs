// Real controls for individually authored lessons; this never marks an editorial review done.
import {build} from 'esbuild'
import {chromium,expect} from '@playwright/test'
import {spawn} from 'node:child_process'
import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs'
import {resolve} from 'node:path'
import {pathToFileURL} from 'node:url'
import {authorCatalog} from './lib/author-content.mjs'
const root=process.cwd(),out=resolve('test-results/individual-lessons'),url='http://127.0.0.1:4197',c=authorCatalog(root);mkdirSync(out,{recursive:true});mkdirSync('.local/tools',{recursive:true})
const requested=new Set(process.argv.slice(2)),ids=readdirSync('content/teaching/individual').filter(f=>f.endsWith('.json')).map(f=>f.slice(0,-5)).filter(id=>!requested.size||requested.has(id))
if(!ids.length||[...requested].some(id=>!ids.includes(id)))throw Error('No matching individual lessons')
await build({stdin:{contents:"export {emptyState} from './src/core/learning';export {createLessonTeaching} from './src/core/lesson-teaching'",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:'.local/tools/individual-browser.mjs'})
const {emptyState,createLessonTeaching}=await import(pathToFileURL(resolve('.local/tools/individual-browser.mjs')))
const server=spawn(process.execPath,['scripts/dev.mjs'],{env:{...process.env,PORT:'4197'},stdio:'pipe'});let browser;const errors=[],lessons=[]
try{
 for(let i=0;;i++){try{if((await fetch(url)).ok)break}catch{}if(i>80)throw Error('Server unavailable');await new Promise(r=>setTimeout(r,100))}
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));await page.goto(url)
 const act=async(a,value)=>{const b=page.locator(`[data-action="studio-${a}"]${value===undefined?'':`[data-value="${value}"]`}`).first();await expect(b).toBeEnabled();await b.click()}
 const qa=async q=>{if(q.kind==='choice')await act('answer',q.answer.option);else if(q.kind==='order'){for(const id of q.answer.order)await act('response-add',id)}else await page.locator('[name=studioAnswer]').fill(q.answer.accepted[0]);await act('check')}
 for(const id of ids){const l=c.lessons.find(l=>l.id===id),s=createLessonTeaching(c,l,'american'),w=s.mission.workshop,shots=[],widths=[]
  const capture=async label=>{const file=id+'-'+label+'.png';await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));window.scrollTo(0,0)});await page.screenshot({path:resolve(out,file),fullPage:true});shots.push(file)}
  const grade=Math.min(...l.grades),state={...emptyState(1),profile:{cityId:'北京-北京',structure:grade===6?'54':'63',grade,term:'upper',editionId:grade===6?'pep-54':'pep-legacy',schoolYear:2026,dailyMinutes:20,createdAt:1}}
  await page.evaluate(state=>localStorage.setItem('cjhe.state.v1',JSON.stringify(state)),state);await page.goto(url+'/?individual='+id+'#lesson?id='+id);await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','0');await capture('prediction');await act('answer',s.prediction.options.find(o=>o.id!==s.prediction.answer.option).id);await act('check');await act('next')
  for(const[i,condition]of w.conditions.entries()){
   await act('workshop-item',String(i));const scene=condition.world.scene;
   if(scene)await expect.poll(()=>page.locator('.people-scene img').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true)
   if(i===0&&scene){await capture('scene-start');await act('workshop-choose',condition.target);await act('workshop-check');await expect(page.locator('.explore-feedback')).not.toHaveClass(/correct/);const bad=scene.people.find(p=>!scene.subjects.includes(p.id));await act('workshop-subject',bad.id);await act('workshop-check');await expect(page.locator('.explore-feedback')).toContainText(bad.name);await capture('wrong-person');await act('workshop-subject',bad.id)}
   const records=condition.world.records
   if(records){
    if(records.asset)await expect.poll(()=>page.locator('.event-art').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true)
    await act('workshop-choose',condition.target);await act('workshop-check');await expect(page.locator('.workshop-saved')).toHaveCount(0)
    const bad=records.options.find(r=>r.id!==records.answer);await act('workshop-record',bad.id);await act('workshop-check');await expect(page.locator('.event-record.wrong-record')).toContainText(bad.label);if(condition.world.kind==='timeline')await expect(page.locator('.time-event')).toContainText(bad.label);await capture('record-'+i+'-wrong')
    await act('workshop-record',records.answer)
   }
   for(const person of scene?.subjects??[])await act('workshop-subject',person)
   if(condition.world.kind==='morphology')await capture('form-'+i+'-initial');const wrong=(condition.choices??w.choices).filter(x=>x!==condition.target).at(-1);await act('workshop-choose',wrong);await act('workshop-check');await expect(page.locator('.workshop-slot')).toHaveText(wrong);await expect(page.locator('.explore-feedback')).not.toHaveClass(/correct/);if(i===0)await capture('wrong-verb');if(condition.world.kind==='morphology')await capture('form-'+i+'-wrong')
   await act('workshop-choose',condition.target);await act('workshop-check');await expect(page.locator('.workshop-saved')).toBeVisible()
   for(const width of [320,390,768]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);if(records&&condition.world.kind==='timeline'){const dx=await page.locator('.records-time').evaluate(el=>{const a=el.querySelector('.time-now').getBoundingClientRect(),b=el.querySelector('.time-axis strong').getBoundingClientRect();return Math.abs(a.x+a.width/2-b.x-b.width/2)});expect(dx).toBeLessThan(3)}const buttons=await page.locator('.scene-person').evaluateAll(els=>els.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));expect(buttons.every(b=>b.w>=44&&b.h>=44)).toBe(true);widths.push({condition:i,width})}
   await page.setViewportSize({width:390,height:844});await capture('condition-'+i)
   if(i===0){await page.reload();if(records)await expect(page.locator(`[data-action=studio-workshop-record][data-value=${records.answer}]`)).toHaveAttribute('aria-pressed','true');for(const person of scene?.subjects??[])await expect(page.locator(`[data-action=studio-workshop-subject][data-value=${person}]`)).toHaveAttribute('aria-pressed','true');await expect(page.locator('.workshop-saved')).toBeVisible()}
  }
  await act('next');await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','2');await capture('application');for(const[i,q]of s.cases.slice(0,2).entries()){await act('case',String(i));await qa(q)}await act('next')
  for(const[i,d]of s.diagnoses.entries()){await act('clinic',String(i));await act('diagnose',d.correct)}await capture('clinic');await act('next');await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','4');await capture('fresh-transfer');await qa(s.transfer);await act('next');await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','5');await capture('summary')
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('cjhe.state.v1')));expect(saved.attempts).toHaveLength(0);expect(Object.keys(saved.mastery)).toHaveLength(0);expect(Object.keys(saved.lessonDoneAt)).toHaveLength(0)
  lessons.push({id,conditions:w.conditions.length,shots,widths,applicationIds:s.cases.map(q=>q.id),transferId:s.transfer.id,attempts:0});console.log('Individual lesson controls passed:',id)
 }
 expect(errors).toEqual([]);writeFileSync(resolve(out,'results.json'),JSON.stringify({lessons,errors,platform:'Real Chromium controls and screenshots; no native GUI or editorial sign-off.'},null,2)+'\n')
}finally{if(browser)await browser.close();server.kill('SIGTERM')}
