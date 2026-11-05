/** Relative readiness prediction, not an actual clock or guaranteed meal status. */
export interface WordMealReadiness {title:string;hint:string;wrong:string}
export interface WordMealReadinessView {title:string;hint:string;selected:string;reading:string;marker?:number;duration:boolean;choices:{id:string;label:string;selected:boolean}[]}
const choices=[['after','十分钟后准备好'],['duration','用餐持续十分钟'],['already','现在已经准备好']]as const
export const wordMealReadinessKey=(id:string)=>`workshopMealReadiness-${id}`
export function validWordMealReadiness(v:unknown):v is WordMealReadiness {if(!v||typeof v!=='object'||Array.isArray(v))return false;const x=v as WordMealReadiness;return Object.keys(x).length===3&&Object.keys(x).every(k=>['title','hint','wrong'].includes(k))&&([[x.title,60],[x.hint,110],[x.wrong,140]]as const).every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n)}
const valid=(raw:string)=>raw===''||choices.some(c=>c[0]===raw)
export const mealReadinessMatch=(_x:WordMealReadiness,raw:string)=>raw==='after'
export function changeMealReadiness(_x:WordMealReadiness,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!valid(raw))return;return choices.some(c=>c[0]===action)?action:undefined}
export function wordMealReadinessView(x:WordMealReadiness,raw:string):WordMealReadinessView {const selected=valid(raw)?raw:'';return{title:x.title,hint:x.hint,selected,reading:selected==='after'?'预计再过十分钟准备好：in ten minutes。':selected==='duration'?'这条带表示用餐时长；不是原句的就绪时间。':selected==='already'?'这表示现在已就绪；原句说的是将来。':'尚未选择；先看in ten minutes限定什么。',...(selected==='after'?{marker:75}:selected==='already'?{marker:25}:{}),duration:selected==='duration',choices:choices.map(([id,label])=>({id,label,selected:selected===id}))}}
