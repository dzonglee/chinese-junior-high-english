# Vocabulary research handoff

The national lists and 60 legacy textbook appendices are registered. R-VOC remains incomplete: 115 annual city vocabulary cells remain unsearched, 159 have bounded not_found results and 6 specifically scoped attempts are blocked. Current books, remaining legacy families and actual local raw examination wordsets remain unfinished. Latest results below supersede earlier chronological snapshots.

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

## Shanghai independent public search and annual-source review

The main header's brokensearch is distinct from the older literal publicPOSTsearch. The latter returns realJSONfor vocabulary and annualtargets. All seven pages/70short词汇title-indexresults were read, including out-of-scope high-school/self-studyitems and single-character誓词/汇总matches. No raw junior-high2022–2026headwordlist found. Five actual annualtargets have hugefuzzyORresultsets; only firstpagesread, as with1081broader词汇表results. These are boundedsearches,notuniversalabsence; counts are not English-source inventories.

The actual2022Englishanalysis was already reopened underR-VOC::006;2023–2025analysesand2026Englishlisteningrehearsalnotice were separately opened/read. No curriculum-standard versionyear or raw list is established. Allfivecells become boundednot_found, superseding2026'soldSogouproviderblock through an independent officialroute, without solving thatchallenge.2026notice'sMay18,8:55–9:25(includingfiveminutetesttones)is REHEARSAL,not the actualexam listeningduration; publishedmediachannels are not acquired audio/transcripts.

## Additional route diagnostics

Luoyang remains genuinely unsearched at usable annual scope. Ordinary vocabulary requests returned unrelated results; advanced vocabulary targets, annual admissions controls and even a known government-report title returned zero. Actual responses are retained, butHTTP200is not useful absence evidence. Continue through independent annual policy/archive routes rather than filling five cells from these controls.

Additional public-provider controls also failed to support discovery:Yahoo500,360redirectloop, and unrelatedBingRSSresults. The RSS response limits use to personal aggregation, so that route was stopped and its content excluded; only diagnostic metadata and byte/SHA pins remain. No annual cells change from provider controls.

## BNU scanned legacy lists

Five BNU books add 2,334 manually transcribed occurrences: 2,271 in 36 unit/Get Ready groups plus 63 in four explicitly separate Places / Places and Names sections. All 128 retained pages were visually inspected, including 16 picture-dictionary figure pages. All five selected-page PDFs preserve source RGB pixels and complete native text; no resampling, OCR layer or watermark removal was used. Alphabetical/picture/supplementary repetitions are not counted twice.

The observed publisher is 北京师范大学出版社, chief editor 王蔷, with 2013 cover approvals. Reviewed covers/title/prefaces/afterwords show no ISBN or imprint/printing dates, so those fields remain unknown. No catalogue lookalike fills the gap. Main/index swim/go swimming and practice/practise differences, and grade9 alphabetical-only complain/get used to/scenic, remain explicit. IPA/gloss/per-entry typography/star semantics stay uncurated. These five books complete the cached 60-parent legacy audit, while current books and unacquired edition/grade/term families still require separate discovery. No local examination equivalence, adoption or commercial permission follows.

## Wuhan: useful provincial index, blocked direct city search

Hubei's public search works in a normal JavaScript browser. The examination control has genuine policy results; the complete broad词汇表and英语词汇sets each have one irrelevant dialect/higher-education item. Five annual vocabulary targets return zero, while separate annual English-examination queries have mixed-year policy/news results with first-page limits. These bounded results do not prove a local wordlist absent.

The actual Wuhan education homepage publishes its own search form, but collected control/broad/2022–2026target requests render an explicit Forbidden / HTTP Proxy /403 site-administrator block. No blocked content was recovered and no workaround is attempted; block HTML stays temporary, with diagnostic hashes retained. All five annual cells therefore record the actual city-route block, with the independent provincial research linked.

Actual policy鄂教基〔2023〕4号and its Q&A were opened. They introduce provincial unified setting from2024 while explicitly preserving separate Wuhan setting. The Q&A cites2022English standards as speaking-reform rationale; it supplies no local headword appendix or2025revision-adoption proof. Provincial marks/minutes are not substituted for Wuhan annual facts.

