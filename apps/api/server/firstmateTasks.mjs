import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const taskIdPattern = /^[a-z0-9][a-z0-9._-]{0,120}$/i;
const windowTargetPattern = /^[a-z0-9._:-]{1,180}$/i;
const enabledValues = new Set(["1", "true", "yes", "on"]);
const responseNeededStatusStates = new Set(["needs-decision", "blocked", "failed"]);
const reportFeedbackActions = new Set(["proceed", "changes-requested"]);
const explicitReportStatuses = new Set(["final", "review-ready", "draft", "previous"]);
const maxResponseMessageLength = 4000;
const gptProRepairUrlMetaKeys = [
  "gptProRepairUrl",
  "gpt_pro_repair_url",
  "proRepairUrl",
  "pro_repair_url",
  "repairBatchUrl",
  "repair_batch_url",
  "batchUrl",
  "batch_url",
  "chatUrl",
  "chat_url",
  "chatsUrl",
  "chats_url"
];
const reportStatusMetaKeys = [
  "reportStatus",
  "report_status",
  "reportArtifactStatus",
  "report_artifact_status"
];

export function firstmateTasksConfigFromEnv(env = process.env) {
  const enabledFlag = String(env.RETROFI_ENABLE_FIRSTMATE_TASKS || "").trim().toLowerCase();
  const firstmateHome = String(env.RETROFI_FIRSTMATE_HOME || "").trim();

  if (!enabledValues.has(enabledFlag)) {
    return {
      enabled: false,
      firstmateHome,
      reason: "Firstmate task data is disabled. Set RETROFI_ENABLE_FIRSTMATE_TASKS=1 for local admin use."
    };
  }

  if (!firstmateHome) {
    return {
      enabled: false,
      firstmateHome: "",
      reason: "Firstmate task data is disabled because RETROFI_FIRSTMATE_HOME is not configured."
    };
  }

  return {
    enabled: true,
    firstmateHome,
    reason: null
  };
}

export function isFirstmateTasksLocalAuthBypassEnabled(env = process.env) {
  const tasksEnabledFlag = String(env.RETROFI_ENABLE_FIRSTMATE_TASKS || "").trim();
  const bypassFlag = String(env.RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS || "").trim();
  const isAwsRuntime = Boolean(env.AWS_LAMBDA_FUNCTION_NAME || env.AWS_EXECUTION_ENV);
  return !isAwsRuntime && tasksEnabledFlag === "1" && bypassFlag === "1" && firstmateTasksConfigFromEnv(env).enabled;
}

