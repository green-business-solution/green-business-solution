import crypto from "node:crypto";
import {
  appendPortfolioUpdate,
  loadIdempotencyReceipt,
  loadPortfolioById,
  makeOutboxRow,
  seedPortfolioRecord
} from "../persistence/portfolioStore.mjs";
import {
  PORTFOLIO_EVENT_TYPES,
  createEventEnvelope,
  eventFingerprint,
  canonicalJson,
  canonicalEventKey
} from "../domain/events.mjs";
import {
  loadAggregateFromEvents,
  validateExpectedVersion
} from "../domain/aggregate.mjs";
import { calculatePortfolioReadModel } from "../calculation/marginalValues.mjs";
import { resolveScenarioOrder } from "../calculation/order.mjs";
import {
  validateOwner,
  validateItemExists,
  validateNotCompleted,
  validateRuleVersion,
  validateFinances
} from "../domain/invariants.mjs";

const PORTFOLIO_FEATURE_FLAG = "RETROFI_PORTFOLIO_WRITE_ENABLED";

export function isPortfolioFeatureEnabled(env = process.env) {
  const value = String(env[PORTFOLIO_FEATURE_FLAG] || "").trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes" || value === "on";
}

export function readPortfolioHandler({ db, tableName, user, portfolioId, intake = {}, scenarioId = "default", now = new Date() }) {
  if (!isPortfolioFeatureEnabled(process.env)) {
    const error = new Error("Portfolio APIs are disabled. Set RETROFI_PORTFOLIO_WRITE_ENABLED=1 to enable.");
    error.status = 404;
    error.code = "PORTFOLIO_FEATURE_DISABLED";
    throw error;
  }

  const ownerError = validateOwner(user, portfolioId);
  if (ownerError) throw ownerError;

  return loadPortfolioById({
    db,
    tableName,
    portfolioId,
    userId: user.userId
  }).then(async (found) => {
    let { aggregate, snapshot } = found;

    if (!snapshot) {
      const seeded = await seedPortfolioRecord({
        db,
        tableName,
        portfolioId,
        userId: user.userId,
        seedItems: deriveSeedItemsFromIntake(intake),
        scenarioId,
        now
      });
      aggregate = seeded.aggregate;
      snapshot = seeded.snapshot;
    }

    const scenarioOrder = resolveScenarioOrder({
      requestedItemIds: snapshot.itemOrder || aggregate.itemOrder || [],
      fallbackItemIds: Object.keys(aggregate.items || {})
    });

    const calculationBinding = snapshot.latestCalculationBinding || "calc-v1";
    const calculated = calculatePortfolioReadModel({
      aggregate,
      scenarioId: snapshot.scenarioId || scenarioId,
      scenarioOrder,
      calculationBinding,
      calculationRunId: snapshot.calculationRunId || "run-0"
    });

    return {
      ...calculated,
      scenario: {
        scenarioId: snapshot.scenarioId || scenarioId,
        order: scenarioOrder
      },
      generatedAt: now.toISOString(),
      portfolioVersion: aggregate.aggregateVersion,
      portfolioVersionFingerprint: aggregate.snapshotHash
    };
  });
}

