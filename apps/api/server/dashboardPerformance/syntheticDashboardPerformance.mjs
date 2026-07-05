import {
  DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION,
  DASHBOARD_REPORTING_PERIOD,
  DASHBOARD_SYNTHETIC_SOURCE,
  validateDashboardPostImplementationDataset
} from "./schemas.mjs";

const MONTHS = [
  "2025-07",
  "2025-08",
  "2025-09",
  "2025-10",
  "2025-11",
  "2025-12",
  "2026-01",
  "2026-02",
  "2026-03",
  "2026-04",
  "2026-05",
  "2026-06"
];

const ARCHETYPE_CONFIG = {
  empty_new_user: { minRetrofits: 0, maxRetrofits: 0, minSavings: 0, maxSavings: 0 },
  single_site_smb: { minRetrofits: 2, maxRetrofits: 5, minSavings: 200000, maxSavings: 3000000 },
  restaurant_commercial_kitchen: { minRetrofits: 3, maxRetrofits: 6, minSavings: 300000, maxSavings: 2500000 },
  grocery_small_market: { minRetrofits: 4, maxRetrofits: 8, minSavings: 800000, maxSavings: 6000000 },
  laundromat: { minRetrofits: 3, maxRetrofits: 6, minSavings: 500000, maxSavings: 3500000 },
  small_hotel_motel: { minRetrofits: 5, maxRetrofits: 9, minSavings: 1500000, maxSavings: 15000000 },
  multifamily_property_manager: { minRetrofits: 4, maxRetrofits: 10, minSavings: 1000000, maxSavings: 12000000 },
  warehouse_light_industrial: { minRetrofits: 4, maxRetrofits: 8, minSavings: 2000000, maxSavings: 25000000 },
  cold_storage_food_distribution: { minRetrofits: 5, maxRetrofits: 9, minSavings: 2500000, maxSavings: 35000000 },
  industrial_manufacturing: { minRetrofits: 6, maxRetrofits: 12, minSavings: 10000000, maxSavings: 500000000 },
  public_nonprofit_community: { minRetrofits: 6, maxRetrofits: 12, minSavings: 5000000, maxSavings: 80000000 },
  certification_heavy: { minRetrofits: 6, maxRetrofits: 12, minSavings: 3000000, maxSavings: 60000000 },
  portfolio_multi_site: { minRetrofits: 6, maxRetrofits: 12, minSavings: 10000000, maxSavings: 150000000 }
};

const IMPLEMENTATION_STATUSES = ["completed", "operational", "tracking", "installed", "implemented"];
const CERT_REQUIREMENT_CATEGORIES = ["energy", "water", "waste", "operations", "documentation", "transportation"];

export function buildSyntheticDashboardPostImplementationDataset(testCase, options = {}) {
  const testCaseId = cleanId(testCase?.sampleUserId || testCase?.id || "unknown-test-case");
  const now = options.now || "2026-07-04T12:00:00.000Z";
  const archetype = inferDashboardArchetype(testCase);
  const rng = seededRng(testCaseId);
  const property = buildPropertyRecord(testCase, archetype);
  const retrofits = selectImplementedRetrofitCandidates(testCase?.retrofits || [], archetype, rng);
  const implementedRetrofits = [];
  const monthlyPerformanceRecords = [];
  const incentivePerformanceRecords = [];
  const documentRecords = [];

  let globalCumulativeIncentives = 0;
  for (const [index, sourceRetrofit] of retrofits.entries()) {
    const retrofit = buildImplementedRetrofit(testCaseId, property, sourceRetrofit, archetype, index, rng, now);
    implementedRetrofits.push(retrofit);
    const incentiveRecords = buildIncentiveRecords(testCaseId, property.id, retrofit, sourceRetrofit, index, rng);
    incentivePerformanceRecords.push(...incentiveRecords);
    const monthly = buildMonthlyRecords(testCaseId, property, retrofit, index, rng, globalCumulativeIncentives);
    monthlyPerformanceRecords.push(...monthly.records);
    globalCumulativeIncentives += monthly.incentivesReceivedDuringPeriod;
    documentRecords.push(...buildDocumentRecords(testCaseId, property.id, retrofit, incentiveRecords, index, rng));
  }

  const certificationRecords = buildCertificationRecords(testCaseId, property.id, archetype, implementedRetrofits, rng);
  const certificationRequirements = buildCertificationRequirements(testCaseId, certificationRecords, implementedRetrofits, rng);
  documentRecords.push(...buildCertificationDocumentRecords(testCaseId, property.id, certificationRecords, certificationRequirements, rng));
  const nextBestActions = buildNextBestActions(testCaseId, property.id, implementedRetrofits, incentivePerformanceRecords, documentRecords, certificationRecords, certificationRequirements, rng);
  const validation = validateDashboardPostImplementationDataset({
    schemaVersion: DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION,
    testCaseId,
    properties: [property],
    implementedRetrofits,
    monthlyPerformanceRecords,
    incentivePerformanceRecords,
    documentRecords,
    certificationRecords,
    certificationRequirements,
    nextBestActions,
    reportingPeriod: DASHBOARD_REPORTING_PERIOD
  });

  return {
    schemaVersion: DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION,
    testCaseId,
    businessId: `admin_test_${testCaseId}`,
    userId: testCaseId,
    isSynthetic: true,
    syntheticSource: DASHBOARD_SYNTHETIC_SOURCE,
    archetype,
    generatedAt: now,
    updatedAt: now,
    reportingPeriod: DASHBOARD_REPORTING_PERIOD,
    properties: [property],
    implementedRetrofits,
    monthlyPerformanceRecords,
    incentivePerformanceRecords,
    documentRecords,
    certificationRecords,
    certificationRequirements,
    nextBestActions,
    dataQuality: {
      status: validation.errors.length ? "invalid" : implementedRetrofits.length ? validation.warnings.length ? "partial" : "complete" : "empty",
      notes: implementedRetrofits.length
        ? [`Synthetic admin/test-case dashboard data for ${implementedRetrofits.length} implemented retrofit(s).`]
        : ["No suitable retrofit estimates were available for synthetic implemented performance."],
      warnings: [...validation.errors, ...validation.warnings]
    }
  };
}

