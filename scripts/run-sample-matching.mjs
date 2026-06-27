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
import { isVisibleAvailability, isVisibleOpportunity } from "../server/matching/opportunityLifecycle.mjs";
import {
  RETROFIT_TAXONOMY_VERSION,
  buildRetrofitOpportunityIndex,
  classifyRetrofitsForOpportunity
} from "../server/matching/retrofitTaxonomy.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const publicDir = path.join(repoRoot, "public");
const sampleUsersPath = process.env.SAMPLE_USERS_PATH || path.join(dataDir, "sample_user_profiles.json");
const sourcePath = process.env.OPPORTUNITY_SOURCE_PATH || "";
const outputPath = process.env.MATCHING_OUTPUT_PATH || "/tmp/retrofi-sample-matching-results.json";
const reportPath = process.env.MATCHING_REPORT_PATH || path.join(dataDir, "sample_matching_report.md");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(publicDir, "sample_matching_test_cases.json");
const retrofitIndexPath = process.env.RETROFIT_INDEX_PATH || path.join(publicDir, "retrofit_opportunity_index.json");
const facilityReviewsPath = process.env.FACILITY_REVIEWS_PATH || path.join(dataDir, "facility_eligibility_reviews.json");
const utilityReviewsPath = process.env.UTILITY_REVIEWS_PATH || path.join(dataDir, "utility_restriction_reviews.json");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const now = new Date(process.env.MATCHING_NOW || Date.now());
const writeFullOutput = process.env.MATCHING_WRITE_FULL_OUTPUT !== "0";
const writeRetrofitIndex = process.env.MATCHING_WRITE_RETROFIT_INDEX !== "0";
const patchExistingTestCases = process.env.MATCHING_PATCH_EXISTING_TEST_CASES === "1";
const ADMIN_MATCH_STATUS_ORDER = ["eligible", "ineligible"];
const ADMIN_MATCH_ALLOWED_STATUSES = new Set(ADMIN_MATCH_STATUS_ORDER);
const requestedSampleUserIds = new Set(
  (process.env.SAMPLE_USER_IDS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
);

const allSampleUsers = readJson(sampleUsersPath);
const sampleUsers =
  requestedSampleUserIds.size > 0
    ? allSampleUsers.filter((sample) => requestedSampleUserIds.has(sample.sampleUserId))
    : allSampleUsers;
const facilityReviewsByOpportunityId = readReviewMap(facilityReviewsPath, "facilityEligibilityReview");
const utilityReviewsByOpportunityId = readUtilityReviews(utilityReviewsPath);
const opportunityRecords = sourcePath ? readOpportunitySource(sourcePath) : await scanOpportunitiesFromAws();
const archivedOpportunityCount = opportunityRecords.filter((opportunity) => !isVisibleOpportunity(opportunity)).length;
const candidateOpportunities = opportunityRecords
  .filter(isVisibleOpportunity)
  .map(applyFacilityReview)
  .map(applyUtilityReview);
const userProfiles = sampleUsers.map((sample) => ({
  sampleUserId: sample.sampleUserId,
  description: sample.description,
  sourceForm: sample,
  userMatchProfile: normalizeUserProfile(sample)
}));
const allVisibleOpportunityProfiles = candidateOpportunities.map((opportunity) => {
  const matchProfile = buildOpportunityMatchProfile(opportunity, { now });
  return {
    opportunity,
    matchProfile: {
      ...matchProfile,
      retrofitTypes: classifyRetrofitsForOpportunity(opportunity, matchProfile)
    }
  };
});
const hiddenUpcomingOpportunityCount = allVisibleOpportunityProfiles.filter(
  ({ matchProfile }) => matchProfile.availability.normalizedStatus === "upcoming"
).length;
const opportunityProfiles = allVisibleOpportunityProfiles.filter(({ matchProfile }) =>
  isVisibleAvailability(matchProfile.availability)
);
const opportunities = opportunityProfiles.map(({ opportunity }) => opportunity);
const allResults = [];
const userReports = [];
const generatedAt = new Date().toISOString();
const retrofitRows = writeRetrofitIndex ? buildRetrofitOpportunityIndex(opportunityProfiles) : [];

for (const userProfile of userProfiles) {
  const results = opportunityProfiles
    .map(({ opportunity, matchProfile }) =>
      evaluateOpportunityForUser(userProfile.userMatchProfile, opportunity, matchProfile, { now })
    )
    .sort(compareResults);
  if (writeFullOutput) {
    allResults.push({
      sampleUserId: userProfile.sampleUserId,
      results: results.map(summarizeMatchResult)
    });
  }
  userReports.push(buildUserReport(userProfile, results));
}

const output = {
  generatedAt,
  matchingNow: now.toISOString(),
  opportunityCount: opportunities.length,
  totalOpportunityRecordCount: opportunityRecords.length,
  archivedOpportunityCount,
  hiddenUpcomingOpportunityCount,
  sampleUserCount: sampleUsers.length,
  retrofitTaxonomyVersion: RETROFIT_TAXONOMY_VERSION,
  retrofitIndexPath,
  facilityReviewsPath: facilityReviewsByOpportunityId.size > 0 ? facilityReviewsPath : null,
  facilityReviewCount: facilityReviewsByOpportunityId.size,
  utilityReviewsPath: utilityReviewsByOpportunityId.size > 0 ? utilityReviewsPath : null,
  utilityReviewCount: utilityReviewsByOpportunityId.size,
  sampleUsers: userProfiles,
  fullResultsOmitted: !writeFullOutput,
  results: writeFullOutput ? allResults : []
};
const existingAdminTestCases =
  patchExistingTestCases && fs.existsSync(testCasesPath) ? readJson(testCasesPath) : null;
const adminTestCaseRows = existingAdminTestCases
  ? patchTestCases(existingAdminTestCases.testCases || [], userReports)
  : userReports;
const adminTestCases = {
  generatedAt: output.generatedAt,
  matchingNow: output.matchingNow,
  opportunityCount: output.opportunityCount,
  totalOpportunityRecordCount: output.totalOpportunityRecordCount,
  archivedOpportunityCount: output.archivedOpportunityCount,
  hiddenUpcomingOpportunityCount: output.hiddenUpcomingOpportunityCount,
  sampleUserCount: existingAdminTestCases?.sampleUserCount || output.sampleUserCount,
  retrofitTaxonomyVersion: RETROFIT_TAXONOMY_VERSION,
  testCases: adminTestCaseRows
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(reportPath, buildReport({ userReports, opportunities, outputPath }), "utf8");
fs.mkdirSync(path.dirname(testCasesPath), { recursive: true });
fs.writeFileSync(testCasesPath, `${JSON.stringify(adminTestCases, null, 2)}\n`);
if (writeRetrofitIndex) {
  const retrofitIndex = {
    schemaVersion: "retrofit-opportunity-index-v1",
    taxonomyVersion: RETROFIT_TAXONOMY_VERSION,
    generatedAt,
    matchingNow: now.toISOString(),
    opportunityCount: opportunities.length,
    totalOpportunityRecordCount: opportunityRecords.length,
    archivedOpportunityCount,
    retrofitCount: retrofitRows.length,
    retrofits: retrofitRows
  };
  fs.mkdirSync(path.dirname(retrofitIndexPath), { recursive: true });
  fs.writeFileSync(retrofitIndexPath, `${JSON.stringify(retrofitIndex, null, 2)}\n`);
}

console.log(`Sample matching complete.`);
console.log(`Opportunities evaluated: ${opportunities.length}`);
console.log(`Archived opportunities skipped: ${archivedOpportunityCount}`);
console.log(`Upcoming opportunities hidden: ${hiddenUpcomingOpportunityCount}`);
console.log(`Sample users: ${sampleUsers.length}`);
console.log(`Requested sample user filter: ${requestedSampleUserIds.size > 0 ? [...requestedSampleUserIds].join(", ") : "none"}`);
console.log(`Pairings evaluated: ${opportunities.length * sampleUsers.length}`);
console.log(`Results: ${outputPath}`);
console.log(`Full pair result output: ${writeFullOutput ? "yes" : "no"}`);
console.log(`Report: ${reportPath}`);
console.log(`Admin test cases: ${testCasesPath}`);
console.log(`Patch existing admin test cases: ${patchExistingTestCases ? "yes" : "no"}`);
console.log(`Retrofit opportunity index: ${writeRetrofitIndex ? retrofitIndexPath : "not written"}`);
console.log(`Facility eligibility reviews loaded: ${facilityReviewsByOpportunityId.size}`);
console.log(`Utility restriction reviews loaded: ${utilityReviewsByOpportunityId.size}`);

function readReviewMap(filePath, reviewFieldName) {
  if (!fs.existsSync(filePath)) return new Map();
  const source = readJson(filePath);
  const rows = Array.isArray(source) ? source : source.reviews || [];
  return new Map(
    rows
      .filter((row) => row?.opportunityId && row?.[reviewFieldName])
      .map((row) => [row.opportunityId, row[reviewFieldName]])
  );
}

function readUtilityReviews(filePath) {
  return readReviewMap(filePath, "utilityRestrictionReview");
}

function applyFacilityReview(opportunity) {
  const facilityEligibilityReview = facilityReviewsByOpportunityId.get(opportunity.opportunityId);
  if (!facilityEligibilityReview) return opportunity;
  return {
    ...opportunity,
    facilityEligibilityReview
  };
}

function applyUtilityReview(opportunity) {
  const utilityRestrictionReview = utilityReviewsByOpportunityId.get(opportunity.opportunityId);
  if (!utilityRestrictionReview) return opportunity;
  return {
    ...opportunity,
    utilityRestrictionReview
  };
}

function patchTestCases(existingRows, replacements) {
  const replacementsById = new Map(replacements.map((row) => [row.sampleUserId, row]));
  const seen = new Set();
  const patched = existingRows.map((row) => {
    const replacement = replacementsById.get(row.sampleUserId);
    if (!replacement) return row;
    seen.add(row.sampleUserId);
    return replacement;
  });
  for (const replacement of replacements) {
    if (!seen.has(replacement.sampleUserId)) patched.push(replacement);
  }
  return patched;
}

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
  assertNoDisallowedAdminStatuses(userProfile, grouped);
  const statusCounts = Object.fromEntries(
    ADMIN_MATCH_STATUS_ORDER.map((status) => [
      status,
      grouped.get(status)?.length || 0
    ])
  );
  const promising = results.filter((result) => result.eligibilityStatus === "eligible");
  const topResults = promising.slice(0, 12).map(summarizeMatchResult);
  const commonQuestions = topCounts(
    promising
      .map((result) => result.nextQuestion?.criterionId)
      .filter(Boolean)
  );
  const blockers = topCounts(results.flatMap((result) => result.blockers));
  const unresolved = topCounts(promising.flatMap((result) => result.unresolvedRequirements));
  const retrofits = buildUserRetrofitGroups(promising);

  return {
    sampleUserId: userProfile.sampleUserId,
    description: userProfile.description,
    sourceForm: userProfile.sourceForm,
    normalizedProfile: userProfile.userMatchProfile,
    statusCounts,
    retrofits,
    topResults,
    commonQuestions,
    blockers,
    unresolved
  };
}

function assertNoDisallowedAdminStatuses(userProfile, grouped) {
  const disallowed = [...grouped.entries()]
    .filter(([status]) => !ADMIN_MATCH_ALLOWED_STATUSES.has(status))
    .map(([status, rows]) => ({ status, count: rows.length }))
    .filter((row) => row.count > 0);
  if (disallowed.length === 0) return;

  throw new Error(
    `Admin matching fixture still has unresolved/hidden statuses for ${userProfile.sampleUserId}: ${disallowed
      .map((row) => `${row.status}=${row.count}`)
      .join(", ")}. Run the data repair pipeline before publishing test cases.`
  );
}

function buildUserRetrofitGroups(results) {
  const groups = new Map();

  for (const result of results) {
    const summarized = summarizeMatchResult(result);
    for (const retrofit of result.retrofitTypes || []) {
      const current = groups.get(retrofit.retrofitTypeId) || {
        retrofitTypeId: retrofit.retrofitTypeId,
        displayName: retrofit.displayName,
        parentCategory: retrofit.parentCategory,
        isPhysicalRetrofit: retrofit.isPhysicalRetrofit,
        opportunityCount: 0,
        opportunities: []
      };
      current.opportunityCount += 1;
      current.opportunities.push(summarized);
      groups.set(retrofit.retrofitTypeId, current);
    }
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      opportunities: group.opportunities.sort(compareResults)
    }))
    .sort((a, b) => b.opportunityCount - a.opportunityCount || a.displayName.localeCompare(b.displayName));
}

