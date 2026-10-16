# Curriculum research handoff

The 2022 baseline and the copy labelled 2025 revision are acquired, opened and separately mapped. The original Ministry-hosted baseline has 201 image pages; the school-hosted revised copy has 197. All revised pages, figures and tables were visually inspected. Both main vocabulary lists were reconciled entry by entry, and supplemental tables and teaching cases are registered as versioned research data. This completes the curriculum unit's collection and research checks, with the source gaps below explicit. It does not complete Stage 1 or establish local examination applicability.

## Verified baseline and promulgation

R-STD::001 is the original English PDF: 31,502,213 bytes, SHA-256 `59ec3971e0dbd6ca487c4e4972cbc80effaf2fd62418d07e5f62c6698fa222fb`. R-STD::004 is an independently opened government republication of the Ministry promulgation notice. It distinguishes the signed date (25 March 2022), webpage publication (21 April 2022), and implementation from the autumn 2022 term. Its literal English attachment was opened and is byte-for-byte identical to the retained Ministry original; the manifest preserves this alternate provenance without counting another unique standard.

R-STD::005 is the official government-republished revision Q&A. It describes the 2019–2022 process and earlier 2011 standards, but does not supply the full 2011 English text. The failed original-host promulgation event remains separately recorded in R-STD::003.

The publisher interview R-STD::002 confirms a general October 2025 revision programme. Its visible publication date is 25 March 2026, corrected from the URL-derived date. It does not itself identify changed English content.

## Reviewed baseline data

- `section-index.json` maps the main printed pages to PDF pages with offset +7.
- `curriculum-map.json`, `language-content-map.json`, and `grade-language-skills.json` map levels, school structures, text/language requirements, pronunciation and grade-specific skill targets. Curriculum quantities are not city exam timings or passage-length rules.
- `grammar-appendix.json`, `themes-level3.json`, and `academic-quality.json` contain 58 grammar entries, 29 level-three subthemes and 17 academic-quality indicators, respectively.
- `vocabulary-audit-registration.json` and `vocabulary-audit/` preserve the word-by-word visual audit: 505 level-two source entries and 1,600 combined entries, with exactly 505 matching actual starred repeats and 1,095 additional entries. British spelling, bracketed American variants, source case, raw OCR and page/column/row provenance remain available. Counts refer to printed source entries, not expanded aliases or inflected tokens.
- `supplemental-vocabulary/` completes 221 separately counted factual records: 30 numeral rows, 19 months/weekdays, 27 geography rows, seven abbreviations, 32 cultural terms and 106 irregular verbs. Blank cells and explicit modal dashes are distinguished; no missing forms are inferred. This registered followup supersedes the earlier audit's supplemental-incomplete scope statement.
- `competencies-culture-strategies/` contains 55 English research paraphrases: 15 stage descriptions/rows, 13 level-three cultural-knowledge items and 27 learning strategies. Primary and junior-high stage distinctions and teacher-support wording are retained.
- `assessment-guidance.json` and `assessment-sample-index.json` locate assessment guidance and all six national examples. Printed scripts are not acquired audio recordings.
- `teaching-case-index.json` and `teaching-case-maps.json` cover all eight cases. All 52 original pages, figures and tables were visually inspected. Source tasks, progression, assessment and numerical limits are mapped without copying model passages into app content. The Healthy Living classroom prompt requires at least 60 words; its seven self-checks and six peer criteria are classroom examples, not local analytic marking bands.

The complete `ocr-draft-pages.json` remains explicitly unreviewed machine transcription. The separately registered reviewed datasets carry the visual-audit conclusions; review of selected data does not relabel every OCR line as checked.

## Revised edition and comparison

`revision-2025/registration.json` indexes the current-copy datasets and their byte/SHA checks. The revised source remains an official school mirror: no byte-identical Ministry-hosted revised PDF or exact Ministry issue/effective date was acquired.

- `revision-2025/vocabulary/` contains 505 level-two, 1,600 combined and 1,095 additional entries. The actual 505 starred entries match the level-two set. All 2,105 printed rows were reconciled against revised images; 25 lexical OCR errors and 64 star errors were resolved visually. New bounding boxes are unknown, rather than copied from the baseline.
- The 221 revised supplemental records have two genuine changes: `Tomb-Sweeping Day` capitalization and the printed past participle of `bear`, now `borne` instead of `born / borne`. This records the table; it does not declare `born` invalid English. Two preface wording edits retain the numerical limits.
- Separate current-copy maps cover 29 themes, 58 grammar items, 17 numbered quality indicators, grade skills, pronunciation, and the 55 competency/culture/strategy summaries. The cultural item about young people's lives now explicitly includes children and adolescents. The quality introduction now permits independent or joint task completion; joint work is not automatically independent mastery evidence.
- The overview, teaching/evaluation prose and several teaching-case explanations change. Cases 1–2 have new thematic-meaning columns and explicit family-album/family-helper-poster projects; these are distinguished from the unchanged three/six numbered objectives. All eight cases have versioned research maps and assessment caveats. The Healthy Living example retains its 60-word classroom minimum and seven self/six peer criteria, without an invented total score.
- `body-review/` retains 143 completed page-review records, 14 confirmed/grouped difference records and dataset guards. The other 51 numbered pages are the vocabulary appendix; cover and contents account for the remaining three. This is a complete visual research comparison with targeted field checks, not an exhaustive verbatim redline. Different image sizes and equal item counts are never treated as proof of textual identity.
- The revised national reading sample on printed page 66 corrects a phrase to `don't worry`. Any exact passage-length measurement must be repeated for this edition; a baseline measurement cannot silently become a revised measurement.

## Discovery and source gaps

The normal government search route is validated by positive controls (six curriculum-standard results; 3,362 education results). Eleven bounded searches and their actual browser DOM snapshots are retained. This narrow index's empty results do not prove universal absence. Hunan advanced controls also return empty, so those negatives are explicitly unreliable. Baidu presented a CAPTCHA and the search stopped.

The newly reachable Qingpu candidate ending `0320047.pdf` is mathematics, as its cover and contents confirm. It is excluded from the English corpus; no mathematics requirement has been transferred. A different, actually published English article and literal English attachment were subsequently found through ordinary public navigation. The retained revised PDF has 197 image pages, 82,942,124 bytes and SHA-256 `a08998470dd3c81bce1d05d3be34d0a5421cd10822c0f8917839bc92d0b1e4c9`. Its cover explicitly identifies English, 2022 edition and 2025 revision. The school article was published on 18 March 2026; that is not a Ministry issue or effective date. Revised printed pages map to PDF pages with offset +3. All structured 2022 datasets retain their edition labels while the revised comparison is completed.

The official 2011 English full text remains unacquired after bounded discovery; no detailed comparison is invented. The actual published Ministry search form loaded, but its two submitted 2011/2025 queries returned403 (R-STD::014–015). This is access failure, not universal absence. The remaining source questions are the 2011 comparison text and exact Ministry provenance/effective dates for the revised copy. City/cohort applicability and local word-list equivalence belong to the regional and vocabulary units. No integration dependency or final owner gate is waived.

## Checks and rights

`node scripts/check-register.mjs reference/source-register/curriculum` validates source and file records. Dataset registrations additionally retain byte/SHA checks, source references, item counts and reviewed scope. Temporary renders can be regenerated from the retained original; worker helper/cache paths are provenance, not checkout dependencies. There is no city-year grid for this national unit. All commercial reuse approvals remain false; no app ingestion, contacts, accounts or agreements are authorized by this corpus.
