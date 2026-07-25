const WEEKDAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

function partsInZone(epochMilliseconds, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });
  return Object.fromEntries(
    formatter.formatToParts(epochMilliseconds)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  );
}

function localDateTimeToEpoch({ year, month, day, hour, minute }, timeZone) {
  const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  let candidate = targetAsUtc;
  for (let iteration = 0; iteration < 4; iteration += 1) {
    const actual = partsInZone(candidate, timeZone);
    const actualAsUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute
    );
    const difference = targetAsUtc - actualAsUtc;
    candidate += difference;
    if (difference === 0) return candidate;
  }
  const actual = partsInZone(candidate, timeZone);
  if (
    actual.year !== year ||
    actual.month !== month ||
    actual.day !== day ||
    actual.hour !== hour ||
    actual.minute !== minute
  ) {
    throw new Error(
      `NONEXISTENT_OR_AMBIGUOUS_LOCAL_TIME: ${year}-${month}-${day} ${hour}:${minute} ${timeZone}`
    );
  }
  return candidate;
}

function parseClock(value) {
  const match = String(value).match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  if (!match) throw new Error(`INVALID_LOCAL_CLOCK_TIME: ${value}`);
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

function isoDate(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0")
  ].join("-");
}

function isoWeek(date) {
  const target = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil((((target - yearStart) / 86_400_000) + 1) / 7);
}

function intervalHours(date, interval, timeZone) {
  if (!Array.isArray(interval) || interval.length !== 2) {
    throw new Error("INVALID_SCHEDULE_INTERVAL: expected [start, end]");
  }
  const startClock = parseClock(interval[0]);
  const endClock = parseClock(interval[1]);
  const local = {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate()
  };
  const start = localDateTimeToEpoch({ ...local, ...startClock }, timeZone);
  let endDate = date;
  if (
    endClock.hour < startClock.hour ||
    (endClock.hour === startClock.hour && endClock.minute <= startClock.minute)
  ) {
    endDate = new Date(date.getTime() + 86_400_000);
  }
  const end = localDateTimeToEpoch({
    year: endDate.getUTCFullYear(),
    month: endDate.getUTCMonth() + 1,
    day: endDate.getUTCDate(),
    ...endClock
  }, timeZone);
  return (end - start) / 3_600_000;
}

export function annualScheduledHours({
  year,
  timeZone,
  weekly,
  exceptions = {},
  holidays = [],
  activeWeeks = null
}) {
  if (!Number.isInteger(year) || year < 1970 || year > 2100) {
    throw new Error(`INVALID_CALENDAR_YEAR: ${year}`);
  }
  new Intl.DateTimeFormat("en", { timeZone }).format(0);
  const holidaySet = new Set(holidays);
  const activeWeekSet = activeWeeks ? new Set(activeWeeks) : null;
  let hours = 0;
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1);
  for (let cursor = start; cursor < end; cursor += 86_400_000) {
    const date = new Date(cursor);
    const dateKey = isoDate(date);
    if (activeWeekSet && !activeWeekSet.has(isoWeek(date))) continue;
    const weekday = WEEKDAY_KEYS[date.getUTCDay()];
    const intervals = Object.hasOwn(exceptions, dateKey)
      ? exceptions[dateKey]
      : holidaySet.has(dateKey)
        ? []
        : weekly[weekday] ?? [];
    for (const interval of intervals) {
      hours += intervalHours(date, interval, timeZone);
    }
  }
  return hours;
}

export function offsetMinutesAt(epochMilliseconds, timeZone) {
  const local = partsInZone(epochMilliseconds, timeZone);
  return (
    Date.UTC(
      local.year,
      local.month - 1,
      local.day,
      local.hour,
      local.minute,
      local.second
    ) - epochMilliseconds
  ) / 60_000;
}
