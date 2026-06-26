import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const utilityReviewsPath = process.env.UTILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "utility_restriction_reviews.json");
const availabilityReviewsPath = process.env.AVAILABILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "availability_reviews.json");
const repairReportPath = process.env.STATUS_BUCKET_REPAIR_REPORT_PATH || path.join(dataDir, "status_bucket_cleanup_repair_report.md");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const writeDynamoDb = process.argv.includes("--write-dynamodb");
const reviewedAt = new Date().toISOString();
const updatedBy = "apply-status-bucket-cleanup-repairs-v1";

const availabilityRepairs = [
  {
    opportunityId: "SOURCE_SDGE_BUSINESS:program_url:gogreenfinancing_com_sdge",
    opportunityName: "GoGreen Financing",
    sourceName: "San Diego Gas & Electric Business Programs",
    state: "CA",
    sourceUrl: "https://www.sdge.com/business/savings-center/business-winter-savings-safety-and-solutions",
    websiteUrl: "https://gogreenfinancing.com/SDGE",
    availabilityReview: activeAvailabilityReview({
      evidenceText:
        "GoGreen Business and SDG&E source pages present financing in current tense for eligible business clean-energy, EV-charging, and efficiency upgrades.",
      sourceUrlsChecked: [
        "https://gogreenfinancing.com/SDGE",
        "https://gogreenfinancing.com/business",
        "https://www.treasurer.ca.gov/caeatfa/cheef/sblp/index.asp"
      ],
      confidence: 0.86
    })
  },
  {
    opportunityId: "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131",
    opportunityName: "Power Your Drive for Fleets",
    sourceName: "San Diego Gas & Electric Business Programs",
    state: "CA",
    sourceUrl: "https://www.sdge.com/business/electric-vehicles/lovelectric",
    websiteUrl: "https://www.sdge.com/node/15131",
    availabilityReview: activeAvailabilityReview({
      evidenceText:
        "SDG&E's current Power Your Drive for Fleets page includes application language and states that SDG&E customers operating medium- and heavy-duty vehicles are eligible in SDG&E service territory.",
      sourceUrlsChecked: [
        "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets",
        "https://www.sdge.com/node/15131"
      ],
      confidence: 0.86
    })
  },
  {
    opportunityId: "SOURCE_SDGE_BUSINESS:program_url:sdsmartindustrials_com",
    opportunityName: "SMART Industrials",
    sourceName: "San Diego Gas & Electric Business Programs",
    state: "CA",
    sourceUrl: "https://www.sdge.com/business/save-energy-and-money",
    websiteUrl: "https://www.sdsmartindustrials.com/",
    availabilityReview: {
      normalizedStatus: "upcoming",
      applicationOpenAt: null,
      applicationDeadlineAt: null,
      questionsDeadlineAt: null,
      programEndAt: null,
      recurring: false,
      noDeadlineExplicit: false,
      evidenceText:
        "SMART Industrials states that Strategic Energy Management is not accepting new participants and that the program is 100% subscribed for incentives in 2026, with possible additional availability in 2027.",
      reasons: ["currently_subscribed_future_availability"],
      sourceUrlsChecked: ["https://www.sdsmartindustrials.com/"],
      fetchErrors: [],
      reviewedAt,
      reviewMethod: "manual_source_research_repair",
      confidence: 0.9
    }
  },
  {
    opportunityId: "SOURCE_SDGE_BUSINESS:program_url:teas_sdge_com",
    opportunityName: "Transportation Electrification Advisory Services (TEAS)",
    sourceName: "San Diego Gas & Electric Business Programs",
    state: "CA",
    sourceUrl: "https://www.sdge.com/business/electric-vehicles/lovelectric",
    websiteUrl: "https://teas.sdge.com/",
    availabilityReview: activeAvailabilityReview({
      evidenceText:
        "TEAS is presented as an active SDG&E advisory service for fleet electrification planning, with the current site inviting business users to work with an SDG&E advisor.",
      sourceUrlsChecked: ["https://teas.sdge.com/", "https://www.sdge.com/business/electric-vehicles/lovelectric"],
      confidence: 0.84
    })
  }
];

