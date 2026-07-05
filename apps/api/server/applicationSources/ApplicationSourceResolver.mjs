import { buildOpportunityMatchProfile } from "../matching/buildOpportunityMatchProfile.mjs";
import { classifyRetrofitsForOpportunity } from "../matching/retrofitTaxonomy.mjs";
import { resolveOfficialProgramWebsite } from "./OfficialProgramWebsiteResolver.mjs";

const APPLICATION_SOURCE_TYPES = new Set([
  "webpage",
  "pdf",
  "portal",
  "utility_portal",
  "email",
  "tax_guidance",
  "contractor_submitted",
  "unknown"
]);

const APPLICATION_METHODS = new Set([
  "online_portal",
  "pdf",
  "email",
  "contractor_submitted",
  "utility_portal",
  "tax_accountant_filing",
  "unknown"
]);

const EXTRACTION_STATUSES = new Set(["not_started", "source_found", "source_missing", "needs_review"]);
const SOURCE_CONFIDENCE_VALUES = new Set(["High", "Medium", "Low", "Needs review"]);

const UTILITY_PROVIDER_PATTERN =
  /\b(utility|utilities|public utilities|municipal light|electric cooperative|cooperative|coop|co-op|power district|public utility district|pud|electric membership|emc|board of public utilities|gas and electric|electric company|gas company|water and light)\b/i;
const UTILITY_PORTAL_PATTERN =
  /\b(utility portal|rebate portal|customer portal|account portal|online rebate|apply online|application portal)\b/i;
const TAX_PATTERN =
  /\b(tax credit|tax deduction|property tax|sales tax|irs|section 179d|179d|30c|elective pay|direct pay|transferability|transferable credit|tax filing|tax return|tax accountant|accountant filing|accountant)\b/i;
const CONTRACTOR_PATTERN =
  /\b(trade ally|approved contractor|participating contractor|participating installer|approved installer|installer submitted|submitted by contractor|contractor submitted|contractor must submit|installer must submit|application must be submitted by|through a participating contractor)\b/i;
const APPLICATION_HINT_PATTERN =
  /\b(apply|application|rebate form|application form|claim form|portal|intake form|submission form|sign in|login)\b/i;
const PORTAL_URL_PATTERN =
  /(portal|apply|application|formstack|customerapplication|salesforce-sites|my\.site\.com|rebate|rebatesdiscounts|financialrequestapplication|capturesportal|app\.|login|account)/i;