export function inferDashboardArchetype(testCase) {
  const text = [
    testCase?.sampleUserId,
    testCase?.description,
    testCase?.sourceForm?.companyName,
    testCase?.sourceForm?.organizationType,
    testCase?.sourceForm?.buildingType,
    testCase?.sourceForm?.primaryActivityText
  ].filter(Boolean).join(" ").toLowerCase();
  if (!testCase?.retrofits?.length) return "empty_new_user";
  if (/hotel|motel|lodging|hospitality|westin/.test(text)) return "small_hotel_motel";
  if (/grocery|market|co-op|convenience|cold storage|refrigerated|produce distribution|food bank/.test(text)) {
    return /cold storage|distribution|warehouse|food bank/.test(text) ? "cold_storage_food_distribution" : "grocery_small_market";
  }
  if (/restaurant|kitchen|cafe|deli|brewery|taproom|food service/.test(text)) return "restaurant_commercial_kitchen";
  if (/laundromat|laundry/.test(text)) return "laundromat";
  if (/multifamily|apartment|housing|renter|condo|property manager/.test(text)) return "multifamily_property_manager";
  if (/warehouse|logistics|distribution|fulfillment/.test(text)) return "warehouse_light_industrial";
  if (/factory|manufacturing|industrial|plant|semiconductor|aerospace|automotive|milling/.test(text)) return "industrial_manufacturing";
  if (/campus|university|school|library|public|government|nonprofit|community|health|hospital/.test(text)) return "public_nonprofit_community";
  if (/leed|certification|green business|benchmarking/.test(text)) return "certification_heavy";
  if (/portfolio|multi-site|multiple/.test(text)) return "portfolio_multi_site";
  return "single_site_smb";
}

function buildPropertyRecord(testCase, archetype) {
  const source = testCase?.sourceForm || {};
  const energy = source.siteEnergyProfile || {};
  const electric = utilitySummary(energy, "electric");
  const gas = utilitySummary(energy, "gas");
  const water = utilitySummary(energy, "water_sewer");
  const addressParts = parseAddress(source.siteAddress || "");
  const annualElectricCost = centsFromDollars(energy.annualElectricCost ?? electric?.annualCost);
  const annualGasCost = centsFromDollars(gas?.annualCost);
  const annualWaterCost = centsFromDollars(water?.annualCost);
  return {
    id: `${cleanId(testCase?.sampleUserId || "test-case")}:primary-property`,
    testCaseId: cleanId(testCase?.sampleUserId || "test-case"),
    name: source.companyName || testCase?.sampleUserId || "Primary property",
    address: source.siteAddress || null,
    city: addressParts.city,
    state: addressParts.state,
    zip: addressParts.zip,
    propertyType: archetype,
    buildingType: source.buildingType || null,
    squareFootage: numberFromText(source.squareFootage),
    ownershipType: source.ownershipStatus || null,
    utilityProvider: source.electricUtilityProvider || electric?.latestUtilityProvider || energy.latestUtilityProvider || null,
    gasProvider: source.gasUtilityProvider || gas?.latestUtilityProvider || null,
    waterProvider: water?.latestUtilityProvider || null,
    operatingHours: operatingHoursForArchetype(archetype),
    numberOfSites: archetype === "portfolio_multi_site" ? 3 : 1,
    baselineAnnualElectricityKwh: numberOrNull(energy.annualKwh ?? electric?.annualUsage),
    baselineAnnualGasTherms: numberOrNull(gas?.annualUsage),
    baselineAnnualWaterGallons: numberOrNull(water?.annualUsage),
    baselineAnnualUtilityCostCents: sumNumbers([annualElectricCost, annualGasCost, annualWaterCost]),
    averageElectricRate: numberOrNull(energy.averageCostPerKwh ?? electric?.averageUnitCost),
    averageGasRate: numberOrNull(gas?.averageUnitCost),
    averageWaterRate: numberOrNull(water?.averageUnitCost),
    emissionsFactorElectricityKgCO2ePerKwh: emissionsFactorForState(addressParts.state),
    emissionsFactorGasKgCO2ePerTherm: 5.31,
    baselineMethod: energy.monthlySummaries?.length ? "uploaded_test_case_utility_profile" : "modeled_from_annual_totals",
    weatherNormalized: true
  };
}

function selectImplementedRetrofitCandidates(retrofits, archetype, rng) {
  const config = ARCHETYPE_CONFIG[archetype] || ARCHETYPE_CONFIG.single_site_smb;
  if (!config.maxRetrofits) return [];
  const eligible = retrofits
    .filter((retrofit) => retrofit?.savingsPreview?.status === "calculated")
    .filter((retrofit) => !/audit|study|certification|benchmarking/i.test(retrofit.retrofitTypeId || ""))
    .sort((left, right) => scoreRetrofit(right) - scoreRetrofit(left));
  const count = Math.min(eligible.length, integerBetween(rng, config.minRetrofits, config.maxRetrofits));
  return eligible.slice(0, count);
}

