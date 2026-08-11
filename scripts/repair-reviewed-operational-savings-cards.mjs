import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const REVIEW_ROOT = join(ROOT, "docs/operational-savings-review");
const CATEGORY_ROOT = join(REVIEW_ROOT, "categories");
const SOURCE_PATH = join(ROOT, "docs/operational-savings-reviewed-cards.json");
const WRITE = process.argv.includes("--write");
const REBUILD = process.argv.includes("--rebuild") || !(await exists(SOURCE_PATH));

const LOGIC = {
  all: "[ALL REQUIRED]",
  select: "[SELECT ONE — BASED ON CONDITION]",
  try: "[TRY IN ORDER — STOP AT FIRST VALID]",
  optional: "[OPTIONAL OVERRIDE]"
};

const LEGEND = `Information Tree Legend

A parent node is the value being resolved.
Its indented sub-branches are the information and processes used to resolve that value.
A bracketed logic line applies to the sibling branches that follow at the same indentation.

${LOGIC.all}
Every child in the group is required.

${LOGIC.select}
Use the branch that matches the actual site, project, equipment, or opportunity condition.

${LOGIC.try}
Evaluate paths from top to bottom and use the first valid result.

${LOGIC.optional}
This information is not required, but replaces an estimate with a more accurate documented value when available.`;

