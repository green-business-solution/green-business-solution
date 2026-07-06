import { answerValue, hasAnswer } from "./labor.mjs";

export const TAX_GAP_RUNTIME_RULE_SCHEMA_VERSION = "tax-gap-runtime-rules-v1";

export function calculateTaxGapRuntimeRule(rule, ctx = {}) {
  if (!rule || typeof rule !== "object") {
    return blockedResult(rule, "invalid_rule", ["Tax gap runtime rule is missing or invalid."]);
  }

  if (rule.includeInUserFacingTotalDefault === false && rule.runtimeStatus === "source_unavailable") {
    return blockedResult(rule, "source_unavailable", ["Official source is unavailable."]);
  }

  const missingInputs = missingRequiredInputs(rule, ctx);
  if (missingInputs.length) {
    return {
      taxRuleId: rule.taxRuleId || null,
      sourceSkippedRecordId: rule.sourceSkippedRecordId || null,
      status: rule.runtimeStatusWhenInputsMissing || "missing_inputs",
      amountCents: 0,
      includedInUserFacingTotal: false,
      missingInputs,
      trace: [`Missing required tax-gap inputs: ${missingInputs.map((input) => input.inputKey).join(", ")}.`]
    };
  }

  const model = rule.calculationModel || {};
  const gateResult = requiredTrueGateResult(rule, ctx);
  if (gateResult) return gateResult;

  switch (model.method) {
    case "sales_use_tax_exemption":
      return resultForRule(rule, calculateSalesUseTaxExemption(rule, ctx), ctx);

    case "az_renewable_energy_production_credit":
      return resultForRule(rule, calculateArizonaRenewableProductionCredit(rule, ctx), ctx);

    case "co_heat_pump_invoice_discount_credit":
      return resultForRule(rule, calculateColoradoHeatPumpInvoiceDiscount(rule, ctx), ctx);

    case "ct_green_building_credit":
      return resultForRule(rule, calculateConnecticutGreenBuildingCredit(rule, ctx), ctx);

    case "va_local_option_solar_property_tax_exemption":
      return resultForRule(rule, calculateVirginiaSolarPropertyTaxExemption(rule, ctx), ctx);

    case "al_chapter_9b_sales_use_tax_abatement":
      return resultForRule(rule, calculateAlabamaChapter9bSalesUseAbatement(rule, ctx), ctx);

    case "nv_reta_sales_use_and_property_tax_abatement":
      return resultForRule(rule, calculateNevadaRetaAbatement(rule, ctx), ctx);

    case "mt_energy_production_development_property_tax_abatement":
      return resultForRule(rule, calculateMontanaEnergyProductionDevelopmentAbatement(rule, ctx), ctx);

    case "ct_uniform_solar_capacity_tax_liability":
      return resultForRule(rule, calculateConnecticutUniformSolarCapacityTax(rule, ctx), ctx);

    case "md_baltimore_county_high_performance_property_tax_credit":
      return resultForRule(rule, calculateBaltimoreCountyHighPerformanceCredit(rule, ctx), ctx);

    case "md_pg_county_green_high_performance_property_tax_credit":
      return resultForRule(rule, calculatePrinceGeorgesGreenHighPerformanceCredit(rule, ctx), ctx);

    case "md_anne_arundel_energy_high_performance_property_tax_credit":
      return resultForRule(rule, calculateAnneArundelEnergyHighPerformanceCredit(rule, ctx), ctx);

    case "ny_rptl_487_property_tax_exemption":
      return resultForRule(rule, calculateNewYorkRptl487Exemption(rule, ctx), ctx);

    case "md_prince_georges_green_business_property_tax_credit":
      return resultForRule(rule, calculatePrinceGeorgesGreenBusinessCredit(rule, ctx), ctx);

    case "mi_renewable_energy_renaissance_zone_abatement":
      return resultForRule(rule, calculateMichiganRerzAbatement(rule, ctx), ctx);

    default:
      return blockedResult(rule, "unsupported_runtime_model", [
        `Unsupported tax-gap runtime model: ${model.method || "unknown"}.`
      ]);
  }
}

function calculateSalesUseTaxExemption(rule, ctx) {
  const model = rule.calculationModel || {};
  const baseCents = numberAnswer(ctx, model.amountInput);
  const rate = taxRateAnswer(ctx, model.rateInput);
  return {
    amountCents: Math.round(baseCents * rate),
    trace: [`Exempt tax base ${baseCents} cents * sales/use tax rate ${rate}.`]
  };
}

