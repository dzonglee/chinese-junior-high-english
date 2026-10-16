# Vocabulary research handoff

The national lists and 55 legacy textbook appendices are registered. R-VOC remains incomplete: 249 annual city vocabulary cells remain unsearched, 29 have bounded not_found results and 2 specifically scoped attempts are blocked. Current books, remaining legacy families and actual local raw examination wordsets remain unfinished. Latest results below supersede earlier chronological snapshots.

## National lists

`national-wordlist.json` contains1,600raw printed headword records with separate2022and2025revised-source occurrences:505level-two entries and1,095additional entries. Bracketed American spellings, sourcecase and slash-pair counting are preserved.221supplemental rows per version are indexed separately in `national-list-index.json`. These are shared already-retained R-STD artifacts, not new unique downloads. The revised source is an official schoolmirror, with exact Ministry issue/effective dates still unknown. No automatic local exam equivalence or textbook-unit assignment is inferred.

## Legacy textbook lists

`edition-wordlist-index.json` indexes fivePEP Go for it! volumes (2,611occurrences,58literalheadings,57appendixpages) and sixFLTRP New Standard volumes (2,164occurrences,39unit-listpages). Together they contain4,775headword/phrase occurrences, retaining repeated uses, sourcecase and literalStarter/Module/Revision distinctions. They are not4,775distinct lemmas or prescribed exam words. FLTRP's51standalone proper-name/alphabetical pages are retained separately and excluded from those occurrence counts.

The index now also includes six SHEP Oxford legacy volumes: 1,367 occurrences across 46 literal unit lists on 27 appendix pages. These bring the seventeen-book total to 6,142 occurrences. `shep-audit/README.md` and `book-summary.json` separate approval, first-edition and retained-printing dates and identify each ISBN. Complete pinned parent PDFs are retained unchanged; 27 appendix pages and 12 identity pages were visually reviewed. No current-edition, city-adoption or local-exam equivalence is inferred. All lexical labels, stars and lesson-page references were checked; IPA and Chinese glosses remain null.

All selected appendix/index pages were visually inspected. Whole-page derivatives, identity/approval/copyright evidence and backcovers preserve exact parent Git/SHA/page provenance. Community mirrors are not independently matched publisher originals; no2024newbook or currentcityadoption is inferred. Approval, copyright, first-edition and printing dates remain distinct. FivePEP ISBNs are source-observed with valid checksums; sixFLTRP ISBNs remain unknown after actualbackcover review.

PEP7lower/8lower scans have reviewed lexical/unit/page fields but unaudited individual bold/variant fields, explicitly null. Native-font priority observations on other volumes stay sourcebook conventions. FLTRPstar means reviewreinforcement, not the national curriculum level-two marker. IPA/gloss fields remain null; retained rawfont text/spans are unreviewed evidence.

`derivative-fidelity-check.json` records decoded-page/native-text comparison against complete cached parents. An initial color-profile loss in threePEPcover derivatives was caught and repaired through original-document selection preserving color/output-intent settings. Source PDFs are unchanged. Some cached sources emit cross-reference warnings; those are recorded separately from selected-page fidelity.

## Bounded local discovery

The four regional source registers supplied662existing records for an offline keyword audit, not662newresources. The retained leads are Nantong2026's403candidate, Shanghai2022'squalitativeanalysis, an existing nonofficialShenzhenrevisionpreview and Henan2026'spolicy. No actual local headword list follows from these records. No further21cnjyrequests were made because inspected terms bar automationwithoutpermission.

Bing'stargeted query and positivecontrol returned the samegenericShanghairesults. Shanghai'svisible词汇search raised `tiao is not defined` and onlyreloadedthearticle; the governmenthomepage returned503. An alternate public search provider presented a human CAPTCHA during its normal UIpositivecontrol; stoppedwithoutsolvingorretrying. These are precise route failures, not validannual zero-hit searches or a claim that the wholeinternet is inaccessible. `local-discovery/` and `alternate-search/` preserve exact scope and provenance.

Henan's actual2026policy identifies2011standards for English while reflecting2022concepts. National2025content therefore cannot be applied automatically to every city'sexam. A local rawlist and city/cohort participation need their own evidence.

## Continue

### Reproducible audit and access followup (2026-10-16)

