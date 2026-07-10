import {
  PORTFOLIO_EVENT_TYPES,
  hashEventEnvelope,
  isKnownEventType,
  normalizeEnvelope,
  eventFingerprint,
  sortEventsForReplay
} from "./events.mjs";

const defaultAggregate = {
  aggregateType: "retrofit-portfolio",
  aggregateVersion: 0,
  portfolioId: "",
  userId: null,
  scenarioId: "default",
  items: {},
  itemOrder: [],
  completedItemOrder: [],
  abandonedItemOrder: [],
  events: [],
  snapshotHash: "",
  latestCommandId: null,
  derived: {
    calculationBinding: null,
    totalEvents: 0,
    correctedEventCount: 0,
    totalLedgerEntries: 0,
    lastCalculationStartedAt: null,
    latestCalculationRun: null
  }
};

export function buildEmptyAggregate({ portfolioId, userId, scenarioId = "default" }) {
  return {
    aggregateType: defaultAggregate.aggregateType,
    aggregateVersion: 0,
    portfolioId,
    userId: cleanOptionalId(userId),
    scenarioId,
    items: {},
    itemOrder: [],
    completedItemOrder: [],
    abandonedItemOrder: [],
    events: [],
    snapshotHash: "",
    latestCommandId: null,
    derived: {
      calculationBinding: null,
      totalEvents: 0,
      correctedEventCount: 0,
      totalLedgerEntries: 0,
      lastCalculationStartedAt: null,
      latestCalculationRun: null
    }
  };
}

export function loadAggregateFromEvents({ events = [], portfolioId, userId, scenarioId = "default" }) {
  const aggregate = buildEmptyAggregate({ portfolioId, userId, scenarioId });
  const sortedEvents = sortEventsForReplay(Array.isArray(events) ? events : []);

  for (const rawEvent of sortedEvents) {
    const event = normalizeEnvelope(rawEvent);
    if (!isKnownEventType(event.type)) continue;
    if (portfolioId && event.portfolioId && event.portfolioId !== portfolioId) continue;

    if (event.type === PORTFOLIO_EVENT_TYPES.SNAPSHOT_SEEDED) {
      aggregate.scenarioId = String(event.payload?.scenarioId || scenarioId || aggregate.scenarioId);
      aggregate.itemOrder = [];
      aggregate.items = {};
      const seedItems = Array.isArray(event.payload?.items) ? event.payload.items : [];
      for (const item of seedItems) {
        const normalized = normalizePortfolioItem(item);
        if (!normalized.portfolioItemId) continue;
        aggregate.items[normalized.portfolioItemId] = normalized;
        aggregate.itemOrder.push(normalized.portfolioItemId);
      }
    }

    if (event.type === PORTFOLIO_EVENT_TYPES.ITEM_COMPLETED) {
      const itemId = event.portfolioItemId;
      if (!itemId || !aggregate.items[itemId]) {
        aggregate.events.push(event);
        aggregate.derived.totalEvents += 1;
        aggregate.aggregateVersion += 1;
        continue;
      }
      const existing = aggregate.items[itemId];
      aggregate.items[itemId] = {
        ...existing,
        status: "COMPLETED",
        lifecycle: existing.lifecycle || "HYPOTHETICAL",
        completedAt: event.occurredAt,
        completedCommandId: event.commandId,
        completedRunId: event.runId,
        completedCalculationBinding: event.payload?.calculationBinding || existing.completedCalculationBinding || null,
        financialSelection: {
          requestedBenefitMinorUnits: toMinorUnits(event.payload?.financialSelection?.requestedBenefitMinorUnits)
        },
        completedSource: {
          requestedBenefitMinorUnits: toMinorUnits(event.payload?.financialSelection?.requestedBenefitMinorUnits),
          financialModelId: cleanOptional(event.payload?.financialModelId),
          ruleFamilyId: cleanOptional(event.payload?.ruleFamilyId)
        },
        reservedAt: event.occurredAt
      };
      aggregate.completedItemOrder = addUnique(aggregate.completedItemOrder, itemId);
      aggregate.itemOrder = reorderWithCompletion(aggregate.itemOrder, itemId, aggregate.completedItemOrder);
      aggregate.derived.lastCalculationStartedAt = aggregate.derived.lastCalculationStartedAt || event.occurredAt;
    }

    if (event.type === PORTFOLIO_EVENT_TYPES.ITEM_CORRECTED) {
      const itemId = event.portfolioItemId;
      if (!aggregate.items[itemId]) {
        aggregate.events.push(event);
        aggregate.derived.totalEvents += 1;
        aggregate.aggregateVersion += 1;
        continue;
      }
      aggregate.items[itemId] = {
        ...aggregate.items[itemId],
        status: "ABANDONED",
        lifecycle: "ABANDONED",
        correctedAt: event.occurredAt,
        correctedByCommandId: event.commandId,
        correctedReason: cleanOptional(event.payload?.reason)
      };
      aggregate.abandonedItemOrder = addUnique(aggregate.abandonedItemOrder, itemId);
      aggregate.derived.correctedEventCount += 1;
    }

    if (event.type === PORTFOLIO_EVENT_TYPES.ITEM_ABANDONED) {
      const itemId = event.portfolioItemId;
      if (!aggregate.items[itemId]) {
        aggregate.events.push(event);
        aggregate.derived.totalEvents += 1;
        aggregate.aggregateVersion += 1;
        continue;
      }
      aggregate.items[itemId] = {
        ...aggregate.items[itemId],
        status: "ABANDONED",
        lifecycle: aggregate.items[itemId].lifecycle || "ABANDONED",
        abandonedAt: event.occurredAt,
        abandonedByCommandId: event.commandId,
        abandonedReason: cleanOptional(event.payload?.reason)
      };
      aggregate.abandonedItemOrder = addUnique(aggregate.abandonedItemOrder, itemId);
    }

    if (event.type === PORTFOLIO_EVENT_TYPES.BENEFIT_LEDGER_ENTRY_RECORDED) {
      aggregate.derived.totalLedgerEntries += 1;
      aggregate.derived.lastRunLedgerEntries = {
        [String(event.runId || "run-0")]: true,
        ...aggregate.derived.lastRunLedgerEntries
      };
    }

    if (event.type === PORTFOLIO_EVENT_TYPES.RECALCULATION_REQUESTED) {
      aggregate.derived.lastCalculationStartedAt = event.occurredAt;
      if (event.payload?.calculationBinding) {
        aggregate.derived.calculationBinding = event.payload.calculationBinding;
      }
      if (event.runId) {
        aggregate.derived.latestCalculationRun = event.runId;
      }
      aggregate.derived.calculationReason = cleanOptional(event.payload?.reason) || aggregate.derived.calculationReason;
    }

    aggregate.events.push(event);
    aggregate.derived.totalEvents += 1;
    aggregate.aggregateVersion += 1;
  }

  aggregate.snapshotHash = aggregateFingerprint(aggregate);
  aggregate.latestCommandId = aggregate.events.length ? aggregate.events[aggregate.events.length - 1].commandId : null;

  return aggregate;
}

