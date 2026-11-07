/** Interpret the stated current maturity, without inferring cooking, colour or a percentage. */
export interface WordRipeNow {title:string;hint:string;wrong:string}
export interface WordRipeNowView {title:string;hint:string;selected:string;reading:string;parts:{label:string;text:string}[];choices:{id:string;label:string;selected:boolean}[]}
const options=[['notquite','还没完全成熟'],['ripe','已经完全成熟'],['cooked','还没煮熟']]as const
const known=(raw:string)=>raw===''||options.some(c=>c[0]===raw)
const bounded=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
export function validWordRipeNow(v:unknown):v is WordRipeNow {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordRipeNow;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordRipeNowKey=(id:string)=>`workshopRipeNow-${id}`
export const ripeNowMatch=(_w:WordRipeNow,raw:string)=>raw==='notquite'
export function changeRipeNow(_w:WordRipeNow,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return undefined;return options.some(c=>c[0]===action)?action:undefined}
export function wordRipeNowView(w:WordRipeNow,raw:string):WordRipeNowView {const selected=known(raw)?raw:'';return{title:w.title,hint:w.hint,selected,reading:!selected?'先比较not quite ripe yet的意思。':selected==='notquite'?'对了，现在还没完全成熟；not quite不等于完全没有开始成熟。':selected==='cooked'?'ripe说果实成熟，cooked才说烹饪熟了。':'完全成熟丢掉了not quite和yet。',parts:!selected?[]:selected==='notquite'?[{label:'对象',text:'The pears'},{label:'当前状态',text:'are not quite ripe yet'}]:selected==='ripe'?[{label:'所选解释',text:'fully ripe now'}]:[{label:'所选解释',text:'not cooked yet'}],choices:options.map(([id,label])=>({id,label,selected:id===selected}))}}
