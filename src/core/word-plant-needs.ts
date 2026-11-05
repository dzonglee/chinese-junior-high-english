/** Supplied language requirements only; never a growth experiment or sufficient-condition model. */
export interface WordPlantNeeds {title:string;hint:string;wrong:string}
export interface WordPlantNeedsView {title:string;hint:string;selected:number;complete:boolean;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const terms=[['light','光照'],['water','水分']]as const
export const wordPlantNeedsKey=(id:string)=>`workshopPlantNeeds-${id}`
export function validWordPlantNeeds(value:unknown):value is WordPlantNeeds {if(!value||typeof value!=='object'||Array.isArray(value))return false;const x=value as WordPlantNeeds;return Object.keys(x).length===3&&Object.keys(x).every(k=>['title','hint','wrong'].includes(k))&&([[x.title,60],[x.hint,110],[x.wrong,140]]as const).every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n)}
function decode(raw:string):string[]|undefined {if(!raw)return[];const xs=raw.split('|'),canonical=terms.filter(t=>xs.includes(t[0])).map(t=>t[0]);return canonical.join('|')===raw?canonical:undefined}
export const plantNeedsMatch=(_x:WordPlantNeeds,raw:string)=>raw==='light|water'
export function changePlantNeeds(_x:WordPlantNeeds,raw:string,action:string):string|undefined {if(action==='reset')return'';const xs=decode(raw);if(!xs||!terms.some(t=>t[0]===action))return;const next=xs.includes(action)?xs.filter(x=>x!==action):[...xs,action];return terms.filter(t=>next.includes(t[0])).map(t=>t[0]).join('|')}
export function wordPlantNeedsView(x:WordPlantNeeds,raw:string):WordPlantNeedsView {const xs=decode(raw)??[],complete=plantNeedsMatch(x,raw);return{title:x.title,hint:x.hint,selected:xs.length,complete,reading:complete?'光照和水分两项需求都已圈出；不表示生长条件已经齐全，也不代表实际已满足。':xs.length?'只圈出一项，还缺as well as连接的另一项。':'尚未圈出需求；请在原句中找light和water。',choices:terms.map(([id,label])=>({id,label,selected:xs.includes(id)}))}}
