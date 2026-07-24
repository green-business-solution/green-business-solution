import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOperationalSavingsReview,
  loadOperationalSavingsSources
} from "../../generate-operational-savings-review-pages.mjs";
import { runStandardPrototype } from "./adapter-prototype.mjs";

const REPO_ROOT = fileURLToPath(new URL("../../..", import.meta.url));
const OUTPUT_ROOT = join(REPO_ROOT, "docs/operational-savings-automation-research");
const STANDARDS_ROOT = join(OUTPUT_ROOT, "standards");
const CATEGORIES_ROOT = join(OUTPUT_ROOT, "categories");
const SAMPLES_ROOT = join(OUTPUT_ROOT, "samples");
const CATALOG_PATH = fileURLToPath(new URL("./research-catalog.json", import.meta.url));

function escapeCell(value) {
  return String(value ?? "")
    .replaceAll("|", "\\|")
    .replaceAll("\n", "<br>");
}

function table(headers, rows) {
  return [
    `| ${headers.map(escapeCell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`)
  ].join("\n");
}

function unique(values) {
  return [...new Set(values.filter((value) => value !== null && value !== undefined && value !== ""))];
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function parseHours(value) {
  const match = String(value).match(/^(\d+)-(\d+)$/);
  return match ? { minimum: Number(match[1]), maximum: Number(match[2]) } : { minimum: 0, maximum: 0 };
}

function formatMoney(value) {
  return `$${Number(value).toFixed(Number.isInteger(Number(value)) ? 0 : 2)}`;
}

function countLabel(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function asSentence(value) {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function aggregateFeasibility(standards) {
  const precedence = [
    "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES",
    "PARTIALLY_FEASIBLE",
    "FEASIBLE_AFTER_MANUAL_SEED",
    "FEASIBLE_AFTER_ADAPTER_WORK",
    "FEASIBLE_NOW"
  ];
  return precedence.find((verdict) =>
    standards.some((standard) => standard.feasibility === verdict)
  ) || "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES";
}

const TESTED_ACCESS_ROUTES = new Map([
  ["STD-COMSTOCK-ANNUAL-DELTA", new Set([2])],
  ["STD-SCOUT-ECM-SCREEN", new Set([0, 1])],
  ["STD-DOE-CCMS-RATINGS", new Set([0])],
  ["STD-ENERGY-STAR-PRODUCT-DATA", new Set([1])],
  ["STD-DOE-MEASUR", new Set([0, 1])],
  ["STD-SAM-SOLAR-THERMAL", new Set([0, 1])],
  ["STD-PVWATTS-V8", new Set([0, 1])],
  ["STD-WIND-SAM", new Set([0, 1])],
  ["STD-INTERVAL-TARIFF", new Set([0, 2])],
  ["STD-REOPT-LOCAL-DISPATCH", new Set([0])],
  ["STD-EPA-CHP-PERFORMANCE", new Set([0])],
  ["STD-FUELECONOMY-VEHICLES", new Set([0])],
  ["STD-WATERSENSE-FIXTURES", new Set([0, 1])],
  ["STD-WATERSENSE-LANDSCAPE", new Set([1])],
  ["STD-WATERSENSE-CI-OPERATIONS", new Set([1])],
  ["STD-FEMP-EXTERIOR-LIGHTING", new Set([0])],
  ["STD-OPERATING-SCHEDULE", new Set([2])],
  ["STD-DISHWASHER-WATER-HEATING", new Set([0])],
  ["STD-CONTEXT-BENCHMARKS", new Set([0, 1, 2, 3, 4])]
]);

function accessEndpoint(standard, route) {
  const lower = route.toLowerCase();
  const findUrl = (...terms) =>
    standard.officialUrls.find((url) => terms.some((term) => url.toLowerCase().includes(term)));
  if (lower.includes("tariff pdf") || lower.includes("tariff book")) {
    return "Project-specific controlling utility publication";
  }
  if (lower.includes("parquet")) {
    return findUrl("/docs/data.html") || standard.officialUrls[0];
  }
  if (
    standard.id === "STD-COMSTOCK-ANNUAL-DELTA" &&
    (lower.includes("dictionary") || lower.includes("crosswalk"))
  ) {
    return findUrl("/docs/data.html") || standard.officialUrls[0];
  }
  if (
    standard.id === "STD-ENERGY-STAR-PRODUCT-DATA" &&
    lower.includes("download")
  ) {
    return findUrl("/products/productstr") ||
      standard.officialUrls[0];
  }
  if (standard.id === "STD-ENERGY-STAR-PRODUCT-DATA" && lower.includes("export")) {
    return findUrl("/productfinder/advanced") || standard.officialUrls[0];
  }
  if (lower.includes("template")) {
    return findUrl("templates") || standard.officialUrls[0];
  }
  if (lower.includes("api") || lower.includes("web service")) {
    return findUrl("developer.", "data.energystar.gov", "apps.openei.org", "/ws/") ||
      standard.officialUrls[0];
  }
  if (
    lower.includes("git") ||
    lower.includes("repository") ||
    lower.includes("source") ||
    lower.includes("ssc") ||
    lower.includes("pysam") ||
    lower.includes("julia") ||
    lower.includes("c++") ||
    lower.includes("webassembly")
  ) {
    return findUrl("github.com") || standard.officialUrls[0];
  }
  if (
    lower.includes("download") ||
    lower.includes("bulk") ||
    lower.includes("parquet") ||
    lower.includes("csv") ||
    lower.includes("xlsx") ||
    lower.includes("json") ||
    lower.includes("data file")
  ) {
    return findUrl(".xlsx", ".zip", ".gz", ".json", "download", "oedi-data-lake") ||
      standard.officialUrls[0];
  }
  return standard.officialUrls[0];
}

function accessCredentials(standard, route) {
  const lower = route.toLowerCase();
  if (lower.includes("authenticated")) {
    return "Authorized source account; registration and credentials required";
  }
  if (lower.includes("operator") || lower.includes("analyst export")) {
    return "Operator interaction; account requirement depends on the source UI";
  }
  if (lower.includes("api") && standard.id === "STD-PVWATTS-V8") {
    return "Free API key; registration required for a non-demo ingestion key";
  }
  if (lower.includes("api") && standard.id === "STD-INTERVAL-TARIFF") {
    return "Free API key; registration required";
  }
  return "No authentication, registration, or API key observed for this route";
}

function accessLimits(standard, route) {
  const lower = route.toLowerCase();
  if (lower.includes("api") && standard.id === "STD-INTERVAL-TARIFF") {
    return "500 records per page; paginate with API parameters";
  }
  if (lower.includes("socrata")) {
    return "SODA limit and offset pagination; service throttling was not measured";
  }
  if (lower.includes("api") && standard.id === "STD-PVWATTS-V8") {
    return "Hosted-service limits apply; one ingestion probe was tested";
  }
  if (lower.includes("api") || lower.includes("web service")) {
    return "No route-specific limit was established; do not use at estimate time";
  }
  return "Not applicable to a static artifact, repository, local package, or manual export";
}

function artifactLayout(standard, route, tested) {
  const lower = route.toLowerCase();
  const layout = lower.includes("parquet")
    ? "Partitioned Parquet"
    : lower.includes("gzip") || lower.includes(".gz")
      ? "Gzip-compressed"
      : lower.includes("zip")
        ? "ZIP-compressed"
        : lower.includes("xlsx")
          ? "XLSX ZIP container"
          : lower.includes("git") || lower.includes("repository")
            ? "Git tree"
            : lower.includes("pdf")
              ? "PDF"
              : "Route-specific source structure";
  if (tested && standard.observedSizeBytes !== null) {
    return `${standard.observedSizeBytes} bytes observed; ${standard.observedFormat}; ${layout}`;
  }
  return `Not separately sized; ${layout}`;
}

function accessHistoryAndStability(standard, route) {
  const lower = route.toLowerCase();
  const stability =
    lower.includes("git") || lower.includes("repository")
      ? "Commit pins are stable"
      : lower.includes("operator") || lower.includes("interactive") || lower.includes("web application")
        ? "UI route is change-prone"
        : "Monitor URL and checksum drift";
  return `${standard.version}; ${standard.updateCadence}; ${stability}`;
}

function accessAutomation(route) {
  const lower = route.toLowerCase();
  if (
    lower.includes("operator") ||
    lower.includes("manual") ||
    lower.includes("analyst export") ||
    lower.includes("interactive") ||
    lower.includes("web application") ||
    lower.includes("web calculator") ||
    lower.includes("desktop")
  ) {
    return "Human-mediated acquisition only; automate validation and import after export";
  }
  if (lower.includes("authenticated")) {
    return "Do not automate without source authorization and approved credential handling";
  }
  if (lower.includes("api") || lower.includes("web service")) {
    return "Permitted only for scheduled ingestion under published terms and limits";
  }
  return "Public acquisition appears automatable, subject to artifact-specific license review";
}

function accessRouteRows(standard) {
  const testedIndexes = TESTED_ACCESS_ROUTES.get(standard.id) || new Set();
  return standard.accessRoutes.map((route, index) => {
    const tested = testedIndexes.has(index);
    return [
      route,
      accessEndpoint(standard, route),
      accessCredentials(standard, route),
      accessLimits(standard, route),
      artifactLayout(standard, route, tested),
      accessHistoryAndStability(standard, route),
      accessAutomation(route),
      tested ? standard.testedAccess : "Not separately probed; retained as a documented alternative"
    ];
  });
}

function nativeFieldShape(field) {
  const lower = field.toLowerCase();
  if (
    lower.includes("structure") ||
    lower.includes("schedule") ||
    lower.includes("profile") ||
    lower.includes("series") ||
    lower.includes("interval") ||
    lower.includes("records") ||
    lower.includes("inputs")
  ) {
    return "Structured record or array";
  }
  if (lower.includes("warning")) return "Array of strings";
  if (lower === "approved" || lower.includes("active")) return "Boolean or source enum";
  if (
    lower.includes("date") ||
    lower === "year" ||
    lower.includes("modified") ||
    lower.includes("startdate") ||
    lower.includes("enddate")
  ) {
    return "Date, timestamp, or source date string";
  }
  if (
    lower.includes("energy") ||
    lower.includes("annual resource") ||
    lower.includes("power") ||
    lower.includes("efficiency") ||
    lower.includes("efficacy") ||
    lower.includes("flow") ||
    lower.includes("fuel") ||
    lower.includes("output") ||
    lower.includes("capacity") ||
    lower.includes("loss") ||
    lower.includes("area") ||
    lower.includes("weight") ||
    lower.includes("volume") ||
    lower.includes("gallon") ||
    lower.includes("watt") ||
    lower.includes("lumen") ||
    lower.includes("temperature") ||
    lower.includes("specific heat") ||
    lower.includes("density") ||
    lower.includes("coefficient") ||
    lower.includes("allowance") ||
    lower.includes("ratio") ||
    lower.includes("sample count") ||
    lower.includes("typical value") ||
    lower.includes("rainfall") ||
    lower.includes("evapotranspiration") ||
    lower.includes("comb08") ||
    lower.includes("combe") ||
    lower.includes("hours")
  ) {
    return "Numeric scalar or numeric series";
  }
  return "String, identifier, or source enumeration";
}

function nativeFieldUnit(field) {
  const lower = field.toLowerCase();
  if (lower.includes("kwh_rack") || lower.includes("kwh per rack")) return "kWh/rack";
  if (lower.includes("kwh/100") || lower.includes("combe")) return "kWh/100 miles";
  if (lower.includes("_kw") || lower.includes("power")) return "Source-declared power unit";
  if (lower.includes("gallons_per_rack") || lower.includes("gallons per rack")) {
    return "gallons/rack";
  }
  if (lower.includes("gallons per") || lower.includes("gpf")) return "Source-declared gallons per event";
  if (lower.includes("energy") || lower.includes("kwh")) return "Source-declared energy unit";
  if (lower.includes("watt")) return "Watts or source-declared power unit";
  if (lower.includes("efficiency") || lower.includes("loss") || lower.includes("plant factor")) {
    return "Fraction, ratio, or source-declared efficiency unit";
  }
  if (lower.includes("flow")) return "Source-declared volume/time";
  if (lower.includes("area")) return "Source-declared area";
  if (lower.includes("weight")) return "Source-declared statistical weight";
  if (lower.includes("hours") || lower.includes("operating time")) return "Hours or source-declared time";
  if (lower.includes("rainfall") || lower.includes("evapotranspiration")) return "Inches";
  if (lower.includes("comb08")) return "Miles/gallon";
  if (lower.includes("fuel") || lower.includes("thermal")) return "Source-declared fuel or thermal unit";
  return "Not unit-bearing or unit is source-specific";
}

function nativeFieldKeyRole(field) {
  const lower = field.toLowerCase();
  if (
    /(^|[._ ])id($|[._ ])/.test(lower) ||
    lower.includes("model number") ||
    lower.includes("model_number") ||
    lower === "label" ||
    lower === "name"
  ) {
    return "Natural-key candidate or key component";
  }
  if (
    lower.includes("date") ||
    lower.includes("status") ||
    lower.includes("type") ||
    lower.includes("class") ||
    lower.includes("sector") ||
    lower.includes("procedure") ||
    lower.includes("zone")
  ) {
    return "Mandatory filter or version dimension";
  }
  return "Payload, calculation input, or output";
}

function nativeFieldEnumeration(field) {
  const lower = field.toLowerCase();
  return lower.includes("type") ||
    lower.includes("status") ||
    lower.includes("class") ||
    lower.includes("sector") ||
    lower.includes("method") ||
    lower.includes("procedure") ||
    lower.includes("zone") ||
    lower.includes("application") ||
    lower.includes("drive")
    ? "Preserve and pin native enumeration values per release"
    : "Not treated as an enumeration unless the source schema declares one";
}

function nativeSchemaRows(standard) {
  return standard.nativeFields.map((field) => [
    field,
    nativeFieldShape(field),
    nativeFieldUnit(field),
    nativeFieldKeyRole(field),
    "Preserve source nulls; reject null only when the process requires the field",
    nativeFieldEnumeration(field)
  ]);
}

function inputClassification(sourceLabel) {
  switch (sourceLabel) {
    case "Profile":
    case "User":
      return "REQUIRES_PROFILE";
    case "Bill":
      return "REQUIRES_BILL";
    case "Linked Opportunity":
      return "REQUIRES_LINKED_OPPORTUNITY";
    case "Project Document":
      return "REQUIRES_PROJECT_DOCUMENT";
    case "Standard Output":
      return "DERIVABLE_FROM_SOURCE";
    default:
      return "NOT_AVAILABLE";
  }
}

function outputClassification(standardId, process, output) {
  const productStandards = new Set([
    "STD-DOE-CCMS-RATINGS",
    "STD-ENERGY-STAR-PRODUCT-DATA",
    "STD-WATERSENSE-FIXTURES"
  ]);
  if (productStandards.has(standardId) && /existing/i.test(`${process.key} ${output.outputName}`)) {
    return "SOURCE_INCOMPATIBLE";
  }
  if (productStandards.has(standardId)) return "DIRECTLY_AVAILABLE";
  if (standardId === "STD-CONTEXT-BENCHMARKS") return "DIRECTLY_AVAILABLE";
  return "DERIVABLE_FROM_SOURCE";
}

function buildStandardInstances(review) {
  const instances = new Map(review.standards.map((standard) => [standard.id, []]));
  for (const category of review.categoryReviews) {
    for (const process of category.informationCard.processes) {
      for (const standardId of process.canonicalStandardIds) {
        instances.get(standardId)?.push({ category, process });
      }
    }
  }
  return instances;
}

function buildFieldRows(standard, instances) {
  const inputRows = new Map();
  const outputRows = new Map();
  for (const { category, process } of instances) {
    for (const binding of process.inputBindings) {
      const key = `${binding.lookupInput}\u0000${binding.sourceLabel}`;
      const current = inputRows.get(key) || {
        field: binding.lookupInput,
        categories: new Set(),
        processes: new Set(),
        sourceArtifact: binding.sourceLabel,
        sourceNative: binding.treePath,
        transformation: "Normalize the owned value to the process input contract without substituting another tree path.",
        target: "Process-native input unit",
        classification: inputClassification(binding.sourceLabel),
        limitation: "The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User."
      };
      current.categories.add(category.id);
      current.processes.add(process.key);
      inputRows.set(key, current);
    }
    for (const output of process.outputBindings) {
      const key = `${output.outputName}\u0000${output.formulaTerm}`;
      const current = outputRows.get(key) || {
        field: output.outputName,
        categories: new Set(),
        processes: new Set(),
        sourceArtifact: standard.observedArtifact,
        sourceNative: standard.nativeFields.join("; "),
        transformation: standard.derivation,
        target: output.outputUnit,
        classification: outputClassification(standard.id, process, output),
        limitation: standard.unsupportedBoundary
      };
      current.categories.add(category.id);
      current.processes.add(process.key);
      outputRows.set(key, current);
    }
  }
  return [...inputRows.values(), ...outputRows.values()].map((row) => ({
    ...row,
    categories: [...row.categories].sort(),
    processes: [...row.processes].sort()
  }));
}

function renderStandardReport(standard, canonical, instances, evidenceRecords, prototypeResult) {
  const categories = unique(instances.map(({ category }) => category.id)).sort();
  const processes = unique(instances.map(({ process }) => process.key)).sort();
  const formulaTerms = unique(
    instances.flatMap(({ process }) => process.outputBindings.map((binding) => binding.formulaTerm))
  ).sort();
  const outputs = unique(
    instances.flatMap(({ process }) => process.outputBindings.map((binding) => binding.outputName))
  );
  const fieldRows = buildFieldRows(standard, instances);
  const cost = standard.cost;
  const artifactDetails = standard.observedSha256
    ? `${standard.observedArtifact}, ${standard.observedFormat}, ${standard.observedSizeBytes} bytes, sha256:${standard.observedSha256}`
    : `${standard.observedArtifact}, ${standard.observedFormat}; source repository content is pinned by commit where applicable`;
  const sourceEvidenceTable = table(
    ["Evidence ID", "Source title", "Version", "Status", "Exact artifact"],
    evidenceRecords.map((record) => [
      record.evidence_id,
      record.source_title,
      record.source_version,
      record.evidence_status,
      record.exact_artifact
    ])
  );
  const fieldTable = table(
    [
      "Required RetroFi field",
      "Process and category",
      "Source artifact or owner",
      "Source-native field",
      "Transformation",
      "Target unit",
      "Support classification",
      "Limitation"
    ],
    fieldRows.map((row) => [
      row.field,
      `${row.processes.join(", ")}; ${row.categories.join(", ")}`,
      row.sourceArtifact,
      row.sourceNative,
      row.transformation,
      row.target,
      row.classification,
      row.limitation
    ])
  );
  const ddlName = standard.slug.replaceAll("-", "_");
  return `# ${standard.id} - ${canonical.title}

## 1. RetroFi role

This Standard is used by ${countLabel(categories.length, "category", "categories")} and ${countLabel(instances.length, "category-local process instance")}.
The categories are ${categories.join(", ")}.
The process keys are ${processes.join(", ")}.
The formula terms supplied are ${formulaTerms.join(", ") || "none"}.
The current claimed output set contains ${countLabel(outputs.length, "distinct output description")}.
The present automation limitation is: ${standard.unsupportedBoundary}.

${sourceEvidenceTable}

## 2. Official source inventory

The primary organization is ${standard.organization}.
The selected official source is ${standard.officialSource}.
The pinned version is ${standard.version}.
The release date or release state is ${standard.releaseDate}.
The expected update cadence is ${standard.updateCadence}.
The license finding is ${standard.license}.
The legal-review requirement is ${standard.legalReview}.

${standard.officialUrls.map((url) => `- ${url}`).join("\n")}

## 3. What can actually be acquired

${standard.accessRoutes.map((route) => `- ${route}`).join("\n")}

${table(
  [
    "Route",
    "Exact endpoint or source",
    "Authentication, registration, and key",
    "Rate limit and pagination",
    "Observed size, format, compression, and partition",
    "History and URL stability",
    "Automation assessment",
    "Research result"
  ],
  accessRouteRows(standard)
)}

The tested access result is: ${standard.testedAccess}.
The retained inspected artifact is ${artifactDetails}.
The access-cost classification is ${standard.accessClass}.

## 4. Real source structure

The observed source-native fields or model inputs are:

${standard.nativeFields.map((field) => `- \`${field}\``).join("\n")}

${table(
  [
    "Field or structure",
    "Shape to validate and pin",
    "Native unit",
    "Key or filter role",
    "Null handling",
    "Enumeration handling"
  ],
  nativeSchemaRows(standard)
)}

Product and record sources must preserve a natural source identifier plus a release identifier as the composite natural key.
Model sources must preserve the complete input schema, package version, configuration, warnings, and output schema.
Dates remain source-native timestamps in raw snapshots and normalize to UTC timestamps or date-only effective intervals in query tables.
Enumerations remain source-native in raw storage and map through versioned crosswalk rows.
Null means unknown or not reported and must never be converted to zero.
Withdrawn, expired, superseded, and inactive records remain historically retained but are excluded from current resolution by default.
Duplicate manufacturer and model strings are normalized for search only, while the original source text remains immutable.

## 5. RetroFi field coverage

${fieldTable}

For every \`DERIVABLE_FROM_SOURCE\` row, the governing derivation is: ${standard.derivation}.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

\`\`\`text
${standard.officialSource}
-> ${standard.accessRoutes[0]}
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> ${standard.internalTargets.join(" + ")}
-> deterministic ${standard.slug} adapter
-> typed formula input
-> calculation result with provenance
\`\`\`

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: ${standard.internalTargets.join(", ")}.

\`\`\`sql
CREATE TABLE os_${ddlName}_records (
  source_release_id uuid NOT NULL REFERENCES source_releases(id),
  source_record_key text NOT NULL,
  effective_from date,
  effective_to date,
  active boolean NOT NULL,
  native_payload jsonb NOT NULL,
  normalized_payload jsonb NOT NULL,
  unit_registry_version text NOT NULL,
  source_artifact_id uuid NOT NULL REFERENCES source_artifacts(id),
  created_at timestamptz NOT NULL,
  PRIMARY KEY (source_release_id, source_record_key)
);
CREATE INDEX os_${ddlName}_active_exact_idx
  ON os_${ddlName}_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_${ddlName}_requirements_idx
  ON os_${ddlName}_records USING gin (normalized_payload jsonb_path_ops)
  WHERE active;
\`\`\`

Source-native payloads remain queryable for audits, while formula adapters consume only validated normalized columns or pinned local-model results.

## 8. Exact resolution

Identifiers are Unicode-normalized, trimmed, case-folded for search, and compared with punctuation-insensitive aliases only after exact original matching fails.
Manufacturer aliases and model aliases are versioned rows, never destructive edits.
Equipment class, capacity, geography, effective date, active status, source version, and test procedure are mandatory filters whenever the source exposes them.
An exact path must return one compatible active record.
Zero records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
The original identifier, matched alias, filters, and rejected candidates remain in provenance.

## 9. Requirements-based resolution

Mandatory filters are the category's explicit equipment class, performance requirement, capacity boundary, geography, date, active status, test-procedure version, and source release.
The eligible population contains only records satisfying every mandatory filter.
Inactive, withdrawn, superseded, incompatible-unit, missing-required-field, and cross-test-procedure records are excluded.
The source release is never mixed with another release inside one population.
A single eligible record may be selected directly.
Multiple eligible records use an official recommended value only when the source defines one, then a weighted median only when a defensible source weight exists, then an ordinary median only for a true scalar benchmark population.
Structured records and model result sets are never median-selected.

## 10. Benchmark resolution

The benchmark population must be authoritative, category-specific, unit-compatible, and filtered to the same context dimensions used by the formula.
The minimum sample size is five unless an official source explicitly publishes one typical value or a category-specific report approves a different threshold.
The weighting field must come from the source and is never inferred from record order.
The weighted median is the first value whose cumulative positive weight reaches at least half of total eligible weight after sorting by value.
The ordinary median is permitted only when no defensible weight exists and the population is an exchangeable scalar population.
The selected value retains filters, population size, sample size, method, fallback level, and uncertainty.
The unsupported boundary is ${standard.unsupportedBoundary}.

## 11. Calculation or local-model execution

The exact output contract contains: ${outputs.join("; ")}.
The governing source equation or transformation is ${standard.derivation}.
The local execution mode is ${standard.runtimeDesign}.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows ${standard.updateCadence}.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is ${standard.runtimeDesign}.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is ${cost.engineeringHours} hours.
Estimated raw storage is ${cost.rawStorageGb} GB.
Estimated published storage is ${cost.publishedStorageGb} GB.
Refresh effort is ${cost.refreshHours}.
Maintenance burden is ${cost.maintenance}.
External source cost is ${formatMoney(cost.externalMonthlyUsd)} per month.
Estimated internal storage and compute cost is ${formatMoney(cost.monthly100Usd)} at 100 calculations per month, ${formatMoney(cost.monthly1000Usd)} at 1,000, and ${formatMoney(cost.monthly10000Usd)} at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

\`\`\`bash
node scripts/research/operational-savings/run-prototypes.mjs --json
\`\`\`

The acquired or inspected source evidence is ${standard.prototype.sourceEvidence}.
The retained compact sample is \`docs/operational-savings-automation-research/samples/${standard.slug}.sample.json\`.
The source or model interface inspected is ${standard.observedArtifact}.
The local output kind is \`${prototypeResult.kind}\`, the selection rule is \`${prototypeResult.selectionRule}\`, and the output unit is \`${prototypeResult.unit}\`.
The prototype runs without network access after acquisition.
${prototypeResult.warnings.length ? asSentence(`The prototype warning is ${prototypeResult.warnings.join("; ")}`) : "The prototype completed without warnings."}
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**${standard.feasibility}**

The supported boundary is ${standard.supportedBoundary}.
The unsupported boundary is ${standard.unsupportedBoundary}.

## 17. Final recommended strategy

${standard.recommendedStrategy}
This is the single recommended production path for this Standard.
The rejected alternative is: ${standard.rejectedAlternative}

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
`;
}

function renderCategoryReport(category, standardCatalog) {
  const processes = category.informationCard.processes;
  const rows = processes.map((process) => {
    const standards = process.canonicalStandardIds.map((id) => standardCatalog.get(id));
    return [
      process.key,
      process.name,
      process.canonicalStandardIds.join(", "),
      process.lookupInputs.join("; "),
      process.valueNeeded.join("; "),
      process.outputBindings.map((binding) => binding.formulaTerm).join("; "),
      standards.map((standard) => standard?.feasibility || "MISSING").join(", "),
      "0",
      process.validation
    ];
  });
  const feasibility = unique(
    processes.flatMap((process) =>
      process.canonicalStandardIds.map((id) => standardCatalog.get(id)?.feasibility)
    )
  );
  return `# ${category.id} - ${category.title}

This report evaluates automation coverage without changing the approved Information Card.
The category contains ${countLabel(processes.length, "category-local process instance")} and references ${countLabel(category.standardIds.length, "canonical Standard")}.
Its current formula, tree, bindings, ownership decisions, and status remain unchanged.

## Process coverage

${table(
  [
    "Process key",
    "Process name",
    "Canonical Standard",
    "Required inputs",
    "Exact outputs",
    "Formula terms",
    "Source feasibility",
    "Runtime external calls",
    "Current blocker"
  ],
  rows
)}

## End-to-end graph

${processes
  .map((process) => {
    const inputs = process.inputBindings
      .map((binding) => `${binding.lookupInput} [${binding.sourceLabel}]`)
      .join(" + ");
    const outputs = process.outputBindings
      .map((binding) => `${binding.outputName} -> ${binding.formulaTerm} (${binding.outputUnit})`)
      .join(" + ");
    const targets = unique(
      process.canonicalStandardIds.flatMap((id) => standardCatalog.get(id)?.internalTargets || [])
    ).join(" + ");
    return `- \`${process.key}\`: ${inputs} -> ${process.canonicalStandardIds.join(" + ")} -> ${targets} -> ${outputs}`;
  })
  .join("\n")}

