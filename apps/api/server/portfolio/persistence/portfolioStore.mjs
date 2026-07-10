import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  TransactWriteCommand
} from "@aws-sdk/lib-dynamodb";
import {
  aggregateSnapshot as buildAggregateSnapshot,
  buildEmptyAggregate,
  loadAggregateFromEvents
} from "../domain/aggregate.mjs";

const portfolioStateKeys = {
  scopeFor: (portfolioId) => `PORTFOLIO#${String(portfolioId || "")}`,
  eventKey: (index) => `EVENT#${String(index).padStart(9, "0")}`,
  snapshotKey: "SNAPSHOT#PRIMARY",
  readModelKey: "READ_MODEL#PRIMARY",
  outboxPrefix: "OUTBOX#",
  idempotencyPrefix: "PORTFOLIO_IDEMPOTENCY"
};

export function rowScopeForOutbox(portfolioId) {
  return `PORTFOLIO_OUTBOX#${portfolioId}`;
}

export function rowScopeForIdempotency(portfolioId) {
  return `${portfolioStateKeys.idempotencyPrefix}#${portfolioId}`;
}

export async function loadPortfolioById({ db, tableName, portfolioId, userId }) {
  const scope = portfolioStateKeys.scopeFor(portfolioId);
  const rows = await queryScopeItems(db, tableName, scope);

  const events = rows
    .filter((row) => row.recordType === "EVENT")
    .sort((a, b) => a.stateKey.localeCompare(b.stateKey));
  const snapshot = rows.find((row) => row.recordType === "SNAPSHOT") || null;
  const readModel = rows.find((row) => row.recordType === "READ_MODEL") || null;

  const aggregate = snapshot
    ? loadAggregateFromEvents({
        events,
        portfolioId,
        userId,
        scenarioId: snapshot.scenarioId || "default"
      })
    : buildEmptyAggregate({ portfolioId, userId, scenarioId: "default" });

  return {
    aggregate,
    snapshot,
    readModel,
    events
  };
}

export async function seedPortfolioRecord({
  db,
  tableName,
  portfolioId,
  userId,
  seedItems,
  scenarioId,
  now,
  calculationBinding = "calc-v1"
}) {
  const seedEvent = {
    schemaVersion: "portfolio-event-v1",
    eventId: `seed-${cryptoRandom()}`,
    portfolioId,
    portfolioItemId: null,
    type: "PORTFOLIO_SNAPSHOT_SEEDED",
    commandId: `seed-${cryptoRandom()}`,
    expectedPortfolioVersion: 0,
    payload: {
      scenarioId,
      items: seedItems || [],
      calculationBinding
    },
    occurredAt: now.toISOString(),
    userId,
    runId: "run-0"
  };

  const aggregate = loadAggregateFromEvents({ events: [seedEvent], portfolioId, userId, scenarioId });

  const snapshot = {
    stateScope: portfolioStateKeys.scopeFor(portfolioId),
    stateKey: portfolioStateKeys.snapshotKey,
    recordType: "SNAPSHOT",
    scenarioId: aggregate.scenarioId,
    aggregateVersion: aggregate.aggregateVersion,
    portfolioId,
    userId,
    latestCalculationBinding: calculationBinding,
    calculationRunId: "run-0",
    calculationRunSequence: 0,
    eventCount: aggregate.aggregateVersion,
    updatedAt: now.toISOString()
  };

  const readModel = buildAggregateSnapshot({ aggregate, scenarioId: aggregate.scenarioId, calculationRunId: snapshot.calculationRunId });

  await appendPortfolioUpdate({
    db,
    tableName,
    portfolioId,
    expectedVersion: null,
    events: [seedEvent],
    snapshot,
    readModel,
    now,
    eventCount: 0
  });

  return { aggregate, snapshot, readModel };
}

