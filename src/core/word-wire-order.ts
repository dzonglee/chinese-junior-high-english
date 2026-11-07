/** A schematic assembly preserves the source instruction's temporal order. */
export interface WordWireOrder {title:string;hint:string;wrong:string}
export interface WordWireOrderView {title:string;hint:string;reading:string;straight:boolean;attached:boolean;blocked:boolean;controls:{id:string;label:string;selected:boolean}[]}
export const wordWireOrderKey=(id:string)=>`workshopWireOrder-${id}`
const states=['','bent:blocked','straight:ready','straight:attached']
export function validWordWireOrder(value:unknown):value is WordWireOrder{if(!value||typeof value!=='object')return false;const w=value as WordWireOrder;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function wireOrderMatch(raw:string):boolean{return raw==='straight:attached'}
export function changeWireOrder(raw:string,action:string):string|undefined{if(action==='reset')return'';if(!states.includes(raw))return undefined;if(action==='straighten')return raw==='straight:attached'?raw:'straight:ready';if(action==='attach')return raw.startsWith('straight:')?'straight:attached':'bent:blocked';return undefined}
export function wordWireOrderView(w:WordWireOrder,raw:string):WordWireOrderView{const selected=states.includes(raw)?raw:'',straight=selected.startsWith('straight:'),attached=selected==='straight:attached',blocked=selected==='bent:blocked';return{title:w.title,hint:w.hint,straight,attached,blocked,reading:attached?'先弄直，已装轮子':straight?'铁丝已弄直，还没装轮子':blocked?'还没弄直，轮子未装上':'铁丝弯着，还没装轮子',controls:[{id:'straighten',label:'弄直铁丝',selected:straight},{id:'attach',label:'装轮子',selected:attached}]}}