const CANONICAL = {
  "STD-COMSTOCK-ANNUAL-DELTA": ["ComStock Building-Upgrade Screening", "Precompute source-weighted annual resource deltas for approved building and measure segments.", ["https://comstock.nrel.gov/", "https://natlabrockies.github.io/ComStock.github.io/docs/data.html"]],
  "STD-SCOUT-ECM-SCREEN": ["Scout Measure Screening", "Resolve a reviewed Scout measure result only inside its documented market and performance boundary.", ["https://github.com/trynthink/scout", "https://scout-bto.readthedocs.io/"]],
  "STD-OPERATING-SCHEDULE": ["Operating-Schedule Resolution", "Convert recognizable operating patterns, exact schedules, and daylight controls into one annual or interval schedule.", ["https://www.energy.gov/cmei/buildings/commercial-reference-buildings", "https://aa.usno.navy.mil/faq/RST_defs"]],
  "STD-DOE-CCMS-RATINGS": ["DOE Certified-Equipment Ratings", "Resolve exact compatible certified equipment records from retained DOE product-family exports.", ["https://www.regulations.doe.gov/certification-data/", "https://www.energy.gov/cmei/buildings/standardized-templates-recording-test-results"]],
  "STD-ENERGY-STAR-PRODUCT-DATA": ["ENERGY STAR Product Data", "Resolve exact or requirement-filtered active product records in their native test fields.", ["https://www.energystar.gov/productfinder/advanced"]],
  "STD-DLC-LIGHTING-PRODUCTS": ["DLC Lighting Product Resolution", "Resolve exact or requirement-filtered exterior-lighting product input power from retained qualified-product data.", ["https://qpl.designlights.org/auth?qpl=ssl", "https://designlights.org/our-work/solid-state-lighting/technical-requirements/"]],
  "STD-INSTALLED-EQUIPMENT-BASELINE": ["Installed-Equipment Baseline Resolution", "Resolve an unknown existing performance value from exact evidence or a reviewed installed-stock population—not the current efficient-product list.", ["https://www.energy.gov/cmei/buildings/commercial-reference-buildings", "https://comstock.nrel.gov/"]],
  "STD-END-USE-ALLOCATION": ["End-Use Allocation", "Allocate billed resource use to one end use using exact submetering first and a source-backed business/building model otherwise.", ["https://comstock.nrel.gov/", "https://www.energy.gov/cmei/buildings/commercial-reference-buildings"]],
  "STD-COMMERCIAL-HOT-WATER-LOAD": ["Commercial Hot-Water Load Resolution", "Resolve annual useful hot-water load from exact records, recognizable activity, or a context-matched source-backed benchmark.", ["https://www.energy.gov/cmei/buildings/commercial-reference-buildings", "https://www.epa.gov/watersense/best-management-practices", "https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx"]],
  "STD-ACTIVITY-DUTY": ["Recognizable Activity-to-Duty Resolution", "Convert ordinary business activity such as occupants, meals, cycles, rooms, miles, or shifts into the exact annual duty unit required by a category.", ["https://www.energy.gov/cmei/buildings/commercial-reference-buildings", "https://www.epa.gov/watersense/best-management-practices"]],
  "STD-CONTEXT-BENCHMARKS": ["Context-Matched Benchmark Resolution", "Return one source-specific scalar, profile, or input set only from an explicitly retained compatible population or equation.", ["https://www.energy.gov/cmei/buildings/commercial-reference-buildings", "https://comstock.nrel.gov/"]],
  "STD-INDUSTRIAL-SYSTEM-INPUTS": ["Industrial System Input Resolution", "Resolve screening pump, fan, motor, compressor, steam, and process inputs from exact evidence or bounded equipment/application benchmarks.", ["https://www.energy.gov/cmei/ito/measur", "https://github.com/ORNL-AMO/AMO-Tools-Suite"]],
  "STD-DOE-MEASUR": ["DOE MEASUR Engineering Calculation", "Run a pinned local MEASUR calculator with a complete typed input set and retain its warnings and provenance.", ["https://www.energy.gov/cmei/ito/measur", "https://github.com/ORNL-AMO/AMO-Tools-Suite"]],
  "STD-SAM-SOLAR-THERMAL": ["SAM Solar-Thermal Simulation", "Run the pinned local solar-water-heating model using explicit system, weather, load, and backup inputs.", ["https://sam.nrel.gov/solar-water-heating.html", "https://github.com/NREL/ssc"]],
  "STD-PVWATTS-V8": ["PVWatts Solar Production", "Run a pinned local PVWatts implementation with internal weather data and an explicit array configuration.", ["https://developer.nrel.gov/docs/solar/pvwatts/v8/", "https://github.com/NREL/ssc"]],
  "STD-WIND-SAM": ["SAM Wind Production", "Run a pinned local wind model with a real resource file, turbine curve, hub height, and losses.", ["https://sam.nrel.gov/wind.html", "https://github.com/NREL/ssc"]],
  "STD-INTERVAL-TARIFF": ["Interval Tariff Resolution", "Resolve one approved effective tariff input set from an exact tariff or a clearly labeled bill-derived screening path.", ["https://data.openei.org/submissions/5", "https://openei.org/apps/USURDB/download/usurdb.csv.gz"]],
  "STD-REOPT-LOCAL-DISPATCH": ["Local Interval Dispatch", "Run a pinned local dispatch or optimization case using complete internal load, tariff, and technology inputs.", ["https://github.com/NREL/REopt.jl"]],
  "STD-EPA-CHP-PERFORMANCE": ["CHP and Onsite-Generation Performance", "Resolve source-backed generation, fuel input, and useful-heat performance inside a compatible technology and capacity class.", ["https://www.epa.gov/chp/chp-technologies"]],
  "STD-FUELECONOMY-VEHICLES": ["FuelEconomy Vehicle Resolution", "Resolve exact compatible light-duty vehicle records from the retained bulk dataset while keeping technical IDs internal.", ["https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip"]],
  "STD-PUBLIC-EV-UTILIZATION": ["Public Charging Utilization Screening", "Resolve one site-level delivered-energy or utilization assumption from project evidence or a reviewed site-class population; EVI-Pro may supply shape only.", ["https://afdc.energy.gov/fuels/electricity_infrastructure_trends.html", "https://www.nrel.gov/transportation/evi-pro.html"]],
  "STD-WATERSENSE-FIXTURES": ["WaterSense Product Resolution", "Resolve exact or requirement-filtered proposed fixture ratings from a retained official export.", ["https://www.epa.gov/watersense/product-search"]],
  "STD-WATERSENSE-LANDSCAPE": ["WaterSense Landscape Water Budget", "Run the documented local water-budget method using retained climate fields and explicit hydrozone inputs.", ["https://www.epa.gov/watersense/water-budget-tool"]],
  "STD-WATERSENSE-CI-OPERATIONS": ["WaterSense Commercial Operations", "Apply measured-input commercial water equations without treating checklists as numeric evidence.", ["https://www.epa.gov/watersense/best-management-practices"]],
  "STD-FEMP-EXTERIOR-LIGHTING": ["Exterior Lighting Application Benchmark", "Resolve source-backed existing application wattage and requirement boundaries without treating FEMP requirements as a product database.", ["https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting"]],
  "STD-DISHWASHER-WATER-HEATING": ["Dishwasher Water-Heating Conversion", "Apply the retained ENERGY STAR workbook equations in the native rack or hourly activity unit.", ["https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx"]],
  "STD-COMMERCIAL-FOOD-SERVICE": ["Commercial Food-Service Duty and Performance", "Resolve certified active and idle resource use for one compatible equipment type and annual food-service duty.", ["https://www.energystar.gov/products/commercial_food_service_equipment"]],
  "STD-WALKIN-BENCHMARK": ["Walk-In Refrigeration Component Benchmark", "Resolve only the DOE component rows whose physical boundary and native unit match the proposed upgrade.", ["https://www.energy.gov/cmei/buildings/appliance-and-equipment-standards-program"]],
  "STD-FORKLIFT-ENERGY": ["Material-Handling Energy Intensity", "Resolve exact or narrow class-and-duty fuel and electricity intensity from a retained compatible comparison.", ["https://publications.anl.gov/anlpubs/2001/09/40750.pdf"]],
  "STD-REGIONAL-FUEL-PRICE": ["Regional Non-Utility Fuel Price", "Resolve one current regional vehicle or liquid-fuel price from a retained public release or exact receipt/contract override.", ["https://www.eia.gov/petroleum/gasdiesel/"]],
  "STD-BACKUP-POWER-ROUTINE-USE": ["Backup-Power Routine-Use Resolution", "Resolve routine test fuel and standby electricity from exact model evidence or a narrow technology-and-capacity benchmark.", ["https://emilms.fema.gov/IS0815/groups/90.html"]],
  "STD-HOT-WATER-RECIRCULATION": ["Hot-Water Recirculation Resolution", "Resolve pump electricity and distribution heat loss from exact loop evidence or a bounded loop-and-schedule screening model.", ["https://www.energy.gov/cmei/femp/best-management-practice-7-water-use-efficiency"]],
  "STD-DOCUMENT-VALIDATION": ["Project-Document Validation", "Extract and validate technical fields from a supplied document without inventing absent values.", ["https://www.energy.gov/cmei/femp/operations-and-maintenance-best-practices-guide-release-3"]]
};

