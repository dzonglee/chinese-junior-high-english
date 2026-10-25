# Board

Claim protocol: `AGENTS.md` → "Working alongside other agents". Statuses: `open`, `claimed`,
`review`, `done`, `blocked`. Stage 1 branches are `research/<unit-id>`. Each unit owns only the
folders in its row.

## Application delivery

The owner requested a usable local app first and deferred videos. Native publication is a
separate next milestone. Research continues separately; it is not marked complete.
Detailed requirements and acceptance evidence are in `docs/app-delivery.md`.

| ID | Work | Status | Owner | Branch | Next action |
| --- | --- | --- | --- | --- | --- |
| APP-DELIVERY | Deliver usable local English app | done | codex-local | main | Local app and offline build delivered |
| APP-LESSONS | Complete the local junior-high lesson course | done | codex-course | main | 413 original lessons delivered; approved listening audio pending |
| APP-INTERACTION | Build interactive language activities | done | codex-interaction | main | 13 workshops and reading evidence delivered |
| APP-TEACHING | Upgrade every lesson’s interactive teaching | done | codex-solo | main | 413 interactive studios delivered; native/local evidence in teaching review |
| APP-UI | Redesign the complete app to the maths product standard | done | codex-solo | main | Whole-app redesign delivered; checked native screenshots and comparison in the UI review |
| APP-EXAM-LESSONS | Strengthen exam teaching in every individual lesson | done | codex-solo | main | 413 lessons coached; 991 tests, native and visual evidence in exam-teaching review |
| APP-MOCKS | Deliver authored mock papers and exam corrections | done | codex-solo | main | Eight original papers delivered; 1,006 tests, complete native flows and correction/writing checks |
| APP-VISUAL-LESSONS | Redesign and inspect each lesson individually | claimed | codex-solo | author/individual-lessons | 226/413 individually reviewed; next l-v-course-environmental-choices; track docs/authoring/lesson-upgrades.md |
| APP-NATIVE | Prepare native validation and publication | open | — | — | SDK and visual review through 147; 148–226 await source-transfer approval. Physical devices, approved audio and production remain |

### Delivery checklist

| Work | Status |
| --- | --- |
| Persistent memory and board instructions | Done |
| Platform, content model and compiler | Done for local milestone |
| Lessons, vocabulary and practice | 413 original lessons; all-lesson checks pass; editorial approval pending |
| Listening, speaking and writing | 29 themes across skills; 99 scripts await approved audio |
| Exams, question builder and private questions | Implemented and tested |
| Progress, mistakes and data controls | Implemented and tested |
| Functional testing and visual review | Shared workshops checked; owner requires individual redesign of every lesson; 226/413 individually reviewed under new acceptance |
| Release preparation | Real device, production configuration and owner review pending |

The existing Obsidian project memory and Kanban cards are maintained through Studio MCP; see project-memory.md.

## Stage 1 · Resource gathering

Details per unit: `docs/stage1-resource-gathering.md` §4.

| ID | Unit | Depends on | Status | Owner | Branch | Updated | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-0 | Register schema, roster, folders, check script, LFS rules | — | done | claude-7fcc | main | 2026-10-15 | Register schema and validation tools are complete. |
| R-STD | 2022 课标 (+2025 revision) and appendices as data | R-0 | done | codex-curriculum | main (research/R-STD b48d267) | 2026-10-16 | Curriculum audit is complete. The 2011 source and exact revision dates remain gaps. |
| R-ED-A | Editions: 人教 (2024 new + legacy, 六三/五四), 外研, 仁爱科普 | R-0 | claimed | codex-editions-a | research/R-ED-A | 2026-10-15 | Legacy books are collected. Current books, complete maps and audio remain open. |
| R-ED-B | Editions: 译林牛津, 沪教牛津, 北师大, 冀教, 鲁教五四, 北京版, others | R-0 | claimed | codex-editions-b | research/R-ED-B | 2026-10-15 | Legacy books and publisher leads are collected. Current books, ISBNs and audio remain open. |
| R-NORTH | 15 north cities: 中考 papers, answers, audio, transcripts, structures, adoption, term papers by grade, 一模/二模 | R-0 | claimed | codex-north | research/R-NORTH | 2026-10-15 | Continue official sources, original papers, media and annual coverage. |
| R-EAST | 15 east cities (incl. 上海 五四): same scope as R-NORTH | R-0 | claimed | codex-east | research/R-EAST | 2026-10-15 | Continue original papers, media and the remaining city and term coverage. |
| R-SOUTH | 13 south cities (广东 听说, 福建, 广西, 海南, 江西, 湖南): same scope as R-NORTH | R-0 | claimed | codex-south | research/R-SOUTH | 2026-10-15 | Fujian originals and selected policies are collected. Complete the remaining coverage. |
| R-CW | 13 central/west cities: same scope as R-NORTH | R-0 | claimed | codex-central-west | research/R-CW | 2026-10-15 | Selected local policies are verified. Papers, media and coverage remain incomplete. |
| R-LS | 听说/口语 test specs, task types, rubrics, practice systems | R-0 | claimed | codex-listening-east | research/R-LS | 2026-10-15 | Selected official formats are verified. Complete local rubrics, tasks and audio. |
| R-VOC | 课标/考纲/edition word lists as raw data | R-STD | done | codex-vocabulary | main (research/R-VOC 0924dfe) | 2026-10-16 | Bounded research complete; current books and local raw lists remain acquisition gaps. |
| R-WRITE | Writing rubrics, 范文 sources, passage-level measurements | R-0 | claimed | codex-writing | research/R-WRITE | 2026-10-15 | Selected passages and essays are measured. Local rubrics and lexical analysis remain open. |
| R-BANK | Question banks, 专题 collections, commercial bank index, exam analyses | R-0 | claimed | codex-banks | research/R-BANK | 2026-10-15 | Bank catalogues and selected analyses are recorded. Coverage and permissions remain open. |
| R-AUX | 教辅/教师用书, 教学进度, 听说 practice systems, reading material | R-0 | claimed | codex-aux | research/R-AUX | 2026-10-15 | Selected catalogues and schedules are recorded. Teacher material and audio remain open. |
| R-RIGHTS | Licensing routes and terms (publishers, 考试院, banks, audio) | R-0 | claimed | codex-rights | research/R-RIGHTS | 2026-10-15 | Licensing routes are recorded. No commercial permissions have been obtained. |
| R-INT | Integration layer, QA report and the editable research brief (Gate 1) | all R units done | open | | | 2026-10-15 | Wait for the research units to finish before final integration. |

