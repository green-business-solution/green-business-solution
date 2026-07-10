import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultSourcePath = path.join(repoRoot, "public/retrofit_opportunity_index.json");
const defaultWorkRoot = path.join(repoRoot, "GPT Pro Outputs", "opportunity-award-audit");
const defaultSchemaPath = path.join(defaultWorkRoot, "opportunity-award-audit-schema.json");
const defaultPromptTemplatePath = path.join(defaultWorkRoot, "prompt-template.md");
const defaultBatchSize = 25;
const schemaVersion = "opportunity-award-audit-output.v1";

function main() {
  const options = parseArgs(process.argv.slice(2));
  const index = readJson(options.sourcePath);
  const template = fs.readFileSync(options.promptTemplatePath, "utf8");
  const opportunities = buildUniqueOpportunityRows(index);

  const batchCount = Math.max(1, Math.ceil(opportunities.length / options.batchSize));
  fs.mkdirSync(options.workRoot, { recursive: true });

  const manifest = {
    schemaVersion: "opportunity-award-audit-batch-manifest.v1",
    generatedAt: new Date().toISOString(),
    sourcePath: path.relative(repoRoot, options.sourcePath),
    outputDir: path.relative(repoRoot, options.workRoot),
    sourceRecordCount: index.totalOpportunityRecordCount || opportunities.length,
    uniqueOpportunityCount: opportunities.length,
    batchSize: options.batchSize,
    batchCount,
    schemaFile: path.relative(repoRoot, options.schemaPath),
    promptTemplateFile: path.relative(repoRoot, options.promptTemplatePath),
    batches: []
  };

  for (let i = 0; i < batchCount; i += 1) {
    const batchId = String(i + 1).padStart(3, "0");
    const batchLabel = `batch-${batchId}`;
    const start = i * options.batchSize;
    const end = Math.min(start + options.batchSize, opportunities.length);
    const batchTargets = opportunities.slice(start, end);
    const inputFile = `${batchLabel}_input.json`;
    const promptFile = `${batchLabel}_prompt.md`;
    const outputFile = `${batchLabel}_output.json`;

    const inputPath = path.join(options.workRoot, inputFile);
    const promptPath = path.join(options.workRoot, promptFile);
    const outputPath = path.join(options.workRoot, outputFile);

    const inputArtifact = {
      batchId: batchLabel,
      batchIndex: i + 1,
      totalBatches: batchCount,
      schemaVersion: "opportunity-award-audit-batch-input.v1",
      sourcePath: path.relative(repoRoot, options.sourcePath),
      generatedAt: new Date().toISOString(),
      opportunityCount: batchTargets.length,
      opportunities: batchTargets
    };

    const prompt = buildPrompt({
      template,
      batchLabel,
      batchIndex: i + 1,
      totalBatches: batchCount,
      inputFile,
      outputFile,
      outputSchemaPath: path.relative(repoRoot, options.schemaPath),
      records: batchTargets,
      inputStart: start + 1,
      inputEnd: end
    });

    const outputArtifact = {
      schemaVersion,
      batchId: batchLabel,
      inputFile,
      inputRecordCount: batchTargets.length,
      generatedAt: new Date().toISOString(),
      reviews: [],
      notes: "Awaiting GPT Pro review. Replace reviews array with audited records."
    };

    writeJson(inputPath, inputArtifact);
    fs.writeFileSync(promptPath, prompt, "utf8");
    writeJson(outputPath, outputArtifact);

    manifest.batches.push({
      batchLabel,
      inputFile,
      promptFile,
      outputFile,
      opportunityCount: batchTargets.length,
      startOpportunity: start + 1,
      endOpportunity: end
    });
  }

  writeJson(path.join(options.workRoot, "manifest.json"), manifest);
  console.log(`Wrote ${path.relative(repoRoot, options.workRoot)}`);
  console.log(`Batches: ${manifest.batchCount}`);
  console.log(`Unique opportunities: ${manifest.uniqueOpportunityCount}`);
}

