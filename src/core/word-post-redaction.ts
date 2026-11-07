/** Fictional fields only. Local practice never publishes a post or requests real personal data. */
export interface WordPostRedaction {title:string;hint:string;wrong:string}
export interface WordPostRedactionView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean;text:string;masked:boolean}[]}
const fields=[{id:'phone',label:'个人电话',text:'虚构练习字段：个人电话'},{id:'address',label:'个人住址',text:'虚构练习字段：个人住址'},{id:'event',label:'活动信息',text:'The school art exhibition opens on Friday.'}]
const validRaw=(raw:string)=>raw===''||['0','1','2','3','4','5','6','7'].includes(raw)
export const wordPostRedactionKey=(id:string)=>`workshopPostRedaction-${id}`
export function validWordPostRedaction(v:unknown):v is WordPostRedaction {if(!v||typeof v!=='object')return false;const w=v as WordPostRedaction;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function postRedactionMatch(raw:string):boolean{return raw==='3'}
export function changePostRedaction(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!validRaw(raw))return undefined;const index=fields.findIndex(f=>f.id===action);return index<0?undefined:String(Number(raw)^(1<<index))}
export function wordPostRedactionView(w:WordPostRedaction,raw:string):WordPostRedactionView {const state=validRaw(raw)?raw:'';const mask=Number(state);return{title:w.title,hint:w.hint,state,reading:state==='3'?'个人电话与住址都已遮住，非个人的活动信息仍保留。这里只检查虚构练习，不会发布。':(mask&4)?'活动句不含个人信息，可以保留；再检查两个个人字段。':(mask&3)?'还要遮住另一项个人信息；不用清空活动句。':'遮住电话与住址字段，保留活动句；所有字段均为虚构练习。',choices:fields.map((f,i)=>({...f,selected:!!(mask&(1<<i)),masked:!!(mask&(1<<i))}))}}
