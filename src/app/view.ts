import type { Explanation, QuestionKind } from '../core/types'

export interface Action { id: string; label: string; value?: string; tone?: 'primary' | 'secondary' | 'quiet' | 'danger'; disabled?: boolean }
export interface Card { id: string; title: string; text: string; label?: string; tag?: string; character?: string; tone?: string; actions: Action[]; progress?: number }
export interface Field { name: string; label: string; value: string; kind: 'input' | 'textarea' | 'select' | 'date'; placeholder?: string; help?: string; options?: { value: string; label: string }[]; selectedIndex?: number; maxLength?: number; numeric?: boolean }
export interface QuestionView {
  id: string; stem: string; passage?: string; kind: QuestionKind; value: string; checked: boolean
  options: { id: string; text: string; selected: boolean; state: string }[]
  tokens: { id: string; text: string; selected: boolean }[]
  orderedTokens: { id: string; text: string }[]
  hint?: string; feedback?: string; explanation?: Explanation; modelAnswer?: string; selfReview: boolean
  rubric: { id: string; label: string; guidance: string; marks: number; selected: boolean }[]
  answerLocked: boolean; audioAvailable: boolean; recordingAvailable: boolean; recording: boolean; recordingSaved: boolean; words: number
}
export interface Screen {
  id: string; title: string; subtitle?: string; eyebrow?: string; back: boolean; busy: boolean; notice?: string; error?: string
  hero?: { title: string; text: string; eyebrow: string; art: string; tone: string; actions: Action[] }
  metrics: { label: string; value: string }[]
  fields: Field[]; cards: Card[]; actions: Action[]
  sections?: { title: string; text: string }[]
  question?: QuestionView
  progress?: { label: string; current: number; total: number; percent: number }
  word?: { audioAvailable: boolean; mediaId?: string; id: string; word: string; meaning: string; example: string; exampleMeaning: string; revealed: boolean; answer: string; feedback: string; correct: boolean | null; explanation: string }
  week?: { label: string; active: boolean }[]
  chips?: { id: string; label: string; selected: boolean; action: string; value: string }[]
  tabs: { id: string; label: string; character: string; selected: boolean }[]
}
export const ROOT_SCREENS = ['home', 'learn', 'practice', 'mistakes', 'profile']
export const SCREEN_TITLES: Record<string, string> = { listening: '听力练习', history: '练习记录', favorites: '我的收藏', home: '今日', learn: '课程', practice: '专项练习', mistakes: '错题本', profile: '我的', onboarding: '先认识你的学习情况', session: '练习', result: '练习结果', vocabulary: '单词复习', builder: '自由组题', exam: '限时练习', writing: '写作练习', speaking: '口语练习', private: '我的题目', editor: '编辑题目', settings: '学习设置', report: '学习报告', 'exam-info': '我的中考', sources: '资料与核验', privacy: '隐私与数据', recordings: '我的录音' }
