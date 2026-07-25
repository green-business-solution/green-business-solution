import { basename } from "node:path";

import {
  assertNetworkDisabled,
  buildProvenance,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import { loadAndInspectLandscapeWorkbook } from "./inspect-schema.mjs";

export const WATERSENSE_LANDSCAPE_ARTIFACT = Object.freeze({
  byteSize: 10_078_683,
  sha256: "77afb36cff3dcb77eacad4db34a8dba44bd48eb24485c886958afd58e1846273"
});

export const WATERSENSE_V2_METHOD_SOURCE = Object.freeze({
  sourceUrl:
    "https://www.epa.gov/system/files/documents/2025-12/watersense_water-budget-tool_v2.0.xlsx",
  byteSize: 9_678_937,
  sha256: "56fab916b37196655c9cf293928ca7d2f74a95fb44a47c0fc7bf5c770281201a",
  version: "WaterSense Water Budget Tool Version 2.0",
  nativeCells: Object.freeze({
    effectiveRainfallFraction: "Step 2-Baseline!E13 and B18",
    modifiedNetEto: "Step 2-Baseline!E15 and B19",
    baselineTir: "Step 2-Baseline!G22",
    baselineOutdoorWater: "Step 2-Baseline!G23",
    designCombinedFactor: "Step 3-Design Scenario!G24",
    designMonthlyTir: "Step 3-Design Scenario!H24",
    designAnnualTir: "Step 3-Design Scenario!H55",
    landscapeCoefficients: "Reference Equations & Data!B94:C100",
    irrigationEfficiencies: "Reference Equations & Data!B106:C110",
    controllerSavings: "Reference Equations & Data!B120:C122",
    professionalAuditSavings: "Reference Equations & Data!B124:C124",
    gallonsConversion: "Reference Equations & Data!B130:C130",
    applicationRate: "Reference Equations & Data!B131:C131"
  })
});

export const WATERSENSE_V2_CONSTANTS = Object.freeze({
  effectiveRainfallFraction: 0.25,
  gallonsPerInchSquareFoot: 0.6233,
  defaultApplicationRate: 0.58,
  baselineLandscapeCoefficient: 0.8,
  baselineIrrigationEfficiency: 0.71,
  landscapeTypes: Object.freeze({
    warm_season_turf: Object.freeze({
      nativeLabel: "Warm Season Turf",
      coefficient: 0.6
    }),
    cool_season_turf: Object.freeze({
      nativeLabel: "Cool Season Turf",
      coefficient: 0.8
    }),
    non_turf_plants: Object.freeze({
      nativeLabel: "Non-Turf Plants",
      coefficient: 0.65
    }),
    non_irrigated_ground: Object.freeze({
      nativeLabel:
        "Non-Irrigated Ground (including hardscape and softscape)",
      coefficient: 0
    }),
    xeriscape: Object.freeze({
      nativeLabel: "Xeriscape (plants for regions in warm, arid climates)",
      coefficient: 0.3
    }),
    vegetable_garden: Object.freeze({
      nativeLabel: "Vegetable Garden",
      coefficient: 0.8
    })
  }),
  irrigationEquipment: Object.freeze({
    spray_irrigation: Object.freeze({
      nativeLabel: "Spray Irrigation",
      efficiency: 0.71,
      pressureRegulationSavings: 0.22
    }),
    rotor_irrigation: Object.freeze({
      nativeLabel: "Rotor Irrigation",
      efficiency: 0.71,
      pressureRegulationSavings: 0.1
    }),
    microirrigation: Object.freeze({
      nativeLabel: "Microirrigation",
      efficiency: 0.9,
      pressureRegulationSavings: 0
    }),
    no_irrigation: Object.freeze({
      nativeLabel: "No irrigation",
      efficiency: 0,
      pressureRegulationSavings: 0
    })
  }),
  controllerTreatments: Object.freeze({
    none: Object.freeze({ nativeLabel: "None", savings: 0 }),
    watersense_weather_based: Object.freeze({
      nativeLabel:
        "WaterSense Labeled Weather-Based Irrigation Controller Installed",
      savings: 0.15
    }),
    watersense_soil_moisture: Object.freeze({
      nativeLabel:
        "WaterSense Labeled Soil Moisture-Based Irrigation Controller Installed",
      savings: 0.3
    }),
    rain_sensor: Object.freeze({
      nativeLabel: "Rain Sensor Installed",
      savings: 0.067
    })
  }),
  certifiedProfessionalAuditSavings: 0.05
});

const SOURCE_ID = "source:watersense-landscape";
const SCHEMA_ID = "schema:watersense-landscape:2020-10";
const RELEASE_ID = "release:watersense-landscape:2020-10";
const ARTIFACT_ID = "artifact:watersense-landscape:2020-10";
const INGESTION_ID = "ingestion:watersense-landscape:2020-10:v1";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/watersense-landscape/run.mjs";
const MONTHS = Object.freeze([
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
]);

function sourceProof(schema, artifact, status, recordsRead = 0, recordsWritten = 0) {
  return {
    source: {
      id: SOURCE_ID,
      standardId: "STD-WATERSENSE-LANDSCAPE",
      organization: "U.S. Environmental Protection Agency",
      name: "WaterSense climate data for the Water Budget Tool",
      primaryUrl:
        "https://www.epa.gov/sites/production/files/2020-10/ws-data-information-et-rainfall.xlsx",
      license:
        "EPA-published WaterSense content is public domain with requested attribution",
      attribution: "U.S. EPA WaterSense",
      accessMode: "PUBLIC_XLSX_DOWNLOAD"
    },
    schema: {
      id: SCHEMA_ID,
      fingerprintSha256: schema.fingerprintSha256,
      kind: "XLSX_NATIVE_CELLS",
      observed: schema,
      inspectedAt: "2026-07-23T00:00:00.000Z"
    },
    release: {
      id: RELEASE_ID,
      version: "climate workbook path dated 2020-10",
      publishedAt: "2020-10-01T00:00:00.000Z",
      acquiredAt: "2026-07-23T00:00:00.000Z",
      status
    },
    artifact: {
      id: ARTIFACT_ID,
      sourceUrl:
        "https://www.epa.gov/sites/production/files/2020-10/ws-data-information-et-rainfall.xlsx",
      localName: basename(artifact.path),
      mediaType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: INGESTION_ID,
      adapterVersion: "watersense-landscape-v1",
      startedAt: "2026-07-23T00:00:00.000Z",
      finishedAt: status === "PUBLISHED" ? "2026-07-23T00:00:00.000Z" : null,
      status: status === "PUBLISHED" ? "SUCCEEDED" : "RUNNING",
      recordsRead,
      recordsWritten,
      warningCount: 0
    }
  };
}

function normalizePostalCode(value, { requireUsZip = false } = {}) {
  const raw = String(value ?? "").trim().toUpperCase();
  if (!raw) throw new Error("MISSING_POSTAL_CODE");
  const normalized = /^\d{1,5}$/.test(raw) ? raw.padStart(5, "0") : raw;
  if (requireUsZip && !/^\d{5}$/.test(normalized)) {
    throw new Error(`INVALID_US_ZIP_CODE: ${raw}`);
  }
  return normalized;
}

export function waterSenseLandscapeClimateId(
  postalCode,
  releaseId = RELEASE_ID
) {
  const normalizedPostalCode =
    normalizePostalCode(postalCode);
  if (typeof releaseId !== "string" || !releaseId) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_LANDSCAPE_CLIMATE_ID_INPUT"
    );
  }
  return (
    `watersense-landscape:${releaseId}:` +
    normalizedPostalCode
  );
}

