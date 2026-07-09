import crypto from "node:crypto";
import { BatchWriteCommand, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export const FIRSTMATE_TASK_SNAPSHOT_SCHEMA_VERSION = 1;
export const defaultFirstmateTaskWorkspaceId = "retrofi";
export const FIRSTMATE_TASK_REPORT_MARKDOWN_MAX_CHARS = 24000;

const taskIdPattern = /^[a-z0-9][a-z0-9._-]{0,120}$/i;
const workspaceIdPattern = /^[a-z0-9][a-z0-9._-]{0,80}$/i;
const safeRepoPattern = /^[a-z0-9][a-z0-9._-]{0,120}$/i;
const snapshotVersionPattern = /^[a-f0-9]{32}$/i;
const explicitTaskStates = new Set(["queued", "working", "blocked", "completed", "archived"]);
const inactiveTaskStates = new Set(["completed", "archived"]);

export function firstmateTaskWorkspaceScope(workspaceId = defaultFirstmateTaskWorkspaceId) {
  return `FIRSTMATE_TASKS#${normalizeWorkspaceId(workspaceId)}`;
}

export function firstmateTaskSnapshotScope(workspaceId, snapshotVersion) {
  const version = cleanText(snapshotVersion);
  if (!snapshotVersionPattern.test(version)) {
    throw statusError("Invalid Firstmate task snapshot version.", 400);
  }
  return `${firstmateTaskWorkspaceScope(workspaceId)}#SNAPSHOT#${version}`;
}

export function normalizeFirstmateSnapshotTaskState(state) {
  const cleanState = cleanText(state).toLowerCase().replaceAll("_", "-");
  if (cleanState === "active" || cleanState === "in-flight" || cleanState === "inflight") return "working";
  if (explicitTaskStates.has(cleanState)) return cleanState;
  return "queued";
}

export function sanitizeFirstmateTaskForSnapshot(task) {
  const id = cleanText(task?.id);
  if (!taskIdPattern.test(id)) return null;
  const state = normalizeFirstmateSnapshotTaskState(task?.state);
  const reportUrl = safeTaskReportUrl(task?.reportUrl, id);
  const reportReviewReady = Boolean(task?.reportReviewReady);
  const active = !inactiveTaskStates.has(state);
  const defaultVisible = typeof task?.defaultVisible === "boolean" ? task.defaultVisible : active;

  return stripUndefined({
    id,
    title: sanitizePublicText(task?.title || titleFromTaskId(id), 160),
    kind: sanitizeToken(task?.kind, "unknown"),
    repo: sanitizeRepo(task?.repo),
    project: null,
    state,
    active,
    defaultVisible,
    hiddenByDefault: typeof task?.hiddenByDefault === "boolean" ? task.hiddenByDefault : !defaultVisible,
    blocked: state === "blocked" || Boolean(task?.blocked),
    blockedBy: Array.isArray(task?.blockedBy)
      ? task.blockedBy.map((value) => cleanText(value)).filter((value) => taskIdPattern.test(value)).slice(0, 20)
      : [],
    recentStatus: sanitizeOptionalPublicText(task?.recentStatus, 280),
    statusState: sanitizeToken(task?.statusState, null),
    since: safeDateText(task?.since),
    reportedAt: safeDateText(task?.reportedAt),
    responseNeeded: Boolean(task?.responseNeeded),
    canRespond: false,
    canAssign: false,
    assignmentUnavailableReason: state === "queued" ? "Task assignment happens in Firstmate." : null,
    hasReport: Boolean(task?.hasReport),
    showReportAction: Boolean(reportUrl),
    reportUrl,
    reportStatus: sanitizeReportStatus(task?.reportStatus),
    reportActionLabel: reportUrl ? sanitizePublicText(task?.reportActionLabel || "View report", 60) : null,
    reportStatusLabel: sanitizeOptionalPublicText(task?.reportStatusLabel, 80),
    reportNote: sanitizeOptionalPublicText(task?.reportNote, 220),
    reportIsFinal: Boolean(task?.reportIsFinal),
    reportReviewReady,
    reportFeedbackMode: null,
    reportFeedbackUnavailableReason: "Report feedback happens in Firstmate.",
    canSendReportFeedback: false
  });
}

export function sanitizeFirstmateReportForSnapshot(report, task, { maxMarkdownChars = FIRSTMATE_TASK_REPORT_MARKDOWN_MAX_CHARS } = {}) {
  if (report == null) return null;
  const taskId = cleanText(task?.id || report?.taskId);
  if (!taskIdPattern.test(taskId)) return null;
  const markdownSource = typeof report === "string" ? report : report?.markdown;
  const markdownResult = sanitizePublicMarkdown(markdownSource, maxMarkdownChars);
  const taskState = normalizeFirstmateSnapshotTaskState(report?.taskState || task?.state);

  return stripUndefined({
    taskId,
    generatedAt: safeIsoString(report?.generatedAt) || null,
    taskState,
    statusState: sanitizeToken(report?.statusState || task?.statusState, null),
    recentStatus: sanitizeOptionalPublicText(report?.recentStatus || task?.recentStatus, 280),
    reportStatus: sanitizeReportStatus(report?.reportStatus || task?.reportStatus),
    reportStatusLabel: sanitizeOptionalPublicText(report?.reportStatusLabel || task?.reportStatusLabel, 80) || "Report artifact",
    reportNote: sanitizeOptionalPublicText(report?.reportNote || task?.reportNote, 220),
    reportIsFinal: Boolean(report?.reportIsFinal ?? task?.reportIsFinal),
    reportReviewReady: Boolean(report?.reportReviewReady ?? task?.reportReviewReady),
    reportFeedbackMode: null,
    canSendReportFeedback: false,
    markdown: markdownResult.markdown,
    markdownTruncated: Boolean(report?.markdownTruncated || markdownResult.truncated),
    markdownMaxChars: maxMarkdownChars,
    markdownCharCount: markdownResult.charCount
  });
}

export function buildFirstmateTaskSnapshotFromDashboard(
  dashboard,
  {
    now = new Date(),
    reportsByTaskId,
    sourceModifiedAtEpochMs,
    workspaceId = defaultFirstmateTaskWorkspaceId
  } = {}
) {
  const normalizedWorkspaceId = normalizeWorkspaceId(workspaceId);
  const generatedAt = toIsoString(now);
  const sourceGeneratedAt = safeIsoString(dashboard?.generatedAt) || generatedAt;
  const sourceModifiedAt = normalizeEpochMs(sourceModifiedAtEpochMs, Date.parse(sourceGeneratedAt) || now.getTime());
  const reportInputs = reportInputMap(reportsByTaskId);
  const taskAndReportPairs = (dashboard?.tasks || [])
    .map((task) => buildSnapshotTaskAndReportPair(task, reportInputs))
    .filter((pair) => pair.task)
    .sort((left, right) => compareSnapshotTasks(left.task, right.task));
  const tasks = taskAndReportPairs.map((pair) => pair.task);
  const reports = taskAndReportPairs.map((pair) => pair.report).filter(Boolean).sort(compareSnapshotReports);
  const counts = countSnapshotTasks(tasks);
  const canonicalReports = reports.map(stripSnapshotReportGeneratedAt);
  const snapshotBase = {
    schemaVersion: FIRSTMATE_TASK_SNAPSHOT_SCHEMA_VERSION,
    workspaceId: normalizedWorkspaceId,
    reports: canonicalReports,
    tasks
  };
  const snapshotVersion = crypto
    .createHash("sha256")
    .update(JSON.stringify(snapshotBase))
    .digest("hex")
    .slice(0, 32);

  return {
    ...snapshotBase,
    sourceGeneratedAt,
    sourceModifiedAtEpochMs: sourceModifiedAt,
    snapshotVersion,
    generatedAt,
    publishedAt: generatedAt,
    counts,
    reportCount: reports.length,
    totalTaskCount: tasks.length,
    activeTaskCount: tasks.filter((task) => task.active).length,
    inactiveTaskCount: tasks.filter((task) => !task.active).length,
    hiddenByDefaultTaskCount: tasks.filter((task) => task.hiddenByDefault).length
  };
}

export async function publishFirstmateTaskSnapshot({ db, tableName, snapshot }) {
  if (!db || !tableName) {
    throw statusError("Firstmate task snapshot publishing requires a DynamoDB table.", 500);
  }
  const normalizedSnapshot = normalizeSnapshot(snapshot);
  const scope = firstmateTaskSnapshotScope(normalizedSnapshot.workspaceId, normalizedSnapshot.snapshotVersion);
  const taskItems = normalizedSnapshot.tasks.map((task) => ({
    stateScope: scope,
    stateKey: `TASK#${task.id}`,
    entityType: "FIRSTMATE_TASK",
    schemaVersion: FIRSTMATE_TASK_SNAPSHOT_SCHEMA_VERSION,
    workspaceId: normalizedSnapshot.workspaceId,
    snapshotVersion: normalizedSnapshot.snapshotVersion,
    sourceModifiedAtEpochMs: normalizedSnapshot.sourceModifiedAtEpochMs,
    task
  }));
  const reportItems = normalizedSnapshot.reports.map((report) => ({
    stateScope: scope,
    stateKey: `REPORT#${report.taskId}`,
    entityType: "FIRSTMATE_TASK_REPORT",
    schemaVersion: FIRSTMATE_TASK_SNAPSHOT_SCHEMA_VERSION,
    workspaceId: normalizedSnapshot.workspaceId,
    snapshotVersion: normalizedSnapshot.snapshotVersion,
    sourceModifiedAtEpochMs: normalizedSnapshot.sourceModifiedAtEpochMs,
    report
  }));

  for (const chunk of chunks([...taskItems, ...reportItems], 25)) {
    await batchWriteAll(db, tableName, chunk);
  }

  const manifest = {
    stateScope: firstmateTaskWorkspaceScope(normalizedSnapshot.workspaceId),
    stateKey: "MANIFEST",
    entityType: "FIRSTMATE_TASK_SNAPSHOT_MANIFEST",
    schemaVersion: FIRSTMATE_TASK_SNAPSHOT_SCHEMA_VERSION,
    workspaceId: normalizedSnapshot.workspaceId,
    snapshotVersion: normalizedSnapshot.snapshotVersion,
    generatedAt: normalizedSnapshot.generatedAt,
    publishedAt: normalizedSnapshot.publishedAt,
    sourceGeneratedAt: normalizedSnapshot.sourceGeneratedAt,
    sourceModifiedAtEpochMs: normalizedSnapshot.sourceModifiedAtEpochMs,
    counts: normalizedSnapshot.counts,
    reportCount: normalizedSnapshot.reportCount,
    reportMarkdownMaxChars: FIRSTMATE_TASK_REPORT_MARKDOWN_MAX_CHARS,
    totalTaskCount: normalizedSnapshot.totalTaskCount,
    activeTaskCount: normalizedSnapshot.activeTaskCount,
    inactiveTaskCount: normalizedSnapshot.inactiveTaskCount,
    hiddenByDefaultTaskCount: normalizedSnapshot.hiddenByDefaultTaskCount
  };

  try {
    await db.send(
      new PutCommand({
        TableName: tableName,
        Item: manifest,
        ConditionExpression:
          "attribute_not_exists(stateScope) OR sourceModifiedAtEpochMs < :sourceModifiedAtEpochMs OR (sourceModifiedAtEpochMs = :sourceModifiedAtEpochMs AND snapshotVersion <= :snapshotVersion)",
        ExpressionAttributeValues: {
          ":sourceModifiedAtEpochMs": manifest.sourceModifiedAtEpochMs,
          ":snapshotVersion": manifest.snapshotVersion
        }
      })
    );
  } catch (error) {
    if (error?.name === "ConditionalCheckFailedException") {
      return {
        published: false,
        stale: true,
        snapshotVersion: normalizedSnapshot.snapshotVersion,
        storageStatus: "dynamodb",
        reason: "A newer Firstmate task snapshot is already published."
      };
    }
    throw error;
  }

  return {
    published: true,
    stale: false,
    snapshotVersion: normalizedSnapshot.snapshotVersion,
    taskCount: normalizedSnapshot.tasks.length,
    reportCount: normalizedSnapshot.reports.length,
    storageStatus: "dynamodb"
  };
}

export async function readPublishedFirstmateTaskSnapshot({
  db,
  includeInactive = false,
  now = new Date(),
  tableName,
  workspaceId = defaultFirstmateTaskWorkspaceId
}) {
  const generatedAt = toIsoString(now);
  if (!db || !tableName) {
    return disabledSnapshotResponse("Codex task snapshots are not configured for this environment.", generatedAt);
  }

  const normalizedWorkspaceId = normalizeWorkspaceId(workspaceId);
  const manifestResult = await db.send(
    new GetCommand({
      TableName: tableName,
      Key: {
        stateScope: firstmateTaskWorkspaceScope(normalizedWorkspaceId),
        stateKey: "MANIFEST"
      }
    })
  );
  const manifest = manifestResult.Item || null;
  if (!isSnapshotManifest(manifest)) {
    return disabledSnapshotResponse("No Codex task snapshot has been published yet.", generatedAt, {
      storageStatus: "dynamodb_empty"
    });
  }

  const snapshotScope = firstmateTaskSnapshotScope(normalizedWorkspaceId, manifest.snapshotVersion);
  const items = await queryAll(db, {
    TableName: tableName,
    KeyConditionExpression: "stateScope = :scope",
    ExpressionAttributeValues: {
      ":scope": snapshotScope
    }
  });
  const allTasks = items
    .filter((item) => item.entityType === "FIRSTMATE_TASK")
    .map((item) => item.task)
    .filter(Boolean)
    .map(sanitizeFirstmateTaskForSnapshot)
    .filter(Boolean)
    .sort(compareSnapshotTasks);

  if (!allTasks.length && manifest.totalTaskCount > 0) {
    return disabledSnapshotResponse("The published Codex task snapshot is incomplete. Try refreshing again shortly.", generatedAt, {
      snapshotVersion: manifest.snapshotVersion,
      storageStatus: "dynamodb_incomplete"
    });
  }

  const visibleTasks = includeInactive ? allTasks : allTasks.filter((task) => task.defaultVisible);
  const counts = countSnapshotTasks(visibleTasks);

  return {
    enabled: true,
    generatedAt,
    source: "dynamodb",
    storageStatus: "dynamodb",
    workspaceId: normalizedWorkspaceId,
    snapshotVersion: manifest.snapshotVersion,
    sourceGeneratedAt: manifest.sourceGeneratedAt || null,
    sourceModifiedAtEpochMs: manifest.sourceModifiedAtEpochMs || null,
    localAuthBypass: false,
    authMode: "admin",
    inactiveHidden: !includeInactive,
    inactiveTaskCount: allTasks.filter((task) => !task.active).length,
    hiddenByDefaultTaskCount: allTasks.filter((task) => task.hiddenByDefault).length,
    activeAgentCount: (counts.working || 0) + (counts.blocked || 0),
    totalTaskCount: visibleTasks.length,
    counts,
    tasks: visibleTasks,
    warnings: []
  };
}

export async function readPublishedFirstmateTaskReport({
  db,
  now = new Date(),
  tableName,
  taskId,
  workspaceId = defaultFirstmateTaskWorkspaceId
}) {
  const generatedAt = toIsoString(now);
  if (!db || !tableName) {
    throw statusError("Codex task snapshots are not configured for this environment.", 404);
  }
  const normalizedTaskId = cleanText(taskId);
  if (!taskIdPattern.test(normalizedTaskId)) {
    throw statusError("Invalid task id.", 400);
  }

  const normalizedWorkspaceId = normalizeWorkspaceId(workspaceId);
  const manifestResult = await db.send(
    new GetCommand({
      TableName: tableName,
      Key: {
        stateScope: firstmateTaskWorkspaceScope(normalizedWorkspaceId),
        stateKey: "MANIFEST"
      }
    })
  );
  const manifest = manifestResult.Item || null;
  if (!isSnapshotManifest(manifest)) {
    throw statusError("No Codex task snapshot has been published yet.", 404);
  }

  const snapshotScope = firstmateTaskSnapshotScope(normalizedWorkspaceId, manifest.snapshotVersion);
  const [taskResult, reportResult] = await Promise.all([
    db.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          stateScope: snapshotScope,
          stateKey: `TASK#${normalizedTaskId}`
        }
      })
    ),
    db.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          stateScope: snapshotScope,
          stateKey: `REPORT#${normalizedTaskId}`
        }
      })
    )
  ]);
  const task = sanitizeFirstmateTaskForSnapshot(taskResult.Item?.task);
  const report = sanitizeFirstmateReportForSnapshot(reportResult.Item?.report, task || { id: normalizedTaskId });
  if (!task || !task.hasReport || !report) {
    throw statusError("Report not found.", 404);
  }

  return {
    generatedAt,
    source: "dynamodb",
    storageStatus: "dynamodb",
    snapshotVersion: manifest.snapshotVersion,
    taskId: normalizedTaskId,
    taskState: report.taskState || task.state || null,
    statusState: report.statusState || task.statusState || null,
    recentStatus: report.recentStatus || task.recentStatus || null,
    reportStatus: report.reportStatus || task.reportStatus || "previous",
    reportStatusLabel: report.reportStatusLabel || task.reportStatusLabel || "Report artifact",
    reportNote: report.reportNote || task.reportNote || null,
    reportIsFinal: Boolean(report.reportIsFinal ?? task.reportIsFinal),
    reportReviewReady: Boolean(report.reportReviewReady ?? task.reportReviewReady),
    reportFeedbackMode: null,
    canSendReportFeedback: false,
    markdown: report.markdown,
    markdownTruncated: Boolean(report.markdownTruncated)
  };
}

