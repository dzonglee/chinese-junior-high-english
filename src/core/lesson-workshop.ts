import type {TeachingProgress} from './lesson-teaching'
import {wordCount,normalizedAnswer} from './answers'
import {containsTerm} from './teaching-production'

export interface WorldCell {label:string;detail?:string;value?:number;role?:string;art?:string;uncertain?:boolean}
export interface LanguageCondition {label:string;before:string;target:string;after:string;reason:string;world:{kind:'count'|'timeline'|'roles'|'scale'|'syntax'|'logic'|'morphology'|'position';caption:string;cells:WorldCell[]}}
export interface UsageMap {left:string;right:string;object:string;caption:string;alternatives:Record<string,'left'|'right'>}
export interface WorkshopItem {evidenceGroups?:string[][];sound?:'syllables'|'emphasis'|'groups'|'links'|'pitch'|'phoneme';caseSensitive?:boolean;usage?:UsageMap;id:string;label:string;prompt:string;answer:string;reason:string;hint:string;before?:string;after?:string;options?:{id:string;text:string;reason:string;correct:boolean}[];material?:string;meaning?:string}
export interface LessonWorkshop {kind:'transform'|'word-use'|'proof'|'compose'|'sound-map';title:string;instruction:string;conditions?:LanguageCondition[];items:WorkshopItem[];choices?:string[]}
export interface WorkshopView {proofRequired:number;proofCollected:{id:string;text:string}[];proofAccepted:boolean;soundUnits:{text:string;emphasis:boolean}[];soundMode:string;pitch:string;usageDirection:string;doneCount:number;kind:LessonWorkshop['kind'];title:string;instruction:string;index:number;total:number;tabs:{id:string;label:string;done:boolean}[];item:WorkshopItem;condition?:LanguageCondition;cells:(WorldCell&{copies:number[];style:string})[];choices:{id:string;text:string;selected:boolean;accepted:boolean}[];selected:string;input:string;own:string;attempted:boolean;correct:boolean;feedback:string;revealed:boolean;complete:boolean;allDone:boolean;draftWords:number;sourceOpen:boolean;worldClass:string}
const indexOf=(p:TeachingProgress,length:number)=>{const i=Number(p.answers.workshopIndex??0);return Number.isInteger(i)&&i>=0&&i<length?i:0}
const key=(i:number)=>`workshop-${i}`
const ownKey=(id:string)=>`workshopOwn-${id}`
const longEnough=(text:string,min=5)=>wordCount(text)>=min
const usesWord=containsTerm
const vCaseOnly=(item:WorkshopItem,input:string)=>!!item.caseSensitive&&input!==item.answer&&normalizedAnswer(input)===normalizedAnswer(item.answer)
export function workshopView(w:LessonWorkshop,p:TeachingProgress):WorkshopView{
 const total=w.conditions?.length??w.items.length,index=indexOf(p,total),condition=w.conditions?.[index],item=w.items[w.kind==='transform'?0:index],k=key(index),selected=p.answers[k]??'',input=p.answers[`workshopInput-${index}`]??'',own=p.answers[ownKey(item.id)]??'',attempted=typeof p.checked[k]==='boolean',correct=!!p.checked[k],complete=!!p.completed.includes(k)
 const options=w.kind==='transform'?(w.choices??[]).map(text=>({id:text,text})):item.options??[]
 let feedback=''
 if(attempted){if(correct)feedback=w.kind==='transform'?condition!.reason:item.reason
 else if(w.kind==='transform')feedback=`你放入的是 ${selected||'空白'}。现在的条件是“${condition!.label}”。${condition!.reason}`
 else if(w.kind==='word-use'&&item.usage?.alternatives[normalizedAnswer(input)])feedback=`你输入了 ${input}，图中物品的方向也变了。${item.usage.caption} ${item.reason}`;
 else if(w.kind==='word-use'&&vCaseOnly(item,input))feedback=`词形写对了，但这里要注意大小写：${item.answer}。`;
 else if(w.kind==='word-use'){const n=[...input].findIndex((c,i)=>c.toLocaleLowerCase('en')!==item.answer[i]?.toLocaleLowerCase('en'));feedback=`句中需要表达“${item.meaning}”。${input?`从第 ${n<0?Math.min(input.length,item.answer.length)+1:n+1} 个字符起核对，注意词形和空格。`:'先根据语境写出这个词。'}${item.hint}`}
 else if(w.kind==='proof'&&p.checked[`${k}-proof-${selected}`])feedback='这条依据接对了。还需要把另一条关键线索接进来，才能确定结论。';
 else if(w.kind==='proof')feedback=item.options?.find(o=>o.id===selected)?.reason??'先选一条原文依据，再核对。'
 else feedback=item.options?.find(o=>o.id===selected)?.reason??'先观察例子，再选择。'
 }
 if(p.checked.workshopOwnMissing)feedback=w.kind==='proof'?'这句线索怎样回答问题？用中文或英文写下一小句自己的推理，再保存。':w.kind==='compose'?'这一步需要你自己的英语。先写一条至少4个英文词的信息，再保存。':`先用 ${item.answer} 写一句自己的话（至少5个英文词），再保存。这里只核对形式，意思和搭配要对照例句自查。`
 const chosen=options.find(o=>o.id===selected)?.text??'',soundMode=item.sound==='links'?(chosen.includes('‿')?'link':'split'):item.sound??'',pitch=chosen==='↗'?'rise':chosen==='↘'?'fall':''
 let soundUnits:{text:string;emphasis:boolean}[]=[]
 if(item.sound==='syllables')soundUnits=(item.before??'').split(' · ').map((text,i)=>({text,emphasis:!!chosen&&i===(chosen==='第二音节'?1:0)}))
 if(item.sound==='emphasis')soundUnits=(item.before??'').split(' ').map(text=>({text,emphasis:text.replace(/[^a-z]/gi,'').toLowerCase()===chosen.toLowerCase()}))
 if(item.sound==='groups'||item.sound==='links')soundUnits=(chosen||item.before||'').split(item.sound==='groups'?'/':/[‿/]/).map(text=>({text:text.trim(),emphasis:false}))
 const cells=(condition?.world.cells??[]).map(c=>({...c,copies:Array.from({length:Math.max(0,Math.min(8,c.value??1))},(_,i)=>i),style:`left:${c.value??50}%;`}))
 return{proofRequired:item.evidenceGroups?.length??1,proofCollected:(item.options??[]).filter(o=>p.checked[`${k}-proof-${o.id}`]).map(o=>({id:o.id,text:o.text})),proofAccepted:!!p.checked[`${k}-proof-${selected}`],soundUnits,soundMode,pitch,doneCount:Array.from({length:total},(_,i)=>i).filter(i=>p.completed.includes(key(i))).length,usageDirection:item.usage?.alternatives[normalizedAnswer(input)]??'',kind:w.kind,title:w.title,instruction:w.instruction,index,total,tabs:Array.from({length:total},(_,i)=>({id:String(i),label:w.conditions?.[i].label??w.items[i].label,done:p.completed.includes(key(i))})),item,condition,cells,choices:options.map(o=>({...o,text:item.sound==='pitch'?(o.text==='↗'?'句末上升':'句末下降'):o.text,selected:o.id===selected,accepted:!!p.checked[`${k}-proof-${o.id}`]})),selected,input,own,attempted,correct,feedback,revealed:!!p.checked.workshopReveal,complete,allDone:Array.from({length:total},(_,i)=>i).every(i=>p.completed.includes(key(i))),draftWords:wordCount(own),sourceOpen:!!p.checked.workshopSource,worldClass:condition?.world.kind??w.kind}
}
export function changeWorkshop(w:LessonWorkshop,p:TeachingProgress,action:string,value:string):void{
 const v=workshopView(w,p),k=key(v.index),mark=()=>{if(!p.completed.includes(k))p.completed.push(k)},unmark=()=>{p.completed=p.completed.filter(x=>x!==k)}
 if(action==='item'){const i=Number(value);if(Number.isInteger(i)&&i>=0&&i<v.total){p.answers.workshopIndex=String(i);p.checked.workshopReveal=false;p.checked.workshopOwnMissing=false;p.checked.workshopSource=false}return}
 if(action==='input'){p.answers[`workshopInput-${v.index}`]=value.slice(0,120);unmark();delete p.checked[k];p.checked.workshopOwnMissing=false;return}
 if(action==='own'){p.answers[ownKey(v.item.id)]=value.slice(0,1000);p.checked.workshopOwnMissing=false;if(w.kind==='compose'||w.kind==='word-use'||w.kind==='proof')unmark();return}
 if(action==='source'){p.checked.workshopSource=!p.checked.workshopSource;return}
 if(action==='reveal'){p.checked.workshopReveal=!p.checked.workshopReveal;return}
 if(action==='choose'){
  if(!v.choices.some(o=>o.id===value))return
  p.answers[k]=value;delete p.checked[k];unmark();return
 }
 if(action==='check'){
  if(w.kind==='proof'){const accepted=!!v.item.options?.find(o=>o.id===v.selected)?.correct;if(accepted)p.checked[`${k}-proof-${v.selected}`]=true;p.checked[k]=accepted&&(v.item.evidenceGroups??[v.item.options!.filter(o=>o.correct).map(o=>o.id)]).every(group=>group.some(id=>p.checked[`${k}-proof-${id}`]));if(!p.checked[k])unmark();return}
  if(w.kind==='compose'){if(longEnough(v.own,4)){mark();p.checked[k]=true}else p.checked.workshopOwnMissing=true;return}
  const correct=w.kind==='transform'?v.selected===v.condition!.target:w.kind==='word-use'?normalizedAnswer(v.input,!!v.item.caseSensitive)===normalizedAnswer(v.item.answer,!!v.item.caseSensitive):!!v.item.options?.find(o=>o.id===v.selected)?.correct
  p.checked[k]=correct
  if(correct&&w.kind!=='word-use')mark();else if(!correct)unmark()
  return
 }
 if(action==='save'&&w.kind==='proof'){if(v.correct&&v.own.replace(/\s/g,'').length>=6){mark();p.checked.workshopOwnMissing=false}else{p.checked.workshopOwnMissing=true;unmark()}return}
 if(action==='save'&&w.kind==='word-use'){
  if(v.correct&&longEnough(v.own)&&usesWord(v.own,v.item.answer)&&normalizedAnswer(v.own)!==normalizedAnswer(v.item.material??'')){mark();p.checked.workshopOwnMissing=false}else{p.checked.workshopOwnMissing=true;unmark()}return
 }
}

