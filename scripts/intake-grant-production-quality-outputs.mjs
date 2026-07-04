import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { validateIncentiveCalculationPackageV2 } from "../server/savings/incentiveCalculationsV2.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultDate = "2026-07-04";
const defaultWorkDir = path.join(repoRoot, "GPT Pro Work", "grant-production-quality-2026-07-04");
const defaultPackagesPath = path.join(repoRoot, "data", "opportunity_incentive_calculation_packages_v2.json");
const defaultSampleUsersPath = path.join(repoRoot, "data", "sample_user_profiles.json");
const defaultTestCasesPath = path.join(repoRoot, "public", "sample_matching_test_cases.json");

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const now = new Date().toISOString();
const workDir = path.resolve(options.workDir || defaultWorkDir);
const manifestPath = path.resolve(options.manifestPath || path.join(workDir, "target_manifest.json"));
const packagesPath = path.resolve(options.packagesPath || defaultPackagesPath);
const sampleUsersPath = path.resolve(options.sampleUsersPath || defaultSampleUsersPath);
const testCasesPath = path.resolve(options.testCasesPath || defaultTestCasesPath);
const packageArtifactPath = path.resolve(
  options.packageArtifactPath || path.join(repoRoot, "data", `grant_package_production_repairs_gpt_pro_${date}.json`)
);
const probabilityArtifactPath = path.resolve(
  options.probabilityArtifactPath || path.join(repoRoot, "data", `grant_probability_deep_research_gpt_pro_${date}.json`)
);
const profileArtifactPath = path.resolve(
  options.profileArtifactPath || path.join(repoRoot, "data", `test_case_grant_profile_realism_repairs_gpt_pro_${date}.json`)
);
const reportPath = path.resolve(
  options.reportPath || path.join(repoRoot, "data", `grant_production_quality_intake_report_${date}.md`)
);

if (options.help) {
  printHelp();
  process.exit(0);
}

const manifest = readJson(manifestPath);
const packageOutputs = readManifestFolder("grantPackageProductionRepair", "retrofi_grant_package_production_repair.v1");
const profileOutputs = readManifestFolder("testProfileRealism", "retrofi_grant_test_profile_realism_repair.v1");
const probabilityOutputs = readManifestFolder("historicalProbabilityResearch", "retrofi_grant_probability_deep_research.v1");
const validation = validateOutputs({ packageOutputs, profileOutputs, probabilityOutputs });

if (validation.fatalErrors.length > 0) {
  throw new Error(`Grant production quality outputs are not safe to import:\n${validation.fatalErrors.join("\n")}`);
}

const packagesArtifact = readJson(packagesPath);
const sampleUsers = readJson(sampleUsersPath);
const testCasesPayload = readJson(testCasesPath);

const packageArtifact = buildPackageArtifact(packageOutputs, validation);
const probabilityArtifact = buildProbabilityArtifact(probabilityOutputs, validation);
const profileArtifact = buildProfileArtifact(profileOutputs, validation);
const packageApplyResult = applyPackageRepairs(packagesArtifact, packageArtifact.repairs);
const probabilityApplyResult = applyProbabilityRepairs(packagesArtifact, probabilityArtifact.repairs);
const packageValidation = validatePackages(packagesArtifact.packages || []);

if (packageValidation.invalidCount > 0) {
  throw new Error(`Grant production quality import generated invalid v2 packages:\n${JSON.stringify(packageValidation.invalidSamples, null, 2)}`);
}

const profileApplyResult = applyProfileRepairs({ sampleUsers, testCasesPayload, profileArtifact });

if (!options.dryRun) {
  writeJson(packageArtifactPath, packageArtifact);
  writeJson(probabilityArtifactPath, probabilityArtifact);
  writeJson(profileArtifactPath, profileArtifact);
  writeJson(packagesPath, packagesArtifact);
  writeJson(sampleUsersPath, profileApplyResult.sampleUsers);
  writeJson(testCasesPath, profileApplyResult.testCasesPayload);
  fs.writeFileSync(
    reportPath,
    buildReport({
      validation,
      packageArtifact,
      probabilityArtifact,
      profileArtifact,
      packageApplyResult,
      probabilityApplyResult,
      profileApplyResult,
      packageValidation
    }),
    "utf8"
  );
}

console.log("Intook grant production quality GPT Pro outputs.");
console.log(`Package outputs parsed: ${packageOutputs.length}`);
console.log(`Package repairs imported: ${packageArtifact.repairs.length}`);
console.log(`Package repairs applied: ${packageApplyResult.appliedCount}`);
console.log(`Probability outputs parsed: ${probabilityOutputs.length}`);
console.log(`Probability repairs imported: ${probabilityArtifact.repairs.length}`);
console.log(`Probability repairs applied: ${probabilityApplyResult.appliedCount}`);
console.log(`Profile outputs parsed: ${profileOutputs.length}`);
console.log(`Profiles patched: ${profileApplyResult.patchedSampleUserCount}`);
console.log(`Warnings: ${validation.warnings.length + packageApplyResult.warnings.length + probabilityApplyResult.warnings.length + profileApplyResult.warnings.length}`);
console.log(`Package validation invalid count: ${packageValidation.invalidCount}`);
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
  console.log(`Usage: node scripts/intake-grant-production-quality-outputs.mjs [--date ${defaultDate}] [--dryRun]`);
}

function readManifestFolder(folderKey, expectedSchemaVersion) {
  const folder = manifest.folders?.[folderKey];
  if (!folder?.path) throw new Error(`Manifest is missing folders.${folderKey}.path`);
  const folderPath = path.resolve(repoRoot, folder.path);
  const expectedFiles = folder.files || [];
  return expectedFiles.map((expected) => {
    const filePath = path.join(folderPath, expected.outputName);
    const parsed = {
      folderKey,
      folderPath,
      expectedSchemaVersion,
      expected,
      fileName: expected.outputName,
      filePath,
      object: null,
      missing: false,
      broken: false,
      error: null,
      trailingText: "",
      trailingTextLength: 0
    };

    if (!fs.existsSync(filePath)) {
      parsed.missing = true;
      parsed.error = "Output file is missing.";
      return parsed;
    }

    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const extracted = extractFirstJsonObject(raw);
      parsed.object = JSON.parse(extracted.json);
      parsed.trailingText = extracted.trailing;
      parsed.trailingTextLength = extracted.trailing.length;
    } catch (error) {
      parsed.broken = true;
      parsed.error = error.message;
    }

    return parsed;
  });
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

function validateOutputs({ packageOutputs, profileOutputs, probabilityOutputs }) {
  const fatalErrors = [];
  const warnings = [];
  validateOutputSet(packageOutputs, fatalErrors, warnings);
  validateOutputSet(profileOutputs, fatalErrors, warnings);
  validateOutputSet(probabilityOutputs, fatalErrors, warnings);
  return { fatalErrors, warnings };
}

