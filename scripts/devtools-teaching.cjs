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
 const lessons=await mini.evaluate(function(){return getApp().globalData.application.catalog.lessons.map(l=>({id:l.id,grade:Math.min(...l.grades)}));});
 assert.equal(lessons.length,413);
 for(const [index,l] of lessons.entries()){
  await mini.reLaunch('/pages/learn/index');
  console.log('opening: '+l.id);const opened=await evaluateAsync(mini,async l=>{const a=getApp().globalData.application,state=a.store.get();a.store.save({...state,profile:{...state.profile,grade:l.grade,structure:l.grade===6?'54':'63',editionId:l.grade===6?'pep-54':'pep-legacy'}});await a.action('open-lesson-studio',l.id);return {requested:l.id,page:a.page,params:a.params,error:a.error,busy:a.busy};},l);console.log('opened: '+JSON.stringify(opened));
  await new Promise(r=>setTimeout(r,180));
  let current;for(let wait=0;wait<50;wait++){current=await mini.evaluate(function(){const a=getApp().globalData.application;return{page:a.page,error:a.error,id:a.render().teaching?.lesson.id};});if(current.id===l.id)break;if(current.error)throw new Error(current.error);await new Promise(r=>setTimeout(r,200));}if(current.id!==l.id){const page=await mini.currentPage();await mini.screenshot({path:path.join(out,'failure-screen.png')});throw new Error('Native lesson did not open: '+JSON.stringify({current,path:page.path,params:await page.data('params')}));}
  const result=await evaluateAsync(mini,async()=>{
   const a=getApp().globalData.application,s=a.render().teaching.lesson,act=(id,value='')=>a.action('studio-'+id,value);
   await act('reset');
   if(s.mode==='communication')a.setField('studioBefore','I have my own idea for this task.');else await act('answer','my prediction');
   await act('check');await act('next');
   for(const [i,u] of s.assemblies.entries()){await act('unit',String(i));for(const id of u.target)await act('tile',id);await act('assemble');}
   await act('next');
   return {id:s.id,mode:s.mode,step:a.render().teaching.progress.step,assemblies:s.assemblies.length};
  });
  assert.equal(result.step,2,l.id);
  if(index===0){const page=await mini.currentPage(),shell=await page.$('app-shell'),studio=await shell.$('lesson-studio');assert(studio,'Native lesson component is mounted');const button=await studio.$('[data-action="studio-case"]');if(button)await button.tap();}
  await mini.screenshot({path:path.join(out,l.id+'.png')});
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
  assert.deepEqual(finished,{step:5,attempts:0,mastery:0,passes:0},l.id);rows.push({...result,finished:true});
  if(index%20===0)console.log('Verified native lessons '+rows.length+'/'+lessons.length);
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:true,lessons:rows,errors,platform:'Tencent WeChat DevTools simulator; guest mode; no real device/audio/publication',completedAt:new Date().toISOString()},null,2));
 console.log('NATIVE SUCCESS: '+rows.length+' real lesson studios completed.');
 }finally{if(mini)await mini.close();}
})().catch(e=>{fs.writeFileSync(path.join(out,'failure.json'),JSON.stringify({passed:false,error:e.message,stack:e.stack},null,2));console.error(e.stack);process.exitCode=1;});