function calculateArizonaRenewableProductionCredit(rule, ctx) {
  const model = rule.calculationModel || {};
  const resourceType = normalizeKey(valueAnswer(ctx, model.resourceTypeInput));
  const firstProductionDate = String(valueAnswer(ctx, model.firstProductionDateInput) || "");
  const productionYearNumber = Number(valueAnswer(ctx, model.productionYearNumberInput));
  const kwhProduced = numberAnswer(ctx, model.kwhProducedInput);
  const ownershipPercentage = fractionAnswer(ctx, model.ownershipPercentageInput, 1);
  const certifiedCreditCents = numberAnswer(ctx, model.certifiedCreditAmountInput);
  const taxLiabilityCents = numberAnswer(ctx, model.taxLiabilityInput);

  if (model.latestEligibleFirstProductionDate && firstProductionDate > model.latestEligibleFirstProductionDate) {
    return {
      amountCents: 0,
      trace: [
        `Facility first-production date ${firstProductionDate} is after ${model.latestEligibleFirstProductionDate}, so Arizona production credit value is zero.`
      ]
    };
  }

  let grossCreditCents = 0;
  if (["wind", "biomass"].includes(resourceType)) {
    grossCreditCents = Math.min(kwhProduced, Number(model.windBiomassKwhCap || 200000000)) * Number(model.windBiomassRateCentsPerKwh || 1);
  } else {
    const rateCents = Number(model.solarRateCentsByProductionYear?.[String(productionYearNumber)] ?? 0);
    grossCreditCents = kwhProduced * rateCents;
  }

  const facilityCreditCents = Math.min(
    grossCreditCents,
    Number(model.maxFacilityAnnualCreditCents || Number.POSITIVE_INFINITY)
  ) * ownershipPercentage;
  const allowedCreditCents = Math.min(facilityCreditCents, certifiedCreditCents, taxLiabilityCents);

  return {
    amountCents: Math.round(Math.max(0, allowedCreditCents)),
    trace: [
      `Gross Arizona production credit ${grossCreditCents} cents for ${kwhProduced} kWh and resource ${resourceType}.`,
      `Applied facility cap and ownership percentage ${ownershipPercentage}: ${facilityCreditCents} cents.`,
      `Allowed current-year value is min(facility credit, certified amount, tax liability) = ${allowedCreditCents} cents.`
    ]
  };
}

function calculateColoradoHeatPumpInvoiceDiscount(rule, ctx) {
  const model = rule.calculationModel || {};
  const invoiceDiscountCents = numberAnswer(ctx, model.invoiceDiscountInput);
  return {
    amountCents: Math.round(Math.max(0, invoiceDiscountCents)),
    trace: [
      `Colorado heat-pump customer-facing tax-credit value uses the separately stated invoice discount: ${invoiceDiscountCents} cents.`
    ]
  };
}

function calculateConnecticutGreenBuildingCredit(rule, ctx) {
  const model = rule.calculationModel || {};
  const projectType = normalizeKey(valueAnswer(ctx, model.projectTypeInput));
  const certificationLevel = normalizeKey(valueAnswer(ctx, model.certificationLevelInput));
  const allowableCostsCents = numberAnswer(ctx, model.allowableCostsInput);
  const squareFeet = numberAnswer(ctx, model.squareFeetInput);
  const voucherAmountCents = numberAnswer(ctx, model.voucherAmountInput);
  const taxLiabilityLimitCents = numberAnswer(ctx, model.taxLiabilityLimitInput);
  const availableCreditCents = numberAnswer(ctx, model.availableCreditForTaxYearInput);
  const bonusRate = fractionAnswer(ctx, model.bonusRateInput, 0);

  const costCapPerSquareFootCents = costCapPerSquareFoot(model, projectType);
  const baseRate = greenBuildingBaseRate(model, projectType, certificationLevel);
  const cappedAllowableCostsCents = Math.min(allowableCostsCents, squareFeet * costCapPerSquareFootCents);
  const totalCreditEarnedCents = Math.min(voucherAmountCents, cappedAllowableCostsCents * (baseRate + bonusRate));
  const annualClaimLimitCents = allowableCostsCents * Number(model.annualClaimLimitPercent || 0.25);
  const currentYearCreditCents = Math.min(
    totalCreditEarnedCents,
    annualClaimLimitCents,
    availableCreditCents,
    taxLiabilityLimitCents
  );

  return {
    amountCents: Math.round(Math.max(0, currentYearCreditCents)),
    trace: [
      `Capped allowable costs: min(${allowableCostsCents}, ${squareFeet} * ${costCapPerSquareFootCents}) = ${cappedAllowableCostsCents} cents.`,
      `Credit before current-year limits: min(voucher ${voucherAmountCents}, capped costs * rate ${baseRate + bonusRate}) = ${totalCreditEarnedCents} cents.`,
      `Current-year value: min(total credit, annual limit ${annualClaimLimitCents}, available credit ${availableCreditCents}, tax liability ${taxLiabilityLimitCents}) = ${currentYearCreditCents} cents.`
    ]
  };
}

function calculateVirginiaSolarPropertyTaxExemption(rule, ctx) {
  const certification = objectAnswer(ctx, "local_building_department_certification");
  const assessor = objectAnswer(ctx, "assessor_determined_certified_exemption_value");
  const bill = objectAnswer(ctx, "current_locality_real_property_tax_rate_and_tax_bill");
  const separateSmallSystemTreatment = booleanAnswer(
    ctx,
    "whether_the_system_qualifies_for_the_separate_25_kw_or_less_statewide_wholly_exempt_treatment"
  );
  if (separateSmallSystemTreatment === true) {
    return zeroTrace("Virginia local-option exemption not used because the separate 25 kW-or-less treatment applies.");
  }
  if (!isAffirmativeStatus(certification.certification_status, ["certified"])) {
    return zeroTrace("Virginia solar exemption requires local building-department certification.");
  }

  const taxYear = Number(bill.tax_year || assessor.exemption_start_tax_year || new Date().getUTCFullYear());
  const startYear = Number(assessor.exemption_start_tax_year || taxYear);
  const termYears = Number(assessor.exemption_term_years || 5);
  if (taxYear < startYear || taxYear > startYear + termYears - 1) {
    return zeroTrace(`Tax year ${taxYear} is outside the certified Virginia exemption term ${startYear}-${startYear + termYears - 1}.`);
  }

  const billReduction = firstNumber(
    bill.official_bill_solar_credit_amount_cents,
    bill.estimated_annual_tax_reduction_cents
  );
  const baseCents = firstNumber(
    assessor.certified_exemption_value_cents,
    bill.certified_solar_exemption_value_cents
  );
  const ratePer100 = numberOrNull(bill.real_property_tax_rate_per_100_assessed_value);
  let amountCents = billReduction ?? (baseCents !== null && ratePer100 !== null ? baseCents * ratePer100 / 100 : 0);
  const capCents = firstNumber(
    bill.annual_tax_due_before_exemption_cents,
    bill.annual_real_property_tax_due_before_exemption_cents
  );
  if (capCents !== null) amountCents = Math.min(amountCents, capCents);

  return {
    amountCents: roundCurrencyCents(amountCents),
    trace: [
      billReduction !== null
        ? `Used official/synthetic tax-bill solar reduction amount: ${roundCurrencyCents(billReduction)} cents.`
        : `Virginia solar exemption value: ${baseCents || 0} cents * ${ratePer100 || 0} per $100 assessed value / 100.`
    ]
  };
}

