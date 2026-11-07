/** Fictional target alignment; no physical drilling dimensions or completed work are inferred. */
export interface WordExactAlignment {title:string;hint:string;wrong:string}
export interface WordExactAlignmentView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean}[];position:number;chosen:boolean}
const actions=['left','aligned','right'],labels=['向左偏','准确对齐','向右偏']
export const wordExactAlignmentKey=(id:string)=>`workshopExactAlignment-${id}`
export function validWordExactAlignment(v:unknown):v is WordExactAlignment {if(!v||typeof v!=='object')return false;const w=v as WordExactAlignment;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function exactAlignmentMatch(raw:string):boolean{return raw==='aligned'}
export function changeExactAlignment(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordExactAlignmentView(w:WordExactAlignment,raw:string):WordExactAlignmentView {const state=actions.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,chosen:!!state,position:state==='left'?25:state==='right'?75:50,reading:state==='aligned'?'实心点与固定的目标圈重合，表示准确对齐；没有提供实际尺寸，也不表示孔已打好。':state?'实心点偏离目标圈，不能把大概位置当成准确位置。':'先移动标记，比较偏移与准确对齐。',choices:actions.map((id,i)=>({id,label:labels[i],selected:state===id}))}}
