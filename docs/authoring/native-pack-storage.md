# Development native content storage

The full development mini-program stores each original topic-pack JSON string as a single
ordinary gzip member, hex encoded in a CommonJS data module. This keeps the complete course
and original lesson illustrations within the existing package budgets. Cloud JSON packs and
the standalone build retain their existing formats.

The build verifies each compressed member restores its exact original UTF-8 text. The native
adapter decodes the data before passing it to ContentRepository, which still checks the
original SHA-256, topic, version, question IDs, count and question schema. Compression never
changes authored content, review states, learner records or evidence rules.

The decoder accepts only the declared version, valid lowercase hex, an ordinary gzip header
and an integer output size matching the gzip footer. Compressed input and output allocation
are bounded. A fixed output buffer with one extra byte detects short/oversized decoded data.
Malformed streams fail with a user-facing retry error. The existing SHA-256 gate rejects
validly compressed but changed content. It does not rely on a browser TextEncoder,
TextDecoder, atob or a native zlib API. The small synchronous fflate browser decoder is bundled;
its MIT notice ships in miniprogram/licenses/fflate.txt.

Development/cloud adapter checks load and hash every topic pack with DOM encoders absent.
Actual WeChat DevTools must also open the resulting native package and exercise an authored
lesson before reporting native validation. Package limits remain unchanged.