function buildImplementedRetrofit(testCaseId, property, sourceRetrofit, archetype, index, rng, now) {
  const preview = sourceRetrofit.savingsPreview || {};
  const estimatedProjectCostCents = positiveCents(preview.upfrontCostCents) || fallbackProjectCost(archetype, rng);
  const estimatedIncentivesCents = Math.max(0, positiveCents(preview.upfrontSavingsCents) || Math.round(estimatedProjectCostCents * decimalBetween(rng, 0.04, 0.18)));
  const estimatedNetCostCents = positiveCents(preview.upfrontCostAfterSavingsCents) || Math.max(0, estimatedProjectCostCents - estimatedIncentivesCents);
  const estimateSavings = positiveCents(preview.netAnnualRecurringSavingsCents) || positiveCents(preview.annualSavingsCents) || fallbackAnnualSavings(archetype, rng);
  const actualProjectCostCents = Math.round(estimatedProjectCostCents * decimalBetween(rng, 0.88, 1.18));
  const actualAnnualSavingsCents = Math.round(estimateSavings * decimalBetween(rng, 0.78, 1.22));
  const approved = Math.round(estimatedIncentivesCents * decimalBetween(rng, 0.82, 1.04));
  const status = IMPLEMENTATION_STATUSES[index % IMPLEMENTATION_STATUSES.length];
  const operationalMonthIndex = Math.min(8, Math.max(0, index));
  const operationalDate = `${MONTHS[operationalMonthIndex]}-15`;
  const receivedRatio = status === "installed" || status === "implemented" ? 0.25 : status === "operational" ? 0.55 : 0.78;
  const incentivesReceivedCents = Math.round(approved * receivedRatio);
  const incentivesPendingCents = Math.max(0, approved - incentivesReceivedCents);
  const incentivesNotClaimedCents = index % 5 === 3 ? Math.round(estimatedIncentivesCents * 0.18) : 0;
  const actualNetCostCents = Math.max(0, actualProjectCostCents - incentivesReceivedCents);
  const impacts = impactForRetrofit(sourceRetrofit, property, actualAnnualSavingsCents, estimateSavings);
  const paybackYears = actualAnnualSavingsCents > 0 ? actualNetCostCents / actualAnnualSavingsCents : null;
  const selectedOpportunityIds = preview.selectedIncentiveScenario?.opportunityIds || [];
  return {
    id: `${testCaseId}:${sourceRetrofit.retrofitTypeId}:implemented`,
    testCaseId,
    businessId: `admin_test_${testCaseId}`,
    userId: testCaseId,
    propertyId: property.id,
    siteId: property.id,
    retrofitId: sourceRetrofit.retrofitTypeId,
    sourceEstimateId: sourceRetrofit.retrofitTypeId,
    name: sourceRetrofit.displayName,
    category: sourceRetrofit.parentCategory,
    description: `${sourceRetrofit.displayName} installed for the synthetic admin/test-case payoff tracker.`,
    status,
    implementationStage: status === "completed" ? "verified" : status === "tracking" ? "measurement_and_verification" : "post_install",
    implementedDate: dateShift(operationalDate, -20),
    installedDate: dateShift(operationalDate, -10),
    operationalDate,
    verificationDate: status === "completed" || status === "tracking" ? dateShift(operationalDate, 45) : null,
    lastUpdated: now,
    contractorName: contractorName(index),
    contractorLicense: `SYN-${String(24000 + index * 137).padStart(5, "0")}`,
    permitStatus: index % 4 === 0 ? "not_required" : "closed",
    inspectionStatus: status === "installed" ? "scheduled" : "passed",
    commissioningStatus: status === "installed" ? "pending" : "complete",
    estimatedProjectCostCents,
    actualProjectCostCents,
    costVariancePercent: percentDelta(actualProjectCostCents, estimatedProjectCostCents),
    estimatedNetCostCents,
    actualNetCostCents,
    estimatedIncentivesCents,
    incentivesApprovedCents: approved,
    incentivesReceivedCents,
    incentivesPendingCents,
    incentivesNotClaimedCents,
    incentiveReceivedDate: incentivesReceivedCents > 0 ? dateShift(operationalDate, 75) : null,
    estimatedAnnualSavingsCents: estimateSavings,
    actualAnnualSavingsCents,
    estimatedMonthlySavingsCents: Math.round(estimateSavings / 12),
    actualMonthlySavingsCents: Math.round(actualAnnualSavingsCents / 12),
    energySavingsCents: Math.round(actualAnnualSavingsCents * 0.86),
    maintenanceSavingsCents: Math.round(actualAnnualSavingsCents * maintenanceShareForRetrofit(sourceRetrofit)),
    taxBenefitCents: Math.round(actualProjectCostCents * taxShareForRetrofit(sourceRetrofit)),
    estimatedPaybackYears: estimateSavings > 0 ? estimatedNetCostCents / estimateSavings : null,
    actualPaybackYears: paybackYears,
    paybackProgressPercent: paybackYears ? Math.min(100, Math.round((1 / paybackYears) * 100)) : 0,
    estimatedROI: estimateSavings > 0 && estimatedNetCostCents > 0 ? (estimateSavings / estimatedNetCostCents) * 100 : null,
    actualROI: actualAnnualSavingsCents > 0 && actualNetCostCents > 0 ? (actualAnnualSavingsCents / actualNetCostCents) * 100 : null,
    ...impacts,
    affectedLoadType: loadTypeForRetrofit(sourceRetrofit),
    measureType: measureTypeForRetrofit(sourceRetrofit),
    equipmentQuantity: integerBetween(rng, 4, archetype === "industrial_manufacturing" ? 90 : 28),
    systemSize: systemSizeForRetrofit(sourceRetrofit, property, rng),
    baselineEquipment: baselineEquipmentForRetrofit(sourceRetrofit),
    installedEquipment: installedEquipmentForRetrofit(sourceRetrofit),
    dataSource: status === "completed" || status === "tracking" ? "mixed" : "synthetic_admin_test_case",
    confidencePercent: status === "completed" || status === "tracking" ? integerBetween(rng, 88, 96) : status === "operational" ? integerBetween(rng, 75, 88) : integerBetween(rng, 65, 75),
    measurementMethod: "Synthetic M&V using test-case baseline, modeled post-install utility deltas, and deterministic seasonality.",
    baselineMethod: property.baselineMethod,
    weatherNormalized: true,
    selectedOpportunityIds,
    selectedScenarioId: preview.selectedIncentiveScenario?.id || "source-backed-estimate",
    relatedApplicationIds: selectedOpportunityIds.map((id) => `application:${id}`),
    relatedDocumentIds: [],
    certificationContributions: certificationContributionsForRetrofit(sourceRetrofit),
    notes: ["Synthetic admin/test-case performance record. Not production-verified customer data."]
  };
}

