/** Original illustrative language model; no measured anatomy or temperature claims. */
export interface WordFingerAway{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordFingerAway(v:unknown):v is WordFingerAway{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordFingerAway;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordFingerAwayKey=(id:string)=>'workshopFingerAway-'+id
function decode(raw:string){if(raw==='')return{"place": "?"};const m="^(\\?|away|touch|injury)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{place:v[1]}:null}
export function changeFingerAway(_w:WordFingerAway,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["place-away", "place-touch", "place-injury"].includes(action))return action.slice(6);return undefined}
export function fingerAwayMatch(_w:WordFingerAway,raw:string){const s=decode(raw);return!!s&&s.place==="away"}
export function wordFingerAwayView(w:WordFingerAway,raw:string){const s=decode(raw)??{"place": "?"};return{title:w.title,hint:w.hint,place:s.place,fingerLeft:s.place==='away'?12:s.place==='touch'?52:null,groups:[{label:"手指与边缘",choices:[{"id": "place-away", "label": "远离边缘"}, {"id": "place-touch", "label": "贴着边缘"}, {"id": "place-injury", "label": "已受伤的说法"}].map(c=>({...c,selected:c.id==="place-"+s.place}))}],reading:fingerAwayMatch(w,raw)?"手指远离锋利边缘；没有报告受伤，也没有距离数值。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordFingerAwayView=ReturnType<typeof wordFingerAwayView>