export function disabledSnapshotResponse(reason, generatedAt = toIsoString(new Date()), extra = {}) {
  return {
    enabled: false,
    generatedAt,
    source: "dynamodb",
    storageStatus: extra.storageStatus || "unavailable",
    reason,
    activeAgentCount: 0,
    totalTaskCount: 0,
    hiddenByDefaultTaskCount: 0,
    counts: emptySnapshotCounts(),
    tasks: [],
    warnings: extra.snapshotVersion ? [`Snapshot ${extra.snapshotVersion} is unavailable.`] : []
  };
}

function normalizeSnapshot(snapshot) {
  const reportsById = reportInputMap(snapshot?.reports || []);
  const pairs = (snapshot?.tasks || [])
    .map((task) => buildSnapshotTaskAndReportPair(task, reportsById))
    .filter((pair) => pair.task)
    .sort((left, right) => compareSnapshotTasks(left.task, right.task));
  const tasks = pairs.map((pair) => pair.task);
  const reports = pairs.map((pair) => pair.report).filter(Boolean).sort(compareSnapshotReports);
  const counts = countSnapshotTasks(tasks);
  return {
    schemaVersion: FIRSTMATE_TASK_SNAPSHOT_SCHEMA_VERSION,
    workspaceId: normalizeWorkspaceId(snapshot?.workspaceId),
    snapshotVersion: cleanText(snapshot?.snapshotVersion),
    generatedAt: safeIsoString(snapshot?.generatedAt) || toIsoString(new Date()),
    publishedAt: safeIsoString(snapshot?.publishedAt) || safeIsoString(snapshot?.generatedAt) || toIsoString(new Date()),
    sourceGeneratedAt: safeIsoString(snapshot?.sourceGeneratedAt) || null,
    sourceModifiedAtEpochMs: normalizeEpochMs(snapshot?.sourceModifiedAtEpochMs, Date.now()),
    tasks,
    reports,
    counts,
    reportCount: reports.length,
    totalTaskCount: tasks.length,
    activeTaskCount: tasks.filter((task) => task.active).length,
    inactiveTaskCount: tasks.filter((task) => !task.active).length,
    hiddenByDefaultTaskCount: tasks.filter((task) => task.hiddenByDefault).length
  };
}

