# Native startup and compiler checks

The package keeps the artwork and question banks in named subpackages. The generated loader
awaits `require.async('./illustrations/index.js')` before loading the catalog. That small entry
module triggers WeChat's asynchronous subpackage loading; it does not create a page or copy
art into the main package. Artwork-loading failure remains retryable and must block readiness.
Do not use `wx.loadSubpackage`: it is absent from the mini-program runtime checked in DevTools.
Adapter doubles must exercise the asynchronous module loader instead of inventing that API.

Use the installed Tencent `wcc` and `wcsc` binaries to validate actual WXML/WXSS syntax when
Mac access is available. Balanced tags and bound handlers do not establish successful native
compilation. A loop attached directly to `wx:else` changes the compiler's structural expansion;
put the loop inside a separate conditional block. WXSS does not accept universal child selectors
such as `.album-owners > *`; name the actual `span`/`text` children used by web/native views.
The static package audit now rejects these two observed failure patterns.

The focused `scripts/devtools-individual.cjs` check uses the official automation SDK in the
isolated English guest project while holding the shared DevTools lock. It records which picture
events and amount inputs exercise native component bindings and which transitions use the real
Application controller. SDK coordinate taps after scrolling were inconsistent; the final runner
uses explicit SDK event triggers, with physical touch testing still pending. It restores saved learning data and closes its own automation project in `finally`.
It never publishes, uploads to WeChat or uses a real-device result to label other lessons reviewed.

The guest simulator has reported a delayed `navigateTo:fail timeout` after the requested lesson was already present. The native adapter checks both the current route and every requested query value before suppressing that false failure. A different lesson on the same route still reports failure. Native evidence retains the raw callback diagnostic and the independently checked arrival; it is not a real-device navigation claim.