function calculateAlabamaChapter9bSalesUseAbatement(rule, ctx) {
  const agreement = objectAnswer(ctx, "executed_chapter_9b_abatement_agreement");
  const certificate = objectAnswer(ctx, "alabama_department_of_revenue_sales_and_use_tax_exemption_certificate");
  const invoices = objectAnswer(ctx, "itemized_invoices_and_transaction_dates");
  const ratesValue = valueAnswer(ctx, "state_and_local_sales_and_use_tax_rates");
  const rates = ratesValue && typeof ratesValue === "object" ? ratesValue : {};
  const requiredDocs = [
    programDocumentPresent(ctx, "executed_chapter_9b_abatement_agreement"),
    programDocumentPresent(ctx, "certified_granting_authority_resolution"),
    programDocumentPresent(ctx, "completed_form_co_caa_and_property_list"),
    programDocumentPresent(ctx, "completed_form_st_ex_a2_sales_and_use_tax_certificate_application"),
    programDocumentPresent(ctx, "alabama_department_of_revenue_sales_and_use_tax_exemption_certificate"),
    programDocumentPresent(ctx, "e_verify_documentation"),
    programDocumentPresent(ctx, "alabama_department_of_commerce_project_notification")
  ];
  if (!requiredDocs.every(Boolean)) {
    return zeroTrace("Alabama Chapter 9B abatement requires the executed agreement, certified resolution, ALDOR certificate package, and supporting program documents.");
  }

  const baseCents = firstNumber(
    numberAnswer(ctx, "tax_base_for_qualifying_tangible_personal_property_and_taxable_services_incorporated_into_the_project"),
    invoices.qualifyingTaxBaseCents
  );
  const maxBaseCents = firstNumber(
    agreement.maximumQualifyingPurchaseBaseCents,
    certificate.maximumQualifyingPurchaseBaseCents
  );
  const cappedBaseCents = maxBaseCents !== null ? Math.min(baseCents || 0, maxBaseCents) : baseCents || 0;
  const stateAbatableBps = numberOrNull(rates.stateAbatablePortionBps);
  const localNoneducationBps = numberOrNull(rates.localNoneducationRateBps);
  const derivedSplitRateBps = stateAbatableBps !== null || localNoneducationBps !== null
    ? (stateAbatableBps || 0) + (localNoneducationBps || 0)
    : null;
  const rateBps = firstNumber(
    rates.totalAbatableRateBps,
    derivedSplitRateBps,
    certificate.allowedAbatementTreatment?.totalAbatableRateBps,
    ratesValue && typeof ratesValue !== "object" ? taxRate(ratesValue) * 10000 : null
  );
  const amountCents = cappedBaseCents * (rateBps || 0) / 10000;
  return {
    amountCents: roundCurrencyCents(amountCents),
    trace: [`Alabama Chapter 9B abatement: ${cappedBaseCents} cents qualifying base * ${rateBps || 0} abatable basis points / 10000.`]
  };
}

function calculateNevadaRetaAbatement(rule, ctx) {
  const order = objectAnswer(ctx, "governor_s_office_of_energy_legal_order");
  const agreement = objectAnswer(ctx, "executed_abatement_agreement");
  const certificate = objectAnswer(ctx, "certificate_of_eligibility");
  if (!isAffirmativeStatus(order.approvalStatus, ["approved"]) || !agreement.agreementId || !certificate.certificateId) {
    return zeroTrace("Nevada RETA value requires approved GOE order, executed abatement agreement, and certificate of eligibility.");
  }

  const salesFiscalNote = objectAnswer(ctx, "department_of_taxation_sales_use_tax_fiscal_note");
  const purchaseSchedule = objectAnswer(ctx, "eligible_purchase_amounts_by_period_and_project_schedule");
  const combinedRate = firstNumber(
    salesFiscalNote.combinedSalesUseTaxRate,
    objectAnswer(ctx, "project_county_and_current_combined_sales_use_tax_rate").combinedSalesUseTaxRate
  );
  const schoolRate = firstNumber(
    salesFiscalNote.localSchoolSupportTaxRate,
    objectAnswer(ctx, "current_local_school_support_tax_rate").localSchoolSupportTaxRate
  );
  const eligibleRate = firstNumber(salesFiscalNote.abatementEligibleRate, combinedRate !== null && schoolRate !== null ? combinedRate - schoolRate : null);
  const salesAmountCents = firstNumber(
    salesFiscalNote.estimatedSalesUseTaxAbatementCents,
    (purchaseSchedule.totalEligiblePurchasesCents || 0) * (eligibleRate || 0)
  ) || 0;

  const propertyFiscalNote = objectAnswer(ctx, "governor_s_finance_office_or_property_tax_fiscal_note_where_applicable");
  const propertySchedule = objectAnswer(ctx, "facility_real_and_personal_property_tax_payable_by_year").propertyTaxPayableSchedule || [];
  const propertyAmountCents = firstNumber(
    propertyFiscalNote.estimatedFirstFullYearAbatementCents,
    sum(propertySchedule, (row) =>
      firstNumber(row.abatementAmountCents, row.documentedAbatementAmountCents, row.taxBeforeAbatementCents * taxRate(row.abatementPercent)) || 0
    )
  ) || 0;

  return {
    amountCents: roundCurrencyCents(salesAmountCents + propertyAmountCents),
    trace: [
      `Nevada RETA sales/use component: ${roundCurrencyCents(salesAmountCents)} cents.`,
      `Nevada RETA property-tax component: ${roundCurrencyCents(propertyAmountCents)} cents.`
    ]
  };
}