export async function readFirstmateTasksDashboard({ env = process.env, now = new Date() } = {}) {
  const config = firstmateTasksConfigFromEnv(env);
  const generatedAt = toIsoString(now);
  const localAuthBypass = isFirstmateTasksLocalAuthBypassEnabled(env);

  if (!config.enabled) {
    return disabledFirstmateTasksResponse(config.reason, generatedAt, localAuthBypass);
  }

  const firstmateHome = path.resolve(config.firstmateHome);
  const homeStatus = await statDirectory(firstmateHome);
  if (!homeStatus.exists) {
    return disabledFirstmateTasksResponse("Configured Firstmate home does not exist.", generatedAt, localAuthBypass);
  }
  if (!homeStatus.isDirectory) {
    return disabledFirstmateTasksResponse("Configured Firstmate home is not a directory.", generatedAt, localAuthBypass);
  }

  const backlogPath = path.join(firstmateHome, "data", "backlog.md");
  const stateDir = path.join(firstmateHome, "state");
  const [backlogText, metaRecords, statusRecords] = await Promise.all([
    readTextIfExists(backlogPath),
    readStateRecords(stateDir, ".meta"),
    readStateRecords(stateDir, ".status")
  ]);
  const tasksById = new Map();

  for (const task of parseBacklogTasks(backlogText || "")) {
    tasksById.set(task.id, task);
  }

  for (const metaRecord of metaRecords) {
    const existing = tasksById.get(metaRecord.id) || baseTask(metaRecord.id);
    const meta = parseKeyValueLines(metaRecord.text);
    tasksById.set(metaRecord.id, {
      ...existing,
      kind: existing.kind || cleanOptional(meta.kind),
      project: existing.project || cleanOptional(meta.project),
      repo: existing.repo || repoNameFromProject(meta.project),
      worktree: cleanOptional(meta.worktree) || existing.worktree,
      window: cleanOptional(meta.window) || existing.window,
      reportStatus: normalizeReportStatus(firstCleanMetaValue(meta, reportStatusMetaKeys)) || existing.reportStatus,
      gptProRepairUrl: firstCleanMetaValue(meta, gptProRepairUrlMetaKeys) || existing.gptProRepairUrl
    });
  }

  for (const statusRecord of statusRecords) {
    const existing = tasksById.get(statusRecord.id) || baseTask(statusRecord.id);
    const status = parseStatusText(statusRecord.text);
    tasksById.set(statusRecord.id, {
      ...existing,
      recentStatus: status.message || existing.recentStatus,
      statusState: status.state || existing.statusState
    });
  }

  const tasks = await Promise.all(
    [...tasksById.values()]
      .filter((task) => taskIdPattern.test(task.id))
      .map(async (task) => {
        const hasReport = await reportExists(firstmateHome, task.id);
        const state = resolveTaskState(task);
        const responseNeeded = responseNeededStatusStates.has(task.statusState);
        const reportArtifact = resolveReportArtifact({ hasReport, state, task });
        const gptProRepairTarget = resolveGptProRepairTarget(task);
        return {
          id: task.id,
          title: task.title || titleFromTaskId(task.id),
          kind: task.kind || "unknown",
          repo: task.repo || repoNameFromProject(task.project) || "unknown",
          project: task.project || null,
          state,
          blocked: state === "blocked" || task.blockedBy.length > 0,
          blockedBy: task.blockedBy,
          recentStatus: task.recentStatus || null,
          statusState: task.statusState || null,
          since: task.since || null,
          reportedAt: task.reportedAt || null,
          responseNeeded,
          canRespond: responseNeeded && isSafeWindowTarget(task.window),
          hasReport,
          reportUrl: hasReport ? `/tasks/reports/${encodeURIComponent(task.id)}` : null,
          reportStatus: reportArtifact.status,
          reportActionLabel: reportArtifact.actionLabel,
          reportStatusLabel: reportArtifact.statusLabel,
          reportNote: reportArtifact.note,
          reportIsFinal: reportArtifact.isFinal,
          reportReviewReady: reportArtifact.reviewReady,
          canSendReportFeedback: reportArtifact.reviewReady && isSafeWindowTarget(task.window),
          gptProRepairUrl: gptProRepairTarget.url,
          gptProRepairLabel: gptProRepairTarget.label,
          gptProRepairFallback: gptProRepairTarget.fallback
        };
      })
  );
  const sortedTasks = tasks.sort(compareTasks);
  const counts = countTasksByState(sortedTasks);

  return {
    enabled: true,
    generatedAt,
    firstmateHome,
    localAuthBypass,
    authMode: localAuthBypass ? "local-bypass" : "admin",
    activeAgentCount: counts.active,
    totalTaskCount: sortedTasks.length,
    counts,
    tasks: sortedTasks,
    warnings: []
  };
}

export async function readFirstmateTaskReport({ env = process.env, taskId, now = new Date() } = {}) {
  const config = firstmateTasksConfigFromEnv(env);
  if (!config.enabled) {
    throw statusError(config.reason || "Firstmate task reports are disabled.", 404);
  }

  const normalizedTaskId = normalizeTaskId(taskId);
  if (!normalizedTaskId) {
    throw statusError("Invalid task id.", 400);
  }

  const firstmateHome = path.resolve(config.firstmateHome);
  const reportPath = safeReportPath(firstmateHome, normalizedTaskId);

  try {
    const markdown = await fs.readFile(reportPath, "utf8");
    const dashboard = await readFirstmateTasksDashboard({ env, now });
    const task = dashboard.tasks.find((candidate) => candidate.id === normalizedTaskId);
    return {
      generatedAt: toIsoString(now),
      taskId: normalizedTaskId,
      taskState: task?.state || null,
      statusState: task?.statusState || null,
      recentStatus: task?.recentStatus || null,
      reportStatus: task?.reportStatus || "previous",
      reportStatusLabel: task?.reportStatusLabel || "Report artifact",
      reportNote: task?.reportNote || "This report artifact exists, but no current task status was found.",
      reportIsFinal: Boolean(task?.reportIsFinal),
      reportReviewReady: Boolean(task?.reportReviewReady),
      markdown
    };
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw statusError("Report not found.", 404);
    }
    throw error;
  }
}