## Feasibility

The category depends on these source-level verdicts: ${feasibility.join(", ") || "no external Standard"}.
An exact path is feasible only when every bound Profile, Bill, Linked Opportunity, Project Document, and User input is present and every Standard adapter returns an unambiguous compatible result.
A benchmark path is feasible only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Recommended next action

Implement and accept the shared source-family adapters before connecting this category to any calculation runtime.
Add one category golden fixture for each supported exact or benchmark path.
Keep unsupported paths explicit rather than filling them with generic defaults.
`;
}

function processCoverageRows(review, catalogById) {
  return review.categoryReviews.flatMap((category) =>
    category.informationCard.processes.map((process) => {
      const standards = process.canonicalStandardIds.map((id) => catalogById.get(id)).filter(Boolean);
      const exactFeasible = standards.every((standard) =>
        [
          "FEASIBLE_NOW",
          "FEASIBLE_AFTER_MANUAL_SEED",
          "FEASIBLE_AFTER_ADAPTER_WORK"
        ].includes(standard.feasibility)
      );
      const exactFeasibility = exactFeasible
        ? "FEASIBLE_AFTER_SOURCE_PREREQUISITES"
        : standards.some((standard) => standard.feasibility === "PARTIALLY_FEASIBLE")
          ? "CONDITIONAL_WITHIN_SUPPORTED_BOUNDARY"
          : "NOT_FEASIBLE";
      const benchmarkFeasible =
        process.selectionPolicy.outputCardinality === "ONE_SELECTED_SCALAR" &&
        !standards.some((standard) => standard.feasibility === "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES");
      return {
        categoryId: category.id,
        processKey: process.key,
        processName: process.name,
        standardIds: process.canonicalStandardIds,
        requiredInputs: process.lookupInputs,
        acquisitionSources: standards.map((standard) => standard.officialSource),
        sourceNativeFields: unique(standards.flatMap((standard) => standard.nativeFields)),
        internalTargets: unique(standards.flatMap((standard) => standard.internalTargets)),
        outputFields: process.valueNeeded,
        formulaTerms: process.outputBindings.map((binding) => binding.formulaTerm),
        exactFeasibility,
        benchmarkFeasibility: benchmarkFeasible ? "SOURCE_SPECIFIC_REVIEW_REQUIRED" : "NOT_APPLICABLE_OR_UNSUPPORTED",
        runtimeNetworkDependency: 0,
        externalCost: standards.every((standard) => standard.cost.externalMonthlyUsd === 0)
          ? "$0"
          : "See Standard reports",
        engineeringEffort: standards.map((standard) => standard.cost.engineeringHours).join(" + "),
        blocker: process.validation,
        verdict: aggregateFeasibility(standards),
        nextAction: standards.map((standard) => standard.recommendedStrategy).join(" ")
      };
    })
  );
}

function renderCoverage(rows) {
  return `# Category-process automation coverage