function buildMonthlyRecords(testCaseId, property, retrofit, index, rng, startingCumulativeIncentives) {
  let cumulativeSavings = 0;
  let incentivesReceivedDuringPeriod = 0;
  const fullMonthlySavings = Math.max(0, Math.round(retrofit.actualAnnualSavingsCents / 12));
  const operationalMonth = String(retrofit.operationalDate || "").slice(0, 7);
  const operationalIndex = MONTHS.indexOf(operationalMonth);
  const records = MONTHS.map((month, monthIndex) => {
    const isOperational = operationalIndex >= 0 && monthIndex >= operationalIndex;
    const monthsSinceStart = isOperational ? monthIndex - operationalIndex : -1;
    const ramp = !isOperational ? 0 : monthsSinceStart === 0 ? decimalBetween(rng, 0.4, 0.6) : monthsSinceStart === 1 ? decimalBetween(rng, 0.7, 0.9) : decimalBetween(rng, 0.92, 1.08);
    const seasonal = seasonalityForRetrofit(retrofit, monthIndex);
    const actualSavingsCents = Math.max(0, Math.round(fullMonthlySavings * ramp * seasonal));
    cumulativeSavings += actualSavingsCents;
    const payoutMonth = retrofit.incentiveReceivedDate?.slice(0, 7);
    const incentiveThisMonth = payoutMonth === month ? Number(retrofit.incentivesReceivedCents || 0) : 0;
    incentivesReceivedDuringPeriod += incentiveThisMonth;
    const cumulativeIncentivesReceivedCents = startingCumulativeIncentives + incentivesReceivedDuringPeriod;
    const electricitySaved = isOperational ? Math.round((retrofit.actualKwhSavedPerYear || 0) / 12 * ramp * seasonal) : 0;
    const thermsSaved = isOperational ? Math.round((retrofit.actualThermsSavedPerYear || 0) / 12 * ramp * seasonal) : 0;
    const waterSaved = isOperational ? Math.round((retrofit.actualWaterSavedGallonsPerYear || 0) / 12 * ramp * seasonal) : 0;
    const co2eSaved = isOperational ? Math.round((retrofit.actualCO2eReducedKgPerYear || 0) / 12 * ramp * seasonal) : 0;
    const baselineElectricity = monthlyBaseline(property.baselineAnnualElectricityKwh, monthIndex, "electric");
    const baselineGas = monthlyBaseline(property.baselineAnnualGasTherms, monthIndex, "gas");
    const baselineWater = monthlyBaseline(property.baselineAnnualWaterGallons, monthIndex, "water");
    const baselineCost = monthlyBaseline(property.baselineAnnualUtilityCostCents, monthIndex, "cost");
    return {
      id: `${retrofit.id}:month:${month}`,
      testCaseId,
      businessId: `admin_test_${testCaseId}`,
      userId: testCaseId,
      propertyId: property.id,
      siteId: property.id,
      retrofitPerformanceId: retrofit.id,
      month,
      baselineElectricityKwh: baselineElectricity,
      actualElectricityKwh: Math.max(0, baselineElectricity - electricitySaved),
      estimatedElectricityKwh: Math.max(0, baselineElectricity - Math.round((retrofit.estimatedKwhSavedPerYear || 0) / 12)),
      baselineGasTherms: baselineGas,
      actualGasTherms: Math.max(0, baselineGas - thermsSaved),
      estimatedGasTherms: Math.max(0, baselineGas - Math.round((retrofit.estimatedThermsSavedPerYear || 0) / 12)),
      baselineWaterGallons: baselineWater,
      actualWaterGallons: Math.max(0, baselineWater - waterSaved),
      estimatedWaterGallons: Math.max(0, baselineWater - Math.round((retrofit.estimatedWaterSavedGallonsPerYear || 0) / 12)),
      baselineUtilityCostCents: baselineCost,
      actualUtilityCostCents: Math.max(0, baselineCost - actualSavingsCents),
      estimatedUtilityCostCents: Math.max(0, baselineCost - Math.round(retrofit.estimatedAnnualSavingsCents / 12)),
      estimatedSavingsCents: isOperational ? Math.round(retrofit.estimatedAnnualSavingsCents / 12 * ramp * seasonal) : 0,
      actualSavingsCents,
      cumulativeSavingsCents: cumulativeSavings,
      cumulativeIncentivesReceivedCents,
      cumulativeNetBenefitCents: cumulativeSavings + cumulativeIncentivesReceivedCents - retrofit.actualProjectCostCents,
      actualCO2eReducedKg: co2eSaved,
      estimatedCO2eReducedKg: isOperational ? Math.round((retrofit.estimatedCO2eReducedKgPerYear || 0) / 12 * ramp * seasonal) : 0,
      dataSource: "synthetic_admin_test_case",
      notes: isOperational ? "Synthetic post-install monthly performance." : "Before operational date; no savings counted."
    };
  });
  return { records, incentivesReceivedDuringPeriod };
}

function buildIncentiveRecords(testCaseId, propertyId, retrofit, sourceRetrofit, index, rng) {
  const selected = sourceRetrofit.savingsPreview?.selectedIncentiveScenario?.opportunityIds || [];
  if (!retrofit.estimatedIncentivesCents && selected.length === 0) return [];
  const opportunity = sourceRetrofit.opportunities?.find((item) => selected.includes(item.opportunityId)) || sourceRetrofit.opportunities?.[0] || null;
  const status = retrofit.incentivesReceivedCents > 0 && retrofit.incentivesPendingCents === 0
    ? "received"
    : retrofit.incentivesPendingCents > 0
      ? index % 4 === 0 ? "pending" : "approved"
      : "not_claimed";
  return [{
    id: `${retrofit.id}:incentive:${opportunity?.opportunityId || "synthetic"}`,
    testCaseId,
    businessId: `admin_test_${testCaseId}`,
    userId: testCaseId,
    propertyId,
    siteId: propertyId,
    retrofitPerformanceId: retrofit.id,
    opportunityId: opportunity?.opportunityId || null,
    programName: opportunity?.opportunityName || `${retrofit.name} implementation rebate`,
    provider: opportunity?.sourceSummary?.administrator || opportunity?.sourceSummary?.sourceName || "Utility / program administrator",
    incentiveType: incentiveTypeFromProgram(opportunity?.sourceSummary?.programType),
    status,
    estimatedAmountCents: retrofit.estimatedIncentivesCents,
    approvedAmountCents: retrofit.incentivesApprovedCents,
    receivedAmountCents: retrofit.incentivesReceivedCents,
    pendingAmountCents: retrofit.incentivesPendingCents,
    notClaimedAmountCents: retrofit.incentivesNotClaimedCents,
    applicationDate: dateShift(retrofit.installedDate, -25),
    approvalDate: status === "approved" || status === "pending" || status === "received" ? dateShift(retrofit.installedDate, 22) : null,
    payoutDate: retrofit.incentiveReceivedDate,
    deadline: dateShift(retrofit.operationalDate, 180),
    requiredDocuments: ["invoice", "proof_of_purchase", "completion_photo"],
    missingDocuments: status === "not_claimed" || status === "pending" ? ["post_install_utility_bill"] : [],
    blockerReason: status === "not_claimed" ? "Application package has not been submitted." : status === "pending" ? "Awaiting final utility/program review." : null,
    sourceUrl: opportunity?.sourceUrl || opportunity?.applicationUrl || null,
    notes: ["Synthetic incentive tracking record linked to existing opportunity where available."],
    dataSource: "synthetic_admin_test_case"
  }];
}

