/** Schematic water levels teach unequal amounts without inventing measured requirements. */
export interface WordWaterPair {title:string;hint:string;wrong:string}
export interface WordWaterPairView {title:string;hint:string;sides:{id:string;label:string;chosen:boolean;level:string;fillStyle:string;choices:{id:string;label:string;selected:boolean}[]}[];reading:string}
export const wordWaterPairKey=(id:string)=>`workshopWaterPair-${id}`
function levels(raw:string):[number,number]|undefined {if(raw==='')return[0,0];if(!/^[0-3]:[0-3]$/.test(raw))return undefined;return raw.split(':').map(Number)as[number,number]}
export function validWordWaterPair(value:unknown):value is WordWaterPair {if(!value||typeof value!=='object')return false;const w=value as WordWaterPair;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function waterPairMatch(raw:string):boolean {const pair=levels(raw);return!!pair&&pair[0]>0&&pair[1]>0&&pair[0]!==pair[1]}
export function changeWaterPair(raw:string,action:string):string|undefined {if(action==='reset')return'';const pair=levels(raw);if(!pair||!/^[ab]:[1-3]$/.test(action))return undefined;pair[action[0]==='a'?0:1]=Number(action[2]);return pair.join(':')}
export function wordWaterPairView(w:WordWaterPair,raw:string):WordWaterPairView {const pair=levels(raw)??[0,0],names=['尚未选择','少量','中量','多量'];return{title:w.title,hint:w.hint,sides:pair.map((n,index)=>({id:index?'b':'a',label:index?'示意种子 B':'示意种子 A',chosen:n>0,level:names[n],fillStyle:`height:${n*25}%`,choices:[1,2,3].map(level=>({id:`${index?'b':'a'}:${level}`,label:names[level],selected:level===n}))})),reading:pair.includes(0)?'给两边都选水量，再比较。':pair[0]===pair[1]?'两边水量相同。':'两边水量不同。'}}
