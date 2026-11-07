/** Original illustrative language model; no measured anatomy or temperature claims. */
export interface WordPackHigh{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordPackHigh(v:unknown):v is WordPackHigh{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordPackHigh;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordPackHighKey=(id:string)=>'workshopPackHigh-'+id
function decode(raw:string){if(raw==='')return{"position": "?"};const m="^(\\?|high|low|return)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{position:v[1]}:null}
export function changePackHigh(_w:WordPackHigh,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["position-high", "position-low", "position-return"].includes(action))return action.slice(9);return undefined}
export function packHighMatch(_w:WordPackHigh,raw:string){const s=decode(raw);return!!s&&s.position==="high"}
export function wordPackHighView(w:WordPackHigh,raw:string){const s=decode(raw)??{"position": "?"};return{title:w.title,hint:w.hint,position:s.position,packTop:s.position==='high'?22:s.position==='low'?58:null,groups:[{label:"back与high的解释",choices:[{"id": "position-high", "label": "背部较高位置"}, {"id": "position-low", "label": "背部较低位置"}, {"id": "position-return", "label": "回去的方向"}].map(c=>({...c,selected:c.id==="position-"+s.position}))}],reading:packHighMatch(w,raw)?"背包在背部较高位置；back是背部，high没有给厘米数。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordPackHighView=ReturnType<typeof wordPackHighView>
