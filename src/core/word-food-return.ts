/** Interpret the requested destination; selecting a place is no real food movement. */
export interface WordFoodReturn {title:string;hint:string;wrong:string}
export interface WordFoodReturnView {title:string;hint:string;selected:string;chosen:boolean;reading:string;places:{id:string;label:string;selected:boolean}[]}
const ids=['fridge','cupboard','table']as const
const labels={fridge:'冰箱',cupboard:'橱柜',table:'桌面'}
const bounded=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
export function validWordFoodReturn(v:unknown):v is WordFoodReturn {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordFoodReturn;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
const known=(v:string)=>v===''||ids.some(id=>id===v)
export const wordFoodReturnKey=(id:string)=>`workshopFoodReturn-${id}`
export const foodReturnMatch=(_w:WordFoodReturn,raw:string)=>raw==='fridge'
export function changeFoodReturn(_w:WordFoodReturn,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return undefined;return ids.some(id=>id===action)?action:undefined}
export function wordFoodReturnView(w:WordFoodReturn,raw:string):WordFoodReturnView {const selected=known(raw)?raw:'';return{title:w.title,hint:w.hint,selected,chosen:!!selected,reading:!selected?'还没选放回的位置。':selected==='fridge'?'选的是冰箱，符合in the fridge；请求不代表已经放回。':'这里选的不是冰箱；fridge限定放回的位置。',places:ids.map(id=>({id,label:labels[id],selected:selected===id}))}}
