import { describe, expect, it } from 'vitest'
import { gzipSync } from 'node:zlib'
import { decodeNativePack } from './native/pack-codec'
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils'
import { ContentRepository } from './services/content'
import { catalog, q } from './test-fixtures'

const stored = (text: string) => ({ encoding: 'gzip-hex-v1', byteLength: Buffer.byteLength(text), data: gzipSync(text, { level: 9 }).toString('hex') })

describe('lossless native content storage', () => {
  it('publishes fully converted concurrent packs and refreshes a pack arriving during an earlier flush', async () => {
    for (const late of [false, true]) {
      const questions = ['a', 'b'].map(id => ({ ...structuredClone(q), id: `q-batch-${id}`, topicId: `g-batch-${id}`, stem: 'The colour ___ bright.' }))
      const texts = questions.map(question => JSON.stringify({ version: 1, topicId: question.topicId, questions: [question] }))
      const descriptors = questions.map((question, i) => ({ topicId: question.topicId, sha256: bytesToHex(sha256(utf8ToBytes(texts[i]))), file: `batch-${i}.json`, questionIds: [question.id] }))
      const data = catalog(); data.questions = []
      const ready = new Map<string, (text: string) => void>()
      const repo = new ContentRepository(data, descriptors, descriptor => new Promise(resolve => ready.set(descriptor.topicId, resolve)))
      repo.setSpelling('american')
      const convert = repo.setSpelling.bind(repo)
      let conversions = 0
      repo.setSpelling = spelling => {
        conversions++
        convert(spelling)
        if (late && conversions === 1) ready.get(questions[1].topicId)!(texts[1])
      }
      const loading = repo.ensureTopics(descriptors.map(d => d.topicId))
      ready.get(questions[0].topicId)!(texts[0])
      if (!late) ready.get(questions[1].topicId)!(texts[1])
      await loading
      expect(conversions).toBe(late ? 2 : 1)
      expect(data.questions.map(question => [question.id, question.stem])).toEqual(questions.map(question => [question.id, 'The color ___ bright.']))
      await repo.ensureTopics(descriptors.map(d => d.topicId))
      expect(conversions).toBe(late ? 2 : 1)
      repo.setSpelling('british')
      expect(data.questions.map(question => question.stem)).toEqual(questions.map(() => 'The colour ___ bright.'))
    }
  })
  it('preserves exact Chinese, emoji, escapes, punctuation, ordering and whitespace for the existing hash check', () => {
    const text = '{"topicId":"test","quoted":"妈妈说：\\\"Hello!\\\" 🌳","line":"a\\nb","number":1}\n'
    expect(decodeNativePack(stored(text))).toBe(text)
  })

  it('rejects unknown formats, invalid sizes and malformed hex before decompression', () => {
    const pack = stored('{"value":"test"}')
    for (const value of [null, '', pack.data, {}, { ...pack, encoding: 'other' },
      ...[0, -1, 1.5, 2_000_001, NaN, '10'].map(byteLength => ({ ...pack, byteLength })),
      ...['', 'a', pack.data + 'a', 'zz'.repeat(20), pack.data.toUpperCase()].map(data => ({ ...pack, data }))]) {
      expect(() => decodeNativePack(value)).toThrow('内容包格式不正确')
    }
  })

  it('rejects optional/invalid headers, truncated bodies and inconsistent declared output lengths', () => {
    const pack = stored('{"value":"test"}')
    const bytes = Buffer.from(pack.data, 'hex')
    for (const data of ['00000000' + pack.data.slice(8), pack.data.slice(0, 6) + '08' + pack.data.slice(8), pack.data.slice(0, -10)]) {
      expect(() => decodeNativePack({ ...pack, data })).toThrow('内容包格式不正确')
    }
    bytes.fill(255, 10, bytes.length - 8)
    expect(() => decodeNativePack({ ...pack, data: bytes.toString('hex') })).toThrow('内容包格式不正确')
    expect(() => decodeNativePack({ ...pack, byteLength: pack.byteLength + 1 })).toThrow('内容包格式不正确')
  })

  it('rejects both short output and a stream that expands beyond its claimed bounded size', () => {
    const pack = stored('abcde'), tooLong = Buffer.from(pack.data, 'hex')
    tooLong.writeUInt32LE(4, tooLong.length - 4)
    expect(() => decodeNativePack({ ...pack, byteLength: 4, data: tooLong.toString('hex') })).toThrow('内容包格式不正确')
    const tooShort = Buffer.from(pack.data, 'hex')
    tooShort.writeUInt32LE(6, tooShort.length - 4)
    expect(() => decodeNativePack({ ...pack, byteLength: 6, data: tooShort.toString('hex') })).toThrow('内容包格式不正确')
  })

  it('keeps the original SHA-256 gate: valid compressed but changed questions cannot enter the catalog', async () => {
    const text = JSON.stringify({ version: 1, topicId: q.topicId, questions: [q] })
    const descriptor = { topicId: q.topicId, sha256: bytesToHex(sha256(utf8ToBytes(text))), file: 'test.json', questionIds: [q.id] }
    const data = catalog(); data.questions = []
    const changed = text.replace('Mia ___ ready for school.', 'Mia ___ late for school.')
    const bad = new ContentRepository(data, [descriptor], async () => decodeNativePack(stored(changed)))
    await expect(bad.ensureTopics([q.topicId])).rejects.toThrow('内容校验没有通过')
    expect(data.questions).toEqual([])
    const good = new ContentRepository(data, [descriptor], async () => decodeNativePack(stored(text)))
    await good.ensureTopics([q.topicId])
    expect(data.questions.map(question => question.id)).toEqual([q.id])
  })
})
