/** Two controlled scene states support a vocabulary observation, without independent credit. */
export interface WordWeather {kind:'cloud'|'rain'|'snow'|'wind';initial:'active'|'calm';answer:'active'|'calm';title:string;hint:string;wrong:string}
export type WeatherMode='active'|'calm'|''
export interface WordWeatherView {kind:WordWeather['kind'];title:string;hint:string;mode:WeatherMode;observed:boolean;active:boolean;canObserve:boolean;reading:string;scene:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordWeatherKey=(id:string)=>`workshopWeather-${id}`
const kinds=['cloud','rain','snow','wind'] as const
const captions={cloud:['乌云移到太阳前','乌云移开'],rain:['持续下大雨','没有下雨'],snow:['落下新雪','没有下新雪'],wind:['起风','没有风']}
const sceneCaptions={cloud:['太阳被乌云遮住','太阳已露出来'],rain:['桶里已接满雨水','桶里还是空的'],snow:['旧脚印已被新雪盖住','地上能看见旧脚印'],wind:['落叶到了院子另一侧','落叶留在院子这侧']}
const observedCaptions={cloud:['乌云遮住太阳；不是太阳本身变黑了。','乌云移开，太阳重新露出来。'],rain:['持续的大雨把原本空着的桶灌满了。','没有雨水落进来，桶仍是空的。'],snow:['新雪落在地面上，把原来的脚印盖住了。','没有新雪盖上来，原来的脚印仍能看见。'],wind:['风把落叶从院子一侧吹到了另一侧。','没有风吹，落叶仍留在原处。']}
export function validWordWeather(value:unknown):value is WordWeather {
 if(!value||typeof value!=='object')return false
 const v=value as WordWeather,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
 return kinds.includes(v.kind)&&['active','calm'].includes(v.initial)&&['active','calm'].includes(v.answer)&&text(v.title,40)&&text(v.hint,100)&&text(v.wrong,140)
}
function state(raw:string):{mode:WeatherMode;observed:boolean}{return /^(active|calm):(ready|observed)$/.test(raw)?{mode:raw.startsWith('active:')?'active':'calm',observed:raw.endsWith(':observed')}:{mode:'',observed:false}}
export function changeWeather(raw:string,action:string):string|undefined {
 const s=state(raw)
 if(action==='active'||action==='calm')return action+':ready'
 if(action==='observe'&&s.mode&&!s.observed)return s.mode+':observed'
 if(action==='reset'&&s.mode)return s.mode+':ready'
 return undefined
}
export function weatherMatches(w:WordWeather,raw:string):boolean {const s=state(raw);return s.mode===w.answer&&s.observed}
export function wordWeatherView(w:WordWeather,raw:string):WordWeatherView {
 const s=state(raw),active=(s.observed?s.mode:w.initial)==='active',labels=captions[w.kind]
 return {scene:sceneCaptions[w.kind][active?0:1],kind:w.kind,title:w.title,hint:w.hint,...s,active,canObserve:!!s.mode&&!s.observed,reading:s.observed?observedCaptions[w.kind][s.mode==='active'?0:1]:s.mode?'条件已选好，开始观察前后的变化。':'先选一个条件，再开始观察。',choices:[{id:'active',label:labels[0],selected:s.mode==='active'},{id:'calm',label:labels[1],selected:s.mode==='calm'}]}
}