function stripSnapshotReportGeneratedAt(report) {
  if (!report) return report;
  const { generatedAt, ...rest } = report;
  return rest;
}

function reportInputMap(reportsByTaskId) {
  const result = new Map();
  if (!reportsByTaskId) return result;
  if (reportsByTaskId instanceof Map) {
    for (const [taskId, report] of reportsByTaskId.entries()) {
      if (taskIdPattern.test(cleanText(taskId))) result.set(cleanText(taskId), report);
    }
    return result;
  }
  if (Array.isArray(reportsByTaskId)) {
    for (const report of reportsByTaskId) {
      const taskId = cleanText(report?.taskId);
      if (taskIdPattern.test(taskId)) result.set(taskId, report);
    }
    return result;
  }
  if (typeof reportsByTaskId === "object") {
    for (const [taskId, report] of Object.entries(reportsByTaskId)) {
      if (taskIdPattern.test(cleanText(taskId))) result.set(cleanText(taskId), report);
    }
  }
  return result;
}

function buildSnapshotTaskAndReportPair(task, reportInputs) {
  const sanitizedTask = sanitizeFirstmateTaskForSnapshot(task);
  if (!sanitizedTask) return { task: null, report: null };
  const hasReportInput = reportInputs.has(sanitizedTask.id);
  const sanitizedReport = hasReportInput
    ? sanitizeFirstmateReportForSnapshot(reportInputs.get(sanitizedTask.id), sanitizedTask)
    : null;
  if (!sanitizedReport) {
    return {
      task: withReportAvailability(sanitizedTask, null),
      report: null
    };
  }
  return {
    task: withReportAvailability(sanitizedTask, sanitizedReport),
    report: sanitizedReport
  };
}

