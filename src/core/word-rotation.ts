/** Directed quarter turns. Coordinates and instructional labels come from code. */
export interface WordRotation {title:string;start:'up'|'right'|'down'|'left';direction:'left'|'right';choices:number[];answer:number;hint:string;wrong:string}
export interface WordRotationView {title:string;ready:boolean;reading:string;arrowStyle:string;orientation:string;hint:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordRotationKey=(id:string)=>`workshopRotation-${id}`
export function validWordRotation(value:unknown):value is WordRotation {
 if(!value||typeof value!=='object')return false
 const r=value as WordRotation,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(r.title,40)&&text(r.hint,100)&&text(r.wrong,140)&&['up','right','down','left'].includes(r.start)&&['left','right'].includes(r.direction)
  &&Array.isArray(r.choices)&&r.choices.length>=2&&r.choices.length<=4&&r.choices.every((n,i)=>[0,90,180,270].includes(n)&&(!i||n>r.choices[i-1]))&&r.choices.includes(r.answer)
}
export function rotationAngle(r:WordRotation,raw:string):number|undefined {
 return /^(?:0|90|180|270)$/.test(raw)&&r.choices.includes(Number(raw))?Number(raw):undefined
}
export function wordRotationView(r:WordRotation,raw:string):WordRotationView {
 const n=rotationAngle(r,raw),ready=n!==undefined,orientation=['up','right','down','left'],angle=(orientation.indexOf(r.start)*90+(r.direction==='left'?-1:1)*(n??0)+360)%360,name=['上','右','下','左'][angle/90],side=r.direction==='left'?'左':'右'
 return {title:r.title,ready,reading:ready?(n===0?'不转动':`向${side}转${n}°`)+` · 箭头向${name}`:'还没选择转角',arrowStyle:`transform:rotate(${angle}deg);`,orientation:orientation[angle/90],hint:r.hint,choices:r.choices.map(n=>({id:String(n),label:n===0?'不转动':`向${side}转${n}°`,selected:n===rotationAngle(r,raw)}))}
}
