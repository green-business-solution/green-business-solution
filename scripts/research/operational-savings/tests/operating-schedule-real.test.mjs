import {
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import { annualScheduledHours } from "../adapters/operating-schedule/calendar.mjs";
import {
  compareNoaaAlgorithmToUsno,
  inspectAndPublishUsnoReference,
  mapDaylightScheduleToFormula,
  mapScheduleDifferenceToFormula,
  mapWeeklyScheduleToFormula,
  OPERATING_SCHEDULE_DEPENDENCY_ROLES,
  operatingScheduleReferenceId,
  PROJECT_SCHEDULE_FIXTURE,
  recordOperatingScheduleFormulaMapping,
  USNO_REFERENCE_ARTIFACT
} from "../adapters/operating-schedule/run.mjs";
import { sha256File } from "../lib/artifact.mjs";
import {
  openResearchDatabase,
  readMigrationSql
} from "../lib/sqlite.mjs";

const repoRoot = fileURLToPath(new URL("../../../..", import.meta.url));
const artifactPath = join(
  repoRoot,
  "scripts/research/operational-savings/.cache/artifacts/usno-sf-2026-06-21.json"
);
const projectScheduleFixturePath = join(
  repoRoot,
  "scripts/research/operational-savings/adapters/operating-schedule/project-schedule-fixtures.v1.json"
);

let database;
let temporaryRoot;
let proof;
let projectScheduleFixtures;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryRoot = await mkdtemp(join(tmpdir(), "retrofi-schedule-proof-"));
  database = await openResearchDatabase(
    join(temporaryRoot, "research.sqlite"),
    { deferReleasePublicationUntilClose: true }
  );
  proof = await inspectAndPublishUsnoReference({ artifactPath, database });
  projectScheduleFixtures = JSON.parse(
    await readFile(projectScheduleFixturePath, "utf8")
  );
});

afterAll(async () => {
  database?.close();
  if (temporaryRoot) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
});

test("pins and publishes the official USNO GeoJSON schema", () => {
  expect(USNO_REFERENCE_ARTIFACT.sha256).toHaveLength(64);
  expect(proof.events).toMatchObject({
    Rise: expect.stringMatching(/^\d{2}:\d{2}$/),
    Set: expect.stringMatching(/^\d{2}:\d{2}$/)
  });
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM operating_schedule_references"
  ).get().count
  ).toBeGreaterThanOrEqual(5);
});

test("scopes stable solar-event identities to the exact source release", () => {
  const currentId = operatingScheduleReferenceId({
    releaseId: proof.releaseId,
    localDate: "2026-06-21",
    eventName: "Rise"
  });
  const laterId = operatingScheduleReferenceId({
    releaseId: "release:usno-rise-set:later",
    localDate: "2026-06-21",
    eventName: "Rise"
  });
  expect(laterId).not.toBe(currentId);
  expect(
    database.prepare(`
      SELECT id, source_release_id AS sourceReleaseId
      FROM operating_schedule_references
      WHERE id = ?
    `).get(currentId)
  ).toEqual({
    id: currentId,
    sourceReleaseId: proof.releaseId
  });
});

test("pins the project-owned schedule fixture separately from USNO evidence", async () => {
  const fixtureBytes = await readFile(
    projectScheduleFixturePath
  );
  expect(await sha256File(projectScheduleFixturePath)).toBe(
    PROJECT_SCHEDULE_FIXTURE.sha256
  );
  expect(fixtureBytes.byteLength).toBe(
    PROJECT_SCHEDULE_FIXTURE.byteSize
  );
  expect(projectScheduleFixtures).toMatchObject({
    schemaVersion:
      "operational-savings/project-schedule-fixtures-v1",
    inputOwnership: "PROJECT_OR_PROFILE"
  });
});

test("matches the official USNO sunrise and sunset within two minutes", () => {
  const comparison = compareNoaaAlgorithmToUsno(proof.payload);
  expect(comparison.riseDifferenceMinutes).toBeLessThanOrEqual(2);
  expect(comparison.setDifferenceMinutes).toBeLessThanOrEqual(2);
});