export async function completePortfolioItemHandler({
  db,
  tableName,
  user,
  intake = {},
  portfolioId,
  itemId,
  payload = {},
  now = new Date(),
  scenarioId = "default"
}) {
  if (!isPortfolioFeatureEnabled(process.env)) {
    const error = new Error("Portfolio APIs are disabled. Set RETROFI_PORTFOLIO_WRITE_ENABLED=1 to enable.");
    error.status = 404;
    error.code = "PORTFOLIO_FEATURE_DISABLED";
    throw error;
  }

  const ownerError = validateOwner(user, portfolioId);
  if (ownerError) throw ownerError;

  const expectedPortfolioVersion = Number(payload.expectedPortfolioVersion);
  const commandId = cleanText(payload.commandId);
  const idempotencyKey = cleanText(payload.idempotencyKey);
  const calculationBinding = cleanText(payload.calculationBinding);

  if (!commandId || !idempotencyKey || !calculationBinding || Number.isNaN(expectedPortfolioVersion)) {
    const error = new Error("commandId, idempotencyKey, expectedPortfolioVersion, and calculationBinding are required.");
    error.status = 400;
    error.code = "PORTFOLIO_MISSING_INPUT";
    throw error;
  }

  if (!itemId) {
    const error = new Error("itemId is required.");
    error.status = 400;
    error.code = "PORTFOLIO_MISSING_ITEM_ID";
    throw error;
  }

  const payloadHash = hashPayload({
    commandId,
    idempotencyKey,
    itemId,
    expectedPortfolioVersion,
    calculationBinding,
    financialSelection: payload.financialSelection
  });

  const existingReceipt = await loadIdempotencyReceipt({ db, tableName, portfolioId, scenarioId, idempotencyKey });
  if (existingReceipt) {
    if (existingReceipt.payloadHash === payloadHash) {
      return existingReceipt.result;
    }
    const error = new Error("Reused idempotency key with different payload.");
    error.status = 409;
    error.code = "PORTFOLIO_IDEMPOTENCY_CONFLICT";
    throw error;
  }

  const loaded = await loadPortfolioById({
    db,
    tableName,
    portfolioId,
    userId: user.userId
  });

  let { aggregate, snapshot, events } = loaded;
  if (!snapshot) {
    const seeded = await seedPortfolioRecord({
      db,
      tableName,
      portfolioId,
      userId: user.userId,
      seedItems: deriveSeedItemsFromIntake(intake),
      scenarioId,
      now
    });
    aggregate = seeded.aggregate;
    snapshot = seeded.snapshot;
    events = seeded.aggregate.events || [];
  }

  if (!validateExpectedVersion(aggregate, expectedPortfolioVersion)) {
    const error = new Error("Expected portfolio version does not match current version.");
    error.status = 409;
    error.code = "PORTFOLIO_VERSION_CONFLICT";
    throw error;
  }

  const item = aggregate.items[itemId];
  const validationError =
    validateItemExists(aggregate.items, itemId) ||
    validateNotCompleted(item) ||
    validateFinances(payload) ||
    validateRuleVersion(payload, snapshot?.latestCalculationBinding || "calc-v1");
  if (validationError) throw validationError;

  const currentRunId = nextRunIdFrom(snapshot?.calculationRunId, aggregate.aggregateVersion + 1);

  const completeEvent = createEventEnvelope({
    portfolioId,
    portfolioItemId: itemId,
    type: PORTFOLIO_EVENT_TYPES.ITEM_COMPLETED,
    commandId,
    expectedPortfolioVersion: expectedPortfolioVersion,
    payload: {
      calculationBinding,
      scenarioId,
      financialSelection: {
        requestedBenefitMinorUnits: toMinorUnits(payload?.financialSelection?.requestedBenefitMinorUnits)
      },
      financialModelId: cleanOptional(item.financialModelId),
      ruleFamilyId: cleanOptional(item.ruleFamilyId)
    },
    userId: user.userId,
    runId: currentRunId,
    now
  });

  const recalculationEvent = createEventEnvelope({
    portfolioId,
    type: PORTFOLIO_EVENT_TYPES.RECALCULATION_REQUESTED,
    commandId,
    expectedPortfolioVersion: expectedPortfolioVersion,
    payload: {
      calculationBinding,
      scenarioId,
      reason: "item_completed"
    },
    userId: user.userId,
    runId: currentRunId,
    now
  });

  const nextAggregate = loadAggregateFromEvents({
    events: [...events, completeEvent, recalculationEvent],
    portfolioId,
    userId: user.userId,
    scenarioId
  });

  const scenarioOrder = resolveScenarioOrder({
    requestedItemIds: snapshot?.itemOrder || aggregate.itemOrder || [],
    fallbackItemIds: Object.keys(nextAggregate.items || {})
  });

  const calculated = calculatePortfolioReadModel({
    aggregate: nextAggregate,
    scenarioId,
    scenarioOrder,
    calculationBinding,
    calculationRunId: currentRunId
  });

  const ledgerEvent = createEventEnvelope({
    portfolioId,
    type: PORTFOLIO_EVENT_TYPES.BENEFIT_LEDGER_ENTRY_RECORDED,
    commandId,
    expectedPortfolioVersion: expectedPortfolioVersion,
    payload: {
      ledgerEntries: calculated.ledger?.entries || [],
      ledgerSignature: calculated.ledger?.signature || null,
      reason: "item_completion"
    },
    userId: user.userId,
    runId: currentRunId,
    now
  });

  const snapshotRecord = {
    scenarioId,
    aggregateVersion: nextAggregate.aggregateVersion,
    portfolioId,
    userId: user.userId,
    latestCalculationBinding: calculationBinding,
    calculationRunId: currentRunId,
    calculationRunSequence: extractRunValue(currentRunId),
    eventCount: nextAggregate.events.length,
    itemOrder: nextAggregate.itemOrder || []
  };

  const response = {
    status: "ACCEPTED",
    portfolioId,
    itemId,
    portfolioVersion: nextAggregate.aggregateVersion,
    calculationRunId: currentRunId,
    eventFingerprint: eventFingerprint([completeEvent, recalculationEvent, ledgerEvent]),
    readModel: calculated
  };

  try {
    await appendPortfolioUpdate({
      db,
      tableName,
      portfolioId,
      scenarioId,
      expectedVersion: expectedPortfolioVersion,
      events: [completeEvent, recalculationEvent, ledgerEvent],
      snapshot: snapshotRecord,
      readModel: calculated,
      outboxRow: makeOutboxRow({
        requestId: canonicalEventKey(completeEvent.type, completeEvent),
        calculationRunId: currentRunId,
        scenarioId
      }),
      idempotencyReceipt: {
        idempotencyKey,
        payloadHash,
        commandId,
        result: response
      },
      now,
      eventCount: aggregate.events.length
    });
  } catch (error) {
    const retryReceipt = await loadIdempotencyReceipt({ db, tableName, portfolioId, scenarioId, idempotencyKey });
    if (retryReceipt?.payloadHash === payloadHash) {
      return retryReceipt.result;
    }
    throw error;
  }

  return response;
}

