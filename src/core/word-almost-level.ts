/** Relative height only; no source volume, percentage or measured probability is supplied. */
export interface WordAlmostLevel {title:string;hint:string;wrong:string}
export interface WordAlmostLevelView {title:string;hint:string;state:string;known:boolean;fillStyle:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordAlmostLevelKey=(id:string)=>`workshopAlmostLevel-${id}`
const states=['low','near','top'],labels=['离顶端还远','快到顶，仍留空隙','已经到顶']
export function validWordAlmostLevel(v:unknown):v is WordAlmostLevel {if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).length!==3||Object.keys(v).some(k=>!['title','hint','wrong'].includes(k)))return false;const w=v as WordAlmostLevel;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function almostLevelMatch(raw:string):boolean{return raw==='near'}
export function changeAlmostLevel(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!states.includes(raw))return undefined;return states.includes(action)?action:undefined}
export function wordAlmostLevelView(w:WordAlmostLevel,raw:string):WordAlmostLevelView {const state=states.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,known:!!state,fillStyle:state==='low'?'height:25%':state==='near'?'height:87%':state==='top'?'height:100%':'',reading:state==='near'?'水面快到罐顶，仍有空隙：almost at the top。示意没有给出实际容量。':state==='top'?'水面已经到顶，漏掉了almost所保留的未达到部分。':state==='low'?'水面离罐顶还远，不符合almost at the top。':'先选择水位；还没有选择，不能把空白当作原句的水位。',choices:states.map((id,i)=>({id,label:labels[i],selected:id===state}))}}
