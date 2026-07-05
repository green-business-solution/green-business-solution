import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultDate = "2026-07-05";

const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;
const repairsPath = path.resolve(
  options.repairsPath || path.join(repoRoot, "data", `tax_gap_repairs_gpt_pro_${date}.json`)
);
const testCasesPath = path.resolve(
  options.testCasesPath || path.join(repoRoot, "public", "sample_matching_test_cases.json")
);
const localTaxWorkflowPath = path.resolve(
  options.localTaxWorkflowPath || path.join(repoRoot, "data", "tax_local_workflow_rules.json")
);
const taxGeographyRulesPath = path.resolve(
  options.taxGeographyRulesPath || path.join(repoRoot, "data", "tax_geography_rules.json")
);
const taxGapRuntimeRulesPath = path.resolve(
  options.taxGapRuntimeRulesPath || path.join(repoRoot, "data", `tax_gap_runtime_rules_${date}.json`)
);
const outputPath = path.resolve(
  options.outputPath || path.join(repoRoot, "data", `tax_gap_runtime_readiness_audit_${date}.json`)
);
const reportPath = path.resolve(
  options.reportPath || path.join(repoRoot, "data", `tax_gap_runtime_readiness_audit_${date}.md`)
);

if (options.help) {
  printHelp();
  process.exit(0);
}

const repairsArtifact = readJson(repairsPath);
const testCasePayload = readJson(testCasesPath);
const localTaxPayload = readJson(localTaxWorkflowPath);
const taxGeographyPayload = readJson(taxGeographyRulesPath);
const taxGapRuntimeRulesPayload = fs.existsSync(taxGapRuntimeRulesPath) ? readJson(taxGapRuntimeRulesPath) : { rules: [] };

const testProfiles = (testCasePayload.testCases || []).map(normalizeTestProfile);
const existingLocalWorkflowModelMethods = new Set(
  (localTaxPayload.workflows || []).flatMap((workflow) => (workflow.calculationModels || []).map((model) => model.method).filter(Boolean))
);
const existingTaxGeographyTaxTypes = new Set((taxGeographyPayload.rules || []).map((rule) => rule.taxType).filter(Boolean));
const taxGapRuntimeRulesBySourceId = new Map(
  (taxGapRuntimeRulesPayload.rules || []).map((rule) => [rule.sourceSkippedRecordId, rule])
);

const candidateRows = (repairsArtifact.promotedTaxRuleRecords || []).map(auditCandidate);
const nonPromotedRows = [
  ...(repairsArtifact.suppressionRecords || []).map((row) => ({
    kind: "suppression",
    id: row.skippedRecordId,
    status: row.recommendedRuntimeStatus,
    action: "suppressed_or_archived",
    reason: row.archiveReason || row.reasoningNotes || "Suppressed by tax gap repair output."
  })),
  ...(repairsArtifact.inputGatedRecords || []).map((row) => ({
    kind: "input_gate",
    id: row.skippedRecordId,
    status: row.recommendedRuntimeStatus,
    action: "keep_program_document_gate",
    reason: "Source-backed workflow remains gated by approved program documents before any user-facing calculation."
  })),
  ...(repairsArtifact.routedRecords || []).map((row) => ({
    kind: "routed",
    id: row.skippedRecordId,
    status: row.recommendedRuntimeStatus,
    action: "route_outside_retrofit_tax_runtime",
    reason: row.notes || row.reasoningNotes || "Routed outside this tax runtime."
  }))
];

const audit = {
  schemaVersion: "retrofi_tax_gap_runtime_readiness_audit.v1",
  generatedAt: new Date().toISOString(),
  sourceArtifacts: {
    repairs: path.relative(repoRoot, repairsPath),
    testCases: path.relative(repoRoot, testCasesPath),
    localTaxWorkflows: path.relative(repoRoot, localTaxWorkflowPath),
    taxGeographyRules: path.relative(repoRoot, taxGeographyRulesPath),
    taxGapRuntimeRules: fs.existsSync(taxGapRuntimeRulesPath) ? path.relative(repoRoot, taxGapRuntimeRulesPath) : null
  },
  counts: buildCounts(candidateRows, nonPromotedRows),
  runtimeCapabilities: {
    existingLocalWorkflowModelMethods: [...existingLocalWorkflowModelMethods].sort(),
    existingTaxGeographyTaxTypes: [...existingTaxGeographyTaxTypes].sort(),
    compiledTaxGapRuntimeRuleCount: taxGapRuntimeRulesBySourceId.size,
    notes: [
      "The current runtime supports explicit local-tax workflow calculationModels and geography-derived input defaults.",
      "The current runtime does not execute free-form GPT Pro formulaExpression strings.",
      "Compiled tax gap runtime rules provide structured local workflow rows or generic gated evaluators for selected sales/use exemption and state-credit models.",
      "Tax gap candidates must still have required taxpayer, tax-document, filing, or program-document inputs before customer-facing inclusion."
    ]
  },
  candidateRows,
  nonPromotedRows,
  testProfileCoverageSummary: buildTestProfileCoverageSummary(candidateRows)
};