function finiteNumber(value, label, { minimum = 0, maximum = Infinity } = {}) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < minimum ||
    value > maximum
  ) {
    throw new Error(
      `INVALID_NUMERIC_VALUE: ${label} must be between ${minimum} and ${maximum}`
    );
  }
  return value;
}

function rowNumbers(row, start, count, label) {
  return Array.from({ length: count }, (_, offset) =>
    finiteNumber(
      row.cells[start + offset]?.value,
      `${label} ${row.cells[start + offset]?.reference ?? "missing cell"}`
    )
  );
}

function nearlyEqual(left, right, tolerance = 1e-8) {
  return Math.abs(left - right) <= tolerance;
}

function climateRowsByPostal(worksheet, label) {
  const rows = new Map();
  for (const row of worksheet.rows.slice(1)) {
    if (
      row.cells[0]?.value === null ||
      row.cells[0]?.value === undefined ||
      String(row.cells[0].value).trim() === ""
    ) {
      continue;
    }
    const postalCode = normalizePostalCode(row.cells[0]?.value);
    if (rows.has(postalCode)) {
      throw new Error(`DUPLICATE_CLIMATE_POSTAL_CODE: ${label} ${postalCode}`);
    }
    rows.set(postalCode, row);
  }
  return rows;
}

function publishVersion2MethodAssumptions(database) {
  const assumptions = [
    {
      key: "effective_rainfall_fraction",
      value: WATERSENSE_V2_CONSTANTS.effectiveRainfallFraction,
      unit: "fraction",
      sourceCell: WATERSENSE_V2_METHOD_SOURCE.nativeCells.effectiveRainfallFraction
    },
    {
      key: "gallons_per_inch_square_foot",
      value: WATERSENSE_V2_CONSTANTS.gallonsPerInchSquareFoot,
      unit: "gallons/(inch square foot)",
      sourceCell: WATERSENSE_V2_METHOD_SOURCE.nativeCells.gallonsConversion
    },
    {
      key: "default_irrigation_application_rate",
      value: WATERSENSE_V2_CONSTANTS.defaultApplicationRate,
      unit: "fraction",
      sourceCell: WATERSENSE_V2_METHOD_SOURCE.nativeCells.applicationRate
    },
    {
      key: "baseline_landscape_coefficient",
      value: WATERSENSE_V2_CONSTANTS.baselineLandscapeCoefficient,
      unit: "ratio",
      sourceCell: WATERSENSE_V2_METHOD_SOURCE.nativeCells.landscapeCoefficients
    },
    {
      key: "baseline_irrigation_efficiency",
      value: WATERSENSE_V2_CONSTANTS.baselineIrrigationEfficiency,
      unit: "ratio",
      sourceCell: WATERSENSE_V2_METHOD_SOURCE.nativeCells.irrigationEfficiencies
    },
    {
      key: "landscape_type_coefficients",
      value: WATERSENSE_V2_CONSTANTS.landscapeTypes,
      unit: "ratio",
      sourceCell: WATERSENSE_V2_METHOD_SOURCE.nativeCells.landscapeCoefficients
    },
    {
      key: "irrigation_equipment_efficiencies",
      value: WATERSENSE_V2_CONSTANTS.irrigationEquipment,
      unit: "ratio",
      sourceCell: WATERSENSE_V2_METHOD_SOURCE.nativeCells.irrigationEfficiencies
    },
    {
      key: "controller_savings",
      value: WATERSENSE_V2_CONSTANTS.controllerTreatments,
      unit: "fraction",
      sourceCell: WATERSENSE_V2_METHOD_SOURCE.nativeCells.controllerSavings
    }
  ];
  const statement = database.prepare(`
    INSERT INTO calculation_assumptions (
      id, standard_id, assumption_key, value_json, unit, source_release_id
    ) VALUES (?, 'STD-WATERSENSE-LANDSCAPE', ?, ?, ?, NULL)
    ON CONFLICT(id) DO UPDATE SET
      value_json = excluded.value_json,
      unit = excluded.unit
  `);
  for (const assumption of assumptions) {
    statement.run(
      `assumption:watersense-landscape:${assumption.key}`,
      assumption.key,
      JSON.stringify({
        value: assumption.value,
        methodSource: WATERSENSE_V2_METHOD_SOURCE.sourceUrl,
        methodArtifactSha256: WATERSENSE_V2_METHOD_SOURCE.sha256,
        nativeCell: assumption.sourceCell
      }),
      assumption.unit
    );
  }
}