## Northern municipal indexes: five bounded city passes

Delegate query/review evidence

This pass covers 14 northern cities excluding Beijing, with 2022–2026 as separate targets. No literal local annual junior-high English headword set was found or retained. The 70-cell proposal contains **25 bounded `not_found` observations and 45 `not_searched` gaps**. These are search-scope observations, never proof of universal absence. A failed homepage or control does not advance any annual cell.

| City | Actual annual queries | Review completed | Proposed cells |
| --- | --- | --- | --- |
| Yantai | Five actual year + English + vocabulary queries | Complete short wordlist query: 0; complete English-vocabulary query: one 2020 vocational-teaching article, opened and excluded | Five bounded not_found |
| Qingdao | Five actual annual multiword queries, with visible all-time option checked | Complete short indexes: 242 wordlist rows + 55 English-vocabulary rows; 249 unique URLs. Two actual candidate pages opened | Five bounded not_found |
| Jinan | Five actual annual title queries, all empty | Short title queries 词汇表 and 词汇: zero; 英语: 16 mostly adult-examination titles. Known examination control works | Five bounded title-index not_found |
| Linyi | Five visible advanced AND queries: year AND 英语 AND 词汇 | All 28 / 23 / 22 / 28 / 24 rows captured; complete 42-row English-vocabulary and one-row wordlist broad indexes. Union: 95 unique URLs. Five actual teaching-plan pages opened | Five bounded not_found |
| Shijiazhuang | Five actual annual queries, all result pages captured | 10 / 20 / 25 / 24 / 18 annual rows; complete 112-row broad English-vocabulary index; union 114 unique URLs. Literal quoted 词汇表: zero | Five bounded municipal-index not_found |
| Tianjin, Baoding, Taiyuan, Hohhot, Shenyang, Dalian, Changchun, Harbin, Weifang | No working annual search established | Independent ordinary public routes and controls attempted; none supplies actual annual vocabulary results | 45 not_searched |

## Query semantics and verification

Yantai's education bureau offers a genuine public search form. A known school-news control returned matching titles, dates and URLs; empty annual results were checked in the actual successful JSON responses. The only English-vocabulary broad result is a 2020 meeting of secondary/higher vocational schools, not a target junior-high wordset. Its actual original page was opened.

Qingdao's default is **three years**. The ordinary visible **全部时间** option was selected and its checked state verified before queries. Complete short-query pagination was followed through the published API, with all 297 rows/249 unique URLs reviewed. The much larger annual multiword queries are OR-like; their annual result sets were not fully paginated and are not described as AND searches. The bounded negative relies on complete short-query indexes alongside the actual annual attempts. A 2017 junior-high lesson-award news item and a 2023–2024 senior-high teaching plan were opened and excluded. The latter's 3500-word target is senior-high material, not a junior-high list.

Jinan's actual public exam-institute title search returns known 中考 notices. The short term 词汇 produces no titles. Annual spaced queries appear normalized to contiguous tokens, so their empty results alone cannot establish absence in article bodies. The index is a title index, not a complete city/school/attachment search. **Its explicit notice forbids unauthorized copying, republication and mirrors. Original HTML and bodies are excluded from integration; only minimal research query metadata, title/URL citations, response hashes/counts and the rights warning remain.**

Linyi's real advanced form implements literal whole phrases and AND. A known examination-policy phrase produces 10 results, narrowed to 5 by the actual 2026 AND field, validating the syntax. The complete broad phrase 词汇表 returns one government-site wording report, where the phrase occurs inside “词汇表述”. The five annual AND queries and the whole-phrase 英语词汇 query were fully paginated and all retained title/snippet/date/URL rows reviewed. The 95 unique results comprise teaching plans, awards, catalogues, primary/senior-high/vocational material and general news. Five real plans spanning the five target years were opened; two explicitly concern 高一/高二/高三, and the junior-high plans describe review/pedagogy without listing the target headwords or document attachments. The visible scope is **全市**, including municipal/county sites; it is not a whole-province scope. Cited standard years can match annual tokens and do not establish examination-year applicability.