function calculateMontanaEnergyProductionDevelopmentAbatement(rule, ctx) {
  const certification = objectAnswer(ctx, "deq_certification_status_and_certificate_identifier");
  const period = objectAnswer(ctx, "current_year_within_qualifying_period");
  if (!isAffirmativeStatus(certification.status, ["certified"]) || certification.revoked === true) {
    return zeroTrace("Montana abatement requires active DEQ certification.");
  }
  if (period.withinQualifyingPeriod === false) {
    return zeroTrace("Montana abatement is outside the documented qualifying period.");
  }
  const taxableValueCents = numberAnswer(ctx, "qualifying_taxable_value_from_montana_department_of_revenue_or_tax_bill");
  const millRate = numberAnswer(ctx, "total_mill_rate_for_the_property");
  const amountCents = taxableValueCents * 0.5 * millRate / 1000;
  return {
    amountCents: roundCurrencyCents(amountCents),
    trace: [`Montana abatement: ${taxableValueCents} qualifying taxable value cents * 50% * ${millRate} mills / 1000.`]
  };
}

function calculateConnecticutUniformSolarCapacityTax(rule, ctx) {
  const ptoDate = String(valueAnswer(ctx, "permission_to_operate_date_from_electric_distribution_company_or_municipal_electric_utility") || "");
  const capacityMw = firstNumber(
    numberAnswer(ctx, "system_nameplate_capacity_in_megawatts_including_fractional_megawatts"),
    objectAnswer(ctx, "municipal_tax_collector_due_dates_and_installment_schedule").taxable_nameplate_capacity_mw
  ) || 0;
  const generation = objectAnswer(ctx, "generated_load_and_confirmation_that_system_capacity_exceeds_the_load_for_the_location");
  const exclusionFlags = objectAnswer(ctx, "state_owned_land_brownfield_landfill_rooftop_canopy_and_critical_facility_microgrid_exclusion_flags");
  const bill = objectAnswer(ctx, "municipal_tax_collector_due_dates_and_installment_schedule");
  if (ptoDate < "2025-07-01" || capacityMw <= 1 || generation.capacity_exceeds_location_load === false || hasTrueExclusion(exclusionFlags)) {
    return zeroTrace("Connecticut uniform solar capacity tax does not apply for this tax year/system configuration.");
  }
  const amountCents = firstNumber(
    bill.official_form_or_tax_bill_tax_due_cents,
    bill.computed_annual_capacity_tax_cents_before_confirmation,
    capacityMw * 1000000
  ) || 0;
  return {
    amountCents: roundCurrencyCents(amountCents),
    trace: [`Connecticut uniform solar capacity tax liability: ${capacityMw} MW * 1,000,000 cents/MW unless official bill amount is supplied.`]
  };
}

function calculateBaltimoreCountyHighPerformanceCredit(rule, ctx) {
  const taxBaseCents = numberAnswer(ctx, "baltimore_county_real_property_tax_amount_attributable_to_the_qualifying_building_or_home");
  const applicationType = normalizeKey(valueAnswer(ctx, "application_type_high_performance_building_or_high_performance_home"));
  const certificationPath = normalizeKey(valueAnswer(ctx, "certification_path_leed_nc_leed_cs_leed_eb_leed_for_homes_national_green_building_standard_or_county_recognized_increased_efficiency_path"));
  const rating = normalizeKey(valueAnswer(ctx, "rating_level_silver_gold_platinum_emerald_or_certified_energy_efficiency_percentage"));
  const docs = objectAnswer(ctx, "documentation_from_an_energy_systems_professional_or_other_required_certifying_professional");
  const approval = objectAnswer(ctx, "application_filing_date_and_approval_status");
  const allocation = objectAnswer(ctx, "available_annual_program_cap_allocation");
  if (!docs.documentProvided || !isAffirmativeStatus(approval.approvalStatus, ["approved"]) || allocation.capAllocationAvailable !== true) {
    return zeroTrace("Baltimore County high-performance credit requires approval, certification documentation, and county cap allocation.");
  }
  const rate = baltimoreCountyRate(applicationType, certificationPath, rating);
  const rawCreditCents = Math.floor(taxBaseCents * rate);
  const amountCents = Math.min(rawCreditCents, taxBaseCents, numberOrNull(allocation.approvedAllocationCents) ?? rawCreditCents);
  return {
    amountCents: roundCurrencyCents(amountCents),
    trace: [`Baltimore County high-performance credit: ${taxBaseCents} county tax cents * rate ${rate}, capped by approved allocation.`]
  };
}

