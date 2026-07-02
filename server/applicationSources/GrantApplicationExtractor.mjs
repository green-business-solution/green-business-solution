import { sanitizeSnippet } from "./SourceTextHygiene.mjs";

const GRANT_DOCUMENT_DEFINITIONS = [
  { id: "nofo", label: "NOFO", patterns: [/\bnofo\b/i, /\bnotice of funding opportunity\b/i] },
  { id: "foa", label: "FOA", patterns: [/\bfoa\b/i, /\bfunding opportunity announcement\b/i] },
  { id: "application_submission_checklist", label: "Application submission checklist", patterns: [/\bapplication submission checklist\b/i, /\bsubmission checklist\b/i, /\bpreparation checklist\b/i] },
  { id: "compliance_checklist", label: "Compliance checklist", patterns: [/\bcompliance checklist\b/i, /\bform 1\b.{0,80}\bcompliance checklist\b/i] },
  { id: "technical_application", label: "Technical application", patterns: [/\btechnical application\b/i, /\bform 2\b.{0,80}\btechnical application\b/i] },
  { id: "detailed_cost_proposal", label: "Detailed cost proposal", patterns: [/\bdetailed cost proposal\b/i, /\bform 3\b.{0,80}\bcost proposal\b/i] },
  { id: "detailed_project_schedule", label: "Detailed project schedule", patterns: [/\bdetailed project schedule\b/i, /\bform 4\b.{0,80}\bproject schedule\b/i] },
  { id: "utility_form", label: "Utility form", patterns: [/\butility form\b/i, /\bform 5\b.{0,80}\butility\b/i] },
  { id: "site_host_letter", label: "Site host letter", patterns: [/\bsite host letter\b/i, /\bform 6\b.{0,80}\bsite host\b/i] },
  { id: "nepa_environmental_documentation", label: "NEPA/environmental documentation", patterns: [/\bnepa\b/i, /\benvironmental documentation\b/i, /\bform 7\b.{0,80}\bnepa\b/i] },
  { id: "gata_materials", label: "GATA budget/agreement/conflict/risk materials", patterns: [/\bgata\b/i, /\bgrant accountability and transparency act\b/i, /\bbudget agreement\b/i, /\bconflict of interest\b/i, /\brisk assessment\b/i] },
  { id: "project_budget_workbook", label: "Project budget workbook", patterns: [/\bproject budget workbook\b/i, /\bbudget workbook\b/i] },
  { id: "tenant_synopsis_form", label: "Tenant synopsis form", patterns: [/\btenant synopsis form\b/i] },
  { id: "jotform_questions_pdf", label: "Jotform questions PDF", patterns: [/\bjotform questions pdf\b/i, /\bjotform questions\b/i] },
  { id: "application_form", label: "Application form", patterns: [/\bapplication form\b/i, /\bgrant application\b/i] },
  { id: "aoi_status_evidence", label: "AOI status evidence", patterns: [/\baoi\b/i, /\barea of interest\b/i] },
  { id: "eligible_facility_attestation", label: "Eligible facility attestation", patterns: [/\beligible facility attestation\b/i, /\bfacility attestation\b/i] },
  { id: "w9", label: "IRS Form W-9", patterns: [/\bw-?9\b/i, /\birs form w-?9\b/i] },
  { id: "good_standing_documentation", label: "Good standing documentation", patterns: [/\bgood standing\b/i] },
  { id: "facility_control_evidence", label: "Facility control evidence", patterns: [/\bfacility control\b/i, /\bsite control\b/i, /\bproperty control\b/i] },
  { id: "project_map_site_map", label: "Project map/site map", patterns: [/\bsite map\b/i, /\bproject map\b/i] },
  { id: "solar_contract_or_loi", label: "Solar contract or letter of intent", patterns: [/\bsolar contract\b/i, /\bletter of intent\b/i, /\bloi\b/i] },
  { id: "nabcep_professional_involvement", label: "NABCEP professional involvement", patterns: [/\bnabcep\b/i] },
  { id: "cost_match_evidence", label: "Cost match evidence", patterns: [/\bcost match\b/i, /\bmatching funds\b/i] },
  { id: "guidelines", label: "Program guidelines", patterns: [/\bguidelines\b/i, /\bprogram guidelines\b/i] },
  { id: "faq", label: "FAQ", patterns: [/\bfaq\b/i, /\bfrequently asked questions\b/i] }
];

