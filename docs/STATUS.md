# Gentle Path status

## v0.2 changes

- Persist submitted profile, inventory, current action, commitment timing, and completion/revisit status in a versioned AsyncStorage snapshot.
- Wait for hydration before mounting screens. Reopening the root resumes saved progress; committed/completed actions return to Home.
- Serialize saves to prevent an older write replacing newer progress. Surface failed saves with retry; malformed or unsupported stored data is preserved behind a load-error/retry screen.
- Starting a new inventory clears inventory/current action together while retaining the profile.
- Missing actions redirect next-action, smaller, and commitment to action selection instead of showing a blank screen or an inert commitment button.

## Validation (2026-09-20)

- `npm test`: 7 persistence tests passed (round trips, validation, resume routing, reset snapshot, ordered writes, failed-write retry).
- `npm run typecheck`: passed.
- `EXPO_NO_TELEMETRY=1 npm run lint`: passed.
- `EXPO_NO_TELEMETRY=1 npx expo export --platform web`: passed, 16 routes exported.
- Headless Chrome against the web export: submitted onboarding persists and resumes; restored commitment can be completed and survives reload; inventory reset survives restart and preserves profile; three missing-action routes recover; simulated storage write failure displays retry and saves after recovery; malformed data stays untouched and load retry recovers after storage is repaired. No browser runtime errors.
- Browser storage fixtures were used for commitment/restoration cases. This is not a full end-to-end onboarding or native-device test.

## Decisions and limits

- Persist only submitted context state, not unsubmitted text, screen-local selections, or navigation history. Resume is derived from saved state.
- AsyncStorage is local and unencrypted. This remains a prototype; review sensitive-data handling and deletion before real-user distribution. No analytics/backend was added.
- Malformed/unknown-version snapshots are not automatically deleted. Retry alone cannot repair corruption; deliberate recovery/reset UX remains future work.
- Saves are asynchronous. An immediate force-kill before a write finishes may lose the last change. Native iOS/Android restart and failure testing remains required.
- Dependency installation reported 21 audit findings (14 moderate, 7 high), also present before adding AsyncStorage; no broad dependency upgrades were attempted.

## Next gates

1. Birbal independently audits the branch against v0.1 and the original findings; see `docs/iteration/v0.2-audit-handoff.md`.
2. Run native-device restart, commitment, revisit, smaller-action, completion, and new-inventory flows.
3. Suraj reviews audit findings and decides whether to merge. No release or merge performed.