function calculatePrinceGeorgesGreenHighPerformanceCredit(rule, ctx) {
  const approval = objectAnswer(ctx, "county_application_approval_and_funding_availability");
  const noOverlap = objectAnswer(ctx, "confirmation_that_no_prohibited_overlapping_property_tax_credit_is_claimed_for_the_same_property_and_year");
  if (!isAffirmativeStatus(approval.applicationStatus, ["approved", "approved_subject_to_annual_budget_availability"]) || approval.fundingAvailabilityConfirmed !== true || noOverlap.confirmedNoOverlappingCredit === false) {
    return zeroTrace("Prince George's County credit requires approval, funding confirmation, and no prohibited overlapping credit.");
  }

  const allocation = objectAnswer(ctx, "allocation_of_county_tax_to_eligible_building_real_property_portion_personal_property_or_exclusively_used_portion");
  const term = objectAnswer(ctx, "credit_year_within_the_allowed_term");
  const certification = objectAnswer(ctx, "high_performance_certification_level_and_rating_system_if_applicable");
  const personal = objectAnswer(ctx, "current_county_personal_property_tax_bill_if_claiming_green_business_personal_property_credit");
  const year = Number(term.creditTermYear || term.year || 1);
  const approvedRate = fractionFromPercent(approval.approvedRatePercent);
  const track = normalizeKey(term.programTrack || approval.programTrack || certification.projectType || "");

  let baseCents = firstNumber(
    allocation.eligibleCountyRealPropertyTaxCents,
    objectAnswer(ctx, "current_county_real_property_tax_bill_and_county_only_tax_amount").countyOnlyRealPropertyTaxCents
  ) || 0;
  let rate = approvedRate ?? princeGeorgesHighPerformanceRate(certification, track, year);
  if (personal.claimingGreenBusinessPersonalPropertyCredit === true) {
    baseCents = firstNumber(personal.countyOnlyPersonalPropertyTaxCents, allocation.eligibleCountyPersonalPropertyTaxCents) || 0;
    rate = 0.5;
  }
  const documentedAmount = numberOrNull(approval.approvedCreditAmountCents);
  const amountCents = documentedAmount ?? Math.floor(baseCents * rate);
  return {
    amountCents: roundCurrencyCents(amountCents),
    trace: [`Prince George's County green/high-performance credit: ${baseCents} eligible county tax cents * rate ${rate}.`]
  };
}

function calculateAnneArundelEnergyHighPerformanceCredit(rule, ctx) {
  const taxBaseCents = numberAnswer(ctx, "county_tax_amount_attributable_to_the_dwelling_or_building_excluding_land");
  const remainingLiabilityCents = numberAnswer(ctx, "remaining_county_property_tax_liability_after_any_other_credits");
  const install = objectAnswer(ctx, "solar_or_geothermal_installation_date_and_final_inspection_date");
  const highPerformance = objectAnswer(ctx, "high_performance_rating_level_and_certification_documentation");
  const approvalYear = Number(valueAnswer(ctx, "application_approval_year_for_high_performance_building_credit"));
  const propertyClass = normalizeKey(valueAnswer(ctx, "high_performance_building_residential_or_commercial_classification"));
  const currentYear = Number(objectAnswer(ctx, "current_county_real_property_tax_bill").taxYear || new Date().getUTCFullYear());
  const otherCredits = objectAnswer(ctx, "other_county_credits_claimed_for_the_same_property_and_tax_year");

  if (highPerformance.hasCertification && Number.isFinite(approvalYear) && currentYear >= approvalYear && currentYear <= approvalYear + 4 && otherCredits.otherCountyCreditsClaimed !== true) {
    const rating = normalizeKey(`${highPerformance.ratingSystem || "leed"}_${highPerformance.ratingLevel || ""}`);
    const table = propertyClass === "commercial" ? ANNE_ARUNDEL_HP_COMMERCIAL : ANNE_ARUNDEL_HP_RESIDENTIAL;
    const { rate, capCents } = table[rating] || table[normalizeRatingFallback(highPerformance.ratingLevel)] || {};
    const amountCents = Math.min(Math.floor(taxBaseCents * Number(rate || 0)), Number(capCents || 0), remainingLiabilityCents || Number.POSITIVE_INFINITY);
    return {
      amountCents: roundCurrencyCents(amountCents),
      trace: [`Anne Arundel high-performance credit: ${taxBaseCents} eligible county tax cents * rate ${rate || 0}, capped at ${capCents || 0}.`]
    };
  }

  const technology = normalizeKey(install.technology);
  const isResidential = propertyClass.includes("residential");
  if (!isResidential || !["solar", "solar_photovoltaic", "geothermal"].some((token) => technology.includes(token))) {
    return zeroTrace("Anne Arundel solar/geothermal path is residential-only and no approved high-performance path is present.");
  }
  const paidCostCents = numberAnswer(ctx, "solar_or_geothermal_total_paid_cost_for_materials_installation_and_construction");
  const reductionsCents = numberAnswer(ctx, "federal_and_state_grants_and_state_solar_or_geothermal_tax_credits_applied_to_the_project");
  const amountCents = Math.min(Math.max(0, Math.floor(paidCostCents / 2) - reductionsCents), 250000, taxBaseCents, remainingLiabilityCents);
  return {
    amountCents: roundCurrencyCents(amountCents),
    trace: [`Anne Arundel residential ${technology} credit: min(50% of paid cost minus reductions, $2,500, eligible county tax, remaining liability).`]
  };
}

