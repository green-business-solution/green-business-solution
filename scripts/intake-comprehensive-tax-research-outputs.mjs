import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultDate = "2026-07-04";

const expectedOutputs = [
  {
    fileName: "output_001_national_source_registry_gap_fill.md",
    schemaVersion: "retrofi_tax_source_registry_gap_fill.v1",
    artifactKey: "nationalSourceRegistryGapFill"
  },
  {
    fileName: "output_002_sales_use_tax_rates_boundaries.md",
    schemaVersion: "retrofi_sales_use_tax_import_plan.v1",
    artifactKey: "salesUseTaxRatesBoundaries"
  },
  {
    fileName: "output_003_sales_use_tax_exemptions_taxability.md",
    schemaVersion: "retrofi_sales_use_tax_exemption_taxability_research.v1",
    artifactKey: "salesUseTaxExemptionsTaxability"
  },
  {
    fileName: "output_004_state_tax_credits_exemptions_deductions.md",
    schemaVersion: "retrofi_state_tax_credit_exemption_deduction_research.v1",
    artifactKey: "stateTaxCreditsExemptionsDeductions"
  },
  {
    fileName: "output_005_property_tax_statewide_rules.md",
    schemaVersion: "retrofi_property_tax_statewide_rule_research.v1",
    artifactKey: "propertyTaxStatewideRules"
  },
  {
    fileName: "output_006_county_city_local_option_incentives.md",
    schemaVersion: "retrofi_county_city_local_option_tax_research.v1",
    artifactKey: "countyCityLocalOptionIncentives"
  },
  {
    fileName: "output_007_business_tax_gross_receipts_bo.md",
    schemaVersion: "retrofi_business_tax_model_research.v1",
    artifactKey: "businessTaxGrossReceiptsBo"
  },
  {
    fileName: "output_008_abatement_pilot_special_assessment_pace.md",
    schemaVersion: "retrofi_exotic_tax_workflow_research.v1",
    artifactKey: "abatementPilotSpecialAssessmentPace"
  },
  {
    fileName: "output_009_unsupported_tax_fallback_triage.md",
    schemaVersion: "retrofi_unsupported_tax_fallback_triage.v1",
    artifactKey: "unsupportedTaxFallbackTriage"
  },
  {
    fileName: "output_010_import_validation_runtime_mapping.md",
    schemaVersion: "retrofi_tax_import_validation_runtime_mapping.v1",
    artifactKey: "importValidationRuntimeMapping"
  }
];

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const workDir = path.resolve(options.workDir || path.join(repoRoot, "GPT Pro Work", `tax-comprehensive-model-research-${date}`));
const artifactPath = path.resolve(options.artifactPath || path.join(repoRoot, "data", `tax_comprehensive_model_research_gpt_pro_${date}.json`));
const reportPath = path.resolve(options.reportPath || path.join(repoRoot, "data", `tax_comprehensive_model_research_intake_report_${date}.md`));
const registrySeedPath = path.resolve(options.registrySeedPath || path.join(repoRoot, "data", "tax_source_registry_seed.json"));

if (options.help) {
  printHelp();
  process.exit(0);
}

const now = new Date().toISOString();
const warnings = [];
const parsedOutputs = readExpectedOutputs();
const artifact = buildArtifact(parsedOutputs);
const registrySeed = readJson(registrySeedPath);
const registryUpdate = updateRegistrySeed(registrySeed, artifact);

if (!options.dryRun) {
  writeJson(artifactPath, artifact);
  writeJson(registrySeedPath, registrySeed);
  fs.writeFileSync(reportPath, buildReport({ artifact, registryUpdate }), "utf8");
}

console.log("Intook comprehensive tax research GPT Pro outputs.");
console.log(`Outputs parsed: ${artifact.sourceFiles.length}`);
console.log(`State sales/use tax plans: ${artifact.counts.stateSalesUsePlanCount}`);
console.log(`Source registry additions: ${artifact.counts.sourceRegistryAdditionCount}`);
console.log(`Tracked tax model rules: ${artifact.counts.trackedRuleCount}`);
console.log(`Verified local option rules: ${artifact.counts.verifiedLocalRuleCount}`);
console.log(`Warnings: ${artifact.validationWarnings.length}`);
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
  console.log(`Usage: node scripts/intake-comprehensive-tax-research-outputs.mjs [--date ${defaultDate}] [--dryRun]`);
}

