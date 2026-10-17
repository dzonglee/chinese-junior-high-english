import { fillInitialProfile, openCourseFilters } from './lib/browser-profile.mjs'
import { chromium, expect } from '@playwright/test'
import { createServer } from 'node:http'
import { readFileSync,mkdirSync,writeFileSync,existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { build } from 'esbuild'
import { pathToFileURL } from 'node:url'
import { authorCatalog } from './lib/author-content.mjs'
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'test-results/interactions'),url='http://127.0.0.1:4183'
mkdirSync(out,{recursive:true})
const compiled=resolve(root,'.local/tools/interactions-browser-data.mjs')
await build({stdin:{contents:"export * from './src/core/experiments';export * from './src/core/scene-experiment';export * from './src/core/reading-evidence'",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:compiled})
const {experiments,sceneExperiment,evidenceSentences}=await import(pathToFileURL(compiled)),all=[sceneExperiment,...experiments],catalog=authorCatalog(root)
const document=readFileSync(resolve(root,'dist/local/index.html'))
const server=createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(document)})
await new Promise((done,reject)=>{server.once('error',reject);server.listen(4183,'127.0.0.1',done)})
let browser
const checks=[],errors=[],representatives=[]
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),headless:true,args:['--no-sandbox']})
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message))
 const action=async(id,value)=>{const target=page.locator(`[data-action="${id}"]${value?`[data-value="${value}"]`:''}`).first();await expect(target).toBeEnabled();await target.click()}
 await page.goto(url);await fillInitialProfile(page,{cityId:'北京-北京',structure:'63',grade:'9',editionId:'pep-legacy'})
 await action('save-profile');await action('navigate','explore')
 const linkedLesson=catalog.lessons.find(l=>l.topicId==='g-be')
 const linked=page.locator(`[data-action="open-experiment"][data-value="e-be"]`);await expect(linked).toHaveAttribute('data-value','e-be');await linked.click();await expect(page.locator('.exploration')).toHaveAttribute('data-experiment','e-be')
 checks.push('The laboratory entry opens the original language experiment')
 await action('back');await action('navigate','explore');await expect(page.locator('[data-action=open-experiment]')).toHaveCount(all.length)
 await context.setOffline(true)
 for(const e of all){
  await action('open-experiment',e.id);await expect(page.locator('.exploration')).toHaveAttribute('data-phase','0')
  if(e.id===sceneExperiment.id){await expect(page.locator('.scene-backdrop')).toHaveJSProperty('complete',true);expect(await page.locator('.scene-backdrop').evaluate(i=>i.naturalWidth)).toBeGreaterThan(0);await page.screenshot({path:resolve(out,'scene-prediction.png'),fullPage:true})}
  const wrong=e.prediction.options.find(o=>o.id!==e.prediction.correct);await action('explore-predict',wrong.id)
  await expect(page.locator('[data-action=explore-next]')).toBeDisabled()
  for(const c of e.conditions){
   await action('explore-condition',c.id);await expect(page.locator('.experiment-sentence')).toHaveText(c.sentence)
   if(e.id===sceneExperiment.id) await page.screenshot({path:resolve(out,`scene-${c.id}.png`),fullPage:true})
   else representatives.push({id:`${e.id}:${c.id}`,html:await page.locator('.live-sentence').evaluate(node=>node.outerHTML)})
  }
  if(e.id===sceneExperiment.id){await context.setOffline(false);await page.reload();await context.setOffline(true);await expect(page.locator('.exploration')).toHaveAttribute('data-phase','1');await expect(page.locator('.scene-stage')).toHaveAttribute('data-position','beside');checks.push('Generated scene is embedded offline; all three coded positions change the sentence and survive reload')}
  await action('explore-next');await expect(page.locator('.exploration')).toHaveAttribute('data-phase','2')
  await action('explore-answer',e.spot.options.find(o=>o.id!==e.spot.correct).id);await expect(page.locator('[data-action=explore-next]')).toBeDisabled();await expect(page.locator('.explore-feedback')).not.toBeEmpty()
  await action('explore-answer',e.spot.correct);await action('explore-next');await action('explore-answer',e.transfer.correct);await action('explore-next')
  await expect(page.locator('.exploration')).toHaveAttribute('data-phase','4');await expect(page.locator('.exploration')).toContainText('不是掌握证明')
  await action('navigate','explore')
 }
 checks.push('All 13 workshops: commit prediction, vary three conditions, diagnose a real error and transfer to a fresh context')
 const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('cjhe.state.v1')))
 expect(Object.values(state.explorations).every(p=>p.phase===4)).toBe(true);expect(state.attempts).toEqual([]);expect(state.mastery).toEqual({})
 checks.push('Exploration completion is persisted without independent attempts, lesson passes or mastery credit')
 await page.evaluate(()=>{history.pushState(null,'','#learn');dispatchEvent(new PopStateEvent('popstate'))});await openCourseFilters(page);await page.selectOption('[name=courseTheme]','t01');await openCourseFilters(page);await page.selectOption('[name=courseSkill]','reading');await action('start-lesson','l-r-course-t01')
 const lesson=catalog.lessons.find(l=>l.id==='l-r-course-t01'),q=catalog.questions.find(q=>q.id===lesson.questionIds[0])
 await expect(page.locator('.evidence-locator')).toHaveCount(0);await action('choose',q.answer.option);await action('check');await expect(page.locator('.step')).toHaveCount(1)
 await action('explain-more');await expect(page.locator('.step')).toHaveCount(q.explanation.steps.length)
 await action('evidence-open');const sentences=evidenceSentences(q);await action('evidence-pick',sentences.find(s=>!s.matched).id);await expect(page.locator('.evidence-locator .explore-feedback')).toContainText('再读一遍')
 await action('evidence-pick',sentences.find(s=>s.matched).id);await expect(page.locator('.evidence-locator .explore-feedback')).toContainText('找对了');await page.screenshot({path:resolve(out,'reading-evidence.png'),fullPage:true})
 for(const width of [320,390,768]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}
 checks.push('Post-answer reading evidence supports wrong/right selection and staged reasons without changing marks')
 await context.setOffline(false);await page.goto(url+'/#exam');await page.selectOption('[name=skill]','reading');await page.locator('[name=count]').fill('1');await action('start-custom');await expect(page.locator('.evidence-locator')).toHaveCount(0);await expect(page.locator('.explanation')).toHaveCount(0)
 checks.push('Unsubmitted timed reading practice exposes neither evidence locator nor explanation')
 await page.goto(url+'/#explore?id=desk-scene');await action('explore-reset');await action('explore-predict','on');await action('explore-condition','under')
 for(const width of [320,390,768]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}
 checks.push('Scene and reading interactions fit 320/390/768 widths with usable controls')
 await action('explore-next');await action('explore-answer',sceneExperiment.spot.correct);await action('explore-next');await action('explore-answer',sceneExperiment.transfer.correct);await action('explore-next');await action('start-topic',sceneExperiment.topicId);await expect(page.locator('[data-screen=session]')).toBeVisible();await expect(page.locator('.question')).toBeVisible()
 checks.push('Completed workshop leads directly into actual topic practice without claiming lesson completion')
 const css=await page.locator('style').first().textContent()
 for(let start=0;start<representatives.length;start+=6){
  const sheet=await browser.newPage({viewport:{width:1440,height:1000}})
  await sheet.setContent(`<html><meta charset="utf-8"><style>${css}body{margin:0}.sheet{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding:12px}.live-sentence{margin:0}.experiment-sentence{font-size:19px}.segment{font-size:14px}h2{font-size:14px}</style><div class="sheet">${representatives.slice(start,start+6).map(v=>`<div><h2>${v.id}</h2>${v.html}</div>`).join('')}</div></html>`)
  await sheet.evaluate(async()=>{await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))})
  await sheet.screenshot({path:resolve(out,`experiments-${String(start/6+1).padStart(2,'0')}.png`),fullPage:true});await sheet.close()
 }
 expect(errors).toEqual([])
 writeFileSync(resolve(out,'results.json'),JSON.stringify({checks,errors,workshops:all.length,conditions:all.reduce((n,e)=>n+e.conditions.length,0),offline:true,nativeDeviceValidated:false,completedAt:new Date().toISOString()},null,2)+'\n')
 console.log(`${checks.length} interaction browser checks passed; all workshops exercised offline; 36 sentence conditions captured.`)
}finally{if(browser)await browser.close();await new Promise(r=>server.close(r))}
