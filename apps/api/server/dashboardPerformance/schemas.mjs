export const DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION = "dashboard-post-implementation-v1";
export const DASHBOARD_SYNTHETIC_SOURCE = "admin_test_case_seed";
export const DASHBOARD_REPORTING_PERIOD = {
  startDate: "2025-07-01",
  endDate: "2026-06-30",
  label: "Jul 1, 2025 - Jun 30, 2026"
};

export const IMPLEMENTED_RETROFIT_STATUSES = new Set([
  "implemented",
  "installed",
  "operational",
  "tracking",
  "completed"
]);

export const INCENTIVE_STATUSES = new Set([
  "eligible",
  "not_started",
  "applied",
  "approved",
  "received",
  "pending",
  "rejected",
  "not_claimed",
  "expired"
]);

export const DOCUMENT_STATUSES = new Set([
  "missing",
  "requested",
  "uploaded",
  "verified",
  "rejected",
  "needs_update",
  "expired"
]);

export const CERTIFICATION_STATUSES = new Set([
  "not_started",
  "in_progress",
  "ready_to_submit",
  "submitted",
  "achieved",
  "needs_work"
]);

export const CERTIFICATION_REQUIREMENT_STATUSES = new Set([
  "complete",
  "in_progress",
  "missing",
  "blocked",
  "not_applicable"
]);

export const NEXT_BEST_ACTION_STATUSES = new Set([
  "open",
  "in_progress",
  "done",
  "blocked",
  "dismissed"
]);

export const DASHBOARD_DATA_SOURCES = new Set([
  "actual",
  "mixed",
  "estimated",
  "synthetic_admin_test_case"
]);

export function dashboardPerformanceScope(testCaseId) {
  return `DASHBOARD_PERFORMANCE#TEST_CASE#${String(testCaseId || "").trim()}`;
}

