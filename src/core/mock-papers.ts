import {startSession} from './sessions'
import type{ContentCatalog,LearnerState,LearningSession,MockPaper}from'./types'
export function paperQuestionIds(p:MockPaper):string[]{return p.sections.flatMap(s=>s.questionIds)}
export function reservedMockQuestions(c:ContentCatalog):Set<string>{return new Set((c.mockPapers??[]).flatMap(p=>paperQuestionIds(p)))}
export function paperEligibility(state:LearnerState,p:MockPaper):string|undefined{
 const learner=state.profile
 if(!learner||!p.structures.includes(learner.structure))return'请选择适合当前学校学制的试卷。'
 if(p.grade>learner.grade)return'建议先完成当前年级课程，再做这份高年级卷。'
 if(p.grade===learner.grade&&learner.term==='upper'&&p.term==='lower')return'这份卷涉及下学期能力，建议学完相关课程后再做。'
 return undefined
}
export function startMockPaper(state:LearnerState,c:ContentCatalog,id:string,now:number){
 const p=c.mockPapers?.find(p=>p.id===id);if(!p)throw Error('这份原创试卷暂未找到，请返回列表。')
 const reason=paperEligibility(state,p);if(reason)throw Error(reason)
 const ids=paperQuestionIds(p),marks=Object.fromEntries(p.sections.flatMap(s=>s.questionIds.map(id=>[id,s.marksEach])))
 if(ids.some(id=>!c.questions.some(q=>q.id===id)))throw Error('试卷还未加载完整，请重试；已保存的学习记录不会受影响。')
 return startSession(state,ids,'exam',now,{paperId:p.id,flagged:[],deadlineAt:now+p.minutes*60000,examMarks:marks})
}
export function toggleExamFlag(state:LearnerState,now:number):LearnerState{
 const s=state.activeSessionId?state.sessions[state.activeSessionId]:undefined
 if(!s||s.mode!=='exam'||s.submittedAt||s.deadlineAt&&now>=s.deadlineAt)return state
 const id=s.questionIds[s.current],flags=new Set(s.flagged??[]);flags.has(id)?flags.delete(id):flags.add(id)
 return{...state,sessions:{...state.sessions,[s.id]:{...s,flagged:[...flags]}},updatedAt:now}
}
export function paperResults(p:MockPaper,s:LearningSession){
 return p.sections.map(section=>{
  const rows=section.questionIds.map(id=>({id,result:s.answers[id]?.result,answered:!!s.answers[id]?.answer.trim()})),writing=section.id==='writing'
  return{id:section.id,title:section.title,score:writing?0:rows.reduce((n,r)=>n+(r.result?.score??0),0),max:section.questionIds.length*section.marksEach,writing,wrong:writing?[]:rows.filter(r=>!r.result?.correct).map(r=>r.id),unanswered:rows.filter(r=>!r.answered).length,reviewed:writing&&rows.every(r=>!!r.result)}
 })
}
