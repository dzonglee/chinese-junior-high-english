/** Relative schematic periods only: overlap does not mean identical start/end times. */
export interface WordOverlap {title:string;first:string;second:string;hint:string;wrong:string}
export interface WordOverlapView {title:string;first:string;second:string;hint:string;chosen:boolean;relation:string;secondStyle:string;reading:string}
export const wordOverlapKey=(id:string)=>`workshopOverlap-${id}`
const text=(v:unknown,max:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=max
export function validWordOverlap(v:unknown):v is WordOverlap {
 if(!v||typeof v!=='object'||Array.isArray(v))return false
 const w=v as WordOverlap
 return Object.keys(w).length===5&&Object.keys(w).every(k=>['title','first','second','hint','wrong'].includes(k))&&text(w.title,60)&&text(w.first,50)&&text(w.second,50)&&text(w.hint,140)&&text(w.wrong,180)
}
export function changeOverlap(action:string):string|undefined {if(action==='reset')return'';return ['before','overlap','after'].includes(action)?action:undefined}
export function overlapMatches(raw:string):boolean {return raw==='overlap'}
export function wordOverlapView(w:WordOverlap,raw:string):WordOverlapView {
 const relation=['before','overlap','after'].includes(raw)?raw:'',chosen=relation!==''
 return {title:w.title,first:w.first,second:w.second,hint:w.hint,chosen,relation,secondStyle:relation==='before'?'left:0%;width:25%;':relation==='overlap'?'left:50%;width:35%;':relation==='after'?'left:75%;width:25%;':'',reading:relation==='overlap'?'两段动作有重叠，符合这里的while；不要求起止时刻完全相同。':relation==='before'?'第二段动作全部在第一段动作之前；两段没有重叠，不符合这里的while。':relation==='after'?'第二段动作全部在第一段动作之后；两段没有重叠，不符合这里的while。':'先摆放第二段动作。示意条没有钟点刻度，不提供实际开始时间或持续分钟数。'}
}
