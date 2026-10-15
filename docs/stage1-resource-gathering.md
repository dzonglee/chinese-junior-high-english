# Stage 1 · Resource gathering

Goal: a research corpus at least as complete as the one behind the maths app. Maths has 826
source records over 56 cities × 2022–2026 (280 city-year cells), the 2022 standard, textbook maps
for 13 editions, and the official papers it could lawfully get. English needs the same, plus
**audio, transcripts, speaking-test specs, vocabulary lists and writing rubrics**. Researchers in
each unit find, verify, record and, where lawful, download. They do not write app content.

## 1. What to gather

| # | Resource | Why the app needs it | Notes |
| --- | --- | --- | --- |
| 1 | **义务教育英语课程标准（2022年版）** and any 2025 revision; its appendices: 词汇表 (二级/三级), 语法项目表, 话题项目表, 功能意念项目表, 学业质量标准, 教学/评价案例 | Curriculum ontology, level targets, vocabulary scope | MOE official PDF first; keep the 2011 standard only for comparison |
| 2 | **Textbook editions** in use, per grade and term: unit list, topics, target structures, unit word lists, grammar focus, listening and speaking tasks, and whether audio is published | Edition-synced lessons and word lists | 人教 Go for It! (2024 七上/七下 new, older books legacy), 外研新标准, 译林牛津, 沪教牛津 (上海, 深圳, 广州), 北师大, 仁爱科普, 冀教, 鲁教五四, 人教五四, 北京版, 湘教 and others found. Record approval year and ISBN; catalogue ≠ adoption |
| 3 | **Edition adoption per city**: which edition each city, district or school uses, by cohort | Routing the learner to the right book | Evidence is a hint; record authority and scope exactly as in maths |
| 4 | **中考英语 papers 2022–2026 per city**: paper, answer key, listening audio, listening transcript (听力原文), marking notes | Exam blueprints, difficulty calibration, 题型 inventory | Official 教育考试院/教育局 sources first. Mirrors are `reported`. Paywalled sites are recorded, never bypassed |
| 5 | **Exam structure facts per city and year**: total marks, minutes, sections with counts and marks, listening share, whether 听说/口语 is machine-based (人机对话), its weight and timing, and reforms by cohort | City blueprints (`exam-structures.json` for English) | Separate facts from inference. Every fact cites a source id |
| 6 | **听说/口语 test specs**: task types (模仿朗读, 信息获取, 信息转述, 话题简述, 情景问答 …), timing, scoring rubric, practice systems named by the authority, sample tasks | The 听说 training module | 广东, 北京, 上海, 江苏 cities, 深圳, 福建, 浙江 … each differs |
| 7 | **考试说明 / 考纲**: content scope, 题型示例, the province's or city's own 词汇表 (e.g. 广东 1,600 words) | Exact scope per city | Year-specific, so record the cohort |
| 8 | **Writing rubrics** (书面表达 评分标准) and official 范文 where published | Writing self-marking | Usually inside the answer key or 考试说明 |
| 9 | **Reading and listening levels**: passage length, word count and new-word rate per 题型 in recent papers (measured, not copied) | Authoring difficulty targets | Store measurements, never the passages |
| 10 | **Rights routes**: publisher licensing contacts and terms (人教, 外研, 译林, 上海教育), exam-authority reuse policies, audio rights, and existing licensed banks (学科网, 菁优, 组卷网 …) | The launch licensing decision | Record only; no agreements are made by agents |

## 2. Cities and years

The same **56 priority cities** as maths (roster in
`reference/source-register/cities/roster.json`, copied from the maths register; tiers are 第一财经
2025, a commercial label). For each city: **2022–2026 papers**, plus **2027 announcements** where
published (reforms, new 听说 formats). That gives 280 city-year cells per resource type. Note
where a province sets one paper (省卷) and which cities use it. A capital's paper never stands for
its province.

## 3. How to record (register first, files second)

Every source is a record in your unit's `sources.json` (schema:
`reference/source-register/resource-schema.json`). Required fields:

- **Identity:** `source_id` (`<unit>::<nnn>`), `title`, `url`, `publisher`.
- **Dates:** `publication_date`, `retrieval_date`.
- **Scope:** `jurisdiction`, `cities`, `years`, `grades`, `resource_type`, `format`.
- **Authority and verification:** `authority` and `verification` (enums below).
- **Status and rights:** `download_status`, `rights`.
- **Notes:** `facts` (short, quotable facts with page numbers) and `caveats`.

Rules:
- **Authority:** `official_exam_authority` · `official_education_department` · `official_school` ·
  `publisher` · `commercial_bank` · `commercial_aggregator` · `community` · `unknown`.
- **Verification:** `verified_original_document` (opened, official, matches) ·
  `verified_official_page` · `mirror_matches_official` · `indexed_preview_only` ·
  `recollection_or_compilation` · `untrusted_candidate` · `failed`. App-facing states map
  `verified_*` → `official`, mirrors and previews → `reported`, the rest → `unverified`.
- **Download status:** `downloaded_sha256_verified` · `reference_only` · `preview_link_only` ·
  `paywall_or_registration_not_bypassed` · `blocked` · `not_found`.
