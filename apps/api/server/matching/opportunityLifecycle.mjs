export const OPPORTUNITY_AVAILABILITY_STATUS = Object.freeze({
  ACTIVE: "active",
  CONDITIONAL: "conditional",
  DISABLED: "disabled",
  QUARANTINED: "quarantined",
  ARCHIVED: "archived",
});

export const CANONICAL_OPPORTUNITY_AVAILABILITY_STATUSES = Object.freeze(
  Object.values(OPPORTUNITY_AVAILABILITY_STATUS),
);

export const OPPORTUNITY_LIFECYCLE_STATUS = OPPORTUNITY_AVAILABILITY_STATUS;

const canonicalAvailabilityStatuses = new Set(
  CANONICAL_OPPORTUNITY_AVAILABILITY_STATUSES,
);
const legacyAvailabilityStatuses = new Map([
  ["rolling", OPPORTUNITY_AVAILABILITY_STATUS.ACTIVE],
  ["upcoming", OPPORTUNITY_AVAILABILITY_STATUS.CONDITIONAL],
  ["unknown", OPPORTUNITY_AVAILABILITY_STATUS.CONDITIONAL],
  ["waitlist", OPPORTUNITY_AVAILABILITY_STATUS.CONDITIONAL],
  ["inactive", OPPORTUNITY_AVAILABILITY_STATUS.DISABLED],
  ["unavailable", OPPORTUNITY_AVAILABILITY_STATUS.DISABLED],
  ["closed", OPPORTUNITY_AVAILABILITY_STATUS.DISABLED],
  ["expired", OPPORTUNITY_AVAILABILITY_STATUS.DISABLED],
  ["temporarily_closed", OPPORTUNITY_AVAILABILITY_STATUS.DISABLED],
  ["source_inaccessible", OPPORTUNITY_AVAILABILITY_STATUS.QUARANTINED],
]);

export function normalizeOpportunityAvailabilityStatus(value) {
  const normalized =
    typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!normalized) {
    return OPPORTUNITY_AVAILABILITY_STATUS.ACTIVE;
  }
  if (canonicalAvailabilityStatuses.has(normalized)) {
    return normalized;
  }
  return (
    legacyAvailabilityStatuses.get(normalized) ||
    OPPORTUNITY_AVAILABILITY_STATUS.CONDITIONAL
  );
}

export function opportunityAvailabilityStatus(opportunity) {
  return normalizeOpportunityAvailabilityStatus(
    opportunity?.availabilityStatus ?? opportunity?.lifecycleStatus,
  );
}

export function isArchivedOpportunity(opportunity) {
  return (
    opportunityAvailabilityStatus(opportunity) ===
    OPPORTUNITY_AVAILABILITY_STATUS.ARCHIVED
  );
}

export function isVisibleOpportunity(opportunity) {
  return !isArchivedOpportunity(opportunity);
}

export function isMatchableOpportunity(opportunity) {
  return (
    opportunityAvailabilityStatus(opportunity) ===
    OPPORTUNITY_AVAILABILITY_STATUS.ACTIVE
  );
}

export function isVisibleAvailability(availability) {
  return (
    availability?.normalizedStatus !== "unavailable" &&
    availability?.normalizedStatus !== "upcoming"
  );
}

export function isLowInformationOpportunity(opportunity) {
  const opportunityId = String(opportunity?.opportunityId || "");
  const sourceUrl = String(opportunity?.sourceUrl || "");
  const summary = String(opportunity?.summary || "")
    .replace(/\s+/g, " ")
    .trim();
  const hasDetailSource =
    /\/detail\/\d+\//.test(sourceUrl) ||
    Boolean(opportunity?.websiteUrl || opportunity?.applicationUrl);
  const isDsireUpdateOnlyRecord =
    opportunityId.includes("dsire_program_code_title_hash") &&
    sourceUrl === "https://programs.dsireusa.org/system/program" &&
    !hasDetailSource;
  const summaryIsOnlyMaintenanceNote =
    summary.length > 0 &&
    summary.length <= 260 &&
    /\b(annual (?:review|update)|no changes|updated links|updated contact|streamlined information|revised to reflect|updated incentive|updated incentive amounts|updated with new targets|added eligible|added partial exemption|removed outdated|repealed by|most recent application period was|revised summary)\b/i.test(
      summary,
    );

  return isDsireUpdateOnlyRecord && summaryIsOnlyMaintenanceNote;
}
