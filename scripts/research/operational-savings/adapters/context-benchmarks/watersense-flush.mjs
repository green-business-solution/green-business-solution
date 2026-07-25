import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  inspectWaterSenseFlushSchemas
} from "./watersense-flush-inspect-schema.mjs";

export const WATERSENSE_TOILET_ACTIVITY_ARTIFACT =
  Object.freeze({
    byteSize: 467_069,
    sha256:
      "47ef36b3d505ef39be821ea1665b5bab62da961a529488d96d560b04021182b6"
  });

export const WATERSENSE_URINAL_ACTIVITY_ARTIFACT =
  Object.freeze({
    byteSize: 2_010_967,
    sha256:
      "527a042f5037f5ff8629655c60d41310ce7404b1a5ca332f738f9e6ed4a2bcd1"
  });

const STANDARD_ID = "STD-CONTEXT-BENCHMARKS";
const SOURCE_ID = "source:watersense-at-work-flush-activity";
const SCHEMA_ID = "schema:watersense-at-work-flush-activity:2023";
const RELEASE_ID = "release:watersense-at-work-flush-activity:2023";
const TOILET_ARTIFACT_ID =
  "artifact:watersense-at-work-toilets:2023";
const URINAL_ARTIFACT_ID =
  "artifact:watersense-at-work-urinals:2023";
const INGESTION_ID =
  "ingestion:watersense-at-work-flush-activity:2023:v1";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/context-benchmarks/watersense-flush.mjs";
const ACQUIRED_AT = "2026-07-24T19:38:24.000Z";
const TOILET_URL =
  "https://nepis.epa.gov/Exe/ZyPDF.cgi/P1017K41.PDF?Dockey=P1017K41.PDF";
const URINAL_URL =
  "https://nepis.epa.gov/Exe/ZyPDF.cgi/P1017K3R.PDF?Dockey=P1017K3R.PDF";

function sourceProof({
  schema,
  artifact,
  artifactId,
  sourceUrl,
  recordsWritten
}) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: STANDARD_ID,
      organization: "U.S. Environmental Protection Agency",
      name:
        "WaterSense at Work 2023 sanitary-fixture activity methods",
      primaryUrl:
        "https://www.epa.gov/watersense/best-management-practices",
      license:
        "EPA-published WaterSense content is public domain with requested attribution",
      attribution: "U.S. EPA WaterSense",
      accessMode: "PUBLIC_PDF_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "PDF_NATIVE_ACTIVITY_ASSUMPTIONS_AND_EQUATIONS",
      observed: schema.observed,
      inspectedAt: ACQUIRED_AT
    },
    release: {
      id: RELEASE_ID,
      version: "WaterSense at Work 2023 Sections 3.1 and 3.2",
      publishedAt: "2023-06-16T00:00:00.000Z",
      acquiredAt: ACQUIRED_AT,
      status: "PUBLISHED"
    },
    artifact: {
      id: artifactId,
      sourceUrl,
      localName: basename(artifact.path),
      mediaType: "application/pdf",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: "context-watersense-flush-v1",
      startedAt: ACQUIRED_AT,
      finishedAt: ACQUIRED_AT,
      status: "SUCCEEDED",
      recordsRead: 4,
      recordsWritten,
      warningCount: 2
    }
  };
}

export async function ingestWaterSenseFlushActivity({
  toiletArtifactPath,
  urinalArtifactPath,
  database
}) {
  assertNetworkDisabled();
  const [toiletArtifact, urinalArtifact] =
    await Promise.all([
      verifyArtifact(
        toiletArtifactPath,
        WATERSENSE_TOILET_ACTIVITY_ARTIFACT
      ),
      verifyArtifact(
        urinalArtifactPath,
        WATERSENSE_URINAL_ACTIVITY_ARTIFACT
      )
    ]);
  const schema = await inspectWaterSenseFlushSchemas({
    toiletArtifactPath,
    urinalArtifactPath
  });
  upsertSourceProof(
    database,
    sourceProof({
      schema,
      artifact: toiletArtifact,
      artifactId: TOILET_ARTIFACT_ID,
      sourceUrl: TOILET_URL,
      recordsWritten: 2
    })
  );
  upsertSourceProof(
    database,
    sourceProof({
      schema,
      artifact: urinalArtifact,
      artifactId: URINAL_ARTIFACT_ID,
      sourceUrl: URINAL_URL,
      recordsWritten: 3
    })
  );
  const insertPopulation = database.prepare(`
    INSERT INTO benchmark_populations (
      id, source_release_id, standard_id, process_key, filters_json,
      population_size, weighting_field, selection_rule
    ) VALUES (?, ?, ?, 'flush_activity', ?, 1, NULL,
      'EXACT_FIXTURE_TYPE_AND_ELIGIBLE_POPULATION_METHOD')
    ON CONFLICT(id) DO UPDATE SET
      filters_json = excluded.filters_json,
      selection_rule = excluded.selection_rule
  `);
  const insertValue = database.prepare(`
    INSERT INTO benchmark_values (
      id, population_id, field_key, value, unit, sample_size
    ) VALUES (?, ?, ?, ?, 'flushes/(person operating day)', 1)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit
  `);
  const toiletPopulation =
    `context:watersense:${RELEASE_ID}:flush-activity:toilet`;
  const urinalPopulation =
    `context:watersense:${RELEASE_ID}:flush-activity:urinal`;
  insertPopulation.run(
    toiletPopulation,
    RELEASE_ID,
    STANDARD_ID,
    JSON.stringify({
      fixtureType: "TOILET",
      allocationBoundary: "COMPLETE_ELIGIBLE_GROUP"
    })
  );
  insertValue.run(
    `${toiletPopulation}:female`,
    toiletPopulation,
    "female_flushes_per_operating_day",
    schema.assumptions.femaleToiletFlushesPerOperatingDay
  );
  insertValue.run(
    `${toiletPopulation}:male`,
    toiletPopulation,
    "male_flushes_per_operating_day",
    schema.assumptions.maleToiletFlushesPerOperatingDay
  );
  insertPopulation.run(
    urinalPopulation,
    RELEASE_ID,
    STANDARD_ID,
    JSON.stringify({
      fixtureType: "URINAL",
      allocationBoundary: "COMPLETE_ELIGIBLE_GROUP"
    })
  );
  insertValue.run(
    `${urinalPopulation}:male`,
    urinalPopulation,
    "male_flushes_per_operating_day",
    schema.assumptions.maleUrinalFlushesPerOperatingDay
  );
  return {
    artifacts: [toiletArtifact, urinalArtifact],
    schema,
    recordsRead: 4,
    recordsWritten: 3,
    normalizedTargets: [
      "benchmark_populations",
      "benchmark_values"
    ]
  };
}

