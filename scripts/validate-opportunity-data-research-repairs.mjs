import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const expectedSchemaVersion = "opportunity_data_research_repairs.v1";
const allowedAvailabilityStatuses = new Set([
  "active",
  "rolling",
  "unavailable",
  "upcoming",
  "temporarily_closed",
  "unknown",
  "source_inaccessible",
  "expired"
]);
const allowedConfidences = new Set(["high", "medium", "low"]);
const urlFields = ["applicationUrl", "websiteUrl"];
const arrayFields = [
  "eligibleApplicantTypes",
  "eligibleSectors",
  "eligibleRetrofitCategories",
  "hardRequirements",
  "blockers",
  "sourceUrlsChecked"
];
const requiredTextFields = ["programType", "administrator", "evidenceText", "reasoningNotes"];
const evidencePollutionPattern =
  /%22|\\u0022|\]\(https?:\/\/|\b(?:sourceUrlsChecked|websiteUrl|applicationUrl)\b|"?(?:sourceUrlsChecked|websiteUrl|applicationUrl|evidenceText)"?\s*:/i;

export function readOpportunityDataRepairArtifact(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

export function validateOpportunityDataRepairFiles(filePaths, options = {}) {
  const artifacts = [];
  const errors = [];

  for (const filePath of filePaths) {
    try {
      artifacts.push({ filePath, artifact: readOpportunityDataRepairArtifact(filePath) });
    } catch (error) {
      errors.push(issue(filePath, "$", `invalid JSON: ${error.message}`));
    }
  }

  const result = validateOpportunityDataRepairArtifacts(artifacts, options);
  result.errors.unshift(...errors);
  return result;
}

export function validateOpportunityDataRepairArtifacts(artifacts, options = {}) {
  const errors = [];
  const warnings = [];
  const repairRows = [];
  const duplicateIdsAcrossFiles = new Map();
  const allowDuplicateIdsAcrossFiles = options.allowDuplicateIdsAcrossFiles !== false;

  for (const { filePath, artifact } of artifacts) {
    const file = path.relative(process.cwd(), path.resolve(filePath));
    validateArtifactEnvelope({ artifact, file, errors, warnings });

    if (!Array.isArray(artifact?.repairs)) continue;

    const idsInFile = new Map();
    artifact.repairs.forEach((repair, index) => {
      const location = `$.repairs[${index}]`;
      validateRepair({ repair, file, location, errors, warnings });
      if (!repair?.opportunityId) return;

      repairRows.push({ file, opportunityId: repair.opportunityId, index });
      idsInFile.set(repair.opportunityId, (idsInFile.get(repair.opportunityId) || 0) + 1);
      const files = duplicateIdsAcrossFiles.get(repair.opportunityId) || new Set();
      files.add(file);
      duplicateIdsAcrossFiles.set(repair.opportunityId, files);
    });

    for (const [opportunityId, count] of idsInFile) {
      if (count > 1) errors.push(issue(file, "$.repairs", `duplicate opportunityId within file: ${opportunityId}`));
    }
  }

  if (!allowDuplicateIdsAcrossFiles) {
    for (const [opportunityId, files] of duplicateIdsAcrossFiles) {
      if (files.size > 1) {
        errors.push(
          issue(
            "(multiple files)",
            "$.repairs",
            `duplicate opportunityId across files: ${opportunityId} in ${[...files].join(", ")}`
          )
        );
      }
    }
  }

  validateExpectedOpportunityIds({ repairRows, expectedOpportunityIds: options.expectedOpportunityIds, errors });

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    repairCount: repairRows.length,
    uniqueRepairCount: new Set(repairRows.map((row) => row.opportunityId)).size,
    fileCount: artifacts.length
  };
}

export function formatOpportunityDataRepairValidationResult(result) {
  const lines = [];
  lines.push(result.ok ? "Opportunity data repair validation passed." : "Opportunity data repair validation failed.");
  lines.push(`Files checked: ${result.fileCount}`);
  lines.push(`Repairs checked: ${result.repairCount}`);
  lines.push(`Unique repairs: ${result.uniqueRepairCount}`);
  if (result.errors.length > 0) {
    lines.push("");
    lines.push("Errors:");
    lines.push(...result.errors.map((entry) => `- ${formatIssue(entry)}`));
  }
  if (result.warnings.length > 0) {
    lines.push("");
    lines.push("Warnings:");
    lines.push(...result.warnings.map((entry) => `- ${formatIssue(entry)}`));
  }
  return `${lines.join("\n")}\n`;
}

export function readExpectedOpportunityIds(filePath) {
  const raw = fs.readFileSync(path.resolve(filePath), "utf8");
  const artifact = parseExpectedTargetsArtifact(raw);
  const rows = Array.isArray(artifact) ? artifact : artifact.targets || artifact.repairs || artifact.opportunityIds;
  if (!Array.isArray(rows)) {
    throw new Error("expected target file must be an array or contain targets, repairs, or opportunityIds");
  }
  return rows.map((row) => (typeof row === "string" ? row : row?.opportunityId)).filter(Boolean);
}

function parseExpectedTargetsArtifact(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    const marker = "Targets:\n";
    const markerIndex = raw.indexOf(marker);
    if (markerIndex < 0) throw new Error("expected target file must be JSON or a prompt containing a Targets section");
    return JSON.parse(raw.slice(markerIndex + marker.length));
  }
}