const utilityRepairs = [
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:2324",
    opportunityName: "EmPower New York",
    sourceName: "DSIRE",
    state: "NY",
    sourceUrl: "https://programs.dsireusa.org/system/program/detail/2324/empower-new-york",
    utilityRestrictionReview: noneFoundUtilityReview({
      evidenceText:
        "NYSERDA EmPower+ eligibility is based on household income, property/renter status, landlord approval for rentals, and New York geography; no electric distribution utility gate was found after reviewing NYSERDA and DSIRE sources.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/2324/empower-new-york",
        "https://www.nyserda.ny.gov/All-Programs/EmPower-New-York-Program"
      ],
      confidence: 0.82
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:22758",
    opportunityName: "City and County of Denver - All-Electric New Construction Rebates",
    sourceName: "DSIRE",
    state: "CO",
    sourceUrl: "https://programs.dsireusa.org/system/program/detail/22758/city-and-county-of-denver-all-electric-new-construction-rebates",
    utilityRestrictionReview: noneFoundUtilityReview({
      evidenceText:
        "Denver's building-decarbonization rebate materials describe City and County of Denver project eligibility and incentive stacking, including Xcel stacking, but do not make Xcel service a distribution-utility eligibility gate.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/22758/city-and-county-of-denver-all-electric-new-construction-rebates",
        "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Commercial-Buildings/Rebates-for-Building-Decarbonization"
      ],
      confidence: 0.82
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:5437",
    opportunityName: "Green Infrastructure Bonds",
    sourceName: "DSIRE",
    state: "HI",
    sourceUrl: "https://programs.dsireusa.org/system/program/detail/5437/green-infrastructure-bonds",
    utilityRestrictionReview: requiredUtilityReview({
      utilityId: "UTIL_HAWAIIAN_ELECTRIC",
      utilityName: "Hawaiian Electric Companies",
      evidenceText:
        "Hawaii GEM$/Green Infrastructure financing is repaid through the electric bill and applies to eligible Hawaiian Electric Companies customers, so the customer's electric utility relationship is a real gate.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/5437/green-infrastructure-bonds",
        "https://gems.hawaii.gov/",
        "https://gems.hawaii.gov/participating-contractors/"
      ],
      confidence: 0.9
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:22404",
    opportunityName: "Green Mountain Power EV Charging Station Program",
    sourceName: "DSIRE",
    state: "VT",
    sourceUrl: "https://programs.dsireusa.org/system/program/detail/22404/green-mountain-power-ev-charging-station-program",
    utilityRestrictionReview: requiredUtilityReview({
      utilityId: "UTIL_GMP",
      utilityName: "Green Mountain Power",
      evidenceText:
        "Green Mountain Power's EV charger program is a GMP customer program and requires the charger/account relationship to be with Green Mountain Power.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/22404/green-mountain-power-ev-charging-station-program",
        "https://greenmountainpower.com/rebates-programs/electric-vehicles/in-home-ev-charger/"
      ],
      confidence: 0.9
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:22160",
    opportunityName: "Electric Vehicle Fast-Charging Plazas Program",
    sourceName: "DSIRE",
    state: "CO",
    sourceUrl: "https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program",
    utilityRestrictionReview: noneFoundUtilityReview({
      evidenceText:
        "Colorado Energy Office/Drive Clean Colorado program materials describe a statewide competitive grant for DC fast-charging plazas; no electric distribution utility gate was found after retrying official and partner sources.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program",
        "https://energyoffice.colorado.gov/ev-fast-charging-plazas",
        "https://drivecleancolorado.org/dcfc-plazas-grant-application-round-open-until-december-5-2025/"
      ],
      confidence: 0.82
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:115",
    opportunityName: "Power Project Loan Fund",
    sourceName: "DSIRE",
    state: "AK",
    sourceUrl: "https://programs.dsireusa.org/system/program/detail/115/power-project-loan-fund",
    utilityRestrictionReview: notApplicableUtilityReview({
      evidenceText:
        "Alaska's Power Project Fund lends to utilities, local governments, regional/village corporations, village councils, and independent power producers for power projects; eligibility is applicant/project based, not based on the user's distribution utility.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/115/power-project-loan-fund",
        "https://www.akenergyauthority.org/What-We-Do/Grants-Loans/Power-Project-Fund"
      ],
      confidence: 0.84
    })
  }
];

const archiveRepairs = [
  {
    opportunityId: "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_26181",
    opportunityName: "Hydrogen 101 for Fleets",
    sourceName: "San Diego Gas & Electric Business Programs",
    archiveReason: "non_incentive_information_page",
    evidenceText:
      "The SDG&E Hydrogen 101 page is an informational fleet education page, not a clean current rebate, loan, grant, or advisory incentive record for matching.",
    sourceUrlsChecked: ["https://www.sdge.com/node/26181", "https://www.sdge.com/business/electric-vehicles/lovelectric"]
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_code_title_hash:CO78F:4ce622607633",
    opportunityName: "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
    sourceName: "DSIRE",
    archiveReason: "low_information_duplicate_update_record",
    evidenceText:
      "This row points only to the generic DSIRE program listing and contains an update note. The matchable Colorado HEAR detail record is SOURCE_DSIRE:dsire_program_id:22718.",
    sourceUrlsChecked: [
      "https://programs.dsireusa.org/system/program",
      "https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program"
    ]
  }
];

const utilityArtifact = readJson(utilityReviewsPath);
upsertReviews(utilityArtifact, utilityRepairs, "utilityRestrictionReview");
utilityArtifact.generatedAt = reviewedAt;
utilityArtifact.statusCounts = countBy(utilityArtifact.reviews, (row) => row.utilityRestrictionReview.restrictionStatus);
writeJson(utilityReviewsPath, utilityArtifact);

const availabilityArtifact = readJson(availabilityReviewsPath);
upsertReviews(availabilityArtifact, availabilityRepairs, "availabilityReview");
availabilityArtifact.generatedAt = reviewedAt;
availabilityArtifact.opportunityCount = availabilityArtifact.reviews.length;
availabilityArtifact.statusCounts = countBy(availabilityArtifact.reviews, (row) => row.availabilityReview.normalizedStatus);
writeJson(availabilityReviewsPath, availabilityArtifact);

if (writeDynamoDb) {
  const db = createDbClient();
  for (const repair of utilityRepairs) {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: repair.opportunityId },
        UpdateExpression:
          "SET utilityRestrictionReview = :review, utilityRestrictionReviewUpdatedAt = :updatedAt, utilityRestrictionReviewSchemaVersion = :schemaVersion",
        ExpressionAttributeValues: {
          ":review": repair.utilityRestrictionReview,
          ":updatedAt": reviewedAt,
          ":schemaVersion": "utility-restriction-review-v1"
        }
      })
    );
  }
  for (const repair of availabilityRepairs) {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: repair.opportunityId },
        UpdateExpression:
          "SET availabilityReview = :review, availabilityReviewUpdatedAt = :updatedAt, availabilityReviewSchemaVersion = :schemaVersion",
        ExpressionAttributeValues: {
          ":review": repair.availabilityReview,
          ":updatedAt": reviewedAt,
          ":schemaVersion": "availability-review-v1"
        }
      })
    );
  }
  for (const repair of archiveRepairs) {
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { opportunityId: repair.opportunityId },
        UpdateExpression:
          "SET lifecycleStatus = :archived, archivedAt = if_not_exists(archivedAt, :now), archiveReason = :reason, archiveDetails = :details, lifecycleUpdatedAt = :now, lifecycleUpdatedBy = :updatedBy",
        ExpressionAttributeValues: {
          ":archived": "archived",
          ":now": reviewedAt,
          ":reason": repair.archiveReason,
          ":details": {
            archiveReason: repair.archiveReason,
            evidenceText: repair.evidenceText,
            sourceUrlsChecked: repair.sourceUrlsChecked,
            reviewedAt
          },
          ":updatedBy": updatedBy
        }
      })
    );
  }
}

