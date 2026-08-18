# Gentle Path prototype runbook

Run all commands from the repository root:

```bash
cd /Users/surajgop/future/gentle-path
```

## Prerequisites

- Node.js LTS
- npm
- For a physical device: Expo Go
- For simulators: Xcode Simulator or Android Studio Emulator

Install dependencies after cloning or when `package-lock.json` changes:

```bash
npm install
```

## Launch the app

Start the Expo development server:

```bash
npm start
```

From the Expo terminal, use:

- `i` — open the iOS Simulator
- `a` — open an Android emulator
- `w` — open the web version
- `r` — reload the app
- `q` — stop the server

You can also launch a platform directly:

```bash
npm run ios
npm run android
npm run web
```

To use a physical phone, open Expo Go and scan the QR code printed by
`npm start`. The computer and phone should be on the same network.

If Metro appears to be serving stale code, restart with a cleared cache:

```bash
npx expo start --clear
```

## Run validation checks

TypeScript:

```bash
npm run typecheck
```

Lint:

```bash
npm run lint
```

Create a production web bundle:

```bash
npx expo export --platform web
```

Run the normal local validation sequence:

```bash
npm run typecheck
npm run lint
npx expo export --platform web
```

The web export writes generated files to `dist/`. Do not commit that directory.

## Evaluate the happy path

Launch from a fresh app session and verify this sequence:

1. Start at **You are not alone** and select **START**.
2. Choose a struggle and continue.
3. Select multiple ways the struggle is showing up.
4. Choose or enter what getting better would give back.
5. Choose what you are carrying and optionally add context.
6. Enter what is within your control.
7. Select everyone affected.
8. Enter what you fear will happen if you face it honestly.
9. Choose a next action.
10. Confirm that **Your next right action** reflects the earlier answers.
11. Select **HELP ME MAKE THIS SMALLER** and verify the action becomes concrete
    and easier to begin.
12. Choose a commitment time, including testing **Choose a time**.
13. Continue through the Gentle Path introduction.
14. Confirm the committed action and timing appear on home.
15. Select **MARK COMPLETE** and confirm the completed state appears.

Also evaluate these branches:

- Choose **I'm not sure** for the next action and confirm three deterministic
  suggestions appear.
- Select **I NEED TO REVISIT THIS** from home and choose a different action.
- Select **START AN INVENTORY** from home and confirm a fresh inventory begins.
- Try continuing with required answers empty and confirm the primary action is
  disabled.

## Product evaluation prompts

During the walkthrough, note where the experience feels:

- vague or falsely confident
- preachy or overly therapeutic
- overly cheerful or shame-inducing
- unsafe for a realistic recovery scenario
- tedious, crowded, or unclear

Pay particular attention to whether the flow produces one action that is
specific, honest, useful, and realistically completable.

## Troubleshooting

If Expo reports incompatible package versions:

```bash
npx expo install --fix
```

If dependencies appear corrupted, reinstall them without changing locked
versions:

```bash
npm ci
```

If a simulator is unavailable, start it from Xcode or Android Studio first,
then rerun the relevant platform command.

Press `Ctrl+C` to stop any running Expo server.