export async function sendFirstmateTaskResponse({
  env = process.env,
  taskId,
  message,
  now = new Date(),
  execFileFn = execFile
} = {}) {
  const config = firstmateTasksConfigFromEnv(env);
  if (!config.enabled) {
    throw statusError(config.reason || "Firstmate task responses are disabled.", 404);
  }

  const normalizedTaskId = normalizeTaskId(taskId);
  if (!normalizedTaskId) {
    throw statusError("Invalid task id.", 400);
  }

  const cleanMessage = normalizeResponseMessage(message);
  if (!cleanMessage) {
    throw statusError("Response message is required.", 400);
  }
  if (cleanMessage.length > maxResponseMessageLength) {
    throw statusError(`Response message must be ${maxResponseMessageLength} characters or fewer.`, 400);
  }
  if (cleanMessage === "--key") {
    throw statusError("Response message cannot be --key.", 400);
  }

  const firstmateHome = path.resolve(config.firstmateHome);
  const homeStatus = await statDirectory(firstmateHome);
  if (!homeStatus.exists) {
    throw statusError("Configured Firstmate home does not exist.", 404);
  }
  if (!homeStatus.isDirectory) {
    throw statusError("Configured Firstmate home is not a directory.", 400);
  }

  const metaPath = safeStateFilePath(firstmateHome, normalizedTaskId, ".meta");
  const metaText = await readRequiredText(metaPath, "Task metadata not found.");
  const meta = parseKeyValueLines(metaText);
  const windowTarget = cleanOptional(meta.window);
  if (!isSafeWindowTarget(windowTarget)) {
    throw statusError("Task does not have a live response window.", 409);
  }

  const statusPath = safeStateFilePath(firstmateHome, normalizedTaskId, ".status");
  const statusText = await readRequiredText(statusPath, "Task status not found.");
  const latestStatus = parseStatusText(statusText);
  if (!responseNeededStatusStates.has(latestStatus.state)) {
    throw statusError("Task is not waiting for a captain response.", 409);
  }

  const sendScriptPath = safeFirstmateBinPath(firstmateHome, "fm-send.sh");
  const sendScriptStatus = await statFile(sendScriptPath);
  if (!sendScriptStatus.exists) {
    throw statusError("Firstmate send helper was not found.", 503);
  }
  if (!sendScriptStatus.isFile) {
    throw statusError("Firstmate send helper is not a file.", 503);
  }

  await sendFirstmateWindowMessage(execFileFn, sendScriptPath, windowTarget, cleanMessage, {
    cwd: firstmateHome,
    maxBuffer: 64 * 1024,
    timeout: 15_000
  });

  return {
    generatedAt: toIsoString(now),
    taskId: normalizedTaskId,
    sent: true
  };
}