export async function ingestWaterSenseLandscape({
  artifactPath,
  database
}) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    WATERSENSE_LANDSCAPE_ARTIFACT
  );
  const { schema, worksheets } =
    await loadAndInspectLandscapeWorkbook(artifactPath);
  upsertSourceProof(database, sourceProof(schema, artifact, "INSPECTED"));

  const peakRows = worksheets.get("Peak_Month").rows.slice(1);
  const etoRows = climateRowsByPostal(worksheets.get("ETo"), "ETo");
  const rainfallRows = climateRowsByPostal(worksheets.get("P50"), "P50");
  const insert = database.prepare(`
    INSERT INTO watersense_landscape_climate (
      id, source_release_id, postal_code, city, state, annual_eto_in,
      annual_rainfall_in, monthly_json, native_sheet, native_row
    ) VALUES (?, ?, ?, NULL, NULL, ?, ?, ?, 'Peak_Month + ETo + P50', ?)
    ON CONFLICT(id) DO UPDATE SET
      annual_eto_in = excluded.annual_eto_in,
      annual_rainfall_in = excluded.annual_rainfall_in,
      monthly_json = excluded.monthly_json,
      native_row = excluded.native_row
  `);

  let recordsWritten = 0;
  database.exec("BEGIN IMMEDIATE");
  try {
    for (const peakRow of peakRows) {
      const postalCode = normalizePostalCode(peakRow.cells[0]?.value);
      const peakMonth = String(peakRow.cells[1]?.value ?? "").toLowerCase();
      const peakMonthIndex = MONTHS.indexOf(peakMonth);
      if (peakMonthIndex === -1) {
        throw new Error(
          `INVALID_PEAK_MONTH: ${postalCode} ${JSON.stringify(peakMonth)}`
        );
      }
      const etoRow = etoRows.get(postalCode);
      const rainfallRow = rainfallRows.get(postalCode);
      if (!etoRow || !rainfallRow) {
        throw new Error(`MISSING_MONTHLY_CLIMATE_ROW: ${postalCode}`);
      }
      const etoIn = rowNumbers(etoRow, 1, 12, `ETo ${postalCode}`);
      const rainfallIn = rowNumbers(
        rainfallRow,
        1,
        12,
        `P50 ${postalCode}`
      );
      const annualEtoIn = finiteNumber(
        etoRow.cells[13]?.value,
        `ETo annual ${postalCode}`
      );
      const annualRainfallIn = finiteNumber(
        rainfallRow.cells[13]?.value,
        `P50 annual ${postalCode}`
      );
      const peakEtoIn = finiteNumber(
        peakRow.cells[2]?.value,
        `peak ETo ${postalCode}`
      );
      const peakRainfallIn = finiteNumber(
        peakRow.cells[3]?.value,
        `peak rainfall ${postalCode}`
      );
      if (
        !nearlyEqual(etoIn.reduce((sum, value) => sum + value, 0), annualEtoIn) ||
        !nearlyEqual(
          rainfallIn.reduce((sum, value) => sum + value, 0),
          annualRainfallIn
        )
      ) {
        throw new Error(`ANNUAL_CLIMATE_TOTAL_MISMATCH: ${postalCode}`);
      }
      if (
        !nearlyEqual(etoIn[peakMonthIndex], peakEtoIn, 1e-5) ||
        !nearlyEqual(rainfallIn[peakMonthIndex], peakRainfallIn, 1e-5)
      ) {
        throw new Error(`PEAK_MONTH_CLIMATE_MISMATCH: ${postalCode}`);
      }
      insert.run(
        waterSenseLandscapeClimateId(
          postalCode,
          RELEASE_ID
        ),
        RELEASE_ID,
        postalCode,
        annualEtoIn,
        annualRainfallIn,
        JSON.stringify({
          monthOrder: MONTHS,
          etoIn,
          rainfallIn,
          peakWateringMonth: peakMonth,
          peakEtoIn,
          peakRainfallIn,
          nativeRows: {
            peakMonth: peakRow.rowNumber,
            eto: etoRow.rowNumber,
            p50: rainfallRow.rowNumber
          }
        }),
        peakRow.rowNumber
      );
      recordsWritten += 1;
    }
    publishVersion2MethodAssumptions(database);
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
  upsertSourceProof(
    database,
    sourceProof(
      schema,
      artifact,
      "PUBLISHED",
      peakRows.length,
      recordsWritten
    )
  );
  return {
    artifact,
    schema,
    recordsRead: peakRows.length,
    recordsWritten,
    releaseId: RELEASE_ID,
    normalizedTargets: [
      "watersense_landscape_climate",
      "calculation_assumptions"
    ]
  };
}

