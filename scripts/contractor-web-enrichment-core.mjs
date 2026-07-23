import crypto from "node:crypto";

const LEGAL_SUFFIXES = new Set([
  "CO",
  "COMPANY",
  "CORP",
  "CORPORATION",
  "INC",
  "INCORPORATED",
  "LLC",
  "LLP",
  "LP",
  "LTD",
  "LIMITED",
]);

const TRADE_TERMS_BY_CLASSIFICATION = new Map([
  ["A", ["construction", "contractor", "engineering"]],
  ["B", ["construction", "contractor", "builder", "building"]],
  ["B-2", ["remodel", "renovation", "contractor"]],
  ["C-2", ["insulation", "acoustic"]],
  ["C-4", ["boiler", "heating", "steam"]],
  ["C-10", ["electric", "electrical", "lighting", "solar", "ev charger"]],
  ["C-20", ["hvac", "heating", "air conditioning", "mechanical"]],
  ["C-36", ["plumbing", "plumber", "water heater"]],
  ["C-38", ["refrigeration", "refrigerated"]],
  ["C-43", ["sheet metal", "ductwork"]],
  ["C-46", ["solar", "photovoltaic"]],
  ["C-53", ["pool", "swimming pool"]],
]);

const SOCIAL_HOSTS = [
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "tiktok.com",
  "twitter.com",
  "x.com",
  "youtube.com",
  "yelp.com",
];

const PLACEHOLDER_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "email.com",
  "yourdomain.com",
]);

const FREE_EMAIL_DOMAINS = new Set([
  "aol.com",
  "gmail.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
  "msn.com",
  "outlook.com",
  "pacbell.net",
  "protonmail.com",
  "sbcglobal.net",
  "yahoo.com",
]);

const SERVICE_REGIONS = [
  "Bay Area",
  "Central Coast",
  "Central Valley",
  "Greater Los Angeles",
  "Inland Empire",
  "Northern California",
  "Orange County",
  "Sacramento Area",
  "San Diego County",
  "San Francisco Bay Area",
  "Southern California",
];

export function isUsableContractor(contractor) {
  return (
    contractor?.licenseStatus === "CLEAR" &&
    Array.isArray(contractor.supportedRetrofitIds) &&
    contractor.supportedRetrofitIds.length > 0
  );
}

export function fieldsNeedingEnrichment(contractor) {
  const fields = [];
  if (!clean(contractor.email)) fields.push("email");
  if (!clean(contractor.servesCommercial)) {
    fields.push("servesCommercial");
  }
  if (!clean(contractor.servesResidential)) {
    fields.push("servesResidential");
  }
  if (!Array.isArray(contractor.serviceAreas) || !contractor.serviceAreas.length) {
    fields.push("serviceAreas");
  }
  return fields;
}

export function buildIdentityRecord({
  aliases = [],
  contractor,
}) {
  const address = contractor.businessAddress || {};
  const names = sortedUnique([
    contractor.businessName,
    ...aliases,
  ]);
  return {
    contractorId: contractor.contractorId,
    licenseNumber: clean(contractor.licenseNumber),
    businessName: clean(contractor.businessName),
    businessNameAliases: names,
    normalizedNames: sortedUnique(names.map(normalizeName)),
    candidateNameRoots: sortedUnique(
      names.map(candidateNameRoot).filter(Boolean),
    ),
    phone: normalizePhone(contractor.phone),
    address: {
      line1: clean(address.line1),
      city: clean(address.city),
      county: clean(address.county),
      state: clean(address.state),
      postalCode: normalizeZip(address.postalCode),
    },
    licenseClassifications: sortedUnique(
      contractor.licenseClassifications,
    ),
    supportedRetrofitIds: sortedUnique(
      contractor.supportedRetrofitIds,
    ),
    existing: {
      email: contractor.email,
      servesCommercial: contractor.servesCommercial,
      servesResidential: contractor.servesResidential,
      serviceAreas: contractor.serviceAreas,
      programMemberships: contractor.programMemberships,
      certifications: contractor.certifications,
      enrichmentEvidence: contractor.enrichmentEvidence,
    },
    fieldsNeeded: fieldsNeedingEnrichment(contractor),
  };
}

