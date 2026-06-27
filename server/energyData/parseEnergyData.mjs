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
export const supportedUtilityCategories = new Set(["electric", "gas", "water_sewer", "waste", "unknown"]);
export const utilityUploadCategoryOptions = new Set([...supportedUtilityCategories, "auto_detect"]);

const pgeAliases = new Set(["pg&e", "pge", "pacific gas and electric", "pacific gas & electric", "pacific gas and electric company"]);
const fieldTypeById = new Map(billFieldDictionary.map((field) => [field.id, field.bill_type]));
const utilityCategoryConfigs = {
  electric: {
    annualCostFieldId: "annual_electric_cost",
    annualUsageFieldId: "annual_kwh",
    averageUnitCostFieldId: "average_cost_per_kwh",
    costUnit: "USD",
    monthlyUsageFieldId: "monthly_kwh",
    providerFieldId: "utility_provider",
    rateScheduleFieldId: "rate_schedule",
    serviceClassFieldId: "customer_class",
    totalCostFieldId: "total_electric_cost",
    usageKeys: ["kwh", "usage"],
    usageLabel: "kWh",
    usageUnit: "kWh"
  },
  gas: {
    annualCostFieldId: "annual_gas_cost",
    annualUsageFieldId: "annual_therms",
    averageUnitCostFieldId: "average_cost_per_therm",
    costUnit: "USD",
    monthlyUsageFieldId: "monthly_therms",
    providerFieldId: "gas_utility_provider",
    rateScheduleFieldId: "gas_rate_schedule",
    serviceClassFieldId: null,
    totalCostFieldId: "total_gas_cost",
    usageKeys: ["therms", "usage"],
    usageLabel: "Therms",
    usageUnit: "therms"
  },
  water_sewer: {
    annualCostFieldId: "annual_water_cost",
    annualUsageFieldId: "annual_water_use",
    averageUnitCostFieldId: null,
    costUnit: "USD",
    monthlyUsageFieldId: "monthly_water_use",
    providerFieldId: "water_provider",
    rateScheduleFieldId: null,
    serviceClassFieldId: null,
    totalCostFieldId: "total_water_cost",
    usageKeys: ["usage"],
    usageLabel: "Water use",
    usageUnit: "gallons or CCF",
    usageUnitFieldId: "water_unit"
  },
  waste: {
    annualCostFieldId: "total_waste_cost",
    annualUsageFieldId: null,
    averageUnitCostFieldId: null,
    costUnit: "USD",
    monthlyUsageFieldId: null,
    providerFieldId: "waste_hauler",
    rateScheduleFieldId: null,
    serviceClassFieldId: null,
    totalCostFieldId: "total_waste_cost",
    usageKeys: [],
    usageLabel: "Waste cost",
    usageUnit: "USD"
  }
};
const utilityCategoryKeywordMatchers = {
  electric: /(kwh|kilowatt|electric|demand|tou|generation|delivery)/i,
  gas: /(therm|natural gas|gas usage|gas service|procurement)/i,
  water_sewer: /(water|sewer|ccf|gallon|stormwater|irrigation)/i,
  waste: /(waste|trash|recycling|recycle|organics|compost|hauler|landfill|bin size|pickup)/i
};
const wasteDirectFieldMatchers = {
  waste_hauler: /(waste hauler|hauler|provider)/i,
  landfill_service_cost: /(landfill|trash)/i,
  recycling_service_cost: /(recycling)/i,
  organics_service_cost: /(organics|compost)/i,
  pickup_frequency: /(pickup|service frequency)/i,
  bin_size: /(bin size|container size|cart size)/i,
  contamination_fees: /(contamination)/i,
  overage_fees: /(overage|overflow|extra pickup)/i,
  total_waste_cost: /(total waste|total charges|amount due|invoice total)/i,
  billing_period_start: /(billing.*start|service.*from|period.*start)/i,
  billing_period_end: /(billing.*end|service.*to|period.*end)/i,
  service_address: /(service address|premise|address)/i,
  account_number_masked: /(account|customer number)/i
};

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