export function resolveWaterSenseLandscapeClimate(database, postalCode) {
  const normalized = normalizePostalCode(postalCode, { requireUsZip: true });
  const rows = database.prepare(`
    SELECT
      postal_code AS postalCode,
      annual_eto_in AS annualEtoIn,
      annual_rainfall_in AS annualRainfallIn,
      monthly_json AS monthlyJson,
      native_sheet AS nativeSheet,
      native_row AS nativeRow
    FROM watersense_landscape_climate
    WHERE source_release_id = ?
      AND postal_code = ?
  `).all(RELEASE_ID, normalized);
  if (rows.length === 0) {
    throw new Error(`NO_EXACT_CLIMATE_MATCH: ${normalized}`);
  }
  if (rows.length !== 1) {
    throw new Error(`AMBIGUOUS_CLIMATE_MATCH: ${normalized}`);
  }
  const row = rows[0];
  return {
    ...row,
    monthly: JSON.parse(row.monthlyJson)
  };
}

function validateGrowingSeason(growingSeason, postalCode) {
  if (!growingSeason) {
    throw new Error(
      "MISSING_AUTHORITATIVE_GROWING_SEASON: Version 2.0 start and end months are required"
    );
  }
  const startMonth = finiteNumber(growingSeason.startMonth, "growing season start", {
    minimum: 1,
    maximum: 12
  });
  const endMonth = finiteNumber(growingSeason.endMonth, "growing season end", {
    minimum: 1,
    maximum: 12
  });
  if (!Number.isInteger(startMonth) || !Number.isInteger(endMonth)) {
    throw new Error("INVALID_GROWING_SEASON: month indexes must be integers");
  }
  if (startMonth > endMonth) {
    throw new Error(
      "UNSUPPORTED_GROWING_SEASON: wrapped seasons are not present in the reviewed Version 2.0 contract"
    );
  }
  if (growingSeason.source !== "EPA_WATERSENSE_V2") {
    throw new Error(
      "UNVERIFIED_GROWING_SEASON: source must be EPA_WATERSENSE_V2"
    );
  }
  if (!growingSeason.postalCode) {
    throw new Error(
      "MISSING_AUTHORITATIVE_GROWING_SEASON: source postal code is required"
    );
  }
  const sourcePostalCode = normalizePostalCode(growingSeason.postalCode, {
    requireUsZip: true
  });
  if (sourcePostalCode !== postalCode) {
    throw new Error(
      `GROWING_SEASON_POSTAL_CODE_MISMATCH: expected ${postalCode}, received ${sourcePostalCode}`
    );
  }
  if (
    growingSeason.methodArtifactSha256 !== WATERSENSE_V2_METHOD_SOURCE.sha256
  ) {
    throw new Error(
      `UNVERIFIED_GROWING_SEASON: methodArtifactSha256 must be ${WATERSENSE_V2_METHOD_SOURCE.sha256}`
    );
  }
  return {
    startMonth,
    endMonth,
    postalCode: sourcePostalCode,
    methodArtifactSha256: growingSeason.methodArtifactSha256
  };
}

