/** Original language comparison; code geometry is illustrative, not measured source data. */
export interface WordJamJar{title:string;hint:string;wrong:string}
const bound=(s:unknown,n:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n
export function validWordJamJar(v:unknown):v is WordJamJar{if(!v||typeof v!=='object'||Array.isArray(v))return false;const w=v as WordJamJar;return Object.keys(w).length===3&&Object.keys(w).every(k=>['title','hint','wrong'].includes(k))&&bound(w.title,60)&&bound(w.hint,110)&&bound(w.wrong,140)}
export const wordJamJarKey=(id:string)=>'workshopJamJar-'+id
function decode(raw:string){if(raw==='')return{clean:'?',place:'?'};const m=/^(\?|clean|dirty)\|(\?|inside|beside)$/.exec(raw);return m&&raw!=='?|?'?{clean:m[1],place:m[2]}:null}
export function changeJamJar(_w:WordJamJar,raw:string,action:string):string|undefined{if(action==='reset')return'';const s=decode(raw);if(!s)return undefined;if(['clean','dirty'].includes(action))return action+'|'+s.place;if(['inside','beside'].includes(action))return s.clean+'|'+action;return undefined}
export const jamJarMatch=(_w:WordJamJar,raw:string)=>raw==='clean|inside'
export function wordJamJarView(w:WordJamJar,raw:string){const s=decode(raw)??{clean:'?',place:'?'},choices=(ids:string[],labels:string[],selected:string)=>ids.map((id,j)=>({id,label:labels[j],selected:id===selected}));return{title:w.title,hint:w.hint,clean:s.clean,place:s.place,jamLeft:s.place==='?'?null:s.place==='inside'?38:82,groups:[{label:'容器状态',choices:choices(['clean','dirty'],['干净','脏的'],s.clean)},{label:'果酱位置',choices:choices(['inside','beside'],['在瓶里','在瓶旁边'],s.place)}],reading:s.clean==='?'||s.place==='?'?'干净与瓶内都要核对；没有报告实际保存时长。':s.clean==='dirty'?'clean要求干净容器，不能改成脏的。':s.place==='beside'?'in要求在瓶里，不能改成旁边。':'果酱在干净的广口瓶内；不补保存天数或温度。'}}

export type WordJamJarView=ReturnType<typeof wordJamJarView>
