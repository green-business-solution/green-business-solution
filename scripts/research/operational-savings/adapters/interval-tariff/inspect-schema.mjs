import { createReadStream } from "node:fs";
import { createGunzip } from "node:zlib";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { parseCsvRecords, parseNullableNumber } from "../../lib/csv.mjs";

export const USURDB_ARTIFACT = Object.freeze({
  byteSize: 12218163,
  sha256: "89081ef124080ea322516040dc6b2c1945f9f754eced63f3130d4a8f14947032"
});

export const USURDB_SCHEMA = Object.freeze({
  columnCount: 737,
  fingerprintSha256:
    "fb43f7b46b13eb497982623d6986706c675810e8e039f699a92e399851d7f761",
  recordCount: 58920
});

export const SELECTED_RATE_ID = "6a4584dbab8f09871f06ef7b";

export const REQUIRED_URDB_FIELDS = Object.freeze([
  "label",
  "eiaid",
  "name",
  "startdate",
  "enddate",
  "latest_update",
  "utility",
  "sector",
  "description",
  "servicetype",
  "source",
  "sourceparent",
  "dgrules",
  "peakkwcapacitymin",
  "peakkwcapacitymax",
  "voltagecategory",
  "fixedchargefirstmeter",
  "fixedchargeunits",
  "mincharge",
  "minchargeunits",
  "demandwindow",
  "supersedes",
  "energyratestructure/period0/tier0rate",
  "energyratestructure/period0/tier0adj",
  "energyratestructure/period0/tier0unit",
  "energyweekdayschedule",
  "energyweekendschedule"
]);

const STRUCTURE_PATTERN =
  /^(flatdemandstructure|demandratestructure|energyratestructure)\/period(\d+)\/tier(\d+)(max|rate|adj|unit|sell)$/;

export function validateUrdbHeaders(headers) {
  const missing = REQUIRED_URDB_FIELDS.filter(
    (field) => !headers.includes(field)
  );
  if (missing.length) {
    throw new Error(`MISSING_REQUIRED_COLUMN: ${missing.join(", ")}`);
  }
  if (headers.length !== USURDB_SCHEMA.columnCount) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: expected ${USURDB_SCHEMA.columnCount} columns, received ${headers.length}`
    );
  }
  const fingerprintSha256 = sha256Json(headers);
  if (fingerprintSha256 !== USURDB_SCHEMA.fingerprintSha256) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: expected header fingerprint ${USURDB_SCHEMA.fingerprintSha256}, received ${fingerprintSha256}`
    );
  }
  return {
    format: "GZIP_CSV",
    columnCount: headers.length,
    fingerprintSha256,
    requiredNativeFields: [...REQUIRED_URDB_FIELDS],
    nestedFieldPattern: STRUCTURE_PATTERN.source
  };
}

export function parseSchedule(value, field) {
  let schedule;
  try {
    schedule = JSON.parse(value);
  } catch {
    throw new Error(`INCOMPATIBLE_SCHEDULE: ${field} is not JSON`);
  }
  if (
    !Array.isArray(schedule) ||
    schedule.length !== 12 ||
    schedule.some(
      (month) =>
        !Array.isArray(month) ||
        month.length !== 24 ||
        month.some(
          (period) => !Number.isInteger(period) || period < 0
        )
    )
  ) {
    throw new Error(
      `INCOMPATIBLE_SCHEDULE: ${field} must contain 12 months by 24 hours`
    );
  }
  return schedule;
}

export function extractTierStructures(record) {
  const structures = {
    flatDemand: new Map(),
    demand: new Map(),
    energy: new Map()
  };
  const targetByPrefix = {
    flatdemandstructure: structures.flatDemand,
    demandratestructure: structures.demand,
    energyratestructure: structures.energy
  };
  for (const [field, rawValue] of Object.entries(record)) {
    if (rawValue === "") continue;
    const match = field.match(STRUCTURE_PATTERN);
    if (!match) continue;
    const [, prefix, periodText, tierText, attribute] = match;
    const target = targetByPrefix[prefix];
    const key = `${periodText}:${tierText}`;
    const tier =
      target.get(key) || {
        periodIndex: Number(periodText),
        tierIndex: Number(tierText)
      };
    tier[attribute] =
      attribute === "unit"
        ? rawValue
        : parseNullableNumber(rawValue, field);
    target.set(key, tier);
  }
  return Object.fromEntries(
    Object.entries(structures).map(([name, value]) => [
      name,
      [...value.values()].sort(
        (left, right) =>
          left.periodIndex - right.periodIndex ||
          left.tierIndex - right.tierIndex
      )
    ])
  );
}

