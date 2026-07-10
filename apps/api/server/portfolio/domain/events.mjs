import crypto from "node:crypto";

export const PORTFOLIO_EVENT_TYPES = {
  ITEM_COMPLETED: "PORTFOLIO_ITEM_COMPLETED",
  ITEM_ABANDONED: "PORTFOLIO_ITEM_ABANDONED",
  ITEM_CORRECTED: "PORTFOLIO_ITEM_CORRECTED",
  SNAPSHOT_SEEDED: "PORTFOLIO_SNAPSHOT_SEEDED",
  RECALCULATION_REQUESTED: "PORTFOLIO_RECALCULATION_REQUESTED",
  BENEFIT_LEDGER_ENTRY_RECORDED: "PORTFOLIO_BENEFIT_LEDGER_ENTRY_RECORDED"
};

function canonicalizeRecord(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalizeRecord);
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  if (value instanceof Date) return value.toISOString();
  const keys = Object.keys(value).sort();
  const output = {};
  for (const key of keys) {
    const normalized = value[key];
    if (normalized === undefined) continue;
    output[key] = canonicalizeRecord(normalized);
  }
  return output;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalizeRecord(value));
}

export function hashEventEnvelope(envelope) {
  return crypto.createHash("sha256").update(canonicalJson(envelope)).digest("hex");
}

export function canonicalEventKey(type, payload) {
  const hash = hashEventEnvelope({
    type,
    payload
  });
  return `${type}:${hash.slice(0, 10)}`;
}

export function normalizeEnvelope(input) {
  return {
    schemaVersion: "portfolio-event-v1",
    eventId: String(input.eventId || input.eventIdFromServer || ""),
    portfolioId: String(input.portfolioId || ""),
    portfolioItemId: cleanOptionalId(input.portfolioItemId),
    type: String(input.type || ""),
    commandId: cleanOptionalId(input.commandId),
    expectedPortfolioVersion: typeof input.expectedPortfolioVersion === "number" ? input.expectedPortfolioVersion : 0,
    payload: canonicalizeRecord(input.payload || {}),
    occurredAt: cleanIso(input.occurredAt),
    userId: cleanOptionalId(input.userId),
    runId: cleanOptionalId(input.runId)
  };
}

export function createEventEnvelope({
  portfolioId,
  portfolioItemId = null,
  type,
  commandId,
  expectedPortfolioVersion,
  payload = {},
  userId,
  runId = null,
  now = new Date()
}) {
  const envelope = {
    schemaVersion: "portfolio-event-v1",
    eventId: crypto.randomUUID(),
    portfolioId: String(portfolioId || ""),
    portfolioItemId: cleanOptionalId(portfolioItemId),
    type,
    commandId: cleanOptionalId(commandId),
    expectedPortfolioVersion: Number.isInteger(expectedPortfolioVersion) ? expectedPortfolioVersion : 0,
    payload,
    occurredAt: cleanIso(now),
    userId: cleanOptionalId(userId),
    runId: cleanOptionalId(runId)
  };
  return normalizeEnvelope(envelope);
}

export function eventFingerprint(events = []) {
  return hashEventEnvelope({
    schemaVersion: "portfolio-event-batch-v1",
    events: events.map((event) => normalizeEnvelope(event))
  });
}

function cleanOptionalId(value) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

function cleanIso(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  const candidate = String(value || "");
  if (!candidate) {
    return new Date().toISOString();
  }
  const parsed = new Date(candidate);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export function sortEventsForReplay(events = []) {
  return [...events].sort((a, b) => {
    if (a.occurredAt !== b.occurredAt) {
      return String(a.occurredAt).localeCompare(String(b.occurredAt));
    }
    if ((a.expectedPortfolioVersion || 0) !== (b.expectedPortfolioVersion || 0)) {
      return (a.expectedPortfolioVersion || 0) - (b.expectedPortfolioVersion || 0);
    }
    if ((a.runId || "").localeCompare(b.runId || "") !== 0) {
      return (a.runId || "").localeCompare(b.runId || "");
    }
    return (a.eventId || "").localeCompare(b.eventId || "");
  });
}

export function isKnownEventType(type) {
  return Object.values(PORTFOLIO_EVENT_TYPES).includes(type);
}
