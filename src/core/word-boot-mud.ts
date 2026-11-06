/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordBootMud{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordBootMud(v:unknown):v is WordBootMud{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordBootMud;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordBootMudKey=(id:string)=>'workshopBootMud-'+id
function decode(raw:string){if(raw==='')return{"side": "?", "place": "?"};const m="^(\\?|right|left)\\|(\\?|in|on)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?|?"?{side:v[1],place:v[2]}:null}
export function changeBootMud(_w:WordBootMud,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["side-right", "side-left"].includes(action))return action.slice(5)+"|"+s.place;if(["place-in", "place-on"].includes(action))return s.side+"|"+action.slice(6);return undefined}
export function bootMudMatch(_w:WordBootMud,raw:string){const s=decode(raw);return!!s&&s.side==="right"&&s.place==="in"}
export function wordBootMudView(w:WordBootMud,raw:string){const s=decode(raw)??{"side": "?", "place": "?"};return{title:w.title,hint:w.hint,showBoot:s.side!=='?'&&s.place!=='?',bootLeft:s.side==='right'?72:28,bootTop:s.place==='in'?80:35,groups:[{label:"穿靴者的哪只靴子",choices:[{"id": "side-right", "label": "右靴"}, {"id": "side-left", "label": "左靴"}].map(c=>({...c,selected:c.id==="side-"+s.side}))},{label:"相对泥面的位置",choices:[{"id": "place-in", "label": "陷进泥里"}, {"id": "place-on", "label": "只在泥面上"}].map(c=>({...c,selected:c.id==="place-"+s.place}))}],reading:bootMudMatch(w,raw)?"右靴陷进泥里；原句没有给深度。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordBootMudView=ReturnType<typeof wordBootMudView>
