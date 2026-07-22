import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { RETROFIT_TYPES } from "../apps/api/server/matching/retrofitTaxonomy.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const TREE_PATH = `${ROOT}/docs/operational-savings-information-trees.md`;
const STANDARD_PATH = `${ROOT}/docs/operational-savings-standard-registry.md`;
const AUDIT_PATH = `${ROOT}/docs/operational-savings-information-tree-audit.md`;

const [treeDocument, standardDocument, auditDocument] = await Promise.all([
  readFile(TREE_PATH, "utf8"),
  readFile(STANDARD_PATH, "utf8"),
  readFile(AUDIT_PATH, "utf8")
]);

const errors = [];
const allowedCategoryStatuses = new Set([
  "DRAFT",
  "RESEARCHED — READY FOR HUMAN REVIEW",
  "BLOCKED"
]);
const allowedStandardStatuses = new Set([...allowedCategoryStatuses, "LIMITED"]);
const allowedLeafLabels = ["(User)", "(Profile)", "(Bill)", "(Standard)"];

for (const [name, text] of [
  ["information-tree document", treeDocument],
  ["Standard registry", standardDocument]
]) {
  if (/\bFINALIZED\b|\bIN REVIEW\b/.test(text)) {
    errors.push(`${name} contains a prohibited legacy status`);
  }
}

