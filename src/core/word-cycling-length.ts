/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordCyclingLength{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordCyclingLength(v:unknown):v is WordCyclingLength{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordCyclingLength;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordCyclingLengthKey=(id:string)=>'workshopCyclingLength-'+id
function decode(raw:string){if(raw==='')return{"length": "?"};const m="^(\\?|long|short|fit)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{length:v[1]}:null}
export function changeCyclingLength(_w:WordCyclingLength,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["length-long", "length-short", "length-fit"].includes(action))return action.slice(7);return undefined}
export function cyclingLengthMatch(_w:WordCyclingLength,raw:string){const s=decode(raw);return!!s&&s.length==="long"}
export function wordCyclingLengthView(w:WordCyclingLength,raw:string){const s=decode(raw)??{"length": "?"};return{title:w.title,hint:w.hint,chosen:s.length!=='?',hemTop:s.length==='?'?null:s.length==='long'?85:s.length==='short'?52:70,groups:[{label:"骑行时的长度判断",choices:[{"id": "length-long", "label": "太长"}, {"id": "length-short", "label": "太短"}, {"id": "length-fit", "label": "正合适"}].map(c=>({...c,selected:c.id==="length-"+s.length}))}],reading:cyclingLengthMatch(w,raw)?"这条裤子太长，不便骑行；原句没有给具体尺寸。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordCyclingLengthView=ReturnType<typeof wordCyclingLengthView>
