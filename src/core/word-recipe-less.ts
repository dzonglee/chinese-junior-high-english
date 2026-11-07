/** Fictional relative bars illustrate less; no original grams or zero/nonzero amount inferred. */
export interface WordRecipeLess {title:string;hint:string;wrong:string}
export interface WordRecipeLessView {title:string;hint:string;selected:string;oldWidth:number;currentWidth:number|undefined;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const ids=['less','equal','more']as const,labels=['更少','一样多','更多']
const bounded=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordRecipeLess(v:unknown):v is WordRecipeLess {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordRecipeLess;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
const known=(s:string)=>s===''||ids.some(id=>id===s)
export const wordRecipeLessKey=(id:string)=>`workshopRecipeLess-${id}`
export const recipeLessMatch=(_w:WordRecipeLess,raw:string)=>raw==='less'
export function changeRecipeLess(_w:WordRecipeLess,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return;return ids.some(id=>id===action)?action:undefined}
export function wordRecipeLessView(w:WordRecipeLess,raw:string):WordRecipeLessView {const selected=known(raw)?raw:'';return{title:w.title,hint:w.hint,selected,oldWidth:60,currentWidth:selected?({less:30,equal:60,more:90}as const)[selected as typeof ids[number]]:undefined,reading:!selected?'先选这个食谱相对原食谱的用糖量。':selected==='less'?'示意中用糖更少，符合less；原句没有给克数，也不能确定是否完全不用糖。':'这项示意没有保留less表示的更少；比较对象是原来的食谱。',choices:ids.map((id,j)=>({id,label:labels[j],selected:selected===id}))}}
