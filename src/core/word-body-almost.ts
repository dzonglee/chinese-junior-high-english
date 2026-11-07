/** Original illustrative language model; no measured anatomy or temperature claims. */
export interface WordBodyAlmost{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordBodyAlmost(v:unknown):v is WordBodyAlmost{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordBodyAlmost;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordBodyAlmostKey=(id:string)=>'workshopBodyAlmost-'+id
function decode(raw:string){if(raw==='')return{"scope": "?"};const m="^(\\?|almost|all|one)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{scope:v[1]}:null}
export function changeBodyAlmost(_w:WordBodyAlmost,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["scope-almost", "scope-all", "scope-one"].includes(action))return action.slice(6);return undefined}
export function bodyAlmostMatch(_w:WordBodyAlmost,raw:string){const s=decode(raw);return!!s&&s.scope==="almost"}
export function wordBodyAlmostView(w:WordBodyAlmost,raw:string){const s=decode(raw)??{"scope": "?"};return{title:w.title,hint:w.hint,scope:s.scope,groups:[{label:"游泳用到身体部位的范围",choices:[{"id": "scope-almost", "label": "几乎每个"}, {"id": "scope-all", "label": "毫无例外"}, {"id": "scope-one", "label": "只有一个"}].map(c=>({...c,selected:c.id==="scope-"+s.scope}))}],reading:bodyAlmostMatch(w,raw)?"几乎每个，不等于毫无例外，也没有给百分比。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordBodyAlmostView=ReturnType<typeof wordBodyAlmostView>
