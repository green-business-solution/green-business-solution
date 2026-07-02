import { cleanSourceText, isBoilerplateSourceText, sanitizeSnippet } from "./SourceTextHygiene.mjs";
import { fetchSourceContent } from "./SourceContentFetcher.mjs";
import { extractFormRequirementsFromHtml } from "./FormRequirementExtractor.mjs";
import { extractGrantRequirementsFromText } from "./GrantApplicationExtractor.mjs";

const APPLICATION_METHODS = new Set([
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
  "tax_accountant_filing",
  "contractor_involved",
  "loan_application",
  "pdf_guidelines",
  "utility_interconnection",
  "unknown"
]);

const EXTRACTION_STATUSES = new Set([
  "requirements_extracted",
  "partial",
  "needs_review",
  "source_unavailable",
  "source_unreadable_or_js_required",
  "needs_user_selection",
  "needs_pdf_text_extraction",
  "not_attempted"
]);
const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_RESPONSE_BYTES = 600_000;
const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PDF_URL_PATTERN = /\.pdf(?:$|[?#])/i;
const REQUIRED_CONTEXT_PATTERN =
  /\b(required|must|shall|need(?:ed)?|provide|submit|include|attach|upload|copy of|completed|complete|enter|applicant(?:s)? must|application must|documentation)\b/i;
const OPTIONAL_CONTEXT_PATTERN = /\b(optional|if applicable|when applicable|may include)\b/i;
const FORM_FIELD_PATTERN = /\b(field|form|application|applicant information|business information|required fields?)\b/i;
const PREAPPROVAL_PATTERN =
  /\b(pre[- ]?approval|preapproval|pre-authori[sz]ation|reservation|reserve funds|apply before installation|before installation|prior to installation|before purchasing|before work begins)\b/i;
const CONTRACTOR_PATTERN =
  /\b(contractor must submit|installer must submit|trade ally|participating contractor|approved contractor|participating installer|approved installer|contractor application|contractor submitted|submitted by (?:a )?(?:participating )?(?:contractor|installer)|through a participating contractor|contractor portal)\b/i;
const TAX_PATTERN =
  /\b(irs|tax credit|tax deduction|179d|section 179d|30c|elective pay|direct pay|transferability|transferable credit|claim on (?:a |your )?tax return|tax return|accountant|tax filing|form 3468|form 5695)\b/i;
const DEADLINE_PATTERN =
  /\b(deadline|apply by|applications? due|submit by|expires?|expiration|reservation deadline|rolling|first[- ]come|funds are limited|until funds are exhausted|by (?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(?:,\s*\d{4})?)\b/i;
const STEP_PATTERN =
  /\b(apply|complete|download|submit|email|contact|upload|attach|provide|confirm eligibility|review eligibility|reserve|pre[- ]?approval|sign|send)\b/i;
const SYSTEM_STEP_PATTERN =
  /\b(captcha|verification email|email link to|please enter a valid email address to configure zoho sign settings|support@zohoforms\.com|done|cancel|retry)\b/i;
const APPLICATION_SPECIFIC_SECTION_PATTERN =
  /\b(how to apply|application requirements?|required documents?|documents needed|before you apply|required information|application instructions?|application form|submit application|apply online|rebate application|pre[- ]?approval application|applicants? must provide|submit the following|upload (?:the )?(?:following )?(?:documents?|forms?))\b/i;
const DEADLINE_VALUE_PATTERN =
  /\b(rolling|first[- ]come|funds are limited|until funds are exhausted|january|february|march|april|may|june|july|august|september|october|november|december|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2})\b/i;

const FIELD_DEFINITIONS = [
  { id: "business_legal_name", label: "Business legal name", requirementType: "field", patterns: [/\bbusiness legal name\b/i, /\blegal business name\b/i, /\bcompany legal name\b/i] },
  { id: "dba", label: "DBA", requirementType: "field", patterns: [/\bdba\b/i, /\bdoing business as\b/i] },
  { id: "contact_name", label: "Contact name", requirementType: "field", patterns: [/\bcontact name\b/i, /\bprimary contact\b/i, /\bapplicant name\b/i] },
  { id: "contact_email", label: "Contact email", requirementType: "field", patterns: [/\bcontact email\b/i, /\bemail address\b/i, /\bapplicant email\b/i] },
  { id: "phone", label: "Phone", requirementType: "field", patterns: [/\bphone\b/i, /\btelephone\b/i] },
  { id: "site_service_address", label: "Site/service address", requirementType: "field", patterns: [/\bsite address\b/i, /\bservice address\b/i, /\binstallation address\b/i, /\bproject address\b/i, /\bfacility address\b/i] },
  { id: "utility_provider", label: "Utility provider", requirementType: "field", patterns: [/\butility provider\b/i, /\belectric utility\b/i, /\bgas utility\b/i] },
  { id: "utility_account_number", label: "Utility account number", requirementType: "account_number", patterns: [/\butility account number\b/i, /\bcustomer account number\b/i, /\baccount number\b/i, /\bservice account\b/i] },
  { id: "tax_entity_type", label: "Tax/entity type", requirementType: "field", patterns: [/\btax entity type\b/i, /\bentity type\b/i, /\btaxpayer identification\b/i, /\btax id\b/i, /\bein\b/i] },
  { id: "project_type", label: "Project type", requirementType: "field", patterns: [/\bproject type\b/i, /\bmeasure type\b/i, /\bequipment type\b/i] },
  { id: "project_cost", label: "Project cost", requirementType: "field", patterns: [/\bproject cost\b/i, /\btotal project cost\b/i, /\bestimated cost\b/i, /\binstalled cost\b/i] },
  { id: "applicant_customer_information", label: "Applicant/customer information", requirementType: "field", patterns: [/\bapplicant\/customer information\b/i, /\bcustomer information\b/i, /\bapplicant information\b/i] },
  { id: "property_information", label: "Property information", requirementType: "field", patterns: [/\bproperty information\b/i, /\bproperty owner\b/i, /\bparticipating municipality\b/i] },
  { id: "measure_information", label: "Measure information", requirementType: "field", patterns: [/\bmeasure information\b/i, /\bmeasure details\b/i] },
  { id: "registered_capital_provider", label: "Registered capital provider", requirementType: "field", patterns: [/\bregistered capital provider\b/i, /\bcapital provider\b/i] },
  { id: "project_summary_scope", label: "Project summary/scope", requirementType: "field", patterns: [/\bproject summary\b/i, /\bproject scope\b/i, /\bscope of work\b/i] },
  { id: "technical_reviewer", label: "Technical reviewer", requirementType: "field", patterns: [/\btechnical reviewer\b/i] },
  { id: "equipment_quantity", label: "Equipment quantity", requirementType: "field", patterns: [/\bequipment quantity\b/i, /\bquantity of equipment\b/i, /\bfixture count\b/i, /\bnumber of fixtures\b/i, /\bnumber of units\b/i] },
  { id: "existing_equipment", label: "Existing equipment", requirementType: "field", patterns: [/\bexisting equipment\b/i, /\bexisting fixture/i, /\bexisting system\b/i] },
  { id: "proposed_equipment", label: "Proposed equipment", requirementType: "field", patterns: [/\bproposed equipment\b/i, /\bproposed fixture/i, /\bnew equipment\b/i, /\bequipment to be installed\b/i] },
  { id: "contractor_name", label: "Contractor name", requirementType: "contractor", patterns: [/\bcontractor name\b/i, /\binstaller name\b/i] },
  { id: "contractor_license", label: "Contractor license", requirementType: "contractor", patterns: [/\bcontractor license\b/i, /\blicense number\b/i, /\bcontractor certification\b/i] },
  { id: "installation_date", label: "Installation date", requirementType: "field", patterns: [/\binstallation date\b/i, /\bdate of installation\b/i, /\binstalled date\b/i, /\bproject completion date\b/i] },
  { id: "signature", label: "Signature", requirementType: "signature", patterns: [/\bsignature\b/i, /\bauthorized signature\b/i, /\bsigned application\b/i] }
];

const DOCUMENT_DEFINITIONS = [
  { id: "recent_utility_bill", label: "Recent utility bill", requirementType: "bill", patterns: [/\brecent utility bill\b/i, /\bcopy of (?:a )?(?:recent )?utility bill\b/i, /\belectric bill\b/i, /\butility bill\b/i] },
  { id: "itemized_quote", label: "Itemized quote", requirementType: "quote", patterns: [/\bitemized quote\b/i, /\bcontractor quote\b/i, /\bproject quote\b/i, /\bitemized proposal\b/i] },
  { id: "invoice", label: "Invoice", requirementType: "document", patterns: [/\binvoice\b/i, /\bpaid invoice\b/i] },
  { id: "w9", label: "W-9", requirementType: "document", patterns: [/\bw-?9\b/i, /\bform w-?9\b/i] },
  { id: "equipment_spec_sheet", label: "Equipment specification sheet", requirementType: "document", patterns: [/\bequipment specification sheet\b/i, /\bspec sheet\b/i, /\bmanufacturer specification\b/i, /\bcut sheet\b/i] },
  { id: "contractor_license_certification", label: "Contractor license/certification", requirementType: "contractor", patterns: [/\bcontractor license\b/i, /\bcontractor certification\b/i, /\btrade ally certification\b/i] },
  { id: "photos", label: "Photos", requirementType: "document", patterns: [/\bphotos?\b/i, /\bphotographs?\b/i, /\bpictures?\b/i] },
  { id: "proof_of_purchase", label: "Proof of purchase", requirementType: "document", patterns: [/\bproof of purchase\b/i, /\bpurchase receipt\b/i, /\breceipt\b/i] },
  { id: "tax_forms", label: "Tax forms", requirementType: "tax", patterns: [/\btax forms?\b/i, /\bform 3468\b/i, /\bform 5695\b/i, /\btax return\b/i] },
  { id: "energy_audit", label: "Energy audit", requirementType: "document", patterns: [/\benergy audit\b/i, /\baudit report\b/i] },
  { id: "preapproval_form", label: "Pre-approval form", requirementType: "preapproval", patterns: [/\bpre[- ]?approval form\b/i, /\bpreapproval form\b/i, /\breservation form\b/i] }
  ,{ id: "application_fee", label: "$1,000 application fee", requirementType: "other", patterns: [/\$1,?000.{0,80}\bapplication fee\b/i, /\bapplication fee.{0,80}\$1,?000\b/i] }
  ,{ id: "sir_certification", label: "SIR certification", requirementType: "document", patterns: [/\bsir certification\b/i, /\bsavings-to-investment ratio\b/i] }
  ,{ id: "technical_reviewer_credentials", label: "Technical reviewer credentials", requirementType: "document", patterns: [/\btechnical reviewer credentials\b/i, /\btechnical reviewer\b.{0,80}\bcredentials\b/i] }
  ,{ id: "mortgage_lender_consent", label: "Mortgage lender consent", requirementType: "document", patterns: [/\bmortgage lender consent\b/i, /\blender consent\b/i] }
  ,{ id: "cpace_assessment_agreement", label: "C-PACE Assessment Agreement", requirementType: "document", patterns: [/\bc-?pace assessment agreement\b/i, /\bassessment agreement\b/i] }
  ,{ id: "title_report", label: "Title report", requirementType: "document", patterns: [/\btitle report\b/i] }
  ,{ id: "tax_assessor_statement_property_card", label: "Tax assessor statement/property card", requirementType: "document", patterns: [/\btax assessor (?:statement|property card)\b/i, /\bproperty card\b/i] }
  ,{ id: "one_line_diagram", label: "One-line diagram", requirementType: "document", patterns: [/\bone[- ]line diagram\b/i, /\bsingle[- ]line diagram\b/i] }
  ,{ id: "proof_of_property_ownership", label: "Proof of property ownership", requirementType: "document", patterns: [/\bproof of property ownership\b/i, /\bproperty ownership\b/i] }
  ,{ id: "participant_agreement", label: "Signed participant agreement", requirementType: "document", patterns: [/\bsigned participant agreement\b/i, /\bparticipant agreement\b/i] }
  ,{ id: "permission_to_operate", label: "Permission to Operate letter", requirementType: "document", patterns: [/\bpermission to operate\b/i, /\bpto letter\b/i] }
  ,{ id: "certificate_of_completion", label: "Certificate of Completion", requirementType: "document", patterns: [/\bcertificate of completion\b/i] }
];

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeWhitespace(value) {
  return cleanText(value).replace(/\s+/g, " ");
}

function cleanOptional(value) {
  const text = cleanText(value);
  return text || undefined;
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
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

function htmlToReadableText(value) {
  return decodeHtmlEntities(cleanText(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(?:p|div|li|h[1-6]|tr|section|article|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " "));
}

function safeSnippet(value, maxLength = 280) {
  const text = sanitizeSnippet(stripHtml(value), maxLength);
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
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
    const error = new Error("Requirement source URL host is not allowed for server-side extraction.");
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
        throw new Error(`Requirement source response exceeded ${maxBytes} byte limit.`);
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
        accept: "text/html,text/plain,application/pdf,application/xhtml+xml,*/*;q=0.2",
        "user-agent": "RetroFi ApplicationRequirementExtractor/1.0"
      }
    });

    if (!response?.ok) {
      throw new Error(`Requirement source returned HTTP ${response?.status || "unknown"}.`);
    }

    const contentType = headersGet(response.headers, "content-type");
    const text = await readResponseTextWithLimit(response, options.maxResponseBytes);
    return {
      contentType,
      isPdf: /application\/pdf/i.test(contentType) || PDF_URL_PATTERN.test(url),
      text
    };
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(`Requirement source fetch timed out after ${options.timeoutMs} ms.`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function sourceProfileFromInput(input) {
  return input?.sourceProfile || input?.applicationSource || input?.source || {};
}

function pathProfileFromInput(input) {
  return input?.pathProfile || input?.applicationPath || input?.path || {};
}

function normalizeApplicationMethod(value) {
  const method = cleanText(value);
  return APPLICATION_METHODS.has(method) ? method : "unknown";
}

function chooseRequirementSource(sourceProfile, pathProfile, opportunity) {
  return firstHttpUrl(
    pathProfile?.applicationUrl,
    pathProfile?.bestApplicationUrl,
    pathProfile?.bestPdfUrl,
    pathProfile?.discoveredApplicationUrl,
    pathProfile?.discoveredPdfUrl,
    pathProfile?.pdfUrl,
    pathProfile?.programWebsiteUrl,
    pathProfile?.programSourceUrl,
    sourceProfile?.applicationUrl,
    sourceProfile?.programSourceUrl,
    opportunity?.applicationUrl,
    opportunity?.sourceUrl,
    opportunity?.websiteUrl
  );
}

function addRequirementSource(sources, source) {
  const url = firstHttpUrl(source?.url);
  if (!url) return;
  if (sources.some((item) => item.url === url)) return;
  sources.push({
    url,
    role: cleanOptional(source.role) || "source",
    artifactType: cleanOptional(source.artifactType),
    label: cleanOptional(source.label),
    priority: Number(source.priority || 50)
  });
}

function chooseRequirementSources(sourceProfile, pathProfile, opportunity) {
  const sources = [];
  const programWebsiteUrl = firstHttpUrl(pathProfile?.programWebsiteUrl, opportunity?.websiteUrl, sourceProfile?.programWebsiteUrl);
  addRequirementSource(sources, {
    url: programWebsiteUrl,
    role: "official_program_website",
    label: "Official program website",
    priority: 90
  });

  const primaryApplicationUrl = firstHttpUrl(pathProfile?.applicationUrl, pathProfile?.bestApplicationUrl, pathProfile?.discoveredApplicationUrl);
  addRequirementSource(sources, {
    url: primaryApplicationUrl,
    role: "primary_application_url",
    label: "Primary application URL",
    priority: 100
  });

  const pdfUrl = firstHttpUrl(pathProfile?.bestPdfUrl, pathProfile?.pdfUrl, pathProfile?.discoveredPdfUrl);
  addRequirementSource(sources, {
    url: pdfUrl,
    role: "primary_pdf",
    artifactType: "pdf",
    label: "Primary PDF/application document",
    priority: 95
  });

  const relevantArtifacts = [
    ...(Array.isArray(pathProfile?.primaryApplicationArtifacts) ? pathProfile.primaryApplicationArtifacts : []),
    ...(Array.isArray(pathProfile?.applicationArtifacts) ? pathProfile.applicationArtifacts : [])
  ]
    .filter((artifact) => artifact?.url && ["application_portal", "online_form", "pdf", "guidelines", "checklist", "supporting_document", "grant_package", "pre_approval_form", "post_install_form", "contractor_portal"].includes(artifact.type))
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

  for (const artifact of relevantArtifacts) {
    addRequirementSource(sources, {
      url: artifact.url,
      role: artifact.type === "pdf" ? "artifact_pdf" : "artifact",
      artifactType: artifact.type,
      label: artifact.label,
      priority: artifact.type === "pdf" ? 88 : 82
    });
  }

  if (sources.length === 0) {
    addRequirementSource(sources, {
      url: chooseRequirementSource(sourceProfile, pathProfile, opportunity),
      role: "fallback_source",
      label: "Fallback source",
      priority: 30
    });
  }

  const officialPage = sources.filter((source) => source.role === "official_program_website").slice(0, 1);
  const appUrls = sources.filter((source) => source.role === "primary_application_url").slice(0, 1);
  const pdfsAndDocs = sources
    .filter((source) => !["official_program_website", "primary_application_url"].includes(source.role))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 2);
  const fallback = sources.filter((source) => source.role === "fallback_source").slice(0, 1);
  return [...officialPage, ...appUrls, ...pdfsAndDocs, ...fallback].slice(0, 4);
}

function buildBaseProfile(input) {
  const sourceProfile = sourceProfileFromInput(input);
  const pathProfile = pathProfileFromInput(input);
  const opportunity = input?.opportunity || {};
  const applicationMethod = normalizeApplicationMethod(pathProfile?.applicationMethod || pathProfile?.confirmedApplicationMethod || sourceProfile?.applicationMethod);
  const sourceUrl = chooseRequirementSource(sourceProfile, pathProfile, opportunity);

  return {
    opportunityId: String(sourceProfile?.opportunityId || pathProfile?.opportunityId || opportunity?.opportunityId || ""),
    opportunityName: cleanOptional(sourceProfile?.opportunityName || pathProfile?.opportunityName || opportunity?.canonicalTitle || opportunity?.normalizedTitle),
    sourceUrl: cleanOptional(sourceUrl),
    applicationUrl: cleanOptional(firstHttpUrl(pathProfile?.discoveredApplicationUrl, pathProfile?.discoveredPdfUrl, pathProfile?.pdfUrl, sourceProfile?.applicationUrl, opportunity?.applicationUrl)),
    programWebsiteUrl: cleanOptional(firstHttpUrl(pathProfile?.programWebsiteUrl)),
    applicationMethod,
    primaryMethod: cleanOptional(pathProfile?.primaryMethod || applicationMethod) || "unknown",
    secondaryMethods: Array.isArray(pathProfile?.secondaryMethods) ? pathProfile.secondaryMethods : [],
    applicationStatus: cleanOptional(pathProfile?.applicationStatus) || "unknown",
    extractionStatus: "not_attempted",
    requiredFields: [],
    requiredDocuments: [],
    optionalFields: [],
    preApprovalRequired: "unknown",
    contractorRequired: "unknown",
    taxReviewRequired: "unknown",
    deadline: undefined,
    estimatedTime: undefined,
    applicationSteps: [],
    applicationArtifacts: Array.isArray(pathProfile?.applicationArtifacts) ? pathProfile.applicationArtifacts : [],
    primaryApplicationArtifacts: Array.isArray(pathProfile?.primaryApplicationArtifacts) ? pathProfile.primaryApplicationArtifacts : [],
    evidence: [],
    diagnostics: {
      officialWebsiteUsed: Boolean(pathProfile?.programWebsiteUrl),
      officialWebsiteSource: cleanOptional(pathProfile?.programWebsiteSource),
      dsireAggregatorSkipped: Boolean(pathProfile?.isAggregatorSource && pathProfile?.programWebsiteUrl),
      applicationPathFound: Boolean(pathProfile?.bestApplicationUrl || pathProfile?.bestPdfUrl || pathProfile?.discoveredApplicationUrl || pathProfile?.discoveredPdfUrl || pathProfile?.pdfUrl),
      applicationSpecificSectionFound: false,
      extractionAllowed: false,
      reason: "Extraction has not been attempted."
    },
    extractionDiagnostics: {
      sourceUsed: cleanOptional(sourceUrl),
      sourcesInspected: [],
      pdfsFetched: 0,
      pdfsTextExtracted: 0,
      pdfTextExtractionStatus: "not_attempted",
      formFieldExtractionStatus: "not_attempted",
      grantExtractionStatus: "not_attempted",
      isAggregatorSource: Boolean(pathProfile?.isAggregatorSource),
      aggregatorType: cleanOptional(pathProfile?.aggregatorType),
      applicationPathFound: Boolean(pathProfile?.bestApplicationUrl || pathProfile?.bestPdfUrl || pathProfile?.discoveredApplicationUrl || pathProfile?.discoveredPdfUrl || pathProfile?.pdfUrl),
      applicationSpecificSectionFound: false,
      extractionAllowed: false,
      reason: "Extraction has not been attempted."
    },
    notes: [],
    error: undefined
  };
}

function finalizeProfile(profile) {
  if (!APPLICATION_METHODS.has(profile.applicationMethod)) profile.applicationMethod = "unknown";
  if (!EXTRACTION_STATUSES.has(profile.extractionStatus)) profile.extractionStatus = "needs_review";
  if (!["open", "closed", "funding_exhausted", "future_round_expected", "source_unreadable_or_js_required", "needs_user_selection", "needs_review", "unknown"].includes(profile.applicationStatus)) {
    profile.applicationStatus = "unknown";
  }
  profile.requiredFields = dedupeRequirements(profile.requiredFields);
  profile.requiredDocuments = dedupeRequirements(profile.requiredDocuments);
  profile.optionalFields = dedupeRequirements(profile.optionalFields);
  profile.applicationSteps = uniqueValues(profile.applicationSteps.map((item) => safeSnippet(item, 180))).slice(0, 8);
  profile.evidence = profile.evidence.filter((item) => item?.label).slice(0, 12);
  profile.notes = uniqueValues(profile.notes.map(cleanText)).filter(Boolean);
  return profile;
}

function dedupeRequirements(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    if (!item?.id || seen.has(item.id)) continue;
    seen.add(item.id);
    result.push(item);
  }
  return result;
}

function splitEvidenceUnits(text) {
  const lines = cleanText(text)
    .split(/\n+/)
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean);
  const units = [];

  for (const line of lines) {
    if (line.length <= 280) {
      units.push(line);
      continue;
    }
    units.push(...line.split(/(?<=[.!?])\s+/).map((item) => normalizeWhitespace(item)).filter(Boolean));
  }

  return units;
}

