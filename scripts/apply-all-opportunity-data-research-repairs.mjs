import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatOpportunityDataRepairValidationResult,
  validateOpportunityDataRepairFiles
} from "./validate-opportunity-data-research-repairs.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultManifestPath = path.join(repoRoot, "data/opportunity_data_repair_batches.json");

const { manifestPath, dryRun } = parseArgs(process.argv.slice(2));
const manifest = readManifest(manifestPath);
const repairPaths = manifest.batches.map((batch, index) => resolveBatchPath(batch, index));
const validationResult = validateOpportunityDataRepairFiles(repairPaths, { allowDuplicateIdsAcrossFiles: true });

process.stdout.write(formatOpportunityDataRepairValidationResult(validationResult));
if (!validationResult.ok) {
  process.exitCode = 1;
} else if (dryRun) {
  process.stdout.write(`Dry run only. Ordered repair files:\n${repairPaths.map((filePath) => `- ${path.relative(repoRoot, filePath)}`).join("\n")}\n`);
} else {
  execFileSync(process.execPath, [path.join(repoRoot, "scripts/apply-opportunity-data-research-repairs.mjs"), ...repairPaths], {
    cwd: repoRoot,
    stdio: "inherit",
    env: process.env
  });
}

function readManifest(manifestPath) {
  const artifact = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (artifact.schemaVersion !== "opportunity_data_repair_batches.v1") {
    throw new Error(`Unsupported manifest schemaVersion: ${String(artifact.schemaVersion)}`);
  }
  if (!Array.isArray(artifact.batches) || artifact.batches.length === 0) {
    throw new Error("Manifest must contain a non-empty batches array");
  }
  return artifact;
}

function resolveBatchPath(batch, index) {
  if (!batch || typeof batch !== "object" || typeof batch.path !== "string" || !batch.path.trim()) {
    throw new Error(`Manifest batch ${index + 1} must include a non-empty path`);
  }
  const resolved = path.resolve(repoRoot, batch.path);
  if (!fs.existsSync(resolved)) throw new Error(`Manifest batch ${index + 1} does not exist: ${batch.path}`);
  return resolved;
}

function parseArgs(args) {
  let manifestPath = defaultManifestPath;
  let dryRun = false;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--manifest") {
      const value = args[++index];
      if (!value) throw new Error("--manifest requires a path");
      manifestPath = path.resolve(value);
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return { manifestPath, dryRun };
}