const CATEGORY_FORMULA_OVERRIDES = {
  "ITC-06": `Annual Operational Savings = Avoided Existing Resource Cost - Added Electricity Cost\n\nUseful Annual Hot-Water Load = Resolved Annual Delivered Hot-Water Load\n\nAvoided Existing Resource = Useful Annual Hot-Water Load / Existing Water-Heater Efficiency × Replacement Fraction\n\nAdded Electricity = Useful Annual Hot-Water Load / Proposed Heat-Pump COP or UEF × Replacement Fraction`,
  "ITC-07": `Annual Operational Savings = (Existing Water-Heating Input - Proposed Water-Heating Input) × Bill-Derived Gas Rate\n\nExisting Water-Heating Input = Resolved Annual Delivered Hot-Water Load / Existing Efficiency\n\nProposed Water-Heating Input = Resolved Annual Delivered Hot-Water Load / Proposed Efficiency`,
  "ITC-08": `Annual Operational Savings = Avoided Backup Resource × Applicable Backup-Resource Rate\n\nUseful Solar Thermal Output = Minimum of (Simulated Solar Thermal Output, Resolved Annual Delivered Hot-Water Load)\n\nAvoided Backup Resource = Convert to Billed Resource Units (Useful Solar Thermal Output / Backup-System Efficiency, Backup-Resource Unit)`
};

const FORBIDDEN_USER = /(efficien|watt|\bkw\b|input power|standby power|pressure rise|total dynamic head|load[- ]bin|load fraction|speed fraction|gallons per|flow rate|thermal energy|temperature rise|water-heating share|tariff|ratchet|database id|fuel economy\.gov id|annual uses per|annual flushes per)/i;
const DO_NOT_FALLBACK = /(applicable resource rates?|bill-derived|rate$|exact product|product requirements?|linked opportunity|contract terms?|certification|study|monitoring|enabling work)/i;

async function exists(path) {
  try { await readFile(path); return true; } catch { return false; }
}

function field(text, start, end) {
  const pattern = new RegExp(`\\*\\*${escapeRegExp(start)}\\*\\*\\n\\n([\\s\\S]*?)(?=\\n\\n\\*\\*${escapeRegExp(end)}\\*\\*|$)`);
  return text.match(pattern)?.[1]?.trim() || "";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseCard(markdown, id) {
  const title = markdown.match(/^# Information Card — (.+)$/m)?.[1]?.trim() || id;
  const retrofits = markdown.match(/^\*\*Retrofits included:\*\* (.+)$/m)?.[1]?.trim() || "";
  const overview = markdown.match(/^\*\*Overview:\*\* (.+)$/m)?.[1]?.trim() || "";
  const broaderFormula = markdown.match(/\*\*Broader Formula\*\*\n\n```text\n([\s\S]*?)\n```/)?.[1]?.trim() || "";
  const expandedFormula = markdown.match(/\*\*Expanded Formula\*\*\n\n```text\n([\s\S]*?)\n```/)?.[1]?.trim() || "";
  const treeText = markdown.match(/\*\*Information Tree\*\*\n\n```text\n([\s\S]*?)\n```/)?.[1]?.trim() || "";
  const processes = [];
  const regex = /^\*\*■ Standard ([1-9]\d*\.[1-9]\d*) — ([^*\n]+)\*\*\n\n([\s\S]*?)(?=^\*\*■ Standard |\s*$)/gm;
  for (const match of markdown.matchAll(regex)) {
    const body = match[3].trim();
    processes.push({
      number: match[1],
      name: match[2].trim(),
      purpose: field(body, "Purpose:", "Source:"),
      source: field(body, "Source:", "Lookup Inputs:"),
      lookupInputs: bullets(field(body, "Lookup Inputs:", "Value Needed:")),
      valueNeeded: bullets(field(body, "Value Needed:", "How to Use:")),
      howToUse: numbered(field(body, "How to Use:", "Automation:")),
      automation: field(body, "Automation:", "Validation:"),
      validation: body.match(/\*\*Validation:\*\*\n([\s\S]*)$/)?.[1]?.trim() || ""
    });
  }
  return { id, title, retrofits, overview, broaderFormula, expandedFormula, treeText, processes };
}

function bullets(text) {
  return text.split("\n").map((line) => line.replace(/^\s*[*-]\s*/, "").trim()).filter(Boolean);
}

function numbered(text) {
  return text.split("\n").map((line) => line.replace(/^\s*\d+\.\s*/, "").trim()).filter(Boolean);
}

function parseTree(text) {
  const lines = text.split("\n").filter(Boolean);
  const root = { label: lines[0] || "Annual Operational Savings", children: [] };
  const stack = [root];
  for (const line of lines.slice(1)) {
    const match = line.match(/^((?:│  |   )*)(?:├─ |└─ )(.*)$/);
    if (!match) continue;
    const depth = match[1].length / 3 + 1;
    const node = { label: match[2].trim(), children: [] };
    const parent = stack[depth - 1] || root;
    parent.children.push(node);
    stack[depth] = node;
    stack.length = depth + 1;
  }
  return root;
}

function renderTree(root) {
  const out = [root.label];
  const walk = (node, prefix) => node.children.forEach((child, index) => {
    const last = index === node.children.length - 1;
    out.push(`${prefix}${last ? "└─ " : "├─ "}${child.label}`);
    walk(child, `${prefix}${last ? "   " : "│  "}`);
  });
  walk(root, "");
  return out.join("\n");
}

function walk(node, fn, parent = null) {
  fn(node, parent);
  for (const child of node.children) walk(child, fn, node);
}

function findNode(root, pattern) {
  let found = null;
  walk(root, (node) => { if (!found && pattern.test(stripLogic(node.label))) found = node; });
  return found;
}

function stripLogic(label) {
  return label.replace(/\s*\[(?:ALL REQUIRED|SELECT ONE[^\]]*|TRY IN ORDER[^\]]*|OPTIONAL OVERRIDE)\]\s*/g, "").trim();
}