if (!options.dryRun) {
  writeJson(outputPath, audit);
  fs.writeFileSync(reportPath, buildReport(audit), "utf8");
}

console.log("Tax gap runtime readiness audit complete.");
console.log(`Promoted candidates audited: ${audit.counts.promotedCandidateCount}`);
console.log(`Candidates with test profile coverage: ${audit.counts.candidatesWithAnyTestProfileCoverage}`);
console.log(`Candidates with complete matched test inputs: ${audit.counts.candidatesWithCompleteMatchedTestInputs}`);
console.log(`Ready for direct customer-facing calculation now: ${audit.counts.readyForDirectCustomerFacingCalculationNow}`);
console.log(`Next action counts: ${JSON.stringify(audit.counts.nextActionCounts)}`);
console.log(`Output: ${path.relative(repoRoot, outputPath)}`);
console.log(`Report: ${path.relative(repoRoot, reportPath)}`);

function auditCandidate(candidate) {
  const runtimeRule = taxGapRuntimeRulesBySourceId.get(candidate.sourceSkippedRecordId) || null;
  const targetGeography = parseJurisdiction(candidate.jurisdictionText);
  const matchingTestProfiles = testProfiles
    .map((profile) => {
      const geographyMatch = geographyMatchScore(targetGeography, profile.geography);
      if (geographyMatch.score < 0) return null;
      const inputCoverage = evaluateInputCoverage(candidate, profile, runtimeRule);
      return {
        sampleUserId: profile.sampleUserId,
        sampleName: profile.sampleName,
        geography: profile.geography,
        geographyMatch,
        inputCoverage,
        usableForRuntimeFixture:
          geographyMatch.status !== "state_only_for_local_rule" &&
          inputCoverage.coverageStatus !== "no_required_inputs_present"
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.geographyMatch.score - a.geographyMatch.score || b.inputCoverage.satisfiedCount - a.inputCoverage.satisfiedCount);

  const formulaSupport = classifyFormulaSupport(candidate, runtimeRule);
  const runtimeSupport = classifyRuntimeSupport(candidate, formulaSupport, runtimeRule);
  const bestProfile = matchingTestProfiles[0] || null;
  const nextAction = decideNextAction({ candidate, targetGeography, matchingTestProfiles, formulaSupport, runtimeSupport, runtimeRule });

  return {
    taxRuleId: candidate.taxRuleId,
    sourceSkippedRecordId: candidate.sourceSkippedRecordId,
    modelKind: candidate.modelKind,
    jurisdictionText: candidate.jurisdictionText,
    parsedJurisdiction: targetGeography,
    runtimeStatusWhenInputsMissing: candidate.runtimeStatusWhenInputsMissing,
    sourceConfidence: candidate.sourceConfidence,
    formulaSupport,
    runtimeSupport,
    compiledRuntimeRule: runtimeRule
      ? {
          runtimeSupportStatus: runtimeRule.runtimeSupportStatus,
          localWorkflowId: runtimeRule.localWorkflowId || null,
          calculationModelMethod: runtimeRule.calculationModel?.method || null,
          canonicalInputCount: (runtimeRule.canonicalInputRequirements || []).length
        }
      : null,
    testProfileCoverage: {
      matchingProfileCount: matchingTestProfiles.length,
      fullySatisfiedProfileCount: matchingTestProfiles.filter((profile) => profile.inputCoverage.coverageStatus === "all_required_inputs_present").length,
      bestProfile,
      matchingProfiles: matchingTestProfiles.slice(0, 12)
    },
    nextAction,
    customerFacingPolicy: {
      includeInUserFacingTotalNow: nextAction.customerFacingReady === true,
      reason: nextAction.customerFacingReady === true
        ? "A structured runtime model exists and a matching profile supplies all mandatory pre-opportunity tax inputs."
        : "Tax gap rule still needs a structured runtime model or mandatory taxpayer/tax-document inputs before customer-facing inclusion."
    }
  };
}

function classifyFormulaSupport(candidate, runtimeRule = null) {
  if (
    runtimeRule &&
    ["compiled_to_local_tax_workflow", "generic_runtime_model_supported_gated"].includes(runtimeRule.runtimeSupportStatus)
  ) {
    return {
      status: "source_backed_formula_compiled_to_runtime_model",
      currentRuntimeExecutable: true,
      reason: "The source-backed formula has been compiled into structured local workflow rows or a generic gated tax-gap runtime model."
    };
  }

  const expression = String(candidate.formulaExpression || "").trim();
  const formulaText = String(candidate.formulaText || "").trim();
  const lower = `${formulaText} ${expression}`.toLowerCase();
  const hasFormula = Boolean(formulaText || expression);
  const hasUnsupportedSyntax =
    /sum_for_each|employeeBandRate|if\s+|where\s+|subject to|official_|byrating|bytaxyear|agreementamountorformula|tax_line|current-year|route|unless/i.test(expression);

  if (!hasFormula) {
    return {
      status: "formula_missing",
      currentRuntimeExecutable: false,
      reason: "The promoted candidate does not include a source-backed formula text or expression."
    };
  }

  if (
    candidate.modelKind === "local_business_license_or_receipts_tax" ||
    candidate.modelKind === "gross_receipts_or_bo_rate_preference"
  ) {
    return {
      status: hasUnsupportedSyntax ? "source_backed_formula_needs_structured_model_rows" : "source_backed_formula_needs_compiler_mapping",
      currentRuntimeExecutable: false,
      reason: "Business/gross-receipts tax formulas must be converted into localTaxWorkflow calculationModels or equivalent structured rows before runtime execution."
    };
  }

  if (candidate.modelKind === "sales_use_tax_exemption") {
    return {
      status: "source_backed_exemption_needs_taxability_importer",
      currentRuntimeExecutable: false,
      reason: "The current sales-tax runtime calculates rates from explicit rule rows but does not yet execute product taxability/exemption formulas from tax gap records."
    };
  }

  if (candidate.modelKind === "state_income_or_franchise_tax_credit") {
    return {
      status: "source_backed_credit_needs_tax_return_runtime_model",
      currentRuntimeExecutable: false,
      reason: "State credit rules require tax-return liability, certificate, carryforward, or filing inputs and are not handled by a generic tax-credit evaluator yet."
    };
  }

  if (["property_tax_credit", "property_tax_exemption", "property_tax_special_valuation"].includes(candidate.modelKind)) {
    return {
      status: "source_backed_property_tax_formula_needs_bill_or_assessor_adapter",
      currentRuntimeExecutable: false,
      reason: "Property-tax rules require bill-line allocation, assessor-confirmed values, PILOT status, or local tax-rate rows before customer-facing calculation."
    };
  }

  if (candidate.modelKind === "tax_abatement_or_pilot") {
    return {
      status: "source_backed_program_document_workflow",
      currentRuntimeExecutable: false,
      reason: "Abatement/PILOT rules are project-document workflows and must stay gated until approved agreements or certificates are present."
    };
  }

  return {
    status: lower.includes("customer-facing savings remain 0") ? "source_backed_but_policy_gated" : "source_backed_formula_needs_runtime_mapping",
    currentRuntimeExecutable: false,
    reason: "The source formula exists but has not been mapped to a current runtime evaluator."
  };
}

function classifyRuntimeSupport(candidate, formulaSupport, runtimeRule = null) {
  if (runtimeRule?.runtimeSupportStatus) {
    return {
      status: runtimeRule.runtimeSupportStatus,
      currentRuntimeSurface: runtimeRule.localWorkflowId ? "localTaxWorkflows" : "taxGapRuntimeRules",
      currentRuntimeExecutable:
        ["compiled_to_local_tax_workflow", "generic_runtime_model_supported_gated"].includes(runtimeRule.runtimeSupportStatus) &&
        Boolean(runtimeRule.localWorkflowId || runtimeRule.calculationModel),
      reason:
        runtimeRule.runtimeSupportStatus === "compiled_to_local_tax_workflow"
          ? "This candidate has been compiled into executable localTaxWorkflow calculationModels, but required tax/user inputs still gate customer-facing use."
          : runtimeRule.runtimeSupportStatus === "generic_runtime_model_supported_gated"
            ? "This candidate has a generic gated tax-gap runtime evaluator, but required tax/user inputs still gate customer-facing use."
            : runtimeRule.runtimeSupportStatus === "compiled_to_gated_local_workflow"
              ? "This candidate has been compiled into a local workflow gate, but formula execution still requires a tax-return/accountant model import."
              : "This candidate has a compiled runtime-facing rule record, but it remains gated by program documents, tax bills, or assessor/tax-return inputs."
    };
  }

  const modelKind = candidate.modelKind;
  if (modelKind === "local_business_license_or_receipts_tax") {
    return {
      status: "supported_after_local_workflow_import",
      currentRuntimeSurface: "localTaxWorkflows",
      currentRuntimeExecutable: false,
      reason: "The local-tax runtime can calculate structured business-tax workflow methods, but this candidate has not been compiled into workflow calculationModels."
    };
  }
  if (modelKind === "gross_receipts_or_bo_rate_preference") {
    return {
      status: "partially_supported_after_business_tax_import",
      currentRuntimeSurface: existingTaxGeographyTaxTypes.has("business_and_occupation_tax") ? "taxGeographyRules/localTaxWorkflows" : "future_business_tax_runtime",
      currentRuntimeExecutable: false,
      reason: "The repo has some B&O/local gross-receipts workflow support, but this candidate needs jurisdiction-specific constants and tax-return inputs."
    };
  }
  if (["property_tax_credit", "property_tax_exemption", "property_tax_special_valuation", "tax_abatement_or_pilot"].includes(modelKind)) {
    return {
      status: "supported_as_gated_workflow_after_import",
      currentRuntimeSurface: "localTaxWorkflows",
      currentRuntimeExecutable: false,
      reason: "The local-tax runtime can represent bill/document/assessor gates, but not calculate these candidates until structured workflow rows and required documents are present."
    };
  }
  if (modelKind === "sales_use_tax_exemption") {
    return {
      status: "needs_sales_use_exemption_importer",
      currentRuntimeSurface: "taxGeographyRules",
      currentRuntimeExecutable: false,
      reason: "Sales-tax rate calculation exists, but product/service taxability and exemption certificates need a separate importer/evaluator."
    };
  }
  if (modelKind === "state_income_or_franchise_tax_credit") {
    return {
      status: "needs_tax_credit_runtime_model",
      currentRuntimeSurface: "v2 incentive package tax effects",
      currentRuntimeExecutable: false,
      reason: "Current tax package effects are opportunity-specific; these candidates need source-backed v2 tax package effects or a generic state-credit evaluator."
    };
  }
  return {
    status: "unsupported_tax_model",
    currentRuntimeSurface: null,
    currentRuntimeExecutable: formulaSupport.currentRuntimeExecutable,
    reason: "No current runtime surface is mapped for this candidate model kind."
  };
}

function decideNextAction({ candidate, matchingTestProfiles, formulaSupport, runtimeSupport, runtimeRule }) {
  const completeProfileCount = matchingTestProfiles.filter((profile) => profile.inputCoverage.coverageStatus === "all_required_inputs_present").length;
  const hasExecutableCompiledRuntime =
    runtimeRule && ["compiled_to_local_tax_workflow", "generic_runtime_model_supported_gated"].includes(runtimeRule.runtimeSupportStatus);

  if (!matchingTestProfiles.length) {
    return {
      action: "create_or_update_test_profile_for_jurisdiction",
      reason: "No current sample test profile matches the candidate jurisdiction.",
      blocksCustomerFacingRuntime: true
    };
  }

  if (hasExecutableCompiledRuntime && completeProfileCount > 0) {
    return {
      action: "ready_customer_facing_after_mandatory_intake",
      reason: "A compiled runtime model exists and at least one matching profile has all audited mandatory tax inputs.",
      blocksCustomerFacingRuntime: false,
      customerFacingReady: true
    };
  }

  if (hasExecutableCompiledRuntime) {
    return {
      action: "add_test_profile_tax_inputs_or_keep_gate",
      reason: "A compiled runtime model exists, but no matching profile currently includes all required tax/user inputs.",
      blocksCustomerFacingRuntime: true
    };
  }

  if (runtimeRule?.runtimeSupportStatus === "compiled_to_gated_local_workflow") {
    return {
      action: "add_tax_return_model_or_keep_gate",
      reason: "The workflow is routable, but formula execution still needs a structured tax-return model or complete filing document inputs.",
      blocksCustomerFacingRuntime: true
    };
  }

  if (runtimeSupport.status === "needs_tax_credit_runtime_model" || runtimeSupport.status === "needs_sales_use_exemption_importer") {
    return {
      action: runtimeSupport.status,
      reason: runtimeSupport.reason,
      blocksCustomerFacingRuntime: true
    };
  }

  if (formulaSupport.status.includes("needs_structured") || formulaSupport.status.includes("needs_compiler")) {
    return {
      action: "compile_candidate_into_structured_runtime_rows",
      reason: formulaSupport.reason,
      blocksCustomerFacingRuntime: true
    };
  }

  if (matchingTestProfiles.every((profile) => profile.inputCoverage.coverageStatus !== "all_required_inputs_present")) {
    return {
      action: "add_test_profile_tax_inputs_or_keep_gate",
      reason: "At least one test profile matches geography, but none includes all required runtime inputs.",
      blocksCustomerFacingRuntime: true
    };
  }

  return {
    action: "import_as_internal_only_gated_rule",
    reason: "The rule has source-backed support and at least one test profile has all audited inputs, but customer-facing totals still require runtime importer validation.",
    blocksCustomerFacingRuntime: true
  };
}

function evaluateInputCoverage(candidate, profile, runtimeRule = null) {
  const runtimeInputRequirements = (runtimeRule?.canonicalInputRequirements || []).filter(
    (input) => input.missingSeverity !== "optional"
  );
  const requiredInputs = runtimeInputRequirements.length
    ? runtimeInputRequirements.map((input) => ({
        inputText: input.label || input.inputKey,
        candidateKeys: [input.inputKey].filter(Boolean)
      }))
    : (candidate.requiredRuntimeInputs || []).map((inputText) => ({
        inputText,
        candidateKeys: candidateInputKeys(inputText)
      }));
  const checks = requiredInputs.map((input) => {
    const candidateKeys = input.candidateKeys;
    const presentKeys = candidateKeys.filter((key) => profile.answerKeys.has(key));
    return {
      inputText: input.inputText,
      candidateKeys,
      present: presentKeys.length > 0,
      presentKeys
    };
  });
  const satisfiedCount = checks.filter((check) => check.present).length;
  const coverageStatus =
    requiredInputs.length === 0
      ? "no_required_inputs_declared"
      : satisfiedCount === requiredInputs.length
        ? "all_required_inputs_present"
        : satisfiedCount === 0
          ? "no_required_inputs_present"
          : "partial_required_inputs_present";
  return {
    requiredInputCount: requiredInputs.length,
    satisfiedCount,
    missingCount: Math.max(0, requiredInputs.length - satisfiedCount),
    coverageStatus,
    missingInputs: checks.filter((check) => !check.present).map((check) => ({
      inputText: check.inputText,
      candidateKeys: check.candidateKeys
    })),
    satisfiedInputs: checks.filter((check) => check.present)
  };
}

function candidateInputKeys(inputText) {
  const text = normalizeText(inputText);
  const keys = new Set();
  const add = (...values) => values.filter(Boolean).forEach((value) => keys.add(value));

  if (text.includes("state")) add("state_code", "site_state_code");
  if (text.includes("city") || text.includes("municipal") || text.includes("locality") || text.includes("local")) add("municipality", "city", "site_place_name");
  if (text.includes("address") || text.includes("location") || text.includes("parcel")) add("site_address", "assessor_parcel_number", "property_index_number");
  if (text.includes("employee")) add("employee_count", "average_employee_count", "local_employee_count");
  if (text.includes("gross receipt") || text.includes("gross income")) add("annual_gross_receipts_cents", "taxable_gross_receipts_cents", "gross_receipts_cents", "annual_gross_sales_cents");
  if (text.includes("taxable sales") || text.includes("sales price") || text.includes("purchase amount")) add("annual_taxable_sales_cents", "taxable_sales_cents", "taxable_retail_sales_cents", "sales_use_tax_due_cents");
  if (text.includes("tax return") || text.includes("liability") || text.includes("income tax") || text.includes("cat")) add("state_income_or_franchise_tax_due_cents", "state_taxable_income_cents", "business_excise_tax_return_present", "oh_sitused_gross_receipts_cents");
  if (text.includes("property tax") || text.includes("tax bill") || text.includes("county tax") || text.includes("tax amount") || text.includes("tax liability")) add("annual_property_tax_cents", "annual_property_tax_due_cents", "annual_real_property_tax_due_cents", "local_real_property_tax_cents", "business_personal_property_tax_cents", "personal_property_tax_cents");
  if (text.includes("assessed") || text.includes("assessor") || text.includes("valuation") || text.includes("taxable value")) add("total_assessed_value_cents", "taxable_assessed_value_cents", "assessor_parcel_number", "local_assessor_confirmation", "estimated_assessed_value", "taxable_value");
  if (text.includes("square foot")) add("building_square_feet", "building_area_square_feet", "site_square_footage", "leased_square_feet");
  if (text.includes("unit") || text.includes("residential units")) add("accommodation_unit_count", "unit_count");
  if (text.includes("capacity") || text.includes("kw") || text.includes("megawatt") || text.includes("nameplate")) add("ac_kw_capacity", "ac_nameplate_capacity_kw");
  if (text.includes("filing") || text.includes("certificate") || text.includes("application")) add("filing_confirmation", "exemption_certificate_effective_date", "property_tax_account_status", "sales_use_tax_exempt_status", "sales_use_tax_exemption_status");
  if (text.includes("program") || text.includes("approval") || text.includes("agreement") || text.includes("designation") || text.includes("zone")) add("approved_rerz_designation", "approved_zone_term_years", "interconnection_and_program_documents", "state_program_match_status");
  if (text.includes("sales/use") || text.includes("sales and use") || text.includes("exemption")) add("sales_use_tax_exempt_status", "sales_use_tax_exemption_status", "sales_use_tax_account_present", "sales_tax_remitted_cents");
  if (text.includes("resource type") || text.includes("technology") || text.includes("system type")) add("renewable_resource_type", "building_type", "system_use_and_tax_classification");
  if (text.includes("ownership") || text.includes("owner")) add("ownership_status", "owner_name", "property_owner_name");
  if (text.includes("classification") || text.includes("business activity") || text.includes("activity")) add("local_business_tax_class", "business_tax_classification", "wa_bo_classification", "primary_business_activity", "manufacturing_activity_description");
  if (text.includes("tax period") || text.includes("tax year") || text.includes("transaction date") || text.includes("placed-in-service") || text.includes("installation date")) add("tax_year", "program_year", "interconnection_agreement_date");

  if (!keys.size) add(normalizeInputKey(inputText));
  return [...keys].sort();
}

function normalizeTestProfile(testCase) {
  const geography = inferProfileGeography(testCase);
  const answerEntries = gatherProfileAnswers(testCase);
  addIfMissing(answerEntries, "state_code", geography.state, "derived_from_profile_address");
  addIfMissing(answerEntries, "site_state_code", geography.state, "derived_from_profile_address");
  addIfMissing(answerEntries, "city", geography.city, "derived_from_profile_address");
  addIfMissing(answerEntries, "municipality", geography.city, "derived_from_profile_address");
  addIfMissing(answerEntries, "site_place_name", geography.city, "derived_from_profile_address");
  addIfMissing(answerEntries, "site_address", geography.rawAddress, "derived_from_profile_address");
  addIfMissing(answerEntries, "site_postal_code", geography.postalCode, "derived_from_profile_address");
  addIfMissing(answerEntries, "local_business_tax_class", inferLocalBusinessTaxClass(testCase.normalizedProfile?.site?.buildingTypes || []), "audit_inferred");
  addIfMissing(answerEntries, "employee_count", inferEmployeeCount(testCase), "audit_inferred");
  addAlias(answerEntries, "annual_taxable_sales_cents", "gross_receipts_cents");
  addAlias(answerEntries, "taxable_gross_receipts_cents", "gross_receipts_cents");
  addAlias(answerEntries, "annual_property_tax_cents", "annual_property_tax_due_cents");
  addAlias(answerEntries, "annual_real_property_tax_due_cents", "annual_property_tax_due_cents");

  return {
    sampleUserId: testCase.sampleUserId,
    sampleName: testCase.name || testCase.sourceForm?.companyName || testCase.sampleUserId,
    geography,
    answerKeys: new Set(Object.keys(answerEntries)),
    answerEntries
  };
}

function inferProfileGeography(testCase) {
  const site = testCase.normalizedProfile?.site || {};
  const rawAddress = testCase.sourceForm?.siteAddress || site.addressStructured?.raw || "";
  const addressParts = parseAddress(rawAddress);
  return {
    country: "US",
    state: site.geo?.stateCode || site.addressStructured?.stateCode || addressParts.state || null,
    city: site.geo?.placeName || site.addressStructured?.city || addressParts.city || null,
    countyFips: site.geo?.countyFips || null,
    countyName: site.geo?.countyName || null,
    placeGeoid: site.geo?.placeGeoid || null,
    postalCode: site.geo?.zip5 || site.addressStructured?.zip5 || addressParts.postalCode || null,
    rawAddress
  };
}

function parseAddress(rawAddress) {
  const text = String(rawAddress || "");
  const cityStateZip = text.match(/,\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})(?:-\d{4})?(?:,|$)/);
  if (cityStateZip) return { city: cityStateZip[1].trim(), state: cityStateZip[2], postalCode: cityStateZip[3] };
  const looseCityStateZip = text.match(/,\s*([^,]+?)\s+([A-Z]{2})\s+(\d{5})(?:-\d{4})?(?:,|$)/);
  if (looseCityStateZip) return { city: looseCityStateZip[1].trim(), state: looseCityStateZip[2], postalCode: looseCityStateZip[3] };
  return { city: null, state: null, postalCode: null };
}