Linyi's initial ordinary control response sometimes arrives after its advanced response. The accepted evidence is the retained JSON with parsed query **code 7** and the exact advanced expression, paired with the actual public POST fields. Some scratch HTML snapshots show the initial control because of this response race. Those snapshots are excluded from the accepted advanced artifact manifest; the query ledger discloses the race. No response is identified merely by arrival order.

Shijiazhuang's known 中考 control works. Quoting 词汇表 preserves that literal token and returns zero results, while quoting 英语词汇 still produces separate English/vocabulary tokens; no general exact-phrase or AND guarantee is claimed. All small actual annual result sets and the complete 112-row broad index were captured/read. The union contains 114 unique URLs, mostly adult/high-school examinations, public enquiries and general news. A district textbook enquiry was located and opened, but its column explicitly restricts reproduction, extraction, quotation, copying and mirrors. **No answer text, mirrored HTML or raw search snippets containing that answer are included in integration.** Citation-only index notes and a paraphrased bibliographic lead remain. The reply is district-specific, dated 2024-01-12, and described as nonbinding guidance; it is not citywide or five-year adoption evidence.


Full delegate research, complete-query citation indexes, actual annual query keys, source mapping and retention policy are retained under `annual-discovery/north/`. The95allowlisted HTML/JSON responses were rehashed at registration. Nine unresolved northern cities remain unsearched while independent routes continue. Jinan original HTML and restricted Shijiazhuang reply text/search snippets are excluded; metadata-only rights warnings and bibliographic leads do not establish citywide adoption.

## Suzhou bounded public-form search

The actual education-homepage form supplies a working HTTPSPOSTroute. A genuine中考control returns13results. Both complete broad indexes(14wordlistresults across2pages,7English-vocabularyresults)and five annual result sets(8/8/8/3/5)were read, with tokenised/mixed-year limitations. Three actual candidate articles describe2026new-textbook classrooms, the ZhenhuaEEMEproject and2026teaching-aid publisher submission rules. None provides a raw headword appendix. Current publisher/ISBN/citywide adoption is unknown; four submission templates are not textbook or vocabulary sources. Five annual cells are boundednot_found, not universal absence. No licence or actual current book acquired.

## Jiangsu provincial examination index: five remaining cities

ActualNanjing/Wuxi/Changzhou/Nantong/Xuzhoucity-name controls and generic中考control return genuine records. Three complete short词汇表/英语词汇/词汇queries are explicitly empty. All25actual city/year vocabulary targets were issued and read; their combined terms are restrictive, so they do not independently prove absence. Optional spaced-query503failures remain in the ledger, distinct from successful empty targets. Five cities add25boundednot_foundcells for this provincial index only. Municipal archives, local papers, current publisher adoption and universal absence remain unverified; no lexical content acquired.

## Northern independent provincial/city indexes

Five additional cities reviewed

Prepared 2026-10-16, after the first 25-cell northern checkpoint. This follow-up supports **25 further bounded not_found observations**: Shenyang, Dalian, Hohhot, Harbin and Changchun, each with actual 2022–2026 searches. Tianjin, Baoding, Taiyuan and Weifang remain **20 not_searched cells**. No local annual junior-high headword dataset was recovered. These findings concern the actual searched indexes, never universal absence or local exam/adoption applicability.

| City | Actual annual targets | Complete short-index review | Limits |
| --- | --- | --- | --- |
| Shenyang and Dalian | Ten actual city/year/English/vocabulary queries, each explicit empty HTML result | Liaoning Education Department 词汇:7 rows; 英语词汇:1; 词汇表:0. Separate city 中考 controls return55/32 results | Provincial education-department index; not all municipal/school sites. Original Shenyang challenged city route was not retried or bypassed |
| Hohhot | Five actual provincial exam-authority queries, all zero; five actual city title-search POSTs, no titles | Provincial 词汇表/词汇/英语词汇:0; city short title queries:0. Provincial Hohhot 中考 control23; city 中考 control9 | Provincial exam-authority index and bounded city title form. Query-token semantics and unindexed city content remain unknown |
| Harbin | Visible province-wide advanced AND queries:2/3/6/2/1 rows for2022–2026 | Whole-phrase wordlist0; English-vocabulary6; all-keyword Harbin+English with literal vocabulary16. All rows read; union17 URLs | Real visible 全省 scope. Result dates/cited years do not automatically establish exam years |
| Changchun | Actual provincial advanced AND/all-keyword plus literal vocabulary queries:2/2/4/2/2 rows | Wordlist0; complete vocabulary15 rows over two pages; annual/broad union15 URLs. Known city2026中考 control50 | Real visible 吉林省 scope and body-search option. One provincial index, not every city/attachment/archive |