function isLogic(node) {
  return /^\[(?:ALL REQUIRED|SELECT ONE|TRY IN ORDER|OPTIONAL OVERRIDE)/.test(node.label);
}

function sourceType(label) {
  return label.match(/\((User|Profile|Bill|Linked Opportunity|Project Document|Derived|Standard Output|Standard)\)/)?.[1] || null;
}

function canonicalFor(name, source, categoryId) {
  const text = `${name} ${source}`;
  if (/ComStock/i.test(text)) return "STD-COMSTOCK-ANNUAL-DELTA";
  if (/Scout/i.test(text)) return "STD-SCOUT-ECM-SCREEN";
  if (/Operating Hours|Operating Schedule|Daylight-Based|daylight|calendar/i.test(text)) return "STD-OPERATING-SCHEDULE";
  if (/DLC|Qualified Products List/i.test(text)) return "STD-DLC-LIGHTING-PRODUCTS";
  if (/FEMP|Exterior Fixture|Lighting-Replacement/i.test(text) && categoryId === "ITC-02") return "STD-FEMP-EXTERIOR-LIGHTING";
  if (/WaterSense.*Landscape|Landscape Water Budget/i.test(text)) return "STD-WATERSENSE-LANDSCAPE";
  if (/WaterSense|Flush|Flow Fixture|Toilet|Urinal/i.test(text) && ["ITC-32", "ITC-33"].includes(categoryId)) return "STD-WATERSENSE-FIXTURES";
  if (/Dishwasher Water-Heating/i.test(text)) return "STD-DISHWASHER-WATER-HEATING";
  if (/FuelEconomy|Vehicle Rating|Vehicle Efficiency/i.test(text)) return "STD-FUELECONOMY-VEHICLES";
  if (/PVWatts/i.test(text)) return "STD-PVWATTS-V8";
  if (/Solar Thermal|solar-water-heating|SAM/i.test(text) && categoryId === "ITC-08") return "STD-SAM-SOLAR-THERMAL";
  if (/Wind/i.test(text) && ["ITC-19", "ITC-26"].includes(categoryId)) return "STD-WIND-SAM";
  if (/Interval Tariff|Tariff Resolution/i.test(text)) return "STD-INTERVAL-TARIFF";
  if (/Dispatch|REopt|Managed Charging|Battery|Microgrid/i.test(text)) return "STD-REOPT-LOCAL-DISPATCH";
  if (/CHP|Combined Heat|Fuel Cell|Biomass|Biogas|Onsite Generation/i.test(text)) return "STD-EPA-CHP-PERFORMANCE";
  if (/Public Charging.*Utilization|Delivered-Energy Resolution|Site Daily/i.test(text)) return "STD-PUBLIC-EV-UTILIZATION";
  if (/Water-Heater|Furnace|Boiler|Refrigeration|Ice Machine|Cooking|Laundry|Dishwasher|EVSE|Charger/i.test(text) && /Exact|Requirement|Product|Rating/i.test(text)) return "STD-ENERGY-STAR-PRODUCT-DATA";
  if (/CCMS|Certified Equipment/i.test(text)) return "STD-DOE-CCMS-RATINGS";
  if (/MEASUR|Engineering Calculation|Motor|Pump|Fan|Compressor|Steam|Process/i.test(text)) return "STD-DOE-MEASUR";
  if (/Hot-Water Load|Hot Water Load|Water-Heating Input Resolution/i.test(text)) return "STD-COMMERCIAL-HOT-WATER-LOAD";
  if (/End-Use|Allocation|share of billed/i.test(text)) return "STD-END-USE-ALLOCATION";
  if (/Activity|Duty|Uses|Flushes|Cycles|Racks|Meals|Rooms/i.test(text)) return "STD-ACTIVITY-DUTY";
  if (/Existing .*Baseline|Installed|Existing .*Rating/i.test(text)) return "STD-INSTALLED-EQUIPMENT-BASELINE";
  if (/Forklift|Material-Handling/i.test(text)) return "STD-FORKLIFT-ENERGY";
  if (/Walk-In/i.test(text)) return "STD-WALKIN-BENCHMARK";
  if (/Fuel Price|Gasoline Price|Diesel Price|Propane Price/i.test(text)) return "STD-REGIONAL-FUEL-PRICE";
  if (/Backup-Power|Generator|Routine-Use/i.test(text)) return "STD-BACKUP-POWER-ROUTINE-USE";
  if (/Recirculation/i.test(text)) return "STD-HOT-WATER-RECIRCULATION";
  if (/Document Validation|Nameplate Validation/i.test(text)) return "STD-DOCUMENT-VALIDATION";
  if (/Food-Service|Cooktop|Fryer|Oven|Steamer/i.test(text)) return "STD-COMMERCIAL-FOOD-SERVICE";
  if (/Context|Benchmark|Screening/i.test(text)) return "STD-CONTEXT-BENCHMARKS";
  return "STD-CONTEXT-BENCHMARKS";
}

function canonicalForFallback(label) {
  if (/hot.?water|water.?heating/i.test(label)) return "STD-COMMERCIAL-HOT-WATER-LOAD";
  if (/hours|schedule|operating time/i.test(label)) return "STD-OPERATING-SCHEDULE";
  if (/activity|uses|flush|cycle|rack|meal|room|miles|duty/i.test(label)) return "STD-ACTIVITY-DUTY";
  if (/existing|baseline|efficien|watt|power|performance/i.test(label)) return "STD-INSTALLED-EQUIPMENT-BASELINE";
  if (/flow|head|pressure|load profile|speed|motor|pump|fan|compress|steam|process/i.test(label)) return "STD-INDUSTRIAL-SYSTEM-INPUTS";
  if (/fuel price/i.test(label)) return "STD-REGIONAL-FUEL-PRICE";
  if (/charging|utilization|delivered energy/i.test(label)) return "STD-PUBLIC-EV-UTILIZATION";
  return "STD-CONTEXT-BENCHMARKS";
}

function makeFallbackProcess(card, parentLabel, index) {
  const canonicalId = canonicalForFallback(parentLabel);
  const clean = stripLogic(parentLabel).replace(/\s*\([^)]*\)$/, "");
  const name = `${clean} Screening Resolution`;
  const number = `9.${index}`;
  const canonical = CANONICAL[canonicalId];
  return {
    number,
    name,
    canonicalId,
    purpose: `Resolve one practical screening value for ${clean.toLowerCase()} when exact project evidence is unavailable.`,
    source: canonical[2].map((url) => `[${new URL(url).hostname}](${url})`).join("\n\n"),
    lookupInputs: ["Business activity and building type from Profile", "Recognizable equipment, system, or service class from the customer", "Operating pattern or annual activity when relevant", "Any exact Project Document supplied as an optional override"],
    valueNeeded: [`One selected ${clean.toLowerCase()} value or structured input set in the unit and scope required by the parent formula`],
    howToUse: ["Use a validated exact document value first when available.", "Otherwise apply only a source-specific compatible population or equation with explicit context filters, unit, scope, source version, and minimum evidence requirements.", "Select one deterministic value or input set and retain the source population, filters, selection rule, fallback level, and warnings.", "Do not substitute a current efficient-product population for an unknown installed baseline or use a business label without a numeric source method."],
    automation: `* **Selected Strategy:** ${canonical[1]}\n* **Automation Method:** Query the versioned internal source adapter, apply the approved category filters, and return one typed value with complete provenance.\n* **Difficulty:** Medium`,
    validation: `This pathway is permitted only where the canonical ${canonicalId} adapter has a retained source-specific equation or compatible population. Until that subadapter and a category golden test exist, the card must label the path implementation-pending rather than inventing a value.`
  };
}

