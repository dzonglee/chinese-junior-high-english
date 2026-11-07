/** Original illustrative language model; no measured anatomy or temperature claims. */
export interface WordHeadStill{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordHeadStill(v:unknown):v is WordHeadStill{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordHeadStill;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordHeadStillKey=(id:string)=>'workshopHeadStill-'+id
function decode(raw:string){if(raw==='')return{"action": "?", "time": "?"};const m="^(\\?|still|move)\\|(\\?|while|after)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?|?"?{action:v[1],time:v[2]}:null}
export function changeHeadStill(_w:WordHeadStill,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["action-still", "action-move"].includes(action))return action.slice(7)+"|"+s.time;if(["time-while", "time-after"].includes(action))return s.action+"|"+action.slice(5);return undefined}
export function headStillMatch(_w:WordHeadStill,raw:string){const s=decode(raw);return!!s&&s.action==="still"&&s.time==="while"}
export function wordHeadStillView(w:WordHeadStill,raw:string){const s=decode(raw)??{"action": "?", "time": "?"};return{title:w.title,hint:w.hint,action:s.action,time:s.time,groups:[{label:"头部动作要求",choices:[{"id": "action-still", "label": "保持不动"}, {"id": "action-move", "label": "不停摇头"}].map(c=>({...c,selected:c.id==="action-"+s.action}))},{label:"与量头盔的关系",choices:[{"id": "time-while", "label": "测量时"}, {"id": "time-after", "label": "测量后"}].map(c=>({...c,selected:c.id==="time-"+s.time}))}],reading:headStillMatch(w,raw)?"量头盔的同时，保持头部不动；只是要求，不是完成记录。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordHeadStillView=ReturnType<typeof wordHeadStillView>
