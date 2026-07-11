import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultOutputRoot = path.join(
  repoRoot,
  "GPT Pro Outputs",
  "opportunity-award-audit",
);
const defaultSchemaPath = path.join(
  defaultOutputRoot,
  "opportunity-award-audit-schema.json",
);
const allowedApprovalStages = new Set([
  "pre-application",
  "application",
  "under-review",
  "document-review",
  "award-review",
  "disbursal",
  "unknown",
]);
const allowedAwardLikelihood = new Set([
  "near_guaranteed",
  "likely",
  "possible",
  "unlikely",
  "rare",
  "unknown",
]);
const allowedReviewStatus = new Set([
  "audited",
  "source_inaccessible",
  "not_audited",
  "needs_followup",
  "needs_evidence",
]);
const absoluteUrlPattern = /^https?:\/\/\S+$/i;
const outputRecordSchemaName = "opportunity-award-audit-output.v1";

function main() {
  const options = parseArgs(process.argv.slice(2));
  const schemaFile = readJson(options.schemaPath);
  const outputs = discoverOutputs(options.outputRoot);
  const issues = [];

  if (outputs.length === 0) {
    console.log(
      `No output files found in ${path.relative(repoRoot, options.outputRoot)}`,
    );
    process.exit(0);
  }

  for (const outputPath of outputs) {
    validateOutputFile(outputPath, schemaFile, options, issues);
  }

  if (issues.length > 0) {
    console.log(formatIssues(issues));
    process.exit(1);
  }

  console.log(
    `Validated ${outputs.length} output file(s) against ${path.relative(repoRoot, options.schemaPath)}.`,
  );
}

function discoverOutputs(root) {
  if (!fs.existsSync(root)) return [];
  const files = fs
    .readdirSync(root)
    .filter((file) => /_output\.json$/i.test(file));
  files.sort();
  return files.map((file) => path.join(root, file));
}

