/** A position exercise on a blank envelope front; the marker is not real postage. */
export interface WordStampPlacement {title:string;hint:string;wrong:string}
export interface WordStampPlacementView {title:string;hint:string;chosen:boolean;stampStyle:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordStampPlacementKey=(id:string)=>`workshopStampPlacement-${id}`
const corners=[['top-left','左上角',13,23],['top-right','右上角',74,23],['bottom-left','左下角',13,53],['bottom-right','右下角',74,53]] as const
export function validWordStampPlacement(value:unknown):value is WordStampPlacement{if(!value||typeof value!=='object')return false;const w=value as WordStampPlacement;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function stampPlacementMatch(raw:string):boolean{return raw==='top-right'}
export function changeStampPlacement(action:string):string|undefined{return action==='reset'?'':corners.some(c=>c[0]===action)?action:undefined}
export function wordStampPlacementView(w:WordStampPlacement,raw:string):WordStampPlacementView{const c=corners.find(c=>c[0]===raw);return{title:w.title,hint:w.hint,chosen:!!c,stampStyle:c?`left:${c[2]}%;top:${c[3]}%;width:13%;height:22%;`:'',reading:c?`示意邮票在${c[1]}。`:'还没有放置示意邮票。',choices:corners.map(c=>({id:c[0],label:c[1],selected:c[0]===raw}))}}
