import {vocabularyTransfer,productionReady} from './teaching-production'
import {changeWorkshop,workshopView,workshopProblems,containsWorkshopWord} from './lesson-workshop'
import {changeMission, editionMission, type VisualMission} from './visual-mission'
import { phoneticSorting, type PhoneticSorting } from './phonetic-sorting'
import type { ContentCatalog, ExplanationVisual, Lesson, Question, RubricPoint, ExamCoaching } from './types'
import { checkAnswer, normalizedAnswer, wordCount } from './answers'
import { editionQuestion, editionText, type Spelling } from './spelling'
import { communicationTransfer } from './teaching-transfers'
import { evidenceSentences } from './reading-evidence'

export interface TeachingTile { id: string; text: string }
export interface TeachingAssembly { id: string; title: string; prompt: string; tiles: TeachingTile[]; target: string[]; explanation: string; kind: 'letters' | 'sentence' | 'passage' | 'model' | 'pair' }
export interface TeachingEvidence { id: string; text: string; supports: boolean }
export interface TeachingChoice { prompt: string; options: TeachingTile[]; correct: string; reasons: Record<string,string>; excerpt?: string }
export interface LessonTeaching {
  mission?: VisualMission
  id: string; title: string; objective: string; skill: string; fingerprint: string; mode: 'language' | 'vocabulary' | 'reading' | 'transcript' | 'communication' | 'phonetics'
  coaching: ExamCoaching; diagnoses: TeachingChoice[]; roleAnchors: Record<string,string[]>; revisionRubric: RubricPoint[]
  sorting?: PhoneticSorting
  prediction: Question; transfer: Question; cases: Question[]; assemblies: TeachingAssembly[]
  evidence: TeachingEvidence[]; diagnosis: TeachingChoice; model?: Question; modelSentences: TeachingTile[]; rubric: RubricPoint[]
  exposedIds: string[]; mediaPending: boolean; visual: ExplanationVisual
}
export interface TeachingProgress {
  version: 1; fingerprint: string; step: number; unit: number; caseIndex: number
  order: string[]; completed: string[]; answers: Record<string,string>; checked: Record<string,boolean>
  links: Record<string,string>; before: string; after: string; updatedAt: number
}
const english = /[A-Za-z]+(?:['’\-][A-Za-z]+)*/g
export function teachingSentences(text: string): string[] {
  // Preserve actual prose and dialogue. Protected abbreviations/decimals cannot end a chunk.
  const saved: string[]=[]
  const protectedText=text.replace(/\b(?:Mr|Mrs|Ms|Dr|Prof|St)\.|\b(?:[A-Za-z]\.){2,}|\d\.\d/g,match=>{saved.push(match);return `\uE000${saved.length-1}\uE001`})
  return (protectedText.match(/[^.!?。！？]+(?:[.!?。！？]+["”’']*|$)/g)??[]).map(s=>s.replace(/\uE000(\d+)\uE001/g,(_,i)=>saved[Number(i)]).trim()).filter(Boolean)
}
function hash(value: unknown): string { let h=2166136261;for(const char of JSON.stringify(value))h=Math.imul(h^char.charCodeAt(0),16777619);return (h>>>0).toString(16) }
function tile(text:string,i:number):TeachingTile{return{id:`tile-${i}`,text}}
function assembly(id:string,title:string,prompt:string,texts:string[],kind:TeachingAssembly['kind'],explanation:string):TeachingAssembly{
  const original=texts.map(tile), shuffled=original.length>1?[...original.slice(1).reverse(),original[0]]:original
  return{id,title,prompt,tiles:shuffled,target:original.map(t=>t.id),kind,explanation}
}
function normalizeEvidence(text:string){return normalizedAnswer(text).replace(/(?:〔[^〕]*〕|\[(?:\d+|本空|第\s*\d+\s*空)\])\s*_*/g,' ').replace(/\[\[\d+\]\]/g,' ').replace(/\s+/g,' ').trim()}
export function sourceEvidence(q:Question):TeachingEvidence[]{
  const exact=evidenceSentences(q)
  if(exact.length)return exact.map(s=>({id:s.id,text:s.text,supports:s.matched}))
  if(!q.passage)return[]
  const paragraphs=q.passage.split(/\n+/).filter(p=>p.trim()), chunks=paragraphs.length>=3?paragraphs:teachingSentences(q.passage)
  const quotes=q.explanation.visual.segments.filter(s=>s.role==='evidence').flatMap(s=>s.text.split(/\.{3}|…+/)).map(normalizeEvidence).filter(s=>(s.match(english)??[]).length>=3)
  return chunks.map((text,i)=>({id:`source-${i}`,text,supports:quotes.some(quote=>normalizeEvidence(text).includes(quote))}))
}
function choiceFor(q:Question):TeachingChoice{
  if(!q.options?.length)throw new Error(`No diagnostic choice for ${q.id}`)
  return{prompt:`你来批改：按原题的语境，哪一项才合适？\n${q.stem}`,options:q.options.map(o=>({...o})),correct:q.answer.option!,reasons:Object.fromEntries(q.options.map(o=>[o.id,o.id===q.answer.option?q.explanation.steps[0].text:q.explanation.distractors.find(d=>d.option===o.id)!.reason])),excerpt:`${q.passage?q.passage+'\n\n':''}一位同学选了：${q.options.find(o=>o.id!==q.answer.option)!.text}`}
}
export function createLessonTeaching(c:ContentCatalog,lesson:Lesson,spelling:Spelling='british'):LessonTeaching{
  const originalMission=lesson.visualMission??c.questions.find(q=>q.id===lesson.questionIds[0])?.visualMission
  const qs=lesson.questionIds.map(id=>c.questions.find(q=>q.id===id)).filter((q):q is Question=>!!q).map(({visualMission,...question})=>question)
  if(qs.length!==lesson.questionIds.length)throw new Error(`Lesson teaching needs its checked content pack: ${lesson.id}`)
  const topic=c.topics.find(t=>t.id===lesson.topicId)!, communication=qs.some(q=>q.kind==='writing'||q.kind==='speaking'), phonetics=topic.id.startsWith('p-')
  const mode:LessonTeaching['mode']=communication?'communication':phonetics?'phonetics':topic.skill==='vocabulary'?'vocabulary':topic.skill==='reading'?'reading':topic.skill==='listening'?'transcript':'language'
  const first=communication?qs.find(q=>q.kind==='writing'||q.kind==='speaking')!:qs[0]
  let transfer=communication?qs.find(q=>q.id!==first.id&&(q.kind==='writing'||q.kind==='speaking'))??editionQuestion(communicationTransfer(first),spelling):qs[qs.length-1]!
  let cases=qs.filter(q=>q.id!==transfer.id&&q.kind!=='writing'&&q.kind!=='speaking').slice(0,['vocabulary','reading','transcript'].includes(mode)?qs.length:3)
  if(mode==='vocabulary')cases=cases.slice(0,2)
  if(mode==='reading'||mode==='transcript')cases=cases.filter(q=>sourceEvidence(q).some(e=>e.supports))
  const base=lesson.examCoaching??{task:topic.title,check:topic.commonError}
  const coaching={...base,task:editionText(base.task,spelling),check:editionText(base.check,spelling)}
  const assemblies:TeachingAssembly[]=[], modelSentences=communication?teachingSentences(first.answer.display).map(tile):[]
  let diagnosis:TeachingChoice, evidence:TeachingEvidence[]=[]
  if(mode==='vocabulary'){
    const words=c.vocabulary.filter(w=>w.topicId===topic.id&&qs.some(q=>q.id===`q-${w.topicId}-${w.id.slice(5)}`))
    for(const w of words)assemblies.push(assembly(w.id,`${w.meaning} · ${w.word.length>1?'拼写工作台':'例句工作台'}`,w.word.length>1?`${w.meaning}\n按给出的字母拼成本课目标词。采用当前教材的拼写。`:`${w.meaning}\n${w.word} 只有一个字母。把词块排成完整例句，看看它在句中怎么用。`,w.word.length>1?[...w.word]:w.example.split(/\s+/),w.word.length>1?'letters':'sentence',`${w.word}：${w.explanation}\n${w.example}`))
    transfer=editionQuestion(vocabularyTransfer(first,words),spelling)
    const w=words[0], others=words.slice(1).filter((v,i,all)=>v.meaning!==words[0].meaning&&all.findIndex(x=>x.meaning===v.meaning)===i).slice(0,2), correct='original'
    diagnosis={prompt:`有同学把“${w.word}”记成了“${others[0]?.meaning??'无论什么语境都不需要检查搭配'}”。对照本课词表，应该怎样改？`,options:[{id:correct,text:w.meaning},...others.map((v,i)=>({id:`other-${i}`,text:v.meaning})),...(others.length?[]:[{id:'ignore',text:'不用看语境，也不用检查搭配。'}])],correct,reasons:{original:`${w.word} 在本课词表中的释义是“${w.meaning}”。${w.explanation}`,...Object.fromEntries(others.map((v,i)=>[`other-${i}`,`这是 ${v.word} 的释义，不是本课 ${w.word} 的释义。`])),ignore:'词义要结合语境和搭配检查，不能跳过这一步。'}}
  }else if(mode==='reading'||mode==='transcript'){
    evidence=sourceEvidence(first)
    const quote=evidence.find(e=>e.supports)?.text??first.explanation.visual.segments.find(v=>v.role==='evidence')!.text
    assemblies.push(assembly('sequence','把解题证据连起来','按“题目问什么 → 原文依据 → 得出判断”的顺序连接三张卡。不用背诵整篇文章。',[`题目：${first.stem}`,`依据：${quote}`,`判断：${first.answer.display}`],'passage',first.explanation.steps[0].reason))
    diagnosis=first.options?.length?choiceFor(first):{prompt:'参考原文，哪一句能作为本题的依据？',options:evidence.map(s=>({id:s.id,text:s.text})),correct:evidence.find(s=>s.supports)?.id??'',reasons:Object.fromEntries(evidence.map(s=>[s.id,s.supports?first.explanation.steps[0].reason:'这处文字没有包含本题解析所引用的关键线索。']))}
    if(!first.options?.length&&evidence.filter(s=>s.supports).length>1){const accepted=evidence.find(s=>s.supports)!;diagnosis.options=diagnosis.options.filter(o=>o.id===accepted.id||!evidence.find(s=>s.id===o.id)!.supports)}
  }else if(communication){
    assemblies.push(assembly('model-order','组织一段参考表达','先读参考表达，再按它原来的顺序重组。它只是一种可行表达，不是唯一正确写法。',modelSentences.map(s=>s.text),'model',first.explanation.strategy))
    diagnosis={prompt:'',options:[],correct:'',reasons:{}}
  }else{
    if(phonetics){
      for(const q of qs.slice(0,3))assemblies.push(assembly(q.id,'语音知识配对','把正确的说明卡放到这个语境旁边。这里只练书面语音知识，不测实际发音。',[q.stem,q.answer.display],'pair',q.explanation.visual.caption+' '+q.explanation.steps[0].text))
    }else for(const q of qs.slice(0,2)){
      const full=q.explanation.steps.find(step=>/^(?:放回原句检查|一种正确写法)：/.test(step.text))?.text.split('：').slice(1).join('：')??q.answer.display
      const pieces=full.split(/\s+/)
      assemblies.push(assembly(q.id,'搭出完整表达','点词块，把句子搭好。',pieces,'sentence',q.explanation.steps[0].text))
    }
    diagnosis=choiceFor(qs.find(q=>q.id!==first.id&&q.id!==transfer.id&&q.options?.length)??qs.find(q=>q.options?.length)!)
  }
  const roleAnchors:Record<string,string[]>={}
  let rubric=first.rubric??[]
  const diagnoses:TeachingChoice[]=[]
  if(communication){
    const roles=coaching.modelRoles
    if(!roles||roles.length!==modelSentences.length)throw new Error(`Model roles must match actual sentence units: ${lesson.id}: ${roles?.length}/${modelSentences.length}`)
    rubric=roles.map((label,i)=>({id:`role-${i}`,label,marks:0,guidance:'从参考表达中选出承担这一任务的句子，再检查自己的草稿。'}))
    rubric.forEach((r,i)=>roleAnchors[r.id]=[modelSentences[i].id])
    for(const missing of [...new Set([Math.floor(roles.length/2),0])]){
      const candidates=roles.map((text,i)=>({id:`role-${i}`,text})).filter((_,i)=>i===missing||Math.abs(i-missing)<=2).slice(0,4)
      if(!candidates.some(o=>o.id===`role-${missing}`))candidates[candidates.length-1]={id:`role-${missing}`,text:roles[missing]}
      diagnoses.push({prompt:'对照删减稿，找出少了哪层意思。',excerpt:`原任务：${first.stem}\n\n删减稿：${modelSentences.filter((_,i)=>i!==missing).map(t=>t.text).join(' ')}\n\n自己的表达可以采用别的写法。`,options:candidates,correct:`role-${missing}`,reasons:Object.fromEntries(candidates.map(o=>[o.id,o.id===`role-${missing}`?`参考稿删去了“${roles[missing]}”这一层。原句是：${modelSentences[missing].text} 这不是唯一写法。`:`“${o.text}”在现有表达里已有对应句子。再检查题目还要求哪项信息。`]))})
    }
  }else{
    diagnoses.push(diagnosis)
    if(coaching.reasoning){
      const rule=coaching.reasoning, options=[{id:'rule',text:rule.decision},{id:'trap',text:rule.trap}]
      if(hash(lesson.id).charCodeAt(0)%2)options.reverse()
      diagnoses.push({prompt:`考场上遇到“${rule.task}”，哪种判断方法可靠？`,options,correct:'rule',reasons:{rule:`这条方法成立。${rule.decision}`,trap:rule.feedback}})
    }else if(mode==='vocabulary'){
      for(const q of qs.slice(-2,-1)){
        const word=c.vocabulary.find(w=>q.id===`q-${w.topicId}-${w.id.slice(5)}`)!
        const other=c.vocabulary.filter(w=>qs.some(t=>t.id===`q-${w.topicId}-${w.id.slice(5)}`)&&w.id!==word.id&&w.word!==word.word).slice(0,2)
        const options=[{id:'word',text:word.word},...other.map((w,i)=>({id:`word-${i}`,text:w.word}))]
        if(hash(q.id).charCodeAt(0)%2)options.reverse()
        diagnoses.push({prompt:`结合句意和本课释义，空格应填哪个词？\n${q.stem}\n${word.exampleMeaning}`,options,correct:'word',reasons:{word:`${word.word}：${word.meaning}。${word.explanation}`,...Object.fromEntries(other.map((w,i)=>[`word-${i}`,`这里需要“${word.meaning}”；${w.word} 在本课表示“${w.meaning}”。${word.example}`]))}})
      }
    }else if(mode==='reading'||mode==='transcript'){
      const q=qs.find(q=>q.id!==transfer.id&&q.options&&q.explanation.distractors.length>=2)
      if(q){const wrong=q.explanation.distractors[0];diagnoses.push({excerpt:q.passage,prompt:`下面这条排除理由针对哪个干扰项？\n${q.stem}\n排除理由：${wrong.reason}`,options:q.options!.filter(o=>o.id!==q.answer.option),correct:wrong.option,reasons:Object.fromEntries(q.options!.filter(o=>o.id!==q.answer.option).map(o=>[o.id,o.id===wrong.option?`对应正确。${wrong.reason}`:`这个选项的问题是：${q.explanation.distractors.find(d=>d.option===o.id)!.reason}`]))})}
    }else{const q=qs.find(q=>q.id!==transfer.id&&q.options&&choiceFor(q).prompt!==diagnosis.prompt);if(q)diagnoses.push(choiceFor(q))}
  }
  diagnosis=diagnoses[0]
  if(mode==='vocabulary')cases=cases.slice(0,2)
  if(mode==='reading'||mode==='transcript')cases=cases.filter(q=>q.id!==first.id)
  if(originalMission?.workshop?.applicationIds)cases=originalMission.workshop.applicationIds.map(id=>qs.find(q=>q.id===id)!).filter(Boolean)
  if(originalMission?.workshop?.transfer)transfer=editionQuestion(originalMission.workshop.transfer,spelling)
  const visualMission=originalMission
  const studio:LessonTeaching={...(visualMission?{mission:editionMission(visualMission,spelling)}:{}),...(phonetics?{sorting:{...phoneticSorting[topic.id],cards:phoneticSorting[topic.id].cards.map(card=>({...card,text:editionText(card.text,spelling),reason:editionText(card.reason,spelling)}))}}:{}),coaching,diagnoses,roleAnchors,revisionRubric:(coaching.checklist??[]).map((label,i)=>({id:`check-${i}`,label,marks:0,guidance:'按自己的草稿自查'})),id:lesson.id,title:lesson.title,objective:mode==='vocabulary'&&visualMission?.workshop?.items.some(i=>i.wordDecision)?'把词放回语境，用自己的例句检查用法；隔天再做新题。':lesson.objective,skill:topic.skill,mode,fingerprint:'',prediction:first,transfer,cases,assemblies,evidence,diagnosis,model:communication?first:undefined,modelSentences,rubric,exposedIds:[...lesson.questionIds],mediaPending:mode==='transcript'&&qs.some(q=>!q.mediaId||!c.media.some(m=>m.id===q.mediaId&&m.approvedByOwner)),visual:first.explanation.visual}
  studio.fingerprint=hash(studio)
  return studio
}
export function freshTeaching(s:LessonTeaching,now:number):TeachingProgress{return{version:1,fingerprint:s.fingerprint,step:0,unit:0,caseIndex:0,order:[],completed:[],answers:{visualPane:'study'},checked:{},links:{},before:'',after:'',updatedAt:now}}
export function teachingDiagnosis(s:LessonTeaching,p:TeachingProgress):TeachingChoice{return s.diagnoses[Number(p.answers.clinicIndex??0)]??s.diagnosis}
export function teachingEvidence(s:LessonTeaching,p:TeachingProgress):TeachingEvidence[]{return ['reading','transcript'].includes(s.mode)?sourceEvidence(s.cases[p.caseIndex]??s.prediction):s.evidence}
export function teachingAnswer(s:LessonTeaching,p:TeachingProgress):Question{return p.step===4?s.transfer:p.step===2?s.cases[p.caseIndex]??s.prediction:s.prediction}
export function assemblyCorrect(unit:TeachingAssembly,ids:string[]):boolean{
  const text=(keys:string[])=>keys.map(id=>unit.tiles.find(t=>t.id===id)?.text??'').join(unit.kind==='letters'?'':' ')
  return ids.length===unit.target.length&&new Set(ids).size===ids.length&&text(ids)===text(unit.target)
}
export function teachingProblems(s:LessonTeaching,lesson:Lesson):string[]{
  const errors:string[]=[];if(lesson.grades.some(g=>!s.transfer.grades.includes(g)))errors.push(`${lesson.id}: transfer must cover every lesson grade`);if(s.mission?.workshop)errors.push(...workshopProblems(s.mission.workshop).map(e=>`${lesson.id}: ${e}`));const fail=(message:string)=>errors.push(`${lesson.id}: ${message}`)
  if(!s.assemblies.length||s.assemblies.some(a=>a.target.length<2||a.target.length!==a.tiles.length||!a.tiles.every(t=>t.text)))fail('missing substantive assembly')
  if(s.diagnoses.some(d=>!d.correct||!d.options.some(o=>o.id===d.correct)||d.options.length<2||d.options.some(o=>!d.reasons[o.id])))fail('incomplete exam clinic')
  if(!s.diagnosis.correct||!s.diagnosis.options.some(o=>o.id===s.diagnosis.correct)||s.diagnosis.options.length<2)fail('missing diagnostic contrast')
  if((s.mode==='reading'||s.mode==='transcript')&&(!s.evidence.some(e=>e.supports)||s.evidence.length<2))fail('missing source evidence activity')
  if(s.mode==='reading'||s.mode==='transcript')for(const q of s.cases)if(!sourceEvidence(q).some(e=>e.supports))fail(`missing usable source evidence for ${q.id}`)
  if(s.mode==='communication'&&(s.modelSentences.length<2||!s.rubric.length||s.transfer.id===s.prediction.id))fail('missing model/revision/fresh communication task')
  if(s.diagnosis.options.some(o=>!s.diagnosis.reasons[o.id])||new Set(s.diagnosis.options.map(o=>o.text)).size!==s.diagnosis.options.length)fail('diagnosis needs distinct options and specific reasons')
  if(s.mode==='phonetics'&&(!s.sorting||s.sorting.cards.length<2))fail('missing phonetic sorting')
  if(s.mode==='language'||s.mode==='phonetics')if(s.cases.length<2)fail('missing contrasting contexts')
  if(!s.exposedIds.every(id=>lesson.questionIds.includes(id))||s.exposedIds.some(id=>lesson.delayedQuestionIds.includes(id)))fail('teaching must never expose delayed checks')
  return errors
}
/** All studio decisions are guided practice. No Attempt, mastery, or lesson-pass is created here. */
/** Show one authored reasoning step at a time; never hide the remaining steps permanently. */
export function teachingExplanation(s:LessonTeaching,p:TeachingProgress){
 const q=teachingAnswer(s,p),raw=Number(p.answers[`explanation-${p.step}-${p.caseIndex}`]??0),index=Number.isInteger(raw)&&raw>=0&&raw<q.explanation.steps.length?raw:0
 return{index,total:q.explanation.steps.length,...q.explanation.steps[index]}
}
export function changeTeaching(s:LessonTeaching,current:TeachingProgress,action:string,value:string,now:number):TeachingProgress{
  const p:TeachingProgress={...current,order:[...current.order],completed:[...current.completed],answers:{...current.answers},checked:{...current.checked},links:{...current.links},updatedAt:now}
  const mark=(key:string)=>{if(!p.completed.includes(key))p.completed.push(key)}
  if(action.startsWith('mission-')&&s.mission){changeMission(s.mission,p,action.slice(8),value);return p}
  if(action.startsWith('workshop-')&&s.mission?.workshop&&p.step===1){changeWorkshop(s.mission.workshop,p,action.slice(9),value);return p}
  if(action==='previous'&&p.step>0){p.step--;p.caseIndex=0;p.order=[];return p}
  if(action==='reset')return freshTeaching(s,now)
  if((action==='response-add'||action==='response-remove')){const q=teachingAnswer(s,p),key=`step-${p.step}-${p.caseIndex}`;p.completed=p.completed.filter(k=>k!==(p.step===4?'transfer':`case-${q.id}`));let ids:string[]=[];try{ids=JSON.parse(p.answers[key]??'[]')}catch{};if(action==='response-add'&&q.tokens?.some(t=>t.id===value)&&!ids.includes(value))ids.push(value);if(action==='response-remove')ids=ids.filter(id=>id!==value);p.answers[key]=JSON.stringify(ids);delete p.checked[key];return p}
  if(action==='sort'&&p.step===2&&s.sorting){const[card,category]=value.split(':');if(s.sorting.cards.some(c=>c.id===card)&&s.sorting.categories.some(c=>c.id===category)){p.answers[`sort-${card}`]=category;p.checked[`sort-${card}`]=s.sorting.cards.find(c=>c.id===card)!.category===category}return p}
  if(action==='word-review'&&p.step===2&&s.mode==='vocabulary'){const item=s.mission!.workshop!.items[p.caseIndex];p.checked[`wordReview-${item.id}`]=!p.checked[`wordReview-${item.id}`];p.completed=p.completed.filter(k=>k!==`case-${s.cases[p.caseIndex].id}`);delete p.checked[`step-2-${p.caseIndex}`];return p}
  if(action==='answer'){if(s.mode==='vocabulary'&&p.step===2)delete p.checked[`wordReview-${s.mission!.workshop!.items[p.caseIndex].id}`];const q=teachingAnswer(s,p);p.completed=p.completed.filter(k=>k!==(p.step===4?'transfer':`case-${q.id}`));p.answers[`step-${p.step}-${p.caseIndex}`]=value.slice(0,5000);delete p.checked[`step-${p.step}-${p.caseIndex}`];return p}
  if(action==='before'&&p.step===0){p.before=value.slice(0,5000);return p}
  if(action==='after'&&p.step===2){p.after=value.slice(0,5000);return p}
  if(action==='preview'&&p.step===1){p.checked[`preview-${s.assemblies[p.unit].id}`]=!p.checked[`preview-${s.assemblies[p.unit].id}`];return p}
  if(action==='tile'&&p.step===1){const u=s.assemblies[p.unit];if(u?.tiles.some(t=>t.id===value)&&!p.order.includes(value))p.order.push(value);return p}
  if(action==='remove'&&p.step===1){p.order=p.order.filter(id=>id!==value);return p}
  if(action==='unit'&&p.step===1){const index=Number(value);if(Number.isInteger(index)&&index>=0&&index<s.assemblies.length){p.unit=index;p.order=[]}return p}
  if(action==='assemble'&&p.step===1){const u=s.assemblies[p.unit];if(assemblyCorrect(u,p.order))mark(`build-${u.id}`);else p.checked[`build-${u.id}`]=false;return p}
  if(action==='clinic'&&p.step===3){const i=Number(value);if(Number.isInteger(i)&&i>=0&&i<s.diagnoses.length){p.answers.clinicIndex=value;delete p.answers.diagnosis;delete p.checked.diagnosis}return p}
  if(action==='case'&&p.step===2){const index=Number(value);if(index>=0&&index<s.cases.length&&Number.isInteger(index)){if(index!==p.caseIndex)p.checked.explanation=false;p.caseIndex=index;delete p.answers.source;delete p.answers.evidence;delete p.checked.evidence}return p}
  if(action==='source'&&p.step===2){if(teachingEvidence(s,p).some(e=>e.id===value))p.answers.source=p.answers.source===value?'':value;return p}
  if(action==='passage'){p.checked.passage=!p.checked.passage;return p}
  if(action==='explanation'){p.checked.explanation=!p.checked.explanation;return p}
  if(action==='explanation-step'){
    const index=Number(value),key=`step-${p.step}-${p.caseIndex}`,q=teachingAnswer(s,p)
    if(p.checked.explanation&&typeof p.checked[key]==='boolean'&&Number.isInteger(index)&&index>=0&&index<q.explanation.steps.length)p.answers[`explanation-${p.step}-${p.caseIndex}`]=String(index)
    return p
  }
  if(action==='evidence'&&p.step===2){p.completed=p.completed.filter(k=>k!==`evidence-${(s.cases[p.caseIndex]??s.prediction).id}`);const item=teachingEvidence(s,p).find(e=>e.id===value);if(item){p.answers.evidence=value;p.checked.evidence=item.supports;if(item.supports)mark(`evidence-${(s.cases[p.caseIndex]??s.prediction).id}`)}return p}
  if(action==='criterion'&&p.step===2&&s.mode==='communication'&&s.rubric.some(r=>r.id===value)){p.answers.activeCriterion=value;p.answers.revisionPane='compare';return p}
  if(action==='revision-pane'&&p.step===2&&s.mode==='communication'&&(value==='compare'||value==='write'&&s.rubric.some(r=>p.links[r.id]))){p.answers.revisionPane=value;return p}
  if(action==='link'&&p.step===2){const [criterion,sentence]=value.split(':');if(s.rubric.some(r=>r.id===criterion)&&s.modelSentences.some(t=>t.id===sentence)){p.checked[`link-${criterion}`]=!!s.roleAnchors[criterion]?.includes(sentence);p.answers.lastLink=criterion;p.answers.lastLinkSentence=sentence;if(!p.checked[`link-${criterion}`]){delete p.links[criterion];p.answers.activeCriterion=criterion;p.answers.revisionPane='compare';return p;}p.links[criterion]=sentence;p.answers.revisionPane='write'}return p}
  if(action==='rubric'){const key=`rubric-${p.step}-${value}`;if((p.step===2?s.revisionRubric:s.transfer.rubric??[]).some(r=>r.id===value))p.checked[key]=!p.checked[key];return p}
  if(action==='diagnose'&&p.step===3&&teachingDiagnosis(s,p).options.some(o=>o.id===value)){p.completed=p.completed.filter(k=>k!==`diagnosis-${p.answers.clinicIndex??0}`);p.answers.diagnosis=value;p.checked.diagnosis=value===teachingDiagnosis(s,p).correct;if(p.checked.diagnosis)mark(`diagnosis-${p.answers.clinicIndex??0}`);return p}
  if(action==='check'){
    const key=`step-${p.step}-${p.caseIndex}`,q=teachingAnswer(s,p)
    if(p.step===2&&s.mode==='vocabulary'&&s.mission?.workshop){const item=s.mission.workshop.items[p.caseIndex],answer=p.answers[key]??'',original=p.answers[`workshopOwn-${item.id}`]??'';p.checked[key]=wordCount(answer)>=5&&containsWorkshopWord(answer,item)&&normalizedAnswer(answer)!==normalizedAnswer(original)&&!!p.checked[`wordReview-${item.id}`];if(p.checked[key])mark(`case-${q.id}`);return p}
    if(p.step===0&&s.mode==='communication'){if(wordCount(p.before)>=4)mark('predict');return p}
    if((p.step===0||p.step===2||p.step===4)&&q){
      const answer=p.answers[key]??'',self=q.kind==='writing'||q.kind==='speaking'
      p.checked[key]=self?productionReady(q,answer)&&(q.rubric??[]).every(r=>p.checked[`rubric-${p.step}-${r.id}`]):checkAnswer(q,answer)
      // A prediction is a commitment, not an entry test; wrong guesses must be able to explore.
      if(p.step===0&&answer.trim())mark('predict')
      else if(p.checked[key])mark(p.step===2?`case-${q.id}`:'transfer')
    }
    return p
  }
  if(action==='review'&&s.mode==='communication'&&p.step===2){p.checked.revision=teachingCanAdvance(s,p);return p}
  if(action==='next'&&teachingCanAdvance(s,p)){p.step++;p.order=[];p.caseIndex=0;p.checked.explanation=false;p.checked.passage=false;return p}
  return p
}
export function teachingCanAdvance(s:LessonTeaching,p:TeachingProgress):boolean{
  if(p.step===0)return p.completed.includes('predict')
  if(p.step===1&&s.mission?.workshop)return workshopView(s.mission.workshop,p).allDone
  if(p.step===1)return s.assemblies.every(a=>p.completed.includes(`build-${a.id}`))
  if(p.step===2){
    if(s.sorting)return s.sorting.cards.every(card=>p.answers[`sort-${card.id}`]===card.category)
    if(s.mode==='communication')return productionReady(s.prediction,p.after)&&p.after.trim()!==p.before.trim()&&s.rubric.some(r=>!!p.links[r.id])&&s.revisionRubric.every(r=>p.checked[`rubric-2-${r.id}`])
    if(s.mode==='reading'||s.mode==='transcript')return s.cases.filter(q=>sourceEvidence(q).some(e=>e.supports)).every(q=>p.completed.includes(`evidence-${q.id}`)&&p.completed.includes(`case-${q.id}`))
    return s.cases.slice(0,s.mode==='vocabulary'?s.cases.length:Math.min(2,s.cases.length)).every(q=>p.completed.includes(`case-${q.id}`))
  }
  if(p.step===3)return s.diagnoses.every((_,i)=>p.completed.includes(`diagnosis-${i}`))
  if(p.step===4)return p.completed.includes('transfer')
  return false
}

export function restoreTeaching(s:LessonTeaching,saved:TeachingProgress|undefined,now:number):TeachingProgress{
 if(!saved)return freshTeaching(s,now)
 if(saved.fingerprint!==s.fingerprint||saved.unit>=s.assemblies.length||saved.caseIndex>=Math.max(1,s.cases.length)||saved.order.some(id=>!s.assemblies[saved.unit].tiles.some(t=>t.id===id))||new Set(saved.order).size!==saved.order.length)return{...freshTeaching(s,now),before:saved.before,after:saved.after,answers:{visualPane:'study',...Object.fromEntries(Object.entries(saved.answers).filter(([key])=>key.startsWith('visualOwn-')||key.startsWith('workshopOwn-')))}}
 return saved
}

/** A literal gap from the authored task, rendered as a manipulable sentence slot. */
export function sentenceWorkbench(q:Question,answer:string):{before:string;after:string;selection:string;prompt:string}|undefined {
 if((q.stem.match(/_+/g)??[]).length!==1||!['choice','blank','correction'].includes(q.kind))return undefined
 const line=q.stem.split('\n').find(text=>/_+/.test(text))!,gap=/_+/.exec(line)!
 let before=line.slice(0,gap.index).match(/[A-Za-z][A-Za-z0-9\s.,!?"'’():;—-]*$/)?.[0]??''
 const after=line.slice(gap.index+gap[0].length).match(/^[A-Za-z0-9\s.,!?"'’():;—-]*/)?.[0]??''
 if(!before.trim()&&!after.trim())return undefined
 const original=before+gap[0]+after,prefix=q.skill==='vocabulary'?before.match(/\b[A-Za-z]+$/)?.[0]:undefined
 if(prefix)before=before.slice(0,-prefix.length)
 const selection=q.options?.find(o=>o.id===answer)?.text??answer
 return{before,after,selection:selection||`${prefix??''}…`,prompt:q.stem.replace(original,'').trim()}
}
