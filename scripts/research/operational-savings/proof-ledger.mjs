import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOperationalSavingsReview,
  loadOperationalSavingsSources
} from "../../generate-operational-savings-review-pages.mjs";
import {
  DEFAULT_PROOF_EXECUTION_RUN_RECORD_RELATIVE_PATH,
  buildProofExecutionToolchainIdentity,
  buildProofSourceEvidenceFingerprint,
  loadProofExecutionRunRecord,
  proofArtifactIdentityCatalog,
  proofTestDeclarations,
  verifyProofExecutionRunRecord
} from "./proof-execution-run-record.mjs";

export const PROOF_GATES = Object.freeze([
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
  "formulaTermReached",
  "offlineRerunPassed",
  "provenanceComplete",
  "mutationFailureTestsPassed"
]);

export const PROOF_LEVELS = Object.freeze([
  "END_TO_END_REAL",
  "SOURCE_TO_STANDARD_REAL",
  "REAL_SOURCE_PARTIAL",
  "DOCUMENTATION_ONLY",
  "SYNTHETIC_ONLY",
  "ACCESS_BLOCKED",
  "SOURCE_UNSUPPORTED"
]);

export const PROOF_LEVEL_DEFINITIONS = Object.freeze({
  END_TO_END_REAL:
    "Every applicable real-source gate passes through the exact category formula input, offline rerun, provenance, and mutation or failure tests.",
  SOURCE_TO_STANDARD_REAL:
    "A real source reaches the exact declared Standard output offline with provenance and failure tests, but the category formula mapping is not proved.",
  REAL_SOURCE_PARTIAL:
    "A pinned real artifact or package reaches a source-specific parser or local model, but no complete Standard output chain is proved.",
  DOCUMENTATION_ONLY:
    "Source documentation or interfaces may be described, but no source-specific execution proof is retained.",
  SYNTHETIC_ONLY:
    "Only tests over synthetic, copied, or catalog-embedded values execute.",
  ACCESS_BLOCKED:
    "The required official artifact has not been lawfully acquired because the selected access path is blocked or requires an unavailable manual action.",
  SOURCE_UNSUPPORTED:
    "Inspected sources do not supply the process output within the declared compatibility boundary."
});

export const OUTPUT_COVERAGE_MODE_DEFINITIONS = Object.freeze({
  ALL_OUTPUTS:
    "The output gates require every canonical output binding.",
  COMMON_PLUS_ONE_ALTERNATIVE:
    "When selectedOutputGroupId is present, the output gates require every common output and every output in that one mutually exclusive group. Without an explicit selection, every canonical output remains required."
});

const STANDARD_OUTPUT_GATES = PROOF_GATES.filter(
  (gate) => gate !== "formulaTermReached"
);
const REAL_PARTIAL_GATES = PROOF_GATES.slice(0, 7);
const REAL_TEST_KINDS = new Set([
  "END_TO_END_REAL",
  "SOURCE_TO_STANDARD_REAL",
  "REAL_SOURCE_PARTIAL",
  "REAL_SOURCE_ACQUISITION",
  "REAL_SCHEMA",
  "REAL_PARSER",
  "LOCAL_MODEL_EXECUTION",
  "NORMALIZATION",
  "RESOLVER",
  "DATABASE_PUBLICATION",
  "OFFLINE_EXECUTION",
  "FORMULA_INPUT_MAPPING",
  "FAILURE",
  "MUTATION"
]);
const GATE_ALIASES = Object.freeze({
  sourcePinned: "sourceIdentityPinned",
  checksumVerified: "checksumOrCommitRetained",
  unitScopeMatched: "unitScopeMatches",
  offlinePassed: "offlineRerunPassed"
});
const DEFAULT_REPO_ROOT = fileURLToPath(new URL("../../..", import.meta.url));
const DEFAULT_ADAPTERS_ROOT = join(
  DEFAULT_REPO_ROOT,
  "scripts/research/operational-savings/adapters"
);
const DEFAULT_OUTPUT_PATH = join(
  DEFAULT_REPO_ROOT,
  "docs/operational-savings-automation-research/proof-ledger.v2.json"
);
const EXECUTION_DEPENDENT_PROOF_LEVELS = new Set([
  "END_TO_END_REAL",
  "SOURCE_TO_STANDARD_REAL",
  "REAL_SOURCE_PARTIAL",
  "SYNTHETIC_ONLY",
  "ACCESS_BLOCKED",
  "SOURCE_UNSUPPORTED"
]);

// These are the only canonical processes whose reviewed cards explicitly define
// mutually exclusive output branches. A proof manifest must name one branch or
// continue to prove every canonical output. Ordinary processes always require
// every output, and this contract does not change multi-Standard coverage.
export const CONDITIONAL_OUTPUT_COVERAGE = Object.freeze([
  {
    categoryId: "ITC-27",
    processKey: "exact-charger-rating",
    commonFormulaTerms: [
      "rated_output_power_kW",
      "standby_power_kW_per_port"
    ],
    alternativeGroups: [
      {
        groupId: "AC_OUTPUT",
        formulaTerms: ["ac_total_loss_W"]
      },
      {
        groupId: "DC_OUTPUT",
        formulaTerms: ["dc_efficiency_fraction"]
      }
    ],
    evidence:
      "docs/operational-savings-information-trees.md ITC-27 defines separate charging-input formulas for AC-output and DC-output EVSE."
  },
  {
    categoryId: "ITC-27",
    processKey: "requirement-charger-rating",
    commonFormulaTerms: [
      "rated_output_power_kW",
      "standby_power_kW_per_port"
    ],
    alternativeGroups: [
      {
        groupId: "AC_OUTPUT",
        formulaTerms: ["ac_total_loss_W"]
      },
      {
        groupId: "DC_OUTPUT",
        formulaTerms: ["dc_efficiency_fraction"]
      }
    ],
    evidence:
      "docs/operational-savings-information-trees.md ITC-27 defines separate charging-input formulas for AC-output and DC-output EVSE."
  },
  {
    categoryId: "ITC-28",
    processKey: "exact-charger-rating",
    commonFormulaTerms: ["rated_output_power_kW", "standby_kW_per_port"],
    alternativeGroups: [
      {
        groupId: "AC_OUTPUT",
        formulaTerms: ["ac_total_loss_W"]
      },
      {
        groupId: "DC_OUTPUT",
        formulaTerms: ["dc_efficiency_fraction"]
      }
    ],
    evidence:
      "docs/operational-savings-information-trees.md ITC-28 resolves one AC-output or DC-output charger record for the fleet charging calculation."
  },
  {
    categoryId: "ITC-28",
    processKey: "requirement-charger-rating",
    commonFormulaTerms: ["rated_output_power_kW", "standby_kW_per_port"],
    alternativeGroups: [
      {
        groupId: "AC_OUTPUT",
        formulaTerms: ["ac_total_loss_W"]
      },
      {
        groupId: "DC_OUTPUT",
        formulaTerms: ["dc_efficiency_fraction"]
      }
    ],
    evidence:
      "docs/operational-savings-information-trees.md ITC-28 resolves one AC-output or DC-output charger record for the fleet charging calculation."
  },
  {
    categoryId: "ITC-52",
    processKey: "dishwasher-water-heating-conversion",
    commonFormulaTerms: ["dishwasher_water_heating_result"],
    alternativeGroups: [
      {
        groupId: "RACK_MACHINE",
        formulaTerms: [
          "water_heating_R_per_rack_existing",
          "water_heating_R_per_rack_proposed"
        ]
      },
      {
        groupId: "FLIGHT_OR_CONVEYOR",
        formulaTerms: [
          "water_heating_R_per_hour_existing",
          "water_heating_R_per_hour_proposed"
        ]
      }
    ],
    evidence:
      "docs/operational-savings-information-trees.md ITC-52 defines separate rack and flight or conveyor formulas in their native activity units."
  },
  {
    categoryId: "ITC-52",
    processKey: "exact-existing-dishwasher-record",
    commonFormulaTerms: ["existing_dishwasher_record", "idle_kW_existing"],
    alternativeGroups: [
      {
        groupId: "RACK_MACHINE",
        formulaTerms: [
          "water_per_rack_existing",
          "active_kWh_per_rack_existing"
        ]
      },
      {
        groupId: "FLIGHT_OR_CONVEYOR",
        formulaTerms: [
          "water_per_hour_existing",
          "active_kWh_per_hour_existing"
        ]
      }
    ],
    evidence:
      "docs/operational-savings-information-trees.md ITC-52 requires classifying an existing record as rack or flight or conveyor before reading native performance fields."
  },
  {
    categoryId: "ITC-52",
    processKey: "exact-proposed-dishwasher-record",
    commonFormulaTerms: ["proposed_dishwasher_record", "idle_kW_proposed"],
    alternativeGroups: [
      {
        groupId: "RACK_MACHINE",
        formulaTerms: [
          "water_per_rack_proposed",
          "active_kWh_per_rack_proposed"
        ]
      },
      {
        groupId: "FLIGHT_OR_CONVEYOR",
        formulaTerms: [
          "water_per_hour_proposed",
          "active_kWh_per_hour_proposed"
        ]
      }
    ],
    evidence:
      "docs/operational-savings-information-trees.md ITC-52 requires classifying an exact proposed record as rack or flight or conveyor before reading native performance fields."
  },
  {
    categoryId: "ITC-52",
    processKey: "requirement-proposed-dishwasher-record",
    commonFormulaTerms: ["proposed_dishwasher_record", "idle_kW_proposed"],
    alternativeGroups: [
      {
        groupId: "RACK_MACHINE",
        formulaTerms: [
          "water_per_rack_proposed",
          "active_kWh_per_rack_proposed"
        ]
      },
      {
        groupId: "FLIGHT_OR_CONVEYOR",
        formulaTerms: [
          "water_per_hour_proposed",
          "active_kWh_per_hour_proposed"
        ]
      }
    ],
    evidence:
      "docs/operational-savings-information-trees.md ITC-52 requires selecting a requirement-matched rack or flight or conveyor population without mixing native units."
  }
]);

