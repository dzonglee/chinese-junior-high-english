import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const descriptors = JSON.parse(readFileSync(resolve(root, 'dist/manifest.json'), 'utf8'))
const packs = {}
for (const descriptor of descriptors) {
  const text = readFileSync(resolve(root, 'dist/packs', descriptor.file), 'utf8')
  if (createHash('sha256').update(text).digest('hex') !== descriptor.sha256) throw new Error(`Content pack hash differs: ${descriptor.topicId}`)
  packs[descriptor.file] = text
}
const assets = Object.fromEntries(['welcome', 'notebook', 'cards', 'desk-scene'].map(name => { const ext = name === 'desk-scene' ? 'jpg' : 'png'; return [name, `data:image/${ext === 'jpg' ? 'jpeg' : 'png'};base64,${readFileSync(resolve(root, 'miniprogram/assets', `${name}.${ext}`)).toString('base64')}`] }))
const json = value => JSON.stringify(value).replaceAll('<', String.fromCharCode(92) + 'u003c')
const css = readFileSync(resolve(root, 'dist/web/app.css'), 'utf8')
const js = readFileSync(resolve(root, 'dist/web/app.js'), 'utf8').replace(/<\/script/gi, '<\\/script')
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#F4F6FA"><link rel="icon" href="data:,"><title>初中英语 · 本地练习</title><style>${css}</style></head><body><div id="root"></div><div id="toast" role="status" hidden></div><script id="local-packs" type="application/json">${json(packs)}</script><script id="local-assets" type="application/json">${json(assets)}</script><script type="module">${js}</script></body></html>`
const out = resolve(root, 'dist/local')
mkdirSync(out, { recursive: true })
writeFileSync(resolve(out, 'index.html'), html)
writeFileSync(resolve(out, 'README.txt'), '初中英语 · 本地练习\n\n用 Chrome、Edge 或其他现代浏览器打开 index.html，即可离线使用。题目和插图已包含在文件中，无需登录。\n可从“今日”或“课程”进入“互动实验室”，改条件、搬物品，再用新情境检验发现。探索进度会保存，不计为独立测评。\n学习进度保存在当前浏览器中；请在“我的”中导出备份，清理浏览器数据前先备份。\n录音需要浏览器支持并由你允许使用麦克风。视频稍后提供；待准备的听力音频仍会明确提示。\n这是本地练习版，不代表教材版本、城市考试范围或微信正式发布已经核验。\n')
console.log(`Built an offline local app: ${descriptors.length} checked topic packs, embedded artwork, ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB.`)
console.log('Open dist/local/index.html in a modern browser; no server, account or cloud configuration is required.')
