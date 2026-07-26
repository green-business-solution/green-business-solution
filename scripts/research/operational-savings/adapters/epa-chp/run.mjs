import { readFile } from "node:fs/promises";

import parsePdf from "pdf-parse";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";

export const EPA_CHP_ARTIFACT = Object.freeze({
  byteSize: 4135792,
  sha256: "eccea396f5bcc5c86c16a75b8d41b1a4a7b43df064b7363ee7054d53063f0d09"
});

export const EPA_BIOMASS_CHP_ARTIFACT = Object.freeze({
  byteSize: 5817000,
  sha256: "fbb7af3824eaf83a01ecb97aa070cc250fcdc3cb9702cc25f72061720ce5c959"
});

const SOURCE_URL =
  "https://www.epa.gov/chp/catalog-chp-technologies";
const SOURCE_ID = "source:epa-chp-catalog-2017";
const BIOMASS_SOURCE_ID =
  "source:epa-biomass-chp-catalog-v1.1";
const RELEASE_ID = "release:epa-chp-catalog:2017-09";
const SCHEMA_ID = "schema:epa-chp-catalog:tables-2-2-5-2-and-6-3";
const ARTIFACT_ID = "artifact:epa-chp-catalog:2017-09";
const BIOMASS_ARTIFACT_URL =
  "https://www.epa.gov/sites/default/files/2015-07/documents/biomass_combined_heat_and_power_catalog_of_technologies_v.1.1.pdf";
const BIOMASS_RELEASE_ID = "release:epa-biomass-chp-catalog:v1.1";
const BIOMASS_SCHEMA_ID =
  "schema:epa-biomass-chp-catalog:table-7-15";
const BIOMASS_ARTIFACT_ID =
  "artifact:epa-biomass-chp-catalog:v1.1";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/epa-chp/run.mjs";

function identitySlug(value, label) {
  const slug = String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
  if (!slug) {
    throw new Error(
      `INVALID_RELEASE_SCOPED_EPA_CHP_ID_INPUT: ${label}`
    );
  }
  return slug;
}

function requireReleaseId(releaseId) {
  if (typeof releaseId !== "string" || !releaseId) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_EPA_CHP_ID_INPUT: releaseId"
    );
  }
  return releaseId;
}

export function epaChpCatalogPerformanceId(
  record,
  releaseId = RELEASE_ID
) {
  if (!Number.isInteger(record?.system) || record.system <= 0) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_EPA_CHP_ID_INPUT: system"
    );
  }
  return [
    "epa-chp",
    requireReleaseId(releaseId),
    identitySlug(record.sourceTable, "sourceTable"),
    `system-${record.system}`
  ].join(":");
}

export function epaBiomassChpPerformanceId(
  record,
  releaseId = BIOMASS_RELEASE_ID
) {
  return [
    "epa-biomass-chp",
    requireReleaseId(releaseId),
    identitySlug(record?.systemName, "systemName")
  ].join(":");
}

function tableFragment(text, start, end) {
  let cursor = -1;
  let startIndex = -1;
  while ((cursor = text.indexOf(start, cursor + 1)) >= 0) {
    const nearby = text.slice(cursor + start.length, cursor + start.length + 220);
    if (!/\.{5,}/.test(nearby) && /\bSystem\b/.test(nearby)) {
      startIndex = cursor;
      break;
    }
  }
  if (startIndex < 0) throw new Error(`SOURCE_SCHEMA_DRIFT: missing ${start}`);
  const endIndex = text.indexOf(end, startIndex);
  if (endIndex < 0) throw new Error(`SOURCE_SCHEMA_DRIFT: missing ${end}`);
  return text.slice(startIndex, endIndex);
}

