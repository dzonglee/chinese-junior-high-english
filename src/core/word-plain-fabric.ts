/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordPlainFabric{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordPlainFabric(v:unknown):v is WordPlainFabric{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordPlainFabric;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordPlainFabricKey=(id:string)=>'workshopPlainFabric-'+id
function decode(raw:string){if(raw==='')return{"appearance": "?"};const m="^(\\?|plain|pattern|white)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{appearance:v[1]}:null}
export function changePlainFabric(_w:WordPlainFabric,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["appearance-plain", "appearance-pattern", "appearance-white"].includes(action))return action.slice(11);return undefined}
export function plainFabricMatch(_w:WordPlainFabric,raw:string){const s=decode(raw);return!!s&&s.appearance==="plain"}
export function wordPlainFabricView(w:WordPlainFabric,raw:string){const s=decode(raw)??{"appearance": "?"};return{title:w.title,hint:w.hint,chosen:s.appearance!=='?',pattern:s.appearance==='pattern',claimedWhite:s.appearance==='white',groups:[{label:"plain的解释",choices:[{"id": "appearance-plain", "label": "没有花纹"}, {"id": "appearance-pattern", "label": "有花纹"}, {"id": "appearance-white", "label": "一定是白色"}].map(c=>({...c,selected:c.id==="appearance-"+s.appearance}))}],reading:plainFabricMatch(w,raw)?"plain在这里是没有花纹；原句没有给具体颜色。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordPlainFabricView=ReturnType<typeof wordPlainFabricView>