function normalizeUtilityCategory(value) {
  const text = cleanText(value).toLowerCase();
  if (supportedUtilityCategories.has(text)) {
    return text;
  }
  return "unknown";
}

function normalizeRequestedUtilityCategory(value) {
  const text = cleanText(value).toLowerCase();
  if (utilityUploadCategoryOptions.has(text)) {
    return text;
  }
  return "auto_detect";
}

function utilityCategoryForFieldId(fieldId) {
  return fieldTypeById.get(fieldId) || "unknown";
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

function aggregateIntervals(intervals, usageKey = "usage") {
  const monthMap = new Map();

  for (const interval of intervals) {
    const month = normalizeMonthKey(interval.start);
    if (!month) continue;
    const current = monthMap.get(month) || { usage: 0, cost: 0 };
    monthMap.set(month, {
      usage: current.usage + (interval[usageKey] || 0),
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
        usage: roundNumber(summary.usage, 6),
        cost: Number.isFinite(summary.cost) && summary.cost > 0 ? roundNumber(summary.cost, 2) : null
      };
    })
    .sort((left, right) => left.month.localeCompare(right.month));

  return {
    monthly,
    annualUsage: roundNumber(monthly.reduce((sum, item) => sum + (item.usage || 0), 0), 6),
    annualCost: roundNumber(monthly.reduce((sum, item) => sum + (item.cost || 0), 0), 2)
  };
}

function pushOptionalExtractedValue(extractedValues, options) {
  const { fieldId, value } = options;
  if (!fieldId || value == null || value === "") {
    return;
  }

  extractedValues.push(buildExtractedValue(options));
}

function buildExtractedValuesFromAggregates({
  accountNumberMasked,
  annualCost,
  annualUsage,
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
  utilityCategory,
  utilityProvider,
  waterUnit = null,
  sewerCost = null,
  annualSewerCost = null,
  stormwaterFee = null,
  meterSize = null,
  irrigationMeterPresent = null
}) {
  const categoryConfig = utilityCategoryConfigs[utilityCategory];
  const extractedValues = [];

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "high",
    fieldId: categoryConfig?.providerFieldId,
    fileId,
    sourcePath,
    sourceText: utilityProvider,
    sourceType,
    value: utilityProvider
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: "service_address",
    fileId,
    sourcePath,
    sourceText: serviceAddress,
    sourceType,
    value: serviceAddress
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: "account_number_masked",
    fileId,
    sourcePath,
    sourceText: accountNumberMasked,
    sourceType,
    value: accountNumberMasked
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "high",
    fieldId: "billing_period_start",
    fileId,
    sourcePath,
    sourceText: billingPeriodStart,
    sourceType,
    value: billingPeriodStart
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "high",
    fieldId: "billing_period_end",
    fileId,
    sourcePath,
    sourceText: billingPeriodEnd,
    sourceType,
    value: billingPeriodEnd
  });

  for (const month of monthly || []) {
    pushOptionalExtractedValue(extractedValues, {
      clientIntakeId,
      confidence: "high",
      fieldId: categoryConfig?.monthlyUsageFieldId,
      fileId,
      periodEnd: month.periodEnd,
      periodStart: month.periodStart,
      sourcePath,
      sourceType,
      unit: waterUnit || categoryConfig?.usageUnit || null,
      value: month.usage
    });
  }

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: (monthly || []).length >= 11 ? "high" : "medium",
    fieldId: categoryConfig?.annualUsageFieldId,
    fileId,
    periodEnd: billingPeriodEnd,
    periodStart: billingPeriodStart,
    sourcePath,
    sourceType,
    unit: waterUnit || categoryConfig?.usageUnit || null,
    value: annualUsage
  });

  if ((monthly || []).length === 1 && monthly[0].cost != null) {
    pushOptionalExtractedValue(extractedValues, {
      clientIntakeId,
      confidence: "medium",
      fieldId: categoryConfig?.totalCostFieldId,
      fileId,
      periodEnd: monthly[0].periodEnd,
      periodStart: monthly[0].periodStart,
      sourcePath,
      sourceType,
      unit: categoryConfig?.costUnit || "USD",
      value: monthly[0].cost
    });
  }

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: (monthly || []).length >= 11 ? "high" : "medium",
    fieldId: categoryConfig?.annualCostFieldId,
    fileId,
    periodEnd: billingPeriodEnd,
    periodStart: billingPeriodStart,
    sourcePath,
    sourceType,
    unit: categoryConfig?.costUnit || "USD",
    value: annualCost != null && annualCost > 0 ? annualCost : null
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: categoryConfig?.averageUnitCostFieldId,
    fileId,
    periodEnd: billingPeriodEnd,
    periodStart: billingPeriodStart,
    sourcePath,
    sourceType,
    unit:
      utilityCategory === "gas"
        ? "USD/therm"
        : utilityCategory === "electric"
          ? "USD/kWh"
          : null,
    value: annualUsage != null && annualUsage > 0 && annualCost != null && annualCost > 0 ? roundNumber(annualCost / annualUsage, 6) : null
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: categoryConfig?.rateScheduleFieldId,
    fileId,
    sourcePath,
    sourceText: rateSchedule,
    sourceType,
    value: rateSchedule
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: categoryConfig?.serviceClassFieldId,
    fileId,
    sourcePath,
    sourceText: customerClass,
    sourceType,
    value: customerClass
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: categoryConfig?.usageUnitFieldId || null,
    fileId,
    sourcePath,
    sourceText: waterUnit,
    sourceType,
    value: waterUnit
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: "sewer_cost",
    fileId,
    periodEnd: billingPeriodEnd,
    periodStart: billingPeriodStart,
    sourcePath,
    sourceType,
    unit: "USD",
    value: sewerCost
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: "annual_sewer_cost",
    fileId,
    periodEnd: billingPeriodEnd,
    periodStart: billingPeriodStart,
    sourcePath,
    sourceType,
    unit: "USD",
    value: annualSewerCost
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "low",
    fieldId: "stormwater_fee",
    fileId,
    periodEnd: billingPeriodEnd,
    periodStart: billingPeriodStart,
    sourcePath,
    sourceType,
    unit: "USD",
    value: stormwaterFee
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: "meter_size",
    fileId,
    sourcePath,
    sourceText: meterSize,
    sourceType,
    unit: "inches",
    value: meterSize
  });

  pushOptionalExtractedValue(extractedValues, {
    clientIntakeId,
    confidence: "medium",
    fieldId: "irrigation_meter_present",
    fileId,
    sourcePath,
    sourceText: irrigationMeterPresent == null ? null : String(Boolean(irrigationMeterPresent)),
    sourceType,
    unit: "boolean",
    value: irrigationMeterPresent == null ? null : Boolean(irrigationMeterPresent)
  });

  return extractedValues;
}

