# Lesson 189 diagnostics

The browser containment guard caught the remaining border-box mismatch after initial visual review found clipping at 320 px. The measured Chromium diagnostic is a standalone geometry probe, not an SDK test. Explicit border-box geometry fixed the mismatch; final full learner screens were reviewed anew.

An offline run timed out in an existing calculated-time reading flow during observed worker stalls. The unchanged suite passed on retry with its original assertions and timeouts. The intermittent timeout root cause is not established. Final checks remain separate from native SDK scope.
