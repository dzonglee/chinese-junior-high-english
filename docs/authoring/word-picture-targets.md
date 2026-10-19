# Word picture targets

A word decision may add `art.targets`: two to four actual picture buttons, with exactly one
unique target per semantic option. Each target has a stable `id`, `option`, short `label` and
finite percentage `left`, `top`, `width`, `height`. Targets must fit the picture, must not overlap,
and must be at least 12% in both dimensions. Browser and native checks must also establish actual
44px minimum controls at the supported widths; percentage validation alone cannot establish that.

Both renderers keep the ordinary sentence choices. A picture tap performs the same semantic
selection action. It shows a neutral selected border and code-authored label; it never checks an
answer or grants completion. The context, original writing and repair gates remain mandatory.
Use real buttons with accessible labels and pressed state, and retain browser keyboard support.

The generated image supplies recognizable referents. It must not supply exact instructional
labels or answers. Record every asset and inspect all initial and selected figures. When the
question changes context, its written evidence takes precedence over a prior illustration.
