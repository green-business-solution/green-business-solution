import { createHash } from "node:crypto";

const RESULT_KINDS = new Set([
  "scalar",
  "product_record",
  "profile",
  "input_set",
  "model_result_set",
  "unavailable"
]);

function round(value, digits = 12) {
  if (!Number.isFinite(value)) return value;
  return Number(value.toFixed(digits));
}

function matches(record, query) {
  return Object.entries(query).every(([key, expected]) => record[key] === expected);
}

function runFormula(formula, inputs) {
  switch (formula) {
    case "threePhasePowerAndEnergy": {
      const phaseFactor = inputs.phases === 3 ? Math.sqrt(3) : 1;
      const powerKw = phaseFactor * inputs.volts * inputs.amps * inputs.powerFactor / 1000;
      return {
        powerKw: round(powerKw),
        energyKwh: round(powerKw * inputs.operatingHours)
      };
    }
    case "capAndConvertSolarThermal": {
      const usefulThermalKwh = Math.min(
        inputs.annualUsefulThermalKwh,
        inputs.annualDeliveredLoadKwh
      );
      return {
        usefulThermalKwh,
        displacedBackupInputKwh: usefulThermalKwh / inputs.backupEfficiency
      };
    }
    case "intervalEnergy":
      return {
        annualizedSampleKwh:
          inputs.generationKw.reduce((sum, value) => sum + value, 0) * inputs.intervalHours
      };
    case "annualBillDelta":
      return {
        annualSavingsUsd: inputs.baselineAnnualBillUsd - inputs.proposedAnnualBillUsd
      };
    case "chpFuelAndUsefulHeat": {
      const inputFuelMmbtu =
        inputs.electricGenerationKwh * 0.003412 / inputs.electricEfficiency;
      return {
        inputFuelMmbtu,
        usefulHeatMmbtu:
          inputFuelMmbtu * (inputs.totalEfficiency - inputs.electricEfficiency)
      };
    }
    case "vehicleIntensity":
      return {
        gallonsPerMile: 1 / inputs.combinedMpg,
        wallKwhPerMile: inputs.combinedElectricKwhPer100Miles / 100
      };
    case "landscapeAllowance":
      return {
        gallons:
          inputs.etoInches *
          inputs.landscapeAreaFt2 *
          0.623 *
          inputs.landscapeCoefficient /
          inputs.irrigationEfficiency
      };
    case "leakWater":
      return {
        avoidedGallons:
          inputs.measuredLeakGpm * inputs.confirmedMinutesPerYear
      };
    case "lightingAnnualSavings":
      return {
        annualKwh:
          inputs.fixtureCount *
          (inputs.existingWatts - inputs.proposedWatts) *
          inputs.annualHours /
          1000
      };
    case "weeklyScheduleHours":
      return {
        annualHours:
          (inputs.weekdayHours * inputs.weekdaysPerWeek +
            inputs.weekendHours * inputs.weekendDaysPerWeek) *
          inputs.weeks
      };
    case "waterHeatingPerGallon":
      return {
        resourcePerGallon:
          inputs.temperatureRiseF *
          inputs.waterDensityLbPerGallon *
          inputs.specificHeatBtuPerLbF /
          inputs.heaterEfficiency /
          inputs.resourceBtuPerUnit
      };
    default:
      throw new Error(`Unsupported research formula: ${formula}`);
  }
}

