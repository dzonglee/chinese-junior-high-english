/** A four-player touch condition is necessary for a score, not a guarantee of one. */
export interface ComposeTouches {title:string;hint:string;wrong:string;players:{id:string;label:string}[]}
export interface ComposeTouchesView {title:string;hint:string;players:{id:string;label:string;touched:boolean}[];count:number;before:boolean;ready:boolean;reading:string}
export const composeTouchesKey=(id:string)=>`workshopTouches-${id}`
const text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max
export function validComposeTouches(value:unknown):value is ComposeTouches {
 if(!value||typeof value!=='object')return false
 const w=value as ComposeTouches
 return text(w.title,60)&&text(w.hint,140)&&text(w.wrong,180)&&Array.isArray(w.players)&&w.players.length===4&&w.players.every(p=>p&&typeof p.id==='string'&&/^[a-z][a-z0-9-]{0,20}$/.test(p.id)&&!['reset','before','after'].includes(p.id)&&text(p.label,24))&&new Set(w.players.map(p=>p.id)).size===4
}
function state(w:ComposeTouches,raw:string):{before:boolean;ids:string[]}|undefined {
 if(raw==='')return{before:true,ids:[]}
 if(raw!==raw.trim())return
 const m=/^(before|after):(.*)$/.exec(raw);if(!m)return
 const ids=m[2]?m[2].split('|'):[]
 if(ids.length>4||new Set(ids).size!==ids.length||ids.some(id=>!w.players.some(p=>p.id===id)))return
 return{before:m[1]==='before',ids}
}
export function composeTouchesMatch(w:ComposeTouches,raw:string):boolean {const s=state(w,raw);return!!s&&s.before&&s.ids.length===4}
export function changeComposeTouches(w:ComposeTouches,raw:string,action:string):string|undefined {
 if(action==='reset')return''
 const s=state(w,raw);if(!s)return
 if(action==='before'||action==='after')return action+':'+s.ids.join('|')
 if(!w.players.some(p=>p.id===action))return
 const ids=w.players.map(p=>p.id).filter(id=>id===action?!s.ids.includes(id):s.ids.includes(id))
 return(s.before?'before:':'after:')+ids.join('|')
}
export function composeTouchesView(w:ComposeTouches,raw:string):ComposeTouchesView {
 const s=state(w,raw)??{before:true,ids:[]},ready=composeTouchesMatch(w,raw)
 return{title:w.title,hint:w.hint,players:w.players.map(p=>({...p,touched:s.ids.includes(p.id)})),count:s.ids.length,before:s.before,ready,reading:!s.before?'这些触球被放在得分后，不能满足得分前全员触球的规则。':ready?'4人都在得分前触球：只满足这条前提，不表示自动得分或每人得分相同。':`得分前已有${s.ids.length}/4人触球；同一人重复触球不能代替其他人。`}
}
