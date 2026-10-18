import { fillInitialProfile, openCourseFilters } from './lib/browser-profile.mjs'
import { chromium, expect } from '@playwright/test'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createServer } from 'node:http'
import { authorCatalog } from './lib/author-content.mjs'
import { workshopExpressionActions } from './lib/workshop-test-actions.mjs'

const root = resolve(import.meta.dirname, '..')
let url = pathToFileURL(resolve(root, 'dist/local/index.html')).href, mode = 'file', server
const catalog = authorCatalog(root), errors = [], network = [], checks = []
mkdirSync(resolve(root, 'test-results/local'), { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined), headless: true, args: ['--no-sandbox'] })
try {
  const context = await browser.newContext({ offline: true, viewport: { width: 390, height: 844 }, acceptDownloads: true })
  const page = await context.newPage()
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => { if (/^https?:/.test(request.url())) network.push(request.url()) })
  const screen = id => expect(page.locator(`[data-screen="${id}"]`)).toBeVisible()
  async function action(id, value) {
    const button = page.locator(`[data-action="${id}"]${value === undefined ? '' : `[data-value="${value}"]`}`).first()
    await expect(button).toBeEnabled(); await button.click()
  }
  const state = () => page.evaluate(() => JSON.parse(localStorage.getItem('cjhe.state.v1')))
  try { await page.goto(url) } catch (error) {
    if (!String(error).includes('ERR_BLOCKED_BY_ADMINISTRATOR')) throw error
    // Respect managed browser policy: leave file navigation unvalidated here and
    // exercise the standalone web document through an ordinary local server.
    mode = 'standalone HTTP; managed browser blocks file navigation'
    server = createServer((_request, response) => { response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); response.end(readFileSync(resolve(root, 'dist/local/index.html'))) })
    await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve) })
    url = `http://127.0.0.1:${server.address().port}/`
    await context.setOffline(false); await page.goto(url); await context.setOffline(true)
    console.log('Managed browser file navigation is blocked; checking standalone HTTP with network disabled after document load.')
  }
  await screen('onboarding')
  await fillInitialProfile(page,{cityId:'北京-北京',structure:'63',grade:'9',editionId:'pep-legacy'})
  await action('save-profile'); await screen('home')
  await expect(page.locator('.continue-cover img')).toBeVisible()
  await expect.poll(() => page.locator('.continue-cover img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
  checks.push('Standalone app opens, profile saves and embedded Blender artwork loads')
  await page.goto(url+'#learn'); await action('start-lesson', 'l-g-be'); await screen('session')
  while (true) {
    const s = await state(), session = s.sessions[s.activeSessionId]
    const question = catalog.questions.find(q => q.id === session.questionIds[session.current])
    if (question.kind === 'choice') await action('choose', question.answer.option)
    else if (question.kind === 'order') for (const id of question.answer.order) await action('order-add', id)
    else await page.locator('[name=answer]').fill(question.answer.accepted[0])
    await action('check'); await expect(page.locator('.feedback')).toContainText('对了')
    await action('next')
    if (session.current === session.questionIds.length - 1) break
  }
  await screen('result'); expect((await state()).lessonDoneAt['l-g-be']).toBeTruthy()
  if (mode !== 'file') await context.setOffline(false)
  await page.reload(); await screen('result')
  if (mode !== 'file') await context.setOffline(true)
  checks.push('All eight lesson tasks load from embedded hash-checked packs and completion survives reload')
  await page.goto(`${url}#home`); await screen('home')
  await page.goto(`${url}#learn`); await screen('learn')
  await action('start-lesson', 'l-g-relatives'); await screen('session')
  const first = catalog.questions.find(q => q.id === 'q-g-relatives-001')
  await action('choose', first.answer.option); await action('check'); await action('next')
  await page.locator('[name=answer]').fill('that'); await action('check')
  await expect(page.locator('.feedback')).toContainText('对了')
  await action('next'); await page.locator('[name=answer]').fill('which'); await action('check')
  await expect(page.locator('.feedback')).toContainText('对了')
  await page.screenshot({ path: resolve(root, 'test-results/local/valid-grammar-answer.png'), fullPage: true })
  checks.push('Legitimate relative-clause variants are accepted through the offline UI')
  await page.goto(`${url}#speaking`); await screen('speaking')
  await action('start-question', 'q-s-introduce'); await screen('session')
  const beforeRecording = await state()
  await page.evaluate(() => {
    const originalMedia = navigator.mediaDevices, OriginalRecorder = window.MediaRecorder
    window.__localRecordingProbe = { stopped: 0, constructed: 0 }
    Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia: () => new Promise(resolve => {
      window.__grantLocalMicrophone = () => resolve({ getTracks: () => [{ stop: () => window.__localRecordingProbe.stopped++ }] })
    }) } })
    window.MediaRecorder = class { constructor() { window.__localRecordingProbe.constructed++ } }
    window.__restoreLocalRecording = () => { Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: originalMedia }); window.MediaRecorder = OriginalRecorder; delete document.hidden }
  })
  await action('record-start')
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); window.__grantLocalMicrophone() })
  await expect.poll(() => page.evaluate(() => window.__localRecordingProbe.stopped)).toBe(1)
  expect(await page.evaluate(() => window.__localRecordingProbe.constructed)).toBe(0)
  await expect(page.locator('[data-action=record-start]')).toBeEnabled()
  expect((await state()).recordings).toHaveLength(0)
  await page.evaluate(() => window.__restoreLocalRecording())
  checks.push('Cancelled browser microphone consent releases the granted stream before recording starts (API double)')
  await page.evaluate(() => {
    const originalMedia = navigator.mediaDevices, OriginalRecorder = window.MediaRecorder, originalDatabase = window.indexedDB
    window.__localRecordingProbe = { stopped: 0 }
    Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia: async () => ({ getTracks: () => [{ stop: () => window.__localRecordingProbe.stopped++ }] }) } })
    window.MediaRecorder = class { mimeType = 'audio/webm'; start() {} stop() { queueMicrotask(() => this.onstop()) } }
    Object.defineProperty(window, 'indexedDB', { configurable: true, value: { open() { throw new Error('录音保存失败（测试）') } } })
    window.__restoreLocalRecording = () => { Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: originalMedia }); window.MediaRecorder = OriginalRecorder; Object.defineProperty(window, 'indexedDB', { configurable: true, value: originalDatabase }) }
  })
  await action('record-start'); await action('record-stop')
  await expect.poll(() => page.evaluate(() => window.__localRecordingProbe.stopped)).toBe(1)
  await expect(page.locator('[role=alert]')).toContainText('录音保存失败')
  expect((await state()).attempts).toHaveLength(beforeRecording.attempts.length)
  expect((await state()).recordings).toHaveLength(0)
  await page.evaluate(() => window.__restoreLocalRecording())
  checks.push('Browser microphone tracks close when recording storage fails, with no fabricated saved recording/evidence (API double)')
  await page.goto(`${url}#settings`); await screen('settings')
  const downloading = page.waitForEvent('download'); await action('export')
  const download = await downloading, backup = JSON.parse(readFileSync(await download.path(), 'utf8'))
  expect(backup.state.profile.grade).toBe(9); expect(backup.state.attempts.length).toBeGreaterThanOrEqual(11)
  checks.push('Local learning data exports as a real backup download')
  await page.goto(`${url}#home`); await screen('home')
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: resolve(root, 'test-results/local/home.png'), fullPage: true })
  const beforeStudio=await state()
  await page.goto(`${url}#learn`);await screen('learn');await action('open-lesson-studio','l-g-be')
  await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','0')
  const prediction=catalog.questions.find(q=>q.id===catalog.lessons.find(l=>l.id==='l-g-be').questionIds[0])
  await action('studio-answer',prediction.answer.option);await action('studio-check');await action('studio-next')
  await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','1')
  await action('studio-workshop-choose','are')
  expect((await state()).teaching['l-g-be'].answers['workshop-0']).toBe('are')
  await page.goto(`${url}#home`);await screen('home');await page.goto(`${url}#learn`);await action('open-lesson-studio','l-g-be')
  await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','1');await expect(page.locator('.workshop-slot')).toHaveText('are')
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length)
  checks.push('Offline studio prediction, changing-condition actions and saved restoration use embedded packs without adding mastery evidence')
  // New subpackage artwork must remain embedded and usable in the standalone app.
  for(const lesson of catalog.lessons.filter(l=>l.visualMission?.workshop?.conditions?.[0]?.world.records?.assetRoot==='illustrations')){
    await page.goto(`${url}#lesson?id=${encodeURIComponent(lesson.id)}`)
    await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','0')
    const prediction=catalog.questions.find(q=>q.id===lesson.questionIds[0])
    await action('studio-answer',prediction.answer.option);await action('studio-check');await action('studio-next')
    const condition=lesson.visualMission.workshop.conditions[0],records=condition.world.records
    await expect.poll(()=>page.locator('.event-art').evaluate(img=>img.complete&&img.naturalWidth>0&&img.src.startsWith('data:image/jpeg;base64,'))).toBe(true)
    if(condition.tiles){for(const [name,value] of workshopExpressionActions(condition,condition.target))await action('studio-workshop-'+name,value)}
    else if(condition.input)await page.locator('[name=studioWorkshopInput]').fill(condition.target)
    else await action('studio-workshop-choose',condition.target)
    await page.locator(`.art-panel-button[data-value="${records.options.find(o=>o.id!==records.answer).id}"]`).click();await action('studio-workshop-check')
    await expect(page.locator('.workshop-saved')).toHaveCount(0)
    await page.locator(`.art-panel-button[data-value="${records.answer}"]`).click();await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toBeVisible()
    expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length)
  }
  checks.push('Subpackage illustrations load from embedded bytes offline; actual picture errors and repairs remain guided evidence')
  // Readable evidence cards and multi-clue restoration must work without network access.
  const reading=catalog.lessons.find(l=>l.id==='l-r-details'),readingItem=reading.visualMission.workshop.items[1]
  await page.goto(`${url}#lesson?id=${reading.id}`)
  const readingPrediction=catalog.questions.find(q=>q.id===reading.questionIds[0])
  await action('studio-answer',readingPrediction.answer.option);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1')
  const clues=readingItem.evidenceGroups.map(g=>g[0])
  await action('studio-workshop-choose',clues[0]);await action('studio-workshop-check')
  await expect(page.locator('.reading-evidence.accepted')).toHaveCount(1);await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${reading.id}`)
  await expect(page.locator('.reading-evidence.accepted')).toHaveCount(1)
  await action('studio-workshop-choose',readingItem.options.find(o=>!o.correct).id);await action('studio-workshop-check');await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await action('studio-workshop-choose',clues[1]);await action('studio-workshop-check');await expect(page.locator('.reading-conclusion')).toContainText(readingItem.answer)
  await page.locator('[name=studioWorkshopOwn]').fill(readingItem.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length)
  checks.push('Readable source cards preserve partial evidence,repair a wrong clue and save reasoning offline without independent credit')

  const inference=catalog.lessons.find(l=>l.id==='l-r-inference'),inferenceItem=inference.visualMission.workshop.items[0]
  await page.goto(`${url}#lesson?id=${inference.id}`)
  const inferencePrediction=catalog.questions.find(q=>q.id===inference.questionIds[0])
  await action('studio-answer',inferencePrediction.answer.option);await action('studio-check');await action('studio-next')
  await expect.poll(()=>page.locator('.reading-notice .event-art').evaluate(img=>img.complete&&img.naturalWidth>0&&img.src.startsWith('data:image/jpeg;base64,'))).toBe(true)
  await page.locator('.art-panel-button[data-value="show"]').click();await action('studio-workshop-check');await expect(page.locator('.art-panel-button.wrong-record')).toHaveCount(1);await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await page.locator('.art-panel-button[data-value="split"]').click();await action('studio-workshop-check');await expect(page.locator('.reading-evidence.accepted')).toHaveCount(1);await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${inference.id}`);await expect(page.locator('.reading-evidence.accepted')).toHaveCount(1)
  await action('studio-workshop-choose','time');await action('studio-workshop-check');await expect(page.locator('.reading-conclusion')).toContainText(inferenceItem.answer)
  await page.locator('[name=studioWorkshopOwn]').fill(inferenceItem.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length)
  checks.push('Embedded inference pictures select quoted evidence;the separate time clue and saved reasoning remain necessary offline')
  // Exercise the new lesson all the way to its varied-key transfer with networking disabled.
  const mainIdea=catalog.lessons.find(l=>l.id==='l-r-main-idea'),mainWorkshop=mainIdea.visualMission.workshop
  await page.goto(`${url}#lesson?id=${mainIdea.id}`)
  await action('studio-answer',catalog.questions.find(q=>q.id===mainIdea.questionIds[0]).answer.option);await action('studio-check');await action('studio-next')
  for(const[i,item]of mainWorkshop.items.entries()){
    await action('studio-workshop-item',String(i))
    for(const group of item.evidenceGroups){await action('studio-workshop-choose',group[0]);await action('studio-workshop-check')}
    if(item.evidenceGroups.length>1){await page.locator('[name=studioWorkshopOwn]').fill(item.reason);await action('studio-workshop-save')}
    await expect(page.locator('.workshop-saved')).toBeVisible()
  }
  await action('studio-next')
  for(const[i,id]of mainWorkshop.applicationIds.entries()){
    await action('studio-case',String(i));await action('studio-answer',catalog.questions.find(q=>q.id===id).answer.option);await action('studio-check')
    let supported=false
    for(let turn=0;turn<20;turn++){
      const source=page.locator('.reading-application'),current=await source.getAttribute('data-source')
      await action('studio-evidence',current)
      if((await state()).teaching[mainIdea.id].completed.includes('evidence-'+id)){supported=true;break}
      const next=source.locator('[data-action="studio-source"]').last();await expect(next).toContainText('下一段');await next.click()
    }
    expect(supported).toBe(true)
  }
  await action('studio-next')
  const clinics=await page.locator('[data-action="studio-clinic"]').evaluateAll(es=>es.map(e=>e.dataset.value))
  for(const clinic of clinics){
    await action('studio-clinic',clinic)
    const options=await page.locator('[data-action="studio-diagnose"]').evaluateAll(es=>es.map(e=>e.dataset.value))
    for(const option of options){await action('studio-diagnose',option);if(await page.locator('.explore-feedback.correct').count())break}
    await expect(page.locator('.explore-feedback.correct')).toBeVisible()
  }
  await action('studio-next');await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','4')
  const transfer=mainWorkshop.transfer,wrong=transfer.options.find(o=>o.id!==transfer.answer.option)
  await action('studio-answer',wrong.id);await action('studio-check');await expect(page.locator('.explore-feedback')).not.toHaveClass(/correct/)
  await action('studio-answer',transfer.answer.option);await action('studio-check');await expect(page.locator('.explore-feedback')).toHaveClass(/correct/)
  await action('studio-next');await expect(page.locator('.teaching-studio')).toHaveAttribute('data-step','5')
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Complete main-idea lesson,three-clue reasoning,source-backed applications and varied-key transfer work offline without independent credit')
  expect(network.filter(request => request !== url)).toEqual([]); expect(errors).toEqual([])
  checks.push('No remote/content requests, no page errors and no horizontal overflow at phone/tablet widths')
  writeFileSync(resolve(root, 'test-results/local/results.json'), JSON.stringify({ mode, networkDisabledAfterDocumentLoad: true, directFileNavigationValidated: mode === 'file', checks, errors, network, completedAt: new Date().toISOString() }, null, 2) + '\n')
  console.log(`${checks.length} offline local checks passed with network disabled during practice.`)
} finally { await browser.close(); if (server) await new Promise(resolve => server.close(resolve)) }