const GRANT_FIELD_DEFINITIONS = [
  { id: "applicant_entity", label: "Applicant entity", patterns: [/\bapplicant entity\b/i, /\bapplicant legal name\b/i, /\bapplicant name\b/i] },
  { id: "eligible_school_entity_type", label: "Eligible school entity type", patterns: [/\beligible school entity type\b/i, /\bschool entity type\b/i] },
  { id: "project_site_facility", label: "Project site/facility", patterns: [/\bproject site\b/i, /\bproject facility\b/i, /\bfacility address\b/i, /\bproject location\b/i] },
  { id: "solar_project_type", label: "Solar project type", patterns: [/\bsolar project type\b/i, /\bproject type\b/i] },
  { id: "project_cost", label: "Project cost", patterns: [/\bproject cost\b/i, /\btotal project cost\b/i] },
  { id: "requested_grant_amount", label: "Requested grant amount", patterns: [/\brequested grant amount\b/i, /\bgrant amount requested\b/i] },
  { id: "mv_pi_ar", label: "MV/PI AR", patterns: [/\bmv\/pi ar\b/i, /\bmv pi ar\b/i] },
  { id: "region", label: "Region", patterns: [/\bregion\b/i] }
];

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeWhitespace(value) {
  return cleanText(value).replace(/\s+/g, " ");
}

function splitUnits(text) {
  return cleanText(text)
    .split(/\n+|(?<=[.!?])\s+/)
    .map(normalizeWhitespace)
    .filter(Boolean);
}

function findUnit(units, definition) {
  return units.find((unit) => definition.patterns.some((pattern) => pattern.test(unit))) || "";
}

function requirementFromDefinition(definition, unit, sourceUrl, requirementType = "document") {
  return {
    id: definition.id,
    label: definition.label,
    requirementType,
    required: true,
    sourceUrl,
    evidenceSnippet: sanitizeSnippet(unit || definition.label, 260),
    confidence: unit ? "High" : "Medium"
  };
}

function dedupe(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    if (!item?.id || seen.has(item.id)) continue;
    seen.add(item.id);
    result.push(item);
  }
  return result;
}

export function extractGrantRequirementsFromText(text, { sourceUrl, artifacts = [] } = {}) {
  const units = splitUnits(text);
  const artifactText = artifacts
    .map((artifact) => [artifact.label, artifact.url, artifact.evidenceSnippet].filter(Boolean).join(" "))
    .join("\n");
  const artifactUnits = splitUnits(artifactText);
  const allUnits = [...units, ...artifactUnits];

  const requiredDocuments = [];
  const requiredFields = [];

  for (const definition of GRANT_DOCUMENT_DEFINITIONS) {
    const unit = findUnit(allUnits, definition);
    if (unit) requiredDocuments.push(requirementFromDefinition(definition, unit, sourceUrl, "document"));
  }

  for (const definition of GRANT_FIELD_DEFINITIONS) {
    const unit = findUnit(allUnits, definition);
    if (unit) requiredFields.push(requirementFromDefinition(definition, unit, sourceUrl, "field"));
  }

  const evidence = [...requiredDocuments, ...requiredFields].slice(0, 10).map((item) => ({
    label: `${item.label} grant/package requirement found`,
    sourceUrl,
    textSnippet: item.evidenceSnippet
  }));

  return {
    requiredDocuments: dedupe(requiredDocuments),
    requiredFields: dedupe(requiredFields),
    evidence,
    grantExtractionStatus: requiredDocuments.length + requiredFields.length > 0 ? "grant_requirements_extracted" : "grant_requirements_not_found"
  };
}