function buildDocumentRecords(testCaseId, propertyId, retrofit, incentives, index) {
  const base = [
    ["invoice", "Contractor invoice", "verified", "contractor", "incentive"],
    ["proof_of_purchase", "Proof of purchase", index % 7 === 2 ? "needs_update" : "verified", "customer", "incentive"],
    ["completion_photo", "Completion photo", index % 5 === 1 ? "uploaded" : "verified", "contractor", "certification"],
    ["utility_bill", "Post-install utility bill", index % 4 === 1 ? "missing" : "uploaded", "customer", "measurement"],
    ["permit", "Permit closeout", retrofit.permitStatus === "not_required" ? "verified" : "uploaded", "contractor", "audit"],
    ["commissioning_report", "Commissioning report", retrofit.commissioningStatus === "complete" ? "verified" : "requested", "contractor", "measurement"]
  ];
  const rows = base.map(([documentType, name, status, owner, requiredFor]) => ({
    id: `${retrofit.id}:document:${documentType}`,
    testCaseId,
    businessId: `admin_test_${testCaseId}`,
    userId: testCaseId,
    propertyId,
    siteId: propertyId,
    relatedRetrofitId: retrofit.id,
    relatedIncentiveId: incentives[0]?.id || null,
    relatedCertificationId: null,
    name,
    documentType,
    status,
    owner,
    requiredFor,
    dueDate: status === "missing" || status === "requested" || status === "needs_update" ? dateShift(retrofit.operationalDate, 45) : null,
    uploadedAt: status === "uploaded" || status === "verified" || status === "needs_update" ? dateShift(retrofit.installedDate, 12) : null,
    verifiedAt: status === "verified" ? dateShift(retrofit.installedDate, 25) : null,
    expiresAt: documentType === "contractor_license" ? "2027-06-30" : null,
    fileUrl: null,
    notes: "Synthetic admin/test-case document record.",
    blockerReason: status === "missing" ? "Document has not been uploaded yet." : status === "needs_update" ? "Uploaded document needs a clearer final invoice or signature." : null
  }));
  return rows;
}

function buildCertificationRecords(testCaseId, propertyId, archetype, retrofits, rng) {
  if (!retrofits.length) return [];
  const programs = certificationProgramsForArchetype(archetype, retrofits);
  return programs.map((program, index) => {
    const related = retrofits.filter((retrofit) => retrofit.certificationContributions.some((item) => item.program === program.name)).slice(0, 5);
    const progress = integerBetween(rng, 48 + index * 4, 86);
    const readiness = Math.max(25, Math.min(95, progress + integerBetween(rng, -16, 12)));
    return {
      id: `${testCaseId}:certification:${cleanId(program.name)}`,
      testCaseId,
      businessId: `admin_test_${testCaseId}`,
      userId: testCaseId,
      propertyId,
      siteId: propertyId,
      certificationName: program.name,
      certificationProvider: program.provider,
      status: readiness >= 82 ? "ready_to_submit" : progress >= 70 ? "in_progress" : "needs_work",
      progressPercent: progress,
      readinessPercent: readiness,
      completedItems: ["Installed qualifying retrofit measures", "Created performance tracking baseline"],
      missingItems: readiness >= 82 ? [] : ["Finalize evidence package", "Confirm one remaining requirement"],
      inProgressItems: ["Post-install utility verification", "Certification evidence review"],
      requiredDocuments: ["invoice", "completion_photo", "post_install_utility_bill", "certification_evidence"],
      readyDocuments: ["invoice", "completion_photo"],
      missingDocuments: readiness >= 82 ? [] : ["certification_evidence"],
      verifiedDocuments: ["invoice"],
      retrofitsContributing: related.map((retrofit) => retrofit.id),
      nextActions: readiness >= 82 ? ["Submit package for review"] : ["Upload missing evidence", "Complete remaining requirement"],
      targetSubmissionDate: `2026-0${Math.min(9, index + 8)}-15`,
      submittedDate: readiness >= 90 ? "2026-06-15" : null,
      achievedDate: null,
      expirationDate: null,
      notes: ["Synthetic certification readiness record; not production-verified."],
      dataSource: "synthetic_admin_test_case"
    };
  });
}

function buildCertificationRequirements(testCaseId, certifications, retrofits, rng) {
  const requirements = [];
  for (const certification of certifications) {
    CERT_REQUIREMENT_CATEGORIES.forEach((category, index) => {
      const complete = index < Math.round((certification.progressPercent / 100) * CERT_REQUIREMENT_CATEGORIES.length);
      const status = complete ? "complete" : index % 3 === 0 ? "in_progress" : index % 4 === 0 ? "blocked" : "missing";
      requirements.push({
        id: `${certification.id}:requirement:${category}`,
        certificationId: certification.id,
        testCaseId,
        name: `${capitalize(category)} requirement`,
        category,
        status,
        evidenceNeeded: category === "documentation" ? "Final invoice, photos, and utility evidence" : `${capitalize(category)} practice/evidence summary`,
        relatedRetrofitIds: retrofits.slice(0, Math.min(3, retrofits.length)).map((retrofit) => retrofit.id),
        pointsEarned: complete ? 4 : status === "in_progress" ? 2 : 0,
        pointsPossible: 4,
        required: category === "energy" || category === "documentation",
        owner: category === "documentation" ? "retrofi" : "customer",
        dueDate: `2026-${String(7 + (index % 4)).padStart(2, "0")}-15`,
        notes: "Synthetic certification requirement for dashboard readiness testing."
      });
    });
  }
  return requirements;
}

