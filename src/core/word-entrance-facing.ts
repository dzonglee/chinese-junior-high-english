/** Fictional entrance orientation, not a real building plan or geographic bearing. */
export interface WordEntranceFacing {title:string;hint:string;wrong:string}
export interface WordEntranceFacingView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const actions=['toward', 'away', 'side'],labels=['朝向广场', '背向广场', '侧向广场']
export const wordEntranceFacingKey=(id:string)=>`workshopEntranceFacing-${id}`
export function validWordEntranceFacing(v:unknown):v is WordEntranceFacing {if(!v||typeof v!=='object')return false;const w=v as WordEntranceFacing;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function entranceFacingMatch(raw:string):boolean{return raw==='toward'}
export function changeEntranceFacing(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordEntranceFacingView(w:WordEntranceFacing,raw:string):WordEntranceFacingView {const state=actions.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,reading:state==='toward'?'正门朝向固定的广场，支持faces the square；不能扩大成所有入口，也不代表实际建筑。':state?'正门没有朝向广场；比较入口朝向与广场位置，不改动广场。':'先比较给出的条件，再选择。',choices:actions.map((id,i)=>({id,label:labels[i],selected:state===id}))}}
