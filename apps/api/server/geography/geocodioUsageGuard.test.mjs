import { describe, expect, it, vi } from "vitest";
import { reserveGeocodioLookup } from "./geocodioUsageGuard.mjs";

describe("geocodio usage guard", () => {
  it("reserves a lookup with a conditional daily counter", async () => {
    const db = fakeDb([
      {
        Attributes: {
          usageCount: 12
        }
      }
    ]);

    const result = await reserveGeocodioLookup({
      db,
      tableName: "gbs-api-runtime-state",
      now: "2026-07-02T23:00:00.000Z",
      limit: 2500,
      logger: silentLogger()
    });

    expect(result.allowed).toBe(true);
    expect(result.usageDate).toBe("2026-07-02");
    expect(result.usageCount).toBe(12);
    expect(db.send).toHaveBeenCalledTimes(1);
    expect(db.send.mock.calls[0][0].input).toMatchObject({
      TableName: "gbs-api-runtime-state",
      Key: {
        stateScope: "geocodio",
        stateKey: "usage:2026-07-02"
      },
      ConditionExpression: "attribute_not_exists(usageCount) OR usageCount < :limit"
    });
  });

  it("blocks when the daily quota has already been exhausted", async () => {
    const error = new Error("quota reached");
    error.name = "ConditionalCheckFailedException";
    const db = fakeDb([Promise.reject(error)]);

    const result = await reserveGeocodioLookup({
      db,
      tableName: "gbs-api-runtime-state",
      now: "2026-07-02T23:00:00.000Z",
      limit: 2500,
      logger: silentLogger()
    });

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("quota_exhausted");
    expect(result.usageCount).toBe(2500);
  });

  it("marks the daily quota alert and sends email when the limit is reached", async () => {
    const db = fakeDb([
      { Attributes: { usageCount: 2500 } },
      { Attributes: { quotaAlertSentAt: "2026-07-02T23:00:00.000Z" } }
    ]);
    const sesClient = {
      send: vi.fn(async () => ({}))
    };

    const result = await reserveGeocodioLookup({
      db,
      tableName: "gbs-api-runtime-state",
      now: "2026-07-02T23:00:00.000Z",
      limit: 2500,
      alertEmailTo: "neerkuchlous@gmail.com",
      alertEmailFrom: "neerkuchlous@gmail.com",
      sesClient,
      logger: silentLogger()
    });

    expect(result.allowed).toBe(true);
    expect(result.alert).toEqual({ attempted: true, sent: true });
    expect(db.send).toHaveBeenCalledTimes(2);
    expect(db.send.mock.calls[1][0].input).toMatchObject({
      TableName: "gbs-api-runtime-state",
      Key: {
        stateScope: "geocodio",
        stateKey: "usage:2026-07-02"
      },
      ConditionExpression: "attribute_not_exists(quotaAlertSentAt)"
    });
    expect(sesClient.send).toHaveBeenCalledTimes(1);
  });

  it("fails closed when the quota table is unavailable", async () => {
    const db = fakeDb([Promise.reject(new Error("dynamodb down"))]);

    const result = await reserveGeocodioLookup({
      db,
      tableName: "gbs-api-runtime-state",
      now: "2026-07-02T23:00:00.000Z",
      limit: 2500,
      logger: silentLogger()
    });

    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("quota_check_failed");
  });
});

function fakeDb(responses) {
  const queue = [...responses];
  return {
    send: vi.fn(async () => {
      const next = queue.shift();
      return await next;
    })
  };
}

function silentLogger() {
  return {
    error: vi.fn()
  };
}
