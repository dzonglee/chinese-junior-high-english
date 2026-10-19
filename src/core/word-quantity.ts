/** A bounded set built by the learner; exact repetition is controlled by code. */
export interface WordQuantity {
 title:string;unit:string;pluralUnit:string;limit:number;answer:number;shape:'plant'|'egg'|'card'|'wheel'|'string'|'person'|'jar'|'shell';unitArt?:string;hint:string;wrong:string
}
export interface WordQuantityView {
 title:string;unit:string;count:number;ready:boolean;shape:WordQuantity['shape'];unitArt?:string;hint:string
 units:{id:string}[];canAdd:boolean;canRemove:boolean
}
export const wordQuantityKey=(id:string)=>`workshopQuantity-${id}`
export function validWordQuantity(value:unknown):value is WordQuantity {
 if(!value||typeof value!=='object')return false
 const q=value as WordQuantity,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(q.title,40)&&text(q.unit,20)&&text(q.pluralUnit,24)&&text(q.hint,100)&&text(q.wrong,140)
  &&Number.isInteger(q.limit)&&q.limit>=1&&q.limit<=8&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=q.limit
  &&['plant','egg','card','wheel','string','person','jar','shell'].includes(q.shape)
  &&(['plant','jar'].includes(q.shape)?typeof q.unitArt==='string'&&/^count-unit-[a-z0-9-]+$/.test(q.unitArt):q.unitArt===undefined)
}
export function quantityCount(q:WordQuantity,raw:string):number|undefined {
 return /^(?:0|[1-8])$/.test(raw)&&Number(raw)<=q.limit?Number(raw):undefined
}
export function changeQuantity(q:WordQuantity,raw:string,action:string):string|undefined {
 const n=quantityCount(q,raw)??0
 if(action==='clear')return '0'
 if(action==='add'&&n<q.limit)return String(n+1)
 if(action==='remove'&&n>0)return String(n-1)
 return undefined
}
export function wordQuantityView(q:WordQuantity,raw:string):WordQuantityView {
 const n=quantityCount(q,raw),count=n??0
 return {title:q.title,unit:count===1?q.unit:q.pluralUnit,count,ready:n!==undefined,shape:q.shape,...(q.unitArt?{unitArt:q.unitArt}:{}),hint:q.hint,
  units:Array.from({length:count},(_,i)=>({id:String(i)})),canAdd:count<q.limit,canRemove:count>0}
}
