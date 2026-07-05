import fs from "node:fs/promises";
import { resolveOpportunityApplicationSource } from "../apps/api/server/applicationSources/ApplicationSourceResolver.mjs";
import { resolveOfficialProgramWebsite } from "../apps/api/server/applicationSources/OfficialProgramWebsiteResolver.mjs";
import { discoverOpportunityApplicationLinks } from "../apps/api/server/applicationSources/ApplicationPathFinder.mjs";
import { extractOpportunityApplicationRequirements } from "../apps/api/server/applicationSources/ApplicationRequirementExtractor.mjs";
import { composeDraftApplicationProfile, validateApplicationProfile } from "../apps/api/server/applicationSources/ApplicationProfile.mjs";
import { fetchSourceContent, sourceContentSnippet } from "../apps/api/server/applicationSources/SourceContentFetcher.mjs";

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
  const qualityCount = (quality) => results.filter((item) => item.draftApplicationProfile?.profileQuality === quality).length;
  const pdfDiagnostics = results.map((item) => item.applicationRequirementProfile?.extractionDiagnostics || {});
  return {
    programWebsitesFound: results.filter((item) => item.applicationPathProfile?.programWebsiteUrl).length,
    applicationArtifactsFound: results.filter((item) => item.applicationPathProfile?.applicationArtifacts?.length).length,
    primaryApplicationArtifactsFound: results.filter((item) => item.applicationPathProfile?.primaryApplicationArtifacts?.length).length,
    unrelatedArtifactsFiltered: results.reduce((sum, item) => sum + (item.applicationPathProfile?.artifactDiagnostics?.filteredCount || 0), 0),
    applicationUrlsFound: results.filter((item) => item.applicationPathProfile?.applicationUrl || item.applicationPathProfile?.bestApplicationUrl).length,
    pdfsSupportingDocsFound: results.filter((item) => item.applicationPathProfile?.bestPdfUrl || item.applicationPathProfile?.applicationArtifacts?.some((artifact) => ["pdf", "guidelines", "checklist", "supporting_document", "grant_package"].includes(artifact.type))).length,
    pdfsFetched: pdfDiagnostics.reduce((sum, diagnostic) => sum + (diagnostic.pdfsFetched || 0), 0),
    pdfsTextExtracted: pdfDiagnostics.reduce((sum, diagnostic) => sum + (diagnostic.pdfsTextExtracted || 0), 0),
    contactEmailsFound: results.filter((item) => item.applicationPathProfile?.bestContactEmail || item.applicationPathProfile?.contactEmail).length,
    usefulRequirementsExtracted: results.filter((item) => countUsefulRequirements(item.applicationRequirementProfile) > 0).length,
    requirementsReadyForAdminReview: qualityCount("requirements_ready_for_admin_review"),
    artifactsFoundRequirementsMissing: qualityCount("artifacts_found_requirements_missing"),
    needsPdfTextExtraction: qualityCount("needs_pdf_text_extraction"),
    needsFormFieldExtraction: qualityCount("needs_form_field_extraction"),
    needsTargetedCleanup: qualityCount("needs_targeted_cleanup"),
    needsManualReview: qualityCount("needs_manual_review"),
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

function nextAction(item) {
  const quality = item.draftApplicationProfile?.profileQuality;
  if (quality === "requirements_ready_for_admin_review") return "Ready for admin review of extracted requirements and evidence.";
  if (quality === "needs_pdf_text_extraction") return "Review PDF extraction diagnostics or manually inspect the primary PDF artifacts.";
  if (quality === "needs_form_field_extraction") return "Review the application form page and improve form field parsing if fields are hidden in scripts.";
  if (quality === "needs_targeted_cleanup") return "Review the targeted cleanup warnings before treating this as ready for admin review.";
  if (quality === "source_unreadable_or_js_required") return "Open the official source manually; server-side discovery could not read the page.";
  if (quality === "needs_user_selection") return "Select the required utility/town/service territory before extracting final requirements.";
  if (quality === "closed_but_profile_extractable") return "Keep as closed/funding-exhausted reference profile; do not mark ready-to-apply.";
  if (quality === "artifacts_found_requirements_missing") return "Manually inspect the retained artifacts or add a narrower parser for this artifact type.";
  return "Needs manual review before this can become an admin-reviewed ApplicationProfile.";
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
    `- Primary application artifacts found: ${counts.primaryApplicationArtifactsFound}/10`,
    `- Unrelated artifacts filtered: ${counts.unrelatedArtifactsFiltered}`,
    `- Application URLs found: ${counts.applicationUrlsFound}/10`,
    `- PDFs/supporting docs found: ${counts.pdfsSupportingDocsFound}/10`,
    `- PDFs fetched: ${counts.pdfsFetched}`,
    `- PDFs text-extracted: ${counts.pdfsTextExtracted}`,
    `- Contact emails found: ${counts.contactEmailsFound}/10`,
    `- Useful requirements extracted: ${counts.usefulRequirementsExtracted}/10`,
    `- Requirements ready for admin review: ${counts.requirementsReadyForAdminReview}/10`,
    `- Artifacts found but requirements missing: ${counts.artifactsFoundRequirementsMissing}/10`,
    `- Needs PDF text extraction: ${counts.needsPdfTextExtraction}/10`,
    `- Needs form field extraction: ${counts.needsFormFieldExtraction}/10`,
    `- Needs targeted cleanup: ${counts.needsTargetedCleanup}/10`,
    `- Needs manual review: ${counts.needsManualReview}/10`,
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
      `- Primary method: ${path.primaryMethod || path.applicationMethod}`,
      `- Secondary methods: ${(path.secondaryMethods || []).join(", ") || "None"}`,
      `- Application status: ${path.applicationStatus}`,
      `- Path status: ${path.pathStatus}`,
      `- Requirement extraction status: ${req.extractionStatus}`,
      `- Profile quality: ${item.draftApplicationProfile?.profileQuality || "Not assessed"}`,
      `- PDF text status: ${req.extractionDiagnostics?.pdfTextExtractionStatus || "not_attempted"}`,
      `- Form field extraction: ${req.extractionDiagnostics?.formFieldExtractionStatus || "not_attempted"}`,
      `- Grant extraction: ${req.extractionDiagnostics?.grantExtractionStatus || "not_attempted"}`,
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
      "### Artifact Filtering Diagnostics",
      list(path.artifactDiagnostics?.filteredArtifacts, (artifact) => `${artifact.label || artifact.url || artifact.email}: ${artifact.filterReason || artifact.relevanceReason || "filtered"}`),
      "",
      "### Extraction Sources",
      list(req.extractionDiagnostics?.sourcesInspected, (source) => `${source.role}: ${source.url} (${source.status}${source.pdfExtractionStatus ? `, ${source.pdfExtractionStatus}` : ""}${source.extractedCount ? `, ${source.extractedCount} extracted` : ""})`),
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
      "### Quality Warnings",
      list(item.draftApplicationProfile?.qualityWarnings, (warning) => warning),
      "",
      `### Next Action`,
      "",
      nextAction(item),
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
        schemaVersion: "application-prep-first10-after-fix/v2",
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