function definitionMatchesUnit(definition, unit) {
  return definition.patterns.some((pattern) => pattern.test(unit));
}

function hasApplicationSpecificSection(text, units) {
  return APPLICATION_SPECIFIC_SECTION_PATTERN.test(text) || units.some((unit) => APPLICATION_SPECIFIC_SECTION_PATTERN.test(unit));
}

function hasReliableApplicationPath(pathProfile, profile) {
  const method = normalizeApplicationMethod(pathProfile?.applicationMethod || pathProfile?.confirmedApplicationMethod || profile.applicationMethod);
  if (pathProfile?.applicationUrl) return true;
  if (pathProfile?.bestPdfUrl || pathProfile?.discoveredPdfUrl || pathProfile?.pdfUrl) return true;
  if (pathProfile?.bestApplicationUrl || pathProfile?.discoveredApplicationUrl) return true;
  if (method === "email" && (pathProfile?.bestContactEmail || pathProfile?.discoveredContactEmail || pathProfile?.contactEmail) && pathProfile?.methodStatus === "confirmed") return true;
  if (["contractor_submitted", "tax_accountant_filing"].includes(method) && pathProfile?.methodStatus === "confirmed") return true;
  if ((pathProfile?.applicationArtifacts || []).some((artifact) => ["application_portal", "online_form", "pdf", "email_submission", "grant_package", "pre_approval_form", "post_install_form"].includes(artifact?.type))) return true;
  return false;
}