function calculateNewYorkRptl487Exemption(rule, ctx) {
  const filing = objectAnswer(ctx, "form_rp_487_filing_confirmation");
  const assessor = objectAnswer(ctx, "assessor_approval_and_assessor_approved_exempt_assessed_value");
  const rates = objectAnswer(ctx, "current_tax_rates_for_each_applicable_non_opt_out_taxing_jurisdiction");
  const pilot = objectAnswer(ctx, "pilot_notice_pilot_agreement_or_official_confirmation_that_no_pilot_is_required");
  const estimateYear = Number(rates.rateYear || assessor.assessmentRollYear || new Date().getUTCFullYear());
  if (filing.filed !== true || !isAffirmativeStatus(assessor.approvalStatus, ["approved"])) {
    return zeroTrace("New York RPTL 487 requires filed Form RP-487 and assessor approval.");
  }
  if (estimateYear < Number(assessor.exemptionTermStartYear || estimateYear) || estimateYear > Number(assessor.exemptionTermEndYear || estimateYear)) {
    return zeroTrace("New York RPTL 487 estimate year is outside the approved exemption term.");
  }
  const exemptCents = firstNumber(
    assessor.assessorApprovedExemptAssessedValueCents,
    objectAnswer(ctx, "incremental_cost_and_total_cost_if_the_rp_487_incremental_cost_calculation_applies").incrementalCostCents
  ) || 0;
  const rateRows = rates.nonOptOutJurisdictionRates || [];
  const grossCents = sum(rateRows, (row) =>
    row.appliesToSolarExemptAssessedValue === false ? 0 : roundCurrencyCents(exemptCents * Number(row.taxRatePerThousandAssessedValue || 0) / 1000)
  );
  const pilotCents = pilot.pilotRequired === true ? Math.min(numberOrNull(pilot.annualPilotPaymentCentsForEstimateYear) || 0, grossCents) : 0;
  return {
    amountCents: roundCurrencyCents(Math.max(0, grossCents - pilotCents)),
    trace: [`New York RPTL 487 exemption: ${exemptCents} exempt assessed value cents across ${rateRows.length} non-opt-out rate lines, less ${pilotCents} PILOT cents.`]
  };
}

function calculatePrinceGeorgesGreenBusinessCredit(rule, ctx) {
  const propertyType = normalizeKey(valueAnswer(ctx, "property_type"));
  const year = Number(valueAnswer(ctx, "credit_year_index"));
  const approval = objectAnswer(ctx, "application_approval_and_funding_status");
  const certification = objectAnswer(ctx, "green_business_certification");
  const noOverlap = booleanAnswer(ctx, "no_overlapping_credit_exemption");
  const exclusiveUse = numberAnswer(ctx, "exclusive_use_percentage");
  if (!isAffirmativeStatus(certification.status, ["certified"]) || !isAffirmativeStatus(approval.status, ["approved_funded"]) || noOverlap !== true || exclusiveUse < 100) {
    return zeroTrace("Prince George's Green Business credit requires certification, approved funded status, exclusive use, and no overlapping credit.");
  }
  const rates = propertyType.includes("personal")
    ? { 1: 0.5, 2: 0.5, 3: 0.5, 4: 0.5, 5: 0.5 }
    : { 1: 1, 2: 0.8, 3: 0.6, 4: 0.4, 5: 0.2 };
  const rate = rates[year] ?? 0;
  const baseCents = numberAnswer(ctx, "county_tax_on_eligible_property_portion");
  return {
    amountCents: roundCurrencyCents(baseCents * rate),
    trace: [`Prince George's Green Business credit: ${baseCents} eligible county tax cents * year ${year} ${propertyType} rate ${rate}.`]
  };
}

function calculateMichiganRerzAbatement(rule, ctx) {
  const designation = objectAnswer(ctx, "state_administrative_board_designation_or_official_designation_record");
  const msf = objectAnswer(ctx, "michigan_strategic_fund_recommendation_or_approval_documentation");
  const local = objectAnswer(ctx, "local_unit_consent_or_resolution");
  const boundary = objectAnswer(ctx, "confirmation_that_the_taxpayer_s_operation_is_inside_the_approved_geographic_boundary");
  const compliance = objectAnswer(ctx, "current_compliance_status_and_proof_taxpayer_is_current_with_state_and_local_taxes");
  const reporting = objectAnswer(ctx, "annual_reporting_or_program_documentation_status");
  const exclusions = objectAnswer(ctx, "exclusion_of_federal_taxes_local_bond_obligations_school_sinking_fund_special_assessments_sales_use_tax_and_non_exempt_taxes");
  if (
    !isAffirmativeStatus(designation.designationStatus, ["approved"]) ||
    !["recommended_to_state_administrative_board", "approved"].includes(normalizeKey(msf.recommendationOutcome)) ||
    !isAffirmativeStatus(local.consentStatus, ["approved"]) ||
    boundary.insideApprovedBoundary !== true ||
    compliance.stateTaxesCurrent !== true ||
    compliance.localTaxesCurrent !== true ||
    !["active", "active_in_good_standing"].includes(normalizeKey(reporting.programStatus)) ||
    exclusions.excludedCategoriesConfirmed !== true
  ) {
    return zeroTrace("Michigan RERZ requires official approval, boundary, compliance, reporting, and excluded-tax-line gates.");
  }

  const phaseout = objectAnswer(ctx, "phaseout_schedule_or_applicable_multiplier");
  const multiplier = clamp01(firstNumber(phaseout.abatementMultiplierForEligibleTaxLines, deriveRerzMultiplier(objectAnswer(ctx, "term_start_date_term_end_date_and_current_zone_year"))) ?? 0);
  const taxLines = objectAnswer(ctx, "tax_bills_returns_or_assessor_treasury_documents_identifying_eligible_tax_lines");
  const amountCents = sum(taxLines.eligibleLines || [], (line) => {
    if (line.eligible === false) return 0;
    const before = firstNumber(line.taxBeforeRerzCents, line.amountCents) || 0;
    const after = numberOrNull(line.taxAfterRerzCents);
    return after !== null ? Math.max(0, before - after) : Math.min(before, before * multiplier);
  });
  return {
    amountCents: roundCurrencyCents(amountCents),
    trace: [`Michigan RERZ abatement: summed eligible tax-line savings using multiplier ${multiplier}.`]
  };
}

