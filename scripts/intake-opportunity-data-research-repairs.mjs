import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatOpportunityDataRepairValidationResult,
  readExpectedOpportunityIds,
  validateOpportunityDataRepairArtifacts
} from "./validate-opportunity-data-research-repairs.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultManifestPath = path.join(repoRoot, "data/opportunity_data_repair_batches.json");
const defaultExpectedCount = null;

export function parseGptRepairOutput(raw) {
  const trimmed = String(raw || "").replace(/^\uFEFF/, "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // Continue to extraction below.
  }

  const fenced = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(trimmed);
  if (fenced) return JSON.parse(fenced[1]);

  const jsonText = extractFirstJsonObject(trimmed);
  if (!jsonText) throw new Error("could not find a JSON object in GPT output");
  return JSON.parse(jsonText);
}

export function normalizeOpportunityDataRepairArtifact(source, options = {}) {
  const artifact = {
    schemaVersion: "opportunity_data_research_repairs.v1",
    researchedAt: cleanText(source?.researchedAt) || options.researchedAt || new Date().toISOString().slice(0, 10),
    source: cleanText(source?.source) || "gpt_pro",
    batchNotes: [
      ...(Array.isArray(source?.batchNotes) ? source.batchNotes.map(cleanText).filter(Boolean) : []),
      "Normalized by scripts/intake-opportunity-data-research-repairs.mjs before validation."
    ],
    repairs: Array.isArray(source?.repairs) ? source.repairs.map(normalizeRepair) : [],
    continueFromOpportunityId:
      source?.continueFromOpportunityId === undefined ? options.continueFromOpportunityId ?? null : source.continueFromOpportunityId
  };

  if (artifact.continueFromOpportunityId !== null) {
    artifact.continueFromOpportunityId = cleanText(artifact.continueFromOpportunityId) || null;
  }

  return artifact;
}

export function intakeOpportunityDataRepairOutput(options) {
  const inputPath = path.resolve(repoRoot, requiredOption(options.inputPath, "--input"));
  const promptPath = path.resolve(repoRoot, requiredOption(options.promptPath, "--prompt"));
  const expectedOpportunityIds = readExpectedOpportunityIds(promptPath);
  if (options.expectedCount !== null && expectedOpportunityIds.length !== options.expectedCount) {
    throw new Error(
      `${path.relative(repoRoot, promptPath)} contains ${expectedOpportunityIds.length} targets; expected ${options.expectedCount}`
    );
  }

  const parsed = parseGptRepairOutput(fs.readFileSync(inputPath, "utf8"));
  const normalized = normalizeOpportunityDataRepairArtifact(parsed);
  const outputPath = path.resolve(repoRoot, options.outputPath || defaultOutputPath(normalized, options.batchNumber));
  const relativeOutputPath = path.relative(repoRoot, outputPath);
  const validationResult = validateOpportunityDataRepairArtifacts(
    [{ filePath: outputPath, artifact: normalized }],
    { expectedOpportunityIds, allowDuplicateIdsAcrossFiles: false }
  );

  if (!validationResult.ok) {
    throw new Error(`Normalized GPT repair output failed validation:\n${formatOpportunityDataRepairValidationResult(validationResult)}`);
  }

  if (!options.dryRun) {
    if (fs.existsSync(outputPath) && !options.force) {
      throw new Error(`output file already exists: ${relativeOutputPath}. Use --force to overwrite.`);
    }
    writeJson(outputPath, normalized);
    if (options.updateManifest) updateManifest(options.manifestPath, relativeOutputPath);
  }

  return {
    outputPath,
    relativeOutputPath,
    promptPath,
    expectedOpportunityIds,
    artifact: normalized,
    validationResult,
    manifestUpdated: Boolean(options.updateManifest && !options.dryRun)
  };
}

function normalizeRepair(repair) {
  return {
    opportunityId: cleanText(repair?.opportunityId),
    confidence: normalizeEnum(repair?.confidence, new Set(["high", "medium", "low"]), "medium"),
    availabilityStatus: normalizeAvailabilityStatus(repair?.availabilityStatus),
    geography: {
      country: cleanText(repair?.geography?.country) || "US",
      states: uniqueStrings(repair?.geography?.states),
      counties: uniqueStrings(repair?.geography?.counties),
      cities: uniqueStrings(repair?.geography?.cities),
      utilityTerritories: uniqueStrings(repair?.geography?.utilityTerritories),
      notes: cleanText(repair?.geography?.notes)
    },
    eligibleApplicantTypes: uniqueStrings(repair?.eligibleApplicantTypes),
    eligibleSectors: uniqueStrings(repair?.eligibleSectors),
    eligibleRetrofitCategories: uniqueStrings(repair?.eligibleRetrofitCategories).map((value) =>
      value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "")
    ),
    hardRequirements: uniqueStrings(repair?.hardRequirements).map(cleanEvidenceText),
    blockers: uniqueStrings(repair?.blockers).map(cleanEvidenceText),
    programType: titleProgramType(cleanText(repair?.programType)),
    administrator: cleanText(repair?.administrator),
    applicationUrl: normalizeRawUrl(repair?.applicationUrl),
    websiteUrl: normalizeRawUrl(repair?.websiteUrl),
    sourceUrlsChecked: uniqueStrings(asArray(repair?.sourceUrlsChecked).map(normalizeRawUrl).filter(Boolean)),
    evidenceText: cleanEvidenceText(repair?.evidenceText),
    reasoningNotes: cleanEvidenceText(repair?.reasoningNotes)
  };
}