function numericRow(fragment, label, expectedCount, {
  percent = false,
  continuationLines = 0,
  skipLeading = 0
} = {}) {
  const lines = fragment.split(/\r?\n/);
  const lineIndex = lines.findIndex((candidate) => candidate.startsWith(label));
  if (lineIndex < 0) throw new Error(`SOURCE_SCHEMA_DRIFT: missing row ${label}`);
  const suffix = [
    lines[lineIndex].slice(label.length),
    ...lines.slice(lineIndex + 1, lineIndex + 1 + continuationLines)
  ].join(" ");
  const tokens = suffix.match(/-?\d[\d,]*(?:\.\d+)?%?/g) ?? [];
  const selected = tokens.slice(skipLeading, skipLeading + expectedCount);
  if (selected.length !== expectedCount) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${label} has ${selected.length} values, expected ${expectedCount}`
    );
  }
  return selected.map((token) => {
    const value = Number(token.replaceAll(",", "").replace("%", ""));
    return percent ? value / 100 : value;
  });
}

function textRow(fragment, label, expectedValues) {
  const line = fragment
    .split(/\r?\n/)
    .find((candidate) => candidate.startsWith(label));
  if (!line) throw new Error(`SOURCE_SCHEMA_DRIFT: missing row ${label}`);
  const values = line.slice(label.length).trim().split(/\s+/);
  if (
    values.length !== expectedValues.length ||
    values.some((value, index) => value !== expectedValues[index])
  ) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${label} expected ${expectedValues.join(", ")}`
    );
  }
  return values;
}

export function parseChpCatalogText(text) {
  const gas = tableFragment(
    text,
    "Table 2-2. Gas Spark Ignition Engine CHP - Typical Performance Parameters",
    "2.4.1 Part Load Performance"
  );
  const micro = tableFragment(
    text,
    "Table 5-2. Microturbine Cost and Performance Characteristics",
    "5.4.1 Part-Load Performance"
  );
  const fuelCell = tableFragment(
    text,
    "Table 6-3. Fuel Cell CHP - Typical Performance Parameters",
    "6.4.1 Electrical Efficiency"
  );
  const fuelCellTypes = textRow(
    fuelCell,
    "Fuel Cell Type",
    ["PEMFC", "SOFC", "MCFC", "PAFC", "MCFC"]
  );
  const tables = [
    {
      technology: "Natural gas spark-ignition reciprocating engine",
      systems: [1, 2, 3, 4, 5],
      capacityKw: numericRow(gas, "Baseload Electric Capacity (kW)", 5),
      electricalEfficiency: numericRow(
        gas,
        "Electrical Efficiency (%), HHV",
        5,
        { percent: true }
      ),
      totalEfficiency: numericRow(gas, "Total Efficiency [%)", 5, {
        percent: true,
        continuationLines: 2,
        skipLeading: 1
      }),
      powerToHeatRatio: numericRow(gas, "Power / Heat Ratio", 5, {
        continuationLines: 2,
        skipLeading: 1
      }),
      pages: [36, 37],
      table: "Table 2-2"
    },
    {
      technology: "Microturbine",
      systems: [1, 2, 3, 4, 5, 6],
      capacityKw: numericRow(micro, "Net Electricity Capacity (kW)", 6),
      electricalEfficiency: numericRow(
        micro,
        "Electric Efficiency (%), HHV",
        6,
        { percent: true }
      ),
      totalEfficiency: numericRow(
        micro,
        "Total CHP Efficiency (%), HHV [4]",
        6,
        { percent: true }
      ),
      powerToHeatRatio: numericRow(micro, "Power/Heat Ratio [5]", 6),
      pages: [98, 99],
      table: "Table 5-2"
    },
    {
      technology: fuelCellTypes.map((type) => `Fuel cell - ${type}`),
      systems: [1, 2, 3, 4, 5],
      capacityKw: numericRow(
        fuelCell,
        "Nominal Electricity Capacity (kW)",
        5
      ),
      electricalEfficiency: numericRow(
        fuelCell,
        "Net Electrical Efficiency (%), HHV)",
        5,
        { percent: true }
      ),
      totalEfficiency: numericRow(
        fuelCell,
        "Total CHP Efficiency (%), HHV",
        5,
        { percent: true }
      ),
      powerToHeatRatio: numericRow(
        fuelCell,
        "Power to Heat Ratio",
        5
      ),
      fuelInputMmbtuPerHour: numericRow(
        fuelCell,
        "Fuel Input (MMBtu/hr), HHV",
        5
      ),
      pages: [123],
      table: "Table 6-3"
    }
  ];
  return tables.flatMap((table) =>
    table.systems.map((system, index) => ({
      technology: Array.isArray(table.technology)
        ? table.technology[index]
        : table.technology,
      system,
      capacityKw: table.capacityKw[index],
      electricalEfficiencyHhv: table.electricalEfficiency[index],
      totalEfficiencyHhv: table.totalEfficiency[index],
      powerToHeatRatio: table.powerToHeatRatio[index],
      fuelInputMmbtuPerHour:
        table.fuelInputMmbtuPerHour?.[index] ?? null,
      unitBasis: "Higher heating value (HHV), full-load catalog system",
      sourcePages: table.pages,
      sourceTable: table.table
    }))
  );
}

