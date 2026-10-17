/** Original, bounded language workshops. Completion is practice, not a mastery claim. */
export type ExperimentRole = 'subject' | 'verb' | 'object' | 'time' | 'neutral'
export interface ExperimentPart { text: string; role: ExperimentRole; note: string }
export interface ExperimentCondition {
  id: string; label: string; sentence: string; parts: ExperimentPart[]; explanation: string
  time?: 'past' | 'present' | 'future'
}
export interface ExperimentOption { id: string; text: string }
export interface ExperimentChoice {
  prompt: string; options: ExperimentOption[]; correct: string; reasons: Record<string, string>
}
export interface Experiment {
  id: string; title: string; topicId: string; grade: number; question: string
  prediction: { options: ExperimentOption[]; correct: string; reason: string }
  conditions: ExperimentCondition[]; discovery: string; spot: ExperimentChoice; transfer: ExperimentChoice
}

type PartSpec = [text: string, role: ExperimentRole, note: string]
function condition(id: string, label: string, parts: PartSpec[], explanation: string, time?: ExperimentCondition['time']): ExperimentCondition {
  return { id, label, sentence: parts.map(p => p[0]).join(''), parts: parts.map(([text, role, note]) => ({ text, role, note })), explanation, ...(time ? { time } : {}) }
}
function choice(prompt: string, rows: [string, string][], correct: string): ExperimentChoice {
  return { prompt, options: rows.map(([text], i) => ({ id: String.fromCharCode(97 + i), text })), correct, reasons: Object.fromEntries(rows.map(([, reason], i) => [String.fromCharCode(97 + i), reason])) }
}
function prediction(options: string[], correct: string, reason: string): Experiment['prediction'] {
  return { options: options.map((text, i) => ({ id: String.fromCharCode(97 + i), text })), correct, reason }
}

