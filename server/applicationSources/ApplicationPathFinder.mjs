const APPLICATION_METHODS = new Set([
  "online_portal",
  "pdf",
  "email",
  "contractor_submitted",
  "utility_portal",
  "tax_accountant_filing",
  "unknown"
]);

const METHOD_STATUSES = new Set(["confirmed", "inferred", "unknown"]);
const PATH_STATUSES = new Set([
  "application_path_found",
  "program_source_only",
  "contact_only",
  "needs_review",
  "source_unreadable",
  "not_attempted"
]);

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_RESPONSE_BYTES = 500_000;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PDF_URL_PATTERN = /\.pdf(?:$|[?#])/i;
const PDF_LINK_TEXT_PATTERN =
  /\b(application form|rebate form|application pdf|program application|download application|application packet)\b/i;
const APPLY_LINK_TEXT_PATTERN =
  /\b(apply|apply now|apply online|application|submit|portal|rebate application|incentive application|enroll|get started|request rebate|reservation|pre-approval|preapproval)\b/i;
const APPLY_LINK_URL_PATTERN =
  /(apply|application|submit|portal|enroll|get-started|reservation|pre-approval|preapproval|rebate)/i;
const CONTRACTOR_PATTERN =
  /\b(contractor must submit|installer must submit|trade ally|participating contractor|approved contractor|participating installer|approved installer|contractor application|contractor submitted|submitted by (?:a )?(?:participating )?(?:contractor|installer)|through a participating contractor)\b/i;
const TAX_PATTERN =
  /\b(irs|tax credit|tax deduction|179d|section 179d|30c|elective pay|direct pay|transferability|transferable credit|claim on (?:a |your )?tax return|tax return|accountant|filing)\b/i;
const UTILITY_PATTERN =
  /\b(utility|utilities|public utility district|pud|electric cooperative|electric company|gas and electric|rebate portal|customer portal|utility portal)\b/i;
const EMAIL_APPLICATION_PATTERN =
  /\b(email|send|submit).{0,100}\b(application|form|rebate|request|documents?)\b|\b(application|form|rebate|request|documents?).{0,100}\b(email|send|submit)\b/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeWhitespace(value) {
  return cleanText(value).replace(/\s+/g, " ");
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text || undefined;
}

function firstHttpUrl(...values) {
  for (const value of values) {
    const text = cleanText(value);
    if (!text) continue;
    try {
      const parsed = new URL(text);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.href;
      }
    } catch {
      // Ignore malformed URL candidates.
    }
  }
  return "";
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
  return PDF_URL_PATTERN.test(cleanText(value));
}

function extractEmail(value) {
  const text = cleanText(value);
  if (!text) return "";
  const match = text.match(EMAIL_PATTERN);
  return match?.[0]?.toLowerCase() || "";
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
  return decodeHtmlEntities(cleanText(value).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
}

function extractTitle(html) {
  const match = cleanText(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? normalizeWhitespace(stripHtml(match[1])).slice(0, 180) : undefined;
}

function resolveUrl(href, baseUrl) {
  const text = decodeHtmlEntities(href);
  if (!text || text.startsWith("#")) return "";
  if (/^mailto:/i.test(text)) return text;

  try {
    const resolved = new URL(text, baseUrl);
    if (resolved.protocol === "http:" || resolved.protocol === "https:") {
      return resolved.href;
    }
  } catch {
    // Ignore malformed links.
  }
  return "";
}

function extractAnchors(html, baseUrl) {
  const anchors = [];
  const anchorPattern = /<a\b([^>]*?)>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = anchorPattern.exec(cleanText(html)))) {
    const attrs = match[1] || "";
    const hrefMatch = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1] || hrefMatch[2] || hrefMatch[3] || "";
    const url = resolveUrl(href, baseUrl);
    const text = normalizeWhitespace(stripHtml(match[2] || ""));
    if (url || text) {
      anchors.push({ url, text, href: decodeHtmlEntities(href) });
    }
  }

  return anchors;
}

function snippetForPattern(text, pattern, radius = 120) {
  const source = normalizeWhitespace(text);
  const match = source.match(pattern);
  if (!match || match.index == null) return "";
  const start = Math.max(0, match.index - radius);
  const end = Math.min(source.length, match.index + match[0].length + radius);
  return source.slice(start, end).trim();
}

function safeSnippet(value, maxLength = 240) {
  const text = normalizeWhitespace(stripHtml(value));
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}

function isBlockedFetchHostname(hostname) {
  const value = cleanText(hostname).toLowerCase();
  if (!value) return true;
  if (["localhost", "ip6-localhost", "metadata.google.internal"].includes(value)) return true;
  if (value === "::1" || value === "0.0.0.0") return true;
  if (/^127\./.test(value) || /^10\./.test(value) || /^192\.168\./.test(value) || /^169\.254\./.test(value)) return true;
  const private172 = value.match(/^172\.(\d{1,2})\./);
  return Boolean(private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31);
}

