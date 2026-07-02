import fs from "node:fs/promises";
import { resolveOpportunityApplicationSource } from "../server/applicationSources/ApplicationSourceResolver.mjs";
import { resolveOfficialProgramWebsite } from "../server/applicationSources/OfficialProgramWebsiteResolver.mjs";
import { discoverOpportunityApplicationLinks } from "../server/applicationSources/ApplicationPathFinder.mjs";
import { extractOpportunityApplicationRequirements } from "../server/applicationSources/ApplicationRequirementExtractor.mjs";
import { composeDraftApplicationProfile, validateApplicationProfile } from "../server/applicationSources/ApplicationProfile.mjs";
import { fetchSourceContent, sourceContentSnippet } from "../server/applicationSources/SourceContentFetcher.mjs";

const INPUT_PATH = "APPLICATION_PREP_FIRST_10_EXPORT.json";
const OUTPUT_JSON_PATH = "APPLICATION_PREP_FIRST_10_AFTER_FIX.json";
const OUTPUT_MD_PATH = "APPLICATION_PREP_FIRST_10_AFTER_FIX.md";

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function firstUrl(...values) {
  for (const value of values) {
    const text = cleanText(value);
    if (!text) continue;
    try {
      const parsed = new URL(text);
      if (["http:", "https:"].includes(parsed.protocol)) return parsed.href;
    } catch {
      // Ignore malformed URLs in export data.
    }
  }
  return "";
}

function countUsefulRequirements(profile) {
  return (profile?.requiredFields?.length || 0) + (profile?.requiredDocuments?.length || 0) + (profile?.optionalFields?.length || 0);
}

async function readFirstTenExport() {
  const parsed = JSON.parse(await fs.readFile(INPUT_PATH, "utf8"));
  const opportunities = Array.isArray(parsed) ? parsed : parsed.opportunities || [];
  return opportunities.slice(0, 10).map((item, index) => ({
    indexOnAdminPage: item.indexOnAdminPage || index + 1,
    exportItem: item,
    opportunity: item.rawOpportunity || item.opportunity || item
  }));
}

async function sourceSnippetForProfile(pathProfile, requirementProfile) {
  const sourceUrl = firstUrl(
    requirementProfile?.sourceUrl,
    pathProfile?.applicationUrl,
    pathProfile?.bestApplicationUrl,
    pathProfile?.bestPdfUrl,
    pathProfile?.programWebsiteUrl,
    pathProfile?.programSourceUrl
  );
  if (!sourceUrl) return null;
  const fetched = await fetchSourceContent(sourceUrl, { timeoutMs: 10_000, maxResponseBytes: 400_000 });
  return {
    sourceUrl,
    title: fetched.title,
    contentType: fetched.contentType,
    httpStatus: fetched.httpStatus,
    error: fetched.error,
    cleanedTextSnippet: sourceContentSnippet(fetched, 4000),
    linkCandidates: fetched.links?.slice(0, 20) || []
  };
}

function aggregate(results) {
  return {
    programWebsitesFound: results.filter((item) => item.applicationPathProfile?.programWebsiteUrl).length,
    applicationArtifactsFound: results.filter((item) => item.applicationPathProfile?.applicationArtifacts?.length).length,
    applicationUrlsFound: results.filter((item) => item.applicationPathProfile?.applicationUrl || item.applicationPathProfile?.bestApplicationUrl).length,
    pdfsSupportingDocsFound: results.filter((item) => item.applicationPathProfile?.bestPdfUrl || item.applicationPathProfile?.applicationArtifacts?.some((artifact) => ["pdf", "guidelines", "checklist", "supporting_document", "grant_package"].includes(artifact.type))).length,
    contactEmailsFound: results.filter((item) => item.applicationPathProfile?.bestContactEmail || item.applicationPathProfile?.contactEmail).length,
    usefulRequirementsExtracted: results.filter((item) => countUsefulRequirements(item.applicationRequirementProfile) > 0).length,
    needsReview: results.filter((item) => ["needs_review", "not_attempted", "source_unavailable"].includes(item.applicationRequirementProfile?.extractionStatus)).length,
    jsBlocked: results.filter((item) => item.applicationPathProfile?.applicationStatus === "source_unreadable_or_js_required" || item.applicationRequirementProfile?.extractionStatus === "source_unreadable_or_js_required").length,
    needsUserSelection: results.filter((item) => item.applicationPathProfile?.applicationStatus === "needs_user_selection" || item.applicationRequirementProfile?.extractionStatus === "needs_user_selection").length,
    closedFundingExhausted: results.filter((item) => ["closed", "funding_exhausted"].includes(item.applicationPathProfile?.applicationStatus)).length
  };
}

function list(items, mapper) {
  const values = (items || []).map(mapper).filter(Boolean);
  return values.length ? values.map((value) => `  - ${value}`).join("\n") : "  - None";
}