export async function sendFirstmateTaskReportFeedback({
  env = process.env,
  taskId,
  action,
  comment,
  now = new Date(),
  execFileFn = execFile
} = {}) {
  const config = firstmateTasksConfigFromEnv(env);
  if (!config.enabled) {
    throw statusError(config.reason || "Firstmate task report feedback is disabled.", 404);
  }

  const normalizedTaskId = normalizeTaskId(taskId);
  if (!normalizedTaskId) {
    throw statusError("Invalid task id.", 400);
  }

  const cleanAction = normalizeReportFeedbackAction(action);
  if (!cleanAction) {
    throw statusError("Report feedback action must be proceed or changes-requested.", 400);
  }

  const cleanComment = normalizeResponseMessage(comment);
  if (cleanComment.length > maxResponseMessageLength) {
    throw statusError(`Report feedback comment must be ${maxResponseMessageLength} characters or fewer.`, 400);
  }
  if (cleanAction === "changes-requested" && !cleanComment) {
    throw statusError("Report feedback comments are required when requesting changes.", 400);
  }

  const firstmateHome = path.resolve(config.firstmateHome);
  const homeStatus = await statDirectory(firstmateHome);
  if (!homeStatus.exists) {
    throw statusError("Configured Firstmate home does not exist.", 404);
  }
  if (!homeStatus.isDirectory) {
    throw statusError("Configured Firstmate home is not a directory.", 400);
  }

  const dashboard = await readFirstmateTasksDashboard({ env, now });
  const task = dashboard.tasks.find((candidate) => candidate.id === normalizedTaskId);
  if (!task?.hasReport) {
    throw statusError("Report not found.", 404);
  }
  if (!task.reportReviewReady) {
    throw statusError("Report feedback is only available after the report is marked ready for review.", 409);
  }

  const metaPath = safeStateFilePath(firstmateHome, normalizedTaskId, ".meta");
  const metaText = await readRequiredText(metaPath, "Task metadata not found.");
  const meta = parseKeyValueLines(metaText);
  const windowTarget = cleanOptional(meta.window);
  if (!isSafeWindowTarget(windowTarget)) {
    throw statusError("Task does not have a live response window for report feedback.", 409);
  }

  const sendScriptPath = safeFirstmateBinPath(firstmateHome, "fm-send.sh");
  const sendScriptStatus = await statFile(sendScriptPath);
  if (!sendScriptStatus.exists) {
    throw statusError("Firstmate send helper was not found.", 503);
  }
  if (!sendScriptStatus.isFile) {
    throw statusError("Firstmate send helper is not a file.", 503);
  }

  await sendFirstmateWindowMessage(execFileFn, sendScriptPath, windowTarget, buildReportFeedbackMessage({
    action: cleanAction,
    comment: cleanComment,
    taskId: normalizedTaskId
  }), {
    cwd: firstmateHome,
    maxBuffer: 64 * 1024,
    timeout: 15_000
  });

  return {
    generatedAt: toIsoString(now),
    taskId: normalizedTaskId,
    action: cleanAction,
    sent: true
  };
}

export function parseBacklogTasks(markdown) {
  const tasks = [];
  let section = "unknown";

  for (const rawLine of String(markdown || "").split(/\r?\n/)) {
    const heading = rawLine.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      section = heading[1].trim().toLowerCase();
      continue;
    }

    const match = rawLine.match(/^-\s+\[([ xX])\]\s+([a-z0-9._-]+)\s+-\s+(.+?)\s*$/i);
    if (!match) {
      continue;
    }

    const [, checked, id, rest] = match;
    const metadata = parseBacklogMetadata(rest);
    const checkedDone = checked.toLowerCase() === "x";
    const backlogState = checkedDone || section === "done"
      ? "completed"
      : section === "queued"
        ? "queued"
        : "active";

    tasks.push({
      ...baseTask(id),
      backlogState,
      title: metadata.title || titleFromTaskId(id),
      kind: metadata.kind,
      repo: metadata.repo,
      since: metadata.since,
      reportedAt: metadata.reportedAt,
      blockedBy: metadata.blockedBy
    });
  }

  return tasks;
}

export function safeReportPath(firstmateHome, taskId) {
  const normalizedTaskId = normalizeTaskId(taskId);
  if (!normalizedTaskId) {
    throw statusError("Invalid task id.", 400);
  }

  const dataDir = path.resolve(firstmateHome, "data");
  const reportPath = path.resolve(dataDir, normalizedTaskId, "report.md");
  const dataPrefix = `${dataDir}${path.sep}`;
  if (!reportPath.startsWith(dataPrefix)) {
    throw statusError("Invalid report path.", 400);
  }

  return reportPath;
}

