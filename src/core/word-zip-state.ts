/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordZipState{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordZipState(v:unknown):v is WordZipState{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordZipState;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordZipStateKey=(id:string)=>'workshopZipState-'+id
function decode(raw:string){if(raw==='')return{"state": "?"};const m="^(\\?|stuck|free|broken)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{state:v[1]}:null}
export function changeZipState(_w:WordZipState,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["state-stuck", "state-free", "state-broken"].includes(action))return action.slice(6);return undefined}
export function zipStateMatch(_w:WordZipState,raw:string){const s=decode(raw);return!!s&&s.state==="stuck"}
export function wordZipStateView(w:WordZipState,raw:string){const s=decode(raw)??{"state": "?"};return{title:w.title,hint:w.hint,state:s.state,groups:[{label:"拉链状态",choices:[{"id": "state-stuck", "label": "卡住"}, {"id": "state-free", "label": "顺畅"}, {"id": "state-broken", "label": "断掉"}].map(c=>({...c,selected:c.id==="state-"+s.state}))}],reading:zipStateMatch(w,raw)?"背包上的拉链卡住；没有说断掉或修好。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordZipStateView=ReturnType<typeof wordZipStateView>
