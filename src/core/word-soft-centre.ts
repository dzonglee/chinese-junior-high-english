/** The stopping condition concerns the centre; appearance alone cannot establish it. */
export interface WordSoftCentre{title:string;hint:string;wrong:string}
export interface WordSoftCentreView{title:string;hint:string;reading:string;state:string;centre:string;surface:string;choices:{id:string;label:string;selected:boolean}[]}
const ids=['centre','surface','unknown']as const
const bounded=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordSoftCentre(v:unknown):v is WordSoftCentre{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordSoftCentre;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordSoftCentreKey=(id:string)=>`workshopSoftCentre-${id}`
const validState=(s:string)=>s===''||ids.some(id=>id===s)
export const softCentreMatch=(_w:WordSoftCentre,raw:string)=>raw==='centre'
export function changeSoftCentre(_w:WordSoftCentre,raw:string,action:string):string|undefined{if(action==='reset')return'';return validState(raw)&&ids.some(id=>id===action)?action:undefined}
export function wordSoftCentreView(w:WordSoftCentre,raw:string):WordSoftCentreView{const state=validState(raw)?raw:'';return{title:w.title,hint:w.hint,state,centre:state==='centre'?'软':state==='surface'?'硬':'?',surface:state==='surface'||state==='unknown'?'软':'?',reading:!state?'先选一种状态；until限定要达到的条件。':state==='centre'?'中心软，保留原句的中心条件；示意不代表实际已烤好。':state==='surface'?'表面虽软，中心仍硬；没有达到原句的中心条件。':'只知道表面状态，中心未知；不能确认符合中心变软的要求。',choices:ids.map((id,j)=>({id,label:['中心软','表面软、中心硬','表面软、中心未知'][j],selected:state===id}))}}