export function safeStateFilePath(firstmateHome, taskId, extension) {
  const normalizedTaskId = normalizeTaskId(taskId);
  if (!normalizedTaskId || ![".meta", ".status"].includes(extension)) {
    throw statusError("Invalid task state path.", 400);
  }

  const stateDir = path.resolve(firstmateHome, "state");
  const filePath = path.resolve(stateDir, `${normalizedTaskId}${extension}`);
  const statePrefix = `${stateDir}${path.sep}`;
  if (!filePath.startsWith(statePrefix)) {
    throw statusError("Invalid task state path.", 400);
  }

  return filePath;
}

function disabledFirstmateTasksResponse(reason, generatedAt, localAuthBypass = false) {
  return {
    enabled: false,
    reason,
    generatedAt,
    localAuthBypass,
    authMode: localAuthBypass ? "local-bypass" : "admin",
    activeAgentCount: 0,
    totalTaskCount: 0,
    counts: {
      active: 0,
      completed: 0,
      blocked: 0,
      queued: 0,
      needsResponse: 0
    },
    tasks: [],
    warnings: []
  };
}

function baseTask(id) {
  return {
    id,
    title: "",
    kind: "",
    repo: "",
    project: "",
    worktree: "",
    window: "",
    reportStatus: "",
    gptProRepairUrl: "",
    backlogState: "active",
    blockedBy: [],
    recentStatus: "",
    statusState: "",
    since: "",
    reportedAt: ""
  };
}

function parseBacklogMetadata(rest) {
  const blockedBy = [...rest.matchAll(/blocked-by:\s*([a-z0-9._-]+)/gi)].map((match) => match[1]);
  const kind = firstMatch(rest, /\(kind:\s*([^)]+)\)/i);
  const repo = firstMatch(rest, /\(repo:\s*([^)]+)\)/i);
  const since = firstMatch(rest, /\(since\s+([^)]+)\)/i);
  const reportedAt = firstMatch(rest, /\(reported\s+([^)]+)\)/i);
  const title = rest
    .replace(/\bdata\/[a-z0-9._-]+\/report\.md\b/gi, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s*blocked-by:\s*[a-z0-9._-]+/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title,
    kind: cleanOptional(kind) || "unknown",
    repo: cleanOptional(repo) || "unknown",
    since: cleanOptional(since) || "",
    reportedAt: cleanOptional(reportedAt) || "",
    blockedBy
  };
}

function firstMatch(value, pattern) {
  const match = String(value || "").match(pattern);
  return match ? match[1].trim() : "";
}

async function readStateRecords(stateDir, extension) {
  let entries = [];
  try {
    entries = await fs.readdir(stateDir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }

  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name)
    .sort();

  return Promise.all(
    files.map(async (fileName) => ({
      id: fileName.slice(0, -extension.length),
      text: await fs.readFile(path.join(stateDir, fileName), "utf8")
    }))
  );
}

function parseKeyValueLines(text) {
  const result = {};
  for (const line of String(text || "").split(/\r?\n/)) {
    const match = line.match(/^([^=\s]+)=(.*)$/);
    if (match) {
      result[match[1]] = match[2].trim();
    }
  }
  return result;
}

function firstCleanMetaValue(meta, keys) {
  for (const key of keys) {
    const value = cleanOptional(meta[key]);
    if (value) return value;
  }
  return "";
}

function parseStatusText(text) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const latest = lines.at(-1) || "";
  const match = latest.match(/^([a-z-]+):\s*(.*)$/i);

  return {
    state: match ? match[1].toLowerCase() : "",
    message: match ? match[2].trim() : latest
  };
}

function resolveTaskState(task) {
  if (task.statusState === "done" || task.backlogState === "completed") {
    return "completed";
  }

  if (
    task.statusState === "blocked" ||
    task.statusState === "needs-decision" ||
    task.statusState === "failed" ||
    task.blockedBy.length > 0
  ) {
    return "blocked";
  }

  if (task.statusState === "working") {
    return "active";
  }

  if (task.backlogState === "queued") {
    return "queued";
  }

  return "active";
}

