import assert from 'node:assert/strict'
import { startSession } from '@review-app/src/core/sessions'
import { Application, type Platform } from '@review-app/src/app/application'
import { ContentRepository } from '@review-app/src/services/content'
import { StateStore, STORAGE_KEY } from '@review-app/src/services/storage'
import { catalog, state, NOW } from '@review-app/src/test-fixtures'
const c = catalog()
c.questions[0] = { ...c.questions[0], skill: 'speaking', kind: 'speaking', options: undefined, answer: {display: 'Hello.'}, rubric:[{id:'content',label:'Content',guidance:'Check content.',marks:1}] }
const data = new Map([[STORAGE_KEY, JSON.stringify(state())]])
const store = new StateStore({read:key=>data.get(key)??null,write:(key,value)=>{data.set(key,value)},remove:key=>{data.delete(key)}},c,NOW)
const repo = new ContentRepository(c,[],async()=>{throw Error('Unexpected fetch')})
let resolveStart:()=>void
const pendingStart = new Promise<void>(resolve=>{resolveStart=resolve})
let stopCalls=0
let app:Application
const platform:Platform = { now:()=>NOW, navigate:(page,params)=>app.open(page,params),back(){},toast(){},confirm:async()=>true,exportText:async()=>{},importText:async()=>null,copy:async()=>{},play:async()=>{},stopAudio(){},startRecording:()=>pendingStart,stopRecording:async()=>{stopCalls++;return{path:'local.mp3',durationMs:1000}},removeRecordings:async()=>{} }
app=new Application(repo,store,platform)
store.save(startSession(store.get(), [c.questions[0].id], 'practice', NOW).state)
app.open('session')
assert.equal(app.render().question?.recording, false)
const startAction=app.action('record-start')
await app.suspend()
const stopCallsAfterSuspend=stopCalls
resolveStart!()
await startAction
console.log(JSON.stringify({probe:'record-start then suspend before recorder start resolves',stopCallsAfterSuspend,stopCallsAfterStartResolved:stopCalls,recordingAfterSuspension:app.render().question?.recording,busy:app.busy,page:app.page}))
assert.equal(app.render().question?.recording, true)
assert.equal(stopCalls,0)
await app.action('record-stop')
