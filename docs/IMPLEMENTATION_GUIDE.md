Goal
Build a local-first mobile vertical slice that demonstrates the complete Gentle Path recovery-action loop.
The first build is not production software.
It is a product-learning instrument.
Recommended stack
App
React Native
Expo
TypeScript
Navigation
Use Expo Router unless there is a strong reason not to.
State
Start with simple local React state plus lightweight persistence.
No database.
No backend.
No authentication.
AI
No live LLM integration in implementation #1.
For the first build, use deterministic/mock logic to generate the suggested next action.
Why?
Because we are testing:
Does the experience work?
not:
Can an LLM generate recovery advice?
We should know whether the product loop feels valuable before introducing model variability, safety complexity, API cost, prompting, and backend architecture.
Design
Simple mobile-first interface.
Prioritize:
generous whitespace
calm typography
clear hierarchy
one primary decision per screen
very little visual clutter
Avoid prematurely establishing an elaborate brand system.
Initial data model
Something roughly like:
type RecoveryProfile = {
  struggle?: string;
  strugglePatterns: string[];
  desiredOutcome?: string;
};

type Inventory = {
  category?: string;
  description?: string;
  controllablePart?: string;
  affectedPeople: string[];
  honestyFear?: string;
};

type RecoveryAction = {
  id: string;
  title: string;
  detail?: string;
  dueAt?: string;
  status: "proposed" | "committed" | "completed" | "revisited";
};
Do not over-model this yet.
First implementation milestone
A user must be able to:
Launch
→ onboard
→ complete inventory
→ choose / receive next action
→ make action smaller
→ commit
→ arrive at home
→ see committed action
→ mark it complete
Everything should work locally.
Implementation sequence
Pass 1 — Skeleton
initialize Expo app
configure TypeScript
configure routing
create screen structure
ensure app runs
Pass 2 — Onboarding
Build screens 1–2C.
Use static options and local state.
Pass 3 — Inventory
Build screens 3A–3E.
Persist answers across navigation.
Pass 4 — Action generation
Create a deterministic utility such as:
deriveSuggestedAction(inventory, profile)
It can use basic branching rules.
Do not call an AI service yet.
Pass 5 — Action commitment
Build:
next-right-action screen
make-it-smaller path
commitment timing
Pass 6 — Home
Display:
start inventory
currently committed action
mark complete
sobriety duration placeholder/input
Pass 7 — Persistence
Use local device storage so restarting the application doesn't destroy the current action.
Pass 8 — Product test
Run through at least five realistic scenarios:
active craving
hidden relapse
resentment
fear
avoided difficult conversation
Document where the experience becomes:
preachy
vague
falsely confident
overly therapeutic
overly cheerful
unsafe
tedious