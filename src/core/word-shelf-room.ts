/** Stipulated example counts illustrate more space; they are not source-sentence data. */
export interface WordShelfRoom {title:string;hint:string;wrong:string}
export interface WordShelfRoomView {title:string;hint:string;newFree:number;canAdd:boolean;canRemove:boolean;reading:string;shelves:{id:string;label:string;free:number;cells:{id:string;occupied:boolean}[]}[]}
export const wordShelfRoomKey=(id:string)=>`workshopShelfRoom-${id}`
const count=(raw:string)=>/^[0-4]$/.test(raw)?Number(raw):0
export function validWordShelfRoom(value:unknown):value is WordShelfRoom {if(!value||typeof value!=='object')return false;const w=value as WordShelfRoom,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,60)&&text(w.hint,110)&&text(w.wrong,140)}
export function shelfRoomMatch(raw:string):boolean{return raw==='3'||raw==='4'}
export function changeShelfRoom(raw:string,action:string):string|undefined{if(action==='reset')return'';if(action==='add')return String(Math.min(4,count(raw)+1));if(action==='remove')return String(Math.max(0,count(raw)-1));return undefined}
export function wordShelfRoomView(w:WordShelfRoom,raw:string):WordShelfRoomView{const n=count(raw);return{title:w.title,hint:w.hint,newFree:n,canAdd:n<4,canRemove:n>0,reading:`空格：旧架2个，新架${n}个。`,shelves:[{id:'old',label:'旧架',free:2},{id:'new',label:'新架',free:n}].map(s=>({...s,cells:Array.from({length:4+s.free},(_,i)=>({id:String(i),occupied:i<4}))}))}}
