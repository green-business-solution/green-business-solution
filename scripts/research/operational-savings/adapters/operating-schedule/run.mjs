import { readFile } from "node:fs/promises";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import { annualScheduledHours, offsetMinutesAt } from "./calendar.mjs";
import { minutesToClock, solarEventsUtc } from "./astronomy.mjs";
import { USNO_REFERENCE_URL } from "./acquire.mjs";

export const USNO_REFERENCE_ARTIFACT = Object.freeze({
  byteSize: 1271,
  sha256: "e096159b03d9fe91f287898142a567809a83d794f6c8aaad6b8809bb2378f812"
});
export const PROJECT_SCHEDULE_FIXTURE = Object.freeze({
  byteSize: 1733,
  sha256: "6f04cc946059db68af035991cfa40a30652ced58b24ec0800173ee8f1bb268aa"
});
export const OPERATING_SCHEDULE_DEPENDENCY_ROLES = Object.freeze({
  astronomyModelValidation: "astronomy_model_validation"
});

const SOURCE_ID = "source:usno-rise-set";
const RELEASE_ID = "release:usno-rise-set:api-v4:2026-06-21";
const SCHEMA_ID = "schema:usno-rise-set:api-v4";
const ARTIFACT_ID = "artifact:usno-rise-set:sf-2026-06-21";
const PROJECT_INPUT_OWNERSHIP = "PROJECT_OR_PROFILE";
const PROJECT_INPUT_VERSION =
  "project-owned-operating-schedule-input-v1";
const CALCULATION_KINDS = Object.freeze({
  weeklyCalendar: "WEEKLY_CALENDAR",
  scheduleDifference: "SCHEDULE_DIFFERENCE",
  daylightSolarModel: "DAYLIGHT_SOLAR_MODEL"
});
const PROJECT_WEEKLY_SOURCE_FIELDS = Object.freeze([
  "year",
  "timeZone",
  "weekly",
  "exceptions",
  "holidays",
  "activeWeeks"
]);
const PROJECT_DIFFERENCE_SOURCE_FIELDS = Object.freeze([
  "year",
  "timeZone",
  "existingWeekly",
  "proposedWeekly",
  "existingExceptions",
  "proposedExceptions",
  "holidays",
  "activeWeeks"
]);
const PROJECT_DAYLIGHT_SOURCE_FIELDS = Object.freeze([
  "year",
  "timeZone",
  "latitude",
  "longitude",
  "switchOnOffsetMinutes",
  "switchOffOffsetMinutes"
]);
const USNO_ASTRONOMY_SOURCE_FIELDS = Object.freeze([
  "properties.data.sundata[].phen",
  "properties.data.sundata[].time",
  "properties.data.tz",
  "properties.data.isdst"
]);
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/operating-schedule/run.mjs";

export function operatingScheduleReferenceId({
  releaseId = RELEASE_ID,
  localDate,
  eventName
}) {
  for (const [field, value] of Object.entries({
    releaseId,
    localDate,
    eventName
  })) {
    if (typeof value !== "string" || !value) {
      throw new Error(
        `INVALID_RELEASE_SCOPED_REFERENCE_ID_INPUT: ${field}`
      );
    }
  }
  return `usno:${releaseId}:${localDate}:${eventName}`;
}

function projectInputProvenance({
  filters,
  sourceFields,
  transformation
}) {
  const inputSnapshot = JSON.stringify(filters);
  const payload = {
    standardId: "STD-OPERATING-SCHEDULE",
    inputOwnership: PROJECT_INPUT_OWNERSHIP,
    evidenceKind: "CONTENT_ADDRESSED_CALCULATION_INPUT",
    inputContractVersion: PROJECT_INPUT_VERSION,
    inputSnapshotSha256: sha256Json(filters),
    inputSnapshotByteSize: Buffer.byteLength(inputSnapshot),
    sourceFields,
    filters,
    transformation,
    adapterPath: ADAPTER_PATH
  };
  return {
    ...payload,
    provenanceSha256: sha256Json(payload)
  };
}

function projectOwnedResultFields() {
  return {
    sourceArtifactId: null,
    sourceReleaseId: null,
    inputOwnership: PROJECT_INPUT_OWNERSHIP
  };
}