export function aggregateSnapshot({ aggregate, calculationRunId = null, scenarioId = null }) {
  const ids = Array.isArray(aggregate.itemOrder) && aggregate.itemOrder.length
    ? aggregate.itemOrder
    : Object.keys(aggregate.items || {}).sort((a, b) => String(a).localeCompare(String(b)));

  const orderedItems = ids.map((itemId) => aggregate.items[itemId]).filter(Boolean);

  return {
    schemaVersion: "portfolio-snapshot-v1",
    portfolioId: aggregate.portfolioId,
    userId: aggregate.userId,
    scenarioId: scenarioId || aggregate.scenarioId,
    aggregateVersion: aggregate.aggregateVersion,
    calculationRunId,
    itemCount: orderedItems.length,
    itemOrder: ids,
    lifecycleCounts: {
      HYPOTHETICAL: orderedItems.filter((item) => (item.status || "HYPOTHETICAL") === "HYPOTHETICAL").length,
      COMPLETED: orderedItems.filter((item) => item.status === "COMPLETED").length,
      ABANDONED: orderedItems.filter((item) => item.status === "ABANDONED").length
    },
    items: orderedItems,
    aggregateHash: aggregate.snapshotHash,
    latestCalculationBinding: aggregate.derived.calculationBinding || "calc-v1",
    lastCalculationStartedAt: aggregate.derived.lastCalculationStartedAt,
    derived: {
      eventCount: aggregate.derived.totalEvents,
      correctedEventCount: aggregate.derived.correctedEventCount,
      totalLedgerEntries: aggregate.derived.totalLedgerEntries
    }
  };
}

