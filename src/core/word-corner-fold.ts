/** Fixed illustrative corner and middle; towards does not require exact arrival. */
export interface WordCornerFold {title:string;hint:string;wrong:string}
export interface WordCornerFoldView {title:string;hint:string;position:string;folded:boolean;targetX:number;targetY:number;reading:string}
const bounded=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordCornerFold(v:unknown):v is WordCornerFold{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordCornerFold;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordCornerFoldKey=(id:string)=>`workshopCornerFold-${id}`
const valid=(s:string)=>s===''||['short','centre','away'].includes(s)
export function cornerFoldMatch(_w:WordCornerFold,raw:string):boolean{return raw==='short'||raw==='centre'}
export function changeCornerFold(_w:WordCornerFold,raw:string,action:string):string|undefined{if(action==='reset')return'';if(!valid(raw)||!['short','centre','away'].includes(action))return undefined;return action}
export function wordCornerFoldView(w:WordCornerFold,raw:string):WordCornerFoldView{const position=valid(raw)?raw:'',n=position==='short'?32:position==='centre'?50:position==='away'?5:15;return{title:w.title,hint:w.hint,position,folded:position==='short'||position==='centre',targetX:n,targetY:n,reading:position==='short'?'示意角朝中间折了一点，方向符合towards；不必一定到中点。':position==='centre'?'示意角朝中间折到中点，也符合这个方向；句子没有要求必须到点。':position==='away'?'箭头朝外、离开中间，方向不符合towards the middle。':'先看标出的角和中点，再试着朝中间折。'}}
