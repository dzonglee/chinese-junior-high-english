# R-STD research handoff — 2026-10-15

The original **2022 English standard is acquired and verified**. The English-specific
2025 revised standard remains unresolved. This handoff does not declare the current-edition
research complete or establish that the 2022 document is unchanged in 2025.

## Acquired evidence

- `R-STD::001`: Ministry-hosted English standard, 201 unencrypted image pages,
  31,502,213 bytes. The cover, contents, levels, structure guidance, vocabulary instructions,
  all five grammar-appendix pages, level3 themes, academic-quality table and final page were
  visually opened. The manifest records the actual SHA-256. The PDF is reference-only.
- `R-STD::002`: publisher-hosted interview, opened and read. Its question records an
  October2025 revision programme. It supplies general policy context, **not** a verified
  revised English word list, a redline or an English promulgation attachment.
- `R-STD::003`: the promulgation notice is a failed retrieval, not verified page content.
  Its exact PDF attachment succeeded even though the notice and homepage failed.

## Research data

`section-index.json` maps the printed main-body pages to PDF pages (offset +7).
`curriculum-map.json` records levels, the six content elements, vocabulary instructions
and the limits on inference. `grammar-appendix.json` manually describes 58 grammar entries,
including the exact plus-marked understanding-only restrictions. `themes-level3.json`
paraphrases all29 level3 subthemes. `academic-quality.json` paraphrases all17 level3
quality indicators. These are research mappings, not app-ready lessons or city exam rules.

`ocr-draft-pages.json` contains all201 machine-transcribed PDFpages, including the body,
appendices and teaching cases. Each page retains
its source location and **machine_transcription_unreviewed** state. It is an extraction aid,
not a corrected word list. The original PDF remains authoritative. The Tesseract version,
Chinese model source and checksum are recorded. Ordinary PDF text extraction yields no
substantive text because this official copy is image-only.

The source's level3 list says **1600 words including505 level2 words**, with1095 additional
junior-high basic words; local additions of100–300 words are permitted. Level2 and level3
instructions use British spellings with common American variants in brackets. Do not mistake
the national list for a particular textbook's unit order or a city's examination list. The level2 and level3 main source-entry lists have now completed a word-by-word visual audit; see the followup below. Supplemental structured tables remain incomplete.

The 2022 contents have no separately titled function/notional appendix. Investigate relevant
language-knowledge and theme requirements in the body rather than invent an extra appendix.
The 五四 structure explicitly redistributes 六三 content; preserve the learner's structure.

## Access and discovery limits

`access-attempts.json` records exact successful and failed endpoints. The Ministry homepage
and notice returned403; its English attachment returned200. The school revised-standard
directory and inherited maths revision page failed proxy CONNECT403. Public GitHub discovery
found a primary-stage companion app and an empty curriculum repository, neither an original
revised English standard. Search-engine responses that returned unrelated results or only
a shell were rejected as evidence. A200 response alone is insufficient.

The sister maths metadata was inspected at commit
`c84b232d63f2d120fcadec3e5244ce28185c98fb` for discovery only. Its56city set matches this
project's roster. Some historical stream labels differ; the current English unit assignments
remain those explicitly listed in the English plan. No mathematics standard, content table
or examination requirement has been transferred as an English fact.

## Next work and gate

1. Retrieve the English-specific2025 revision through an accessible official promulgation or
   school/publisher link, then compare the actual text; general revision announcements do not
   establish English changes.
2. Complete structured transcription of the separately indexed supplemental tables. The505/1600main-entry audit is complete; preserve its source spelling, brackets, markers and count convention.
3. Finish auditing the remaining curriculum body, vocabulary and teaching cases against the acquired PDF.
4. Re-run `node scripts/check-register.mjs reference/source-register/curriculum` and the
   manifest hash check after any additions. R-VOC and final integration retain their board
   dependencies; this partial handoff does not waive them.

No city-year grid is assigned to this national curriculum unit, so its `coverage.json` is an
empty array. That is distinct from claiming that city research or curriculum review is done.
No commercial reuse permission, licence negotiation or application ingestion is approved.

## Followup assessment review

Printed pages52–74 (PDF59–81) were visually reviewed. `assessment-guidance.json` paraphrases nine groups of assessment, blueprint and resource-design recommendations; `assessment-sample-index.json` locates all six national samples, including their available printed recording scripts and writing-length instructions. These samples provide curriculum evidence, not local marking bands or city speaking-test specifications. R-WRITE received the exact PDF/page pointers for separate measurement work.

Fresh ordinary publisher-site searches returned a static search shell without a retrieved English revision attachment. Search-engine results were inspected and again rejected where unrelated. The exact school PDF and GitHub REST searches failed CONNECT403. The PEP homepage exposed a genuine companion-audio link, forwarded to R-AUX; this did not resolve the revised standard. No unsigned alternative or protected service was used to bypass access controls.

The followup extraction now covers all201PDFpages as unreviewed OCR, with the authoritative parent unchanged. `teaching-case-index.json` locates all eight cases; their headings were visually checked. The national grade8 HealthyLiving case contains7self-review checks and6peer-review criteria with an explicit5/4/3/2scale (printed179–180). Those pages were independently inspected by R-WRITE. No city exam total or1/0scale is invented. Complete OCR alone does not establish a word audit or revised standard. The later main-list audit is documented below; the revised standard and supplemental structured tables remain unresolved.

## Language-content and grade-skill review
Original PDFpages25–30,34–38and92–93were visually reviewed. `language-content-map.json` maps text types, five language-knowledge areas (including communicative pragmatics) and the complete pronunciation-appendix groups. It keeps level3+extensions separate and records that phonetic notation is designated for grades7–9. `grade-language-skills.json` groups the grade7/8/9skills and preserves source table/page references and numbered-item counts.
The cumulative extracurricular reading targets are40,000/100,000/150,000words at grades7/8/9; each has at least30minutes weekly extracurricular audiovisual activity. These are curriculum targets, not exam passage lengths, daily quotas, annual increments or speaking-test times. Level3body vocabulary is about1,600words with optional100–300additions; level3+about1,800with optional200is separately scoped. This review does not resolve the revised English standard, complete book mappings or the pending headword audit.

## Baseline main vocabulary audit
`vocabulary-audit-registration.json` records the completed read-only word-by-word visual audit and coordinator checks. All51original appendix pages were visually inspected. The audited data preserve505level2entries and1600combined source entries, with exactly505actualstarred repeats matching level2and1095additional entries. No duplicate source headwords or unresolved main-word/star spans remain.153visual corrections and58excluded OCR lines preserve the audit trail; all data include page/column/row provenance and raw OCR. The original full-page OCR remains explicitly unreviewed; the separate reviewed data carry the audit conclusion.
Counts refer to printed source entries, not expanded aliases, slash pairs, plural forms or case-folded tokens. British forms and US bracket variants stay distinct. Supplemental number/name/month/weekday/abbreviation/culture/irregular-verb tables are only location-indexed and visually inspected; structured transcription and entry-level verification remain incomplete. No current-standard, city-exam, commercial-licence or completed R-STD/R-VOC claim follows from this2022baseline audit.
