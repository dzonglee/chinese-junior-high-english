# Reviewed curriculum supplemental tables

Read-only delegate output for the R-STD coordinator. No tracked files, source identifiers, branches or shared documents were changed. Existing source `R-STD::001` is cited; no identifier was minted.

All original pages PDF135–144 (printed128–137) were actually viewed. The lower table only on PDF135 is included; its main-list Y/Z entries are excluded because the1600-entry main audit already covers them. These datasets are reference-only factual lexical records from the2022 official standard. They are not app content, not commercial permission, and not evidence of the2025 revision.

| Dataset | Records |
| --- | ---: |
| numeral-table.json |30 |
| calendar-terms.json |19 (12months,7weekdays) |
| geography-table.json |27 |
| abbreviations.json |7 |
| cultural-terms.json |32 (13festivals,8landmarks,11other terms) |
| irregular-verbs.json |106 |
| **Total** | **221** |

Every entry has original PDF/printed page, group and row. Rows count independently within each table/group on each page. Calendar and cultural columns are independent lists, not semantic row pairs. The source's UK/USA abbreviations remain in geography labels. The Silk Road stays in the source's other-cultural-terms column. Empty printed geography cells and thousand/million ordinal cells remain null. Five modal participles preserve an explicit printed dash separately from their normalized null. No forms or demonyms were inferred. Variants, British spelling and case remain as printed. Line-wrap/spacing normalization and the UNESCO soft line-break hyphen removal are documented in audit-metadata.json.

`audit-metadata.json` contains original/source hashes, page-image and OCR hashes, per-page record totals, dataset byte counts/hashes and validation results. All ten page renders were actually inspected; an additional high-resolution PDF142 crop confirmed the printed pronunciation contrast for read. There are no unresolved lexical readings within this scoped table transcription. The coordinator should independently review and register the outputs on R-STD, and may change their destination/names. The existing original PDF remains the authority.

Run `python /tmp/english-curriculum-supplements/validate-and-document.py` to rerun semantic/count/hash checks; build.py regenerates the transcription files. Neither command edits the repository.
