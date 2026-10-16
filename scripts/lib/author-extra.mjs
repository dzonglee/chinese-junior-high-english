import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
const read = (root, path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const source = { kind: 'original', author: 'Chinese Junior-High English project authors' }
const gradesFrom = minimum => [6, 7, 8, 9].filter(g => g >= minimum)
export function authorExtra(root, catalog) {
  const { topics, lessons, questions, vocabulary } = catalog
  for (const [n, record] of read(root, 'content/reading.json').entries()) {
    const grades = gradesFrom(record.minGrade)
    topics.push({ id: record.id, title: record.title, skill: 'reading', grades, goal: record.goal, commonError: record.pitfall, prerequisites: [], order: 100 + n })
    const sets = []
    for (const [textIndex, text] of record.texts.entries()) {
      const ids = []
      for (const [i, [stem, correct, wrong1, wrong2, evidence, why1, why2]] of text.items.entries()) {
        const id = `q-${record.id}-${textIndex + 1}-${i + 1}`, raw = [correct, wrong1, wrong2]
        const options = raw.map((_, j) => ({ id: ['a', 'b', 'c'][j], text: raw[(j + i) % 3] }))
        const right = options.find(o => o.text === correct).id
        ids.push(id)
        questions.push({ id, topicId: record.id, skill: 'reading', kind: 'choice', difficulty: n > 0 ? 2 : 1, grades, stem, passage: text.text, options, answer: { option: right, display: correct }, marks: 2, estimatedSeconds: 90, source, review: 'draft',
          explanation: { strategy: record.goal, steps: [{ text: `定位原文：“${evidence}”`, reason: '这一处直接提供回答问题所需的信息或推断依据。' }, { text: `核对选项：“${correct}”。`, reason: n === 0 ? '它与原文中的人物、时间或行为一致，没有偷换对象。' : '把这处线索放回全文，答案没有扩大原文可以支持的范围。' }],
            distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: o.text === wrong1 ? why1 : why2 })), pitfall: record.pitfall,
            visual: { kind: 'evidence', title: '原文证据 → 答案', segments: [{ text: evidence, role: 'evidence', note: '先读这处线索' }, { text: correct, role: 'object', note: '与问题相对应的意思' }], caption: '核对线索表达的事实与选项表达的意思，不能只匹配重复的词。' }, transfer: '遮住选项，用自己的话回答这个问题，再回到原文检查。' } })
      }
      sets.push(ids)
    }
    lessons.push({ id: `l-${record.id}`, topicId: record.id, title: record.title, grades, objective: record.goal, questionIds: sets[0], delayedQuestionIds: sets[1], summary: [record.goal, record.pitfall], estimatedMinutes: 12, order: 1, review: 'draft' })
  }
  {
    const id = 'r-cloze', grades = [7, 8, 9], sets = []
    topics.push({ id, title: '完形填空：读懂前后关系', skill: 'reading', grades, goal: '先把全文读通，再用前后线索核对词义与逻辑。', commonError: '只盯着空格前后的一个词，忽略全文的变化与因果。', prerequisites: [], order: 104 })
    for (const [t, text] of read(root, 'content/cloze.json').entries()) {
      const ids = []
      for (const [i, [correct, wrong1, wrong2, reason, why1, why2]] of text.items.entries()) {
        const qid = `q-r-cloze-${t + 1}-${i + 1}`, raw = [correct, wrong1, wrong2]
        const options = raw.map((_, n) => ({ id: ['a', 'b', 'c'][n], text: raw[(n + i) % 3] })), right = options.find(o => o.text === correct).id
        const passage = text.text.replace(/\[\[(\d+)\]\]/g, (_, n) => Number(n) === i + 1 ? '_____' : text.items[Number(n) - 1][0]); ids.push(qid)
        questions.push({ id: qid, topicId: id, skill: 'reading', kind: 'choice', grades, difficulty: 2, stem: `读短文，选择最符合上下文的表达。${text.title}`, passage, options, answer: { option: right, display: correct }, marks: 1, estimatedSeconds: 80, source, review: 'draft', explanation: { strategy: '先读通全文，再判断空格在语意和逻辑上承担什么作用。', steps: [{ text: reason, reason: '这个判断需要结合前后句，而不只是看单个词能否搭配。' }, { text: `填入 ${correct} 后再读本段。`, reason: '正确选项应与全文的时间、人物行动和前后逻辑同时一致。' }], distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: o.text === wrong1 ? why1 : why2 })), pitfall: '一个表达语法上能放进去，不代表它符合这篇短文的意思。', visual: { kind: 'evidence', title: '上下文决定选择', segments: [{ text: correct, role: 'evidence', note: '本空的表达' }, { text: reason, role: 'neutral', note: '前后文的支持' }], caption: '把选项与上下文的关系说清楚，再检查语法。' }, transfer: '遮住选项，用中文说出这里应承接什么含义，再看哪个英文表达吻合。' } })
      }
      sets.push(ids)
    }
    lessons.push({ id: 'l-r-cloze', topicId: id, title: '完形填空：读懂前后关系', grades, objective: '用上下文检查每个表达，不凭眼熟选答案。', questionIds: sets[0], delayedQuestionIds: sets[1], summary: ['先读全文，再选表达。', '每个答案都要说出上下文依据。'], estimatedMinutes: 12, order: 1, review: 'draft' })
  }
  for (const [t, r] of read(root, 'content/listening.json').entries()) {
    const grades = gradesFrom(r.minGrade), ids = []
    topics.push({ id: r.id, title: r.title, skill: 'listening', grades, goal: r.goal, commonError: '听到过的信息未必是最终答案，要留意改口与回应。', prerequisites: [], order: 120 + t })
    const assets = existsSync(resolve(root, 'content/audio-manifest.json')) ? read(root, 'content/audio-manifest.json') : []
    for (const [i, task] of r.cases.entries()) {
      const id = `q-${r.id}-${task.id}`, mediaId = `audio-${task.id}`, right = ['a', 'b', 'c'][(3 - i % 3) % 3]
      const options = task.options.map((_, n) => ({ id: ['a', 'b', 'c'][n], text: task.options[(n + i) % 3] }))
      const asset = assets.find(a => a.id === mediaId)
      catalog.media.push(asset ?? { id: mediaId, path: '', transcript: task.transcript, voice: '', model: '', license: '', sha256: '', approvedByOwner: false })
      ids.push(id)
      questions.push({ id, topicId: r.id, skill: 'listening', kind: 'choice', difficulty: t ? 2 : 1, grades, stem: task.stem, passage: task.transcript, mediaId, options, answer: { option: right, display: task.options[0] }, marks: 1, estimatedSeconds: 70, source, review: 'draft', explanation: { strategy: r.goal, steps: [{ text: `先定位关键话语：“${task.evidence}”`, reason: '这句话给出请求、最终决定或说话人的意图。' }, { text: `结合回应，答案是 ${task.options[0]}。`, reason: '不能只按录音中第一个出现的数字、地点或建议作答。' }], distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: task.reasons[task.options.indexOf(o.text) - 1] })), pitfall: '先确认题目问的是最初提议、当前安排还是说话意图。', visual: { kind: 'evidence', title: '听力中的关键证据', segments: [{ text: task.evidence, role: 'evidence', note: '这句话决定判断' }, { text: task.options[0], role: 'object', note: '与问题对应的含义' }], caption: '听完后再看文字，标出修正或请求，不把阅读文字当作听力独立完成。' }, transfer: '再听一遍，尝试不看文字复述最后的决定或请求。' } })
    }
    lessons.push({ id: `l-${r.id}`, topicId: r.id, title: r.title, grades, objective: r.goal, questionIds: ids.slice(0, 4), delayedQuestionIds: ids.slice(4), summary: [r.goal, '先听再答，检查后才看文字。'], estimatedMinutes: 8, order: 1, review: 'draft' })
  }
  const groups = { school: ['v-school', '校园里的常用词', 6], daily: ['v-daily', '日常表达与学习习惯', 6], community: ['v-community', '社区与出行', 7], nature: ['v-nature', '自然与可持续生活', 8] }
  const lines = readFileSync(resolve(root, 'content/vocabulary.tsv'), 'utf8').split('\n').filter(line => line && !line.startsWith('#'))
  for (const [key, [id, title, minimum]] of Object.entries(groups)) {
    const grades = gradesFrom(minimum), ids = []
    topics.push({ id, title, skill: 'vocabulary', grades, goal: '结合原句理解词义，再独立拼写并检查搭配。', commonError: '看懂例句不等于能独立回忆，拼写也要自己试。', prerequisites: [], order: 60 + minimum })
    for (const line of lines.filter(line => line.startsWith(key + '|'))) {
      const [, word, meaning, example, exampleMeaning, note] = line.split('|')
      if (!note) throw new Error('Vocabulary entry is incomplete: ' + word)
      const acceptedSpellings = word === 'neighbour' ? ['neighbor'] : []
      const wid = `word-${word}`, qid = `q-${id}-${word}`; ids.push(qid)
      vocabulary.push({ id: wid, word, meaning, example, exampleMeaning, topicId: id, grade: minimum, spelling: word === 'neighbour' ? 'british' : 'shared', acceptedSpellings, explanation: note })
      const masked = example.replace(new RegExp(`\\b${word}\\b`, 'i'), '_____')
      questions.push({ id: qid, topicId: id, skill: 'vocabulary', kind: 'blank', difficulty: minimum >= 8 ? 2 : 1, grades, stem: `根据释义写出单词：${meaning}\n${masked}`, answer: { accepted: [word, ...acceptedSpellings], display: word }, marks: 1, estimatedSeconds: 40, source, review: 'draft',
        explanation: { strategy: '先用中文释义和句意确定词，再检查拼写与搭配。', steps: [{ text: `本句是“${exampleMeaning}”，目标词为 ${word}。`, reason: `这里需要表达“${meaning}”。` }, { text: `放回原句：${example}`, reason: note }], distractors: [], pitfall: note, visual: { kind: 'sentence', title: '词义与用法放在一起记', segments: [{ text: word, role: 'evidence', note: meaning }, { text: example, role: 'neutral', note: '在原句中检查用法' }], caption: note }, transfer: `换一个与自己有关的语境，用 ${word} 说一个短句。` } })
    }
    lessons.push({ id: `l-${id}`, topicId: id, title, grades, objective: '先尝试回忆，再用例句检查词义与搭配。', questionIds: ids.slice(0, 8), delayedQuestionIds: ids.slice(8, 12), summary: ['拼写前先自己回忆。', '看过答案后再写对是练习，隔几天独立写对才是保留证据。'], estimatedMinutes: 8, order: 1, review: 'draft' })
  }
  for (const [i, r] of read(root, 'content/expression.json').entries()) {
    const grades = gradesFrom(r.minGrade), writing = r.skill === 'writing', marks = writing ? 10 : 6
    topics.push({ id: r.id, title: r.title, skill: r.skill, grades, goal: r.points, commonError: r.pitfall, prerequisites: [], order: 150 + i })
    questions.push({ id: `q-${r.id}`, topicId: r.id, skill: r.skill, kind: r.skill, grades, difficulty: r.minGrade >= 9 ? 3 : 2, stem: r.stem, answer: { display: r.model }, marks, estimatedSeconds: writing ? 720 : 120, source, review: 'draft',
      rubric: writing ? [{ id: 'content', label: '任务信息完整', marks: 4, guidance: r.points }, { id: 'structure', label: '顺序清楚，衔接自然', marks: 3, guidance: '开头说明意图；各层意思有顺序，不机械堆连接词。' }, { id: 'language', label: '句子通顺，细节已检查', marks: 3, guidance: '逐句检查主谓、时态、拼写与标点。字数按任务自查。' }] : [{ id: 'content', label: '关键内容说清楚', marks: 2, guidance: r.points }, { id: 'organisation', label: '有顺序，听得懂', marks: 2, guidance: '回听时能跟上各层意思；适当停顿，不要求固定口音。' }, { id: 'expression', label: '句子基本完整', marks: 2, guidance: '能用自己的句子表达；回听时检查明显的时态和用词问题。' }],
      explanation: { strategy: r.strategy, steps: [{ text: `先列任务要点：${r.points}。`, reason: '信息完整是表达的基础，先完成任务，再修饰语言。' }, { text: `再检查参考表达中的组织线索：${r.evidence}。`, reason: '参考表达只是一种可行写法，不是必须逐字背诵的唯一答案。' }], distractors: [], pitfall: r.pitfall, visual: { kind: 'paragraph', title: '要点 → 组织 → 检查', segments: [{ text: r.points, role: 'evidence', note: '完成沟通任务' }, { text: r.evidence, role: 'neutral', note: '把信息按顺序连接' }, { text: writing ? '主谓、时态、拼写、标点' : '清楚程度、完整句子、自然停顿', role: 'verb', note: '完成后自查' }], caption: '先独立表达，再用要点自查；自评记录不代表机器测评或当地官方评分。' }, transfer: '换一个对象或情境，用同样的组织方法再表达一次。' } })
  }
}
