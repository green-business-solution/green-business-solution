export const AVAILABILITY_REVIEW_SCHEMA_VERSION = "availability-review-v1";

export const AVAILABILITY_STATUSES = [
  "active",
  "upcoming",
  "rolling",
  "unavailable",
  "uncertain"
];

export function normalizeAvailabilityReview(review) {
  if (!review || typeof review !== "object") return null;
  const normalizedStatus = AVAILABILITY_STATUSES.includes(review.normalizedStatus)
    ? review.normalizedStatus
    : "uncertain";
  return {
    normalizedStatus,
    applicationOpenAt: review.applicationOpenAt || null,
    applicationDeadlineAt: review.applicationDeadlineAt || null,
    questionsDeadlineAt: review.questionsDeadlineAt || null,
    programEndAt: review.programEndAt || null,
    recurring: Boolean(review.recurring),
    noDeadlineExplicit: Boolean(review.noDeadlineExplicit),
    evidenceText: review.evidenceText || null,
    reasons: Array.isArray(review.reasons) ? review.reasons.filter(Boolean) : [],
    sourceUrlsChecked: Array.isArray(review.sourceUrlsChecked) ? review.sourceUrlsChecked.filter(Boolean) : [],
    fetchErrors: Array.isArray(review.fetchErrors) ? review.fetchErrors : [],
    reviewedAt: review.reviewedAt || null,
    reviewMethod: review.reviewMethod || "stored_review",
    confidence: typeof review.confidence === "number" ? review.confidence : confidenceForStatus(normalizedStatus, [])
  };
}

export function availabilityFromReview(review, opportunity = {}) {
  const normalized = normalizeAvailabilityReview(review);
  if (!normalized) return null;
  return {
    normalizedStatus: normalized.normalizedStatus,
    applicationOpenAt: normalized.applicationOpenAt,
    applicationDeadlineAt: normalized.applicationDeadlineAt,
    questionsDeadlineAt: normalized.questionsDeadlineAt,
    programEndAt: normalized.programEndAt,
    recurring: normalized.recurring,
    noDeadlineExplicit: normalized.noDeadlineExplicit,
    lastVerifiedAt: normalized.reviewedAt || opportunity.lastSeenAt || opportunity.updatedAt || null,
    confidence: normalized.confidence,
    reasons: normalized.reasons,
    evidenceText: normalized.evidenceText,
    reviewMethod: normalized.reviewMethod,
    sourceUrlsChecked: normalized.sourceUrlsChecked,
    fetchErrors: normalized.fetchErrors,
    reviewedAt: normalized.reviewedAt
  };
}

