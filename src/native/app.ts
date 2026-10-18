import { Application, type Platform } from '../app/application'
import { ROOT_SCREENS } from '../app/view'
import type { ContentCatalog } from '../core/types'
import { runtime } from '../generated/runtime'
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'
import { packs } from '../generated/packs'
import { ContentRepository } from '../services/content'
import { StateStore } from '../services/storage'
declare const require: (path: string) => { loadPack(topicId: string): Promise<string>; loadCatalog(): Promise<{ catalog: ContentCatalog }> }
const loader = require('./pack-loader.js')
// The installed typings describe this callable resolver as a result object; use the documented API shape.
type PrivacyResolver = (result: { event: 'agree' | 'disagree'; buttonId?: string }) => void
wx.onNeedPrivacyAuthorization(value => {
  const resolve = value as unknown as PrivacyResolver
  const pages = getCurrentPages(), page = pages[pages.length - 1]
  const shell = page?.selectComponent('#shell')
  if (shell) shell.requestPrivacy(resolve)
  else resolve({ event: 'disagree' })
})
let catalog: ContentCatalog
let cloudStarted = false
function ensureCloud() { if (!cloudStarted) { try { wx.cloud.init({ env: runtime.cloudEnv, traceUser: false }); cloudStarted = true } catch { throw new Error('学习内容服务暂时无法连接，请稍后重试。') } } }

