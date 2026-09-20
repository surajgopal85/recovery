const { test } = require('node:test');
const assert = require('node:assert/strict');
const { toISODate, daysSince, formatDuration } = require('../.test-build/utils/duration.js');

const NOW = new Date('2026-09-20T12:00:00Z');

test('toISODate builds a real date and rejects invalid calendar dates', () => {
  assert.equal(toISODate(2026, 1, 15), '2026-01-15');
  assert.equal(toISODate(2024, 2, 29), '2024-02-29'); // leap year, valid
  assert.equal(toISODate(2023, 2, 29), null); // not a leap year
  assert.equal(toISODate(2026, 2, 30), null); // Feb never has 30 days
  assert.equal(toISODate(2026, 13, 1), null); // month out of range
  assert.equal(toISODate(2026, 0, 1), null);
  assert.equal(toISODate(2026, 1, 32), null);
  assert.equal(toISODate(2026, 1.5, 1), null); // not an integer
});

test('toISODate rejects future dates', () => {
  const future = new Date();
  future.setFullYear(future.getFullYear() + 1);
  assert.equal(
    toISODate(future.getFullYear(), future.getMonth() + 1, future.getDate()),
    null,
  );
});

test('toISODate accepts today', () => {
  const today = new Date();
  const iso = toISODate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  assert.ok(iso);
});

test('daysSince counts whole elapsed days', () => {
  assert.equal(daysSince('2026-09-20', NOW), 0);
  assert.equal(daysSince('2026-09-19', NOW), 1);
  assert.equal(daysSince('2026-08-20', NOW), 31);
  assert.equal(daysSince('2025-09-20', NOW), 365);
});

test('formatDuration shows Day 1 on the day it is set', () => {
  assert.equal(formatDuration('2026-09-20', NOW), 'Day 1');
});

test('formatDuration shows plain day counts under a month', () => {
  assert.equal(formatDuration('2026-09-19', NOW), '1 day');
  assert.equal(formatDuration('2026-08-25', NOW), '26 days');
});

test('formatDuration switches to months once a full month has passed', () => {
  assert.equal(formatDuration('2026-08-20', NOW), '1 month');
  assert.equal(formatDuration('2026-07-15', NOW), '2 months, 5 days');
});

test('formatDuration switches to years once a full year has passed, dropping days', () => {
  assert.equal(formatDuration('2025-09-20', NOW), '1 year');
  assert.equal(formatDuration('2025-06-15', NOW), '1 year, 3 months');
  assert.equal(formatDuration('2024-09-20', NOW), '2 years');
});
