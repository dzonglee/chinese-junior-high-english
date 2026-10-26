import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
// Original teacher-authored contrasts. They are guided instruction, not official exam rubrics.
export function authorExamCoaching(root,catalog){
 const rules=Object.fromEntries(readFileSync(resolve(root,'content/teaching/grammar-exam.tsv'),'utf8').trim().split('\n').map(line=>{const[id,task,decision,trap,feedback]=line.split('\t');if(!feedback)throw new Error(`Incomplete exam contrast ${id}`);return[id,{task,decision,trap,feedback}]}))
 const checks=JSON.parse(readFileSync(resolve(root,'content/teaching/writing-checks.json'),'utf8'))
 const roles=JSON.parse(readFileSync(resolve(root,'content/teaching/model-roles.json'),'utf8'))
 // Look up each source once; keep the first-match semantics of Array.find.
 // All indexes are local to this build so later edits and mutations stay visible.
 const topics=new Map(),byId=new Map()
 for(const topic of catalog.topics)if(!topics.has(topic.id))topics.set(topic.id,topic)
 for(const question of catalog.questions)if(!byId.has(question.id))byId.set(question.id,question)
 const vocabularyByQuestion=new Map()
 for(const [index,word] of catalog.vocabulary.entries()){
  const id=`q-${word.topicId}-${word.id.slice(5)}`
  if(!vocabularyByQuestion.has(id))vocabularyByQuestion.set(id,[])
  vocabularyByQuestion.get(id).push({index,word})
 }
 for(const lesson of catalog.lessons){
  const topic=topics.get(lesson.topicId),questions=lesson.questionIds.map(id=>byId.get(id)),model=questions.find(q=>q.rubric)
  let coaching
  if(topic.skill==='grammar'){
   const rule=rules[topic.id];if(!rule)throw new Error(`Missing individual grammar coaching ${lesson.id}`)
   coaching={task:rule.task,check:topic.commonError,reasoning:rule}
  }else if(model){
   const theme=topic.id.match(/course-(t\d+)/)?.[1],modelRoles=theme?roles.course[theme]:roles.base[model.id]
   if(!modelRoles)throw new Error(`Missing task-specific model roles ${model.id}`)
   coaching={task:topic.skill==='writing'?'审题 → 覆盖要点 → 检查表达':'明确对象 → 说清信息 → 回听自查',check:model.explanation.pitfall,modelRoles,checklist:theme?checks.course[theme]:checks.base[model.id]}
  }else if(topic.skill==='vocabulary'){
   const words=[...new Set(lesson.questionIds)].flatMap(id=>vocabularyByQuestion.get(id)??[]).sort((a,b)=>a.index-b.index).map(entry=>entry.word)
   coaching={task:'词义 → 语境 → 拼写',check:`不只背中文：把 ${words.slice(0,3).map(w=>w.word).join('、')}${words.length>3?' 等目标词':''}放回例句，核对词义和完整拼写。`}
  }else coaching={task:topic.id.startsWith('p-')?'辨认书面语音规律':topic.skill==='listening'?'听前读题与信息定位':'读题定位 → 原文证据 → 排除干扰',check:questions[0].explanation.pitfall}
  lesson.examCoaching=coaching
 }
 return catalog
}
