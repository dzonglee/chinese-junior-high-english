/** Move only the named target in an instructional diagram; do not report real completion. */
export interface WordAppleRemoval {title:string;hint:string;wrong:string}
export interface WordAppleRemovalView {title:string;hint:string;selected:string;reading:string;visible:boolean;outside:boolean;claim:string;left:number;choices:{id:string;label:string;selected:boolean}[]}
const options=[['out','按要求拿出篮子'],['inside','继续留在篮子里'],['done','断定已经拿出']]as const
const known=(raw:string)=>raw===''||options.some(c=>c[0]===raw)
const bounded=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
export function validWordAppleRemoval(v:unknown):v is WordAppleRemoval {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordAppleRemoval;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordAppleRemovalKey=(id:string)=>`workshopAppleRemoval-${id}`
export const appleRemovalMatch=(_w:WordAppleRemoval,raw:string)=>raw==='out'
export function changeAppleRemoval(_w:WordAppleRemoval,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return undefined;return options.some(c=>c[0]===action)?action:undefined}
export function wordAppleRemovalView(w:WordAppleRemoval,raw:string):WordAppleRemovalView {const selected=known(raw)?raw:'',outside=selected==='out'||selected==='done';return{title:w.title,hint:w.hint,selected,visible:!!selected,outside,left:outside?78:30,claim:!selected?'先选方向与语气':selected==='out'?'操作要求 · 未报告完成':selected==='done'?'所选解释：已经完成（原句未报告）':'所选解释：仍留在里面',reading:!selected?'比较from的方向，并区分要求和完成记录。':selected==='out'?'对了，Remove…from要求把目标苹果拿出篮子；没有说已经做完。':selected==='inside'?'留在里面与Remove…from的方向相反。':'这是操作要求，不是已经拿出的记录。',choices:options.map(([id,label])=>({id,label,selected:id===selected}))}}