function validateOutputSet(outputs, fatalErrors, warnings) {
  const seenPromptIds = new Map();
  for (const output of outputs) {
    if (output.missing) {
      fatalErrors.push(`${output.folderKey}/${output.fileName}: ${output.error}`);
      continue;
    }
    if (output.broken) {
      fatalErrors.push(`${output.folderKey}/${output.fileName}: ${output.error}`);
      continue;
    }
    if (output.object?.schemaVersion !== output.expectedSchemaVersion) {
      fatalErrors.push(
        `${output.folderKey}/${output.fileName}: expected schema ${output.expectedSchemaVersion}, got ${output.object?.schemaVersion || "missing"}.`
      );
      continue;
    }
    if (output.trailingTextLength > 0) {
      warnings.push(`${output.folderKey}/${output.fileName}: ignored ${output.trailingTextLength} trailing characters after JSON.`);
    }

    const promptId = output.object.promptId;
    if (promptId && seenPromptIds.has(promptId)) {
      warnings.push(`${output.folderKey}/${output.fileName}: duplicate promptId ${promptId}; first seen in ${seenPromptIds.get(promptId)}.`);
    }
    if (promptId) seenPromptIds.set(promptId, output.fileName);

    if (output.expected?.promptId && promptId !== output.expected.promptId) {
      fatalErrors.push(`${output.folderKey}/${output.fileName}: expected promptId ${output.expected.promptId}, got ${promptId || "missing"}.`);
    }

    if (output.folderKey === "grantPackageProductionRepair") validatePackageOutput(output, fatalErrors, warnings);
    if (output.folderKey === "testProfileRealism") validateProfileOutput(output, fatalErrors, warnings);
    if (output.folderKey === "historicalProbabilityResearch") validateProbabilityOutput(output, fatalErrors, warnings);
  }
}

function validatePackageOutput(output, fatalErrors, warnings) {
  const repairs = output.object?.repairs || [];
  if (!Array.isArray(repairs) || repairs.length === 0) {
    fatalErrors.push(`${output.folderKey}/${output.fileName}: repairs must be a non-empty array.`);
    return;
  }
  for (const repair of repairs) {
    const baseId = baseOpportunityId(repair.opportunityId);
    if (!baseId) fatalErrors.push(`${output.folderKey}/${output.fileName}: repair is missing opportunityId.`);
    if (output.expected?.opportunityId && baseId !== output.expected.opportunityId) {
      warnings.push(`${output.folderKey}/${output.fileName}: repair ${repair.opportunityId} maps to ${baseId}, expected ${output.expected.opportunityId}.`);
    }
    if (!repair.estimateRecommendation) warnings.push(`${output.folderKey}/${output.fileName}: repair ${repair.opportunityId} is missing estimateRecommendation.`);
    if (!repair.conditionalAwardModel) warnings.push(`${output.folderKey}/${output.fileName}: repair ${repair.opportunityId} is missing conditionalAwardModel.`);
  }
}

function validateProfileOutput(output, fatalErrors, warnings) {
  const sampleUserId = output.object?.profileRepair?.sampleUserId || output.object?.sampleUserId;
  if (!sampleUserId) fatalErrors.push(`${output.folderKey}/${output.fileName}: missing sampleUserId.`);
  if (output.expected?.sampleUserId && sampleUserId !== output.expected.sampleUserId) {
    fatalErrors.push(`${output.folderKey}/${output.fileName}: expected sampleUserId ${output.expected.sampleUserId}, got ${sampleUserId}.`);
  }
  const profileRepair = output.object?.profileRepair;
  if (!profileRepair || typeof profileRepair !== "object") {
    fatalErrors.push(`${output.folderKey}/${output.fileName}: missing profileRepair object.`);
    return;
  }
  for (const key of ["globalGrantProfileFacts", "retrofitProjectFacts", "opportunitySpecificFacts", "missingOrReviewInputs", "doNotForceQualificationReasons"]) {
    if (!Array.isArray(profileRepair[key])) warnings.push(`${output.folderKey}/${output.fileName}: profileRepair.${key} is not an array.`);
  }
}

function validateProbabilityOutput(output, fatalErrors, warnings) {
  const repairs = output.object?.probabilityRepairs || [];
  if (!Array.isArray(repairs) || repairs.length === 0) {
    fatalErrors.push(`${output.folderKey}/${output.fileName}: probabilityRepairs must be a non-empty array.`);
    return;
  }
  for (const repair of repairs) {
    const baseId = baseOpportunityId(repair.opportunityId);
    if (!baseId) fatalErrors.push(`${output.folderKey}/${output.fileName}: repair is missing opportunityId.`);
    if (output.expected?.opportunityId && baseId !== output.expected.opportunityId) {
      warnings.push(`${output.folderKey}/${output.fileName}: probability repair ${repair.opportunityId} maps to ${baseId}, expected ${output.expected.opportunityId}.`);
    }
  }
}

function buildPackageArtifact(outputs, validation) {
  const repairs = outputs.flatMap((output) =>
    (output.object.repairs || []).map((repair) => normalizePackageRepair(repair, output))
  );
  return {
    schemaVersion: "retrofi_grant_package_production_repairs_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: outputs.map((output) => output.fileName),
    repairCount: repairs.length,
    counts: {
      sourceConfidenceCounts: countBy(repairs, (repair) => repair.sourceConfidence || "unknown"),
      availabilityStatusCounts: countBy(repairs, (repair) => repair.availabilityStatus || "unknown"),
      cashValueClassificationCounts: countBy(repairs, (repair) => repair.cashValueClassification || "unknown"),
      valueModelKindCounts: countBy(repairs, (repair) => repair.valueModelKind || "unknown"),
      estimateStatusCounts: countBy(repairs, (repair) => repair.estimateRecommendation?.estimateStatus || "unknown"),
      includedByDefaultCount: repairs.filter((repair) => repair.estimateRecommendation?.includeInUserFacingTotalDefault === true).length,
      branchRepairCount: repairs.filter((repair) => repair.branchId).length
    },
    repairs,
    validationWarnings: validation.warnings.filter((warning) => warning.includes("grantPackageProductionRepair"))
  };
}

function normalizePackageRepair(repair, output) {
  const baseId = baseOpportunityId(repair.opportunityId);
  return {
    ...repair,
    baseOpportunityId: baseId,
    branchId: branchId(repair.opportunityId),
    sourceFile: output.fileName,
    sourceWorkDir: path.relative(repoRoot, output.folderPath),
    promptId: output.object.promptId,
    researchedAt: output.object.researchedAt || null,
    expectedOpportunityId: output.expected?.opportunityId || null,
    normalizedSourceUrlsChecked: normalizeUrls(repair.sourceUrlsChecked || [])
  };
}

function buildProbabilityArtifact(outputs, validation) {
  const repairs = outputs.flatMap((output) =>
    (output.object.probabilityRepairs || []).map((repair) => normalizeProbabilityRepair(repair, output))
  );
  return {
    schemaVersion: "retrofi_grant_probability_deep_research_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: outputs.map((output) => output.fileName),
    repairCount: repairs.length,
    counts: {
      availabilityStatusCounts: countBy(repairs, (repair) => repair.availabilityStatus || "unknown"),
      competitionTypeCounts: countBy(repairs, (repair) => repair.competitionType || "unknown"),
      probabilityEvidenceTypeCounts: countBy(repairs, (repair) => repair.probabilityRecommendation?.probabilityEvidenceType || "unknown"),
      probabilityDiscountCount: repairs.filter((repair) => Number.isFinite(repair.probabilityRecommendation?.probabilityDiscount)).length,
      includedByDefaultCount: repairs.filter((repair) => repair.probabilityRecommendation?.includeInUserFacingTotalDefault === true).length,
      awardHistoryRows: sum(repairs, (repair) => repair.awardHistory?.length || 0)
    },
    repairs,
    validationWarnings: validation.warnings.filter((warning) => warning.includes("historicalProbabilityResearch"))
  };
}

