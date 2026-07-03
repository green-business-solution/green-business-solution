import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultDate = "2026-07-03";

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const workDir = path.resolve(
  options.workDir ||
    path.join(repoRoot, "GPT Pro Work", "grant-estimation-repair-2026-07-03", "test_case_project_profiles")
);
const sampleUsersPath = path.resolve(options.sampleUsersPath || path.join(repoRoot, "data", "sample_user_profiles.json"));
const testCasesPath = path.resolve(options.testCasesPath || path.join(repoRoot, "public", "sample_matching_test_cases.json"));
const artifactPath = path.resolve(
  options.artifactPath || path.join(repoRoot, "data", `test_case_grant_profile_repairs_gpt_pro_${date}.json`)
);
const reportPath = path.resolve(
  options.reportPath || path.join(repoRoot, "data", `test_case_grant_profile_intake_report_${date}.md`)
);

if (options.help) {
  printHelp();
  process.exit(0);
}

const now = new Date().toISOString();
const parsedOutputs = readOutputs();
const sampleUsers = readJson(sampleUsersPath);
const testCasesPayload = readJson(testCasesPath);
const validation = validateParsedOutputs(parsedOutputs, sampleUsers, testCasesPayload);

if (validation.brokenOutputs.length > 0 || validation.mismatchedOutputs.length > 0) {
  throw new Error(
    `Test-case grant profile outputs are not safe to import: ${JSON.stringify(
      {
        brokenOutputs: validation.brokenOutputs,
        mismatchedOutputs: validation.mismatchedOutputs
      },
      null,
      2
    )}`
  );
}

const artifact = buildArtifact(parsedOutputs, validation);
const applyResult = applyGrantProfileUpdates({ sampleUsers, testCasesPayload, artifact });

if (!options.dryRun) {
  writeJson(artifactPath, artifact);
  writeJson(sampleUsersPath, applyResult.sampleUsers);
  writeJson(testCasesPath, applyResult.testCasesPayload);
  fs.writeFileSync(reportPath, buildReport({ artifact, validation, applyResult }), "utf8");
}

console.log("Intook test-case grant profile GPT Pro outputs.");
console.log(`Output files parsed: ${parsedOutputs.length}`);
console.log(`Profiles imported: ${artifact.profileCount}`);
console.log(`Sample profiles patched: ${applyResult.patchedSampleUserCount}`);
console.log(`Public test cases patched: ${applyResult.patchedTestCaseCount}`);
console.log(`Warnings: ${artifact.validationWarnings.length + applyResult.warnings.length}`);
console.log(`Artifact: ${path.relative(repoRoot, artifactPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected positional argument: ${arg}`);
    const key = arg.slice(2);
    if (key === "help" || key === "dryRun") {
      parsed[key] = true;
      continue;
    }
    const value = args[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for --${key}`);
    parsed[key] = value;
    index += 1;
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/intake-test-case-grant-profile-outputs.mjs [--date ${defaultDate}] [--dryRun]`);
}

function readOutputs() {
  const files = fs
    .readdirSync(workDir)
    .filter((fileName) => /^output_\d{3}_.*\.md$/i.test(fileName))
    .sort();
  return files.map((fileName) => parseOutputFile(path.join(workDir, fileName), fileName));
}

function parseOutputFile(filePath, fileName) {
  const raw = fs.readFileSync(filePath, "utf8");
  const outputIndex = outputIndexFromFileName(fileName);
  const parsed = {
    fileName,
    outputIndex,
    expectedSampleUserId: expectedSampleUserIdForOutput(outputIndex),
    object: null,
    missing: false,
    broken: false,
    error: null,
    trailingText: "",
    trailingTextLength: 0
  };

  try {
    const extracted = extractFirstJsonObject(raw);
    parsed.object = JSON.parse(extracted.json);
    parsed.trailingText = extracted.trailing;
    parsed.trailingTextLength = extracted.trailing.length;
  } catch (error) {
    const hasJsonStart = raw.includes("{");
    parsed.missing = !hasJsonStart;
    parsed.broken = hasJsonStart;
    parsed.error = error.message;
  }

  return parsed;
}