const categories = parseSections(treeDocument, /^### (ITC-\d{2}) - (.+)$/gm);
const branches = parseSections(treeDocument, /^### (BR-[A-Z0-9-]+) - (.+)$/gm);
const standards = parseSections(standardDocument, /^### ■ (STD-[A-Z0-9-]+) - (.+)$/gm);

assertUniqueSections(categories, "category");
assertUniqueSections(branches, "shared branch");
assertUniqueSections(standards, "Standard");

const categoryById = new Map(categories.map((section) => [section.id, section]));
const branchById = new Map(branches.map((section) => [section.id, section]));
const standardById = new Map(standards.map((section) => [section.id, section]));

const expectedCategoryIds = categories.map((_, index) => `ITC-${String(index + 1).padStart(2, "0")}`);
const actualCategoryIds = categories.map((section) => section.id);
if (JSON.stringify(expectedCategoryIds) !== JSON.stringify(actualCategoryIds)) {
  errors.push(`category IDs are not contiguous and ordered: ${actualCategoryIds.join(", ")}`);
}

const taxonomyById = new Map(RETROFIT_TYPES.map((item) => [item.retrofitTypeId, item]));
const mappingOccurrences = new Map();
const actualStandardUsage = new Map(standards.map((section) => [section.id, new Set()]));
const actualBranchUsage = new Map(branches.map((section) => [section.id, new Set()]));
const categoryStatusCounts = new Map();

for (const category of categories) {
  assertOrderedMarkers(category, [
    "**Status:**",
    "**Retrofits:**",
    "**Primary Formula:**",
    "**Supporting Formula(s):**",
    "**Information Tree:**",
    "**Standards:**",
    "**Notes:**"
  ]);

  const status = matchOne(category.body, /^\*\*Status:\*\* (.+)$/m, `${category.id} status`);
  if (status && !allowedCategoryStatuses.has(status)) {
    errors.push(`${category.id} uses invalid status ${JSON.stringify(status)}`);
  }
  if (status) categoryStatusCounts.set(status, (categoryStatusCounts.get(status) || 0) + 1);

  const retrofitBlock = sliceBetween(category.body, "**Retrofits:**", "**Primary Formula:**");
  const mappings = [...retrofitBlock.matchAll(/^- `([^`]+)` - (.+)$/gm)];
  if (mappings.length === 0) errors.push(`${category.id} has no retrofit mappings`);

  for (const mapping of mappings) {
    const [, retrofitId, displayName] = mapping;
    if (!taxonomyById.has(retrofitId)) {
      errors.push(`${category.id} maps unknown retrofit ${retrofitId}`);
      continue;
    }
    const expectedName = taxonomyById.get(retrofitId).displayName;
    if (displayName !== expectedName) {
      errors.push(`${category.id} display name mismatch for ${retrofitId}: ${JSON.stringify(displayName)} != ${JSON.stringify(expectedName)}`);
    }
    if (!mappingOccurrences.has(retrofitId)) mappingOccurrences.set(retrofitId, []);
    mappingOccurrences.get(retrofitId).push(category.id);
  }

  const formulaBlock = sliceBetween(category.body, "**Primary Formula:**", "**Supporting Formula(s):**").trim();
  if (!formulaBlock) errors.push(`${category.id} has an empty Primary Formula`);

  const supportingBlock = sliceBetween(category.body, "**Supporting Formula(s):**", "**Information Tree:**").trim();
  if (!supportingBlock) errors.push(`${category.id} has an empty Supporting Formula(s) section`);

  const treeBlock = sliceBetween(category.body, "**Information Tree:**", "**Standards:**");
  validateInformationTree(category.id, treeBlock);
  for (const branchId of treeBlock.match(/\bBR-[A-Z0-9-]+\b/g) || []) {
    if (!branchById.has(branchId)) {
      errors.push(`${category.id} references undefined shared branch ${branchId}`);
    } else {
      actualBranchUsage.get(branchId).add(category.id);
    }
  }

  const standardsLine = matchOne(category.body, /^\*\*Standards:\*\* (.+)$/m, `${category.id} Standards`);
  for (const standardId of standardsLine?.match(/\bSTD-[A-Z0-9-]+\b/g) || []) {
    if (!standardById.has(standardId)) {
      errors.push(`${category.id} references undefined Standard ${standardId}`);
    } else {
      actualStandardUsage.get(standardId).add(category.id);
    }
  }
}

for (const retrofit of RETROFIT_TYPES) {
  const occurrences = mappingOccurrences.get(retrofit.retrofitTypeId) || [];
  if (occurrences.length === 0) errors.push(`missing retrofit mapping: ${retrofit.retrofitTypeId}`);
  if (occurrences.length > 1) errors.push(`duplicate retrofit mapping: ${retrofit.retrofitTypeId} in ${occurrences.join(", ")}`);
}
for (const mappedId of mappingOccurrences.keys()) {
  if (!taxonomyById.has(mappedId)) errors.push(`mapping contains non-taxonomy ID: ${mappedId}`);
}

for (const branch of branches) {
  const status = matchOne(branch.body, /^\*\*Status:\*\* (.+)$/m, `${branch.id} status`);
  if (status && !allowedCategoryStatuses.has(status)) {
    errors.push(`${branch.id} uses invalid status ${JSON.stringify(status)}`);
  }
  const declared = parseUsage(matchOne(branch.body, /^\*\*Used By:\*\* (.+)$/m, `${branch.id} Used By`), categoryById);
  compareUsage(branch.id, declared, actualBranchUsage.get(branch.id));
}

const standardStatusCounts = new Map();
let standardsWithAutomation = 0;
for (const standard of standards) {
  assertOrderedMarkers(standard, [
    "**Status:**",
    "**Purpose:**",
    "**Source:**",
    "**Lookup Inputs:**",
    "**Value Needed:**",
    "**How to Use:**",
    "**Automation:**",
    "**Used By:**"
  ]);
  const status = matchOne(standard.body, /^\*\*Status:\*\* (.+)$/m, `${standard.id} status`);
  if (status && !allowedStandardStatuses.has(status)) {
    errors.push(`${standard.id} uses invalid status ${JSON.stringify(status)}`);
  }
  if (status) standardStatusCounts.set(status, (standardStatusCounts.get(status) || 0) + 1);

  const source = sliceBetween(standard.body, "**Source:**", "**Lookup Inputs:**");
  if (!/https:\/\//.test(source)) errors.push(`${standard.id} Source has no direct HTTPS link`);

  const automation = sliceBetween(standard.body, "**Automation:**", "**Used By:**");
  const automationFields = [
    "**Selected Strategy:**",
    "**Automation Method:**",
    "**Difficulty:**",
    "**Efficient Build-Time Estimate:**",
    "**Expected Accuracy or Uncertainty:**",
    "**Basis:**",
    "**Why This Is the Best Value-for-Time Strategy:**",
    "**Access, Refresh, Versioning, and Maintenance Requirements:**"
  ];
  if (automationFields.every((field) => automation.includes(field))) {
    standardsWithAutomation += 1;
  } else {
    const missing = automationFields.filter((field) => !automation.includes(field));
    errors.push(`${standard.id} Automation is missing ${missing.join(", ")}`);
  }

  const declared = parseUsage(matchOne(standard.body, /^\*\*Used By:\*\* (.+)$/m, `${standard.id} Used By`), categoryById);
  compareUsage(standard.id, declared, actualStandardUsage.get(standard.id));
}

const indexRows = [...treeDocument.matchAll(/^\| `(ITC-\d{2})` \|/gm)].map((match) => match[1]);
if (JSON.stringify(indexRows) !== JSON.stringify(actualCategoryIds)) {
  errors.push("Category Index IDs do not exactly match category sections");
}

for (const requiredText of [
  "unresolved blockers",
  "High-uncertainty Standards",
  "Efficient implementation estimate",
  "Recommended order",
  "A1 - Integration and sync",
  "A2 - Adversarial correctness",
  "A3 - Release readiness"
]) {
  if (!auditDocument.toLowerCase().includes(requiredText.toLowerCase())) {
    errors.push(`audit is missing required topic: ${requiredText}`);
  }
}

const report = {
  categories: categories.length,
  taxonomyRetrofits: RETROFIT_TYPES.length,
  mappedRetrofits: mappingOccurrences.size,
  missingMappings: RETROFIT_TYPES.filter((item) => !mappingOccurrences.has(item.retrofitTypeId)).length,
  duplicateMappings: [...mappingOccurrences.values()].filter((items) => items.length > 1).length,
  sharedBranches: branches.length,
  standards: standards.length,
  standardsWithAutomation,
  categoryStatuses: Object.fromEntries(categoryStatusCounts),
  standardStatuses: Object.fromEntries(standardStatusCounts)
};

if (errors.length > 0) {
  console.error(JSON.stringify(report, null, 2));
  console.error("\nValidation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(report, null, 2));
  console.log("Operational-savings information-tree validation passed.");
}

function parseSections(document, headingPattern) {
  const matches = [...document.matchAll(headingPattern)];
  return matches.map((match, index) => ({
    id: match[1],
    title: match[2],
    body: document.slice(match.index + match[0].length, matches[index + 1]?.index ?? document.length)
  }));
}

function assertUniqueSections(sections, label) {
  const seen = new Set();
  for (const section of sections) {
    if (seen.has(section.id)) errors.push(`${label} ${section.id} is defined more than once`);
    seen.add(section.id);
  }
}

function assertOrderedMarkers(section, markers) {
  let previousIndex = -1;
  for (const marker of markers) {
    const index = section.body.indexOf(marker);
    if (index < 0) {
      errors.push(`${section.id} is missing ${marker}`);
      continue;
    }
    if (index <= previousIndex) errors.push(`${section.id} has ${marker} out of order`);
    previousIndex = index;
  }
}

function sliceBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) return "";
  return text.slice(start + startMarker.length, end);
}

function matchOne(text, pattern, label) {
  const match = text.match(pattern);
  if (!match) {
    errors.push(`missing ${label}`);
    return null;
  }
  return match[1].trim();
}

function validateInformationTree(categoryId, block) {
  const codeMatch = block.match(/```text\n([\s\S]*?)\n```/);
  if (!codeMatch) {
    errors.push(`${categoryId} has no text code block in Information Tree`);
    return;
  }
  const lines = codeMatch[1].split("\n").filter((line) => line.trim());
  if (lines.length < 2) {
    errors.push(`${categoryId} Information Tree has no dependencies`);
    return;
  }

  const nodes = lines.map((line, index) => ({
    index,
    depth: treeDepth(line),
    text: line.replace(/^(?:│  |   )*(?:├─ |└─ )?/, "").trim()
  }));

  for (let index = 1; index < nodes.length; index += 1) {
    const node = nodes[index];
    const next = nodes[index + 1];
    const terminal = !next || next.depth <= node.depth;
    if (!terminal) continue;
    if (/^BR-[A-Z0-9-]+$/.test(node.text)) continue;
    if (!allowedLeafLabels.some((label) => node.text.endsWith(label))) {
      errors.push(`${categoryId} terminal leaf lacks an allowed source label: ${JSON.stringify(node.text)}`);
    }
  }
}

function treeDepth(line) {
  const prefix = line.match(/^(?:(?:│  |   ))*/)?.[0] || "";
  return prefix.length / 3 + (/^(?:│  |   )*(?:├─ |└─ )/.test(line) ? 1 : 0);
}

function parseUsage(line, knownCategories) {
  const usage = new Set();
  if (!line) return usage;
  const rangePattern = /(ITC-\d{2}) through (ITC-\d{2})/g;
  const consumedRanges = [];
  for (const match of line.matchAll(rangePattern)) {
    consumedRanges.push(match[0]);
    const start = Number(match[1].slice(4));
    const end = Number(match[2].slice(4));
    for (let value = start; value <= end; value += 1) usage.add(`ITC-${String(value).padStart(2, "0")}`);
  }
  let remainder = line;
  for (const range of consumedRanges) remainder = remainder.replace(range, "");
  for (const id of remainder.match(/ITC-\d{2}/g) || []) usage.add(id);
  for (const id of usage) {
    if (!knownCategories.has(id)) errors.push(`usage declaration references unknown category ${id}`);
  }
  return usage;
}

function compareUsage(ownerId, declared, actual) {
  const declaredList = [...declared].sort();
  const actualList = [...(actual || [])].sort();
  if (JSON.stringify(declaredList) !== JSON.stringify(actualList)) {
    errors.push(`${ownerId} Used By mismatch: declared [${declaredList.join(", ")}], actual [${actualList.join(", ")}]`);
  }
}