function validateHydrozone(zone, index) {
  if (!zone || typeof zone !== "object") {
    throw new Error(`MISSING_PROJECT_INPUT: hydrozone ${index + 1}`);
  }
  const areaFt2 = finiteNumber(zone.areaFt2, `hydrozone ${index + 1} area`, {
    minimum: Number.EPSILON
  });
  const landscape = WATERSENSE_V2_CONSTANTS.landscapeTypes[zone.landscapeType];
  if (!landscape) {
    throw new Error(
      `UNSUPPORTED_LANDSCAPE_TYPE: hydrozone ${index + 1} ${String(zone.landscapeType)}`
    );
  }
  const irrigation =
    WATERSENSE_V2_CONSTANTS.irrigationEquipment[zone.irrigationEquipment];
  if (!irrigation) {
    throw new Error(
      `UNSUPPORTED_IRRIGATION_EQUIPMENT: hydrozone ${index + 1} ${String(zone.irrigationEquipment)}`
    );
  }
  const nonIrrigated =
    zone.landscapeType === "non_irrigated_ground" ||
    zone.irrigationEquipment === "no_irrigation";
  if (
    (zone.landscapeType === "non_irrigated_ground") !==
    (zone.irrigationEquipment === "no_irrigation")
  ) {
    throw new Error(
      `INCOMPATIBLE_HYDROZONE: hydrozone ${index + 1} non-irrigated landscape and equipment must agree`
    );
  }
  if (
    zone.irrigationEfficiency !== undefined &&
    !nearlyEqual(zone.irrigationEfficiency, irrigation.efficiency)
  ) {
    throw new Error(
      `UNSUPPORTED_IRRIGATION_EFFICIENCY_OVERRIDE: hydrozone ${index + 1} Version 2.0 uses ${irrigation.efficiency}`
    );
  }
  if (
    zone.pressureRegulated !== undefined &&
    typeof zone.pressureRegulated !== "boolean"
  ) {
    throw new Error(
      `INVALID_PROJECT_INPUT: hydrozone ${index + 1} pressureRegulated must be boolean`
    );
  }
  return {
    areaFt2,
    landscapeType: zone.landscapeType,
    irrigationEquipment: zone.irrigationEquipment,
    landscape,
    irrigation,
    nonIrrigated,
    pressureRegulated: zone.pressureRegulated === true
  };
}

