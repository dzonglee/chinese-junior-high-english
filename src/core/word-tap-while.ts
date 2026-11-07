/** Flow and simultaneous/after timing are independent requested conditions, not a real timer. */
export interface WordTapWhile {title:string;hint:string;wrong:string}
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordTapWhile(v:unknown):v is WordTapWhile{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordTapWhile;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)}
export const wordTapWhileKey=(id:string)=>'workshopTapWhile-'+id
function decode(raw:string){if(raw==='')return{flow:'?',phase:'?'};const m=/^(\?|off|on)\|(\?|during|after)$/.exec(raw);return m&&raw!=='?|?'?{flow:m[1],phase:m[2]}:null}
export function changeTapWhile(_w:WordTapWhile,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(['off','on'].includes(action))return action+'|'+s.phase;if(['during','after'].includes(action))return s.flow+'|'+action;return undefined}
export const tapWhileMatch=(_w:WordTapWhile,raw:string)=>raw==='off|during'
export function wordTapWhileView(w:WordTapWhile,raw:string){const s=decode(raw)??{flow:'?',phase:'?'},choices=(ids:string[],labels:string[],selected:string)=>ids.map((id,j)=>({id,label:labels[j],selected:id===selected}));return{title:w.title,hint:w.hint,flow:s.flow,phase:s.phase,drips:s.flow==='on',groups:[{label:'水龙头状态？',choices:choices(['off','on'],['关上','开着'],s.flow)},{label:'关水的时机？',choices:choices(['during','after'],['刷牙时','刷完以后'],s.phase)}],reading:s.flow==='?'||s.phase==='?'?'开关和时机都要选；这里不实际计时或报告动作已完成。':s.flow==='on'?'off要求关上，不是开着。':s.phase==='after'?'while要求刷牙时；刷完以后是after。':'关上水龙头，并保留刷牙时这个同时关系。'}}

export type WordTapWhileView=ReturnType<typeof wordTapWhileView>
