# SWFL legacy six-book lexical evidence audit

Prepared 2026-10-16 for R-VOC integration. No R-VOC identifiers have been allocated. Parent files are immutable-commit public community research copies, not publisher-authorized commercial assets. All sources and derivatives remain reference_only, commercial_reuse_approved=false. City adoption, school structure (六三/五四), annual city/year applicability and current 2024 revision status are not established. Existing R-ED-B parent source records are retained for provenance; their earlier six_three inference must not be promoted as a new verified fact.

## Deliverables and counts

Six books, grades 7–9 upper/lower, Shanghai Foreign Language Education Press (上海外语教育出版社), the legacy foreign-language-schools series revised against the 2011 English curriculum standard. This publisher is distinct from Shanghai Education Press / Oxford. There are 2,410 literal headword rows across 52 units: 512 / 464 / 533 / 321 / 291 / 289 respectively (7u,7l,8u,8l,9u,9l). These counts include repeated entries, phrases and proper names; they are not distinct lemmas. `book-summary.json` breaks down units.

All 132 retained pages were rendered and visually inspected: 41 unit-wordlist pages, 39 alphabetical pages and 52 identity pages, including genuinely blank pages. Every unit headword and grouping was checked; alphabetical indexes were inspected for section identity and actual sequence, not separately double-transcribed. IPA, gloss, POS, variants and individual typography/Δ flags remain null. Uncurated native glyph dumps are clearly separate and must not be treated as verified lexical content.

The 18 PDFs total 9,160,760 bytes. `artifact-manifest.json` contains hashes, sizes and exact 1-based parent-page maps. Each original was selected using PyMuPDF `doc.select`, retaining complete page content and color resources. Stale `StructTreeRoot` accessibility and `Outlines` navigation references were explicitly removed because they kept omitted full-book pages reachable. This changes tagged accessibility/navigation metadata. All 132 derived pages match their original RGB pixels at 0.6x and native text exactly (`fidelity-check.json`); visual review used 1.8x, with copyright footers reviewed additionally at 4x. No altered page appearance was accepted.

## Identity and source interpretation

Each `bibliography.json` records visually verified ISBN, checksum, approval, first edition and printing statements with exact parent pages. Dates are actual observed statements, not inferred from mirror filenames or CIP alone. The postfaces explicitly identify revision from 英语（全国外国语学校系列教材）综合教程 (1–6) against the 2011 standard. ISBNs and first edition dates: 7u 9787544641852 (2015-08), 7l 9787544641876 (2016-01), 8u 9787544644143 (2016-08), 8l 9787544645898 (2016-12), 9u 9787544649698 (2017-08), 9l 9787544650267 (2017-11). All checksums pass; retained back matter does not supply a separate barcode back cover.

The wordlist legend states Δ marks words IN the 2011 standard's 五级词汇表. Individual Δ flags are not transcribed. This differs from the national 2022/2025 level-2 star scheme. Terminal numbers in the separate alphabetical index identify units, not body page references. Printed wordlist page = parent PDF page minus five. Literal sections include Getting Started, Chat Room, Dialogue, Programme and Item; the Item 3 asterisk is preserved without assigning an unverified scope.

## Evidence conflicts and limitations

- Grade 8 lower contents page (parent PDF 3) says Vocabulary Index printed pages 169–180, while the actual index occupies printed 169–174 (PDF 174–179), reaches Y, then the postface begins PDF 180. Preserve this conflict. Whether the TOC is stale or pages are omitted has not been independently resolved; do not claim publisher-original completeness.
- Grade 7 lower unit 9 parent PDF 150 prints `hocky`; grade 8 lower unit 4 parent PDF 170 prints `gallope`. These spellings also appear in the indexes and are intentionally retained as source evidence. Production content would need editorial correction and fresh authoring.
- Native text contains corrupt Chinese/IPA font encodings, ligature spacing and some words split around IPA. Headword corrections are logged in `visual-corrections.json`; the original native lines remain available for audit. No dictionary gloss/IPA has been guessed.
- Chapter context is literal source information. No CEFR, national-list reconciliation, city adoption, licensing clearance, audio or annual resource coverage is implied.
- Public mirror provenance and SHA pinning establish the captured bytes, not publisher endorsement or permission. Full-book completeness was not independently established against an official copy.

## Integration instructions

1. Allocate six R-VOC source records with their existing R-ED-B source links and immutable public parent URLs, copied from `parents.json`. Keep truthful unknown applicability and rights values.
2. Register all 18 PDFs using `artifact-manifest.json`; copy only final PDFs and the JSON/README records (do not copy rendered PNG/JPG contacts, proof text or scratch scripts).
3. Copy each book's `unit-wordlist.json`, `raw-native-lines.json`, bibliography and registration. Use `registration.json` data hashes and `visual-review-ledger.json` for checks. The latter native dump is uncurated evidence, not reviewed glosses.
4. Record these six books as legacy textbook-wordlist evidence in research/coverage. Do not turn them into 2021–2026 city annual vocabulary lists or commercial-ready app material.
5. Reconcile pending Chrisverse Obsidian memory and Kanban through the root agent once native tools are available. No external memory or board updates are claimed in this package.
