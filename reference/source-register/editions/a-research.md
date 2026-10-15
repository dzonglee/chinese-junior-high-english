# Editions A research — catalogue versus actual legacy books

As of 2026-10-15. Owner codex-editions-a. **Claimed/incomplete.**

19 source records and 19 files: one verified official national catalogue, 17 community-hosted legacy textbook reference extracts, and a derived table from an opened official FLTRP publisher catalogue. The 17 books cover five PEP Go for it! volumes, six FLTRP 新标准 volumes and six Renai/Kepu Project English volumes. No actual 2024-revision student book or licensed recording was obtained.

## Identity and authority

- The 2024 national catalogue was opened at printed pp.6–7. It lists PEP刘道义/郑旺全, FLTRP孙有中 and Renai邱耀德 for six-three junior grades7–9, with listening-material/teacher-book notes. It also lists PEP+Shandong王卓 five-four; that row is cross-lane context only. The coordinator assigned actual LuJiao/Shandong and EduScience five-four books to R-ED-B, avoiding duplicate ownership.
- Catalogue approval does not prove a particular ISBN/printing, current2026 stock, a city adoption, a rollout cohort or a book’s unit sequence. The 18 new-revision volume slots in `a-volume-coverage.json` therefore stay catalogue-only with actual books unacquired. They are not filled with legacy PDF content.
- Explicit public GitHub files came from `TapXWorld/ChinaTextbook@5a80345f2043ba6f8db8d7be9cf3db82725ff1f7`. Covers/frontmatter were opened; parent hashes/paths and exact extraction pages are in the manifest. These copies remain community compilations with reported identities. They are not publisher-verified originals. The mirror README’s general “open” intent does not grant rights over the books; no unknown merge executable or linked hidden-asset parser was used.
- PEP grade7 upper visibly carries 审定2012 / copyright2012. PEP grade7 lower preface is September2012, grade8 lower preface May2013; these are not inferred printing/ISBN dates. The available digital/scanned frontmatter does not establish ISBNs for the PEP/FLTRP copies, so those fields remain unknown. FLTRP’s legacy prefaces explicitly discuss the2011 standard and 陈琳/SimonGreenall authorship, distinct from the2024 catalogue’s 孙有中 row.

The six Renai copies have actual CIP/copyright-page identity text (reported from the mirror):

| Volume | ISBN | First edition | Observed printing |
| --- | --- | --- | --- |
| 7年级upper | 978-7-110-08174-7 | 2013年4月第1版 | 2021年6月第75次印刷 |
| 7年级lower | 978-7-110-07941-6 | 2012年12月第1版 | 2021年12月第75次印刷 |
| 9年级upper | 978-7-110-08573-8 | 2014年7月第1版 | 2021年6月第80次印刷 |
| 9年级lower | 978-7-110-08774-9 | 2014年11月第1版 | 2021年12月第77次印刷 |
| 8年级upper | 978-7-110-08253-9 | 2013年4月第1版 | 2021年6月第76次印刷 |
| 8年级lower | 978-7-110-08369-7 | 2013年10月第1版 | 2021年12月第75次印刷 |

A 2021 reprint of a 2012–2014 first edition is kept as legacy content. In particular, the mirrored Renai authors 王德春/JimGreenlaw are not silently replaced by the 2024 catalogue’s 邱耀德. Quanzhou’s separate2026 citywide 科普社（仁爱） adoption evidence remains in R-SOUTH; it does not identify which ISBN/printing or prove nationwide use.

## Contents, grammar, vocabulary and audio

Whole-page extracts retain each book’s frontmatter/contents/sample opening plus selected backmatter. They are partial books, not complete textbook downloads in the corpus. Full mirror parents remain in `/tmp/english-textbook-public-mirror`; manifest parent paths/hashes and selected page lists make the derivations reviewable. Scanned PDF text is not assumed OCR-correct.

`a-sample-unit-map.json` transcribes structural title/topic/grammar summaries for the three inspected legacy grade7-upper families: PEP has nine main units plus separate starter material; FLTRP has ten main modules plus a starter course and revision modules; Renai has four units with three topics each. These maps are explicitly tied to the opened legacy source IDs. They are not full unit-word lists, fully audited mappings for all17volumes, or authorable app lessons.

One important layout detail: FLTRP grade7 upper has its main scope/sequence at parent PDF pp.31–34 after the starter course. These pages are explicitly included; a generic first-pages-only extract would have missed the main module matrix. Renai grade7 upper scope/sequence spans parent pp.9–12 and includes functions, grammar, vocabulary categories, pronunciation and strategies. PEP grade7 upper contents also names a tapescripts section, grammar and unit word lists; their existence in the contents is not downloaded recording evidence.

The opened FLTRP 2025 publisher XLSX lists official digital product routes: 网上新标准, 掌上新标准 and 外研新标准英语点读. Sheet1 rows14341–14346 list junior grade7-upper through grade9-lower point-reading mini-program products at68元/年 in that catalogue. No present2026 offer, freeMP3 access or licence is inferred. Row4555’s ISBN978-7-5213-5659-5 belongs to 七上精讲精练智慧版 workbook; row4556 says 七下即将出版. It is not a student-textbook ISBN. Exact selected rows and the full workbook hash/byte count are retained in a derived JSON file rather than committing a25.5MB workbook of unrelated books/images.

## Attempts, checks and remaining work

`a-source-attempts.json` records normal public entry-page requests. PEP main returned503; its junior-English section returned200 but only a maintenance notice redirecting to the main site. PEP reader endpoints, NSE, Renai, SmartEdu and Unischool returned403. FLTRP home and its directly linked2025XLSX returned200. A public GitHub new-book search yielded no accepted current-edition source. No hidden reader assets, accounts, paywalls or access controls were bypassed. No21cnjy retrieval occurred for this unit.

`a-coverage.json` is intentionally empty because the shared coverage schema is for city/year resources. Actual edition/volume status is represented separately in `a-volume-coverage.json` (17reported legacy extracts,18catalogue-only new-revision slots). No city-year cells or textbook adoption are invented to satisfy the city schema.

Validation uses temporary standard-name copies of the a-prefixed source/manifest/coverage JSON files under `/tmp`, with the existing checker from this checkout. Shared schema/checker/docs are unchanged. Additional checks verify file hashes, unique IDs, volume separation, six ISBN check digits and `commercial_reuse_approved:false` on every source.

Remaining: acquire ordinary public publisher-verified2024/new books and exact frontmatter/ISBN/printing; finish all volume-level unit/topic/grammar/word maps; correct scanned/OCR vocabulary data; establish textbook-specific audio availability and permissions; resolve cohort/grade-term transition schedules and local adoption. Actual PEP+Shandong five-four material is owned by R-ED-B. Keep the unit claimed until these are genuinely addressed. All artifacts are reference-only; book text, illustrations, model passages, word-list presentation and audio are not authorised for app reuse.
