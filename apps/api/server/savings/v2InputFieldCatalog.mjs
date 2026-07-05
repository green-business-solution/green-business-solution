const IMPLEMENTED_SURFACES = new Set([
  "intake_profile_form",
  "retrofit_scope_form",
  "utility_bill_upload"
]);

const SOURCE_SURFACE_HINTS = [
  {
    pattern: /\b(tax|assessor|parcel|filing|liability|abatement|exemption|property_tax|income_tax)\b/i,
    surface: "tax_document_upload",
    sourceType: "tax_document"
  },
  {
    pattern: /\b(application|award|approval|preapproval|reservation|enrollment|funding|match|solicitation|agreement|authorization|deadline)\b/i,
    surface: "program_application_form",
    sourceType: "application_or_award_document"
  },
  {
    pattern: /\b(quote|invoice|receipt|contractor|purchase|eligible_cost|project_cost|equipment_cost|installation_cost|price|budget)\b/i,
    surface: "project_quote_upload",
    sourceType: "quote_or_invoice"
  },
  {
    pattern: /\b(bill|meter|kwh|kw|therm|demand|tariff|rate|load|usage)\b/i,
    surface: "utility_bill_upload",
    sourceType: "utility_bill"
  },
  {
    pattern: /\b(count|quantity|unit|ports?|chargers?|stations?|fixtures?|lamps?|bulbs?|tons|horsepower|capacity|model|tier|seer|seer2|afue|uef|efficiency|scope|measure|equipment|selected)\b/i,
    surface: "retrofit_scope_form",
    sourceType: "retrofit_scope"
  },
  {
    pattern: /\b(address|city|county|state|zip|utility|account|customer_class|applicant|business|sector|square_feet|employees|revenue)\b/i,
    surface: "intake_profile_form",
    sourceType: "user_profile"
  }
];

const SOURCE_PRECEDENCE_SURFACES = [
  { value: "utility_data", surface: "utility_bill_upload", sourceType: "utility_bill" },
  { value: "utility_bill", surface: "utility_bill_upload", sourceType: "utility_bill" },
  { value: "bill_upload", surface: "utility_bill_upload", sourceType: "utility_bill" },
  { value: "tax_profile", surface: "tax_document_upload", sourceType: "tax_document" },
  { value: "tax_document", surface: "tax_document_upload", sourceType: "tax_document" },
  { value: "property_tax_profile", surface: "tax_document_upload", sourceType: "tax_document" },
  { value: "quote", surface: "project_quote_upload", sourceType: "quote_or_invoice" },
  { value: "project_quote", surface: "project_quote_upload", sourceType: "quote_or_invoice" },
  { value: "quote_or_invoice", surface: "project_quote_upload", sourceType: "quote_or_invoice" },
  { value: "invoice", surface: "project_quote_upload", sourceType: "quote_or_invoice" },
  { value: "contractor_quote", surface: "project_quote_upload", sourceType: "quote_or_invoice" },
  { value: "application", surface: "program_application_form", sourceType: "application_or_award_document" },
  { value: "award_document", surface: "program_application_form", sourceType: "application_or_award_document" },
  { value: "program_application", surface: "program_application_form", sourceType: "application_or_award_document" },
  { value: "retrofit_assumptions", surface: "retrofit_scope_form", sourceType: "retrofit_scope" },
  { value: "project_scope", surface: "retrofit_scope_form", sourceType: "retrofit_scope" },
  { value: "user_profile", surface: "intake_profile_form", sourceType: "user_profile" },
  { value: "business_profile", surface: "intake_profile_form", sourceType: "user_profile" }
];

export function buildV2FormInputFields({ requiredInputs = [], missingInputs = [], inputRequirements = [] } = {}) {
  const requirementByKey = new Map();
  for (const requirement of inputRequirements || []) {
    const key = inputKeyFor(requirement);
    if (!key) continue;
    requirementByKey.set(key, mergeRequirements(requirementByKey.get(key), requirement));
  }
  for (const input of missingInputs || []) {
    const key = inputKeyFor(input);
    if (!key) continue;
    requirementByKey.set(key, mergeRequirements(requirementByKey.get(key), input));
  }
  for (const input of requiredInputs || []) {
    const key = inputKeyFor(input);
    if (!key) continue;
    requirementByKey.set(key, mergeRequirements(requirementByKey.get(key), typeof input === "string" ? { input_key: input } : input));
  }

  const missingKeys = new Set((missingInputs || []).map(inputKeyFor).filter(Boolean));
  return [...requirementByKey.values()]
    .map((requirement) => mapV2InputToField(requirement, { isMissing: missingKeys.has(inputKeyFor(requirement)) }))
    .sort((a, b) => surfacePriority(a.collectionSurface) - surfacePriority(b.collectionSurface) || a.label.localeCompare(b.label));
}