writeRepairReport({
  reviewedAt,
  writeDynamoDb,
  utilityRepairs,
  availabilityRepairs,
  archiveRepairs,
  utilityStatusCounts: utilityArtifact.statusCounts,
  availabilityStatusCounts: availabilityArtifact.statusCounts
});

console.log("Status bucket cleanup repairs applied.");
console.log(`Utility repairs: ${utilityRepairs.length}`);
console.log(`Availability repairs: ${availabilityRepairs.length}`);
console.log(`Archive repairs: ${archiveRepairs.length}`);
console.log(`DynamoDB writes: ${writeDynamoDb ? "yes" : "no"}`);
console.log(`Repair report: ${repairReportPath}`);

function activeAvailabilityReview({ evidenceText, sourceUrlsChecked, confidence }) {
  return {
    normalizedStatus: "active",
    applicationOpenAt: null,
    applicationDeadlineAt: null,
    questionsDeadlineAt: null,
    programEndAt: null,
    recurring: true,
    noDeadlineExplicit: false,
    evidenceText,
    reasons: ["active_program_language"],
    sourceUrlsChecked,
    fetchErrors: [],
    reviewedAt,
    reviewMethod: "manual_source_research_repair",
    confidence
  };
}

function requiredUtilityReview({ utilityId, utilityName, evidenceText, sourceUrlsChecked, confidence }) {
  return {
    restrictionStatus: "required",
    requiredUtilityIds: [utilityId],
    requiredUtilityNames: utilityName ? [utilityName] : [],
    allowedSupplierIds: [],
    rateClasses: [],
    customerRelationshipRequired: true,
    evidenceText,
    reviewMethod: "manual_source_research_repair",
    sourceUrlsChecked,
    fetchErrors: [],
    reviewedAt,
    confidence
  };
}

