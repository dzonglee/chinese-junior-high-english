# Shandong five-four legacy vocabulary audit

Prepared 2026-10-16 for R-VOC. Seven books, grades6–8 upper/lower and grade9 whole year, 山东教育出版社, coauthored with 人民教育出版社 and 圣智学习出版公司. All seven actual title/copyright pages explicitly identify 五·四学制. City adoption, annual 2022–2026 local examination applicability and current 2024-revision status remain unknown. These are public community research copies pinned to immutable upstream commit 5a80345f2043ba6f8db8d7be9cf3db82725ff1f7, not commercial-use permission. Keep reference_only and commercial_reuse_approved=false.

## Results

2,745 literal unit-wordlist rows /62 units: grade6-upper359, grade6-lower415, grade7-upper382, grade7-lower383, grade8-upper407, grade8-lower366, grade9-whole_year433. These are occurrence rows, including repetitions, names, phrases and book titles, not distinct lemmas. All62 unit-wordlist pages and every extracted headword/unit grouping were visually checked. Chinese gloss, IPA, POS, variants and individual typography remain null.

170 selected evidence pages were rendered and looked at:62 unit pages,57 alphabetical index pages,12 supplementary name/irregular-verb pages,39 identity/publication pages. Full identity pages were viewed through rendered surveys; each copyright footer was additionally viewed at3.5x. Alphabetical/supplemental pages were reviewed for section identity and complete actual sequence, not independently double-transcribed. `visual-review-ledger.json` states the actual reviewed scope.

The source legend says bold marks key vocabulary (重点词汇), not recognition-only or a national level-2 star category. Except grade6-upper's narrower reviewed legend, British pronunciation comes before American where different. Source p.n references are body-page numbers; literal native associations are retained, with ambiguous associations left null. This is not a claim that source page references are correct.

## Strict fidelity and artifact retention

Register ONLY the 11 PDFs named in `artifact-manifest.json` (101,027,272 bytes). Do not copy all PDFs by glob: rejected extraction candidates and proof images remain as temporary scratch evidence.

Five books require full-parent fallback:6lower,7upper,8lower,8upper,9whole-year. A single byte-identical full original is retained for each book, referenced by all three reviewed section maps in `reviewed_sections`. The manifest `parent_pdf_pages_1_based` is the union of the170 reviewed evidence pages across the package; a full-parent artifact contains additional body pages that remain UNAUDITED. For these full-parent files the retained PDF page number equals the parent page number. Do not describe the entire full book as visually reviewed.

Why fallback was necessary: selected-page candidates matched RGB pixels exactly but strict native extraction changed trailing spaces on6lower PDFs124–126 and7upper PDF119. On8lower PDF120,8upper PDF119 and9whole-year PDF141 it changed source soft hyphen U+00AD in `under­` to ASCII `under-`. Exact diffs are retained in each full-parent artifact's `rejected_extraction_failures`. No rejected candidate is an accepted artifact.

Two books (6upper,7lower) retain three compact derivatives each. They use `doc.select` on complete original pages, explicitly removing stale StructTreeRoot accessibility and Outlines navigation references to release omitted full-book pages, then garbage=4/deflate save. Page contents and color resources are preserved. Tagged accessibility/navigation metadata changes are disclosed. All accepted selected evidence pages (including the full-parent fallbacks) match source RGB pixels at0.6x and strict native text exactly. `fidelity-check.json` records every page; parent byte hashes are also checked.

## Identity and limitations

`bibliography.json` records actual ISBNs/checksums, approval years, first and observed editions, printings and precise source pages. All seven ISBN13 checksums pass. Dates are observed copyright-footer statements, not guesses from filename/CIP. The six publication statements actually present describe adaptation from PEP six-three 英语（新目标） grades7–9 against the2011 standard for five-four use. Grade7-lower lacks a reviewed publication statement; its corresponding revision-basis fields remain null.

Native text has corrupt IPA and ligature/missing-letter encodings (e.g. native `Tursday`, `prety`, `beter`, `buter`) despite correct printed pixels. These were restored by visual comparison, not silently treated as source spelling errors. Compound names split over IPA/line breaks were restored, and one omitted IPA-font headword `show ... around` was added. See `visual-corrections.json`; native dumps are separately marked uncurated. OCR helper text is an untrusted temporary aid and is excluded from registration.

Source alphabetical indexes contain entries/page references that differ from unit lists. For example grade8-lower index PDF113 lists `faithfully` p.48 and `fool` p.59, neither appearing in the reviewed unit-wordlist pages; grade8-upper index references for `performance`/`perfect` differ from unit pages. No exhaustive index/unit reconciliation or full-book completeness against an official copy is claimed. Grade8-lower unit8 proper-name references such as San Francisco p.35 and Marcus/Pam p.34 are preserved as printed, without guessing corrected pages. The authoring team must resolve these source conflicts before using them as production provenance.

## Integration

1. Allocate seven R-VOC source IDs, linking the existing R-ED-B source/extract records and immutable parent URLs in `parents.json`. No global identifiers were allocated here.
2. Copy/register the11 unique PDFs from the manifest only. Full-parent artifacts each have three `reviewed_sections` maps; root should adapt registration to one original artifact per affected book. The six successful derivatives have normal parent-page maps.
3. Copy reviewed unit datasets, raw-native-line evidence, bibliographies, registrations, and top-level provenance/fidelity/review/correction metadata. Per-book `registration.json` pins dataset hashes/bytes.
4. Record these as legacy textbook lexical evidence, with unknown local annual applicability; do not fill city/year annual exam-wordset cells from them.
5. Obsidian/Kanban reconciliation remains pending because no Chrisverse tools are exposed to this worker. No external writes were made or claimed. Root maintains the existing project claim, repository board/memory and numbering.
