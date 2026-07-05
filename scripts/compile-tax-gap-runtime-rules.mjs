import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultDate = "2026-07-05";
const options = parseArgs(process.argv.slice(2));
const date = options.date || defaultDate;

const repairsPath = path.resolve(options.repairsPath || path.join(repoRoot, "data", `tax_gap_repairs_gpt_pro_${date}.json`));
const localWorkflowPath = path.resolve(options.localWorkflowPath || path.join(repoRoot, "data", "tax_local_workflow_rules.json"));
const runtimeRulesPath = path.resolve(options.runtimeRulesPath || path.join(repoRoot, "data", `tax_gap_runtime_rules_${date}.json`));
const reportPath = path.resolve(options.reportPath || path.join(repoRoot, "data", `tax_gap_runtime_rules_${date}.md`));

function main() {
  const repairs = readJson(repairsPath);
  const localWorkflowPayload = readJson(localWorkflowPath);
  const candidates = repairs.promotedTaxRuleRecords || [];

  const compiledLocalWorkflows = buildCompiledLocalWorkflows(candidates);
  const localWorkflowResult = mergeLocalWorkflows(localWorkflowPayload, compiledLocalWorkflows);
  const runtimeRules = buildRuntimeRules(candidates, compiledLocalWorkflows);
  const artifact = {
    schemaVersion: "tax-gap-runtime-rules-v1",
    generatedAt: new Date().toISOString(),
    sourceArtifact: path.relative(repoRoot, repairsPath),
    description:
      "Compiled runtime-facing models and canonical input requirements for GPT Pro repaired tax-gap candidates. Customer-facing totals remain off by default until each rule has complete user/tax-document inputs and explicit inclusion policy.",
    safetyPolicy: {
      includeInUserFacingTotalDefault: false,
      notes: [
        "These records do not make tax estimates customer-facing by themselves.",
        "Sales/use exemptions and state credits calculate only after required tax profile, invoice, certificate, filing, and liability inputs are present.",
        "Local business-tax and gross-receipts rows are compiled into local tax workflows where the current runtime supports the formula shape.",
        "Property-tax credits, exemptions, special valuations, and abatements remain tax-bill, assessor, or program-document gates."
      ]
    },
    counts: {
      promotedCandidateCount: candidates.length,
      runtimeRuleCount: runtimeRules.length,
      compiledLocalWorkflowCount: compiledLocalWorkflows.length,
      runtimeSupportCounts: countBy(runtimeRules, (rule) => rule.runtimeSupportStatus),
      modelKindCounts: countBy(runtimeRules, (rule) => rule.modelKind)
    },
    rules: runtimeRules
  };

  if (!options.dryRun) {
    writeJson(localWorkflowPath, localWorkflowResult.payload);
    writeJson(runtimeRulesPath, artifact);
    fs.writeFileSync(reportPath, buildReport({ artifact, localWorkflowResult }), "utf8");
  }

  console.log("Tax gap runtime compile complete.");
  console.log(`Promoted candidates: ${candidates.length}`);
  console.log(`Runtime rules: ${runtimeRules.length}`);
  console.log(`Local workflows added: ${localWorkflowResult.addedWorkflowIds.length}`);
  console.log(`Local workflows updated: ${localWorkflowResult.updatedWorkflowIds.length}`);
  console.log(`Runtime support counts: ${JSON.stringify(artifact.counts.runtimeSupportCounts)}`);
  console.log(`Runtime rules: ${path.relative(repoRoot, runtimeRulesPath)}`);
  console.log(`Report: ${path.relative(repoRoot, reportPath)}`);
}

function buildCompiledLocalWorkflows(rows) {
  const byId = new Map();
  const add = (workflow) => byId.set(workflow.id, workflow);

  const bySourceId = Object.fromEntries(rows.map((row) => [row.sourceSkippedRecordId, row]));
  const vernon = bySourceId.vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1;
  if (vernon) add(vernonWorkflow(vernon));

  const nm = bySourceId.sales_use_tax_ambiguous_rule_8;
  if (nm) add(newMexicoSolarGrossReceiptsWorkflow(nm));

  const ca = bySourceId.skip_unverified_ca_city_business_license_rates;
  if (ca) {
    add(losAngelesBusinessTaxWorkflow(ca));
    add(sanFranciscoBusinessTaxWorkflow(ca));
  }

  const ohio = bySourceId.skip_oh_cat_current_exclusion_amount_without_current_return_confirmation;
  if (ohio) add(ohioCatWorkflow(ohio));

  return [...byId.values()];
}

