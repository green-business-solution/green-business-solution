const CONCRETE_APPLICATION_METHODS = new Set([
  "online_portal",
  "pdf",
  "email",
  "contractor_submitted",
  "utility_portal",
  "tax_accountant_filing",
  "unknown"
]);
const APPLICATION_METHODS = new Set([
  ...CONCRETE_APPLICATION_METHODS,
  "program_website_only",
  "source_only",
  "unreadable",
  "needs_review"
]);

const METHOD_STATUSES = new Set(["confirmed", "inferred", "unknown"]);
const PATH_STATUSES = new Set([
  "application_path_found",
  "program_website_only",
  "source_only",
  "program_source_only",
  "contact_only",
  "needs_review",
  "unreadable",
  "source_unreadable",
  "not_attempted"
]);
const DISCOVERY_STATUSES = new Set([
  "application_path_found",
  "program_website_only",
  "source_only",
  "contact_only",
  "needs_review",
  "unreadable",
  "not_attempted"
]);
const SOURCE_PAGE_LABELS = {
  metadata: "opportunity metadata",
  program_source: "program source",
  program_website: "program website"
};

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_RESPONSE_BYTES = 500_000;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PDF_URL_PATTERN = /\.pdf(?:$|[?#])/i;
const PDF_APPLICATION_URL_PATTERN = /(application|app|form|rebate|claim|incentive|reservation|pre-approval|preapproval)/i;
const PDF_LINK_TEXT_PATTERN =
  /\b(pdf|application form|rebate form|program form|application pdf|program application|download application|download form|application packet|reservation form)\b/i;
const APPLY_LINK_TEXT_PATTERN =
  /\b(apply|apply now|apply online|application|application form|application portal|submit application|online application|rebate application|incentive application|program application|enroll|enrollment|get started|request rebate|reservation|reserve rebate|pre-approval|preapproval|claim|download form|form|email us to apply|contact to apply)\b/i;
const APPLY_LINK_URL_PATTERN =
  /(apply|application|submit|enroll|enrollment|get-started|request-rebate|reservation|pre-approval|preapproval|claim|download-form|application-portal|rebate-portal|contractor-portal|customer-portal|online-application|customerapplication|formstack|salesforce-sites|my\.site\.com)/i;
const PORTAL_LINK_TEXT_PATTERN =
  /\b(application portal|apply portal|rebate portal|incentive portal|contractor portal|customer portal|enrollment portal|online portal)\b/i;
const NON_APPLICATION_LINK_TEXT_PATTERN =
  /\b(program website|program web site|official website|official program website|provider website|administrator website|website|program page|program homepage|learn more|more information|details|overview|eligibility|guidelines|faq)\b/i;
const PROGRAM_WEBSITE_LINK_TEXT_PATTERN =
  /\b(program website|program web site|program url|official website|official program website|provider website|administrator website|website|program page|program homepage|learn more|more information|details)\b/i;
const AGGREGATOR_PATTERN =
  /\b(dsire|database of state incentives|programs\.dsireusa\.org|incentive database|rebate finder|program finder|source database|program summary)\b/i;
const CONTRACTOR_PATTERN =
  /\b(contractor must submit|installer must submit|trade ally|participating contractor|approved contractor|participating installer|approved installer|contractor application|contractor submitted|submitted by (?:a )?(?:participating )?(?:contractor|installer)|through a participating contractor)\b/i;
const TAX_PATTERN =
  /\b(irs|tax credit|tax deduction|179d|section 179d|30c|elective pay|direct pay|transferability|transferable credit|claim on (?:a |your )?tax return|tax return|accountant|filing)\b/i;
const UTILITY_PATTERN =
  /\b(utility|utilities|public utility district|pud|electric cooperative|electric company|gas and electric|rebate portal|customer portal|utility portal)\b/i;
const EMAIL_APPLICATION_PATTERN =
  /\b(email|send|submit|contact).{0,120}\b(application|form|rebate|request|documents?|to apply)\b|\b(application|form|rebate|request|documents?|to apply).{0,120}\b(email|send|submit|contact)\b/i;

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

function isApplicationPdfLink(anchor) {
  return isPdfUrl(anchor?.url) && (PDF_LINK_TEXT_PATTERN.test(anchor?.text || "") || PDF_APPLICATION_URL_PATTERN.test(anchor?.url || ""));
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
  const sourceHtml = cleanText(html);
  let match;

  while ((match = anchorPattern.exec(sourceHtml))) {
    const attrs = match[1] || "";
    const hrefMatch = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1] || hrefMatch[2] || hrefMatch[3] || "";
    const url = resolveUrl(href, baseUrl);
    const text = normalizeWhitespace(stripHtml(match[2] || ""));
    const nearbyHtml = sourceHtml.slice(Math.max(0, match.index - 240), Math.min(sourceHtml.length, anchorPattern.lastIndex + 240));
    const nearbyText = safeSnippet(nearbyHtml, 360);
    if (url || text) {
      anchors.push({ url, text, href: decodeHtmlEntities(href), nearbyText });
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
  return CONCRETE_APPLICATION_METHODS.has(method) ? method : "unknown";
}

function isUtilityContext(sourceProfile, opportunity, pageText, sourceUrl) {
  return (
    sourceProfile?.sourceType === "utility_portal" ||
    sourceProfile?.applicationMethod === "utility_portal" ||
    UTILITY_PATTERN.test([sourceProfile?.programSourceUrl, sourceProfile?.applicationUrl, opportunity?.administrator, opportunity?.sourceName, pageText, sourceUrl].join(" "))
  );
}

function hostnameForUrl(value) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isSameHostname(a, b) {
  const hostA = hostnameForUrl(a);
  const hostB = hostnameForUrl(b);
  return Boolean(hostA && hostB && hostA === hostB);
}

function isSameUrl(a, b) {
  try {
    const urlA = new URL(a);
    const urlB = new URL(b);
    urlA.hash = "";
    urlB.hash = "";
    return urlA.href === urlB.href;
  } catch {
    return false;
  }
}

function isAggregatorContext(sourceProfile, opportunity, pageText, sourceUrl, sourceTitle) {
  const sourceText = [
    sourceProfile?.programSourceUrl,
    sourceProfile?.sourceName,
    sourceProfile?.opportunityName,
    sourceProfile?.notes?.join?.(" "),
    opportunity?.sourceName,
    opportunity?.sourceKey,
    sourceTitle,
    sourceUrl,
    pageText
  ].join(" ");
  return AGGREGATOR_PATTERN.test(sourceText);
}

function findProgramWebsiteLink(anchors, sourceUrl, isAggregator) {
  const candidates = anchors.filter((anchor) => {
    if (!isHttpUrl(anchor.url)) return false;
    if (isPdfUrl(anchor.url)) return false;
    if (isAggregator && isSameHostname(anchor.url, sourceUrl)) return false;
    if (isAggregator) {
      return PROGRAM_WEBSITE_LINK_TEXT_PATTERN.test(anchor.text);
    }
    return /\b(program website|program web site|official website|official program website|provider website|administrator website|program homepage)\b/i.test(anchor.text);
  });

  return candidates[0] || null;
}

function sourcePageLabel(sourcePage) {
  return SOURCE_PAGE_LABELS[sourcePage] || "source page";
}

function evidenceFromAnchor({ label, anchor, sourcePage, sourceUrl, reason }) {
  return {
    label,
    textSnippet: safeSnippet(anchor?.text || anchor?.nearbyText || anchor?.url || anchor?.href),
    url: anchor?.url,
    sourcePage: sourcePageLabel(sourcePage),
    sourceUrl,
    linkText: cleanOptional(anchor?.text),
    href: cleanOptional(anchor?.href),
    nearbyText: cleanOptional(anchor?.nearbyText),
    reason
  };
}

function evidenceFromSnippet({ label, textSnippet, sourcePage, sourceUrl, reason }) {
  return {
    label,
    textSnippet: safeSnippet(textSnippet),
    sourcePage: sourcePageLabel(sourcePage),
    sourceUrl,
    reason
  };
}

function applicationLinkScore(anchor) {
  if (!isHttpUrl(anchor?.url) || isPdfUrl(anchor?.url)) return 0;

  const text = cleanText(anchor.text);
  const url = cleanText(anchor.url);
  let score = 0;

  if (APPLY_LINK_TEXT_PATTERN.test(text)) score += 6;
  if (PORTAL_LINK_TEXT_PATTERN.test(text)) score += 6;
  if (APPLY_LINK_URL_PATTERN.test(url)) score += 4;

  if (NON_APPLICATION_LINK_TEXT_PATTERN.test(text) && !APPLY_LINK_TEXT_PATTERN.test(text) && !PORTAL_LINK_TEXT_PATTERN.test(text)) {
    score -= 8;
  }

  return score;
}

function findBestApplyLink(anchors) {
  return anchors
    .map((anchor) => ({ anchor, score: applicationLinkScore(anchor) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.anchor || null;
}

function legacyPathStatusForDiscovery(discoveryStatus) {
  if (discoveryStatus === "application_path_found") return "application_path_found";
  if (discoveryStatus === "contact_only") return "contact_only";
  if (discoveryStatus === "program_website_only" || discoveryStatus === "source_only") return "program_source_only";
  if (discoveryStatus === "unreadable") return "source_unreadable";
  if (discoveryStatus === "not_attempted") return "not_attempted";
  return "needs_review";
}

function setOutcome(profile, { applicationMethod, confirmedApplicationMethod, methodStatus, discoveryStatus, confidence }) {
  profile.applicationMethod = applicationMethod || profile.applicationMethod || confirmedApplicationMethod || "unknown";
  profile.confirmedApplicationMethod = confirmedApplicationMethod || (CONCRETE_APPLICATION_METHODS.has(profile.applicationMethod) ? profile.applicationMethod : "unknown");
  profile.methodStatus = methodStatus || profile.methodStatus || "unknown";
  profile.discoveryStatus = discoveryStatus || profile.discoveryStatus || "needs_review";
  profile.pathStatus = legacyPathStatusForDiscovery(profile.discoveryStatus);
  profile.confidence = confidence || profile.confidence || "Low";
}

function hasConcreteDiscoveredPath(profile) {
  return Boolean(
    profile.discoveredApplicationUrl ||
      profile.discoveredPdfUrl ||
      profile.pdfUrl ||
      (profile.discoveredContactEmail && profile.applicationMethod === "email")
  );
}

function shouldFollowProgramWebsite(profile, sourceUrl, options) {
  return (
    options.followProgramWebsite !== false &&
    isHttpUrl(profile.programWebsiteUrl) &&
    !isSameUrl(profile.programWebsiteUrl, sourceUrl) &&
    !hasConcreteDiscoveredPath(profile)
  );
}

function addNoDirectPathEvidence(profile, sourcePage, sourceUrl) {
  const label = "No direct application path found";
  if (profile.evidence.some((item) => item.label === label && item.sourceUrl === sourceUrl)) return;
  profile.evidence.push({
    label,
    textSnippet: profile.programWebsiteUrl
      ? "Official program website found, but no direct application path/PDF/email was identified."
      : "Source page was readable, but no direct application path/PDF/email was identified.",
    sourcePage: sourcePageLabel(sourcePage),
    sourceUrl,
    reason: "No apply, application, PDF form, email application, contractor portal, or tax filing path was identified on the inspected page."
  });
}

function buildBaseProfile(input) {
  const sourceProfile = sourceProfileFromInput(input);
  const opportunity = input?.opportunity || {};
  return {
    opportunityId: String(sourceProfile?.opportunityId || opportunity?.opportunityId || ""),
    opportunityName: cleanOptional(sourceProfile?.opportunityName || opportunity?.canonicalTitle || opportunity?.normalizedTitle),
    programSourceUrl: cleanOptional(firstHttpUrl(sourceProfile?.programSourceUrl, opportunity?.sourceUrl, opportunity?.websiteUrl)),
    programWebsiteUrl: undefined,
    discoveredApplicationUrl: undefined,
    discoveredPdfUrl: undefined,
    discoveredContactEmail: undefined,
    pdfUrl: undefined,
    contactEmail: undefined,
    applicationMethod: "unknown",
    discoveryStatus: "not_attempted",
    confidence: "Needs review",
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
  profile.pdfUrl = cleanOptional(profile.pdfUrl || profile.discoveredPdfUrl);
  profile.contactEmail = cleanOptional(profile.contactEmail || profile.discoveredContactEmail);
  profile.discoveredPdfUrl = cleanOptional(profile.discoveredPdfUrl || profile.pdfUrl);
  profile.discoveredContactEmail = cleanOptional(profile.discoveredContactEmail || profile.contactEmail);
  profile.applicationMethod = cleanText(profile.applicationMethod || profile.confirmedApplicationMethod || "unknown");
  profile.discoveryStatus = cleanText(profile.discoveryStatus || profile.pathStatus || "needs_review");
  profile.confidence = cleanText(profile.confidence || "Low");

  if (!APPLICATION_METHODS.has(profile.applicationMethod)) profile.applicationMethod = "unknown";
  if (!APPLICATION_METHODS.has(profile.confirmedApplicationMethod)) profile.confirmedApplicationMethod = "unknown";
  if (!METHOD_STATUSES.has(profile.methodStatus)) profile.methodStatus = "unknown";
  if (!PATH_STATUSES.has(profile.pathStatus)) profile.pathStatus = "needs_review";
  if (!DISCOVERY_STATUSES.has(profile.discoveryStatus)) profile.discoveryStatus = "needs_review";
  if (!["High", "Medium", "Low", "Needs review"].includes(profile.confidence)) profile.confidence = "Low";
  profile.evidence = profile.evidence.filter((item) => item?.label);
  profile.notes = uniqueValues(profile.notes.map(cleanText)).filter(Boolean);
  return profile;
}

function applyExistingApplicationUrl(profile, sourceProfile, opportunity) {
  const applicationUrl = firstHttpUrl(sourceProfile?.applicationUrl, opportunity?.applicationUrl);
  if (!applicationUrl) return false;

  profile.discoveredApplicationUrl = applicationUrl;
  const applicationMethod = isPdfUrl(applicationUrl)
    ? "pdf"
    : sourceProfile?.sourceType === "utility_portal" || sourceProfile?.applicationMethod === "utility_portal"
      ? "utility_portal"
      : "online_portal";
  if (isPdfUrl(applicationUrl)) {
    profile.discoveredPdfUrl = applicationUrl;
    profile.pdfUrl = applicationUrl;
  }
  setOutcome(profile, {
    applicationMethod,
    confirmedApplicationMethod: applicationMethod,
    methodStatus: "confirmed",
    discoveryStatus: "application_path_found",
    confidence: "High"
  });
  profile.evidence.push({
    label: isPdfUrl(applicationUrl) ? "Existing PDF application URL" : "Existing application URL",
    textSnippet: "A direct application URL was already present in opportunity metadata.",
    url: applicationUrl,
    sourcePage: sourcePageLabel("metadata"),
    sourceUrl: applicationUrl,
    reason: "Opportunity metadata already contained a direct application URL."
  });
  profile.notes.push("Existing direct application URL was treated as a confirmed path without fetching additional pages.");
  return true;
}

function mailtoEmail(anchor) {
  if (!/^mailto:/i.test(anchor?.href || "")) return "";
  return extractEmail(anchor.href.replace(/^mailto:/i, ""));
}

function findEmailEvidence(anchors, pageText, sourcePage, sourceUrl) {
  const mailto = anchors.find((anchor) => mailtoEmail(anchor));
  if (mailto) {
    return {
      email: mailtoEmail(mailto),
      evidence: {
        label: "Email application/contact link found",
        textSnippet: safeSnippet(mailto.text || mailto.href),
        url: mailto.href,
        sourcePage: sourcePageLabel(sourcePage),
        sourceUrl,
        linkText: cleanOptional(mailto.text),
        href: cleanOptional(mailto.href),
        nearbyText: cleanOptional(mailto.nearbyText),
        reason: "A mailto link was present on the inspected page."
      }
    };
  }

  const visibleEmail = extractEmail(pageText);
  if (!visibleEmail) return null;
  return {
    email: visibleEmail,
    evidence: {
      label: "Visible email found",
      textSnippet: snippetForPattern(pageText, EMAIL_PATTERN) || visibleEmail,
      sourcePage: sourcePageLabel(sourcePage),
      sourceUrl,
      reason: "A visible email address was present on the inspected page."
    }
  };
}

function findApplicationPathInPage({ profile, sourceProfile, opportunity, sourceUrl, html, sourcePage = "program_source", allowProgramWebsiteDiscovery = true }) {
  const sourceTitle = extractTitle(html);
  const pageText = normalizeWhitespace(stripHtml(html));
  const anchors = extractAnchors(html, sourceUrl);
  const utilityContext = isUtilityContext(sourceProfile, opportunity, pageText, sourceUrl);
  const isAggregator = isAggregatorContext(sourceProfile, opportunity, pageText, sourceUrl, sourceTitle);
  const programWebsiteLink = allowProgramWebsiteDiscovery ? findProgramWebsiteLink(anchors, sourceUrl, isAggregator) : null;
  const pdfLink = anchors.find((anchor) => isHttpUrl(anchor.url) && isApplicationPdfLink(anchor));
  const applyLink = findBestApplyLink(anchors);
  const contractorSnippet = snippetForPattern(pageText, CONTRACTOR_PATTERN);
  const taxSnippet = snippetForPattern(pageText, TAX_PATTERN);
  const emailResult = findEmailEvidence(anchors, pageText, sourcePage, sourceUrl);
  const hasEmailApplicationLanguage = EMAIL_APPLICATION_PATTERN.test(pageText);

  if (sourcePage === "program_source") {
    profile.sourceTitle = sourceTitle;
  }

  if (programWebsiteLink) {
    profile.programWebsiteUrl = programWebsiteLink.url;
    profile.evidence.push(evidenceFromAnchor({
      label: isAggregator ? "Official program website link found" : "Program website link found",
      anchor: programWebsiteLink,
      sourcePage,
      sourceUrl,
      reason: isAggregator
        ? "Aggregator page linked to an official program/provider website."
        : "Source page linked to a program/provider website."
    }));
    profile.notes.push("Program website was found separately from the source page.");
  }

  if (pdfLink) {
    profile.discoveredPdfUrl = pdfLink.url;
    profile.discoveredApplicationUrl = pdfLink.url;
    profile.pdfUrl = pdfLink.url;
    setOutcome(profile, {
      applicationMethod: "pdf",
      confirmedApplicationMethod: "pdf",
      methodStatus: "confirmed",
      discoveryStatus: "application_path_found",
      confidence: "High"
    });
    profile.evidence.push(evidenceFromAnchor({
      label: "PDF application link found",
      anchor: pdfLink,
      sourcePage,
      sourceUrl,
      reason: "Link points to a PDF and its text or URL indicates an application/form path."
    }));
    profile.notes.push(`A PDF application/form link was found on the ${sourcePageLabel(sourcePage)}.`);
    return;
  }

  if (contractorSnippet) {
    setOutcome(profile, {
      applicationMethod: "contractor_submitted",
      confirmedApplicationMethod: "contractor_submitted",
      methodStatus: "confirmed",
      discoveryStatus: applyLink ? "application_path_found" : profile.programWebsiteUrl ? "program_website_only" : "source_only",
      confidence: "High"
    });
    profile.evidence.push(evidenceFromSnippet({
      label: "Contractor-submitted language found",
      textSnippet: contractorSnippet,
      sourcePage,
      sourceUrl,
      reason: "The inspected page says a contractor, installer, or trade ally must participate or submit."
    }));
    if (applyLink) {
      profile.discoveredApplicationUrl = applyLink.url;
      profile.evidence.push(evidenceFromAnchor({
        label: "Contractor application/portal link found",
        anchor: applyLink,
        sourcePage,
        sourceUrl,
        reason: "Contractor language appeared with an application/portal link."
      }));
    }
    profile.notes.push(`${sourcePageLabel(sourcePage)} indicates the application path depends on a contractor, installer, or trade ally.`);
    return;
  }

  if (taxSnippet && !applyLink) {
    setOutcome(profile, {
      applicationMethod: "tax_accountant_filing",
      confirmedApplicationMethod: "tax_accountant_filing",
      methodStatus: "confirmed",
      discoveryStatus: profile.programWebsiteUrl ? "program_website_only" : "source_only",
      confidence: "High"
    });
    profile.evidence.push(evidenceFromSnippet({
      label: "Tax/accountant filing language found",
      textSnippet: taxSnippet,
      sourcePage,
      sourceUrl,
      reason: "The inspected page points to tax/accountant filing rather than a normal application portal."
    }));
    profile.notes.push("Normal application URL may not exist because source language points to tax/accountant filing.");
    return;
  }

  if (applyLink) {
    profile.discoveredApplicationUrl = applyLink.url;
    const applicationMethod = utilityContext ? "utility_portal" : "online_portal";
    setOutcome(profile, {
      applicationMethod,
      confirmedApplicationMethod: applicationMethod,
      methodStatus: "confirmed",
      discoveryStatus: "application_path_found",
      confidence: "High"
    });
    profile.evidence.push(evidenceFromAnchor({
      label: utilityContext ? "Utility portal/application link found" : "Apply link found",
      anchor: applyLink,
      sourcePage,
      sourceUrl,
      reason: utilityContext
        ? "Utility context plus link text/URL indicates an application, enrollment, rebate, or portal path."
        : "Link text/URL indicates an application, enrollment, rebate, reservation, claim, or submission path."
    }));
    profile.notes.push(utilityContext ? `A utility-managed application or portal link was found on the ${sourcePageLabel(sourcePage)}.` : `A direct apply/application link was found on the ${sourcePageLabel(sourcePage)}.`);
    return;
  }

  if (emailResult && hasEmailApplicationLanguage) {
    profile.discoveredContactEmail = emailResult.email;
    profile.contactEmail = emailResult.email;
    setOutcome(profile, {
      applicationMethod: "email",
      confirmedApplicationMethod: "email",
      methodStatus: "confirmed",
      discoveryStatus: EMAIL_APPLICATION_PATTERN.test(emailResult.evidence.textSnippet || "") ? "application_path_found" : "contact_only",
      confidence: "High"
    });
    profile.evidence.push(emailResult.evidence);
    profile.notes.push(`${sourcePageLabel(sourcePage)} indicates application or rebate follow-up can happen by email.`);
    return;
  }

  if (taxSnippet) {
    setOutcome(profile, {
      applicationMethod: "tax_accountant_filing",
      confirmedApplicationMethod: "tax_accountant_filing",
      methodStatus: "confirmed",
      discoveryStatus: profile.programWebsiteUrl ? "program_website_only" : "source_only",
      confidence: "High"
    });
    profile.evidence.push(evidenceFromSnippet({
      label: "Tax/accountant filing language found",
      textSnippet: taxSnippet,
      sourcePage,
      sourceUrl,
      reason: "The inspected page points to tax/accountant filing rather than a normal application portal."
    }));
    profile.notes.push("Normal application URL may not exist because source language points to tax/accountant filing.");
    return;
  }

  const inferredMethod = inferredMethodFromSource(sourceProfile);
  if (
    profile.methodStatus === "confirmed" &&
    CONCRETE_APPLICATION_METHODS.has(profile.confirmedApplicationMethod) &&
    profile.confirmedApplicationMethod !== "unknown"
  ) {
    if (emailResult && !profile.discoveredContactEmail) {
      profile.discoveredContactEmail = emailResult.email;
      profile.contactEmail = emailResult.email;
      profile.evidence.push(emailResult.evidence);
      profile.notes.push("A contact email was found, but email-based application instructions were not confirmed.");
    }
    profile.notes.push(`${sourcePageLabel(sourcePage)} was readable, but no better direct application path was found.`);
    return;
  }

  const applicationMethod = profile.programWebsiteUrl ? "program_website_only" : "source_only";
  const discoveryStatus = profile.programWebsiteUrl ? "program_website_only" : "source_only";
  setOutcome(profile, {
    applicationMethod,
    confirmedApplicationMethod: inferredMethod,
    methodStatus: inferredMethod === "unknown" ? "unknown" : "inferred",
    discoveryStatus,
    confidence: profile.programWebsiteUrl ? "Medium" : "Low"
  });
  if (emailResult) {
    profile.discoveredContactEmail = emailResult.email;
    profile.contactEmail = emailResult.email;
    profile.evidence.push(emailResult.evidence);
    profile.notes.push("A contact email was found, but email-based application instructions were not confirmed.");
  }
  profile.notes.push(
    profile.programWebsiteUrl
      ? "Program website found, application URL not found."
      : `${sourcePageLabel(sourcePage)} was readable, but no direct application path was found.`
  );
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
      profile.contactEmail = existingEmail;
      setOutcome(profile, {
        applicationMethod: "email",
        confirmedApplicationMethod: "email",
        methodStatus: "inferred",
        discoveryStatus: "contact_only",
        confidence: "Medium"
      });
      profile.notes.push("No source URL was available to inspect; existing contact email was preserved as inferred contact path.");
    } else {
      setOutcome(profile, {
        applicationMethod: "needs_review",
        confirmedApplicationMethod: "unknown",
        methodStatus: "unknown",
        discoveryStatus: "not_attempted",
        confidence: "Needs review"
      });
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
      profile.pdfUrl = sourceUrl;
      setOutcome(profile, {
        applicationMethod: "pdf",
        confirmedApplicationMethod: "pdf",
        methodStatus: "confirmed",
        discoveryStatus: "application_path_found",
        confidence: "High"
      });
      profile.evidence.push({
        label: "PDF source URL found",
        textSnippet: "The fetched source is a PDF document.",
        url: sourceUrl,
        sourcePage: sourcePageLabel("program_source"),
        sourceUrl,
        reason: "The provided source URL fetched as a PDF."
      });
      profile.notes.push("Fetched source URL appears to be a PDF application or program document.");
      return finalizeProfile(profile);
    }

    findApplicationPathInPage({
      profile,
      sourceProfile,
      opportunity,
      sourceUrl,
      html: fetched.text,
      sourcePage: "program_source",
      allowProgramWebsiteDiscovery: true
    });

    if (shouldFollowProgramWebsite(profile, sourceUrl, options)) {
      const programWebsiteUrl = profile.programWebsiteUrl;
      try {
        const programWebsiteFetched = await fetchSourceText(programWebsiteUrl, {
          fetchFn: options.fetchFn,
          timeoutMs,
          maxResponseBytes
        });
        profile.programWebsiteFetchedAt = now().toISOString();

        if (programWebsiteFetched.isPdf) {
          profile.discoveredPdfUrl = programWebsiteUrl;
          profile.discoveredApplicationUrl = programWebsiteUrl;
          profile.pdfUrl = programWebsiteUrl;
          setOutcome(profile, {
            applicationMethod: "pdf",
            confirmedApplicationMethod: "pdf",
            methodStatus: "confirmed",
            discoveryStatus: "application_path_found",
            confidence: "High"
          });
          profile.evidence.push({
            label: "PDF program website found",
            textSnippet: "The official program website URL fetched as a PDF document.",
            url: programWebsiteUrl,
            sourcePage: sourcePageLabel("program_website"),
            sourceUrl: programWebsiteUrl,
            reason: "The one-hop official program website response was a PDF."
          });
          profile.notes.push("Official program website fetched as a PDF application or program document.");
        } else {
          findApplicationPathInPage({
            profile,
            sourceProfile,
            opportunity,
            sourceUrl: programWebsiteUrl,
            html: programWebsiteFetched.text,
            sourcePage: "program_website",
            allowProgramWebsiteDiscovery: false
          });
        }
      } catch (programWebsiteError) {
        profile.error = safeErrorMessage(programWebsiteError);
        setOutcome(profile, {
          applicationMethod: "needs_review",
          confirmedApplicationMethod: profile.confirmedApplicationMethod,
          methodStatus: profile.methodStatus,
          discoveryStatus: "needs_review",
          confidence: "Needs review"
        });
        profile.evidence.push({
          label: "Program website unreadable",
          textSnippet: "Official program website was found, but it could not be fetched/read during one-hop discovery.",
          url: programWebsiteUrl,
          sourcePage: sourcePageLabel("program_website"),
          sourceUrl: programWebsiteUrl,
          reason: profile.error
        });
        profile.notes.push("Program website was found, but one-hop application path discovery could not read it.");
      }
    }

    if (!hasConcreteDiscoveredPath(profile) && profile.programWebsiteUrl) {
      addNoDirectPathEvidence(profile, "program_website", profile.programWebsiteUrl);
    } else if (!hasConcreteDiscoveredPath(profile) && profile.discoveryStatus === "source_only") {
      addNoDirectPathEvidence(profile, "program_source", sourceUrl);
    }

    return finalizeProfile(profile);
  } catch (error) {
    const inferredMethod = inferredMethodFromSource(sourceProfile);
    setOutcome(profile, {
      applicationMethod: "unreadable",
      confirmedApplicationMethod: inferredMethod,
      methodStatus: inferredMethod === "unknown" ? "unknown" : "inferred",
      discoveryStatus: "unreadable",
      confidence: "Needs review"
    });
    profile.error = safeErrorMessage(error);
    profile.notes.push("Source page could not be fetched or read for application path discovery.");
    return finalizeProfile(profile);
  }
}
