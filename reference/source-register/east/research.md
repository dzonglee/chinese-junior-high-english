# Eastern cities: English research handoff

As of 15 October 2026. **R-EAST remains incomplete.** There are 231 source records over 185 distinct URLs and 143 captured public HTML artifacts (about 9.1 MB). These are research previews and policy context, not a complete original-paper/audio corpus.

The records include 91 term-paper reports, 55 mocks, 8 common-paper preview records, 5 answer records, 20 visible transcript records, 18 advertised-audio records and 3 local-mock writing-rubric records. Auxiliary records can share a URL and must not be counted as independent documents. `summary.json` gives the complete breakdown.

## What was actually inspected

- Three 2026 common-paper/answer previews: Wuxi, Xuzhou and Changzhou. Older common-paper previews were found for Changzhou 2022 and 2024, including duplicate mirrors. This is five distinct city/year groups across three cities; the original complete files and official marking origin remain unverified.
- Named school/district term and mock previews across 2022–2026. School exercises and publisher regional simulations are separate types; publisher edition labels do not prove textbook adoption.
- Explicit transcript text in 20 public previews. Eighteen records advertise MP3 assets, but their ordinary links lead to resource pages; no direct public audio player/file was established and no recording was downloaded or listened to. These local school/mock records do not satisfy the common-city-exam audio/transcript grid.
- Three local mock writing rubrics, at `https://zy.21cnjy.com/23161783`, `/23168270` and `/23168272`. Their wording is reference-only; none is established as the official city common-exam rubric.
- One official context page: Huaibei 2026 foreign-language policy. The sister maths register labelled it Hefei; the actual notice says 淮北市教育局 and 我市. Jurisdiction is corrected to Huaibei, `cities` is empty, and no Hefei coverage is satisfied. It reports foreign language 120 marks including 20 listening marks, but is not an English paper. Its timetable image was not verified.

## Provenance, scope and calendar years

The sister maths register at commit `c84b232d63f2d120fcadec3e5244ce28185c98fb` supplied 27 exact policy/catalogue leads. Each was requested and its actual response logged. Earlier official labels were not carried over after failed retrieval. No maths marks, paper identity or adoption evidence was converted into an English fact.

The north/south researchers supplied a shared public English sitemap cache. The 168 east discovery leads are retained in `shared-catalogue-leads.json`; actual preview requests and failures are in `retrieval-attempts.json`. The continued queue inspected 159 URLs: 142 usable public previews and 17 failed requests. Nine leads were quarantined for jurisdiction, edition-name or out-of-period problems. Existing initial previews were reused.

Upper-term academic-year spans can cross December/January. Both years remain on the record unless an explicit calendar date/month resolves the year; unresolved records do not fill precise-year coverage. Lower-term ranges use the ending year. Original academic labels remain in titles/cohort fields. Upload dates never supply exam years. For example, a schoolyear 2021–2022 upper-term October exercise is 2021 and was excluded despite its later upload; a 2022–2023 upper-term paper with an actual December 2022 header is filed as 2022.

The Wuxi/Jiangyin XiaGang grade-9 listing has an 初二 footer; it is `untrusted_candidate`, grades are unknown and it fills no grade-specific cell. “江苏宿迁市苏州外国语学校” does not belong to Suzhou city. An unqualified 苏州外国语学校 listing and the Hefei-named 颍东 branch are quarantined pending jurisdiction proof. “牛津上海版” alone is an edition name, not Shanghai-city evidence. See `quarantined-leads.json`.

## Coverage by city

All rows below are reported preview coverage, not official or licensed files. Grade/term years come from filled grid cells; unresolved academic spans are omitted. Official English structures, textbook adoption and cohort reforms remain unestablished for every priority city.

| City | Common-paper preview years | Term-paper years with grade/term cells | Mock years with grade/term cells |
| --- | --- | --- | --- |
| 上海 | — | 2022, 2023, 2024, 2025, 2026 | 2025 |
| 合肥 | — | 2022, 2024, 2026 | — |
| 南京 | — | 2022, 2024, 2025, 2026 | 2025, 2026 |
| 南通 | — | 2024, 2026 | 2025, 2026 |
| 常州 | 2022, 2024, 2026 | 2026 | 2026 |
| 徐州 | 2026 | 2026 | 2025 |
| 无锡 | 2026 | 2026 | 2026 |
| 苏州 | — | 2023, 2024, 2026 | 2025, 2026 |
| 台州 | — | 2024, 2025 | — |
| 嘉兴 | — | 2026 | 2025 |
| 宁波 | — | 2022, 2024 | — |
| 杭州 | — | 2022, 2023, 2024, 2025, 2026 | 2026 |
| 温州 | — | 2025, 2026 | 2024, 2025, 2026 |
| 绍兴 | — | 2024, 2025, 2026 | 2025 |
| 金华 | — | 2026 | 2025 |

