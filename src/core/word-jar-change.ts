/** Separately supplied fictional comparison; no actual source measurements are inferred. */
export interface WordJarChange {title:string;hint:string;wrong:string;afterAsset:string}
export interface WordJarChangeView {title:string;hint:string;state:string;afterAsset:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const actions=['before','after']
export const wordJarChangeKey=(id:string)=>`workshopJarChange-${id}`
export function validWordJarChange(v:unknown):v is WordJarChange {if(!v||typeof v!=='object')return false;const w=v as WordJarChange;return w.afterAsset==='lesson-colourful-jar'&&[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function jarChangeMatch(raw:string):boolean{return raw==='after'}
export function changeJarChange(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordJarChangeView(w:WordJarChange,raw:string):WordJarChangeView {const state=actions.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,afterAsset:w.afterAsset,reading:state==='after'?'后来已变成彩色灯笼：became表示过去发生的变化。':'先前是普通罐子；切换到后来看看它变成什么。',choices:[{id:'before',label:'普通罐子',selected:state==='before'},{id:'after',label:'彩色灯笼',selected:state==='after'}]}}
