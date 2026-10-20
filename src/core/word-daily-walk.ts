/** A learner-set illustrative week teaches daily; it is not a real attendance record. */
export interface WordDailyWalk {title:string;hint:string;wrong:string}
export interface WordDailyWalkView {title:string;hint:string;chosen:boolean;count:number;reading:string;days:{id:string;label:string;selected:boolean}[]}
const ids=['mon','tue','wed','thu','fri','sat','sun'],labels=['周一','周二','周三','周四','周五','周六','周日']
const bits=(raw:string)=>/^[01]{7}$/.test(raw)?raw:'0000000'
export const wordDailyWalkKey=(id:string)=>`workshopDailyWalk-${id}`
export function validWordDailyWalk(value:unknown):value is WordDailyWalk {if(!value||typeof value!=='object')return false;const w=value as WordDailyWalk,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,40)&&text(w.hint,110)&&text(w.wrong,140)}
export function dailyWalkMatches(raw:string):boolean {return raw==='1111111'}
export function changeDailyWalk(raw:string,action:string):string|undefined {if(action==='reset')return'';const i=ids.indexOf(action);if(i<0)return undefined;const next=bits(raw).split('');next[i]=next[i]==='1'?'0':'1';return next.some(x=>x==='1')?next.join(''):''}
export function wordDailyWalkView(w:WordDailyWalk,raw:string):WordDailyWalkView {const state=bits(raw),count=[...state].filter(x=>x==='1').length;return{title:w.title,hint:w.hint,chosen:count>0,count,reading:count===7?'这份示意安排每天都有步行。每天步行不等于全天不停活动。':count?`你给示意周中的${count}天安排了步行。daily表示每天，不只工作日。`:'还没安排：点日期，用示意周表示daily。',days:ids.map((id,i)=>({id,label:labels[i],selected:state[i]==='1'}))}}
