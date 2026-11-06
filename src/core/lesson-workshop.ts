import {validComposeOcclusion,composeOcclusionKey,composeOcclusionMatch,composeOcclusionView,changeComposeOcclusion} from './compose-occlusion'
import type {ComposeOcclusion} from './compose-occlusion'
import {validComposeCoverage,composeCoverageKey,composeCoverageMatch,composeCoverageView,changeComposeCoverage} from './compose-coverage'
import type {ComposeCoverage} from './compose-coverage'
import {validComposeWatch,composeWatchKey,composeWatchPhotoKey,composeWatchMatch,composeWatchView,changeComposeWatch} from './compose-watch'
import type {ComposeWatch} from './compose-watch'
import {validComposeConditions,composeConditionsKey,composeConditionsMatch,composeConditionsView,changeComposeConditions} from './compose-conditions'
import type {ComposeConditions} from './compose-conditions'
import {validComposeTouches,composeTouchesKey,composeTouchesMatch,composeTouchesView,changeComposeTouches} from './compose-touches'
import type {ComposeTouches,ComposeTouchesView} from './compose-touches'
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
import {validWordUmbrellaUntil,wordUmbrellaUntilKey,wordUmbrellaUntilView,changeUmbrellaUntil,umbrellaUntilMatch as selectedUmbrellaUntilMatch} from './word-umbrella-until'
import type {WordUmbrellaUntil,WordUmbrellaUntilView} from './word-umbrella-until'
import {validWordLocalWool,wordLocalWoolKey,wordLocalWoolView,changeLocalWool,localWoolMatch as selectedLocalWoolMatch} from './word-local-wool'
import type {WordLocalWool,WordLocalWoolView} from './word-local-wool'
import {validWordCottonShirt,wordCottonShirtKey,wordCottonShirtView,changeCottonShirt,cottonShirtMatch as selectedCottonShirtMatch} from './word-cotton-shirt'
import type {WordCottonShirt,WordCottonShirtView} from './word-cotton-shirt'
import {validWordButtonMatch,wordButtonMatchKey,wordButtonMatchView,changeButtonMatch,buttonMatchMatch as selectedButtonMatchMatch} from './word-button-match'
import type {WordButtonMatch,WordButtonMatchView} from './word-button-match'
import {validWordGloveFit,wordGloveFitKey,wordGloveFitView,changeGloveFit,gloveFitMatch as selectedGloveFitMatch} from './word-glove-fit'
import type {WordGloveFit,WordGloveFitView} from './word-glove-fit'
import {validWordHelmetAsk,wordHelmetAskKey,wordHelmetAskView,changeHelmetAsk,helmetAskMatch as selectedHelmetAskMatch} from './word-helmet-ask'
import type {WordHelmetAsk,WordHelmetAskView} from './word-helmet-ask'
import {validWordZipState,wordZipStateKey,wordZipStateView,changeZipState,zipStateMatch as selectedZipStateMatch} from './word-zip-state'
import type {WordZipState,WordZipStateView} from './word-zip-state'
import {validWordTicketPocket,wordTicketPocketKey,wordTicketPocketView,changeTicketPocket,ticketPocketMatch as selectedTicketPocketMatch} from './word-ticket-pocket'
import type {WordTicketPocket,WordTicketPocketView} from './word-ticket-pocket'
import {validWordBeltSupport,wordBeltSupportKey,wordBeltSupportView,changeBeltSupport,beltSupportMatch as selectedBeltSupportMatch} from './word-belt-support'
import type {WordBeltSupport,WordBeltSupportView} from './word-belt-support'
import {validWordGloveFound,wordGloveFoundKey,wordGloveFoundView,changeGloveFound,gloveFoundMatch as selectedGloveFoundMatch} from './word-glove-found'
import type {WordGloveFound,WordGloveFoundView} from './word-glove-found'
import {validWordScarfWrap,wordScarfWrapKey,wordScarfWrapView,changeScarfWrap,scarfWrapMatch as selectedScarfWrapMatch} from './word-scarf-wrap'
import type {WordScarfWrap,WordScarfWrapView} from './word-scarf-wrap'
import {validWordCapInto,wordCapIntoKey,wordCapIntoView,changeCapInto,capIntoMatch as selectedCapIntoMatch} from './word-cap-into'
import type {WordCapInto,WordCapIntoView} from './word-cap-into'
import {validWordSlipperUnder,wordSlipperUnderKey,wordSlipperUnderView,changeSlipperUnder,slipperUnderMatch as selectedSlipperUnderMatch} from './word-slipper-under'
import type {WordSlipperUnder,WordSlipperUnderView} from './word-slipper-under'
import {validWordBootMud,wordBootMudKey,wordBootMudView,changeBootMud,bootMudMatch as selectedBootMudMatch} from './word-boot-mud'
import type {WordBootMud,WordBootMudView} from './word-boot-mud'
import {validWordLeftShoeStone,wordLeftShoeStoneKey,wordLeftShoeStoneView,changeLeftShoeStone,leftShoeStoneMatch as selectedLeftShoeStoneMatch} from './word-left-shoe-stone'
import type {WordLeftShoeStone,WordLeftShoeStoneView} from './word-left-shoe-stone'
import {validWordStageSuit,wordStageSuitKey,wordStageSuitView,changeStageSuit,stageSuitMatch as selectedStageSuitMatch} from './word-stage-suit'
import type {WordStageSuit,WordStageSuitView} from './word-stage-suit'
import {validWordCurtainDress,wordCurtainDressKey,wordCurtainDressView,changeCurtainDress,curtainDressMatch as selectedCurtainDressMatch} from './word-curtain-dress'
import type {WordCurtainDress,WordCurtainDressView} from './word-curtain-dress'
import {validWordHiddenPocket,wordHiddenPocketKey,wordHiddenPocketView,changeHiddenPocket,hiddenPocketMatch as selectedHiddenPocketMatch} from './word-hidden-pocket'
import type {WordHiddenPocket,WordHiddenPocketView} from './word-hidden-pocket'
import {validWordCyclingLength,wordCyclingLengthKey,wordCyclingLengthView,changeCyclingLength,cyclingLengthMatch as selectedCyclingLengthMatch} from './word-cycling-length'
import type {WordCyclingLength,WordCyclingLengthView} from './word-cycling-length'
import {validWordChairBack,wordChairBackKey,wordChairBackView,changeChairBack,chairBackMatch as selectedChairBackMatch} from './word-chair-back'
import type {WordChairBack,WordChairBackView} from './word-chair-back'
import {validWordWoolWarm,wordWoolWarmKey,wordWoolWarmView,changeWoolWarm,woolWarmMatch as selectedWoolWarmMatch} from './word-wool-warm'
import type {WordWoolWarm,WordWoolWarmView} from './word-wool-warm'
import {validWordHoodScope,wordHoodScopeKey,wordHoodScopeView,changeHoodScope,hoodScopeMatch as selectedHoodScopeMatch} from './word-hood-scope'
import type {WordHoodScope,WordHoodScopeView} from './word-hood-scope'
import {validWordPlainFabric,wordPlainFabricKey,wordPlainFabricView,changePlainFabric,plainFabricMatch as selectedPlainFabricMatch} from './word-plain-fabric'
import type {WordPlainFabric,WordPlainFabricView} from './word-plain-fabric'
import {validWordButtonDetail,wordButtonDetailKey,wordButtonDetailView,changeButtonDetail,buttonDetailMatch as selectedButtonDetailMatch} from './word-button-detail'
import type {WordButtonDetail,WordButtonDetailView} from './word-button-detail'
import {validWordClothesWindow,wordClothesWindowKey,wordClothesWindowView,changeClothesWindow,clothesWindowMatch as selectedClothesWindowMatch} from './word-clothes-window'
import type {WordClothesWindow,WordClothesWindowView} from './word-clothes-window'
import {validWordJamJar,wordJamJarKey,wordJamJarView,changeJamJar,jamJarMatch as selectedJamJarMatch} from './word-jam-jar'
import type {WordJamJar,WordJamJarView} from './word-jam-jar'
import {validWordEachNapkin,wordEachNapkinKey,wordEachNapkinView,changeEachNapkin,eachNapkinMatch as selectedEachNapkinMatch} from './word-each-napkin'
import type {WordEachNapkin,WordEachNapkinView} from './word-each-napkin'
import {validWordStickThrough,wordStickThroughKey,wordStickThroughView,changeStickThrough,stickThroughMatch as selectedStickThroughMatch} from './word-stick-through'
import type {WordStickThrough,WordStickThroughView} from './word-stick-through'
import {validWordSpoonLength,wordSpoonLengthKey,wordSpoonLengthView,changeSpoonLength,spoonLengthMatch as selectedSpoonLengthMatch} from './word-spoon-length'
import type {WordSpoonLength,WordSpoonLengthView} from './word-spoon-length'
import {validWordUtensilFacing,wordUtensilFacingKey,wordUtensilFacingView,changeUtensilFacing,utensilFacingMatch as selectedUtensilFacingMatch} from './word-utensil-facing'
import type {WordUtensilFacing,WordUtensilFacingView} from './word-utensil-facing'
import {validWordVesselDetail,wordVesselDetailKey,wordVesselDetailView,changeVesselDetail,vesselDetailMatch as selectedVesselDetailMatch} from './word-vessel-detail'
import type {WordVesselDetail,WordVesselDetailView} from './word-vessel-detail'
import {validWordNeededFill,wordNeededFillKey,wordNeededFillView,changeNeededFill,neededFillMatch as selectedNeededFillMatch} from './word-needed-fill'
import type {WordNeededFill,WordNeededFillView} from './word-needed-fill'
import {validWordTapWhile,wordTapWhileKey,wordTapWhileView,changeTapWhile,tapWhileMatch as selectedTapWhileMatch} from './word-tap-while'
import type {WordTapWhile,WordTapWhileView} from './word-tap-while'
import {validWordKitchenPlace,wordKitchenPlaceKey,wordKitchenPlaceView,changeKitchenPlace,kitchenPlaceMatch as selectedKitchenPlaceMatch} from './word-kitchen-place'
import type {WordKitchenPlace,WordKitchenPlaceView} from './word-kitchen-place'
import {validWordKitchenCondition,wordKitchenConditionKey,wordKitchenConditionView,changeKitchenCondition,kitchenConditionMatch as selectedKitchenConditionMatch} from './word-kitchen-condition'
import type {WordKitchenCondition,WordKitchenConditionView} from './word-kitchen-condition'
import {validWordTableDust,wordTableDustKey,wordTableDustView,changeTableDust,tableDustMatch as selectedTableDustMatch} from './word-table-dust'
import type {WordTableDust,WordTableDustView} from './word-table-dust'
import {validWordMainRole,wordMainRoleKey,wordMainRoleView,changeMainRole,mainRoleMatch as selectedMainRoleMatch} from './word-main-role'
import type {WordMainRole,WordMainRoleView} from './word-main-role'
import {validWordLemonSlice,wordLemonSliceKey,wordLemonSliceView,changeLemonSlice,lemonSliceMatch as selectedLemonSliceMatch} from './word-lemon-slice'
import type {WordLemonSlice,WordLemonSliceView} from './word-lemon-slice'
import {validWordBananaOver,wordBananaOverKey,wordBananaOverView,changeBananaOver,bananaOverMatch as selectedBananaOverMatch} from './word-banana-over'
import type {WordBananaOver,WordBananaOverView} from './word-banana-over'
import {validWordTextureResult,wordTextureResultKey,wordTextureResultView,changeTextureResult,textureResultMatch as selectedTextureResultMatch} from './word-texture-result'
import type {WordTextureResult,WordTextureResultView} from './word-texture-result'
import {validWordMixBowl,wordMixBowlKey,wordMixBowlView,changeMixBowl,mixBowlMatch as selectedMixBowlMatch} from './word-mix-bowl'
import type {WordMixBowl,WordMixBowlView} from './word-mix-bowl'
import {validWordGentleHeat,wordGentleHeatKey,wordGentleHeatView,changeGentleHeat,gentleHeatMatch as selectedGentleHeatMatch} from './word-gentle-heat'
import type {WordGentleHeat,WordGentleHeatView} from './word-gentle-heat'
import {validWordSteamCover,wordSteamCoverKey,wordSteamCoverView,changeSteamCover,steamCoverMatch as selectedSteamCoverMatch} from './word-steam-cover'
import type {WordSteamCover,WordSteamCoverView} from './word-steam-cover'
import {validWordCookingEndpoint,wordCookingEndpointKey,wordCookingEndpointView,changeCookingEndpoint,cookingEndpointMatch as selectedCookingEndpointMatch} from './word-cooking-endpoint'
import type {WordCookingEndpoint,WordCookingEndpointView} from './word-cooking-endpoint'
import {validWordAppleRemoval,wordAppleRemovalKey,wordAppleRemovalView,changeAppleRemoval,appleRemovalMatch as selectedAppleRemovalMatch} from './word-apple-removal'
import type {WordAppleRemoval,WordAppleRemovalView} from './word-apple-removal'
import {validWordRawBoard,wordRawBoardKey,wordRawBoardView,changeRawBoard,rawBoardMatch as selectedRawBoardMatch} from './word-raw-board'
import type {WordRawBoard,WordRawBoardView} from './word-raw-board'
import {validWordRipeNow,wordRipeNowKey,wordRipeNowView,changeRipeNow,ripeNowMatch as selectedRipeNowMatch} from './word-ripe-now'
import type {WordRipeNow,WordRipeNowView} from './word-ripe-now'
import {validWordTasteScope,wordTasteScopeKey,wordTasteScopeView,changeTasteScope,tasteScopeMatch as selectedTasteScopeMatch} from './word-taste-scope'
import type {WordTasteScope,WordTasteScopeView} from './word-taste-scope'
import {validWordHeavyForOne,wordHeavyForOneKey,wordHeavyForOneView,changeHeavyForOne,heavyForOneMatch as selectedHeavyForOneMatch} from './word-heavy-for-one'
import type {WordHeavyForOne,WordHeavyForOneView} from './word-heavy-for-one'
import {validWordFlavourSense,wordFlavourSenseKey,wordFlavourSenseView,changeFlavourSense,flavourSenseMatch as selectedFlavourSenseMatch} from './word-flavour-sense'
import type {WordFlavourSense,WordFlavourSenseView} from './word-flavour-sense'
import {validWordFoodCondition,wordFoodConditionKey,wordFoodConditionView,changeFoodCondition,foodConditionMatch as selectedFoodConditionMatch} from './word-food-condition'
import type {WordFoodCondition,WordFoodConditionView} from './word-food-condition'
import {validWordPeaMotion,wordPeaMotionKey,wordPeaMotionView,changePeaMotion,peaMotionMatch as selectedPeaMotionMatch} from './word-pea-motion'
import type {WordPeaMotion,WordPeaMotionView} from './word-pea-motion'
import {validWordVegetableEffect,wordVegetableEffectKey,wordVegetableEffectView,changeVegetableEffect,vegetableEffectMatch as selectedVegetableEffectMatch} from './word-vegetable-effect'
import type {WordVegetableEffect,WordVegetableEffectView} from './word-vegetable-effect'
import {validWordVegetablePrep,wordVegetablePrepKey,wordVegetablePrepView,changeVegetablePrep,vegetablePrepMatch as selectedVegetablePrepMatch} from './word-vegetable-prep'
import type {WordVegetablePrep,WordVegetablePrepView} from './word-vegetable-prep'
import {validWordSoftCentre,wordSoftCentreKey,wordSoftCentreView,changeSoftCentre,softCentreMatch as selectedSoftCentreMatch} from './word-soft-centre'
import type {WordSoftCentre,WordSoftCentreView} from './word-soft-centre'
import {validWordStoneSides,wordStoneSidesKey,wordStoneSidesView,changeStoneSides,stoneSidesMatch as selectedStoneSidesMatch} from './word-stone-sides'
import type {WordStoneSides,WordStoneSidesView} from './word-stone-sides'
import {validWordFruitScene,wordFruitSceneKey,wordFruitSceneView,changeFruitScene,fruitSceneMatch as selectedFruitSceneMatch} from './word-fruit-scene'
import type {WordFruitScene,WordFruitSceneView} from './word-fruit-scene'
import {validWordFruitFall,wordFruitFallKey,wordFruitFallView,changeFruitFall,fruitFallMatch as selectedFruitFallMatch} from './word-fruit-fall'
import type {WordFruitFall,WordFruitFallView} from './word-fruit-fall'
import {validWordContainerFit,wordContainerFitKey,wordContainerFitView,changeContainerFit,containerFitMatch as selectedContainerFitMatch} from './word-container-fit'
import type {WordContainerFit,WordContainerFitView} from './word-container-fit'
import {validWordFruitPrep,wordFruitPrepKey,wordFruitPrepView,changeFruitPrep,fruitPrepMatch as selectedFruitPrepMatch} from './word-fruit-prep'
import type {WordFruitPrep,WordFruitPrepView} from './word-fruit-prep'
import {validWordFoodChange,wordFoodChangeKey,wordFoodChangeView,changeFoodChange,foodChangeMatch as selectedFoodChangeMatch} from './word-food-change'
import type {WordFoodChange,WordFoodChangeView} from './word-food-change'
import {validWordFoodLayer,wordFoodLayerKey,wordFoodLayerView,changeFoodLayer,foodLayerMatch as selectedFoodLayerMatch} from './word-food-layer'
import type {WordFoodLayer,WordFoodLayerView} from './word-food-layer'
import {validWordRecipeLess,wordRecipeLessKey,wordRecipeLessView,changeRecipeLess,recipeLessMatch as selectedRecipeLessMatch} from './word-recipe-less'
import type {WordRecipeLess,WordRecipeLessView} from './word-recipe-less'
import {validWordFoodPurpose,wordFoodPurposeKey,wordFoodPurposeView,changeFoodPurpose,foodPurposeMatch as selectedFoodPurposeMatch} from './word-food-purpose'
import type {WordFoodPurpose,WordFoodPurposeView} from './word-food-purpose'
import {validWordFoodPairing,wordFoodPairingKey,wordFoodPairingView,changeFoodPairing,foodPairingMatch as selectedFoodPairingMatch} from './word-food-pairing'
import type {WordFoodPairing,WordFoodPairingView} from './word-food-pairing'
import {validWordFoodReturn,wordFoodReturnKey,wordFoodReturnView,changeFoodReturn,foodReturnMatch as selectedFoodReturnMatch} from './word-food-return'
import type {WordFoodReturn,WordFoodReturnView} from './word-food-return'
import {validWordFoodNoun,wordFoodNounKey,wordFoodNounView,changeFoodNoun,foodNounMatch as selectedFoodNounMatch} from './word-food-noun'
import type {WordFoodNoun,WordFoodNounView} from './word-food-noun'
import {validWordFoodExtent,wordFoodExtentKey,wordFoodExtentView,changeFoodExtent,foodExtentMatch as selectedFoodExtentMatch} from './word-food-extent'
import type {WordFoodExtent,WordFoodExtentView} from './word-food-extent'
import {validWordNearBefore,wordNearBeforeKey,wordNearBeforeView,changeNearBefore,nearBeforeMatch as selectedNearBeforeMatch} from './word-near-before'
import type {WordNearBefore,WordNearBeforeView} from './word-near-before'
import {validWordRemainingTin,wordRemainingTinKey,wordRemainingTinView,changeRemainingTin,remainingTinMatch as selectedRemainingTinMatch} from './word-remaining-tin'
import type {WordRemainingTin,WordRemainingTinView} from './word-remaining-tin'
import {validWordFoodRoles,wordFoodRolesKey,wordFoodRolesView,changeFoodRoles,foodRolesMatch as selectedFoodRolesMatch} from './word-food-roles'
import type {WordFoodRoles,WordFoodRolesView} from './word-food-roles'
import {validWordNoodleFall,wordNoodleFallKey,wordNoodleFallView,changeNoodleFall,noodleFallMatch as selectedNoodleFallMatch} from './word-noodle-fall'
import type {WordNoodleFall,WordNoodleFallView} from './word-noodle-fall'
import {validWordFoodPortions,wordFoodPortionsKey,wordFoodPortionsView,changeFoodPortions,foodPortionsMatch as selectedFoodPortionsMatch} from './word-food-portions'
import type {WordFoodPortions,WordFoodPortionsView} from './word-food-portions'
import {validWordMealReadiness,wordMealReadinessKey,wordMealReadinessView,changeMealReadiness,mealReadinessMatch as selectedMealReadinessMatch} from './word-meal-readiness'
import type {WordMealReadiness,WordMealReadinessView} from './word-meal-readiness'
import {validWordFoodSeparation,wordFoodSeparationKey,wordFoodSeparationView,changeFoodSeparation,foodSeparationMatch as selectedFoodSeparationMatch} from './word-food-separation'
import type {WordFoodSeparation,WordFoodSeparationView} from './word-food-separation'
import {validWordCornerFold,wordCornerFoldKey,wordCornerFoldView,changeCornerFold,cornerFoldMatch as selectedCornerFoldMatch} from './word-corner-fold'
import type {WordCornerFold,WordCornerFoldView} from './word-corner-fold'
import {validWordClothPieces,wordClothPiecesKey,wordClothPiecesView,changeClothPieces,clothPiecesMatch as selectedClothPiecesMatch} from './word-cloth-pieces'
import type {WordClothPieces,WordClothPiecesView} from './word-cloth-pieces'
import {validWordArmPose,wordArmPoseKey,wordArmPoseView,changeArmPose,armPoseMatch as selectedArmPoseMatch} from './word-arm-pose'
import type {WordArmPose,WordArmPoseView} from './word-arm-pose'
import {validWordLineIntersection,wordLineIntersectionKey,wordLineIntersectionView,changeLineIntersection,lineIntersectionMatch as selectedLineIntersectionMatch} from './word-line-intersection'
import type {WordLineIntersection,WordLineIntersectionView} from './word-line-intersection'
import {validWordEntrySequence,wordEntrySequenceKey,wordEntrySequenceView,changeEntrySequence,entrySequenceMatch as selectedEntrySequenceMatch} from './word-entry-sequence'
import type {WordEntrySequence,WordEntrySequenceView} from './word-entry-sequence'
import {validWordActionGoal,wordActionGoalKey,wordActionGoalView,changeActionGoal,actionGoalMatch as selectedActionGoalMatch} from './word-action-goal'
import type {WordActionGoal,WordActionGoalView} from './word-action-goal'
import {validWordEveryoneArrived,wordEveryoneArrivedKey,wordEveryoneArrivedView,changeEveryoneArrived,everyoneArrivedMatch as selectedEveryoneArrivedMatch} from './word-everyone-arrived'
import type {WordEveryoneArrived,WordEveryoneArrivedView} from './word-everyone-arrived'
import {validWordForceDirection,wordForceDirectionKey,wordForceDirectionView,changeForceDirection,forceDirectionMatch as selectedForceDirectionMatch} from './word-force-direction'
import type {WordForceDirection,WordForceDirectionView} from './word-force-direction'
import {validWordPositionInstruction,wordPositionInstructionKey,wordPositionInstructionView,changePositionInstruction,positionInstructionMatch as selectedPositionInstructionMatch} from './word-position-instruction'
import type {WordPositionInstruction,WordPositionInstructionView} from './word-position-instruction'
import {validWordMethodDirection,wordMethodDirectionKey,wordMethodDirectionView,changeMethodDirection,methodDirectionMatch as selectedMethodDirectionMatch} from './word-method-direction'
import type {WordMethodDirection,WordMethodDirectionView} from './word-method-direction'
import {validWordSenseFrame,wordSenseFrameKey,wordSenseFrameView,changeSenseFrame,senseFrameMatch as selectedSenseFrameMatch} from './word-sense-frame'
import type {WordSenseFrame,WordSenseFrameView} from './word-sense-frame'
import {validWordReportFrame,wordReportFrameKey,wordReportFrameView,changeReportFrame,reportFrameMatch as selectedReportFrameMatch} from './word-report-frame'
import type {WordReportFrame,WordReportFrameView} from './word-report-frame'
import {validWordPlantNeeds,wordPlantNeedsKey,wordPlantNeedsView,changePlantNeeds,plantNeedsMatch as selectedPlantNeedsMatch} from './word-plant-needs'
import type {WordPlantNeeds,WordPlantNeedsView} from './word-plant-needs'
import {validWordLidCoverage,wordLidCoverageKey,wordLidCoverageView,changeLidCoverage,lidCoverageMatch as selectedLidCoverageMatch} from './word-lid-coverage'
import type {WordLidCoverage,WordLidCoverageView} from './word-lid-coverage'
import {validWordColourAllocation,wordColourAllocationKey,wordColourAllocationView,changeColourAllocation,colourAllocationMatch as selectedColourAllocationMatch} from './word-colour-allocation'
import type {WordColourAllocation,WordColourAllocationView} from './word-colour-allocation'
import {validWordSpeedMeaning,wordSpeedMeaningKey,wordSpeedMeaningView,changeSpeedMeaning,speedMeaningMatch as selectedSpeedMeaningMatch} from './word-speed-meaning'
import type {WordSpeedMeaning,WordSpeedMeaningView} from './word-speed-meaning'
import {validWordTimeScope,wordTimeScopeKey,wordTimeScopeView,changeTimeScope,timeScopeMatch as selectedTimeScopeMatch} from './word-time-scope'
import type {WordTimeScope,WordTimeScopeView} from './word-time-scope'
import {validWordRouteFrame,wordRouteFrameKey,wordRouteFrameView,changeRouteFrame,routeFrameMatch as selectedRouteFrameMatch} from './word-route-frame'
import type {WordRouteFrame,WordRouteFrameView} from './word-route-frame'
import {validWordRelationScene,wordRelationSceneKey,wordRelationSceneView,changeRelationScene,relationSceneMatch as selectedRelationSceneMatch} from './word-relation-scene'
import type {WordRelationScene,WordRelationSceneView} from './word-relation-scene'
import {validWordSpatialFrame,wordSpatialFrameKey,wordSpatialFrameView,changeSpatialFrame,spatialFrameMatch as selectedSpatialFrameMatch} from './word-spatial-frame'
import type {WordSpatialFrame,WordSpatialFrameView} from './word-spatial-frame'
import {validWordPathRole,wordPathRoleKey,wordPathRoleView,changePathRole,pathRoleMatch as selectedPathRoleMatch} from './word-path-role'
import type {WordPathRole,WordPathRoleView} from './word-path-role'
import {validWordZeroGroup,wordZeroGroupKey,wordZeroGroupView,changeZeroGroup,zeroGroupMatch as selectedZeroGroupMatch} from './word-zero-group'
import type {WordZeroGroup,WordZeroGroupView} from './word-zero-group'
import {validWordAlmostLevel,wordAlmostLevelKey,wordAlmostLevelView,changeAlmostLevel,almostLevelMatch as selectedAlmostLevelMatch} from './word-almost-level'
import type {WordAlmostLevel,WordAlmostLevelView} from './word-almost-level'
import {validWordWidthFit,wordWidthFitKey,wordWidthFitView,changeWidthFit,widthFitMatch as selectedWidthFitMatch} from './word-width-fit'
import type {WordWidthFit,WordWidthFitView} from './word-width-fit'
import {validWordOverlap,wordOverlapKey,wordOverlapView,changeOverlap,overlapMatches as selectedOverlapMatch} from './word-overlap'
import type {WordOverlap,WordOverlapView} from './word-overlap'
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
export interface WordDecision {umbrellaUntil?:WordUmbrellaUntil;localWool?:WordLocalWool;cottonShirt?:WordCottonShirt;buttonMatch?:WordButtonMatch;gloveFit?:WordGloveFit;helmetAsk?:WordHelmetAsk;zipState?:WordZipState;ticketPocket?:WordTicketPocket;beltSupport?:WordBeltSupport;gloveFound?:WordGloveFound;scarfWrap?:WordScarfWrap;capInto?:WordCapInto;slipperUnder?:WordSlipperUnder;bootMud?:WordBootMud;leftShoeStone?:WordLeftShoeStone;stageSuit?:WordStageSuit;curtainDress?:WordCurtainDress;hiddenPocket?:WordHiddenPocket;cyclingLength?:WordCyclingLength;chairBack?:WordChairBack;woolWarm?:WordWoolWarm;hoodScope?:WordHoodScope;plainFabric?:WordPlainFabric;buttonDetail?:WordButtonDetail;clothesWindow?:WordClothesWindow;jamJar?:WordJamJar;eachNapkin?:WordEachNapkin;stickThrough?:WordStickThrough;spoonLength?:WordSpoonLength;utensilFacing?:WordUtensilFacing;vesselDetail?:WordVesselDetail;neededFill?:WordNeededFill;tapWhile?:WordTapWhile;kitchenPlace?:WordKitchenPlace;kitchenCondition?:WordKitchenCondition;tableDust?:WordTableDust;mainRole?:WordMainRole;lemonSlice?:WordLemonSlice;bananaOver?:WordBananaOver;textureResult?:WordTextureResult;mixBowl?:WordMixBowl;gentleHeat?:WordGentleHeat;steamCover?:WordSteamCover;cookingEndpoint?:WordCookingEndpoint;appleRemoval?:WordAppleRemoval;rawBoard?:WordRawBoard;ripeNow?:WordRipeNow;tasteScope?:WordTasteScope;heavyForOne?:WordHeavyForOne;flavourSense?:WordFlavourSense;foodCondition?:WordFoodCondition;peaMotion?:WordPeaMotion;vegetableEffect?:WordVegetableEffect;vegetablePrep?:WordVegetablePrep;softCentre?:WordSoftCentre;stoneSides?:WordStoneSides;fruitScene?:WordFruitScene;fruitFall?:WordFruitFall;containerFit?:WordContainerFit;fruitPrep?:WordFruitPrep;foodChange?:WordFoodChange;foodLayer?:WordFoodLayer;recipeLess?:WordRecipeLess;foodPurpose?:WordFoodPurpose;foodPairing?:WordFoodPairing;foodReturn?:WordFoodReturn;foodNoun?:WordFoodNoun;foodExtent?:WordFoodExtent;nearBefore?:WordNearBefore;remainingTin?:WordRemainingTin;foodRoles?:WordFoodRoles;noodleFall?:WordNoodleFall;foodPortions?:WordFoodPortions;mealReadiness?:WordMealReadiness;foodSeparation?:WordFoodSeparation;cornerFold?:WordCornerFold;clothPieces?:WordClothPieces;armPose?:WordArmPose;lineIntersection?:WordLineIntersection;entrySequence?:WordEntrySequence;actionGoal?:WordActionGoal;everyoneArrived?:WordEveryoneArrived;forceDirection?:WordForceDirection;positionInstruction?:WordPositionInstruction;methodDirection?:WordMethodDirection;senseFrame?:WordSenseFrame;reportFrame?:WordReportFrame;plantNeeds?:WordPlantNeeds;lidCoverage?:WordLidCoverage;colourAllocation?:WordColourAllocation;speedMeaning?:WordSpeedMeaning;timeScope?:WordTimeScope;routeFrame?:WordRouteFrame;relationScene?:WordRelationScene;spatialFrame?:WordSpatialFrame;pathRole?:WordPathRole;zeroGroup?:WordZeroGroup;almostLevel?:WordAlmostLevel;widthFit?:WordWidthFit;overlap?:WordOverlap;sustainableAnd?:WordSustainableAnd;inlandRoute?:WordInlandRoute;supportLinks?:WordSupportLinks;materialSort?:WordMaterialSort;carbonDioxide?:WordCarbonDioxide;actionCount?:WordActionCount;drySeats?:WordDrySeats;regularRepeat?:WordRegularRepeat;gateCondition?:WordGateCondition;exactAlignment?:WordExactAlignment;nearlyFinish?:WordNearlyFinish;postRedaction?:WordPostRedaction;entranceFacing?:WordEntranceFacing;gateFirm?:WordGateFirm;freeSunday?:WordFreeSunday;leafSimilar?:WordLeafSimilar;doughEqual?:WordDoughEqual;jarChange?:WordJarChange;uArticle?:WordUArticle;boxFit?:WordBoxFit;interestRoles?:WordInterestRoles;tornMap?:WordTornMap;guessScale?:WordGuessScale;riverImagine?:WordRiverImagine;curtainExit?:WordCurtainExit;contributions?:WordContributions;dottedRoute?:WordDottedRoute;routeWeather?:WordRouteWeather;flash?:WordFlash;preference?:WordPreference;pattern?:WordPattern;cart?:WordCart;molecule?:WordMolecule;observe?:WordObserve;busBudget?:WordBusBudget;stampPlacement?:WordStampPlacement;eachItem?:WordEachItem;routeTraffic?:WordRouteTraffic;paperUse?:WordPaperUse;pathSteps?:WordPathSteps;rectangleRatio?:WordRectangleRatio;spotWings?:WordSpotWings;wireOrder?:WordWireOrder;robotWave?:WordRobotWave;shadePanel?:WordShadePanel;depthLine?:WordDepthLine;waterPair?:WordWaterPair;processOrder?:WordProcessOrder;queueMove?:WordQueueMove;shelfRoom?:WordShelfRoom;fileDesk?:WordFileDesk;titleArrow?:WordTitleArrow;offlinePage?:WordOfflinePage;nameGroups?:WordNameGroups;phoneMode?:WordPhoneMode;printPages?:WordPrintPages;sources?:WordSources;reportedChange?:WordReportedChange;chance?:WordChance;dailyWalk?:WordDailyWalk;boat?:WordBoat;shift?:WordFeelingShift;provision?:WordProvision;until?:WordUntil;thermal?:WordThermal;meaningFromRecords?:true;climate?:WordClimate;daylight?:WordDaylight;weather?:WordWeather;door?:WordDoor;prompt:string;clock?:WordClock;quantity?:WordQuantity;ruler?:WordRuler;rotation?:WordRotation;fraction?:WordFraction;recordSelection?:WordRecordSelection;recordPaths?:WordRecordPath[];art?:{pictureOnly?:true;assetRoot?:'assets'|'illustrations'|'illustrations-2'|'illustrations-3'|'illustrations-4'|'illustrations-5'|'illustrations-6'|'illustrations-7'|'illustrations-8';format?:'jpg'|'png';asset:string;alt:string;targets?:WordPictureTarget[];evidence?:WordEvidence[]}}
export interface ComposeArt {asset:string;assetRoot:'illustrations-5'|'illustrations-6'|'illustrations-7';format:'jpg';alt:string;caption:string;frames?:2|3;frameShape?:'square'|'wide'}
const validComposeArt=(v:unknown):v is ComposeArt=>{if(!v||typeof v!=='object'||Array.isArray(v))return false;const a=v as Record<string,unknown>;return Object.keys(a).every(k=>['asset','assetRoot','format','alt','caption','frames','frameShape'].includes(k))&&typeof a.asset==='string'&&/^[a-z][a-z0-9-]{0,79}$/.test(a.asset)&&['illustrations-5','illustrations-6','illustrations-7'].includes(a.assetRoot as string)&&a.format==='jpg'&&typeof a.alt==='string'&&!!a.alt.trim()&&a.alt.length<=240&&typeof a.caption==='string'&&!!a.caption.trim()&&a.caption.length<=200&&((a.frames===2&&a.frameShape==='wide')||((a.frames===undefined||a.frames===3)&&(a.frameShape===undefined||(a.frameShape==='square'&&a.frames===3))))}
export interface WorkshopItem {composeOcclusion?:ComposeOcclusion;composeCoverage?:ComposeCoverage;composeWatch?:ComposeWatch;composeConditions?:ComposeConditions;composeTouches?:ComposeTouches;readingPlan?:true;composeOrder?:WordProcessOrder;composeArt?:ComposeArt;composeBrief?:ComposeBrief;spellings?:string[];ownForms?:string[];wordDecision?:WordDecision;sourceSettings?:SourceSettings;sourceRecall?:RecallExercise;sourceGap?:ContextGap;calculation?:WorkshopCalculation;sourceOrder?:string[];sourceOrderLabels?:string[];sourceArt?:{assetRoot?:'assets'|'illustrations'|'illustrations-2';layout?:'repeat';asset:string;alt:string;choices:{id:string;label:string;caption?:string}[]};sourceStyle?:'cards';sourceTitle?:string;evidenceLabels?:string[];evidenceGroups?:string[][];sound?:'syllables'|'emphasis'|'groups'|'links'|'pitch'|'phoneme';caseSensitive?:boolean;usage?:UsageMap;id:string;label:string;prompt:string;answer:string;reason:string;hint:string;before?:string;after?:string;options?:{id:string;text:string;reason:string;correct:boolean}[];material?:string;meaning?:string}
export interface LessonWorkshop {applicationStyle?:'cards';navigationLabel?:string;kind:'transform'|'word-use'|'proof'|'compose'|'sound-map';title:string;instruction:string;conditions?:LanguageCondition[];items:WorkshopItem[];choices?:string[];applicationIds?:string[];transfer?:Question}
export interface WorkshopView {wordUmbrellaUntil?:WordUmbrellaUntilView;wordLocalWool?:WordLocalWoolView;wordCottonShirt?:WordCottonShirtView;wordButtonMatch?:WordButtonMatchView;wordGloveFit?:WordGloveFitView;wordHelmetAsk?:WordHelmetAskView;wordZipState?:WordZipStateView;wordTicketPocket?:WordTicketPocketView;wordBeltSupport?:WordBeltSupportView;wordGloveFound?:WordGloveFoundView;wordScarfWrap?:WordScarfWrapView;wordCapInto?:WordCapIntoView;wordSlipperUnder?:WordSlipperUnderView;wordBootMud?:WordBootMudView;wordLeftShoeStone?:WordLeftShoeStoneView;wordStageSuit?:WordStageSuitView;wordCurtainDress?:WordCurtainDressView;wordHiddenPocket?:WordHiddenPocketView;wordCyclingLength?:WordCyclingLengthView;wordChairBack?:WordChairBackView;wordWoolWarm?:WordWoolWarmView;wordHoodScope?:WordHoodScopeView;wordPlainFabric?:WordPlainFabricView;wordButtonDetail?:WordButtonDetailView;wordClothesWindow?:WordClothesWindowView;wordJamJar?:WordJamJarView;wordEachNapkin?:WordEachNapkinView;wordStickThrough?:WordStickThroughView;wordSpoonLength?:WordSpoonLengthView;wordUtensilFacing?:WordUtensilFacingView;wordVesselDetail?:WordVesselDetailView;wordNeededFill?:WordNeededFillView;wordTapWhile?:WordTapWhileView;wordKitchenPlace?:WordKitchenPlaceView;wordKitchenCondition?:WordKitchenConditionView;wordTableDust?:WordTableDustView;wordMainRole?:WordMainRoleView;wordLemonSlice?:WordLemonSliceView;wordBananaOver?:WordBananaOverView;wordTextureResult?:WordTextureResultView;wordMixBowl?:WordMixBowlView;wordGentleHeat?:WordGentleHeatView;wordSteamCover?:WordSteamCoverView;wordCookingEndpoint?:WordCookingEndpointView;wordAppleRemoval?:WordAppleRemovalView;wordRawBoard?:WordRawBoardView;wordRipeNow?:WordRipeNowView;wordTasteScope?:WordTasteScopeView;wordHeavyForOne?:WordHeavyForOneView;wordFlavourSense?:WordFlavourSenseView;wordFoodCondition?:WordFoodConditionView;wordPeaMotion?:WordPeaMotionView;wordVegetableEffect?:WordVegetableEffectView;wordVegetablePrep?:WordVegetablePrepView;wordSoftCentre?:WordSoftCentreView;wordStoneSides?:WordStoneSidesView;wordFruitScene?:WordFruitSceneView;wordFruitFall?:WordFruitFallView;wordContainerFit?:WordContainerFitView;wordFruitPrep?:WordFruitPrepView;wordFoodChange?:WordFoodChangeView;wordFoodLayer?:WordFoodLayerView;wordRecipeLess?:WordRecipeLessView;wordFoodPurpose?:WordFoodPurposeView;wordFoodPairing?:WordFoodPairingView;wordFoodReturn?:WordFoodReturnView;wordFoodNoun?:WordFoodNounView;wordFoodExtent?:WordFoodExtentView;wordNearBefore?:WordNearBeforeView;wordRemainingTin?:WordRemainingTinView;wordFoodRoles?:WordFoodRolesView;wordNoodleFall?:WordNoodleFallView;wordFoodPortions?:WordFoodPortionsView;wordMealReadiness?:WordMealReadinessView;wordFoodSeparation?:WordFoodSeparationView;wordCornerFold?:WordCornerFoldView;wordClothPieces?:WordClothPiecesView;wordArmPose?:WordArmPoseView;wordLineIntersection?:WordLineIntersectionView;wordEntrySequence?:WordEntrySequenceView;wordActionGoal?:WordActionGoalView;wordEveryoneArrived?:WordEveryoneArrivedView;wordForceDirection?:WordForceDirectionView;wordPositionInstruction?:WordPositionInstructionView;wordMethodDirection?:WordMethodDirectionView;wordSenseFrame?:WordSenseFrameView;wordReportFrame?:WordReportFrameView;wordPlantNeeds?:WordPlantNeedsView;wordLidCoverage?:WordLidCoverageView;wordColourAllocation?:WordColourAllocationView;wordSpeedMeaning?:WordSpeedMeaningView;wordTimeScope?:WordTimeScopeView;wordRouteFrame?:WordRouteFrameView;wordRelationScene?:WordRelationSceneView;wordSpatialFrame?:WordSpatialFrameView;wordPathRole?:WordPathRoleView;wordZeroGroup?:WordZeroGroupView;wordAlmostLevel?:WordAlmostLevelView;wordWidthFit?:WordWidthFitView;wordOverlap?:WordOverlapView;composeOcclusion?:ReturnType<typeof composeOcclusionView>;composeCoverage?:ReturnType<typeof composeCoverageView>;composeWatch?:ReturnType<typeof composeWatchView>;composeConditions?:ReturnType<typeof composeConditionsView>;composeTouches?:ComposeTouchesView;composeOrder?:WordProcessOrderView;composeFrame:number;composeBrief?:ReturnType<typeof composeBriefView>;wordSustainableAnd?:WordSustainableAndView;wordInlandRoute?:WordInlandRouteView;wordSupportLinks?:WordSupportLinksView;wordMaterialSort?:WordMaterialSortView;wordCarbonDioxide?:WordCarbonDioxideView;wordActionCount?:WordActionCountView;wordDrySeats?:WordDrySeatsView;wordRegularRepeat?:WordRegularRepeatView;wordGateCondition?:WordGateConditionView;wordExactAlignment?:WordExactAlignmentView;wordNearlyFinish?:WordNearlyFinishView;wordPostRedaction?:WordPostRedactionView;wordEntranceFacing?:WordEntranceFacingView;wordGateFirm?:WordGateFirmView;wordFreeSunday?:WordFreeSundayView;wordLeafSimilar?:WordLeafSimilarView;wordDoughEqual?:WordDoughEqualView;wordJarChange?:WordJarChangeView;wordUArticle?:WordUArticleView;wordBoxFit?:WordBoxFitView;wordInterestRoles?:WordInterestRolesView;wordTornMap?:WordTornMapView;wordGuessScale?:WordGuessScaleView;wordRiverImagine?:WordRiverImagineView;wordCurtainExit?:WordCurtainExitView;wordContributions?:WordContributionsView;wordDottedRoute?:WordDottedRouteView;wordRouteWeather?:WordRouteWeatherView;wordFlash?:WordFlashView;wordPreference?:WordPreferenceView;wordPattern?:WordPatternView;wordCart?:WordCartView;wordMolecule?:WordMoleculeView;wordObserve?:WordObserveView;wordBusBudget?:WordBusBudgetView;wordStampPlacement?:WordStampPlacementView;wordEachItem?:WordEachItemView;wordRouteTraffic?:WordRouteTrafficView;wordPaperUse?:WordPaperUseView;wordPathSteps?:WordPathStepsView;wordRectangleRatio?:WordRectangleRatioView;wordSpotWings?:WordSpotWingsView;wordWireOrder?:WordWireOrderView;wordRobotWave?:WordRobotWaveView;wordShadePanel?:WordShadePanelView;wordDepthLine?:WordDepthLineView;wordWaterPair?:WordWaterPairView;wordProcessOrder?:WordProcessOrderView;wordQueueMove?:WordQueueMoveView;wordShelfRoom?:WordShelfRoomView;wordFileDesk?:WordFileDeskView;wordTitleArrow?:WordTitleArrowView;wordOfflinePage?:WordOfflinePageView;wordNameGroups?:WordNameGroupsView;wordPhoneMode?:WordPhoneModeView;wordPrintPages?:WordPrintPagesView;wordSources?:{context:string;cards:(WordSourceCard&{text:string;selected:boolean;accepted:boolean;wrong:boolean})[]};wordReportedChange?:WordReportedChangeView;wordChance?:WordChanceView;wordDailyWalk?:WordDailyWalkView;wordPictureOnly?:boolean;wordBoat?:WordBoatView;wordShift?:WordFeelingShiftView;wordProvision?:WordProvisionView;wordUntil?:WordUntilView;wordThermal?:WordThermalView;wordClimate?:WordClimateView;wordDaylight?:WordDaylightView;wordWeather?:WordWeatherView;wordDoor?:WordDoorView;wordFraction?:WordFractionView;wordRotation?:WordRotationView;wordRuler?:WordRulerView;wordQuantity?:WordQuantityView;wordRecordSelection?:WordRecordSelectionView;wordClock?:WordClockView;wordPictureTargets:{id:string;option:string;label:string;selected:boolean;accepted?:boolean;wrong?:boolean;style:string}[];wordRecordPaths:WordRecordPath[];wordTailOnly:boolean;wordEvidence?:{caption:string;regions:{id:string;label:string;style:string}[]};ownMissing:boolean;reduction?:{unit:string;ready:boolean;rows:{id:string;label:string;value:string;width:number}[]};settings?:{pacing?:PacingPreview;labels:[string,string];title:string;note:string;checked:boolean;correct:boolean;rows:{id:string;label:string;value:string;labels:[string,string];route?:{from:string;target:string};status:string;correct:boolean;feedback:string}[]};recall?:{title:string;note:string;phase:string;ready:boolean;rows:{id:string;cue:string;answer:string;attempt:string;same:boolean}[]};gap?:{map?:LocationPreview;before:string;after:string;text:string;selected:string;checked:boolean;correct:boolean;feedback:string;options:{id:string;text:string;selected:boolean}[]};orderSlots:{id:string;text:string;label:string;wrong:boolean;filled:boolean}[];redaction?:{asset:string;alt:string;regions:{id:string;text:string;label:string;detail:string;masked:boolean;wrong:boolean;style:string}[]};proofArtChoices:{id:string;label:string;caption?:string;selected:boolean;accepted:boolean;wrong:boolean}[];proofReady:boolean;orderBank:{id:string;text:string;used:boolean}[];orderAnswer:{id:string;text:string;wrong:boolean}[];selectionText:string;morphemeTiles:boolean;verbBridge?:{verb:string;object:string;objectLabel:string;known:boolean;link:string};albumOwnership?:AlbumOwnership;albumMode:"shared"|"separate"|"";albumItems:{label:string}[];keepEnding:boolean;tileBank:{id:string;text:string;used:boolean}[];tileAnswer:{id:string;text:string}[];referenceStyle:string;membersCorrect:boolean;records?:EventRecords;recordOptions:(EventRecords["options"][number]&{selected:boolean;wrong:boolean})[];recordArtChoices:(EventRecords["options"][number]&{selected:boolean;wrong:boolean;style:string})[];recordCorrect:boolean;hasScene:boolean;navigationLabel:string;scene?:PeopleScene;scenePeople:(ScenePerson&{selected:boolean;wrong:boolean;speaking:boolean;listening:boolean;style:string})[];sceneSubjectsCorrect:boolean;expressionWrong:boolean;proofSteps:{id:string;label:string;accepted:boolean}[];proofRequired:number;proofCollected:{id:string;text:string}[];proofAccepted:boolean;soundUnits:{text:string;emphasis:boolean}[];soundMode:string;pitch:string;usageDirection:string;doneCount:number;kind:LessonWorkshop['kind'];title:string;instruction:string;index:number;total:number;tabs:{id:string;label:string;done:boolean}[];item:WorkshopItem;condition?:LanguageCondition;cells:(WorldCell&{selected:boolean;wrong:boolean;copies:number[];style:string;rangeStyle:string})[];choices:{id:string;text:string;selected:boolean;accepted:boolean}[];selected:string;input:string;own:string;attempted:boolean;correct:boolean;feedback:string;revealed:boolean;complete:boolean;allDone:boolean;draftWords:number;sourceOpen:boolean;worldClass:string}
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
const overlapMatch=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.overlap||selectedOverlapMatch(p.answers[wordOverlapKey(item.id)]??'')
const widthFitMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.widthFit||selectedWidthFitMatch(p.answers[wordWidthFitKey(item.id)]??'')
const almostLevelMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.almostLevel||selectedAlmostLevelMatch(p.answers[wordAlmostLevelKey(item.id)]??'')
const zeroGroupMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.zeroGroup||selectedZeroGroupMatch(item.wordDecision.zeroGroup,p.answers[wordZeroGroupKey(item.id)]??'')
const pathRoleMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.pathRole||selectedPathRoleMatch(p.answers[wordPathRoleKey(item.id)]??'')
const spatialFrameMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.spatialFrame||selectedSpatialFrameMatch(item.wordDecision.spatialFrame,p.answers[wordSpatialFrameKey(item.id)]??'')
const relationSceneMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.relationScene||selectedRelationSceneMatch(item.wordDecision.relationScene,p.answers[wordRelationSceneKey(item.id)]??'')
const routeFrameMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.routeFrame||selectedRouteFrameMatch(item.wordDecision.routeFrame,p.answers[wordRouteFrameKey(item.id)]??'')
const timeScopeMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.timeScope||selectedTimeScopeMatch(item.wordDecision.timeScope,p.answers[wordTimeScopeKey(item.id)]??'')
const speedMeaningMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.speedMeaning||selectedSpeedMeaningMatch(item.wordDecision.speedMeaning,p.answers[wordSpeedMeaningKey(item.id)]??'')
const colourAllocationMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.colourAllocation||selectedColourAllocationMatch(item.wordDecision.colourAllocation,p.answers[wordColourAllocationKey(item.id)]??'')
const lidCoverageMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.lidCoverage||selectedLidCoverageMatch(item.wordDecision.lidCoverage,p.answers[wordLidCoverageKey(item.id)]??'')
const plantNeedsMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.plantNeeds||selectedPlantNeedsMatch(item.wordDecision.plantNeeds,p.answers[wordPlantNeedsKey(item.id)]??'')
const reportFrameMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.reportFrame||selectedReportFrameMatch(item.wordDecision.reportFrame,p.answers[wordReportFrameKey(item.id)]??'')
const senseFrameMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.senseFrame||selectedSenseFrameMatch(item.wordDecision.senseFrame,p.answers[wordSenseFrameKey(item.id)]??'')
const methodDirectionMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.methodDirection||selectedMethodDirectionMatch(item.wordDecision.methodDirection,p.answers[wordMethodDirectionKey(item.id)]??'')
const positionInstructionMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.positionInstruction||selectedPositionInstructionMatch(item.wordDecision.positionInstruction,p.answers[wordPositionInstructionKey(item.id)]??'')
const forceDirectionMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.forceDirection||selectedForceDirectionMatch(item.wordDecision.forceDirection,p.answers[wordForceDirectionKey(item.id)]??'')
const everyoneArrivedMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.everyoneArrived||selectedEveryoneArrivedMatch(p.answers[wordEveryoneArrivedKey(item.id)]??'')
const actionGoalMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.actionGoal||selectedActionGoalMatch(item.wordDecision.actionGoal,p.answers[wordActionGoalKey(item.id)]??'')
const entrySequenceMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.entrySequence||selectedEntrySequenceMatch(item.wordDecision.entrySequence,p.answers[wordEntrySequenceKey(item.id)]??'')
const lineIntersectionMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.lineIntersection||selectedLineIntersectionMatch(item.wordDecision.lineIntersection,p.answers[wordLineIntersectionKey(item.id)]??'')
const armPoseMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.armPose||selectedArmPoseMatch(item.wordDecision.armPose,p.answers[wordArmPoseKey(item.id)]??'')
const clothPiecesMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.clothPieces||selectedClothPiecesMatch(item.wordDecision.clothPieces,p.answers[wordClothPiecesKey(item.id)]??'')
const cornerFoldMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.cornerFold||selectedCornerFoldMatch(item.wordDecision.cornerFold,p.answers[wordCornerFoldKey(item.id)]??'')
const foodSeparationMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodSeparation||selectedFoodSeparationMatch(item.wordDecision.foodSeparation,p.answers[wordFoodSeparationKey(item.id)]??'')
const mealReadinessMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.mealReadiness||selectedMealReadinessMatch(item.wordDecision.mealReadiness,p.answers[wordMealReadinessKey(item.id)]??'')
const foodPortionsMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodPortions||selectedFoodPortionsMatch(item.wordDecision.foodPortions,p.answers[wordFoodPortionsKey(item.id)]??'')
const noodleFallMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.noodleFall||selectedNoodleFallMatch(item.wordDecision.noodleFall,p.answers[wordNoodleFallKey(item.id)]??'')
const foodRolesMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodRoles||selectedFoodRolesMatch(item.wordDecision.foodRoles,p.answers[wordFoodRolesKey(item.id)]??'')
const remainingTinMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.remainingTin||selectedRemainingTinMatch(item.wordDecision.remainingTin,p.answers[wordRemainingTinKey(item.id)]??'')
const nearBeforeMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.nearBefore||selectedNearBeforeMatch(item.wordDecision.nearBefore,p.answers[wordNearBeforeKey(item.id)]??'')
const foodExtentMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodExtent||selectedFoodExtentMatch(item.wordDecision.foodExtent,p.answers[wordFoodExtentKey(item.id)]??'')
const foodNounMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodNoun||selectedFoodNounMatch(item.wordDecision.foodNoun,p.answers[wordFoodNounKey(item.id)]??'')
const foodReturnMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodReturn||selectedFoodReturnMatch(item.wordDecision.foodReturn,p.answers[wordFoodReturnKey(item.id)]??'')
const foodPairingMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodPairing||selectedFoodPairingMatch(item.wordDecision.foodPairing,p.answers[wordFoodPairingKey(item.id)]??'')
const foodPurposeMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodPurpose||selectedFoodPurposeMatch(item.wordDecision.foodPurpose,p.answers[wordFoodPurposeKey(item.id)]??'')
const recipeLessMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.recipeLess||selectedRecipeLessMatch(item.wordDecision.recipeLess,p.answers[wordRecipeLessKey(item.id)]??'')
const foodLayerMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodLayer||selectedFoodLayerMatch(item.wordDecision.foodLayer,p.answers[wordFoodLayerKey(item.id)]??'')
const foodChangeMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodChange||selectedFoodChangeMatch(item.wordDecision.foodChange,p.answers[wordFoodChangeKey(item.id)]??'')
const fruitPrepMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.fruitPrep||selectedFruitPrepMatch(item.wordDecision.fruitPrep,p.answers[wordFruitPrepKey(item.id)]??'')
const containerFitMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.containerFit||selectedContainerFitMatch(item.wordDecision.containerFit,p.answers[wordContainerFitKey(item.id)]??'')
const fruitFallMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.fruitFall||selectedFruitFallMatch(item.wordDecision.fruitFall,p.answers[wordFruitFallKey(item.id)]??'')
const fruitSceneMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.fruitScene||selectedFruitSceneMatch(item.wordDecision.fruitScene,p.answers[wordFruitSceneKey(item.id)]??'')
const stoneSidesMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.stoneSides||selectedStoneSidesMatch(item.wordDecision.stoneSides,p.answers[wordStoneSidesKey(item.id)]??'')
const softCentreMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.softCentre||selectedSoftCentreMatch(item.wordDecision.softCentre,p.answers[wordSoftCentreKey(item.id)]??'')
const vegetablePrepMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.vegetablePrep||selectedVegetablePrepMatch(item.wordDecision.vegetablePrep,p.answers[wordVegetablePrepKey(item.id)]??'')
const vegetableEffectMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.vegetableEffect||selectedVegetableEffectMatch(item.wordDecision.vegetableEffect,p.answers[wordVegetableEffectKey(item.id)]??'')
const peaMotionMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.peaMotion||selectedPeaMotionMatch(item.wordDecision.peaMotion,p.answers[wordPeaMotionKey(item.id)]??'')
const foodConditionMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.foodCondition||selectedFoodConditionMatch(item.wordDecision.foodCondition,p.answers[wordFoodConditionKey(item.id)]??'')
const flavourSenseMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.flavourSense||selectedFlavourSenseMatch(item.wordDecision.flavourSense,p.answers[wordFlavourSenseKey(item.id)]??'')
const heavyForOneMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.heavyForOne||selectedHeavyForOneMatch(item.wordDecision.heavyForOne,p.answers[wordHeavyForOneKey(item.id)]??'')
const tasteScopeMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.tasteScope||selectedTasteScopeMatch(item.wordDecision.tasteScope,p.answers[wordTasteScopeKey(item.id)]??'')
const ripeNowMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.ripeNow||selectedRipeNowMatch(item.wordDecision.ripeNow,p.answers[wordRipeNowKey(item.id)]??'')
const rawBoardMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.rawBoard||selectedRawBoardMatch(item.wordDecision.rawBoard,p.answers[wordRawBoardKey(item.id)]??'')
const appleRemovalMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.appleRemoval||selectedAppleRemovalMatch(item.wordDecision.appleRemoval,p.answers[wordAppleRemovalKey(item.id)]??'')
const cookingEndpointMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.cookingEndpoint||selectedCookingEndpointMatch(item.wordDecision.cookingEndpoint,p.answers[wordCookingEndpointKey(item.id)]??'')
const steamCoverMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.steamCover||selectedSteamCoverMatch(item.wordDecision.steamCover,p.answers[wordSteamCoverKey(item.id)]??'')
const gentleHeatMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.gentleHeat||selectedGentleHeatMatch(item.wordDecision.gentleHeat,p.answers[wordGentleHeatKey(item.id)]??'')
const mixBowlMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.mixBowl||selectedMixBowlMatch(item.wordDecision.mixBowl,p.answers[wordMixBowlKey(item.id)]??'')
const textureResultMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.textureResult||selectedTextureResultMatch(item.wordDecision.textureResult,p.answers[wordTextureResultKey(item.id)]??'')
const bananaOverMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.bananaOver||selectedBananaOverMatch(item.wordDecision.bananaOver,p.answers[wordBananaOverKey(item.id)]??'')
const lemonSliceMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.lemonSlice||selectedLemonSliceMatch(item.wordDecision.lemonSlice,p.answers[wordLemonSliceKey(item.id)]??'')
const mainRoleMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.mainRole||selectedMainRoleMatch(item.wordDecision.mainRole,p.answers[wordMainRoleKey(item.id)]??'')
const tableDustMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.tableDust||selectedTableDustMatch(item.wordDecision.tableDust,p.answers[wordTableDustKey(item.id)]??'')
const kitchenConditionMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.kitchenCondition||selectedKitchenConditionMatch(item.wordDecision.kitchenCondition,p.answers[wordKitchenConditionKey(item.id)]??'')
const kitchenPlaceMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.kitchenPlace||selectedKitchenPlaceMatch(item.wordDecision.kitchenPlace,p.answers[wordKitchenPlaceKey(item.id)]??'')
const tapWhileMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.tapWhile||selectedTapWhileMatch(item.wordDecision.tapWhile,p.answers[wordTapWhileKey(item.id)]??'')
const neededFillMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.neededFill||selectedNeededFillMatch(item.wordDecision.neededFill,p.answers[wordNeededFillKey(item.id)]??'')
const vesselDetailMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.vesselDetail||selectedVesselDetailMatch(item.wordDecision.vesselDetail,p.answers[wordVesselDetailKey(item.id)]??'')
const utensilFacingMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.utensilFacing||selectedUtensilFacingMatch(item.wordDecision.utensilFacing,p.answers[wordUtensilFacingKey(item.id)]??'')
const spoonLengthMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.spoonLength||selectedSpoonLengthMatch(item.wordDecision.spoonLength,p.answers[wordSpoonLengthKey(item.id)]??'')
const stickThroughMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.stickThrough||selectedStickThroughMatch(item.wordDecision.stickThrough,p.answers[wordStickThroughKey(item.id)]??'')
const eachNapkinMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.eachNapkin||selectedEachNapkinMatch(item.wordDecision.eachNapkin,p.answers[wordEachNapkinKey(item.id)]??'')
const jamJarMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.jamJar||selectedJamJarMatch(item.wordDecision.jamJar,p.answers[wordJamJarKey(item.id)]??'')
const clothesWindowMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.clothesWindow||selectedClothesWindowMatch(item.wordDecision.clothesWindow,p.answers[wordClothesWindowKey(item.id)]??'')
const buttonDetailMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.buttonDetail||selectedButtonDetailMatch(item.wordDecision.buttonDetail,p.answers[wordButtonDetailKey(item.id)]??'')
const plainFabricMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.plainFabric||selectedPlainFabricMatch(item.wordDecision.plainFabric,p.answers[wordPlainFabricKey(item.id)]??'')
const hoodScopeMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.hoodScope||selectedHoodScopeMatch(item.wordDecision.hoodScope,p.answers[wordHoodScopeKey(item.id)]??'')
const woolWarmMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.woolWarm||selectedWoolWarmMatch(item.wordDecision.woolWarm,p.answers[wordWoolWarmKey(item.id)]??'')
const chairBackMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.chairBack||selectedChairBackMatch(item.wordDecision.chairBack,p.answers[wordChairBackKey(item.id)]??'')
const cyclingLengthMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.cyclingLength||selectedCyclingLengthMatch(item.wordDecision.cyclingLength,p.answers[wordCyclingLengthKey(item.id)]??'')
const hiddenPocketMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.hiddenPocket||selectedHiddenPocketMatch(item.wordDecision.hiddenPocket,p.answers[wordHiddenPocketKey(item.id)]??'')
const curtainDressMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.curtainDress||selectedCurtainDressMatch(item.wordDecision.curtainDress,p.answers[wordCurtainDressKey(item.id)]??'')
const stageSuitMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.stageSuit||selectedStageSuitMatch(item.wordDecision.stageSuit,p.answers[wordStageSuitKey(item.id)]??'')
const leftShoeStoneMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.leftShoeStone||selectedLeftShoeStoneMatch(item.wordDecision.leftShoeStone,p.answers[wordLeftShoeStoneKey(item.id)]??'')
const bootMudMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.bootMud||selectedBootMudMatch(item.wordDecision.bootMud,p.answers[wordBootMudKey(item.id)]??'')
const slipperUnderMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.slipperUnder||selectedSlipperUnderMatch(item.wordDecision.slipperUnder,p.answers[wordSlipperUnderKey(item.id)]??'')
const capIntoMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.capInto||selectedCapIntoMatch(item.wordDecision.capInto,p.answers[wordCapIntoKey(item.id)]??'')
const scarfWrapMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.scarfWrap||selectedScarfWrapMatch(item.wordDecision.scarfWrap,p.answers[wordScarfWrapKey(item.id)]??'')
const gloveFoundMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.gloveFound||selectedGloveFoundMatch(item.wordDecision.gloveFound,p.answers[wordGloveFoundKey(item.id)]??'')
const beltSupportMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.beltSupport||selectedBeltSupportMatch(item.wordDecision.beltSupport,p.answers[wordBeltSupportKey(item.id)]??'')
const ticketPocketMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.ticketPocket||selectedTicketPocketMatch(item.wordDecision.ticketPocket,p.answers[wordTicketPocketKey(item.id)]??'')
const zipStateMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.zipState||selectedZipStateMatch(item.wordDecision.zipState,p.answers[wordZipStateKey(item.id)]??'')
const helmetAskMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.helmetAsk||selectedHelmetAskMatch(item.wordDecision.helmetAsk,p.answers[wordHelmetAskKey(item.id)]??'')
const gloveFitMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.gloveFit||selectedGloveFitMatch(item.wordDecision.gloveFit,p.answers[wordGloveFitKey(item.id)]??'')
const buttonMatchMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.buttonMatch||selectedButtonMatchMatch(item.wordDecision.buttonMatch,p.answers[wordButtonMatchKey(item.id)]??'')
const cottonShirtMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.cottonShirt||selectedCottonShirtMatch(item.wordDecision.cottonShirt,p.answers[wordCottonShirtKey(item.id)]??'')
const localWoolMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.localWool||selectedLocalWoolMatch(item.wordDecision.localWool,p.answers[wordLocalWoolKey(item.id)]??'')
const umbrellaUntilMatchesItem=(item:WorkshopItem,p:TeachingProgress)=>!item.wordDecision?.umbrellaUntil||selectedUmbrellaUntilMatch(item.wordDecision.umbrellaUntil,p.answers[wordUmbrellaUntilKey(item.id)]??'')
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
const wordDecisionMatches=(item:WorkshopItem,p:TeachingProgress,k:string)=>(!item.wordDecision||(item.wordDecision.meaningFromRecords===true&&!!item.wordDecision.recordSelection)||!!item.options?.some(o=>o.id===p.answers[k]&&o.correct))&&clockMatches(item,p)&&recordsMatch(item,p)&&quantityMatches(item,p)&&rulerMatches(item,p)&&rotationMatches(item,p)&&fractionMatches(item,p)&&doorMatches(item,p)&&weatherMatches(item,p)&&daylightMatches(item,p)&&thermalMatches(item,p)&&provisionMatches(item,p)&&shiftMatches(item,p)&&boatMatches(item,p)&&chanceMatches(item,p)&&printPagesMatch(item,p)&&phoneModeMatch(item,p)&&nameGroupsMatch(item,p)&&offlinePageMatch(item,p)&&fileDeskMatch(item,p)&&shelfRoomMatch(item,p)&&shadePanelMatch(item,p)&&rectangleRatioMatch(item,p)&&spotWingsMatch(item,p)&&wireOrderMatch(item,p)&&routeTrafficMatch(item,p)&&stampPlacementMatch(item,p)&&eachItemMatch(item,p)&&busBudgetMatch(item,p)&&paperUseMatch(item,p)&&pathStepsMatch(item,p)&&robotWaveMatch(item,p)&&depthLineMatch(item,p)&&waterPairMatch(item,p)&&observeMatch(item,p)&&moleculeMatch(item,p)&&cartMatch(item,p)&&patternMatch(item,p)&&preferenceMatch(item,p)&&flashMatch(item,p)&&routeWeatherMatch(item,p)&&dottedRouteMatch(item,p)&&contributionsMatch(item,p)&&curtainExitMatch(item,p)&&riverImagineMatch(item,p)&&guessScaleMatch(item,p)&&tornMapMatch(item,p)&&interestRolesMatch(item,p)&&boxFitMatch(item,p)&&uArticleMatch(item,p)&&jarChangeMatch(item,p)&&doughEqualMatch(item,p)&&leafSimilarMatch(item,p)&&freeSundayMatch(item,p)&&gateFirmMatch(item,p)&&entranceFacingMatch(item,p)&&postRedactionMatch(item,p)&&nearlyFinishMatch(item,p)&&exactAlignmentMatch(item,p)&&gateConditionMatch(item,p)&&regularRepeatMatch(item,p)&&drySeatsMatch(item,p)&&actionCountMatch(item,p)&&carbonDioxideMatch(item,p)&&materialSortMatch(item,p)&&supportLinksMatch(item,p)&&inlandRouteMatch(item,p)&&sustainableAndMatch(item,p)&&overlapMatch(item,p)&&widthFitMatchesItem(item,p)&&almostLevelMatchesItem(item,p)&&zeroGroupMatchesItem(item,p)&&pathRoleMatchesItem(item,p)&&spatialFrameMatchesItem(item,p)&&relationSceneMatchesItem(item,p)&&routeFrameMatchesItem(item,p)&&timeScopeMatchesItem(item,p)&&speedMeaningMatchesItem(item,p)&&colourAllocationMatchesItem(item,p)&&lidCoverageMatchesItem(item,p)&&plantNeedsMatchesItem(item,p)&&reportFrameMatchesItem(item,p)&&senseFrameMatchesItem(item,p)&&methodDirectionMatchesItem(item,p)&&positionInstructionMatchesItem(item,p)&&forceDirectionMatchesItem(item,p)&&everyoneArrivedMatchesItem(item,p)&&actionGoalMatchesItem(item,p)&&entrySequenceMatchesItem(item,p)&&lineIntersectionMatchesItem(item,p)&&armPoseMatchesItem(item,p)&&clothPiecesMatchesItem(item,p)&&cornerFoldMatchesItem(item,p)&&foodSeparationMatchesItem(item,p)&&mealReadinessMatchesItem(item,p)&&foodPortionsMatchesItem(item,p)&&noodleFallMatchesItem(item,p)&&foodRolesMatchesItem(item,p)&&remainingTinMatchesItem(item,p)&&nearBeforeMatchesItem(item,p)&&foodExtentMatchesItem(item,p)&&foodNounMatchesItem(item,p)&&foodReturnMatchesItem(item,p)&&foodPairingMatchesItem(item,p)&&foodPurposeMatchesItem(item,p)&&recipeLessMatchesItem(item,p)&&foodLayerMatchesItem(item,p)&&foodChangeMatchesItem(item,p)&&fruitPrepMatchesItem(item,p)&&containerFitMatchesItem(item,p)&&fruitFallMatchesItem(item,p)&&fruitSceneMatchesItem(item,p)&&stoneSidesMatchesItem(item,p)&&softCentreMatchesItem(item,p)&&vegetablePrepMatchesItem(item,p)&&vegetableEffectMatchesItem(item,p)&&peaMotionMatchesItem(item,p)&&foodConditionMatchesItem(item,p)&&flavourSenseMatchesItem(item,p)&&heavyForOneMatchesItem(item,p)&&tasteScopeMatchesItem(item,p)&&ripeNowMatchesItem(item,p)&&rawBoardMatchesItem(item,p)&&appleRemovalMatchesItem(item,p)&&cookingEndpointMatchesItem(item,p)&&steamCoverMatchesItem(item,p)&&gentleHeatMatchesItem(item,p)&&mixBowlMatchesItem(item,p)&&textureResultMatchesItem(item,p)&&bananaOverMatchesItem(item,p)&&lemonSliceMatchesItem(item,p)&&mainRoleMatchesItem(item,p)&&tableDustMatchesItem(item,p)&&kitchenConditionMatchesItem(item,p)&&kitchenPlaceMatchesItem(item,p)&&tapWhileMatchesItem(item,p)&&neededFillMatchesItem(item,p)&&vesselDetailMatchesItem(item,p)&&utensilFacingMatchesItem(item,p)&&spoonLengthMatchesItem(item,p)&&stickThroughMatchesItem(item,p)&&eachNapkinMatchesItem(item,p)&&jamJarMatchesItem(item,p)&&clothesWindowMatchesItem(item,p)&&buttonDetailMatchesItem(item,p)&&plainFabricMatchesItem(item,p)&&hoodScopeMatchesItem(item,p)&&woolWarmMatchesItem(item,p)&&chairBackMatchesItem(item,p)&&cyclingLengthMatchesItem(item,p)&&hiddenPocketMatchesItem(item,p)&&curtainDressMatchesItem(item,p)&&stageSuitMatchesItem(item,p)&&leftShoeStoneMatchesItem(item,p)&&bootMudMatchesItem(item,p)&&slipperUnderMatchesItem(item,p)&&capIntoMatchesItem(item,p)&&scarfWrapMatchesItem(item,p)&&gloveFoundMatchesItem(item,p)&&beltSupportMatchesItem(item,p)&&ticketPocketMatchesItem(item,p)&&zipStateMatchesItem(item,p)&&helmetAskMatchesItem(item,p)&&gloveFitMatchesItem(item,p)&&buttonMatchMatchesItem(item,p)&&cottonShirtMatchesItem(item,p)&&localWoolMatchesItem(item,p)&&umbrellaUntilMatchesItem(item,p)&&processOrderMatch(item,p)&&queueMoveMatch(item,p)&&titleArrowMatch(item,p)&&reportedChangeMatches(item,p)&&dailyWalkMatches(item,p)&&untilMatches(item,p)&&climateMatches(item,p)
const briefMatches=(item:WorkshopItem,p:TeachingProgress)=>(!item.composeOcclusion||composeOcclusionMatch(p.answers[composeOcclusionKey(item.id)]??''))&&(!item.composeCoverage||composeCoverageMatch(p.answers[composeCoverageKey(item.id)]??''))&&(!item.composeWatch||composeWatchMatch(p.answers[composeWatchKey(item.id)]??''))&&(!item.composeConditions||composeConditionsMatch(item.composeConditions,p.answers[composeConditionsKey(item.id)]??''))&&(!item.composeTouches||composeTouchesMatch(item.composeTouches,p.answers[composeTouchesKey(item.id)]??''))&&(!item.composeBrief||composeBriefMatches(item.composeBrief,p.answers[composeBriefKey(item.id)]??''))&&(!item.composeOrder||selectedProcessOrderMatch(item.composeOrder,p.answers['composeOrder-'+item.id]??''))
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
const targetSpellingMatches=(item:WorkshopItem,input:string)=>(item.spellings??[item.answer]).some(form=>normalizedAnswer(input,!!item.caseSensitive)===normalizedAnswer(form,!!item.caseSensitive))
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
 else if(w.kind==='word-use'&&item.wordDecision?.climate&&!climateMatches(item,p))feedback=item.wordDecision.climate.wrong; else if(w.kind==='word-use'&&item.wordDecision?.until&&!untilMatches(item,p))feedback=item.wordDecision.until.wrong; else if(w.kind==='word-use'&&item.wordDecision?.dailyWalk&&!dailyWalkMatches(item,p))feedback=item.wordDecision.dailyWalk.wrong; else if(w.kind==='word-use'&&item.wordDecision?.reportedChange&&!reportedChangeMatches(item,p))feedback=item.wordDecision.reportedChange.wrong; else if(w.kind==='word-use'&&item.wordDecision?.shadePanel&&!shadePanelMatch(item,p))feedback=item.wordDecision.shadePanel.wrong; else if(w.kind==='word-use'&&item.wordDecision?.rectangleRatio&&!rectangleRatioMatch(item,p))feedback=item.wordDecision.rectangleRatio.wrong; else if(w.kind==='word-use'&&item.wordDecision?.spotWings&&!spotWingsMatch(item,p))feedback=item.wordDecision.spotWings.wrong; else if(w.kind==='word-use'&&item.wordDecision?.wireOrder&&!wireOrderMatch(item,p))feedback=item.wordDecision.wireOrder.wrong; else if(w.kind==='word-use'&&item.wordDecision?.routeTraffic&&!routeTrafficMatch(item,p))feedback=item.wordDecision.routeTraffic.wrong; else if(w.kind==='word-use'&&item.wordDecision?.stampPlacement&&!stampPlacementMatch(item,p))feedback=item.wordDecision.stampPlacement.wrong; else if(w.kind==='word-use'&&item.wordDecision?.eachItem&&!eachItemMatch(item,p))feedback=item.wordDecision.eachItem.wrong; else if(w.kind==='word-use'&&item.wordDecision?.busBudget&&!busBudgetMatch(item,p))feedback=item.wordDecision.busBudget.wrong; else if(w.kind==='word-use'&&item.wordDecision?.paperUse&&!paperUseMatch(item,p))feedback=item.wordDecision.paperUse.wrong; else if(w.kind==='word-use'&&item.wordDecision?.pathSteps&&!pathStepsMatch(item,p))feedback=item.wordDecision.pathSteps.wrong; else if(w.kind==='word-use'&&item.wordDecision?.robotWave&&!robotWaveMatch(item,p))feedback=item.wordDecision.robotWave.wrong; else if(w.kind==='word-use'&&item.wordDecision?.depthLine&&!depthLineMatch(item,p))feedback=item.wordDecision.depthLine.wrong; else if(w.kind==='word-use'&&item.wordDecision?.waterPair&&!waterPairMatch(item,p))feedback=item.wordDecision.waterPair.wrong; else if(w.kind==='word-use'&&item.wordDecision?.observe&&!observeMatch(item,p))feedback=item.wordDecision.observe.wrong; else if(w.kind==='word-use'&&item.wordDecision?.molecule&&!moleculeMatch(item,p))feedback=item.wordDecision.molecule.wrong; else if(w.kind==='word-use'&&item.wordDecision?.cart&&!cartMatch(item,p))feedback=item.wordDecision.cart.wrong; else if(w.kind==='word-use'&&item.wordDecision?.pattern&&!patternMatch(item,p))feedback=item.wordDecision.pattern.wrong; else if(w.kind==='word-use'&&item.wordDecision?.preference&&!preferenceMatch(item,p))feedback=item.wordDecision.preference.wrong; else if(w.kind==='word-use'&&item.wordDecision?.flash&&!flashMatch(item,p))feedback=item.wordDecision.flash.wrong; else if(w.kind==='word-use'&&item.wordDecision?.routeWeather&&!routeWeatherMatch(item,p))feedback=item.wordDecision.routeWeather.wrong; else if(w.kind==='word-use'&&item.wordDecision?.dottedRoute&&!dottedRouteMatch(item,p))feedback=item.wordDecision.dottedRoute.wrong; else if(w.kind==='word-use'&&item.wordDecision?.contributions&&!contributionsMatch(item,p))feedback=item.wordDecision.contributions.wrong; else if(w.kind==='word-use'&&item.wordDecision?.curtainExit&&!curtainExitMatch(item,p))feedback=item.wordDecision.curtainExit.wrong; else if(w.kind==='word-use'&&item.wordDecision?.riverImagine&&!riverImagineMatch(item,p))feedback=item.wordDecision.riverImagine.wrong; else if(w.kind==='word-use'&&item.wordDecision?.guessScale&&!guessScaleMatch(item,p))feedback=item.wordDecision.guessScale.wrong; else if(w.kind==='word-use'&&item.wordDecision?.tornMap&&!tornMapMatch(item,p))feedback=item.wordDecision.tornMap.wrong; else if(w.kind==='word-use'&&item.wordDecision?.interestRoles&&!interestRolesMatch(item,p))feedback=item.wordDecision.interestRoles.wrong; else if(w.kind==='word-use'&&item.wordDecision?.boxFit&&!boxFitMatch(item,p))feedback=item.wordDecision.boxFit.wrong; else if(w.kind==='word-use'&&item.wordDecision?.uArticle&&!uArticleMatch(item,p))feedback=item.wordDecision.uArticle.wrong; else if(w.kind==='word-use'&&item.wordDecision?.jarChange&&!jarChangeMatch(item,p))feedback=item.wordDecision.jarChange.wrong; else if(w.kind==='word-use'&&item.wordDecision?.doughEqual&&!doughEqualMatch(item,p))feedback=item.wordDecision.doughEqual.wrong; else if(w.kind==='word-use'&&item.wordDecision?.leafSimilar&&!leafSimilarMatch(item,p))feedback=item.wordDecision.leafSimilar.wrong; else if(w.kind==='word-use'&&item.wordDecision?.freeSunday&&!freeSundayMatch(item,p))feedback=item.wordDecision.freeSunday.wrong; else if(w.kind==='word-use'&&item.wordDecision?.gateFirm&&!gateFirmMatch(item,p))feedback=item.wordDecision.gateFirm.wrong; else if(w.kind==='word-use'&&item.wordDecision?.entranceFacing&&!entranceFacingMatch(item,p))feedback=item.wordDecision.entranceFacing.wrong; else if(w.kind==='word-use'&&item.wordDecision?.postRedaction&&!postRedactionMatch(item,p))feedback=item.wordDecision.postRedaction.wrong; else if(w.kind==='word-use'&&item.wordDecision?.nearlyFinish&&!nearlyFinishMatch(item,p))feedback=item.wordDecision.nearlyFinish.wrong; else if(w.kind==='word-use'&&item.wordDecision?.exactAlignment&&!exactAlignmentMatch(item,p))feedback=item.wordDecision.exactAlignment.wrong; else if(w.kind==='word-use'&&item.wordDecision?.gateCondition&&!gateConditionMatch(item,p))feedback=item.wordDecision.gateCondition.wrong; else if(w.kind==='word-use'&&item.wordDecision?.regularRepeat&&!regularRepeatMatch(item,p))feedback=item.wordDecision.regularRepeat.wrong; else if(w.kind==='word-use'&&item.wordDecision?.drySeats&&!drySeatsMatch(item,p))feedback=item.wordDecision.drySeats.wrong; else if(w.kind==='word-use'&&item.wordDecision?.actionCount&&!actionCountMatch(item,p))feedback=item.wordDecision.actionCount.wrong; else if(w.kind==='word-use'&&item.wordDecision?.carbonDioxide&&!carbonDioxideMatch(item,p))feedback=item.wordDecision.carbonDioxide.wrong; else if(w.kind==='word-use'&&item.wordDecision?.materialSort&&!materialSortMatch(item,p))feedback=item.wordDecision.materialSort.wrong; else if(w.kind==='word-use'&&item.wordDecision?.supportLinks&&!supportLinksMatch(item,p))feedback=item.wordDecision.supportLinks.wrong; else if(w.kind==='word-use'&&item.wordDecision?.inlandRoute&&!inlandRouteMatch(item,p))feedback=item.wordDecision.inlandRoute.wrong; else if(w.kind==='word-use'&&item.wordDecision?.sustainableAnd&&!sustainableAndMatch(item,p))feedback=item.wordDecision.sustainableAnd.wrong; else if(w.kind==='word-use'&&item.wordDecision?.overlap&&!overlapMatch(item,p))feedback=item.wordDecision.overlap.wrong; else if(w.kind==='word-use'&&item.wordDecision?.widthFit&&!widthFitMatchesItem(item,p))feedback=item.wordDecision.widthFit.wrong; else if(w.kind==='word-use'&&item.wordDecision?.almostLevel&&!almostLevelMatchesItem(item,p))feedback=item.wordDecision.almostLevel.wrong; else if(w.kind==='word-use'&&item.wordDecision?.zeroGroup&&!zeroGroupMatchesItem(item,p))feedback=item.wordDecision.zeroGroup.wrong; else if(w.kind==='word-use'&&item.wordDecision?.pathRole&&!pathRoleMatchesItem(item,p))feedback=item.wordDecision.pathRole.wrong; else if(w.kind==='word-use'&&item.wordDecision?.spatialFrame&&!spatialFrameMatchesItem(item,p))feedback=item.wordDecision.spatialFrame.wrong; else if(w.kind==='word-use'&&item.wordDecision?.relationScene&&!relationSceneMatchesItem(item,p))feedback=item.wordDecision.relationScene.wrong; else if(w.kind==='word-use'&&item.wordDecision?.routeFrame&&!routeFrameMatchesItem(item,p))feedback=item.wordDecision.routeFrame.wrong; else if(w.kind==='word-use'&&item.wordDecision?.timeScope&&!timeScopeMatchesItem(item,p))feedback=item.wordDecision.timeScope.wrong; else if(w.kind==='word-use'&&item.wordDecision?.speedMeaning&&!speedMeaningMatchesItem(item,p))feedback=item.wordDecision.speedMeaning.wrong; else if(w.kind==='word-use'&&item.wordDecision?.colourAllocation&&!colourAllocationMatchesItem(item,p))feedback=item.wordDecision.colourAllocation.wrong; else if(w.kind==='word-use'&&item.wordDecision?.lidCoverage&&!lidCoverageMatchesItem(item,p))feedback=item.wordDecision.lidCoverage.wrong; else if(w.kind==='word-use'&&item.wordDecision?.plantNeeds&&!plantNeedsMatchesItem(item,p))feedback=item.wordDecision.plantNeeds.wrong; else if(w.kind==='word-use'&&item.wordDecision?.reportFrame&&!reportFrameMatchesItem(item,p))feedback=item.wordDecision.reportFrame.wrong; else if(w.kind==='word-use'&&item.wordDecision?.senseFrame&&!senseFrameMatchesItem(item,p))feedback=item.wordDecision.senseFrame.wrong; else if(w.kind==='word-use'&&item.wordDecision?.methodDirection&&!methodDirectionMatchesItem(item,p))feedback=item.wordDecision.methodDirection.wrong; else if(w.kind==='word-use'&&item.wordDecision?.positionInstruction&&!positionInstructionMatchesItem(item,p))feedback=item.wordDecision.positionInstruction.wrong; else if(w.kind==='word-use'&&item.wordDecision?.forceDirection&&!forceDirectionMatchesItem(item,p))feedback=item.wordDecision.forceDirection.wrong; else if(w.kind==='word-use'&&item.wordDecision?.everyoneArrived&&!everyoneArrivedMatchesItem(item,p))feedback=item.wordDecision.everyoneArrived.wrong; else if(w.kind==='word-use'&&item.wordDecision?.actionGoal&&!actionGoalMatchesItem(item,p))feedback=item.wordDecision.actionGoal.wrong; else if(w.kind==='word-use'&&item.wordDecision?.entrySequence&&!entrySequenceMatchesItem(item,p))feedback=item.wordDecision.entrySequence.wrong; else if(w.kind==='word-use'&&item.wordDecision?.lineIntersection&&!lineIntersectionMatchesItem(item,p))feedback=item.wordDecision.lineIntersection.wrong; else if(w.kind==='word-use'&&item.wordDecision?.armPose&&!armPoseMatchesItem(item,p))feedback=item.wordDecision.armPose.wrong; else if(w.kind==='word-use'&&item.wordDecision?.clothPieces&&!clothPiecesMatchesItem(item,p))feedback=item.wordDecision.clothPieces.wrong; else if(w.kind==='word-use'&&item.wordDecision?.cornerFold&&!cornerFoldMatchesItem(item,p))feedback=item.wordDecision.cornerFold.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodSeparation&&!foodSeparationMatchesItem(item,p))feedback=item.wordDecision.foodSeparation.wrong; else if(w.kind==='word-use'&&item.wordDecision?.mealReadiness&&!mealReadinessMatchesItem(item,p))feedback=item.wordDecision.mealReadiness.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodPortions&&!foodPortionsMatchesItem(item,p))feedback=item.wordDecision.foodPortions.wrong; else if(w.kind==='word-use'&&item.wordDecision?.noodleFall&&!noodleFallMatchesItem(item,p))feedback=item.wordDecision.noodleFall.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodRoles&&!foodRolesMatchesItem(item,p))feedback=item.wordDecision.foodRoles.wrong; else if(w.kind==='word-use'&&item.wordDecision?.remainingTin&&!remainingTinMatchesItem(item,p))feedback=item.wordDecision.remainingTin.wrong; else if(w.kind==='word-use'&&item.wordDecision?.nearBefore&&!nearBeforeMatchesItem(item,p))feedback=item.wordDecision.nearBefore.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodExtent&&!foodExtentMatchesItem(item,p))feedback=item.wordDecision.foodExtent.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodNoun&&!foodNounMatchesItem(item,p))feedback=item.wordDecision.foodNoun.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodReturn&&!foodReturnMatchesItem(item,p))feedback=item.wordDecision.foodReturn.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodPairing&&!foodPairingMatchesItem(item,p))feedback=item.wordDecision.foodPairing.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodPurpose&&!foodPurposeMatchesItem(item,p))feedback=item.wordDecision.foodPurpose.wrong; else if(w.kind==='word-use'&&item.wordDecision?.recipeLess&&!recipeLessMatchesItem(item,p))feedback=item.wordDecision.recipeLess.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodLayer&&!foodLayerMatchesItem(item,p))feedback=item.wordDecision.foodLayer.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodChange&&!foodChangeMatchesItem(item,p))feedback=item.wordDecision.foodChange.wrong; else if(w.kind==='word-use'&&item.wordDecision?.fruitPrep&&!fruitPrepMatchesItem(item,p))feedback=item.wordDecision.fruitPrep.wrong; else if(w.kind==='word-use'&&item.wordDecision?.containerFit&&!containerFitMatchesItem(item,p))feedback=item.wordDecision.containerFit.wrong; else if(w.kind==='word-use'&&item.wordDecision?.fruitFall&&!fruitFallMatchesItem(item,p))feedback=item.wordDecision.fruitFall.wrong; else if(w.kind==='word-use'&&item.wordDecision?.fruitScene&&!fruitSceneMatchesItem(item,p))feedback=item.wordDecision.fruitScene.wrong; else if(w.kind==='word-use'&&item.wordDecision?.stoneSides&&!stoneSidesMatchesItem(item,p))feedback=item.wordDecision.stoneSides.wrong; else if(w.kind==='word-use'&&item.wordDecision?.softCentre&&!softCentreMatchesItem(item,p))feedback=item.wordDecision.softCentre.wrong; else if(w.kind==='word-use'&&item.wordDecision?.vegetablePrep&&!vegetablePrepMatchesItem(item,p))feedback=item.wordDecision.vegetablePrep.wrong; else if(w.kind==='word-use'&&item.wordDecision?.vegetableEffect&&!vegetableEffectMatchesItem(item,p))feedback=item.wordDecision.vegetableEffect.wrong; else if(w.kind==='word-use'&&item.wordDecision?.peaMotion&&!peaMotionMatchesItem(item,p))feedback=item.wordDecision.peaMotion.wrong; else if(w.kind==='word-use'&&item.wordDecision?.foodCondition&&!foodConditionMatchesItem(item,p))feedback=item.wordDecision.foodCondition.wrong; else if(w.kind==='word-use'&&item.wordDecision?.flavourSense&&!flavourSenseMatchesItem(item,p))feedback=item.wordDecision.flavourSense.wrong; else if(w.kind==='word-use'&&item.wordDecision?.heavyForOne&&!heavyForOneMatchesItem(item,p))feedback=item.wordDecision.heavyForOne.wrong; else if(w.kind==='word-use'&&item.wordDecision?.tasteScope&&!tasteScopeMatchesItem(item,p))feedback=item.wordDecision.tasteScope.wrong; else if(w.kind==='word-use'&&item.wordDecision?.ripeNow&&!ripeNowMatchesItem(item,p))feedback=item.wordDecision.ripeNow.wrong; else if(w.kind==='word-use'&&item.wordDecision?.rawBoard&&!rawBoardMatchesItem(item,p))feedback=item.wordDecision.rawBoard.wrong; else if(w.kind==='word-use'&&item.wordDecision?.appleRemoval&&!appleRemovalMatchesItem(item,p))feedback=item.wordDecision.appleRemoval.wrong; else if(w.kind==='word-use'&&item.wordDecision?.cookingEndpoint&&!cookingEndpointMatchesItem(item,p))feedback=item.wordDecision.cookingEndpoint.wrong; else if(w.kind==='word-use'&&item.wordDecision?.steamCover&&!steamCoverMatchesItem(item,p))feedback=item.wordDecision.steamCover.wrong; else if(w.kind==='word-use'&&item.wordDecision?.gentleHeat&&!gentleHeatMatchesItem(item,p))feedback=item.wordDecision.gentleHeat.wrong; else if(w.kind==='word-use'&&item.wordDecision?.mixBowl&&!mixBowlMatchesItem(item,p))feedback=item.wordDecision.mixBowl.wrong; else if(w.kind==='word-use'&&item.wordDecision?.textureResult&&!textureResultMatchesItem(item,p))feedback=item.wordDecision.textureResult.wrong; else if(w.kind==='word-use'&&item.wordDecision?.bananaOver&&!bananaOverMatchesItem(item,p))feedback=item.wordDecision.bananaOver.wrong; else if(w.kind==='word-use'&&item.wordDecision?.lemonSlice&&!lemonSliceMatchesItem(item,p))feedback=item.wordDecision.lemonSlice.wrong; else if(w.kind==='word-use'&&item.wordDecision?.mainRole&&!mainRoleMatchesItem(item,p))feedback=item.wordDecision.mainRole.wrong; else if(w.kind==='word-use'&&item.wordDecision?.tableDust&&!tableDustMatchesItem(item,p))feedback=item.wordDecision.tableDust.wrong; else if(w.kind==='word-use'&&item.wordDecision?.kitchenCondition&&!kitchenConditionMatchesItem(item,p))feedback=item.wordDecision.kitchenCondition.wrong; else if(w.kind==='word-use'&&item.wordDecision?.kitchenPlace&&!kitchenPlaceMatchesItem(item,p))feedback=item.wordDecision.kitchenPlace.wrong; else if(w.kind==='word-use'&&item.wordDecision?.tapWhile&&!tapWhileMatchesItem(item,p))feedback=item.wordDecision.tapWhile.wrong; else if(w.kind==='word-use'&&item.wordDecision?.neededFill&&!neededFillMatchesItem(item,p))feedback=item.wordDecision.neededFill.wrong; else if(w.kind==='word-use'&&item.wordDecision?.vesselDetail&&!vesselDetailMatchesItem(item,p))feedback=item.wordDecision.vesselDetail.wrong; else if(w.kind==='word-use'&&item.wordDecision?.utensilFacing&&!utensilFacingMatchesItem(item,p))feedback=item.wordDecision.utensilFacing.wrong; else if(w.kind==='word-use'&&item.wordDecision?.spoonLength&&!spoonLengthMatchesItem(item,p))feedback=item.wordDecision.spoonLength.wrong; else if(w.kind==='word-use'&&item.wordDecision?.stickThrough&&!stickThroughMatchesItem(item,p))feedback=item.wordDecision.stickThrough.wrong; else if(w.kind==='word-use'&&item.wordDecision?.eachNapkin&&!eachNapkinMatchesItem(item,p))feedback=item.wordDecision.eachNapkin.wrong; else if(w.kind==='word-use'&&item.wordDecision?.jamJar&&!jamJarMatchesItem(item,p))feedback=item.wordDecision.jamJar.wrong; else if(w.kind==='word-use'&&item.wordDecision?.clothesWindow&&!clothesWindowMatchesItem(item,p))feedback=item.wordDecision.clothesWindow.wrong; else if(w.kind==='word-use'&&item.wordDecision?.buttonDetail&&!buttonDetailMatchesItem(item,p))feedback=item.wordDecision.buttonDetail.wrong; else if(w.kind==='word-use'&&item.wordDecision?.plainFabric&&!plainFabricMatchesItem(item,p))feedback=item.wordDecision.plainFabric.wrong; else if(w.kind==='word-use'&&item.wordDecision?.hoodScope&&!hoodScopeMatchesItem(item,p))feedback=item.wordDecision.hoodScope.wrong; else if(w.kind==='word-use'&&item.wordDecision?.woolWarm&&!woolWarmMatchesItem(item,p))feedback=item.wordDecision.woolWarm.wrong; else if(w.kind==='word-use'&&item.wordDecision?.chairBack&&!chairBackMatchesItem(item,p))feedback=item.wordDecision.chairBack.wrong; else if(w.kind==='word-use'&&item.wordDecision?.cyclingLength&&!cyclingLengthMatchesItem(item,p))feedback=item.wordDecision.cyclingLength.wrong; else if(w.kind==='word-use'&&item.wordDecision?.hiddenPocket&&!hiddenPocketMatchesItem(item,p))feedback=item.wordDecision.hiddenPocket.wrong; else if(w.kind==='word-use'&&item.wordDecision?.curtainDress&&!curtainDressMatchesItem(item,p))feedback=item.wordDecision.curtainDress.wrong; else if(w.kind==='word-use'&&item.wordDecision?.stageSuit&&!stageSuitMatchesItem(item,p))feedback=item.wordDecision.stageSuit.wrong; else if(w.kind==='word-use'&&item.wordDecision?.leftShoeStone&&!leftShoeStoneMatchesItem(item,p))feedback=item.wordDecision.leftShoeStone.wrong; else if(w.kind==='word-use'&&item.wordDecision?.bootMud&&!bootMudMatchesItem(item,p))feedback=item.wordDecision.bootMud.wrong; else if(w.kind==='word-use'&&item.wordDecision?.slipperUnder&&!slipperUnderMatchesItem(item,p))feedback=item.wordDecision.slipperUnder.wrong; else if(w.kind==='word-use'&&item.wordDecision?.capInto&&!capIntoMatchesItem(item,p))feedback=item.wordDecision.capInto.wrong; else if(w.kind==='word-use'&&item.wordDecision?.scarfWrap&&!scarfWrapMatchesItem(item,p))feedback=item.wordDecision.scarfWrap.wrong; else if(w.kind==='word-use'&&item.wordDecision?.gloveFound&&!gloveFoundMatchesItem(item,p))feedback=item.wordDecision.gloveFound.wrong; else if(w.kind==='word-use'&&item.wordDecision?.beltSupport&&!beltSupportMatchesItem(item,p))feedback=item.wordDecision.beltSupport.wrong; else if(w.kind==='word-use'&&item.wordDecision?.ticketPocket&&!ticketPocketMatchesItem(item,p))feedback=item.wordDecision.ticketPocket.wrong; else if(w.kind==='word-use'&&item.wordDecision?.zipState&&!zipStateMatchesItem(item,p))feedback=item.wordDecision.zipState.wrong; else if(w.kind==='word-use'&&item.wordDecision?.helmetAsk&&!helmetAskMatchesItem(item,p))feedback=item.wordDecision.helmetAsk.wrong; else if(w.kind==='word-use'&&item.wordDecision?.gloveFit&&!gloveFitMatchesItem(item,p))feedback=item.wordDecision.gloveFit.wrong; else if(w.kind==='word-use'&&item.wordDecision?.buttonMatch&&!buttonMatchMatchesItem(item,p))feedback=item.wordDecision.buttonMatch.wrong; else if(w.kind==='word-use'&&item.wordDecision?.cottonShirt&&!cottonShirtMatchesItem(item,p))feedback=item.wordDecision.cottonShirt.wrong; else if(w.kind==='word-use'&&item.wordDecision?.localWool&&!localWoolMatchesItem(item,p))feedback=item.wordDecision.localWool.wrong; else if(w.kind==='word-use'&&item.wordDecision?.umbrellaUntil&&!umbrellaUntilMatchesItem(item,p))feedback=item.wordDecision.umbrellaUntil.wrong; else if(w.kind==='word-use'&&item.wordDecision?.processOrder&&!processOrderMatch(item,p))feedback=item.wordDecision.processOrder.wrong; else if(w.kind==='word-use'&&item.wordDecision?.queueMove&&!queueMoveMatch(item,p))feedback=item.wordDecision.queueMove.wrong; else if(w.kind==='word-use'&&item.wordDecision?.shelfRoom&&!shelfRoomMatch(item,p))feedback=item.wordDecision.shelfRoom.wrong; else if(w.kind==='word-use'&&item.wordDecision?.fileDesk&&!fileDeskMatch(item,p))feedback=item.wordDecision.fileDesk.wrong; else if(w.kind==='word-use'&&item.wordDecision?.titleArrow&&!titleArrowMatch(item,p))feedback=item.wordDecision.titleArrow.wrong; else if(w.kind==='word-use'&&item.wordDecision?.offlinePage&&!offlinePageMatch(item,p))feedback=item.wordDecision.offlinePage.wrong; else if(w.kind==='word-use'&&item.wordDecision?.nameGroups&&!nameGroupsMatch(item,p))feedback=item.wordDecision.nameGroups.wrong; else if(w.kind==='word-use'&&item.wordDecision?.phoneMode&&!phoneModeMatch(item,p))feedback=item.wordDecision.phoneMode.wrong; else if(w.kind==='word-use'&&item.wordDecision?.printPages&&!printPagesMatch(item,p))feedback=item.wordDecision.printPages.wrong; else if(w.kind==='word-use'&&item.wordDecision?.chance&&!chanceMatches(item,p))feedback=item.wordDecision.chance.wrong; else if(w.kind==='word-use'&&item.wordDecision?.boat&&!boatMatches(item,p))feedback=item.wordDecision.boat.wrong; else if(w.kind==='word-use'&&item.wordDecision?.shift&&!shiftMatches(item,p))feedback=item.wordDecision.shift.wrong; else if(w.kind==='word-use'&&item.wordDecision?.provision&&!provisionMatches(item,p))feedback=item.wordDecision.provision.wrong; else if(w.kind==='word-use'&&item.wordDecision?.thermal&&!thermalMatches(item,p))feedback=item.wordDecision.thermal.wrong; else if(w.kind==='word-use'&&item.wordDecision?.daylight&&!daylightMatches(item,p))feedback=item.wordDecision.daylight.wrong; else if(w.kind==='word-use'&&item.wordDecision?.weather&&!weatherMatches(item,p))feedback=item.wordDecision.weather.wrong; else if(w.kind==='word-use'&&item.wordDecision?.door&&!doorMatches(item,p))feedback=item.wordDecision.door.wrong; else if(w.kind==='word-use'&&item.wordDecision?.rotation&&!rotationMatches(item,p))feedback=item.wordDecision.rotation.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.ruler&&!rulerMatches(item,p))feedback=item.wordDecision.ruler.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.quantity&&!quantityMatches(item,p))feedback=item.wordDecision.quantity.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.recordSelection&&!recordsMatch(item,p))feedback=item.wordDecision.recordSelection.wrong;
 else if(w.kind==='word-use'&&item.wordDecision?.clock&&!clockMatches(item,p))feedback=item.wordDecision.clock.wrong;
 else if(w.kind==='word-use'&&item.wordDecision&&!wordDecisionMatches(item,p,k))feedback=item.options?.find(o=>o.id===selected)?.reason??'先选出符合情境的理解，再核对词形。';
 else if(w.kind==='word-use'&&vCaseOnly(item,input))feedback=`词形写对了，但这里要注意大小写：${item.answer}。`;
 else if(w.kind==='word-use'&&item.usage?.alternatives[normalizedAnswer(input)])feedback=`你输入了 ${input}，图中物品的方向也变了。${item.usage.caption} ${item.reason}`;
 else if(w.kind==='word-use'){const n=[...input].findIndex((c,i)=>c.toLocaleLowerCase('en')!==item.answer[i]?.toLocaleLowerCase('en'));feedback=`句中需要表达“${item.meaning}”。${input?`从第 ${n<0?Math.min(input.length,item.answer.length)+1:n+1} 个字符起核对，注意词形和空格。`:'先根据语境写出这个词。'}${item.hint}`}
  else if(w.kind==='compose'&&item.sourceRecall&&!recallReady(item,p))feedback='先遮住词表，逐格留下尝试，再揭开对照。想不起来可以写“不记得”。';
  else if(w.kind==='compose'&&!briefMatches(item,p))feedback=item.composeOcclusion&&!composeOcclusionMatch(p.answers[composeOcclusionKey(item.id)]??'')?item.composeOcclusion.wrong:item.composeCoverage&&!composeCoverageMatch(p.answers[composeCoverageKey(item.id)]??'')?item.composeCoverage.wrong:item.composeWatch&&!composeWatchMatch(p.answers[composeWatchKey(item.id)]??'')?item.composeWatch.wrong:item.composeConditions&&!composeConditionsMatch(item.composeConditions,p.answers[composeConditionsKey(item.id)]??'')?item.composeConditions.wrong:item.composeTouches&&!composeTouchesMatch(item.composeTouches,p.answers[composeTouchesKey(item.id)]??'')?item.composeTouches.wrong:item.composeOrder&&!selectedProcessOrderMatch(item.composeOrder,p.answers['composeOrder-'+item.id]??'')?item.composeOrder.wrong:item.composeBrief?.wrong??'请先完成计划卡。';
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
 return{composeOrder:item.composeOrder?composeOrderView(item.composeOrder,p,item.id):undefined,composeFrame:(item.composeArt?.frames===2||item.composeArt?.frames===3)&&Array.from({length:item.composeArt.frames},(_,i)=>String(i)).includes(p.answers['composeFrame-'+item.id]??'')?Number(p.answers['composeFrame-'+item.id]):0,composeTouches:item.composeTouches?composeTouchesView(item.composeTouches,p.answers[composeTouchesKey(item.id)]??''):undefined,composeConditions:item.composeConditions?composeConditionsView(item.composeConditions,p.answers[composeConditionsKey(item.id)]??''):undefined,composeWatch:item.composeWatch?composeWatchView(item.composeWatch,p.answers[composeWatchKey(item.id)]??'',p.answers[composeWatchPhotoKey(item.id)]??''):undefined,composeCoverage:item.composeCoverage?composeCoverageView(item.composeCoverage,p.answers[composeCoverageKey(item.id)]??''):undefined,composeOcclusion:item.composeOcclusion?composeOcclusionView(item.composeOcclusion,p.answers[composeOcclusionKey(item.id)]??''):undefined,composeBrief:item.composeBrief?composeBriefView(item.composeBrief,p.answers[composeBriefKey(item.id)]??''):undefined,wordBusBudget:item.wordDecision?.busBudget?wordBusBudgetView(item.wordDecision.busBudget,p.answers[wordBusBudgetKey(item.id)]??''):undefined,wordStampPlacement:item.wordDecision?.stampPlacement?wordStampPlacementView(item.wordDecision.stampPlacement,p.answers[wordStampPlacementKey(item.id)]??''):undefined,wordEachItem:item.wordDecision?.eachItem?wordEachItemView(item.wordDecision.eachItem,p.answers[wordEachItemKey(item.id)]??''):undefined,wordRouteTraffic:item.wordDecision?.routeTraffic?wordRouteTrafficView(item.wordDecision.routeTraffic,p.answers[wordRouteTrafficKey(item.id)]??''):undefined,wordPaperUse:item.wordDecision?.paperUse?wordPaperUseView(item.wordDecision.paperUse,p.answers[wordPaperUseKey(item.id)]??''):undefined,wordPathSteps:item.wordDecision?.pathSteps?wordPathStepsView(item.wordDecision.pathSteps,p.answers[wordPathStepsKey(item.id)]??''):undefined,wordRectangleRatio:item.wordDecision?.rectangleRatio?wordRectangleRatioView(item.wordDecision.rectangleRatio,p.answers[wordRectangleRatioKey(item.id)]??''):undefined,wordSpotWings:item.wordDecision?.spotWings?wordSpotWingsView(item.wordDecision.spotWings,p.answers[wordSpotWingsKey(item.id)]??''):undefined,wordWireOrder:item.wordDecision?.wireOrder?wordWireOrderView(item.wordDecision.wireOrder,p.answers[wordWireOrderKey(item.id)]??''):undefined,wordRobotWave:item.wordDecision?.robotWave?wordRobotWaveView(item.wordDecision.robotWave,p.answers[wordRobotWaveKey(item.id)]??''):undefined,wordShadePanel:item.wordDecision?.shadePanel?wordShadePanelView(item.wordDecision.shadePanel,p.answers[wordShadePanelKey(item.id)]??''):undefined,wordDepthLine:item.wordDecision?.depthLine?wordDepthLineView(item.wordDecision.depthLine,p.answers[wordDepthLineKey(item.id)]??''):undefined,wordWaterPair:item.wordDecision?.waterPair?wordWaterPairView(item.wordDecision.waterPair,p.answers[wordWaterPairKey(item.id)]??''):undefined,wordObserve:item.wordDecision?.observe?wordObserveView(item.wordDecision.observe,p.answers[wordObserveKey(item.id)]??''):undefined,wordMolecule:item.wordDecision?.molecule?wordMoleculeView(item.wordDecision.molecule,p.answers[wordMoleculeKey(item.id)]??''):undefined,wordCart:item.wordDecision?.cart?wordCartView(item.wordDecision.cart,p.answers[wordCartKey(item.id)]??''):undefined,wordPattern:item.wordDecision?.pattern?wordPatternView(item.wordDecision.pattern,p.answers[wordPatternKey(item.id)]??''):undefined,wordPreference:item.wordDecision?.preference?wordPreferenceView(item.wordDecision.preference,p.answers[wordPreferenceKey(item.id)]??''):undefined,wordFlash:item.wordDecision?.flash?wordFlashView(item.wordDecision.flash,p.answers[wordFlashKey(item.id)]??''):undefined,wordRouteWeather:item.wordDecision?.routeWeather?wordRouteWeatherView(item.wordDecision.routeWeather,p.answers[wordRouteWeatherKey(item.id)]??''):undefined,wordDottedRoute:item.wordDecision?.dottedRoute?wordDottedRouteView(item.wordDecision.dottedRoute,p.answers[wordDottedRouteKey(item.id)]??''):undefined,wordContributions:item.wordDecision?.contributions?wordContributionsView(item.wordDecision.contributions,p.answers[wordContributionsKey(item.id)]??''):undefined,wordCurtainExit:item.wordDecision?.curtainExit?wordCurtainExitView(item.wordDecision.curtainExit,p.answers[wordCurtainExitKey(item.id)]??''):undefined,wordRiverImagine:item.wordDecision?.riverImagine?wordRiverImagineView(item.wordDecision.riverImagine,p.answers[wordRiverImagineKey(item.id)]??''):undefined,wordGuessScale:item.wordDecision?.guessScale?wordGuessScaleView(item.wordDecision.guessScale,p.answers[wordGuessScaleKey(item.id)]??''):undefined,wordTornMap:item.wordDecision?.tornMap?wordTornMapView(item.wordDecision.tornMap,p.answers[wordTornMapKey(item.id)]??''):undefined,wordInterestRoles:item.wordDecision?.interestRoles?wordInterestRolesView(item.wordDecision.interestRoles,p.answers[wordInterestRolesKey(item.id)]??''):undefined,wordBoxFit:item.wordDecision?.boxFit?wordBoxFitView(item.wordDecision.boxFit,p.answers[wordBoxFitKey(item.id)]??''):undefined,wordUArticle:item.wordDecision?.uArticle?wordUArticleView(item.wordDecision.uArticle,p.answers[wordUArticleKey(item.id)]??''):undefined,wordJarChange:item.wordDecision?.jarChange?wordJarChangeView(item.wordDecision.jarChange,p.answers[wordJarChangeKey(item.id)]??''):undefined,wordDoughEqual:item.wordDecision?.doughEqual?wordDoughEqualView(item.wordDecision.doughEqual,p.answers[wordDoughEqualKey(item.id)]??''):undefined,wordLeafSimilar:item.wordDecision?.leafSimilar?wordLeafSimilarView(item.wordDecision.leafSimilar,p.answers[wordLeafSimilarKey(item.id)]??''):undefined,wordFreeSunday:item.wordDecision?.freeSunday?wordFreeSundayView(item.wordDecision.freeSunday,p.answers[wordFreeSundayKey(item.id)]??''):undefined,wordGateFirm:item.wordDecision?.gateFirm?wordGateFirmView(item.wordDecision.gateFirm,p.answers[wordGateFirmKey(item.id)]??''):undefined,wordEntranceFacing:item.wordDecision?.entranceFacing?wordEntranceFacingView(item.wordDecision.entranceFacing,p.answers[wordEntranceFacingKey(item.id)]??''):undefined,wordPostRedaction:item.wordDecision?.postRedaction?wordPostRedactionView(item.wordDecision.postRedaction,p.answers[wordPostRedactionKey(item.id)]??''):undefined,wordNearlyFinish:item.wordDecision?.nearlyFinish?wordNearlyFinishView(item.wordDecision.nearlyFinish,p.answers[wordNearlyFinishKey(item.id)]??''):undefined,wordExactAlignment:item.wordDecision?.exactAlignment?wordExactAlignmentView(item.wordDecision.exactAlignment,p.answers[wordExactAlignmentKey(item.id)]??''):undefined,wordGateCondition:item.wordDecision?.gateCondition?wordGateConditionView(item.wordDecision.gateCondition,p.answers[wordGateConditionKey(item.id)]??''):undefined,wordRegularRepeat:item.wordDecision?.regularRepeat?wordRegularRepeatView(item.wordDecision.regularRepeat,p.answers[wordRegularRepeatKey(item.id)]??''):undefined,wordDrySeats:item.wordDecision?.drySeats?wordDrySeatsView(item.wordDecision.drySeats,p.answers[wordDrySeatsKey(item.id)]??''):undefined,wordActionCount:item.wordDecision?.actionCount?wordActionCountView(item.wordDecision.actionCount,p.answers[wordActionCountKey(item.id)]??''):undefined,wordCarbonDioxide:item.wordDecision?.carbonDioxide?wordCarbonDioxideView(item.wordDecision.carbonDioxide,p.answers[wordCarbonDioxideKey(item.id)]??''):undefined,wordMaterialSort:item.wordDecision?.materialSort?wordMaterialSortView(item.wordDecision.materialSort,p.answers[wordMaterialSortKey(item.id)]??''):undefined,wordSupportLinks:item.wordDecision?.supportLinks?wordSupportLinksView(item.wordDecision.supportLinks,p.answers[wordSupportLinksKey(item.id)]??''):undefined,wordInlandRoute:item.wordDecision?.inlandRoute?wordInlandRouteView(item.wordDecision.inlandRoute,p.answers[wordInlandRouteKey(item.id)]??''):undefined,wordSustainableAnd:item.wordDecision?.sustainableAnd?wordSustainableAndView(item.wordDecision.sustainableAnd,p.answers[wordSustainableAndKey(item.id)]??''):undefined,wordOverlap:item.wordDecision?.overlap?wordOverlapView(item.wordDecision.overlap,p.answers[wordOverlapKey(item.id)]??''):undefined,wordWidthFit:item.wordDecision?.widthFit?wordWidthFitView(item.wordDecision.widthFit,p.answers[wordWidthFitKey(item.id)]??''):undefined,wordAlmostLevel:item.wordDecision?.almostLevel?wordAlmostLevelView(item.wordDecision.almostLevel,p.answers[wordAlmostLevelKey(item.id)]??''):undefined,wordZeroGroup:item.wordDecision?.zeroGroup?wordZeroGroupView(item.wordDecision.zeroGroup,p.answers[wordZeroGroupKey(item.id)]??''):undefined,wordPathRole:item.wordDecision?.pathRole?wordPathRoleView(item.wordDecision.pathRole,p.answers[wordPathRoleKey(item.id)]??''):undefined,wordSpatialFrame:item.wordDecision?.spatialFrame?wordSpatialFrameView(item.wordDecision.spatialFrame,p.answers[wordSpatialFrameKey(item.id)]??''):undefined,wordRelationScene:item.wordDecision?.relationScene?wordRelationSceneView(item.wordDecision.relationScene,p.answers[wordRelationSceneKey(item.id)]??''):undefined,wordRouteFrame:item.wordDecision?.routeFrame?wordRouteFrameView(item.wordDecision.routeFrame,p.answers[wordRouteFrameKey(item.id)]??''):undefined,wordTimeScope:item.wordDecision?.timeScope?wordTimeScopeView(item.wordDecision.timeScope,p.answers[wordTimeScopeKey(item.id)]??''):undefined,wordSpeedMeaning:item.wordDecision?.speedMeaning?wordSpeedMeaningView(item.wordDecision.speedMeaning,p.answers[wordSpeedMeaningKey(item.id)]??''):undefined,wordColourAllocation:item.wordDecision?.colourAllocation?wordColourAllocationView(item.wordDecision.colourAllocation,p.answers[wordColourAllocationKey(item.id)]??''):undefined,wordLidCoverage:item.wordDecision?.lidCoverage?wordLidCoverageView(item.wordDecision.lidCoverage,p.answers[wordLidCoverageKey(item.id)]??''):undefined,wordPlantNeeds:item.wordDecision?.plantNeeds?wordPlantNeedsView(item.wordDecision.plantNeeds,p.answers[wordPlantNeedsKey(item.id)]??''):undefined,wordReportFrame:item.wordDecision?.reportFrame?wordReportFrameView(item.wordDecision.reportFrame,p.answers[wordReportFrameKey(item.id)]??''):undefined,wordSenseFrame:item.wordDecision?.senseFrame?wordSenseFrameView(item.wordDecision.senseFrame,p.answers[wordSenseFrameKey(item.id)]??''):undefined,wordMethodDirection:item.wordDecision?.methodDirection?wordMethodDirectionView(item.wordDecision.methodDirection,p.answers[wordMethodDirectionKey(item.id)]??''):undefined,wordPositionInstruction:item.wordDecision?.positionInstruction?wordPositionInstructionView(item.wordDecision.positionInstruction,p.answers[wordPositionInstructionKey(item.id)]??''):undefined,wordForceDirection:item.wordDecision?.forceDirection?wordForceDirectionView(item.wordDecision.forceDirection,p.answers[wordForceDirectionKey(item.id)]??''):undefined,wordEveryoneArrived:item.wordDecision?.everyoneArrived?wordEveryoneArrivedView(item.wordDecision.everyoneArrived,p.answers[wordEveryoneArrivedKey(item.id)]??''):undefined,wordActionGoal:item.wordDecision?.actionGoal?wordActionGoalView(item.wordDecision.actionGoal,p.answers[wordActionGoalKey(item.id)]??''):undefined,wordEntrySequence:item.wordDecision?.entrySequence?wordEntrySequenceView(item.wordDecision.entrySequence,p.answers[wordEntrySequenceKey(item.id)]??''):undefined,wordLineIntersection:item.wordDecision?.lineIntersection?wordLineIntersectionView(item.wordDecision.lineIntersection,p.answers[wordLineIntersectionKey(item.id)]??''):undefined,wordArmPose:item.wordDecision?.armPose?wordArmPoseView(item.wordDecision.armPose,p.answers[wordArmPoseKey(item.id)]??''):undefined,wordClothPieces:item.wordDecision?.clothPieces?wordClothPiecesView(item.wordDecision.clothPieces,p.answers[wordClothPiecesKey(item.id)]??''):undefined,wordCornerFold:item.wordDecision?.cornerFold?wordCornerFoldView(item.wordDecision.cornerFold,p.answers[wordCornerFoldKey(item.id)]??''):undefined,wordFoodSeparation:item.wordDecision?.foodSeparation?wordFoodSeparationView(item.wordDecision.foodSeparation,p.answers[wordFoodSeparationKey(item.id)]??''):undefined,wordMealReadiness:item.wordDecision?.mealReadiness?wordMealReadinessView(item.wordDecision.mealReadiness,p.answers[wordMealReadinessKey(item.id)]??''):undefined,wordFoodPortions:item.wordDecision?.foodPortions?wordFoodPortionsView(item.wordDecision.foodPortions,p.answers[wordFoodPortionsKey(item.id)]??''):undefined,wordNoodleFall:item.wordDecision?.noodleFall?wordNoodleFallView(item.wordDecision.noodleFall,p.answers[wordNoodleFallKey(item.id)]??''):undefined,wordFoodRoles:item.wordDecision?.foodRoles?wordFoodRolesView(item.wordDecision.foodRoles,p.answers[wordFoodRolesKey(item.id)]??''):undefined,wordRemainingTin:item.wordDecision?.remainingTin?wordRemainingTinView(item.wordDecision.remainingTin,p.answers[wordRemainingTinKey(item.id)]??''):undefined,wordNearBefore:item.wordDecision?.nearBefore?wordNearBeforeView(item.wordDecision.nearBefore,p.answers[wordNearBeforeKey(item.id)]??''):undefined,wordFoodExtent:item.wordDecision?.foodExtent?wordFoodExtentView(item.wordDecision.foodExtent,p.answers[wordFoodExtentKey(item.id)]??''):undefined,wordFoodNoun:item.wordDecision?.foodNoun?wordFoodNounView(item.wordDecision.foodNoun,p.answers[wordFoodNounKey(item.id)]??''):undefined,wordFoodReturn:item.wordDecision?.foodReturn?wordFoodReturnView(item.wordDecision.foodReturn,p.answers[wordFoodReturnKey(item.id)]??''):undefined,wordFoodPairing:item.wordDecision?.foodPairing?wordFoodPairingView(item.wordDecision.foodPairing,p.answers[wordFoodPairingKey(item.id)]??''):undefined,wordFoodPurpose:item.wordDecision?.foodPurpose?wordFoodPurposeView(item.wordDecision.foodPurpose,p.answers[wordFoodPurposeKey(item.id)]??''):undefined,wordRecipeLess:item.wordDecision?.recipeLess?wordRecipeLessView(item.wordDecision.recipeLess,p.answers[wordRecipeLessKey(item.id)]??''):undefined,wordFoodLayer:item.wordDecision?.foodLayer?wordFoodLayerView(item.wordDecision.foodLayer,p.answers[wordFoodLayerKey(item.id)]??''):undefined,wordFoodChange:item.wordDecision?.foodChange?wordFoodChangeView(item.wordDecision.foodChange,p.answers[wordFoodChangeKey(item.id)]??''):undefined,wordFruitPrep:item.wordDecision?.fruitPrep?wordFruitPrepView(item.wordDecision.fruitPrep,p.answers[wordFruitPrepKey(item.id)]??''):undefined,wordContainerFit:item.wordDecision?.containerFit?wordContainerFitView(item.wordDecision.containerFit,p.answers[wordContainerFitKey(item.id)]??''):undefined,wordFruitFall:item.wordDecision?.fruitFall?wordFruitFallView(item.wordDecision.fruitFall,p.answers[wordFruitFallKey(item.id)]??''):undefined,wordFruitScene:item.wordDecision?.fruitScene?wordFruitSceneView(item.wordDecision.fruitScene,p.answers[wordFruitSceneKey(item.id)]??''):undefined,wordStoneSides:item.wordDecision?.stoneSides?wordStoneSidesView(item.wordDecision.stoneSides,p.answers[wordStoneSidesKey(item.id)]??''):undefined,wordSoftCentre:item.wordDecision?.softCentre?wordSoftCentreView(item.wordDecision.softCentre,p.answers[wordSoftCentreKey(item.id)]??''):undefined,wordVegetablePrep:item.wordDecision?.vegetablePrep?wordVegetablePrepView(item.wordDecision.vegetablePrep,p.answers[wordVegetablePrepKey(item.id)]??''):undefined,wordVegetableEffect:item.wordDecision?.vegetableEffect?wordVegetableEffectView(item.wordDecision.vegetableEffect,p.answers[wordVegetableEffectKey(item.id)]??''):undefined,wordPeaMotion:item.wordDecision?.peaMotion?wordPeaMotionView(item.wordDecision.peaMotion,p.answers[wordPeaMotionKey(item.id)]??''):undefined,wordFoodCondition:item.wordDecision?.foodCondition?wordFoodConditionView(item.wordDecision.foodCondition,p.answers[wordFoodConditionKey(item.id)]??''):undefined,wordFlavourSense:item.wordDecision?.flavourSense?wordFlavourSenseView(item.wordDecision.flavourSense,p.answers[wordFlavourSenseKey(item.id)]??''):undefined,wordHeavyForOne:item.wordDecision?.heavyForOne?wordHeavyForOneView(item.wordDecision.heavyForOne,p.answers[wordHeavyForOneKey(item.id)]??''):undefined,wordTasteScope:item.wordDecision?.tasteScope?wordTasteScopeView(item.wordDecision.tasteScope,p.answers[wordTasteScopeKey(item.id)]??''):undefined,wordRipeNow:item.wordDecision?.ripeNow?wordRipeNowView(item.wordDecision.ripeNow,p.answers[wordRipeNowKey(item.id)]??''):undefined,wordRawBoard:item.wordDecision?.rawBoard?wordRawBoardView(item.wordDecision.rawBoard,p.answers[wordRawBoardKey(item.id)]??''):undefined,wordAppleRemoval:item.wordDecision?.appleRemoval?wordAppleRemovalView(item.wordDecision.appleRemoval,p.answers[wordAppleRemovalKey(item.id)]??''):undefined,wordCookingEndpoint:item.wordDecision?.cookingEndpoint?wordCookingEndpointView(item.wordDecision.cookingEndpoint,p.answers[wordCookingEndpointKey(item.id)]??''):undefined,wordSteamCover:item.wordDecision?.steamCover?wordSteamCoverView(item.wordDecision.steamCover,p.answers[wordSteamCoverKey(item.id)]??''):undefined,wordGentleHeat:item.wordDecision?.gentleHeat?wordGentleHeatView(item.wordDecision.gentleHeat,p.answers[wordGentleHeatKey(item.id)]??''):undefined,wordMixBowl:item.wordDecision?.mixBowl?wordMixBowlView(item.wordDecision.mixBowl,p.answers[wordMixBowlKey(item.id)]??''):undefined,wordTextureResult:item.wordDecision?.textureResult?wordTextureResultView(item.wordDecision.textureResult,p.answers[wordTextureResultKey(item.id)]??''):undefined,wordBananaOver:item.wordDecision?.bananaOver?wordBananaOverView(item.wordDecision.bananaOver,p.answers[wordBananaOverKey(item.id)]??''):undefined,wordLemonSlice:item.wordDecision?.lemonSlice?wordLemonSliceView(item.wordDecision.lemonSlice,p.answers[wordLemonSliceKey(item.id)]??''):undefined,wordMainRole:item.wordDecision?.mainRole?wordMainRoleView(item.wordDecision.mainRole,p.answers[wordMainRoleKey(item.id)]??''):undefined,wordTableDust:item.wordDecision?.tableDust?wordTableDustView(item.wordDecision.tableDust,p.answers[wordTableDustKey(item.id)]??''):undefined,wordKitchenCondition:item.wordDecision?.kitchenCondition?wordKitchenConditionView(item.wordDecision.kitchenCondition,p.answers[wordKitchenConditionKey(item.id)]??''):undefined,wordKitchenPlace:item.wordDecision?.kitchenPlace?wordKitchenPlaceView(item.wordDecision.kitchenPlace,p.answers[wordKitchenPlaceKey(item.id)]??''):undefined,wordTapWhile:item.wordDecision?.tapWhile?wordTapWhileView(item.wordDecision.tapWhile,p.answers[wordTapWhileKey(item.id)]??''):undefined,wordNeededFill:item.wordDecision?.neededFill?wordNeededFillView(item.wordDecision.neededFill,p.answers[wordNeededFillKey(item.id)]??''):undefined,wordVesselDetail:item.wordDecision?.vesselDetail?wordVesselDetailView(item.wordDecision.vesselDetail,p.answers[wordVesselDetailKey(item.id)]??''):undefined,wordUtensilFacing:item.wordDecision?.utensilFacing?wordUtensilFacingView(item.wordDecision.utensilFacing,p.answers[wordUtensilFacingKey(item.id)]??''):undefined,wordSpoonLength:item.wordDecision?.spoonLength?wordSpoonLengthView(item.wordDecision.spoonLength,p.answers[wordSpoonLengthKey(item.id)]??''):undefined,wordStickThrough:item.wordDecision?.stickThrough?wordStickThroughView(item.wordDecision.stickThrough,p.answers[wordStickThroughKey(item.id)]??''):undefined,wordEachNapkin:item.wordDecision?.eachNapkin?wordEachNapkinView(item.wordDecision.eachNapkin,p.answers[wordEachNapkinKey(item.id)]??''):undefined,wordJamJar:item.wordDecision?.jamJar?wordJamJarView(item.wordDecision.jamJar,p.answers[wordJamJarKey(item.id)]??''):undefined,wordClothesWindow:item.wordDecision?.clothesWindow?wordClothesWindowView(item.wordDecision.clothesWindow,p.answers[wordClothesWindowKey(item.id)]??''):undefined,wordButtonDetail:item.wordDecision?.buttonDetail?wordButtonDetailView(item.wordDecision.buttonDetail,p.answers[wordButtonDetailKey(item.id)]??''):undefined,wordPlainFabric:item.wordDecision?.plainFabric?wordPlainFabricView(item.wordDecision.plainFabric,p.answers[wordPlainFabricKey(item.id)]??''):undefined,wordHoodScope:item.wordDecision?.hoodScope?wordHoodScopeView(item.wordDecision.hoodScope,p.answers[wordHoodScopeKey(item.id)]??''):undefined,wordWoolWarm:item.wordDecision?.woolWarm?wordWoolWarmView(item.wordDecision.woolWarm,p.answers[wordWoolWarmKey(item.id)]??''):undefined,wordChairBack:item.wordDecision?.chairBack?wordChairBackView(item.wordDecision.chairBack,p.answers[wordChairBackKey(item.id)]??''):undefined,wordCyclingLength:item.wordDecision?.cyclingLength?wordCyclingLengthView(item.wordDecision.cyclingLength,p.answers[wordCyclingLengthKey(item.id)]??''):undefined,wordHiddenPocket:item.wordDecision?.hiddenPocket?wordHiddenPocketView(item.wordDecision.hiddenPocket,p.answers[wordHiddenPocketKey(item.id)]??''):undefined,wordCurtainDress:item.wordDecision?.curtainDress?wordCurtainDressView(item.wordDecision.curtainDress,p.answers[wordCurtainDressKey(item.id)]??''):undefined,wordStageSuit:item.wordDecision?.stageSuit?wordStageSuitView(item.wordDecision.stageSuit,p.answers[wordStageSuitKey(item.id)]??''):undefined,wordLeftShoeStone:item.wordDecision?.leftShoeStone?wordLeftShoeStoneView(item.wordDecision.leftShoeStone,p.answers[wordLeftShoeStoneKey(item.id)]??''):undefined,wordBootMud:item.wordDecision?.bootMud?wordBootMudView(item.wordDecision.bootMud,p.answers[wordBootMudKey(item.id)]??''):undefined,wordSlipperUnder:item.wordDecision?.slipperUnder?wordSlipperUnderView(item.wordDecision.slipperUnder,p.answers[wordSlipperUnderKey(item.id)]??''):undefined,wordCapInto:item.wordDecision?.capInto?wordCapIntoView(item.wordDecision.capInto,p.answers[wordCapIntoKey(item.id)]??''):undefined,wordScarfWrap:item.wordDecision?.scarfWrap?wordScarfWrapView(item.wordDecision.scarfWrap,p.answers[wordScarfWrapKey(item.id)]??''):undefined,wordGloveFound:item.wordDecision?.gloveFound?wordGloveFoundView(item.wordDecision.gloveFound,p.answers[wordGloveFoundKey(item.id)]??''):undefined,wordBeltSupport:item.wordDecision?.beltSupport?wordBeltSupportView(item.wordDecision.beltSupport,p.answers[wordBeltSupportKey(item.id)]??''):undefined,wordTicketPocket:item.wordDecision?.ticketPocket?wordTicketPocketView(item.wordDecision.ticketPocket,p.answers[wordTicketPocketKey(item.id)]??''):undefined,wordZipState:item.wordDecision?.zipState?wordZipStateView(item.wordDecision.zipState,p.answers[wordZipStateKey(item.id)]??''):undefined,wordHelmetAsk:item.wordDecision?.helmetAsk?wordHelmetAskView(item.wordDecision.helmetAsk,p.answers[wordHelmetAskKey(item.id)]??''):undefined,wordGloveFit:item.wordDecision?.gloveFit?wordGloveFitView(item.wordDecision.gloveFit,p.answers[wordGloveFitKey(item.id)]??''):undefined,wordButtonMatch:item.wordDecision?.buttonMatch?wordButtonMatchView(item.wordDecision.buttonMatch,p.answers[wordButtonMatchKey(item.id)]??''):undefined,wordCottonShirt:item.wordDecision?.cottonShirt?wordCottonShirtView(item.wordDecision.cottonShirt,p.answers[wordCottonShirtKey(item.id)]??''):undefined,wordLocalWool:item.wordDecision?.localWool?wordLocalWoolView(item.wordDecision.localWool,p.answers[wordLocalWoolKey(item.id)]??''):undefined,wordUmbrellaUntil:item.wordDecision?.umbrellaUntil?wordUmbrellaUntilView(item.wordDecision.umbrellaUntil,p.answers[wordUmbrellaUntilKey(item.id)]??''):undefined,wordProcessOrder:item.wordDecision?.processOrder?wordProcessOrderView(item.wordDecision.processOrder,p.answers[wordProcessOrderKey(item.id)]??''):undefined,wordQueueMove:item.wordDecision?.queueMove?wordQueueMoveView(item.wordDecision.queueMove,p.answers[wordQueueMoveKey(item.id)]??''):undefined,wordShelfRoom:item.wordDecision?.shelfRoom?wordShelfRoomView(item.wordDecision.shelfRoom,p.answers[wordShelfRoomKey(item.id)]??''):undefined,wordFileDesk:item.wordDecision?.fileDesk?wordFileDeskView(item.wordDecision.fileDesk,p.answers[wordFileDeskKey(item.id)]??''):undefined,wordTitleArrow:item.wordDecision?.titleArrow?wordTitleArrowView(item.wordDecision.titleArrow,p.answers[wordTitleArrowKey(item.id)]??''):undefined,wordOfflinePage:item.wordDecision?.offlinePage?wordOfflinePageView(item.wordDecision.offlinePage,p.answers[wordOfflinePageKey(item.id)]??''):undefined,wordNameGroups:item.wordDecision?.nameGroups?wordNameGroupsView(item.wordDecision.nameGroups,p.answers[wordNameGroupsKey(item.id)]??''):undefined,wordPhoneMode:item.wordDecision?.phoneMode?wordPhoneModeView(item.wordDecision.phoneMode,p.answers[wordPhoneModeKey(item.id)]??''):undefined,wordPrintPages:item.wordDecision?.printPages?wordPrintPagesView(item.wordDecision.printPages,p.answers[wordPrintPagesKey(item.id)]??''):undefined,wordSources:item.wordDecision?.sources?{context:item.wordDecision.sources.context,cards:item.wordDecision.sources.cards.map(card=>({...card,text:item.options?.find(o=>o.id===card.option)?.text??'',selected:card.option===selected,accepted:attempted&&card.option===selected&&!!item.options?.some(o=>o.id===selected&&o.correct),wrong:attempted&&card.option===selected&&!item.options?.some(o=>o.id===selected&&o.correct)}))}:undefined,wordReportedChange:item.wordDecision?.reportedChange?wordReportedChangeView(item.wordDecision.reportedChange,p.answers[wordReportedChangeKey(item.id)]??''):undefined,wordChance:item.wordDecision?.chance?wordChanceView(item.wordDecision.chance,p.answers[wordChanceKey(item.id)]??''):undefined,wordDailyWalk:item.wordDecision?.dailyWalk?wordDailyWalkView(item.wordDecision.dailyWalk,p.answers[wordDailyWalkKey(item.id)]??''):undefined,wordPictureOnly:item.wordDecision?.art?.pictureOnly===true,wordBoat:item.wordDecision?.boat?wordBoatView(item.wordDecision.boat,p.answers[wordBoatKey(item.id)]??''):undefined,wordShift:item.wordDecision?.shift?wordFeelingShiftView(item.wordDecision.shift,p.answers[wordFeelingShiftKey(item.id)]??''):undefined,wordProvision:item.wordDecision?.provision?wordProvisionView(item.wordDecision.provision,p.answers[wordProvisionKey(item.id)]??''):undefined,wordUntil:item.wordDecision?.until?wordUntilView(item.wordDecision.until,p.answers[wordUntilKey(item.id)]??''):undefined,wordThermal:item.wordDecision?.thermal?wordThermalView(item.wordDecision.thermal,p.answers[wordThermalKey(item.id)]??''):undefined,wordClimate:item.wordDecision?.climate?wordClimateView(item.wordDecision.climate,p.answers[wordClimateKey(item.id)]??''):undefined,wordDaylight:item.wordDecision?.daylight?wordDaylightView(item.wordDecision.daylight,p.answers[wordDaylightKey(item.id)]??''):undefined,wordWeather:item.wordDecision?.weather?wordWeatherView(item.wordDecision.weather,p.answers[wordWeatherKey(item.id)]??''):undefined,wordDoor:item.wordDecision?.door?wordDoorView(item.wordDecision.door,p.answers[wordDoorKey(item.id)]??''):undefined,wordFraction:item.wordDecision?.fraction?wordFractionView(item.wordDecision.fraction,p.answers[wordFractionKey(item.id)]??''):undefined,wordRotation:item.wordDecision?.rotation?wordRotationView(item.wordDecision.rotation,p.answers[wordRotationKey(item.id)]??''):undefined,wordRuler:item.wordDecision?.ruler?wordRulerView(item.wordDecision.ruler,p.answers[wordRulerKey(item.id)]??''):undefined,wordQuantity:item.wordDecision?.quantity?wordQuantityView(item.wordDecision.quantity,p.answers[wordQuantityKey(item.id)]??''):undefined,wordRecordSelection:item.wordDecision?.recordSelection?wordRecordSelectionView(item.wordDecision.recordSelection,p.answers[wordRecordSelectionKey(item.id)]??''):undefined,wordClock:item.wordDecision?.clock?wordClockView(item.wordDecision.clock,p.answers[wordClockKey(item.id)]??''):undefined,wordPictureTargets:(item.wordDecision?.art?.targets??[]).map(t=>({id:t.id,option:t.option,label:t.label,selected:t.option===selected,...(item.wordDecision?.art?.pictureOnly?{accepted:attempted&&t.option===selected&&!!item.options?.some(o=>o.id===selected&&o.correct),wrong:attempted&&t.option===selected&&!item.options?.some(o=>o.id===selected&&o.correct)}:{}),style:`left:${t.left}%;top:${t.top}%;width:${t.width}%;height:${t.height}%;align-items:${t.labelPosition==='top'?'flex-start':'flex-end'};`})),wordRecordPaths:selected&&item.options?.some(o=>o.id===selected)?item.wordDecision?.recordPaths??[]:[],wordTailOnly:/^[.!?,;:]+$/.test((item.after??'').trim()),wordEvidence:wordEvidence?{caption:wordEvidence.caption,regions:wordEvidence.regions.map(r=>({id:r.id,label:r.label,style:`left:${r.left}%;top:${r.top}%;width:${r.width}%;height:${r.height}%;`}))}:undefined,ownMissing:!!p.checked.workshopOwnMissing,reduction:reductionPreview,settings:settings?{pacing:pacingPreview,labels:settingsLabels,title:settings.title,note:settings.note,checked:settingsChecked,correct:settingsMatch(item,p),rows:settings.rows.map(r=>{const value=p.answers[settingKey(item.id,r.id)]??'',labels=r.route?.targets??settingsLabels;return{id:r.id,label:r.label,value,labels,route:r.route?{from:r.route.from,target:value==='on'?labels[0]:value==='off'?labels[1]:'先选择去向或下一步'}:undefined,status:value==='on'?labels[0]:value==='off'?labels[1]:'尚未设置',correct:settingsChecked&&value===r.answer,feedback:settingsChecked?(value===r.answer?r.reason:value?r.wrong:`这项还没设置。先选${labels[0]}或${labels[1]}，再核对。`):''}})}:undefined,recall:recall?{title:recall.title,note:recall.note,phase:recallPhase,ready:recall.words.every(w=>(p.answers[recallAnswerKey(item.id,w.id)]??'').trim().length>0),rows:recall.words.map(w=>({...w,answer:recallPhase==='recall'?'':w.answer,attempt:p.answers[recallAnswerKey(item.id,w.id)]??'',same:normalizedAnswer(p.answers[recallAnswerKey(item.id,w.id)]??'')===normalizedAnswer(w.answer)}))}:undefined,gap:item.sourceGap?{...(item.sourceGap.locationMap?{map:locationPreview(item.sourceGap.locationMap,gapChoice?.text??'')}:{}),before:item.sourceGap.before,after:item.sourceGap.after,text:gapChoice?.text??'____',selected:gapChoice?.id??'',checked:gapChecked,correct:sourceGapMatches(item,p),feedback:gapChecked?(gapChoice?.reason??'先把一个候选词放进空格，再核对。'):'',options:item.sourceGap.options.map(o=>({id:o.id,text:o.text,selected:o.id===gapChoice?.id}))}:undefined,orderSlots:(item.sourceOrderLabels??[]).map((label,slot)=>({label,id:orderAnswer[slot]?.id??'',text:orderAnswer[slot]?.text??'',wrong:orderAnswer[slot]?.wrong??false,filled:!!orderAnswer[slot]})),redaction:scope?.mode==='redact'&&scope.preview?{asset:scope.preview.asset,alt:scope.preview.alt,regions:scope.preview.regions.map(r=>({...r,label:condition!.world.cells.find(c=>c.id===r.id)!.label,detail:condition!.world.cells.find(c=>c.id===r.id)!.detail??'',masked:members.includes(r.id),wrong:attempted&&(members.includes(r.id)!==scope.ids.includes(r.id)),style:`left:${r.left}%;top:${r.top}%;width:${r.width}%;height:${r.height}%;`}))}:undefined,proofArtChoices:(item.sourceArt?.choices??[]).map(c=>({...c,selected:selected===c.id,accepted:!!p.checked[`${k}-proof-${c.id}`],wrong:attempted&&selected===c.id&&!p.checked[`${k}-proof-${c.id}`]})),proofReady:proofReady(item,p,k),orderBank,orderAnswer,selectionText,morphemeTiles:condition?.tileMode==='morpheme',verbBridge,albumOwnership,albumMode,albumItems,keepEnding:!!condition&&(!condition.tiles||condition.tileMode==='morpheme'||(condition.target.split(' ').length<=2&&selected.split(' ').length<=2))&&Math.max(condition.target.length,selected.length)<=18&&/^[.!?]$/.test(condition.after),tileBank:(condition?.tiles??[]).map((text,i)=>({id:String(i),text,used:tileIds.includes(String(i))})),tileAnswer:tileIds.map(id=>({id,text:condition!.tiles![Number(id)]})),referenceStyle:condition?.world.kind==='timeline'&&condition.world.cells.some(c=>c.id==='reference')?`left:${condition.world.cells.find(c=>c.id==='reference')!.value}%;`:'',membersCorrect,records,recordOptions,recordArtChoices:(records?.artChoices??[]).map((id,i)=>({...recordOptions.find(r=>r.id===id)!,style:`left:${i*50}%;width:50%;`})),recordCorrect,hasScene:!!w.conditions?.some(c=>c.world.scene||c.world.records||c.world.selection||c.world.verbBridge||c.tileMode==='morpheme'),navigationLabel:w.navigationLabel??'任务',scene,scenePeople,sceneSubjectsCorrect,expressionWrong:attempted&&!!selected&&!!condition&&!matches(condition,selected),proofSteps:(item.evidenceLabels??[]).map((label,index)=>({id:String(index),label,accepted:!!item.evidenceGroups?.[index]?.some(id=>p.checked[`${k}-proof-${id}`])})),proofRequired:item.evidenceGroups?.length??1,proofCollected:(item.options??[]).filter(o=>p.checked[`${k}-proof-${o.id}`]).map(o=>({id:o.id,text:o.text})),proofAccepted:!!p.checked[`${k}-proof-${selected}`],soundUnits,soundMode,pitch,doneCount:Array.from({length:total},(_,i)=>i).filter(completedAt).length,usageDirection:item.usage?.alternatives[normalizedAnswer(input)]??'',kind:w.kind,title:w.title,instruction:w.instruction,index,total,tabs:Array.from({length:total},(_,i)=>({id:String(i),label:w.conditions?.[i].label??w.items[i].label,done:completedAt(i)})),item,condition,cells,choices:options.map(o=>({...o,text:item.sound==='pitch'?(o.text==='↗'?'句末上升':'句末下降'):o.text,selected:o.id===selected,accepted:item.wordDecision?attempted&&o.id===selected&&!!item.options?.some(option=>option.id===selected&&option.correct):!!p.checked[`${k}-proof-${o.id}`]})),selected,input,own,attempted,correct,feedback,revealed:!!p.checked.workshopReveal,complete,allDone:Array.from({length:total},(_,i)=>i).every(completedAt),draftWords:wordCount(own),sourceOpen:!!p.checked.workshopSource,worldClass:condition?.world.kind??w.kind}
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
 if(action==='composeTouches'){
  if(w.kind!=='compose'||!v.item.composeTouches)return
  const field=composeTouchesKey(v.item.id),next=changeComposeTouches(v.item.composeTouches,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='composeConditions'){
  if(w.kind!=='compose'||!v.item.composeConditions)return
  const field=composeConditionsKey(v.item.id),next=changeComposeConditions(v.item.composeConditions,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='composeWatchPhoto'){
  if(w.kind!=='compose'||!v.item.composeWatch||!['clear','unclear'].includes(value))return
  p.answers[composeWatchPhotoKey(v.item.id)]=value;return
 }
 if(action==='composeWatch'){
  if(w.kind!=='compose'||!v.item.composeWatch)return
  const field=composeWatchKey(v.item.id),next=changeComposeWatch(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='composeCoverage'){
  if(w.kind!=='compose'||!v.item.composeCoverage)return
  const field=composeCoverageKey(v.item.id),next=changeComposeCoverage(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='composeOcclusion'){
  if(w.kind!=='compose'||!v.item.composeOcclusion)return
  const field=composeOcclusionKey(v.item.id),next=changeComposeOcclusion(p.answers[field]??'',value);if(next===undefined)return
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
 if(action==='overlap'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.overlap)return
  const field=wordOverlapKey(v.item.id),next=changeOverlap(value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='widthFit'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.widthFit)return
  const field=wordWidthFitKey(v.item.id),next=changeWidthFit(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='almostLevel'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.almostLevel)return
  const field=wordAlmostLevelKey(v.item.id),next=changeAlmostLevel(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='zeroGroup'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.zeroGroup)return
  const field=wordZeroGroupKey(v.item.id),next=changeZeroGroup(v.item.wordDecision.zeroGroup,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='pathRole'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.pathRole)return
  const field=wordPathRoleKey(v.item.id),next=changePathRole(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='spatialFrame'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.spatialFrame)return
  const field=wordSpatialFrameKey(v.item.id),next=changeSpatialFrame(v.item.wordDecision.spatialFrame,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='relationScene'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.relationScene)return
  const field=wordRelationSceneKey(v.item.id),next=changeRelationScene(v.item.wordDecision.relationScene,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='routeFrame'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.routeFrame)return
  const field=wordRouteFrameKey(v.item.id),next=changeRouteFrame(v.item.wordDecision.routeFrame,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='timeScope'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.timeScope)return
  const field=wordTimeScopeKey(v.item.id),next=changeTimeScope(v.item.wordDecision.timeScope,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='speedMeaning'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.speedMeaning)return
  const field=wordSpeedMeaningKey(v.item.id),next=changeSpeedMeaning(v.item.wordDecision.speedMeaning,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='colourAllocation'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.colourAllocation)return
  const field=wordColourAllocationKey(v.item.id),next=changeColourAllocation(v.item.wordDecision.colourAllocation,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='lidCoverage'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.lidCoverage)return
  const field=wordLidCoverageKey(v.item.id),next=changeLidCoverage(v.item.wordDecision.lidCoverage,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='plantNeeds'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.plantNeeds)return
  const field=wordPlantNeedsKey(v.item.id),next=changePlantNeeds(v.item.wordDecision.plantNeeds,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='reportFrame'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.reportFrame)return
  const field=wordReportFrameKey(v.item.id),next=changeReportFrame(v.item.wordDecision.reportFrame,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='senseFrame'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.senseFrame)return
  const field=wordSenseFrameKey(v.item.id),next=changeSenseFrame(v.item.wordDecision.senseFrame,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='methodDirection'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.methodDirection)return
  const field=wordMethodDirectionKey(v.item.id),next=changeMethodDirection(v.item.wordDecision.methodDirection,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='positionInstruction'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.positionInstruction)return
  const field=wordPositionInstructionKey(v.item.id),next=changePositionInstruction(v.item.wordDecision.positionInstruction,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='forceDirection'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.forceDirection)return
  const field=wordForceDirectionKey(v.item.id),next=changeForceDirection(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='everyoneArrived'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.everyoneArrived)return
  const field=wordEveryoneArrivedKey(v.item.id),next=changeEveryoneArrived(p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='actionGoal'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.actionGoal)return
  const field=wordActionGoalKey(v.item.id),next=changeActionGoal(v.item.wordDecision.actionGoal,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='entrySequence'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.entrySequence)return
  const field=wordEntrySequenceKey(v.item.id),next=changeEntrySequence(v.item.wordDecision.entrySequence,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='lineIntersection'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.lineIntersection)return
  const field=wordLineIntersectionKey(v.item.id),next=changeLineIntersection(v.item.wordDecision.lineIntersection,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='armPose'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.armPose)return
  const field=wordArmPoseKey(v.item.id),next=changeArmPose(v.item.wordDecision.armPose,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='clothPieces'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.clothPieces)return
  const field=wordClothPiecesKey(v.item.id),next=changeClothPieces(v.item.wordDecision.clothPieces,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='cornerFold'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.cornerFold)return
  const field=wordCornerFoldKey(v.item.id),next=changeCornerFold(v.item.wordDecision.cornerFold,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodSeparation'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodSeparation)return
  const field=wordFoodSeparationKey(v.item.id),next=changeFoodSeparation(v.item.wordDecision.foodSeparation,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='mealReadiness'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.mealReadiness)return
  const field=wordMealReadinessKey(v.item.id),next=changeMealReadiness(v.item.wordDecision.mealReadiness,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodPortions'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodPortions)return
  const field=wordFoodPortionsKey(v.item.id),next=changeFoodPortions(v.item.wordDecision.foodPortions,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='noodleFall'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.noodleFall)return
  const field=wordNoodleFallKey(v.item.id),next=changeNoodleFall(v.item.wordDecision.noodleFall,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodRoles'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodRoles)return
  const field=wordFoodRolesKey(v.item.id),next=changeFoodRoles(v.item.wordDecision.foodRoles,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='remainingTin'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.remainingTin)return
  const field=wordRemainingTinKey(v.item.id),next=changeRemainingTin(v.item.wordDecision.remainingTin,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='nearBefore'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.nearBefore)return
  const field=wordNearBeforeKey(v.item.id),next=changeNearBefore(v.item.wordDecision.nearBefore,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodExtent'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodExtent)return
  const field=wordFoodExtentKey(v.item.id),next=changeFoodExtent(v.item.wordDecision.foodExtent,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodNoun'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodNoun)return
  const field=wordFoodNounKey(v.item.id),next=changeFoodNoun(v.item.wordDecision.foodNoun,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodReturn'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodReturn)return
  const field=wordFoodReturnKey(v.item.id),next=changeFoodReturn(v.item.wordDecision.foodReturn,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodPairing'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodPairing)return
  const field=wordFoodPairingKey(v.item.id),next=changeFoodPairing(v.item.wordDecision.foodPairing,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodPurpose'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodPurpose)return
  const field=wordFoodPurposeKey(v.item.id),next=changeFoodPurpose(v.item.wordDecision.foodPurpose,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='recipeLess'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.recipeLess)return
  const field=wordRecipeLessKey(v.item.id),next=changeRecipeLess(v.item.wordDecision.recipeLess,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodLayer'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodLayer)return
  const field=wordFoodLayerKey(v.item.id),next=changeFoodLayer(v.item.wordDecision.foodLayer,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodChange'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodChange)return
  const field=wordFoodChangeKey(v.item.id),next=changeFoodChange(v.item.wordDecision.foodChange,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='fruitPrep'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.fruitPrep)return
  const field=wordFruitPrepKey(v.item.id),next=changeFruitPrep(v.item.wordDecision.fruitPrep,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='containerFit'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.containerFit)return
  const field=wordContainerFitKey(v.item.id),next=changeContainerFit(v.item.wordDecision.containerFit,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='fruitFall'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.fruitFall)return
  const field=wordFruitFallKey(v.item.id),next=changeFruitFall(v.item.wordDecision.fruitFall,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='fruitScene'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.fruitScene)return
  const field=wordFruitSceneKey(v.item.id),next=changeFruitScene(v.item.wordDecision.fruitScene,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='stoneSides'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.stoneSides)return
  const field=wordStoneSidesKey(v.item.id),next=changeStoneSides(v.item.wordDecision.stoneSides,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='softCentre'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.softCentre)return
  const field=wordSoftCentreKey(v.item.id),next=changeSoftCentre(v.item.wordDecision.softCentre,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='vegetablePrep'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.vegetablePrep)return
  const field=wordVegetablePrepKey(v.item.id),next=changeVegetablePrep(v.item.wordDecision.vegetablePrep,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='vegetableEffect'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.vegetableEffect)return
  const field=wordVegetableEffectKey(v.item.id),next=changeVegetableEffect(v.item.wordDecision.vegetableEffect,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='peaMotion'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.peaMotion)return
  const field=wordPeaMotionKey(v.item.id),next=changePeaMotion(v.item.wordDecision.peaMotion,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='foodCondition'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.foodCondition)return
  const field=wordFoodConditionKey(v.item.id),next=changeFoodCondition(v.item.wordDecision.foodCondition,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='flavourSense'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.flavourSense)return
  const field=wordFlavourSenseKey(v.item.id),next=changeFlavourSense(v.item.wordDecision.flavourSense,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='heavyForOne'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.heavyForOne)return
  const field=wordHeavyForOneKey(v.item.id),next=changeHeavyForOne(v.item.wordDecision.heavyForOne,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='tasteScope'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.tasteScope)return
  const field=wordTasteScopeKey(v.item.id),next=changeTasteScope(v.item.wordDecision.tasteScope,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='ripeNow'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.ripeNow)return
  const field=wordRipeNowKey(v.item.id),next=changeRipeNow(v.item.wordDecision.ripeNow,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='rawBoard'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.rawBoard)return
  const field=wordRawBoardKey(v.item.id),next=changeRawBoard(v.item.wordDecision.rawBoard,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='appleRemoval'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.appleRemoval)return
  const field=wordAppleRemovalKey(v.item.id),next=changeAppleRemoval(v.item.wordDecision.appleRemoval,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='cookingEndpoint'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.cookingEndpoint)return
  const field=wordCookingEndpointKey(v.item.id),next=changeCookingEndpoint(v.item.wordDecision.cookingEndpoint,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='steamCover'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.steamCover)return
  const field=wordSteamCoverKey(v.item.id),next=changeSteamCover(v.item.wordDecision.steamCover,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='gentleHeat'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.gentleHeat)return
  const field=wordGentleHeatKey(v.item.id),next=changeGentleHeat(v.item.wordDecision.gentleHeat,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='mixBowl'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.mixBowl)return
  const field=wordMixBowlKey(v.item.id),next=changeMixBowl(v.item.wordDecision.mixBowl,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='textureResult'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.textureResult)return
  const field=wordTextureResultKey(v.item.id),next=changeTextureResult(v.item.wordDecision.textureResult,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='bananaOver'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.bananaOver)return
  const field=wordBananaOverKey(v.item.id),next=changeBananaOver(v.item.wordDecision.bananaOver,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='lemonSlice'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.lemonSlice)return
  const field=wordLemonSliceKey(v.item.id),next=changeLemonSlice(v.item.wordDecision.lemonSlice,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='mainRole'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.mainRole)return
  const field=wordMainRoleKey(v.item.id),next=changeMainRole(v.item.wordDecision.mainRole,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='tableDust'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.tableDust)return
  const field=wordTableDustKey(v.item.id),next=changeTableDust(v.item.wordDecision.tableDust,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='kitchenCondition'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.kitchenCondition)return
  const field=wordKitchenConditionKey(v.item.id),next=changeKitchenCondition(v.item.wordDecision.kitchenCondition,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='kitchenPlace'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.kitchenPlace)return
  const field=wordKitchenPlaceKey(v.item.id),next=changeKitchenPlace(v.item.wordDecision.kitchenPlace,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='tapWhile'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.tapWhile)return
  const field=wordTapWhileKey(v.item.id),next=changeTapWhile(v.item.wordDecision.tapWhile,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='neededFill'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.neededFill)return
  const field=wordNeededFillKey(v.item.id),next=changeNeededFill(v.item.wordDecision.neededFill,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='vesselDetail'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.vesselDetail)return
  const field=wordVesselDetailKey(v.item.id),next=changeVesselDetail(v.item.wordDecision.vesselDetail,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='utensilFacing'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.utensilFacing)return
  const field=wordUtensilFacingKey(v.item.id),next=changeUtensilFacing(v.item.wordDecision.utensilFacing,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='spoonLength'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.spoonLength)return
  const field=wordSpoonLengthKey(v.item.id),next=changeSpoonLength(v.item.wordDecision.spoonLength,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='stickThrough'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.stickThrough)return
  const field=wordStickThroughKey(v.item.id),next=changeStickThrough(v.item.wordDecision.stickThrough,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='eachNapkin'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.eachNapkin)return
  const field=wordEachNapkinKey(v.item.id),next=changeEachNapkin(v.item.wordDecision.eachNapkin,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='jamJar'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.jamJar)return
  const field=wordJamJarKey(v.item.id),next=changeJamJar(v.item.wordDecision.jamJar,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='clothesWindow'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.clothesWindow)return
  const field=wordClothesWindowKey(v.item.id),next=changeClothesWindow(v.item.wordDecision.clothesWindow,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='buttonDetail'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.buttonDetail)return
  const field=wordButtonDetailKey(v.item.id),next=changeButtonDetail(v.item.wordDecision.buttonDetail,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='plainFabric'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.plainFabric)return
  const field=wordPlainFabricKey(v.item.id),next=changePlainFabric(v.item.wordDecision.plainFabric,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='hoodScope'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.hoodScope)return
  const field=wordHoodScopeKey(v.item.id),next=changeHoodScope(v.item.wordDecision.hoodScope,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='woolWarm'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.woolWarm)return
  const field=wordWoolWarmKey(v.item.id),next=changeWoolWarm(v.item.wordDecision.woolWarm,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='chairBack'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.chairBack)return
  const field=wordChairBackKey(v.item.id),next=changeChairBack(v.item.wordDecision.chairBack,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='cyclingLength'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.cyclingLength)return
  const field=wordCyclingLengthKey(v.item.id),next=changeCyclingLength(v.item.wordDecision.cyclingLength,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='hiddenPocket'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.hiddenPocket)return
  const field=wordHiddenPocketKey(v.item.id),next=changeHiddenPocket(v.item.wordDecision.hiddenPocket,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='curtainDress'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.curtainDress)return
  const field=wordCurtainDressKey(v.item.id),next=changeCurtainDress(v.item.wordDecision.curtainDress,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='stageSuit'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.stageSuit)return
  const field=wordStageSuitKey(v.item.id),next=changeStageSuit(v.item.wordDecision.stageSuit,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='leftShoeStone'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.leftShoeStone)return
  const field=wordLeftShoeStoneKey(v.item.id),next=changeLeftShoeStone(v.item.wordDecision.leftShoeStone,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='bootMud'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.bootMud)return
  const field=wordBootMudKey(v.item.id),next=changeBootMud(v.item.wordDecision.bootMud,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='slipperUnder'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.slipperUnder)return
  const field=wordSlipperUnderKey(v.item.id),next=changeSlipperUnder(v.item.wordDecision.slipperUnder,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='capInto'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.capInto)return
  const field=wordCapIntoKey(v.item.id),next=changeCapInto(v.item.wordDecision.capInto,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='scarfWrap'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.scarfWrap)return
  const field=wordScarfWrapKey(v.item.id),next=changeScarfWrap(v.item.wordDecision.scarfWrap,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='gloveFound'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.gloveFound)return
  const field=wordGloveFoundKey(v.item.id),next=changeGloveFound(v.item.wordDecision.gloveFound,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='beltSupport'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.beltSupport)return
  const field=wordBeltSupportKey(v.item.id),next=changeBeltSupport(v.item.wordDecision.beltSupport,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='ticketPocket'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.ticketPocket)return
  const field=wordTicketPocketKey(v.item.id),next=changeTicketPocket(v.item.wordDecision.ticketPocket,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='zipState'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.zipState)return
  const field=wordZipStateKey(v.item.id),next=changeZipState(v.item.wordDecision.zipState,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='helmetAsk'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.helmetAsk)return
  const field=wordHelmetAskKey(v.item.id),next=changeHelmetAsk(v.item.wordDecision.helmetAsk,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='gloveFit'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.gloveFit)return
  const field=wordGloveFitKey(v.item.id),next=changeGloveFit(v.item.wordDecision.gloveFit,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='buttonMatch'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.buttonMatch)return
  const field=wordButtonMatchKey(v.item.id),next=changeButtonMatch(v.item.wordDecision.buttonMatch,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='cottonShirt'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.cottonShirt)return
  const field=wordCottonShirtKey(v.item.id),next=changeCottonShirt(v.item.wordDecision.cottonShirt,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='localWool'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.localWool)return
  const field=wordLocalWoolKey(v.item.id),next=changeLocalWool(v.item.wordDecision.localWool,p.answers[field]??'',value);if(next===undefined)return
  p.answers[field]=next;delete p.checked[k];unmark();p.checked.workshopOwnMissing=false;return
 }
 if(action==='umbrellaUntil'){
  if(w.kind!=='word-use'||!v.item.wordDecision?.umbrellaUntil)return
  const field=wordUmbrellaUntilKey(v.item.id),next=changeUmbrellaUntil(v.item.wordDecision.umbrellaUntil,p.answers[field]??'',value);if(next===undefined)return
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
  const correct=w.kind==='transform'?matches(v.condition!,v.selected)&&v.sceneSubjectsCorrect&&v.recordCorrect&&v.membersCorrect:w.kind==='word-use'?targetSpellingMatches(v.item,v.input)&&wordDecisionMatches(v.item,p,k):!!v.item.options?.find(o=>o.id===v.selected)?.correct
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
 return{...w,title:t(w.title),instruction:t(w.instruction),choices:w.choices?.map(t),conditions:w.conditions?.map(c=>({...c,initial:c.initial!==undefined?t(c.initial):undefined,tiles:c.tiles?.map(t),accepted:c.accepted?.map(t),choices:c.choices?.map(t),label:t(c.label),inputHint:c.inputHint?t(c.inputHint):undefined,before:t(c.before),target:t(c.target),after:t(c.after),reason:t(c.reason),world:{...c.world,verbBridge:c.world.verbBridge?{...c.world.verbBridge,verb:t(c.world.verbBridge.verb),object:t(c.world.verbBridge.object),objectLabel:t(c.world.verbBridge.objectLabel),options:c.world.verbBridge.options.map(o=>({expression:t(o.expression),link:t(o.link)}))}:undefined,albums:c.world.albums?{...c.world.albums,owners:[t(c.world.albums.owners[0]),t(c.world.albums.owners[1])]}:undefined,connector:c.world.connector?t(c.world.connector):undefined,caption:t(c.world.caption),...(c.world.selection?{selection:{...c.world.selection,prompt:t(c.world.selection.prompt),reason:t(c.world.selection.reason),preview:c.world.selection.preview?{...c.world.selection.preview,alt:t(c.world.selection.preview.alt),regions:c.world.selection.preview.regions.map(r=>({...r,text:t(r.text)}))}:undefined}}:{}),...(c.world.records?{records:{...c.world.records,title:t(c.world.records.title),overlay:c.world.records.overlay?{...c.world.records.overlay,text:t(c.world.records.overlay.text)}:undefined,missingPrompt:c.world.records.missingPrompt?t(c.world.records.missingPrompt):undefined,artLabels:c.world.records.artLabels?.map(t),options:c.world.records.options.map(r=>({...r,label:t(r.label),text:t(r.text),outcome:r.outcome?t(r.outcome):undefined,eventLabel:r.eventLabel?t(r.eventLabel):undefined,reason:t(r.reason)}))}}:{}),cells:c.world.cells.map(x=>({...x,label:t(x.label),...(x.detail?{detail:t(x.detail)}:{})}))}})),items:w.items.map(i=>({...i,...(i.composeOrder?{composeOrder:{...i.composeOrder,title:t(i.composeOrder.title),hint:t(i.composeOrder.hint),wrong:t(i.composeOrder.wrong),events:i.composeOrder.events.map(e=>({...e,label:t(e.label)})),sequence:[...i.composeOrder.sequence]}}:{}),...(i.composeArt?{composeArt:{...i.composeArt,alt:t(i.composeArt.alt),caption:t(i.composeArt.caption)}}:{}),...(i.composeTouches?{composeTouches:{...i.composeTouches,title:t(i.composeTouches.title),hint:t(i.composeTouches.hint),wrong:t(i.composeTouches.wrong),players:i.composeTouches.players.map(p=>({...p,label:t(p.label)}))}}:{}),...(i.composeConditions?{composeConditions:{...i.composeConditions,title:t(i.composeConditions.title),hint:t(i.composeConditions.hint),wrong:t(i.composeConditions.wrong),rows:i.composeConditions.rows.map(row=>({...row,label:t(row.label),left:t(row.left),same:t(row.same),changed:t(row.changed)}))}}:{}),...(i.composeWatch?{composeWatch:{...i.composeWatch,title:t(i.composeWatch.title),hint:t(i.composeWatch.hint),wrong:t(i.composeWatch.wrong),pathLabel:t(i.composeWatch.pathLabel),nestLabel:t(i.composeWatch.nestLabel)}}:{}),...(i.composeCoverage?{composeCoverage:{...i.composeCoverage,title:t(i.composeCoverage.title),hint:t(i.composeCoverage.hint),wrong:t(i.composeCoverage.wrong),pathLabel:t(i.composeCoverage.pathLabel),otherPlacesLabel:t(i.composeCoverage.otherPlacesLabel),otherTimesLabel:t(i.composeCoverage.otherTimesLabel),afternoons:i.composeCoverage.afternoons.map(t)as[string,string,string]}}:{}),...(i.composeOcclusion?{composeOcclusion:{...i.composeOcclusion,title:t(i.composeOcclusion.title),hint:t(i.composeOcclusion.hint),wrong:t(i.composeOcclusion.wrong)}}:{}),...(i.composeBrief?{composeBrief:{...i.composeBrief,...(i.composeBrief.money?{money:{...i.composeBrief.money,title:t(i.composeBrief.money.title),note:t(i.composeBrief.money.note),amounts:{...i.composeBrief.money.amounts}}}:{}),...(i.composeBrief.paths?{paths:{selector:i.composeBrief.paths.selector,answers:Object.fromEntries(Object.entries(i.composeBrief.paths.answers).map(([k,a])=>[k,{...a}]))}}:{}),title:t(i.composeBrief.title),hint:t(i.composeBrief.hint),wrong:t(i.composeBrief.wrong),fields:i.composeBrief.fields.map(f=>({...f,label:t(f.label),choices:f.choices.map(c=>({...c,label:t(c.label)}))}))}}:{}),...(i.spellings?{spellings:i.spellings.slice()}:{}),...(i.ownForms?{ownForms:[...new Set([...(i.spellings?i.ownForms:[]),...i.ownForms.map(t)])]}:{}),...(i.wordDecision?{wordDecision:{...i.wordDecision,prompt:t(i.wordDecision.prompt),...(i.wordDecision.fraction?{fraction:{...i.wordDecision.fraction,title:t(i.wordDecision.fraction.title),wholeLabel:t(i.wordDecision.fraction.wholeLabel),hint:t(i.wordDecision.fraction.hint),wrong:t(i.wordDecision.fraction.wrong)}}:{}),...(i.wordDecision.climate?{climate:{...i.wordDecision.climate,title:t(i.wordDecision.climate.title),hint:t(i.wordDecision.climate.hint),wrong:t(i.wordDecision.climate.wrong)}}:{}),...(i.wordDecision.until?{until:{...i.wordDecision.until,title:t(i.wordDecision.until.title),feeling:t(i.wordDecision.until.feeling),hint:t(i.wordDecision.until.hint),wrong:t(i.wordDecision.until.wrong),events:i.wordDecision.until.events.map(e=>({...e,label:t(e.label)}))}}:{}),...(i.wordDecision.dailyWalk?{dailyWalk:{...i.wordDecision.dailyWalk,title:t(i.wordDecision.dailyWalk.title),hint:t(i.wordDecision.dailyWalk.hint),wrong:t(i.wordDecision.dailyWalk.wrong)}}:{}),...(i.wordDecision.sources?{sources:{context:t(i.wordDecision.sources.context),cards:i.wordDecision.sources.cards.map(c=>({...c,title:t(c.title),publisher:t(c.publisher),area:t(c.area),validFor:t(c.validFor)}))}}:{}),...(i.wordDecision.shadePanel?{shadePanel:{...i.wordDecision.shadePanel,title:t(i.wordDecision.shadePanel.title),hint:t(i.wordDecision.shadePanel.hint),wrong:t(i.wordDecision.shadePanel.wrong)}}:{}),...(i.wordDecision.rectangleRatio?{rectangleRatio:{...i.wordDecision.rectangleRatio,title:t(i.wordDecision.rectangleRatio.title),hint:t(i.wordDecision.rectangleRatio.hint),wrong:t(i.wordDecision.rectangleRatio.wrong)}}:{}),...(i.wordDecision.spotWings?{spotWings:{...i.wordDecision.spotWings,title:t(i.wordDecision.spotWings.title),hint:t(i.wordDecision.spotWings.hint),wrong:t(i.wordDecision.spotWings.wrong)}}:{}),...(i.wordDecision.wireOrder?{wireOrder:{...i.wordDecision.wireOrder,title:t(i.wordDecision.wireOrder.title),hint:t(i.wordDecision.wireOrder.hint),wrong:t(i.wordDecision.wireOrder.wrong)}}:{}),...(i.wordDecision.routeTraffic?{routeTraffic:{...i.wordDecision.routeTraffic,title:t(i.wordDecision.routeTraffic.title),hint:t(i.wordDecision.routeTraffic.hint),wrong:t(i.wordDecision.routeTraffic.wrong)}}:{}),...(i.wordDecision.stampPlacement?{stampPlacement:{...i.wordDecision.stampPlacement,title:t(i.wordDecision.stampPlacement.title),hint:t(i.wordDecision.stampPlacement.hint),wrong:t(i.wordDecision.stampPlacement.wrong)}}:{}),...(i.wordDecision.eachItem?{eachItem:{...i.wordDecision.eachItem,title:t(i.wordDecision.eachItem.title),hint:t(i.wordDecision.eachItem.hint),wrong:t(i.wordDecision.eachItem.wrong)}}:{}),...(i.wordDecision.busBudget?{busBudget:{...i.wordDecision.busBudget,title:t(i.wordDecision.busBudget.title),hint:t(i.wordDecision.busBudget.hint),wrong:t(i.wordDecision.busBudget.wrong)}}:{}),...(i.wordDecision.paperUse?{paperUse:{...i.wordDecision.paperUse,title:t(i.wordDecision.paperUse.title),hint:t(i.wordDecision.paperUse.hint),wrong:t(i.wordDecision.paperUse.wrong)}}:{}),...(i.wordDecision.pathSteps?{pathSteps:{...i.wordDecision.pathSteps,title:t(i.wordDecision.pathSteps.title),hint:t(i.wordDecision.pathSteps.hint),wrong:t(i.wordDecision.pathSteps.wrong)}}:{}),...(i.wordDecision.robotWave?{robotWave:{...i.wordDecision.robotWave,title:t(i.wordDecision.robotWave.title),hint:t(i.wordDecision.robotWave.hint),wrong:t(i.wordDecision.robotWave.wrong)}}:{}),...(i.wordDecision.depthLine?{depthLine:{...i.wordDecision.depthLine,title:t(i.wordDecision.depthLine.title),hint:t(i.wordDecision.depthLine.hint),wrong:t(i.wordDecision.depthLine.wrong)}}:{}),...(i.wordDecision.waterPair?{waterPair:{...i.wordDecision.waterPair,title:t(i.wordDecision.waterPair.title),hint:t(i.wordDecision.waterPair.hint),wrong:t(i.wordDecision.waterPair.wrong)}}:{}),...(i.wordDecision.observe?{observe:{...i.wordDecision.observe,title:t(i.wordDecision.observe.title),hint:t(i.wordDecision.observe.hint),wrong:t(i.wordDecision.observe.wrong)}}:{}),...(i.wordDecision.molecule?{molecule:{...i.wordDecision.molecule,title:t(i.wordDecision.molecule.title),hint:t(i.wordDecision.molecule.hint),wrong:t(i.wordDecision.molecule.wrong)}}:{}),...(i.wordDecision.cart?{cart:{...i.wordDecision.cart,title:t(i.wordDecision.cart.title),hint:t(i.wordDecision.cart.hint),wrong:t(i.wordDecision.cart.wrong)}}:{}),...(i.wordDecision.pattern?{pattern:{...i.wordDecision.pattern,title:t(i.wordDecision.pattern.title),hint:t(i.wordDecision.pattern.hint),wrong:t(i.wordDecision.pattern.wrong)}}:{}),...(i.wordDecision.preference?{preference:{...i.wordDecision.preference,title:t(i.wordDecision.preference.title),hint:t(i.wordDecision.preference.hint),wrong:t(i.wordDecision.preference.wrong)}}:{}),...(i.wordDecision.flash?{flash:{...i.wordDecision.flash,title:t(i.wordDecision.flash.title),hint:t(i.wordDecision.flash.hint),wrong:t(i.wordDecision.flash.wrong)}}:{}),...(i.wordDecision.routeWeather?{routeWeather:{...i.wordDecision.routeWeather,title:t(i.wordDecision.routeWeather.title),hint:t(i.wordDecision.routeWeather.hint),wrong:t(i.wordDecision.routeWeather.wrong)}}:{}),...(i.wordDecision.dottedRoute?{dottedRoute:{...i.wordDecision.dottedRoute,title:t(i.wordDecision.dottedRoute.title),hint:t(i.wordDecision.dottedRoute.hint),wrong:t(i.wordDecision.dottedRoute.wrong)}}:{}),...(i.wordDecision.contributions?{contributions:{...i.wordDecision.contributions,title:t(i.wordDecision.contributions.title),hint:t(i.wordDecision.contributions.hint),wrong:t(i.wordDecision.contributions.wrong)}}:{}),...(i.wordDecision.curtainExit?{curtainExit:{...i.wordDecision.curtainExit,title:t(i.wordDecision.curtainExit.title),hint:t(i.wordDecision.curtainExit.hint),wrong:t(i.wordDecision.curtainExit.wrong)}}:{}),...(i.wordDecision.riverImagine?{riverImagine:{...i.wordDecision.riverImagine,title:t(i.wordDecision.riverImagine.title),hint:t(i.wordDecision.riverImagine.hint),wrong:t(i.wordDecision.riverImagine.wrong)}}:{}),...(i.wordDecision.guessScale?{guessScale:{...i.wordDecision.guessScale,title:t(i.wordDecision.guessScale.title),hint:t(i.wordDecision.guessScale.hint),wrong:t(i.wordDecision.guessScale.wrong)}}:{}),...(i.wordDecision.tornMap?{tornMap:{...i.wordDecision.tornMap,title:t(i.wordDecision.tornMap.title),hint:t(i.wordDecision.tornMap.hint),wrong:t(i.wordDecision.tornMap.wrong)}}:{}),...(i.wordDecision.interestRoles?{interestRoles:{...i.wordDecision.interestRoles,title:t(i.wordDecision.interestRoles.title),hint:t(i.wordDecision.interestRoles.hint),wrong:t(i.wordDecision.interestRoles.wrong)}}:{}),...(i.wordDecision.boxFit?{boxFit:{...i.wordDecision.boxFit,title:t(i.wordDecision.boxFit.title),hint:t(i.wordDecision.boxFit.hint),wrong:t(i.wordDecision.boxFit.wrong)}}:{}),...(i.wordDecision.uArticle?{uArticle:{...i.wordDecision.uArticle,title:t(i.wordDecision.uArticle.title),hint:t(i.wordDecision.uArticle.hint),wrong:t(i.wordDecision.uArticle.wrong)}}:{}),...(i.wordDecision.jarChange?{jarChange:{...i.wordDecision.jarChange,title:t(i.wordDecision.jarChange.title),hint:t(i.wordDecision.jarChange.hint),wrong:t(i.wordDecision.jarChange.wrong)}}:{}),...(i.wordDecision.doughEqual?{doughEqual:{...i.wordDecision.doughEqual,title:t(i.wordDecision.doughEqual.title),hint:t(i.wordDecision.doughEqual.hint),wrong:t(i.wordDecision.doughEqual.wrong)}}:{}),...(i.wordDecision.leafSimilar?{leafSimilar:{...i.wordDecision.leafSimilar,title:t(i.wordDecision.leafSimilar.title),hint:t(i.wordDecision.leafSimilar.hint),wrong:t(i.wordDecision.leafSimilar.wrong)}}:{}),...(i.wordDecision.freeSunday?{freeSunday:{...i.wordDecision.freeSunday,title:t(i.wordDecision.freeSunday.title),hint:t(i.wordDecision.freeSunday.hint),wrong:t(i.wordDecision.freeSunday.wrong)}}:{}),...(i.wordDecision.gateFirm?{gateFirm:{...i.wordDecision.gateFirm,title:t(i.wordDecision.gateFirm.title),hint:t(i.wordDecision.gateFirm.hint),wrong:t(i.wordDecision.gateFirm.wrong)}}:{}),...(i.wordDecision.entranceFacing?{entranceFacing:{...i.wordDecision.entranceFacing,title:t(i.wordDecision.entranceFacing.title),hint:t(i.wordDecision.entranceFacing.hint),wrong:t(i.wordDecision.entranceFacing.wrong)}}:{}),...(i.wordDecision.postRedaction?{postRedaction:{...i.wordDecision.postRedaction,title:t(i.wordDecision.postRedaction.title),hint:t(i.wordDecision.postRedaction.hint),wrong:t(i.wordDecision.postRedaction.wrong)}}:{}),...(i.wordDecision.nearlyFinish?{nearlyFinish:{...i.wordDecision.nearlyFinish,title:t(i.wordDecision.nearlyFinish.title),hint:t(i.wordDecision.nearlyFinish.hint),wrong:t(i.wordDecision.nearlyFinish.wrong)}}:{}),...(i.wordDecision.exactAlignment?{exactAlignment:{...i.wordDecision.exactAlignment,title:t(i.wordDecision.exactAlignment.title),hint:t(i.wordDecision.exactAlignment.hint),wrong:t(i.wordDecision.exactAlignment.wrong)}}:{}),...(i.wordDecision.gateCondition?{gateCondition:{...i.wordDecision.gateCondition,title:t(i.wordDecision.gateCondition.title),hint:t(i.wordDecision.gateCondition.hint),wrong:t(i.wordDecision.gateCondition.wrong)}}:{}),...(i.wordDecision.regularRepeat?{regularRepeat:{...i.wordDecision.regularRepeat,title:t(i.wordDecision.regularRepeat.title),hint:t(i.wordDecision.regularRepeat.hint),wrong:t(i.wordDecision.regularRepeat.wrong)}}:{}),...(i.wordDecision.drySeats?{drySeats:{...i.wordDecision.drySeats,title:t(i.wordDecision.drySeats.title),hint:t(i.wordDecision.drySeats.hint),wrong:t(i.wordDecision.drySeats.wrong)}}:{}),...(i.wordDecision.actionCount?{actionCount:{...i.wordDecision.actionCount,title:t(i.wordDecision.actionCount.title),hint:t(i.wordDecision.actionCount.hint),wrong:t(i.wordDecision.actionCount.wrong),actionLabel:t(i.wordDecision.actionCount.actionLabel),boundaryLabel:t(i.wordDecision.actionCount.boundaryLabel)}}:{}),...(i.wordDecision.carbonDioxide?{carbonDioxide:{...i.wordDecision.carbonDioxide,title:t(i.wordDecision.carbonDioxide.title),hint:t(i.wordDecision.carbonDioxide.hint),wrong:t(i.wordDecision.carbonDioxide.wrong)}}:{}),...(i.wordDecision.materialSort?{materialSort:{...i.wordDecision.materialSort,title:t(i.wordDecision.materialSort.title),hint:t(i.wordDecision.materialSort.hint),wrong:t(i.wordDecision.materialSort.wrong)}}:{}),...(i.wordDecision.supportLinks?{supportLinks:{...i.wordDecision.supportLinks,title:t(i.wordDecision.supportLinks.title),hint:t(i.wordDecision.supportLinks.hint),wrong:t(i.wordDecision.supportLinks.wrong)}}:{}),...(i.wordDecision.inlandRoute?{inlandRoute:{...i.wordDecision.inlandRoute,title:t(i.wordDecision.inlandRoute.title),hint:t(i.wordDecision.inlandRoute.hint),wrong:t(i.wordDecision.inlandRoute.wrong)}}:{}),...(i.wordDecision.sustainableAnd?{sustainableAnd:{...i.wordDecision.sustainableAnd,title:t(i.wordDecision.sustainableAnd.title),hint:t(i.wordDecision.sustainableAnd.hint),wrong:t(i.wordDecision.sustainableAnd.wrong)}}:{}),...(i.wordDecision.overlap?{overlap:{...i.wordDecision.overlap,title:t(i.wordDecision.overlap.title),first:t(i.wordDecision.overlap.first),second:t(i.wordDecision.overlap.second),hint:t(i.wordDecision.overlap.hint),wrong:t(i.wordDecision.overlap.wrong)}}:{}),...(i.wordDecision.widthFit?{widthFit:{...i.wordDecision.widthFit,title:t(i.wordDecision.widthFit.title),hint:t(i.wordDecision.widthFit.hint),wrong:t(i.wordDecision.widthFit.wrong)}}:{}),...(i.wordDecision.almostLevel?{almostLevel:{...i.wordDecision.almostLevel,title:t(i.wordDecision.almostLevel.title),hint:t(i.wordDecision.almostLevel.hint),wrong:t(i.wordDecision.almostLevel.wrong)}}:{}),...(i.wordDecision.zeroGroup?{zeroGroup:{...i.wordDecision.zeroGroup,title:t(i.wordDecision.zeroGroup.title),hint:t(i.wordDecision.zeroGroup.hint),wrong:t(i.wordDecision.zeroGroup.wrong)}}:{}),...(i.wordDecision.pathRole?{pathRole:{...i.wordDecision.pathRole,title:t(i.wordDecision.pathRole.title),hint:t(i.wordDecision.pathRole.hint),wrong:t(i.wordDecision.pathRole.wrong)}}:{}),...(i.wordDecision.spatialFrame?{spatialFrame:{...i.wordDecision.spatialFrame,title:t(i.wordDecision.spatialFrame.title),hint:t(i.wordDecision.spatialFrame.hint),wrong:t(i.wordDecision.spatialFrame.wrong)}}:{}),...(i.wordDecision.relationScene?{relationScene:{...i.wordDecision.relationScene,title:t(i.wordDecision.relationScene.title),hint:t(i.wordDecision.relationScene.hint),wrong:t(i.wordDecision.relationScene.wrong)}}:{}),...(i.wordDecision.routeFrame?{routeFrame:{...i.wordDecision.routeFrame,title:t(i.wordDecision.routeFrame.title),hint:t(i.wordDecision.routeFrame.hint),wrong:t(i.wordDecision.routeFrame.wrong)}}:{}),...(i.wordDecision.timeScope?{timeScope:{...i.wordDecision.timeScope,title:t(i.wordDecision.timeScope.title),hint:t(i.wordDecision.timeScope.hint),wrong:t(i.wordDecision.timeScope.wrong)}}:{}),...(i.wordDecision.speedMeaning?{speedMeaning:{...i.wordDecision.speedMeaning,title:t(i.wordDecision.speedMeaning.title),hint:t(i.wordDecision.speedMeaning.hint),wrong:t(i.wordDecision.speedMeaning.wrong)}}:{}),...(i.wordDecision.colourAllocation?{colourAllocation:{...i.wordDecision.colourAllocation,title:t(i.wordDecision.colourAllocation.title),hint:t(i.wordDecision.colourAllocation.hint),wrong:t(i.wordDecision.colourAllocation.wrong)}}:{}),...(i.wordDecision.lidCoverage?{lidCoverage:{...i.wordDecision.lidCoverage,title:t(i.wordDecision.lidCoverage.title),hint:t(i.wordDecision.lidCoverage.hint),wrong:t(i.wordDecision.lidCoverage.wrong)}}:{}),...(i.wordDecision.plantNeeds?{plantNeeds:{...i.wordDecision.plantNeeds,title:t(i.wordDecision.plantNeeds.title),hint:t(i.wordDecision.plantNeeds.hint),wrong:t(i.wordDecision.plantNeeds.wrong)}}:{}),...(i.wordDecision.reportFrame?{reportFrame:{...i.wordDecision.reportFrame,title:t(i.wordDecision.reportFrame.title),hint:t(i.wordDecision.reportFrame.hint),wrong:t(i.wordDecision.reportFrame.wrong)}}:{}),...(i.wordDecision.senseFrame?{senseFrame:{...i.wordDecision.senseFrame,title:t(i.wordDecision.senseFrame.title),hint:t(i.wordDecision.senseFrame.hint),wrong:t(i.wordDecision.senseFrame.wrong)}}:{}),...(i.wordDecision.methodDirection?{methodDirection:{...i.wordDecision.methodDirection,title:t(i.wordDecision.methodDirection.title),hint:t(i.wordDecision.methodDirection.hint),wrong:t(i.wordDecision.methodDirection.wrong)}}:{}),...(i.wordDecision.positionInstruction?{positionInstruction:{...i.wordDecision.positionInstruction,title:t(i.wordDecision.positionInstruction.title),hint:t(i.wordDecision.positionInstruction.hint),wrong:t(i.wordDecision.positionInstruction.wrong)}}:{}),...(i.wordDecision.forceDirection?{forceDirection:{...i.wordDecision.forceDirection,title:t(i.wordDecision.forceDirection.title),hint:t(i.wordDecision.forceDirection.hint),wrong:t(i.wordDecision.forceDirection.wrong)}}:{}),...(i.wordDecision.everyoneArrived?{everyoneArrived:{...i.wordDecision.everyoneArrived,title:t(i.wordDecision.everyoneArrived.title),hint:t(i.wordDecision.everyoneArrived.hint),wrong:t(i.wordDecision.everyoneArrived.wrong)}}:{}),...(i.wordDecision.actionGoal?{actionGoal:{...i.wordDecision.actionGoal,title:t(i.wordDecision.actionGoal.title),hint:t(i.wordDecision.actionGoal.hint),wrong:t(i.wordDecision.actionGoal.wrong)}}:{}),...(i.wordDecision.entrySequence?{entrySequence:{...i.wordDecision.entrySequence,title:t(i.wordDecision.entrySequence.title),hint:t(i.wordDecision.entrySequence.hint),wrong:t(i.wordDecision.entrySequence.wrong)}}:{}),...(i.wordDecision.lineIntersection?{lineIntersection:{...i.wordDecision.lineIntersection,title:t(i.wordDecision.lineIntersection.title),hint:t(i.wordDecision.lineIntersection.hint),wrong:t(i.wordDecision.lineIntersection.wrong)}}:{}),...(i.wordDecision.armPose?{armPose:{...i.wordDecision.armPose,title:t(i.wordDecision.armPose.title),hint:t(i.wordDecision.armPose.hint),wrong:t(i.wordDecision.armPose.wrong)}}:{}),...(i.wordDecision.clothPieces?{clothPieces:{...i.wordDecision.clothPieces,title:t(i.wordDecision.clothPieces.title),hint:t(i.wordDecision.clothPieces.hint),wrong:t(i.wordDecision.clothPieces.wrong)}}:{}),...(i.wordDecision.cornerFold?{cornerFold:{...i.wordDecision.cornerFold,title:t(i.wordDecision.cornerFold.title),hint:t(i.wordDecision.cornerFold.hint),wrong:t(i.wordDecision.cornerFold.wrong)}}:{}),...(i.wordDecision.foodSeparation?{foodSeparation:{...i.wordDecision.foodSeparation,title:t(i.wordDecision.foodSeparation.title),hint:t(i.wordDecision.foodSeparation.hint),wrong:t(i.wordDecision.foodSeparation.wrong)}}:{}),...(i.wordDecision.mealReadiness?{mealReadiness:{...i.wordDecision.mealReadiness,title:t(i.wordDecision.mealReadiness.title),hint:t(i.wordDecision.mealReadiness.hint),wrong:t(i.wordDecision.mealReadiness.wrong)}}:{}),...(i.wordDecision.foodPortions?{foodPortions:{...i.wordDecision.foodPortions,title:t(i.wordDecision.foodPortions.title),hint:t(i.wordDecision.foodPortions.hint),wrong:t(i.wordDecision.foodPortions.wrong)}}:{}),...(i.wordDecision.noodleFall?{noodleFall:{...i.wordDecision.noodleFall,title:t(i.wordDecision.noodleFall.title),hint:t(i.wordDecision.noodleFall.hint),wrong:t(i.wordDecision.noodleFall.wrong)}}:{}),...(i.wordDecision.foodRoles?{foodRoles:{...i.wordDecision.foodRoles,title:t(i.wordDecision.foodRoles.title),hint:t(i.wordDecision.foodRoles.hint),wrong:t(i.wordDecision.foodRoles.wrong)}}:{}),...(i.wordDecision.remainingTin?{remainingTin:{...i.wordDecision.remainingTin,title:t(i.wordDecision.remainingTin.title),hint:t(i.wordDecision.remainingTin.hint),wrong:t(i.wordDecision.remainingTin.wrong)}}:{}),...(i.wordDecision.nearBefore?{nearBefore:{...i.wordDecision.nearBefore,title:t(i.wordDecision.nearBefore.title),hint:t(i.wordDecision.nearBefore.hint),wrong:t(i.wordDecision.nearBefore.wrong)}}:{}),...(i.wordDecision.foodExtent?{foodExtent:{...i.wordDecision.foodExtent,title:t(i.wordDecision.foodExtent.title),hint:t(i.wordDecision.foodExtent.hint),wrong:t(i.wordDecision.foodExtent.wrong)}}:{}),...(i.wordDecision.foodNoun?{foodNoun:{...i.wordDecision.foodNoun,title:t(i.wordDecision.foodNoun.title),hint:t(i.wordDecision.foodNoun.hint),wrong:t(i.wordDecision.foodNoun.wrong)}}:{}),...(i.wordDecision.foodReturn?{foodReturn:{...i.wordDecision.foodReturn,title:t(i.wordDecision.foodReturn.title),hint:t(i.wordDecision.foodReturn.hint),wrong:t(i.wordDecision.foodReturn.wrong)}}:{}),...(i.wordDecision.foodPairing?{foodPairing:{...i.wordDecision.foodPairing,title:t(i.wordDecision.foodPairing.title),hint:t(i.wordDecision.foodPairing.hint),wrong:t(i.wordDecision.foodPairing.wrong)}}:{}),...(i.wordDecision.foodPurpose?{foodPurpose:{...i.wordDecision.foodPurpose,title:t(i.wordDecision.foodPurpose.title),hint:t(i.wordDecision.foodPurpose.hint),wrong:t(i.wordDecision.foodPurpose.wrong)}}:{}),...(i.wordDecision.recipeLess?{recipeLess:{...i.wordDecision.recipeLess,title:t(i.wordDecision.recipeLess.title),hint:t(i.wordDecision.recipeLess.hint),wrong:t(i.wordDecision.recipeLess.wrong)}}:{}),...(i.wordDecision.foodLayer?{foodLayer:{...i.wordDecision.foodLayer,title:t(i.wordDecision.foodLayer.title),hint:t(i.wordDecision.foodLayer.hint),wrong:t(i.wordDecision.foodLayer.wrong)}}:{}),...(i.wordDecision.foodChange?{foodChange:{...i.wordDecision.foodChange,title:t(i.wordDecision.foodChange.title),hint:t(i.wordDecision.foodChange.hint),wrong:t(i.wordDecision.foodChange.wrong)}}:{}),...(i.wordDecision.fruitPrep?{fruitPrep:{...i.wordDecision.fruitPrep,title:t(i.wordDecision.fruitPrep.title),hint:t(i.wordDecision.fruitPrep.hint),wrong:t(i.wordDecision.fruitPrep.wrong)}}:{}),...(i.wordDecision.containerFit?{containerFit:{...i.wordDecision.containerFit,title:t(i.wordDecision.containerFit.title),hint:t(i.wordDecision.containerFit.hint),wrong:t(i.wordDecision.containerFit.wrong)}}:{}),...(i.wordDecision.fruitFall?{fruitFall:{...i.wordDecision.fruitFall,title:t(i.wordDecision.fruitFall.title),hint:t(i.wordDecision.fruitFall.hint),wrong:t(i.wordDecision.fruitFall.wrong)}}:{}),...(i.wordDecision.fruitScene?{fruitScene:{...i.wordDecision.fruitScene,title:t(i.wordDecision.fruitScene.title),hint:t(i.wordDecision.fruitScene.hint),wrong:t(i.wordDecision.fruitScene.wrong)}}:{}),...(i.wordDecision.stoneSides?{stoneSides:{...i.wordDecision.stoneSides,title:t(i.wordDecision.stoneSides.title),hint:t(i.wordDecision.stoneSides.hint),wrong:t(i.wordDecision.stoneSides.wrong)}}:{}),...(i.wordDecision.softCentre?{softCentre:{...i.wordDecision.softCentre,title:t(i.wordDecision.softCentre.title),hint:t(i.wordDecision.softCentre.hint),wrong:t(i.wordDecision.softCentre.wrong)}}:{}),...(i.wordDecision.vegetablePrep?{vegetablePrep:{...i.wordDecision.vegetablePrep,title:t(i.wordDecision.vegetablePrep.title),hint:t(i.wordDecision.vegetablePrep.hint),wrong:t(i.wordDecision.vegetablePrep.wrong)}}:{}),...(i.wordDecision.vegetableEffect?{vegetableEffect:{...i.wordDecision.vegetableEffect,title:t(i.wordDecision.vegetableEffect.title),hint:t(i.wordDecision.vegetableEffect.hint),wrong:t(i.wordDecision.vegetableEffect.wrong)}}:{}),...(i.wordDecision.peaMotion?{peaMotion:{...i.wordDecision.peaMotion,title:t(i.wordDecision.peaMotion.title),hint:t(i.wordDecision.peaMotion.hint),wrong:t(i.wordDecision.peaMotion.wrong)}}:{}),...(i.wordDecision.foodCondition?{foodCondition:{...i.wordDecision.foodCondition,title:t(i.wordDecision.foodCondition.title),hint:t(i.wordDecision.foodCondition.hint),wrong:t(i.wordDecision.foodCondition.wrong)}}:{}),...(i.wordDecision.flavourSense?{flavourSense:{...i.wordDecision.flavourSense,title:t(i.wordDecision.flavourSense.title),hint:t(i.wordDecision.flavourSense.hint),wrong:t(i.wordDecision.flavourSense.wrong)}}:{}),...(i.wordDecision.heavyForOne?{heavyForOne:{...i.wordDecision.heavyForOne,title:t(i.wordDecision.heavyForOne.title),hint:t(i.wordDecision.heavyForOne.hint),wrong:t(i.wordDecision.heavyForOne.wrong)}}:{}),...(i.wordDecision.tasteScope?{tasteScope:{...i.wordDecision.tasteScope,title:t(i.wordDecision.tasteScope.title),hint:t(i.wordDecision.tasteScope.hint),wrong:t(i.wordDecision.tasteScope.wrong)}}:{}),...(i.wordDecision.ripeNow?{ripeNow:{...i.wordDecision.ripeNow,title:t(i.wordDecision.ripeNow.title),hint:t(i.wordDecision.ripeNow.hint),wrong:t(i.wordDecision.ripeNow.wrong)}}:{}),...(i.wordDecision.rawBoard?{rawBoard:{...i.wordDecision.rawBoard,title:t(i.wordDecision.rawBoard.title),hint:t(i.wordDecision.rawBoard.hint),wrong:t(i.wordDecision.rawBoard.wrong)}}:{}),...(i.wordDecision.appleRemoval?{appleRemoval:{...i.wordDecision.appleRemoval,title:t(i.wordDecision.appleRemoval.title),hint:t(i.wordDecision.appleRemoval.hint),wrong:t(i.wordDecision.appleRemoval.wrong)}}:{}),...(i.wordDecision.cookingEndpoint?{cookingEndpoint:{...i.wordDecision.cookingEndpoint,title:t(i.wordDecision.cookingEndpoint.title),hint:t(i.wordDecision.cookingEndpoint.hint),wrong:t(i.wordDecision.cookingEndpoint.wrong)}}:{}),...(i.wordDecision.steamCover?{steamCover:{...i.wordDecision.steamCover,title:t(i.wordDecision.steamCover.title),hint:t(i.wordDecision.steamCover.hint),wrong:t(i.wordDecision.steamCover.wrong)}}:{}),...(i.wordDecision.gentleHeat?{gentleHeat:{...i.wordDecision.gentleHeat,title:t(i.wordDecision.gentleHeat.title),hint:t(i.wordDecision.gentleHeat.hint),wrong:t(i.wordDecision.gentleHeat.wrong)}}:{}),...(i.wordDecision.mixBowl?{mixBowl:{...i.wordDecision.mixBowl,title:t(i.wordDecision.mixBowl.title),hint:t(i.wordDecision.mixBowl.hint),wrong:t(i.wordDecision.mixBowl.wrong)}}:{}),...(i.wordDecision.textureResult?{textureResult:{...i.wordDecision.textureResult,title:t(i.wordDecision.textureResult.title),hint:t(i.wordDecision.textureResult.hint),wrong:t(i.wordDecision.textureResult.wrong)}}:{}),...(i.wordDecision.bananaOver?{bananaOver:{...i.wordDecision.bananaOver,title:t(i.wordDecision.bananaOver.title),hint:t(i.wordDecision.bananaOver.hint),wrong:t(i.wordDecision.bananaOver.wrong)}}:{}),...(i.wordDecision.lemonSlice?{lemonSlice:{...i.wordDecision.lemonSlice,title:t(i.wordDecision.lemonSlice.title),hint:t(i.wordDecision.lemonSlice.hint),wrong:t(i.wordDecision.lemonSlice.wrong)}}:{}),...(i.wordDecision.mainRole?{mainRole:{...i.wordDecision.mainRole,title:t(i.wordDecision.mainRole.title),hint:t(i.wordDecision.mainRole.hint),wrong:t(i.wordDecision.mainRole.wrong)}}:{}),...(i.wordDecision.tableDust?{tableDust:{...i.wordDecision.tableDust,title:t(i.wordDecision.tableDust.title),hint:t(i.wordDecision.tableDust.hint),wrong:t(i.wordDecision.tableDust.wrong)}}:{}),...(i.wordDecision.kitchenCondition?{kitchenCondition:{...i.wordDecision.kitchenCondition,title:t(i.wordDecision.kitchenCondition.title),hint:t(i.wordDecision.kitchenCondition.hint),wrong:t(i.wordDecision.kitchenCondition.wrong)}}:{}),...(i.wordDecision.kitchenPlace?{kitchenPlace:{...i.wordDecision.kitchenPlace,title:t(i.wordDecision.kitchenPlace.title),hint:t(i.wordDecision.kitchenPlace.hint),wrong:t(i.wordDecision.kitchenPlace.wrong)}}:{}),...(i.wordDecision.tapWhile?{tapWhile:{...i.wordDecision.tapWhile,title:t(i.wordDecision.tapWhile.title),hint:t(i.wordDecision.tapWhile.hint),wrong:t(i.wordDecision.tapWhile.wrong)}}:{}),...(i.wordDecision.neededFill?{neededFill:{...i.wordDecision.neededFill,title:t(i.wordDecision.neededFill.title),hint:t(i.wordDecision.neededFill.hint),wrong:t(i.wordDecision.neededFill.wrong)}}:{}),...(i.wordDecision.vesselDetail?{vesselDetail:{...i.wordDecision.vesselDetail,title:t(i.wordDecision.vesselDetail.title),hint:t(i.wordDecision.vesselDetail.hint),wrong:t(i.wordDecision.vesselDetail.wrong)}}:{}),...(i.wordDecision.utensilFacing?{utensilFacing:{...i.wordDecision.utensilFacing,title:t(i.wordDecision.utensilFacing.title),hint:t(i.wordDecision.utensilFacing.hint),wrong:t(i.wordDecision.utensilFacing.wrong)}}:{}),...(i.wordDecision.spoonLength?{spoonLength:{...i.wordDecision.spoonLength,title:t(i.wordDecision.spoonLength.title),hint:t(i.wordDecision.spoonLength.hint),wrong:t(i.wordDecision.spoonLength.wrong)}}:{}),...(i.wordDecision.stickThrough?{stickThrough:{...i.wordDecision.stickThrough,title:t(i.wordDecision.stickThrough.title),hint:t(i.wordDecision.stickThrough.hint),wrong:t(i.wordDecision.stickThrough.wrong)}}:{}),...(i.wordDecision.eachNapkin?{eachNapkin:{...i.wordDecision.eachNapkin,title:t(i.wordDecision.eachNapkin.title),hint:t(i.wordDecision.eachNapkin.hint),wrong:t(i.wordDecision.eachNapkin.wrong)}}:{}),...(i.wordDecision.jamJar?{jamJar:{...i.wordDecision.jamJar,title:t(i.wordDecision.jamJar.title),hint:t(i.wordDecision.jamJar.hint),wrong:t(i.wordDecision.jamJar.wrong)}}:{}),...(i.wordDecision.clothesWindow?{clothesWindow:{...i.wordDecision.clothesWindow,title:t(i.wordDecision.clothesWindow.title),hint:t(i.wordDecision.clothesWindow.hint),wrong:t(i.wordDecision.clothesWindow.wrong)}}:{}),...(i.wordDecision.buttonDetail?{buttonDetail:{...i.wordDecision.buttonDetail,title:t(i.wordDecision.buttonDetail.title),hint:t(i.wordDecision.buttonDetail.hint),wrong:t(i.wordDecision.buttonDetail.wrong)}}:{}),...(i.wordDecision.plainFabric?{plainFabric:{...i.wordDecision.plainFabric,title:t(i.wordDecision.plainFabric.title),hint:t(i.wordDecision.plainFabric.hint),wrong:t(i.wordDecision.plainFabric.wrong)}}:{}),...(i.wordDecision.hoodScope?{hoodScope:{...i.wordDecision.hoodScope,title:t(i.wordDecision.hoodScope.title),hint:t(i.wordDecision.hoodScope.hint),wrong:t(i.wordDecision.hoodScope.wrong)}}:{}),...(i.wordDecision.woolWarm?{woolWarm:{...i.wordDecision.woolWarm,title:t(i.wordDecision.woolWarm.title),hint:t(i.wordDecision.woolWarm.hint),wrong:t(i.wordDecision.woolWarm.wrong)}}:{}),...(i.wordDecision.chairBack?{chairBack:{...i.wordDecision.chairBack,title:t(i.wordDecision.chairBack.title),hint:t(i.wordDecision.chairBack.hint),wrong:t(i.wordDecision.chairBack.wrong)}}:{}),...(i.wordDecision.cyclingLength?{cyclingLength:{...i.wordDecision.cyclingLength,title:t(i.wordDecision.cyclingLength.title),hint:t(i.wordDecision.cyclingLength.hint),wrong:t(i.wordDecision.cyclingLength.wrong)}}:{}),...(i.wordDecision.hiddenPocket?{hiddenPocket:{...i.wordDecision.hiddenPocket,title:t(i.wordDecision.hiddenPocket.title),hint:t(i.wordDecision.hiddenPocket.hint),wrong:t(i.wordDecision.hiddenPocket.wrong)}}:{}),...(i.wordDecision.curtainDress?{curtainDress:{...i.wordDecision.curtainDress,title:t(i.wordDecision.curtainDress.title),hint:t(i.wordDecision.curtainDress.hint),wrong:t(i.wordDecision.curtainDress.wrong)}}:{}),...(i.wordDecision.stageSuit?{stageSuit:{...i.wordDecision.stageSuit,title:t(i.wordDecision.stageSuit.title),hint:t(i.wordDecision.stageSuit.hint),wrong:t(i.wordDecision.stageSuit.wrong)}}:{}),...(i.wordDecision.leftShoeStone?{leftShoeStone:{...i.wordDecision.leftShoeStone,title:t(i.wordDecision.leftShoeStone.title),hint:t(i.wordDecision.leftShoeStone.hint),wrong:t(i.wordDecision.leftShoeStone.wrong)}}:{}),...(i.wordDecision.bootMud?{bootMud:{...i.wordDecision.bootMud,title:t(i.wordDecision.bootMud.title),hint:t(i.wordDecision.bootMud.hint),wrong:t(i.wordDecision.bootMud.wrong)}}:{}),...(i.wordDecision.slipperUnder?{slipperUnder:{...i.wordDecision.slipperUnder,title:t(i.wordDecision.slipperUnder.title),hint:t(i.wordDecision.slipperUnder.hint),wrong:t(i.wordDecision.slipperUnder.wrong)}}:{}),...(i.wordDecision.capInto?{capInto:{...i.wordDecision.capInto,title:t(i.wordDecision.capInto.title),hint:t(i.wordDecision.capInto.hint),wrong:t(i.wordDecision.capInto.wrong)}}:{}),...(i.wordDecision.scarfWrap?{scarfWrap:{...i.wordDecision.scarfWrap,title:t(i.wordDecision.scarfWrap.title),hint:t(i.wordDecision.scarfWrap.hint),wrong:t(i.wordDecision.scarfWrap.wrong)}}:{}),...(i.wordDecision.gloveFound?{gloveFound:{...i.wordDecision.gloveFound,title:t(i.wordDecision.gloveFound.title),hint:t(i.wordDecision.gloveFound.hint),wrong:t(i.wordDecision.gloveFound.wrong)}}:{}),...(i.wordDecision.beltSupport?{beltSupport:{...i.wordDecision.beltSupport,title:t(i.wordDecision.beltSupport.title),hint:t(i.wordDecision.beltSupport.hint),wrong:t(i.wordDecision.beltSupport.wrong)}}:{}),...(i.wordDecision.ticketPocket?{ticketPocket:{...i.wordDecision.ticketPocket,title:t(i.wordDecision.ticketPocket.title),hint:t(i.wordDecision.ticketPocket.hint),wrong:t(i.wordDecision.ticketPocket.wrong)}}:{}),...(i.wordDecision.zipState?{zipState:{...i.wordDecision.zipState,title:t(i.wordDecision.zipState.title),hint:t(i.wordDecision.zipState.hint),wrong:t(i.wordDecision.zipState.wrong)}}:{}),...(i.wordDecision.helmetAsk?{helmetAsk:{...i.wordDecision.helmetAsk,title:t(i.wordDecision.helmetAsk.title),hint:t(i.wordDecision.helmetAsk.hint),wrong:t(i.wordDecision.helmetAsk.wrong)}}:{}),...(i.wordDecision.gloveFit?{gloveFit:{...i.wordDecision.gloveFit,title:t(i.wordDecision.gloveFit.title),hint:t(i.wordDecision.gloveFit.hint),wrong:t(i.wordDecision.gloveFit.wrong)}}:{}),...(i.wordDecision.buttonMatch?{buttonMatch:{...i.wordDecision.buttonMatch,title:t(i.wordDecision.buttonMatch.title),hint:t(i.wordDecision.buttonMatch.hint),wrong:t(i.wordDecision.buttonMatch.wrong)}}:{}),...(i.wordDecision.cottonShirt?{cottonShirt:{...i.wordDecision.cottonShirt,title:t(i.wordDecision.cottonShirt.title),hint:t(i.wordDecision.cottonShirt.hint),wrong:t(i.wordDecision.cottonShirt.wrong)}}:{}),...(i.wordDecision.localWool?{localWool:{...i.wordDecision.localWool,title:t(i.wordDecision.localWool.title),hint:t(i.wordDecision.localWool.hint),wrong:t(i.wordDecision.localWool.wrong)}}:{}),...(i.wordDecision.umbrellaUntil?{umbrellaUntil:{...i.wordDecision.umbrellaUntil,title:t(i.wordDecision.umbrellaUntil.title),hint:t(i.wordDecision.umbrellaUntil.hint),wrong:t(i.wordDecision.umbrellaUntil.wrong)}}:{}),...(i.wordDecision.processOrder?{processOrder:{...i.wordDecision.processOrder,title:t(i.wordDecision.processOrder.title),hint:t(i.wordDecision.processOrder.hint),wrong:t(i.wordDecision.processOrder.wrong),events:i.wordDecision.processOrder.events.map(e=>({...e,label:t(e.label)})),sequence:[...i.wordDecision.processOrder.sequence]}}:{}),...(i.wordDecision.queueMove?{queueMove:{...i.wordDecision.queueMove,title:t(i.wordDecision.queueMove.title),hint:t(i.wordDecision.queueMove.hint),wrong:t(i.wordDecision.queueMove.wrong)}}:{}),...(i.wordDecision.shelfRoom?{shelfRoom:{...i.wordDecision.shelfRoom,title:t(i.wordDecision.shelfRoom.title),hint:t(i.wordDecision.shelfRoom.hint),wrong:t(i.wordDecision.shelfRoom.wrong)}}:{}),...(i.wordDecision.fileDesk?{fileDesk:{...i.wordDecision.fileDesk,title:t(i.wordDecision.fileDesk.title),hint:t(i.wordDecision.fileDesk.hint),wrong:t(i.wordDecision.fileDesk.wrong)}}:{}),...(i.wordDecision.titleArrow?{titleArrow:{...i.wordDecision.titleArrow,title:t(i.wordDecision.titleArrow.title),hint:t(i.wordDecision.titleArrow.hint),wrong:t(i.wordDecision.titleArrow.wrong)}}:{}),...(i.wordDecision.offlinePage?{offlinePage:{...i.wordDecision.offlinePage,title:t(i.wordDecision.offlinePage.title),hint:t(i.wordDecision.offlinePage.hint),wrong:t(i.wordDecision.offlinePage.wrong)}}:{}),...(i.wordDecision.nameGroups?{nameGroups:{...i.wordDecision.nameGroups,title:t(i.wordDecision.nameGroups.title),names:i.wordDecision.nameGroups.names.map(n=>({...n,name:t(n.name)})),hint:t(i.wordDecision.nameGroups.hint),wrong:t(i.wordDecision.nameGroups.wrong)}}:{}),...(i.wordDecision.phoneMode?{phoneMode:{...i.wordDecision.phoneMode,title:t(i.wordDecision.phoneMode.title),hint:t(i.wordDecision.phoneMode.hint),wrong:t(i.wordDecision.phoneMode.wrong)}}:{}),...(i.wordDecision.printPages?{printPages:{...i.wordDecision.printPages,title:t(i.wordDecision.printPages.title),needed:[...i.wordDecision.printPages.needed],hint:t(i.wordDecision.printPages.hint),wrong:t(i.wordDecision.printPages.wrong)}}:{}),...(i.wordDecision.reportedChange?{reportedChange:{...i.wordDecision.reportedChange,title:t(i.wordDecision.reportedChange.title),label:t(i.wordDecision.reportedChange.label),event:t(i.wordDecision.reportedChange.event),hint:t(i.wordDecision.reportedChange.hint),wrong:t(i.wordDecision.reportedChange.wrong)}}:{}),...(i.wordDecision.chance?{chance:{...i.wordDecision.chance,title:t(i.wordDecision.chance.title),hint:t(i.wordDecision.chance.hint),wrong:t(i.wordDecision.chance.wrong)}}:{}),...(i.wordDecision.boat?{boat:{...i.wordDecision.boat,title:t(i.wordDecision.boat.title),hint:t(i.wordDecision.boat.hint),wrong:t(i.wordDecision.boat.wrong)}}:{}),...(i.wordDecision.shift?{shift:{...i.wordDecision.shift,title:t(i.wordDecision.shift.title),feeling:t(i.wordDecision.shift.feeling),event:t(i.wordDecision.shift.event),hint:t(i.wordDecision.shift.hint),wrong:t(i.wordDecision.shift.wrong)}}:{}),...(i.wordDecision.provision?{provision:{...i.wordDecision.provision,title:t(i.wordDecision.provision.title),hint:t(i.wordDecision.provision.hint),wrong:t(i.wordDecision.provision.wrong),goal:t(i.wordDecision.provision.goal)}}:{}),...(i.wordDecision.thermal?{thermal:{...i.wordDecision.thermal,title:t(i.wordDecision.thermal.title),hint:t(i.wordDecision.thermal.hint),wrong:t(i.wordDecision.thermal.wrong)}}:{}),...(i.wordDecision.daylight?{daylight:{...i.wordDecision.daylight,title:t(i.wordDecision.daylight.title),event:t(i.wordDecision.daylight.event),hint:t(i.wordDecision.daylight.hint),wrong:t(i.wordDecision.daylight.wrong)}}:{}),...(i.wordDecision.weather?{weather:{...i.wordDecision.weather,title:t(i.wordDecision.weather.title),hint:t(i.wordDecision.weather.hint),wrong:t(i.wordDecision.weather.wrong)}}:{}),...(i.wordDecision.door?{door:{...i.wordDecision.door,title:t(i.wordDecision.door.title),people:i.wordDecision.door.people.map(t),hint:t(i.wordDecision.door.hint),wrong:t(i.wordDecision.door.wrong)}}:{}),...(i.wordDecision.rotation?{rotation:{...i.wordDecision.rotation,title:t(i.wordDecision.rotation.title),hint:t(i.wordDecision.rotation.hint),wrong:t(i.wordDecision.rotation.wrong)}}:{}),...(i.wordDecision.ruler?{ruler:{...i.wordDecision.ruler,title:t(i.wordDecision.ruler.title),startLabel:t(i.wordDecision.ruler.startLabel),markerLabel:t(i.wordDecision.ruler.markerLabel),...(i.wordDecision.ruler.emptyLabel?{emptyLabel:t(i.wordDecision.ruler.emptyLabel)}:{}),hint:t(i.wordDecision.ruler.hint),wrong:t(i.wordDecision.ruler.wrong)}}:{}),...(i.wordDecision.quantity?{quantity:{...i.wordDecision.quantity,title:t(i.wordDecision.quantity.title),unit:t(i.wordDecision.quantity.unit),pluralUnit:t(i.wordDecision.quantity.pluralUnit),hint:t(i.wordDecision.quantity.hint),wrong:t(i.wordDecision.quantity.wrong)}}:{}),...(i.wordDecision.recordSelection?{recordSelection:{...i.wordDecision.recordSelection,...(i.wordDecision.recordSelection.quote?{quote:t(i.wordDecision.recordSelection.quote)}:{}),title:t(i.wordDecision.recordSelection.title),prompt:t(i.wordDecision.recordSelection.prompt),hint:t(i.wordDecision.recordSelection.hint),wrong:t(i.wordDecision.recordSelection.wrong),rows:i.wordDecision.recordSelection.rows.map(row=>({...row,label:t(row.label),text:t(row.text)}))}}:{}),...(i.wordDecision.clock?{clock:{...i.wordDecision.clock,title:t(i.wordDecision.clock.title),days:i.wordDecision.clock.days.map(t) as [string,string],hint:t(i.wordDecision.clock.hint),wrong:t(i.wordDecision.clock.wrong)}}:{}),...(i.wordDecision.recordPaths?{recordPaths:i.wordDecision.recordPaths.map(p=>({...p,label:t(p.label),steps:p.steps.map(t)}))}:{}),...(i.wordDecision.art?{art:{...i.wordDecision.art,alt:t(i.wordDecision.art.alt),...(i.wordDecision.art.targets?{targets:i.wordDecision.art.targets.map(target=>({...target,label:t(target.label)}))}:{}),...(i.wordDecision.art.evidence?{evidence:i.wordDecision.art.evidence.map(e=>({...e,caption:t(e.caption),regions:e.regions.map(r=>({...r,label:t(r.label)}))}))}:{})}}:{})}}:{}),...(i.sourceSettings?{sourceSettings:{...i.sourceSettings,...(i.sourceSettings.labels?{labels:i.sourceSettings.labels.map(t) as [string,string]}:{}),title:t(i.sourceSettings.title),note:t(i.sourceSettings.note),rows:i.sourceSettings.rows.map(r=>({...r,...(r.route?{route:{from:t(r.route.from),targets:r.route.targets.map(t) as [string,string]}}:{}),label:t(r.label),reason:t(r.reason),wrong:t(r.wrong)}))}}:{}),...(i.sourceRecall?{sourceRecall:{...i.sourceRecall,title:t(i.sourceRecall.title),note:t(i.sourceRecall.note),words:i.sourceRecall.words.map(w=>({...w,cue:t(w.cue),answer:t(w.answer)}))}}:{}),...(i.sourceGap?{sourceGap:{...i.sourceGap,...(i.sourceGap.locationMap?{locationMap:{anchor:t(i.sourceGap.locationMap.anchor),marker:t(i.sourceGap.locationMap.marker)}}:{}),before:t(i.sourceGap.before),after:t(i.sourceGap.after),options:i.sourceGap.options.map(o=>({...o,text:t(o.text),reason:t(o.reason)}))}}:{}),...(i.calculation?{calculation:{...i.calculation,label:t(i.calculation.label),hint:t(i.calculation.hint),wrong:t(i.calculation.wrong)}}:{}),...(i.sourceArt?{sourceArt:{...i.sourceArt,alt:t(i.sourceArt.alt),choices:i.sourceArt.choices.map(c=>({...c,label:t(c.label),...(c.caption?{caption:t(c.caption)}:{})}))}}:{}),...(i.sourceTitle?{sourceTitle:t(i.sourceTitle)}:{}),...(i.evidenceLabels?{evidenceLabels:i.evidenceLabels.map(t)}:{}),...(i.sourceOrderLabels?{sourceOrderLabels:i.sourceOrderLabels.map(t)}:{}),label:t(i.label),prompt:t(i.prompt),answer:t(i.answer),reason:t(i.reason),hint:w.kind==='word-use'&&!i.wordDecision?`需要 ${t(i.answer).length} 个字符；首字母是 ${t(i.answer)[0]}。`:t(i.hint),...(i.usage?{usage:{...i.usage,left:t(i.usage.left),right:t(i.usage.right),object:t(i.usage.object),caption:t(i.usage.caption),alternatives:Object.fromEntries(Object.entries(i.usage.alternatives).map(([key,value])=>[t(key),value]))}}:{}),...(i.before!==undefined?{before:t(i.before)}:{}),...(i.after!==undefined?{after:t(i.after)}:{}),...(i.material?{material:t(i.material)}:{}),...(i.meaning?{meaning:t(i.meaning)}:{}),options:i.options?.map(o=>({...o,text:t(o.text),reason:t(o.reason)}))}))}
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
  if(i.composeTouches!==undefined&&(w.kind!=='compose'||!validComposeTouches(i.composeTouches)))errors.push('Invalid compose touches')
  if(i.composeConditions!==undefined&&(w.kind!=='compose'||!validComposeConditions(i.composeConditions)))errors.push('Invalid compose conditions')
  if(i.composeWatch!==undefined&&(w.kind!=='compose'||!validComposeWatch(i.composeWatch)))errors.push('Invalid compose watch')
  if(i.composeCoverage!==undefined&&(w.kind!=='compose'||!validComposeCoverage(i.composeCoverage)))errors.push('Invalid compose coverage')
  if(i.composeOcclusion!==undefined&&(w.kind!=='compose'||!validComposeOcclusion(i.composeOcclusion)))errors.push('Invalid compose occlusion')
  if(i.composeOrder!==undefined&&(w.kind!=='compose'||!validWordProcessOrder(i.composeOrder)))errors.push('Invalid compose order')
  if(i.composeArt!==undefined&&(w.kind!=='compose'||(!i.composeBrief&&!i.composeOrder)||!validComposeArt(i.composeArt)))errors.push('Invalid compose art')
  if(i.spellings!==undefined&&(w.kind!=='word-use'||!Array.isArray(i.spellings)||i.spellings.length<2||i.spellings.length>8||i.spellings.some(form=>typeof form!=='string'||form.length>60||!/^[a-zA-Z]+(?:[-'][a-zA-Z]+)*$/.test(form))||new Set(i.spellings.map(form=>normalizedAnswer(form,!!i.caseSensitive))).size!==i.spellings.length||typeof i.answer!=='string'||!i.spellings.includes(i.answer)))errors.push('Invalid target spellings')
  if(i.ownForms!==undefined&&(w.kind!=='word-use'||!Array.isArray(i.ownForms)||i.ownForms.length<2||i.ownForms.length>8||i.ownForms.some(form=>typeof form!=='string'||form.length>60||!/^[a-z]+(?:[-'][a-z]+)*$/.test(form))||new Set(i.ownForms).size!==i.ownForms.length||typeof i.answer!=='string'||!i.ownForms.includes(normalizedAnswer(i.answer))))errors.push('Invalid own-use word forms')
  const decision=i.wordDecision
  if(decision!==undefined&&(w.kind!=='word-use'||!decision||typeof decision.prompt!=='string'||!decision.prompt.trim()||decision.prompt!==decision.prompt.trim()||decision.prompt.length>140||!Array.isArray(i.options)||i.options.length<2||i.options.length>4||i.options.filter(o=>o.correct===true).length!==1||new Set(i.options.map(o=>o.id)).size!==i.options.length||new Set(i.options.map(o=>o.text)).size!==i.options.length||i.options.some(o=>typeof o.id!=='string'||!(/^[a-z][a-z0-9-]*$/).test(o.id)||typeof o.correct!=='boolean'||[o.text,o.reason].some(t=>typeof t!=='string'||!t.trim()||t!==t.trim()))||(decision.art!==undefined&&(!decision.art||(decision.art.assetRoot!==undefined&&!['assets','illustrations','illustrations-2','illustrations-3','illustrations-4','illustrations-5','illustrations-6','illustrations-7','illustrations-8'].includes(decision.art.assetRoot))||(decision.art.format!==undefined&&!['jpg','png'].includes(decision.art.format))||typeof decision.art.asset!=='string'||!(/^[a-z0-9-]+$/).test(decision.art.asset)||typeof decision.art.alt!=='string'||!decision.art.alt.trim()))))errors.push('Invalid word decision')
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
  if(decision?.overlap!==undefined&&(w.kind!=='word-use'||!validWordOverlap(decision.overlap)||Object.entries(decision).some(([key,value])=>!['prompt','overlap','art'].includes(key)&&value!==undefined)))errors.push('Invalid overlap exercise')
  if(decision?.widthFit!==undefined&&(w.kind!=='word-use'||!validWordWidthFit(decision.widthFit)||Object.entries(decision).some(([key,value])=>!['prompt','widthFit'].includes(key)&&value!==undefined)))errors.push('Invalid widthFit exercise')
  if(decision?.almostLevel!==undefined&&(w.kind!=='word-use'||!validWordAlmostLevel(decision.almostLevel)||Object.entries(decision).some(([key,value])=>!['prompt','almostLevel'].includes(key)&&value!==undefined)))errors.push('Invalid almostLevel exercise')
  if(decision?.zeroGroup!==undefined&&(w.kind!=='word-use'||!validWordZeroGroup(decision.zeroGroup)||Object.entries(decision).some(([key,value])=>!['prompt','zeroGroup'].includes(key)&&value!==undefined)))errors.push('Invalid zeroGroup exercise')
  if(decision?.pathRole!==undefined&&(w.kind!=='word-use'||!validWordPathRole(decision.pathRole)||Object.entries(decision).some(([key,value])=>!['prompt','pathRole'].includes(key)&&value!==undefined)))errors.push('Invalid pathRole exercise')
  if(decision?.spatialFrame!==undefined&&(w.kind!=='word-use'||!validWordSpatialFrame(decision.spatialFrame)||Object.entries(decision).some(([key,value])=>!['prompt','spatialFrame'].includes(key)&&value!==undefined)))errors.push('Invalid spatialFrame exercise')
  if(decision?.relationScene!==undefined&&(w.kind!=='word-use'||!validWordRelationScene(decision.relationScene)||Object.entries(decision).some(([key,value])=>!['prompt','relationScene'].includes(key)&&value!==undefined)))errors.push('Invalid relationScene exercise')
  if(decision?.routeFrame!==undefined&&(w.kind!=='word-use'||!validWordRouteFrame(decision.routeFrame)||Object.entries(decision).some(([key,value])=>!['prompt','routeFrame'].includes(key)&&value!==undefined)))errors.push('Invalid routeFrame exercise')
  if(decision?.timeScope!==undefined&&(w.kind!=='word-use'||!validWordTimeScope(decision.timeScope)||Object.entries(decision).some(([key,value])=>!['prompt','timeScope'].includes(key)&&value!==undefined)))errors.push('Invalid timeScope exercise')
  if(decision?.speedMeaning!==undefined&&(w.kind!=='word-use'||!validWordSpeedMeaning(decision.speedMeaning)||Object.entries(decision).some(([key,value])=>!['prompt','speedMeaning'].includes(key)&&value!==undefined)))errors.push('Invalid speedMeaning exercise')
  if(decision?.colourAllocation!==undefined&&(w.kind!=='word-use'||!validWordColourAllocation(decision.colourAllocation)||Object.entries(decision).some(([key,value])=>!['prompt','colourAllocation'].includes(key)&&value!==undefined)))errors.push('Invalid colourAllocation exercise')
  if(decision?.lidCoverage!==undefined&&(w.kind!=='word-use'||!validWordLidCoverage(decision.lidCoverage)||Object.entries(decision).some(([key,value])=>!['prompt','lidCoverage'].includes(key)&&value!==undefined)))errors.push('Invalid lidCoverage exercise')
  if(decision?.plantNeeds!==undefined&&(w.kind!=='word-use'||!validWordPlantNeeds(decision.plantNeeds)||Object.entries(decision).some(([key,value])=>!['prompt','plantNeeds'].includes(key)&&value!==undefined)))errors.push('Invalid plantNeeds exercise')
  if(decision?.reportFrame!==undefined&&(w.kind!=='word-use'||!validWordReportFrame(decision.reportFrame)||Object.entries(decision).some(([key,value])=>!['prompt','reportFrame'].includes(key)&&value!==undefined)))errors.push('Invalid reportFrame exercise')
  if(decision?.senseFrame!==undefined&&(w.kind!=='word-use'||!validWordSenseFrame(decision.senseFrame)||Object.entries(decision).some(([key,value])=>!['prompt','senseFrame'].includes(key)&&value!==undefined)))errors.push('Invalid senseFrame exercise')
  if(decision?.methodDirection!==undefined&&(w.kind!=='word-use'||!validWordMethodDirection(decision.methodDirection)||Object.entries(decision).some(([key,value])=>!['prompt','methodDirection'].includes(key)&&value!==undefined)))errors.push('Invalid methodDirection exercise')
  if(decision?.positionInstruction!==undefined&&(w.kind!=='word-use'||!validWordPositionInstruction(decision.positionInstruction)||Object.entries(decision).some(([key,value])=>!['prompt','positionInstruction'].includes(key)&&value!==undefined)))errors.push('Invalid positionInstruction exercise')
  if(decision?.forceDirection!==undefined&&(w.kind!=='word-use'||!validWordForceDirection(decision.forceDirection)||Object.entries(decision).some(([key,value])=>!['prompt','forceDirection'].includes(key)&&value!==undefined)))errors.push('Invalid forceDirection exercise')
  if(decision?.everyoneArrived!==undefined&&(w.kind!=='word-use'||!validWordEveryoneArrived(decision.everyoneArrived)||Object.entries(decision).some(([key,value])=>!['prompt','everyoneArrived'].includes(key)&&value!==undefined)))errors.push('Invalid everyoneArrived exercise')
  if(decision?.actionGoal!==undefined&&(w.kind!=='word-use'||!validWordActionGoal(decision.actionGoal)||Object.entries(decision).some(([key,value])=>!['prompt','actionGoal'].includes(key)&&value!==undefined)))errors.push('Invalid actionGoal exercise')
  if(decision?.entrySequence!==undefined&&(w.kind!=='word-use'||!validWordEntrySequence(decision.entrySequence)||Object.entries(decision).some(([key,value])=>!['prompt','entrySequence'].includes(key)&&value!==undefined)))errors.push('Invalid entrySequence exercise')
  if(decision?.lineIntersection!==undefined&&(w.kind!=='word-use'||!validWordLineIntersection(decision.lineIntersection)||Object.entries(decision).some(([key,value])=>!['prompt','lineIntersection'].includes(key)&&value!==undefined)))errors.push('Invalid lineIntersection exercise')
  if(decision?.armPose!==undefined&&(w.kind!=='word-use'||!validWordArmPose(decision.armPose)||Object.entries(decision).some(([key,value])=>!['prompt','armPose'].includes(key)&&value!==undefined)))errors.push('Invalid armPose exercise')
  if(decision?.clothPieces!==undefined&&(w.kind!=='word-use'||!validWordClothPieces(decision.clothPieces)||Object.entries(decision).some(([key,value])=>!['prompt','clothPieces'].includes(key)&&value!==undefined)))errors.push('Invalid clothPieces exercise')
  if(decision?.cornerFold!==undefined&&(w.kind!=='word-use'||!validWordCornerFold(decision.cornerFold)||Object.entries(decision).some(([key,value])=>!['prompt','cornerFold'].includes(key)&&value!==undefined)))errors.push('Invalid cornerFold exercise')
  if(decision?.foodSeparation!==undefined&&(w.kind!=='word-use'||!validWordFoodSeparation(decision.foodSeparation)||Object.entries(decision).some(([key,value])=>!['prompt','foodSeparation'].includes(key)&&value!==undefined)))errors.push('Invalid foodSeparation exercise')
  if(decision?.mealReadiness!==undefined&&(w.kind!=='word-use'||!validWordMealReadiness(decision.mealReadiness)||Object.entries(decision).some(([key,value])=>!['prompt','mealReadiness'].includes(key)&&value!==undefined)))errors.push('Invalid mealReadiness exercise')
  if(decision?.foodPortions!==undefined&&(w.kind!=='word-use'||!validWordFoodPortions(decision.foodPortions)||Object.entries(decision).some(([key,value])=>!['prompt','foodPortions'].includes(key)&&value!==undefined)))errors.push('Invalid foodPortions exercise')
  if(decision?.noodleFall!==undefined&&(w.kind!=='word-use'||!validWordNoodleFall(decision.noodleFall)||Object.entries(decision).some(([key,value])=>!['prompt','noodleFall'].includes(key)&&value!==undefined)))errors.push('Invalid noodleFall exercise')
  if(decision?.foodRoles!==undefined&&(w.kind!=='word-use'||!validWordFoodRoles(decision.foodRoles)||Object.entries(decision).some(([key,value])=>!['prompt','foodRoles'].includes(key)&&value!==undefined)))errors.push('Invalid foodRoles exercise')
  if(decision?.remainingTin!==undefined&&(w.kind!=='word-use'||!validWordRemainingTin(decision.remainingTin)||Object.entries(decision).some(([key,value])=>!['prompt','remainingTin'].includes(key)&&value!==undefined)))errors.push('Invalid remainingTin exercise')
  if(decision?.nearBefore!==undefined&&(w.kind!=='word-use'||!validWordNearBefore(decision.nearBefore)||Object.entries(decision).some(([key,value])=>!['prompt','nearBefore'].includes(key)&&value!==undefined)))errors.push('Invalid nearBefore exercise')
  if(decision?.foodExtent!==undefined&&(w.kind!=='word-use'||!validWordFoodExtent(decision.foodExtent)||Object.entries(decision).some(([key,value])=>!['prompt','foodExtent'].includes(key)&&value!==undefined)))errors.push('Invalid foodExtent exercise')
  if(decision?.foodNoun!==undefined&&(w.kind!=='word-use'||!validWordFoodNoun(decision.foodNoun)||Object.entries(decision).some(([key,value])=>!['prompt','foodNoun'].includes(key)&&value!==undefined)))errors.push('Invalid foodNoun exercise')
  if(decision?.foodReturn!==undefined&&(w.kind!=='word-use'||!validWordFoodReturn(decision.foodReturn)||Object.entries(decision).some(([key,value])=>!['prompt','foodReturn'].includes(key)&&value!==undefined)))errors.push('Invalid foodReturn exercise')
  if(decision?.foodPairing!==undefined&&(w.kind!=='word-use'||!validWordFoodPairing(decision.foodPairing)||Object.entries(decision).some(([key,value])=>!['prompt','foodPairing'].includes(key)&&value!==undefined)))errors.push('Invalid foodPairing exercise')
  if(decision?.foodPurpose!==undefined&&(w.kind!=='word-use'||!validWordFoodPurpose(decision.foodPurpose)||Object.entries(decision).some(([key,value])=>!['prompt','foodPurpose'].includes(key)&&value!==undefined)))errors.push('Invalid foodPurpose exercise')
  if(decision?.recipeLess!==undefined&&(w.kind!=='word-use'||!validWordRecipeLess(decision.recipeLess)||Object.entries(decision).some(([key,value])=>!['prompt','recipeLess'].includes(key)&&value!==undefined)))errors.push('Invalid recipeLess exercise')
  if(decision?.foodLayer!==undefined&&(w.kind!=='word-use'||!validWordFoodLayer(decision.foodLayer)||Object.entries(decision).some(([key,value])=>!['prompt','foodLayer'].includes(key)&&value!==undefined)))errors.push('Invalid foodLayer exercise')
  if(decision?.foodChange!==undefined&&(w.kind!=='word-use'||!validWordFoodChange(decision.foodChange)||Object.entries(decision).some(([key,value])=>!['prompt','foodChange'].includes(key)&&value!==undefined)))errors.push('Invalid foodChange exercise')
  if(decision?.fruitPrep!==undefined&&(w.kind!=='word-use'||!validWordFruitPrep(decision.fruitPrep)||Object.entries(decision).some(([key,value])=>!['prompt','fruitPrep'].includes(key)&&value!==undefined)))errors.push('Invalid fruitPrep exercise')
  if(decision?.containerFit!==undefined&&(w.kind!=='word-use'||!validWordContainerFit(decision.containerFit)||Object.entries(decision).some(([key,value])=>!['prompt','containerFit'].includes(key)&&value!==undefined)))errors.push('Invalid containerFit exercise')
  if(decision?.fruitFall!==undefined&&(w.kind!=='word-use'||!validWordFruitFall(decision.fruitFall)||Object.entries(decision).some(([key,value])=>!['prompt','fruitFall'].includes(key)&&value!==undefined)))errors.push('Invalid fruitFall exercise')
  if(decision?.fruitScene!==undefined&&(w.kind!=='word-use'||!validWordFruitScene(decision.fruitScene)||Object.entries(decision).some(([key,value])=>!['prompt','fruitScene'].includes(key)&&value!==undefined)))errors.push('Invalid fruitScene exercise')
  if(decision?.stoneSides!==undefined&&(w.kind!=='word-use'||!validWordStoneSides(decision.stoneSides)||Object.entries(decision).some(([key,value])=>!['prompt','stoneSides'].includes(key)&&value!==undefined)))errors.push('Invalid stoneSides exercise')
  if(decision?.softCentre!==undefined&&(w.kind!=='word-use'||!validWordSoftCentre(decision.softCentre)||Object.entries(decision).some(([key,value])=>!['prompt','softCentre'].includes(key)&&value!==undefined)))errors.push('Invalid softCentre exercise')
  if(decision?.vegetablePrep!==undefined&&(w.kind!=='word-use'||!validWordVegetablePrep(decision.vegetablePrep)||Object.entries(decision).some(([key,value])=>!['prompt','vegetablePrep'].includes(key)&&value!==undefined)))errors.push('Invalid vegetablePrep exercise')
  if(decision?.vegetableEffect!==undefined&&(w.kind!=='word-use'||!validWordVegetableEffect(decision.vegetableEffect)||Object.entries(decision).some(([key,value])=>!['prompt','vegetableEffect'].includes(key)&&value!==undefined)))errors.push('Invalid vegetableEffect exercise')
  if(decision?.peaMotion!==undefined&&(w.kind!=='word-use'||!validWordPeaMotion(decision.peaMotion)||Object.entries(decision).some(([key,value])=>!['prompt','peaMotion'].includes(key)&&value!==undefined)))errors.push('Invalid peaMotion exercise')
  if(decision?.foodCondition!==undefined&&(w.kind!=='word-use'||!validWordFoodCondition(decision.foodCondition)||Object.entries(decision).some(([key,value])=>!['prompt','foodCondition'].includes(key)&&value!==undefined)))errors.push('Invalid foodCondition exercise')
  if(decision?.flavourSense!==undefined&&(w.kind!=='word-use'||!validWordFlavourSense(decision.flavourSense)||Object.entries(decision).some(([key,value])=>!['prompt','flavourSense'].includes(key)&&value!==undefined)))errors.push('Invalid flavourSense exercise')
  if(decision?.heavyForOne!==undefined&&(w.kind!=='word-use'||!validWordHeavyForOne(decision.heavyForOne)||Object.entries(decision).some(([key,value])=>!['prompt','heavyForOne'].includes(key)&&value!==undefined)))errors.push('Invalid heavyForOne exercise')
  if(decision?.tasteScope!==undefined&&(w.kind!=='word-use'||!validWordTasteScope(decision.tasteScope)||Object.entries(decision).some(([key,value])=>!['prompt','tasteScope'].includes(key)&&value!==undefined)))errors.push('Invalid tasteScope exercise')
  if(decision?.ripeNow!==undefined&&(w.kind!=='word-use'||!validWordRipeNow(decision.ripeNow)||Object.entries(decision).some(([key,value])=>!['prompt','ripeNow'].includes(key)&&value!==undefined)))errors.push('Invalid ripeNow exercise')
  if(decision?.rawBoard!==undefined&&(w.kind!=='word-use'||!validWordRawBoard(decision.rawBoard)||Object.entries(decision).some(([key,value])=>!['prompt','rawBoard'].includes(key)&&value!==undefined)))errors.push('Invalid rawBoard exercise')
  if(decision?.appleRemoval!==undefined&&(w.kind!=='word-use'||!validWordAppleRemoval(decision.appleRemoval)||Object.entries(decision).some(([key,value])=>!['prompt','appleRemoval'].includes(key)&&value!==undefined)))errors.push('Invalid appleRemoval exercise')
  if(decision?.cookingEndpoint!==undefined&&(w.kind!=='word-use'||!validWordCookingEndpoint(decision.cookingEndpoint)||Object.entries(decision).some(([key,value])=>!['prompt','cookingEndpoint'].includes(key)&&value!==undefined)))errors.push('Invalid cookingEndpoint exercise')
  if(decision?.steamCover!==undefined&&(w.kind!=='word-use'||!validWordSteamCover(decision.steamCover)||Object.entries(decision).some(([key,value])=>!['prompt','steamCover'].includes(key)&&value!==undefined)))errors.push('Invalid steamCover exercise')
  if(decision?.gentleHeat!==undefined&&(w.kind!=='word-use'||!validWordGentleHeat(decision.gentleHeat)||Object.entries(decision).some(([key,value])=>!['prompt','gentleHeat'].includes(key)&&value!==undefined)))errors.push('Invalid gentleHeat exercise')
  if(decision?.mixBowl!==undefined&&(w.kind!=='word-use'||!validWordMixBowl(decision.mixBowl)||Object.entries(decision).some(([key,value])=>!['prompt','mixBowl'].includes(key)&&value!==undefined)))errors.push('Invalid mixBowl exercise')
  if(decision?.textureResult!==undefined&&(w.kind!=='word-use'||!validWordTextureResult(decision.textureResult)||Object.entries(decision).some(([key,value])=>!['prompt','textureResult'].includes(key)&&value!==undefined)))errors.push('Invalid textureResult exercise')
  if(decision?.bananaOver!==undefined&&(w.kind!=='word-use'||!validWordBananaOver(decision.bananaOver)||Object.entries(decision).some(([key,value])=>!['prompt','bananaOver'].includes(key)&&value!==undefined)))errors.push('Invalid bananaOver exercise')
  if(decision?.lemonSlice!==undefined&&(w.kind!=='word-use'||!validWordLemonSlice(decision.lemonSlice)||Object.entries(decision).some(([key,value])=>!['prompt','lemonSlice'].includes(key)&&value!==undefined)))errors.push('Invalid lemonSlice exercise')
  if(decision?.mainRole!==undefined&&(w.kind!=='word-use'||!validWordMainRole(decision.mainRole)||Object.entries(decision).some(([key,value])=>!['prompt','mainRole'].includes(key)&&value!==undefined)))errors.push('Invalid mainRole exercise')
  if(decision?.tableDust!==undefined&&(w.kind!=='word-use'||!validWordTableDust(decision.tableDust)||Object.entries(decision).some(([key,value])=>!['prompt','tableDust'].includes(key)&&value!==undefined)))errors.push('Invalid tableDust exercise')
  if(decision?.kitchenCondition!==undefined&&(w.kind!=='word-use'||!validWordKitchenCondition(decision.kitchenCondition)||Object.entries(decision).some(([key,value])=>!['prompt','kitchenCondition'].includes(key)&&value!==undefined)))errors.push('Invalid kitchenCondition exercise')
  if(decision?.kitchenPlace!==undefined&&(w.kind!=='word-use'||!validWordKitchenPlace(decision.kitchenPlace)||Object.entries(decision).some(([key,value])=>!['prompt','kitchenPlace'].includes(key)&&value!==undefined)))errors.push('Invalid kitchenPlace exercise')
  if(decision?.tapWhile!==undefined&&(w.kind!=='word-use'||!validWordTapWhile(decision.tapWhile)||Object.entries(decision).some(([key,value])=>!['prompt','tapWhile'].includes(key)&&value!==undefined)))errors.push('Invalid tapWhile exercise')
  if(decision?.neededFill!==undefined&&(w.kind!=='word-use'||!validWordNeededFill(decision.neededFill)||Object.entries(decision).some(([key,value])=>!['prompt','neededFill'].includes(key)&&value!==undefined)))errors.push('Invalid neededFill exercise')
  if(decision?.vesselDetail!==undefined&&(w.kind!=='word-use'||!validWordVesselDetail(decision.vesselDetail)||Object.entries(decision).some(([key,value])=>!['prompt','vesselDetail'].includes(key)&&value!==undefined)))errors.push('Invalid vesselDetail exercise')
  if(decision?.utensilFacing!==undefined&&(w.kind!=='word-use'||!validWordUtensilFacing(decision.utensilFacing)||Object.entries(decision).some(([key,value])=>!['prompt','utensilFacing'].includes(key)&&value!==undefined)))errors.push('Invalid utensilFacing exercise')
  if(decision?.spoonLength!==undefined&&(w.kind!=='word-use'||!validWordSpoonLength(decision.spoonLength)||Object.entries(decision).some(([key,value])=>!['prompt','spoonLength'].includes(key)&&value!==undefined)))errors.push('Invalid spoonLength exercise')
  if(decision?.stickThrough!==undefined&&(w.kind!=='word-use'||!validWordStickThrough(decision.stickThrough)||Object.entries(decision).some(([key,value])=>!['prompt','stickThrough'].includes(key)&&value!==undefined)))errors.push('Invalid stickThrough exercise')
  if(decision?.eachNapkin!==undefined&&(w.kind!=='word-use'||!validWordEachNapkin(decision.eachNapkin)||Object.entries(decision).some(([key,value])=>!['prompt','eachNapkin'].includes(key)&&value!==undefined)))errors.push('Invalid eachNapkin exercise')
  if(decision?.jamJar!==undefined&&(w.kind!=='word-use'||!validWordJamJar(decision.jamJar)||Object.entries(decision).some(([key,value])=>!['prompt','jamJar'].includes(key)&&value!==undefined)))errors.push('Invalid jamJar exercise')
  if(decision?.clothesWindow!==undefined&&(w.kind!=='word-use'||!validWordClothesWindow(decision.clothesWindow)||Object.entries(decision).some(([key,value])=>!['prompt','clothesWindow'].includes(key)&&value!==undefined)))errors.push('Invalid clothesWindow exercise')
  if(decision?.buttonDetail!==undefined&&(w.kind!=='word-use'||!validWordButtonDetail(decision.buttonDetail)||Object.entries(decision).some(([key,value])=>!['prompt','buttonDetail'].includes(key)&&value!==undefined)))errors.push('Invalid buttonDetail exercise')
  if(decision?.plainFabric!==undefined&&(w.kind!=='word-use'||!validWordPlainFabric(decision.plainFabric)||Object.entries(decision).some(([key,value])=>!['prompt','plainFabric'].includes(key)&&value!==undefined)))errors.push('Invalid plainFabric exercise')
  if(decision?.hoodScope!==undefined&&(w.kind!=='word-use'||!validWordHoodScope(decision.hoodScope)||Object.entries(decision).some(([key,value])=>!['prompt','hoodScope'].includes(key)&&value!==undefined)))errors.push('Invalid hoodScope exercise')
  if(decision?.woolWarm!==undefined&&(w.kind!=='word-use'||!validWordWoolWarm(decision.woolWarm)||Object.entries(decision).some(([key,value])=>!['prompt','woolWarm'].includes(key)&&value!==undefined)))errors.push('Invalid woolWarm exercise')
  if(decision?.chairBack!==undefined&&(w.kind!=='word-use'||!validWordChairBack(decision.chairBack)||Object.entries(decision).some(([key,value])=>!['prompt','chairBack'].includes(key)&&value!==undefined)))errors.push('Invalid chairBack exercise')
  if(decision?.cyclingLength!==undefined&&(w.kind!=='word-use'||!validWordCyclingLength(decision.cyclingLength)||Object.entries(decision).some(([key,value])=>!['prompt','cyclingLength'].includes(key)&&value!==undefined)))errors.push('Invalid cyclingLength exercise')
  if(decision?.hiddenPocket!==undefined&&(w.kind!=='word-use'||!validWordHiddenPocket(decision.hiddenPocket)||Object.entries(decision).some(([key,value])=>!['prompt','hiddenPocket'].includes(key)&&value!==undefined)))errors.push('Invalid hiddenPocket exercise')
  if(decision?.curtainDress!==undefined&&(w.kind!=='word-use'||!validWordCurtainDress(decision.curtainDress)||Object.entries(decision).some(([key,value])=>!['prompt','curtainDress'].includes(key)&&value!==undefined)))errors.push('Invalid curtainDress exercise')
  if(decision?.stageSuit!==undefined&&(w.kind!=='word-use'||!validWordStageSuit(decision.stageSuit)||Object.entries(decision).some(([key,value])=>!['prompt','stageSuit'].includes(key)&&value!==undefined)))errors.push('Invalid stageSuit exercise')
  if(decision?.leftShoeStone!==undefined&&(w.kind!=='word-use'||!validWordLeftShoeStone(decision.leftShoeStone)||Object.entries(decision).some(([key,value])=>!['prompt','leftShoeStone'].includes(key)&&value!==undefined)))errors.push('Invalid leftShoeStone exercise')
  if(decision?.bootMud!==undefined&&(w.kind!=='word-use'||!validWordBootMud(decision.bootMud)||Object.entries(decision).some(([key,value])=>!['prompt','bootMud'].includes(key)&&value!==undefined)))errors.push('Invalid bootMud exercise')
  if(decision?.slipperUnder!==undefined&&(w.kind!=='word-use'||!validWordSlipperUnder(decision.slipperUnder)||Object.entries(decision).some(([key,value])=>!['prompt','slipperUnder'].includes(key)&&value!==undefined)))errors.push('Invalid slipperUnder exercise')
  if(decision?.capInto!==undefined&&(w.kind!=='word-use'||!validWordCapInto(decision.capInto)||Object.entries(decision).some(([key,value])=>!['prompt','capInto'].includes(key)&&value!==undefined)))errors.push('Invalid capInto exercise')
  if(decision?.scarfWrap!==undefined&&(w.kind!=='word-use'||!validWordScarfWrap(decision.scarfWrap)||Object.entries(decision).some(([key,value])=>!['prompt','scarfWrap'].includes(key)&&value!==undefined)))errors.push('Invalid scarfWrap exercise')
  if(decision?.gloveFound!==undefined&&(w.kind!=='word-use'||!validWordGloveFound(decision.gloveFound)||Object.entries(decision).some(([key,value])=>!['prompt','gloveFound'].includes(key)&&value!==undefined)))errors.push('Invalid gloveFound exercise')
  if(decision?.beltSupport!==undefined&&(w.kind!=='word-use'||!validWordBeltSupport(decision.beltSupport)||Object.entries(decision).some(([key,value])=>!['prompt','beltSupport'].includes(key)&&value!==undefined)))errors.push('Invalid beltSupport exercise')
  if(decision?.ticketPocket!==undefined&&(w.kind!=='word-use'||!validWordTicketPocket(decision.ticketPocket)||Object.entries(decision).some(([key,value])=>!['prompt','ticketPocket'].includes(key)&&value!==undefined)))errors.push('Invalid ticketPocket exercise')
  if(decision?.zipState!==undefined&&(w.kind!=='word-use'||!validWordZipState(decision.zipState)||Object.entries(decision).some(([key,value])=>!['prompt','zipState'].includes(key)&&value!==undefined)))errors.push('Invalid zipState exercise')
  if(decision?.helmetAsk!==undefined&&(w.kind!=='word-use'||!validWordHelmetAsk(decision.helmetAsk)||Object.entries(decision).some(([key,value])=>!['prompt','helmetAsk'].includes(key)&&value!==undefined)))errors.push('Invalid helmetAsk exercise')
  if(decision?.gloveFit!==undefined&&(w.kind!=='word-use'||!validWordGloveFit(decision.gloveFit)||Object.entries(decision).some(([key,value])=>!['prompt','gloveFit'].includes(key)&&value!==undefined)))errors.push('Invalid gloveFit exercise')
  if(decision?.buttonMatch!==undefined&&(w.kind!=='word-use'||!validWordButtonMatch(decision.buttonMatch)||Object.entries(decision).some(([key,value])=>!['prompt','buttonMatch'].includes(key)&&value!==undefined)))errors.push('Invalid buttonMatch exercise')
  if(decision?.cottonShirt!==undefined&&(w.kind!=='word-use'||!validWordCottonShirt(decision.cottonShirt)||Object.entries(decision).some(([key,value])=>!['prompt','cottonShirt'].includes(key)&&value!==undefined)))errors.push('Invalid cottonShirt exercise')
  if(decision?.localWool!==undefined&&(w.kind!=='word-use'||!validWordLocalWool(decision.localWool)||Object.entries(decision).some(([key,value])=>!['prompt','localWool'].includes(key)&&value!==undefined)))errors.push('Invalid localWool exercise')
  if(decision?.umbrellaUntil!==undefined&&(w.kind!=='word-use'||!validWordUmbrellaUntil(decision.umbrellaUntil)||Object.entries(decision).some(([key,value])=>!['prompt','umbrellaUntil'].includes(key)&&value!==undefined)))errors.push('Invalid umbrellaUntil exercise')
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