function nonnegativeInteger(value, name) {
  if (
    !Number.isSafeInteger(value) ||
    value < 0
  ) {
    throw new Error(
      `INVALID_PROJECT_INPUT: ${name} must be a nonnegative safe integer`
    );
  }
  return value;
}

function positiveInteger(value, name, maximum) {
  if (
    !Number.isSafeInteger(value) ||
    value <= 0 ||
    value > maximum
  ) {
    throw new Error(
      `INVALID_PROJECT_INPUT: ${name} must be a positive integer no greater than ${maximum}`
    );
  }
  return value;
}

function assumptionsForFixture(database, fixtureType) {
  const populationId =
    `context:watersense:${RELEASE_ID}:flush-activity:` +
    fixtureType.toLowerCase();
  const rows = database.prepare(`
    SELECT
      v.field_key AS fieldKey,
      v.value,
      v.unit,
      p.selection_rule AS selectionRule
    FROM benchmark_populations p
    JOIN benchmark_values v ON v.population_id = p.id
    WHERE p.id = ?
      AND p.source_release_id = ?
    ORDER BY v.field_key
  `).all(populationId, RELEASE_ID);
  if (
    rows.length !== (fixtureType === "TOILET" ? 2 : 1) ||
    rows.some(
      ({ unit }) =>
        unit !== "flushes/(person operating day)"
    )
  ) {
    throw new Error(
      `MISSING_PUBLISHED_WATERSENSE_FLUSH_METHOD: ${fixtureType}`
    );
  }
  return {
    values: Object.fromEntries(
      rows.map(({ fieldKey, value }) => [fieldKey, value])
    ),
    selectionRule: rows[0].selectionRule
  };
}

