/** Schematic lines around a fruit stone, not an actual knife demonstration. */
export interface WordStoneSides{title:string;hint:string;wrong:string}
export interface WordStoneSidesView{title:string;hint:string;reading:string;lines:{id:string;left:number;through:boolean}[];choices:{id:string;label:string;selected:boolean}[]}
const names=['left','right','through']as const
const bounded=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordStoneSides(v:unknown):v is WordStoneSides{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordStoneSides;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordStoneSidesKey=(id:string)=>`workshopStoneSides-${id}`
function parse(raw:string):number|undefined{return raw===''?0:/^[1-7]$/.test(raw)?Number(raw):undefined}
export const stoneSidesMatch=(_w:WordStoneSides,raw:string)=>raw==='3'
export function changeStoneSides(_w:WordStoneSides,raw:string,action:string):string|undefined{if(action==='reset')return'';const n=parse(raw),i=names.findIndex(x=>x===action);if(n===undefined||i<0)return;const next=n^(1<<i);return next?String(next):''}
export function wordStoneSidesView(w:WordStoneSides,raw:string):WordStoneSidesView{const n=parse(raw)??0;return{title:w.title,hint:w.hint,reading:!n?'先在示意中选切线；stone在这里是果核。':n&4?'这条线穿过果核；on either side不是从核中间切。':n===3?'两条线位于果核两侧，保留on either side of the stone。':'只标了一侧；本句要求保留果核两侧。',lines:names.flatMap((id,j)=>n&(1<<j)?[{id,left:[32,68,50][j],through:j===2}]:[]),choices:names.map((id,j)=>({id,label:['核左侧','核右侧','穿过核'][j],selected:!!(n&(1<<j))}))}}
