/** Equal-sized sheets for one product per fictional design; counts are exercise data. */
export interface WordPaperUse {title:string;hint:string;wrong:string}
export interface WordPaperUseView {title:string;hint:string;reading:string;sides:{id:string;label:string;chosen:boolean;count:number;sheets:{id:string}[];choices:{id:string;label:string;selected:boolean}[]}[]}
export const wordPaperUseKey=(id:string)=>`workshopPaperUse-${id}`
function counts(raw:string):[number,number]|undefined {if(raw==='')return[0,0];if(!/^[0-3]:[0-3]$/.test(raw))return undefined;return raw.split(':').map(Number)as[number,number]}
export function validWordPaperUse(value:unknown):value is WordPaperUse {if(!value||typeof value!=='object')return false;const w=value as WordPaperUse;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function paperUseMatch(raw:string):boolean {const c=counts(raw);return!!c&&c[0]>0&&c[1]>0&&c[1]<c[0]}
export function changePaperUse(raw:string,action:string):string|undefined {if(action==='reset')return'';const c=counts(raw);if(!c||!/^(old|new):[1-3]$/.test(action))return undefined;const[k,n]=action.split(':');c[k==='old'?0:1]=Number(n);return c.join(':')}
export function wordPaperUseView(w:WordPaperUse,raw:string):WordPaperUseView {const c=counts(raw)??[0,0];return{title:w.title,hint:w.hint,reading:c.includes(0)?'两边都选张数，再比较。':`旧设计 ${c[0]} 张，新设计 ${c[1]} 张；每张同样大，各做一个成品。`,sides:c.map((n,index)=>{const id=index?'new':'old';return{id,label:index?'新设计':'旧设计',chosen:n>0,count:n,sheets:Array.from({length:n},(_,i)=>({id:String(i)})),choices:[1,2,3].map(count=>({id:`${id}:${count}`,label:`${count} 张`,selected:count===n}))}})}}