export async function recalculatePortfolioHandler({
  db,
  tableName,
  user,
  portfolioId,
  payload = {},
  now = new Date(),
  scenarioId = "default"
}) {
  if (!isPortfolioFeatureEnabled(process.env)) {
    const error = new Error("Portfolio APIs are disabled. Set RETROFI_PORTFOLIO_WRITE_ENABLED=1 to enable.");
    error.status = 404;
    error.code = "PORTFOLIO_FEATURE_DISABLED";
    throw error;
  }

  const ownerError = validateOwner(user, portfolioId);
  if (ownerError) throw ownerError;

  const commandId = cleanText(payload.commandId);
  const idempotencyKey = cleanText(payload.idempotencyKey);
  if (!commandId || !idempotencyKey) {
    const error = new Error("commandId and idempotencyKey are required.");
    error.status = 400;
    error.code = "PORTFOLIO_MISSING_INPUT";
    throw error;
  }

  const payloadHash = hashPayload(payload);
  const existingReceipt = await loadIdempotencyReceipt({ db, tableName, portfolioId, scenarioId, idempotencyKey });
  if (existingReceipt) {
    if (existingReceipt.payloadHash === payloadHash) return existingReceipt.result;
    const error = new Error("Reused idempotency key with different payload.");
    error.status = 409;
    error.code = "PORTFOLIO_IDEMPOTENCY_CONFLICT";
    throw error;
  }

  const { aggregate, snapshot, events } = await loadPortfolioById({
    db,
    tableName,
    portfolioId,
    userId: user.userId
  });

  if (!snapshot) {
    const error = new Error("Portfolio has not been initialized.");
    error.status = 409;
    error.code = "PORTFOLIO_NOT_INITIALIZED";
    throw error;
  }

  const expectedCalculationRun = cleanText(payload.expectedCalculationRun);
  if (expectedCalculationRun && extractRunValue(snapshot.calculationRunId) > extractRunValue(expectedCalculationRun)) {
    const error = new Error("Stale recalculation request.");
    error.status = 409;
    error.code = "PORTFOLIO_CALCULATION_STALE";
    throw error;
  }

  const calculationBinding = snapshot.latestCalculationBinding || "calc-v1";
  const runId = nextRunIdFrom(snapshot.calculationRunId, aggregate.aggregateVersion + 1);

  const recalcEvent = createEventEnvelope({
    portfolioId,
    type: PORTFOLIO_EVENT_TYPES.RECALCULATION_REQUESTED,
    commandId,
    expectedPortfolioVersion: aggregate.aggregateVersion,
    payload: {
      calculationBinding,
      scenarioId,
      reason: "manual"
    },
    userId: user.userId,
    runId,
    now
  });

  const nextAggregate = loadAggregateFromEvents({
    events: [...events, recalcEvent],
    portfolioId,
    userId: user.userId,
    scenarioId
  });

  const scenarioOrder = resolveScenarioOrder({
    requestedItemIds: snapshot.itemOrder || aggregate.itemOrder || [],
    fallbackItemIds: Object.keys(nextAggregate.items || {})
  });

  const recalculated = calculatePortfolioReadModel({
    aggregate: nextAggregate,
    scenarioId,
    scenarioOrder,
    calculationBinding,
    calculationRunId: runId
  });

  const snapshotRecord = {
    scenarioId,
    aggregateVersion: nextAggregate.aggregateVersion,
    portfolioId,
    userId: user.userId,
    latestCalculationBinding: calculationBinding,
    calculationRunId: runId,
    calculationRunSequence: extractRunValue(runId),
    eventCount: nextAggregate.events.length,
    itemOrder: nextAggregate.itemOrder || []
  };

  const response = {
    status: "RECALCULATED",
    portfolioId,
    scenarioId,
    portfolioVersion: nextAggregate.aggregateVersion,
    calculationRunId: runId,
    readModel: recalculated
  };

  try {
    await appendPortfolioUpdate({
      db,
      tableName,
      portfolioId,
      scenarioId,
      expectedVersion: aggregate.aggregateVersion,
      events: [recalcEvent],
      snapshot: snapshotRecord,
      readModel: recalculated,
      outboxRow: makeOutboxRow({
        requestId: canonicalEventKey(recalcEvent.type, recalcEvent),
        calculationRunId: runId,
        scenarioId
      }),
      idempotencyReceipt: {
        idempotencyKey,
        payloadHash,
        commandId,
        result: response
      },
      now,
      eventCount: aggregate.events.length
    });
  } catch (error) {
    const retryReceipt = await loadIdempotencyReceipt({ db, tableName, portfolioId, scenarioId, idempotencyKey });
    if (retryReceipt?.payloadHash === payloadHash) {
      return retryReceipt.result;
    }
    throw error;
  }

  return response;
}

