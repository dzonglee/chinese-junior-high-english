// Run with the official SDK on Mac Studio, while holding the shared DevTools lock.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const automator=require(process.env.WECHAT_AUTOMATOR || '/Volumes/MacStudioExternal/ChrisverseMCP/workspace/wechat/tooling/node_modules/miniprogram-automator');
const project=path.resolve(process.argv[2]||'.'),out=path.join(project,'native-artifacts');fs.mkdirSync(out,{recursive:true});
let evaluationId=0;
async function evaluateAsync(mini,fn,arg=null){
 // Construct the callback on the host: guest appservice disables new Function.
 // Only our authored test function is embedded; no remote dynamic evaluator is used.
 const execute=new Function('return function englishTeaching'+(++evaluationId)+'(){ const payload='+JSON.stringify(arg)+'; const g=getApp().globalData;g.englishTeachingTest={pending:true};Promise.resolve().then(()=>('+fn.toString()+')(payload)).then(value=>{g.englishTeachingTest={pending:false,value};},error=>{g.englishTeachingTest={pending:false,error:String(error.message||error)};});return true;}')();
 await mini.evaluate(execute);
 const end=Date.now()+90000;
 while(Date.now()<end){const r=await mini.evaluate(function(){return getApp().globalData.englishTeachingTest;});if(r&&!r.pending){if(r.error)throw new Error(r.error);return r.value;}await new Promise(resolve=>setTimeout(resolve,100));}
 throw new Error('Timed out waiting for the English controller task');
}
(async()=>{let mini;const errors=[],rows=[];try{
 console.log("stage: launching official DevTools automation");
 mini=await automator.launch({cliPath:'/Applications/wechatwebdevtools.app/Contents/MacOS/cli',projectPath:project,timeout:90000});
 console.log('stage: automation connected');
 mini.on('exception',e=>errors.push(String(e.message||e)));
 console.log('stage: opening onboarding');
 await mini.reLaunch('/pages/onboarding/index');
 console.log('stage: onboarding opened');
 await evaluateAsync(mini,async()=>{const a=getApp().globalData.application;for(const [key,value] of Object.entries({cityId:'北京-北京',structure:'63',grade:'9',editionId:'pep-legacy'}))a.setField(key,value);await a.action('save-profile');});
 await new Promise(r=>setTimeout(r,1200));
 console.log('stage: profile saved');
 const authoredLessons=await mini.evaluate(function(){return getApp().globalData.application.catalog.lessons.map(l=>({id:l.id,topicId:l.topicId,skill:getApp().globalData.application.catalog.topics.find(t=>t.id===l.topicId).skill,grade:Math.min(...l.grades)}));});
 assert.equal(authoredLessons.length,413);
 const representatives=[];
 for(const skill of ['grammar','reading','listening','vocabulary','speaking','writing','phonetics']){const l=authoredLessons.find(l=>(l.topicId.startsWith('p-')?'phonetics':l.skill)===skill);if(l)representatives.push(l);}
 const lessons=[...representatives,...authoredLessons.filter(l=>!representatives.some(r=>r.id===l.id))];
 const routeSamples=[];let lastSkill='',checkedCommunication=false,checkedReading=false,checkedPhonetics=false;const controlChecks=[];
 for(const [index,l] of lessons.entries()){
  const targetSkill=l.topicId.startsWith('p-')?'phonetics':l.skill;const viaRoute=index<2||targetSkill!==lastSkill;
  if(viaRoute){await mini.reLaunch('/pages/learn/index');routeSamples.push(l.id);}else{const page=await mini.currentPage();await page.setData({params:{id:l.id}});}
  lastSkill=targetSkill;
  console.log('opening: '+l.id);const opened=await evaluateAsync(mini,async l=>{const a=getApp().globalData.application,state=a.store.get();a.store.save({...state,profile:{...state.profile,grade:l.grade,structure:l.grade===6?'54':'63',editionId:l.grade===6?'pep-54':'pep-legacy'}});if(l.viaRoute)await a.action('open-lesson-studio',l.id);else{await a.content.ensureTopics([l.topicId]);a.open('lesson',{id:l.id});}return {requested:l.id,page:a.page,error:a.error};},{...l,viaRoute});console.log('opened: '+JSON.stringify(opened));
  await new Promise(r=>setTimeout(r,180));
  let current;for(let wait=0;wait<50;wait++){current=await mini.evaluate(function(){const a=getApp().globalData.application;return{page:a.page,error:a.error,id:a.render().teaching?.lesson.id};});if(current.id===l.id)break;if(current.error)throw new Error(current.error);await new Promise(r=>setTimeout(r,200));}if(current.id!==l.id){const page=await mini.currentPage();await mini.screenshot({path:path.join(out,'failure-screen.png')});throw new Error('Native lesson did not open: '+JSON.stringify({current,path:page.path,params:await page.data('params')}));}
  if(index===0){await evaluateAsync(mini,async()=>{await getApp().globalData.application.action('studio-reset');});const page=await mini.currentPage(),shell=await page.$('app-shell'),studio=await shell.$('lesson-studio');assert(studio,'Native lesson component is mounted');const option=await studio.$('[data-action="studio-answer"]');await option.tap();await(await studio.$('[data-action="studio-check"]')).tap();await(await shell.$('[data-action="studio-next"]')).tap();await page.waitFor(150);await(await studio.$('[data-action="studio-tile"]')).tap();const count=await mini.evaluate(function(){return getApp().globalData.application.render().teaching.progress.order.length;});assert.equal(count,1);controlChecks.push('Native prediction, next-stage and assembly-tile taps');}
  const result=await evaluateAsync(mini,async()=>{
   const a=getApp().globalData.application,s=a.render().teaching.lesson,act=(id,value='')=>a.action('studio-'+id,value);
   await act('reset');
   if(s.mode==='communication')a.setField('studioBefore','I have my own idea for this task.');else await act('answer','my prediction');
   await act('check');await act('next');
   for(const [i,u] of s.assemblies.entries()){await act('unit',String(i));for(const id of u.target)await act('tile',id);await act('assemble');}
   await act('next');
   return {id:s.id,mode:s.mode,step:a.render().teaching.progress.step,assemblies:s.assemblies.length,source:s.evidence.find(e=>e.supports)?.id,criteria:s.rubric.length,sort:s.sorting?.cards[0]};
  });
  assert.equal(result.step,2,l.id);
  const page=await mini.currentPage(),shell=await page.$('app-shell'),studio=await shell.$('lesson-studio');
  if(index===0){await(await studio.$('[data-action="studio-case"]')).tap();await(await studio.$('[data-action="studio-answer"]')).tap();await(await studio.$('[data-action="studio-check"]')).tap();const selection=await mini.evaluate(function(){return getApp().globalData.application.render().teaching.workbench.selection;});assert(selection&&selection!=='…');controlChecks.push('Native sentence slot and immediate check');}
  if(result.source&&!checkedReading){const chips=await studio.$$('[data-action="studio-source"]');const positions=await Promise.all(chips.slice(0,3).map(e=>e.offset()));console.log('reading control positions: '+JSON.stringify(positions));if(positions.length===3)assert(Math.abs(positions[0].top-positions[2].top)<2,'Source controls must share a compact row');await(await studio.$('[data-action="studio-source"][data-value="'+result.source+'"]')).tap();await(await studio.$('[data-action="studio-evidence"]')).tap();assert.equal(await mini.evaluate(function(){return getApp().globalData.application.render().teaching.correct;}),true);checkedReading=true;controlChecks.push('Native source expansion and evidence selection');}
  if(result.mode==='communication'&&!checkedCommunication){for(let i=0;i<result.criteria;i++)await(await studio.$('[data-action="studio-link"]')).tap();const area=await studio.$('textarea'),draft='My revised idea now has the required details and a clear reason.';await area.input(draft);await page.waitFor(200);assert.equal(await area.value(),draft);assert.equal(await mini.evaluate(function(){const a=getApp().globalData.application;return a.store.get().teaching[a.render().teaching.lesson.id].after;}),draft);checkedCommunication=true;controlChecks.push('Native criterion links, real textarea input and saved draft');}
  if(result.sort&&!checkedPhonetics){await(await studio.$('[data-action="studio-sort"][data-value="'+result.sort.id+':'+result.sort.category+'"]')).tap();assert.equal(await mini.evaluate(function(){return getApp().globalData.application.render().teaching.sortingCards[0].correct;}),true);checkedPhonetics=true;controlChecks.push('Native phonetic sorting and feedback');}

  await mini.evaluate(function(){wx.pageScrollTo({scrollTop:0,duration:0});return true;});await page.waitFor(120);
  await mini.screenshot({path:path.join(out,l.id+'.png')});
  const afterCapture=await mini.evaluate(function(){const a=getApp().globalData.application;return {page:a.page,params:a.params,id:a.render().teaching?.lesson.id,error:a.error};});assert.equal(afterCapture.id,l.id,'Lesson changed during native capture: '+JSON.stringify(afterCapture));
  const finished=await evaluateAsync(mini,async()=>{
   const a=getApp().globalData.application,s=a.render().teaching.lesson,act=(id,value='')=>a.action('studio-'+id,value);
   const answer=q=>q.kind==='choice'?q.answer.option:q.kind==='order'?JSON.stringify(q.answer.order):q.kind==='writing'||q.kind==='speaking'?'My original new response includes the needed task details.':q.answer.accepted[0];
   if(s.sorting)for(const card of s.sorting.cards)await act('sort',card.id+':'+card.category);
   else if(s.mode==='communication'){a.setField('studioAfter','My revised response now includes details and a clear reason.');for(const r of s.rubric){await act('link',r.id+':'+s.modelSentences[0].id);await act('rubric',r.id);}await act('review');}
   else if(s.evidence.length)await act('evidence',s.evidence.find(e=>e.supports).id);
   else for(const [i,q] of s.cases.slice(0,s.mode==='vocabulary'?s.cases.length:2).entries()){await act('case',String(i));await act('answer',answer(q));await act('check');}
   await act('next');await act('diagnose',s.diagnosis.correct);await act('next');await act('answer',answer(s.transfer));for(const r of s.transfer.rubric||[])await act('rubric',r.id);await act('check');await act('next');
   const state=a.store.get();return{step:a.render().teaching.progress.step,attempts:state.attempts.length,mastery:Object.keys(state.mastery).length,passes:Object.keys(state.lessonDoneAt).length};
  });
  assert.deepEqual(finished,{step:5,attempts:0,mastery:0,passes:0},l.id);rows.push({...result,finished:true});fs.writeFileSync(path.join(out,'progress.json'),JSON.stringify({passed:false,completed:rows.length,lessons:rows},null,2));
  if(index%20===0)console.log('Verified native lessons '+rows.length+'/'+lessons.length);
 }
 assert.equal(rows.length,413);assert.equal(new Set(rows.map(r=>r.id)).size,413);assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:true,lessons:rows,routeSamples,controlChecks,errors,platform:'Tencent WeChat DevTools simulator; all studios rendered through the production shared component, with representative native routes; guest mode; no real device/audio/publication',completedAt:new Date().toISOString()},null,2));
 console.log('NATIVE SUCCESS: '+rows.length+' real lesson studios completed.');
 }catch(error){if(mini){try{const page=await mini.currentPage();const details=await mini.evaluate(function(){const a=getApp().globalData.application;return{page:a.page,params:a.params,error:a.error,grade:a.state.profile?.grade,teaching:a.render().teaching?.lesson.id};});console.error('Native failure context: '+JSON.stringify({path:page.path,params:await page.data('params'),...details}));await mini.screenshot({path:path.join(out,'failure-screen.png')});}catch{}}throw error;}finally{if(mini)await mini.close();}
})().catch(e=>{fs.writeFileSync(path.join(out,'failure.json'),JSON.stringify({passed:false,error:e.message,stack:e.stack},null,2));console.error(e.stack);process.exitCode=1;});