function usnoAstronomyValidationDependency() {
  return {
    dependencyRole:
      OPERATING_SCHEDULE_DEPENDENCY_ROLES.astronomyModelValidation,
    sourceArtifactId: ARTIFACT_ID,
    sourceFields: [...USNO_ASTRONOMY_SOURCE_FIELDS],
    transformation:
      "The pinned USNO one-day response validates the local solar-event algorithm boundary and does not supply project schedule, location, or control inputs."
  };
}

function sunEventMap(payload) {
  const data = payload.properties?.data;
  if (!data || !Array.isArray(data.sundata)) {
    throw new Error("SOURCE_SCHEMA_DRIFT: properties.data.sundata is missing");
  }
  return Object.fromEntries(data.sundata.map((entry) => {
    const match = String(entry.time).match(/^(\d{2}:\d{2})/);
    if (!match) {
      throw new Error(`SOURCE_SCHEMA_DRIFT: invalid USNO clock ${entry.time}`);
    }
    return [entry.phen, match[1]];
  }));
}

function clockMinutes(value) {
  const match = String(value).match(/^(\d{2}):(\d{2})$/);
  if (!match) throw new Error(`SOURCE_SCHEMA_DRIFT: invalid USNO clock ${value}`);
  return Number(match[1]) * 60 + Number(match[2]);
}

