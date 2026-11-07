/** Reversible semantic diagrams, not measurements or records of real physical actions. */
export interface WordRelationScene {kind:'under'|'over'|'above'|'below'|'into'|'onto';title:string;hint:string;wrong:string}
export interface WordRelationSceneView {kind:WordRelationScene['kind'];title:string;hint:string;selected:string;chosen:boolean;reading:string;choices:{id:string;label:string;selected:boolean}[]}
const frames={
 under:[['under','放到长椅下面'],['on','放到椅面上'],['beside','放到长椅旁边']],
 over:[['across','让桥横跨小溪'],['bank','让桥沿着岸边'],['in-water','把桥放进溪水中']],
 above:[['upper-left','挂到左上方'],['upper-right','挂到右上方'],['lower','挂到窗口下方']],
 below:[['lower-left','写到图片左下方'],['lower-right','写到图片右下方'],['upper','写到图片上方']],
 into:[['before','还没倒入'],['inside','演示倒进碗里'],['beside','演示倒在碗旁']],
 onto:[['before','还在地面上'],['seat','演示落到椅面上'],['air','还在椅子上方的空中']]
}as const
const correct={under:['under'],over:['across'],above:['upper-left','upper-right'],below:['lower-left','lower-right'],into:['inside'],onto:['seat']}as const
const interpretations:Record<WordRelationScene['kind'],Record<string,string>>={
 under:{under:'靴子位于长椅下面；这是存放要求的句意演示，不证明已经放好了。',on:'靴子放在椅面上，成为on，不是本句的under。',beside:'靴子在长椅旁边，没有放到长椅下面。'},
 over:{across:'桥从一岸跨到另一岸，体现本句over the stream的横跨关系。示意不提供实际尺寸或承重信息。',bank:'桥沿岸边摆放，没有跨过小溪。', 'in-water':'桥被放进溪水中，与本句横跨小溪不同。'},
 above:{'upper-left':'标牌在窗口左上方。above表达高于这里的窗口，不要求必须正对窗口中心。','upper-right':'标牌在窗口右上方，也属于本图的上方；不能把above背成只能正上方。',lower:'标牌在窗口下方，与above相反。'},
 below:{'lower-left':'答案写在图片左下方，保留below的下方关系，不要求必须居中。','lower-right':'答案写在图片右下方，也在图片下方；这里只演示要求的位置。',upper:'答案在图片上方，没有按below的要求摆放。'},
 into:{before:'混合物还没进入碗，不能用这个未变化状态演示into所表示的进入。',inside:'演示的去向是碗的内部：into。原句是倒入的指令，不证明现实中已经执行，也不提供用量。',beside:'混合物到了碗旁，没有进入碗的内部。'},
 onto:{before:'小猫还在地面上，没演示出jumped onto the chair的落点。',seat:'演示小猫跳到椅面上：onto突出移到表面的落点，不保证它以后一直留在那里。',air:'小猫仍在椅子上方的空中，没有演示出onto所表示的表面落点。'}
}
export const wordRelationSceneKey=(id:string)=>`workshopRelationScene-${id}`
export function validWordRelationScene(v:unknown):v is WordRelationScene {if(!v||Array.isArray(v)||typeof v!=='object')return false;const w=v as WordRelationScene;return Object.keys(w).length===4&&Object.keys(w).every(k=>['kind','title','hint','wrong'].includes(k))&&typeof w.kind==='string'&&Object.prototype.hasOwnProperty.call(frames,w.kind)&&[[w.title,60],[w.hint,110],[w.wrong,140]].every(([s,n])=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=(n as number))}
const validState=(w:WordRelationScene,raw:string)=>raw===''||frames[w.kind].some(c=>c[0]===raw)
export const relationSceneMatch=(w:WordRelationScene,raw:string)=>(correct[w.kind]as readonly string[]).includes(raw)
export function changeRelationScene(w:WordRelationScene,raw:string,action:string):string|undefined {if(action==='reset')return'';if(!validState(w,raw))return undefined;return frames[w.kind].some(c=>c[0]===action)?action:undefined}
export function wordRelationSceneView(w:WordRelationScene,raw:string):WordRelationSceneView {const selected=validState(w,raw)?raw:'';return{kind:w.kind,title:w.title,hint:w.hint,selected,chosen:!!selected,reading:selected?interpretations[w.kind][selected]:'还没选状态，待摆物暂不显示。参照物保持固定；选择后再比较关系。',choices:frames[w.kind].map(([id,label])=>({id,label,selected:selected===id}))}}
