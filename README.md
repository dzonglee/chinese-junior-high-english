# 初中英语 · Local learning app and WeChat mini program

A working local English practice app for mainland junior-high students, with 34 original draft
lessons, 368 questions and 96 vocabulary entries. It includes illustrated answer feedback,
vocabulary review, reading, writing drafts, speaking self-review, a question builder, timed
practice, private questions, a mistake book, saved progress and backup import/export.

## Run locally

Use Node 24 and the checked-in npm lockfile:

```bash
npm ci --no-audit --no-fund
npm run build:local
npm run dev
```

The development server listens on loopback port 4173. For a portable offline copy, open
`dist/local/index.html` in Chrome or Edge. That single file contains all 48 checked content packs,
the app code, styles and original Blender artwork. It needs no account or cloud configuration.
See [local version instructions](docs/local-version.md) for saving progress and microphone support.

Videos are deferred. Listening tasks clearly show when audio is pending. Content remains draft;
the app does not infer verified textbook adoption or local exam blueprints from the selected city.
The native WeChat implementation is included in `miniprogram/`; production configuration,
approved audio, real-device validation and editorial launch review remain future work.

## Validate changes

```bash
npm run check
npm run test:grammar
npm run content:audit
npm run check:package
npm run test:native-adapter
npm run test:native-cancellation
npm run test:release-guards
npm run test:journeys
npm run test:local
```

Browser checks need Chromium: use the installed `/usr/bin/chromium`, set `CHROMIUM_PATH`, or run
`npx playwright install --with-deps chromium`. Current results and the precise simulated/native
boundary are recorded in [validation evidence](docs/validation.md).

## Working on the project

Read [AGENTS.md](AGENTS.md), [the plan](docs/plan.md), [project memory](docs/project-memory.md),
[the board](docs/authoring/board.md) and the latest [handoff log](docs/authoring/log.md) first.
Follow the claim protocol; preserve other agents' work. The sister app is
`dzonglee/chinese-junior-high-maths`.

Research continues separately under [Stage 1](docs/stage1-resource-gathering.md).
`reference/` is a provenance/rights research corpus, never learner content. Neither full national
vocabulary coverage nor completion of the research integration gate is claimed.