function isSourceOnlyPath(pathProfile) {
  const status = cleanText(pathProfile?.linkDiscoveryStatus || pathProfile?.discoveryStatus || pathProfile?.pathStatus);
  const method = cleanText(pathProfile?.applicationMethod || pathProfile?.confirmedApplicationMethod);
  return ["source_only", "program_website_found", "program_website_only", "program_source_only"].includes(status) || ["source_only", "program_website_only"].includes(method);
}

function hasRequiredContext(unit, fetched, applicationSpecificSectionFound) {
  if (isBoilerplateSourceText(unit)) return false;
  if (REQUIRED_CONTEXT_PATTERN.test(unit) && (applicationSpecificSectionFound || APPLICATION_SPECIFIC_SECTION_PATTERN.test(unit))) return true;
  if (fetched.isPdf && /[:?]\s*$/.test(unit)) return true;
  if (applicationSpecificSectionFound && FORM_FIELD_PATTERN.test(unit) && /[:?]\s*$/.test(unit)) return true;
  return false;
}

function confidenceForUnit(unit, fetched, applicationSpecificSectionFound) {
  if (REQUIRED_CONTEXT_PATTERN.test(unit)) return "High";
  if (applicationSpecificSectionFound || fetched.isPdf || /[:?]\s*$/.test(unit)) return "Medium";
  return "Low";
}