function resultForRule(rule, calculated, ctx = {}) {
  const includedInUserFacingTotal =
    rule.includeInUserFacingTotalDefault === true ||
    ctx.includeCalculatedTaxInUserFacingTotals === true;

  return {
    taxRuleId: rule.taxRuleId || null,
    sourceSkippedRecordId: rule.sourceSkippedRecordId || null,
    status: "calculated",
    amountCents: Math.round(calculated.amountCents || 0),
    includedInUserFacingTotal,
    missingInputs: [],
    trace: [
      ...(calculated.trace || []),
      includedInUserFacingTotal
        ? "Tax-gap rule is configured for customer-facing totals."
        : "Tax-gap rule remains internal-only until required source, tax-return, certificate, and user inputs are present and intentionally included."
    ]
  };
}

const ANNE_ARUNDEL_HP_RESIDENTIAL = {
  leed_silver: { rate: 0.4, capCents: 100000 },
  ngbs_silver: { rate: 0.4, capCents: 100000 },
  leed_gold: { rate: 0.6, capCents: 200000 },
  ngbs_gold: { rate: 0.6, capCents: 200000 },
  leed_platinum: { rate: 0.8, capCents: 300000 },
  ngbs_emerald: { rate: 0.8, capCents: 300000 },
  silver: { rate: 0.4, capCents: 100000 },
  gold: { rate: 0.6, capCents: 200000 },
  platinum: { rate: 0.8, capCents: 300000 },
  emerald: { rate: 0.8, capCents: 300000 }
};

const ANNE_ARUNDEL_HP_COMMERCIAL = {
  leed_silver: { rate: 0.4, capCents: 2000000 },
  ngbs_silver: { rate: 0.4, capCents: 2000000 },
  leed_gold: { rate: 0.6, capCents: 4000000 },
  ngbs_gold: { rate: 0.6, capCents: 4000000 },
  leed_platinum: { rate: 0.8, capCents: 6000000 },
  ngbs_emerald: { rate: 0.8, capCents: 6000000 },
  silver: { rate: 0.4, capCents: 2000000 },
  gold: { rate: 0.6, capCents: 4000000 },
  platinum: { rate: 0.8, capCents: 6000000 },
  emerald: { rate: 0.8, capCents: 6000000 }
};

function blockedResult(rule, status, reasons = []) {
  return {
    taxRuleId: rule?.taxRuleId || null,
    sourceSkippedRecordId: rule?.sourceSkippedRecordId || null,
    status,
    amountCents: 0,
    includedInUserFacingTotal: false,
    missingInputs: [],
    trace: reasons
  };
}

function missingRequiredInputs(rule, ctx) {
  return (rule.canonicalInputRequirements || [])
    .filter((input) => input.missingSeverity !== "optional")
    .filter((input) => !hasRuntimeAnswer(ctx, input.inputKey))
    .map((input) => ({
      inputKey: input.inputKey,
      label: input.label || input.inputKey,
      sourceStrategy: input.sourceStrategy || null,
      uiPlacement: input.uiPlacement || null
    }));
}

function requiredTrueGateResult(rule, ctx) {
  const model = rule.calculationModel || {};
  for (const inputKey of model.requiredTrueInputs || []) {
    const value = booleanAnswer(ctx, inputKey);
    if (value === false) {
      return {
        taxRuleId: rule.taxRuleId || null,
        sourceSkippedRecordId: rule.sourceSkippedRecordId || null,
        status: "zero_value",
        amountCents: 0,
        includedInUserFacingTotal: false,
        missingInputs: [],
        trace: [`Required gate ${inputKey} is false, so tax value is zero.`]
      };
    }
  }
  return null;
}

function costCapPerSquareFoot(model, projectType) {
  const table = model.costCapCentsPerSquareFootByProjectType || {};
  return Number(table[projectType] ?? table.default ?? 0);
}

function greenBuildingBaseRate(model, projectType, certificationLevel) {
  const key = `${projectType}:${certificationLevel}`;
  const table = model.baseRateByProjectAndCertification || {};
  return Number(table[key] ?? table[certificationLevel] ?? 0);
}

function zeroTrace(reason) {
  return {
    amountCents: 0,
    trace: [reason]
  };
}

