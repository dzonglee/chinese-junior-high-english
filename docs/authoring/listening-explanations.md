# Authored listening explanation moves

A case in `content/listening.json` or `content/course-listening.json` may supply `explanationSteps`, an array of `{text, reason}` teaching moves. It may also supply `pitfall` and `transfer` strings. The compiler preserves these authored fields through the normal question explanation validator; omitted fields retain the existing defaults.

Use one reasoning move per step, grounded in that case's actual transcript. Keep `evidence` as literal source quotes: the source-selection activity and code-rendered evidence figure still depend on them. Explanation prose must not substitute for selectable source evidence. Name the relevant misconception rather than reusing an unrelated warning about the first number or suggestion heard.

These fields do not change answers, source rights, feedback-group exposure, cohort eligibility, delayed guards or draft status. Text preparation for unavailable audio does not earn independent listening evidence. Check the actual application screens, wrong choices, source selection, explanation navigation and spelling variants after authoring; a compiler pass alone is insufficient.
