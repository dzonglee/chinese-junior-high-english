// Original teaching specifications. Generated output is checked in for lesson-by-lesson review.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs'
import {build} from 'esbuild'
import {pathToFileURL} from 'node:url'
import {authorCatalog} from './lib/author-content.mjs'
const root=process.cwd();mkdirSync('.local/tools',{recursive:true});await build({stdin:{contents:"export {createLessonTeaching,sourceEvidence} from './src/core/lesson-teaching'",resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'esm',outfile:'.local/tools/workshop-author.mjs'})
const {createLessonTeaching,sourceEvidence}=await import(pathToFileURL(root+'/.local/tools/workshop-author.mjs')),c=authorCatalog(root)
const labs=Object.fromEntries(readFileSync('content/teaching/visual-grammar-labs.tsv','utf8').trim().split('\n').map(line=>{const[id,title,...rest]=line.split('\t');return[id,{title,states:[rest.slice(0,3),rest.slice(3,6)]}]}))
const cell=(label,detail='',value=1,role='')=>({label,detail,value,role})
const world=(kind,caption,...cells)=>({kind,caption,cells})
const worlds={
 'g-be':[world('count','蓝色笔记本',cell('notebook','一本',1)),world('count','蓝色笔记本',cell('notebooks','三本',3))],
 'g-present':[world('roles','每天步行上学',cell('I','说话人'),cell('walk','每天的习惯')),world('roles','每天步行上学',cell('Mia','第三人称单数'),cell('walk','每天的习惯'))],
 'g-continuous':[world('roles','把镜头停在此刻',cell('I','一个说话人'),cell('reading','动作正在进行')),world('roles','把镜头停在此刻',cell('They','一群人'),cell('reading','动作正在进行'))],
 'g-past':[world('timeline','重复的习惯与已经发生的事件',cell('every month','反复发生',38)),world('timeline','重复的习惯与已经发生的事件',cell('yesterday','参观已发生',20))],
 'g-future':[world('timeline','从今天看活动安排',cell('on Sundays','每周重复',50)),world('timeline','从今天看活动安排',cell('next Sunday','尚未发生',80))],
 'g-perfect':[world('timeline','笔记写好了：关注现在的结果',cell('written','过去完成',30),cell('now','笔记已经在这里',70)),world('timeline','昨天发生的事：交代过去时间',cell('yesterday','写笔记',20))],
 'g-past-continuous':[world('timeline','八点时，阅读还在进行',cell('reading','动作持续',25),cell('8 p.m.','镜头停在这里',40)),world('timeline','叙述昨晚完成的一件事',cell('finished','读完',40))],
 'g-passive':[world('roles','谁清扫了什么？',cell('students','动作发出者',1,'subject'),cell('cleaned','动作'),cell('room','动作承受者')),world('roles','同一件事，把房间放在主语位置',cell('room','主语／承受者',1,'subject'),cell('was cleaned','动作'),cell('students','执行者'))],
 'g-modals':[world('timeline','现在具备的能力',cell('now','会游泳',70)),world('timeline','回忆六岁时的能力',cell('age six','过去会游泳',20))],
 'g-infinitives':[world('syntax','want 后接准备做的事',cell('I want','谓语'),cell('to read','动词不定式'),cell('this book','对象')),world('syntax','enjoy 后接喜欢的活动',cell('I enjoy','谓语'),cell('reading','动名词'),cell('this book','对象'))],
 'g-gerunds':[world('syntax','enjoy 的宾语',cell('enjoy','谓语'),cell('reading','活动')),world('syntax','decide 后接决定要做的事',cell('decided','谓语'),cell('to read','要做的事'))],
 'g-comparison':[world('scale','两只包比较轻重',cell('this bag','较轻',35),cell('that bag','较重',70)),world('scale','在三只包中找到最轻的',cell('this bag','最轻',25),cell('bag B','',55),cell('bag C','',85))],
 'g-articles':[world('morphology','按开头的音素判断，不按字母判断',cell('old','/əʊ/ 起首'),cell('map','单数可数名词')),world('morphology','按开头的音素判断，不按字母判断',cell('useful','/j/ 起首'),cell('map','单数可数名词'))],
 'g-pronouns':[world('roles','她帮助 Ben',cell('she','发出帮助',1,'subject'),cell('helped','动作'),cell('Ben','接受帮助')),world('roles','Ben 帮助她',cell('Ben','发出帮助',1,'subject'),cell('helped','动作'),cell('her','接受帮助'))],
 'g-prepositions':[world('position','把书放在桌面',cell('book','on',33)),world('position','把书移到桌下',cell('book','under',75))],
 'g-conjunctions':[world('logic','结果与通常预期不同',cell('tired','通常想休息'),cell('finished the task','却完成了任务')),world('logic','前一件事导致后一件事',cell('tired','原因'),cell('went to bed early','结果'))],
 'g-conditionals':[world('logic','明天还没到：先设定天气条件',cell('rains tomorrow','条件'),cell('stay inside','条件成立时的结果')),world('logic','改变条件，结果跟着变',cell('does not rain tomorrow','条件'),cell('play outside','条件成立时的结果'))],
 'g-relatives':[world('roles','先行词指人',cell('girl','先行词：人'),cell('helped me','从句中的动作')),world('roles','先行词指物',cell('book','先行词：物'),cell('is on the desk','从句中的状态'))],
 'g-object-clauses':[world('syntax','直接向对方提问',cell('Where','疑问词'),cell('is','be'),cell('the library','主语')),world('syntax','把问题嵌进 tell me 后面',cell('where','连接词'),cell('the library','主语'),cell('is','谓语'))],
 'g-questions':[world('syntax','陈述她喜欢音乐',cell('She','主语'),cell('likes','三单形式'),cell('music','宾语')),world('syntax','让 does 承担三单变化',cell('Does','移到主语前'),cell('she','主语'),cell('like music','动词回原形'))],
 'g-nouns':[world('count','等候的人',cell('child','一位儿童',1)),world('count','等候的人',cell('children','两位儿童',2))],
 'g-agreement':[world('count','只数盒子，不数里面的铅笔',cell('box','每盒有多支铅笔',1)),world('count','只数盒子，不数里面的铅笔',cell('boxes','每盒有多支铅笔',3))],
 'g-proper-nouns':[world('syntax','地点的专有名称',cell('Beijing','独一的名称')),world('syntax','地点的类别名称',cell('city','普通类别'))],
 'g-possessives':[world('count','物品属于谁？',cell('girl','一个所属者',1),cell('bag','一个包',1)),world('count','物品属于谁？',cell('girls','多个所属者',3),cell('bags','多个包',3))],
 'g-verb-forms':[world('timeline','明确叙述昨天',cell('yesterday','她回家了',20)),world('timeline','现在的结果：她已经离开',cell('gone','回家这一动作已发生',30),cell('now','她不在这里',70))],
 'g-transitivity':[world('syntax','reach 直接接地点',cell('reached','动词'),cell('the museum','地点宾语')),world('syntax','arrive 需要介词连接这个地点',cell('arrived','动词'),cell('at','介词'),cell('the museum','地点'))],
 'g-linking-verbs':[world('roles','感官动词说明汤的状态',cell('soup','被描述的事物'),cell('smells','系动词'),cell('good','描述汤')),world('roles','描述烹饪这个动作',cell('She','动作发出者'),cell('cooked','动作'),cell('well','描述怎样做'))],
 'g-auxiliaries':[world('syntax','肯定句：变化在 likes 上',cell('Mia','主语'),cell('likes','三单'),cell('art','宾语')),world('syntax','否定句：变化交给 does',cell('Mia','主语'),cell("doesn't",'助动词承担变化'),cell('like art','动词原形'))],
 'g-adjectives':[world('syntax','形容词贴着名词',cell('a','限定词'),cell('quiet','性质'),cell('room','名词')),world('syntax','从安静改为吵闹',cell('The room','主语'),cell('is','系动词'),cell('noisy','性质'))],
 'g-adverbs':[world('roles','描述人是什么样的',cell('careful','修饰 reader'),cell('reader','人')),world('roles','描述阅读这个动作',cell('reads','动作'),cell('carefully','修饰 reads'))],
 'g-adverb-comparison':[world('scale','只说明跑得快',cell('Ben now','速度示意',65)),world('scale','把现在和以前比较',cell('Ben before','速度示意',35),cell('Ben now','速度示意',70))],
 'g-reflexives':[world('roles','动作回到本人',cell('She','教的人',1,'subject'),cell('taught','动作'),cell('herself','学习的人也是她')),world('roles','动作指向另一个人',cell('She','教的人',1,'subject'),cell('taught','动作'),cell('him','另一个学习者'))],
 'g-demonstratives':[world('count','近处的包',cell('bag','近处，一个',1)),world('count','近处的包',cell('bags','近处，三个',3))],
 'g-indefinites':[world('syntax','肯定：发现了有用的东西',cell('something','不定代词'),cell('useful','后置修饰')),world('syntax','否定：没有找到有用的东西',cell("didn't find",'否定语境'),cell('anything','不定代词'),cell('useful','后置修饰'))],
 'g-question-words':[world('count','想知道需要几本书',cell('books','数量未知',3)),world('scale','想知道一本书多少钱',cell('price','价格未知',60))],
 'g-cardinals':[world('count','数量已精确给出',cell('100','一百本一组，共两组',2)),world('count','只有概数，没有精确数字',cell('100','数百本，组数不确定',4))],
 'g-ordinals':[world('count','数一数有几张票',cell('ticket','共有两张',2)),world('roles','按先后顺序排队',cell('1','第一张'),cell('2','本次这张',1,'subject'))],
 'g-compounds':[world('morphology','合成词：两部分一起构成新词',cell('rain','雨'),cell('coat','外套'),cell('raincoat','雨衣')),world('morphology','换一个部件，词义也变',cell('class','班级'),cell('room','房间'),cell('classroom','教室'))],
 'g-derivation':[world('morphology','her 后需要名词作主语中心',cell('kind','形容词'),cell('-ness','构成名词'),cell('kindness','名词')),world('syntax','is 后用形容词作表语',cell('She is','主语与系动词'),cell('kind','形容词'),cell('to me','对象'))],
 'g-conversion':[world('syntax','同一拼写放进不同位置',cell('a','限定词'),cell('book','名词：书')),world('syntax','同一拼写放进不同位置',cell('can','情态动词'),cell('book','动词：预订'),cell('a room','宾语'))],
 'g-contractions':[world('syntax','看 ready 的词性',cell("She's",'待展开'),cell('ready','形容词')),world('syntax','看 finished 与 it 的结构',cell("She's",'待展开'),cell('finished it','过去分词＋宾语'))],
 'g-statements':[world('timeline','昨天打过网球',cell('yesterday','肯定过去事实',20)),world('timeline','昨天没有打网球',cell('yesterday','否定过去事实',20))],
 'g-alternative-questions':[world('logic','从两个选项中选择',cell('Tea','选项一'),cell('or','二选一'),cell('coffee','选项二')),world('logic','判断是否喜欢茶',cell('Do you like tea?','是或否'),cell('Yes / No','回答类型'))],
 'g-imperatives':[world('logic','希望对方做这件事',cell('window','现在关着'),cell('open','请打开')),world('logic','禁止对方做这件事',cell('window','需要保持关着'),cell("don't open",'不要打开'))],
 'g-exclamations':[world('syntax','感叹中心包含名词 day',cell('a beautiful day','名词短语'),cell('it is','主语与谓语')),world('syntax','感叹中心是形容词 beautiful',cell('beautiful','形容词'),cell('the day is','主语与谓语'))],
 'g-sentence-patterns':[world('roles','动作无需另接对象就完整',cell('baby','主语'),cell('slept','谓语')),world('roles','拿着：需要说明拿着什么',cell('baby','主语'),cell('held','谓语'),cell('a toy','宾语'))],
 'g-double-objects':[world('roles','礼物移交给 Mia',cell('I','给予者'),cell('book','被给予的东西'),cell('Mia','接受者：to')),world('roles','为 Mia 买东西',cell('I','购买者'),cell('book','所买的东西'),cell('Mia','受益者：for'))],
 'g-object-complements':[world('roles','两个宾语分别回答给谁、给什么',cell('her','接受者'),cell('a book','事物')),world('roles','后一个成分描述前一个的状态',cell('the door','宾语'),cell('blue','门变成的颜色'))],
 'g-there-be':[world('position','说明桌上存在一本书',cell('book','on',33)),world('roles','说明这本书由谁拥有',cell('Mia','拥有者'),cell('has','所属关系'),cell('a book','拥有的东西'))],
 'g-future-passive':[world('roles','从执行者说起',cell('They','执行者'),cell('will build','将来的动作'),cell('a bridge','承受者')),world('roles','把承受者放到主语位置',cell('A bridge','承受者／主语'),cell('will be built','将来被建造'))],
 'g-participles':[world('roles','婴儿自己发出睡觉动作',cell('baby','主动'),cell('sleeping','正在睡')),world('roles','窗户承受打破的动作',cell('window','被动'),cell('broken','已被打破'))],
 'g-time-clauses':[world('logic','先到达，再打电话',cell('she arrives','时间条件'),cell('I will call','之后的动作')),world('logic','改变先后关系：离开之前打电话',cell('she leaves','时间界限'),cell('I will call before that','在此之前的动作'))],
 'g-reason-purpose':[world('syntax','because 后有主语和谓语',cell('because','连接词'),cell('it','主语'),cell('rained','谓语')),world('syntax','because of 后接名词短语',cell('because of','介词短语'),cell('the rain','名词短语'))],
 'g-concession':[world('logic','有阻力，事情仍发生',cell('it rained','不利条件'),cell('we went out','仍然外出')),world('logic','条件决定事情是否发生',cell('unless it rains','排除条件'),cell('we will go out','计划外出'))],
 'g-interjections':[world('roles','根据具体反应选择语气',cell('That hurt.','感觉疼痛')),world('roles','根据具体反应选择语气',cell('a beautiful view','惊喜赞叹'))]
}
worlds['g-past'][0].cells[0].role='habit';worlds['g-future'][0].cells[0].role='habit';worlds['g-past-continuous'][0].cells[0].role='duration';worlds['g-perfect'][0].cells[0].role='result';
for(const states of Object.values(worlds))for(const scene of states)if(scene.kind==='count')for(const c of scene.cells)c.art=/child|children|girl/.test(c.label)?'person':/bag/.test(c.label)?'bag':/box/.test(c.label)?'box':/ticket/.test(c.label)?'ticket':c.label==='100'?'bundle':'book';worlds['g-cardinals'][1].cells[0].uncertain=true;
// These contrasts change the actual condition, rather than highlighting the same sentence twice.
labs['g-infinitives'].states[1]=['喜欢做','I enjoy |reading| this book.','enjoy 后接动名词 reading；不能把 want 的搭配照搬过来。']
labs['g-gerunds'].states[1]=['决定做','I decided |to read| the book.','decide 后接不定式 to read；和 enjoy reading 的搭配不同。']
labs['g-infinitives'].title='换动词，检查后面的形式'
worlds['g-adjectives'][1]=world('syntax','同样安静，把形容词放到系动词后',cell('The room','主语'),cell('is','系动词'),cell('quiet','说明主语的性质'))
labs['g-conditionals'].states[1]=['如果不下雨',"If it doesn't rain tomorrow, we |will play| outside.",'条件改变了，结果也改变了；if 从句仍用一般现在时，主句用 will 加原形。']
labs['g-time-clauses'].states[1]=['在离开之前','I will call you before she |leaves|.','谈将来的时间从句，before 后仍用一般现在时 leaves，不用 will leave。']
worlds['g-question-words'][0].cells[0].uncertain=true;worlds['g-question-words'][1]=world('roles','要询问一本书的价格，金额还不知道',cell('price ?','需要询问多少钱'));
// Review corrections: make the requested meaning/structure explicit where both forms are grammatical.
labs['g-future'].states[1]=['下周（按要求用 will）','We |will meet| next Sunday.','本次要求用 will 表达刚作的决定：will 后接 meet。一般现在时也能表示有安排的将来，不能只见 next 就断言其他结构全错。']
worlds['g-future'][1].caption='刚决定下周日见面，本次用 will 表达这个决定'
labs['g-perfect'].states[0]=['当前结果（补全 has 后的形式）','She has |written| the note.','has 后需要过去分词 written；wrote 是过去式，不能直接跟在 has 后。']
labs['g-conditionals'].states=[['如果下雨','If it |rains| tomorrow, we will stay inside.','本次谈将来的条件，if 从句用一般现在时 rains，主句用 will stay。'],['如果不下雨',"If it |doesn't rain| tomorrow, we will play outside.",'条件从有雨改为无雨，结果改为外出活动。if 从句用一般现在时的否定式，不用 will。']]
labs['g-time-clauses'].states[0]=['到达以后','When she |arrives|, I will call you.','本次谈将来的时间，when 从句用一般现在时 arrives，主句用 will call。']
worlds['g-articles'].forEach(w=>w.kind='syntax');labs['g-articles'].states[0][0]='初次泛指：元音开头';labs['g-articles'].states[1][0]='初次泛指：辅音开头';worlds['g-articles'].forEach(w=>w.caption='第一次泛指一张地图，按开头的音素选不定冠词')
labs['g-transitivity'].states[0][0]='按要求用 reach';labs['g-transitivity'].states[1][0]='按要求用 arrive';labs['g-transitivity'].states[1][2]='这次要求用 arrive 改写，arrive 与小地点搭配常用 at。reached the museum 也合语法，但没有完成这次指定动词的改写。'
labs['g-reflexives'].states[1][0]='她教另一个男孩';worlds['g-reflexives'][1].caption='她教的是另一个男孩，不是她本人'
labs['g-demonstratives'].title='距离不变，只改变数量'
labs['g-indefinites'].states[0][0]='找到了一些有用的东西';labs['g-indefinites'].states[1][0]='没找到任何有用的东西';worlds['g-indefinites'][1].caption='要表达完全没有找到任何有用的东西';labs['g-indefinites'].states[1][2]='本次要表达“任何有用的东西都没找到”，用 anything useful；形容词仍放在不定代词后。'
labs['g-reason-purpose'].states[0][0]='用 because 接从句';labs['g-reason-purpose'].states[1][0]='用 because of 接名词短语';labs['g-reason-purpose'].states[1][2]='这次要求用 because of，后面接 the rain 这个名词短语。because it rained 也能表达同一原因，但不是这次指定的结构。'
const usageMaps={
 borrow:{left:'对方（you）',right:'我（I）',object:'ruler',caption:'尺子原本属于对方，现在交给我短时使用。试着写 borrow 或 lend，看方向。',alternatives:{borrow:'right',lend:'left'}},
 lend:{left:'你（you）',right:'我（me）',object:'pencil',caption:'铅笔原本属于你。题目请求你暂时交给我使用。试着写 lend 或 borrow，看方向。',alternatives:{lend:'right',borrow:'left'}},
 return:{left:'原来的主人',right:'借书的人',object:'book',caption:'归还：书从借书的人回到原来的主人。试着写 return 或 borrow，看方向。',alternatives:{return:'left',borrow:'right'}},
 bring:{left:'出发的地方',right:'说话者所在的讨论现场',object:'notes',caption:'在这个示意情境中，说话者已在讨论现场，希望笔记朝这里来。',alternatives:{bring:'right',take:'left'}},
 take:{left:'出发地',right:'步行途中',object:'water',caption:'从出发地带走一瓶水，去步行途中使用。',alternatives:{take:'right',bring:'left'}}
}
const proofReasons=JSON.parse(readFileSync('content/teaching/proof-reasons.json','utf8'))
const records={}
for(const l of c.lessons){
 const s=createLessonTeaching(c,l),qs=l.questionIds.map(id=>c.questions.find(q=>q.id===id)),items=[];let w
 if(s.mode==='language'){
  const lab=labs[l.topicId],conditions=lab.states.map(([label,line,reason],i)=>{const[before,target,after]=line.split('|');return{label,before,target,after,reason,world:worlds[l.topicId][i]}})
  const extra={ 'g-be':'am','g-present':'walking','g-continuous':'reading','g-past':'visiting','g-future':'met','g-perfect':'write','g-past-continuous':'were reading','g-passive':'was clean','g-modals':'can to swim','g-infinitives':'read','g-gerunds':'read','g-comparison':'more light','g-articles':'the','g-pronouns':'hers','g-prepositions':'at','g-conjunctions':'because','g-conditionals':'will rain','g-relatives':'where','g-object-clauses':'where is the library','g-questions':'Do','g-nouns':'childs','g-agreement':'be','g-proper-nouns':'beijing','g-possessives':'girls','g-verb-forms':'goed','g-transitivity':'arrived','g-linking-verbs':'good','g-auxiliaries':"doesn't likes",'g-adjectives':'quietly','g-adverbs':'carefuly','g-adverb-comparison':'quicklier','g-reflexives':'her','g-demonstratives':'Those','g-indefinites':'useful something','g-question-words':'How old','g-cardinals':'two hundreds','g-ordinals':'twoth','g-compounds':'coat rain','g-derivation':'kind','g-conversion':'booked','g-contractions':'does','g-statements':"didn't played",'g-alternative-questions':'Yes, tea or coffee.','g-imperatives':"Doesn't open",'g-exclamations':'What beautiful','g-sentence-patterns':'held','g-double-objects':'at','g-object-complements':'blue the door','g-there-be':'There has','g-future-passive':'will built','g-participles':'breaking','g-time-clauses':'will leave','g-reason-purpose':'because of it rained','g-concession':'Although it rained, but','g-interjections':'Goodbye!'}[l.topicId]
  w={kind:'transform',title:lab.title,instruction:'改变一个条件，再把合适的表达放进句子。每个条件都试一次，留意英语跟着怎样变。',conditions,choices:[...new Set([conditions[1].target,extra,conditions[0].target])],items:[{id:'transform',label:lab.title,prompt:s.coaching.task,answer:'',reason:'',hint:s.coaching.check}]}
 }else if(s.mode==='vocabulary'){
  const words=c.vocabulary.filter(v=>qs.some(q=>q.id===`q-${v.topicId}-${v.id.slice(5)}`))
  for(const v of words){const q=qs.find(q=>q.id===`q-${v.topicId}-${v.id.slice(5)}`),line=q.stem.split('\n').find(x=>/_+/.test(x)),[before,after]=line.replace(/[A-Za-z]*_+/,'___').split('___'),answer=before.trim()?v.word:v.word[0].toUpperCase()+v.word.slice(1);items.push({...(usageMaps[v.word]?{usage:usageMaps[v.word]}:{}),id:v.id,label:v.meaning,prompt:'遮住词表，根据句意写词，再把这个词用到你自己的生活里。',answer,caseSensitive:!before.trim()||/[A-Z]/.test(v.word),meaning:v.meaning,before,after,reason:v.explanation,hint:`需要 ${v.word.length} 个字符；首字母是 ${answer[0]}。`,material:v.example})}
  w={kind:'word-use',title:'词语实验室',instruction:'先回忆，再造句。词义、搭配和自己的表达连在一起记。',items}
 }else if(s.mode==='reading'||s.mode==='transcript'){
  for(const q of [s.prediction]){const reason=proofReasons[l.id];if(!reason)throw Error(`Missing authored proof explanation: ${l.id}`);const evidence=sourceEvidence(q),options=evidence.map(e=>({id:e.id,text:e.text,correct:e.supports,reason:e.supports?reason:`这句还不能回答“${q.stem}”。${reason}`}));items.push({id:q.id,label:'证据链 '+(items.length+1),prompt:q.stem,evidenceGroups:options.filter(o=>o.correct).map(o=>[o.id]),answer:q.answer.display,reason,hint:q.explanation.pitfall,options,material:q.passage})}
  w={kind:'proof',title:s.mode==='transcript'?'把文字线索连成判断':'从原文走到结论',instruction:'先选依据，再推结论。选中的原句会保留在证据链上，可以比较、改选。',items}
 }else if(s.mode==='communication'){
  s.revisionRubric.filter(r=>!/^核对|^检查.*(?:称呼|署名)|^实际朗读/.test(r.label)).map(r=>({...r,label:r.label.replace(/，并核对.*/,'')})).forEach((r,i)=>items.push({id:r.id,label:r.label,prompt:`这个要点，你准备说什么？\n${r.label}`,answer:'',reason:'已保存你的表达计划。下一步对照参考表达，检查并修改自己的稿子。',hint:'用自己的具体细节，不必套参考句。',material:s.prediction.stem}))
  w={kind:'compose',title:s.skill==='writing'?'先搭自己的表达计划':'轮到你组织对话',instruction:'每个要点写一句自己的英语。它们会保存在计划中，帮助你修改初稿。',items}
 }else{
  const designs={
   'p-letter-sound':[['在 bag 前标一个开头辅音','bag','/b/','/biː/','字母名称 /biː/ 多了元音；bag 开头需要辅音 /b/。']],
   'p-vowels':[['把 ship 改成 sheep：中间元音怎样变？','ship → sheep','/iː/','/ɪ/','sheep 通常用 /iː/，ship 通常用 /ɪ/。拼写和音标要一起核对。']],
   'p-consonants':[['从 thin 换成 this：开头用哪个音？','thin → this','/ð/','/θ/','this 的 th 通常为浊辅音 /ð/；thin 的 th 通常为清辅音 /θ/。']],
   'p-word-stress':[['点亮 banana 的主要重音','ba · na · na','第二音节','第一音节','banana 的主要重音在第二音节：ba-NA-na。']],
   'p-sentence-stress':[['有人问“谁买的？”应突出哪个词？','I bought the book.','I','book','要对比买书的人，应突出 I；突出 book 会转向对比买了什么。']],
   'p-thought-groups':[['把 After lunch 保留成完整时间意群，在哪里停？','After lunch we will practise in the hall.','After lunch / we will practise in the hall.','After / lunch we will practise in the hall.','本题要求保留 After lunch 这个完整时间短语；在 lunch 后标出边界。']],
   'p-connected-speech':[['把逐词分隔改成连接标注','pick / it / up','pick‿it‿up','pick / it / up','这里用连接号标出末辅音与后续首元音的连接，不是把词逐个隔开。']],
   'p-intonation':[['中性地问对方是否准备好，句末怎样走？','Are you ready?','↗','↘','本题的中性一般疑问用上升曲线示意等待回答；真实语境还会影响语调。']]
  }
  for(const[prompt,line,good,bad,reason]of designs[l.topicId])items.push({sound:({'p-word-stress':'syllables','p-sentence-stress':'emphasis','p-thought-groups':'groups','p-connected-speech':'links','p-intonation':'pitch'})[l.topicId]??'phoneme',id:'sound-build',label:'改一个标记',prompt,before:line,answer:good,reason,hint:s.sorting.note,options:[{id:'bad',text:bad,correct:false,reason},{id:'good',text:good,correct:true,reason}]})
  w={kind:'sound-map',title:'让声音标记表达意思',instruction:'亲手改一处标记，再看它表达了什么。这里只练书面规律，不测实际听辨或发音。',items}
 }
 records[l.id]=w
}
if(Object.keys(records).length!==c.lessons.length)throw Error('Unexpected coverage')
writeFileSync('content/teaching/workshops.json',JSON.stringify(records,null,2)+'\n');console.log('Authored '+Object.keys(records).length+' workshop records.')
