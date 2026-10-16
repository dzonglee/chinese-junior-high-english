import type { Grade, LearnerProfile, SchoolStructure, Term } from './types'

/** School dates are mainland China dates, independent of the device's time zone. */
export function chinaDate(now: number): { year: number; month: number; day: number; key: string } {
  const date = new Date(now + 8 * 60 * 60 * 1000)
  const year = date.getUTCFullYear(), month = date.getUTCMonth() + 1, day = date.getUTCDate()
  return { year, month, day, key: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` }
}
export function currentSchoolYear(now: number): number {
  const { year, month } = chinaDate(now)
  return month >= 9 ? year : year - 1
}
export function currentTerm(now: number): Term {
  const { month } = chinaDate(now)
  return month >= 9 || month === 1 ? 'upper' : 'lower'
}
export function gradesFor(structure: SchoolStructure): Grade[] { return structure === '54' ? [6, 7, 8, 9] : [7, 8, 9] }
export function localGradeLabel(grade: Grade, structure: SchoolStructure, cityId: string): string {
  if (structure === '63' || cityId.startsWith('上海')) return grade === 6 ? '预备' : ['初一', '初二', '初三'][grade - 7] ?? `${grade}年级`
  return ['初一', '初二', '初三', '初四'][grade - 6] ?? `${grade}年级`
}
export function examYear(profile: LearnerProfile): number { return profile.schoolYear + 10 - profile.grade }
export function bookLabel(grade: Grade, term: Term): string { return `${['', '', '', '', '', '', '六', '七', '八', '九'][grade]}年级${term === 'upper' ? '上' : '下'}册` }
export function daysToConfirmedExam(profile: LearnerProfile, now: number): number | null {
  if (!profile.examDate || !/^\d{4}-\d{2}-\d{2}$/.test(profile.examDate)) return null
  const target = Date.parse(`${profile.examDate}T00:00:00+08:00`)
  if (!Number.isFinite(target)) return null
  const today = Date.parse(`${chinaDate(now).key}T00:00:00+08:00`)
  return Math.max(0, Math.round((target - today) / 86_400_000))
}
