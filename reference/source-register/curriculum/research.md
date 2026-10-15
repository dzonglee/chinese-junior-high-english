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

`ocr-draft-pages.json` contains 94 machine-transcribed pages, including all appendix pages
80–142, curriculum content12–33, academic quality42–46, levels and contents. Each page retains
its source location and **machine_transcription_unreviewed** state. It is an extraction aid,
not a corrected word list. The original PDF remains authoritative. The Tesseract version,
Chinese model source and checksum are recorded. Ordinary PDF text extraction yields no
substantive text because this official copy is image-only.

The source's level3 list says **1600 words including505 level2 words**, with1095 additional
junior-high basic words; local additions of100–300 words are permitted. Level2 and level3
instructions use British spellings with common American variants in brackets. Do not mistake
the national list for a particular textbook's unit order or a city's examination list. The
level2 and level3 word forms still require a word-by-word transcription audit.

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
2. Audit the505/1600 word-list transcription against every original page; keep bracketed
   variants, level2 star markers and the separate numbers/names/irregular-verb tables.
3. Review the remaining curriculum body and teaching/evaluation cases in the acquired PDF.
4. Re-run `node scripts/check-register.mjs reference/source-register/curriculum` and the
   manifest hash check after any additions. R-VOC and final integration retain their board
   dependencies; this partial handoff does not waive them.

No city-year grid is assigned to this national curriculum unit, so its `coverage.json` is an
empty array. That is distinct from claiming that city research or curriculum review is done.
No commercial reuse permission, licence negotiation or application ingestion is approved.
