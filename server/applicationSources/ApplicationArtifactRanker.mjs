import { sanitizeSnippet } from "./SourceTextHygiene.mjs";

const HIGH_CONFIDENCE_TERMS = [
  /\bapply\b/i,
  /\bapplication\b/i,
  /\brebate application\b/i,
  /\bonline application\b/i,
  /\bsubmit application\b/i,
  /\bapplication portal\b/i,
  /\bpre[- ]?approval\b/i,
  /\bpreapproval\b/i,
  /\bproject application guide\b/i,
  /\bprogram guidelines?\b/i,
  /\bapplication checklist\b/i,
  /\brequired documents?\b/i,
  /\bapplication instructions?\b/i,
  /\brebate forms?\b/i,
  /\bprogram forms?\b/i,
  /\bapplication materials?\b/i,
  /\binterconnection application\b/i,
  /\bsolar application\b/i,
  /\bgrant application\b/i,
  /\bnofo\b/i,
  /\bfoa\b/i,
  /\btechnical application\b/i,
  /\bdetailed cost proposal\b/i,
  /\bproject schedule\b/i,
  /\butility form\b/i,
  /\bsite host letter\b/i,
  /\binterest form\b/i,
  /\bequipment interest form\b/i,
  /\bchecklist\b/i,
  /\bworkbook\b/i
];

const STRONG_URL_TERMS = [
  /\/apply\b/i,
  /application/i,
  /pre[-_]?approval/i,
  /interconnection/i,
  /checklist/i,
  /guidelines?/i,
  /nofo|foa/i,
  /workbook/i,
  /jotform/i,
  /zoho/i,
  /\/forms?(?:\/|$)/i,
  /grants\.pa\.gov/i,
  /rebates\.nextzero\.org/i,
  /interest-form/i
];

const GENERIC_IGNORE_TERMS = [
  /\bpay my bill\b/i,
  /\bbilling portal\b/i,
  /\bpay bill\b/i,
  /\bgeneral contact form\b/i,
  /\bcontact us\b/i,
  /\bprivacy\b/i,
  /\baccessibility\b/i,
  /\bsocial media\b/i,
  /\bnewsletter\b/i,
  /\bsearch\b/i,
  /\bsite map\b/i,
  /^\s*forms?\s*&\s*reports?\s*$/i,
  /^\s*forms?\s*$/i,
  /^\s*reports?\s*$/i
];

const SOLAR_UNRELATED_TERMS = [
  /\bgasline\b/i,
  /\bgas line\b/i,
  /\befv\b/i,
  /\bexcess flow valve\b/i,
  /\btime of use\b/i,
  /\bservice cut[- ]?off\b/i,
  /\bcutoff demo\b/i,
  /\bdemo form\b/i,
  /\bnew residential gas/i
];

const VENDOR_SUPPORT_EMAIL_PATTERN = /\b(?:support|help)@(?:zohoforms|jotform)\.com\b/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeWhitespace(value) {
  return cleanText(value).replace(/\s+/g, " ");
}

function textForArtifact(artifact = {}) {
  return normalizeWhitespace([
    artifact.label,
    artifact.url,
    artifact.email,
    artifact.evidenceSnippet,
    artifact.sourceUrl,
    artifact.reason
  ].filter(Boolean).join(" "));
}

function opportunityText(opportunity = {}) {
  return normalizeWhitespace([
    opportunity.canonicalTitle,
    opportunity.normalizedTitle,
    opportunity.name,
    opportunity.title,
    opportunity.programName,
    opportunity.category,
    opportunity.technologyCategory,
    opportunity.retrofitName,
    opportunity.providerName,
    opportunity.administrator,
    opportunity.utility,
    opportunity.sourceName,
    opportunity.description,
    opportunity.summary,
    opportunity.raw?.category,
    opportunity.raw?.technologyCategory,
    opportunity.raw?.programName
  ].filter(Boolean).join(" "));
}

function topicRelevanceScore(text, opportunity = {}) {
  const oppText = opportunityText(opportunity);
  const combined = normalizeWhitespace(text);
  let score = 0;
  if (/\bsolar|pv|photovoltaic|interconnection|net metering\b/i.test(oppText) && /\bsolar|pv|photovoltaic|interconnection|net metering\b/i.test(combined)) score += 18;
  if (/\bheat pump|hvac|heating|cooling\b/i.test(oppText) && /\bheat pump|hvac|heating|cooling|assessment|pre[- ]?approval|loan\b/i.test(combined)) score += 16;
  if (/\bev|charging|charger|nevi\b/i.test(oppText) && /\bev|charging|charger|nevi|nofo|utility form|site host|gata\b/i.test(combined)) score += 20;
  if (/\bc-?pace|pace\b/i.test(oppText) && /\bc-?pace|pace|assessment agreement|project application guide|program guidelines|capital provider\b/i.test(combined)) score += 20;
  if (/\bschool|schools\b/i.test(oppText) && /\bschool|schools|s4s|grants\.pa\.gov|preparation checklist\b/i.test(combined)) score += 18;
  if (/\bequipment lease|equipment leases|vgs|vermont gas\b/i.test(oppText) && /\bequipment|interest form|lease|vgs|vgsvt\b/i.test(combined)) score += 18;
  if (/\bcommercial solar|canopy solar|maryland\b/i.test(oppText) && /\bcommercial solar|canopy solar|foa|jotform|workbook|tenant synopsis|budget\b/i.test(combined)) score += 18;
  return score;
}

