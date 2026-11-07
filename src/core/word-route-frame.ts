/** Schematic relations and proposed statements; never measurements or completed real actions. */
export interface WordRouteFrame {kind:'across'|'through'|'along'|'towards'|'beyond';title:string;hint:string;wrong:string}
export interface WordRouteFrameView {kind:WordRouteFrame['kind'];title:string;hint:string;selected:string;chosen:boolean;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const choices={
 across:[['cross','让树横跨小路'],['parallel','让树顺着小路'],['side','把树放在路旁']],
 through:[['inside','沿内部隧道穿过'],['surface','从外部翻过山顶'],['around','绕开山丘']],
 along:[['beside','沿河跟着路标走'],['cross','横穿河流'],['finished','宣称已经走完']],
 towards:[['direction','朝芦苇丛，未确认到达'],['away','背离芦苇丛'],['arrived','宣称已经到达']],
 beyond:[['far-side','放在山丘那一边'],['near-side','放在观察者这一边'],['top','放在山顶上']]
}as const
const answers={across:'cross',through:'inside',along:'beside',towards:'direction',beyond:'far-side'}as const
const explanations:Record<WordRouteFrame['kind'],Record<string,string>>={
 across:{cross:'树横跨小路，体现本句across。示意没有提供实际长度、路宽或是否能够通行的信息。',parallel:'树顺着路延伸，没有横跨小路。',side:'树在路旁，不是本句横在路上的位置。'},
 through:{inside:'这条示意通路从山丘内部穿过，对应tunnel through the hill；图不是实际剖面或长度记录。',surface:'从外部表面翻越，没有走内部隧道。',around:'绕开山丘，没有从山丘内部穿过。'},
 along:{beside:'示意箭头沿河延伸，表达跟路标沿河走的要求，不证明现实中已经走完。',cross:'箭头横穿河流，改变了along所表达的沿河路线。',finished:'“已经走完”是额外提出的结果，不是Follow这条指令提供的事实。图中的标记只表示这个待判断的说法。'},
 towards:{direction:'箭头说明小船朝芦苇丛的方向；towards或toward本身不保证已经到达，图也不提供实际速度与距离。',away:'箭头背离芦苇丛，与本句towards the reeds相反。',arrived:'“确定已经到达”是额外提出的结果，不能只凭towards这条方向信息确认。问号表示结果仍需证据。'},
 beyond:{'far-side':'从固定观察者看，山丘是参照界限，村庄在其那一边：beyond。不表示实际距离或能否看见。','near-side':'村庄在观察者与山丘之间，是参照物的这一边。',top:'村庄在山顶，不等于原句山丘那一边的关系。'}
}
export const wordRouteFrameKey=(id:string)=>`workshopRouteFrame-${id}`
export function validWordRouteFrame(value:unknown):value is WordRouteFrame {if(!value||Array.isArray(value)||typeof value!=='object')return false;const x=value as WordRouteFrame;return Object.keys(x).length===4&&Object.keys(x).every(k=>['kind','title','hint','wrong'].includes(k))&&typeof x.kind==='string'&&Object.prototype.hasOwnProperty.call(choices,x.kind)&&([[x.title,60],[x.hint,110],[x.wrong,140]]as const).every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=n)}
const validState=(x:WordRouteFrame,raw:string)=>raw===''||choices[x.kind].some(c=>c[0]===raw)
export const routeFrameMatch=(x:WordRouteFrame,raw:string)=>answers[x.kind]===raw
export function changeRouteFrame(x:WordRouteFrame,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!validState(x,raw))return undefined;return choices[x.kind].some(c=>c[0]===action)?action:undefined}
export function wordRouteFrameView(x:WordRouteFrame,raw:string):WordRouteFrameView {const selected=validState(x,raw)?raw:'';return{kind:x.kind,title:x.title,hint:x.hint,selected,chosen:!!selected,reading:selected?explanations[x.kind][selected]:'还没选择关系；只显示参照物，不默认任何路线、到达结果或村庄位置。',choices:choices[x.kind].map(([id,label])=>({id,label,selected:selected===id}))}}
