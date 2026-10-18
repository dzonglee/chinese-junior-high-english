# Native checkpoint 110 — startup blocked

No native pass or screenshot coverage is claimed for l-ls-course-t20. Lesson jobs `cde8adc190634f478f8d99676b930dc2` and `7e6a80232426401db6cea8011154958d` both have actual native exit 1 before an initial page becomes available. Their outer background jobs succeeded, which is not a native success. The bounded initial-page retry also timed out.

Locked startup diagnosis `8919fd3cf119442dbabc158801aa9406` connected the official SDK, but global evaluation, current-page reading and simulator screenshot commands each timed out. Its outer script exit 0 means the diagnostic completed; every simulator command failed. This isolates the observed blocker to simulator command availability without proving a root cause. Own-project cleanup ran and the shared GUI lock was released. No credentials, account or shared-app restart was performed.

Last verified native lesson: [checkpoint 109](../native-checkpoint-109/README.md). Final lesson-110 browser control/visual review at 320/390/768 and native-adapter simulations are separate evidence. Compiler redistributed fourteen unchanged topic packs across generated group directories; exact bytes and all 245 loaded hashes are verified. Do not assume adapter success resolves the simulator failure.

Next: inspect official project-scoped cache/compile tooling and obtain an actual lesson-110 run before claiming native layout/binding coverage. Independent lesson work continues. Content remains draft; approved audio and physical-device review remain open. No upload/publication.

[Initial failure](initial-job.json) · [Retry failure](retry-job.json) · [Bounded diagnosis](startup-diagnostic.json).
