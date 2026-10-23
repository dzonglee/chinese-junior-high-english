import type {TeachingProgress} from './lesson-teaching'
import {wordCount,normalizedAnswer} from './answers'
import {containsTerm} from './teaching-production'
import type {Question} from './types'
import {questionProblems} from './validation'
import {tileIdsForText} from './tile-expression.mjs'
import {validWordClock,clockInterval,wordClockKey,wordClockView} from './word-clock'
import type {WordClock,WordClockView} from './word-clock'
import {validWordRecordSelection,wordRecordSelectionKey,wordRecordSelectionMatches,wordRecordSelectionView,toggleWordRecord,noWordRecords} from './word-record-selection'
import type {WordRecordSelection,WordRecordSelectionView} from './word-record-selection'
import {validWordQuantity,quantityCount,wordQuantityKey,wordQuantityView,changeQuantity} from './word-quantity'
import type {WordQuantity,WordQuantityView} from './word-quantity'
import {validWordRuler,rulerDistance,wordRulerKey,wordRulerView} from './word-ruler'
import type {WordRuler,WordRulerView} from './word-ruler'
import {validWordRotation,rotationAngle,wordRotationKey,wordRotationView} from './word-rotation'
import type {WordRotation,WordRotationView} from './word-rotation'
import {validWordFraction,fractionCount,wordFractionKey,wordFractionView,changeFraction} from './word-fraction'
import type {WordFraction,WordFractionView} from './word-fraction'
import {validWordDoor,wordDoorKey,wordDoorView,changeDoor,doorMatches as observedDoorMatches} from './word-door'
import type {WordDoor,WordDoorView} from './word-door'
import {validWordWeather,wordWeatherKey,wordWeatherView,changeWeather,weatherMatches as observedWeatherMatches} from './word-weather'
import type {WordWeather,WordWeatherView} from './word-weather'
import {validWordDaylight,wordDaylightKey,wordDaylightView,changeDaylight,daylightMatches as selectedDaylightMatches} from './word-daylight'
import type {WordDaylight,WordDaylightView} from './word-daylight'
import {validWordThermal,wordThermalKey,wordThermalView,changeThermal,thermalMatches as selectedThermalMatches} from './word-thermal'
import type {WordThermal,WordThermalView} from './word-thermal'
import {validWordProvision,wordProvisionKey,wordProvisionView,changeProvision,provisionMatches as selectedProvisionMatches} from './word-provision'
import type {WordProvision,WordProvisionView} from './word-provision'
import {validWordFeelingShift,wordFeelingShiftKey,wordFeelingShiftView,changeFeelingShift,feelingShiftMatches as selectedFeelingShiftMatches} from './word-feeling-shift'
import type {WordFeelingShift,WordFeelingShiftView} from './word-feeling-shift'
import {validWordBoat,wordBoatKey,wordBoatView,changeBoat,boatMatches as assembledBoatMatches} from './word-boat'
import type {WordBoat,WordBoatView} from './word-boat'
import {validWordChance,wordChanceKey,wordChanceView,changeChance,chanceMatches as allocatedChanceMatches} from './word-chance'
import type {WordChance,WordChanceView} from './word-chance'
import {validWordPrintPages,wordPrintPagesKey,wordPrintPagesView,changePrintPages,printPagesMatch as selectedPrintPagesMatch} from './word-print-pages'
import type {WordPrintPages,WordPrintPagesView} from './word-print-pages'
import {validWordPhoneMode,wordPhoneModeKey,wordPhoneModeView,changePhoneMode,phoneModeMatches as selectedPhoneModeMatches} from './word-phone-mode'
import type {WordPhoneMode,WordPhoneModeView} from './word-phone-mode'
import {validWordReportedChange,wordReportedChangeKey,wordReportedChangeView,changeReportedChange,reportedChangeMatches as selectedReportedChangeMatches} from './word-reported-change'
import type {WordReportedChange,WordReportedChangeView} from './word-reported-change'
import {validWordDailyWalk,wordDailyWalkKey,wordDailyWalkView,changeDailyWalk,dailyWalkMatches as scheduledDailyWalkMatches} from './word-daily-walk'
import type {WordDailyWalk,WordDailyWalkView} from './word-daily-walk'
import {validWordUntil,wordUntilKey,wordUntilView,changeUntil,untilMatches as selectedUntilMatches} from './word-until'
import type {WordUntil,WordUntilView} from './word-until'
import {validWordClimate,wordClimateKey,wordClimateView,changeClimate,climateMatches as selectedClimateMatches} from './word-climate'
import type {WordClimate,WordClimateView} from './word-climate'

export interface WorldCell {id?:string;label:string;detail?:string;value?:number;role?:string;art?:string;uncertain?:boolean}
export interface ScenePerson {id:string;name:string;description:string;left:number;width:number}
export interface PeopleScene {assetRoot?:'illustrations';selectionPrompt?:string;formLabel?:string;record?:{title:string;days:{label:string;text:string}[]};asset:string;alt:string;people:ScenePerson[];speaker?:string;listeners:string[];subjects:string[];subjectReason:string}
export interface EventRecords {assetRoot?:'illustrations';emptyLabel?:string;emptyOutcome?:string;overlay?:{text:string;left:number;top:number;width:number};missingPrompt?:string;artChoices?:string[];artLabels?:string[];title:string;asset?:string;alt?:string;answer:string;options:{id:string;label:string;text:string;reason:string;value:number;outcome?:string;eventLabel?:string;endValue?:number}[]}
export interface VerbBridge {verb:string;object:string;objectLabel:string;options:{expression:string;link:string}[]}
export interface AlbumOwnership {owners:[string,string];sharedId:string;separateId:string}
export interface RedactionPreview {asset:string;alt:string;regions:{id:string;left:number;top:number;width:number;height:number;text:string}[]}
export interface WorkshopSelection {mode?:'words'|'redact'|'fields';prompt:string;ids:string[];reason:string;preview?:RedactionPreview}
export interface LanguageCondition {caseSensitive?:boolean;initial?:string;tileMode?:'morpheme';tiles?:string[];accepted?:string[];input?:boolean;inputHint?:string;choices?:string[];label:string;before:string;target:string;after:string;reason:string;world:{layout?:'stacked';verbBridge?:VerbBridge;albums?:AlbumOwnership;connector?:string;kind:'count'|'timeline'|'roles'|'scale'|'syntax'|'logic'|'morphology'|'position'|'map'|'people-scene'|'calendar';caption:string;cells:WorldCell[];scene?:PeopleScene;records?:EventRecords;selection?:WorkshopSelection}}
export interface UsageMap {left:string;right:string;object:string;caption:string;alternatives:Record<string,'left'|'right'>}
export interface WorkshopCalculation {reduction?:{before:number;after:number;unit:string;beforeLabel:string;afterLabel:string};kind:'time'|'minutes'|'yuan'|'count';answer:string;label:string;hint:string;wrong:string}
export interface LocationMap {anchor:string;marker:string}
export interface LocationPreview {direction:string;ready:boolean;cells:{id:string;text:string;anchor:boolean;marker:boolean}[]}
export interface ContextGap {locationMap?:LocationMap;before:string;after:string;answer:string;options:{id:string;text:string;reason:string}[]}
export interface RecallExercise {title:string;note:string;words:{id:string;cue:string;answer:string}[]}
export interface PacingPreview {ready:boolean;pace:string;space:string;beatGap:number;extraGap:number;phraseGap:number;paceLabel:string;spaceLabel:string;groups:{id:string;dots:number[]}[]}
export interface SourceSettings {pacing?:{paceRow:string;spaceRow:string};labels?:[string,string];title:string;note:string;rows:{id:string;label:string;answer:'on'|'off';reason:string;wrong:string;route?:{from:string;targets:[string,string]}}[]}
export interface WordEvidence {option:string;caption:string;regions:{id:string;label:string;left:number;top:number;width:number;height:number}[]}
export interface WordPictureTarget {id:string;option:string;label:string;labelPosition?:'top'|'bottom';left:number;top:number;width:number;height:number}
export interface WordRecordPath {id:string;label:string;steps:string[]}
export interface WordSourceCard {option:string;title:string;publisher:string;area:string;validFor:string}
export interface WordSources {context:string;cards:WordSourceCard[]}
export interface WordDecision {phoneMode?:WordPhoneMode;printPages?:WordPrintPages;sources?:WordSources;reportedChange?:WordReportedChange;chance?:WordChance;dailyWalk?:WordDailyWalk;boat?:WordBoat;shift?:WordFeelingShift;provision?:WordProvision;until?:WordUntil;thermal?:WordThermal;meaningFromRecords?:true;climate?:WordClimate;daylight?:WordDaylight;weather?:WordWeather;door?:WordDoor;prompt:string;clock?:WordClock;quantity?:WordQuantity;ruler?:WordRuler;rotation?:WordRotation;fraction?:WordFraction;recordSelection?:WordRecordSelection;recordPaths?:WordRecordPath[];art?:{pictureOnly?:true;assetRoot?:'assets'|'illustrations'|'illustrations-2'|'illustrations-3';format?:'jpg'|'png';asset:string;alt:string;targets?:WordPictureTarget[];evidence?:WordEvidence[]}}
export interface WorkshopItem {ownForms?:string[];wordDecision?:WordDecision;sourceSettings?:SourceSettings;sourceRecall?:RecallExercise;sourceGap?:ContextGap;calculation?:WorkshopCalculation;sourceOrder?:string[];sourceOrderLabels?:string[];sourceArt?:{assetRoot?:'assets'|'illustrations'|'illustrations-2';layout?:'repeat';asset:string;alt:string;choices:{id:string;label:string;caption?:string}[]};sourceStyle?:'cards';sourceTitle?:string;evidenceLabels?:string[];evidenceGroups?:string[][];sound?:'syllables'|'emphasis'|'groups'|'links'|'pitch'|'phoneme';caseSensitive?:boolean;usage?:UsageMap;id:string;label:string;prompt:string;answer:string;reason:string;hint:string;before?:string;after?:string;options?:{id:string;text:string;reason:string;correct:boolean}[];material?:string;meaning?:string}
export interface LessonWorkshop {applicationStyle?:'cards';navigationLabel?:string;kind:'transform'|'word-use'|'proof'|'compose'|'sound-map';title:string;instruction:string;conditions?:LanguageCondition[];items:WorkshopItem[];choices?:string[];applicationIds?:string[];transfer?:Question}
export interface WorkshopView {wordPhoneMode?:WordPhoneModeView;wordPrintPages?:WordPrintPagesView;wordSources?:{context:string;cards:(WordSourceCard&{text:string;selected:boolean;accepted:boolean;wrong:boolean})[]};wordReportedChange?:WordReportedChangeView;wordChance?:WordChanceView;wordDailyWalk?:WordDailyWalkView;wordPictureOnly?:boolean;wordBoat?:WordBoatView;wordShift?:WordFeelingShiftView;wordProvision?:WordProvisionView;wordUntil?:WordUntilView;wordThermal?:WordThermalView;wordClimate?:WordClimateView;wordDaylight?:WordDaylightView;wordWeather?:WordWeatherView;wordDoor?:WordDoorView;wordFraction?:WordFractionView;wordRotation?:WordRotationView;wordRuler?:WordRulerView;wordQuantity?:WordQuantityView;wordRecordSelection?:WordRecordSelectionView;wordClock?:WordClockView;wordPictureTargets:{id:string;option:string;label:string;selected:boolean;accepted?:boolean;wrong?:boolean;style:string}[];wordRecordPaths:WordRecordPath[];wordTailOnly:boolean;wordEvidence?:{caption:string;regions:{id:string;label:string;style:string}[]};ownMissing:boolean;reduction?:{unit:string;ready:boolean;rows:{id:string;label:string;value:string;width:number}[]};settings?:{pacing?:PacingPreview;labels:[string,string];title:string;note:string;checked:boolean;correct:boolean;rows:{id:string;label:string;value:string;labels:[string,string];route?:{from:string;target:string};status:string;correct:boolean;feedback:string}[]};recall?:{title:string;note:string;phase:string;ready:boolean;rows:{id:string;cue:string;answer:string;attempt:string;same:boolean}[]};gap?:{map?:LocationPreview;before:string;after:string;text:string;selected:string;checked:boolean;correct:boolean;feedback:string;options:{id:string;text:string;selected:boolean}[]};orderSlots:{id:string;text:string;label:string;wrong:boolean;filled:boolean}[];redaction?:{asset:string;alt:string;regions:{id:string;text:string;label:string;detail:string;masked:boolean;wrong:boolean;style:string}[]};proofArtChoices:{id:string;label:string;caption?:string;selected:boolean;accepted:boolean;wrong:boolean}[];proofReady:boolean;orderBank:{id:string;text:string;used:boolean}[];orderAnswer:{id:string;text:string;wrong:boolean}[];selectionText:string;morphemeTiles:boolean;verbBridge?:{verb:string;object:string;objectLabel:string;known:boolean;link:string};albumOwnership?:AlbumOwnership;albumMode:"shared"|"separate"|"";albumItems:{label:string}[];keepEnding:boolean;tileBank:{id:string;text:string;used:boolean}[];tileAnswer:{id:string;text:string}[];referenceStyle:string;membersCorrect:boolean;records?:EventRecords;recordOptions:(EventRecords["options"][number]&{selected:boolean;wrong:boolean})[];recordArtChoices:(EventRecords["options"][number]&{selected:boolean;wrong:boolean;style:string})[];recordCorrect:boolean;hasScene:boolean;navigationLabel:string;scene?:PeopleScene;scenePeople:(ScenePerson&{selected:boolean;wrong:boolean;speaking:boolean;listening:boolean;style:string})[];sceneSubjectsCorrect:boolean;expressionWrong:boolean;proofSteps:{id:string;label:string;accepted:boolean}[];proofRequired:number;proofCollected:{id:string;text:string}[];proofAccepted:boolean;soundUnits:{text:string;emphasis:boolean}[];soundMode:string;pitch:string;usageDirection:string;doneCount:number;kind:LessonWorkshop['kind'];title:string;instruction:string;index:number;total:number;tabs:{id:string;label:string;done:boolean}[];item:WorkshopItem;condition?:LanguageCondition;cells:(WorldCell&{selected:boolean;wrong:boolean;copies:number[];style:string;rangeStyle:string})[];choices:{id:string;text:string;selected:boolean;accepted:boolean}[];selected:string;input:string;own:string;attempted:boolean;correct:boolean;feedback:string;revealed:boolean;complete:boolean;allDone:boolean;draftWords:number;sourceOpen:boolean;worldClass:string}
const indexOf=(p:TeachingProgress,length:number)=>{const i=Number(p.answers.workshopIndex??0);return Number.isInteger(i)&&i>=0&&i<length?i:0}
const matches=(c:LanguageCondition,value:string)=>c.input?[c.target,...c.accepted??[]].some(answer=>normalizedAnswer(value,!!c.caseSensitive)===normalizedAnswer(answer,!!c.caseSensitive)):value===c.target
const key=(i:number)=>`workshop-${i}`
// The rendered selection and actual expression must still match; stale flags are not evidence.
const selectionMatches=(w:LessonWorkshop,p:TeachingProgress,index:number)=>{
 const c=w.conditions?.[index],scope=c?.world.selection
 if(scope?.mode!=='redact'&&scope?.mode!=='fields')return true
 const members=(p.answers[`worldMembers-${index}`]??'').split('|').filter(Boolean)
 return members.length===scope.ids.length&&scope.ids.every(id=>members.includes(id))&&matches(c!,p.answers[key(index)]??'')
}
const validRedaction=(w:LessonWorkshop,c:LanguageCondition)=>{
 const scope=c.world.selection,preview=scope?.preview
 if(scope?.mode!=='redact')return preview===undefined
 if(w.kind!=='transform'||c.world.kind!=='logic'||c.input||c.tiles||c.world.scene||c.world.records||c.world.verbBridge||c.world.albums||!preview||typeof preview!=='object'||typeof preview.asset!=='string'||!(/^[a-z0-9-]+$/).test(preview.asset)||typeof preview.alt!=='string'||!preview.alt.trim()||!Array.isArray(preview.regions)||!preview.regions.length||preview.regions.length>8)return false
 const regions=preview.regions
 if(regions.some(r=>!r||typeof r!=='object'||typeof r.id!=='string'||!(/^[a-z][a-z0-9-]*$/).test(r.id)||typeof r.text!=='string'||!r.text.trim()||r.text.length>80||![r.left,r.top,r.width,r.height].every(Number.isFinite)||r.left<0||r.top<0||r.width<=0||r.height<=0||r.left+r.width>100||r.top+r.height>100))return false
 if(c.world.cells.some(cell=>typeof cell.label!=='string'||!cell.label.trim()))return false
 if(new Set(regions.map(r=>r.id)).size!==regions.length||regions.length!==c.world.cells.length||regions.some(r=>!c.world.cells.some(cell=>cell.id===r.id)))return false
 return regions.every((a,i)=>regions.slice(i+1).every(b=>a.left+a.width<=b.left||b.left+b.width<=a.left||a.top+a.height<=b.top||b.top+b.height<=a.top))
}

const clockMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.clock||clockInterval(item.wordDecision.clock,p.answers[wordClockKey(item.id)]??'')===item.wordDecision.clock.answer
const recordsMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.recordSelection||wordRecordSelectionMatches(item.wordDecision.recordSelection,p.answers[wordRecordSelectionKey(item.id)]??'')
const quantityMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.quantity||quantityCount(item.wordDecision.quantity,p.answers[wordQuantityKey(item.id)]??'')===item.wordDecision.quantity.answer
const fractionMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.fraction||fractionCount(item.wordDecision.fraction,p.answers[wordFractionKey(item.id)]??'')===item.wordDecision.fraction.answer
const rotationMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.rotation||rotationAngle(item.wordDecision.rotation,p.answers[wordRotationKey(item.id)]??'')===item.wordDecision.rotation.answer
const rulerMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.ruler||rulerDistance(item.wordDecision.ruler,p.answers[wordRulerKey(item.id)]??'')===item.wordDecision.ruler.answer
const climateMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.climate||selectedClimateMatches(item.wordDecision.climate,p.answers[wordClimateKey(item.id)]??'')
const untilMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.until||selectedUntilMatches(item.wordDecision.until,p.answers[wordUntilKey(item.id)]??'')
const dailyWalkMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.dailyWalk||scheduledDailyWalkMatches(p.answers[wordDailyWalkKey(item.id)]??'')
const reportedChangeMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.reportedChange||selectedReportedChangeMatches(item.wordDecision.reportedChange,p.answers[wordReportedChangeKey(item.id)]??'')
const phoneModeMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.phoneMode||selectedPhoneModeMatches(p.answers[wordPhoneModeKey(item.id)]??'')
const printPagesMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.printPages||selectedPrintPagesMatch(item.wordDecision.printPages,p.answers[wordPrintPagesKey(item.id)]??'')
const chanceMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.chance||allocatedChanceMatches(p.answers[wordChanceKey(item.id)]??'')
const boatMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.boat||assembledBoatMatches(p.answers[wordBoatKey(item.id)]??'')
const shiftMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.shift||selectedFeelingShiftMatches(p.answers[wordFeelingShiftKey(item.id)]??'')
const provisionMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.provision||selectedProvisionMatches(p.answers[wordProvisionKey(item.id)]??'')
const thermalMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.thermal||selectedThermalMatches(item.wordDecision.thermal,p.answers[wordThermalKey(item.id)]??'')
const daylightMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.daylight||selectedDaylightMatches(item.wordDecision.daylight,p.answers[wordDaylightKey(item.id)]??'')
const weatherMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.weather||observedWeatherMatches(item.wordDecision.weather,p.answers[wordWeatherKey(item.id)]??'')
const doorMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.door||observedDoorMatches(item.wordDecision.door,p.answers[wordDoorKey(item.id)]??'')
const wordDecisionMatches=(item:WorkshopItem,p:TeachingProgress,k:string)=>(!item.wordDecision||(item.wordDecision.meaningFromRecords===true&&!!item.wordDecision.recordSelection)||!!item.options?.some(o=>o.id===p.answers[k]&&o.correct))&&clockMatches(item,p)&&recordsMatch(item,p)&&quantityMatches(item,p)&&rulerMatches(item,p)&&rotationMatches(item,p)&&fractionMatches(item,p)&&doorMatches(item,p)&&weatherMatches(item,p)&&daylightMatches(item,p)&&thermalMatches(item,p)&&provisionMatches(item,p)&&shiftMatches(item,p)&&boatMatches(item,p)&&chanceMatches(item,p)&&printPagesMatch(item,p)&&phoneModeMatch(item,p)&&reportedChangeMatches(item,p)&&dailyWalkMatches(item,p)&&untilMatches(item,p)&&climateMatches(item,p)
const ownKey=(id:string)=>`workshopOwn-${id}`
const settingsKey=(id:string)=>`workshopSettings-${id}`
const settingKey=(item:string,row:string)=>`workshopSetting-${item}-${row}`
const settingsMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.sourceSettings||(p.checked[settingsKey(item.id)]===true&&item.sourceSettings.rows.every(r=>p.answers[settingKey(item.id,r.id)]===r.answer))
const settingsCompletion=(item:WorkshopItem,p:TeachingProgress,k:string)=>!item.sourceSettings||(settingsMatch(item,p)&&proofReady(item,p,k)&&p.checked[k]===true&&(p.answers[ownKey(item.id)]??'').replace(/\s/g,'').length>=6)
const recallPhaseKey=(id:string)=>`workshopRecallPhase-${id}`
const recallAnswerKey=(item:string,id:string)=>`workshopRecall-${item}-${id}`
const recallReady=(item:WorkshopItem,p:TeachingProgress)=>!item.sourceRecall||(p.answers[recallPhaseKey(item.id)]==='compare'&&item.sourceRecall.words.every(w=>(p.answers[recallAnswerKey(item.id,w.id)]??'').trim().length>0))
const cardinalDirections=['north','south','east','west']
const locationPreview=(map:LocationMap,text:string):LocationPreview=>{
 const direction=cardinalDirections.includes(text.toLowerCase())?text.toLowerCase():''
 return{direction,ready:!!direction,cells:['','north','','west','anchor','east','','south',''].map((slot,index)=>({id:String(index),text:slot==='anchor'?map.anchor:direction&&slot===direction?map.marker:'',anchor:slot==='anchor',marker:!!direction&&slot===direction}))}
}
const sourceGapKey=(id:string)=>`workshopGap-${id}`
const sourceGapMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.sourceGap||(p.answers[sourceGapKey(item.id)]===item.sourceGap.answer&&p.checked[sourceGapKey(item.id)]===true)
const sourceGapCompletion=(item:WorkshopItem,p:TeachingProgress,k:string)=>!item.sourceGap||(sourceGapMatches(item,p)&&proofReady(item,p,k)&&p.checked[k]===true&&(p.answers[ownKey(item.id)]??'').replace(/\s/g,'').length>=6)
const sourceOrderKey=(id:string)=>`workshopOrder-${id}`
const sourceOrderIds=(item:WorkshopItem,p:TeachingProgress)=>(p.answers[sourceOrderKey(item.id)]??'').split('|').filter(Boolean)
const sourceOrderMatches=(item:WorkshopItem,p:TeachingProgress)=>!item.sourceOrder||(sourceOrderIds(item,p).length===item.sourceOrder.length&&item.sourceOrder.every((id,i)=>sourceOrderIds(item,p)[i]===id))
const calculationValue=(value:string)=>value.normalize('NFKC').trim()
const calculationMatches=(item:WorkshopItem,value:string)=>!item.calculation||calculationValue(value)===item.calculation.answer
const requiredProof=(item:WorkshopItem)=>item.evidenceGroups??[item.options?.filter(o=>o.correct).map(o=>o.id)??[]]
const proofReady=(item:WorkshopItem,p:TeachingProgress,k:string)=>requiredProof(item).every(group=>group.some(id=>p.checked[`${k}-proof-${id}`]))
const longEnough=(text:string,min=5)=>wordCount(text)>=min
/** Explicit authored forms support guided writing; this is not a grammar judgement. */
export const containsWorkshopWord=(text:string,item:WorkshopItem)=>(item.ownForms??[item.answer]).some(form=>containsTerm(text,form))
const vCaseOnly=(item:WorkshopItem,input:string)=>!!item.caseSensitive&&input!==item.answer&&normalizedAnswer(input)===normalizedAnswer(item.answer)
export function workshopView(w:LessonWorkshop,p:TeachingProgress):WorkshopView{
 const total=w.conditions?.length??w.items.length,index=indexOf(p,total),condition=w.conditions?.[index],item=w.items[w.kind==='transform'?0:index],k=key(index),tileIds=[...new Set((p.answers[`workshopTiles-${index}`]??'').split('|').filter(id=>/^(0|[1-9][0-9]*)$/.test(id)&&condition?.tiles?.[Number(id)]!==undefined))],selected=condition?.tiles?tileIds.map(id=>condition.tiles![Number(id)]).join(condition?.tileMode==='morpheme'?'':' '):p.answers[k]??condition?.initial??'',input=p.answers[`workshopInput-${index}`]??'',own=p.answers[ownKey(item.id)]??'',attempted=typeof p.checked[k]==='boolean',correct=!!p.checked[k]&&wordDecisionMatches(item,p,k)&&settingsMatch(item,p)&&recallReady(item,p)&&sourceGapMatches(item,p)&&(!item.sourceGap||proofReady(item,p,k))&&sourceOrderMatches(item,p)&&calculationMatches(item,input)&&selectionMatches(w,p,index),complete=!!p.completed.includes(k)&&wordDecisionMatches(item,p,k)&&settingsCompletion(item,p,k)&&recallReady(item,p)&&sourceGapCompletion(item,p,k)&&sourceOrderMatches(item,p)&&calculationMatches(item,input)&&selectionMatches(w,p,index)
 const completedAt=(i:number)=>{const it=w.items[w.kind==='transform'?0:i];return p.completed.includes(key(i))&&wordDecisionMatches(it,p,key(i))&&settingsCompletion(it,p,key(i))&&recallReady(it,p)&&sourceGapCompletion(it,p,key(i))&&sourceOrderMatches(it,p)&&calculationMatches(it,p.answers[`workshopInput-${i}`]??'')&&selectionMatches(w,p,i)}
 const baseOptions=w.kind==='transform'?(condition?.choices??w.choices??[]).map(text=>({id:text,text})):item.options??[]
 // Stable per-word rotation avoids a repeated first-answer pattern without moving choices during a task.
 const offset=w.kind==='word-use'&&item.wordDecision?[...item.id].reduce((hash,c)=>(Math.imul(hash,31)+c.charCodeAt(0))>>>0,0)%Math.max(1,baseOptions.length):0
 const options=[...baseOptions.slice(offset),...baseOptions.slice(0,offset)]
 const orderIds=sourceOrderIds(item,p),orderAnswer=orderIds.flatMap((id,slot)=>{const o=item.options?.find(o=>o.id===id);return o?[{id,text:o.text,wrong:attempted&&!!item.sourceOrder&&id!==item.sourceOrder[slot]}]:[]}),orderBank=item.sourceOrder?(item.options??[]).filter(o=>!orderIds.includes(o.id)).map(o=>({id:o.id,text:o.text,used:false})):[]
 const scope=condition?.world.selection,members=(p.answers[`worldMembers-${index}`]??'').split('|').filter(Boolean),membersCorrect=!scope||(members.length===scope.ids.length&&scope.ids.every(id=>members.includes(id)))
 const selectionText=scope?.mode==='words'?(condition?.world.cells??[]).filter(c=>c.id&&members.includes(c.id)).map(c=>c.label).join(' '):''
 const sourceRecords=condition?.world.records,records=sourceRecords?{...sourceRecords,artLabels:sourceRecords.artLabels?.map(label=>label.split('@attempt').join(selected||'…'))}:undefined,recordId=p.answers[`eventRecord-${index}`]??'',recordOptions=(records?.options??[]).map(r=>({...r,selected:r.id===recordId,wrong:attempted&&r.id===recordId&&r.id!==records!.answer})),recordCorrect=!records||recordId===records.answer
 const scene=condition?.world.scene,selectedPeople=(p.answers[`sceneSubjects-${index}`]??'').split('|').filter(Boolean)
 const scenePeople=(scene?.people??[]).map(person=>({...person,selected:selectedPeople.includes(person.id),wrong:attempted&&selectedPeople.includes(person.id)&&!scene!.subjects.includes(person.id),speaking:scene!.speaker===person.id,listening:scene!.listeners.includes(person.id),style:`left:${person.left}%;width:${person.width}%;`}))
 const sceneSubjectsCorrect=!scene||(selectedPeople.length===scene.subjects.length&&scene.subjects.every(id=>selectedPeople.includes(id)))
 let feedback=''
 if(attempted){if(correct)feedback=w.kind==='transform'?condition!.reason:item.reason
 else if(scope&&!membersCorrect)feedback=(scope.mode==='words'?`你圈出的是「${selectionText||'空白'}」。`:scope.mode==='fields'?`你选出的变化是：${(condition?.world.cells??[]).filter(c=>c.id&&members.includes(c.id)).map(c=>c.label).join('、')||'还未选择'}。`:scope.mode==='redact'?`你遮挡了：${(condition?.world.cells??[]).filter(c=>c.id&&members.includes(c.id)).map(c=>c.label).join('、')||'还没有字段'}。`:'')+scope.reason
 else if(records&&!recordCorrect)feedback=recordOptions.find(r=>r.selected)?.reason??records.missingPrompt??'先选择与这句话对应的事件记录，再核对动词。'
 else if(scene&&!sceneSubjectsCorrect)feedback=`你圈出的是${scenePeople.filter(p=>p.selected).map(p=>p.name).join('、')||'空白'}。${scene.subjectReason}先改好人物选择，再核对${scene.formLabel??'be'}。`
 else if(w.kind==='transform'&&condition!.caseSensitive&&[condition!.target,...condition!.accepted??[]].some(a=>normalizedAnswer(a)===normalizedAnswer(selected)))feedback=`词序和词形对上了，再核对大小写。${condition!.reason}`
 else if(w.kind==='transform')feedback=`你放入的是 ${selected||'空白'}。${condition!.reason}`
 else if(w.kind==='word-use'&&item.wordDecision?.fraction&&!fractionMatches(item,p))feedback=item.wordDecision.fraction.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.climate&&!climateMatches(item,p))feedback=item.wordDecision.climate.wrong; else if(w.kind==='word-use'&&item.wordDecision?.until&&!untilMatches(item,p))feedback=item.wordDecision.until.wrong; else if(w.kind==='word-use'&&item.wordDecision?.dailyWalk&&!dailyWalkMatches(item,p))feedback=item.wordDecision.dailyWalk.wrong; else if(w.kind==='word-use'&&item.wordDecision?.reportedChange&&!reportedChangeMatches(item,p))feedback=item.wordDecision.reportedChange.wrong; else if(w.kind==='word-use'&&item.wordDecision?.phoneMode&&!phoneModeMatch(item,p))feedback=item.wordDecision.phoneMode.wrong; else if(w.kind==='word-use'&&item.wordDecision?.printPages&&!printPagesMatch(item,p))feedback=item.wordDecision.printPages.wrong; else if(w.kind==='word-use'&&item.wordDecision?.chance&&!chanceMatches(item,p))feedback=item.wordDecision.chance.wrong; else if(w.kind==='word-use'&&item.wordDecision?.boat&&!boatMatches(item,p))feedback=item.wordDecision.boat.wrong; else if(w.kind==='word-use'&&item.wordDecision?.shift&&!shiftMatches(item,p))feedback=item.wordDecision.shift.wrong; else if(w.kind==='word-use'&&item.wordDecision?.provision&&!provisionMatches(item,p))feedback=item.wordDecision.provision.wrong; else if(w.kind==='word-use'&&item.wordDecision?.thermal&&!thermalMatches(item,p))feedback=item.wordDecision.thermal.wrong; else if(w.kind==='word-use'&&item.wordDecision?.daylight&&!daylightMatches(item,p))feedback=item.wordDecision.daylight.wrong; else if(w.kind==='word-use'&&item.wordDecision?.weather&&!weatherMatches(item,p))feedback=item.wordDecision.weather.wrong; else if(w.kind==='word-use'&&item.wordDecision?.door&&!doorMatches(item,p))feedback=item.wordDecision.door.wrong; else if(w.kind==='word-use'&&item.wordDecision?.rotation&&!rotationMatches(item,p))feedback=item.wordDecision.rotation.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.ruler&&!rulerMatches(item,p))feedback=item.wordDecision.ruler.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.quantity&&!quantityMatches(item,p))feedback=item.wordDecision.quantity.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.recordSelection&&!recordsMatch(item,p))feedback=item.wordDecision.recordSelection.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.clock&&!clockMatches(item,p))feedback=item.wordDecision.clock.wrong;
 else if(w.kind==='word-use'&&item.wordDecision&&!wordDecisionMatches(item,p,k))feedback=item.options?.find(o=>o.id===selected)?.reason??'先选出符合情境的理解，再核对词形。';
 else if(w.kind==='word-use'&&item.usage?.alternatives[normalizedAnswer(input)])feedback=`你输入了 ${input}，图中物品的方向也变了。${item.usage.caption} ${item.reason}`;
 else if(w.kind==='word-use'&&vCaseOnly(item,input))feedback=`词形写对了，但这里要注意大小写：${item.answer}。`;
 else if(w.kind==='word-use'){const n=[...input].findIndex((c,i)=>c.toLocaleLowerCase('en')!==item.answer[i]?.toLocaleLowerCase('en'));feedback=`句中需要表达“${item.meaning}”。${input?`从第 ${n<0?Math.min(input.length,item.answer.length)+1:n+1} 个字符起核对，注意词形和空格。`:'先根据语境写出这个词。'}${item.hint}`}
 else if(w.kind==='proof'&&item.sourceOrder){const decoy=orderIds.map(id=>item.options?.find(o=>o.id===id)).find(o=>o&&!o.correct);feedback=decoy?decoy.reason:orderIds.length!==item.sourceOrder.length?`先排出题目限定的 ${item.sourceOrder.length} 步；现在放入了 ${orderIds.length} 句。${item.hint}`:`句子找对了，先后还没对上。${item.hint}`}
 else if(w.kind==='proof'&&item.calculation&&proofReady(item,p,k)&&p.checked[`${k}-proof-${selected}`])feedback=input.trim()?item.calculation.wrong:`依据找齐了。${item.calculation.hint}`;
 else if(w.kind==='proof'&&item.sourceGap&&proofReady(item,p,k)&&p.checked[`${k}-proof-${selected}`])feedback='原文线索已找到；再把候选词放回句子核对。';
 else if(w.kind==='proof'&&p.checked[`${k}-proof-${selected}`])feedback='这条依据接对了。还需要把另一条关键线索接进来，才能确定结论。';
 else if(w.kind==='proof')feedback=item.options?.find(o=>o.id===selected)?.reason??'先选一条原文依据，再核对。'
 else feedback=item.options?.find(o=>o.id===selected)?.reason??'先观察例子，再选择。'
 }
 if(p.checked.workshopOwnMissing)feedback=w.kind==='proof'?'这句线索怎样回答问题？用中文或英文写下一小句自己的推理，再保存。':w.kind==='compose'?'这一步需要你自己的英语。先写一条至少4个英文词的信息，再保存。':`先用 ${item.answer}${item.ownForms?'或它的合适词形':''} 写一句自己的话（至少5个英文词），再保存。这里只核对形式，意思和搭配要对照例句自查。`
 const chosen=options.find(o=>o.id===selected)?.text??'',soundMode=item.sound==='links'?(chosen.includes('‿')?'link':'split'):item.sound??'',pitch=chosen==='↗'?'rise':chosen==='↘'?'fall':''
 let soundUnits:{text:string;emphasis:boolean}[]=[]
 if(item.sound==='syllables')soundUnits=(item.before??'').split(' · ').map((text,i)=>({text,emphasis:!!chosen&&i===(chosen==='第二音节'?1:0)}))
 if(item.sound==='emphasis')soundUnits=(item.before??'').split(' ').map(text=>({text,emphasis:text.replace(/[^a-z]/gi,'').toLowerCase()===chosen.toLowerCase()}))
 if(item.sound==='groups'||item.sound==='links')soundUnits=(chosen||item.before||'').split(item.sound==='groups'?'/':/[‿/]/).map(text=>({text:text.trim(),emphasis:false}))
 const record=recordOptions.find(r=>r.selected)
 const cells=(condition?.world.cells??[]).map(c=>{const cellValue=c.label==='@record'?(record?.value??(condition?.world.kind==='count'?0:50)):c.value;return({...c,selected:!!c.id&&members.includes(c.id),wrong:(!!scope&&attempted&&!!c.id&&members.includes(c.id)&&!scope.ids.includes(c.id))||(c.label==='@record'&&attempted&&!recordCorrect),role:c.role==='record-span'?(record?.endValue!==undefined?'record-span':''):c.role,rangeStyle:c.role==='record-span'&&record?.endValue!==undefined?`left:${record.value}%;width:${record.endValue-record.value}%;`:'',label:c.label==='@attempt'?(selected||'…'):c.label==='@record'?(record?.eventLabel??record?.label??records?.emptyLabel??'先选记录'):c.label==='@outcome'?(record?.outcome??records?.emptyOutcome??'先选条件'):c.label,value:cellValue,copies:Array.from({length:Math.max(0,Math.min(8,cellValue??1))},(_,i)=>i),style:`left:${c.label==='@record'?(recordOptions.find(r=>r.selected)?.value??50):(c.value??50)}%;`})})
 const albumOwnership=condition?.world.albums,albumMode=albumOwnership?(recordId===albumOwnership.sharedId?'shared':recordId===albumOwnership.separateId?'separate':''):''
 const albumItems=albumOwnership&&albumMode?(albumMode==='shared'?[{label:albumOwnership.owners.join(' 和 ')+' 共同的旅行相册'}]:albumOwnership.owners.map(name=>({label:name+' 的旅行相册'}))):[]
 const bridge=condition?.world.verbBridge,bridgeOption=bridge?.options.find(o=>o.expression===selected),verbBridge=bridge?{verb:bridge.verb,object:bridge.object,objectLabel:bridge.objectLabel,known:!!bridgeOption,link:bridgeOption?.link??''}:undefined
 const gapChoice=item.sourceGap?.options.find(o=>o.id===p.answers[sourceGapKey(item.id)]),gapChecked=typeof p.checked[sourceGapKey(item.id)]==='boolean'
 const recall=item.sourceRecall,recallPhase=p.answers[recallPhaseKey(item.id)]??'study'
 const settings=item.sourceSettings,settingsChecked=typeof p.checked[settingsKey(item.id)]==='boolean',settingsLabels:[string,string]=settings?.labels??['允许','静音']
 const pacing=settings?.pacing,pace=pacing?(p.answers[settingKey(item.id,pacing.paceRow)]??''):'',space=pacing?(p.answers[settingKey(item.id,pacing.spaceRow)]??''):''
 const pacingPreview:PacingPreview|undefined=pacing?{ready:['on','off'].includes(pace)&&['on','off'].includes(space),pace,space,beatGap:pace==='on'?10:4,extraGap:space==='on'?18:0,phraseGap:(pace==='on'?10:4)+(space==='on'?18:0),paceLabel:pace==='on'?'较慢':pace==='off'?'原先较快':'还没选速度',spaceLabel:space==='on'?'留出乐句间隔':space==='off'?'不留额外间隔':'还没选间距',groups:['first','middle','last'].map(id=>({id,dots:[0,1,2]}))}:undefined
 const reduction=item.calculation?.reduction,value=calculationValue(input),ready=/^(?:0|[1-9]\d{0,3})$/.test(value),amount=ready?Number(value):0,scale=reduction?Math.max(1,reduction.before,amount):1
 const reductionPreview=reduction?{unit:reduction.unit,ready,rows:[{id:'before',label:reduction.beforeLabel,value:String(reduction.before),width:100*reduction.before/scale},{id:'after',label:reduction.afterLabel,value:String(reduction.after),width:100*reduction.after/scale},{id:'attempt',label:'我的减少量',value:ready?value:'—',width:100*amount/scale}]}:undefined
 const wordEvidence=item.wordDecision?.art?.evidence?.find(e=>e.option===selected)
 return{wordPhoneMode:item.wordDecision?.phoneMode?wordPhoneModeView(item.wordDecision.phoneMode,p.answers[wordPhoneModeKey(item.id)]??''):undefined,wordPrintPages:item.wordDecision?.printPages?wordPrintPagesView(item.wordDecision.printPages,p.answers[wordPrintPagesKey(item.id)]??''):undefined,wordSources:item.wordDecision?.sources?{context:item.wordDecision.sources.context,cards:item.wordDecision.sources.cards.map(card=>({...card,text:item.options?.find(o=>o.id===card.option)?.text??'',selected:card.option===selected,accepted:attempted&&card.option===selected&&!!item.options?.some(o=>o.id===selected&&o.correct),wrong:attempted&&card.option===selected&&!item.options?.some(o=>o.id===selected&&o.correct)}))}:undefined,wordReportedChange:item.wordDecision?.reportedChange?wordReportedChangeView(item.wordDecision.reportedChange,p.answers[wordReportedChangeKey(item.id)]??''):undefined,wordChance:item.wordDecision?.chance?wordChanceView(item.wordDecision.chance,p.answers[wordChanceKey(item.id)]??''):undefined,wordDailyWalk:item.wordDecision?.dailyWalk?wordDailyWalkView(item.wordDecision.dailyWalk,p.answers[wordDailyWalkKey(item.id)]??''):undefined,wordPictureOnly:item.wordDecision?.art?.pictureOnly===true,wordBoat:item.wordDecision?.boat?wordBoatView(item.wordDecision.boat,p.answers[wordBoatKey(item.id)]??''):undefined,wordShift:item.wordDecision?.shift?wordFeelingShiftView(item.wordDecision.shift,p.answers[wordFeelingShiftKey(item.id)]??''):undefined,wordProvision:item.wordDecision?.provision?wordProvisionView(item.wordDecision.provision,p.answers[wordProvisionKey(item.id)]??''):undefined,wordUntil:item.wordDecision?.until?wordUntilView(item.wordDecision.until,p.answers[wordUntilKey(item.id)]??''):undefined,wordThermal:item.wordDecision?.thermal?wordThermalView(item.wordDecision.thermal,p.answers[wordThermalKey(item.id)]??''):undefined,wordClimate:item.wordDecision?.climate?wordClimateView(item.wordDecision.climate,p.answers[wordClimateKey(item.id)]??''):undefined,wordDaylight:item.wordDecision?.daylight?wordDaylightView(item.wordDecision.daylight,p.answers[wordDaylightKey(item.id)]??''):undefined,wordWeather:item.wordDecision?.weather?wordWeatherView(item.wordDecision.weather,p.answers[wordWeatherKey(item.id)]??''):undefined,wordDoor:item.wordDecision?.door?wordDoorView(item.wordDecision.door,p.answers[wordDoorKey(item.id)]??''):undefined,wordFraction:item.wordDecision?.fraction?wordFractionView(item.wordDecision.fraction,p.answers[wordFractionKey(item.id)]??''):undefined,wordRotation:item.wordDecision?.rotation?wordRotationView(item.wordDecision.rotation,p.answers[wordRotationKey(item.id)]??''):undefined,wordRuler:item.wordDecision?.ruler?wordRulerView(item.wordDecision.ruler,p.answers[wordRulerKey(item.id)]??''):undefined,wordQuantity:item.wordDecision?.quantity?wordQuantityView(item.wordDecision.quantity,p.answers[wordQuantityKey(item.id)]??''):undefined,wordRecordSelection:item.wordDecision?.recordSelection?wordRecordSelectionView(item.wordDecision.recordSelection,p.answers[wordRecordSelectionKey(item.id)]??''):undefined,wordClock:item.wordDecision?.clock?wordClockView(item.wordDecision.clock,p.answers[wordClockKey(item.id)]??''):undefined,wordPictureTargets:(item.wordDecision?.art?.targets??[]).map(t=>({id:t.id,option:t.option,label:t.label,selected:t.option===selected,...(item.wordDecision?.art?.pictureOnly?{accepted:attempted&&t.option===selected&&!!item.options?.some(o=>o.id===selected&&o.correct),wrong:attempted&&t.option===selected&&!item.options?.some(o=>o.id===selected&&o.correct)}:{}),style:`left:${t.left}%;top:${t.top}%;width:${t.width}%;height:${t.height}%;align-items:${t.labelPosition==='top'?'flex-start':'flex-end'};`})),wordRecordPaths:selected&&item.options?.some(o=>o.id===selected)?item.wordDecision?.recordPaths??[]:[],wordTailOnly:/^[.!?,;:]+$/.test((item.after??'').trim()),wordEvidence:wordEvidence?{caption:wordEvidence.caption,regions:wordEvidence.regions.map(r=>({id:r.id,label:r.label,style:`left:${r.left}%;top:${r.top}%;width:${r.width}%;height:${r.height}%;`}))}:undefined,ownMissing:!!p.checked.workshopOwnMissing,reduction:reductionPreview,settings:settings?{pacing:pacingPreview,labels:settingsLabels,title:settings.title,note:settings.note,checked:settingsChecked,correct:settingsMatch(item,p),rows:settings.rows.map(r=>{const value=p.answers[settingKey(item.id,r.id)]??'',labels=r.route?.targets??settingsLabels;return{id:r.id,label:r.label,value,labels,route:r.route?{from:r.route.from,target:value==='on'?labels[0]:value==='off'?labels[1]:'先选择去向或下一步'}:undefined,status:value==='on'?labels[0]:value==='off'?labels[1]:'尚未设置',correct:settingsChecked&&value===r.answer,feedback:settingsChecked?(value===r.answer?r.reason:value?r.wrong:`这项还没设置。先选${labels[0]}或${labels[1]}，再核对。`):''}})}:undefined,recall:recall?{title:recall.title,note:recall.note,phase:recallPhase,ready:recall.words.every(w=>(p.answers[recallAnswerKey(item.id,w.id)]??'').trim().length>0),rows:recall.words.map(w=>({...w,answer:recallPhase==='recall'?'':w.answer,attempt:p.answers[recallAnswerKey(item.id,w.id)]??'',same:normalizedAnswer(p.answers[recallAnswerKey(item.id,w.id)]??'')===normalizedAnswer(w.answer)}))}:undefined,gap:item.sourceGap?{...(item.sourceGap.locationMap?{map:locationPreview(item.sourceGap.locationMap,gapChoice?.text??'')}:{}),before:item.sourceGap.before,after:item.sourceGap.after,text:gapChoice?.text??'____',selected:gapChoice?.id??'',checked:gapChecked,correct:sourceGapMatches(item,p),feedback:gapChecked?(gapChoice?.reason??'先把一个候选词放进空格，再核对。'):'',options:item.sourceGap.options.map(o=>({id:o.id,text:o.text,selected:o.id===gapChoice?.id}))}:undefined,orderSlots:(item.sourceOrderLabels??[]).map((label,slot)=>({label,id:orderAnswer[slot]?.id??'',text:orderAnswer[slot]?.text??'',wrong:orderAnswer[slot]?.wrong??false,filled:!!orderAnswer[slot]})),redaction:scope?.mode==='redact'&&scope.preview?{asset:scope.preview.asset,alt:scope.preview.alt,regions:scope.preview.regions.map(r=>({...r,label:condition!.world.cells.find(c=>c.id===r.id)!.label,detail:condition!.world.cells.find(c=>c.id===r.id)!.detail??'',masked:members.includes(r.id),wrong:attempted&&(members.includes(r.id)!==scope.ids.includes(r.id)),style:`left:${r.left}%;top:${r.top}%;width:${r.width}%;height:${r.height}%;`}))}:undefined,proofArtChoices:(item.sourceArt?.choices??[]).map(c=>({...c,selected:selected===c.id,accepted:!!p.checked[`${k}-proof-${c.id}`],wrong:attempted&&selected===c.id&&!p.checked[`${k}-proof-${c.id}`]})),proofReady:proofReady(item,p,k),orderBank,orderAnswer,selectionText,morphemeTiles:condition?.tileMode==='morpheme',verbBridge,albumOwnership,albumMode,albumItems,keepEnding:!!condition&&(!condition.tiles||condition.tileMode==='morpheme'||(condition.target.split(' ').length<=2&&selected.split(' ').length<=2))&&Math.max(condition.target.length,selected.length)<=18&&/^[.!?]$/.test(condition.after),tileBank:(condition?.tiles??[]).map((text,i)=>({id:String(i),text,used:tileIds.includes(String(i))})),tileAnswer:tileIds.map(id=>({id,text:condition!.tiles![Number(id)]})),referenceStyle:condition?.world.kind==='timeline'&&condition.world.cells.some(c=>c.id==='reference')?`left:${condition.world.cells.find(c=>c.id==='reference')!.value}%;`:'',membersCorrect,records,recordOptions,recordArtChoices:(records?.artChoices??[]).map((id,i)=>({...recordOptions.find(r=>r.id===id)!,style:`left:${i*50}%;width:50%;`})),recordCorrect,hasScene:!!w.conditions?.some(c=>c.world.scene||c.world.records||c.world.selection||c.world.verbBridge||c.tileMode==='morpheme'),navigationLabel:w.navigationLabel??'任务',scene,scenePeople,sceneSubjectsCorrect,expressionWrong:attempted&&!!selected&&!!condition&&!matches(condition,selected),proofSteps:(item.evidenceLabels??[]).map((label,index)=>({id:String(index),label,accepted:!!item.evidenceGroups?.[index]?.some(id=>p.checked[`${k}-proof-${id}`])})),proofRequired:item.evidenceGroups?.length??1,proofCollected:(item.options??[]).filter(o=>p.checked[`${k}-proof-${o.id}`]).map(o=>({id:o.id,text:o.text})),proofAccepted:!!p.checked[`${k}-proof-${selected}`],soundUnits,soundMode,pitch,doneCount:Array.from({length:total},(_,i)=>i).filter(completedAt).length,usageDirection:item.usage?.alternatives[normalizedAnswer(input)]??'',kind:w.kind,title:w.title,instruction:w.instruction,index,total,tabs:Array.from({length:total},(_,i)=>({id:String(i),label:w.conditions?.[i].label??w.items[i].label,done:completedAt(i)})),item,condition,cells,choices:options.map(o=>({...o,text:item.sound==='pitch'?(o.text==='↗'?'句末上升':'句末下降'):o.text,selected:o.id===selected,accepted:item.wordDecision?attempted&&o.id===selected&&!!item.options?.some(option=>option.id===selected&&option.correct):!!p.checked[`${k}-proof-${o.id}`]})),selected,input,own,attempted,correct,feedback,revealed:!!p.checked.workshopReveal,complete,allDone:Array.from({length:total},(_,i)=>i).every(completedAt),draftWords:wordCount(own),sourceOpen:!!p.checked.workshopSource,worldClass:condition?.world.kind??w.kind}
}
export function changeWorkshop(w:LessonWorkshop,p:TeachingProgress,action:string,value:string):void{
 const v=workshopView(w,p),k=key(v.index),mark=()=>{if(!p.completed.includes(k))p.completed.push(k)},unmark=()=>{p.completed=p.completed.filter(x=>x!==k)}
 if(action==='fraction'){
  const fraction=v.item.wordDecision?.fraction;if(w.kind!=='word-use'||!fraction)return
  const next=changeFraction(fraction,p.answers[wordFractionKey(v.item.id)]??'',value);if(next===undefined)return
  p.answers[wordFractionKey(v.item.id)]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='climate'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.climate)return
  const field=wordClimateKey(v.item.id),next=changeClimate(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='until'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.until)return
  const field=wordUntilKey(v.item.id),next=changeUntil(v.item.wordDecision.until,value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='daily-walk'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.dailyWalk)return
  const field=wordDailyWalkKey(v.item.id),next=changeDailyWalk(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='reportedChange'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.reportedChange)return
  const field=wordReportedChangeKey(v.item.id),next=changeReportedChange(value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='phoneMode'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.phoneMode)return
  const field=wordPhoneModeKey(v.item.id),next=changePhoneMode(value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='printPages'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.printPages)return
  const field=wordPrintPagesKey(v.item.id),next=changePrintPages(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='chance'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.chance)return
  const field=wordChanceKey(v.item.id),next=changeChance(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='boat'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.boat)return
  const field=wordBoatKey(v.item.id),next=changeBoat(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='shift'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.shift)return
  const field=wordFeelingShiftKey(v.item.id),next=changeFeelingShift(value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='provision'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.provision)return
  const field=wordProvisionKey(v.item.id),next=changeProvision(value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='thermal'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.thermal)return
  const field=wordThermalKey(v.item.id),next=changeThermal(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='daylight'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.daylight)return
  const next=changeDaylight(value);if(next===undefined)return
  p.answers[wordDaylightKey(v.item.id)]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='weather'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.weather)return
  const next=changeWeather(p.answers[wordWeatherKey(v.item.id)]??'',value);if(next===undefined)return
  p.answers[wordWeatherKey(v.item.id)]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='door'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.door)return
  const next=changeDoor(p.answers[wordDoorKey(v.item.id)]??'',value);if(next===undefined)return
  p.answers[wordDoorKey(v.item.id)]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='rotation'){
  const rotation=v.item.wordDecision?.rotation;if(w.kind!=='word-use'||!rotation||rotationAngle(rotation,value)===undefined)return
  p.answers[wordRotationKey(v.item.id)]=value;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='ruler'){
  const ruler=v.item.wordDecision?.ruler;if(w.kind!=='word-use'||!ruler||rulerDistance(ruler,value)===undefined)return
  p.answers[wordRulerKey(v.item.id)]=value;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='quantity'){
  const quantity=v.item.wordDecision?.quantity;if(w.kind!=='word-use'||!quantity)return
  const field=wordQuantityKey(v.item.id),next=changeQuantity(quantity,p.answers[field]??'',value)
  if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='record-toggle'||action==='record-none'){
  const records=v.item.wordDecision?.recordSelection;if(w.kind!=='word-use'||!records)return
  const field=wordRecordSelectionKey(v.item.id),next=action==='record-none'?(value===''?noWordRecords:undefined):toggleWordRecord(records,p.answers[field]??'',value)
  if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='clock'){
  const clock=v.item.wordDecision?.clock;if(w.kind!=='word-use'||!clock||clockInterval(clock,value)===undefined)return
  p.answers[wordClockKey(v.item.id)]=value;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='setting'||action==='settings-check'){
  const settings=v.item.sourceSettings;if(w.kind!=='proof'||!settings)return
  if(action==='setting'){const [id,choice]=value.split(':');if(!settings.rows.some(r=>r.id===id)||!['on','off'].includes(choice)||value!==id+':'+choice)return;p.answers[settingKey(v.item.id,id)]=choice;delete p.checked[settingsKey(v.item.id)]}
  else p.checked[settingsKey(v.item.id)]=settings.rows.every(r=>p.answers[settingKey(v.item.id,r.id)]===r.answer)
  unmark();delete p.checked[k];p.checked.workshopOwnMissing=false;return
 }
 if(action==='recall-study'||action==='recall-hide'||action==='recall-reveal'||action==='recall-input'){
  const recall=v.item.sourceRecall;if(w.kind!=='proof'||!recall)return
  const phaseKey=recallPhaseKey(v.item.id)
  if(action==='recall-study')p.answers[phaseKey]='study'
  if(action==='recall-hide')p.answers[phaseKey]='recall'
  if(action==='recall-reveal'&&v.recall?.phase==='recall'&&v.recall.ready)p.answers[phaseKey]='compare'
  if(action==='recall-input'){
   const split=value.indexOf(':'),id=value.slice(0,split)
   if(split<0||!recall.words.some(w=>w.id===id)||v.recall?.phase==='study')return
   p.answers[recallAnswerKey(v.item.id,id)]=value.slice(split+1,split+81);p.answers[phaseKey]='recall'
  }
  unmark();delete p.checked[k];p.checked.workshopOwnMissing=false;return
 }
 if(action==='gap'||action==='gap-check'){
  if(w.kind!=='proof'||!v.item.sourceGap)return
  const kGap=sourceGapKey(v.item.id)
  if(action==='gap'){if(value&&!v.item.sourceGap.options.some(o=>o.id===value))return;p.answers[kGap]=value;delete p.checked[kGap]}
  else p.checked[kGap]=p.answers[kGap]===v.item.sourceGap.answer
  unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='item'){const i=Number(value);if(Number.isInteger(i)&&i>=0&&i<v.total){p.answers.workshopIndex=String(i);p.checked.workshopReveal=false;p.checked.workshopOwnMissing=false;p.checked.workshopSource=false}return}
 if(['tile-add','tile-remove','tile-clear'].includes(action)){
  if(!v.condition?.tiles)return
  const ids=v.tileAnswer.map(t=>t.id)
  if(action==='tile-add'){if(!v.tileBank.some(t=>t.id===value&&!t.used))return;ids.push(value)}
  else if(action==='tile-remove'){if(!ids.includes(value))return;ids.splice(ids.indexOf(value),1)}
  p.answers[`workshopTiles-${v.index}`]=action==='tile-clear'?'':ids.join('|');delete p.checked[k];unmark();return
 }
 if(action==='order-add'||action==='order-remove'||action==='order-clear'){
  if(w.kind!=='proof'||!v.item.sourceOrder)return
  const ids=v.orderAnswer.map(o=>o.id)
  if(action==='order-add'){if(!v.item.options?.some(o=>o.id===value)||ids.includes(value)||ids.length>=v.item.options.length)return;ids.push(value)}
  if(action==='order-remove'){if(!ids.includes(value))return;ids.splice(ids.indexOf(value),1)}
  p.answers[sourceOrderKey(v.item.id)]=action==='order-clear'?'':ids.join('|');delete p.checked[k];unmark();p.checked.workshopOwnMissing=false
  for(const o of v.item.options??[])delete p.checked[`${k}-proof-${o.id}`]
  return
 }
 if(action==='input'){if(v.condition?.tiles)return;p.answers[`workshopInput-${v.index}`]=value.slice(0,120);if(v.condition?.input)p.answers[k]=value.slice(0,120);unmark();delete p.checked[k];p.checked.workshopOwnMissing=false;return}
 if(action==='own'){p.answers[ownKey(v.item.id)]=value.slice(0,1000);p.checked.workshopOwnMissing=false;if(w.kind==='compose'||w.kind==='word-use'||w.kind==='proof')unmark();return}
 if(action==='member'){
  const scope=v.condition?.world.selection;if(!scope||!v.cells.some(c=>c.id===value))return
  const members=v.cells.filter(c=>c.selected).map(c=>c.id!)
  p.answers[`worldMembers-${v.index}`]=(members.includes(value)?members.filter(id=>id!==value):[...members,value]).sort().join('|');delete p.checked[k];unmark();return
 }
 if(action==='record'){
  if(!v.recordOptions.some(r=>r.id===value))return
  p.answers[`eventRecord-${v.index}`]=value;delete p.checked[k];unmark();return
 }
 if(action==='subject'){
  if(!v.scenePeople.some(person=>person.id===value))return
  const selected=v.scenePeople.filter(person=>person.selected).map(person=>person.id)
  p.answers[`sceneSubjects-${v.index}`]=(selected.includes(value)?selected.filter(id=>id!==value):[...selected,value]).sort().join('|');delete p.checked[k];unmark();return
 }
 if(action==='source'){p.checked.workshopSource=!p.checked.workshopSource;return}
 if(action==='reveal'){p.checked.workshopReveal=!p.checked.workshopReveal;return}
 if(action==='choose'){
  if(v.condition?.tiles||v.item.sourceOrder)return
  if(!v.choices.some(o=>o.id===value))return
  p.answers[k]=value;delete p.checked[k];unmark();return
 }
 if(action==='check'){
  if(w.kind==='proof'&&v.item.sourceOrder){const correct=sourceOrderMatches(v.item,p);p.checked[k]=correct;for(const o of v.item.options??[])p.checked[`${k}-proof-${o.id}`]=correct&&!!o.correct;if(!correct)unmark();return}
  if(w.kind==='proof'){const accepted=!!v.item.options?.find(o=>o.id===v.selected)?.correct;if(accepted)p.checked[`${k}-proof-${v.selected}`]=true;p.checked[k]=accepted&&proofReady(v.item,p,k)&&calculationMatches(v.item,v.input);if(!p.checked[k])unmark();else if(v.item.sourceStyle==='cards'&&v.proofRequired===1&&!v.item.sourceGap&&!v.item.sourceRecall&&!v.item.sourceSettings)mark();return}
  if(w.kind==='compose'){if(longEnough(v.own,4)){mark();p.checked[k]=true}else p.checked.workshopOwnMissing=true;return}
  const correct=w.kind==='transform'?matches(v.condition!,v.selected)&&v.sceneSubjectsCorrect&&v.recordCorrect&&v.membersCorrect:w.kind==='word-use'?normalizedAnswer(v.input,!!v.item.caseSensitive)===normalizedAnswer(v.item.answer,!!v.item.caseSensitive)&&wordDecisionMatches(v.item,p,k):!!v.item.options?.find(o=>o.id===v.selected)?.correct
  p.checked[k]=correct
  if(correct&&w.kind!=='word-use')mark();else if(!correct)unmark()
  return
 }
 if(action==='save'&&w.kind==='proof'){if(v.correct&&v.own.replace(/\s/g,'').length>=6){mark();p.checked.workshopOwnMissing=false}else{p.checked.workshopOwnMissing=true;unmark()}return}
 if(action==='save'&&w.kind==='word-use'){
  if(!v.correct){p.checked.workshopOwnMissing=false;unmark();return}
  if(v.correct&&longEnough(v.own)&&containsWorkshopWord(v.own,v.item)&&normalizedAnswer(v.own)!==normalizedAnswer(v.item.material??'')){mark();p.checked.workshopOwnMissing=false}else{p.checked.workshopOwnMissing=true;unmark()}return
 }
}

