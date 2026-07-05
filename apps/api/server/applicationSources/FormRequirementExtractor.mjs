import { cleanSourceText, sanitizeSnippet } from "./SourceTextHygiene.mjs";

const SYSTEM_LABEL_PATTERNS = [
  /^\s*(done|submit|cancel|retry|next|previous|back|continue|reset|close)\s*$/i,
  /\bcaptcha\b/i,
  /\brecaptcha\b/i,
  /\binvalidinitialphone\b/i,
  /\binvalidphone\b/i,
  /\bphonenosdonotmatch\b/i,
  /\bphone numbers do not match\b/i,
  /\bunconfirmeduser\b/i,
  /\botpsentemail\b/i,
  /\bone[- ]?time password\b/i,
  /^\s*sending email\s*$/i,
  /\bverification email\b/i,
  /\bverify your email\b/i,
  /\bemail link to\b/i,
  /\bplease enter a valid email address to configure zoho sign settings\b/i,
  /\bzoho sign settings\b/i,
  /\benter a valid email address\b/i,
  /\bplease enter a valid phone number\b/i,
  /\benter a valid phone number\b/i,
  /\benter a phone number\b/i,
  /\bverify your email address\b/i,
  /\bentervalidmail\b/i,
  /\bif\s*\(/i,
  /\bfunction\s*\(/i,
  /\bindexOf\s*\(/i,
  /[{};]/,
  /\bsupport@zohoforms\.com\b/i,
  /\bpowered by\b/i,
  /\bprivacy policy\b/i,
  /\bterms of service\b/i,
  /\bnewsletter\b/i,
  /\bsign up\b/i,
  /\bnotification preferences?\b/i,
  /\bchoose which notifications\b/i
];

const FIELD_DEFINITIONS = [
  { id: "name", label: "Name", requirementType: "contact", patterns: [/\bname\b/i, /\bfirst and last name\b/i] },
  { id: "contact_name", label: "Contact name", requirementType: "contact", patterns: [/\bcontact name\b/i, /\bapplicant name\b/i, /\bcustomer name\b/i] },
  { id: "email_address", label: "Email address", requirementType: "contact", patterns: [/\bemail address\b/i, /\bemail\b/i] },
  { id: "daytime_phone_number", label: "Daytime phone number", requirementType: "contact", patterns: [/\bdaytime phone number\b/i, /\bphone number\b/i, /\bphone\b/i, /\btelephone\b/i] },
  { id: "property_address", label: "Property address", requirementType: "field", patterns: [/\bproperty address\b/i, /\bproject address\b/i, /\bsite address\b/i, /\bservice address\b/i, /\binstallation address\b/i] },
  { id: "property_ownership_authorization", label: "Property ownership/authorization", requirementType: "eligibility", patterns: [/\bdo you own the property\b/i, /\bauthorized on their behalf\b/i, /\bproperty ownership\b/i] },
  { id: "vgs_customer_status", label: "VGS customer status", requirementType: "eligibility", patterns: [/\bare you a vgs customer\b/i, /\bvgs customer\b/i] },
  { id: "vgs_account_number", label: "VGS account number", requirementType: "account_number", optionalByDefault: true, patterns: [/\bvgs account number\b/i, /\baccount number\b/i] },
  { id: "products_interested_in", label: "Products interested in", requirementType: "field", patterns: [/\bproducts? (?:are you )?interested in\b/i, /\bwhat products\b/i] },
  { id: "heating_equipment_type", label: "Heating equipment type", requirementType: "field", patterns: [/\btype of heating equipment\b/i, /\bheating equipment\b/i] },
  { id: "electric_provider", label: "Electric provider", requirementType: "field", patterns: [/\belectric provider\b/i, /\belectric utility\b/i] },
  { id: "water_heater_type", label: "Water heater type", requirementType: "field", patterns: [/\btype of water heater\b/i, /\bwater heater type\b/i] },
  { id: "water_heater_age", label: "Current water heater age", requirementType: "field", optionalByDefault: true, patterns: [/\bhow old is your current water heater\b/i, /\bwater heater age\b/i] },
  { id: "current_hot_water_fuel", label: "Current hot water fuel", requirementType: "field", optionalByDefault: true, patterns: [/\bcurrently heat your hot water\b/i, /\bhot water fuel\b/i] },
  { id: "electric_panel_upgrade_status", label: "Electric panel upgrade status", requirementType: "field", patterns: [/\belectric panel require an upgrade\b/i, /\belectric panel upgrade\b/i] },
  { id: "currently_working_with_electrician", label: "Currently working with electrician", requirementType: "field", patterns: [/\bcurrently working with an electrician\b/i, /\bworking with electrician\b/i] },
  { id: "home_heating_method", label: "Home heating method", requirementType: "field", patterns: [/\bhow do you heat your home\b/i, /\bhome heating method\b/i] },
  { id: "furnace_in_basement", label: "Furnace in basement", requirementType: "field", patterns: [/\bfurnace located in a basement\b/i, /\bfurnace in basement\b/i] },
  { id: "furnace_make_model", label: "Furnace make/model", requirementType: "field", optionalByDefault: true, patterns: [/\bfurnace make and model\b/i, /\bfurnace make\/model\b/i] },
  { id: "furnace_age", label: "Furnace age", requirementType: "field", optionalByDefault: true, patterns: [/\bfurnace age\b/i, /\bhow old is your furnace\b/i] },
  { id: "dwelling_type", label: "Dwelling type", requirementType: "field", patterns: [/\bdwelling type\b/i, /\btype of home\b/i] },
  { id: "income_qualification_question", label: "Income qualification question", requirementType: "eligibility", patterns: [/\bincome qualification\b/i, /\bincome qualified\b/i, /\bincome question\b/i] },
  { id: "how_heard_about_program", label: "How heard about program", requirementType: "field", patterns: [/\bhow did you hear\b/i, /\bhow heard about\b/i] },
  { id: "square_footage", label: "Square footage", requirementType: "field", optionalByDefault: true, patterns: [/\bsquare footage\b/i, /\bsq\.?\s*ft\b/i] },
  { id: "electric_panel_photo", label: "Electric panel photo", requirementType: "document", optionalByDefault: true, patterns: [/\belectric panel photo\b/i, /\bphoto of (?:your )?electric panel\b/i] },
  { id: "furnace_photo", label: "Furnace photo", requirementType: "document", optionalByDefault: true, patterns: [/\bfurnace photo\b/i, /\bphoto of (?:your )?furnace\b/i] },
  { id: "business_legal_name", label: "Business legal name", requirementType: "field", patterns: [/\bbusiness legal name\b/i, /\blegal business name\b/i, /\bcompany legal name\b/i] },
  { id: "tax_id", label: "Tax ID", requirementType: "field", patterns: [/\btax id\b/i, /\btaxpayer identification\b/i, /\bein\b/i] },
  { id: "project_cost", label: "Project cost", requirementType: "field", patterns: [/\bproject cost\b/i, /\btotal installed cost\b/i, /\btotal project cost\b/i] },
  { id: "project_type", label: "Project type", requirementType: "field", patterns: [/\bproject type\b/i, /\bprogram dropdown\b/i] },
  { id: "contractor_name", label: "Contractor name", requirementType: "contractor", patterns: [/\bcontractor name\b/i, /\binstaller\b/i, /\bvendor\b/i] }
];

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeWhitespace(value) {
  return cleanText(value).replace(/\s+/g, " ");
}

function decodeHtmlEntities(value) {
  return cleanText(value)
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

function stripHtml(value) {
  return decodeHtmlEntities(cleanText(value).replace(/<[^>]+>/g, " "));
}

function isSystemLabel(label) {
  const text = normalizeWhitespace(label);
  if (!text || text.length > 160) return true;
  return SYSTEM_LABEL_PATTERNS.some((pattern) => pattern.test(text));
}

function extractLabelCandidates(htmlOrText) {
  const source = cleanText(htmlOrText);
  const labels = [];

  for (const match of source.matchAll(/<label\b([^>]*)>([\s\S]*?)<\/label>/gi)) {
    const attrs = match[1] || "";
    const text = normalizeWhitespace(stripHtml(match[2]));
    if (!isSystemLabel(text)) {
      labels.push({
        text,
        required: /\*|required|aria-required\s*=\s*["']?true/i.test(`${attrs} ${match[2]}`),
        evidence: sanitizeSnippet(stripHtml(match[0]), 220)
      });
    }
  }

  for (const match of source.matchAll(/<(?:div|span|p)\b[^>]*(?:class|id)=["'][^"']*(?:label|field-label|zf-labelName|gfield_label)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|span|p)>/gi)) {
    const text = normalizeWhitespace(stripHtml(match[1]));
    if (!isSystemLabel(text)) {
      labels.push({
        text,
        required: /\*/.test(match[1]),
        evidence: sanitizeSnippet(stripHtml(match[0]), 220)
      });
    }
  }

  const plainText = cleanSourceText(stripHtml(source)).text;
  for (const line of plainText.split(/\n+/).map(normalizeWhitespace).filter(Boolean)) {
    const possibleLabel = line.replace(/\s+\*\s*$/, "").replace(/\s+\(required\)\s*$/i, "");
    if (isSystemLabel(possibleLabel)) continue;
    if (/[:?*]\s*$/.test(line) || FIELD_DEFINITIONS.some((definition) => definition.patterns.some((pattern) => pattern.test(possibleLabel)))) {
      labels.push({
        text: possibleLabel,
        required: /\*|\brequired\b/i.test(line),
        evidence: sanitizeSnippet(line, 220)
      });
    }
  }

  const seen = new Set();
  return labels.filter((label) => {
    const key = normalizeWhitespace(label.text).toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function definitionForLabel(label) {
  return FIELD_DEFINITIONS
    .filter((definition) => definition.patterns.some((pattern) => pattern.test(label)))
    .sort((a, b) => b.label.length - a.label.length)[0];
}

function requirementFromLabel(definition, label, sourceUrl, required) {
  return {
    id: definition.id,
    label: definition.label,
    requirementType: definition.requirementType,
    required,
    sourceUrl,
    evidenceSnippet: label.evidence || sanitizeSnippet(label.text, 220),
    confidence: required ? "High" : "Medium"
  };
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

export function extractFormRequirementsFromHtml(htmlOrText, { sourceUrl } = {}) {
  const labels = extractLabelCandidates(htmlOrText);
  const requiredFields = [];
  const optionalFields = [];
  const ignoredLabels = [];

  for (const label of labels) {
    const definition = definitionForLabel(label.text);
    if (!definition) {
      ignoredLabels.push(label.text);
      continue;
    }

    const required = Boolean(label.required || !definition.optionalByDefault);
    const requirement = requirementFromLabel(definition, label, sourceUrl, required);
    if (required) requiredFields.push(requirement);
    else optionalFields.push(requirement);
  }

  return {
    requiredFields: dedupeRequirements(requiredFields),
    optionalFields: dedupeRequirements(optionalFields),
    ignoredLabels: ignoredLabels.slice(0, 40),
    formFieldExtractionStatus: requiredFields.length + optionalFields.length > 0 ? "form_fields_extracted" : "form_fields_not_found",
    evidence: dedupeRequirements([...requiredFields, ...optionalFields]).slice(0, 8).map((item) => ({
      label: `${item.label} form field found`,
      sourceUrl,
      textSnippet: item.evidenceSnippet
    }))
  };
}