function validateArtifactEnvelope({ artifact, file, errors, warnings }) {
  if (!artifact || typeof artifact !== "object" || Array.isArray(artifact)) {
    errors.push(issue(file, "$", "artifact must be a JSON object"));
    return;
  }
  if (artifact.schemaVersion !== expectedSchemaVersion) {
    errors.push(issue(file, "$.schemaVersion", `must be ${expectedSchemaVersion}`));
  }
  if (artifact.source !== undefined && typeof artifact.source !== "string") {
    errors.push(issue(file, "$.source", "must be a string when present"));
  }
  if (artifact.researchedAt !== undefined && typeof artifact.researchedAt !== "string") {
    errors.push(issue(file, "$.researchedAt", "must be a string when present"));
  }
  if (!Array.isArray(artifact.repairs)) {
    errors.push(issue(file, "$.repairs", "must be an array"));
  } else if (artifact.repairs.length === 0) {
    warnings.push(issue(file, "$.repairs", "contains no repairs"));
  }
  if (
    artifact.continueFromOpportunityId !== undefined &&
    artifact.continueFromOpportunityId !== null &&
    typeof artifact.continueFromOpportunityId !== "string"
  ) {
    errors.push(issue(file, "$.continueFromOpportunityId", "must be a string or null when present"));
  }
  if (artifact.omittedDuplicateOpportunityIds !== undefined) {
    if (!Array.isArray(artifact.omittedDuplicateOpportunityIds)) {
      errors.push(issue(file, "$.omittedDuplicateOpportunityIds", "must be an array when present"));
    } else {
      validateStringArray({
        values: artifact.omittedDuplicateOpportunityIds,
        file,
        location: "$.omittedDuplicateOpportunityIds",
        errors
      });
    }
  }
}

function validateRepair({ repair, file, location, errors, warnings }) {
  if (!repair || typeof repair !== "object" || Array.isArray(repair)) {
    errors.push(issue(file, location, "repair must be an object"));
    return;
  }

  if (!repair.opportunityId || typeof repair.opportunityId !== "string") {
    errors.push(issue(file, `${location}.opportunityId`, "must be a non-empty string"));
  }
  if (!allowedConfidences.has(repair.confidence)) {
    errors.push(issue(file, `${location}.confidence`, `unsupported confidence: ${String(repair.confidence)}`));
  }
  if (!allowedAvailabilityStatuses.has(repair.availabilityStatus)) {
    errors.push(
      issue(file, `${location}.availabilityStatus`, `unsupported availabilityStatus: ${String(repair.availabilityStatus)}`)
    );
  }

  validateGeography({ geography: repair.geography, file, location: `${location}.geography`, errors });

  for (const field of arrayFields) {
    if (!Array.isArray(repair[field])) {
      errors.push(issue(file, `${location}.${field}`, "must be an array"));
      continue;
    }
    validateStringArray({ values: repair[field], file, location: `${location}.${field}`, errors });
  }

  for (const field of requiredTextFields) {
    if (typeof repair[field] !== "string") {
      errors.push(issue(file, `${location}.${field}`, "must be a string"));
    }
  }

  for (const field of urlFields) {
    validateNullableRawUrl({ value: repair[field], file, location: `${location}.${field}`, errors });
  }
  repair.sourceUrlsChecked?.forEach((value, index) => {
    validateRawUrl({ value, file, location: `${location}.sourceUrlsChecked[${index}]`, errors });
  });

  for (const field of ["evidenceText", "reasoningNotes"]) {
    validateEvidenceText({ value: repair[field], file, location: `${location}.${field}`, errors, warnings });
  }

  if (
    repair.availabilityStatus === "source_inaccessible" &&
    Array.isArray(repair.eligibleRetrofitCategories) &&
    repair.eligibleRetrofitCategories.length > 0
  ) {
    warnings.push(issue(file, `${location}.eligibleRetrofitCategories`, "source_inaccessible repair retains categories"));
  }
}

