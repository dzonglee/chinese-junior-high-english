/** Fictional instructional comparison, not a real museum policy or device check. */
export interface WordFreeSunday {title:string;hint:string;wrong:string}
export interface WordFreeSundayView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const actions=['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],labels=['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export const wordFreeSundayKey=(id:string)=>`workshopFreeSunday-${id}`
export function validWordFreeSunday(v:unknown):v is WordFreeSunday {if(!v||typeof v!=='object')return false;const w=v as WordFreeSunday;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function freeSundayMatch(raw:string):boolean{return raw==='sun'}
export function changeFreeSunday(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordFreeSundayView(w:WordFreeSunday,raw:string):WordFreeSundayView {const state=actions.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,reading:state==='sun'?'周日免费入场有原句依据；其他日子的票价仍未知。':state?'这个日子的入场价格没有提供，不能自行推断收费或免费。':'先比较给出的条件，再选择。',choices:actions.map((id,i)=>({id,label:labels[i],selected:state===id}))}}
