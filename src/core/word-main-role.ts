/** Semantic role labels, without an invented ingredient list or percentage. */
export interface WordMainRole {title:string;hint:string;wrong:string}
export interface WordMainRoleView {title:string;hint:string;selected:string;reading:string;visible:boolean;claim:string;choices:{id:string;label:string;selected:boolean}[]}
const choices=[['main','主要原料'],['only','唯一原料'],['none','不是原料']]as const,known=(s:string)=>s===''||choices.some(c=>c[0]===s),bounded=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
export function validWordMainRole(v:unknown):v is WordMainRole {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordMainRole;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordMainRoleKey=(id:string)=>`workshopMainRole-${id}`
export const mainRoleMatch=(_w:WordMainRole,raw:string)=>raw==='main'
export function changeMainRole(_w:WordMainRole,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return undefined;return choices.some(c=>c[0]===action)?action:undefined}
export function wordMainRoleView(w:WordMainRole,raw:string):WordMainRoleView {const selected=known(raw)?raw:'';return{title:w.title,hint:w.hint,selected,visible:!!selected,claim:selected?`面粉：${choices.find(c=>c[0]===selected)![1]}`:'面粉的原料地位待选',reading:!selected?'比较main、only和否定表达，不猜比例。':selected==='main'?'对了，面粉是这种面条的主要原料；没有说是唯一原料。':w.wrong,choices:choices.map(([id,label])=>({id,label,selected:id===selected}))}}
