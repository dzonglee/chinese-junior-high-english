/** Selecting an imagined condition does not assert that a real place changed. */
export interface WordRiverImagine {title:string;hint:string;wrong:string;withoutAsset:string}
export interface WordRiverImagineView {title:string;hint:string;selected:string;imagined:boolean;withoutAsset:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
export const wordRiverImagineKey=(id:string)=>`workshopRiverImagine-${id}`
export function validWordRiverImagine(v:unknown):v is WordRiverImagine {if(!v||typeof v!=='object')return false;const w=v as WordRiverImagine;return w.withoutAsset==='lesson-village-imagined'&&[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function riverImagineMatch(raw:string):boolean{return raw==='without'}
export function changeRiverImagine(raw:string,action:string):string|undefined {if(action==='reset')return'';if(!['','with','without'].includes(raw))return undefined;return['with','without'].includes(action)?action:undefined}
export function wordRiverImagineView(w:WordRiverImagine,raw:string):WordRiverImagineView {const selected=['with','without'].includes(raw)?raw:'';return{title:w.title,hint:w.hint,selected,imagined:selected==='without',withoutAsset:w.withoutAsset,reading:selected==='without'?'想象对照：村庄没有河流；这不是说真实村庄已经发生了变化。':selected==='with'?'插画对照：村庄有河流；without 要求想象没有河流。':'先比较，再选出 without its river 的想象场景。',choices:[{id:'with',label:'有河流的对照图'},{id:'without',label:'想象没有河流'}].map(c=>({...c,selected:c.id===selected}))}}
