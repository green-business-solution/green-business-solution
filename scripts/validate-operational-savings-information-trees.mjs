import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOperationalSavingsReview,
  checkReviewArtifacts,
  loadOperationalSavingsSources
} from "./generate-operational-savings-review-pages.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const sources = await loadOperationalSavingsSources(ROOT);
const review = buildOperationalSavingsReview(sources);
const errors = [...review.errors];
const sourceUrls = [...new Set(sources.standardDocument.match(/https:\/\/[^)\s]+/g) || [])];

errors.push(...await checkReviewArtifacts(ROOT, review.artifacts));
await validateGeneratedPages(review, errors);
validateCanonicalIndex(review, sources.treeDocument, errors);
validateComStockAllowlist(review, errors);
validateNarrativeTotals(review, sources, sourceUrls, errors);

const report = {
  categories: review.report.categories,
  categoryPages: review.report.categoryPages,
  taxonomyRetrofits: review.report.taxonomyRetrofits,
  mappedRetrofits: review.report.mappedRetrofits,
  missingMappings: countErrors(errors, /^missing retrofit mapping:/),
  duplicateMappings: countErrors(errors, /^duplicate retrofit mapping:/),
  sharedBranches: review.report.sharedBranchesExpanded,
  standards: review.report.standardsEmbedded,
  visibleStandardProcesses: review.report.visibleStandardProcesses,
  sourceLinksRendered: review.report.sourceLinksRendered,
  informationCardSchemaVersion: sources.informationCardSchema.$id,
  standardsWithAutomation: review.standards.filter((standard) => hasCompleteAutomation(standard)).length,
  sourceUrls: sourceUrls.length,
  maxAtomicUserInputs: review.report.maxAtomicUserInputs,
  requiredUserInputs: review.report.requiredUserInputs,
  conditionalCalculationGates: review.report.conditionalCalculationGates,
  optionalKnownDetails: review.report.optionalKnownDetails,
  maxRequiredUserInputs: review.report.maxRequiredUserInputs,
  categoriesOverFourUserInputs: review.report.categoriesOverFourUserInputs,
  categoriesWithFiveUserInputs: review.report.categoriesWithFiveUserInputs,
  categoryStatuses: review.report.categoryStatuses,
  standardStatuses: review.report.standardStatuses,
  sourceEvidenceRecords: sources.evidenceManifest.evidence_records.length,
  sourceEvidenceStatuses: countBy(sources.evidenceManifest.evidence_records, "evidence_status"),
  atomicFormulaTerms: sources.categoryContracts.categories.reduce(
    (total, category) => total + category.formula_terms.length,
    0
  ),
  categoryManualVerdicts: sources.categoryContracts.categories.filter(
    (category) => String(category.manual_review_verdict || "").trim()
  ).length,
  standardManualVerdicts: sources.evidenceManifest.standards.filter(
    (standard) => String(standard.manual_review_verdict || "").trim()
  ).length,
  readyGoldenFixtures: sources.goldenFixtures.size
};

if (errors.length > 0) {
  console.error(JSON.stringify(report, null, 2));
  console.error("\nValidation failed:");
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(report, null, 2));
  console.log("Operational-savings information-tree and generated-review validation passed.");
}