export function parseBiomassChpCatalogText(text) {
  const table = tableFragment(
    text,
    "Table 7-15. Modular Biomass System Cost and Performance Estimates",
    "Appendix A"
  );
  if (
    !table.includes("Downdraft gasifier, gas cleanup, IC") ||
    !table.includes("engine prime mover")
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: missing Table 7-15 equipment type"
    );
  }
  if (
    !table.includes("Several field demonstrations in the United") ||
    !table.includes("No commercial installations")
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: missing Table 7-15 commercialization status"
    );
  }
  const operatingFactorMatch = table.match(
    /Plant operating factor\s+\$2\.00\s+\$8\.00\s+(\d+(?:\.\d+)?)/
  );
  if (!operatingFactorMatch) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: missing Table 7-15 plant operating factor"
    );
  }
  const record = {
    systemName: "EPA Table 7-15 representative modular biomass system",
    conversionTechnology:
      "Downdraft gasifier, gas cleanup, IC engine prime mover",
    commercializationStatus:
      "Several field demonstrations; no commercial installations",
    capacityKw: numericRow(table, "Equipment size (kW)", 1)[0],
    thermalOutputMmbtuPerHour:
      numericRow(table, "Thermal output (Btu/hr)", 1)[0] / 1_000_000,
    powerToHeatRatio:
      numericRow(table, "Power to heat ratio", 1)[0],
    biomassFuelInputMmbtuPerHour:
      numericRow(table, "Biomass fuel use (MMBtu/hr)", 1)[0],
    electricalEfficiency:
      numericRow(table, "Electric efficiency (est.) (%)", 1, {
        percent: true
      })[0],
    totalEfficiency:
      numericRow(table, "CHP efficiency (%)", 1, {
        percent: true
      })[0],
    operatingFactor: Number(operatingFactorMatch[1]) / 100,
    sourceTable: "Table 7-15",
    sourceDocumentPage: 95,
    sourcePdfPage: 105,
    speculative: true
  };
  if (
    Math.abs(
      record.capacityKw /
        (record.thermalOutputMmbtuPerHour * 293.07107) -
        record.powerToHeatRatio
    ) > 0.02
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: Table 7-15 power-to-heat ratio is inconsistent"
    );
  }
  return record;
}

