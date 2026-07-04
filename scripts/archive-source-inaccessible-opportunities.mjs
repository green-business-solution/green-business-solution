import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const packagesPath =
  process.env.OPPORTUNITY_INCENTIVE_CALCULATION_PACKAGES_PATH ||
  path.join(dataDir, "opportunity_incentive_calculation_packages_v2.json");
const reportJsonPath =
  process.env.SOURCE_INACCESSIBLE_ARCHIVE_REPORT_JSON ||
  path.join(dataDir, "source_inaccessible_archive_report_2026-07-04.json");
const reportMdPath =
  process.env.SOURCE_INACCESSIBLE_ARCHIVE_REPORT_MD ||
  path.join(dataDir, "source_inaccessible_archive_report_2026-07-04.md");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const writeDynamoDb = process.argv.includes("--write-dynamodb");
const reviewedAt = new Date().toISOString();
const updatedBy = "archive-source-inaccessible-opportunities-v1";

const targets = [
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:3466",
    programName: "Duke Energy - Non-Residential Energy Efficiency Rebate Program",
    archiveReason: "source_inaccessible_repair_failure",
    evidenceText:
      "Repeated GPT Pro/source repair and package audit left the current official Duke Smart Saver non-residential rate table inaccessible, so this record is excluded from product-visible matching until a new accessible official source appears.",
    previousCalculationStatus: "source_inaccessible_repair_failure",
    previousAvailability: { status: "active", source_access_status: "inaccessible" },
    sourceUrlsChecked: [
      "https://programs.dsireusa.org/system/program/detail/3466/duke-energy-non-residential-energy-efficiency-rebate-program"
    ]
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:3606",
    programName: "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
    archiveReason: "source_inaccessible_repair_failure",
    evidenceText:
      "Repeated GPT Pro/source repair and package audit left current Duke Energy Smart Saver measure tables inaccessible; search snippets confirm categories but not current source-backed rates or caps.",
    previousCalculationStatus: "source_inaccessible_repair_failure",
    previousAvailability: { status: "active", source_access_status: "inaccessible" },
    sourceUrlsChecked: [
      "https://programs.dsireusa.org/system/program/detail/3606/duke-energy-carolinas-non-residential-energy-efficiency-rebate-program"
    ]
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:22067",
    programName: "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
    archiveReason: "source_inaccessible_repair_failure",
    evidenceText:
      "Repeated GPT Pro/source repair and package audit left full current PSREC commercial rebate pages/forms inaccessible; snippets are not enough to support current product-visible matching or estimates.",
    previousCalculationStatus: "source_inaccessible_repair_failure",
    previousAvailability: { status: "active", source_access_status: "inaccessible" },
    sourceUrlsChecked: [
      "https://programs.dsireusa.org/system/program/detail/22067/plumas-sierra-rec-commercial-and-irrigation-rebate-program"
    ]
  }
];

const targetById = new Map(targets.map((target) => [target.opportunityId, target]));
const packagesArtifact = readJson(packagesPath);
const packageRows = Array.isArray(packagesArtifact.packages) ? packagesArtifact.packages : [];
const packageResults = [];

for (const pkg of packageRows) {
  const target = targetById.get(pkg.opportunity_id);
  if (!target) continue;
  const storedPreviousCalculationStatus = pkg.archive_metadata?.previous_calculation_status;
  const storedPreviousAvailability = pkg.archive_metadata?.previous_availability;
  const previousCalculationStatus =
    (storedPreviousCalculationStatus && storedPreviousCalculationStatus !== "unavailable_archived"
      ? storedPreviousCalculationStatus
      : null) ||
    (pkg.calculation_status === "unavailable_archived" ? target.previousCalculationStatus : pkg.calculation_status) ||
    null;
  const previousAvailability =
    (storedPreviousAvailability?.status && storedPreviousAvailability.status !== "archived" ? storedPreviousAvailability : null) ||
    (pkg.calculation_status === "unavailable_archived" ? target.previousAvailability : pkg.availability) ||
    null;
  pkg.calculation_status = "unavailable_archived";
  pkg.availability = {
    ...(pkg.availability || {}),
    status: "archived",
    source_access_status: "inaccessible"
  };
  pkg.archive_metadata = {
    archived_at: reviewedAt,
    archived_by: updatedBy,
    archive_reason: target.archiveReason,
    evidence_text: target.evidenceText,
    source_urls_checked: target.sourceUrlsChecked,
    previous_calculation_status: previousCalculationStatus,
    previous_availability: previousAvailability
  };
  for (const effect of pkg.effects || []) {
    effect.repair_metadata = {
      ...(effect.repair_metadata || {}),
      repair_status: "unavailable_archived",
      calculation_status: "unavailable_archived",
      included_in_user_facing_total_default: false,
      human_review_required: true,
      human_review_reasons: [
        "Archived by policy after repeated source-inaccessible repair failure.",
        "Exclude from product-visible estimates unless a new accessible official source appears."
      ]
    };
  }
  packageResults.push({
    opportunityId: target.opportunityId,
    programName: target.programName,
    previousCalculationStatus,
    newCalculationStatus: pkg.calculation_status
  });
}

