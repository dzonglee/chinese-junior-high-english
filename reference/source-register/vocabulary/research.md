# Vocabulary research handoff

The national lists and29legacy textbook appendices are registered. R-VOC remains incomplete:268annual city vocabulary cells remain unsearched, ten have bounded not_found results and two specifically scoped attempts are blocked. Current2024books, remaining legacy families and actual local raw examination wordsets remain unfinished. Failed discovery routes are not absence evidence. Latest results below supersede the earlier chronological collection snapshots.

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