function expectedSampleUserIdForOutput(outputIndex) {
  if (!outputIndex) return null;
  const promptFile = fs
    .readdirSync(workDir)
    .find((fileName) => fileName.startsWith(`prompt_${String(outputIndex).padStart(3, "0")}_`));
  if (!promptFile) return null;
  const raw = fs.readFileSync(path.join(workDir, promptFile), "utf8");
  const match = raw.match(/"sampleUserId"\s*:\s*"([^"]+)"/);
  return match?.[1] || null;
}

function extractFirstJsonObject(raw) {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  const start = cleaned.indexOf("{");
  if (start < 0) throw new Error("No JSON object found.");

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < cleaned.length; index += 1) {
    const char = cleaned[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === "\"") inString = false;
      continue;
    }

    if (char === "\"") inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return {
          json: cleaned.slice(start, index + 1),
          trailing: cleaned.slice(index + 1).trim()
        };
      }
    }
  }

  throw new Error("Unclosed JSON object.");
}

function validateParsedOutputs(outputs, sampleUsers, testCasesPayload) {
  const sampleIds = new Set(sampleUsers.map((sample) => sample.sampleUserId).filter(Boolean));
  const testCases = Array.isArray(testCasesPayload) ? testCasesPayload : testCasesPayload.testCases || [];
  const testCaseIds = new Set(testCases.map((testCase) => testCase.sampleUserId).filter(Boolean));
  const missingOutputs = [];
  const brokenOutputs = [];
  const mismatchedOutputs = [];
  const duplicateSampleIds = [];
  const schemaWarnings = [];
  const trailingTextOutputs = [];
  const profileWarnings = [];
  const seenSampleIds = new Map();

  for (const output of outputs) {
    if (output.missing) {
      missingOutputs.push({
        fileName: output.fileName,
        outputIndex: output.outputIndex,
        expectedSampleUserId: output.expectedSampleUserId,
        reason: output.error || "No JSON object found."
      });
      continue;
    }

    if (output.broken) {
      brokenOutputs.push({
        fileName: output.fileName,
        outputIndex: output.outputIndex,
        expectedSampleUserId: output.expectedSampleUserId,
        error: output.error
      });
      continue;
    }

    if (output.trailingTextLength > 0) {
      trailingTextOutputs.push({
        fileName: output.fileName,
        trailingTextLength: output.trailingTextLength
      });
    }

    if (output.object?.schemaVersion !== "retrofi_test_case_grant_profile_repair.v1") {
      schemaWarnings.push({
        fileName: output.fileName,
        schemaVersion: output.object?.schemaVersion || null
      });
      continue;
    }

    const sampleUserId = output.object.sampleUserId;
    if (output.expectedSampleUserId && sampleUserId !== output.expectedSampleUserId) {
      mismatchedOutputs.push({
        fileName: output.fileName,
        outputIndex: output.outputIndex,
        expectedSampleUserId: output.expectedSampleUserId,
        actualSampleUserId: sampleUserId
      });
    }
    if (!sampleIds.has(sampleUserId)) profileWarnings.push(`${output.fileName} references missing sample user ${sampleUserId}.`);
    if (!testCaseIds.has(sampleUserId)) profileWarnings.push(`${output.fileName} references missing public test case ${sampleUserId}.`);

    const previous = seenSampleIds.get(sampleUserId);
    if (previous) {
      duplicateSampleIds.push({
        sampleUserId,
        files: [previous, output.fileName]
      });
    } else {
      seenSampleIds.set(sampleUserId, output.fileName);
    }

    validateRepairShape(output.object, output.fileName, profileWarnings);
  }

  return {
    missingOutputs,
    brokenOutputs,
    mismatchedOutputs,
    duplicateSampleIds,
    schemaWarnings,
    trailingTextOutputs,
    profileWarnings
  };
}

