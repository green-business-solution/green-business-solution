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