export function selectStratifiedPilot({
  identities,
  knownDomainContractorIds = new Set(),
  pilotSize = 5_000,
  seed = "retrofi-statewide-web-enrichment-pilot-v1",
}) {
  if (identities.length < pilotSize) {
    throw new Error(
      `Cannot select ${pilotSize} pilot contractors from ${identities.length} eligible identities.`,
    );
  }
  const selected = [];
  const selectedIds = new Set();
  const known = identities
    .filter((identity) =>
      knownDomainContractorIds.has(identity.contractorId),
    )
    .sort((left, right) =>
      deterministicOrder(left.contractorId, right.contractorId, seed),
    );
  for (const identity of known) {
    if (selected.length >= pilotSize) break;
    selected.push(identity);
    selectedIds.add(identity.contractorId);
  }

  const strata = new Map();
  for (const identity of identities) {
    if (selectedIds.has(identity.contractorId)) continue;
    const classification =
      identity.licenseClassifications[0] || "UNCLASSIFIED";
    const county = identity.address.county || "NO_COUNTY";
    const phone = identity.phone ? "PHONE" : "NO_PHONE";
    const address = [
      identity.address.line1,
      identity.address.city,
      identity.address.postalCode,
    ].every(Boolean)
      ? "COMPLETE_ADDRESS"
      : "INCOMPLETE_ADDRESS";
    const tokenCount = normalizeName(identity.businessName)
      .split(" ")
      .filter(Boolean).length;
    const nameShape =
      tokenCount <= 2
        ? "SHORT_NAME"
        : tokenCount <= 5
          ? "MEDIUM_NAME"
          : "LONG_NAME";
    const key = [
      classification,
      county,
      phone,
      address,
      nameShape,
    ].join("|");
    const values = strata.get(key) || [];
    values.push(identity);
    strata.set(key, values);
  }
  for (const values of strata.values()) {
    values.sort((left, right) =>
      deterministicOrder(left.contractorId, right.contractorId, seed),
    );
  }

  const keys = [...strata.keys()].sort((left, right) =>
    deterministicOrder(left, right, seed),
  );
  let index = 0;
  while (selected.length < pilotSize && keys.length) {
    const key = keys[index % keys.length];
    const values = strata.get(key);
    const identity = values.shift();
    if (identity) {
      selected.push(identity);
      selectedIds.add(identity.contractorId);
    }
    if (!values.length) {
      strata.delete(key);
      keys.splice(index % keys.length, 1);
      if (!keys.length) break;
      index %= keys.length;
    } else {
      index += 1;
    }
  }

  return selected.sort((left, right) =>
    left.contractorId.localeCompare(right.contractorId),
  );
}

export function pilotStrataSummary(identities) {
  const classificationCounts = new Map();
  const countyCounts = new Map();
  const nameShapeCounts = new Map();
  let withPhone = 0;
  let completeAddress = 0;
  for (const identity of identities) {
    for (const classification of identity.licenseClassifications) {
      increment(classificationCounts, classification);
    }
    increment(countyCounts, identity.address.county || "NO_COUNTY");
    if (identity.phone) withPhone += 1;
    if (
      identity.address.line1 &&
      identity.address.city &&
      identity.address.postalCode
    ) {
      completeAddress += 1;
    }
    const tokenCount = normalizeName(identity.businessName)
      .split(" ")
      .filter(Boolean).length;
    increment(
      nameShapeCounts,
      tokenCount <= 2
        ? "SHORT_NAME"
        : tokenCount <= 5
          ? "MEDIUM_NAME"
          : "LONG_NAME",
    );
  }
  return {
    classificationCounts: counterObject(classificationCounts),
    countyCounts: counterObject(countyCounts),
    nameShapeCounts: counterObject(nameShapeCounts),
    withPhone,
    withoutPhone: identities.length - withPhone,
    completeAddress,
    incompleteAddress: identities.length - completeAddress,
  };
}

export function generateCandidateDomains(
  identity,
  { limit = 12, mode = "fast" } = {},
) {
  const directRoots = [...identity.candidateNameRoots];
  const tradeRoots = [];
  const cityRoots = [];
  const city = candidateNameRoot(identity.address.city);
  const tradeTerms = tradeTermsFor(identity).map((value) =>
    value.replace(/\s+/g, ""),
  );
  for (const nameRoot of identity.candidateNameRoots) {
    if (city && nameRoot.length + city.length <= 35) {
      cityRoots.push(`${nameRoot}${city}`);
      cityRoots.push(`${city}${nameRoot}`);
    }
    const leading = leadingDistinctiveToken(nameRoot);
    for (const trade of tradeTerms.slice(0, mode === "deep" ? 6 : 2)) {
      if (
        leading &&
        !nameRoot.includes(trade) &&
        leading.length + trade.length <= 35
      ) {
        tradeRoots.push(`${leading}${trade}`);
      }
    }
  }
  const endings = [".com", ".net", ".org", ".co"];
  const candidates = [];
  const orderedRoots = [
    ...new Set([
      ...directRoots,
      ...tradeRoots,
      ...cityRoots,
    ]),
  ].filter((root) => root.length >= 5 && root.length <= 50);
  for (const root of orderedRoots) {
    for (const ending of endings) {
      candidates.push(`${root}${ending}`);
      if (candidates.length >= limit) return candidates;
    }
  }
  return candidates;
}

