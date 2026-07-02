import { cleanSourceText, isBoilerplateSourceText, sanitizeSnippet } from "./SourceTextHygiene.mjs";
import { rankApplicationArtifacts, scoreApplicationArtifactCandidate } from "./ApplicationArtifactRanker.mjs";

const CONCRETE_APPLICATION_METHODS = new Set([
  "online_portal",
  "online_form",
  "multi_step_utility_rebate",
  "pdf_checklist",
  "pdf",
  "email",
  "grant_package",
  "hybrid_email_online_portal",
  "contractor_submitted",
  "utility_portal",
  "contractor_involved",
  "loan_application",
  "pdf_guidelines",
  "utility_interconnection",
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
  "program_website_found",
  "program_website_only",
  "source_only",
  "program_source_only",
  "contact_only",
  "needs_review",
  "unreadable",
  "source_unreadable",
  "source_unreadable_or_js_required",
  "needs_user_selection",
  "not_attempted"
]);
const DISCOVERY_STATUSES = new Set([
  "application_path_found",
  "program_website_found",
  "program_website_only",
  "source_only",
  "contact_only",
  "needs_review",
  "unreadable",
  "source_unreadable_or_js_required",
  "needs_user_selection",
  "not_attempted"
]);
const SOURCE_PAGE_LABELS = {
  metadata: "opportunity metadata",
  program_source: "program source",
  program_website: "program website",
  candidate_page: "candidate page",
  application_candidate: "application candidate",
  official_program_website: "official program website"
};

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_RESPONSE_BYTES = 500_000;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PDF_URL_PATTERN = /\.pdf(?:$|[?#])/i;
const PDF_APPLICATION_URL_PATTERN = /(application|app(?!endix)|form|rebate|claim|reservation|pre-approval|preapproval|checklist|guidelines?|workbook|foa|nofo)/i;
const PDF_LINK_TEXT_PATTERN =
  /\b(pdf|application form|rebate form|program form|application pdf|program application|download application|download form|application packet|reservation form)\b/i;
const APPLY_LINK_TEXT_PATTERN =
  /\b(apply|apply now|apply online|application|application form|application portal|submit application|online application|rebate application|incentive application|program application|enroll|enrollment|get started|request rebate|reservation|reserve rebate|pre-approval|preapproval|claim|download form|form|email us to apply|contact to apply)\b/i;
const APPLY_LINK_URL_PATTERN =
  /(apply|application|submit|enroll|enrollment|get-started|request-rebate|reservation|pre-approval|preapproval|claim|download-form|application-portal|rebate-portal|contractor-portal|customer-portal|online-application|customerapplication|formstack|salesforce-sites|my\.site\.com)/i;
const PORTAL_LINK_TEXT_PATTERN =
  /\b(application portal|apply portal|rebate portal|incentive portal|contractor portal|customer portal|enrollment portal|online portal)\b/i;
const NON_APPLICATION_LINK_TEXT_PATTERN =
  /\b(program website|program web site|official website|official program website|provider website|administrator website|website|program page|program homepage|learn more|more information|details|overview|eligibility|faq|forms?\s*&\s*reports?|fillable form help|document help|help|download (?:windows media|quicktime|vlc)|newsletter|sign up|contact us|privacy|accessibility)\b/i;
const GENERIC_NAV_OR_HELP_LINK_PATTERN =
  /\b(forms?\s*&\s*reports?|forms?|reports?|fillable form help|document help|help|download (?:windows media|quicktime|vlc)|newsletter|sign up|contact us|privacy|accessibility)\b/i;
const PROGRAM_WEBSITE_LINK_TEXT_PATTERN =
  /\b(program website|program web site|program url|official website|official program website|provider website|administrator website|website|program page|program homepage|learn more|more information|details)\b/i;
const FORMS_PAGE_LINK_TEXT_PATTERN =
  /\b(forms?|documents?|downloads?|resources?|rebate forms?|application materials?|application documents?|application packet|program forms?|guidelines?|checklist|foa|nofo|workbook)\b/i;
const APPLICATION_INSTRUCTION_PATTERN =
  /\b(how to apply|application instructions?|application requirements?|required documents?|documents needed|before you apply|submit application|apply online|rebate application|pre[- ]?approval application|application form|applicants? must provide|submit the following|upload (?:the )?(?:following )?(?:documents?|forms?))\b/i;
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
const CLOSED_OR_EXHAUSTED_PATTERN =
  /\b(closed for applications?|applications? closed|application portal.{0,40}closed|portal.{0,40}closed|funding exhausted|fully subscribed|no longer accepting|not accepting applications|funds? (?:are )?exhausted|100% of funding)\b/i;
const USER_SELECTION_PATTERN =
  /\b(select|choose|find|enter).{0,80}\b(town|community|municipal light plant|utility|service territory|zip code|municipality)\b|\bmunicipal light plant selection\b/i;

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
  const email = match?.[0]?.toLowerCase() || "";
  if (/\b(?:support|help)@(?:zohoforms|jotform)\.com$/i.test(email)) return "";
  return email;
}

function decodeHtmlEntities(value) {
  return cleanText(value)
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => {
      try {
        return String.fromCodePoint(Number.parseInt(code, 16));
      } catch {
        return "";
      }
    })
    .replace(/&#(\d+);/g, (_, code) => {
      try {
        return String.fromCodePoint(Number.parseInt(code, 10));
      } catch {
        return "";
      }
    });
}

