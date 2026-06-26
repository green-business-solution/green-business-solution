import fs from "node:fs";
import { XMLParser } from "fast-xml-parser";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true,
  trimValues: true
});

const billFieldDictionaryPath = new URL("../../data/bill_field_dictionary.json", import.meta.url);
const billFieldDictionary = JSON.parse(fs.readFileSync(billFieldDictionaryPath, "utf8"));
const billFieldById = new Map(billFieldDictionary.map((field) => [field.id, field]));

export const supportedUtilityFileTypes = new Set(["green_button_xml", "green_button_csv", "utility_pdf", "unknown"]);

const pgeAliases = new Set(["pg&e", "pge", "pacific gas and electric", "pacific gas & electric", "pacific gas and electric company"]);

function cleanText(value) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function cleanMaybeText(value) {
  const text = cleanText(value);
  return text || null;
}

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeUtilityProvider(value) {
  const text = cleanText(value);
  if (!text) return null;
  const lower = text.toLowerCase();
  if (pgeAliases.has(lower)) return "PG&E";
  if ([...pgeAliases].some((alias) => lower.includes(alias))) return "PG&E";
  return text;
}

function normalizeMonthKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 7);
}

function isoFromEpochSeconds(value) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) return null;
  return new Date(parsed * 1000).toISOString();
}

function maskAccountNumber(value) {
  const digits = String(value || "").replace(/\D+/g, "");
  if (!digits) return null;
  const tail = digits.slice(-4);
  return tail ? `***${tail}` : null;
}

function deepCollect(node, key, results = []) {
  if (!node || typeof node !== "object") {
    return results;
  }

  if (Object.prototype.hasOwnProperty.call(node, key)) {
    results.push(node[key]);
  }

  for (const value of Object.values(node)) {
    if (value && typeof value === "object") {
      deepCollect(value, key, results);
    }
  }

  return results;
}

function collectNamedValues(node, matcher, results = []) {
  if (!node || typeof node !== "object") {
    return results;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      collectNamedValues(item, matcher, results);
    }
    return results;
  }

  for (const [key, value] of Object.entries(node)) {
    if (matcher.test(key)) {
      results.push({ key, value });
    }

    if (value && typeof value === "object") {
      collectNamedValues(value, matcher, results);
    }
  }

  return results;
}

function firstNonEmptyText(values) {
  for (const value of values) {
    const text = cleanText(value);
    if (text) return text;
  }
  return null;
}

function dateOnly(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function buildMonthRange(monthKey) {
  const start = new Date(`${monthKey}-01T00:00:00.000Z`);
  if (Number.isNaN(start.getTime())) {
    return { periodStart: null, periodEnd: null };
  }

  const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0));
  return {
    periodStart: start.toISOString().slice(0, 10),
    periodEnd: end.toISOString().slice(0, 10)
  };
}

function roundNumber(value, digits = 6) {
  if (!Number.isFinite(value)) return null;
  return Number(value.toFixed(digits));
}

function buildExtractedValue({
  clientIntakeId,
  confidence,
  fieldId,
  fileId,
  periodEnd = null,
  periodStart = null,
  sourcePath = null,
  sourceText = null,
  sourceType,
  unit = null,
  value
}) {
  const metadata = billFieldById.get(fieldId);
  if (!metadata) {
    throw new Error(`Unknown bill field ID: ${fieldId}`);
  }

  return {
    extractedValueId: `${fileId}:${fieldId}:${cryptoSafeSuffix(periodStart, periodEnd, value)}`,
    clientIntakeId,
    fileId,
    fieldId,
    fieldDisplayName: metadata.display_name,
    value,
    unit: unit || metadata.unit || null,
    periodStart,
    periodEnd,
    confidence,
    sourceType,
    sourceText: sourceText || null,
    sourcePath: sourcePath || null
  };
}

function cryptoSafeSuffix(periodStart, periodEnd, value) {
  return [periodStart || "na", periodEnd || "na", String(value ?? "na").slice(0, 24)].join(":");
}

