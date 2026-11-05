/** Completed squeezing is distinct from intended juice and any achieved result. */
export interface WordFoodPurpose {title:string;hint:string;wrong:string}
export interface WordFoodPurposeView {title:string;hint:string;purpose:string;outcome:string;reading:string;purposes:{id:string;label:string;selected:boolean}[];outcomes:{id:string;label:string;selected:boolean}[]}
const ps=['juice','soup'],os=['missing','achieved'],pl=['制作果汁','做汤'],ol=['成功结果尚未给出','已经成功做出一整杯']
const bounded=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
export function validWordFoodPurpose(v:unknown):v is WordFoodPurpose {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordFoodPurpose;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
function parse(raw:string):string[]|undefined {if(raw==='')return['',''];const a=raw.split(':');return a.length===2&&(a[0]===''||ps.includes(a[0]))&&(a[1]===''||os.includes(a[1]))?a:undefined}
export const wordFoodPurposeKey=(id:string)=>`workshopFoodPurpose-${id}`
export const foodPurposeMatch=(_w:WordFoodPurpose,raw:string)=>raw==='juice:missing'
export function changeFoodPurpose(_w:WordFoodPurpose,raw:string,action:string):string|undefined {if(action==='reset')return'';const a=parse(raw);if(!a)return undefined;if(action.startsWith('purpose-')&&ps.includes(action.slice(8)))return[action.slice(8),a[1]].join(':');if(action.startsWith('outcome-')&&os.includes(action.slice(8)))return[a[0],action.slice(8)].join(':');return undefined}
export function wordFoodPurposeView(w:WordFoodPurpose,raw:string):WordFoodPurposeView {const[purpose,outcome]=parse(raw)??['',''];return{title:w.title,hint:w.hint,purpose,outcome,reading:!purpose||!outcome?'先选挤压橙子的目的，再判断原句有没有给成功结果。':purpose!=='juice'?'to make juice给的是制作果汁的目的，不是做汤。':outcome!=='missing'?'目的不保证成功；原句也没有说做出了一整杯。':'挤压过橙子，目的是做果汁；成功结果和数量都尚未给出。',purposes:ps.map((id,j)=>({id:'purpose-'+id,label:pl[j],selected:purpose===id})),outcomes:os.map((id,j)=>({id:'outcome-'+id,label:ol[j],selected:outcome===id}))}}