export function domainFromUrl(value) {
  const input = clean(value);
  if (!input) return "";
  try {
    const url = new URL(
      /^[a-z][a-z0-9+.-]*:\/\//i.test(input)
        ? input
        : `https://${input}`,
    );
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    if (
      !hostname.includes(".") ||
      SOCIAL_HOSTS.some(
        (social) =>
          hostname === social || hostname.endsWith(`.${social}`),
      )
    ) {
      return "";
    }
    return hostname;
  } catch {
    return "";
  }
}

export function domainFromEmail(value) {
  const email = normalizeEmail(value);
  return email ? email.split("@")[1] : "";
}

export function matchOsmRecord({
  contractorIndices,
  osmRecord,
}) {
  const candidates = [
    [
      "exact_phone",
      normalizePhone(osmRecord.phone),
      contractorIndices.phone,
    ],
    [
      "exact_name_zip",
      normalizeName(osmRecord.name) && normalizeZip(osmRecord.postalCode)
        ? `${normalizeName(osmRecord.name)}|${normalizeZip(
            osmRecord.postalCode,
          )}`
        : "",
      contractorIndices.nameZip,
    ],
    [
      "exact_name_address",
      normalizeName(osmRecord.name) &&
      normalizeStreet(osmRecord.streetAddress)
        ? `${normalizeName(osmRecord.name)}|${normalizeStreet(
            osmRecord.streetAddress,
          )}`
        : "",
      contractorIndices.nameAddress,
    ],
    [
      "unique_name_city",
      normalizeName(osmRecord.name) && normalizeName(osmRecord.city)
        ? `${normalizeName(osmRecord.name)}|${normalizeName(
            osmRecord.city,
          )}`
        : "",
      contractorIndices.nameCity,
    ],
  ];
  for (const [method, key, index] of candidates) {
    if (!key) continue;
    const matches = index.get(key) || [];
    if (matches.length === 1) {
      return { method, identity: matches[0], status: "matched" };
    }
    if (matches.length > 1) {
      return { method, status: "ambiguous" };
    }
  }
  return { status: "unmatched" };
}

export function buildContractorIdentityIndices(identities) {
  const indices = {
    phone: new Map(),
    nameZip: new Map(),
    nameAddress: new Map(),
    nameCity: new Map(),
  };
  for (const identity of identities) {
    addIndex(indices.phone, identity.phone, identity);
    for (const name of identity.normalizedNames) {
      addIndex(
        indices.nameZip,
        name && identity.address.postalCode
          ? `${name}|${identity.address.postalCode}`
          : "",
        identity,
      );
      addIndex(
        indices.nameAddress,
        name && identity.address.line1
          ? `${name}|${normalizeStreet(identity.address.line1)}`
          : "",
        identity,
      );
      addIndex(
        indices.nameCity,
        name && identity.address.city
          ? `${name}|${normalizeName(identity.address.city)}`
          : "",
        identity,
      );
    }
  }
  return indices;
}

export function scoreDomainIdentity({
  homepageText,
  identity,
  seed,
}) {
  const text = clean(homepageText);
  const normalizedText = normalizeName(text);
  const extractedLicenses = extractLicenseNumbers(text);
  const pagePhones = extractPhoneNumbers(text);
  const exactLicense = extractedLicenses.includes(
    normalizeLicense(identity.licenseNumber),
  );
  const exactPhone =
    Boolean(identity.phone) && pagePhones.includes(identity.phone);
  const conflictingLicense =
    extractedLicenses.length > 0 &&
    !exactLicense &&
    extractedLicenses.some(
      (license) => license !== normalizeLicense(identity.licenseNumber),
    );
  const nameScores = identity.normalizedNames.map((name) =>
    nameMatchScore(name, normalizedText),
  );
  const nameScore = Math.max(0, ...nameScores);
  const nameStrong = nameScore >= 0.9;
  const cityMatch =
    Boolean(identity.address.city) &&
    containsNormalized(normalizedText, identity.address.city);
  const zipMatch =
    Boolean(identity.address.postalCode) &&
    text.includes(identity.address.postalCode);
  const streetMatch =
    Boolean(identity.address.line1) &&
    streetEvidenceMatches(text, identity.address.line1);
  const tradeMatch = tradeTermsFor(identity).some((term) =>
    new RegExp(`\\b${escapeRegex(term)}\\b`, "i").test(text),
  );
  const officialSeed =
    seed?.sourceType === "official_directory" &&
    seed?.matchMethod &&
    seed?.matchMethod !== "ambiguous";
  const osmStrongSeed =
    seed?.sourceType === "openstreetmap" &&
    seed?.matchMethod === "exact_phone";
  const parkedOrUnrelated =
    /\bdomain (?:is )?for sale\b|\bbuy this domain\b|\bparked (?:free|domain)\b|\bcoming soon\b/i.test(
      text.slice(0, 5_000),
    );
  const locationMatch = cityMatch || zipMatch || streetMatch;
  const sourceBackedSeed = officialSeed || osmStrongSeed;
  const strongCombination =
    nameStrong &&
    tradeMatch &&
    (streetMatch || zipMatch || sourceBackedSeed);
  const accepted =
    !conflictingLicense &&
    !parkedOrUnrelated &&
    (exactLicense || exactPhone || strongCombination);
  const ambiguous =
    !accepted &&
    !conflictingLicense &&
    !parkedOrUnrelated &&
    (nameStrong || exactPhone || locationMatch);
  return {
    accepted,
    ambiguous,
    disposition: accepted
      ? "VERIFIED_DOMAIN"
      : ambiguous
        ? "AMBIGUOUS_DOMAIN"
        : "REJECTED_DOMAIN",
    signals: {
      cityMatch,
      conflictingLicense,
      exactLicense,
      exactPhone,
      locationMatch,
      nameScore: round(nameScore, 4),
      nameStrong,
      officialSeed,
      osmStrongSeed,
      parkedOrUnrelated,
      sourceBackedSeed,
      streetMatch,
      tradeMatch,
      zipMatch,
    },
  };
}