function gatherProfileAnswers(testCase) {
  const entries = {};
  for (const group of ["taxProfileFacts", "taxExtractedValues", "taxOpportunitySpecificInputs"]) {
    for (const row of [
      ...(Array.isArray(testCase[group]) ? testCase[group] : []),
      ...(Array.isArray(testCase.sourceForm?.[group]) ? testCase.sourceForm[group] : []),
      ...(Array.isArray(testCase.normalizedProfile?.tax?.[group]) ? testCase.normalizedProfile.tax[group] : [])
    ]) {
      const key = row.inputKey || row.input_key || row.fieldId || row.field_id;
      if (!key || row.value === undefined || row.value === null || row.value === "") continue;
      entries[key] = { value: row.value, source: row.sourceStrategy || row.sourceType || "test_profile" };
    }
  }
  return entries;
}

function parseJurisdiction(jurisdictionText) {
  const text = String(jurisdictionText || "").trim();
  const stateFromName = stateCodeForText(text);
  const state = stateFromName || (text.match(/\b[A-Z]{2}\b/) || [])[0] || null;
  const countyMatch = text.match(/\b([A-Za-z .'-]+?)\s+County\b/);
  const cityMatch = text.match(/\bCity of\s+([A-Za-z .'-]+?)(?:,|$)/i);
  const cityStateMatch = text.match(/^([A-Za-z .'-]+),\s*(?:California|CA|Maryland|MD|Virginia|VA|Ohio|OH|Michigan|MI|New York|NY|Connecticut|CT|Montana|MT|New Mexico|NM|Iowa|IA|Nevada|NV|Alabama|AL|Arizona|AZ|Colorado|CO)\b/i);
  return {
    raw: text,
    state,
    countyName: countyMatch ? `${countyMatch[1].trim()} County` : null,
    city: countyMatch ? null : cityMatch?.[1]?.trim() || cityStateMatch?.[1]?.trim() || null,
    scope: jurisdictionScope(text, state)
  };
}

function jurisdictionScope(text, state) {
  const lower = text.toLowerCase();
  if (lower.includes("county")) return "county";
  if (lower.includes("city of") || lower.includes("city") || lower.includes("municipalit")) return "local";
  if (lower.includes("localit")) return "local_family";
  if (state && (text === state || text.length <= 2 || stateCodeForText(text))) return "state";
  return "broad_or_unknown";
}

function geographyMatchScore(target, profileGeography) {
  if (target.state && profileGeography.state !== target.state) return { status: "state_mismatch", score: -1 };
  if (target.city) {
    const cityMatches = normalizeText(profileGeography.city) === normalizeText(target.city);
    return cityMatches ? { status: "city_match", score: 30 } : { status: "city_mismatch", score: -1 };
  }
  if (target.countyName) {
    const countyMatches = normalizeText(profileGeography.countyName) === normalizeText(target.countyName);
    if (countyMatches) return { status: "county_match", score: 20 };
    if (!profileGeography.countyName) return { status: "state_only_for_county_rule", score: 8 };
    return { status: "county_mismatch", score: -1 };
  }
  if (target.scope === "local_family") return { status: "state_only_for_local_rule", score: 6 };
  if (target.state && profileGeography.state === target.state) return { status: "state_match", score: 10 };
  return { status: "broad_match", score: 1 };
}

function buildCounts(candidateRows, nonPromotedRows) {
  return {
    promotedCandidateCount: candidateRows.length,
    nonPromotedDecisionCount: nonPromotedRows.length,
    candidateCountByModelKind: countBy(candidateRows, (row) => row.modelKind),
    candidateCountByRuntimeSupport: countBy(candidateRows, (row) => row.runtimeSupport.status),
    candidateCountByFormulaSupport: countBy(candidateRows, (row) => row.formulaSupport.status),
    candidateCountByNextAction: countBy(candidateRows, (row) => row.nextAction.action),
    nextActionCounts: countBy(candidateRows, (row) => row.nextAction.action),
    candidatesWithAnyTestProfileCoverage: candidateRows.filter((row) => row.testProfileCoverage.matchingProfileCount > 0).length,
    candidatesWithCompleteMatchedTestInputs: candidateRows.filter((row) => row.testProfileCoverage.fullySatisfiedProfileCount > 0).length,
    readyForDirectCustomerFacingCalculationNow: candidateRows.filter((row) => row.customerFacingPolicy.includeInUserFacingTotalNow).length,
    matchedTestProfileCount: new Set(candidateRows.flatMap((row) => row.testProfileCoverage.matchingProfiles.map((profile) => profile.sampleUserId))).size
  };
}

function buildTestProfileCoverageSummary(candidateRows) {
  const rowsByProfile = new Map();
  for (const candidate of candidateRows) {
    for (const profile of candidate.testProfileCoverage.matchingProfiles) {
      const row = rowsByProfile.get(profile.sampleUserId) || {
        sampleUserId: profile.sampleUserId,
        sampleName: profile.sampleName,
        matchedCandidateCount: 0,
        fullySatisfiedCandidateCount: 0,
        candidateIds: []
      };
      row.matchedCandidateCount += 1;
      if (profile.inputCoverage.coverageStatus === "all_required_inputs_present") row.fullySatisfiedCandidateCount += 1;
      row.candidateIds.push(candidate.sourceSkippedRecordId);
      rowsByProfile.set(profile.sampleUserId, row);
    }
  }
  return [...rowsByProfile.values()].sort((a, b) => b.matchedCandidateCount - a.matchedCandidateCount || a.sampleUserId.localeCompare(b.sampleUserId));
}

function buildReport(audit) {
  const lines = [
    "# Tax Gap Runtime Readiness Audit",
    "",
    `Generated at: ${audit.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Promoted tax candidates audited: ${audit.counts.promotedCandidateCount}`,
    `- Candidates with any matching test profile: ${audit.counts.candidatesWithAnyTestProfileCoverage}`,
    `- Candidates with complete matched test inputs: ${audit.counts.candidatesWithCompleteMatchedTestInputs}`,
    `- Ready for direct customer-facing calculation now: ${audit.counts.readyForDirectCustomerFacingCalculationNow}`,
    `- Matched test profiles: ${audit.counts.matchedTestProfileCount}`,
    "",
    "## Next Actions",
    "",
    tableFromCounts(audit.counts.nextActionCounts),
    "",
    "## Runtime Support",
    "",
    tableFromCounts(audit.counts.candidateCountByRuntimeSupport),
    "",
    "## Formula Support",
    "",
    tableFromCounts(audit.counts.candidateCountByFormulaSupport),
    "",
    "## Candidate Readiness",
    "",
    table(
      ["Candidate", "Model", "Jurisdiction", "Runtime Support", "Runtime Gate", "Test Profiles", "Full Inputs", "Next Action"],
      audit.candidateRows.map((row) => [
        row.sourceSkippedRecordId,
        row.modelKind,
        row.jurisdictionText,
        row.runtimeSupport.status,
        row.runtimeStatusWhenInputsMissing,
        String(row.testProfileCoverage.matchingProfileCount),
        String(row.testProfileCoverage.fullySatisfiedProfileCount),
        row.nextAction.action
      ])
    ),
    "",
    "## Test Profile Coverage",
    "",
    table(
      ["Sample User", "Matched Candidates", "Fully Satisfied Candidates"],
      audit.testProfileCoverageSummary.map((row) => [
        row.sampleUserId,
        String(row.matchedCandidateCount),
        String(row.fullySatisfiedCandidateCount)
      ])
    ),
    "",
    "## Non-Promoted Decisions",
    "",
    audit.nonPromotedRows.length
      ? table(["Kind", "ID", "Status", "Action"], audit.nonPromotedRows.map((row) => [row.kind, row.id, row.status, row.action]))
      : "- None",
    "",
    "## Interpretation",
    "",
    "- The GPT Pro repairs are source-backed enough to keep as tax rule candidates.",
    "- Compiled runtime support now exists for selected local workflow, sales/use exemption, and state-credit candidates; free-form GPT Pro formula text still is not executed directly.",
    audit.counts.candidatesWithCompleteMatchedTestInputs > 0
      ? `- ${audit.counts.candidatesWithCompleteMatchedTestInputs} candidate(s) now have at least one matching test profile with all audited runtime inputs present. Candidates with executable structured models are ready for customer-facing calculation after mandatory intake.`
      : "- Matching test profiles exist for most state/local candidates, but no candidate has all required user/tax inputs present under the current canonical input-key audit.",
    "- Missing program-document, tax-bill, tax-return, filing, assessor, and tax-profile inputs are mandatory pre-opportunity intake requirements; they should block opportunity display until answered or uploaded."
  ];
  return `${lines.join("\n")}\n`;
}

function tableFromCounts(counts) {
  const entries = Object.entries(counts || {});
  if (!entries.length) return "- None";
  return table(["Bucket", "Count"], entries.map(([key, value]) => [key, String(value)]));
}

function table(headers, rows) {
  if (!rows.length) return "- None";
  const escape = (value) => String(value ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
  return [
    `| ${headers.map(escape).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escape).join(" | ")} |`)
  ].join("\n");
}

function inferLocalBusinessTaxClass(buildingTypes = []) {
  if (buildingTypes.includes("hospitality_lodging")) return "hotel";
  if (buildingTypes.includes("restaurant_foodservice")) return "restaurant";
  if (buildingTypes.includes("retail_storefront") || buildingTypes.includes("grocery_food_retail")) return "retail";
  if (buildingTypes.includes("industrial_manufacturing")) return "manufacturing";
  if (buildingTypes.includes("warehouse_distribution") || buildingTypes.includes("warehouse_logistics")) return "warehouse";
  if (buildingTypes.includes("office_commercial")) return "general_business";
  if (buildingTypes.includes("multifamily_residential")) return "rental_unit_business_tax";
  return "general_business";
}

function inferEmployeeCount(testCase) {
  const squareFeet = Number(testCase.normalizedProfile?.site?.squareFootage?.value || 0);
  const buildingTypes = testCase.normalizedProfile?.site?.buildingTypes || [];
  if (buildingTypes.includes("hospitality_lodging")) return Math.max(20, Math.round(squareFeet / 2000));
  if (buildingTypes.includes("restaurant_foodservice")) return Math.max(12, Math.round(squareFeet / 250));
  if (buildingTypes.includes("retail_storefront") || buildingTypes.includes("grocery_food_retail")) return Math.max(10, Math.round(squareFeet / 5000));
  if (buildingTypes.includes("industrial_manufacturing")) return Math.max(50, Math.round(squareFeet / 2500));
  if (squareFeet > 0) return Math.max(5, Math.round(squareFeet / 1500));
  return 10;
}

function stateCodeForText(text) {
  const normalized = String(text || "").toLowerCase();
  const names = {
    alabama: "AL",
    arizona: "AZ",
    california: "CA",
    colorado: "CO",
    connecticut: "CT",
    iowa: "IA",
    maryland: "MD",
    michigan: "MI",
    montana: "MT",
    nevada: "NV",
    "new mexico": "NM",
    "new york": "NY",
    ohio: "OH",
    virginia: "VA"
  };
  for (const [name, code] of Object.entries(names)) {
    if (normalized.includes(name)) return code;
  }
  return null;
}

function addAlias(entries, sourceKey, targetKey) {
  if (entries[targetKey] || !entries[sourceKey]) return;
  entries[targetKey] = { value: entries[sourceKey].value, source: entries[sourceKey].source || "audit_alias" };
}

function addIfMissing(entries, key, value, source) {
  if (entries[key] || value === undefined || value === null || value === "") return;
  entries[key] = { value, source };
}

function normalizeInputKey(value) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function countBy(values, keyFn) {
  const counts = {};
  for (const value of values || []) {
    const key = keyFn(value) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

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
  console.log(`Usage: node scripts/audit-tax-gap-runtime-readiness.mjs [--date ${defaultDate}] [--dryRun]`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