function stableHash(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizePath(repoRoot, path) {
  if (!path) return null;
  const absolute = resolve(repoRoot, path);
  const rel = relative(repoRoot, absolute);
  return rel.startsWith(`..${sep}`) || rel === ".." ? absolute : rel;
}

function processIdentity(categoryId, processKey) {
  return `${categoryId}\u0000${processKey}`;
}

function outputIdentity(output) {
  return [
    output.outputName,
    output.formulaTerm,
    output.unit ?? output.outputUnit,
    output.scope ?? output.outputScope
  ].join("\u0000");
}

function outputCoverageForProcess(categoryId, processKey) {
  const matches = CONDITIONAL_OUTPUT_COVERAGE.filter(
    (coverage) =>
      coverage.categoryId === categoryId && coverage.processKey === processKey
  );
  if (matches.length > 1) {
    throw new Error(
      `Duplicate conditional output coverage for ${categoryId}/${processKey}`
    );
  }
  if (!matches.length) return { mode: "ALL_OUTPUTS" };
  const [{ commonFormulaTerms, alternativeGroups, evidence }] = matches;
  return {
    mode: "COMMON_PLUS_ONE_ALTERNATIVE",
    commonFormulaTerms: [...commonFormulaTerms],
    alternativeGroups: alternativeGroups.map((group) => ({
      groupId: group.groupId,
      formulaTerms: [...group.formulaTerms]
    })),
    evidence
  };
}

function validateOutputCoverageContract(canonical, label) {
  const coverage = canonical.outputCoverage;
  if (!coverage || typeof coverage !== "object" || Array.isArray(coverage)) {
    throw new Error(`${label}.outputCoverage must be an object`);
  }
  if (coverage.mode === "ALL_OUTPUTS") return coverage;
  if (coverage.mode !== "COMMON_PLUS_ONE_ALTERNATIVE") {
    throw new Error(
      `${label}.outputCoverage has unknown mode ${coverage.mode}`
    );
  }
  if (
    !Array.isArray(coverage.commonFormulaTerms) ||
    !Array.isArray(coverage.alternativeGroups) ||
    coverage.alternativeGroups.length < 2
  ) {
    throw new Error(
      `${label}.outputCoverage must define common terms and at least two alternative groups`
    );
  }
  requireString(coverage.evidence, `${label}.outputCoverage.evidence`);
  const canonicalTerms = canonical.outputBindings.map(
    (binding) => binding.formulaTerm
  );
  const canonicalTermSet = new Set(canonicalTerms);
  if (canonicalTermSet.size !== canonicalTerms.length) {
    throw new Error(
      `${label} cannot use conditional coverage with duplicate formula terms`
    );
  }
  const groupIds = new Set();
  const declaredTerms = [];
  for (const term of coverage.commonFormulaTerms) {
    declaredTerms.push(
      requireString(term, `${label}.outputCoverage common term`)
    );
  }
  for (const [index, group] of coverage.alternativeGroups.entries()) {
    const groupLabel = `${label}.outputCoverage.alternativeGroups[${index}]`;
    const groupId = requireString(group.groupId, `${groupLabel}.groupId`);
    if (groupIds.has(groupId)) {
      throw new Error(`${label}.outputCoverage duplicates group ${groupId}`);
    }
    groupIds.add(groupId);
    if (!Array.isArray(group.formulaTerms) || !group.formulaTerms.length) {
      throw new Error(`${groupLabel}.formulaTerms must be a non-empty array`);
    }
    for (const term of group.formulaTerms) {
      declaredTerms.push(requireString(term, `${groupLabel} formula term`));
    }
  }
  const declaredTermSet = new Set(declaredTerms);
  if (declaredTermSet.size !== declaredTerms.length) {
    throw new Error(`${label}.outputCoverage assigns a formula term twice`);
  }
  const unknownTerms = declaredTerms.filter(
    (term) => !canonicalTermSet.has(term)
  );
  const omittedTerms = canonicalTerms.filter(
    (term) => !declaredTermSet.has(term)
  );
  if (unknownTerms.length || omittedTerms.length) {
    throw new Error(
      `${label}.outputCoverage must partition every canonical output; unknown: ${unknownTerms.join(", ") || "none"}; omitted: ${omittedTerms.join(", ") || "none"}`
    );
  }
  return coverage;
}

function applicableOutputBindings(canonical, selectedOutputGroupId, label) {
  const coverage = validateOutputCoverageContract(canonical, label);
  if (selectedOutputGroupId === null || selectedOutputGroupId === undefined) {
    return canonical.outputBindings;
  }
  const groupId = requireString(
    selectedOutputGroupId,
    `${label}.selectedOutputGroupId`
  );
  if (coverage.mode === "ALL_OUTPUTS") {
    throw new Error(
      `${label} selects output group ${groupId}, but the canonical process requires all outputs`
    );
  }
  const selectedGroup = coverage.alternativeGroups.find(
    (group) => group.groupId === groupId
  );
  if (!selectedGroup) {
    throw new Error(
      `${label} selects unknown output group ${groupId}; expected one of ${coverage.alternativeGroups
        .map((group) => group.groupId)
        .join(", ")}`
    );
  }
  const applicableTerms = new Set([
    ...coverage.commonFormulaTerms,
    ...selectedGroup.formulaTerms
  ]);
  return canonical.outputBindings.filter((binding) =>
    applicableTerms.has(binding.formulaTerm)
  );
}

function normalizeArray(value) {
  return Array.isArray(value) ? structuredClone(value) : [];
}

function normalizeBoolean(value, label) {
  if (value === undefined) return false;
  if (typeof value !== "boolean") {
    throw new Error(`${label} must be boolean when provided`);
  }
  return value;
}

export function normalizeProofGates(gates = {}, label = "proof gates") {
  if (!gates || typeof gates !== "object" || Array.isArray(gates)) {
    throw new Error(`${label} must be an object`);
  }
  const canonicalized = {};
  for (const [gate, value] of Object.entries(gates)) {
    const canonicalGate = GATE_ALIASES[gate] || gate;
    if (
      canonicalized[canonicalGate] !== undefined &&
      canonicalized[canonicalGate] !== value
    ) {
      throw new Error(
        `${label} supplies conflicting values for ${canonicalGate}`
      );
    }
    canonicalized[canonicalGate] = value;
  }
  const unknown = Object.keys(canonicalized).filter(
    (gate) => !PROOF_GATES.includes(gate)
  );
  if (unknown.length) {
    throw new Error(`${label} contains unknown gates: ${unknown.join(", ")}`);
  }
  return Object.fromEntries(
    PROOF_GATES.map((gate) => [
      gate,
      normalizeBoolean(canonicalized[gate], `${label}.${gate}`)
    ])
  );
}

export function deriveProofLevel(
  gates,
  {
    accessBlocked = false,
    sourceUnsupported = false,
    syntheticOnly = false
  } = {}
) {
  const normalized = normalizeProofGates(gates);
  if (accessBlocked && sourceUnsupported) {
    throw new Error("A proof cannot be both ACCESS_BLOCKED and SOURCE_UNSUPPORTED");
  }
  if (sourceUnsupported) return "SOURCE_UNSUPPORTED";
  if (accessBlocked) return "ACCESS_BLOCKED";
  if (PROOF_GATES.every((gate) => normalized[gate])) {
    return "END_TO_END_REAL";
  }
  if (STANDARD_OUTPUT_GATES.every((gate) => normalized[gate])) {
    return "SOURCE_TO_STANDARD_REAL";
  }
  if (REAL_PARTIAL_GATES.every((gate) => normalized[gate])) {
    return "REAL_SOURCE_PARTIAL";
  }
  if (syntheticOnly) return "SYNTHETIC_ONLY";
  return "DOCUMENTATION_ONLY";
}

function canonicalProcessRows(review) {
  return review.categoryReviews.flatMap((category) =>
    category.informationCard.processes.map((process) => {
      const canonical = {
        categoryId: category.id,
        categoryTitle: category.title,
        processKey: process.key,
        processName: process.name,
        standardIds: [...process.canonicalStandardIds],
        requiredInputs: process.inputBindings.map((binding) => ({
          inputName: binding.lookupInput,
          sourceOwner: binding.sourceLabel,
          treePath: binding.treePath
        })),
        outputBindings: process.outputBindings.map((binding) => ({
          outputName: binding.outputName,
          formulaTerm: binding.formulaTerm,
          unit: binding.outputUnit,
          scope: binding.outputScope,
          treePath: binding.treePath
        })),
        outputCoverage: outputCoverageForProcess(category.id, process.key)
      };
      validateOutputCoverageContract(
        canonical,
        `${category.id}/${process.key}`
      );
      return canonical;
    })
  );
}

export async function loadProofManifestFiles(adaptersRoot) {
  const directories = (await readdir(adaptersRoot, { withFileTypes: true }).catch(
    (error) => {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  ))
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));
  const manifests = [];
  for (const directory of directories) {
    for (const fileName of ["proof.json", "process-proof.json"]) {
      const path = join(adaptersRoot, directory.name, fileName);
      const source = await readFile(path, "utf8").catch((error) => {
        if (error.code === "ENOENT") return null;
        throw error;
      });
      if (source === null) continue;
      let content;
      try {
        content = JSON.parse(source);
      } catch (error) {
        throw new Error(`${path} is not valid JSON: ${error.message}`);
      }
      manifests.push({ path, content });
    }
  }
  return manifests;
}

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function explicitTestKinds(tests) {
  return new Set(
    tests.flatMap((test) => [
      ...(Array.isArray(test.kinds) ? test.kinds : []),
      ...(test.kind ? [test.kind] : [])
    ])
  );
}