export function extractWebsiteFields({
  domain,
  identity,
  pages,
  placeReference,
}) {
  const needed = new Set(identity.fieldsNeeded);
  const proposal = {};
  const evidence = [];
  if (needed.has("email")) {
    const emailCandidate = selectEmailCandidate({ domain, pages });
    if (emailCandidate) {
      proposal.email = emailCandidate.email;
      evidence.push(
        evidenceFor({
          field: "email",
          page: emailCandidate.page,
          snippet: emailCandidate.snippet,
          sourceValue: emailCandidate.email,
        }),
      );
    }
  }
  const combined = pages
    .map((page) => page.text)
    .filter(Boolean)
    .join("\n");
  const sentences = sentenceSegments(combined);
  if (needed.has("servesCommercial")) {
    const commercial = customerTypeEvidence(sentences, "commercial");
    if (commercial) {
      proposal.servesCommercial = commercial.value;
      evidence.push(
        evidenceFor({
          field: "servesCommercial",
          page: pageForSnippet(pages, commercial.snippet),
          snippet: commercial.snippet,
          sourceValue: commercial.value,
        }),
      );
    }
  }
  if (needed.has("servesResidential")) {
    const residential = customerTypeEvidence(sentences, "residential");
    if (residential) {
      proposal.servesResidential = residential.value;
      evidence.push(
        evidenceFor({
          field: "servesResidential",
          page: pageForSnippet(pages, residential.snippet),
          snippet: residential.snippet,
          sourceValue: residential.value,
        }),
      );
    }
  }
  if (needed.has("serviceAreas")) {
    const areas = extractServiceAreas(sentences, placeReference);
    if (areas.values.length) {
      proposal.serviceAreas = areas.values;
      for (const areaEvidence of areas.evidence) {
        evidence.push(
          evidenceFor({
            field: "serviceAreas",
            page: pageForSnippet(pages, areaEvidence.snippet),
            snippet: areaEvidence.snippet,
            sourceValue: areaEvidence.values.join(" | "),
          }),
        );
      }
    }
  }
  return {
    evidence,
    proposal,
  };
}

export function chooseInternalCrawlLinks({
  homepageUrl,
  links,
  limit = 3,
}) {
  const base = new URL(homepageUrl);
  const scored = [];
  for (const link of links) {
    try {
      const url = new URL(link.href, base);
      if (
        url.hostname !== base.hostname ||
        !["http:", "https:"].includes(url.protocol)
      ) {
        continue;
      }
      url.hash = "";
      const text = `${clean(link.text)} ${url.pathname}`.toLowerCase();
      let score = 0;
      if (/\bcontact\b/.test(text)) score += 100;
      if (/\bservices?\b/.test(text)) score += 80;
      if (/\bservice[- ]?areas?\b|\blocations?\b/.test(text)) score += 70;
      if (/\babout\b/.test(text)) score += 50;
      if (!score) continue;
      scored.push({ score, url: url.toString() });
    } catch {
      continue;
    }
  }
  return [
    ...new Map(
      scored
        .sort(
          (left, right) =>
            right.score - left.score ||
            left.url.localeCompare(right.url),
        )
        .map((value) => [value.url, value.url]),
    ).values(),
  ].slice(0, limit);
}

