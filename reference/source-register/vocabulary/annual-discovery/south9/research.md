# Nine southern cities: annual local vocabulary discovery, 2022–2026

Actual annual searches were issued for all 45 city-year combinations: 东莞、佛山、惠州、珠海、福州、厦门、泉州、南宁、南昌 × 2022–2026. No downloadable junior-high English wordset was verified as a local annual resource. `coverage.json` records **bounded_not_found**, with each actual annual request and its scope; it does not claim that no such resource exists.

## What was searched

Municipal education-authority homepages were tried first. 珠海、福州、泉州 returned genuine public pages with search forms. The 珠海 search shell repeatedly failed to execute its search script; 福州 returned loading/placeholder results and could not supply a completed result response. Neither shell was treated as zero results. 泉州's public search completed normally, including useful broad controls and ten actual annual vocabulary queries.

For 东莞、佛山、惠州、珠海, the published 广东省人民政府 search form supplied a genuine public, unauthenticated POST request, observed in Chromium and independently replayed without tokens or custom headers. Only keywords and ordinary page numbers were changed. Its default scope is 本站 and its default position is title; segmentation/relaxation returns many unrelated city, sports and recruitment articles. It is not an inventory of every municipal education archive. Annual and broad-vocabulary queries were paginated where the reported total exceeded 20, subject to the recorded transient failures. Mid-search totals and duplicate collapse varied; raw reported totals and actual row counts are retained separately. 中考/考试说明 controls are bounded to their first page.

For 福州、厦门, the published 福建省人民政府 search form supplied the observed public POST. The default province-portal index was kept unchanged. Actual annual queries included both “城市 年份 中考 英语 词汇” and “城市 年份 英语 词汇表”. Annual response totals fit the first 20-result request; broad vocabulary and exam-description queries were followed through their reported pagination. Returned titles/excerpts mostly concerned tourism, adult learning, higher education and general policy. Province-wide indexing is not complete city education coverage.

泉州市教育局 searches “2022年英语词汇” through “2026年英语词汇”, and the corresponding “年份年中考词汇”, each returned zero. Broad searches covered 词汇、英语词汇、词汇表、考试说明, with reported pagination attempted. 词汇 page 4 returned a 403 connection rejection, so this broad result set is explicitly incomplete. The other completed pages are preserved; no absence finding is inferred from that failed page.

南宁、南昌 municipal/provincial controls could not supply usable pages in this worker. Ordinary public search forms were therefore discovered from search-engine homepages. The actual 南宁2022 Bing query echoed the query but returned unrelated Microsoft account results; it is excluded as unusable relevance. The actual Baidu query redirected to 百度安全验证 and was stopped. Sogou's 南宁2022 query returned genuine visible results, but its 南宁2023 request reached antispider protection and the route was stopped. Independent 360 public GET forms returned all ten actual city-year searches, plus ten education-authority-site-filtered annual queries and two broad site-filtered controls. These are first-page searches only. Site-filtered controls returned real authority titles, but annual searches sometimes relaxed vocabulary terms and showed recruitment/admissions results. Ads, query aggregation modules, generic wordlists and province-only labels do not establish city-year applicability. After the parent reported a later 360 challenge, no further 360 requests were made.

## Verified leads and exclusions

泉州市教育局's **关于市政协十三届五次会议第20263078号提案的答复**, 泉教函〔2026〕216号, was opened in full. Its document date is 2026-07-08; the displayed publication time is 2026-07-26 19:50. Section four names《泉州市小初英语衔接教学指南》《小初英语过渡学习包》《小初英语专项衔接清单》and mentions **500 core words for the primary stage**. The reply supplies no word table, linked vocabulary file or instructional figure; the 附件下载 label has no attachment. Three exact-title follow-up searches each returned only this same reply. This is a useful owner follow-up lead, not an acquired annual junior-high exam vocabulary list.

The bureau's republication **教育部办公厅关于做好2022年中考命题工作的通知**, 教基厅函〔2022〕6号, was also opened in full. It instructs cancellation of exam syllabi/exam explanations. It contains no vocabulary list. This national policy is not evidence that any city-year lacks other public vocabulary resources.

A 360 result names **2023年广西南宁初中外研版单词表(中英互译)-学科网**, with ordinary HTML `data-mdurl` pointing to `https://www.zxxk.com/soft/38583973.html`. The public metadata GET returned HTTP200 and 8,233 bytes, but its title and visible body were empty: two hidden inputs and an 8,008-character script containing cookie/location operations. No metadata, date, textbook identity, file or local annual applicability was verified. The script was not executed and no protected delivery route was sought. Search snippets included recommendation contamination; their date is not accepted as source publication metadata. No file was acquired.

All other generic/provider results remain discovery observations. A third-party title, “广西/江西” label or a city in a search query does not prove city adoption or annual exam authority. 21cnjy hits were observed only through independent search pages; no requests were made to that site.

## Verification and rights

Every actual request preserves its URL, exact ordinary request data where relevant, retrieval time, result/status and SHA-256 when a body was received. `query-ledger.json` joins request metadata and reported totals; `result-review.json` retains returned titles, URLs, excerpts and exclusions. `sources.json` lists all response/browser captures. `pagination-accounting.json` preserves every recorded bound, failed page and retry. Public request bodies were observed from published forms; no hidden route, credential, custom authentication header or token was used.

Returned titles were reviewed. Relevant excerpts led to the separately documented full-page openings in `article-review.json`; other original result pages were not implicitly opened. No vocabulary PDF/DOC/DOCX was acquired, so there are no word-entry extractions or textbook/lexical figures to audit. The two opened authority articles have no instructional figures; their remaining images are site interface logos and QR graphics. Browser screenshots are retained as discovery evidence, not claimed as reviewed vocabulary figures.

All records are **reference_only**, and every `commercial_reuse_approved` flag is **false**. Public reachability does not grant commercial reuse. The third-party lead's underlying rights remain unknown. No material was copied into app content or marked released.

## Gaps and owner questions

- Can the owner obtain a lawfully shareable copy and provenance for the named 泉州小学500核心词/小初衔接清单, and confirm its intended stage/year? It must remain distinct from an annual中考词表.
- Is the 南宁2023 third-party 外研版 wordlist accessible through an already licensed owner account or a lawful author/publisher copy? Contents, dates and city applicability remain unknown; no access barrier should be bypassed.
- Municipal archives/search implementations remain incomplete for eight cities; direct municipal archive coverage would strengthen the province/public-index bounds. This package does not infer exam scope or textbook adoption from provincial papers, the provincial capital, or policy alone.
- Native Chrisverse tools are absent in this worker. The existing owner Kanban and Obsidian memory still require reconciliation by the parent or the next connected session. No external write was claimed and no competing board was created.

## Integration

The parent owns R-VOC, all register IDs, branch changes, checks and publication. This package allocates no IDs and changes no tracked file. Treat all45coverage cells as bounded discovery gaps. Import actual annual evidence and the three article reviews into the existing vocabulary audit/register without promoting policy or unverified search leads to acquired wordsets. Preserve source spellings and all unknown values.
