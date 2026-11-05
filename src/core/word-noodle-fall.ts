/** Single-strand and completed motion contrast; no invented landing surface. */
export interface WordNoodleFall {title:string;hint:string;wrong:string}
export interface WordNoodleFallView {title:string;hint:string;selected:string;fallen:boolean;strands:{id:string}[];reading:string;choices:{id:string;label:string;selected:boolean}[]}
const choices=[['held','一根仍夹着'],['fallen','一根已滑落'],['many','多根已滑落']]as const
export const wordNoodleFallKey=(id:string)=>`workshopNoodleFall-${id}`
export function validWordNoodleFall(v:unknown):v is WordNoodleFall {if(!v||typeof v!=='object'||Array.isArray(v))return false;const x=v as WordNoodleFall;return Object.keys(x).length===3&&Object.keys(x).every(k=>['title','hint','wrong'].includes(k))&&([[x.title,60],[x.hint,110],[x.wrong,140]]as const).every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n)}
const valid=(raw:string)=>raw===''||choices.some(c=>c[0]===raw)
export const noodleFallMatch=(_x:WordNoodleFall,raw:string)=>raw==='fallen'
export function changeNoodleFall(_x:WordNoodleFall,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!valid(raw))return;return choices.some(c=>c[0]===action)?action:undefined}
export function wordNoodleFallView(x:WordNoodleFall,raw:string):WordNoodleFallView {const selected=valid(raw)?raw:'';return{title:x.title,hint:x.hint,selected,fallen:selected==='fallen'||selected==='many',strands:Array.from({length:selected==='many'?3:selected?1:0},(_,i)=>({id:String(i)})),reading:selected==='fallen'?'一根已从筷子上滑落，符合a long noodle slipped off。':selected==='held'?'数量是一根，但还夹着；没有保留slipped off。':selected==='many'?'这里画了多根，不符合原句a long noodle的一根。':'尚未选择；比较一根、多根与是否滑落。',choices:choices.map(([id,label])=>({id,label,selected:selected===id}))}}
