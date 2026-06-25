export const UTILITY_ALIASES = {
  UTIL_PGE: [
    "pg&e",
    "pge",
    "pacific gas and electric",
    "pacific gas & electric",
    "pacific gas and electric company"
  ],
  UTIL_SCE: [
    "sce",
    "southern california edison",
    "southern california edison company"
  ],
  UTIL_SDGE: [
    "sdg&e",
    "sdge",
    "san diego gas & electric",
    "san diego gas and electric",
    "san diego gas and electric company"
  ],
  UTIL_SVP: [
    "svp",
    "silicon valley power"
  ],
  UTIL_LADWP: [
    "ladwp",
    "los angeles department of water and power",
    "los angeles dept of water and power"
  ],
  UTIL_SMUD: [
    "smud",
    "sacramento municipal utility district"
  ],
  UTIL_CONED: [
    "coned",
    "con ed",
    "con edison",
    "consolidated edison",
    "conedison"
  ],
  UTIL_XCEL: [
    "xcel",
    "xcel energy"
  ],
  UTIL_DUKE: [
    "duke",
    "duke energy"
  ],
  UTIL_AUSTIN_ENERGY: [
    "austin energy"
  ]
};

export const UTILITY_DISPLAY_NAMES = {
  UTIL_PGE: "PG&E",
  UTIL_SCE: "Southern California Edison",
  UTIL_SDGE: "SDG&E",
  UTIL_SVP: "Silicon Valley Power",
  UTIL_LADWP: "LADWP",
  UTIL_SMUD: "SMUD",
  UTIL_CONED: "ConEd",
  UTIL_XCEL: "Xcel Energy",
  UTIL_DUKE: "Duke Energy",
  UTIL_AUSTIN_ENERGY: "Austin Energy"
};

export const TECHNOLOGY_ALIASES = {
  ev_charging: [
    "ev charging",
    "ev charger",
    "electric vehicle service equipment",
    "evse",
    "level-2",
    "level 2",
    "dc fast charging",
    "charging station",
    "power your drive"
  ],
  fleet_electrification: [
    "fleet",
    "medium-duty",
    "heavy-duty",
    "clean vehicle",
    "electric vehicle fleet",
    "zero-emission vehicle"
  ],
  hvac: [
    "hvac",
    "heat pump",
    "air conditioner",
    "air conditioning",
    "chiller",
    "mini-split",
    "ductless",
    "furnace",
    "boiler"
  ],
  lighting: [
    "lighting",
    "led",
    "light-emitting diode"
  ],
  refrigeration: [
    "refrigeration",
    "refrigerator",
    "freezer",
    "cooler",
    "vending machine controls"
  ],
  solar: [
    "solar",
    "solar photovoltaic",
    "solar pv",
    "photovoltaic",
    "pv system"
  ],
  battery_storage: [
    "battery storage",
    "energy storage",
    "storage system"
  ],
  water_efficiency: [
    "water efficiency",
    "watersense",
    "irrigation",
    "toilet",
    "fixture",
    "cooling tower"
  ],
  building_controls: [
    "building controls",
    "controls",
    "energy management",
    "building management system",
    "programmable thermostat",
    "thermostat",
    "load management"
  ],
  commercial_kitchen: [
    "commercial kitchen",
    "food service",
    "commercial cooking",
    "dishwasher",
    "cooking equipment",
    "restaurant equipment"
  ],
  building_envelope: [
    "insulation",
    "air sealing",
    "weatherization",
    "window",
    "door",
    "roof",
    "building envelope"
  ],
  energy_efficiency: [
    "energy efficiency",
    "efficiency",
    "custom measure",
    "whole building",
    "retrofit",
    "comprehensive measures"
  ],
  demand_response: [
    "demand response",
    "load reduction",
    "emergency load reduction",
    "peak event"
  ]
};