function buildReport({ userReports, opportunities, outputPath }) {
  const lines = [
    "# Sample Matching Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Matcher clock: ${now.toISOString()}`,
    `Opportunities evaluated: ${opportunities.length}`,
    `Archived opportunities skipped: ${archivedOpportunityCount}`,
    `Upcoming opportunities hidden: ${hiddenUpcomingOpportunityCount}`,
    `Sample users evaluated: ${userReports.length}`,
    `Pairings evaluated: ${opportunities.length * userReports.length}`,
    "",
    "This is a deterministic first-pass matcher audit. It is not a human-reviewed ground-truth label set yet.",
    "The script evaluates every current visible opportunity against each sample profile, then reports eligible matches and common blockers.",
    writeFullOutput ? `Full JSON output: \`${outputPath}\`` : "Full pair-level JSON output was skipped for this run.",
    "",
    "## Global Notes",
    "",
    "- Hard failures are limited to explicit unavailable status/deadline, state mismatch, utility mismatch, residential-only mismatch, applicant mismatch, technology mismatch, and parsed numeric threshold failure.",
    "- Utility restrictions use the generated review artifact when present. `required` gates matching; `none`, `not_applicable`, and `none_found_after_review` are treated as pass; only unresolved ambiguous utility evidence remains `unknown`.",
    `- Facility eligibility uses the generated review artifact when present. Artifact: ${facilityReviewsByOpportunityId.size > 0 ? `\`${facilityReviewsPath}\` (${facilityReviewsByOpportunityId.size} reviewed opportunities)` : "not loaded"}.`,
    `- Utility review artifact: ${utilityReviewsByOpportunityId.size > 0 ? `\`${utilityReviewsPath}\` (${utilityReviewsByOpportunityId.size} reviewed opportunities)` : "not loaded"}.`,
    "- The admin fixture intentionally fails generation if visible results contain any status other than `eligible` or `ineligible`.",
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
    lines.push("Eligible matches:");
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
    lines.push("", "Retrofit types inferred from promising matches:");
    for (const retrofit of report.retrofits.slice(0, 8)) lines.push(`- ${retrofit.displayName}: ${retrofit.opportunityCount}`);
    lines.push("", "Common blockers across rejected/unavailable opportunities:");
    for (const item of report.blockers.slice(0, 5)) lines.push(`- ${item.value}: ${item.count}`);
  }

  lines.push(
    "",
    "## Immediate Iteration Targets",
    "",
    "1. Improve utility resolution for `Other / Not sure` users by geocoding and service-territory lookup instead of relying on the current form option.",
    "2. Split offer-level sectors/technologies more carefully for DSIRE parameter sets to reduce residential/commercial leakage.",
    "3. Re-run availability review daily so hidden upcoming opportunities automatically re-enter matching once source evidence classifies them as active or rolling.",
    "4. Add a small hand-reviewed truth fixture for the top 20 matches per sample user; this is the realistic way to approach exhaustive validation without pretending all pairings were manually adjudicated."
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
    eligible: 0,
    likely_eligible: 1,
    needs_information: 2,
    manual_review: 3,
    ineligible: 4,
    unavailable: 5
  }[status] ?? 9;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
