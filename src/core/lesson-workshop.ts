import type {TeachingProgress} from './lesson-teaching'
import {wordCount,normalizedAnswer} from './answers'
import {validComposeBrief,composeBriefKey,composeBriefMatches,composeBriefView,changeComposeBrief} from './compose-brief'
import type {ComposeBrief} from './compose-brief'
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
import {validWordNameGroups,wordNameGroupsKey,wordNameGroupsView,changeNameGroups,nameGroupsMatch as selectedNameGroupsMatch} from './word-name-groups'
import type {WordNameGroups,WordNameGroupsView} from './word-name-groups'
import {validWordOfflinePage,wordOfflinePageKey,wordOfflinePageView,changeOfflinePage,offlinePageMatch as selectedOfflinePageMatch} from './word-offline-page'
import type {WordOfflinePage,WordOfflinePageView} from './word-offline-page'
import {validWordFileDesk,wordFileDeskKey,wordFileDeskView,changeFileDesk,fileDeskMatch as selectedFileDeskMatch} from './word-file-desk'
import type {WordFileDesk,WordFileDeskView} from './word-file-desk'
import {validWordTitleArrow,wordTitleArrowKey,wordTitleArrowView,changeTitleArrow,titleArrowMatch as selectedTitleArrowMatch} from './word-title-arrow'
import type {WordTitleArrow,WordTitleArrowView} from './word-title-arrow'
import {validWordShelfRoom,wordShelfRoomKey,wordShelfRoomView,changeShelfRoom,shelfRoomMatch as selectedShelfRoomMatch} from './word-shelf-room'
import type {WordShelfRoom,WordShelfRoomView} from './word-shelf-room'
import {validWordQueueMove,wordQueueMoveKey,wordQueueMoveView,changeQueueMove,queueMoveMatch as selectedQueueMoveMatch} from './word-queue-move'
import type {WordQueueMove,WordQueueMoveView} from './word-queue-move'
import {validWordProcessOrder,wordProcessOrderKey,wordProcessOrderView,changeProcessOrder,processOrderMatch as selectedProcessOrderMatch} from './word-process-order'
import type {WordProcessOrder,WordProcessOrderView} from './word-process-order'
import {validWordSustainableAnd,wordSustainableAndKey,wordSustainableAndView,changeSustainableAnd,sustainableAndMatch as selectedSustainableAndMatch} from './word-sustainable-and'
import type {WordSustainableAnd,WordSustainableAndView} from './word-sustainable-and'
import {validWordInlandRoute,wordInlandRouteKey,wordInlandRouteView,changeInlandRoute,inlandRouteMatch as selectedInlandRouteMatch} from './word-inland-route'
import type {WordInlandRoute,WordInlandRouteView} from './word-inland-route'
import {validWordSupportLinks,wordSupportLinksKey,wordSupportLinksView,changeSupportLinks,supportLinksMatch as selectedSupportLinksMatch} from './word-support-links'
import type {WordSupportLinks,WordSupportLinksView} from './word-support-links'
import {validWordMaterialSort,wordMaterialSortKey,wordMaterialSortView,changeMaterialSort,materialSortMatch as selectedMaterialSortMatch} from './word-material-sort'
import type {WordMaterialSort,WordMaterialSortView} from './word-material-sort'
import {validWordCarbonDioxide,wordCarbonDioxideKey,wordCarbonDioxideView,changeCarbonDioxide,carbonDioxideMatch as selectedCarbonDioxideMatch} from './word-carbon-dioxide'
import type {WordCarbonDioxide,WordCarbonDioxideView} from './word-carbon-dioxide'
import {validWordActionCount,wordActionCountKey,wordActionCountView,changeActionCount,actionCountMatch as selectedActionCountMatch} from './word-action-count'
import type {WordActionCount,WordActionCountView} from './word-action-count'
import {validWordDrySeats,wordDrySeatsKey,wordDrySeatsView,changeDrySeats,drySeatsMatch as selectedDrySeatsMatch} from './word-dry-seats'
import type {WordDrySeats,WordDrySeatsView} from './word-dry-seats'
import {validWordRegularRepeat,wordRegularRepeatKey,wordRegularRepeatView,changeRegularRepeat,regularRepeatMatch as selectedRegularRepeatMatch} from './word-regular-repeat'
import type {WordRegularRepeat,WordRegularRepeatView} from './word-regular-repeat'
import {validWordGateCondition,wordGateConditionKey,wordGateConditionView,changeGateCondition,gateConditionMatch as selectedGateConditionMatch} from './word-gate-condition'
import type {WordGateCondition,WordGateConditionView} from './word-gate-condition'
import {validWordExactAlignment,wordExactAlignmentKey,wordExactAlignmentView,changeExactAlignment,exactAlignmentMatch as selectedExactAlignmentMatch} from './word-exact-alignment'
import type {WordExactAlignment,WordExactAlignmentView} from './word-exact-alignment'
import {validWordNearlyFinish,wordNearlyFinishKey,wordNearlyFinishView,changeNearlyFinish,nearlyFinishMatch as selectedNearlyFinishMatch} from './word-nearly-finish'
import type {WordNearlyFinish,WordNearlyFinishView} from './word-nearly-finish'
import {validWordPostRedaction,wordPostRedactionKey,wordPostRedactionView,changePostRedaction,postRedactionMatch as selectedPostRedactionMatch} from './word-post-redaction'
import type {WordPostRedaction,WordPostRedactionView} from './word-post-redaction'
import {validWordEntranceFacing,wordEntranceFacingKey,wordEntranceFacingView,changeEntranceFacing,entranceFacingMatch as selectedEntranceFacingMatch} from './word-entrance-facing'
import type {WordEntranceFacing,WordEntranceFacingView} from './word-entrance-facing'
import {validWordGateFirm,wordGateFirmKey,wordGateFirmView,changeGateFirm,gateFirmMatch as selectedGateFirmMatch} from './word-gate-firm'
import type {WordGateFirm,WordGateFirmView} from './word-gate-firm'
import {validWordFreeSunday,wordFreeSundayKey,wordFreeSundayView,changeFreeSunday,freeSundayMatch as selectedFreeSundayMatch} from './word-free-sunday'
import type {WordFreeSunday,WordFreeSundayView} from './word-free-sunday'
import {validWordLeafSimilar,wordLeafSimilarKey,wordLeafSimilarView,changeLeafSimilar,leafSimilarMatch as selectedLeafSimilarMatch} from './word-leaf-similar'
import type {WordLeafSimilar,WordLeafSimilarView} from './word-leaf-similar'
import {validWordDoughEqual,wordDoughEqualKey,wordDoughEqualView,changeDoughEqual,doughEqualMatch as selectedDoughEqualMatch} from './word-dough-equal'
import type {WordDoughEqual,WordDoughEqualView} from './word-dough-equal'
import {validWordJarChange,wordJarChangeKey,wordJarChangeView,changeJarChange,jarChangeMatch as selectedJarChangeMatch} from './word-jar-change'
import type {WordJarChange,WordJarChangeView} from './word-jar-change'
import {validWordUArticle,wordUArticleKey,wordUArticleView,changeUArticle,uArticleMatch as selectedUArticleMatch} from './word-u-article'
import type {WordUArticle,WordUArticleView} from './word-u-article'
import {validWordBoxFit,wordBoxFitKey,wordBoxFitView,changeBoxFit,boxFitMatch as selectedBoxFitMatch} from './word-box-fit'
import type {WordBoxFit,WordBoxFitView} from './word-box-fit'
import {validWordInterestRoles,wordInterestRolesKey,wordInterestRolesView,changeInterestRoles,interestRolesMatch as selectedInterestRolesMatch} from './word-interest-roles'
import type {WordInterestRoles,WordInterestRolesView} from './word-interest-roles'
import {validWordTornMap,wordTornMapKey,wordTornMapView,changeTornMap,tornMapMatch as selectedTornMapMatch} from './word-torn-map'
import type {WordTornMap,WordTornMapView} from './word-torn-map'
import {validWordGuessScale,wordGuessScaleKey,wordGuessScaleView,changeGuessScale,guessScaleMatch as selectedGuessScaleMatch} from './word-guess-scale'
import type {WordGuessScale,WordGuessScaleView} from './word-guess-scale'
import {validWordRiverImagine,wordRiverImagineKey,wordRiverImagineView,changeRiverImagine,riverImagineMatch as selectedRiverImagineMatch} from './word-river-imagine'
import type {WordRiverImagine,WordRiverImagineView} from './word-river-imagine'
import {validWordCurtainExit,wordCurtainExitKey,wordCurtainExitView,changeCurtainExit,curtainExitMatch as selectedCurtainExitMatch} from './word-curtain-exit'
import type {WordCurtainExit,WordCurtainExitView} from './word-curtain-exit'
import {validWordContributions,wordContributionsKey,wordContributionsView,changeContributions,contributionsMatch as selectedContributionsMatch} from './word-contributions'
import type {WordContributions,WordContributionsView} from './word-contributions'
import {validWordDottedRoute,wordDottedRouteKey,wordDottedRouteView,changeDottedRoute,dottedRouteMatch as selectedDottedRouteMatch} from './word-dotted-route'
import type {WordDottedRoute,WordDottedRouteView} from './word-dotted-route'
import {validWordRouteWeather,wordRouteWeatherKey,wordRouteWeatherView,changeRouteWeather,routeWeatherMatch as selectedRouteWeatherMatch} from './word-route-weather'
import type {WordRouteWeather,WordRouteWeatherView} from './word-route-weather'
import {validWordFlash,wordFlashKey,wordFlashView,changeFlash,flashMatch as selectedFlashMatch} from './word-flash'
import type {WordFlash,WordFlashView} from './word-flash'
import {validWordPreference,wordPreferenceKey,wordPreferenceView,changePreference,preferenceMatch as selectedPreferenceMatch} from './word-preference'
import type {WordPreference,WordPreferenceView} from './word-preference'
import {validWordPattern,wordPatternKey,wordPatternView,changePattern,patternMatch as selectedPatternMatch} from './word-pattern'
import type {WordPattern,WordPatternView} from './word-pattern'
import {validWordCart,wordCartKey,wordCartView,changeCart,cartMatch as selectedCartMatch} from './word-cart'
import type {WordCart,WordCartView} from './word-cart'
import {validWordMolecule,wordMoleculeKey,wordMoleculeView,changeMolecule,moleculeMatch as selectedMoleculeMatch} from './word-molecule'
import type {WordMolecule,WordMoleculeView} from './word-molecule'
import {validWordObserve,wordObserveKey,wordObserveView,changeObserve,observeMatch as selectedObserveMatch} from './word-observe'
import type {WordObserve,WordObserveView} from './word-observe'
import {validWordWaterPair,wordWaterPairKey,wordWaterPairView,changeWaterPair,waterPairMatch as selectedWaterPairMatch} from './word-water-pair'
import type {WordWaterPair,WordWaterPairView} from './word-water-pair'
import {validWordDepthLine,wordDepthLineKey,wordDepthLineView,changeDepthLine,depthLineMatch as selectedDepthLineMatch} from './word-depth-line'
import type {WordDepthLine,WordDepthLineView} from './word-depth-line'
import {validWordRobotWave,wordRobotWaveKey,wordRobotWaveView,changeRobotWave,robotWaveMatch as selectedRobotWaveMatch} from './word-robot-wave'
import type {WordRobotWave,WordRobotWaveView} from './word-robot-wave'
import {validWordPathSteps,wordPathStepsKey,wordPathStepsView,changePathSteps,pathStepsMatch as selectedPathStepsMatch} from './word-path-steps'
import type {WordPathSteps,WordPathStepsView} from './word-path-steps'
import {validWordPaperUse,wordPaperUseKey,wordPaperUseView,changePaperUse,paperUseMatch as selectedPaperUseMatch} from './word-paper-use'
import type {WordPaperUse,WordPaperUseView} from './word-paper-use'
import {validWordBusBudget,wordBusBudgetKey,wordBusBudgetView,changeBusBudget,busBudgetMatch as selectedBusBudgetMatch} from './word-bus-budget'
import type {WordBusBudget,WordBusBudgetView} from './word-bus-budget'
import {validWordEachItem,wordEachItemKey,wordEachItemView,changeEachItem,eachItemMatch as selectedEachItemMatch} from './word-each-item'
import type {WordEachItem,WordEachItemView} from './word-each-item'
import {validWordStampPlacement,wordStampPlacementKey,wordStampPlacementView,changeStampPlacement,stampPlacementMatch as selectedStampPlacementMatch} from './word-stamp-placement'
import type {WordStampPlacement,WordStampPlacementView} from './word-stamp-placement'
import {validWordRouteTraffic,wordRouteTrafficKey,wordRouteTrafficView,changeRouteTraffic,routeTrafficMatch as selectedRouteTrafficMatch} from './word-route-traffic'
import type {WordRouteTraffic,WordRouteTrafficView} from './word-route-traffic'
import {validWordWireOrder,wordWireOrderKey,wordWireOrderView,changeWireOrder,wireOrderMatch as selectedWireOrderMatch} from './word-wire-order'
import type {WordWireOrder,WordWireOrderView} from './word-wire-order'
import {validWordShadePanel,wordShadePanelKey,wordShadePanelView,changeShadePanel,shadePanelMatch as selectedShadePanelMatch} from './word-shade-panel'
import type {WordShadePanel,WordShadePanelView} from './word-shade-panel'
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
import {validWordRectangleRatio,wordRectangleRatioKey,wordRectangleRatioView,changeRectangleRatio,rectangleRatioMatch as selectedRectangleRatioMatch} from './word-rectangle-ratio'
import type {WordRectangleRatio,WordRectangleRatioView} from './word-rectangle-ratio'
import {validWordSpotWings,wordSpotWingsKey,wordSpotWingsView,changeSpotWings,spotWingsMatch as selectedSpotWingsMatch} from './word-spot-wings'
import type {WordSpotWings,WordSpotWingsView} from './word-spot-wings'
export interface WordDecision {sustainableAnd?:WordSustainableAnd;inlandRoute?:WordInlandRoute;supportLinks?:WordSupportLinks;materialSort?:WordMaterialSort;carbonDioxide?:WordCarbonDioxide;actionCount?:WordActionCount;drySeats?:WordDrySeats;regularRepeat?:WordRegularRepeat;gateCondition?:WordGateCondition;exactAlignment?:WordExactAlignment;nearlyFinish?:WordNearlyFinish;postRedaction?:WordPostRedaction;entranceFacing?:WordEntranceFacing;gateFirm?:WordGateFirm;freeSunday?:WordFreeSunday;leafSimilar?:WordLeafSimilar;doughEqual?:WordDoughEqual;jarChange?:WordJarChange;uArticle?:WordUArticle;boxFit?:WordBoxFit;interestRoles?:WordInterestRoles;tornMap?:WordTornMap;guessScale?:WordGuessScale;riverImagine?:WordRiverImagine;curtainExit?:WordCurtainExit;contributions?:WordContributions;dottedRoute?:WordDottedRoute;routeWeather?:WordRouteWeather;flash?:WordFlash;preference?:WordPreference;pattern?:WordPattern;cart?:WordCart;molecule?:WordMolecule;observe?:WordObserve;busBudget?:WordBusBudget;stampPlacement?:WordStampPlacement;eachItem?:WordEachItem;routeTraffic?:WordRouteTraffic;paperUse?:WordPaperUse;pathSteps?:WordPathSteps;rectangleRatio?:WordRectangleRatio;spotWings?:WordSpotWings;wireOrder?:WordWireOrder;robotWave?:WordRobotWave;shadePanel?:WordShadePanel;depthLine?:WordDepthLine;waterPair?:WordWaterPair;processOrder?:WordProcessOrder;queueMove?:WordQueueMove;shelfRoom?:WordShelfRoom;fileDesk?:WordFileDesk;titleArrow?:WordTitleArrow;offlinePage?:WordOfflinePage;nameGroups?:WordNameGroups;phoneMode?:WordPhoneMode;printPages?:WordPrintPages;sources?:WordSources;reportedChange?:WordReportedChange;chance?:WordChance;dailyWalk?:WordDailyWalk;boat?:WordBoat;shift?:WordFeelingShift;provision?:WordProvision;until?:WordUntil;thermal?:WordThermal;meaningFromRecords?:true;climate?:WordClimate;daylight?:WordDaylight;weather?:WordWeather;door?:WordDoor;prompt:string;clock?:WordClock;quantity?:WordQuantity;ruler?:WordRuler;rotation?:WordRotation;fraction?:WordFraction;recordSelection?:WordRecordSelection;recordPaths?:WordRecordPath[];art?:{pictureOnly?:true;assetRoot?:'assets'|'illustrations'|'illustrations-2'|'illustrations-3'|'illustrations-4'|'illustrations-5';format?:'jpg'|'png';asset:string;alt:string;targets?:WordPictureTarget[];evidence?:WordEvidence[]}}
export interface ComposeArt {asset:string;assetRoot:'illustrations-5';format:'jpg';alt:string;caption:string;frames?:2|3;frameShape?:'square'|'wide'}
const validComposeArt=(v:unknown):v is ComposeArt=>{if(!v||typeof v!=='object'||Array.isArray(v))return false;const a=v as Record<string,unknown>;return Object.keys(a).every(k=>['asset','assetRoot','format','alt','caption','frames','frameShape'].includes(k))&&typeof a.asset==='string'&&/^[a-z][a-z0-9-]{0,79}$/.test(a.asset)&&a.assetRoot==='illustrations-5'&&a.format==='jpg'&&typeof a.alt==='string'&&!!a.alt.trim()&&a.alt.length<=240&&typeof a.caption==='string'&&!!a.caption.trim()&&a.caption.length<=200&&((a.frames===2&&a.frameShape==='wide')||((a.frames===undefined||a.frames===3)&&(a.frameShape===undefined||(a.frameShape==='square'&&a.frames===3))))}
export interface WorkshopItem {readingPlan?:true;composeOrder?:WordProcessOrder;composeArt?:ComposeArt;composeBrief?:ComposeBrief;ownForms?:string[];wordDecision?:WordDecision;sourceSettings?:SourceSettings;sourceRecall?:RecallExercise;sourceGap?:ContextGap;calculation?:WorkshopCalculation;sourceOrder?:string[];sourceOrderLabels?:string[];sourceArt?:{assetRoot?:'assets'|'illustrations'|'illustrations-2';layout?:'repeat';asset:string;alt:string;choices:{id:string;label:string;caption?:string}[]};sourceStyle?:'cards';sourceTitle?:string;evidenceLabels?:string[];evidenceGroups?:string[][];sound?:'syllables'|'emphasis'|'groups'|'links'|'pitch'|'phoneme';caseSensitive?:boolean;usage?:UsageMap;id:string;label:string;prompt:string;answer:string;reason:string;hint:string;before?:string;after?:string;options?:{id:string;text:string;reason:string;correct:boolean}[];material?:string;meaning?:string}
export interface LessonWorkshop {applicationStyle?:'cards';navigationLabel?:string;kind:'transform'|'word-use'|'proof'|'compose'|'sound-map';title:string;instruction:string;conditions?:LanguageCondition[];items:WorkshopItem[];choices?:string[];applicationIds?:string[];transfer?:Question}
export interface WorkshopView {composeOrder?:WordProcessOrderView;composeFrame:number;composeBrief?:ReturnType<typeof composeBriefView>;wordSustainableAnd?:WordSustainableAndView;wordInlandRoute?:WordInlandRouteView;wordSupportLinks?:WordSupportLinksView;wordMaterialSort?:WordMaterialSortView;wordCarbonDioxide?:WordCarbonDioxideView;wordActionCount?:WordActionCountView;wordDrySeats?:WordDrySeatsView;wordRegularRepeat?:WordRegularRepeatView;wordGateCondition?:WordGateConditionView;wordExactAlignment?:WordExactAlignmentView;wordNearlyFinish?:WordNearlyFinishView;wordPostRedaction?:WordPostRedactionView;wordEntranceFacing?:WordEntranceFacingView;wordGateFirm?:WordGateFirmView;wordFreeSunday?:WordFreeSundayView;wordLeafSimilar?:WordLeafSimilarView;wordDoughEqual?:WordDoughEqualView;wordJarChange?:WordJarChangeView;wordUArticle?:WordUArticleView;wordBoxFit?:WordBoxFitView;wordInterestRoles?:WordInterestRolesView;wordTornMap?:WordTornMapView;wordGuessScale?:WordGuessScaleView;wordRiverImagine?:WordRiverImagineView;wordCurtainExit?:WordCurtainExitView;wordContributions?:WordContributionsView;wordDottedRoute?:WordDottedRouteView;wordRouteWeather?:WordRouteWeatherView;wordFlash?:WordFlashView;wordPreference?:WordPreferenceView;wordPattern?:WordPatternView;wordCart?:WordCartView;wordMolecule?:WordMoleculeView;wordObserve?:WordObserveView;wordBusBudget?:WordBusBudgetView;wordStampPlacement?:WordStampPlacementView;wordEachItem?:WordEachItemView;wordRouteTraffic?:WordRouteTrafficView;wordPaperUse?:WordPaperUseView;wordPathSteps?:WordPathStepsView;wordRectangleRatio?:WordRectangleRatioView;wordSpotWings?:WordSpotWingsView;wordWireOrder?:WordWireOrderView;wordRobotWave?:WordRobotWaveView;wordShadePanel?:WordShadePanelView;wordDepthLine?:WordDepthLineView;wordWaterPair?:WordWaterPairView;wordProcessOrder?:WordProcessOrderView;wordQueueMove?:WordQueueMoveView;wordShelfRoom?:WordShelfRoomView;wordFileDesk?:WordFileDeskView;wordTitleArrow?:WordTitleArrowView;wordOfflinePage?:WordOfflinePageView;wordNameGroups?:WordNameGroupsView;wordPhoneMode?:WordPhoneModeView;wordPrintPages?:WordPrintPagesView;wordSources?:{context:string;cards:(WordSourceCard&{text:string;selected:boolean;accepted:boolean;wrong:boolean})[]};wordReportedChange?:WordReportedChangeView;wordChance?:WordChanceView;wordDailyWalk?:WordDailyWalkView;wordPictureOnly?:boolean;wordBoat?:WordBoatView;wordShift?:WordFeelingShiftView;wordProvision?:WordProvisionView;wordUntil?:WordUntilView;wordThermal?:WordThermalView;wordClimate?:WordClimateView;wordDaylight?:WordDaylightView;wordWeather?:WordWeatherView;wordDoor?:WordDoorView;wordFraction?:WordFractionView;wordRotation?:WordRotationView;wordRuler?:WordRulerView;wordQuantity?:WordQuantityView;wordRecordSelection?:WordRecordSelectionView;wordClock?:WordClockView;wordPictureTargets:{id:string;option:string;label:string;selected:boolean;accepted?:boolean;wrong?:boolean;style:string}[];wordRecordPaths:WordRecordPath[];wordTailOnly:boolean;wordEvidence?:{caption:string;regions:{id:string;label:string;style:string}[]};ownMissing:boolean;reduction?:{unit:string;ready:boolean;rows:{id:string;label:string;value:string;width:number}[]};settings?:{pacing?:PacingPreview;labels:[string,string];title:string;note:string;checked:boolean;correct:boolean;rows:{id:string;label:string;value:string;labels:[string,string];route?:{from:string;target:string};status:string;correct:boolean;feedback:string}[]};recall?:{title:string;note:string;phase:string;ready:boolean;rows:{id:string;cue:string;answer:string;attempt:string;same:boolean}[]};gap?:{map?:LocationPreview;before:string;after:string;text:string;selected:string;checked:boolean;correct:boolean;feedback:string;options:{id:string;text:string;selected:boolean}[]};orderSlots:{id:string;text:string;label:string;wrong:boolean;filled:boolean}[];redaction?:{asset:string;alt:string;regions:{id:string;text:string;label:string;detail:string;masked:boolean;wrong:boolean;style:string}[]};proofArtChoices:{id:string;label:string;caption?:string;selected:boolean;accepted:boolean;wrong:boolean}[];proofReady:boolean;orderBank:{id:string;text:string;used:boolean}[];orderAnswer:{id:string;text:string;wrong:boolean}[];selectionText:string;morphemeTiles:boolean;verbBridge?:{verb:string;object:string;objectLabel:string;known:boolean;link:string};albumOwnership?:AlbumOwnership;albumMode:"shared"|"separate"|"";albumItems:{label:string}[];keepEnding:boolean;tileBank:{id:string;text:string;used:boolean}[];tileAnswer:{id:string;text:string}[];referenceStyle:string;membersCorrect:boolean;records?:EventRecords;recordOptions:(EventRecords["options"][number]&{selected:boolean;wrong:boolean})[];recordArtChoices:(EventRecords["options"][number]&{selected:boolean;wrong:boolean;style:string})[];recordCorrect:boolean;hasScene:boolean;navigationLabel:string;scene?:PeopleScene;scenePeople:(ScenePerson&{selected:boolean;wrong:boolean;speaking:boolean;listening:boolean;style:string})[];sceneSubjectsCorrect:boolean;expressionWrong:boolean;proofSteps:{id:string;label:string;accepted:boolean}[];proofRequired:number;proofCollected:{id:string;text:string}[];proofAccepted:boolean;soundUnits:{text:string;emphasis:boolean}[];soundMode:string;pitch:string;usageDirection:string;doneCount:number;kind:LessonWorkshop['kind'];title:string;instruction:string;index:number;total:number;tabs:{id:string;label:string;done:boolean}[];item:WorkshopItem;condition?:LanguageCondition;cells:(WorldCell&{selected:boolean;wrong:boolean;copies:number[];style:string;rangeStyle:string})[];choices:{id:string;text:string;selected:boolean;accepted:boolean}[];selected:string;input:string;own:string;attempted:boolean;correct:boolean;feedback:string;revealed:boolean;complete:boolean;allDone:boolean;draftWords:number;sourceOpen:boolean;worldClass:string}
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
const shadePanelMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.shadePanel||selectedShadePanelMatch(p.answers[wordShadePanelKey(item.id)]??'')
const rectangleRatioMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.rectangleRatio||selectedRectangleRatioMatch(p.answers[wordRectangleRatioKey(item.id)]??'')
const spotWingsMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.spotWings||selectedSpotWingsMatch(p.answers[wordSpotWingsKey(item.id)]??'')
const wireOrderMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.wireOrder||selectedWireOrderMatch(p.answers[wordWireOrderKey(item.id)]??'')
const routeTrafficMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.routeTraffic||selectedRouteTrafficMatch(p.answers[wordRouteTrafficKey(item.id)]??'')
const stampPlacementMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.stampPlacement||selectedStampPlacementMatch(p.answers[wordStampPlacementKey(item.id)]??'')
const eachItemMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.eachItem||selectedEachItemMatch(p.answers[wordEachItemKey(item.id)]??'')
const busBudgetMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.busBudget||selectedBusBudgetMatch(item.wordDecision.busBudget,p.answers[wordBusBudgetKey(item.id)]??'')
const paperUseMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.paperUse||selectedPaperUseMatch(p.answers[wordPaperUseKey(item.id)]??'')
const pathStepsMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.pathSteps||selectedPathStepsMatch(p.answers[wordPathStepsKey(item.id)]??'')
const robotWaveMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.robotWave||selectedRobotWaveMatch(p.answers[wordRobotWaveKey(item.id)]??'')
const depthLineMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.depthLine||selectedDepthLineMatch(p.answers[wordDepthLineKey(item.id)]??'')
const waterPairMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.waterPair||selectedWaterPairMatch(p.answers[wordWaterPairKey(item.id)]??'')
const observeMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.observe||selectedObserveMatch(p.answers[wordObserveKey(item.id)]??'')
const moleculeMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.molecule||selectedMoleculeMatch(p.answers[wordMoleculeKey(item.id)]??'')
const cartMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.cart||selectedCartMatch(p.answers[wordCartKey(item.id)]??'')
const patternMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.pattern||selectedPatternMatch(p.answers[wordPatternKey(item.id)]??'')
const preferenceMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.preference||selectedPreferenceMatch(p.answers[wordPreferenceKey(item.id)]??'')
const flashMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.flash||selectedFlashMatch(p.answers[wordFlashKey(item.id)]??'')
const routeWeatherMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.routeWeather||selectedRouteWeatherMatch(p.answers[wordRouteWeatherKey(item.id)]??'')
const dottedRouteMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.dottedRoute||selectedDottedRouteMatch(p.answers[wordDottedRouteKey(item.id)]??'')
const contributionsMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.contributions||selectedContributionsMatch(p.answers[wordContributionsKey(item.id)]??'')
const curtainExitMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.curtainExit||selectedCurtainExitMatch(p.answers[wordCurtainExitKey(item.id)]??'')
const riverImagineMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.riverImagine||selectedRiverImagineMatch(p.answers[wordRiverImagineKey(item.id)]??'')
const guessScaleMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.guessScale||selectedGuessScaleMatch(p.answers[wordGuessScaleKey(item.id)]??'')
const tornMapMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.tornMap||selectedTornMapMatch(p.answers[wordTornMapKey(item.id)]??'')
const interestRolesMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.interestRoles||selectedInterestRolesMatch(p.answers[wordInterestRolesKey(item.id)]??'')
const boxFitMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.boxFit||selectedBoxFitMatch(p.answers[wordBoxFitKey(item.id)]??'')
const uArticleMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.uArticle||selectedUArticleMatch(p.answers[wordUArticleKey(item.id)]??'')
const jarChangeMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.jarChange||selectedJarChangeMatch(p.answers[wordJarChangeKey(item.id)]??'')
const doughEqualMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.doughEqual||selectedDoughEqualMatch(p.answers[wordDoughEqualKey(item.id)]??'')
const leafSimilarMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.leafSimilar||selectedLeafSimilarMatch(p.answers[wordLeafSimilarKey(item.id)]??'')
const freeSundayMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.freeSunday||selectedFreeSundayMatch(p.answers[wordFreeSundayKey(item.id)]??'')
const gateFirmMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.gateFirm||selectedGateFirmMatch(p.answers[wordGateFirmKey(item.id)]??'')
const entranceFacingMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.entranceFacing||selectedEntranceFacingMatch(p.answers[wordEntranceFacingKey(item.id)]??'')
const postRedactionMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.postRedaction||selectedPostRedactionMatch(p.answers[wordPostRedactionKey(item.id)]??'')
const nearlyFinishMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.nearlyFinish||selectedNearlyFinishMatch(p.answers[wordNearlyFinishKey(item.id)]??'')
const exactAlignmentMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.exactAlignment||selectedExactAlignmentMatch(p.answers[wordExactAlignmentKey(item.id)]??'')
const gateConditionMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.gateCondition||selectedGateConditionMatch(p.answers[wordGateConditionKey(item.id)]??'')
const regularRepeatMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.regularRepeat||selectedRegularRepeatMatch(p.answers[wordRegularRepeatKey(item.id)]??'')
const drySeatsMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.drySeats||selectedDrySeatsMatch(p.answers[wordDrySeatsKey(item.id)]??'')
const actionCountMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.actionCount||selectedActionCountMatch(item.wordDecision.actionCount,p.answers[wordActionCountKey(item.id)]??'')
const carbonDioxideMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.carbonDioxide||selectedCarbonDioxideMatch(p.answers[wordCarbonDioxideKey(item.id)]??'')
const materialSortMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.materialSort||selectedMaterialSortMatch(p.answers[wordMaterialSortKey(item.id)]??'')
const supportLinksMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.supportLinks||selectedSupportLinksMatch(p.answers[wordSupportLinksKey(item.id)]??'')
const inlandRouteMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.inlandRoute||selectedInlandRouteMatch(p.answers[wordInlandRouteKey(item.id)]??'')
const sustainableAndMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.sustainableAnd||selectedSustainableAndMatch(p.answers[wordSustainableAndKey(item.id)]??'')
const processOrderMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.processOrder||selectedProcessOrderMatch(item.wordDecision.processOrder,p.answers[wordProcessOrderKey(item.id)]??'')
const queueMoveMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.queueMove||selectedQueueMoveMatch(p.answers[wordQueueMoveKey(item.id)]??'')
const shelfRoomMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.shelfRoom||selectedShelfRoomMatch(p.answers[wordShelfRoomKey(item.id)]??'')
const fileDeskMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.fileDesk||selectedFileDeskMatch(item.wordDecision.fileDesk,p.answers[wordFileDeskKey(item.id)]??'')
const titleArrowMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.titleArrow||selectedTitleArrowMatch(p.answers[wordTitleArrowKey(item.id)]??'')
const offlinePageMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.offlinePage||selectedOfflinePageMatch(p.answers[wordOfflinePageKey(item.id)]??'')
const nameGroupsMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.nameGroups||selectedNameGroupsMatch(item.wordDecision.nameGroups,p.answers[wordNameGroupsKey(item.id)]??'')
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
const wordDecisionMatches=(item:WorkshopItem,p:TeachingProgress,k:string)=>(!item.wordDecision||(item.wordDecision.meaningFromRecords===true&&!!item.wordDecision.recordSelection)||!!item.options?.some(o=>o.id===p.answers[k]&&o.correct))&&clockMatches(item,p)&&recordsMatch(item,p)&&quantityMatches(item,p)&&rulerMatches(item,p)&&rotationMatches(item,p)&&fractionMatches(item,p)&&doorMatches(item,p)&&weatherMatches(item,p)&&daylightMatches(item,p)&&thermalMatches(item,p)&&provisionMatches(item,p)&&shiftMatches(item,p)&&boatMatches(item,p)&&chanceMatches(item,p)&&printPagesMatch(item,p)&&phoneModeMatch(item,p)&&nameGroupsMatch(item,p)&&offlinePageMatch(item,p)&&fileDeskMatch(item,p)&&shelfRoomMatch(item,p)&&shadePanelMatch(item,p)&&rectangleRatioMatch(item,p)&&spotWingsMatch(item,p)&&wireOrderMatch(item,p)&&routeTrafficMatch(item,p)&&stampPlacementMatch(item,p)&&eachItemMatch(item,p)&&busBudgetMatch(item,p)&&paperUseMatch(item,p)&&pathStepsMatch(item,p)&&robotWaveMatch(item,p)&&depthLineMatch(item,p)&&waterPairMatch(item,p)&&observeMatch(item,p)&&moleculeMatch(item,p)&&cartMatch(item,p)&&patternMatch(item,p)&&preferenceMatch(item,p)&&flashMatch(item,p)&&routeWeatherMatch(item,p)&&dottedRouteMatch(item,p)&&contributionsMatch(item,p)&&curtainExitMatch(item,p)&&riverImagineMatch(item,p)&&guessScaleMatch(item,p)&&tornMapMatch(item,p)&&interestRolesMatch(item,p)&&boxFitMatch(item,p)&&uArticleMatch(item,p)&&jarChangeMatch(item,p)&&doughEqualMatch(item,p)&&leafSimilarMatch(item,p)&&freeSundayMatch(item,p)&&gateFirmMatch(item,p)&&entranceFacingMatch(item,p)&&postRedactionMatch(item,p)&&nearlyFinishMatch(item,p)&&exactAlignmentMatch(item,p)&&gateConditionMatch(item,p)&&regularRepeatMatch(item,p)&&drySeatsMatch(item,p)&&actionCountMatch(item,p)&&carbonDioxideMatch(item,p)&&materialSortMatch(item,p)&&supportLinksMatch(item,p)&&inlandRouteMatch(item,p)&&sustainableAndMatch(item,p)&&processOrderMatch(item,p)&&queueMoveMatch(item,p)&&titleArrowMatch(item,p)&&reportedChangeMatches(item,p)&&dailyWalkMatches(item,p)&&untilMatches(item,p)&&climateMatches(item,p)
const briefMatches=(item:WorkshopItem,p:TeachingProgress)=>(!item.composeBrief||composeBriefMatches(item.composeBrief,p.answers[composeBriefKey(item.id)]??''))&&(!item.composeOrder||selectedProcessOrderMatch(item.composeOrder,p.answers['composeOrder-'+item.id]??''))
const composeOrderView=(c:WordProcessOrder,p:TeachingProgress,id:string)=>{const v=wordProcessOrderView(c,p.answers['composeOrder-'+id]??'');return{...v,reading:v.reading.replace('原句','情境')}}
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
 const total=w.conditions?.length??w.items.length,index=indexOf(p,total),condition=w.conditions?.[index],item=w.items[w.kind==='transform'?0:index],k=key(index),tileIds=[...new Set((p.answers[`workshopTiles-${index}`]??'').split('|').filter(id=>/^(0|[1-9][0-9]*)$/.test(id)&&condition?.tiles?.[Number(id)]!==undefined))],selected=condition?.tiles?tileIds.map(id=>condition.tiles![Number(id)]).join(condition?.tileMode==='morpheme'?'':' '):p.answers[k]??condition?.initial??'',input=p.answers[`workshopInput-${index}`]??'',own=p.answers[ownKey(item.id)]??'',attempted=typeof p.checked[k]==='boolean',correct=!!p.checked[k]&&wordDecisionMatches(item,p,k)&&briefMatches(item,p)&&settingsMatch(item,p)&&recallReady(item,p)&&sourceGapMatches(item,p)&&(!item.sourceGap||proofReady(item,p,k))&&sourceOrderMatches(item,p)&&calculationMatches(item,input)&&selectionMatches(w,p,index),complete=!!p.completed.includes(k)&&wordDecisionMatches(item,p,k)&&briefMatches(item,p)&&settingsCompletion(item,p,k)&&recallReady(item,p)&&sourceGapCompletion(item,p,k)&&sourceOrderMatches(item,p)&&calculationMatches(item,input)&&selectionMatches(w,p,index)
 const completedAt=(i:number)=>{const it=w.items[w.kind==='transform'?0:i];return p.completed.includes(key(i))&&wordDecisionMatches(it,p,key(i))&&briefMatches(it,p)&&settingsCompletion(it,p,key(i))&&recallReady(it,p)&&sourceGapCompletion(it,p,key(i))&&sourceOrderMatches(it,p)&&calculationMatches(it,p.answers[`workshopInput-${i}`]??'')&&selectionMatches(w,p,i)}
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
 else if(w.kind==='word-use'&&item.wordDecision?.climate&&!climateMatches(item,p))feedback=item.wordDecision.climate.wrong; else if(w.kind==='word-use'&&item.wordDecision?.until&&!untilMatches(item,p))feedback=item.wordDecision.until.wrong; else if(w.kind==='word-use'&&item.wordDecision?.dailyWalk&&!dailyWalkMatches(item,p))feedback=item.wordDecision.dailyWalk.wrong; else if(w.kind==='word-use'&&item.wordDecision?.reportedChange&&!reportedChangeMatches(item,p))feedback=item.wordDecision.reportedChange.wrong; else if(w.kind==='word-use'&&item.wordDecision?.shadePanel&&!shadePanelMatch(item,p))feedback=item.wordDecision.shadePanel.wrong; else if(w.kind==='word-use'&&item.wordDecision?.rectangleRatio&&!rectangleRatioMatch(item,p))feedback=item.wordDecision.rectangleRatio.wrong; else if(w.kind==='word-use'&&item.wordDecision?.spotWings&&!spotWingsMatch(item,p))feedback=item.wordDecision.spotWings.wrong; else if(w.kind==='word-use'&&item.wordDecision?.wireOrder&&!wireOrderMatch(item,p))feedback=item.wordDecision.wireOrder.wrong; else if(w.kind==='word-use'&&item.wordDecision?.routeTraffic&&!routeTrafficMatch(item,p))feedback=item.wordDecision.routeTraffic.wrong; else if(w.kind==='word-use'&&item.wordDecision?.stampPlacement&&!stampPlacementMatch(item,p))feedback=item.wordDecision.stampPlacement.wrong; else if(w.kind==='word-use'&&item.wordDecision?.eachItem&&!eachItemMatch(item,p))feedback=item.wordDecision.eachItem.wrong; else if(w.kind==='word-use'&&item.wordDecision?.busBudget&&!busBudgetMatch(item,p))feedback=item.wordDecision.busBudget.wrong; else if(w.kind==='word-use'&&item.wordDecision?.paperUse&&!paperUseMatch(item,p))feedback=item.wordDecision.paperUse.wrong; else if(w.kind==='word-use'&&item.wordDecision?.pathSteps&&!pathStepsMatch(item,p))feedback=item.wordDecision.pathSteps.wrong; else if(w.kind==='word-use'&&item.wordDecision?.robotWave&&!robotWaveMatch(item,p))feedback=item.wordDecision.robotWave.wrong; else if(w.kind==='word-use'&&item.wordDecision?.depthLine&&!depthLineMatch(item,p))feedback=item.wordDecision.depthLine.wrong; else if(w.kind==='word-use'&&item.wordDecision?.waterPair&&!waterPairMatch(item,p))feedback=item.wordDecision.waterPair.wrong; else if(w.kind==='word-use'&&item.wordDecision?.observe&&!observeMatch(item,p))feedback=item.wordDecision.observe.wrong; else if(w.kind==='word-use'&&item.wordDecision?.molecule&&!moleculeMatch(item,p))feedback=item.wordDecision.molecule.wrong; else if(w.kind==='word-use'&&item.wordDecision?.cart&&!cartMatch(item,p))feedback=item.wordDecision.cart.wrong; else if(w.kind==='word-use'&&item.wordDecision?.pattern&&!patternMatch(item,p))feedback=item.wordDecision.pattern.wrong; else if(w.kind==='word-use'&&item.wordDecision?.preference&&!preferenceMatch(item,p))feedback=item.wordDecision.preference.wrong; else if(w.kind==='word-use'&&item.wordDecision?.flash&&!flashMatch(item,p))feedback=item.wordDecision.flash.wrong; else if(w.kind==='word-use'&&item.wordDecision?.routeWeather&&!routeWeatherMatch(item,p))feedback=item.wordDecision.routeWeather.wrong; else if(w.kind==='word-use'&&item.wordDecision?.dottedRoute&&!dottedRouteMatch(item,p))feedback=item.wordDecision.dottedRoute.wrong; else if(w.kind==='word-use'&&item.wordDecision?.contributions&&!contributionsMatch(item,p))feedback=item.wordDecision.contributions.wrong; else if(w.kind==='word-use'&&item.wordDecision?.curtainExit&&!curtainExitMatch(item,p))feedback=item.wordDecision.curtainExit.wrong; else if(w.kind==='word-use'&&item.wordDecision?.riverImagine&&!riverImagineMatch(item,p))feedback=item.wordDecision.riverImagine.wrong; else if(w.kind==='word-use'&&item.wordDecision?.guessScale&&!guessScaleMatch(item,p))feedback=item.wordDecision.guessScale.wrong; else if(w.kind==='word-use'&&item.wordDecision?.tornMap&&!tornMapMatch(item,p))feedback=item.wordDecision.tornMap.wrong; else if(w.kind==='word-use'&&item.wordDecision?.interestRoles&&!interestRolesMatch(item,p))feedback=item.wordDecision.interestRoles.wrong; else if(w.kind==='word-use'&&item.wordDecision?.boxFit&&!boxFitMatch(item,p))feedback=item.wordDecision.boxFit.wrong; else if(w.kind==='word-use'&&item.wordDecision?.uArticle&&!uArticleMatch(item,p))feedback=item.wordDecision.uArticle.wrong; else if(w.kind==='word-use'&&item.wordDecision?.jarChange&&!jarChangeMatch(item,p))feedback=item.wordDecision.jarChange.wrong; else if(w.kind==='word-use'&&item.wordDecision?.doughEqual&&!doughEqualMatch(item,p))feedback=item.wordDecision.doughEqual.wrong; else if(w.kind==='word-use'&&item.wordDecision?.leafSimilar&&!leafSimilarMatch(item,p))feedback=item.wordDecision.leafSimilar.wrong; else if(w.kind==='word-use'&&item.wordDecision?.freeSunday&&!freeSundayMatch(item,p))feedback=item.wordDecision.freeSunday.wrong; else if(w.kind==='word-use'&&item.wordDecision?.gateFirm&&!gateFirmMatch(item,p))feedback=item.wordDecision.gateFirm.wrong; else if(w.kind==='word-use'&&item.wordDecision?.entranceFacing&&!entranceFacingMatch(item,p))feedback=item.wordDecision.entranceFacing.wrong; else if(w.kind==='word-use'&&item.wordDecision?.postRedaction&&!postRedactionMatch(item,p))feedback=item.wordDecision.postRedaction.wrong; else if(w.kind==='word-use'&&item.wordDecision?.nearlyFinish&&!nearlyFinishMatch(item,p))feedback=item.wordDecision.nearlyFinish.wrong; else if(w.kind==='word-use'&&item.wordDecision?.exactAlignment&&!exactAlignmentMatch(item,p))feedback=item.wordDecision.exactAlignment.wrong; else if(w.kind==='word-use'&&item.wordDecision?.gateCondition&&!gateConditionMatch(item,p))feedback=item.wordDecision.gateCondition.wrong; else if(w.kind==='word-use'&&item.wordDecision?.regularRepeat&&!regularRepeatMatch(item,p))feedback=item.wordDecision.regularRepeat.wrong; else if(w.kind==='word-use'&&item.wordDecision?.drySeats&&!drySeatsMatch(item,p))feedback=item.wordDecision.drySeats.wrong; else if(w.kind==='word-use'&&item.wordDecision?.actionCount&&!actionCountMatch(item,p))feedback=item.wordDecision.actionCount.wrong; else if(w.kind==='word-use'&&item.wordDecision?.carbonDioxide&&!carbonDioxideMatch(item,p))feedback=item.wordDecision.carbonDioxide.wrong; else if(w.kind==='word-use'&&item.wordDecision?.materialSort&&!materialSortMatch(item,p))feedback=item.wordDecision.materialSort.wrong; else if(w.kind==='word-use'&&item.wordDecision?.supportLinks&&!supportLinksMatch(item,p))feedback=item.wordDecision.supportLinks.wrong; else if(w.kind==='word-use'&&item.wordDecision?.inlandRoute&&!inlandRouteMatch(item,p))feedback=item.wordDecision.inlandRoute.wrong; else if(w.kind==='word-use'&&item.wordDecision?.sustainableAnd&&!sustainableAndMatch(item,p))feedback=item.wordDecision.sustainableAnd.wrong; else if(w.kind==='word-use'&&item.wordDecision?.processOrder&&!processOrderMatch(item,p))feedback=item.wordDecision.processOrder.wrong; else if(w.kind==='word-use'&&item.wordDecision?.queueMove&&!queueMoveMatch(item,p))feedback=item.wordDecision.queueMove.wrong; else if(w.kind==='word-use'&&item.wordDecision?.shelfRoom&&!shelfRoomMatch(item,p))feedback=item.wordDecision.shelfRoom.wrong; else if(w.kind==='word-use'&&item.wordDecision?.fileDesk&&!fileDeskMatch(item,p))feedback=item.wordDecision.fileDesk.wrong; else if(w.kind==='word-use'&&item.wordDecision?.titleArrow&&!titleArrowMatch(item,p))feedback=item.wordDecision.titleArrow.wrong; else if(w.kind==='word-use'&&item.wordDecision?.offlinePage&&!offlinePageMatch(item,p))feedback=item.wordDecision.offlinePage.wrong; else if(w.kind==='word-use'&&item.wordDecision?.nameGroups&&!nameGroupsMatch(item,p))feedback=item.wordDecision.nameGroups.wrong; else if(w.kind==='word-use'&&item.wordDecision?.phoneMode&&!phoneModeMatch(item,p))feedback=item.wordDecision.phoneMode.wrong; else if(w.kind==='word-use'&&item.wordDecision?.printPages&&!printPagesMatch(item,p))feedback=item.wordDecision.printPages.wrong; else if(w.kind==='word-use'&&item.wordDecision?.chance&&!chanceMatches(item,p))feedback=item.wordDecision.chance.wrong; else if(w.kind==='word-use'&&item.wordDecision?.boat&&!boatMatches(item,p))feedback=item.wordDecision.boat.wrong; else if(w.kind==='word-use'&&item.wordDecision?.shift&&!shiftMatches(item,p))feedback=item.wordDecision.shift.wrong; else if(w.kind==='word-use'&&item.wordDecision?.provision&&!provisionMatches(item,p))feedback=item.wordDecision.provision.wrong; else if(w.kind==='word-use'&&item.wordDecision?.thermal&&!thermalMatches(item,p))feedback=item.wordDecision.thermal.wrong; else if(w.kind==='word-use'&&item.wordDecision?.daylight&&!daylightMatches(item,p))feedback=item.wordDecision.daylight.wrong; else if(w.kind==='word-use'&&item.wordDecision?.weather&&!weatherMatches(item,p))feedback=item.wordDecision.weather.wrong; else if(w.kind==='word-use'&&item.wordDecision?.door&&!doorMatches(item,p))feedback=item.wordDecision.door.wrong; else if(w.kind==='word-use'&&item.wordDecision?.rotation&&!rotationMatches(item,p))feedback=item.wordDecision.rotation.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.ruler&&!rulerMatches(item,p))feedback=item.wordDecision.ruler.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.quantity&&!quantityMatches(item,p))feedback=item.wordDecision.quantity.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.recordSelection&&!recordsMatch(item,p))feedback=item.wordDecision.recordSelection.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.clock&&!clockMatches(item,p))feedback=item.wordDecision.clock.wrong;
 else if(w.kind==='word-use'&&item.wordDecision&&!wordDecisionMatches(item,p,k))feedback=item.options?.find(o=>o.id===selected)?.reason??'先选出符合情境的理解，再核对词形。';
 else if(w.kind==='word-use'&&item.usage?.alternatives[normalizedAnswer(input)])feedback=`你输入了 ${input}，图中物品的方向也变了。${item.usage.caption} ${item.reason}`;
 else if(w.kind==='word-use'&&vCaseOnly(item,input))feedback=`词形写对了，但这里要注意大小写：${item.answer}。`;
 else if(w.kind==='word-use'){const n=[...input].findIndex((c,i)=>c.toLocaleLowerCase('en')!==item.answer[i]?.toLocaleLowerCase('en'));feedback=`句中需要表达“${item.meaning}”。${input?`从第 ${n<0?Math.min(input.length,item.answer.length)+1:n+1} 个字符起核对，注意词形和空格。`:'先根据语境写出这个词。'}${item.hint}`}
  else if(w.kind==='compose'&&item.sourceRecall&&!recallReady(item,p))feedback='先遮住词表，逐格留下尝试，再揭开对照。想不起来可以写“不记得”。';
  else if(w.kind==='compose'&&!briefMatches(item,p))feedback=item.composeOrder&&!selectedProcessOrderMatch(item.composeOrder,p.answers['composeOrder-'+item.id]??'')?item.composeOrder.wrong:item.composeBrief?.wrong??'请先完成计划卡。';
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
 return{composeOrder:item.composeOrder?composeOrderView(item.composeOrder,p,item.id):undefined,composeFrame:(item.composeArt?.frames===2||item.composeArt?.frames===3)&&Array.from({length:item.composeArt.frames},(_,i)=>String(i)).includes(p.answers['composeFrame-'+item.id]??'')?Number(p.answers['composeFrame-'+item.id]):0,composeBrief:item.composeBrief?composeBriefView(item.composeBrief,p.answers[composeBriefKey(item.id)]??''):undefined,wordBusBudget:item.wordDecision?.busBudget?wordBusBudgetView(item.wordDecision.busBudget,p.answers[wordBusBudgetKey(item.id)]??''):undefined,wordStampPlacement:item.wordDecision?.stampPlacement?wordStampPlacementView(item.wordDecision.stampPlacement,p.answers[wordStampPlacementKey(item.id)]??''):undefined,wordEachItem:item.wordDecision?.eachItem?wordEachItemView(item.wordDecision.eachItem,p.answers[wordEachItemKey(item.id)]??''):undefined,wordRouteTraffic:item.wordDecision?.routeTraffic?wordRouteTrafficView(item.wordDecision.routeTraffic,p.answers[wordRouteTrafficKey(item.id)]??''):undefined,wordPaperUse:item.wordDecision?.paperUse?wordPaperUseView(item.wordDecision.paperUse,p.answers[wordPaperUseKey(item.id)]??''):undefined,wordPathSteps:item.wordDecision?.pathSteps?wordPathStepsView(item.wordDecision.pathSteps,p.answers[wordPathStepsKey(item.id)]??''):undefined,wordRectangleRatio:item.wordDecision?.rectangleRatio?wordRectangleRatioView(item.wordDecision.rectangleRatio,p.answers[wordRectangleRatioKey(item.id)]??''):undefined,wordSpotWings:item.wordDecision?.spotWings?wordSpotWingsView(item.wordDecision.spotWings,p.answers[wordSpotWingsKey(item.id)]??''):undefined,wordWireOrder:item.wordDecision?.wireOrder?wordWireOrderView(item.wordDecision.wireOrder,p.answers[wordWireOrderKey(item.id)]??''):undefined,wordRobotWave:item.wordDecision?.robotWave?wordRobotWaveView(item.wordDecision.robotWave,p.answers[wordRobotWaveKey(item.id)]??''):undefined,wordShadePanel:item.wordDecision?.shadePanel?wordShadePanelView(item.wordDecision.shadePanel,p.answers[wordShadePanelKey(item.id)]??''):undefined,wordDepthLine:item.wordDecision?.depthLine?wordDepthLineView(item.wordDecision.depthLine,p.answers[wordDepthLineKey(item.id)]??''):undefined,wordWaterPair:item.wordDecision?.waterPair?wordWaterPairView(item.wordDecision.waterPair,p.answers[wordWaterPairKey(item.id)]??''):undefined,wordObserve:item.wordDecision?.observe?wordObserveView(item.wordDecision.observe,p.answers[wordObserveKey(item.id)]??''):undefined,wordMolecule:item.wordDecision?.molecule?wordMoleculeView(item.wordDecision.molecule,p.answers[wordMoleculeKey(item.id)]??''):undefined,wordCart:item.wordDecision?.cart?wordCartView(item.wordDecision.cart,p.answers[wordCartKey(item.id)]??''):undefined,wordPattern:item.wordDecision?.pattern?wordPatternView(item.wordDecision.pattern,p.answers[wordPatternKey(item.id)]??''):undefined,wordPreference:item.wordDecision?.preference?wordPreferenceView(item.wordDecision.preference,p.answers[wordPreferenceKey(item.id)]??''):undefined,wordFlash:item.wordDecision?.flash?wordFlashView(item.wordDecision.flash,p.answers[wordFlashKey(item.id)]??''):undefined,wordRouteWeather:item.wordDecision?.routeWeather?wordRouteWeatherView(item.wordDecision.routeWeather,p.answers[wordRouteWeatherKey(item.id)]??''):undefined,wordDottedRoute:item.wordDecision?.dottedRoute?wordDottedRouteView(item.wordDecision.dottedRoute,p.answers[wordDottedRouteKey(item.id)]??''):undefined,wordContributions:item.wordDecision?.contributions?wordContributionsView(item.wordDecision.contributions,p.answers[wordContributionsKey(item.id)]??''):undefined,wordCurtainExit:item.wordDecision?.curtainExit?wordCurtainExitView(item.wordDecision.curtainExit,p.answers[wordCurtainExitKey(item.id)]??''):undefined,wordRiverImagine:item.wordDecision?.riverImagine?wordRiverImagineView(item.wordDecision.riverImagine,p.answers[wordRiverImagineKey(item.id)]??''):undefined,wordGuessScale:item.wordDecision?.guessScale?wordGuessScaleView(item.wordDecision.guessScale,p.answers[wordGuessScaleKey(item.id)]??''):undefined,wordTornMap:item.wordDecision?.tornMap?wordTornMapView(item.wordDecision.tornMap,p.answers[wordTornMapKey(item.id)]??''):undefined,wordInterestRoles:item.wordDecision?.interestRoles?wordInterestRolesView(item.wordDecision.interestRoles,p.answers[wordInterestRolesKey(item.id)]??''):undefined,wordBoxFit:item.wordDecision?.boxFit?wordBoxFitView(item.wordDecision.boxFit,p.answers[wordBoxFitKey(item.id)]??''):undefined,wordUArticle:item.wordDecision?.uArticle?wordUArticleView(item.wordDecision.uArticle,p.answers[wordUArticleKey(item.id)]??''):undefined,wordJarChange:item.wordDecision?.jarChange?wordJarChangeView(item.wordDecision.jarChange,p.answers[wordJarChangeKey(item.id)]??''):undefined,wordDoughEqual:item.wordDecision?.doughEqual?wordDoughEqualView(item.wordDecision.doughEqual,p.answers[wordDoughEqualKey(item.id)]??''):undefined,wordLeafSimilar:item.wordDecision?.leafSimilar?wordLeafSimilarView(item.wordDecision.leafSimilar,p.answers[wordLeafSimilarKey(item.id)]??''):undefined,wordFreeSunday:item.wordDecision?.freeSunday?wordFreeSundayView(item.wordDecision.freeSunday,p.answers[wordFreeSundayKey(item.id)]??''):undefined,wordGateFirm:item.wordDecision?.gateFirm?wordGateFirmView(item.wordDecision.gateFirm,p.answers[wordGateFirmKey(item.id)]??''):undefined,wordEntranceFacing:item.wordDecision?.entranceFacing?wordEntranceFacingView(item.wordDecision.entranceFacing,p.answers[wordEntranceFacingKey(item.id)]??''):undefined,wordPostRedaction:item.wordDecision?.postRedaction?wordPostRedactionView(item.wordDecision.postRedaction,p.answers[wordPostRedactionKey(item.id)]??''):undefined,wordNearlyFinish:item.wordDecision?.nearlyFinish?wordNearlyFinishView(item.wordDecision.nearlyFinish,p.answers[wordNearlyFinishKey(item.id)]??''):undefined,wordExactAlignment:item.wordDecision?.exactAlignment?wordExactAlignmentView(item.wordDecision.exactAlignment,p.answers[wordExactAlignmentKey(item.id)]??''):undefined,wordGateCondition:item.wordDecision?.gateCondition?wordGateConditionView(item.wordDecision.gateCondition,p.answers[wordGateConditionKey(item.id)]??''):undefined,wordRegularRepeat:item.wordDecision?.regularRepeat?wordRegularRepeatView(item.wordDecision.regularRepeat,p.answers[wordRegularRepeatKey(item.id)]??''):undefined,wordDrySeats:item.wordDecision?.drySeats?wordDrySeatsView(item.wordDecision.drySeats,p.answers[wordDrySeatsKey(item.id)]??''):undefined,wordActionCount:item.wordDecision?.actionCount?wordActionCountView(item.wordDecision.actionCount,p.answers[wordActionCountKey(item.id)]??''):undefined,wordCarbonDioxide:item.wordDecision?.carbonDioxide?wordCarbonDioxideView(item.wordDecision.carbonDioxide,p.answers[wordCarbonDioxideKey(item.id)]??''):undefined,wordMaterialSort:item.wordDecision?.materialSort?wordMaterialSortView(item.wordDecision.materialSort,p.answers[wordMaterialSortKey(item.id)]??''):undefined,wordSupportLinks:item.wordDecision?.supportLinks?wordSupportLinksView(item.wordDecision.supportLinks,p.answers[wordSupportLinksKey(item.id)]??''):undefined,wordInlandRoute:item.wordDecision?.inlandRoute?wordInlandRouteView(item.wordDecision.inlandRoute,p.answers[wordInlandRouteKey(item.id)]??''):undefined,wordSustainableAnd:item.wordDecision?.sustainableAnd?wordSustainableAndView(item.wordDecision.sustainableAnd,p.answers[wordSustainableAndKey(item.id)]??''):undefined,wordProcessOrder:item.wordDecision?.processOrder?wordProcessOrderView(item.wordDecision.processOrder,p.answers[wordProcessOrderKey(item.id)]??''):undefined,wordQueueMove:item.wordDecision?.queueMove?wordQueueMoveView(item.wordDecision.queueMove,p.answers[wordQueueMoveKey(item.id)]??''):undefined,wordShelfRoom:item.wordDecision?.shelfRoom?wordShelfRoomView(item.wordDecision.shelfRoom,p.answers[wordShelfRoomKey(item.id)]??''):undefined,wordFileDesk:item.wordDecision?.fileDesk?wordFileDeskView(item.wordDecision.fileDesk,p.answers[wordFileDeskKey(item.id)]??''):undefined,wordTitleArrow:item.wordDecision?.titleArrow?wordTitleArrowView(item.wordDecision.titleArrow,p.answers[wordTitleArrowKey(item.id)]??''):undefined,wordOfflinePage:item.wordDecision?.offlinePage?wordOfflinePageView(item.wordDecision.offlinePage,p.answers[wordOfflinePageKey(item.id)]??''):undefined,wordNameGroups:item.wordDecision?.nameGroups?wordNameGroupsView(item.wordDecision.nameGroups,p.answers[wordNameGroupsKey(item.id)]??''):undefined,wordPhoneMode:item.wordDecision?.phoneMode?wordPhoneModeView(item.wordDecision.phoneMode,p.answers[wordPhoneModeKey(item.id)]??''):undefined,wordPrintPages:item.wordDecision?.printPages?wordPrintPagesView(item.wordDecision.printPages,p.answers[wordPrintPagesKey(item.id)]??''):undefined,wordSources:item.wordDecision?.sources?{context:item.wordDecision.sources.context,cards:item.wordDecision.sources.cards.map(card=>({...card,text:item.options?.find(o=>o.id===card.option)?.text??'',selected:card.option===selected,accepted:attempted&&card.option===selected&&!!item.options?.some(o=>o.id===selected&&o.correct),wrong:attempted&&card.option===selected&&!item.options?.some(o=>o.id===selected&&o.correct)}))}:undefined,wordReportedChange:item.wordDecision?.reportedChange?wordReportedChangeView(item.wordDecision.reportedChange,p.answers[wordReportedChangeKey(item.id)]??''):undefined,wordChance:item.wordDecision?.chance?wordChanceView(item.wordDecision.chance,p.answers[wordChanceKey(item.id)]??''):undefined,wordDailyWalk:item.wordDecision?.dailyWalk?wordDailyWalkView(item.wordDecision.dailyWalk,p.answers[wordDailyWalkKey(item.id)]??''):undefined,wordPictureOnly:item.wordDecision?.art?.pictureOnly===true,wordBoat:item.wordDecision?.boat?wordBoatView(item.wordDecision.boat,p.answers[wordBoatKey(item.id)]??''):undefined,wordShift:item.wordDecision?.shift?wordFeelingShiftView(item.wordDecision.shift,p.answers[wordFeelingShiftKey(item.id)]??''):undefined,wordProvision:item.wordDecision?.provision?wordProvisionView(item.wordDecision.provision,p.answers[wordProvisionKey(item.id)]??''):undefined,wordUntil:item.wordDecision?.until?wordUntilView(item.wordDecision.until,p.answers[wordUntilKey(item.id)]??''):undefined,wordThermal:item.wordDecision?.thermal?wordThermalView(item.wordDecision.thermal,p.answers[wordThermalKey(item.id)]??''):undefined,wordClimate:item.wordDecision?.climate?wordClimateView(item.wordDecision.climate,p.answers[wordClimateKey(item.id)]??''):undefined,wordDaylight:item.wordDecision?.daylight?wordDaylightView(item.wordDecision.daylight,p.answers[wordDaylightKey(item.id)]??''):undefined,wordWeather:item.wordDecision?.weather?wordWeatherView(item.wordDecision.weather,p.answers[wordWeatherKey(item.id)]??''):undefined,wordDoor:item.wordDecision?.door?wordDoorView(item.wordDecision.door,p.answers[wordDoorKey(item.id)]??''):undefined,wordFraction:item.wordDecision?.fraction?wordFractionView(item.wordDecision.fraction,p.answers[wordFractionKey(item.id)]??''):undefined,wordRotation:item.wordDecision?.rotation?wordRotationView(item.wordDecision.rotation,p.answers[wordRotationKey(item.id)]??''):undefined,wordRuler:item.wordDecision?.ruler?wordRulerView(item.wordDecision.ruler,p.answers[wordRulerKey(item.id)]??''):undefined,wordQuantity:item.wordDecision?.quantity?wordQuantityView(item.wordDecision.quantity,p.answers[wordQuantityKey(item.id)]??''):undefined,wordRecordSelection:item.wordDecision?.recordSelection?wordRecordSelectionView(item.wordDecision.recordSelection,p.answers[wordRecordSelectionKey(item.id)]??''):undefined,wordClock:item.wordDecision?.clock?wordClockView(item.wordDecision.clock,p.answers[wordClockKey(item.id)]??''):undefined,wordPictureTargets:(item.wordDecision?.art?.targets??[]).map(t=>({id:t.id,option:t.option,label:t.label,selected:t.option===selected,...(item.wordDecision?.art?.pictureOnly?{accepted:attempted&&t.option===selected&&!!item.options?.some(o=>o.id===selected&&o.correct),wrong:attempted&&t.option===selected&&!item.options?.some(o=>o.id===selected&&o.correct)}:{}),style:`left:${t.left}%;top:${t.top}%;width:${t.width}%;height:${t.height}%;align-items:${t.labelPosition==='top'?'flex-start':'flex-end'};`})),wordRecordPaths:selected&&item.options?.some(o=>o.id===selected)?item.wordDecision?.recordPaths??[]:[],wordTailOnly:/^[.!?,;:]+$/.test((item.after??'').trim()),wordEvidence:wordEvidence?{caption:wordEvidence.caption,regions:wordEvidence.regions.map(r=>({id:r.id,label:r.label,style:`left:${r.left}%;top:${r.top}%;width:${r.width}%;height:${r.height}%;`}))}:undefined,ownMissing:!!p.checked.workshopOwnMissing,reduction:reductionPreview,settings:settings?{pacing:pacingPreview,labels:settingsLabels,title:settings.title,note:settings.note,checked:settingsChecked,correct:settingsMatch(item,p),rows:settings.rows.map(r=>{const value=p.answers[settingKey(item.id,r.id)]??'',labels=r.route?.targets??settingsLabels;return{id:r.id,label:r.label,value,labels,route:r.route?{from:r.route.from,target:value==='on'?labels[0]:value==='off'?labels[1]:'先选择去向或下一步'}:undefined,status:value==='on'?labels[0]:value==='off'?labels[1]:'尚未设置',correct:settingsChecked&&value===r.answer,feedback:settingsChecked?(value===r.answer?r.reason:value?r.wrong:`这项还没设置。先选${labels[0]}或${labels[1]}，再核对。`):''}})}:undefined,recall:recall?{title:recall.title,note:recall.note,phase:recallPhase,ready:recall.words.every(w=>(p.answers[recallAnswerKey(item.id,w.id)]??'').trim().length>0),rows:recall.words.map(w=>({...w,answer:recallPhase==='recall'?'':w.answer,attempt:p.answers[recallAnswerKey(item.id,w.id)]??'',same:normalizedAnswer(p.answers[recallAnswerKey(item.id,w.id)]??'')===normalizedAnswer(w.answer)}))}:undefined,gap:item.sourceGap?{...(item.sourceGap.locationMap?{map:locationPreview(item.sourceGap.locationMap,gapChoice?.text??'')}:{}),before:item.sourceGap.before,after:item.sourceGap.after,text:gapChoice?.text??'____',selected:gapChoice?.id??'',checked:gapChecked,correct:sourceGapMatches(item,p),feedback:gapChecked?(gapChoice?.reason??'先把一个候选词放进空格，再核对。'):'',options:item.sourceGap.options.map(o=>({id:o.id,text:o.text,selected:o.id===gapChoice?.id}))}:undefined,orderSlots:(item.sourceOrderLabels??[]).map((label,slot)=>({label,id:orderAnswer[slot]?.id??'',text:orderAnswer[slot]?.text??'',wrong:orderAnswer[slot]?.wrong??false,filled:!!orderAnswer[slot]})),redaction:scope?.mode==='redact'&&scope.preview?{asset:scope.preview.asset,alt:scope.preview.alt,regions:scope.preview.regions.map(r=>({...r,label:condition!.world.cells.find(c=>c.id===r.id)!.label,detail:condition!.world.cells.find(c=>c.id===r.id)!.detail??'',masked:members.includes(r.id),wrong:attempted&&(members.includes(r.id)!==scope.ids.includes(r.id)),style:`left:${r.left}%;top:${r.top}%;width:${r.width}%;height:${r.height}%;`}))}:undefined,proofArtChoices:(item.sourceArt?.choices??[]).map(c=>({...c,selected:selected===c.id,accepted:!!p.checked[`${k}-proof-${c.id}`],wrong:attempted&&selected===c.id&&!p.checked[`${k}-proof-${c.id}`]})),proofReady:proofReady(item,p,k),orderBank,orderAnswer,selectionText,morphemeTiles:condition?.tileMode==='morpheme',verbBridge,albumOwnership,albumMode,albumItems,keepEnding:!!condition&&(!condition.tiles||condition.tileMode==='morpheme'||(condition.target.split(' ').length<=2&&selected.split(' ').length<=2))&&Math.max(condition.target.length,selected.length)<=18&&/^[.!?]$/.test(condition.after),tileBank:(condition?.tiles??[]).map((text,i)=>({id:String(i),text,used:tileIds.includes(String(i))})),tileAnswer:tileIds.map(id=>({id,text:condition!.tiles![Number(id)]})),referenceStyle:condition?.world.kind==='timeline'&&condition.world.cells.some(c=>c.id==='reference')?`left:${condition.world.cells.find(c=>c.id==='reference')!.value}%;`:'',membersCorrect,records,recordOptions,recordArtChoices:(records?.artChoices??[]).map((id,i)=>({...recordOptions.find(r=>r.id===id)!,style:`left:${i*50}%;width:50%;`})),recordCorrect,hasScene:!!w.conditions?.some(c=>c.world.scene||c.world.records||c.world.selection||c.world.verbBridge||c.tileMode==='morpheme'),navigationLabel:w.navigationLabel??'任务',scene,scenePeople,sceneSubjectsCorrect,expressionWrong:attempted&&!!selected&&!!condition&&!matches(condition,selected),proofSteps:(item.evidenceLabels??[]).map((label,index)=>({id:String(index),label,accepted:!!item.evidenceGroups?.[index]?.some(id=>p.checked[`${k}-proof-${id}`])})),proofRequired:item.evidenceGroups?.length??1,proofCollected:(item.options??[]).filter(o=>p.checked[`${k}-proof-${o.id}`]).map(o=>({id:o.id,text:o.text})),proofAccepted:!!p.checked[`${k}-proof-${selected}`],soundUnits,soundMode,pitch,doneCount:Array.from({length:total},(_,i)=>i).filter(completedAt).length,usageDirection:item.usage?.alternatives[normalizedAnswer(input)]??'',kind:w.kind,title:w.title,instruction:w.instruction,index,total,tabs:Array.from({length:total},(_,i)=>({id:String(i),label:w.conditions?.[i].label??w.items[i].label,done:completedAt(i)})),item,condition,cells,choices:options.map(o=>({...o,text:item.sound==='pitch'?(o.text==='↗'?'句末上升':'句末下降'):o.text,selected:o.id===selected,accepted:item.wordDecision?attempted&&o.id===selected&&!!item.options?.some(option=>option.id===selected&&option.correct):!!p.checked[`${k}-proof-${o.id}`]})),selected,input,own,attempted,correct,feedback,revealed:!!p.checked.workshopReveal,complete,allDone:Array.from({length:total},(_,i)=>i).every(completedAt),draftWords:wordCount(own),sourceOpen:!!p.checked.workshopSource,worldClass:condition?.world.kind??w.kind}
}
export function changeWorkshop(w:LessonWorkshop,p:TeachingProgress,action:string,value:string):void{
 const v=workshopView(w,p),k=key(v.index),mark=()=>{if(!p.completed.includes(k))p.completed.push(k)},unmark=()=>{p.completed=p.completed.filter(x=>x!==k)}
 if(action==='composeFrame'){
  if(w.kind!=='compose'||(v.item.composeArt?.frames!==2&&v.item.composeArt?.frames!==3)||!Array.from({length:v.item.composeArt.frames},(_,i)=>String(i)).includes(value))return
  p.answers['composeFrame-'+v.item.id]=value;return
 }
 if(action==='composeOrder'){
  if(w.kind!=='compose'||!v.item.composeOrder)return
  const field='composeOrder-'+v.item.id,next=changeProcessOrder(v.item.composeOrder,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='composeBrief'){
  if(w.kind!=='compose'||!v.item.composeBrief)return
  const field=composeBriefKey(v.item.id),next=changeComposeBrief(v.item.composeBrief,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
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
 if(action==='shadePanel'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.shadePanel)return
  const field=wordShadePanelKey(v.item.id),next=changeShadePanel(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='rectangleRatio'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.rectangleRatio)return
  const field=wordRectangleRatioKey(v.item.id),next=changeRectangleRatio(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='spotWings'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.spotWings)return
  const field=wordSpotWingsKey(v.item.id),next=changeSpotWings(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='wireOrder'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.wireOrder)return
  const field=wordWireOrderKey(v.item.id),next=changeWireOrder(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='routeTraffic'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.routeTraffic)return
  const field=wordRouteTrafficKey(v.item.id),next=changeRouteTraffic(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='stampPlacement'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.stampPlacement)return
  const field=wordStampPlacementKey(v.item.id),next=changeStampPlacement(value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='eachItem'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.eachItem)return
  const field=wordEachItemKey(v.item.id),next=changeEachItem(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='busBudget'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.busBudget)return
  const field=wordBusBudgetKey(v.item.id),next=changeBusBudget(v.item.wordDecision.busBudget,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='paperUse'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.paperUse)return
  const field=wordPaperUseKey(v.item.id),next=changePaperUse(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='pathSteps'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.pathSteps)return
  const field=wordPathStepsKey(v.item.id),next=changePathSteps(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='robotWave'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.robotWave)return
  const field=wordRobotWaveKey(v.item.id),next=changeRobotWave(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='depthLine'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.depthLine)return
  const field=wordDepthLineKey(v.item.id),next=changeDepthLine(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='waterPair'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.waterPair)return
  const field=wordWaterPairKey(v.item.id),next=changeWaterPair(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='observe'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.observe)return
  const field=wordObserveKey(v.item.id),next=changeObserve(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='molecule'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.molecule)return
  const field=wordMoleculeKey(v.item.id),next=changeMolecule(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='cart'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.cart)return
  const field=wordCartKey(v.item.id),next=changeCart(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='pattern'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.pattern)return
  const field=wordPatternKey(v.item.id),next=changePattern(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='preference'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.preference)return
  const field=wordPreferenceKey(v.item.id),next=changePreference(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='flash'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.flash)return
  const field=wordFlashKey(v.item.id),next=changeFlash(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='routeWeather'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.routeWeather)return
  const field=wordRouteWeatherKey(v.item.id),next=changeRouteWeather(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='dottedRoute'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.dottedRoute)return
  const field=wordDottedRouteKey(v.item.id),next=changeDottedRoute(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='contributions'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.contributions)return
  const field=wordContributionsKey(v.item.id),next=changeContributions(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='curtainExit'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.curtainExit)return
  const field=wordCurtainExitKey(v.item.id),next=changeCurtainExit(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='riverImagine'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.riverImagine)return
  const field=wordRiverImagineKey(v.item.id),next=changeRiverImagine(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='guessScale'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.guessScale)return
  const field=wordGuessScaleKey(v.item.id),next=changeGuessScale(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='tornMap'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.tornMap)return
  const field=wordTornMapKey(v.item.id),next=changeTornMap(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='interestRoles'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.interestRoles)return
  const field=wordInterestRolesKey(v.item.id),next=changeInterestRoles(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='boxFit'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.boxFit)return
  const field=wordBoxFitKey(v.item.id),next=changeBoxFit(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='uArticle'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.uArticle)return
  const field=wordUArticleKey(v.item.id),next=changeUArticle(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='jarChange'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.jarChange)return
  const field=wordJarChangeKey(v.item.id),next=changeJarChange(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='doughEqual'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.doughEqual)return
  const field=wordDoughEqualKey(v.item.id),next=changeDoughEqual(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='leafSimilar'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.leafSimilar)return
  const field=wordLeafSimilarKey(v.item.id),next=changeLeafSimilar(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='freeSunday'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.freeSunday)return
  const field=wordFreeSundayKey(v.item.id),next=changeFreeSunday(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='gateFirm'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.gateFirm)return
  const field=wordGateFirmKey(v.item.id),next=changeGateFirm(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='entranceFacing'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.entranceFacing)return
  const field=wordEntranceFacingKey(v.item.id),next=changeEntranceFacing(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='postRedaction'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.postRedaction)return
  const field=wordPostRedactionKey(v.item.id),next=changePostRedaction(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='nearlyFinish'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.nearlyFinish)return
  const field=wordNearlyFinishKey(v.item.id),next=changeNearlyFinish(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='exactAlignment'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.exactAlignment)return
  const field=wordExactAlignmentKey(v.item.id),next=changeExactAlignment(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='gateCondition'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.gateCondition)return
  const field=wordGateConditionKey(v.item.id),next=changeGateCondition(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='regularRepeat'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.regularRepeat)return
  const field=wordRegularRepeatKey(v.item.id),next=changeRegularRepeat(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='drySeats'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.drySeats)return
  const field=wordDrySeatsKey(v.item.id),next=changeDrySeats(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='actionCount'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.actionCount)return
  const field=wordActionCountKey(v.item.id),next=changeActionCount(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='carbonDioxide'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.carbonDioxide)return
  const field=wordCarbonDioxideKey(v.item.id),next=changeCarbonDioxide(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='materialSort'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.materialSort)return
  const field=wordMaterialSortKey(v.item.id),next=changeMaterialSort(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='supportLinks'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.supportLinks)return
  const field=wordSupportLinksKey(v.item.id),next=changeSupportLinks(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='inlandRoute'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.inlandRoute)return
  const field=wordInlandRouteKey(v.item.id),next=changeInlandRoute(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='sustainableAnd'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.sustainableAnd)return
  const field=wordSustainableAndKey(v.item.id),next=changeSustainableAnd(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='processOrder'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.processOrder)return
  const field=wordProcessOrderKey(v.item.id),next=changeProcessOrder(v.item.wordDecision.processOrder,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='queueMove'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.queueMove)return
  const field=wordQueueMoveKey(v.item.id),next=changeQueueMove(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='shelfRoom'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.shelfRoom)return
  const field=wordShelfRoomKey(v.item.id),next=changeShelfRoom(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='fileDesk'){
  const task=v.item.wordDecision?.fileDesk;if(w.kind!=='word-use'||!task)return
  const field=wordFileDeskKey(v.item.id),next=changeFileDesk(task,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='titleArrow'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.titleArrow)return
  const next=changeTitleArrow(value);if(next===undefined)return
  p.answers[wordTitleArrowKey(v.item.id)]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='offlinePage'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.offlinePage)return
  const field=wordOfflinePageKey(v.item.id),next=changeOfflinePage(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='nameGroups'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.nameGroups)return
  const field=wordNameGroupsKey(v.item.id),next=changeNameGroups(v.item.wordDecision.nameGroups,p.answers[field]??'',value);if(next===undefined)return
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
  const recall=v.item.sourceRecall;if((w.kind!=='proof'&&w.kind!=='compose')||!recall)return
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
  if(w.kind==='compose'){if(!recallReady(v.item,p)||!briefMatches(v.item,p)){p.checked[k]=false;unmark();p.checked.workshopOwnMissing=false}else if(longEnough(v.own,4)){mark();p.checked[k]=true;p.checked.workshopOwnMissing=false}else{p.checked[k]=false;unmark();p.checked.workshopOwnMissing=true}return}
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
 return{...w,title:t(w.title),instruction:t(w.instruction),choices:w.choices?.map(t),conditions:w.conditions?.map(c=>({...c,initial:c.initial!==undefined?t(c.initial):undefined,tiles:c.tiles?.map(t),accepted:c.accepted?.map(t),choices:c.choices?.map(t),label:t(c.label),inputHint:c.inputHint?t(c.inputHint):undefined,before:t(c.before),target:t(c.target),after:t(c.after),reason:t(c.reason),world:{...c.world,verbBridge:c.world.verbBridge?{...c.world.verbBridge,verb:t(c.world.verbBridge.verb),object:t(c.world.verbBridge.object),objectLabel:t(c.world.verbBridge.objectLabel),options:c.world.verbBridge.options.map(o=>({expression:t(o.expression),link:t(o.link)}))}:undefined,albums:c.world.albums?{...c.world.albums,owners:[t(c.world.albums.owners[0]),t(c.world.albums.owners[1])]}:undefined,connector:c.world.connector?t(c.world.connector):undefined,caption:t(c.world.caption),...(c.world.selection?{selection:{...c.world.selection,prompt:t(c.world.selection.prompt),reason:t(c.world.selection.reason),preview:c.world.selection.preview?{...c.world.selection.preview,alt:t(c.world.selection.preview.alt),regions:c.world.selection.preview.regions.map(r=>({...r,text:t(r.text)}))}:undefined}}:{}),...(c.world.records?{records:{...c.world.records,title:t(c.world.records.title),overlay:c.world.records.overlay?{...c.world.records.overlay,text:t(c.world.records.overlay.text)}:undefined,missingPrompt:c.world.records.missingPrompt?t(c.world.records.missingPrompt):undefined,artLabels:c.world.records.artLabels?.map(t),options:c.world.records.options.map(r=>({...r,label:t(r.label),text:t(r.text),outcome:r.outcome?t(r.outcome):undefined,eventLabel:r.eventLabel?t(r.eventLabel):undefined,reason:t(r.reason)}))}}:{}),cells:c.world.cells.map(x=>({...x,label:t(x.label),...(x.detail?{detail:t(x.detail)}:{})}))}})),items:w.items.map(i=>({...i,...(i.composeOrder?{composeOrder:{...i.composeOrder,title:t(i.composeOrder.title),hint:t(i.composeOrder.hint),wrong:t(i.composeOrder.wrong),events:i.composeOrder.events.map(e=>({...e,label:t(e.label)})),sequence:[...i.composeOrder.sequence]}}:{}),...(i.composeArt?{composeArt:{...i.composeArt,alt:t(i.composeArt.alt),caption:t(i.composeArt.caption)}}:{}),...(i.composeBrief?{composeBrief:{...i.composeBrief,...(i.composeBrief.paths?{paths:{selector:i.composeBrief.paths.selector,answers:Object.fromEntries(Object.entries(i.composeBrief.paths.answers).map(([k,a])=>[k,{...a}]))}}:{}),title:t(i.composeBrief.title),hint:t(i.composeBrief.hint),wrong:t(i.composeBrief.wrong),fields:i.composeBrief.fields.map(f=>({...f,label:t(f.label),choices:f.choices.map(c=>({...c,label:t(c.label)}))}))}}:{}),...(i.ownForms?{ownForms:i.ownForms.map(t)}:{}),...(i.wordDecision?{wordDecision:{...i.wordDecision,prompt:t(i.wordDecision.prompt),...(i.wordDecision.fraction?{fraction:{...i.wordDecision.fraction,title:t(i.wordDecision.fraction.title),wholeLabel:t(i.wordDecision.fraction.wholeLabel),hint:t(i.wordDecision.fraction.hint),wrong:t(i.wordDecision.fraction.wrong)}}:{}),...(i.wordDecision.climate?{climate:{...i.wordDecision.climate,title:t(i.wordDecision.climate.title),hint:t(i.wordDecision.climate.hint),wrong:t(i.wordDecision.climate.wrong)}}:{}),...(i.wordDecision.until?{until:{...i.wordDecision.until,title:t(i.wordDecision.until.title),feeling:t(i.wordDecision.until.feeling),hint:t(i.wordDecision.until.hint),wrong:t(i.wordDecision.until.wrong),events:i.wordDecision.until.events.map(e=>({...e,label:t(e.label)}))}}:{}),...(i.wordDecision.dailyWalk?{dailyWalk:{...i.wordDecision.dailyWalk,title:t(i.wordDecision.dailyWalk.title),hint:t(i.wordDecision.dailyWalk.hint),wrong:t(i.wordDecision.dailyWalk.wrong)}}:{}),...(i.wordDecision.sources?{sources:{context:t(i.wordDecision.sources.context),cards:i.wordDecision.sources.cards.map(c=>({...c,title:t(c.title),publisher:t(c.publisher),area:t(c.area),validFor:t(c.validFor)}))}}:{}),...(i.wordDecision.shadePanel?{shadePanel:{...i.wordDecision.shadePanel,title:t(i.wordDecision.shadePanel.title),hint:t(i.wordDecision.shadePanel.hint),wrong:t(i.wordDecision.shadePanel.wrong)}}:{}),...(i.wordDecision.rectangleRatio?{rectangleRatio:{...i.wordDecision.rectangleRatio,title:t(i.wordDecision.rectangleRatio.title),hint:t(i.wordDecision.rectangleRatio.hint),wrong:t(i.wordDecision.rectangleRatio.wrong)}}:{}),...(i.wordDecision.spotWings?{spotWings:{...i.wordDecision.spotWings,title:t(i.wordDecision.spotWings.title),hint:t(i.wordDecision.spotWings.hint),wrong:t(i.wordDecision.spotWings.wrong)}}:{}),...(i.wordDecision.wireOrder?{wireOrder:{...i.wordDecision.wireOrder,title:t(i.wordDecision.wireOrder.title),hint:t(i.wordDecision.wireOrder.hint),wrong:t(i.wordDecision.wireOrder.wrong)}}:{}),...(i.wordDecision.routeTraffic?{routeTraffic:{...i.wordDecision.routeTraffic,title:t(i.wordDecision.routeTraffic.title),hint:t(i.wordDecision.routeTraffic.hint),wrong:t(i.wordDecision.routeTraffic.wrong)}}:{}),...(i.wordDecision.stampPlacement?{stampPlacement:{...i.wordDecision.stampPlacement,title:t(i.wordDecision.stampPlacement.title),hint:t(i.wordDecision.stampPlacement.hint),wrong:t(i.wordDecision.stampPlacement.wrong)}}:{}),...(i.wordDecision.eachItem?{eachItem:{...i.wordDecision.eachItem,title:t(i.wordDecision.eachItem.title),hint:t(i.wordDecision.eachItem.hint),wrong:t(i.wordDecision.eachItem.wrong)}}:{}),...(i.wordDecision.busBudget?{busBudget:{...i.wordDecision.busBudget,title:t(i.wordDecision.busBudget.title),hint:t(i.wordDecision.busBudget.hint),wrong:t(i.wordDecision.busBudget.wrong)}}:{}),...(i.wordDecision.paperUse?{paperUse:{...i.wordDecision.paperUse,title:t(i.wordDecision.paperUse.title),hint:t(i.wordDecision.paperUse.hint),wrong:t(i.wordDecision.paperUse.wrong)}}:{}),...(i.wordDecision.pathSteps?{pathSteps:{...i.wordDecision.pathSteps,title:t(i.wordDecision.pathSteps.title),hint:t(i.wordDecision.pathSteps.hint),wrong:t(i.wordDecision.pathSteps.wrong)}}:{}),...(i.wordDecision.robotWave?{robotWave:{...i.wordDecision.robotWave,title:t(i.wordDecision.robotWave.title),hint:t(i.wordDecision.robotWave.hint),wrong:t(i.wordDecision.robotWave.wrong)}}:{}),...(i.wordDecision.depthLine?{depthLine:{...i.wordDecision.depthLine,title:t(i.wordDecision.depthLine.title),hint:t(i.wordDecision.depthLine.hint),wrong:t(i.wordDecision.depthLine.wrong)}}:{}),...(i.wordDecision.waterPair?{waterPair:{...i.wordDecision.waterPair,title:t(i.wordDecision.waterPair.title),hint:t(i.wordDecision.waterPair.hint),wrong:t(i.wordDecision.waterPair.wrong)}}:{}),...(i.wordDecision.observe?{observe:{...i.wordDecision.observe,title:t(i.wordDecision.observe.title),hint:t(i.wordDecision.observe.hint),wrong:t(i.wordDecision.observe.wrong)}}:{}),...(i.wordDecision.molecule?{molecule:{...i.wordDecision.molecule,title:t(i.wordDecision.molecule.title),hint:t(i.wordDecision.molecule.hint),wrong:t(i.wordDecision.molecule.wrong)}}:{}),...(i.wordDecision.cart?{cart:{...i.wordDecision.cart,title:t(i.wordDecision.cart.title),hint:t(i.wordDecision.cart.hint),wrong:t(i.wordDecision.cart.wrong)}}:{}),...(i.wordDecision.pattern?{pattern:{...i.wordDecision.pattern,title:t(i.wordDecision.pattern.title),hint:t(i.wordDecision.pattern.hint),wrong:t(i.wordDecision.pattern.wrong)}}:{}),...(i.wordDecision.preference?{preference:{...i.wordDecision.preference,title:t(i.wordDecision.preference.title),hint:t(i.wordDecision.preference.hint),wrong:t(i.wordDecision.preference.wrong)}}:{}),...(i.wordDecision.flash?{flash:{...i.wordDecision.flash,title:t(i.wordDecision.flash.title),hint:t(i.wordDecision.flash.hint),wrong:t(i.wordDecision.flash.wrong)}}:{}),...(i.wordDecision.routeWeather?{routeWeather:{...i.wordDecision.routeWeather,title:t(i.wordDecision.routeWeather.title),hint:t(i.wordDecision.routeWeather.hint),wrong:t(i.wordDecision.routeWeather.wrong)}}:{}),...(i.wordDecision.dottedRoute?{dottedRoute:{...i.wordDecision.dottedRoute,title:t(i.wordDecision.dottedRoute.title),hint:t(i.wordDecision.dottedRoute.hint),wrong:t(i.wordDecision.dottedRoute.wrong)}}:{}),...(i.wordDecision.contributions?{contributions:{...i.wordDecision.contributions,title:t(i.wordDecision.contributions.title),hint:t(i.wordDecision.contributions.hint),wrong:t(i.wordDecision.contributions.wrong)}}:{}),...(i.wordDecision.curtainExit?{curtainExit:{...i.wordDecision.curtainExit,title:t(i.wordDecision.curtainExit.title),hint:t(i.wordDecision.curtainExit.hint),wrong:t(i.wordDecision.curtainExit.wrong)}}:{}),...(i.wordDecision.riverImagine?{riverImagine:{...i.wordDecision.riverImagine,title:t(i.wordDecision.riverImagine.title),hint:t(i.wordDecision.riverImagine.hint),wrong:t(i.wordDecision.riverImagine.wrong)}}:{}),...(i.wordDecision.guessScale?{guessScale:{...i.wordDecision.guessScale,title:t(i.wordDecision.guessScale.title),hint:t(i.wordDecision.guessScale.hint),wrong:t(i.wordDecision.guessScale.wrong)}}:{}),...(i.wordDecision.tornMap?{tornMap:{...i.wordDecision.tornMap,title:t(i.wordDecision.tornMap.title),hint:t(i.wordDecision.tornMap.hint),wrong:t(i.wordDecision.tornMap.wrong)}}:{}),...(i.wordDecision.interestRoles?{interestRoles:{...i.wordDecision.interestRoles,title:t(i.wordDecision.interestRoles.title),hint:t(i.wordDecision.interestRoles.hint),wrong:t(i.wordDecision.interestRoles.wrong)}}:{}),...(i.wordDecision.boxFit?{boxFit:{...i.wordDecision.boxFit,title:t(i.wordDecision.boxFit.title),hint:t(i.wordDecision.boxFit.hint),wrong:t(i.wordDecision.boxFit.wrong)}}:{}),...(i.wordDecision.uArticle?{uArticle:{...i.wordDecision.uArticle,title:t(i.wordDecision.uArticle.title),hint:t(i.wordDecision.uArticle.hint),wrong:t(i.wordDecision.uArticle.wrong)}}:{}),...(i.wordDecision.jarChange?{jarChange:{...i.wordDecision.jarChange,title:t(i.wordDecision.jarChange.title),hint:t(i.wordDecision.jarChange.hint),wrong:t(i.wordDecision.jarChange.wrong)}}:{}),...(i.wordDecision.doughEqual?{doughEqual:{...i.wordDecision.doughEqual,title:t(i.wordDecision.doughEqual.title),hint:t(i.wordDecision.doughEqual.hint),wrong:t(i.wordDecision.doughEqual.wrong)}}:{}),...(i.wordDecision.leafSimilar?{leafSimilar:{...i.wordDecision.leafSimilar,title:t(i.wordDecision.leafSimilar.title),hint:t(i.wordDecision.leafSimilar.hint),wrong:t(i.wordDecision.leafSimilar.wrong)}}:{}),...(i.wordDecision.freeSunday?{freeSunday:{...i.wordDecision.freeSunday,title:t(i.wordDecision.freeSunday.title),hint:t(i.wordDecision.freeSunday.hint),wrong:t(i.wordDecision.freeSunday.wrong)}}:{}),...(i.wordDecision.gateFirm?{gateFirm:{...i.wordDecision.gateFirm,title:t(i.wordDecision.gateFirm.title),hint:t(i.wordDecision.gateFirm.hint),wrong:t(i.wordDecision.gateFirm.wrong)}}:{}),...(i.wordDecision.entranceFacing?{entranceFacing:{...i.wordDecision.entranceFacing,title:t(i.wordDecision.entranceFacing.title),hint:t(i.wordDecision.entranceFacing.hint),wrong:t(i.wordDecision.entranceFacing.wrong)}}:{}),...(i.wordDecision.postRedaction?{postRedaction:{...i.wordDecision.postRedaction,title:t(i.wordDecision.postRedaction.title),hint:t(i.wordDecision.postRedaction.hint),wrong:t(i.wordDecision.postRedaction.wrong)}}:{}),...(i.wordDecision.nearlyFinish?{nearlyFinish:{...i.wordDecision.nearlyFinish,title:t(i.wordDecision.nearlyFinish.title),hint:t(i.wordDecision.nearlyFinish.hint),wrong:t(i.wordDecision.nearlyFinish.wrong)}}:{}),...(i.wordDecision.exactAlignment?{exactAlignment:{...i.wordDecision.exactAlignment,title:t(i.wordDecision.exactAlignment.title),hint:t(i.wordDecision.exactAlignment.hint),wrong:t(i.wordDecision.exactAlignment.wrong)}}:{}),...(i.wordDecision.gateCondition?{gateCondition:{...i.wordDecision.gateCondition,title:t(i.wordDecision.gateCondition.title),hint:t(i.wordDecision.gateCondition.hint),wrong:t(i.wordDecision.gateCondition.wrong)}}:{}),...(i.wordDecision.regularRepeat?{regularRepeat:{...i.wordDecision.regularRepeat,title:t(i.wordDecision.regularRepeat.title),hint:t(i.wordDecision.regularRepeat.hint),wrong:t(i.wordDecision.regularRepeat.wrong)}}:{}),...(i.wordDecision.drySeats?{drySeats:{...i.wordDecision.drySeats,title:t(i.wordDecision.drySeats.title),hint:t(i.wordDecision.drySeats.hint),wrong:t(i.wordDecision.drySeats.wrong)}}:{}),...(i.wordDecision.actionCount?{actionCount:{...i.wordDecision.actionCount,title:t(i.wordDecision.actionCount.title),hint:t(i.wordDecision.actionCount.hint),wrong:t(i.wordDecision.actionCount.wrong),actionLabel:t(i.wordDecision.actionCount.actionLabel),boundaryLabel:t(i.wordDecision.actionCount.boundaryLabel)}}:{}),...(i.wordDecision.carbonDioxide?{carbonDioxide:{...i.wordDecision.carbonDioxide,title:t(i.wordDecision.carbonDioxide.title),hint:t(i.wordDecision.carbonDioxide.hint),wrong:t(i.wordDecision.carbonDioxide.wrong)}}:{}),...(i.wordDecision.materialSort?{materialSort:{...i.wordDecision.materialSort,title:t(i.wordDecision.materialSort.title),hint:t(i.wordDecision.materialSort.hint),wrong:t(i.wordDecision.materialSort.wrong)}}:{}),...(i.wordDecision.supportLinks?{supportLinks:{...i.wordDecision.supportLinks,title:t(i.wordDecision.supportLinks.title),hint:t(i.wordDecision.supportLinks.hint),wrong:t(i.wordDecision.supportLinks.wrong)}}:{}),...(i.wordDecision.inlandRoute?{inlandRoute:{...i.wordDecision.inlandRoute,title:t(i.wordDecision.inlandRoute.title),hint:t(i.wordDecision.inlandRoute.hint),wrong:t(i.wordDecision.inlandRoute.wrong)}}:{}),...(i.wordDecision.sustainableAnd?{sustainableAnd:{...i.wordDecision.sustainableAnd,title:t(i.wordDecision.sustainableAnd.title),hint:t(i.wordDecision.sustainableAnd.hint),wrong:t(i.wordDecision.sustainableAnd.wrong)}}:{}),...(i.wordDecision.processOrder?{processOrder:{...i.wordDecision.processOrder,title:t(i.wordDecision.processOrder.title),hint:t(i.wordDecision.processOrder.hint),wrong:t(i.wordDecision.processOrder.wrong),events:i.wordDecision.processOrder.events.map(e=>({...e,label:t(e.label)})),sequence:[...i.wordDecision.processOrder.sequence]}}:{}),...(i.wordDecision.queueMove?{queueMove:{...i.wordDecision.queueMove,title:t(i.wordDecision.queueMove.title),hint:t(i.wordDecision.queueMove.hint),wrong:t(i.wordDecision.queueMove.wrong)}}:{}),...(i.wordDecision.shelfRoom?{shelfRoom:{...i.wordDecision.shelfRoom,title:t(i.wordDecision.shelfRoom.title),hint:t(i.wordDecision.shelfRoom.hint),wrong:t(i.wordDecision.shelfRoom.wrong)}}:{}),...(i.wordDecision.fileDesk?{fileDesk:{...i.wordDecision.fileDesk,title:t(i.wordDecision.fileDesk.title),hint:t(i.wordDecision.fileDesk.hint),wrong:t(i.wordDecision.fileDesk.wrong)}}:{}),...(i.wordDecision.titleArrow?{titleArrow:{...i.wordDecision.titleArrow,title:t(i.wordDecision.titleArrow.title),hint:t(i.wordDecision.titleArrow.hint),wrong:t(i.wordDecision.titleArrow.wrong)}}:{}),...(i.wordDecision.offlinePage?{offlinePage:{...i.wordDecision.offlinePage,title:t(i.wordDecision.offlinePage.title),hint:t(i.wordDecision.offlinePage.hint),wrong:t(i.wordDecision.offlinePage.wrong)}}:{}),...(i.wordDecision.nameGroups?{nameGroups:{...i.wordDecision.nameGroups,title:t(i.wordDecision.nameGroups.title),names:i.wordDecision.nameGroups.names.map(n=>({...n,name:t(n.name)})),hint:t(i.wordDecision.nameGroups.hint),wrong:t(i.wordDecision.nameGroups.wrong)}}:{}),...(i.wordDecision.phoneMode?{phoneMode:{...i.wordDecision.phoneMode,title:t(i.wordDecision.phoneMode.title),hint:t(i.wordDecision.phoneMode.hint),wrong:t(i.wordDecision.phoneMode.wrong)}}:{}),...(i.wordDecision.printPages?{printPages:{...i.wordDecision.printPages,title:t(i.wordDecision.printPages.title),needed:[...i.wordDecision.printPages.needed],hint:t(i.wordDecision.printPages.hint),wrong:t(i.wordDecision.printPages.wrong)}}:{}),...(i.wordDecision.reportedChange?{reportedChange:{...i.wordDecision.reportedChange,title:t(i.wordDecision.reportedChange.title),label:t(i.wordDecision.reportedChange.label),event:t(i.wordDecision.reportedChange.event),hint:t(i.wordDecision.reportedChange.hint),wrong:t(i.wordDecision.reportedChange.wrong)}}:{}),...(i.wordDecision.chance?{chance:{...i.wordDecision.chance,title:t(i.wordDecision.chance.title),hint:t(i.wordDecision.chance.hint),wrong:t(i.wordDecision.chance.wrong)}}:{}),...(i.wordDecision.boat?{boat:{...i.wordDecision.boat,title:t(i.wordDecision.boat.title),hint:t(i.wordDecision.boat.hint),wrong:t(i.wordDecision.boat.wrong)}}:{}),...(i.wordDecision.shift?{shift:{...i.wordDecision.shift,title:t(i.wordDecision.shift.title),feeling:t(i.wordDecision.shift.feeling),event:t(i.wordDecision.shift.event),hint:t(i.wordDecision.shift.hint),wrong:t(i.wordDecision.shift.wrong)}}:{}),...(i.wordDecision.provision?{provision:{...i.wordDecision.provision,title:t(i.wordDecision.provision.title),hint:t(i.wordDecision.provision.hint),wrong:t(i.wordDecision.provision.wrong),goal:t(i.wordDecision.provision.goal)}}:{}),...(i.wordDecision.thermal?{thermal:{...i.wordDecision.thermal,title:t(i.wordDecision.thermal.title),hint:t(i.wordDecision.thermal.hint),wrong:t(i.wordDecision.thermal.wrong)}}:{}),...(i.wordDecision.daylight?{daylight:{...i.wordDecision.daylight,title:t(i.wordDecision.daylight.title),event:t(i.wordDecision.daylight.event),hint:t(i.wordDecision.daylight.hint),wrong:t(i.wordDecision.daylight.wrong)}}:{}),...(i.wordDecision.weather?{weather:{...i.wordDecision.weather,title:t(i.wordDecision.weather.title),hint:t(i.wordDecision.weather.hint),wrong:t(i.wordDecision.weather.wrong)}}:{}),...(i.wordDecision.door?{door:{...i.wordDecision.door,title:t(i.wordDecision.door.title),people:i.wordDecision.door.people.map(t),hint:t(i.wordDecision.door.hint),wrong:t(i.wordDecision.door.wrong)}}:{}),...(i.wordDecision.rotation?{rotation:{...i.wordDecision.rotation,title:t(i.wordDecision.rotation.title),hint:t(i.wordDecision.rotation.hint),wrong:t(i.wordDecision.rotation.wrong)}}:{}),...(i.wordDecision.ruler?{ruler:{...i.wordDecision.ruler,title:t(i.wordDecision.ruler.title),startLabel:t(i.wordDecision.ruler.startLabel),markerLabel:t(i.wordDecision.ruler.markerLabel),...(i.wordDecision.ruler.emptyLabel?{emptyLabel:t(i.wordDecision.ruler.emptyLabel)}:{}),hint:t(i.wordDecision.ruler.hint),wrong:t(i.wordDecision.ruler.wrong)}}:{}),...(i.wordDecision.quantity?{quantity:{...i.wordDecision.quantity,title:t(i.wordDecision.quantity.title),unit:t(i.wordDecision.quantity.unit),pluralUnit:t(i.wordDecision.quantity.pluralUnit),hint:t(i.wordDecision.quantity.hint),wrong:t(i.wordDecision.quantity.wrong)}}:{}),...(i.wordDecision.recordSelection?{recordSelection:{...i.wordDecision.recordSelection,...(i.wordDecision.recordSelection.quote?{quote:t(i.wordDecision.recordSelection.quote)}:{}),title:t(i.wordDecision.recordSelection.title),prompt:t(i.wordDecision.recordSelection.prompt),hint:t(i.wordDecision.recordSelection.hint),wrong:t(i.wordDecision.recordSelection.wrong),rows:i.wordDecision.recordSelection.rows.map(row=>({...row,label:t(row.label),text:t(row.text)}))}}:{}),...(i.wordDecision.clock?{clock:{...i.wordDecision.clock,title:t(i.wordDecision.clock.title),days:i.wordDecision.clock.days.map(t) as [string,string],hint:t(i.wordDecision.clock.hint),wrong:t(i.wordDecision.clock.wrong)}}:{}),...(i.wordDecision.recordPaths?{recordPaths:i.wordDecision.recordPaths.map(p=>({...p,label:t(p.label),steps:p.steps.map(t)}))}:{}),...(i.wordDecision.art?{art:{...i.wordDecision.art,alt:t(i.wordDecision.art.alt),...(i.wordDecision.art.targets?{targets:i.wordDecision.art.targets.map(target=>({...target,label:t(target.label)}))}:{}),...(i.wordDecision.art.evidence?{evidence:i.wordDecision.art.evidence.map(e=>({...e,caption:t(e.caption),regions:e.regions.map(r=>({...r,label:t(r.label)}))}))}:{})}}:{})}}:{}),...(i.sourceSettings?{sourceSettings:{...i.sourceSettings,...(i.sourceSettings.labels?{labels:i.sourceSettings.labels.map(t) as [string,string]}:{}),title:t(i.sourceSettings.title),note:t(i.sourceSettings.note),rows:i.sourceSettings.rows.map(r=>({...r,...(r.route?{route:{from:t(r.route.from),targets:r.route.targets.map(t) as [string,string]}}:{}),label:t(r.label),reason:t(r.reason),wrong:t(r.wrong)}))}}:{}),...(i.sourceRecall?{sourceRecall:{...i.sourceRecall,title:t(i.sourceRecall.title),note:t(i.sourceRecall.note),words:i.sourceRecall.words.map(w=>({...w,cue:t(w.cue),answer:t(w.answer)}))}}:{}),...(i.sourceGap?{sourceGap:{...i.sourceGap,...(i.sourceGap.locationMap?{locationMap:{anchor:t(i.sourceGap.locationMap.anchor),marker:t(i.sourceGap.locationMap.marker)}}:{}),before:t(i.sourceGap.before),after:t(i.sourceGap.after),options:i.sourceGap.options.map(o=>({...o,text:t(o.text),reason:t(o.reason)}))}}:{}),...(i.calculation?{calculation:{...i.calculation,label:t(i.calculation.label),hint:t(i.calculation.hint),wrong:t(i.calculation.wrong)}}:{}),...(i.sourceArt?{sourceArt:{...i.sourceArt,alt:t(i.sourceArt.alt),choices:i.sourceArt.choices.map(c=>({...c,label:t(c.label),...(c.caption?{caption:t(c.caption)}:{})}))}}:{}),...(i.sourceTitle?{sourceTitle:t(i.sourceTitle)}:{}),...(i.evidenceLabels?{evidenceLabels:i.evidenceLabels.map(t)}:{}),...(i.sourceOrderLabels?{sourceOrderLabels:i.sourceOrderLabels.map(t)}:{}),label:t(i.label),prompt:t(i.prompt),answer:t(i.answer),reason:t(i.reason),hint:w.kind==='word-use'&&!i.wordDecision?`需要 ${t(i.answer).length} 个字符；首字母是 ${t(i.answer)[0]}。`:t(i.hint),...(i.usage?{usage:{...i.usage,left:t(i.usage.left),right:t(i.usage.right),object:t(i.usage.object),caption:t(i.usage.caption),alternatives:Object.fromEntries(Object.entries(i.usage.alternatives).map(([key,value])=>[t(key),value]))}}:{}),...(i.before!==undefined?{before:t(i.before)}:{}),...(i.after!==undefined?{after:t(i.after)}:{}),...(i.material?{material:t(i.material)}:{}),...(i.meaning?{meaning:t(i.meaning)}:{}),options:i.options?.map(o=>({...o,text:t(o.text),reason:t(o.reason)}))}))}
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
  if(i.readingPlan!==undefined&&(w.kind!=='compose'||i.readingPlan!==true))errors.push('Invalid reading plan');
  if(i.composeBrief!==undefined&&(w.kind!=='compose'||!validComposeBrief(i.composeBrief)))errors.push('Invalid compose brief')
  if(i.composeOrder!==undefined&&(w.kind!=='compose'||!validWordProcessOrder(i.composeOrder)))errors.push('Invalid compose order')
  if(i.composeArt!==undefined&&(w.kind!=='compose'||(!i.composeBrief&&!i.composeOrder)||!validComposeArt(i.composeArt)))errors.push('Invalid compose art')
  if(i.ownForms!==undefined&&(w.kind!=='word-use'||!Array.isArray(i.ownForms)||i.ownForms.length<2||i.ownForms.length>8||i.ownForms.some(form=>typeof form!=='string'||form.length>60||!/^[a-z]+(?:[-'][a-z]+)*$/.test(form))||new Set(i.ownForms).size!==i.ownForms.length||typeof i.answer!=='string'||!i.ownForms.includes(normalizedAnswer(i.answer))))errors.push('Invalid own-use word forms')
  const decision=i.wordDecision
  if(decision!==undefined&&(w.kind!=='word-use'||!decision||typeof decision.prompt!=='string'||!decision.prompt.trim()||decision.prompt!==decision.prompt.trim()||decision.prompt.length>140||!Array.isArray(i.options)||i.options.length<2||i.options.length>4||i.options.filter(o=>o.correct===true).length!==1||new Set(i.options.map(o=>o.id)).size!==i.options.length||new Set(i.options.map(o=>o.text)).size!==i.options.length||i.options.some(o=>typeof o.id!=='string'||!(/^[a-z][a-z0-9-]*$/).test(o.id)||typeof o.correct!=='boolean'||[o.text,o.reason].some(t=>typeof t!=='string'||!t.trim()||t!==t.trim()))||(decision.art!==undefined&&(!decision.art||(decision.art.assetRoot!==undefined&&!['assets','illustrations','illustrations-2','illustrations-3','illustrations-4','illustrations-5'].includes(decision.art.assetRoot))||(decision.art.format!==undefined&&!['jpg','png'].includes(decision.art.format))||typeof decision.art.asset!=='string'||!(/^[a-z0-9-]+$/).test(decision.art.asset)||typeof decision.art.alt!=='string'||!decision.art.alt.trim()))))errors.push('Invalid word decision')
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
  if(decision?.shadePanel!==undefined&&(w.kind!=='word-use'||!validWordShadePanel(decision.shadePanel)||decision.art||decision.depthLine||decision.waterPair||decision.processOrder||decision.queueMove||decision.shelfRoom||decision.fileDesk||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups||decision.quantity))errors.push('Invalid wall shade panel')
  if(decision?.rectangleRatio!==undefined&&(w.kind!=='word-use'||!validWordRectangleRatio(decision.rectangleRatio)||Object.entries(decision).some(([key,value])=>!['prompt','rectangleRatio','meaningFromRecords'].includes(key)&&value!==undefined)||decision.meaningFromRecords))errors.push('Invalid rectangleRatio')
  if(decision?.spotWings!==undefined&&(w.kind!=='word-use'||!validWordSpotWings(decision.spotWings)||Object.entries(decision).some(([key,value])=>!['prompt','spotWings','meaningFromRecords'].includes(key)&&value!==undefined)||decision.meaningFromRecords))errors.push('Invalid spotWings')
  if(decision?.wireOrder!==undefined&&(w.kind!=='word-use'||!validWordWireOrder(decision.wireOrder)||decision.art||decision.robotWave||decision.shadePanel||decision.depthLine||decision.waterPair||decision.processOrder||decision.queueMove||decision.shelfRoom||decision.fileDesk||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups||decision.quantity))errors.push('Invalid wire order')
  if(decision?.routeTraffic!==undefined&&(w.kind!=='word-use'||!validWordRouteTraffic(decision.routeTraffic)||Object.entries(decision).some(([key,value])=>!['prompt','routeTraffic','meaningFromRecords'].includes(key)&&value!==undefined)||decision.meaningFromRecords))errors.push('Invalid route traffic')
  if(decision?.stampPlacement!==undefined&&(w.kind!=='word-use'||!validWordStampPlacement(decision.stampPlacement)||!decision.art||Object.entries(decision).some(([key,value])=>!['prompt','stampPlacement','art'].includes(key)&&value!==undefined)))errors.push('Invalid stamp placement')
  if(decision?.eachItem!==undefined&&(w.kind!=='word-use'||!validWordEachItem(decision.eachItem)||Object.entries(decision).some(([key,value])=>!['prompt','eachItem','meaningFromRecords'].includes(key)&&value!==undefined)||decision.meaningFromRecords))errors.push('Invalid each-person allocation')
  if(decision?.busBudget!==undefined&&(w.kind!=='word-use'||!validWordBusBudget(decision.busBudget)||Object.entries(decision).some(([key,value])=>!['prompt','busBudget'].includes(key)&&value!==undefined)))errors.push('Invalid bus budget')
  if(decision?.paperUse!==undefined&&(w.kind!=='word-use'||!validWordPaperUse(decision.paperUse)||Object.entries(decision).some(([key,value])=>!['prompt','paperUse','meaningFromRecords'].includes(key)&&value!==undefined)||decision.meaningFromRecords))errors.push('Invalid paper use')
  if(decision?.pathSteps!==undefined&&(w.kind!=='word-use'||!validWordPathSteps(decision.pathSteps)||Object.entries(decision).some(([key,value])=>!['prompt','pathSteps','meaningFromRecords'].includes(key)&&value!==undefined)||decision.meaningFromRecords))errors.push('Invalid path steps')
  if(decision?.robotWave!==undefined&&(w.kind!=='word-use'||!validWordRobotWave(decision.robotWave)||decision.art||decision.shadePanel||decision.depthLine||decision.waterPair||decision.processOrder||decision.queueMove||decision.shelfRoom||decision.fileDesk||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups||decision.quantity))errors.push('Invalid robot wave')
  if(decision?.depthLine!==undefined&&(w.kind!=='word-use'||!validWordDepthLine(decision.depthLine)||decision.art||decision.waterPair||decision.processOrder||decision.queueMove||decision.shelfRoom||decision.fileDesk||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups||decision.quantity))errors.push('Invalid schematic depth line')
  if(decision?.waterPair!==undefined&&(w.kind!=='word-use'||!validWordWaterPair(decision.waterPair)||decision.art||decision.processOrder||decision.queueMove||decision.shelfRoom||decision.fileDesk||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups||decision.quantity))errors.push('Invalid schematic water pair')
  if(decision?.observe!==undefined&&(w.kind!=='word-use'||!validWordObserve(decision.observe)||!decision.art||Object.entries(decision).some(([key,value])=>!['prompt','observe','art'].includes(key)&&value!==undefined)))errors.push('Invalid stationary observation')
  if(decision?.molecule!==undefined&&(w.kind!=='word-use'||!validWordMolecule(decision.molecule)||Object.entries(decision).some(([key,value])=>!['prompt','molecule'].includes(key)&&value!==undefined)))errors.push('Invalid molecular composition')
  if(decision?.cart!==undefined&&(w.kind!=='word-use'||!validWordCart(decision.cart)||!decision.art||Object.entries(decision).some(([key,value])=>!['prompt','cart','art'].includes(key)&&value!==undefined)))errors.push('Invalid fictional cart action')
  if(decision?.pattern!==undefined&&(w.kind!=='word-use'||!validWordPattern(decision.pattern)||Object.entries(decision).some(([key,value])=>!['prompt','pattern'].includes(key)&&value!==undefined)))errors.push('Invalid shape-instance pattern')
  if(decision?.preference!==undefined&&(w.kind!=='word-use'||!validWordPreference(decision.preference)||Object.entries(decision).some(([key,value])=>!['prompt','preference'].includes(key)&&value!==undefined)))errors.push('Invalid preference roles')
  if(decision?.flash!==undefined&&(w.kind!=='word-use'||!validWordFlash(decision.flash)||Object.entries(decision).some(([key,value])=>!['prompt','flash'].includes(key)&&value!==undefined)))errors.push('Invalid flash roles')
  if(decision?.routeWeather!==undefined&&(w.kind!=='word-use'||!validWordRouteWeather(decision.routeWeather)||Object.entries(decision).some(([key,value])=>!['prompt','routeWeather'].includes(key)&&value!==undefined)))errors.push('Invalid routeWeather exercise')
  if(decision?.dottedRoute!==undefined&&(w.kind!=='word-use'||!validWordDottedRoute(decision.dottedRoute)||Object.entries(decision).some(([key,value])=>!['prompt','dottedRoute'].includes(key)&&value!==undefined)))errors.push('Invalid dottedRoute exercise')
  if(decision?.contributions!==undefined&&(w.kind!=='word-use'||!validWordContributions(decision.contributions)||Object.entries(decision).some(([key,value])=>!['prompt','contributions'].includes(key)&&value!==undefined)))errors.push('Invalid contributions exercise')
  if(decision?.curtainExit!==undefined&&(w.kind!=='word-use'||!validWordCurtainExit(decision.curtainExit)||!decision.art||Object.entries(decision).some(([key,value])=>!['prompt','curtainExit','art'].includes(key)&&value!==undefined)))errors.push('Invalid curtainExit exercise')
  if(decision?.riverImagine!==undefined&&(w.kind!=='word-use'||!validWordRiverImagine(decision.riverImagine)||!decision.art||Object.entries(decision).some(([key,value])=>!['prompt','riverImagine','art'].includes(key)&&value!==undefined)))errors.push('Invalid riverImagine exercise')
  if(decision?.guessScale!==undefined&&(w.kind!=='word-use'||!validWordGuessScale(decision.guessScale)||Object.entries(decision).some(([key,value])=>!['prompt','guessScale'].includes(key)&&value!==undefined)))errors.push('Invalid guessScale exercise')
  if(decision?.tornMap!==undefined&&(w.kind!=='word-use'||!validWordTornMap(decision.tornMap)||Object.entries(decision).some(([key,value])=>!['prompt','tornMap'].includes(key)&&value!==undefined)))errors.push('Invalid tornMap exercise')
  if(decision?.interestRoles!==undefined&&(w.kind!=='word-use'||!validWordInterestRoles(decision.interestRoles)||Object.entries(decision).some(([key,value])=>!['prompt','interestRoles'].includes(key)&&value!==undefined)))errors.push('Invalid interestRoles exercise')
  if(decision?.boxFit!==undefined&&(w.kind!=='word-use'||!validWordBoxFit(decision.boxFit)||Object.entries(decision).some(([key,value])=>!['prompt','boxFit'].includes(key)&&value!==undefined)))errors.push('Invalid boxFit exercise')
  if(decision?.uArticle!==undefined&&(w.kind!=='word-use'||!validWordUArticle(decision.uArticle)||Object.entries(decision).some(([key,value])=>!['prompt','uArticle'].includes(key)&&value!==undefined)))errors.push('Invalid uArticle exercise')
  if(decision?.jarChange!==undefined&&(w.kind!=='word-use'||!validWordJarChange(decision.jarChange)||Object.entries(decision).some(([key,value])=>!['prompt','jarChange','art'].includes(key)&&value!==undefined)))errors.push('Invalid jarChange exercise')
  if(decision?.doughEqual!==undefined&&(w.kind!=='word-use'||!validWordDoughEqual(decision.doughEqual)||Object.entries(decision).some(([key,value])=>!['prompt','doughEqual'].includes(key)&&value!==undefined)))errors.push('Invalid doughEqual exercise')
  if(decision?.leafSimilar!==undefined&&(w.kind!=='word-use'||!validWordLeafSimilar(decision.leafSimilar)||Object.entries(decision).some(([key,value])=>!['prompt','leafSimilar'].includes(key)&&value!==undefined)))errors.push('Invalid leafSimilar exercise')
  if(decision?.freeSunday!==undefined&&(w.kind!=='word-use'||!validWordFreeSunday(decision.freeSunday)||Object.entries(decision).some(([key,value])=>!['prompt','freeSunday'].includes(key)&&value!==undefined)))errors.push('Invalid freeSunday exercise')
  if(decision?.gateFirm!==undefined&&(w.kind!=='word-use'||!validWordGateFirm(decision.gateFirm)||Object.entries(decision).some(([key,value])=>!['prompt','gateFirm'].includes(key)&&value!==undefined)))errors.push('Invalid gateFirm exercise')
  if(decision?.entranceFacing!==undefined&&(w.kind!=='word-use'||!validWordEntranceFacing(decision.entranceFacing)||Object.entries(decision).some(([key,value])=>!['prompt','entranceFacing'].includes(key)&&value!==undefined)))errors.push('Invalid entranceFacing exercise')
  if(decision?.postRedaction!==undefined&&(w.kind!=='word-use'||!validWordPostRedaction(decision.postRedaction)||Object.entries(decision).some(([key,value])=>!['prompt','postRedaction'].includes(key)&&value!==undefined)))errors.push('Invalid postRedaction exercise')
  if(decision?.nearlyFinish!==undefined&&(w.kind!=='word-use'||!validWordNearlyFinish(decision.nearlyFinish)||Object.entries(decision).some(([key,value])=>!['prompt','nearlyFinish'].includes(key)&&value!==undefined)))errors.push('Invalid nearlyFinish exercise')
  if(decision?.exactAlignment!==undefined&&(w.kind!=='word-use'||!validWordExactAlignment(decision.exactAlignment)||Object.entries(decision).some(([key,value])=>!['prompt','exactAlignment'].includes(key)&&value!==undefined)))errors.push('Invalid exactAlignment exercise')
  if(decision?.gateCondition!==undefined&&(w.kind!=='word-use'||!validWordGateCondition(decision.gateCondition)||Object.entries(decision).some(([key,value])=>!['prompt','gateCondition'].includes(key)&&value!==undefined)))errors.push('Invalid gateCondition exercise')
  if(decision?.regularRepeat!==undefined&&(w.kind!=='word-use'||!validWordRegularRepeat(decision.regularRepeat)||Object.entries(decision).some(([key,value])=>!['prompt','regularRepeat'].includes(key)&&value!==undefined)))errors.push('Invalid regularRepeat exercise')
  if(decision?.drySeats!==undefined&&(w.kind!=='word-use'||!validWordDrySeats(decision.drySeats)||Object.entries(decision).some(([key,value])=>!['prompt','drySeats'].includes(key)&&value!==undefined)))errors.push('Invalid drySeats exercise')
  if(decision?.actionCount!==undefined&&(w.kind!=='word-use'||!validWordActionCount(decision.actionCount)||Object.entries(decision).some(([key,value])=>!['prompt','actionCount'].includes(key)&&value!==undefined)))errors.push('Invalid actionCount exercise')
  if(decision?.carbonDioxide!==undefined&&(w.kind!=='word-use'||!validWordCarbonDioxide(decision.carbonDioxide)||Object.entries(decision).some(([key,value])=>!['prompt','carbonDioxide'].includes(key)&&value!==undefined)))errors.push('Invalid carbonDioxide exercise')
  if(decision?.materialSort!==undefined&&(w.kind!=='word-use'||!validWordMaterialSort(decision.materialSort)||Object.entries(decision).some(([key,value])=>!['prompt','materialSort','art'].includes(key)&&value!==undefined)))errors.push('Invalid materialSort exercise')
  if(decision?.supportLinks!==undefined&&(w.kind!=='word-use'||!validWordSupportLinks(decision.supportLinks)||Object.entries(decision).some(([key,value])=>!['prompt','supportLinks'].includes(key)&&value!==undefined)))errors.push('Invalid supportLinks exercise')
  if(decision?.inlandRoute!==undefined&&(w.kind!=='word-use'||!validWordInlandRoute(decision.inlandRoute)||Object.entries(decision).some(([key,value])=>!['prompt','inlandRoute'].includes(key)&&value!==undefined)))errors.push('Invalid inlandRoute exercise')
  if(decision?.sustainableAnd!==undefined&&(w.kind!=='word-use'||!validWordSustainableAnd(decision.sustainableAnd)||Object.entries(decision).some(([key,value])=>!['prompt','sustainableAnd'].includes(key)&&value!==undefined)))errors.push('Invalid sustainableAnd exercise')
  if(decision?.processOrder!==undefined&&(w.kind!=='word-use'||!validWordProcessOrder(decision.processOrder)||decision.art||decision.queueMove||decision.shelfRoom||decision.fileDesk||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups||decision.quantity))errors.push('Invalid word process order')
  if(decision?.queueMove!==undefined&&(w.kind!=='word-use'||!validWordQueueMove(decision.queueMove)||decision.art||decision.shelfRoom||decision.fileDesk||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups))errors.push('Invalid queue length and movement task')
  if(decision?.shelfRoom!==undefined&&(w.kind!=='word-use'||!validWordShelfRoom(decision.shelfRoom)||decision.art||decision.fileDesk||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups))errors.push('Invalid shelf space task')
  if(decision?.fileDesk!==undefined&&(w.kind!=='word-use'||!validWordFileDesk(decision.fileDesk)||!decision.art||decision.art.pictureOnly||decision.titleArrow||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups))errors.push('Invalid file desk task')
  if(decision?.titleArrow!==undefined&&(w.kind!=='word-use'||!validWordTitleArrow(decision.titleArrow)||!decision.art||decision.art.pictureOnly||decision.fileDesk||decision.offlinePage||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups))errors.push('Invalid title arrow task')
  if(decision?.offlinePage!==undefined&&(w.kind!=='word-use'||!validWordOfflinePage(decision.offlinePage)||!decision.art||decision.art.pictureOnly||decision.recordSelection||decision.phoneMode||decision.printPages||decision.nameGroups))errors.push('Invalid offline page task')
  if(decision?.nameGroups!==undefined&&(w.kind!=='word-use'||!validWordNameGroups(decision.nameGroups)||decision.recordSelection||decision.phoneMode||decision.printPages||decision.art?.pictureOnly))errors.push('Invalid name grouping task')
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
  if(recall&&((w.kind==='compose'?(!i.composeBrief||!!i.composeOrder||i.sourceStyle!==undefined||!!i.sourceSettings||!!i.sourceArt||!!i.sourceGap||!!i.calculation):((i.evidenceGroups?.length??0)<2||i.sourceSettings||w.kind!=='proof'||i.sourceStyle!=='cards'||i.sourceOrder||i.sourceArt||i.sourceGap||i.calculation))||typeof recall.title!=='string'||!recall.title.trim()||typeof recall.note!=='string'||!recall.note.trim()||!Array.isArray(recall.words)||recall.words.length<2||recall.words.length>(w.kind==='compose'?5:4)||new Set(recall.words.map(x=>x?.id)).size!==recall.words.length||recall.words.some(x=>!x||typeof x.id!=='string'||!/^[a-z][a-z0-9-]*$/.test(x.id)||typeof x.cue!=='string'||!x.cue.trim()||x.cue.length>40||typeof x.answer!=='string'||!x.answer.trim()||x.answer!==x.answer.trim()||x.answer.length>40)))errors.push('Invalid recall exercise')
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
