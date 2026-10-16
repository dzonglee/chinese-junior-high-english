import { describe, expect, it } from 'vitest'
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils'
import { sha256 } from '@noble/hashes/sha256'
import { NOW, catalog, q, state } from '../test-fixtures'
import { StateStore, STORAGE_KEY, checkedProfile, checkedState } from './storage'
import type { StorageAdapter } from './storage'
import { ContentRepository } from './content'

function memory(initial?: string) {
  const data = new Map<string, string>(initial ? [[STORAGE_KEY, initial]] : [])
  const adapter: StorageAdapter = { read: (key) => data.get(key) ?? null, write: (key, value) => { data.set(key, value) }, remove: (key) => { data.delete(key) } }
  return { adapter, data }
}

describe('learner storage', () => {
  it('round-trips a valid portable backup', () => {
    const db = memory(), store = new StateStore(db.adapter, catalog(), NOW)
    store.save(state())
    const backup = store.export(), restored = checkedState(backup, catalog(), NOW)
    expect(restored.profile).toEqual(state().profile)
    expect(restored.recordings).toEqual([])
  })
  it('preserves damaged original data and refuses silent overwrite', () => {
    const db = memory('{bad json'), store = new StateStore(db.adapter, catalog(), NOW)
    expect(store.notices).toHaveLength(1)
    expect(() => store.save(state())).toThrow('先导出备份')
    expect(db.data.get(STORAGE_KEY)).toBe('{bad json')
    expect(store.export()).toBe('{bad json')
  })
  it('keeps the previous in-memory state after a disk write failure', () => {
    const db = memory(JSON.stringify(state()))
    const store = new StateStore({ ...db.adapter, write: () => { throw new Error('quota') } }, catalog(), NOW)
    expect(() => store.save({ ...state(), favorites: ['q-test-001'] })).toThrow('还没保存成功')
    expect(store.get().favorites).toEqual([])
  })
  it('rejects import atomically and retains the existing state', () => {
    const db = memory(), store = new StateStore(db.adapter, catalog(), NOW)
    store.save(state())
    expect(() => store.import('{broken')).toThrow()
    expect(store.get().profile).toEqual(state().profile)
  })
  it('does not accept a string grade or an impossible calendar date', () => {
    expect(() => checkedProfile({ ...state().profile, grade: '7' }, catalog())).toThrow()
    expect(() => checkedProfile({ ...state().profile, examDate: '2027-02-31' }, catalog())).toThrow()
  })
  it('rejects prototype keys in imported maps', () => {
    const backup = JSON.parse(JSON.stringify(state()))
    backup.words = JSON.parse('{"__proto__":{"stage":1}}')
    expect(() => checkedState(JSON.stringify(backup), catalog(), NOW)).toThrow('备份记录有误')
  })
  it('does not put device-local recordings into exported backups', () => {
    const db = memory(), store = new StateStore(db.adapter, catalog(), NOW)
    store.save({ ...state(), recordings: [{ id: 'r-1', questionId: q.id, path: '/device/private/voice.mp3', createdAt: NOW, durationMs: 1000 }] })
    expect(store.export()).not.toContain('/device/private')
  })
})

describe('content packs', () => {
  const body = JSON.stringify({ version: 1, topicId: q.topicId, questions: [q] })
  const pack = { topicId: q.topicId, file: 'g-be.json', sha256: bytesToHex(sha256(utf8ToBytes(body))), questionIds: [q.id] }
  function emptyCatalog() { const c = catalog(); c.questionIndex = c.questions.map(({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, mediaId, review }) => ({ id, topicId, skill, kind, difficulty, grades, marks, estimatedSeconds, mediaId, review })); c.questions = []; return c }
  it('loads a verified pack and shares concurrent requests', async () => {
    let calls = 0
    const repo = new ContentRepository(emptyCatalog(), [pack], async () => { calls++; return body })
    await Promise.all([repo.ensureTopics([q.topicId]), repo.ensureTopics([q.topicId])])
    expect(calls).toBe(1); expect(repo.getQuestion(q.id)?.answer.display).toBe(q.answer.display)
  })
  it('rejects corrupted content and allows a meaningful retry', async () => {
    let corrupt = true
    const repo = new ContentRepository(emptyCatalog(), [pack], async () => corrupt ? `${body} ` : body)
    await expect(repo.ensureTopics([q.topicId])).rejects.toThrow('内容校验')
    expect(repo.getQuestion(q.id)).toBeUndefined()
    corrupt = false
    await expect(repo.ensureTopics([q.topicId])).resolves.toBeUndefined()
  })
  it('rejects a validly hashed pack with missing expected questions', async () => {
    const repo = new ContentRepository(emptyCatalog(), [{ ...pack, questionIds: [q.id, 'q-test-002'] }], async () => body)
    await expect(repo.ensureTopics([q.topicId])).rejects.toThrow('不完整')
  })
})
