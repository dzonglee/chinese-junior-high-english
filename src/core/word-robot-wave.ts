/** Either arm can demonstrate one wave; this activity does not bound other abilities. */
export interface WordRobotWave {title:string;hint:string;wrong:string}
export interface WordRobotWaveView {title:string;hint:string;reading:string;left:boolean;right:boolean;arms:{id:string;label:string;selected:boolean}[]}
export const wordRobotWaveKey=(id:string)=>`workshopRobotWave-${id}`
function state(raw:string):[boolean,boolean]|undefined{if(raw==='')return[false,false];if(!/^[01]:[01]$/.test(raw))return undefined;const [left,right]=raw.split(':');return[left==='1',right==='1']}
export function validWordRobotWave(value:unknown):value is WordRobotWave{if(!value||typeof value!=='object')return false;const w=value as WordRobotWave;return [[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,max])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(max as number))}
export function robotWaveMatch(raw:string):boolean{return raw==='1:0'||raw==='0:1'}
export function changeRobotWave(raw:string,action:string):string|undefined{if(action==='reset')return'';const pair=state(raw);if(!pair)return undefined;if(action==='left')pair[0]=!pair[0];else if(action==='right')pair[1]=!pair[1];else return undefined;return pair.map(x=>x?'1':'0').join(':')}
export function wordRobotWaveView(w:WordRobotWave,raw:string):WordRobotWaveView{const[left,right]=state(raw)??[false,false];return{title:w.title,hint:w.hint,left,right,reading:left&&right?'两只手臂都在挥动':left?'左臂在挥动，右臂不动':right?'右臂在挥动，左臂不动':'两只手臂都没动',arms:[{id:'left',label:'左臂',selected:left},{id:'right',label:'右臂',selected:right}]}}
