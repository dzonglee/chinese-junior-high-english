import {readFileSync,readdirSync}from'node:fs'
import{resolve}from'node:path'
const source={kind:'original',author:'Chinese Junior-High English project authors'}
const words=text=>(text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)??[]).length
export function authorMocks(root,catalog){
 const papers=[]
 for(const file of readdirSync(resolve(root,'content/mocks')).filter(f=>f.endsWith('.json')).sort()){
  const p=JSON.parse(readFileSync(resolve(root,'content/mocks',file),'utf8')),grades=[6,7,8,9].filter(g=>g>=p.grade),sections=[]
  const add=(section,q)=>{const topic=catalog.topics.find(t=>t.id===q.topicId);if(!topic||!grades.every(g=>topic.grades.includes(g)))throw Error(`Mock topic/grade mismatch ${q.id}`);catalog.questions.push({...q,grades,difficulty:p.grade>=9?3:p.grade>=8?2:1,source,review:'draft'});section.questionIds.push(q.id)}
  const choice=(id,topicId,stem,options,reason,wrongReasons,evidence,marks,passage,group,i)=>{
   if(new Set(options).size!==3||wrongReasons.length!==2)throw Error(`Mock needs three distinct options and two explanations: ${id}`)
   const ordered=options.map((_,j)=>({id:['a','b','c'][j],text:options[(j+i)%3]})),right=ordered.find(o=>o.text===options[0]).id
   return{id,topicId,skill:passage?'reading':'grammar',kind:'choice',stem,...(passage?{passage,feedbackGroup:group}:{}),options:ordered,answer:{option:right,display:options[0]},marks,estimatedSeconds:passage?75:40,explanation:{strategy:passage?'先看问题的对象和条件，再找原文依据，核对选项是否改了范围或关系。':'读完整句，找主语、时间或结构线索，再把选项放回去检查。',steps:[{text:`抓住线索：${evidence}`,reason},{text:`据此选择：${options[0]}`,reason:'这个选项与上述线索和题目条件相符。'}],distractors:ordered.filter(o=>o.id!==right).map(o=>({option:o.id,reason:wrongReasons[options.indexOf(o.text)-1]})),pitfall:wrongReasons[0],visual:{kind:passage?'evidence':'sentence',title:passage?'原文线索 → 题目判断':'句子线索 → 所需形式',segments:[{text:evidence,role:'evidence',note:reason},{text:options[0],role:'verb',note:'与题目条件相符的选择'}],caption:reason},transfer:passage?'再说一遍：干扰项具体改动了原文的哪个条件？':'换一个主语或时间条件，检查表达是否也需要改变。'}}
  }
  const section=(id,title,minutes,marksEach)=>{const s={id,title,minutes,marksEach,questionIds:[]};sections.push(s);return s}
  let s=section('language','一、语言运用',8,1)
  if(p.language.length!==8)throw Error(`${p.id}: needs eight language tasks`)
  p.language.forEach((row,i)=>{const[topicId,text,answer,a,b,reason,whyA,whyB]=row,stem=text.replace('[[1]]','_____');if(text.split('[[1]]').length!==2)throw Error(`${p.id}: one language gap required`);add(s,choice(`${p.id}-language-${i+1}`,topicId,stem,[answer,a,b],reason,[whyA,whyB],text.replace('[[1]]','[空格]'),1,undefined,undefined,i+p.grade))})
  s=section('cloze','二、完形填空',8,2)
  if(p.cloze.items.length!==5)throw Error(`${p.id}: needs five cloze gaps`)
  p.cloze.items.forEach((row,i)=>{const[answer,a,b,evidence,reason,whyA,whyB]=row;if(!p.cloze.text.includes(evidence)||!p.cloze.text.includes(`〔${i+1}〕`))throw Error(`${p.id}: cloze evidence/gap absent`);add(s,choice(`${p.id}-cloze-${i+1}`,p.grade===6?'r-details':'r-cloze',`根据上下文，选择第 ${i+1} 空的最佳答案。`,[answer,a,b],reason,[whyA,whyB],evidence,2,p.cloze.text,`${p.id}-cloze`,i+1))})
  s=section('reading','三、阅读理解',16,2)
  if(p.reading.length!==2||p.reading.some(r=>r.items.length!==4))throw Error(`${p.id}: needs two passages with four questions each`)
  p.reading.forEach((r,k)=>r.items.forEach((row,i)=>{const[stem,answer,a,b,evidence,reason,whyA,whyB]=row;if(!r.text.includes(evidence))throw Error(`${p.id}: reading evidence absent ${k}/${i}`);add(s,choice(`${p.id}-reading-${k+1}-${i+1}`,r.topicId??'r-details',stem,[answer,a,b],reason,[whyA,whyB],evidence,2,r.text,`${p.id}-reading-${k+1}`,i+k+2))}))
  s=section('task','四、任务型阅读',8,2)
  if(p.task.items.length!==3)throw Error(`${p.id}: needs three constrained short responses`)
  p.task.items.forEach((row,i)=>{const[stem,accepted,evidence,reason]=row;if(!p.task.text.includes(evidence)||!accepted.length)throw Error(`${p.id}: task evidence/answer absent`);add(s,{id:`${p.id}-task-${i+1}`,topicId:p.grade===6?'r-details':'r-short-answers',skill:'reading',kind:'blank',stem,passage:p.task.text,feedbackGroup:`${p.id}-task`,answer:{accepted,display:accepted[0]},marks:2,estimatedSeconds:100,explanation:{strategy:'先看答案长度或格式要求，再从原文提取对应信息。',steps:[{text:`定位：${evidence}`,reason},{text:`按要求填写：${accepted[0]}`,reason:'核对题目要求的词数、词形或数字格式。'}],distractors:[],pitfall:'不要把相关但不符合空格语法或题目格式的信息直接抄入。',visual:{kind:'evidence',title:'题目要求 ↔ 原文依据',segments:[{text:stem,role:'neutral',note:'先核对作答格式'},{text:evidence,role:'evidence',note:reason},{text:accepted[0],role:'verb',note:'符合本题要求的表达'}],caption:reason},transfer:'盖住答案，用原文再次核对信息与填写格式。'}})})
  s=section('writing','五、书面表达',15,20)
  const w=p.writing,[min,max]=w.wordBand;if(words(w.model)<min||words(w.model)>max)throw Error(`${p.id}: model word band ${words(w.model)} outside ${min}-${max}`)
  if(w.points.length<2||w.points.length>4)throw Error(`${p.id}: needs specific task points`)
  add(s,{id:`${p.id}-writing`,topicId:w.topicId,skill:'writing',kind:'writing',stem:w.stem,answer:{display:w.model},marks:20,estimatedSeconds:900,rubric:[{id:'content',label:'任务信息',marks:8,guidance:w.points.join('；')},{id:'organisation',label:'组织与衔接',marks:4,guidance:w.organisation},{id:'language',label:'语言表达',marks:6,guidance:w.language},{id:'format',label:'格式与篇幅',marks:2,guidance:`${w.format}；约${min}—${max}词。`}],explanation:{strategy:'先列任务要点，独立写完后再按内容、组织、语言和格式检查。',steps:[{text:`审题：${w.points.join('；')}`,reason:'完成题目要求的信息，不能只堆与主题有关的句子。'},{text:`组织：${w.organisation}`,reason:'让读者能跟上信息顺序或理由之间的关系。'},{text:`检查：${w.language}`,reason:'用自己有把握的表达写清楚；参考文不是唯一可得分的写法。'}],distractors:[],pitfall:w.pitfall,visual:{kind:'paragraph',title:'任务要点 → 段落安排 → 自查',segments:[...w.points.map(text=>({text,role:'evidence',note:'逐项覆盖的信息'})),{text:w.organisation,role:'neutral',note:'组织参考'},{text:w.language,role:'verb',note:'语言检查'}],caption:'本项目自编20分量表；作文需人工判断，不自动计入客观题得分。'},transfer:'保留要点，换一种合理的细节或组织方式再写，避免照抄参考文。'}})
  const total=sections.reduce((n,s)=>n+s.questionIds.length*s.marksEach,0);if(total!==60)throw Error(`${p.id}: marks must total 60`)
  papers.push({id:p.id,title:p.title,grade:p.grade,term:p.term,structures:p.grade===6?['54']:['63','54'],minutes:60,totalMarks:60,format:'original-written',scope:p.scope,sections,review:'draft'})
 }
 catalog.mockPapers=papers.sort((a,b)=>a.grade-b.grade||(a.term==='upper'?-1:1))
 return catalog
}