function parseXmlIntervals(document, utilityCategory = "electric") {
  const intervalBlocks = deepCollect(document, "IntervalBlock").flatMap(asArray);
  const readingTypes = deepCollect(document, "ReadingType").flatMap(asArray);
  const readingType = readingTypes.find(Boolean) || {};
  const powerOfTenMultiplier = Number.parseInt(String(readingType?.powerOfTenMultiplier ?? "0"), 10) || 0;
  const uom = Number.parseInt(String(readingType?.uom ?? "0"), 10) || 0;
  const unitScale = uom === 72 ? 1 / 1000 : 1;
  const usageKey = utilityCategory === "gas" ? "therms" : utilityCategory === "water_sewer" ? "usage" : "kwh";

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
        [usageKey]: roundNumber(rawValue * Math.pow(10, powerOfTenMultiplier) * unitScale, 6),
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
    totalCost: lookup(/(total.*cost|total.*charge|amount due|invoice total)/i),
    utility: lookup(/(utility|provider|company)/i),
    address: lookup(/(service address|premise|address)/i),
    account: lookup(/(account|service account|customer number)/i),
    rate: lookup(/(rate|tariff)/i),
    customerClass: lookup(/(customer class|service class|account type)/i),
    unit: lookup(/(^unit$|uom|units?)/i),
    sewerCost: lookup(/(sewer)/i),
    annualSewerCost: lookup(/(annual sewer)/i),
    stormwaterFee: lookup(/(stormwater|drainage)/i),
    meterSize: lookup(/(meter size)/i),
    irrigationMeterPresent: lookup(/(irrigation meter)/i),
    landfillCost: lookup(/(landfill|trash)/i),
    recyclingCost: lookup(/(recycling)/i),
    organicsCost: lookup(/(organics|compost)/i),
    pickupFrequency: lookup(/(pickup|service frequency)/i),
    binSize: lookup(/(bin size|container size|cart size)/i),
    contaminationFees: lookup(/(contamination)/i),
    overageFees: lookup(/(overage|overflow|extra pickup)/i)
  };
}

