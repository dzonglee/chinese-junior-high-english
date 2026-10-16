# Curriculum research handoff

The Ministry-hosted 2022 English standard is acquired and verified. Its original 201 image pages remain authoritative. The baseline main vocabulary lists, supplemental tables and all eight teaching cases have now been visually reviewed and registered as research data. A school-published English-specific 2025 revision page has been found; full-document retrieval and comparison are in progress. No current-standard equivalence or city examination applicability is inferred.

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

## Discovery and remaining work

The normal government search route is validated by positive controls (six curriculum-standard results; 3,362 education results). Eleven bounded searches and their actual browser DOM snapshots are retained. This narrow index's empty results do not prove universal absence. Hunan advanced controls also return empty, so those negatives are explicitly unreliable. Baidu presented a CAPTCHA and the search stopped.

The newly reachable Qingpu candidate ending `0320047.pdf` is mathematics, as its cover and contents confirm. It is excluded from the English corpus; no mathematics requirement has been transferred. A different, actually published English article and literal English attachment were subsequently found through ordinary public navigation; verification is ongoing.

The official 2011 English full text remains unacquired after bounded discovery; no detailed comparison is invented. The unit's final status awaits the actual revised-English document and appendix comparison. No R-VOC or integration dependency is waived.

## Checks and rights

`node scripts/check-register.mjs reference/source-register/curriculum` validates source and file records. Dataset registrations additionally retain byte/SHA checks, source references, item counts and reviewed scope. Temporary renders can be regenerated from the retained original; worker helper/cache paths are provenance, not checkout dependencies. There is no city-year grid for this national unit. All commercial reuse approvals remain false; no app ingestion, contacts, accounts or agreements are authorized by this corpus.