function exactOutputCoverage(actual, canonical) {
  const actualKeys = new Set(actual.map(outputIdentity));
  return canonical.every((output) => actualKeys.has(outputIdentity(output)));
}

function validateSelectedOutputEvidence(
  contribution,
  applicableBindings,
  label
) {
  if (!contribution.selectedOutputGroupId) return;
  const applicableKeys = new Set(applicableBindings.map(outputIdentity));
  for (const [field, outputs] of [
    ["actualOutputs", contribution.actualOutputs],
    ["formulaMappings", contribution.formulaMappings]
  ]) {
    const inapplicable = outputs.filter(
      (output) => !applicableKeys.has(outputIdentity(output))
    );
    if (inapplicable.length) {
      throw new Error(
        `${label}.${field} includes outputs outside selected group ${contribution.selectedOutputGroupId}: ${inapplicable
          .map((output) => output.formulaTerm)
          .join(", ")}`
      );
    }
  }
}

function hasPinnedIdentity(contribution) {
  return contribution.realArtifacts.some(
    (artifact) =>
      artifact &&
      typeof artifact === "object" &&
      (artifact.sourceUrl || artifact.sourceId || artifact.officialSource) &&
      (artifact.release ||
        artifact.version ||
        artifact.sourceVersion ||
        artifact.commitSha)
  );
}

function hasRequiredFieldEvidence(contribution) {
  return (
    contribution.requiredFields.length > 0 ||
    contribution.observedSchemas.some(
      (schema) => Array.isArray(schema.fields) && schema.fields.length > 0
    )
  );
}

function hasUnitEvidence(contribution) {
  return (
    contribution.unitsEnumerations.length > 0 ||
    contribution.observedSchemas.some(
      (schema) =>
        Array.isArray(schema.fields) &&
        schema.fields.some(
          (field) =>
            field &&
            typeof field === "object" &&
            (field.unit ||
              (Array.isArray(field.enumeration) && field.enumeration.length))
        )
    ) ||
    (
      contribution.observedSchemas.length > 0 &&
      contribution.realTests.length > 0
    ) ||
    (
      (
        contribution.realTests.some(
          (test) =>
            Array.isArray(test.sourceNativeFields) &&
            test.sourceNativeFields.length > 0
        ) ||
        contribution.observedSchemas.some(
          (schema) =>
            Array.isArray(
              schema.requiredNativeFields
            ) &&
            schema.requiredNativeFields.length > 0
        )
      ) &&
      contribution.actualOutputs.length > 0 &&
      contribution.actualOutputs.every(
        (output) =>
          typeof output.unit === "string" &&
          output.unit.trim() &&
          typeof output.scope === "string" &&
          output.scope.trim()
      )
    )
  );
}

function validateDeclaredGateEvidence(
  contribution,
  canonical,
  label
) {
  const gates = contribution.declaredGates;
  const executionTests = [
    ...contribution.realTests,
    ...contribution.syntheticTests
  ];
  const kinds = explicitTestKinds(executionTests);
  const applicableBindings = applicableOutputBindings(
    canonical,
    contribution.selectedOutputGroupId,
    label
  );
  validateSelectedOutputEvidence(
    contribution,
    applicableBindings,
    label
  );
  const requirements = {
    sourceIdentityPinned: hasPinnedIdentity(contribution),
    artifactAcquired: contribution.realArtifacts.length > 0,
    checksumOrCommitRetained:
      contribution.checksums.length > 0 ||
      contribution.realArtifacts.some(
        (artifact) => artifact.sha256 || artifact.commitSha
      ),
    schemaExtracted: contribution.observedSchemas.length > 0,
    requiredFieldsLocated: hasRequiredFieldEvidence(contribution),
    unitsEnumerationsPinned: hasUnitEvidence({
      ...contribution,
      realTests: executionTests
    }),
    parserOrModelExecuted:
      Boolean(contribution.adapterPath) &&
      executionTests.length > 0,
    normalizedPublished: contribution.normalizedTargets.length > 0,
    resolutionExecuted:
      contribution.declaredResolutionStatus === "DECLARED" ||
      kinds.has("RESOLVER"),
    standardOutputProduced: exactOutputCoverage(
      contribution.actualOutputs,
      applicableBindings
    ),
    unitScopeMatches: exactOutputCoverage(
      contribution.actualOutputs,
      applicableBindings
    ),
    formulaTermReached: exactOutputCoverage(
      contribution.formulaMappings,
      applicableBindings
    ),
    offlineRerunPassed:
      contribution.declaredOfflineStatus.status === "DECLARED" &&
      (Boolean(contribution.declaredOfflineStatus.testId) ||
        kinds.has("OFFLINE_EXECUTION") ||
        executionTests.some(
          (test) => test.networkMode === "DISABLED"
        )),
    provenanceComplete: contribution.provenanceRefs.length > 0,
    mutationFailureTestsPassed:
      kinds.has("MUTATION") ||
      kinds.has("FAILURE") ||
      executionTests.some(
        (test) =>
          Array.isArray(test.mutationCases) &&
          test.mutationCases.length > 0
      )
  };
  const unsupported = PROOF_GATES.filter(
    (gate) => gates[gate] && !requirements[gate]
  );
  if (unsupported.length) {
    throw new Error(
      `${label} asserts gates without required evidence: ${unsupported.join(", ")}`
    );
  }
}

function normalizeDeclaredOfflineStatus(
  value,
  fallbackTest
) {
  const declaration =
    typeof value === "string"
      ? { declaredValue: value }
      : value &&
          typeof value === "object" &&
          !Array.isArray(value)
        ? {
            ...structuredClone(value),
            declaredValue: value.status ?? null
          }
        : {};
  delete declaration.status;
  const testId =
    declaration.testId ?? fallbackTest?.testId ?? null;
  if (!testId && !fallbackTest) {
    return {
      status: "NOT_DECLARED",
      testId: null,
      networkMode: null
    };
  }
  return {
    ...declaration,
    status: "DECLARED",
    testId,
    networkMode:
      declaration.networkMode ??
      fallbackTest?.networkMode ??
      null
  };
}

