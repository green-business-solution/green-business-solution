import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  firstmateTasksConfigFromEnv,
  parseBacklogTasks,
  readFirstmateTaskReport,
  readFirstmateTasksDashboard,
  safeReportPath,
  safeStateFilePath,
  sendFirstmateTaskResponse
} from "./firstmateTasks.mjs";

const tempDirs = [];

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((directory) => fs.rm(directory, { force: true, recursive: true })));
});

describe("firstmate task reader", () => {
  it("stays disabled until the explicit local env flag and Firstmate home are configured", () => {
    expect(firstmateTasksConfigFromEnv({})).toMatchObject({
      enabled: false,
      reason: "Firstmate task data is disabled. Set RETROFI_ENABLE_FIRSTMATE_TASKS=1 for local admin use."
    });
    expect(firstmateTasksConfigFromEnv({ RETROFI_ENABLE_FIRSTMATE_TASKS: "1" })).toMatchObject({
      enabled: false,
      reason: "Firstmate task data is disabled because RETROFI_FIRSTMATE_HOME is not configured."
    });
  });

  it("parses backlog sections, blocked dependencies, reports, and recent status", async () => {
    const home = await makeFirstmateHome();
    await writeFile(
      home,
      "data/backlog.md",
      [
        "# Backlog",
        "",
        "## In flight",
        "- [ ] ship-one-a1 - Ship the first thing (repo: green-business-solution) (kind: ship) (since 2026-07-08)",
        "- [ ] blocked-one-b2 - Blocked task blocked-by: ship-one-a1 (repo: green-business-solution) (kind: ship) (since 2026-07-08)",
        "## Queued",
        "- [ ] queued-one-c3 - Queued task (repo: green-business-solution) (kind: scout) (since 2026-07-08)",
        "## Done",
        "- [x] done-one-d4 - Completed task data/done-one-d4/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)"
      ].join("\n")
    );
    await writeFile(home, "state/ship-one-a1.meta", "kind=ship\nproject=/tmp/green-business-solution\n");
    await writeFile(home, "state/ship-one-a1.status", "working: implementation started\n");
    await writeFile(home, "state/blocked-one-b2.meta", "kind=ship\nwindow=firstmate:fm-blocked-one-b2\n");
    await writeFile(home, "state/blocked-one-b2.status", "needs-decision: waiting on captain\n");
    await writeFile(home, "data/done-one-d4/report.md", "# Done\n\nReport body.\n");

    const dashboard = await readFirstmateTasksDashboard({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      now: new Date("2026-07-08T12:00:00.000Z")
    });

    expect(dashboard.enabled).toBe(true);
    expect(dashboard.activeAgentCount).toBe(1);
    expect(dashboard.counts).toEqual({
      active: 1,
      blocked: 1,
      queued: 1,
      completed: 1,
      needsResponse: 1
    });
    expect(dashboard.tasks.map((task) => [task.id, task.state, task.hasReport])).toEqual([
      ["ship-one-a1", "active", false],
      ["blocked-one-b2", "blocked", false],
      ["queued-one-c3", "queued", false],
      ["done-one-d4", "completed", true]
    ]);
    expect(dashboard.tasks.find((task) => task.id === "blocked-one-b2")).toMatchObject({
      blocked: true,
      blockedBy: ["ship-one-a1"],
      recentStatus: "waiting on captain",
      responseNeeded: true,
      canRespond: true
    });
    expect(dashboard.tasks.find((task) => task.id === "ship-one-a1")).toMatchObject({
      responseNeeded: false,
      canRespond: false
    });
  });

  it("reads reports only from data/<task-id>/report.md", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "data/report-task-z9/report.md", "# Report\n\nReady.\n");

    const report = await readFirstmateTaskReport({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "report-task-z9",
      now: new Date("2026-07-08T12:00:00.000Z")
    });

    expect(report.markdown).toContain("Ready.");
    expect(() => safeReportPath(home, "../outside")).toThrow("Invalid task id.");
    expect(() => safeStateFilePath(home, "../outside", ".meta")).toThrow("Invalid task state path.");
  });

  it("sends responses with execFile arguments instead of shell interpolation", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "state/respond-task-r1.meta", "window=firstmate:fm-respond-task-r1\nkind=ship\n");
    await writeFile(home, "state/respond-task-r1.status", "needs-decision: pick a path\n");
    const calls = [];

    const result = await sendFirstmateTaskResponse({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "respond-task-r1",
      message: "Approve option A; do not mutate data.",
      now: new Date("2026-07-08T12:00:00.000Z"),
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, "", "");
      }
    });

    expect(result).toEqual({
      generatedAt: "2026-07-08T12:00:00.000Z",
      taskId: "respond-task-r1",
      sent: true
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].file).toBe(path.join(home, "bin", "fm-send.sh"));
    expect(calls[0].args).toEqual(["firstmate:fm-respond-task-r1", "Approve option A; do not mutate data."]);
    expect(calls[0].options).toMatchObject({ cwd: home, timeout: 15_000 });
  });

  it("rejects response sends without a safe live window or valid message", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "state/no-window-r2.meta", "kind=ship\n");
    await expect(sendFirstmateTaskResponse({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "no-window-r2",
      message: "Captain response",
      execFileFn: () => {
        throw new Error("should not execute");
      }
    })).rejects.toMatchObject({
      message: "Task does not have a live response window.",
      status: 409
    });

    await expect(sendFirstmateTaskResponse({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "no-window-r2",
      message: "",
      execFileFn: () => {
        throw new Error("should not execute");
      }
    })).rejects.toMatchObject({
      message: "Response message is required.",
      status: 400
    });
  });

  it("rejects response sends when the latest task status does not need captain input", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "state/active-task-r3.meta", "window=firstmate:fm-active-task-r3\nkind=ship\n");
    await writeFile(home, "state/active-task-r3.status", "working: implementing\n");

    await expect(sendFirstmateTaskResponse({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "active-task-r3",
      message: "Captain response",
      execFileFn: () => {
        throw new Error("should not execute");
      }
    })).rejects.toMatchObject({
      message: "Task is not waiting for a captain response.",
      status: 409
    });
  });

  it("parses backlog task metadata without status files", () => {
    const tasks = parseBacklogTasks(
      "- [x] audit-gbs-bugs-p9 - Read-only bug audit data/audit-gbs-bugs-p9/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-07)"
    );

    expect(tasks[0]).toMatchObject({
      id: "audit-gbs-bugs-p9",
      backlogState: "completed",
      title: "Read-only bug audit",
      repo: "green-business-solution",
      kind: "scout",
      reportedAt: "2026-07-07"
    });
  });
});

async function makeFirstmateHome() {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-firstmate-"));
  tempDirs.push(directory);
  await fs.mkdir(path.join(directory, "data"), { recursive: true });
  await fs.mkdir(path.join(directory, "state"), { recursive: true });
  return directory;
}

async function writeFile(root, relativePath, contents) {
  const filePath = path.join(root, relativePath);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, contents);
}
