import { phoneticSorting, type PhoneticSorting } from './phonetic-sorting'
import type { ContentCatalog, ExplanationVisual, Lesson, Question, RubricPoint } from './types'
import { checkAnswer, normalizedAnswer, wordCount } from './answers'
import { communicationTransfer } from './teaching-transfers'
import { evidenceSentences } from './reading-evidence'

export interface TeachingTile { id: string; text: string }
export interface TeachingAssembly { id: string; title: string; prompt: string; tiles: TeachingTile[]; target: string[]; explanation: string; kind: 'letters' | 'sentence' | 'passage' | 'model' | 'pair' }
export interface TeachingEvidence { id: string; text: string; supports: boolean }
export interface TeachingChoice { prompt: string; options: TeachingTile[]; correct: string; reasons: Record<string,string>; excerpt?: string }
export interface LessonTeaching {
  id: string; title: string; objective: string; skill: string; fingerprint: string; mode: 'language' | 'vocabulary' | 'reading' | 'transcript' | 'communication' | 'phonetics'
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
function normalizeEvidence(text:string){return normalizedAnswer(text).replace(/〔[^〕]*〕\s*_*/g,' ').replace(/\[\[\d+\]\]/g,' ').replace(/\s+/g,' ').trim()}
function sourceEvidence(q:Question):TeachingEvidence[]{
  const exact=evidenceSentences(q)
  if(exact.length)return exact.map(s=>({id:s.id,text:s.text,supports:s.matched}))
  if(!q.passage)return[]
  const paragraphs=q.passage.split(/\n+/).filter(p=>p.trim()), chunks=paragraphs.length>=3?paragraphs:teachingSentences(q.passage)
  const quotes=q.explanation.visual.segments.filter(s=>s.role==='evidence').flatMap(s=>s.text.split(/\.{3}|…+/)).map(normalizeEvidence).filter(s=>(s.match(english)??[]).length>=3)
  // This cloze's visual contains the missing word; these two actual phrases are its authored clues.
  if(q.id==='q-r-cloze-1-1')quotes.push('growing vegetables','planted seeds')
  return chunks.map((text,i)=>({id:`source-${i}`,text,supports:quotes.some(quote=>normalizeEvidence(text).includes(quote))}))
}
function choiceFor(q:Question):TeachingChoice{
  if(!q.options?.length)throw new Error(`No diagnostic choice for ${q.id}`)
  return{prompt:`你来批改：按原题的语境，哪一项才合适？\n${q.stem}`,options:q.options.map(o=>({...o})),correct:q.answer.option!,reasons:Object.fromEntries(q.options.map(o=>[o.id,o.id===q.answer.option?q.explanation.steps[0].text:q.explanation.distractors.find(d=>d.option===o.id)!.reason])),excerpt:`一位同学选了：${q.options.find(o=>o.id!==q.answer.option)!.text}`}
}
export function createLessonTeaching(c:ContentCatalog,lesson:Lesson):LessonTeaching{
  const qs=lesson.questionIds.map(id=>c.questions.find(q=>q.id===id)).filter((q):q is Question=>!!q)
  if(qs.length!==lesson.questionIds.length)throw new Error(`Lesson teaching needs its checked content pack: ${lesson.id}`)
  const topic=c.topics.find(t=>t.id===lesson.topicId)!, communication=qs.some(q=>q.kind==='writing'||q.kind==='speaking'), phonetics=topic.id.startsWith('p-')
  const mode:LessonTeaching['mode']=communication?'communication':phonetics?'phonetics':topic.skill==='vocabulary'?'vocabulary':topic.skill==='reading'?'reading':topic.skill==='listening'?'transcript':'language'
  const first=communication?qs.find(q=>q.kind==='writing'||q.kind==='speaking')!:qs[0]
  const transfer=communication?qs.find(q=>q.id!==first.id&&(q.kind==='writing'||q.kind==='speaking'))??communicationTransfer(first):qs[qs.length-1]!
  const cases=qs.filter(q=>q.kind!=='writing'&&q.kind!=='speaking').slice(0,mode==='vocabulary'?qs.length:3)
  const assemblies:TeachingAssembly[]=[], modelSentences=communication?teachingSentences(first.answer.display).map(tile):[]
  let diagnosis:TeachingChoice, evidence:TeachingEvidence[]=[]
  if(mode==='vocabulary'){
    const words=c.vocabulary.filter(w=>w.topicId===topic.id&&qs.some(q=>q.id===`q-${w.topicId}-${w.id.slice(5)}`))
    for(const w of words)assemblies.push(assembly(w.id,`${w.meaning} · 拼写工作台`,`${w.meaning}\n按给出的字母拼成本课目标词。采用当前教材的拼写。`,w.word.length>1?[...w.word]:w.example.split(/\s+/),w.word.length>1?'letters':'sentence',`${w.word}：${w.explanation}\n${w.example}`))
    const w=words[0], others=words.slice(1).filter((v,i,all)=>v.meaning!==words[0].meaning&&all.findIndex(x=>x.meaning===v.meaning)===i).slice(0,2), correct='original'
    diagnosis={prompt:`有同学把“${w.word}”记成了“${others[0]?.meaning??'无论什么语境都不需要检查搭配'}”。对照本课词表，应该怎样改？`,options:[{id:correct,text:w.meaning},...others.map((v,i)=>({id:`other-${i}`,text:v.meaning})),...(others.length?[]:[{id:'ignore',text:'不用看语境，也不用检查搭配。'}])],correct,reasons:{original:`${w.word} 在本课词表中的释义是“${w.meaning}”。${w.explanation}`,...Object.fromEntries(others.map((v,i)=>[`other-${i}`,`这是 ${v.word} 的释义，不是本课 ${w.word} 的释义。`])),ignore:'词义要结合语境和搭配检查，不能跳过这一步。'}}
  }else if(mode==='reading'||mode==='transcript'){
    const chunks=teachingSentences(first.passage??'').slice(0,5)
    assemblies.push(assembly('sequence','把信息接起来','按刚才原文的顺序排列这些片段。这里复原原文，不判断其他顺序是否也能写成文章。',chunks,'passage',first.explanation.strategy))
    evidence=sourceEvidence(first)
    diagnosis=first.options?.length?choiceFor(first):{prompt:'参考原文，哪一句能作为本题的依据？',options:evidence.map(s=>({id:s.id,text:s.text})),correct:evidence.find(s=>s.supports)?.id??'',reasons:Object.fromEntries(evidence.map(s=>[s.id,s.supports?first.explanation.steps[0].reason:'这处文字没有包含本题解析所引用的关键线索。']))}
    if(!first.options?.length&&evidence.filter(s=>s.supports).length>1){const accepted=evidence.find(s=>s.supports)!;diagnosis.options=diagnosis.options.filter(o=>o.id===accepted.id||!evidence.find(s=>s.id===o.id)!.supports)}
  }else if(communication){
    assemblies.push(assembly('model-order','组织一段参考表达','先读参考表达，再按它原来的顺序重组。它只是一种可行表达，不是唯一正确写法。',modelSentences.map(s=>s.text),'model',first.explanation.strategy))
    diagnosis={prompt:'下面的参考表达删掉了第一句。对照刚才的原参考表达，找回被删的一句。不是说所有文章都必须使用这个开头。',excerpt:modelSentences.slice(1).map(s=>s.text).join(' '),options:modelSentences.slice(0,4),correct:modelSentences[0]?.id??'',reasons:Object.fromEntries(modelSentences.map((s,i)=>[s.id,i===0?`找回了原参考表达的开头。${first.explanation.steps[0].reason}`:'这句还保留在删减后的参考表达里；请对照原来的第一句。']))}
  }else{
    if(phonetics){
      for(const q of qs.slice(0,3))assemblies.push(assembly(q.id,'语音知识配对','把正确的说明卡放到这个语境旁边。这里只练书面语音知识，不测实际发音。',[q.stem,q.answer.display],'pair',q.explanation.visual.caption+' '+q.explanation.steps[0].text))
    }else for(const q of qs.slice(0,2)){
      const full=q.explanation.steps.find(step=>/^(?:放回原句检查|一种正确写法)：/.test(step.text))?.text.split('：').slice(1).join('：')??q.answer.display
      const pieces=full.split(/\s+/)
      assemblies.push(assembly(q.id,'搭出完整表达','按本题的参考表达排列词块，再用语境核对。标点跟随原词块。',pieces,'sentence',q.explanation.steps[0].text))
    }
    diagnosis=choiceFor(qs.find(q=>q.id!==first.id&&q.options?.length)??qs.find(q=>q.options?.length)!)
  }
  const studio:LessonTeaching={...(phonetics?{sorting:phoneticSorting[topic.id]}:{}),id:lesson.id,title:lesson.title,objective:lesson.objective,skill:topic.skill,mode,fingerprint:'',prediction:first,transfer,cases,assemblies,evidence,diagnosis,model:communication?first:undefined,modelSentences,rubric:first.rubric??[],exposedIds:[...lesson.questionIds],mediaPending:mode==='transcript'&&qs.some(q=>!q.mediaId||!c.media.some(m=>m.id===q.mediaId&&m.approvedByOwner)),visual:first.explanation.visual}
  studio.fingerprint=hash(studio)
  return studio
}
export function freshTeaching(s:LessonTeaching,now:number):TeachingProgress{return{version:1,fingerprint:s.fingerprint,step:0,unit:0,caseIndex:0,order:[],completed:[],answers:{},checked:{},links:{},before:'',after:'',updatedAt:now}}
export function teachingAnswer(s:LessonTeaching,p:TeachingProgress):Question{return p.step===4?s.transfer:p.step===2?s.cases[p.caseIndex]??s.prediction:s.prediction}
export function assemblyCorrect(unit:TeachingAssembly,ids:string[]):boolean{
  const text=(keys:string[])=>keys.map(id=>unit.tiles.find(t=>t.id===id)?.text??'').join(unit.kind==='letters'?'':' ')
  return ids.length===unit.target.length&&new Set(ids).size===ids.length&&text(ids)===text(unit.target)
}
export function teachingProblems(s:LessonTeaching,lesson:Lesson):string[]{
  const errors:string[]=[];const fail=(message:string)=>errors.push(`${lesson.id}: ${message}`)
  if(!s.assemblies.length||s.assemblies.some(a=>a.target.length<2||a.target.length!==a.tiles.length||!a.tiles.every(t=>t.text)))fail('missing substantive assembly')
  if(!s.diagnosis.correct||!s.diagnosis.options.some(o=>o.id===s.diagnosis.correct)||s.diagnosis.options.length<2)fail('missing diagnostic contrast')
  if((s.mode==='reading'||s.mode==='transcript')&&(!s.evidence.some(e=>e.supports)||s.evidence.length<2))fail('missing source evidence activity')
  if(s.mode==='communication'&&(s.modelSentences.length<2||!s.rubric.length||s.transfer.id===s.prediction.id))fail('missing model/revision/fresh communication task')
  if(s.diagnosis.options.some(o=>!s.diagnosis.reasons[o.id])||new Set(s.diagnosis.options.map(o=>o.text)).size!==s.diagnosis.options.length)fail('diagnosis needs distinct options and specific reasons')
  if(s.mode==='phonetics'&&(!s.sorting||s.sorting.cards.length<2))fail('missing phonetic sorting')
  if(s.mode==='language'||s.mode==='phonetics')if(s.cases.length<2)fail('missing contrasting contexts')
  if(!s.exposedIds.every(id=>lesson.questionIds.includes(id))||s.exposedIds.some(id=>lesson.delayedQuestionIds.includes(id)))fail('teaching must never expose delayed checks')
  return errors
}
/** All studio decisions are guided practice. No Attempt, mastery, or lesson-pass is created here. */
export function changeTeaching(s:LessonTeaching,current:TeachingProgress,action:string,value:string,now:number):TeachingProgress{
  const p:TeachingProgress={...current,order:[...current.order],completed:[...current.completed],answers:{...current.answers},checked:{...current.checked},links:{...current.links},updatedAt:now}
  const mark=(key:string)=>{if(!p.completed.includes(key))p.completed.push(key)}
  if(action==='reset')return freshTeaching(s,now)
  if((action==='response-add'||action==='response-remove')){const q=teachingAnswer(s,p),key=`step-${p.step}-${p.caseIndex}`;let ids:string[]=[];try{ids=JSON.parse(p.answers[key]??'[]')}catch{};if(action==='response-add'&&q.tokens?.some(t=>t.id===value)&&!ids.includes(value))ids.push(value);if(action==='response-remove')ids=ids.filter(id=>id!==value);p.answers[key]=JSON.stringify(ids);delete p.checked[key];return p}
  if(action==='sort'&&p.step===2&&s.sorting){const[card,category]=value.split(':');if(s.sorting.cards.some(c=>c.id===card)&&s.sorting.categories.some(c=>c.id===category)){p.answers[`sort-${card}`]=category;p.checked[`sort-${card}`]=s.sorting.cards.find(c=>c.id===card)!.category===category}return p}
  if(action==='answer'){p.answers[`step-${p.step}-${p.caseIndex}`]=value.slice(0,5000);delete p.checked[`step-${p.step}-${p.caseIndex}`];return p}
  if(action==='before'&&p.step===0){p.before=value.slice(0,5000);return p}
  if(action==='after'&&p.step===2){p.after=value.slice(0,5000);return p}
  if(action==='preview'&&p.step===1){p.checked[`preview-${s.assemblies[p.unit].id}`]=!p.checked[`preview-${s.assemblies[p.unit].id}`];return p}
  if(action==='tile'&&p.step===1){const u=s.assemblies[p.unit];if(u?.tiles.some(t=>t.id===value)&&!p.order.includes(value))p.order.push(value);return p}
  if(action==='remove'&&p.step===1){p.order=p.order.filter(id=>id!==value);return p}
  if(action==='unit'&&p.step===1){const index=Number(value);if(Number.isInteger(index)&&index>=0&&index<s.assemblies.length){p.unit=index;p.order=[]}return p}
  if(action==='assemble'&&p.step===1){const u=s.assemblies[p.unit];if(assemblyCorrect(u,p.order))mark(`build-${u.id}`);else p.checked[`build-${u.id}`]=false;return p}
  if(action==='case'&&p.step===2){const index=Number(value);if(index>=0&&index<s.cases.length&&Number.isInteger(index))p.caseIndex=index;return p}
  if(action==='evidence'&&p.step===2){const item=s.evidence.find(e=>e.id===value);if(item){p.answers.evidence=value;p.checked.evidence=item.supports;if(item.supports)mark('evidence')}return p}
  if(action==='link'&&p.step===2){const [criterion,sentence]=value.split(':');if(s.rubric.some(r=>r.id===criterion)&&s.modelSentences.some(t=>t.id===sentence))p.links[criterion]=sentence;return p}
  if(action==='rubric'){const key=`rubric-${p.step}-${value}`;if((p.step===2?s.rubric:s.transfer.rubric??[]).some(r=>r.id===value))p.checked[key]=!p.checked[key];return p}
  if(action==='diagnose'&&p.step===3&&s.diagnosis.options.some(o=>o.id===value)){p.answers.diagnosis=value;p.checked.diagnosis=value===s.diagnosis.correct;if(p.checked.diagnosis)mark('diagnosis');return p}
  if(action==='check'){
    const key=`step-${p.step}-${p.caseIndex}`,q=teachingAnswer(s,p)
    if(p.step===0&&s.mode==='communication'){if(wordCount(p.before)>=4)mark('predict');return p}
    if((p.step===0||p.step===2||p.step===4)&&q){
      const answer=p.answers[key]??'',self=q.kind==='writing'||q.kind==='speaking'
      p.checked[key]=self?wordCount(answer)>=4&&(q.rubric??[]).every(r=>p.checked[`rubric-${p.step}-${r.id}`]):checkAnswer(q,answer)
      // A prediction is a commitment, not an entry test; wrong guesses must be able to explore.
      if(p.step===0&&answer.trim())mark('predict')
      else if(p.checked[key])mark(p.step===2?`case-${q.id}`:'transfer')
    }
    return p
  }
  if(action==='review'&&s.mode==='communication'&&p.step===2){p.checked.revision=teachingCanAdvance(s,p);return p}
  if(action==='next'&&teachingCanAdvance(s,p)){p.step++;p.order=[];p.caseIndex=0;return p}
  return p
}
export function teachingCanAdvance(s:LessonTeaching,p:TeachingProgress):boolean{
  if(p.step===0)return p.completed.includes('predict')
  if(p.step===1)return s.assemblies.every(a=>p.completed.includes(`build-${a.id}`))
  if(p.step===2){
    if(s.sorting)return s.sorting.cards.every(card=>p.answers[`sort-${card.id}`]===card.category)
    if(s.mode==='communication')return wordCount(p.after)>=4&&p.after.trim()!==p.before.trim()&&s.rubric.every(r=>!!p.links[r.id]&&p.checked[`rubric-2-${r.id}`])
    if(s.mode==='reading'||s.mode==='transcript')return p.completed.includes('evidence')
    return s.cases.slice(0,s.mode==='vocabulary'?s.cases.length:Math.min(2,s.cases.length)).every(q=>p.completed.includes(`case-${q.id}`))
  }
  if(p.step===3)return p.completed.includes('diagnosis')
  if(p.step===4)return p.completed.includes('transfer')
  return false
}

export function restoreTeaching(s:LessonTeaching,saved:TeachingProgress|undefined,now:number):TeachingProgress{
 if(!saved)return freshTeaching(s,now)
 if(saved.fingerprint!==s.fingerprint||saved.unit>=s.assemblies.length||saved.caseIndex>=Math.max(1,s.cases.length)||saved.order.some(id=>!s.assemblies[saved.unit].tiles.some(t=>t.id===id))||new Set(saved.order).size!==saved.order.length)return{...freshTeaching(s,now),before:saved.before,after:saved.after}
 return saved
}
