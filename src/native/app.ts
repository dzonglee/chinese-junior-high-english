import { Application, type Platform } from '../app/application'
import { ROOT_SCREENS } from '../app/view'
import { catalog } from '../generated/catalog'
import { packs } from '../generated/packs'
import { ContentRepository } from '../services/content'
import { StateStore } from '../services/storage'
declare const require: (path: string) => { loadPack(topicId: string): Promise<string> }
const loader = require('./pack-loader.js')
const store = new StateStore({ read: (key) => wx.getStorageSync(key) || null, write: (key, value) => wx.setStorageSync(key, value), remove: (key) => wx.removeStorageSync(key) }, catalog)
const repository = new ContentRepository(catalog, packs, (pack) => loader.loadPack(pack.topicId))
let audio: WechatMiniprogram.InnerAudioContext | undefined
let recorder: WechatMiniprogram.RecorderManager | undefined
let recordStarted = 0
const platform: Platform = {
  now: () => Date.now(),
  navigate(page, params = {}, replace = false) {
    const url = `/pages/${page}/index?${Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')}`
    if (ROOT_SCREENS.includes(page) || page === 'onboarding') wx.reLaunch({ url })
    else if (replace) wx.redirectTo({ url })
    else wx.navigateTo({ url, fail: () => wx.redirectTo({ url }) })
  },
  back() { if (getCurrentPages().length > 1) wx.navigateBack(); else platform.navigate('home') },
  toast: (title) => wx.showToast({ title, icon: 'none', duration: 3000 }),
  confirm: (title, content) => new Promise((resolve) => wx.showModal({ title, content, confirmText: '确定', cancelText: '再想想', success: (r) => resolve(r.confirm), fail: () => resolve(false) })),
  async exportText(text) {
    const filePath = `${wx.env.USER_DATA_PATH}/english-backup-${Date.now()}.json`
    await new Promise<void>((resolve, reject) => wx.getFileSystemManager().writeFile({ filePath, data: text, encoding: 'utf8', success: () => resolve(), fail: reject }))
    await new Promise<void>((resolve, reject) => wx.shareFileMessage({ filePath, fileName: '英语学习备份.json', success: () => resolve(), fail: reject }))
  },
  async importText() {
    const result = await new Promise<WechatMiniprogram.ChooseMessageFileSuccessCallbackResult>((resolve, reject) => wx.chooseMessageFile({ count: 1, type: 'file', extension: ['json'], success: resolve, fail: reject }))
    const file = result.tempFiles[0]
    if (file.size > 4_000_000) throw new Error('备份文件不能超过 4 MB。')
    return new Promise<string>((resolve, reject) => wx.getFileSystemManager().readFile({ filePath: file.path, encoding: 'utf8', success: (r) => resolve(String(r.data)), fail: reject }))
  },
  copy: (data) => new Promise<void>((resolve, reject) => wx.setClipboardData({ data, success: () => resolve(), fail: reject })),
  play(path) {
    audio?.destroy(); audio = wx.createInnerAudioContext(); audio.src = path
    return new Promise<void>((resolve, reject) => { audio!.onCanplay(() => { audio!.play(); resolve() }); audio!.onError(() => reject(new Error('音频暂时无法播放，请稍后重试。'))) })
  },
  async startRecording() {
    await new Promise<void>((resolve, reject) => wx.authorize({ scope: 'scope.record', success: () => resolve(), fail: () => reject(new Error('需要麦克风权限才能录音，可在小程序设置中开启。')) }))
    recorder ??= wx.getRecorderManager()
    await new Promise<void>((resolve, reject) => { recorder!.onStart(() => { recordStarted = Date.now(); resolve() }); recorder!.onError(() => reject(new Error('录音未能开始，请检查麦克风权限。'))); recorder!.start({ duration: 60000, sampleRate: 16000, numberOfChannels: 1, encodeBitRate: 48000, format: 'mp3' }) })
  },
  stopRecording() {
    if (!recorder) return Promise.reject(new Error('当前没有录音。'))
    return new Promise((resolve, reject) => {
      recorder!.onStop((result) => wx.getFileSystemManager().saveFile({ tempFilePath: result.tempFilePath, success: (saved) => resolve({ path: saved.savedFilePath, durationMs: result.duration ?? Date.now() - recordStarted }), fail: () => reject(new Error('录音未能保存，请检查设备空间。')) }))
      recorder!.onError(() => reject(new Error('录音未能保存，请重试。'))); recorder!.stop()
    })
  },
  async removeRecordings(paths) { await Promise.all(paths.map((filePath) => new Promise<void>((resolve) => wx.getFileSystemManager().unlink({ filePath, complete: () => resolve() })))) },
}
export const application = new Application(repository, store, platform)
const active = store.get().activeSessionId
export const ready = active ? repository.ensureQuestions(store.get().sessions[active].questionIds).catch(() => { platform.toast('上次的练习暂未加载，请稍后重试。') }) : Promise.resolve()
