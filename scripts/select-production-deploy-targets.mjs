import { spawnSync } from "node:child_process";
import fs from "node:fs";

const targetOrder = ["ci", "data", "api", "infra", "frontend"];

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
      stdio: ["ignore", "pipe", "pipe"]
    });
    if (result.status === 0) return splitLines(result.stdout);
    throw new Error(result.stderr || `git diff failed for ${refs[0]}..${refs[1]}`);
  }

  const stdin = readStdin();
  if (stdin.trim()) return splitLines(stdin);

  const fallback = spawnSync("git", ["diff", "--name-only", "HEAD^", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
  if (fallback.status === 0) return splitLines(fallback.stdout);
  return [];
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

function classifyFiles(files) {
  const targets = new Set();
  const reasons = [];

  for (const file of files) {
    const fileTargets = targetsForFile(file);
    for (const target of fileTargets) targets.add(target);
    if (fileTargets.length) reasons.push({ file, targets: fileTargets });
  }

  const orderedTargets = targetOrder.filter((target) => targets.has(target));
  return { files, reasons, targets: orderedTargets };
}

function targetsForFile(file) {
  if (!file || isDocsOnly(file)) return [];

  if (
    file === "scripts/deploy-production.sh" ||
    file === "scripts/select-production-deploy-targets.mjs" ||
    file === "package.json" ||
    file === "package-lock.json" ||
    file === "apps/api/package-lock.json"
  ) {
    return ["ci", "data", "api", "infra", "frontend"];
  }

  if (file === "infra/github-actions-deploy-role.yaml") {
    return ["ci"];
  }

  if (
    file === "infra/runtime-data.yaml" ||
    file === "infra/runtime-buckets.yaml" ||
    file === "scripts/migrate-runtime-state-resources.mjs"
  ) {
    return ["data"];
  }

  if (
    file === "infra/production-hosting.yaml" ||
    file === "infra/api-hosting.yaml" ||
    file === "infra/frontend-hosting.yaml"
  ) {
    return ["infra"];
  }

  if (
    file.startsWith("apps/api/server/") ||
    file === "apps/api/package.json" ||
    file === "apps/api/server"
  ) {
    return ["api"];
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
    return ["frontend"];
  }

  if (
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
  ) {
    return ["api"];
  }

  return [];
}

function isDocsOnly(file) {
  return (
    file.startsWith("docs/") ||
    file === "README.md" ||
    file === "AI_CHANGELOG.md" ||
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
  if (format === "shell") {
    console.log(targets.join(" "));
    return;
  }
  if (format === "github-output") {
    console.log(`targets=${targets.join(" ")}`);
    console.log(`has_deploy=${targets[0] === "none" ? "false" : "true"}`);
    console.log(`summary=${targets.join(",")}`);
    return;
  }
  for (const target of targets) console.log(target);
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    process.exit(0);
  }
  const files = gitChangedFiles(options.refs);
  writeOutput(classifyFiles(files), options.format);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