Run `node reference/source-register/vocabulary/check-audit.mjs` from the repository root, alongside the shared register checker. The unit audit checks pinned dataset and actual artifact bytes/SHA-256, rejects unresolved LFS pointers, reconciles national word sequences and source-page positions, verifies book occurrence/group counts and ISBN checksums, and checks the complete annual coverage grid and explicit applicability/reuse flags. It does not repeat the earlier visual audits, establish publisher authenticity, or make the unit complete.

The PEP grade-seven upper ISBN caveat was corrected consistently in the source record, dataset and index after reopening the retained back cover: ISBN 978-7-107-24470-4 is visible on parent page 138. First-edition and printing details remain unknown. No lexical fields changed.

GitHub fetch and LFS access work. The literal Nantong 2026 PDF and Zhengzhou-hosted Henan 2026 policy requests were denied at proxy CONNECT (403), before an origin response was obtained. This differs from the earlier source-level retrieval observations. Exact host additions were saved in the environment draft; publication is required to apply them. `local-discovery/access-followup-2026-10-16.json` records the diagnosis. No source or artifact was acquired, and all 280 annual cells remain unsearched. Retry those sources after network publication, then follow actual links with their city/year scope intact.

### Continued collection after the access followup (2026-10-16)

The preceding access paragraph describes the earlier request state, not a continuing global blocker. The Zhengzhou-hosted Henan policy now returns 200. Its HTML and linked timetable were reopened, read and registered as R-VOC-050/051 under the existing R-VOC::010 record. The timetable confirms English on June 23, 15:00–16:40, 100 minutes and 120 marks (100 written + 20 listening); Q3 retains the 2011-standard basis with 2022 concepts. This is policy evidence, not a headword list or proof of each city's participation.

Public GitHub discovery also works. A current SHEP grade-seven upper community candidate cites a literal Smart Education page and image sequence, but neither original was acquired: those endpoints returned proxy CONNECT 403. The candidate is retained as a lead, not accepted as a current-book dataset. A separate unscoped community examination-word text does not establish any city/year list. `local-discovery/continued-discovery-2026-10-16.json` records these distinctions. Independent work continued with the six complete SHEP legacy appendix audits (R-VOC::022–027; unchanged full parent files R-VOC-052–057). All 280 annual cells remain unsearched; Stage 1 is not complete.

Resume the existing `research/R-VOC` claim. First use working authorized discovery to collect actual city/provincial lists and complete genuine city×2022–2026 searches. Continue current2024books and other edition/five-four rawlists on this sameunit; preserve these completed legacy datasets. Do not recast blocked/irrelevant search controls as280searchedcells. R-INT remains behind allunitsdone, and Stage1/Gate1is notcomplete. All commercial reuse approvals remain false; no app content, contacts, accounts or agreements were created.


## Ongoing Renai/Yilin and annual-source pass (2026-10-16)

Six Renai/Kepu books add2,634occurrences across86literal unit/topic/review groups; six Yilin/Oxford books add2,293across44units. The total is29books /11,069occurrences /306groups. All154Renai and122Yilin retained pages were visually inspected, including identity/appendix figures. Selected RGB/native-text fidelity passes for every page. Renai's grade9lower CIP2014-10differs from copyright first-edition2014-11. Yilin second-edition dates remain distinct from unknown first editions and2021printings. Source legend meanings differ; per-entry markers, IPA/gloss/variants remain explicitly unaudited.

Delegate-curated datasets and their original hashes remain unchanged. Registered datasets add R-VOC IDs, explicit false reuse flags and consistent grouping/provenance fields; indexed lexical labels preserve the reviewed delegate sequence. Yilin extracts remove stale accessibility/navigation catalog references only; exact selected-page pixel/native equality is recorded. No current-edition/adoption inference follows.

`annual-discovery/` preserves separate2022–2026queries for Beijing and Zhengzhou, broad wordlist/vocabulary/syllabus searches, controls, result pages and linked official sources. These ten bounded not_found cells mean no raw local list was found in those recorded authority-index searches; they do not mean universal absence. Zhengzhou2023/2024pagination failed and remains an explicit limitation. Actual Shanghai2026and Guangzhou2022targets reached verification/connection failures, respectively; other city/year cells are unchanged. No challenge was bypassed, and failed controls are not annual searches.