function readExpectedOutputs() {
  return expectedOutputs.map((expected) => {
    const parsed = parseOutputFile(path.join(workDir, expected.fileName), expected.fileName);
    if (parsed.object.schemaVersion !== expected.schemaVersion) {
      throw new Error(`${expected.fileName} has schemaVersion ${parsed.object.schemaVersion}; expected ${expected.schemaVersion}.`);
    }
    if (parsed.trailingTextLength > 0) {
      warnings.push(`${expected.fileName} contains ${parsed.trailingCitationCount} trailing citation footnotes after the JSON object; preserved as sourceReferences.`);
    }
    return {
      ...parsed,
      artifactKey: expected.artifactKey
    };
  });
}

function parseOutputFile(filePath, fileName) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing expected output file: ${filePath}`);
  const raw = fs.readFileSync(filePath, "utf8");
  const extracted = extractFirstJsonObject(raw);
  return {
    fileName,
    object: normalizeUrlsDeep(JSON.parse(extracted.json)),
    trailingTextLength: extracted.trailing.length,
    sourceReferences: parseFootnoteReferences(extracted.trailing),
    trailingCitationCount: parseFootnoteReferences(extracted.trailing).length
  };
}

function extractFirstJsonObject(raw) {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
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

function parseFootnoteReferences(trailing) {
  const references = [];
  const pattern = /^\[(\d+)\]:\s+(\S+)(?:\s+"([^"]*)")?/gm;
  let match = pattern.exec(trailing || "");
  while (match) {
    references.push({
      referenceId: match[1],
      url: normalizeMarkdownUrl(match[2]),
      title: match[3] || ""
    });
    match = pattern.exec(trailing || "");
  }
  return references;
}

function buildArtifact(outputs) {
  const byKey = Object.fromEntries(outputs.map((output) => [output.artifactKey, output.object]));
  const sourceReferenceCounts = Object.fromEntries(outputs.map((output) => [output.fileName, output.sourceReferences.length]));
  const sourceReferences = Object.fromEntries(outputs.map((output) => [output.fileName, output.sourceReferences]));
  const counts = buildCounts(byKey, outputs);

  return {
    schemaVersion: "retrofi_tax_comprehensive_model_research_gpt_pro.v1",
    generatedAt: now,
    sourceWorkDir: path.relative(repoRoot, workDir),
    sourceFiles: outputs.map((output) => output.fileName),
    sourceReferenceCounts,
    counts,
    importReadiness: buildImportReadiness(byKey, counts),
    outputs: byKey,
    sourceReferences,
    validationWarnings: warnings
  };
}

function buildCounts(outputs, parsedOutputs) {
  return {
    parsedOutputCount: parsedOutputs.length,
    filesWithTrailingCitations: parsedOutputs.filter((output) => output.trailingTextLength > 0).length,
    trailingCitationCount: sum(parsedOutputs, (output) => output.sourceReferences.length),
    sourceRegistryAdditionCount: outputs.nationalSourceRegistryGapFill?.sourceRegistryAdditions?.length || 0,
    sourcesToSkipForNowCount: outputs.nationalSourceRegistryGapFill?.sourcesToSkipForNow?.length || 0,
    sourcesNeedingCodexStructuredImportCount: outputs.nationalSourceRegistryGapFill?.sourcesNeedingCodexStructuredImport?.length || 0,
    sourcesNeedingFurtherGPTResearchCount: outputs.nationalSourceRegistryGapFill?.sourcesNeedingFurtherGPTResearch?.length || 0,
    stateSalesUsePlanCount: outputs.salesUseTaxRatesBoundaries?.statePlans?.length || 0,
    salesUseTaxExemptionRuleCount: outputs.salesUseTaxExemptionsTaxability?.rules?.length || 0,
    salesUseTaxAmbiguousSkipCount: outputs.salesUseTaxExemptionsTaxability?.ambiguousRulesToSkipForNow?.length || 0,
    stateTaxCreditRuleCount: outputs.stateTaxCreditsExemptionsDeductions?.rules?.length || 0,
    stateTaxCreditSkipCount: outputs.stateTaxCreditsExemptionsDeductions?.rulesToSkipForNow?.length || 0,
    propertyTaxStatewideRuleCount: outputs.propertyTaxStatewideRules?.rules?.length || 0,
    propertyTaxStatewideSkipCount: outputs.propertyTaxStatewideRules?.rulesToSkipForNow?.length || 0,
    localOptionAuthorityCount: outputs.countyCityLocalOptionIncentives?.localOptionAuthorities?.length || 0,
    verifiedLocalRuleCount: outputs.countyCityLocalOptionIncentives?.verifiedLocalRules?.length || 0,
    localRulesNeedingFollowupCount: outputs.countyCityLocalOptionIncentives?.highValueLocalitiesNeedingFollowup?.length || 0,
    localRulesToSkipForNowCount: outputs.countyCityLocalOptionIncentives?.localRulesToSkipForNow?.length || 0,
    stateBusinessTaxModelCount: outputs.businessTaxGrossReceiptsBo?.stateBusinessTaxModels?.length || 0,
    majorLocalBusinessTaxModelCount: outputs.businessTaxGrossReceiptsBo?.majorLocalBusinessTaxModels?.length || 0,
    businessTaxSkipCount: outputs.businessTaxGrossReceiptsBo?.rulesToSkipForNow?.length || 0,
    exoticWorkflowPatternCount: outputs.abatementPilotSpecialAssessmentPace?.workflowPatterns?.length || 0,
    exoticOpportunityClassificationRuleCount: outputs.abatementPilotSpecialAssessmentPace?.opportunityClassificationRules?.length || 0,
    unsupportedTaxTriageRuleCount: outputs.unsupportedTaxFallbackTriage?.triageRules?.length || 0,
    normalizedDatabaseTableRecommendationCount: outputs.importValidationRuntimeMapping?.normalizedDatabaseTables?.length || 0,
    importValidationRuleCount: outputs.importValidationRuntimeMapping?.validationRules?.length || 0,
    trackedRuleCount:
      (outputs.salesUseTaxExemptionsTaxability?.rules?.length || 0) +
      (outputs.stateTaxCreditsExemptionsDeductions?.rules?.length || 0) +
      (outputs.propertyTaxStatewideRules?.rules?.length || 0) +
      (outputs.countyCityLocalOptionIncentives?.verifiedLocalRules?.length || 0) +
      (outputs.businessTaxGrossReceiptsBo?.stateBusinessTaxModels?.length || 0) +
      (outputs.businessTaxGrossReceiptsBo?.majorLocalBusinessTaxModels?.length || 0)
  };
}

function buildImportReadiness(outputs, counts) {
  return {
    summary: "Research is preserved for structured import design. It is not treated as live runtime tax data until source files, effective dates, jurisdiction joins, and validation rules are implemented.",
    readyForCodexImplementation: [
      "Build tax_source_documents and tax_rule_records tables from the import mapping output.",
      "Implement state sales/use tax rate source importers starting with official machine-readable sources and SST member files.",
      "Map supported state credit, sales-tax exemption, property-tax, and local-option rules to model records with required runtime inputs.",
      "Use unsupported fallback triage rules for future tax opportunities that do not map to a supported model."
    ],
    notYetRuntimeReady: [
      "Nationwide local rates are not imported into a queryable table yet.",
      "Product taxability and exemption certificates remain rule-specific inputs.",
      "Property-tax benefits still require parcel, bill, assessor, or counterfactual taxable-value inputs.",
      "Income/franchise/gross-receipts credits still require taxpayer tax-return or tax-liability inputs."
    ],
    highValueImportQueues: {
      sourceRegistryAdditions: counts.sourceRegistryAdditionCount,
      sourceImportCandidates: counts.sourcesNeedingCodexStructuredImportCount,
      salesUseStatePlans: counts.stateSalesUsePlanCount,
      supportedRuleCandidates: counts.trackedRuleCount,
      verifiedLocalRules: counts.verifiedLocalRuleCount,
      fallbackTriageRules: counts.unsupportedTaxTriageRuleCount
    },
    gptFollowupQueues: {
      sourcesNeedingFurtherResearch: counts.sourcesNeedingFurtherGPTResearchCount,
      ambiguousSalesUseRules: counts.salesUseTaxAmbiguousSkipCount,
      stateCreditSkips: counts.stateTaxCreditSkipCount,
      propertyTaxSkips: counts.propertyTaxStatewideSkipCount,
      localFollowups: counts.localRulesNeedingFollowupCount,
      localSkips: counts.localRulesToSkipForNowCount,
      businessTaxSkips: counts.businessTaxSkipCount
    }
  };
}

function updateRegistrySeed(registrySeed, artifact) {
  const artifactRelativePath = path.relative(repoRoot, artifactPath);
  registrySeed.sourceArtifacts = uniqueStrings([
    ...(registrySeed.sourceArtifacts || []),
    artifactRelativePath
  ]);
  registrySeed.latestComprehensiveResearchArtifact = artifactRelativePath;
  registrySeed.latestComprehensiveResearchImportedAt = now;
  registrySeed.latestComprehensiveResearchCounts = artifact.counts;
  return {
    artifactRelativePath,
    sourceArtifactCount: registrySeed.sourceArtifacts.length
  };
}

function buildReport({ artifact, registryUpdate }) {
  const counts = artifact.counts;
  const followups = artifact.importReadiness.gptFollowupQueues;
  return [
    "# Comprehensive Tax Model Research Intake Report",
    "",
    `Generated at: ${now}`,
    "",
    "## Parsed Outputs",
    "",
    `- GPT Pro outputs parsed: ${counts.parsedOutputCount}`,
    `- Outputs with trailing citation footnotes: ${counts.filesWithTrailingCitations}`,
    `- Preserved trailing citation references: ${counts.trailingCitationCount}`,
    `- Validation warnings: ${artifact.validationWarnings.length}`,
    "",
    "## Research Counts",
    "",
    `- Source registry additions: ${counts.sourceRegistryAdditionCount}`,
    `- Source import candidates for Codex: ${counts.sourcesNeedingCodexStructuredImportCount}`,
    `- State/DC sales-use tax rate plans: ${counts.stateSalesUsePlanCount}`,
    `- Sales/use exemption and taxability rules: ${counts.salesUseTaxExemptionRuleCount}`,
    `- State credit/exemption/deduction rules: ${counts.stateTaxCreditRuleCount}`,
    `- Statewide property-tax rules: ${counts.propertyTaxStatewideRuleCount}`,
    `- Verified local-option rules: ${counts.verifiedLocalRuleCount}`,
    `- State business-tax model rows: ${counts.stateBusinessTaxModelCount}`,
    `- Major local business-tax model rows: ${counts.majorLocalBusinessTaxModelCount}`,
    `- Exotic tax workflow patterns: ${counts.exoticWorkflowPatternCount}`,
    `- Unsupported fallback triage rules: ${counts.unsupportedTaxTriageRuleCount}`,
    `- Import validation rules: ${counts.importValidationRuleCount}`,
    "",
    "## Runtime Readiness",
    "",
    `- Artifact: \`${path.relative(repoRoot, artifactPath)}\``,
    `- Registry seed updated: \`${path.relative(repoRoot, registrySeedPath)}\``,
    `- Registry source artifact count: ${registryUpdate.sourceArtifactCount}`,
    "",
    "This research is not live runtime tax data by itself. It gives us source-backed candidates, schemas, and validation rules for the next implementation pass.",
    "",
    "Ready for Codex implementation:",
    "",
    ...artifact.importReadiness.readyForCodexImplementation.map((item) => `- ${item}`),
    "",
    "Not runtime-ready yet:",
    "",
    ...artifact.importReadiness.notYetRuntimeReady.map((item) => `- ${item}`),
    "",
    "## Follow-Up Queues",
    "",
    `- Sources needing further research: ${followups.sourcesNeedingFurtherResearch}`,
    `- Ambiguous sales/use rules: ${followups.ambiguousSalesUseRules}`,
    `- State credit skips: ${followups.stateCreditSkips}`,
    `- Property-tax skips: ${followups.propertyTaxSkips}`,
    `- Local followups: ${followups.localFollowups}`,
    `- Local skips: ${followups.localSkips}`,
    `- Business-tax skips: ${followups.businessTaxSkips}`,
    "",
    "## Warnings",
    "",
    ...(artifact.validationWarnings.length > 0 ? artifact.validationWarnings.map((warning) => `- ${warning}`) : ["- None"]),
    ""
  ].join("\n");
}