function validateRepairShape(repair, fileName, warnings) {
  for (const key of [
    "organizationFactsToAddOrUpdate",
    "retrofitProjectInputs",
    "grantOpportunitySpecificInputs",
    "missingInputsThatShouldRemainMissing",
    "doNotForceQualificationReasons"
  ]) {
    if (!Array.isArray(repair[key])) warnings.push(`${fileName}: ${key} is not an array.`);
  }

  for (const fact of repair.organizationFactsToAddOrUpdate || []) {
    validateFact(fact, fileName, "organizationFactsToAddOrUpdate", warnings);
  }
  for (const project of repair.retrofitProjectInputs || []) {
    if (!project?.retrofitTypeId) warnings.push(`${fileName}: retrofitProjectInputs row is missing retrofitTypeId.`);
    for (const fact of project?.inputFacts || []) validateFact(fact, fileName, `retrofitProjectInputs.${project?.retrofitTypeId}`, warnings);
  }
  for (const opportunity of repair.grantOpportunitySpecificInputs || []) {
    if (!opportunity?.opportunityId) warnings.push(`${fileName}: grantOpportunitySpecificInputs row is missing opportunityId.`);
    for (const fact of opportunity?.inputFacts || []) validateFact(fact, fileName, `grantOpportunitySpecificInputs.${opportunity?.opportunityId}`, warnings);
  }
}

function validateFact(fact, fileName, section, warnings) {
  if (!fact?.inputKey) warnings.push(`${fileName}: ${section} contains a fact without inputKey.`);
  if (fact && !Object.prototype.hasOwnProperty.call(fact, "value")) {
    warnings.push(`${fileName}: ${section}.${fact.inputKey || "unknown"} is missing value.`);
  }
}

function buildArtifact(parsedOutputs, validation) {
  const profileUpdates = parsedOutputs
    .filter((output) => output.object?.schemaVersion === "retrofi_test_case_grant_profile_repair.v1")
    .map((output) => normalizeProfileUpdate(output.object, output.fileName));

  return {
    schemaVersion: "retrofi_test_case_grant_profile_repairs_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: parsedOutputs.map((output) => output.fileName),
    profileCount: profileUpdates.length,
    counts: {
      organizationFactCount: sum(profileUpdates, (profile) => profile.grantProfileFacts?.length || 0),
      retrofitProjectInputCount: sum(profileUpdates, (profile) => profile.grantRetrofitProjectInputs?.length || 0),
      retrofitProjectFactCount: sum(profileUpdates, (profile) =>
        sum(profile.grantRetrofitProjectInputs || [], (project) => project.inputFacts?.length || 0)
      ),
      opportunitySpecificInputCount: sum(profileUpdates, (profile) => profile.grantOpportunitySpecificInputs?.length || 0),
      opportunitySpecificFactCount: sum(profileUpdates, (profile) =>
        sum(profile.grantOpportunitySpecificInputs || [], (opportunity) => opportunity.inputFacts?.length || 0)
      ),
      missingOrReviewInputCount: sum(profileUpdates, (profile) => profile.grantMissingOrReviewInputs?.length || 0),
      doNotForceQualificationReasonCount: sum(profileUpdates, (profile) => profile.grantDoNotForceQualificationReasons?.length || 0),
      profileConfidenceCounts: countBy(profileUpdates, (profile) => profile.grantProfileConfidence || "unknown")
    },
    profileUpdates,
    validationWarnings: [
      ...validation.schemaWarnings.map((warning) => `${warning.fileName}: unexpected schemaVersion ${warning.schemaVersion}.`),
      ...validation.trailingTextOutputs.map((warning) => `${warning.fileName}: ignored ${warning.trailingTextLength} trailing characters.`),
      ...validation.duplicateSampleIds.map((warning) => `${warning.sampleUserId}: duplicate updates in ${warning.files.join(", ")}.`),
      ...validation.profileWarnings
    ]
  };
}