function normalizeContribution({
  entry,
  manifest,
  manifestPath,
  repoRoot,
  canonical,
  index
}) {
  const label = `${manifestPath} process ${canonical.categoryId}/${canonical.processKey}`;
  const declaredGates = normalizeProofGates(
    entry.gates || {},
    `${label}.gates`
  );
  const selectedOutputGroupId =
    entry.selectedOutputGroupId === undefined ||
    entry.selectedOutputGroupId === null
      ? null
      : requireString(
          entry.selectedOutputGroupId,
          `${label}.selectedOutputGroupId`
        );
  const applicableBindings = applicableOutputBindings(
    canonical,
    selectedOutputGroupId,
    label
  );
  const syntheticOnlyDisposition = Boolean(
    entry.syntheticOnly ||
      entry.disposition?.syntheticOnly ||
      entry.proofLevel === "SYNTHETIC_ONLY"
  );
  const artifactIds = new Set(entry.artifactIds || []);
  const testIds = new Set(entry.testIds || []);
  const manifestTestsById = new Map(
    (manifest.tests || []).map((test) => [
      test.testId,
      test
    ])
  );
  const unknownTestIds = [...testIds].filter(
    (testId) => !manifestTestsById.has(testId)
  );
  if (unknownTestIds.length) {
    throw new Error(
      `${label} references unknown test IDs: ${unknownTestIds.join(", ")}`
    );
  }
  const inheritedArtifacts = (manifest.artifacts || []).filter(
    (artifact) => !artifactIds.size || artifactIds.has(artifact.artifactId)
  );
  const realArtifacts = normalizeArray(
    entry.realArtifacts?.length ? entry.realArtifacts : inheritedArtifacts
  );
  const inheritedTests = (manifest.tests || []).filter(
    (test) => !testIds.size || testIds.has(test.testId)
  );
  const realTests = normalizeArray(
    entry.realTests?.length
      ? entry.realTests
      : syntheticOnlyDisposition
        ? []
        : inheritedTests
  );
  const realTestIds = realTests.map((test) =>
    requireString(test?.testId, `${label} real test ID`)
  );
  if (new Set(realTestIds).size !== realTestIds.length) {
    throw new Error(`${label} repeats a real test ID`);
  }
  for (const test of realTests) {
    for (const kind of [
      ...(Array.isArray(test.kinds) ? test.kinds : []),
      ...(test.kind ? [test.kind] : [])
    ]) {
      if (!REAL_TEST_KINDS.has(kind)) {
        throw new Error(`${label} uses unknown real test kind ${kind}`);
      }
    }
  }
  const syntheticTests = normalizeArray(
    entry.syntheticTests?.length
      ? entry.syntheticTests.map((test) => {
          if (typeof test === "string") {
            return manifestTestsById.get(test) ?? {
              testId: test
            };
          }
          if (
            test &&
            typeof test === "object" &&
            !Array.isArray(test) &&
            test.testId &&
            (!test.path || !test.name) &&
            manifestTestsById.has(test.testId)
          ) {
            return {
              ...manifestTestsById.get(test.testId),
              ...test
            };
          }
          return test;
        })
      : syntheticOnlyDisposition
        ? inheritedTests
        : []
  );
  const syntheticTestIds = syntheticTests.map(
    (test, syntheticTestIndex) => {
      const testLabel =
        `${label}.syntheticTests[${syntheticTestIndex}]`;
      if (
        !test ||
        typeof test !== "object" ||
        Array.isArray(test)
      ) {
        throw new Error(`${testLabel} must be an object`);
      }
      const testId = requireString(
        test.testId,
        `${testLabel}.testId`
      );
      test.path = normalizePath(
        repoRoot,
        requireString(test.path, `${testLabel}.path`)
      );
      test.name = requireString(
        test.name,
        `${testLabel}.name`
      );
      return testId;
    }
  );
  if (
    new Set(syntheticTestIds).size !==
    syntheticTestIds.length
  ) {
    throw new Error(`${label} repeats a synthetic test ID`);
  }
  const overlappingTestIds = syntheticTestIds.filter(
    (testId) => realTestIds.includes(testId)
  );
  if (overlappingTestIds.length) {
    throw new Error(
      `${label} reuses real test IDs as synthetic test IDs: ${overlappingTestIds.join(", ")}`
    );
  }
  const inheritedSchemas = (manifest.observedSchemas || []).filter(
    (schema) =>
      !artifactIds.size ||
      !schema.artifactId ||
      artifactIds.has(schema.artifactId)
  );
  const observedSchemas = normalizeArray(
    entry.observedSchemas?.length
      ? entry.observedSchemas
      : inheritedSchemas
  );
  const checksums = normalizeArray(
    entry.checksums?.length
      ? entry.checksums
      : realArtifacts
          .filter((artifact) => artifact.sha256 || artifact.commitSha)
          .map((artifact) => ({
            artifactId: artifact.artifactId || null,
            ...(artifact.sha256
              ? { algorithm: "sha256", digest: artifact.sha256 }
              : {}),
            ...(artifact.commitSha
              ? { algorithm: "git", digest: artifact.commitSha }
              : {})
          }))
  );
  const checksumDeclarationSource =
    entry.checksums?.length
      ? "EXPLICIT_CHECKSUM_DECLARATIONS"
      : checksums.length
        ? "DERIVED_FROM_MANIFEST_ARTIFACT_IDENTITIES"
        : "NONE";
  const requiredFields = normalizeArray(
    entry.requiredFields?.length
      ? entry.requiredFields
      : observedSchemas.flatMap(
          (schema) => schema.requiredNativeFields || []
        )
  );
  const claimFormulaTerms = new Set(entry.formulaTerms || []);
  const actualOutputObject =
    entry.actualOutput &&
    typeof entry.actualOutput === "object" &&
    !Array.isArray(entry.actualOutput)
      ? entry.actualOutput
      : {};
  const actualOutputs = normalizeArray(
    entry.actualOutputs?.length
      ? entry.actualOutputs
      : canonical.outputBindings
          .filter((binding) =>
            Object.prototype.hasOwnProperty.call(
              actualOutputObject,
              binding.formulaTerm
            )
          )
          .map((binding) => ({
            ...binding,
            value: actualOutputObject[binding.formulaTerm]
          }))
  );
  const actualOutputDeclarationSource =
    entry.actualOutputs?.length
      ? "EXPLICIT_ACTUAL_OUTPUT_DECLARATIONS"
      : Object.keys(actualOutputObject).length > 0
        ? "LEGACY_ACTUAL_OUTPUT_DECLARATION"
        : "NONE";
  const primaryTestId =
    realTests[0]?.testId ??
    syntheticTests[0]?.testId ??
    null;
  const formulaMappingDeclarationSource =
    entry.formulaMappings?.length
      ? "EXPLICIT_FORMULA_MAPPINGS"
      : entry.formulaTerms?.length
        ? "LEGACY_FORMULA_TERMS_DECLARATION"
        : "NONE";
  const formulaMappings = normalizeArray(
    entry.formulaMappings?.length
      ? entry.formulaMappings
      : canonical.outputBindings
          .filter((binding) => claimFormulaTerms.has(binding.formulaTerm))
          .map((binding) => ({
            ...binding,
            testId: primaryTestId
          }))
  );
  const unitsEnumerations = normalizeArray(
    entry.unitsEnumerations
  );
  const offlineTest = [
    ...realTests,
    ...syntheticTests
  ].find(
    (test) =>
      test.networkMode === "DISABLED" ||
      test.kind === "END_TO_END_REAL" ||
      test.kind === "SOURCE_TO_STANDARD_REAL"
  );
  const remainingBlocker =
    entry.blocker ??
    (entry.remainingBlocker
      ? {
          code: "REMAINING_BLOCKER",
          detail: entry.remainingBlocker
        }
      : null);
  const contribution = {
    contributionId:
      entry.contributionId ||
      `${manifest.adapterId}:${canonical.categoryId}:${canonical.processKey}:${index + 1}`,
    adapterId: manifest.adapterId,
    manifestPath: normalizePath(repoRoot, manifestPath),
    coveredStandardIds: [
      ...new Set(
        entry.coveredStandardIds ||
          (manifest.standardId ? [manifest.standardId] : [])
      )
    ].sort(),
    selectedOutputGroupId,
    declaredGates,
    gateEvidenceType: "DECLARATIVE_MANIFEST",
    realArtifacts,
    artifactEvidenceType: "DECLARATIVE_MANIFEST",
    checksums,
    checksumDeclarationSource,
    observedSchemas,
    requiredFields,
    unitsEnumerations,
    unitsEnumerationEvidenceType:
      unitsEnumerations.length > 0
        ? "EXPLICIT_MANIFEST"
        : hasUnitEvidence({
              unitsEnumerations,
              observedSchemas,
              realTests: [
                ...realTests,
                ...syntheticTests
              ],
              actualOutputs
            })
          ? "DECLARED_SCHEMA_OR_TEST_METADATA"
          : "NOT_DECLARED",
    adapterPath: normalizePath(
      repoRoot,
      entry.adapterPath || manifest.adapterPath
    ),
    normalizedTargets: normalizeArray(
      entry.normalizedTargets?.length
        ? entry.normalizedTargets
        : manifest.normalizedTargets
    ),
    declaredResolutionStatus:
      entry.resolutionStatus &&
      entry.resolutionStatus !== "NOT_RUN"
        ? "DECLARED"
        : declaredGates.resolutionExecuted
          ? "DECLARED"
          : "NOT_DECLARED",
    actualOutputs,
    actualOutputDeclarationSource,
    formulaMappings,
    formulaMappingEvidenceType:
      "DECLARATIVE_MANIFEST",
    formulaMappingDeclarationSource,
    realTests,
    realTestEvidenceType: "DECLARATIVE_MANIFEST",
    syntheticTests,
    declaredOfflineStatus: normalizeDeclaredOfflineStatus(
      entry.offlineStatus ||
        entry.offline ||
        null,
      declaredGates.offlineRerunPassed
        ? offlineTest ?? realTests[0] ?? null
        : null
    ),
    provenanceRefs: normalizeArray(
      entry.provenanceRefs?.length
        ? entry.provenanceRefs
        : declaredGates.provenanceComplete
          ? [...artifactIds, ...testIds]
          : []
    ),
    provenanceDeclarationSource:
      entry.provenanceRefs?.length
        ? "EXPLICIT_PROVENANCE_REFS"
        : declaredGates.provenanceComplete
          ? "INFERRED_FROM_MANIFEST_ARTIFACT_AND_TEST_REFERENCES"
          : "NONE",
    blocker: remainingBlocker ? structuredClone(remainingBlocker) : null,
    disposition: {
      accessBlocked: Boolean(
        entry.accessBlocked ||
          entry.disposition?.accessBlocked ||
          entry.proofLevel === "ACCESS_BLOCKED"
      ),
      sourceUnsupported: Boolean(
        entry.sourceUnsupported ||
          entry.disposition?.sourceUnsupported ||
          entry.proofLevel === "SOURCE_UNSUPPORTED"
      ),
      syntheticOnly: Boolean(
        syntheticOnlyDisposition
      )
    }
  };
  const unknownStandards = contribution.coveredStandardIds.filter(
    (standardId) => !canonical.standardIds.includes(standardId)
  );
  if (unknownStandards.length) {
    throw new Error(
      `${label} covers Standards not bound to the process: ${unknownStandards.join(", ")}`
    );
  }
  if (
    (contribution.disposition.accessBlocked ||
      contribution.disposition.sourceUnsupported) &&
    !contribution.blocker
  ) {
    throw new Error(`${label} has a terminal disposition without a blocker`);
  }
  validateDeclaredGateEvidence(
    contribution,
    canonical,
    label
  );
  const derivedLevel = deriveProofLevel(
    declaredGates,
    contribution.disposition
  );
  const completeStandardCoverage = canonical.standardIds.every((standardId) =>
    contribution.coveredStandardIds.includes(standardId)
  );
  contribution.declaredProofLevel =
    !completeStandardCoverage &&
    ["END_TO_END_REAL", "SOURCE_TO_STANDARD_REAL"].includes(derivedLevel)
      ? "REAL_SOURCE_PARTIAL"
      : derivedLevel;
  if (
    entry.proofLevel &&
    entry.proofLevel !== contribution.declaredProofLevel
  ) {
    throw new Error(
      `${label} declares ${entry.proofLevel} but its gates derive ${contribution.declaredProofLevel}`
    );
  }
  contribution.completeStandardCoverage = completeStandardCoverage;
  if (
    contribution.declaredProofLevel !==
      "END_TO_END_REAL" &&
    !contribution.blocker
  ) {
    contribution.blocker = {
      code: completeStandardCoverage
        ? "INCOMPLETE_PROOF_MANIFEST"
        : "INCOMPLETE_STANDARD_COVERAGE",
      missingGates: PROOF_GATES.filter(
        (gate) => !declaredGates[gate]
      ),
      detail: completeStandardCoverage
        ? "The adapter manifest does not prove every required gate."
        : "No single contribution covers every canonical Standard bound to this process."
    };
  }
  contribution.declaredBlocker = contribution.blocker
    ? structuredClone(contribution.blocker)
    : null;
  return contribution;
}

