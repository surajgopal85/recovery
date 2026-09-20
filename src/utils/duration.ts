// Builds and validates a YYYY-MM-DD date from separate numeric fields
// (month/day/year inputs), rejecting invalid calendar dates (e.g. Feb 30)
// and future dates. Returns null instead of throwing so callers can just
// disable a button on invalid input.
export function toISODate(year: number, month: number, day: number): string | null {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) return null; // rolled over (e.g. Feb 30 -> Mar 2) means it wasn't a real date

  const iso = date.toISOString().slice(0, 10);
  const today = new Date();
  const todayIso = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
  ).toISOString().slice(0, 10);
  if (iso > todayIso) return null; // no future sober dates

  return iso;
}

const startOfDayUTC = (d: Date) => new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

export function daysSince(soberDate: string, now: Date = new Date()): number {
  const start = new Date(`${soberDate}T00:00:00Z`);
  const today = startOfDayUTC(now);
  const diffMs = today.getTime() - start.getTime();
  return Math.max(0, Math.round(diffMs / 86_400_000));
}

// Human-facing duration, warm rather than clinical: "Day 1" on the first day,
// plain day counts through the first month, then months, then years — never
// drilling back down to days once there's a year on the board.
export function formatDuration(soberDate: string, now: Date = new Date()): string {
  const totalDays = daysSince(soberDate, now);
  if (totalDays === 0) return "Day 1";

  const start = new Date(`${soberDate}T00:00:00Z`);
  const today = startOfDayUTC(now);

  let years = today.getUTCFullYear() - start.getUTCFullYear();
  let months = today.getUTCMonth() - start.getUTCMonth();
  let days = today.getUTCDate() - start.getUTCDate();
  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0),
    ).getUTCDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    return months > 0
      ? `${years} year${years === 1 ? "" : "s"}, ${months} month${months === 1 ? "" : "s"}`
      : `${years} year${years === 1 ? "" : "s"}`;
  }
  if (months > 0) {
    return days > 0
      ? `${months} month${months === 1 ? "" : "s"}, ${days} day${days === 1 ? "" : "s"}`
      : `${months} month${months === 1 ? "" : "s"}`;
  }
  return `${totalDays} day${totalDays === 1 ? "" : "s"}`;
}