function normalizeProfileUpdate(repair, sourceFile) {
  return {
    sampleUserId: repair.sampleUserId,
    grantProfileConfidence: repair.profileConfidence || "medium",
    grantProfileNotes: repair.profileNotes || "",
    grantProfileResearchedAt: repair.researchedAt || null,
    sourceFile,
    sourceWorkDir: path.relative(repoRoot, workDir),
    grantProfileFacts: (repair.organizationFactsToAddOrUpdate || []).map((fact) => normalizeFact(fact, { sourceFile })),
    grantRetrofitProjectInputs: (repair.retrofitProjectInputs || []).map((project) => ({
      retrofitTypeId: project.retrofitTypeId || "",
      projectScopeSummary: project.projectScopeSummary || "",
      inputFacts: (project.inputFacts || []).map((fact) =>
        normalizeFact(fact, {
          sourceFile,
          retrofitTypeId: project.retrofitTypeId || null
        })
      ),
      shouldQualifyForTypicalGrants: project.shouldQualifyForTypicalGrants ?? null,
      qualificationCaveats: arrayOf(project.qualificationCaveats),
      source: "gpt_pro_grant_profile_repair",
      sourceFile
    })),
    grantOpportunitySpecificInputs: (repair.grantOpportunitySpecificInputs || []).map((opportunity) => ({
      opportunityId: opportunity.opportunityId || "",
      expectedHandling: opportunity.expectedHandling || "needs_project_scope",
      inputFacts: (opportunity.inputFacts || []).map((fact) =>
        normalizeFact(fact, {
          sourceFile,
          opportunityId: opportunity.opportunityId || null,
          estimateStatusIfUsed: opportunity.expectedHandling || null
        })
      ),
      reasoning: opportunity.reasoning || "",
      source: "gpt_pro_grant_profile_repair",
      sourceFile
    })),
    grantMissingOrReviewInputs: arrayOf(repair.missingInputsThatShouldRemainMissing).map((input) => ({
      ...input,
      source: "gpt_pro_grant_profile_repair",
      sourceFile
    })),
    grantDoNotForceQualificationReasons: arrayOf(repair.doNotForceQualificationReasons),
    syntheticGrantProfileDataNotice:
      "Synthetic estimated grant/project profile for test fixtures; not verified customer project scope."
  };
}

function normalizeFact(fact, { sourceFile, retrofitTypeId = null, opportunityId = null, estimateStatusIfUsed = null } = {}) {
  return {
    inputKey: fact.inputKey || fact.input_key || "",
    value: normalizeFactValue(fact.value, fact.valueType || fact.value_type),
    valueType: fact.valueType || fact.value_type || valueTypeFor(fact.value),
    sourceStrategy: fact.sourceStrategy || fact.source_type || "synthetic_realistic_default",
    confidence: fact.confidence || "medium",
    confidenceImpactUntilConfirmed: confidenceImpactUntilConfirmed(fact.confidence || "medium"),
    userOverrideAllowed: fact.userOverrideAllowed !== false,
    reasoning: fact.reasoning || "",
    source: "gpt_pro_grant_profile_repair",
    sourceFile,
    retrofitTypeId,
    opportunityId,
    estimateStatusIfUsed,
    defaultIsSynthetic: fact.sourceStrategy !== "existing_test_case"
  };
}

function normalizeFactValue(value, valueType) {
  if (valueType === "integer" && typeof value === "number") return Math.trunc(value);
  return value;
}

function valueTypeFor(value) {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
  if (Array.isArray(value)) return "array";
  if (value && typeof value === "object") return "object";
  return "text";
}

function confidenceImpactUntilConfirmed(confidence) {
  if (confidence === "high") return "low";
  if (confidence === "low") return "high";
  return "medium";
}

function applyGrantProfileUpdates({ sampleUsers, testCasesPayload, artifact }) {
  const updatesBySampleId = new Map(artifact.profileUpdates.map((update) => [update.sampleUserId, update]));
  const testCases = Array.isArray(testCasesPayload) ? testCasesPayload : testCasesPayload.testCases || [];
  const warnings = [];

  const patchedSampleUsers = sampleUsers.map((sample) => {
    const update = updatesBySampleId.get(sample.sampleUserId);
    if (!update) return sample;
    return {
      ...sample,
      ...grantProfilePatch(update)
    };
  });

  const patchedTestCases = testCases.map((testCase) => {
    const update = updatesBySampleId.get(testCase.sampleUserId);
    if (!update) return testCase;
    const patch = grantProfilePatch(update);
    return {
      ...testCase,
      ...patch,
      sourceForm: {
        ...(testCase.sourceForm || {}),
        ...patch
      }
    };
  });

  for (const sampleUserId of updatesBySampleId.keys()) {
    if (!patchedSampleUsers.some((sample) => sample.sampleUserId === sampleUserId)) {
      warnings.push(`Grant profile update has no sample user: ${sampleUserId}.`);
    }
    if (!patchedTestCases.some((testCase) => testCase.sampleUserId === sampleUserId)) {
      warnings.push(`Grant profile update has no public test case: ${sampleUserId}.`);
    }
  }

  const patchedPayload = Array.isArray(testCasesPayload)
    ? patchedTestCases
    : {
        ...testCasesPayload,
        sampleGrantProfileDataImportedAt: now,
        sampleGrantProfileCount: updatesBySampleId.size,
        sampleGrantProfileSchemaVersion: artifact.schemaVersion,
        sampleGrantProfileSourcePath: path.relative(repoRoot, artifactPath),
        testCases: patchedTestCases
      };

  return {
    sampleUsers: patchedSampleUsers,
    testCasesPayload: patchedPayload,
    patchedSampleUserCount: patchedSampleUsers.filter((sample) => updatesBySampleId.has(sample.sampleUserId)).length,
    patchedTestCaseCount: patchedTestCases.filter((testCase) => updatesBySampleId.has(testCase.sampleUserId)).length,
    warnings
  };
}