function normalizeProbabilityRepair(repair, output) {
  return {
    ...repair,
    baseOpportunityId: baseOpportunityId(repair.opportunityId),
    branchId: branchId(repair.opportunityId),
    sourceFile: output.fileName,
    sourceWorkDir: path.relative(repoRoot, output.folderPath),
    promptId: output.object.promptId,
    researchedAt: output.object.researchedAt || null,
    expectedOpportunityId: output.expected?.opportunityId || null,
    normalizedSourceUrlsChecked: normalizeUrls(repair.sourceUrlsChecked || [])
  };
}

function buildProfileArtifact(outputs, validation) {
  const profileUpdates = outputs.map((output) => normalizeProfileUpdate(output.object, output));
  return {
    schemaVersion: "retrofi_grant_test_profile_realism_repairs_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: outputs.map((output) => output.fileName),
    profileCount: profileUpdates.length,
    counts: {
      profileConfidenceCounts: countBy(profileUpdates, (profile) => profile.grantProfileConfidence || "unknown"),
      globalFactCount: sum(profileUpdates, (profile) => profile.grantProfileFacts?.length || 0),
      retrofitProjectCount: sum(profileUpdates, (profile) => profile.grantRetrofitProjectInputs?.length || 0),
      retrofitProjectFactCount: sum(profileUpdates, (profile) => sum(profile.grantRetrofitProjectInputs || [], (row) => row.inputFacts?.length || 0)),
      opportunitySpecificCount: sum(profileUpdates, (profile) => profile.grantOpportunitySpecificInputs?.length || 0),
      opportunitySpecificFactCount: sum(profileUpdates, (profile) => sum(profile.grantOpportunitySpecificInputs || [], (row) => row.inputFacts?.length || 0)),
      missingOrReviewInputCount: sum(profileUpdates, (profile) => profile.grantMissingOrReviewInputs?.length || 0),
      doNotForceQualificationReasonCount: sum(profileUpdates, (profile) => profile.grantDoNotForceQualificationReasons?.length || 0)
    },
    profileUpdates,
    validationWarnings: validation.warnings.filter((warning) => warning.includes("testProfileRealism"))
  };
}

function normalizeProfileUpdate(object, output) {
  const repair = object.profileRepair || {};
  const sampleUserId = repair.sampleUserId || object.sampleUserId;
  return {
    sampleUserId,
    grantProfileConfidence: repair.profileConfidence || "medium",
    grantProfileNotes: repair.profileNotes || "",
    grantProfileResearchedAt: object.researchedAt || null,
    sourceFile: output.fileName,
    sourceWorkDir: path.relative(repoRoot, output.folderPath),
    sourceUrlsChecked: normalizeUrls(object.sourceUrlsChecked || []),
    reasoningNotes: object.reasoningNotes || "",
    grantProfileFacts: arrayOf(repair.globalGrantProfileFacts).map((fact) => normalizeFact(fact, { sourceFile: output.fileName })),
    grantRetrofitProjectInputs: arrayOf(repair.retrofitProjectFacts).map((project) => ({
      retrofitTypeId: project.retrofitTypeId || "",
      projectScopeSummary: project.expectedRealWorldScope || project.projectScopeSummary || "",
      expectedHandling: project.expectedHandling || null,
      inputFacts: arrayOf(project.inputFacts).map((fact) =>
        normalizeFact(fact, {
          sourceFile: output.fileName,
          retrofitTypeId: project.retrofitTypeId || null,
          estimateStatusIfUsed: project.expectedHandling || null
        })
      ),
      source: "gpt_pro_grant_test_profile_realism_repair",
      sourceFile: output.fileName
    })),
    grantOpportunitySpecificInputs: arrayOf(repair.opportunitySpecificFacts).map((opportunity) => ({
      opportunityId: baseOpportunityId(opportunity.opportunityId || ""),
      branchId: branchId(opportunity.opportunityId || ""),
      expectedHandling: opportunity.expectedHandling || "needs_project_scope",
      inputFacts: arrayOf(opportunity.inputFacts).map((fact) =>
        normalizeFact(fact, {
          sourceFile: output.fileName,
          opportunityId: opportunity.opportunityId || null,
          estimateStatusIfUsed: opportunity.expectedHandling || null
        })
      ),
      reasoning: opportunity.reasoning || "",
      source: "gpt_pro_grant_test_profile_realism_repair",
      sourceFile: output.fileName
    })),
    grantMissingOrReviewInputs: arrayOf(repair.missingOrReviewInputs).map((row) => ({
      ...row,
      source: "gpt_pro_grant_test_profile_realism_repair",
      sourceFile: output.fileName
    })),
    grantDoNotForceQualificationReasons: arrayOf(repair.doNotForceQualificationReasons),
    syntheticGrantProfileDataNotice:
      "Synthetic and public-source estimated grant/project profile for test fixtures; not verified customer project scope."
  };
}

function normalizeFact(fact, { sourceFile, retrofitTypeId = null, opportunityId = null, estimateStatusIfUsed = null } = {}) {
  const sourceStrategy = fact?.sourceStrategy || fact?.source_strategy || "synthetic_realistic_default";
  const valueType = fact?.valueType || fact?.value_type || valueTypeFor(fact?.value);
  return {
    inputKey: fact?.inputKey || fact?.input_key || "",
    value: normalizeFactValue(fact?.value, valueType),
    valueType,
    sourceStrategy,
    confidence: fact?.confidence || "medium",
    confidenceImpactUntilConfirmed:
      fact?.confidenceImpactUntilConfirmed || confidenceImpactUntilConfirmed(fact?.confidence || "medium"),
    userOverrideAllowed: fact?.userOverrideAllowed !== false,
    defaultIsSynthetic:
      typeof fact?.defaultIsSynthetic === "boolean"
        ? fact.defaultIsSynthetic
        : sourceStrategy === "synthetic_realistic_default",
    reasoning: fact?.reasoning || "",
    source: "gpt_pro_grant_test_profile_realism_repair",
    sourceFile,
    retrofitTypeId,
    opportunityId,
    estimateStatusIfUsed,
    includeInUserFacingTotalBeforeConfirmation: fact?.includeInUserFacingTotalBeforeConfirmation ?? null
  };
}

