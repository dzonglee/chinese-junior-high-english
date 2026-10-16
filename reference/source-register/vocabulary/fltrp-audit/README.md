# FLTRP legacy textbook vocabulary research handoff

Prepared 2026-10-16, delegated read-only under root-owned R-VOC. No repository files, claims, source IDs, branches or credentials changed. No network download was needed: these are the complete original public-mirror books already cached by R-ED-A, not copies of the tracked reference extracts.

## Scope and provenance

All six 外研英语（新标准） legacy junior-high volumes, grades 7–9 upper/lower, are represented. Their inspected frontmatter is the 2011-standard legacy family; these are not the 2024 revision. Each original community-mirror source URL, pinned repository commit, original retrieval date, exact path, SHA256 and size is in `parents.json` and `artifact-manifest.json`. Original R-ED-A records are preserved without elevating community authority to official publisher verification. The mirror commit is `5a80345f2043ba6f8db8d7be9cf3db82725ff1f7`; R-ED-A source-branch snapshot is `7174f0d1a160eb2b561ea34a549909b1f1bd3807`.

| Book | Complete module wordlist parent PDF pages | Entry occurrences | Separate proper-name pages | Separate alphabetical pages |
|---|---|---:|---|---|
| 7 upper | 120–129 | 628 | 130 | 131–140 |
| 7 lower | 111–117 | 441 | 118–119 | 120–126 |
| 8 upper | 144–149 | 320 | 150–151 | 152–157 |
| 8 lower | 119–123 | 266 | 124–125 | 126–131 |
| 9 upper | 149–155 | 381 | 156–158 | 159–165 |
| 9 lower | 115–118 | 128 | 119 | 120–123 |

There are **2,164 module/revision entry occurrences**, not 2,164 distinct lemmas. Repeated senses/occurrences in different explicitly labelled modules remain separate. Standalone proper names and alphabetical indexes remain separate source sections with `module: null`; they are not added to these counts or assigned to the final module. The proper-name/alphabetical sections total 51 additional pages.

## Curated fields and review

Each book folder contains `unit-wordlist.json` and a compact `headword-audit.txt`. Curated research fields are English headword/phrase, literal module heading, parent PDF page, printed wordlist page, printed lesson-page pointer, source review star and source bold/white typography. No inferred lesson-to-module mapping is used. Grade-7 upper's Starter Modules 1–4 are distinct from regular Modules 1–10. Both grade-7 books contain literal **Revision module A/B** vocabulary; these are separate from adjacent numbered modules.

All **39 complete Words and expressions pages** were rendered and actually viewed in the retained two-page review sheets. The native headword sequences were reviewed against rendered pages; spacing/IPA-separator/optional phrase and wrapped-inflection defects were corrected in curated fields. In particular, `here is/are...` and `keep sb./sth. away` are phrases whose slash is not an IPA delimiter; `burnt` and `woken` on wrapped inflection lines are not extra headwords. `of course`, `over there`, `enjoy oneself`, `last word`, `make sense` and `suffer from...` had missing native spacing corrected. Grade-8 upper `side` has a manually read printed lesson pointer `(64)`. `curation-corrections.json` records source-prefix versus curated-field changes.

Grade-7 upper PDF page 122 is image-only (no native text). Its 45 headword/phrase occurrences, explicit Starter Module 3/4 membership, printed pointers, stars and font weights were manually read from the rendered page. Native raw text/spans are therefore null for those entries. IPA and Chinese gloss are deliberately null for **every** entry: the custom IPA font encoding and some Chinese glyphs are unreliable in native extraction. Raw native entry text/spans and italic word-class fragments are retained separately as unverified source evidence, never as an app-ready lexical transcription. There is no claim of a complete curated IPA/gloss lexicon.

Source legend is recorded per volume. Bold means 要求掌握, white means 只要求理解; the source star means textbook 复习强化 (grade-7 lower says 复习强化词汇). The grade-9 lower legend has no review-star clause and that list has zero stars. These stars are not the national curriculum's additional-word marker. Raw source legend/typography is not a national or local examination list.

The 51 standalone index pages were also rendered and actually viewed in scope-review sheets to confirm section boundaries and kind. Their individual headword/gloss transcription has **not** been curated; `standalone-indexes.json` retains raw native text and exact page scope. Image-only alphabetical pages are preserved whole in the PDF even where native text is empty.

## Identity evidence and rights

For **each volume independently**, parent PDF page 1 is the cover, page 2 is the title page, and page 3 is credits/contact information. All 18 pages were rendered and viewed. Both grade-7 volumes show 教育部审定2012; both grade-8 and both grade-9 volumes show 教育部审定2013. These are approval stamps, **not copyright/printing years**. No ISBN, first edition year, copyright year or printing year is inferred from these pages; those fields are null. Exact parent local paths and identity page IDs are in `book-summary.json` and every unit JSON. Root can retain pages 1–3 as identity extracts.

All material remains reference-only, with commercial use/reproduction permission unconfirmed and `commercial_use_allowed: false`. A public mirror or a repository license does not grant reuse rights in the underlying textbook. No city adoption, exam year, cohort alignment, local syllabus coverage or official authenticity is inferred. This fills concrete legacy textbook vocabulary research; local examination wordlist gaps remain those in the separately handed-off local-discovery package.

## Retained artifacts and checks

- `artifact-manifest.json`: 18 complete whole-page PDF derivatives (module wordlist, proper names, alphabetic index per volume), original parent hashes/paths/URLs, every derivative SHA256/size, exact parent/derived page mapping and opening checks.
- `book-summary.json`: per-book counts, literal module counts, star/bold counts and identity evidence.
- `parents.json`: six original parent records and existing R-ED-A provenance.
- `<book>/unit-wordlist.json`: curated lexical research fields plus separately labelled raw evidence and 39 completed per-page review records overall.
- `<book>/standalone-indexes.json`: raw standalone sections, never assigned a module or double counted.
- `review-sheets/`: all wordlist pages, all identity pages and all standalone section scope views; underlying full page images are also retained for wordlists and identity pages.

Each of the 90 derived PDF pages was opened and its decoded render compared with its original parent at scale 0.45: **90/90 were pixel-identical**, and **90/90 native page texts were identical**. Page extraction preserves the original document catalog/color profile/optional-content state so watermarks and colors survive. Initial `insert_pdf` trial extracts had minor rendering differences from dropped document settings; those trial derivatives were replaced, and the final manifest hashes refer only to the verified files. No page content was rewritten or bypassed. The extraction process emitted existing cross-reference warnings on an unused original object range; all retained pages nevertheless opened and matched. This does not establish publisher authenticity or validate every original full-book page.

Do not rerun `parse.py` alone over finalized derivatives: it is an initial preparation script. `curate.py` regenerates native candidates; `finalize.py` applies the reviewed curation adjustments. Final data and manifests, not unfinished candidate labels or earlier parse summaries, are the handoff.
