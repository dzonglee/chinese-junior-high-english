/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordCapInto{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordCapInto(v:unknown):v is WordCapInto{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordCapInto;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordCapIntoKey=(id:string)=>'workshopCapInto-'+id
function decode(raw:string){if(raw==='')return{"motion": "?"};const m="^(\\?|into|towards|out)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{motion:v[1]}:null}
export function changeCapInto(_w:WordCapInto,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["motion-into", "motion-towards", "motion-out"].includes(action))return action.slice(7);return undefined}
export function capIntoMatch(_w:WordCapInto,raw:string){const s=decode(raw);return!!s&&s.motion==="into"}
export function wordCapIntoView(w:WordCapInto,raw:string){const s=decode(raw)??{"motion": "?"};return{title:w.title,hint:w.hint,showCap:s.motion!=='?',capLeft:s.motion==='into'?72:s.motion==='towards'?38:20,arrow:s.motion==='out'?'←':'→',motion:s.motion,groups:[{label:"进入的方向与结果",choices:[{"id": "motion-into", "label": "吹进池塘"}, {"id": "motion-towards", "label": "只朝池塘移动"}, {"id": "motion-out", "label": "从池塘吹出"}].map(c=>({...c,selected:c.id==="motion-"+s.motion}))}],reading:capIntoMatch(w,raw)?"帽子被吹进池塘；into保留进入的结果。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordCapIntoView=ReturnType<typeof wordCapIntoView>