export const experiments: Experiment[] = [
  {
    id: 'e-be', title: '换一个主语，be 会怎样？', topicId: 'g-be', grade: 6,
    question: '先猜第一种条件：一个盒子在门边。The box ___ by the door. 应填什么？随后切换主语，观察 be。',
    prediction: prediction(['am', 'is', 'are'], 'b', 'The box 是单数第三人称，用 is。位置短语 by the door 不决定 be 的形式。'),
    conditions: [
      condition('one', '一个盒子', [['The box ', 'subject', '单数事物'], ['is ', 'verb', '单数主语配 is'], ['by the door.', 'neutral', '地点不改变主谓一致']], 'box 只有一个，is 随单数主语变化。', 'present'),
      condition('many', '两个盒子', [['The boxes ', 'subject', '复数事物'], ['are ', 'verb', '复数主语配 are'], ['by the door.', 'neutral', '地点保持不变']], '只把主语改为复数，is 就要改成 are。', 'present'),
      condition('self', '换成说话人自己', [['I ', 'subject', '第一人称单数'], ['am ', 'verb', 'I 与 am 搭配'], ['by the door.', 'neutral', '同一个地点']], 'I 虽然也指一个人，却不能套用第三人称的 is。', 'present'),
    ],
    discovery: '先确定主语是谁、是单数还是复数，再选 am、is 或 are；地点不替主语作决定。',
    spot: choice('找出 be 用错的一句。', [['The bags are by the door.', 'bags 是复数，are 正确。'], ['I am by the door.', 'I 与 am 搭配，正确。'], ['The bag are by the door.', 'bag 是单数，应把 are 改成 is。']], 'c'),
    transfer: choice('窗边只有一位老师。选出正确描述。', [['The teacher is by the window.', 'teacher 是单数，用 is。'], ['The teacher are by the window.', '一个 teacher 不与 are 搭配。'], ['The teacher am by the window.', 'am 只与主语 I 搭配。']], 'a'),
  },
  {
    id: 'e-present', title: '习惯句里的动词开关', topicId: 'g-present', grade: 7,
    question: '第一种条件是我每天喂鱼。I ___ the fish every day. 先猜动词，再换主语、换成否定。',
    prediction: prediction(['feeds', 'feeding', 'feed'], 'c', 'I 作主语的一般现在时肯定句用动词原形 feed；every day 说明这是习惯。'),
    conditions: [
      condition('self', '我：肯定', [['I ', 'subject', '第一人称'], ['feed ', 'verb', '习惯句用原形'], ['the fish ', 'object', '喂养对象'], ['every day.', 'time', '每天发生']], '主语 I 不要求 feed 加 s。', 'present'),
      condition('third', '她：肯定', [['She ', 'subject', '第三人称单数'], ['feeds ', 'verb', '肯定句用单三形式'], ['the fish ', 'object', '对象不变'], ['every day.', 'time', '频率不变']], '换成 she，肯定句的实义动词变为 feeds。', 'present'),
      condition('negative', '她：否定', [['She ', 'subject', '第三人称单数'], ['does not feed ', 'verb', 'does 承担人称变化，feed 还原'], ['the fish ', 'object', '对象不变'], ['every day.', 'time', '并非每天都喂']], 'does not feed every day 表示并非每天喂，不等于从来不喂；不能再写 feeds。', 'present'),
    ],
    discovery: '单三肯定句把变化放在实义动词上；加 does 构成否定后，后面的实义动词恢复原形。',
    spot: choice('哪一句的动词形式有错？', [['He feeds the rabbit.', 'he 的肯定句用 feeds，正确。'], ['He does not feeds the rabbit.', 'does 后应接原形 feed，不能再加 s。'], ['We do not feed the rabbit.', 'we 的否定句用 do not feed，正确。']], 'b'),
    transfer: choice('用一般现在时说“我姐姐周末洗自行车”。', [['My sister wash her bike at weekends.', '单三肯定句 wash 要加 es。'], ['My sister washing her bike at weekends.', 'washing 不能独自充当这里的谓语。'], ['My sister washes her bike at weekends.', 'sister 是单数，wash 的单三形式是 washes。']], 'c'),
  },
  {
    id: 'e-continuous', title: '把镜头对准此刻', topicId: 'g-continuous', grade: 7,
    question: '第一幅镜头里，一个女孩正在画画。She ___ a bird now. 先选，再切换人数和动作是否正在发生。',
    prediction: prediction(['is drawing', 'are drawing', 'draw'], 'a', 'she 用 is；正在发生的动作用 be 加 drawing。'),
    conditions: [
      condition('one', '她正在画', [['She ', 'subject', '单数人物'], ['is drawing ', 'verb', 'is 加动词-ing'], ['a bird ', 'object', '画的内容'], ['now.', 'time', '镜头中的此刻']], '现在进行时既要有 be，也要有动词-ing。', 'present'),
      condition('many', '她们正在画', [['They ', 'subject', '复数人物'], ['are drawing ', 'verb', '复数用 are，drawing 不变'], ['a bird ', 'object', '画的内容'], ['now.', 'time', '仍是此刻']], '改变人数时，变的是 be 的形式，不是 drawing。', 'present'),
      condition('not', '她此刻没有画', [['She ', 'subject', '仍是单数人物'], ['is not drawing ', 'verb', 'not 放在 be 后'], ['a bird ', 'object', '被否定的动作内容'], ['now.', 'time', '只说明此刻']], '否定进行时保留 is 和 drawing，在它们之间加 not。', 'present'),
    ],
    discovery: '此刻动作的骨架是主语加 be 加动词-ing；人数控制 be，否定词跟在 be 后。',
    spot: choice('找出描述此刻动作时缺了必要成分的一句。', [['The boys are painting now.', 'are 与 painting 齐全。'], ['The boy is not painting now.', 'is not painting 是正确的否定进行时。'], ['The boy painting now.', '缺少 be，应为 The boy is painting now.']], 'c'),
    transfer: choice('此刻两只猫正在睡觉。选出正确句子。', [['The cats is sleeping now.', 'cats 是复数，不能用 is。'], ['The cats are sleeping now.', '复数主语配 are，再接 sleeping。'], ['The cats are sleep now.', '进行时的实义动词需要 sleeping。']], 'b'),
  },
  {
    id: 'e-past', title: '把事情移到昨天', topicId: 'g-past', grade: 7,
    question: '第一种条件：她昨天走路回家。She ___ home yesterday. 先预测，再比较否定和提问。',
    prediction: prediction(['walk', 'walked', 'walking'], 'b', 'yesterday 把已发生的动作定位在过去；肯定句用 walked。'),
    conditions: [
      condition('yes', '昨天：发生了', [['She ', 'subject', '动作发出者'], ['walked ', 'verb', '过去式'], ['home ', 'neutral', 'home 在这里表示方向'], ['yesterday.', 'time', '明确的过去时间']], '肯定句由 walked 标记过去。', 'past'),
      condition('no', '昨天：没有发生', [['She ', 'subject', '人物不变'], ['did not walk ', 'verb', 'did 标记过去，walk 还原'], ['home ', 'neutral', '方向不变'], ['yesterday.', 'time', '仍是昨天']], '否定句不是 did not walked，过去变化已经由 did 承担。', 'past'),
      condition('ask', '问昨天是否发生', [['Did ', 'verb', '提到句首的过去式助动词'], ['she ', 'subject', '助动词后接主语'], ['walk ', 'verb', '实义动词用原形'], ['home ', 'neutral', '方向'], ['yesterday?', 'time', '询问昨天的事']], '一般疑问句把 Did 放到主语前，walk 保持原形。', 'past'),
    ],
    discovery: '一般过去时中，肯定句的实义动词用过去式；有 did 后，实义动词就用原形。',
    spot: choice('哪一句重复标记了过去，必须改正？', [['Did he opened the gate?', 'Did 后要用 open，不能再用 opened。'], ['He opened the gate yesterday.', '肯定句用 opened，正确。'], ['He did not open the gate.', 'did not 后用 open，正确。']], 'a'),
    transfer: choice('询问“你昨晚看了那场比赛吗？”', [['Did you watched the match last night?', 'Did 后的 watched 应还原。'], ['Do you watched the match last night?', '过去时间不能使用 do 加 watched。'], ['Did you watch the match last night?', 'Did 提问过去的事，watch 用原形。']], 'c'),
  },
  {
    id: 'e-future', title: '给明天的句子换挡', topicId: 'g-future', grade: 7,
    question: '第一种条件是已经安排好明天修椅子。We ___ repair the chair tomorrow. 使用 be going to 结构，空格选什么？',
    prediction: prediction(['are going to', 'is going to', 'going to'], 'a', 'we 与 are 搭配；be going to 后接动词原形 repair。'),
    conditions: [
      condition('team', '我们已有计划', [['We ', 'subject', '复数主语'], ['are going to repair ', 'verb', '计划结构加原形 repair'], ['the chair ', 'object', '要修的物品'], ['tomorrow.', 'time', '将来时间']], '已有计划可用 be going to；这里 we 要求 are。', 'future'),
      condition('one', '换成他独自计划', [['He ', 'subject', '第三人称单数'], ['is going to repair ', 'verb', '换主语后 are 变 is'], ['the chair ', 'object', '物品不变'], ['tomorrow.', 'time', '仍是明天']], '计划内容不变，只因主语变化而改变 be。', 'future'),
      condition('cancel', '他的计划取消了', [['He ', 'subject', '人物不变'], ['is not going to repair ', 'verb', '否定这个计划'], ['the chair ', 'object', '计划中的物品'], ['tomorrow.', 'time', '只否定明天这项安排']], 'not 放在 is 后；这句话不说明他以后永远不修。', 'future'),
    ],
    discovery: 'be going to 不是一整块不变的词：be 要随主语变，否定时在 be 后加 not，后面的动词用原形。',
    spot: choice('哪句把 be going to 后面的动词用错了？', [['They are going to paint the fence.', 'to 后接 paint，正确。'], ['She is going to paints the fence.', 'to 后接原形 paint，不加 s。'], ['I am not going to paint the fence.', 'am not going to paint 形式正确。']], 'b'),
    transfer: choice('按已有计划，我明天要去看望姑姑。使用 be going to。', [['I is going to visit my aunt tomorrow.', 'I 应与 am 搭配。'], ['I am going to visited my aunt tomorrow.', 'to 后不能用 visited。'], ['I am going to visit my aunt tomorrow.', 'am 配 I，visit 是原形。']], 'c'),
  },
  {
    id: 'e-perfect', title: '过去的动作，现在的结果', topicId: 'g-perfect', grade: 8,
    question: '第一种条件：她已经洗好杯子，现在可以用了。She ___ washed the cups. 先预测助动词，再换人数和完成状态。',
    prediction: prediction(['have', 'has', 'is'], 'b', '现在完成时由 have 或 has 加过去分词构成；she 用 has，washed 是过去分词。'),
    conditions: [
      condition('one', '她已经洗好', [['She ', 'subject', '第三人称单数'], ['has washed ', 'verb', 'has 加过去分词'], ['the cups.', 'object', '现在已有洗好的杯子']], '动作已完成，结果与现在有关；she 配 has。', 'present'),
      condition('many', '她们已经洗好', [['They ', 'subject', '复数主语'], ['have washed ', 'verb', '改用 have，分词不变'], ['the cups.', 'object', '同样的当前结果']], '主语变为 they，has 变为 have，washed 不变。', 'present'),
      condition('not-yet', '她还没洗好', [['She ', 'subject', '又换回单数'], ['has not washed ', 'verb', '否定完成状态'], ['the cups ', 'object', '尚未洗好的杯子'], ['yet.', 'time', '到现在还没有']], 'has not 与 yet 一起表达截至现在尚未完成。', 'present'),
    ],
    discovery: '现在完成时关注过去到现在的联系；主语控制 have 或 has，后面的过去分词不随人数变化。',
    spot: choice('找出现在完成时形式有错的一句。', [['He has broke the cup.', 'break 的过去分词是 broken，应为 has broken。'], ['They have washed the cups.', 'have 加 washed，正确。'], ['She has not washed them yet.', 'has not 加过去分词，正确。']], 'a'),
    transfer: choice('想说“我已经吃过早饭，现在不饿”。选择现在完成时的正确表达。', [['I has eaten breakfast.', 'I 应与 have 搭配。'], ['I have eaten breakfast.', 'have 加 eat 的过去分词 eaten。'], ['I have ate breakfast.', 'ate 是过去式，这里需要过去分词 eaten。']], 'b'),
  },
  {
    id: 'e-comparison', title: '比较范围变了，词形呢？', topicId: 'g-comparison', grade: 8,
    question: '第一种条件：红色绳子比蓝色绳子长。The red rope is ___ than the blue one. 先预测，再改变比较关系和范围。',
    prediction: prediction(['longest', 'long', 'longer'], 'c', 'than 引出比较对象，两条绳子相比用比较级 longer。'),
    conditions: [
      condition('two', '两条：红的更长', [['The red rope ', 'subject', '比较对象之一'], ['is ', 'verb', '连接主语与描述'], ['longer than the blue one.', 'neutral', '比较级加 than']], '两条绳子比较长短，用 longer than。'),
      condition('equal', '两条：同样长', [['The red rope ', 'subject', '仍比较同一条绳子'], ['is ', 'verb', '连接描述'], ['as long as the blue one.', 'neutral', 'as 加原级加 as']], '设定改成等长，as 与 as 之间用原级 long。'),
      condition('three', '三条：红的最长', [['The red rope ', 'subject', '三条中的一条'], ['is ', 'verb', '连接描述'], ['the longest of the three.', 'neutral', '三条中的最高程度']], '把范围扩到三条，并设定红的最长，用 the longest。'),
    ],
    discovery: '更长用 longer than，同样长用 as long as，三者中最长用 the longest；先看关系和范围，再选形式。',
    spot: choice('哪一句的比较结构有错？', [['This path is longer than that one.', '比较级接 than，正确。'], ['This path is as longer as that one.', 'as...as 中间用原级 long。'], ['This is the longest path in the park.', '公园范围内的最高级可用 the longest。']], 'b'),
    transfer: choice('三座塔中，这座最矮。用 short 的正确形式。', [['This tower is the shortest of the three.', '三者中最矮用 the shortest。'], ['This tower is shorter of the three.', '这里表示三者中的最矮，不能只用比较级。'], ['This tower is as shortest as the other two.', 'as...as 不能放最高级，也改变了原意。']], 'a'),
  },
  {
    id: 'e-pronouns', title: '位置一换，代词也换', topicId: 'g-pronouns', grade: 6,
    question: '第一种条件：代词作主语，意思是“她认识我”。___ knows me. 先选，再交换两个人的位置。',
    prediction: prediction(['She', 'Her', 'Hers'], 'a', '空格作 knows 的主语，用主格 She；her 作宾语或放在名词前，hers 表示她的东西。'),
    conditions: [
      condition('she-subject', '她认识我', [['She ', 'subject', '主格作主语'], ['knows ', 'verb', '主语为单三'], ['me.', 'object', '宾格作宾语']], '她是认识别人的人，用 She；我在宾语位置，用 me。', 'present'),
      condition('i-subject', '我认识她', [['I ', 'subject', '我改作主语'], ['know ', 'verb', 'I 后用原形'], ['her.', 'object', '她改作宾语']], '交换人物角色后，me 变 I，She 变 her，knows 也要变 know。', 'present'),
      condition('we-subject', '我们认识他们', [['We ', 'subject', '主格复数'], ['know ', 'verb', '复数主语后用原形'], ['them.', 'object', 'they 的宾格']], '换成两组人，主语用 We，宾语用 them，不能用 they。', 'present'),
    ],
    discovery: '代词要看在句中做什么：发出动作的主语用主格，动作涉及的宾语用宾格；人物关系变了，含义也变。',
    spot: choice('找出宾语代词用错的一句。', [['They know us.', 'us 是 we 的宾格，正确。'], ['We know her.', 'her 可作宾语，正确。'], ['She knows I.', 'I 是主格，作 knows 的宾语应改为 me。']], 'c'),
    transfer: choice('“汤姆帮助我们。”哪一句正确？', [['Tom helps we.', '宾语位置不能用主格 we。'], ['Tom helps us.', 'us 在 helps 后作宾语。'], ['Tom helps our.', 'our 后面需要名词，不能单独作这里的宾语。']], 'b'),
  },
  {
    id: 'e-passive', title: '把镜头从人移到物', topicId: 'g-passive', grade: 9,
    question: '第一种条件：先说谁修了自行车，使用一般过去时主动句。Leo ___ the bike yesterday. 先选，再把自行车放到句首。',
    prediction: prediction(['was repaired', 'repaired', 'repair'], 'b', 'Leo 是修车的人，主动句用 repaired；was repaired 会把 Leo 说成被修的对象。'),
    conditions: [
      condition('active', '聚焦修车的人', [['Leo ', 'subject', '动作发出者'], ['repaired ', 'verb', '主动语态过去式'], ['the bike ', 'object', '动作承受者'], ['yesterday.', 'time', '过去时间']], '主语 Leo 发出 repair 这个动作。', 'past'),
      condition('passive-past', '聚焦昨天被修的车', [['The bike ', 'subject', '动作承受者变为主语'], ['was repaired ', 'verb', '过去被动：was 加过去分词'], ['by Leo ', 'neutral', 'by 引出动作发出者'], ['yesterday.', 'time', '同一次过去事件']], '换成被动语态不改变谁修谁；the bike 是单数，所以用 was。', 'past'),
      condition('passive-future', '改成明天将被修', [['The bike ', 'subject', '仍是承受动作的车'], ['will be repaired ', 'verb', '将来被动：will be 加过去分词'], ['by Leo ', 'neutral', '仍由 Leo 修'], ['tomorrow.', 'time', '改成将来时间']], '时间变为明天，过去的 was repaired 改为 will be repaired。', 'future'),
    ],
    discovery: '主动句主语发出动作，被动句主语承受动作；被动结构是相应时态的 be 加过去分词，动作关系不能倒过来。',
    spot: choice('找出被动结构有错的一句。', [['The gate was locked at six.', 'was 加过去分词 locked，正确。'], ['The gate will be locked at six.', 'will be 加过去分词 locked，正确。'], ['The gate was lock at six.', 'was 后需要过去分词 locked，不是原形 lock。']], 'c'),
    transfer: choice('说明这些桌子是昨天被清洁的，选择正确的过去被动句。', [['The desks were cleaned yesterday.', '复数 desks 配 were，再接 cleaned。'], ['The desks was cleaned yesterday.', '复数 desks 不能配 was。'], ['The desks were cleaning yesterday.', 'were cleaning 是主动进行时，不表示桌子被清洁。']], 'a'),
  },
  {
    id: 'e-modals', title: '“必须”和“不必”差多远？', topicId: 'g-modals', grade: 7,
    question: '第一种条件是图书馆明文禁止跑动。You ___ run here. 哪个词明确表达“禁止”？再切换成必须和不必。',
    prediction: prediction(['need not', 'can', 'must not'], 'c', 'must not 表示禁止；need not 表示没有必要，不能用来明确禁止跑动。'),
    conditions: [
      condition('ban', '规则：禁止跑动', [['You ', 'subject', '规则针对的人'], ['must not run ', 'verb', '明确禁止这个动作'], ['here.', 'neutral', '规则适用地点']], 'must not 是不准，不是可以不做。', 'present'),
      condition('required', '要求：必须步行', [['You ', 'subject', '同一个人'], ['must walk ', 'verb', '明确要求这个动作'], ['here.', 'neutral', '同一地点']], '把规则改为必须步行，must 后接原形 walk。', 'present'),
      condition('optional', '允许休息：不必步行', [['You ', 'subject', '仍针对同一个人'], ['need not walk ', 'verb', '取消必要性，不是禁止'], ['here.', 'neutral', '此处可以休息']], 'need not walk 表示没有必要走路，愿意走仍可以走。', 'present'),
    ],
    discovery: 'must 是必须，must not 是禁止，need not 是不必。改变情态表达，会改变规则强度和允许的行为。',
    spot: choice('哪一句的情态动词结构有错？', [['You must to wait outside.', 'must 后直接接原形 wait，不加 to。'], ['You must not enter this room.', 'must not 加原形 enter，正确。'], ['You need not bring a pen.', '情态用法 need not 后接原形 bring，正确。']], 'a'),
    transfer: choice('通知说水壶可带可不带。哪一句明确表达“不必带水壶”？', [['You must not bring a bottle.', '这表示禁止带，与可带可不带不同。'], ['You need not bring a bottle.', 'need not 表示没有必要带，不禁止带。'], ['You must bring a bottle.', '这表示必须带，与通知不同。']], 'b'),
  },
  {
    id: 'e-conditionals', title: '条件没发生，动词先别用 will', topicId: 'g-conditionals', grade: 8,
    question: '第一种条件是假设明天下雨：If it ___ tomorrow, we will play indoors. 先猜，再改成相反条件、交换分句顺序。',
    prediction: prediction(['rains', 'will rain', 'rained'], 'a', '谈真实的将来条件时，if 从句通常用一般现在时；it 后用 rains。'),
    conditions: [
      condition('rain', '如果下雨：室内活动', [['If ', 'neutral', '引出真实的将来条件'], ['it ', 'subject', '天气主语'], ['rains ', 'verb', '条件从句用现在时'], ['tomorrow, ', 'time', '将来时间'], ['we ', 'subject', '主句主语'], ['will play ', 'verb', '主句表达将来结果'], ['indoors.', 'neutral', '结果中的地点']], '明天的条件用 rains，结果用 will play。', 'future'),
      condition('dry', '如果不下雨：室外活动', [['If ', 'neutral', '仍引出条件'], ['it ', 'subject', '主语不变'], ['does not rain ', 'verb', '条件从句的现在时否定'], ['tomorrow, ', 'time', '时间不变'], ['we ', 'subject', '主句主语'], ['will play ', 'verb', '将来结果'], ['outside.', 'neutral', '根据新条件改变地点']], '条件改为不下雨，从句用 does not rain，不是 will not rain。', 'future'),
      condition('reverse', '同一条件，结果先说', [['We ', 'subject', '主句先出现'], ['will play ', 'verb', '主句的将来表达不变'], ['outside ', 'neutral', '活动地点'], ['if ', 'neutral', '后接条件，通常不用逗号隔开'], ['it ', 'subject', '条件从句主语'], ['does not rain ', 'verb', '仍然用现在时'], ['tomorrow.', 'time', '将来时间']], '交换两个分句的位置，不改变条件意义，也不把 rain 改成将来形式。', 'future'),
    ],
    discovery: '先认出 if 引导的是条件从句；真实将来条件通常用现在时，分句在前还是在后不改变这一点。',
    spot: choice('哪句把真实将来条件中的时态用错了？', [['If it snows tomorrow, we will stay inside.', '条件从句用 snows，正确。'], ['We will stay inside if it snows tomorrow.', '从句放后面仍用 snows，正确。'], ['If it will snow tomorrow, we will stay inside.', '这里是普通天气条件，if 后应为 snows。']], 'c'),
    transfer: choice('用真实将来条件句说：如果公交车早点到，我们就能赶上火车。', [['If the bus will arrive early, we will catch the train.', '普通将来条件从句不使用 will arrive。'], ['If the bus arrives early, we will catch the train.', 'bus 是单数，条件从句用 arrives。'], ['If the bus arrive early, we will catch the train.', '单数主语 bus 的一般现在时要用 arrives。']], 'b'),
  },
  {
    id: 'e-object-clauses', title: '问题装进句子，语序怎么排？', topicId: 'g-object-clauses', grade: 9,
    question: '第一种条件是直接询问地图在哪：Where ___? 先选，再把这个问题装进 I wonder 后面。',
    prediction: prediction(['the map is', 'is map the', 'is the map'], 'c', '直接的特殊疑问句把 is 放在主语 the map 前：Where is the map?'),
    conditions: [
      condition('direct', '直接问地图在哪', [['Where ', 'neutral', '询问位置'], ['is ', 'verb', '直接疑问句中提前的 be'], ['the map?', 'subject', '被询问位置的事物']], '直接疑问句用 Where 加 is 加主语。', 'present'),
      condition('embedded', '我想知道地图在哪', [['I ', 'subject', '主句主语'], ['wonder ', 'verb', '后接所想知道的内容'], ['where ', 'neutral', '连接宾语从句'], ['the map ', 'subject', '从句先放主语'], ['is.', 'verb', '从句的 be 回到主语后']], '变成宾语从句后，用 where the map is，不保留直接问句的倒装。', 'present'),
      condition('plural', '改问多张地图在哪', [['I ', 'subject', '主句主语'], ['wonder ', 'verb', '主句动词'], ['where ', 'neutral', '连接词不变'], ['the maps ', 'subject', '从句主语变复数'], ['are.', 'verb', '与复数 maps 一致']], '从句语序仍是主语在前；map 变复数时，is 也变为 are。', 'present'),
    ],
    discovery: '直接问句和宾语从句不能照搬同一语序：宾语从句按主语加谓语排列，同时核对从句主谓一致。',
    spot: choice('哪一句保留了不该有的倒装？', [['I wonder where is the key.', '宾语从句应为 where the key is。'], ['Where is the key?', '独立直接问句可以把 is 放在主语前。'], ['I wonder where the keys are.', '从句按 the keys 加 are 排列，正确。']], 'a'),
    transfer: choice('想知道车站在哪里。用 I wonder 开头选出正确表达。', [['I wonder where is the station.', 'where 引导宾语从句时不应倒装。'], ['I wonder where the station are.', '单数 station 不能与 are 搭配。'], ['I wonder where the station is.', '宾语从句主语 station 在 is 前，并保持单数一致。']], 'c'),
  },
]

