import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
const read = (root, file) => JSON.parse(readFileSync(resolve(root, file), 'utf8'))
const optional = (root, file) => existsSync(resolve(root, file)) ? read(root, file) : []
const source = { kind: 'original', author: 'Chinese Junior-High English project authors' }
export function authorExpressions(root, catalog) {
  const extensions = optional(root, 'content/course-expression-extensions.json')
  const records = [...read(root, 'content/expression.json'), ...optional(root, 'content/course-expression.json')]
  for (const [index, record] of records.entries()) {
    const grades = [6, 7, 8, 9].filter(g => g >= record.minGrade), writing = record.skill === 'writing', readingAloud = record.id === 's-read-aloud'
    const extension = extensions.find(r => r.id === record.id)
    const cases = record.cases ?? (extension ? [...extension.planning, { ...record, legacyPrimary: true }, ...extension.delayed] : [{ ...record, legacyPrimary: true }])
    const goal = record.goal ?? record.points, pitfall = extension?.pitfall ?? record.pitfall
    catalog.topics.push({ id: record.id, title: record.title, skill: record.skill, grades, goal, commonError: pitfall, prerequisites: [], order: 150 + index })
    const ids = []
    for (const [i, task] of cases.entries()) {
      const id = task.legacyPrimary ? `q-${record.id}` : `q-${record.id}-stage-${i + 1}`
      ids.push(id)
      if (task.options) {
        const options = task.options.map((_, k) => ({ id: ['a', 'b', 'c'][k], text: task.options[(k + i) % 3] })), correct = task.options[0], right = options.find(o => o.text === correct).id
        catalog.questions.push({ id, topicId: record.id, skill: record.skill, kind: 'choice', grades, difficulty: 1, stem: task.stem, options, answer: { option: right, display: correct }, marks: 1, estimatedSeconds: 45, source, review: 'draft', explanation: { strategy: '先判断沟通目的和对象，再选能完成这一步任务的表达。', steps: [{ text: correct, reason: task.reason }, { text: task.reason, reason: '选择要回到题目列出的对象、目的和具体信息。' }], distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: task.reasons[task.options.indexOf(o.text) - 1] })), pitfall, visual: { kind: 'comparison', title: '沟通目标与表达相匹配', segments: [{ text: task.stem, role: 'neutral', note: '这一步要完成什么' }, { text: correct, role: 'evidence', note: task.reason }], caption: task.reason }, transfer: '换一个对象，想一想这句话的语气或信息还需要怎样调整。' } })
        continue
      }
      const marks = writing ? 10 : 6
      catalog.questions.push({ id, topicId: record.id, skill: record.skill, kind: record.skill, grades, difficulty: record.minGrade >= 9 ? 3 : 2, stem: task.stem, ...(task.passage ? { passage: task.passage } : {}), ...(task.audioTaskId ? { mediaId: `audio-${task.audioTaskId}` } : {}), answer: { display: task.model }, marks, estimatedSeconds: writing ? i === 3 || i === 5 ? 600 : 180 : 90, source, review: 'draft',
        rubric: writing ? [{ id: 'content', label: '任务信息完整', marks: 4, guidance: task.points }, { id: 'structure', label: '顺序清楚，衔接自然', marks: 3, guidance: '开头说明意图；各层意思有顺序，不机械堆连接词。' }, { id: 'language', label: '句子通顺，细节已检查', marks: 3, guidance: '逐句检查主谓、时态、拼写与标点。字数按任务自查。' }] : [{ id: 'content', label: '关键内容说清楚', marks: 2, guidance: task.points }, { id: 'organisation', label: '有顺序，听得懂', marks: 2, guidance: '回听时能跟上各层意思；适当停顿，不要求固定口音。' }, { id: 'expression', label: readingAloud ? '原文词句完整，读音清楚' : '句子基本完整', marks: 2, guidance: readingAloud ? '保持给定词句，回听检查漏词、关键信息与发音清晰度。' : '能用自己的句子表达；回听时检查明显的时态和用词问题。' }],
        explanation: { strategy: task.strategy, steps: [{ text: `先列任务要点：${task.points}。`, reason: readingAloud ? '先理解关键信息，再按给定词句朗读，不自行改写。' : '先让对方获得题目所需的信息，再调整语言形式。' }, { text: `${readingAloud ? '原文练习线索' : '参考组织线索'}：${task.evidence}。`, reason: readingAloud ? '按完整意群练习，保持给定词句；练习斜线不是新的台词。' : '参考表达只是一种可行写法，不是逐字评分答案。' }], distractors: [], pitfall: task.pitfall ?? record.pitfall, visual: { kind: 'paragraph', title: '要点 → 组织 → 检查', segments: [{ text: task.points, role: 'evidence', note: '本题的信息要求' }, { text: task.evidence, role: 'neutral', note: readingAloud ? '保持完整意群，读清关键信息' : '把各层意思接起来' }, { text: writing ? '主谓、时态、拼写、标点' : '表达是否完整、停顿是否自然', role: 'verb', note: '独立表达后再自查' }], caption: '这些是原创练习自查要点，不代表官方评分或机器口语测评。' }, transfer: '换一个情境，用同样的方法完成沟通任务。' } })
    }
    if (ids.length >= 6) catalog.lessons.push({ id: `l-${record.id}`, topicId: record.id, title: record.title, grades, objective: goal, questionIds: ids.slice(0, 4), delayedQuestionIds: ids.slice(4), summary: [goal, pitfall, '先独立表达，再看参考与要点；自评分与独立客观题分开。'], estimatedMinutes: writing ? 18 : 12, order: 1, review: 'draft' })
  }
}
