/** A necessary condition must not be presented as a guarantee of success. */
export interface WordContributions {title:string;hint:string;wrong:string}
export interface WordContributionsView {title:string;hint:string;wrong:string;people:{id:string;label:string;selected:boolean}[];count:number;reading:string}
export const wordContributionsKey=(id:string)=>`workshopContributions-${id}`
function state(raw:string):string[]|undefined {if(raw==='')return[];const a=raw.split('|');return a.length<=3&&new Set(a).size===a.length&&a.every(x=>['a','b','c'].includes(x))?a:undefined}
export function validWordContributions(v:unknown):v is WordContributions {if(!v||typeof v!=='object')return false;const w=v as WordContributions;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function contributionsMatch(raw:string):boolean{return state(raw)?.length===3}
export function changeContributions(raw:string,action:string):string|undefined {if(action==='reset')return'';const a=state(raw);if(!a||!['a','b','c'].includes(action))return undefined;return ['a','b','c'].filter(x=>x===action?!a.includes(x):a.includes(x)).join('|')}
export function wordContributionsView(w:WordContributions,raw:string):WordContributionsView {const a=state(raw)??[];return{...w,people:['a','b','c'].map((id,i)=>({id,label:['小林','小周','小陈'][i],selected:a.includes(id)})),count:a.length,reading:a.length===3?'练习三人都出力：满足了必要条件，但这并不单独保证成功。':`练习中 ${a.length}/3 人出力：还没满足 everyone contributes。`}}
