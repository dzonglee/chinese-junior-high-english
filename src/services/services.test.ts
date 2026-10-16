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

describe('backup integrity', () => {
  it('rejects malformed delayed-review arrays without replacing the learner state', () => {
    const bad = { ...state(), lessonReviews: { 'l-be': 'complete' } }
    expect(() => checkedState(JSON.stringify(bad), catalog(), NOW)).toThrow('复习记录')
  })
  it('rejects malformed answers and out-of-range question navigation', () => {
    const session = { id: 'session-one', mode: 'practice', questionIds: [q.id], startedAt: NOW, current: 4, answers: {}, seed: 1 }
    expect(() => checkedState(JSON.stringify({ ...state(), sessions: { 'session-one': session } }), catalog(), NOW)).toThrow('练习记录')
    session.current = 0; session.answers = { [q.id]: { answer: 123, checked: true } }
    expect(() => checkedState(JSON.stringify({ ...state(), sessions: { 'session-one': session } }), catalog(), NOW)).toThrow('答案记录')
  })
  it('rejects invalid dates without leaking a JavaScript date error', () => {
    expect(() => checkedProfile({ ...state().profile, examDate: '2027-99-99' }, catalog())).toThrow('有效的考试日期')
  })
})

describe('portable size limits', () => {
  it('rejects oversized Chinese backups by UTF-8 bytes, not JavaScript character count', () => {
    const text = '中'.repeat(1_400_000)
    expect(text.length).toBeLessThan(4_000_000)
    expect(() => checkedState(text, catalog(), NOW)).toThrow('备份太大')
  })
})

describe('device recordings on import', () => {
  it('keeps current device recordings while ignoring foreign paths in a portable file', () => {
    const db = memory(), store = new StateStore(db.adapter, catalog(), NOW)
    const local = { id: 'r-local', questionId: q.id, path: 'recording:local', createdAt: NOW, durationMs: 1000 }
    store.save({ ...state(), recordings: [local] })
    store.import(JSON.stringify({ ...state(), recordings: [{ ...local, path: 'recording:foreign' }] }), NOW)
    expect(store.get().recordings).toEqual([local])
  })
  it('reports malformed JSON in plain language and leaves existing records untouched', () => {
    const db = memory(), store = new StateStore(db.adapter, catalog(), NOW); store.save(state())
    expect(() => store.import('{invalid')).toThrow('备份文件内容无法读取')
    expect(store.get().profile).toEqual(state().profile)
  })
})
