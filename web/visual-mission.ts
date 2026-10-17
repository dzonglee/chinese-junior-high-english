import type{MissionView}from'../src/core/visual-mission'
const esc=(v:unknown='')=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))
export function renderVisualMission(v:MissionView,artwork:(name:string)=>string):string{
 const button=(a:string,value:string,label:string,cls='mission-chip',disabled=false)=>`<button class="${cls}" data-action="studio-mission-${a}" data-value="${esc(value)}" ${disabled?'disabled':''}>${esc(label)}</button>`
 if(v.lab?.open){const l=v.lab;return `<section class="visual-mission mission-lab"><span class="mission-badge">换条件，看变化</span><h2 class="mission-title">${esc(l.title)}</h2><p class="help mission-instruction">点下面两个条件，观察句子中高亮的部分怎样变化。</p><div class="lab-switch">${l.states.map((state,i)=>button('lab',String(i),state.label,`lab-condition ${l.index===i?'selected':''}`)).join('')}</div><div class="live-language"><span class="live-input">${esc(l.states[l.index].label)}</span><div class="lab-arrow">↓</div><div class="live-sentence"><span>${esc(l.before)}</span><strong>${esc(l.focus)}</strong><span>${esc(l.after)}</span></div></div><p class="lab-discovery" role="status">${esc(l.note)}</p>${button('lab-pane','','我看懂了，去修一句','button primary')}</section>`}
 const active=v.slots.find(s=>s.selected)!,kind=v.board.kind
 let task=esc(v.displayText)
 if(kind==='repair')task=task.replace(/_+/g,`<strong class="repair-word ${active.done?'fixed':''}">${esc(active.placed||active.initial||'…')}</strong>`)
 if(v.recall)task=task.replace(/_+/g,'___')
 if(kind==='context'&&!v.recall)task=task.replace(/_+/g,`<strong class="context-gap ${active.done?'fixed':''}">${esc(active.placed||'点下方词卡')}</strong>`)
 return `<section class="visual-mission mission-${kind}" data-board="${esc(v.board.id)}" data-kind="${kind}">
 ${v.art?`<div class="mission-scene"><img src="${esc(artwork(v.art))}" alt="校园或探究活动的情境插画；作答以文字线索为准"/><span class="scene-caption">${kind==='context'?'在情境里用词':'把英语用起来'}</span></div>`:''}
 <div class="mission-topline"><span class="mission-badge">${({context:'词卡连线',repair:'修句工坊',evidence:'证据侦探',storyboard:'表达分镜',sound:'规律分类'})[kind]}</span><span>${v.index+1} / ${v.total} 组</span></div>
 <h2 class="mission-title">${esc(v.board.title)}</h2><p class="help mission-instruction">${esc(v.board.instruction)}</p>
 <div class="mission-board-tabs">${Array.from({length:v.total},(_,i)=>button('board',String(i),`${v.doneBoards[i]?'✓ ':''}${i+1}`,`mission-dot ${v.index===i?'current':''}`)).join('')}</div>
 <div class="mission-dock">${v.slots.map((s,i)=>button('slot',s.id,`${s.done?'✓':String(i+1).padStart(2,'0')} ${s.label}`,`mission-port ${s.selected?'active':''} ${s.done?'done':''}`)).join('')}</div>
 <div class="mission-canvas diagram-${esc(v.board.diagram)}"><div class="mission-canvas-label">${kind==='storyboard'?'这一幕说了什么':kind==='evidence'?'先锁定问题':kind==='repair'?'试着修好这句':kind==='sound'?'观察这个例子':'让句意完整'}</div>${v.goal?`<p class="mission-goal">${esc(v.goal)}</p>`:''}<p class="mission-context">${task}</p>${v.pitch?`<div class="pitch-diagram" aria-label="${v.pitch==='rise'?'音高上升':'音高下降'}"><span class="pitch-line pitch-${v.pitch}"></span></div>`:''}
 ${kind==='repair'&&!/_+/.test(v.active.text)?`<div class="repair-original">待替换：<s>${esc(active.placed||active.initial)}</s></div>`:''}
 <div class="mission-link"><span class="link-node">${kind==='evidence'?'问题':kind==='storyboard'?'一句表达':'语境'}</span><span class="link-thread"></span><span class="link-node ${active.done?'solved':''}">${active.done&&!v.recall?esc(active.placed):'?'}</span>${kind==='evidence'?`<span class="link-thread"></span><span class="link-node ${active.done?'solved':''}">${active.done?esc(v.board.conclusion):'结论待解锁'}</span>`:''}</div></div>
 <div class="mission-tools">${button('hint','',v.hint?'收起提示':'给我一条线索','mission-tool')}${v.board.material?button('material','',v.materialOpen?'收起材料':'打开任务材料','mission-tool'):''}</div>
 ${v.hint?`<p class="mission-hint">${esc(v.active.hint)}</p>`:''}${v.materialOpen?`<p class="mission-material passage">${esc(v.board.material)}</p>`:''}
 <p class="mission-bank-label">${kind==='storyboard'?'选择这句承担的任务':kind==='evidence'?'把原文线索接进来':kind==='sound'?'送进对应分类':'点一张卡，放进当前空位'}</p>
 ${!v.recall?`<div class="mission-bank">${v.chips.map(c=>button('place',c.id,c.text,`mission-chip ${c.selected?'placed':''} ${kind==='evidence'?'evidence-card':''}`,c.used)).join('')}</div>`:''}
 ${kind==='context'?`${button('recall','',v.recall?'返回词卡':'遮住词卡，自己拼一次','mission-tool')}${v.recall?`<input class="input mission-recall" name="studioMissionRecall" maxlength="100" aria-label="遮住词卡后的拼写" value="${esc(v.recallValue)}"/>${button('recall-check','','核对拼写','button secondary')}${v.recallChecked?`<p class="mission-feedback ${v.recallCorrect?'correct':''}">${v.recallCorrect?'这次拼对了。':'还没拼对。可以再试一次，或回词卡核对。'}</p>`:''}`:''}`:''}
 ${kind==='storyboard'?`<label class="mission-own"><span class="field-label">换成我的说法</span><span class="help">保留这句的作用，换一个自己的细节。这里只保存草稿，不自动评分。</span><textarea class="input textarea" name="studioMissionOwn" maxlength="1000" aria-label="这个分镜的原创表达">${esc(v.ownLine)}</textarea></label>`:''}
 ${v.feedback&&!v.recall?`<div class="mission-feedback ${v.correct?'correct':''}" role="status"><span class="feedback-symbol">${v.correct?'✓':'↻'}</span><p>${esc(v.feedback)}</p></div>`:''}
 ${v.boardDone?'<p class="mission-success">✓ 这一组已完成。可以继续，也可以点已完成的卡片再看一遍。</p>':''}
 </section>`
}