function grantProfilePatch(update) {
  return {
    grantProfileFacts: update.grantProfileFacts || [],
    grantRetrofitProjectInputs: update.grantRetrofitProjectInputs || [],
    grantOpportunitySpecificInputs: update.grantOpportunitySpecificInputs || [],
    grantMissingOrReviewInputs: update.grantMissingOrReviewInputs || [],
    grantDoNotForceQualificationReasons: update.grantDoNotForceQualificationReasons || [],
    syntheticGrantProfileDataNotice: update.syntheticGrantProfileDataNotice,
    grantProfileConfidence: update.grantProfileConfidence,
    grantProfileNotes: update.grantProfileNotes,
    grantProfileDataGeneratedAt: update.grantProfileResearchedAt,
    grantProfileDataImportedAt: now,
    grantProfileDataSchemaVersion: "retrofi_test_case_grant_profile_repair.v1",
    grantProfileDataSourceArtifact: path.relative(repoRoot, artifactPath)
  };
}

function buildReport({ artifact, validation, applyResult }) {
  const allWarnings = [...artifact.validationWarnings, ...applyResult.warnings];
  return [
    "# Test Case Grant Profile Intake Report",
    "",
    `Generated at: ${now}`,
    "",
    "## Outputs",
    "",
    `- GPT Pro output files parsed: ${artifact.sourceFiles.length}`,
    `- Synthetic grant profiles imported: ${artifact.profileCount}`,
    `- Sample profiles patched: ${applyResult.patchedSampleUserCount}`,
    `- Public test cases patched: ${applyResult.patchedTestCaseCount}`,
    `- Broken outputs: ${validation.brokenOutputs.length}`,
    `- Mismatched outputs: ${validation.mismatchedOutputs.length}`,
    "",
    "## Counts",
    "",
    `- Organization facts: ${artifact.counts.organizationFactCount}`,
    `- Retrofit project scopes: ${artifact.counts.retrofitProjectInputCount}`,
    `- Retrofit project facts: ${artifact.counts.retrofitProjectFactCount}`,
    `- Opportunity-specific input rows: ${artifact.counts.opportunitySpecificInputCount}`,
    `- Opportunity-specific facts: ${artifact.counts.opportunitySpecificFactCount}`,
    `- Inputs intentionally left missing/reviewable: ${artifact.counts.missingOrReviewInputCount}`,
    `- Do-not-force qualification reasons: ${artifact.counts.doNotForceQualificationReasonCount}`,
    "",
    "## Artifacts",
    "",
    `- Grant profile artifact: \`${path.relative(repoRoot, artifactPath)}\``,
    `- Sample user profiles: \`${path.relative(repoRoot, sampleUsersPath)}\``,
    `- Public sample matching test cases: \`${path.relative(repoRoot, testCasesPath)}\``,
    "",
    "## Warnings",
    "",
    ...(allWarnings.length ? allWarnings.map((warning) => `- ${warning}`) : ["- None."]),
    ""
  ].join("\n");
}

function outputIndexFromFileName(fileName) {
  const match = fileName.match(/^output_(\d{3})/i);
  return match ? Number(match[1]) : null;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

function sum(rows, iteratee) {
  return rows.reduce((total, row) => total + Number(iteratee(row) || 0), 0);
}

function countBy(rows, iteratee) {
  const counts = {};
  for (const row of rows || []) {
    const key = iteratee(row);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}
