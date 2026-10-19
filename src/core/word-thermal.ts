/** Example readings demonstrate a temperature change, not a source measurement. */
export const thermalStarts=[10,15,20] as const
export const thermalRises=[0,1,2] as const
export interface WordThermal {title:string;answer:typeof thermalRises[number];hint:string;wrong:string}
export interface WordThermalView {title:string;hint:string;chosen:boolean;start:number;rise:number|null;end:number|null;startStyle:string;endStyle:string;reading:string;starts:{id:string;label:string;selected:boolean}[];rises:{id:string;label:string;selected:boolean}[];ticks:{id:string;label:string;style:string}[]}
export const wordThermalKey=(id:string)=>`workshopThermal-${id}`
function parse(raw:string):{start:typeof thermalStarts[number];rise:typeof thermalRises[number]|null} {
 const match=/^(10|15|20):(0|1|2|)$/.exec(raw)
 return match?{start:Number(match[1]) as typeof thermalStarts[number],rise:match[2]===''?null:Number(match[2]) as typeof thermalRises[number]}:{start:10,rise:null}
}
export function validWordThermal(value:unknown):value is WordThermal {
 if(!value||typeof value!=='object')return false
 const w=value as WordThermal,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(w.title,40)&&text(w.hint,100)&&text(w.wrong,140)&&thermalRises.includes(w.answer)
}
export function changeThermal(raw:string,action:string):string|undefined {
 if(action==='reset')return ''
 const state=parse(raw)
 if(thermalStarts.some(t=>'start-'+t===action))return action.slice(6)+':'+(state.rise??'')
 if(thermalRises.some(t=>'rise-'+t===action))return state.start+':'+action.slice(5)
 return undefined
}
export function thermalMatches(w:WordThermal,raw:string):boolean {return parse(raw).rise===w.answer}
export function wordThermalView(w:WordThermal,raw:string):WordThermalView {
 const state=parse(raw),end=state.rise===null?null:state.start+state.rise
 return {title:w.title,hint:w.hint,chosen:state.rise!==null,start:state.start,rise:state.rise,end,startStyle:`height:${100*state.start/25}%;`,endStyle:`height:${100*(end??0)/25}%;`,reading:end===null?'先选择升高几度，再比较前后示例读数。':`${end} − ${state.start} = ${state.rise} degree${state.rise===1?'':'s'}`,starts:thermalStarts.map(n=>({id:'start-'+n,label:n+'°C',selected:state.start===n})),rises:thermalRises.map(n=>({id:'rise-'+n,label:n===0?'不变（0°C）':'升高 '+n+'°C',selected:state.rise===n})),ticks:[0,5,10,15,20,25].map(n=>({id:String(n),label:String(n),style:`bottom:${100*n/25}%;`}))}
}