function assertFetchableUrl(url) {
  const parsed = new URL(url);
  if (!["http:", "https:"].includes(parsed.protocol) || isBlockedFetchHostname(parsed.hostname)) {
    const error = new Error("Source URL host is not allowed for server-side discovery.");
    error.status = 400;
    throw error;
  }
}

function headersGet(headers, key) {
  if (!headers) return "";
  if (typeof headers.get === "function") return cleanText(headers.get(key));
  return cleanText(headers[key] || headers[key.toLowerCase()]);
}

async function readResponseTextWithLimit(response, maxBytes) {
  if (response.body && typeof response.body.getReader === "function") {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value?.byteLength || 0;
      if (bytes > maxBytes) {
        throw new Error(`Source response exceeded ${maxBytes} byte limit.`);
      }
      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
    return text;
  }

  const text = await response.text();
  return text.length > maxBytes ? text.slice(0, maxBytes) : text;
}

async function fetchSourceText(url, options) {
  assertFetchableUrl(url);

  const fetchFn = options.fetchFn || globalThis.fetch;
  if (typeof fetchFn !== "function") {
    throw new Error("Fetch is not available in this runtime.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs);

  try {
    const response = await fetchFn(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        accept: "text/html,text/plain,application/xhtml+xml,*/*;q=0.2",
        "user-agent": "RetroFi ApplicationPathFinder/1.0"
      }
    });

    if (!response?.ok) {
      throw new Error(`Source returned HTTP ${response?.status || "unknown"}.`);
    }

    const contentType = headersGet(response.headers, "content-type");
    if (/application\/pdf/i.test(contentType) || isPdfUrl(url)) {
      return { contentType, text: "", isPdf: true };
    }

    const text = await readResponseTextWithLimit(response, options.maxResponseBytes);
    return { contentType, text, isPdf: false };
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(`Source fetch timed out after ${options.timeoutMs} ms.`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function sourceProfileFromInput(input) {
  return input?.sourceProfile || input?.applicationSource || input?.source || {};
}

function inferredMethodFromSource(sourceProfile) {
  const method = cleanText(sourceProfile?.applicationMethod);
  return APPLICATION_METHODS.has(method) ? method : "unknown";
}

function isUtilityContext(sourceProfile, opportunity, pageText, sourceUrl) {
  return (
    sourceProfile?.sourceType === "utility_portal" ||
    sourceProfile?.applicationMethod === "utility_portal" ||
    UTILITY_PATTERN.test([sourceProfile?.programSourceUrl, sourceProfile?.applicationUrl, opportunity?.administrator, opportunity?.sourceName, pageText, sourceUrl].join(" "))
  );
}

function buildBaseProfile(input) {
  const sourceProfile = sourceProfileFromInput(input);
  const opportunity = input?.opportunity || {};
  return {
    opportunityId: String(sourceProfile?.opportunityId || opportunity?.opportunityId || ""),
    opportunityName: cleanOptional(sourceProfile?.opportunityName || opportunity?.canonicalTitle || opportunity?.normalizedTitle),
    programSourceUrl: cleanOptional(firstHttpUrl(sourceProfile?.programSourceUrl, opportunity?.sourceUrl, opportunity?.websiteUrl)),
    discoveredApplicationUrl: undefined,
    discoveredPdfUrl: undefined,
    discoveredContactEmail: undefined,
    confirmedApplicationMethod: "unknown",
    methodStatus: "unknown",
    pathStatus: "not_attempted",
    evidence: [],
    sourceFetchedAt: undefined,
    sourceTitle: undefined,
    error: undefined,
    notes: []
  };
}

function finalizeProfile(profile) {
  if (!APPLICATION_METHODS.has(profile.confirmedApplicationMethod)) profile.confirmedApplicationMethod = "unknown";
  if (!METHOD_STATUSES.has(profile.methodStatus)) profile.methodStatus = "unknown";
  if (!PATH_STATUSES.has(profile.pathStatus)) profile.pathStatus = "needs_review";
  profile.evidence = profile.evidence.filter((item) => item?.label);
  profile.notes = uniqueValues(profile.notes.map(cleanText)).filter(Boolean);
  return profile;
}

function applyExistingApplicationUrl(profile, sourceProfile, opportunity) {
  const applicationUrl = firstHttpUrl(sourceProfile?.applicationUrl, opportunity?.applicationUrl);
  if (!applicationUrl) return false;

  profile.discoveredApplicationUrl = applicationUrl;
  profile.confirmedApplicationMethod = isPdfUrl(applicationUrl)
    ? "pdf"
    : sourceProfile?.sourceType === "utility_portal" || sourceProfile?.applicationMethod === "utility_portal"
      ? "utility_portal"
      : "online_portal";
  profile.methodStatus = "confirmed";
  profile.pathStatus = "application_path_found";
  if (isPdfUrl(applicationUrl)) {
    profile.discoveredPdfUrl = applicationUrl;
  }
  profile.evidence.push({
    label: isPdfUrl(applicationUrl) ? "Existing PDF application URL" : "Existing application URL",
    textSnippet: "A direct application URL was already present in opportunity metadata.",
    url: applicationUrl
  });
  profile.notes.push("Existing direct application URL was treated as a confirmed path without fetching additional pages.");
  return true;
}

function mailtoEmail(anchor) {
  if (!/^mailto:/i.test(anchor?.href || "")) return "";
  return extractEmail(anchor.href.replace(/^mailto:/i, ""));
}

function findEmailEvidence(anchors, pageText) {
  const mailto = anchors.find((anchor) => mailtoEmail(anchor));
  if (mailto) {
    return {
      email: mailtoEmail(mailto),
      evidence: {
        label: "Email application/contact link found",
        textSnippet: safeSnippet(mailto.text || mailto.href),
        url: mailto.href
      }
    };
  }

  const visibleEmail = extractEmail(pageText);
  if (!visibleEmail) return null;
  return {
    email: visibleEmail,
    evidence: {
      label: "Visible email found",
      textSnippet: snippetForPattern(pageText, EMAIL_PATTERN) || visibleEmail
    }
  };
}

function findApplicationPathInPage({ profile, sourceProfile, opportunity, sourceUrl, html }) {
  const sourceTitle = extractTitle(html);
  const pageText = normalizeWhitespace(stripHtml(html));
  const anchors = extractAnchors(html, sourceUrl);
  const utilityContext = isUtilityContext(sourceProfile, opportunity, pageText, sourceUrl);
  const pdfLink = anchors.find((anchor) => isHttpUrl(anchor.url) && (isPdfUrl(anchor.url) || PDF_LINK_TEXT_PATTERN.test(anchor.text)));
  const applyLink = anchors.find((anchor) => isHttpUrl(anchor.url) && (APPLY_LINK_TEXT_PATTERN.test(anchor.text) || APPLY_LINK_URL_PATTERN.test(anchor.url)));
  const contractorSnippet = snippetForPattern(pageText, CONTRACTOR_PATTERN);
  const taxSnippet = snippetForPattern(pageText, TAX_PATTERN);
  const emailResult = findEmailEvidence(anchors, pageText);
  const hasEmailApplicationLanguage = EMAIL_APPLICATION_PATTERN.test(pageText);

  profile.sourceTitle = sourceTitle;

  if (pdfLink) {
    profile.discoveredPdfUrl = pdfLink.url;
    profile.discoveredApplicationUrl = pdfLink.url;
    profile.confirmedApplicationMethod = "pdf";
    profile.methodStatus = "confirmed";
    profile.pathStatus = "application_path_found";
    profile.evidence.push({
      label: "PDF application link found",
      textSnippet: safeSnippet(pdfLink.text || pdfLink.url),
      url: pdfLink.url
    });
    profile.notes.push("A PDF application/form link was found on the source page.");
    return;
  }

  if (contractorSnippet) {
    profile.confirmedApplicationMethod = "contractor_submitted";
    profile.methodStatus = "confirmed";
    profile.pathStatus = applyLink ? "application_path_found" : "program_source_only";
    profile.evidence.push({
      label: "Contractor-submitted language found",
      textSnippet: safeSnippet(contractorSnippet)
    });
    if (applyLink) {
      profile.discoveredApplicationUrl = applyLink.url;
      profile.evidence.push({
        label: "Contractor application/portal link found",
        textSnippet: safeSnippet(applyLink.text || applyLink.url),
        url: applyLink.url
      });
    }
    profile.notes.push("Source page indicates the application path depends on a contractor, installer, or trade ally.");
    return;
  }

  if (taxSnippet && !applyLink) {
    profile.confirmedApplicationMethod = "tax_accountant_filing";
    profile.methodStatus = "confirmed";
    profile.pathStatus = "program_source_only";
    profile.evidence.push({
      label: "Tax/accountant filing language found",
      textSnippet: safeSnippet(taxSnippet)
    });
    profile.notes.push("Normal application URL may not exist because source language points to tax/accountant filing.");
    return;
  }

  if (applyLink) {
    profile.discoveredApplicationUrl = applyLink.url;
    profile.confirmedApplicationMethod = utilityContext ? "utility_portal" : "online_portal";
    profile.methodStatus = "confirmed";
    profile.pathStatus = "application_path_found";
    profile.evidence.push({
      label: utilityContext ? "Utility portal/application link found" : "Apply link found",
      textSnippet: safeSnippet(applyLink.text || applyLink.url),
      url: applyLink.url
    });
    profile.notes.push(utilityContext ? "A utility-managed application or portal link was found on the source page." : "A direct apply/application link was found on the source page.");
    return;
  }

  if (emailResult && hasEmailApplicationLanguage) {
    profile.discoveredContactEmail = emailResult.email;
    profile.confirmedApplicationMethod = "email";
    profile.methodStatus = "confirmed";
    profile.pathStatus = EMAIL_APPLICATION_PATTERN.test(emailResult.evidence.textSnippet || "") ? "application_path_found" : "contact_only";
    profile.evidence.push(emailResult.evidence);
    profile.notes.push("Source page indicates application or rebate follow-up can happen by email.");
    return;
  }

  if (taxSnippet) {
    profile.confirmedApplicationMethod = "tax_accountant_filing";
    profile.methodStatus = "confirmed";
    profile.pathStatus = "program_source_only";
    profile.evidence.push({
      label: "Tax/accountant filing language found",
      textSnippet: safeSnippet(taxSnippet)
    });
    profile.notes.push("Normal application URL may not exist because source language points to tax/accountant filing.");
    return;
  }

  const inferredMethod = inferredMethodFromSource(sourceProfile);
  profile.confirmedApplicationMethod = inferredMethod;
  profile.methodStatus = inferredMethod === "unknown" ? "unknown" : "inferred";
  profile.pathStatus = "program_source_only";
  if (emailResult) {
    profile.discoveredContactEmail = emailResult.email;
    profile.pathStatus = "contact_only";
    profile.evidence.push(emailResult.evidence);
  }
  profile.notes.push("Source page was readable, but no direct application path was found.");
}

function safeErrorMessage(error) {
  return cleanText(error?.message || "Source could not be read.").slice(0, 240);
}

export async function findOpportunityApplicationPath(input = {}, options = {}) {
  const sourceProfile = sourceProfileFromInput(input);
  const opportunity = input?.opportunity || {};
  const profile = buildBaseProfile(input);
  const timeoutMs = Math.max(1_000, Number(options.timeoutMs || DEFAULT_TIMEOUT_MS));
  const maxResponseBytes = Math.max(50_000, Number(options.maxResponseBytes || DEFAULT_MAX_RESPONSE_BYTES));
  const now = typeof options.now === "function" ? options.now : () => new Date();

  if (applyExistingApplicationUrl(profile, sourceProfile, opportunity)) {
    return finalizeProfile(profile);
  }

  const sourceUrl = firstHttpUrl(profile.programSourceUrl, sourceProfile?.programSourceUrl, sourceProfile?.applicationUrl);
  if (!sourceUrl) {
    const existingEmail = extractEmail(sourceProfile?.contactEmail || opportunity?.contactEmail || opportunity?.email);
    if (existingEmail) {
      profile.discoveredContactEmail = existingEmail;
      profile.confirmedApplicationMethod = "email";
      profile.methodStatus = "inferred";
      profile.pathStatus = "contact_only";
      profile.notes.push("No source URL was available to inspect; existing contact email was preserved as inferred contact path.");
    } else {
      profile.pathStatus = "not_attempted";
      profile.notes.push("No program source URL or application URL was available for path discovery.");
    }
    return finalizeProfile(profile);
  }

  profile.programSourceUrl = sourceUrl;

  try {
    const fetched = await fetchSourceText(sourceUrl, {
      fetchFn: options.fetchFn,
      timeoutMs,
      maxResponseBytes
    });
    profile.sourceFetchedAt = now().toISOString();

    if (fetched.isPdf) {
      profile.discoveredPdfUrl = sourceUrl;
      profile.discoveredApplicationUrl = sourceUrl;
      profile.confirmedApplicationMethod = "pdf";
      profile.methodStatus = "confirmed";
      profile.pathStatus = "application_path_found";
      profile.evidence.push({
        label: "PDF source URL found",
        textSnippet: "The fetched source is a PDF document.",
        url: sourceUrl
      });
      profile.notes.push("Fetched source URL appears to be a PDF application or program document.");
      return finalizeProfile(profile);
    }

    findApplicationPathInPage({
      profile,
      sourceProfile,
      opportunity,
      sourceUrl,
      html: fetched.text
    });
    return finalizeProfile(profile);
  } catch (error) {
    const inferredMethod = inferredMethodFromSource(sourceProfile);
    profile.confirmedApplicationMethod = inferredMethod;
    profile.methodStatus = inferredMethod === "unknown" ? "unknown" : "inferred";
    profile.pathStatus = "source_unreadable";
    profile.error = safeErrorMessage(error);
    profile.notes.push("Source page could not be fetched or read for application path discovery.");
    return finalizeProfile(profile);
  }
}
