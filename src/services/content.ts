import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'
import { editionQuestion, editionWord, type Spelling } from '../core/spelling'
import { utf8Bytes } from '../core/utf8'
import { assertQuestion } from '../core/validation'
import type { ContentCatalog, Question } from '../core/types'

export interface PackDescriptor { topicId: string; sha256: string; file: string; questionIds: string[] }
export type PackTransport = (pack: PackDescriptor) => Promise<string>

export class ContentRepository {
  private loaded = new Set<string>()
  private pending = new Map<string, Promise<void>>()
  private spelling: Spelling = 'british'
  private originals = new Map<string, Question>()
  private originalWords: ContentCatalog['vocabulary']
  private pendingSpellingRefresh?: Promise<void>
  constructor(readonly catalog: ContentCatalog, readonly manifest: PackDescriptor[], private transport: PackTransport) { this.originalWords = [...catalog.vocabulary]; catalog.questions.forEach(q => this.originals.set(q.id, q)) }
  setSpelling(spelling: Spelling) { this.spelling = spelling; this.catalog.questions = [...this.originals.values()].map(q => editionQuestion(q, spelling)); this.catalog.vocabulary = this.originalWords.map(w => editionWord(w, spelling)) }
  private refreshLoadedSpelling(): Promise<void> {
    if (!this.pendingSpellingRefresh) {
      this.pendingSpellingRefresh = Promise.resolve().then(() => {
        // A later pack must queue another refresh, even if it arrives before
        // callers of this flush have resumed. No converted content is cached.
        this.pendingSpellingRefresh = undefined
        this.setSpelling(this.spelling)
      })
    }
    return this.pendingSpellingRefresh
  }

  async ensureTopics(ids: string[]): Promise<void> { await Promise.all([...new Set(ids)].map((id) => this.load(id))) }
  async ensureQuestions(ids: string[]): Promise<void> {
    const metadata = this.catalog.questionIndex ?? this.catalog.questions
    await this.ensureTopics(ids.map((id) => metadata.find((q) => q.id === id)?.topicId).filter((id): id is string => !!id))
  }
  getQuestion(id: string): Question | undefined { return this.catalog.questions.find((q) => q.id === id) }

  private load(topicId: string): Promise<void> {
    if (this.loaded.has(topicId)) return Promise.resolve()
    const pending = this.pending.get(topicId)
    if (pending) return pending
    const descriptor = this.manifest.find((p) => p.topicId === topicId)
    if (!descriptor) return Promise.reject(new Error('这部分内容暂时无法加载，请稍后重试。'))
    const task = this.fetchChecked(descriptor).finally(() => this.pending.delete(topicId))
    this.pending.set(topicId, task)
    return task
  }
  private async fetchChecked(descriptor: PackDescriptor): Promise<void> {
    const text = await this.transport(descriptor)
    if (text.length > 2_000_000 || bytesToHex(sha256(utf8Bytes(text))) !== descriptor.sha256) throw new Error('内容校验没有通过，请重新下载。已保存的学习记录不会受影响。')
    const pack: unknown = JSON.parse(text)
    if (!pack || typeof pack !== 'object' || !('version' in pack) || pack.version !== 1 || !('topicId' in pack) || pack.topicId !== descriptor.topicId || !('questions' in pack) || !Array.isArray(pack.questions)) throw new Error('内容版本不匹配，请更新后重试。')
    const questions: Question[] = []
    for (const q of pack.questions) {
      assertQuestion(q)
      if (q.topicId !== descriptor.topicId || !descriptor.questionIds.includes(q.id)) throw new Error('内容目录不匹配，请重新下载。')
      questions.push(q)
    }
    if (new Set(questions.map((q) => q.id)).size !== questions.length || questions.length !== descriptor.questionIds.length) throw new Error('内容包不完整，请重新下载。')
    questions.forEach(q => this.originals.set(q.id, q))
    await this.refreshLoadedSpelling()
    this.loaded.add(descriptor.topicId)
  }
}
