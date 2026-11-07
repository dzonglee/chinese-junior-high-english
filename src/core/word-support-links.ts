/** Sentence-role links preserve the stated object and purpose, not an engineering assessment. */
export interface WordSupportLinks {title:string;hint:string;wrong:string}
export interface WordSupportLinksView {title:string;hint:string;reading:string;object:string;purpose:string;rows:{id:string;label:string;choices:{id:string;label:string;selected:boolean}[]}[]}
const ids=['bridge','cables','support'],labels=['the bridge','steel cables','support']
function parts(raw:string):string[]|undefined {if(raw==='')return['',''];const ps=raw.split('|');return ps.length===2&&ps.every(x=>x===''||ids.includes(x))?ps:undefined}
export const wordSupportLinksKey=(id:string)=>`workshopSupportLinks-${id}`
export function validWordSupportLinks(v:unknown):v is WordSupportLinks {if(!v||typeof v!=='object')return false;const w=v as WordSupportLinks;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function supportLinksMatch(raw:string):boolean{return raw==='cables|support'}
export function changeSupportLinks(raw:string,action:string):string|undefined {if(action==='reset')return'';const ps=parts(raw),a=action.split(':');if(!ps||a.length!==2||!['material','purpose'].includes(a[0])||!['clear',...ids].includes(a[1]))return undefined;ps[a[0]==='material'?0:1]=a[1]==='clear'?'':a[1];return ps.join('|')}
export function wordSupportLinksView(w:WordSupportLinks,raw:string):WordSupportLinksView {const ps=parts(raw)??['',''],name=(s:string)=>s?labels[ids.indexOf(s)]:'…';return{title:w.title,hint:w.hint,object:name(ps[0]),purpose:name(ps[1]),reading:ps.includes('')?'先补齐使用对象和用途，再连读整句。':supportLinksMatch(raw)?'The bridge uses steel cables for support：钢缆是使用对象，支撑是用途。':'两个位置都已填，再核对uses后使用什么、for后表示什么用途。',rows:['material','purpose'].map((id,i)=>({id,label:i===0?'使用什么？':'用来做什么？',choices:[...ids,'clear'].map((key,j)=>({id:id+':'+key,label:j<3?labels[j]:'撤回',selected:key!=='clear'&&ps[i]===key}))}))}}
