const APPLICATION_METHODS = new Set([
  "online_portal",
  "pdf",
  "email",
  "contractor_submitted",
  "utility_portal",
  "tax_accountant_filing",
  "unknown"
]);

const EXTRACTION_STATUSES = new Set(["requirements_extracted", "partial", "needs_review", "source_unavailable", "not_attempted"]);
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
  const text = normalizeWhitespace(stripHtml(value));
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
    evidence: [],
    notes: [],
    error: undefined
  };
}

function finalizeProfile(profile) {
  if (!APPLICATION_METHODS.has(profile.applicationMethod)) profile.applicationMethod = "unknown";
  if (!EXTRACTION_STATUSES.has(profile.extractionStatus)) profile.extractionStatus = "needs_review";
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

function hasRequiredContext(unit, fullText, fetched) {
  return REQUIRED_CONTEXT_PATTERN.test(unit) || (FORM_FIELD_PATTERN.test(fullText) && /[:?]\s*$/.test(unit)) || (fetched.isPdf && /[:?]\s*$/.test(unit));
}

function confidenceForUnit(unit, fullText, fetched) {
  if (REQUIRED_CONTEXT_PATTERN.test(unit)) return "High";
  if (FORM_FIELD_PATTERN.test(fullText) || fetched.isPdf || /[:?]\s*$/.test(unit)) return "Medium";
  return "Low";
}

function buildRequirement(definition, unit, sourceUrl, required, fullText, fetched) {
  return {
    id: definition.id,
    label: definition.label,
    requirementType: definition.requirementType,
    required,
    sourceUrl,
    evidenceSnippet: safeSnippet(unit),
    confidence: required ? confidenceForUnit(unit, fullText, fetched) : "Medium"
  };
}

function extractRequirementsFromDefinitions({ definitions, units, fullText, fetched, sourceUrl }) {
  const required = [];
  const optional = [];

  for (const definition of definitions) {
    const matchingUnits = units.filter((unit) => definitionMatchesUnit(definition, unit));
    const optionalUnit = matchingUnits.find((unit) => OPTIONAL_CONTEXT_PATTERN.test(unit));
    const requiredUnit =
      matchingUnits.find((unit) => hasRequiredContext(unit, fullText, fetched) && !OPTIONAL_CONTEXT_PATTERN.test(unit)) ||
      matchingUnits.find((unit) => /[:?]\s*$/.test(unit) && !OPTIONAL_CONTEXT_PATTERN.test(unit));

    if (requiredUnit) {
      required.push(buildRequirement(definition, requiredUnit, sourceUrl, true, fullText, fetched));
    } else if (optionalUnit) {
      optional.push(buildRequirement(definition, optionalUnit, sourceUrl, false, fullText, fetched));
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

function extractDeadline(units) {
  const deadlineUnit = findFirstSnippet(units, DEADLINE_PATTERN);
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

export async function extractOpportunityApplicationRequirements(input = {}, options = {}) {
  const profile = buildBaseProfile(input);
  const timeoutMs = Math.max(1_000, Number(options.timeoutMs || DEFAULT_TIMEOUT_MS));
  const maxResponseBytes = Math.max(50_000, Number(options.maxResponseBytes || DEFAULT_MAX_RESPONSE_BYTES));

  if (!profile.sourceUrl) {
    profile.extractionStatus = "source_unavailable";
    profile.notes.push("No application URL, PDF URL, program website URL, or program source URL was available for requirement extraction.");
    return finalizeProfile(profile);
  }

  try {
    const fetched = await fetchSourceText(profile.sourceUrl, {
      fetchFn: options.fetchFn,
      timeoutMs,
      maxResponseBytes
    });

    const text = normalizeWhitespace(htmlToReadableText(fetched.text));
    const units = splitEvidenceUnits(htmlToReadableText(fetched.text));
    if (!text) {
      profile.extractionStatus = "needs_review";
      profile.notes.push("Requirement source was readable but did not contain extractable text.");
      return finalizeProfile(profile);
    }

    const fieldResult = extractRequirementsFromDefinitions({
      definitions: FIELD_DEFINITIONS,
      units,
      fullText: text,
      fetched,
      sourceUrl: profile.sourceUrl
    });
    const documentResult = extractRequirementsFromDefinitions({
      definitions: DOCUMENT_DEFINITIONS,
      units,
      fullText: text,
      fetched,
      sourceUrl: profile.sourceUrl
    });

    profile.requiredFields.push(...fieldResult.required);
    profile.requiredDocuments.push(...documentResult.required);
    profile.optionalFields.push(...fieldResult.optional, ...documentResult.optional);
    profile.applicationSteps.push(...extractApplicationSteps(units));
    profile.deadline = cleanOptional(extractDeadline(units));
    profile.estimatedTime = cleanOptional(extractEstimatedTime(units));

    applyRules(profile, units, profile.sourceUrl, profile.applicationMethod);

    if (profile.deadline) {
      addEvidence(profile, "Deadline language found", profile.sourceUrl, profile.deadline);
    }

    for (const requirement of [...profile.requiredFields, ...profile.requiredDocuments].slice(0, 8)) {
      addEvidence(profile, `${requirement.label} requirement found`, requirement.sourceUrl, requirement.evidenceSnippet);
    }

    profile.extractionStatus = classifyExtractionStatus(profile);
    if (profile.extractionStatus === "requirements_extracted") {
      profile.notes.push("Deterministic extraction found required fields, documents, or application rules with source evidence.");
    } else if (profile.extractionStatus === "partial") {
      profile.notes.push("Deterministic extraction found some requirements or rules, but the source may need manual review.");
    } else {
      profile.notes.push("Requirement source was readable, but no exact required fields, documents, or rules were confidently identified.");
    }

    if (fetched.isPdf) {
      profile.notes.push("Source URL appears to be a PDF or PDF-like document; extracted only readable text available to the server.");
    }

    return finalizeProfile(profile);
  } catch (error) {
    profile.extractionStatus = "source_unavailable";
    profile.error = safeErrorMessage(error);
    profile.notes.push("Requirement source could not be fetched or read.");
    return finalizeProfile(profile);
  }
}
