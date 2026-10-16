export type Grade = 6 | 7 | 8 | 9
export type Term = 'upper' | 'lower'
export type SchoolStructure = '63' | '54'
export type Verification = 'official' | 'reported' | 'unverified'
export type Skill = 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing'
export type QuestionKind = 'choice' | 'blank' | 'order' | 'correction' | 'writing' | 'speaking'
export type ErrorReason = 'vocabulary' | 'grammar' | 'evidence' | 'misread' | 'expression' | 'careless' | 'unclassified'
export type Evidence = 'independent' | 'assisted' | 'self_review'

export interface LearnerProfile {
  cityId: string
  structure: SchoolStructure
  grade: Grade
  term: Term
  editionId: string
  schoolYear: number
  examDate?: string
  dailyMinutes: number
  createdAt: number
}

export interface City { id: string; name: string; province: string; stream: string }
export interface Edition {
  id: string
  name: string
  version: string
  structures: SchoolStructure[]
  spelling: 'american' | 'british'
  verification: Verification
  sourceIds: string[]
}
export interface BookMapping {
  editionId: string
  grade: Grade
  term: Term
  units: { id: string; title: string; topicIds: string[]; verification: Verification; sourceIds: string[] }[]
  verification: Verification
  sourceIds: string[]
}
export interface ExamBlueprint {
  id: string
  cityId: string
  examYear: number
  structures: SchoolStructure[]
  minutes: number
  totalMarks: number
  sections: { id: string; title: string; skill: Skill; count: number; marksEach: number }[]
  verification: Verification
  sourceIds: string[]
}

export interface Topic {
  id: string
  title: string
  skill: Skill
  grades: Grade[]
  goal: string
  commonError: string
  prerequisites: string[]
  order: number
}

export interface ExplanationVisual {
  kind: 'sentence' | 'timeline' | 'evidence' | 'comparison' | 'paragraph'
  title: string
  segments: { text: string; role: 'subject' | 'verb' | 'object' | 'time' | 'evidence' | 'neutral'; note?: string }[]
  caption: string
}
export interface Explanation {
  strategy: string
  steps: { text: string; reason: string }[]
  distractors: { option: string; reason: string }[]
  pitfall: string
  visual: ExplanationVisual
  transfer: string
}
export interface RubricPoint { id: string; label: string; marks: number; guidance: string }
export interface Question {
  id: string
  topicId: string
  skill: Skill
  kind: QuestionKind
  difficulty: 1 | 2 | 3
  grades: Grade[]
  stem: string
  passage?: string
  feedbackGroup?: string
  prompt?: string
  options?: { id: string; text: string }[]
  tokens?: { id: string; text: string }[]
  answer: { accepted?: string[]; option?: string; order?: string[]; display: string; caseSensitive?: boolean }
  explanation: Explanation
  marks: number
  estimatedSeconds: number
  rubric?: RubricPoint[]
  mediaId?: string
  source: { kind: 'original' | 'licensed'; author: string; license?: string }
  review: 'draft' | 'reviewed' | 'released'
}
export interface Lesson {
  id: string
  topicId: string
  title: string
  grades: Grade[]
  objective: string
  questionIds: string[]
  delayedQuestionIds: string[]
  summary: string[]
  estimatedMinutes: number
  order: number
  review: 'draft' | 'reviewed' | 'released'
}
export interface VocabularyItem {
  id: string
  word: string
  meaning: string
  example: string
  exampleMeaning: string
  topicId: string
  grade: Grade
  spelling: 'american' | 'british' | 'shared'
  acceptedSpellings: string[]
  explanation: string
  mediaId?: string
}
export interface MediaAsset {
  id: string
  path: string
  transcript: string
  voice: string
  model: string
  license: string
  sha256: string
  approvedByOwner: boolean
}
export type QuestionMetadata = Pick<Question, 'id' | 'topicId' | 'skill' | 'kind' | 'difficulty' | 'grades' | 'marks' | 'estimatedSeconds' | 'mediaId' | 'review'>
export interface ContentCatalog {
  version: number
  topics: Topic[]
  lessons: Lesson[]
  questions: Question[]
  questionIndex?: QuestionMetadata[]
  vocabulary: VocabularyItem[]
  media: MediaAsset[]
  cities: City[]
  editions: Edition[]
  books: BookMapping[]
  blueprints: ExamBlueprint[]
}

export interface Attempt {
  id: string
  questionId: string
  topicId: string
  skill: Skill
  answer: string
  correct: boolean
  score: number
  maxScore: number
  evidence: Evidence
  firstTry: boolean
  delayed: boolean
  at: number
  seconds: number
  sessionId: string
}
export interface TopicMastery { topicId: string; score: number; attempts: number; lastAt: number; retainedAt?: number }
export interface Mistake {
  questionId: string
  addedAt: number
  reason: ErrorReason
  stage: number
  dueAt: number
  streak: number
  cleared: boolean
  history: { at: number; correct: boolean; scheduled: boolean }[]
}
export interface WordReview {
  wordId: string
  stage: number
  dueAt: number
  lastAt: number
  independentCorrect: number
  lapses: number
}
export interface AnswerRecord { answer: string; hints: number; attempts: number; checked: boolean; audioPlayed?: boolean; result?: Attempt }
export interface LearningSession {
  id: string
  mode: 'lesson' | 'practice' | 'mistakes' | 'review' | 'exam'
  questionIds: string[]
  lessonId?: string
  blueprintId?: string
  examMarks?: Record<string, number>
  startedAt: number
  deadlineAt?: number
  current: number
  answers: Record<string, AnswerRecord>
  submittedAt?: number
  reviewStage?: number
  seed: number
}
export interface WritingDraft { questionId: string; text: string; updatedAt: number; checkedRubricIds: string[] }
export interface PrivateQuestion extends Question { private: true; createdAt: number; updatedAt: number }
export interface Recording { id: string; questionId: string; path: string; createdAt: number; durationMs: number }
export interface LearnerState {
  schemaVersion: 1
  profile: LearnerProfile | null
  attempts: Attempt[]
  answerSeenAt?: Record<string, number>
  mastery: Record<string, TopicMastery>
  mistakes: Record<string, Mistake>
  words: Record<string, WordReview>
  lessonDoneAt: Record<string, number>
  lessonReviews: Record<string, number[]>
  favorites: string[]
  sessions: Record<string, LearningSession>
  activeSessionId: string | null
  writing: Record<string, WritingDraft>
  privateQuestions: PrivateQuestion[]
  recordings: Recording[]
  updatedAt: number
}
export interface QuestionFilter {
  topicIds?: string[]
  skills?: Skill[]
  kinds?: QuestionKind[]
  difficulties?: number[]
  count: number
  minutes?: number
}
