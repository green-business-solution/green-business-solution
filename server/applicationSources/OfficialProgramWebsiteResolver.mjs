import { extractOpportunitySummaryLinks } from "./OpportunitySummaryLinks.mjs";

const PDF_URL_PATTERN = /\.pdf(?:$|[?#])/i;
const APPLICATION_SPECIFIC_PATTERN =
  /\b(apply|application|application portal|online application|submit application|rebate form|interest form|pre[- ]?approval|preapproval|reservation|claim|enroll|form)\b/i;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text || undefined;
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

function normalizeUrl(value) {
  if (!isHttpUrl(value)) return "";
  try {
    return new URL(value).href;
  } catch {
    return "";
  }
}

function extractEmail(value) {
  const text = cleanText(value);
  if (!text) return "";
  return text.match(EMAIL_PATTERN)?.[0]?.toLowerCase() || "";
}

function isDsireUrl(value) {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return host === "programs.dsireusa.org" || host.endsWith(".dsireusa.org");
  } catch {
    return false;
  }
}

function isPdfUrl(value) {
  return PDF_URL_PATTERN.test(cleanText(value));
}

function looksApplicationSpecific(value, label = "") {
  return APPLICATION_SPECIFIC_PATTERN.test([value, label].filter(Boolean).join(" "));
}

function pushUrlCandidate(candidates, role, url, sourceField, reason, { selected = false, fallback = false } = {}) {
  const normalized = normalizeUrl(url);
  if (!normalized) return;
  candidates.push({
    role,
    url: normalized,
    sourceField,
    status: selected ? "selected" : fallback ? "fallback" : "candidate",
    reason
  });
}

function pushEmailCandidate(candidates, email, sourceField, reason, { selected = false } = {}) {
  const normalized = extractEmail(email);
  if (!normalized) return;
  candidates.push({
    role: "structured_contact_email",
    email: normalized,
    sourceField,
    status: selected ? "selected" : "candidate",
    reason
  });
}

function collectDirectApplicationCandidates(opportunity) {
  const candidates = [];
  const fields = [
    ["opportunity.applicationUrl", opportunity?.applicationUrl],
    ["raw.applicationUrl", opportunity?.raw?.applicationUrl],
    ["dsireClone.program.applicationUrl", opportunity?.dsireClone?.program?.applicationUrl]
  ];

  for (const [sourceField, value] of fields) {
    const url = normalizeUrl(value);
    if (!url) continue;
    candidates.push({
      role: "structured_application_url",
      url,
      sourceField,
      status: "candidate",
      reason: looksApplicationSpecific(url, sourceField)
        ? "Structured application URL appears application-specific."
        : "Structured application URL exists, but application specificity needs review."
    });
  }

  const pdfFields = [
    ["opportunity.pdfUrl", opportunity?.pdfUrl],
    ["raw.pdfUrl", opportunity?.raw?.pdfUrl],
    ["dsireClone.program.pdfUrl", opportunity?.dsireClone?.program?.pdfUrl]
  ];
  for (const [sourceField, value] of pdfFields) {
    const url = normalizeUrl(value);
    if (!url) continue;
    candidates.push({
      role: "structured_pdf_url",
      url,
      sourceField,
      status: "candidate",
      reason: isPdfUrl(url) || looksApplicationSpecific(url, sourceField)
        ? "Structured PDF URL appears application/form-specific."
        : "Structured PDF URL exists, but application specificity needs review."
    });
  }

  return candidates;
}

function collectWebsiteCandidates(opportunity) {
  const candidates = [];
  pushUrlCandidate(
    candidates,
    "official_program_website",
    opportunity?.websiteUrl,
    "opportunity.websiteUrl",
    "Structured opportunity website URL is treated as the official program/provider website."
  );
  pushUrlCandidate(
    candidates,
    "official_program_website",
    opportunity?.raw?.websiteUrl,
    "raw.websiteUrl",
    "Raw opportunity website URL is treated as the official program/provider website."
  );
  pushUrlCandidate(
    candidates,
    "official_program_website",
    opportunity?.dsireClone?.program?.websiteUrl,
    "dsireClone.program.websiteUrl",
    "DSIRE clone program website URL is treated as the official program/provider website."
  );
  return candidates.filter((candidate) => !isDsireUrl(candidate.url));
}

function collectProgramSourceCandidates(opportunity) {
  const candidates = [];
  const fields = [
    ["opportunity.sourceUrl", opportunity?.sourceUrl],
    ["raw.sourceUrl", opportunity?.raw?.sourceUrl],
    ["dsireClone.program.sourceUrl", opportunity?.dsireClone?.program?.sourceUrl],
    ["origin.sourceUrl", opportunity?.origin?.sourceUrl]
  ];
  for (const [sourceField, value] of fields) {
    pushUrlCandidate(
      candidates,
      "aggregator_source",
      value,
      sourceField,
      isDsireUrl(value)
        ? "DSIRE source URL is kept as an aggregator/source reference and fallback."
        : "Program source URL is available as a fallback source reference.",
      { fallback: true }
    );
  }
  return candidates;
}

function sourceFieldToProfileSource(sourceField, role) {
  if (role === "structured_application_url") return "applicationUrl";
  if (role === "structured_pdf_url") return "pdfUrl";
  if (role === "structured_contact_email") return "contactEmail";
  if (sourceField === "opportunity.websiteUrl") return "opportunity.websiteUrl";
  if (sourceField === "raw.websiteUrl") return "raw.websiteUrl";
  if (sourceField === "dsireClone.program.websiteUrl") return "dsireClone.program.websiteUrl";
  if (sourceField === "summaryHtml_link") return "summaryHtml_link";
  if (sourceField === "raw.summary_link") return "raw.summary_link";
  if (role === "aggregator_source") return "dsire_fallback";
  return "unknown";
}

function selectFirstUniqueSourceChain(candidates) {
  const seen = new Set();
  return candidates.filter((candidate) => {
    const key = [candidate.role, candidate.url || candidate.email, candidate.sourceField].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function resolveOfficialProgramWebsite(opportunity = {}) {
  const directCandidates = collectDirectApplicationCandidates(opportunity);
  const websiteCandidates = collectWebsiteCandidates(opportunity);
  const sourceCandidates = collectProgramSourceCandidates(opportunity);
  const summaryLinks = extractOpportunitySummaryLinks(opportunity);
  const summaryCandidates = [];

  for (const link of summaryLinks) {
    if (link.candidateType === "ignore") continue;
    if (link.candidateType === "application_url") {
      summaryCandidates.push({
        role: "summary_link",
        url: link.url,
        sourceField: "summaryHtml_link",
        status: "candidate",
        reason: link.reason
      });
    } else if (link.candidateType === "pdf") {
      summaryCandidates.push({
        role: "summary_link",
        url: link.url,
        sourceField: "summaryHtml_link",
        status: "candidate",
        reason: link.reason
      });
    } else if (link.candidateType === "email") {
      summaryCandidates.push({
        role: "summary_link",
        email: link.email,
        sourceField: "summaryHtml_link",
        status: "candidate",
        reason: link.reason
      });
    } else if (link.candidateType === "program_website" || link.candidateType === "supporting_document" || link.candidateType === "guidelines" || link.candidateType === "checklist") {
      summaryCandidates.push({
        role: "summary_link",
        url: link.url,
        sourceField: "summaryHtml_link",
        status: "candidate",
        reason: link.reason
      });
    }
  }

  const contactFields = [
    ["opportunity.contactEmail", opportunity?.contactEmail],
    ["opportunity.email", opportunity?.email],
    ["raw.contactEmail", opportunity?.raw?.contactEmail],
    ["raw.email", opportunity?.raw?.email]
  ];
  const emailCandidates = [];
  for (const [sourceField, value] of contactFields) {
    pushEmailCandidate(emailCandidates, value, sourceField, "Structured contact email is available as an email/contact path candidate.");
  }

  const sourceChain = selectFirstUniqueSourceChain([
    ...directCandidates,
    ...emailCandidates,
    ...websiteCandidates,
    ...summaryCandidates,
    ...sourceCandidates
  ]);

  let selected =
    directCandidates.find((candidate) => candidate.url && looksApplicationSpecific(candidate.url, candidate.sourceField)) ||
    directCandidates.find((candidate) => candidate.url && isPdfUrl(candidate.url)) ||
    emailCandidates.find((candidate) => candidate.email) ||
    websiteCandidates.find((candidate) => candidate.sourceField === "opportunity.websiteUrl") ||
    websiteCandidates.find((candidate) => candidate.sourceField === "raw.websiteUrl") ||
    websiteCandidates.find((candidate) => candidate.sourceField === "dsireClone.program.websiteUrl") ||
    summaryCandidates.find((candidate) => candidate.url && /application|apply|form|portal/i.test(candidate.reason || "")) ||
    summaryCandidates.find((candidate) => candidate.url && !isDsireUrl(candidate.url)) ||
    sourceCandidates.find((candidate) => candidate.url);

  for (const candidate of sourceChain) {
    if ((candidate.url && selected?.url === candidate.url) || (candidate.email && selected?.email === candidate.email)) {
      candidate.status = candidate.role === "aggregator_source" ? "fallback" : "selected";
    } else if (candidate.role === "aggregator_source") {
      candidate.status = "fallback";
    } else if (candidate.url && isDsireUrl(candidate.url)) {
      candidate.status = "ignored";
      candidate.reason = `${candidate.reason || "Source URL"} DSIRE is an aggregator/source reference, not the official application page.`;
    }
  }

  const programSourceUrl = cleanOptional(sourceCandidates.find((candidate) => candidate.url)?.url);
  const programWebsiteUrl = cleanOptional(selected?.url && selected.role !== "aggregator_source" ? selected.url : websiteCandidates[0]?.url);
  const programWebsiteSource = selected
    ? sourceFieldToProfileSource(selected.sourceField, selected.role)
    : programWebsiteUrl
      ? sourceFieldToProfileSource(websiteCandidates[0]?.sourceField, websiteCandidates[0]?.role)
      : programSourceUrl
        ? "dsire_fallback"
        : "unknown";

  const notes = [];
  if (programWebsiteUrl) {
    notes.push(`Official program website found from ${programWebsiteSource}.`);
  }
  if (programSourceUrl && isDsireUrl(programSourceUrl)) {
    notes.push("DSIRE source URL is retained only as an aggregator/source reference.");
  }
  if (!programWebsiteUrl && programSourceUrl) {
    notes.push("No structured official website URL was found; falling back to program source URL.");
  }
  if (!programWebsiteUrl && !programSourceUrl && !selected?.email) {
    notes.push("No official program website, application URL, PDF URL, contact email, or source fallback was found.");
  }

  return {
    opportunityId: String(opportunity?.opportunityId || ""),
    programSourceUrl,
    programWebsiteUrl,
    programWebsiteSource,
    sourceChain,
    summaryLinkCandidates: summaryLinks,
    notes
  };
}
