import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_CAP_RULE } from "./calculation/capEvaluation.mjs";
import { calculatePortfolioReadModel } from "./calculation/marginalValues.mjs";
import { loadAggregateFromEvents, aggregateSnapshot } from "./domain/aggregate.mjs";
import { PORTFOLIO_EVENT_TYPES, createEventEnvelope } from "./domain/events.mjs";
import { completePortfolioItemHandler, isPortfolioFeatureEnabled, recalculatePortfolioHandler, readPortfolioHandler } from "./http/portfolioHandlers.mjs";
import { loadPortfolioById, loadIdempotencyReceipt } from "./persistence/portfolioStore.mjs";

const portfolioId = "portfolio_client_001";
const user = {
  role: "client",
  userId: portfolioId
};

afterEach(() => {
  delete process.env.RETROFI_PORTFOLIO_WRITE_ENABLED;
});

describe("portfolio domain replay", () => {
  it("replays deterministically and preserves the original completion event through correction", () => {
    const seedItems = [
      {
        portfolioItemId: "item_b",
        title: "Battery",
        independentFinancialValueMinorUnits: 70000,
        ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
      },
      {
        portfolioItemId: "item_a",
        title: "Lighting",
        independentFinancialValueMinorUnits: 60000,
        ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
      }
    ];

    const seedEvent = createEventEnvelope({
      portfolioId,
      portfolioItemId: null,
      type: PORTFOLIO_EVENT_TYPES.SNAPSHOT_SEEDED,
      commandId: "seed-command",
      expectedPortfolioVersion: 0,
      payload: {
        scenarioId: "scenario-a",
        items: seedItems,
        calculationBinding: "calc-v1"
      },
      userId: user.userId,
      runId: "run-0",
      now: "2026-07-10T10:00:00.000Z"
    });

    const completionEvent = createEventEnvelope({
      portfolioId,
      portfolioItemId: "item_a",
      type: PORTFOLIO_EVENT_TYPES.ITEM_COMPLETED,
      commandId: "complete-item-a",
      expectedPortfolioVersion: 1,
      payload: {
        calculationBinding: "calc-v1",
        financialSelection: {
          requestedBenefitMinorUnits: 60000
        },
        ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
      },
      userId: user.userId,
      runId: "run-1",
      now: "2026-07-10T10:01:00.000Z"
    });

    const correctionEvent = createEventEnvelope({
      portfolioId,
      portfolioItemId: "item_a",
      type: PORTFOLIO_EVENT_TYPES.ITEM_CORRECTED,
      commandId: "correct-item-a",
      expectedPortfolioVersion: 2,
      payload: {
        reason: "erroneous completion"
      },
      userId: user.userId,
      runId: "run-2",
      now: "2026-07-10T10:02:00.000Z"
    });

    const replayA = loadAggregateFromEvents({
      events: [seedEvent, completionEvent, correctionEvent],
      portfolioId,
      userId: user.userId,
      scenarioId: "scenario-a"
    });
    const replayB = loadAggregateFromEvents({
      events: [cloneEvent(correctionEvent), cloneEvent(completionEvent), cloneEvent(seedEvent)],
      portfolioId,
      userId: user.userId,
      scenarioId: "scenario-a"
    });

    expect(replayA.snapshotHash).toBe(replayB.snapshotHash);
    expect(aggregateSnapshot({ aggregate: replayA }).aggregateHash).toBe(aggregateSnapshot({ aggregate: replayB }).aggregateHash);
    expect(replayA.events.map((event) => event.type)).toEqual([
      PORTFOLIO_EVENT_TYPES.SNAPSHOT_SEEDED,
      PORTFOLIO_EVENT_TYPES.ITEM_COMPLETED,
      PORTFOLIO_EVENT_TYPES.ITEM_CORRECTED
    ]);
    expect(replayA.items.item_a.status).toBe("ABANDONED");
    expect(replayA.events.some((event) => event.type === PORTFOLIO_EVENT_TYPES.ITEM_COMPLETED)).toBe(true);
  });
});

