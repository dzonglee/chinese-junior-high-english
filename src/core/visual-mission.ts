import {mapWorkshop} from './lesson-workshop'
import{editionText,type Spelling}from'./spelling'
import type {TeachingProgress} from './lesson-teaching'
export interface MissionChip {id:string;text:string}
export interface MissionSlot {id:string;label:string;text:string;answer:string;reason:string;hint:string;initial?:string}
export interface MissionBoard {id:string;title:string;instruction:string;kind:'context'|'repair'|'evidence'|'storyboard'|'sound';slots:MissionSlot[];chips:MissionChip[];material?:string;conclusion?:string;diagram:string;reusable?:boolean;wrongReasons?:Record<string,string>}
export interface VisualMission {workshop?: import('./lesson-workshop').LessonWorkshop;title:string;subtitle:string;art?:string;boards:MissionBoard[];sourceIds:string[];lab?:{title:string;states:{label:string;before:string;focus:string;after:string;note:string}[]}}
export interface MissionView {displayText:string;nativeContext:string;pitch:string;goal:string;doneBoards:boolean[];lab?:{open:boolean;title:string;index:number;states:{label:string}[];before:string;focus:string;after:string;note:string};recall:boolean;recallValue:string;recallChecked:boolean;recallCorrect:boolean;ownLine:string;activePlaced:string;activeDone:boolean;open:boolean;title:string;subtitle:string;art?:string;index:number;total:number;board:MissionBoard;active:MissionSlot;slots:(MissionSlot&{selected:boolean;placed:string;done:boolean})[];chips:(MissionChip&{used:boolean;selected:boolean})[];feedback:string;correct:boolean;hint:boolean;materialOpen:boolean;boardDone:boolean;allDone:boolean;completed:number}
const safeIndex=(value:string|undefined,length:number)=>{const n=Number(value);return Number.isInteger(n)&&n>=0&&n<length?n:0}
const slotKey=(board:MissionBoard,slot:MissionSlot)=>`visual-${board.id}-${slot.id}`
export function missionView(m:VisualMission,p:TeachingProgress):MissionView {
 const index=safeIndex(p.answers.visualBoard,m.boards.length),board=m.boards[index],active=board.slots.find(s=>s.id===p.answers.visualSlot)??board.slots.find(s=>!p.checked[slotKey(board,s)])??board.slots[0]
 const slots=board.slots.map(s=>({...s,selected:s.id===active.id,placed:board.chips.find(c=>c.id===p.answers[slotKey(board,s)])?.text??'',done:!!p.checked[slotKey(board,s)]})),done=(b:MissionBoard)=>b.slots.every(s=>p.checked[slotKey(b,s)])
 const last=p.answers.visualLast,selected=board.chips.find(c=>c.id===last),key=slotKey(board,active),checked=typeof p.checked.visualLast==='boolean'
 const labIndex=safeIndex(p.answers.visualLab,m.lab?.states.length??1),lab=m.lab?{open:p.answers.visualLabPane!=='repair',title:m.lab.title,index:labIndex,states:m.lab.states,...m.lab.states[labIndex]}:undefined
 const targetWord=board.chips.find(c=>c.id===active.answer)!.text
 const pitch=active.text.includes('↗')?'rise':active.text.includes('↘')?'fall':'',displayText=active.text.replace(/↗/g,'（升调）').replace(/↘/g,'（降调）'),placed=slots.find(s=>s.selected)!.placed
 const nativeContext=displayText.replace(/_+/g,board.kind==='context'?p.checked.visualRecall?'___':placed||'___':board.kind==='repair'?placed||active.initial||'___':'___')
 return{displayText,nativeContext,pitch,goal:board.kind==='context'?`${active.hint} · 首字母 ${targetWord[0]} · ${(targetWord.match(/[A-Za-z]/g)??[]).length} 个字母`:'',doneBoards:m.boards.map(done),lab,recall:!!p.checked.visualRecall,recallValue:p.answers.visualRecallValue??'',recallChecked:typeof p.checked.visualRecallAnswer==='boolean',recallCorrect:!!p.checked.visualRecallAnswer,ownLine:p.answers[`visualOwn-${board.id}-${active.id}`]??'',activePlaced:slots.find(s=>s.selected)!.placed,activeDone:slots.find(s=>s.selected)!.done,open:p.answers.visualPane!=='study',title:m.title,subtitle:m.subtitle,art:m.art,index,total:m.boards.length,board,active,slots,chips:board.chips.map(c=>({...c,used:!board.reusable&&slots.some(s=>s.done&&p.answers[slotKey(board,s)]===c.id)&&p.answers[key]!==c.id,selected:p.answers[key]===c.id})),feedback:checked?(p.checked.visualLast?active.reason:board.wrongReasons?.[`${active.id}:${last}`]??`${selected?.text??'这张卡'}还不符合当前线索。${active.hint}`):active&&slots.find(s=>s.selected)?.done?active.reason:'',correct:checked?!!p.checked.visualLast:!!slots.find(s=>s.selected)?.done,hint:!!p.checked.visualHint,materialOpen:!!p.checked.visualMaterial,boardDone:done(board),allDone:m.boards.every(done),completed:m.boards.filter(done).length}
}
export function changeMission(m:VisualMission,p:TeachingProgress,action:string,value:string):void {
 const v=missionView(m,p),clear=()=>{delete p.answers.visualLast;delete p.checked.visualLast;p.checked.visualHint=false;p.checked.visualRecall=false;delete p.checked.visualRecallAnswer;p.answers.visualRecallValue=''}
 if(action==='lab'){const n=Number(value);if(m.lab&&Number.isInteger(n)&&n>=0&&n<m.lab.states.length)p.answers.visualLab=String(n);return}
 if(action==='lab-pane'){p.answers.visualLabPane=p.answers.visualLabPane==='repair'?'lab':'repair';return}
 if(action==='own-line'){p.answers[`visualOwn-${v.board.id}-${v.active.id}`]=value.slice(0,1000);return}
 if(action==='recall'){p.checked.visualRecall=!p.checked.visualRecall;p.answers.visualRecallValue='';delete p.checked.visualRecallAnswer;return}
 if(action==='recall-answer'){p.answers.visualRecallValue=value.slice(0,100);delete p.checked.visualRecallAnswer;return}
 if(action==='recall-check'&&v.board.kind==='context'){const expected=v.board.chips.find(c=>c.id===v.active.answer)!.text;p.checked.visualRecallAnswer=(p.answers.visualRecallValue??'').trim().toLocaleLowerCase('en')===expected.toLocaleLowerCase('en');return}
 if(action==='study'||action==='open'){p.answers.visualPane=action;return}
 if(action==='material'){p.checked.visualMaterial=!p.checked.visualMaterial;return}
 if(action==='hint'){p.checked.visualHint=!p.checked.visualHint;return}
 if(action==='slot'&&v.board.slots.some(s=>s.id===value)){p.answers.visualSlot=value;clear();return}
 if(action==='board'){const n=Number(value);if(Number.isInteger(n)&&n>=0&&n<m.boards.length){p.answers.visualBoard=String(n);delete p.answers.visualSlot;clear()}return}
 if(action==='next'&&v.boardDone){if(v.index+1<m.boards.length){p.answers.visualBoard=String(v.index+1);delete p.answers.visualSlot;clear()}else if(v.allDone)p.answers.visualPane='study';else{p.answers.visualBoard=String(v.doneBoards.indexOf(false));delete p.answers.visualSlot;clear()}return}
 if(action==='place'){
  const chip=v.chips.find(c=>c.id===value);if(!chip||chip.used)return
  const correct=chip.text===v.board.chips.find(c=>c.id===v.active.answer)?.text,key=slotKey(v.board,v.active)
  p.answers.visualSlot=v.active.id;p.answers.visualLast=value;p.checked.visualLast=correct
  p.answers[key]=value;p.checked[key]=correct
 }
}
export function missionProblems(m:VisualMission,immediateIds:string[]):string[]{
 const errors:string[]=[]
 if(!m.title||!m.boards.length||!m.sourceIds.length||m.sourceIds.some(id=>!immediateIds.includes(id)))errors.push('Missing task or unsafe source IDs')
 for(const b of m.boards){if(!b.slots.length||b.slots.length>3||b.chips.length<2||!b.instruction)errors.push('Invalid board '+b.id);for(const s of b.slots)if(!s.text||!s.reason||!s.hint||!b.chips.some(c=>c.id===s.answer))errors.push('Invalid slot '+b.id+'/'+s.id);if(new Set(b.chips.map(c=>c.id)).size!==b.chips.length)errors.push('Duplicate chips '+b.id)}
 return errors
}