function buildRequirement(definition, unit, sourceUrl, required, fetched, applicationSpecificSectionFound) {
  return {
    id: definition.id,
    label: definition.label,
    requirementType: definition.requirementType,
    required,
    sourceUrl,
    evidenceSnippet: safeSnippet(unit),
    confidence: required ? confidenceForUnit(unit, fetched, applicationSpecificSectionFound) : "Medium"
  };
}

function extractRequirementsFromDefinitions({ definitions, units, fetched, sourceUrl, applicationSpecificSectionFound }) {
  const required = [];
  const optional = [];

  for (const definition of definitions) {
    const matchingUnits = units.filter((unit) => definitionMatchesUnit(definition, unit));
    const optionalUnit = matchingUnits.find((unit) => OPTIONAL_CONTEXT_PATTERN.test(unit));
    const requiredUnit =
      matchingUnits.find((unit) => hasRequiredContext(unit, fetched, applicationSpecificSectionFound) && !OPTIONAL_CONTEXT_PATTERN.test(unit)) ||
      matchingUnits.find((unit) => fetched.isPdf && /[:?]\s*$/.test(unit) && !OPTIONAL_CONTEXT_PATTERN.test(unit));

    if (requiredUnit) {
      required.push(buildRequirement(definition, requiredUnit, sourceUrl, true, fetched, applicationSpecificSectionFound));
    } else if (optionalUnit) {
      optional.push(buildRequirement(definition, optionalUnit, sourceUrl, false, fetched, applicationSpecificSectionFound));
    }
  }

  return { required, optional };
}

