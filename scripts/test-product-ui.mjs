import { chromium, expect } from '@playwright/test'
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { authorCatalog } from './lib/author-content.mjs'
import { fillInitialProfile } from './lib/browser-profile.mjs'

const out='test-results/product-ui',url='http://127.0.0.1:4188',catalog=authorCatalog(process.cwd())
mkdirSync(out,{recursive:true})
const server=spawn(process.execPath,['scripts/dev.mjs'],{env:{...process.env,PORT:'4188'},stdio:'pipe'})
const checks=[],errors=[],shots=[];let browser
try{
 for(let i=0;;i++){try{if((await fetch(url)).ok)break}catch{}if(i>60)throw Error('UI test server unavailable');await new Promise(r=>setTimeout(r,100))}
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']})
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage()
 page.on('pageerror',e=>errors.push(e.message))
 const screen=id=>expect(page.locator(`[data-screen="${id}"]`)).toBeVisible()
 const act=async(id,value)=>{const b=page.locator(`[data-action="${id}"]${value===undefined?'':`[data-value="${value}"]`}`).first();await expect(b).toBeEnabled();await b.click()}
 const route=async id=>{await page.goto(url+'/#'+id);await screen(id)}
 const shot=async name=>{await page.screenshot({path:`${out}/${name}.png`});shots.push(name)}
 const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('cjhe.state.v1')))
 await page.goto(url);await screen('onboarding');await shot('01-onboarding-city')
 await act('setup-next');await expect(page.locator('[role=alert]')).toContainText('所在城市和学校学制');expect((await state())?.profile??null).toBeNull()
 await page.selectOption('[name=cityId]','北京-北京');await page.selectOption('[name=structure]','63');await act('setup-next');await expect(page.locator('#toast')).toBeHidden();await shot('02-onboarding-book')
 await act('setup-next');await expect(page.locator('[role=alert]')).toContainText('教材版本')
 await page.selectOption('[name=grade]','7');await page.selectOption('[name=editionId]','pep-2024');await act('setup-back');await act('setup-next');await expect(page.locator('[name=editionId]')).toHaveValue('pep-2024')
 await act('setup-next');await shot('03-onboarding-goal');await act('save-profile');await screen('home');await shot('04-home-fresh')
 checks.push('Three-step onboarding validates before advancing, preserves back navigation and creates the exact selected profile only on confirmation')
 await page.locator('.tabbar [data-value=learn]').click();await screen('learn')
 expect(await page.locator('select').count()).toBe(0)
 const first=await page.locator('.course-row').first().boundingBox(),bar=await page.locator('.tabbar').boundingBox();expect(first.y+first.height).toBeLessThan(bar.y)
 await shot('05-course-first-screen');await act('course-skill','reading');await act('course-filters');await page.selectOption('[name=courseTheme]','t01');await act('course-filters')
 await expect(page.locator('.course-row')).toHaveCount(1);await shot('06-course-filtered')
 const lesson=catalog.lessons.find(l=>l.id==='l-r-course-t01'),q=catalog.questions.find(q=>q.id===lesson.questionIds[0])
 await act('start-lesson',lesson.id);await screen('session');await act('choose',q.options.find(o=>o.id!==q.answer.option).id);await act('check');await shot('07-wrong-answer')
 expect((await state()).attempts).toHaveLength(1);expect((await state()).mistakes[q.id]).toBeTruthy()
 await act('retry');await act('choose',q.answer.option);await act('check');expect((await state()).attempts.at(-1).evidence).toBe('assisted')
 await route('mistakes');await expect(page.locator(`[data-card="${q.id}"]`)).toBeVisible();await shot('08-real-mistake')
 checks.push('Course rows are visible immediately; real skill/theme filtering opens a lesson, records a genuine wrong answer and keeps an assisted retry separate')
 await route('practice');await act('navigate','learn:listening');await screen('learn');await expect(page.locator('.skill-filter.selected')).toHaveText('听前准备');await expect(page.locator('.course-row').first()).toContainText('音频待配')
 await route('practice');await act('navigate','builder:grammar');await screen('builder');await expect(page.locator('[name=count]')).toBeVisible();await expect(page.locator('[name=kind]')).toHaveCount(0)
 await act('builder-options');await page.selectOption('[name=kind]','choice');await page.selectOption('[name=difficulty]','1');await page.locator('[name=count]').fill('2');await act('builder-options');await act('start-custom');await screen('session');await expect(page.locator('.option')).toHaveCount(3)
 checks.push('Listening preparation opens actual text courses; optional builder controls retain the selected filters when collapsed')
 await route('learn');await page.locator('[name=courseQuery]').fill('校园里的常用词');await act('open-lesson-studio','l-v-school');await screen('lesson');if(await page.locator('[data-action=studio-answer]').count())await page.locator('[data-action=studio-answer]').first().click();else await page.locator('[name=studioAnswer]').fill('my guess');await act('studio-check');await act('studio-next')
 const tiles=page.locator('[data-action=studio-tile]');for(let i=0;i<3;i++)await tiles.nth(i).click()
 const selected=page.locator('.studio-order .token');await expect(selected).toHaveCount(3)
 const boxes=await selected.evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width}}));expect(Math.abs(boxes[0].y-boxes[2].y)).toBeLessThan(2);expect(boxes[1].x-boxes[0].x-boxes[0].w).toBeLessThan(16)
 await act('studio-assemble');await expect(page.locator('.studio-stage')).toContainText('还没有复原');await selected.first().click();await expect(page.locator('.studio-order .token')).toHaveCount(2);await shot('09-letter-workbench')
 checks.push('Real letter tiles add/remove in a compact row, show wrong-order feedback and do not create mastery')
 const before=await state();await route('home');expect((await state()).attempts).toEqual(before.attempts)
 for(const width of [320,390,768]){
  await page.setViewportSize({width,height:844})
  for(const id of ['home','learn','practice','mistakes','profile']){
   await route('home');await page.locator(`.tabbar [data-value="${id}"]`).click();await screen(id)
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
   const targets=await page.locator('.tabbar .tab').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return{w:r.width,h:r.height}}));expect(targets.every(r=>r.w>=44&&r.h>=44)).toBe(true)
   await shot(`${width}-${id}`)
   await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));const last=await page.locator('.app > :not(.tabbar)').last().boundingBox(),nav=await page.locator('.tabbar').boundingBox();expect(last.y+last.height).toBeLessThanOrEqual(nav.y+1)
  }
 }
 checks.push('Five main sections fit three widths, use 44px navigation targets and keep the final content above the floating bar')
 await page.setViewportSize({width:390,height:844})
 const routes=['vocabulary','builder','exam','writing','speaking','private','editor','settings','report','exam-info','sources','privacy','recordings','history','favorites','listening','explore']
 for(const id of routes){await route(id);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await shot('route-'+id)}
 await route('recordings');await act('navigate','speaking');await screen('speaking')
 await route('profile');await act('navigate','settings');await screen('settings');await expect(page.locator('[name=editionId]')).toHaveValue('pep-2024')
 checks.push('Every secondary entry renders without overflow; empty recordings lead to speaking and profile settings preserve the selected edition')
 expect(errors).toEqual([])
 writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,checks,shots,errors,platform:'Chromium actual UI interactions and current app data; not native or real-device certification',completedAt:new Date().toISOString()},null,2))
 console.log(`${checks.length} product UI checks passed; ${shots.length} screenshots.`)
}catch(e){writeFileSync(`${out}/failure.json`,JSON.stringify({error:e.message,checks,errors},null,2));throw e}finally{await browser?.close();server.kill('SIGTERM')}