function requiredExecutionTestIds(contribution) {
  if (
    !EXECUTION_DEPENDENT_PROOF_LEVELS.has(
      contribution.declaredProofLevel
    )
  ) {
    return [];
  }
  return [
    ...new Set(
      [
        ...contribution.realTests.map(
          (test) => test.testId
        ),
        ...contribution.syntheticTests.map(
          (test) => test.testId
        ),
        contribution.declaredOfflineStatus?.testId,
        ...contribution.formulaMappings.map(
          (mapping) => mapping.testId
        )
      ].filter(Boolean)
    )
  ].sort();
}

function applyExecutionVerification(
  contribution,
  executionVerification
) {
  const requiredTestIds =
    requiredExecutionTestIds(contribution);
  const executionDependent =
    EXECUTION_DEPENDENT_PROOF_LEVELS.has(
      contribution.declaredProofLevel
    );
  const syntheticTestsDeclared =
    contribution.declaredProofLevel !==
      "SYNTHETIC_ONLY" ||
    contribution.syntheticTests.length > 0;
  let status =
    "NOT_APPLICABLE_DECLARATIVE_PROOF_LEVEL";
  let verified = false;
  const testResults = requiredTestIds.map((testId) => {
    const result =
      executionVerification.testResultsById.get(testId);
    return result
      ? {
          testId,
          path: result.path,
          name: result.name,
          status: result.status,
          durationMs: result.durationMs
        }
      : {
          testId,
          path: null,
          name: null,
          status: "NOT_COVERED",
          durationMs: null
        };
  });
  if (executionDependent) {
    if (!syntheticTestsDeclared) {
      status = "NO_REQUIRED_SYNTHETIC_TESTS_DECLARED";
    } else if (requiredTestIds.length === 0) {
      status = "NO_REQUIRED_TESTS_DECLARED";
    } else if (
      executionVerification.status !==
      "CURRENT_LOCAL_CONTENT_BOUND_PASS"
    ) {
      status = executionVerification.status;
    } else if (
      testResults.every(
        (result) => result.status === "PASSED"
      )
    ) {
      status = "EXECUTION_VERIFIED";
      verified = true;
    } else {
      status = "REQUIRED_TESTS_NOT_PASSED";
    }
  }
  contribution.requiredExecutionTestIds =
    requiredTestIds;
  contribution.executionTestResults = testResults;
  contribution.executionVerificationStatus = status;
  contribution.executionVerifiedProofLevel = verified
    ? contribution.declaredProofLevel
    : null;
  contribution.executionVerifiedGates = verified
    ? structuredClone(contribution.declaredGates)
    : normalizeProofGates();
  contribution.gates = structuredClone(
    contribution.executionVerifiedGates
  );
  contribution.proofLevel = executionDependent
    ? contribution.executionVerifiedProofLevel ??
      "DOCUMENTATION_ONLY"
    : contribution.declaredProofLevel;
  const offlineTestResult =
    contribution.declaredOfflineStatus?.testId
      ? testResults.find(
          (result) =>
            result.testId ===
            contribution.declaredOfflineStatus.testId
        )
      : null;
  contribution.offlineStatus =
    contribution.declaredOfflineStatus?.status ===
    "DECLARED"
      ? {
          status:
            verified &&
            offlineTestResult?.status === "PASSED"
              ? "PASSED"
              : "NOT_VERIFIED",
          testId:
            contribution.declaredOfflineStatus.testId,
          networkMode:
            contribution.declaredOfflineStatus.networkMode,
          evidenceType:
            verified &&
            offlineTestResult?.status === "PASSED"
              ? "LOCAL_CONTENT_BOUND_RUN_RECORD"
              : "DECLARATIVE_MANIFEST"
        }
      : {
          status: "NOT_RUN",
          testId: null,
          networkMode: null,
          evidenceType: "NONE"
        };
  contribution.resolutionStatus =
    contribution.declaredResolutionStatus === "DECLARED"
      ? verified
        ? "PASSED"
        : "NOT_VERIFIED"
      : "NOT_RUN";
  contribution.blocker =
    executionDependent && !verified
      ? {
          code: "EXECUTION_RUN_RECORD_REQUIRED",
          executionVerificationStatus: status,
          requiredTestIds,
          detail:
            "The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test."
        }
      : contribution.declaredBlocker
        ? structuredClone(contribution.declaredBlocker)
        : null;
  return contribution;
}

function levelRank(level) {
  return {
    END_TO_END_REAL: 7,
    SOURCE_TO_STANDARD_REAL: 6,
    REAL_SOURCE_PARTIAL: 5,
    SYNTHETIC_ONLY: 4,
    DOCUMENTATION_ONLY: 3,
    ACCESS_BLOCKED: 2,
    SOURCE_UNSUPPORTED: 1
  }[level];
}

function chooseContribution(contributions) {
  return [...contributions].sort(
    (left, right) =>
      levelRank(right.declaredProofLevel) -
        levelRank(left.declaredProofLevel) ||
      left.contributionId.localeCompare(right.contributionId)
  )[0];
}

function unprovedFormulaMappings(canonical) {
  return canonical.outputBindings.map((binding) => ({
    outputName: binding.outputName,
    formulaTerm: binding.formulaTerm,
    unit: binding.unit,
    scope: binding.scope,
    declarationStatus: "UNDECLARED",
    executionStatus: "NOT_VERIFIED",
    status: "UNVERIFIED",
    testId: null
  }));
}

