/** Four fictional sitting places distinguish no dry place from no places of any kind. */
export interface WordDrySeats {title:string;hint:string;wrong:string}
export interface WordDrySeatsView {title:string;hint:string;state:string;reading:string;seats:{id:string;dry:boolean;label:string;selected:boolean}[]}
const valid=(s:string)=>/^(?:[0-9]|1[0-5])$/.test(s)&&String(Number(s))===s
export const wordDrySeatsKey=(id:string)=>`workshopDrySeats-${id}`
export function validWordDrySeats(v:unknown):v is WordDrySeats {if(!v||typeof v!=='object')return false;const w=v as WordDrySeats;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function drySeatsMatch(raw:string):boolean{return raw==='0'}
export function changeDrySeats(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!valid(raw))return undefined;if(action==='all-wet')return'0';const i=['seat-1','seat-2','seat-3','seat-4'].indexOf(action);return i>=0?String((raw===''?0:Number(raw))^(1<<i)):undefined}
export function wordDrySeatsView(w:WordDrySeats,raw:string):WordDrySeatsView {const state=valid(raw)?raw:'',bits=state?Number(state):0,count=[0,1,2,3].filter(i=>bits&(1<<i)).length;return{title:w.title,hint:w.hint,state,reading:state===''?'先切换干湿，或选择全湿，再判断还有没有干处。':count===0?'四个坐处全是湿的，没有干处，但这些坐处仍然存在；这只是另给的虚构数量。':`仍有${count}个干的坐处，不能说nowhere dry。`,seats:Array.from({length:4},(_,i)=>({id:'seat-'+(i+1),dry:!!(bits&(1<<i)),label:'示意坐处'+(i+1),selected:!!(bits&(1<<i))}))}}