function vernonWorkflow(row) {
  return {
    id: "local_tax_ca_vernon_business_license_and_parcel_tax_v1",
    sourceTargetId: "ca_vernon_business_license_and_special_parcel_tax",
    taxDomain: "local_business_tax_and_special_assessment",
    taxType: "business_license_tax",
    calculationStatus: "calculable_with_user_inputs",
    includeInUserFacingTotalDefault: false,
    geography: {
      country: "US",
      state: "CA",
      countyFips: "06037",
      cities: ["Vernon"]
    },
    taxGapRepairSourceIds: [row.sourceSkippedRecordId],
    requiredInputs: [
      "local_business_tax_class",
      "avg_vernon_employees",
      "warehouse_square_feet",
      "inorganic_hazardous_waste_gross_receipts_cents",
      "organic_or_infectious_hazardous_waste_gross_receipts_cents",
      "related_party_hazardous_waste_gallons",
      "actual_incoming_tons",
      "lead_acid_battery_recycling_tons",
      "adopted_warehouse_special_parcel_tax_cents_per_100_sqft",
      "eligible_gross_land_area_sqft",
      "adopted_public_safety_special_parcel_tax_cents_per_sqft",
      "taxable_parcel_area_sqft"
    ],
    calculationModels: [
      {
        modelId: "vernon_general_employee_band",
        label: "General business employee-band license tax",
        appliesToClasses: ["general_business", "vernon_general_business", "office", "retail", "manufacturing", "distribution"],
        method: "employee_band",
        employeeInput: "avg_vernon_employees",
        inputKeys: ["avg_vernon_employees"],
        bands: vernonEmployeeBands()
      },
      {
        modelId: "vernon_related_hazardous_waste",
        label: "Related hazardous waste gallons",
        appliesToClasses: ["related_hazardous_waste"],
        method: "unit_rate",
        unitInput: "related_party_hazardous_waste_gallons",
        centsPerUnit: 30,
        inputKeys: ["related_party_hazardous_waste_gallons"]
      },
      {
        modelId: "vernon_waste_to_energy_or_solid_waste",
        label: "Waste-to-energy or solid-waste processing incoming tons",
        appliesToClasses: ["waste_to_energy", "solid_waste_processing", "solid_waste_recycling"],
        method: "unit_rate",
        unitInput: "actual_incoming_tons",
        centsPerUnit: 85,
        inputKeys: ["actual_incoming_tons"]
      },
      {
        modelId: "vernon_lead_acid_battery_recycling",
        label: "Lead-acid battery recycling incoming tons",
        appliesToClasses: ["lead_acid_battery_recycling"],
        method: "unit_rate",
        unitInput: "lead_acid_battery_recycling_tons",
        centsPerUnit: 30,
        inputKeys: ["lead_acid_battery_recycling_tons"]
      },
      {
        modelId: "vernon_warehouse_special_parcel_tax",
        label: "Warehouse/distribution special parcel tax",
        appliesToClasses: ["warehouse_special_parcel_tax", "warehouse_distribution_special_parcel_tax"],
        method: "rate_times_quantity",
        quantityInput: "eligible_gross_land_area_sqft",
        quantityDivisor: 100,
        rateInput: "adopted_warehouse_special_parcel_tax_cents_per_100_sqft",
        inputKeys: ["eligible_gross_land_area_sqft", "adopted_warehouse_special_parcel_tax_cents_per_100_sqft"]
      },
      {
        modelId: "vernon_public_safety_special_parcel_tax",
        label: "Public safety special parcel tax",
        appliesToClasses: ["public_safety_special_parcel_tax"],
        method: "rate_times_quantity",
        quantityInput: "taxable_parcel_area_sqft",
        quantityDivisor: 1,
        rateInput: "adopted_public_safety_special_parcel_tax_cents_per_sqft",
        inputKeys: ["taxable_parcel_area_sqft", "adopted_public_safety_special_parcel_tax_cents_per_sqft"]
      }
    ],
    sourceConfidence: row.sourceConfidence || "high",
    sourceUrls: row.officialSourceUrls || [],
    evidenceText: row.evidenceText,
    unresolvedGaps: [
      "Use current City Council-adopted rates when below ordinance maximums or CPI-adjusted schedules are published.",
      "Special parcel taxes require parcel/APN, land-area apportionment, and current tax bill or council-rate confirmation.",
      "Mixed-use Vernon businesses require city classification and apportionment confirmation."
    ]
  };
}

function newMexicoSolarGrossReceiptsWorkflow(row) {
  return {
    id: "tax_gap_nm_solar_gross_receipts_deduction_v1",
    sourceTargetId: row.sourceSkippedRecordId,
    taxDomain: "state_gross_receipts_tax",
    taxType: "gross_receipts_tax_deduction",
    calculationStatus: "calculable_with_user_inputs",
    includeInUserFacingTotalDefault: false,
    geography: { country: "US", state: "NM" },
    taxGapRepairSourceIds: [row.sourceSkippedRecordId],
    requiredInputs: [
      "eligible_solar_sale_installation_receipts_cents",
      "applicable_combined_gross_receipts_tax_rate_decimal",
      "nm_solar_energy_system_eligible",
      "seller_nm_gross_receipts_taxpayer_status_confirmed",
      "nm_solar_grt_deduction_pass_through_confirmed",
      "seller_grt_deduction_filing_confirmed",
      "nm_rpd_41341_or_equivalent_documentation_present"
    ],
    calculationModels: [
      {
        modelId: "nm_solar_grt_pass_through_savings",
        label: "New Mexico solar sale-and-installation GRT deduction pass-through value",
        appliesToClasses: ["solar_energy_system_sale_installation", "solar_electric_offset", "solar_installation"],
        method: "percentage_rate",
        amountInput: "eligible_solar_sale_installation_receipts_cents",
        rateInput: "applicable_combined_gross_receipts_tax_rate_decimal",
        requiredTrueInputs: [
          "nm_solar_energy_system_eligible",
          "seller_nm_gross_receipts_taxpayer_status_confirmed",
          "nm_solar_grt_deduction_pass_through_confirmed",
          "seller_grt_deduction_filing_confirmed"
        ],
        inputKeys: [
          "eligible_solar_sale_installation_receipts_cents",
          "applicable_combined_gross_receipts_tax_rate_decimal",
          "nm_solar_energy_system_eligible",
          "seller_nm_gross_receipts_taxpayer_status_confirmed",
          "nm_solar_grt_deduction_pass_through_confirmed",
          "seller_grt_deduction_filing_confirmed",
          "nm_rpd_41341_or_equivalent_documentation_present"
        ]
      }
    ],
    sourceConfidence: row.sourceConfidence || "high",
    sourceUrls: row.officialSourceUrls || [],
    evidenceText: row.evidenceText,
    unresolvedGaps: [
      "Customer-facing value requires invoice/contract evidence that the seller passed the deduction through to the customer.",
      "The seller, not the customer, claims the deduction on the gross receipts tax return."
    ]
  };
}

