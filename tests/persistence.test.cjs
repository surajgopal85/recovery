const { test } = require('node:test');
const assert = require('node:assert/strict');
const { emptyState, decodeState, encodeState, resumeRoute, createStateWriter } = require('../.test-build/state/persistence.js');
const action = { id: 'one', title: 'Call someone', status: 'committed', dueAt: 'Tonight' };
const state = () => ({ profile: { struggle: 'Alcohol', strugglePatterns: ['Avoidance'], desiredOutcome: 'Trust' }, inventory: { category: 'Fear', description: 'A difficult day', controllablePart: 'Make a call', affectedPeople: ['Me'], honestyFear: 'Rejection' }, currentAction: action });

test('first launch loads empty state without redirecting away from arrival', () => {
  assert.deepEqual(decodeState(null), emptyState());
  assert.equal(resumeRoute(decodeState(null)), '/');
});
test('soberDate survives serialization and rejects malformed values', () => {
  const saved = { ...state(), profile: { ...state().profile, soberDate: '2026-01-15' } };
  assert.deepEqual(decodeState(encodeState(saved)), saved);
  for (const bad of ['not-a-date', '2026-13-01', '01/15/2026', 12345]) {
    const withBadDate = { ...state(), profile: { ...state().profile, soberDate: bad } };
    assert.throws(() => decodeState(encodeState(withBadDate)));
  }
});
test('submitted profile, inventory, commitment and completion survive serialization', () => {
  for (const status of ['proposed', 'committed', 'completed', 'revisited']) {
    const saved = state(); saved.currentAction = { ...action, status };
    assert.deepEqual(decodeState(encodeState(saved)), saved);
    assert.equal(resumeRoute(decodeState(encodeState(saved))), { proposed: '/next-action', committed: '/home', completed: '/home', revisited: '/honest-action' }[status]);
  }
});
test('rejects corrupt data, unsupported versions, bad nested fields and invalid actions', () => {
  for (const raw of ['{', 'null', '[]', '{"version":2}', JSON.stringify({ version: 1, state: { profile: {}, inventory: {} } })]) assert.throws(() => decodeState(raw));
  for (const bad of [{ ...action, status: 'bogus' }, { ...action, title: null }, { ...action, dueAt: undefined }, { ...action, detail: 42 }]) assert.throws(() => decodeState(encodeState({ ...state(), currentAction: bad })));
  assert.throws(() => decodeState(encodeState({ ...state(), inventory: { affectedPeople: [3] } })));
});
test('resumes each partially submitted inventory without discarding answers', () => {
  const saved = emptyState();
  saved.profile.struggle = 'Alcohol'; assert.equal(resumeRoute(saved), '/patterns');
  saved.profile.strugglePatterns = ['Avoidance']; assert.equal(resumeRoute(saved), '/outcome');
  saved.profile.desiredOutcome = 'Trust'; assert.equal(resumeRoute(saved), '/carrying');
  saved.inventory.category = 'Fear'; assert.equal(resumeRoute(saved), '/control');
  saved.inventory.controllablePart = 'Call'; assert.equal(resumeRoute(saved), '/impact');
  saved.inventory.affectedPeople = ['Me']; assert.equal(resumeRoute(saved), '/fear');
  saved.inventory.honestyFear = 'Rejection'; assert.equal(resumeRoute(saved), '/honest-action');
});
test('reset snapshot preserves profile and removes old action and inventory on restart', () => {
  const reset = { profile: state().profile, inventory: { affectedPeople: [] } };
  assert.deepEqual(decodeState(encodeState(reset)), { ...reset, currentAction: undefined });
  assert.equal(resumeRoute(reset), '/carrying');
});
test('writes are serialized even when a previous storage operation is slow', async () => {
  let release; const writes = [];
  const writer = createStateWriter(async (value) => { writes.push(value); if (writes.length === 1) await new Promise(resolve => { release = resolve; }); });
  const first = writer(emptyState()); const second = writer(state());
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(writes.length, 1); release(); await Promise.all([first, second]);
  assert.deepEqual(decodeState(writes[1]), state());
});
test('a failed write rejects but does not block retrying the latest snapshot', async () => {
  let calls = 0; let stored;
  const writer = createStateWriter(async (value) => { if (++calls === 1) throw new Error('disk unavailable'); stored = value; });
  await assert.rejects(writer(emptyState())); await writer(state());
  assert.deepEqual(decodeState(stored), state());
});
