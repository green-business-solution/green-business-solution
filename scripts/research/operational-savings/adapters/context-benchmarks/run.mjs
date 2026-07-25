import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  inspectContextBenchmarkSchema,
  inspectLightingMarketSchema
} from "./inspect-schema.mjs";

export const CONTEXT_CALCULATOR_ARTIFACT = Object.freeze({
  byteSize: 403484,
  sha256: "3d2abed1938bd1400378a2e0ca2095058fe490b2b599ef15f09056639f06fcd6"
});

export const CONTEXT_CALCULATOR_URL =
  "https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx";

export const DOE_LIGHTING_MARKET_ARTIFACT = Object.freeze({
  byteSize: 1112293,
  sha256: "97c36f8d92a721dc2e3245215987d90c828314fa478050ea24c90c750c6fe5f1"
});

export const DOE_LIGHTING_MARKET_URL =
  "https://www.energy.gov/sites/default/files/2017/12/f46/LMC%202015%20Tables_0.XLSX";

const STANDARD_ID = "STD-CONTEXT-BENCHMARKS";
const SOURCE_ID = "source:energy-star-cfs-context-benchmarks";
const SCHEMA_ID = "schema:energy-star-cfs-context-benchmarks:2024-03";
const RELEASE_ID = "release:energy-star-cfs-calculator:2024-03:context";
const ARTIFACT_ID = "artifact:energy-star-cfs-calculator-context:2024-03";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/context-benchmarks/run.mjs";
const LIGHTING_SOURCE_ID =
  "source:doe-2015-lighting-market-characterization";
const LIGHTING_SCHEMA_ID =
  "schema:doe-lmc-2015:table-4-29";
const LIGHTING_RELEASE_ID =
  "release:doe-lmc-2015-tables:2017-11";
const LIGHTING_ARTIFACT_ID =
  "artifact:doe-lmc-2015-tables:2017-11";

function normalizedClass(value) {
  return String(value)
    .normalize("NFKC")
    .trim()
    .toLocaleUpperCase("en-US")
    .replaceAll(/\s+/g, " ");
}

function sourceProof(schema, artifact) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: STANDARD_ID,
      organization: "U.S. Environmental Protection Agency",
      name: "ENERGY STAR CFS source-specific context benchmarks",
      primaryUrl: CONTEXT_CALCULATOR_URL,
      license: "U.S. EPA calculator",
      attribution: "ENERGY STAR, U.S. Environmental Protection Agency",
      accessMode: "PUBLIC_XLSX_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "XLSX_EXACT_BENCHMARK_CELLS",
      observed: schema,
      inspectedAt: "2026-07-24T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: "Workbook published March 2024",
      publishedAt: "2024-03-01T00:00:00.000Z",
      acquiredAt: "2026-07-23T00:00:00.000Z",
      status: "PUBLISHED"
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: CONTEXT_CALCULATOR_URL,
      localName: "energy-star-cfs-calculator.xlsx",
      mediaType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: "ingestion:energy-star-cfs-context-benchmarks:2024-03:v1",
      adapterVersion: "context-benchmarks-energy-star-cfs-v1",
      startedAt: "2026-07-24T00:00:00.000Z",
      finishedAt: "2026-07-24T00:00:00.000Z",
      status: "SUCCEEDED",
      recordsRead:
        schema.dishwasherActivityDefaults.length +
        schema.cooktopDuty.length,
      recordsWritten:
        schema.dishwasherActivityDefaults.length +
        schema.cooktopDuty.length,
      warningCount: 1
    }
  };
}

