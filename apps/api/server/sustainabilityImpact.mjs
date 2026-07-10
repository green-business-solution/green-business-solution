import {
  buildBoundaryNote,
  getElectricityEmissionFactor,
  getNaturalGasEmissionFactor,
} from "./savings/sustainabilityFactors.mjs";

const KWH_TO_KBTU = 3.412;
const THERM_TO_KBTU = 100;
const GALLONS_PER_CCF = 748.052;
const GALLONS_PER_CUBIC_FOOT = 7.48052;
const HOURS_PER_YEAR = 8760;

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
  if (period === "annual" || period === "year" || period === "yearly")
    return value;
  if (period === "monthly") return value * 12;
  return null;
}

function sumNumbers(values) {
  return values.reduce(
    (sum, value) => sum + (Number.isFinite(value) ? value : 0),
    0,
  );
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
    return value * GALLONS_PER_CUBIC_FOOT;
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

function relevantDeltas(billLineDeltas = [], canonicalField) {
  return billLineDeltas.filter(
    (delta) => delta?.canonicalField === canonicalField,
  );
}

function sourceDeltaSummary(delta) {
  return {
    id: delta.id || null,
    domain: delta.domain || null,
    canonicalField: delta.canonicalField || null,
    deltaValue: delta.deltaValue ?? null,
    unit: delta.unit || null,
    period: delta.period || null,
    savingsCents: delta.savingsCents ?? null,
    sourceModelId: delta.savingsModelId || null,
  };
}

function sourceInputSummary(sourceModelInputs) {
  const summary = {};
  for (const [key, value] of Object.entries(sourceModelInputs || {})) {
    if (value == null) continue;
    if (typeof value === "number" || typeof value === "boolean") {
      summary[key] = value;
      continue;
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) summary[key] = trimmed;
    }
  }
  return summary;
}

function roundValue(value, digits = 6) {
  if (!Number.isFinite(value)) return null;
  return Number(value.toFixed(digits));
}

function cleanMetricNotes(notes = []) {
  return [...new Set(notes.map(cleanText).filter(Boolean))];
}

function buildMetric({
  id,
  label,
  unit,
  sourceField,
  value,
  provenanceState,
  formulaId,
  quality,
  assumptions = [],
  trace = {},
}) {
  return {
    id,
    label,
    unit,
    status: provenanceState,
    provenanceState,
    value: Number.isFinite(value) ? value : 0,
    sourceField,
    formulaId,
    assumptions: cleanMetricNotes(assumptions),
    quality,
    trace,
  };
}

function hasAnyNumber(inputs, keys) {
  return keys.some((key) => Number.isFinite(Number(inputs?.[key])));
}

function classifyApplicability({
  metricId,
  retrofitTypeId,
  sourceModelInputs = {},
}) {
  const text = cleanText(retrofitTypeId).toLowerCase();
  const inputs = sourceModelInputs || {};

  if (metricId === "waterConservationGallonsPerYear") {
    if (
      ["rt_water_efficiency", "water_audit"].includes(text) ||
      /water|cooling_tower|laundry|dishwasher/.test(text)
    ) {
      return "applicable";
    }
    return "not_applicable";
  }

  if (metricId === "scope1ThermReductionPerYear") {
    if (
      [
        "rt_gas_to_electric",
        "rt_modeled_gas_therm_reduction",
        "rt_water_efficiency",
      ].includes(text) ||
      /gas|therm|boiler|furnace|water_heater|steam|heat_pump|process_electrification/.test(
        text,
      ) ||
      hasAnyNumber(inputs, ["modeled_therm_reduction", "annual_therms_avoided"])
    ) {
      return "applicable";
    }
    return "not_applicable";
  }

  if (metricId === "scope2ElectricityReductionKwhPerYear") {
    if (
      ["rt_ev_charging", "rt_solar_pv"].includes(text) ||
      /electric|lighting|hvac|refrigeration|solar|battery|ev|motor|compressor|pump|controls|window|insulation|weatherization|laundry|dishwasher|fryer|steamer|charger/.test(
        text,
      ) ||
      hasAnyNumber(inputs, [
        "modeled_kwh_reduction",
        "modeled_new_electric_kwh",
        "estimated_annual_production_kwh",
      ])
    ) {
      return "applicable";
    }
    return "not_applicable";
  }

  if (metricId === "gridPeakDemandReductionKw") {
    if (
      [
        "rt_demand_charge_reduction",
        "rt_led_lighting",
        "rt_modeled_electric_kwh_reduction",
        "rt_gas_to_electric",
        "rt_ev_charging",
      ].includes(text) ||
      /lighting|hvac|refrigeration|battery|demand|controls|ev|charger|compressor|motor|pump|solar/.test(
        text,
      ) ||
      hasAnyNumber(inputs, [
        "peak_kw_reduction",
        "fixture_count",
        "existing_fixture_watts",
        "new_fixture_watts",
        "peak_load_factor",
        "charger_kw",
      ])
    ) {
      return "applicable";
    }
    return "not_applicable";
  }

  return "applicable";
}