## Requests

| # | Asked by (unit) | What is needed | Picked up by | Status |
| --- | --- | --- | --- | --- |
| 1 | R-STD coordinator | Read-only visual audit of baseline vocabulary appendices; coordinator retains IDs and tracked edits | codex-north | done; baseline main audit and221supplemental records registered; separately versioned2025review completed |
| 2 | R-ED-B coordinator | Read-only BNU/Shanghai publisher discovery; coordinator retains IDs and tracked edits | codex-east | registered and checked on R-ED-B bf15137 |
| 3 | R-STD coordinator | Complete visual transcription of supplemental appendix tables into temporary data; coordinator registers results | curriculum-supplements | done;221baseline/revised supplemental records, revised main-list audit and currentcase1/2maps registered |
| 4 | R-STD coordinator | Resolve English-specific revised-standard evidence and comparison source through public official discovery | curriculum-revision | done; acquired actual English2025PDF;143body/other-appendix page reviews and version guards registered |
| 5 | R-VOC coordinator | Read-only unit-wordlist audits; coordinator retains IDs | curriculum-supplements and curriculum-revision | done for 5 PEP and 6 FLTRP legacy books; 4775 occurrences; field-level unknowns explicit |
| 6 | R-VOC coordinator | Bounded actual local-wordlist discovery and controls | curriculum-revision and coordinator | done; all annual vocabulary targets recorded; no local raw wordset verified |
| 7 | R-VOC coordinator | Read-only Renai and Yilin appendix audits; coordinator owns numbering and tracked edits | renai-wordlists and yilin-wordlists | done; all twelve books checked and registered |
| 8 | R-VOC coordinator | Read-only Hebei and SWFL vocabulary audits | renai-wordlists and yilin-wordlists | done; all eleven books checked and registered |
| 9 | R-VOC coordinator | Check Shandong and ESPress legacy vocabulary | renai-wordlists and yilin-wordlists | done; both five-four families checked and registered |
| 10 | R-VOC coordinator | Guangzhou annual guides and offline English practice package for R-SOUTH/R-LS/R-AUX followup | existing unit owners | available on main; static package and guide scope in vocabulary research notes |
| 11 | R-VOC coordinator | Check BNU legacy vocabulary scans | renai-wordlists | done; five books checked; ISBN/imprint remain unknown |
| 12 | R-VOC coordinator | Finish northern annual vocabulary searches | yilin-wordlists | done; all 70 targets recorded with search limits |
| 13 | R-VOC coordinator | Finish southern annual vocabulary searches | renai-wordlists | done; all 45 targets searched; raw wordsets remain unverified |
| 14 | R-VOC coordinator | Check current BNU vocabulary readers | renai-wordlists | done; five catalogues checked; no current word pages loaded |
| 15 | R-VOC coordinator | Verify annual official English-exam announcement searches | renai-wordlists and yilin-wordlists | done; all 280 cells have targeted searches or existing notice/policy attempts |
| 16 | Owner continuation | Verify the published app and report concrete defects | codex-continuation | done; four findings documented in docs/reviews/app-2026-10-16/ |
| 17 | App review | Correct grammar prompts and accepted answers | codex-local | done; 90 free responses constrained, seven regression tests |
| 18 | App review | Cancel recording starts during backgrounding | codex-local | done; delayed permission and suspension regressions pass |
| 19 | App review | Invalidate approval after material catalog changes | codex-local | done; full-catalog fingerprint with metadata regressions |

## Shared resources

| Resource | Rule |
| --- | --- |
| `reference/source-register/resource-schema.json`, `cities/roster.json`, `scripts/` | Change only with a plan change (log it) or under R-0/R-INT |
