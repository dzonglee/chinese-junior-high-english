/** Original language comparison; code geometry is illustrative, not measured source data. */
export interface WordSpoonLength{title:string;hint:string;wrong:string}
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordSpoonLength(v:unknown):v is WordSpoonLength{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordSpoonLength;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)}
export const wordSpoonLengthKey=(id:string)=>'workshopSpoonLength-'+id
const states=['','long','short','amount']
export function changeSpoonLength(_w:WordSpoonLength,raw:string,action:string):string|undefined{if(action==='reset')return'';return states.includes(raw)&&states.slice(1).includes(action)?action:undefined}
export const spoonLengthMatch=(_w:WordSpoonLength,raw:string)=>raw==='long'
export function wordSpoonLengthView(w:WordSpoonLength,raw:string){const state=states.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,spoonWidth:state==='long'?80:state==='short'?45:null,quantityLabel:state==='amount'?'a spoonful：一勺的量':'',choices:states.slice(1).map((id,j)=>({id,label:['长勺这个器具','短勺这个器具','一勺的量'][j],selected:id===state})),reading:state===''?'先选长短或份量的解释；这里没有厘米数。':state==='long'?'long spoon是长勺；没有说明实际长多少或装了多少饮品。':state==='short'?'short改变了long所说的长短。':'spoonful说一勺的量；原句是用长勺搅拌，不是在报告份量。'}}

export type WordSpoonLengthView=ReturnType<typeof wordSpoonLengthView>
