# AGENTS.md

## Project

Gentle Path is a mobile recovery app built by Exiles.

The app helps users turn fear, shame, resentment, craving, dishonesty, and avoidance into honest, concrete recovery actions.

Product requirements live in:

- `docs/product/PRODUCT_THESIS.md`
- `docs/product/MVP.md`
- `docs/product/SCREENS.md`

Read the relevant product docs before implementing product behavior. Do not invent requirements when the docs are unclear; ask instead.

## Current technical direction

- React Native
- Expo
- TypeScript
- Expo Router
- Local-first prototype initially
- No backend, auth, payments, or live AI unless explicitly requested

## Engineering principles

- Prefer simple, readable code over clever abstractions.
- Keep components reasonably small and focused.
- Avoid premature architecture and dependencies.
- Preserve strict TypeScript typing.
- Do not expand product scope without explicit approval.
- Do not silently change established copy or UX intent from the product docs.
- Fix lint/type/build errors caused by your changes.

## Validation

After meaningful implementation work:

- run available TypeScript checks
- run lint/tests if configured
- verify the relevant user flow
- report unresolved errors or blockers

## Status reporting

Maintain `docs/STATUS.md`.

After meaningful work, update it with:

- what changed
- what currently works
- validation results
- blockers
- important implementation decisions
- next 1–3 recommended tasks

Keep it concise and current. Do not turn it into a chronological diary.

## Working style

Before coding:
1. inspect the existing repo, including other active branches (`git branch -r` / `git log origin/main..<branch>`) — not just the branch you're starting from
2. read relevant product docs
3. state any material assumptions

After coding:
1. validate the work
2. update `docs/STATUS.md`
3. stop at the requested scope