function buildCertificationDocumentRecords(testCaseId, propertyId, certifications, requirements, rng) {
  const rows = [];
  for (const certification of certifications) {
    rows.push({
      id: `${certification.id}:document:evidence-package`,
      testCaseId,
      businessId: `admin_test_${testCaseId}`,
      userId: testCaseId,
      propertyId,
      siteId: propertyId,
      relatedRetrofitId: null,
      relatedIncentiveId: null,
      relatedCertificationId: certification.id,
      name: `${certification.certificationName} evidence package`,
      documentType: "certification_evidence",
      status: certification.readinessPercent >= 82 ? "uploaded" : "missing",
      owner: "retrofi",
      requiredFor: "certification",
      dueDate: certification.targetSubmissionDate,
      uploadedAt: certification.readinessPercent >= 82 ? "2026-06-20" : null,
      verifiedAt: null,
      expiresAt: null,
      fileUrl: null,
      notes: "Synthetic certification evidence record.",
      blockerReason: certification.readinessPercent >= 82 ? null : "Evidence package needs final supporting documents."
    });
  }
  return rows;
}

function buildNextBestActions(testCaseId, propertyId, retrofits, incentives, documents, certifications, requirements, rng) {
  if (!retrofits.length) return [];
  const actions = [];
  const missingDoc = documents.find((doc) => doc.status === "missing" || doc.status === "needs_update" || doc.status === "requested");
  const pendingIncentive = incentives.find((record) => record.pendingAmountCents > 0 || record.notClaimedAmountCents > 0);
  const underperforming = retrofits.find((retrofit) => retrofit.actualAnnualSavingsCents < retrofit.estimatedAnnualSavingsCents * 0.9) || retrofits[0];
  const requirement = requirements.find((item) => item.status === "missing" || item.status === "blocked" || item.status === "in_progress");
  const certification = certifications[0];
  if (pendingIncentive) actions.push(actionBase(testCaseId, propertyId, {
    id: "claim-pending-incentive",
    title: `Claim ${pendingIncentive.programName}`,
    description: "Finish the rebate claim package so approved money moves from pending to received.",
    category: "incentive",
    priority: "high",
    priorityScore: 94,
    estimatedValueCents: pendingIncentive.pendingAmountCents || pendingIncentive.notClaimedAmountCents,
    dueDate: pendingIncentive.deadline,
    relatedRetrofitId: pendingIncentive.retrofitPerformanceId,
    relatedIncentiveId: pendingIncentive.id,
    reason: "Pending or not-yet-claimed incentive value exists.",
    ctaLabel: "Review claim"
  }));
  if (missingDoc) actions.push(actionBase(testCaseId, propertyId, {
    id: "upload-missing-document",
    title: `Upload ${missingDoc.name}`,
    description: "This document is blocking incentive, measurement, or certification readiness.",
    category: "document",
    priority: "high",
    priorityScore: 90,
    dueDate: missingDoc.dueDate,
    relatedRetrofitId: missingDoc.relatedRetrofitId,
    relatedDocumentId: missingDoc.id,
    reason: "A required proof document is missing or needs update.",
    ctaLabel: "Upload document"
  }));
  actions.push(actionBase(testCaseId, propertyId, {
    id: "verify-post-install-bills",
    title: "Verify post-install utility bills",
    description: "Connect the latest bills so the payoff tracker can compare measured performance against estimates.",
    category: "measurement",
    priority: "medium",
    priorityScore: 82,
    estimatedSavingsCents: underperforming.actualAnnualSavingsCents,
    estimatedCO2eImpactKg: underperforming.actualCO2eReducedKgPerYear,
    relatedRetrofitId: underperforming.id,
    reason: "Actual-vs-estimated tracking improves ROI and payback confidence.",
    ctaLabel: "Verify bills"
  }));
  if (underperforming.actualAnnualSavingsCents < underperforming.estimatedAnnualSavingsCents) {
    actions.push(actionBase(testCaseId, propertyId, {
      id: "optimize-equipment-settings",
      title: `Optimize ${underperforming.name} settings`,
      description: "Measured savings are below the estimate; tune controls or schedule a contractor check.",
      category: "impact",
      priority: "medium",
      priorityScore: 78,
      estimatedSavingsCents: Math.round((underperforming.estimatedAnnualSavingsCents - underperforming.actualAnnualSavingsCents) * 0.35),
      estimatedCO2eImpactKg: Math.round((underperforming.estimatedCO2eReducedKgPerYear - underperforming.actualCO2eReducedKgPerYear) * 0.35),
      relatedRetrofitId: underperforming.id,
      reason: "Actual savings underperform the original estimate.",
      ctaLabel: "Review performance"
    }));
  }
  if (requirement && certification) actions.push(actionBase(testCaseId, propertyId, {
    id: "complete-certification-requirement",
    title: `Complete ${requirement.name}`,
    description: "Close the remaining certification gap that is tied to the installed retrofit portfolio.",
    category: "certification",
    priority: "medium",
    priorityScore: 74,
    certificationImpact: certification.certificationName,
    creditsUnlocked: requirement.pointsPossible - requirement.pointsEarned,
    dueDate: requirement.dueDate,
    relatedCertificationId: certification.id,
    reason: "Certification progress has an open requirement.",
    ctaLabel: "View requirement"
  }));
  return actions.slice(0, 7).map((action, index) => ({
    ...action,
    id: `${testCaseId}:action:${String(index + 1).padStart(2, "0")}:${action.id}`,
    status: index % 6 === 4 ? "in_progress" : "open"
  }));
}

function actionBase(testCaseId, propertyId, overrides) {
  return {
    testCaseId,
    businessId: `admin_test_${testCaseId}`,
    userId: testCaseId,
    propertyId,
    siteId: propertyId,
    title: "",
    description: "",
    category: "financial",
    priority: "medium",
    priorityScore: 50,
    estimatedValueCents: null,
    estimatedCostCents: 0,
    estimatedSavingsCents: null,
    estimatedCO2eImpactKg: null,
    certificationImpact: null,
    creditsUnlocked: null,
    effortLevel: "medium",
    difficulty: "moderate",
    timeRequired: "1-2 weeks",
    dueDate: "2026-08-15",
    ctaLabel: "Review",
    ctaTarget: "dashboard",
    relatedRetrofitId: null,
    relatedIncentiveId: null,
    relatedCertificationId: null,
    relatedDocumentId: null,
    reason: "",
    status: "open",
    dataSource: "synthetic_admin_test_case",
    ...overrides
  };
}