function findFirstSnippet(units, pattern) {
  return units.find((unit) => pattern.test(unit)) || "";
}

function addEvidence(profile, label, sourceUrl, textSnippet) {
  if (!textSnippet) return;
  profile.evidence.push({
    label,
    sourceUrl,
    textSnippet: safeSnippet(textSnippet)
  });
}

function setExtractionDiagnostics(profile, values = {}) {
  profile.diagnostics = {
    ...profile.diagnostics,
    officialWebsiteUsed: Boolean(values.officialWebsiteUsed ?? profile.diagnostics?.officialWebsiteUsed),
    officialWebsiteSource: cleanOptional(values.officialWebsiteSource || profile.diagnostics?.officialWebsiteSource),
    dsireAggregatorSkipped: Boolean(values.dsireAggregatorSkipped ?? profile.diagnostics?.dsireAggregatorSkipped),
    applicationPathFound: Boolean(values.applicationPathFound ?? profile.diagnostics?.applicationPathFound),
    applicationSpecificSectionFound: Boolean(values.applicationSpecificSectionFound ?? profile.diagnostics?.applicationSpecificSectionFound),
    extractionAllowed: Boolean(values.extractionAllowed ?? profile.diagnostics?.extractionAllowed),
    reason: cleanOptional(values.reason || profile.diagnostics?.reason)
  };
  profile.extractionDiagnostics = {
    ...profile.extractionDiagnostics,
    sourceUsed: cleanOptional(values.sourceUsed || profile.extractionDiagnostics?.sourceUsed),
    sourcesInspected: Array.isArray(values.sourcesInspected) ? values.sourcesInspected : profile.extractionDiagnostics?.sourcesInspected || [],
    pdfsFetched: Number(values.pdfsFetched ?? profile.extractionDiagnostics?.pdfsFetched ?? 0),
    pdfsTextExtracted: Number(values.pdfsTextExtracted ?? profile.extractionDiagnostics?.pdfsTextExtracted ?? 0),
    pdfTextExtractionStatus: cleanOptional(values.pdfTextExtractionStatus || profile.extractionDiagnostics?.pdfTextExtractionStatus) || "not_attempted",
    formFieldExtractionStatus: cleanOptional(values.formFieldExtractionStatus || profile.extractionDiagnostics?.formFieldExtractionStatus) || "not_attempted",
    grantExtractionStatus: cleanOptional(values.grantExtractionStatus || profile.extractionDiagnostics?.grantExtractionStatus) || "not_attempted",
    isAggregatorSource: Boolean(values.isAggregatorSource ?? profile.extractionDiagnostics?.isAggregatorSource),
    aggregatorType: cleanOptional(values.aggregatorType || profile.extractionDiagnostics?.aggregatorType),
    applicationPathFound: profile.diagnostics.applicationPathFound,
    applicationSpecificSectionFound: profile.diagnostics.applicationSpecificSectionFound,
    extractionAllowed: profile.diagnostics.extractionAllowed,
    reason: profile.diagnostics.reason
  };
}

