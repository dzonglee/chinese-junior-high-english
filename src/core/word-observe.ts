/** Observation changes attention; it does not require moving the pot. */
export interface WordObserve {title:string;hint:string;wrong:string}
export interface WordObserveView {title:string;hint:string;chosen:string;moved:boolean;plantStyle:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordObserveKey=(id:string)=>`workshopObserve-${id}`
export function validWordObserve(value:unknown):value is WordObserve {if(!value||typeof value!=='object')return false;const w=value as WordObserve;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function observeMatch(raw:string):boolean{return raw==='observe'}
export function changeObserve(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!['','observe','move'].includes(raw))return undefined;return ['observe','move'].includes(action)?action:undefined}
export function wordObserveView(w:WordObserve,raw:string):WordObserveView {const chosen=['observe','move'].includes(raw)?raw:'';return{title:w.title,hint:w.hint,chosen,moved:chosen==='move',plantStyle:`left:${chosen==='move'?51:5}%`,reading:chosen==='observe'?'正在原位观察：花盆没有移动。':chosen==='move'?'花盆已移到另一边：这不符合without moving。':'先选择怎么观察；虚构示意只演示位置。',choices:[{id:'observe',label:'留在原位观察'},{id:'move',label:'先搬动花盆'}].map(c=>({...c,selected:c.id===chosen}))}}
