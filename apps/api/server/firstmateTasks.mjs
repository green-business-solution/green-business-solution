import fs from "node:fs/promises";
import path from "node:path";

const taskIdPattern = /^[a-z0-9][a-z0-9._-]{0,120}$/i;
const enabledValues = new Set(["1", "true", "yes", "on"]);

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

export async function readFirstmateTasksDashboard({ env = process.env, now = new Date() } = {}) {
  const config = firstmateTasksConfigFromEnv(env);
  const generatedAt = toIsoString(now);

  if (!config.enabled) {
    return disabledFirstmateTasksResponse(config.reason, generatedAt);
  }

  const firstmateHome = path.resolve(config.firstmateHome);
  const homeStatus = await statDirectory(firstmateHome);
  if (!homeStatus.exists) {
    return disabledFirstmateTasksResponse("Configured Firstmate home does not exist.", generatedAt);
  }
  if (!homeStatus.isDirectory) {
    return disabledFirstmateTasksResponse("Configured Firstmate home is not a directory.", generatedAt);
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
      window: cleanOptional(meta.window) || existing.window
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
          hasReport,
          reportUrl: hasReport ? `/tasks/reports/${encodeURIComponent(task.id)}` : null
        };
      })
  );
  const sortedTasks = tasks.sort(compareTasks);
  const counts = countTasksByState(sortedTasks);

  return {
    enabled: true,
    generatedAt,
    firstmateHome,
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
    return {
      generatedAt: toIsoString(now),
      taskId: normalizedTaskId,
      markdown
    };
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw statusError("Report not found.", 404);
    }
    throw error;
  }
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

function disabledFirstmateTasksResponse(reason, generatedAt) {
  return {
    enabled: false,
    reason,
    generatedAt,
    activeAgentCount: 0,
    totalTaskCount: 0,
    counts: {
      active: 0,
      completed: 0,
      blocked: 0,
      queued: 0
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
      return counts;
    },
    {
      active: 0,
      completed: 0,
      blocked: 0,
      queued: 0
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

function normalizeTaskId(taskId) {
  const value = String(taskId || "").trim();
  return taskIdPattern.test(value) ? value : "";
}

function statusError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function toIsoString(value) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}
