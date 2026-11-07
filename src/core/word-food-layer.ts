/** Change the jam layer only; diagram thickness is hypothetical and bread stays fixed. */
export interface WordFoodLayer {title:string;hint:string;wrong:string}
export interface WordFoodLayerView {title:string;hint:string;selected:string;jamHeight:number|undefined;breadHeight:number;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const ids=['thin','thick']as const,labels=['果酱涂薄','果酱涂厚']
const bounded=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordFoodLayer(v:unknown):v is WordFoodLayer {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordFoodLayer;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
const known=(s:string)=>s===''||ids.some(id=>id===s)
export const wordFoodLayerKey=(id:string)=>`workshopFoodLayer-${id}`
export const foodLayerMatch=(_w:WordFoodLayer,raw:string)=>raw==='thin'
export function changeFoodLayer(_w:WordFoodLayer,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return;return ids.some(id=>id===action)?action:undefined}
export function wordFoodLayerView(w:WordFoodLayer,raw:string):WordFoodLayerView {const selected=known(raw)?raw:'';return{title:w.title,hint:w.hint,selected,jamHeight:!selected?undefined:selected==='thin'?8:36,breadHeight:36,reading:!selected?'先选果酱涂薄还是涂厚；面包厚度保持不变。':selected==='thin'?'薄薄的果酱层说明spread thinly；这是要求示意，不是已经涂好的记录。':'这里的果酱层涂得厚，不符合thinly；改的是涂抹方式。',choices:ids.map((id,j)=>({id,label:labels[j],selected:selected===id}))}}
