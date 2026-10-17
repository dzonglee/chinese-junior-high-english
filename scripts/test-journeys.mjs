import { chromium, expect } from '@playwright/test'
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { authorCatalog } from './lib/author-content.mjs'
const root = process.cwd(), catalog = authorCatalog(root), port = Number(process.env.JOURNEY_PORT || 4180), url = `http://127.0.0.1:${port}`
const server = spawn(process.execPath, ['scripts/dev.mjs'], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe'] })
let serverError = ''
server.stderr.on('data', data => { serverError += data })
let browser
const evidence = { platform: 'Chromium browser harness; not native WeChat DevTools', journeys: [], errors: [], screenshots: [], startedAt: new Date().toISOString() }
mkdirSync('test-results/journeys', { recursive: true })
const save = () => writeFileSync('test-results/journeys/results.json', JSON.stringify(evidence, null, 2))
try {
  let ready = false
  for (let i = 0; i < 60; i++) { try { const r = await fetch(url); if (r.ok) { ready = true; break } } catch {} await new Promise(r => setTimeout(r, 100)) }
  if (!ready) throw new Error(`Harness failed to start: ${serverError}`)
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined), headless: true, args: ['--no-sandbox', '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] })
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ['microphone'], acceptDownloads: true })
  const page = await context.newPage()
  page.on('pageerror', e => evidence.errors.push(e.message))
  page.on('dialog', dialog => dialog.accept())
  async function screen(id) { await expect(page.locator(`[data-screen="${id}"]`)).toBeVisible() }
  async function navigate(id) { await page.goto(`${url}/#${id}`); await screen(id) }
  async function state() { return page.evaluate(() => JSON.parse(localStorage.getItem('cjhe.state.v1'))) }
  async function action(id, value) { const target = page.locator(`[data-action="${id}"]${value !== undefined ? `[data-value="${value}"]` : ''}`).first(); await expect(target).toBeEnabled(); await target.click() }
  async function capture(name) { const path = `test-results/journeys/${name}.png`; await page.screenshot({ path, fullPage: true }); evidence.screenshots.push(path) }
  function passed(name) { evidence.journeys.push({ name, status: 'passed' }); console.log(`PASS ${name}`); save() }
  await page.goto(url); await screen('onboarding')
  await action('save-profile'); await expect(page.locator('[role=alert]')).toContainText('学习资料有误')
  await page.selectOption('[name=cityId]', '上海-上海'); await page.selectOption('[name=structure]', '54'); await page.selectOption('[name=grade]', '6'); await page.selectOption('[name=editionId]', 'shep-54')
  await action('save-profile'); await screen('home'); await expect(page.locator('.top')).toContainText('预备'); await capture('home-54')
  await navigate('settings'); await page.selectOption('[name=structure]', '63'); await expect(page.locator('[name=grade]')).toHaveValue(''); await expect(page.locator('[name=editionId]')).toHaveValue(''); await page.selectOption('[name=grade]', '7'); await page.selectOption('[name=editionId]', 'pep-2024'); await action('save-profile'); await screen('home')
  await page.reload(); await screen('home'); expect((await state()).profile.grade).toBe(7); await capture('home')
  passed('Profile validation, school-structure changes and saved onboarding')
  await navigate('learn'); await action('start-lesson', 'l-g-be'); await screen('session')
  await action('choose', 'b'); await action('check'); await expect(page.locator('.explanation')).toContainText('Mia'); await capture('wrong-answer-explanation')
  let s = await state(); expect(s.attempts).toHaveLength(1); expect(s.mistakes['q-g-be-001']).toBeTruthy()
  await action('retry'); await action('choose', 'a'); await action('check'); s = await state(); expect(s.attempts[1].evidence).toBe('assisted'); expect(s.mastery['g-be'].attempts).toBe(1)
  await action('next'); await page.locator('[name=answer]').fill('am'); await page.reload(); await screen('session'); await expect(page.locator('[name=answer]')).toHaveValue('am')
  while (true) {
    s = await state(); const session = s.sessions[s.activeSessionId], q = catalog.questions.find(q => q.id === session.questionIds[session.current])
    if (q.kind === 'choice') await action('choose', q.answer.option)
    else if (q.kind === 'order') for (const id of q.answer.order) await action('order-add', id)
    else await page.locator('[name=answer]').fill(q.answer.accepted[0])
    await action('check'); await action('next'); if (session.current === session.questionIds.length - 1) break
  }
  await screen('result'); s = await state(); expect(s.lessonDoneAt['l-g-be']).toBeTruthy(); expect(s.attempts.filter(a => a.evidence === 'independent').length).toBe(8); await capture('lesson-result')
  await navigate('mistakes'); await expect(page.locator('[data-card=q-g-be-001]')).toContainText('重新想一遍'); await action('start-mistakes', 'q-g-be-001'); await action('choose', 'a'); await action('check'); s = await state(); expect(s.mistakes['q-g-be-001'].streak).toBe(0)
  passed('Wrong answer, illustrated explanation, assisted retry, reload, lesson completion and early mistake review')
  await navigate('vocabulary'); const before = await state(); const word = catalog.vocabulary.find(w => !before.words[w.id]); await page.locator('[name=wordAnswer]').fill(word.word); await action('word-check'); await expect(page.locator('.feedback')).toContainText(word.word); s = await state(); expect(s.words[word.id].independentCorrect).toBe(1); await action('word-next'); await action('word-reveal'); await capture('vocabulary-reveal')
  passed('Independent vocabulary retrieval, scheduled review and answer reveal')
  await navigate('writing'); await action('start-question', 'q-w-email'); await page.locator('[name=answer]').fill('Hi Alex, would you like to join our reading club this Friday at four in the library? Please let me know.'); await page.reload(); await screen('session'); await expect(page.locator('[name=answer]')).toContainText('Hi Alex'); await action('toggle-rubric', 'content'); await action('check'); await expect(page.locator('.feedback')).toContainText('自评'); s = await state(); expect(s.attempts[s.attempts.length - 1].evidence).toBe('self_review'); await capture('writing-self-review'); await action('next'); await screen('result')
  passed('Writing autosave, restoration and explicitly labelled self-review')
  await navigate('private'); await action('edit-private'); await screen('editor'); await action('save-private'); await expect(page.locator('[role=alert]')).toContainText('请补全')
  const values = { stem: 'I _____ ready. 请填入 be 动词。', answer: 'am', strategy: '先找到句子的主语。', step1: '主语是 I。', reason1: 'I 是第一人称单数。', step2: '填入 am，读完整句。', reason2: '一般现在时中 I 与 am 搭配。', pitfall: '不要把 I 与 is 搭配。', evidence: 'I', evidenceNote: '主语是第一人称单数。', transfer: '把主语换成 he，想一想 be 动词怎么变。' }
  for (const [name, value] of Object.entries(values)) await page.locator(`[name="${name}"]`).fill(value)
  await action('save-private'); await screen('private'); s = await state(); expect(s.privateQuestions).toHaveLength(1); const privateId = s.privateQuestions[0].id
  await action('start-private', privateId); await page.locator('[name=answer]').fill('am'); await action('check'); await expect(page.locator('.feedback')).toContainText('对了'); await action('favorite', privateId); await action('next'); await screen('result')
  passed('Private-question explanation validation, persistence and practice')
  await navigate('favorites'); await expect(page.locator(`[data-card="${privateId}"]`)).toBeVisible(); await navigate('history'); const unfinished = Object.values((await state()).sessions).find(s => !s.submittedAt && s.mode === 'mistakes'); await action('open-session', unfinished.id); await screen('session'); await expect(page.locator('.feedback')).toBeVisible();
  await navigate('listening'); await expect(page.locator('.notice')).toContainText('音频'); const listeningButtons = page.locator('[data-action=start-question]'); expect(await listeningButtons.count()).toBeGreaterThan(0); expect(await page.locator('[data-action=start-question]:not([disabled])').count()).toBe(0);
  passed('Saved practice history, favourites and truthful pending listening audio')
  await navigate('builder'); await page.selectOption('[name=skill]', 'reading'); await page.selectOption('[name=kind]', 'choice'); await page.locator('[name=count]').fill('2'); await action('start-custom'); await screen('session'); await expect(page.locator('.passage')).not.toBeEmpty(); await capture('reading-practice')
  await navigate('exam'); await page.selectOption('[name=skill]', 'grammar'); await page.selectOption('[name=kind]', 'choice'); await page.locator('[name=count]').fill('2'); await page.locator('[name=minutes]').fill('5'); await action('start-custom'); await screen('session'); expect(await page.locator('.explanation').count()).toBe(0); expect(await page.locator('[data-action=hint]').count()).toBe(0)
  await action('choose', 'a'); await action('jump', '1'); await action('jump', '0'); await expect(page.locator('[data-action=choose][data-value=a]')).toHaveClass(/selected/); await action('submit'); await screen('result'); await expect(page.locator('.metrics')).toContainText('客观题本次得分')
  await navigate('exam'); await page.selectOption('[name=skill]', 'writing'); await page.selectOption('[name=kind]', 'writing'); await page.locator('[name=count]').fill('1'); await page.locator('[name=minutes]').fill('5'); await action('start-custom'); await screen('session'); await page.locator('[name=answer]').fill('This is my draft for the writing task.'); await page.locator('[name=answer]').focus(); await page.waitForTimeout(1200); expect(await page.evaluate(() => document.activeElement?.getAttribute('name'))).toBe('answer'); await page.keyboard.type(' More text.'); await expect(page.locator('[name=answer]')).toContainText('More text.'); await action('submit'); await screen('result'); await action('review-question', '0'); await screen('session'); await action('toggle-rubric', 'content'); await action('review-self'); await expect(page.locator('.feedback')).toContainText('自评'); expect((await state()).attempts.at(-1).evidence).toBe('self_review');
  passed('Timed writing keeps keyboard focus and records subjective marks only after explicit self-review')
  await navigate('exam'); await page.locator('[name=count]').fill('1'); await page.locator('[name=minutes]').fill('5'); await action('start-custom'); await screen('session'); await page.clock.install(); await page.clock.fastForward(301_000); await screen('result'); s = await state(); expect(s.sessions[s.activeSessionId].submittedAt).toBeTruthy(); await page.clock.resume()
  passed('Filtered reading, timed answer navigation, hidden solutions and automatic deadline submission')
  await navigate('speaking'); await action('start-question', 'q-s-introduce'); await action('record-start'); await expect(page.locator('[data-action=record-stop]')).toBeVisible(); await new Promise(r => setTimeout(r, 1200)); await action('record-stop'); await expect(page.locator('[data-action=record-start]')).toBeVisible(); s = await state(); expect(s.recordings).toHaveLength(1); await page.reload(); await screen('session'); s = await state(); expect(s.recordings).toHaveLength(1); await navigate('recordings'); await action('play-recording', s.recordings[0].id); await action('delete-recording', s.recordings[0].id); await expect(page.locator('[data-action=play-recording]')).toHaveCount(0); expect((await state()).recordings).toHaveLength(0)
  passed('Browser recording API with simulated microphone, local restoration, playback and deletion')
  await navigate('settings'); const downloadPromise = page.waitForEvent('download'); await action('export'); const download = await downloadPromise, path = await download.path(), backup = JSON.parse(readFileSync(path, 'utf8')); expect(backup.state.privateQuestions).toHaveLength(1); expect(backup.state.recordings).toEqual([])
  await page.evaluate(async () => { const db = await new Promise((resolve, reject) => { const request = indexedDB.open('cjhe.recordings', 1); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error) }); await new Promise((resolve, reject) => { const tx = db.transaction('audio', 'readwrite'); tx.objectStore('audio').put(new Blob(['orphan']), 'recording:orphan'); tx.oncomplete = resolve; tx.onerror = reject }); db.close() });
  await action('delete-data'); await screen('onboarding'); expect(await page.evaluate(async () => { const db = await new Promise(resolve => { const r = indexedDB.open('cjhe.recordings', 1); r.onsuccess = () => resolve(r.result) }); const count = await new Promise(resolve => { const r = db.transaction('audio').objectStore('audio').count(); r.onsuccess = () => resolve(r.result) }); db.close(); return count })).toBe(0); expect((await state()).profile).toBeNull(); expect((await state()).privateQuestions).toEqual([])
  const chooser = page.waitForEvent('filechooser'); await action('import'); const file = await chooser; await file.setFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(backup)) }); await screen('home'); expect((await state()).privateQuestions).toHaveLength(1)
  passed('Backup export, complete local deletion and atomic restore')
  for (const width of [320, 390, 768]) { await page.setViewportSize({ width, height: 844 }); await navigate('home'); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true); await capture(`home-${width}`) }
  expect(evidence.errors).toEqual([])
  passed('Small-screen layout without horizontal overflow and no browser page errors')
  evidence.finishedAt = new Date().toISOString(); save(); console.log(`${evidence.journeys.length} browser journeys passed.`)
} catch (e) { evidence.failure = e.stack; save(); throw e }
finally { await browser?.close(); server.kill('SIGTERM') }