function noneFoundUtilityReview({ evidenceText, sourceUrlsChecked, confidence }) {
  return {
    restrictionStatus: "none_found_after_review",
    requiredUtilityIds: [],
    requiredUtilityNames: [],
    allowedSupplierIds: [],
    rateClasses: [],
    customerRelationshipRequired: false,
    evidenceText,
    reviewMethod: "manual_source_research_repair",
    sourceUrlsChecked,
    fetchErrors: [],
    reviewedAt,
    confidence
  };
}

function notApplicableUtilityReview({ evidenceText, sourceUrlsChecked, confidence }) {
  return {
    restrictionStatus: "not_applicable",
    requiredUtilityIds: [],
    requiredUtilityNames: [],
    allowedSupplierIds: [],
    rateClasses: [],
    customerRelationshipRequired: false,
    evidenceText,
    reviewMethod: "manual_source_research_repair",
    sourceUrlsChecked,
    fetchErrors: [],
    reviewedAt,
    confidence
  };
}

function upsertReviews(artifact, repairs, reviewFieldName) {
  const rows = Array.isArray(artifact.reviews) ? artifact.reviews : [];
  const byId = new Map(rows.map((row) => [row.opportunityId, row]));

  for (const repair of repairs) {
    const current = byId.get(repair.opportunityId) || {
      opportunityId: repair.opportunityId,
      opportunityName: repair.opportunityName,
      sourceName: repair.sourceName || null,
      state: repair.state || null,
      sourceUrl: repair.sourceUrl || null
    };
    byId.set(repair.opportunityId, {
      ...current,
      ...repair,
      [reviewFieldName]: repair[reviewFieldName]
    });
  }

  artifact.reviews = [...byId.values()];
  artifact.opportunityCount = artifact.reviews.length;
}

function createDbClient() {
  return DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region,
      credentials: profile ? fromIni({ profile }) : undefined
    })
  );
}

function countBy(values, keyFn) {
  const counts = {};
  for (const value of values) {
    const key = keyFn(value);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeRepairReport({ reviewedAt, writeDynamoDb, utilityRepairs, availabilityRepairs, archiveRepairs, utilityStatusCounts, availabilityStatusCounts }) {
  const lines = [
    "# Status Bucket Cleanup Repair Report",
    "",
    `Generated: ${reviewedAt}`,
    `DynamoDB writes: ${writeDynamoDb ? "yes" : "no"}`,
    "",
    "## Repair Standard",
    "",
    "- Visible admin sample matching should only publish `eligible_active` and `ineligible` statuses.",
    "- Resolve `likely_eligible` by repairing the specific unknown canonical field, not by hiding the status in the UI.",
    "- If an opportunity is a duplicate generic update row or informational page rather than a matchable incentive/advisory/financing record, archive it with a lifecycle reason.",
    "- If an official source is blocked, rate-limited, times out, or returns HTTP 403/429/5xx, wait for the retry window, retry, and use alternate official or program-partner sources before accepting an unresolved repair.",
    "- Keep `upcoming` records hidden and unarchived unless the record is also duplicate, non-matchable, or low-information.",
    "",
    "## Availability Repairs",
    ""
  ];

  for (const repair of availabilityRepairs) {
    const review = repair.availabilityReview;
    lines.push(
      `- ${repair.opportunityName} (${repair.opportunityId})`,
      `  - status: ${review.normalizedStatus}`,
      `  - evidence: ${review.evidenceText}`,
      `  - sources: ${review.sourceUrlsChecked.join(", ")}`
    );
  }

  lines.push("", "## Utility Repairs", "");
  for (const repair of utilityRepairs) {
    const review = repair.utilityRestrictionReview;
    lines.push(
      `- ${repair.opportunityName} (${repair.opportunityId})`,
      `  - status: ${review.restrictionStatus}`,
      `  - required utilities: ${[...review.requiredUtilityIds, ...review.requiredUtilityNames].join(", ") || "none"}`,
      `  - evidence: ${review.evidenceText}`,
      `  - sources: ${review.sourceUrlsChecked.join(", ")}`
    );
  }

  lines.push("", "## Archive Repairs", "");
  for (const repair of archiveRepairs) {
    lines.push(
      `- ${repair.opportunityName} (${repair.opportunityId})`,
      `  - archive reason: ${repair.archiveReason}`,
      `  - evidence: ${repair.evidenceText}`,
      `  - sources: ${repair.sourceUrlsChecked.join(", ")}`
    );
  }

  lines.push(
    "",
    "## Updated Status Counts",
    "",
    "Utility restriction reviews:",
    "",
    "```json",
    JSON.stringify(utilityStatusCounts, null, 2),
    "```",
    "",
    "Availability reviews:",
    "",
    "```json",
    JSON.stringify(availabilityStatusCounts, null, 2),
    "```",
    ""
  );

  fs.writeFileSync(repairReportPath, `${lines.join("\n")}\n`, "utf8");
}