This inventory is generated from the current Information Card projections and contains exactly one row for every category-local process.
It does not alter the cards or their process bindings.

${table(
  [
    "Category",
    "Process key",
    "Process name",
    "Canonical Standard",
    "Required inputs",
    "Acquisition source",
    "Source-native fields",
    "Internal table or local model",
    "Exact output fields",
    "Formula terms",
    "Exact path",
    "Benchmark path",
    "Runtime network",
    "External cost",
    "Engineering effort",
    "Blocker",
    "Verdict",
    "Recommended next action"
  ],
  rows.map((row) => [
    row.categoryId,
    row.processKey,
    row.processName,
    row.standardIds.join(", "),
    row.requiredInputs.join("; "),
    row.acquisitionSources.join("; "),
    row.sourceNativeFields.join("; "),
    row.internalTargets.join("; "),
    row.outputFields.join("; "),
    row.formulaTerms.join("; "),
    row.exactFeasibility,
    row.benchmarkFeasibility,
    row.runtimeNetworkDependency,
    row.externalCost,
    row.engineeringEffort,
    row.blocker,
    row.verdict,
    row.nextAction
  ])
)}
`;
}

function renderSourceAccessMatrix(catalog) {
  return `# Source access matrix

Every route below is for scheduled ingestion, release refresh, or operator import.
No route is used during a customer estimate.

