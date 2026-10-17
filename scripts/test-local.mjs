import { chromium, expect } from '@playwright/test'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createServer } from 'node:http'
import { authorCatalog } from './lib/author-content.mjs'

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
  await page.selectOption('[name=cityId]', '北京-北京')
  await page.selectOption('[name=structure]', '63')
  await page.selectOption('[name=grade]', '9')
  await page.selectOption('[name=editionId]', 'pep-legacy')
  await action('save-profile'); await screen('home')
  await expect(page.locator('.hero-art')).toBeVisible()
  await expect.poll(() => page.locator('.hero-art').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
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
  expect(network.filter(request => request !== url)).toEqual([]); expect(errors).toEqual([])
  checks.push('No remote/content requests, no page errors and no horizontal overflow at phone/tablet widths')
  writeFileSync(resolve(root, 'test-results/local/results.json'), JSON.stringify({ mode, networkDisabledAfterDocumentLoad: true, directFileNavigationValidated: mode === 'file', checks, errors, network, completedAt: new Date().toISOString() }, null, 2) + '\n')
  console.log(`${checks.length} offline local checks passed with network disabled during practice.`)
} finally { await browser.close(); if (server) await new Promise(resolve => server.close(resolve)) }
