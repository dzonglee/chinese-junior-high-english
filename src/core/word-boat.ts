/** A simple assembly task; its model does not establish a story's outcome or anybody's feelings. */
export interface WordBoat {title:string;hint:string;wrong:string}
export interface WordBoatView {title:string;hint:string;state:string;mast:boolean;sail:boolean;chosen:boolean;reading:string;choices:{id:string;label:string;selected:boolean;disabled:boolean}[]}
export const wordBoatKey=(id:string)=>`workshopBoat-${id}`
export function validWordBoat(value:unknown):value is WordBoat {if(!value||typeof value!=='object')return false;const w=value as WordBoat,text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max;return text(w.title,40)&&text(w.hint,110)&&text(w.wrong,140)}
export function boatMatches(raw:string):boolean {return raw==='mast-sail'}
export function changeBoat(raw:string,action:string):string|undefined {const state=['mast','mast-sail'].includes(raw)?raw:'';if(action==='reset')return'';if(action==='mast')return state?'':'mast';if(action==='sail')return state==='mast'?'mast-sail':state==='mast-sail'?'mast':'';return undefined}
export function wordBoatView(w:WordBoat,raw:string):WordBoatView {const state=['mast','mast-sail'].includes(raw)?raw:'',mast=!!state,sail=state==='mast-sail';return{title:w.title,hint:w.hint,state,mast,sail,chosen:!!state,reading:sail?'桅杆和帆已装到示意小船上。原句说造船时很开心，没有交代造船结果。':mast?'桅杆已装好，现在可以挂帆。':'船身已放好。先装桅杆，再挂帆。',choices:[{id:'mast',label:mast?'拆下桅杆':'装上桅杆',selected:mast,disabled:false},{id:'sail',label:sail?'取下帆':'挂上帆',selected:sail,disabled:!mast}]}}
