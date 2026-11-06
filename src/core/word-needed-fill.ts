/** Water levels are relative illustrations. Source supplies no litres, capacity or actual completion. */
export interface WordNeededFill{title:string;hint:string;wrong:string}
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordNeededFill(v:unknown):v is WordNeededFill{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordNeededFill;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)}
export const wordNeededFillKey=(id:string)=>'workshopNeededFill-'+id
const states=['','needed','less','more']
export function changeNeededFill(_w:WordNeededFill,raw:string,action:string):string|undefined{if(action==='reset')return'';return states.includes(raw)&&states.slice(1).includes(action)?action:undefined}
export const neededFillMatch=(_w:WordNeededFill,raw:string)=>raw==='needed'
export function wordNeededFillView(w:WordNeededFill,raw:string){const state=states.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,neededLine:50,level:state===''?null:state==='needed'?50:state==='less'?25:75,choices:['needed','less','more'].map((id,j)=>({id,label:['所需水量','比所需少','比所需多'][j],selected:id===state})),reading:state===''?'先选水量关系；示意线没有给出实际升数，问号不是零水量。':state==='needed'?'只装所需的水量；不能据此确定升数或一概装满。':state==='more'?'比需求多，丢掉了only的限制。':'比需求少，不是as much as you need所说的所需水量。'}}

export type WordNeededFillView=ReturnType<typeof wordNeededFillView>