function applyPackageRepairs(packagesArtifact, repairs) {
  const packages = packagesArtifact.packages || [];
  const packagesById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
  const warnings = [];
  let appliedCount = 0;
  let createdEffectCount = 0;

  for (const repair of repairs) {
    const pkg = packagesById.get(repair.baseOpportunityId);
    if (!pkg) {
      warnings.push(`No v2 package found for grant package repair ${repair.opportunityId}.`);
      continue;
    }
    const result = applyPackageRepairToPackage(pkg, repair);
    appliedCount += 1;
    if (result.createdEffect) createdEffectCount += 1;
  }

  packagesArtifact.generatedAt = now;
  packagesArtifact.grantProductionQualityRepairAppliedAt = now;
  packagesArtifact.grantProductionQualityRepairArtifact = path.relative(repoRoot, packageArtifactPath);
  packagesArtifact.grantProductionQualityRepairCount = appliedCount;
  packagesArtifact.grantProductionQualityCreatedEffectCount = createdEffectCount;
  packagesArtifact.statusCounts = countBy(packages, (pkg) => pkg.calculation_status || "unknown");
  packagesArtifact.confidenceCounts = countBy(packages, (pkg) => confidenceLabel(pkg.confidence?.overall));

  return { appliedCount, createdEffectCount, warnings };
}

function applyPackageRepairToPackage(pkg, repair) {
  const effectResult = findOrCreateEffectForRepair(pkg, repair);
  const effect = effectResult.effect;
  const evidenceId = `grant_production_quality_${shortHash(`${repair.opportunityId}|${repair.sourceFile}`)}`;
  const evidence = {
    evidence_id: evidenceId,
    source_type: "gpt_pro_grant_production_quality_repair",
    quote: repair.evidenceText || repair.conditionalAwardModel?.formulaText || repair.reasoningNotes || "",
    source_urls: repair.normalizedSourceUrlsChecked || normalizeUrls(repair.sourceUrlsChecked || []),
    evidence_confidence: confidenceNumber(repair.sourceConfidence)
  };

  pkg.source_evidence = upsertByKey(pkg.source_evidence || [], evidence, "evidence_id");
  effect.evidence_refs = uniqueStrings([...(effect.evidence_refs || []), evidenceId]);
  pkg.availability = {
    ...(pkg.availability || {}),
    status: normalizeAvailabilityStatus(repair.availabilityStatus, pkg.availability?.status),
    funding_status: repair.timingAndApplicationRules?.fundingStatus || pkg.availability?.funding_status || null,
    application_deadline:
      repair.timingAndApplicationRules?.applicationDeadline ?? pkg.availability?.application_deadline ?? null,
    source_access_status: sourceAccessStatus(repair),
    production_repair_availability_status: repair.availabilityStatus || null,
    production_repair_researched_at: repair.researchedAt || null
  };
  pkg.calculation_status = chooseCalculationStatus(pkg.calculation_status, statusFromRepair(repair));
  pkg.stacking = {
    ...(pkg.stacking || {}),
    grant_production_quality: toSnakeObject(repair.stackingRules || {})
  };

  effect.label = repair.estimateRecommendation?.userFacingLabel || effect.label || repair.programName || repair.opportunityId;
  effect.effect_type = normalizeEffectType(effect.effect_type || effectTypeForRepair(repair));
  effect.cash_flow_direction = effect.effect_type === "recurring_expense" ? "cost" : "benefit";
  effect.timing = {
    ...(effect.timing || { cadence: "one_time" }),
    approval_required_before_purchase:
      repair.timingAndApplicationRules?.approvalRequiredBeforePurchase ?? effect.timing?.approval_required_before_purchase ?? null,
    approval_required_before_installation:
      repair.timingAndApplicationRules?.approvalRequiredBeforeInstallation ?? effect.timing?.approval_required_before_installation ?? null,
    application_deadline:
      repair.timingAndApplicationRules?.applicationDeadline ?? effect.timing?.application_deadline ?? null,
    funding_status: repair.timingAndApplicationRules?.fundingStatus || effect.timing?.funding_status || null,
    payment_timing: repair.timingAndApplicationRules?.paymentTiming || effect.timing?.payment_timing || null
  };
  effect.calculation = buildProductionCalculation(effect.calculation || {}, repair);
  effect.caps = mergeProductionCaps(effect.caps || [], repair, effect.effect_id);
  effect.required_inputs = mergeInputRequirements(
    effect.required_inputs || [],
    requiredInputsFromRepair(repair, effect.effect_id)
  );
  pkg.input_requirements = mergeInputRequirements(pkg.input_requirements || [], effect.required_inputs || []);
  effect.included_in_user_facing_total = repair.estimateRecommendation?.includeInUserFacingTotalDefault === true;
  effect.confidence = confidenceForRepair(effect.confidence || {}, repair);
  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    value_model_kind: repair.valueModelKind || effect.repair_metadata?.value_model_kind || null,
    cash_value_classification: repair.cashValueClassification || effect.repair_metadata?.cash_value_classification || null,
    included_in_user_facing_total_default: repair.estimateRecommendation?.includeInUserFacingTotalDefault === true,
    human_review_required:
      repair.humanReviewRequired === true ||
      ["suppressed", "human_review_required"].includes(repair.estimateRecommendation?.estimateStatus) ||
      repair.sourceConfidence === "low",
    human_review_reasons: uniqueStrings([
      ...(effect.repair_metadata?.human_review_reasons || []),
      ...(repair.humanReviewReasons || []),
      ...(repair.estimateRecommendation?.reasonCodes || [])
    ]),
    grant_production_quality_repair: {
      source_file: repair.sourceFile,
      prompt_id: repair.promptId,
      researched_at: repair.researchedAt,
      opportunity_id: repair.opportunityId,
      base_opportunity_id: repair.baseOpportunityId,
      branch_id: repair.branchId,
      availability_status: repair.availabilityStatus || null,
      source_confidence: repair.sourceConfidence || null,
      estimate_confidence: repair.estimateRecommendation?.estimateConfidence || null,
      estimate_status: repair.estimateRecommendation?.estimateStatus || null,
      value_model_kind: repair.valueModelKind || null,
      cash_value_classification: repair.cashValueClassification || null,
      reason_codes: repair.estimateRecommendation?.reasonCodes || [],
      evidence_text: repair.evidenceText || "",
      reasoning_notes: repair.reasoningNotes || "",
      source_urls_checked: repair.normalizedSourceUrlsChecked || [],
      human_review_required: repair.humanReviewRequired === true,
      human_review_reasons: repair.humanReviewReasons || []
    }
  };
  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    grant_production_quality_repair_applied_at: now,
    grant_production_quality_repair_artifact: path.relative(repoRoot, packageArtifactPath)
  };
  pkg.confidence = confidenceForRepair(pkg.confidence || {}, repair, { packageLevel: true });

  return effectResult;
}

function applyProbabilityRepairs(packagesArtifact, repairs) {
  const packages = packagesArtifact.packages || [];
  const packagesById = new Map(packages.map((pkg) => [pkg.opportunity_id, pkg]));
  const warnings = [];
  let appliedCount = 0;

  for (const repair of repairs) {
    const pkg = packagesById.get(repair.baseOpportunityId);
    if (!pkg) {
      warnings.push(`No v2 package found for probability deep research ${repair.opportunityId}.`);
      continue;
    }
    const targetEffects = findEffectsForProbabilityRepair(pkg, repair);
    if (targetEffects.length === 0) {
      warnings.push(`No effect found for probability deep research ${repair.opportunityId}.`);
      continue;
    }
    for (const effect of targetEffects) {
      applyProbabilityRepairToEffect({ pkg, effect, repair });
      appliedCount += 1;
    }
  }

  packagesArtifact.generatedAt = now;
  packagesArtifact.grantProbabilityDeepResearchAppliedAt = now;
  packagesArtifact.grantProbabilityDeepResearchArtifact = path.relative(repoRoot, probabilityArtifactPath);
  packagesArtifact.grantProbabilityDeepResearchAppliedCount = appliedCount;

  return { appliedCount, warnings };
}

