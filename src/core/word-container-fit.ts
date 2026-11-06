/** Hypothetical container and object bounds illustrate fit; no measured size or packed event. */
export interface WordContainerFit{title:string;hint:string;wrong:string}
export interface WordContainerFitView{title:string;hint:string;selected:string;reading:string;box:{left:number;top:number;width:number;height:number};banana:{left:number;top:number;width:number;height:number}|undefined;choices:{id:string;label:string;selected:boolean}[]}
const ids=['inside','too-large','beside']as const,labels=['完整放得下','太大，超出边界','只在旁边']
const bounded=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordContainerFit(v:unknown):v is WordContainerFit{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordContainerFit;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
const known=(s:string)=>s===''||ids.some(x=>x===s)
export const wordContainerFitKey=(id:string)=>`workshopContainerFit-${id}`
export const containerFitMatch=(_w:WordContainerFit,raw:string)=>raw==='inside'
export function changeContainerFit(_w:WordContainerFit,raw:string,action:string):string|undefined{if(action==='reset')return'';if(!known(raw))return;return ids.some(x=>x===action)?action:undefined}
export function wordContainerFitView(w:WordContainerFit,raw:string):WordContainerFitView{const selected=known(raw)?raw:'';return{title:w.title,hint:w.hint,selected,box:{left:50,top:70,width:45,height:110},banana:!selected?undefined:{left:selected==='inside'?58:selected==='too-large'?30:3,top:100,width:selected==='inside'?29:selected==='too-large'?68:35,height:40},reading:!selected?'先比较示意中的香蕉和饭盒；原句没有实测尺寸。':selected==='inside'?'香蕉可以完整放在饭盒内，符合fits neatly in；这不报告已经装好。':selected==='too-large'?'超出边界，表示放不下，与fits neatly相反。':'只在旁边没有保留in表示的内部容纳关系。',choices:ids.map((id,j)=>({id,label:labels[j],selected:selected===id}))}}