export function normalizeSelectedUrdbRecord(record) {
  if (record.label !== SELECTED_RATE_ID) {
    throw new Error(
      `WRONG_SELECTED_RATE: expected ${SELECTED_RATE_ID}, received ${record.label}`
    );
  }
  const weekdaySchedule = parseSchedule(
    record.energyweekdayschedule,
    "energyweekdayschedule"
  );
  const weekendSchedule = parseSchedule(
    record.energyweekendschedule,
    "energyweekendschedule"
  );
  const structures = extractTierStructures(record);
  const energyPeriods = structures.energy.filter(
    (tier) => tier.tierIndex === 0
  );
  if (
    energyPeriods.length !== 4 ||
    energyPeriods.some(
      (tier) =>
        tier.rate === null ||
        tier.rate === undefined ||
        tier.adj === null ||
        tier.adj === undefined ||
        tier.unit !== "kWh"
    )
  ) {
    throw new Error(
      "MISSING_TARIFF_TERM: selected TOU-A record must contain four rate plus adjustment periods in kWh"
    );
  }
  const periodIndexes = new Set([
    ...weekdaySchedule.flat(),
    ...weekendSchedule.flat()
  ]);
  if (
    energyPeriods.some((tier) => !periodIndexes.has(tier.periodIndex))
  ) {
    throw new Error(
      "MISSING_TARIFF_TERM: an energy structure period is absent from both schedules"
    );
  }
  if (
    record.utility !== "San Diego Gas & Electric Co" ||
    record.name !== "TOU-A Secondary (5-20kW)" ||
    record.sector !== "Commercial" ||
    record.servicetype !== "Bundled" ||
    record.voltagecategory !== "Secondary" ||
    record.startdate !== "2026-06-01 00:00:00"
  ) {
    throw new Error(
      "MIXED_OR_UNEXPECTED_TARIFF_RELEASE: selected current SMB identity changed"
    );
  }
  return {
    nativeRateId: record.label,
    eiaId: record.eiaid,
    name: record.name,
    utility: record.utility,
    sector: record.sector,
    description: record.description,
    serviceType: record.servicetype,
    sourceUrl: record.source,
    sourceParentUrl: record.sourceparent,
    distributedGenerationRules: record.dgrules || null,
    startDate: record.startdate.slice(0, 10),
    endDate: record.enddate ? record.enddate.slice(0, 10) : null,
    latestUpdate: record.latest_update,
    voltageCategory: record.voltagecategory,
    peakKwMin: parseNullableNumber(
      record.peakkwcapacitymin,
      "peakkwcapacitymin"
    ),
    peakKwMax: parseNullableNumber(
      record.peakkwcapacitymax,
      "peakkwcapacitymax"
    ),
    fixedCharge: parseNullableNumber(
      record.fixedchargefirstmeter,
      "fixedchargefirstmeter"
    ),
    fixedChargeUnit: record.fixedchargeunits || null,
    minimumCharge: parseNullableNumber(record.mincharge, "mincharge"),
    minimumChargeUnit: record.minchargeunits || null,
    demandWindow: record.demandwindow || null,
    supersedesNativeRateId: record.supersedes || null,
    weekdaySchedule,
    weekendSchedule,
    structures
  };
}

export async function inspectUrdbArtifact(artifactPath) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(artifactPath, USURDB_ARTIFACT);
  const input = createReadStream(artifactPath).pipe(createGunzip());
  let schema;
  let selectedRecord = null;
  let recordsRead = 0;
  let currentCaliforniaCommercialCount = 0;
  const seenLabels = new Set();
  for await (const record of parseCsvRecords(input, {
    requiredHeaders: REQUIRED_URDB_FIELDS
  })) {
    recordsRead += 1;
    if (!schema) schema = validateUrdbHeaders(Object.keys(record));
    if (!record.label || seenLabels.has(record.label)) {
      throw new Error(
        `DUPLICATE_OR_MISSING_RATE_ID: row ${recordsRead} label ${record.label}`
      );
    }
    seenLabels.add(record.label);
    const activeOnProofDate =
      record.startdate.slice(0, 10) <= "2026-07-24" &&
      (!record.enddate || record.enddate.slice(0, 10) >= "2026-07-24");
    if (
      activeOnProofDate &&
      record.sector === "Commercial" &&
      /(?:California|Pacific Gas|San Diego Gas|Southern California Edison|Los Angeles Department)/i.test(
        record.utility
      )
    ) {
      currentCaliforniaCommercialCount += 1;
    }
    if (record.label === SELECTED_RATE_ID) {
      if (selectedRecord) {
        throw new Error(
          `DUPLICATE_SOURCE_ID: selected rate ${SELECTED_RATE_ID}`
        );
      }
      selectedRecord = structuredClone(record);
    }
  }
  if (recordsRead !== USURDB_SCHEMA.recordCount) {
    throw new Error(
      `SOURCE_RECORD_COUNT_DRIFT: expected ${USURDB_SCHEMA.recordCount}, received ${recordsRead}`
    );
  }
  if (!selectedRecord) {
    throw new Error(`NO_EXACT_MATCH: selected rate ${SELECTED_RATE_ID}`);
  }
  return {
    artifact,
    schema: {
      ...schema,
      recordCount: recordsRead,
      selectedNativeRateId: SELECTED_RATE_ID
    },
    recordsRead,
    currentCaliforniaCommercialCount,
    selectedRecord,
    selectedTariff: normalizeSelectedUrdbRecord(selectedRecord)
  };
}