export function validateExtractedValueFieldIds(extractedValues) {
  const unknown = [];
  for (const item of extractedValues) {
    if (!billFieldById.has(item.fieldId)) {
      unknown.push(item.fieldId);
    }
  }
  return {
    ok: unknown.length === 0,
    unknownFieldIds: [...new Set(unknown)]
  };
}

function detectAddressObject(document) {
  const candidates = collectNamedValues(
    document,
    /(service.*address|premise.*address|street.*address|postal.*address|address)/i
  ).map(({ value }) => value);

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
      const text = cleanText(candidate);
      if (text && /\d/.test(text)) return text;
      continue;
    }

    const line1 = firstNonEmptyText([candidate.line1, candidate.street1, candidate.street, candidate.address1, candidate.addressLine1]);
    const line2 = firstNonEmptyText([candidate.line2, candidate.address2, candidate.addressLine2]);
    const city = firstNonEmptyText([candidate.city, candidate.town]);
    const state = firstNonEmptyText([candidate.state, candidate.stateCode, candidate.province]);
    const postal = firstNonEmptyText([candidate.postalCode, candidate.zip, candidate.zipCode]);
    const composed = [line1, line2, city, [state, postal].filter(Boolean).join(" ")].filter(Boolean).join(", ");
    if (composed) return composed;
  }

  return null;
}

function detectFieldText(document, matcher) {
  const texts = collectNamedValues(document, matcher)
    .map(({ value }) => {
      if (typeof value === "object") {
        return firstNonEmptyText(Object.values(value));
      }
      return cleanText(value);
    })
    .filter(Boolean);

  return texts[0] || null;
}

function detectNumericField(document, matcher) {
  const values = collectNamedValues(document, matcher)
    .map(({ value }) => Number.parseFloat(String(typeof value === "object" ? firstNonEmptyText(Object.values(value)) : value)))
    .filter(Number.isFinite);

  return values[0] ?? null;
}

function aggregateIntervals(intervals) {
  const monthMap = new Map();

  for (const interval of intervals) {
    const month = normalizeMonthKey(interval.start);
    if (!month) continue;
    const current = monthMap.get(month) || { kwh: 0, cost: 0 };
    monthMap.set(month, {
      kwh: current.kwh + interval.kwh,
      cost: current.cost + (interval.cost || 0)
    });
  }

  const monthly = [...monthMap.entries()]
    .map(([month, summary]) => {
      const range = buildMonthRange(month);
      return {
        month,
        periodStart: range.periodStart,
        periodEnd: range.periodEnd,
        kwh: roundNumber(summary.kwh, 6),
        cost: Number.isFinite(summary.cost) && summary.cost > 0 ? roundNumber(summary.cost, 2) : null
      };
    })
    .sort((left, right) => left.month.localeCompare(right.month));

  return {
    monthly,
    annualKwh: roundNumber(monthly.reduce((sum, item) => sum + (item.kwh || 0), 0), 6),
    annualCost: roundNumber(monthly.reduce((sum, item) => sum + (item.cost || 0), 0), 2)
  };
}

