import fs from "node:fs";
import path from "node:path";
import {
  CANONICAL_OPPORTUNITY_AVAILABILITY_STATUSES,
  normalizeOpportunityAvailabilityStatus
} from "./opportunityLifecycle.mjs";

export const OPPORTUNITY_AVAILABILITY_DISPOSITIONS_SCHEMA_VERSION =
  "opportunity_availability_dispositions.v1";

const allowedRequirementTypes = new Set(["locality", "provider", "solicitation", "mapping", "other"]);
let cachedDefaultOverlay = null;

function resolveDefaultOverlayPath() {
  const candidates = [
    path.resolve(import.meta.dirname, "..", "..", "data", "opportunity_availability_dispositions.v1.json"),
    path.resolve(import.meta.dirname, "..", "..", "..", "..", "data", "opportunity_availability_dispositions.v1.json")
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || candidates[0];
}

export function loadOpportunityAvailabilityOverlay(filePath = resolveDefaultOverlayPath()) {
  const defaultPath = resolveDefaultOverlayPath();
  if (filePath === defaultPath && cachedDefaultOverlay) {
    return cachedDefaultOverlay;
  }
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  const overlay = JSON.parse(fs.readFileSync(filePath, "utf8"));
  validateOpportunityAvailabilityOverlay(overlay, filePath);
  if (filePath === defaultPath) {
    cachedDefaultOverlay = overlay;
  }
  return overlay;
}

export function validateOpportunityAvailabilityOverlay(overlay, source = "availability overlay") {
  if (overlay?.schemaVersion !== OPPORTUNITY_AVAILABILITY_DISPOSITIONS_SCHEMA_VERSION || !overlay?.records) {
    throw new Error(`Invalid opportunity availability overlay at ${source}`);
  }

  const allowedStatuses = new Set(CANONICAL_OPPORTUNITY_AVAILABILITY_STATUSES);
  for (const [opportunityId, record] of Object.entries(overlay.records)) {
    if (!allowedStatuses.has(record?.availabilityStatus) || record.availabilityStatus === "active") {
      throw new Error(`Invalid availability disposition for ${opportunityId}`);
    }
    if (!Array.isArray(record.conditionalRequirements) || record.conditionalRequirements.length === 0) {
      throw new Error(`Missing conditional requirements for ${opportunityId}`);
    }
    for (const requirement of record.conditionalRequirements) {
      if (!allowedRequirementTypes.has(requirement?.type) || !String(requirement?.description || "").trim()) {
        throw new Error(`Invalid conditional requirement for ${opportunityId}`);
      }
    }
  }
  return overlay;
}

export function applyOpportunityAvailabilityDisposition(opportunity, disposition) {
  if (!opportunity) {
    return opportunity;
  }

  const availabilityStatus = disposition
    ? normalizeOpportunityAvailabilityStatus(disposition.availabilityStatus)
    : normalizeOpportunityAvailabilityStatus(opportunity.availabilityStatus ?? opportunity.lifecycleStatus);
  if (!disposition) {
    return {
      ...opportunity,
      availabilityStatus
    };
  }

  return {
    ...opportunity,
    availabilityStatus,
    availabilityLifecycle: {
      status: availabilityStatus,
      conditionalRequirements: disposition.conditionalRequirements,
      rationale: disposition.rationale,
      officialUrls: disposition.officialUrls,
      reviewedAt: disposition.reviewedAt,
      recheckAt: disposition.recheckAt ?? null,
      supersededBy: disposition.supersededBy ?? null,
      successorDescription: disposition.successorDescription ?? null,
      dispositionProvenance: disposition.dispositionProvenance
    }
  };
}

export function applyOpportunityAvailabilityOverlay(
  opportunities,
  overlay = loadOpportunityAvailabilityOverlay()
) {
  const records = overlay?.records || {};
  return (Array.isArray(opportunities) ? opportunities : []).map((opportunity) =>
    applyOpportunityAvailabilityDisposition(opportunity, records[opportunity?.opportunityId])
  );
}
