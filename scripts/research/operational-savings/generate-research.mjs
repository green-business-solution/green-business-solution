import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOperationalSavingsReview,
  loadOperationalSavingsSources
} from "../../generate-operational-savings-review-pages.mjs";
import {
  PROOF_LEVELS,
  buildProofLedger
} from "./proof-ledger.mjs";
import { runSyntheticPrototype } from "./synthetic-prototype.mjs";

const REPO_ROOT = fileURLToPath(new URL("../../..", import.meta.url));
const OUTPUT_ROOT = join(REPO_ROOT, "docs/operational-savings-automation-research");
const STANDARDS_ROOT = join(OUTPUT_ROOT, "standards");
const CATEGORIES_ROOT = join(OUTPUT_ROOT, "categories");
const SAMPLES_ROOT = join(OUTPUT_ROOT, "samples");
const CATALOG_PATH = fileURLToPath(new URL("./research-catalog.json", import.meta.url));
export const FEASIBILITY_SOURCE =
  "Derived from buildProofLedger process evidence during generation";

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

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
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

const PROOF_LEVEL_RANK = Object.freeze({
  END_TO_END_REAL: 7,
  SOURCE_TO_STANDARD_REAL: 6,
  REAL_SOURCE_PARTIAL: 5,
  SYNTHETIC_ONLY: 4,
  DOCUMENTATION_ONLY: 3,
  ACCESS_BLOCKED: 2,
  SOURCE_UNSUPPORTED: 1
});

const SOURCE_VERIFIED_LEVELS = new Set([
  "END_TO_END_REAL",
  "SOURCE_TO_STANDARD_REAL",
  "REAL_SOURCE_PARTIAL"
]);

const MANUAL_EXPORT_DOWNSTREAM_GATES = Object.freeze([
  "sourceIdentityPinned",
  "artifactAcquired",
  "checksumOrCommitRetained",
  "schemaExtracted",
  "requiredFieldsLocated",
  "unitsEnumerationsPinned",
  "parserOrModelExecuted",
  "normalizedPublished",
  "resolutionExecuted",
  "standardOutputProduced",
  "unitScopeMatches",
  "offlineRerunPassed",
  "provenanceComplete",
  "mutationFailureTestsPassed"
]);

function isManualSeedStandard(standard) {
  return /\bmanual\b/i.test(standard.accessClass || "");
}

function hasGenuineExportArtifact(contribution) {
  return (contribution.realArtifacts || []).some((artifact) => {
    const mode = String(artifact.acquisitionMode || "").toUpperCase();
    return (
      artifact.official !== false &&
      mode.includes("EXPORT") &&
      !mode.includes("PROBE")
    );
  });
}

function hasManualExportDownstreamProof(contribution) {
  return (
    hasGenuineExportArtifact(contribution) &&
    MANUAL_EXPORT_DOWNSTREAM_GATES.every(
      (gate) => contribution.gates?.[gate] === true
    )
  );
}

function contributionsForStandard(process, standardId) {
  const contributions = (process.contributions || []).filter((contribution) =>
    contribution.coveredStandardIds?.includes(standardId)
  );
  if (contributions.length) return contributions;
  if (
    process.standardIds?.length === 1 &&
    process.standardIds[0] === standardId
  ) {
    return [process];
  }
  return [];
}

function bestProofForStandardProcess(process, standardId) {
  const contributions = contributionsForStandard(process, standardId);
  if (!contributions.length) {
    return {
      proofLevel: "DOCUMENTATION_ONLY",
      manualExportDownstream: false
    };
  }
  const selected = [...contributions].sort(
    (left, right) =>
      PROOF_LEVEL_RANK[right.proofLevel] -
        PROOF_LEVEL_RANK[left.proofLevel] ||
      String(left.contributionId || "").localeCompare(
        String(right.contributionId || "")
      )
  )[0];
  return {
    proofLevel: selected.proofLevel,
    manualExportDownstream: contributions.some(
      hasManualExportDownstreamProof
    )
  };
}

export function deriveStandardFeasibility(standard, processes) {
  const boundProcesses = processes.filter((process) =>
    process.standardIds.includes(standard.id)
  );
  const proofLevelCounts = Object.fromEntries(
    PROOF_LEVELS.map((level) => [level, 0])
  );
  const assessments = boundProcesses.map((process) => {
    const proof = bestProofForStandardProcess(process, standard.id);
    proofLevelCounts[proof.proofLevel] += 1;
    return {
      categoryId: process.categoryId,
      processKey: process.processKey,
      ...proof
    };
  });
  const processCount = assessments.length;
  const endToEndProcessCount = assessments.filter(
    (assessment) => assessment.proofLevel === "END_TO_END_REAL"
  ).length;
  const sourceVerifiedProcessCount = assessments.filter((assessment) =>
    SOURCE_VERIFIED_LEVELS.has(assessment.proofLevel)
  ).length;
  const manualExportReadyProcessCount = assessments.filter(
    (assessment) => assessment.manualExportDownstream
  ).length;

  let feasibility;
  let basis;
  if (isManualSeedStandard(standard)) {
    if (
      processCount > 0 &&
      manualExportReadyProcessCount === processCount
    ) {
      feasibility = "FEASIBLE_AFTER_MANUAL_SEED";
      basis =
        "Every bound process has a genuine official export that reaches the complete source-to-Standard gate set offline.";
    } else if (manualExportReadyProcessCount > 0) {
      feasibility = "PARTIALLY_FEASIBLE";
      basis =
        "A genuine official export reaches downstream proof for only a subset of the bound processes.";
    } else {
      feasibility = "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES";
      basis =
        "No genuine official export reaches the complete source-to-Standard gate set, so an access probe or planned operator workflow is not counted as a manual seed.";
    }
  } else if (
    processCount > 0 &&
    endToEndProcessCount === processCount
  ) {
    feasibility = "FEASIBLE_NOW";
    basis =
      "Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests.";
  } else if (endToEndProcessCount > 0) {
    feasibility = "PARTIALLY_FEASIBLE";
    basis =
      "At least one bound process is proved end to end, but the complete Standard process set is not.";
  } else if (sourceVerifiedProcessCount > 0) {
    feasibility = "FEASIBLE_AFTER_ADAPTER_WORK";
    basis =
      "Real source evidence reaches a source-specific parser or Standard output, but no bound process is proved end to end.";
  } else {
    feasibility = "NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES";
    basis =
      "No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.";
  }

  return {
    standardId: standard.id,
    feasibility,
    processCount,
    endToEndProcessCount,
    sourceVerifiedProcessCount,
    manualExportReadyProcessCount,
    proofLevelCounts,
    basis,
    processes: assessments
  };
}