function markdownReport(results, counts) {
  const lines = [
    "# Application Prep First 10 After Fix",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Aggregate Counts",
    "",
    `- Program websites found: ${counts.programWebsitesFound}/10`,
    `- Application artifacts found: ${counts.applicationArtifactsFound}/10`,
    `- Application URLs found: ${counts.applicationUrlsFound}/10`,
    `- PDFs/supporting docs found: ${counts.pdfsSupportingDocsFound}/10`,
    `- Contact emails found: ${counts.contactEmailsFound}/10`,
    `- Useful requirements extracted: ${counts.usefulRequirementsExtracted}/10`,
    `- Needs review: ${counts.needsReview}/10`,
    `- JS/blocked: ${counts.jsBlocked}/10`,
    `- Needs user selection: ${counts.needsUserSelection}/10`,
    `- Closed/funding exhausted: ${counts.closedFundingExhausted}/10`,
    ""
  ];

  for (const item of results) {
    const path = item.applicationPathProfile;
    const req = item.applicationRequirementProfile;
    const validation = item.validation;
    lines.push(
      `## Opportunity ${item.indexOnAdminPage}: ${item.opportunityName || item.opportunityId}`,
      "",
      `- Opportunity ID: ${item.opportunityId}`,
      `- Official website used: ${path.programWebsiteUrl || "Not found"}`,
      `- Website source: ${path.programWebsiteSource || item.officialProgramWebsiteProfile?.programWebsiteSource || "Not found"}`,
      `- DSIRE/source URL: ${path.programSourceUrl || "Not found"}`,
      `- Application URL: ${path.applicationUrl || path.bestApplicationUrl || "Not found"}`,
      `- PDF URL: ${path.pdfUrl || path.bestPdfUrl || "Not found"}`,
      `- Contact email: ${path.contactEmail || path.bestContactEmail || "Not found"}`,
      `- Application method: ${path.applicationMethod}`,
      `- Application status: ${path.applicationStatus}`,
      `- Path status: ${path.pathStatus}`,
      `- Requirement extraction status: ${req.extractionStatus}`,
      `- Required fields: ${req.requiredFields.length}`,
      `- Required documents: ${req.requiredDocuments.length}`,
      `- Optional fields: ${req.optionalFields.length}`,
      `- Validation: ${validation.valid ? "valid" : "invalid"}`,
      "",
      "### Source Chain",
      list(path.sourceChain, (entry) => `${entry.role} ${entry.status || "candidate"} ${entry.url || entry.email || ""} ${entry.sourceField ? `(${entry.sourceField})` : ""}`),
      "",
      "### Artifacts",
      list(path.applicationArtifacts, (artifact) => `${artifact.type}: ${artifact.label}${artifact.url ? ` - ${artifact.url}` : artifact.email ? ` - ${artifact.email}` : ""}`),
      "",
      "### Required Fields",
      list(req.requiredFields, (field) => `${field.label} (${field.confidence}) - ${field.evidenceSnippet || "no snippet"}`),
      "",
      "### Required Documents",
      list(req.requiredDocuments, (doc) => `${doc.label} (${doc.confidence}) - ${doc.evidenceSnippet || "no snippet"}`),
      "",
      "### Application Steps",
      list(req.applicationSteps, (step) => step),
      "",
      "### Evidence",
      list([...((path.evidence || []).slice(0, 4)), ...((req.evidence || []).slice(0, 4))], (evidence) => `${evidence.label}: ${evidence.textSnippet || evidence.reason || evidence.url || ""}`),
      "",
      "### Validation Warnings",
      list(validation.warnings, (warning) => warning),
      "",
      "### Notes",
      list([...((path.notes || []).slice(0, 4)), ...((req.notes || []).slice(0, 4))], (note) => note),
      ""
    );
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const input = await readFirstTenExport();
  const results = [];

  for (const item of input) {
    const opportunity = item.opportunity;
    const applicationSourceProfile = resolveOpportunityApplicationSource(opportunity);
    const officialProgramWebsiteProfile = resolveOfficialProgramWebsite(opportunity);
    const applicationPathProfile = await discoverOpportunityApplicationLinks({
      opportunity,
      sourceProfile: applicationSourceProfile
    });
    const applicationRequirementProfile = await extractOpportunityApplicationRequirements({
      opportunity,
      sourceProfile: applicationSourceProfile,
      pathProfile: applicationPathProfile
    });
    const draftApplicationProfile = composeDraftApplicationProfile({
      opportunity,
      officialProgramWebsiteProfile,
      applicationPathProfile,
      applicationRequirementProfile
    });
    const validation = validateApplicationProfile(draftApplicationProfile, {
      extractionStatus: applicationRequirementProfile.extractionStatus,
      createdAutomatically: true
    });
    const sourceTextSnippet = await sourceSnippetForProfile(applicationPathProfile, applicationRequirementProfile).catch((error) => ({
      error: cleanText(error?.message || "Could not fetch source snippet.")
    }));

    results.push({
      indexOnAdminPage: item.indexOnAdminPage,
      opportunityId: String(opportunity?.opportunityId || item.exportItem?.opportunityId || ""),
      opportunityName: opportunity?.canonicalTitle || opportunity?.normalizedTitle || item.exportItem?.opportunityName,
      rawOpportunity: opportunity,
      applicationSourceProfile,
      officialProgramWebsiteProfile,
      applicationPathProfile,
      applicationRequirementProfile,
      draftApplicationProfile,
      validation,
      sourceTextSnippet
    });
  }

  const aggregateCounts = aggregate(results);
  await fs.writeFile(
    OUTPUT_JSON_PATH,
    JSON.stringify(
      {
        schemaVersion: "application-prep-first10-after-fix/v1",
        generatedAt: new Date().toISOString(),
        aggregateCounts,
        results
      },
      null,
      2
    )
  );
  await fs.writeFile(OUTPUT_MD_PATH, markdownReport(results, aggregateCounts));
  console.log(`Wrote ${OUTPUT_JSON_PATH}`);
  console.log(`Wrote ${OUTPUT_MD_PATH}`);
  console.log(JSON.stringify(aggregateCounts, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