${table(
  [
    "Standard",
    "Official source",
    "Version",
    "Best route",
    "Authentication",
    "Observed artifact",
    "Access result",
    "License",
    "Cost class",
    "Runtime calls",
    "Verdict"
  ],
  catalog.standards.map((standard) => [
    standard.id,
    standard.officialSource,
    standard.version,
    standard.accessRoutes[0],
    standard.accessClass === "free with account or API key"
      ? "Free key for hosted ingestion route"
      : standard.accessClass === "free with manual export"
        ? "Operator access"
        : "None for selected route",
    standard.observedArtifact,
    standard.testedAccess,
    standard.license,
    standard.accessClass,
    0,
    standard.feasibility
  ])
)}

## Tested discrepancies

- OpenEI documentation requires an API key and the live keyless request returned HTTP 403, while the approved-rates bulk gzip downloaded without authentication.
- The legacy PVWatts hostname did not resolve, while the current \`developer.nlr.gov\` endpoint returned a valid V8 response.
- DOE CCMS returned HTTP 403 for direct unauthenticated acquisition, so the selected path is an official operator export.
- The WaterSense Product Search offers a full-list download through the application, but no stable unauthenticated file URL was established.
- The 10 MB WaterSense climate workbook exhausted the general workbook inspection process, so its production extractor must be streaming and column-bounded.
`;
}