describe("portfolio calculations", () => {
  it("keeps the shared cap ledger conserved, unit-consistent, and order-independent", () => {
    const aggregateA = buildManualAggregate({
      item_a: buildItem("item_a", "COMPLETED", 60000, 60000),
      item_b: buildItem("item_b", "COMPLETED", 70000, 70000),
      item_c: buildItem("item_c", "HYPOTHETICAL", 20000, 0)
    }, [
      createEventEnvelope({
        portfolioId,
        type: PORTFOLIO_EVENT_TYPES.BENEFIT_LEDGER_ENTRY_RECORDED,
        commandId: "old-ledger",
        expectedPortfolioVersion: 3,
        payload: {
          ledgerEntries: [
            {
              action: "CONSUME",
              amountMinorUnits: 1000,
              portfolioItemId: "item_a",
              ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId,
              ruleVersion: DEFAULT_CAP_RULE.ruleVersion,
              sequence: 1
            }
          ],
          ledgerSignature: "old-signature"
        },
        userId: user.userId,
        runId: "run-1",
        now: "2026-07-10T10:03:00.000Z"
      })
    ]);

    const aggregateB = buildManualAggregate({
      item_c: buildItem("item_c", "HYPOTHETICAL", 20000, 0),
      item_b: buildItem("item_b", "COMPLETED", 70000, 70000),
      item_a: buildItem("item_a", "COMPLETED", 60000, 60000)
    });

    const readA = calculatePortfolioReadModel({
      aggregate: aggregateA,
      scenarioId: "scenario-a",
      calculationBinding: "calc-v1",
      calculationRunId: "run-2"
    });
    const readB = calculatePortfolioReadModel({
      aggregate: aggregateB,
      scenarioId: "scenario-a",
      calculationBinding: "calc-v1",
      calculationRunId: "run-2"
    });

    const consumedTotal = readA.ledger.entries
      .filter((entry) => entry.action === "CONSUME")
      .reduce((sum, entry) => sum + entry.amountMinorUnits, 0);

    expect(readA.grossPotentialMinorUnits).toBe(150000);
    expect(readA.remainingMarginalValueMinorUnits + readA.sharedEffects.cap.capUtilizationMinorUnits).toBe(DEFAULT_CAP_RULE.capMinorUnits);
    expect(consumedTotal).toBe(readA.sharedEffects.cap.capUtilizationMinorUnits);
    expect(readA.orderedPrefixChecks.totalAllocatedMinorUnits).toBe(consumedTotal);
    expect(readA.ledger.entries.every((entry) => Number.isInteger(entry.amountMinorUnits) && entry.amountMinorUnits >= 0)).toBe(true);
    expect(readA.ledger.signature).toBe(readB.ledger.signature);
    expect(readA.items.map((item) => item.portfolioItemId)).toEqual(["item_a", "item_b", "item_c"]);
    expect(readA.items.map((item) => item.portfolioItemId)).toEqual(readB.items.map((item) => item.portfolioItemId));
    expect(readA.remainingMarginalValueMinorUnits).toBe(readB.remainingMarginalValueMinorUnits);
  });
});

