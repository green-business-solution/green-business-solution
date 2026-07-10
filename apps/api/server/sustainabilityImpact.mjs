const KWH_TO_KBTU = 3.412;
const THERM_TO_KBTU = 100;
const GALLONS_PER_CCF = 748.052;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeDeltaUnit(unit) {
  const text = cleanText(unit).toLowerCase();
  if (!text) return null;
  if (text.includes("kwh")) return "kwh";
  if (text.includes("therm")) return "therm";
  if (text.includes("ccf")) return "ccf";
  if (text.includes("cubic foot")) return "cubic_foot";
  if (text.includes("gallon") || text === "gal") return "gallon";
  if (text.includes("kw")) return "kw";
  return null;
}

function annualizeDelta(delta) {
  const value = toNumber(delta?.deltaValue);
  if (!Number.isFinite(value)) return null;
  const period = cleanText(delta?.period).toLowerCase();
  if (period === "annual") return value;
  if (period === "monthly") return value * 12;
  return value;
}

function convertWaterDeltaToGallons(delta) {
  const value = annualizeDelta(delta);
  if (value == null) return null;
  const normalizedUnit = normalizeDeltaUnit(delta?.unit);
  if (normalizedUnit === "gallon" || normalizedUnit == null) {
    return value;
  }
  if (normalizedUnit === "ccf") {
    return value * GALLONS_PER_CCF;
  }
  if (normalizedUnit === "cubic_foot") {
    return value * 7.48052;
  }
  return null;
}

function convertElectricDeltaToKwh(delta) {
  const value = annualizeDelta(delta);
  if (value == null) return null;
  const normalizedUnit = normalizeDeltaUnit(delta?.unit);
  return normalizedUnit === "kwh" || normalizedUnit == null ? value : null;
}

function convertGasDeltaToTherms(delta) {
  const value = annualizeDelta(delta);
  if (value == null) return null;
  const normalizedUnit = normalizeDeltaUnit(delta?.unit);
  return normalizedUnit === "therm" || normalizedUnit == null ? value : null;
}

function convertDeltaToKbtu(delta) {
  const kwh = convertElectricDeltaToKwh(delta);
  if (kwh != null) return kwh * KWH_TO_KBTU;
  const therms = convertGasDeltaToTherms(delta);
  if (therms != null) return therms * THERM_TO_KBTU;
  return null;
}

function createMetric({
  id,
  label,
  unit,
  sourceField,
  value,
  sourceDeltas,
  sourceSquareFootage,
  formulaId,
  assumptions,
  unavailableReason
}) {
  const hasValue = Number.isFinite(value);
  const status = !hasValue
    ? "unavailable"
    : value > 0
      ? "calculated"
      : value < 0
        ? "increased_consumption"
        : "neutral";

  return {
    id,
    label,
    unit,
    status,
    value: hasValue ? value : null,
    sourceField,
    formulaId,
    assumptions,
    quality: {
      confidence: hasValue ? "high" : "low",
      source: sourceDeltas.length ? "bill_line_deltas" : "missing_input",
      notes: hasValue
        ? []
        : [unavailableReason || `No usable source data was available for ${label.toLowerCase()}.`]
    },
    trace: {
      sourceSquareFootage,
      sourceDeltas: sourceDeltas.map((delta) => ({
        id: delta.id || null,
        domain: delta.domain || null,
        canonicalField: delta.canonicalField || null,
        deltaValue: delta.deltaValue ?? null,
        unit: delta.unit || null,
        period: delta.period || null,
        savingsCents: delta.savingsCents ?? null
      }))
    }
  };
}

function relevantDeltas(billLineDeltas = [], canonicalField) {
  return billLineDeltas.filter((delta) => delta?.canonicalField === canonicalField);
}