function extractFirstJsonObject(value) {
  const start = value.indexOf("{");
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < value.length; index += 1) {
    const char = value[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
    } else if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) return value.slice(start, index + 1);
    }
  }

  return null;
}

function defaultOutputPath(artifact, batchNumber) {
  if (!batchNumber) throw new Error("--batch-number is required when --output is not provided");
  const researchedAt = cleanText(artifact.researchedAt).slice(0, 10) || new Date().toISOString().slice(0, 10);
  return path.join(repoRoot, "data", `opportunity_data_research_repairs_gpt_pro_${researchedAt}_batch${batchNumber}.json`);
}

function updateManifest(manifestPath, relativeOutputPath) {
  const resolvedManifestPath = path.resolve(repoRoot, manifestPath || defaultManifestPath);
  const manifest = JSON.parse(fs.readFileSync(resolvedManifestPath, "utf8"));
  if (manifest.schemaVersion !== "opportunity_data_repair_batches.v1" || !Array.isArray(manifest.batches)) {
    throw new Error(`unsupported opportunity-data repair manifest: ${path.relative(repoRoot, resolvedManifestPath)}`);
  }
  if (!manifest.batches.some((batch) => batch?.path === relativeOutputPath)) {
    manifest.batches.push({ path: relativeOutputPath });
  }
  manifest.updatedAt = new Date().toISOString().slice(0, 10);
  writeJson(resolvedManifestPath, manifest);
}

function normalizeRawUrl(value) {
  if (value === null || value === undefined || value === "") return null;
  const raw = cleanText(value);
  const markdown = /^\[([^\]]*)\]\((https?:\/\/[^)]+)\)$/i.exec(raw);
  const candidate = markdown ? markdown[2] : extractRawUrl(raw);
  if (!candidate) return raw;
  const cleaned = candidate
    .replace(/%22.*$/i, "")
    .replace(/\\u0022.*$/i, "")
    .replace(/["'<>\]\),]+$/g, "");
  try {
    const url = new URL(cleaned);
    if (!["http:", "https:"].includes(url.protocol)) return raw;
    return url.toString();
  } catch {
    return raw;
  }
}

function extractRawUrl(value) {
  const match = String(value || "").match(/https?:\/\/[^\s\]\)"'<>]+/i);
  return match?.[0] || null;
}

function cleanEvidenceText(value) {
  return cleanText(value)
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/gi, "$1")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeAvailabilityStatus(value) {
  const raw = cleanText(value).toLowerCase();
  const aliases = new Map([
    ["closed", "unavailable"],
    ["expired", "expired"],
    ["inactive", "unavailable"],
    ["no_longer_available", "unavailable"],
    ["source inaccessible", "source_inaccessible"],
    ["source-inaccessible", "source_inaccessible"]
  ]);
  const normalized = aliases.get(raw) || raw;
  return normalizeEnum(
    normalized,
    new Set(["active", "rolling", "unavailable", "upcoming", "temporarily_closed", "unknown", "source_inaccessible", "expired"]),
    "unknown"
  );
}

function normalizeEnum(value, allowed, fallback) {
  const normalized = cleanText(value).toLowerCase();
  return allowed.has(normalized) ? normalized : fallback;
}

function titleProgramType(value) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bEv\b/g, "EV")
    .replace(/\bPv\b/g, "PV");
}

function uniqueStrings(values) {
  return [...new Set(asArray(values).map(cleanText).filter(Boolean))];
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function requiredOption(value, flag) {
  if (!value) throw new Error(`${flag} is required`);
  return value;
}

function parseArgs(args) {
  const options = {
    inputPath: null,
    promptPath: null,
    batchNumber: null,
    outputPath: null,
    manifestPath: defaultManifestPath,
    updateManifest: false,
    dryRun: false,
    force: false,
    expectedCount: defaultExpectedCount
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--input") {
      options.inputPath = args[++index];
    } else if (arg === "--prompt") {
      options.promptPath = args[++index];
    } else if (arg === "--batch-number") {
      options.batchNumber = positiveInteger(args[++index], arg);
    } else if (arg === "--output") {
      options.outputPath = args[++index];
    } else if (arg === "--manifest") {
      options.manifestPath = args[++index];
    } else if (arg === "--update-manifest") {
      options.updateManifest = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--expected-count") {
      const value = args[++index];
      options.expectedCount = value === "any" ? null : positiveInteger(value, arg);
    } else {
      throw new Error(`unknown option: ${arg}`);
    }
  }

  return options;
}

function positiveInteger(value, flag) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${flag} must be a positive integer`);
  return number;
}

function main() {
  try {
    const result = intakeOpportunityDataRepairOutput(parseArgs(process.argv.slice(2)));
    process.stdout.write("GPT Pro opportunity-data repair intake passed.\n");
    process.stdout.write(formatOpportunityDataRepairValidationResult(result.validationResult));
    process.stdout.write(`Output: ${result.relativeOutputPath}\n`);
    process.stdout.write(`Prompt: ${path.relative(repoRoot, result.promptPath)}\n`);
    process.stdout.write(`Targets: ${result.expectedOpportunityIds.length}\n`);
    process.stdout.write(`Manifest updated: ${result.manifestUpdated ? "yes" : "no"}\n`);
  } catch (error) {
    process.stderr.write(`GPT Pro opportunity-data repair intake failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) main();
