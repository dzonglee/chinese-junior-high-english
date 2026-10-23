/** Exact instructional targets are rendered in code beside the sample title. */
export interface WordTitleArrow {title:string;hint:string;wrong:string}
export interface WordTitleArrowView {title:string;hint:string;choice:string;expanded:boolean;reading:string}
export const wordTitleArrowKey=(id:string)=>`workshopTitleArrow-${id}`
export function validWordTitleArrow(value:unknown):value is WordTitleArrow {if(!value||typeof value!=='object')return false;const w=value as WordTitleArrow,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,60)&&text(w.hint,110)&&text(w.wrong,140)}
export function titleArrowMatch(raw:string):boolean{return raw==='arrow'}
export function changeTitleArrow(action:string):string|undefined{return ['arrow','title'].includes(action)?action:action==='reset'?'':undefined}
export function wordTitleArrowView(w:WordTitleArrow,raw:string):WordTitleArrowView {const choice=['arrow','title'].includes(raw)?raw:'';return{title:w.title,hint:w.hint,choice,expanded:choice==='arrow',reading:choice==='arrow'?'已点击标题旁的小箭头，展开了示例地图。':choice==='title'?'点到了标题文字。原句要求点击它旁边的小箭头。':'点一下：标题文字，还是旁边的小箭头？'}}