National教基厅函〔2022〕6号, signed25March/published6April2022, sectionIIIexplicitly cancels separate junior-high examination syllabi. Seeking a fresh annual考纲must therefore distinguish exact local curriculum applicability and independently published wordsets from obsolete or commercial compilations. Beijing's2023evaluation report states English's last2011-standard exam is2024and all subjects use2022standards from2025. It does not establish2025revision adoption or exact additional local words. Teacher advice reports1540(printed14September2024,web25September) and1600(April2025plus extensions/phrases); preserve the discrepancy, do not merge it into a verified local set.

Zhengzhou's2025/2026city-area policies explicitly include English in the uniform provincial examination. The2026embedded timetable was rendered/read and matches23June15:00–16:40,100minutes,120marks(100written+20listening). The province-level2011basis in R-VOC::010can be connected to that exact city-area scope, with county/city administration limits retained; it does not turn the national2025list into a verified Henan set.

Two delegates continue Hebei and SWFL; Shandong/ESPress five-four and BNU remain. Existing owner claims and integration dependencies are unchanged. The current worker still exposes no Chrisverse/Kanban/Obsidian native tools after repeated attachments; repository memory/board hold pending reconciliation and no external update is claimed.


## Additional SWFL and Hebei legacy audits

Six SWFL books add 2,410 occurrences across 52 units; all 132 retained source pages were viewed and matched in decoded RGB and native text. The book's delta marker refers to the 2011 standard's level-five list, distinct from national 2022/2025 stars. Literal source spellings `hocky` and `gallope` remain flagged research evidence. The grade-eight lower contents/index endpoint conflict remains unresolved. School structure and adoption remain unknown despite an upstream catalogue inference.

Five Hebei books add 2,552 occurrences across 42 units: 1,850 primary vocabulary labels and 702 separately labelled structures/expressions. All 107 retained source pages were viewed and matched in decoded RGB/native text. Grade-seven lower required full visual transcription because its Latin appendix font decodes as control codes. Other primary-label sets were crosschecked against their alphabetical indexes; main `Niagara Falls` and index `Niagra Falls` remain a source conflict. All five cover ISBN checksums pass, while omitted imprint pages leave edition/printing dates unknown.

These additions bring the current total to 40 legacy books and 16,031 occurrences across 400 literal groups. Alphabetical duplicates remain outside the main counts; lexical and expression list kinds remain distinct. Two delegates continue Shandong and ESPress five-four audits. BNU scans remain. No current-edition, local wordset, licensing or release claim follows.

## Guangzhou annual archive and guide review

The public archive route works independently of the earlier failed government-search form. Ten document and thirteen news pages reach the2021boundary and expose2022–2026dated notices. All five annual guide PDFs were opened and retained (1114pages in total); the exact cover/contents and selected English/policy pages visually inspected are listed in `annual-discovery/guangzhou-guides-review.json`. Full native text was searched, but no exhaustive whole-guide visual review or universal absence is claimed. No actual raw local word list was acquired; all five annual cells are bounded `not_found`, superseding the earlier Guangzhou2022route block.

The2024/2025guides explicitly reproduce a policy applying2022curriculum standards to2024–2026cohorts. This differs from Beijing's documented2025transition and Henan's2026English2011basis. These local scopes remain separate; none proves2025national-revision adoption. The2022/2023guides' generic curriculum wording does not establish a version year. Selected2022–2025English sections say20minutes listening/speaking,100minutes written and30+90=120marks;2026guide cover/contents review alone does not reverify these numbers.

The official2022offline practiceRARwas normally downloaded and statically opened with existinglibarchive. It contains an unencrypted WindowsEXE; it was never executed or installed. The notice reports two approximately20-minute sets, and a2026warmtip still links it. Zero sample sets/audio/transcripts were independently played/decoded, so this is a practice-system package, not acquired audio or a wordlist. Public availability grants no commercial permission. Actual guides/practice leads are available to the R-SOUTH/R-LS/R-AUX owners without changing their units.

## Shenzhen annual policy and search limits

The public education-policy index exposes2023Q&A/2024/2026policies; the general announcement archive supplies2025. All four annual sources and ten embedded images were opened and read. No actual local wordlist or explicit curriculum-standard version was located. Their bounded2023–2026cells are `not_found`, retaining public-search403 and archive limits rather than asserting universal absence. The2022actual vocabulary target also returned403; no2022Englishpolicy was opened, so that cell stays `blocked`. Two junior-high archive pages opened, then the published third-page request403; no guessed page or hidden API was used.