function buildUniqueOpportunityRows(index) {
  const byOpportunityId = new Map();

  for (const retrofit of index.retrofits || []) {
    const retrofitSummary = {
      retrofitTypeId: retrofit.retrofitTypeId,
      displayName: retrofit.displayName,
      parentCategory: retrofit.parentCategory,
      isPhysicalRetrofit: Boolean(retrofit.isPhysicalRetrofit)
    };

    for (const opportunity of retrofit.opportunities || []) {
      if (!opportunity?.opportunityId || typeof opportunity.opportunityId !== "string") {
        continue;
      }

      const existing = byOpportunityId.get(opportunity.opportunityId);
      if (existing) {
        if (!existing.relatedRetrofits.some((entry) => entry.retrofitTypeId === retrofitSummary.retrofitTypeId)) {
          existing.relatedRetrofits.push(retrofitSummary);
          existing.relatedRetrofitCount += 1;
        }
        continue;
      }

      byOpportunityId.set(opportunity.opportunityId, {
        opportunityId: opportunity.opportunityId,
        opportunityName: opportunity.opportunityName || "",
        sourceName: opportunity.sourceName || "",
        sourceUrl: opportunity.sourceUrl || "",
        websiteUrl: opportunity.websiteUrl || null,
        applicationUrl: opportunity.applicationUrl || null,
        state: opportunity.state || null,
        programType: opportunity.programType || "",
        administrator: opportunity.administrator || null,
        availabilityStatus: opportunity.availabilityStatus || "unknown",
        relatedRetrofits: [retrofitSummary],
        relatedRetrofitCount: 1
      });
    }
  }

  return [...byOpportunityId.values()].sort((a, b) => {
    const byName = a.opportunityName.localeCompare(b.opportunityName);
    if (byName !== 0) return byName;
    return a.opportunityId.localeCompare(b.opportunityId);
  });
}

function buildPrompt({
  template,
  batchLabel,
  batchIndex,
  totalBatches,
  inputFile,
  outputFile,
  outputSchemaPath,
  records,
  inputStart,
  inputEnd
}) {
  const jsonSection = JSON.stringify(records, null, 2);
  return template
    .replaceAll("{{BATCH_LABEL}}", batchLabel)
    .replaceAll("{{BATCH_INDEX}}", String(batchIndex))
    .replaceAll("{{TOTAL_BATCHES}}", String(totalBatches))
    .replaceAll("{{INPUT_FILE}}", inputFile)
    .replaceAll("{{OUTPUT_FILE}}", outputFile)
    .replaceAll("{{OUTPUT_SCHEMA_PATH}}", outputSchemaPath)
    .replaceAll("{{INPUT_START}}", String(inputStart))
    .replaceAll("{{INPUT_END}}", String(inputEnd))
    .replaceAll("{{RECORD_COUNT}}", String(records.length))
    .replaceAll("{{RECORDS_JSON}}", jsonSection);
}

function parseArgs(args) {
  const options = {
    sourcePath: defaultSourcePath,
    workRoot: defaultWorkRoot,
    batchSize: defaultBatchSize,
    schemaPath: defaultSchemaPath,
    promptTemplatePath: defaultPromptTemplatePath
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--source") {
      options.sourcePath = path.resolve(args[++i]);
    } else if (arg === "--work-root") {
      options.workRoot = path.resolve(args[++i]);
    } else if (arg === "--batch-size") {
      options.batchSize = positiveInteger(args[++i], "--batch-size");
    } else if (arg === "--schema") {
      options.schemaPath = path.resolve(args[++i]);
    } else if (arg === "--prompt-template") {
      options.promptTemplatePath = path.resolve(args[++i]);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function positiveInteger(value, label) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) throw new Error(`${label} must be a positive integer`);
  return parsed;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