export const IMPROVEMENT_TO_TECHNOLOGY = {
  "LED lighting": ["lighting"],
  HVAC: ["hvac"],
  Refrigeration: ["refrigeration"],
  Solar: ["solar"],
  "Battery storage": ["battery_storage"],
  "EV charging": ["ev_charging"],
  "Water efficiency": ["water_efficiency"],
  "Building controls": ["building_controls"],
  "Commercial kitchen equipment": ["commercial_kitchen"],
  "Not sure yet": []
};

export const ORGANIZATION_TYPE_ALIASES = {
  commercial: ["commercial business", "commercial", "business", "retail", "office"],
  industrial: ["industrial facility", "industrial", "manufacturing"],
  agricultural: ["agricultural operation", "agricultural", "agriculture", "farm"],
  multifamily: ["multifamily property", "multifamily", "apartment"],
  nonprofit: ["nonprofit organization", "nonprofit", "non-profit", "not-for-profit"],
  government: ["government / public agency", "government", "public agency", "municipal", "state government", "local government"],
  residential: ["residential", "single family", "homeowner"]
};

export const BUILDING_TYPE_ALIASES = {
  restaurant: ["restaurant / commercial kitchen", "restaurant", "commercial kitchen", "food service"],
  grocery: ["grocery / convenience store", "grocery", "convenience store"],
  hospitality: ["hotel / hospitality", "hotel", "hospitality", "lodging"],
  warehouse: ["warehouse / industrial space", "warehouse", "industrial space"],
  medical: ["medical / dental office", "medical", "dental", "healthcare"],
  office: ["office"],
  retail: ["retail"],
  multifamily: ["multifamily", "apartment"],
  other: ["other"]
};

export const STATE_NAMES = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "District of Columbia",
  US: "United States"
};

export const STATE_CODES_BY_NAME = Object.fromEntries(
  Object.entries(STATE_NAMES).map(([code, name]) => [normalizeText(name), code])
);

export function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function canonicalUtilityId(value) {
  const normalized = normalizeText(value);
  if (!normalized || normalized === "other not sure") return null;

  for (const [utilityId, aliases] of Object.entries(UTILITY_ALIASES)) {
    if (aliases.some((alias) => normalized.includes(normalizeText(alias)))) {
      return utilityId;
    }
  }

  return null;
}

export function canonicalOrganizationType(value) {
  const normalized = normalizeText(value);
  for (const [type, aliases] of Object.entries(ORGANIZATION_TYPE_ALIASES)) {
    if (aliases.some((alias) => normalized.includes(normalizeText(alias)))) {
      return type;
    }
  }
  return normalized ? "other" : null;
}

export function canonicalBuildingType(value) {
  const normalized = normalizeText(value);
  for (const [type, aliases] of Object.entries(BUILDING_TYPE_ALIASES)) {
    if (aliases.some((alias) => normalized.includes(normalizeText(alias)))) {
      return type;
    }
  }
  return normalized ? "other" : null;
}

export function canonicalTechnologiesFromText(value) {
  const text = normalizeText(value);
  if (!text) return [];

  const technologies = [];
  for (const [technologyId, aliases] of Object.entries(TECHNOLOGY_ALIASES)) {
    if (aliases.some((alias) => text.includes(normalizeText(alias)))) {
      technologies.push(technologyId);
    }
  }
  return unique(technologies);
}

export function canonicalTechnologiesFromImprovements(values) {
  return unique(
    asArray(values).flatMap((value) => IMPROVEMENT_TO_TECHNOLOGY[value] || canonicalTechnologiesFromText(value))
  );
}

export function extractStateCode(value) {
  const text = String(value || "");
  const upper = text.toUpperCase();
  const explicitCode = upper.match(/(?:^|[^A-Z])(A[LKZR]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[A]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])(?:[^A-Z]|$)/);
  if (explicitCode) return explicitCode[1];

  const normalized = normalizeText(text);
  for (const [stateName, stateCode] of Object.entries(STATE_CODES_BY_NAME)) {
    if (normalized.includes(stateName)) return stateCode;
  }

  return null;
}

export function extractZip5(value) {
  const match = String(value || "").match(/\b(\d{5})(?:-\d{4})?\b/);
  return match ? match[1] : null;
}

export function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null || value === "") return [];
  return [value];
}

export function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