/** Convert instructional language while preserving source and control identities. */
export function mapWorkshop(w:LessonWorkshop,t:(text:string)=>string):LessonWorkshop{
 return{...w,title:t(w.title),instruction:t(w.instruction),choices:w.choices?.map(t),conditions:w.conditions?.map(c=>({...c,label:t(c.label),before:t(c.before),target:t(c.target),after:t(c.after),reason:t(c.reason),world:{...c.world,caption:t(c.world.caption),cells:c.world.cells.map(x=>({...x,label:t(x.label),...(x.detail?{detail:t(x.detail)}:{})}))}})),items:w.items.map(i=>({...i,label:t(i.label),prompt:t(i.prompt),answer:t(i.answer),reason:t(i.reason),hint:w.kind==='word-use'?`需要 ${t(i.answer).length} 个字符；首字母是 ${t(i.answer)[0]}。`:t(i.hint),...(i.usage?{usage:{...i.usage,left:t(i.usage.left),right:t(i.usage.right),object:t(i.usage.object),caption:t(i.usage.caption),alternatives:Object.fromEntries(Object.entries(i.usage.alternatives).map(([key,value])=>[t(key),value]))}}:{}),...(i.before!==undefined?{before:t(i.before)}:{}),...(i.after!==undefined?{after:t(i.after)}:{}),...(i.material?{material:t(i.material)}:{}),...(i.meaning?{meaning:t(i.meaning)}:{}),options:i.options?.map(o=>({...o,text:t(o.text),reason:t(o.reason)}))}))}
}
export function workshopProblems(w:LessonWorkshop):string[]{
 const errors:string[]=[]
 if(!w.title||!w.instruction||!w.items.length)errors.push('Missing workshop task')
 if(w.kind==='transform'){
  if(!w.conditions||w.conditions.length<2||!w.choices||w.choices.length<2)errors.push('Missing contrasting conditions')
  if(new Set(w.conditions?.map(c=>c.before+c.target+c.after)).size!==w.conditions?.length)errors.push('Conditions repeat the same sentence')
  if(new Set(w.conditions?.map(c=>JSON.stringify(c.world))).size!==w.conditions?.length)errors.push('Conditions repeat the same world')
  for(const c of w.conditions??[])if(!c.label||!c.target||!c.reason||!c.world.caption||!c.world.cells.length||!w.choices?.includes(c.target))errors.push('Incomplete changing condition')
 }
 for(const i of w.items){if(w.kind==='proof'&&(!i.evidenceGroups?.length||i.evidenceGroups.some(g=>!g.length||g.some(id=>!i.options?.some(o=>o.id===id&&o.correct)))))errors.push('Invalid required evidence groups');if(!i.id||!i.label||!i.prompt)errors.push('Missing item task');if(w.kind==='word-use'&&(!i.answer||!i.meaning||!i.material))errors.push('Missing contextual word use');if((w.kind==='proof'||w.kind==='sound-map')&&(!i.options?.some(o=>o.correct)||!i.options.some(o=>!o.correct)||i.options.some(o=>!o.text||!o.reason)))errors.push('Missing evidence or specific feedback')}
 return errors
}
