/** Labelled model distances, never physical screen measurements. */
export interface WordRuler {title:string;end:number;choices:number[];answer:number;unit:'cm';startLabel:string;markerLabel:string;hint:string;wrong:string}
export interface WordRulerView {title:string;ready:boolean;startLabel:string;markerLabel:string;reading:string;unit:string;markerStyle:string;spanStyle:string;hint:string;ticks:{id:string;label:string;major:boolean;style:string}[];choices:{id:string;label:string;selected:boolean}[]}
export const wordRulerKey=(id:string)=>`workshopRuler-${id}`
export function validWordRuler(value:unknown):value is WordRuler {
 if(!value||typeof value!=='object')return false
 const r=value as WordRuler,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(r.title,40)&&text(r.startLabel,30)&&text(r.markerLabel,30)&&text(r.hint,100)&&text(r.wrong,140)&&r.unit==='cm'
  &&Number.isInteger(r.end)&&r.end>=5&&r.end<=20&&Array.isArray(r.choices)&&r.choices.length>=2&&r.choices.length<=8
  &&r.choices.every((n,i)=>Number.isInteger(n)&&n>=0&&n<=r.end&&(!i||n>r.choices[i-1]))&&r.choices.includes(r.answer)
}
export function rulerDistance(r:WordRuler,raw:string):number|undefined {
 return /^(?:0|[1-9]\d?)$/.test(raw)&&r.choices.includes(Number(raw))?Number(raw):undefined
}
export function wordRulerView(r:WordRuler,raw:string):WordRulerView {
 const n=rulerDistance(r,raw),ready=n!==undefined
 return {title:r.title,ready,startLabel:r.startLabel,markerLabel:r.markerLabel,reading:ready?`0 → ${n} ${r.unit}`:'第二粒种子还没定位',unit:r.unit,markerStyle:`left:${100*(n??0)/r.end}%;`,spanStyle:`width:${100*(n??0)/r.end}%;`,hint:r.hint,
  ticks:Array.from({length:r.end+1},(_,n)=>({id:String(n),label:n%5===0||n===r.end?String(n):'',major:n%5===0||n===r.end,style:`left:${100*n/r.end}%;`})),
  choices:r.choices.map(n=>({id:String(n),label:`${n} ${r.unit}`,selected:n===rulerDistance(r,raw)}))}
}
