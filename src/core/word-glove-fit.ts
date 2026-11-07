/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordGloveFit{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordGloveFit(v:unknown):v is WordGloveFit{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordGloveFit;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordGloveFitKey=(id:string)=>'workshopGloveFit-'+id
function decode(raw:string){if(raw==='')return{"fit": "?"};const m="^(\\?|fit|small|large)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{fit:v[1]}:null}
export function changeGloveFit(_w:WordGloveFit,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["fit-fit", "fit-small", "fit-large"].includes(action))return action.slice(4);return undefined}
export function gloveFitMatch(_w:WordGloveFit,raw:string){const s=decode(raw);return!!s&&s.fit==="fit"}
export function wordGloveFitView(w:WordGloveFit,raw:string){const s=decode(raw)??{"fit": "?"};return{title:w.title,hint:w.hint,fit:s.fit,gloveScale:s.fit==='small'?0.72:s.fit==='large'?1.30:1,groups:[{label:"手套大小关系",choices:[{"id": "fit-fit", "label": "大小刚好"}, {"id": "fit-small", "label": "太小"}, {"id": "fit-large", "label": "太大"}].map(c=>({...c,selected:c.id==="fit-"+s.fit}))}],reading:gloveFitMatch(w,raw)?"原句是手套大小刚好；不是颜色相配。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordGloveFitView=ReturnType<typeof wordGloveFitView>