function validateOutputFile(filePath, schema, options) {
  const fileLabel = path.relative(repoRoot, filePath);
  let payload;
  try {
    payload = readJson(filePath);
  } catch (error) {
    throw new Error(`Failed to read ${fileLabel}: ${error.message}`);
  }

  const inputFile = correspondingInputFile(filePath);
  if (!fs.existsSync(inputFile) && !options.ignoreMissingInput) {
    throw new Error(
      `Missing expected input file for ${fileLabel}: ${path.basename(inputFile)}`,
    );
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error(`${fileLabel}: output must be a JSON object`);
  }

  const missingTopLevel = [];
  if (payload.schemaVersion !== outputRecordSchemaName)
    missingTopLevel.push("schemaVersion");
  if (!isString(payload.batchId)) missingTopLevel.push("batchId");
  if (!Array.isArray(payload.reviews)) missingTopLevel.push("reviews");
  if (!isString(payload.inputFile)) missingTopLevel.push("inputFile");
  if (!Number.isInteger(payload.inputRecordCount))
    missingTopLevel.push("inputRecordCount");
  if (missingTopLevel.length > 0) {
    throw new Error(
      `${fileLabel}: invalid top-level schema, missing/invalid ${missingTopLevel.join(", ")}`,
    );
  }

  if (!Array.isArray(payload.reviews)) {
    throw new Error(`${fileLabel}: reviews must be an array`);
  }

  const seenIds = new Set();
  const inputOpportunityIds = readInputIds(inputFile);
  const hasExtra = [];
  for (const review of payload.reviews) {
    if (!review || typeof review !== "object" || Array.isArray(review)) {
      throw new Error(`${fileLabel}: each review must be an object`);
    }

    const required = [
      "opportunityId",
      "requiresProgramApproval",
      "approvalRequirements",
      "approvalStage",
      "awardLikelihood",
      "awardLikelihoodReason",
      "evidenceUrls",
      "evidenceText",
      "reviewedAt",
      "reviewStatus",
    ];
    for (const field of required) {
      if (!(field in review)) {
        throw new Error(
          `${fileLabel}: review object missing required field ${field}`,
        );
      }
    }

    if (!isString(review.opportunityId) || review.opportunityId.trim() === "") {
      throw new Error(
        `${fileLabel}: review.opportunityId must be a non-empty string`,
      );
    }
    if (!inputOpportunityIds.has(review.opportunityId)) {
      hasExtra.push(review.opportunityId);
    }
    if (seenIds.has(review.opportunityId)) {
      throw new Error(
        `${fileLabel}: duplicate opportunityId in reviews: ${review.opportunityId}`,
      );
    }
    seenIds.add(review.opportunityId);

    if (typeof review.requiresProgramApproval !== "boolean") {
      throw new Error(
        `${fileLabel}: review.requiresProgramApproval must be boolean for ${review.opportunityId}`,
      );
    }
    validateStringArray(
      review.approvalRequirements,
      `${fileLabel}: review.approvalRequirements`,
      review.opportunityId,
    );
    validateStringArray(
      review.evidenceUrls,
      `${fileLabel}: review.evidenceUrls`,
      review.opportunityId,
    );
    for (const evidenceUrl of review.evidenceUrls) {
      if (!absoluteUrlPattern.test(evidenceUrl)) {
        throw new Error(
          `${fileLabel}: evidenceUrl must be an http(s) URL for ${review.opportunityId}`,
        );
      }
    }
    if (!allowedApprovalStages.has(review.approvalStage)) {
      throw new Error(
        `${fileLabel}: invalid approvalStage for ${review.opportunityId}: ${review.approvalStage}`,
      );
    }
    if (!allowedAwardLikelihood.has(review.awardLikelihood)) {
      throw new Error(
        `${fileLabel}: invalid awardLikelihood for ${review.opportunityId}: ${review.awardLikelihood}`,
      );
    }
    if (
      !isString(review.awardLikelihoodReason) ||
      review.awardLikelihoodReason.trim() === ""
    ) {
      throw new Error(
        `${fileLabel}: review.awardLikelihoodReason must be non-empty text for ${review.opportunityId}`,
      );
    }
    if (!isString(review.evidenceText) || review.evidenceText.trim() === "") {
      throw new Error(
        `${fileLabel}: review.evidenceText must be non-empty text for ${review.opportunityId}`,
      );
    }
    if (!isValidIsoDate(review.reviewedAt)) {
      throw new Error(
        `${fileLabel}: review.reviewedAt must be ISO date-time for ${review.opportunityId}`,
      );
    }
    if (!allowedReviewStatus.has(review.reviewStatus)) {
      throw new Error(
        `${fileLabel}: invalid reviewStatus for ${review.opportunityId}: ${review.reviewStatus}`,
      );
    }
  }

  if (
    options.requireAllReviewed &&
    payload.reviews.length !== payload.inputRecordCount
  ) {
    throw new Error(
      `${fileLabel}: expected all input records to be reviewed (${payload.inputRecordCount}); got ${payload.reviews.length}`,
    );
  }
  if (!options.skipExtraCheck && hasExtra.length > 0) {
    throw new Error(
      `${fileLabel}: reviews include IDs not in input (${hasExtra.join(", ")})`,
    );
  }
}

function validateStringArray(values, location, opportunityId) {
  if (!Array.isArray(values))
    throw new Error(`${location} must be an array for ${opportunityId}`);
  for (const value of values) {
    if (!isString(value))
      throw new Error(`${location} must contain strings for ${opportunityId}`);
  }
}

function isString(value) {
  return typeof value === "string";
}

function isValidIsoDate(value) {
  if (!isString(value)) return false;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

function readInputIds(inputPath) {
  if (!fs.existsSync(inputPath)) return new Set();
  const inputArtifact = readJson(inputPath);
  const opportunities = inputArtifact?.opportunities || [];
  const ids = new Set();
  for (const opportunity of opportunities) {
    if (isString(opportunity?.opportunityId))
      ids.add(opportunity.opportunityId);
  }
  return ids;
}

function correspondingInputFile(outputPath) {
  const base = path.basename(outputPath).replace("_output.json", "_input.json");
  return path.join(path.dirname(outputPath), base);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseArgs(args) {
  const options = {
    outputRoot: defaultOutputRoot,
    schemaPath: defaultSchemaPath,
    ignoreMissingInput: false,
    requireAllReviewed: false,
    skipExtraCheck: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--output-root") {
      options.outputRoot = path.resolve(args[++i]);
    } else if (arg === "--schema") {
      options.schemaPath = path.resolve(args[++i]);
    } else if (arg === "--ignore-missing-input") {
      options.ignoreMissingInput = true;
    } else if (arg === "--require-all-reviewed") {
      options.requireAllReviewed = true;
    } else if (arg === "--skip-extra-check") {
      options.skipExtraCheck = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function formatIssues(issues) {
  return issues.map((entry) => `- ${entry}`).join("\n");
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main();
}