async function reportExists(firstmateHome, taskId) {
  try {
    const stat = await fs.stat(safeReportPath(firstmateHome, taskId));
    return stat.isFile();
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function statDirectory(directoryPath) {
  try {
    const stat = await fs.stat(directoryPath);
    return { exists: true, isDirectory: stat.isDirectory() };
  } catch (error) {
    if (error?.code === "ENOENT") {
      return { exists: false, isDirectory: false };
    }
    throw error;
  }
}

async function readTextIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

function countTasksByState(tasks) {
  return tasks.reduce(
    (counts, task) => {
      counts[task.state] += 1;
      if (task.responseNeeded) {
        counts.needsResponse += 1;
      }
      return counts;
    },
    {
      active: 0,
      completed: 0,
      blocked: 0,
      queued: 0,
      needsResponse: 0
    }
  );
}

function compareTasks(left, right) {
  const stateOrder = {
    active: 0,
    blocked: 1,
    queued: 2,
    completed: 3
  };
  const stateDelta = stateOrder[left.state] - stateOrder[right.state];
  if (stateDelta !== 0) return stateDelta;
  return left.id.localeCompare(right.id);
}

function titleFromTaskId(id) {
  return String(id || "")
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "Task";
}

function repoNameFromProject(project) {
  const cleanProject = cleanOptional(project);
  return cleanProject ? path.basename(cleanProject) : "";
}

function cleanOptional(value) {
  const text = String(value || "").trim();
  return text || "";
}

function normalizeResponseMessage(value) {
  return String(value || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

function normalizeReportFeedbackAction(value) {
  const cleanAction = String(value || "").trim().toLowerCase();
  return reportFeedbackActions.has(cleanAction) ? cleanAction : "";
}

function normalizeReportStatus(value) {
  const cleanStatus = String(value || "").trim().toLowerCase().replace(/_/g, "-");
  return explicitReportStatuses.has(cleanStatus) ? cleanStatus : "";
}

function normalizeTaskId(taskId) {
  const value = String(taskId || "").trim();
  return taskIdPattern.test(value) ? value : "";
}

function isSafeWindowTarget(value) {
  return windowTargetPattern.test(cleanOptional(value));
}

function resolveReportArtifact({ hasReport, state, task }) {
  if (!hasReport) {
    return {
      status: "none",
      actionLabel: null,
      statusLabel: "No report",
      note: null,
      isFinal: false,
      reviewReady: false
    };
  }

  if (task.reportStatus === "review-ready") {
    return {
      status: "review-ready",
      actionLabel: "Review Report",
      statusLabel: "Ready for review",
      note: state === "completed"
        ? "The agent marked this report ready for captain review."
        : "The task is still active, but the agent explicitly marked this report ready for captain review.",
      isFinal: false,
      reviewReady: true
    };
  }

  if (task.reportStatus === "final" || state === "completed") {
    return {
      status: "final",
      actionLabel: "See Report",
      statusLabel: "Final report",
      note: "This is the completed task report.",
      isFinal: true,
      reviewReady: true
    };
  }

  if (task.reportStatus === "draft") {
    return {
      status: "draft",
      actionLabel: "View Draft Report",
      statusLabel: "Draft report",
      note: "This task is still active. The report artifact is marked as a draft and is not the final current report.",
      isFinal: false,
      reviewReady: false
    };
  }

  return {
    status: "previous",
    actionLabel: "View Previous Report",
    statusLabel: "Previous report",
    note: "This task is active again. The existing report artifact may belong to a previous completed phase and is not the final current report.",
    isFinal: false,
    reviewReady: false
  };
}

function resolveGptProRepairTarget(task) {
  const directUrl = cleanOptional(task.gptProRepairUrl);
  if (isSafeLocalBrowserUrl(directUrl)) {
    return {
      url: directUrl,
      label: "Go To Pro Repair Batch",
      fallback: false
    };
  }

  if (!isGptProRepairTask(task)) {
    return {
      url: null,
      label: null,
      fallback: false
    };
  }

  return {
    url: "/chats",
    label: "Go To Pro Repair Batch (/chats fallback)",
    fallback: true
  };
}

function isGptProRepairTask(task) {
  const searchable = [
    task.id,
    task.title,
    task.kind,
    task.repo,
    task.project,
    task.recentStatus
  ].map((value) => String(value || "")).join(" ");
  return /\bgpt[-\s_]*pro\b|\bgptpro\b/i.test(searchable) && /(repair|batch|prompt|report|chat)/i.test(searchable);
}

function isSafeLocalBrowserUrl(value) {
  const url = cleanOptional(value);
  if (!url) return false;
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) {
    return true;
  }

  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) && ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  } catch {
    return false;
  }
}

function buildReportFeedbackMessage({ action, comment, taskId }) {
  const actionLine = action === "proceed"
    ? "report-approved-proceed"
    : "changes-requested";
  const commentText = comment || "No additional comment.";
  return [
    `Captain report feedback for task ${taskId}.`,
    `Action: ${actionLine}`,
    `Captain comment: ${commentText}`,
    "If the action and comment are clear, proceed accordingly. If they are ambiguous, ask the captain a clarifying question before doing more work."
  ].join("\n");
}

function safeFirstmateBinPath(firstmateHome, fileName) {
  const binDir = path.resolve(firstmateHome, "bin");
  const filePath = path.resolve(binDir, fileName);
  const binPrefix = `${binDir}${path.sep}`;
  if (!filePath.startsWith(binPrefix)) {
    throw statusError("Invalid Firstmate helper path.", 400);
  }
  return filePath;
}

async function statFile(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return { exists: true, isFile: stat.isFile() };
  } catch (error) {
    if (error?.code === "ENOENT") {
      return { exists: false, isFile: false };
    }
    throw error;
  }
}

