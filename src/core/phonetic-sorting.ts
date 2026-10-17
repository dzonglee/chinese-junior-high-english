export interface PhoneticSorting { title:string; categories:{id:string;label:string}[];cards:{id:string;text:string;category:string;reason:string}[];note:string }
const make=(title:string,labels:[string,string],rows:[string,number,string][]):PhoneticSorting=>({title,categories:labels.map((label,i)=>({id:`group-${i}`,label})),cards:rows.map(([text,category,reason],i)=>({id:`card-${i}`,text,category:`group-${category}`,reason})),note:'这里只判断书面标注，不测听辨、口音或实际发音；真实语流还受具体情境影响。'})
export const phoneticSorting:Record<string,PhoneticSorting>={
 'p-letter-sound':make('把字母名称和词中的音分开',['字母名称','词中的音'],[['b 的名称 /biː/',0,'名称中包含元音 /iː/，不能照搬到 bag 的开头。'],['bag 开头 /b/',1,'这里标出的是 bag 开头的辅音。'],['d 的名称 /diː/',0,'这是字母 d 的名称。'],['dog 开头 /d/',1,'这里需要的是辅音 /d/，不是字母名称。']]),
 'p-vowels':make('把词卡按元音分组',['/ɪ/','/iː/'],[['ship',0,'ship 的常见元音为 /ɪ/。'],['sheep',1,'sheep 的常见元音为 /iː/。'],['sit',0,'sit 与 ship 一样使用 /ɪ/。'],['seat',1,'seat 与 sheep 一样使用 /iː/。']]),
 'p-consonants':make('同样写 th，词中的音可能不同',['/θ/','/ð/'],[['think',0,'think 开头通常用清辅音 /θ/。'],['this',1,'this 开头通常用浊辅音 /ð/。'],['thin',0,'thin 开头通常用 /θ/。'],['that',1,'that 开头通常用 /ð/。']]),
 'p-word-stress':make('把词卡放到主要重音的位置',['第一音节重读','第二音节重读'],[['teacher',0,'teacher 的主要重音在第一音节。'],['banana',1,'banana 的主要重音在第二音节。'],['table',0,'table 的主要重音在第一音节。'],['tomorrow',1,'tomorrow 的主要重音在第二音节。']]),
 'p-sentence-stress':make('按明确的对比意图归类',['强调买书的人','强调买的东西'],[['I bought the book.（重读 I）',0,'题目把 I 标为重读，对比的是谁买的。'],['I bought the BOOK.（重读 book）',1,'题目把 book 标为重读，对比的是买了什么。']]),
 'p-thought-groups':make('按“时间短语作为完整意群”的目标归类',['保留完整的时间意群','拆开了本题的时间短语'],[['After lunch / we will practise in the hall.',0,'After lunch 在这里作为完整时间短语保留。'],['After / lunch we will practise in the hall.',1,'这个标注把本题希望保留的 After lunch 拆开了；不是断言所有真实语境都不许这样停顿。']]),
 'p-connected-speech':make('区分连接标注和逐词分隔标注',['标出了连接','只标出逐词分隔'],[['pick‿it‿up',0,'连接号提示词末辅音与后续词首元音的连接。'],['turn‿it‿off',0,'n 接 it 的元音，it 的末辅音接 off 的元音。'],['pick / it / up',1,'这里只标了词间分隔，没有标出本题要求的连接。'],['turn / it / off',1,'这是逐词分隔的标注，不是连接标注。']]),
 'p-intonation':make('按本题给定的中性语境归类',['中性一般疑问：等待回答','完整陈述：说明事实'],[['Are you ready? ↗',0,'在本题的中性提问语境中，用升调示意等待回答。'],['Is it open? ↗',0,'这是本题中常见的中性一般疑问语调示意。'],['I am ready. ↘',1,'这里用降调示意完整地说明事实。'],['The door is open. ↘',1,'这里是完整陈述的基础语调示意；其他情境可能使用不同语调。']])
}