function losAngelesBusinessTaxWorkflow(row) {
  return {
    id: "tax_gap_ca_los_angeles_business_tax_v1",
    sourceTargetId: row.sourceSkippedRecordId,
    taxDomain: "local_business_tax",
    taxType: "business_tax_receipts_tax",
    calculationStatus: "calculable_with_user_inputs",
    includeInUserFacingTotalDefault: false,
    geography: { country: "US", state: "CA", countyFips: "06037", cities: ["Los Angeles"] },
    taxGapRepairSourceIds: [row.sourceSkippedRecordId],
    requiredInputs: [
      "local_business_tax_class",
      "la_city_taxable_gross_receipts_cents",
      "la_business_tax_rate_cents_per_1000_gross_receipts",
      "la_timely_filing_or_exemption_status_confirmed"
    ],
    calculationModels: [
      {
        modelId: "la_btrc_class_rate_per_1000",
        label: "Los Angeles BTRC gross-receipts class rate",
        appliesToClasses: ["los_angeles_btrc", "general_business", "retail", "wholesale", "contractor", "commercial_rental", "professional"],
        method: "rate_times_quantity",
        quantityInput: "la_city_taxable_gross_receipts_cents",
        quantityDivisor: 100000,
        rateInput: "la_business_tax_rate_cents_per_1000_gross_receipts",
        requiredTrueInputs: ["la_timely_filing_or_exemption_status_confirmed"],
        inputKeys: [
          "la_city_taxable_gross_receipts_cents",
          "la_business_tax_rate_cents_per_1000_gross_receipts",
          "la_timely_filing_or_exemption_status_confirmed"
        ]
      }
    ],
    sourceConfidence: row.sourceConfidence || "high",
    sourceUrls: row.officialSourceUrls || [],
    evidenceText: "Los Angeles Office of Finance publishes BTRC class rates and renewal mechanics; exact class rate must be supplied from the current official class schedule."
  };
}

function sanFranciscoBusinessTaxWorkflow(row) {
  return {
    id: "tax_gap_ca_san_francisco_business_tax_v1",
    sourceTargetId: row.sourceSkippedRecordId,
    taxDomain: "local_business_tax",
    taxType: "gross_receipts_tax",
    calculationStatus: "assessor_or_accountant_review_required",
    includeInUserFacingTotalDefault: false,
    geography: { country: "US", state: "CA", countyFips: "06075", cities: ["San Francisco"] },
    taxGapRepairSourceIds: [row.sourceSkippedRecordId],
    requiredInputs: [
      "sf_business_activity_category",
      "sf_allocated_gross_receipts_by_category",
      "sf_registration_fee_schedule_amount_cents",
      "sf_gross_receipts_tax_return_present",
      "sf_hgr_or_overpaid_executive_tax_applicability"
    ],
    calculationModels: [],
    sourceConfidence: row.sourceConfidence || "high",
    sourceUrls: row.officialSourceUrls || [],
    evidenceText: "San Francisco business tax uses category allocation, Prop M-era rate bands, registration fee, and possible HGR/OE rules. It remains a tax-return gate until progressive band tables are imported as structured rows.",
    unresolvedGaps: [
      "Progressive San Francisco gross-receipts bands are not compiled into executable rows yet.",
      "Customer-facing calculation requires a city business tax return or complete category allocation schedule."
    ]
  };
}