export function deriveStandardFeasibilities(standards, proofLedger) {
  const processes = proofLedger.processes.map((entry) => entry.proof || entry);
  return standards.map((standard) =>
    deriveStandardFeasibility(standard, processes)
  );
}

function processIdentity(categoryId, processKey) {
  return `${categoryId}\u0000${processKey}`;
}

function canonicalRequiredInputs(process) {
  return process.inputBindings.map((binding) => ({
    inputName: binding.lookupInput,
    sourceOwner: binding.sourceLabel,
    treePath: binding.treePath
  }));
}

function canonicalOutputBindings(process) {
  return process.outputBindings.map((binding) => ({
    outputName: binding.outputName,
    formulaTerm: binding.formulaTerm,
    unit: binding.outputUnit,
    scope: binding.outputScope,
    treePath: binding.treePath
  }));
}

function assertSameProcessField(identity, field, canonicalValue, proofValue) {
  if (JSON.stringify(canonicalValue) !== JSON.stringify(proofValue)) {
    throw new Error(
      `Canonical and proof process views disagree for ${identity} field ${field}`
    );
  }
}

export function buildMergedResearchView(review, proofLedger) {
  const canonicalEntries = review.categoryReviews.flatMap((category) =>
    category.informationCard.processes.map((process) => ({
      category,
      process,
      identity: processIdentity(category.id, process.key)
    }))
  );
  const canonicalIdentities = canonicalEntries.map(({ identity }) => identity);
  const proofIdentities = proofLedger.processes.map((process) =>
    processIdentity(process.categoryId, process.processKey)
  );
  const duplicateCanonical = duplicateValues(canonicalIdentities);
  const duplicateProof = duplicateValues(proofIdentities);
  if (duplicateCanonical.length) {
    throw new Error(
      `Canonical process identities are duplicated: ${duplicateCanonical.join(", ")}`
    );
  }
  if (duplicateProof.length) {
    throw new Error(
      `Proof process identities are duplicated: ${duplicateProof.join(", ")}`
    );
  }

  const proofByIdentity = new Map(
    proofLedger.processes.map((process) => [
      processIdentity(process.categoryId, process.processKey),
      process
    ])
  );
  const canonicalIdentitySet = new Set(canonicalIdentities);
  const extraProof = proofIdentities.filter(
    (identity) => !canonicalIdentitySet.has(identity)
  );
  if (extraProof.length) {
    throw new Error(
      `Proof ledger contains noncanonical process identities: ${extraProof.join(", ")}`
    );
  }

  const processes = canonicalEntries.map(({ category, process, identity }) => {
    const proof = proofByIdentity.get(identity);
    if (!proof) {
      throw new Error(`Proof ledger omits canonical process ${identity}`);
    }
    assertSameProcessField(identity, "categoryTitle", category.title, proof.categoryTitle);
    assertSameProcessField(identity, "processName", process.name, proof.processName);
    assertSameProcessField(
      identity,
      "standardIds",
      process.canonicalStandardIds,
      proof.standardIds
    );
    assertSameProcessField(
      identity,
      "requiredInputs",
      canonicalRequiredInputs(process),
      proof.requiredInputs
    );
    assertSameProcessField(
      identity,
      "outputBindings",
      canonicalOutputBindings(process),
      proof.outputBindings
    );
    return {
      ...structuredClone(process),
      categoryId: category.id,
      categoryTitle: category.title,
      proof: structuredClone(proof)
    };
  });
  const processesByCategory = new Map(
    review.categoryReviews.map((category) => [
      category.id,
      processes.filter((process) => process.categoryId === category.id)
    ])
  );
  const processesByStandard = new Map(
    review.standards.map((standard) => [
      standard.id,
      processes.filter((process) =>
        process.canonicalStandardIds.includes(standard.id)
      )
    ])
  );
  return {
    processes,
    processesByCategory,
    processesByStandard
  };
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

function inputClassification(sourceLabel) {
  switch (sourceLabel) {
    case "Profile":
      return "REQUIRES_PROFILE";
    case "User":
      return "REQUIRES_USER";
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

function buildStandardInstances(review, mergedView) {
  const instances = new Map(review.standards.map((standard) => [standard.id, []]));
  const mergedByIdentity = new Map(
    mergedView.processes.map((process) => [
      processIdentity(process.categoryId, process.key),
      process
    ])
  );
  for (const category of review.categoryReviews) {
    for (const process of category.informationCard.processes) {
      const mergedProcess = mergedByIdentity.get(
        processIdentity(category.id, process.key)
      );
      if (!mergedProcess) {
        throw new Error(
          `Merged research view omits ${category.id}/${process.key}`
        );
      }
      for (const standardId of process.canonicalStandardIds) {
        instances.get(standardId)?.push({
          category,
          process: mergedProcess
        });
      }
    }
  }
  return instances;
}

function proofContributionsForStandard(process, standardId) {
  return (process.proof.contributions || []).filter((contribution) =>
    contribution.coveredStandardIds?.includes(standardId)
  );
}

function proofArtifactIdentity(artifact) {
  return [
    artifact.artifactId,
    artifact.release || artifact.version || "",
    artifact.sha256 || artifact.commitSha || ""
  ].join("\u0000");
}

function collectStandardProofEvidence(standardId, instances) {
  const artifacts = new Map();
  const schemas = new Map();
  for (const { category, process } of instances) {
    for (const contribution of proofContributionsForStandard(
      process,
      standardId
    )) {
      const processLabel = `${category.id}/${process.key}`;
      for (const artifact of contribution.realArtifacts || []) {
        const identity = proofArtifactIdentity(artifact);
        const current = artifacts.get(identity) || {
          artifact: structuredClone(artifact),
          proofLevels: new Set(),
          processes: new Set(),
          contributions: new Set()
        };
        current.proofLevels.add(contribution.proofLevel);
        current.processes.add(processLabel);
        current.contributions.add(contribution.contributionId);
        artifacts.set(identity, current);
      }
      for (const schema of contribution.observedSchemas || []) {
        const identity = [
          schema.schemaId,
          schema.artifactId,
          schema.format,
          schema.extractor
        ].join("\u0000");
        const current = schemas.get(identity) || {
          schema: structuredClone(schema),
          proofLevels: new Set(),
          processes: new Set(),
          contributions: new Set()
        };
        current.proofLevels.add(contribution.proofLevel);
        current.processes.add(processLabel);
        current.contributions.add(contribution.contributionId);
        schemas.set(identity, current);
      }
    }
  }
  const sortEvidence = (left, right) =>
    String(
      left.artifact?.artifactId || left.schema?.schemaId || ""
    ).localeCompare(
      String(right.artifact?.artifactId || right.schema?.schemaId || "")
    );
  return {
    artifacts: [...artifacts.values()].sort(sortEvidence),
    schemas: [...schemas.values()].sort(sortEvidence)
  };
}

function artifactIdsForProcessStandard(process, standardId) {
  return unique(
    proofContributionsForStandard(process, standardId).flatMap(
      (contribution) =>
        (contribution.realArtifacts || []).map(
          (artifact) => artifact.artifactId
        )
    )
  ).sort();
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
      const proofArtifactIds = artifactIdsForProcessStandard(
        process,
        standard.id
      );
      const current = outputRows.get(key) || {
        field: output.outputName,
        categories: new Set(),
        processes: new Set(),
        sourceArtifacts: new Set(),
        sourceNative: standard.nativeFields.join("; "),
        transformation: standard.derivation,
        target: output.outputUnit,
        classification: outputClassification(standard.id, process, output),
        limitation: standard.unsupportedBoundary
      };
      current.categories.add(category.id);
      current.processes.add(process.key);
      for (const artifactId of proofArtifactIds) {
        current.sourceArtifacts.add(artifactId);
      }
      outputRows.set(key, current);
    }
  }
  return [...inputRows.values(), ...outputRows.values()].map((row) => ({
    ...row,
    categories: [...row.categories].sort(),
    processes: [...row.processes].sort(),
    sourceArtifact: row.sourceArtifacts
      ? [...row.sourceArtifacts].sort().join("; ") ||
        "No retained proof artifact"
      : row.sourceArtifact
  }));
}

function formatExecutionTests(proof) {
  const results = proof.executionTestResults || [];
  if (results.length) {
    return results
      .map((result) => {
        const location = result.path
          ? `; ${result.path}${result.name ? ` :: ${result.name}` : ""}`
          : "";
        return `${result.testId}: ${result.status}${location}`;
      })
      .join("<br>");
  }
  const declaredTests = [
    ...(proof.realTests || []),
    ...(proof.syntheticTests || [])
  ];
  if (declaredTests.length) {
    return declaredTests
      .map(
        (test) =>
          `${test.testId || "unnamed test"}: DECLARED_ONLY${test.path ? `; ${test.path}` : ""}`
      )
      .join("<br>");
  }
  return "None required or recorded for the current proof state";
}

function selectedContributionForStandard(process, standardId) {
  const contributions = proofContributionsForStandard(process, standardId);
  if (!contributions.length) {
    return process.proof.standardIds.length === 1
      ? process.proof
      : {
          proofLevel: "DOCUMENTATION_ONLY",
          adapterPath: null,
          executionTestResults: [],
          blocker: {
            code: "STANDARD_PROOF_MISSING",
            detail:
              "No proof contribution names this Standard for the shared process."
          }
        };
  }
  return [...contributions].sort(
    (left, right) =>
      PROOF_LEVEL_RANK[right.proofLevel] -
        PROOF_LEVEL_RANK[left.proofLevel] ||
      String(left.contributionId || "").localeCompare(
        String(right.contributionId || "")
      )
  )[0];
}

export function nextActionForProcess(process) {
  const proof = process.proof || process;
  const blocker = formatBlocker(proof.blocker);
  switch (proof.proofLevel) {
    case "END_TO_END_REAL":
      return "Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change.";
    case "SOURCE_TO_STANDARD_REAL":
      return "Implement and execution-verify the category formula mapping from the proved Standard output, including unit, scope, provenance, and failure behavior.";
    case "REAL_SOURCE_PARTIAL":
      return `Complete the missing downstream proof gates recorded by the blocker, then rerun the exact adapter tests. ${blocker}`;
    case "SYNTHETIC_ONLY":
      return "Replace the synthetic fixture with a retained real source artifact or a content-addressed project, profile, bill, or document input as ownership permits, then record the exact offline execution.";
    case "ACCESS_BLOCKED":
      return `Perform the exact approved operator or access action recorded by the blocker, retain the resulting artifact, and resume at checksum and schema validation. ${blocker}`;
    case "SOURCE_UNSUPPORTED":
      return `Revise the source strategy or keep the card path explicitly unsupported before implementation. ${blocker}`;
    case "DOCUMENTATION_ONLY":
      return `Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. ${blocker}`;
    default:
      throw new Error(`Unknown proof level ${proof.proofLevel}`);
  }
}

function formatArtifactRelease(evidence) {
  const artifact = evidence.artifact;
  return artifact.release || artifact.version || "No release or version recorded";
}

function formatArtifactLocator(artifact) {
  return (
    artifact.sourceUrl ||
    artifact.cachePath ||
    artifact.sourceId ||
    "No locator recorded"
  );
}

function formatArtifactIntegrity(artifact) {
  const fields = [];
  if (artifact.sha256) fields.push(`sha256:${artifact.sha256}`);
  if (artifact.commitSha) fields.push(`commit:${artifact.commitSha}`);
  if (artifact.sizeBytes !== undefined) {
    fields.push(`${artifact.sizeBytes} bytes`);
  }
  return fields.join("; ") || "No checksum, commit, or byte size recorded";
}

function formatArtifactRole(artifact) {
  return (
    artifact.evidenceRole ||
    artifact.artifactRole ||
    artifact.acquisitionMode ||
    "Proof-manifest artifact"
  );
}

export function renderStandardReport(
  standard,
  canonical,
  instances,
  evidenceRecords,
  prototypeResult
) {
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
  const proofEvidence = collectStandardProofEvidence(standard.id, instances);
  const catalogObservation = standard.observedSha256
    ? `${standard.observedArtifact}, ${standard.observedFormat}, ${standard.observedSizeBytes} bytes, sha256:${standard.observedSha256}`
    : `${standard.observedArtifact}, ${standard.observedFormat}; no artifact checksum is recorded in the planning catalog`;
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
  const processProofTable = table(
    [
      "Category and process",
      "Execution-verified proof level",
      "Adapter",
      "Actual adapter test result",
      "Current blocker",
      "Conditional next action"
    ],
    instances.map(({ category, process }) => {
      const proof = selectedContributionForStandard(process, standard.id);
      return [
        `${category.id}/${process.key}`,
        proof.proofLevel,
        proof.adapterPath || "None implemented",
        formatExecutionTests(proof),
        formatBlocker(proof.blocker),
        nextActionForProcess(proof)
      ];
    })
  );
  const artifactTable = table(
    [
      "Artifact ID",
      "Evidence role",
      "Retained release or version",
      "Exact locator",
      "Integrity",
      "Current proof state",
      "Bound processes"
    ],
    proofEvidence.artifacts.length
      ? proofEvidence.artifacts.map((evidence) => [
          evidence.artifact.artifactId,
          formatArtifactRole(evidence.artifact),
          formatArtifactRelease(evidence),
          formatArtifactLocator(evidence.artifact),
          formatArtifactIntegrity(evidence.artifact),
          [...evidence.proofLevels].sort().join(", "),
          [...evidence.processes].sort().join(", ")
        ])
      : [[
          "None retained",
          "None",
          "None",
          "None",
          "None",
          "DOCUMENTATION_ONLY",
          processes.join(", ")
        ]]
  );
  const schemaTable = table(
    [
      "Schema ID",
      "Artifact ID",
      "Format",
      "Extractor",
      "Required native fields",
      "Current proof state"
    ],
    proofEvidence.schemas.length
      ? proofEvidence.schemas.map((evidence) => [
          evidence.schema.schemaId,
          evidence.schema.artifactId,
          evidence.schema.format,
          evidence.schema.extractor,
          (evidence.schema.requiredNativeFields || []).join("; "),
          [...evidence.proofLevels].sort().join(", ")
        ])
      : [[
          "None inspected",
          "None",
          "None",
          "None",
          "None",
          "DOCUMENTATION_ONLY"
        ]]
  );
  return `# ${standard.id} - ${canonical.title}

## 1. Canonical role and current process proof

This Standard is used by ${countLabel(categories.length, "category", "categories")} and ${countLabel(instances.length, "category-local process instance")}.
The categories are ${categories.join(", ")}.
The process keys are ${processes.join(", ")}.
The formula terms supplied are ${formulaTerms.join(", ") || "none"}.
The canonical output set contains ${countLabel(outputs.length, "distinct output description")}.

${processProofTable}

## 2. Official source inventory

The primary organization is ${standard.organization}.
The selected official source is ${standard.officialSource}.
The catalog acquisition target is ${standard.version}.
Its release date or release state is ${standard.releaseDate}.
The expected update cadence is ${standard.updateCadence}.
The license finding is ${standard.license}.
The legal-review requirement is ${standard.legalReview}.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

${standard.officialUrls.map((url) => `- ${url}`).join("\n")}

${sourceEvidenceTable}

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
The planning catalog observation is ${catalogObservation}.
The access-cost classification is ${standard.accessClass}.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

${artifactTable}

The current proof manifests record these inspected schemas:

${schemaTable}

Catalog-native field names that still require proof-backed inspection are:

${standard.nativeFields.map((field) => `- \`${field}\``).join("\n")}

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

