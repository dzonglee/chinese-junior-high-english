// Exercise the fourteen studio-only original tasks, absent from the scored catalog review.
import {build} from 'esbuild'
import {chromium,expect} from '@playwright/test'
import {spawn} from 'node:child_process'
import {existsSync,mkdirSync,writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {pathToFileURL} from 'node:url'
import {authorCatalog} from './lib/author-content.mjs'
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'test-results/teaching-transfers'),bundle=resolve(root,'.local/tools/transfer-review.mjs'),url='http://127.0.0.1:4187'
mkdirSync(out,{recursive:true})
await build({stdin:{contents:"export {ContentRepository} from './src/services/content';export {emptyState} from './src/core/learning';export * from './src/core/lesson-teaching'",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:bundle})
const {ContentRepository,emptyState,createLessonTeaching,freshTeaching}=await import(pathToFileURL(bundle)),source=authorCatalog(root),repo=new ContentRepository({...source,questions:[...source.questions]},[],async()=>''),checks=[]
repo.setSpelling('american')
const lessons=source.lessons.filter(l=>createLessonTeaching(repo.catalog,l,'american').transfer.id.startsWith('teach-'))
expect(lessons).toHaveLength(14)
const server=spawn(process.execPath,['scripts/dev.mjs'],{cwd:root,env:{...process.env,PORT:'4187'},stdio:'pipe'});let browser
try{
 for(let i=0;;i++){try{if((await fetch(url)).ok)break}catch{}if(i>60)throw Error('Review server unavailable');await new Promise(r=>setTimeout(r,100))}
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),headless:true,args:['--no-sandbox']})
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url)
 for(const l of lessons){
  const s=createLessonTeaching(repo.catalog,l,'american'),grade=Math.min(...l.grades),state={...emptyState(1),profile:{cityId:'北京-北京',structure:grade===6?'54':'63',grade,term:'upper',editionId:grade===6?'pep-54':'pep-legacy',dailyMinutes:20,schoolYear:2026,createdAt:1},teaching:{[l.id]:{...freshTeaching(s,1),step:4}}}
  await page.evaluate(state=>localStorage.setItem('cjhe.state.v1',JSON.stringify(state)),state)
  await page.goto(url+'/?transfer='+l.id+'#lesson?id='+l.id)
  await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','4')
  await page.locator('[name=studioAnswer]').fill('My own new response includes the details in this task.')
  for(const r of s.transfer.rubric)await page.locator(`[data-action=studio-rubric][data-value="${r.id}"]`).click()
  await page.locator('[data-action=studio-check]').click()
  await page.locator('[data-action=studio-explanation]').click()
  await expect(page.locator('.diagram')).toBeVisible()
  await expect(page.locator('.model-answer')).toHaveText(s.transfer.answer.display)
  const layouts=[]
  for(const width of [320,390,768]){await page.setViewportSize({width,height:844});expect(await page.locator('.teaching-studio').evaluate(el=>el.scrollWidth<=el.clientWidth+1),l.id).toBe(true);layouts.push(width)}
  await page.setViewportSize({width:390,height:844})
  // Expand only the editorial capture's scroll container after testing the real layout.
  await page.addStyleTag({content:'.studio-reading{max-height:none!important;overflow:visible!important}'})
  await page.locator('.studio-stage').screenshot({path:resolve(out,l.id+'.png')})
  checks.push({lesson:l.id,question:s.transfer.id,layouts,diagramSegments:s.transfer.explanation.visual.segments.length})
 }
 expect(errors).toEqual([])
 writeFileSync(resolve(out,'results.json'),JSON.stringify({checks,errors,platform:'Actual Chromium input, self-review and reference controls; expanded scroll containers only for editorial captures'},null,2))
 console.log('All 14 original transfer tasks: real controls, rendered diagrams and three widths passed.')
}finally{if(browser)await browser.close();server.kill('SIGTERM')}
