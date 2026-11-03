/** Semantic speed comparison only; no calibrated speed, height, distance or real action. */
export interface WordSpeedMeaning {title:string;hint:string;wrong:string}
export interface WordSpeedMeaningView {title:string;hint:string;selected:string;chosen:boolean;reading:string;speedBarVisible:boolean;afterWidth:number;vertical:boolean;choices:{id:string;label:string;selected:boolean}[]}
const choices=[['reduce','让速度变慢'],['faster','让速度变快'],['height','只改成向下移动']]as const
const readings:Record<string,string>={reduce:'后一条比参照条短，只表示相对变慢，对应slow down；没有实际速度数值、距离或时间。',faster:'后一条比参照条长，表示相对加快，与slow down相反。',height:'竖直箭头表示向下的方向，不能说明速度减小；本句slow down要求减速，不是往低处移动。'}
export const wordSpeedMeaningKey=(id:string)=>`workshopSpeedMeaning-${id}`
export function validWordSpeedMeaning(value:unknown):value is WordSpeedMeaning {if(!value||Array.isArray(value)||typeof value!=='object')return false;const x=value as WordSpeedMeaning;return Object.keys(x).length===3&&Object.keys(x).every(k=>['title','hint','wrong'].includes(k))&&([[x.title,60],[x.hint,110],[x.wrong,140]]as const).every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n)}
const valid=(raw:string)=>raw===''||choices.some(c=>c[0]===raw)
export const speedMeaningMatch=(_x:WordSpeedMeaning,raw:string)=>raw==='reduce'
export function changeSpeedMeaning(_x:WordSpeedMeaning,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!valid(raw))return undefined;return choices.some(c=>c[0]===action)?action:undefined}
export function wordSpeedMeaningView(x:WordSpeedMeaning,raw:string):WordSpeedMeaningView {const selected=valid(raw)?raw:'';return{title:x.title,hint:x.hint,selected,chosen:!!selected,reading:selected?readings[selected]:'尚未选择变化；不会默认已经减速或把向下等同于变慢。',speedBarVisible:selected==='reduce'||selected==='faster',afterWidth:selected==='reduce'?32:selected==='faster'?82:0,vertical:selected==='height',choices:choices.map(([id,label])=>({id,label,selected:selected===id}))}}
