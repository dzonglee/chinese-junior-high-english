# Writing and passage measurements — R-WRITE

As of 2026-10-15, this collection has 12 sources and seven retained PDF artifacts (51,926,094 bytes). It contains ten measured official Fujian reading bodies, five measured official reference essays, one measured national listening transcript, and an official classroom self/peer-review rubric. Five previously inspected commercial rubric leads are preserved as attributed metadata. It remains **claimed/incomplete**: no annual official city analytic writing rubric has been verified;276 of280 city/year rubric cells are still `not_searched`, and four are limited `link_only` references.

## Measured original texts

The Fujian English question/answer extracts for2022–2026 are byte-for-byte copies of R-SOUTH's official extracts, with parent and extract hashes independently rechecked. R-WRITE independently inspected the cover, every counted reading body and all cited writing prompt/model pages. These are provincial originals with `cities: []`; their education-department host cities do not establish Fuzhou/Xiamen/Quanzhou use. Reusing one collection does not create independent corroborating sources.

`passage-measurements.json` stores counts and page pointers, never passage text. Under the documented orthographic-token convention:

| Year | Selected reading body | Tokens | Other selected body | Tokens |
| --- | --- | ---: | --- | ---: |
|2022|B|238|D|261|
|2023|B|272|D|301|
|2024|A|205|C|291|
|2025|B|263|D|304|
|2026|B|242|D|257|

The sample ranges from205 to304 tokens (median262). All are complete bodies of the identified reading sections, with questions/options and illustration text excluded. The selection deliberately includes different section letters and subjects, so it cannot establish a year-to-year trend or full-paper reading load. Parentheses/glosses are excluded and numeric tokens separated; this is a reproducible research convention, not a claim that exam setters use this exact word-count rule.

All five official writing prompts ask for about80words and carry15marks. They publish reference essays but no analytic band table on the inspected answer pages. The observed formats move across experience/report letters, a self-recommendation letter, an activity-report email and a school appeal. `model-essay-index.json` records the actual question/answer pages and counts:

| Year | Essay-body tokens | Supplied-opening tokens | Body after opening subtraction |
| --- | ---: | ---: | ---: |
|2022|88|4|84|
|2023|111|18|93|
|2024|93|12|81|
|2025|104|16|88|
|2026|95|23|72|

Salutations, complimentary closings and signatures are excluded. A closing call to action remains content. The supplied opening was checked against the question page. These are counts of the published model, not a proposed penalty rule or learner target interval. Reference essays remain in the original PDF research artifacts; their text is absent from measurement output and is not licensed app content.

## Listening length and national assessment evidence

The2022 Ministry English standard's sample1 supplies a full printed recording-material dialogue on PDF69–70 / printed62–63. R-WRITE visually audited and manually transcribed that block, excluding the duplicated introductory example. It has198orthographic tokens and22speaker turns. Two six-letter spelling sequences and three eight-digit telephone sequences demonstrate why this count cannot be called198spoken words. No recording, speech rate, response-time budget or duration was obtained. `listening-measurements.json` preserves those unknowns.

The five Fujian originals supply20listening items/30marks, section counts5/10/5 and printed repetitions2/2/3, as R-LS already documented. They do not supply a full script or audio. Their spoken-length and transcript-token fields stay null; printed question length is not substituted for listening length.

National writing samples in the same2022standard distinguish a30words-or-more explanation from about80word recommendation/cultural-description tasks (PDF73–76). Their analysis emphasizes clear content, complete structure and coherent expression. They are national examples, not city annual mark schemes or evidence of an English2025 revision.

## A verified classroom rubric, with its scope retained

The2022standard's case6 is an explicit grade8, two-lesson Healthy Living read/write design (PDF182 / printed175), with a task of at least60words (PDF184 / printed177). Its self-review table has seven yes/no questions plus a revision field (PDF186 / printed179). The peer-review table has six criteria (PDF187 / printed180): reflection on habit health, clear beginning/ending, separate habit paragraphs, supporting detail, appropriate/varied language, and spelling/grammar/punctuation. Its printed rating labels are5Excellent,4Good,3Acceptable and2Needs Improvement.

`rubric-inventory.json` paraphrases those dimensions as research metadata. No1/0 descriptor or aggregate total is specified; six rows do not license inventing a30-point exam scheme. This is an official **classroom** self/peer-review example, and it fills no city exam-rubric cell. The whole-page extract is retained with original page numbers and parent hash. No copied table or rubric wording is approved for app use.

## Reported local leads and source restrictions

Prior-unit observations supply five commercial-preview rubric leads: Huiyang2025 district mock (15=6content+9language, five language bands); Guiyang2023 grade7 lower-term sample (10marks/five bands); Songxian/Luoyang2023 grade8 lower-term notes (full table unseen); Zhengzhou school grade8 upper-term online paper (20marks, four positive bands plus zero; calendar year unresolved within2022–2023); and a reported Chongqing2026 entrance-paper preview (20marks/five bands). Source IDs, exact URLs and inherited scope are retained. They are not fresh official verification, and no school/mock rubric becomes a city entrance mark scheme. The Zhengzhou upper-term lead does not fill a precise calendar-year cell.

No new21cnjy retrieval or transcript/question processing occurred in R-WRITE. After R-BANK inspected <https://www.21cnjy.com/help/help_REGagreement.shtml>, automated collection stopped under its written-permission restrictions. This unit retains only attributed minimal metadata for those earlier observations; it copies no commercial HTML, question, model essay or rubric wording. No commercial transcript was used for the measured listening sample. All commercial reuse flags remain false. Government hosting likewise does not clear embedded passage/essay/audio rights.

## Method, validation and remaining work

`measurement-protocol.md` defines selection boundaries, visual OCR correction, token normalization, numeric/hyphen treatment and token-stream hashes. `count-reviewed-text.py` counts a reviewed local transcription without printing it. No passage, transcript, token list or model-essay string is stored in the measurement data. Original scan artifacts are separate read-only research references.

New-word rates remain null: no applicable audited vocabulary/learner baseline was available, and surface-type counts are not a substitute. The single-agent transcription audit should be independently repeated before deriving authoring thresholds. The selected originals provide actual measurements; they do not finish56-city calibration.

Normal Liaoning education search queries for 英语评分标准, 英语书面表达 and 英语范文 produced no relevant junior-high numeric rubric: results were empty or unrelated monitoring/higher-education/training documents. Exact query URLs and observed links are in `access-attempts.json`. That limited search is not an absence claim for every city.

The register checker and semantic audit pass: all retained files match hashes/sizes, measured pages are within source extracts, ten reading records span all five years, essay opening subtraction is consistent, the national transcript's turn counts total198, all new-word/audio-duration fields remain null, source scopes are separated, and the280city/year cells are unique. The next owner should obtain actual annual official city marking notes, broaden measured reading types/regions, obtain lawful city scripts/audio, and audit the applicable lexicon before computing new-word rates. Keep the unit claimed until those gaps are researched; source validation alone does not complete it.