test("counts an explicit weekly schedule with holidays and exceptions", () => {
  const hours = annualScheduledHours({
    year: 2026,
    timeZone: "America/Los_Angeles",
    weekly: {
      monday: [["09:00", "17:00"]],
      tuesday: [["09:00", "17:00"]],
      wednesday: [["09:00", "17:00"]],
      thursday: [["09:00", "17:00"]],
      friday: [["09:00", "17:00"]]
    },
    holidays: ["2026-01-01"],
    exceptions: {
      "2026-07-03": [["09:00", "12:00"]]
    }
  });
  expect(hours).toBe(2075);
});

test("uses actual elapsed time across the spring daylight-saving transition", () => {
  const hours = annualScheduledHours({
    year: 2026,
    timeZone: "America/Los_Angeles",
    weekly: {},
    exceptions: {
      "2026-03-08": [["00:00", "04:00"]]
    }
  });
  expect(hours).toBe(3);
});

test("rejects a nonexistent local clock time during the spring transition", () => {
  expect(() =>
    annualScheduledHours({
      year: 2026,
      timeZone: "America/Los_Angeles",
      weekly: {},
      exceptions: {
        "2026-03-08": [["02:30", "03:30"]]
      }
    })
  ).toThrow(/NONEXISTENT_OR_AMBIGUOUS_LOCAL_TIME/);
});

test("maps the ITC-12 project schedule fixture without USNO value attribution", () => {
  const fixture =
    projectScheduleFixtures.cases.itc12AnnualHours;
  const result = mapWeeklyScheduleToFormula(fixture);
  expect(result).toMatchObject({
    sourceArtifactId: null,
    sourceReleaseId: null,
    inputOwnership: "PROJECT_OR_PROFILE",
    formulaTerm: "annual_hours",
    unit: "hours/year",
    scope: "PER_YEAR",
    value: fixture.expectedValue,
    sourceDependencies: []
  });
  expect(result.formulaBindings).toEqual([
    {
      outputName: "Annual operating hours",
      formulaTerm: "annual_hours",
      value: fixture.expectedValue,
      unit: "hours/year",
      scope: "PER_YEAR"
    }
  ]);
  expect(result.provenance).toMatchObject({
    inputOwnership: "PROJECT_OR_PROFILE",
    evidenceKind: "CONTENT_ADDRESSED_CALCULATION_INPUT",
    inputContractVersion:
      "project-owned-operating-schedule-input-v1",
    inputSnapshotSha256: expect.stringMatching(
      /^[a-f0-9]{64}$/
    ),
    inputSnapshotByteSize: expect.any(Number),
    sourceFields: [
      "year",
      "timeZone",
      "weekly",
      "exceptions",
      "holidays",
      "activeWeeks"
    ]
  });
  expect(result.provenance.sourceFields).not.toContain(
    "properties.data.sundata[].time"
  );
  expect(result.provenance).not.toHaveProperty(
    "artifactSha256"
  );
});

test("executes the separate ITC-02 fixed-schedule branch from project inputs", () => {
  const fixture =
    projectScheduleFixtures.cases.itc02FixedLighting;
  const result = mapWeeklyScheduleToFormula(fixture);
  expect(result).toMatchObject({
    categoryId: "ITC-02",
    processKey: "fixed-lighting-hours",
    formulaTerm: "annual_on_hours",
    value: fixture.expectedValue,
    sourceArtifactId: null,
    inputOwnership: "PROJECT_OR_PROFILE"
  });
  const calculationId =
    recordOperatingScheduleFormulaMapping(database, result);
  expect(
    database.prepare(`
      SELECT cr.source_release_id AS sourceReleaseId,
        svp.source_artifact_id AS sourceArtifactId
      FROM calculation_runs cr
      JOIN selected_values sv
        ON sv.calculation_run_id = cr.id
      JOIN selected_value_provenance svp
        ON svp.selected_value_id = sv.id
      WHERE cr.id = ?
    `).get(calculationId)
  ).toEqual({
    sourceReleaseId: null,
    sourceArtifactId: null
  });
});