function renderInternalDatabaseDesign() {
  const tables = [
    ["source_registry", "One row per official source and license boundary", "id", "organization, name, primary_url, license, attribution, legal_review_status"],
    ["source_releases", "Immutable discovered source releases", "id", "source_id, version, published_at, discovered_at, status, schema_version_id"],
    ["source_artifacts", "Acquired files or repository trees", "id", "release_id, url, media_type, byte_size, sha256, storage_uri"],
    ["source_checksums", "Independent checksum observations", "id", "artifact_id, algorithm, digest, observed_at"],
    ["ingestion_runs", "Acquisition and normalization audit", "id", "source_id, release_id, started_at, finished_at, status, logs_uri"],
    ["schema_versions", "Pinned source and normalized schema fingerprints", "id", "source_id, fingerprint, schema_json, accepted_at"],
    ["equipment_products", "Normalized product identity", "id", "source_release_id, native_id, manufacturer, brand, model, normalized_model"],
    ["equipment_certifications", "Certification and status history", "id", "product_id, specification, test_procedure, effective_from, effective_to, active"],
    ["equipment_performance_fields", "Typed source-native product metrics", "id", "certification_id, field_key, numeric_value, text_value, unit_id"],
    ["installed_baseline_benchmarks", "Approved installed-equipment populations", "id", "population_id, equipment_class, context_json"],
    ["building_upgrade_measures", "ComStock and Scout measure definitions", "id", "release_id, native_measure_id, name, method"],
    ["building_archetype_benchmarks", "Precomputed building resource deltas", "id", "measure_id, geography_id, archetype, resource, value, unit_id"],
    ["geographic_crosswalks", "ZIP, county, state, climate, and utility mappings", "id", "release_id, source_geography, target_geography, confidence"],
    ["climate_crosswalks", "Weather and climate artifact selection", "id", "geography_id, model_version_id, resource_artifact_id"],
    ["utility_providers", "Canonical utility identity", "id", "eia_id, name, state_code"],
    ["utility_tariffs", "Approved effective tariff versions", "id", "provider_id, native_label, schedule_name, sector, effective_from, effective_to, approved"],
    ["tariff_periods", "Calendar period definitions", "id", "tariff_id, charge_type, period_index, weekday_schedule, weekend_schedule"],
    ["tariff_energy_charges", "Energy tiers and rates", "id", "period_id, tier_index, minimum_kwh, maximum_kwh, rate_usd_per_kwh"],
    ["tariff_demand_charges", "Demand tiers, ratchets, and lookbacks", "id", "period_id, tier_index, rate_usd_per_kw, ratchet_json"],
    ["tariff_export_rules", "Export and non-bypassable treatment", "id", "tariff_id, rule_type, rate, unit_id, conditions_json"],
    ["product_taxonomy_crosswalks", "RetroFi to source product classes", "id", "source_release_id, retrofit_id, source_class, approval_status"],
    ["retrofit_measure_crosswalks", "RetroFi to building measure IDs", "id", "source_release_id, retrofit_id, measure_id, approval_status"],
    ["benchmark_populations", "Immutable eligible population definitions", "id", "source_release_id, population_key, filters_json, minimum_sample_size"],
    ["benchmark_values", "Selected official, weighted-median, or median values", "id", "population_id, field_key, value, unit_id, sample_size, selection_rule"],
    ["model_versions", "Pinned executable models", "id", "name, version, commit_sha, package_sha256, license"],
    ["model_input_schemas", "Model input contracts", "id", "model_version_id, schema_json, fingerprint"],
    ["calculation_assumptions", "Versioned RetroFi-owned assumptions", "id", "assumption_key, value_json, unit_id, effective_from, approved_by"],
    ["selected_values", "One selected value or structure per resolver", "id", "calculation_run_id, process_key, result_kind, value_json, unit_id"],
    ["selected_value_provenance", "Complete selected-value trace", "id", "selected_value_id, release_id, artifact_id, filters_json, population_id, fallback_level"],
    ["calculation_runs", "Reproducible local executions", "id", "adapter_version, input_hash, model_version_id, started_at, result_hash, status"],
    ["calculation_warnings", "Typed warnings and review gates", "id", "calculation_run_id, code, severity, message"]
  ];
  return `# Internal operational-savings database design

## Storage tiers

Immutable raw snapshots belong in content-addressed object storage outside the relational query path.
Large analytical source releases such as ComStock belong in Parquet and should be filtered and aggregated with DuckDB during ingestion.
Normalized product, certification, tariff, crosswalk, selected-value, and provenance records belong in PostgreSQL-compatible tables.
Small reviewed tables such as FEMP exterior-lighting requirements may publish as checksummed JSON artifacts loaded locally.
Pinned models belong in reproducible packages with checksums, while their inputs, outputs, and warnings belong in the calculation tables.

## Proposed logical tables

${table(["Table", "Purpose", "Primary key", "Important columns"], tables)}

## Core PostgreSQL-compatible schema

\`\`\`sql
CREATE TABLE source_registry (
  id uuid PRIMARY KEY,
  source_key text UNIQUE NOT NULL,
  organization text NOT NULL,
  official_name text NOT NULL,
  primary_url text NOT NULL,
  license_expression text,
  attribution text,
  legal_review_status text NOT NULL,
  created_at timestamptz NOT NULL
);

CREATE TABLE source_releases (
  id uuid PRIMARY KEY,
  source_id uuid NOT NULL REFERENCES source_registry(id),
  source_version text NOT NULL,
  published_at timestamptz,
  discovered_at timestamptz NOT NULL,
  schema_fingerprint text NOT NULL,
  publication_status text NOT NULL,
  UNIQUE (source_id, source_version, schema_fingerprint)
);

CREATE TABLE source_artifacts (
  id uuid PRIMARY KEY,
  source_release_id uuid NOT NULL REFERENCES source_releases(id),
  source_url text NOT NULL,
  media_type text NOT NULL,
  byte_size bigint NOT NULL CHECK (byte_size >= 0),
  sha256 char(64) NOT NULL,
  storage_uri text NOT NULL,
  acquired_at timestamptz NOT NULL,
  UNIQUE (source_release_id, sha256)
);

CREATE TABLE selected_values (
  id uuid PRIMARY KEY,
  calculation_run_id uuid NOT NULL REFERENCES calculation_runs(id),
  category_id text NOT NULL,
  process_key text NOT NULL,
  result_kind text NOT NULL,
  selected_value jsonb,
  unit_id text,
  scope text NOT NULL,
  uncertainty text NOT NULL
);

CREATE TABLE selected_value_provenance (
  id uuid PRIMARY KEY,
  selected_value_id uuid NOT NULL REFERENCES selected_values(id),
  source_release_id uuid REFERENCES source_releases(id),
  source_artifact_id uuid REFERENCES source_artifacts(id),
  filters jsonb NOT NULL,
  eligible_population jsonb,
  population_size integer,
  sample_size integer,
  selection_rule text NOT NULL,
  fallback_level text NOT NULL,
  warnings jsonb NOT NULL
);
\`\`\`

## Versioning and publication

Every raw artifact and normalized release is immutable.
A source release moves through discovered, acquired, validated, normalized, reviewed, published, deprecated, and rejected states.
Only a published release may be selected by an estimate.
Publication is an atomic source-specific pointer and rollback changes that pointer without deleting data.
Effective dates are separate from ingestion and publication dates.
Historical calculations pin their source-release IDs and remain reproducible after a newer release is published.

## Deduplication and matching

Native source identifiers remain the authoritative identity.
Search-normalized manufacturer and model strings are secondary indexes, not primary keys.
Alias rows include their origin, reviewer, effective interval, and reason.
Exact matching requires one compatible active record after product class, capacity, geography, date, and test-procedure filters.
Ambiguous matches fail closed.

## Index strategy

Use B-tree indexes for exact identifiers, effective intervals, source versions, utility EIA IDs, tariff labels, and active status.
Use GIN indexes for bounded source-specific requirements JSON only where stable normalized columns would create excessive sparsity.
Use BRIN indexes for very large time-ordered ingestion and calculation tables.
Partition interval and result-series tables by source release or calculation month only after measured volume justifies it.

## Attribution and licensing

License expression, attribution text, legal-review state, artifact URL, and original notice are retained at source and release level.
Adapters return source and source-version attribution with every selected value.
Publication is blocked when a license is missing or marked for legal review.
`;
}

