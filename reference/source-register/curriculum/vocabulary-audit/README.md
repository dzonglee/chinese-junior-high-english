# 2022 English curriculum vocabulary appendix audit

The original201-pagePDF was hash-verified against `59ec3971e0dbd6ca487c4e4972cbc80effaf2fd62418d07e5f62c6698fa222fb`. All51appendix pages (PDF94–144; printed87–137) were rendered and visually inspected. The two main lists were compared word by word against original images.

`level2-entries.json` contains505entries. `level3-combined-entries.json` contains1600case-sensitive source-entry headwords:505actual starred repeats match the independently reviewed level2set exactly, leaving1095entries in `additional-level3-entries.json`. No unresolved main-list text or star spans remain. Counts refer to printed entries, not expanded aliases or every inflected word form. Source slash pairs and multiword entries remain single entries. British forms, US parenthetical variants and source case are retained.

Each entry includes PDF/printed page, column, entry row, OCR-line reference, image bounding box, raw OCR, corrected display and uncertainty field. `visual-corrections.json` preserves153raw-to-reviewed changes, including spacing and superscript glyph corrections. `excluded-ocr-lines.json` records headings, detached markers and a wrapped continuation. Bounding boxes follow recognized OCR glyphs and may omit missed characters; page/column/entry row is the stronger recheck locator. Full original renders are `page-094.png` through `page-144.png`.

Supplemental number, month/weekday, geographical-name, abbreviation, festival/culture and irregular-verb tables were visually inspected and kept outside the1600count. Their locations are in `supplemental-table-locations.json`; complete structured transcription and entry-level checks for those tables remain **incomplete**. No supplemental entries are supplied as audited data.

`audit-metadata.json` gives protocol, page-level counts, file hashes, exact scope and limits. `count-reconciliation.json` provides machine-checkable totals. Draft OCR files and helper scripts remain temporary assistance; only the named reviewed JSON files carry the main-list audit conclusion. No tracked repository changes, source IDs or commits were made.

This audits the2022original. The English-specific2025revision remains unresolved; this package makes no current-standard or reuse-permission claim.