function ohioCatWorkflow(row) {
  return {
    id: "tax_gap_oh_commercial_activity_tax_current_exclusion_v1",
    sourceTargetId: row.sourceSkippedRecordId,
    taxDomain: "state_business_tax",
    taxType: "commercial_activity_tax",
    calculationStatus: "calculable_with_user_inputs",
    includeInUserFacingTotalDefault: false,
    geography: { country: "US", state: "OH" },
    taxGapRepairSourceIds: [row.sourceSkippedRecordId],
    requiredInputs: [
      "tax_year",
      "annual_ohio_taxable_gross_receipts_cents",
      "oh_cat_filing_confirmation"
    ],
    calculationModels: [
      {
        modelId: "oh_cat_annual_simplified_current_exclusion",
        label: "Ohio CAT annual simplified current exclusion",
        appliesToClasses: ["ohio_cat", "general_business", "manufacturing", "retail", "wholesale"],
        method: "gross_receipts_rate_after_exclusion",
        grossReceiptsInput: "annual_ohio_taxable_gross_receipts_cents",
        taxYearInput: "tax_year",
        rateDecimal: 0.0026,
        exclusionCentsByTaxYear: {
          "2024": 300000000,
          "2025": 600000000,
          "2026": 600000000
        },
        exclusionCents: 600000000,
        requiredTrueInputs: ["oh_cat_filing_confirmation"],
        inputKeys: [
          "tax_year",
          "annual_ohio_taxable_gross_receipts_cents",
          "oh_cat_filing_confirmation"
        ]
      }
    ],
    sourceConfidence: row.sourceConfidence || "high",
    sourceUrls: row.officialSourceUrls || [],
    evidenceText: row.evidenceText,
    unresolvedGaps: [
      "Quarter-level estimates require exclusion already used in prior quarters and group-member receipts.",
      "This annual model is a simplified internal tax-due estimate, not an incentive savings estimate."
    ]
  };
}

function buildRuntimeRules(rows, compiledLocalWorkflows) {
  const localWorkflowBySource = new Map(
    compiledLocalWorkflows.flatMap((workflow) => (workflow.taxGapRepairSourceIds || []).map((sourceId) => [sourceId, workflow]))
  );

  return rows.map((row) => {
    const localWorkflow = localWorkflowBySource.get(row.sourceSkippedRecordId);
    const calculationModel = runtimeCalculationModel(row);
    return {
      taxRuleId: row.taxRuleId,
      sourceSkippedRecordId: row.sourceSkippedRecordId,
      modelKind: row.modelKind,
      taxTypes: row.taxTypes || [],
      jurisdictionText: row.jurisdictionText,
      runtimeStatusWhenInputsMissing: row.runtimeStatusWhenInputsMissing,
      includeInUserFacingTotalDefault: false,
      customerFacingSavingsCentsDefault: 0,
      sourceConfidence: row.sourceConfidence,
      runtimeSupportStatus: runtimeSupportStatus(row, localWorkflow, calculationModel),
      localWorkflowId: localWorkflow?.id || null,
      calculationModel,
      canonicalInputRequirements: canonicalInputRequirements(row),
      sourceUrls: row.officialSourceUrls || row.sourceUrlsChecked || [],
      evidenceText: row.evidenceText,
      reasoningNotes: row.reasoningNotes || null
    };
  });
}

function runtimeCalculationModel(row) {
  switch (row.sourceSkippedRecordId) {
    case "sales_use_tax_ambiguous_rule_4":
      return {
        method: "sales_use_tax_exemption",
        amountInput: "qualifying_exempt_sales_price_cents",
        rateInput: "combined_sales_use_tax_rate_decimal",
        requiredTrueInputs: [
          "iowa_exemption_category_confirmed",
          "iowa_primary_use_or_item_eligibility_confirmed",
          "iowa_exemption_certificate_present"
        ]
      };

    case "az_renewable_energy_production_tax_credit_skip_v1":
      return {
        method: "az_renewable_energy_production_credit",
        resourceTypeInput: "qualified_resource_type",
        firstProductionDateInput: "facility_first_production_date",
        latestEligibleFirstProductionDate: "2020-12-31",
        productionYearNumberInput: "production_year_number",
        kwhProducedInput: "calendar_year_kwh_produced",
        ownershipPercentageInput: "facility_ownership_percentage",
        certifiedCreditAmountInput: "ador_certified_credit_amount_cents",
        taxLiabilityInput: "arizona_income_tax_liability_cents",
        windBiomassRateCentsPerKwh: 1,
        windBiomassKwhCap: 200000000,
        solarRateCentsByProductionYear: {
          "1": 4,
          "2": 4,
          "3": 3.5,
          "4": 3.5,
          "5": 3,
          "6": 3,
          "7": 2,
          "8": 2,
          "9": 1.5,
          "10": 1
        },
        maxFacilityAnnualCreditCents: 200000000,
        requiredTrueInputs: [
          "az_renewable_generator_qualified",
          "ador_certificate_approved",
          "ador_aggregate_cap_amount_certified",
          "az_facility_location_and_land_control_confirmed",
          "az_grid_transmission_or_interconnection_confirmed",
          "az_sale_to_eligible_unrelated_entity_confirmed"
        ]
      };

    case "co_heat_pump_systems_registered_contractor_credit_skip_v1":
      return {
        method: "co_heat_pump_invoice_discount_credit",
        invoiceDiscountInput: "co_heat_pump_invoice_discount_cents",
        requiredTrueInputs: [
          "co_contractor_registered_at_installation",
          "co_invoice_separately_states_required_discount",
          "co_contractor_filing_confirmation"
        ]
      };

    case "ct_green_buildings_credit_skip_v1":
      return {
        method: "ct_green_building_credit",
        projectTypeInput: "ct_green_building_project_type",
        certificationLevelInput: "leed_or_equivalent_certification_level",
        allowableCostsInput: "ct_green_building_allowable_costs_cents",
        squareFeetInput: "qualified_square_feet",
        voucherAmountInput: "deep_initial_credit_voucher_amount_cents",
        taxLiabilityLimitInput: "ct_chapter_208_tax_after_credit_ordering_cents",
        availableCreditForTaxYearInput: "ct_green_building_available_credit_for_tax_year_cents",
        bonusRateInput: "ct_green_building_bonus_rate_decimal",
        annualClaimLimitPercent: 0.25,
        costCapCentsPerSquareFootByProjectType: {
          new_construction: 25000,
          major_renovation: 25000,
          renovation: 15000,
          rehabilitation: 15000,
          core_and_shell: 25000,
          commercial_interior: 15000,
          default: 15000
        },
        baseRateByProjectAndCertification: {
          "new_construction:leed_gold": 0.08,
          "new_construction:leed_platinum": 0.105,
          "major_renovation:leed_gold": 0.08,
          "major_renovation:leed_platinum": 0.105,
          "core_and_shell:leed_gold": 0.05,
          "core_and_shell:leed_platinum": 0.07,
          "commercial_interior:leed_gold": 0.05,
          "commercial_interior:leed_platinum": 0.07,
          leed_gold: 0.05,
          leed_platinum: 0.07
        },
        requiredTrueInputs: [
          "ct_chapter_208_taxpayer_status_confirmed",
          "deep_initial_credit_voucher_valid",
          "ct_annual_eligibility_certificate_present"
        ]
      };

    default:
      return null;
  }
}