The2023–2026written tables independently show EnglishJune28,09:00–10:10(70minutes). Actual2024–2026text gives100marks including25listening/speaking,20-minute人机对话. Listening/speakingdates:2023May20–21,2024May18–19,2025May17–18,2026May16–17. The2023calendar alone does not justify copying later marks/timing. No national-standard version, current textbook adoption or neighbouring Guangzhou applicability is inferred.

## Haikou bounded annual vocabulary discovery

The disclosed publicPOSTsearch works. The broad词汇表query has three complete hits:2025primary-schoolreading,2020primaryEnglishnews and a2019all-subjectsyllabus notice. The latter was opened: its English subsection refers to2011standards but provides no raw headword list, and no2022–2026applicability is inferred. Five actual annual vocabulary targets and all five annual city admissions policies were also opened/read at native-text/link-title scope. No actual current local list was acquired; all five cells are boundednot_found. Multiword search is tokenised and2023's66results were inspected only on the first page; this is not universal absence or a complete archive audit.

Search artifacts are explicitly derived projections with original byte/SHA pins: they omit unrelated public12345case metadata, which was neither followed nor retained. The annual policies are research discovery pages, not claims of full embedded-image/annex review or independently verified marks/curriculum versions.

## ESPress five-four legacy lists

Eight explicitly五·四学制ESPress volumes are audited:2,138literal entries across90units,127reviewed identity/appendix pages. Six-upper's335labels were visually transcribed from scanned pages; seven other books use native text with documented visual encoding repairs. Alphabetic/supplementary repeats are not counted again; IPA, gloss, per-entry typography/star meaning and first-lesson-page columns remain uncurated. All eightISBNs were visually read and checksumvalid.

Seven selected-page PDFs preserve all reviewed RGB pixels/native text. A grade7upper trial changed pixels on identity pages1/2/3/138, so its unchanged full parent is retained instead; its body remains unaudited. Exact source discrepancies remain:manners/manner,unbalanced/unbaleanced,alphabetic-onlyweight(7upper)andflight(8lower),literalleft-handness/Hellen Keller. Grade6upper imprint2012-07first edition conflicts with CIP2013-07; actual2014-07printing remains separate. No current textbook, local adoption or commercial permission is established.

## Shandong five-four legacy lists

Seven explicitly五·四学制books add2,745literal rows across62units;170identity/appendix pages were visually reviewed. All7ISBNs were read and checksumvalid; first/observed editions and printing dates remain distinct. Six reviewed publication statements describe2011-standard adaptation from PEP六三英语（新目标）;grade7lower's corresponding basis remainsunknown. Native ligature/missing-letter corruptions were restored from source pixels with a correction ledger. IPA/gloss/POS/variants/individualtypography remainuncurated.

Only11acceptedPDFs are registered. Five unchanged full parents are retained once each because selected extraction changed strict native trailing spaces(6lower/7upper)or soft hyphens(8lower/8upper/9whole). Their unreviewed body pages are not claimed audited. Six compact derivatives for6upper/7lower remove stale accessibility/navigation references while preserving selected source RGB/native text. Exact reviewed section maps and rejected-candidate differences remain explicit. Alphabeticalextraentries/referenceconflicts are retained; noexhaustiveindexdoubletranscriptionorcurrentcityadoptionclaim. Allrightsfalse.

## Changsha bounded annual vocabulary discovery

Five distinct ordinary annual targets and five restrictive advanced targets were inspected. The ordinary长沙中考control is relevant; advancedzeroes and mixed-year ordinary matches are explicitly limited. The broad词汇表query returns38tokenisedresults: all four pages were followed through actual browser next links and read. A plausible中学word-chunkresearchhit was opened and proved explicitly普通高中material; it is excluded, with visible2019date separate from2023URLpath. No raw junior-high local wordlist acquired; five cells are boundednot_found, not universalabsence.

The actual2023Hunanpolicy explicitly introduces provincial written setting from2024, but generic curriculum wording does not establish a versionyear. Actual2025Changshareform text describes oralEnglish as a separate20-markassessment converted toA/B/C/Dforcomprehensivequalityevaluation, not an extra20markssimplyaddedtoadmissionsscore. Policy native-text scope and embedded-image review limits remain explicit.
