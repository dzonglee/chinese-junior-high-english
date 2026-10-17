# Interactive lesson studios

Every one of the 413 original draft lessons opens a hands-on studio before optional scored
practice. The learner makes a prediction, builds something, explores a changed context, diagnoses
an error and tries another task. Each screen focuses on one activity. Source material and detailed
illustrated reasons remain available on demand.

| Lessons | Main interaction |
| --- | --- |
| 55 grammar | Assemble sentence tiles; insert a selected expression into a live sentence slot; compare authored contexts |
| 212 vocabulary | Build all 1,690 target spellings; use every target word in its own context; correct a meaning mix-up |
| 35 reading | Reconstruct source order; inspect short source sections; select actual evidence and diagnose a contextual error |
| 31 listening preparation | Organise dialogue information and select transcript clues; explicitly text preparation until approved audio exists |
| 72 speaking/writing | Organise an original model; link one criterion to a source sentence at a time; revise the learner's own saved draft |
| 8 phonetics | Pair notation and context; sort actual word/notation cards with immediate, specific feedback |

The sentence slot preserves the exact authored context and meaning constraints. A partial spelling
prefix is not duplicated when the learner enters the complete word. Reading source selection and
communication comparisons expose one part at a time. Wrong predictions can continue into learning;
subsequent stages require the relevant action. Native controls show completed words and contexts.

Studios save progress separately from practice attempts. They never create mastery, independent
attempts or lesson passes. Opening a studio conservatively marks its immediate tasks as exposed;
subsequent practice on those tasks is assisted. Distinct delayed tests remain unexposed. Writing
and speaking checks are explicitly self-review, not automatic semantic or pronunciation scoring.
Changed lesson content resets obsolete activity progress while preserving the learner's drafts.

## Development and verification

Use Node 24, the locked dependencies and `npm run build`. The 245 distinct checked topic packs
share six native code subpackages, each below the 1.5 MB build budget. WeChat allows at most 100
subpackages; the actual compiler caught the old one-subpackage-per-topic defect. Main and total
package safety budgets remain unchanged. Release content still uses its separate configured
storage path.

- `npm run check`: TypeScript and all automated tests, including every checked-pack studio lifecycle.
- `npm run check:teaching`: both spelling variants, source coverage and distinct delayed checks.
- `npm run check:package`: every native page/component's markup and handlers, package count and sizes.
- `npm run test:teaching`: actual browser controls plus exhaustive authored view/layout fixtures.
- `npm run test:devtools-teaching -- /absolute/project/path`: official Tencent simulator SDK on the Mac.

The native walker uses the installed `miniprogram-automator` under the Studio's WeChat tooling
folder. Hold the shared `wechat/DEVTOOLS.lock` and coordinate its Kanban card first. Use only the
isolated English project. Return through the real course page for each lesson, then use its production open action. The
SDK can retain old query parameters on repeated same-page launches. Wait for asynchronous
controller work and the actual destination page, inspect screenshots and the nested process exit
code, and close the automation session in `finally`. Wrapper job success alone is insufficient.
Never close another owner's project. Guest mode does not authorize phone preview, upload or release.

Studio access uses the tested token-free `/workspace/.onboarding/chrisverse_mcp.py` helper.
It reads the existing environment credential privately and normalizes the Authorization scheme
once. Read `memory_start_here`, project memory, Kanban and the current workspace instructions;
inspect returned jobs through `get_job`. Native plugin injection is not required for this fallback.
Never copy a credential into source, arguments, logs or ordinary memory.

See `docs/project-memory.md`, the repository board/log and the final review record for current
verification status. Audio/model choice, videos, publisher mapping, research gaps, editorial
approval and production publication remain separate requirements.
