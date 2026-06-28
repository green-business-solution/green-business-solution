import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const publicDir = path.join(repoRoot, "public");
const availabilityReviewPath =
  process.env.AVAILABILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "public_opportunity_availability_reviews.json");
const retrofitIndexPath = process.env.RETROFIT_INDEX_PATH || path.join(publicDir, "retrofit_opportunity_index.json");
const testCasesPath = process.env.MATCHING_TEST_CASES_PATH || path.join(publicDir, "sample_matching_test_cases.json");

const availabilityReviews = readJson(availabilityReviewPath);
const retrofitIndex = readJson(retrofitIndexPath);
const testCases = readJson(testCasesPath);
const reviewsByOpportunityId = new Map(
  (availabilityReviews.reviews || [])
    .filter((row) => row?.opportunityId && row?.availabilityReview?.normalizedStatus)
    .map((row) => [row.opportunityId, row])
);
const unavailableIds = idsForStatus("unavailable");
const upcomingIds = idsForStatus("upcoming");
const activeIds = idsForStatuses(["active", "rolling", "uncertain"]);
const movedUpcomingById = new Map(
  [...reviewsByOpportunityId.values()]
    .filter((row) => row.availabilityReview.normalizedStatus === "upcoming")
    .map((row) => [
      row.opportunityId,
      {
        opportunityId: row.opportunityId,
        opportunityName: row.opportunityName,
        sourceName: row.sourceName,
        sourceUrl: row.sourceUrl,
        websiteUrl: row.websiteUrl,
        state: row.state,
        availabilityStatus: "upcoming",
        availabilityReview: row.availabilityReview,
        retrofitTypes: []
      }
    ])
);
let retrofitIndexUnavailableRemoved = 0;
let retrofitIndexUpcomingMoved = 0;
let testCaseUnavailableRemoved = 0;
let testCaseUpcomingMoved = 0;

for (const retrofit of retrofitIndex.retrofits || []) {
  const kept = [];
  for (const opportunity of retrofit.opportunities || []) {
    const review = reviewsByOpportunityId.get(opportunity.opportunityId);
    const status = review?.availabilityReview?.normalizedStatus;

    if (status === "unavailable") {
      retrofitIndexUnavailableRemoved += 1;
      continue;
    }

    if (status === "upcoming") {
      retrofitIndexUpcomingMoved += 1;
      rememberUpcomingOpportunity(opportunity, review, retrofit);
      continue;
    }

    kept.push(withAvailabilityStatus(opportunity, review));
  }
  retrofit.opportunities = kept;
  retrofit.opportunityCount = kept.length;
}

retrofitIndex.retrofits = (retrofitIndex.retrofits || []).filter((retrofit) => retrofit.opportunityCount > 0);
retrofitIndex.retrofitCount = retrofitIndex.retrofits.length;
retrofitIndex.opportunityCount = countUniqueOpportunities(retrofitIndex.retrofits);
retrofitIndex.availabilityReviewedAt = availabilityReviews.generatedAt || new Date().toISOString();
retrofitIndex.availabilityStatusCounts = countReviewStatuses();
retrofitIndex.hiddenUpcomingOpportunityCount = upcomingIds.size;
retrofitIndex.upcomingOpportunities = [...movedUpcomingById.values()].sort(compareUpcomingOpportunities);
retrofitIndex.archivedUnavailableOpportunityCount = unavailableIds.size;

for (const testCase of testCases.testCases || []) {
  const eligibleBefore = countUniqueEligibleOpportunities(testCase);
  const testCaseUpcomingById = new Map();

  for (const retrofit of testCase.retrofits || []) {
    const kept = [];
    for (const opportunity of retrofit.opportunities || []) {
      const review = reviewsByOpportunityId.get(opportunity.opportunityId);
      const status = review?.availabilityReview?.normalizedStatus;

      if (status === "unavailable") {
        testCaseUnavailableRemoved += 1;
        continue;
      }

      if (status === "upcoming") {
        testCaseUpcomingMoved += 1;
        rememberUpcomingOpportunity(opportunity, review, retrofit);
        rememberUpcomingOpportunity(opportunity, review, retrofit, testCaseUpcomingById);
        continue;
      }

      kept.push(withAvailabilityStatus(opportunity, review));
    }
    retrofit.opportunities = kept;
    retrofit.opportunityCount = kept.length;
    if (retrofit.savingsPreview) {
      retrofit.savingsPreview.opportunityCount = kept.length;
    }
  }

  testCase.retrofits = (testCase.retrofits || []).filter((retrofit) => retrofit.opportunityCount > 0);
  testCase.topResults = (testCase.topResults || [])
    .filter((opportunity) => !unavailableIds.has(opportunity.opportunityId) && !upcomingIds.has(opportunity.opportunityId))
    .map((opportunity) => withAvailabilityStatus(opportunity, reviewsByOpportunityId.get(opportunity.opportunityId)));
  testCase.upcomingOpportunities = [...testCaseUpcomingById.values()].sort(compareUpcomingOpportunities);

  const eligibleAfter = countUniqueEligibleOpportunities(testCase);
  const removedEligible = Math.max(0, eligibleBefore - eligibleAfter);
  testCase.statusCounts = {
    eligible: eligibleAfter,
    ineligible: Math.max(0, retrofitIndex.opportunityCount - eligibleAfter)
  };
  testCase.availabilityHiddenCounts = {
    unavailable: unavailableIds.size,
    upcoming: upcomingIds.size,
    eligibleRemovedFromThisTestCase: removedEligible
  };
}

