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
  const habits=catalog.lessons.find(l=>l.id==='l-r-course-t05'),habit=habits.visualMission.workshop.items[0]
  await page.goto(`${url}#lesson?id=${habits.id}`)
  const habitPrediction=catalog.questions.find(q=>q.id===habits.questionIds[0])
  await action('studio-answer',habitPrediction.answer.option);await action('studio-check');await action('studio-next')
  await expect(page.locator('.reading-route-step strong')).toHaveText(habit.evidenceLabels)
  await expect(page.locator('.reading-route-step.accepted')).toHaveCount(0)
  await action('studio-workshop-choose',habit.evidenceGroups[0][0]);await action('studio-workshop-check')
  await expect(page.locator('.reading-route-step.accepted')).toHaveCount(1)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${habits.id}`)
  await expect(page.locator('.reading-route-step.accepted')).toHaveCount(1)
  await action('studio-workshop-choose',habit.options.find(o=>!o.correct).id);await action('studio-workshop-check')
  await expect(page.locator('.reading-route-step.accepted')).toHaveCount(1);await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await action('studio-workshop-choose',habit.evidenceGroups[1][0]);await action('studio-workshop-check')
  await expect(page.locator('.reading-route-step.accepted')).toHaveCount(2)
  await page.locator('[name=studioWorkshopOwn]').fill(habit.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-item','1')
  await expect.poll(()=>page.locator('.reading-notice .event-art').evaluate(img=>img.complete&&img.naturalWidth>0&&img.src.startsWith('data:image/jpeg;base64,'))).toBe(true)
  await page.locator('.art-panel-button[data-value="tray"]').click();await action('studio-workshop-check');await expect(page.locator('.art-panel-button.wrong-record')).toHaveCount(1)
  await page.locator('.art-panel-button[data-value="folder"]').click();await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Named clue slots restore partial groups,retain them through a wrong choice and repair before an embedded picture task offline;no independent credit')
  const investigation=catalog.lessons.find(l=>l.id==='l-r-course-t09'),orderIndex=investigation.visualMission.workshop.items.findIndex(item=>item.sourceOrder),ordered=investigation.visualMission.workshop.items[orderIndex]
  await page.goto(`${url}#lesson?id=${investigation.id}`)
  const investigationPrediction=catalog.questions.find(q=>q.id===investigation.questionIds[0])
  await action('studio-answer',investigationPrediction.answer.option);await action('studio-check');await action('studio-next');await action('studio-workshop-item',String(orderIndex))
  await action('studio-workshop-order-add',ordered.sourceOrder[0])
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${investigation.id}`)
  await expect(page.locator('.source-order-step')).toHaveCount(1)
  await action('studio-workshop-order-add',ordered.options.find(o=>!o.correct).id);await action('studio-workshop-check')
  await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await action('studio-workshop-order-clear')
  for(const id of ordered.sourceOrder)await action('studio-workshop-order-add',id)
  await action('studio-workshop-check');await page.locator('[name=studioWorkshopOwn]').fill(ordered.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-order-remove',ordered.sourceOrder[1]);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${investigation.id}`)
  await expect(page.locator('.source-order-step')).toHaveCount(ordered.sourceOrder.length-1);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await action('studio-workshop-order-clear');for(const id of ordered.sourceOrder)await action('studio-workshop-order-add',id)
  await action('studio-workshop-check');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Ordered source cards retain a partial sequence offline, reject a decoy, invalidate completion after removal and recover without independent credit')
  const volunteer=catalog.lessons.find(l=>l.id==='l-r-course-t12'),calculation=volunteer.visualMission.workshop.items[0]
  await page.goto(`${url}#lesson?id=${volunteer.id}`)
  await action('studio-answer',catalog.questions.find(q=>q.id===volunteer.questionIds[0]).answer.option);await action('studio-check');await action('studio-next')
  for(const group of calculation.evidenceGroups){await action('studio-workshop-choose',group[0]);await action('studio-workshop-check')}
  await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await page.locator('[name=studioWorkshopInput]').fill('14:00');await action('studio-workshop-check');await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${volunteer.id}`)
  await expect(page.locator('[name=studioWorkshopInput]')).toHaveValue('14:00')
  await page.locator('[name=studioWorkshopInput]').fill('13：50');await action('studio-workshop-check');await page.locator('[name=studioWorkshopOwn]').fill(calculation.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await page.locator('[name=studioWorkshopInput]').fill('14:00');await expect(page.locator('.workshop-saved')).toHaveCount(0);await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${volunteer.id}`);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.locator('[name=studioWorkshopInput]').fill('13:50');await action('studio-workshop-check');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Evidence alone cannot reveal a calculated answer; wrong time restores offline, accepts a full-width colon, invalidates on edits and repairs without independent credit')
  const budget=catalog.lessons.find(l=>l.id==='l-ls-course-t08'),balance=budget.visualMission.workshop.items[2]
  await page.goto(`${url}#lesson?id=${budget.id}`);await action('studio-answer',catalog.questions.find(q=>q.id===budget.questionIds[0]).answer.option);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1');await action('studio-workshop-item','2')
  for(const group of balance.evidenceGroups){await action('studio-workshop-choose',group[0]);await action('studio-workshop-check')}
  const yuan=page.locator('[name=studioWorkshopInput]');await expect(yuan).toHaveAttribute('inputmode','numeric');await yuan.fill('8');await action('studio-workshop-check');await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${budget.id}`);await expect(yuan).toHaveValue('8')
  await yuan.fill('１２');await action('studio-workshop-check');await page.locator('[name=studioWorkshopOwn]').fill(balance.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await yuan.fill('');await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${budget.id}`);await expect(yuan).toHaveValue('');await expect(page.locator('.reading-conclusion')).toHaveCount(0);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await yuan.fill('12');await action('studio-workshop-check');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Yuan balance preserves a wrong spending answer offline, accepts full-width digits, invalidates a cleared amount and repairs without independent credit')
  const experiment=catalog.lessons.find(l=>l.id==='l-ls-course-t09'),factorPlan=experiment.visualMission.workshop.items[1]
  await page.goto(`${url}#lesson?id=${experiment.id}`);await action('studio-answer',catalog.questions.find(q=>q.id===experiment.questionIds[0]).answer.option);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1')
  await expect(page.locator('.setting-options button')).toHaveText(['改变','保持','改变','保持','改变','保持'])
  for(const [row,value]of [['paper','on'],['shape','on'],['coins','off']])await action('studio-workshop-setting',row+':'+value)
  await action('studio-workshop-settings-check');await expect(page.locator('[data-setting=paper]')).toHaveClass(/setting-wrong/);await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${experiment.id}`);await expect(page.locator('.setting-status')).toHaveText(['改变','改变','保持'])
  await action('studio-workshop-setting','paper:off');await action('studio-workshop-settings-check');await expect(page.locator('.reading-conclusion,.workshop-saved')).toHaveCount(0)
  for(const group of factorPlan.evidenceGroups){await action('studio-workshop-choose',group[0]);await action('studio-workshop-check')}
  await page.locator('[name=studioWorkshopOwn]').fill(factorPlan.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible();await action('studio-workshop-setting','coins:on');await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${experiment.id}`);await expect(page.locator('.workshop-saved')).toHaveCount(0);await expect(page.locator('.setting-status')).toHaveText(['保持','改变','改变']);await action('studio-workshop-setting','coins:off');await action('studio-workshop-settings-check');await action('studio-workshop-check');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Three-factor change/keep labels and actual partly wrong plan restore offline; editing invalidates completion, retains clues and repairs without independent credit')
  const privacy=catalog.lessons.find(l=>l.id==='l-r-course-t21'),privacyCondition=privacy.visualMission.workshop.conditions[1]
  await page.goto(`${url}#lesson?id=${privacy.id}`)
  await action('studio-answer',catalog.questions.find(q=>q.id===privacy.questionIds[0]).answer.option);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1')
  await expect.poll(()=>page.locator('.redaction-image').evaluate(img=>img.complete&&img.naturalWidth>0&&img.src.startsWith('data:image/jpeg;base64,'))).toBe(true)
  await action('studio-workshop-choose',privacyCondition.target)
  await action('studio-workshop-member','project');await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await action('studio-workshop-member','project');await action('studio-workshop-member','name');await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${privacy.id}`)
  await expect(page.locator('.redaction-field[data-region=name]')).toHaveText('已遮挡');await expect(page.locator('.redaction-field[data-region=phone]')).toHaveText('PHONE: 00000000000')
  await action('studio-workshop-member','phone');await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-member','name');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${privacy.id}`);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await action('studio-workshop-member','name');await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Embedded fictional privacy fields mask offline, reject extra or missing masks, restore partial work and invalidate an edited completion without independent credit')
  const factCheck=catalog.lessons.find(l=>l.id==='l-r-course-t23'),factItem=factCheck.visualMission.workshop.items[1]
  await page.goto(`${url}#lesson?id=${factCheck.id}`)
  await action('studio-answer',catalog.questions.find(q=>q.id===factCheck.questionIds[0]).answer.option);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1')
  await expect.poll(()=>page.locator('.source-photo-comparison img').evaluateAll(es=>es.length===2&&es.every(img=>img.complete&&img.naturalWidth>0&&img.src.startsWith('data:image/jpeg;base64,'))&&es[0].src===es[1].src)).toBe(true)
  await action('studio-workshop-choose','new-card');await action('studio-workshop-check');await expect(page.locator('.art-panel-button.wrong-record')).toHaveCount(1);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await action('studio-workshop-choose','old-card');await action('studio-workshop-check');await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${factCheck.id}`)
  await expect(page.locator('.art-panel-button[data-value="old-card"]')).toHaveAttribute('data-accepted','true');await expect(page.locator('.reading-conclusion')).toHaveCount(0)
  await action('studio-workshop-choose','earlier');await action('studio-workshop-check');await page.locator('[name=studioWorkshopOwn]').fill(factItem.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-choose','new-card');await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await action('studio-workshop-choose','earlier');await action('studio-workshop-check');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('The same embedded photo keeps different reported captions offline; a wrong context fails, partial evidence restores, and repair still requires text and the learner’s reasoning without independent credit')
  const engineering=catalog.lessons.find(l=>l.id==='l-r-course-t24'),comparison=engineering.visualMission.workshop.conditions[1]
  await page.goto(`${url}#lesson?id=${engineering.id}`)
  await action('studio-answer',catalog.questions.find(q=>q.id===engineering.questionIds[0]).answer.option);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1')
  await expect(page.locator('.condition-fields .scale-rail')).toHaveCount(0)
  await action('studio-workshop-choose',comparison.target);await action('studio-workshop-member','paper');await action('studio-workshop-check');await expect(page.locator('.scope-cell.wrong-member')).toContainText('Paper');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await action('studio-workshop-member','paper');await action('studio-workshop-member','fold');await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${engineering.id}`)
  await expect(page.locator('.scope-cell[data-value=fold]')).toHaveAttribute('aria-pressed','true');await expect(page.locator('.scope-cell[data-value=gap]')).toHaveAttribute('aria-pressed','false')
  await action('studio-workshop-member','gap');await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-member','gap');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${engineering.id}`);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await action('studio-workshop-member','gap');await action('studio-workshop-check');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Experimental condition controls restore partial work offline, reject extra or missing changed variables and invalidate edited completion without independent credit')
  const practice=catalog.lessons.find(l=>l.id==='l-r-course-t28'),stageItem=practice.visualMission.workshop.items[3],stageOrder=stageItem.sourceOrder
  await page.goto(`${url}#lesson?id=${practice.id}`)
  await action('studio-answer',catalog.questions.find(q=>q.id===practice.questionIds[0]).answer.option);await action('studio-check');await action('studio-next');for(const index of ['1','2','3'])await action('studio-workshop-item',index)
  await expect(page.locator('.phase-empty')).toHaveCount(3);await expect(page.locator('.phase-label')).toHaveText(stageItem.sourceOrderLabels.map(label=>'○ '+label))
  await action('studio-workshop-order-add','race');await action('studio-workshop-check');await expect(page.locator('.phase-wrong')).toHaveCount(1);await expect(page.locator('.workshop-saved')).toHaveCount(0);await action('studio-workshop-order-clear')
  await action('studio-workshop-order-add',stageOrder[0]);await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${practice.id}`);await expect(page.locator('.phase-empty')).toHaveCount(2)
  for(const id of stageOrder.slice(1))await action('studio-workshop-order-add',id)
  await action('studio-workshop-check');await expect(page.locator('.phase-verified')).toHaveCount(3);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.locator('[name=studioWorkshopOwn]').fill(stageItem.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-order-remove',stageOrder[1]);await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${practice.id}`);await expect(page.locator('.phase-empty')).toHaveCount(1);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await action('studio-workshop-order-clear');for(const id of stageOrder)await action('studio-workshop-order-add',id);await action('studio-workshop-check');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Named Before/During/After slots keep real instruction order offline, reject decoys, restore partial slots and invalidate removed instructions without independent credit')
  const cloze=catalog.lessons.find(l=>l.id==='l-r-cloze'),gapItem=cloze.visualMission.workshop.items[0],gap=gapItem.sourceGap,badWord=gap.options.find(o=>o.id!==gap.answer)
  await page.goto(`${url}#lesson?id=${cloze.id}`);await action('studio-answer',catalog.questions.find(q=>q.id===cloze.questionIds[0]).answer.option);await action('studio-check');await action('studio-next')
  await action('studio-workshop-gap',badWord.id);await expect(page.locator('.gap-word')).toHaveText(badWord.text);await action('studio-workshop-gap-check');await expect(page.locator('.gap-word.gap-wrong')).toHaveText(badWord.text);await expect(page.locator('.gap-feedback')).toHaveText(badWord.reason)
  for(const group of gapItem.evidenceGroups){await action('studio-workshop-choose',group[0]);await action('studio-workshop-check')}
  await expect(page.locator('.reading-conclusion')).toHaveCount(0);await action('studio-workshop-gap',gap.answer);await expect(page.locator('.reading-conclusion')).toHaveCount(0);await action('studio-workshop-gap-check');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.locator('[name=studioWorkshopOwn]').fill(gapItem.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-gap','');await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${cloze.id}`);await expect(page.locator('.gap-word')).toHaveText('____');await expect(page.locator('.workshop-saved')).toHaveCount(0);await expect(page.locator('.reading-evidence.accepted')).toHaveCount(gapItem.evidenceGroups.length)
  await action('studio-workshop-gap',gap.answer);await action('studio-workshop-gap-check');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Cloze candidates change the actual sentence offline; word check, context clues and own reasoning are all required, while clearing and reload invalidate completion without losing clues')
  const methods=catalog.lessons.find(l=>l.id==='l-ls-course-t04'),recallItem=methods.visualMission.workshop.items[2]
  await page.goto(`${url}#lesson?id=${methods.id}`);await action('studio-answer',catalog.questions.find(q=>q.id===methods.questionIds[0]).answer.option);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1');await action('studio-workshop-item','2')
  await action('studio-workshop-recall-hide');await expect(page.locator('.recall-answer,.recall-comparison')).toHaveCount(0);await expect(page.locator('[data-action=studio-workshop-recall-reveal]')).toBeDisabled()
  for(const word of recallItem.sourceRecall.words)await page.locator(`[name="studioRecall-${word.id}"]`).fill('不记得')
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${methods.id}`);await expect(page.locator('[name=studioRecall-map]')).toHaveValue('不记得');await action('studio-workshop-recall-reveal');await expect(page.locator('.recall-comparison').first()).toContainText('核对差异')
  for(const group of recallItem.evidenceGroups){await action('studio-workshop-choose',group[0]);await action('studio-workshop-check')};await page.locator('[name=studioWorkshopOwn]').fill(recallItem.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await page.locator('[name=studioRecall-map]').fill('map');await expect(page.locator('.recall-exercise')).toHaveAttribute('data-phase','recall');await expect(page.locator('.recall-comparison')).toHaveCount(0);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${methods.id}`);await expect(page.locator('[name=studioRecall-map]')).toHaveValue('map');await expect(page.locator('.recall-exercise')).toHaveAttribute('data-phase','recall')
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Real study-hide-type-reveal practice removes references offline, restores wrong attempts, records unscored comparison and invalidates edited completion without independent credit')
  const management=catalog.lessons.find(l=>l.id==='l-ls-course-t05'),policyIndex=management.visualMission.workshop.items.findIndex(i=>!!i.sourceSettings),policyItem=management.visualMission.workshop.items[policyIndex]
  await page.goto(`${url}#lesson?id=${management.id}`);await action('studio-answer',catalog.questions.find(q=>q.id===management.questionIds[0]).answer.option);await action('studio-check');await action('studio-next');for(let i=1;i<=policyIndex;i++)await action('studio-workshop-item',String(i))
  await action('studio-workshop-setting','calls:off');await action('studio-workshop-setting','alerts:off');await action('studio-workshop-settings-check');await expect(page.locator('[data-setting=calls]')).toHaveClass(/setting-wrong/);await expect(page.locator('[data-setting=alerts]')).toHaveClass(/setting-correct/)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${management.id}`);await expect(page.locator('[data-setting=calls] .setting-status')).toHaveText('静音');await action('studio-workshop-setting','calls:on');await action('studio-workshop-settings-check');await expect(page.locator('.setting-correct')).toHaveCount(2);await expect(page.locator('.workshop-saved')).toHaveCount(0)
  for(const group of policyItem.evidenceGroups){await action('studio-workshop-choose',group[0]);await action('studio-workshop-check')};await page.locator('[name=studioWorkshopOwn]').fill(policyItem.reason);await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-setting','alerts:on');await expect(page.locator('.workshop-saved')).toHaveCount(0);await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${management.id}`);await expect(page.locator('[data-setting=alerts] .setting-status')).toHaveText('允许');await expect(page.locator('.reading-evidence.accepted')).toHaveCount(3)
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Independent call and other-alert controls retain wrong configurations offline, enforce both source constraints and invalidate edited completion without losing evidence or granting independent credit')
  const quantities=catalog.lessons.find(l=>l.id==='l-v-course-quantity'),plant=quantities.visualMission.workshop.items[1]
  await page.goto(`${url}#lesson?id=${quantities.id}`);const quantityPrediction=catalog.questions.find(q=>q.id===quantities.questionIds[0]);if(quantityPrediction.kind==='choice')await action('studio-answer',quantityPrediction.answer.option);else await page.locator('[name=studioAnswer]').fill(quantityPrediction.answer.accepted[0]);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1')
  await action('studio-workshop-quantity','add');await expect(page.locator('.quantity-unit')).toHaveCount(1);await expect(page.locator('.quantity-reading')).toHaveText('1seedling')
  const unit=page.locator('.quantity-unit img');await expect(unit).toHaveAttribute('src',/^data:image\/png;base64,/);await expect.poll(()=>unit.evaluate(img=>img.complete&&img.naturalWidth===600&&img.naturalHeight===400)).toBe(true)
  await action('studio-workshop-choose',plant.options.find(o=>o.correct).id);await page.locator('[name=studioWorkshopInput]').fill(plant.answer);await action('studio-workshop-check');await page.locator('[name=studioWorkshopOwn]').fill('I need one more pencil for our poster.');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible()
  await action('studio-workshop-quantity','add');await expect(page.locator('.quantity-reading')).toHaveText('2seedlings');await expect(page.locator('.workshop-saved')).toHaveCount(0);await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${quantities.id}`);await expect(page.locator('.quantity-unit')).toHaveCount(2);await action('studio-workshop-quantity','remove');await action('studio-workshop-check');await expect(page.locator('[name=studioWorkshopOwn]')).toHaveValue('I need one more pencil for our poster.')
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Original transparent counting units are embedded as PNG offline; exact add/remove counts and singular/plural labels persist and invalidate completion without losing own writing or granting independent credit')
  const teenQuantity=catalog.lessons.find(l=>l.id==='l-v-course-quantity-2'),distanceItem=teenQuantity.visualMission.workshop.items[2],jarItem=teenQuantity.visualMission.workshop.items[4]
  await page.goto(`${url}#lesson?id=${teenQuantity.id}`);const teenPrediction=catalog.questions.find(q=>q.id===teenQuantity.questionIds[0]);await page.locator('[name=studioAnswer]').fill(teenPrediction.answer.accepted[0]);await action('studio-check');await action('studio-next');await action('studio-workshop-item','1');await action('studio-workshop-item','2')
  await action('studio-workshop-choose',distanceItem.options.find(o=>o.correct).id);await page.locator('[name=studioWorkshopInput]').fill(distanceItem.answer);await action('studio-workshop-ruler','9');await action('studio-workshop-check');await expect(page.locator('.explore-feedback')).not.toHaveClass(/correct/);await action('studio-workshop-ruler','10');await action('studio-workshop-check');await page.locator('[name=studioWorkshopOwn]').fill('We left ten centimeters between the plant labels.');await action('studio-workshop-save');await expect(page.locator('.workshop-saved')).toBeVisible();await action('studio-workshop-ruler','11');await expect(page.locator('.workshop-saved')).toHaveCount(0)
  await page.goto(`${url}#home`);await page.goto(`${url}#lesson?id=${teenQuantity.id}`);await expect(page.locator('.ruler-reading strong')).toHaveText('0 → 11 cm');await action('studio-workshop-ruler','10');await action('studio-workshop-check');await expect(page.locator('[name=studioWorkshopOwn]')).toHaveValue('We left ten centimeters between the plant labels.');await action('studio-workshop-save');await action('studio-workshop-item','3');await action('studio-workshop-item','4')
  for(let n=0;n<3;n++)await action('studio-workshop-quantity','add');await expect(page.locator('.quantity-unit img')).toHaveCount(3);await expect.poll(()=>page.locator('.quantity-unit img').evaluateAll(es=>es.every(e=>e.src.startsWith('data:image/png;base64,')&&e.complete&&e.naturalWidth===600))).toBe(true);await action('studio-workshop-choose',jarItem.options.find(o=>o.correct).id);await page.locator('[name=studioWorkshopInput]').fill(jarItem.answer);await action('studio-workshop-check');await expect(page.locator('.explore-feedback')).toHaveClass(/correct/)
  expect((await state()).attempts).toHaveLength(beforeStudio.attempts.length);expect((await state()).mastery).toEqual(beforeStudio.mastery);expect((await state()).lessonDoneAt).toEqual(beforeStudio.lessonDoneAt)
  checks.push('Labelled centimetre positions and three additional whole jars work offline with embedded PNGs; wrong-distance reload preserves writing and never grants independent credit')
  expect(network.filter(request => request !== url)).toEqual([]); expect(errors).toEqual([])
  checks.push('No remote/content requests, no page errors and no horizontal overflow at phone/tablet widths')
  writeFileSync(resolve(root, 'test-results/local/results.json'), JSON.stringify({ mode, networkDisabledAfterDocumentLoad: true, directFileNavigationValidated: mode === 'file', checks, errors, network, completedAt: new Date().toISOString() }, null, 2) + '\n')
  console.log(`${checks.length} offline local checks passed with network disabled during practice.`)
} finally { await browser.close(); if (server) await new Promise(resolve => server.close(resolve)) }
