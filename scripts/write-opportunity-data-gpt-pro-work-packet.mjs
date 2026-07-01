import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildTargets } from "./write-opportunity-data-research-targets.mjs";
import { readExpectedOpportunityIds } from "./validate-opportunity-data-research-repairs.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSourcePath = path.join(repoRoot, "public/retrofit_opportunity_index.json");
const defaultWorkRoot = path.join(repoRoot, "GPT Pro Work");
const defaultTargetsPath = path.join(repoRoot, "data/opportunity_data_research_targets_next_from_current.json");
const defaultBatchCount = 5;
const defaultTargetsPerBatch = 15;
const defaultConfidenceThreshold = 0.9;

function main() {
  const options = parseArgs(process.argv.slice(2));
  const source = readJson(options.sourcePath);
  const targetLimit = options.batchCount * options.targetsPerBatch + 1;
  const targetsWithContinuation = buildTargets(source, {
    maxTargets: targetLimit,
    confidenceThreshold: options.confidenceThreshold,
    excludeRepaired: true,
    excludeOpportunityIds: options.excludeOpportunityIds
  });
  const targets = targetsWithContinuation.slice(0, options.batchCount * options.targetsPerBatch);
  if (targets.length < options.batchCount * options.targetsPerBatch) {
    throw new Error(`Only ${targets.length} targets available; expected ${options.batchCount * options.targetsPerBatch}`);
  }

  const endBatchNumber = options.startBatchNumber + options.batchCount - 1;
  const packetDir = path.join(
    options.workRoot,
    `opportunity-data-repair-batches-${options.startBatchNumber}-${endBatchNumber}`
  );

  if (fs.existsSync(packetDir) && !options.force) {
    throw new Error(`packet directory already exists: ${path.relative(repoRoot, packetDir)}. Use --force to overwrite.`);
  }
  fs.mkdirSync(packetDir, { recursive: true });

  const written = [];
  for (let batchIndex = 0; batchIndex < options.batchCount; batchIndex += 1) {
    const batchNumber = options.startBatchNumber + batchIndex;
    const start = batchIndex * options.targetsPerBatch;
    const end = start + options.targetsPerBatch;
    const batchTargets = targets.slice(start, end);
    const continuation = targetsWithContinuation[end]?.opportunityId || null;
    const promptPath = path.join(packetDir, `prompt_batch${batchNumber}_targets_${start + 1}_${end}.md`);
    const outputPath = path.join(packetDir, `output_batch${batchNumber}.md`);

    writeText(promptPath, buildPrompt({
      batchNumber,
      start: start + 1,
      end,
      totalRepairBatchesApplied: options.totalRepairBatchesApplied,
      targets: batchTargets,
      continuation
    }));
    writeText(outputPath, "");
    written.push(promptPath, outputPath);
  }

  writeTargetsArtifact(options.targetsPath, {
    source,
    sourcePath: options.sourcePath,
    targets,
    confidenceThreshold: options.confidenceThreshold,
    excludeTargetsPaths: options.excludeTargetsPaths,
    excludedOpportunityCount: options.excludeOpportunityIds.length
  });

  console.log(`Wrote ${path.relative(repoRoot, packetDir)}`);
  console.log(`Prompt/output files: ${written.length}`);
  console.log(`Targets: ${targets.length}`);
  console.log(`Next continuation: ${targetsWithContinuation.at(options.batchCount * options.targetsPerBatch)?.opportunityId || "null"}`);
  console.log(`Target artifact: ${path.relative(repoRoot, options.targetsPath)}`);
}