${fieldTable}

For every \`DERIVABLE_FROM_SOURCE\` row, the governing derivation is: ${standard.derivation}.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

\`\`\`text
${standard.officialSource}
-> ${standard.accessRoutes[0]}
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into ${standard.internalTargets.join(" + ")}
-> deterministic ${standard.slug} adapter
-> typed Standard output
-> category formula mapping
-> immutable calculation and provenance
\`\`\`

Acquisition runs under a scheduler or approved operator action and never during a customer estimate.
A failed checksum, schema validation, normalization, or publication step leaves the prior accepted release and publication receipt active.
Implementation evidence must come from executed migrations, populated table counts, exact artifact identities, and the committed compact proof publication.

## 7. Resolution rules

Exact resolution requires one compatible active record after applying every source-supported identity, equipment class, capacity, geography, effective-date, and test-procedure filter.
Zero compatible records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
Requirements resolution admits only records satisfying every mandatory project and category constraint from one source release.
Benchmark resolution requires an authoritative, category-specific, unit-compatible population and a retained numeric selection rule.
An official recommended value takes precedence, followed by a defensible source-weighted median, then an ordinary median only for an exchangeable scalar population.
Structured records and model result sets are never median-selected.
Every selection retains its filters, eligible population, sample size, method, fallback level, uncertainty, and rejected candidates.

## 8. Calculation and runtime execution

The exact output contract contains: ${outputs.join("; ")}.
The governing source equation or transformation is ${standard.derivation}.
The selected runtime design is ${standard.runtimeDesign}.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows ${standard.updateCadence}.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify \`docs/operational-savings-automation-research/fixtures/research-database.compact.json\` against \`docs/operational-savings-automation-research/fixtures/research-database.publication.json\`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is ${cost.engineeringHours} hours.
Estimated raw storage is ${cost.rawStorageGb} GB.
Estimated published storage is ${cost.publishedStorageGb} GB.
Refresh effort is ${cost.refreshHours}.
Maintenance burden is ${cost.maintenance}.
External source cost is ${formatMoney(cost.externalMonthlyUsd)} per month.
Estimated internal storage and compute cost is ${formatMoney(cost.monthly100Usd)} at 100 calculations per month, ${formatMoney(cost.monthly1000Usd)} at 1,000, and ${formatMoney(cost.monthly10000Usd)} at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

\`\`\`bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
\`\`\`

The retained compact sample is \`docs/operational-savings-automation-research/samples/${standard.slug}.sample.json\`.
Its local output kind is \`${prototypeResult.kind}\`, its selection rule is \`${prototypeResult.selectionRule}\`, and its output unit is \`${prototypeResult.unit}\`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**${standard.feasibility}**

This verdict is derived from ${countLabel(standard.feasibilityEvidence.processCount, "bound process", "bound processes")}.
${standard.feasibilityEvidence.basis}
The proof ledger records ${countLabel(standard.feasibilityEvidence.endToEndProcessCount, "end-to-end real process", "end-to-end real processes")}, ${countLabel(standard.feasibilityEvidence.sourceVerifiedProcessCount, "source-verified process", "source-verified processes")}, and ${countLabel(standard.feasibilityEvidence.manualExportReadyProcessCount, "process", "processes")} with genuine manual-export downstream proof.
The supported boundary is ${standard.supportedBoundary}.
The unsupported boundary is ${standard.unsupportedBoundary}.

## 13. Recommended strategy and later card review

${standard.recommendedStrategy}
The rejected alternative is: ${standard.rejectedAlternative}
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
`;
}