function normalizeEmbeddedAbsoluteUrl(value) {
  const text = decodeHtmlEntities(value);
  const protocolMatches = [...text.matchAll(/https?:\/\//gi)];
  if (protocolMatches.length > 1) {
    return text.slice(protocolMatches[protocolMatches.length - 1].index);
  }
  return text;
}

function stripHtml(value) {
  return decodeHtmlEntities(cleanText(value).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
}

function extractTitle(html) {
  const match = cleanText(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? normalizeWhitespace(stripHtml(match[1])).slice(0, 180) : undefined;
}

function resolveUrl(href, baseUrl) {
  const text = normalizeEmbeddedAbsoluteUrl(href);
  if (!text || text.startsWith("#")) return "";
  if (/^mailto:/i.test(text)) return text;

  try {
    const resolved = new URL(text, baseUrl);
    if (resolved.protocol === "http:" || resolved.protocol === "https:") {
      return normalizeEmbeddedAbsoluteUrl(resolved.href);
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
  const text = sanitizeSnippet(stripHtml(value), maxLength);
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

function topicTokensForContext(sourceProfile, opportunity) {
  const text = [
    sourceProfile?.opportunityName,
    opportunity?.canonicalTitle,
    opportunity?.normalizedTitle,
    opportunity?.category,
    opportunity?.programType,
    ...(Array.isArray(opportunity?.technologies) ? opportunity.technologies : [])
  ]
    .join(" ")
    .toLowerCase();
  return [...new Set((text.match(/[a-z0-9-]{4,}/g) || []).filter((token) => !["program", "rebate", "grant", "loan", "residential", "commercial", "energy"].includes(token)))].slice(0, 12);
}

function topicRelevanceScore(anchor, sourceProfile, opportunity) {
  const tokens = topicTokensForContext(sourceProfile, opportunity);
  if (!tokens.length) return 0;
  const haystack = [anchor?.text, anchor?.url, anchor?.nearbyText].join(" ").toLowerCase();
  return tokens.reduce((score, token) => score + (haystack.includes(token) ? 2 : 0), 0);
}

function unrelatedPenalty(anchor, sourceProfile, opportunity) {
  const title = [sourceProfile?.opportunityName, opportunity?.canonicalTitle, opportunity?.normalizedTitle].join(" ").toLowerCase();
  const haystack = [anchor?.text, anchor?.url].join(" ").toLowerCase();
  let penalty = 0;
  if (title.includes("solar") && /\bgas\b|gas-service|gasline|gas-line|time-of-use|cutoff|cut-off|demo/.test(haystack)) penalty += 16;
  if (title.includes("c-pace") && /\bagricultural|compressed-air|appendix-a|appendix-h\b/.test(haystack) && !/c-pace|project-application|program-guidelines/i.test(haystack)) penalty += 12;
  if (title.includes("school") && /\bveterans|w2|act-32|employer|local-government|publications/.test(haystack)) penalty += 12;
  return penalty;
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

function isDsireSourceUrl(value) {
  const host = hostnameForUrl(value);
  return host === "programs.dsireusa.org" || host.endsWith(".dsireusa.org");
}

function unescapeJsonString(value) {
  return cleanText(value)
    .replace(/\\u0026/gi, "&")
    .replace(/\\\//g, "/")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, " ")
    .replace(/\\t/g, " ");
}

function extractScriptText(html) {
  const scripts = [];
  const scriptPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  const sourceHtml = cleanText(html);
  let match;
  while ((match = scriptPattern.exec(sourceHtml))) {
    scripts.push(match[1] || "");
  }
  return scripts.join("\n");
}

function extractDsireDataCandidates(html, sourceUrl) {
  const scriptText = extractScriptText(html);
  if (!scriptText) return {};

  const candidates = {
    programWebsiteUrl: "",
    applicationUrl: "",
    contactEmail: ""
  };
  const urlEntries = [];
  const keyUrlPattern =
    /["']?([A-Za-z0-9_ -]*(?:website|program\s*url|programUrl|application\s*url|applicationUrl|administrator\s*url|administratorUrl|provider\s*url|providerUrl|url)[A-Za-z0-9_ -]*)["']?\s*:\s*["'](https?:\\?\/\\?\/[^"'<>\s]+)["']/gi;
  let match;
  while ((match = keyUrlPattern.exec(scriptText))) {
    const key = normalizeWhitespace(match[1] || "").toLowerCase();
    const url = unescapeJsonString(match[2] || "");
    if (!isHttpUrl(url) || isSameHostname(url, sourceUrl)) continue;
    urlEntries.push({ key, url });
  }

  const applicationEntry = urlEntries.find((entry) => /application|apply|form|portal/i.test(entry.key));
  const websiteEntry = urlEntries.find((entry) => /website|program|administrator|provider|url/i.test(entry.key) && !/application/i.test(entry.key));
  candidates.applicationUrl = applicationEntry?.url || "";
  candidates.programWebsiteUrl = websiteEntry?.url || "";

  const email = extractEmail(scriptText.replace(/\{\{[\s\S]*?\}\}/g, " "));
  if (email) {
    candidates.contactEmail = email;
  }

  return candidates;
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

function confidenceForScore(score) {
  if (score >= 80) return "High";
  if (score >= 50) return "Medium";
  if (score > 0) return "Low";
  return "Needs review";
}

function addLinkCandidate(profile, candidate) {
  if (!candidate || (!candidate.url && !candidate.email) || !candidate.linkType) return;
  const normalized = {
    url: cleanOptional(candidate.url),
    email: cleanOptional(candidate.email),
    linkType: candidate.linkType || "unknown",
    label: cleanOptional(candidate.label),
    sourcePageUrl: cleanOptional(candidate.sourcePageUrl),
    evidenceSnippet: cleanOptional(safeSnippet(candidate.evidenceSnippet || candidate.label || candidate.url || candidate.email)),
    score: Number(candidate.score || 0),
    confidence: candidate.confidence || confidenceForScore(Number(candidate.score || 0)),
    reason: cleanText(candidate.reason || "Candidate link found during application link discovery.")
  };
  const key = [normalized.linkType, normalized.url || normalized.email, normalized.sourcePageUrl].join("|");
  const existingIndex = profile.candidates.findIndex((item) => [item.linkType, item.url || item.email, item.sourcePageUrl].join("|") === key);
  if (existingIndex >= 0) {
    if ((profile.candidates[existingIndex].score || 0) < normalized.score) {
      profile.candidates[existingIndex] = normalized;
    }
    return;
  }
  profile.candidates.push(normalized);
  if (["application_url", "pdf_application", "portal", "program_website", "contact_email", "contractor_portal", "forms_page", "application_instructions"].includes(normalized.linkType)) {
    addArtifactFromCandidate(profile, normalized);
  }
}

function artifactTypeForCandidate(candidate) {
  if (!candidate) return "supporting_document";
  if (candidate.linkType === "pdf_application") return "pdf";
  if (candidate.linkType === "portal") return "application_portal";
  if (candidate.linkType === "application_url") return /form|jotform|zoho/i.test(candidate.url || candidate.label || "") ? "online_form" : "application_portal";
  if (candidate.linkType === "contractor_portal") return "contractor_portal";
  if (candidate.linkType === "contact_email") return "email_submission";
  if (candidate.linkType === "tax_guidance") return "supporting_document";
  if (candidate.linkType === "forms_page") return "supporting_document";
  if (candidate.linkType === "application_instructions") return "application_portal";
  if (candidate.linkType === "program_website") return "program_website";
  return "supporting_document";
}

function addApplicationArtifact(profile, artifact) {
  if (!artifact || (!artifact.url && !artifact.email) || !artifact.type) return;
  const normalized = {
    type: artifact.type,
    label: cleanText(artifact.label || artifact.url || artifact.email || artifact.type),
    url: cleanOptional(artifact.url),
    email: cleanOptional(artifact.email),
    evidenceSnippet: cleanOptional(safeSnippet(artifact.evidenceSnippet || artifact.label || artifact.url || artifact.email)),
    sourceUrl: cleanOptional(artifact.sourceUrl),
    confidence: artifact.confidence || "Medium"
  };
  const key = [normalized.type, normalized.url || normalized.email, normalized.sourceUrl].join("|");
  if (profile.applicationArtifacts.some((item) => [item.type, item.url || item.email, item.sourceUrl].join("|") === key)) {
    return;
  }
  profile.applicationArtifacts.push(normalized);
}

function addArtifactFromCandidate(profile, candidate) {
  if (!candidate) return;
  addApplicationArtifact(profile, {
    type: artifactTypeForCandidate(candidate),
    label: candidate.label || candidate.linkType,
    url: candidate.url,
    email: candidate.email,
    sourceUrl: candidate.sourcePageUrl,
    evidenceSnippet: candidate.evidenceSnippet,
    confidence: candidate.confidence
  });
}

function applicationLinkScore(anchor, { sourceProfile = {}, opportunity = {} } = {}) {
  if (!isHttpUrl(anchor?.url) || isPdfUrl(anchor?.url)) return 0;

  const text = cleanText(anchor.text);
  const url = cleanText(anchor.url);
  const combined = [text, url, anchor.nearbyText].join(" ");
  if (GENERIC_NAV_OR_HELP_LINK_PATTERN.test(combined) && !/\b(apply|application|application portal|submit application|online application|rebate application|pre[- ]?approval|interest form|request rebate)\b/i.test(combined)) {
    return 0;
  }
  let score = 0;

  if (APPLY_LINK_TEXT_PATTERN.test(text)) score += 6;
  if (PORTAL_LINK_TEXT_PATTERN.test(text)) score += 6;
  if (APPLY_LINK_URL_PATTERN.test(url)) score += 4;
  if (/\b(grants\.pa\.gov|rebates\.nextzero\.org|form\.jotform\.com|jotform|zoho|forms\.zohopublic\.com)\b/i.test(url)) score += 7;
  if (/^apply$/i.test(text)) score += 3;
  if (/\bhow to apply\b/i.test(text) && !/\b(grants\.pa\.gov|jotform|zoho|portal|login)\b/i.test(url)) score -= 5;
  if (score <= 0) return 0;
  score += topicRelevanceScore(anchor, sourceProfile, opportunity);
  score -= unrelatedPenalty(anchor, sourceProfile, opportunity);

  if (NON_APPLICATION_LINK_TEXT_PATTERN.test(text) && !APPLY_LINK_TEXT_PATTERN.test(text) && !PORTAL_LINK_TEXT_PATTERN.test(text)) {
    score -= 8;
  }

  return score;
}

function linkCandidateFromAnchor(anchor, { sourceUrl, utilityContext, sourceProfile, opportunity }) {
  if (!anchor) return null;
  if (/^mailto:/i.test(anchor.href || "")) {
    const email = mailtoEmail(anchor);
    if (!email) return null;
    const applicationLanguage = EMAIL_APPLICATION_PATTERN.test([anchor.text, anchor.nearbyText].join(" "));
    return {
      email,
      linkType: "contact_email",
      label: anchor.text || email,
      sourcePageUrl: sourceUrl,
      evidenceSnippet: anchor.text || anchor.nearbyText || email,
      score: applicationLanguage ? 75 : 35,
      reason: applicationLanguage ? "Mailto link appears in application-related wording." : "Mailto link found, but application use is not confirmed."
    };
  }
  if (!isHttpUrl(anchor.url)) return null;
  if (isApplicationPdfLink(anchor)) {
    const score = pdfLinkScore(anchor, sourceProfile, opportunity);
    if (score <= 0) return null;
    return {
      url: anchor.url,
      linkType: "pdf_application",
      label: anchor.text || anchor.url,
      sourcePageUrl: sourceUrl,
      evidenceSnippet: anchor.text || anchor.nearbyText || anchor.url,
      score,
      reason: "Link points to a PDF and its text or URL indicates an application/form/checklist/guideline artifact."
    };
  }
  if (PORTAL_LINK_TEXT_PATTERN.test(anchor.text || "") || /portal/i.test(anchor.url || "")) {
    const isContractor = /contractor|trade ally|installer/i.test([anchor.text, anchor.url, anchor.nearbyText].join(" "));
    return {
      url: anchor.url,
      linkType: isContractor ? "contractor_portal" : utilityContext ? "portal" : "application_url",
      label: anchor.text || anchor.url,
      sourcePageUrl: sourceUrl,
      evidenceSnippet: anchor.text || anchor.nearbyText || anchor.url,
      score: isContractor ? 90 : 88,
      reason: isContractor ? "Link appears to be a contractor or installer portal." : "Link appears to be an application or rebate portal."
    };
  }
  const applyScore = applicationLinkScore(anchor, { sourceProfile, opportunity });
  if (applyScore > 0) {
    return {
      url: anchor.url,
      linkType: "application_url",
      label: anchor.text || anchor.url,
      sourcePageUrl: sourceUrl,
      evidenceSnippet: anchor.text || anchor.nearbyText || anchor.url,
      score: Math.max(65, Math.min(88, applyScore * 10)),
      reason: "Link text/URL indicates an application, enrollment, reservation, claim, or submission path."
    };
  }
  if (FORMS_PAGE_LINK_TEXT_PATTERN.test(anchor.text || "")) {
    return {
      url: anchor.url,
      linkType: "forms_page",
      label: anchor.text || anchor.url,
      sourcePageUrl: sourceUrl,
      evidenceSnippet: anchor.text || anchor.nearbyText || anchor.url,
      score: 55,
      reason: "Link points to forms, downloads, documents, or application materials and may lead to an application asset."
    };
  }
  return null;
}

function collectAnchorCandidates(profile, anchors, { sourceUrl, utilityContext, sourceProfile, opportunity }) {
  for (const anchor of anchors) {
    addLinkCandidate(profile, linkCandidateFromAnchor(anchor, { sourceUrl, utilityContext, sourceProfile, opportunity }));
  }
}

function findCandidatePageLink(profile, sourceUrl) {
  return profile.candidates
    .filter((candidate) => candidate.url && candidate.sourcePageUrl === sourceUrl && ["forms_page", "application_instructions"].includes(candidate.linkType))
    .filter((candidate) => {
      const ranking = scoreApplicationArtifactCandidate(
        {
          type: artifactTypeForCandidate(candidate),
          label: candidate.label,
          url: candidate.url,
          evidenceSnippet: candidate.evidenceSnippet,
          sourceUrl: candidate.sourcePageUrl,
          reason: candidate.reason
        },
        { opportunity: profile._opportunity || {} }
      );
      return !ranking.ignored && ranking.score >= 55;
    })
    .sort((a, b) => b.score - a.score)[0] || null;
}

function pdfLinkScore(anchor, sourceProfile, opportunity) {
  if (!isApplicationPdfLink(anchor)) return 0;
  const text = [anchor.text, anchor.url, anchor.nearbyText].join(" ");
  let score = 60;
  if (/\b(application|application form|rebate form|interconnection application|project application guide|checklist|guidelines|foa|nofo|workbook)\b/i.test(text)) score += 25;
  if (PDF_APPLICATION_URL_PATTERN.test(anchor.url || "")) score += 10;
  score += topicRelevanceScore(anchor, sourceProfile, opportunity);
  score -= unrelatedPenalty(anchor, sourceProfile, opportunity);
  if (GENERIC_NAV_OR_HELP_LINK_PATTERN.test(text)) score -= 20;
  return score;
}

function findBestPdfLink(anchors, sourceProfile, opportunity) {
  return anchors
    .map((anchor) => ({ anchor, score: pdfLinkScore(anchor, sourceProfile, opportunity) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.anchor || null;
}

function findBestApplyLink(anchors, sourceProfile, opportunity) {
  return anchors
    .map((anchor) => ({ anchor, score: applicationLinkScore(anchor, { sourceProfile, opportunity }) }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.anchor || null;
}

function legacyPathStatusForDiscovery(discoveryStatus) {
  if (discoveryStatus === "application_path_found") return "application_path_found";
  if (discoveryStatus === "contact_only") return "contact_only";
  if (discoveryStatus === "program_website_found" || discoveryStatus === "program_website_only") return "program_website_found";
  if (discoveryStatus === "source_only") return "program_source_only";
  if (discoveryStatus === "source_unreadable_or_js_required") return "source_unreadable_or_js_required";
  if (discoveryStatus === "needs_user_selection") return "needs_user_selection";
  if (discoveryStatus === "unreadable") return "source_unreadable_or_js_required";
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
  if (["application_path_found", "contact_only"].includes(profile.discoveryStatus) && ["unknown", "needs_review"].includes(profile.applicationStatus || "unknown")) {
    profile.applicationStatus = "open";
  }
  if (profile.discoveryStatus === "source_unreadable_or_js_required") {
    profile.applicationStatus = "source_unreadable_or_js_required";
  }
  if (profile.discoveryStatus === "needs_user_selection") {
    profile.applicationStatus = "needs_user_selection";
  }
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

function aggregatorTypeForSource(sourceProfile, opportunity, pageText, sourceUrl, sourceTitle) {
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
  if (isDsireSourceUrl(sourceUrl) || /\b(dsire|database of state incentives|programs\.dsireusa\.org)\b/i.test(sourceText)) return "dsire";
  if (/\b(utility database|rebate finder|program finder|incentive database)\b/i.test(sourceText)) return "utility_database";
  if (AGGREGATOR_PATTERN.test(sourceText)) return "other";
  return "unknown";
}

function addPageInspected(profile, page) {
  if (!page?.url) return;
  const existingIndex = profile.pagesInspected.findIndex((item) => item.url === page.url && item.role === page.role);
  const normalized = {
    url: page.url,
    role: page.role || "candidate_page",
    status: page.status || "fetched",
    title: cleanOptional(page.title),
    error: cleanOptional(page.error)
  };
  if (existingIndex >= 0) {
    profile.pagesInspected[existingIndex] = { ...profile.pagesInspected[existingIndex], ...normalized };
  } else {
    profile.pagesInspected.push(normalized);
  }
}

function syncBestCandidates(profile) {
  profile.candidates = profile.candidates
    .filter((candidate) => candidate?.linkType)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
  const bestPdf = profile.candidates.find((candidate) => candidate.linkType === "pdf_application" && candidate.url);
  const bestApplication = profile.candidates.find((candidate) => ["application_url", "portal", "contractor_portal"].includes(candidate.linkType) && candidate.url);
  const bestEmail = profile.candidates.find((candidate) => candidate.linkType === "contact_email" && candidate.email && candidate.score >= 65);

  profile.bestPdfUrl = cleanOptional(profile.bestPdfUrl || profile.discoveredPdfUrl || profile.pdfUrl || bestPdf?.url);
  profile.bestApplicationUrl = cleanOptional(profile.bestApplicationUrl || (profile.discoveredApplicationUrl && !isPdfUrl(profile.discoveredApplicationUrl) ? profile.discoveredApplicationUrl : "") || bestApplication?.url);
  profile.bestContactEmail = cleanOptional(profile.bestContactEmail || profile.discoveredContactEmail || profile.contactEmail || bestEmail?.email);
}

function linkDiscoveryStatusForProfile(profile) {
  if (profile.bestPdfUrl || profile.discoveredPdfUrl || profile.pdfUrl) return "pdf_found";
  if (profile.bestApplicationUrl || profile.discoveredApplicationUrl) return "application_link_found";
  if (profile.bestContactEmail && profile.applicationMethod === "email") return "email_found";
  if (profile.programWebsiteUrl) return "program_website_found";
  if (profile.discoveryStatus === "unreadable" || profile.pathStatus === "source_unreadable") return "source_unreadable";
  if (profile.discoveryStatus === "needs_review") return "needs_review";
  return "source_only";
}

function buildBaseProfile(input) {
  const sourceProfile = sourceProfileFromInput(input);
  const opportunity = input?.opportunity || {};
  const originalSourceUrl = cleanOptional(firstHttpUrl(sourceProfile?.programSourceUrl, opportunity?.sourceUrl, opportunity?.sourceUrl));
  const programWebsiteUrl = cleanOptional(firstHttpUrl(sourceProfile?.programWebsiteUrl, opportunity?.websiteUrl, opportunity?.raw?.websiteUrl, opportunity?.dsireClone?.program?.websiteUrl));
  return {
    opportunityId: String(sourceProfile?.opportunityId || opportunity?.opportunityId || ""),
    opportunityName: cleanOptional(sourceProfile?.opportunityName || opportunity?.canonicalTitle || opportunity?.normalizedTitle),
    originalSourceUrl,
    programSourceUrl: originalSourceUrl,
    programWebsiteUrl,
    programWebsiteSource: cleanOptional(sourceProfile?.programWebsiteSource),
    isAggregatorSource: false,
    aggregatorType: "unknown",
    discoveredApplicationUrl: undefined,
    discoveredPdfUrl: undefined,
    discoveredContactEmail: undefined,
    bestApplicationUrl: undefined,
    bestPdfUrl: undefined,
    bestContactEmail: undefined,
    pdfUrl: undefined,
    contactEmail: undefined,
    applicationUrl: undefined,
    applicationArtifacts: programWebsiteUrl
      ? [
          {
            type: "program_website",
            label: "Official program website",
            url: programWebsiteUrl,
            sourceUrl: originalSourceUrl,
            confidence: "High",
            evidenceSnippet: sourceProfile?.programWebsiteSource
              ? `Official website found from ${sourceProfile.programWebsiteSource}.`
              : "Official website found from opportunity metadata."
          }
        ]
      : [],
    primaryApplicationArtifacts: [],
    artifactDiagnostics: {
      keptArtifacts: [],
      filteredArtifacts: [],
      lowConfidenceArtifacts: [],
      filteredCount: 0
    },
    applicationMethod: "unknown",
    primaryMethod: "unknown",
    secondaryMethods: [],
    applicationStatus: cleanOptional(sourceProfile?.applicationStatusHint) || "unknown",
    linkDiscoveryStatus: "needs_review",
    discoveryStatus: "not_attempted",
    confidence: "Needs review",
    confirmedApplicationMethod: "unknown",
    methodStatus: "unknown",
    pathStatus: "not_attempted",
    candidates: [],
    pagesInspected: [],
    evidence: [],
    sourceFetchedAt: undefined,
    sourceTitle: undefined,
    sourceChain: Array.isArray(sourceProfile?.sourceChain) ? sourceProfile.sourceChain : [],
    error: undefined,
    notes: []
  };
}

function classifyApplicationMethods(profile, opportunity) {
  const artifacts = Array.isArray(profile.applicationArtifacts) ? profile.applicationArtifacts : [];
  const artifactText = [profile.opportunityName, ...artifacts.map((artifact) => [artifact.type, artifact.label, artifact.url, artifact.email, artifact.evidenceSnippet].join(" "))]
    .join(" ");
  const opportunityText = [
    opportunity?.canonicalTitle,
    opportunity?.normalizedTitle,
    opportunity?.programName,
    opportunity?.category,
    opportunity?.description,
    opportunity?.summary,
    opportunity?.raw?.programName,
    opportunity?.raw?.category
  ].filter(Boolean).join(" ");
  const hasOnlineForm = artifacts.some((artifact) => artifact.type === "online_form" || (!isPdfUrl(artifact.url) && /jotform|zoho|interest-form|\/form(?:\/|$)/i.test(artifact.url || artifact.label || "")));
  const hasPortal = artifacts.some((artifact) =>
    artifact.type !== "program_website" &&
    artifact.type === "application_portal" &&
      !/application instructions/i.test(artifact.label || "") &&
      ![profile.programWebsiteUrl, profile.programSourceUrl, profile.originalSourceUrl].filter(Boolean).includes(artifact.url) ||
    (artifact.type !== "program_website" && /portal|grants\.pa\.gov|rebates\.nextzero\.org/i.test(artifact.url || artifact.label || ""))
  );
  const hasPdf = artifacts.some((artifact) => artifact.type === "pdf" || /\.pdf(?:$|[?#])/i.test(artifact.url || ""));
  const hasChecklistOrGuidelines = artifacts.some((artifact) => ["checklist", "guidelines", "grant_package", "supporting_document"].includes(artifact.type) || /\b(checklist|guidelines?|interconnection|nofo|foa|workbook)\b/i.test(`${artifact.label} ${artifact.url}`));
  const hasChecklistPdf = artifacts.some((artifact) => (artifact.type === "pdf" || /\.pdf(?:$|[?#])/i.test(artifact.url || "")) && /\b(checklist|guidelines?|interconnection|nofo|foa|workbook)\b/i.test(`${artifact.label} ${artifact.url}`));
  const hasEmail = artifacts.some((artifact) => artifact.type === "email_submission" || artifact.email);
  const hasGrant = artifacts.some((artifact) => artifact.type === "grant_package" || /\b(nofo|foa|grant|grants\.pa\.gov|jotform questions|budget workbook|technical application)\b/i.test(`${artifact.label} ${artifact.url}`));
  const hasContractor = artifacts.some((artifact) => artifact.type === "contractor_portal" || /\b(contractor|installer|trade ally)\b/i.test(`${artifact.label} ${artifact.evidenceSnippet}`));
  const secondary = new Set();

  if (hasOnlineForm) secondary.add("online_form");
  if (hasPortal) secondary.add(profile.confirmedApplicationMethod === "utility_portal" ? "utility_portal" : "online_portal");
  if (hasPdf) secondary.add("pdf");
  if (hasChecklistOrGuidelines) secondary.add(hasGrant ? "pdf_guidelines" : "pdf_checklist");
  if (hasEmail) secondary.add("email_submission");
  if (hasContractor) secondary.add("contractor_involved");
  if (/\bloan|zero[- ]?interest|financing\b/i.test(`${artifactText} ${opportunityText}`)) secondary.add("loan_application");
  if (/\binterconnection|net metering\b/i.test(`${artifactText} ${opportunityText}`)) secondary.add("utility_interconnection");

  let primary = profile.applicationMethod || "unknown";
  if (profile.applicationStatus === "needs_user_selection" && /\b(nextzero|rebates\.nextzero|municipal light plant|utility)\b/i.test(`${artifactText} ${opportunityText}`)) primary = "utility_portal";
  else if (/\btmlp|heat pump.*loan|multi[- ]?step|home energy assessment\b/i.test(`${artifactText} ${opportunityText}`) && (hasOnlineForm || hasPdf || hasContractor)) primary = "multi_step_utility_rebate";
  else if (profile.applicationMethod === "contractor_submitted") primary = "contractor_submitted";
  else if (profile.applicationMethod === "tax_accountant_filing") primary = "tax_accountant_filing";
  else if (profile.applicationMethod === "email" && hasEmail && !hasPortal && !hasOnlineForm && !hasPdf) primary = "email";
  else if (hasGrant) primary = "grant_package";
  else if (hasEmail && (hasPortal || hasOnlineForm || hasPdf)) primary = "hybrid_email_online_portal";
  else if (hasPdf && (hasChecklistPdf || /\binterconnection|checklist\b/i.test(artifactText))) primary = "pdf_checklist";
  else if (hasOnlineForm) primary = "online_form";
  else if (hasPortal && profile.confirmedApplicationMethod === "utility_portal") primary = "utility_portal";
  else if (hasPortal) primary = "online_portal";
  else if (hasPdf) primary = "pdf";
  else if (hasEmail) primary = "email";

  if (!CONCRETE_APPLICATION_METHODS.has(primary)) primary = profile.applicationMethod || "unknown";
  if (!CONCRETE_APPLICATION_METHODS.has(primary)) primary = "unknown";
  profile.primaryMethod = primary;
  profile.secondaryMethods = [...secondary].filter((method) => method !== primary).slice(0, 8);
  profile.applicationMethod = primary;
  if (profile.methodStatus === "confirmed" && CONCRETE_APPLICATION_METHODS.has(primary)) {
    profile.confirmedApplicationMethod = primary;
  }
}

function finalizeProfile(profile) {
  profile.pdfUrl = cleanOptional(profile.pdfUrl || profile.discoveredPdfUrl);
  profile.contactEmail = cleanOptional(profile.contactEmail || profile.discoveredContactEmail);
  profile.discoveredPdfUrl = cleanOptional(profile.discoveredPdfUrl || profile.pdfUrl);
  profile.discoveredContactEmail = cleanOptional(profile.discoveredContactEmail || profile.contactEmail);
  syncBestCandidates(profile);
  profile.applicationUrl = cleanOptional(profile.applicationUrl || profile.bestApplicationUrl || (profile.discoveredApplicationUrl && !isPdfUrl(profile.discoveredApplicationUrl) ? profile.discoveredApplicationUrl : ""));
  profile.linkDiscoveryStatus = linkDiscoveryStatusForProfile(profile);
  profile.applicationMethod = cleanText(profile.applicationMethod || profile.confirmedApplicationMethod || "unknown");
  profile.discoveryStatus = cleanText(profile.discoveryStatus || profile.pathStatus || "needs_review");
  profile.confidence = cleanText(profile.confidence || "Low");
  profile.applicationStatus = cleanText(profile.applicationStatus || "unknown");

  if (!APPLICATION_METHODS.has(profile.applicationMethod)) profile.applicationMethod = "unknown";
  if (!APPLICATION_METHODS.has(profile.confirmedApplicationMethod)) profile.confirmedApplicationMethod = "unknown";
  if (!METHOD_STATUSES.has(profile.methodStatus)) profile.methodStatus = "unknown";
  if (!PATH_STATUSES.has(profile.pathStatus)) profile.pathStatus = "needs_review";
  if (!DISCOVERY_STATUSES.has(profile.discoveryStatus)) profile.discoveryStatus = "needs_review";
  if (!["High", "Medium", "Low", "Needs review"].includes(profile.confidence)) profile.confidence = "Low";
  if (!["open", "closed", "funding_exhausted", "future_round_expected", "source_unreadable_or_js_required", "needs_user_selection", "needs_review", "unknown"].includes(profile.applicationStatus)) {
    profile.applicationStatus = "unknown";
  }
  const artifactSeen = new Set();
  const dedupedArtifacts = (profile.applicationArtifacts || []).filter((artifact) => {
    const key = [artifact.type, artifact.url || artifact.email, artifact.sourceUrl].join("|");
    if (!artifact.type || artifactSeen.has(key)) return false;
    artifactSeen.add(key);
    return true;
  }).slice(0, 30);
  const rankedArtifacts = rankApplicationArtifacts({
    artifacts: dedupedArtifacts,
    opportunity: profile._opportunity || {}
  });
  profile.applicationArtifacts = rankedArtifacts.artifacts.slice(0, 20);
  profile.primaryApplicationArtifacts = rankedArtifacts.artifacts
    .filter((artifact) => artifact.type !== "program_website")
    .slice(0, 6);
  profile.artifactDiagnostics = rankedArtifacts.diagnostics;
  classifyApplicationMethods(profile, profile._opportunity || {});
  profile.evidence = profile.evidence.filter((item) => item?.label);
  profile.notes = uniqueValues(profile.notes.map(cleanText)).filter(Boolean);
  delete profile._opportunity;
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
  addLinkCandidate(profile, {
    url: applicationUrl,
    linkType: isPdfUrl(applicationUrl) ? "pdf_application" : "application_url",
    label: isPdfUrl(applicationUrl) ? "Existing PDF application URL" : "Existing application URL",
    sourcePageUrl: applicationUrl,
    evidenceSnippet: "A direct application URL was already present in opportunity metadata.",
    score: 100,
    confidence: "High",
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
  const emailSnippet = snippetForPattern(pageText, EMAIL_PATTERN) || visibleEmail;
  if (isBoilerplateSourceText(emailSnippet)) return null;
  return {
    email: visibleEmail,
    evidence: {
      label: "Visible email found",
      textSnippet: emailSnippet,
      sourcePage: sourcePageLabel(sourcePage),
      sourceUrl,
      reason: "A visible email address was present on the inspected page."
    }
  };
}

function findApplicationPathInPage({ profile, sourceProfile, opportunity, sourceUrl, html, sourcePage = "program_source", allowProgramWebsiteDiscovery = true }) {
  const sourceTitle = extractTitle(html);
  const cleanedPage = cleanSourceText(stripHtml(html));
  const pageText = normalizeWhitespace(cleanedPage.text);
  const anchors = extractAnchors(html, sourceUrl);
  const utilityContext = isUtilityContext(sourceProfile, opportunity, pageText, sourceUrl);
  const isAggregator = isAggregatorContext(sourceProfile, opportunity, pageText, sourceUrl, sourceTitle);
  const isDsire = isDsireSourceUrl(sourceUrl);
  const aggregatorType = aggregatorTypeForSource(sourceProfile, opportunity, pageText, sourceUrl, sourceTitle);
  const programWebsiteLink = allowProgramWebsiteDiscovery ? findProgramWebsiteLink(anchors, sourceUrl, isAggregator) : null;
  const dsireDataCandidates = allowProgramWebsiteDiscovery && (isDsire || isAggregator) ? extractDsireDataCandidates(html, sourceUrl) : {};
  const pdfLink = findBestPdfLink(anchors, sourceProfile, opportunity);
  const applyLink = findBestApplyLink(anchors, sourceProfile, opportunity);
  const contractorSnippet = snippetForPattern(pageText, CONTRACTOR_PATTERN);
  const taxSnippet = snippetForPattern(pageText, TAX_PATTERN);
  const emailResult = findEmailEvidence(anchors, pageText, sourcePage, sourceUrl);
  const hasEmailApplicationLanguage = EMAIL_APPLICATION_PATTERN.test(pageText);
  const closedSnippet = snippetForPattern(pageText, CLOSED_OR_EXHAUSTED_PATTERN);
  const needsSelectionSnippet = snippetForPattern(pageText, USER_SELECTION_PATTERN);

  if (sourcePage === "program_source") {
    profile.sourceTitle = sourceTitle;
    profile.isAggregatorSource = isAggregator || isDsire || aggregatorType !== "unknown";
    profile.aggregatorType = aggregatorType;
  }
  addPageInspected(profile, {
    url: sourceUrl,
    role: sourcePage === "program_source" && (isAggregator || isDsire) ? "aggregator" : sourcePage,
    status: "fetched",
    title: sourceTitle
  });
  collectAnchorCandidates(profile, anchors, { sourceUrl, utilityContext, sourceProfile, opportunity });

  if (closedSnippet) {
    profile.applicationStatus = /funding|funds|100%/i.test(closedSnippet) ? "funding_exhausted" : "closed";
    profile.evidence.push(evidenceFromSnippet({
      label: profile.applicationStatus === "funding_exhausted" ? "Funding exhausted/awarded language found" : "Closed application language found",
      textSnippet: closedSnippet,
      sourcePage,
      sourceUrl,
      reason: "The inspected page states applications are closed, not accepting, or funding is exhausted."
    }));
    profile.notes.push(profile.applicationStatus === "funding_exhausted" ? "Application appears funding-exhausted or fully awarded." : "Application appears closed on the inspected source.");
  }

  if (needsSelectionSnippet && !hasConcreteDiscoveredPath(profile)) {
    profile.applicationStatus = "needs_user_selection";
    profile.evidence.push(evidenceFromSnippet({
      label: "User selection required",
      textSnippet: needsSelectionSnippet,
      sourcePage,
      sourceUrl,
      reason: "The inspected page requires a utility, town, municipality, ZIP, or service-territory selection before a final application path can be confirmed."
    }));
    profile.notes.push("Official page appears to require user selection before final application requirements can be identified.");
  }

  if (programWebsiteLink) {
    profile.programWebsiteUrl = programWebsiteLink.url;
    addLinkCandidate(profile, {
      url: programWebsiteLink.url,
      linkType: "program_website",
      label: programWebsiteLink.text || programWebsiteLink.url,
      sourcePageUrl: sourceUrl,
      evidenceSnippet: programWebsiteLink.text || programWebsiteLink.nearbyText || programWebsiteLink.url,
      score: isAggregator ? 70 : 55,
      confidence: isAggregator ? "Medium" : "Low",
      reason: isAggregator
        ? "Aggregator page linked to an official program/provider website."
        : "Source page linked to a program/provider website."
    });
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

  if (!profile.programWebsiteUrl && dsireDataCandidates.programWebsiteUrl) {
    profile.programWebsiteUrl = dsireDataCandidates.programWebsiteUrl;
    addLinkCandidate(profile, {
      url: dsireDataCandidates.programWebsiteUrl,
      linkType: "program_website",
      label: "Official program website",
      sourcePageUrl: sourceUrl,
      evidenceSnippet: "Official program/provider website URL found in DSIRE source data.",
      score: 70,
      confidence: "Medium",
      reason: "DSIRE embedded data contained an external program/provider website URL."
    });
    profile.evidence.push({
      label: "Official program website link found",
      textSnippet: "Official program/provider website URL found in DSIRE source data.",
      url: dsireDataCandidates.programWebsiteUrl,
      sourcePage: sourcePageLabel(sourcePage),
      sourceUrl,
      href: dsireDataCandidates.programWebsiteUrl,
      reason: "DSIRE embedded data contained an external program/provider website URL."
    });
    profile.notes.push("Program website was found in DSIRE source data.");
  }

  if (dsireDataCandidates.applicationUrl) {
    profile.discoveredApplicationUrl = dsireDataCandidates.applicationUrl;
    const applicationMethod = isPdfUrl(dsireDataCandidates.applicationUrl)
      ? "pdf"
      : utilityContext
        ? "utility_portal"
        : "online_portal";
    if (isPdfUrl(dsireDataCandidates.applicationUrl)) {
      profile.discoveredPdfUrl = dsireDataCandidates.applicationUrl;
      profile.pdfUrl = dsireDataCandidates.applicationUrl;
    }
    addLinkCandidate(profile, {
      url: dsireDataCandidates.applicationUrl,
      linkType: isPdfUrl(dsireDataCandidates.applicationUrl) ? "pdf_application" : "application_url",
      label: isPdfUrl(dsireDataCandidates.applicationUrl) ? "PDF application" : "Application URL",
      sourcePageUrl: sourceUrl,
      evidenceSnippet: "Application URL found in DSIRE source data.",
      score: 95,
      confidence: "High",
      reason: "DSIRE embedded data contained an external application URL."
    });
    setOutcome(profile, {
      applicationMethod,
      confirmedApplicationMethod: applicationMethod,
      methodStatus: "confirmed",
      discoveryStatus: "application_path_found",
      confidence: "High"
    });
    profile.evidence.push({
      label: isPdfUrl(dsireDataCandidates.applicationUrl) ? "PDF application link found" : "Apply link found",
      textSnippet: "Application URL found in DSIRE source data.",
      url: dsireDataCandidates.applicationUrl,
      sourcePage: sourcePageLabel(sourcePage),
      sourceUrl,
      href: dsireDataCandidates.applicationUrl,
      reason: "DSIRE embedded data contained an external application URL."
    });
    return;
  }

  const applicationInstructionSnippet = snippetForPattern(pageText, APPLICATION_INSTRUCTION_PATTERN);
  if (applicationInstructionSnippet) {
    addLinkCandidate(profile, {
      url: sourceUrl,
      linkType: "application_instructions",
      label: "Application instructions",
      sourcePageUrl: sourceUrl,
      evidenceSnippet: applicationInstructionSnippet,
      score: 65,
      confidence: "Medium",
      reason: "Inspected page contains explicit application instructions or application requirement wording."
    });
  }

  if (pdfLink && !applyLink) {
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
    addLinkCandidate(profile, {
      url: applyLink?.url || sourceUrl,
      linkType: applyLink ? "contractor_portal" : "application_instructions",
      label: applyLink?.text || "Contractor-submitted instructions",
      sourcePageUrl: sourceUrl,
      evidenceSnippet: contractorSnippet,
      score: applyLink ? 90 : 75,
      confidence: "High",
      reason: "The inspected page says a contractor, installer, or trade ally must participate or submit."
    });
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
    addLinkCandidate(profile, {
      url: sourceUrl,
      linkType: "tax_guidance",
      label: "Tax/accountant filing guidance",
      sourcePageUrl: sourceUrl,
      evidenceSnippet: taxSnippet,
      score: 80,
      confidence: "High",
      reason: "The inspected page points to tax/accountant filing rather than a normal application portal."
    });
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
    const applyTarget = applyLink.url || applyLink.text || "";
    const applicationMethod = /grants\.pa\.gov|grant|funding portal/i.test(applyTarget)
      ? "online_portal"
      : /jotform|zoho|forms?\.|interest-form|application-payment|\/form/i.test(applyTarget)
        ? "online_form"
        : utilityContext
          ? "utility_portal"
          : "online_portal";
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
    addLinkCandidate(profile, {
      email: emailResult.email,
      linkType: "contact_email",
      label: "Email application contact",
      sourcePageUrl: sourceUrl,
      evidenceSnippet: emailResult.evidence.textSnippet,
      score: 78,
      confidence: "High",
      reason: "Email/contact appears with application, rebate, document, or apply wording."
    });
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
    addLinkCandidate(profile, {
      url: sourceUrl,
      linkType: "tax_guidance",
      label: "Tax/accountant filing guidance",
      sourcePageUrl: sourceUrl,
      evidenceSnippet: taxSnippet,
      score: 80,
      confidence: "High",
      reason: "The inspected page points to tax/accountant filing rather than a normal application portal."
    });
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
    profile.notes.push(`${sourcePageLabel(sourcePage)} was readable, but no better direct application path was found.`);
    return;
  }

  const applicationMethod = "unknown";
  const discoveryStatus = profile.programWebsiteUrl ? "program_website_found" : "source_only";
  setOutcome(profile, {
    applicationMethod,
    confirmedApplicationMethod: inferredMethod,
    methodStatus: inferredMethod === "unknown" ? "unknown" : "inferred",
    discoveryStatus,
    confidence: profile.programWebsiteUrl ? "Medium" : "Low"
  });
  profile.notes.push(
    profile.programWebsiteUrl
      ? "Program website found, application URL not found."
      : `${sourcePageLabel(sourcePage)} was readable, but no direct application path was found.`
  );
  if ((isDsire || isAggregator) && sourcePage === "program_source" && !profile.programWebsiteUrl) {
    profile.notes.push("DSIRE/source aggregator page found, but no official application path was identified.");
  }
}

function safeErrorMessage(error) {
  return cleanText(error?.message || "Source could not be read.").slice(0, 240);
}

export async function findOpportunityApplicationPath(input = {}, options = {}) {
  const sourceProfile = sourceProfileFromInput(input);
  const opportunity = input?.opportunity || {};
  const profile = buildBaseProfile(input);
  profile._opportunity = opportunity;
  const timeoutMs = Math.max(1_000, Number(options.timeoutMs || DEFAULT_TIMEOUT_MS));
  const maxResponseBytes = Math.max(50_000, Number(options.maxResponseBytes || DEFAULT_MAX_RESPONSE_BYTES));
  const now = typeof options.now === "function" ? options.now : () => new Date();

  if (sourceProfile?.applicationStatusHint && sourceProfile.applicationStatusHint !== "unknown") {
    profile.notes.push(`Opportunity metadata indicates application status: ${sourceProfile.applicationStatusHint}.`);
    profile.evidence.push({
      label: "Application status hint from opportunity metadata",
      textSnippet: `Application status hint: ${sourceProfile.applicationStatusHint}`,
      sourcePage: sourcePageLabel("metadata"),
      reason: "Existing opportunity summary/status metadata included closed or funding-exhausted language."
    });
  }

  if (applyExistingApplicationUrl(profile, sourceProfile, opportunity)) {
    return finalizeProfile(profile);
  }

  const sourceUrl = firstHttpUrl(profile.programWebsiteUrl, profile.programSourceUrl, sourceProfile?.programWebsiteUrl, sourceProfile?.programSourceUrl, sourceProfile?.applicationUrl);
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

  const inspectingOfficialWebsite = Boolean(profile.programWebsiteUrl && isSameUrl(sourceUrl, profile.programWebsiteUrl));
  if (!profile.programSourceUrl && !inspectingOfficialWebsite) {
    profile.programSourceUrl = sourceUrl;
  }
  if (inspectingOfficialWebsite && profile.programSourceUrl && isDsireSourceUrl(profile.programSourceUrl)) {
    profile.isAggregatorSource = true;
    profile.aggregatorType = "dsire";
    addPageInspected(profile, {
      url: profile.programSourceUrl,
      role: "aggregator",
      status: "skipped",
      error: "DSIRE used only as aggregator/source reference because structured official website URL was available."
    });
    profile.notes.push("DSIRE used only as aggregator/source reference; official program website was inspected first.");
  }

  try {
    const fetched = await fetchSourceText(sourceUrl, {
      fetchFn: options.fetchFn,
      timeoutMs,
      maxResponseBytes
    });
    profile.sourceFetchedAt = now().toISOString();

    if (fetched.isPdf) {
      addPageInspected(profile, {
        url: sourceUrl,
        role: "application_candidate",
        status: "fetched"
      });
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
      addLinkCandidate(profile, {
        url: sourceUrl,
        linkType: "pdf_application",
        label: "PDF source URL",
        sourcePageUrl: sourceUrl,
        evidenceSnippet: "The fetched source is a PDF document.",
        score: 95,
        confidence: "High",
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
      sourcePage: inspectingOfficialWebsite ? "program_website" : "program_source",
      allowProgramWebsiteDiscovery: !inspectingOfficialWebsite
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
        addPageInspected(profile, {
          url: programWebsiteUrl,
          role: "program_website",
          status: "failed",
          error: profile.error
        });
        setOutcome(profile, {
          applicationMethod: "unknown",
          confirmedApplicationMethod: profile.confirmedApplicationMethod,
          methodStatus: profile.methodStatus,
          discoveryStatus: "source_unreadable_or_js_required",
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

    const candidatePage = !hasConcreteDiscoveredPath(profile) && profile.programWebsiteUrl && options.followCandidatePage !== false
      ? findCandidatePageLink(profile, profile.programWebsiteUrl)
      : null;
    if (candidatePage?.url && !isSameUrl(candidatePage.url, profile.programWebsiteUrl)) {
      try {
        const candidateFetched = await fetchSourceText(candidatePage.url, {
          fetchFn: options.fetchFn,
          timeoutMs,
          maxResponseBytes
        });
        if (candidateFetched.isPdf) {
          profile.discoveredPdfUrl = candidatePage.url;
          profile.discoveredApplicationUrl = candidatePage.url;
          profile.pdfUrl = candidatePage.url;
          addLinkCandidate(profile, {
            url: candidatePage.url,
            linkType: "pdf_application",
            label: candidatePage.label || "PDF application",
            sourcePageUrl: profile.programWebsiteUrl,
            evidenceSnippet: candidatePage.evidenceSnippet,
            score: 95,
            confidence: "High",
            reason: "A high-relevance forms/application candidate fetched as a PDF."
          });
          setOutcome(profile, {
            applicationMethod: "pdf",
            confirmedApplicationMethod: "pdf",
            methodStatus: "confirmed",
            discoveryStatus: "application_path_found",
            confidence: "High"
          });
          addPageInspected(profile, {
            url: candidatePage.url,
            role: "candidate_page",
            status: "fetched"
          });
        } else {
          findApplicationPathInPage({
            profile,
            sourceProfile,
            opportunity,
            sourceUrl: candidatePage.url,
            html: candidateFetched.text,
            sourcePage: "candidate_page",
            allowProgramWebsiteDiscovery: false
          });
        }
      } catch (candidateError) {
        addPageInspected(profile, {
          url: candidatePage.url,
          role: "candidate_page",
          status: "failed",
          error: safeErrorMessage(candidateError)
        });
        profile.notes.push("A high-relevance forms/application candidate link was found, but it could not be fetched/read.");
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
    if (sourceUrl) {
      addPageInspected(profile, {
        url: sourceUrl,
        role: inspectingOfficialWebsite ? "program_website" : isDsireSourceUrl(sourceUrl) ? "aggregator" : "application_candidate",
        status: "failed",
        error: safeErrorMessage(error)
      });
    }
    setOutcome(profile, {
      applicationMethod: "unknown",
      confirmedApplicationMethod: inferredMethod,
      methodStatus: inferredMethod === "unknown" ? "unknown" : "inferred",
      discoveryStatus: "source_unreadable_or_js_required",
      confidence: "Needs review"
    });
    profile.error = safeErrorMessage(error);
    profile.notes.push("Source page could not be fetched or read for application path discovery; source may be blocked, unreadable, or JavaScript-required.");
    return finalizeProfile(profile);
  }
}

export async function discoverOpportunityApplicationLinks(input = {}, options = {}) {
  return findOpportunityApplicationPath(input, options);
}
