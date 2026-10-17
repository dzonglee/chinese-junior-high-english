// Run with the official SDK on Mac Studio, while holding the shared DevTools lock.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const automator=require(process.env.WECHAT_AUTOMATOR || '/Volumes/MacStudioExternal/ChrisverseMCP/workspace/wechat/tooling/node_modules/miniprogram-automator');
const project=path.resolve(process.argv[2]||'.'),tag=process.env.ENGLISH_NATIVE_OUTPUT||'',spelling=process.env.ENGLISH_NATIVE_SPELLING||'american',focus=new Set((process.env.ENGLISH_NATIVE_LESSONS||'').split(',').filter(Boolean));assert(/^[a-z0-9-]*$/.test(tag));assert(['american','british'].includes(spelling));const out=path.join(project,'native-artifacts',tag);fs.mkdirSync(out,{recursive:true});
let evaluationId=0;
async function evaluateAsync(mini,fn,arg=null){
 // Construct the callback on the host: guest appservice disables new Function.
 // Only our authored test function is embedded; no remote dynamic evaluator is used.
 const execute=new Function('return function englishTeaching'+(++evaluationId)+'(){ const payload='+JSON.stringify(arg)+'; const g=getApp().globalData;g.englishTeachingTest={pending:true};Promise.resolve().then(()=>('+fn.toString()+')(payload)).then(value=>{g.englishTeachingTest={pending:false,value};},error=>{g.englishTeachingTest={pending:false,error:String(error.message||error.errMsg||error)};});return true;}')();
 await mini.evaluate(execute);
 const end=Date.now()+90000;
 while(Date.now()<end){const r=await mini.evaluate(function(){return getApp().globalData.englishTeachingTest;});if(r&&!r.pending){if(r.error)throw new Error(r.error);return r.value;}await new Promise(resolve=>setTimeout(resolve,100));}
 throw new Error('Timed out waiting for the English controller task');
}
(async()=>{let mini,backup,baseline;const errors=[],rows=[];try{
 console.log("stage: launching official DevTools automation");
 mini=await automator.launch({cliPath:'/Applications/wechatwebdevtools.app/Contents/MacOS/cli',projectPath:project,timeout:90000});
 console.log('stage: automation connected');
 await mini.reLaunch('/pages/home/index');
 await new Promise(resolve=>setTimeout(resolve,1200));
 await evaluateAsync(mini,async()=>{await getApp().globalData.ready;return !!getApp().globalData.application;});
 console.log('stage: application ready');
 backup=await evaluateAsync(mini,()=>JSON.stringify(getApp().globalData.application.store.get()));const saved=JSON.parse(backup);baseline={attempts:saved.attempts.length,mastery:Object.keys(saved.mastery).length,passes:Object.keys(saved.lessonDoneAt).length};
 mini.on('exception',e=>errors.push(String(e.message||e)));
 console.log('stage: opening onboarding');
 await mini.reLaunch('/pages/onboarding/index');
 console.log('stage: onboarding opened');
 await evaluateAsync(mini,async spelling=>{const a=getApp().globalData.application,editionId=spelling==='american'?'pep-legacy':a.catalog.editions.find(e=>e.spelling==='british'&&e.structures.includes('63')&&e.id.includes('legacy'))?.id;if(!editionId)throw new Error('No matching test edition');for(const [key,value] of Object.entries({cityId:'北京-北京',structure:'63',grade:'9',editionId}))a.setField(key,value);await a.action('save-profile');},spelling);
 await new Promise(r=>setTimeout(r,1200));
 console.log('stage: profile saved');
 const authoredLessons=await mini.evaluate(function(){return getApp().globalData.application.catalog.lessons.map(l=>({id:l.id,topicId:l.topicId,skill:getApp().globalData.application.catalog.topics.find(t=>t.id===l.topicId).skill,grade:Math.min(...l.grades)}));});
 assert.equal(authoredLessons.length,413);
 const representatives=[];
 for(const skill of ['grammar','reading','listening','vocabulary','speaking','writing','phonetics']){const l=authoredLessons.find(l=>(l.topicId.startsWith('p-')?'phonetics':l.skill)===skill);if(l)representatives.push(l);}
 let lessons=[...representatives,...authoredLessons.filter(l=>!representatives.some(r=>r.id===l.id))];
 if(focus.size){lessons=lessons.filter(l=>focus.has(l.id));assert.equal(lessons.length,focus.size,'Every focused lesson must exist');}
 const expectedCount=lessons.length;
 const routeSamples=[];let checkedCommunication=false,checkedReading=false,checkedPhonetics=false;const controlChecks=[];
 for(const [index,l] of lessons.entries()){
  const full=focus.size>0||index<representatives.length||process.env.ENGLISH_NATIVE_FULL_FLOW==='1';
  // Open through the real course action: the SDK can retain an old query on same-page reLaunch.
  await evaluateAsync(mini,async l=>{const a=getApp().globalData.application,state=a.store.get();const structure=l.grade===6?'54':'63',editionId=l.spelling==='american'?(l.grade===6?'pep-54':'pep-legacy'):(a.catalog.editions.find(e=>e.spelling==='british'&&e.structures.includes(structure)&&e.id.includes('legacy'))||a.catalog.editions.find(e=>e.spelling==='british'&&e.structures.includes(structure)))?.id;if(!editionId)throw new Error('No matching test edition');a.store.save({...state,profile:{...state.profile,grade:l.grade,structure,editionId}});await a.content.ensureTopics([l.topicId]);},{...l,spelling});
  console.log('opening: '+l.id);
  await mini.reLaunch('/pages/learn/index');
  await evaluateAsync(mini,async l=>{await getApp().globalData.application.action('open-lesson-studio',l.id);},l);
  routeSamples.push(l.id);
  await new Promise(r=>setTimeout(r,180));
  let current;for(let wait=0;wait<50;wait++){current=await mini.evaluate(function(){const a=getApp().globalData.application;return{page:a.page,error:a.error,id:a.render().teaching?.lesson.id};});if(current.id===l.id)break;if(current.error)throw new Error(current.error);await new Promise(r=>setTimeout(r,200));}if(current.id!==l.id){const page=await mini.currentPage();await mini.screenshot({path:path.join(out,'failure-screen.png')});throw new Error('Native lesson did not open: '+JSON.stringify({current,path:page.path,params:await page.data('params')}));}
  if(index===0&&l.skill==='grammar'&&!l.topicId.startsWith('p-')){await evaluateAsync(mini,async()=>{await getApp().globalData.application.action('studio-reset');});const page=await mini.currentPage(),shell=await page.$('app-shell'),studio=await shell.$('lesson-studio');assert(studio,'Native lesson component is mounted');const option=await studio.$('[data-action="studio-answer"]');await option.tap();await(await studio.$('[data-action="studio-check"]')).tap();await(await shell.$('[data-action="studio-next"]')).tap();await page.waitFor(150);await(await studio.$('[data-action="studio-workshop-choose"][data-value="are"]')).tap();const selected=await mini.evaluate(function(){return getApp().globalData.application.render().teaching.workshop.selected;});assert.equal(selected,'are');controlChecks.push('Native prediction, next-stage and changing-condition expression taps');}
  const result=await evaluateAsync(mini,async full=>{
   const a=getApp().globalData.application,s=a.render().teaching.lesson,act=(id,value='')=>a.action('studio-'+id,value);
   await act('reset');
   if(full){if(s.mode==='communication')a.setField('studioBefore','I have my own idea for this task.');else await act('answer','my prediction');
   await act('check');await act('next');
   const w=s.mission.workshop;for(let i=0;i<(w.conditions?.length||w.items.length);i++){await act('workshop-item',String(i));const item=w.items[w.kind==='transform'?0:i];if(w.kind==='compose'){a.setField('studioWorkshopOwn','My own sentence adds a specific detail.');await act('workshop-check');}else if(w.kind==='word-use'){a.setField('studioWorkshopInput',item.answer);await act('workshop-check');a.setField('studioWorkshopOwn','I use the word '+item.answer+' in my example.');await act('workshop-save');}else{if(w.kind==='transform')for(const id of w.conditions[i].world.scene?.subjects??[])await act('workshop-subject',id);if(w.kind==='transform')for(const id of w.conditions[i].world.selection?.ids??[])await act('workshop-member',id);if(w.kind==='transform'&&w.conditions[i].world.records)await act('workshop-record',w.conditions[i].world.records.answer);const condition=w.kind==='transform'?w.conditions[i]:null,target=condition?condition.target:item.options.find(o=>o.correct).id;if(condition?.tiles){await act('workshop-tile-clear');const used=[];for(const word of target.split(' ')){const n=condition.tiles.findIndex((t,j)=>t===word&&!used.includes(j));if(n<0)throw Error('Authored target tile missing');used.push(n);await act('workshop-tile-add',String(n));}}else if(condition?.input){a.setField('studioWorkshopInput',target);}else await act('workshop-choose',target);await act('workshop-check');if(w.kind==='proof'){for(const o of item.options.filter(o=>o.correct)){await act('workshop-choose',o.id);await act('workshop-check');}a.setField('studioWorkshopOwn','这条线索直接支持题目所问的判断。');await act('workshop-save');}}}
   await act('next');}
   else{const state=a.store.get(),p=state.teaching[s.id];a.store.save({...state,teaching:{...state.teaching,[s.id]:{...p,step:2}}});a.emit();}
   return {id:s.id,mode:s.mode,step:a.render().teaching.progress.step,assemblies:s.assemblies.length,source:a.render().teaching.evidenceItems.find(e=>e.supports)?.id,criteria:s.rubric.length,sort:s.sorting?.cards[0]};
  },full);
  assert.equal(result.step,2,l.id);
  const page=await mini.currentPage();let shell,studio;
  // Controller readiness precedes the native view's paint on some route transitions.
  // Require the actual bound lesson, stage and visible stage controls before capturing.
  for(let wait=0;wait<50;wait++){
   shell=await page.$('app-shell');studio=shell&&await shell.$('lesson-studio');
   const bound=studio&&await studio.data('view');const stage=studio&&await studio.$('.studio-stage');
   if(bound?.lesson?.id===l.id&&bound?.progress?.step===2&&stage&&(await stage.size()).height>40)break;
   studio=null;await page.waitFor(200);
  }
  assert(studio,'Actual native lesson controls must render for '+l.id);
  assert((await studio.$$('.phase-pill')).length===5,'Native lesson phase controls must be visible');
  await page.waitFor(300);
  if(index===0&&l.skill==='grammar'&&!l.topicId.startsWith('p-')){await(await studio.$('[data-action="studio-case"]')).tap();await(await studio.$('[data-action="studio-answer"]')).tap();await(await studio.$('[data-action="studio-check"]')).tap();const selection=await mini.evaluate(function(){return getApp().globalData.application.render().teaching.workbench.selection;});assert(selection&&selection!=='…');controlChecks.push('Native sentence slot and immediate check');}
  if(full&&result.source&&!checkedReading){const chips=await studio.$$('[data-action="studio-source"]');const positions=await Promise.all(chips.slice(0,3).map(e=>e.offset()));console.log('reading control positions: '+JSON.stringify(positions));if(positions.length===3)assert(Math.abs(positions[0].top-positions[2].top)<2,'Source controls must share a compact row');await(await studio.$('[data-action="studio-source"][data-value="'+result.source+'"]')).tap();await(await studio.$('[data-action="studio-evidence"]')).tap();assert.equal(await mini.evaluate(function(){return getApp().globalData.application.render().teaching.evidenceCorrect;}),true);checkedReading=true;controlChecks.push('Native source expansion and evidence selection');}
  if(full&&result.mode==='communication'&&!checkedCommunication){for(let i=0;i<1;i++){const link=await mini.evaluate(function(){const v=getApp().globalData.application.render().teaching,r=v.rubric.find(r=>r.active);return r.id+':'+v.lesson.roleAnchors[r.id][0];});await(await studio.$('[data-action="studio-link"][data-value="'+link+'"]')).tap();}const area=await studio.$('textarea'),draft=await mini.evaluate(function(){return getApp().globalData.application.render().teaching.lesson.prediction.answer.display;});await area.input(draft);await page.waitFor(200);assert.equal(await area.value(),draft);assert.equal(await mini.evaluate(function(){const a=getApp().globalData.application;return a.store.get().teaching[a.render().teaching.lesson.id].after;}),draft);const point=await studio.$('.rubric-point'),panel=await studio.$('.studio-stage');assert(parseFloat(String((await point.size()).width))>parseFloat(String((await panel.size()).width))*.8,'Native self-review controls use the card width');checkedCommunication=true;controlChecks.push('Native criterion links, real textarea input and saved draft');}
  if(full&&result.sort&&!checkedPhonetics){await(await studio.$('[data-action="studio-sort"][data-value="'+result.sort.id+':'+result.sort.category+'"]')).tap();assert.equal(await mini.evaluate(function(){return getApp().globalData.application.render().teaching.sortingCards[0].correct;}),true);checkedPhonetics=true;controlChecks.push('Native phonetic sorting and feedback');}

  if(focus.size&&l.topicId==='p-thought-groups'){const cards=await studio.$$('.sorting-card'),texts=await Promise.all(cards.map(card=>card.text()));assert.equal(texts.length,2);assert(texts.every(t=>t.includes(spelling==='american'?'practice':'practise')),'Native cards follow the selected edition spelling');controlChecks.push('Native '+spelling+' thought-group spellings');}
  await mini.evaluate(function(){wx.pageScrollTo({scrollTop:0,duration:0});return true;});await page.waitFor(120);
  await mini.screenshot({path:path.join(out,l.id+'.png')});
  const afterCapture=await mini.evaluate(function(){const a=getApp().globalData.application;return {page:a.page,params:a.params,id:a.render().teaching?.lesson.id,error:a.error};});assert.equal(afterCapture.id,l.id,'Lesson changed during native capture: '+JSON.stringify(afterCapture));
  const finished=await evaluateAsync(mini,async full=>{
   const a=getApp().globalData.application,s=a.render().teaching.lesson,act=(id,value='')=>a.action('studio-'+id,value);
   if(!full){const state=a.store.get();return {step:2,attempts:state.attempts.length,mastery:Object.keys(state.mastery).length,passes:Object.keys(state.lessonDoneAt).length};}
   const answer=q=>q.kind==='choice'?q.answer.option:q.kind==='order'?JSON.stringify(q.answer.order):q.kind==='writing'||q.kind==='speaking'?q.answer.display:q.answer.accepted[0];
   if(s.sorting)for(const card of s.sorting.cards)await act('sort',card.id+':'+card.category);
   else if(s.mode==='communication'){a.setField('studioAfter',s.prediction.answer.display);for(const r of s.rubric){await act('link',r.id+':'+s.roleAnchors[r.id][0]);}for(const r of s.revisionRubric)await act('rubric',r.id);await act('review');}
   else if(s.evidence.length)for(const[i,q]of s.cases.entries()){await act('case',String(i));await act('answer',answer(q));await act('check');await act('evidence',a.render().teaching.evidenceItems.find(e=>e.supports).id);}
   else for(const [i,q] of s.cases.slice(0,s.mode==='vocabulary'?s.cases.length:2).entries()){await act('case',String(i));await act('answer',s.mode==='vocabulary'?'I can use '+s.mission.workshop.items[i].answer+' in a different example today.':answer(q));if(s.mode==='vocabulary')await act('word-review');await act('check');}
   await act('next');for(const[i,d]of s.diagnoses.entries()){await act('clinic',String(i));await act('diagnose',d.correct);}await act('next');await act('answer',answer(s.transfer));for(const r of s.transfer.rubric||[])await act('rubric',r.id);await act('check');
   const state=a.store.get();return{step:a.render().teaching.progress.step,attempts:state.attempts.length,mastery:Object.keys(state.mastery).length,passes:Object.keys(state.lessonDoneAt).length};
  },full);
  if(full){
   assert.equal(finished.step,4);
   const clinic=await evaluateAsync(mini,()=>{const a=getApp().globalData.application,v=a.render().teaching,p=v.progress;getApp().globalData.englishClinicBackup=p;a.store.save({...a.store.get(),teaching:{...a.store.get().teaching,[v.lesson.id]:{...p,step:3}}});a.emit();const i=v.lesson.diagnoses.length-1,d=v.lesson.diagnoses[i];return {index:i,correct:d.correct,wrong:d.options.find(o=>o.id!==d.correct).id};});
   await page.waitFor(150);await(await studio.$('[data-action="studio-clinic"][data-value="'+clinic.index+'"]')).tap();await page.waitFor(100);
   await(await studio.$('[data-action="studio-diagnose"][data-value="'+clinic.wrong+'"]')).tap();assert.equal(await mini.evaluate(function(){return getApp().globalData.application.render().teaching.correct;}),false);
   await(await studio.$('[data-action="studio-diagnose"][data-value="'+clinic.correct+'"]')).tap();assert.equal(await mini.evaluate(function(){return getApp().globalData.application.render().teaching.correct;}),true);
   await mini.pageScrollTo(0);await page.waitFor(100);await mini.screenshot({path:path.join(out,l.id+'-clinic.png')});controlChecks.push('Native exam clinic switch, rejection and feedback for '+l.id);
   await evaluateAsync(mini,()=>{const a=getApp().globalData.application,p=getApp().globalData.englishClinicBackup;a.store.save({...a.store.get(),teaching:{...a.store.get().teaching,[a.render().teaching.lesson.id]:p}});a.emit();delete getApp().globalData.englishClinicBackup;});await page.waitFor(100);
await(await studio.$('[data-action="studio-explanation"]')).tap();await page.waitFor(120);const diagram=await studio.$('.diagram');assert(diagram,'Native reference diagram is rendered');const reference=await studio.$('.studio-reading');if(reference&&typeof reference.scrollTo==='function'){const before=await diagram.offset();await reference.scrollTo(0,999999);await page.waitFor(120);const after=await diagram.offset();const contentHeight=parseFloat(String(await reference.scrollHeight())),visibleHeight=parseFloat(String((await reference.size()).height));console.log('reference scroll '+l.id+': '+JSON.stringify({contentHeight,visibleHeight,moved:after.top<before.top}));if(contentHeight>visibleHeight+2)assert(after.top<before.top,'Long reference must scroll to its diagram');}await mini.pageScrollTo(999999);await page.waitFor(120);await mini.screenshot({path:path.join(out,l.id+'-reference.png')});await evaluateAsync(mini,async()=>{await getApp().globalData.application.action('studio-next');});finished.step=await mini.evaluate(function(){return getApp().globalData.application.render().teaching.progress.step;});}
  assert.deepEqual(finished,{step:full?5:2,...baseline},l.id);
  if(full){await evaluateAsync(mini,async()=>{const a=getApp().globalData.application;await a.action('studio-reset');const v=a.render().teaching,state=a.store.get();a.store.save({...state,teaching:{...state.teaching,[v.lesson.id]:{...v.progress,step:1}}});a.emit();});await mini.pageScrollTo(0);await page.waitFor(150);assert(await studio.$('.lesson-workshop'),'Current native workshop must render');await mini.screenshot({path:path.join(out,l.id+'-workshop.png')});controlChecks.push('Native workshop rendered for '+l.id);}
  rows.push({...result,rendered:true,finished:full,validation:full?'complete-flow':'render-fixture'});fs.writeFileSync(path.join(out,'progress.json'),JSON.stringify({passed:false,completed:rows.length,lessons:rows},null,2));
  if(index%20===0)console.log('Verified native lessons '+rows.length+'/'+lessons.length);
 }
 assert.equal(rows.length,expectedCount);assert.equal(new Set(rows.map(r=>r.id)).size,expectedCount);assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:true,editionSpelling:spelling,fullFlows:rows.filter(r=>r.finished).length,lessons:rows,routeSamples,controlChecks,errors,platform:'Tencent WeChat DevTools simulator; all studios rendered on their real native routes; complete-flow counts and phase-two fixture boundaries recorded per row; guest mode; no real device/audio/publication',completedAt:new Date().toISOString()},null,2));
 console.log('NATIVE SUCCESS: '+rows.length+' real lesson studios rendered; '+rows.filter(r=>r.finished).length+' complete flows.');
 }catch(error){if(mini){try{const page=await mini.currentPage();const details=await mini.evaluate(function(){const a=getApp().globalData.application;return{page:a.page,params:a.params,error:a.error,grade:a.state.profile?.grade,teaching:a.render().teaching?.lesson.id};});console.error('Native failure context: '+JSON.stringify({path:page.path,params:await page.data('params'),...details}));await mini.screenshot({path:path.join(out,'failure-screen.png')});}catch{}}throw error;}finally{if(mini){try{if(backup)await evaluateAsync(mini,original=>{const a=getApp().globalData.application;a.store.save(JSON.parse(original));a.content.setSpelling(a.catalog.editions.find(e=>e.id===a.state.profile?.editionId)?.spelling??'british');a.emit();return true},backup)}finally{await mini.close()}}}
})().catch(e=>{fs.writeFileSync(path.join(out,'failure.json'),JSON.stringify({passed:false,error:e.message,stack:e.stack},null,2));console.error(e.stack);process.exitCode=1;});
