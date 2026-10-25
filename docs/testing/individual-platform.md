# Individual lesson platform checks

For a content-only lesson, run its latest authored offline and adapter cases against a previously completed full platform checkpoint:

```sh
node scripts/test-individual-platform.mjs l-s-opinion --inspect-shared 241
node scripts/test-individual-platform.mjs l-s-opinion --offline 241
node scripts/test-individual-platform.mjs l-s-opinion --adapters 241
```

The runner compares every tracked or newly added shared application, web and mini-program UI source file with the committed full baseline. Changed, missing or added platform files require the full platform suites. Generated content modules and newly authored lesson fixtures have their own compiler, canonical-pack and per-lesson checks.

The selected case is extracted from the existing full-suite source with the TypeScript parser, retaining its original assertions. The runner rejects a range containing another lesson. Reports record the exact fixture hash, baseline commit, unchanged shared-file count and actual checks. Focused results do not mean every older platform case ran again.

Offline checks cover fresh onboarding and embedded home artwork, the complete selected offline fixture, independent-evidence boundaries, and network/error guards. Only local document navigation may briefly enable networking; practice remains offline and other requests are blocked. Adapter checks retain actual CommonJS startup, artwork-subpackage readiness, privacy routing, a real independent baseline question, all 245 canonical topic/hash loads and the selected case in both development and cloud simulations. They are separate from WeChat DevTools and physical-device testing.

Keep full core tests and per-lesson browser/visual review. Run the complete platform suites whenever shared behavior changes and at the final all-course review. Preserve earlier full-suite evidence and explicitly identify inherited scope in each lesson checkpoint.
