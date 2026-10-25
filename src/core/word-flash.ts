/** A schematic flash setting; no device camera, permission or photo is used. */
export interface WordFlash {title:string;hint:string;wrong:string}
export interface WordFlashView {title:string;hint:string;selected:string;active:boolean;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordFlashKey=(id:string)=>`workshopFlash-${id}`
export function validWordFlash(value:unknown):value is WordFlash {if(!value||typeof value!=='object')return false;const w=value as WordFlash;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function flashMatch(raw:string):boolean{return raw==='off'}
export function changeFlash(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!['','on','off'].includes(raw))return undefined;return ['on','off'].includes(action)?action:undefined}
export function wordFlashView(w:WordFlash,raw:string):WordFlashView {const selected=['on','off'].includes(raw)?raw:'';return{title:w.title,hint:w.hint,selected,active:selected==='on',reading:selected==='on'?'示意设置：闪光灯开启，不符合原句的限制。':selected==='off'?'示意设置：闪光灯关闭；其他拍照规定仍需另查。':'先选闪光灯设置；这里不会使用真实相机。',choices:[{id:'on',label:'开启闪光灯'},{id:'off',label:'关闭闪光灯'}].map(c=>({...c,selected:c.id===selected}))}}