export async function ingestEpaChpCatalog({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(artifactPath, EPA_CHP_ARTIFACT);
  const parsed = await parsePdf(await readFile(artifactPath));
  if (parsed.numpages !== 150) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: expected 150 PDF pages, received ${parsed.numpages}`);
  }
  const records = parseChpCatalogText(parsed.text);
  const observedSchema = {
    format: "PDF tables",
    pageCount: parsed.numpages,
    tables: [
      {
        table: "Table 2-2",
        pages: [36, 37],
        technology: "Natural gas spark-ignition reciprocating engine",
        systems: 5
      },
      {
        table: "Table 5-2",
        pages: [98, 99],
        technology: "Microturbine",
        systems: 6
      },
      {
        table: "Table 6-3",
        pages: [123],
        technology: "Natural gas fuel-cell CHP systems",
        systems: 5
      }
    ],
    fields: [
      { name: "capacityKw", unit: "kW" },
      { name: "electricalEfficiencyHhv", unit: "fraction HHV" },
      { name: "totalEfficiencyHhv", unit: "fraction HHV" },
      { name: "powerToHeatRatio", unit: "ratio" },
      {
        name: "fuelInputMmbtuPerHour",
        unit: "MMBtu/hour",
        nullable: true
      }
    ]
  };
  upsertSourceProof(database, {
    source: {
      id: SOURCE_ID,
      standardId: "STD-EPA-CHP-PERFORMANCE",
      organization: "U.S. Environmental Protection Agency",
      name: "Catalog of CHP Technologies",
      primaryUrl: SOURCE_URL,
      license: "U.S. government publication",
      attribution: "EPA Combined Heat and Power Partnership",
      accessMode: "PUBLIC_PDF_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: sha256Json(observedSchema),
      kind: "PDF_TABLES",
      observed: observedSchema,
      inspectedAt: "2026-07-24T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: "September 2017",
      publishedAt: "2017-09-01T00:00:00.000Z",
      acquiredAt: "2026-07-23T00:00:00.000Z",
      status: "PUBLISHED"
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: SOURCE_URL,
      localName: "epa-chp-catalog.pdf",
      mediaType: "application/pdf",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: "ingestion:epa-chp-catalog:2017-09:v1",
      adapterVersion: "epa-chp-v1",
      startedAt: "2026-07-24T00:00:00.000Z",
      finishedAt: "2026-07-24T00:00:00.000Z",
      status: "SUCCEEDED",
      recordsRead: records.length,
      recordsWritten: records.length,
      warningCount: 0
    }
  });
  const insert = database.prepare(`
    INSERT INTO chp_catalog_performance (
      id, source_release_id, technology, size_class, electrical_efficiency,
      total_efficiency, power_to_heat_ratio, fuel_input_mmbtu_per_hour,
      unit_basis, source_page
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      electrical_efficiency = excluded.electrical_efficiency,
      total_efficiency = excluded.total_efficiency,
      power_to_heat_ratio = excluded.power_to_heat_ratio,
      fuel_input_mmbtu_per_hour = excluded.fuel_input_mmbtu_per_hour
  `);
  for (const record of records) {
    insert.run(
      epaChpCatalogPerformanceId(record, RELEASE_ID),
      RELEASE_ID,
      record.technology,
      `System ${record.system}: ${record.capacityKw} kW`,
      record.electricalEfficiencyHhv,
      record.totalEfficiencyHhv,
      record.powerToHeatRatio,
      record.fuelInputMmbtuPerHour,
      record.unitBasis,
      record.sourcePages[0]
    );
  }
  return {
    artifact,
    observedSchema,
    records,
    releaseId: RELEASE_ID,
    normalizedTargets: ["chp_catalog_performance"]
  };
}

export async function ingestEpaBiomassChpCatalog({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    EPA_BIOMASS_CHP_ARTIFACT
  );
  const parsed = await parsePdf(await readFile(artifactPath));
  if (parsed.numpages !== 122) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: expected 122 PDF pages, received ${parsed.numpages}`
    );
  }
  const record = parseBiomassChpCatalogText(parsed.text);
  const observedSchema = {
    format: "PDF table",
    pageCount: parsed.numpages,
    tables: [
      {
        table: record.sourceTable,
        documentPage: record.sourceDocumentPage,
        pdfPage: record.sourcePdfPage,
        systemCount: 1
      }
    ],
    fields: [
      { name: "Equipment type", unit: null },
      { name: "Commercialization status", unit: null },
      { name: "Equipment size (kW)", unit: "kW" },
      { name: "Thermal output (Btu/hr)", unit: "Btu/hour" },
      { name: "Power to heat ratio", unit: "ratio" },
      { name: "Biomass fuel use (MMBtu/hr)", unit: "MMBtu/hour" },
      { name: "Electric efficiency (est.) (%)", unit: "percent" },
      { name: "CHP efficiency (%)", unit: "percent" },
      { name: "Plant operating factor", unit: "percent" }
    ]
  };
  upsertSourceProof(database, {
    source: {
      id: BIOMASS_SOURCE_ID,
      standardId: "STD-EPA-CHP-PERFORMANCE",
      organization: "U.S. Environmental Protection Agency",
      name: "Biomass Combined Heat and Power Catalog of Technologies v1.1",
      primaryUrl: BIOMASS_ARTIFACT_URL,
      license: "U.S. government publication",
      attribution: "EPA Combined Heat and Power Partnership",
      accessMode: "PUBLIC_PDF_DOWNLOAD"
    },
    schema: {
      id: BIOMASS_SCHEMA_ID,
      fingerprintSha256: sha256Json(observedSchema),
      kind: "PDF_TABLE",
      observed: observedSchema,
      inspectedAt: "2026-07-24T19:14:05.000Z"
    },
    release: {
      id: BIOMASS_RELEASE_ID,
      version: "Biomass CHP Catalog v1.1",
      publishedAt: "2007-09-01T00:00:00.000Z",
      acquiredAt: "2026-07-24T19:14:05.000Z",
      status: "PUBLISHED"
    },
    artifact: {
      id: BIOMASS_ARTIFACT_ID,
      sourceUrl: BIOMASS_ARTIFACT_URL,
      localName: "epa-biomass-chp-catalog-v1.1.pdf",
      mediaType: "application/pdf",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: "ingestion:epa-biomass-chp-catalog:v1.1:v1",
      adapterVersion: "epa-chp-v2",
      startedAt: "2026-07-24T19:14:05.000Z",
      finishedAt: "2026-07-24T19:14:05.000Z",
      status: "SUCCEEDED",
      recordsRead: 1,
      recordsWritten: 1,
      warningCount: 2
    }
  });
  database.prepare(`
    INSERT INTO biomass_chp_performance (
      id, source_release_id, system_name, conversion_technology,
      commercialization_status, capacity_kw,
      thermal_output_mmbtu_per_hour,
      biomass_fuel_input_mmbtu_per_hour, electrical_efficiency,
      total_efficiency, power_to_heat_ratio, operating_factor,
      source_table, source_document_page, source_pdf_page, speculative
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      commercialization_status = excluded.commercialization_status,
      capacity_kw = excluded.capacity_kw,
      thermal_output_mmbtu_per_hour =
        excluded.thermal_output_mmbtu_per_hour,
      biomass_fuel_input_mmbtu_per_hour =
        excluded.biomass_fuel_input_mmbtu_per_hour,
      electrical_efficiency = excluded.electrical_efficiency,
      total_efficiency = excluded.total_efficiency,
      power_to_heat_ratio = excluded.power_to_heat_ratio,
      operating_factor = excluded.operating_factor,
      speculative = excluded.speculative
  `).run(
    epaBiomassChpPerformanceId(
      record,
      BIOMASS_RELEASE_ID
    ),
    BIOMASS_RELEASE_ID,
    record.systemName,
    record.conversionTechnology,
    record.commercializationStatus,
    record.capacityKw,
    record.thermalOutputMmbtuPerHour,
    record.biomassFuelInputMmbtuPerHour,
    record.electricalEfficiency,
    record.totalEfficiency,
    record.powerToHeatRatio,
    record.operatingFactor,
    record.sourceTable,
    record.sourceDocumentPage,
    record.sourcePdfPage,
    record.speculative ? 1 : 0
  );
  return {
    artifact,
    observedSchema,
    record,
    releaseId: BIOMASS_RELEASE_ID,
    normalizedTargets: ["biomass_chp_performance"],
    warnings: [
      "SOURCE_LABELS_PERFORMANCE_SPECULATIVE",
      "SOURCE_REPORTS_NO_COMMERCIAL_INSTALLATIONS"
    ]
  };
}

