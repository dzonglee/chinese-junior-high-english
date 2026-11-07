/** Exact three-member exercise, separate from the original past-tense statement. */
export interface WordEachItem {title:string;hint:string;wrong:string}
export interface WordEachItemView {title:string;hint:string;total:number;reading:string;people:{id:string;label:string;count:number;items:{id:string}[];choices:{id:string;label:string;selected:boolean}[]}[]}
export const wordEachItemKey=(id:string)=>`workshopEachItem-${id}`
function counts(raw:string):number[]|undefined{if(raw==='')return[0,0,0];return/^[0-2]:[0-2]:[0-2]$/.test(raw)?raw.split(':').map(Number):undefined}
export function validWordEachItem(value:unknown):value is WordEachItem{if(!value||typeof value!=='object')return false;const w=value as WordEachItem;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function eachItemMatch(raw:string):boolean{const ns=counts(raw);return!!ns&&ns.every(n=>n===1)}
export function changeEachItem(raw:string,action:string):string|undefined{if(action==='reset')return'';const ns=counts(raw),m=/^(a|b|c):([0-2])$/.exec(action);if(!ns||!m)return undefined;ns[['a','b','c'].indexOf(m[1])]=Number(m[2]);return ns.join(':')}
export function wordEachItemView(w:WordEachItem,raw:string):WordEachItemView{const ns=counts(raw)??[0,0,0],total=ns.reduce((a,b)=>a+b,0);return{title:w.title,hint:w.hint,total,reading:`共${total}件；逐个人检查是否各有1件。`,people:['a','b','c'].map((id,index)=>({id,label:['小林','小安','小雨'][index],count:ns[index],items:Array.from({length:ns[index]},(_,i)=>({id:String(i)})),choices:[0,1,2].map(n=>({id:id+':'+n,label:n+' 件',selected:ns[index]===n}))}))}}
