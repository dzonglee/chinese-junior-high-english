import type { Question } from './types'

// Original new situations for the legacy communication lessons, whose main lesson has one model.
const situations:Record<string,[string,string,string]>={
 'w-email':['给笔友写一封短邮件，邀请对方周六下午两点参加学校花园的种植活动。说明时间、地点，并请对方回复。','Would you like to help us plant flowers in the school garden at two on Saturday afternoon? Please let me know if you can join us.','邀请、周六下午两点、学校花园、请求回复'],
 'w-advice':['同学因为临睡前玩手机而总是睡不够。写两条可实行的建议，并说明一个理由。','You could put your phone outside your bedroom before bed. Try going to bed at the same time each night, because a regular routine may help you get enough sleep.','手机放到卧室外、固定作息、说明理由'],
 'w-notice':['为班级写一则短通知：周五下午四点在操场练习接力跑；参加者带水，雨天改到体育馆。','Our relay practice starts on the playground at four on Friday afternoon. Please bring water. If it rains, we will meet in the sports hall instead.','周五四点、操场、带水、雨天体育馆'],
 'w-story':['写一个小故事：你在放学路上发现有人掉了围巾，把它交到学校失物招领处。说明经过和结果。','I found a scarf on my way home from school. I took it to the school lost-and-found office. The next morning, its owner collected it and thanked me.','发现围巾、交到失物招领处、物归原主'],
 'w-opinion':['就“学校是否应该保留午间安静阅读时间”表达意见，给出一个理由，并承认同学可能有不同需要。','I think our school should keep a quiet reading time at noon because it gives us a calm break. Some students may prefer to rest, so they could sit quietly without reading.','明确观点、一个理由、考虑不同需要'],
 'w-report':['小组调查了二十名同学的上学方式：十二人步行、六人乘公交、两人骑车。写短报告，准确呈现数据并作一个比较。','We asked twenty classmates how they travel to school. Twelve walk, six take the bus and two ride a bike. Walking is more common than the other two choices in this group.','调查二十人、12步行6公交2骑车、限定在本组的比较'],
 'w-note':['给同桌写一张短便条：想借用对方的英语练习册一天，明天上午上课前归还；先征求同意，并表示感谢。','May I borrow your English workbook for one day? I will return it before class tomorrow morning. Thank you for considering my request.','征求同意、借一天、明早课前归还、感谢'],
 's-introduce':['向新来的社团成员介绍自己，说明一个兴趣和希望在社团中学会的一件事。人名可以虚构。','My name is Lin, and I enjoy taking photographs of plants. I hope to learn how to describe the changes I notice in English.','介绍自己、一个兴趣、一个学习目标'],
 's-retell':['用自己的话转述：周二，班级原计划在操场观察影子；因为下雨，改到教室比较上周拍的照片。说清原计划、变化和原因。','Our class planned to observe shadows on the playground on Tuesday. It rained, so we compared the photographs from last week in our classroom instead.','周二原计划、雨天变化、教室比较照片'],
 's-plan':['提出一个周末小组学习计划：周日下午三点在图书馆讨论阅读任务，先各自准备一个问题，结束时总结发现。','Let us meet at the library at three on Sunday afternoon. Each person can prepare one question about the reading. Before we finish, we will summarise what we have found.','周日三点图书馆、准备问题、结束总结'],
 's-compare':['比较两个午间活动：散步能活动身体，安静阅读能让你放松。说明你今天的选择和理由，不说其中一个对所有人都更好。','A walk helps me move my body, while quiet reading helps me relax. I would choose a walk today because I have been sitting for a long time. Other students may need a different break.','两项活动特点、今天的个人选择、理由、保留他人选择'],
 's-opinion':['就“小组讨论前是否应给每个人一分钟独立思考”表达观点，说明理由，并提出一个具体做法。','I think we should have a minute to think before a group discussion. It can help quieter members prepare an idea. We could each write one question before taking turns to speak.','观点、照顾较安静成员的理由、写问题轮流说的做法'],
 's-problem':['同学和你约好周六九点讨论作业，但你那时有游泳课。礼貌说明冲突，提议十点半，并询问对方是否方便。','I have a swimming lesson at nine on Saturday, so I cannot meet then. Would half past ten work for you? Please tell me if another time would be better.','原约九点、游泳课冲突、提议十点半、征求对方意见'],
 's-read-aloud':['朗读知识迁移：为下面两句话写朗读提纲，指出先后关系和一个合适的停顿，不声称已测量发音。After checking the weather, we packed our bags. We left early so we would have time to walk slowly.','I would keep After checking the weather together and pause after weather. Then I would make the reason for leaving early clear, without rushing the final words.','先检查天气再收拾、完整时间短语、表达早走原因；只是提纲自查']
}
export function communicationTransfer(model:Question):Question{
 const data=situations[model.topicId];if(!data)throw new Error(`Missing authored transfer for ${model.topicId}`)
 const[stem,answer,points]=data
 // A fresh situation must not retain the previous model's passage or media.
 const {passage,feedbackGroup,prompt,options,tokens,mediaId,...base}=model
 return{...base,id:`teach-${model.topicId}-transfer`,stem:`用2—4句英文完成新的任务：${stem}`,answer:{display:answer},rubric:[{id:'content',label:'新任务信息完整',guidance:points,marks:2},{id:'organisation',label:'表达有顺序',guidance:'先说明意图，再补充事实、理由或请求；参考表达不是唯一写法。',marks:2},{id:'language',label:'逐句自查',guidance:'检查主谓、时态、用词与标点；口语提纲不等于实际语音评分。',marks:2}],marks:6,explanation:{strategy:'先列新任务要求，再用自己的话组织信息。',steps:[{text:points,reason:'这些信息来自本次新任务，不能照搬上一情境的人物、时间或地点。'},{text:answer,reason:'这是一种可行表达，其他完成任务且语言通顺的说法也可以。'}],distractors:[],pitfall:'不能只换少数单词，却保留上一个情境不适用的信息。',visual:{kind:'paragraph',title:'新情境的信息组织',segments:points.split('、').map((text,i)=>({text,role:'evidence' as const,note:`要点 ${i+1} · 在自己的表达中找一找`})),caption:'自查表达是否完成新任务，不是机器写作或语音评分。'},transfer:'在不改变事实的前提下，再尝试一种表达。'}}
}
