/** A stipulated three-member group illustrates everyone; the source supplies no actual group size. */
export interface WordEveryoneArrived {title:string;hint:string;wrong:string}
export interface WordEveryoneArrivedView {title:string;hint:string;known:boolean;all:boolean;reading:string;people:{id:string;label:string;arrived:boolean}[]}
const ids=['a','b','c']as const
export const wordEveryoneArrivedKey=(id:string)=>`workshopEveryoneArrived-${id}`
const canonical=(raw:string)=>raw===''||raw==='none'||/^(a|b|c|ab|ac|bc|abc)$/.test(raw)
export function validWordEveryoneArrived(v:unknown):v is WordEveryoneArrived {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordEveryoneArrived;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&([[w.title,60],[w.hint,110],[w.wrong,140]]as const).every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n)}
export const everyoneArrivedMatch=(raw:string)=>raw==='abc'
export function changeEveryoneArrived(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!canonical(raw))return;if(action==='none')return'none';if(!(ids as readonly string[]).includes(action))return;const present=new Set(raw==='none'?[]:raw.split(''));present.has(action)?present.delete(action):present.add(action);return ids.filter(id=>present.has(id)).join('')||'none'}
export function wordEveryoneArrivedView(w:WordEveryoneArrived,raw:string):WordEveryoneArrivedView {const known=canonical(raw)&&raw!=='',all=raw==='abc';return{title:w.title,hint:w.hint,known,all,reading:!known?'先点到达者，也可以选“都未到”。':all?'示例三人都到了，满足everyone arrives。原句没有要求立刻离开。':'示例还有人未到，还需等候。everyone要包括本组的每个人。',people:ids.map((id,i)=>({id,label:['甲','乙','丙'][i],arrived:known&&raw!=='none'&&raw.includes(id)}))}}