function normalizeUserLabels(card, root) {
  if (card.id === "ITC-33") {
    const activity = findNode(root, /Recognizable Facility Activity/i);
    if (activity) {
      activity.children = activity.children.filter((child) => !/Female Eligible Population|Male Eligible Population|Customer or Visitor Population/i.test(child.label));
      activity.children.unshift({ label: "Approximate Employees, Occupants, and Visitors by Restroom-Use Group (User)", children: [] });
    }
  }
  walk(root, (node) => {
    node.label = node.label.replace(/Analysis Year \(User\)/g, "Analysis Year (Derived)");
    node.label = node.label.replace(/Existing motor class \(User\)/gi, "Motor Application and Approximate Size Class (User)");
    if (sourceType(node.label) === "User" && FORBIDDEN_USER.test(node.label)) {
      node.label = node.label.replace(/\(User\)/, `(Project Document) ${LOGIC.optional}`);
    }
    if (sourceType(node.label) === "Project Document" && !node.label.includes(LOGIC.optional)) {
      node.label += ` ${LOGIC.optional}`;
    }
  });
}

function addHotWaterPath(card, root, newProcesses) {
  if (!["ITC-06", "ITC-07", "ITC-08", "ITC-32", "ITC-52", "ITC-53"].includes(card.id)) return;
  const candidate = findNode(root, /Annual Hot-Water Load|Avoided existing water-heating resource|Annual gas reduction|Water-Heating Service|Water-Heating Resource|Water-Heating Input/i);
  if (!candidate || candidate.children.some((child) => /Commercial Hot-Water Load Resolution/i.test(child.label))) return;
  const index = newProcesses.length + 1;
  const process = {
    number: `8.${index}`,
    name: "Commercial Hot-Water Load Resolution",
    canonicalId: "STD-COMMERCIAL-HOT-WATER-LOAD",
    purpose: "Resolve annual useful hot-water load without requiring the customer to know a water-heating share of the utility bill.",
    source: `[DOE Commercial Reference Buildings](https://www.energy.gov/cmei/buildings/commercial-reference-buildings)\n\n[EPA WaterSense at Work](https://www.epa.gov/watersense/best-management-practices)\n\n[ENERGY STAR Commercial Food Service Calculator](https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx)`,
    lookupInputs: ["Exact annual hot-water use, submeter result, audit, or engineering calculation when available", "Business activity and building type", "Recognizable activity driver such as occupants, rooms, beds, meals, racks, cycles, or laundry loads", "Operating days and active weeks", "Incoming and delivered-water temperature context"],
    valueNeeded: ["One annual useful hot-water load in kWh-thermal/year", "The activity method, assumptions, source version, and fallback level"],
    howToUse: ["Use an exact measured or engineered annual load when available.", "Otherwise choose the source method matching the actual business activity and convert its recognizable activity driver into annual hot-water volume.", "Calculate useful thermal load from annual gallons and temperature rise using the pinned physical conversion.", "When detailed activity is incomplete, use one context-matched source-backed screening value and cap any allocated input at the matching billed resource use.", "Retain every activity input, assumption, source row or equation, unit conversion, and warning."],
    automation: `* **Selected Strategy:** Shared deterministic commercial hot-water-load resolver.\n* **Automation Method:** Select a source-family activity method, calculate annual volume and useful thermal load locally, and store one typed result with provenance.\n* **Difficulty:** Medium`,
    validation: "The current cards contain several exact-document fragments, but an ordinary SMB usually lacks a water-heating submeter or end-use share. This shared process is the required default path; each supported business activity still needs a retained source-specific method and golden test."
  };
  newProcesses.push(process);
  candidate.children.push({ label: LOGIC.try, children: [] });
  candidate.children.push({ label: `Documented Annual Hot-Water Load or Water-Heating Energy Use (Project Document) ${LOGIC.optional}`, children: [] });
  candidate.children.push({ label: "Recognizable Hot-Water Activity", children: [
    { label: "Business Activity and Building Type (Profile)", children: [] },
    { label: "Approximate Occupants, Rooms, Beds, Meals, Racks, Cycles, or Loads (User)", children: [] },
    { label: "Operating Days and Active Weeks (User)", children: [] }
  ]});
  candidate.children.push({ label: `Standard ${process.number} — ${process.name}`, children: [] });
}

