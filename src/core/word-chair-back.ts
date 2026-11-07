/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordChairBack{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordChairBack(v:unknown):v is WordChairBack{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordChairBack;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordChairBackKey=(id:string)=>'workshopChairBack-'+id
function decode(raw:string){if(raw==='')return{"place": "?"};const m="^(\\?|back|seat|floor)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{place:v[1]}:null}
export function changeChairBack(_w:WordChairBack,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["place-back", "place-seat", "place-floor"].includes(action))return action.slice(6);return undefined}
export function chairBackMatch(_w:WordChairBack,raw:string){const s=decode(raw);return!!s&&s.place==="back"}
export function wordChairBackView(w:WordChairBack,raw:string){const s=decode(raw)??{"place": "?"};return{title:w.title,hint:w.hint,garmentLeft:s.place==='?'?null:s.place==='floor'?80:s.place==='seat'?52:40,garmentTop:s.place==='?'?null:s.place==='back'?40:s.place==='seat'?65:78.5,groups:[{label:"毛衣留下的位置",choices:[{"id": "place-back", "label": "椅背上"}, {"id": "place-seat", "label": "椅面上"}, {"id": "place-floor", "label": "椅子后面的地面"}].map(c=>({...c,selected:c.id==="place-"+s.place}))}],reading:chairBackMatch(w,raw)?"毛衣留在椅背上，不是椅面或椅后地面。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordChairBackView=ReturnType<typeof wordChairBackView>
