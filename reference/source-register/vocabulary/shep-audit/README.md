# SHEP Oxford legacy unit vocabulary audit

Six community-mirrored Shanghai Education Press/Oxford legacy books supply **1,367 word/phrase occurrences across 46 literal unit lists**. All 27 complete appendix pages and 12 cover/copyright pages were rendered and visually reviewed. These are source occurrences, including repeated uses and phrases, not 1,367 unique lemmas or prescribed examination words.

| Book | Approval | First edition | Retained printing | ISBN | Occurrences | Units | Parent appendix pages |
| --- | --- | --- | --- | --- | ---: | ---: | --- |
| Grade 7 upper | 2012 | 2012-07 | 2021-07, 15th | 978-7-5444-4195-7 | 217 | 8 | 124–127 |
| Grade 7 lower | 2012 | 2013-01 | 2022-01, 13th | 978-7-5444-4492-7 | 223 | 8 | 128–131 |
| Grade 8 upper | 2013 | 2013-07 | 2021-07, 13th | 978-7-5444-4685-3 | 229 | 8 | 140–144 |
| Grade 8 lower | 2013 | 2014-01 | 2022-01, 16th | 978-7-5444-5143-7 | 255 | 8 | 140–144 |
| Grade 9 upper | 2013 | 2014-07 | 2021-07, 10th | 978-7-5444-5339-4 | 254 | 8 | 140–144 |
| Grade 9 lower | 2013 | 2015-01 | 2022-01, 9th | 978-7-5444-5336-3 | 189 | 6 | 108–111 |

`book-summary.json` indexes the six datasets. Each `unit-wordlists.json` retains literal labels, unit boundaries, source asterisks, lesson-page references, appendix positions, raw native text, and pinned parent provenance. Stars mean this textbook's receptive-only words; they are not the national level-two marker. IPA, Chinese glosses and prose inflection notes remain uncurated. Native-font text is often corrupt and must not be used as verified pronunciation or Chinese text.

The visual review restored the grade-nine upper `(be) happy with` phrase omitted by the initial extractor's handling of full-width parentheses, and removed a gloss parenthesis incorrectly attached to grade-eight upper `(be) full of`. Repeated senses such as `raise` and `post` retain all printed lesson-page references within their original lexical row.

The retained PDFs are the **unchanged complete community parents**, pinned to TapXWorld/ChinaTextbook commit `5a80345f2043ba6f8db8d7be9cf3db82725ff1f7`. Their sizes and SHA-256 values match the earlier R-ED-B parent ledger. A trial subset changed rendered pixels for grade-seven lower; all subset PDFs were discarded and replaced with the original parent bytes. `integrity-and-review.json` records hashes of the reviewed renders and the precise scope. Other body pages were not fully reviewed.

The mirrors were not independently matched to publisher originals. Approval, first edition and retained printing are separate facts; these books do not satisfy current 2024 edition collection or establish any city's adoption. All commercial reuse approvals remain false. Do not ship this reference corpus as application content.

From the repository root, run:

```sh
node scripts/check-register.mjs reference/source-register/vocabulary
node reference/source-register/vocabulary/check-audit.mjs
git lfs fsck
```