function addPublicChargingFallback(card, root, newProcesses) {
  if (card.id !== "ITC-27") return;
  const node = findNode(root, /Site Daily Delivered Energy|Charging Activity|Chronological Electricity Load/i);
  if (!node || node.children.some((child) => /Public Charging Utilization/i.test(child.label))) return;
  const process = {
    number: "8.1",
    name: "Public Charging Utilization Screening",
    canonicalId: "STD-PUBLIC-EV-UTILIZATION",
    purpose: "Resolve one site-level annual or daily delivered-energy assumption when a charging study does not yet exist.",
    source: `[Alternative Fuels Data Center](https://afdc.energy.gov/fuels/electricity_infrastructure_trends.html)\n\n[NREL EVI-Pro](https://www.nrel.gov/transportation/evi-pro.html)`,
    lookupInputs: ["Charger type and count", "Rated output per port", "Public operating hours", "Site class and business activity", "Observed sessions or delivered energy when available"],
    valueNeeded: ["One site-level delivered-energy value", "One normalized charging shape when supported"],
    howToUse: ["Use a real charging or utilization study first.", "Otherwise select one retained site-class utilization value from an authoritative compatible population.", "Use EVI-Pro only for a normalized time-of-day shape when its scenario is compatible; do not treat it as site utilization.", "Cap interval charging by charger count, power, and operating hours, and retain the source, filters, and assumption."],
    automation: `* **Selected Strategy:** Site-class utilization lookup plus a separately normalized charging shape.\n* **Automation Method:** Query the internal utilization population, select one compatible scalar, and combine it with a bounded local schedule.\n* **Difficulty:** Medium to Hard`,
    validation: "No universal source can infer one business site's charger utilization from charger count alone. This path is usable only after a retained site-level population and compatibility filters are approved."
  };
  newProcesses.push(process);
  node.children.push({ label: `Charging Study or Contractor Utilization Design (Project Document) ${LOGIC.optional}`, children: [] });
  node.children.push({ label: "Charger Count, Type, Public Hours, and Site Class (User / Profile / Linked Opportunity)", children: [] });
  node.children.push({ label: `Standard ${process.number} — ${process.name}`, children: [] });
}

function maybeAddFallbacks(card, root, newProcesses) {
  let counter = 1;
  const visit = (node, depth = 0) => {
    for (const child of node.children) visit(child, depth + 1);
    if (depth === 0 || isLogic(node) || DO_NOT_FALLBACK.test(stripLogic(node.label))) return;
    const meaningful = node.children.filter((child) => !isLogic(child));
    if (!meaningful.length) return;
    const docs = meaningful.filter((child) => sourceType(child.label) === "Project Document");
    const standards = meaningful.filter((child) => /^Standard \d+\.\d+ —/.test(child.label));
    const ordinary = meaningful.filter((child) => ["User", "Profile", "Bill", "Derived", "Standard Output"].includes(sourceType(child.label)));
    if (docs.length && !standards.length && !ordinary.length && depth <= 4) {
      const process = makeFallbackProcess(card, node.label, counter++);
      while (newProcesses.some((candidate) => candidate.number === process.number)) process.number = `9.${counter++}`;
      newProcesses.push(process);
      node.children.push({ label: "Practical Screening Context", children: [
        { label: "Business Activity and Building Type (Profile)", children: [] },
        { label: "Recognizable Equipment, System, or Service Class (User)", children: [] },
        { label: "Operating Pattern or Annual Activity, when relevant (User)", children: [] }
      ]});
      node.children.push({ label: `Standard ${process.number} — ${process.name}`, children: [] });
    }
  };
  visit(root);
}

function insertLogic(root) {
  const visit = (node, isRoot = false) => {
    for (const child of node.children) visit(child, false);
    node.children = node.children.filter((child) => !isLogic(child));
    if (!node.children.length) return;
    const labels = node.children.map((child) => stripLogic(child.label));
    let marker = null;
    if (labels.some((label) => /names an exact/i.test(label)) && labels.some((label) => /requirements but no exact/i.test(label))) marker = LOGIC.select;
    else if (labels.filter((label) => /Equipment is a |Rack Machines|Flight or Conveyor|Existing path|Benchmark path|Electric|Gas|Fuel/i.test(label)).length >= 2 && !/Applicable Resource Rates/i.test(node.label)) marker = LOGIC.select;
    else if (node.children.some((child) => sourceType(child.label) === "Project Document") && node.children.some((child) => sourceType(child.label) !== "Project Document")) marker = LOGIC.try;
    else if (node.children.length > 1 || isRoot) marker = LOGIC.all;
    if (marker) node.children.unshift({ label: marker, children: [] });
  };
  visit(root, true);
}