export async function ingestContextBenchmarks({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    CONTEXT_CALCULATOR_ARTIFACT
  );
  const schema = await inspectContextBenchmarkSchema(artifactPath);
  upsertSourceProof(database, sourceProof(schema, artifact));
  const insertPopulation = database.prepare(`
    INSERT INTO benchmark_populations (
      id, source_release_id, standard_id, process_key, filters_json,
      population_size, weighting_field, selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, NULL, ?)
    ON CONFLICT(id) DO UPDATE SET
      filters_json = excluded.filters_json,
      population_size = excluded.population_size,
      selection_rule = excluded.selection_rule
  `);
  const insertValue = database.prepare(`
    INSERT INTO benchmark_values (
      id, population_id, field_key, value, unit, sample_size
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit
  `);
  for (const row of schema.dishwasherActivityDefaults) {
    const classKey =
      `${normalizedClass(row.sanitationMethod)}:${normalizedClass(row.machineType)}`;
    const populationId =
      `context:cfs:${RELEASE_ID}:rack-activity:${classKey}`;
    insertPopulation.run(
      populationId,
      RELEASE_ID,
      STANDARD_ID,
      "rack-dishwasher-activity",
      JSON.stringify({
        sanitationMethod: row.sanitationMethod,
        machineType: row.machineType,
        nativeCell: row.valueCell
      }),
      1,
      "OFFICIAL_CALCULATOR_DEFAULT"
    );
    insertValue.run(
      `${populationId}:racks-per-operating-day`,
      populationId,
      "racks_per_operating_day",
      row.racksPerOperatingDay,
      row.unit,
      1
    );
  }
  const cooktopPopulationId =
    `context:cfs:${RELEASE_ID}:cooktop:20-pound-water-boil`;
  insertPopulation.run(
    cooktopPopulationId,
    RELEASE_ID,
    STANDARD_ID,
    "context_benchmarks",
    JSON.stringify({
      duty:
        schema.cooktopDutyDefinition,
      applicability:
        "electric conventional and ENERGY STAR levels only"
    }),
    2,
    "OFFICIAL_CALCULATOR_LEVEL"
  );
  for (const field of schema.cooktopDuty) {
    insertValue.run(
      `${cooktopPopulationId}:${field.role}`,
      cooktopPopulationId,
      field.role,
      field.value,
      field.unit,
      1
    );
  }
  return {
    artifact,
    schema,
    normalizedTargets: [
      "benchmark_populations",
      "benchmark_values"
    ]
  };
}

export async function ingestLightingMarketBenchmarks({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    DOE_LIGHTING_MARKET_ARTIFACT
  );
  const schema = await inspectLightingMarketSchema(artifactPath);
  upsertSourceProof(database, {
    source: {
      id: LIGHTING_SOURCE_ID,
      standardId: STANDARD_ID,
      organization: "U.S. Department of Energy",
      name: "2015 U.S. Lighting Market Characterization",
      primaryUrl: DOE_LIGHTING_MARKET_URL,
      license: "U.S. Department of Energy publication",
      attribution: "U.S. Department of Energy Solid-State Lighting Program",
      accessMode: "PUBLIC_XLSX_DOWNLOAD"
    },
    schema: {
      id: LIGHTING_SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "XLSX_TABLE_4_29",
      observed: schema,
      inspectedAt: "2026-07-24T19:21:55.000Z"
    },
    release: {
      id: LIGHTING_RELEASE_ID,
      version: "2015 baseline, November 2017 report tables",
      publishedAt: "2017-11-01T00:00:00.000Z",
      acquiredAt: "2026-07-24T19:21:55.000Z",
      status: "PUBLISHED"
    },
    artifact: {
      id: LIGHTING_ARTIFACT_ID,
      sourceUrl: DOE_LIGHTING_MARKET_URL,
      localName: "doe-lmc-2015-tables.xlsx",
      mediaType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: "ingestion:doe-lmc-2015-table-4-29:v1",
      adapterVersion: "context-doe-lmc-v1",
      startedAt: "2026-07-24T19:21:55.000Z",
      finishedAt: "2026-07-24T19:21:55.000Z",
      status: "SUCCEEDED",
      recordsRead: schema.applicationAverages.length,
      recordsWritten: schema.applicationAverages.length,
      warningCount: 1
    }
  });
  const insertPopulation = database.prepare(`
    INSERT INTO benchmark_populations (
      id, source_release_id, standard_id, process_key, filters_json,
      population_size, weighting_field, selection_rule
    ) VALUES (?, ?, ?, 'context_benchmarks', ?, 1, NULL,
      'OFFICIAL_2015_OUTDOOR_SUBSECTOR_AVERAGE')
    ON CONFLICT(id) DO UPDATE SET
      filters_json = excluded.filters_json,
      selection_rule = excluded.selection_rule
  `);
  const insertValue = database.prepare(`
    INSERT INTO benchmark_values (
      id, population_id, field_key, value, unit, sample_size
    ) VALUES (?, ?, 'existing_fixture_watts', ?,
      'watts/lamp-or-luminaire', 1)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit
  `);
  for (const row of schema.applicationAverages) {
    const applicationKey = normalizedClass(row.application)
      .toLocaleLowerCase("en-US")
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replaceAll(/^-|-$/g, "");
    const populationId =
      `context:doe-lmc-2015:${LIGHTING_RELEASE_ID}:${applicationKey}`;
    insertPopulation.run(
      populationId,
      LIGHTING_RELEASE_ID,
      STANDARD_ID,
      JSON.stringify({
        application: row.application,
        applicationCell: row.applicationCell,
        averageCell: row.averageCell,
        sourceTable: "Table 4-29"
      })
    );
    insertValue.run(
      `${populationId}:existing-fixture-watts`,
      populationId,
      row.averageWatts
    );
  }
  return {
    artifact,
    schema,
    normalizedTargets: [
      "benchmark_populations",
      "benchmark_values"
    ],
    warning:
      "National 2015 subsector average, not a project nameplate value."
  };
}

