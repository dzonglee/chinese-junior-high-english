/** Separately supplied fictional comparison; no actual source measurements are inferred. */
export interface WordLeafSimilar {title:string;hint:string;wrong:string}
export interface WordLeafSimilarView {title:string;hint:string;state:string;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const actions=['scaled','changed']
export const wordLeafSimilarKey=(id:string)=>`workshopLeafSimilar-${id}`
export function validWordLeafSimilar(v:unknown):v is WordLeafSimilar {if(!v||typeof v!=='object')return false;const w=v as WordLeafSimilar;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function leafSimilarMatch(raw:string):boolean{return raw==='scaled'}
export function changeLeafSimilar(raw:string,action:string):string|undefined {if(action==='reset')return'';if(raw!==''&&!actions.includes(raw))return undefined;return actions.includes(action)?action:undefined}
export function wordLeafSimilarView(w:WordLeafSimilar,raw:string):WordLeafSimilarView {const state=actions.includes(raw)?raw:'';return{title:w.title,hint:w.hint,state,reading:state==='scaled'?'只变大小仍保留外形，支持similar shape；不是实际叶片尺寸或物种。':'比较只缩放与换外形；形状相似不要求大小相同。',choices:[{id:'scaled',label:'只变大小',selected:state==='scaled'},{id:'changed',label:'换掉轮廓',selected:state==='changed'}]}}