- **Rights:** `unknown` (the default), `reference_only`, `public_policy_document`,
  `explicit_permission`, `commercial_licence`, `open_licence`. Set
  `commercial_reuse_approved: false` unless you hold written permission (agents never do).
- **Empty means unknown,** never "no". Record the source of every fact, and do not infer marks or
  formats from a neighbouring city or year.

**Files.** Download only what is freely and lawfully reachable. Put each file in
`reference/files/<unit>/` named `<city>-<year>-<kind>.<ext>`, for example `广州-2025-paper.pdf`,
`广州-2025-answers.pdf`, `广州-2025-listening.mp3` or `广州-2025-transcript.pdf`. Add every file
to your `download_manifest.json`: `file_id`, `source_id`, `download_url`, `relative_path`,
`retrieved`, `bytes`, `sha256` and `opened_check` (what you saw on opening it). Files are
committed through Git LFS.

**Coverage.** Your `coverage.json` has one cell per city × year × resource. Use this status ladder:
`not_searched` → `not_found` / `blocked` → `link_only` → `file_reported` →
`file_verified` → `licensed_ingestion_ready`. That last status is set only by the owner.

## 4. Units (claim on the board)

| Unit | Scope | Owns | Depends on |
| --- | --- | --- | --- |
| R-0 | Register schema, roster, folders, `scripts/check-register.mjs`, LFS rules | shared files | — |
| R-STD | Curriculum standard + appendices; 学业质量; vocabulary and grammar appendices as data | `source-register/curriculum/` | R-0 |
| R-ED-A | Editions 人教 (new 2024 and legacy, 六三 and 五四), 外研, 仁爱科普 | `source-register/editions/` (own files `a-*`) | R-0 |
| R-ED-B | Editions 译林牛津, 沪教牛津, 北师大, 冀教, 鲁教五四, 北京版, others | `source-register/editions/` (own files `b-*`) | R-0 |
| R-NORTH | Cities in the north stream (北京 天津 石家庄 保定 太原 呼和浩特 沈阳 大连 长春 哈尔滨 济南 青岛 烟台 潍坊 临沂): papers, answers, audio, transcripts, structure facts, adoption | `source-register/north/`, `files/north/` | R-0 |
| R-EAST | 上海 南京 苏州 无锡 常州 南通 徐州 杭州 宁波 温州 嘉兴 绍兴 金华 台州 合肥 | `source-register/east/`, `files/east/` | R-0 |
| R-SOUTH | 广州 深圳 东莞 佛山 惠州 珠海 福州 厦门 泉州 南宁 海口 南昌 长沙 | `source-register/south/`, `files/south/` | R-0 |
| R-CW | 重庆 成都 武汉 郑州 洛阳 西安 兰州 西宁 银川 乌鲁木齐 昆明 贵阳 拉萨 | `source-register/central-west/`, `files/central-west/` | R-0 |
| R-LS | 听说/口语 test specs, task types, rubrics, practice systems, per province/city | `source-register/listening-speaking/` | R-0 |
| R-VOC | 课标词汇, provincial/city 考纲词汇表, edition unit word lists → raw lists as data | `source-register/vocabulary/` | R-STD |
| R-WRITE | Writing rubrics and published 范文 sources; reading/listening level measurements | `source-register/writing/` | R-0 |
| R-RIGHTS | Licensing routes and terms (publishers, exam authorities, banks, audio) | `source-register/rights/` | R-0 |
| R-INT | Integration: `master-sources.json`, `priority-city-exam-map.json`, `coverage.json`, `textbook-term-map.json`, `listening-speaking-map.json`, `vocabulary-map.json`, `package-allowlist.json`, `qa-report.md` | `source-register/integration/` | all of the above `done` |

Before the city units start, check the roster's stream assignment against the maths register
(`roster.json` is copied from it). If a city sits in the wrong stream, move it with a plan change.

## 5. Done criteria per unit

- Every city × year × resource cell in scope has a status, with `not_searched` = 0.
- Every official source the unit could find is recorded. For every city-year, at least the 考试院
  or 教育局 announcement of the English exam (marks, minutes, 听说) is searched for.
- Every downloaded file was opened and its `opened_check` says what it is (city, year, English,
  paper or answers or audio, complete or partial).
- `research.md` summarises findings per city in English: structure by year, 听说 format, editions,
  reforms by cohort, gaps, conflicts between sources (keep both and say which is stronger).
- Checks in `AGENTS.md` pass, and the log entry lists gaps and questions for the owner.

## 6. Pitfalls seen in the maths research

- Mirrors (原创力文档, 道客巴巴, 学科网 previews) often relabel years or cities. Treat them as
  `reported` at best, and `untrusted_candidate` when the content doesn't match.
- A publisher catalogue or one school's booklist is not citywide adoption.
- Numeric grade ≠ local label (上海 6 = 预备). Record both.
- Totals change with reforms (e.g. 广州 maths 120 → 150 from 2027). Record the year and the cohort.
- Listening audio is often only on 考试院 pages for a short time, or not at all. Record what exists
  even when it can't be downloaded.
