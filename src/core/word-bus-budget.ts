/** Fictional exercise amounts: reserve bus fare before planning a purchase. */
export interface WordBusBudget {title:string;total:number;fare:number;hint:string;wrong:string}
export interface WordBusBudgetView {title:string;hint:string;total:number;fare:number;reserved:number;available:number;ready:boolean;canReserve:boolean;canReturn:boolean;reading:string;bus:{id:string}[];shopping:{id:string}[]}
export const wordBusBudgetKey=(id:string)=>`workshopBusBudget-${id}`
export function validWordBusBudget(value:unknown):value is WordBusBudget {
 if(!value||typeof value!=='object')return false
 const b=value as WordBusBudget
 return [[b.title,60],[b.hint,120],[b.wrong,160]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))&&Number.isInteger(b.total)&&b.total>=2&&b.total<=12&&Number.isInteger(b.fare)&&b.fare>0&&b.fare<b.total
}
export function busBudgetCount(b:WordBusBudget,raw:string):number|undefined {return /^(?:0|[1-9]|1[0-2])$/.test(raw)&&Number(raw)<=b.total?Number(raw):undefined}
export function busBudgetMatch(b:WordBusBudget,raw:string):boolean {return busBudgetCount(b,raw)===b.fare}
export function changeBusBudget(b:WordBusBudget,raw:string,action:string):string|undefined {
 if(action==='reset')return''
 const n=raw===''?0:busBudgetCount(b,raw);if(n===undefined)return undefined
 if(action==='reserve'&&n<b.total)return String(n+1)
 if(action==='return'&&n>0)return String(n-1)
 return undefined
}
export function wordBusBudgetView(b:WordBusBudget,raw:string):WordBusBudgetView {
 const n=busBudgetCount(b,raw),reserved=n??0,available=b.total-reserved
 return{title:b.title,hint:b.hint,total:b.total,fare:b.fare,reserved,available,ready:n!==undefined,canReserve:reserved<b.total,canReturn:reserved>0,reading:`共 ${b.total} 元；已留车费 ${reserved} 元，还可安排 ${available} 元。`,bus:Array.from({length:reserved},(_,i)=>({id:String(i)})),shopping:Array.from({length:available},(_,i)=>({id:String(i)}))}
}