export function calculateWaterSenseVersion2Allowances(database, {
  postalCode,
  landscapeAreaFt2,
  areaUnit = "square feet",
  growingSeason,
  proposedHydrozones,
  controllerTreatment = "none",
  certifiedProfessionalAudit = false,
  irrigationApplicationRate = WATERSENSE_V2_CONSTANTS.defaultApplicationRate
}) {
  assertNetworkDisabled();
  if (areaUnit !== "square feet") {
    throw new Error(
      `INCOMPATIBLE_PROJECT_UNIT: expected square feet, received ${areaUnit}`
    );
  }
  const totalAreaFt2 = finiteNumber(landscapeAreaFt2, "landscape area", {
    minimum: Number.EPSILON
  });
  const normalizedPostalCode = normalizePostalCode(postalCode, {
    requireUsZip: true
  });
  const season = validateGrowingSeason(growingSeason, normalizedPostalCode);
  if (!Array.isArray(proposedHydrozones) || proposedHydrozones.length === 0) {
    throw new Error("MISSING_PROJECT_INPUT: at least one proposed hydrozone");
  }
  const zones = proposedHydrozones.map(validateHydrozone);
  const zoneArea = zones.reduce((sum, zone) => sum + zone.areaFt2, 0);
  if (!nearlyEqual(zoneArea, totalAreaFt2, Math.max(1e-6, totalAreaFt2 * 1e-9))) {
    throw new Error(
      `HYDROZONE_AREA_MISMATCH: expected ${totalAreaFt2}, received ${zoneArea}`
    );
  }
  const controller =
    WATERSENSE_V2_CONSTANTS.controllerTreatments[controllerTreatment];
  if (!controller) {
    throw new Error(
      `UNSUPPORTED_CONTROLLER_TREATMENT: ${String(controllerTreatment)}`
    );
  }
  if (typeof certifiedProfessionalAudit !== "boolean") {
    throw new Error(
      "INVALID_PROJECT_INPUT: certifiedProfessionalAudit must be boolean"
    );
  }
  const applicationRate = finiteNumber(
    irrigationApplicationRate,
    "irrigation application rate",
    { minimum: Number.EPSILON, maximum: 1 }
  );
  const climate = resolveWaterSenseLandscapeClimate(
    database,
    normalizedPostalCode
  );
  const modifiedNetEtoIn = climate.monthly.etoIn.map((eto, index) => {
    const month = index + 1;
    if (month < season.startMonth || month > season.endMonth) return 0;
    return Math.max(
      eto -
        climate.monthly.rainfallIn[index] *
          WATERSENSE_V2_CONSTANTS.effectiveRainfallFraction,
      0
    );
  });
  const annualModifiedNetEtoIn = modifiedNetEtoIn.reduce(
    (sum, value) => sum + value,
    0
  );
  const baselineDesignAllowanceGallons =
    annualModifiedNetEtoIn *
    totalAreaFt2 *
    WATERSENSE_V2_CONSTANTS.gallonsPerInchSquareFoot *
    (WATERSENSE_V2_CONSTANTS.baselineLandscapeCoefficient /
      WATERSENSE_V2_CONSTANTS.baselineIrrigationEfficiency) *
    applicationRate;
  const controllerFactor = 1 - controller.savings;
  const auditFactor = certifiedProfessionalAudit
    ? 1 - WATERSENSE_V2_CONSTANTS.certifiedProfessionalAuditSavings
    : 1;
  const proposedDesignAllowanceGallons = zones.reduce((siteTotal, zone) => {
    if (zone.nonIrrigated) return siteTotal;
    const combinedFactor =
      zone.landscape.coefficient / zone.irrigation.efficiency;
    const pressureFactor = zone.pressureRegulated
      ? 1 - zone.irrigation.pressureRegulationSavings
      : 1;
    const zoneTotal =
      annualModifiedNetEtoIn *
      combinedFactor *
      zone.areaFt2 *
      WATERSENSE_V2_CONSTANTS.gallonsPerInchSquareFoot *
      applicationRate *
      pressureFactor *
      controllerFactor *
      auditFactor;
    return siteTotal + zoneTotal;
  }, 0);
  const values = {
    baseline_design_allowance_gallons: baselineDesignAllowanceGallons,
    proposed_design_allowance_gallons: proposedDesignAllowanceGallons
  };
  const filters = {
    postalCode: climate.postalCode,
    landscapeAreaFt2: totalAreaFt2,
    areaUnit,
    growingSeason: {
      ...season,
      source: growingSeason.source
    },
    proposedHydrozones: zones.map((zone) => ({
      areaFt2: zone.areaFt2,
      landscapeType: zone.landscapeType,
      irrigationEquipment: zone.irrigationEquipment,
      irrigationEfficiency: zone.irrigation.efficiency,
      pressureRegulated: zone.pressureRegulated
    })),
    controllerTreatment,
    certifiedProfessionalAudit,
    irrigationApplicationRate: applicationRate
  };
  return {
    standardId: "STD-WATERSENSE-LANDSCAPE",
    categoryId: "ITC-34",
    processKey: "watersense_landscape",
    values,
    climate: {
      postalCode: climate.postalCode,
      annualEtoIn: climate.annualEtoIn,
      annualRainfallIn: climate.annualRainfallIn,
      peakWateringMonth: climate.monthly.peakWateringMonth,
      modifiedNetEtoIn
    },
    formulaBindings: [
      {
        outputName: "Baseline annual design water allowance",
        formulaTerm: "baseline_design_allowance_gallons",
        value: baselineDesignAllowanceGallons,
        unit: "gallons/year",
        scope: "PROJECT_TOTAL"
      },
      {
        outputName: "Proposed annual design water allowance",
        formulaTerm: "proposed_design_allowance_gallons",
        value: proposedDesignAllowanceGallons,
        unit: "gallons/year",
        scope: "PROJECT_TOTAL"
      }
    ],
    selectionRule: "EXACT_ZIP_CLIMATE_AND_COMPLETE_WATERSENSE_V2_INPUTS",
    methodEvidence: WATERSENSE_V2_METHOD_SOURCE,
    warnings: [
      "The Version 2.0 baseline is a design comparison, not measured existing irrigation consumption.",
      "The cached climate workbook does not contain Version 2.0 growing-season start and end months, so an authoritative Version 2.0 growing-season lookup is required."
    ],
    provenance: buildProvenance({
      standardId: "STD-WATERSENSE-LANDSCAPE",
      artifact: WATERSENSE_LANDSCAPE_ARTIFACT,
      sourceVersion:
        "WaterSense Water Budget Tool Version 2.0 with climate workbook path dated 2020-10",
      sourceFields: [
        "Peak_Month!A1:D31736",
        "ETo!A1:N55915",
        "P50!A1:N55915",
        ...Object.values(WATERSENSE_V2_METHOD_SOURCE.nativeCells)
      ],
      filters,
      transformation:
        "Exact Version 2.0 monthly effective-rainfall, growing-season, baseline TIR, application-rate, hydrozone Kspecies/Effi, controller, pressure-regulation, and certified-professional factors",
      adapterPath: ADAPTER_PATH
    })
  };
}