const PDF_URL_PATTERN = /\.pdf(?:$|[?#])/i;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const CLOSED_OR_EXHAUSTED_PATTERN =
  /\b(closed for applications?|applications? closed|funding exhausted|fully subscribed|no longer accepting|not accepting applications|funds? (?:are )?exhausted|100% of funding|100% of funding has been awarded)\b/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text || null;
}

function toStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => cleanText(typeof item === "string" ? item : item?.name || item?.label || item?.value))
    .filter(Boolean);
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function isHttpUrl(value) {
  const text = cleanText(value);
  if (!text) return false;

  try {
    const parsed = new URL(text);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isPdfUrl(value) {
  const text = cleanText(value);
  if (!text) return false;
  if (PDF_URL_PATTERN.test(text)) return true;

  try {
    const parsed = new URL(text);
    return [...parsed.searchParams.values()].some((paramValue) => PDF_URL_PATTERN.test(paramValue));
  } catch {
    return false;
  }
}

function looksLikePortalUrl(value) {
  return PORTAL_URL_PATTERN.test(cleanText(value));
}

function extractEmail(value) {
  const text = cleanText(value);
  if (!text) return "";
  const match = text.match(EMAIL_PATTERN);
  return match?.[0]?.toLowerCase() || "";
}

function pushCandidate(list, value, source) {
  const text = cleanText(value);
  if (!text) return;
  list.push({ value: text, source });
}

function firstUrlCandidate(candidates) {
  return candidates.find((candidate) => isHttpUrl(candidate?.value)) || null;
}

function firstEmailCandidate(candidates) {
  return candidates.find((candidate) => candidate?.value) || null;
}

function collectUrlCandidates(opportunity) {
  const applicationCandidates = [];
  const programSourceCandidates = [];

  pushCandidate(applicationCandidates, opportunity?.applicationUrl, "applicationUrl");
  pushCandidate(applicationCandidates, opportunity?.raw?.applicationUrl, "raw.applicationUrl");
  pushCandidate(applicationCandidates, opportunity?.dsireClone?.program?.applicationUrl, "dsireClone.program.applicationUrl");

  pushCandidate(programSourceCandidates, opportunity?.sourceUrl, "sourceUrl");
  pushCandidate(programSourceCandidates, opportunity?.websiteUrl, "websiteUrl");
  pushCandidate(programSourceCandidates, opportunity?.origin?.sourceUrl, "origin.sourceUrl");
  pushCandidate(programSourceCandidates, opportunity?.origin?.sourceBaseUrl, "origin.sourceBaseUrl");
  pushCandidate(programSourceCandidates, opportunity?.raw?.sourceUrl, "raw.sourceUrl");
  pushCandidate(programSourceCandidates, opportunity?.raw?.websiteUrl, "raw.websiteUrl");
  pushCandidate(programSourceCandidates, opportunity?.dsireClone?.program?.sourceUrl, "dsireClone.program.sourceUrl");
  pushCandidate(programSourceCandidates, opportunity?.dsireClone?.program?.websiteUrl, "dsireClone.program.websiteUrl");

  for (const record of opportunity?.sourceRecords || []) {
    pushCandidate(programSourceCandidates, record?.sourceUrl, "sourceRecords[].sourceUrl");
  }

  for (const evidence of opportunity?.evidence || []) {
    pushCandidate(programSourceCandidates, evidence?.sourceUrl, "evidence[].sourceUrl");
  }

  return {
    application: firstUrlCandidate(applicationCandidates),
    programSource: firstUrlCandidate(programSourceCandidates)
  };
}

function collectEmailCandidates(opportunity) {
  const candidates = [];
  const directFields = [
    [opportunity?.contactEmail, "contactEmail"],
    [opportunity?.email, "email"],
    [opportunity?.raw?.contactEmail, "raw.contactEmail"],
    [opportunity?.raw?.email, "raw.email"]
  ];

  for (const [value, source] of directFields) {
    const email = extractEmail(value);
    if (email) candidates.push({ value: email, source });
  }

  const contacts = [
    ...(Array.isArray(opportunity?.contacts) ? opportunity.contacts : []),
    ...(Array.isArray(opportunity?.dsireClone?.contacts) ? opportunity.dsireClone.contacts : []),
    ...(Array.isArray(opportunity?.raw?.contacts) ? opportunity.raw.contacts : [])
  ];

  for (const contact of contacts) {
    const contactFields = [
      contact?.email,
      contact?.emailAddress,
      contact?.contactEmail,
      contact?.value,
      contact?.description
    ];
    for (const field of contactFields) {
      const email = extractEmail(field);
      if (email) {
        candidates.push({ value: email, source: "contacts" });
      }
    }
  }

  const labeledTextSources = [
    ...(Array.isArray(opportunity?.details) ? opportunity.details : []),
    ...(Array.isArray(opportunity?.dsireClone?.overviewDetails) ? opportunity.dsireClone.overviewDetails : []),
    ...(Array.isArray(opportunity?.memos) ? opportunity.memos : []),
    ...(Array.isArray(opportunity?.dsireClone?.memos) ? opportunity.dsireClone.memos : [])
  ];

  for (const item of labeledTextSources) {
    const label = cleanText(item?.label || item?.title || item?.name);
    const value = cleanText(item?.value || item?.description || item?.text);
    if (!label && !value) continue;
    if (/\b(email|contact)\b/i.test(label) || EMAIL_PATTERN.test(value)) {
      const email = extractEmail(value);
      if (email) {
        candidates.push({ value: email, source: label ? `detail:${label}` : "detail" });
      }
    }
  }

  const freeTextSources = [
    [opportunity?.summary, "summary"],
    [opportunity?.summaryHtml, "summaryHtml"],
    ...((opportunity?.evidence || []).map((item) => [item?.extractedText, "evidence.extractedText"])),
    ...((opportunity?.evidence || []).map((item) => [item?.sectionHeading, "evidence.sectionHeading"]))
  ];

  for (const [value, source] of freeTextSources) {
    const email = extractEmail(value);
    if (email) {
      candidates.push({ value: email, source });
    }
  }

  return firstEmailCandidate(candidates);
}

function buildSignals(opportunity, urls) {
  const metadataSegments = uniqueValues([
    cleanText(opportunity?.canonicalTitle),
    cleanText(opportunity?.normalizedTitle),
    cleanText(opportunity?.programType),
    cleanText(opportunity?.category),
    cleanText(opportunity?.administrator),
    cleanText(opportunity?.sourceName),
    cleanText(opportunity?.sourceKey),
    cleanText(opportunity?.summary),
    cleanText(opportunity?.summaryHtml),
    cleanText(opportunity?.origin?.documentType),
    cleanText(urls.application?.value),
    cleanText(urls.programSource?.value),
    ...toStringArray(opportunity?.technologies),
    ...toStringArray(opportunity?.sectors),
    ...toStringArray(opportunity?.eligibleSectors),
    ...((opportunity?.details || []).flatMap((detail) => [detail?.label, detail?.value])),
    ...((opportunity?.dsireClone?.overviewDetails || []).flatMap((detail) => [detail?.label, detail?.value])),
    ...((opportunity?.evidence || []).flatMap((item) => [item?.sectionHeading, item?.sectionCategory, item?.extractedText]))
  ]);

  const providerSegments = uniqueValues([
    cleanText(opportunity?.administrator),
    cleanText(opportunity?.sourceName),
    cleanText(opportunity?.canonicalTitle),
    cleanText(opportunity?.normalizedTitle),
    cleanText(urls.programSource?.value),
    cleanText(urls.application?.value)
  ]);

  const combinedText = metadataSegments.join(" ");
  const providerText = providerSegments.join(" ");
  const applicationHintText = [cleanText(opportunity?.canonicalTitle), cleanText(opportunity?.summary), cleanText(opportunity?.programType)].join(
    " "
  );

  return {
    isTaxProgram: TAX_PATTERN.test(combinedText),
    isUtilityProvider: UTILITY_PROVIDER_PATTERN.test(providerText),
    isUtilityPortalHint: UTILITY_PORTAL_PATTERN.test(combinedText) || looksLikePortalUrl(urls.application?.value || urls.programSource?.value || ""),
    isContractorSubmitted: CONTRACTOR_PATTERN.test(combinedText),
    hasApplicationHint: APPLICATION_HINT_PATTERN.test(applicationHintText) || APPLICATION_HINT_PATTERN.test(cleanText(urls.programSource?.value)),
    hasPdfApplication:
      isPdfUrl(urls.application?.value) ||
      (!urls.application?.value && isPdfUrl(urls.programSource?.value) && APPLICATION_HINT_PATTERN.test(cleanText(urls.programSource?.value)))
  };
}

function applicationStatusHintFromOpportunity(opportunity) {
  const text = uniqueValues([
    cleanText(opportunity?.summary),
    cleanText(opportunity?.summaryHtml),
    cleanText(opportunity?.raw?.summary),
    cleanText(opportunity?.raw?.summaryHtml),
    cleanText(opportunity?.availabilityReview?.status),
    cleanText(opportunity?.status),
    ...((opportunity?.details || []).flatMap((detail) => [detail?.label, detail?.value])),
    ...((opportunity?.dsireClone?.overviewDetails || []).flatMap((detail) => [detail?.label, detail?.value]))
  ]).join(" ");
  const match = text.match(CLOSED_OR_EXHAUSTED_PATTERN);
  if (!match) return undefined;
  return /funding|funds|100%/i.test(match[0]) ? "funding_exhausted" : "closed";
}

function resolveRetrofitSummary(opportunity) {
  try {
    const matchProfile = buildOpportunityMatchProfile(opportunity);
    const retrofits = classifyRetrofitsForOpportunity(opportunity, matchProfile);
    if (!Array.isArray(retrofits) || retrofits.length === 0) {
      return { retrofitId: undefined, retrofitName: undefined, retrofitNames: [] };
    }

    return {
      retrofitId: retrofits[0]?.retrofitTypeId,
      retrofitName: retrofits[0]?.displayName,
      retrofitNames: retrofits.map((retrofit) => retrofit.displayName).filter(Boolean)
    };
  } catch {
    return { retrofitId: undefined, retrofitName: undefined, retrofitNames: [] };
  }
}

function buildBaseResult(opportunity, urls, email, retrofitSummary, officialWebsiteProfile) {
  return {
    opportunityId: String(opportunity?.opportunityId || ""),
    opportunityName: cleanOptional(opportunity?.canonicalTitle) || cleanOptional(opportunity?.normalizedTitle) || undefined,
    retrofitId: retrofitSummary.retrofitId,
    retrofitName: retrofitSummary.retrofitName,
    programSourceUrl: cleanOptional(urls.programSource?.value) || undefined,
    programWebsiteUrl: cleanOptional(officialWebsiteProfile?.programWebsiteUrl) || undefined,
    programWebsiteSource: cleanOptional(officialWebsiteProfile?.programWebsiteSource) || undefined,
    applicationUrl: cleanOptional(urls.application?.value) || undefined,
    contactEmail: cleanOptional(email?.value) || undefined,
    applicationStatusHint: applicationStatusHintFromOpportunity(opportunity),
    sourceChain: Array.isArray(officialWebsiteProfile?.sourceChain) ? officialWebsiteProfile.sourceChain : [],
    summaryLinkCandidates: Array.isArray(officialWebsiteProfile?.summaryLinkCandidates) ? officialWebsiteProfile.summaryLinkCandidates : [],
    sourceType: "unknown",
    applicationMethod: "unknown",
    extractionStatus: "not_started",
    sourceConfidence: "Needs review",
    notes: []
  };
}

function finalizeResult(result) {
  if (!APPLICATION_SOURCE_TYPES.has(result.sourceType)) result.sourceType = "unknown";
  if (!APPLICATION_METHODS.has(result.applicationMethod)) result.applicationMethod = "unknown";
  if (!EXTRACTION_STATUSES.has(result.extractionStatus)) result.extractionStatus = "needs_review";
  if (!SOURCE_CONFIDENCE_VALUES.has(result.sourceConfidence)) result.sourceConfidence = "Needs review";
  result.notes = uniqueValues(result.notes.map(cleanText)).filter(Boolean);
  return result;
}

export function resolveOpportunityApplicationSource(opportunity) {
  const urls = collectUrlCandidates(opportunity);
  const email = collectEmailCandidates(opportunity);
  const retrofitSummary = resolveRetrofitSummary(opportunity);
  const officialWebsiteProfile = resolveOfficialProgramWebsite(opportunity);
  const result = buildBaseResult(opportunity, urls, email, retrofitSummary, officialWebsiteProfile);
  const signals = buildSignals(opportunity, urls);

  if (urls.application?.source) {
    result.notes.push(`Application URL found in ${urls.application.source}.`);
  }
  if (urls.programSource?.source) {
    result.notes.push(`Program/source URL found in ${urls.programSource.source}.`);
  }
  if (officialWebsiteProfile?.programWebsiteUrl) {
    result.notes.push(`Official program website found from ${officialWebsiteProfile.programWebsiteSource}.`);
  }
  for (const note of officialWebsiteProfile?.notes || []) {
    result.notes.push(note);
  }
  if (email?.source) {
    result.notes.push(`Contact email found in ${email.source}.`);
  }
  if (retrofitSummary.retrofitNames.length > 1) {
    result.notes.push(`Matched retrofit categories include ${retrofitSummary.retrofitNames.slice(0, 3).join(", ")}.`);
  }

  if (signals.hasPdfApplication) {
    result.sourceType = "pdf";
    result.applicationMethod = "pdf";
    result.extractionStatus = "source_found";
    result.sourceConfidence = urls.application?.value ? "High" : "Medium";
    result.notes.push("Application source appears to be a PDF form or PDF application document.");
    return finalizeResult(result);
  }

  if (signals.isTaxProgram) {
    result.sourceType = "tax_guidance";
    result.applicationMethod = "tax_accountant_filing";
    result.extractionStatus = result.programSourceUrl ? "source_found" : "needs_review";
    result.sourceConfidence = result.programSourceUrl ? "Medium" : "Needs review";
    result.notes.push("Program metadata indicates a tax filing, accountant, or tax-credit claiming flow.");
    if (!result.programSourceUrl) {
      result.notes.push("Tax-guidance flow detected, but no usable source URL was found.");
    }
    return finalizeResult(result);
  }

  if (signals.isUtilityProvider && (result.applicationUrl || result.programSourceUrl || signals.isUtilityPortalHint)) {
    result.sourceType = "utility_portal";
    result.applicationMethod = "utility_portal";
    result.extractionStatus = result.applicationUrl || result.programSourceUrl ? "source_found" : "needs_review";
    result.sourceConfidence = result.applicationUrl ? "High" : result.programSourceUrl ? "Medium" : "Needs review";
    result.notes.push("Source/provider metadata suggests a utility-managed application or rebate portal flow.");
    return finalizeResult(result);
  }

  if (result.contactEmail && !result.applicationUrl) {
    result.sourceType = "email";
    result.applicationMethod = "email";
    result.extractionStatus = "source_found";
    result.sourceConfidence = email?.source === "summary" || email?.source === "summaryHtml" ? "Medium" : "High";
    result.notes.push("A contact email was found without a direct portal or PDF application URL.");
    return finalizeResult(result);
  }

  if (signals.isContractorSubmitted) {
    result.sourceType = "contractor_submitted";
    result.applicationMethod = "contractor_submitted";
    result.extractionStatus = result.applicationUrl || result.programSourceUrl ? "source_found" : "needs_review";
    result.sourceConfidence = result.programSourceUrl || result.applicationUrl ? "Medium" : "Needs review";
    result.notes.push("Program metadata indicates a participating contractor, trade ally, or installer submits the application.");
    return finalizeResult(result);
  }

  if (result.applicationUrl) {
    result.sourceType = "portal";
    result.applicationMethod = "online_portal";
    result.extractionStatus = "source_found";
    result.sourceConfidence = looksLikePortalUrl(result.applicationUrl) ? "High" : "Medium";
    result.notes.push("A direct application URL is available.");
    return finalizeResult(result);
  }

  if (result.programSourceUrl) {
    result.sourceType = "webpage";
    result.applicationMethod = "unknown";
    result.extractionStatus = "needs_review";
    result.sourceConfidence = signals.hasApplicationHint ? "Medium" : "Low";
    result.notes.push("Only a general program/source URL was found; no direct application path was identified.");
    return finalizeResult(result);
  }

  result.sourceType = "unknown";
  result.applicationMethod = "unknown";
  result.extractionStatus = "source_missing";
  result.sourceConfidence = "Needs review";
  result.notes.push("No program source URL, application URL, contact email, or application path found.");
  return finalizeResult(result);
}