function extractDeadline(units) {
  const deadlineUnit = units.find((unit) => DEADLINE_PATTERN.test(unit) && DEADLINE_VALUE_PATTERN.test(unit) && !/^\s*(expiration date|deadline|application deadline|program expiration date)\s*:\s*$/i.test(unit)) || "";
  if (!deadlineUnit) return "";
  if (/\brolling\b|\bfirst[- ]come\b|\bfunds are limited\b|\buntil funds are exhausted\b/i.test(deadlineUnit)) {
    return safeSnippet(deadlineUnit, 180);
  }
  return safeSnippet(deadlineUnit, 180);
}

function extractEstimatedTime(units) {
  const timeUnit = units.find((unit) => /\b(\d+\s*(?:business\s*)?(?:days?|weeks?)|minutes?|hours?)\b.{0,80}\b(process|review|approval|complete|application)\b|\b(process|review|approval|complete|application)\b.{0,80}\b(\d+\s*(?:business\s*)?(?:days?|weeks?)|minutes?|hours?)\b/i.test(unit));
  return timeUnit ? safeSnippet(timeUnit, 160) : "";
}

function extractApplicationSteps(units) {
  const steps = [];
  for (const unit of units) {
    if (isBoilerplateSourceText(unit)) continue;
    if (SYSTEM_STEP_PATTERN.test(unit)) continue;
    const numbered = unit.match(/^(?:step\s*)?\d+[\).:-]?\s+(.+)/i);
    if (numbered && STEP_PATTERN.test(numbered[1])) {
      steps.push(safeSnippet(numbered[1], 180));
      continue;
    }
    if (STEP_PATTERN.test(unit) && (/\b(how to apply|to apply|application|submit|email|upload|pre[- ]?approval)\b/i.test(unit) || REQUIRED_CONTEXT_PATTERN.test(unit))) {
      steps.push(safeSnippet(unit, 180));
    }
  }
  return uniqueValues(steps).slice(0, 8);
}

function mergeRequirements(profile, result = {}) {
  profile.requiredFields.push(...(result.requiredFields || result.required || []));
  profile.requiredDocuments.push(...(result.requiredDocuments || []));
  profile.optionalFields.push(...(result.optionalFields || result.optional || []));
  profile.evidence.push(...(result.evidence || []));
}

function looksLikeFormSource(source, content) {
  const text = [source?.url, source?.label, source?.artifactType, content?.rawHtml, content?.cleanedText].join(" ");
  return /\b(online_form|interest form|jotform|zoho|formstack|gravityform|gform|<form\b|aria-required|field_label|zf-labelName)\b/i.test(text);
}

function looksLikeGrantSource(profile, source, content) {
  const text = [
    profile.applicationMethod,
    profile.primaryMethod,
    profile.secondaryMethods?.join(" "),
    source?.label,
    source?.url,
    source?.artifactType,
    content?.cleanedText
  ].join(" ");
  return /\b(grant_package|grant|nofo|foa|funding opportunity|budget workbook|technical application|cost proposal|project schedule|gata|grants\.pa\.gov)\b/i.test(text);
}

function applyRules(profile, units, sourceUrl, applicationMethod) {
  const preApprovalSnippet = findFirstSnippet(units, PREAPPROVAL_PATTERN);
  const contractorSnippet = findFirstSnippet(units, CONTRACTOR_PATTERN);
  const taxSnippet = findFirstSnippet(units, TAX_PATTERN);

  if (preApprovalSnippet) {
    profile.preApprovalRequired = true;
    addEvidence(profile, "Pre-approval/reservation language found", sourceUrl, preApprovalSnippet);
  }

  if (contractorSnippet || applicationMethod === "contractor_submitted") {
    profile.contractorRequired = true;
    addEvidence(profile, "Contractor participation language found", sourceUrl, contractorSnippet || "Application method was classified as contractor-submitted.");
  }

  if (taxSnippet || applicationMethod === "tax_accountant_filing") {
    profile.taxReviewRequired = true;
    addEvidence(profile, "Tax/accountant filing language found", sourceUrl, taxSnippet || "Application method was classified as tax/accountant filing.");
  }
}

function classifyExtractionStatus(profile) {
  const extractedCount = profile.requiredFields.length + profile.requiredDocuments.length + profile.optionalFields.length;
  const hasRules = profile.preApprovalRequired === true || profile.contractorRequired === true || profile.taxReviewRequired === true || Boolean(profile.deadline);
  const hasSteps = profile.applicationSteps.length > 0;

  if (extractedCount >= 3 || (extractedCount >= 2 && (hasRules || hasSteps))) return "requirements_extracted";
  if (extractedCount > 0 || hasRules || hasSteps) return "partial";
  return "needs_review";
}

function safeErrorMessage(error) {
  return cleanText(error?.message || "Requirement source could not be read.").slice(0, 240);
}