export function buildSustainabilityImpact({
  billLineDeltas = [],
  squareFootage,
  sourceSquareFootage = null
}) {
  const parsedSquareFootage = toNumber(squareFootage);
  const waterDeltas = relevantDeltas(billLineDeltas, "annual_water_use_delta");
  const electricDeltas = relevantDeltas(billLineDeltas, "annual_kwh_delta");
  const gasDeltas = relevantDeltas(billLineDeltas, "annual_therms_delta");
  const peakDeltas = relevantDeltas(billLineDeltas, "peak_kw_delta");
  const annualEnergyKbtu = [...electricDeltas, ...gasDeltas]
    .map(convertDeltaToKbtu)
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);

  const waterGallons = waterDeltas
    .map(convertWaterDeltaToGallons)
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);
  const electricKwh = electricDeltas
    .map(convertElectricDeltaToKwh)
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);
  const gasTherms = gasDeltas
    .map(convertGasDeltaToTherms)
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);
  const peakKw = peakDeltas
    .map(annualizeDelta)
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);

  const metrics = {
    waterConservationGallonsPerYear: createMetric({
      id: "waterConservationGallonsPerYear",
      label: "Water conservation",
      unit: "gallons/year",
      sourceField: "annual_water_use_delta",
      value: waterDeltas.length ? -waterGallons : null,
      sourceDeltas: waterDeltas,
      sourceSquareFootage,
      formulaId: "sustainability.water_conservation_v1",
      assumptions: ["Water deltas are treated as annual gallons when the source bill unit is gallons, or converted from CCF / cubic feet when explicitly labeled."],
      unavailableReason: "Water bill deltas or a recognized water unit were missing."
    }),
    scope1ThermReductionPerYear: createMetric({
      id: "scope1ThermReductionPerYear",
      label: "Scope 1 therm reduction",
      unit: "therms/year",
      sourceField: "annual_therms_delta",
      value: gasDeltas.length ? -gasTherms : null,
      sourceDeltas: gasDeltas,
      sourceSquareFootage,
      formulaId: "sustainability.scope1_therm_reduction_v1",
      assumptions: ["Therm deltas are read directly from annual therm bill-line changes."],
      unavailableReason: "Gas bill deltas were missing."
    }),
    scope2ElectricityReductionKwhPerYear: createMetric({
      id: "scope2ElectricityReductionKwhPerYear",
      label: "Scope 2 electricity reduction",
      unit: "kWh/year",
      sourceField: "annual_kwh_delta",
      value: electricDeltas.length ? -electricKwh : null,
      sourceDeltas: electricDeltas,
      sourceSquareFootage,
      formulaId: "sustainability.scope2_kwh_reduction_v1",
      assumptions: ["Electric deltas are read directly from annual kWh bill-line changes."],
      unavailableReason: "Electric bill deltas were missing."
    }),
    siteEuiReductionKbtuPerSquareFootPerYear: createMetric({
      id: "siteEuiReductionKbtuPerSquareFootPerYear",
      label: "Site EUI reduction",
      unit: "kBtu/sq ft/year",
      sourceField: "annual_kwh_delta+annual_therms_delta",
      value: parsedSquareFootage ? -annualEnergyKbtu / parsedSquareFootage : null,
      sourceDeltas: [...electricDeltas, ...gasDeltas],
      sourceSquareFootage,
      formulaId: "sustainability.site_eui_reduction_v1",
      assumptions: [
        "Site EUI is computed from annual electric and gas bill-line deltas only.",
        "1 kWh is treated as 3.412 kBtu and 1 therm is treated as 100 kBtu."
      ],
      unavailableReason: parsedSquareFootage ? null : "Square footage was missing or could not be parsed."
    }),
    gridPeakDemandReductionKw: createMetric({
      id: "gridPeakDemandReductionKw",
      label: "Grid peak-demand reduction",
      unit: "kW",
      sourceField: "peak_kw_delta",
      value: peakDeltas.length ? -peakKw : null,
      sourceDeltas: peakDeltas,
      sourceSquareFootage,
      formulaId: "sustainability.grid_peak_demand_reduction_v1",
      assumptions: ["Peak demand changes are read directly from peak kW bill-line changes."],
      unavailableReason: "Peak-demand bill deltas were missing."
    })
  };

  const statuses = Object.values(metrics).map((metric) => metric.status);
  const overallStatus = statuses.some((status) => status === "unavailable")
    ? "partial"
    : statuses.some((status) => status === "increased_consumption")
      ? "partial"
      : "calculated";

  return {
    schemaVersion: "sustainability-impact-v1",
    status: overallStatus,
    source: {
      sourceSquareFootage,
      billLineDeltaCount: billLineDeltas.length
    },
    quality: {
      confidence: overallStatus === "calculated" ? "high" : "mixed",
      source: billLineDeltas.length ? "bill_line_deltas" : "missing_input",
      notes: overallStatus === "partial"
        ? ["One or more requested sustainability metrics could not be calculated from the available inputs."]
        : []
    },
    metrics
  };
}

export function normalizeSquareFootage(value) {
  const parsed = toNumber(value);
  return parsed && parsed > 0 ? parsed : null;
}
