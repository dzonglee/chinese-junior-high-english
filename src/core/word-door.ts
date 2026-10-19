/** Compare an automatic closer with a person pushing, while nearby people stay unchanged. */
export interface WordDoor {title:string;people:string[];answer:'automatic'|'person';hint:string;wrong:string}
type DoorMode=''|'automatic'|'person'
type DoorPhase='ready'|'released'|'pushed'
export interface WordDoorView {title:string;people:{name:string;initial:string}[];mode:DoorMode;phase:DoorPhase;closed:boolean;ready:boolean;canRelease:boolean;canPush:boolean;reading:string;hint:string;modes:{id:string;label:string;selected:boolean}[]}
export const wordDoorKey=(id:string)=>`workshopDoor-${id}`
export function validWordDoor(value:unknown):value is WordDoor {
 if(!value||typeof value!=='object')return false
 const d=value as WordDoor,text=(v:unknown,n:number)=>typeof v==='string'&&!!v.trim()&&v===v.trim()&&v.length<=n
 return text(d.title,40)&&text(d.hint,120)&&text(d.wrong,140)&&['automatic','person'].includes(d.answer)&&Array.isArray(d.people)&&d.people.length>=1&&d.people.length<=2&&d.people.every(n=>text(n,16))&&new Set(d.people).size===d.people.length
}
export function doorState(raw:string):{mode:DoorMode;phase:DoorPhase} {
 if(!/^(?:automatic:(?:ready|released)|person:(?:ready|released|pushed))$/.test(raw))return {mode:'',phase:'ready'}
 const [mode,phase]=raw.split(':') as [Exclude<DoorMode,''>,DoorPhase];return {mode,phase}
}
export function changeDoor(raw:string,action:string):string|undefined {
 const s=doorState(raw)
 if(action==='automatic'||action==='person')return action+':ready'
 if(!s.mode)return undefined
 if(action==='reset')return s.mode+':ready'
 if(action==='release'&&s.phase==='ready')return s.mode+':released'
 if(action==='push'&&s.mode==='person'&&s.phase==='released')return 'person:pushed'
 return undefined
}
export function doorMatches(d:WordDoor,raw:string):boolean {
 const s=doorState(raw);return s.mode===d.answer&&s.phase===(d.answer==='automatic'?'released':'pushed')
}
export function wordDoorView(d:WordDoor,raw:string):WordDoorView {
 const s=doorState(raw),closed=s.mode==='automatic'&&s.phase==='released'||s.mode==='person'&&s.phase==='pushed'
 const reading=!s.mode?'先选关门方式，再松手观察。':s.phase==='ready'?'门已打开，旁边的人不碰门。':s.mode==='automatic'?'松手后，闭门器让门自行关上；旁边的人没有推门。':s.phase==='released'?'松手后门仍开着；旁边有人，不等于有人在推门。':'这次由人把门推关上，不是门自行关上。'
 return {title:d.title,people:d.people.map(name=>({name,initial:name.slice(0,1)})),...s,closed,ready:!!s.mode&&s.phase!=='ready',canRelease:!!s.mode&&s.phase==='ready',canPush:s.mode==='person'&&s.phase==='released',reading,hint:d.hint,modes:[{id:'automatic',label:'自动闭门',selected:s.mode==='automatic'},{id:'person',label:'手推关门',selected:s.mode==='person'}]}
}