export function inferAvailabilityReview(
  opportunity,
  searchableText,
  { now = new Date(), fetchErrors = [], reviewedAt = null, reviewMethod = "deterministic_source_corpus", sourceUrlsChecked = [] } = {}
) {
  const text = String(searchableText || "");
  const compactText = text.replace(/\s+/g, " ").trim();
  const statusText = [opportunity.status, opportunity.sourceStatus, opportunity.reviewStatus].filter(Boolean).join(" ").toLowerCase();
  const deadline = parseDate(opportunity.deadlineDate) || parseDate(opportunity.endDate);
  const startDate = parseDate(opportunity.startDate) || parseDate(opportunity.releaseDate);
  const reasons = [];
  const noDeadlineExplicit = /\b(no deadline|no expiration|no time limit|rolling|open until funds|until funds (?:are )?(?:exhausted|no longer available)|first[- ]come[, -]first[- ]served)\b/i.test(compactText) ||
    /\b(no_time_limit|no time limit)\b/i.test(statusText);
  const upcomingOrReopening = /\b(?:application window|application period|applications?|funding round|solicitation|program|rebate|incentive|loan|grant)[^.]{0,120}\b(?:currently closed|not currently open|temporarily closed|expected to (?:open|reopen)|anticipated to (?:open|reopen)|expected to open again|will open again|next cycle is expected|future funding|unveiled later this year|coming soon|opens? (?:on|in))\b/i.test(compactText) ||
    /\b(?:currently closed|not currently open|temporarily closed|expected to (?:open|reopen)|anticipated to (?:open|reopen)|expected to open again|will open again|next cycle is expected|future funding|unveiled later this year|coming soon|opens? (?:on|in))\b[^.]{0,120}\b(?:application window|application period|applications?|funding round|solicitation|program|rebate|incentive|loan|grant)\b/i.test(compactText);
  const stalePastCycle = /\b(most recent application (?:deadline|period)|most recent funding round|most recent [^.]{0,60}(?:solicitation|round)[^.]{0,60}closed|previous application (?:deadline|period)|applications? closed (?:on|in)|round [^.]{0,40}deadline (?:was|is) [^.]{0,40}\b(?:2020|2021|2022|2023|2024|2025|january 2026|february 2026|march 2026|april 2026|may 2026|june 2026))\b/i.test(compactText);
  const closedUntilFurtherNotice = /\b(?:applications?|grant applications?) (?:are )?(?:currently )?not being accepted until further notice\b/i.test(compactText);
  const unavailableProgramLanguage = /\b(?:application window|application period|applications?|grant applications?|funding round|solicitation|program|rebate|incentive|grant)(?:\s|:|-|–|—){0,12}(?:is |are |has |have )?(?:closed|officially closed|no longer accepting|not accepting new applications|fully subscribed|funding exhausted|cancelled|canceled)\b/i.test(compactText) ||
    /\b(?:no longer accepting|not accepting new applications|fully subscribed|funding exhausted|program is closed|applications? closed)\b/i.test(compactText);
  let normalizedStatus = "uncertain";

  if (closedUntilFurtherNotice) {
    normalizedStatus = "unavailable";
    reasons.push("closed_until_further_notice");
  } else if (upcomingOrReopening) {
    normalizedStatus = "upcoming";
    reasons.push("upcoming_or_reopening_language");
  } else if (
    unavailableProgramLanguage ||
    /\b(closed|cancelled|canceled|awarded|fully_subscribed|unavailable)\b/i.test(statusText) ||
    stalePastCycle
  ) {
    normalizedStatus = "unavailable";
    reasons.push("source_status_unavailable");
  } else if (deadline && deadline.getTime() < now.getTime() && !noDeadlineExplicit) {
    normalizedStatus = "unavailable";
    reasons.push("deadline_has_passed");
  } else if (upcomingOrReopening || (startDate && startDate.getTime() > now.getTime())) {
    normalizedStatus = "upcoming";
    reasons.push("upcoming_or_future_open");
  } else if (noDeadlineExplicit) {
    normalizedStatus = "rolling";
    reasons.push("rolling_or_no_deadline_language");
  } else if (
    /\b(enroll today|enroll now|enroll in|get started|apply online|fill out (?:the )?form|start saving|save energy and money|program is available|may qualify|you may qualify|are eligible|offers? (?:rebates?|incentives?|free|no-cost)|receive incentives|earn incentives)\b/i.test(compactText) ||
    /\b(active|published)\b/i.test(statusText)
  ) {
    normalizedStatus = "active";
    reasons.push("active_program_language");
  }

  let evidenceText = evidenceTextFor(normalizedStatus, compactText);
  if (
    normalizedStatus === "unavailable" &&
    reasons.includes("source_status_unavailable") &&
    !isEvidenceSpecificToOpportunity(opportunity, evidenceText)
  ) {
    normalizedStatus = "uncertain";
    reasons.length = 0;
    reasons.push("unavailable_evidence_not_title_specific");
    evidenceText = evidenceTextFor(normalizedStatus, compactText);
  }

  return {
    normalizedStatus,
    applicationOpenAt: startDate ? startDate.toISOString() : null,
    applicationDeadlineAt: deadline ? deadline.toISOString() : null,
    questionsDeadlineAt: parseDate(opportunity.questionsDeadline)?.toISOString() || null,
    programEndAt: parseDate(opportunity.endDate)?.toISOString() || null,
    recurring: /\b(annual|annually|recurring|each year)\b/i.test(compactText),
    noDeadlineExplicit,
    evidenceText,
    reasons,
    sourceUrlsChecked,
    fetchErrors,
    reviewedAt,
    reviewMethod,
    confidence: confidenceForStatus(normalizedStatus, reasons)
  };
}

