import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { authorReadingTasks } from './author-reading-tasks.mjs'
import { attachCourse } from './course-plan.mjs'
import { authorExtra } from './author-extra.mjs'

const read = (root, path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const source = { kind: 'original', author: 'Chinese Junior-High English project authors' }
const gradesFrom = (minimum) => [6, 7, 8, 9].filter((grade) => grade >= minimum)

function authoredResponse(id, kind, response, correct) {
  if (kind !== 'blank' && kind !== 'correction') return undefined
  // A multiple-choice key alone cannot define an unambiguous free response.
  if (!response || typeof response.instruction !== 'string' || !response.instruction.trim()) {
    throw new Error(`${id}: ${kind} needs an authored instruction with its lexical, meaning or construction cue`)
  }
  if (!Array.isArray(response.accepted) || !response.accepted.length ||
      response.accepted.some(value => typeof value !== 'string' || !value.trim() || value !== value.trim()) ||
      !response.accepted.includes(correct)) {
    throw new Error(`${id}: ${kind} needs explicit accepted answers including its primary answer`)
  }
  const normalized = response.accepted.map(value => value.toLocaleLowerCase('en').replace(/[‘’]/g, "'").replace(/\s+/g, ' '))
  if (new Set(normalized).size !== normalized.length) throw new Error(`${id}: duplicate accepted grammar answers`)
  return { instruction: response.instruction.trim(), accepted: [...response.accepted] }
}

export function authorCatalog(root) {
  const topics = [], lessons = [], questions = [], vocabulary = [], media = []
  for (const [topicNumber, record] of [...read(root, 'content/grammar.json'), ...read(root, 'content/course-grammar.json')].entries()) {
    const grades = gradesFrom(record.minGrade)
    const topic = { id: record.id, title: record.title, skill: 'grammar', grades, goal: record.rule, commonError: record.pitfall, prerequisites: [], order: topicNumber + 1 }
    topics.push(topic)
    const ids = []
    for (const [i, [sentence, correct, wrong1, wrong2, reason, response]] of record.cases.entries()) {
      const id = `q-${record.id}-${String(i + 1).padStart(3, '0')}`
      ids.push(id)
      const parts = sentence.split('[[1]]')
      const [prefix, suffix] = parts
      if (parts.length !== 2) throw new Error(`${id}: authored sentence needs exactly one target`)
      const completed = `${prefix}${correct}${suffix}`
      const kind = ['choice', 'blank', 'correction', 'order'][i % 4]
      const freeResponse = authoredResponse(id, kind, response, correct)
      const options = [correct, wrong1, wrong2].map((_, n, list) => ({ id: ['a', 'b', 'c'][n], text: list[(n + i) % 3] }))
      const right = options.find((option) => option.text === correct).id
      const tokens = [{ id: 'start', text: prefix.trim() }, { id: 'target', text: correct }, { id: 'end', text: suffix.trim() }].filter((t) => t.text)
      const stem = kind === 'order' ? '把词块排成完整句子。先找到主语，再确定其余部分的位置。' :
        kind === 'correction' ? `${freeResponse.instruction}\n${prefix}（${wrong1}）${suffix}` :
        kind === 'blank' ? `${freeResponse.instruction}\n${sentence.replace('[[1]]', '_____')}` : `${response?.instruction ? response.instruction + '\n' : ''}${sentence.replace('[[1]]', '_____')}`
      const answer = kind === 'choice' ? { option: right, display: completed, ...(record.caseSensitive ? { caseSensitive: true } : {}) } : kind === 'order' ? { order: tokens.map((t) => t.id), display: completed } : { accepted: freeResponse.accepted, display: correct, ...(record.caseSensitive ? { caseSensitive: true } : {}) }
      const alternatives = freeResponse?.accepted.filter(value => value !== correct) ?? []
      const alternativeNote = alternatives.length ? `本题也接受：${alternatives.join('、')}。` : ''
      questions.push({ id, topicId: record.id, skill: 'grammar', kind, difficulty: i % 3 === 2 ? 2 : 1, grades, stem,
        ...(kind === 'choice' ? { options } : {}), ...(kind === 'order' ? { tokens: [...tokens.slice(1), tokens[0]] } : {}), answer, marks: 1, estimatedSeconds: kind === 'order' ? 60 : 35,
        explanation: { strategy: `先判断句子的线索，再用这条规则检查：${record.rule}`,
          steps: [{ text: reason, reason: freeResponse ? '先按题目要求确定词语或含义，再检查主语、时间和句子结构。' : '根据本句的主语、时间或限定范围判断，不能只凭某个词眼熟。' }, { text: `${alternatives.length ? '一种正确写法' : '放回原句检查'}：${completed}`, reason: `${alternativeNote}${record.rule}` }],
          distractors: kind === 'choice' ? options.filter((o) => o.id !== right).map((o) => ({ option: o.id, reason: `本句不能用“${o.text}”：${reason}这里需要的是“${correct}”。` })) : [],
          pitfall: record.pitfall, visual: { kind: 'sentence', title: '把线索与目标表达连起来', segments: [{ text: prefix.trim() || '先看句意', role: 'neutral', note: '先读完整的语境' }, { text: correct, role: 'evidence', note: alternatives.length ? '一种可用的表达' : '符合本题要求的表达' }, { text: suffix.trim() || '句子完整', role: 'neutral', note: '放回原句再检查' }], caption: reason },
          transfer: '换一个主语或时间线索，这里的表达还需要变化吗？说清理由。' }, source, review: 'draft' })
    }
    lessons.push({ id: `l-${record.id}`, topicId: record.id, title: record.title, grades, objective: record.rule, questionIds: ids.slice(0, record.cases.length >= 12 ? 8 : 4), delayedQuestionIds: ids.slice(record.cases.length >= 12 ? 8 : 4), summary: [record.rule, record.pitfall, '提示后做对是练习成果，隔几天独立做对才是保留的证据。'], estimatedMinutes: 10, order: 1, review: 'draft' })
  }
  authorExtra(root, { topics, lessons, questions, vocabulary, media })
  authorReadingTasks(root, { topics, lessons, questions, vocabulary, media })
  const roster = read(root, 'reference/source-register/cities/roster.json')
  const cities = roster.cities.map((city) => {
    const [province, name] = city.city_id.split('-')
    return { id: city.city_id, province, name: city.city_name ?? city.city ?? name, stream: city.stream ?? city.unit ?? '' }
  })
  const editions = [
    ['pep-2024', '人教版', '2024 新教材', 'american', '63'], ['pep-legacy', '人教 Go for it!', '旧版（2012 起审定）', 'american', '63'],
    ['fltrp-2024', '外研版', '2024 新教材', 'british', '63'], ['fltrp-legacy', '外研新标准', '旧版', 'british', '63'],
    ['shep-2024', '沪教牛津版', '2024 新教材', 'british', '63'], ['shep-legacy', '沪教牛津版', '旧版', 'british', '63'],
    ['yilin-2024', '译林版', '2024 新教材', 'british', '63'], ['yilin-legacy', '译林牛津版', '旧版', 'british', '63'],
    ['bnu-2024', '北师大版', '2024 新教材', 'british', '63'], ['bnu-legacy', '北师大版', '旧版', 'british', '63'],
    ['renai', '仁爱科普版', '请按封面确认', 'british', '63'], ['jijiao', '冀教版', '请按封面确认', 'british', '63'],
    ['lujiao-54', '鲁教五四版', '请按封面确认', 'british', '54'], ['pep-54', '人教五四版', '请按封面确认', 'american', '54'],
    ['shep-54', '沪教牛津五四制', '请按封面确认', 'british', '54'], ['beijing', '北京版', '请按封面确认', 'british', '63'],
    ['xiangjiao', '湘教版', '请按封面确认', 'british', '63'],
  ].map(([id, name, version, spelling, structure]) => ({ id, name, version, spelling, structures: [structure], verification: 'unverified', sourceIds: [] }))
  return attachCourse(root, { version: 2, topics, lessons, questions, vocabulary, media, cities, editions, books: [], blueprints: [] })
}
