/** Original illustrative language model; no measured anatomy or temperature claims. */
export interface WordFaceSplash{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordFaceSplash(v:unknown):v is WordFaceSplash{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordFaceSplash;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordFaceSplashKey=(id:string)=>'workshopFaceSplash-'+id
function decode(raw:string){if(raw==='')return{"water": "?", "place": "?"};const m="^(\\?|cold|hot)\\|(\\?|face|hand)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?|?"?{water:v[1],place:v[2]}:null}
export function changeFaceSplash(_w:WordFaceSplash,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["water-cold", "water-hot"].includes(action))return action.slice(6)+"|"+s.place;if(["place-face", "place-hand"].includes(action))return s.water+"|"+action.slice(6);return undefined}
export function faceSplashMatch(_w:WordFaceSplash,raw:string){const s=decode(raw);return!!s&&s.water==="cold"&&s.place==="face"}
export function wordFaceSplashView(w:WordFaceSplash,raw:string){const s=decode(raw)??{"water": "?", "place": "?"};return{title:w.title,hint:w.hint,water:s.water,place:s.place,groups:[{label:"水的描述",choices:[{"id": "water-cold", "label": "冷水"}, {"id": "water-hot", "label": "热水"}].map(c=>({...c,selected:c.id==="water-"+s.water}))},{label:"水溅到的部位",choices:[{"id": "place-face", "label": "脸"}, {"id": "place-hand", "label": "手"}].map(c=>({...c,selected:c.id==="place-"+s.place}))}],reading:faceSplashMatch(w,raw)?"冷水溅到脸上，没有给具体温度或受伤结果。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordFaceSplashView=ReturnType<typeof wordFaceSplashView>