function renderAdapterArchitecture() {
  return `# Shared deterministic adapter architecture

## Boundary

This research interface is not connected to the production calculation engine.
It defines a common contract for future source-family adapters.

\`\`\`ts
interface OperationalSavingsSourceAdapter<Raw, Normalized, Query, ModelInput> {
  discoverRelease(): Promise<DiscoveredRelease>;
  acquire(release: DiscoveredRelease): Promise<RawArtifact[]>;
  verifyChecksum(artifacts: RawArtifact[]): Promise<VerifiedArtifact[]>;
  inspectSchema(artifacts: VerifiedArtifact[]): Promise<SchemaFingerprint>;
  validateRaw(artifacts: VerifiedArtifact[]): Promise<ValidationReport>;
  normalize(artifacts: VerifiedArtifact[]): Promise<NormalizedSnapshot<Normalized>>;
  publishSnapshot(snapshot: NormalizedSnapshot<Normalized>): Promise<PublishedRelease>;
  resolveExact(query: Query, release: PublishedRelease): ResolutionResult;
  resolveRequirements(query: Query, release: PublishedRelease): ResolutionResult;
  resolveBenchmark(query: Query, release: PublishedRelease): ResolutionResult;
  executeModel(input: ModelInput, model: PublishedModel): ResolutionResult;
  mapToFormulaInputs(result: ResolutionResult): FormulaInputSet;
  returnProvenance(result: ResolutionResult): SelectedValueProvenance;
  detectSchemaDrift(previous: SchemaFingerprint, next: SchemaFingerprint): DriftReport;
  rollbackRelease(release: PublishedRelease, reason: string): Promise<void>;
}
\`\`\`

## Typed result contract

\`\`\`ts
type ResolutionResult =
  | ScalarResult
  | ProductRecordResult
  | ProfileResult
  | InputSetResult
  | ModelResultSet
  | UnavailableResult;

interface ResultEnvelope<T> {
  kind: "scalar" | "product_record" | "profile" | "input_set" | "model_result_set" | "unavailable";
  value: T | null;
  unit: string | null;
  scope: string;
  source: string;
  sourceVersion: string;
  sourceArtifact: string;
  filters: Record<string, unknown>;
  eligiblePopulation: unknown[];
  sampleSize: number;
  selectionRule: string;
  fallbackLevel: string;
  uncertainty: string;
  warnings: TypedWarning[];
  provenance: SelectedValueProvenance;
}
\`\`\`

Every result contains the selected value or structure, unit, scope, source, source version, source artifact, filters, eligible population, sample size, selection rule, fallback level, uncertainty, warnings, and provenance.
Unavailable is a successful typed result when the source cannot lawfully or technically supply a required value.

## Estimate-time flow

\`\`\`text
Normalized Profile
+ normalized Bills
+ selected Linked Opportunities
+ extracted Project Documents
-> determine required Standards and exact process bindings
-> load published internal source releases
-> resolve exact inputs
-> apply only implemented source-specific fallback levels
-> execute pinned local models
-> map typed outputs to approved formula terms
-> run the local category calculation
-> store one annual result, assumptions, warnings, and provenance
-> label screening or detailed
\`\`\`

Later exact inputs supersede benchmark selections by creating a new calculation run.
Historical runs remain immutable.
Category-overlap guards compare retrofit identity, physical resource boundary, time interval, and upstream savings component before summing results.

## Error policy

Checksum mismatch, schema drift, unit mismatch, ambiguity, inactive status, incompatible test procedure, impossible physical input, model nonconvergence, and missing required ownership inputs are typed errors.
Adapters never convert these conditions to zero.
A prior published release remains available when refresh fails.
Human review remains required for tariff eligibility, ambiguous product identities, project-document engineering interpretation, category overlap, source licensing, and any new benchmark population.
`;
}

function renderCostAndFeasibility(catalog) {
  const totals = catalog.standards.reduce(
    (sum, standard) => {
      const hours = parseHours(standard.cost.engineeringHours);
      sum.minimumHours += hours.minimum;
      sum.maximumHours += hours.maximum;
      sum.rawStorageGb += standard.cost.rawStorageGb;
      sum.publishedStorageGb += standard.cost.publishedStorageGb;
      sum.externalMonthlyUsd += standard.cost.externalMonthlyUsd;
      sum.monthly100Usd += standard.cost.monthly100Usd;
      sum.monthly1000Usd += standard.cost.monthly1000Usd;
      sum.monthly10000Usd += standard.cost.monthly10000Usd;
      return sum;
    },
    {
      minimumHours: 0,
      maximumHours: 0,
      rawStorageGb: 0,
      publishedStorageGb: 0,
      externalMonthlyUsd: 0,
      monthly100Usd: 0,
      monthly1000Usd: 0,
      monthly10000Usd: 0
    }
  );
  const counts = Object.fromEntries(
    catalog.feasibilityVerdicts.map((verdict) => [
      verdict,
      catalog.standards.filter((standard) => standard.feasibility === verdict).length
    ])
  );
  return `# Cost and feasibility

These are planning estimates for the complete source-family program.
They include source acquisition, normalization, adapters, tests, refresh controls, and provenance, but exclude the unchanged production calculation engine.

${table(
  [
    "Standard",
    "Verdict",
    "Engineering hours",
    "Raw GB",
    "Published GB",
    "External monthly",
    "100 calculations",
    "1,000 calculations",
    "10,000 calculations",
    "Refresh effort",
    "Maintenance"
  ],
  catalog.standards.map((standard) => [
    standard.id,
    standard.feasibility,
    standard.cost.engineeringHours,
    standard.cost.rawStorageGb,
    standard.cost.publishedStorageGb,
    formatMoney(standard.cost.externalMonthlyUsd),
    formatMoney(standard.cost.monthly100Usd),
    formatMoney(standard.cost.monthly1000Usd),
    formatMoney(standard.cost.monthly10000Usd),
    standard.cost.refreshHours,
    standard.cost.maintenance
  ])
)}

## Portfolio estimate

One-time engineering effort is approximately ${totals.minimumHours.toLocaleString()} to ${totals.maximumHours.toLocaleString()} hours.
Raw source storage is approximately ${totals.rawStorageGb.toFixed(1)} GB before retention multipliers.
Published query and model storage is approximately ${totals.publishedStorageGb.toFixed(1)} GB.
Direct external-source fees are estimated at ${formatMoney(totals.externalMonthlyUsd)} per month for the selected public routes.
Internal source-specific storage and compute are approximately ${formatMoney(totals.monthly100Usd)} at 100 calculations per month, ${formatMoney(totals.monthly1000Usd)} at 1,000, and ${formatMoney(totals.monthly10000Usd)} at 10,000.
Shared database, object storage, backups, observability, and staff review are additional.

## Verdict counts

${table(
  ["Verdict", "Count"],
  catalog.feasibilityVerdicts.map((verdict) => [verdict, counts[verdict]])
)}

The dominant cost is engineering and source maintenance, not usage-based external fees.
REopt optimization and large weather or building-stock snapshots are the main variable compute and storage components.
Manual seed does not mean paid source access, but it does create recurring operator cost.
`;
}

