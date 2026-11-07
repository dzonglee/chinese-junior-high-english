# Silent pacing illustration

A proof-card `sourceSettings` may include `pacing: {paceRow, spaceRow}`. Both IDs must name distinct existing rows. The pace control uses `on` for the slower illustrated version and `off` for the faster alternative; the space control uses `on` for extra phrase spacing and `off` for no added interval. Name that binary comparison in the lesson. Neither control silently defaults to a chosen value.

Once both controls have values, the view derives three groups of three points on the same horizontal time scale. Point gaps are 4/10 CSS pixels. A group boundary uses that same base interval plus 0/18 pixels of optional extra time, so no added phrase gap preserves even spacing at either pace. Points are 6 pixels wide. These are layout conventions for comparing two independent choices, not a score, recording, actual note pattern, phrase count or musical tempo. The model is silent and static. Exact labels and geometry stay in code.

Changing a setting updates the positions immediately, clears the checked plan and invalidates completion while preserving accepted source clues and the learner’s reasoning. A correct picture of the plan alone does not complete the source-based task. Existing guided-work boundaries remain in force: no independent attempt, mastery, hearing score or lesson completion credit.

Review all four configurations, including both partly correct states, and inspect geometry at 320/390/768. Check native component events and actual rendered sizes separately from browser and adapter simulations. A proposed musical test must remain distinct from a reported successful performance; approved audio is still required for actual listening practice.