Liaoning's actual ordinary form fields came from the education-department homepage. Each zero annual result is a real `default-no-result` element naming the submitted query, not a failed homepage or empty dynamic shell. All seven short 词汇 results were reviewed: general policy/news, university gratitude/campus activities, primary-English guidance, a 2021 university English-vocabulary competition report and international Chinese-language standards. The actual competition report was opened and excluded from target junior-high/annual scope. Multiword matching semantics are not generalized beyond the observed searches.

The Inner Mongolia exam authority's ordinary browser emits both a title-filtered query and an unrestricted full-text query; they have different totals (known 中考 control11 versus513). Accepted annual/broad evidence uses the exact observed unrestricted endpoint, changing only the ordinary query text. The separate Hohhot 中考 query returns23 actual matches. That result published the city's own examination portal, which was opened and its actual title-search POST form used. The city form's five annual and short vocabulary queries produce an empty title list, while the known 中考 control produces9 article titles. Its published client script disables copying/selection; no restriction was disabled, and integration retains only minimal query/hash/title/URL research metadata for that city portal. No original city homepage/body is copied into this package.

Harbin's whole-province UI and advanced syntax were verified through ordinary public controls. Actual code-7 parsed expressions include city, year, English and vocabulary. All small annual/broad result sets were read; they are principally university innovation projects, language-research projects, course awards, university budgets and other non-lexical news. Clearly unrelated academic PDF/Office attachments were not downloaded. An actual undergraduate-course recognition notice was opened as a representative exclusion. No count from that notice is treated as a vocabulary count.

Changchun's actual advanced UI has separate all-keyword and whole-keyword fields; its default advanced position is title, so the visible body-search option was explicitly selected. Accepted requests require `word=''`, general result type10, the exact all/whole fields, body scope3 and the ordinary advanced marker. Delayed initial 中考 requests can inherit the marker and still return unrelated control results; those are excluded from vocabulary evidence. All15 short vocabulary results were reviewed: academic events, school teaching/news, community activities, senior-high training, an exam analysis and a procurement notice. The actual official **2025 Changchun English examination analysis** was opened and its entire relevant native text read. It cites the2022 standard, textbook alignment and question themes; it contains no literal local headword list or document attachment. It is retained as contextual research, not a numerical blueprint or a raw lexical dataset.


Exact accepted JSON response selection requires the documented parsed query/field guards; initial delayed control responses are excluded. Hohhot city homepage/body and selection-blocking script are excluded rather than disabling restrictions. The53allowlisted downloaded/opened artifacts were rehashed at registration. Actual2025ChangchunEnglishanalysis supplies contextual standard/textbook-alignment observations, no headword appendix or numerical blueprint. Four unresolved northern cities remainunsearched while independent discoverycontinues.

## Nine remaining southern cities

All45city/year targets were actually searched through public municipal/provincial forms or the independently verified ordinary360form.185usable query responses contain1771returnedrows, with restrictive/relaxed query semantics and failed-page bounds retained. Root rehashed actual raw bodies before retaining purpose-limited derived result projections; unrelated response branches, challenge bodies, duplicate decoded/rawcopies and interface screenshots are excluded. No local annual headword file was verified.

Two Quanzhou authority articles were opened in full. Its2026reply mentions500primary-stagecorewords and three named transition resources but supplies no attachment; exact-title queries return only the reply. This is not a500-word junior-high exam list. The2022national-notice republication cancels separate exam syllabi, but cannot prove vocabulary resources absent. Nanning2023commercialFLTRPtitle remains unverified: actualproviderGEThasemptyvisiblemetadata/cookie-locationscript, which was not executed. Rightsfalse; no actualwordset orcityadoption inferred. Exact English research and45request-linked coverage proposals are underannual-discovery/south9.
