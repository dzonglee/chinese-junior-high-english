# Board

Claim protocol: `AGENTS.md` → "Working alongside other agents". Statuses: `open`, `claimed`,
`review`, `done`, `blocked`. Stage 1 branches are `research/<unit-id>`. Each unit owns only the
folders in its row.

## Stage 1 · Resource gathering

Details per unit: `docs/stage1-resource-gathering.md` §4.

| ID | Unit | Depends on | Status | Owner | Branch | Updated | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-0 | Register schema, roster, folders, check script, LFS rules | — | done | claude-7fcc | main | 2026-10-15 | `scripts/check-register.mjs`, `reference/source-register/resource-schema.json`, `cities/roster.json` |
| R-STD | 2022 课标 (+2025 revision) and appendices as data | R-0 | done | codex-curriculum | main (research/R-STD b48d267) | 2026-10-16 | 15 sources / 33 retained artifacts. Both standards and versioned appendices audited; all 197 revised pages viewed. Main lists: 505 / 1600; supplements: 221 per version. The 2011 text and exact Ministry revision dates remain source gaps. |
| R-ED-A | Editions: 人教 (2024 new + legacy, 六三/五四), 外研, 仁爱科普 | R-0 | claimed | codex-editions-a | research/R-ED-A | 2026-10-15 | Pushed7174f0d:19sources/19files;17legacy book extracts and2024/2025 catalogues. New editions, complete maps and audio unresolved. |
| R-ED-B | Editions: 译林牛津, 沪教牛津, 北师大, 冀教, 鲁教五四, 北京版, others | R-0 | claimed | codex-editions-b | research/R-ED-B | 2026-10-15 | Pushed bf15137: 65 sources / 79 files; 43 legacy extracts, BNU new-series navigation for 5 volumes and teacher catalogues. Current full books/ISBNs/audio unresolved. |
| R-NORTH | 15 north cities: 中考 papers, answers, audio, transcripts, structures, adoption, term papers by grade, 一模/二模 | R-0 | claimed | codex-north | research/R-NORTH | 2026-10-15 | Pushed 060fa97: 171 sources / 41 files. Annual audit: 9 opened, 15 unresolved searches, 51 unsearched. Original papers/media and full coverage remain missing. |
| R-EAST | 15 east cities (incl. 上海 五四): same scope as R-NORTH | R-0 | claimed | codex-east | research/R-EAST | 2026-10-15 | Pushed 96ca2a0: 266 sources / 169 files. Shanghai analyses 2022–25 and local speaking/listening procedures verified; 1542 cells unsearched. |
| R-SOUTH | 13 south cities (广东 听说, 福建, 广西, 海南, 江西, 湖南): same scope as R-NORTH | R-0 | claimed | codex-south | research/R-SOUTH | 2026-10-15 | Pushed d69861f: 101 sources / 38 files. Fujian originals, Haikou annual policies, Guangzhou/Changsha scope verified; 1440 cells unsearched. |
| R-CW | 13 central/west cities: same scope as R-NORTH | R-0 | claimed | codex-central-west | research/R-CW | 2026-10-15 | Pushed 0d724a5: 124 sources / 106 artifacts; annual Henan/local policies and 35 school-course hints verified within scope. 1502 cells unsearched; papers/media incomplete. |
| R-LS | 听说/口语 test specs, task types, rubrics, practice systems | R-0 | claimed | codex-listening-east | research/R-LS | 2026-10-15 | Pushed 00cf3ac: 28 sources / 27 files; Fujian models and 7 Shanghai annual originals. 275 speaking cells unsearched; full scored tasks/rubrics/audio unresolved. |
| R-VOC | 课标/考纲/edition word lists as raw data | R-STD | claimed | codex-vocabulary | research/R-VOC | 2026-10-16 | Pushed 88a8870: 21 sources / 49 asset records (3 shared); 1600 national headwords and 4775 occurrences across 11 legacy books. All 200 derivative pages match parents. Still incomplete: 280 annual local cells, current books and other editions. |
| R-WRITE | Writing rubrics, 范文 sources, passage-level measurements | R-0 | claimed | codex-writing | research/R-WRITE | 2026-10-15 | Pushed efb65fc: 12 sources / 7 files. Measured 10 reading passages, 5 essays and 1 national dialogue; local rubrics and lexical rates remain unresolved. |
| R-BANK | Question banks, 专题 collections, commercial bank index, exam analyses | R-0 | claimed | codex-banks | research/R-BANK | 2026-10-15 | Pushed 95026a7: 62 sources / 40 files, 930 listings and 35 type labels; 4 verified Shanghai analyses attributed. 182 cells unsearched; no bank permission. |
| R-AUX | 教辅/教师用书, 教学进度, 听说 practice systems, reading material | R-0 | claimed | codex-aux | research/R-AUX | 2026-10-15 | Pushed 0897b15: 41 sources / 31 files; 90 product records, 272 audio links, 3 prior samples and 1 schedule archive. Teacher texts/audio remain inaccessible; 279 schedule cells unsearched. |
| R-RIGHTS | Licensing routes and terms (publishers, 考试院, banks, audio) | R-0 | claimed | codex-rights | research/R-RIGHTS | 2026-10-15 | Pushed 6734785: 37 sources / 23 text artifacts, 28 licensing routes. All permissions false; missing terms and ownership routes remain open. |
| R-INT | Integration layer, QA report and the editable research brief (Gate 1) | all R units done | open | | | 2026-10-15 | owns `source-register/integration/` |

## Requests

| # | Asked by (unit) | What is needed | Picked up by | Status |
| --- | --- | --- | --- | --- |
| 1 | R-STD coordinator | Read-only visual audit of baseline vocabulary appendices; coordinator retains IDs and tracked edits | codex-north | done; baseline main audit and221supplemental records registered; separately versioned2025review completed |
| 2 | R-ED-B coordinator | Read-only BNU/Shanghai publisher discovery; coordinator retains IDs and tracked edits | codex-east | registered and checked on R-ED-B bf15137 |
| 3 | R-STD coordinator | Complete visual transcription of supplemental appendix tables into temporary data; coordinator registers results | curriculum-supplements | done;221baseline/revised supplemental records, revised main-list audit and currentcase1/2maps registered |
| 4 | R-STD coordinator | Resolve English-specific revised-standard evidence and comparison source through public official discovery | curriculum-revision | done; acquired actual English2025PDF;143body/other-appendix page reviews and version guards registered |
| 5 | R-VOC coordinator | Read-only unit-wordlist audits with source identity and page fidelity; coordinator retains IDs | curriculum-supplements and curriculum-revision | done for 5 PEP and 6 FLTRP legacy books; 4775 occurrences; field-level unknowns explicit |
| 6 | R-VOC coordinator | Bounded actual local-wordlist discovery and controls | curriculum-revision and coordinator | bounded pass recorded; no acquired local wordset or annual coverage upgrade; remaining searches unresolved |

## Shared resources

| Resource | Rule |
| --- | --- |
| `reference/source-register/resource-schema.json`, `cities/roster.json`, `scripts/` | Change only with a plan change (log it) or under R-0/R-INT |