export async function inspectAndPublishUsnoReference({
  artifactPath,
  database,
  expectedArtifact = USNO_REFERENCE_ARTIFACT
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(artifactPath, expectedArtifact);
  const payload = JSON.parse(await readFile(artifactPath, "utf8"));
  const events = sunEventMap(payload);
  for (const required of [
    "Begin Civil Twilight",
    "Rise",
    "Upper Transit",
    "Set",
    "End Civil Twilight"
  ]) {
    if (!events[required]) {
      throw new Error(`SOURCE_SCHEMA_DRIFT: missing USNO phenomenon ${required}`);
    }
  }
  const schema = {
    format: "GeoJSON",
    apiVersion: payload.apiversion,
    nativePaths: [
      "apiversion",
      "geometry.coordinates",
      "properties.data.year",
      "properties.data.month",
      "properties.data.day",
      "properties.data.tz",
      "properties.data.isdst",
      "properties.data.sundata[].phen",
      "properties.data.sundata[].time"
    ],
    phenomena: Object.keys(events)
  };
  upsertSourceProof(database, {
    source: {
      id: SOURCE_ID,
      standardId: "STD-OPERATING-SCHEDULE",
      organization: "U.S. Naval Observatory",
      name: "Complete Sun and Moon Data for One Day API",
      primaryUrl: USNO_REFERENCE_URL,
      license: "U.S. government astronomical data",
      attribution: "U.S. Naval Observatory Astronomical Applications Department",
      accessMode: "PUBLIC_API_ACQUISITION_ONLY"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: sha256Json(schema),
      kind: "USNO_GEOJSON",
      observed: schema,
      inspectedAt: "2026-07-24T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: `USNO API ${payload.apiversion}`,
      publishedAt: null,
      acquiredAt: "2026-07-24T00:00:00.000Z",
      status: "PUBLISHED"
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl: USNO_REFERENCE_URL,
      localName: "usno-sf-2026-06-21.json",
      mediaType: "application/geo+json",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: "ingestion:usno-rise-set:sf-2026-06-21:v1",
      adapterVersion: "operating-schedule-v1",
      startedAt: "2026-07-24T00:00:00.000Z",
      finishedAt: "2026-07-24T00:00:00.000Z",
      status: "SUCCEEDED",
      recordsRead: Object.keys(events).length,
      recordsWritten: Object.keys(events).length,
      warningCount: 0
    }
  });
  const insert = database.prepare(`
    INSERT INTO operating_schedule_references (
      id, source_release_id, reference_kind, location, local_date, event_name,
      local_time, native_text
    ) VALUES (?, ?, 'USNO_SOLAR_EVENT', ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET local_time = excluded.local_time
  `);
  const data = payload.properties.data;
  const localDate = [
    data.year,
    String(data.month).padStart(2, "0"),
    String(data.day).padStart(2, "0")
  ].join("-");
  for (const [eventName, localTime] of Object.entries(events)) {
    insert.run(
      operatingScheduleReferenceId({
        releaseId: RELEASE_ID,
        localDate,
        eventName
      }),
      RELEASE_ID,
      "San Francisco, CA (37.7749,-122.4194)",
      localDate,
      eventName,
      localTime,
      JSON.stringify({ phen: eventName, time: localTime })
    );
  }
  return { artifact, payload, events, schema, releaseId: RELEASE_ID };
}

export function compareNoaaAlgorithmToUsno(payload) {
  assertNetworkDisabled();
  const events = sunEventMap(payload);
  const data = payload.properties.data;
  const date = new Date(Date.UTC(data.year, data.month - 1, data.day));
  const calculated = solarEventsUtc({
    date,
    latitude: 37.7749,
    longitude: -122.4194
  });
  const midnightUtc = Date.UTC(data.year, data.month - 1, data.day);
  const offset = offsetMinutesAt(midnightUtc + 12 * 3_600_000, "America/Los_Angeles");
  const riseLocal = calculated.sunriseUtcMinutes + offset;
  const setLocal = calculated.sunsetUtcMinutes + offset;
  const riseDifferenceMinutes = Math.abs(riseLocal - clockMinutes(events.Rise));
  const setDifferenceMinutes = Math.abs(setLocal - clockMinutes(events.Set));
  return {
    calculated: {
      rise: minutesToClock(riseLocal),
      set: minutesToClock(setLocal)
    },
    official: {
      rise: events.Rise,
      set: events.Set
    },
    riseDifferenceMinutes,
    setDifferenceMinutes
  };
}

export function mapWeeklyScheduleToFormula({
  year,
  timeZone,
  weekly,
  exceptions,
  holidays,
  activeWeeks,
  categoryId,
  processKey,
  formulaTerm = "annual_hours"
}) {
  assertNetworkDisabled();
  const value = annualScheduledHours({
    year,
    timeZone,
    weekly,
    exceptions,
    holidays,
    activeWeeks
  });
  const filters = {
    year,
    timeZone,
    weekly,
    exceptions: exceptions ?? {},
    holidays: holidays ?? [],
    activeWeeks: activeWeeks ?? null
  };
  const binding = {
    outputName:
      formulaTerm === "avoided_run_hours"
        ? "Avoided annual recirculation pump run hours"
        : formulaTerm === "hours_period"
          ? "Operating hours by modeled period"
          : formulaTerm === "annual_pressurized_hours"
            ? "Annual pressurized hours"
            : formulaTerm === "annual_operating_hours"
              ? "Annual operating hours"
              : "Annual operating hours",
    formulaTerm,
    value,
    unit: formulaTerm === "hours_period" ? "hours/period" : "hours/year",
    scope: formulaTerm === "hours_period" ? "PROFILE" : "PER_YEAR"
  };
  return {
    standardId: "STD-OPERATING-SCHEDULE",
    categoryId,
    processKey,
    calculationKind: CALCULATION_KINDS.weeklyCalendar,
    ...projectOwnedResultFields(),
    sourceDependencies: [],
    value,
    unit: binding.unit,
    scope: binding.scope,
    formulaTerm,
    formulaBindings: [binding],
    selectionRule: "EXACT_PROJECT_CALENDAR_SCHEDULE",
    provenance: projectInputProvenance({
      sourceFields: [...PROJECT_WEEKLY_SOURCE_FIELDS],
      filters,
      transformation:
        "Local calendar enumeration of the caller-owned weekly schedule with IANA time-zone boundaries and explicit exceptions"
    })
  };
}

export function mapScheduleDifferenceToFormula({
  year,
  timeZone,
  existingWeekly,
  proposedWeekly,
  existingExceptions,
  proposedExceptions,
  holidays,
  activeWeeks,
  categoryId,
  processKey,
  formulaTerm = "avoided_run_hours"
}) {
  assertNetworkDisabled();
  const existingHours = annualScheduledHours({
    year,
    timeZone,
    weekly: existingWeekly,
    exceptions: existingExceptions,
    holidays,
    activeWeeks
  });
  const proposedHours = annualScheduledHours({
    year,
    timeZone,
    weekly: proposedWeekly,
    exceptions: proposedExceptions,
    holidays,
    activeWeeks
  });
  if (proposedHours > existingHours) {
    throw new Error(
      "INCOMPATIBLE_SCHEDULE_DIRECTION: proposed hours exceed existing hours"
    );
  }
  const value = existingHours - proposedHours;
  const filters = {
    year,
    timeZone,
    existingWeekly,
    proposedWeekly,
    existingExceptions: existingExceptions ?? {},
    proposedExceptions: proposedExceptions ?? {},
    holidays: holidays ?? [],
    activeWeeks: activeWeeks ?? null
  };
  return {
    standardId: "STD-OPERATING-SCHEDULE",
    categoryId,
    processKey,
    calculationKind:
      CALCULATION_KINDS.scheduleDifference,
    ...projectOwnedResultFields(),
    sourceDependencies: [],
    value,
    unit: "hours/year",
    scope: "PER_YEAR",
    formulaTerm,
    formulaBindings: [
      {
        outputName: "Avoided annual recirculation pump run hours",
        formulaTerm,
        value,
        unit: "hours/year",
        scope: "PER_YEAR"
      }
    ],
    selectionRule:
      "EXACT_PROJECT_EXISTING_MINUS_PROPOSED_CALENDAR_SCHEDULES",
    provenance: projectInputProvenance({
      sourceFields: [...PROJECT_DIFFERENCE_SOURCE_FIELDS],
      filters,
      transformation:
        "Difference between independently enumerated caller-owned existing and proposed local calendar schedules"
    })
  };
}

export function mapDaylightScheduleToFormula({
  year,
  timeZone,
  latitude,
  longitude,
  switchOnOffsetMinutes = 0,
  switchOffOffsetMinutes = 0,
  categoryId = "ITC-02",
  processKey = "daylight-lighting-hours",
  formulaTerm = "annual_on_hours"
}) {
  assertNetworkDisabled();
  if (!Number.isInteger(year) || year < 1970 || year > 2100) {
    throw new Error(`INVALID_CALENDAR_YEAR: ${year}`);
  }
  new Intl.DateTimeFormat("en", { timeZone }).format(0);
  for (const [label, value] of [
    ["switchOnOffsetMinutes", switchOnOffsetMinutes],
    ["switchOffOffsetMinutes", switchOffOffsetMinutes]
  ]) {
    if (!Number.isFinite(value) || Math.abs(value) > 720) {
      throw new Error(`INVALID_CONTROL_OFFSET: ${label}`);
    }
  }
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1);
  let totalMinutes = 0;
  for (let cursor = start; cursor < end; cursor += 86_400_000) {
    const events = solarEventsUtc({
      date: new Date(cursor),
      latitude,
      longitude
    });
    if (
      events.sunriseUtcMinutes === null ||
      events.sunsetUtcMinutes === null
    ) {
      throw new Error(
        "POLAR_DAYLIGHT_UNSUPPORTED: sunrise or sunset is absent"
      );
    }
    const daylightMinutes =
      events.sunsetUtcMinutes - events.sunriseUtcMinutes;
    const controlledNightMinutes =
      1440 -
      daylightMinutes -
      switchOnOffsetMinutes +
      switchOffOffsetMinutes;
    if (controlledNightMinutes < 0 || controlledNightMinutes > 1440) {
      throw new Error(
        "INVALID_CONTROL_OFFSETS: computed daily operating hours are outside the day"
      );
    }
    totalMinutes += controlledNightMinutes;
  }
  const value = totalMinutes / 60;
  const filters = {
    year,
    timeZone,
    latitude,
    longitude,
    switchOnOffsetMinutes,
    switchOffOffsetMinutes,
    eventDefinition: "sunrise/sunset at 90.833 degree zenith"
  };
  return {
    standardId: "STD-OPERATING-SCHEDULE",
    categoryId,
    processKey,
    calculationKind:
      CALCULATION_KINDS.daylightSolarModel,
    ...projectOwnedResultFields(),
    sourceDependencies: [
      usnoAstronomyValidationDependency()
    ],
    value,
    unit: "hours/year",
    scope: "PER_YEAR",
    formulaTerm,
    formulaBindings: [
      {
        outputName: "Annual daylight-based operating hours",
        formulaTerm,
        value,
        unit: "hours/year",
        scope: "PER_YEAR"
      }
    ],
    selectionRule:
      "PROJECT_SITE_INPUTS_WITH_USNO_VALIDATED_SOLAR_MODEL",
    provenance: projectInputProvenance({
      sourceFields: [...PROJECT_DAYLIGHT_SOURCE_FIELDS],
      filters,
      transformation:
        "Daily sunset-to-next-sunrise duration from the locally executed solar model using caller-owned site inputs, adjusted only by explicit control offsets"
    })
  };
}