function runtimeSupportStatus(row, localWorkflow, calculationModel) {
  if (localWorkflow?.calculationModels?.length) return "compiled_to_local_tax_workflow";
  if (localWorkflow) return "compiled_to_gated_local_workflow";
  if (calculationModel) return "generic_runtime_model_supported_gated";
  if (["property_tax_credit", "property_tax_exemption", "property_tax_special_valuation", "tax_abatement_or_pilot"].includes(row.modelKind)) {
    return "program_document_tax_bill_or_assessor_gate";
  }
  return "not_compiled_runtime_gap";
}

function canonicalInputRequirements(row) {
  const overrides = CANONICAL_INPUT_OVERRIDES[row.sourceSkippedRecordId];
  if (overrides) return overrides;
  return (row.requiredRuntimeInputs || []).map((label) =>
    input(slugify(label), label, "unknown", inferSourceStrategy(label), inferUiPlacement(label))
  );
}

const CANONICAL_INPUT_OVERRIDES = {
  vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1: [
    input("local_business_tax_class", "Vernon business activity classification", "enum", "tax_profile_or_city_license", "tax_profile"),
    input("avg_vernon_employees", "Average number of employees in Vernon for the tax year", "number", "city_business_license_return", "tax_profile"),
    input("warehouse_square_feet", "Qualifying Vernon warehouse square footage", "number", "city_business_license_return", "retrofit_or_facility_profile"),
    input("inorganic_hazardous_waste_gross_receipts_cents", "Inorganic hazardous-waste gross receipts", "money_cents", "tax_return_or_accounting_system", "tax_profile"),
    input("organic_or_infectious_hazardous_waste_gross_receipts_cents", "Organic or infectious hazardous-waste gross receipts", "money_cents", "tax_return_or_accounting_system", "tax_profile"),
    input("related_party_hazardous_waste_gallons", "Related-party hazardous-waste gallons", "number", "city_business_license_return", "tax_profile"),
    input("actual_incoming_tons", "Actual incoming tons for waste-to-energy or solid-waste activity", "number", "city_business_license_return", "tax_profile"),
    input("lead_acid_battery_recycling_tons", "Lead-acid battery recycling incoming tons", "number", "city_business_license_return", "tax_profile"),
    input("adopted_warehouse_special_parcel_tax_cents_per_100_sqft", "Current adopted Vernon warehouse parcel-tax rate per 100 square feet", "money_cents", "official_city_rate_schedule_or_tax_bill", "tax_profile"),
    input("eligible_gross_land_area_sqft", "Eligible parcel gross land area", "number", "assessor_or_tax_bill", "tax_profile"),
    input("adopted_public_safety_special_parcel_tax_cents_per_sqft", "Current adopted Vernon public-safety parcel-tax rate per square foot", "money_cents", "official_city_rate_schedule_or_tax_bill", "tax_profile"),
    input("taxable_parcel_area_sqft", "Taxable parcel area", "number", "assessor_or_tax_bill", "tax_profile")
  ],
  sales_use_tax_ambiguous_rule_4: [
    input("qualifying_exempt_sales_price_cents", "Iowa qualifying exempt invoice sales price", "money_cents", "invoice_or_contract", "project_quote_upload"),
    input("combined_sales_use_tax_rate_decimal", "Combined Iowa sales/use tax rate for the sourced transaction", "decimal", "tax_geography_rule_or_user_override", "tax_profile"),
    input("iowa_exemption_category_confirmed", "Iowa exemption category confirmed", "boolean", "tax_profile_or_exemption_certificate", "tax_profile"),
    input("iowa_primary_use_or_item_eligibility_confirmed", "Iowa item/use eligibility confirmed", "boolean", "tax_profile_or_exemption_certificate", "tax_profile"),
    input("iowa_exemption_certificate_present", "Iowa exemption certificate present when required", "boolean", "exemption_certificate_upload", "tax_document_upload"),
    input("iowa_labor_or_service_classification", "Iowa contractor labor/service classification", "enum", "invoice_or_contract", "project_quote_upload")
  ],
  sales_use_tax_ambiguous_rule_8: [
    input("eligible_solar_sale_installation_receipts_cents", "Eligible New Mexico solar sale-and-installation receipts", "money_cents", "invoice_or_contract", "project_quote_upload"),
    input("applicable_combined_gross_receipts_tax_rate_decimal", "Applicable combined New Mexico gross receipts tax rate", "decimal", "tax_geography_rule_or_user_override", "tax_profile"),
    input("nm_solar_energy_system_eligible", "Solar energy system eligibility confirmed under New Mexico rules", "boolean", "tax_profile_or_certificate", "tax_profile"),
    input("seller_nm_gross_receipts_taxpayer_status_confirmed", "Seller/installer New Mexico gross receipts taxpayer status confirmed", "boolean", "seller_or_installer_confirmation", "tax_profile"),
    input("nm_solar_grt_deduction_pass_through_confirmed", "Invoice confirms deduction benefit is passed through to customer", "boolean", "invoice_or_contract", "project_quote_upload"),
    input("seller_grt_deduction_filing_confirmed", "Seller filing confirmation for New Mexico GRT deduction", "boolean", "seller_or_installer_confirmation", "tax_document_upload"),
    input("nm_rpd_41341_or_equivalent_documentation_present", "New Mexico RPD-41341 or equivalent retained documentation present", "boolean", "tax_document_upload", "tax_document_upload")
  ],
  az_renewable_energy_production_tax_credit_skip_v1: [
    input("az_renewable_generator_qualified", "Qualified Arizona renewable generator status confirmed", "boolean", "tax_certificate_or_program_document", "tax_document_upload"),
    input("qualified_resource_type", "Qualified resource type", "enum", "project_profile", "retrofit_or_facility_profile"),
    input("facility_first_production_date", "Facility first-production date", "date", "interconnection_or_program_document", "tax_document_upload"),
    input("az_facility_location_and_land_control_confirmed", "Arizona facility location and land control confirmed", "boolean", "program_document", "tax_document_upload"),
    input("az_grid_transmission_or_interconnection_confirmed", "Grid transmission or interconnection documentation confirmed", "boolean", "program_document", "tax_document_upload"),
    input("az_sale_to_eligible_unrelated_entity_confirmed", "Sale to eligible unrelated entity or regulated public service corporation confirmed", "boolean", "program_document", "tax_document_upload"),
    input("production_year_number", "Production year number from 1 through 10", "number", "tax_profile", "tax_profile"),
    input("calendar_year_kwh_produced", "Calendar-year kWh produced", "number", "production_meter_or_tax_return", "tax_profile"),
    input("facility_ownership_percentage", "Facility ownership percentage", "decimal", "title_or_tax_return", "tax_profile"),
    input("ador_certificate_approved", "ADOR certificate approval confirmed", "boolean", "tax_certificate_upload", "tax_document_upload"),
    input("ador_certified_credit_amount_cents", "ADOR certified credit amount after aggregate cap", "money_cents", "tax_certificate_upload", "tax_document_upload"),
    input("ador_aggregate_cap_amount_certified", "ADOR aggregate cap availability reflected in certificate", "boolean", "tax_certificate_upload", "tax_document_upload"),
    input("arizona_income_tax_liability_cents", "Arizona income tax liability available to absorb the credit", "money_cents", "tax_return", "tax_document_upload")
  ],
  co_heat_pump_systems_registered_contractor_credit_skip_v1: [
    input("co_contractor_registered_at_installation", "Colorado contractor registered at installation", "boolean", "contractor_confirmation", "tax_profile"),
    input("co_invoice_separately_states_required_discount", "Invoice separately states Colorado required discount", "boolean", "invoice_or_receipt", "project_quote_upload"),
    input("co_heat_pump_invoice_discount_cents", "Colorado heat-pump tax-credit discount shown on invoice", "money_cents", "invoice_or_receipt", "project_quote_upload"),
    input("co_heat_pump_technology_type", "Colorado heat-pump technology category", "enum", "invoice_or_equipment_scope", "retrofit_or_facility_profile"),
    input("co_heat_pump_property_type", "Colorado property type for unit-count rules", "enum", "project_profile", "retrofit_or_facility_profile"),
    input("co_contractor_filing_confirmation", "Contractor filing confirmation", "boolean", "contractor_or_tax_return_confirmation", "tax_document_upload")
  ],
  ct_green_buildings_credit_skip_v1: [
    input("tax_year", "Tax year", "number", "tax_return", "tax_document_upload"),
    input("ct_chapter_208_taxpayer_status_confirmed", "Connecticut Chapter 208 taxpayer status confirmed", "boolean", "tax_return", "tax_document_upload"),
    input("deep_initial_credit_voucher_valid", "Valid DEEP initial credit voucher", "boolean", "program_document", "tax_document_upload"),
    input("deep_initial_credit_voucher_amount_cents", "DEEP initial credit voucher amount", "money_cents", "program_document", "tax_document_upload"),
    input("ct_green_building_project_type", "Green building project type", "enum", "program_document", "tax_document_upload"),
    input("leed_or_equivalent_certification_level", "LEED or equivalent certification level", "enum", "certification_document", "tax_document_upload"),
    input("ct_green_building_allowable_costs_cents", "Allowable green-building costs", "money_cents", "tax_return_or_project_cost_schedule", "tax_document_upload"),
    input("qualified_square_feet", "Qualified square footage", "number", "project_profile", "retrofit_or_facility_profile"),
    input("ct_green_building_available_credit_for_tax_year_cents", "Credit available for the claim year", "money_cents", "tax_return", "tax_document_upload"),
    input("ct_chapter_208_tax_after_credit_ordering_cents", "Chapter 208 tax after required credit ordering", "money_cents", "tax_return", "tax_document_upload"),
    input("ct_annual_eligibility_certificate_present", "Annual eligibility certificate present", "boolean", "certification_document", "tax_document_upload"),
    input("ct_green_building_bonus_rate_decimal", "Applicable statutory bonus rate", "decimal", "program_document", "tax_document_upload", "optional")
  ],
  skip_oh_cat_current_exclusion_amount_without_current_return_confirmation: [
    input("tax_year", "Ohio CAT tax year", "number", "tax_return", "tax_document_upload"),
    input("annual_ohio_taxable_gross_receipts_cents", "Annual Ohio taxable gross receipts", "money_cents", "tax_return", "tax_document_upload"),
    input("quarterly_ohio_taxable_gross_receipts_cents", "Quarterly Ohio taxable gross receipts", "money_cents", "tax_return", "tax_document_upload", "optional"),
    input("oh_cat_filing_confirmation", "Ohio CAT filing/registration confirmation", "boolean", "tax_return", "tax_document_upload"),
    input("oh_cat_group_taxpayer_status", "Single, combined, or consolidated taxpayer group status", "enum", "tax_return", "tax_document_upload", "optional"),
    input("oh_cat_exclusion_used_in_prior_quarters_cents", "CAT exclusion already used in prior quarters", "money_cents", "tax_return", "tax_document_upload", "optional")
  ]
};