At the initial preview pass, the grid contained 750 base cells and 900 grade/term cells: 15 cities × 5 years, plus grades 7–9 × upper/lower terms × term/mock types. Initial states: 1,552 `not_searched`, 83 `link_only`, 15 `blocked`. That initial preview pass had no verified document cells; the official followup below supersedes those counts. Some sourced mocks have no established term and therefore cannot fill the grade/term grid.

## Access limits and remaining work

- Most exact official city/policy/catalogue endpoints returned 403, 502 or 503. The log distinguishes proxy CONNECT failures, origin errors and timeouts. These failures do not establish that a resource is absent. Each city/year still needs its own official English announcement search.
- Public numeric `zy.21cnjy.com` previews and ordinary sitemap pages were accessible. The site’s ordinary keyword search returned 503 or gzip-compressed JavaScript-only challenges; these were not bypassed. The first image explicitly shown in the Ningbo 2024 preview returned 403, so there is no visual authentication claim.
- Bing returned 200 but unrelated calendar/tourism results even with the correct query visible; no facts or coverage derive from those results. Baidu returned a proxy 403. GitHub searches found practice apps rather than authenticated east-city past papers; their unsourced exam claims were not used.
- No full original paper PDF/DOCX, actual audio, authenticated official answer key, official city writing rubric or adoption document was acquired. City-level listening/speaking specifications, 2027 reform searches, grade-6 Shanghai samples and most city/year paper searches remain open.
- Next: find each priority city’s official 2022–2026 English policies and complete originals; acquire paper/audio/transcript assets only through ordinary public or licensed routes; authenticate identities and marking origin; resolve the listed calendar/jurisdiction conflicts; finish grade/term/mocks and adoption evidence.

Bank/rights handoff leads: `https://www.jyeoo.com/english/` is a genuine junior-high English catalogue and links `/open` for enterprise interfaces. Its footer says member-uploaded resources retain original-author copyright; this is no licence. `/english/report` returned 503. `www.zxxk.com` returned a JavaScript challenge without verified visible content. These are leads for R-BANK/R-RIGHTS, not completed work in those units.

## Validation

`node scripts/check-register.mjs reference/source-register/east` passes. Additional semantic checks in `qa.json` confirm coverage/source scope agreement, no precise dates from ambiguous spans, no midterm/common-exam confusion, unique coverage keys, exact artifact/manifest equality and actual SHA-256 checks. The initial 143 artifacts were public HTML previews/context. The official followup below adds PDF artifacts through LFS. Passing these checks does not complete R-EAST or Gate 1.


## Official followup — 2026-10-15

This pass adds 35 sources and 26 artifacts: the register now has 266 sources (220 distinct URLs), 169 artifacts (165 HTML and four PDFs), and 1,650 coverage cells. R-EAST and Gate 1 remain incomplete. Current cells are 1,542 `not_searched`, 90 `link_only`, three `file_verified` and 15 `blocked`. The verified speaking cells describe the precise limited evidence below; they do not mean complete task specifications or rubrics were gathered.

### Shanghai official English analyses and local procedures

Actual public Shanghai examination-authority search forms and ordinary category navigation led to independently opened originals. The search interface literally publishes its read-only POST endpoint and `rang`, `form` (offset), `size`, `field`, `keywords` fields. No account, signature, challenge or private endpoint was used. Search counts are fuzzy relevance totals and mix years/subjects, so they do not establish inventory counts or absence. The retained form and category pages provide discovery provenance (R-EAST::237–238); every accepted fact comes from an opened original. Category pages 1, 2, 3, 4, 6 and 7 were opened; page 5 failed 403. No inference fills that missing page.