export function resolveChpCatalogSystem(database, {
  technology,
  system
}) {
  const rows = database.prepare(`
    SELECT *
    FROM chp_catalog_performance
    WHERE source_release_id = ?
      AND technology = ?
      AND size_class LIKE ?
  `).all(RELEASE_ID, technology, `System ${Number(system)}:%`);
  if (rows.length === 0) throw new Error("NO_EXACT_MATCH: CHP catalog system");
  if (rows.length !== 1) throw new Error("AMBIGUOUS_EXACT_MATCH: CHP catalog system");
  const match = rows[0].size_class.match(/: ([\d.]+) kW$/);
  return {
    technology: rows[0].technology,
    system: Number(system),
    capacityKw: Number(match[1]),
    electricalEfficiencyHhv: rows[0].electrical_efficiency,
    totalEfficiencyHhv: rows[0].total_efficiency,
    powerToHeatRatio: rows[0].power_to_heat_ratio,
    fuelInputMmbtuPerHour: rows[0].fuel_input_mmbtu_per_hour,
    sourcePage: rows[0].source_page,
    unitBasis: rows[0].unit_basis
  };
}

export function resolveBiomassChpSystem(database, {
  conversionTechnology,
  installedCapacityKw
}) {
  if (
    typeof conversionTechnology !== "string" ||
    !(installedCapacityKw > 0)
  ) {
    throw new Error(
      "INVALID_MODEL_INPUT: exact conversion technology and installed capacity are required"
    );
  }
  const rows = database.prepare(`
    SELECT *
    FROM biomass_chp_performance
    WHERE source_release_id = ?
      AND conversion_technology = ?
      AND abs(capacity_kw - ?) < 1e-9
  `).all(
    BIOMASS_RELEASE_ID,
    conversionTechnology,
    installedCapacityKw
  );
  if (rows.length === 0) {
    throw new Error("NO_EXACT_MATCH: EPA biomass CHP catalog system");
  }
  if (rows.length !== 1) {
    throw new Error(
      "AMBIGUOUS_EXACT_MATCH: EPA biomass CHP catalog system"
    );
  }
  return {
    systemName: rows[0].system_name,
    conversionTechnology: rows[0].conversion_technology,
    commercializationStatus: rows[0].commercialization_status,
    capacityKw: rows[0].capacity_kw,
    thermalOutputMmbtuPerHour:
      rows[0].thermal_output_mmbtu_per_hour,
    biomassFuelInputMmbtuPerHour:
      rows[0].biomass_fuel_input_mmbtu_per_hour,
    electricalEfficiency: rows[0].electrical_efficiency,
    totalEfficiency: rows[0].total_efficiency,
    powerToHeatRatio: rows[0].power_to_heat_ratio,
    operatingFactor: rows[0].operating_factor,
    sourceTable: rows[0].source_table,
    sourceDocumentPage: rows[0].source_document_page,
    sourcePdfPage: rows[0].source_pdf_page,
    speculative: rows[0].speculative === 1
  };
}