export async function appendPortfolioUpdate({
  db,
  tableName,
  portfolioId,
  expectedVersion,
  events,
  snapshot,
  readModel,
  outboxRow,
  idempotencyReceipt,
  now = new Date(),
  eventCount = 0
}) {
  const scope = portfolioStateKeys.scopeFor(portfolioId);

  const transactItems = [];

  for (let index = 0; index < (events || []).length; index += 1) {
    const event = events[index];
    transactItems.push({
      Put: {
        TableName: tableName,
        Item: {
          ...event,
          stateScope: scope,
          stateKey: portfolioStateKeys.eventKey(eventCount + index + 1),
          recordType: "EVENT"
        },
        ConditionExpression: "attribute_not_exists(stateScope) AND attribute_not_exists(stateKey)"
      }
    });
  }

  transactItems.push({
    Put: {
      TableName: tableName,
      Item: {
        ...snapshot,
        stateScope: scope,
        stateKey: portfolioStateKeys.snapshotKey,
        recordType: "SNAPSHOT",
        aggregateVersion: snapshot.aggregateVersion,
        updatedAt: now.toISOString()
      },
      ConditionExpression: expectedVersion === null
        ? "attribute_not_exists(aggregateVersion)"
        : "attribute_not_exists(aggregateVersion) OR aggregateVersion = :expectedVersion",
      ExpressionAttributeValues: {
        ":expectedVersion": expectedVersion
      }
    }
  });

  if (readModel) {
    transactItems.push({
      Put: {
        TableName: tableName,
        Item: {
          stateScope: scope,
          stateKey: portfolioStateKeys.readModelKey,
          recordType: "READ_MODEL",
          data: readModel,
          calculationRunId: snapshot.calculationRunId,
          portfolioVersion: snapshot.aggregateVersion,
          updatedAt: now.toISOString()
        }
      }
    });
  }

  if (outboxRow) {
    transactItems.push({
      Put: {
        TableName: tableName,
        Item: {
          ...outboxRow,
          stateScope: rowScopeForOutbox(portfolioId),
          stateKey: `${portfolioStateKeys.outboxPrefix}${outboxRow.requestId}`,
          recordType: "OUTBOX",
          updatedAt: now.toISOString()
        },
        ConditionExpression: "attribute_not_exists(stateScope) AND attribute_not_exists(stateKey)"
      }
    });
  }

  if (idempotencyReceipt) {
    transactItems.push({
      Put: {
        TableName: tableName,
        Item: {
          stateScope: rowScopeForIdempotency(portfolioId),
          stateKey: String(idempotencyReceipt.idempotencyKey),
          payloadHash: idempotencyReceipt.payloadHash,
          commandId: idempotencyReceipt.commandId,
          result: idempotencyReceipt.result,
          createdAt: now.toISOString()
        },
        ConditionExpression: "attribute_not_exists(stateScope) AND attribute_not_exists(stateKey)"
      }
    });
  }

  await db.send(new TransactWriteCommand({ TransactItems: transactItems }));
}

export async function loadIdempotencyReceipt({ db, tableName, portfolioId, idempotencyKey }) {
  const result = await db.send(
    new GetCommand({
      TableName: tableName,
      Key: {
        stateScope: rowScopeForIdempotency(portfolioId),
        stateKey: String(idempotencyKey)
      }
    })
  );
  return result.Item || null;
}

export async function storeIdempotencyReceipt({
  db,
  tableName,
  portfolioId,
  idempotencyKey,
  payloadHash,
  commandId,
  result
}) {
  await db.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        stateScope: rowScopeForIdempotency(portfolioId),
        stateKey: String(idempotencyKey),
        payloadHash,
        commandId,
        result,
        createdAt: new Date().toISOString()
      },
      ConditionExpression: "attribute_not_exists(stateScope) AND attribute_not_exists(stateKey)"
    })
  );
}

export async function deleteOutboxRow({ db, tableName, portfolioId, requestId }) {
  await db.send(
    new DeleteCommand({
      TableName: tableName,
      Key: {
        stateScope: rowScopeForOutbox(portfolioId),
        stateKey: `${portfolioStateKeys.outboxPrefix}${requestId}`
      }
    })
  );
}

export function makeOutboxRow({ requestId, calculationRunId, scenarioId }) {
  return {
    requestId,
    calculationRunId,
    scenarioId
  };
}

function queryScopeItems(db, tableName, scope) {
  const items = [];
  return (async () => {
    let exclusiveStartKey = undefined;
    do {
      const response = await db.send(
        new QueryCommand({
          TableName: tableName,
          KeyConditionExpression: "#stateScope = :stateScope",
          ExpressionAttributeNames: { "#stateScope": "stateScope" },
          ExpressionAttributeValues: { ":stateScope": scope },
          ExclusiveStartKey: exclusiveStartKey
        })
      );
      items.push(...(response.Items || []));
      exclusiveStartKey = response.LastEvaluatedKey;
    } while (exclusiveStartKey);

    return items;
  })();
}

function cryptoRandom() {
  return Math.random().toString(16).slice(2);
}