test("maps an explicit schedule reduction to avoided recirculation hours", () => {
  const fixture =
    projectScheduleFixtures.cases.itc09RecirculationReduction;
  const result = mapScheduleDifferenceToFormula(fixture);
  expect(result).toMatchObject({
    sourceArtifactId: null,
    sourceReleaseId: null,
    inputOwnership: "PROJECT_OR_PROFILE",
    formulaTerm: "avoided_run_hours",
    unit: "hours/year",
    scope: "PER_YEAR",
    value: fixture.expectedValue,
    sourceDependencies: []
  });
  const calculationId =
    recordOperatingScheduleFormulaMapping(database, result);
  expect(
    database.prepare(`
      SELECT value, unit, scope
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    value: fixture.expectedValue,
    unit: "hours/year",
    scope: "PER_YEAR"
  });
  expect(() => mapScheduleDifferenceToFormula({
    year: 2026,
    timeZone: "America/Los_Angeles",
    existingWeekly: { monday: [["09:00", "13:00"]] },
    proposedWeekly: { monday: [["09:00", "17:00"]] },
    categoryId: "ITC-09",
    processKey: "operating_schedule"
  })).toThrow(/INCOMPATIBLE_SCHEDULE_DIRECTION/);
});

test("runs a full-year daylight-control model with the USNO-validated solar boundary", () => {
  const fixture =
    projectScheduleFixtures.cases.itc02DaylightLighting;
  const result = mapDaylightScheduleToFormula(fixture);
  expect(result).toMatchObject({
    categoryId: "ITC-02",
    processKey: "daylight-lighting-hours",
    sourceArtifactId: null,
    sourceReleaseId: null,
    inputOwnership: "PROJECT_OR_PROFILE",
    formulaTerm: "annual_on_hours",
    unit: "hours/year",
    scope: "PER_YEAR"
  });
  expect(result.provenance.sourceFields).toEqual([
    "year",
    "timeZone",
    "latitude",
    "longitude",
    "switchOnOffsetMinutes",
    "switchOffOffsetMinutes"
  ]);
  expect(result.sourceDependencies).toEqual([
    expect.objectContaining({
      dependencyRole:
        OPERATING_SCHEDULE_DEPENDENCY_ROLES.astronomyModelValidation,
      sourceArtifactId:
        "artifact:usno-rise-set:sf-2026-06-21",
      sourceFields: expect.arrayContaining([
        "properties.data.sundata[].phen",
        "properties.data.sundata[].time"
      ])
    })
  ]);
  expect(result.value).toBeCloseTo(
    fixture.expectedValue,
    9
  );
  expect(() => mapDaylightScheduleToFormula({
    year: 2026,
    timeZone: "America/Los_Angeles",
    latitude: 90,
    longitude: 0
  })).toThrow(/POLAR_DAYLIGHT_UNSUPPORTED/);
});

test("publishes exact schedule formula values and provenance to the research database", () => {
  const result = mapWeeklyScheduleToFormula(
    projectScheduleFixtures.cases.itc12AnnualHours
  );
  const calculationId = recordOperatingScheduleFormulaMapping(database, result);
  expect(
    database.prepare(`
      SELECT formula_term AS formulaTerm, value, unit, scope
      FROM selected_values
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    formulaTerm: "annual_hours",
    value: 416,
    unit: "hours/year",
    scope: "PER_YEAR"
  });
  expect(
    database.prepare(`
      SELECT source_artifact_id AS sourceArtifactId,
        source_fields_json AS sourceFieldsJson,
        adapter_path AS adapterPath
      FROM selected_value_provenance
      WHERE selected_value_id = ?
    `).get(`${calculationId}:annual_hours`)
  ).toEqual({
    sourceArtifactId: null,
    sourceFieldsJson: JSON.stringify([
      "year",
      "timeZone",
      "weekly",
      "exceptions",
      "holidays",
      "activeWeeks"
    ]),
    adapterPath:
      "scripts/research/operational-savings/adapters/operating-schedule/run.mjs"
  });
  expect(
    database.prepare(`
      SELECT source_release_id AS sourceReleaseId,
        input_sha256 AS inputSha256
      FROM calculation_runs
      WHERE id = ?
    `).get(calculationId)
  ).toEqual({
    sourceReleaseId: null,
    inputSha256: result.provenance.inputSnapshotSha256
  });
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM calculation_source_dependencies
      WHERE calculation_run_id = ?
    `).get(calculationId).count
  ).toBe(0);
  expect(() =>
    recordOperatingScheduleFormulaMapping(database, {
      ...result,
      provenance: {
        ...result.provenance,
        inputSnapshotSha256: "0".repeat(64)
      }
    })
  ).toThrow(
    /INVALID_OPERATING_SCHEDULE_INPUT_PROVENANCE/
  );
});

test("records USNO only as daylight astronomy validation evidence", () => {
  const result = mapDaylightScheduleToFormula(
    projectScheduleFixtures.cases.itc02DaylightLighting
  );
  const calculationId = recordOperatingScheduleFormulaMapping(
    database,
    result
  );
  expect(
    database.prepare(`
      SELECT source_artifact_id AS sourceArtifactId,
        source_fields_json AS sourceFieldsJson
      FROM selected_value_provenance
      WHERE selected_value_id = ?
    `).get(`${calculationId}:annual_on_hours`)
  ).toEqual({
    sourceArtifactId: null,
    sourceFieldsJson: JSON.stringify([
      "year",
      "timeZone",
      "latitude",
      "longitude",
      "switchOnOffsetMinutes",
      "switchOffOffsetMinutes"
    ])
  });
  expect(
    database.prepare(`
      SELECT dependency_role AS dependencyRole,
        input_calculation_run_id AS inputCalculationRunId,
        source_artifact_id AS sourceArtifactId,
        source_fields_json AS sourceFieldsJson
      FROM calculation_source_dependencies
      WHERE calculation_run_id = ?
    `).get(calculationId)
  ).toEqual({
    dependencyRole:
      OPERATING_SCHEDULE_DEPENDENCY_ROLES.astronomyModelValidation,
    inputCalculationRunId: null,
    sourceArtifactId:
      "artifact:usno-rise-set:sf-2026-06-21",
    sourceFieldsJson: JSON.stringify([
      "properties.data.sundata[].phen",
      "properties.data.sundata[].time",
      "properties.data.tz",
      "properties.data.isdst"
    ])
  });
  expect(() =>
    recordOperatingScheduleFormulaMapping(database, {
      ...result,
      sourceDependencies: []
    })
  ).toThrow(
    /INVALID_OPERATING_SCHEDULE_DEPENDENCY_SEMANTICS/
  );
});

test("preserves legacy source dependencies while making project-input artifacts nullable", () => {
  const migrationDatabase = new DatabaseSync(":memory:");
  try {
    migrationDatabase.exec(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE calculation_runs (
        id TEXT PRIMARY KEY
      );
      CREATE TABLE source_artifacts (
        id TEXT PRIMARY KEY
      );
      INSERT INTO calculation_runs (id)
      VALUES
        ('calculation:legacy-source'),
        ('calculation:project-input');
      INSERT INTO source_artifacts (id)
      VALUES ('artifact:legacy-source');
    `);
    migrationDatabase.exec(
      readMigrationSql(
        "009_calculation_source_dependencies.sql"
      )
    );
    migrationDatabase.prepare(`
      INSERT INTO calculation_source_dependencies (
        calculation_run_id, dependency_role,
        input_calculation_run_id, source_artifact_id,
        source_fields_json, transformation
      ) VALUES (
        'calculation:legacy-source', 'official_source',
        NULL, 'artifact:legacy-source',
        '["native_field"]', 'Legacy source transformation'
      )
    `).run();

    migrationDatabase.exec(
      readMigrationSql(
        "010_nullable_calculation_source_dependencies.sql"
      )
    );

    expect(
      migrationDatabase.prepare(`
        SELECT calculation_run_id AS calculationRunId,
          dependency_role AS dependencyRole,
          input_calculation_run_id AS inputCalculationRunId,
          source_artifact_id AS sourceArtifactId,
          source_fields_json AS sourceFieldsJson,
          transformation
        FROM calculation_source_dependencies
      `).get()
    ).toEqual({
      calculationRunId: "calculation:legacy-source",
      dependencyRole: "official_source",
      inputCalculationRunId: null,
      sourceArtifactId: "artifact:legacy-source",
      sourceFieldsJson: "[\"native_field\"]",
      transformation: "Legacy source transformation"
    });
    expect(
      migrationDatabase.prepare(`
        SELECT "notnull" AS "notNull"
        FROM pragma_table_info(
          'calculation_source_dependencies'
        )
        WHERE name = 'source_artifact_id'
      `).get()
    ).toEqual({ notNull: 0 });
    expect(
      migrationDatabase.prepare(`
        SELECT count(*) AS count
        FROM pragma_index_list(
          'calculation_source_dependencies'
        )
        WHERE name =
          'calculation_source_dependency_artifact_idx'
      `).get()
    ).toEqual({ count: 1 });
    expect(
      migrationDatabase.prepare(`
        SELECT count(*) AS count
        FROM pragma_index_list(
          'calculation_source_dependencies'
        )
        WHERE name =
          'calculation_source_dependency_input_run_idx'
      `).get()
    ).toEqual({ count: 1 });
    migrationDatabase.prepare(`
      INSERT INTO calculation_source_dependencies (
        calculation_run_id, dependency_role,
        input_calculation_run_id, source_artifact_id,
        source_fields_json, transformation
      ) VALUES (
        'calculation:legacy-source', 'project_schedule_input',
        'calculation:project-input', NULL,
        '["year","timeZone","weekly"]',
        'Content-addressed project schedule calculation input'
      )
    `).run();
    expect(
      migrationDatabase.prepare(`
        SELECT input_calculation_run_id AS inputCalculationRunId,
          source_artifact_id AS sourceArtifactId
        FROM calculation_source_dependencies
        WHERE calculation_run_id =
          'calculation:legacy-source'
          AND dependency_role = 'project_schedule_input'
      `).get()
    ).toEqual({
      inputCalculationRunId: "calculation:project-input",
      sourceArtifactId: null
    });
    expect(() =>
      migrationDatabase.prepare(`
        INSERT INTO calculation_source_dependencies (
          calculation_run_id, dependency_role,
          input_calculation_run_id, source_artifact_id,
          source_fields_json, transformation
        ) VALUES (
          'calculation:legacy-source', 'empty_lineage',
          NULL, NULL, '[]', 'Invalid empty dependency'
        )
      `).run()
    ).toThrow();
  } finally {
    migrationDatabase.close();
  }
});