function ignoreReason(artifact = {}, opportunity = {}) {
  const text = textForArtifact(artifact);
  if (!text) return "Artifact has no usable label, URL, or email.";
  if (VENDOR_SUPPORT_EMAIL_PATTERN.test(text)) return "Vendor support email is not an application contact.";
  if (GENERIC_IGNORE_TERMS.some((pattern) => pattern.test(text))) {
    return "Generic navigation, billing, contact, privacy, or site-wide forms link is not application-specific.";
  }
  const oppText = opportunityText(opportunity);
  if (/\bsolar|pv|photovoltaic|interconnection|net metering\b/i.test(oppText) && SOLAR_UNRELATED_TERMS.some((pattern) => pattern.test(text))) {
    return "Site-wide utility form is unrelated to this solar/interconnection opportunity.";
  }
  return "";
}

function confidenceForScore(score) {
  if (score >= 85) return "High";
  if (score >= 60) return "Medium";
  if (score >= 35) return "Low";
  return "Needs review";
}

export function scoreApplicationArtifactCandidate(artifact = {}, context = {}) {
  const opportunity = context.opportunity || {};
  const text = textForArtifact(artifact);
  const ignored = ignoreReason(artifact, opportunity);
  if (ignored) {
    return {
      score: 0,
      confidence: "Needs review",
      ignored: true,
      reason: ignored
    };
  }

  let score = 0;
  if (artifact.type === "program_website") score += 42;
  if (["application_portal", "online_form", "contractor_portal", "email_submission", "pre_approval_form", "post_install_form"].includes(artifact.type)) score += 52;
  if (["pdf", "guidelines", "checklist", "grant_package"].includes(artifact.type)) score += 48;
  if (artifact.type === "supporting_document") score += 25;
  if (artifact.email) score += 45;
  if (/\.pdf(?:$|[?#])/i.test(artifact.url || "")) score += 12;
  if (HIGH_CONFIDENCE_TERMS.some((pattern) => pattern.test(text))) score += 28;
  if (STRONG_URL_TERMS.some((pattern) => pattern.test(artifact.url || ""))) score += 15;
  score += topicRelevanceScore(text, opportunity);

  if (/\b(click here|learn more|more information)\b/i.test(artifact.label || "") && !/\b(application|apply|form|checklist|guidelines?|nofo|foa)\b/i.test(text)) {
    score -= 20;
  }
  if (/\bgeneric|site-wide|navigation\b/i.test(artifact.reason || "")) score -= 12;

  score = Math.max(0, Math.min(100, score));
  return {
    score,
    confidence: confidenceForScore(score),
    ignored: score < 35,
    reason: score >= 35
      ? "Artifact retained because its label, URL, context, or opportunity topic indicates application relevance."
      : "Artifact relevance was too low for the final application profile."
  };
}

export function rankApplicationArtifacts({ artifacts = [], opportunity = {}, maxArtifacts = 12 } = {}) {
  const seen = new Set();
  const kept = [];
  const filtered = [];
  const lowConfidence = [];

  for (const artifact of Array.isArray(artifacts) ? artifacts : []) {
    const key = [artifact?.type, artifact?.url || artifact?.email, artifact?.sourceUrl].join("|");
    if (!artifact?.type || (!artifact.url && !artifact.email) || seen.has(key)) continue;
    seen.add(key);

    const ranking = scoreApplicationArtifactCandidate(artifact, { opportunity });
    const normalized = {
      ...artifact,
      evidenceSnippet: artifact.evidenceSnippet ? sanitizeSnippet(artifact.evidenceSnippet, 260) : artifact.evidenceSnippet,
      relevanceScore: ranking.score,
      confidence: ranking.confidence === "Needs review" ? artifact.confidence || "Needs review" : ranking.confidence,
      relevanceReason: ranking.reason
    };

    if (ranking.ignored) {
      filtered.push({
        ...normalized,
        filterReason: ranking.reason
      });
      continue;
    }

    if (ranking.score < 55 && artifact.type !== "program_website") {
      lowConfidence.push(normalized);
      continue;
    }

    kept.push(normalized);
  }

  kept.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  return {
    artifacts: kept.slice(0, maxArtifacts),
    diagnostics: {
      keptArtifacts: kept.slice(0, maxArtifacts),
      filteredArtifacts: filtered,
      lowConfidenceArtifacts: lowConfidence,
      filteredCount: filtered.length + lowConfidence.length
    }
  };
}
