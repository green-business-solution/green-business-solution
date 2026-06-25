import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { buildOpportunityMatchProfile } from "../server/matching/buildOpportunityMatchProfile.mjs";
import { evaluateOpportunityForUser } from "../server/matching/evaluateRules.mjs";
import { summarizeMatchResult } from "../server/matching/explainMatch.mjs";
import { normalizeUserProfile } from "../server/matching/normalizeUserProfile.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const publicDir = path.join(repoRoot, "public");
const sampleUsersPath = process.env.SAMPLE_USERS_PATH || path.join(dataDir, "sample_user_profiles.json");
const sourcePath = process.env.OPPORTUNITY_SOURCE_PATH || "";
const outputPath = process.env.MATCHING_OUTPUT_PATH || "/tmp/retrofi-sample-matching-results.json";
const reportPath = process.env.MATCHING_REPORT_PATH || path.join(dataDir, "sample_matching_report.md");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(publicDir, "sample_matching_test_cases.json");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const now = new Date(process.env.MATCHING_NOW || Date.now());

const sampleUsers = readJson(sampleUsersPath);
const opportunities = sourcePath ? readOpportunitySource(sourcePath) : await scanOpportunitiesFromAws();
const userProfiles = sampleUsers.map((sample) => ({
  sampleUserId: sample.sampleUserId,
  description: sample.description,
  sourceForm: sample,
  userMatchProfile: normalizeUserProfile(sample)
}));
const opportunityProfiles = opportunities.map((opportunity) => ({
  opportunity,
  matchProfile: buildOpportunityMatchProfile(opportunity, { now })
}));
const allResults = [];
const userReports = [];

for (const userProfile of userProfiles) {
  const results = opportunityProfiles
    .map(({ opportunity, matchProfile }) =>
      evaluateOpportunityForUser(userProfile.userMatchProfile, opportunity, matchProfile, { now })
    )
    .sort(compareResults);
  allResults.push({
    sampleUserId: userProfile.sampleUserId,
    results: results.map(summarizeMatchResult)
  });
  userReports.push(buildUserReport(userProfile, results));
}

const output = {
  generatedAt: new Date().toISOString(),
  matchingNow: now.toISOString(),
  opportunityCount: opportunities.length,
  sampleUserCount: sampleUsers.length,
  sampleUsers: userProfiles,
  results: allResults
};
const adminTestCases = {
  generatedAt: output.generatedAt,
  matchingNow: output.matchingNow,
  opportunityCount: output.opportunityCount,
  sampleUserCount: output.sampleUserCount,
  testCases: userReports
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport({ userReports, opportunities, outputPath }), "utf8");
fs.mkdirSync(path.dirname(testCasesPath), { recursive: true });
fs.writeFileSync(testCasesPath, `${JSON.stringify(adminTestCases, null, 2)}\n`);

console.log(`Sample matching complete.`);
console.log(`Opportunities evaluated: ${opportunities.length}`);
console.log(`Sample users: ${sampleUsers.length}`);
console.log(`Pairings evaluated: ${opportunities.length * sampleUsers.length}`);
console.log(`Results: ${outputPath}`);
console.log(`Report: ${reportPath}`);
console.log(`Admin test cases: ${testCasesPath}`);

function readOpportunitySource(filePath) {
  const source = readJson(filePath);
  if (Array.isArray(source)) return source.filter((item) => item?.opportunityId);
  return (source.Items || []).map((item) => (item.opportunityId ? item : unmarshall(item))).filter((item) => item?.opportunityId);
}

async function scanOpportunitiesFromAws() {
  const db = DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region,
      credentials: profile ? fromIni({ profile }) : undefined
    })
  );
  const items = [];
  let ExclusiveStartKey;

  do {
    const result = await db.send(new ScanCommand({ TableName: tableName, ExclusiveStartKey }));
    items.push(...(result.Items || []));
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  return items.filter((item) => item?.opportunityId);
}

function buildUserReport(userProfile, results) {
  const grouped = groupBy(results, (result) => result.eligibilityStatus);
  const statusCounts = Object.fromEntries(
    ["eligible_active", "likely_eligible", "needs_information", "upcoming", "manual_review", "ineligible", "unavailable"].map((status) => [
      status,
      grouped.get(status)?.length || 0
    ])
  );
  const promising = results.filter((result) =>
    ["eligible_active", "likely_eligible", "needs_information", "upcoming"].includes(result.eligibilityStatus)
  );
  const topResults = promising.slice(0, 12).map(summarizeMatchResult);
  const commonQuestions = topCounts(
    promising
      .map((result) => result.nextQuestion?.criterionId)
      .filter(Boolean)
  );
  const blockers = topCounts(results.flatMap((result) => result.blockers));
  const unresolved = topCounts(promising.flatMap((result) => result.unresolvedRequirements));

  return {
    sampleUserId: userProfile.sampleUserId,
    description: userProfile.description,
    sourceForm: userProfile.sourceForm,
    normalizedProfile: userProfile.userMatchProfile,
    statusCounts,
    topResults,
    commonQuestions,
    blockers,
    unresolved
  };
}