export function mapV2InputToField(input, { isMissing = false } = {}) {
  const inputKey = inputKeyFor(input);
  const sourcePrecedence = Array.isArray(input?.source_precedence)
    ? input.source_precedence
    : Array.isArray(input?.sourcePrecedence)
      ? input.sourcePrecedence
      : [];
  const sourceHint = sourceHintFor(inputKey, sourcePrecedence);
  const valueType = input?.value_type || input?.valueType || inferValueType(inputKey);
  const collectionSurface = sourceHint.surface;

  return {
    inputKey,
    label: input?.label || humanizeInputKey(inputKey),
    valueType,
    collectionSurface,
    collectionSurfaceLabel: collectionSurfaceLabel(collectionSurface),
    collectionSourceType: sourceHint.sourceType,
    implementationStatus: IMPLEMENTED_SURFACES.has(collectionSurface) ? "implemented" : "planned",
    fieldId: fieldIdFor(collectionSurface, inputKey),
    requiredBeforeEstimate: input?.missing_severity === "blocks_calculation" || input?.missingSeverity === "blocks_calculation" || isMissing,
    userOverrideAllowed: true,
    uploadKind: uploadKindForSurface(collectionSurface),
    sourcePrecedence
  };
}

function sourceHintFor(inputKey, sourcePrecedence = []) {
  for (const hint of SOURCE_SURFACE_HINTS) {
    if (hint.pattern.test(inputKey || "")) return { surface: hint.surface, sourceType: hint.sourceType };
  }

  for (const source of sourcePrecedence) {
    const normalized = String(source || "").toLowerCase();
    const match = SOURCE_PRECEDENCE_SURFACES.find((item) => normalized === item.value || normalized.includes(item.value));
    if (match) return { surface: match.surface, sourceType: match.sourceType };
  }

  return { surface: "retrofit_scope_form", sourceType: "retrofit_scope" };
}

function inputKeyFor(input) {
  if (typeof input === "string") return input;
  return input?.inputKey || input?.input_key || input?.fieldId || input?.field_id || null;
}

function mergeRequirements(existing, incoming) {
  if (!existing) return { ...(incoming || {}) };
  return {
    ...existing,
    ...incoming,
    label: existing.label || incoming?.label,
    value_type: existing.value_type || incoming?.value_type,
    source_precedence: unique([...(existing.source_precedence || existing.sourcePrecedence || []), ...(incoming?.source_precedence || incoming?.sourcePrecedence || [])]),
    missing_severity: existing.missing_severity || incoming?.missing_severity || incoming?.missingSeverity
  };
}

function inferValueType(inputKey = "") {
  if (/(date|deadline|start|end)/i.test(inputKey)) return "date";
  if (/(cents|cost|amount|price|budget|tax|liability|fee)/i.test(inputKey)) return "money_cents";
  if (/(count|quantity|number|kw|kwh|therm|percent|share|rate|tons|horsepower|capacity|square_feet)/i.test(inputKey)) return "number";
  if (/(eligible|verified|confirmed|required|approved|enrolled|compliance|status)/i.test(inputKey)) return "boolean_or_enum";
  return "string";
}

function humanizeInputKey(inputKey = "") {
  return String(inputKey || "required input")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function fieldIdFor(surface, inputKey) {
  return `${surface}.${String(inputKey || "input").replace(/[^a-zA-Z0-9_:-]+/g, "_")}`;
}

function uploadKindForSurface(surface) {
  if (surface === "utility_bill_upload") return "utility_bill";
  if (surface === "project_quote_upload") return "quote_or_invoice";
  if (surface === "tax_document_upload") return "tax_document";
  if (surface === "program_application_form") return "application_or_award_document";
  return null;
}

function collectionSurfaceLabel(surface) {
  switch (surface) {
    case "intake_profile_form":
      return "Business/site intake form";
    case "retrofit_scope_form":
      return "Retrofit scope form";
    case "utility_bill_upload":
      return "Utility bill upload";
    case "project_quote_upload":
      return "Project quote or invoice upload";
    case "tax_document_upload":
      return "Tax/accounting document upload";
    case "program_application_form":
      return "Program application or award status";
    default:
      return "Retrofit scope form";
  }
}

function surfacePriority(surface) {
  switch (surface) {
    case "retrofit_scope_form":
      return 1;
    case "project_quote_upload":
      return 2;
    case "utility_bill_upload":
      return 3;
    case "tax_document_upload":
      return 4;
    case "program_application_form":
      return 5;
    case "intake_profile_form":
      return 6;
    default:
      return 9;
  }
}

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}
