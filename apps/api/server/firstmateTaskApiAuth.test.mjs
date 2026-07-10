import crypto from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

const originalEnv = { ...process.env };

afterEach(() => {
  vi.doUnmock("@aws-sdk/lib-dynamodb");
  vi.resetModules();
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
});

function hashPasswordSessionToken(token) {
  return crypto.createHash("sha256").update(token).digest("base64url");
}

function buildUser({ role, token }) {
  return {
    userId: `${role}-user`,
    role,
    status: "active",
    email: `${role}@example.com`,
    fullName: `${role} user`,
    passwordSessionHash: hashPasswordSessionToken(token),
    passwordSessionExpiresAt: "2099-01-01T00:00:00.000Z"
  };
}

function createMockDocumentClient({ users = [], manifest = null, taskItems = [], reportItems = [] } = {}) {
  const commands = [];
  return {
    commands,
    async send(command) {
      const name = command.constructor.name;
      const input = command.input;
      commands.push({ name, input: command.input });
      if (name === "ScanCommand") {
        return { Items: users };
      }
      if (name === "GetCommand") {
        if (input.Key.stateKey === "MANIFEST") {
          return { Item: manifest };
        }
        return {
          Item: [...taskItems, ...reportItems].find(
            (item) => item.stateScope === input.Key.stateScope && item.stateKey === input.Key.stateKey
          )
        };
      }
      if (name === "QueryCommand") {
        return { Items: taskItems };
      }
      throw new Error(`Unhandled command ${name}`);
    }
  };
}

async function importAppWithDb(mockDb) {
  process.env.AWS_LAMBDA_FUNCTION_NAME = "vitest";
  process.env.AWS_EXECUTION_ENV = "AWS_Lambda_nodejs20.x";
  process.env.GBS_USERS_TABLE = "usersTable";
  process.env.GBS_FIRSTMATE_TASKS_TABLE = "firstmateTasksTable";
  process.env.RETROFI_ENABLE_FIRSTMATE_TASKS = "";
  process.env.RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS = "";
  vi.doMock("@aws-sdk/lib-dynamodb", async () => {
    const actual = await vi.importActual("@aws-sdk/lib-dynamodb");
    return {
      ...actual,
      DynamoDBDocumentClient: {
        from: () => mockDb
      }
    };
  });
  const { app } = await import("./index.mjs");
  return app;
}