function extractFromFetchedSource(profile, source, fetched, pathProfile) {
  const sourceUrl = source.url;
  const sourceText = fetched.cleanedText || htmlToReadableText(fetched.rawHtml || fetched.rawText || "");
  const cleanedSource = cleanSourceText(sourceText);
  const text = normalizeWhitespace(cleanedSource.text);
  const units = splitEvidenceUnits(cleanedSource.text);
  if (!text) {
    return {
      sourceRecord: {
        url: sourceUrl,
        role: source.role,
        artifactType: source.artifactType,
        status: fetched.error && !fetched.httpStatus ? "failed" : "fetched",
        contentType: fetched.contentType,
        httpStatus: fetched.httpStatus,
        isPdf: Boolean(fetched.isPdf),
        pdfExtractionStatus: fetched.pdfExtractionStatus,
        error: fetched.error || "No extractable non-boilerplate text found."
      },
      applicationSpecificSectionFound: false,
      extractedCount: 0
    };
  }

  const applicationSpecificSectionFound = hasApplicationSpecificSection(text, units);
  const reliableApplicationPathFound = hasReliableApplicationPath(pathProfile, profile);
  const sourceOnlyPath = isSourceOnlyPath(pathProfile);
  const officialSourceNeedsApplicationSection = source.role === "official_program_website" && !fetched.isPdf;
  const sourceExtractionAllowed =
    reliableApplicationPathFound ||
    applicationSpecificSectionFound ||
    (!sourceOnlyPath && !officialSourceNeedsApplicationSection);
  const requirementContextFound = applicationSpecificSectionFound || reliableApplicationPathFound || fetched.isPdf || source.role !== "official_program_website";
  let extractedCount = 0;

  if (sourceExtractionAllowed) {
    const fieldResult = extractRequirementsFromDefinitions({
      definitions: FIELD_DEFINITIONS,
      units,
      fetched,
      sourceUrl,
      applicationSpecificSectionFound: requirementContextFound
    });
    const documentResult = extractRequirementsFromDefinitions({
      definitions: DOCUMENT_DEFINITIONS,
      units,
      fetched,
      sourceUrl,
      applicationSpecificSectionFound: requirementContextFound
    });

    profile.requiredFields.push(...fieldResult.required);
    profile.requiredDocuments.push(...documentResult.required);
    profile.optionalFields.push(...fieldResult.optional, ...documentResult.optional);
    profile.applicationSteps.push(...extractApplicationSteps(units));
    profile.deadline = cleanOptional(profile.deadline || extractDeadline(units));
    profile.estimatedTime = cleanOptional(profile.estimatedTime || extractEstimatedTime(units));
    applyRules(profile, units, sourceUrl, profile.applicationMethod);
    extractedCount += fieldResult.required.length + documentResult.required.length + fieldResult.optional.length + documentResult.optional.length;

    if (looksLikeFormSource(source, fetched)) {
      const formResult = extractFormRequirementsFromHtml(fetched.rawHtml || fetched.rawText || fetched.cleanedText || "", { sourceUrl });
      mergeRequirements(profile, formResult);
      profile.extractionDiagnostics.formFieldExtractionStatus =
        formResult.formFieldExtractionStatus === "form_fields_extracted" ? "form_fields_extracted" : profile.extractionDiagnostics.formFieldExtractionStatus;
      extractedCount += formResult.requiredFields.length + formResult.optionalFields.length;
    }

    if (looksLikeGrantSource(profile, source, fetched)) {
      const grantResult = extractGrantRequirementsFromText(cleanedSource.text, {
        sourceUrl,
        artifacts: profile.applicationArtifacts
      });
      mergeRequirements(profile, grantResult);
      profile.extractionDiagnostics.grantExtractionStatus =
        grantResult.grantExtractionStatus === "grant_requirements_extracted" ? "grant_requirements_extracted" : profile.extractionDiagnostics.grantExtractionStatus;
      extractedCount += grantResult.requiredFields.length + grantResult.requiredDocuments.length;
    }

    if (profile.deadline) {
      addEvidence(profile, "Deadline language found", sourceUrl, profile.deadline);
    }

    for (const requirement of [...fieldResult.required, ...documentResult.required].slice(0, 8)) {
      addEvidence(profile, `${requirement.label} requirement found`, requirement.sourceUrl, requirement.evidenceSnippet);
    }
  }

  return {
    sourceRecord: {
      url: sourceUrl,
      role: source.role,
      artifactType: source.artifactType,
      label: source.label,
      status: fetched.error && !fetched.httpStatus ? "failed" : "fetched",
      contentType: fetched.contentType,
      httpStatus: fetched.httpStatus,
      isPdf: Boolean(fetched.isPdf),
      pdfExtractionStatus: fetched.pdfExtractionStatus,
      pageCount: fetched.pageCount,
      title: fetched.title,
      applicationSpecificSectionFound,
      extractionAllowed: sourceExtractionAllowed,
      extractedCount,
      error: fetched.error
    },
    applicationSpecificSectionFound,
    extractionAllowed: sourceExtractionAllowed,
    extractedCount
  };
}

