/** An untimed diagram separates queue length from speed; no measured source data. */
export interface WordQueueMove {title:string;hint:string;wrong:string}
export interface WordQueueMoveView {title:string;hint:string;length:string;speed:string;observed:boolean;canMove:boolean;people:{id:string}[];position:string;reading:string}
export const wordQueueMoveKey=(id:string)=>`workshopQueueMove-${id}`
function state(raw:string){const m=/^(short|long|):(slow|quick|):([01])$/.exec(raw);return m?{length:m[1],speed:m[2],observed:m[3]==='1'}:{length:'',speed:'',observed:false}}
const encode=(s:ReturnType<typeof state>)=>`${s.length}:${s.speed}:${s.observed?'1':'0'}`
export function validWordQueueMove(value:unknown):value is WordQueueMove {if(!value||typeof value!=='object')return false;const w=value as WordQueueMove,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,60)&&text(w.hint,110)&&text(w.wrong,140)}
export function queueMoveMatch(raw:string):boolean{return raw==='long:quick:1'}
export function changeQueueMove(raw:string,action:string):string|undefined{if(action==='reset')return'';const s=state(raw);if(action==='long'||action==='short'){s.length=action;s.observed=false}else if(action==='slow'||action==='quick'){s.speed=action;s.observed=false}else if(action==='move'&&s.length&&s.speed&&!s.observed)s.observed=true;else return undefined;return encode(s)}
export function wordQueueMoveView(w:WordQueueMove,raw:string):WordQueueMoveView {const s=state(raw),n=s.length==='long'?6:s.length==='short'?3:0,width=n?n*14+(n-1)*4:0,percent=s.observed?(s.speed==='quick'?75:20):0;return{title:w.title,hint:w.hint,...s,canMove:!!s.length&&!!s.speed&&!s.observed,people:Array.from({length:n},(_,i)=>({id:String(i)})),position:`left:calc(${percent}% - ${width*percent/100}px)`,reading:!s.length||!s.speed?'先选队伍长短和移动快慢，再推进示意队伍。':s.observed?`示意${s.length==='long'?'长队':'短队'}已${s.speed==='quick'?'快速':'缓慢'}前进一步。`:'示意队伍已摆好，还没有前进。'}}
