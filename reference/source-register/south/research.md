# South English research — verified originals and public preview samples

As of 2026-10-15. Owner: codex-south; unit R-SOUTH. **In progress; Stage 1 is not complete.**

This unit has 81 source records and 13 actual corpus files. Its 1,560 coverage cells cover 13 cities × 2022–2026 × 12 general resource types, plus both term and mock papers for grades 7–9 and upper/lower terms. Current states: `not_searched` 1,459, `link_only` 95, `blocked` 4, `file_verified` 2. Creating a grid or collecting a candidate title does not complete research.

## Official resources actually acquired

**Fujian 2022–2026:** all five original provincial examination/reference-answer collections were freshly downloaded through official education websites. Official covers, all extracted English pages and the endings of the answer/model-essay sections were visually inspected. Five PDF extracts preserve the original whole pages and cover; mathematical/physics material at shared page boundaries is deliberately retained. These are verified provincial originals. Individual Fuzhou/Xiamen/Quanzhou paper applicability still needs a separate authoritative city/year implementation source; city coverage therefore remains `link_only` with that caveat, rather than a city-paper verification claim.

| Year | Official parent SHA-256 | Retained parent PDF pages (1-based) | English printed pages |
| --- | --- | --- | --- |
| 2022 | `02c9382a903fde30879a664c124f097dc8b8279e48fd36685a4bc94c5a63d67e` | 1, 18–29 | 17–28 |
| 2023 | `e63cec3823d51b03b244f0456bcf3277815c58887c491c54da3de7c42a43a616` | 1, 23–38 | 22–37 |
| 2024 | `73ecead0e2070db5306362b0dbb129350e936bb05c8912bd5f2749f7bb56f846` | 1, 24–39 | 23–38 |
| 2025 | `d058fd4db0d94266bca4420b4749c2aa2e2c783d8e41a179d55989abdf0fee06` | 1, 25–38 | 24–37 |
| 2026 | `fcc048ddaf9917ffc946746e2faeaf28ac41b38c744bfc2d9ec7b08dd5202f3b` | 1, 23–37 | 22–36 |

In each year the eight English sections total 150 marks: listening 30, language choice 15, cloze 15, reading 45, situational responses 10, picture sentences 10, short-text gap filling 10 and writing 15. Listening has 20 items × 1.5 marks. Writing prompts request about 80 words; official reference answers include a model essay. No recording, full listening transcript or detailed examiner writing rubric appears in the extracted English sections. No duration is inferred from the collections. `exam-structures.json` retains these as provincial facts with empty city applicability.

Parent PDFs stay under `/tmp/south-downloads` rather than adding hundreds of MB of unrelated subjects. Every extract manifest records the original URL, complete parent byte count/SHA-256, exact page list, derivation and its own checksum. The 2023 transfer initially ended with an incomplete read; a normal streaming retry recovered all 157,064,519 bytes with the expected original checksum. The full answer/model-essay ending shares a physics page: parent PDF page 38 is included, so the final extract is complete.

**Hainan 2026:** official policy HTML and the complete schedule image verify that English includes listening, has 120 marks and runs on 26 June 2026, 10:20–11:50 (90 minutes), with listening 10:20–10:40. Policy section 一（一） establishes province-wide common setting/administration/marking for non-PE subjects, supporting Haikou applicability. Section/item counts, listening marks and speaking format remain unknown.

**Hunan standing policy, published 12 July 2023:** the official page states foreign language is a closed-book written examination of 100 minutes and raw 100 marks, including 20 listening marks. Admissions conversions can differ from raw marks. From 2024 the province sets common written papers, **but Changsha sets separately under provincial requirements**. The policy has a five-year validity clause; annual English implementation and later amendments still need checking. Its label is 外语, so it is not silently rewritten as a complete annual English blueprint.

**Quanzhou adoption, 2026:** opened the official notice dated 1 July 2026 and its combined attachment 1–6 DOCX. Attachment 1, section 二《泉州市初中选用的教材版本》, second table: the English row is **科普社（仁爱）**, usage area **全市统一**. This is citywide junior-high textbook-use evidence as of that notice. Primary and senior-high English rows use other publishers and are not transferred. Exact volume/ISBN, approval year, entry cohort and grade/term rollout are not stated; no 2022–2025 adoption is inferred. See `edition-adoption.json`.

## Public school/district and mock samples

There are 50 accepted commercial preview records (including a separate scoped writing-rubric index). Each actual numeric preview was opened before acceptance, and only the main resource body before “相关资源” was used for facts. Public previews remain `indexed_preview_only` / `preview_link_only`; neither indexed titles nor platform attribution establish official provenance or full-file completeness. No gated DOCX/PDF/audio download was attempted.

Concrete findings worth reusing:

