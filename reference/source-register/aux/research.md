# Auxiliary-resource research · 2026-10-15

This is a partial Stage 1 research handoff. It contains 22 source records, 17 checked reference artifacts, 80 exact publisher catalogue product entries, 272 observed PEP audio links, three acquired MP3 samples and one historical teaching-progress document. It does not satisfy the unit's completion gate. All commercial reuse flags remain false.

## Teacher books and supplements

`R-AUX::001` is the actual FLTRP 2025 ordering workbook, opened with openpyxl (15,025 rows). The retained JSON has 103 exact selected Sheet1 rows and its original 25,515,658-byte workbook's SHA256. `product-index.json` contains 22 teacher-development books, 17 junior supplement/wallchart entries, 12 Bookworms reader sets, seven individual reader titles, 21 digital product entries and one six-member reading-teaching guide set. These are 80 catalogue entries, not 80 acquired books or licences. One grade-seven lower-term workbook is explicitly forthcoming in the 2025 catalogue, with no ISBN.

The teacher-development metadata includes listening, speaking, reading, writing, grammar, vocabulary, assessment, discourse analysis and classroom research titles. These are distinct from edition-specific 教师用书. The six English graded-reading teaching-guide members share set ISBN 9787521323634; the actual publisher product page independently confirms this set identifier and its school-teacher audience. Do not count that repeated identifier as six independent editions. Catalogue revision suffixes and raw author/title cells remain available in the selected-row artifact.

The official 2024 national teaching-book catalogue, reused from the actual R-ED-A acquisition and reopened here, says the listed junior editions have companion teacher books. This is approval/availability evidence, not the actual guide, its frontmatter, chapter list or 2026 stock. No edition-specific teacher guide, workbook content, unit-test collection or junior total-review book was acquired. FLTRP catalogue titles under 新标准 and wallcharts naming 陈琳/Simon Greenall do not establish a match to a current 2024 printing. No city adoption follows from a catalogue title.

## Teaching progress

`R-AUX::022` is the six-page 成教科院〔2024〕20号 notice dated 2024-07-12. Its stamped cover and printed page 2 were visually checked. The English rows say grades seven and eight complete the 新目标 upper books; grade nine completes 第11单元. This is the 2024–2025 upper term only. No weekly dates, junior total-review start, lower-term progress or textbook ISBN are supplied.

The original school-hosted URL returned CONNECT403. The actual PDF was then acquired by resolving the existing public GitHub LFS pointer in the sister research repository, not by bypassing the original host. Its 249,884 bytes and SHA256 match the inherited school-copy metadata. The record therefore retains community-archive provenance and `file_reported`, not fresh original-site verification. Its internal PDF metadata has a stale 成教科（2000）14号 title; the visible stamped 2024 cover/body are preserved, with the conflict explicit. Further authority authentication remains open.

The 280 city-year coverage rows concern teaching schedules only. The Chengdu 2024 row uses the notice's publication/start year and explicitly retains the 2024–2025 school-year range; it does not represent a complete calendar year or an exam cohort. The other 279 cells are `not_searched`. A generic publisher search is not a city-authority search. `teaching-schedule-index.json` keeps the actual three grade endpoints without inventing calendar dates.

## Public audio and practice products

The ordinary PEP digital companion landing page linked junior volumes 7upper, 7lower, 8upper, 8lower and 9upper. The first four pages opened and contain respectively 83, 68, 65 and 56 public audio controls with explicit download links: 272 observed links in total. `pep-audio-link-index.json` preserves each page's actual unit title, track label and URL. Their first units include Starter Unit 1 Hello!, Animal Friends, Happy Holiday and Time to Relax. No ISBN or printing year appears; neither legacy nor 2024 identity is assigned from a URL/CSS filename.

Three first-track MP3s were actually acquired: 7upper 133.172245 seconds, 8upper 117.760000 seconds and 8lower 114.596813 seconds. Each is MP3, 44.1 kHz, stereo, and fully decodes with ffmpeg exit 0. Hashes and sizes are in the manifest and probes. This validates media format and structural integrity. The speech was not manually transcribed or audited against book text. The 7lower first-track request returned 503; the 9upper page returned 503. Remaining 269 links were not individually retrieved. No transcript block exists in the four inspected volume pages.

These are textbook companions, not city 听说 specifications, scoring engines or exam recordings. The FLTRP catalogue additionally lists six web products, six WeChat mini-program products, six app products and three Bookworms starter courses. Historical prices and delivery media are retained only as 2025 catalogue facts; no accounts, entitlement, live products or marking accuracy were tested. A publisher report on the October 2023 Beijing review seminars names teaching demonstrations and event technical support, not a city-mandated platform or current exam policy.

The four candidate provider roots (ets100, ekwing, up366, chivox) were inaccessible in R-LS's actual requests. Those inherited CONNECT403 records are explicitly labelled as inherited attempts, not repeated or freshly verified in AUX. Operator identity, features, samples and licences remain unverified. No further automated 21cnjy request was made after its first-party agreement restrictions were discovered.

## Reading titles and levels

The Bookworms index retains 12 starter–level-three sets and seven level-one/two titles with the publisher's actual level labels and ISBNs. Publisher grade advice is starter → upper primary/grade seven, level one → grades seven/eight, level two → grades eight/nine and level three → grades nine/ten. The grade-ten crossover is retained. These recommendations are not measured exam reading levels, CEFR/Lexile values or independently checked headword bands. The series' 250-word entry claim and advertised box-code audio/answers/assessment are publisher claims, not acquired assets or licences.

An actual Aladdin product page independently confirms level one and ISBN 9787521351811. The 小书虫 launch page explicitly describes 14 levels/108 volumes for primary and junior secondary, without per-title level-to-grade boundaries. The 阳光英语 middle-school page gives levels 9–20 and grades 7–12, with companion teacher books advertised; it does not map individual levels to grades or list individual titles. Do not treat the whole secondary range as junior only. No reader text was acquired or copied into the index. 典范英语 remains an unresolved publisher/source lead, not an absent series.

## Access, rights and next work

Exact successful and failed source requests are recorded in `access-attempts.json`; ordinary publisher search result metadata are in `publisher-searches.json`. The search shell was distinguished from the actual public result endpoint used by its JavaScript. Narrow zero-result queries are not evidence that resources do not exist. The 教学进度/教学计划 searches returned mainly unrelated higher-education/foreign-language material, which was excluded rather than used to fill city coverage.

Public play/download links do not grant commercial redistribution rights. PEP's footer links were passed to R-RIGHTS. That unit found its disclosed copyright article returned 503 and its opened contact article provided business/sales routes, not a verified audio licence. No broader audio collection, outreach, login, access-control bypass or account creation occurred. Full book/reader/audio ingestion requires an owner-approved rights route.

Next work: actual edition-specific teacher guides and current supplement frontmatter; the remaining 279 city-year schedule searches and weekly/unit/review dates; accessible first-party practice product samples/terms; individual 小书虫/阳光/典范 title-level metadata; measured reader difficulty only where permitted; and verified audio/reader licensing. These remain open rather than being promoted from catalogue advertisements.

## Validation

`node scripts/check-register.mjs reference/source-register/aux` passes. Additional checks verify unique IDs, complete 56×5 schedule keys, existing source references, all committed artifact sizes/hashes, all product ISBN check digits, no empty product titles, exact audio-link counts, three complete media decodes and false reuse flags. Passing structural checks does not make this research complete.
