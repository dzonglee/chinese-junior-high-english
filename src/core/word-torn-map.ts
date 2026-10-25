/** Fictional map conditions distinguish damaged paper from unusable information. */
export interface WordTornMap {title:string;hint:string;wrong:string}
export interface WordTornMapView {title:string;hint:string;mode:string;torn:boolean;covered:boolean;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordTornMapKey=(id:string)=>`workshopTornMap-${id}`
const modes=['intact','corner','covered']
export function validWordTornMap(v:unknown):v is WordTornMap {if(!v||typeof v!=='object')return false;const w=v as WordTornMap;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function tornMapMatch(raw:string):boolean{return raw==='corner'}
export function changeTornMap(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!modes.includes(raw))return undefined;return modes.includes(action)?action:undefined}
export function wordTornMapView(w:WordTornMap,raw:string):WordTornMapView {const mode=modes.includes(raw)?raw:'';return{title:w.title,hint:w.hint,mode,torn:mode==='corner'||mode==='covered',covered:mode==='covered',reading:mode==='corner'?'纸角破了，但示意路线仍完整可读：torn，却 not useless。':mode==='covered'?'中间路线被遮住；这张图不能演示 still read it。':mode==='intact'?'完整纸张没有演示 torn；请找破损但仍可读的状态。':'切换另给示意图，找出破损但仍可读的状态。',choices:[{id:'intact',label:'完整图',selected:mode==='intact'},{id:'corner',label:'撕去纸角',selected:mode==='corner'},{id:'covered',label:'遮住路线',selected:mode==='covered'}]}}