- Haikou 2023 grade 7 second-term A/提高 and B/基础 papers have different maxima: A 120 versus B 100, both 90 minutes with 20 listening marks. Both main previews contain actual labelled listening material. They are kept as separate assessments. The B title advertises audio, but its visible resource list contains only DOCX files; audio remains unverified. A advertises a WAV file. Grade 8 second-term preview also exposes a listening transcript, with question/answer PDFs listed.
- Huiyang 2025 practice test（二） exposes listening material and a detailed writing rubric: 15 marks split into 6 content and 9 language, with five language bands. The resource list advertises MP3 and PDFs. The rubric is a commercial preview of this district mock, never an official city 中考 rubric or a reusable licence.
- Foshan Huijing 2026 grade 8 second-term midterm main heading says listening/speaking uses E听说 software. This is reported school-practice evidence, not an official city mandate or a scored speaking specification.
- Shenzhen Hongyang 2026 mock lists transcript PDF, MP3, answers PDF and question PDF. Its generic body calls it a practice paper and gives 100 marks/25 listening marks. Neither the school attribution nor those marks become a city exam blueprint.
- Nanchang 2023–2024 grade 9 lower-term resource is a publisher-style 江西南昌版 practice paper, with visible transcript and advertised MP3. It is classified as a mock, not an actual school/district term examination.
- Upper-term 2025–2026 Baoan sample retains both calendar bounds and fills no precise calendar-year cell. The two Shenzhen Haiwan 2023–2024 upper-term samples explicitly carry body tags `2023九上·宝安期中` and `2023七上·宝安期中`, supporting their reported 2023 grid positions. Upload dates are not treated as examination dates.
- Fuzhou Pingdong 2023 grade 7 preview has an inconsistent OCR listening heading: 20 × 1.5 items but a 7.5 subtotal. The inconsistency is recorded and not resolved into a school/city listening total. Huiyang/Changsha previews that explicitly omit listening are not counted as obtained transcripts.

## Per-city handoff

| City | Accepted preview references / reported assessment years | Verified local fact or main gap |
| --- | --- | --- |
| 东莞 | 2 / 2025, 2026 | 2026 official timetable/bulletin URLs denied 403; joint-school mock and school midterm previews are reported only. |
| 佛山 | 5 / 2022, 2023, 2025, 2026 | 2026 official implementation PDF returned 502; school E听说 mention is reported only. |
| 广州 | 5 / 2022, 2023, 2025, 2026 | 2026 official policy/advice URLs returned 403; school/district samples do not establish city speaking or reform rules. |
| 惠州 | 4 / 2023, 2025 | Huiyang mock rubric/transcript and school tests are reported; official city structure/speaking/adoption remain unknown. |
| 深圳 | 9 / 2022, 2023, 2024, 2025, 2026 | 2026 final-exam title/answers reported by platform; official reform source 403. Local mocks and term tests remain separate. |
| 珠海 | 1 / 2026 | 2026 Phoenix school-group midterm preview opened; annual official city exam resources remain unsearched. |
| 南宁 | 6 / 2023, 2024, 2025, 2026 | Actual school/county and mock previews opened; official exam-authority/education portals denied 403. Annual official blueprints remain unknown. |
| 南昌 | 1 / 2024 | Publisher mock/transcript sample only. Examination-authority portals denied 403; no official local annual exam structure established. |
| 海口 | 3 / 2023 | Verified 2026 province-wide 120-mark/90-minute policy; 2023 school-term transcripts reported, not official 中考 listening originals. |
| 长沙 | 6 / 2022, 2023, 2025, 2026 | Standing policy explicitly preserves separate Changsha setting; annual original English papers and admissions conversions remain unchecked. |
| 厦门 | 2 / 2025, 2026 | All five provincial originals obtained as scoped references; local term sample does not establish annual provincial-paper usage. |
| 泉州 | 3 / 2025, 2026 | Verified 2026 citywide junior-high Renai/Kepu adoption; five provincial originals obtained; historical city applicability still needs evidence. |
| 福州 | 3 / 2023, 2025, 2026 | All five provincial English originals obtained; prove city/year applicability and obtain actual audio/transcripts/specs. |

## Search evidence, unresolved work and rights

`source-attempts.json` preserves successes, failures and the 2023 transfer diagnosis. Initial failures are not erased when a later normal public link succeeds. Exact official attachment URLs can work even when the host root or another path fails; a root/proxy 403 never establishes that all resources on that host are absent.

The sister maths register at `dzonglee/chinese-junior-high-maths@c84b232d63f2d120fcadec3e5244ce28185c98fb` supplied discovery leads and independent expected hashes, not English facts. Current English originals above were directly opened. A stalled request for cached sister LFS files was stopped; its pointer placeholders were removed and never counted as corpus files.

A coordinated public English sitemap sample covered windows 2001–2040, 8990–9029, 14490–14529, 23990–24029 and 31990–32029, plus historical anchor pages. One shared cache and global 0.6-second request-start limiter avoided duplicate broad crawling. Robots returned 404; 500 responses were not retried unchanged. `discovery-index.json` retains 149 candidate titles as an explicit backlog, including unreviewed/out-of-scope possibilities. They do not increase accepted-source counts or fill coverage cells. `preview-index.json` is the accepted scoped evidence index. The sitemap was sampled, not exhaustively searched.

The Shenzhen full-download landing returned HTTP 200 with a JavaScript cookie challenge, not a document or licence. It was not solved or bypassed. Ordinary Bing search returned HTTP 200 with a matching query title but only an irrelevant medical result and an AI-generated-content footer; that response was rejected as discovery evidence.

All 81 source records have `commercial_reuse_approved: false`. Policy/adoption documents are labelled public policy; questions, answer keys, model essays and commercial previews are reference-only. No passages, questions, essays, transcripts, audio or rubric wording are authorised for app shipment. No paywalls, logins, captchas, cookie challenges or network controls were bypassed.

Remaining work is material: most city/year structure, speaking-spec, exam-syllabus, prescribed vocabulary, writing-rubric, audio/transcript and grade/term cells are still not searched. Official final papers outside the verified Fujian provincial set, annual city applicability, textbook cohorts and original listening recordings are not complete. Public mock/term transcripts never fill official city 中考 transcript cells. The schema and semantic checks passing do not establish unit completion; leave the board `claimed` with these gaps until the remaining searches and acquisitions are actually done.
