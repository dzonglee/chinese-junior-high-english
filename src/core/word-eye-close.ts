/** Original illustrative language model; no measured anatomy or temperature claims. */
export interface WordEyeClose{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordEyeClose(v:unknown):v is WordEyeClose{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordEyeClose;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordEyeCloseKey=(id:string)=>'workshopEyeClose-'+id
function decode(raw:string){if(raw==='')return{"count": "?"};const m="^(\\?|one|both|none)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{count:v[1]}:null}
export function changeEyeClose(_w:WordEyeClose,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["count-one", "count-both", "count-none"].includes(action))return action.slice(6);return undefined}
export function eyeCloseMatch(_w:WordEyeClose,raw:string){const s=decode(raw);return!!s&&s.count==="one"}
export function wordEyeCloseView(w:WordEyeClose,raw:string){const s=decode(raw)??{"count": "?"};return{title:w.title,hint:w.hint,count:s.count,groups:[{label:"要求闭上几只眼睛",choices:[{"id": "count-one", "label": "一只"}, {"id": "count-both", "label": "两只"}, {"id": "count-none", "label": "都不闭"}].map(c=>({...c,selected:c.id==="count-"+s.count}))}],reading:eyeCloseMatch(w,raw)?"闭上一只眼睛；没有指定左右，也不是动作已完成。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordEyeCloseView=ReturnType<typeof wordEyeCloseView>