function buildPrompt({ batchNumber, start, end, totalRepairBatchesApplied, targets, continuation }) {
  const continuationJson = JSON.stringify(continuation);
  const targetCount = targets.length;
  return [
    "You are researching and repairing RetroFi opportunity-data matches.",
    "",
    "Return strict JSON only. Do not include markdown, code fences, prose, citations outside fields, or commentary outside the JSON object.",
    "",
    `This prompt covers targets ${start}-${end} from the current unrepaired low-confidence opportunity-data queue after GPT Pro repair batches 1-${totalRepairBatchesApplied}. Do not add other opportunities. Do not skip any target unless you mark it source_inaccessible or unknown inside its repair object.`,
    "",
    "Critical output rules:",
    "- Return one valid JSON object only.",
    "- The response must parse with JSON.parse.",
    "- Do not wrap the response in triple backticks.",
    "- Use raw URL strings only, such as \"https://example.com/page\".",
    "- Do not use markdown link syntax anywhere.",
    "- URL fields must not contain brackets, parentheses, escaped quote fragments, or copied markdown.",
    "- If a search/browser UI gives a markdown link, convert it to a plain raw URL string before putting it in JSON.",
    "- Keep each opportunityId exactly as supplied.",
    `- Include exactly ${targetCount} repair objects, one for each supplied target, in the same order.`,
    "- Use empty arrays for unknown list fields. Use null only for applicationUrl or websiteUrl when no current URL is verified.",
    "- Keep evidenceText concise, plain text, and under 75 words. Do not include URLs in evidenceText.",
    "- Prefer unavailable for expired, closed, cancelled, fully subscribed, or no-longer-accepting programs.",
    "- Use source_inaccessible only when current official sources cannot be read well enough to verify eligibility.",
    "",
    "Goal:",
    "For each target opportunity below, determine whether RetroFi's current opportunity-to-retrofit matches are correct. Repair the opportunity data so matching can distinguish:",
    "- correct eligible retrofit categories;",
    "- false-positive retrofit categories;",
    "- geography and utility territory limits;",
    "- eligible applicants and sectors;",
    "- hard requirements;",
    "- blockers that should prevent matching;",
    "- source accessibility and availability.",
    "",
    "Research requirements:",
    "1. Prioritize current official administrator, utility, program, application, tariff, rebate-form, program-manual, or government sources.",
    "2. Use DSIRE only as a starting clue, not as final authority when current official sources disagree.",
    "3. Preserve categories only when current official sources support them.",
    "4. Remove or block false-positive categories explicitly in blockers.",
    "5. If a source supports a product-specific match, do not generalize it into a broader building category. Examples: window AC is not window replacement; pre-rinse spray valve is not broad plumbing retrofit; residential appliance rebate is not commercial kitchen equipment.",
    "6. If EV charging, demand response, solar, financing, audit, loan, or water conservation is a separate program, say so. Keep it only if it truly belongs to this opportunity or clearly mark the separate-program boundary.",
    "7. For source-inaccessible records, clear unsupported eligible categories and explain exactly what official source failed.",
    "8. For loans or financing programs, do not force them into rebate-style categories. Describe them as financing or loan support and limit retrofit categories to what the financing program actually covers.",
    "9. For commercial and industrial programs, do not infer residential appliances or home weatherization. For residential programs, do not infer commercial kitchen, refrigeration, motors, VFDs, or industrial measures.",
    "10. Use snake_case strings for eligibleRetrofitCategories. It is fine to use a supplied retrofitTypeId when accurate, but narrow it when a product-specific category is more accurate.",
    "",
    "Allowed output schema:",
    "{",
    "  \"schemaVersion\": \"opportunity_data_research_repairs.v1\",",
    "  \"researchedAt\": \"2026-07-01\",",
    "  \"source\": \"gpt_pro\",",
    "  \"repairs\": [",
    "    {",
    "      \"opportunityId\": \"SOURCE_DSIRE:dsire_program_id:...\",",
    "      \"confidence\": \"high | medium | low\",",
    "      \"availabilityStatus\": \"active | unavailable | source_inaccessible | unknown\",",
    "      \"geography\": {",
    "        \"country\": \"US\",",
    "        \"states\": [],",
    "        \"counties\": [],",
    "        \"cities\": [],",
    "        \"utilityTerritories\": [],",
    "        \"notes\": \"\"",
    "      },",
    "      \"eligibleApplicantTypes\": [],",
    "      \"eligibleSectors\": [],",
    "      \"eligibleRetrofitCategories\": [],",
    "      \"hardRequirements\": [],",
    "      \"blockers\": [],",
    "      \"programType\": \"\",",
    "      \"administrator\": \"\",",
    "      \"applicationUrl\": null,",
    "      \"websiteUrl\": null,",
    "      \"sourceUrlsChecked\": [],",
    "      \"evidenceText\": \"\",",
    "      \"reasoningNotes\": \"\"",
    "    }",
    "  ],",
    `  \"continueFromOpportunityId\": ${continuationJson}`,
    "}",
    "",
    "Final validation before responding:",
    "- JSON.parse would succeed.",
    `- repairs.length is ${targetCount}.`,
    "- The repair opportunityIds exactly match the target opportunityIds and order.",
    "- No markdown links exist anywhere in the JSON.",
    "- sourceUrlsChecked, websiteUrl, and applicationUrl contain only raw URLs or null.",
    "- evidenceText is short and does not include URL fragments.",
    `- continueFromOpportunityId is ${continuationJson}.`,
    "",
    "Targets:",
    `${JSON.stringify(targets, null, 2)}`,
    ""
  ].join("\n");
}