function validateSourceDependencies(database, dependencies) {
  if (!Array.isArray(dependencies)) {
    throw new Error(
      "INVALID_OPERATING_SCHEDULE_SOURCE_DEPENDENCIES"
    );
  }
  const roles = new Set();
  for (const dependency of dependencies) {
    if (
      !dependency ||
      typeof dependency.dependencyRole !== "string" ||
      !dependency.dependencyRole.trim() ||
      roles.has(dependency.dependencyRole) ||
      typeof dependency.sourceArtifactId !== "string" ||
      !Array.isArray(dependency.sourceFields) ||
      typeof dependency.transformation !== "string" ||
      !dependency.transformation.trim() ||
      !database.prepare(
        "SELECT 1 AS present FROM source_artifacts WHERE id = ?"
      ).get(dependency.sourceArtifactId)
    ) {
      throw new Error(
        "INVALID_OPERATING_SCHEDULE_SOURCE_DEPENDENCIES"
      );
    }
    roles.add(dependency.dependencyRole);
  }
  return dependencies;
}

function validateDependencySemantics(result, dependencies) {
  if (
    result.calculationKind ===
      CALCULATION_KINDS.weeklyCalendar ||
    result.calculationKind ===
      CALCULATION_KINDS.scheduleDifference
  ) {
    if (dependencies.length === 0) return dependencies;
  } else if (
    result.calculationKind ===
    CALCULATION_KINDS.daylightSolarModel
  ) {
    const expected =
      usnoAstronomyValidationDependency();
    const actual = dependencies[0];
    if (
      dependencies.length === 1 &&
      actual.dependencyRole ===
        expected.dependencyRole &&
      actual.sourceArtifactId ===
        expected.sourceArtifactId &&
      JSON.stringify(actual.sourceFields) ===
        JSON.stringify(expected.sourceFields) &&
      actual.transformation ===
        expected.transformation
    ) {
      return dependencies;
    }
  }
  throw new Error(
    "INVALID_OPERATING_SCHEDULE_DEPENDENCY_SEMANTICS"
  );
}