function applyProbabilityRepairToEffect({ pkg, effect, repair }) {
  const evidenceId = `grant_probability_deep_research_${shortHash(`${repair.opportunityId}|${repair.sourceFile}`)}`;
  pkg.source_evidence = upsertByKey(
    pkg.source_evidence || [],
    {
      evidence_id: evidenceId,
      source_type: "gpt_pro_grant_probability_deep_research",
      quote: repair.evidenceText || repair.conditionalAwardEvidence?.formulaText || repair.reasoningNotes || "",
      source_urls: repair.normalizedSourceUrlsChecked || normalizeUrls(repair.sourceUrlsChecked || []),
      evidence_confidence: confidenceNumber(repair.probabilityRecommendation?.estimateConfidence || "medium")
    },
    "evidence_id"
  );
  effect.evidence_refs = uniqueStrings([...(effect.evidence_refs || []), evidenceId]);
  effect.calculation = {
    ...(effect.calculation || {}),
    conditional_award_evidence: toSnakeObject(repair.conditionalAwardEvidence || {}),
    probability_deep_research: toSnakeObject({
      probabilityRecommendation: repair.probabilityRecommendation || {},
      fallbackPriorSuggestion: repair.fallbackPriorSuggestion || {},
      awardHistory: repair.awardHistory || []
    })
  };

  const probabilityDiscount = finiteOrNull(repair.probabilityRecommendation?.probabilityDiscount);
  if (effect.calculation.method === "expected_value" && Number.isFinite(probabilityDiscount)) {
    effect.calculation.probability_discount = probabilityDiscount;
  }

  effect.confidence = {
    ...(effect.confidence || {}),
    calculation: confidenceNumber(repair.probabilityRecommendation?.estimateConfidence || "low"),
    reason_codes: uniqueStrings([
      ...(effect.confidence?.reason_codes || []),
      "grant_probability_deep_research_applied",
      ...(repair.probabilityRecommendation?.reasonCodes || [])
    ])
  };
  effect.repair_metadata = {
    ...(effect.repair_metadata || {}),
    included_in_user_facing_total_default:
      repair.probabilityRecommendation?.includeInUserFacingTotalDefault === true &&
      effect.repair_metadata?.included_in_user_facing_total_default === true,
    grant_probability_deep_research: {
      source_file: repair.sourceFile,
      prompt_id: repair.promptId,
      researched_at: repair.researchedAt,
      opportunity_id: repair.opportunityId,
      probability_evidence_type: repair.probabilityRecommendation?.probabilityEvidenceType || null,
      probability_discount: probabilityDiscount,
      competition_scope: repair.probabilityRecommendation?.competitionScope || null,
      include_in_user_facing_total_default: repair.probabilityRecommendation?.includeInUserFacingTotalDefault === true,
      reason_codes: repair.probabilityRecommendation?.reasonCodes || [],
      award_history_count: repair.awardHistory?.length || 0,
      fallback_prior_suggestion: toSnakeObject(repair.fallbackPriorSuggestion || {})
    }
  };
  effect.included_in_user_facing_total =
    effect.included_in_user_facing_total === true &&
    repair.probabilityRecommendation?.includeInUserFacingTotalDefault === true;
  pkg.migration_metadata = {
    ...(pkg.migration_metadata || {}),
    grant_probability_deep_research_applied_at: now,
    grant_probability_deep_research_artifact: path.relative(repoRoot, probabilityArtifactPath)
  };
}

function applyProfileRepairs({ sampleUsers, testCasesPayload, profileArtifact }) {
  const updatesBySampleId = new Map(profileArtifact.profileUpdates.map((update) => [update.sampleUserId, update]));
  const testCases = Array.isArray(testCasesPayload) ? testCasesPayload : testCasesPayload.testCases || [];
  const warnings = [];
  const patchedSampleUsers = sampleUsers.map((sample) => {
    const update = updatesBySampleId.get(sample.sampleUserId);
    if (!update) return sample;
    return { ...sample, ...grantProfilePatch(update) };
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
      warnings.push(`Grant profile realism update has no sample user: ${sampleUserId}.`);
    }
    if (!patchedTestCases.some((testCase) => testCase.sampleUserId === sampleUserId)) {
      warnings.push(`Grant profile realism update has no public test case: ${sampleUserId}.`);
    }
  }

  return {
    sampleUsers: patchedSampleUsers,
    testCasesPayload: Array.isArray(testCasesPayload)
      ? patchedTestCases
      : {
          ...testCasesPayload,
          sampleGrantProfileRealismDataImportedAt: now,
          sampleGrantProfileRealismCount: updatesBySampleId.size,
          sampleGrantProfileRealismSchemaVersion: profileArtifact.schemaVersion,
          sampleGrantProfileRealismSourcePath: path.relative(repoRoot, profileArtifactPath),
          testCases: patchedTestCases
        },
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
    grantProfileDataSchemaVersion: "retrofi_grant_test_profile_realism_repair.v1",
    grantProfileDataSourceArtifact: path.relative(repoRoot, profileArtifactPath)
  };
}

function findOrCreateEffectForRepair(pkg, repair) {
  const effects = pkg.effects || [];
  const existing = findBestEffectForRepair(effects, repair);
  if (existing) return { effect: existing, createdEffect: false };

  const effect = {
    effect_id: `effect_grant_prod_${shortHash(repair.opportunityId)}`,
    label: repair.estimateRecommendation?.userFacingLabel || repair.programName || repair.opportunityId,
    effect_type: effectTypeForRepair(repair),
    cash_flow_direction: "benefit",
    timing: { cadence: "one_time", source_timing: "grant_production_quality_repair" },
    calculation: { method: "custom_quote", reason: "Created from grant production quality repair; project-specific inputs required." },
    limits: [],
    caps: [],
    required_inputs: [],
    evidence_refs: [],
    included_in_user_facing_total: false,
    confidence: {
      overall: 0.38,
      calculation: 0.38,
      extraction: confidenceNumber(repair.sourceConfidence),
      reason_codes: ["grant_production_quality_created_effect"]
    }
  };
  pkg.effects = [...effects, effect];
  return { effect, createdEffect: true };
}

function findBestEffectForRepair(effects, repair) {
  if (!effects.length) return null;
  const branch = repair.branchId;
  const candidates = effects.map((effect) => ({
    effect,
    score: scoreEffectForRepair(effect, repair, branch)
  }));
  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];
  if (best.score > 0) return best.effect;
  return effects.find((effect) => isGrantLikeEffect(effect)) || effects[0];
}

