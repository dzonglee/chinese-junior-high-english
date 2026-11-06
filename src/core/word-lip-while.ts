/** Original illustrative language model; no measured anatomy or temperature claims. */
export interface WordLipWhile{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordLipWhile(v:unknown):v is WordLipWhile{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordLipWhile;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordLipWhileKey=(id:string)=>'workshopLipWhile-'+id
function decode(raw:string){if(raw==='')return{"time": "?"};const m="^(\\?|while|before|after)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{time:v[1]}:null}
export function changeLipWhile(_w:WordLipWhile,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["time-while", "time-before", "time-after"].includes(action))return action.slice(5);return undefined}
export function lipWhileMatch(_w:WordLipWhile,raw:string){const s=decode(raw);return!!s&&s.time==="while"}
export function wordLipWhileView(w:WordLipWhile,raw:string){const s=decode(raw)??{"time": "?"};return{title:w.title,hint:w.hint,time:s.time,position:s.time==='before'?6:s.time==='after'?66:36,groups:[{label:"咬嘴唇与思考的关系",choices:[{"id": "time-while", "label": "思考时"}, {"id": "time-before", "label": "思考前"}, {"id": "time-after", "label": "思考后"}].map(c=>({...c,selected:c.id==="time-"+s.time}))}],reading:lipWhileMatch(w,raw)?"两件事发生在同一时段；没有给实际时长。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordLipWhileView=ReturnType<typeof wordLipWhileView>
