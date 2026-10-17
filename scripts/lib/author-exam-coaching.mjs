import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
// Original teacher-authored contrasts. They are guided instruction, not official exam rubrics.
export function authorExamCoaching(root,catalog){
 const rules=Object.fromEntries(readFileSync(resolve(root,'content/teaching/grammar-exam.tsv'),'utf8').trim().split('\n').map(line=>{const[id,task,decision,trap,feedback]=line.split('\t');if(!feedback)throw new Error(`Incomplete exam contrast ${id}`);return[id,{task,decision,trap,feedback}]}))
 const checks=JSON.parse(readFileSync(resolve(root,'content/teaching/writing-checks.json'),'utf8'))
 const roles=JSON.parse(readFileSync(resolve(root,'content/teaching/model-roles.json'),'utf8'))
 for(const lesson of catalog.lessons){
  const topic=catalog.topics.find(t=>t.id===lesson.topicId),questions=lesson.questionIds.map(id=>catalog.questions.find(q=>q.id===id)),model=questions.find(q=>q.rubric)
  let coaching
  if(topic.skill==='grammar'){
   const rule=rules[topic.id];if(!rule)throw new Error(`Missing individual grammar coaching ${lesson.id}`)
   coaching={task:rule.task,check:topic.commonError,reasoning:rule}
  }else if(model){
   const theme=topic.id.match(/course-(t\d+)/)?.[1],modelRoles=theme?roles.course[theme]:roles.base[model.id]
   if(!modelRoles)throw new Error(`Missing task-specific model roles ${model.id}`)
   coaching={task:topic.skill==='writing'?'审题 → 覆盖要点 → 检查表达':'明确对象 → 说清信息 → 回听自查',check:model.explanation.pitfall,modelRoles,checklist:theme?checks.course[theme]:checks.base[model.id]}
  }else if(topic.skill==='vocabulary'){
   const words=catalog.vocabulary.filter(w=>lesson.questionIds.includes(`q-${w.topicId}-${w.id.slice(5)}`))
   coaching={task:'词义 → 语境 → 拼写',check:`不只背中文：把 ${words.slice(0,3).map(w=>w.word).join('、')}${words.length>3?' 等目标词':''}放回例句，核对词义和完整拼写。`}
  }else coaching={task:topic.id.startsWith('p-')?'辨认书面语音规律':topic.skill==='listening'?'听前读题与信息定位':'读题定位 → 原文证据 → 排除干扰',check:questions[0].explanation.pitfall}
  lesson.examCoaching=coaching
 }
 return catalog
}