async function readRequiredText(filePath, missingMessage) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw statusError(missingMessage, 404);
    }
    throw error;
  }
}

async function sendFirstmateWindowMessage(execFileFn, file, windowTarget, message, options) {
  const firstAttempt = await execFilePromise(execFileFn, file, [windowTarget, message], options);
  if (!firstAttempt.error) {
    return firstAttempt;
  }

  if (!isEnterSwallowedFailure(firstAttempt.stderr, windowTarget)) {
    throw buildFirstmateSendError("Could not send response to Firstmate task.", firstAttempt);
  }

  const retryAttempt = await execFilePromise(execFileFn, file, [windowTarget, "--key", "Enter"], options);
  if (!retryAttempt.error) {
    return {
      ...retryAttempt,
      retriedSubmit: true,
      firstAttempt
    };
  }

  throw buildFirstmateSendError("Could not submit response after Firstmate left text in the composer.", firstAttempt, retryAttempt);
}

function execFilePromise(execFileFn, file, args, options) {
  return new Promise((resolve, reject) => {
    execFileFn(file, args, options, (error, stdout, stderr) => {
      if (error) {
        resolve({ error, stdout, stderr, file, args });
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function isEnterSwallowedFailure(stderr, windowTarget) {
  const text = String(stderr || "");
  return text.includes(`text not submitted to ${windowTarget}`)
    && /Enter swallowed/i.test(text)
    && /text left in composer/i.test(text);
}

function buildFirstmateSendError(message, firstAttempt, retryAttempt = null) {
  const wrapped = statusError(message, 502);
  wrapped.cause = retryAttempt?.error || firstAttempt?.error;
  wrapped.stdout = retryAttempt?.stdout ?? firstAttempt?.stdout;
  wrapped.stderr = retryAttempt?.stderr ?? firstAttempt?.stderr;
  wrapped.firstAttempt = {
    args: firstAttempt?.args,
    stdout: firstAttempt?.stdout,
    stderr: firstAttempt?.stderr
  };
  if (retryAttempt) {
    wrapped.retryAttempt = {
      args: retryAttempt.args,
      stdout: retryAttempt.stdout,
      stderr: retryAttempt.stderr
    };
  }
  return wrapped;
}

function statusError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function toIsoString(value) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}