export function buildPilotAudit({
  acceptedResults,
  minimumSampleSize = 400,
  seed = "retrofi-statewide-web-enrichment-audit-v1",
}) {
  const ordered = [...acceptedResults].sort((left, right) =>
    deterministicOrder(left.contractorId, right.contractorId, seed),
  );
  const sampleSize = Math.min(
    ordered.length,
    Math.max(minimumSampleSize, Math.ceil(ordered.length * 0.1)),
  );
  const audited = ordered.slice(0, sampleSize).map((result) => {
    const signals = result.identityVerification.signals;
    const independentlyVerified =
      signals.exactLicense ||
      signals.exactPhone ||
      (signals.nameStrong &&
        signals.tradeMatch &&
        (signals.sourceBackedSeed ||
          signals.officialSeed ||
          signals.osmStrongSeed)) ||
      (signals.nameStrong &&
        signals.tradeMatch &&
        signals.streetMatch &&
        signals.zipMatch);
    const verdict = independentlyVerified
      ? "CORRECT"
      : "INCONCLUSIVE";
    return {
      contractorIdToken: token(result.contractorId),
      domain: result.domain,
      discoveryMethod: result.discoveryMethod,
      verdict,
      identitySignals: signals,
      fieldEvidenceChecks: fieldEvidenceChecks(result),
      proposedFields: Object.keys(result.proposal || {}).sort(),
    };
  });
  const correct = audited.filter(
    (entry) => entry.verdict === "CORRECT",
  ).length;
  const denominator = audited.length;
  const domainPrecision = denominator
    ? correct / denominator
    : null;
  const sampleRequirementMet =
    acceptedResults.length >= minimumSampleSize &&
    sampleSize >= minimumSampleSize;
  const fieldPrecision = {};
  for (const field of [
    "email",
    "servesCommercial",
    "servesResidential",
    "serviceAreas",
  ]) {
    const values = audited.filter((entry) =>
      entry.proposedFields.includes(field),
    );
    const evidenceSupported = values.filter(
      (entry) => entry.fieldEvidenceChecks[field] === true,
    ).length;
    const correct = values.filter(
      (entry) =>
        entry.verdict === "CORRECT" &&
        entry.fieldEvidenceChecks[field] === true,
    ).length;
    fieldPrecision[field] = {
      audited: values.length,
      correct,
      evidenceSupported,
      evidenceSupportPrecision: values.length
        ? evidenceSupported / values.length
        : null,
      precision: values.length
        ? correct / values.length
        : null,
      precisionInterpretation:
        "Lower bound requiring both a CORRECT domain verdict and complete bounded field evidence.",
    };
  }
  return {
    schemaVersion: "contractor-web-enrichment-audit.v1",
    auditMethod:
      "deterministic stronger-evidence lower-bound review queue",
    minimumRequiredSampleSize: minimumSampleSize,
    acceptedDomainCount: acceptedResults.length,
    sampleSize,
    sampleRequirementMet,
    verdictCounts: countValues(audited.map((entry) => entry.verdict)),
    verifiedDomainPrecision: domainPrecision,
    verifiedDomainPrecisionInterpretation:
      "Lower bound that counts INCONCLUSIVE entries as not correct. Human review remains required.",
    fieldPrecision,
    gate: {
      precisionThreshold: 0.98,
      precisionPassed:
        sampleRequirementMet &&
        domainPrecision !== null &&
        domainPrecision >= 0.98,
      requiresHumanReview: true,
      statewideWriteAuthorized: false,
      status: "AWAITING_REVIEW",
    },
    entries: audited,
  };
}

export function summarizeOutcomes(results) {
  return countValues(
    results.flatMap((result) => result.outcomes || []),
  );
}

