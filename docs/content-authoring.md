# Original content and review

The current collection is a working original capability course. It is not a complete national
vocabulary list, a licensed past-paper bank or a verified textbook-by-unit course. Research
remains in `reference/` and is not bundled as learner material.

## Sources and compiler

- `grammar.json`: original contextual cases with a correct expression, distractors and a
  sentence-specific rationale. The compiler creates mixed choice, blank, correction and ordering
  tasks. Guided and delayed items have separate IDs.
  Every free-response case supplies a sixth array element `{ instruction, accepted }`: a precise
  Chinese task constraint and the complete nonempty list of accepted English forms. State the
  requested word/tense/meaning or usable word bank in the prompt; do not reject a grammatical
  alternative to an unconstrained blank. The compiler rejects absent metadata, duplicate forms
  and a missing primary answer. Run `npm run test:grammar` after changing grammar cases.
- `vocabulary.tsv`: original word selection, Chinese meaning, example, translation and usage note.
  Individual words are not claimed as an official examination wordset. Edition spelling is adapted
  without changing IDs or discarding legitimate authored variants.
- `reading.json`, `cloze.json`, `reading-tasks.json`: original passages, evidence, answers and
  individual distractor reasons. A different passage is used for delayed review.
- `expression.json`: original writing, free speaking and read-aloud tasks with explicit self-review
  rubrics. Reference answers are examples, not mandatory wording.
- `listening.json`: twelve original scripts and their tasks. `audio-policy.json` deliberately has
  no selected model until the owner chooses one. Do not replace this with browser voices or a
  different service silently.

Run `npm run content:review` to generate the standalone searchable review artifact at `dist/review/index.html`. It shows answers, explanations, diagrams and rubrics, and can export reviewer notes without treating them as a publication approval.

Run `npm run content:audit` after authoring and `npm run build` to regenerate metadata and packs.
The shared validator checks answer identities, unique options/tokens, grade references, rights,
reasoned steps, distractor explanations, useful diagrams and rubric marks. Structural validation
cannot establish native language quality or editorial approval.

Every question needs a strategy, at least two reasoned steps, a specific pitfall, a transfer
prompt and a visual that explains the actual decision. Every incorrect choice needs its own
reason. All current authored questions remain `draft` until release review; tests do not approve
content. Private user questions use the same question validator and remain on device.

## Audio

Once the owner chooses OpenAI audio, record the actual source, model, voice and approval reference
in `audio-policy.json`; configure `AUDIO_API_KEY` securely for `api.openai.com`, then run
`npm run audio:prepare`. It uses Node's environment-proxy support, keeps TLS verification and
never logs credentials or error bodies. FFmpeg converts the resulting originals to compact mono
MP3 files under `content/audio/`. Optional word/example clips can be generated with `npm run audio:prepare -- --vocabulary`; their pronunciation controls appear after recall, so they do not reveal an answer before the independent check. Successful clips are checkpointed so interruption does not
force duplicate paid requests. A build checks script equality and every file's checksum.

For existing licensed recordings, preserve the actual rights record and owner authorization,
place the matching files in `content/audio/` and provide matching entries in
`audio-manifest.json`. Do not use a license label as a substitute for permission. Listen to each
clip, confirm the final decisions/numbers and update the editorial review before releasing it.

## Visuals

Decorative art is original Blender geometry/text from `scripts/blender/build-assets.py`; no image
model or downloaded illustration is used. The installed Blender 4.3.2 lacks OpenImageDenoise, so
CPU Cycles renders 96 samples without that optional denoiser. Sentence/evidence/paragraph diagrams
are deterministic and use the actual authored text. Browser screenshots are testing evidence,
not decorative app assets or native screenshots.

After the first release, keep question IDs stable. Append new cases rather than reordering an indexed case list, and give materially changed tasks/answers new IDs. Deliberately version catalogs and state migrations; do not silently reinterpret historical attempts.
