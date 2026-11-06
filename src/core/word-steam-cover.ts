/** Lid position previews a steaming instruction, not an observed cooker or cooked result. */
export interface WordSteamCover {title:string;hint:string;wrong:string}
export interface WordSteamCoverView {title:string;hint:string;selected:string;reading:string;covered:boolean|undefined;lidTop:number;claim:string;choices:{id:string;label:string;selected:boolean}[]}
const options=[['on','盖好盖子蒸'],['off','揭开盖子蒸'],['done','断定已经蒸好']]as const
const known=(s:string)=>s===''||options.some(c=>c[0]===s),bounded=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordSteamCover(v:unknown):v is WordSteamCover {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordSteamCover;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordSteamCoverKey=(id:string)=>`workshopSteamCover-${id}`
export const steamCoverMatch=(_w:WordSteamCover,raw:string)=>raw==='on'
export function changeSteamCover(_w:WordSteamCover,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!known(raw))return undefined;return options.some(c=>c[0]===action)?action:undefined}
export function wordSteamCoverView(w:WordSteamCover,raw:string):WordSteamCoverView {const selected=known(raw)?raw:'',covered=selected?selected!=='off':undefined;return{title:w.title,hint:w.hint,selected,covered,lidTop:covered?36:4,claim:!selected?'还没选盖子状态':selected==='on'?'要求：盖着盖子蒸 · 未报告完成':selected==='off'?'所选要求：揭开盖子蒸':'所选解释：已经蒸好（原句未报告）',reading:!selected?'先选盖子状态与句子语气。':selected==='on'?'对了，with the lid on要求蒸饺子时盖好盖子；没有说已经蒸好。':selected==='off'?'off把盖好改成揭开，与on相反。':'Steam是操作要求，不能断定已经蒸好。',choices:options.map(([id,label])=>({id,label,selected:id===selected}))}}
