import { createLessonTeaching, restoreTeaching, changeTeaching, teachingCanAdvance, teachingAnswer, type LessonTeaching } from '../core/lesson-teaching'
import { experiments, getExperiment, type Experiment } from '../core/experiments'
import { sceneExperiment } from '../core/scene-experiment'
import { evidenceSentences, evidenceFeedback } from '../core/reading-evidence'
import { answerText, normalizedAnswer, wordCount } from '../core/answers'
import { bookLabel, chinaDate, currentSchoolYear, currentTerm, daysToConfirmedExam, examYear, gradesFor, localGradeLabel } from '../core/cohort'
import { DAY, ERROR_REASONS, masteryLabel, recordAttempt, reviewWord } from '../core/learning'
import { dailyPlan, learningStats, nextLesson, orderedTopics } from '../core/planner'
import { availableQuestions, checkCurrent, deferredFeedback, makeId, markAudioPlayed, moveQuestion, questionById, retryCurrent, reviewSubmittedAnswer, saveAnswer, selectQuestions, startExam, startLesson, startSession, submitSession, useHint, playable } from '../core/sessions'
import { assertQuestion } from '../core/validation'
import type { LearnerState, ExplorationProgress, Question, QuestionFilter, Skill } from '../core/types'
import { ContentRepository } from '../services/content'
import { StateStore, checkedProfile } from '../services/storage'
import type { Field, Screen } from './view'
import { ROOT_SCREENS, SCREEN_TITLES } from './view'

export interface Platform {
  now(): number
  navigate(page: string, params?: Record<string, string>, replace?: boolean): void
  back(): void
  toast(message: string): void
  confirm(title: string, message: string): Promise<boolean>
  exportText(text: string): Promise<void>
  importText(): Promise<string | null>
  copy(text: string): Promise<void>
  play(path: string): Promise<void>
  stopAudio(): void
  startRecording(isCurrent?: () => boolean): Promise<void | 'cancelled'>
  stopRecording(): Promise<{ path: string; durationMs: number }>
  removeRecordings(paths: string[], all?: boolean): Promise<void>
}

