/** Relative-width illustration for too wide; no source measurements or rotation are supplied. */
export interface WordWidthFit {title:string;hint:string;wrong:string}
export interface WordWidthFitView {title:string;hint:string;known:boolean;placement:string;boxStyle:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordWidthFitKey=(id:string)=>`workshopWidthFit-${id}`
const choice=(raw:string)=>raw==='narrow'||raw==='wide'?raw:''
export function validWordWidthFit(v:unknown):v is WordWidthFit {if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordWidthFit;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function widthFitMatch(raw:string):boolean{return raw==='wide'}
export function changeWidthFit(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!choice(raw))return undefined;return choice(action)||undefined}
export function wordWidthFitView(w:WordWidthFit,raw:string):WordWidthFitView {const selected=choice(raw);return{title:w.title,hint:w.hint,known:!!selected,placement:selected,boxStyle:selected==='narrow'?'left:29%;width:42%':selected==='wide'?'left:11%;width:78%':'',reading:selected==='wide'?'过宽：按当前摆法，箱子两侧超过架子开口。对应原句too wide，不是实际厘米数。':selected==='narrow'?'较窄的对照：箱子宽度小于开口。原句仍描述另一个过宽条件。':'先选箱子宽度，再比较两侧与开口。还没有选择，不能判断是否放得下。',choices:[{id:'narrow',label:'较窄 · 看对照',selected:selected==='narrow'},{id:'wide',label:'过宽 · 核对原句',selected:selected==='wide'}]}}