describe("portfolio handlers", () => {
  it("leaves the new write path off by default", async () => {
    expect(isPortfolioFeatureEnabled({})).toBe(false);

    try {
      readPortfolioHandler({
        db: createMockDb(),
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        intake: { portfolioSeedItems: [] },
        scenarioId: "default",
        now: new Date("2026-07-10T10:05:00.000Z")
      });
      throw new Error("Expected the portfolio read path to be disabled.");
    } catch (error) {
      expect(error).toMatchObject({
        status: 404,
        code: "PORTFOLIO_FEATURE_DISABLED"
      });
    }
  });

  it("supports idempotent completion, rejects payload drift, and blocks stale versions when pre-seeded", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const seedItems = [
      {
        portfolioItemId: "item_a",
        title: "Lighting",
        independentFinancialValueMinorUnits: 60000,
        ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
      },
      {
        portfolioItemId: "item_b",
        title: "HVAC",
        independentFinancialValueMinorUnits: 70000,
        ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
      }
    ];
    const seed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems,
      now: "2026-07-10T10:05:00.000Z"
    });
    const db = createMockDb(seed.seedRows);

    const command = {
      commandId: "complete-item-a-001",
      idempotencyKey: "idem-001",
      expectedPortfolioVersion: seed.aggregate.aggregateVersion,
      calculationBinding: "calc-v1",
      financialSelection: {
        requestedBenefitMinorUnits: 60000
      }
    };

    const first = await completePortfolioItemHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      itemId: "item_a",
      payload: command,
      scenarioId: "default",
      now: new Date("2026-07-10T10:06:00.000Z")
    });

    expect(first.status).toBe("ACCEPTED");
    expect(first.portfolioVersion).toBeGreaterThan(1);
    expect(db.items.filter((item) => item.recordType === "EVENT")).toHaveLength(4);
    const snapshotRow = db.items.find(
      (item) =>
        item.recordType === "SNAPSHOT" && item.stateKey === "SNAPSHOT#PRIMARY",
    );
    expect(snapshotRow?.aggregateVersion).toBe(first.portfolioVersion);
    expect(snapshotRow?.eventCount).toBe(4);
    expect(db.items.find((item) => item.recordType === "SNAPSHOT" && item.stateKey === "SNAPSHOT#PRIMARY")?.itemOrder).toEqual(["item_a", "item_b"]);
    expect(db.items.find((item) => item.recordType === "SNAPSHOT" && item.stateKey === "SNAPSHOT#PRIMARY")?.eventCount).toBe(4);
    expect(db.items.find((item) => item.stateScope === "PORTFOLIO_IDEMPOTENCY#portfolio_client_001#default" && item.stateKey === "idem-001")?.result).toEqual(first);

    const reread = await loadPortfolioById({
      db,
      tableName: "gbs-api-runtime-state",
      portfolioId,
      userId: user.userId,
    });
    expect(reread.snapshot?.aggregateVersion).toBe(first.portfolioVersion);

    const second = await completePortfolioItemHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      itemId: "item_b",
      payload: {
        commandId: "complete-item-b-001",
        idempotencyKey: "idem-004",
        expectedPortfolioVersion: first.portfolioVersion,
        calculationBinding: "calc-v1",
        financialSelection: {
          requestedBenefitMinorUnits: 70000
        }
      },
      scenarioId: "default",
      now: new Date("2026-07-10T10:06:15.000Z")
    });

    expect(second.status).toBe("ACCEPTED");
    expect(second.portfolioVersion).toBeGreaterThan(first.portfolioVersion);

    const duplicate = await completePortfolioItemHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      itemId: "item_a",
      payload: command,
      scenarioId: "default",
      now: new Date("2026-07-10T10:06:30.000Z")
    });

    expect(duplicate).toEqual(first);
    expect(db.items.filter((item) => item.recordType === "EVENT")).toHaveLength(7);

    await expect(
      completePortfolioItemHandler({
        db,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        itemId: "item_a",
        payload: {
          ...command,
          idempotencyKey: "idem-001",
          financialSelection: {
            requestedBenefitMinorUnits: 59000
          }
        },
        scenarioId: "default",
        now: new Date("2026-07-10T10:07:00.000Z")
      })
    ).rejects.toMatchObject({
      status: 409,
      code: "PORTFOLIO_IDEMPOTENCY_CONFLICT"
    });

    await expect(
      completePortfolioItemHandler({
        db,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        itemId: "item_b",
        payload: {
          ...command,
          idempotencyKey: "idem-003",
          expectedPortfolioVersion: 1
        },
        scenarioId: "default",
        now: new Date("2026-07-10T10:07:30.000Z")
      })
    ).rejects.toMatchObject({
      status: 409,
      code: "PORTFOLIO_VERSION_CONFLICT"
    });

    await expect(
      recalculatePortfolioHandler({
        db,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        payload: {
          commandId: "recalc-stale-001",
          idempotencyKey: "recalc-idem-001",
          expectedCalculationRun: "run-1"
        },
        scenarioId: "default",
        now: new Date("2026-07-10T10:08:00.000Z")
      })
    ).rejects.toMatchObject({
      status: 409,
      code: "PORTFOLIO_CALCULATION_STALE"
    });
  });

  it("isolates idempotency receipts by scenario", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const seed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_a",
          title: "Lighting",
          independentFinancialValueMinorUnits: 60000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        }
      ],
      scenarioId: "scenario-b",
      now: "2026-07-10T10:06:00.000Z"
    });
    const db = createMockDb([
      ...seed.seedRows,
      {
        stateScope: "PORTFOLIO_IDEMPOTENCY#portfolio_client_001#scenario-a",
        stateKey: "idem-001",
        payloadHash: "scenario-a-hash",
        commandId: "complete-item-a-001",
        result: {
          status: "ACCEPTED",
          scenarioId: "scenario-a"
        },
        createdAt: "2026-07-10T10:06:01.000Z"
      }
    ]);

    const response = await completePortfolioItemHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      itemId: "item_a",
      payload: {
        commandId: "complete-item-a-001",
        idempotencyKey: "idem-001",
        expectedPortfolioVersion: seed.aggregate.aggregateVersion,
        calculationBinding: "calc-v1",
        financialSelection: {
          requestedBenefitMinorUnits: 60000
        }
      },
      scenarioId: "scenario-b",
      now: new Date("2026-07-10T10:06:30.000Z")
    });

    expect(response.status).toBe("ACCEPTED");
    expect(
      db.items.find(
        (item) =>
          item.stateScope === "PORTFOLIO_IDEMPOTENCY#portfolio_client_001#scenario-b" &&
          item.stateKey === "idem-001",
      )?.result,
    ).toMatchObject({
      status: "ACCEPTED",
      scenarioId: "scenario-b"
    });
  });

  it("does not create an empty snapshot when reading an uninitialized portfolio", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const db = createMockDb();
    const calls = [];
    const trackingDb = {
      ...db,
      send: async (command) => {
        calls.push(command.constructor.name);
        return db.send(command);
      },
    };

    await expect(
      readPortfolioHandler({
        db: trackingDb,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        scenarioId: "default",
        now: new Date("2026-07-10T10:09:00.000Z")
      })
    ).rejects.toMatchObject({
      status: 409,
      code: "PORTFOLIO_NOT_INITIALIZED"
    });
    expect(calls).toContain("QueryCommand");
    expect(calls).not.toContain("TransactWriteCommand");
  });

  it("supports explicit snapshot read after seeded initialization", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const seed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_read_b",
          title: "HVAC",
          independentFinancialValueMinorUnits: 20000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        },
        {
          portfolioItemId: "item_read_a",
          title: "Lighting",
          independentFinancialValueMinorUnits: 10000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        }
      ],
      now: "2026-07-10T10:10:00.000Z"
    });
    const seededDb = createMockDb(seed.seedRows);

    const result = await readPortfolioHandler({
      db: seededDb,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      scenarioId: "default",
      now: new Date("2026-07-10T10:10:00.000Z")
    });

    expect(result.portfolioVersion).toBe(1);
    expect(result.scenario.order).toEqual(["item_read_b", "item_read_a"]);
    expect(result.items.map((item) => item.portfolioItemId)).toEqual(["item_read_b", "item_read_a"]);
  });

  it("rejects reads when the requested scenario does not match the snapshot", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const seed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_read_mismatch",
          title: "Battery",
          independentFinancialValueMinorUnits: 20000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        }
      ],
      scenarioId: "scenario-read-a",
      now: "2026-07-10T10:12:00.000Z"
    });
    const db = createMockDb(seed.seedRows);

    await expect(
      readPortfolioHandler({
        db,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        scenarioId: "scenario-read-b",
        now: new Date("2026-07-10T10:12:00.000Z")
      })
    ).rejects.toMatchObject({
      status: 409,
      code: "PORTFOLIO_SCENARIO_MISMATCH"
    });
  });

  it("persists and serves non-default scenario portfolio state", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const nonDefaultScenario = "scenario-b";
    const seed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_read_b",
          title: "Roof",
          independentFinancialValueMinorUnits: 20000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        }
      ],
      scenarioId: nonDefaultScenario,
      now: "2026-07-10T10:15:00.000Z"
    });
    const db = createMockDb(seed.seedRows);

    const readResult = await readPortfolioHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      scenarioId: nonDefaultScenario,
      now: new Date("2026-07-10T10:15:00.000Z")
    });

    expect(readResult.scenario).toMatchObject({ scenarioId: nonDefaultScenario });

    const completeResult = await completePortfolioItemHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      itemId: "item_read_b",
      scenarioId: nonDefaultScenario,
      payload: {
        commandId: "complete-non-default",
        idempotencyKey: "complete-non-default-idem",
        expectedPortfolioVersion: seed.aggregate.aggregateVersion,
        calculationBinding: "calc-v1",
        financialSelection: {
          requestedBenefitMinorUnits: 10000
        }
      },
      now: new Date("2026-07-10T10:16:00.000Z")
    });

    expect(completeResult.portfolioVersion).toBe(seed.aggregate.aggregateVersion + 3);
  });

  it("recalculates and persists non-default scenario state", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const nonDefaultScenario = "scenario-c";
    const seed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_recalc_c",
          title: "Roof",
          independentFinancialValueMinorUnits: 25000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        }
      ],
      scenarioId: nonDefaultScenario,
      now: "2026-07-10T10:18:00.000Z"
    });
    const db = createMockDb(seed.seedRows);

    const recalculated = await recalculatePortfolioHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      payload: {
        commandId: "recalc-non-default",
        idempotencyKey: "recalc-non-default-idem"
      },
      scenarioId: nonDefaultScenario,
      now: new Date("2026-07-10T10:19:00.000Z")
    });

    expect(recalculated.scenarioId).toBe(nonDefaultScenario);
  });

  it("scopes idempotency rows by scenario and portfolio in recalc path", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const firstSeed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_idem_scope",
          title: "Roof",
          independentFinancialValueMinorUnits: 40000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        }
      ],
      scenarioId: "scenario-x",
      now: "2026-07-10T10:20:00.000Z"
    });
    const secondPortfolioId = "portfolio_client_002";
    const secondSeed = buildSeededPortfolioSnapshot({
      portfolioId: secondPortfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_idem_scope_2",
          title: "Roof 2",
          independentFinancialValueMinorUnits: 45000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        }
      ],
      scenarioId: "scenario-y",
      now: "2026-07-10T10:20:10.000Z"
    });
    const db = createMockDb([...firstSeed.seedRows, ...secondSeed.seedRows]);
    const secondUser = {
      role: "client",
      userId: secondPortfolioId
    };

    const first = await recalculatePortfolioHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user,
      portfolioId,
      payload: {
        commandId: "recalc-scope",
        idempotencyKey: "recalc-scope-idem"
      },
      scenarioId: "scenario-x",
      now: new Date("2026-07-10T10:21:00.000Z")
    });

    const second = await recalculatePortfolioHandler({
      db,
      tableName: "gbs-api-runtime-state",
      user: secondUser,
      portfolioId: secondPortfolioId,
      payload: {
        commandId: "recalc-scope",
        idempotencyKey: "recalc-scope-idem"
      },
      scenarioId: "scenario-y",
      now: new Date("2026-07-10T10:22:00.000Z")
    });

    expect(second.portfolioVersion).toBe(first.portfolioVersion);
    expect(
      db.items.find(
        (item) =>
          item.stateScope ===
            "PORTFOLIO_IDEMPOTENCY#portfolio_client_001#scenario-x"
          && item.stateKey === "recalc-scope-idem",
      ),
    ).toBeDefined();
    expect(
      db.items.find(
        (item) =>
          item.stateScope ===
            "PORTFOLIO_IDEMPOTENCY#portfolio_client_002#scenario-y"
          && item.stateKey === "recalc-scope-idem",
      ),
    ).toBeDefined();
  });

  it("rejects scenario-scoped writes when requested scenario differs from persisted snapshot", async () => {
    process.env.RETROFI_PORTFOLIO_WRITE_ENABLED = "1";
    const storedScenario = "scenario-stored";
    const requestScenario = "scenario-requested";
    const seed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_mismatch",
          title: "Boiler",
          independentFinancialValueMinorUnits: 30000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId
        }
      ],
      scenarioId: storedScenario,
      now: "2026-07-10T10:25:00.000Z"
    });
    const db = createMockDb(seed.seedRows);

    await expect(
      completePortfolioItemHandler({
        db,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        itemId: "item_mismatch",
        scenarioId: requestScenario,
        payload: {
          commandId: "complete-mismatch",
          idempotencyKey: "complete-mismatch-idem",
          expectedPortfolioVersion: seed.aggregate.aggregateVersion,
          calculationBinding: "calc-v1",
          financialSelection: {
            requestedBenefitMinorUnits: 10000
          }
        },
        now: new Date("2026-07-10T10:25:30.000Z")
      })
    ).rejects.toMatchObject({
      status: 409,
      code: "PORTFOLIO_SCENARIO_MISMATCH"
    });

    await expect(
      recalculatePortfolioHandler({
        db,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        scenarioId: requestScenario,
        payload: {
          commandId: "recalc-mismatch",
          idempotencyKey: "recalc-mismatch-idem"
        },
        now: new Date("2026-07-10T10:26:00.000Z")
      })
    ).rejects.toMatchObject({
      status: 409,
      code: "PORTFOLIO_SCENARIO_MISMATCH"
    });
  });

  it("keeps write APIs disabled with zero DB calls", async () => {
    const db = createMockDb();
    let dbCalls = 0;
    const trackingDb = {
      ...db,
      send: async (command) => {
        dbCalls += 1;
        return db.send(command);
      },
    };

    await expect(
      completePortfolioItemHandler({
        db: trackingDb,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        itemId: "item_a",
        payload: {
          commandId: "complete-disabled",
          idempotencyKey: "complete-disabled-idem",
          expectedPortfolioVersion: 1,
          calculationBinding: "calc-v1"
        },
        scenarioId: "default",
        now: new Date("2026-07-10T10:11:00.000Z")
      })
    ).rejects.toMatchObject({
      status: 404,
      code: "PORTFOLIO_FEATURE_DISABLED"
    });

    await expect(
      recalculatePortfolioHandler({
        db: trackingDb,
        tableName: "gbs-api-runtime-state",
        user,
        portfolioId,
        payload: {
          commandId: "recalc-disabled",
          idempotencyKey: "recalc-disabled-idem"
        },
        scenarioId: "default",
        now: new Date("2026-07-10T10:12:00.000Z")
      })
    ).rejects.toMatchObject({
      status: 404,
      code: "PORTFOLIO_FEATURE_DISABLED"
    });
    expect(dbCalls).toBe(0);
  });

  it("uses consistent reads for portfolio and idempotency persistence lookups", async () => {
    const seed = buildSeededPortfolioSnapshot({
      portfolioId,
      userId: user.userId,
      seedItems: [
        {
          portfolioItemId: "item_read_consistency",
          title: "Boiler",
          independentFinancialValueMinorUnits: 15000,
          ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId,
        },
      ],
      now: "2026-07-10T10:30:00.000Z",
    });
    const baseDb = createMockDb(seed.seedRows);
    const queryCalls = [];
    const getCalls = [];
    const trackingDb = {
      ...baseDb,
      send: async (command) => {
        if (command.constructor.name === "QueryCommand") {
          queryCalls.push(command.input);
        }
        if (command.constructor.name === "GetCommand") {
          getCalls.push(command.input);
        }
        return baseDb.send(command);
      },
    };

    await loadPortfolioById({
      db: trackingDb,
      tableName: "gbs-api-runtime-state",
      portfolioId,
      userId: user.userId,
    });
    await loadIdempotencyReceipt({
      db: trackingDb,
      tableName: "gbs-api-runtime-state",
      portfolioId,
      scenarioId: "default",
      idempotencyKey: "consistency-idem",
    });

    expect(queryCalls).toHaveLength(1);
    expect(queryCalls[0].ConsistentRead).toBe(true);
    expect(getCalls).toHaveLength(2);
    expect(getCalls.every((command) => command.ConsistentRead)).toBe(true);
  });
});

