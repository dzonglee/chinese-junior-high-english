import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
export function authorReadingTasks(root, catalog) {
  const records = JSON.parse(readFileSync(resolve(root, 'content/reading-tasks.json'), 'utf8')), source = { kind: 'original', author: 'Chinese Junior-High English project authors' }
  for (const [type, texts] of Object.entries(records)) {
    const restoration = type === 'restoration', id = restoration ? 'r-restoration' : 'r-short-answers', title = restoration ? '句子还原：看前后照应' : '任务型阅读：按要求提取信息', grades = restoration ? [8, 9] : [7, 8, 9], sets = []
    catalog.topics.push({ id, title, skill: 'reading', grades, goal: restoration ? '结合指代、逻辑和段落功能，把句子放到合适的位置。' : '先定位原文，再按题目要求控制答案的词数和词形。', commonError: restoration ? '只看一个重复词，没有读空格前后的完整意思。' : '找对了线索，却没有按题目要求填写单词。', prerequisites: [], order: restoration ? 106 : 105 })
    for (const [t, text] of texts.entries()) {
      const ids = [], items = restoration ? text.options.slice(0, 5).map((correct, i) => {
        const paragraph = text.text.split('\n').find(line => line.includes(`[[${i + 1}]]`))
        const context = paragraph.replace(/\[\[(\d+)\]\]/g, (_, number) => Number(number) === i + 1 ? '[本空]' : `[第 ${number} 空]`)
        return [`第 ${i + 1} 个空格应该放哪一句？有两个选项多余。`, correct, context, text.reasons[i]]
      }) : text.items
      for (const [i, [stem, answer, evidence, reason]] of items.entries()) {
        const qid = `q-${id}-${t + 1}-${i + 1}`; ids.push(qid)
        const options = restoration ? (t ? [4, 2, 5, 0, 6, 1, 3] : [3, 6, 1, 5, 0, 4, 2]).map((original, n) => ({ id: String.fromCharCode(97 + n), text: text.options[original] })) : undefined
        catalog.questions.push({ id: qid, topicId: id, skill: 'reading', kind: restoration ? 'choice' : 'blank', difficulty: restoration ? 3 : 2, grades, stem, passage: text.text.replace(/\[\[(\d+)\]\]/g, '[$1]_____'), ...(options ? { options, feedbackGroup: `${id}-${t + 1}` } : {}), answer: restoration ? { option: options.find(o => o.text === answer).id, display: answer } : { accepted: [answer], display: answer }, marks: 2, estimatedSeconds: 90, source, review: 'draft', explanation: { strategy: restoration ? '先读空格前后，再判断需要补充、提问、转折还是解释。' : '先定位题目问的信息，再检查词数与单复数要求。', steps: [{ text: `关键线索：“${evidence}”`, reason }, { text: `按题目要求填入：${answer}`, reason: restoration ? '把整段连起来读，检查句子指代和逻辑是否完整。' : '答案来自原文，并符合一个单词及相应词形的要求。' }], distractors: restoration ? options.filter(o => o.text !== answer).map(o => ({ option: o.id, reason: `${text.reasons[text.options.indexOf(o.text)]}本空需要的是：${text.reasons[i]}` })) : [], pitfall: restoration ? '七个选项中只有五个需要使用；不要因为一句话通顺就忽略段落衔接。' : '没有按题目要求控制答案范围，即使理解了文章也可能答不准确。', visual: { kind: 'evidence', title: restoration ? '前后文 → 句子功能' : '原文信息 → 答题要求', segments: [{ text: evidence, role: 'evidence', note: '定位后的关键内容' }, { text: reason, role: 'neutral', note: '它为什么回答本题' }], caption: restoration ? '同时检查空格前后，不能只凭一个词猜位置。' : '定位与表达都要检查。' }, transfer: restoration ? '说出相邻两句话如何衔接，再判断是否能交换位置。' : '把题目中的词数要求划出来，再用原文核对答案。' } })
      }
      sets.push(ids)
    }
    catalog.lessons.push({ id: `l-${id}`, topicId: id, title, grades, objective: restoration ? '看清句子的功能与前后照应，不只匹配相同单词。' : '用原文依据作答，同时遵守词数与词形要求。', questionIds: sets[0], delayedQuestionIds: sets[1], summary: ['先独立定位，再看解析核对依据。', '另一篇新短文用于延时复习。'], estimatedMinutes: 12, order: 1, review: 'draft' })
  }
}