async function withServer(app, callback) {
  const server = await new Promise((resolve) => {
    const nextServer = app.listen(0, "127.0.0.1", () => resolve(nextServer));
  });
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  try {
    return await callback(baseUrl);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

describe("Firstmate task API admin authorization", () => {
  it("rejects unauthenticated task and report reads with the consistent error shape", async () => {
    const mockDb = createMockDocumentClient();
    const app = await importAppWithDb(mockDb);

    await withServer(app, async (baseUrl) => {
      const tasksResponse = await fetch(`${baseUrl}/api/admin/firstmate/tasks`);
      expect(tasksResponse.status).toBe(401);
      await expect(tasksResponse.json()).resolves.toEqual({ error: "Admin sign-in is required." });

      const reportResponse = await fetch(`${baseUrl}/api/admin/firstmate/tasks/current-task/report`);
      expect(reportResponse.status).toBe(401);
      await expect(reportResponse.json()).resolves.toEqual({ error: "Admin sign-in is required." });
    });

    expect(mockDb.commands).toEqual([]);
  });

  it("rejects non-admin task and report reads before querying the task snapshot table", async () => {
    const clientToken = "client-session-token";
    const mockDb = createMockDocumentClient({
      users: [buildUser({ role: "client", token: clientToken })]
    });
    const app = await importAppWithDb(mockDb);

    await withServer(app, async (baseUrl) => {
      const tasksResponse = await fetch(`${baseUrl}/api/admin/firstmate/tasks`, {
        headers: { "x-gbs-password-session": clientToken }
      });
      expect(tasksResponse.status).toBe(403);
      await expect(tasksResponse.json()).resolves.toEqual({ error: "This account does not have admin access." });

      const reportResponse = await fetch(`${baseUrl}/api/admin/firstmate/tasks/current-task/report`, {
        headers: { "x-gbs-password-session": clientToken }
      });
      expect(reportResponse.status).toBe(403);
      await expect(reportResponse.json()).resolves.toEqual({ error: "This account does not have admin access." });
    });

    expect(mockDb.commands.map((command) => command.name)).toEqual(["ScanCommand", "ScanCommand"]);
    expect(mockDb.commands.some((command) => command.input.TableName === "firstmateTasksTable")).toBe(false);
  });

  it("allows an admin to load the current sanitized task snapshot", async () => {
    const adminToken = "admin-session-token";
    const mockDb = createMockDocumentClient({
      users: [buildUser({ role: "admin", token: adminToken })],
      manifest: {
        stateScope: "FIRSTMATE_TASKS#retrofi",
        stateKey: "MANIFEST",
        entityType: "FIRSTMATE_TASK_SNAPSHOT_MANIFEST",
        schemaVersion: 1,
        workspaceId: "retrofi",
        snapshotVersion: "0123456789abcdef0123456789abcdef",
        totalTaskCount: 1,
        activeTaskCount: 1,
        inactiveTaskCount: 0,
        sourceGeneratedAt: "2026-07-09T12:00:00.000Z",
        sourceModifiedAtEpochMs: 1000
      },
      taskItems: [
        {
          stateScope: "FIRSTMATE_TASKS#retrofi#SNAPSHOT#0123456789abcdef0123456789abcdef",
          stateKey: "TASK#current-task",
          entityType: "FIRSTMATE_TASK",
          schemaVersion: 1,
          task: {
            id: "current-task",
            title: "Current Codex task",
            kind: "codex",
            repo: "green-business-solution",
            project: null,
            state: "working",
            active: true,
            blocked: false,
            blockedBy: [],
            responseNeeded: false,
            canRespond: false,
            hasReport: true,
            reportUrl: "/tasks/reports/current-task",
            reportStatus: "final",
            reportIsFinal: true,
            reportReviewReady: false,
            canSendReportFeedback: false,
            gptProRepairUrl: null,
            gptProRepairFallback: false
          }
        }
      ],
      reportItems: [
        {
          stateScope: "FIRSTMATE_TASKS#retrofi#SNAPSHOT#0123456789abcdef0123456789abcdef",
          stateKey: "REPORT#current-task",
          entityType: "FIRSTMATE_TASK_REPORT",
          schemaVersion: 1,
          report: {
            taskId: "current-task",
            taskState: "working",
            reportStatus: "final",
            reportStatusLabel: "Final report",
            reportIsFinal: true,
            reportReviewReady: false,
            canSendReportFeedback: false,
            markdown: "# Safe report\n\nAdmin-readable sanitized summary.",
            markdownTruncated: false,
            markdownMaxChars: 24000
          }
        }
      ]
    });
    const app = await importAppWithDb(mockDb);

    await withServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/admin/firstmate/tasks`, {
        headers: { "x-gbs-password-session": adminToken }
      });
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toMatchObject({
        enabled: true,
        source: "dynamodb",
        authMode: "admin",
        snapshotVersion: "0123456789abcdef0123456789abcdef",
        totalTaskCount: 1
      });
      expect(body.tasks).toEqual([
        expect.objectContaining({
          id: "current-task",
          state: "working",
          project: null,
          reportUrl: "/tasks/reports/current-task"
        })
      ]);

      const reportResponse = await fetch(`${baseUrl}/api/admin/firstmate/tasks/current-task/report`, {
        headers: { "x-gbs-password-session": adminToken }
      });
      expect(reportResponse.status).toBe(200);
      await expect(reportResponse.json()).resolves.toMatchObject({
        source: "dynamodb",
        taskId: "current-task",
        reportStatus: "final",
        markdown: "# Safe report Admin-readable sanitized summary."
      });
    });

    expect(mockDb.commands.map((command) => command.name)).toEqual([
      "ScanCommand",
      "GetCommand",
      "QueryCommand",
      "ScanCommand",
      "GetCommand",
      "GetCommand",
      "GetCommand"
    ]);
  });

  it("returns a consistent admin-only missing-report response when no report payload exists", async () => {
    const adminToken = "admin-session-token";
    const mockDb = createMockDocumentClient({
      users: [buildUser({ role: "admin", token: adminToken })],
      manifest: {
        stateScope: "FIRSTMATE_TASKS#retrofi",
        stateKey: "MANIFEST",
        entityType: "FIRSTMATE_TASK_SNAPSHOT_MANIFEST",
        schemaVersion: 1,
        workspaceId: "retrofi",
        snapshotVersion: "0123456789abcdef0123456789abcdef",
        totalTaskCount: 1,
        sourceModifiedAtEpochMs: 1000
      },
      taskItems: [
        {
          stateScope: "FIRSTMATE_TASKS#retrofi#SNAPSHOT#0123456789abcdef0123456789abcdef",
          stateKey: "TASK#missing-report-task",
          entityType: "FIRSTMATE_TASK",
          schemaVersion: 1,
          task: {
            id: "missing-report-task",
            title: "Missing report task",
            kind: "codex",
            repo: "green-business-solution",
            state: "working",
            active: true,
            blocked: false,
            blockedBy: [],
            responseNeeded: false,
            hasReport: false,
            reportUrl: null,
            reportStatus: "none",
            reportIsFinal: false,
            reportReviewReady: false,
            gptProRepairUrl: null,
            gptProRepairFallback: false
          }
        }
      ]
    });
    const app = await importAppWithDb(mockDb);

    await withServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/admin/firstmate/tasks/missing-report-task/report`, {
        headers: { "x-gbs-password-session": adminToken }
      });
      expect(response.status).toBe(404);
      await expect(response.json()).resolves.toEqual({ error: "Report not found." });
    });
  });
});