function buildSeededPortfolioSnapshot({
  portfolioId: portfolioIdInput,
  userId,
  seedItems,
  scenarioId = "default",
  now
}) {
  const seedTime = now || new Date().toISOString();
  const seedEvent = createEventEnvelope({
    portfolioId: portfolioIdInput,
    portfolioItemId: null,
    type: "PORTFOLIO_SNAPSHOT_SEEDED",
    commandId: `seed-${String(portfolioIdInput)}-${Date.now()}`,
    expectedPortfolioVersion: 0,
    payload: {
      scenarioId,
      items: seedItems,
      calculationBinding: "calc-v1"
    },
    userId,
    runId: "run-0",
    now: seedTime
  });
  const aggregate = loadAggregateFromEvents({
    events: [seedEvent],
    portfolioId: portfolioIdInput,
    userId,
    scenarioId
  });
  const scope = `PORTFOLIO#${portfolioIdInput}`;
  const seedRows = [
    {
      ...seedEvent,
      stateScope: scope,
      stateKey: "EVENT#000000001",
      recordType: "EVENT"
    },
    {
      stateScope: scope,
      stateKey: "SNAPSHOT#PRIMARY",
      recordType: "SNAPSHOT",
      scenarioId,
      aggregateVersion: aggregate.aggregateVersion,
      portfolioId: portfolioIdInput,
      userId,
      latestCalculationBinding: "calc-v1",
      calculationRunId: "run-0",
      calculationRunSequence: 0,
      eventCount: aggregate.events.length,
      itemOrder: aggregate.itemOrder,
      updatedAt: seedTime
    }
  ];
  return { aggregate, seedRows };
}

