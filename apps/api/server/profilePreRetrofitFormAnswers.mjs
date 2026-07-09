export const PRE_RETROFIT_FORM_ANSWERS_SCHEMA_VERSION = "pre-retrofit-form-answers-v1";

const allowedAnswerTypes = new Set(["text", "number", "select", "boolean", "file", "date"]);
const maxQuestionCount = 100;
const maxAnswerLength = 2000;
const maxMetadataLength = 500;

function cleanText(value, maxLength = maxMetadataLength) {
  if (value == null) return "";
  const text = String(value).trim();
  return text.length > maxLength ? text.slice(0, maxLength).trim() : text;
}

function cleanOptional(value, maxLength = maxMetadataLength) {
  const text = cleanText(value, maxLength);
  return text || undefined;
}

function cleanStringArray(value, maxLength = maxMetadataLength) {
  if (!Array.isArray(value)) return undefined;
  const values = value.map((item) => cleanText(item, maxLength)).filter(Boolean).slice(0, 12);
  return values.length ? values : undefined;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stripUndefined(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined));
}

function answerTypeFor(question = {}) {
  const answerType = cleanText(question.answerType, 40);
  return allowedAnswerTypes.has(answerType) ? answerType : "text";
}

function normalizedQuestionMap(questions) {
  const map = new Map();
  if (!Array.isArray(questions)) return map;

  for (const question of questions.slice(0, maxQuestionCount)) {
    if (!isPlainObject(question)) continue;
    const id = cleanText(question.id);
    if (!id) continue;
    map.set(id, question);
  }

  return map;
}

function normalizedAnswerValue(value) {
  if (value == null) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return cleanText(value, maxAnswerLength);
}

export function buildPreRetrofitFormAnswerRecord(input = {}, options = {}) {
  const now = cleanText(options.now, 80) || new Date().toISOString();
  const retrofitTypeId = cleanText(input.retrofitTypeId || input.retrofitId);
  if (!retrofitTypeId) {
    const error = new Error("retrofitTypeId is required.");
    error.status = 400;
    throw error;
  }

  if (!isPlainObject(input.answers)) {
    const error = new Error("answers must be an object keyed by form question ID.");
    error.status = 400;
    throw error;
  }

  const questionsById = normalizedQuestionMap(input.questions);
  const answers = {};
  const answerOrder = [];
  const submittedEntries = Object.entries(input.answers).slice(0, maxQuestionCount);

  for (const [rawQuestionId, rawValue] of submittedEntries) {
    const questionId = cleanText(rawQuestionId);
    const value = normalizedAnswerValue(rawValue);
    if (!questionId || !value) continue;
    const question = questionsById.get(questionId) || {};

    answers[questionId] = stripUndefined({
      questionId,
      catalogQuestionId: cleanOptional(question.questionId),
      canonicalInputKey: cleanOptional(question.canonicalInputKey),
      retrofitId: cleanOptional(question.retrofitId) || retrofitTypeId,
      retrofitName: cleanOptional(question.retrofitName || input.retrofitName),
      opportunityId: cleanOptional(question.opportunityId),
      requirementId: cleanOptional(question.requirementId),
      requirementType: cleanOptional(question.requirementType),
      applicationSection: cleanOptional(question.applicationSection),
      questionKind: cleanOptional(question.questionKind),
      collectionStage: cleanOptional(question.collectionStage),
      collectionSurface: cleanOptional(question.collectionSurface),
      question: cleanOptional(question.question, 1000) || questionId,
      answerType: answerTypeFor(question),
      value,
      options: cleanStringArray(question.options),
      updatedAt: now
    });
    answerOrder.push(questionId);
  }

  if (answerOrder.length === 0) {
    const error = new Error("At least one form answer is required.");
    error.status = 400;
    throw error;
  }

  return {
    retrofitTypeId,
    retrofitName: cleanOptional(input.retrofitName) || retrofitTypeId,
    updatedAt: now,
    answerCount: answerOrder.length,
    answerOrder,
    answers
  };
}

