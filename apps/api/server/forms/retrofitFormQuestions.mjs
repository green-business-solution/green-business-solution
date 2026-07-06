import fs from "node:fs";
import path from "node:path";

const QUESTION_CATALOG_FILE = "retrofit_form_question_catalog.json";

let cachedCatalog = null;

export function buildRetrofitDetailQuestions(retrofit = {}, options = {}) {
  const catalog = options.catalog || readRetrofitFormQuestionCatalog();
  const retrofitTypeId = String(retrofit.retrofitTypeId || retrofit.id || "").trim();
  if (!retrofitTypeId) return [];

  const binding = selectBinding(catalog, retrofit);
  const questionIds = unique([
    ...(catalog.defaultQuestionIds || []),
    ...((binding && binding.questionIds) || [])
  ]);

  return questionIds
    .map((questionId) => buildQuestion(catalog.questions?.[questionId], { questionId, retrofit, retrofitTypeId }))
    .filter(Boolean);
}

export function readRetrofitFormQuestionCatalog() {
  if (cachedCatalog) return cachedCatalog;
  const catalogPath = resolveRepoOrLambdaDataFile(QUESTION_CATALOG_FILE);
  cachedCatalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  return cachedCatalog;
}

export function selectBinding(catalog = {}, retrofit = {}) {
  const bindings = [...(catalog.bindings || [])].sort((a, b) => Number(a.priority || 0) - Number(b.priority || 0));
  return bindings.find((binding) => bindingMatches(binding, retrofit)) || null;
}

function buildQuestion(definition, { questionId, retrofitTypeId }) {
  if (!definition || !definition.question || !definition.answerType) return null;
  const idSuffix = definition.idSuffix || questionId;
  return stripUndefined({
    id: `${retrofitTypeId}:${idSuffix}`,
    questionId,
    retrofitId: retrofitTypeId,
    question: definition.question,
    whyItMatters: definition.whyItMatters || detailQuestionGuidance(definition.question).reason,
    affects: definition.affects || detailQuestionGuidance(definition.question).affects,
    answerType: definition.answerType,
    options: definition.options,
    canonicalInputKey: definition.canonicalInputKey || questionId,
    collectionStage: definition.collectionStage || "pre_opportunity_estimate",
    collectionSurface: definition.collectionSurface || "retrofit_scope_form",
    unit: definition.unit,
    visibleIf: definition.visibleIf,
    requiredIf: definition.requiredIf,
    clearsWhenHidden: definition.clearsWhenHidden
  });
}

function bindingMatches(binding = {}, retrofit = {}) {
  const match = binding.match || {};
  if (match.always === true) return true;

  const retrofitTypeId = normalizeText(retrofit.retrofitTypeId || retrofit.id);
  const displayName = normalizeText(retrofit.displayName || retrofit.name);
  const parentCategory = normalizeText(retrofit.parentCategory || retrofit.category);
  const text = [retrofitTypeId, displayName, parentCategory].filter(Boolean).join(" ");

  if (Array.isArray(match.retrofitTypeIdContains) && match.retrofitTypeIdContains.some((value) => retrofitTypeId.includes(normalizeText(value)))) {
    return true;
  }
  if (Array.isArray(match.textContains) && match.textContains.some((value) => text.includes(normalizeText(value)))) {
    return true;
  }
  return false;
}

function detailQuestionGuidance(question = "") {
  const normalized = question.toLowerCase();
  if (normalized.includes("quote") || normalized.includes("cost")) {
    return { reason: "Project cost drives savings, incentives, and payback.", affects: ["Project cost", "Payback", "Eligible incentives"] };
  }
  if (normalized.includes("how many") || normalized.includes("quantity") || normalized.includes("count")) {
    return { reason: "Quantity changes equipment cost, labor, and incentive caps.", affects: ["Project cost", "Incentive amount"] };
  }
  if (normalized.includes("tax")) {
    return { reason: "Tax treatment changes the estimated net project cost.", affects: ["Tax benefits", "Payback"] };
  }
  if (normalized.includes("fuel") || normalized.includes("usage") || normalized.includes("hours")) {
    return { reason: "Operating patterns determine recurring savings.", affects: ["Recurring savings", "Emissions impact"] };
  }
  return { reason: "This helps calculate a more accurate retrofit estimate.", affects: ["Estimate accuracy", "Opportunity eligibility"] };
}

function resolveRepoOrLambdaDataFile(fileName) {
  const candidates = [
    path.resolve(import.meta.dirname, "..", "..", "data", fileName),
    path.resolve(import.meta.dirname, "..", "..", "..", "..", "data", fileName)
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || candidates[0];
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function stripUndefined(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined));
}