function input(inputKey, label, valueType, sourceStrategy, uiPlacement, missingSeverity = "blocks_calculation") {
  return {
    inputKey,
    label,
    valueType,
    sourceStrategy,
    uiPlacement,
    missingSeverity,
    userOverrideAllowed: true
  };
}

function mergeLocalWorkflows(payload, compiledWorkflows) {
  const workflows = [...(payload.workflows || [])];
  const addedWorkflowIds = [];
  const updatedWorkflowIds = [];

  for (const compiled of compiledWorkflows) {
    const index = workflows.findIndex((workflow) => workflow.id === compiled.id);
    if (index === -1) {
      workflows.push(compiled);
      addedWorkflowIds.push(compiled.id);
      continue;
    }

    workflows[index] = mergeWorkflow(workflows[index], compiled);
    updatedWorkflowIds.push(compiled.id);
  }

  return {
    addedWorkflowIds,
    updatedWorkflowIds,
    payload: {
      ...payload,
      updatedAt: new Date().toISOString(),
      sourceArtifacts: unique([payload.sourceArtifact, path.relative(repoRoot, repairsPath)]).filter(Boolean),
      workflows
    }
  };
}

function mergeWorkflow(existing, incoming) {
  return {
    ...existing,
    ...withoutUndefined({
      sourceTargetId: existing.sourceTargetId || incoming.sourceTargetId,
      taxDomain: existing.taxDomain || incoming.taxDomain,
      taxType: existing.taxType || incoming.taxType,
      calculationStatus: existing.calculationStatus || incoming.calculationStatus,
      includeInUserFacingTotalDefault: existing.includeInUserFacingTotalDefault ?? incoming.includeInUserFacingTotalDefault,
      geography: existing.geography || incoming.geography,
      sourceConfidence: incoming.sourceConfidence || existing.sourceConfidence,
      evidenceText: incoming.evidenceText || existing.evidenceText
    }),
    taxGapRepairSourceIds: unique([...(existing.taxGapRepairSourceIds || []), ...(incoming.taxGapRepairSourceIds || [])]),
    requiredInputs: unique([...(existing.requiredInputs || []), ...(incoming.requiredInputs || [])]),
    sourceUrls: unique([...(existing.sourceUrls || []), ...(incoming.sourceUrls || [])]),
    unresolvedGaps: unique([...(existing.unresolvedGaps || []), ...(incoming.unresolvedGaps || [])]),
    calculationModels: mergeModels(existing.calculationModels || [], incoming.calculationModels || [])
  };
}

