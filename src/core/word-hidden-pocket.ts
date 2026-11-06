/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordHiddenPocket{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordHiddenPocket(v:unknown):v is WordHiddenPocket{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordHiddenPocket;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordHiddenPocketKey=(id:string)=>'workshopHiddenPocket-'+id
function decode(raw:string){if(raw==='')return{"pocket": "?"};const m="^(\\?|hidden|none|open)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{pocket:v[1]}:null}
export function changeHiddenPocket(_w:WordHiddenPocket,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["pocket-hidden", "pocket-none", "pocket-open"].includes(action))return action.slice(7);return undefined}
export function hiddenPocketMatch(_w:WordHiddenPocket,raw:string){const s=decode(raw);return!!s&&s.pocket==="hidden"}
export function wordHiddenPocketView(w:WordHiddenPocket,raw:string){const s=decode(raw)??{"pocket": "?"};return{title:w.title,hint:w.hint,chosen:s.pocket!=='?',showPocket:s.pocket==='hidden'||s.pocket==='open',hidden:s.pocket==='hidden',groups:[{label:"裙子的口袋",choices:[{"id": "pocket-hidden", "label": "有暗袋"}, {"id": "pocket-none", "label": "没有口袋"}, {"id": "pocket-open", "label": "外露口袋"}].map(c=>({...c,selected:c.id==="pocket-"+s.pocket}))}],reading:hiddenPocketMatch(w,raw)?"裙子有个实用暗袋；暗藏不等于不存在。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordHiddenPocketView=ReturnType<typeof wordHiddenPocketView>
