import { chinaDate, examYear, bookLabel, localGradeLabel } from '../core/cohort'
import { dailyPlan, learningStats, nextLesson } from '../core/planner'
import type { ContentCatalog, LearnerState } from '../core/types'
import type { Screen, Card, Action, Field } from './view'

export interface CourseRow extends Card { position: string; primary: Action; secondary?: Action; stateLabel: string; tone: string }
export interface Overview {
  context: string; edition: string; book: string; greeting: string; day: string; cohort: number
  goal: number; done: number; total: number; minutes: number; streak: number; independent: number
  next?: { title: string; label: string; text: string; action: Action; progress: number; state: string }
  tasks: (Card & { action: Action; minutes: number; done: boolean; character: string })[]
  skills: { id: string; title: string; text: string; character: string; tone: string; action: Action; count: number; art?: string; artExt?: string }[]
  groups: { id: string; title: string; rows: CourseRow[] }[]
  filtersOpen: boolean; filters: Field[]; search?: Field; result: string; currentSkill: string
  identity: string; empty: boolean; alert?: string
}
const skills = [
  ['vocabulary','词汇','拼写、词义与用法','Aa','blue','vocabulary'],
  ['grammar','语法','在句子里发现规律','句','violet','builder:grammar'],
  ['reading','阅读','读懂原文，找到依据','读','teal','builder:reading'],
  ['listening','听前准备','文字推演 · 音频待配','听','blue','learn:listening'],
  ['speaking','口语','录音回听，练清楚表达','说','coral','speaking'],
  ['writing','写作','组织要点，再改好句子','写','violet','writing'],
]
const labels: Record<string,string> = { vocabulary:'词汇与表达', grammar:'语法与句式', reading:'阅读与理解', listening:'听前准备', speaking:'口语表达', writing:'写作与修改' }

// Product layout is separate from learning evidence and question selection.
export function presentScreen(s: Screen, catalog: ContentCatalog, state: LearnerState, now: number, form: Record<string,string>, alert?: string): Screen {
  if (!['home','learn','practice','mistakes','profile'].includes(s.id) || !state.profile) return s
  const p=state.profile, edition=catalog.editions.find(e=>e.id===p.editionId), city=catalog.cities.find(c=>c.id===p.cityId)
  const stats=learningStats(state,now), date=chinaDate(now), plan=dailyPlan(catalog,state,now), next=nextLesson(catalog,state)
  const progress=next&&state.teaching?.[next.id], phase=progress?.step??0
  const title=next&&catalog.topics.find(t=>t.id===next.topicId)
  const groups: Overview['groups']=[]
  s.cards.forEach((card,i)=>{
    if(s.id!=='learn')return
    const lesson=catalog.lessons.find(l=>l.id===card.id), topic=catalog.topics.find(t=>t.id===lesson?.topicId)
    const id=topic?.course?.themeId??topic?.skill??'foundation'
    let group=groups.find(g=>g.id===id)
    if(!group){group={id,title:catalog.course?.themes.find(t=>t.id===id)?.title??labels[topic?.skill??'']??'基础能力',rows:[]};groups.push(group)}
    const primary=card.actions[0], secondary=card.actions.find(a=>a.id==='start-lesson')
    group.rows.push({...card,position:String(i+1).padStart(2,'0'),primary,secondary,stateLabel:primary.disabled?'高年级课程':state.lessonDoneAt[card.id]?'已学 · 待延时复习':state.teaching?.[card.id]?.step===5?'探索已完成':state.teaching?.[card.id]?'继续学习':card.tag==='音频准备中'?'文字预习':'未开始',tone:topic?.skill==='reading'?'teal':topic?.skill==='writing'?'violet':'blue'})
  })
  s.overview={
    context:`${city?.name??''} · ${localGradeLabel(p.grade,p.structure,p.cityId)}`,edition:`${edition?.name??''} · ${edition?.version??''}`,
    book:bookLabel(p.grade,p.term),greeting:new Date(now+8*3600000).getUTCHours()<12?'早上好，同学':new Date(now+8*3600000).getUTCHours()<18?'下午好，同学':'晚上好，同学',
    day:`${date.month}月${date.day}日`,cohort:examYear(p),goal:p.dailyMinutes,done:plan.filter(t=>t.done).length,total:plan.length,minutes:stats.minutes,streak:stats.streak,independent:stats.independent,
    next:next?{title:next.title,label:`${labels[title?.skill??'']??'基础能力'} · 约${next.estimatedMinutes}分钟`,text:next.objective,action:{id:phase===5?'start-lesson':'open-lesson-studio',value:next.id,label:phase===5?'做课后练习':progress?'继续学习':'开始学习',tone:'primary'},progress:Math.min(phase,5)*20,state:phase===5?'探索已完成，接着巩固':progress?`已到第${Math.min(phase+1,5)}步，共5步`:'先动手，再理解'}:undefined,
    tasks:plan.map(t=>({id:t.id,title:t.action==='start-lesson'&&state.teaching?.[t.value]?.step===5?'做课后巩固练习':t.title,text:t.description,actions:[],action:{id:t.action==='start-lesson'?(state.teaching?.[t.value]?.step===5?'start-lesson':'open-lesson-studio'):t.action,value:t.value,label:t.title},minutes:t.minutes,done:t.done,character:({words:'词',mistakes:'错',review:'回',lesson:'学',strengthen:'练'} as Record<string,string>)[t.id]??'练'})),
    skills:skills.map(([id,title,text,character,tone,value])=>({id,title,text,character,tone,action:{id:'navigate',value,label:title},count:catalog.lessons.filter(l=>catalog.topics.find(t=>t.id===l.topicId)?.skill===id).length,art:({vocabulary:'cards',grammar:'types',reading:'types',writing:'notebook'} as Record<string,string>)[id],artExt:id==='grammar'||id==='reading'?'webp':'png'})),
    groups,filtersOpen:form.courseMore==='true',filters:s.fields.filter(f=>f.name!=='courseQuery'),search:s.fields.find(f=>f.name==='courseQuery'),result:s.sections?.[0]?.title??'',currentSkill:form.courseSkill??'all',
    identity:'同学',empty:s.cards.length===0,alert,
  }
  return s
}
