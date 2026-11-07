/** Fictional instructional comparison, not a real museum policy or device check. */
export interface WordGateFirm {title:string;hint:string;wrong:string}
export interface WordGateFirmView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const actions=['open', 'shut', 'latched'],labels=['敞开', '合上未闩', '合上闩好']
export const wordGateFirmKey=(id:string)=>`workshopGateFirm-${id}`
export function validWordGateFirm(v:unknown):v is WordGateFirm {if(!v||typeof v!=='object')return false;const w=v as WordGateFirm;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function gateFirmMatch(raw:string):boolean{return raw==='latched'}
export function changeGateFirm(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordGateFirmView(w:WordGateFirm,raw:string):WordGateFirmView {const state=actions.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,reading:state==='latched'?'示意门合上且闩好，支持firmly closed；这仍是练习指令，不是实际设备检查报告。':state?'还不能表示关牢；比较关门与闩好两个条件。':'先比较给出的条件，再选择。',choices:actions.map((id,i)=>({id,label:labels[i],selected:state===id}))}}