function mergeFormulaMappings(canonical, contribution) {
  const supplied = new Map(
    contribution.formulaMappings.map((mapping) => [
      outputIdentity(mapping),
      mapping
    ])
  );
  const applicableKeys = new Set(
    applicableOutputBindings(
      canonical,
      contribution.selectedOutputGroupId,
      `${canonical.categoryId}/${canonical.processKey}`
    ).map(outputIdentity)
  );
  return canonical.outputBindings.map((binding) => {
    const match = supplied.get(outputIdentity(binding));
    const applicable = applicableKeys.has(outputIdentity(binding));
    return {
      outputName: binding.outputName,
      formulaTerm: binding.formulaTerm,
      unit: binding.unit,
      scope: binding.scope,
      declarationStatus: applicable
        ? match
          ? "DECLARED"
          : "UNDECLARED"
        : "NOT_APPLICABLE",
      executionStatus: applicable
        ? match &&
          contribution.executionVerificationStatus ===
            "EXECUTION_VERIFIED"
          ? "VERIFIED"
          : "NOT_VERIFIED"
        : "NOT_APPLICABLE",
      status: applicable
        ? match &&
          contribution.executionVerificationStatus ===
            "EXECUTION_VERIFIED"
          ? "EXECUTION_VERIFIED"
          : "UNVERIFIED"
        : "NOT_APPLICABLE",
      testId: match?.testId || null,
      resultRef: match?.resultRef || null
    };
  });
}

function bootstrapProcessRecord(canonical, contributions) {
  if (!contributions.length) {
    const gates = normalizeProofGates();
    const blocker = {
      code: "MISSING_PROOF_MANIFEST",
      missingGates: [...PROOF_GATES],
      detail:
        "No source-specific adapter proof manifest covers this canonical process."
    };
    return {
      ...canonical,
      declaredProofLevel: "DOCUMENTATION_ONLY",
      executionVerifiedProofLevel: null,
      executionVerificationStatus:
        "NOT_APPLICABLE_DECLARATIVE_PROOF_LEVEL",
      proofLevel: "DOCUMENTATION_ONLY",
      declaredGates: structuredClone(gates),
      executionVerifiedGates: structuredClone(gates),
      gates,
      gateEvidenceType: "NO_PROOF_MANIFEST",
      selectedContributionId: null,
      selectedOutputGroupId: null,
      realArtifacts: [],
      artifactEvidenceType: "NO_PROOF_MANIFEST",
      checksums: [],
      checksumDeclarationSource: "NONE",
      observedSchemas: [],
      adapterPath: null,
      normalizedTargets: [],
      actualOutputs: [],
      actualOutputDeclarationSource: "NONE",
      formulaMappings: unprovedFormulaMappings(canonical),
      realTests: [],
      realTestEvidenceType: "NO_PROOF_MANIFEST",
      syntheticTests: [],
      declaredOfflineStatus: {
        status: "NOT_DECLARED",
        testId: null,
        networkMode: null
      },
      offlineStatus: { status: "NOT_RUN" },
      declaredResolutionStatus: "NOT_DECLARED",
      resolutionStatus: "NOT_RUN",
      requiredExecutionTestIds: [],
      executionTestResults: [],
      declaredBlocker: structuredClone(blocker),
      blocker,
      contributions: []
    };
  }
  const selected = chooseContribution(contributions);
  return {
    ...canonical,
    declaredProofLevel: selected.declaredProofLevel,
    executionVerifiedProofLevel:
      selected.executionVerifiedProofLevel,
    executionVerificationStatus:
      selected.executionVerificationStatus,
    proofLevel: selected.proofLevel,
    declaredGates: selected.declaredGates,
    executionVerifiedGates:
      selected.executionVerifiedGates,
    gates: selected.gates,
    gateEvidenceType:
      "EXECUTION_VERIFIED_OR_FAIL_CLOSED",
    selectedContributionId: selected.contributionId,
    selectedOutputGroupId: selected.selectedOutputGroupId,
    realArtifacts: selected.realArtifacts,
    artifactEvidenceType:
      selected.artifactEvidenceType,
    checksums: selected.checksums,
    checksumDeclarationSource:
      selected.checksumDeclarationSource,
    observedSchemas: selected.observedSchemas,
    adapterPath: selected.adapterPath,
    normalizedTargets: selected.normalizedTargets,
    actualOutputs: selected.actualOutputs,
    actualOutputDeclarationSource:
      selected.actualOutputDeclarationSource,
    formulaMappings: mergeFormulaMappings(canonical, selected),
    formulaMappingEvidenceType:
      "DECLARATION_SEPARATED_FROM_EXECUTION",
    realTests: selected.realTests,
    realTestEvidenceType:
      selected.realTestEvidenceType,
    syntheticTests: selected.syntheticTests,
    declaredOfflineStatus:
      selected.declaredOfflineStatus,
    offlineStatus: selected.offlineStatus,
    declaredResolutionStatus:
      selected.declaredResolutionStatus,
    resolutionStatus: selected.resolutionStatus,
    requiredExecutionTestIds:
      selected.requiredExecutionTestIds,
    executionTestResults:
      selected.executionTestResults,
    declaredBlocker: selected.declaredBlocker,
    blocker: selected.blocker,
    contributions
  };
}