function normalizeUrlsDeep(value) {
  if (Array.isArray(value)) return value.map(normalizeUrlsDeep);
  if (!value || typeof value !== "object") return typeof value === "string" ? normalizeMarkdownUrl(value) : value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => {
    if (key.toLowerCase().includes("url") && Array.isArray(item)) return [key, normalizeUrls(item)];
    if (key.toLowerCase().includes("url") && typeof item === "string") return [key, normalizeMarkdownUrl(item)];
    return [key, normalizeUrlsDeep(item)];
  }));
}

function normalizeUrls(urls) {
  return uniqueStrings((urls || []).map(normalizeMarkdownUrl));
}

function normalizeMarkdownUrl(value) {
  const text = String(value || "").trim();
  const directMarkdown = text.match(/^\[(https?:\/\/[^\]]+)\]\((https?:\/\/[^)]+)\)$/i);
  if (directMarkdown) return directMarkdown[2];
  const labelMarkdown = text.match(/^\[[^\]]+\]\((https?:\/\/[^)]+)\)$/i);
  if (labelMarkdown) return labelMarkdown[1];
  return text;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function uniqueStrings(values) {
  return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
}

function sum(values, valueFn) {
  return (values || []).reduce((total, value) => total + Number(valueFn(value) || 0), 0);
}