function deriveSeedItemsFromIntake(intake = {}) {
  const input = Array.isArray(intake.portfolioSeedItems)
    ? intake.portfolioSeedItems
    : [];

  return input
    .map((item, index) => ({
      portfolioItemId: cleanText(item.portfolioItemId || `seed_${String(index + 1).padStart(3, "0")}`),
      title: cleanText(item.title || `Portfolio item ${index + 1}`),
      status: "HYPOTHETICAL",
      lifecycle: "HYPOTHETICAL",
      independentFinancialValueMinorUnits: toMinorUnits(item.independentFinancialValueMinorUnits),
      financialModelId: cleanText(item.financialModelId),
      ruleFamilyId: cleanText(item.ruleFamilyId) || "fixed-unit-cap-family-v1",
      sequenceHint: cleanText(item.sequenceHint) || String(index + 1)
    }));
}

function nextRunIdFrom(currentRun, fallback) {
  const index = Math.max(extractRunValue(currentRun), Number.isInteger(fallback) ? fallback : 0);
  return `run-${index + 1}`;
}

function extractRunValue(runId = "run-0") {
  const match = String(runId).match(/-(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function hashPayload(payload) {
  return crypto.createHash("sha256").update(canonicalJson(payload)).digest("hex");
}

function toMinorUnits(value) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : 0;
}

function cleanText(value) {
  const text = String(value || "").trim();
  return text || "";
}

function cleanOptional(value) {
  const text = String(value || "").trim();
  return text ? text : null;
}
