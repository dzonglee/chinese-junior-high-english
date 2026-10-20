/** Counts belong to this illustrative one-turn rule, not to real scores or universal fairness. */
export interface WordChance {title:string;hint:string;wrong:string}
export interface WordChanceView {title:string;hint:string;chosen:boolean;total:number;reading:string;people:{id:string;label:string;count:number}[]}
const ids=['a','b','c','d'],labels=['甲','乙','丙','丁']
const counts=(raw:string)=>/^[012]{4}$/.test(raw)?[...raw].map(Number):[0,0,0,0]
export const wordChanceKey=(id:string)=>`workshopChance-${id}`
export const chanceMatches=(raw:string)=>raw==='1111'
export function validWordChance(value:unknown):value is WordChance {if(!value||typeof value!=='object')return false;const w=value as WordChance,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,40)&&text(w.hint,110)&&text(w.wrong,140)}
export function changeChance(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!/^[abcd][+-]$/.test(action))return undefined;const next=counts(raw),i=ids.indexOf(action[0]);next[i]=Math.max(0,Math.min(2,next[i]+(action[1]==='+'?1:-1)));return next.some(Boolean)?next.join(''):''}
export function wordChanceView(w:WordChance,raw:string):WordChanceView {const n=counts(raw),total=n.reduce((a,b)=>a+b,0);return{title:w.title,hint:w.hint,chosen:total>0,total,reading:chanceMatches(raw)?'这次每人恰好一次机会。机会相同，不保证最后得分相同。':total?'还没按这次的规则分完：核对四个人各有几次机会。':'还没分配：按示意规则，给每人一次机会。',people:ids.map((id,i)=>({id,label:labels[i],count:n[i]}))}}
