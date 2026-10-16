import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
export function authorPronunciation(root, catalog) {
  const source = { kind: 'original', author: 'Chinese Junior-High English project authors' }
  for (const [n, record] of JSON.parse(readFileSync(resolve(root, 'content/course-pronunciation.json'), 'utf8')).entries()) {
    const grades = [6, 7, 8, 9].filter(g => g >= record.minGrade), ids = []
    catalog.topics.push({ id: record.id, title: record.title, skill: 'speaking', grades, goal: record.goal, commonError: record.pitfall, prerequisites: [], order: 130 + n })
    for (const [i, [stem, correct, wrong1, wrong2, reason, why1, why2]] of record.cases.entries()) {
      const id = `q-${record.id}-${i + 1}`; ids.push(id)
      const values = [correct, wrong1, wrong2], options = values.map((_, k) => ({ id: ['a', 'b', 'c'][k], text: values[(k + i) % 3] })), right = options.find(o => o.text === correct).id
      catalog.questions.push({ id, topicId: record.id, skill: 'speaking', kind: 'choice', grades, difficulty: 1, stem, options, answer: { option: right, display: correct }, marks: 1, estimatedSeconds: 50, source, review: 'draft', explanation: { strategy: record.goal, steps: [{ text: correct, reason }, { text: '把这个判断与题目中的具体词、重音或交流意图对应。', reason: '本题检验书面发音知识，不把它当成听力辨音或真实发音评测。' }], distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: o.text === wrong1 ? why1 : why2 })), pitfall: record.pitfall, visual: { kind: 'comparison', title: '书面线索与发音知识', segments: [{ text: stem, role: 'neutral', note: '看清具体词或交流目标' }, { text: correct, role: 'evidence', note: reason }], caption: '这是发音知识的文字示意；示范声音和实际口语还需另行练习。' }, transfer: '找到含同一现象的另一个常见词或短句，用可靠词典示范核对，再尝试录音回听。' } })
    }
    catalog.lessons.push({ id: `l-${record.id}`, topicId: record.id, title: record.title, grades, objective: record.goal, questionIds: ids.slice(0, 4), delayedQuestionIds: ids.slice(4), summary: [record.goal, record.pitfall], estimatedMinutes: 8, order: 1, review: 'draft' })
  }
}
