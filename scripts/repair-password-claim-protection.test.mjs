import { describe, expect, it } from "vitest";
import { parseArgs, runPasswordClaimProtectionRepair } from "./repair-password-claim-protection.mjs";

function createDbRecorder(records) {
  const calls = [];
  let scanCalls = 0;
  const scanPages = Array.isArray(records[0]?.Items) ? records : [
    {
      Items: records,
      LastEvaluatedKey: null,
    },
  ];

  const db = {
    send(command) {
      calls.push(command);
      const commandName = command.constructor.name;

      if (commandName === "ScanCommand") {
        scanCalls += 1;
        return scanPages[scanCalls - 1] || { Items: [], LastEvaluatedKey: null };
      }

      if (commandName === "UpdateCommand") {
        return {};
      }

      return {};
    },
  };

  return { calls, db };
}

describe("runPasswordClaimProtectionRepair", () => {
  it("protects vulnerable records with bounded, idempotent dry-run counts", async () => {
    const { calls, db } = createDbRecorder([
      {
        Items: [
          {
            userId: "u-admin-protected",
            status: "active",
            role: "admin",
            passwordLinked: false,
            passwordClaimProtected: true,
          },
        ],
        LastEvaluatedKey: { userId: "u-admin-protected" },
      },
      {
        Items: [
          {
            userId: "u-admin-vulnerable",
            status: "active",
            role: "admin",
            passwordLinked: false,
          },
        ],
        LastEvaluatedKey: null,
      },
    ]);

    const report = await runPasswordClaimProtectionRepair(
      {
        dryRun: true,
        usersTable: "gbs-users",
        maxUpdates: 2,
      },
      { db },
    );

    expect(report.mode).toBe("repair");
    expect(report.candidates).toBe(1);
    expect(report.protected).toBe(1);
    expect(report.alreadyProtected).toBe(1);
    expect(report.scanned).toBe(2);
    expect(report.skipped).toBe(0);
    expect(calls.filter((command) => command.constructor.name === "ScanCommand")).toHaveLength(2);
  });

  it("aliases reserved word role in scan projection and never emits bare role", async () => {
    const { calls, db } = createDbRecorder([
      {
        Items: [
          {
            userId: "u-admin-protected",
            status: "active",
            role: "admin",
            passwordLinked: false,
            passwordClaimProtected: true,
          },
        ],
        LastEvaluatedKey: null,
      },
    ]);

    const report = await runPasswordClaimProtectionRepair(
      {
        dryRun: true,
        usersTable: "gbs-users",
        maxUpdates: 1,
      },
      { db },
    );

    expect(report.scanned).toBe(1);

    const scanCommand = calls.find((command) => command.constructor.name === "ScanCommand");
    expect(scanCommand).toBeDefined();
    expect(scanCommand.input.ProjectionExpression).toContain("#role");
    expect(scanCommand.input.ProjectionExpression).not.toMatch(/(^|[ ,])role($|[ ,])/);
    expect(scanCommand.input.ExpressionAttributeNames).toMatchObject({
      "#role": "role",
      "#status": "status",
    });
    expect(scanCommand.input.ExpressionAttributeValues).toMatchObject({
      ":active": "active",
    });
  });

  it("rolls back only the selected run and respects conditional updates", async () => {
    const { calls, db } = createDbRecorder([
      {
        userId: "u-admin",
        status: "active",
        role: "admin",
        passwordClaimProtected: true,
        passwordClaimProtectionRunId: "run-A",
      },
      {
        userId: "u-other",
        status: "active",
        role: "admin",
        passwordClaimProtected: true,
        passwordClaimProtectionRunId: "run-B",
      },
    ]);

    const report = await runPasswordClaimProtectionRepair(
      {
        dryRun: false,
        rollback: true,
        runId: "run-A",
        usersTable: "gbs-users",
        maxUpdates: 10,
      },
      { db },
    );

    expect(report.mode).toBe("rollback");
    expect(report.restored).toBe(1);
    expect(report.skipped).toBe(1);
    expect(report.scanned).toBe(2);
    const updateCalls = calls.filter((command) => command.constructor.name === "UpdateCommand");
    expect(updateCalls).toHaveLength(1);
    const updateExpression = String(updateCalls[0].input.UpdateExpression || "");
    expect(updateExpression).toContain("REMOVE");
  });

  it("continues scanning across empty pages with a last evaluated key", async () => {
    const { calls, db } = createDbRecorder([
      {
        Items: [],
        LastEvaluatedKey: { userId: "page-2" },
        ScannedCount: 1,
      },
      {
        Items: [
          {
            userId: "u-late",
            status: "active",
            role: "admin",
            passwordLinked: false,
          },
        ],
        LastEvaluatedKey: null,
      },
    ]);

    const report = await runPasswordClaimProtectionRepair(
      {
        dryRun: true,
        usersTable: "gbs-users",
        maxUpdates: 10,
      },
      { db },
    );

    expect(report.scanned).toBe(2);
    expect(report.candidates).toBe(1);
    expect(report.protected).toBe(1);
    expect(calls.filter((command) => command.constructor.name === "ScanCommand")).toHaveLength(2);
  });

  it("stops after the configured scan budget even when rows are skipped", async () => {
    const { calls, db } = createDbRecorder([
      {
        Items: [
          {
            userId: "u-skip",
            status: "active",
            role: "member",
            passwordLinked: false,
          },
        ],
        LastEvaluatedKey: { userId: "u-skip" },
      },
      {
        Items: [
          {
            userId: "u-admin-vulnerable",
            status: "active",
            role: "admin",
            passwordLinked: false,
          },
        ],
        LastEvaluatedKey: null,
      },
    ]);

    const report = await runPasswordClaimProtectionRepair(
      {
        dryRun: true,
        usersTable: "gbs-users",
        maxUpdates: 1,
      },
      { db },
    );

    expect(report.scanned).toBe(1);
    expect(report.skipped).toBe(1);
    expect(report.protected).toBe(0);
    expect(calls.filter((command) => command.constructor.name === "ScanCommand")).toHaveLength(1);
  });

  it("caps repeated empty scanned pages to maxUpdates", async () => {
    const { calls, db } = createDbRecorder([
      {
        Items: [],
        LastEvaluatedKey: { userId: "page-2" },
        ScannedCount: 1,
      },
      {
        Items: [],
        LastEvaluatedKey: { userId: "page-3" },
        ScannedCount: 1,
      },
    ]);

    const report = await runPasswordClaimProtectionRepair(
      {
        dryRun: true,
        usersTable: "gbs-users",
        maxUpdates: 1,
      },
      { db },
    );

    expect(report.scanned).toBe(1);
    expect(calls.filter((command) => command.constructor.name === "ScanCommand")).toHaveLength(1);
  });

  it("requires an explicit run id for rollback mode", async () => {
    await expect(
      runPasswordClaimProtectionRepair(
        {
          dryRun: false,
          rollback: true,
          usersTable: "gbs-users",
          maxUpdates: 10,
        },
        {
          db: {
            send() {
              throw new Error("should not be called");
            },
          },
        },
      ),
    ).rejects.toThrow(/run-id/);
  });

  it("parses CLI arguments and rejects invalid max-updates", () => {
    expect(() => parseArgs(["--max-updates", "0"])).toThrow(/at least 1/);
  });
});