const editions=new WeakMap<VisualMission,Partial<Record<Spelling,VisualMission>>>()
export function editionMission(m:VisualMission,spelling:Spelling):VisualMission {
 const cached=editions.get(m)??{};if(cached[spelling])return cached[spelling]!
 const t=(text:string)=>editionText(text,spelling)
 const result:VisualMission={...m,...(m.workshop?{workshop:mapWorkshop(m.workshop,t)}:{}),title:t(m.title),subtitle:t(m.subtitle),sourceIds:[...m.sourceIds],boards:m.boards.map(b=>({...b,title:t(b.title),instruction:t(b.instruction),slots:b.slots.map(s=>({...s,label:t(s.label),text:t(s.text),reason:t(s.reason),hint:t(s.hint),...(s.initial?{initial:t(s.initial)}:{})})),chips:b.chips.map(c=>({...c,text:t(c.text)})),...(b.material?{material:t(b.material)}:{}),...(b.conclusion?{conclusion:t(b.conclusion)}:{}),...(b.wrongReasons?{wrongReasons:Object.fromEntries(Object.entries(b.wrongReasons).map(([id,text])=>[id,t(text)]))}:{})})),...(m.lab?{lab:{title:t(m.lab.title),states:m.lab.states.map(state=>({...state,label:t(state.label),before:t(state.before),focus:t(state.focus),after:t(state.after),note:t(state.note)}))}}:{})}
 cached[spelling]=result;editions.set(m,cached);return result
}