function validateGeography({ geography, file, location, errors }) {
  if (!geography || typeof geography !== "object" || Array.isArray(geography)) {
    errors.push(issue(file, location, "must be an object"));
    return;
  }
  if (typeof geography.country !== "string") errors.push(issue(file, `${location}.country`, "must be a string"));
  for (const field of ["states", "counties", "cities", "utilityTerritories"]) {
    if (!Array.isArray(geography[field])) {
      errors.push(issue(file, `${location}.${field}`, "must be an array"));
    } else {
      validateStringArray({ values: geography[field], file, location: `${location}.${field}`, errors });
    }
  }
  if (typeof geography.notes !== "string") errors.push(issue(file, `${location}.notes`, "must be a string"));
}

function validateStringArray({ values, file, location, errors }) {
  values.forEach((value, index) => {
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(issue(file, `${location}[${index}]`, "must be a non-empty string"));
    }
  });
}

function validateNullableRawUrl({ value, file, location, errors }) {
  if (value === null) return;
  validateRawUrl({ value, file, location, errors });
}

function validateRawUrl({ value, file, location, errors }) {
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(issue(file, location, "must be a raw URL string"));
    return;
  }
  const raw = value.trim();
  if (hasUrlCorruption(raw)) {
    errors.push(issue(file, location, "contains markdown or copied-fragment URL corruption"));
    return;
  }
  try {
    const url = new URL(raw);
    if (!["http:", "https:"].includes(url.protocol)) {
      errors.push(issue(file, location, "must use http or https"));
    }
  } catch {
    errors.push(issue(file, location, "must be a valid raw URL"));
  }
}

function validateEvidenceText({ value, file, location, errors, warnings }) {
  if (typeof value !== "string") return;
  if (evidencePollutionPattern.test(value)) {
    errors.push(issue(file, location, "appears polluted with copied JSON, markdown URL, or escaped URL fragments"));
  }
  if (/https?:\/\//i.test(value)) {
    errors.push(issue(file, location, "must not contain raw URLs; put URLs in sourceUrlsChecked"));
  }
  const words = value.trim().split(/\s+/).filter(Boolean).length;
  if (words > 150) warnings.push(issue(file, location, `is long (${words} words); keep future evidence concise`));
}

function validateExpectedOpportunityIds({ repairRows, expectedOpportunityIds, errors }) {
  if (!expectedOpportunityIds) return;
  const actualIds = repairRows.map((row) => row.opportunityId);
  if (actualIds.length !== expectedOpportunityIds.length) {
    errors.push(
      issue(
        "(expected targets)",
        "$.repairs",
        `expected ${expectedOpportunityIds.length} repairs but found ${actualIds.length}`
      )
    );
  }
  const length = Math.max(actualIds.length, expectedOpportunityIds.length);
  for (let index = 0; index < length; index += 1) {
    if (actualIds[index] !== expectedOpportunityIds[index]) {
      errors.push(
        issue(
          "(expected targets)",
          `$.repairs[${index}].opportunityId`,
          `expected ${expectedOpportunityIds[index] || "(missing)"} but found ${actualIds[index] || "(missing)"}`
        )
      );
    }
  }
}

function hasUrlCorruption(value) {
  return /\[[^\]]+\]\(/.test(value) || /[\[\]\(\)]/.test(value) || /%22|\\u0022|"/i.test(value);
}

function issue(file, location, message) {
  return { file, location, message };
}

function formatIssue(entry) {
  return `${entry.file} ${entry.location}: ${entry.message}`;
}

function parseCliArgs(argv) {
  const filePaths = [];
  let expectedOpportunityIds = null;
  let allowDuplicateIdsAcrossFiles = true;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--expected-targets") {
      const targetPath = argv[++index];
      if (!targetPath) throw new Error("--expected-targets requires a path");
      expectedOpportunityIds = readExpectedOpportunityIds(targetPath);
    } else if (arg === "--expected-ids") {
      const rawIds = argv[++index];
      if (!rawIds) throw new Error("--expected-ids requires a comma-separated ID list");
      expectedOpportunityIds = rawIds.split(",").map((id) => id.trim()).filter(Boolean);
    } else if (arg === "--no-cross-file-duplicates") {
      allowDuplicateIdsAcrossFiles = false;
    } else if (arg.startsWith("--")) {
      throw new Error(`unknown option: ${arg}`);
    } else {
      filePaths.push(arg);
    }
  }

  if (filePaths.length === 0) throw new Error("provide at least one repair JSON file");
  return { filePaths, expectedOpportunityIds, allowDuplicateIdsAcrossFiles };
}

function main() {
  try {
    const { filePaths, expectedOpportunityIds, allowDuplicateIdsAcrossFiles } = parseCliArgs(process.argv.slice(2));
    const result = validateOpportunityDataRepairFiles(filePaths, {
      expectedOpportunityIds,
      allowDuplicateIdsAcrossFiles
    });
    process.stdout.write(formatOpportunityDataRepairValidationResult(result));
    if (!result.ok) process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`Opportunity data repair validation failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) main();
