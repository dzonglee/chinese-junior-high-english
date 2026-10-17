import {passageSentences} from './reading-evidence'
import type {ContentCatalog,Question} from './types'
import {wordCount,normalizedAnswer} from './answers'
/** Task form checks support self-review. They never judge meaning or assign proficiency. */
export function productionMinimum(q:Question):number{
 const range=q.stem.match(/(?:约\s*)?(\d{2,3})\s*[—–~～-]\s*\d{2,3}\s*词/)
 return range?Number(range[1]):q.id.startsWith('teach-v-')?15:/[2２]\s*[—–~～-]\s*[4４]句/.test(q.stem)?4:12
}
export function containsTerm(text:string,term:string):boolean{
 const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
 return new RegExp(`(?:^|[^a-z])${escape(normalizedAnswer(term))}(?=$|[^a-z])`,'i').test(normalizedAnswer(text))
}
export function productionReady(q:Question,text:string):boolean{const sentences=passageSentences(text).length;return wordCount(text)>=productionMinimum(q)&&(!/[2２]\s*[—–~～-]\s*[4４]句/.test(q.stem)||(sentences>=2&&sentences<=4))&&(!q.id.startsWith('teach-v-')||q.explanation.visual.segments.every(s=>containsTerm(text,s.text)))}
export function vocabularyTransfer(first:Question,words:ContentCatalog['vocabulary']):Question{
 const selected=[words[0],words[Math.floor(words.length/2)],words[words.length-1]],terms=selected.map(w=>w.word)
 return{...first,id:`teach-${first.topicId}-transfer`,kind:'writing',stem:`不用刚才的例句，用 ${terms.join('、')} 各写一句英语，介绍你自己的生活或一个合理的情境。至少15个英文词。可以调整句子顺序，词形按这里给出的形式使用。`,answer:{display:selected.map(w=>w.example).join(' ')},rubric:[{id:'words',label:`三个词都用到了：${terms.join('、')}`,guidance:'逐词核对，不能只把单词列出来。',marks:1},{id:'meaning',label:'每句都表达了完整意思，搭配贴切',guidance:'对照本课例句自查，也可以请老师检查。',marks:1},{id:'new',label:'用了自己的细节，没有照抄例句',guidance:'换人、时间、地点或具体事情。',marks:1}],marks:3,explanation:{...first.explanation,strategy:'先确定想说的内容，再让目标词在句子中承担作用。',steps:[{text:terms.join('、'),reason:'逐个核对词义、搭配和句子结构。'},{text:'以下只是用法参考，请保留你自己的内容。',reason:'自查不等于自动写作评分。'}],distractors:[],visual:{kind:'sentence',title:'从词语走到表达',segments:selected.map(w=>({text:w.word,role:'evidence',note:w.explanation})),caption:'词形可以核对；内容和搭配仍需自查。'},pitfall:'只列出单词或照抄参考句，不能检验自己是否会用。',transfer:'用相同的词再表达另一件事。'}}
}
export function productionIssue(q:Question,text:string):string{
 const count=wordCount(text),min=productionMinimum(q),sentences=passageSentences(text).length
 if(count<min)return`目前写了${count}个英文词，先按任务写到至少${min}词，再自查。`
 if(/[2２]\s*[—–~～-]\s*[4４]句/.test(q.stem)&&(sentences<2||sentences>4))return`目前按标点分成${sentences}句，本题要求2—4句。检查句号和内容组织后再试。`
 if(q.id.startsWith('teach-v-')){const missing=q.explanation.visual.segments.filter(s=>!containsTerm(text,s.text));if(missing.length)return`再检查这些目标词是否按给定形式用到了：${missing.map(s=>s.text).join('、')}。`}
 return'对照任务逐项自查，再保存记录；机器不判断内容是否完整。'
}
