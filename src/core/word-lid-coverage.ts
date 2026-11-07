/** Requirement coverage only; not an actual cooker, temperature or safety measurement. */
export interface WordLidCoverage {title:string;hint:string;wrong:string}
export interface WordLidCoverageView {title:string;hint:string;selected:string;chosen:boolean;reading:string;coverageLeft:number;coverageWidth:number;choices:{id:string;label:string;selected:boolean}[]}
const choices=[['full','煮饭整段保持盖好'],['before','只在煮饭前盖好'],['partial','煮到一半就揭开']]as const
const readings:Record<string,string>={full:'盖好状态覆盖整段煮饭时间。这表示要求，不是实际记录。',before:'只在开始煮饭前盖好，未覆盖煮饭期间的保持要求。',partial:'只盖好前半段，后半段揭开了；没有保持到煮饭结束。'}
export const wordLidCoverageKey=(id:string)=>`workshopLidCoverage-${id}`
export function validWordLidCoverage(value:unknown):value is WordLidCoverage {if(!value||typeof value!=='object'||Array.isArray(value))return false;const x=value as WordLidCoverage;return Object.keys(x).length===3&&Object.keys(x).every(k=>['title','hint','wrong'].includes(k))&&([[x.title,60],[x.hint,110],[x.wrong,140]]as const).every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n)}
const valid=(raw:string)=>raw===''||choices.some(c=>c[0]===raw)
export const lidCoverageMatch=(_x:WordLidCoverage,raw:string)=>raw==='full'
export function changeLidCoverage(_x:WordLidCoverage,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!valid(raw))return;return choices.some(c=>c[0]===action)?action:undefined}
export function wordLidCoverageView(x:WordLidCoverage,raw:string):WordLidCoverageView {const selected=valid(raw)?raw:'';return{title:x.title,hint:x.hint,selected,chosen:!!selected,reading:readings[selected]??'尚未选择；不默认已盖好。',coverageLeft:selected==='before'?8:30,coverageWidth:selected==='full'?40:20,choices:choices.map(([id,label])=>({id,label,selected:selected===id}))}}