async function validateGeneratedPages(result, validationErrors) {
  const requiredComponents = [
    "**Retrofits included:**",
    "**Overview:**",
    "**Broader Formula**",
    "**Expanded Formula**",
    "**Information Tree**"
  ];
  const bannedVisibleContent = [
    "GENERATED REVIEW VIEW",
    "Human Review Snapshot",
    "Review Status",
    "Scenario Readiness",
    "Formula-Term Evidence",
    "Source-Role Evidence",
    "Default-Path Proof",
    "Input Workflow",
    "Required Screening Inputs",
    "Conditional Calculation Gates",
    "Optional Known Details",
    "Profile Inputs",
    "Bill Inputs",
    "Human Review Decisions",
    "Accuracy or Uncertainty",
    "Current Readiness",
    "Implementation Status"
  ];
  const requiredProcessFields = [
    "Purpose",
    "Source",
    "Lookup Inputs",
    "Value Needed",
    "How to Use",
    "Automation",
    "Validation"
  ];
  for (const category of result.categoryReviews) {
    const relativePath = `docs/operational-savings-review/categories/${category.id}.md`;
    const page = await readFile(join(ROOT, relativePath), "utf8").catch(() => null);
    if (page === null) continue;
    const heading = `# Information Card — ${category.informationCard.title}`;
    if (!page.startsWith(`${heading}\n\n`)) {
      validationErrors.push(`${category.id} Information Card has an incorrect or extra opening`);
    }
    if ((page.match(/^# /gm) || []).length !== 1 || /^##+ /m.test(page)) {
      validationErrors.push(`${category.id} Information Card contains an extra visible heading`);
    }
    let previous = -1;
    for (const component of requiredComponents) {
      const index = page.indexOf(component);
      if (index < 0) validationErrors.push(`${category.id} Information Card is missing ${component}`);
      if (index >= 0 && index <= previous) {
        validationErrors.push(`${category.id} Information Card has ${component} out of order`);
      }
      if (index >= 0) previous = index;
    }
    for (const banned of bannedVisibleContent) {
      if (page.includes(banned)) {
        validationErrors.push(`${category.id} Information Card contains banned visible content ${banned}`);
      }
    }
    if ((page.match(/```text\n/g) || []).length !== 3 || (page.match(/```/g) || []).length !== 6) {
      validationErrors.push(`${category.id} Information Card must contain exactly three text blocks`);
    }
    if (/^---$/m.test(page) || /<details\b/i.test(page)) {
      validationErrors.push(`${category.id} Information Card contains a disconnected visual or details block`);
    }
    if (
      /(?:\bSTD-[A-Z0-9-]+\b|\bBR-[A-Z0-9-]+\b|\bE-[A-Z][A-Z0-9-]+\b|\{\{|utilityExtractedValues|site\.[A-Za-z]|business\.[A-Za-z]|\/(?:fields|tables|values|methods)\/\d+)/.test(
        removeUrls(page)
      )
    ) {
      validationErrors.push(`${category.id} Information Card exposes internal technical identifiers`);
    }
    const tree = extractLabeledTextBlock(page, "**Information Tree**");
    if (!tree) {
      validationErrors.push(`${category.id} Information Card has no readable Information Tree`);
      continue;
    }
    validateInformationCardTree(category, tree, validationErrors);
    for (const source of ["Profile", "Bill"]) {
      const actualLeaves = [...tree.matchAll(new RegExp(`^.*\\(${source}\\)$`, "gm"))]
        .map((match) => stripTreePrefix(match[0]))
        .sort();
      const expectedLeaves = collectPresentationSourceLeaves(
        category.informationCard.tree,
        source
      ).sort();
      if (JSON.stringify(actualLeaves) !== JSON.stringify(expectedLeaves)) {
        validationErrors.push(
          `${category.id} Information Card ${source} leaves do not match the production-backed presentation projection`
        );
      }
    }

    const treeProcesses = [...tree.matchAll(/Standard ([1-9]\d*\.[1-9]\d*) — ([^\n]+)/g)]
      .map((match) => ({ number: match[1], name: match[2].trim() }));
    const sectionProcesses = [...page.matchAll(/^\*\*■ Standard ([1-9]\d*\.[1-9]\d*) — ([^*\n]+)\*\*$/gm)]
      .map((match) => ({ number: match[1], name: match[2].trim(), index: match.index }));
    const uniqueTreeProcesses = uniqueProcesses(treeProcesses);
    if (JSON.stringify(uniqueTreeProcesses) !== JSON.stringify(sectionProcesses.map(({ number, name }) => ({ number, name })))) {
      validationErrors.push(
        `${category.id} Information Card tree references and Standard sections do not match in first-use order`
      );
    }
    if (
      new Set(sectionProcesses.map((process) => process.number)).size !== sectionProcesses.length ||
      new Set(sectionProcesses.map((process) => process.name.toLowerCase())).size !== sectionProcesses.length
    ) {
      validationErrors.push(`${category.id} Information Card has duplicate Standard numbers or names`);
    }
    for (const [index, process] of sectionProcesses.entries()) {
      const end = sectionProcesses[index + 1]?.index ?? page.length;
      const section = page.slice(process.index, end);
      let fieldPrevious = -1;
      for (const field of requiredProcessFields) {
        const fieldIndex = section.indexOf(`**${field}:**`);
        if (fieldIndex < 0) {
          validationErrors.push(
            `${category.id} Standard ${process.number} is missing ${field}`
          );
        }
        if (fieldIndex >= 0 && fieldIndex <= fieldPrevious) {
          validationErrors.push(
            `${category.id} Standard ${process.number} has ${field} out of order`
          );
        }
        if (fieldIndex >= 0) fieldPrevious = fieldIndex;
      }
      if (!/\*\*Source:\*\*[\s\S]*\[[^\]]+\]\(https:\/\/[^)]+\)/.test(section)) {
        validationErrors.push(
          `${category.id} Standard ${process.number} lacks a visible direct source URL`
        );
      }
      for (const field of ["Selected Strategy", "Automation Method", "Difficulty"]) {
        if (!section.includes(`**${field}:**`)) {
          validationErrors.push(
            `${category.id} Standard ${process.number} is missing Automation ${field}`
          );
        }
      }
      if (!/^\d+\. .+$/m.test(between(section, "**How to Use:**", "**Automation:**"))) {
        validationErrors.push(
          `${category.id} Standard ${process.number} has no numbered How to Use steps`
        );
      }
      const validation = section.slice(section.indexOf("**Validation:**") + "**Validation:**".length).trim();
      if (
        !validation ||
        /^(?:This should work|This will need to be validated|The source seems appropriate|Implementation may be possible)\.?$/i.test(
          validation
        )
      ) {
        validationErrors.push(
          `${category.id} Standard ${process.number} has generic or empty Validation`
        );
      }
    }
  }

  const index = await readFile(join(ROOT, "docs/operational-savings-review/README.md"), "utf8").catch(() => null);
  if (index === null) return;
  if (!index.startsWith("# Operational Savings Information Cards\n\n")) {
    validationErrors.push("review index has an incorrect heading or extra opening");
  }
  if (/^\|/m.test(index) || /\b(?:Ready|Draft|Blocked|count|status|evidence)\b/i.test(index)) {
    validationErrors.push("review index contains a table, status, count, or evidence summary");
  }
  const indexRows = [...index.matchAll(/^- \[(ITC-\d{2}) - ([^\]]+)\]\(\.\/categories\/(ITC-\d{2})\.md\)$/gm)];
  if (indexRows.length !== result.categoryReviews.length) {
    validationErrors.push(
      `review index has ${indexRows.length} Information Card links; expected ${result.categoryReviews.length}`
    );
  }
  for (const category of result.categoryReviews) {
    const row = indexRows.find((candidate) => candidate[1] === category.id);
    if (
      !row ||
      row[3] !== category.id ||
      row[2] !== category.informationCard.title
    ) {
      validationErrors.push(`review index has an incorrect or missing link for ${category.id}`);
    }
  }
}

function validateInformationCardTree(category, tree, validationErrors) {
  const lines = tree.split("\n").filter(Boolean);
  const nodes = [];
  const stack = [];
  for (const line of lines) {
    const depth = treeDepth(line);
    const text = stripTreePrefix(line);
    while (stack.length > 0 && stack.at(-1).depth >= depth) stack.pop();
    const parent = stack.at(-1)?.node || null;
    const node = { depth, text, parent, children: [] };
    if (parent) parent.children.push(node);
    nodes.push(node);
    stack.push({ depth, node });
  }
  const root = nodes[0];
  if (!root) return;
  for (const node of nodes.slice(1)) {
    if (node.children.length === 0) {
      const isProcess = /^Standard [1-9]\d*\.[1-9]\d* — .+/.test(node.text);
      const hasSource = [
        "(User)",
        "(Profile)",
        "(Bill)",
        "(Linked Opportunity)",
        "(Derived)"
      ].some((label) => node.text.endsWith(label));
      if (!isProcess && !hasSource) {
        validationErrors.push(
          `${category.id} Information Card terminal leaf lacks a permitted source label: ${JSON.stringify(node.text)}`
        );
      }
    }
    if (
      node.text.endsWith("(User)") &&
      /(?:database|record ID|API field|JSON|schema key|comb08|combE|FuelEconomy\.gov ID|utilityExtractedValues|[a-z]+_[a-z0-9_]+)/i.test(
        node.text
      )
    ) {
      validationErrors.push(
        `${category.id} Information Card exposes a technical identifier as a User input`
      );
    }
    if (
      node.text.endsWith("(Linked Opportunity)") &&
      /(?:watts|efficiency|power|capacity|rating|flow|consumption)/i.test(node.text) &&
      !isDocumentedDirectProjectField(node.text) &&
      !hasInterpretingProcessInAncestry(node)
    ) {
      validationErrors.push(
        `${category.id} Linked Opportunity jumps directly to an engineering value without a Standard process`
      );
    }
    if (
      node.text.replace(/\s+/g, " ").trim().toLowerCase() ===
      root.text.replace(/\s+/g, " ").trim().toLowerCase()
    ) {
      validationErrors.push(`${category.id} Information Card tree repeats its root output`);
    }
  }
  if (/\bRetrofit selected\b/i.test(tree)) {
    validationErrors.push(`${category.id} Information Card contains a generic Retrofit selected branch`);
  }
  if (/\b(?:unknown or different|another pattern)\b/i.test(tree)) {
    validationErrors.push(`${category.id} Information Card contains a generic unsupported routing branch`);
  }
  if (
    /Standard [1-9]\d*\.[1-9]\d* — [^\n]*(?:Bill-Derived|Avoidable) [^\n]*Rate/i.test(
      tree
    )
  ) {
    validationErrors.push(
      `${category.id} Information Card renders a simple Bill-derived rate as a Standard`
    );
  }
  if (category.id === "ITC-29") {
    for (const required of [
      "Existing Vehicle Make and Model (User)",
      "Approximate Model Year (User)",
      "Proposed Vehicle Make and Model (Linked Opportunity)"
    ]) {
      if (!tree.includes(required)) {
        validationErrors.push(`ITC-29 Information Card is missing ${required}`);
      }
    }
    if (/\b(?:comb08|combE|FuelEconomy\.gov ID)\b/.test(tree)) {
      validationErrors.push("ITC-29 Information Card exposes an internal vehicle field");
    }
  }
  if (category.id === "ITC-02") {
    for (const required of [
      "Linked Opportunity names an exact replacement product",
      "Linked Opportunity specifies requirements but no exact product",
      "Existing Nameplate, Photometric Report, or Field Measurement (User)",
      "No Existing Wattage Value Without Documentation or Measurement (Derived)",
      "Standard 1.1 — Exact New Fixture Wattage Lookup",
      "Standard 1.2 — Requirement-Based New Fixture Wattage Resolution",
      "Bill-Derived Electricity Rate"
    ]) {
      if (!tree.includes(required)) {
        validationErrors.push(`ITC-02 Information Card is missing ${required}`);
      }
    }
  }
}

function isDocumentedDirectProjectField(text) {
  return (
    /^Documented\b/i.test(text) &&
    /\b(?:nameplate|measurement|submeter|controls?|audit|operating records?|contractor specification)\b/i.test(
      text
    )
  );
}

function hasInterpretingProcessInAncestry(node) {
  const ancestors = [];
  for (let parent = node.parent; parent; parent = parent.parent) ancestors.push(parent);
  const explicitOpportunityBranch = ancestors.find((ancestor) =>
    /^Linked Opportunity\b/i.test(ancestor.text)
  );
  const candidates = explicitOpportunityBranch ? [explicitOpportunityBranch] : ancestors;
  return candidates.some((ancestor) =>
    ancestor.children.some((sibling) => /^Standard /.test(sibling.text))
  );
}

function extractLabeledTextBlock(page, label) {
  const start = page.indexOf(`${label}\n\n\`\`\`text\n`);
  if (start < 0) return null;
  const contentStart = start + `${label}\n\n\`\`\`text\n`.length;
  const end = page.indexOf("\n```", contentStart);
  return end < 0 ? null : page.slice(contentStart, end);
}

function uniqueProcesses(processes) {
  const seen = new Set();
  return processes.filter((process) => {
    const key = `${process.number}\u0000${process.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function removeUrls(value) {
  return value
    .replace(/\[[^\]]+\]\(https:\/\/[^)]+\)/g, "")
    .replace(/https:\/\/\S+/g, "");
}

function collectPresentationSourceLeaves(root, source, values = []) {
  if (!root.processKey && root.children.length === 0 && root.text.endsWith(`(${source})`)) {
    values.push(root.text);
  }
  for (const child of root.children || []) {
    collectPresentationSourceLeaves(child, source, values);
  }
  return values;
}

function validateCanonicalIndex(result, treeDocument, validationErrors) {
  const rows = [...treeDocument.matchAll(/^\| `(ITC-\d{2})` \| \[([^\]]+)\]\(operational-savings-review\/categories\/(ITC-\d{2})\.md\) \| ([^|]+) \| (\d+) \|$/gm)].map((match) => ({
    id: match[1],
    title: match[2].trim(),
    linkId: match[3],
    status: match[4].trim(),
    retrofitCount: Number(match[5])
  }));
  if (rows.length !== result.categories.length) {
    validationErrors.push(`Category Index has ${rows.length} linked rows; expected ${result.categories.length}`);
    return;
  }
  for (const category of result.categories) {
    const row = rows.find((candidate) => candidate.id === category.id);
    if (!row || row.linkId !== category.id || row.title !== category.title || row.status !== category.status || row.retrofitCount !== category.retrofits.length) {
      validationErrors.push(`${category.id} Category Index metadata or Full review link does not match its category section`);
    }
  }
}

function validateComStockAllowlist(result, validationErrors) {
  const standard = result.standards.find((item) => item.id === "STD-COMSTOCK-ANNUAL-DELTA");
  const category = result.categories.find((item) => item.id === "ITC-01");
  if (!standard || !category) return;
  const block = between(standard.body, "The reviewed taxonomy-to-measure allowlist is:", "**Automation:**");
  const rows = [...block.matchAll(/^\| `([^`]+)` \| (.+) \|$/gm)];
  if (JSON.stringify(rows.map((row) => row[1])) !== JSON.stringify(category.retrofits.map((retrofit) => retrofit.id))) {
    validationErrors.push("STD-COMSTOCK-ANNUAL-DELTA allowlist does not exactly match ITC-01 retrofit order");
  }
  for (const row of rows) {
    if (!/`(?:env|hvac|ltg)_\d{4}`/.test(row[2])) validationErrors.push(`ComStock allowlist row ${row[1]} has no recognized universal measure ID`);
  }
}

function validateNarrativeTotals(result, loadedSources, urls, validationErrors) {
  const report = result.report;
  const evidenceStatuses = countBy(loadedSources.evidenceManifest.evidence_records, "evidence_status");
  const atomicFormulaTerms = loadedSources.categoryContracts.categories.reduce(
    (total, category) => total + category.formula_terms.length,
    0
  );
  const expectedCoverage = `The required result is ${report.categories} categories, ${report.taxonomyRetrofits} unique retrofit mappings, zero missing IDs, and zero duplicate IDs.`;
  if (!loadedSources.treeDocument.includes(expectedCoverage)) validationErrors.push("Coverage contract totals do not match the parsed documents and taxonomy");

  const overFour = report.categoriesOverFourUserInputs.join(", ");
  for (const line of [
    `- Categories: ${report.categories}.`,
    `- Generated standalone category pages: ${report.categoryPages}.`,
    `- Visible Information Cards: ${report.categoryPages}.`,
    `- Visible category-local Standard processes: ${report.visibleStandardProcesses}.`,
    `- Visible direct source-link occurrences: ${report.sourceLinksRendered}.`,
    `- Canonical retrofit mappings: ${report.mappedRetrofits}.`,
    `- Missing mappings: 0.`,
    `- Duplicate mappings: 0.`,
    `- Shared branches: ${report.sharedBranchesExpanded}.`,
    `- Canonical Standards: ${report.standardsEmbedded}.`,
    `- Expanded maximum atomic User inputs per category: ${report.maxAtomicUserInputs}.`,
    `- Expanded Required Screening inputs: ${report.requiredUserInputs}.`,
    `- Expanded Conditional Calculation Gates: ${report.conditionalCalculationGates}.`,
    `- Expanded Optional Known Details: ${report.optionalKnownDetails}.`,
    `- Maximum Required Screening inputs per category: ${report.maxRequiredUserInputs}.`,
    `- Categories above four Required Screening inputs: ${overFour}.`,
    `- Machine-readable source-evidence records: ${loadedSources.evidenceManifest.evidence_records.length}.`,
    `- Source-evidence statuses: ${Object.entries(evidenceStatuses).map(([status, count]) => `${status} ${count}`).join(", ")}.`,
    `- Atomic formula terms: ${atomicFormulaTerms}.`,
    `- Recorded category manual verdicts: ${loadedSources.categoryContracts.categories.length}.`,
    `- Recorded Standard manual verdicts: ${loadedSources.evidenceManifest.standards.length}.`,
    `- Executable Ready-category golden fixtures: ${loadedSources.goldenFixtures.size}.`
  ]) {
    if (!loadedSources.auditDocument.includes(line)) validationErrors.push(`audit summary is stale or missing: ${line}`);
  }
  if (!loadedSources.auditDocument.includes(`Link validation covered ${urls.length} unique direct registry URLs.`)) {
    validationErrors.push("audit link-validation total does not match the Standard registry");
  }
  for (const topic of [
    "generated information card workflow",
    "information card schema",
    "visible category-local standard processes",
    "default-path proof",
    "formula/tree corrections",
    "semantic source audit",
    "formula audit",
    "default executability audit",
    "implementation readiness audit",
    "mutation tests",
    "unsupported claims removed",
    "manual review record",
    "atomic User-input review",
    "unresolved blockers",
    "High-uncertainty Standards",
    "A1 - Integration and sync",
    "A2 - Adversarial correctness",
    "A3 - Release readiness"
  ]) {
    if (!loadedSources.auditDocument.toLowerCase().includes(topic.toLowerCase())) validationErrors.push(`audit is missing required topic: ${topic}`);
  }
}

function hasCompleteAutomation(standard) {
  return [
    "**Selected Strategy:**",
    "**Automation Method:**",
    "**Difficulty:**",
    "**Efficient Build-Time Estimate:**",
    "**Expected Accuracy or Uncertainty:**",
    "**Basis:**",
    "**Why This Is the Best Value-for-Time Strategy:**",
    "**Access, Refresh, Versioning, and Maintenance Requirements:**"
  ].every((field) => standard.fields["**Automation:**"].includes(field));
}

function between(text, start, end) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end, startIndex + start.length);
  if (startIndex < 0 || endIndex < 0) return "";
  return text.slice(startIndex + start.length, endIndex);
}

function treeDepth(line) {
  const prefix = line.match(/^(?:(?:│  |   ))*/)?.[0] || "";
  return prefix.length / 3 + (/^(?:│  |   )*(?:├─ |└─ )/.test(line) ? 1 : 0);
}

function stripTreePrefix(line) {
  return line.replace(/^(?:│  |   )*(?:├─ |└─ )?/, "").trim();
}

function countErrors(values, pattern) {
  return values.filter((value) => pattern.test(value)).length;
}

function countBy(values, field) {
  return Object.fromEntries(
    [...new Set(values.map((value) => value[field]))]
      .sort()
      .map((key) => [key, values.filter((value) => value[field] === key).length])
  );
}