function executeOperation(prototype) {
  switch (prototype.operation) {
    case "exactLookup": {
      const eligible = prototype.records.filter((record) => matches(record, prototype.query));
      const selected = eligible.length === 1 ? eligible[0] : null;
      const reasonCode = eligible.length === 0 ? "NO_EXACT_MATCH" : "AMBIGUOUS_EXACT_MATCH";
      return {
        kind: selected ? "product_record" : "unavailable",
        value: selected || { available: false, reasonCode },
        eligiblePopulation: eligible,
        filters: prototype.query,
        selectionRule: "EXACT_NORMALIZED_IDENTIFIER",
        warnings: selected
          ? []
          : [
              eligible.length === 0
                ? "No exact record matched the requested identifier."
                : "More than one record matched the requested identifier."
            ]
      };
    }
    case "requirementsFilter": {
      const eligible = prototype.records.filter((record) => {
        if (prototype.query.productType && record.productType !== prototype.query.productType) {
          return false;
        }
        if (
          prototype.query.maximumGpf !== undefined &&
          !(record.gpf <= prototype.query.maximumGpf)
        ) {
          return false;
        }
        if (prototype.query.application && record.application !== prototype.query.application) {
          return false;
        }
        return record.active !== false;
      });
      const selectedValue =
        eligible.length === 1
          ? eligible[0].averageWatts ?? eligible[0].gpf ?? null
          : null;
      return {
        kind: eligible.length > 0 ? "input_set" : "unavailable",
        value: {
          eligibleCount: eligible.length,
          ...(selectedValue === null ? {} : { selectedValue })
        },
        eligiblePopulation: eligible,
        filters: prototype.query,
        selectionRule: "MANDATORY_REQUIREMENTS_FILTER",
        warnings:
          eligible.length === 1
            ? []
            : ["Prototype does not select a product when the eligible set is ambiguous."]
      };
    }
    case "formula":
      return {
        kind: "model_result_set",
        value: runFormula(prototype.formula, prototype.inputs),
        eligiblePopulation: [],
        filters: prototype.inputs,
        selectionRule: `PINNED_LOCAL_FORMULA:${prototype.formula}`,
        warnings: []
      };
    case "sum":
      return {
        kind: "scalar",
        value: {
          sum: prototype.values.reduce((sum, value) => sum + value, 0)
        },
        eligiblePopulation: prototype.values,
        filters: {},
        selectionRule: "SUM_PINNED_INTERVALS",
        warnings: []
      };
    case "effectiveDateGate": {
      const asOf = new Date(`${prototype.asOf}T00:00:00Z`);
      const start = new Date(`${prototype.record.startDate}T00:00:00Z`);
      const end = prototype.record.endDate
        ? new Date(`${prototype.record.endDate}T23:59:59Z`)
        : null;
      const eligible = asOf >= start && (!end || asOf <= end);
      return {
        kind: eligible ? "input_set" : "unavailable",
        value: eligible
          ? { eligible: true, tariff: prototype.record }
          : { eligible: false, reasonCode: "OUTSIDE_EFFECTIVE_DATE" },
        eligiblePopulation: eligible ? [prototype.record] : [],
        filters: { asOf: prototype.asOf },
        selectionRule: "EFFECTIVE_DATE_AND_STATUS_GATE",
        warnings: eligible ? [] : ["Tariff record is outside its effective period."]
      };
    }
    case "unavailable":
      return {
        kind: "unavailable",
        value: {
          available: false,
          reasonCode: prototype.reasonCode
        },
        eligiblePopulation: [],
        filters: {},
        selectionRule: "EXPLICIT_UNAVAILABLE_RESULT",
        warnings: [prototype.reasonCode]
      };
    default:
      throw new Error(`Unsupported research operation: ${prototype.operation}`);
  }
}

export function runStandardPrototype(standard) {
  const execution = executeOperation(standard.prototype);
  const provenancePayload = {
    standardId: standard.id,
    source: standard.officialSource,
    sourceVersion: standard.version,
    artifact: standard.observedArtifact,
    operation: standard.prototype.operation,
    filters: execution.filters,
    selectionRule: execution.selectionRule
  };
  const result = {
    kind: execution.kind,
    standardId: standard.id,
    value: execution.value,
    unit: standard.prototype.unit,
    scope: "RESEARCH_PROTOTYPE",
    source: standard.officialSource,
    sourceVersion: standard.version,
    sourceArtifact: standard.observedArtifact,
    filters: execution.filters,
    eligiblePopulation: execution.eligiblePopulation,
    sampleSize: execution.eligiblePopulation.length,
    selectionRule: execution.selectionRule,
    fallbackLevel: "RESEARCH_SAMPLE",
    uncertainty: standard.feasibility === "FEASIBLE_NOW" ? "SOURCE_BOUND" : "IMPLEMENTATION_BOUND",
    warnings: execution.warnings,
    provenance: {
      sourceEvidence: standard.prototype.sourceEvidence,
      sha256: createHash("sha256")
        .update(JSON.stringify(provenancePayload))
        .digest("hex")
    }
  };
  validateResult(result);
  return result;
}

export function validateResult(result) {
  if (!RESULT_KINDS.has(result.kind)) {
    throw new Error(`Unknown result kind: ${result.kind}`);
  }
  for (const field of [
    "standardId",
    "unit",
    "scope",
    "source",
    "sourceVersion",
    "sourceArtifact",
    "filters",
    "eligiblePopulation",
    "sampleSize",
    "selectionRule",
    "fallbackLevel",
    "uncertainty",
    "warnings",
    "provenance"
  ]) {
    if (!(field in result)) {
      throw new Error(`${result.standardId || "result"} is missing ${field}`);
    }
  }
  if (result.sampleSize !== result.eligiblePopulation.length) {
    throw new Error(`${result.standardId} has inconsistent sampleSize`);
  }
  return result;
}
