# Gentle Path status

## v0.2 changes

- Initialized an Expo SDK 57 React Native app with TypeScript and Expo Router.
- Implemented the complete arrival → onboarding → inventory → next action → smaller action → commitment → introduction → home happy path.
- Added deterministic action suggestions for uncertain users, revisit behavior, and action completion.
- Fixed a latent bug in `actionSuggestions.ts`: the Craving-branch suggestion title didn't exactly match the canonical label used elsewhere, and action IDs (`Date.now()`-based) could collide when multiple suggestions are built in the same call. Neither was live-breaking yet, but both would have surfaced once actions were persisted as a list — fixed ahead of persistence landing.
- Persist submitted profile, inventory, current action, commitment timing, and completion/revisit status in a versioned AsyncStorage snapshot.
- Wait for hydration before mounting screens. Reopening the root resumes saved progress; committed/completed actions return to Home.
- Serialize saves to prevent an older write replacing newer progress. Surface failed saves with retry; malformed or unsupported stored data is preserved behind a load-error/retry screen.
- Starting a new inventory clears inventory/current action together while retaining the profile.
- Missing actions redirect next-action, smaller, and commitment to action selection instead of showing a blank screen or an inert commitment button.

## Validation (2026-09-20)

- `npm test`: 7 persistence tests passed (round trips, validation, resume routing, reset snapshot, ordered writes, failed-write retry).
- `npm run typecheck`: passed.
- `EXPO_NO_TELEMETRY=1 npm run lint`: passed.
- `EXPO_NO_TELEMETRY=1 npx expo export --platform web`: passed, all routes exported.
- Headless Chrome against the web export: submitted onboarding persists and resumes; restored commitment can be completed and survives reload; inventory reset survives restart and preserves profile; three missing-action routes recover; simulated storage write failure displays retry and saves after recovery; malformed data stays untouched and load retry recovers after storage is repaired. No browser runtime errors.
- Independently reproduced in a separate clean worktree rather than trusted from the branch's own report: typecheck, full test suite, lint, and web export all reran clean.
- Browser storage fixtures were used for commitment/restoration cases. This is not a full end-to-end onboarding or native-device test.

## Decisions and limits

- Persist only submitted context state, not unsubmitted text, screen-local selections, or navigation history. Resume is derived from saved state.
- AsyncStorage is local and unencrypted. This remains a prototype; review sensitive-data handling and deletion before real-user distribution. No analytics/backend was added.
- Malformed/unknown-version snapshots are not automatically deleted. Retry alone cannot repair corruption; deliberate recovery/reset UX remains future work.
- Saves are asynchronous. An immediate force-kill before a write finishes may lose the last change. Native iOS/Android restart and failure testing remains required.
- Dependency installation reported 21 audit findings (14 moderate, 7 high), also present before adding AsyncStorage; no broad dependency upgrades were attempted.
- Action ID fix uses a random suffix rather than adding a UUID dependency, consistent with the no-premature-dependencies principle.

## Recommended next tasks

1. Native-device pass: restart, commitment, revisit, smaller-action, completion, and new-inventory flows on an actual iOS/Android device. Web export and unit tests are verified; device behavior is not.
2. Run a product copy/UX review on iOS and Android devices.
3. Add focused interaction tests for the full happy path and suggestion branches beyond persistence.
4. Decide the sober-date UX — the persistence layer now supports adding it, but sober-date collection/display itself isn't built.
