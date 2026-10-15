# South English research — first verified acquisition pass

As of 2026-10-15. Owner: codex-south; unit R-SOUTH. This unit is **in progress**, not Stage1 complete. It has23 source records,5 actual files and1,560 coverage cells. The coverage grid includes13 cities ×5 years ×12 general resource types plus both term and mock papers for each of grades7–9 and upper/lower terms. Most cells are deliberately `not_searched`; creating a grid is not gathering a resource.

## Verified resources and provenance

- **Fujian2022 and2024:** freshly downloaded original provincial examination collections from Fuzhou/Quanzhou education websites, opened official covers and all English page images, and preserved complete English questions/reference answers with cover in two whole-page PDF extracts. The2022 parent has63 pages,131,318,147 bytes, SHA256 `02c9382a903fde30879a664c124f097dc8b8279e48fd36685a4bc94c5a63d67e`; retained parent PDF pages1,18–29 (printed17–28). The2024 parent has81 pages,142,386,168 bytes, SHA256 `73ecead0e2070db5306362b0dbb129350e936bb05c8912bd5f2749f7bb56f846`; retained parent PDF pages1,24–39 (printed23–38). Mixed-subject boundary pages remain unaltered. Both covers name 福建省教育考试院. Parent files remain local under `/tmp/south-downloads` rather than adding274MB of unrelated subjects to the corpus. Manifests include parent URLs, sizes, checksums and exact extraction ranges.
- In each paper the eight sections sum to150 marks: listening30, language choice15, cloze15, reading45, situational responses10, picture sentences10, short-text gap filling10, writing15. Listening has20 items. Writing prompt requests about80 words. English answers contain a reference model essay; they do **not** contain an examiner writing rubric, full listening transcript or audio. No duration is asserted from these sources. Provincial scope is verified; individual city usage remains to be evidenced.
- **Hainan2026:** fresh official policy HTML and original schedule image opened. Policy section一（一） establishes province-wide setting/administration/marking of non-PE subjects, including English with listening; section一（三）2 gives English120 marks. The schedule explicitly shows26June2026,10:20–11:50 (90minutes), listening10:20–10:40. No listening mark allocation, detailed item blueprint or speaking format inferred.
- **Hunan2023 standing policy:** fresh official HTML opened. Foreign language is a closed-book written examination of100minutes and raw100marks including20 listening marks. Admissions conversions can differ from raw marks. Section三 says province-wide setting starts2024 **but Changsha sets separately under provincial requirements**. The policy is valid for five years from publication; later amendments and each annual city paper still need checking. Its language is 外语; English-specific annual implementation remains to be obtained.

## City findings and next searches

| City | What this pass actually establishes | Outstanding |
| --- | --- | --- |
| Guangzhou | Exact2026 examination advice and2024–26 implementation-policy URLs returned403;2027–29 reform lead also403 | Annual2022–26 English marks, timing, written/listening-speaking separation and2027 cohort change; every paper/key/audio/transcript/adoption/term/mock |
| Shenzhen | Exact2024 reform-policy lead returned403; public21世纪教育网 preview claims宝安区2025–2026八上期中英语 (R-SOUTH::023), student/teacher DOCX listings with answers/explanations, unverified against official original |2022–26 English blueprints and cohorts, separate setting, speaking specs and papers, textbooks and term/mock resources |
| Dongguan | Official2026 timetable and government bulletin denied403 | English schedule, provincial-paper applicability, listening/speaking weight and adoption, papers/keys/audio, term/mocks |
| Foshan | Exact2026 implementation PDF returned502 | English structure and province/city scope, all paper components, adoption/term/mocks |
| Huizhou | No city/year-specific English source searched yet | Entire2022–26 scope; do not infer from Dongguan or provincial maths facts |
| Zhuhai | No city/year-specific English source searched yet | Entire2022–26 scope; do not infer from neighbouring Guangdong cities |
| Fuzhou | Official provincial2022/2024 English documents obtained; city applicability still needs evidence | Confirm provincial-paper usage by year,2023/25/26 originals, audio/transcripts, local speaking/syllabus/adoption/term/mocks |
| Xiamen | Provincial2022/2024 documents available as scoped references; city applicability still needs evidence | Same resources plus city implementation; no capital-to-province inference |
| Quanzhou | Provincial2022/2024 documents available;2026 textbook DOCX blocked403/502 | Open actual English adoption rows; maths publisher facts do not transfer; confirm provincial-paper use and remaining years/resources |
| Nanning | No city/year-specific English source searched yet | Entire2022–26 scope; no Guangxi marks or common-paper claims from maths |
| Haikou |2026 province-wide policy and timetable verify120marks/90minutes with20-minute listening window | Actual2026 paper/key/audio/transcript, section marks, all2022–25 materials, speaking/adoption/term/mocks |
| Nanchang | Exact examination-authority homepage probe denied403; no annual English evidence | Entire2022–26 English scope; mathematics PDFs are not English resources |
| Changsha | Official standing foreign-language policy100marks/100minutes,20listening marks and separate Changsha setting | Annual English implementation/amendments, original papers/keys/audio/transcripts, textbooks and term/mock grids |

