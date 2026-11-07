/** A learner-controlled day sequence, without invented clock times or independent credit. */
export const daylightPhases=['dawn','sunrise','day','sunset','dusk','night'] as const
export type DaylightPhase=typeof daylightPhases[number]
export interface WordDaylight {answer:DaylightPhase;event:string;title:string;hint:string;wrong:string}
export interface WordDaylightView {event:string;title:string;hint:string;phase:DaylightPhase;chosen:boolean;scene:string;reading:string;choices:{id:DaylightPhase;label:string;selected:boolean}[]}
const labels=['黎明','日出','白天','日落','黄昏','夜晚']
const captions=['早晨：天色渐亮，太阳还未升起','早晨：太阳正从地平线升起','白天：太阳已在地平线上方','傍晚：太阳正落向地平线','傍晚：太阳已落下，天色渐暗','夜晚：天已经黑了']
export const wordDaylightKey=(id:string)=>`workshopDaylight-${id}`
export function validWordDaylight(value:unknown):value is WordDaylight {
 if(!value||typeof value!=='object')return false
 const v=value as WordDaylight,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return daylightPhases.includes(v.answer)&&text(v.title,40)&&text(v.event,40)&&text(v.hint,100)&&text(v.wrong,140)
}
export function changeDaylight(action:string):DaylightPhase|''|undefined {if(action==='reset')return '';return daylightPhases.find(p=>p===action)}
export function daylightMatches(w:WordDaylight,raw:string):boolean {return raw===w.answer}
export function wordDaylightView(w:WordDaylight,raw:string):WordDaylightView {
 const selected=changeDaylight(raw),phase=selected||'day',index=daylightPhases.indexOf(phase)
 return {event:w.event,title:w.title,hint:w.hint,phase,chosen:!!selected,scene:captions[index],reading:selected?captions[index]:'先移动到记录中的时段；起始画面是白天。',choices:daylightPhases.map((id,i)=>({id,label:labels[i],selected:id===selected}))}
}
