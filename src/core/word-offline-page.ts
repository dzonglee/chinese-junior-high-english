/** A local demonstration of saving one sample page; it does not change networking. */
export interface WordOfflinePage {title:string;hint:string;wrong:string}
export interface WordOfflinePageView {title:string;hint:string;online:boolean;saved:boolean;opened:boolean;pageVisible:boolean;reading:string;networkLabel:string;canSave:boolean}
export const wordOfflinePageKey=(id:string)=>`workshopOfflinePage-${id}`
function state(raw:string){return /^[01]{3}$/.test(raw)?{online:raw[0]==='1',saved:raw[1]==='1',opened:raw[2]==='1'}:{online:true,saved:false,opened:false}}
const encode=(s:ReturnType<typeof state>)=>[s.online,s.saved,s.opened].map(v=>v?'1':'0').join('')
export function validWordOfflinePage(value:unknown):value is WordOfflinePage {if(!value||typeof value!=='object')return false;const w=value as WordOfflinePage,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,60)&&text(w.hint,110)&&text(w.wrong,140)}
export function offlinePageMatch(raw:string):boolean{return raw==='011'}
export function changeOfflinePage(raw:string,action:string):string|undefined{if(action==='reset')return'';const s=state(raw);if(action==='network'){s.online=!s.online;s.opened=false}else if(action==='save'){if(!s.online)return undefined;s.saved=true}else if(action==='open'){s.opened=s.online||s.saved}else return undefined;return encode(s)}
export function wordOfflinePageView(w:WordOfflinePage,raw:string):WordOfflinePageView {const s=state(raw),visible=s.opened&&(s.online||s.saved);return{title:w.title,hint:w.hint,...s,pageVisible:visible,canSave:s.online,networkLabel:s.online?'断开示意连接':'恢复示意连接',reading:!s.online&&!s.saved?'示意连接已断开，还没保存网页。先恢复连接并保存。':!s.online&&visible?'示意连接已断开；正在查看已保存的网页。':!s.online?'已保存网页，示意连接已断开。再点“打开网页”。':s.saved?'网页已保存到示意设备。断开连接，再试着打开。':visible?'正在在线查看网页，还没有保存副本。':'先打开示例网页，再保存并试着离线打开。'}}