function evidenceTextFor(normalizedStatus, text) {
  const patterns = {
    unavailable:
      /((?:application window|application period|applications?|grant applications?|funding round|solicitation|program|rebate|incentive|loan|grant)(?:\s|:|-|–|—){0,12}(?:is |are |has |have )?(?:closed|officially closed|no longer accepting|not accepting new applications|fully subscribed|funding exhausted|cancelled|canceled)|no longer accepting|not accepting new applications|not being accepted until further notice|fully subscribed|funding exhausted|program is closed|applications? closed|most recent application (?:deadline|period)|most recent [^.]{0,60}round[^.]{0,60}closed|application deadline was|install all projects by [^.]{3,40})/i,
    rolling:
      /(no deadline|no expiration|no time limit|rolling|open until funds|until funds (?:are )?(?:exhausted|no longer available)|first[- ]come[, -]first[- ]served)/i,
    upcoming: /((?:application window|application period|applications?|funding round|solicitation|program|rebate|incentive|loan|grant)[^.]{0,120}(?:currently closed|not currently open|expected to (?:open|reopen)|anticipated to (?:open|reopen)|next cycle is expected|future funding|coming soon|opens? (?:on|in))|(?:currently closed|not currently open|expected to (?:open|reopen)|anticipated to (?:open|reopen)|next cycle is expected|future funding|coming soon|opens? (?:on|in))[^.]{0,120}(?:application window|application period|applications?|funding round|solicitation|program|rebate|incentive|loan|grant))/i,
    active:
      /(enroll today|enroll now|enroll in|get started|apply online|fill out (?:the )?form|start saving|save energy and money|program is available|may qualify|you may qualify|are eligible|offers? (?:rebates?|incentives?|free|no-cost)|receive incentives|earn incentives)/i
  };
  return findSnippet(text, patterns[normalizedStatus]) || text.slice(0, 260);
}

function findSnippet(text, pattern) {
  if (!pattern) return null;
  const match = pattern.exec(text);
  if (!match) return null;
  const start = Math.max(0, match.index - 100);
  const end = Math.min(text.length, match.index + match[0].length + 160);
  return text.slice(start, end).replace(/\s+/g, " ").trim();
}

function confidenceForStatus(normalizedStatus, reasons) {
  if (normalizedStatus === "uncertain") return 0.42;
  if (reasons.includes("deadline_has_passed") || reasons.includes("source_status_unavailable")) return 0.9;
  if (normalizedStatus === "rolling") return 0.88;
  if (normalizedStatus === "active") return 0.82;
  if (normalizedStatus === "upcoming") return 0.78;
  return 0.5;
}

function isEvidenceSpecificToOpportunity(opportunity, evidenceText) {
  const tokens = significantTitleTokens(opportunity);
  if (tokens.length === 0) return true;
  const normalizedEvidence = String(evidenceText || "").toLowerCase();
  const overlap = tokens.filter((token) => normalizedEvidence.includes(token)).length;
  return overlap >= Math.min(2, tokens.length);
}

function significantTitleTokens(opportunity) {
  const stopwords = new Set([
    "and",
    "for",
    "the",
    "with",
    "from",
    "program",
    "programs",
    "rebate",
    "rebates",
    "incentive",
    "incentives",
    "energy",
    "efficiency",
    "efficient",
    "commercial",
    "residential",
    "electric",
    "electricity",
    "utility",
    "utilities",
    "loan",
    "loans",
    "grant",
    "grants",
    "financing",
    "tax",
    "credit",
    "credits"
  ]);
  const title = [opportunity.canonicalTitle, opportunity.normalizedTitle, opportunity.name, opportunity.title]
    .filter(Boolean)
    .join(" ");
  return [...new Set(title.toLowerCase().match(/[a-z0-9]{4,}/g) || [])].filter((token) => !stopwords.has(token));
}

function parseDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
