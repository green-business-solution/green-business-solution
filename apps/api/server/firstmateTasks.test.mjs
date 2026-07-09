import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  assignFirstmateQueuedTask,
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
        "- [x] repair-ready-g5 - GPT Pro repair-ready report data/repair-ready-g5/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)",
        "- [x] report-status-repair-r6 - GPT Pro repair-ready report data/report-status-repair-r6/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)",
        "- [x] no-window-report-n1 - Completed report without live window data/no-window-report-n1/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)",
        "## In flight",
        "- [ ] reopened-report-r3 - Reopened report task data/reopened-report-r3/report.md (repo: green-business-solution) (kind: ship) (since 2026-07-08)",
        "- [ ] review-ready-r4 - Report review task data/review-ready-r4/report.md (repo: green-business-solution) (kind: ship) (since 2026-07-08)"
      ].join("\n")
    );
    await writeFile(home, "state/gpt-pro-repair-g1.meta", "window=firstmate:fm-gpt-pro-repair-g1\n");
    await writeFile(home, "state/exact-gpt-pro-g2.meta", "window=firstmate:fm-exact-gpt-pro-g2\ngptProRepairUrl=http://localhost:5173/chats?batch=tax-repair\n");
    await writeFile(home, "state/repair-ready-g5.meta", "window=firstmate:fm-repair-ready-g5\ngpt_pro_repair_status=ready\n");
    await writeFile(home, "state/report-status-repair-r6.meta", "window=firstmate:fm-report-status-repair-r6\nreport_status=repair-ready\n");
    await writeFile(home, "state/reopened-report-r3.meta", "window=firstmate:fm-reopened-report-r3\n");
    await writeFile(home, "state/reopened-report-r3.status", "working: compiling richer report\n");
    await writeFile(home, "state/review-ready-r4.meta", "window=firstmate:fm-review-ready-r4\nreport_status=review-ready\n");
    await writeFile(home, "state/review-ready-r4.status", "working: report ready for captain review\n");
    await writeFile(home, "data/gpt-pro-repair-g1/report.md", "# GPT Pro Repair\n\nReady.\n");
    await writeFile(home, "data/exact-gpt-pro-g2/report.md", "# Exact GPT Pro Repair\n\nReady.\n");
    await writeFile(home, "data/repair-ready-g5/report.md", "# Repair Ready\n\nReady.\n");
    await writeFile(home, "data/report-status-repair-r6/report.md", "# Report Status Repair Ready\n\nReady.\n");
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
      showReportAction: true,
      showGptProRepairAction: false,
      gptProRepairReady: false,
      gptProRepairUrl: null,
      gptProRepairLabel: null,
      gptProRepairFallback: false,
      gptProRepairUnavailableReason: null
    });
    expect(dashboard.tasks.find((task) => task.id === "exact-gpt-pro-g2")).toMatchObject({
      canSendReportFeedback: false,
      reportFeedbackMode: null,
      showReportAction: false,
      reportUrl: null,
      gptProRepairReady: true,
      showGptProRepairAction: true,
      gptProRepairUrl: "http://localhost:5173/chats?batch=tax-repair",
      gptProRepairLabel: "Go To Pro Repair Batch",
      gptProRepairFallback: false
    });
    expect(dashboard.tasks.find((task) => task.id === "repair-ready-g5")).toMatchObject({
      canSendReportFeedback: false,
      reportFeedbackMode: null,
      showReportAction: false,
      reportUrl: null,
      gptProRepairReady: true,
      showGptProRepairAction: true,
      gptProRepairUrl: null,
      gptProRepairUnavailableReason: "GPT Pro repair workspace URL is not configured for this local dashboard."
    });
    expect(dashboard.tasks.find((task) => task.id === "report-status-repair-r6")).toMatchObject({
      reportStatus: "repair-ready",
      canSendReportFeedback: false,
      showReportAction: false,
      gptProRepairReady: true,
      showGptProRepairAction: true
    });
    expect(dashboard.tasks.find((task) => task.id === "no-window-report-n1")).toMatchObject({
      canSendReportFeedback: true,
      reportStatus: "final",
      reportFeedbackMode: "follow-up-task",
      showReportAction: true,
      showGptProRepairAction: false,
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
      gptProRepairUrl: null,
      gptProRepairLabel: null,
      gptProRepairUnavailableReason: null
    });
    expect(configuredDashboard.tasks.find((task) => task.id === "repair-ready-g5")).toMatchObject({
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

  it("suppresses completed report rows when queued feedback follow-ups already exist", async () => {
    const home = await makeFirstmateHome();
    await writeFile(
      home,
      "data/backlog.md",
      [
        "## Queued",
        "- [ ] feedback-original-body-b1-20260708123456789 - Follow up on report feedback for original-body-b1 (repo: green-business-solution) (kind: scout)",
        "  - Original task id: original-body-b1",
        "  - Follow-up task id: feedback-original-body-b1-20260708123456789",
        "- [ ] revision-original-id-b2-20260708123456789 - Revise report for original-id-b2 (repo: green-business-solution) (kind: scout)",
        "## Done",
        "- [x] original-body-b1 - Completed report data/original-body-b1/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)",
        "- [x] original-id-b2 - Completed report data/original-id-b2/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)",
        "- [x] untouched-report-u1 - Completed report data/untouched-report-u1/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)"
      ].join("\n")
    );
    await writeFile(home, "data/original-body-b1/report.md", "# Original Body\n\nStill readable.\n");
    await writeFile(home, "data/original-id-b2/report.md", "# Original Id\n\nStill readable.\n");
    await writeFile(home, "data/untouched-report-u1/report.md", "# Untouched\n\nStill reviewable.\n");

    const dashboard = await readFirstmateTasksDashboard({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      now: new Date("2026-07-08T12:00:00.000Z")
    });

    expect(dashboard.tasks.map((task) => task.id)).toContain("feedback-original-body-b1-20260708123456789");
    expect(dashboard.tasks.map((task) => task.id)).toContain("revision-original-id-b2-20260708123456789");
    expect(dashboard.tasks.map((task) => task.id)).toContain("untouched-report-u1");
    expect(dashboard.tasks.map((task) => task.id)).not.toContain("original-body-b1");
    expect(dashboard.tasks.map((task) => task.id)).not.toContain("original-id-b2");

    const directReport = await readFirstmateTaskReport({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "original-body-b1",
      now: new Date("2026-07-08T12:00:00.000Z")
    });
    expect(directReport.markdown).toContain("Still readable.");
    expect(directReport.reportStatus).toBe("previous");
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
      dispatchStatus: "sent-to-active-agent",
      message: "Report approved and the active agent was told to continue.",
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

  it("queues report feedback as a revision follow-up when no live window exists and auto-dispatch is off", async () => {
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
      followUpTaskId: "revision-feedback-no-window-f4-20260708123456789",
      dispatchStatus: "queued-fallback",
      queuedFallbackReason: "Set RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH=1 to auto-dispatch Firstmate follow-up tasks.",
      sent: true
    });
    expect(result.message).toContain("Revision task revision-feedback-no-window-f4-20260708123456789 was queued");
    expect(result.feedbackPath).toBe(path.join(home, "data", "feedback-no-window-f4", "feedback", "report-feedback-20260708123456789.md"));
    expect(calls).toHaveLength(1);
    expect(calls[0].file).toBe("tasks-axi");
    expect(calls[0].args).toEqual([
      "add",
      "revision-feedback-no-window-f4-20260708123456789",
      "Revise report for feedback-no-window-f4",
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
    expect(artifact).toContain("Project: unknown");
    expect(artifact).toContain("Report URL: /tasks/reports/feedback-no-window-f4");
    expect(artifact).toContain("Action: changes-requested");
    expect(artifact).toContain("Please add the missing validation notes.");
    expect(artifact).toContain("Revise or investigate from the report");
    expect(artifact).toContain("This is report revision work.");
  });

  it("suppresses the original completed report after a changes-requested follow-up is queued", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-change-state-f14 - Completed report data/feedback-change-state-f14/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "data/feedback-change-state-f14/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "feedback-change-state-f14",
      action: "changes-requested",
      comment: "Please revise the assumptions section.",
      now: new Date("2026-07-08T12:34:56.789Z"),
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      taskId: "feedback-change-state-f14",
      action: "changes-requested",
      delivery: "follow-up-task",
      followUpTaskId: "revision-feedback-change-state-f14-20260708123456789",
      dispatchStatus: "queued-fallback"
    });
    const reviewState = JSON.parse(await fs.readFile(path.join(home, "data", "feedback-change-state-f14", "feedback", "report-review-state.json"), "utf8"));
    expect(reviewState).toMatchObject({
      state: "follow-up-created",
      action: "changes-requested",
      followUpTaskId: "revision-feedback-change-state-f14-20260708123456789"
    });

    const dashboard = await readFirstmateTasksDashboard({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      now: new Date("2026-07-08T12:35:00.000Z")
    });
    expect(dashboard.tasks.some((task) => task.id === "feedback-change-state-f14")).toBe(false);

    const directReport = await readFirstmateTaskReport({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "feedback-change-state-f14",
      now: new Date("2026-07-08T12:35:00.000Z")
    });
    expect(directReport.markdown).toContain("Ready.");
  });

  it("sends changes-requested report feedback to an active agent with live-window wording", async () => {
    const home = await makeFirstmateHome();
    await writeFile(home, "bin/fm-send.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-live-revision-f7 - Completed report data/feedback-live-revision-f7/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-live-revision-f7.meta", "window=firstmate:fm-feedback-live-revision-f7\nkind=scout\n");
    await writeFile(home, "data/feedback-live-revision-f7/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "feedback-live-revision-f7",
      action: "changes-requested",
      comment: "Please add the missing validation notes.",
      now: new Date("2026-07-08T12:00:00.000Z"),
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, "", "");
      }
    });

    expect(result).toMatchObject({
      generatedAt: "2026-07-08T12:00:00.000Z",
      taskId: "feedback-live-revision-f7",
      action: "changes-requested",
      delivery: "live-window",
      dispatchStatus: "sent-to-active-agent",
      message: "Revision request sent to the active agent.",
      sent: true
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].args[0]).toBe("firstmate:fm-feedback-live-revision-f7");
    expect(calls[0].args[1]).toContain("Action: changes-requested");
  });

  it("auto-dispatches a no-window report revision follow-up with an explicit spawn profile", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-auto-dispatch-f8 - Completed report data/feedback-auto-dispatch-f8/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-auto-dispatch-f8.meta", `project=${projectPath}\nkind=scout\n`);
    await writeFile(home, "data/feedback-auto-dispatch-f8/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1"
      },
      taskId: "feedback-auto-dispatch-f8",
      action: "changes-requested",
      comment: "Please revise the risk section.",
      now: new Date("2026-07-08T12:34:56.789Z"),
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        if (file.endsWith("fm-spawn.sh")) {
          callback(null, "spawned revision", "");
          return;
        }
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      taskId: "feedback-auto-dispatch-f8",
      action: "changes-requested",
      delivery: "follow-up-task",
      followUpTaskId: "revision-feedback-auto-dispatch-f8-20260708123456789",
      dispatchStatus: "auto-dispatched",
      message: "Revision crewmate started for revision-feedback-auto-dispatch-f8-20260708123456789.",
      spawnStdout: "spawned revision",
      sent: true
    });
    expect(calls).toHaveLength(3);
    expect(calls[0].file).toBe("tasks-axi");
    expect(calls[0].args).toEqual(expect.arrayContaining(["add", "revision-feedback-auto-dispatch-f8-20260708123456789", "--queue", "--json"]));
    expect(calls[1].file).toBe(path.join(home, "bin", "fm-spawn.sh"));
    expect(calls[1].args).toEqual([
      "revision-feedback-auto-dispatch-f8-20260708123456789",
      projectPath,
      "--harness",
      "codex",
      "--model",
      "gpt-5.5",
      "--effort",
      "xhigh",
      "--scout"
    ]);
    expect(calls[2].file).toBe("tasks-axi");
    expect(calls[2].args).toEqual(["start", "revision-feedback-auto-dispatch-f8-20260708123456789", "--json"]);

    const artifact = await fs.readFile(result.feedbackPath, "utf8");
    expect(artifact).toContain(`Project: ${projectPath}`);
    expect(artifact).toContain("This is report revision work.");
  });

  it("auto-dispatches looks-good report approval as a continuation task and hides the reviewed report", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-continue-f13 - Completed report data/feedback-continue-f13/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-continue-f13.meta", `project=${projectPath}\nkind=scout\n`);
    await writeFile(home, "data/feedback-continue-f13/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1"
      },
      taskId: "feedback-continue-f13",
      action: "proceed",
      comment: "Approved. Continue with the implementation.",
      now: new Date("2026-07-08T12:34:56.789Z"),
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        if (file.endsWith("fm-spawn.sh")) {
          callback(null, "spawned continuation", "");
          return;
        }
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      taskId: "feedback-continue-f13",
      action: "proceed",
      delivery: "follow-up-task",
      followUpTaskId: "continue-feedback-continue-f13-20260708123456789",
      dispatchStatus: "auto-dispatched",
      message: "Continuation crewmate started for continue-feedback-continue-f13-20260708123456789.",
      spawnStdout: "spawned continuation",
      sent: true
    });
    expect(calls).toHaveLength(3);
    expect(calls[0].args).toEqual([
      "add",
      "continue-feedback-continue-f13-20260708123456789",
      "Continue from approved report for feedback-continue-f13",
      "--kind",
      "ship",
      "--repo",
      "green-business-solution",
      "--body-file",
      result.feedbackPath,
      "--queue",
      "--json"
    ]);
    expect(calls[1].args).toEqual([
      "continue-feedback-continue-f13-20260708123456789",
      projectPath,
      "--harness",
      "codex",
      "--model",
      "gpt-5.5",
      "--effort",
      "xhigh"
    ]);
    expect(calls[2].args).toEqual(["start", "continue-feedback-continue-f13-20260708123456789", "--json"]);

    const artifact = await fs.readFile(result.feedbackPath, "utf8");
    expect(artifact).toContain("Action: proceed");
    expect(artifact).toContain("Continue the next work from the approved report");
    expect(artifact).toContain("This is continuation work from an approved report");

    const reviewState = JSON.parse(await fs.readFile(path.join(home, "data", "feedback-continue-f13", "feedback", "report-review-state.json"), "utf8"));
    expect(reviewState).toMatchObject({
      state: "accepted",
      action: "proceed",
      followUpTaskId: "continue-feedback-continue-f13-20260708123456789",
      dispatchStatus: "auto-dispatched"
    });

    const dashboard = await readFirstmateTasksDashboard({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      now: new Date("2026-07-08T12:35:00.000Z")
    });
    expect(dashboard.tasks.some((task) => task.id === "feedback-continue-f13")).toBe(false);

    const directReport = await readFirstmateTaskReport({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home
      },
      taskId: "feedback-continue-f13",
      now: new Date("2026-07-08T12:35:00.000Z")
    });
    expect(directReport.markdown).toContain("Ready.");
  });

  it("uses local env overrides for report revision auto-dispatch spawn profile", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-profile-f9 - Completed report data/feedback-profile-f9/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-profile-f9.meta", `project=${projectPath}\nkind=scout\n`);
    await writeFile(home, "data/feedback-profile-f9/report.md", "# Report\n\nReady.\n");
    const calls = [];

    await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1",
        RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_HARNESS: "codex",
        RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_MODEL: "gpt-5.5",
        RETROFI_FIRSTMATE_FEEDBACK_DISPATCH_EFFORT: "xhigh"
      },
      taskId: "feedback-profile-f9",
      action: "changes-requested",
      comment: "Please revise the summary.",
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(calls[1].args).toEqual(expect.arrayContaining([
      "--harness",
      "codex",
      "--model",
      "gpt-5.5",
      "--effort",
      "xhigh"
    ]));
  });

  it("leaves the revision follow-up queued when spawn fails", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-spawn-fail-f10 - Completed report data/feedback-spawn-fail-f10/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-spawn-fail-f10.meta", `project=${projectPath}\nkind=scout\n`);
    await writeFile(home, "data/feedback-spawn-fail-f10/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1"
      },
      taskId: "feedback-spawn-fail-f10",
      action: "changes-requested",
      comment: "Please revise the summary.",
      now: new Date("2026-07-08T12:34:56.789Z"),
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        if (file.endsWith("fm-spawn.sh")) {
          callback(new Error("spawn failed"), "", "unknown harness");
          return;
        }
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      delivery: "follow-up-task",
      followUpTaskId: "revision-feedback-spawn-fail-f10-20260708123456789",
      dispatchStatus: "queued-fallback",
      queuedFallbackReason: "fm-spawn.sh failed: unknown harness",
      spawnStderr: "unknown harness",
      sent: true
    });
    expect(result.message).toContain("Revision task revision-feedback-spawn-fail-f10-20260708123456789 was queued");
    expect(calls).toHaveLength(2);
    expect(calls[0].args).toEqual(expect.arrayContaining(["--queue"]));
    expect(calls[1].file).toBe(path.join(home, "bin", "fm-spawn.sh"));
  });

  it("assigns a queued task by spawning and starting the matching crewmate kind", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Queued\n- [ ] queued-assign-q1 - Queued scout follow-up (repo: green-business-solution) (kind: scout)\n");
    await writeFile(home, "state/queued-assign-q1.meta", `project=${projectPath}\nkind=scout\n`);
    const calls = [];

    const result = await assignFirstmateQueuedTask({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1"
      },
      taskId: "queued-assign-q1",
      now: new Date("2026-07-08T12:34:56.789Z"),
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        if (file.endsWith("fm-spawn.sh")) {
          callback(null, "spawned queued task", "");
          return;
        }
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      generatedAt: "2026-07-08T12:34:56.789Z",
      taskId: "queued-assign-q1",
      dispatchStatus: "auto-dispatched",
      message: "Crewmate started for queued-assign-q1.",
      spawnStdout: "spawned queued task",
      assigned: true
    });
    expect(calls).toHaveLength(2);
    expect(calls[0].file).toBe(path.join(home, "bin", "fm-spawn.sh"));
    expect(calls[0].args).toEqual([
      "queued-assign-q1",
      projectPath,
      "--harness",
      "codex",
      "--model",
      "gpt-5.5",
      "--effort",
      "xhigh",
      "--scout"
    ]);
    expect(calls[1].file).toBe("tasks-axi");
    expect(calls[1].args).toEqual(["start", "queued-assign-q1", "--json"]);
  });

  it("resolves a missing queued task project from the Firstmate project registry", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/projects.md", "- green-business-solution - React + Vite sustainable business workflow application. (added 2026-07-08)\n");
    await writeFile(home, "data/backlog.md", "## Queued\n- [ ] queued-registry-q2 - Queued ship follow-up (repo: green-business-solution) (kind: ship)\n");
    const calls = [];

    const result = await assignFirstmateQueuedTask({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1"
      },
      taskId: "queued-registry-q2",
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      dispatchStatus: "auto-dispatched",
      assigned: true
    });
    expect(calls[0].file).toBe(path.join(home, "bin", "fm-spawn.sh"));
    expect(calls[0].args).toEqual([
      "queued-registry-q2",
      projectPath,
      "--harness",
      "codex",
      "--model",
      "gpt-5.5",
      "--effort",
      "xhigh"
    ]);
  });

  it("keeps a queued task queued when assignment spawn fails", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Queued\n- [ ] queued-spawn-fail-q3 - Queued follow-up (repo: green-business-solution) (kind: ship)\n");
    await writeFile(home, "state/queued-spawn-fail-q3.meta", `project=${projectPath}\nkind=ship\n`);
    const calls = [];

    const result = await assignFirstmateQueuedTask({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1"
      },
      taskId: "queued-spawn-fail-q3",
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(new Error("spawn failed"), "", "terminal unavailable");
      }
    });

    expect(result).toMatchObject({
      taskId: "queued-spawn-fail-q3",
      dispatchStatus: "queued-fallback",
      queuedFallbackReason: "fm-spawn.sh failed: terminal unavailable",
      spawnStderr: "terminal unavailable",
      assigned: false
    });
    expect(result.message).toContain("Queued task queued-spawn-fail-q3 remains queued");
    expect(calls).toHaveLength(1);
    expect(calls[0].file).toBe(path.join(home, "bin", "fm-spawn.sh"));
  });

  it("does not assign queued tasks when local auto-dispatch is blocked by AWS runtime", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Queued\n- [ ] queued-aws-guard-q4 - Queued follow-up (repo: green-business-solution) (kind: ship)\n");
    await writeFile(home, "state/queued-aws-guard-q4.meta", `project=${projectPath}\nkind=ship\n`);
    const calls = [];

    const result = await assignFirstmateQueuedTask({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1",
        AWS_EXECUTION_ENV: "AWS_Lambda_nodejs20.x"
      },
      taskId: "queued-aws-guard-q4",
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, "", "");
      }
    });

    expect(result).toMatchObject({
      dispatchStatus: "queued-fallback",
      queuedFallbackReason: "Firstmate follow-up auto-dispatch is disabled in AWS runtime.",
      assigned: false
    });
    expect(calls).toHaveLength(0);
  });

  it("does not auto-dispatch report revisions without the local auth bypass guard", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-no-bypass-f11 - Completed report data/feedback-no-bypass-f11/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-no-bypass-f11.meta", `project=${projectPath}\nkind=scout\n`);
    await writeFile(home, "data/feedback-no-bypass-f11/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1"
      },
      taskId: "feedback-no-bypass-f11",
      action: "changes-requested",
      comment: "Please revise the summary.",
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      dispatchStatus: "queued-fallback",
      queuedFallbackReason: "Firstmate follow-up auto-dispatch requires the local Firstmate tasks auth bypass."
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].file).toBe("tasks-axi");
  });

  it("does not auto-dispatch report revisions in AWS runtime", async () => {
    const home = await makeFirstmateHome();
    const projectPath = path.join(home, "projects", "green-business-solution");
    await fs.mkdir(projectPath, { recursive: true });
    await writeFile(home, "bin/fm-spawn.sh", "#!/usr/bin/env bash\n");
    await writeFile(home, "data/backlog.md", "## Done\n- [x] feedback-aws-guard-f12 - Completed report data/feedback-aws-guard-f12/report.md (repo: green-business-solution) (kind: scout) (reported 2026-07-08)\n");
    await writeFile(home, "state/feedback-aws-guard-f12.meta", `project=${projectPath}\nkind=scout\n`);
    await writeFile(home, "data/feedback-aws-guard-f12/report.md", "# Report\n\nReady.\n");
    const calls = [];

    const result = await sendFirstmateTaskReportFeedback({
      env: {
        RETROFI_ENABLE_FIRSTMATE_TASKS: "1",
        RETROFI_FIRSTMATE_HOME: home,
        RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "1",
        RETROFI_FIRSTMATE_FEEDBACK_AUTO_DISPATCH: "1",
        AWS_EXECUTION_ENV: "AWS_Lambda_nodejs20.x"
      },
      taskId: "feedback-aws-guard-f12",
      action: "changes-requested",
      comment: "Please revise the summary.",
      allowLocalAgentDispatch: true,
      execFileFn: (file, args, options, callback) => {
        calls.push({ file, args, options });
        callback(null, JSON.stringify({ id: args[1] }), "");
      }
    });

    expect(result).toMatchObject({
      dispatchStatus: "queued-fallback",
      queuedFallbackReason: "Firstmate follow-up auto-dispatch is disabled in AWS runtime."
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].file).toBe("tasks-axi");
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
      dispatchStatus: "sent-to-active-agent",
      message: "Revision request sent to the active agent.",
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
      message: "Report feedback is only available after the report is marked ready for review.",
      status: 409
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