export async function extractOpportunityApplicationRequirements(input = {}, options = {}) {
  const profile = buildBaseProfile(input);
  const pathProfile = pathProfileFromInput(input);
  const timeoutMs = Math.max(1_000, Number(options.timeoutMs || DEFAULT_TIMEOUT_MS));
  const maxResponseBytes = Math.max(50_000, Number(options.maxResponseBytes || DEFAULT_MAX_RESPONSE_BYTES));

  if (!profile.sourceUrl) {
    profile.extractionStatus = "source_unavailable";
    profile.notes.push("No application URL, PDF URL, program website URL, or program source URL was available for requirement extraction.");
    setExtractionDiagnostics(profile, {
      extractionAllowed: false,
      reason: "No source URL was available for requirement extraction."
    });
    return finalizeProfile(profile);
  }

  if (pathProfile?.applicationStatus === "source_unreadable_or_js_required" || pathProfile?.pathStatus === "source_unreadable_or_js_required") {
    profile.extractionStatus = "source_unreadable_or_js_required";
    profile.notes.push("Requirements not extracted because the official source appears blocked, unreadable, or JavaScript-required.");
    setExtractionDiagnostics(profile, {
      sourceUsed: profile.sourceUrl,
      extractionAllowed: false,
      reason: "Requirements not extracted: source blocked, unreadable, or JavaScript required."
    });
    return finalizeProfile(profile);
  }

  if (pathProfile?.applicationStatus === "needs_user_selection" || pathProfile?.pathStatus === "needs_user_selection") {
    profile.extractionStatus = "needs_user_selection";
    profile.notes.push("Requirements not extracted because the official page requires user selection before a final application path can be confirmed.");
    setExtractionDiagnostics(profile, {
      sourceUsed: profile.sourceUrl,
      extractionAllowed: false,
      reason: "Requirements not extracted: official page requires user selection."
    });
    return finalizeProfile(profile);
  }

  try {
    const requirementSources = chooseRequirementSources(sourceProfileFromInput(input), pathProfile, input?.opportunity || {});
    if (requirementSources.length > 0) {
      profile.sourceUrl = requirementSources[0].url;
      profile.extractionDiagnostics.sourceUsed = requirementSources[0].url;
    }

    const reliableApplicationPathFound = hasReliableApplicationPath(pathProfile, profile);
    const sourceOnlyPath = isSourceOnlyPath(pathProfile);
    const sourceRecords = [];
    let anyApplicationSpecificSectionFound = false;
    let anyExtractionAllowed = false;
    let anyFetched = false;
    let anyPdfNeedsText = false;
    let pdfsFetched = 0;
    let pdfsTextExtracted = 0;

    for (const source of requirementSources) {
      const fetched = await fetchSourceContent(source.url, {
        fetchFn: options.fetchFn,
        timeoutMs,
        maxResponseBytes
      });
      anyFetched = anyFetched || !fetched.error || Boolean(fetched.httpStatus);
      if (fetched.isPdf) {
        pdfsFetched += 1;
        if (fetched.pdfExtractionStatus === "pdf_text_extracted") pdfsTextExtracted += 1;
        else anyPdfNeedsText = true;
      }

      const sourceResult = extractFromFetchedSource(profile, source, fetched, pathProfile);
      sourceRecords.push(sourceResult.sourceRecord);
      anyApplicationSpecificSectionFound = anyApplicationSpecificSectionFound || Boolean(sourceResult.applicationSpecificSectionFound);
      anyExtractionAllowed = anyExtractionAllowed || Boolean(sourceResult.extractionAllowed);
    }

    const extractionAllowed = reliableApplicationPathFound || anyApplicationSpecificSectionFound || anyExtractionAllowed;
    setExtractionDiagnostics(profile, {
      sourceUsed: profile.sourceUrl,
      sourcesInspected: sourceRecords,
      pdfsFetched,
      pdfsTextExtracted,
      pdfTextExtractionStatus: pdfsFetched === 0 ? "not_attempted" : pdfsTextExtracted > 0 ? "pdf_text_extracted" : "pdf_text_unavailable",
      formFieldExtractionStatus: profile.extractionDiagnostics.formFieldExtractionStatus,
      grantExtractionStatus: profile.extractionDiagnostics.grantExtractionStatus,
      isAggregatorSource: Boolean(pathProfile?.isAggregatorSource),
      aggregatorType: cleanOptional(pathProfile?.aggregatorType),
      officialWebsiteUsed: Boolean(pathProfile?.programWebsiteUrl),
      officialWebsiteSource: cleanOptional(pathProfile?.programWebsiteSource),
      dsireAggregatorSkipped: Boolean(pathProfile?.isAggregatorSource && pathProfile?.programWebsiteUrl),
      applicationPathFound: reliableApplicationPathFound,
      applicationSpecificSectionFound: anyApplicationSpecificSectionFound,
      extractionAllowed,
      reason: extractionAllowed
        ? "Requirements were extracted from the official page, selected application path, and top relevant artifacts."
        : "Only a general program/source page was available. No reliable application requirements were extracted."
    });

    if (!anyFetched) {
      profile.extractionStatus = "source_unavailable";
      profile.error = sourceRecords.find((record) => record.error)?.error || "Requirement sources could not be fetched or read.";
      profile.notes.push("Requirement sources could not be fetched or read.");
      return finalizeProfile(profile);
    }

    if (!extractionAllowed || (sourceOnlyPath && !anyApplicationSpecificSectionFound && !reliableApplicationPathFound)) {
      profile.extractionStatus = anyPdfNeedsText ? "needs_pdf_text_extraction" : "needs_review";
      profile.requiredFields = [];
      profile.requiredDocuments = [];
      profile.optionalFields = [];
      profile.applicationSteps = [];
      profile.deadline = undefined;
      profile.estimatedTime = undefined;
      profile.preApprovalRequired = "unknown";
      profile.contractorRequired = "unknown";
      profile.taxReviewRequired = "unknown";
      profile.notes.push("Only a general program/source page was available. No reliable application requirements were extracted.");
      if (anyPdfNeedsText) {
        profile.notes.push("A PDF artifact was found, but readable PDF text was not available for deterministic extraction.");
      }
      if (pathProfile?.isAggregatorSource) {
        profile.notes.push("Aggregator source pages such as DSIRE are not treated as application forms unless they contain explicit application instructions.");
      }
      return finalizeProfile(profile);
    }

    profile.extractionStatus = classifyExtractionStatus(profile);
    if (profile.extractionStatus === "needs_review" && anyPdfNeedsText && pdfsTextExtracted === 0 && pdfsFetched > 0) {
      profile.extractionStatus = "needs_pdf_text_extraction";
    }
    if (profile.extractionStatus === "requirements_extracted") {
      profile.notes.push("Deterministic extraction found required fields, documents, or application rules with source evidence.");
    } else if (profile.extractionStatus === "partial") {
      profile.notes.push("Deterministic extraction found some requirements or rules, but the source may need manual review.");
    } else if (profile.extractionStatus === "needs_pdf_text_extraction") {
      profile.notes.push("PDF artifacts were found, but readable PDF text was unavailable for at least one primary extraction source.");
    } else {
      profile.notes.push("Requirement sources were readable, but no exact required fields, documents, or rules were confidently identified.");
    }
    if (pdfsFetched > 0) {
      profile.notes.push(
        pdfsTextExtracted > 0
          ? "One or more PDF artifacts were fetched and readable PDF text was used for extraction."
          : "One or more PDF artifacts were fetched, but readable PDF text was unavailable."
      );
    }

    return finalizeProfile(profile);
  } catch (error) {
    profile.extractionStatus = "source_unavailable";
    profile.error = safeErrorMessage(error);
    setExtractionDiagnostics(profile, {
      sourceUsed: profile.sourceUrl,
      extractionAllowed: false,
      reason: "Requirement source could not be fetched or read."
    });
    profile.notes.push("Requirement source could not be fetched or read.");
    return finalizeProfile(profile);
  }
}
