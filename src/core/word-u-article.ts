/** Written phoneme cues teach article choice; this is not a listening assessment. */
export interface WordUArticle {title:string;hint:string;wrong:string}
export interface WordUArticleView {title:string;hint:string;useful:string;unusual:string;reading:string;rows:{id:string;phrase:string;sound:string;choice:string;choices:{id:string;label:string;selected:boolean}[]}[]}
export const wordUArticleKey=(id:string)=>`workshopUArticle-${id}`
function state(raw:string):{useful:string;unusual:string}|undefined {if(raw==='')return{useful:'',unusual:''};const m=/^(a|an|-):(a|an|-)$/.exec(raw);return m?{useful:m[1]==='-'?'':m[1],unusual:m[2]==='-'?'':m[2]}:undefined}
export function validWordUArticle(v:unknown):v is WordUArticle {if(!v||typeof v!=='object')return false;const w=v as WordUArticle;return[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
export function uArticleMatch(raw:string):boolean{return raw==='a:an'}
export function changeUArticle(raw:string,action:string):string|undefined {if(action==='reset')return'';const s=state(raw),m=/^(useful|unusual)-(a|an)$/.exec(action);if(!s||!m)return undefined;const n={...s,[m[1]]:m[2]};return(n.useful||'-')+':'+(n.unusual||'-')}
export function wordUArticleView(w:WordUArticle,raw:string):WordUArticleView {const s=state(raw)??{useful:'',unusual:''};return{title:w.title,hint:w.hint,...s,reading:raw==='a:an'?'a useful bag：首音/j/是辅音；an unusual shape：首音/ʌ/是元音。按首音，不按字母u。':'对照给出的首音，给两个短语各选a或an。这里只核对文字辨音。',rows:[{id:'useful',phrase:'useful bag',sound:'首音 /j/ · 辅音',choice:s.useful},{id:'unusual',phrase:'unusual shape',sound:'首音 /ʌ/ · 元音',choice:s.unusual}].map(row=>({...row,choices:['a','an'].map(x=>({id:row.id+'-'+x,label:x,selected:row.choice===x}))}))}}
