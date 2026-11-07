/** Original language comparison; code geometry is illustrative, not measured source data. */
export interface WordStickThrough{title:string;hint:string;wrong:string}
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordStickThrough(v:unknown):v is WordStickThrough{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordStickThrough;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)}
export const wordStickThroughKey=(id:string)=>'workshopStickThrough-'+id
function decode(raw:string){if(raw==='')return{count:'?',path:'?'};const m=/^(\?|one|two)\|(\?|through|beside)$/.exec(raw);return m&&raw!=='?|?'?{count:m[1],path:m[2]}:null}
export function changeStickThrough(_w:WordStickThrough,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(['one','two'].includes(action))return action+'|'+s.path;if(['through','beside'].includes(action))return s.count+'|'+action;return undefined}
export const stickThroughMatch=(_w:WordStickThrough,raw:string)=>raw==='one|through'
export function wordStickThroughView(w:WordStickThrough,raw:string){const s=decode(raw)??{count:'?',path:'?'},choices=(ids:string[],labels:string[],selected:string)=>ids.map((id,j)=>({id,label:labels[j],selected:id===selected}));return{title:w.title,hint:w.hint,count:s.count,path:s.path,sticks:s.count==='?'?[]:Array.from({length:s.count==='one'?1:2},(_,id)=>({id,left:(s.path==='beside'?80:48)+id*7})),groups:[{label:'筷子数量',choices:choices(['one','two'],['一根','一双，两根'],s.count)},{label:'经过的位置',choices:choices(['through','beside'],['穿过洞','在洞旁边'],s.path)}],reading:s.count==='?'||s.path==='?'?'数量和路径都要选；没有选择不等于零根或没发生。':s.count==='two'?'One是一根，不是一双两根。':s.path==='beside'?'through要求穿过洞，不能改成在旁边。':'一根筷子从洞中滑过；图不补最终落在哪里。'}}

export type WordStickThroughView=ReturnType<typeof wordStickThroughView>