function scoreEffectForRepair(effect, repair, branch) {
  let score = 0;
  const text = normalizeText(
    `${effect.effect_id || ""} ${effect.label || ""} ${effect.calculation?.conditional_award_formula || ""} ${effect.calculation?.formula_text || ""} ${effect.calculation?.grant_value_model_kind || ""} ${effect.repair_metadata?.value_model_kind || ""}`
  );
  if (effect.repair_metadata?.grant_production_quality_repair?.branch_id === branch) score += 20;
  if (isGrantLikeEffect(effect)) score += 2;
  if (effect.calculation?.grant_value_model_kind === repair.valueModelKind) score += 2;
  if (effect.repair_metadata?.value_model_kind === repair.valueModelKind) score += 2;

  for (const token of branchTokens(branch)) {
    if (text.includes(token)) score += 5;
  }
  for (const token of branchTokens(repair.programName)) {
    if (text.includes(token)) score += 1;
  }
  return score;
}

function findEffectsForProbabilityRepair(pkg, repair) {
  const effectIds = new Set(repair.effectIds || []);
  const exact = (pkg.effects || []).filter((effect) => effectIds.has(effect.effect_id));
  if (exact.length) return exact;
  const branch = repair.branchId;
  if (branch) {
    const branchMatches = (pkg.effects || []).filter((effect) => scoreEffectForRepair(effect, repair, branch) >= 5);
    if (branchMatches.length) return branchMatches;
  }
  return (pkg.effects || []).filter((effect) => isGrantLikeEffect(effect)).slice(0, 1);
}

function buildProductionCalculation(current, repair) {
  const conditional = repair.conditionalAwardModel || {};
  const probability = repair.probabilityModel || {};
  const recommendation = repair.estimateRecommendation || {};
  const amountCents = finiteOrNull(conditional.conditionalAwardCents ?? conditional.amountCents);
  const probabilityDiscount = finiteOrNull(probability.probabilityDiscount);
  let method = current.method || "custom_quote";

  if (recommendation.estimateStatus === "zero_value" || conditional.status === "zero_value") {
    method = "zero_when_not_applicable";
  } else if (
    recommendation.estimateStatus === "expected_value_estimate" &&
    Number.isFinite(amountCents) &&
    Number.isFinite(probabilityDiscount)
  ) {
    method = "expected_value";
  } else if (
    recommendation.estimateStatus === "deterministic_estimate" &&
    repair.valueModelKind === "fixed_amount" &&
    Number.isFinite(amountCents)
  ) {
    method = "fixed_amount";
  } else if (
    ["percent_of_eligible_cost", "capped_percent_of_eligible_cost", "competitive_cost_share"].includes(repair.valueModelKind) &&
    Number.isFinite(finiteOrNull(conditional.costSharePercent)) &&
    !["expected_value", "rate_table", "expression"].includes(method)
  ) {
    method = "percent_of_cost";
  } else if (method === "zero_when_not_applicable" && recommendation.estimateStatus !== "zero_value") {
    method = "custom_quote";
  }

  const calculation = {
    ...current,
    method,
    grant_value_model_kind: repair.valueModelKind || null,
    cash_value_classification: repair.cashValueClassification || null,
    conditional_award_model: toSnakeObject(conditional),
    probability_model: toSnakeObject(probability),
    estimate_recommendation: toSnakeObject(recommendation),
    timing_and_application_rules: toSnakeObject(repair.timingAndApplicationRules || {}),
    stacking_rules: toSnakeObject(repair.stackingRules || {}),
    formula_text: conditional.formulaText || current.formula_text || current.conditional_award_formula || null,
    source_repair_status: recommendation.estimateStatus || conditional.status || null
  };

  if (method === "expected_value") {
    calculation.conditional_award_cents = amountCents;
    calculation.probability_discount = probabilityDiscount;
  }
  if (method === "fixed_amount") {
    calculation.amount = centsToMoney(amountCents);
    calculation.amount_cents = amountCents;
  }
  if (method === "percent_of_cost") {
    calculation.percent = normalizePercent(conditional.costSharePercent);
    calculation.cost_input = findCostInput(requiredInputKeys(conditional.requiredInputs)) || current.cost_input || "eligible_project_cost_cents";
  }
  if (method === "zero_when_not_applicable") {
    calculation.reason = conditional.formulaText || recommendation.userFacingCaveat || current.reason || "Grant production quality repair classified this value as zero.";
  }
  if (method === "custom_quote") {
    calculation.reason = recommendation.userFacingCaveat || conditional.formulaText || current.reason || "Project-specific grant inputs or review required.";
  }

  return calculation;
}

function requiredInputsFromRepair(repair, effectId) {
  return requiredInputObjects(repair.conditionalAwardModel?.requiredInputs).map((input) => ({
    input_key: input.inputKey,
    label: input.label || labelFromInputKey(input.inputKey),
    value_type: normalizeInputValueType(input.valueType),
    allowed_values: input.allowedValues || input.allowed_values || undefined,
    required_for: [effectId],
    source_precedence: sourcePrecedenceForInput(input),
    missing_severity: missingSeverityForInput(input, repair),
    user_override_allowed: input.isUserOverrideAllowed !== false,
    why_needed: input.whyNeeded || "",
    source: "grant_production_quality_repair"
  }));
}

function requiredInputObjects(inputs = []) {
  return arrayOf(inputs)
    .map((input) => (typeof input === "string" ? { inputKey: input } : input))
    .map((input) => ({ ...input, inputKey: input.inputKey || input.input_key || "" }))
    .filter((input) => input.inputKey);
}

function requiredInputKeys(inputs = []) {
  return requiredInputObjects(inputs).map((input) => input.inputKey);
}

function mergeInputRequirements(existingInputs, newInputs) {
  const byKey = new Map();
  for (const input of [...arrayOf(existingInputs), ...arrayOf(newInputs)]) {
    const inputKey = input.input_key || input.inputKey;
    if (!inputKey) continue;
    const normalized = {
      ...input,
      input_key: inputKey,
      label: input.label || labelFromInputKey(inputKey),
      value_type: input.value_type || input.valueType || "text",
      required_for: uniqueStrings(input.required_for || input.requiredFor || []),
      source_precedence: uniqueStrings(input.source_precedence || input.sourcePrecedence || [])
    };
    const existing = byKey.get(inputKey);
    if (!existing) {
      byKey.set(inputKey, normalized);
      continue;
    }
    byKey.set(inputKey, {
      ...existing,
      ...normalized,
      required_for: uniqueStrings([...(existing.required_for || []), ...(normalized.required_for || [])]),
      source_precedence: uniqueStrings([...(existing.source_precedence || []), ...(normalized.source_precedence || [])]),
      allowed_values: uniqueStrings([...(existing.allowed_values || []), ...(normalized.allowed_values || [])])
    });
  }
  return [...byKey.values()];
}

