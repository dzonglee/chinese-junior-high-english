/** A fictional observation-plan diagram, not a wildlife survey or sound measurement. */
export interface ComposeWatch {title:string;hint:string;wrong:string;pathLabel:string;nestLabel:string}
type Position='path'|'nest'
type Voice='quiet'|'loud'
const parse=(value:string):{position?:Position;voice?:Voice}=>{
 try{const x:unknown=JSON.parse(value);if(!x||Array.isArray(x)||typeof x!=='object')return {};const pairs=Object.entries(x);if(pairs.some(([k,v])=>k==='position'?v!=='path'&&v!=='nest':k==='voice'?v!=='quiet'&&v!=='loud':true))return {};return x as {position?:Position;voice?:Voice}}catch{return {}}
}
export const composeWatchKey=(id:string)=>'composeWatch-'+id
export const composeWatchPhotoKey=(id:string)=>'composeWatchPhoto-'+id
export function validComposeWatch(x:unknown):x is ComposeWatch {
 return !!x&&typeof x==='object'&&!Array.isArray(x)&&['title','hint','wrong','pathLabel','nestLabel'].every(k=>typeof(x as Record<string,unknown>)[k]==='string'&&!!((x as Record<string,unknown>)[k]as string).trim())&&Object.keys(x).every(k=>['title','hint','wrong','pathLabel','nestLabel'].includes(k))&&(x as ComposeWatch).pathLabel!==(x as ComposeWatch).nestLabel
}
export function composeWatchMatch(value:string):boolean {const x=parse(value);return x.position==='path'&&x.voice==='quiet'}
export function changeComposeWatch(value:string,action:string):string|undefined {
 if(action==='reset')return '{}'
 const found=/^(position|voice):(path|nest|quiet|loud|clear)$/.exec(action);if(!found)return undefined
 const x=parse(value),key=found[1]as'position'|'voice',v=found[2]
 if(v==='clear')delete x[key]
 else if(key==='position'&&(v==='path'||v==='nest'))x.position=v
 else if(key==='voice'&&(v==='quiet'||v==='loud'))x.voice=v
 else return undefined
 return JSON.stringify(x)
}
export function composeWatchView(m:ComposeWatch,value:string,photo:string){
 const x=parse(value),clear=photo==='clear'
 return {...m,position:x.position??'unknown',voice:x.voice??'unknown',pathSelected:x.position==='path',nestSelected:x.position==='nest',quietSelected:x.voice==='quiet',loudSelected:x.voice==='loud',photo:clear?'clear':'unclear',photoClear:clear,ready:composeWatchMatch(value),positionText:x.position==='path'?m.pathLabel:x.position==='nest'?m.nestLabel:'观察位置待选择',voiceText:x.voice==='quiet'?'计划安静观察':x.voice==='loud'?'计划大声交谈':'观察方式待选择'}
}