function repairCard(card) {
  const root = parseTree(card.treeText);
  const newProcesses = [];
  normalizeUserLabels(card, root);
  addHotWaterPath(card, root, newProcesses);
  addPublicChargingFallback(card, root, newProcesses);
  maybeAddFallbacks(card, root, newProcesses);
  insertLogic(root);

  const existingNames = new Set(card.processes.map((process) => process.name));
  for (const process of newProcesses) if (!existingNames.has(process.name)) card.processes.push(process);
  for (const process of card.processes) {
    process.canonicalId ||= canonicalFor(process.name, process.source, card.id);
    process.purpose ||= `Resolve the process output required by ${card.title}.`;
    process.lookupInputs = process.lookupInputs.length ? process.lookupInputs : ["The exact values shown beneath this process in the Information Tree"];
    process.valueNeeded = process.valueNeeded.length ? process.valueNeeded : ["One typed formula-ready result with unit, scope, and provenance"];
    process.howToUse = process.howToUse.length ? process.howToUse : ["Read the process inputs from the connected Information Tree branches.", "Apply the canonical Standard only inside its supported source and unit boundary.", "Return one deterministic result with complete provenance and warnings."];
    process.automation ||= `* **Selected Strategy:** Deterministic local resolution through ${process.canonicalId}.\n* **Automation Method:** Use the versioned internal adapter and retain the exact source release, filters, units, and result.\n* **Difficulty:** Medium`;
    process.validation ||= `The process remains limited to the verified capability boundary of ${process.canonicalId}; a category golden test is required before production use.`;
  }
  card.expandedFormula = CATEGORY_FORMULA_OVERRIDES[card.id] || card.expandedFormula;
  card.tree = renderTree(root);
  delete card.treeText;
  return card;
}

function renderProcess(process) {
  const canonical = CANONICAL[process.canonicalId] || CANONICAL["STD-CONTEXT-BENCHMARKS"];
  const source = process.source || canonical[2].map((url) => `[${new URL(url).hostname}](${url})`).join("\n\n");
  return `**■ Standard ${process.number} — ${process.name}**\n\n**Purpose:**\n${process.purpose}\n\n**Canonical Standard:**\n\`${process.canonicalId}\` — ${canonical[0]}\n\n**Source:**\n${source}\n\n**Lookup Inputs:**\n\n${process.lookupInputs.map((value) => `* ${value}`).join("\n")}\n\n**Value Needed:**\n\n${process.valueNeeded.map((value) => `* ${value}`).join("\n")}\n\n**How to Use:**\n\n${process.howToUse.map((value, index) => `${index + 1}. ${value}`).join("\n")}\n\n**Automation:**\n\n${process.automation}\n\n**Validation:**\n${process.validation}`;
}

function renderCard(card) {
  return `# Information Card — ${card.title}\n\n**Retrofits included:** ${card.retrofits}\n\n**Overview:** ${card.overview}\n\n**Broader Formula**\n\n\`\`\`text\n${card.broaderFormula}\n\`\`\`\n\n**Expanded Formula**\n\n\`\`\`text\n${card.expandedFormula}\n\`\`\`\n\n**Information Tree Legend**\n\n\`\`\`text\n${LEGEND}\n\`\`\`\n\n**Information Tree**\n\n\`\`\`text\n${card.tree}\n\`\`\`\n\n${card.processes.map(renderProcess).join("\n\n")}`;
}

function validate(cards) {
  const errors = [];
  if (cards.length !== 54) errors.push(`Expected 54 cards, found ${cards.length}`);
  const ids = cards.map((card) => card.id);
  if (new Set(ids).size !== ids.length) errors.push("Duplicate category IDs");
  for (let index = 1; index <= 54; index++) {
    const id = `ITC-${String(index).padStart(2, "0")}`;
    if (!ids.includes(id)) errors.push(`Missing ${id}`);
  }
  for (const card of cards) {
    if (!card.tree.includes(LOGIC.all)) errors.push(`${card.id} lacks ${LOGIC.all}`);
    const references = [...card.tree.matchAll(/Standard ([1-9]\d*\.[1-9]\d*) — ([^\n]+)/g)].map((match) => `${match[1]}\u0000${match[2].trim()}`);
    const sections = card.processes.map((process) => `${process.number}\u0000${process.name}`);
    for (const ref of references) if (!sections.includes(ref)) errors.push(`${card.id} tree process missing section: ${ref}`);
    for (const section of sections) if (!references.includes(section)) errors.push(`${card.id} process section not referenced by tree: ${section}`);
    const processKeys = new Set();
    for (const process of card.processes) {
      const key = `${process.number}\u0000${process.name}`;
      if (processKeys.has(key)) errors.push(`${card.id} duplicate process ${key}`);
      processKeys.add(key);
      if (!CANONICAL[process.canonicalId]) errors.push(`${card.id}/${process.name} unknown canonical Standard ${process.canonicalId}`);
      if (!process.lookupInputs.length || !process.valueNeeded.length || !process.howToUse.length) errors.push(`${card.id}/${process.name} incomplete process contract`);
    }
    for (const line of card.tree.split("\n")) {
      if (/\(User\)/.test(line) && FORBIDDEN_USER.test(line)) errors.push(`${card.id} unrealistic User input: ${line.trim()}`);
      if (/\(Project Document\)/.test(line) && !line.includes(LOGIC.optional)) errors.push(`${card.id} Project Document is not marked optional override: ${line.trim()}`);
    }
    if (/Input Bindings|Output Bindings|Human Review Snapshot|Scenario Readiness/.test(renderCard(card))) errors.push(`${card.id} contains banned visible audit content`);
  }
  return errors;
}

function buildRealism(cards) {
  const inputs = [];
  for (const card of cards) {
    for (const line of card.tree.split("\n")) {
      const label = stripLogic(line.replace(/^((?:│  |   )*)(?:├─ |└─ )/, "").trim());
      const source = sourceType(label);
      if (!source) continue;
      inputs.push({ category_id: card.id, visible_label: label, source, ordinary_user_expected: source === "User", optional_override: label.includes(LOGIC.optional) || line.includes(LOGIC.optional) });
    }
  }
  return { schema_version: "operational-savings/reviewed-user-realism-v1", generated_on: new Date().toISOString(), inputs };
}

