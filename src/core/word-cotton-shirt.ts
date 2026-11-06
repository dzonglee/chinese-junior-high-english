/** Original illustrative language model; no measured clothing or weather claims. */
export interface WordCottonShirt{title:string;hint:string;wrong:string}
const bounded=(x:unknown,n:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=n
export function validWordCottonShirt(v:unknown):v is WordCottonShirt{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordCottonShirt;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bounded(w.title,60)&&bounded(w.hint,110)&&bounded(w.wrong,140)}
export const wordCottonShirtKey=(id:string)=>'workshopCottonShirt-'+id
function decode(raw:string){if(raw==='')return{"material": "?"};const m="^(\\?|cotton|silk|wool)$";const v=new RegExp(m).exec(raw);return v&&raw!=="?"?{material:v[1]}:null}
export function changeCottonShirt(_w:WordCottonShirt,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(["material-cotton", "material-silk", "material-wool"].includes(action))return action.slice(9);return undefined}
export function cottonShirtMatch(_w:WordCottonShirt,raw:string){const s=decode(raw);return!!s&&s.material==="cotton"}
export function wordCottonShirtView(w:WordCottonShirt,raw:string){const s=decode(raw)??{"material": "?"};return{title:w.title,hint:w.hint,material:s.material,materialLabel:s.material==='cotton'?'棉 cotton':s.material==='silk'?'丝 silk':s.material==='wool'?'羊毛 wool':'材料待选',groups:[{label:"衬衫材料",choices:[{"id": "material-cotton", "label": "棉"}, {"id": "material-silk", "label": "丝"}, {"id": "material-wool", "label": "羊毛"}].map(c=>({...c,selected:c.id==="material-"+s.material}))}],reading:cottonShirtMatch(w,raw)?"原句给出棉制衬衫；没有给材料百分比。":Object.values(s).includes('?')?'每项各选一种解释；未知不算完成。':w.wrong}}
export type WordCottonShirtView=ReturnType<typeof wordCottonShirtView>
