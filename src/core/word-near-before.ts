/** Relative timing only; schematic spacing is not a measured duration. */
export interface WordNearBefore {title:string;hint:string;wrong:string}
export interface WordNearBeforeView {title:string;hint:string;chosen:boolean;selected:string;positionStyle:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordNearBeforeKey=(id:string)=>`workshopNearBefore-${id}`
export function validWordNearBefore(v:unknown):v is WordNearBefore{if(!v||typeof v!=='object'||Array.isArray(v))return false;const x=v as WordNearBefore;return Object.keys(x).length===3&&Object.keys(x).every(k=>['title','hint','wrong'].includes(k))&&([[x.title,60],[x.hint,110],[x.wrong,140]]as const).every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n)}
const cases=[{id:'near-before',label:'上桌前不久',position:'left:52%;',reading:'对了，先加汁，接着上桌。just before表示时间很接近，没给具体分钟数。'},{id:'far-before',label:'上桌前很久',position:'left:14%;',reading:'虽然也在上桌前，却隔得很久，没有保留just。'},{id:'after',label:'上桌以后',position:'left:88%;',reading:'after是之后；原句just before是之前不久。'}]as const
export function nearBeforeMatch(_x:WordNearBefore,raw:string){return raw==='near-before'}
export function changeNearBefore(_x:WordNearBefore,raw:string,action:string):string|undefined{if(action==='reset')return'';if(raw&&!cases.some(c=>c.id===raw))return;return cases.some(c=>c.id===action)?action:undefined}
export function wordNearBeforeView(x:WordNearBefore,raw:string):WordNearBeforeView{const c=cases.find(c=>c.id===raw);return{title:x.title,hint:x.hint,chosen:!!c,selected:c?.id??'',positionStyle:c?.position??'',reading:c?.reading??'先选加汁时间，看看它离上桌有多近。',choices:cases.map(o=>({id:o.id,label:o.label,selected:o.id===c?.id}))}}
