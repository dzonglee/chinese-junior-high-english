import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { authorExpressions } from './author-expressions.mjs'
import { authorPronunciation } from './author-pronunciation.mjs'
const read = (root, path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'))
const optional = (root, path) => existsSync(resolve(root, path)) ? read(root, path) : []
const source = { kind: 'original', author: 'Chinese Junior-High English project authors' }
const gradesFrom = minimum => [6, 7, 8, 9].filter(g => g >= minimum)
export function authorExtra(root, catalog) {
  const { topics, lessons, questions, vocabulary } = catalog
  for (const [n, record] of [...read(root, 'content/reading.json'), ...optional(root, 'content/course-reading.json')].entries()) {
    const grades = gradesFrom(record.minGrade)
    topics.push({ id: record.id, title: record.title, skill: 'reading', grades, goal: record.goal, commonError: record.pitfall, prerequisites: [], order: 100 + n })
    const sets = []
    for (const [textIndex, text] of record.texts.entries()) {
      const ids = []
      for (const [i, [stem, correct, wrong1, wrong2, evidence, why1, why2, evidenceReason]] of text.items.entries()) {
        const id = `q-${record.id}-${textIndex + 1}-${i + 1}`, raw = [correct, wrong1, wrong2]
        const options = raw.map((_, j) => ({ id: ['a', 'b', 'c'][j], text: raw[(j + i) % 3] }))
        const right = options.find(o => o.text === correct).id
        ids.push(id)
        const quotes = Array.isArray(evidence) ? evidence : [evidence]
        questions.push({ id, topicId: record.id, skill: 'reading', kind: 'choice', feedbackGroup: `${record.id}-${textIndex + 1}`, difficulty: n > 0 ? 2 : 1, grades, stem, passage: text.text, options, answer: { option: right, display: correct }, marks: 2, estimatedSeconds: 90, source, review: 'draft',
          explanation: { strategy: record.goal, steps: [{ text: `定位原文：${quotes.map(quote => `“${quote}”`).join('；')}`, reason: evidenceReason ?? '把线索与题目中的人物、时间和行为对应起来，再得出判断。' }, { text: `核对选项：“${correct}”。`, reason: n === 0 ? '它与原文中的人物、时间或行为一致，没有偷换对象。' : '把这处线索放回全文，答案没有扩大原文可以支持的范围。' }],
            distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: o.text === wrong1 ? why1 : why2 })), pitfall: record.pitfall,
            visual: { kind: 'evidence', title: '原文证据 → 答案', segments: [...quotes.map((text, index) => ({ text, role: 'evidence', note: `线索 ${index + 1}` })), { text: correct, role: 'object', note: '与问题相对应的意思' }], caption: '核对线索表达的事实与选项表达的意思，不能只匹配重复的词。' }, transfer: '遮住选项，用自己的话回答这个问题，再回到原文检查。' } })
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
      for (const [i, [correct, wrong1, wrong2, reason, why1, why2, clues]] of text.items.entries()) {
        const qid = `q-r-cloze-${t + 1}-${i + 1}`, raw = [correct, wrong1, wrong2]
        const options = raw.map((_, n) => ({ id: ['a', 'b', 'c'][n], text: raw[(n + i) % 3] })), right = options.find(o => o.text === correct).id
        const passage = text.text.replace(/\[\[(\d+)\]\]/g, (_, n) => Number(n) === i + 1 ? '_____' : text.items[Number(n) - 1][0]); ids.push(qid)
        if(clues && (!Array.isArray(clues) || clues.length < 1 || clues.length > 3 || clues.some(quote => typeof quote !== 'string' || !quote.trim() || !passage.includes(quote)))) throw new Error(`Cloze evidence must quote its actual passage: ${qid}`)
        questions.push({ id: qid, topicId: id, skill: 'reading', kind: 'choice', grades, difficulty: 2, stem: `读短文，选择最符合上下文的表达。${text.title}`, passage, options, answer: { option: right, display: correct }, marks: 1, estimatedSeconds: 80, source, review: 'draft', explanation: { strategy: '先读通全文，再判断空格在语意和逻辑上承担什么作用。', steps: [{ text: clues ? `定位上下文：${clues.map(quote => `“${quote}”`).join('；')}` : reason, reason: clues ? reason : '这个判断需要结合前后句，而不只是看单个词能否搭配。' }, { text: `填入 ${correct} 后再读本段。`, reason: '正确选项应与全文的时间、人物行动和前后逻辑同时一致。' }], distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: o.text === wrong1 ? why1 : why2 })), pitfall: '一个表达语法上能放进去，不代表它符合这篇短文的意思。', visual: { kind: 'evidence', title: '上下文决定选择', segments: clues ? [...clues.map((text, i) => ({text, role: 'evidence', note: `上下文线索 ${i+1}`})), {text: correct, role: 'object', note: '放回原句的表达'}] : [{ text: correct, role: 'evidence', note: '本空的表达' }, { text: reason, role: 'neutral', note: '前后文的支持' }], caption: '把选项与上下文的关系说清楚，再检查语法。' }, transfer: '遮住选项，用中文说出这里应承接什么含义，再看哪个英文表达吻合。' } })
      }
      sets.push(ids)
    }
    lessons.push({ id: 'l-r-cloze', topicId: id, title: '完形填空：读懂前后关系', grades, objective: '用上下文检查每个表达，不凭眼熟选答案。', questionIds: sets[0], delayedQuestionIds: sets[1], summary: ['先读全文，再选表达。', '每个答案都要说出上下文依据。'], estimatedMinutes: 12, order: 1, review: 'draft' })
  }
  for (const [t, r] of [...read(root, 'content/listening.json'), ...optional(root, 'content/course-listening.json')].entries()) {
    const grades = gradesFrom(r.minGrade), ids = []
    topics.push({ id: r.id, title: r.title, skill: 'listening', grades, goal: r.goal, commonError: '听到过的信息未必是最终答案，要留意改口与回应。', prerequisites: [], order: 120 + t })
    const assets = existsSync(resolve(root, 'content/audio-manifest.json')) ? read(root, 'content/audio-manifest.json') : []
    for (const [i, task] of r.cases.entries()) {
      const id = `q-${r.id}-${task.id}`, mediaId = `audio-${task.audioKey ?? task.id}`, right = ['a', 'b', 'c'][(3 - i % 3) % 3]
      const options = task.options.map((_, n) => ({ id: ['a', 'b', 'c'][n], text: task.options[(n + i) % 3] }))
      const asset = assets.find(a => a.id === mediaId)
      if (asset?.approvedByOwner) { const policy = read(root, 'content/audio-policy.json'); if (!policy.ownerApproval || !['openai', 'licensed'].includes(policy.source) || (policy.source === 'openai' && (policy.model !== asset.model || policy.voice !== asset.voice))) throw new Error(`Audio ${mediaId} does not match the owner's recorded source choice`) }
      if (!catalog.media.some(m => m.id === mediaId)) catalog.media.push(asset ?? { id: mediaId, path: '', transcript: task.transcript, voice: '', model: '', license: '', sha256: '', approvedByOwner: false })
      ids.push(id)
      const quotes = Array.isArray(task.evidence) ? task.evidence : [task.evidence]
      questions.push({ id, topicId: r.id, skill: 'listening', kind: 'choice', feedbackGroup: mediaId, difficulty: t ? 2 : 1, grades, stem: task.stem, passage: task.transcript, mediaId, options, answer: { option: right, display: task.options[0] }, marks: 1, estimatedSeconds: 70, source, review: 'draft', explanation: { strategy: r.goal, steps: task.explanationSteps ?? [{ text: `先定位关键话语：${quotes.map(quote => `“${quote}”`).join('；')}`, reason: task.evidenceReason ?? '把请求、决定或意图与说话人的回应对应起来。' }, { text: `结合回应，答案是 ${task.options[0]}。`, reason: '不能只按录音中第一个出现的数字、地点或建议作答。' }], distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: task.reasons[task.options.indexOf(o.text) - 1] })), pitfall: task.pitfall ?? '先确认题目问的是最初提议、当前安排还是说话意图。', visual: { kind: 'evidence', title: '听力中的关键证据', segments: [...quotes.map((text, index) => ({ text, role: 'evidence', note: `线索 ${index + 1}` })), { text: task.options[0], role: 'object', note: '与问题对应的含义' }], caption: '听完后再看文字，标出修正或请求，不把阅读文字当作听力独立完成。' }, transfer: task.transfer ?? '再听一遍，尝试不看文字复述最后的决定或请求。' } })
    }
    lessons.push({ id: `l-${r.id}`, topicId: r.id, title: r.title, grades, objective: r.goal, questionIds: ids.slice(0, 4), delayedQuestionIds: ids.slice(4), summary: [r.goal, '先听再答，检查后才看文字。'], estimatedMinutes: 8, order: 1, review: 'draft' })
  }
  const groups = { school: ['v-school', '校园里的常用词', 6], daily: ['v-daily', '日常表达与学习习惯', 6], community: ['v-community', '社区与出行', 7], nature: ['v-nature', '自然与可持续生活', 8] }
  for (const group of optional(root, 'content/course-vocabulary-groups.json')) groups[group.key] = [group.id, group.title, group.minGrade]
  const lines = [readFileSync(resolve(root, 'content/vocabulary.tsv'), 'utf8'), ...(existsSync(resolve(root, 'content/course-vocabulary.tsv')) ? [readFileSync(resolve(root, 'content/course-vocabulary.tsv'), 'utf8')] : [])].join('\n').split('\n').filter(line => line && !line.startsWith('#'))
  for (const [key, [id, title, minimum]] of Object.entries(groups)) {
    const grades = gradesFrom(minimum), ids = []
    topics.push({ id, title, skill: 'vocabulary', grades, goal: '结合原句理解词义，再独立拼写并检查搭配。', commonError: '看懂例句不等于能独立回忆，拼写也要自己试。', prerequisites: [], order: 60 + minimum })
    for (const line of lines.filter(line => line.startsWith(key + '|'))) {
      const [, word, meaning, example, exampleMeaning, note, variants = ''] = line.split('|')
      if (!note) throw new Error('Vocabulary entry is incomplete: ' + word)
      const acceptedSpellings = [...new Set([...(word === 'neighbour' ? ['neighbor'] : []), ...variants.split(',').map(v => v.trim()).filter(Boolean)])]
      const wid = `word-${word}`, qid = `q-${id}-${word}`; ids.push(qid)
      vocabulary.push({ id: wid, word, meaning, example, exampleMeaning, topicId: id, grade: minimum, spelling: ['neighbour', 'mum', 'yoghurt', 'memorise', 'theatre', 'colour', 'aeroplane', 'tyre', 'harbour', 'neighbourhood', 'centre', 'grey'].includes(word) ? 'british' : 'shared', acceptedSpellings, explanation: note })
      const masked = example.replace(new RegExp(`\\b${word}\\b`, 'i'), '_____')
      questions.push({ id: qid, topicId: id, skill: 'vocabulary', kind: 'blank', feedbackGroup: wid, difficulty: minimum >= 8 ? 2 : 1, grades, stem: `填写本课词表中的目标词：${meaning}（首字母 ${word[0]}，${acceptedSpellings.length ? '英美拼写均可' : `${word.replaceAll('-', '').length} 个字母`}）\n${masked}`, answer: { accepted: [word, ...acceptedSpellings], display: word }, marks: 1, estimatedSeconds: 40, source, review: 'draft',
        explanation: { strategy: '先用中文释义和句意确定词，再检查拼写与搭配。', steps: [{ text: `本句是“${exampleMeaning}”，目标词为 ${word}。`, reason: `这里需要表达“${meaning}”。` }, { text: `放回原句：${example}`, reason: note }], distractors: [], pitfall: note, visual: { kind: 'sentence', title: '词义与用法放在一起记', segments: [{ text: word, role: 'evidence', note: meaning }, { text: example, role: 'neutral', note: '在原句中检查用法' }], caption: note }, transfer: `换一个与自己有关的语境，用 ${word} 说一个短句。` } })
    }
    const topicWords = vocabulary.filter(w => w.topicId === id)
    for (const [n, word] of topicWords.entries()) {
      const decoys = topicWords.filter(w => w.meaning !== word.meaning && w.id !== word.id).filter((w, i, list) => list.findIndex(other => other.meaning === w.meaning) === i).slice(0, 2)
      if (decoys.length !== 2) throw new Error(`Vocabulary topic needs three distinct meanings: ${id}`)
      const labels = [word, ...decoys], rotated = labels.map((_, k) => labels[(k + n) % 3])
      const options = rotated.map((w, k) => ({ id: ['a', 'b', 'c'][k], text: w.meaning })), right = options.find(o => o.text === word.meaning).id
      questions.push({ id: `q-${id}-${word.word}-meaning`, topicId: id, skill: 'vocabulary', kind: 'choice', feedbackGroup: word.id, difficulty: 1, grades, stem: `本句中的 ${word.word} 是什么意思？`, passage: word.example, options, answer: { option: right, display: word.meaning }, marks: 1, estimatedSeconds: 35, source, review: 'draft', explanation: { strategy: '读完整句，结合搭配确认这个词在本句中的意思。', steps: [{ text: word.exampleMeaning, reason: `本句表达的是“${word.meaning}”。` }, { text: word.explanation, reason: '词义必须与句中位置及实际用法同时吻合。' }], distractors: options.filter(o => o.id !== right).map(o => ({ option: o.id, reason: `“${o.text}”在本课对应 ${decoys.find(w => w.meaning === o.text).word}，不是本句中 ${word.word} 的意思。${word.exampleMeaning}` })), pitfall: word.explanation, visual: { kind: 'sentence', title: '回到例句核对词义', segments: [{ text: word.word, role: 'evidence', note: word.meaning }, { text: word.example, role: 'neutral', note: word.exampleMeaning }], caption: word.explanation }, transfer: `不用原句，试着用 ${word.word} 再表达一件自己的事。` } })
    }
    const count = Math.max(1, Math.ceil(ids.length / 8)), size = Math.floor(ids.length / count), extra = ids.length % count
    let start = 0
    for (let batch = 0; batch < count; batch++) {
      const length = size + (batch < extra ? 1 : 0), selected = ids.slice(start, start + length)
      if (selected.length < 4) throw new Error(`Vocabulary lesson too short: ${id}`)
      lessons.push({ id: `l-${id}${batch ? `-${batch + 1}` : ''}`, topicId: id, title: `${title}${count > 1 ? ` · ${batch + 1}` : ''}`, grades, objective: '先独立拼写，再用具体例句检查词义；隔几天换个方向检验。', questionIds: selected, delayedQuestionIds: selected.map(qid => qid + '-meaning'), summary: ['拼写前先自己回忆。', '延时题换成语境辨义；到期单词卡继续检验拼写。'], estimatedMinutes: 8, order: batch + 1, review: 'draft' })
      start += length
    }
  }
  if (existsSync(resolve(root, 'content/audio-manifest.json'))) {
    const assets = read(root, 'content/audio-manifest.json'), policy = read(root, 'content/audio-policy.json')
    for (const word of vocabulary) {
      const asset = assets.find(a => a.id === `audio-word-${word.word}`)
      if (!asset) continue
      if (asset.approvedByOwner && (!policy.ownerApproval || !['openai', 'licensed'].includes(policy.source) || (policy.source === 'openai' && (policy.model !== asset.model || policy.voice !== asset.voice)))) throw new Error(`Word audio ${asset.id} does not match the owner's recorded source choice`)
      word.mediaId = asset.id
      catalog.media.push(asset)
    }
  }
  authorExpressions(root, catalog)
  authorPronunciation(root, catalog)
}