function renderCanonicalRegistry(cards) {
  const used = new Map();
  for (const card of cards) for (const process of card.processes) {
    if (!used.has(process.canonicalId)) used.set(process.canonicalId, new Set());
    used.get(process.canonicalId).add(card.id);
  }
  return `# Reviewed Operational-Savings Canonical Standards\n\nA category-local process is the visible branch operation in an Information Card. A canonical Standard is the reusable source, dataset, model, or deterministic method used by one or more processes.\n\n${[...used].sort().map(([id, categories]) => { const value = CANONICAL[id]; return `## ${id} — ${value[0]}\n\n**Purpose:** ${value[1]}\n\n**Official sources:**\n${value[2].map((url) => `- ${url}`).join("\n")}\n\n**Used by:** ${[...categories].sort().join(", ")}`; }).join("\n\n")}`;
}

function renderIndex(cards) {
  return `# Operational-Savings Information Cards\n\nThe 54 founder-reviewed cards use one visible format, practical customer paths, explicit branch logic, category-local processes, and reusable canonical Standards.\n\n${cards.map((card) => `- [${card.id} — ${card.title}](categories/${card.id}.md)`).join("\n")}`;
}

function renderAudit(cards) {
  const processCount = cards.reduce((sum, card) => sum + card.processes.length, 0);
  const standardCount = new Set(cards.flatMap((card) => card.processes.map((process) => process.canonicalId))).size;
  const userCount = buildRealism(cards).inputs.filter((input) => input.source === "User").length;
  const documentCount = buildRealism(cards).inputs.filter((input) => input.source === "Project Document").length;
  return `# Reviewed Operational-Savings Information Card Audit\n\n- Information Cards: ${cards.length}\n- Category-local processes: ${processCount}\n- Canonical Standards used: ${standardCount}\n- Visible User leaves: ${userCount}\n- Visible Project Document leaves: ${documentCount}\n\n## Review rules enforced\n\n- Parent nodes are resolved by their indented sub-branches.\n- Every card displays the four approved branch-logic labels.\n- Formula-critical technical documents are optional overrides rather than ordinary User inputs.\n- Technical or uncommon User inputs fail validation.\n- Each process names one reusable canonical Standard.\n- Every tree process has one complete visible process section and no unreferenced process section remains.\n- Missing source-specific benchmark implementation is disclosed rather than hidden behind a generic default.\n\n## Status\n\nThese cards are ready for founder semantic review. Production calculation deployment remains separate and requires source-backed adapters, golden fixtures, overlap rules, and runtime integration.`;
}

async function bootstrap() {
  const files = (await readdir(CATEGORY_ROOT)).filter((file) => /^ITC-\d{2}\.md$/.test(file)).sort();
  return Promise.all(files.map(async (file) => repairCard(parseCard(await readFile(join(CATEGORY_ROOT, file), "utf8"), file.slice(0, 6)))));
}

export async function generateReviewedCards({ write = false, rebuild = false } = {}) {
  const cards = rebuild || !(await exists(SOURCE_PATH)) ? await bootstrap() : JSON.parse(await readFile(SOURCE_PATH, "utf8")).cards;
  const errors = validate(cards);
  if (errors.length) throw new Error(`Reviewed Information Card validation failed:\n${errors.join("\n")}`);
  const artifacts = new Map();
  artifacts.set("docs/operational-savings-reviewed-cards.json", `${JSON.stringify({ schema_version: "operational-savings/reviewed-cards-v1", generated_on: new Date().toISOString(), cards }, null, 2)}\n`);
  artifacts.set("docs/operational-savings-standard-registry.md", `${renderCanonicalRegistry(cards)}\n`);
  artifacts.set("docs/operational-savings-information-tree-audit.md", `${renderAudit(cards)}\n`);
  artifacts.set("docs/operational-savings-user-input-realism.json", `${JSON.stringify(buildRealism(cards), null, 2)}\n`);
  artifacts.set("docs/operational-savings-review/README.md", `${renderIndex(cards)}\n`);
  artifacts.set("docs/operational-savings-information-trees.md", `${cards.map((card) => `## ${card.id} — ${card.title}\n\n\`\`\`text\n${card.tree}\n\`\`\``).join("\n\n")}\n`);
  for (const card of cards) artifacts.set(`docs/operational-savings-review/categories/${card.id}.md`, `${renderCard(card)}\n`);
  if (write) for (const [relative, content] of artifacts) {
    const path = join(ROOT, relative);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content);
  }
  return { cards, artifacts, errors };
}

export async function validateReviewedCards() {
  const { cards, artifacts } = await generateReviewedCards({ write: false, rebuild: false });
  const errors = validate(cards);
  for (const [relative, expected] of artifacts) {
    const actual = await readFile(join(ROOT, relative), "utf8").catch(() => null);
    if (actual !== expected) errors.push(`Stale or missing generated artifact: ${relative}`);
  }
  return { cards: cards.length, processes: cards.reduce((sum, card) => sum + card.processes.length, 0), standards: new Set(cards.flatMap((card) => card.processes.map((process) => process.canonicalId))).size, errors };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await generateReviewedCards({ write: WRITE, rebuild: REBUILD });
  process.stdout.write(`Generated ${result.cards.length} reviewed Information Cards and ${result.cards.reduce((sum, card) => sum + card.processes.length, 0)} process sections.\n`);
}
