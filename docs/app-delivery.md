# Application delivery

The owner asked for the finished junior-high English WeChat mini program. Do not end work at
an installation, research handoff, plan, scaffold or isolated feature. Implement and test the
learner workflows, preserve truthful content and exam verification, and prepare concrete release
artifacts before reporting any owner-only prerequisite.

## Current milestone

The owner requested a usable local app first on 2026-10-17 and deferred videos. The current
lesson upgrade replaces the rejected introductory card layer with one coherent path and
subject-specific workshops. It covers the existing 413 lessons, 5,004 questions and 1,690 headwords;
eight separate original written papers provide timed practice and correction workflows.
See [the workshop review](reviews/lesson-workshops-2026-10-17.md) for actual changes, visual review,
verification boundaries and delivery artifacts, and [local instructions](local-version.md) to run it.

The [maths comparison](reviews/lesson-quality-comparison-2026-10-17.md) records the rejected baseline.
It must not be confused with the revised workshop implementation or used as a blanket claim of
parity. Local functional checks and human visual review have different scopes. Fresh native
validation is blocked by unavailable MacStudioExternal project files; no old native run covers
this revision. Approved audio remains pending for 99 scripts. The requirements below still define
the eventual application and public-release acceptance.

## Product requirements

- Route by confirmed city, school structure, grade, term and exact textbook edition/version.
  Keep numeric grades and local labels distinct. Unverified adoption is never a default fact.
- A practical daily plan with due vocabulary, mistakes and the next interactive lesson.
- Textbook-aware course browsing and original lessons that lead with an answer or manipulation.
- Vocabulary practice with delayed review, pronunciation/media hooks and honest learning evidence.
- Grammar, cloze, reading, sentence ordering/correction, listening and speaking practice.
- Writing practice with a clear original rubric, saved drafts and honest self-marking.
- A question-bank builder, practice sessions, timed practice, explicitly labelled original training papers and evidence-backed local mocks.
- A mistake book with error causes, scheduled retries and first-try/delayed evidence kept separate.
- Private user-authored questions with the same explanation validation as authored questions.
- Progress reports, editable learner settings, accessible controls, export and deletion.
- Original or licensed content. Every question needs a strategy, reasoned steps, distractor
  explanations, a specific pitfall and a useful instructional visual when one explains the skill.

## Implementation approach

Inspect and adapt reusable architecture from `dzonglee/chinese-junior-high-maths`; do not copy
mathematics lessons, unknown research facts, environment identifiers or release credentials.
Keep pure learning logic separate from WeChat APIs. Reuse the sister app's design tokens and
relevant UI patterns. Decorative art may use the owner-approved Blender or AI-image pipeline; instructional diagrams
must explain the actual English task. Keep the main package below the WeChat limit and move
large question/media packs to supported content storage.

Build and run the compiler, type checks, meaningful learning-state tests, content validation,
package-budget checks and functional learner journeys. Use real WeChat DevTools verification
when available; clearly distinguish it from browser or mocked-platform checks.

## Completion evidence

| Deliverable | Completion requires |
| --- | --- |
| Platform and content compiler | Reproducible build, valid packs, strict content checks and passing type checks |
| Learning and practice | Working answer, feedback, retry, navigation and saved-progress flows |
| Vocabulary and mistake review | Tested scheduling, first-try evidence and delayed retention |
| Listening, speaking and writing | Real media/recording behavior and clear rubric/self-review states |
| Exams and question builder | Valid selections, accurate timers/scores, saved attempts and verified blueprint gating |
| Private questions and data controls | Validation, persistence, export and deletion without sharing private material |
| Product finish | Reviewed small-screen layouts, usable touch targets, empty/error states and original assets |
| Release | Native validation evidence, package checks, privacy documentation and the owner's actual AppID/cloud/editorial requirements |

An unavailable external service blocks only the operations that depend on it. Continue all
independent implementation and validation. Do not invent audio-model approval, AppID, cloud
deployment, licensed material, native screenshots, MCP writes or publication success.