## Attempts and limits

`source-attempts.json` records18 exact official URLs (plus two public commercial preview/download-landing requests) and their observed results: five successes (the two provincial collections, two policy pages and one timetable image);13 failures including403,502 and503. A preliminary probe also opened the first bytes of Fujian2022 and the Hainan image; the subsequent complete downloads were separately verified. Failed URLs are recorded as leads with `verification: failed`; they yield no inherited English facts. The2026 Quanzhou DOCX returned403 on the preliminary exact probe and502 on the complete request. A Git LFS request for three sister-repository cached policy files stalled for several minutes and was stopped; its pointer files were removed and never counted as downloaded resources.

The sister repository `dzonglee/chinese-junior-high-maths` at `c84b232d63f2d120fcadec3e5244ce28185c98fb` supplied discovery URLs, not English examination facts. Fresh direct official acquisitions above have their own checks. Fujian2023/2025/2026 collection URLs failed502/503; this does not prove the resources are absent. `source-attempts.json` identifies each exact URL. Homepage/proxy403 is not treated as a finding that every page of a host is blocked.

Current managed network policy includes package-manager hosts but lacks most research domains. Some exact official resources nevertheless return200, so continue checking exact lawful sources and diagnose actual responses. Root coordinates supported environment-policy updates. Never bypass proxy controls, logins, paywalls, captchas or copy protection.

## Rights, verification and handoff

All sources have `commercial_reuse_approved: false`. Policy documents are labelled public policy; English question/reference-answer extracts remain reference-only. Nothing grants app reuse of questions, passages, model essays or audio. No content is copied into the app. No speaking absence is inferred from missing sources.

The schema checker passes. It validates shapes and downloaded-file sizes/checksums, not research completeness. The unit cannot move to `done`:1,514 cells are not searched,23 are blocked,22 are scoped links, and only the2026 Haikou exam-structure cell is verified. Of780 grade/term/mock cells,779 remain unsearched; one Shenzhen grade8 upper-term midterm has a public preview link. Next owner should prioritise current city implementation documents proving Fujian provincial-paper applicability, remaining provincial collection URLs, and Guangdong listening/speaking specifications; then acquire actual per-grade term/mock samples and retain rights labels.

## Public term-paper sample

R-SOUTH::023 is a public commercial preview opened directly on2026-10-15. Its claimed2025–2026 grade8 upper-term midterm maps to2025 in coverage; its platform publication date is2026-09-02. It names Baoan District, Shenzhen, rather than establishing a citywide test. Only metadata and access observations are registered; question text and platform explanations are not copied to the corpus. Full DOCX access and licensing are not established by the visible preview.

The Shenzhen full-download landing request returnedHTTP200 with an obfuscated JavaScript cookie challenge, not the document or licensing terms. The challenge was not solved or bypassed. Full-file access conditions, price and licence therefore remain unknown.
