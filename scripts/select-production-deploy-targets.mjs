import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const targetOrder = ["ci", "data", "api", "infra", "frontend"];
const lockfilePath = "package-lock.json";
const apiWorkspacePath = "apps/api";
const webWorkspacePath = "apps/web";
const frontendBuildDependencyRoots = new Set([
  "react",
  "react-dom",
  "sharp",
  "vite",
  "@vitejs/plugin-react",
  "typescript",
]);

function usage() {
  console.log(`Usage:
  node scripts/select-production-deploy-targets.mjs [--format lines|shell|json|github-output] [base-ref] [head-ref]

When refs are omitted, changed files are read from stdin. The output is a minimal deploy target list:
  none       No production deploy needed.
  ci         GitHub Actions deploy-role bootstrap stack.
  data       Runtime/data stacks only.
  api        API Lambda/API stack.
  infra      Hosting/edge stack.
  frontend   Frontend build/static sync.
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

export function classifyFiles(files, context = {}) {
  const targets = new Set();
  const reasons = [];

  for (const file of files) {
    const decision = targetsForFile(file, context);
    for (const target of decision.targets) targets.add(target);
    if (decision.reason || decision.targets.length) {
      reasons.push({
        file,
        targets: decision.targets,
        reason: decision.reason,
      });
    }
  }

  const orderedTargets = targetOrder.filter((target) => targets.has(target));
  return { files, reasons, targets: orderedTargets };
}

function targetsForFile(file, context = {}) {
  if (!file || isDocsOnly(file))
    return decision([], "Documentation or metadata only.");
  if (isTestOnly(file)) return decision([], "Test or fixture only.");

  if (file === lockfilePath) {
    return targetsForPackageLock(context);
  }

  if (
    file === "scripts/deploy-production.sh" ||
    file === "scripts/select-production-deploy-targets.mjs" ||
    file === "package.json" ||
    file === "apps/api/package-lock.json"
  ) {
    return decision(
      ["ci", "data", "api", "infra", "frontend"],
      "Shared deploy/runtime configuration.",
    );
  }

  if (file === "scripts/generate-home-journey-frames.mjs") {
    return decision(
      ["frontend"],
      "Frontend frame-generation pipeline changed.",
    );
  }

  if (file === "infra/github-actions-deploy-role.yaml") {
    return decision(["ci"], "GitHub Actions deploy-role stack.");
  }

  if (
    file === "infra/runtime-data.yaml" ||
    file === "infra/runtime-buckets.yaml" ||
    file === "scripts/migrate-runtime-state-resources.mjs"
  ) {
    return decision(["data"], "Runtime data resource definition.");
  }

  if (
    file === "infra/production-hosting.yaml" ||
    file === "infra/api-hosting.yaml" ||
    file === "infra/frontend-hosting.yaml"
  ) {
    return decision(["infra"], "Production hosting infrastructure template.");
  }

  if (
    file.startsWith("apps/api/server/") ||
    file === "apps/api/package.json" ||
    file === "apps/api/server"
  ) {
    return decision(["api"], "API Lambda source or package manifest.");
  }

  if (
    file.startsWith("apps/web/src/") ||
    file.startsWith("public/") ||
    file === "index.html" ||
    file === "vite.config.ts" ||
    file === "tsconfig.json" ||
    file === "tsconfig.node.json" ||
    file === "apps/web/package.json" ||
    file === "apps/web/src"
  ) {
    return decision(
      ["frontend"],
      "Frontend source, static asset, or build configuration.",
    );
  }

  if (
    file === "data/bill_field_dictionary.json" ||
    file === "data/savings_models.json" ||
    file === "data/opportunity_savings_mapping.json" ||
    file === "data/opportunity_incentive_rules.json" ||
    file === "data/opportunity_incentive_calculation_packages_v2.json" ||
    file === "data/tax_geography_rules.json" ||
    file === "data/tax_local_workflow_rules.json" ||
    file === "data/opportunity_award_audit_overlay.v1.json" ||
    file === "data/opportunity_availability_dispositions.v1.json" ||
    file === "data/tax_gap_runtime_rules_2026-07-05.json" ||
    file === "data/calculation_requirements.json" ||
    file === "data/project_cost_benchmarks.json" ||
    file === "data/savings_calculation_methods.json" ||
    file === "public/sample_matching_test_cases.json"
  ) {
    return decision(["api"], "API runtime data input.");
  }

  return decision([], "No production deploy rule matched.");
}

function decision(targets, reason) {
  return { targets, reason };
}

function targetsForPackageLock(context = {}) {
  const lockContext = packageLockContext(context);
  if (!lockContext) {
    return decision(
      ["ci", "data", "api", "infra", "frontend"],
      "Lockfile changed, but package-level diff was unavailable; using conservative full deploy.",
    );
  }

  const summary = classifyPackageLockChange(
    lockContext.baseLock,
    lockContext.headLock,
  );
  return decision(summary.targets, summary.reason);
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

export function classifyPackageLockChange(baseLock, headLock) {
  const changedEntries = changedLockPackageEntries(baseLock, headLock);
  if (!changedEntries.length) {
    return {
      targets: [],
      reason: "Lockfile changed without package entry changes.",
    };
  }

  const packageNames = changedEntries
    .map((entryPath) => packageNameForLockPath(entryPath))
    .filter(Boolean);
  const changedPackages = new Set(packageNames);
  const apiRuntimeClosure = dependencyClosure(
    headLock,
    directDependenciesForWorkspace(headLock, apiWorkspacePath, {
      includeDevDependencies: false,
    }),
  );
  const frontendBuildClosure = dependencyClosure(
    headLock,
    frontendBuildRoots(headLock),
  );
  const scriptAwsClosure = dependencyClosure(
    headLock,
    scriptAwsRoots(headLock),
  );

  const targets = new Set();
  const apiMatches = [];
  const frontendMatches = [];
  const scriptAwsMatches = [];

  for (const packageName of changedPackages) {
    if (apiRuntimeClosure.has(packageName)) {
      targets.add("api");
      apiMatches.push(packageName);
      continue;
    }
    if (frontendBuildClosure.has(packageName)) {
      targets.add("frontend");
      frontendMatches.push(packageName);
      continue;
    }
    if (scriptAwsClosure.has(packageName)) {
      targets.add("data");
      targets.add("infra");
      scriptAwsMatches.push(packageName);
    }
  }

  const orderedTargets = targetOrder.filter((target) => targets.has(target));
  return {
    targets: orderedTargets,
    reason: packageLockReason({
      changedEntries,
      changedPackages: [...changedPackages],
      apiMatches,
      frontendMatches,
      scriptAwsMatches,
      targets: orderedTargets,
    }),
  };
}

function packageLockReason(summary) {
  const parts = [];
  if (summary.apiMatches.length) {
    parts.push(`API runtime packages: ${compactList(summary.apiMatches)}`);
  }
  if (summary.frontendMatches.length) {
    parts.push(
      `frontend runtime/build packages: ${compactList(summary.frontendMatches)}`,
    );
  }
  if (summary.scriptAwsMatches.length) {
    parts.push(
      `script-only AWS packages: ${compactList(summary.scriptAwsMatches)}`,
    );
  }
  if (parts.length) {
    return `Lockfile package diff mapped to ${summary.targets.join(", ")}. ${parts.join("; ")}.`;
  }

  return `Lockfile package diff only touched CI/dev-only packages: ${compactList(summary.changedPackages)}.`;
}

function changedLockPackageEntries(baseLock, headLock) {
  const basePackages = baseLock?.packages || {};
  const headPackages = headLock?.packages || {};
  const allPaths = new Set([
    ...Object.keys(basePackages),
    ...Object.keys(headPackages),
  ]);
  return [...allPaths]
    .filter((entryPath) => !isWorkspaceLockEntry(entryPath))
    .filter(
      (entryPath) =>
        stableJson(basePackages[entryPath]) !==
        stableJson(headPackages[entryPath]),
    )
    .sort();
}

function isWorkspaceLockEntry(entryPath) {
  return (
    entryPath === "" ||
    entryPath === apiWorkspacePath ||
    entryPath === webWorkspacePath
  );
}

function stableJson(value) {
  return JSON.stringify(value ?? null);
}

function directDependenciesForWorkspace(lock, workspacePath, options = {}) {
  const manifest = lock?.packages?.[workspacePath] || {};
  return dependencyNamesFromManifest(manifest, options);
}

function dependencyNamesFromManifest(manifest, options = {}) {
  const includeDevDependencies = Boolean(options.includeDevDependencies);
  return new Set([
    ...Object.keys(manifest.dependencies || {}),
    ...Object.keys(manifest.optionalDependencies || {}),
    ...(includeDevDependencies
      ? Object.keys(manifest.devDependencies || {})
      : []),
  ]);
}

function frontendBuildRoots(lock) {
  const manifest = lock?.packages?.[webWorkspacePath] || {};
  const rootManifest = lock?.packages?.[""] || {};
  const roots = new Set(Object.keys(manifest.dependencies || {}));
  for (const dep of Object.keys(manifest.devDependencies || {})) {
    if (frontendBuildDependencyRoots.has(dep)) roots.add(dep);
  }
  for (const dep of Object.keys(rootManifest.devDependencies || {})) {
    if (frontendBuildDependencyRoots.has(dep)) roots.add(dep);
  }
  return roots;
}

function scriptAwsRoots(lock) {
  const manifest = lock?.packages?.[""] || {};
  const roots = new Set();
  for (const dep of dependencyNamesFromManifest(manifest, {
    includeDevDependencies: true,
  })) {
    if (dep.startsWith("@aws-sdk/")) roots.add(dep);
  }
  for (const dep of directDependenciesForWorkspace(lock, apiWorkspacePath, {
    includeDevDependencies: false,
  })) {
    roots.delete(dep);
  }
  return roots;
}

function dependencyClosure(lock, roots) {
  const result = new Set();
  const queue = [...roots];
  while (queue.length) {
    const packageName = queue.shift();
    if (!packageName || result.has(packageName)) continue;
    result.add(packageName);

    const packageEntry = packageEntryForName(lock, packageName);
    if (!packageEntry) continue;
    for (const dep of Object.keys(packageEntry.dependencies || {}))
      queue.push(dep);
    for (const dep of Object.keys(packageEntry.optionalDependencies || {}))
      queue.push(dep);
  }
  return result;
}

function packageEntryForName(lock, packageName) {
  return lock?.packages?.[`node_modules/${packageName}`] || null;
}

function packageNameForLockPath(entryPath) {
  if (!entryPath || !entryPath.includes("node_modules/")) return null;
  const parts = entryPath.split("node_modules/");
  const packagePath = parts[parts.length - 1];
  const segments = packagePath.split("/");
  if (segments[0]?.startsWith("@")) return `${segments[0]}/${segments[1]}`;
  return segments[0] || null;
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

function compactList(items, limit = 8) {
  const unique = [...new Set(items)].sort(comparePackageNamesForDisplay);
  if (unique.length <= limit) return unique.join(", ");
  return `${unique.slice(0, limit).join(", ")}, and ${unique.length - limit} more`;
}

function comparePackageNamesForDisplay(left, right) {
  const leftPriority = packageDisplayPriority(left);
  const rightPriority = packageDisplayPriority(right);
  if (leftPriority !== rightPriority) return leftPriority - rightPriority;
  return left.localeCompare(right);
}

function packageDisplayPriority(packageName) {
  if (
    packageName.startsWith("@esbuild/") ||
    packageName.startsWith("@rollup/rollup-")
  )
    return 2;
  if (packageName.startsWith("@")) return 1;
  return 0;
}

function isTestOnly(file) {
  return (
    file.includes("/__fixtures__/") || /\.(test|spec)\.[cm]?[jt]sx?$/.test(file)
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

function writeOutput(result, format) {
  const targets = result.targets.length ? result.targets : ["none"];
  if (format === "json") {
    console.log(JSON.stringify({ ...result, targets }, null, 2));
    return;
  }
  if (format === "markdown") {
    console.log(markdownSummary(result));
    return;
  }
  if (format === "shell") {
    console.log(targets.join(" "));
    return;
  }
  if (format === "github-output") {
    console.log(`targets=${targets.join(" ")}`);
    console.log(`has_deploy=${targets[0] === "none" ? "false" : "true"}`);
    console.log(`summary=${targets.join(",")}`);
    console.log("markdown_summary<<GBS_DEPLOY_SUMMARY");
    console.log(markdownSummary(result));
    console.log("GBS_DEPLOY_SUMMARY");
    return;
  }
  for (const target of targets) console.log(target);
}

function markdownSummary(result) {
  const targets = result.targets.length ? result.targets : ["none"];
  const lines = [
    "### Production deploy routing",
    "",
    `- Targets: ${targets.map((target) => `\`${target}\``).join(", ")}`,
    `- Changed files considered: ${result.files.length}`,
    "",
  ];

  if (result.reasons.length) {
    lines.push("| File | Targets | Reason |");
    lines.push("| --- | --- | --- |");
    for (const item of result.reasons.slice(0, 25)) {
      const itemTargets = item.targets.length
        ? item.targets.map((target) => `\`${target}\``).join(", ")
        : "`none`";
      lines.push(
        `| ${escapeMarkdownTable(item.file)} | ${itemTargets} | ${escapeMarkdownTable(item.reason || "")} |`,
      );
    }
    if (result.reasons.length > 25) {
      lines.push(
        `| ... | ... | ${result.reasons.length - 25} more changed-file decisions omitted. |`,
      );
    }
  } else {
    lines.push("No production deploy-affecting files were found.");
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
    classifyFiles(changedFiles.files, { refs: changedFiles.refs }),
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
