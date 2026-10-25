/** Three same-moment exercise counts; no distance or real-road claim. */
export interface WordRouteTraffic {title:string;hint:string;wrong:string}
export interface WordRouteTrafficView {title:string;hint:string;reading:string;routes:{id:string;label:string;count:number;vehicles:{id:string}[];selected:boolean}[]}
export const wordRouteTrafficKey=(id:string)=>`workshopRouteTraffic-${id}`
function state(raw:string):[number,string]|undefined{if(raw==='')return[0,''];const m=/^([0-2]):(a|b|c|-)$/.exec(raw);return m?[Number(m[1]),m[2]==='-'?'':m[2]]:undefined}
export function validWordRouteTraffic(value:unknown):value is WordRouteTraffic{if(!value||typeof value!=='object')return false;const w=value as WordRouteTraffic;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function routeTrafficMatch(raw:string):boolean{const s=state(raw);return!!s&&s[1]===['a','c','b'][s[0]]}
export function changeRouteTraffic(raw:string,action:string):string|undefined{if(action==='reset')return'';const s=state(raw);if(!s)return undefined;if(action==='rotate')return((s[0]+1)%3)+':-';if(['a','b','c'].includes(action))return s[0]+':'+action;return undefined}
export function wordRouteTrafficView(w:WordRouteTraffic,raw:string):WordRouteTrafficView{const[turn,selected]=state(raw)??[0,''];return{title:w.title,hint:w.hint,reading:selected?`已选路线${selected.toUpperCase()}；只比较图示车流。`:'还没选路线；先比较三条路线的车流。',routes:['a','b','c'].map((id,index)=>{const count=[2,4,6][(index+turn)%3];return{id,label:'路线'+id.toUpperCase(),count,vehicles:Array.from({length:count},(_,i)=>({id:String(i)})),selected:id===selected}})}}
