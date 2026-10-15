# Board

Claim protocol: `AGENTS.md` → "Working alongside other agents". Statuses: `open`, `claimed`,
`review`, `done`, `blocked`. Stage 1 branches are `research/<unit-id>`. Each unit owns only the
folders in its row.

## Stage 1 · Resource gathering

Details per unit: `docs/stage1-resource-gathering.md` §4.

| ID | Unit | Depends on | Status | Owner | Branch | Updated | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-0 | Register schema, roster, folders, check script, LFS rules | — | done | claude-7fcc | main | 2026-10-15 | `scripts/check-register.mjs`, `reference/source-register/resource-schema.json`, `cities/roster.json` |
| R-STD | 2022 课标 (+2025 revision) and appendices as data | R-0 | claimed | codex-curriculum | research/R-STD | 2026-10-15 | 2022 officialPDF acquired;58 grammar entries,29 themes,17 quality indicators; branch pushed.2025 English revision and word-list audit unresolved; see log. |
| R-ED-A | Editions: 人教 (2024 new + legacy, 六三/五四), 外研, 仁爱科普 | R-0 | claimed | codex-editions-a | research/R-ED-A | 2026-10-15 | Pushed7174f0d:19sources/19files;17legacy book extracts and2024/2025 catalogues. New editions, complete maps and audio unresolved. |
| R-ED-B | Editions: 译林牛津, 沪教牛津, 北师大, 冀教, 鲁教五四, 北京版, others | R-0 | claimed | codex-editions-b | research/R-ED-B | 2026-10-15 | owns `source-register/editions/b-*`, `files/editions-b/` |
| R-NORTH | 15 north cities: 中考 papers, answers, audio, transcripts, structures, adoption, term papers by grade, 一模/二模 | R-0 | claimed | codex-north | research/R-NORTH | 2026-10-15 | Branch pushed da41b42:160sources,19files,132opened previews;1708unsearched. Partial handoff; original papers/media and full coverage outstanding. |
| R-EAST | 15 east cities (incl. 上海 五四): same scope as R-NORTH | R-0 | claimed | codex-east | research/R-EAST | 2026-10-15 | Branch pushed f53d4ab:231records,143HTML artifacts;1552unsearched. Partial handoff; no complete original exam/audio files. |
| R-SOUTH | 13 south cities (广东 听说, 福建, 广西, 海南, 江西, 湖南): same scope as R-NORTH | R-0 | claimed | codex-south | research/R-SOUTH | 2026-10-15 | Branch pushed e03b907:81sources,13files; official Fujian English2022–26 and Quanzhou2026 adoption.1459unsearched; incomplete. |
| R-CW | 13 central/west cities: same scope as R-NORTH | R-0 | claimed | codex-central-west | research/R-CW | 2026-10-15 | Branch pushed3a1a82f:105sources,75artifacts;1512unsearched. Official schedules and reported papers/rubrics; incomplete. |
| R-LS | 听说/口语 test specs, task types, rubrics, practice systems | R-0 | claimed | codex-listening | research/R-LS | 2026-10-15 | owns `source-register/listening-speaking/`, `files/listening-speaking/` |
| R-VOC | 课标/考纲/edition word lists as raw data | R-STD | open | | | 2026-10-15 | owns `source-register/vocabulary/`, `files/vocabulary/` |
| R-WRITE | Writing rubrics, 范文 sources, passage-level measurements | R-0 | open | | | 2026-10-15 | owns `source-register/writing/`, `files/writing/` |
| R-BANK | Question banks, 专题 collections, commercial bank index, exam analyses | R-0 | claimed | codex-banks | research/R-BANK | 2026-10-15 | Pushed8545410:62sources/40HTML,930listed assets,35type labels;98link_only/182unsearched. Automated21cnjy collection stopped under inspected terms. |
| R-AUX | 教辅/教师用书, 教学进度, 听说 practice systems, reading material | R-0 | claimed | codex-aux | research/R-AUX | 2026-10-15 | owns `source-register/aux/`, `files/aux/` |
| R-RIGHTS | Licensing routes and terms (publishers, 考试院, banks, audio) | R-0 | claimed | codex-rights | research/R-RIGHTS | 2026-10-15 | owns `source-register/rights/` |
| R-INT | Integration layer, QA report and the editable research brief (Gate 1) | all R units done | open | | | 2026-10-15 | owns `source-register/integration/` |

## Requests

| # | Asked by (unit) | What is needed | Picked up by | Status |
| --- | --- | --- | --- | --- |

## Shared resources

| Resource | Rule |
| --- | --- |
| `reference/source-register/resource-schema.json`, `cities/roster.json`, `scripts/` | Change only with a plan change (log it) or under R-0/R-INT |
