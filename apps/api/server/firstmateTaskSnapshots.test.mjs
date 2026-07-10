import { describe, expect, it } from "vitest";
import {
  FIRSTMATE_TASK_REPORT_MARKDOWN_MAX_CHARS,
  buildFirstmateTaskSnapshotFromDashboard,
  firstmateTaskSnapshotScope,
  firstmateTaskWorkspaceScope,
  publishFirstmateTaskSnapshot,
  readPublishedFirstmateTaskReport,
  readPublishedFirstmateTaskSnapshot
} from "./firstmateTaskSnapshots.mjs";

function createMockDocumentClient({ queryPageSize = 1000 } = {}) {
  const items = [];

  function pageRows(rows, exclusiveStartKey) {
    const start = exclusiveStartKey?.mockOffset || 0;
    const page = rows.slice(start, start + queryPageSize);
    const nextOffset = start + queryPageSize;
    return {
      Items: page,
      LastEvaluatedKey: nextOffset < rows.length ? { mockOffset: nextOffset } : undefined
    };
  }

  return {
    items,
    async send(command) {
      const name = command.constructor.name;
      const input = command.input;
      if (name === "BatchWriteCommand") {
        for (const request of Object.values(input.RequestItems).flat()) {
          upsert(items, request.PutRequest.Item);
        }
        return {};
      }
      if (name === "PutCommand") {
        const existing = items.find(
          (item) => item.stateScope === input.Item.stateScope && item.stateKey === input.Item.stateKey
        );
        const existingSourceModifiedAt = existing?.sourceModifiedAtEpochMs ?? -1;
        const nextSourceModifiedAt = input.Item.sourceModifiedAtEpochMs ?? -1;
        const existingSnapshotVersion = existing?.snapshotVersion || "";
        const nextSnapshotVersion = input.Item.snapshotVersion || "";
        if (
          input.ConditionExpression &&
          existing &&
          (existingSourceModifiedAt > nextSourceModifiedAt ||
            (existingSourceModifiedAt === nextSourceModifiedAt && existingSnapshotVersion > nextSnapshotVersion))
        ) {
          const error = new Error("Conditional check failed.");
          error.name = "ConditionalCheckFailedException";
          throw error;
        }
        upsert(items, input.Item);
        return {};
      }
      if (name === "GetCommand") {
        return {
          Item: items.find(
            (item) => item.stateScope === input.Key.stateScope && item.stateKey === input.Key.stateKey
          )
        };
      }
      if (name === "QueryCommand") {
        const rows = items.filter((item) => item.stateScope === input.ExpressionAttributeValues[":scope"]);
        return pageRows(rows, input.ExclusiveStartKey);
      }
      throw new Error(`Unhandled command ${name}`);
    }
  };
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

function buildDashboard(tasks, generatedAt = "2026-07-09T12:00:00.000Z") {
  return {
    enabled: true,
    generatedAt,
    tasks
  };
}

describe("Firstmate task DynamoDB snapshots", () => {
  it("sanitizes unsafe fields and maps active work to stable snapshot states", () => {
    const snapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([
        {
          id: "active-task-a1",
          title: "Fix /Users/neer/source with token=abc123 for admin@example.com AKIA1234567890ABCDEF",
          kind: "codex",
          repo: "green-business-solution",
          project: "/Users/neer/source",
          state: "active",
          recentStatus: "working in /tmp/private with password=hunter2",
          blockedBy: ["safe-blocker-b2", "../../bad"],
          hasReport: true,
          reportUrl: "/tasks/reports/active-task-a1",
          reportActionLabel: "View report",
          gptProRepairUrl: "http://127.0.0.1:5173/chats"
        },
        {
          id: "completed-task-c1",
          title: "Completed task",
          kind: "codex",
          repo: "green-business-solution",
          state: "completed",
          reportUrl: "/tasks/reports/other-task"
        }
      ]),
      {
        now: new Date("2026-07-09T12:01:00.000Z"),
        reportsByTaskId: {
          "active-task-a1": {
            generatedAt: "2026-07-09T12:00:00.000Z",
            taskId: "active-task-a1",
            markdown: "# Report\n\nPath /Users/neer/private and password=abc123 for admin@example.com."
          }
        },
        sourceModifiedAtEpochMs: 1000,
        workspaceId: "retrofi"
      }
    );

    const activeTask = snapshot.tasks.find((task) => task.id === "active-task-a1");
    expect(activeTask).toMatchObject({
      state: "working",
      active: true,
      project: null,
      canRespond: false,
      canAssign: false,
      reportUrl: "/tasks/reports/active-task-a1",
      showReportAction: true
    });
    expect(activeTask).not.toHaveProperty("gptProRepairUrl");
    expect(activeTask).not.toHaveProperty("showGptProRepairAction");
    expect(activeTask).not.toHaveProperty("gptProRepairReady");
    expect(activeTask.title).not.toContain("/Users/");
    expect(activeTask.title).not.toContain("admin@example.com");
    expect(activeTask.title).not.toContain("AKIA1234567890ABCDEF");
    expect(activeTask.title).not.toContain("https://");
    expect(activeTask.recentStatus).not.toContain("/tmp/");
    expect(activeTask.recentStatus).not.toContain("hunter2");
    expect(activeTask.blockedBy).toEqual(["safe-blocker-b2"]);
    expect(snapshot.reports).toEqual([
      expect.objectContaining({
        taskId: "active-task-a1",
        markdown: "Report content redacted for admin preview.",
        markdownTruncated: false
      })
    ]);

    const completedTask = snapshot.tasks.find((task) => task.id === "completed-task-c1");
    expect(completedTask).toMatchObject({
      state: "completed",
      active: false,
      reportUrl: null,
      showReportAction: false
    });
    expect(snapshot.counts).toMatchObject({
      working: 1,
      active: 1,
      completed: 1
    });
  });

  it("strips raw URLs from snapshot task titles before publishing", () => {
    const snapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([
        {
          id: "backlog-pr-url-p7",
          title: "Repair title https://github.com/retrofi/green-business-solution/pull/393",
          kind: "codex",
          repo: "green-business-solution",
          state: "working"
        }
      ])
    );

    expect(snapshot.tasks[0]).toMatchObject({
      title: "Repair title"
    });
    expect(snapshot.tasks[0].title).not.toContain("https://github.com/retrofi/green-business-solution/pull/393");
  });

  it("keeps identical snapshot content on a stable version across repeat publishes", async () => {
    const db = createMockDocumentClient();
    const tableName = "firstmateTasksTable";
    const firstSnapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([{ id: "stable-task-s1", title: "Stable task", kind: "codex", repo: "green-business-solution", state: "working" }], "2026-07-09T12:00:00.000Z"),
      {
        now: new Date("2026-07-09T12:01:00.000Z"),
        sourceModifiedAtEpochMs: 2000
      }
    );
    const secondSnapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([{ id: "stable-task-s1", title: "Stable task", kind: "codex", repo: "green-business-solution", state: "working" }], "2026-07-09T12:30:00.000Z"),
      {
        now: new Date("2026-07-09T12:31:00.000Z"),
        sourceModifiedAtEpochMs: 2000
      }
    );

    expect(firstSnapshot.snapshotVersion).toBe(secondSnapshot.snapshotVersion);

    await publishFirstmateTaskSnapshot({ db, tableName, snapshot: firstSnapshot });
    await publishFirstmateTaskSnapshot({ db, tableName, snapshot: secondSnapshot });

    expect(
      db.items.filter(
        (item) =>
          item.stateScope === firstmateTaskSnapshotScope("retrofi", firstSnapshot.snapshotVersion) &&
          item.entityType === "FIRSTMATE_TASK"
      )
    ).toHaveLength(1);
    expect(await readPublishedFirstmateTaskSnapshot({ db, tableName, workspaceId: "retrofi" })).toMatchObject({
      totalTaskCount: 1,
      snapshotVersion: firstSnapshot.snapshotVersion
    });
  });

  it("publishes complete snapshots before advancing the manifest and hides inactive tasks by default", async () => {
    const db = createMockDocumentClient({ queryPageSize: 1 });
    const tableName = "firstmateTasksTable";
    const snapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([
        { id: "working-task-w1", title: "Working", kind: "codex", repo: "green-business-solution", state: "working" },
        { id: "queued-task-q1", title: "Queued", kind: "codex", repo: "green-business-solution", state: "queued" },
        {
          id: "completed-task-c1",
          title: "Completed",
          kind: "codex",
          repo: "green-business-solution",
          state: "completed",
          hasReport: true,
          reportUrl: "/tasks/reports/completed-task-c1"
        },
        {
          id: "review-ready-task-r1",
          title: "Review-ready report",
          kind: "codex",
          repo: "green-business-solution",
          state: "completed",
          hasReport: true,
          reportUrl: "/tasks/reports/review-ready-task-r1",
          reportStatus: "review-ready",
          reportReviewReady: true,
          reportIsFinal: false
        },
        { id: "archived-task-a1", title: "Archived", kind: "codex", repo: "green-business-solution", state: "archived" }
      ]),
      {
        now: new Date("2026-07-09T12:02:00.000Z"),
        reportsByTaskId: {
          "completed-task-c1": {
            taskId: "completed-task-c1",
            taskState: "completed",
            reportStatus: "final",
            reportStatusLabel: "Final report",
            reportIsFinal: true,
            markdown: "# Completed report\n\nStill readable after completion."
          },
          "review-ready-task-r1": {
            taskId: "review-ready-task-r1",
            taskState: "completed",
            reportStatus: "review-ready",
            reportStatusLabel: "Ready for review",
            reportReviewReady: true,
            markdown: "# Review ready report\n\nAwaiting admin feedback."
          }
        },
        sourceModifiedAtEpochMs: 2000
      }
    );

    await expect(publishFirstmateTaskSnapshot({ db, tableName, snapshot })).resolves.toMatchObject({
      published: true,
      snapshotVersion: snapshot.snapshotVersion,
      taskCount: 5,
      reportCount: 2
    });

    const manifest = db.items.find((item) => item.stateScope === firstmateTaskWorkspaceScope("retrofi") && item.stateKey === "MANIFEST");
    expect(manifest).toMatchObject({
      snapshotVersion: snapshot.snapshotVersion,
      totalTaskCount: 5,
      activeTaskCount: 2,
      inactiveTaskCount: 3,
      hiddenByDefaultTaskCount: 2
    });
    expect(
      db.items.filter(
        (item) =>
          item.stateScope === firstmateTaskSnapshotScope("retrofi", snapshot.snapshotVersion) &&
          item.entityType === "FIRSTMATE_TASK"
      )
    ).toHaveLength(5);

    const defaultRead = await readPublishedFirstmateTaskSnapshot({ db, tableName, workspaceId: "retrofi" });
    expect(defaultRead.enabled).toBe(true);
    expect(defaultRead.inactiveHidden).toBe(true);
    expect(defaultRead.tasks.map((task) => task.id)).toEqual(["working-task-w1", "queued-task-q1", "review-ready-task-r1"]);
    expect(defaultRead.counts).toMatchObject({
      completed: 1,
      reportsReady: 1
    });
    expect(defaultRead.tasks.find((task) => task.id === "review-ready-task-r1")).toMatchObject({
      state: "completed",
      active: false,
      defaultVisible: true,
      hiddenByDefault: false,
      reportReviewReady: true,
      reportUrl: "/tasks/reports/review-ready-task-r1"
    });
    expect(defaultRead.totalTaskCount).toBe(3);
    expect(defaultRead.activeAgentCount).toBe(1);
    expect(defaultRead.inactiveTaskCount).toBe(3);
    expect(defaultRead.hiddenByDefaultTaskCount).toBe(2);

    const markdownLinkSnapshot = buildFirstmateTaskSnapshotFromDashboard(
      {
        generatedAt: "2026-07-09T12:00:00.000Z",
        tasks: [
          {
            id: "linked-task-l1",
            title: "Fix [docs](https://example.com/docs) title",
            state: "working",
            kind: "ship",
            repo: "green-business-solution"
          }
        ]
      },
      {
        now: new Date("2026-07-09T12:02:00.000Z"),
        workspaceId: "retrofi"
      }
    );

    expect(markdownLinkSnapshot.tasks[0].title).toBe("Fix docs title");

    const inclusiveRead = await readPublishedFirstmateTaskSnapshot({
      db,
      includeInactive: true,
      tableName,
      workspaceId: "retrofi"
    });
    expect(inclusiveRead.tasks.map((task) => task.id)).toEqual([
      "working-task-w1",
      "queued-task-q1",
      "completed-task-c1",
      "review-ready-task-r1",
      "archived-task-a1"
    ]);
    expect(inclusiveRead.tasks.find((task) => task.id === "completed-task-c1")).toMatchObject({
      hasReport: true,
      reportUrl: "/tasks/reports/completed-task-c1"
    });
    expect(inclusiveRead.totalTaskCount).toBe(5);

    const report = await readPublishedFirstmateTaskReport({
      db,
      tableName,
      taskId: "completed-task-c1",
      workspaceId: "retrofi"
    });
    expect(report).toMatchObject({
      taskId: "completed-task-c1",
      taskState: "completed",
      reportStatus: "final",
      reportIsFinal: true,
      markdown: expect.stringContaining("Still readable after completion.")
    });
  });

  it("does not let a stale publish retire the current manifest", async () => {
    const db = createMockDocumentClient();
    const tableName = "firstmateTasksTable";
    const currentSnapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([{ id: "current-task-c1", title: "Current", kind: "codex", repo: "green-business-solution", state: "working" }]),
      { sourceModifiedAtEpochMs: 3000 }
    );
    const staleSnapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([{ id: "stale-task-s1", title: "Stale", kind: "codex", repo: "green-business-solution", state: "working" }]),
      { sourceModifiedAtEpochMs: 1000 }
    );

    await publishFirstmateTaskSnapshot({ db, tableName, snapshot: currentSnapshot });
    await expect(publishFirstmateTaskSnapshot({ db, tableName, snapshot: staleSnapshot })).resolves.toMatchObject({
      published: false,
      stale: true
    });

    const manifest = db.items.find((item) => item.stateScope === firstmateTaskWorkspaceScope("retrofi") && item.stateKey === "MANIFEST");
    expect(manifest.snapshotVersion).toBe(currentSnapshot.snapshotVersion);
  });

  it("updates stable task ids across repeat publishes without duplicate visible records", async () => {
    const db = createMockDocumentClient();
    const tableName = "firstmateTasksTable";
    const queuedSnapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([{ id: "stable-task-s1", title: "Stable task", kind: "codex", repo: "green-business-solution", state: "queued" }]),
      {
        now: new Date("2026-07-09T12:00:00.000Z"),
        sourceModifiedAtEpochMs: 1000
      }
    );
    const workingSnapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([{ id: "stable-task-s1", title: "Stable task", kind: "codex", repo: "green-business-solution", state: "working" }]),
      {
        now: new Date("2026-07-09T12:05:00.000Z"),
        sourceModifiedAtEpochMs: 2000
      }
    );

    await publishFirstmateTaskSnapshot({ db, tableName, snapshot: queuedSnapshot });
    await publishFirstmateTaskSnapshot({ db, tableName, snapshot: queuedSnapshot });
    await publishFirstmateTaskSnapshot({ db, tableName, snapshot: workingSnapshot });

    expect(
      db.items.filter((item) => item.stateScope === firstmateTaskSnapshotScope("retrofi", queuedSnapshot.snapshotVersion))
    ).toHaveLength(1);
    expect(
      db.items.filter((item) => item.stateScope === firstmateTaskSnapshotScope("retrofi", workingSnapshot.snapshotVersion))
    ).toHaveLength(1);

    const latestRead = await readPublishedFirstmateTaskSnapshot({ db, tableName, workspaceId: "retrofi" });
    expect(latestRead.tasks).toHaveLength(1);
    expect(latestRead.tasks[0]).toMatchObject({
      id: "stable-task-s1",
      state: "working"
    });
  });

  it("keeps report payloads sanitized, bounded, and unavailable when no report record is published", async () => {
    const db = createMockDocumentClient();
    const tableName = "firstmateTasksTable";
    const safeLargeMarkdown = "Report line\n".repeat(3000);
    const snapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([
        {
          id: "large-report-l1",
          title: "Large report",
          kind: "codex",
          repo: "green-business-solution",
          state: "completed",
          hasReport: true,
          reportUrl: "/tasks/reports/large-report-l1"
        },
        {
          id: "missing-report-m1",
          title: "Missing report",
          kind: "codex",
          repo: "green-business-solution",
          state: "working",
          hasReport: true,
          reportUrl: "/tasks/reports/missing-report-m1"
        }
      ]),
      {
        reportsByTaskId: {
          "large-report-l1": {
            taskId: "large-report-l1",
            reportStatus: "final",
            markdown: safeLargeMarkdown
          }
        },
        sourceModifiedAtEpochMs: 4000
      }
    );

    expect(snapshot.reports).toHaveLength(1);
    expect(snapshot.reports[0]).toMatchObject({
      taskId: "large-report-l1",
      markdownTruncated: true,
      markdownMaxChars: FIRSTMATE_TASK_REPORT_MARKDOWN_MAX_CHARS
    });
    expect(snapshot.reports[0].markdown.length).toBeLessThanOrEqual(FIRSTMATE_TASK_REPORT_MARKDOWN_MAX_CHARS);
    expect(snapshot.reports[0].markdown).toContain("Report line");
    expect(snapshot.tasks.find((task) => task.id === "large-report-l1")).toMatchObject({
      hasReport: true,
      reportUrl: "/tasks/reports/large-report-l1"
    });
    expect(snapshot.tasks.find((task) => task.id === "missing-report-m1")).toMatchObject({
      hasReport: false,
      reportUrl: null
    });

    await publishFirstmateTaskSnapshot({ db, tableName, snapshot });
    await expect(readPublishedFirstmateTaskReport({ db, tableName, taskId: "large-report-l1" })).resolves.toMatchObject({
      markdownTruncated: true,
      markdown: expect.stringContaining("[Report truncated for admin preview.]")
    });
    await expect(readPublishedFirstmateTaskReport({ db, tableName, taskId: "missing-report-m1" })).rejects.toMatchObject({
      status: 404,
      message: "Report not found."
    });
  });

  it("redacts unsafe report constructs before publishing", async () => {
    const db = createMockDocumentClient();
    const tableName = "firstmateTasksTable";
    const snapshot = buildFirstmateTaskSnapshotFromDashboard(
      buildDashboard([
        {
          id: "unsafe-report-u1",
          title: "Unsafe report",
          kind: "codex",
          repo: "green-business-solution",
          state: "completed",
          hasReport: true,
          reportUrl: "/tasks/reports/unsafe-report-u1"
        }
      ]),
      {
        reportsByTaskId: {
          "unsafe-report-u1": {
            taskId: "unsafe-report-u1",
            reportStatus: "final",
            markdown: [
              "# Unsafe",
              "",
              "Authorization: Bearer secret-token",
              "https://example.com/callback?X-Amz-Signature=abc123",
              "token = secret-value"
            ].join("\n")
          }
        },
        sourceModifiedAtEpochMs: 5000
      }
    );

    expect(snapshot.reports).toHaveLength(1);
    expect(snapshot.reports[0]).toMatchObject({
      taskId: "unsafe-report-u1",
      markdown: "Report content redacted for admin preview.",
      markdownTruncated: false
    });

    await publishFirstmateTaskSnapshot({ db, tableName, snapshot });
    await expect(readPublishedFirstmateTaskReport({ db, tableName, taskId: "unsafe-report-u1" })).resolves.toMatchObject({
      markdown: "Report content redacted for admin preview.",
      markdownTruncated: false
    });
  });

  it("returns explicit unavailable states for unconfigured, empty, and incomplete stores", async () => {
    await expect(readPublishedFirstmateTaskSnapshot({ db: null, tableName: "" })).resolves.toMatchObject({
      enabled: false,
      storageStatus: "unavailable"
    });

    const emptyDb = createMockDocumentClient();
    await expect(readPublishedFirstmateTaskSnapshot({ db: emptyDb, tableName: "firstmateTasksTable" })).resolves.toMatchObject({
      enabled: false,
      storageStatus: "dynamodb_empty"
    });

    const incompleteDb = createMockDocumentClient();
    incompleteDb.items.push({
      stateScope: firstmateTaskWorkspaceScope("retrofi"),
      stateKey: "MANIFEST",
      entityType: "FIRSTMATE_TASK_SNAPSHOT_MANIFEST",
      schemaVersion: 1,
      workspaceId: "retrofi",
      snapshotVersion: "0123456789abcdef0123456789abcdef",
      totalTaskCount: 1,
      sourceModifiedAtEpochMs: 1000
    });
    await expect(readPublishedFirstmateTaskSnapshot({ db: incompleteDb, tableName: "firstmateTasksTable" })).resolves.toMatchObject({
      enabled: false,
      storageStatus: "dynamodb_incomplete"
    });
  });
});