const PROCESS_BINDINGS = Object.freeze({
  "ITC-20": [
    {
      outputName: "Annual electricity generation",
      formulaTerm: "annual_generation",
      valueKey: "generation",
      unit: "kWh/year",
      physicalUnit: "kWh/year",
      scope: "PROJECT_TOTAL"
    },
    {
      outputName: "Annual input fuel",
      formulaTerm: "added_fuel",
      valueKey: "inputFuel",
      unit: "fuel-unit/year",
      physicalUnit: "MMBtu/year",
      scope: "PROJECT_TOTAL"
    }
  ],
  "ITC-21": [
    {
      outputName: "Annual electricity generation",
      formulaTerm: "generation",
      valueKey: "generation",
      unit: "kWh/year",
      physicalUnit: "kWh/year",
      scope: "PROJECT_TOTAL"
    },
    {
      outputName: "Annual CHP input fuel",
      formulaTerm: "CHP_input_fuel",
      valueKey: "inputFuel",
      unit: "fuel-unit/year",
      physicalUnit: "MMBtu/year",
      scope: "PROJECT_TOTAL"
    },
    {
      outputName: "Annual useful recovered heat",
      formulaTerm: "useful_heat",
      valueKey: "usefulHeat",
      unit: "energy/year",
      physicalUnit: "MMBtu/year",
      scope: "PROJECT_TOTAL"
    }
  ],
  "ITC-26": [
    {
      outputName: "Annual electricity generation",
      formulaTerm: "generation",
      valueKey: "generation",
      unit: "kWh/year",
      physicalUnit: "kWh/year",
      scope: "PROJECT_TOTAL"
    },
    {
      outputName: "Annual input fuel",
      formulaTerm: "input_fuel",
      valueKey: "inputFuel",
      unit: "fuel-unit/year",
      physicalUnit: "MMBtu/year",
      scope: "PROJECT_TOTAL"
    },
    {
      outputName: "Annual useful recovered heat",
      formulaTerm: "useful_heat",
      valueKey: "usefulHeat",
      unit: "energy/year",
      physicalUnit: "MMBtu/year",
      scope: "PROJECT_TOTAL"
    }
  ]
});

const BIOMASS_PROCESS_BINDINGS = Object.freeze([
  {
    outputName: "Annual electricity generation",
    formulaTerm: "generation",
    valueKey: "generation",
    unit: "kWh/year",
    physicalUnit: "kWh/year",
    scope: "PROJECT_TOTAL"
  },
  {
    outputName: "Scheduled annual input fuel",
    formulaTerm: "scheduled_input_fuel",
    valueKey: "scheduledInputFuel",
    unit: "resource-unit/year",
    physicalUnit: "MMBtu/year",
    scope: "PROJECT_TOTAL"
  },
  {
    outputName: "Annual useful recovered heat",
    formulaTerm: "useful_heat",
    valueKey: "usefulHeat",
    unit: "energy/year",
    physicalUnit: "MMBtu/year",
    scope: "PROJECT_TOTAL"
  }
]);