packagesArtifact.statusCounts = countBy(packageRows, (pkg) => pkg.calculation_status || "unknown");
packagesArtifact.sourceInaccessibleArchiveAppliedAt = reviewedAt;
packagesArtifact.sourceInaccessibleArchiveReport = path.relative(repoRoot, reportJsonPath);
writeJson(packagesPath, packagesArtifact);

const dynamoResults = [];
if (writeDynamoDb) {
  const db = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region,
      credentials: profile ? fromIni({ profile }) : undefined
    })
  );
  for (const target of targets) {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: target.opportunityId },
        UpdateExpression:
          "SET lifecycleStatus = :archived, archivedAt = if_not_exists(archivedAt, :now), archiveReason = :reason, archiveDetails = :details, lifecycleUpdatedAt = :now, lifecycleUpdatedBy = :updatedBy",
        ExpressionAttributeValues: {
          ":archived": "archived",
          ":now": reviewedAt,
          ":reason": target.archiveReason,
          ":details": {
            archiveReason: target.archiveReason,
            evidenceText: target.evidenceText,
            sourceUrlsChecked: target.sourceUrlsChecked,
            reviewedAt,
            policy: "exclude repeated source-inaccessible repair failures from product-visible matching"
          },
          ":updatedBy": updatedBy
        }
      })
    );
    dynamoResults.push({ opportunityId: target.opportunityId, action: "archived" });
  }
}

const report = {
  schemaVersion: "retrofi_source_inaccessible_archive_report.v1",
  generatedAt: reviewedAt,
  writeDynamoDb,
  targetCount: targets.length,
  packageUpdateCount: packageResults.length,
  dynamoUpdateCount: dynamoResults.length,
  targets,
  packageResults,
  dynamoResults
};

writeJson(reportJsonPath, report);
fs.writeFileSync(reportMdPath, buildMarkdownReport(report), "utf8");

console.log("Source-inaccessible archive repair complete.");
console.log(`Targets: ${targets.length}`);
console.log(`Package updates: ${packageResults.length}`);
console.log(`DynamoDB writes: ${writeDynamoDb ? dynamoResults.length : "no"}`);
console.log(`Report: ${path.relative(repoRoot, reportMdPath)}`);

function buildMarkdownReport(report) {
  const lines = [
    "# Source-Inaccessible Opportunity Archive Report",
    "",
    `Generated: ${report.generatedAt}`,
    `DynamoDB writes: ${report.writeDynamoDb ? "yes" : "no"}`,
    "",
    "## Archived / Excluded Opportunities",
    "",
    "| Opportunity | Package status | DynamoDB | Reason |",
    "| --- | --- | --- | --- |"
  ];
  for (const target of report.targets) {
    const packageResult = report.packageResults.find((row) => row.opportunityId === target.opportunityId);
    const dynamoResult = report.dynamoResults.find((row) => row.opportunityId === target.opportunityId);
    lines.push(
      `| ${target.programName} (${target.opportunityId}) | ${packageResult?.previousCalculationStatus || "missing"} -> ${packageResult?.newCalculationStatus || "not_updated"} | ${dynamoResult?.action || "not_written"} | ${target.archiveReason} |`
    );
  }
  lines.push(
    "",
    "## Policy",
    "",
    "These opportunities were repeatedly classified as source-inaccessible after GPT Pro/source repair attempts. They are archived/excluded from product-visible matching and estimates unless a new accessible official source appears."
  );
  return `${lines.join("\n")}\n`;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function countBy(values, keyFn) {
  const counts = {};
  for (const value of values || []) {
    const key = keyFn(value) || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}
