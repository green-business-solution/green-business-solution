import { cleanSourceText, normalizeWhitespace, sanitizeSnippet } from "./SourceTextHygiene.mjs";

const APPLICATION_LINK_PATTERN =
  /\b(apply|application|online application|application portal|submit application|rebate form|interest form|pre[- ]?approval|preapproval|reservation|enroll|claim)\b/i;
const SUPPORTING_DOCUMENT_PATTERN =
  /\b(guidelines?|checklist|program documents?|foa|nofo|workbook|pdf|forms?|application materials?|instructions?)\b/i;
const PROGRAM_WEBSITE_PATTERN =
  /\b(program website|official website|website|program page|learn more|more information|click here|details)\b/i;
const IGNORE_LINK_PATTERN =
  /\b(dsire resources?|privacy|accessibility|facebook|twitter|linkedin|youtube|instagram|newsletter|sign up|subscribe|terms of use)\b/i;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PDF_URL_PATTERN = /\.pdf(?:$|[?#])/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function decodeHtmlEntities(value) {
  return cleanText(value)
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

function stripHtml(value) {
  return decodeHtmlEntities(
    cleanText(value)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
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

function resolveUrl(href, baseUrl) {
  const text = decodeHtmlEntities(href);
  if (!text || text.startsWith("#")) return "";
  if (/^mailto:/i.test(text)) return text;

  try {
    const resolved = baseUrl ? new URL(text, baseUrl) : new URL(text);
    return ["http:", "https:"].includes(resolved.protocol) ? resolved.href : "";
  } catch {
    return "";
  }
}

function hostnameForUrl(value) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isIgnoredUrl(url) {
  const host = hostnameForUrl(url);
  const text = cleanText(url);
  return host === "programs.dsireusa.org" || host.endsWith(".dsireusa.org") || IGNORE_LINK_PATTERN.test(text);
}

function extractSummaryHtmlValues(opportunity) {
  return [
    opportunity?.summaryHtml,
    opportunity?.summary,
    opportunity?.raw?.summaryHtml,
    opportunity?.raw?.summary,
    opportunity?.dsireClone?.program?.summaryHtml,
    opportunity?.dsireClone?.program?.summary,
    opportunity?.dsireClone?.program?.summaryText
  ].filter((value) => cleanText(value));
}

function linkSurroundingText(html, startIndex, endIndex) {
  const nearbyHtml = cleanText(html).slice(Math.max(0, startIndex - 260), Math.min(cleanText(html).length, endIndex + 260));
  return sanitizeSnippet(stripHtml(nearbyHtml), 420);
}

function classifySummaryLink({ url, email, label, surroundingText }) {
  const combined = normalizeWhitespace([label, surroundingText, url, email].filter(Boolean).join(" "));
  if (!combined) {
    return {
      candidateType: "ignore",
      confidence: "Needs review",
      reason: "Empty summary link candidate."
    };
  }

  if (email || /^mailto:/i.test(url || "")) {
    const applicationEmail = APPLICATION_LINK_PATTERN.test(combined) || /\b(send|submit|email).{0,120}\b(application|form|documents?|rebate)\b/i.test(combined);
    return {
      candidateType: applicationEmail ? "email" : "ignore",
      confidence: applicationEmail ? "High" : "Low",
      reason: applicationEmail
        ? "Summary link/email appears in application submission wording."
        : "Generic contact email was ignored because it is not application-specific."
    };
  }

  if (!isHttpUrl(url) || isIgnoredUrl(url) || IGNORE_LINK_PATTERN.test(combined)) {
    return {
      candidateType: "ignore",
      confidence: "Needs review",
      reason: "Summary link is an aggregator, footer, social, newsletter, or other ignored URL."
    };
  }

  if (PDF_URL_PATTERN.test(url) && APPLICATION_LINK_PATTERN.test(combined)) {
    return {
      candidateType: "pdf",
      confidence: "High",
      reason: "Summary link points to a PDF with application/form wording."
    };
  }

  if (APPLICATION_LINK_PATTERN.test(combined)) {
    return {
      candidateType: "application_url",
      confidence: "High",
      reason: "Summary link text or surrounding sentence indicates an application path."
    };
  }

  if (PDF_URL_PATTERN.test(url) || SUPPORTING_DOCUMENT_PATTERN.test(combined)) {
    return {
      candidateType: PDF_URL_PATTERN.test(url) ? "pdf" : "supporting_document",
      confidence: "Medium",
      reason: "Summary link appears to be a guideline, checklist, workbook, form, or supporting program document."
    };
  }

  if (PROGRAM_WEBSITE_PATTERN.test(combined)) {
    return {
      candidateType: "program_website",
      confidence: /official|program website|website/i.test(combined) ? "Medium" : "Low",
      reason: "Summary link appears to point to an official program website or program information page."
    };
  }

  return {
    candidateType: "program_website",
    confidence: "Low",
    reason: "Summary link is a non-DSIRE external URL, but application specificity is unclear."
  };
}

export function extractOpportunitySummaryLinks(opportunity = {}) {
  const links = [];
  const htmlValues = extractSummaryHtmlValues(opportunity);
  const baseUrl =
    cleanText(opportunity?.websiteUrl) ||
    cleanText(opportunity?.raw?.websiteUrl) ||
    cleanText(opportunity?.dsireClone?.program?.websiteUrl) ||
    cleanText(opportunity?.sourceUrl) ||
    cleanText(opportunity?.raw?.sourceUrl);

  for (const html of htmlValues) {
    const anchorPattern = /<a\b([^>]*?)>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = anchorPattern.exec(html))) {
      const attrs = match[1] || "";
      const hrefMatch = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      if (!hrefMatch) continue;
      const href = hrefMatch[1] || hrefMatch[2] || hrefMatch[3] || "";
      const url = resolveUrl(href, baseUrl);
      const label = normalizeWhitespace(stripHtml(match[2] || "")) || url;
      const surroundingText = linkSurroundingText(html, match.index, anchorPattern.lastIndex);
      const email = /^mailto:/i.test(url) ? (url.match(EMAIL_PATTERN)?.[0] || "").toLowerCase() : undefined;
      const classification = classifySummaryLink({ url, email, label, surroundingText });
      links.push({
        url: /^mailto:/i.test(url) ? undefined : url || undefined,
        email,
        label,
        surroundingText: cleanSourceText(surroundingText).text || surroundingText,
        candidateType: classification.candidateType,
        confidence: classification.confidence,
        reason: classification.reason
      });
    }

    const cleaned = cleanSourceText(stripHtml(html)).text;
    const email = cleaned.match(EMAIL_PATTERN)?.[0]?.toLowerCase();
    if (email && /\b(email|send|submit).{0,120}\b(application|form|documents?|rebate)\b/i.test(cleaned)) {
      links.push({
        email,
        label: email,
        surroundingText: sanitizeSnippet(cleaned, 420),
        candidateType: "email",
        confidence: "Medium",
        reason: "Visible email appears near application submission wording in opportunity summary."
      });
    }
  }

  const seen = new Set();
  return links.filter((link) => {
    const key = [link.candidateType, link.url || link.email, link.label].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