function mergeModels(existing, incoming) {
  const models = [...existing];
  for (const model of incoming) {
    const index = models.findIndex((item) => item.modelId === model.modelId);
    if (index === -1) {
      models.push(model);
    } else {
      models[index] = { ...models[index], ...model };
    }
  }
  return models;
}

function vernonEmployeeBands() {
  const rows = [
    [0, 1, 750],
    [2, 10, 1150],
    [11, 25, 1550],
    [26, 50, 2150],
    [51, 75, 2875],
    [76, 100, 3575],
    [101, 150, 4250],
    [151, 200, 4975],
    [201, 250, 5700],
    [251, 300, 6425],
    [301, 400, 7150],
    [401, 500, 7850],
    [501, 600, 8600],
    [601, 700, 10000],
    [701, 800, 11425],
    [801, 900, 12850],
    [901, 1000, 14275],
    [1001, 1100, 15700],
    [1101, 1200, 17100],
    [1201, 1300, 18500],
    [1301, 1400, 19950],
    [1401, 1500, 21350],
    [1501, 1600, 22775],
    [1601, 1700, 24175],
    [1701, 1800, 25625],
    [1801, 1900, 27025],
    [1901, null, 28450]
  ];
  return rows.map(([minEmployees, maxEmployees, amountDollars]) => ({
    minEmployees,
    maxEmployees,
    amountCents: amountDollars * 100,
    label: `${minEmployees}${maxEmployees === null ? "+" : `-${maxEmployees}`} employees`
  }));
}