function impactForRetrofit(sourceRetrofit, property, actualAnnualSavingsCents, estimatedAnnualSavingsCents) {
  const id = String(sourceRetrofit.retrofitTypeId || "").toLowerCase();
  const category = String(sourceRetrofit.parentCategory || "").toLowerCase();
  const electricRate = property.averageElectricRate || 0.18;
  const gasRate = property.averageGasRate || 1.65;
  const waterRatePerGallon = property.averageWaterRate || 0.012;
  let electricShare = 0.75;
  let gasShare = 0.1;
  let waterShare = 0;
  let waste = 0;
  if (/heat_pump|hvac|envelope|insulation|weatherization|boiler|furnace/.test(id + category)) {
    electricShare = 0.45; gasShare = 0.42;
  }
  if (/refrigeration|cooler|freezer|lighting|solar|battery|controls|demand/.test(id + category)) {
    electricShare = 0.9; gasShare = 0.02;
  }
  if (/water|laundry|dishwasher|ice|steamer/.test(id + category)) {
    electricShare = 0.25; gasShare = 0.22; waterShare = 0.42;
  }
  if (/ev|charger/.test(id + category)) {
    electricShare = 0.05; gasShare = 0; waterShare = 0; waste = 0;
  }
  const estimatedKwh = Math.max(0, Math.round((estimatedAnnualSavingsCents / 100 * electricShare) / electricRate));
  const actualKwh = Math.max(0, Math.round((actualAnnualSavingsCents / 100 * electricShare) / electricRate));
  const estimatedTherms = Math.max(0, Math.round((estimatedAnnualSavingsCents / 100 * gasShare) / gasRate));
  const actualTherms = Math.max(0, Math.round((actualAnnualSavingsCents / 100 * gasShare) / gasRate));
  const estimatedWater = Math.max(0, Math.round((estimatedAnnualSavingsCents / 100 * waterShare) / waterRatePerGallon));
  const actualWater = Math.max(0, Math.round((actualAnnualSavingsCents / 100 * waterShare) / waterRatePerGallon));
  return {
    estimatedKwhSavedPerYear: estimatedKwh,
    actualKwhSavedPerYear: actualKwh,
    estimatedThermsSavedPerYear: estimatedTherms,
    actualThermsSavedPerYear: actualTherms,
    estimatedWaterSavedGallonsPerYear: estimatedWater,
    actualWaterSavedGallonsPerYear: actualWater,
    estimatedWasteReducedPerYear: waste,
    actualWasteReducedPerYear: waste,
    estimatedCO2eReducedKgPerYear: Math.round(estimatedKwh * property.emissionsFactorElectricityKgCO2ePerKwh + estimatedTherms * property.emissionsFactorGasKgCO2ePerTherm),
    actualCO2eReducedKgPerYear: Math.round(actualKwh * property.emissionsFactorElectricityKgCO2ePerKwh + actualTherms * property.emissionsFactorGasKgCO2ePerTherm)
  };
}

function certificationProgramsForArchetype(archetype) {
  if (archetype === "restaurant_commercial_kitchen") return [{ name: "Green Restaurant Association", provider: "Green Restaurant Association" }, { name: "Green Business certification", provider: "Local green business program" }];
  if (archetype === "grocery_small_market" || archetype === "cold_storage_food_distribution") return [{ name: "ENERGY STAR Portfolio Manager", provider: "ENERGY STAR" }, { name: "Green Business certification", provider: "Local green business program" }];
  if (archetype === "small_hotel_motel") return [{ name: "ENERGY STAR Portfolio Manager", provider: "ENERGY STAR" }, { name: "Green Key readiness", provider: "Green Key style pathway" }];
  if (archetype === "multifamily_property_manager") return [{ name: "ENERGY STAR Portfolio Manager", provider: "ENERGY STAR" }, { name: "LEED O+M readiness", provider: "USGBC" }];
  if (archetype === "public_nonprofit_community" || archetype === "certification_heavy") return [{ name: "LEED O+M readiness", provider: "USGBC" }, { name: "ENERGY STAR Portfolio Manager", provider: "ENERGY STAR" }, { name: "Green Business certification", provider: "Local green business program" }];
  return [{ name: "ENERGY STAR Portfolio Manager", provider: "ENERGY STAR" }, { name: "Green Business certification", provider: "Local green business program" }];
}

function certificationContributionsForRetrofit(sourceRetrofit) {
  const detail = /water/i.test(sourceRetrofit.parentCategory || sourceRetrofit.retrofitTypeId) ? "Supports water efficiency requirements." : "Supports energy performance and retrofit evidence requirements.";
  return [
    { program: "ENERGY STAR Portfolio Manager", status: "May support", detail },
    { program: "Green Business certification", status: "May support", detail },
    { program: "LEED O+M readiness", status: "Needs review", detail }
  ];
}

function scoreRetrofit(retrofit) {
  const savings = positiveCents(retrofit?.savingsPreview?.netAnnualRecurringSavingsCents) || positiveCents(retrofit?.savingsPreview?.annualSavingsCents) || 0;
  const cost = positiveCents(retrofit?.savingsPreview?.upfrontCostCents) || 1;
  const categoryBoost = /lighting|hvac|refrigeration|water|solar|controls|envelope/.test(`${retrofit?.retrofitTypeId} ${retrofit?.parentCategory}`) ? 1000000 : 0;
  return savings / Math.max(1, cost / 100000) + categoryBoost;
}

function utilitySummary(energy, category) {
  return (energy?.utilitySummaries || []).find((summary) => summary.utilityCategory === category) || null;
}