export async function buildProofLedger({
  repoRoot = DEFAULT_REPO_ROOT,
  adaptersRoot = join(
    repoRoot,
    "scripts/research/operational-savings/adapters"
  ),
  executionRunRecord = undefined,
  executionRunRecordPath = join(
    repoRoot,
    DEFAULT_PROOF_EXECUTION_RUN_RECORD_RELATIVE_PATH
  )
} = {}) {
  const resolvedRoot = resolve(repoRoot);
  const sources = await loadOperationalSavingsSources(resolvedRoot);
  const review = buildOperationalSavingsReview(sources);
  if (review.errors.length) {
    throw new Error(
      `Canonical operational-savings inventory is invalid:\n${review.errors.join("\n")}`
    );
  }
  const canonicalProcesses = canonicalProcessRows(review);
  const canonicalByIdentity = new Map(
    canonicalProcesses.map((process) => [
      processIdentity(process.categoryId, process.processKey),
      process
    ])
  );
  if (canonicalByIdentity.size !== canonicalProcesses.length) {
    throw new Error("Canonical process identities are not unique");
  }
  for (const coverage of CONDITIONAL_OUTPUT_COVERAGE) {
    if (
      !canonicalByIdentity.has(
        processIdentity(coverage.categoryId, coverage.processKey)
      )
    ) {
      throw new Error(
        `Conditional output coverage references unknown canonical process ${coverage.categoryId}/${coverage.processKey}`
      );
    }
  }
  if (canonicalProcesses.length !== 124) {
    throw new Error(
      `Expected 124 canonical processes, found ${canonicalProcesses.length}`
    );
  }

  const manifestFiles = await loadProofManifestFiles(
    resolve(adaptersRoot)
  );
  const declarations = proofTestDeclarations({
    repoRoot: resolvedRoot,
    manifestFiles
  });
  const sourceEvidenceFingerprint =
    await buildProofSourceEvidenceFingerprint({
      repoRoot: resolvedRoot,
      manifestFiles
    });
  const artifactIdentityCatalog =
    proofArtifactIdentityCatalog({
      repoRoot: resolvedRoot,
      manifestFiles
    });
  const loadedExecutionRunRecord =
    executionRunRecord === undefined
      ? executionRunRecordPath
        ? await loadProofExecutionRunRecord(
            resolve(executionRunRecordPath)
          )
        : null
      : executionRunRecord;
  const currentExecutionToolchainIdentity =
    loadedExecutionRunRecord
      ? await buildProofExecutionToolchainIdentity({
          repoRoot: resolvedRoot
        })
      : null;
  const executionVerification =
    verifyProofExecutionRunRecord({
      record: loadedExecutionRunRecord,
      currentFingerprint:
        sourceEvidenceFingerprint,
      declarations,
      currentArtifactIdentityCatalog:
        artifactIdentityCatalog,
      currentExecutionToolchainIdentity
    });
  const contributionsByProcess = new Map();
  for (const { path, content } of manifestFiles) {
    const processEntries =
      content.processes || content.processClaims;
    if (!Array.isArray(processEntries)) {
      continue;
    }
    const adapterId = requireString(
      content.adapterId || content.slug,
      `${path}.adapterId or slug`
    );
    const manifest = {
      adapterId,
      standardId: content.standardId || null,
      adapterPath: content.adapterPath || null,
      artifacts: normalizeArray(content.artifacts),
      observedSchemas: normalizeArray(content.observedSchemas),
      normalizedTargets: normalizeArray(content.normalizedTargets),
      tests: normalizeArray(content.tests)
    };
    for (const [index, entry] of processEntries.entries()) {
      const categoryId = requireString(
        entry.categoryId,
        `${path}.processes[${index}].categoryId`
      );
      const processKey = requireString(
        entry.processKey,
        `${path}.processes[${index}].processKey`
      );
      const identity = processIdentity(categoryId, processKey);
      const canonical = canonicalByIdentity.get(identity);
      if (!canonical) {
        throw new Error(
          `${path} references unknown canonical process ${categoryId}/${processKey}`
        );
      }
      const contribution = applyExecutionVerification(
        normalizeContribution({
          entry,
          manifest,
          manifestPath: path,
          repoRoot: resolvedRoot,
          canonical,
          index
        }),
        executionVerification
      );
      const current = contributionsByProcess.get(identity) || [];
      if (
        current.some(
          (candidate) =>
            candidate.contributionId === contribution.contributionId
        )
      ) {
        throw new Error(
          `Duplicate proof contribution ${contribution.contributionId}`
        );
      }
      current.push(contribution);
      contributionsByProcess.set(identity, current);
    }
  }

  const processes = canonicalProcesses
    .map((canonical) =>
      bootstrapProcessRecord(
        canonical,
        contributionsByProcess.get(
          processIdentity(canonical.categoryId, canonical.processKey)
        ) || []
      )
    )
    .sort(
      (left, right) =>
        left.categoryId.localeCompare(right.categoryId, undefined, {
          numeric: true
        }) || left.processKey.localeCompare(right.processKey)
    );
  const counts = Object.fromEntries(PROOF_LEVELS.map((level) => [level, 0]));
  for (const process of processes) counts[process.proofLevel] += 1;
  const declaredCounts = Object.fromEntries(
    PROOF_LEVELS.map((level) => [level, 0])
  );
  for (const process of processes) {
    declaredCounts[process.declaredProofLevel] += 1;
  }
  const canonicalBindingFingerprint = stableHash(
    processes.map((process) => ({
      categoryId: process.categoryId,
      processKey: process.processKey,
      standardIds: process.standardIds,
      requiredInputs: process.requiredInputs,
      outputBindings: process.outputBindings,
      outputCoverage: process.outputCoverage
    }))
  );
  const ledger = {
    schemaVersion: "operational-savings/proof-ledger-v2",
    generatedFrom: {
      canonicalBindingRegistry:
        "docs/operational-savings-information-card-bindings.json",
      adapterProofPattern:
        "scripts/research/operational-savings/adapters/*/{proof,process-proof}.json",
      conditionalOutputCoverageContract:
        "scripts/research/operational-savings/proof-ledger.mjs#CONDITIONAL_OUTPUT_COVERAGE",
      canonicalBindingFingerprint,
      sourceEvidenceFingerprint: {
        schemaVersion:
          sourceEvidenceFingerprint.schemaVersion,
        algorithm: sourceEvidenceFingerprint.algorithm,
        digest: sourceEvidenceFingerprint.digest,
        fileCount: sourceEvidenceFingerprint.fileCount,
        testCatalogFingerprint:
          sourceEvidenceFingerprint.testCatalogFingerprint
      },
      artifactIdentityCatalog: {
        schemaVersion:
          artifactIdentityCatalog.schemaVersion,
        digest: artifactIdentityCatalog.digest,
        artifactCount:
          artifactIdentityCatalog.artifactCount
      }
    },
    proofGates: [...PROOF_GATES],
    proofLevelDefinitions: PROOF_LEVEL_DEFINITIONS,
    outputCoverageModeDefinitions: OUTPUT_COVERAGE_MODE_DEFINITIONS,
    inventory: {
      standards: review.standards.length,
      categories: review.categoryReviews.length,
      processes: processes.length,
      manifestFiles: manifestFiles.length
    },
    counts,
    declaredCounts,
    executionVerification: {
      status: executionVerification.status,
      recordPath: loadedExecutionRunRecord
        ? normalizePath(
            resolvedRoot,
            executionRunRecordPath
          )
        : null,
      recordType: executionVerification.recordType,
      runId: executionVerification.runId,
      trustLevel: executionVerification.trustLevel,
      runnerIdentityAuthenticated: false,
      recordContentSha256:
        loadedExecutionRunRecord?.recordContentSha256 ??
        null,
      repositoryState:
        loadedExecutionRunRecord?.repositoryState ??
        null,
      vitest:
        loadedExecutionRunRecord?.execution?.runner ??
        null,
      networkEnforcement:
        loadedExecutionRunRecord?.execution
          ?.networkEnforcement ?? null,
      artifactIdentityCatalog: loadedExecutionRunRecord
        ? {
            digest:
              loadedExecutionRunRecord
                .artifactIdentityCatalog.digest,
            artifactCount:
              loadedExecutionRunRecord
                .artifactIdentityCatalog.artifactCount
          }
        : null,
      executionToolchainIdentity:
        loadedExecutionRunRecord
          ?.executionToolchainIdentity
          ? {
              schemaVersion:
                loadedExecutionRunRecord
                  .executionToolchainIdentity
                  .schemaVersion,
              digest:
                loadedExecutionRunRecord
                  .executionToolchainIdentity.digest,
              toolCount:
                loadedExecutionRunRecord
                  .executionToolchainIdentity.tools.length,
              installedDependencyFileCount:
                loadedExecutionRunRecord
                  .executionToolchainIdentity
                  .installedDependencies.fileCount
            }
          : null,
      forgeryResistance: loadedExecutionRunRecord
        ? "NONE_REPOSITORY_WRITER_CAN_FABRICATE_A_SELF_CONSISTENT_RECORD"
        : null,
      limitation:
        "A local content-bound pass detects stale content and accidental corruption under an honest-local-operator assumption. It is unsigned, does not authenticate who or what ran the tests, and can be fabricated by a repository writer."
    },
    manifestFiles: manifestFiles.map(({ path }) =>
      normalizePath(resolvedRoot, path)
    ),
    processes
  };
  validateProofLedger(ledger);
  return ledger;
}