export function mapWaterSenseFlushActivity(database, {
  fixtureType,
  femaleEligiblePopulation,
  maleEligiblePopulation,
  customerOrVisitorPopulation = 0,
  inScopeFixtureCount,
  operatingDaysPerWeek,
  activeWeeksPerYear,
  allocationMethod
}) {
  assertNetworkDisabled();
  if (!["TOILET", "URINAL"].includes(fixtureType)) {
    throw new Error(
      "INCOMPATIBLE_WATERSENSE_FLUSH_SCOPE: fixtureType must be TOILET or URINAL"
    );
  }
  if (allocationMethod !== "COMPLETE_ELIGIBLE_GROUP") {
    throw new Error(
      "UNSUPPORTED_FLUSH_ACTIVITY_ALLOCATION: only a complete eligible fixture group is proved"
    );
  }
  const female = nonnegativeInteger(
    femaleEligiblePopulation,
    "femaleEligiblePopulation"
  );
  const male = nonnegativeInteger(
    maleEligiblePopulation,
    "maleEligiblePopulation"
  );
  const visitors = nonnegativeInteger(
    customerOrVisitorPopulation,
    "customerOrVisitorPopulation"
  );
  positiveInteger(
    inScopeFixtureCount,
    "inScopeFixtureCount",
    1_000_000
  );
  const daysPerWeek = positiveInteger(
    operatingDaysPerWeek,
    "operatingDaysPerWeek",
    7
  );
  const weeksPerYear = positiveInteger(
    activeWeeksPerYear,
    "activeWeeksPerYear",
    53
  );
  if (visitors !== 0) {
    throw new Error(
      "UNSUPPORTED_VISITOR_ALLOCATION: WaterSense assumptions require an eligible male/female population split"
    );
  }
  if (fixtureType === "URINAL" && female !== 0) {
    throw new Error(
      "INCOMPATIBLE_WATERSENSE_FLUSH_SCOPE: urinal activity accepts male eligible population only"
    );
  }
  const assumptions = assumptionsForFixture(
    database,
    fixtureType
  );
  const dailyFlushes =
    fixtureType === "TOILET"
      ? female *
          assumptions.values.female_flushes_per_operating_day +
        male *
          assumptions.values.male_flushes_per_operating_day
      : male *
        assumptions.values.male_flushes_per_operating_day;
  if (dailyFlushes <= 0) {
    throw new Error(
      "INVALID_PROJECT_INPUT: eligible population must produce positive daily flush activity"
    );
  }
  const annualOperatingDays = daysPerWeek * weeksPerYear;
  const annualFlushes = dailyFlushes * annualOperatingDays;
  const sourceArtifactId =
    fixtureType === "TOILET"
      ? TOILET_ARTIFACT_ID
      : URINAL_ARTIFACT_ID;
  const sourceArtifact =
    fixtureType === "TOILET"
      ? WATERSENSE_TOILET_ACTIVITY_ARTIFACT
      : WATERSENSE_URINAL_ACTIVITY_ARTIFACT;
  const sourceFields =
    fixtureType === "TOILET"
      ? [
          "Section 3.1 female toilet flushes per day",
          "Section 3.1 male toilet flushes per day",
          "Section 3.1 Equation 2"
        ]
      : [
          "Section 3.2 male urinal flushes per day",
          "Section 3.2 Equation 2"
        ];
  const filters = {
    fixtureType,
    femaleEligiblePopulation: female,
    maleEligiblePopulation: male,
    customerOrVisitorPopulation: visitors,
    inScopeFixtureCount,
    operatingDaysPerWeek: daysPerWeek,
    activeWeeksPerYear: weeksPerYear,
    annualOperatingDays,
    allocationMethod
  };
  const values = {
    total_annual_flushes_group: annualFlushes
  };
  return {
    standardId: STANDARD_ID,
    categoryId: "ITC-33",
    processKey: "flush_activity",
    sourceArtifactId,
    sourceReleaseId: RELEASE_ID,
    values,
    formulaBindings: [
      {
        outputName:
          "Total annual flushes across the in-scope fixture group",
        formulaTerm: "total_annual_flushes_group",
        value: annualFlushes,
        unit: "flushes/year",
        scope: "PROJECT_TOTAL"
      }
    ],
    selectionRule: assumptions.selectionRule,
    warnings: [
      "This is a WaterSense activity benchmark, not observed project usage.",
      "The returned value is already the total for the complete in-scope fixture group and must not be multiplied by fixture count again."
    ],
    provenance: buildProvenance({
      standardId: STANDARD_ID,
      artifact: sourceArtifact,
      sourceVersion:
        `WaterSense at Work 2023 Section ${fixtureType === "TOILET" ? "3.1" : "3.2"}`,
      sourceFields,
      filters,
      transformation:
        "annual group flushes = sex-specific eligible population flushes per operating day * operating days per week * active weeks per year; fixture count is retained as group-boundary metadata and is not multiplied again",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordWaterSenseFlushActivity(
  database,
  result
) {
  assertNetworkDisabled();
  if (
    !result ||
    result.standardId !== STANDARD_ID ||
    result.categoryId !== "ITC-33" ||
    result.processKey !== "flush_activity"
  ) {
    throw new Error("INVALID_WATERSENSE_FLUSH_ACTIVITY_RESULT");
  }
  const inputHash = sha256Json(result.provenance.filters);
  const calculationId =
    `calculation:context:watersense-flush:${RELEASE_ID}:` +
    inputHash.slice(0, 20);
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled,
      status, created_at
    ) VALUES (?, ?, 'flush_activity', ?, NULL,
      'context-watersense-flush-v1', ?, ?, 1, 'SUCCEEDED', ?)
    ON CONFLICT(id) DO UPDATE SET
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256,
      status = excluded.status
  `).run(
    calculationId,
    STANDARD_ID,
    RELEASE_ID,
    inputHash,
    sha256Json(result.values),
    ACQUIRED_AT
  );
  const binding = result.formulaBindings[0];
  const selectedValueId =
    `${calculationId}:${binding.formulaTerm}`;
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope,
      selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      value = excluded.value,
      unit = excluded.unit,
      scope = excluded.scope,
      selection_rule = excluded.selection_rule
  `).run(
    selectedValueId,
    calculationId,
    binding.formulaTerm,
    binding.value,
    binding.unit,
    binding.scope,
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
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `).run(
    selectedValueId,
    result.sourceArtifactId,
    JSON.stringify(result.provenance.sourceFields),
    JSON.stringify(result.provenance.filters),
    result.provenance.transformation,
    ADAPTER_PATH
  );
  return calculationId;
}
