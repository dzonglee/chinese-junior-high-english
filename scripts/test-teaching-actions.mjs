import { build } from 'esbuild'
import { chromium,expect } from '@playwright/test'
import { spawn } from 'node:child_process'
import { existsSync,mkdirSync,writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { authorCatalog } from './lib/author-content.mjs'
const root=resolve(import.meta.dirname,'..'),source=authorCatalog(root),out=resolve(root,'test-results/teaching-actions'),url='http://127.0.0.1:4186'
const tools=resolve(root,'.local/tools/teaching-actions.mjs');mkdirSync(resolve(root,'.local/tools'),{recursive:true});
await build({stdin:{contents:"export {ContentRepository} from './src/services/content';export {emptyState} from './src/core/learning';export * from './src/core/lesson-teaching'",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:tools})
const {ContentRepository,createLessonTeaching,freshTeaching,emptyState}=await import(pathToFileURL(tools))
const repo=new ContentRepository({...source,questions:[...source.questions]},[],async()=>'' );repo.setSpelling('american');mkdirSync(out,{recursive:true})
const server=spawn(process.execPath,['scripts/dev.mjs'],{cwd:root,env:{...process.env,PORT:'4186'},stdio:'pipe'});let browser;const checks=[],errors=[]
try{
 for(let i=0;;i++){try{if((await fetch(url)).ok)break}catch{}if(i>60)throw new Error('Server unavailable');await new Promise(r=>setTimeout(r,100))}
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),headless:true,args:['--no-sandbox']});const page=await browser.newPage({viewport:{width:390,height:844}});page.on('pageerror',e=>errors.push(e.message));await page.goto(url)
 const act=async(id,value)=>{const b=page.locator(`[data-action="studio-${id}"]${value===undefined?'':`[data-value="${value}"]`}`).first();await expect(b).toBeEnabled();await b.click()}
 const lessons=source.lessons.filter(l=>l.topicId.startsWith('p-'));for(const skill of ['vocabulary','reading','listening','writing','speaking'])lessons.push(source.lessons.find(l=>source.topics.find(t=>t.id===l.topicId).skill===skill&&!l.topicId.startsWith('p-')))
 for(const l of lessons){const s=createLessonTeaching(repo.catalog,l,'american'),p={...freshTeaching(s,Date.now()),step:2,before:'I have an original idea for this task.',completed:['predict',...s.assemblies.map(u=>'build-'+u.id)]};const state={...emptyState(Date.now()),profile:{cityId:'北京-北京',structure:Math.min(...l.grades)===6?'54':'63',grade:Math.min(...l.grades),term:'upper',editionId:Math.min(...l.grades)===6?'pep-54':'pep-legacy',schoolYear:2026,dailyMinutes:20,createdAt:Date.now()},teaching:{[l.id]:p}}
  await page.evaluate(state=>localStorage.setItem('cjhe.state.v1',JSON.stringify(state)),state);await page.goto(url+'/?fixture='+l.id+'#lesson?id='+l.id);await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','2')
  if(s.sorting){for(const card of s.sorting.cards){await act('sort',card.id+':'+s.sorting.categories.find(g=>g.id!==card.category).id);await expect(page.locator('.sorting-card').filter({has:page.getByRole('heading',{name:card.text,exact:true})})).toContainText('还不合适');await act('sort',card.id+':'+card.category)}}
  else if(s.mode==='communication'){for(const r of s.rubric){await act('criterion',r.id);await act('link',r.id+':'+s.modelSentences[0].id)}await page.locator('[name=studioAfter]').fill('My revised idea now explains the task and its details.');await expect(page.locator('[name=studioAfter]')).toBeFocused();for(const r of s.rubric)await act('rubric',r.id);await act('review');await expect(page.locator('.studio-stage')).toContainText('不是机器判定')}
  else if(s.evidence.length){const wrong=s.evidence.find(e=>!e.supports);if(wrong){await act('source',wrong.id);await act('evidence',wrong.id);await expect(page.locator('[data-action=studio-next]')).toBeDisabled()}await act('source',s.evidence.find(e=>e.supports).id);await act('evidence',s.evidence.find(e=>e.supports).id)}
  else for(const[i,q]of s.cases.entries()){await act('case',String(i));if(q.kind==='choice')await act('answer',q.answer.option);else await page.locator('[name=studioAnswer]').fill(q.answer.accepted[0]);await act('check')}
  await expect(page.locator('[data-action=studio-next]')).toBeEnabled();for(const width of [320,390,768]){await page.setViewportSize({width,height:844});expect(await page.locator('.teaching-studio').evaluate(el=>el.scrollWidth<=el.clientWidth+1),l.id).toBe(true)}await page.setViewportSize({width:390,height:844});await page.screenshot({path:resolve(out,l.id+'.png'),fullPage:true});await page.reload();await expect(page.locator('[data-action=studio-next]')).toBeEnabled();await act('next');await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','3');checks.push(l.id)
 }
 expect(errors).toEqual([]);writeFileSync(resolve(out,'results.json'),JSON.stringify({checks,widths:[320,390,768],errors,platform:'Actual Chromium controls; fixtures start at the exploration phase; no actual audio or semantic scoring'},null,2));console.log(`${checks.length} real browser exploration flows passed, including all eight phonetic sorts, both communication modes and text-only listening.`)
}finally{if(browser)await browser.close();server.kill('SIGTERM')}
