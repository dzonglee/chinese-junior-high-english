/** A schematic comparison of arm position relative to the head. */
export interface WordArmPose {title:string;hint:string;wrong:string}
export interface WordArmPoseView {title:string;hint:string;position:string;reading:string;above:boolean;shoulders:boolean;down:boolean}
const bounded=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordArmPose(v:unknown):v is WordArmPose{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordArmPose;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordArmPoseKey=(id:string)=>`workshopArmPose-${id}`
const valid=(s:string)=>s===''||['above','shoulders','down'].includes(s)
export function armPoseMatch(_w:WordArmPose,raw:string):boolean{return raw==='above'}
export function changeArmPose(_w:WordArmPose,raw:string,action:string):string|undefined{if(action==='reset')return'';if(!valid(raw)||!['above','shoulders','down'].includes(action))return undefined;return action}
export function wordArmPoseView(w:WordArmPose,raw:string):WordArmPoseView{const position=valid(raw)?raw:'';return{title:w.title,hint:w.hint,position,above:position==='above',shoulders:position==='shoulders',down:position==='down',reading:position==='above'?'双臂在头部上方，对应above your head；slowly还要求慢慢伸展。':position==='shoulders'?'双臂在肩膀高度，还没到头部上方。':position==='down'?'双臂向下，和above your head的要求相反。':'先调双臂位置，再比较它们与头部的高低。'}}
