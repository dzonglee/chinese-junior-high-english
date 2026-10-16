# Vocabulary appendix comparison: the copy labelled 2025 revision

Read-only output for the R-STD coordinator. No tracked files, branches, network settings or repository documents changed. The coordinator-assigned source `R-STD::013` identifies the revised school-hosted PDF. Its SHA-256 is `a08998470dd3c81bce1d05d3be34d0a5421cd10822c0f8917839bc92d0b1e4c9`; it has 197 pages. Baseline `R-STD::001` has SHA-256 `59ec3971e0dbd6ca487c4e4972cbc80effaf2fd62418d07e5f62c6698fa222fb`.

All 51 revised original pages PDF 90–140 (printed 87–137) were actually viewed. The corresponding baseline pages are PDF 94–144. Every decoded page image differs in resolution and layout, so pixel hashes cannot establish lexical identity. Both revised list prefaces, both baseline list prefaces, every main-list page and every supplement page were inspected.

No headword, display, variant or marker change was found in the 505-entry level-two list or 1,600-entry combined list. The combined list's 505 starred entries match the 505 level-two headwords, leaving 1,095 additional entries. All 2,105 rows aligned by printed page, column and row. OCR triage produced 2,080 normalized exact matches and 25 lexical OCR errors, all resolved from the original images. The 64 OCR star errors and 14 extra OCR lines (10 alphabet headings and four detached stars) were also resolved visually. This was a content comparison, not a carryover based only on counts.

Two genuine supplemental changes were found:

- Printed page 132: `Tomb-sweeping Day` becomes `Tomb-Sweeping Day`.
- Printed page 133: the past participle of `bear` changes from `born / borne` to `borne`.

Two short preface edits retain the numeric limits: level two uses “use-oriented” wording instead of “use as a principle”; level three drops “principle” from its wording about root-focused inclusion. The 505/1,600/1,095 counts, 100–300 locally selectable additions, British spellings with bracketed American variants, and separate-table policy remain. Exact short phrases and page references appear in `appendix-change-report.json`.

`proposed-2025-vocabulary/` contains the level-two, combined and additional datasets. `proposed-2025-supplemental/` contains six datasets totalling 221 rows, with both changes applied. Revised source/hash provenance, the revised PDF offset of +3, and separate baseline provenance are explicit. New bounding boxes are null; baseline coordinates were not relabelled. Whitespace and line-wrap normalization follows the baseline audit.

`image-level-comparison.json` records decoded raster comparisons. `main-list-ocr-reconciliation.json` and `revised-ocr-visual-resolutions.json` retain triage evidence. `review-metadata.json` records all 51 viewed pages, render hashes, dataset hashes and semantic checks. No uncertain readings remain within scope. The coordinator should independently review and register these outputs.

This comparison covers only the vocabulary appendix. It does not establish whole-standard identity, compare the 2011 standard, authenticate a Ministry promulgation, grant commercial permission or authorize app-content reuse.