function renderRoadmap(catalog, instancesByStandard) {
  const batches = [
    {
      name: "1. Exact public product and tabular methods",
      ids: [
        "STD-ENERGY-STAR-PRODUCT-DATA",
        "STD-FUELECONOMY-VEHICLES",
        "STD-FEMP-EXTERIOR-LIGHTING",
        "STD-DISHWASHER-WATER-HEATING"
      ],
      effort: "190-330 hours",
      criteria: "All four scheduled ingestions or compact artifacts pass exact-record, unit, checksum, schema-drift, and offline golden tests."
    },
    {
      name: "2. Operator-seeded certifications and fixtures",
      ids: ["STD-DOE-CCMS-RATINGS", "STD-WATERSENSE-FIXTURES"],
      effort: "170-290 hours",
      criteria: "Two independent official exports import without manual data editing and reproduce exact active-product lookups."
    },
    {
      name: "3. California tariffs",
      ids: ["STD-INTERVAL-TARIFF"],
      effort: "280-460 hours",
      criteria: "At least one current SMB tariff for each launch utility reconciles to test bills and includes energy, demand, fixed, minimum, export, ratchet, and non-bypassable treatment."
    },
    {
      name: "4. Building stock and ECM screens",
      ids: ["STD-COMSTOCK-ANNUAL-DELTA", "STD-SCOUT-ECM-SCREEN"],
      effort: "180-290 hours",
      criteria: "Approved one-to-one crosswalks and retained eligible populations reproduce weighted results from pinned releases."
    },
    {
      name: "5. Local renewable models",
      ids: ["STD-SAM-SOLAR-THERMAL", "STD-PVWATTS-V8", "STD-WIND-SAM"],
      effort: "310-520 hours",
      criteria: "Pinned local model outputs match official or upstream regression oracles within approved tolerances with network disabled."
    },
    {
      name: "6. Industrial engineering models",
      ids: ["STD-DOE-MEASUR", "STD-EPA-CHP-PERFORMANCE"],
      effort: "310-510 hours",
      criteria: "Each category names one exact module or catalog class and passes both upstream and RetroFi category fixtures."
    },
    {
      name: "7. Dispatch optimization",
      ids: ["STD-REOPT-LOCAL-DISPATCH"],
      effort: "220-360 hours",
      criteria: "Local solver results are reproducible, tariff-complete, bounded in runtime, and accepted for every enabled dispatch category."
    },
    {
      name: "8. Water, schedules, and remaining context",
      ids: [
        "STD-WATERSENSE-LANDSCAPE",
        "STD-WATERSENSE-CI-OPERATIONS",
        "STD-OPERATING-SCHEDULE",
        "STD-CONTEXT-BENCHMARKS"
      ],
      effort: "490-820 hours",
      criteria: "Every enabled benchmark has a pinned population and every measured method rejects missing evidence."
    }
  ];
  return `# Implementation roadmap

Implementation is grouped by shared source family rather than Information Card number.
The sequence optimizes reusable ingestion, exact-value resolution, California launch value, and validation leverage.

${batches
  .map((batch) => {
    const categories = unique(
      batch.ids.flatMap((id) =>
        (instancesByStandard.get(id) || []).map(({ category }) => category.id)
      )
    ).sort();
    const risks = batch.ids
      .map((id) => catalog.standards.find((standard) => standard.id === id)?.unsupportedBoundary)
      .filter(Boolean)
      .join("; ");
    return `## ${batch.name}

Standards: ${batch.ids.join(", ")}.
Categories touched: ${categories.join(", ")}.
Estimated effort: ${batch.effort}.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: ${risks}.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: ${batch.criteria}
`;
  })
  .join("\n")}

## California SMB launch sequence

Start with exact ENERGY STAR products, FuelEconomy records, FEMP lighting tables, and the dishwasher water-heating method because their artifacts are small, official, and already inspectable.
Build the California tariff publication system next because PV, storage, charging, demand response, and dispatch categories cannot produce defensible bill value without it.
Add CCMS and WaterSense operator exports after the shared product schema exists.
Then add ComStock and Scout screening, followed by PVWatts and the other local models.
Defer broad context fallbacks until each category has a source-specific population and golden fixture.

No full category should be called production-ready merely because one of its Standard processes is easy.
The first customer-visible path should be an exact-input path with explicit schedule or activity, not a generic benchmark path.
`;
}

function renderDeploymentReadiness(catalog) {
  return `# Deployment readiness

No deployment is performed by this research branch.

## Per-Standard gate

Every Standard must satisfy all of the following before a production connection is proposed:

- The acquisition method works from a clean environment.
- The source and artifact license have completed review.
- The source schema and unit mapping are pinned.
- The raw artifact checksum and byte size are retained.
- The normalized internal schema is implemented and migrated through the normal review process.
- The adapter is implemented against the shared typed interface.
- The exact path is tested.
- The requirements and benchmark paths are tested when they are allowed.
- Unsupported fallback levels return typed unavailable results.
- Units and resource boundaries are validated.
- Complete selected-value provenance is stored.
- Refresh, schema-drift detection, quarantine, and rollback are implemented.
- The estimate succeeds with network access disabled.
- Every enabled category golden fixture passes.
- Monitoring, freshness thresholds, warning escalation, and operator ownership are defined.

## Current research readiness

${table(
  ["Standard", "Research verdict", "Production blocker"],
  catalog.standards.map((standard) => [
    standard.id,
    standard.feasibility,
    standard.unsupportedBoundary
  ])
)}

## Staging and rollout

Stage 1 imports one nonproduction source release and compares checksums, schemas, counts, enumerations, null rates, and duplicates.
Stage 2 runs adapters against retained source fixtures with network disabled.
Stage 3 runs category golden fixtures and bill or project-document reconciliation where applicable.
Stage 4 shadows calculations without showing results to customers and records latency, warnings, fallback levels, and overlap conflicts.
Stage 5 enables a narrow exact-input path for an internal cohort.
Stage 6 expands by source family only after freshness, rollback, and warning-service objectives are met.

Rollback selects the prior published source or adapter version and never mutates historical calculations.
`;
}

function renderUnresolvedDecisions() {
  return `# Unresolved product and founder decisions

The following decisions cannot be made safely by source research alone:

1. Which California utilities and SMB tariff schedules define the first launch scope?
2. Which legal reviewer approves the source-license and trademark inventory?
3. How much recurring operator time is acceptable for CCMS, WaterSense, and tariff publication?
4. Which exact product families should be implemented first within the shared product schema?
5. Which ComStock and Scout measures receive an approved one-to-one retrofit crosswalk?
6. Which screening uncertainty labels and fallback levels may be shown to customers?
7. What minimum sample size may differ from the default five-record benchmark rule, and who approves an exception?
8. Which project-document fields require a licensed engineer or specialist to review?
9. Which categories may expose a screening result before tariff-complete detailed savings exist?
10. What calculation-latency and cost budget should constrain REopt and other local-model execution?
11. What source-freshness threshold blocks new calculations versus merely adding a warning?
12. Who owns category-overlap and double-counting adjudication?

Until these decisions are recorded, the research architecture can be implemented and tested but not broadly enabled.
`;
}

function renderExecutiveSummary(catalog, review, rows) {
  const verdictCounts = Object.fromEntries(
    catalog.feasibilityVerdicts.map((verdict) => [
      verdict,
      catalog.standards.filter((standard) => standard.feasibility === verdict).length
    ])
  );
  const engineering = catalog.standards.reduce(
    (sum, standard) => {
      const hours = parseHours(standard.cost.engineeringHours);
      return {
        minimum: sum.minimum + hours.minimum,
        maximum: sum.maximum + hours.maximum
      };
    },
    { minimum: 0, maximum: 0 }
  );
  return `# Executive summary

The zero-runtime-network architecture is feasible for every currently useful path, but no source should be connected directly to a customer estimate.
The repository contains 19 canonical Standards, ${rows.length} category-local process instances, ${review.categoryReviews.length} categories, 632 explicit input bindings, 215 explicit output bindings, and 497 formula-term contracts.
All 19 Standards now have one decisive acquisition and runtime strategy, a compact sample, a deterministic offline prototype, a cost estimate, and a precise supported boundary.

The strongest immediate sources are the ENERGY STAR product datasets, FuelEconomy bulk vehicle data, FEMP lighting tables, and the ENERGY STAR dishwasher calculator.
DOE CCMS and WaterSense labeled-product data require operator-seeded exports.
ComStock, Scout, MEASUR, SAM, PVWatts, wind, and REopt are technically localizable but require production adapters and reproducible packaging.
WaterSense commercial operations and the shared context-benchmark Standard remain intentionally partial because checklists and mixed benchmark sources cannot supply missing project measurements.

The selected runtime architecture is:

\`\`\`text
official source
-> scheduled or operator acquisition
-> immutable checksummed raw snapshot
-> validated normalized internal release
-> deterministic local adapter or pinned model
-> approved formula input
-> one local annual result with provenance
\`\`\`

The runtime external-call count is zero.
Direct selected-source fees are estimated at $0 per month, while the major cost is approximately ${engineering.minimum.toLocaleString()} to ${engineering.maximum.toLocaleString()} engineering hours plus recurring source review.

${table(
  ["Feasibility verdict", "Standards"],
  catalog.feasibilityVerdicts.map((verdict) => [verdict, verdictCounts[verdict]])
)}

The recommended first implementation batch is exact public product and tabular methods, followed immediately by a California tariff publication foundation.
No deployment, AWS access, infrastructure change, workflow change, production-engine change, or Information Card change is part of this branch.
`;
}

