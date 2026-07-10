const EGRID2023_SOURCE = {
  title: "EPA eGRID Summary Tables 2023",
  publishedOn: "2025-03-27",
  url: "https://www.epa.gov/system/files/documents/2025-06/summary_tables_rev2.pdf",
  reference: "EPA eGRID2023 total output emission rates"
};

const EPA_GHG_FACTORS_SOURCE = {
  title: "EPA Emission Factors for Greenhouse Gas Inventories",
  publishedOn: "2025-01-15",
  url: "https://www.epa.gov/system/files/documents/2025-01/ghg-emission-factors-hub-2025.pdf",
  reference: "EPA stationary combustion factors"
};

const EGRID2023_TOTAL_OUTPUT_EMISSION_RATES_LB_PER_MWH = {
  US: 770.9,
  CA: 430.0,
  MI: 976.0,
  NY: 466.6,
  TX: 771.2,
  WA: 266.6,
  OR: 365.0
};

const EGRID2023_STATE_TO_FACTOR = {
  CA: {
    lbsPerMwh: EGRID2023_TOTAL_OUTPUT_EMISSION_RATES_LB_PER_MWH.CA,
    sourceRegion: "CAMX",
    sourceLabel: "WECC California subregion output emission rate",
    sourceType: "regional_subregion"
  },
  MI: {
    lbsPerMwh: EGRID2023_TOTAL_OUTPUT_EMISSION_RATES_LB_PER_MWH.MI,
    sourceRegion: "RFCM",
    sourceLabel: "RFC Michigan subregion output emission rate",
    sourceType: "regional_subregion"
  },
  NY: {
    lbsPerMwh: EGRID2023_TOTAL_OUTPUT_EMISSION_RATES_LB_PER_MWH.NY,
    sourceRegion: "NY",
    sourceLabel: "New York state output emission rate",
    sourceType: "state"
  },
  TX: {
    lbsPerMwh: EGRID2023_TOTAL_OUTPUT_EMISSION_RATES_LB_PER_MWH.TX,
    sourceRegion: "TX",
    sourceLabel: "Texas state output emission rate",
    sourceType: "state"
  },
  WA: {
    lbsPerMwh: EGRID2023_TOTAL_OUTPUT_EMISSION_RATES_LB_PER_MWH.WA,
    sourceRegion: "WA",
    sourceLabel: "Washington state output emission rate",
    sourceType: "state"
  },
  OR: {
    lbsPerMwh: EGRID2023_TOTAL_OUTPUT_EMISSION_RATES_LB_PER_MWH.OR,
    sourceRegion: "OR",
    sourceLabel: "Oregon state output emission rate",
    sourceType: "state"
  }
};

const NATURAL_GAS_GWP = {
  ch4: 28,
  n2o: 265
};

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function lbPerMwhToKgPerKwh(value) {
  const parsed = toNumber(value);
  return parsed == null ? null : parsed * 0.00045359237;
}

function kgPerMmBtuToKgPerTherm(value) {
  const parsed = toNumber(value);
  return parsed == null ? null : parsed * 0.1;
}

function buildElectricityFactorFromSource(source, fallbackUsed) {
  const kgPerKwh = lbPerMwhToKgPerKwh(source.lbsPerMwh);
  if (kgPerKwh == null) {
    return null;
  }

  return {
    kgPerKwh,
    lbsPerMwh: source.lbsPerMwh,
    source: {
      sourceType: source.sourceType,
      sourceLabel: source.sourceLabel,
      sourceRegion: source.sourceRegion,
      version: EGRID2023_SOURCE.title,
      publishedOn: EGRID2023_SOURCE.publishedOn,
      url: EGRID2023_SOURCE.url,
      reference: EGRID2023_SOURCE.reference,
      fallbackUsed
    }
  };
}

export function getElectricityEmissionFactor({ stateCode } = {}) {
  const normalizedState = cleanText(stateCode).toUpperCase();
  const source = EGRID2023_STATE_TO_FACTOR[normalizedState];
  if (source) {
    return buildElectricityFactorFromSource(source, false);
  }

  return buildElectricityFactorFromSource(
    {
      lbsPerMwh: EGRID2023_TOTAL_OUTPUT_EMISSION_RATES_LB_PER_MWH.US,
      sourceRegion: "US",
      sourceLabel: "U.S. total output emission rate",
      sourceType: "national_fallback"
    },
    true
  );
}

export function getNaturalGasEmissionFactor() {
  const kgCo2PerTherm = kgPerMmBtuToKgPerTherm(53.06);
  const kgCh4Co2ePerTherm = kgPerMmBtuToKgPerTherm(0.001) * NATURAL_GAS_GWP.ch4;
  const kgN2oCo2ePerTherm = kgPerMmBtuToKgPerTherm(0.0001) * NATURAL_GAS_GWP.n2o;
  const kgCo2ePerTherm = (kgCo2PerTherm || 0) + (kgCh4Co2ePerTherm || 0) + (kgN2oCo2ePerTherm || 0);

  return {
    kgCo2PerTherm,
    kgCh4Co2ePerTherm,
    kgN2oCo2ePerTherm,
    kgCo2ePerTherm,
    source: {
      sourceType: "stationary_combustion",
      sourceLabel: "EPA stationary combustion factor",
      sourceRegion: "US",
      version: EPA_GHG_FACTORS_SOURCE.title,
      publishedOn: EPA_GHG_FACTORS_SOURCE.publishedOn,
      url: EPA_GHG_FACTORS_SOURCE.url,
      reference: EPA_GHG_FACTORS_SOURCE.reference,
      gwp: NATURAL_GAS_GWP,
      fallbackUsed: false
    }
  };
}

export function buildSourceLedgerEntry({
  label,
  value,
  unit,
  source,
  fallbackUsed = false
}) {
  return {
    label,
    value,
    unit,
    source: {
      ...source,
      fallbackUsed
    }
  };
}

export function buildBoundaryNote() {
  return {
    included: [
      "Scope 1 direct on-site natural gas combustion",
      "Scope 2 purchased electricity use"
    ],
    excluded: [
      "water",
      "transportation",
      "waste",
      "refrigerants",
      "embodied carbon",
      "upstream fuel extraction",
      "other lifecycle emissions"
    ],
    note: "Operational CO2e is limited to direct combustion and purchased electricity so the result does not double-count non-energy utility streams or lifecycle emissions."
  };
}