let audio: WechatMiniprogram.InnerAudioContext | undefined
let playbackGeneration = 0
let cancelPlayback: (() => void) | undefined
let recorder: WechatMiniprogram.RecorderManager | undefined
let recordStarted = 0
let pendingRecording: Promise<{ path: string; durationMs: number }> | undefined
let resolveRecording: (value: { path: string; durationMs: number }) => void = () => {}
let rejectRecording: (reason: Error) => void = () => {}
let resolveStart: () => void = () => {}
let rejectStart: (reason: Error) => void = () => {}
let navigationGeneration = 0
const platform: Platform = {
  scrollTop:()=>{wx.pageScrollTo({scrollTop:0,duration:0})},
  now: () => Date.now(),
  navigate(page, params = {}, replace = false) {
    const generation = ++navigationGeneration
    const url = `/pages/${page}/index?${Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')}`
    if (ROOT_SCREENS.includes(page) || page === 'onboarding') wx.reLaunch({ url })
    else if (replace) wx.redirectTo({ url })
    else wx.navigateTo({ url, fail: (error) => { if (generation !== navigationGeneration) return; const pages=getCurrentPages(),current=pages[pages.length-1]; if(current?.route===`pages/${page}/index`&&Object.entries(params).every(([key,value])=>current.options?.[key]===value))return; if (/limit|exceed/i.test(error.errMsg)) wx.redirectTo({ url }); else wx.showToast({ title: '页面暂未打开，请再试一次。', icon: 'none' }) } })
  },
  back() { if (getCurrentPages().length > 1) wx.navigateBack(); else platform.navigate('home') },
  toast: (title) => wx.showToast({ title, icon: 'none', duration: 3000 }),
  dismissToast: () => { wx.hideToast() },
  confirm: (title, content) => new Promise((resolve) => wx.showModal({ title, content, confirmText: '确定', cancelText: '再想想', success: (r) => resolve(r.confirm), fail: () => resolve(false) })),
  async exportText(text) {
    const filePath = `${wx.env.USER_DATA_PATH}/english-backup-${Date.now()}.json`
    await new Promise<void>((resolve, reject) => wx.getFileSystemManager().writeFile({ filePath, data: text, encoding: 'utf8', success: () => resolve(), fail: reject }))
    try { await new Promise<void>((resolve, reject) => wx.shareFileMessage({ filePath, fileName: '英语学习备份.json', success: () => resolve(), fail: reject })) }
    finally { wx.getFileSystemManager().unlink({ filePath }) }
  },
  async importText() {
    const result = await new Promise<WechatMiniprogram.ChooseMessageFileSuccessCallbackResult>((resolve, reject) => wx.chooseMessageFile({ count: 1, type: 'file', extension: ['json'], success: resolve, fail: reject }))
    const file = result.tempFiles[0]
    if (file.size > 4_000_000) throw new Error('备份文件不能超过 4 MB。')
    return new Promise<string>((resolve, reject) => wx.getFileSystemManager().readFile({ filePath: file.path, encoding: 'utf8', success: (r) => resolve(String(r.data)), fail: reject }))
  },
  copy: (data) => new Promise<void>((resolve, reject) => wx.setClipboardData({ data, success: () => resolve(), fail: reject })),
  async play(path) {
    platform.stopAudio(); const generation = playbackGeneration
    let source = path
    if (path.startsWith('cloud://')) {
      ensureCloud()
      const downloaded = await wx.cloud.downloadFile({ fileID: path })
      const bytes = await new Promise<ArrayBuffer>((resolve, reject) => wx.getFileSystemManager().readFile({ filePath: downloaded.tempFilePath, success: r => resolve(r.data as ArrayBuffer), fail: () => reject(new Error('音频读取失败，请重试。')) }))
      if (bytesToHex(sha256(new Uint8Array(bytes))) !== catalog.media.find(m => m.path === path)?.sha256) throw new Error('音频校验失败，请重新下载。')
      source = downloaded.tempFilePath
    }
    if (generation !== playbackGeneration) throw new Error('音频已停止，请重新播放。')
    audio = wx.createInnerAudioContext(); audio.src = source
    return new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => { cancelPlayback = undefined; reject(new Error('音频加载时间较长，请重试。')) }, 15000)
      audio!.onPlay(() => { clearTimeout(timer); cancelPlayback = undefined; resolve() })
      audio!.onError(() => { clearTimeout(timer); cancelPlayback = undefined; reject(new Error('音频暂时无法播放，请稍后重试。')) })
      cancelPlayback = () => { clearTimeout(timer); reject(new Error('音频已停止，请重新播放。')) }; audio!.play()
    })
  },
  stopAudio() { playbackGeneration++; cancelPlayback?.(); cancelPlayback = undefined; audio?.stop(); audio?.destroy(); audio = undefined },
  async startRecording(isCurrent = () => true) {
    await new Promise<void>((resolve, reject) => wx.requirePrivacyAuthorize({ success: () => resolve(), fail: () => reject(new Error('请先阅读并同意麦克风使用说明。')) }))
    if (!isCurrent()) return 'cancelled'
    await new Promise<void>((resolve, reject) => wx.authorize({ scope: 'scope.record', success: () => resolve(), fail: () => reject(new Error('需要麦克风权限才能录音，可在小程序设置中开启。')) }))
    if (!isCurrent()) return 'cancelled'
    if (!recorder) {
      recorder = wx.getRecorderManager()
      recorder.onStart(() => { recordStarted = Date.now(); resolveStart() })
      recorder.onStop(result => {
        const resolve = resolveRecording, reject = rejectRecording
        wx.getFileSystemManager().saveFile({ tempFilePath: result.tempFilePath, success: saved => resolve({ path: saved.savedFilePath, durationMs: result.duration ?? Date.now() - recordStarted }), fail: () => reject(new Error('录音未能保存，请检查设备空间。')) })
      })
      recorder.onError(() => { const e = new Error('录音未能保存，请检查麦克风权限后重试。'); rejectStart(e); rejectRecording(e) })
    }
    pendingRecording = new Promise((resolve, reject) => { resolveRecording = resolve; rejectRecording = reject })
    void pendingRecording.catch(() => {})
    await new Promise<void>((resolve, reject) => {
      resolveStart = resolve; rejectStart = reject
      recorder!.start({ duration: 60000, sampleRate: 16000, numberOfChannels: 1, encodeBitRate: 48000, format: 'mp3' })
    })
    return
  },
  stopRecording() {
    if (!recorder || !pendingRecording) return Promise.reject(new Error('当前没有录音。'))
    recorder.stop()
    return pendingRecording
  },
  async removeRecordings(paths, all = false) {
    const fs = wx.getFileSystemManager(), owned = [...paths]
    if (all) {
      const saved = await new Promise<string[]>((resolve, reject) => fs.getSavedFileList({ success: r => resolve(r.fileList.map(f => f.filePath)), fail: () => reject(new Error('本机录音清理未完成，请重试。')) }))
      owned.push(...saved)
      const backups = await new Promise<string[]>((resolve, reject) => fs.readdir({ dirPath: wx.env.USER_DATA_PATH, success: r => resolve(r.files.filter(name => /^english-backup-[0-9]+\.json$/.test(name)).map(name => `${wx.env.USER_DATA_PATH}/${name}`)), fail: () => reject(new Error('备份缓存清理未完成，请重试。')) }))
      owned.push(...backups)
    }
    await Promise.all([...new Set(owned)].map(filePath => new Promise<void>((resolve, reject) => fs.unlink({ filePath, success: () => resolve(), fail: e => /no such file|not exist/i.test(e.errMsg) ? resolve() : reject(new Error('有文件尚未删除，请检查设备空间后重试。')) }))))
  },
}
export let application: Application
let initializing: Promise<void> | undefined
export function initializeApplication(): Promise<void> {
  if (application) return Promise.resolve()
  return initializing ??= loader.loadCatalog().then(async data => {
  catalog = data.catalog
  const store = new StateStore({ read: key => wx.getStorageSync(key) || null, write: (key, value) => wx.setStorageSync(key, value), remove: key => wx.removeStorageSync(key) }, catalog)
  const repository = new ContentRepository(catalog, packs, async pack => {
    if (runtime.mode === 'development') return loader.loadPack(pack.topicId)
    ensureCloud()
    const fileID = runtime.contentFiles[pack.topicId]
    if (!fileID) throw new Error('这部分内容暂未发布，请稍后重试。')
    const file = await wx.cloud.downloadFile({ fileID })
    return new Promise<string>((resolve, reject) => wx.getFileSystemManager().readFile({ filePath: file.tempFilePath, encoding: 'utf8', success: r => resolve(String(r.data)), fail: () => reject(new Error('题目下载未完成，请重试。')) }))
  })
  application = new Application(repository, store, platform)
  const active = store.get().activeSessionId
  if (active) await repository.ensureQuestions(store.get().sessions[active].questionIds).catch(() => platform.toast('上次的练习暂未加载，请稍后重试。'))
  }).catch(error => { initializing = undefined; throw error })
}
export const ready = initializeApplication()