function mergeProductionCaps(existingCaps, repair, effectId) {
  const conditional = repair.conditionalAwardModel || {};
  const caps = conditional.caps || {};
  const generated = [];
  const maxAwardCents = finiteOrNull(caps.maxAwardCents ?? conditional.maxAwardCents);
  const maxPercent = finiteOrNull(caps.maxPercentOfEligibleCost);
  if (Number.isFinite(maxAwardCents)) {
    generated.push({
      cap_id: `grant_prod_max_${shortHash(`${repair.opportunityId}|${effectId}|max`)}`,
      cap_type: "maximum_amount",
      amount: centsToMoney(maxAwardCents),
      applies_to: "effect",
      source: "grant_production_quality_repair",
      branch_id: repair.branchId || null
    });
  }
  if (Number.isFinite(maxPercent)) {
    generated.push({
      cap_id: `grant_prod_pct_${shortHash(`${repair.opportunityId}|${effectId}|pct`)}`,
      cap_type: "maximum_percent_of_cost",
      percent: normalizePercent(maxPercent),
      applies_to: "effect",
      source: "grant_production_quality_repair",
      branch_id: repair.branchId || null
    });
  }
  return [
    ...arrayOf(existingCaps).filter(
      (cap) => !(cap.source === "grant_production_quality_repair" && (cap.branch_id || null) === (repair.branchId || null))
    ),
    ...generated
  ];
}

function confidenceForRepair(current, repair, { packageLevel = false } = {}) {
  const source = confidenceNumber(repair.sourceConfidence);
  const estimate = confidenceNumber(repair.estimateRecommendation?.estimateConfidence || "low");
  return {
    ...current,
    overall: Math.min(source, estimate),
    source_access: packageLevel ? source : current.source_access,
    calculation: estimate,
    extraction: source,
    reason_codes: uniqueStrings([
      ...(current.reason_codes || []),
      "grant_production_quality_repair_applied",
      `source_confidence_${repair.sourceConfidence || "unknown"}`,
      `estimate_confidence_${repair.estimateRecommendation?.estimateConfidence || "unknown"}`,
      `value_model_${repair.valueModelKind || "unknown"}`,
      `estimate_status_${repair.estimateRecommendation?.estimateStatus || "unknown"}`
    ])
  };
}

function statusFromRepair(repair) {
  const estimateStatus = repair.estimateRecommendation?.estimateStatus || "";
  if (repair.availabilityStatus === "source_inaccessible" || repair.valueModelKind === "source_inaccessible") {
    return "source_inaccessible_repair_failure";
  }
  if (["deterministic_estimate", "expected_value_estimate", "range_estimate"].includes(estimateStatus)) {
    return "calculable";
  }
  if (["needs_quote", "needs_project_scope", "needs_funding_check"].includes(estimateStatus)) {
    return "calculable_with_missing_inputs";
  }
  if (estimateStatus === "zero_value" || ["loan_or_financing_labeled_as_grant", "tax_credit_mixed_with_grant", "non_cash_technical_assistance", "no_calculable_value"].includes(repair.valueModelKind)) {
    return "no_calculable_value";
  }
  if (estimateStatus === "not_calculable") return "no_calculable_value";
  if (estimateStatus === "suppressed" || estimateStatus === "human_review_required") return "needs_repair_review";
  return "calculable_with_missing_inputs";
}

function chooseCalculationStatus(current, candidate) {
  const priority = {
    source_inaccessible_repair_failure: 0,
    unavailable_archived: 0,
    no_calculable_value: 1,
    non_monetary_workflow: 1,
    needs_repair_review: 2,
    custom_quote_estimate: 3,
    calculable_with_missing_inputs: 4,
    estimate_from_range: 4,
    calculable: 5
  };
  return (priority[candidate] ?? 0) > (priority[current] ?? 0) ? candidate : current;
}

function sourceAccessStatus(repair) {
  if (repair.availabilityStatus === "source_inaccessible" || repair.sourceConfidence === "low") return "limited_or_inaccessible";
  if (repair.sourceConfidence === "high") return "verified_official_source";
  return "partially_verified";
}

function effectTypeForRepair(repair) {
  const classification = repair.cashValueClassification;
  if (classification === "tax_credit") return "tax_credit";
  if (classification === "loan" || classification === "financing") return "financing_subsidy";
  if (classification === "technical_assistance") return "process_value";
  if (repair.probabilityModel?.probabilityRequired || String(repair.valueModelKind || "").startsWith("competitive")) {
    return "grant_expected_value";
  }
  return "one_time_savings";
}

function normalizeEffectType(value) {
  const allowed = new Set([
    "one_time_savings",
    "recurring_savings",
    "recurring_expense",
    "grant_expected_value",
    "tax_credit",
    "tax_exemption",
    "tax_abatement",
    "tax_rate_preference",
    "property_tax_valuation",
    "financing_subsidy",
    "process_value",
    "no_cash_value"
  ]);
  return allowed.has(value) ? value : "grant_expected_value";
}

function isGrantLikeEffect(effect) {
  return (
    effect.effect_type === "grant_expected_value" ||
    effect.calculation?.method === "expected_value" ||
    effect.repair_metadata?.cash_value_classification === "cash_grant" ||
    effect.repair_metadata?.cash_value_classification === "reimbursement" ||
    effect.calculation?.cash_value_classification === "cash_grant" ||
    effect.calculation?.cash_value_classification === "reimbursement" ||
    Boolean(effect.repair_metadata?.value_model_kind)
  );
}

function normalizeAvailabilityStatus(value, fallback = "unknown") {
  if (!value) return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (normalized === "active" || normalized === "open") return "active";
  if (normalized === "waitlist") return "waitlist";
  if (normalized === "closed") return "closed";
  if (normalized === "source_inaccessible") return "source_inaccessible";
  return normalized;
}

function normalizeInputValueType(value) {
  const text = String(value || "text").toLowerCase();
  if (text.includes("money")) return "money_cents";
  if (text.includes("number") || text.includes("integer")) return "number";
  if (text.includes("boolean")) return "boolean";
  if (text.includes("enum")) return "enum";
  if (text.includes("date")) return "date";
  return "text";
}

function sourcePrecedenceForInput(input) {
  const source = String(input.inputSource || input.input_source || "").toLowerCase();
  const key = String(input.inputKey || "").toLowerCase();
  if (source.includes("server")) return ["server_derived", "user_profile", "admin_review"];
  if (source.includes("quote") || source.includes("invoice")) return ["quote", "paid_invoice", "user_profile", "admin_review"];
  if (source.includes("application") || source.includes("award")) return ["program_application", "award_document", "admin_review", "user_profile"];
  if (source.includes("tax")) return ["tax_document", "user_profile", "admin_review"];
  if (/cost|amount|budget|price|invoice|award|match/.test(key)) return ["quote", "program_application", "user_profile", "admin_review"];
  if (/kwh|kw|utility|bill|rate|tariff/.test(key)) return ["utility_data", "quote", "user_profile"];
  return ["user_profile", "retrofit_assumptions", "quote", "admin_review"];
}

function missingSeverityForInput(input, repair) {
  if (input.missingSeverity) return input.missingSeverity;
  if (repair.estimateRecommendation?.includeInUserFacingTotalDefault === true) return "blocks_calculation";
  const key = String(input.inputKey || "").toLowerCase();
  if (/funding|award|approval|agreement|preapproval|executed/.test(key)) return "blocks_user_facing_total";
  return "blocks_calculation";
}

function baseOpportunityId(value) {
  return String(value || "").split("#")[0] || "";
}

function branchId(value) {
  const parts = String(value || "").split("#");
  return parts.length > 1 ? parts.slice(1).join("#") : null;
}