export function resolveExistingExteriorLightingWattage(database, {
  application
}) {
  assertNetworkDisabled();
  if (typeof application !== "string" || !application.trim()) {
    throw new Error("INVALID_REQUIREMENT: application");
  }
  const rows = database.prepare(`
    SELECT
      p.id AS populationId,
      p.filters_json AS filtersJson,
      p.selection_rule AS selectionRule,
      v.value,
      v.unit
    FROM benchmark_populations p
    JOIN benchmark_values v ON v.population_id = p.id
    WHERE p.source_release_id = ?
      AND p.process_key = 'context_benchmarks'
      AND v.field_key = 'existing_fixture_watts'
  `).all(LIGHTING_RELEASE_ID).filter((row) => {
    const filters = JSON.parse(row.filtersJson);
    return normalizedClass(filters.application) ===
      normalizedClass(application);
  });
  if (rows.length === 0) {
    throw new Error(
      `NO_EXACT_MATCH: lighting-market application ${application}`
    );
  }
  if (rows.length !== 1) {
    throw new Error(
      `AMBIGUOUS_EXACT_MATCH: lighting-market application ${application}`
    );
  }
  return {
    ...rows[0],
    filters: JSON.parse(rows[0].filtersJson)
  };
}

export function mapExistingExteriorLightingToItc02(
  database,
  { application }
) {
  assertNetworkDisabled();
  const resolved = resolveExistingExteriorLightingWattage(
    database,
    { application }
  );
  const existingKw = resolved.value / 1000;
  return {
    standardId: STANDARD_ID,
    categoryId: "ITC-02",
    processKey: "context_benchmarks",
    sourceArtifactId: LIGHTING_ARTIFACT_ID,
    sourceReleaseId: LIGHTING_RELEASE_ID,
    values: { existing_kW: existingKw },
    formulaBindings: [
      {
        outputName: "One existing input-watt value per fixture",
        formulaTerm: "existing_kW",
        value: existingKw,
        unit: "kW/fixture",
        scope: "PER_FIXTURE"
      }
    ],
    selectionRule: resolved.selectionRule,
    warning:
      "National 2015 outdoor-subsector average, not a project nameplate value.",
    provenance: buildProvenance({
      standardId: STANDARD_ID,
      artifact: DOE_LIGHTING_MARKET_ARTIFACT,
      sourceVersion: "2015 baseline, November 2017 report tables",
      sourceFields: [
        `Table 4-29!${resolved.filters.applicationCell}`,
        `Table 4-29!${resolved.filters.averageCell}`
      ],
      filters: { application: resolved.filters.application },
      transformation:
        "official_average_watts_per_lamp_or_luminaire / 1000",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordExistingExteriorLightingBenchmark(
  database,
  result
) {
  assertNetworkDisabled();
  const inputHash = sha256Json(result.provenance.filters);
  const runId =
    `calculation:context:exterior-lighting:${LIGHTING_RELEASE_ID}:` +
    inputHash;
  const selectedValueId = `${runId}:existing_kW`;
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status,
      created_at
    ) VALUES (?, ?, 'context_benchmarks', ?, NULL, 'context-doe-lmc-v1',
      ?, ?, 1, 'SUCCEEDED', '2026-07-24T19:21:55.000Z')
    ON CONFLICT(id) DO UPDATE SET
      output_sha256 = excluded.output_sha256,
      status = excluded.status
  `).run(
    runId,
    STANDARD_ID,
    LIGHTING_RELEASE_ID,
    inputHash,
    sha256Json(result.values)
  );
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope,
      selection_rule
    ) VALUES (?, ?, 'existing_kW', ?, 'kW/fixture', 'PER_FIXTURE', ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      selection_rule = excluded.selection_rule
  `).run(
    selectedValueId,
    runId,
    result.values.existing_kW,
    result.selectionRule
  );
  database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json,
      filters_json, transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation
  `).run(
    selectedValueId,
    LIGHTING_ARTIFACT_ID,
    JSON.stringify(result.provenance.sourceFields),
    JSON.stringify(result.provenance.filters),
    result.provenance.transformation,
    ADAPTER_PATH
  );
  return runId;
}

export function resolveRackDishwasherDefault(database, {
  sanitationMethod,
  machineType
}) {
  assertNetworkDisabled();
  const rows = database.prepare(`
    SELECT
      p.id AS populationId,
      p.filters_json AS filtersJson,
      p.selection_rule AS selectionRule,
      v.value,
      v.unit
    FROM benchmark_populations p
    JOIN benchmark_values v ON v.population_id = p.id
    WHERE p.source_release_id = ?
      AND p.process_key = 'rack-dishwasher-activity'
      AND v.field_key = 'racks_per_operating_day'
  `).all(RELEASE_ID).filter((row) => {
    const filters = JSON.parse(row.filtersJson);
    return (
      normalizedClass(filters.sanitationMethod) ===
        normalizedClass(sanitationMethod) &&
      normalizedClass(filters.machineType) === normalizedClass(machineType)
    );
  });
  if (rows.length === 0) {
    throw new Error("NO_EXACT_MATCH: dishwasher activity class");
  }
  if (rows.length !== 1) {
    throw new Error("AMBIGUOUS_EXACT_MATCH: dishwasher activity class");
  }
  return {
    ...rows[0],
    filters: JSON.parse(rows[0].filtersJson)
  };
}

function scheduleNumber(value, label, maximum) {
  if (!Number.isFinite(value) || value <= 0 || value > maximum) {
    throw new Error(`INVALID_SCHEDULE_INPUT: ${label}`);
  }
  return Number(value);
}

export function mapRackDishwasherActivityToItc52(database, {
  sanitationMethod,
  machineType,
  operatingDaysPerWeek,
  activeWeeksPerYear,
  racksPerOperatingDay
}) {
  assertNetworkDisabled();
  const days = scheduleNumber(
    operatingDaysPerWeek,
    "operatingDaysPerWeek",
    7
  );
  const weeks = scheduleNumber(
    activeWeeksPerYear,
    "activeWeeksPerYear",
    53
  );
  let daily;
  let selectionRule;
  let sourceFields;
  let sourceFilters;
  if (racksPerOperatingDay === undefined) {
    const source = resolveRackDishwasherDefault(database, {
      sanitationMethod,
      machineType
    });
    daily = source.value;
    selectionRule = source.selectionRule;
    sourceFields = [
      `Dishwasher Calcs!${source.filters.nativeCell}`
    ];
    sourceFilters = source.filters;
  } else {
    daily = scheduleNumber(
      racksPerOperatingDay,
      "racksPerOperatingDay",
      1000000
    );
    selectionRule = "EXACT_PROJECT_INPUT";
    sourceFields = [];
    sourceFilters = {
      sanitationMethod,
      machineType
    };
  }
  const annualRacks = daily * days * weeks;
  return {
    standardId: STANDARD_ID,
    categoryId: "ITC-52",
    processKey: "rack-dishwasher-activity",
    values: {
      annual_racks_per_unit: annualRacks
    },
    formulaBindings: [
      {
        outputName: "Annual racks per equipment unit",
        formulaTerm: "annual_racks_per_unit",
        value: annualRacks,
        unit: "racks/year",
        scope: "PER_EQUIPMENT_UNIT"
      }
    ],
    selectionRule,
    provenance: buildProvenance({
      standardId: STANDARD_ID,
      artifact: CONTEXT_CALCULATOR_ARTIFACT,
      sourceVersion: "Workbook published March 2024",
      sourceFields,
      filters: {
        ...sourceFilters,
        operatingDaysPerWeek: days,
        activeWeeksPerYear: weeks,
        racksPerOperatingDay: daily
      },
      transformation:
        "racks_per_operating_day * operating_days_per_week * active_weeks_per_year",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordRackDishwasherActivity(database, result) {
  assertNetworkDisabled();
  const inputHash = sha256Json(result.provenance.filters);
  const outputHash = sha256Json(result.values);
  const runId =
    `calculation:context:rack-dishwasher:${RELEASE_ID}:` +
    inputHash;
  const selectedValueId = `${runId}:annual_racks_per_unit`;
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status,
      created_at
    ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?, 1, 'SUCCEEDED', ?)
    ON CONFLICT(id) DO UPDATE SET
      output_sha256 = excluded.output_sha256,
      status = excluded.status
  `).run(
    runId,
    STANDARD_ID,
    result.processKey,
    RELEASE_ID,
    "context-benchmarks-energy-star-cfs-v1",
    inputHash,
    outputHash,
    "2026-07-24T00:00:00.000Z"
  );
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope, selection_rule
    ) VALUES (?, ?, 'annual_racks_per_unit', ?, 'racks/year',
      'PER_EQUIPMENT_UNIT', ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      selection_rule = excluded.selection_rule
  `).run(
    selectedValueId,
    runId,
    result.values.annual_racks_per_unit,
    result.selectionRule
  );
  database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json, filters_json,
      transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation
  `).run(
    selectedValueId,
    result.selectionRule === "EXACT_PROJECT_INPUT" ? null : ARTIFACT_ID,
    JSON.stringify(result.provenance.sourceFields),
    JSON.stringify(result.provenance.filters),
    result.provenance.transformation,
    ADAPTER_PATH
  );
  return runId;
}
