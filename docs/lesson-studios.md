# Interactive lesson studios

Every one of the 413 original draft lessons opens a hands-on studio before optional scored
practice. The learner makes a prediction, changes or constructs something, applies it in a new context, diagnoses
an error and tries another task. Each screen focuses on one activity. Source material and detailed
illustrated reasons remain available on demand.

| Lessons | Main interaction |
| --- | --- |
| 55 grammar | Change object/time/role/structure models; test a live expression; apply the rule in context |
| 212 vocabulary | Recall all 1,690 target words; write original examples; change two examples into new situations |
| 35 reading | Build evidence-to-conclusion chains; explain a judgment; support later answers with source evidence |
| 31 listening preparation | Organise dialogue information and select transcript clues; explicitly text preparation until approved audio exists |
| 72 speaking/writing | Plan the task in the learner's own words; compare one useful reference; revise and self-review the full draft |
| 8 phonetics | Change stress/grouping/connection/pitch marks; compare meanings; classify further examples |

The sentence slot preserves the exact authored context and meaning constraints. A partial spelling
prefix is not duplicated when the learner enters the complete word. Reading source selection and
communication comparisons expose one part at a time. Wrong predictions can continue into learning;
subsequent stages require the relevant action. Native controls show completed words and contexts.

Studios save progress separately from practice attempts. They never create mastery, independent
attempts or lesson passes. Opening a studio conservatively marks its immediate tasks as exposed;
subsequent practice on those tasks is assisted. Distinct delayed tests remain unexposed. Writing
and speaking checks are explicitly self-review, not automatic semantic or pronunciation scoring.
Changed lesson content resets obsolete activity progress while preserving the learner's drafts.

See [the current lesson review](reviews/lesson-workshops-2026-10-17.md) for per-lesson coverage,
model inspection and the fresh-native-access limitation. Earlier simulator evidence covers the
earlier build; the updated native walker must be run again after Mac drive access is restored.

## Development and verification

Use Node 24, the locked dependencies and `npm run build`. The 245 distinct checked topic packs
use one catalog subpackage and eight content groups within the checked package budgets. WeChat allows at most 100
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

The default simulator walk opens all 413 native lesson routes. Seven representative lessons
(one per skill) run complete controller flows plus actual native controls; the other pages use
explicit phase-two render fixtures. Fixture rendering does not mean a full native lifecycle was
completed. Require actual bound lesson/stage controls before capture, inspect every screenshot,
and retest empty captures separately. All 413 full controller lifecycles also have automated tests.

For a bounded follow-up, set `ENGLISH_NATIVE_LESSONS` to comma-separated lesson IDs,
`ENGLISH_NATIVE_SPELLING` to `american` or `british`, and `ENGLISH_NATIVE_OUTPUT` to a unique
artifact subfolder. Every focused lesson runs a complete flow; source changes, fixed spelling and
workshop rendering can be checked without overwriting the exhaustive page-walk evidence.

Studio access uses the tested token-free `/workspace/.onboarding/chrisverse_mcp.py` helper.
It reads the existing environment credential privately and normalizes the Authorization scheme
once. Read `memory_start_here`, project memory, Kanban and the current workspace instructions;
inspect returned jobs through `get_job`. Native plugin injection is not required for this fallback.
Never copy a credential into source, arguments, logs or ordinary memory.

See `docs/project-memory.md`, the repository board/log and the final review record for current
verification status. Audio/model choice, videos, publisher mapping, research gaps, editorial
approval and production publication remain separate requirements.
