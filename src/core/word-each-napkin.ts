/** Original language comparison; code geometry is illustrative, not measured source data. */
export interface WordEachNapkin{title:string;hint:string;wrong:string}
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordEachNapkin(v:unknown):v is WordEachNapkin{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordEachNapkin;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)}
export const wordEachNapkinKey=(id:string)=>'workshopEachNapkin-'+id
const states=['','each','one','on']
export function changeEachNapkin(_w:WordEachNapkin,raw:string,action:string):string|undefined{if(action==='reset')return'';return states.includes(raw)&&states.slice(1).includes(action)?action:undefined}
export const eachNapkinMatch=(_w:WordEachNapkin,raw:string)=>raw==='each'
export function wordEachNapkinView(w:WordEachNapkin,raw:string){const state=states.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,plates:[{id:0,left:24},{id:1,left:70}],napkins:state===''?[]:(state==='one'?[{id:0,left:42,position:'beside'}]:[{id:0,left:state==='on'?24:42,position:state==='on'?'on':'beside'},{id:1,left:state==='on'?70:88,position:state==='on'?'on':'beside'}]),choices:states.slice(1).map((id,j)=>({id,label:['每个盘子旁边都放','只在一个盘子旁放','每个盘子里面都放'][j],selected:id===state})),reading:state===''?'两个盘子只作示例；先选摆法，未知不表示不用餐巾。':state==='each'?'示例里每个盘子旁边都有餐巾；each与beside都保留了。':state==='one'?'另一个盘子旁没有餐巾，丢掉each的范围。':'都有餐巾，但在盘内改变了beside。'}}

export type WordEachNapkinView=ReturnType<typeof wordEachNapkinView>
