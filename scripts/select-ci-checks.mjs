import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { classifyPackageLockChange } from "./select-production-deploy-targets.mjs";

const checkOrder = ["api", "web", "scripts", "audit"];
const lockfilePath = "package-lock.json";

function usage() {
  console.log(`Usage:
  node scripts/select-ci-checks.mjs [--format lines|shell|json|github-output|markdown] [base-ref] [head-ref]

When refs are omitted, changed files are read from stdin. The output is a minimal CI check list:
  none      No code checks needed.
  api       API syntax and API tests.
  web       Frontend typecheck/build and frontend tests.
  scripts   Script tests.
  audit     Dependency audits.
`);
}

function parseArgs(argv) {
  const options = { format: "lines", refs: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--format" && next) {
      options.format = next;
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    options.refs.push(arg);
  }
  return options;
}

function gitChangedFiles(refs) {
  if (refs.length >= 2 && refs[0] && refs[1]) {
    const result = spawnSync("git", ["diff", "--name-only", refs[0], refs[1]], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.status === 0)
      return { files: splitLines(result.stdout), refs: refs.slice(0, 2) };
    throw new Error(
      result.stderr || `git diff failed for ${refs[0]}..${refs[1]}`,
    );
  }

  const stdin = readStdin();
  if (stdin.trim()) return { files: splitLines(stdin), refs: [] };

  const fallback = spawnSync("git", ["diff", "--name-only", "HEAD^", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (fallback.status === 0)
    return { files: splitLines(fallback.stdout), refs: ["HEAD^", "HEAD"] };
  return { files: [], refs: [] };
}

function readStdin() {
  try {
    if (process.stdin.isTTY) return "";
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function splitLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function classifyCiChecks(files, context = {}) {
  const checks = new Set();
  const reasons = [];

  for (const file of files) {
    const decision = checksForFile(file, context);
    for (const check of decision.checks) checks.add(check);
    if (decision.reason || decision.checks.length) {
      reasons.push({ file, checks: decision.checks, reason: decision.reason });
    }
  }

  return {
    checks: checkOrder.filter((check) => checks.has(check)),
    files,
    reasons,
  };
}

function checksForFile(file, context = {}) {
  if (!file || isDocsOnly(file))
    return decision([], "Documentation or metadata only.");

  if (file === lockfilePath) {
    return checksForPackageLock(context);
  }

  if (
    file === "package.json" ||
    file === "apps/api/package.json" ||
    file === "apps/api/package-lock.json" ||
    file === "apps/web/package.json"
  ) {
    return decision(allChecks(), "Package manifest changed.");
  }

  if (
    file === ".github/workflows/ci-deploy.yml" ||
    file === "scripts/deploy-production.sh" ||
    file === "scripts/select-production-deploy-targets.mjs" ||
    file === "scripts/select-ci-checks.mjs"
  ) {
    return decision(allChecks(), "Shared CI/deploy workflow changed.");
  }

  if (file.startsWith("apps/api/server/") || isApiRuntimeData(file)) {
    return decision(["api"], "API runtime source, test, or data changed.");
  }

  if (
    file.startsWith("apps/web/src/") ||
    file === "index.html" ||
    file === "vite.config.ts" ||
    file === "tsconfig.json" ||
    file === "tsconfig.node.json"
  ) {
    return decision(
      ["web"],
      "Frontend source, test, or build configuration changed.",
    );
  }

  if (file.startsWith("scripts/")) {
    return decision(["scripts"], "Script source or test changed.");
  }

  if (file.startsWith("infra/")) {
    return decision(["scripts"], "Infrastructure template changed.");
  }

  if (file.startsWith("public/")) {
    return decision(["web"], "Public frontend asset changed.");
  }

  return decision(
    allChecks(),
    "Unknown non-documentation path changed; using conservative checks.",
  );
}

function checksForPackageLock(context = {}) {
  const lockContext = packageLockContext(context);
  if (!lockContext) {
    return decision(
      allChecks(),
      "Lockfile changed, but package-level diff was unavailable.",
    );
  }

  const deploySummary = classifyPackageLockChange(
    lockContext.baseLock,
    lockContext.headLock,
  );
  const checks = new Set(["audit"]);
  const deployTargets = new Set(deploySummary.targets);
  if (deployTargets.has("api")) checks.add("api");
  if (deployTargets.has("frontend")) checks.add("web");
  if (
    deployTargets.has("ci") ||
    deployTargets.has("data") ||
    deployTargets.has("infra")
  )
    checks.add("scripts");

  if (checks.size === 1) {
    checks.add("scripts");
  }

  return decision(
    checkOrder.filter((check) => checks.has(check)),
    `Lockfile diff mapped to CI checks from deploy routing. ${deploySummary.reason}`,
  );
}

function packageLockContext(context) {
  if (context.baseLock && context.headLock) {
    return { baseLock: context.baseLock, headLock: context.headLock };
  }

  const refs = context.refs || [];
  if (refs.length < 2) return null;

  const baseLock = readJsonFromGit(refs[0], lockfilePath);
  const headLock = readJsonFromGit(refs[1], lockfilePath);
  if (!baseLock || !headLock) return null;
  return { baseLock, headLock };
}

function readJsonFromGit(ref, filePath) {
  const result = spawnSync("git", ["show", `${ref}:${filePath}`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) return null;
  try {
    return JSON.parse(result.stdout);
  } catch {
    return null;
  }
}

function isApiRuntimeData(file) {
  return (
    file === "data/bill_field_dictionary.json" ||
    file === "data/savings_models.json" ||
    file === "data/opportunity_savings_mapping.json" ||
    file === "data/opportunity_incentive_rules.json" ||
    file === "data/opportunity_incentive_calculation_packages_v2.json" ||
    file === "data/tax_geography_rules.json" ||
    file === "data/tax_local_workflow_rules.json" ||
    file === "data/calculation_requirements.json" ||
    file === "data/project_cost_benchmarks.json" ||
    file === "data/savings_calculation_methods.json" ||
    file === "public/sample_matching_test_cases.json"
  );
}

function isDocsOnly(file) {
  return (
    file.startsWith("docs/") ||
    file === "README.md" ||
    file === "AGENTS.md" ||
    file === "AGENT_WORKFLOW.md" ||
    file === "STYLE_GUIDE.md" ||
    file === ".github/pull_request_template.md" ||
    file.endsWith(".md")
  );
}

function decision(checks, reason) {
  return { checks, reason };
}

function allChecks() {
  return [...checkOrder];
}

function writeOutput(result, format) {
  const checks = result.checks.length ? result.checks : ["none"];
  if (format === "json") {
    console.log(JSON.stringify({ ...result, checks }, null, 2));
    return;
  }
  if (format === "markdown") {
    console.log(markdownSummary(result));
    return;
  }
  if (format === "shell") {
    console.log(checks.join(" "));
    return;
  }
  if (format === "github-output") {
    const selected = new Set(result.checks);
    console.log(`checks=${checks.join(" ")}`);
    console.log(`has_checks=${checks[0] === "none" ? "false" : "true"}`);
    for (const check of checkOrder) {
      console.log(`${check}=${selected.has(check) ? "true" : "false"}`);
    }
    return;
  }
  for (const check of checks) console.log(check);
}

function markdownSummary(result) {
  const checks = result.checks.length ? result.checks : ["none"];
  const lines = [
    "### CI check routing",
    "",
    `- Checks: ${checks.map((check) => `\`${check}\``).join(", ")}`,
    `- Changed files considered: ${result.files.length}`,
    "",
  ];

  if (result.reasons.length) {
    lines.push("| File | Checks | Reason |");
    lines.push("| --- | --- | --- |");
    for (const item of result.reasons.slice(0, 25)) {
      const itemChecks = item.checks.length
        ? item.checks.map((check) => `\`${check}\``).join(", ")
        : "`none`";
      lines.push(
        `| ${escapeMarkdownTable(item.file)} | ${itemChecks} | ${escapeMarkdownTable(item.reason || "")} |`,
      );
    }
    if (result.reasons.length > 25) {
      lines.push(
        `| ... | ... | ${result.reasons.length - 25} more changed-file decisions omitted. |`,
      );
    }
  } else {
    lines.push("No code-check-affecting files were found.");
  }

  return lines.join("\n");
}

function escapeMarkdownTable(value) {
  return String(value || "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    process.exit(0);
  }
  const changedFiles = gitChangedFiles(options.refs);
  writeOutput(
    classifyCiChecks(changedFiles.files, { refs: changedFiles.refs }),
    options.format,
  );
}

const isCliEntryPoint = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isCliEntryPoint) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