export function renderCategoryReport(
  category,
  standardCatalog,
  mergedProcesses
) {
  const processes = mergedProcesses;
  if (processes.length !== category.informationCard.processes.length) {
    throw new Error(
      `${category.id} merged process count differs from its canonical process count`
    );
  }
  const contractRows = processes.map((process) => [
    process.key,
    process.name,
    process.canonicalStandardIds.join(", "),
    process.inputBindings
      .map(
        (binding) =>
          `${binding.lookupInput} [${binding.sourceLabel}]`
      )
      .join("; "),
    process.outputBindings
      .map(
        (binding) =>
          `${binding.outputName} -> ${binding.formulaTerm} (${binding.outputUnit}; ${binding.outputScope})`
      )
      .join("; ")
  ]);
  const proofRows = processes.map((process) => [
      process.key,
      process.proof.proofLevel,
      process.proof.adapterPath || "None implemented",
      formatExecutionTests(process.proof),
      formatBlocker(process.proof.blocker)
  ]);
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

### Canonical process contract

${table(
  [
    "Process key",
    "Process name",
    "Canonical Standard",
    "Required inputs",
    "Exact output and formula term"
  ],
  contractRows
)}

### Current execution evidence

${table(
  [
    "Process key",
    "Execution-verified proof level",
    "Adapter path",
    "Actual adapter test result",
    "Current blocker"
  ],
  proofRows
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
The process table reports the final proof level after execution-record verification, not a higher level that a manifest may have declared before the current run.
An exact path is usable only when every owned input is present and every Standard adapter returns one unambiguous compatible result.
A benchmark path is usable only where the category has a retained authoritative population and exact selection rule.
The runtime external-call count remains zero.

## Conditional next actions

${table(
  ["Process key", "Current proof level", "Next action"],
  processes.map((process) => [
    process.key,
    process.proof.proofLevel,
    nextActionForProcess(process)
  ])
)}
`;
}

export function processCoverageRows(proofSource) {
  return proofSource.processes.map((entry) => {
    const process = entry.proof || entry;
    return {
      categoryId: process.categoryId,
      processKey: process.processKey,
      processName: process.processName,
      standardIds: [...process.standardIds],
      proofLevel: process.proofLevel,
      realArtifacts: structuredClone(process.realArtifacts),
      adapterPath: process.adapterPath,
      normalizedTargets: structuredClone(process.normalizedTargets),
      actualOutputs: structuredClone(process.actualOutputs),
      formulaMappings: structuredClone(process.formulaMappings),
      realTests: structuredClone(process.realTests),
      syntheticTests: structuredClone(process.syntheticTests),
      executionTestResults: structuredClone(
        process.executionTestResults
      ),
      offlineStatus: structuredClone(process.offlineStatus),
      blocker: structuredClone(process.blocker),
      nextAction: nextActionForProcess(process)
    };
  });
}

function compactJson(value) {
  return JSON.stringify(value);
}

function formatRealArtifacts(artifacts) {
  if (!artifacts.length) return "None retained";
  return artifacts
    .map((artifact) => {
      const locator =
        artifact.cachePath ||
        artifact.sourceUrl ||
        artifact.sourceId ||
        "no retained locator";
      const integrity = artifact.sha256
        ? `sha256:${artifact.sha256}`
        : artifact.commitSha
          ? `commit:${artifact.commitSha}`
          : "no retained checksum or commit";
      return `${artifact.artifactId || "unnamed artifact"} (${locator}; ${integrity})`;
    })
    .join("<br>");
}

function formatActualOutputs(outputs) {
  if (!outputs.length) return "None produced";
  return outputs
    .map(
      (output) =>
        `${output.formulaTerm}: ${compactJson(output.value)} (${output.unit}; ${output.scope})`
    )
    .join("<br>");
}

function formatNormalizedTargets(targets) {
  if (!targets.length) return "None published";
  return targets
    .map((target) =>
      typeof target === "string" ? target : compactJson(target)
    )
    .join("<br>");
}

function formatFormulaMappings(mappings) {
  if (!mappings.length) return "None mapped";
  return mappings
    .map(
      (mapping) =>
        `${mapping.formulaTerm} [${mapping.status}]${mapping.testId ? ` via ${mapping.testId}` : ""}`
    )
    .join("<br>");
}

function formatOfflineStatus(status) {
  const fields = [status.status || "NOT_RUN"];
  if (status.testId) fields.push(`test:${status.testId}`);
  if (status.networkMode) fields.push(`network:${status.networkMode}`);
  return fields.join("; ");
}

function formatBlocker(blocker) {
  if (!blocker) return "None";
  const missingGates = blocker.missingGates?.length
    ? ` Missing gates: ${blocker.missingGates.join(", ")}.`
    : "";
  return `${blocker.code}: ${blocker.detail || "No detail supplied."}${missingGates}`;
}

function formatProofLevelMix(counts) {
  return PROOF_LEVELS.filter((level) => counts[level] > 0)
    .map((level) => `${level}: ${counts[level]}`)
    .join("; ");
}

export function renderCoverage(rows, standardFeasibilities) {
  return `# Category-process automation coverage

This inventory is generated from the contradiction-checked merge of canonical Information Card bindings and \`proof-ledger.v2.json\` evidence.
It contains exactly one row for every category-local process.
It does not infer readiness from planning labels in the research catalog.
An empty evidence field is reported explicitly and does not count as proof.

${table(
  [
    "Standard",
    "Derived feasibility",
    "Bound processes",
    "End-to-end real",
    "Source verified",
    "Manual export downstream",
    "Proof-level mix",
    "Evidence basis"
  ],
  standardFeasibilities.map((summary) => [
    summary.standardId,
    summary.feasibility,
    summary.processCount,
    summary.endToEndProcessCount,
    summary.sourceVerifiedProcessCount,
    summary.manualExportReadyProcessCount,
    formatProofLevelMix(summary.proofLevelCounts),
    summary.basis
  ])
)}

## Process evidence

${table(
  [
    "Category",
    "Process key",
    "Process name",
    "Canonical Standard",
    "Proof level",
    "Real artifact",
    "Adapter path",
    "Normalized target",
    "Actual output",
    "Formula term",
    "Actual adapter test",
    "Offline status",
    "Blocker",
    "Conditional next action"
  ],
  rows.map((row) => [
    row.categoryId,
    row.processKey,
    row.processName,
    row.standardIds.join(", "),
    row.proofLevel,
    formatRealArtifacts(row.realArtifacts),
    row.adapterPath || "None retained",
    formatNormalizedTargets(row.normalizedTargets),
    formatActualOutputs(row.actualOutputs),
    formatFormulaMappings(row.formulaMappings),
    formatExecutionTests(row),
    formatOfflineStatus(row.offlineStatus),
    formatBlocker(row.blocker),
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
    ["energy_star_commercial_dishwashers", "ENERGY STAR commercial-dishwasher summary fields", "product_id", "machine_type, sanitation_method, water_gallons_per_rack, washing_kwh_per_rack, idle_energy_rate_kw, date_qualified"],
    ["energy_star_dishwasher_operating_modes", "Mode-specific ENERGY STAR commercial-dishwasher metrics", "id", "product_id, operating_mode, water_gallons_per_rack, washing_kwh_per_rack, idle_energy_rate_kw, booster_idle_energy_rate_kw, racks_per_hour"],
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
    ["operating_schedule_references", "Pinned source-backed astronomy or schedule validation observations", "id", "source_release_id, reference_kind, location, local_date, event_name, local_time, native_text"],
    ["model_versions", "Pinned executable models", "id", "name, version, commit_sha, package_sha256, license"],
    ["model_input_schemas", "Model input contracts", "id", "model_version_id, schema_json, fingerprint"],
    ["calculation_assumptions", "Versioned RetroFi-owned assumptions", "id", "assumption_key, value_json, unit_id, effective_from, approved_by"],
    ["selected_values", "One selected value or structure per resolver", "id", "calculation_run_id, process_key, result_kind, value_json, unit_id"],
    ["selected_value_provenance", "Complete selected-value trace", "id", "selected_value_id, release_id, artifact_id, filters_json, population_id, fallback_level"],
    ["calculation_runs", "Reproducible local executions", "id", "adapter_version, input_hash, model_version_id, started_at, result_hash, status"],
    ["calculation_source_dependencies", "Typed lineage from a calculation to upstream runs or retained source artifacts", "calculation_run_id + dependency_role", "input_calculation_run_id, source_artifact_id, source_fields_json, transformation"],
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

CREATE TABLE calculation_source_dependencies (
  calculation_run_id uuid NOT NULL REFERENCES calculation_runs(id),
  dependency_role text NOT NULL,
  input_calculation_run_id uuid REFERENCES calculation_runs(id),
  source_artifact_id uuid REFERENCES source_artifacts(id),
  source_fields_json jsonb NOT NULL,
  transformation text NOT NULL,
  PRIMARY KEY (calculation_run_id, dependency_role),
  CHECK (
    input_calculation_run_id IS NOT NULL
    OR source_artifact_id IS NOT NULL
  )
);
\`\`\`

## Versioning and publication

Every raw artifact and normalized release is immutable.
Source, release, artifact, model-version, assumption, calculation-run, selected-value, and dependency identities are content-bound.
An idempotent insert may confirm identical content, but no upsert may replace different content behind an existing identity.
A source release moves through discovered, acquired, validated, normalized, reviewed, published, deprecated, and rejected states.
Only a published release may be selected by an estimate.
Publication is an atomic source-specific pointer and rollback changes that pointer without deleting data.
Effective dates are separate from ingestion and publication dates.
Historical calculations pin their source-release IDs and remain reproducible after a newer release is published.
A source-backed calculation dependency pins its source artifact.
A project, profile, bill, linked-opportunity, or document dependency may omit the source artifact only when it pins an immutable upstream calculation run whose input hash records the exact owned input.
\`calculation_source_dependencies\` enforces that every dependency has an upstream calculation run, a source artifact, or both.

The research database publisher builds the SQLite database, compact JSON export, and publication receipt in temporary paths.
It hashes the database and compact export, records their byte sizes under one generation ID, renames the data files, and renames the receipt last as the commit marker.
Consumers must verify \`docs/operational-savings-automation-research/fixtures/research-database.compact.json\` against \`docs/operational-savings-automation-research/fixtures/research-database.publication.json\` before use.
If any build, rename, or verification step fails, the prior committed generation remains authoritative.

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
  inputOwnership: "SOURCE" | "PROJECT_OR_PROFILE";
  source: string | null;
  sourceVersion: string | null;
  sourceArtifact: string | null;
  inputSha256: string;
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

Every result contains the selected value or structure, unit, scope, ownership, exact input hash, filters, eligible population, sample size, selection rule, fallback level, uncertainty, warnings, and provenance.
A source-backed result also contains its source, release, and artifact identities.
A project-owned result leaves those source fields null and proves the exact input through its content hash and immutable input calculation run.
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

## Identity and publication contract

Source IDs, release IDs, artifact IDs, model-version IDs, input hashes, and calculation IDs identify immutable content.
Adapters may reuse an existing row only after every identity-bearing field matches.
They fail closed on conflicting content instead of rewriting a retained release, artifact, assumption, calculation, selected value, or dependency.
\`calculation_source_dependencies\` requires an upstream calculation run or a source artifact for every dependency.
This permits content-addressed project inputs without falsely attributing them to an external source.

The offline proof publisher creates the database, compact export, and receipt as one generation.
It verifies byte sizes and SHA-256 values before publishing, then installs the receipt last.
The prior generation remains usable if publication fails before that final commit marker.

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
    "Bound processes",
    "End-to-end real",
    "Source verified",
    "Evidence basis",
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
    standard.feasibilityEvidence.processCount,
    standard.feasibilityEvidence.endToEndProcessCount,
    standard.feasibilityEvidence.sourceVerifiedProcessCount,
    standard.feasibilityEvidence.basis,
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
    standard.feasibilityEvidence.basis
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
  const proofCounts = Object.fromEntries(
    PROOF_LEVELS.map((level) => [
      level,
      rows.filter((row) => row.proofLevel === level).length
    ])
  );
  return `# Executive summary

The proof ledger currently demonstrates ${proofCounts.END_TO_END_REAL} end-to-end real process paths out of ${rows.length}.
Every other path remains limited to source-level proof, documentation, a synthetic test, an access block, or an unsupported source boundary.
The repository contains 19 canonical Standards, ${rows.length} category-local process instances, ${review.categoryReviews.length} categories, 632 explicit input bindings, 215 explicit output bindings, and 497 formula-term contracts.
All 19 Standards have a source inventory, compact synthetic sample, cost estimate, and proposed supported boundary.
Those planning artifacts are not automation proof.

Only Standards whose complete bound process set is end-to-end real receive \`FEASIBLE_NOW\`.
Standards with only a proved subset receive \`PARTIALLY_FEASIBLE\`.
A Standard receives \`FEASIBLE_AFTER_ADAPTER_WORK\` only when real source execution exists but none of its bound processes is end-to-end real.
DOE CCMS and WaterSense labeled-product access probes do not qualify for \`FEASIBLE_AFTER_MANUAL_SEED\` because no genuine official export reaches the downstream source-to-Standard gates.

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
- [Real-proof ledger](proof-ledger.v2.json)
- [Compact research database](fixtures/research-database.compact.json)
- [Database publication receipt](fixtures/research-database.publication.json)
- [Standard reports](standards/)
- [Category reports](categories/)
- [Retained compact samples](samples/)

## Reproduce

\`\`\`bash
node scripts/research/operational-savings/generate-research.mjs
node scripts/research/operational-savings/run-synthetic-prototypes.mjs
npx vitest run scripts/research/operational-savings/tests
\`\`\`

The synthetic prototype runner performs no network access and cannot satisfy a real-proof gate.
Research S3 is the durable source of truth for acquired and normalized artifacts, while research ECR is the durable source of truth for runnable model images.
The ignored \`scripts/research/operational-savings/.cache/\` directory is temporary working space and is not treated as durable evidence.
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
      compactSamplesCommitted: true,
      durableRawAndNormalizedStore: "research S3",
      durableRunnableModelStore: "research ECR",
      localCacheRole: "temporary working space only"
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
      feasibility: standard.feasibility,
      feasibilityEvidence: {
        processCount: standard.feasibilityEvidence.processCount,
        endToEndProcessCount:
          standard.feasibilityEvidence.endToEndProcessCount,
        sourceVerifiedProcessCount:
          standard.feasibilityEvidence.sourceVerifiedProcessCount,
        manualExportReadyProcessCount:
          standard.feasibilityEvidence.manualExportReadyProcessCount,
        proofLevelCounts: standard.feasibilityEvidence.proofLevelCounts,
        basis: standard.feasibilityEvidence.basis
      }
    }))
  };
}

async function main() {
  const sourceCatalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));
  if (sourceCatalog.feasibilitySource !== FEASIBILITY_SOURCE) {
    throw new Error(
      "Research catalog does not declare proof-ledger feasibility derivation"
    );
  }
  const staticFeasibility = sourceCatalog.standards.filter((standard) =>
    Object.prototype.hasOwnProperty.call(standard, "feasibility")
  );
  if (staticFeasibility.length) {
    throw new Error(
      `Research catalog must not declare static Standard feasibility: ${staticFeasibility.map((standard) => standard.id).join(", ")}`
    );
  }
  const proofLedger = await buildProofLedger({ repoRoot: REPO_ROOT });
  const sources = await loadOperationalSavingsSources(REPO_ROOT);
  const review = buildOperationalSavingsReview(sources);
  if (review.errors.length) {
    throw new Error(
      `Canonical operational-savings inventory is invalid:\n${review.errors.join("\n")}`
    );
  }
  const mergedView = buildMergedResearchView(review, proofLedger);
  const standardFeasibilities = deriveStandardFeasibilities(
    sourceCatalog.standards,
    mergedView
  );
  const feasibilityByStandard = new Map(
    standardFeasibilities.map((summary) => [summary.standardId, summary])
  );
  const catalog = {
    ...sourceCatalog,
    standards: sourceCatalog.standards.map((standard) => {
      const feasibilityEvidence = feasibilityByStandard.get(standard.id);
      if (!feasibilityEvidence) {
        throw new Error(
          `Proof ledger does not produce feasibility evidence for ${standard.id}`
        );
      }
      return {
        ...standard,
        feasibility: feasibilityEvidence.feasibility,
        feasibilityEvidence
      };
    })
  };
  const catalogById = new Map(catalog.standards.map((standard) => [standard.id, standard]));
  const canonicalIds = review.standards.map((standard) => standard.id).sort();
  const catalogIds = catalog.standards.map((standard) => standard.id).sort();
  if (JSON.stringify(canonicalIds) !== JSON.stringify(catalogIds)) {
    throw new Error("Research catalog Standard IDs do not match the canonical registry");
  }
  const canonicalById = new Map(review.standards.map((standard) => [standard.id, standard]));
  const instancesByStandard = buildStandardInstances(review, mergedView);
  const evidenceByStandard = new Map(
    canonicalIds.map((id) => [
      id,
      sources.evidenceManifest.evidence_records.filter((record) => record.standard_id === id)
    ])
  );
  const processRows = processCoverageRows(mergedView);
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
    const result = runSyntheticPrototype(standard);
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
      renderCategoryReport(
        category,
        catalogById,
        mergedView.processesByCategory.get(category.id) || []
      ),
      "utf8"
    );
  }

  const outputs = new Map([
    ["README.md", renderReadme(catalog, review, processRows)],
    ["executive-summary.md", renderExecutiveSummary(catalog, review, processRows)],
    ["source-access-matrix.md", renderSourceAccessMatrix(catalog)],
    ["internal-database-design.md", renderInternalDatabaseDesign()],
    ["shared-adapter-architecture.md", renderAdapterArchitecture()],
    [
      "category-process-coverage.md",
      renderCoverage(processRows, standardFeasibilities)
    ],
    ["cost-and-feasibility.md", renderCostAndFeasibility(catalog)],
    ["implementation-roadmap.md", renderRoadmap(catalog, instancesByStandard)],
    ["deployment-readiness.md", renderDeploymentReadiness(catalog)],
    ["unresolved-product-decisions.md", renderUnresolvedDecisions()],
    [
      "source-download-manifest.json",
      `${JSON.stringify(buildManifest(catalog, sampleMetadata), null, 2)}\n`
    ],
    [
      "proof-ledger.v2.json",
      `${JSON.stringify(proofLedger, null, 2)}\n`
    ]
  ]);
  for (const [filename, content] of outputs) {
    await writeFile(join(OUTPUT_ROOT, filename), content, "utf8");
  }

  process.stdout.write(
    `Generated ${catalog.standards.length} Standard reports, ${review.categoryReviews.length} category reports, ${processRows.length} process rows, and ${sampleMetadata.size} samples.\n`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
