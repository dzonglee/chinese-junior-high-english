/** Two fictional path counts are exact coded exercise data, not route measurements. */
export interface WordPathSteps {title:string;hint:string;wrong:string}
export interface WordPathStepsView {title:string;hint:string;reading:string;swapped:boolean;paths:{id:string;label:string;count:number;steps:{id:string}[];selected:boolean}[]}
export const wordPathStepsKey=(id:string)=>`workshopPathSteps-${id}`
function state(raw:string):[boolean,string]|undefined{if(raw==='')return[false,''];const m=/^(normal|swapped):(left|right|-)$/.exec(raw);return m?[m[1]==='swapped',m[2]==='-'?'':m[2]]:undefined}
export function validWordPathSteps(value:unknown):value is WordPathSteps{if(!value||typeof value!=='object')return false;const w=value as WordPathSteps;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function pathStepsMatch(raw:string):boolean{const s=state(raw);return!!s&&s[1]===(s[0]?'right':'left')}
export function changePathSteps(raw:string,action:string):string|undefined{if(action==='reset')return'';const s=state(raw);if(!s)return undefined;if(action==='swap')return(s[0]?'normal':'swapped')+':-';if(action==='left'||action==='right')return(s[0]?'swapped':'normal')+':'+action;return undefined}
export function wordPathStepsView(w:WordPathSteps,raw:string):WordPathStepsView{const[swapped,selected]=state(raw)??[false,''];return{title:w.title,hint:w.hint,swapped,reading:selected?`已选${selected==='left'?'左':'右'}边；只比较台阶数。`:'还没选路线；先比较台阶数。',paths:['left','right'].map((id,index)=>{const count=(index===0)!==swapped?4:7;return{id,label:index===0?'左边路线':'右边路线',count,steps:Array.from({length:count},(_,i)=>({id:String(i)})),selected:id===selected}})}}