function withReportAvailability(task, report) {
  const hasPublishedReport = Boolean(report);
  const reportReviewReady = hasPublishedReport ? task.reportReviewReady : false;
  const defaultVisible = isTaskDefaultVisible({ active: task.active, reportReviewReady });
  return {
    ...task,
    defaultVisible,
    hiddenByDefault: !defaultVisible,
    hasReport: hasPublishedReport,
    showReportAction: hasPublishedReport,
    reportUrl: hasPublishedReport ? `/tasks/reports/${encodeURIComponent(task.id)}` : null,
    reportActionLabel: hasPublishedReport ? task.reportActionLabel || "View report" : null,
    reportStatus: hasPublishedReport ? task.reportStatus : "none",
    reportStatusLabel: hasPublishedReport ? task.reportStatusLabel : null,
    reportNote: hasPublishedReport ? task.reportNote : null,
    reportIsFinal: hasPublishedReport ? task.reportIsFinal : false,
    reportReviewReady
  };
}

function isTaskDefaultVisible({ active, reportReviewReady }) {
  return Boolean(active || reportReviewReady);
}

function isSnapshotManifest(value) {
  return Boolean(
    value &&
    value.entityType === "FIRSTMATE_TASK_SNAPSHOT_MANIFEST" &&
    value.schemaVersion === FIRSTMATE_TASK_SNAPSHOT_SCHEMA_VERSION &&
    snapshotVersionPattern.test(cleanText(value.snapshotVersion))
  );
}

