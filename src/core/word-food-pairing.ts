/** Pair the source modifiers; no recipe amount, added sugar or completed mixing inferred. */
export interface WordFoodPairing {title:string;hint:string;wrong:string}
export interface WordFoodPairingView {title:string;hint:string;yoghurt:string;berries:string;reading:string;yoghurtChoices:{id:string;label:string;selected:boolean}[];berryChoices:{id:string;label:string;selected:boolean}[]}
const ys=['plain','flavoured'],bs=['fresh','dried'],yl=['原味酸奶','水果味酸奶'],bl=['新鲜浆果','干浆果']
const bounded=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
export function validWordFoodPairing(v:unknown):v is WordFoodPairing {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordFoodPairing;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
function parse(raw:string):string[]|undefined {if(raw==='')return['',''];const a=raw.split(':');return a.length===2&&(a[0]===''||ys.includes(a[0]))&&(a[1]===''||bs.includes(a[1]))?a:undefined}
export const wordFoodPairingKey=(id:string)=>`workshopFoodPairing-${id}`
export const foodPairingMatch=(_w:WordFoodPairing,raw:string)=>raw==='plain:fresh'
export function changeFoodPairing(_w:WordFoodPairing,raw:string,action:string):string|undefined {if(action==='reset')return'';const a=parse(raw);if(!a)return undefined;if(action.startsWith('yoghurt-')&&ys.includes(action.slice(8)))return[action.slice(8),a[1]].join(':');if(action.startsWith('berries-')&&bs.includes(action.slice(8)))return[a[0],action.slice(8)].join(':');return undefined}
export function wordFoodPairingView(w:WordFoodPairing,raw:string):WordFoodPairingView {const [yoghurt,berries]=parse(raw)??['',''];return{title:w.title,hint:w.hint,yoghurt,berries,reading:!yoghurt||!berries?'两种食物各选一张卡，再核对修饰词。':foodPairingMatch(w,raw)?'原味酸奶配新鲜浆果，保留plain与fresh；不是实际拌好的记录。':yoghurt!=='plain'?'plain说的是原味酸奶，不是水果味。':'fresh说的是新鲜浆果，不是干浆果。',yoghurtChoices:ys.map((id,j)=>({id:'yoghurt-'+id,label:yl[j],selected:yoghurt===id})),berryChoices:bs.map((id,j)=>({id:'berries-'+id,label:bl[j],selected:berries===id}))}}