function buildManualAggregate(items, events = []) {
  return {
    aggregateType: "retrofit-portfolio",
    aggregateVersion: 3,
    portfolioId,
    userId: user.userId,
    scenarioId: "scenario-a",
    items,
    itemOrder: [],
    completedItemOrder: [],
    abandonedItemOrder: [],
    events,
    snapshotHash: "snapshot-hash",
    latestCommandId: null,
    derived: {
      calculationBinding: "calc-v1",
      totalEvents: events.length,
      correctedEventCount: 0,
      totalLedgerEntries: events.length,
      lastCalculationStartedAt: null,
      latestCalculationRun: "run-1"
    }
  };
}

function buildItem(portfolioItemId, status, independentFinancialValueMinorUnits, requestedBenefitMinorUnits) {
  return {
    portfolioItemId,
    lifecycle: status === "COMPLETED" ? "COMPLETED" : "HYPOTHETICAL",
    status,
    title: portfolioItemId,
    independentFinancialValueMinorUnits,
    financialModelId: "model-1",
    ruleFamilyId: DEFAULT_CAP_RULE.ruleFamilyId,
    sequenceHint: portfolioItemId,
    financialSelection: {
      requestedBenefitMinorUnits
    }
  };
}

function createMockDb(initialItems = []) {
  const items = [...initialItems];

  return {
    items,
    send: async (command) => {
      const name = command.constructor.name;
      if (name === "GetCommand") {
        return {
          Item: findItem(items, command.input.Key.stateScope, command.input.Key.stateKey)
        };
      }
      if (name === "QueryCommand") {
        const scope = command.input.ExpressionAttributeValues[":stateScope"];
        return {
          Items: items
            .filter((item) => item.stateScope === scope)
            .sort((a, b) => String(a.stateKey).localeCompare(String(b.stateKey)))
        };
      }
      if (name === "TransactWriteCommand") {
        const staged = [...items];
        for (const entry of command.input.TransactItems) {
          if (entry.Put) {
            const input = entry.Put;
            const existing = findItem(staged, input.Item.stateScope, input.Item.stateKey);
            enforceCondition(existing, input);
            upsert(staged, input.Item);
          }
        }
        items.splice(0, items.length, ...staged);
        return {};
      }
      if (name === "PutCommand") {
        const input = command.input;
        const existing = findItem(items, input.Item.stateScope, input.Item.stateKey);
        enforceCondition(existing, input);
        upsert(items, input.Item);
        return {};
      }
      if (name === "DeleteCommand") {
        const index = items.findIndex(
          (item) => item.stateScope === command.input.Key.stateScope && item.stateKey === command.input.Key.stateKey
        );
        if (index >= 0) items.splice(index, 1);
        return {};
      }
      throw new Error(`Unhandled command ${name}`);
    }
  };
}

