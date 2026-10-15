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

The grid contains 750 base cells and 900 grade/term cells: 15 cities × 5 years, plus grades 7–9 × upper/lower terms × term/mock types. Current states: 1,552 `not_searched`, 83 `link_only`, 15 `blocked`. No cell is padded to `not_found`, `file_verified` or ingestion-ready. Some sourced mocks have no established term and therefore cannot fill the grade/term grid.

## Access limits and remaining work

- Most exact official city/policy/catalogue endpoints returned 403, 502 or 503. The log distinguishes proxy CONNECT failures, origin errors and timeouts. These failures do not establish that a resource is absent. Each city/year still needs its own official English announcement search.
- Public numeric `zy.21cnjy.com` previews and ordinary sitemap pages were accessible. The site’s ordinary keyword search returned 503 or gzip-compressed JavaScript-only challenges; these were not bypassed. The first image explicitly shown in the Ningbo 2024 preview returned 403, so there is no visual authentication claim.
- Bing returned 200 but unrelated calendar/tourism results even with the correct query visible; no facts or coverage derive from those results. Baidu returned a proxy 403. GitHub searches found practice apps rather than authenticated east-city past papers; their unsourced exam claims were not used.
- No full original paper PDF/DOCX, actual audio, authenticated official answer key, official city writing rubric or adoption document was acquired. City-level listening/speaking specifications, 2027 reform searches, grade-6 Shanghai samples and most city/year paper searches remain open.
- Next: find each priority city’s official 2022–2026 English policies and complete originals; acquire paper/audio/transcript assets only through ordinary public or licensed routes; authenticate identities and marking origin; resolve the listed calendar/jurisdiction conflicts; finish grade/term/mocks and adoption evidence.

Bank/rights handoff leads: `https://www.jyeoo.com/english/` is a genuine junior-high English catalogue and links `/open` for enterprise interfaces. Its footer says member-uploaded resources retain original-author copyright; this is no licence. `/english/report` returned 503. `www.zxxk.com` returned a JavaScript challenge without verified visible content. These are leads for R-BANK/R-RIGHTS, not completed work in those units.

## Validation

`node scripts/check-register.mjs reference/source-register/east` passes. Additional semantic checks in `qa.json` confirm coverage/source scope agreement, no precise dates from ambiguous spans, no midterm/common-exam confusion, unique coverage keys, exact artifact/manifest equality and actual SHA-256 checks. All 143 retained files are public HTML previews/context; no binary needed LFS in this pass. Passing these checks does not complete R-EAST or Gate 1.