function buildExtractedValuesFromAggregates({
  accountNumberMasked,
  annualCost,
  annualKwh,
  billingPeriodEnd,
  billingPeriodStart,
  clientIntakeId,
  customerClass,
  fileId,
  monthly,
  rateSchedule,
  serviceAddress,
  sourcePath,
  sourceType,
  utilityProvider
}) {
  const extractedValues = [];

  if (utilityProvider) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "high",
        fieldId: "utility_provider",
        fileId,
        sourcePath,
        sourceText: utilityProvider,
        sourceType,
        value: utilityProvider
      })
    );
  }

  if (serviceAddress) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "medium",
        fieldId: "service_address",
        fileId,
        sourcePath,
        sourceText: serviceAddress,
        sourceType,
        value: serviceAddress
      })
    );
  }

  if (accountNumberMasked) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "medium",
        fieldId: "account_number_masked",
        fileId,
        sourcePath,
        sourceText: accountNumberMasked,
        sourceType,
        value: accountNumberMasked
      })
    );
  }

  if (billingPeriodStart) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "high",
        fieldId: "billing_period_start",
        fileId,
        sourcePath,
        sourceText: billingPeriodStart,
        sourceType,
        value: billingPeriodStart
      })
    );
  }

  if (billingPeriodEnd) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "high",
        fieldId: "billing_period_end",
        fileId,
        sourcePath,
        sourceText: billingPeriodEnd,
        sourceType,
        value: billingPeriodEnd
      })
    );
  }

  for (const month of monthly) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "high",
        fieldId: "monthly_kwh",
        fileId,
        periodEnd: month.periodEnd,
        periodStart: month.periodStart,
        sourcePath,
        sourceType,
        unit: "kWh",
        value: month.kwh
      })
    );
  }

  if (annualKwh != null) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: monthly.length >= 11 ? "high" : "medium",
        fieldId: "annual_kwh",
        fileId,
        periodEnd: billingPeriodEnd,
        periodStart: billingPeriodStart,
        sourcePath,
        sourceType,
        unit: "kWh",
        value: annualKwh
      })
    );
  }

  if (monthly.length === 1 && monthly[0].cost != null) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "medium",
        fieldId: "total_electric_cost",
        fileId,
        periodEnd: monthly[0].periodEnd,
        periodStart: monthly[0].periodStart,
        sourcePath,
        sourceType,
        unit: "USD",
        value: monthly[0].cost
      })
    );
  }

  if (annualCost != null && annualCost > 0) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: monthly.length >= 11 ? "high" : "medium",
        fieldId: "annual_electric_cost",
        fileId,
        periodEnd: billingPeriodEnd,
        periodStart: billingPeriodStart,
        sourcePath,
        sourceType,
        unit: "USD",
        value: annualCost
      })
    );
  }

  if (annualKwh != null && annualKwh > 0 && annualCost != null && annualCost > 0) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "medium",
        fieldId: "average_cost_per_kwh",
        fileId,
        periodEnd: billingPeriodEnd,
        periodStart: billingPeriodStart,
        sourcePath,
        sourceType,
        unit: "USD/kWh",
        value: roundNumber(annualCost / annualKwh, 6)
      })
    );
  }

  if (rateSchedule) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "medium",
        fieldId: "rate_schedule",
        fileId,
        sourcePath,
        sourceText: rateSchedule,
        sourceType,
        value: rateSchedule
      })
    );
  }

  if (customerClass) {
    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: "medium",
        fieldId: "customer_class",
        fileId,
        sourcePath,
        sourceText: customerClass,
        sourceType,
        value: customerClass
      })
    );
  }

  return extractedValues;
}