function validateProjectInputProvenance(provenance) {
  if (
    !provenance ||
    typeof provenance !== "object" ||
    Array.isArray(provenance)
  ) {
    throw new Error(
      "INVALID_OPERATING_SCHEDULE_INPUT_PROVENANCE"
    );
  }
  const {
    provenanceSha256,
    ...provenancePayload
  } = provenance;
  const inputSnapshot = JSON.stringify(provenance.filters);
  if (
    provenance.standardId !== "STD-OPERATING-SCHEDULE" ||
    provenance.inputOwnership !== PROJECT_INPUT_OWNERSHIP ||
    provenance.evidenceKind !==
      "CONTENT_ADDRESSED_CALCULATION_INPUT" ||
    provenance.inputContractVersion !==
      PROJECT_INPUT_VERSION ||
    !provenance.filters ||
    typeof provenance.filters !== "object" ||
    Array.isArray(provenance.filters) ||
    !Array.isArray(provenance.sourceFields) ||
    provenance.sourceFields.length === 0 ||
    typeof provenance.transformation !== "string" ||
    !provenance.transformation.trim() ||
    provenance.adapterPath !== ADAPTER_PATH ||
    provenance.inputSnapshotSha256 !==
      sha256Json(provenance.filters) ||
    provenance.inputSnapshotByteSize !==
      Buffer.byteLength(inputSnapshot) ||
    provenanceSha256 !== sha256Json(provenancePayload)
  ) {
    throw new Error(
      "INVALID_OPERATING_SCHEDULE_INPUT_PROVENANCE"
    );
  }
  return provenance;
}