function findItem(items, stateScope, stateKey) {
  return items.find((item) => item.stateScope === stateScope && item.stateKey === stateKey) || null;
}

function enforceCondition(existing, input) {
  const condition = String(input.ConditionExpression || "");
  if (!condition) return;

  if (condition.includes("attribute_not_exists(stateScope) AND attribute_not_exists(stateKey)")) {
    if (existing) {
      throw conditionalCheckFailed();
    }
    return;
  }

  if (condition.includes("attribute_not_exists(aggregateVersion) OR aggregateVersion = :expectedVersion")) {
    const expected = input.ExpressionAttributeValues?.[":expectedVersion"];
    if (existing && existing.aggregateVersion !== expected) {
      throw conditionalCheckFailed();
    }
    return;
  }

  if (condition.includes("attribute_not_exists(aggregateVersion)")) {
    if (existing) {
      throw conditionalCheckFailed();
    }
  }
}

function conditionalCheckFailed() {
  const error = new Error("Conditional check failed.");
  error.name = "ConditionalCheckFailedException";
  return error;
}

function upsert(items, nextItem) {
  const index = items.findIndex(
    (item) => item.stateScope === nextItem.stateScope && item.stateKey === nextItem.stateKey
  );
  if (index >= 0) {
    items[index] = nextItem;
    return;
  }
  items.push(nextItem);
}

function cloneEvent(event) {
  return JSON.parse(JSON.stringify(event));
}