function emptySnapshotCounts() {
  return {
    queued: 0,
    working: 0,
    active: 0,
    blocked: 0,
    completed: 0,
    archived: 0,
    reportsReady: 0,
    needsResponse: 0
  };
}

function countSnapshotTasks(tasks) {
  return tasks.reduce((counts, task) => {
    const state = normalizeFirstmateSnapshotTaskState(task.state);
    counts[state] = (counts[state] || 0) + 1;
    if (state === "working") counts.active += 1;
    if (task.responseNeeded) counts.needsResponse += 1;
    if (task.hasReport && task.reportReviewReady) counts.reportsReady += 1;
    return counts;
  }, emptySnapshotCounts());
}

function compareSnapshotTasks(left, right) {
  const stateOrder = { blocked: 0, working: 1, queued: 2, completed: 3, archived: 4 };
  return (
    (stateOrder[left.state] ?? 9) - (stateOrder[right.state] ?? 9) ||
    Number(right.responseNeeded) - Number(left.responseNeeded) ||
    left.title.localeCompare(right.title) ||
    left.id.localeCompare(right.id)
  );
}

function compareSnapshotReports(left, right) {
  return left.taskId.localeCompare(right.taskId);
}

async function batchWriteAll(db, tableName, items) {
  let pending = items.map((Item) => ({ PutRequest: { Item } }));
  for (let attempt = 0; pending.length && attempt < 5; attempt += 1) {
    const result = await db.send(
      new BatchWriteCommand({
        RequestItems: {
          [tableName]: pending
        }
      })
    );
    pending = result.UnprocessedItems?.[tableName] || [];
  }
  if (pending.length) {
    throw statusError(`DynamoDB left ${pending.length} task snapshot item(s) unprocessed.`, 503);
  }
}