export function validateExpectedVersion(aggregate, expectedVersion) {
  return aggregate.aggregateVersion === Number(expectedVersion || 0);
}

export function aggregateFingerprint(aggregate) {
  return hashEventEnvelope({
    schemaVersion: "portfolio-aggregate-v1",
    portfolioId: aggregate.portfolioId,
    userId: cleanOptional(aggregate.userId),
    scenarioId: cleanOptional(aggregate.scenarioId) || "default",
    aggregateVersion: Number(aggregate.aggregateVersion || 0),
    itemOrder: Array.isArray(aggregate.itemOrder) ? [...aggregate.itemOrder] : [],
    completedItemOrder: Array.isArray(aggregate.completedItemOrder) ? [...aggregate.completedItemOrder] : [],
    abandonedItemOrder: Array.isArray(aggregate.abandonedItemOrder) ? [...aggregate.abandonedItemOrder] : [],
    items: Object.keys(aggregate.items || {})
      .sort((a, b) => String(a).localeCompare(String(b)))
      .map((itemId) => normalizeAggregateItem(aggregate.items[itemId], itemId)),
    derived: {
      calculationBinding: cleanOptional(aggregate.derived?.calculationBinding),
      totalEvents: Number(aggregate.derived?.totalEvents || 0),
      correctedEventCount: Number(aggregate.derived?.correctedEventCount || 0),
      totalLedgerEntries: Number(aggregate.derived?.totalLedgerEntries || 0),
      lastCalculationStartedAt: cleanOptional(aggregate.derived?.lastCalculationStartedAt),
      latestCalculationRun: cleanOptional(aggregate.derived?.latestCalculationRun)
    }
  });
}

function normalizePortfolioItem(item) {
  return {
    portfolioItemId: cleanOptionalId(item.portfolioItemId),
    lifecycle: normalizeLifecycle(item.lifecycle),
    status: normalizeStatus(item.status),
    title: cleanOptional(item.title) || "Retrofit item",
    independentFinancialValueMinorUnits: Number.isInteger(item.independentFinancialValueMinorUnits)
      ? item.independentFinancialValueMinorUnits
      : toMinorUnits(item.independentFinancialValueMinorUnits),
    financialModelId: cleanOptional(item.financialModelId),
    ruleFamilyId: cleanOptional(item.ruleFamilyId) || "fixed-unit-cap-family-v1",
    sequenceHint: cleanOptional(item.sequenceHint)
  };
}

function normalizeLifecycle(value) {
  if (value === "ABANDONED" || value === "COMPLETED") return value;
  return "HYPOTHETICAL";
}

function normalizeStatus(value) {
  return value === "ABANDONED" || value === "COMPLETED" ? value : "HYPOTHETICAL";
}

function cleanOptional(value) {
  const text = String(value || "").trim();
  return text ? text : null;
}

function cleanOptionalId(value) {
  return cleanOptional(value);
}

function addUnique(collection = [], itemId) {
  return collection.includes(itemId) ? collection : [...collection, itemId];
}

function reorderWithCompletion(order, itemId) {
  if (!order.includes(itemId)) return order;
  return [...order];
}

function toMinorUnits(value) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : 0;
}

function normalizeAggregateItem(item, portfolioItemId) {
  const normalized = item || {};
  return {
    portfolioItemId,
    lifecycle: normalizeLifecycle(normalized.lifecycle),
    status: normalizeStatus(normalized.status),
    title: cleanOptional(normalized.title),
    independentFinancialValueMinorUnits: toMinorUnits(normalized.independentFinancialValueMinorUnits),
    financialModelId: cleanOptional(normalized.financialModelId),
    ruleFamilyId: cleanOptional(normalized.ruleFamilyId),
    sequenceHint: cleanOptional(normalized.sequenceHint),
    completedAt: cleanOptional(normalized.completedAt),
    abandonedAt: cleanOptional(normalized.abandonedAt),
    correctedAt: cleanOptional(normalized.correctedAt),
    correctedReason: cleanOptional(normalized.correctedReason),
    abandonedReason: cleanOptional(normalized.abandonedReason),
    completedCalculationBinding: cleanOptional(normalized.completedCalculationBinding),
    financialSelection: {
      requestedBenefitMinorUnits: toMinorUnits(normalized.financialSelection?.requestedBenefitMinorUnits)
    }
  };
}