function buildReport({ userReports, opportunities, outputPath }) {
  const lines = [
    "# Sample Matching Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Matcher clock: ${now.toISOString()}`,
    `Opportunities evaluated: ${opportunities.length}`,
    `Sample users evaluated: ${userReports.length}`,
    `Pairings evaluated: ${opportunities.length * userReports.length}`,
    "",
    "This is a deterministic first-pass matcher audit. It is not a human-reviewed ground-truth label set yet.",
    "The script evaluates every current opportunity against each sample profile, then reports the strongest matches and the most common unknowns/blockers.",
    `Full JSON output: \`${outputPath}\``,
    "",
    "## Global Notes",
    "",
    "- Hard failures are limited to explicit unavailable status/deadline, state mismatch, utility mismatch, residential-only mismatch, applicant mismatch, technology mismatch, and parsed numeric threshold failure.",
    "- Missing utility restriction, missing building specificity, and ambiguous opportunity geography return `unknown` rather than a false rejection.",
    "- Current form limitations are visible for municipal-utility sample users because the utility picker does not include every California municipal utility.",
    "- This report is designed to be iterated: manually inspect top false positives/false negatives, update extraction/ontology rules, rerun.",
    "",
    "## Sample User Results"
  ];

  for (const report of userReports) {
    lines.push("", `### ${report.sampleUserId}`, "", report.description, "");
    lines.push("Normalized profile:");
    lines.push("```json");
    lines.push(
      JSON.stringify(
        {
          organizationTypes: report.normalizedProfile.business.organizationTypes,
          stateCode: report.normalizedProfile.site.geo.stateCode,
          zip5: report.normalizedProfile.site.geo.zip5,
          utility: report.normalizedProfile.site.utility.electric,
          ownershipRelationship: report.normalizedProfile.site.ownershipRelationship,
          buildingTypes: report.normalizedProfile.site.buildingTypes,
          squareFootage: report.normalizedProfile.site.squareFootage,
          technologyIds: report.normalizedProfile.project.technologyIds
        },
        null,
        2
      )
    );
    lines.push("```", "");
    lines.push("Status counts:");
    lines.push("```json");
    lines.push(JSON.stringify(report.statusCounts, null, 2));
    lines.push("```", "");
    lines.push("Top matches requiring no hard blocker:");
    for (const result of report.topResults) {
      lines.push(
        `- ${result.eligibilityStatus} / ${result.rankScore}: ${result.opportunityName} (${result.opportunityId})`
      );
      if (result.matchedReasons.length > 0) lines.push(`  - matched: ${result.matchedReasons.slice(0, 3).join("; ")}`);
      if (result.unresolvedRequirements.length > 0) {
        lines.push(`  - unresolved: ${result.unresolvedRequirements.slice(0, 3).join("; ")}`);
      }
    }
    lines.push("", "Common next questions:");
    for (const item of report.commonQuestions.slice(0, 5)) lines.push(`- ${item.value}: ${item.count}`);
    lines.push("", "Common unresolved requirements among promising matches:");
    for (const item of report.unresolved.slice(0, 5)) lines.push(`- ${item.value}: ${item.count}`);
    lines.push("", "Common blockers across rejected/unavailable opportunities:");
    for (const item of report.blockers.slice(0, 5)) lines.push(`- ${item.value}: ${item.count}`);
  }

  lines.push(
    "",
    "## Immediate Iteration Targets",
    "",
    "1. Improve utility resolution for `Other / Not sure` users by geocoding and service-territory lookup instead of relying on the current form option.",
    "2. Split offer-level sectors/technologies more carefully for DSIRE parameter sets to reduce residential/commercial leakage.",
    "3. Add source-specific availability handling for CEC awarded solicitations and utility pages with no explicit deadline.",
    "4. Add a small hand-reviewed truth fixture for the top 20 matches per sample user; this is the realistic way to approach exhaustive validation without pretending all 20,960 pairings were manually adjudicated."
  );

  return `${lines.join("\n")}\n`;
}

function topCounts(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || String(a.value).localeCompare(String(b.value)));
}

function groupBy(values, keyFn) {
  const groups = new Map();
  for (const value of values) {
    const key = keyFn(value);
    const current = groups.get(key) || [];
    current.push(value);
    groups.set(key, current);
  }
  return groups;
}

function compareResults(a, b) {
  return statusRank(a.eligibilityStatus) - statusRank(b.eligibilityStatus) || b.rankScore - a.rankScore;
}

function statusRank(status) {
  return {
    eligible_active: 0,
    likely_eligible: 1,
    needs_information: 2,
    upcoming: 3,
    manual_review: 4,
    ineligible: 5,
    unavailable: 6
  }[status] ?? 9;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