| Actual original | Verified scope | Limit |
| --- | --- | --- |
| R-EAST::239, Shanghai 2022 expert English-paper analysis | Listening/grammar/reading genre discussion; open school-activity writing requires own choices and reasons | Qualitative analysis; no original paper, recording, transcript, point rubric or performance statistics |
| R-EAST::240, Shanghai 2023 analysis | Volunteer webpage/news interview and other reading genres; time-management/community-training writing asks for views and changes | Exam date June 18; no complete blueprint or marking bands |
| R-EAST::241, Shanghai 2024 analysis | Multimodal barter-group reading; family-object letter; exchange gift-card writing with Chinese object and reasons | Published June 18 but actual English exam June 16; no mark bands |
| R-EAST::242, Shanghai 2025 analysis | Route-map/table multimodal reading; device-free day, friends and mooncake family tradition; application email to English project-learning group | June 15 exam; no point rubric or quantitative error/score statistics |
| R-EAST::247 / 248 | Complete two-page 2023 / 2025 speaking candidate rules: ten-minute sessions, computer-seat procedures | Device-calibration paragraph reading in 2023 is not evidence of a scored read-aloud task |
| R-EAST::256 / 257 | 2025 / 2026 practice notices independently confirm human-computer dialogue, ten minutes, ten marks | Candidate-only platforms; no login, platform request, question set or rubric acquired |
| R-EAST::259 / 262 | 2024 / 2022 written foreign-language timetables: 09:00–10:30 with 08:55–09:00 sound check | Dates are June 16, 2024 and July 12, 2022; no cross-year extrapolation |
| R-EAST::263 | Complete one-page 2024 listening instructions: FM89.9/AM792 via campus broadcast; listening begins 09:00, then written section | Procedure only, not an audio recording or exact listening-section duration |

The practice notices have different access windows and attempt rules: 2025 April 21–May 16, three papers with two attempts in each phase; 2026 April 16–May 15, three papers with five attempts per paper. Only the public notices were inspected. Platforms require examination-candidate credentials, so no credentials were supplied, no platform/IP was requested, and the sample sets remain unavailable. The 2026 rules PDF itself failed 403 (R-EAST::249); the 2026 ten-minute/ten-mark fact is independently supported by R-EAST::257 rather than inferred from earlier rules. Exact 2024 speaking announcement/practice notices failed, so that year remains blocked.

R-EAST::250 / 253 / 254 are 2022 / 2025 / 2026 **trial** listening-broadcast notices. Their 08:55–09:25 slots include five minutes of sound check and do not establish common-exam listening duration. The 2025 and 2026 notices name official WeChat release channels/dates for trial papers/audio (2026 also names a newspaper issue), but no recording, transcript or actual release was opened. Those two audio cells are `link_only` with this exact trial-only scope. The 2023 notice and a separately published archive URL both failed; no alternate protocol was used as a bypass. No 2026 official English analysis was verified in this partial search, and no global absence claim is made.

### National school/edition table leads

R-EAST::236 preserves an exact eight-page English-table excerpt from the parent MOE-hosted 125-page PDF, with parent SHA-256, bytes, page range and extraction provenance in the manifest. The actual table has no award-cycle title/cover or year proof. Inherited labels describing a 2022 award and 2023 publication remain unverified metadata and are not recorded as cohort/year facts.

`school-edition-table-leads.json` retains 18 literal priority-city school-name hints from 43 inspected Jiangsu/Zhejiang/Anhui English rows: school, province, edition, grade/volume and exact chapter excerpt. Chapter cells can be clipped and were not reconstructed. These are leads for school-specific investigation only: no current city adoption, actual lesson, teacher guide, schedule or independently verified physical campus is claimed. 南京外国语学校淮安分校 is excluded from Nanjing hints; a parent-school brand does not establish branch location.

### Concrete limits and next work

Four genuinely new inherited East official candidates failed 403 (R-EAST::232–235). Nantong’s 2026 all-subject scope PDF was already blocked under R-EAST::012 and had no cached inherited file; it was not retried unchanged. The newly discovered Hangzhou city portal failed 503. A temporary helper misnamed the Huaibei root as Hefei; its actual body identified 淮北, it is quarantined, and no Hefei coverage derives from it. Bing’s Hefei query returned Tianjin car-plate results despite HTTP 200 and was rejected as irrelevant.

No further 21cnjy network requests were made. Existing previews remain reference-only under the separately inspected bank rights restrictions. All reuse approvals remain false. The four new PDFs are the national table excerpt, two speaking procedure PDFs and one listening procedure PDF; none is a full original English examination paper or audio file.

Remaining work includes authentic full papers and official answers/audio/transcripts for the 15 cities and five years; complete local section counts/marks; scored speaking tasks and rubrics; writing point bands; current school/city textbook adoption; grade/term/mock gaps; and the missing official English analysis years/cities. Network failures and candidate-only access are recorded per endpoint; most uncovered cells remain honestly `not_searched`. Revisit those cells using new ordinary published links or owner-provided licensed materials, rather than interpreting blocked endpoints as missing resources.
