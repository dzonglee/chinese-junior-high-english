# WRITE-TOKEN-1

These are measurements of specified text regions in official scanned documents. They are not CEFR assignments, calibrated difficulty scores, new-word rates or audio measurements. Passage/essay/transcript text and token lists are absent from the measurement JSON. Whole-page reference PDFs remain separately under `reference/files/writing/`.

## Inputs and review

1. Reuse the exact official all-subject parent or English extract acquired by R-SOUTH, and the Ministry standard acquired by R-STD. Recalculate complete parent/extract SHA-256 and bytes. The manifest retains original URL, parent hash and original page numbers; reuse is not independent source corroboration.
2. These PDFs have no usable text layer. For Fujian, render at170dpi with PyMuPDF and draft English text using Tesseract5, `-l eng --psm 3`, with one OpenMP thread per worker. The national recording-material dialogue was manually transcribed directly from two page images.
3. Visually compare every selected complete passage/essay/transcript with the source images. Correct OCR substitutions, missing spaces, watermark characters, fragmented numbers and image-caption contamination. Do not correct the paper's wording for plausibility. One agent performed this review; there was no second independent transcription.
4. Select the body regions specified in each measurement. All listed original PDF pages are 1-based; Fujian printed page = original PDF page minus1, and national standard printed page = original PDF page minus7. This relation is confirmed on the cited pages, not generalized to other documents. Keep passages spanning pages continuous; remove intervening page numbers/headers.
5. Reviewed text stays in temporary working files, not the register. A SHA-256 of the normalized token sequence records the counted input without publishing the text. Reproduction requires making/reviewing a transcription from the retained page images again.

## Boundaries

Reading: include all prose/bullet prose in the identified reading body. Exclude the A–D section label, instructions, questions and answer options, illustration lettering/captions, footers and all parenthetical explanations. This excludes Chinese glosses, phonetics, chemical notation and parenthetical English abbreviations; ordinary abbreviations outside parentheses remain. The 2024A illustration's title is excluded. The two labels in the 2026D diagram are excluded. These are body counts, not total learner reading load.

Essays: count the reference-essay body, excluding the salutation, complimentary closing and signature. “Best wishes” is a complimentary closing; a final request/call to action remains body content. The primary count includes the supplied opening; a second field subtracts its token count. The supplied-opening wording was checked against the actual question page, not reconstructed from the answer. These counts do not assert a marking penalty or pass/fail threshold for “about80words”.

Listening: count only the complete recording-material dialogue in national sample1, excluding speaker labels, the duplicated introductory example, the information form, follow-up questions and analysis. Count all22 speaker turns. It is a national illustrative script, not a city paper. Fujian question frames yield item/repetition counts only; no spoken length is inferred from question text.

## Normalization and tokenizer

Use Unicode NFKC, normalize curly right apostrophe to ASCII apostrophe, join ordinary line wrapping with whitespace, and normalize a dash between digits in a numeric range to `-`. Preserve genuine internal hyphens in compounds and spelled-letter sequences; em/en dashes elsewhere separate tokens. Rejoin visibly continuous numbers fragmented by scan tracking/OCR (e.g. a decimal), following the image.

The Python token regex is:

```python
r"[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*(?:[,.][0-9]+)*"
```

Contractions, hyphenated compounds, letter-spelling sequences, telephone sequences and numeric ranges count as one orthographic token each. Comma-grouped/decimal numbers count as one; punctuation/currency/percent signs count as none. The data separately records purely numeric tokens and alphabetic-or-mixed tokens. Case-folded surface types retain inflections, names and numbers as distinct surface forms; they are not lemma counts or vocabulary difficulty.

The token-stream hash is SHA-256 of UTF-8 encoding of case-preserved tokens joined by one ASCII space, after apostrophe normalization. `count-reviewed-text.py` applies the counter to a prepared local input and outputs only measurements/hashes. It does not OCR or establish that an input was correctly selected/reviewed.

## Limits

The national transcript contains two six-letter spelled-name sequences and three eight-digit telephone sequences. Each is one orthographic token under this protocol; its acoustic realization contains several letters/digits. No recording was obtained, so spoken-word count, speech rate and duration are null. Do not divide198tokens by an invented speech rate.

New-word rate is null throughout. R-VOC has no audited applicable word-list baseline, the English2025 revision remains unresolved, and an individual learner's known vocabulary differs by cohort/edition. No dictionary/package/CEFR proxy is substituted for that missing evidence. Ten purposively selected reading bodies from one provincial collection do not establish city norms, full-paper totals or a year-on-year difficulty trend.