export function validateDashboardPostImplementationDataset(dataset) {
  const errors = [];
  const warnings = [];
  if (!dataset || typeof dataset !== "object") {
    return { valid: false, errors: ["Dataset is not an object."], warnings };
  }
  if (dataset.schemaVersion !== DASHBOARD_POST_IMPLEMENTATION_SCHEMA_VERSION) {
    errors.push("Invalid schemaVersion.");
  }
  if (!dataset.testCaseId) errors.push("Missing testCaseId.");
  if (!dataset.reportingPeriod?.startDate || !dataset.reportingPeriod?.endDate) {
    errors.push("Missing reportingPeriod.");
  }

  const retrofits = Array.isArray(dataset.implementedRetrofits) ? dataset.implementedRetrofits : [];
  const monthly = Array.isArray(dataset.monthlyPerformanceRecords) ? dataset.monthlyPerformanceRecords : [];
  const incentives = Array.isArray(dataset.incentivePerformanceRecords) ? dataset.incentivePerformanceRecords : [];
  const documents = Array.isArray(dataset.documentRecords) ? dataset.documentRecords : [];
  const certifications = Array.isArray(dataset.certificationRecords) ? dataset.certificationRecords : [];
  const requirements = Array.isArray(dataset.certificationRequirements) ? dataset.certificationRequirements : [];
  const actions = Array.isArray(dataset.nextBestActions) ? dataset.nextBestActions : [];

  if (!retrofits.length) warnings.push("No implemented retrofits.");
  for (const retrofit of retrofits) {
    if (!retrofit || typeof retrofit !== "object") {
      errors.push("Invalid implemented retrofit record.");
      continue;
    }
    if (!IMPLEMENTED_RETROFIT_STATUSES.has(retrofit.status)) errors.push(`Invalid retrofit status for ${retrofit.id}.`);
    if (!retrofit.retrofitId) errors.push(`Missing retrofitId for ${retrofit.id}.`);
    if (!retrofit.propertyId) errors.push(`Missing propertyId for ${retrofit.id}.`);
  }

  const validRetrofits = retrofits.filter((retrofit) => retrofit && typeof retrofit === "object");
  const retrofitIds = new Set(validRetrofits.map((retrofit) => retrofit.id));
  const monthlyByRetrofit = new Map();
  for (const record of monthly) {
    if (!record || typeof record !== "object") {
      errors.push("Invalid monthly performance record.");
      continue;
    }
    if (!retrofitIds.has(record.retrofitPerformanceId)) {
      errors.push(`Monthly record ${record.id} is linked to an unknown retrofit.`);
    }
    monthlyByRetrofit.set(record.retrofitPerformanceId, (monthlyByRetrofit.get(record.retrofitPerformanceId) || 0) + 1);
  }
  for (const retrofit of validRetrofits) {
    const count = monthlyByRetrofit.get(retrofit.id) || 0;
    if (count < 12) warnings.push(`Retrofit ${retrofit.id} has fewer than 12 monthly records.`);
    const beforeOperational = monthly.some((record) =>
      record.retrofitPerformanceId === retrofit.id &&
      record.actualSavingsCents > 0 &&
      record.month < String(retrofit.operationalDate || "").slice(0, 7)
    );
    if (beforeOperational) errors.push(`Retrofit ${retrofit.id} has savings before operationalDate.`);
  }

  const sortedByRetrofit = new Map();
  for (const record of monthly) {
    if (!record || typeof record !== "object") continue;
    const rows = sortedByRetrofit.get(record.retrofitPerformanceId) || [];
    rows.push(record);
    sortedByRetrofit.set(record.retrofitPerformanceId, rows);
  }
  for (const [retrofitId, rows] of sortedByRetrofit) {
    rows.sort((left, right) => left.month.localeCompare(right.month));
    for (let index = 1; index < rows.length; index += 1) {
      if (Number(rows[index].cumulativeSavingsCents || 0) < Number(rows[index - 1].cumulativeSavingsCents || 0)) {
        errors.push(`cumulativeSavingsCents is not monotonic for ${retrofitId}.`);
        break;
      }
    }
  }

  for (const incentive of incentives) {
    if (!incentive || typeof incentive !== "object") {
      errors.push("Invalid incentive performance record.");
      continue;
    }
    if (!INCENTIVE_STATUSES.has(incentive.status)) errors.push(`Invalid incentive status for ${incentive.id}.`);
    if (incentive.retrofitPerformanceId && !retrofitIds.has(incentive.retrofitPerformanceId)) {
      errors.push(`Incentive ${incentive.id} is linked to an unknown retrofit.`);
    }
  }
  for (const document of documents) {
    if (!document || typeof document !== "object") {
      errors.push("Invalid dashboard document record.");
      continue;
    }
    if (!DOCUMENT_STATUSES.has(document.status)) errors.push(`Invalid document status for ${document.id}.`);
  }
  for (const certification of certifications) {
    if (!certification || typeof certification !== "object") {
      errors.push("Invalid certification record.");
      continue;
    }
    if (!CERTIFICATION_STATUSES.has(certification.status)) errors.push(`Invalid certification status for ${certification.id}.`);
    if (Math.round(Number(certification.progressPercent || 0)) === Math.round(Number(certification.readinessPercent || 0))) {
      warnings.push(`Certification ${certification.id} progress and readiness are equal; verify they are modeled separately.`);
    }
  }
  for (const requirement of requirements) {
    if (!requirement || typeof requirement !== "object") {
      errors.push("Invalid certification requirement record.");
      continue;
    }
    if (!CERTIFICATION_REQUIREMENT_STATUSES.has(requirement.status)) errors.push(`Invalid certification requirement status for ${requirement.id}.`);
  }
  for (const action of actions) {
    if (!action || typeof action !== "object") {
      errors.push("Invalid dashboard next-best-action record.");
      continue;
    }
    if (!NEXT_BEST_ACTION_STATUSES.has(action.status)) errors.push(`Invalid action status for ${action.id}.`);
  }

  return { valid: errors.length === 0, errors, warnings };
}