function detectUtilityCategory({ sourceType, utilityCategory, text, utilityProvider = null, fileName = "" }) {
  const requestedCategory = normalizeRequestedUtilityCategory(utilityCategory);
  if (requestedCategory !== "auto_detect") {
    return normalizeUtilityCategory(requestedCategory);
  }

  const haystack = [fileName, utilityProvider, text.slice(0, 4000)].filter(Boolean).join("\n");
  if (sourceType === "utility_pdf") {
    const matched = Object.entries(utilityCategoryKeywordMatchers).find(([, matcher]) => matcher.test(haystack));
    return matched?.[0] || "unknown";
  }

  if (sourceType === "green_button_xml") {
    const lower = haystack.toLowerCase();
    if (/therm|gas/.test(lower)) return "gas";
    if (/water|sewer|gallon|ccf/.test(lower)) return "water_sewer";
    return "electric";
  }

  const matched = Object.entries(utilityCategoryKeywordMatchers).find(([, matcher]) => matcher.test(haystack));
  return matched?.[0] || "electric";
}

function parseUtilityCsv(text, utilityCategory) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("CSV file does not contain enough rows to parse energy data.");
  }

  const headers = parseCsvLine(lines[0]);
  const indexes = detectCsvIndexes(headers);
  const utilityNames = new Set();
  const addresses = new Set();
  const rateSchedules = new Set();
  const customerClasses = new Set();
  const accountNumbers = new Set();
  const unitValues = new Set();
  const usageKey =
    utilityCategory === "gas" ? "therms" : utilityCategory === "water_sewer" ? "usage" : "kwh";
  const categoryConfig = utilityCategoryConfigs[utilityCategory];

  if (utilityCategory === "waste") {
    const summary = {};

    for (const line of lines.slice(1)) {
      const columns = parseCsvLine(line);
      for (const [fieldId, matcher] of Object.entries(wasteDirectFieldMatchers)) {
        const columnIndex = headers.findIndex((header) => matcher.test(header));
        if (columnIndex === -1) continue;
        const rawValue = cleanText(columns[columnIndex]);
        if (!rawValue) continue;

        if (fieldId === "account_number_masked") {
          summary[fieldId] = maskAccountNumber(rawValue);
        } else if (fieldId === "billing_period_start" || fieldId === "billing_period_end") {
          summary[fieldId] = dateOnly(rawValue) || rawValue;
        } else if (billFieldById.get(fieldId)?.unit === "USD") {
          const numeric = Number.parseFloat(rawValue.replace(/[$,]/g, ""));
          summary[fieldId] = Number.isFinite(numeric) ? roundNumber(numeric, 2) : rawValue;
        } else {
          summary[fieldId] = rawValue;
        }
      }
    }

    if (Object.keys(summary).length === 0) {
      throw new Error("CSV file did not contain recognizable waste billing columns.");
    }

    return {
      billingPeriodEnd: summary.billing_period_end || null,
      billingPeriodStart: summary.billing_period_start || null,
      directValues: summary,
      intervals: [],
      sourcePath: { headers }
    };
  }

  if (indexes.start === -1 || indexes.usage === -1) {
    throw new Error("CSV headers must include a timestamp/date column and a usage column.");
  }

  const intervals = [];
  let annualSewerCost = null;
  let sewerCost = null;
  let stormwaterFee = null;
  let meterSize = null;
  let irrigationMeterPresent = null;

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
      [usageKey]: roundNumber(usage, 6),
      cost: Number.isFinite(cost) ? roundNumber(cost, 2) : null
    });

    if (indexes.utility >= 0) utilityNames.add(cleanText(columns[indexes.utility]));
    if (indexes.address >= 0) addresses.add(cleanText(columns[indexes.address]));
    if (indexes.rate >= 0) rateSchedules.add(cleanText(columns[indexes.rate]));
    if (indexes.customerClass >= 0) customerClasses.add(cleanText(columns[indexes.customerClass]));
    if (indexes.account >= 0) accountNumbers.add(cleanText(columns[indexes.account]));
    if (indexes.unit >= 0) unitValues.add(cleanText(columns[indexes.unit]));
    if (indexes.sewerCost >= 0) {
      const value = Number.parseFloat(cleanText(columns[indexes.sewerCost]).replace(/[$,]/g, ""));
      if (Number.isFinite(value)) sewerCost = roundNumber(value, 2);
    }
    if (indexes.annualSewerCost >= 0) {
      const value = Number.parseFloat(cleanText(columns[indexes.annualSewerCost]).replace(/[$,]/g, ""));
      if (Number.isFinite(value)) annualSewerCost = roundNumber(value, 2);
    }
    if (indexes.stormwaterFee >= 0) {
      const value = Number.parseFloat(cleanText(columns[indexes.stormwaterFee]).replace(/[$,]/g, ""));
      if (Number.isFinite(value)) stormwaterFee = roundNumber(value, 2);
    }
    if (indexes.meterSize >= 0) meterSize = cleanText(columns[indexes.meterSize]) || meterSize;
    if (indexes.irrigationMeterPresent >= 0) {
      const raw = cleanText(columns[indexes.irrigationMeterPresent]).toLowerCase();
      if (raw) irrigationMeterPresent = ["true", "yes", "y", "1"].includes(raw);
    }
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
    rateSchedule: categoryConfig?.rateScheduleFieldId ? [...rateSchedules].find(Boolean) || null : null,
    customerClass: [...customerClasses].find(Boolean) || null,
    waterUnit: utilityCategory === "water_sewer" ? [...unitValues].find(Boolean) || null : null,
    sewerCost,
    annualSewerCost,
    stormwaterFee,
    meterSize,
    irrigationMeterPresent,
    sourcePath: {
      utility: indexes.utility >= 0 ? headers[indexes.utility] : null,
      usage: headers[indexes.usage],
      cost: indexes.cost >= 0 ? headers[indexes.cost] : null
    }
  };
}