export function normalizeName(value) {
  return clean(value)
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizePhone(value) {
  const digits = clean(value).replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits.length === 10
      ? digits
      : "";
}

export function normalizeEmail(value) {
  const email = clean(value)
    .replace(/^mailto:/i, "")
    .split("?")[0]
    .toLowerCase();
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(
    email,
  )
    ? email
    : "";
}

export function token(value) {
  return crypto
    .createHash("sha256")
    .update(String(value || ""))
    .digest("hex")
    .slice(0, 12);
}

export function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map(
        (key) =>
          `${JSON.stringify(key)}:${stableStringify(value[key])}`,
      )
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function customerTypeEvidence(sentences, type) {
  if (type === "commercial") {
    const noPattern =
      /\b(?:residential|homeowners?|homes?)\s+only\b|\bexclusively residential\b/i;
    const no = sentences.find((sentence) => noPattern.test(sentence));
    if (no) {
      return {
        value: "NO",
        snippet: matchingSnippet(no, noPattern),
      };
    }
    const yesPattern =
      /\bcommercial\b|\bindustrial\b|\bmultifamily\b|\bagricultur(?:e|al)\b|\binstitutional\b|\bgovernment\b|\bpublic[- ]sector\b|\bmunicipal\b/i;
    const yes = sentences.find(
      (sentence) =>
        yesPattern.test(sentence) && hasServiceContext(sentence),
    );
    if (yes) {
      return {
        value: "YES",
        snippet: matchingSnippet(yes, yesPattern),
      };
    }
    return null;
  }
  const noPattern =
    /\bcommercial\s+only\b|\bexclusively (?:commercial|industrial)\b/i;
  const no = sentences.find((sentence) => noPattern.test(sentence));
  if (no) {
    return {
      value: "NO",
      snippet: matchingSnippet(no, noPattern),
    };
  }
  const yesPattern =
    /\bresidential\b|\bhomeowners?\b|\bsingle[- ]family\b|\bhome services?\b/i;
  const yes = sentences.find(
    (sentence) =>
      yesPattern.test(sentence) && hasServiceContext(sentence),
  );
  return yes
    ? {
        value: "YES",
        snippet: matchingSnippet(yes, yesPattern),
      }
    : null;
}

function extractServiceAreas(sentences, placeReference) {
  const referenceNames = sortedUnique([
    ...(placeReference?.cities || []),
    ...(placeReference?.counties || []),
    ...SERVICE_REGIONS,
  ]).sort((left, right) => right.length - left.length);
  const values = new Set();
  const evidence = [];
  for (const sentence of sentences) {
    if (
      !/\b(?:areas? (?:served|we serve|includes?)|service areas?|serving|we serve|proudly serve|coverage area|serves customers? (?:in|throughout))\b/i.test(
        sentence,
      )
    ) {
      continue;
    }
    const sentenceValues = [];
    for (const name of referenceNames) {
      if (
        sentenceValues.some((selected) =>
          selected.toLowerCase().includes(name.toLowerCase()),
        )
      ) {
        continue;
      }
      if (
        new RegExp(`\\b${escapeRegex(name)}\\b`, "i").test(sentence)
      ) {
        sentenceValues.push(name);
      }
    }
    if (!sentenceValues.length) continue;
    for (const value of sentenceValues) values.add(value);
    for (const name of sentenceValues) {
      const candidateEvidence = {
        snippet: matchingSnippet(
          sentence,
          new RegExp(`\\b${escapeRegex(name)}\\b`, "i"),
        ),
        values: [name],
      };
      if (
        !evidence.some(
          (item) =>
            item.snippet === candidateEvidence.snippet &&
            item.values[0] === name,
        )
      ) {
        evidence.push(candidateEvidence);
      }
    }
  }
  return {
    evidence,
    values: [...values].sort(),
  };
}

function selectEmailCandidate({ domain, pages }) {
  const candidates = [];
  for (const page of pages) {
    for (const email of page.emails || []) {
      const normalized = normalizeEmail(email.value || email);
      if (!isAcceptableEmail(normalized, domain)) continue;
      const emailDomain = normalized.split("@")[1];
      const sameDomain = registrableDomain(emailDomain) ===
        registrableDomain(domain);
      const context = clean(email.snippet || "");
      if (
        !sameDomain &&
        /\b(?:web(?:site)?\s+(?:design|development|by)|marketing agency|site by|powered by|privacy policy)\b/i.test(
          context,
        )
      ) {
        continue;
      }
      const generic =
        /^(?:contact|hello|info|office|sales|service|support)@/i.test(
          normalized,
        );
      candidates.push({
        email: normalized,
        page,
        sameDomain,
        generic,
        snippet: matchingSnippet(
          email.snippet || page.text.match(
            new RegExp(
              `.{0,100}${escapeRegex(normalized)}.{0,100}`,
              "i",
            ),
          )?.[0] ||
            normalized,
          new RegExp(escapeRegex(normalized), "i"),
        ),
      });
    }
  }
  return candidates.sort(
    (left, right) =>
      Number(right.sameDomain) - Number(left.sameDomain) ||
      Number(right.generic) - Number(left.generic) ||
      left.email.localeCompare(right.email),
  )[0];
}

export function fieldEvidenceChecks(result) {
  const proposal = result.proposal || {};
  const evidence = proposal.enrichmentEvidence || [];
  const websiteEvidence = evidence.filter(
    (entry) =>
      (entry.matchMethod || entry.matchingMethod) ===
        "verified_first_party_domain" &&
      domainFromUrl(entry.sourceUrl) === result.domain,
  );
  const checks = {};
  for (const field of [
    "email",
    "servesCommercial",
    "servesResidential",
    "serviceAreas",
  ]) {
    if (!Object.hasOwn(proposal, field)) continue;
    const fieldEvidence = websiteEvidence.filter(
      (entry) => entry.field === field,
    );
    if (field === "email") {
      checks[field] = fieldEvidence.some(
        (entry) =>
          normalizeEmail(entry.sourceValue) ===
            normalizeEmail(proposal.email) &&
          clean(entry.supportingTextSnippet)
            .toLowerCase()
            .includes(normalizeEmail(proposal.email)),
      );
    } else if (field === "serviceAreas") {
      checks[field] = proposal.serviceAreas.every((area) =>
        fieldEvidence.some((entry) =>
          clean(entry.sourceValue)
            .toLowerCase()
            .split("|")
            .map(clean)
            .includes(clean(area).toLowerCase()),
        ),
      );
    } else {
      checks[field] = fieldEvidence.some(
        (entry) =>
          entry.sourceValue === proposal[field] &&
          customerEvidenceSupports({
            field,
            snippet: entry.supportingTextSnippet,
            value: proposal[field],
          }),
      );
    }
  }
  return checks;
}

function hasServiceContext(value) {
  return /\b(?:services?|serving|serve|solutions?|projects?|properties|customers?|clients?|buildings?|facilities|contractors?|install(?:ation|s|ing)?|repair(?:s|ing)?|maintenance|plumb(?:er|ing)?|hvac|heating|cooling|electrical|electrician|construction|remodel(?:ing)?|retrofits?|inspections?|refrigeration|solar|work(?:ing)? (?:with|on|for)|specializ(?:e|es|ing))\b/i.test(
    value,
  );
}

function customerEvidenceSupports({ field, snippet, value }) {
  if (field === "servesCommercial") {
    return value === "NO"
      ? /\b(?:residential|homeowners?|homes?)\s+only\b|\bexclusively residential\b/i.test(
          snippet,
        )
      : hasServiceContext(snippet) &&
          /\bcommercial\b|\bindustrial\b|\bmultifamily\b|\bagricultur(?:e|al)\b|\binstitutional\b|\bgovernment\b|\bpublic[- ]sector\b|\bmunicipal\b/i.test(
            snippet,
          );
  }
  return value === "NO"
    ? /\bcommercial\s+only\b|\bexclusively (?:commercial|industrial)\b/i.test(
        snippet,
      )
    : hasServiceContext(snippet) &&
        /\bresidential\b|\bhomeowners?\b|\bsingle[- ]family\b|\bhome services?\b/i.test(
          snippet,
        );
}

export function isAcceptableEmail(email, domain) {
  if (!email) return false;
  const [local, emailDomain] = email.split("@");
  if (
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    /^(?:\d[.-]?){7,}/.test(local) ||
    emailDomain.includes("..") ||
    PLACEHOLDER_EMAIL_DOMAINS.has(emailDomain) ||
    /\.(?:png|jpe?g|gif|svg|webp)$/i.test(email) ||
    /^(?:abuse|developer|noreply|no-reply|privacy|webmaster)$/i.test(
      local,
    )
  ) {
    return false;
  }
  if (FREE_EMAIL_DOMAINS.has(emailDomain)) return true;
  return (
    registrableDomain(emailDomain) === registrableDomain(domain)
  );
}

function evidenceFor({
  field,
  page,
  snippet,
  sourceValue,
}) {
  return {
    field,
    matchMethod: "verified_first_party_domain",
    retrievedAt: page?.retrievedAt || "",
    sourceId: "first_party_contractor_website",
    sourceName: "First-party contractor website",
    sourceUrl: page?.url || "",
    sourceValue: clean(sourceValue),
    supportingTextSnippet: boundedSnippet(snippet),
    verificationDate: (page?.retrievedAt || "").slice(0, 10),
  };
}

function pageForSnippet(pages, snippet) {
  return (
    pages.find((page) =>
      page.text
        .toLowerCase()
        .includes(clean(snippet).toLowerCase().slice(0, 80)),
    ) || pages[0]
  );
}

function sentenceSegments(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .split(/(?<=[.!?])\s+|\n+/)
    .map(clean)
    .filter((sentence) => sentence.length >= 8)
    .slice(0, 5_000);
}

function extractLicenseNumbers(value) {
  return sortedUnique(
    [...String(value || "").matchAll(
      /\b(?:cslb|contractor(?:'s)?\s+license|license)\s*(?:no\.?|number|#)?\s*[:#-]?\s*(\d{5,8})\b/gi,
    )].map((match) => normalizeLicense(match[1])),
  );
}

function extractPhoneNumbers(value) {
  return sortedUnique(
    [...String(value || "").matchAll(
      /(?:\+?1[\s().-]*)?(?:\(\d{3}\)|\d{3})[\s.-]*\d{3}[\s.-]*\d{4}/g,
    )].map((match) => normalizePhone(match[0])),
  );
}

function nameMatchScore(name, normalizedPageText) {
  if (!name || !normalizedPageText) return 0;
  if (containsNormalized(normalizedPageText, name)) return 1;
  const nameTokens = stripLegalTokens(name.split(" "));
  if (!nameTokens.length) return 0;
  const pageTokens = new Set(normalizedPageText.split(" "));
  const matched = nameTokens.filter((tokenValue) =>
    pageTokens.has(tokenValue),
  ).length;
  return matched / nameTokens.length;
}

function containsNormalized(normalizedText, value) {
  const normalized = normalizeName(value);
  return normalized.length >= 3 && normalizedText.includes(normalized);
}

function streetEvidenceMatches(pageText, address) {
  const street = normalizeStreet(address);
  if (!street) return false;
  const number = street.match(/^\d+/)?.[0];
  const words = street
    .replace(/^\d+\s*/, "")
    .split(" ")
    .filter((word) => word.length >= 3);
  const normalizedPage = normalizeName(pageText);
  return (
    Boolean(number) &&
    normalizedPage.includes(number) &&
    words.slice(0, 2).every((word) => normalizedPage.includes(word))
  );
}

function tradeTermsFor(identity) {
  return sortedUnique(
    identity.licenseClassifications.flatMap(
      (classification) =>
        TRADE_TERMS_BY_CLASSIFICATION.get(classification) || [
          "contractor",
          "construction",
        ],
    ),
  );
}

function candidateNameRoot(value) {
  const tokens = stripLegalTokens(normalizeName(value).split(" "));
  return tokens.join("").toLowerCase();
}

function stripLegalTokens(tokens) {
  const values = [...tokens].filter(Boolean);
  while (
    values.length > 1 &&
    LEGAL_SUFFIXES.has(values[values.length - 1])
  ) {
    values.pop();
  }
  return values;
}

function leadingDistinctiveToken(value) {
  const matches = String(value).match(/[a-z]+|\d+/g) || [];
  return matches.find((part) => part.length >= 4) || "";
}

function normalizeStreet(value) {
  return normalizeName(value)
    .replace(/\bSTREET\b/g, "ST")
    .replace(/\bAVENUE\b/g, "AVE")
    .replace(/\bBOULEVARD\b/g, "BLVD")
    .replace(/\bROAD\b/g, "RD")
    .replace(/\bDRIVE\b/g, "DR")
    .replace(/\bLANE\b/g, "LN")
    .replace(/\bSUITE\b.*$/, "")
    .trim();
}

function normalizeZip(value) {
  return clean(value).match(/\d{5}/)?.[0] || "";
}

function normalizeLicense(value) {
  return clean(value).replace(/\D/g, "").replace(/^0+/, "");
}

function registrableDomain(hostname) {
  const parts = String(hostname || "")
    .toLowerCase()
    .replace(/^www\./, "")
    .split(".")
    .filter(Boolean);
  return parts.slice(-2).join(".");
}

function deterministicOrder(left, right, seed) {
  return hashOrder(`${seed}|${left}`).localeCompare(
    hashOrder(`${seed}|${right}`),
  );
}

function hashOrder(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function addIndex(index, key, value) {
  if (!key) return;
  const values = index.get(key) || [];
  values.push(value);
  index.set(key, values);
}

function increment(counter, key) {
  counter.set(key, (counter.get(key) || 0) + 1);
}

function counterObject(counter) {
  return Object.fromEntries(
    [...counter].sort(
      (left, right) =>
        right[1] - left[1] || left[0].localeCompare(right[0]),
    ),
  );
}

function countValues(values) {
  const counter = new Map();
  for (const value of values) increment(counter, value);
  return counterObject(counter);
}

function sortedUnique(values = []) {
  return [...new Set(values.map(clean).filter(Boolean))].sort();
}

function boundedSnippet(value) {
  const text = clean(value);
  return text.length <= 280 ? text : `${text.slice(0, 277)}...`;
}

function matchingSnippet(value, pattern) {
  const text = clean(value);
  const match = text.match(pattern);
  if (!match || match.index === undefined) {
    return boundedSnippet(text);
  }
  const center = match.index + Math.floor(match[0].length / 2);
  const start = Math.max(0, center - 135);
  const end = Math.min(text.length, center + 135);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < text.length ? "..." : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`.slice(
    0,
    280,
  );
}

function clean(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function round(value, digits) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
