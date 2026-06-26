import { XMLParser } from "fast-xml-parser";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true,
  trimValues: true
});

const supportedSourceTypes = new Set(["bill_pdf", "bill_image", "green_button_xml", "green_button_csv"]);

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeMonthKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 7);
}

function isoFromEpochSeconds(value) {
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return new Date(parsed * 1000).toISOString();
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

function firstString(values) {
  for (const value of values) {
    const text = cleanText(value);
    if (text) return text;
  }

  return null;
}

function parseEspiIntervals(document) {
  const intervalBlocks = deepCollect(document, "IntervalBlock").flatMap(asArray);
  const readingTypes = deepCollect(document, "ReadingType").flatMap(asArray);
  const usagePoints = deepCollect(document, "UsagePoint").flatMap(asArray);
  const meterReadings = deepCollect(document, "MeterReading").flatMap(asArray);

  const meterIds = [
    ...usagePoints.map((entry) => cleanText(entry?.mRID)),
    ...meterReadings.map((entry) => cleanText(entry?.mRID))
  ].filter(Boolean);

  const utilityName = firstString([
    ...deepCollect(document, "published").flatMap(asArray).map((entry) => cleanText(entry?.title)),
    ...deepCollect(document, "author").flatMap(asArray).map((entry) => cleanText(entry?.name)),
    ...deepCollect(document, "title")
  ]);

  const readingType = readingTypes.find(Boolean) || {};
  const powerOfTenMultiplier = Number.parseInt(String(readingType?.powerOfTenMultiplier ?? "0"), 10) || 0;
  const uom = Number.parseInt(String(readingType?.uom ?? "0"), 10) || 0;
  const unitScale = uom === 72 ? 1 / 1000 : 1;

  const intervals = intervalBlocks
    .flatMap((block) => asArray(block?.IntervalReading))
    .map((reading) => {
      const start = isoFromEpochSeconds(reading?.timePeriod?.start);
      const durationSeconds = Number.parseInt(String(reading?.timePeriod?.duration ?? "0"), 10) || 0;
      const rawValue = Number.parseFloat(String(reading?.value ?? "0"));

      if (!start || !Number.isFinite(rawValue)) {
        return null;
      }

      const end = new Date(new Date(start).getTime() + durationSeconds * 1000).toISOString();
      const kwh = rawValue * Math.pow(10, powerOfTenMultiplier) * unitScale;

      return {
        start,
        end,
        kwh: Number(kwh.toFixed(6))
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.start.localeCompare(right.start));

  const monthlyTotalsMap = new Map();
  for (const interval of intervals) {
    const month = normalizeMonthKey(interval.start);
    if (!month) continue;
    monthlyTotalsMap.set(month, Number(((monthlyTotalsMap.get(month) || 0) + interval.kwh).toFixed(6)));
  }

  return {
    utilityName,
    coverageStart: intervals[0]?.start ?? null,
    coverageEnd: intervals[intervals.length - 1]?.end ?? null,
    accountNumberMasked: null,
    meterIds: [...new Set(meterIds)],
    normalizedUsage: {
      intervals,
      monthlyTotals: [...monthlyTotalsMap.entries()].map(([month, kwh]) => ({ month, kwh, cost: null }))
    },
    rawExtract: {
      format: "green_button_xml",
      intervalCount: intervals.length,
      uom,
      powerOfTenMultiplier
    }
  };
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

function parseGreenButtonCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("CSV file does not contain enough rows to parse energy data.");
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
  const timestampIndex = headers.findIndex((header) => /(start|timestamp|date|interval)/.test(header));
  const kwhIndex = headers.findIndex((header) => /(kwh|usage|consumption|energy)/.test(header));

  if (timestampIndex === -1 || kwhIndex === -1) {
    throw new Error("CSV headers must include a timestamp column and a usage column.");
  }

  const utilityIndex = headers.findIndex((header) => /(utility|provider)/.test(header));
  const meterIndex = headers.findIndex((header) => /(meter|service point|usage point)/.test(header));
  const costIndex = headers.findIndex((header) => /(cost|charge|amount)/.test(header));

  const intervals = [];
  const meterIds = new Set();
  const utilityNames = new Set();
  const monthlyTotalsMap = new Map();

  for (const line of lines.slice(1)) {
    const columns = parseCsvLine(line);
    const start = cleanText(columns[timestampIndex]);
    const kwh = Number.parseFloat(columns[kwhIndex] ?? "");
    const normalizedStart = start ? new Date(start) : null;

    if (!normalizedStart || Number.isNaN(normalizedStart.getTime()) || !Number.isFinite(kwh)) {
      continue;
    }

    const interval = {
      start: normalizedStart.toISOString(),
      end: normalizedStart.toISOString(),
      kwh: Number(kwh.toFixed(6))
    };

    intervals.push(interval);
    const month = normalizeMonthKey(interval.start);
    if (month) {
      const existing = monthlyTotalsMap.get(month) || { kwh: 0, cost: 0 };
      const cost = costIndex >= 0 ? Number.parseFloat(columns[costIndex] ?? "") : Number.NaN;
      monthlyTotalsMap.set(month, {
        kwh: Number((existing.kwh + interval.kwh).toFixed(6)),
        cost: Number.isFinite(cost) ? Number(((existing.cost || 0) + cost).toFixed(2)) : existing.cost
      });
    }

    const meterId = cleanText(columns[meterIndex]);
    if (meterId) {
      meterIds.add(meterId);
    }

    const utility = cleanText(columns[utilityIndex]);
    if (utility) {
      utilityNames.add(utility);
    }
  }

  if (intervals.length === 0) {
    throw new Error("CSV file did not yield any usable interval rows.");
  }

  intervals.sort((left, right) => left.start.localeCompare(right.start));

  return {
    utilityName: [...utilityNames][0] || null,
    coverageStart: intervals[0]?.start ?? null,
    coverageEnd: intervals[intervals.length - 1]?.end ?? null,
    accountNumberMasked: null,
    meterIds: [...meterIds],
    normalizedUsage: {
      intervals,
      monthlyTotals: [...monthlyTotalsMap.entries()].map(([month, summary]) => ({
        month,
        kwh: summary.kwh,
        cost: Number.isFinite(summary.cost) ? summary.cost : null
      }))
    },
    rawExtract: {
      format: "green_button_csv",
      intervalCount: intervals.length
    }
  };
}

export function parseEnergyDataFile({ sourceType, text }) {
  if (!supportedSourceTypes.has(sourceType)) {
    throw new Error(`Unsupported energy data source type: ${sourceType}`);
  }

  if (sourceType === "bill_pdf" || sourceType === "bill_image") {
    return {
      utilityName: null,
      coverageStart: null,
      coverageEnd: null,
      accountNumberMasked: null,
      meterIds: [],
      normalizedUsage: {
        intervals: [],
        monthlyTotals: []
      },
      rawExtract: {
        format: sourceType,
        note: "Stored for later manual review or OCR parsing."
      }
    };
  }

  if (sourceType === "green_button_csv") {
    return parseGreenButtonCsv(text);
  }

  const parsed = xmlParser.parse(text);
  return parseEspiIntervals(parsed);
}