function branchTokens(value) {
  const text = normalizeText(value);
  const tokens = new Set(text.split(" ").filter((token) => token.length >= 3));
  if (/level/.test(text) || /\bl1\b/.test(text) || /\bl2\b/.test(text)) ["level", "l1", "l2"].forEach((token) => tokens.add(token));
  if (/dcfc|fast/.test(text)) ["dcfc", "fast"].forEach((token) => tokens.add(token));
  if (/solar|pv/.test(text)) ["solar", "pv"].forEach((token) => tokens.add(token));
  if (/domestic|hot|water|sdhw/.test(text)) ["domestic", "hot", "water", "sdhw"].forEach((token) => tokens.add(token));
  if (/storage|battery/.test(text)) ["storage", "battery"].forEach((token) => tokens.add(token));
  return [...tokens];
}

function normalizeText(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function normalizeUrls(values) {
  const urls = [];
  for (const value of values || []) {
    const matches = String(value || "").match(/https?:\/\/[^\s\]\)"'<>]+/g) || [];
    urls.push(...matches.map((url) => url.replace(/[.,;]+$/g, "")));
  }
  return uniqueStrings(urls);
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

function confidenceNumber(value) {
  if (typeof value === "number") return value;
  if (value === "high") return 0.9;
  if (value === "medium") return 0.72;
  if (value === "low") return 0.38;
  return 0.5;
}

function confidenceLabel(value) {
  const number = Number(value);
  if (number >= 0.82) return "high";
  if (number >= 0.55) return "medium";
  return "low";
}

function normalizePercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  if (number > 1 && number <= 100) return number / 100;
  return number;
}

function findCostInput(inputs = []) {
  return (inputs || []).find((input) => /cost|budget|expense|price|invoice/i.test(input));
}

function labelFromInputKey(inputKey) {
  return String(inputKey || "")
    .replace(/_cents$/i, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function centsToMoney(cents) {
  if (!Number.isFinite(cents)) return { amount: 0, currency: "USD" };
  return { amount: Number(cents) / 100, currency: "USD" };
}

function finiteOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

function uniqueStrings(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

function upsertByKey(rows, row, key) {
  return [...rows.filter((existing) => existing?.[key] !== row[key]), row];
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function sum(rows, getter) {
  return rows.reduce((total, row) => total + Number(getter(row) || 0), 0);
}

function shortHash(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 16);
}

function toSnakeObject(value) {
  if (Array.isArray(value)) return value.map(toSnakeObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, nested]) => [toSnakeKey(key), toSnakeObject(nested)]));
}

function toSnakeKey(key) {
  return String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}

function validatePackages(packages) {
  const invalidSamples = [];
  let invalidCount = 0;
  for (const pkg of packages) {
    const validation = validateIncentiveCalculationPackageV2(pkg);
    if (!validation.valid) {
      invalidCount += 1;
      if (invalidSamples.length < 10) invalidSamples.push({ opportunityId: pkg.opportunity_id, errors: validation.errors });
    }
  }
  return { packageCount: packages.length, invalidCount, invalidSamples };
}

function buildReport({
  validation,
  packageArtifact,
  probabilityArtifact,
  profileArtifact,
  packageApplyResult,
  probabilityApplyResult,
  profileApplyResult,
  packageValidation
}) {
  const allWarnings = uniqueStrings([
    ...validation.warnings,
    ...packageArtifact.validationWarnings,
    ...probabilityArtifact.validationWarnings,
    ...profileArtifact.validationWarnings,
    ...packageApplyResult.warnings,
    ...probabilityApplyResult.warnings,
    ...profileApplyResult.warnings
  ]);
  const lines = [];
  lines.push("# Grant Production Quality Intake Report");
  lines.push("");
  lines.push(`Generated: ${now}`);
  lines.push("");
  lines.push("## Output Validation");
  lines.push("");
  lines.push(`- Package output files parsed: ${packageArtifact.sourceFiles.length}`);
  lines.push(`- Package repairs imported: ${packageArtifact.repairCount}`);
  lines.push(`- Profile output files parsed: ${profileArtifact.sourceFiles.length}`);
  lines.push(`- Profile repairs imported: ${profileArtifact.profileCount}`);
  lines.push(`- Probability output files parsed: ${probabilityArtifact.sourceFiles.length}`);
  lines.push(`- Probability repairs imported: ${probabilityArtifact.repairCount}`);
  lines.push(`- Fatal validation errors: ${validation.fatalErrors.length}`);
  lines.push(`- Warnings: ${allWarnings.length}`);
  lines.push("");
  lines.push("## Package Application");
  lines.push("");
  lines.push(`- Package repairs applied: ${packageApplyResult.appliedCount}`);
  lines.push(`- Package effects created: ${packageApplyResult.createdEffectCount}`);
  lines.push(`- Probability repairs applied to effects: ${probabilityApplyResult.appliedCount}`);
  lines.push(`- Packages validated: ${packageValidation.packageCount}`);
  lines.push(`- Invalid packages after import: ${packageValidation.invalidCount}`);
  lines.push("");
  lines.push("### Package Repair Estimate Status");
  lines.push("");
  appendCountTable(lines, packageArtifact.counts.estimateStatusCounts);
  lines.push("");
  lines.push("### Package Repair Value Models");
  lines.push("");
  appendCountTable(lines, packageArtifact.counts.valueModelKindCounts);
  lines.push("");
  lines.push("### Probability Evidence Types");
  lines.push("");
  appendCountTable(lines, probabilityArtifact.counts.probabilityEvidenceTypeCounts);
  lines.push("");
  lines.push("## Test Profile Application");
  lines.push("");
  lines.push(`- Sample user profiles patched: ${profileApplyResult.patchedSampleUserCount}`);
  lines.push(`- Public test cases patched: ${profileApplyResult.patchedTestCaseCount}`);
  lines.push(`- Grant profile facts: ${profileArtifact.counts.globalFactCount}`);
  lines.push(`- Retrofit project facts: ${profileArtifact.counts.retrofitProjectFactCount}`);
  lines.push(`- Opportunity-specific facts: ${profileArtifact.counts.opportunitySpecificFactCount}`);
  lines.push("");
  lines.push("## Artifacts");
  lines.push("");
  lines.push(`- Package repairs: \`${path.relative(repoRoot, packageArtifactPath)}\``);
  lines.push(`- Probability repairs: \`${path.relative(repoRoot, probabilityArtifactPath)}\``);
  lines.push(`- Profile repairs: \`${path.relative(repoRoot, profileArtifactPath)}\``);
  lines.push(`- Updated packages: \`${path.relative(repoRoot, packagesPath)}\``);
  lines.push(`- Updated sample profiles: \`${path.relative(repoRoot, sampleUsersPath)}\``);
  lines.push(`- Updated public test cases: \`${path.relative(repoRoot, testCasesPath)}\``);
  lines.push("");
  lines.push("## Warnings");
  lines.push("");
  if (allWarnings.length) {
    for (const warning of allWarnings) lines.push(`- ${warning}`);
  } else {
    lines.push("- None.");
  }
  return `${lines.join("\n").replace(/\n+$/g, "")}\n`;
}

function appendCountTable(lines, counts) {
  lines.push("| Key | Count |");
  lines.push("| --- | ---: |");
  for (const [key, count] of Object.entries(counts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    lines.push(`| ${key} | ${count} |`);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
