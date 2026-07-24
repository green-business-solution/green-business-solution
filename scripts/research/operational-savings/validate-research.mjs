import { createHash } from "node:crypto";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOperationalSavingsReview,
  loadOperationalSavingsSources
} from "../../generate-operational-savings-review-pages.mjs";
import { runSyntheticPrototype, validateResult } from "./synthetic-prototype.mjs";

const REPO_ROOT = fileURLToPath(new URL("../../..", import.meta.url));
const OUTPUT_ROOT = join(REPO_ROOT, "docs/operational-savings-automation-research");
const CATALOG_PATH = fileURLToPath(new URL("./research-catalog.json", import.meta.url));
const MANIFEST_PATH = join(OUTPUT_ROOT, "source-download-manifest.json");
const ALLOWED_INPUT_SOURCES = new Set([
  "Bill",
  "Linked Opportunity",
  "Profile",
  "Project Document",
  "Standard Output",
  "User"
]);
const REQUIRED_INTERNAL_TABLES = new Set([
  "source_registry",
  "source_releases",
  "source_artifacts",
  "source_checksums",
  "ingestion_runs",
  "schema_versions",
  "equipment_products",
  "equipment_certifications",
  "equipment_performance_fields",
  "installed_baseline_benchmarks",
  "building_upgrade_measures",
  "building_archetype_benchmarks",
  "geographic_crosswalks",
  "climate_crosswalks",
  "utility_providers",
  "utility_tariffs",
  "tariff_periods",
  "tariff_energy_charges",
  "tariff_demand_charges",
  "tariff_export_rules",
  "product_taxonomy_crosswalks",
  "retrofit_measure_crosswalks",
  "benchmark_populations",
  "benchmark_values",
  "model_versions",
  "model_input_schemas",
  "calculation_assumptions",
  "selected_values",
  "selected_value_provenance",
  "calculation_runs",
  "calculation_warnings"
]);
const REQUIRED_ROOT_FILES = [
  "README.md",
  "executive-summary.md",
  "source-access-matrix.md",
  "internal-database-design.md",
  "shared-adapter-architecture.md",
  "category-process-coverage.md",
  "cost-and-feasibility.md",
  "implementation-roadmap.md",
  "deployment-readiness.md",
  "unresolved-product-decisions.md",
  "source-download-manifest.json"
];
const EXPECTED_CLASSIFICATIONS = new Set([
  "DIRECTLY_AVAILABLE",
  "DERIVABLE_FROM_SOURCE",
  "REQUIRES_PROFILE",
  "REQUIRES_USER",
  "REQUIRES_BILL",
  "REQUIRES_LINKED_OPPORTUNITY",
  "REQUIRES_PROJECT_DOCUMENT",
  "REQUIRES_RETROFI_ASSUMPTION",
  "NOT_AVAILABLE",
  "SOURCE_INCOMPATIBLE"
]);
const EXPECTED_FEASIBILITY = new Set([
  "FEASIBLE_NOW",
  "FEASIBLE_AFTER_MANUAL_SEED",
  "FEASIBLE_AFTER_ADAPTER_WORK",
  "PARTIALLY_FEASIBLE",
  "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES"
]);

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

async function listMatching(directory, pattern) {
  return (await readdir(directory)).filter((name) => pattern.test(name)).sort();
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "RetroFi operational-savings research link check" }
    });
    if ([400, 405, 429].includes(response.status)) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "RetroFi operational-savings research link check",
          range: "bytes=0-0"
        }
      });
    }
    return { url, status: response.status, ok: response.status < 500 && response.status !== 404 };
  } catch (error) {
    return { url, status: null, ok: false, error: error.message };
  } finally {
    clearTimeout(timer);
  }
}

async function checkUrls(urls) {
  const results = [];
  const pending = [...urls];
  const workers = Array.from({ length: Math.min(6, pending.length) }, async () => {
    while (pending.length) {
      const url = pending.shift();
      results.push(await checkUrl(url));
    }
  });
  await Promise.all(workers);
  return results.sort((left, right) => left.url.localeCompare(right.url));
}