test("fails closed when the USNO schema loses a required phenomenon", async () => {
  const payload = JSON.parse(await readFile(artifactPath, "utf8"));
  payload.properties.data.sundata = payload.properties.data.sundata.filter(
    (entry) => entry.phen !== "Set"
  );
  const mutationPath = join(temporaryRoot, "missing-set.json");
  await writeFile(mutationPath, JSON.stringify(payload), "utf8");
  await expect(
    inspectAndPublishUsnoReference({
      artifactPath: mutationPath,
      database,
      expectedArtifact: {}
    })
  ).rejects.toThrow(/SOURCE_SCHEMA_DRIFT: missing USNO phenomenon Set/);
});

test("fails closed when the pinned USNO artifact checksum changes", async () => {
  const payload = JSON.parse(await readFile(artifactPath, "utf8"));
  payload.properties.data.sundata[0].time = "00:00";
  const mutationPath = join(temporaryRoot, "corrupt-usno.json");
  await writeFile(
    mutationPath,
    `${JSON.stringify(payload)}\n`,
    "utf8"
  );
  await expect(
    inspectAndPublishUsnoReference({
      artifactPath: mutationPath,
      database
    })
  ).rejects.toThrow(/ARTIFACT_SIZE_MISMATCH|CORRUPT_CHECKSUM/);
});

test("rejects an invalid IANA time zone", () => {
  expect(() => annualScheduledHours({
    year: 2026,
    timeZone: "Not/A_Zone",
    weekly: {}
  })).toThrow();
});

test("requires the offline guard for formula mapping", () => {
  const previous = process.env.OS_RESEARCH_NETWORK;
  delete process.env.OS_RESEARCH_NETWORK;
  expect(() => mapWeeklyScheduleToFormula({
    year: 2026,
    timeZone: "America/Los_Angeles",
    weekly: {},
    categoryId: "ITC-12",
    processKey: "operating_schedule"
  })).toThrow(/OFFLINE_GUARD_REQUIRED/);
  process.env.OS_RESEARCH_NETWORK = previous;
});
