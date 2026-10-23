/** Simulated mobile ringtone controls; no device setting, audio or vibration claim. */
export interface WordPhoneMode {title:string;hint:string;wrong:string}
export interface WordPhoneModeView {title:string;hint:string;choice:string;chosen:boolean;powered:boolean;ringing:boolean;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const modes=['ring','silent','off'] as const
export const wordPhoneModeKey=(id:string)=>`workshopPhoneMode-${id}`
export function validWordPhoneMode(value:unknown):value is WordPhoneMode {if(!value||typeof value!=='object')return false;const w=value as WordPhoneMode,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,50)&&text(w.hint,110)&&text(w.wrong,140)}
export function changePhoneMode(action:string):string|undefined {return action==='reset'?'':modes.includes(action as typeof modes[number])?action:undefined}
export function phoneModeMatches(raw:string):boolean {return raw==='silent'}
export function wordPhoneModeView(w:WordPhoneMode,raw:string):WordPhoneModeView {const choice=modes.includes(raw as typeof modes[number])?raw:'';return{title:w.title,hint:w.hint,choice,chosen:!!choice,powered:choice==='ring'||choice==='silent',ringing:choice==='ring',reading:choice==='silent'?'示意手机：已设为静音，铃声关闭。未指定震动状态。':choice==='ring'?'示意手机：铃声开启；图书馆要求的是静音。':choice==='off'?'示意手机：已关机。关机和调成静音是不同操作。':'还没设置；按原句试一试。',choices:[{id:'ring',label:'响铃',selected:choice==='ring'},{id:'silent',label:'静音',selected:choice==='silent'},{id:'off',label:'关机',selected:choice==='off'}]}}
