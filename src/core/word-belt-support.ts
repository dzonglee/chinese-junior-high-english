/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordBeltSupport{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordBeltSupport(v:unknown):v is WordBeltSupport{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordBeltSupport;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordBeltSupportKey=(id:string)=>'workshopBeltSupport-'+id
function decode(raw:string){if(raw==='')return{"fit": "?"};const m="^(\\?|loose|tight|fit)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{fit:v[1]}:null}
export function changeBeltSupport(_w:WordBeltSupport,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["fit-loose", "fit-tight", "fit-fit"].includes(action))return action.slice(4);return undefined}
export function beltSupportMatch(_w:WordBeltSupport,raw:string){const s=decode(raw);return!!s&&s.fit==="loose"}
export function wordBeltSupportView(w:WordBeltSupport,raw:string){const s=decode(raw)??{"fit": "?"};return{title:w.title,hint:w.hint,fit:s.fit,beltWidth:s.fit==='loose'?85:s.fit==='tight'?42:62,groups:[{label:"腰带松紧",choices:[{"id": "fit-loose", "label": "太松，撑不住"}, {"id": "fit-tight", "label": "太紧"}, {"id": "fit-fit", "label": "松紧合适"}].map(c=>({...c,selected:c.id==="fit-"+s.fit}))}],reading:beltSupportMatch(w,raw)?"原句是腰带太松，撑不住这条裤子。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordBeltSupportView=ReturnType<typeof wordBeltSupportView>