function seededRng(seedText) {
  let seed = 2166136261;
  for (const char of String(seedText)) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  return () => {
    seed += 0x6D2B79F5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function decimalBetween(rng, min, max) {
  return min + rng() * (max - min);
}

function integerBetween(rng, min, max) {
  return Math.round(decimalBetween(rng, min, max));
}

function cleanId(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "unknown";
}

function cleanText(value) {
  return String(value || "").trim();
}

function numberFromText(value) {
  const parsed = Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function positiveCents(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.round(number) : 0;
}

function centsFromDollars(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number * 100) : null;
}

function sumNumbers(values) {
  const defined = values.filter((value) => Number.isFinite(Number(value)));
  return defined.length ? defined.reduce((sum, value) => sum + Number(value), 0) : null;
}

function fallbackProjectCost(archetype, rng) {
  const config = ARCHETYPE_CONFIG[archetype] || ARCHETYPE_CONFIG.single_site_smb;
  return Math.round(decimalBetween(rng, config.minSavings * 1.5, config.maxSavings * 3));
}

function fallbackAnnualSavings(archetype, rng) {
  const config = ARCHETYPE_CONFIG[archetype] || ARCHETYPE_CONFIG.single_site_smb;
  return Math.round(decimalBetween(rng, config.minSavings, config.maxSavings));
}

function parseAddress(address) {
  const match = String(address).match(/,\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})/);
  return { city: match?.[1] || null, state: match?.[2] || null, zip: match?.[3] || null };
}

function emissionsFactorForState(state) {
  const factors = { CA: 0.21, WA: 0.08, OR: 0.12, NY: 0.23, TX: 0.39, AZ: 0.36, CO: 0.45, MI: 0.42, PA: 0.31, MA: 0.22 };
  return factors[state] || 0.39;
}

function operatingHoursForArchetype(archetype) {
  if (/industrial|warehouse|cold_storage|hotel/.test(archetype)) return "24/7 or extended operations";
  if (/restaurant|grocery|laundromat/.test(archetype)) return "7 days/week, extended business hours";
  return "Weekday business hours with periodic events";
}

function dateShift(dateText, days) {
  if (!dateText) return null;
  const date = new Date(`${dateText.slice(0, 10)}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function percentDelta(actual, estimated) {
  return estimated ? ((actual - estimated) / estimated) * 100 : null;
}

function contractorName(index) {
  return ["BrightPath Retrofit Services", "UtilityWise Contractors", "Efficient Building Partners", "RetroFi Verified Installer"][index % 4];
}

function loadTypeForRetrofit(retrofit) {
  const text = `${retrofit.retrofitTypeId} ${retrofit.parentCategory}`.toLowerCase();
  if (/water|laundry/.test(text)) return "water";
  if (/gas|boiler|furnace|thermal/.test(text)) return "gas";
  if (/heat_pump|hvac/.test(text)) return "mixed";
  return "electric";
}

function measureTypeForRetrofit(retrofit) {
  if (/solar|wind|biomass|fuel_cell/.test(retrofit.retrofitTypeId)) return "generation";
  if (/controls|management|automation/.test(retrofit.retrofitTypeId)) return "controls";
  return "efficiency";
}

function systemSizeForRetrofit(retrofit, property, rng) {
  if (/solar|wind|battery/.test(retrofit.retrofitTypeId)) return `${integerBetween(rng, 25, Math.max(30, Math.round((property.baselineAnnualElectricityKwh || 100000) / 8000)))} kW`;
  if (/hvac|heat_pump|boiler/.test(retrofit.retrofitTypeId)) return `${integerBetween(rng, 5, 80)} tons`;
  return `${integerBetween(rng, 4, 120)} units`;
}

function baselineEquipmentForRetrofit(retrofit) {
  if (/lighting/.test(retrofit.retrofitTypeId)) return "Legacy fluorescent or HID fixtures";
  if (/hvac|heat_pump/.test(retrofit.retrofitTypeId)) return "Existing packaged HVAC or gas heating system";
  if (/refrigeration/.test(retrofit.retrofitTypeId)) return "Existing refrigeration cases, motors, and controls";
  return "Existing equipment";
}

function installedEquipmentForRetrofit(retrofit) {
  if (/lighting/.test(retrofit.retrofitTypeId)) return "LED fixtures and controls";
  if (/hvac|heat_pump/.test(retrofit.retrofitTypeId)) return "High-efficiency HVAC/heat pump equipment";
  if (/refrigeration/.test(retrofit.retrofitTypeId)) return "Efficient refrigeration equipment and controls";
  return retrofit.displayName;
}

function maintenanceShareForRetrofit(retrofit) {
  return /lighting|refrigeration|hvac|controls/.test(`${retrofit.retrofitTypeId} ${retrofit.parentCategory}`.toLowerCase()) ? 0.08 : 0.03;
}

function taxShareForRetrofit(retrofit) {
  return /solar|renewable|storage/.test(`${retrofit.retrofitTypeId} ${retrofit.parentCategory}`.toLowerCase()) ? 0.08 : 0.01;
}

function seasonalityForRetrofit(retrofit, monthIndex) {
  const text = `${retrofit.retrofitId || ""} ${retrofit.category || ""}`.toLowerCase();
  const summer = [0, 1, 2, 10, 11].includes(monthIndex);
  const winter = [5, 6, 7].includes(monthIndex);
  if (/hvac|heat_pump|envelope|insulation/.test(text)) return summer || winter ? 1.18 : 0.88;
  if (/lighting/.test(text)) return winter ? 1.08 : 0.97;
  if (/refrigeration/.test(text)) return summer ? 1.1 : 0.98;
  return 1;
}

function monthlyBaseline(annual, monthIndex, kind) {
  const total = Number(annual || 0);
  if (!Number.isFinite(total) || total <= 0) return 0;
  const seasonal = kind === "gas"
    ? [0.05, 0.04, 0.05, 0.07, 0.08, 0.13, 0.15, 0.13, 0.1, 0.08, 0.07, 0.05]
    : kind === "water"
      ? [0.1, 0.11, 0.1, 0.08, 0.07, 0.06, 0.06, 0.06, 0.07, 0.08, 0.1, 0.11]
      : [0.09, 0.1, 0.09, 0.08, 0.075, 0.075, 0.075, 0.075, 0.08, 0.08, 0.085, 0.095];
  return Math.round(total * seasonal[monthIndex]);
}

function incentiveTypeFromProgram(programType) {
  const value = String(programType || "").toLowerCase();
  if (value.includes("tax")) return "tax_credit";
  if (value.includes("grant")) return "grant";
  if (value.includes("financ")) return "financing";
  if (value.includes("performance")) return "performance_incentive";
  return "rebate";
}

function capitalize(value) {
  return String(value || "").replace(/_/g, " ").replace(/^\w/, (letter) => letter.toUpperCase());
}
