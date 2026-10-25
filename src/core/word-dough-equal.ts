/** Separately supplied fictional comparison; no actual source measurements are inferred. */
export interface WordDoughEqual {title:string;hint:string;wrong:string}
export interface WordDoughEqualView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const actions=['equal','unequal']
export const wordDoughEqualKey=(id:string)=>`workshopDoughEqual-${id}`
export function validWordDoughEqual(v:unknown):v is WordDoughEqual {if(!v||typeof v!=='object')return false;const w=v as WordDoughEqual;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function doughEqualMatch(raw:string):boolean{return raw==='equal'}
export function changeDoughEqual(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordDoughEqualView(w:WordDoughEqual,raw:string):WordDoughEqualView {const state=actions.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,reading:state==='equal'?'四段各占示意条的四分之一，既有四段，也保留相等。':'比较四段是否等宽；练习假设面团条厚薄均匀，不是实际重量。',choices:[{id:'equal',label:'四段等宽',selected:state==='equal'},{id:'unequal',label:'四段不等宽',selected:state==='unequal'}]}}
