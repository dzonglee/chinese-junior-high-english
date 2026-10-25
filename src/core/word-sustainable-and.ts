/** Preserves the sentence's two necessary conditions; does not certify a real plan sustainable. */
export interface WordSustainableAnd {title:string;hint:string;wrong:string}
export interface WordSustainableAndView {title:string;hint:string;reading:string;chosen:boolean;conditions:{id:string;label:string;selected:boolean}[]}
export const wordSustainableAndKey=(id:string)=>`workshopSustainableAnd-${id}`
const canonical=(raw:string)=>['','0','1','2','3'].includes(raw)
export function validWordSustainableAnd(v:unknown):v is WordSustainableAnd {if(!v||typeof v!=='object')return false;const w=v as WordSustainableAnd;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function sustainableAndMatch(raw:string):boolean{return raw==='3'}
export function changeSustainableAnd(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!canonical(raw))return undefined;if(!['people','nature'].includes(action))return undefined;return String(Number(raw||0)^(action==='people'?1:2))}
export function wordSustainableAndView(w:WordSustainableAnd,raw:string):WordSustainableAndView {const bits=canonical(raw)?Number(raw||0):0;return{title:w.title,hint:w.hint,chosen:raw!==''&&canonical(raw),reading:raw===''?'切换两个条件，看看and要求保留几项。':bits===3?'两项都保留，符合本句must work for people and nature的要求。':bits===0?'两个条件都没保留，漏掉了must work for的要求。':'只保留了一项；and要求两项都保留。',conditions:[{id:'people',label:'work for people',selected:!!(bits&1)},{id:'nature',label:'work for nature',selected:!!(bits&2)}]}}
