import fs from "node:fs";
import path from "node:path";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromIni } from "@aws-sdk/credential-providers";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const utilityReviewsPath = process.env.UTILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "utility_restriction_reviews.json");
const availabilityReviewsPath = process.env.AVAILABILITY_REVIEW_OUTPUT_PATH || path.join(dataDir, "availability_reviews.json");
const repairReportPath = process.env.REVIEW_REPAIR_REPORT_PATH || path.join(dataDir, "matching_review_repair_report.md");
const tableName = process.env.GBS_OPPORTUNITIES_TABLE || "gbs-opportunity-candidates";
const region = process.env.GBS_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const profile = process.env.AWS_PROFILE || "gbs";
const writeDynamoDb = process.argv.includes("--write-dynamodb");
const reviewedAt = new Date().toISOString();

const utilityRepairs = [
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:4227",
    opportunityName: "Peninsula Light Company - Residential Energy Efficiency  Rebate Program",
    utilityRestrictionReview: requiredUtilityReview({
      utilityId: "UTIL_PENINSULA_LIGHT",
      utilityName: "Peninsula Light Company",
      evidenceText:
        "Peninsula Light Company residential efficiency incentive pages identify PenLight energy-efficiency rebates and program requirements for existing electric-heated residences.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/4227/peninsula-light-company-residential-energy-efficiency-rebate-program",
        "https://www.penlight.org/energy-efficiency/incentives/",
        "https://www.penlight.org/energy-efficiency/incentives/heat-pump-incentives/"
      ]
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:4532",
    opportunityName: "Peninsula Light Company - Commercial Efficient Lighting  Rebate Program",
    utilityRestrictionReview: requiredUtilityReview({
      utilityId: "UTIL_PENINSULA_LIGHT",
      utilityName: "Peninsula Light Company",
      evidenceText:
        "Program title and reviewed source text state that participating customers must be served by PLC commercial service.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/4532/peninsula-light-company-commercial-efficient-lighting-rebate-program",
        "https://www.penlight.org/energy-efficiency/incentives/commercial-incentives/"
      ]
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:4581",
    opportunityName: "Energy Smart - Commercial and Industrial Energy Efficiency Rebate Program (17 Municipalities)",
    utilityRestrictionReview: {
      restrictionStatus: "required",
      requiredUtilityIds: [],
      requiredUtilityNames: [
        "Bay City",
        "Charlevoix",
        "Chelsea",
        "Eaton Rapids",
        "Escanaba",
        "Harbor Springs",
        "Hart",
        "Lowell",
        "Niles",
        "Paw Paw",
        "Petoskey",
        "Portland",
        "Sebewaing",
        "South Haven",
        "St. Louis",
        "Sturgis",
        "Wyandotte",
        "Zeeland"
      ],
      allowedSupplierIds: [],
      rateClasses: [],
      customerRelationshipRequired: true,
      evidenceText:
        "DSIRE states eligible business electric customers must be served by participating utilities; Energy Smart's current cities page lists the participating municipal programs.",
      reviewMethod: "manual_source_research_repair",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/4581/energy-smart-commercial-and-industrial-energy-efficiency-rebate-program-17-municipalities",
        "https://mienergysmart.com/cities/"
      ],
      fetchErrors: [],
      reviewedAt,
      confidence: 0.9
    }
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:1655",
    opportunityName: "NorthWestern Energy - Custom Business Efficiency Program",
    utilityRestrictionReview: requiredUtilityReview({
      utilityId: "UTIL_NORTHWESTERN",
      utilityName: "NorthWestern Energy",
      evidenceText:
        "NorthWestern Energy's business rebates page says commercial electric rebates are available to NorthWestern Energy commercial electric supply customers and custom Business Partners incentives are available for electric and/or natural gas efficiency projects.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/1655/northwestern-energy-custom-business-efficiency-program",
        "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives",
        "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/e-business-partners"
      ]
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:22250",
    opportunityName: "Electric Vehicle Charging Station Loan Program",
    utilityRestrictionReview: notApplicableUtilityReview({
      evidenceText:
        "VEDA describes this as a State Infrastructure Bank financing program for public-use EV charging and natural-gas refueling stations, with eligibility based on applicant/project type rather than electric distribution utility.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/22250/electric-vehicle-charging-station-loan-program",
        "https://www.veda.org/financing-options/vermont-commercial-financing/electric-vehicle-charging-station-loan-program/"
      ]
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:22181",
    opportunityName: "Electric Vehicle Rebate Program",
    utilityRestrictionReview: notApplicableUtilityReview({
      evidenceText:
        "Efficiency Maine's EV rebate program is administered by Efficiency Maine for eligible Maine businesses, nonprofits, and organizations; reviewed terms do not gate eligibility by electric distribution utility.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/22181/electric-vehicle-rebate-program",
        "https://www.efficiencymaine.com/electric-vehicle-incentives-for-businesses-and-organizations/"
      ]
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:2813",
    opportunityName: "Richland Energy Services - Energy Efficient Commercial Lighting Program",
    utilityRestrictionReview: requiredUtilityReview({
      utilityId: "UTIL_RICHLAND_ENERGY_SERVICES",
      utilityName: "Richland Energy Services",
      evidenceText:
        "Richland Energy Services says commercial and industrial projects must be served by Richland Energy Services for non-residential accounts.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/2813/richland-energy-services-energy-efficient-commercial-lighting-program",
        "https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs"
      ]
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:682",
    opportunityName: "West Penn Power SEF Commercial Loan Program",
    utilityRestrictionReview: requiredUtilityReview({
      utilityId: "UTIL_WEST_PENN_POWER",
      utilityName: "West Penn Power",
      evidenceText:
        "West Penn Energy Fund says projects must benefit West Penn Power ratepayers and ACT 129 Energy Micro Loan applicants must attach a West Penn Power pre-approval letter.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/682/west-penn-power-sef-commercial-loan-program",
        "https://www.westpennenergyfund.org/get-funding"
      ]
    })
  },
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_id:3728",
    opportunityName: "Concord Municipal Light Plant - Solar Photovoltaic Rebate Program",
    utilityRestrictionReview: requiredUtilityReview({
      utilityId: "UTIL_CONCORD_MLP",
      utilityName: "Concord Municipal Light Plant",
      evidenceText:
        "Concord's solar page identifies the CMLP Solar PV Rebate, lets CMLP issue the rebate to the electric account holder, and describes CMLP interconnection and approval steps.",
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/3728/concord-municipal-light-plant-solar-photovoltaic-rebate-program",
        "https://concordma.gov/2029/Solar-Panels"
      ]
    })
  }
];

const availabilityRepairs = [
  {
    opportunityId: "SOURCE_DSIRE:dsire_program_code_title_hash:NY98F:8923b34ebfda",
    opportunityName: "New York City - Residential Solar Sales Tax Exemption",
    sourceName: "DSIRE",
    state: "NY",
    sourceUrl: "https://programs.dsireusa.org/system/program/detail/4703/new-york-city-residential-solar-sales-tax-exemption",
    websiteUrl: "https://www.nysolarmap.com/financing-solar/incentives/residential/",
    availabilityReview: {
      normalizedStatus: "active",
      applicationOpenAt: null,
      applicationDeadlineAt: null,
      questionsDeadlineAt: null,
      programEndAt: null,
      recurring: false,
      noDeadlineExplicit: false,
      evidenceText:
        "DSIRE currently publishes the New York City residential solar sales tax exemption, and NY Solar Map describes New York City/local sales-tax exemption availability in present tense for residential solar energy systems.",
      reasons: ["current_source_present_tense_program"],
      sourceUrlsChecked: [
        "https://programs.dsireusa.org/system/program/detail/4703/new-york-city-residential-solar-sales-tax-exemption",
        "https://www.nysolarmap.com/financing-solar/incentives/residential/"
      ],
      fetchErrors: [],
      reviewedAt,
      reviewMethod: "manual_source_research_repair",
      confidence: 0.82
    }
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
        UpdateExpression: "SET utilityRestrictionReview = :review, utilityRestrictionReviewUpdatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":review": repair.utilityRestrictionReview,
          ":updatedAt": reviewedAt
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
}

writeRepairReport({
  reviewedAt,
  utilityRepairs,
  availabilityRepairs,
  writeDynamoDb,
  utilityStatusCounts: utilityArtifact.statusCounts,
  availabilityStatusCounts: availabilityArtifact.statusCounts
});

console.log("Targeted matching review repairs applied.");
console.log(`Utility repairs: ${utilityRepairs.length}`);
console.log(`Availability repairs: ${availabilityRepairs.length}`);
console.log(`DynamoDB writes: ${writeDynamoDb ? "yes" : "no"}`);
console.log(`Repair report: ${repairReportPath}`);

function requiredUtilityReview({ utilityId, utilityName, evidenceText, sourceUrlsChecked }) {
  return {
    restrictionStatus: "required",
    requiredUtilityIds: [utilityId],
    requiredUtilityNames: [],
    allowedSupplierIds: [],
    rateClasses: [],
    customerRelationshipRequired: true,
    evidenceText,
    reviewMethod: "manual_source_research_repair",
    sourceUrlsChecked,
    fetchErrors: [],
    reviewedAt,
    confidence: 0.9
  };
}

function notApplicableUtilityReview({ evidenceText, sourceUrlsChecked }) {
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
    confidence: 0.82
  };
}

function upsertReviews(artifact, repairs, reviewFieldName) {
  const rows = Array.isArray(artifact.reviews) ? artifact.reviews : [];
  const byId = new Map(rows.map((row) => [row.opportunityId, row]));

  for (const repair of repairs) {
    const current = byId.get(repair.opportunityId) || {
      opportunityId: repair.opportunityId,
      opportunityName: repair.opportunityName,
      sourceName: repair.sourceName || "DSIRE",
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
}

function writeRepairReport({ reviewedAt, utilityRepairs, availabilityRepairs, writeDynamoDb, utilityStatusCounts, availabilityStatusCounts }) {
  const lines = [
    "# Matching Review Repair Report",
    "",
    `Generated: ${reviewedAt}`,
    `DynamoDB writes: ${writeDynamoDb ? "yes" : "no"}`,
    "",
    "## Repair Standard",
    "",
    "- Data repairs must resolve the canonical field when source evidence is sufficient; do not leave known-title or known-administrator utility programs as `unknown`.",
    "- For utility-administered programs, use title, administrator, official program page, and customer/service-territory language together to set a stable utility ID or supported required utility names.",
    "- For statewide loans, tax incentives, and agency programs with no customer-utility gate after source review, use `not_applicable` instead of `unknown`.",
    "- For availability, use `active`, `rolling`, `upcoming`, or `unavailable` when current source evidence supports it; `uncertain` is temporary and must trigger another review.",
    "- If a source site returns HTTP 429, HTTP 5xx, or times out, wait for the configured retry window and retry before accepting an unresolved review result.",
    "",
    "## Utility Repairs",
    ""
  ];

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

  lines.push("", "## Availability Repairs", "");
  for (const repair of availabilityRepairs) {
    const review = repair.availabilityReview;
    lines.push(
      `- ${repair.opportunityName} (${repair.opportunityId})`,
      `  - status: ${review.normalizedStatus}`,
      `  - evidence: ${review.evidenceText}`,
      `  - sources: ${review.sourceUrlsChecked.join(", ")}`
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

function countBy(values, keyFn) {
  const counts = {};
  for (const value of values) {
    const key = keyFn(value);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function createDbClient() {
  return DynamoDBDocumentClient.from(
    new DynamoDBClient({
      region,
      credentials: profile ? fromIni({ profile }) : undefined
    })
  );
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