testCases.opportunityCount = retrofitIndex.opportunityCount;
testCases.archivedUnavailableOpportunityCount = unavailableIds.size;
testCases.hiddenUpcomingOpportunityCount = upcomingIds.size;
testCases.availabilityReviewedAt = retrofitIndex.availabilityReviewedAt;
testCases.availabilityStatusCounts = retrofitIndex.availabilityStatusCounts;

writeJson(retrofitIndexPath, retrofitIndex);
writeJson(testCasesPath, testCases);

console.log("Applied availability reviews to public fixtures.");
console.log(`Availability reviews: ${reviewsByOpportunityId.size}`);
console.log(`Active/rolling/uncertain opportunities retained: ${activeIds.size}`);
console.log(`Unavailable opportunities archived from public fixtures: ${unavailableIds.size}`);
console.log(`Upcoming opportunities moved out of active public fixtures: ${upcomingIds.size}`);
console.log(`Retrofit index unavailable edges removed: ${retrofitIndexUnavailableRemoved}`);
console.log(`Retrofit index upcoming edges moved: ${retrofitIndexUpcomingMoved}`);
console.log(`Test case unavailable edges removed: ${testCaseUnavailableRemoved}`);
console.log(`Test case upcoming edges moved: ${testCaseUpcomingMoved}`);

function idsForStatus(status) {
  return idsForStatuses([status]);
}

function idsForStatuses(statuses) {
  const allowed = new Set(statuses);
  return new Set(
    [...reviewsByOpportunityId.values()]
      .filter((row) => allowed.has(row.availabilityReview.normalizedStatus))
      .map((row) => row.opportunityId)
  );
}

function withAvailabilityStatus(opportunity, review) {
  if (!review?.availabilityReview) return opportunity;
  const { availabilityReview: _oldReview, ...rest } = opportunity;
  return {
    ...rest,
    availabilityStatus: review.availabilityReview.normalizedStatus
  };
}

function rememberUpcomingOpportunity(opportunity, review, retrofit, targetMap = movedUpcomingById) {
  const current = targetMap.get(opportunity.opportunityId) || {
    ...withAvailabilityStatus(opportunity, review),
    availabilityReview: review?.availabilityReview || null,
    retrofitTypes: []
  };
  if (!current.retrofitTypes.some((item) => item.retrofitTypeId === retrofit.retrofitTypeId)) {
    current.retrofitTypes.push({
      retrofitTypeId: retrofit.retrofitTypeId,
      displayName: retrofit.displayName,
      isPhysicalRetrofit: retrofit.isPhysicalRetrofit
    });
  }
  targetMap.set(opportunity.opportunityId, current);
}

function countUniqueOpportunities(retrofits) {
  const ids = new Set();
  for (const retrofit of retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      ids.add(opportunity.opportunityId);
    }
  }
  return ids.size;
}

function countUniqueEligibleOpportunities(testCase) {
  const ids = new Set();
  for (const retrofit of testCase.retrofits || []) {
    for (const opportunity of retrofit.opportunities || []) {
      ids.add(opportunity.opportunityId);
    }
  }
  return ids.size;
}

function countReviewStatuses() {
  const counts = {};
  for (const row of reviewsByOpportunityId.values()) {
    const status = row.availabilityReview.normalizedStatus;
    counts[status] = (counts[status] || 0) + 1;
  }
  return counts;
}

function compareUpcomingOpportunities(a, b) {
  return String(a.opportunityName || "").localeCompare(String(b.opportunityName || ""));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}
