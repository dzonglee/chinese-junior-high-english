# Ordered source cards

An individual proof/card item may set `sourceOrder` to an ordered list of 2–4 quote-option IDs.
Use it when the reading establishes an unambiguous event or procedure sequence, rather than for
evidence that can legitimately be collected in either order. The displayed bank can include
decoys; its IDs and quote texts must be unique, and IDs use lowercase letters, digits and hyphens; each correct quote appears exactly once in `sourceOrder`. Each corresponding evidence
group must contain that one ID, in the same order. Do not combine an order item with `sourceArt`
or `evidenceLabels`; other items in the lesson can use pictures and named evidence groups.

The learner taps source sentences into numbered slots, removes a sentence to return it to the
bank, or resets the arrangement. The full original material remains available. A wrong sequence
marks misplaced positions and uses the item's temporal hint; a decoy uses its own specific
feedback. Choose concise quotes so the assembled sequence remains readable on a phone.

Checking requires the learner's exact arrangement, including its length. It does not infer an
order from which sentences were selected. A correct arrangement unlocks the conclusion but
still requires the learner's own reasoning to record the task. Editing the arrangement removes
its checked state and completion. Partial arrangements survive ordinary reload; a changed
instructional fingerprint resets checks under the existing studio rules. No guided action adds
attempts, mastery or lesson-pass evidence.

Both web and native layouts expose the same add/remove/reset controls. Core regressions cover
swapped correct steps, decoys, duplicate/unknown IDs, partial restore, removal after completion,
reason requirements and recovery. Individual browser checks exercise the actual controls at
320, 390 and 768 pixels. The offline suite restores and repairs an arrangement without networking.
Native-adapter checks are simulations; current WeChat GUI validation is tracked separately.
