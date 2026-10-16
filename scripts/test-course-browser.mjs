import { chromium, expect } from '@playwright/test'
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { authorCatalog } from './lib/author-content.mjs'
const root = resolve(import.meta.dirname, '..'), catalog = authorCatalog(root), out = resolve(root, 'test-results/course'), url = 'http://127.0.0.1:4182'
mkdirSync(out, { recursive: true })
const server = spawn(process.execPath, ['scripts/dev.mjs'], { cwd: root, env: { ...process.env, PORT: '4182' }, stdio: 'pipe' })
let browser
const errors = [], checks = []
try {
  for (let i = 0; ; i++) { try { if ((await fetch(url)).ok) break } catch {} if (i >= 40) throw new Error('Course browser server did not start'); await new Promise(r => setTimeout(r, 100)) }
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined), headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } }); page.on('pageerror', e => errors.push(e.message))
  const action = async (id, value) => { const target = page.locator(`[data-action="${id}"]${value ? `[data-value="${value}"]` : ''}`).first(); await expect(target).toBeEnabled(); await target.click() }
  const screen = id => expect(page.locator(`[data-screen="${id}"]`)).toBeVisible()
  await page.goto(url); await screen('onboarding')
  for (const [name, value] of Object.entries({ cityId: '北京-北京', structure: '63', grade: '9', editionId: 'pep-legacy' })) await page.selectOption(`[name="${name}"]`, value)
  await action('save-profile'); await screen('home'); await page.goto(url + '/#learn'); await screen('learn')
  await expect(page.locator('.metrics')).toContainText(String(catalog.lessons.length)); await action('course-next'); await action('course-previous')
  await page.selectOption('[name=courseTheme]', 't29'); await expect(page.locator('.cards > .card')).toHaveCount(4)
  await page.screenshot({ path: resolve(out, 'course-inventory.png'), fullPage: true })
  await page.selectOption('[name=courseSkill]', 'reading'); await expect(page.locator('.cards > .card')).toHaveCount(1)
  await action('start-lesson', 'l-r-course-t29'); await screen('session')
  const lesson = catalog.lessons.find(l => l.id === 'l-r-course-t29')
  for (const id of lesson.questionIds) { const q = catalog.questions.find(q => q.id === id); await action('choose', q.answer.option); await action('check'); await expect(page.locator('.explanation')).toBeVisible(); await action('next') }
  await screen('result'); checks.push('Full inventory, paging, four-skill theme filter and complete new reading lesson')
  await page.goto(url + '/#learn'); await page.selectOption('[name=courseTheme]', 't29'); await page.selectOption('[name=courseSkill]', 'speaking'); await action('start-lesson', 'l-s-course-t29'); await screen('session')
  const speaking = catalog.questions.find(q => q.id === catalog.lessons.find(l => l.id === 'l-s-course-t29').questionIds[0])
  await page.locator('[name=answer]').fill(speaking.answer.display)
  for (const point of speaking.rubric) await action('toggle-rubric', point.id)
  await action('check'); await expect(page.locator('.feedback')).toContainText('不计为机器评测')
  await page.screenshot({ path: resolve(out, 'speaking-self-review.png'), fullPage: true }); checks.push('New communication lesson saves an explicitly labelled self-review')
  await page.goto(url + '/#learn'); await page.locator('[name=courseQuery]').fill('单词重音'); await action('start-lesson', 'l-p-word-stress'); await screen('session')
  const stress = catalog.questions.find(q => q.id === 'q-p-word-stress-1'); await action('choose', stress.answer.option); await action('check')
  await page.screenshot({ path: resolve(out, 'pronunciation-knowledge.png'), fullPage: true }); checks.push('Phonetic notation and stress diagrams render through the real app')
  await page.goto(url + '/#learn'); await page.selectOption('[name=courseSkill]', 'vocabulary'); await page.locator('[name=courseQuery]').fill('家人与日常称呼'); await action('start-lesson', 'l-v-course-family'); await screen('session')
  const word = catalog.questions.find(q => q.id === catalog.lessons.find(l => l.id === 'l-v-course-family').questionIds[0]); await page.locator('[name=answer]').fill(word.answer.accepted[0]); await action('check'); await expect(page.locator('.feedback')).toContainText('对了')
  await page.screenshot({ path: resolve(out, 'vocabulary-lesson.png'), fullPage: true }); checks.push('New vocabulary lesson uses its real masked context and explanation')
  await page.goto(url + '/#learn'); await page.selectOption('[name=courseTheme]', 't29'); await page.selectOption('[name=courseSkill]', 'listening'); await expect(page.locator('[data-action=start-lesson]')).toBeDisabled(); checks.push('Pending listening audio stays disabled')
  for (const width of [320, 390, 768]) { await page.setViewportSize({ width, height: 844 }); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true) }
  await page.goto(url + '/review'); await expect(page.locator('article')).toHaveCount(50)
  const layouts = [320, 390, 768].map(width => ({ width, rendered: 0, failures: [] })), ids = new Set(), wanted = new Set(catalog.topics.map(t => catalog.questions.find(q => q.topicId === t.id).id)), representatives = []
  let style = await page.locator('style').textContent()
  for (let start = 0; start < catalog.questions.length; start += 50) {
    await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true }))
    for (const result of layouts) {
      await page.setViewportSize({ width: result.width, height: 844 })
      const batch = await page.evaluate(() => {
        const figures = [...document.querySelectorAll('.diagram')], failures = []
        for (const figure of figures) if (!figure.getBoundingClientRect().height || figure.scrollWidth > figure.clientWidth + 1) failures.push(figure.closest('[data-id]').dataset.id)
        return { rendered: figures.length, failures }
      })
      expect(batch.failures).toEqual([]); result.rendered += batch.rendered
    }
    const batch = await page.locator('article').evaluateAll(items => items.map(item => ({ id: item.dataset.id, html: item.querySelector('.diagram').outerHTML })))
    for (const figure of batch) { expect(ids.has(figure.id)).toBe(false); ids.add(figure.id); if (wanted.has(figure.id)) representatives.push(figure) }
    if (start + 50 < catalog.questions.length) { await page.locator('#next').click(); await expect(page.locator('article').first()).toHaveAttribute('data-id', catalog.questions[start + 50].id) }
  }
  expect(ids.size).toBe(catalog.questions.length); expect(representatives).toHaveLength(catalog.topics.length)
  for (const result of layouts) expect(result.rendered).toBe(catalog.questions.length)
  for (let start = 0; start < representatives.length; start += 16) {
    const batch = representatives.slice(start, start + 16)
    // Isolate each sheet from the long review page's viewport/paint state.
    const sheet = await browser.newPage({ viewport: { width: 1560, height: 1000 } })
    await sheet.setContent(`<html><head><meta charset="utf-8"><style>${style}body{font-size:12px}.sheet{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:12px}.card{padding:12px;margin:0;border-radius:12px;min-width:0}h3{font-size:12px;overflow-wrap:anywhere}.diagram{padding:10px;gap:6px}.segment{padding:8px;overflow-wrap:anywhere}</style></head><body><div class="sheet">${batch.map(f => `<section class="card"><h3>${f.id}</h3>${f.html}</section>`).join('')}</div></body></html>`)
    await sheet.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))) })
    await sheet.screenshot({ path: resolve(out, `figures-${String(start / 16 + 1).padStart(2, '0')}.png`), fullPage: true })
    await sheet.close()
  }
  checks.push(`All ${catalog.questions.length} instructional visuals laid out at three widths; ${representatives.length} topic representatives captured`)
  expect(errors).toEqual([])
  writeFileSync(resolve(out, 'results.json'), JSON.stringify({ checks, layouts, representativeFigures: representatives.map(f => f.id), errors, platform: 'Chromium; browser layout and API simulation, not native or audio validation', completedAt: new Date().toISOString() }, null, 2) + '\n')
  console.log(`${checks.length} expanded-course browser checks passed; every instructional figure rendered at three widths.`)
} finally { if (browser) await browser.close(); server.kill('SIGTERM') }