function parseGreenButtonXml(text, utilityCategory) {
  const parsed = xmlParser.parse(text);
  const intervals = parseXmlIntervals(parsed, utilityCategory);
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
    waterUnit: utilityCategory === "water_sewer" ? detectFieldText(parsed, /(ccf|gallons|water.*unit|units)/i) : null,
    sourcePath: {
      intervals: "IntervalBlock.IntervalReading",
      provider: "title/utility/provider",
      address: "serviceAddress/premiseAddress",
      rateSchedule: "rateSchedule/tariff",
      customerClass: "customerClass/serviceClass"
    }
  };
}

function buildDirectExtractedValues({
  clientIntakeId,
  fileId,
  sourcePath,
  sourceType,
  values
}) {
  const extractedValues = [];

  for (const [fieldId, rawValue] of Object.entries(values || {})) {
    if (!billFieldById.has(fieldId) || rawValue == null || rawValue === "") {
      continue;
    }

    const metadata = billFieldById.get(fieldId);
    let value = rawValue;
    if (fieldId === "account_number_masked") {
      value = maskAccountNumber(rawValue);
    }

    if (value == null || value === "") {
      continue;
    }

    extractedValues.push(
      buildExtractedValue({
        clientIntakeId,
        confidence: metadata?.extraction_priority === "critical" ? "high" : "medium",
        fieldId,
        fileId,
        periodStart: fieldId === "billing_period_start" ? value : values.billing_period_start || null,
        periodEnd: fieldId === "billing_period_end" ? value : values.billing_period_end || null,
        sourcePath,
        sourceText: typeof value === "string" ? value : null,
        sourceType,
        unit: metadata?.unit || null,
        value
      })
    );
  }

  return extractedValues;
}