export async function validateResearch({
  checkLinks = false,
  checkCache = false
} = {}) {
  const errors = [];
  const warnings = [];
  const catalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  const sources = await loadOperationalSavingsSources(REPO_ROOT);
  const review = buildOperationalSavingsReview(sources);
  errors.push(...review.errors.map((error) => `Canonical inventory: ${error}`));

  if (catalog.standards.length !== 19) {
    errors.push(`Expected 19 catalog Standards, found ${catalog.standards.length}`);
  }
  for (const fileName of REQUIRED_ROOT_FILES) {
    const exists = await access(join(OUTPUT_ROOT, fileName)).then(() => true).catch(() => false);
    if (!exists) errors.push(`Required research output is missing: ${fileName}`);
  }
  if (
    JSON.stringify([...catalog.classifications].sort()) !==
    JSON.stringify([...EXPECTED_CLASSIFICATIONS].sort())
  ) {
    errors.push("Catalog support classifications differ from the required classification set");
  }
  if (
    JSON.stringify([...catalog.feasibilityVerdicts].sort()) !==
    JSON.stringify([...EXPECTED_FEASIBILITY].sort())
  ) {
    errors.push("Catalog feasibility verdicts differ from the required verdict set");
  }
  if (review.standards.length !== 19) {
    errors.push(`Expected 19 canonical Standards, found ${review.standards.length}`);
  }
  if (review.categoryReviews.length !== 54) {
    errors.push(`Expected 54 categories, found ${review.categoryReviews.length}`);
  }
  const processes = review.categoryReviews.flatMap((category) =>
    category.informationCard.processes.map((process) => ({ category, process }))
  );
  if (processes.length !== 124) {
    errors.push(`Expected 124 category-local processes, found ${processes.length}`);
  }
  if (sources.informationCardBindingRegistry.input_bindings.length !== 632) {
    errors.push("Expected 632 explicit input bindings");
  }
  if (sources.informationCardBindingRegistry.output_bindings.length !== 215) {
    errors.push("Expected 215 explicit output bindings");
  }
  const formulaTermCount = sources.categoryContracts.categories.reduce(
    (sum, category) => sum + category.formula_terms.length,
    0
  );
  if (formulaTermCount !== 497) {
    errors.push(`Expected 497 formula terms, found ${formulaTermCount}`);
  }

  const canonicalIds = review.standards.map((standard) => standard.id).sort();
  const catalogIds = catalog.standards.map((standard) => standard.id).sort();
  if (JSON.stringify(canonicalIds) !== JSON.stringify(catalogIds)) {
    errors.push("Catalog IDs differ from canonical Standard IDs");
  }
  for (const duplicate of duplicateValues(catalog.standards.map((standard) => standard.id))) {
    errors.push(`Duplicate Standard ID: ${duplicate}`);
  }
  for (const duplicate of duplicateValues(catalog.standards.map((standard) => standard.slug))) {
    errors.push(`Duplicate Standard slug: ${duplicate}`);
  }

  const standardFiles = await listMatching(join(OUTPUT_ROOT, "standards"), /\.md$/);
  const categoryFiles = await listMatching(join(OUTPUT_ROOT, "categories"), /^ITC-\d{2}\.md$/);
  const sampleFiles = await listMatching(join(OUTPUT_ROOT, "samples"), /\.sample\.json$/);
  if (standardFiles.length !== 19) errors.push(`Expected 19 Standard reports, found ${standardFiles.length}`);
  if (categoryFiles.length !== 54) errors.push(`Expected 54 category reports, found ${categoryFiles.length}`);
  if (sampleFiles.length !== 19) errors.push(`Expected 19 samples, found ${sampleFiles.length}`);
  const expectedCategoryFiles = review.categoryReviews.map((category) => `${category.id}.md`).sort();
  if (JSON.stringify(categoryFiles) !== JSON.stringify(expectedCategoryFiles)) {
    errors.push("Category report filenames differ from the canonical category inventory");
  }

  for (const standard of catalog.standards) {
    const reportPath = join(OUTPUT_ROOT, "standards", `${standard.slug}.md`);
    const report = await readFile(reportPath, "utf8").catch(() => null);
    if (report === null) {
      errors.push(`Missing Standard report: ${standard.slug}.md`);
      continue;
    }
    for (let section = 1; section <= 18; section += 1) {
      if (!report.includes(`## ${section}. `)) {
        errors.push(`${standard.id} report is missing section ${section}`);
      }
    }
    if (!report.includes(`**${standard.feasibility}**`)) {
      errors.push(`${standard.id} report is missing its exact feasibility verdict`);
    }
    if (!report.includes("The required number of external calls during a customer estimate is zero.")) {
      errors.push(`${standard.id} report does not state the zero-call runtime boundary`);
    }
    if (!catalog.feasibilityVerdicts.includes(standard.feasibility)) {
      errors.push(`${standard.id} has invalid feasibility ${standard.feasibility}`);
    }
    const sectionThree = report.match(
      /## 3\. What can actually be acquired\n\n([\s\S]*?)\n\nThe tested access result is:/
    )?.[1];
    const accessRows = sectionThree
      ? sectionThree.split("\n").filter((line) => /^\| (?!---)/.test(line)).slice(1)
      : [];
    if (accessRows.length !== standard.accessRoutes.length) {
      errors.push(
        `${standard.id} documents ${accessRows.length} access routes instead of ${standard.accessRoutes.length}`
      );
    }
    const sectionFive = report.match(
      /## 5\. RetroFi field coverage\n\n([\s\S]*?)\n\nFor every `DERIVABLE_FROM_SOURCE` row/
    )?.[1];
    const fieldRows = sectionFive
      ? sectionFive.split("\n").filter((line) => /^\| (?!---)/.test(line)).slice(1)
      : [];
    const instances = processes.filter(({ process }) =>
      process.canonicalStandardIds.includes(standard.id)
    );
    const expectedFieldKeys = new Set();
    for (const { process } of instances) {
      for (const binding of process.inputBindings) {
        expectedFieldKeys.add(`input:${binding.lookupInput}\u0000${binding.sourceLabel}`);
      }
      for (const binding of process.outputBindings) {
        expectedFieldKeys.add(`output:${binding.outputName}\u0000${binding.formulaTerm}`);
      }
    }
    if (fieldRows.length !== expectedFieldKeys.size) {
      errors.push(
        `${standard.id} has ${fieldRows.length} field-coverage rows instead of ${expectedFieldKeys.size}`
      );
    }
    for (const row of fieldRows) {
      const classifications = [...EXPECTED_CLASSIFICATIONS].filter((value) =>
        row.includes(`| ${value} |`)
      );
      if (classifications.length !== 1) {
        errors.push(`${standard.id} has a field row without exactly one support classification`);
      }
    }
    if (!standard.derivation || !standard.recommendedStrategy || !standard.unsupportedBoundary) {
      errors.push(`${standard.id} lacks a derivation, final strategy, or unsupported boundary`);
    }
    for (const target of standard.internalTargets) {
      if (!REQUIRED_INTERNAL_TABLES.has(target)) {
        errors.push(`${standard.id} references unknown internal target ${target}`);
      }
    }
    for (const url of standard.officialUrls) {
      try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) {
          errors.push(`${standard.id} has a non-HTTP source URL: ${url}`);
        }
      } catch {
        errors.push(`${standard.id} has an invalid source URL: ${url}`);
      }
    }
    const first = runSyntheticPrototype(standard);
    const second = runSyntheticPrototype(standard);
    if (JSON.stringify(first) !== JSON.stringify(second)) {
      errors.push(`${standard.id} synthetic prototype is nondeterministic`);
    }
    if (!first.unit || !first.selectionRule || !first.provenance?.sha256) {
      errors.push(`${standard.id} synthetic prototype output contract is incomplete`);
    }
  }

  for (const { category, process } of processes) {
    if (!process.canonicalStandardIds.length) {
      errors.push(`${category.id}/${process.key} has no canonical Standard`);
    }
    for (const binding of process.inputBindings) {
      if (!ALLOWED_INPUT_SOURCES.has(binding.sourceLabel)) {
        errors.push(`${category.id}/${process.key} has unknown input owner ${binding.sourceLabel}`);
      }
    }
    for (const binding of process.outputBindings) {
      if (!binding.formulaTerm || !binding.outputUnit || !binding.outputScope) {
        errors.push(`${category.id}/${process.key} has an incomplete output contract`);
      }
    }
  }

  if (manifest.standards.length !== 19) {
    errors.push(`Manifest contains ${manifest.standards.length} Standards instead of 19`);
  }
  for (const duplicate of duplicateValues(manifest.standards.map((entry) => entry.standardId))) {
    errors.push(`Manifest duplicates ${duplicate}`);
  }
  if (
    JSON.stringify(manifest.standards.map((entry) => entry.standardId).sort()) !==
    JSON.stringify(catalogIds)
  ) {
    errors.push("Manifest Standard IDs differ from the catalog");
  }
  for (const entry of manifest.standards) {
    const samplePath = join(REPO_ROOT, entry.retainedSample.path);
    const content = await readFile(samplePath, "utf8").catch(() => null);
    if (content === null) {
      errors.push(`${entry.standardId} retained sample is missing`);
      continue;
    }
    const size = Buffer.byteLength(content);
    if (size !== entry.retainedSample.sizeBytes) {
      errors.push(`${entry.standardId} retained sample size differs from manifest`);
    }
    if (sha256(content) !== entry.retainedSample.sha256) {
      errors.push(`${entry.standardId} retained sample checksum differs from manifest`);
    }
    if (size >= 1_000_000) {
      errors.push(`${entry.standardId} retained sample exceeds 1 MB`);
    }
    const parsed = JSON.parse(content);
    if (parsed.standardId !== entry.standardId) {
      errors.push(`${entry.standardId} retained sample has the wrong Standard ID`);
    }
    try {
      validateResult(parsed.offlineResult);
    } catch (error) {
      errors.push(`${entry.standardId} retained sample result is invalid: ${error.message}`);
    }
    const standard = catalog.standards.find((candidate) => candidate.id === entry.standardId);
    if (
      standard &&
      JSON.stringify(parsed.offlineResult) !== JSON.stringify(runSyntheticPrototype(standard))
    ) {
      errors.push(`${entry.standardId} retained offline result is stale`);
    }
  }

  const databaseDesign = await readFile(join(OUTPUT_ROOT, "internal-database-design.md"), "utf8");
  for (const tableName of REQUIRED_INTERNAL_TABLES) {
    if (!databaseDesign.includes(`\`${tableName}\``) && !databaseDesign.includes(`| ${tableName} |`)) {
      errors.push(`Internal database design omits ${tableName}`);
    }
  }
  const coverage = await readFile(join(OUTPUT_ROOT, "category-process-coverage.md"), "utf8");
  const coverageRows = coverage.split("\n").filter((line) => /^\| ITC-\d{2} \|/.test(line));
  if (coverageRows.length !== 124) {
    errors.push(`Coverage report contains ${coverageRows.length} process rows instead of 124`);
  }
  for (const row of coverageRows) {
    const cells = row.slice(2, -2).split(" | ");
    if (!EXPECTED_FEASIBILITY.has(cells[16])) {
      errors.push(`Coverage row ${cells[0]}/${cells[1]} does not have exactly one valid verdict`);
    }
    if (cells[12] !== "0") {
      errors.push(`Coverage row ${cells[0]}/${cells[1]} has a runtime network dependency`);
    }
  }

  const adapterSource = await readFile(
    join(REPO_ROOT, "scripts/research/operational-savings/synthetic-prototype.mjs"),
    "utf8"
  );
  const runnerSource = await readFile(
    join(REPO_ROOT, "scripts/research/operational-savings/run-synthetic-prototypes.mjs"),
    "utf8"
  );
  if (/\bfetch\s*\(|https?:\/\//.test(`${adapterSource}\n${runnerSource}`)) {
    errors.push("Offline prototype code contains a network call or network URL");
  }

  if (checkCache) {
    for (const standard of catalog.standards) {
      if (!standard.observedSha256 || !standard.observedSizeBytes) continue;
      const cachePath = join(
        REPO_ROOT,
        "scripts/research/operational-savings/.cache/artifacts",
        basenameFromArtifact(standard.observedArtifact)
      );
      const exists = await access(cachePath).then(() => true).catch(() => false);
      if (!exists) {
        warnings.push(`${standard.id} raw cache artifact is not present at the inferred path`);
        continue;
      }
      const cacheContent = await readFile(cachePath);
      const cacheStats = await stat(cachePath);
      if (cacheStats.size !== standard.observedSizeBytes) {
        errors.push(`${standard.id} raw cache byte size differs from catalog`);
      }
      if (sha256(cacheContent) !== standard.observedSha256) {
        errors.push(`${standard.id} raw cache checksum differs from catalog`);
      }
    }
  }

  let linkResults = [];
  if (checkLinks) {
    linkResults = await checkUrls(
      uniqueUrls(catalog.standards.flatMap((standard) => standard.officialUrls))
    );
    for (const result of linkResults) {
      if (!result.ok) {
        errors.push(`Source link check failed: ${result.url} (${result.status ?? result.error})`);
      }
    }
  }

  return {
    errors,
    warnings,
    linkResults,
    counts: {
      standards: review.standards.length,
      categories: review.categoryReviews.length,
      processes: processes.length,
      inputBindings: sources.informationCardBindingRegistry.input_bindings.length,
      outputBindings: sources.informationCardBindingRegistry.output_bindings.length,
      formulaTerms: formulaTermCount,
      samples: sampleFiles.length
    }
  };
}

