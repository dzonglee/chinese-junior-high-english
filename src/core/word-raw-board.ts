/** Preview the requested board allocation; no real handling or completed action is inferred. */
export interface WordRawBoard {title:string;hint:string;wrong:string}
export interface WordRawBoardView {title:string;hint:string;selected:string;reading:string;food:string;boards:{id:string;label:string;food:boolean;other:boolean}[];choices:{id:string;label:string;selected:boolean}[]}
const options=[['separate','生肉 · 单独砧板'],['shared','生肉 · 共用砧板'],['cooked','熟肉 · 单独砧板']]as const
const known=(raw:string)=>raw===''||options.some(c=>c[0]===raw)
const bounded=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
export function validWordRawBoard(v:unknown):v is WordRawBoard {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordRawBoard;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordRawBoardKey=(id:string)=>`workshopRawBoard-${id}`
export const rawBoardMatch=(_w:WordRawBoard,raw:string)=>raw==='separate'
export function changeRawBoard(_w:WordRawBoard,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return undefined;return options.some(c=>c[0]===action)?action:undefined}
export function wordRawBoardView(w:WordRawBoard,raw:string):WordRawBoardView {const selected=known(raw)?raw:'';return{title:w.title,hint:w.hint,selected,food:selected==='cooked'?'熟肉 cooked meat':'生肉 raw meat',reading:!selected?'先选怎样分配，核对raw和separate。':selected==='separate'?'对了，生肉要用单独砧板；这里预览要求，不报告已完成。':selected==='shared'?'共用不是separate，原句要求单独使用。':'raw meat是生肉，不能换成cooked meat。',boards:[{id:'target',label:'目标砧板',food:!!selected,other:selected==='shared'},{id:'other',label:'对照用途',food:false,other:!!selected&&selected!=='shared'}],choices:options.map(([id,label])=>({id,label,selected:id===selected}))}}