export function buildSiteEnergyProfile({ siteId, uploadedUtilityFiles, utilityExtractedValues }) {
  const sortedFiles = [...(uploadedUtilityFiles || [])].sort((left, right) =>
    String(left.uploadedAt || "").localeCompare(String(right.uploadedAt || ""))
  );
  const availableFieldIds = [...new Set((utilityExtractedValues || []).map((value) => value.fieldId))].sort();
  const latestUtilityProvider =
    [...(utilityExtractedValues || [])]
      .reverse()
      .find((value) => ["utility_provider", "gas_utility_provider", "water_provider", "waste_hauler"].includes(value.fieldId))
      ?.value ||
    sortedFiles[sortedFiles.length - 1]?.utilityProvider ||
    null;

  const latestValueForField = (fieldId, values = utilityExtractedValues || []) => {
    const value = [...(values || [])]
      .filter((item) => item.fieldId === fieldId)
      .sort((left, right) => String(left.periodEnd || "").localeCompare(String(right.periodEnd || "")))
      .pop();
    return value?.value ?? null;
  };

  const buildCategorySummary = (utilityCategory) => {
    const categoryFieldIds = availableFieldIds.filter((fieldId) => utilityCategoryForFieldId(fieldId) === utilityCategory);
    const categoryValues = (utilityExtractedValues || []).filter((value) => utilityCategoryForFieldId(value.fieldId) === utilityCategory);
    const categoryFiles = sortedFiles.filter((file) => normalizeUtilityCategory(file.utilityCategory) === utilityCategory);
    const categoryConfig = utilityCategoryConfigs[utilityCategory];
    const monthlySummaries = categoryConfig?.monthlyUsageFieldId
      ? categoryValues
          .filter((value) => value.fieldId === categoryConfig.monthlyUsageFieldId)
          .map((value) => ({
            periodStart: value.periodStart,
            periodEnd: value.periodEnd,
            usage: value.value,
            unit: value.unit || categoryConfig.usageUnit || null,
            cost:
              categoryConfig.totalCostFieldId
                ? categoryValues.find(
                    (candidate) =>
                      candidate.fileId === value.fileId &&
                      candidate.fieldId === categoryConfig.totalCostFieldId &&
                      candidate.periodStart === value.periodStart &&
                      candidate.periodEnd === value.periodEnd
                  )?.value ?? null
                : null
          }))
          .sort((left, right) => String(left.periodStart || "").localeCompare(String(right.periodStart || "")))
      : [];

    return {
      utilityCategory,
      uploadedFileCount: categoryFiles.length,
      processedFileCount: categoryFiles.filter((file) => file.processingStatus === "processed").length,
      availableFieldIds: categoryFieldIds,
      latestUtilityProvider:
        [...categoryValues].reverse().find((value) => value.fieldId === categoryConfig?.providerFieldId)?.value ||
        categoryFiles[categoryFiles.length - 1]?.utilityProvider ||
        null,
      latestBillingPeriodStart: latestValueForField("billing_period_start", categoryValues),
      latestBillingPeriodEnd: latestValueForField("billing_period_end", categoryValues),
      annualUsage: categoryConfig?.annualUsageFieldId ? latestValueForField(categoryConfig.annualUsageFieldId, categoryValues) : null,
      annualCost: categoryConfig?.annualCostFieldId ? latestValueForField(categoryConfig.annualCostFieldId, categoryValues) : null,
      averageUnitCost: categoryConfig?.averageUnitCostFieldId ? latestValueForField(categoryConfig.averageUnitCostFieldId, categoryValues) : null,
      usageUnit:
        utilityCategory === "water_sewer"
          ? latestValueForField("water_unit", categoryValues) || categoryConfig?.usageUnit || null
          : categoryConfig?.usageUnit || null,
      monthlySummaries,
      lastUpdatedAt:
        categoryFiles[categoryFiles.length - 1]?.processedAt ||
        categoryFiles[categoryFiles.length - 1]?.uploadedAt ||
        null
    };
  };

  const utilitySummaries = [...supportedUtilityCategories]
    .filter((utilityCategory) => utilityCategory !== "unknown")
    .map((utilityCategory) => buildCategorySummary(utilityCategory))
    .filter((summary) => summary.uploadedFileCount > 0 || summary.availableFieldIds.length > 0);

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
    utilitySummaries,
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
  utilityCategory,
  utilityProvider
}) {
  const safeSourceType = supportedUtilityFileTypes.has(sourceType) ? sourceType : "unknown";
  const detectedUtilityProvider = normalizeUtilityProvider(utilityProvider);
  const detectedUtilityCategory = detectUtilityCategory({
    sourceType: safeSourceType,
    utilityCategory,
    text,
    utilityProvider: detectedUtilityProvider,
    fileName: originalFilename
  });

  if (safeSourceType === "utility_pdf") {
    const uploadedUtilityFile = {
      fileId,
      clientIntakeId,
      siteId,
      originalFilename,
      fileType: "utility_pdf",
      utilityCategory: detectedUtilityCategory,
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
        utilityCategory: detectedUtilityCategory,
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
    safeSourceType === "green_button_csv"
      ? parseUtilityCsv(text, detectedUtilityCategory)
      : parseGreenButtonXml(text, detectedUtilityCategory);
  const usageKey =
    detectedUtilityCategory === "gas" ? "therms" : detectedUtilityCategory === "water_sewer" ? "usage" : "kwh";
  const aggregates = aggregateIntervals(parsed.intervals, usageKey);
  const billingPeriodStart = parsed.billingPeriodStart || dateOnly(parsed.intervals[0]?.start);
  const billingPeriodEnd = parsed.billingPeriodEnd || dateOnly(parsed.intervals[parsed.intervals.length - 1]?.end);
  const annualCost = parsed.explicitTotalCost != null ? parsed.explicitTotalCost : aggregates.annualCost;
  const sourcePath = typeof parsed.sourcePath === "object" ? JSON.stringify(parsed.sourcePath) : parsed.sourcePath;
  const extractedValues =
    detectedUtilityCategory === "waste"
      ? buildDirectExtractedValues({
          clientIntakeId,
          fileId,
          sourcePath,
          sourceType: safeSourceType,
          values: parsed.directValues
        })
      : buildExtractedValuesFromAggregates({
          accountNumberMasked: parsed.accountNumberMasked,
          annualCost,
          annualSewerCost: parsed.annualSewerCost || null,
          annualUsage: aggregates.annualUsage,
          billingPeriodEnd,
          billingPeriodStart,
          clientIntakeId,
          customerClass: parsed.customerClass,
          fileId,
          irrigationMeterPresent: parsed.irrigationMeterPresent ?? null,
          meterSize: parsed.meterSize || null,
          monthly: aggregates.monthly,
          rateSchedule: parsed.rateSchedule,
          serviceAddress: parsed.serviceAddress,
          sewerCost: parsed.sewerCost || null,
          sourcePath,
          sourceType: safeSourceType,
          stormwaterFee: parsed.stormwaterFee || null,
          utilityCategory: detectedUtilityCategory,
          utilityProvider: normalizeUtilityProvider(parsed.utilityProvider || detectedUtilityProvider),
          waterUnit: parsed.waterUnit || null
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
      utilityCategory: detectedUtilityCategory,
      utilityProvider: normalizeUtilityProvider(parsed.utilityProvider || detectedUtilityProvider),
      s3Key,
      processingStatus: "processed",
      uploadedAt,
      processedAt: uploadedAt,
      errorMessage: null
    },
    utilityExtractedValues: extractedValues,
    siteEnergyProfilePatch: {
      utilityCategory: detectedUtilityCategory,
      billingPeriodStart,
      billingPeriodEnd,
      annualUsage: aggregates.annualUsage,
      annualCost,
      averageCostPerKwh:
        aggregates.annualUsage && annualCost ? roundNumber(annualCost / aggregates.annualUsage, 6) : null
    }
  };
}