export function mapChpSystemToProcess(database, {
  categoryId,
  technology,
  system,
  annualOperatingHours
}) {
  assertNetworkDisabled();
  const bindingDefinitions = PROCESS_BINDINGS[categoryId];
  if (!bindingDefinitions) {
    throw new Error(`UNSUPPORTED_CHP_PROCESS: ${categoryId}`);
  }
  if (!(annualOperatingHours > 0 && annualOperatingHours <= 8760)) {
    throw new Error("INVALID_MODEL_INPUT: annualOperatingHours must be in (0, 8760]");
  }
  const record = resolveChpCatalogSystem(database, { technology, system });
  const generation = record.capacityKw * annualOperatingHours;
  const inputFuel =
    record.fuelInputMmbtuPerHour === null
      ? generation * 0.003412 / record.electricalEfficiencyHhv
      : record.fuelInputMmbtuPerHour * annualOperatingHours;
  const usefulHeat =
    inputFuel * (record.totalEfficiencyHhv - record.electricalEfficiencyHhv);
  const physicalValues = { generation, inputFuel, usefulHeat };
  const formulaBindings = bindingDefinitions.map((definition) => ({
    outputName: definition.outputName,
    formulaTerm: definition.formulaTerm,
    value: physicalValues[definition.valueKey],
    unit: definition.unit,
    physicalUnit: definition.physicalUnit,
    scope: definition.scope
  }));
  const values = Object.fromEntries(
    formulaBindings.map(({ formulaTerm, value }) => [formulaTerm, value])
  );
  return {
    standardId: "STD-EPA-CHP-PERFORMANCE",
    categoryId,
    processKey: "epa_chp_performance",
    sourceArtifactId: ARTIFACT_ID,
    sourceReleaseId: RELEASE_ID,
    values,
    formulaBindings,
    selectionRule: "EXACT_EPA_CHP_CATALOG_SYSTEM",
    provenance: buildProvenance({
      standardId: "STD-EPA-CHP-PERFORMANCE",
      artifact: EPA_CHP_ARTIFACT,
      sourceVersion: "September 2017",
      sourceFields: record.technology.startsWith("Fuel cell - ")
        ? [
            "Fuel Cell Type",
            "Nominal Electricity Capacity (kW)",
            "Net Electrical Efficiency (%), HHV)",
            "Fuel Input (MMBtu/hr), HHV",
            "Total CHP Efficiency (%), HHV",
            "Power to Heat Ratio"
          ]
        : [
            "Baseload Electric Capacity (kW)",
            "Electrical Efficiency (%), HHV",
            "Total Efficiency [%)",
            "Power / Heat Ratio"
          ],
      filters: { technology, system, annualOperatingHours },
      transformation:
        record.fuelInputMmbtuPerHour === null
          ? "Full-load generation and HHV fuel/heat balance using one exact catalog system and its electrical efficiency"
          : "Full-load generation and HHV fuel/heat balance using one exact catalog system and its native fuel-input rate",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function mapBiomassChpSystemToItc22(database, {
  conversionTechnology,
  installedCapacityKw,
  annualOperatingHours
}) {
  assertNetworkDisabled();
  if (
    !(annualOperatingHours > 0 && annualOperatingHours <= 8760)
  ) {
    throw new Error(
      "INVALID_MODEL_INPUT: annualOperatingHours must be in (0, 8760]"
    );
  }
  const record = resolveBiomassChpSystem(database, {
    conversionTechnology,
    installedCapacityKw
  });
  const physicalValues = {
    generation: record.capacityKw * annualOperatingHours,
    scheduledInputFuel:
      record.biomassFuelInputMmbtuPerHour * annualOperatingHours,
    usefulHeat:
      record.thermalOutputMmbtuPerHour * annualOperatingHours
  };
  const formulaBindings = BIOMASS_PROCESS_BINDINGS.map(
    (definition) => ({
      outputName: definition.outputName,
      formulaTerm: definition.formulaTerm,
      value: physicalValues[definition.valueKey],
      unit: definition.unit,
      physicalUnit: definition.physicalUnit,
      scope: definition.scope
    })
  );
  return {
    standardId: "STD-EPA-CHP-PERFORMANCE",
    categoryId: "ITC-22",
    processKey: "epa_chp_performance",
    sourceArtifactId: BIOMASS_ARTIFACT_ID,
    sourceReleaseId: BIOMASS_RELEASE_ID,
    values: Object.fromEntries(
      formulaBindings.map(({ formulaTerm, value }) => [
        formulaTerm,
        value
      ])
    ),
    formulaBindings,
    selectionRule:
      "EXACT_EPA_BIOMASS_CHP_TABLE_7_15_SYSTEM_AND_CAPACITY",
    warnings: [
      "SOURCE_LABELS_PERFORMANCE_SPECULATIVE",
      "SOURCE_REPORTS_NO_COMMERCIAL_INSTALLATIONS",
      "FULL_LOAD_LINEAR_SCALING_REQUIRES_PROJECT_VALIDATION"
    ],
    provenance: buildProvenance({
      standardId: "STD-EPA-CHP-PERFORMANCE",
      artifact: EPA_BIOMASS_CHP_ARTIFACT,
      sourceVersion: "Biomass CHP Catalog v1.1",
      sourceFields: [
        "Equipment type",
        "Commercialization status",
        "Equipment size (kW)",
        "Thermal output (Btu/hr)",
        "Power to heat ratio",
        "Biomass fuel use (MMBtu/hr)",
        "Electric efficiency (est.) (%)",
        "CHP efficiency (%)",
        "Plant operating factor"
      ],
      filters: {
        conversionTechnology,
        installedCapacityKw,
        annualOperatingHours
      },
      transformation:
        "Exact Table 7-15 full-load capacity, biomass-fuel input rate, and recovered-heat rate multiplied by explicit annual operating hours",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function mapChpSystemToItc21(database, inputs) {
  return mapChpSystemToProcess(database, {
    ...inputs,
    categoryId: "ITC-21"
  });
}

export function recordEpaChpFormulaMapping(database, result) {
  assertNetworkDisabled();
  if (
    !result ||
    result.standardId !== "STD-EPA-CHP-PERFORMANCE" ||
    !(
      PROCESS_BINDINGS[result.categoryId] ||
      result.categoryId === "ITC-22"
    )
  ) {
    throw new Error("INVALID_EPA_CHP_RESULT");
  }
  const technology =
    result.provenance.filters.technology ??
    result.provenance.filters.conversionTechnology;
  const systemKey =
    result.provenance.filters.system === undefined
      ? `capacity-${result.provenance.filters.installedCapacityKw}-kw`
      : `system-${result.provenance.filters.system}`;
  if (typeof technology !== "string" || !technology) {
    throw new Error("INVALID_EPA_CHP_RESULT: missing technology filter");
  }
  const sourceReleaseId =
    result.sourceReleaseId ?? RELEASE_ID;
  requireReleaseId(sourceReleaseId);
  const calculationId = [
    "calculation",
    "epa-chp",
    result.categoryId.toLowerCase(),
    sourceReleaseId,
    technology
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-|-$/g, ""),
    systemKey
  ].join(":");
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status,
      created_at
    ) VALUES (?, 'STD-EPA-CHP-PERFORMANCE', 'epa_chp_performance', ?, NULL,
      'epa-chp-v1', ?, ?, 1, 'SUCCEEDED', '2026-07-24T00:00:00.000Z')
    ON CONFLICT(id) DO UPDATE SET
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256
  `).run(
    calculationId,
    sourceReleaseId,
    sha256Json(result.provenance.filters),
    sha256Json(result.values)
  );
  const insertValue = database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, value_json, unit, scope,
      selection_rule
    ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit,
      scope = excluded.scope,
      selection_rule = excluded.selection_rule
  `);
  const insertProvenance = database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json, filters_json,
      transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `);
  database.exec("BEGIN IMMEDIATE");
  try {
    for (const binding of result.formulaBindings) {
      const valueId = `${calculationId}:${binding.formulaTerm}`;
      insertValue.run(
        valueId,
        calculationId,
        binding.formulaTerm,
        binding.value,
        binding.unit,
        binding.scope,
        result.selectionRule
      );
      insertProvenance.run(
        valueId,
        result.sourceArtifactId ?? ARTIFACT_ID,
        JSON.stringify(result.provenance.sourceFields),
        JSON.stringify(result.provenance.filters),
        result.provenance.transformation,
        ADAPTER_PATH
      );
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
  return calculationId;
}