export function recordOperatingScheduleFormulaMapping(database, result) {
  assertNetworkDisabled();
  const binding = result?.formulaBindings?.[0];
  if (
    !result ||
    result.standardId !== "STD-OPERATING-SCHEDULE" ||
    !/^ITC-\d{2}$/.test(result.categoryId) ||
    typeof result.processKey !== "string" ||
    !result.processKey.trim() ||
    typeof result.formulaTerm !== "string" ||
    !result.formulaTerm.trim() ||
    result.sourceArtifactId !== null ||
    result.sourceReleaseId !== null ||
    result.inputOwnership !== PROJECT_INPUT_OWNERSHIP ||
    !Array.isArray(result.formulaBindings) ||
    result.formulaBindings.length !== 1 ||
    !Number.isFinite(result.value) ||
    binding?.formulaTerm !== result.formulaTerm ||
    binding?.value !== result.value ||
    binding?.unit !== result.unit ||
    binding?.scope !== result.scope
  ) {
    throw new Error("INVALID_OPERATING_SCHEDULE_RESULT");
  }
  validateProjectInputProvenance(result.provenance);
  const sourceDependencies = validateDependencySemantics(
    result,
    validateSourceDependencies(
      database,
      result.sourceDependencies
    )
  );
  const inputSha256 = sha256Json(result.provenance.filters);
  if (
    result.provenance.inputSnapshotSha256 !== inputSha256
  ) {
    throw new Error(
      "OPERATING_SCHEDULE_INPUT_PROVENANCE_MISMATCH"
    );
  }
  const calculationId = [
    "calculation",
    "operating-schedule",
    result.categoryId.toLowerCase(),
    result.processKey,
    result.formulaTerm,
    inputSha256.slice(0, 16)
  ].join(":");
  const valueId = `${calculationId}:${binding.formulaTerm}`;
  database.exec("BEGIN IMMEDIATE");
  try {
    database.prepare(`
      INSERT INTO calculation_runs (
        id, standard_id, process_key, source_release_id, model_version_id,
        adapter_version, input_sha256, output_sha256, network_disabled, status,
        created_at
      ) VALUES (?, 'STD-OPERATING-SCHEDULE', ?, NULL, NULL,
        'operating-schedule-v2', ?, ?, 1, 'SUCCEEDED',
        '2026-07-24T00:00:00.000Z')
      ON CONFLICT(id) DO UPDATE SET
        source_release_id = excluded.source_release_id,
        input_sha256 = excluded.input_sha256,
        output_sha256 = excluded.output_sha256,
        status = excluded.status
    `).run(
      calculationId,
      result.processKey,
      inputSha256,
      sha256Json({
        formulaTerm: result.formulaTerm,
        value: result.value,
        unit: result.unit,
        scope: result.scope
      })
    );
    database.prepare(`
      INSERT INTO selected_values (
        id, calculation_run_id, formula_term, value, value_json, unit, scope,
        selection_rule
      ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        value = excluded.value,
        unit = excluded.unit,
        scope = excluded.scope,
        selection_rule = excluded.selection_rule
    `).run(
      valueId,
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
      ) VALUES (?, NULL, ?, ?, ?, ?)
      ON CONFLICT(selected_value_id) DO UPDATE SET
        source_artifact_id = excluded.source_artifact_id,
        source_fields_json = excluded.source_fields_json,
        filters_json = excluded.filters_json,
        transformation = excluded.transformation,
        adapter_path = excluded.adapter_path
    `).run(
      valueId,
      JSON.stringify(result.provenance.sourceFields),
      JSON.stringify(result.provenance.filters),
      result.provenance.transformation,
      ADAPTER_PATH
    );
    database.prepare(`
      DELETE FROM calculation_source_dependencies
      WHERE calculation_run_id = ?
    `).run(calculationId);
    const insertDependency = database.prepare(`
      INSERT INTO calculation_source_dependencies (
        calculation_run_id, dependency_role,
        input_calculation_run_id, source_artifact_id,
        source_fields_json, transformation
      ) VALUES (?, ?, NULL, ?, ?, ?)
    `);
    for (const dependency of sourceDependencies) {
      insertDependency.run(
        calculationId,
        dependency.dependencyRole,
        dependency.sourceArtifactId,
        JSON.stringify(dependency.sourceFields),
        dependency.transformation
      );
    }
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
  return calculationId;
}
