/** Qualitative temperature and relative humidity are independently controlled. */
export const climateTemperatures=['cool','warm','hot'] as const
export const climateHumidities=['low','high'] as const
type Temperature=typeof climateTemperatures[number]
type Humidity=typeof climateHumidities[number]
export type WordClimate={title:string;hint:string;wrong:string}&({criterion:'temperature';answer:Temperature}|{criterion:'humidity';answer:Humidity})
export interface WordClimateView {title:string;hint:string;temperature:string;humidity:string;temperatureLabel:string;humidityLabel:string;temperatureStyle:string;humidityStyle:string;reading:string;chosen:boolean;temperatures:{id:Temperature;label:string;selected:boolean}[];humidities:{id:Humidity;label:string;selected:boolean}[]}
const temperatures=['凉爽 cool','温暖 warm','热 hot'],humidities=['较低 low','较高 high']
export const wordClimateKey=(id:string)=>`workshopClimate-${id}`
function parse(raw:string):{temperature:Temperature|'';humidity:Humidity|''} {
 const match=/^(cool|warm|hot|):(low|high|)$/.exec(raw)
 return match?{temperature:match[1] as Temperature|'',humidity:match[2] as Humidity|''}:{temperature:'',humidity:''}
}
export function validWordClimate(value:unknown):value is WordClimate {
 if(!value||typeof value!=='object')return false
 const w=value as WordClimate,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return text(w.title,40)&&text(w.hint,100)&&text(w.wrong,140)&&(w.criterion==='temperature'?climateTemperatures.includes(w.answer):w.criterion==='humidity'&&climateHumidities.includes(w.answer))
}
export function changeClimate(raw:string,action:string):string|undefined {
 if(action==='reset')return ''
 const state=parse(raw)
 if(climateTemperatures.some(t=>t===action))return action+':'+state.humidity
 if(climateHumidities.some(h=>h===action))return state.temperature+':'+action
 return undefined
}
export function climateMatches(w:WordClimate,raw:string):boolean {
 const state=parse(raw)
 return (w.criterion==='temperature'?state.temperature:state.humidity)===w.answer
}
export function wordClimateView(w:WordClimate,raw:string):WordClimateView {
 const state=parse(raw),t=climateTemperatures.indexOf(state.temperature as Temperature),h=climateHumidities.indexOf(state.humidity as Humidity)
 const temperatureLabel=t<0?'温度尚未设置':temperatures[t],humidityLabel=h<0?'湿度尚未设置':humidities[h]
 return {title:w.title,hint:w.hint,temperature:state.temperature,humidity:state.humidity,temperatureLabel,humidityLabel,temperatureStyle:`width:${t<0?0:[30,55,85][t]}%;`,humidityStyle:`width:${h<0?0:[25,80][h]}%;`,reading:`温度：${temperatureLabel}；空气相对湿度：${humidityLabel}。`,chosen:t>=0||h>=0,temperatures:climateTemperatures.map((id,i)=>({id,label:temperatures[i],selected:id===state.temperature})),humidities:climateHumidities.map((id,i)=>({id,label:humidities[i],selected:id===state.humidity}))}
}
