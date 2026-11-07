/** A hypothetical evenly spaced display compares recurrence; it supplies no actual service dates. */
export interface WordRegularRepeat {title:string;hint:string;wrong:string}
export interface WordRegularRepeatView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean}[];marks:{id:string;checked:boolean}[]}
const actions=['once','regular','never'],labels=['只检查一次','定期反复检查','从不检查']
export const wordRegularRepeatKey=(id:string)=>`workshopRegularRepeat-${id}`
export function validWordRegularRepeat(v:unknown):v is WordRegularRepeat {if(!v||typeof v!=='object')return false;const w=v as WordRegularRepeat;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function regularRepeatMatch(raw:string):boolean{return raw==='regular'}
export function changeRegularRepeat(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordRegularRepeatView(w:WordRegularRepeat,raw:string):WordRegularRepeatView {const state=actions.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,reading:state==='regular'?'多个间隔位置反复出现检查标记，说明规律重复；这些间隔不是原句规定的日期或周期。':state==='once'?'只有一次检查，不能表示regularly，也漏掉not just的要求。':state==='never'?'没有任何检查标记，反转了check regularly。':'先切换标记，比较只一次、规律重复与从不。',choices:actions.map((id,i)=>({id,label:labels[i],selected:state===id})),marks:Array.from({length:7},(_,i)=>({id:String(i),checked:state==='regular'?[0,3,6].includes(i):state==='once'&&i===0}))}}
