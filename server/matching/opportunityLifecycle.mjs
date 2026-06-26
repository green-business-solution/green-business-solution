export const OPPORTUNITY_LIFECYCLE_STATUS = {
  ACTIVE: "active",
  ARCHIVED: "archived"
};

export function isArchivedOpportunity(opportunity) {
  return opportunity?.lifecycleStatus === OPPORTUNITY_LIFECYCLE_STATUS.ARCHIVED;
}

export function isVisibleOpportunity(opportunity) {
  return !isArchivedOpportunity(opportunity);
}

export function isVisibleAvailability(availability) {
  return availability?.normalizedStatus !== "unavailable" && availability?.normalizedStatus !== "upcoming";
}

export function isLowInformationOpportunity(opportunity) {
  const opportunityId = String(opportunity?.opportunityId || "");
  const sourceUrl = String(opportunity?.sourceUrl || "");
  const summary = String(opportunity?.summary || "").replace(/\s+/g, " ").trim();
  const hasDetailSource = /\/detail\/\d+\//.test(sourceUrl) || Boolean(opportunity?.websiteUrl || opportunity?.applicationUrl);
  const isDsireUpdateOnlyRecord =
    opportunityId.includes("dsire_program_code_title_hash") &&
    sourceUrl === "https://programs.dsireusa.org/system/program" &&
    !hasDetailSource;
  const summaryIsOnlyMaintenanceNote =
    summary.length > 0 &&
    summary.length <= 260 &&
    /\b(annual (?:review|update)|no changes|updated links|updated contact|streamlined information|revised to reflect|updated incentive|updated incentive amounts|updated with new targets|added eligible|added partial exemption|removed outdated|repealed by|most recent application period was|revised summary)\b/i.test(summary);

  return isDsireUpdateOnlyRecord && summaryIsOnlyMaintenanceNote;
}
