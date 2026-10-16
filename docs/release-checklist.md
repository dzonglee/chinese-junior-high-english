# Release checklist

The development app is not a public release. Browser journeys, static WXML checks and the native
API simulation do not replace WeChat DevTools, a real device or the owner's editorial decision.

## Current status

| Requirement | Status |
| --- | --- |
| Reproducible install, compiler and type checks | Passing locally |
| Learning, persistence and release-guard tests | Passing locally |
| Browser learner journeys and phone layouts | Passing; simulated microphone |
| Native adapter, development and CloudBase transports | Passing API simulations |
| Package budgets and route/handler structure | Passing static checks |
| Listening source/model and playable recordings | Owner choice and media still missing |
| Exact textbook-unit and local exam mappings | Not yet integrated; visible generic fallback |
| Owner's actual WeChat AppID and CloudBase environment | Not configured |
| Cloud content files and their actual file IDs | Not uploaded/configured |
| WeChat platform registration/privacy declaration | Not confirmed |
| Native DevTools and real-device experience build | Not run |
| Editorial approval and launch scope | Not approved |
| Public upload/publication | Not performed |

## Prepare the concrete release

1. Complete and review audio as described in `content-authoring.md`. Do not choose a TTS model
   without the owner's instruction. Review all original tasks, Chinese explanations, English
   language and grade suitability. Confirm whether the first release is a generic capability
   course or requires additional verified textbook/local-exam coverage.
2. Run `npm run build`, `npm run check`, `npm run content:audit`, `npm run check:package`,
   `npm run test:native-adapter` and `npm run test:journeys`. Read the current artifacts and test
   results; do not copy an old passing status onto changed content.
3. Configure the real AppID/CloudBase environment in the owner's WeChat project. Only public
   authored packs/audio belong in CloudBase Storage. Permit reads as required for app users;
   restrict writes to the owner's authorized publishing identity. Never grant arbitrary client
   write access or upload private learner material. This app has no cloud-function deployment or
   private-progress backend.
4. Upload the immutable files in `dist/packs/` and approved files in `content/audio/` to that
   environment. Preserve filenames and record the returned `cloud://` file IDs. Map every topic ID
   in `contentFiles` and every media ID in `mediaFiles`. Cloud transport verifies hashes at runtime;
   a file ID alone does not establish the remote file is correct.
5. Copy `config/release.example.json` to the ignored `.local/release.json`. Enter the actual AppID,
   environment and file mappings. Do not enter credentials. Record the owner's actual editorial
   approval with `approvedBy`, `at` and the exact current `fingerprint` from
   `dist/release-readiness.json`. That field is an approval record, not a box for an agent to invent.
6. In WeChat DevTools, validate development flows with the actual project configuration. Check
   asynchronous packs, Chinese layouts, keyboard/input behavior, date clearing and navigation.
   On a real device test playback, privacy denial/agreement, microphone denial/grant, 60-second
   recording, backgrounding, playback/deletion, storage failure and file export/import. Record
   the actual DevTools/device evidence and date in `nativeValidation`, with `realDevice: true`.
7. Configure the platform privacy protection guide for the actual microphone and file flows.
   Record `privacyConfigured: true` only once this has been done. The in-app privacy handler uses
   WeChat's real `agreePrivacyAuthorization` button; it is not a replacement for platform settings.
8. Run `npm run release:check`. It must pass for the exact reviewed content. Then run
   `npm run build:release` to generate `dist/release/`. The release project contains no bundled
   question bank/audio and loads those from CloudBase. It does not overwrite the development
   checkout or change its placeholder AppID.
9. Open `dist/release/project.config.json` in DevTools. Validate the cloud downloads, hashes,
   package size and full device journeys again. The owner can then upload an experience build,
   complete final editorial/device review and publish through WeChat. Record actual outcomes;
   do not call a generated package an uploaded or published app.

`npm run release:check` intentionally exits nonzero until the missing requirements are supplied.
Its JSON report lists exact missing mappings. No AppID, approval, credential, native screenshot
or publication success is fabricated to make the command pass.
