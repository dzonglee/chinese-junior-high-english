/** Event order marks an until endpoint without inventing clock times or durations. */
export interface WordUntil {title:string;feeling:string;events:{id:string;label:string}[];answer:string;hint:string;wrong:string}
export interface WordUntilView {title:string;feeling:string;hint:string;chosen:boolean;spanStyle:string;markerStyle:string;reading:string;events:{id:string;label:string;selected:boolean;style:string}[]}
export const wordUntilKey=(id:string)=>`workshopUntil-${id}`
export function validWordUntil(value:unknown):value is WordUntil {
 if(!value||typeof value!=='object')return false
 const w=value as WordUntil,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(w.title,40)&&text(w.feeling,30)&&text(w.hint,100)&&text(w.wrong,140)&&Array.isArray(w.events)&&w.events.length>=2&&w.events.length<=4&&w.events.every(e=>!!e&&typeof e.id==='string'&&/^[a-z][a-z0-9-]{0,24}$/.test(e.id)&&text(e.label,30))&&new Set(w.events.map(e=>e.id)).size===w.events.length&&w.events.some(e=>e.id===w.answer)
}
export function changeUntil(w:WordUntil,action:string):string|undefined {if(action==='reset')return '';return w.events.find(e=>e.id===action)?.id}
export function untilMatches(w:WordUntil,raw:string):boolean {return raw===w.answer}
export function wordUntilView(w:WordUntil,raw:string):WordUntilView {
 const index=w.events.findIndex(e=>e.id===raw),chosen=index>=0,position=chosen?100*index/(w.events.length-1):0
 return {title:w.title,feeling:w.feeling,hint:w.hint,chosen,spanStyle:`width:${position}%;`,markerStyle:`left:${position}%;`,reading:chosen?`${w.feeling}时段的终点：${w.events[index].label}`:'先把这段感受的终点放在记录中的事件上。',events:w.events.map((e,i)=>({...e,selected:i===index,style:`left:${100*i/(w.events.length-1)}%;`}))}
}