function uniqueUrls(urls) {
  return [...new Set(urls)].sort();
}

function basenameFromArtifact(artifact) {
  const mapping = {
    "upgrades_lookup.json": "comstock-upgrades.json",
    "pk8q-dim8.json?$limit=5": "energy-star-dishwashers.json",
    "PVWatts V8 Los Angeles response": "pvwatts-v8-response.json",
    "usurdb.csv.gz": "usurdb.csv.gz",
    "EPA CHP catalog PDF": "epa-chp-catalog.pdf",
    "vehicles.csv.zip": "vehicles.csv.zip",
    "ws-data-information-et-rainfall.xlsx": "watersense-climate.xlsx",
    "ws-commercial-excel-writeable-tables.xlsx": "watersense-ci-worksheets.xlsx",
    "FEMP exterior-lighting HTML": "femp-exterior-lighting.html",
    "USNO rise, set, and twilight definitions HTML": "usno-rise-set.html",
    "CFS Equipment Calculator.xlsx": "energy-star-cfs-calculator.xlsx"
  };
  return mapping[artifact] || artifact;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const report = await validateResearch({
    checkLinks: process.argv.includes("--check-links"),
    checkCache: process.argv.includes("--check-cache")
  });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (report.errors.length) process.exitCode = 1;
}
