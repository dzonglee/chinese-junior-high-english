/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordHelmetAsk{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordHelmetAsk(v:unknown):v is WordHelmetAsk{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordHelmetAsk;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordHelmetAskKey=(id:string)=>'workshopHelmetAsk-'+id
function decode(raw:string){if(raw==='')return{"question": "?"};const m="^(\\?|size|colour|number)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{question:v[1]}:null}
export function changeHelmetAsk(_w:WordHelmetAsk,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["question-size", "question-colour", "question-number"].includes(action))return action.slice(9);return undefined}
export function helmetAskMatch(_w:WordHelmetAsk,raw:string){const s=decode(raw);return!!s&&s.question==="size"}
export function wordHelmetAskView(w:WordHelmetAsk,raw:string){const s=decode(raw)??{"question": "?"};return{title:w.title,hint:w.hint,question:s.question,questionLabel:s.question==='size'?'尺码？':s.question==='colour'?'颜色？':s.question==='number'?'数量？':'询问内容待选',groups:[{label:"询问的内容",choices:[{"id": "question-size", "label": "尺码"}, {"id": "question-colour", "label": "颜色"}, {"id": "question-number", "label": "数量"}].map(c=>({...c,selected:c.id==="question-"+s.question}))}],reading:helmetAskMatch(w,raw)?"What size询问尺码；具体尺码没有给出。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordHelmetAskView=ReturnType<typeof wordHelmetAskView>