export function getExperiment(id: string): Experiment | undefined { return experiments.find(experiment => experiment.id === id) }

/** Return actionable content problems; callers decide how to surface authoring failures. */
export function validateExperiments(catalogTopicIds: Iterable<string>, items: Experiment[] = experiments): string[] {
  const topics = new Set(catalogTopicIds), errors: string[] = [], ids = new Set<string>(), usedTopics = new Set<string>()
  const nonempty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
  const roles = new Set<ExperimentRole>(['subject', 'verb', 'object', 'time', 'neutral'])
  for (const experiment of items) {
    const fail = (message: string) => { errors.push(`${experiment.id}: ${message}`) }
    if (!/^[a-z][a-z0-9-]*$/.test(experiment.id) || ids.has(experiment.id)) fail('invalid or duplicate experiment id')
    ids.add(experiment.id)
    if (!topics.has(experiment.topicId)) fail(`unknown topic ${experiment.topicId}`)
    if (usedTopics.has(experiment.topicId)) fail('workshops must cover distinct topics')
    usedTopics.add(experiment.topicId)
    if (!Number.isInteger(experiment.grade) || experiment.grade < 6 || experiment.grade > 9) fail('grade must be 6–9')
    for (const key of ['title', 'question', 'discovery'] as const) if (!nonempty(experiment[key])) fail(`missing ${key}`)
    const checkOptions = (label: string, task: { options: ExperimentOption[]; correct: string }) => {
      if (task.options.length < 2) fail(`${label}: needs contrasting options`)
      if (new Set(task.options.map(o => o.id)).size !== task.options.length || task.options.some(o => !nonempty(o.id) || !nonempty(o.text))) fail(`${label}: empty or duplicate option id/text`)
      if (new Set(task.options.map(o => o.text.trim())).size !== task.options.length) fail(`${label}: duplicate option wording`)
      if (!task.options.some(o => o.id === task.correct)) fail(`${label}: correct answer is not an option`)
    }
    checkOptions('prediction', experiment.prediction)
    if (!nonempty(experiment.prediction.reason)) fail('prediction needs a reason')
    for (const label of ['spot', 'transfer'] as const) {
      const task = experiment[label]
      checkOptions(label, task)
      if (!nonempty(task.prompt)) fail(`${label}: missing prompt`)
      if (Object.keys(task.reasons).length !== task.options.length || task.options.some(o => !nonempty(task.reasons[o.id]))) fail(`${label}: explain every option`)
    }
    if (experiment.conditions.length < 3) fail('needs at least three conditions')
    if (new Set(experiment.conditions.map(c => c.id)).size !== experiment.conditions.length) fail('duplicate condition id')
    if (new Set(experiment.conditions.map(c => c.sentence)).size !== experiment.conditions.length) fail('conditions must change the sentence')
    for (const c of experiment.conditions) {
      if (![c.id, c.label, c.sentence, c.explanation].every(nonempty)) fail('incomplete condition')
      if (c.parts.length < 2 || c.parts.map(p => p.text).join('') !== c.sentence) fail(`${c.id}: parts must reconstruct the complete sentence`)
      if (c.parts.some(p => !nonempty(p.text) || !nonempty(p.note) || !roles.has(p.role))) fail(`${c.id}: invalid or unexplained sentence part`)
      if (!c.parts.some(p => p.role === 'subject') || !c.parts.some(p => p.role === 'verb')) fail(`${c.id}: mark subject and verb`)
      if (c.time && !['past', 'present', 'future'].includes(c.time)) fail(`${c.id}: invalid timeline value`)
      if (/\[\[|\]\]|___/.test(c.sentence)) fail(`${c.id}: unresolved sentence placeholder`)
    }
  }
  return errors
}