export function validateProofLedger(ledger) {
  const errors = [];
  if (ledger.schemaVersion !== "operational-savings/proof-ledger-v2") {
    errors.push("Proof ledger has the wrong schemaVersion");
  }
  if (
    JSON.stringify(ledger.outputCoverageModeDefinitions) !==
    JSON.stringify(OUTPUT_COVERAGE_MODE_DEFINITIONS)
  ) {
    errors.push("Proof ledger has invalid output coverage mode definitions");
  }
  if (!Array.isArray(ledger.processes) || ledger.processes.length !== 124) {
    errors.push(
      `Proof ledger must contain exactly 124 processes, found ${ledger.processes?.length ?? 0}`
    );
  }
  const identities = new Set();
  for (const process of ledger.processes || []) {
    const identity = processIdentity(process.categoryId, process.processKey);
    if (identities.has(identity)) {
      errors.push(
        `Proof ledger duplicates ${process.categoryId}/${process.processKey}`
      );
    }
    identities.add(identity);
    if (!PROOF_LEVELS.includes(process.proofLevel)) {
      errors.push(
        `${process.categoryId}/${process.processKey} has invalid proof level ${process.proofLevel}`
      );
    }
    if (
      !PROOF_LEVELS.includes(process.declaredProofLevel)
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} has invalid declared proof level ${process.declaredProofLevel}`
      );
    }
    if (
      process.executionVerifiedProofLevel !== null &&
      !PROOF_LEVELS.includes(
        process.executionVerifiedProofLevel
      )
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} has invalid execution-verified proof level ${process.executionVerifiedProofLevel}`
      );
    }
    for (const field of [
      "gates",
      "declaredGates",
      "executionVerifiedGates"
    ]) {
      const gateKeys = Object.keys(
        process[field] || {}
      ).sort();
      if (
        JSON.stringify(gateKeys) !==
        JSON.stringify([...PROOF_GATES].sort())
      ) {
        errors.push(
          `${process.categoryId}/${process.processKey} does not contain exactly 15 ${field}`
        );
      }
    }
    if (
      ![
        "DECLARATIVE_MANIFEST",
        "NO_PROOF_MANIFEST"
      ].includes(process.artifactEvidenceType) ||
      ![
        "EXPLICIT_CHECKSUM_DECLARATIONS",
        "DERIVED_FROM_MANIFEST_ARTIFACT_IDENTITIES",
        "NONE"
      ].includes(process.checksumDeclarationSource) ||
      ![
        "EXPLICIT_ACTUAL_OUTPUT_DECLARATIONS",
        "LEGACY_ACTUAL_OUTPUT_DECLARATION",
        "NONE"
      ].includes(process.actualOutputDeclarationSource) ||
      ![
        "DECLARATIVE_MANIFEST",
        "NO_PROOF_MANIFEST"
      ].includes(process.realTestEvidenceType)
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} omits a valid static evidence declaration label`
      );
    }
    if (
      process.executionVerificationStatus ===
        "EXECUTION_VERIFIED" &&
      (process.executionVerifiedProofLevel !==
        process.declaredProofLevel ||
        process.proofLevel !==
          process.declaredProofLevel)
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} has inconsistent execution-verified proof`
      );
    }
    if (
      EXECUTION_DEPENDENT_PROOF_LEVELS.has(
        process.declaredProofLevel
      ) &&
      process.executionVerificationStatus !==
        "EXECUTION_VERIFIED" &&
      (process.executionVerifiedProofLevel !== null ||
        process.proofLevel !== "DOCUMENTATION_ONLY")
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} does not fail closed without current execution verification`
      );
    }
    for (const field of [
      "realArtifacts",
      "checksums",
      "observedSchemas",
      "normalizedTargets",
      "actualOutputs",
      "formulaMappings",
      "realTests",
      "syntheticTests"
    ]) {
      if (!Array.isArray(process[field])) {
        errors.push(
          `${process.categoryId}/${process.processKey} has invalid ${field}`
        );
      }
    }
    if (
      !Array.isArray(process.requiredExecutionTestIds) ||
      !Array.isArray(process.executionTestResults)
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} has invalid execution test binding`
      );
    } else {
      const requiredTestIds = new Set(
        process.requiredExecutionTestIds
      );
      const declaredExecutionTests = [
        ...(process.realTests || []),
        ...(process.syntheticTests || [])
      ];
      for (const test of declaredExecutionTests) {
        if (
          !test ||
          typeof test.testId !== "string" ||
          !test.testId ||
          typeof test.path !== "string" ||
          !test.path ||
          typeof test.name !== "string" ||
          !test.name
        ) {
          errors.push(
            `${process.categoryId}/${process.processKey} has an execution test without an exact ID, path, and full name`
          );
          continue;
        }
        if (
          EXECUTION_DEPENDENT_PROOF_LEVELS.has(
            process.declaredProofLevel
          ) &&
          !requiredTestIds.has(test.testId)
        ) {
          errors.push(
            `${process.categoryId}/${process.processKey} does not bind declared test ${test.testId} to execution verification`
          );
        }
      }
      if (
        process.declaredProofLevel ===
          "SYNTHETIC_ONLY" &&
        process.syntheticTests.length === 0 &&
        process.executionVerificationStatus ===
          "EXECUTION_VERIFIED"
      ) {
        errors.push(
          `${process.categoryId}/${process.processKey} verifies SYNTHETIC_ONLY without a declared exact synthetic test`
        );
      }
    }
    if (!("adapterPath" in process)) {
      errors.push(
        `${process.categoryId}/${process.processKey} omits adapterPath`
      );
    }
    if (!process.offlineStatus || typeof process.offlineStatus !== "object") {
      errors.push(
        `${process.categoryId}/${process.processKey} omits offlineStatus`
      );
    } else if (
      !["PASSED", "NOT_VERIFIED", "NOT_RUN"].includes(
        process.offlineStatus.status
      ) ||
      (process.offlineStatus.status === "PASSED" &&
        process.executionVerificationStatus !==
          "EXECUTION_VERIFIED")
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} has an invalid execution offline status`
      );
    }
    if (
      !process.declaredOfflineStatus ||
      !["DECLARED", "NOT_DECLARED"].includes(
        process.declaredOfflineStatus.status
      )
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} omits a valid declared offline status`
      );
    }
    if (
      !["DECLARED", "NOT_DECLARED"].includes(
        process.declaredResolutionStatus
      ) ||
      !["PASSED", "NOT_VERIFIED", "NOT_RUN"].includes(
        process.resolutionStatus
      ) ||
      (process.resolutionStatus === "PASSED" &&
        process.executionVerificationStatus !==
          "EXECUTION_VERIFIED")
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} has invalid resolution declaration or execution status`
      );
    }
    if (!("blocker" in process)) {
      errors.push(
        `${process.categoryId}/${process.processKey} omits blocker`
      );
    }
    if (!("selectedOutputGroupId" in process)) {
      errors.push(
        `${process.categoryId}/${process.processKey} omits selectedOutputGroupId`
      );
    }
    let applicableOutputKeys = null;
    if (Array.isArray(process.outputBindings)) {
      try {
        applicableOutputKeys = new Set(
          applicableOutputBindings(
            process,
            process.selectedOutputGroupId,
            `${process.categoryId}/${process.processKey}`
          ).map(outputIdentity)
        );
      } catch (error) {
        errors.push(error.message);
      }
    }
    const canonicalOutputs = new Set(
      (process.outputBindings || []).map(outputIdentity)
    );
    const mappedOutputs = new Set(
      (process.formulaMappings || []).map(outputIdentity)
    );
    if (
      canonicalOutputs.size !== mappedOutputs.size ||
      [...canonicalOutputs].some((output) => !mappedOutputs.has(output))
    ) {
      errors.push(
        `${process.categoryId}/${process.processKey} formula mappings differ from canonical output bindings`
      );
    }
    for (const mapping of process.formulaMappings || []) {
      if (
        ![
          "EXECUTION_VERIFIED",
          "UNVERIFIED",
          "NOT_APPLICABLE"
        ].includes(mapping.status)
      ) {
        errors.push(
          `${process.categoryId}/${process.processKey} has invalid formula mapping status ${mapping.status}`
        );
        continue;
      }
      if (
        !["DECLARED", "UNDECLARED", "NOT_APPLICABLE"].includes(
          mapping.declarationStatus
        ) ||
        !["VERIFIED", "NOT_VERIFIED", "NOT_APPLICABLE"].includes(
          mapping.executionStatus
        )
      ) {
        errors.push(
          `${process.categoryId}/${process.processKey} has invalid formula mapping declaration or execution status`
        );
      }
      if (
        mapping.executionStatus === "VERIFIED" &&
        process.executionVerificationStatus !==
          "EXECUTION_VERIFIED"
      ) {
        errors.push(
          `${process.categoryId}/${process.processKey} marks a formula mapping verified without execution verification`
        );
      }
      if (applicableOutputKeys) {
        const applicable = applicableOutputKeys.has(outputIdentity(mapping));
        if (applicable && mapping.status === "NOT_APPLICABLE") {
          errors.push(
            `${process.categoryId}/${process.processKey} marks an applicable output NOT_APPLICABLE`
          );
        }
        if (!applicable && mapping.status !== "NOT_APPLICABLE") {
          errors.push(
            `${process.categoryId}/${process.processKey} does not mark an unselected output NOT_APPLICABLE`
          );
        }
      }
    }
  }
  const counted = Object.fromEntries(PROOF_LEVELS.map((level) => [level, 0]));
  for (const process of ledger.processes || []) {
    if (PROOF_LEVELS.includes(process.proofLevel)) {
      counted[process.proofLevel] += 1;
    }
  }
  if (JSON.stringify(counted) !== JSON.stringify(ledger.counts)) {
    errors.push("Proof ledger counts do not match its process records");
  }
  const declaredCounted = Object.fromEntries(
    PROOF_LEVELS.map((level) => [level, 0])
  );
  for (const process of ledger.processes || []) {
    if (PROOF_LEVELS.includes(process.declaredProofLevel)) {
      declaredCounted[process.declaredProofLevel] += 1;
    }
  }
  if (
    JSON.stringify(declaredCounted) !==
    JSON.stringify(ledger.declaredCounts)
  ) {
    errors.push(
      "Proof ledger declared counts do not match its process records"
    );
  }
  if (
    !ledger.executionVerification ||
    typeof ledger.executionVerification.status !==
      "string" ||
    ledger.executionVerification
      .runnerIdentityAuthenticated !== false
  ) {
    errors.push(
      "Proof ledger omits the execution verification trust boundary"
    );
  }
  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
  return ledger;
}

export async function writeProofLedger({
  repoRoot = DEFAULT_REPO_ROOT,
  adaptersRoot = join(
    repoRoot,
    "scripts/research/operational-savings/adapters"
  ),
  outputPath = join(
    repoRoot,
    "docs/operational-savings-automation-research/proof-ledger.v2.json"
  )
} = {}) {
  const ledger = await buildProofLedger({ repoRoot, adaptersRoot });
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(ledger, null, 2)}\n`);
  return ledger;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--help")) {
    process.stdout.write(
      [
        "Operational-savings proof ledger and execution record",
        "",
        "Build and print the current fail-closed ledger:",
        "  node scripts/research/operational-savings/proof-ledger.mjs",
        "",
        "Regenerate the committed ledger:",
        "  node scripts/research/operational-savings/proof-ledger.mjs --write",
        "",
        "Generate a local content-bound run record through the only supported orchestrated path:",
        "  npm run operational-savings:proof:attest",
        "",
        "The attestation command executes the fixed complete real suite from a private detached snapshot of committed source, verifies the original and snapshot fingerprints plus bound toolchain before and after execution, and only then writes an unsigned, unauthenticated local record."
      ].join("\n") + "\n"
    );
  } else {
    const ledger = process.argv.includes("--write")
      ? await writeProofLedger({
          repoRoot: DEFAULT_REPO_ROOT,
          adaptersRoot: DEFAULT_ADAPTERS_ROOT,
          outputPath: DEFAULT_OUTPUT_PATH
        })
      : await buildProofLedger({
          repoRoot: DEFAULT_REPO_ROOT,
          adaptersRoot: DEFAULT_ADAPTERS_ROOT
        });
    if (!process.argv.includes("--write")) {
      process.stdout.write(
        `${JSON.stringify(ledger, null, 2)}\n`
      );
    } else {
      process.stdout.write(
        `${JSON.stringify(
          {
            outputPath: normalizePath(
              DEFAULT_REPO_ROOT,
              DEFAULT_OUTPUT_PATH
            ),
            counts: ledger.counts,
            declaredCounts: ledger.declaredCounts,
            executionVerification:
              ledger.executionVerification
          },
          null,
          2
        )}\n`
      );
    }
  }
}
