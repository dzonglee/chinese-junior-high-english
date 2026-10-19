/** Exact, local clock arithmetic for an authored vocabulary task. */
export interface WordClock {
 title:string;start:string;days:[string,string];intervals:number[];answer:number;hint:string;wrong:string
}
export interface WordClockView {
 title:string;startLabel:string;day:string;time:string;ready:boolean;hint:string
 hourStyle:string;minuteStyle:string;options:{id:string;label:string;selected:boolean}[]
}
export const wordClockKey=(id:string)=>`workshopClock-${id}`
export function validWordClock(value:unknown):value is WordClock {
 if(!value||typeof value!=='object')return false
 const c=value as WordClock,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(c.title,40)&&typeof c.start==='string'&&/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(c.start)
  &&Array.isArray(c.days)&&c.days.length===2&&c.days.every(d=>text(d,20))&&new Set(c.days).size===2
  &&Array.isArray(c.intervals)&&c.intervals.length>=2&&c.intervals.length<=5
  &&c.intervals.every(n=>Number.isInteger(n)&&n>=0&&n<=60)&&new Set(c.intervals).size===c.intervals.length
  &&Number.isInteger(c.answer)&&c.intervals.includes(c.answer)&&text(c.hint,100)&&text(c.wrong,100)
}
export function clockInterval(c:WordClock,raw:string):number|undefined {
 if(!/^(?:0|[1-9]\d?)$/.test(raw))return undefined
 const value=Number(raw);return c.intervals.includes(value)?value:undefined
}
export function wordClockView(c:WordClock,raw:string):WordClockView {
 const interval=clockInterval(c,raw),[hours,minutes]=c.start.split(':').map(Number)
 const total=hours*60+minutes+(interval??0),within=total%1440
 const time=`${String(Math.floor(within/60)).padStart(2,'0')}:${String(within%60).padStart(2,'0')}`
 return {title:c.title,startLabel:`${c.days[0]} ${c.start}`,day:c.days[Math.floor(total/1440)],time,ready:interval!==undefined,hint:c.hint,
  hourStyle:`transform:rotate(${(total%720)/2}deg);`,minuteStyle:`transform:rotate(${(total%60)*6}deg);`,
  options:c.intervals.map(n=>({id:String(n),label:n===0?'原时刻':`＋${n} 分钟`,selected:n===interval}))}
}
