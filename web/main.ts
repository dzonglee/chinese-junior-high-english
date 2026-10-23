import {artworkUrl} from './artwork'
import {artworkFormats} from '../src/generated/artwork'
import {renderExams} from './exams'
import { renderProduct } from './product'
import { renderLessonStudio } from './lesson-studio'
import { wordCount } from '../src/core/answers'
import { Application, type Platform } from '../src/app/application'
import type { Action, Field, Screen } from '../src/app/view'
import { catalog } from '../src/generated/catalog'
import { packs } from '../src/generated/packs'
import { ContentRepository } from '../src/services/content'
import { StateStore } from '../src/services/storage'
const esc = (v: unknown = '') => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
const storage = new StateStore({ read: key => localStorage.getItem(key), write: (key, value) => localStorage.setItem(key, value), remove: key => localStorage.removeItem(key) }, catalog)
const embeddedPacks = document.getElementById('local-packs')
const localPacks: Record<string, string> | undefined = embeddedPacks ? JSON.parse(embeddedPacks.textContent || '{}') : undefined
const embeddedAssets = document.getElementById('local-assets')
const localAssets: Record<string, string> = embeddedAssets ? JSON.parse(embeddedAssets.textContent || '{}') : {}
const artwork = (name: string) => artworkUrl(name,localAssets,artworkFormats)
const content = new ContentRepository(catalog, packs, async pack => {
  if (localPacks) {
    const text = localPacks[pack.file]
    if (typeof text !== 'string') throw new Error('本地题目文件不完整，请重新下载本地版。已保存的学习记录不会受影响。')
    return text
  }
  const response = await fetch(`/packs/${pack.file}`)
  if (!response.ok) throw new Error('题目暂未下载成功，请重试。')
  return response.text()
})
let mediaRecorder: MediaRecorder | undefined, recordingStream: MediaStream | undefined, recordingStart = 0, chunks: Blob[] = []
let audio: HTMLAudioElement | undefined
let audioGeneration = 0
let audioObjectUrl: string | undefined
async function recordings(): Promise<IDBDatabase> { return new Promise((resolve, reject) => { const r = indexedDB.open('cjhe.recordings', 1); r.onupgradeneeded = () => r.result.createObjectStore('audio'); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error) }) }
async function audioFile(key: string, data?: Blob, remove = false): Promise<Blob | undefined> { const db = await recordings(); return new Promise((resolve, reject) => { const tx = db.transaction('audio', data || remove ? 'readwrite' : 'readonly'); const store = tx.objectStore('audio'); const r = remove ? store.delete(key) : data ? store.put(data, key) : store.get(key); tx.oncomplete = () => { db.close(); resolve(data ?? r.result) }; tx.onerror = () => { db.close(); reject(tx.error) } }) }
let toastTimer: ReturnType<typeof window.setTimeout> | undefined
const platform: Platform = {
  scrollTop:()=>window.scrollTo({top:0,behavior:'instant'}),
  now: () => Date.now(),
  navigate(page, params = {}, replace = false) { app.flush(); const hash = `#${page}${Object.keys(params).length ? '?' + new URLSearchParams(params) : ''}`; if (replace) history.replaceState(null, '', hash); else history.pushState(null, '', hash); app.open(page, params); window.scrollTo(0, 0) },
  back: () => { if (history.length > 1) history.back(); else platform.navigate('home') },
  toast(message) { clearTimeout(toastTimer); const toast = document.getElementById('toast')!; toast.textContent = message; toast.hidden = false; toastTimer=window.setTimeout(() => { toast.hidden = true }, 4000) },
  dismissToast() { clearTimeout(toastTimer); document.getElementById('toast')!.hidden=true },
  async confirm(title, message) { return window.confirm(`${title}\n\n${message}`) },
  async exportText(text) { const url = URL.createObjectURL(new Blob([text], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'english-backup.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 5000) },
  async importText() { return new Promise(resolve => { const input = document.createElement('input'); input.type = 'file'; input.accept = '.json,application/json'; input.onchange = async () => { const file = input.files?.[0]; if (file && file.size <= 4_000_000) resolve(await file.text()); else { platform.toast('请选择小于 4 MB 的备份文件。'); resolve(null) } }; input.addEventListener('cancel', () => resolve(null)); input.click() }) },
  copy: text => navigator.clipboard.writeText(text),
  async play(path) { platform.stopAudio(); const generation = audioGeneration; let url = path; if (path.startsWith('recording:')) { const blob = await audioFile(path); if (!blob) throw new Error('这段录音已不在当前设备。'); url = URL.createObjectURL(blob) }; if (generation !== audioGeneration) { if (url.startsWith('blob:')) URL.revokeObjectURL(url); return }; if (url.startsWith('blob:')) audioObjectUrl = url; audio = new Audio(url); audio.onended = () => { if (url.startsWith('blob:')) { URL.revokeObjectURL(url); if (audioObjectUrl === url) audioObjectUrl = undefined } }; await audio.play() },
  stopAudio() { audioGeneration++; audio?.pause(); audio = undefined; if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl); audioObjectUrl = undefined },
  async startRecording(isCurrent = () => true) {
    if (!navigator.mediaDevices || !window.MediaRecorder) throw new Error('当前浏览器不支持录音，请换用支持录音的浏览器，或在微信小程序中练习。')
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    if (!isCurrent()) { stream.getTracks().forEach(track => track.stop()); return 'cancelled' }
    recordingStream = stream
    try {
      mediaRecorder = new MediaRecorder(stream); chunks = []
      mediaRecorder.ondataavailable = e => chunks.push(e.data)
      mediaRecorder.start(); recordingStart = Date.now()
    } catch (error) { stream.getTracks().forEach(track => track.stop()); recordingStream = undefined; throw error }
    return
  },
  stopRecording() {
    return new Promise((resolve, reject) => {
      const active = mediaRecorder, stream = recordingStream, started = recordingStart, parts = chunks
      if (!active) return reject(new Error('当前没有录音。'))
      const release = () => {
        stream?.getTracks().forEach(track => track.stop())
        if (mediaRecorder === active) mediaRecorder = undefined
        if (recordingStream === stream) recordingStream = undefined
      }
      active.onstop = async () => {
        try {
          const path = `recording:${Date.now()}`
          await audioFile(path, new Blob(parts, { type: active.mimeType }))
          resolve({ path, durationMs: Date.now() - started })
        } catch (error) { reject(error) } finally { release() }
      }
      try { active.stop() } catch (error) { release(); reject(error) }
    })
  },
  async removeRecordings(paths, all = false) { if (all) { const db = await recordings(); await new Promise<void>((resolve, reject) => { const tx = db.transaction('audio', 'readwrite'); tx.objectStore('audio').clear(); tx.oncomplete = () => { db.close(); resolve() }; tx.onerror = () => { db.close(); reject(tx.error) } }) } else await Promise.all(paths.map(path => audioFile(path, undefined, true))) },
}
const app = new Application(content, storage, platform)
function button(a: Action) { return `<button class="button ${esc(a.tone || 'secondary')}" data-action="${esc(a.id)}" data-value="${esc(a.value)}" ${a.disabled || app.busy ? 'disabled' : ''}>${esc(a.label)}</button>` }
function actions(items: Action[] = []) { return items.length ? `<div class="actions">${items.map(button).join('')}</div>` : '' }
function field(f: Field) { return `<label class="field field-${esc(f.name)}"><span class="field-label">${esc(f.label)}</span>${f.kind === 'select' ? `<select class="input" name="${esc(f.name)}">${f.options?.map(o => `<option value="${esc(o.value)}" ${o.value === f.value ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}</select>` : f.kind === 'textarea' ? `<textarea class="input textarea" name="${esc(f.name)}" maxlength="${f.maxLength || 5000}">${esc(f.value)}</textarea>` : `<input class="input" name="${esc(f.name)}" type="${f.kind === 'date' ? 'date' : f.numeric ? 'number' : 'text'}" placeholder="${esc(f.placeholder)}" value="${esc(f.value)}" maxlength="${f.maxLength || 5000}" />`}${f.help ? `<span class="help">${esc(f.help)}</span>` : ''}</label>` }
function exploration(s: Screen) {
  const v = s.exploration; if (!v) return ''
  const e = v.experiment, p = v.progress, phase = p.phase
  const scene = v.isScene && phase <= 1 ? `<div class="scene-stage position-${phase === 0 ? 'on' : esc(v.condition.id)}" data-position="${phase === 0 ? 'on' : esc(v.condition.id)}" role="img" aria-label="${esc(phase === 0 ? 'A book resting on the desk.' : v.condition.sentence)}"><img class="scene-backdrop" src="${esc(artwork('desk-scene'))}" alt=""/><div class="scene-book"><span>book</span></div></div>` : ''
  const options = (action: string) => `<div class="options">${v.options.map(o => `<button class="option ${o.selected ? 'selected' : ''}" aria-pressed="${o.selected}" data-action="${action}" data-value="${esc(o.id)}"><span>${esc(o.text)}</span></button>`).join('')}</div>`
  const tabs = `<div class="phase-strip" aria-label="探索步骤">${['猜一猜','动手试','你来批改','换个情境'].map((label, i) => `<span class="phase-pill ${Math.min(phase,3) === i ? 'current' : phase > i ? 'done' : ''}">${i + 1} ${label}</span>`).join('')}</div>`
  let body = ''
  if (phase === 0) body = `<h2 class="section-title">${esc(e.question)}</h2>${scene}${options('explore-predict')}<p class="help">先作预测。这一步不计测验分数。</p>`
  if (phase === 1) body = `${scene}<div class="condition-controls">${e.conditions.map(c => `<button class="condition ${c.id === v.condition.id ? 'selected' : ''}" aria-pressed="${c.id === v.condition.id}" data-action="explore-condition" data-value="${esc(c.id)}">${esc(c.label)}${p.visited.includes(c.id) ? ' ✓' : ''}</button>`).join('')}</div><div class="live-sentence" aria-live="polite"><span class="eyebrow">现在的表达</span><p class="experiment-sentence">${esc(v.condition.sentence)}</p><div class="diagram-segments">${v.condition.parts.map(part => `<div class="segment ${part.role}"><span>${esc(part.text)}</span><span class="small">${esc(part.note)}</span></div>`).join('')}</div>${v.condition.time ? `<div class="time-line" aria-label="时间位置">${[['past','过去'],['present','现在'],['future','将来']].map(([id,label]) => `<div class="time-point ${v.condition.time === id ? 'active' : ''}"><span class="time-dot"></span><span>${label}</span></div>`).join('')}</div>` : ''}<p class="condition-note">${esc(v.condition.explanation)}</p></div><p class="help">已试 ${p.visited.length} / ${e.conditions.length} 种条件。至少切换一次，再继续。</p><div class="explore-feedback" role="status">${esc(v.feedback)}</div>`
  if (phase === 2 || phase === 3) body = `<h2 class="section-title">${esc(phase === 2 ? e.spot.prompt : e.transfer.prompt)}</h2>${options('explore-answer')}${v.feedback ? `<div class="explore-feedback ${v.correct ? 'correct' : ''}" role="status">${esc(v.feedback)}</div>` : ''}`
  if (phase === 4) body = `<div class="discovery-mark">✓</div><h2 class="section-title">把刚才的变化说清楚</h2><p class="discovery-rule">${esc(e.discovery)}</p><p class="help">这里记录的是探索完成，不是掌握证明。用新题独立检验，再隔一段时间复习。</p>`
  return `${tabs}<section class="panel exploration" data-phase="${phase}" data-experiment="${esc(e.id)}">${body}</section>`
}
function question(s: Screen) {
  const q = s.question; if (!q) return ''
  let html = `<section class="panel question"><h2 class="question-stem">${esc(q.stem)}</h2>${q.passage ? `${q.collapsiblePassage?button({id:'paper-passage',label:q.passageOpen?'收起阅读材料':'展开阅读材料',tone:'quiet'}):''}${!q.collapsiblePassage||q.passageOpen?`<p data-passage-key="${esc(q.id)}" class="passage ${q.collapsiblePassage?'exam-passage':''}">${esc(q.passage)}</p>`:''}` : ''}`
  if (q.audioAvailable) html += button({ id: 'play-current', label: '▶ 播放音频', tone: 'secondary' })
  if (q.recordingAvailable && !q.checked) html += actions([{ id: q.recording ? 'record-stop' : 'record-start', label: q.recording ? '结束并保存录音' : '录制我的回答', tone: q.recording ? 'danger' : 'secondary' }])
  if (q.kind === 'choice') html += `<div class="options">${q.options.map(o => `<button class="option ${o.selected ? 'selected' : ''} ${o.state}" data-action="choose" data-value="${esc(o.id)}" ${q.checked ? 'disabled' : ''}><span class="option-letter">${esc(o.id)}</span><span>${esc(o.text)}</span></button>`).join('')}</div>`
  else if (q.kind === 'order') html += `<p class="help">点词组排列；点上面的词组可以撤回。</p><div class="ordered">${q.orderedTokens.map(t => `<button class="token selected" data-action="order-remove" data-value="${esc(t.id)}" ${q.checked ? 'disabled' : ''}>${esc(t.text)}</button>`).join('') || '<span class="muted">你的句子会出现在这里</span>'}</div><div class="tokens">${q.tokens.map(t => `<button class="token" data-action="order-add" data-value="${esc(t.id)}" ${q.checked || t.selected ? 'disabled' : ''}>${esc(t.text)}</button>`).join('')}</div>`
  else if (q.selfReview) html += `<textarea class="input textarea composition" name="answer" placeholder="先写自己的版本，或记下口语表达要点。草稿会保存在本机。" maxlength="5000" ${q.answerLocked ? 'disabled' : ''}>${esc(q.value)}</textarea><p class="help word-count" data-word-band="${esc(q.wordBand??'')}">${q.words} 个英文词${q.wordBand?` · ${esc(q.wordBand)}`:''} · 自查与人工批改分开</p>`
  else html += `<input class="input answer-input" name="answer" aria-label="你的答案" placeholder="先写下你的答案" value="${esc(q.value)}" ${q.checked ? 'disabled' : ''} />`
  if (q.hint) html += `<p class="notice">${esc(q.hint)}</p>`
  if (q.selfReview && q.rubric.length) html += `<div class="rubric"><h3 class="section-title">对照要点，自查完成情况</h3>${q.rubric.map(r => `<button class="rubric-point ${r.selected ? 'selected' : ''}" data-action="toggle-rubric" data-value="${esc(r.id)}" ${q.checked ? 'disabled' : ''}><span class="check">${r.selected ? '✓' : '○'}</span><span><span class="field-label">${esc(r.label)} · ${r.marks} 分</span><span class="help">${esc(r.guidance)}</span></span></button>`).join('')}</div>`
  if (q.feedback) html += `<div class="feedback" role="status"><h3 class="section-title">${esc(q.feedback)}</h3><p class="model-answer">${esc(q.modelAnswer)}</p></div>`
  html += '</section>'
  if (q.explanation) { const e = q.explanation; html += `<section class="panel explanation"><span class="eyebrow">把依据讲清楚</span>${q.evidence ? `<div class="evidence-locator"><h3 class="section-title">这道题的依据在哪里？</h3>${button({id:'evidence-open',label:q.evidence.open ? '收起原文标注' : '我来标出依据',tone:'secondary'})}${q.evidence.open ? `<p class="help">点一句原文，检查它能否支持本题答案。</p><div class="evidence-sentences">${q.evidence.sentences.map((sentence,i) => `<button class="evidence-sentence ${sentence.selected ? 'selected' : ''}" aria-pressed="${sentence.selected}" data-action="evidence-pick" data-value="${esc(sentence.id)}"><span class="sentence-number">${i+1}</span><span>${esc(sentence.text)}</span></button>`).join('')}</div>${q.evidence.feedback ? `<p class="explore-feedback ${q.evidence.correct ? 'correct' : ''}" role="status">${esc(q.evidence.feedback)}</p>` : ''}` : ''}</div>` : ''}<h3 class="section-title">思路</h3><p>${esc(e.strategy)}</p>${e.steps.slice(0,q.revealedSteps).map((step, i) => `<div class="step"><span class="step-number">${i + 1}</span><div><h4 class="field-label">${esc(step.text)}</h4><p class="muted">${esc(step.reason)}</p></div></div>`).join('')}${(q.revealedSteps || 1) < e.steps.length ? button({id:'explain-more',label:'再看下一步的理由',tone:'secondary'}) : ''}<div class="diagram"><h4 class="field-label">${esc(e.visual.title)}</h4><div class="diagram-segments">${e.visual.segments.map(v => `<div class="segment ${esc(v.role)}"><span>${esc(v.text)}</span><span class="small">${esc(v.note)}</span></div>`).join('')}</div><p class="help">${esc(e.visual.caption)}</p></div>${e.distractors.map(d => `<div class="distractor"><h4 class="field-label">为什么不选 ${esc(d.option)}</h4><p class="muted">${esc(d.reason)}</p></div>`).join('')}<h4 class="field-label">容易错在哪里</h4><p>${esc(e.pitfall)}</p><h4 class="field-label">下次试试</h4><p>${esc(e.transfer)}</p></section>` }
  return html
}
function render() {
  const s = app.render()
  const active = document.activeElement
  const printPageFocus = active instanceof HTMLButtonElement && active.matches('.word-print-pages .print-page') ? active.dataset.value : undefined
  const phoneModeFocus = active instanceof HTMLButtonElement && active.matches('.word-phone-mode .phone-mode-choice') ? active.dataset.value : undefined
  const nameGroupFocus = active instanceof HTMLButtonElement && active.matches('.word-name-groups .name-group-choice') ? active.dataset.value : undefined
  const offlinePageFocus = active instanceof HTMLButtonElement && active.matches('.word-offline-page .offline-page-control') ? active.dataset.value : undefined
  const fileDeskFocus = active instanceof HTMLButtonElement && active.matches('.word-file-desk .file-desk-control') ? active.dataset.value : undefined
  const shelfRoomFocus = active instanceof HTMLButtonElement && active.matches('.word-shelf-room .shelf-room-control') ? active.dataset.value : undefined
  const depthLineFocus = active instanceof HTMLButtonElement && active.matches('.word-depth-line .depth-line-control') ? active.dataset.value : undefined
  const waterPairFocus = active instanceof HTMLButtonElement && active.matches('.word-water-pair .water-pair-control') ? active.dataset.value : undefined
  const queueMoveFocus = active instanceof HTMLButtonElement && active.matches('.word-queue-move .queue-move-control') ? active.dataset.value : undefined
  const titleArrowFocus = active instanceof HTMLButtonElement && active.closest('.word-title-arrow') ? active.dataset.value : undefined
  const editing = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement ? { name: active.name, start: active.selectionStart, end: active.selectionEnd } : null
  const root = document.getElementById('root')!
  const passageScroll=new Map([...root.querySelectorAll<HTMLElement>('[data-passage-key]')].map(e=>[e.dataset.passageKey,e.scrollTop]))
  const setupHeader=s.setup?`<div class="setup-brand"><span>初中英语</span><span>从一句话，学会表达</span><img src="${artwork('welcome')}" alt=""/></div><div class="setup-steps" aria-label="设置步骤">${s.setup.labels.map((label,i)=>`<span class="${i===s.setup!.step?'current':i<s.setup!.step?'done':''}"><b>${i+1}</b>${label}</span>`).join('')}</div>`:''
  const body = s.overview ? renderProduct(s, artwork, field) : `<header class="top">${s.back ? '<button class="back" data-action="back" aria-label="返回">‹</button>' : ''}<div class="top-copy">${s.eyebrow ? `<span class="eyebrow">${esc(s.eyebrow)}</span>` : ''}<h1 class="page-title">${esc(s.title)}</h1><p class="muted">${esc(s.subtitle)}</p></div></header>${s.error ? `<p class="notice error" role="alert">${esc(s.error)}</p>` : ''}${s.notice ? `<p class="notice">${esc(s.notice)}</p>` : ''}${s.hero ? `<section class="hero ${esc(s.hero.tone)}"><span class="eyebrow">${esc(s.hero.eyebrow)}</span><h2 class="hero-title">${esc(s.hero.title)}</h2><p class="hero-text">${esc(s.hero.text)}</p><img class="hero-art" src="${esc(artwork(s.hero.art))}" alt=""/>${actions(s.hero.actions)}</section>` : ''}${s.metrics.length ? `<div class="metrics">${s.metrics.map(m => `<div class="metric"><span class="metric-value">${esc(m.value)}</span><span class="muted small">${esc(m.label)}</span></div>`).join('')}</div>` : ''}${s.week ? `<div class="week">${s.week.map(d => `<div class="day ${d.active ? 'active' : ''}"><span>${esc(d.label)}</span><span class="day-dot">${d.active ? '✓' : '·'}</span></div>`).join('')}</div>` : ''}${s.progress ? `<div class="progress-block"><div class="row"><span class="eyebrow">${esc(s.progress.label)}</span><span class="muted">先独立想一想</span></div><div class="track"><div class="fill" style="width:${s.progress.percent}%"></div></div></div>` : ''}${s.fields.length ? `<section class="panel form">${s.fields.map(field).join('')}</section>` : ''}${s.word ? `<section class="panel word-card"><span class="eyebrow">看释义，自己拼一遍</span><h2 class="word-meaning">${esc(s.word.meaning)}</h2><p class="passage">${esc(s.word.example)}</p><p class="muted">${esc(s.word.exampleMeaning)}</p><input class="input answer-input" name="wordAnswer" placeholder="写出英文单词" value="${esc(s.word.answer)}" ${s.word.revealed ? 'disabled' : ''}/>${s.word.revealed ? `<div class="feedback"><span class="word-answer">${esc(s.word.word)}</span>${s.word.audioAvailable ? button({ id: 'play', value: s.word.mediaId, label: '听发音与例句', tone: 'secondary' }) : ''}<p>${esc(s.word.feedback)}</p><p class="muted">${esc(s.word.explanation)}</p></div>` : ''}</section>` : ''}${renderExams(s)}${renderLessonStudio(s, artwork)}${exploration(s)}${question(s)}${s.chips ? `<div class="chips">${s.chips.map(c => `<button class="chip ${c.selected ? 'selected' : ''}" data-action="${esc(c.action)}" data-value="${esc(c.value)}">${esc(c.label)}</button>`).join('')}</div>` : ''}${actions(s.actions)}<div class="cards">${s.cards.map(c => `<section class="panel card ${esc(c.tone)}" data-card="${esc(c.id)}"><div class="card-top">${c.character ? `<span class="character">${esc(c.character)}</span>` : ''}<div class="card-copy">${c.label ? `<span class="eyebrow">${esc(c.label)}</span>` : ''}<h2 class="section-title">${esc(c.title)}</h2></div>${c.tag ? `<span class="tag">${esc(c.tag)}</span>` : ''}</div><p class="muted card-text">${esc(c.text)}</p>${c.progress !== undefined ? `<div class="track"><div class="fill" style="width:${c.progress}%"></div></div>` : ''}${actions(c.actions)}</section>`).join('')}</div>${s.sections?.map(section => `<section class="panel"><h2 class="section-title">${esc(section.title)}</h2><p class="muted">${esc(section.text)}</p></section>`).join('') ?? ''}`
  root.innerHTML = `<main class="app ${s.tabs.length ? 'with-tabs' : ''} ${s.overview ? 'product-app' : ''} ${s.paperSession?'is-paper-session':''} screen-${esc(s.id)}" data-screen="${esc(s.id)}">${setupHeader}${body}${s.tabs.length ? `<nav class="tabbar" aria-label="主导航">${s.tabs.map(t => `<button class="tab ${t.selected ? 'selected' : ''}" aria-current="${t.selected ? 'page' : 'false'}" data-action="navigate" data-value="${esc(t.id)}"><span class="tab-icon"><img src="${artwork('navigation/'+t.id+(t.selected?'-on':''))}" alt=""/></span><span>${esc(t.label)}</span></button>`).join('')}</nav>` : ''}</main>`
  root.querySelectorAll<HTMLElement>('[data-passage-key]').forEach(e=>{e.scrollTop=passageScroll.get(e.dataset.passageKey)??0})
  if (depthLineFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-depth-line [data-value="${CSS.escape(depthLineFocus)}"]:not(:disabled)`)?.focus({preventScroll:true})
  if (waterPairFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-water-pair [data-value="${CSS.escape(waterPairFocus)}"]:not(:disabled)`)?.focus({preventScroll:true})
  if (queueMoveFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-queue-move [data-value="${CSS.escape(queueMoveFocus)}"]:not(:disabled)`)?.focus({preventScroll:true})
  if (shelfRoomFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-shelf-room [data-value="${CSS.escape(shelfRoomFocus)}"]:not(:disabled)`)?.focus({preventScroll:true})
  if (fileDeskFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-file-desk [data-value="${CSS.escape(fileDeskFocus)}"]:not(:disabled)`)?.focus({preventScroll:true})
  if (titleArrowFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-title-arrow [data-value="${CSS.escape(titleArrowFocus)}"]`)?.focus({preventScroll:true})
  if (offlinePageFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-offline-page .offline-page-control[data-value="${CSS.escape(offlinePageFocus)}"]`)?.focus({preventScroll:true})
  if (nameGroupFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-name-groups .name-group-choice[data-value="${CSS.escape(nameGroupFocus)}"]`)?.focus({preventScroll:true})
  if (phoneModeFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-phone-mode .phone-mode-choice[data-value="${CSS.escape(phoneModeFocus)}"]`)?.focus({preventScroll:true})
  if (printPageFocus !== undefined) root.querySelector<HTMLButtonElement>(`.word-print-pages .print-page[data-value="${CSS.escape(printPageFocus)}"]`)?.focus({preventScroll:true})
  if (editing) { const field = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${CSS.escape(editing.name)}"]`); if (field && !field.disabled) { field.focus({ preventScroll: true }); try { field.setSelectionRange(editing.start, editing.end) } catch {} } }
}
document.getElementById('root')!.addEventListener('click', e => { const target = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-action]'); if (target && !target.disabled) void app.action(target.dataset.action!, target.dataset.value) })
document.getElementById('root')!.addEventListener('input', e => { const target = e.target as HTMLInputElement; if (target.name && target.tagName !== 'SELECT') { app.setField(target.name, target.value); if (target.name.startsWith('studio')) render(); if (target.name === 'answer') { const counter = document.querySelector<HTMLElement>('.word-count'); if (counter) counter.textContent = `${wordCount(target.value)} 个英文词${counter.dataset.wordBand?' · '+counter.dataset.wordBand:''} · 自查与人工批改分开` }; try { app.flush() } catch (err) { platform.toast(err instanceof Error ? err.message : '保存未完成，请重试。') } } })
document.getElementById('root')!.addEventListener('change', e => { const target = e.target as HTMLSelectElement | HTMLInputElement; if (target.tagName === 'SELECT' || target.type === 'date') { app.setField(target.name, target.value); render() } })
function route() { const [page = 'home', query = ''] = location.hash.slice(1).split('?'); app.open(page, Object.fromEntries(new URLSearchParams(query))) }
app.subscribe(render)
document.addEventListener('visibilitychange', () => { if (document.hidden) void app.suspend().catch(e => platform.toast(e instanceof Error ? e.message : '保存未完成。')) })
window.addEventListener('popstate', () => { void app.suspend().then(route, () => route()) })
async function initialize() {
const activeId = storage.get().activeSessionId
if (activeId) { try { await content.ensureQuestions(storage.get().sessions[activeId].questionIds) } catch { platform.toast('上次练习暂未加载，请稍后重试。') } }
route()
}
void initialize()
window.setInterval(() => { void app.tick() }, 1000)