export function normalizePreRetrofitFormAnswers(value) {
  if (!isPlainObject(value)) return null;
  const retrofits = isPlainObject(value.retrofits) ? value.retrofits : {};
  const normalizedRetrofits = {};

  for (const [rawRetrofitTypeId, rawRecord] of Object.entries(retrofits)) {
    if (!isPlainObject(rawRecord)) continue;
    const retrofitTypeId = cleanText(rawRecord.retrofitTypeId || rawRetrofitTypeId);
    if (!retrofitTypeId || !isPlainObject(rawRecord.answers)) continue;

    const answers = {};
    const answerOrder = Array.isArray(rawRecord.answerOrder)
      ? rawRecord.answerOrder.map((item) => cleanText(item)).filter(Boolean)
      : [];

    for (const [rawQuestionId, rawAnswer] of Object.entries(rawRecord.answers)) {
      if (!isPlainObject(rawAnswer)) continue;
      const questionId = cleanText(rawAnswer.questionId || rawQuestionId);
      const answerValue = normalizedAnswerValue(rawAnswer.value);
      if (!questionId || !answerValue) continue;
      answers[questionId] = stripUndefined({
        questionId,
        catalogQuestionId: cleanOptional(rawAnswer.catalogQuestionId),
        canonicalInputKey: cleanOptional(rawAnswer.canonicalInputKey),
        retrofitId: cleanOptional(rawAnswer.retrofitId) || retrofitTypeId,
        retrofitName: cleanOptional(rawAnswer.retrofitName || rawRecord.retrofitName),
        opportunityId: cleanOptional(rawAnswer.opportunityId),
        requirementId: cleanOptional(rawAnswer.requirementId),
        requirementType: cleanOptional(rawAnswer.requirementType),
        applicationSection: cleanOptional(rawAnswer.applicationSection),
        questionKind: cleanOptional(rawAnswer.questionKind),
        collectionStage: cleanOptional(rawAnswer.collectionStage),
        collectionSurface: cleanOptional(rawAnswer.collectionSurface),
        question: cleanOptional(rawAnswer.question, 1000) || questionId,
        answerType: answerTypeFor(rawAnswer),
        value: answerValue,
        options: cleanStringArray(rawAnswer.options),
        updatedAt: cleanOptional(rawAnswer.updatedAt, 80)
      });
    }

    const orderedAnswerIds = [
      ...answerOrder.filter((questionId) => answers[questionId]),
      ...Object.keys(answers).filter((questionId) => !answerOrder.includes(questionId))
    ];
    if (orderedAnswerIds.length === 0) continue;

    normalizedRetrofits[retrofitTypeId] = stripUndefined({
      retrofitTypeId,
      retrofitName: cleanOptional(rawRecord.retrofitName) || retrofitTypeId,
      updatedAt: cleanOptional(rawRecord.updatedAt, 80),
      answerCount: orderedAnswerIds.length,
      answerOrder: orderedAnswerIds,
      answers
    });
  }

  if (Object.keys(normalizedRetrofits).length === 0) return null;
  return stripUndefined({
    schemaVersion: PRE_RETROFIT_FORM_ANSWERS_SCHEMA_VERSION,
    updatedAt: cleanOptional(value.updatedAt, 80),
    retrofits: normalizedRetrofits
  });
}

export function mergePreRetrofitFormAnswers(existing, retrofitAnswerRecord, options = {}) {
  const now = cleanText(options.now, 80) || retrofitAnswerRecord?.updatedAt || new Date().toISOString();
  const normalizedExisting = normalizePreRetrofitFormAnswers(existing) || {
    schemaVersion: PRE_RETROFIT_FORM_ANSWERS_SCHEMA_VERSION,
    updatedAt: null,
    retrofits: {}
  };
  const normalizedRecord = normalizePreRetrofitFormAnswers({
    updatedAt: now,
    retrofits: {
      [retrofitAnswerRecord?.retrofitTypeId || ""]: retrofitAnswerRecord
    }
  });
  const normalizedRetrofitRecord = normalizedRecord?.retrofits?.[retrofitAnswerRecord?.retrofitTypeId];
  if (!normalizedRetrofitRecord) {
    const error = new Error("A valid retrofit form answer record is required.");
    error.status = 400;
    throw error;
  }

  return {
    schemaVersion: PRE_RETROFIT_FORM_ANSWERS_SCHEMA_VERSION,
    updatedAt: now,
    retrofits: {
      ...normalizedExisting.retrofits,
      [normalizedRetrofitRecord.retrofitTypeId]: normalizedRetrofitRecord
    }
  };
}