function parseXmlIntervals(document) {
  const intervalBlocks = deepCollect(document, "IntervalBlock").flatMap(asArray);
  const readingTypes = deepCollect(document, "ReadingType").flatMap(asArray);
  const readingType = readingTypes.find(Boolean) || {};
  const powerOfTenMultiplier = Number.parseInt(String(readingType?.powerOfTenMultiplier ?? "0"), 10) || 0;
  const uom = Number.parseInt(String(readingType?.uom ?? "0"), 10) || 0;
  const unitScale = uom === 72 ? 1 / 1000 : 1;

  return intervalBlocks
    .flatMap((block) => asArray(block?.IntervalReading))
    .map((reading) => {
      const start = isoFromEpochSeconds(reading?.timePeriod?.start);
      const durationSeconds = Number.parseInt(String(reading?.timePeriod?.duration ?? "0"), 10) || 0;
      const rawValue = Number.parseFloat(String(reading?.value ?? "0"));
      if (!start || !Number.isFinite(rawValue)) return null;
      const end = new Date(new Date(start).getTime() + durationSeconds * 1000).toISOString();
      return {
        start,
        end,
        kwh: roundNumber(rawValue * Math.pow(10, powerOfTenMultiplier) * unitScale, 6),
        cost: null
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.start.localeCompare(right.start));
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function detectCsvIndexes(headers) {
  const lookup = (pattern) => headers.findIndex((header) => pattern.test(header));
  return {
    start: lookup(/(^start$|start time|timestamp|date|interval.*start|usage start)/i),
    end: lookup(/(^end$|end time|interval.*end|usage end)/i),
    usage: lookup(/(^kwh$|usage|consumption|energy)/i),
    cost: lookup(/(cost|charge|amount)/i),
    utility: lookup(/(utility|provider|company)/i),
    address: lookup(/(service address|premise|address)/i),
    account: lookup(/(account|service account|customer number)/i),
    rate: lookup(/(rate|tariff)/i),
    customerClass: lookup(/(customer class|service class|account type)/i),
    unit: lookup(/(^unit$|uom)/i)
  };
}

function parseGreenButtonCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("CSV file does not contain enough rows to parse energy data.");
  }

  const headers = parseCsvLine(lines[0]);
  const indexes = detectCsvIndexes(headers);
  if (indexes.start === -1 || indexes.usage === -1) {
    throw new Error("CSV headers must include a timestamp/date column and a usage column.");
  }

  const intervals = [];
  const utilityNames = new Set();
  const addresses = new Set();
  const rateSchedules = new Set();
  const customerClasses = new Set();
  const accountNumbers = new Set();

  for (const line of lines.slice(1)) {
    const columns = parseCsvLine(line);
    const startRaw = cleanText(columns[indexes.start]);
    const usage = Number.parseFloat(columns[indexes.usage] ?? "");
    const startDate = new Date(startRaw);
    if (Number.isNaN(startDate.getTime()) || !Number.isFinite(usage)) {
      continue;
    }

    const endRaw = indexes.end >= 0 ? cleanText(columns[indexes.end]) : "";
    const endDate = endRaw ? new Date(endRaw) : new Date(startDate.getTime());
    const cost = indexes.cost >= 0 ? Number.parseFloat(columns[indexes.cost] ?? "") : Number.NaN;

    intervals.push({
      start: startDate.toISOString(),
      end: Number.isNaN(endDate.getTime()) ? startDate.toISOString() : endDate.toISOString(),
      kwh: roundNumber(usage, 6),
      cost: Number.isFinite(cost) ? roundNumber(cost, 2) : null
    });

    if (indexes.utility >= 0) utilityNames.add(cleanText(columns[indexes.utility]));
    if (indexes.address >= 0) addresses.add(cleanText(columns[indexes.address]));
    if (indexes.rate >= 0) rateSchedules.add(cleanText(columns[indexes.rate]));
    if (indexes.customerClass >= 0) customerClasses.add(cleanText(columns[indexes.customerClass]));
    if (indexes.account >= 0) accountNumbers.add(cleanText(columns[indexes.account]));
  }

  if (intervals.length === 0) {
    throw new Error("CSV file did not yield any usable interval rows.");
  }

  intervals.sort((left, right) => left.start.localeCompare(right.start));

  return {
    intervals,
    utilityProvider: normalizeUtilityProvider([...utilityNames][0]),
    serviceAddress: [...addresses].find(Boolean) || null,
    accountNumberMasked: maskAccountNumber([...accountNumbers][0]),
    rateSchedule: [...rateSchedules].find(Boolean) || null,
    customerClass: [...customerClasses].find(Boolean) || null,
    sourcePath: {
      utility: indexes.utility >= 0 ? headers[indexes.utility] : null,
      usage: headers[indexes.usage],
      cost: indexes.cost >= 0 ? headers[indexes.cost] : null
    }
  };
}

function parseGreenButtonXml(text) {
  const parsed = xmlParser.parse(text);
  const intervals = parseXmlIntervals(parsed);
  if (intervals.length === 0) {
    throw new Error("Green Button XML did not contain any interval usage records.");
  }

  const serviceAddress = detectAddressObject(parsed);
  const rateSchedule = detectFieldText(parsed, /(rate.*schedule|tariff|rate.*plan|rate.*code)/i);
  const customerClass = detectFieldText(parsed, /(customer.*class|service.*class|account.*type)/i);
  const accountNumberMasked = maskAccountNumber(
    detectFieldText(parsed, /(account.*number|customer.*number|service.*account|account.*id)/i)
  );
  const utilityProvider = normalizeUtilityProvider(
    firstNonEmptyText([
      ...deepCollect(parsed, "title").flatMap(asArray),
      detectFieldText(parsed, /(utility|provider|service.*provider|company)/i),
      detectFieldText(parsed, /(author|publisher|published)/i)
    ])
  );
  const explicitTotalCost = detectNumericField(parsed, /(total.*electric.*cost|total.*charge|bill.*amount|amount.*due)/i);

  return {
    intervals,
    utilityProvider,
    serviceAddress,
    accountNumberMasked,
    rateSchedule,
    customerClass,
    explicitTotalCost,
    sourcePath: {
      intervals: "IntervalBlock.IntervalReading",
      provider: "title/utility/provider",
      address: "serviceAddress/premiseAddress",
      rateSchedule: "rateSchedule/tariff",
      customerClass: "customerClass/serviceClass"
    }
  };
}

export function buildSiteEnergyProfile({ siteId, uploadedUtilityFiles, utilityExtractedValues }) {
  const sortedFiles = [...(uploadedUtilityFiles || [])].sort((left, right) =>
    String(left.uploadedAt || "").localeCompare(String(right.uploadedAt || ""))
  );
  const availableFieldIds = [...new Set((utilityExtractedValues || []).map((value) => value.fieldId))].sort();
  const latestUtilityProvider =
    [...(utilityExtractedValues || [])].reverse().find((value) => value.fieldId === "utility_provider")?.value ||
    sortedFiles[sortedFiles.length - 1]?.utilityProvider ||
    null;

  const latestValueForField = (fieldId) => {
    const value = [...(utilityExtractedValues || [])]
      .filter((item) => item.fieldId === fieldId)
      .sort((left, right) => String(left.periodEnd || "").localeCompare(String(right.periodEnd || "")))
      .pop();
    return value?.value ?? null;
  };

  const monthlySummaries = (utilityExtractedValues || [])
    .filter((value) => value.fieldId === "monthly_kwh")
    .map((value) => ({
      periodStart: value.periodStart,
      periodEnd: value.periodEnd,
      kwh: value.value,
      cost:
        (utilityExtractedValues || []).find(
          (candidate) =>
            candidate.fileId === value.fileId &&
            candidate.fieldId === "total_electric_cost" &&
            candidate.periodStart === value.periodStart &&
            candidate.periodEnd === value.periodEnd
        )?.value ?? null
    }))
    .sort((left, right) => String(left.periodStart || "").localeCompare(String(right.periodStart || "")));

  return {
    siteId,
    uploadedFileCount: sortedFiles.length,
    processedFileCount: sortedFiles.filter((file) => file.processingStatus === "processed").length,
    availableFieldIds,
    latestUtilityProvider,
    latestBillingPeriodStart: latestValueForField("billing_period_start"),
    latestBillingPeriodEnd: latestValueForField("billing_period_end"),
    annualKwh: latestValueForField("annual_kwh"),
    annualElectricCost: latestValueForField("annual_electric_cost"),
    averageCostPerKwh: latestValueForField("average_cost_per_kwh"),
    monthlySummaries,
    lastUpdatedAt: sortedFiles[sortedFiles.length - 1]?.processedAt || sortedFiles[sortedFiles.length - 1]?.uploadedAt || null
  };
}

export function evaluateOpportunityBillFieldReadiness({ availableFieldIds, requiredBillFields }) {
  const available = new Set((availableFieldIds || []).filter((fieldId) => billFieldById.has(fieldId)));
  const required = [...new Set((requiredBillFields || []).filter((fieldId) => billFieldById.has(fieldId)))];
  const missingFieldIds = required.filter((fieldId) => !available.has(fieldId));
  const availableRequiredFieldIds = required.filter((fieldId) => available.has(fieldId));

  return {
    availableRequiredFieldIds,
    missingFieldIds,
    isReadyForSavingsEstimation: missingFieldIds.length === 0
  };
}

export function processUtilityDataUpload({
  clientIntakeId,
  fileId,
  originalFilename,
  s3Key,
  siteId,
  sourceType,
  text,
  uploadedAt,
  utilityProvider
}) {
  const safeSourceType = supportedUtilityFileTypes.has(sourceType) ? sourceType : "unknown";
  const detectedUtilityProvider = normalizeUtilityProvider(utilityProvider);

  if (safeSourceType === "utility_pdf") {
    const uploadedUtilityFile = {
      fileId,
      clientIntakeId,
      siteId,
      originalFilename,
      fileType: "utility_pdf",
      utilityProvider: detectedUtilityProvider,
      s3Key,
      processingStatus: "needs_review",
      uploadedAt,
      processedAt: uploadedAt,
      errorMessage: "PDF uploaded successfully; extraction not implemented yet."
    };

    return {
      uploadedUtilityFile,
      utilityExtractedValues: [],
      siteEnergyProfilePatch: null
    };
  }

  if (safeSourceType !== "green_button_xml" && safeSourceType !== "green_button_csv") {
    return {
      uploadedUtilityFile: {
        fileId,
        clientIntakeId,
        siteId,
        originalFilename,
        fileType: "unknown",
        utilityProvider: detectedUtilityProvider,
        s3Key,
        processingStatus: "failed",
        uploadedAt,
        processedAt: uploadedAt,
        errorMessage: "Unsupported utility upload type."
      },
      utilityExtractedValues: [],
      siteEnergyProfilePatch: null
    };
  }

  const parsed =
    safeSourceType === "green_button_csv" ? parseGreenButtonCsv(text) : parseGreenButtonXml(text);
  const aggregates = aggregateIntervals(parsed.intervals);
  const billingPeriodStart = dateOnly(parsed.intervals[0]?.start);
  const billingPeriodEnd = dateOnly(parsed.intervals[parsed.intervals.length - 1]?.end);
  const annualCost = parsed.explicitTotalCost != null ? parsed.explicitTotalCost : aggregates.annualCost;
  const extractedValues = buildExtractedValuesFromAggregates({
    accountNumberMasked: parsed.accountNumberMasked,
    annualCost,
    annualKwh: aggregates.annualKwh,
    billingPeriodEnd,
    billingPeriodStart,
    clientIntakeId,
    customerClass: parsed.customerClass,
    fileId,
    monthly: aggregates.monthly,
    rateSchedule: parsed.rateSchedule,
    serviceAddress: parsed.serviceAddress,
    sourcePath: typeof parsed.sourcePath === "object" ? JSON.stringify(parsed.sourcePath) : parsed.sourcePath,
    sourceType: safeSourceType,
    utilityProvider: normalizeUtilityProvider(parsed.utilityProvider || detectedUtilityProvider)
  });

  const validation = validateExtractedValueFieldIds(extractedValues);
  if (!validation.ok) {
    throw new Error(`Unknown bill field IDs were generated: ${validation.unknownFieldIds.join(", ")}`);
  }

  return {
    uploadedUtilityFile: {
      fileId,
      clientIntakeId,
      siteId,
      originalFilename,
      fileType: safeSourceType,
      utilityProvider: normalizeUtilityProvider(parsed.utilityProvider || detectedUtilityProvider),
      s3Key,
      processingStatus: "processed",
      uploadedAt,
      processedAt: uploadedAt,
      errorMessage: null
    },
    utilityExtractedValues: extractedValues,
    siteEnergyProfilePatch: {
      billingPeriodStart,
      billingPeriodEnd,
      annualKwh: aggregates.annualKwh,
      annualElectricCost: annualCost,
      averageCostPerKwh:
        aggregates.annualKwh && annualCost ? roundNumber(annualCost / aggregates.annualKwh, 6) : null
    }
  };
}