/** Convert instructional language while preserving source and control identities. */
export function mapWorkshop(w:LessonWorkshop,t:(text:string)=>string):LessonWorkshop{
 return{...w,title:t(w.title),instruction:t(w.instruction),choices:w.choices?.map(t),conditions:w.conditions?.map(c=>({...c,initial:c.initial!==undefined?t(c.initial):undefined,tiles:c.tiles?.map(t),accepted:c.accepted?.map(t),choices:c.choices?.map(t),label:t(c.label),inputHint:c.inputHint?t(c.inputHint):undefined,before:t(c.before),target:t(c.target),after:t(c.after),reason:t(c.reason),world:{...c.world,verbBridge:c.world.verbBridge?{...c.world.verbBridge,verb:t(c.world.verbBridge.verb),object:t(c.world.verbBridge.object),objectLabel:t(c.world.verbBridge.objectLabel),options:c.world.verbBridge.options.map(o=>({expression:t(o.expression),link:t(o.link)}))}:undefined,albums:c.world.albums?{...c.world.albums,owners:[t(c.world.albums.owners[0]),t(c.world.albums.owners[1])]}:undefined,connector:c.world.connector?t(c.world.connector):undefined,caption:t(c.world.caption),...(c.world.selection?{selection:{...c.world.selection,prompt:t(c.world.selection.prompt),reason:t(c.world.selection.reason),preview:c.world.selection.preview?{...c.world.selection.preview,alt:t(c.world.selection.preview.alt),regions:c.world.selection.preview.regions.map(r=>({...r,text:t(r.text)}))}:undefined}}:{}),...(c.world.records?{records:{...c.world.records,title:t(c.world.records.title),overlay:c.world.records.overlay?{...c.world.records.overlay,text:t(c.world.records.overlay.text)}:undefined,missingPrompt:c.world.records.missingPrompt?t(c.world.records.missingPrompt):undefined,artLabels:c.world.records.artLabels?.map(t),options:c.world.records.options.map(r=>({...r,label:t(r.label),text:t(r.text),outcome:r.outcome?t(r.outcome):undefined,eventLabel:r.eventLabel?t(r.eventLabel):undefined,reason:t(r.reason)}))}}:{}),cells:c.world.cells.map(x=>({...x,label:t(x.label),...(x.detail?{detail:t(x.detail)}:{})}))}})),items:w.items.map(i=>({...i,...(i.ownForms?{ownForms:i.ownForms.map(t)}:{}),...(i.wordDecision?{wordDecision:{...i.wordDecision,prompt:t(i.wordDecision.prompt),...(i.wordDecision.fraction?{fraction:{...i.wordDecision.fraction,title:t(i.wordDecision.fraction.title),wholeLabel:t(i.wordDecision.fraction.wholeLabel),hint:t(i.wordDecision.fraction.hint),wrong:t(i.wordDecision.fraction.wrong)}}:{}),...(i.wordDecision.climate?{climate:{...i.wordDecision.climate,title:t(i.wordDecision.climate.title),hint:t(i.wordDecision.climate.hint),wrong:t(i.wordDecision.climate.wrong)}}:{}),...(i.wordDecision.until?{until:{...i.wordDecision.until,title:t(i.wordDecision.until.title),feeling:t(i.wordDecision.until.feeling),hint:t(i.wordDecision.until.hint),wrong:t(i.wordDecision.until.wrong),events:i.wordDecision.until.events.map(e=>({...e,label:t(e.label)}))}}:{}),...(i.wordDecision.dailyWalk?{dailyWalk:{...i.wordDecision.dailyWalk,title:t(i.wordDecision.dailyWalk.title),hint:t(i.wordDecision.dailyWalk.hint),wrong:t(i.wordDecision.dailyWalk.wrong)}}:{}),...(i.wordDecision.sources?{sources:{context:t(i.wordDecision.sources.context),cards:i.wordDecision.sources.cards.map(c=>({...c,title:t(c.title),publisher:t(c.publisher),area:t(c.area),validFor:t(c.validFor)}))}}:{}),...(i.wordDecision.phoneMode?{phoneMode:{...i.wordDecision.phoneMode,title:t(i.wordDecision.phoneMode.title),hint:t(i.wordDecision.phoneMode.hint),wrong:t(i.wordDecision.phoneMode.wrong)}}:{}),...(i.wordDecision.printPages?{printPages:{...i.wordDecision.printPages,title:t(i.wordDecision.printPages.title),needed:[...i.wordDecision.printPages.needed],hint:t(i.wordDecision.printPages.hint),wrong:t(i.wordDecision.printPages.wrong)}}:{}),...(i.wordDecision.reportedChange?{reportedChange:{...i.wordDecision.reportedChange,title:t(i.wordDecision.reportedChange.title),label:t(i.wordDecision.reportedChange.label),event:t(i.wordDecision.reportedChange.event),hint:t(i.wordDecision.reportedChange.hint),wrong:t(i.wordDecision.reportedChange.wrong)}}:{}),...(i.wordDecision.chance?{chance:{...i.wordDecision.chance,title:t(i.wordDecision.chance.title),hint:t(i.wordDecision.chance.hint),wrong:t(i.wordDecision.chance.wrong)}}:{}),...(i.wordDecision.boat?{boat:{...i.wordDecision.boat,title:t(i.wordDecision.boat.title),hint:t(i.wordDecision.boat.hint),wrong:t(i.wordDecision.boat.wrong)}}:{}),...(i.wordDecision.shift?{shift:{...i.wordDecision.shift,title:t(i.wordDecision.shift.title),feeling:t(i.wordDecision.shift.feeling),event:t(i.wordDecision.shift.event),hint:t(i.wordDecision.shift.hint),wrong:t(i.wordDecision.shift.wrong)}}:{}),...(i.wordDecision.provision?{provision:{...i.wordDecision.provision,title:t(i.wordDecision.provision.title),hint:t(i.wordDecision.provision.hint),wrong:t(i.wordDecision.provision.wrong),goal:t(i.wordDecision.provision.goal)}}:{}),...(i.wordDecision.thermal?{thermal:{...i.wordDecision.thermal,title:t(i.wordDecision.thermal.title),hint:t(i.wordDecision.thermal.hint),wrong:t(i.wordDecision.thermal.wrong)}}:{}),...(i.wordDecision.daylight?{daylight:{...i.wordDecision.daylight,title:t(i.wordDecision.daylight.title),event:t(i.wordDecision.daylight.event),hint:t(i.wordDecision.daylight.hint),wrong:t(i.wordDecision.daylight.wrong)}}:{}),...(i.wordDecision.weather?{weather:{...i.wordDecision.weather,title:t(i.wordDecision.weather.title),hint:t(i.wordDecision.weather.hint),wrong:t(i.wordDecision.weather.wrong)}}:{}),...(i.wordDecision.door?{door:{...i.wordDecision.door,title:t(i.wordDecision.door.title),people:i.wordDecision.door.people.map(t),hint:t(i.wordDecision.door.hint),wrong:t(i.wordDecision.door.wrong)}}:{}),...(i.wordDecision.rotation?{rotation:{...i.wordDecision.rotation,title:t(i.wordDecision.rotation.title),hint:t(i.wordDecision.rotation.hint),wrong:t(i.wordDecision.rotation.wrong)}}:{}),...(i.wordDecision.ruler?{ruler:{...i.wordDecision.ruler,title:t(i.wordDecision.ruler.title),startLabel:t(i.wordDecision.ruler.startLabel),markerLabel:t(i.wordDecision.ruler.markerLabel),...(i.wordDecision.ruler.emptyLabel?{emptyLabel:t(i.wordDecision.ruler.emptyLabel)}:{}),hint:t(i.wordDecision.ruler.hint),wrong:t(i.wordDecision.ruler.wrong)}}:{}),...(i.wordDecision.quantity?{quantity:{...i.wordDecision.quantity,title:t(i.wordDecision.quantity.title),unit:t(i.wordDecision.quantity.unit),pluralUnit:t(i.wordDecision.quantity.pluralUnit),hint:t(i.wordDecision.quantity.hint),wrong:t(i.wordDecision.quantity.wrong)}}:{}),...(i.wordDecision.recordSelection?{recordSelection:{...i.wordDecision.recordSelection,...(i.wordDecision.recordSelection.quote?{quote:t(i.wordDecision.recordSelection.quote)}:{}),title:t(i.wordDecision.recordSelection.title),prompt:t(i.wordDecision.recordSelection.prompt),hint:t(i.wordDecision.recordSelection.hint),wrong:t(i.wordDecision.recordSelection.wrong),rows:i.wordDecision.recordSelection.rows.map(row=>({...row,label:t(row.label),text:t(row.text)}))}}:{}),...(i.wordDecision.clock?{clock:{...i.wordDecision.clock,title:t(i.wordDecision.clock.title),days:i.wordDecision.clock.days.map(t) as [string,string],hint:t(i.wordDecision.clock.hint),wrong:t(i.wordDecision.clock.wrong)}}:{}),...(i.wordDecision.recordPaths?{recordPaths:i.wordDecision.recordPaths.map(p=>({...p,label:t(p.label),steps:p.steps.map(t)}))}:{}),...(i.wordDecision.art?{art:{...i.wordDecision.art,alt:t(i.wordDecision.art.alt),...(i.wordDecision.art.targets?{targets:i.wordDecision.art.targets.map(target=>({...target,label:t(target.label)}))}:{}),...(i.wordDecision.art.evidence?{evidence:i.wordDecision.art.evidence.map(e=>({...e,caption:t(e.caption),regions:e.regions.map(r=>({...r,label:t(r.label)}))}))}:{})}}:{})}}:{}),...(i.sourceSettings?{sourceSettings:{...i.sourceSettings,...(i.sourceSettings.labels?{labels:i.sourceSettings.labels.map(t) as [string,string]}:{}),title:t(i.sourceSettings.title),note:t(i.sourceSettings.note),rows:i.sourceSettings.rows.map(r=>({...r,...(r.route?{route:{from:t(r.route.from),targets:r.route.targets.map(t) as [string,string]}}:{}),label:t(r.label),reason:t(r.reason),wrong:t(r.wrong)}))}}:{}),...(i.sourceRecall?{sourceRecall:{...i.sourceRecall,title:t(i.sourceRecall.title),note:t(i.sourceRecall.note),words:i.sourceRecall.words.map(w=>({...w,cue:t(w.cue),answer:t(w.answer)}))}}:{}),...(i.sourceGap?{sourceGap:{...i.sourceGap,...(i.sourceGap.locationMap?{locationMap:{anchor:t(i.sourceGap.locationMap.anchor),marker:t(i.sourceGap.locationMap.marker)}}:{}),before:t(i.sourceGap.before),after:t(i.sourceGap.after),options:i.sourceGap.options.map(o=>({...o,text:t(o.text),reason:t(o.reason)}))}}:{}),...(i.calculation?{calculation:{...i.calculation,label:t(i.calculation.label),hint:t(i.calculation.hint),wrong:t(i.calculation.wrong)}}:{}),...(i.sourceArt?{sourceArt:{...i.sourceArt,alt:t(i.sourceArt.alt),choices:i.sourceArt.choices.map(c=>({...c,label:t(c.label),...(c.caption?{caption:t(c.caption)}:{})}))}}:{}),...(i.sourceTitle?{sourceTitle:t(i.sourceTitle)}:{}),...(i.evidenceLabels?{evidenceLabels:i.evidenceLabels.map(t)}:{}),...(i.sourceOrderLabels?{sourceOrderLabels:i.sourceOrderLabels.map(t)}:{}),label:t(i.label),prompt:t(i.prompt),answer:t(i.answer),reason:t(i.reason),hint:w.kind==='word-use'&&!i.wordDecision?`需要 ${t(i.answer).length} 个字符；首字母是 ${t(i.answer)[0]}。`:t(i.hint),...(i.usage?{usage:{...i.usage,left:t(i.usage.left),right:t(i.usage.right),object:t(i.usage.object),caption:t(i.usage.caption),alternatives:Object.fromEntries(Object.entries(i.usage.alternatives).map(([key,value])=>[t(key),value]))}}:{}),...(i.before!==undefined?{before:t(i.before)}:{}),...(i.after!==undefined?{after:t(i.after)}:{}),...(i.material?{material:t(i.material)}:{}),...(i.meaning?{meaning:t(i.meaning)}:{}),options:i.options?.map(o=>({...o,text:t(o.text),reason:t(o.reason)}))}))}
}
export function workshopProblems(w:LessonWorkshop):string[]{
 const errors:string[]=[]
 if(w.transfer){errors.push(...questionProblems(w.transfer,'individualTransfer'));if(w.transfer.source?.kind!=='original'||w.transfer.review!=='draft')errors.push('Individual transfer must be original draft')}
 for(const c of w.conditions??[]){if(c.world.layout!==undefined&&c.world.layout!=='stacked')errors.push('Invalid world layout');const bridge=c.world.verbBridge;if(bridge&&(c.input||!c.choices||typeof bridge.verb!=='string'||!(/^[a-z]+$/).test(bridge.verb)||typeof bridge.object!=='string'||!bridge.object.trim()||typeof bridge.objectLabel!=='string'||!bridge.objectLabel.trim()||!Array.isArray(bridge.options)||bridge.options.length!==c.choices.length||bridge.options.some(o=>!o||typeof o.expression!=='string')||new Set(bridge.options.map(o=>o.expression)).size!==bridge.options.length||bridge.options.some(o=>typeof o.link!=='string'||(o.link!==''&&!(/^[a-z]+$/).test(o.link))||o.expression!==bridge.verb+(o.link?' '+o.link:'')||!c.choices!.includes(o.expression))))errors.push('Invalid verb bridge');const album=c.world.albums;if(album&&(!Array.isArray(album.owners)||album.owners.length!==2||album.owners.some(n=>typeof n!=='string'||!n.trim())||new Set(album.owners).size!==2||album.sharedId===album.separateId||!c.world.records||c.world.records.options.length!==2||[album.sharedId,album.separateId].some(id=>!c.world.records!.options.some(r=>r.id===id))))errors.push('Invalid album ownership');if((c.caseSensitive!==undefined&&(typeof c.caseSensitive!=='boolean'||!c.input))||(c.initial!==undefined&&(!c.input||c.tiles||typeof c.initial!=='string'||c.initial.length>120)))errors.push('Invalid typed draft');if(c.world.connector!==undefined&&(typeof c.world.connector!=='string'||!c.world.connector.trim()||c.world.connector.length>12))errors.push('Invalid relationship label');if(c.tileMode!==undefined&&(c.tileMode!=='morpheme'||!c.tiles))errors.push('Invalid tile mode');if(c.tiles){const canBuild=(value:string)=>tileIdsForText(c.tiles!.map(t=>normalizedAnswer(t,!!c.caseSensitive)),normalizedAnswer(value,!!c.caseSensitive),c.tileMode??'words')!==undefined;if(!c.input||c.tiles.length<2||c.tiles.length>24||c.tiles.some(t=>!t.trim()||/\s/.test(t)||t.length>60)||[c.target,...c.accepted??[],...c.choices??[]].some(value=>!canBuild(value)))errors.push('Invalid clause tile bank')}if(c.accepted&&(!c.input||!c.accepted.length||c.accepted.some(a=>!a.trim())||new Set([c.target,...c.accepted].map(a=>normalizedAnswer(a,!!c.caseSensitive))).size!==c.accepted.length+1))errors.push('Invalid typed alternatives');const scope=c.world.selection;if(scope&&((scope.mode!==undefined&&!['words','redact','fields'].includes(scope.mode))||(scope.mode==='words'&&c.world.cells.some(cell=>!cell.label.trim()||/\s/.test(cell.label)||cell.label.length>40))||!scope.prompt||!scope.reason||!Array.isArray(scope.ids)||(!scope.ids.length&&scope.mode!=='redact')||new Set(scope.ids).size!==scope.ids.length||scope.ids.some(id=>!c.world.cells.some(cell=>cell.id===id))||c.world.cells.some(cell=>!cell.id)||new Set(c.world.cells.map(cell=>cell.id)).size!==c.world.cells.length))errors.push('Invalid comparison scope');if(!validRedaction(w,c))errors.push('Invalid redaction preview');if(scope?.mode==='fields'&&(w.kind!=='transform'||c.world.kind!=='logic'||c.world.cells.some(cell=>!cell.label.trim()||!cell.detail?.trim())))errors.push('Invalid condition fields');const r=c.world.records;if(c.world.cells.some(cell=>cell.label==='@outcome')&&(!r||r.options.some(o=>!o.outcome)))errors.push('Missing outcome for a changing condition');if(r&&((r.assetRoot!==undefined&&(r.assetRoot!=='illustrations'||!r.asset))||(r.emptyLabel!==undefined&&(typeof r.emptyLabel!=='string'||!r.emptyLabel.trim()||r.emptyLabel.length>80))||(r.emptyOutcome!==undefined&&(typeof r.emptyOutcome!=='string'||!r.emptyOutcome.trim()||r.emptyOutcome.length>80))||(r.overlay&&(!r.asset||!r.overlay.text||![r.overlay.left,r.overlay.top,r.overlay.width].every(Number.isFinite)||r.overlay.left<0||r.overlay.top<0||r.overlay.top>95||r.overlay.width<=0||r.overlay.left+r.overlay.width>100))||(r.artChoices&&(!r.asset||r.artChoices.length!==2||new Set(r.artChoices).size!==2||r.artChoices.some(id=>!r.options.some(o=>o.id===id))))||!r.title||r.options.length<2||new Set(r.options.map(o=>o.id)).size!==r.options.length||!r.options.some(o=>o.id===r.answer)||r.options.some(o=>!o.id||!o.label||!o.text||!o.reason||!Number.isFinite(o.value)||(c.world.kind==='count'&&c.world.cells.some(cell=>cell.label==='@record')?(!Number.isInteger(o.value)||o.value<0||o.value>8||o.endValue!==undefined):(o.value<5||o.value>95||(o.endValue!==undefined&&(!Number.isFinite(o.endValue)||o.endValue<o.value||o.endValue>95)))))||(r.asset&&(!/^[a-z0-9-]+$/.test(r.asset)||!r.alt))))errors.push('Invalid event records')}
 for(const c of w.conditions??[]){const scene=c.world.scene;if(c.world.kind==='people-scene'&&!scene)errors.push('Missing scene');if(!scene)continue;if(!Array.isArray(scene.people)||!Array.isArray(scene.subjects)||!Array.isArray(scene.listeners)||scene.people.some(p=>!p||typeof p!=='object')){errors.push('Invalid scene shape');continue}const ids=scene.people.map(p=>p.id);if((scene.assetRoot!==undefined&&scene.assetRoot!=='illustrations')||!/^[a-z0-9-]+$/.test(scene.asset)||!scene.alt||!scene.subjectReason||!scene.subjects.length||new Set(ids).size!==ids.length||(scene.speaker!==undefined&&!ids.includes(scene.speaker))||(scene.speaker===undefined&&scene.listeners.length>0)||[...scene.listeners,...scene.subjects].some(id=>!ids.includes(id))||new Set(scene.subjects).size!==scene.subjects.length||scene.people.some(p=>!p.name||!p.description||!/^[a-z][a-z0-9-]*$/.test(p.id)||!Number.isFinite(p.left)||!Number.isFinite(p.width)||p.left<0||p.width<=0||p.left+p.width>100))errors.push('Invalid scene referents or layout')}

 if(w.applicationStyle!==undefined&&w.applicationStyle!=='cards')errors.push('Invalid application style')
 if(!w.title||!w.instruction||!w.items.length)errors.push('Missing workshop task')
 if(w.kind==='transform'){
  if(!w.conditions||w.conditions.length<2||!w.choices||w.choices.length<2)errors.push('Missing contrasting conditions')
  if(new Set(w.conditions?.map(c=>c.before+c.target+c.after)).size!==w.conditions?.length)errors.push('Conditions repeat the same sentence')
  if(new Set(w.conditions?.map(c=>JSON.stringify(c.world))).size!==w.conditions?.length)errors.push('Conditions repeat the same world')
  for(const c of w.conditions??[])if(!c.label||!c.target||!c.reason||!c.world.caption||!c.world.cells.length||!w.choices?.includes(c.target)||(!!c.choices&&(!c.choices.includes(c.target)||c.choices.length<2)))errors.push('Incomplete changing condition')
 }
 for(const i of w.items){
  if(i.ownForms!==undefined&&(w.kind!=='word-use'||!Array.isArray(i.ownForms)||i.ownForms.length<2||i.ownForms.length>8||i.ownForms.some(form=>typeof form!=='string'||form.length>60||!/^[a-z]+(?:[-'][a-z]+)*$/.test(form))||new Set(i.ownForms).size!==i.ownForms.length||typeof i.answer!=='string'||!i.ownForms.includes(normalizedAnswer(i.answer))))errors.push('Invalid own-use word forms')
  const decision=i.wordDecision
  if(decision!==undefined&&(w.kind!=='word-use'||!decision||typeof decision.prompt!=='string'||!decision.prompt.trim()||decision.prompt!==decision.prompt.trim()||decision.prompt.length>140||!Array.isArray(i.options)||i.options.length<2||i.options.length>4||i.options.filter(o=>o.correct===true).length!==1||new Set(i.options.map(o=>o.id)).size!==i.options.length||new Set(i.options.map(o=>o.text)).size!==i.options.length||i.options.some(o=>typeof o.id!=='string'||!(/^[a-z][a-z0-9-]*$/).test(o.id)||typeof o.correct!=='boolean'||[o.text,o.reason].some(t=>typeof t!=='string'||!t.trim()||t!==t.trim()))||(decision.art!==undefined&&(!decision.art||(decision.art.assetRoot!==undefined&&!['assets','illustrations','illustrations-2','illustrations-3'].includes(decision.art.assetRoot))||(decision.art.format!==undefined&&!['jpg','png'].includes(decision.art.format))||typeof decision.art.asset!=='string'||!(/^[a-z0-9-]+$/).test(decision.art.asset)||typeof decision.art.alt!=='string'||!decision.art.alt.trim()))))errors.push('Invalid word decision')
  if(decision?.art?.pictureOnly!==undefined&&(decision.art.pictureOnly!==true||decision.meaningFromRecords||decision.recordPaths||!decision.art.targets||decision.art.targets.length!==i.options?.length||(i.options??[]).some(o=>!decision.art!.targets!.some(t=>t.option===o.id))))errors.push('Invalid picture-only decision')
  if(decision?.meaningFromRecords!==undefined&&(decision.meaningFromRecords!==true||!decision.recordSelection))errors.push('Invalid record meaning decision')
  if(decision?.clock!==undefined&&(w.kind!=='word-use'||!validWordClock(decision.clock)))errors.push('Invalid word clock')
  if(decision?.recordSelection!==undefined&&(w.kind!=='word-use'||!validWordRecordSelection(decision.recordSelection)))errors.push('Invalid word record selection')
  if(decision?.quantity!==undefined&&(w.kind!=='word-use'||!validWordQuantity(decision.quantity)))errors.push('Invalid word quantity')
  if(decision?.ruler!==undefined&&(w.kind!=='word-use'||!validWordRuler(decision.ruler)))errors.push('Invalid word ruler')
  if(decision?.climate!==undefined&&(w.kind!=='word-use'||!validWordClimate(decision.climate)))errors.push('Invalid word climate')
  if(decision?.until!==undefined&&(w.kind!=='word-use'||!validWordUntil(decision.until)))errors.push('Invalid word until')
  if(decision?.dailyWalk!==undefined&&(w.kind!=='word-use'||!validWordDailyWalk(decision.dailyWalk)))errors.push('Invalid daily walking week')
  if(decision?.sources!==undefined){const text=(s:unknown,max:number)=>typeof s==='string'&&!!s.trim()&&s===s.trim()&&s.length<=max,source=decision.sources;if(w.kind!=='word-use'||decision.meaningFromRecords||decision.art?.pictureOnly||!source||!text(source.context,140)||!Array.isArray(source.cards)||source.cards.length<2||source.cards.length>3||source.cards.length!==i.options?.length||new Set(source.cards.map(c=>c?.option)).size!==source.cards.length||source.cards.some(c=>!c||!i.options?.some(o=>o.id===c.option)||!text(c.title,16)||!text(c.publisher,70)||!text(c.area,40)||!text(c.validFor,70)))errors.push('Invalid word source cards')}
  if(decision?.phoneMode!==undefined&&(w.kind!=='word-use'||!validWordPhoneMode(decision.phoneMode)||decision.recordSelection||decision.printPages||decision.art?.pictureOnly))errors.push('Invalid mobile mode task')
  if(decision?.printPages!==undefined&&(w.kind!=='word-use'||!validWordPrintPages(decision.printPages)))errors.push('Invalid print page selection')
  if(decision?.reportedChange!==undefined&&(w.kind!=='word-use'||!validWordReportedChange(decision.reportedChange)))errors.push('Invalid reported word change')
  if(decision?.chance!==undefined&&(w.kind!=='word-use'||!validWordChance(decision.chance)))errors.push('Invalid opportunity allocator')
  if(decision?.boat!==undefined&&(w.kind!=='word-use'||!validWordBoat(decision.boat)))errors.push('Invalid word boat')
  if(decision?.shift!==undefined&&(w.kind!=='word-use'||!validWordFeelingShift(decision.shift)))errors.push('Invalid word feeling shift')
  if(decision?.provision!==undefined&&(w.kind!=='word-use'||!validWordProvision(decision.provision)))errors.push('Invalid word provision')
  if(decision?.thermal!==undefined&&(w.kind!=='word-use'||!validWordThermal(decision.thermal)))errors.push('Invalid word thermal')
  if(decision?.daylight!==undefined&&(w.kind!=='word-use'||!validWordDaylight(decision.daylight)))errors.push('Invalid word daylight')
  if(decision?.weather!==undefined&&(w.kind!=='word-use'||!validWordWeather(decision.weather)))errors.push('Invalid word weather')
  if(decision?.door!==undefined&&(w.kind!=='word-use'||!validWordDoor(decision.door)))errors.push('Invalid word door')
  if(decision?.rotation!==undefined&&(w.kind!=='word-use'||!validWordRotation(decision.rotation)))errors.push('Invalid word rotation')
  if(decision?.fraction!==undefined&&(w.kind!=='word-use'||!validWordFraction(decision.fraction)))errors.push('Invalid word fraction')
  const paths=decision?.recordPaths
  const pathText=(x:unknown,max:number)=>typeof x==='string'&&!!x.trim()&&x===x.trim()&&x.length<=max
  if(paths!==undefined&&(w.kind!=='word-use'||!Array.isArray(paths)||paths.length<1||paths.length>3||new Set(paths.map(p=>p?.id)).size!==paths.length||paths.some(p=>!p||typeof p.id!=='string'||!/^[a-z][a-z0-9-]{0,39}$/.test(p.id)||!pathText(p.label,40)||!Array.isArray(p.steps)||p.steps.length<2||p.steps.length>4||p.steps.some(step=>!pathText(step,60)))))errors.push('Invalid word record paths')
  const targets=decision?.art?.targets
  if(targets!==undefined&&(w.kind!=='word-use'||!Array.isArray(targets)||targets.length<2||targets.length>4||targets.length!==i.options?.length||new Set(targets.map(t=>t?.id)).size!==targets.length||new Set(targets.map(t=>t?.option)).size!==targets.length||targets.some(t=>!t||typeof t.id!=='string'||!/^[a-z][a-z0-9-]{0,39}$/.test(t.id)||!i.options?.some(o=>o.id===t.option)||!pathText(t.label,30)||(t.labelPosition!==undefined&&t.labelPosition!=='top'&&t.labelPosition!=='bottom')||[t.left,t.top,t.width,t.height].some(v=>!Number.isFinite(v))||t.left<0||t.top<0||t.width<12||t.height<12||t.left+t.width>100||t.top+t.height>100)||targets.some((t,index)=>targets.slice(index+1).some(other=>Math.min(t.left+t.width,other.left+other.width)>Math.max(t.left,other.left)&&Math.min(t.top+t.height,other.top+other.height)>Math.max(t.top,other.top)))))errors.push('Invalid word picture targets')
  const wordEvidence=decision?.art?.evidence
  if(wordEvidence!==undefined&&(!Array.isArray(wordEvidence)||wordEvidence.length!==i.options?.length||new Set(wordEvidence.map(e=>e?.option)).size!==wordEvidence.length||wordEvidence.some(e=>!e||!i.options?.some(o=>o.id===e.option)||typeof e.caption!=='string'||!e.caption.trim()||e.caption!==e.caption.trim()||e.caption.length>100||!Array.isArray(e.regions)||e.regions.length>4||new Set(e.regions.map(r=>r?.id)).size!==e.regions.length||e.regions.some(r=>!r||typeof r.id!=='string'||!/^[a-z][a-z0-9-]*$/.test(r.id)||typeof r.label!=='string'||!r.label.trim()||[r.left,r.top,r.width,r.height].some(v=>!Number.isFinite(v))||r.left<0||r.top<0||r.width<=0||r.height<=0||r.left+r.width>100||r.top+r.height>100))))errors.push('Invalid word picture evidence')
  if(w.kind==='proof'&&(!/^[a-z][a-z0-9-]*$/.test(i.id)||i.options?.some(o=>typeof o.id!=='string'||!/^[a-z][a-z0-9-]*$/.test(o.id))||new Set((i.options??[]).map(o=>o.id)).size!==i.options?.length))errors.push('Invalid persistent proof identifiers')
  const settings=i.sourceSettings
  if(settings&&((settings.labels!==undefined&&(!Array.isArray(settings.labels)||settings.labels.length!==2||new Set(settings.labels).size!==2||settings.labels.some(label=>typeof label!=='string'||!label.trim()||label!==label.trim()||label.length>8)))||(i.evidenceGroups?.length??0)<2||w.kind!=='proof'||i.sourceStyle!=='cards'||i.sourceRecall||i.sourceOrder||i.sourceArt||i.sourceGap||i.calculation||typeof settings.title!=='string'||!settings.title.trim()||typeof settings.note!=='string'||!settings.note.trim()||!Array.isArray(settings.rows)||settings.rows.length<2||settings.rows.length>4||new Set(settings.rows.map(r=>r?.id)).size!==settings.rows.length||settings.rows.some(r=>!r||typeof r.id!=='string'||!/^[a-z][a-z0-9-]*$/.test(r.id)||typeof r.label!=='string'||!r.label.trim()||r.label.length>40||!['on','off'].includes(r.answer)||[r.reason,r.wrong].some(x=>typeof x!=='string'||!x.trim()))))errors.push('Invalid source settings')
  if(Array.isArray(settings?.rows)&&settings.rows.some(row=>row?.route!==undefined&&(row.route===null||typeof row.route!=='object'||settings.pacing!==undefined||typeof row.route.from!=='string'||!row.route.from.trim()||row.route.from!==row.route.from.trim()||row.route.from.length>32||!Array.isArray(row.route.targets)||row.route.targets.length!==2||new Set(row.route.targets).size!==2||row.route.targets.some(target=>typeof target!=='string'||!target.trim()||target!==target.trim()||target.length>28))))errors.push('Invalid source route')
  const pacing=settings?.pacing
  if(pacing!==undefined&&(pacing===null||typeof pacing!=='object'||typeof pacing.paceRow!=='string'||typeof pacing.spaceRow!=='string'||pacing.paceRow===pacing.spaceRow||!Array.isArray(settings?.rows)||![pacing.paceRow,pacing.spaceRow].every(id=>settings!.rows.some(row=>row?.id===id))))errors.push('Invalid pacing diagram')
  const recall=i.sourceRecall
  if(recall&&((i.evidenceGroups?.length??0)<2||i.sourceSettings||w.kind!=='proof'||i.sourceStyle!=='cards'||i.sourceOrder||i.sourceArt||i.sourceGap||i.calculation||typeof recall.title!=='string'||!recall.title.trim()||typeof recall.note!=='string'||!recall.note.trim()||!Array.isArray(recall.words)||recall.words.length<2||recall.words.length>4||new Set(recall.words.map(x=>x?.id)).size!==recall.words.length||recall.words.some(x=>!x||typeof x.id!=='string'||!/^[a-z][a-z0-9-]*$/.test(x.id)||typeof x.cue!=='string'||!x.cue.trim()||x.cue.length>40||typeof x.answer!=='string'||!x.answer.trim()||x.answer!==x.answer.trim()||x.answer.length>40)))errors.push('Invalid recall exercise')
  const gap=i.sourceGap
  if(gap&&(w.kind!=='proof'||i.sourceStyle!=='cards'||i.sourceOrder||i.sourceArt||i.calculation||typeof gap.before!=='string'||!gap.before.trim()||typeof gap.after!=='string'||!gap.after.trim()||!i.material?.includes(gap.before+'____'+gap.after)||typeof gap.answer!=='string'||!Array.isArray(gap.options)||gap.options.length<2||gap.options.length>4||new Set(gap.options.map(o=>o?.id)).size!==gap.options.length||new Set(gap.options.map(o=>o?.text)).size!==gap.options.length||gap.options.some(o=>!o||typeof o.id!=='string'||!(/^[a-z][a-z0-9-]*$/).test(o.id)||typeof o.text!=='string'||!o.text.trim()||o.text!==o.text.trim()||o.text.length>40||typeof o.reason!=='string'||!o.reason.trim())||!gap.options.some(o=>o.id===gap.answer)))errors.push('Invalid context gap')
  const map=gap?.locationMap
  if(map!==undefined&&((i.evidenceGroups?.length??0)<2||!map||typeof map!=='object'||[map.anchor,map.marker].some(x=>typeof x!=='string'||!x.trim()||x!==x.trim()||x.length>16)||map.anchor?.toLowerCase()===map.marker?.toLowerCase()||!Array.isArray(gap?.options)||gap.options.some(o=>typeof o?.text!=='string'||!cardinalDirections.includes(o.text.toLowerCase()))||new Set(gap.options.map(o=>o.text.toLowerCase())).size!==gap.options.length))errors.push('Invalid context location map')
  const calculation=i.calculation
  if(calculation&&(w.kind!=='proof'||i.sourceStyle!=='cards'||i.sourceOrder||i.sourceArt||!['time','minutes','yuan','count'].includes(calculation.kind)||typeof calculation.answer!=='string'||!(calculation.kind==='time'?/^(?:[01]\d|2[0-3]):[0-5]\d$/:/^(?:0|[1-9]\d{0,3})$/).test(calculation.answer)||[calculation.label,calculation.hint,calculation.wrong].some(text=>typeof text!=='string'||!text.trim()||text!==text.trim()||text.length>160)))errors.push('Invalid source calculation')
  if(calculation&&calculation.reduction!==undefined){const r=calculation.reduction;if(!r||typeof r!=='object'||calculation.kind!=='count'||![r.before,r.after].every(n=>Number.isInteger(n)&&n>=0&&n<=9999)||r.after>r.before||calculation.answer!==String(r.before-r.after)||[r.unit,r.beforeLabel,r.afterLabel].some(x=>typeof x!=='string'||!x.trim()||x!==x.trim()||x.length>24)||r.beforeLabel===r.afterLabel)errors.push('Invalid reduction model')}
  if(i.sourceOrder!==undefined&&(w.kind!=='proof'||i.sourceStyle!=='cards'||i.sourceArt||i.evidenceLabels||new Set((i.options??[]).map(o=>o.id)).size!==i.options?.length||new Set((i.options??[]).map(o=>o.text)).size!==i.options?.length||i.options?.some(o=>typeof o.id!=='string'||!(/^[a-z][a-z0-9-]*$/).test(o.id))||!Array.isArray(i.sourceOrder)||i.sourceOrder.length<2||i.sourceOrder.length>4||new Set(i.sourceOrder).size!==i.sourceOrder.length||i.sourceOrder.some(id=>typeof id!=='string'||!(/^[a-z][a-z0-9-]*$/).test(id)||!i.options?.some(o=>o.id===id&&o.correct))||i.options?.filter(o=>o.correct).length!==i.sourceOrder.length||i.evidenceGroups?.length!==i.sourceOrder.length||i.evidenceGroups.some((g,n)=>g.length!==1||g[0]!==i.sourceOrder![n])))errors.push('Invalid source order')
  if(i.sourceOrderLabels!==undefined&&(!i.sourceOrder||!Array.isArray(i.sourceOrderLabels)||i.sourceOrderLabels.length!==i.sourceOrder.length||i.sourceOrderLabels.some(label=>typeof label!=='string'||!label.trim()||label!==label.trim()||label.length>24)||new Set(i.sourceOrderLabels).size!==i.sourceOrderLabels.length))errors.push('Invalid named order slots')
  if(i.evidenceLabels!==undefined&&(w.kind!=='proof'||i.sourceStyle!=='cards'||!Array.isArray(i.evidenceLabels)||i.evidenceLabels.length<2||i.evidenceLabels.length>4||i.evidenceLabels.length!==i.evidenceGroups?.length||i.evidenceLabels.some(label=>typeof label!=='string'||!label.trim()||label!==label.trim()||label.length>24)||new Set(i.evidenceLabels).size!==i.evidenceLabels.length))errors.push('Invalid named evidence slots')
  if(i.sourceArt&&(i.sourceStyle!=='cards'||(i.sourceArt.assetRoot!==undefined&&!['assets','illustrations','illustrations-2'].includes(i.sourceArt.assetRoot))||(i.sourceArt.layout!==undefined&&i.sourceArt.layout!=='repeat')||!(/^[a-z0-9-]+$/).test(i.sourceArt.asset)||!i.sourceArt.alt?.trim()||!Array.isArray(i.sourceArt.choices)||i.sourceArt.choices.length!==2||new Set(i.sourceArt.choices.map(c=>c.id)).size!==2||i.sourceArt.choices.some(c=>!c.label?.trim()||!i.options?.some(o=>o.id===c.id)||(i.sourceArt!.layout==='repeat'?(typeof c.caption!=='string'||!c.caption.trim()||c.caption.length>80||c.label.length>24):c.caption!==undefined))))errors.push('Invalid source illustration');if(i.sourceStyle!==undefined&&(i.sourceStyle!=='cards'||w.kind!=='proof'||!i.sourceTitle?.trim()||!i.material||!i.options||i.options.length<2||i.options.length>6||i.options.some(o=>!i.material!.includes(o.text))))errors.push('Source cards must quote the complete material');if(w.kind==='proof'&&(!i.evidenceGroups?.length||i.evidenceGroups.some(g=>!g.length||g.some(id=>!i.options?.some(o=>o.id===id&&o.correct)))))errors.push('Invalid required evidence groups');if(!i.id||!i.label||!i.prompt)errors.push('Missing item task');if(w.kind==='word-use'&&(!i.answer||!i.meaning||!i.material))errors.push('Missing contextual word use');if((w.kind==='proof'||w.kind==='sound-map')&&(!i.options?.some(o=>o.correct)||!i.options.some(o=>!o.correct)||i.options.some(o=>!o.text||!o.reason)))errors.push('Missing evidence or specific feedback')}
 return errors
}
