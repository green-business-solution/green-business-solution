import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  firstmateTasksConfigFromEnv,
  isFirstmateTasksLocalAuthBypassEnabled,
  parseBacklogTasks,
  readFirstmateTaskReport,
  readFirstmateTasksDashboard,
  safeReportPath,
  safeStateFilePath,
  sendFirstmateTaskReportFeedback,
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
    expect(isFirstmateTasksLocalAuthBypassEnabled({
      RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1"
    })).toBe(false);
  });

  it("keeps local auth bypass off unless tasks are enabled with a configured Firstmate home", () => {
    expect(isFirstmateTasksLocalAuthBypassEnabled({
      RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
      RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1"
    })).toBe(false);
    expect(isFirstmateTasksLocalAuthBypassEnabled({
      RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
      RETROFI_FIRSTMATE_HOME: "/tmp/firstmate"
    })).toBe(false);
    expect(isFirstmateTasksLocalAuthBypassEnabled({
      RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
      RETROFI_FIRSTMATE_HOME: "/tmp/firstmate",
      RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1"
    })).toBe(true);
    expect(isFirstmateTasksLocalAuthBypassEnabled({
      RETROFI_ENABLE_FIRSTMATE_TASKS: "true",
      RETROFI_FIRSTMATE_HOME: "/tmp/firstmate",
      RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "true"
    })).toBe(false);
    expect(isFirstmateTasksLocalAuthBypassEnabled({
      RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
      RETROFI_FIRSTMATE_HOME: "/tmp/firstmate",
      RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
      AWS_EXECUTION_ENV: "AWS_Lambda_nodejs20.x"
    })).toBe(false);
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
    expect(dashboard.localAuthBypass).toBe(false);
    expect(dashboard.authMode).toBe("admin");
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

  it("reports local bypass mode only when the server has enabled it", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "data/backlog.md", "- [ ] local-task-l1 - Local task (repo: green-business-solution) (kind: ship) (since 2026-07-08)\n");

    const dashboard = await readFirstmateTasksDashboard({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1"
      },
      now: new Date("2026-07-08T12:00:00.000Z")
    });

    expect(dashboard.enabled).toBe(true);
    expect(dashboard.localAuthBypass).toBe(true);
    expect(dashboard.authMode).toBe("local-bypass");
  });

  it("exposes report feedback and GPT Pro repair targets for completed report tasks", async () => {
    const home = await makeFirstmateHome();
    await writeFile(
      home,
      "data/backlog.md",
      [
        "## Done",
        "- [x] gpt-pro-repair-g1 - GPT Pro repair report data/gpt-pro-repair-g1/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)",
        "- [x] exact-gpt-pro-g2 - GPT Pro repair report data/exact-gpt-pro-g2/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)",
        "- [x] no-window-report-n1 - Completed report without live window data/no-window-report-n1/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)",
        "## In flight",
        "- [ ] reopened-report-r3 - Reopened report task data/reopened-report-r3/report.md (repo: green-business-solution) (kind: ship) (since 2026-07-08)",
        "- [ ] review-ready-r4 - Report review task data/review-ready-r4/report.md (repo: green-business-solution) (kind: ship) (since 2026-07-08)"
      ].join("\n")
    );
    await writeFile(home, "state/gpt-pro-repair-g1.meta", "window=firstmate:fm-gpt-pro-repair-g1\n");
    await writeFile(home, "state/exact-gpt-pro-g2.meta", "window=firstmate:fm-exact-gpt-pro-g2\ngptProRepairUrl=http://localhost:5173/chats?batch=tax-repair\n");
    await writeFile(home, "state/reopened-report-r3.meta", "window=firstmate:fm-reopened-report-r3\n");
    await writeFile(home, "state/reopened-report-r3.status", "working: compiling richer report\n");
    await writeFile(home, "state/review-ready-r4.meta", "window=firstmate:fm-review-ready-r4\nreport_status=review-ready\n");
    await writeFile(home, "state/review-ready-r4.status", "working: report ready for captain review\n");
    await writeFile(home, "data/gpt-pro-repair-g1/report.md", "# GPT Pro Repair\n\nReady.\n");
    await writeFile(home, "data/exact-gpt-pro-g2/report.md", "# Exact GPT Pro Repair\n\nReady.\n");
    await writeFile(home, "data/no-window-report-n1/report.md", "# No Window Report\n\nReady.\n");
    await writeFile(home, "data/reopened-report-r3/report.md", "# Previous Report\n\nOlder artifact.\n");
    await writeFile(home, "data/review-ready-r4/report.md", "# Review Ready\n\nReady.\n");

    const dashboard = await readFirstmateTasksDashboard({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      now: new Date("2026-07-08T12:00:00.000Z")
    });

    expect(dashboard.tasks.find((task) => task.id === "gpt-pro-repair-g1")).toMatchObject({
      canSendReportFeedback: true,
      reportStatus: "final",
      reportActionLabel: "See Report",
      reportIsFinal: true,
      reportFeedbackMode: "live-window",
      gptProRepairUrl: null,
      gptProRepairLabel: null,
      gptProRepairFallback: false,
      gptProRepairUnavailableReason: "GPT Pro repair workspace URL is not configured for this local dashboard."
    });
    expect(dashboard.tasks.find((task) => task.id === "exact-gpt-pro-g2")).toMatchObject({
      canSendReportFeedback: true,
      reportFeedbackMode: "live-window",
      gptProRepairUrl: "http://localhost:5173/chats?batch=tax-repair",
      gptProRepairLabel: "Go To Pro Repair Batch",
      gptProRepairFallback: false
    });
    expect(dashboard.tasks.find((task) => task.id === "no-window-report-n1")).toMatchObject({
      canSendReportFeedback: true,
      reportStatus: "final",
      reportFeedbackMode: "follow-up-task",
      reportIsFinal: true
    });
    expect(dashboard.tasks.find((task) => task.id === "reopened-report-r3")).toMatchObject({
      state: "active",
      canSendReportFeedback: false,
      reportStatus: "previous",
      reportActionLabel: "View Previous Report",
      reportIsFinal: false,
      reportReviewReady: false
    });
    expect(dashboard.tasks.find((task) => task.id === "reopened-report-r3").reportNote).toContain("active again");
    expect(dashboard.tasks.find((task) => task.id === "review-ready-r4")).toMatchObject({
      state: "active",
      canSendReportFeedback: true,
      reportStatus: "review-ready",
      reportActionLabel: "Review Report",
      reportFeedbackMode: "live-window",
      reportReviewReady: true
    });

    const configuredDashboard = await readFirstmateTasksDashboard({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_GPT_PRO_REPAIR_URL: "http://localhost:5173/chats"
      },
      now: new Date("2026-07-08T12:00:00.000Z")
    });
    expect(configuredDashboard.tasks.find((task) => task.id === "gpt-pro-repair-g1")).toMatchObject({
      gptProRepairUrl: "http://localhost:5173/chats",
      gptProRepairLabel: "Go To Pro Repair Batch",
      gptProRepairUnavailableReason: null
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
    expect(report).toMatchObject({
      reportStatus: "previous",
      reportIsFinal: false,
      reportReviewReady: false
    });
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

  it("retries response submit once when Firstmate leaves text in the composer", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "state/respond-retry-r4.meta", "window=firstmate:fm-respond-retry-r4\nkind=ship\n");
    await writeFile(home, "state/respond-retry-r4.status", "needs-decision: pick a path\n");
    const calls = [];

    const result = await sendFirstmateTaskResponse({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "respond-retry-r4",
      message: "Use the safer path.",
      now: new Date("2026-07-08T12:00:00.000Z"),
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        if (calls.length === 1) {
          callback(
            new Error("fm-send exited 1"),
            "",
            "text not submitted to firstmate:fm-respond-retry-r4 (Enter swallowed; text left in composer)"
          );
          return;
        }
        callback(null, "", "");
      }
    });

    expect(result).toEqual({
      generatedAt: "2026-07-08T12:00:00.000Z",
      taskId: "respond-retry-r4",
      sent: true
    });
    expect(calls).toHaveLength(2);
    expect(calls[0].args).toEqual(["firstmate:fm-respond-retry-r4", "Use the safer path."]);
    expect(calls[1].args).toEqual(["firstmate:fm-respond-retry-r4", "--key", "Enter"]);
  });

  it("surfaces both Firstmate send attempts when the Enter retry also fails", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "state/respond-double-fail-r5.meta", "window=firstmate:fm-respond-double-fail-r5\nkind=ship\n");
    await writeFile(home, "state/respond-double-fail-r5.status", "needs-decision: pick a path\n");
    const calls = [];

    await expect(sendFirstmateTaskResponse({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "respond-double-fail-r5",
      message: "Use the safer path.",
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        if (calls.length === 1) {
          callback(
            new Error("fm-send exited 1"),
            "",
            "text not submitted to firstmate:fm-respond-double-fail-r5 (Enter swallowed; text left in composer)"
          );
          return;
        }
        callback(new Error("enter retry failed"), "", "no focused composer");
      }
    })).rejects.toMatchObject({
      message: "Could not submit response after Firstmate left text in the composer.",
      status: 502,
      firstAttempt: {
        args: ["firstmate:fm-respond-double-fail-r5", "Use the safer path."],
        stderr: "text not submitted to firstmate:fm-respond-double-fail-r5 (Enter swallowed; text left in composer)"
      },
      retryAttempt: {
        args: ["firstmate:fm-respond-double-fail-r5", "--key", "Enter"],
        stderr: "no focused composer"
      }
    });
    expect(calls).toHaveLength(2);
  });

  it("does not retry Enter-swallowed stderr for a different Firstmate window", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "state/respond-no-retry-r6.meta", "window=firstmate:fm-respond-no-retry-r6\nkind=ship\n");
    await writeFile(home, "state/respond-no-retry-r6.status", "needs-decision: pick a path\n");
    const calls = [];

    await expect(sendFirstmateTaskResponse({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "respond-no-retry-r6",
      message: "Use the safer path.",
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(
          new Error("fm-send exited 1"),
          "",
          "text not submitted to firstmate:fm-other-window (Enter swallowed; text left in composer)"
        );
      }
    })).rejects.toMatchObject({
      message: "Could not send response to Firstmate task.",
      status: 502,
      firstAttempt: {
        args: ["firstmate:fm-respond-no-retry-r6", "Use the safer path."]
      }
    });
    expect(calls).toHaveLength(1);
  });

  it("sends report feedback with an explicit action and optional captain comment", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-task-f1 - Completed report data/feedback-task-f1/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-task-f1.meta", "window=firstmate:fm-feedback-task-f1\nkind=scout\n");
    await writeFile(home, "data/feedback-task-f1/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "feedback-task-f1",
      action: "proceed",
      comment: "Looks good. Proceed with the next step.",
      now: new Date("2026-07-08T12:00:00.000Z"),
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, "", "");
      }
    });

    expect(result).toEqual({
      generatedAt: "2026-07-08T12:00:00.000Z",
      taskId: "feedback-task-f1",
      action: "proceed",
      delivery: "live-window",
      sent: true
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].file).toBe(path.join(home, "bin", "fm-send.sh"));
    expect(calls[0].args[0]).toBe("firstmate:fm-feedback-task-f1");
    expect(calls[0].args[1]).toContain("Action: report-approved-proceed");
    expect(calls[0].args[1]).toContain("Captain comment: Looks good. Proceed with the next step.");
    expect(calls[0].args[1]).toContain("ask the captain a clarifying question");
    expect(calls[0].options).toMatchObject({ cwd: home, timeout: 15_000 });
  });

  it("queues report feedback as a follow-up task when no live window exists", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-no-window-f4 - Completed report data/feedback-no-window-f4/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "data/feedback-no-window-f4/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "feedback-no-window-f4",
      action: "changes-requested",
      comment: "Please add the missing validation notes.",
      now: new Date("2026-07-08T12:34:56.789Z"),
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      generatedAt: "2026-07-08T12:34:56.789Z",
      taskId: "feedback-no-window-f4",
      action: "changes-requested",
      delivery: "follow-up-task",
      followUpTaskId: "feedback-feedback-no-window-f4-20260708123456789",
      sent: true
    });
    expect(result.feedbackPath).toBe(path.join(home, "data", "feedback-no-window-f4", "feedback", "report-feedback-20260708123456789.md"));
    expect(calls).toHaveLength(1);
    expect(calls[0].file).toBe("tasks-axi");
    expect(calls[0].args).toEqual([
      "add",
      "feedback-feedback-no-window-f4-20260708123456789",
      "Follow up on report feedback for feedback-no-window-f4",
      "--kind",
      "scout",
      "--repo",
      "green-business-solution",
      "--body-file",
      result.feedbackPath,
      "--queue",
      "--json"
    ]);
    expect(calls[0].options).toMatchObject({ cwd: home, timeout: 15_000 });

    const artifact = await fs.readFile(result.feedbackPath, "utf8");
    expect(artifact).toContain("Original task id: feedback-no-window-f4");
    expect(artifact).toContain("Original task title: Completed report");
    expect(artifact).toContain("Report URL: /tasks/reports/feedback-no-window-f4");
    expect(artifact).toContain("Action: changes-requested");
    expect(artifact).toContain("Please add the missing validation notes.");
    expect(artifact).toContain("Revise or investigate from the report");
  });

  it("retries report feedback submit once when Firstmate leaves text in the composer", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-retry-f3 - Completed report data/feedback-retry-f3/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-retry-f3.meta", "window=firstmate:fm-feedback-retry-f3\nkind=scout\n");
    await writeFile(home, "data/feedback-retry-f3/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "feedback-retry-f3",
      action: "changes-requested",
      comment: "Please tighten the validation section.",
      now: new Date("2026-07-08T12:00:00.000Z"),
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        if (calls.length === 1) {
          callback(
            new Error("fm-send exited 1"),
            "",
            "text not submitted to firstmate:fm-feedback-retry-f3 (Enter swallowed; text left in composer)"
          );
          return;
        }
        callback(null, "", "");
      }
    });

    expect(result).toEqual({
      generatedAt: "2026-07-08T12:00:00.000Z",
      taskId: "feedback-retry-f3",
      action: "changes-requested",
      delivery: "live-window",
      sent: true
    });
    expect(calls).toHaveLength(2);
    expect(calls[0].args[0]).toBe("firstmate:fm-feedback-retry-f3");
    expect(calls[0].args[1]).toContain("Action: changes-requested");
    expect(calls[1].args).toEqual(["firstmate:fm-feedback-retry-f3", "--key", "Enter"]);
  });

  it("rejects report feedback that is not actionable", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "- [ ] active-feedback-f2 - Active report data/active-feedback-f2/report.md (repo: green-business-solution) (kind: ship) (since 2026-07-08)\n");
    await writeFile(home, "state/active-feedback-f2.meta", "window=firstmate:fm-active-feedback-f2\nkind=ship\n");
    await writeFile(home, "data/active-feedback-f2/report.md", "# Report\n\nNot done.\n");

    await expect(sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "active-feedback-f2",
      action: "changes-requested",
      comment: "",
      execFileFn: () => {
        throw new Error("should not execute");
      }
    })).rejects.toMatchObject({
      message: "Report feedback comments are required when requesting changes.",
      status: 400
    });

    await expect(sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "active-feedback-f2",
      action: "proceed",
      comment: "Looks good.",
      execFileFn: () => {
        throw new Error("should not execute");
      }
    })).rejects.toMatchObject({
      message: "Report feedback is only available after the report is marked ready for review.",
      status: 409
    });
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
