# Written record paths

A `word-use` item's `wordDecision.recordPaths` can turn its written reference facts into short linked cards. Use it when the links themselves explain the task: kinship direction or a stated per-person distribution. It is not generated from a picture or inferred from a learner's answer.

The optional array contains 1–3 paths. Each path has a unique lower-case slug `id` of at most 40 characters, a trimmed nonempty `label` of at most 40 characters and 2–4 trimmed nonempty `steps`, each at most 60 characters. The compiler rejects malformed, duplicate, empty and oversized records. Spelling conversion maps labels and steps, preserving identifiers and the source object.

Both renderers show the same authored records after any valid semantic option is selected. They sit below the options, so appearing reference cards do not push the answer controls down. They do not change to green, reveal an answer verdict, check an answer or grant completion. A wrong choice remains wrong even with the correct context word; original writing and self-review requirements still apply. Restored selections restore their reference records. Items without the metadata retain their existing behavior.

Steps flow downward inside each path. Narrow screens stack whole paths; wider screens may place paths side by side. Labels, arrows and nodes are exact code-rendered text, independent of original artwork. Per-lesson evidence must inspect every authored chain at 320, 390 and 768 pixels and actual native controls; automated geometry checks supplement visual inspection.