function buildReport({ artifact, localWorkflowResult }) {
  const lines = [
    "# Tax Gap Runtime Rules",
    "",
    `Generated: ${artifact.generatedAt}`,
    "",
    "## Summary",
    "",
    `- Promoted candidates compiled: ${artifact.counts.promotedCandidateCount}`,
    `- Runtime rule records: ${artifact.counts.runtimeRuleCount}`,
    `- Local workflows updated: ${localWorkflowResult.updatedWorkflowIds.length}`,
    `- Local workflows added: ${localWorkflowResult.addedWorkflowIds.length}`,
    "",
    "## Runtime Support",
    "",
    tableFromCounts(artifact.counts.runtimeSupportCounts),
    "",
    "## Local Workflow Changes",
    "",
    `- Added: ${localWorkflowResult.addedWorkflowIds.length ? localWorkflowResult.addedWorkflowIds.join(", ") : "none"}`,
    `- Updated: ${localWorkflowResult.updatedWorkflowIds.length ? localWorkflowResult.updatedWorkflowIds.join(", ") : "none"}`,
    "",
    "## Exact Required Inputs By Rule",
    "",
    ...artifact.rules.flatMap((rule) => [
      `### ${rule.sourceSkippedRecordId}`,
      "",
      `- Model kind: \`${rule.modelKind}\``,
      `- Runtime support: \`${rule.runtimeSupportStatus}\``,
      `- Runtime status when missing inputs: \`${rule.runtimeStatusWhenInputsMissing || "missing_inputs"}\``,
      "",
      table(
        ["Input key", "Label", "Source strategy", "UI placement", "Severity"],
        (rule.canonicalInputRequirements || []).map((inputRow) => [
          inputRow.inputKey,
          inputRow.label,
          inputRow.sourceStrategy,
          inputRow.uiPlacement,
          inputRow.missingSeverity
        ])
      ),
      ""
    ]),
    "## Interpretation",
    "",
    "- GPT Pro research has now been converted into runtime-facing rule and input records.",
    "- Customer-facing inclusion is still disabled by default; these models calculate only when the relevant tax forms, invoices, certificates, or tax-profile values are present.",
    "- The next implementation pass can wire these inputs into the form/upload layer and create or update test cases for jurisdictions that still have no matching profile."
  ];
  return `${lines.join("\n")}\n`;
}

function inferSourceStrategy(label) {
  const text = String(label || "").toLowerCase();
  if (/bill|parcel|assessor|property tax/.test(text)) return "tax_bill_or_assessor";
  if (/return|liability|filing|income tax|gross receipts|cat/.test(text)) return "tax_return";
  if (/certificate|voucher|approval|application|document/.test(text)) return "tax_document_upload";
  if (/invoice|contract|receipt/.test(text)) return "invoice_or_contract";
  return "tax_profile";
}

function inferUiPlacement(label) {
  const strategy = inferSourceStrategy(label);
  if (strategy === "tax_bill_or_assessor" || strategy === "tax_return" || strategy === "tax_document_upload") return "tax_document_upload";
  if (strategy === "invoice_or_contract") return "project_quote_upload";
  return "tax_profile";
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function withoutUndefined(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined));
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

function tableFromCounts(counts) {
  return table(
    ["Bucket", "Count"],
    Object.entries(counts || {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [key, String(value)])
  );
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows || []) {
    const key = keyFn(row) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function unique(values) {
  return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function parseArgs(args) {
  const parsed = {};
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) throw new Error(`Unexpected positional argument: ${arg}`);
    const key = arg.slice(2);
    if (key === "dryRun") {
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

main();