function hasRuntimeAnswer(ctx, key) {
  if (!key) return true;
  if (hasAnswer(ctx.answers || {}, key)) return true;
  return ctx[key] !== undefined && ctx[key] !== null && ctx[key] !== "";
}

function valueAnswer(ctx, key) {
  if (!key) return null;
  if (hasAnswer(ctx.answers || {}, key)) return answerValue(ctx.answers, key);
  if (ctx[key] !== undefined && ctx[key] !== null && ctx[key] !== "") return ctx[key];
  return null;
}

function numberAnswer(ctx, key) {
  const value = Number(valueAnswer(ctx, key));
  return Number.isFinite(value) ? value : 0;
}

function objectAnswer(ctx, key) {
  const value = valueAnswer(ctx, key);
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function booleanAnswer(ctx, key) {
  const value = valueAnswer(ctx, key);
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  const normalized = String(value || "").trim().toLowerCase();
  if (["true", "yes", "y", "1", "approved", "confirmed", "filed", "eligible"].includes(normalized)) return true;
  if (["false", "no", "n", "0", "not_approved", "not_confirmed", "not_filed", "ineligible"].includes(normalized)) return false;
  return null;
}

function fractionAnswer(ctx, key, fallback) {
  if (!key || !hasRuntimeAnswer(ctx, key)) return fallback;
  const number = numberAnswer(ctx, key);
  if (!Number.isFinite(number)) return fallback;
  return number > 1 ? number / 100 : number;
}

function taxRateAnswer(ctx, key) {
  const rate = numberAnswer(ctx, key);
  return rate > 1 ? rate / 100 : rate;
}

function taxRate(value) {
  const rate = Number(value || 0);
  if (!Number.isFinite(rate)) return 0;
  return rate > 1 ? rate / 100 : rate;
}

function numberOrNull(value) {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function firstNumber(...values) {
  for (const value of values) {
    const number = numberOrNull(value);
    if (number !== null) return number;
  }
  return null;
}

function roundCurrencyCents(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(Math.max(0, number)) : 0;
}

function isAffirmativeStatus(value, allowed = ["approved", "certified", "confirmed"]) {
  return allowed.includes(normalizeKey(value));
}

function programDocumentPresent(ctx, key) {
  const value = valueAnswer(ctx, key);
  if (value === true) return true;
  if (value && typeof value === "object") {
    return value.present === true || value.verified === true || value.status === "present" || value.status === "verified";
  }
  return false;
}

function hasTrueExclusion(flags = {}) {
  return [
    "state_owned_land",
    "brownfield",
    "landfill",
    "residential_rooftop",
    "commercial_rooftop",
    "industrial_rooftop",
    "rooftop",
    "parking_canopy",
    "solar_canopy",
    "critical_facility_microgrid"
  ].some((key) => flags[key] === true);
}

function baltimoreCountyRate(applicationType, certificationPath, rating) {
  const rates = {
    leed_nc: { silver: 0.5, gold: 0.6, platinum: 0.8 },
    leed_cs: { silver: 0.4, gold: 0.5, platinum: 0.7 },
    leed_eb: { silver: 0.1, gold: 0.25, platinum: 0.5 },
    ngbs_building: { silver: 0.5, gold: 0.6, emerald: 0.8 },
    leed_for_homes: { silver: 0.4, gold: 0.6, platinum: 1 },
    ngbs_home: { silver: 0.4, gold: 0.6, emerald: 1 }
  };
  if (rates[certificationPath]?.[rating] !== undefined) return rates[certificationPath][rating];
  if (applicationType.includes("home")) {
    return { silver: 0.4, gold: 0.6, platinum: 1, emerald: 1 }[rating] || 0;
  }
  return { silver: 0.4, gold: 0.6, platinum: 0.8, emerald: 0.8 }[rating] || 0;
}

function princeGeorgesHighPerformanceRate(certification = {}, track = "", year = 1) {
  if (year < 1 || year > 5) return 0;
  const level = normalizeKey(certification.certificationLevel || certification.ratingLevel);
  if (track.includes("existing") || track.includes("o_m") || track.includes("operations")) {
    if (year > 3) return 0;
    return { silver: 0.1, gold: 0.25, platinum: 0.5 }[level] || 0;
  }
  return { silver: 0.25, gold: 0.5, platinum: 0.75, emerald: 0.75 }[level] || 0;
}

function fractionFromPercent(value) {
  const number = numberOrNull(value);
  if (number === null) return null;
  return number > 1 ? number / 100 : number;
}

function normalizeRatingFallback(value) {
  return normalizeKey(value).replace(/^leed_/, "").replace(/^ngbs_/, "");
}

function deriveRerzMultiplier(term = {}) {
  if (term.termStatus && normalizeKey(term.termStatus) !== "active") return 0;
  const approvedTermYears = Number(term.approvedTermYears || 15);
  const currentZoneYear = Number(term.currentZoneYear || 1);
  const remainingYearsIncludingCurrent = approvedTermYears - currentZoneYear + 1;
  if (remainingYearsIncludingCurrent <= 0) return 0;
  if (remainingYearsIncludingCurrent === 1) return 0.25;
  if (remainingYearsIncludingCurrent === 2) return 0.5;
  if (remainingYearsIncludingCurrent === 3) return 0.75;
  return 1;
}

function clamp01(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(1, Math.max(0, number));
}

function sum(rows, selector) {
  return (Array.isArray(rows) ? rows : []).reduce((total, row) => total + Number(selector(row) || 0), 0);
}

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
