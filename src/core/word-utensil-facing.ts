/** Original language comparison; code geometry is illustrative, not measured source data. */
export interface WordUtensilFacing{title:string;hint:string;wrong:string}
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordUtensilFacing(v:unknown):v is WordUtensilFacing{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordUtensilFacing;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)}
export const wordUtensilFacingKey=(id:string)=>'workshopUtensilFacing-'+id
function decode(raw:string){if(raw==='')return{speaker:'?',handle:'?'};const m=/^(\?|left|right)\|(\?|left|right)$/.exec(raw);return m&&raw!=='?|?'?{speaker:m[1],handle:m[2]}:null}
export function changeUtensilFacing(_w:WordUtensilFacing,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(['speaker-left','speaker-right'].includes(action))return action.slice(8)+'|'+s.handle;if(['handle-left','handle-right'].includes(action))return s.speaker+'|'+action.slice(7);return undefined}
export function utensilFacingMatch(_w:WordUtensilFacing,raw:string){const s=decode(raw);return!!s&&s.speaker!=='?'&&s.handle===s.speaker}
export function wordUtensilFacingView(w:WordUtensilFacing,raw:string){const s=decode(raw)??{speaker:'?',handle:'?'},choices=(prefix:string,selected:string)=>['left','right'].map(id=>({id:prefix+'-'+id,label:(prefix==='speaker'?'说话者在':'刀柄朝')+(id==='left'?'左边':'右边'),selected:id===selected}));return{title:w.title,hint:w.hint,speaker:s.speaker,handle:s.handle,speakerLeft:s.speaker==='?'?null:s.speaker==='left'?10:90,handleLeft:s.handle==='?'?null:s.handle==='left'?30:70,groups:[{label:'示意说话者的位置',choices:choices('speaker',s.speaker)},{label:'刀柄的朝向',choices:choices('handle',s.handle)}],reading:s.speaker==='?'||s.handle==='?'?'先设说话者，再选刀柄朝向；未知不算完成。':s.speaker===s.handle?'刀柄朝向说话者，保留handle facing me；说话者换边时，刀柄也要跟着换边。':'刀刃一端朝向说话者，刀柄背向了me；应调整朝向。'}}

export type WordUtensilFacingView=ReturnType<typeof wordUtensilFacingView>
