/** Compare a sentence's capability limit; never infer kilograms or a second person's ability. */
export interface WordHeavyForOne {title:string;hint:string;wrong:string}
export interface WordHeavyForOneView {title:string;hint:string;selected:string;reading:string;parts:{label:string;text:string}[];choices:{id:string;label:string;selected:boolean}[]}
const choices=[['too','一个人搬不动'],['easy','一个人轻松搬动'],['two','两个人一定搬得动']]as const
const known=(raw:string)=>raw===''||choices.some(c=>c[0]===raw)
const bounded=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
export function validWordHeavyForOne(v:unknown):v is WordHeavyForOne {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordHeavyForOne;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordHeavyForOneKey=(id:string)=>`workshopHeavyForOne-${id}`
export const heavyForOneMatch=(_w:WordHeavyForOne,raw:string)=>raw==='too'
export function changeHeavyForOne(_w:WordHeavyForOne,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return undefined;return choices.some(c=>c[0]===action)?action:undefined}
export function wordHeavyForOneView(w:WordHeavyForOne,raw:string):WordHeavyForOneView {const selected=known(raw)?raw:'';return{title:w.title,hint:w.hint,selected,reading:!selected?'先比较too heavy for one person的意思。':selected==='too'?'对了，too heavy for one person说重得一个人搬不动；没有给重量。':selected==='two'?'没有报告两个人的能力，不能推出一定成功。':'轻松搬动与too heavy for one person相反。',parts:selected?[{label:'程度',text:selected==='easy'?'light enough':'too heavy'},{label:'对象',text:selected==='two'?'two people — unknown':'for one person'}]:[],choices:choices.map(([id,label])=>({id,label,selected:id===selected}))}}
