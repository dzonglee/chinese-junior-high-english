/** Five fictional tiles explain scope; they are not the source project's measured completion. */
export interface WordNearlyFinish {title:string;hint:string;wrong:string}
export interface WordNearlyFinishView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean}[];cells:{id:string;done:boolean}[]}
const actions=['start','nearly','done'],labels=['尚未开始','差一点完成','全部完成']
export const wordNearlyFinishKey=(id:string)=>`workshopNearlyFinish-${id}`
export function validWordNearlyFinish(v:unknown):v is WordNearlyFinish {if(!v||typeof v!=='object')return false;const w=v as WordNearlyFinish;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function nearlyFinishMatch(raw:string):boolean{return raw==='nearly'}
export function changeNearlyFinish(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordNearlyFinishView(w:WordNearlyFinish,raw:string):WordNearlyFinishView {const state=actions.includes(raw)?raw:'';const count=state==='done'?5:state==='nearly'?4:0;return{title:w.title,hint:w.hint,state,reading:state==='nearly'?'还留有未完成的一格，说明接近完成而不是全部完成；五格只是虚构示意。':state==='done'?'五格全完成，漏掉了nearly所保留的未完成部分。':state==='start'?'一格也没完成，不能表示nearly finished。':'先切换虚构进度，找出接近完成但还没全部完成的状态。',choices:actions.map((id,i)=>({id,label:labels[i],selected:state===id})),cells:Array.from({length:5},(_,i)=>({id:String(i),done:i<count}))}}
