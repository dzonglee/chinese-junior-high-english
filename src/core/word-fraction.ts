/** Equal parts are controlled by code; generated art never sets a fraction boundary. */
export interface WordFraction {title:string;parts:2|4;answer:number;wholeLabel:string;hint:string;wrong:string}
export interface WordFractionView {title:string;wholeLabel:string;count:number;parts:number;ready:boolean;reading:string;hint:string;segments:{id:string;selected:boolean}[];canAdd:boolean;canRemove:boolean}
export const wordFractionKey=(id:string)=>`workshopFraction-${id}`
export function validWordFraction(value:unknown):value is WordFraction {
 if(!value||typeof value!=='object')return false
 const f=value as WordFraction,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(f.title,40)&&text(f.wholeLabel,40)&&text(f.hint,100)&&text(f.wrong,140)&&[2,4].includes(f.parts)&&Number.isInteger(f.answer)&&f.answer>=0&&f.answer<=f.parts
}
export function fractionCount(f:WordFraction,raw:string):number|undefined {
 return /^[0-4]$/.test(raw)&&Number(raw)<=f.parts?Number(raw):undefined
}
export function changeFraction(f:WordFraction,raw:string,action:string):string|undefined {
 const n=fractionCount(f,raw)??0
 if(action==='clear')return '0'
 if(action==='add'&&n<f.parts)return String(n+1)
 if(action==='remove'&&n>0)return String(n-1)
 return undefined
}
export function wordFractionView(f:WordFraction,raw:string):WordFractionView {
 const n=fractionCount(f,raw),count=n??0
 return {title:f.title,wholeLabel:f.wholeLabel,count,parts:f.parts,ready:n!==undefined,reading:`${count} / ${f.parts}`,hint:f.hint,segments:Array.from({length:f.parts},(_,i)=>({id:String(i),selected:i<count})),canAdd:count<f.parts,canRemove:count>0}
}
