/** A separately supplied three-screw exercise illustrates suitability, not actual source measurements. */
export interface WordBoxFit {title:string;hint:string;wrong:string}
export interface WordBoxFitView {title:string;hint:string;count:number;reading:string;slots:{id:string;label:string;filled:boolean}[]}
export const wordBoxFitKey=(id:string)=>`workshopBoxFit-${id}`
function ids(raw:string):string[]|undefined {if(raw==='')return[];const a=raw.split('|');return a.every(x=>['a','b','c'].includes(x))&&new Set(a).size===a.length?a:undefined}
export function validWordBoxFit(v:unknown):v is WordBoxFit {if(!v||typeof v!=='object')return false;const w=v as WordBoxFit;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function boxFitMatch(raw:string):boolean{return ids(raw)?.length===3}
export function changeBoxFit(raw:string,action:string):string|undefined {if(action==='reset')return'';const a=ids(raw);if(!a||!['a','b','c'].includes(action))return undefined;return a.includes(action)?a.filter(x=>x!==action).join('|'):[...a,action].join('|')}
export function wordBoxFitView(w:WordBoxFit,raw:string):WordBoxFitView {const a=ids(raw)??[];return{title:w.title,hint:w.hint,count:a.length,reading:a.length===3?'另给练习：3颗都放进3格；这个小盒对这项用途正合适。不是原句实际尺寸或数量。':`另给练习已放 ${a.length}/3 颗；点空格放入对应螺丝，点已放的可取回。`,slots:['a','b','c'].map((id,i)=>({id,label:'第'+(i+1)+'颗',filled:a.includes(id)}))}}