function renderReadme(catalog, review, rows) {
  return `# Operational savings internal automation research

This package fully inventories the source and adapter work required to execute operational-savings estimates without runtime external calls.
It is based on source commit \`${catalog.sourceCommit}\`.
It covers ${catalog.standards.length} canonical Standards, ${rows.length} category-local processes, and ${review.categoryReviews.length} categories.

## Start here

- [Executive summary](executive-summary.md)
- [Source access matrix](source-access-matrix.md)
- [Internal database design](internal-database-design.md)
- [Shared adapter architecture](shared-adapter-architecture.md)
- [Category-process coverage](category-process-coverage.md)
- [Cost and feasibility](cost-and-feasibility.md)
- [Implementation roadmap](implementation-roadmap.md)
- [Deployment readiness](deployment-readiness.md)
- [Unresolved product decisions](unresolved-product-decisions.md)
- [Source download manifest](source-download-manifest.json)
- [Standard reports](standards/)
- [Category reports](categories/)
- [Retained compact samples](samples/)

## Reproduce

\`\`\`bash
node scripts/research/operational-savings/generate-research.mjs
node scripts/research/operational-savings/run-prototypes.mjs
npx vitest run scripts/research/operational-savings/tests
\`\`\`

The prototype runner performs no network access.
Large downloaded artifacts and cloned repositories remain under the ignored \`scripts/research/operational-savings/.cache/\` directory.
The generated reports do not change the approved formulas, trees, bindings, ownership decisions, statuses, or Information Cards.
`;
}

function buildManifest(catalog, sampleMetadata) {
  return {
    schemaVersion: "operational-savings/source-download-manifest-v1",
    generatedOn: "2026-07-23",
    sourceCommit: catalog.sourceCommit,
    runtimeExternalCalls: 0,
    artifactPolicy: {
      rawArtifactsCommitted: false,
      rawCachePath: "scripts/research/operational-savings/.cache/artifacts",
      repositoryCachePath: "scripts/research/operational-savings/.cache/repos",
      compactSamplesCommitted: true
    },
    standards: catalog.standards.map((standard) => ({
      standardId: standard.id,
      organization: standard.organization,
      officialSource: standard.officialSource,
      officialUrls: standard.officialUrls,
      sourceVersion: standard.version,
      releaseDate: standard.releaseDate,
      updateCadence: standard.updateCadence,
      license: standard.license,
      legalReview: standard.legalReview,
      accessClass: standard.accessClass,
      accessRoutes: standard.accessRoutes,
      testedAccess: standard.testedAccess,
      observedArtifact: {
        name: standard.observedArtifact,
        format: standard.observedFormat,
        sizeBytes: standard.observedSizeBytes,
        sha256: standard.observedSha256,
        committed: false
      },
      retainedSample: sampleMetadata.get(standard.id),
      runtimeDesign: standard.runtimeDesign,
      feasibility: standard.feasibility
    }))
  };
}

async function main() {
  const catalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));
  const sources = await loadOperationalSavingsSources(REPO_ROOT);
  const review = buildOperationalSavingsReview(sources);
  if (review.errors.length) {
    throw new Error(`Canonical operational-savings inventory is invalid:\n${review.errors.join("\n")}`);
  }
  const catalogById = new Map(catalog.standards.map((standard) => [standard.id, standard]));
  const canonicalIds = review.standards.map((standard) => standard.id).sort();
  const catalogIds = catalog.standards.map((standard) => standard.id).sort();
  if (JSON.stringify(canonicalIds) !== JSON.stringify(catalogIds)) {
    throw new Error("Research catalog Standard IDs do not match the canonical registry");
  }
  const canonicalById = new Map(review.standards.map((standard) => [standard.id, standard]));
  const instancesByStandard = buildStandardInstances(review);
  const evidenceByStandard = new Map(
    canonicalIds.map((id) => [
      id,
      sources.evidenceManifest.evidence_records.filter((record) => record.standard_id === id)
    ])
  );
  const processRows = processCoverageRows(review, catalogById);
  if (processRows.length !== 124) {
    throw new Error(`Expected 124 process rows, found ${processRows.length}`);
  }

  await Promise.all([
    mkdir(STANDARDS_ROOT, { recursive: true }),
    mkdir(CATEGORIES_ROOT, { recursive: true }),
    mkdir(SAMPLES_ROOT, { recursive: true })
  ]);

  const sampleMetadata = new Map();
  const prototypeResults = new Map();
  for (const standard of catalog.standards) {
    const result = runStandardPrototype(standard);
    prototypeResults.set(standard.id, result);
    const sample = {
      schemaVersion: "operational-savings/research-sample-v1",
      standardId: standard.id,
      source: standard.officialSource,
      sourceVersion: standard.version,
      observedArtifact: standard.observedArtifact,
      observedArtifactSha256: standard.observedSha256,
      evidenceBoundary: standard.prototype.sourceEvidence,
      sampleIsFullSourceArtifact: false,
      prototype: standard.prototype,
      offlineResult: result
    };
    const sampleContent = `${JSON.stringify(sample, null, 2)}\n`;
    const sampleFile = `${standard.slug}.sample.json`;
    await writeFile(join(SAMPLES_ROOT, sampleFile), sampleContent, "utf8");
    sampleMetadata.set(standard.id, {
      path: `docs/operational-savings-automation-research/samples/${sampleFile}`,
      sizeBytes: Buffer.byteLength(sampleContent),
      sha256: sha256(sampleContent)
    });
  }

  for (const standard of catalog.standards) {
    const content = renderStandardReport(
      standard,
      canonicalById.get(standard.id),
      instancesByStandard.get(standard.id) || [],
      evidenceByStandard.get(standard.id) || [],
      prototypeResults.get(standard.id)
    );
    await writeFile(join(STANDARDS_ROOT, `${standard.slug}.md`), content, "utf8");
  }

  for (const category of review.categoryReviews) {
    await writeFile(
      join(CATEGORIES_ROOT, `${category.id}.md`),
      renderCategoryReport(category, catalogById),
      "utf8"
    );
  }

  const outputs = new Map([
    ["README.md", renderReadme(catalog, review, processRows)],
    ["executive-summary.md", renderExecutiveSummary(catalog, review, processRows)],
    ["source-access-matrix.md", renderSourceAccessMatrix(catalog)],
    ["internal-database-design.md", renderInternalDatabaseDesign()],
    ["shared-adapter-architecture.md", renderAdapterArchitecture()],
    ["category-process-coverage.md", renderCoverage(processRows)],
    ["cost-and-feasibility.md", renderCostAndFeasibility(catalog)],
    ["implementation-roadmap.md", renderRoadmap(catalog, instancesByStandard)],
    ["deployment-readiness.md", renderDeploymentReadiness(catalog)],
    ["unresolved-product-decisions.md", renderUnresolvedDecisions()],
    [
      "source-download-manifest.json",
      `${JSON.stringify(buildManifest(catalog, sampleMetadata), null, 2)}\n`
    ]
  ]);
  for (const [filename, content] of outputs) {
    await writeFile(join(OUTPUT_ROOT, filename), content, "utf8");
  }

  process.stdout.write(
    `Generated ${catalog.standards.length} Standard reports, ${review.categoryReviews.length} category reports, ${processRows.length} process rows, and ${sampleMetadata.size} samples.\n`
  );
}

await main();
