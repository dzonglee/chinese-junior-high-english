/** Schematic coverage of a supplied fictional study, never litter counts or a statistical sample estimate. */
export interface ComposeCoverage {title:string;hint:string;wrong:string;pathLabel:string;otherPlacesLabel:string;otherTimesLabel:string;afternoons:[string,string,string]}
type CoverageState={place?:'path'|'town';time?:'three'|'year'}
function parse(value:string):CoverageState {
 try{const x:unknown=JSON.parse(value);if(!x||Array.isArray(x)||typeof x!=='object')return {};if(Object.entries(x).some(([k,v])=>k==='place'?v!=='path'&&v!=='town':k==='time'?v!=='three'&&v!=='year':true))return {};return x as CoverageState}catch{return {}}
}
export const composeCoverageKey=(id:string)=>'composeCoverage-'+id
export function validComposeCoverage(x:unknown):x is ComposeCoverage {
 if(!x||Array.isArray(x)||typeof x!=='object')return false
 const m=x as ComposeCoverage,strings=['title','hint','wrong','pathLabel','otherPlacesLabel','otherTimesLabel']as const
 return Object.keys(m).every(k=>[...strings,'afternoons'].includes(k as typeof strings[number]))&&strings.every(k=>typeof m[k]==='string'&&!!m[k].trim()&&m[k]===m[k].trim()&&m[k].length<=({title:60,hint:110,wrong:140,pathLabel:30,otherPlacesLabel:40,otherTimesLabel:30}[k]))&&m.pathLabel!==m.otherPlacesLabel&&Array.isArray(m.afternoons)&&m.afternoons.length===3&&m.afternoons.every(t=>typeof t==='string'&&!!t.trim()&&t===t.trim()&&t.length<=24)&&new Set(m.afternoons).size===3
}
export function composeCoverageMatch(value:string):boolean {const s=parse(value);return s.place==='path'&&s.time==='three'}
export function changeComposeCoverage(value:string,action:string):string|undefined {
 if(action==='reset')return '{}'
 const found=/^(place|time):(path|town|three|year|clear)$/.exec(action);if(!found)return undefined
 const s=parse(value),key=found[1]as'place'|'time',v=found[2]
 if(v==='clear')delete s[key]
 else if(key==='place'&&(v==='path'||v==='town'))s.place=v
 else if(key==='time'&&(v==='three'||v==='year'))s.time=v
 else return undefined
 return JSON.stringify(s)
}
export function composeCoverageView(m:ComposeCoverage,value:string){
 const s=parse(value),complete=!!s.place&&!!s.time,columns=[...m.afternoons,m.otherTimesLabel]
 const rows=[m.pathLabel,m.otherPlacesLabel].map((place,row)=>({place,cells:columns.map((time,col)=>({id:row+'-'+col,place,time,observed:row===0&&col<3,claimed:complete&&(s.place==='town'||row===0)&&(s.time==='year'||col<3),label:row===0&&col<3?'有观察':'未观察'}))}))
 return {...m,columns,rows,place:s.place??'unknown',time:s.time??'unknown',pathSelected:s.place==='path',townSelected:s.place==='town',threeSelected:s.time==='three',yearSelected:s.time==='year',ready:composeCoverageMatch(value),claimedCells:rows.flatMap(r=>r.cells).filter(c=>c.claimed).length,placeText:s.place==='path'?m.pathLabel:s.place==='town'?'全镇范围':'地点范围待选择',timeText:s.time==='three'?'这三个下午':s.time==='year'?'全年范围':'时间范围待选择'}
}