function buildNotApplicableMetric({
  value = 0,
  assumptions,
  trace,
  quality,
  provenanceState = "not_applicable",
}) {
  return {
    value,
    provenanceState,
    quality,
    assumptions,
    trace,
  };
}

function resolveWaterMetric({
  billLineDeltas,
  retrofitTypeId,
  sourceModelInputs,
}) {
  const waterDeltas = relevantDeltas(billLineDeltas, "annual_water_use_delta");
  const directGallons = waterDeltas
    .map(convertWaterDeltaToGallons)
    .filter(Number.isFinite);
  if (directGallons.length) {
    const value = -sumNumbers(directGallons);
    return {
      value,
      provenanceState:
        value < 0 ? "increased_consumption" : "source_calculated",
      quality: {
        confidence: "high",
        source: "bill_line_delta",
        sourceVintage: "bill_line_delta",
        notes: [],
      },
      assumptions: [
        "Water deltas are treated as annual gallons when the source bill unit is gallons, or converted from CCF / cubic feet when explicitly labeled.",
      ],
      trace: {
        sourceDeltas: waterDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  const annualWaterReduction = toNumber(
    sourceModelInputs?.annual_water_reduction,
  );
  if (Number.isFinite(annualWaterReduction)) {
    const value = annualWaterReduction;
    return {
      value,
      provenanceState: value < 0 ? "increased_consumption" : "estimated",
      quality: {
        confidence: "medium",
        source: "fixture_assumption",
        sourceVintage: "admin_test_fixture",
        notes: [
          "Water reduction is estimated from the admin fixture's explicit annual water reduction input.",
        ],
      },
      assumptions: [
        "Admin test fixture supplies an explicit annual water reduction assumption.",
      ],
      trace: {
        sourceDeltas: waterDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  const applicability = classifyApplicability({
    metricId: "waterConservationGallonsPerYear",
    retrofitTypeId,
    sourceModelInputs,
  });
  if (applicability === "not_applicable") {
    return buildNotApplicableMetric({
      value: 0,
      provenanceState: "not_applicable",
      quality: {
        confidence: "high",
        source: "not_applicable",
        sourceVintage: "retrofit_archetype",
        notes: [
          "This retrofit archetype does not have a defensible causal pathway to water consumption in the current contract.",
        ],
      },
      assumptions: [
        "Water savings are not applicable for this retrofit archetype in the current model.",
      ],
      trace: {
        sourceDeltas: waterDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    });
  }

  return buildNotApplicableMetric({
    value: 0,
    provenanceState: "unavailable",
    quality: {
      confidence: "low",
      source: "missing_input",
      sourceVintage: "missing_input",
      notes: [
        "Water bill deltas or an explicit water reduction assumption were missing.",
      ],
    },
    assumptions: [
      "Water savings are unavailable until a water bill delta or explicit water estimate is provided.",
    ],
    trace: {
      sourceDeltas: waterDeltas.map(sourceDeltaSummary),
      sourceInputs: sourceInputSummary(sourceModelInputs),
    },
  });
}

function resolveThermMetric({
  billLineDeltas,
  retrofitTypeId,
  sourceModelInputs,
}) {
  const thermDeltas = relevantDeltas(billLineDeltas, "annual_therms_delta");
  const directTherms = thermDeltas
    .map(convertGasDeltaToTherms)
    .filter(Number.isFinite);
  if (directTherms.length) {
    const value = -sumNumbers(directTherms);
    return {
      value,
      provenanceState:
        value < 0 ? "increased_consumption" : "source_calculated",
      quality: {
        confidence: "high",
        source: "bill_line_delta",
        sourceVintage: "bill_line_delta",
        notes: [],
      },
      assumptions: [
        "Therm deltas are read directly from annual therm bill-line changes.",
      ],
      trace: {
        sourceDeltas: thermDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  const modeledTherms = toNumber(
    sourceModelInputs?.modeled_therm_reduction ??
      sourceModelInputs?.annual_therms_avoided,
  );
  if (Number.isFinite(modeledTherms)) {
    const value = modeledTherms;
    return {
      value,
      provenanceState: value < 0 ? "increased_consumption" : "estimated",
      quality: {
        confidence: "medium",
        source: "fixture_assumption",
        sourceVintage: "admin_test_fixture",
        notes: [
          "Therm reduction is estimated from the admin fixture's explicit therm assumption.",
        ],
      },
      assumptions: [
        "Admin test fixture supplies an explicit therm reduction assumption.",
      ],
      trace: {
        sourceDeltas: thermDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  const applicability = classifyApplicability({
    metricId: "scope1ThermReductionPerYear",
    retrofitTypeId,
    sourceModelInputs,
  });
  if (applicability === "not_applicable") {
    return buildNotApplicableMetric({
      value: 0,
      provenanceState: "not_applicable",
      quality: {
        confidence: "high",
        source: "not_applicable",
        sourceVintage: "retrofit_archetype",
        notes: [
          "This retrofit archetype does not have a defensible causal pathway to gas consumption in the current contract.",
        ],
      },
      assumptions: [
        "Scope 1 therm savings are not applicable for this retrofit archetype in the current model.",
      ],
      trace: {
        sourceDeltas: thermDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    });
  }

  return buildNotApplicableMetric({
    value: 0,
    provenanceState: "unavailable",
    quality: {
      confidence: "low",
      source: "missing_input",
      sourceVintage: "missing_input",
      notes: [
        "Gas bill deltas or an explicit therm reduction assumption were missing.",
      ],
    },
    assumptions: [
      "Scope 1 therm savings are unavailable until a gas delta or explicit therm estimate is provided.",
    ],
    trace: {
      sourceDeltas: thermDeltas.map(sourceDeltaSummary),
      sourceInputs: sourceInputSummary(sourceModelInputs),
    },
  });
}

function resolveElectricMetric({
  billLineDeltas,
  retrofitTypeId,
  sourceModelInputs,
}) {
  const electricDeltas = relevantDeltas(billLineDeltas, "annual_kwh_delta");
  const directKwh = electricDeltas
    .map(convertElectricDeltaToKwh)
    .filter(Number.isFinite);
  if (directKwh.length) {
    const value = -sumNumbers(directKwh);
    return {
      value,
      provenanceState:
        value < 0 ? "increased_consumption" : "source_calculated",
      quality: {
        confidence: "high",
        source: "bill_line_delta",
        sourceVintage: "bill_line_delta",
        notes: [],
      },
      assumptions: [
        "Electric deltas are read directly from annual kWh bill-line changes.",
      ],
      trace: {
        sourceDeltas: electricDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  const modeledKwh = toNumber(
    sourceModelInputs?.modeled_kwh_reduction ??
      sourceModelInputs?.estimated_annual_production_kwh,
  );
  const addedKwh = toNumber(sourceModelInputs?.modeled_new_electric_kwh);
  if (Number.isFinite(modeledKwh)) {
    const value = modeledKwh;
    return {
      value,
      provenanceState: value < 0 ? "increased_consumption" : "estimated",
      quality: {
        confidence: "medium",
        source: "fixture_assumption",
        sourceVintage: "admin_test_fixture",
        notes: [
          "Electricity reduction is estimated from the admin fixture's explicit kWh assumption.",
        ],
      },
      assumptions: [
        "Admin test fixture supplies an explicit kWh reduction assumption.",
      ],
      trace: {
        sourceDeltas: electricDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  if (Number.isFinite(addedKwh)) {
    const value = -addedKwh;
    return {
      value,
      provenanceState: value < 0 ? "increased_consumption" : "estimated",
      quality: {
        confidence: "medium",
        source: "fixture_assumption",
        sourceVintage: "admin_test_fixture",
        notes: [
          "Added electricity load is estimated from the admin fixture's explicit kWh input.",
        ],
      },
      assumptions: [
        "Admin test fixture supplies an explicit added kWh assumption.",
      ],
      trace: {
        sourceDeltas: electricDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  const applicability = classifyApplicability({
    metricId: "scope2ElectricityReductionKwhPerYear",
    retrofitTypeId,
    sourceModelInputs,
  });
  if (applicability === "not_applicable") {
    return buildNotApplicableMetric({
      value: 0,
      provenanceState: "not_applicable",
      quality: {
        confidence: "high",
        source: "not_applicable",
        sourceVintage: "retrofit_archetype",
        notes: [
          "This retrofit archetype does not have a defensible causal pathway to electricity consumption in the current contract.",
        ],
      },
      assumptions: [
        "Scope 2 electricity savings are not applicable for this retrofit archetype in the current model.",
      ],
      trace: {
        sourceDeltas: electricDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    });
  }

  return buildNotApplicableMetric({
    value: 0,
    provenanceState: "unavailable",
    quality: {
      confidence: "low",
      source: "missing_input",
      sourceVintage: "missing_input",
      notes: [
        "Electric bill deltas or an explicit kWh reduction assumption were missing.",
      ],
    },
    assumptions: [
      "Scope 2 electricity savings are unavailable until an electric delta or explicit kWh estimate is provided.",
    ],
    trace: {
      sourceDeltas: electricDeltas.map(sourceDeltaSummary),
      sourceInputs: sourceInputSummary(sourceModelInputs),
    },
  });
}

function estimatePeakFromLoadFactor({ modeledValue, loadFactor }) {
  if (
    !Number.isFinite(modeledValue) ||
    !Number.isFinite(loadFactor) ||
    loadFactor <= 0
  )
    return null;
  return modeledValue / (HOURS_PER_YEAR * loadFactor);
}

function resolvePeakMetric({
  billLineDeltas,
  retrofitTypeId,
  sourceModelInputs,
}) {
  const peakDeltas = relevantDeltas(billLineDeltas, "peak_kw_delta");
  const directPeakKw = peakDeltas
    .map((delta) => toNumber(delta?.deltaValue))
    .filter(Number.isFinite);
  if (directPeakKw.length) {
    const value = -sumNumbers(directPeakKw);
    return {
      value,
      provenanceState:
        value < 0 ? "increased_consumption" : "source_calculated",
      quality: {
        confidence: "high",
        source: "bill_line_delta",
        sourceVintage: "bill_line_delta",
        notes: [],
      },
      assumptions: [
        "Peak demand changes are read directly from peak kW bill-line changes.",
      ],
      trace: {
        sourceDeltas: peakDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  if (peakDeltas.length) {
    return buildNotApplicableMetric({
      value: 0,
      provenanceState: "unavailable",
      quality: {
        confidence: "low",
        source: "missing_input",
        sourceVintage: "missing_input",
        notes: [
          "Peak-demand bill deltas were present, but none contained a numeric kW change.",
        ],
      },
      assumptions: [
        "Peak demand is unavailable until a direct peak delta contains at least one numeric kW value.",
      ],
      trace: {
        sourceDeltas: peakDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    });
  }

  const explicitPeakKw = toNumber(sourceModelInputs?.peak_kw_reduction);
  if (Number.isFinite(explicitPeakKw)) {
    const value = explicitPeakKw;
    return {
      value,
      provenanceState: value < 0 ? "increased_consumption" : "estimated",
      quality: {
        confidence: "medium",
        source: "fixture_assumption",
        sourceVintage: "admin_test_fixture",
        notes: [
          "Peak demand is estimated from an explicit admin fixture peak-kW assumption.",
        ],
      },
      assumptions: [
        "Admin test fixture supplies an explicit peak demand assumption.",
      ],
      trace: {
        sourceDeltas: peakDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    };
  }

  const fixtureCount = toNumber(
    sourceModelInputs?.fixture_count ?? sourceModelInputs?.unit_count,
  );
  const existingFixtureWatts = toNumber(
    sourceModelInputs?.existing_fixture_watts,
  );
  const newFixtureWatts = toNumber(sourceModelInputs?.new_fixture_watts);
  const peakLoadFactor = toNumber(sourceModelInputs?.peak_load_factor);
  const hoursPerDay = toNumber(sourceModelInputs?.hours_per_day);
  const operatingDaysPerYear = toNumber(
    sourceModelInputs?.operating_days_per_year,
  );
  const isLighting = cleanText(retrofitTypeId)
    .toLowerCase()
    .includes("lighting");

  if (
    isLighting &&
    Number.isFinite(fixtureCount) &&
    Number.isFinite(existingFixtureWatts) &&
    Number.isFinite(newFixtureWatts)
  ) {
    const value =
      (fixtureCount * (existingFixtureWatts - newFixtureWatts)) / 1000;
    return {
      value,
      provenanceState: value < 0 ? "increased_consumption" : "estimated",
      quality: {
        confidence: "high",
        source: "fixture_assumption",
        sourceVintage: "admin_test_fixture",
        notes: [
          "Peak demand is estimated from the explicit fixture watt delta.",
          "This estimate does not annualize kW from annual kWh.",
        ],
      },
      assumptions: [
        "Peak demand uses the direct equipment watt delta and fixture count.",
        "Peak demand is not annualized from annual kWh.",
      ],
      trace: {
        sourceDeltas: peakDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
        calculation: {
          formula:
            "fixture_count * (existing_fixture_watts - new_fixture_watts) / 1000",
          fixtureCount,
          existingFixtureWatts,
          newFixtureWatts,
          hoursPerDay,
          operatingDaysPerYear,
        },
      },
    };
  }

  const modeledKwh = toNumber(sourceModelInputs?.modeled_kwh_reduction);
  if (Number.isFinite(modeledKwh) && Number.isFinite(peakLoadFactor)) {
    const value = estimatePeakFromLoadFactor({
      modeledValue: modeledKwh,
      loadFactor: peakLoadFactor,
    });
    if (Number.isFinite(value)) {
      return {
        value,
        provenanceState: value < 0 ? "increased_consumption" : "estimated",
        quality: {
          confidence: "medium",
          source: "fixture_assumption",
          sourceVintage: "admin_test_fixture",
          notes: [
            "Peak demand is estimated from annual kWh reduction and an explicit load-factor assumption.",
            "This estimate does not infer kW from annual kWh without a stored load factor.",
          ],
        },
        assumptions: [
          `Peak demand uses modeled kWh reduction with an explicit ${peakLoadFactor.toFixed(2)} load-factor assumption.`,
          "Peak demand is not annualized from annual kWh without an explicit load-factor assumption.",
        ],
        trace: {
          sourceDeltas: peakDeltas.map(sourceDeltaSummary),
          sourceInputs: sourceInputSummary(sourceModelInputs),
          calculation: {
            formula: "modeled_kwh_reduction / (8760 * peak_load_factor)",
            modeledKwhReduction: modeledKwh,
            peakLoadFactor,
          },
        },
      };
    }
  }

  const addedKwh = toNumber(sourceModelInputs?.modeled_new_electric_kwh);
  if (Number.isFinite(addedKwh) && Number.isFinite(peakLoadFactor)) {
    const value = -estimatePeakFromLoadFactor({
      modeledValue: addedKwh,
      loadFactor: peakLoadFactor,
    });
    if (Number.isFinite(value)) {
      return {
        value,
        provenanceState: value < 0 ? "increased_consumption" : "estimated",
        quality: {
          confidence: "medium",
          source: "fixture_assumption",
          sourceVintage: "admin_test_fixture",
          notes: [
            "Peak demand is estimated from added electric load and an explicit load-factor assumption.",
            "This estimate does not infer kW from annual kWh without a stored load factor.",
          ],
        },
        assumptions: [
          `Peak demand uses added electricity load with an explicit ${peakLoadFactor.toFixed(2)} load-factor assumption.`,
          "Peak demand is not annualized from annual kWh without an explicit load-factor assumption.",
        ],
        trace: {
          sourceDeltas: peakDeltas.map(sourceDeltaSummary),
          sourceInputs: sourceInputSummary(sourceModelInputs),
          calculation: {
            formula: "-modeled_new_electric_kwh / (8760 * peak_load_factor)",
            modeledNewElectricKwh: addedKwh,
            peakLoadFactor,
          },
        },
      };
    }
  }

  const chargerKw = toNumber(sourceModelInputs?.charger_kw);
  if (Number.isFinite(chargerKw)) {
    const value = -chargerKw;
    return {
      value,
      provenanceState: value < 0 ? "increased_consumption" : "estimated",
      quality: {
        confidence: "medium",
        source: "fixture_assumption",
        sourceVintage: "admin_test_fixture",
        notes: [
          "Peak demand is estimated from explicit charger nameplate capacity.",
        ],
      },
      assumptions: [
        "Peak demand uses explicit charger nameplate capacity rather than annual kWh.",
      ],
      trace: {
        sourceDeltas: peakDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
        calculation: {
          formula: "-charger_kw",
          chargerKw,
        },
      },
    };
  }

  const applicability = classifyApplicability({
    metricId: "gridPeakDemandReductionKw",
    retrofitTypeId,
    sourceModelInputs,
  });
  if (applicability === "not_applicable") {
    return buildNotApplicableMetric({
      value: 0,
      provenanceState: "not_applicable",
      quality: {
        confidence: "high",
        source: "not_applicable",
        sourceVintage: "retrofit_archetype",
        notes: [
          "This retrofit archetype does not have a defensible causal pathway to grid peak demand in the current contract.",
        ],
      },
      assumptions: [
        "Grid peak-demand savings are not applicable for this retrofit archetype in the current model.",
      ],
      trace: {
        sourceDeltas: peakDeltas.map(sourceDeltaSummary),
        sourceInputs: sourceInputSummary(sourceModelInputs),
      },
    });
  }

  return buildNotApplicableMetric({
    value: 0,
    provenanceState: "unavailable",
    quality: {
      confidence: "low",
      source: "missing_input",
      sourceVintage: "missing_input",
      notes: [
        "Peak-demand bill deltas or an explicit runtime / load-factor assumption were missing.",
      ],
    },
    assumptions: [
      "Peak demand is unavailable until a direct peak delta or an explicit runtime / load-factor assumption is provided.",
    ],
    trace: {
      sourceDeltas: peakDeltas.map(sourceDeltaSummary),
      sourceInputs: sourceInputSummary(sourceModelInputs),
    },
  });
}

function buildSiteEuiMetric({
  squareFootage,
  sourceSquareFootage,
  scope2Metric,
  scope1Metric,
  sourceModelInputs,
}) {
  const parsedSquareFootage = normalizeSquareFootage(squareFootage);
  const scopeMetrics = [scope2Metric, scope1Metric];
  const applicableMetrics = scopeMetrics.filter(
    (metric) => metric.provenanceState !== "not_applicable",
  );
  const unavailableIncluded = applicableMetrics.some(
    (metric) => metric.provenanceState === "unavailable",
  );
  const availableScope2Value =
    scope2Metric.provenanceState === "not_applicable" ||
    !Number.isFinite(scope2Metric.value)
      ? null
      : scope2Metric.value;
  const availableScope1Value =
    scope1Metric.provenanceState === "not_applicable" ||
    !Number.isFinite(scope1Metric.value)
      ? null
      : scope1Metric.value;
  const euiBase =
    parsedSquareFootage && !unavailableIncluded
      ? ((availableScope2Value || 0) * KWH_TO_KBTU +
          (availableScope1Value || 0) * THERM_TO_KBTU) /
        parsedSquareFootage
      : null;
  const sourceDeltas = [
    ...(scope2Metric.trace?.sourceDeltas || []),
    ...(scope1Metric.trace?.sourceDeltas || []),
  ];
  const boundary = buildBoundaryNote();

  if (parsedSquareFootage && applicableMetrics.length > 0) {
    // Preserve source-calculated provenance whenever any included scope is source-backed.
    // The all-not-applicable case is handled below so mixed not_applicable/source_calculated
    // combinations do not get downgraded to not_applicable.
    const provenanceState = unavailableIncluded
      ? "unavailable"
      : [scope2Metric.provenanceState, scope1Metric.provenanceState].includes(
            "estimated",
          )
        ? "estimated"
        : [scope2Metric.provenanceState, scope1Metric.provenanceState].includes(
              "increased_consumption",
            )
          ? "increased_consumption"
          : "source_calculated";
    return buildMetric({
      id: "siteEuiReductionKbtuPerSquareFootPerYear",
      label: "Site EUI reduction",
      unit: "kBtu/sq ft/year",
      sourceField: "annual_kwh_delta+annual_therms_delta",
      value: euiBase == null ? 0 : euiBase,
      provenanceState,
      formulaId: "sustainability.site_eui_reduction_v2",
      quality: {
        confidence: provenanceState === "estimated" ? "medium" : "high",
        source:
          provenanceState === "estimated"
            ? "model_assumption"
            : "bill_line_deltas",
        sourceVintage:
          provenanceState === "estimated"
            ? "fixture_assumption"
            : "bill_line_deltas",
        notes: parsedSquareFootage
          ? []
          : ["Square footage was missing or could not be parsed."],
      },
      assumptions: [
        "Site EUI is computed from annual electric and gas utility deltas only.",
        "1 kWh is treated as 3.412 kBtu and 1 therm is treated as 100 kBtu.",
        "Missing non-applicable utility streams are treated as zero only when the retrofit cannot affect them.",
      ],
      trace: {
        sourceSquareFootage,
        sourceInputs: sourceInputSummary(sourceModelInputs),
        sourceDeltas,
        boundary,
      },
    });
  }

  const allNotApplicable =
    scope2Metric.provenanceState === "not_applicable" &&
    scope1Metric.provenanceState === "not_applicable";
  return buildMetric({
    id: "siteEuiReductionKbtuPerSquareFootPerYear",
    label: "Site EUI reduction",
    unit: "kBtu/sq ft/year",
    sourceField: "annual_kwh_delta+annual_therms_delta",
    value: 0,
    provenanceState: allNotApplicable ? "not_applicable" : "unavailable",
    formulaId: "sustainability.site_eui_reduction_v2",
    quality: {
      confidence: allNotApplicable ? "high" : "low",
      source: allNotApplicable ? "not_applicable" : "missing_input",
      sourceVintage: allNotApplicable ? "retrofit_archetype" : "missing_input",
      notes: parsedSquareFootage
        ? []
        : ["Square footage was missing or could not be parsed."],
    },
    assumptions: allNotApplicable
      ? [
          "Site EUI is not applicable because this retrofit does not affect energy streams.",
        ]
      : [
          "Site EUI is unavailable until square footage and at least one energy stream are available.",
        ],
    trace: {
      sourceSquareFootage,
      sourceInputs: sourceInputSummary(sourceModelInputs),
      sourceDeltas,
      boundary,
    },
  });
}

function buildOperationalCO2eMetric({
  sourceModelInputs,
  scope1Metric,
  scope2Metric,
}) {
  const electricityFactor = getElectricityEmissionFactor({
    stateCode: sourceModelInputs?.stateCode,
  });
  const gasFactor = getNaturalGasEmissionFactor();
  const scopeMetrics = [scope1Metric, scope2Metric];
  const applicableMetrics = scopeMetrics.filter(
    (metric) => metric.provenanceState !== "not_applicable",
  );
  const unavailableIncluded = applicableMetrics.some(
    (metric) => metric.provenanceState === "unavailable",
  );
  const scope2Value =
    scope2Metric.provenanceState === "not_applicable" ||
    !Number.isFinite(scope2Metric.value)
      ? null
      : scope2Metric.value;
  const scope1Value =
    scope1Metric.provenanceState === "not_applicable" ||
    !Number.isFinite(scope1Metric.value)
      ? null
      : scope1Metric.value;
  const scope2Kg =
    scope2Value == null ? null : scope2Value * electricityFactor.kgPerKwh;
  const scope1Kg =
    scope1Value == null ? null : scope1Value * gasFactor.kgCo2ePerTherm;

  const components = [
    {
      scope: "Scope 1",
      sourceMetricId: scope1Metric.id,
      status: scope1Metric.provenanceState,
      valueKgCO2ePerYear:
        scope1Metric.provenanceState === "unavailable" ? null : scope1Kg,
      unit: "kg CO2e/year",
      factor: {
        ...gasFactor.source,
        valueKgCo2PerTherm: gasFactor.kgCo2PerTherm,
        valueKgCh4Co2ePerTherm: gasFactor.kgCh4Co2ePerTherm,
        valueKgN2oCo2ePerTherm: gasFactor.kgN2oCo2ePerTherm,
        valueKgCo2ePerTherm: gasFactor.kgCo2ePerTherm,
      },
    },
    {
      scope: "Scope 2",
      sourceMetricId: scope2Metric.id,
      status: scope2Metric.provenanceState,
      valueKgCO2ePerYear:
        scope2Metric.provenanceState === "unavailable" ? null : scope2Kg,
      unit: "kg CO2e/year",
      factor: {
        ...electricityFactor.source,
        valueKgCo2ePerKwh: electricityFactor.kgPerKwh,
      },
    },
  ];

  const allNotApplicable = components.every(
    (component) => component.status === "not_applicable",
  );
  const includedComponents = components.filter(
    (component) => component.status !== "not_applicable",
  );
  const availableComponents = includedComponents.filter((component) =>
    Number.isFinite(component.valueKgCO2ePerYear),
  );
  const totalKg = unavailableIncluded
    ? null
    : sumNumbers(
        availableComponents.map((component) => component.valueKgCO2ePerYear),
      );
  const anyEstimated = includedComponents.some(
    (component) => component.status === "estimated",
  );
  const anyIncreased = includedComponents.some(
    (component) => component.status === "increased_consumption",
  );
  const anyUnavailable = includedComponents.some(
    (component) => component.status === "unavailable",
  );
  const provenanceState = allNotApplicable
    ? "not_applicable"
    : anyUnavailable
      ? "unavailable"
      : anyEstimated
        ? "estimated"
        : anyIncreased
          ? "increased_consumption"
          : "source_calculated";

  const notes = [];
  if (electricityFactor.source.fallbackUsed) {
    notes.push(
      "The electricity factor used the EPA eGRID 2023 U.S. total fallback because no region-specific factor was available for this site geography.",
    );
  } else {
    notes.push(
      `The electricity factor used the EPA eGRID 2023 ${electricityFactor.source.sourceRegion} factor.`,
    );
  }
  notes.push(
    "The gas factor uses EPA's 2025 stationary combustion factors and AR5 100-year GWPs.",
  );
  notes.push(
    "The operational boundary excludes water, transportation, waste, refrigerants, and embodied carbon.",
  );

  return buildMetric({
    id: "annualOperationalCO2eReductionKgPerYear",
    label: "Annual operational CO2e reduction",
    unit: "kg CO2e/year",
    sourceField: "annual_kwh_delta+annual_therms_delta",
    value: totalKg == null ? 0 : totalKg,
    provenanceState,
    formulaId: "sustainability.operational_co2e_v2",
    quality: {
      confidence:
        provenanceState === "estimated"
          ? "medium"
          : provenanceState === "unavailable"
            ? "low"
            : "high",
      source:
        provenanceState === "source_calculated" ||
        provenanceState === "estimated"
          ? "bill_line_deltas"
          : provenanceState === "not_applicable"
            ? "not_applicable"
            : "missing_input",
      sourceVintage: "2025 EPA factors / bill_line_deltas",
      notes,
    },
    assumptions: [
      "Annual operational CO2e is limited to Scope 1 direct gas combustion and Scope 2 purchased electricity.",
      "Water is not converted to CO2e in this version.",
      "Peak kW is a demand metric, not a CO2e metric.",
      "Direct source deltas are preferred when available; explicit fixture assumptions are used only when the contract has a documented causal pathway.",
    ],
    trace: {
      sourceInputs: sourceInputSummary(sourceModelInputs),
      sourceDeltas: [
        ...(scope1Metric.trace?.sourceDeltas || []),
        ...(scope2Metric.trace?.sourceDeltas || []),
      ],
      boundary: buildBoundaryNote(),
      components,
      valueKgCO2ePerYear: roundValue(totalKg, 6),
    },
  });
}

export function normalizeSquareFootage(value) {
  const parsed = toNumber(value);
  return parsed && parsed > 0 ? parsed : null;
}

export function buildSustainabilityImpact({
  billLineDeltas = [],
  squareFootage,
  sourceSquareFootage = null,
  retrofitTypeId = null,
  retrofitDisplayName = null,
  sourceModelInputs = {},
  stateCode = null,
}) {
  const resolvedSourceModelInputs =
    stateCode && !sourceModelInputs?.stateCode
      ? { ...sourceModelInputs, stateCode }
      : sourceModelInputs;
  const waterMetric = resolveWaterMetric({
    billLineDeltas,
    retrofitTypeId,
    sourceModelInputs,
  });
  const scope1Metric = resolveThermMetric({
    billLineDeltas,
    retrofitTypeId,
    sourceModelInputs: resolvedSourceModelInputs,
  });
  const scope2Metric = resolveElectricMetric({
    billLineDeltas,
    retrofitTypeId,
    sourceModelInputs: resolvedSourceModelInputs,
  });
  const peakMetric = resolvePeakMetric({
    billLineDeltas,
    retrofitTypeId,
    sourceModelInputs,
  });
  const siteEuiMetric = buildSiteEuiMetric({
    squareFootage,
    sourceSquareFootage,
    scope1Metric,
    scope2Metric,
    sourceModelInputs: resolvedSourceModelInputs,
  });
  const co2eMetric = buildOperationalCO2eMetric({
    sourceModelInputs: resolvedSourceModelInputs,
    scope1Metric,
    scope2Metric,
  });

  const metrics = {
    waterConservationGallonsPerYear: buildMetric({
      id: "waterConservationGallonsPerYear",
      label: "Water conservation",
      unit: "gallons/year",
      sourceField: "annual_water_use_delta",
      value: waterMetric.value,
      provenanceState: waterMetric.provenanceState,
      formulaId: "sustainability.water_conservation_v2",
      quality: waterMetric.quality,
      assumptions: waterMetric.assumptions,
      trace: {
        ...waterMetric.trace,
        sourceSquareFootage,
      },
    }),
    scope1ThermReductionPerYear: buildMetric({
      id: "scope1ThermReductionPerYear",
      label: "Scope 1 therm reduction",
      unit: "therms/year",
      sourceField: "annual_therms_delta",
      value: scope1Metric.value,
      provenanceState: scope1Metric.provenanceState,
      formulaId: "sustainability.scope1_therm_reduction_v2",
      quality: scope1Metric.quality,
      assumptions: scope1Metric.assumptions,
      trace: {
        ...scope1Metric.trace,
        sourceSquareFootage,
      },
    }),
    scope2ElectricityReductionKwhPerYear: buildMetric({
      id: "scope2ElectricityReductionKwhPerYear",
      label: "Scope 2 electricity reduction",
      unit: "kWh/year",
      sourceField: "annual_kwh_delta",
      value: scope2Metric.value,
      provenanceState: scope2Metric.provenanceState,
      formulaId: "sustainability.scope2_kwh_reduction_v2",
      quality: scope2Metric.quality,
      assumptions: scope2Metric.assumptions,
      trace: {
        ...scope2Metric.trace,
        sourceSquareFootage,
      },
    }),
    siteEuiReductionKbtuPerSquareFootPerYear: siteEuiMetric,
    gridPeakDemandReductionKw: buildMetric({
      id: "gridPeakDemandReductionKw",
      label: "Grid peak-demand reduction",
      unit: "kW",
      sourceField: "peak_kw_delta",
      value: peakMetric.value,
      provenanceState: peakMetric.provenanceState,
      formulaId: "sustainability.grid_peak_demand_reduction_v2",
      quality: peakMetric.quality,
      assumptions: peakMetric.assumptions,
      trace: {
        ...peakMetric.trace,
        sourceSquareFootage,
      },
    }),
    annualOperationalCO2eReductionKgPerYear: co2eMetric,
  };

  const metricStatuses = Object.values(metrics).map((metric) => metric.status);
  const overallStatus = metricStatuses.some(
    (status) => status === "unavailable",
  )
    ? "partial"
    : metricStatuses.some((status) => status === "estimated")
      ? "estimated"
      : metricStatuses.some((status) => status === "increased_consumption")
        ? "partial"
        : "calculated";

  return {
    schemaVersion: "sustainability-impact-v2",
    status: overallStatus,
    source: {
      sourceSquareFootage,
      billLineDeltaCount: billLineDeltas.length,
      retrofitTypeId,
      retrofitDisplayName: retrofitDisplayName || null,
    },
    quality: {
      confidence:
        overallStatus === "calculated"
          ? "high"
          : overallStatus === "estimated"
            ? "medium"
            : "mixed",
      source: billLineDeltas.length
        ? "bill_line_deltas"
        : "fixture_assumptions",
      notes:
        overallStatus === "partial"
          ? [
              "One or more sustainability metrics could not be calculated from the available inputs.",
            ]
          : [],
    },
    metrics,
  };
}