function writeTargetsArtifact(
  filePath,
  { source, sourcePath, targets, confidenceThreshold, excludeTargetsPaths, excludedOpportunityCount }
) {
  const artifact = {
    schemaVersion: "opportunity_data_research_targets.v1",
    generatedAt: new Date().toISOString(),
    sourcePath: path.relative(repoRoot, sourcePath),
    selection: {
      maxTargets: targets.length,
      confidenceThresholdExclusive: confidenceThreshold,
      availabilityStatuses: ["active", "rolling", null],
      excludeOpportunityDataRepaired: true,
      excludeOpportunityTargetPaths: excludeTargetsPaths.map((filePath) => path.relative(repoRoot, filePath)),
      excludedOpportunityCount,
      sort: [
        "lowest opportunity confidence ascending",
        "related retrofit count descending",
        "opportunity name ascending"
      ],
      sourceRepairBatch: source.opportunityDataRepairBatch || null
    },
    targetCount: targets.length,
    targets
  };
  writeJson(filePath, artifact);
}

function parseArgs(args) {
  const options = {
    sourcePath: defaultSourcePath,
    workRoot: defaultWorkRoot,
    targetsPath: defaultTargetsPath,
    startBatchNumber: null,
    totalRepairBatchesApplied: null,
    batchCount: defaultBatchCount,
    targetsPerBatch: defaultTargetsPerBatch,
    confidenceThreshold: defaultConfidenceThreshold,
    excludeTargetsPaths: [],
    excludeOpportunityIds: [],
    force: false
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--source") {
      options.sourcePath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--work-root") {
      options.workRoot = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--targets-output") {
      options.targetsPath = path.resolve(requiredValue(args, ++index, arg));
    } else if (arg === "--start-batch") {
      options.startBatchNumber = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--total-repair-batches-applied") {
      options.totalRepairBatchesApplied = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--batch-count") {
      options.batchCount = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--targets-per-batch") {
      options.targetsPerBatch = positiveInteger(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--confidence-threshold") {
      options.confidenceThreshold = numberValue(requiredValue(args, ++index, arg), arg);
    } else if (arg === "--exclude-targets") {
      const excludeTargetsPath = path.resolve(requiredValue(args, ++index, arg));
      options.excludeTargetsPaths.push(excludeTargetsPath);
      options.excludeOpportunityIds.push(...readExpectedOpportunityIds(excludeTargetsPath));
    } else if (arg === "--force") {
      options.force = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!options.startBatchNumber) throw new Error("--start-batch is required");
  if (!options.totalRepairBatchesApplied) options.totalRepairBatchesApplied = options.startBatchNumber - 1;
  return options;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value, "utf8");
}

function requiredValue(args, index, flag) {
  const value = args[index];
  if (!value) throw new Error(`${flag} requires a value`);
  return value;
}

function positiveInteger(value, flag) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) throw new Error(`${flag} must be a positive integer`);
  return number;
}

function numberValue(value, flag) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`${flag} must be a number`);
  return number;
}

main();
