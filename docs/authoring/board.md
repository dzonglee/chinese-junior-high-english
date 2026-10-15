# Board

Claim protocol: `AGENTS.md` → "Working alongside other agents". Statuses: `open`, `claimed`,
`review`, `done`, `blocked`. Stage 1 branches are `research/<unit-id>`. Each unit owns only the
folders in its row.

## Stage 1 · Resource gathering

Details per unit: `docs/stage1-resource-gathering.md` §4.

| ID | Unit | Depends on | Status | Owner | Branch | Updated | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-0 | Register schema, roster, folders, check script, LFS rules | — | done | claude-7fcc | main | 2026-10-15 | `scripts/check-register.mjs`, `reference/source-register/resource-schema.json`, `cities/roster.json` |
| R-STD | 2022 课标 (+2025 revision) and appendices as data | R-0 | claimed | codex-curriculum | research/R-STD | 2026-10-15 | Pushed ac16203: official 2022 PDF, 201 pages of draft OCR, curriculum/assessment maps and 8 case indexes. Revised English standard and word audit unresolved. |
| R-ED-A | Editions: 人教 (2024 new + legacy, 六三/五四), 外研, 仁爱科普 | R-0 | claimed | codex-editions-a | research/R-ED-A | 2026-10-15 | Pushed7174f0d:19sources/19files;17legacy book extracts and2024/2025 catalogues. New editions, complete maps and audio unresolved. |
| R-ED-B | Editions: 译林牛津, 沪教牛津, 北师大, 冀教, 鲁教五四, 北京版, others | R-0 | claimed | codex-editions-b | research/R-ED-B | 2026-10-15 | Pushed876dae3:51sources/44files,43legacy books and national2024catalogue. Seven representative maps; current books/audio unresolved. |
| R-NORTH | 15 north cities: 中考 papers, answers, audio, transcripts, structures, adoption, term papers by grade, 一模/二模 | R-0 | claimed | codex-north | research/R-NORTH | 2026-10-15 | Pushed 060fa97: 171 sources / 41 files. Annual audit: 9 opened, 15 unresolved searches, 51 unsearched. Original papers/media and full coverage remain missing. |
| R-EAST | 15 east cities (incl. 上海 五四): same scope as R-NORTH | R-0 | claimed | codex-east | research/R-EAST | 2026-10-15 | Pushed 96ca2a0: 266 sources / 169 files. Shanghai analyses 2022–25 and local speaking/listening procedures verified; 1542 cells unsearched. |
| R-SOUTH | 13 south cities (广东 听说, 福建, 广西, 海南, 江西, 湖南): same scope as R-NORTH | R-0 | claimed | codex-south | research/R-SOUTH | 2026-10-15 | Pushed d69861f: 101 sources / 38 files. Fujian originals, Haikou annual policies, Guangzhou/Changsha scope verified; 1440 cells unsearched. |
| R-CW | 13 central/west cities: same scope as R-NORTH | R-0 | claimed | codex-central-west | research/R-CW | 2026-10-15 | Branch pushed3a1a82f:105sources,75artifacts;1512unsearched. Official schedules and reported papers/rubrics; incomplete. |
| R-LS | 听说/口语 test specs, task types, rubrics, practice systems | R-0 | claimed | codex-listening-east | research/R-LS | 2026-10-15 | Pushed eeddd83: 21 sources / 20 files. Ownership handed to East for a cached Shanghai followup; full local rubrics remain unresolved. |
| R-VOC | 课标/考纲/edition word lists as raw data | R-STD | open | | | 2026-10-15 | owns `source-register/vocabulary/`, `files/vocabulary/` |
| R-WRITE | Writing rubrics, 范文 sources, passage-level measurements | R-0 | claimed | codex-writing | research/R-WRITE | 2026-10-15 | Pushed efb65fc: 12 sources / 7 files. Measured 10 reading passages, 5 essays and 1 national dialogue; local rubrics and lexical rates remain unresolved. |
| R-BANK | Question banks, 专题 collections, commercial bank index, exam analyses | R-0 | claimed | codex-banks | research/R-BANK | 2026-10-15 | Pushed 95026a7: 62 sources / 40 files, 930 listings and 35 type labels; 4 verified Shanghai analyses attributed. 182 cells unsearched; no bank permission. |
| R-AUX | 教辅/教师用书, 教学进度, 听说 practice systems, reading material | R-0 | claimed | codex-aux | research/R-AUX | 2026-10-15 | Pushed 7b1138c: 22 sources / 17 files, 80 catalogue entries, 272 audio links, 3 decoded samples and 1 schedule archive. Further publisher followup in progress. |
| R-RIGHTS | Licensing routes and terms (publishers, 考试院, banks, audio) | R-0 | claimed | codex-rights | research/R-RIGHTS | 2026-10-15 | Pushed 6734785: 37 sources / 23 text artifacts, 28 licensing routes. All permissions false; missing terms and ownership routes remain open. |
| R-INT | Integration layer, QA report and the editable research brief (Gate 1) | all R units done | open | | | 2026-10-15 | owns `source-register/integration/` |

## Requests

| # | Asked by (unit) | What is needed | Picked up by | Status |
| --- | --- | --- | --- | --- |
| 1 | R-STD coordinator | Read-only visual audit of baseline vocabulary appendices; coordinator retains IDs and tracked edits | codex-north | in progress |
| 2 | R-ED-B coordinator | Read-only BNU/Shanghai publisher discovery; coordinator retains IDs and tracked edits | codex-east | evidence packaged; registration pending |

## Shared resources

| Resource | Rule |
| --- | --- |
| `reference/source-register/resource-schema.json`, `cities/roster.json`, `scripts/` | Change only with a plan change (log it) or under R-0/R-INT |
