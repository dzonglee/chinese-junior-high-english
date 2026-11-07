/** A local sample-file exercise; no real files are deleted or window closed. */
export interface WordFileDesk {mode:'save'|'backup';title:string;hint:string;wrong:string}
export interface WordFileDeskView {title:string;hint:string;mode:'save'|'backup';saved:boolean;backed:boolean;closed:boolean;deleted:boolean;originalVisible:boolean;backupVisible:boolean;reading:string;controls:{id:string;label:string;disabled:boolean}[]}
export const wordFileDeskKey=(id:string)=>`workshopFileDesk-${id}`
function state(w:WordFileDesk,raw:string){return /^[01]{4}$/.test(raw)?{saved:raw[0]==='1',backed:raw[1]==='1',closed:raw[2]==='1',deleted:raw[3]==='1'}:{saved:w.mode==='backup',backed:false,closed:false,deleted:false}}
const encode=(s:ReturnType<typeof state>)=>[s.saved,s.backed,s.closed,s.deleted].map(v=>v?'1':'0').join('')
export function validWordFileDesk(value:unknown):value is WordFileDesk {if(!value||typeof value!=='object')return false;const w=value as WordFileDesk,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return ['save','backup'].includes(w.mode)&&text(w.title,60)&&text(w.hint,110)&&text(w.wrong,140)}
export function fileDeskMatch(w:WordFileDesk,raw:string):boolean{return raw===(w.mode==='save'?'1010':'1101')}
export function changeFileDesk(w:WordFileDesk,raw:string,action:string):string|undefined {
 if(action==='reset')return'';const s=state(w,raw)
 if(w.mode==='save'){if(action==='save'&&!s.closed)s.saved=true;else if(action==='close'&&!s.closed)s.closed=true;else return undefined}
 else{if(action==='backup'&&!s.deleted)s.backed=true;else if(action==='delete'&&s.backed&&!s.deleted)s.deleted=true;else return undefined}
 return encode(s)
}
export function wordFileDeskView(w:WordFileDesk,raw:string):WordFileDeskView {
 const s=state(w,raw),reading=w.mode==='save'?(s.closed?(s.saved?'已先保存，再关闭示例窗口。':'没有先保存就关闭了。点“重新开始”再试。'):s.saved?'内容已保存，可以关闭示例窗口。':'示例窗口内有未保存的内容。先保存，还是先关闭？'):(s.deleted?'示例原文件已删除，备份副本仍保留。':s.backed?'已有备份，可以删除示例原文件。':'还没有备份，暂不能删除示例原文件。')
 return{title:w.title,hint:w.hint,mode:w.mode,...s,originalVisible:!s.deleted&&!s.closed,backupVisible:s.backed,reading,controls:[...(w.mode==='save'?[{id:'save',label:'保存内容',disabled:s.closed},{id:'close',label:'关闭示例窗口',disabled:s.closed}]:[{id:'backup',label:'建立备份',disabled:s.deleted},{id:'delete',label:'删除示例原文件',disabled:!s.backed||s.deleted}]),{id:'reset',label:'重新开始',disabled:false}]}
}
