/** Two controlled scene states support a vocabulary observation, without independent credit. */
export interface WordWeather {kind:'cloud'|'rain'|'snow'|'wind'|'thunder'|'lightning'|'fog'|'mist'|'hail'|'candle'|'breeze';initial:'active'|'calm';answer:'active'|'calm';title:string;hint:string;wrong:string}
export type WeatherMode='active'|'calm'|''
export interface WordWeatherView {kind:WordWeather['kind'];title:string;hint:string;mode:WeatherMode;observed:boolean;active:boolean;canObserve:boolean;reading:string;scene:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordWeatherKey=(id:string)=>`workshopWeather-${id}`
const kinds=['cloud','rain','snow','wind','thunder','lightning','fog','mist','hail','candle','breeze'] as const
const captions={cloud:['乌云移到太阳前','乌云移开'],rain:['持续下大雨','没有下雨'],snow:['落下新雪','没有下新雪'],wind:['起风','没有风'],thunder:["记录：一声响雷", "记录：保持安静"],lightning:["一次闪电", "没有闪电"],fog:["升起浓雾", "空气清晰"],mist:["薄雾从湖面升起", "没有薄雾"],hail:["换成固态冰雹", "液态雨水"],candle:["有气流吹向蜡烛", "没有气流吹向蜡烛"],breeze:["微风穿过窗户", "没有微风吹进来"]}
const sceneCaptions={cloud:['太阳被乌云遮住','太阳已露出来'],rain:['桶里已接满雨水','桶里还是空的'],snow:['旧脚印已被新雪盖住','地上能看见旧脚印'],wind:['落叶到了院子另一侧','落叶留在院子这侧'],thunder:["狗被惊醒了（文字记录）", "狗正在睡觉（文字记录）"],lightning:["闪电照亮远处山丘", "远处山丘仍在暗处"],fog:["浓雾挡住对岸的视线", "能清楚看见河对岸"],mist:["薄雾升在湖面上方", "湖面上方没有薄雾"],hail:["固态冰雹碰到屋顶后弹开", "液态雨水沿屋顶流下"],candle:["这次气流把火焰吹灭了", "蜡烛的火焰仍亮着"],breeze:["微风吹过，窗帘轻轻偏动", "窗户打开，窗帘静止"]}
const observedCaptions={cloud:['乌云遮住太阳；不是太阳本身变黑了。','乌云移开，太阳重新露出来。'],rain:['持续的大雨把原本空着的桶灌满了。','没有雨水落进来，桶仍是空的。'],snow:['新雪落在地面上，把原来的脚印盖住了。','没有新雪盖上来，原来的脚印仍能看见。'],wind:['风把落叶从院子一侧吹到了另一侧。','没有风吹，落叶仍留在原处。'],thunder:["文字记录：一声响雷，接着狗醒了。", "文字记录中保持安静，狗继续睡觉。"],lightning:["一次闪电把远处的山丘照亮了；手动切换一次结果。", "没有闪电，远处山丘仍在暗处。"],fog:["浓雾挡住了对岸的视线；对岸没有消失。", "空气清晰，对岸重新清楚可见。"],mist:["一层薄雾从湖面升起，在水面上方展开。", "没有薄雾从湖面升起，水面上方仍清楚。"],hail:["圆点表示固态冰雹；碰到金属屋顶后沿箭头弹开。", "雨水是液态，落到屋顶后流下，不是冰雹弹开。"],candle:["这次示例中，气流把蜡烛吹灭了；can不表示每次都必然如此。", "这次没有气流吹来，蜡烛仍亮着。"],breeze:["轻柔的气流穿过打开的窗户，窗帘轻轻偏动；没有暴风或破窗。", "窗户保持打开，但没有微风吹进来，窗帘静止。"]}
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
 return {scene:sceneCaptions[w.kind][active?0:1],kind:w.kind,title:w.title,hint:w.hint,...s,active,canObserve:!!s.mode&&!s.observed,reading:s.observed?observedCaptions[w.kind][s.mode==='active'?0:1]:s.mode?'条件已选好，开始观察前后的变化。':'先选一个条件，再开始观察。',choices: (['lightning','mist'].includes(w.kind)?['calm','active']:['active','calm']).map(id=>({id,label:labels[id==='active'?0:1],selected:s.mode===id}))}
}
