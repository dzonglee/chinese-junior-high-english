/** Closed, original language scenes. Coordinates illustrate relationships, never measurements. */
export type SceneTone='ink'|'muted'|'blue'|'teal'|'rose'|'white'
export interface SceneNode{id:string;kind:'rect'|'ellipse'|'line'|'label';x:number;y:number;width:number;height:number;tone:SceneTone;text?:string;outline?:boolean}
export interface SceneAxis{id:string;label:string;choices:{id:string;label:string}[]}
export interface SceneFrame{signature:string;reading:string;correct:boolean;nodes:SceneNode[]}
export interface WordSceneLab{id:string;title:string;hint:string;wrong:string;axes:SceneAxis[];frames:SceneFrame[]}
const identifier=(v:unknown):v is string=>typeof v==='string'&&/^[a-z][a-z0-9-]{0,30}$/.test(v)
const text=(v:unknown,max:number):v is string=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=max
const object=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v)
const keys=(v:Record<string,unknown>,required:string[],optional:string[]=[])=>required.every(k=>Object.prototype.hasOwnProperty.call(v,k))&&Object.keys(v).every(k=>required.includes(k)||optional.includes(k))
const finite=(v:unknown):v is number=>typeof v==='number'&&Number.isFinite(v)
const unique=(v:string[])=>new Set(v).size===v.length
const tones:SceneTone[]=['ink','muted','blue','teal','rose','white']
function validNode(v:unknown):v is SceneNode{
 if(!object(v)||!keys(v,['id','kind','x','y','width','height','tone'],['text','outline'])||!identifier(v.id)||typeof v.kind!=='string'||!['rect','ellipse','line','label'].includes(v.kind)||!tones.includes(v.tone as SceneTone))return false
 const{x,y,width,height}=v
 return finite(x)&&finite(y)&&finite(width)&&finite(height)&&x>=0&&y>=0&&width>=1&&height>=1&&x+width<=100&&y+height<=100&&(v.text===undefined||text(v.text,30))&&(v.outline===undefined||typeof v.outline==='boolean')&&(v.kind!=='label'||text(v.text,30))
}
export function sceneLabSignatures(axes:SceneAxis[]):string[]{let result=[''];for(const axis of axes){const values=['?',...axis.choices.map(c=>c.id)];result=result.flatMap(p=>values.map(v=>p?p+'|'+v:v))}return result}
export function validWordSceneLab(v:unknown):v is WordSceneLab{
 if(!object(v)||!keys(v,['id','title','hint','wrong','axes','frames'])||!identifier(v.id)||!text(v.title,60)||!text(v.hint,110)||!text(v.wrong,140)||!Array.isArray(v.axes)||v.axes.length<1||v.axes.length>2)return false
 if(!v.axes.every(a=>object(a)&&keys(a,['id','label','choices'])&&identifier(a.id)&&text(a.label,30)&&Array.isArray(a.choices)&&a.choices.length>=2&&a.choices.length<=3&&a.choices.every(c=>object(c)&&keys(c,['id','label'])&&identifier(c.id)&&text(c.label,30))&&unique(a.choices.map(c=>c.id))))return false
 const axes=v.axes as SceneAxis[];if(!unique(axes.map(a=>a.id)))return false
 const signatures=sceneLabSignatures(axes)
 if(!Array.isArray(v.frames)||v.frames.length!==signatures.length||!v.frames.every(f=>object(f)&&keys(f,['signature','reading','correct','nodes'])&&typeof f.signature==='string'&&signatures.includes(f.signature)&&text(f.reading,140)&&typeof f.correct==='boolean'&&(!f.correct||!f.signature.split('|').includes('?'))&&Array.isArray(f.nodes)&&f.nodes.length>=1&&f.nodes.length<=16&&f.nodes.every(validNode)&&unique(f.nodes.map(n=>n.id))))return false
 return unique(v.frames.map(f=>f.signature))&&v.frames.some(f=>f.correct)
}
export const wordSceneLabKey=(itemId:string)=>'workshopSceneLab-'+itemId
const unknownSignature=(w:WordSceneLab)=>w.axes.map(()=>'?').join('|')
function decode(w:WordSceneLab,raw:string):string[]|undefined{if(typeof raw!=='string')return undefined;const canonical=raw===''?unknownSignature(w):raw;if(raw!==''&&raw===unknownSignature(w))return undefined;const parts=canonical.split('|');return parts.length===w.axes.length&&parts.every((p,i)=>p==='?'||w.axes[i].choices.some(c=>c.id===p))?parts:undefined}
export function changeSceneLab(w:WordSceneLab,raw:string,action:string):string|undefined{
 if(!validWordSceneLab(w))return undefined
 if(action==='reset')return''
 const parts=decode(w,raw);if(!parts||typeof action!=='string')return undefined
 const found=w.axes.flatMap((a,i)=>a.choices.map(c=>({i,action:a.id+':'+c.id,value:c.id}))).find(a=>a.action===action)
 if(!found)return undefined
 parts[found.i]=found.value;return parts.join('|')
}
export function sceneLabMatch(w:WordSceneLab,raw:string):boolean{if(!validWordSceneLab(w))return false;const parts=decode(w,raw);return!!parts&&w.frames.some(f=>f.signature===parts.join('|')&&f.correct)}
export function wordSceneLabView(w:WordSceneLab,raw:string){
 if(!validWordSceneLab(w))return undefined
 const decoded=decode(w,raw),parts=decoded??w.axes.map(()=>'?'),frame=w.frames.find(f=>f.signature===parts.join('|'))!
 return{id:w.id,title:w.title,hint:w.hint,wrong:w.wrong,chosen:!!decoded&&!parts.includes('?'),correct:!!decoded&&frame.correct,reading:frame.reading,signature:frame.signature,groups:w.axes.map((a,i)=>({id:a.id,label:a.label,choices:a.choices.map(c=>({...c,action:a.id+':'+c.id,selected:parts[i]===c.id}))})),nodes:frame.nodes.map(n=>({...n,style:`left:${n.x}%;top:${n.y}%;width:${n.width}%;height:${n.height}%;`,className:'scene-node scene-'+n.kind+' scene-tone-'+n.tone+(n.outline?' scene-outline':'')}))}
}
export type WordSceneLabView=NonNullable<ReturnType<typeof wordSceneLabView>>