async function queryAll(db, input) {
  const items = [];
  let ExclusiveStartKey;
  do {
    const result = await db.send(new QueryCommand({ ...input, ExclusiveStartKey }));
    items.push(...(result.Items || []));
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
}

function normalizeWorkspaceId(value) {
  const workspaceId = cleanText(value || defaultFirstmateTaskWorkspaceId).toLowerCase();
  if (!workspaceIdPattern.test(workspaceId)) {
    throw statusError("Invalid Firstmate task workspace id.", 400);
  }
  return workspaceId;
}

function sanitizePublicText(value, maxLength) {
  const collapsed = cleanText(value)
    .replaceAll(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]")
    .replaceAll(/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g, "[redacted]")
    .replaceAll(/\b(?:password|secret|token|credential|authorization)\s*[=:]\s*\S+/gi, "[redacted]")
    .replaceAll(/(^|[\s(["'])\/(?:Users|home|tmp|var|private|Volumes)\/[^\s)"']+/g, "$1[local path]")
    .replaceAll(/[A-Za-z]:\\[^\s)"']+/g, "[local path]")
    .replaceAll(/\s+/g, " ")
    .trim();
  if (!collapsed) return "";
  return collapsed.length > maxLength ? `${collapsed.slice(0, Math.max(0, maxLength - 1)).trim()}...` : collapsed;
}

function sanitizePublicMarkdown(value, maxLength) {
  const raw = String(value || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const sanitized = stripMarkdownForAdminPreview(raw).trim();
  if (containsUnsafeReportConstructs(raw) || containsUnsafeReportConstructs(sanitized)) {
    const redacted = "Report content redacted for admin preview.";
    return {
      markdown: redacted,
      truncated: false,
      charCount: redacted.length
    };
  }
  const safeMarkdown = sanitized || "Report content is unavailable after sanitization.";
  if (safeMarkdown.length <= maxLength) {
    return {
      markdown: safeMarkdown,
      truncated: false,
      charCount: safeMarkdown.length
    };
  }
  const suffix = "\n\n[Report truncated for admin preview.]";
  const markdown = `${safeMarkdown.slice(0, Math.max(0, maxLength - suffix.length)).trim()}${suffix}`;
  return {
    markdown,
    truncated: true,
    charCount: markdown.length
  };
}

function stripMarkdownForAdminPreview(value) {
  return String(value || "")
    .replace(/<!--[\s\S]*?-->/g, "\n")
    .replace(/```[\s\S]*?```/g, "\n[code block omitted]\n")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\((?:[^)\s]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\((?:[^)\s]+)\)/g, "$1")
    .replace(/\bhttps?:\/\/[^\s<>)]+/gi, "[link]")
    .replace(/<[^>]+>/g, "")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]")
    .replace(/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g, "[redacted]")
    .replace(/\b(?:password|secret|token|credential|authorization)\s*[:=]\s*["'`]?[^"\s'`]+/gi, "[redacted]")
    .replace(/\b(?:aws[_-]?secret[_-]?access[_-]?key|x-amz-signature|x-amz-credential|x-amz-security-token|private[_-]?key)\b[^\n]*/gi, "[redacted]")
    .replace(/(^|[\s(["'`])\/(?:Users|home|tmp|var|private|Volumes)\/[^\s)"'`]+/g, "$1[local path]")
    .replace(/[A-Za-z]:\\[^\s)"'`]+/g, "[local path]")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ");
}

function containsUnsafeReportConstructs(value) {
  const text = String(value || "");
  const unsafePatterns = [
    /-----BEGIN [^-]+PRIVATE KEY-----/i,
    /(?:^|[\s"'])Authorization\s*[:=]\s*(?:Bearer|Basic)\s+\S+/i,
    /["'](?:password|secret|token|credential|authorization|api[_-]?key|access[_-]?key|private[_-]?key)["']\s*:\s*["'][^"'`\n]+["']/i,
    /\b(?:password|secret|token|credential|authorization|api[_-]?key|access[_-]?key|private[_-]?key)\s*[:=]\s*["'`]?[^"\s'`]+/i,
    /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/i,
    /https?:\/\/[^/\s]+:[^@\s]+@/i,
    /https?:\/\/[^\s<>)?]*(?:[?&](?:X-Amz-Signature|X-Amz-Credential|X-Amz-Security-Token|token|secret|password|credential)=)/i,
    /\b(?:x-amz-signature|x-amz-credential|x-amz-security-token)\b/i
  ];
  return unsafePatterns.some((pattern) => pattern.test(text));
}

function sanitizeOptionalPublicText(value, maxLength) {
  const sanitized = sanitizePublicText(value, maxLength);
  return sanitized || null;
}

function sanitizeToken(value, fallback) {
  const token = cleanText(value).toLowerCase().replaceAll(/[^a-z0-9._:-]+/g, "-").replaceAll(/^-+|-+$/g, "");
  return token || fallback;
}

function sanitizeRepo(value) {
  const repo = sanitizeToken(value, "unknown");
  return safeRepoPattern.test(repo) ? repo : "unknown";
}

function sanitizeReportStatus(value) {
  const status = sanitizeToken(value, "none");
  return ["none", "final", "review-ready", "draft", "previous", "repair-ready"].includes(status) ? status : "none";
}

function safeTaskReportUrl(value, taskId) {
  const url = cleanText(value);
  return url === `/tasks/reports/${encodeURIComponent(taskId)}` ? url : null;
}

function safeDateText(value) {
  const text = cleanText(value);
  if (!text) return null;
  return /^[0-9]{4}-[0-9]{2}-[0-9]{2}(?:T[0-9:.Z+-]+)?$/.test(text) ? text : null;
}

function safeIsoString(value) {
  const text = cleanText(value);
  if (!text) return null;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function normalizeEpochMs(value, fallback) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) && numberValue >= 0 ? Math.round(numberValue) : Math.round(fallback);
}

function titleFromTaskId(taskId) {
  return cleanText(taskId)
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ") || "Untitled task";
}

function stripUndefined(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined));
}

function chunks(values, size) {
  const result = [];
  for (let index = 0; index < values.length; index += size) {
    result.push(values.slice(index, index + size));
  }
  return result;
}

function toIsoString(value) {
  return value instanceof Date && !Number.isNaN(value.getTime()) ? value.toISOString() : new Date().toISOString();
}

function cleanText(value) {
  return String(value || "").trim();
}

function statusError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}