const SKILL_LABEL: Record<Skill, string> = { vocabulary: '词汇', grammar: '语法', reading: '阅读', listening: '听力', speaking: '口语', writing: '写作' }
const SKILL_CHARACTER: Record<Skill, string> = { vocabulary: '词', grammar: '句', reading: '读', listening: '听', speaking: '说', writing: '写' }
type Form = Record<string, string>
export class Application {
  page = 'home'
  params: Record<string, string> = {}
  form: Form = {}
  error = ''
  busy = false
  private listeners = new Set<() => void>()
  private wordIndex = 0
  private wordQueue: string[] = []
  private wordRevealed = false
  private wordFeedback = ''
  private wordCorrect: boolean | null = null
  private recording = false
  private recordingStarted = 0
  private recordingGeneration = 0
  private recordingTarget?: { sessionId: string; questionId: string }
  private recordingStop?: Promise<void>
  constructor(readonly content: ContentRepository, readonly store: StateStore, readonly platform: Platform) { this.syncSpelling() }
  private syncSpelling() { this.content.setSpelling(this.catalog.editions.find(e => e.id === this.state.profile?.editionId)?.spelling ?? 'british') }
  get state() { return this.store.get() }
  get catalog() { return this.content.catalog }
  subscribe(listener: () => void): () => void { this.listeners.add(listener); return () => this.listeners.delete(listener) }
  emit() { this.listeners.forEach((listener) => listener()) }
  open(page: string, params: Record<string, string> = {}) {
    this.page = SCREEN_TITLES[page] ? page : 'home'; this.params = params; this.error = ''; this.form = {}
    if (!this.state.profile && !['onboarding', 'privacy', 'settings'].includes(this.page)) this.page = 'onboarding'
    if (this.page === 'onboarding' || this.page === 'settings') this.profileFields()
    if (this.page === 'session') {
      this.restoreAnswer(); const s = this.currentSession(), id = s?.questionIds[s.current], q = id ? questionById(this.catalog, this.state, id) : undefined
      if (s && id && q && (s.answers[id]?.checked || s.submittedAt) && !deferredFeedback(s, q)) this.persist({ ...this.state, answerSeenAt: { ...this.state.answerSeenAt, [id]: this.platform.now() } })
    }
    if (this.page === 'lesson') {
      const l = this.catalog.lessons.find(l => l.id === params.id)
      if (l && l.grades.includes(this.state.profile?.grade ?? 7)) {
        const expose = () => { const answerSeenAt = { ...this.state.answerSeenAt }; for (const id of l.questionIds) answerSeenAt[id] = this.platform.now(); this.persist({ ...this.state, answerSeenAt }); this.emit() }
        if (!l.questionIds.every(id => this.catalog.questions.some(q => q.id === id))) void this.content.ensureTopics([l.topicId]).then(expose).catch(() => { this.error = '课程暂未加载成功，请返回列表重试。'; this.emit() })
        else expose()
      }
    }
    if (this.page === 'editor') this.editorFields(params.id)
    if (this.page === 'vocabulary') { this.wordQueue = this.catalog.vocabulary.filter((w) => w.grade <= (this.state.profile?.grade ?? 7)).sort((a, b) => (this.state.words[a.id]?.dueAt ?? 0) - (this.state.words[b.id]?.dueAt ?? 0)).map((w) => w.id); this.wordIndex = 0; this.wordRevealed = false; this.wordCorrect = null; this.wordFeedback = '' }
    if (this.page === 'learn') this.form = { courseGrade: 'all', courseTerm: 'all', courseSkill: 'all', courseTheme: 'all', courseStatus: 'all', courseQuery: '', coursePage: '0', courseMore: 'false' }
    if (['builder', 'exam'].includes(this.page)) this.form = { count: '8', minutes: '15', skill: params.skill ?? 'all', kind: 'all', difficulty: 'all', unitId: 'all', topicId: 'all' }
    this.emit()
  }
  setField(name: string, value: string) {
    this.form[name] = value
    if (this.page === 'lesson' && ['studioAnswer','studioBefore','studioAfter'].includes(name)) {
      const studio = this.currentTeaching(); if (!studio) return
      const saved = this.state.teaching?.[studio.id], p = restoreTeaching(studio,saved,this.platform.now())
      const next = changeTeaching(studio,p,name === 'studioBefore' ? 'before' : name === 'studioAfter' ? 'after' : 'answer',value,this.platform.now())
      this.persist({...this.state,teaching:{...this.state.teaching,[studio.id]:next},updatedAt:this.platform.now()}); return
    }
    if (this.page === 'learn' && name.startsWith('course')) { this.form.coursePage = '0'; this.emit(); return }
    if (name === 'structure') {
      const structure = value === '54' ? '54' : '63'
      if (!gradesFor(structure).includes(Number(this.form.grade) as 6 | 7 | 8 | 9)) this.form.grade = ''
      const editions = this.catalog.editions.filter((e) => e.structures.includes(structure))
      if (!editions.some((e) => e.id === this.form.editionId)) this.form.editionId = ''
      this.emit()
    }
    if (this.page === 'editor' && name === 'kind' && value === 'choice' && !['a', 'b', 'c'].includes(this.form.answer)) this.form.answer = 'a'
    if (name === 'unitId') this.form.topicId = 'all'
    if (['builder', 'exam'].includes(this.page) && ['skill', 'kind', 'difficulty', 'unitId', 'topicId'].includes(name)) this.form.count = String(Math.max(1, Math.min(Number(this.form.count) || 8, availableQuestions(this.catalog, this.state, this.questionFilter()).length)))
    if (['skill', 'kind', 'difficulty', 'grade', 'editionId', 'topicId', 'unitId'].includes(name)) this.emit()
  }
  private persist(state: LearnerState) { this.store.save(state) }
  private go(page: string, params?: Record<string, string>, replace = false) { this.platform.navigate(page, params, replace) }
  private profileFields() {
    const p = this.state.profile, now = this.platform.now()
    this.form = { cityId: p?.cityId ?? '', structure: p?.structure ?? '', grade: p ? String(p.grade) : '', term: p?.term ?? currentTerm(now), editionId: p?.editionId ?? '', dailyMinutes: String(p?.dailyMinutes ?? 15), schoolYear: String(p?.schoolYear ?? currentSchoolYear(now)), examDate: p?.examDate ?? '' }
  }
  private currentSession() { return this.state.activeSessionId ? this.state.sessions[this.state.activeSessionId] : undefined }
  private restoreAnswer() { const s = this.currentSession(); this.form.answer = s ? s.answers[s.questionIds[s.current]]?.answer ?? '' : ''; this.form.rubric = s ? this.state.writing[s.questionIds[s.current]]?.checkedRubricIds.join(',') ?? '' : '' }
  private async begin(ids: string[], mode: 'practice' | 'mistakes' | 'exam', timed?: number) {
    await this.content.ensureQuestions(ids)
    if (ids.some(id => !questionById(this.catalog, this.state, id))) throw new Error('这道题已不在当前题库，请重新选题。')
    const now = this.platform.now(), started = startSession(this.state, ids, mode, now, timed ? { deadlineAt: now + timed * 60_000 } : {})
    let next = started.state
    const first = questionById(this.catalog, next, ids[0]), draft = this.state.writing[ids[0]]
    if (first && ['writing', 'speaking'].includes(first.kind) && draft && mode !== 'exam') next = saveAnswer(next, draft.text, now)
    this.persist(next); this.go('session')
  }
  async action(id: string, value = ''): Promise<void> {
    if (this.busy) return
    this.error = ''
    this.busy = true; this.emit()
    try {
      if (this.recordingStop) {
        const generation = this.recordingGeneration
        await this.recordingStop
        if (id === 'record-start' && generation !== this.recordingGeneration) return
      }
      await this.perform(id, value)
    }
    catch (error) { this.error = error instanceof Error ? error.message : '刚才没能完成，请再试一次。'; this.platform.toast(this.error) }
    finally { this.busy = false; this.emit() }
  }
  private async perform(id: string, value: string): Promise<void> {
    const now = this.platform.now()
    if (this.recording && (['navigate', 'back', 'jump', 'next', 'submit', 'check'].includes(id) || id.startsWith('start-'))) await this.perform('record-stop', '')
    if (['navigate', 'back', 'jump', 'next', 'submit', 'word-next', 'delete-recording', 'delete-data', 'import'].includes(id) || id.startsWith('start-')) this.platform.stopAudio()
    if (id === 'navigate') { this.flush(); const [page, skill] = value.split(':'); this.go(page, skill ? { skill } : undefined); return }
    if (id === 'course-filters') { this.form.courseMore = this.form.courseMore === 'true' ? 'false' : 'true'; return }
    if (id === 'course-next' || id === 'course-previous') { this.form.coursePage = String(Math.max(0, Number(this.form.coursePage || 0) + (id === 'course-next' ? 1 : -1))); return }
    if (id === 'back') { this.flush(); this.platform.back(); return }
    if (id === 'open-lesson-studio') {
      const lesson = this.catalog.lessons.find(l => l.id === value)
      if (!lesson || !lesson.grades.includes(this.state.profile!.grade)) throw new Error('请选择适合当前年级的课程。')
      await this.content.ensureTopics([lesson.topicId])
      const studio = createLessonTeaching(this.catalog, lesson), saved = this.state.teaching?.[lesson.id]
      const progress = restoreTeaching(studio,saved,now)
      const answerSeenAt = { ...this.state.answerSeenAt }; for (const qid of studio.exposedIds) answerSeenAt[qid] = now
      this.persist({ ...this.state, teaching: { ...this.state.teaching, [lesson.id]: progress }, answerSeenAt, updatedAt: now })
      this.go('lesson', { id: lesson.id }); return
    }
    if (id.startsWith('studio-')) {
      const studio = this.currentTeaching(); if (!studio) return
      const saved = this.state.teaching?.[studio.id], progress = restoreTeaching(studio,saved,now)
      const next = changeTeaching(studio, progress, id.slice('studio-'.length), value, now)
      this.persist({ ...this.state, teaching: { ...this.state.teaching, [studio.id]: next }, updatedAt: now }); return
    }
    if (id === 'open-experiment') { const e = value === sceneExperiment.id ? sceneExperiment : getExperiment(value); if (e && e.grade <= this.state.profile!.grade) this.go('explore', { id: e.id }); return }
    if (id.startsWith('explore-')) { this.exploreAction(id, value); return }
    if (id === 'evidence-pick' || id === 'evidence-open' || id === 'explain-more') {
      const session = this.currentSession(), qid = session?.questionIds[session.current], q = qid ? questionById(this.catalog, this.state, qid) : undefined
      const unlocked = q && session && !deferredFeedback(session, q) && (session.submittedAt || session.mode !== 'exam' && session.answers[q.id]?.checked)
      if (!unlocked || !q) return
      if (id === 'evidence-open') this.form[`evidence-open-${q.id}`] = this.form[`evidence-open-${q.id}`] === 'true' ? 'false' : 'true'
      if (id === 'evidence-pick' && evidenceSentences(q).some(sentence => sentence.id === value)) this.form[`evidence-${q.id}`] = value
      if (id === 'explain-more') this.form[`steps-${q.id}`] = String(Math.min(q.explanation.steps.length, Number(this.form[`steps-${q.id}`] || 1) + 1))
      return
    }
    if (id === 'save-profile') {
      const p = checkedProfile({ ...this.form, grade: Number(this.form.grade), dailyMinutes: Number(this.form.dailyMinutes), schoolYear: Number(this.form.schoolYear), ...(this.form.examDate ? { examDate: this.form.examDate } : { examDate: undefined }), createdAt: this.state.profile?.createdAt ?? now }, this.catalog)
      this.persist({ ...this.state, profile: p, updatedAt: now }); this.syncSpelling(); this.go('home', undefined, true); return
    }
    if (id === 'start-lesson' || id === 'start-review') {
      const [lessonId, stage] = value.split(':')
      const lesson = this.catalog.lessons.find((l) => l.id === lessonId)
      if (!lesson) throw new Error('这节课暂时无法打开。')
      await this.content.ensureTopics([lesson.topicId])
      this.persist(startLesson(this.state, this.catalog, lessonId, now, id === 'start-review' ? Number(stage) : undefined).state); this.go('session'); return
    }
    if (id === 'start-topic') {
      const available = (this.catalog.questionIndex ?? this.catalog.questions).filter((q) => q.topicId === value && q.grades.includes(this.state.profile!.grade)).length
      const chosen = selectQuestions(this.catalog, this.state, { topicIds: [value], count: Math.min(8, available) }, now)
      await this.begin(chosen.map((q) => q.id), 'practice'); return
    }
    if (id === 'resume') { const s = this.currentSession(); if (s) await this.content.ensureQuestions(s.questionIds); this.go('session'); return }
    if (id === 'open-session') { const s = this.state.sessions[value]; if (!s) throw new Error('这次练习的详细记录已不在本机。'); await this.content.ensureQuestions(s.questionIds); this.persist({ ...this.state, activeSessionId: s.id }); this.go(s.submittedAt ? 'result' : 'session'); return }
    if (id === 'start-mistakes') {
      const all = Object.values(this.state.mistakes).filter((m) => !m.cleared).sort((a, b) => a.dueAt - b.dueAt)
      const ids = value ? [value] : all.filter((m) => m.dueAt <= now).slice(0, 10).map((m) => m.questionId)
      if (!ids.length) throw new Error('今天没有到期的错题。可以打开某一道提前练习，提前练不记为延时通过。')
      await this.begin(ids, 'mistakes'); return
    }
    if (id === 'start-custom') {
      const selected = selectQuestions(this.catalog, this.state, this.questionFilter(), now)
      const minutes = Number(this.form.minutes)
      if (this.page === 'exam' && (!Number.isInteger(minutes) || minutes < 5 || minutes > 120)) throw new Error('限时请填写 5—120 之间的整数分钟。')
      await this.begin(selected.map((q) => q.id), this.page === 'exam' ? 'exam' : 'practice', this.page === 'exam' ? minutes : undefined); return
    }
    if (id === 'start-local-exam') {
      const blueprint = this.catalog.blueprints.find((b) => b.id === value)
      if (blueprint) await this.content.ensureTopics([...new Set((this.catalog.questionIndex ?? this.catalog.questions).filter((q) => blueprint.sections.some((s) => s.skill === q.skill)).map((q) => q.topicId))])
      this.persist(startExam(this.state, this.catalog, value, now, now >>> 0).state); this.go('session'); return
    }
    if (id === 'choose') { this.form.answer = value; this.flush(); return }
    if (id === 'order-add' || id === 'order-remove') {
      let order: string[] = []
      try { order = JSON.parse(this.form.answer || '[]') } catch { order = [] }
      if (id === 'order-add' && !order.includes(value)) order.push(value)
      if (id === 'order-remove') order = order.filter((item) => item !== value)
      this.form.answer = JSON.stringify(order); this.flush(); return
    }
    if (id === 'hint') { this.flush(); this.persist(useHint(this.state, now)); return }
    if (id === 'toggle-rubric') { const ids = new Set((this.form.rubric ?? '').split(',').filter(Boolean)); ids.has(value) ? ids.delete(value) : ids.add(value); this.form.rubric = [...ids].join(','); this.flush(); return }
    if (id === 'check') {
      this.flush(); this.persist(checkCurrent(this.state, this.catalog, now, (this.form.rubric ?? '').split(',').filter(Boolean))); return
    }
    if (id === 'review-self') { this.persist(reviewSubmittedAnswer(this.state, this.catalog, now, (this.form.rubric ?? '').split(',').filter(Boolean))); return }
    if (id === 'retry') { this.persist(retryCurrent(this.state, now)); this.restoreAnswer(); return }
    if (id === 'next' || id === 'jump') {
      this.flush(); const s = this.currentSession(); if (!s) return
      const target = id === 'jump' ? Number(value) : s.current + 1
      if (target >= s.questionIds.length) { await this.perform('submit', ''); }
      else { this.persist(moveQuestion(this.state, target, now)); this.restoreAnswer() }
      return
    }
    if (id === 'submit') {
      this.flush(); const s = this.currentSession(); if (!s) return
      const unanswered = s.questionIds.filter((qid) => !s.answers[qid]?.answer).length
      if (s.mode === 'exam' && unanswered && !(await this.platform.confirm('还有题没作答', `还有 ${unanswered} 道题未作答。确定现在交卷吗？`))) return
      this.persist(submitSession(this.state, this.catalog, now)); this.go('result', undefined, true); return
    }
    if (id === 'review-question') { const s = this.currentSession(); if (s) { this.persist(moveQuestion(this.state, Number(value), now)); this.go('session') }; return }
    if (id === 'favorite') {
      const favorites = new Set(this.state.favorites); favorites.has(value) ? favorites.delete(value) : favorites.add(value)
      this.persist({ ...this.state, favorites: [...favorites], updatedAt: now }); return
    }
    if (id === 'clear-mistake') {
      const m = this.state.mistakes[value]
      if (m && await this.platform.confirm('移出这道错题？', m.streak >= 3 ? '已经连续通过三次到期重做。移出后，作答记录仍会保留。' : '这会整理你的错题本，但不会增加掌握或延时通过记录。')) this.persist({ ...this.state, mistakes: { ...this.state.mistakes, [value]: { ...m, cleared: true } }, updatedAt: now })
      return
    }
    if (id === 'word-reveal') { this.wordRevealed = true; const word = this.currentWord(); if (word) this.persist({ ...this.state, answerSeenAt: { ...this.state.answerSeenAt, [`q-${word.topicId}-${word.id.slice(5)}`]: now } }); return }
    if (id === 'word-next') { this.wordIndex++; this.wordRevealed = false; this.wordFeedback = ''; this.wordCorrect = null; this.form.wordAnswer = ''; return }
    if (id === 'word-check') {
      if (this.wordCorrect !== null) return
      const word = this.currentWord(); if (!word) return
      if (!(this.form.wordAnswer ?? '').trim()) throw new Error('先试着拼写这个单词。')
      const sensitive = /^[A-Z]/.test(word.word)
      const correct = [word.word, ...word.acceptedSpellings].some((answer) => normalizedAnswer(answer, sensitive) === normalizedAnswer(this.form.wordAnswer, sensitive))
      const previous = this.state.words[word.id], qid = `q-${word.topicId}-${word.id.slice(5)}`, lastSeen = Math.max(this.state.answerSeenAt?.[qid] ?? 0, this.state.answerSeenAt?.[qid + '-meaning'] ?? 0), independent = !this.wordRevealed && (!previous || now >= previous.dueAt) && (!lastSeen || now - lastSeen >= DAY)
      const withAttempt = recordAttempt(this.state, { id: makeId('attempt', now), questionId: qid, topicId: word.topicId, skill: 'vocabulary', answer: this.form.wordAnswer, correct, score: correct ? 1 : 0, maxScore: 1, evidence: independent ? 'independent' : 'assisted', firstTry: true, delayed: independent && !!previous && now - Math.max(previous.lastAt, lastSeen) >= 2 * DAY, at: now, seconds: 0, sessionId: `words-${chinaDate(now).key}` }, 1)
      this.persist({ ...withAttempt, answerSeenAt: { ...this.state.answerSeenAt, [qid]: now }, words: { ...this.state.words, [word.id]: reviewWord(previous, word.id, correct, independent, now) }, updatedAt: now })
      this.wordCorrect = correct; this.wordFeedback = correct ? independent ? '拼写正确，下次按计划再复习。' : '这次练对了。刚看过答案或提前复习不计为独立回忆。' : '再看一遍正确拼写，留意容易漏掉的字母。'; this.wordRevealed = true; return
    }
    if (id === 'play-current') { const s = this.currentSession(); const q = s && questionById(this.catalog, this.state, s.questionIds[s.current]); if (q?.mediaId) await this.perform('play', q.mediaId); return }
    if (id === 'play') {
      const media = this.catalog.media.find((m) => m.id === value && m.approvedByOwner)
      if (!media) throw new Error('这段音频还没准备好。')
      await this.platform.play(media.path); const s = this.currentSession(); const qid = s?.questionIds[s.current]; if (s && qid && questionById(this.catalog, this.state, qid)?.mediaId === value) this.persist(markAudioPlayed(this.state, qid, this.platform.now())); return
    }
    if (id === 'play-recording') { const recording = this.state.recordings.find((r) => r.id === value); if (recording) await this.platform.play(recording.path); return }
    if (id === 'record-start') {
      if (this.recording) return
      const s = this.currentSession(), questionId = s?.questionIds[s.current]
      if (!s || s.submittedAt || !questionId || questionById(this.catalog, this.state, questionId)?.kind !== 'speaking') throw new Error('请先打开尚未提交的口语练习。')
      const target = { sessionId: s.id, questionId }, generation = ++this.recordingGeneration
      const isCurrent = () => generation === this.recordingGeneration
      let result: void | 'cancelled'
      try { result = await this.platform.startRecording(isCurrent) }
      catch (error) { if (!isCurrent()) return; throw error }
      if (result === 'cancelled') return
      // Some adapters cannot cancel a pending start. Stop its eventual recording before
      // accepting another action, and keep it attached to the original question.
      if (!isCurrent()) { await this.stopAndSaveRecording(target, false); return }
      this.recordingTarget = target; this.recording = true; this.recordingStarted = this.platform.now(); return
    }
    if (id === 'record-stop') { await this.stopAndSaveRecording(); return }
    if (id === 'clear-date') { this.form.examDate = ''; return }
    if (id === 'delete-recording') { const r = this.state.recordings.find((r) => r.id === value); if (r && await this.platform.confirm('删除这段录音？', '删除后无法恢复，口语自评记录仍会保留。')) { await this.platform.removeRecordings([r.path]); this.persist({ ...this.state, recordings: this.state.recordings.filter((r) => r.id !== value), updatedAt: now }) }; return }
    if (id === 'reason') { const [qid, reason] = value.split(':'); const m = this.state.mistakes[qid]; if (m && ERROR_REASONS.some((r) => r.id === reason)) this.persist({ ...this.state, mistakes: { ...this.state.mistakes, [qid]: { ...m, reason: reason as typeof m.reason } }, updatedAt: now }); return }
    if (id === 'start-private' || id === 'start-question') { await this.begin([value], 'practice'); return }
    if (id === 'save-private') { this.savePrivate(now); this.go('private', undefined, true); return }
    if (id === 'delete-private') {
      if (await this.platform.confirm('删除这道私人题目？', '题目和它的错题条目会删除，历史作答记录仍会保留。')) {
        const mistakes = { ...this.state.mistakes }; delete mistakes[value]
        this.persist({ ...this.state, privateQuestions: this.state.privateQuestions.filter((q) => q.id !== value), mistakes, favorites: this.state.favorites.filter((id) => id !== value), updatedAt: now }); this.go('private', undefined, true)
      }; return
    }
    if (id === 'export') { await this.platform.exportText(this.store.export()); return }
    if (id === 'import') { const text = await this.platform.importText(); if (text && await this.platform.confirm('导入学习备份？', '这会替换本机学习记录，当前设备录音会保留。请先导出当前备份。')) { this.store.import(text, now); this.syncSpelling(); this.go('home', undefined, true) }; return }
    if (id === 'delete-data') {
      if (await this.platform.confirm('删除本机学习记录？', '学习资料、错题、写作草稿、私人题目和录音都会删除。此操作无法撤销，请先导出备份。')) {
        await this.platform.removeRecordings(this.state.recordings.map((r) => r.path), true); this.store.reset(now); this.go('onboarding', undefined, true)
      }
      return
    }
    if (id === 'copy') { await this.platform.copy(value); return }
    if (id === 'edit-private') { this.go('editor', value ? { id: value } : {}); return }
    throw new Error('这个操作暂时无法完成，请重试。')
  }
  flush() {
    const s = this.currentSession()
    if (this.page === 'session' && s && !s.submittedAt && this.form.answer !== undefined) {
      const record = s.answers[s.questionIds[s.current]]
      if (!record?.checked && (!s.deadlineAt || this.platform.now() < s.deadlineAt)) this.persist(saveAnswer(this.state, this.form.answer, this.platform.now()))
      const q = questionById(this.catalog, this.state, s.questionIds[s.current])
      if (q && ['writing', 'speaking'].includes(q.kind) && !record?.checked) this.persist({ ...this.state, writing: { ...this.state.writing, [q.id]: { questionId: q.id, text: this.form.answer, checkedRubricIds: (this.form.rubric ?? '').split(',').filter(Boolean), updatedAt: this.platform.now() } } })
    }
  }
  private questionFilter(): QuestionFilter {
    const f = this.form, p = this.state.profile
    const book = p && this.catalog.books.find(b => b.editionId === p.editionId && b.grade === p.grade && b.term === p.term)
    const unit = book && f.unitId !== 'all' ? book.units.find(u => u.id === f.unitId) : undefined
    let topics = unit?.topicIds
    if (f.topicId && f.topicId !== 'all') topics = !topics || topics.includes(f.topicId) ? [f.topicId] : ['no-matching-topic']
    return { count: Number(f.count), ...(topics ? { topicIds: topics } : {}), ...(f.skill && f.skill !== 'all' ? { skills: [f.skill as Skill] } : {}), ...(f.kind && f.kind !== 'all' ? { kinds: [f.kind as Question['kind']] } : {}), ...(f.difficulty && f.difficulty !== 'all' ? { difficulties: [Number(f.difficulty)] } : {}) }
  }
  private currentWord() {
    return this.catalog.vocabulary.find((w) => w.id === this.wordQueue[this.wordIndex % this.wordQueue.length])
  }
  private editorFields(id?: string) {
    const q = this.state.privateQuestions.find((q) => q.id === id), e = q?.explanation
    this.form = { topicId: q?.topicId ?? this.catalog.topics[0]?.id ?? '', kind: q?.kind ?? 'blank', stem: q?.stem ?? '', passage: q?.passage ?? '', answer: q?.answer.accepted?.join('|') ?? q?.answer.option ?? '', optionA: q?.options?.[0]?.text ?? '', optionB: q?.options?.[1]?.text ?? '', optionC: q?.options?.[2]?.text ?? '', whyA: e?.distractors.find((d) => d.option === 'a')?.reason ?? '', whyB: e?.distractors.find((d) => d.option === 'b')?.reason ?? '', whyC: e?.distractors.find((d) => d.option === 'c')?.reason ?? '', strategy: e?.strategy ?? '', step1: e?.steps[0]?.text ?? '', reason1: e?.steps[0]?.reason ?? '', step2: e?.steps[1]?.text ?? '', reason2: e?.steps[1]?.reason ?? '', pitfall: e?.pitfall ?? '', evidence: e?.visual.segments[0]?.text ?? '', evidenceNote: e?.visual.segments[0]?.note ?? '', transfer: e?.transfer ?? '' }
  }
  private savePrivate(now: number) {
    const f = this.form, old = this.state.privateQuestions.find((q) => q.id === this.params.id)
    if (!old && this.state.privateQuestions.length >= 200) throw new Error('最多保存 200 道私人题目，请先整理旧题。')
    const topic = this.catalog.topics.find((t) => t.id === f.topicId)
    if (!topic || !['choice', 'blank', 'correction'].includes(f.kind)) throw new Error('请选择知识点和支持的题型。')
    const choices = f.kind === 'choice' ? ['a', 'b', 'c'].map((id) => ({ id, text: f[`option${id.toUpperCase()}`].trim() })) : undefined
    const answer = f.kind === 'choice' ? { option: f.answer, display: choices?.find((o) => o.id === f.answer)?.text ?? '' } : { accepted: f.answer.split('|').map((s) => s.trim()).filter(Boolean), display: f.answer.split('|')[0].trim() }
    const q = { id: old?.id ?? makeId('private', now), topicId: topic.id, skill: topic.skill, kind: f.kind as 'choice' | 'blank' | 'correction', difficulty: 1 as const, grades: [this.state.profile!.grade], stem: f.stem.trim(), ...(f.passage.trim() ? { passage: f.passage.trim() } : {}), options: choices, answer, explanation: { strategy: f.strategy.trim(), steps: [1, 2].map((n) => ({ text: f[`step${n}`].trim(), reason: f[`reason${n}`].trim() })), distractors: choices ? choices.filter((o) => o.id !== f.answer).map((o) => ({ option: o.id, reason: f[`why${o.id.toUpperCase()}`].trim() })) : [], pitfall: f.pitfall.trim(), visual: { kind: 'evidence' as const, title: '关键线索与答案', segments: [{ text: f.evidence.trim(), role: 'evidence' as const, note: f.evidenceNote.trim() }, { text: answer.display, role: 'verb' as const, note: '由这处依据得出的答案' }], caption: f.evidenceNote.trim() }, transfer: f.transfer.trim() }, marks: 1, estimatedSeconds: 60, source: { kind: 'original' as const, author: 'learner' }, review: 'draft' as const, private: true as const, createdAt: old?.createdAt ?? now, updatedAt: now }
    try { assertQuestion(q) } catch { throw new Error('请补全题目、正确答案、两步解析及理由、错因和图解线索；选择题还要解释每个错误选项。') }
    this.persist({ ...this.state, privateQuestions: [...this.state.privateQuestions.filter((item) => item.id !== q.id), q], updatedAt: now })
  }
  async tick() {
    const s = this.currentSession()
    if (this.recording && this.platform.now() - this.recordingStarted >= 59000 && !this.busy) await this.action('record-stop')
    if (s?.deadlineAt && !s.submittedAt && this.platform.now() >= s.deadlineAt && !this.busy) {
      this.busy = true
      try { await this.content.ensureQuestions(s.questionIds); this.persist(submitSession(this.state, this.catalog, this.platform.now())); if (this.page === 'session') this.go('result', undefined, true) }
      catch (e) { this.error = e instanceof Error ? e.message : '交卷暂未完成，请重试。' }
      finally { this.busy = false }
    }
    if (this.page === 'session' && s?.deadlineAt) this.emit()
  }
  private stopAndSaveRecording(target = this.recordingTarget, fillAnswer = true): Promise<void> {
    if (this.recordingStop) return this.recordingStop
    if (!target) return Promise.resolve()
    this.recording = false; this.recordingTarget = undefined
    this.recordingStop = (async () => {
      const result = await this.platform.stopRecording(), now = this.platform.now()
      this.persist({ ...this.state, recordings: [...this.state.recordings, { ...result, id: makeId('recording', now), questionId: target.questionId, createdAt: now }], updatedAt: now })
      const s = this.currentSession()
      if (fillAnswer && this.page === 'session' && s?.id === target.sessionId && s.questionIds[s.current] === target.questionId && !s.submittedAt && !s.answers[target.questionId]?.checked && (!s.deadlineAt || now < s.deadlineAt)) {
        if (!this.form.answer?.trim()) this.form.answer = '已录音，请回听后对照要点自查。'
        this.flush()
      }
    })().finally(() => { this.recordingStop = undefined; this.emit() })
    return this.recordingStop
  }
  async suspend() {
    ++this.recordingGeneration
    this.platform.stopAudio()
    // Never await an unresolved permission/start dialog here. Its generation is invalid
    // already; the start continuation will cancel or stop/save a late recorder.
    await this.stopAndSaveRecording()
    this.flush()
  }
  render(): Screen { return this.renderScreen() }
  private renderScreen(): Screen {
    const state = this.state, profile = state.profile, now = this.platform.now(), stats = learningStats(state, now)
    const screen: Screen = { id: this.page, title: SCREEN_TITLES[this.page] ?? '初中英语', back: !ROOT_SCREENS.includes(this.page) && this.page !== 'onboarding', busy: this.busy, error: this.error,
      metrics: [], fields: [], cards: [], actions: [], tabs: ROOT_SCREENS.includes(this.page) ? [['home', '今日', '今'], ['learn', '课程', '学'], ['practice', '练习', '练'], ['mistakes', '错题', '错'], ['profile', '我的', '我']].map(([id, label, character]) => ({ id, label, character, selected: id === this.page })) : [] }
    if (this.store.notices.length) screen.notice = this.store.notices[0]
    if (this.page === 'onboarding' || this.page === 'settings') return this.renderProfile(screen)
    if (this.page === 'privacy') {
      screen.sections = [{ title: '先在本机保存', text: '学习资料、作答、错题、写作草稿和私人题目先保存在当前设备。未经你主动操作，不会上传录音或私人题目。' }, { title: '录音由你决定', text: '只有点击录音时才申请麦克风权限。录音用于回听和自查，不会被说成机器评测成绩。' }, { title: '你可以带走或删除记录', text: '可以导出学习备份。备份不包含设备上的录音文件。删除本机记录会同时清理本机录音。' }]
      screen.actions = [{ id: 'navigate', value: 'settings', label: '数据与学习设置', tone: 'primary' }]; return screen
    }
    if (!profile) return screen
    const city = this.catalog.cities.find((c) => c.id === profile.cityId), edition = this.catalog.editions.find((e) => e.id === profile.editionId)
    screen.subtitle = `${city?.name ?? ''} · ${localGradeLabel(profile.grade, profile.structure, profile.cityId)} · ${bookLabel(profile.grade, profile.term)}`
    if (this.page === 'lesson') return this.renderTeaching(screen)
    if (this.page === 'explore') return this.renderExploration(screen)
    if (this.page === 'home') {
      const next = nextLesson(this.catalog, state), days = daysToConfirmedExam(profile, now)
      screen.eyebrow = `${chinaDate(now).month} 月 ${chinaDate(now).day} 日 · 今天进步一点`
      if (!screen.notice) screen.notice = `今天的目标是 ${profile.dailyMinutes} 分钟。先完成今日安排，有余力再接着练。`
      screen.hero = { eyebrow: `${examYear(profile)} 届 · ${days === null ? '按自己的节奏稳步练习' : days === 0 ? '你确认的考试日期已到，请核对后续安排' : `距你确认的考试还有 ${days} 天`}`, title: next?.title ?? '把学过的，再练扎实', text: next?.objective ?? '先做到期复习，再挑一个薄弱点练习。', art: 'welcome', tone: 'blue', actions: [{ id: next ? 'open-lesson-studio' : 'navigate', value: next?.id ?? 'practice', label: next ? '接着学' : '去练习', tone: 'primary' }] }
      screen.metrics = [{ label: '连续练习', value: `${stats.streak} 天` }, { label: '独立作答', value: `${stats.independent} 题` }, { label: '首次独立正确', value: stats.independent ? `${stats.accuracy}%` : '还没开始' }]
      screen.week = stats.week
      screen.cards = dailyPlan(this.catalog, state, now).map((task) => ({ id: task.id, title: task.title, text: task.description, label: `约 ${task.minutes} 分钟`, tag: task.done ? '今天已练' : task.optional ? '可接着练' : '今日安排', actions: [{ id: task.action === 'start-lesson' ? 'open-lesson-studio' : task.action, value: task.value, label: task.done ? '再练一次' : '开始', tone: 'secondary' }] }))
      screen.cards.unshift({ id: 'explore', title: '动手试一试', text: '搬物品、改条件、找错句。先看英语怎样变化，再回到课程里独立检验。', label: '互动实验室', character: '探', actions: [{ id: 'navigate', value: 'explore', label: '开始探索', tone: 'secondary' }] })
      const active = this.currentSession()
      if (active && !active.submittedAt) screen.cards.unshift({ id: 'resume', title: '上次还没练完', text: `已检查 ${Object.values(active.answers).filter((a) => a.checked).length} / ${active.questionIds.length} 题，答案已经保存。`, actions: [{ id: 'resume', label: '继续练习', tone: 'primary' }] })
      return screen
    }
    if (this.page === 'learn') {
      screen.hero = { eyebrow: '先动手，再发现规律', title: '让句子跟着你的选择变化', text: '改时间、换主语、搬动物品。先作预测，再用新的情境检验发现。', art: 'notebook', tone: 'teal', actions: [{ id: 'navigate', value: 'explore', label: '进入互动实验室', tone: 'primary' }] }
      const ordered = orderedTopics(this.catalog, state), topics = new Map(this.catalog.topics.map(t => [t.id, t])), index = new Map((this.catalog.questionIndex ?? this.catalog.questions).map(q => [q.id, q]))
      const gradeLabel = (grade: number) => (({ 6: '六年级衔接', 7: '七年级', 8: '八年级', 9: '九年级' } as Record<number, string>)[grade] ?? '')
      const ready = (lesson: typeof this.catalog.lessons[number]) => lesson.questionIds.every(id => { const q = index.get(id); return !!q && playable(q, this.catalog) })
      screen.notice = `${this.catalog.course ? '这是原创能力课程；年级学期为本课程的学习顺序。' : ''}${ordered.notice}`
      const completed = this.catalog.lessons.filter(l => state.lessonDoneAt[l.id]).length, pending = this.catalog.lessons.filter(l => !ready(l)).length
      screen.metrics = [{ label: '课程总数', value: String(this.catalog.lessons.length) }, { label: '已完成', value: String(completed) }, { label: '待配套音频', value: String(pending) }]
      screen.fields = [this.select('courseGrade', '课程年级', [{ value: 'all', label: '全部年级' }, ...[6, 7, 8, 9].map(g => ({ value: String(g), label: gradeLabel(g) }))]), this.select('courseTerm', '课程学期', [{ value: 'all', label: '上下学期' }, { value: 'upper', label: '上学期' }, { value: 'lower', label: '下学期' }]), this.select('courseSkill', '练习能力', [{ value: 'all', label: '全部能力' }, ...Object.entries(SKILL_LABEL).map(([value, label]) => ({ value, label }))]), this.select('courseTheme', '主题', [{ value: 'all', label: '全部主题与基础专项' }, ...(this.catalog.course?.themes ?? []).map(t => ({ value: t.id, label: t.title }))]), this.select('courseStatus', '学习状态', [{ value: 'all', label: '全部状态' }, { value: 'todo', label: '尚未完成' }, { value: 'done', label: '已完成' }, { value: 'available', label: '当前可以练' }, { value: 'pending', label: '待配套音频' }]), { name: 'courseQuery', label: '搜索课程', kind: 'input', value: this.form.courseQuery, placeholder: '输入课程标题或目标', maxLength: 100 }]
      const more = this.form.courseMore === 'true'
      if (!more) screen.fields = screen.fields.filter(f => ['courseSkill', 'courseTheme', 'courseQuery'].includes(f.name))
      screen.chips = [{ id: 'course-filters', label: more ? '收起更多筛选' : '按年级、学期或进度筛选', selected: more, action: 'course-filters', value: '' }]
      const query = this.form.courseQuery.trim().toLocaleLowerCase(), orderedIds = ordered.topics.map(t => t.id)
      const lessons = this.catalog.lessons.filter(lesson => {
        const topic = topics.get(lesson.topicId)!, stage = topic.course, available = ready(lesson) && lesson.grades.includes(profile.grade)
        return (this.form.courseGrade === 'all' || String(stage?.grade ?? Math.min(...lesson.grades)) === this.form.courseGrade) && (this.form.courseTerm === 'all' || stage?.term === this.form.courseTerm) && (this.form.courseSkill === 'all' || topic.skill === this.form.courseSkill) && (this.form.courseTheme === 'all' || stage?.themeId === this.form.courseTheme) && (!query || `${lesson.title} ${lesson.objective}`.toLocaleLowerCase().includes(query)) && (this.form.courseStatus === 'all' || this.form.courseStatus === 'todo' && !state.lessonDoneAt[lesson.id] || this.form.courseStatus === 'done' && !!state.lessonDoneAt[lesson.id] || this.form.courseStatus === 'available' && available || this.form.courseStatus === 'pending' && !ready(lesson))
      }).sort((a, b) => {
        const ai = orderedIds.indexOf(a.topicId), bi = orderedIds.indexOf(b.topicId)
        return (ai < 0 ? 10000 + topics.get(a.topicId)!.order : ai) - (bi < 0 ? 10000 + topics.get(b.topicId)!.order : bi) || a.order - b.order
      })
      const size = 24, pages = Math.max(1, Math.ceil(lessons.length / size)), page = Math.min(pages - 1, Math.max(0, Number(this.form.coursePage) || 0))
      screen.sections = [{ title: `找到 ${lessons.length} 节课 · 第 ${page + 1} / ${pages} 页`, text: lessons.length ? '已完成不等于掌握；每节课另有新题用于延时检验。可按主题或能力缩小范围。' : '没有符合条件的课程，试试放宽年级、主题或状态。' }]
      screen.cards = lessons.slice(page * size, (page + 1) * size).map(lesson => {
        const topic = topics.get(lesson.topicId)!, available = ready(lesson), suitable = lesson.grades.includes(profile.grade), stage = topic.course
        return { id: lesson.id, title: lesson.title, text: lesson.objective, label: `${stage ? `${gradeLabel(stage.grade)}${stage.term === 'upper' ? '上' : '下'} · ` : ''}${SKILL_LABEL[topic.skill]} · ${lesson.questionIds.length} 项练习 + ${lesson.delayedQuestionIds.length} 项延时检验`, tag: !suitable ? '高年级课程' : !available ? '音频准备中' : state.lessonDoneAt[lesson.id] ? '已学 · 还要延时复习' : '可以开始', character: SKILL_CHARACTER[topic.skill], progress: state.mastery[topic.id]?.score ?? 0, actions: [{ id: 'open-lesson-studio', value: lesson.id, label: state.teaching?.[lesson.id]?.step === 5 ? '再探一遍' : state.teaching?.[lesson.id] ? '继续互动课程' : !available ? '文字预习与推演' : '动手学这节课', disabled: !suitable, tone: 'primary' as const }, ...[sceneExperiment, ...experiments].filter(e => e.topicId === topic.id && e.grade <= profile.grade).map(e => ({ id: 'open-experiment', value: e.id, label: '先动手探索', tone: 'secondary' as const })), { id: 'start-lesson', value: lesson.id, label: !suitable ? '先选适合当前年级的课' : !available ? '音频准备中' : state.lessonDoneAt[lesson.id] ? '再做巩固练习' : '直接做课后练习', disabled: !suitable || !available, tone: 'secondary' as const }] }
      })
      screen.actions = [{ id: 'course-previous', label: '上一页', disabled: page === 0, tone: 'quiet' }, { id: 'course-next', label: '下一页', disabled: page + 1 >= pages, tone: 'secondary' }]
      return screen
    }
    if (this.page === 'practice') {
      screen.hero = { eyebrow: '今天想练哪一项', title: '有目标地练，才知道哪里进步了', text: '按能力选题，错了就看线索和理由，再做一次。', art: 'cards', tone: 'teal', actions: [{ id: 'navigate', value: 'builder', label: '自由组题', tone: 'primary' }] }
      screen.cards = (Object.keys(SKILL_LABEL) as Skill[]).map((skill) => ({ id: skill, title: SKILL_LABEL[skill], text: { vocabulary: '用拼写和例句检验记忆。', grammar: '从主语、时间和结构里找依据。', reading: '回到原文，说明答案从哪里来。', listening: '先听任务，再抓关键信息。', speaking: '录下来回听，逐项自查表达。', writing: '先组织要点，再检查句子和衔接。' }[skill], character: SKILL_CHARACTER[skill], actions: [{ id: 'navigate', value: skill === 'vocabulary' ? 'vocabulary' : skill === 'writing' ? 'writing' : skill === 'speaking' ? 'speaking' : skill === 'listening' ? 'listening' : `builder:${skill}`, label: '去练习', tone: 'secondary' }] }))
      screen.cards.push({ id: 'timed', title: '自主限时练', text: '自己选题量和时间。只有核实完整的本地结构，才会标为本地模考。', actions: [{ id: 'navigate', value: 'exam', label: '安排限时练', tone: 'secondary' }] }); return screen
    }
    if (this.page === 'vocabulary') {
      const word = this.currentWord(); screen.eyebrow = '先想，再看答案'
      if (word) screen.word = { audioAvailable: this.wordRevealed && !!word.mediaId && this.catalog.media.some(m => m.id === word.mediaId && m.approvedByOwner), mediaId: word.mediaId, id: word.id, word: this.wordRevealed ? word.word : '', meaning: word.meaning, example: this.wordRevealed ? word.example : word.example.replace(new RegExp(`\\b${word.word}\\b`, 'i'), '_____'), exampleMeaning: word.exampleMeaning, revealed: this.wordRevealed, answer: this.form.wordAnswer ?? '', feedback: this.wordFeedback, correct: this.wordCorrect, explanation: this.wordRevealed ? word.explanation : '' }
      else screen.notice = '单词内容正在准备，先做语法和句子练习。'
      screen.actions = word ? [{ id: 'word-check', label: '检查拼写', tone: 'primary' }, { id: 'word-reveal', label: '看答案', tone: 'quiet' }, { id: 'word-next', label: '下一个', tone: 'secondary' }] : []; return screen
    }
    if (this.page === 'builder' || this.page === 'exam') {
      screen.notice = this.page === 'exam' ? '这是自主限时练，不冒充本地中考卷。交卷前不显示答案和提示。' : '按当前年级选题，题目不会靠重复来凑数量。'
      screen.fields = [this.select('skill', '练习能力', [{ value: 'all', label: '全部能力' }, ...Object.entries(SKILL_LABEL).map(([value, label]) => ({ value, label }))]), this.select('kind', '作答方式', [{ value: 'all', label: '全部方式' }, { value: 'choice', label: '选择' }, { value: 'blank', label: '填空' }, { value: 'correction', label: '改错' }, { value: 'order', label: '句子排序' }, { value: 'writing', label: '写作自评' }, { value: 'speaking', label: '口语自评' }]), this.select('difficulty', '难度', [{ value: 'all', label: '混合难度' }, { value: '1', label: '基础' }, { value: '2', label: '巩固' }, { value: '3', label: '提升' }]), { name: 'count', label: '题量（1—100）', kind: 'input', value: this.form.count, numeric: true, maxLength: 3 }, ...(this.page === 'exam' ? [{ name: 'minutes', label: '限时（5—120 分钟）', kind: 'input' as const, value: this.form.minutes, numeric: true, maxLength: 3 }] : [])]
      const book = this.catalog.books.find(b => b.editionId === profile.editionId && b.grade === profile.grade && b.term === profile.term)
      const unit = book?.units.find(u => u.id === this.form.unitId)
      screen.fields.unshift(this.select('unitId', '教材单元', [{ value: 'all', label: book?.units.length ? '全部已记录单元' : '单元对应待核实，按能力选题' }, ...(book?.units ?? []).map(u => ({ value: u.id, label: `${u.title}${u.verification === 'official' ? '' : '（待核对）'}` }))]), this.select('topicId', '知识点或阅读策略', [{ value: 'all', label: '全部知识点' }, ...this.catalog.topics.filter(t => t.grades.includes(profile.grade) && (!unit || unit.topicIds.includes(t.id))).map(t => ({ value: t.id, label: `${SKILL_LABEL[t.skill]} · ${t.title}` }))]))
      const available = availableQuestions(this.catalog, this.state, this.questionFilter()).length
      screen.notice += ` 当前条件有 ${available} 道可用题。`
      screen.actions = [{ id: 'start-custom', label: this.page === 'exam' ? '开始计时' : '开始练习', tone: 'primary', disabled: !available }]
      if (this.page === 'exam') screen.cards = [{ id: 'local', title: '本地中考结构', text: '核对城市、届别和学校学制后，再看哪些结构已经有完整依据。', actions: [{ id: 'navigate', value: 'exam-info', label: '查看核验情况', tone: 'quiet' }] }]
      return screen
    }
    if (this.page === 'session') return this.renderSession(screen)
    if (this.page === 'result') return this.renderResult(screen)
    if (this.page === 'mistakes') {
      const mistakes = Object.values(state.mistakes).filter((m) => !m.cleared).sort((a, b) => a.dueAt - b.dueAt)
      screen.hero = { eyebrow: '错一次，就多弄懂一点', title: mistakes.length ? `${mistakes.length} 道题，等你重新想明白` : '今天没有待整理的错题', text: '重做时先独立想。提前练习有用，但不算到期后的保留证据。', art: 'notebook', tone: 'coral', actions: mistakes.length ? [{ id: 'start-mistakes', label: '重做到期错题', tone: 'primary' }] : [{ id: 'navigate', value: 'practice', label: '去做一组练习', tone: 'primary' }] }
      screen.cards = mistakes.map((m) => ({ id: m.questionId, title: this.catalog.topics.find((t) => t.id === (this.catalog.questionIndex ?? this.catalog.questions).find((q) => q.id === m.questionId)?.topicId)?.title ?? '我的题目', text: `${ERROR_REASONS.find((r) => r.id === m.reason)?.label ?? '错因还没标注'} · 连续到期通过 ${m.streak} 次`, tag: m.dueAt <= now ? '今天到期' : `${Math.ceil((m.dueAt - now) / DAY)} 天后复习`, actions: [{ id: 'start-mistakes', value: m.questionId, label: '重新想一遍', tone: 'secondary' }, { id: 'clear-mistake', value: m.questionId, label: '自查后移出', tone: 'quiet' }] })); return screen
    }
    if (this.page === 'profile' || this.page === 'report') {
      screen.metrics = [{ label: '独立作答', value: `${stats.independent} 题` }, { label: '首次独立正确', value: stats.independent ? `${stats.accuracy}%` : '还没开始' }, { label: '延时复习通过', value: `${stats.retainedTopics} 项` }, { label: '写作与口语自评', value: `${stats.selfReviews} 次` }]
      screen.week = stats.week
      screen.notice = '完成一课不等于掌握。独立作答、提示后练习和自评记录分开统计。'
      if (this.page === 'profile') screen.cards = [['history', '练习记录', '继续未完成练习，回顾本次结果。'], ['favorites', '我的收藏', '把值得再想一次的题留在手边。'], ['sources', '资料与核验', '了解原创内容和待核实项目。'], ['report', '学习报告', '看看哪些能力需要再练。'], ['exam-info', '我的中考', '核对本地试卷和届别，不套用邻市信息。'], ['private', '我的题目', '只存在本机，不进入公共题库。'], ['recordings', '我的录音', '回听自己的表达，自查后再练。'], ['settings', '学习与数据设置', `${edition?.name ?? ''} · ${edition?.version ?? ''}`], ['privacy', '隐私与数据', '了解保存、导出和删除方式。']].map(([id, title, text]) => ({ id, title, text, actions: [{ id: 'navigate', value: id, label: '查看', tone: 'quiet' }] }))
      else screen.cards = this.catalog.topics.filter((t) => state.mastery[t.id]?.attempts).map((t) => ({ id: t.id, title: t.title, text: `${state.mastery[t.id].attempts} 次独立作答`, tag: masteryLabel(state.mastery[t.id], now), progress: state.mastery[t.id].score, actions: [{ id: 'start-topic', value: t.id, label: '再练一组', tone: 'secondary' }] }))
      return screen
    }
    if (this.page === 'listening') {
      const available = (this.catalog.questionIndex ?? this.catalog.questions).filter(q => q.skill === 'listening' && q.grades.includes(profile.grade))
      screen.notice = available.some(q => playable(q, this.catalog)) ? '先听再答，检查后才显示原文与线索。' : '原创听力任务已准备，配套音频还在制作。音频就绪后可直接开始；现在可以先练阅读或口语。'
      screen.cards = available.map(q => ({ id: q.id, title: this.catalog.topics.find(t => t.id === q.topicId)?.title ?? '听力练习', text: '先读问题，带着目标听。', tag: playable(q, this.catalog) ? '音频已就绪' : '音频准备中', actions: [{ id: 'start-question', value: q.id, label: '听一听，选一选', tone: 'secondary', disabled: !playable(q, this.catalog) }] })); return screen
    }
    if (this.page === 'writing' || this.page === 'speaking') {
      const skill = this.page
      screen.notice = skill === 'speaking' ? '录音用来回听和自查，不会被冒充为机器评测分数。' : '先写自己的版本，再对照要点自评。自评分不算机器评测。'
      screen.cards = (this.catalog.questionIndex ?? this.catalog.questions).filter((q) => q.skill === skill && q.grades.includes(profile.grade)).map((q) => ({ id: q.id, title: this.catalog.topics.find((t) => t.id === q.topicId)?.title ?? SKILL_LABEL[skill], text: `约 ${Math.ceil(q.estimatedSeconds / 60)} 分钟 · ${q.marks} 分自查要点`, actions: [{ id: 'start-question', value: q.id, label: '开始练习', tone: 'secondary' }] })); return screen
    }
    if (this.page === 'exam-info') {
      screen.notice = `${city?.name ?? ''} · ${examYear(profile)} 届：只使用匹配本地、学制和届别的核实资料。`
      const blueprints = this.catalog.blueprints.filter((b) => b.cityId === profile.cityId && b.examYear === examYear(profile) && b.structures.includes(profile.structure))
      screen.cards = blueprints.length ? blueprints.map((b) => ({ id: b.id, title: `${b.examYear} 届英语试卷结构`, text: `${b.totalMarks} 分 · ${b.minutes} 分钟`, tag: b.verification === 'official' ? '有官方依据' : '待核实', actions: [{ id: 'start-local-exam', value: b.id, label: '按本地结构练习', tone: 'primary', disabled: b.verification !== 'official' }] })) : [{ id: 'unverified', title: '这届的完整结构还在核实', text: '不会把往年、邻市或其他学制的卷子直接套过来。先练基础能力和自主限时练。', tag: '待核实', actions: [{ id: 'navigate', value: 'exam', label: '自主限时练', tone: 'primary' }] }]
      return screen
    }
    if (this.page === 'private') { screen.cards = state.privateQuestions.map((q) => ({ id: q.id, title: q.stem, text: `${SKILL_LABEL[q.skill]} · 仅本机可见`, actions: [{ id: 'start-private', value: q.id, label: '练这道题', tone: 'secondary' }, { id: 'edit-private', value: q.id, label: '编辑', tone: 'quiet' }] })); screen.actions = [{ id: 'edit-private', label: '添加我的题目', tone: 'primary' }]; return screen }
    if (this.page === 'history') { screen.cards = Object.values(state.sessions).sort((a, b) => b.startedAt - a.startedAt).map(s => ({ id: s.id, title: `${s.mode === 'exam' ? '限时练习' : s.mode === 'lesson' ? '互动课程' : s.mode === 'review' ? '延时复习' : '专项练习'} · ${s.questionIds.length} 题`, text: `${chinaDate(s.startedAt).key} · ${s.submittedAt ? '已完成' : '未完成，答案已保存'}`, actions: [{ id: 'open-session', value: s.id, label: s.submittedAt ? '查看结果' : '继续练习', tone: 'secondary' }] })); if (!screen.cards.length) screen.notice = '还没有练习记录。先从今日安排开始。'; return screen }
    if (this.page === 'favorites') { screen.cards = state.favorites.map(id => ({ id, title: this.catalog.topics.find(t => t.id === ((this.catalog.questionIndex ?? this.catalog.questions).find(q => q.id === id)?.topicId ?? state.privateQuestions.find(q => q.id === id)?.topicId))?.title ?? '收藏的题目', text: '收藏不代表已经掌握，隔一段时间再独立试试。', actions: [{ id: 'start-question', value: id, label: '再练这道题', tone: 'secondary' }, { id: 'favorite', value: id, label: '取消收藏', tone: 'quiet' }] })); if (!screen.cards.length) screen.notice = '看完解析后，可以把值得再想一次的题收藏到这里。'; return screen }
    if (this.page === 'editor') {
      screen.notice = '请编写自己的题目。解析要写出依据，不能只写“答案如此”。题目只保存在本机。'
      screen.fields = [this.select('topicId', '知识点', this.catalog.topics.map((t) => ({ value: t.id, label: t.title }))), this.select('kind', '题型', [{ value: 'blank', label: '填空' }, { value: 'correction', label: '改错（只填修改后的表达）' }, { value: 'choice', label: '三选一' }]), ...[['stem', '题目与作答要求'], ['passage', '语境或短文（可选）']].map(([name, label]) => ({ name, label, kind: 'textarea' as const, value: this.form[name] }))]
      if (this.form.kind === 'choice') {
        screen.fields.push(...['A', 'B', 'C'].flatMap((letter) => [{ name: `option${letter}`, label: `选项 ${letter}`, kind: 'input' as const, value: this.form[`option${letter}`] }, { name: `why${letter}`, label: `${letter} 为错误选项时，为什么错`, kind: 'textarea' as const, value: this.form[`why${letter}`] }]))
        screen.fields.push(this.select('answer', '正确选项', ['a', 'b', 'c'].map((id) => ({ value: id, label: id.toUpperCase() }))))
      } else screen.fields.push({ name: 'answer', label: '接受的答案（多个用 | 隔开）', kind: 'input', value: this.form.answer })
      screen.fields.push(...[['strategy', '思路：先留意什么'], ['step1', '第一步：怎么做'], ['reason1', '第一步：为什么这样做'], ['step2', '第二步：怎么判断'], ['reason2', '第二步：判断依据'], ['pitfall', '容易错在哪里'], ['evidence', '图解中标出的原文或结构'], ['evidenceNote', '这处线索说明什么'], ['transfer', '换一个句子，怎么用这条方法']].map(([name, label]) => ({ name, label, kind: 'textarea' as const, value: this.form[name] })))
      screen.actions = [{ id: 'save-private', label: '保存私人题目', tone: 'primary' }, ...(this.params.id ? [{ id: 'delete-private', value: this.params.id, label: '删除这道题', tone: 'danger' as const }] : [])]; return screen
    }
    if (this.page === 'sources') { screen.sections = [{ title: '原创练习与核验', text: '当前练习由本项目原创编写，仍需教学编辑审核。教材采用与本地试卷结构只有取得对应依据后才会标为已核实。' }, { title: '版本明确区分', text: '2024 年起的新教材与旧版分开记录。未核实的单元映射按年级能力编排，不声称与当前课本逐课同步。' }]; return screen }
    if (this.page === 'recordings') { screen.cards = state.recordings.map((r) => ({ id: r.id, title: this.catalog.topics.find((t) => t.id === questionById(this.catalog, state, r.questionId)?.topicId)?.title ?? '我的口语练习', text: `${Math.round(r.durationMs / 1000)} 秒 · ${chinaDate(r.createdAt).key}`, actions: [{ id: 'play-recording', value: r.id, label: '回听录音', tone: 'secondary' }, { id: 'delete-recording', value: r.id, label: '删除', tone: 'quiet' }] })); return screen }
    return screen
  }
  private select(name: string, label: string, options: { value: string; label: string }[]): Field { return { name, label, kind: 'select', value: this.form[name] ?? '', options, selectedIndex: Math.max(0, options.findIndex((o) => o.value === this.form[name])) } }
  private renderProfile(screen: Screen): Screen {
    const structure = this.form.structure === '54' ? '54' : '63'
    screen.subtitle = '按自己正在使用的课本确认，版本和届别不混用。'
    screen.fields = [this.select('cityId', '所在城市', [{ value: '', label: '请选择城市' }, ...this.catalog.cities.map((c) => ({ value: c.id, label: `${c.province} · ${c.name}` }))]), this.select('structure', '学校学制', [{ value: '', label: '请选择学制' }, { value: '63', label: '六三制' }, { value: '54', label: '五四制' }]), this.select('grade', '年级', [{ value: '', label: '请选择年级' }, ...gradesFor(structure).map((grade) => ({ value: String(grade), label: `${grade} 年级` }))]), this.select('term', '学期', [{ value: 'upper', label: '上学期' }, { value: 'lower', label: '下学期' }]), this.select('editionId', '教材版本（请核对封面）', [{ value: '', label: '请选择教材' }, ...this.catalog.editions.filter((e) => e.structures.includes(structure)).map((e) => ({ value: e.id, label: `${e.name} · ${e.version}` }))]), { name: 'schoolYear', label: '学年开始年份', kind: 'input', value: this.form.schoolYear, numeric: true, maxLength: 4, help: '例如 2026—2027 学年，填写 2026。' }, this.select('dailyMinutes', '每天想练多久', [10, 15, 20, 30].map((n) => ({ value: String(n), label: `${n} 分钟` }))), { name: 'examDate', label: '已确认的考试日期（可留空）', kind: 'date', value: this.form.examDate, help: '没有正式日期就先留空，不使用猜测的倒计时。' }]
    screen.actions = [{ id: 'save-profile', label: this.state.profile ? '保存设置' : '确认，开始练习', tone: 'primary' }, ...(!this.state.profile ? [{ id: 'import', label: '已有备份，直接导入', tone: 'quiet' as const }] : [])]
    if (this.store.notices.length) screen.actions.push({ id: 'export', label: '先导出原始记录', tone: 'secondary' }, { id: 'navigate', value: 'settings', label: '查看备份与重置选项', tone: 'quiet' })
    if (this.page === 'settings') screen.cards = [{ id: 'backup', title: '学习备份', text: '导出包含学习记录、草稿和私人题目，不包含设备录音。导入会替换学习记录，当前设备录音保留。', actions: [{ id: 'export', label: '导出备份', tone: 'secondary' }, { id: 'import', label: '导入备份', tone: 'quiet' }] }, { id: 'delete', title: '清理本机数据', text: '请先导出备份。删除后无法撤销。', actions: [{ id: 'delete-data', label: '删除本机记录', tone: 'danger' }] }]
    return screen
  }
  private renderSession(screen: Screen): Screen {
    const s = this.currentSession()
    if (!s) { screen.notice = '没有正在进行的练习。'; screen.actions = [{ id: 'navigate', value: 'practice', label: '选择练习', tone: 'primary' }]; return screen }
    const q = questionById(this.catalog, this.state, s.questionIds[s.current])
    if (!q) { screen.notice = '这道题还没加载完整，已保存的答案还在。'; screen.actions = [{ id: 'resume', label: '重新加载练习', tone: 'primary' }]; return screen }
    const deferred = deferredFeedback(s, q)
    const record = s.answers[q.id], isSelf = q.kind === 'writing' || q.kind === 'speaking', show = !deferred && ((!!record?.checked && (s.mode !== 'exam' || !!s.submittedAt)) || (!!s.submittedAt && isSelf))
    const ordered: string[] = (() => { try { return q.kind === 'order' ? JSON.parse(this.form.answer || '[]') : [] } catch { return [] } })()
    const rubric = new Set((this.form.rubric ?? '').split(','))
    screen.title = this.catalog.topics.find((t) => t.id === q.topicId)?.title ?? '英语练习'
    if (deferred) screen.notice = '这是延时检验。整组提交后再统一核对，避免前面的解析提示后面的题。'
    screen.eyebrow = s.mode === 'exam' ? s.blueprintId ? '本地结构模考' : '自主限时练' : s.mode === 'review' ? '延时复习' : s.mode === 'mistakes' ? '错题重做' : '先试一试，再看理由'
    screen.progress = { label: `${s.current + 1} / ${s.questionIds.length}`, current: s.current + 1, total: s.questionIds.length, percent: Math.round((s.current + 1) / s.questionIds.length * 100) }
    if (s.deadlineAt && !s.submittedAt) { const remaining = Math.max(0, s.deadlineAt - this.platform.now()); screen.subtitle = `剩余 ${Math.floor(remaining / 60000)} 分 ${Math.floor(remaining % 60000 / 1000)} 秒` }
    const sentences = show ? evidenceSentences(q) : [], evidenceId = this.form[`evidence-${q.id}`], picked = evidenceId ? evidenceFeedback(q, evidenceId) : undefined
    screen.question = { ...(sentences.length ? { evidence: { open: this.form[`evidence-open-${q.id}`] === 'true', sentences: sentences.map(sentence => ({ id: sentence.id, text: sentence.text, selected: sentence.id === evidenceId })), ...(picked ? { feedback: picked.message, correct: picked.correct } : {}) } } : {}), revealedSteps: Math.min(q.explanation.steps.length, Math.max(1, Number(this.form[`steps-${q.id}`] || 1))), id: q.id, stem: q.stem, ...(q.skill !== 'listening' || show ? { passage: q.passage } : {}), kind: q.kind, value: this.form.answer ?? '', checked: !!record?.checked, answerLocked: !!record?.checked || !!s.submittedAt,
      options: (q.options ?? []).map((o) => ({ ...o, selected: this.form.answer === o.id, state: show ? o.id === q.answer.option ? 'correct' : o.id === record?.answer ? 'wrong' : '' : '' })),
      tokens: (q.tokens ?? []).map((t) => ({ ...t, selected: ordered.includes(t.id) })), orderedTokens: ordered.map((id) => q.tokens?.find((t) => t.id === id)).filter((t): t is { id: string; text: string } => !!t),
      ...(record?.hints && !show ? { hint: q.explanation.strategy } : {}), ...(show ? { feedback: isSelf ? !record?.checked ? '请回看自己的回答，再对照要点自评。未作答的题目自评记为零分。' : `自评 ${record.result?.score ?? 0} / ${record.result?.maxScore ?? q.marks} 分，不计为机器评测。` : record.result?.correct ? record.result.evidence === 'independent' ? '对了！再看看理由能不能自己说出来。' : '这次练对了。提示后的练习不算首次独立通过。' : `还不对。${q.explanation.pitfall}`, explanation: q.explanation, modelAnswer: q.answer.display } : {}),
      selfReview: isSelf, rubric: (q.rubric ?? []).map((p) => ({ ...p, selected: rubric.has(p.id) })), audioAvailable: !!q.mediaId && this.catalog.media.some((m) => m.id === q.mediaId && m.approvedByOwner), recordingAvailable: q.kind === 'speaking' && !s.submittedAt, recording: this.recording, recordingSaved: this.state.recordings.some((r) => r.questionId === q.id), words: wordCount(this.form.answer ?? '') }
    screen.actions = s.submittedAt ? [...(isSelf && !record?.checked ? [{ id: 'review-self', label: '记录这道题的自评', tone: 'primary' as const }] : []), { id: 'navigate', value: 'result', label: '返回结果', tone: 'secondary' }] : s.mode === 'exam' ? [{ id: 'next', label: s.current === s.questionIds.length - 1 ? '交卷' : '保存，下一题', tone: 'primary' }, { id: 'submit', label: '提前交卷', tone: 'quiet' }] : record?.checked && deferred ? [{ id: 'next', label: s.current === s.questionIds.length - 1 ? '提交并统一核对' : '答案已记录，下一题', tone: 'primary' }] : show ? [{ id: 'next', label: s.current === s.questionIds.length - 1 ? '看本次结果' : '下一题', tone: 'primary' }, ...(!record.result?.correct && !isSelf ? [{ id: 'retry', label: '再想一次', tone: 'secondary' as const }] : [])] : [{ id: 'check', label: isSelf ? '记录自评' : deferred ? '记录答案' : '检查答案', tone: 'primary' }, ...(!isSelf ? [{ id: 'hint', label: '给我一点提示', tone: 'quiet' as const }] : [])]
    if (s.mode === 'exam') screen.chips = s.questionIds.map((id, i) => ({ id, label: `${i + 1}${s.answers[id]?.answer ? ' ·' : ''}`, selected: s.current === i, action: 'jump', value: String(i) }))
    else if (this.state.mistakes[q.id] && record?.checked && show) screen.chips = ERROR_REASONS.map(r => ({ id: r.id, label: r.label, selected: this.state.mistakes[q.id].reason === r.id, action: 'reason', value: `${q.id}:${r.id}` }))
    if (show) screen.actions.push({ id: 'favorite', value: q.id, label: this.state.favorites.includes(q.id) ? '取消收藏' : '收藏这道题', tone: 'quiet' })
    return screen
  }
  private currentTeaching(): LessonTeaching | undefined {
    if (this.page !== 'lesson') return undefined
    const lesson = this.catalog.lessons.find(l => l.id === this.params.id)
    if (!lesson || !lesson.grades.includes(this.state.profile?.grade ?? 7)) return undefined
    if (!lesson.questionIds.every(id => this.catalog.questions.some(q => q.id === id))) return undefined
    return createLessonTeaching(this.catalog, lesson)
  }
  private renderTeaching(screen: Screen): Screen {
    const studio = this.currentTeaching()
    if (!studio) { screen.notice = '课程内容尚未加载，请从课程列表重新打开。'; screen.actions = [{id:'navigate',value:'learn',label:'返回课程',tone:'primary'}]; return screen }
    const saved = this.state.teaching?.[studio.id], p = restoreTeaching(studio,saved,this.platform.now())
    const task = teachingAnswer(studio,p), key = `step-${p.step}-${p.caseIndex}`, unit = studio.assemblies[Math.min(p.unit,studio.assemblies.length-1)]
    const selection = p.answers.diagnosis, evidence = studio.evidence.find(e=>e.id===p.answers.evidence)
    const checked = p.step === 3 ? typeof p.checked.diagnosis === 'boolean' : p.step === 2 && studio.evidence.length ? !!evidence : typeof p.checked[key] === 'boolean'
    const correct = p.step === 3 ? !!p.checked.diagnosis : p.step === 2 && studio.evidence.length ? !!p.checked.evidence : !!p.checked[key]
    const feedback = p.step === 3 && selection ? studio.diagnosis.reasons[selection] : p.step === 2 && studio.evidence.length && evidence ? evidence.supports ? `${studio.prediction.explanation.steps[0].text} ${studio.prediction.explanation.steps[0].reason}` : '这处文字没有包含本题解析引用的关键线索。再对照问题和原文试一试。' : checked ? correct ? task.explanation.steps[0].text : task.options ? task.explanation.distractors.find(d=>d.option===p.answers[key])?.reason ?? task.explanation.pitfall : task.explanation.pitfall : ''
    screen.title = studio.title; screen.eyebrow = studio.mode === 'transcript' ? '听前准备 · 文字推演' : studio.mode === 'phonetics' ? '书面语音知识 · 不测实际发音' : '先动手，再理解'
    screen.subtitle = studio.objective
    if (studio.mediaPending) screen.notice = '本页用文字整理对话和线索，不计听力完成。真正的听力练习仍需已批准的音频。'
    screen.progress = {label: `${['先预测','搭一搭','动手探究','你来批改','换个任务','完成探索'][p.step]} · ${Math.min(p.step+1,5)} / 5`,current:Math.min(p.step+1,5),total:5,percent:p.step*20}
    const rubric = p.step === 4 ? studio.transfer.rubric ?? [] : studio.rubric
    let responseIds: string[] = []; try { responseIds = JSON.parse(p.answers[key] ?? '[]'); if (!Array.isArray(responseIds)) responseIds = [] } catch {}
    const proposed = task.options?.find(o=>o.id===p.answers[key])?.text ?? p.answers[key] ?? ''
    screen.teaching = {proposedContext: proposed ? /_+/.test(task.stem) ? task.stem.replace(/_+/g,proposed) : `拟采用表达：${proposed}` : '', sortingCards:(studio.sorting?.cards??[]).map(card=>({...card,selected:p.answers[`sort-${card.id}`]??'',checked:typeof p.checked[`sort-${card.id}`]==='boolean',correct:!!p.checked[`sort-${card.id}`]})),assemblyComplete:p.completed.includes(`build-${unit.id}`),assemblyMiss:p.checked[`build-${unit.id}`] === false,preview:!!p.checked[`preview-${unit.id}`],responseTiles:(task.tokens??[]).map(t=>({...t,selected:responseIds.includes(t.id)})),responseOrder:responseIds.map(id=>task.tokens?.find(t=>t.id===id)).filter((t):t is {id:string;text:string}=>!!t),lesson:studio,progress:p,task,answer:p.answers[key]??'',checked,correct,feedback,canAdvance:teachingCanAdvance(studio,p),assembly:unit,reference:unit.target.map(id=>unit.tiles.find(t=>t.id===id)!.text).join(unit.kind==='letters'?'':' '),selectedTiles:p.order.map(id=>unit.tiles.find(t=>t.id===id)).filter((t):t is {id:string;text:string}=>!!t),availableTiles:unit.tiles.map(t=>({...t,selected:p.order.includes(t.id)})),rubric:rubric.map(r=>({...r,selected:!!p.checked[`rubric-${p.step}-${r.id}`],linked:p.links[r.id]})),practiceReady:!studio.mediaPending}
    screen.actions = p.step === 5 ? [{id:'start-lesson',value:studio.id,label:'进入课后巩固练习',disabled:studio.mediaPending,tone:'primary'},{id:'navigate',value:'learn',label:'回到课程',tone:'secondary'},{id:'studio-reset',label:'重新动手探究',tone:'quiet'}] : [{id:'studio-next',label:p.step===4?'记录探索完成':'继续下一步',disabled:!teachingCanAdvance(studio,p),tone:'primary'},{id:'navigate',value:'learn',label:'保存，稍后继续',tone:'quiet'}]
    return screen
  }
  private currentExperiment(): Experiment | undefined { return this.params.id === sceneExperiment.id ? sceneExperiment : getExperiment(this.params.id) }
  private experimentProgress(experiment: Experiment): ExplorationProgress {
    const saved = this.state.explorations?.[experiment.id]
    return saved ?? { version: 1, phase: 0, condition: experiment.conditions[0].id, visited: [], updatedAt: this.platform.now() }
  }
  private exploreAction(action: string, value: string) {
    const experiment = this.currentExperiment()
    if (this.page !== 'explore' || !experiment || experiment.grade > (this.state.profile?.grade ?? 0)) return
    const current = this.experimentProgress(experiment), next = { ...current, visited: [...current.visited], updatedAt: this.platform.now() }
    if (action === 'explore-predict' && current.phase === 0 && experiment.prediction.options.some(o => o.id === value)) {
      next.prediction = value; next.phase = 1; next.visited = [experiment.conditions[0].id]
    } else if (action === 'explore-condition' && current.phase === 1 && experiment.conditions.some(c => c.id === value)) {
      next.condition = value; next.visited = [...new Set([...current.visited, value])]
    } else if (action === 'explore-answer' && (current.phase === 2 || current.phase === 3)) {
      const task = current.phase === 2 ? experiment.spot : experiment.transfer
      if (!task.options.some(o => o.id === value)) return
      if (current.phase === 2) next.spot = value; else next.transfer = value
    } else if (action === 'explore-next') {
      if (current.phase === 1 && new Set(current.visited).size >= 2) next.phase = 2
      else if (current.phase === 2 && current.spot === experiment.spot.correct) next.phase = 3
      else if (current.phase === 3 && current.transfer === experiment.transfer.correct) next.phase = 4
      else return
    } else if (action === 'explore-reset') {
      next.phase = 0; next.condition = experiment.conditions[0].id; next.visited = []; delete next.prediction; delete next.spot; delete next.transfer
    } else return
    this.persist({ ...this.state, explorations: { ...this.state.explorations, [experiment.id]: next }, updatedAt: this.platform.now() })
  }
  private renderExploration(screen: Screen): Screen {
    const experiment = this.currentExperiment()
    screen.eyebrow = '猜一猜 → 动手试 → 找错 → 换个情境'
    if (!experiment) {
      screen.subtitle = '改变一个条件，看看英语怎样跟着变。'
      screen.notice = '这里记录探索进度，不计为独立测验或掌握。回到课程里的新题，再检验自己的发现。'
      screen.cards = [sceneExperiment, ...experiments].map(e => ({ id: e.id, title: e.title, text: e.question, tag: this.state.explorations?.[e.id]?.phase === 4 ? '已探索 · 还要独立检验' : `${e.grade} 年级起`, character: e.id === sceneExperiment.id ? '搬' : '探', actions: [{ id: 'open-experiment', value: e.id, label: this.state.explorations?.[e.id] ? '继续探索' : '动手试试', disabled: e.grade > this.state.profile!.grade, tone: 'secondary' }] }))
      return screen
    }
    if (experiment.grade > this.state.profile!.grade) { screen.notice = '先选择适合当前年级的实验。'; return screen }
    const progress = this.experimentProgress(experiment), phase = progress.phase, condition = experiment.conditions.find(c => c.id === progress.condition) ?? experiment.conditions[0]
    screen.title = experiment.title; screen.subtitle = ['先作预测，答案稍后揭晓。', '至少试两种条件，找出变与不变。', '你来批改：找到真正需要修改的地方。', '换个情境，试试刚才发现的方法。', '探索已完成，再用新题独立检验。'][phase]
    screen.progress = { label: `第 ${Math.min(phase + 1, 4)} / 4 步 · ${['预测', '探索', '找错', '迁移', '完成'][phase]}`, current: Math.min(phase + 1, 4), total: 4, percent: phase === 4 ? 100 : phase * 25 }
    const task = phase === 0 ? experiment.prediction : phase === 2 ? experiment.spot : experiment.transfer
    const selected = phase === 0 ? progress.prediction : phase === 2 ? progress.spot : progress.transfer
    const feedback = phase === 1 ? `核对最初那种条件的预测：${progress.prediction === experiment.prediction.correct ? '这次预测符合情境。' : '看看实际变化，再修正刚才的预测。'}${experiment.prediction.reason}` : phase === 2 || phase === 3 ? selected ? task === experiment.prediction ? experiment.prediction.reason : ('reasons' in task ? task.reasons[selected] : '') : undefined : undefined
    screen.exploration = { experiment, progress, condition, isScene: experiment.id === sceneExperiment.id, options: task.options.map(o => ({ ...o, selected: selected === o.id })), ...(feedback ? { feedback, correct: phase === 1 ? progress.prediction === experiment.prediction.correct : selected === task.correct } : {}), nextDisabled: phase === 1 ? new Set(progress.visited).size < 2 : phase === 2 ? progress.spot !== experiment.spot.correct : phase === 3 ? progress.transfer !== experiment.transfer.correct : true }
    screen.actions = phase === 4 ? [{ id: 'start-topic', value: experiment.topicId, label: '用课程新题独立检验', tone: 'primary' }, { id: 'navigate', value: 'explore', label: '选另一个实验', tone: 'secondary' }, { id: 'explore-reset', label: '重新探索', tone: 'quiet' }] : phase > 0 ? [{ id: 'explore-next', label: ['','发现规律，去找错','换个情境试试','完成本次探索'][phase], disabled: screen.exploration.nextDisabled, tone: 'primary' }, { id: 'navigate', value: 'explore', label: '保存，稍后继续', tone: 'quiet' }] : []
    return screen
  }
  private renderResult(screen: Screen): Screen {
    const s = this.currentSession(); if (!s) return screen
    const attempts = this.state.attempts.filter((a) => a.sessionId === s.id && a.firstTry), independent = attempts.filter((a) => a.evidence === 'independent'), correct = independent.filter((a) => a.correct).length
    const self = attempts.filter((a) => a.evidence === 'self_review')
    screen.hero = { eyebrow: '把结果变成下一步', title: independent.length ? `${correct} / ${independent.length} 题首次独立做对` : '这组练习已经记录', text: self.length ? `包含 ${self.length} 次写作或口语自评，自评分与独立作答分开。` : '做错的题已加入错题本。提示后练对会保留记录，不冒充掌握。', art: 'notebook', tone: 'blue', actions: [{ id: 'navigate', value: 'home', label: '回到今日', tone: 'primary' }] }
    screen.metrics = [{ label: '本组题量', value: String(s.questionIds.length) }, { label: '首次独立正确', value: `${correct} 题` }, { label: '已完成自评', value: `${self.length} 题` }]
    if (s.mode === 'exam') {
      const objective = s.questionIds.map(id => questionById(this.catalog, this.state, id)).filter((q): q is Question => !!q && !['writing', 'speaking'].includes(q.kind))
      const score = objective.reduce((sum, q) => sum + (s.answers[q.id]?.result?.score ?? 0), 0), max = objective.reduce((sum, q) => sum + (s.examMarks?.[q.id] ?? q.marks), 0)
      screen.metrics.unshift({ label: '客观题本次得分', value: `${score} / ${max}` })
      screen.notice = '客观题按本次作答计分；写作与口语交卷后单独自查，不合并成机器测评分。'
    }
    screen.cards = s.questionIds.map((id, i) => { const q = questionById(this.catalog, this.state, id), record = s.answers[id]; return { id, title: `第 ${i + 1} 题`, text: q ? answerText(q, record?.answer ?? '') : '题目暂时未加载', tag: record?.result ? record.result.evidence === 'self_review' ? '自评记录' : record.result.correct ? '本次练对' : '需要再练' : '待自查', actions: [{ id: 'review-question', value: String(i), label: '看题目与解析', tone: 'quiet' }] } })
    return screen
  }
}
