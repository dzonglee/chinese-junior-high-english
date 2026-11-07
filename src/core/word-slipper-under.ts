/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordSlipperUnder{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordSlipperUnder(v:unknown):v is WordSlipperUnder{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordSlipperUnder;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordSlipperUnderKey=(id:string)=>'workshopSlipperUnder-'+id
function decode(raw:string){if(raw==='')return{"place": "?"};const m="^(\\?|under|on|beside)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{place:v[1]}:null}
export function changeSlipperUnder(_w:WordSlipperUnder,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["place-under", "place-on", "place-beside"].includes(action))return action.slice(6);return undefined}
export function slipperUnderMatch(_w:WordSlipperUnder,raw:string){const s=decode(raw);return!!s&&s.place==="under"}
export function wordSlipperUnderView(w:WordSlipperUnder,raw:string){const s=decode(raw)??{"place": "?"};return{title:w.title,hint:w.hint,showSlipper:s.place!=='?',slipperLeft:s.place==='beside'?83:40,slipperTop:s.place==='on'?40:136,groups:[{label:"拖鞋相对床的位置",choices:[{"id": "place-under", "label": "床底下"}, {"id": "place-on", "label": "床上"}, {"id": "place-beside", "label": "床边"}].map(c=>({...c,selected:c.id==="place-"+s.place}))}],reading:slipperUnderMatch(w,raw)?"一只拖鞋藏在床底下；没有给另一只的位置。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordSlipperUnderView=ReturnType<typeof wordSlipperUnderView>
