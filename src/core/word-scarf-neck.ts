/** Original illustrative language model; no measured anatomy or temperature claims. */
export interface WordScarfNeck{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordScarfNeck(v:unknown):v is WordScarfNeck{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordScarfNeck;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordScarfNeckKey=(id:string)=>'workshopScarfNeck-'+id
function decode(raw:string){if(raw==='')return{"place": "?", "state": "?"};const m="^(\\?|neck|hands)\\|(\\?|warm|cold)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?|?"?{place:v[1],state:v[2]}:null}
export function changeScarfNeck(_w:WordScarfNeck,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["place-neck", "place-hands"].includes(action))return action.slice(6)+"|"+s.state;if(["state-warm", "state-cold"].includes(action))return s.place+"|"+action.slice(6);return undefined}
export function scarfNeckMatch(_w:WordScarfNeck,raw:string){const s=decode(raw);return!!s&&s.place==="neck"&&s.state==="warm"}
export function wordScarfNeckView(w:WordScarfNeck,raw:string){const s=decode(raw)??{"place": "?", "state": "?"};return{title:w.title,hint:w.hint,place:s.place,state:s.state,groups:[{label:"保暖的部位",choices:[{"id": "place-neck", "label": "脖子"}, {"id": "place-hands", "label": "双手"}].map(c=>({...c,selected:c.id==="place-"+s.place}))},{label:"状态",choices:[{"id": "state-warm", "label": "暖和"}, {"id": "state-cold", "label": "冰冷"}].map(c=>({...c,selected:c.id==="state-"+s.state}))}],reading:scarfNeckMatch(w,raw)?"围巾让我的脖子保持暖和；不是全身或具体温度。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordScarfNeckView=ReturnType<typeof wordScarfNeckView>