export function recordWaterSenseLandscapeFormulaMapping(database, result) {
  assertNetworkDisabled();
  if (
    !result ||
    result.standardId !== "STD-WATERSENSE-LANDSCAPE" ||
    result.categoryId !== "ITC-34" ||
    result.processKey !== "watersense_landscape"
  ) {
    throw new Error("INVALID_WATERSENSE_LANDSCAPE_RESULT");
  }
  const calculationId = [
    "calculation",
    "watersense-landscape",
    RELEASE_ID,
    sha256Json(result.provenance.filters).slice(0, 16)
  ].join(":");
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled, status,
      created_at
    ) VALUES (?, 'STD-WATERSENSE-LANDSCAPE', 'watersense_landscape', ?, NULL,
      'watersense-landscape-v1', ?, ?, 1, 'SUCCEEDED',
      '2026-07-23T00:00:00.000Z')
    ON CONFLICT(id) DO UPDATE SET output_sha256 = excluded.output_sha256
  `).run(
    calculationId,
    RELEASE_ID,
    sha256Json(result.provenance.filters),
    sha256Json(result.values)
  );
  const insertValue = database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, unit, scope, selection_rule
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
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
      ARTIFACT_ID,
      JSON.stringify(result.provenance.sourceFields),
      JSON.stringify(result.provenance.filters),
      result.provenance.transformation,
      ADAPTER_PATH
    );
  }
  return calculationId;
}
