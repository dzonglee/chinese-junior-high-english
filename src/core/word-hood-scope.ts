/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordHoodScope{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordHoodScope(v:unknown):v is WordHoodScope{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordHoodScope;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordHoodScopeKey=(id:string)=>'workshopHoodScope-'+id
function decode(raw:string){if(raw==='')return{"scope": "?"};const m="^(\\?|hood|all|absent)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{scope:v[1]}:null}
export function changeHoodScope(_w:WordHoodScope,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["scope-hood", "scope-all", "scope-absent"].includes(action))return action.slice(6);return undefined}
export function hoodScopeMatch(_w:WordHoodScope,raw:string){const s=decode(raw);return!!s&&s.scope==="hood"}
export function wordHoodScopeView(w:WordHoodScope,raw:string){const s=decode(raw)??{"scope": "?"};return{title:w.title,hint:w.hint,chosen:s.scope!=='?',highlightHood:s.scope==='hood'||s.scope==='all',highlightBody:s.scope==='all',showHood:s.scope!=='absent',groups:[{label:"waterproof的范围",choices:[{"id": "scope-hood", "label": "只描述兜帽"}, {"id": "scope-all", "label": "保证整件都防水"}, {"id": "scope-absent", "label": "没有兜帽"}].map(c=>({...c,selected:c.id==="scope-"+s.scope}))}],reading:hoodScopeMatch(w,raw)?"原句只描述兜帽防水，不保证整件衣服都防水。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordHoodScopeView=ReturnType<typeof wordHoodScopeView>
