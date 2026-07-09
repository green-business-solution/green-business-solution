import { ChangeEvent, CSSProperties, DragEvent, FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./api";
import type { AuthCredential } from "./authTypes";
import {
  AUTH_CREDENTIAL_STORAGE_KEY,
  ENERGY_DATA_UPLOAD_SESSION_STORAGE_KEY,
  OAUTH_REDIRECT_ERROR_KEY,
  OAUTH_REDIRECT_RESULT_KEY,
  OPPORTUNITIES_TABLE_NAME,
  STALE_SESSION_KEYS
} from "./config";
import { databaseProgramMatchesSearch } from "./databaseSearch";
import { RetroFiLogoLoader, RetroFiPageLoader, RetroFiProgressLoader, RetroFiSkeleton } from "./components/RetroFiLoader";
import { ScrollFrameScanner } from "./components/ScrollFrameScanner";
import { GoogleSignInButton } from "./googleSignIn";
import {
  BuildingOutlineIcon,
  CheckIcon,
  EyeIcon,
  FactoryOutlineIcon,
  GraduationCapOutlineIcon,
  HandHeartOutlineIcon,
  HomeOutlineIcon,
  LandmarkOutlineIcon,
  LeafOutlineIcon,
  LockIcon,
  MoreHorizontalOutlineIcon,
  StoreOutlineIcon
} from "./icons";
import {
  aboutLinks,
  pathForRoute,
  routeFromPath,
  shouldCanonicalizeUnknownHomeFallback,
  type Route
} from "./routes";
import { scannerFrames } from "./lib/scannerFrames";
import billFieldDictionary from "../../../data/bill_field_dictionary.json";

type UserRecord = {
  userId: string;
  role: "client" | "admin";
  status: string;
  fullName: string;
  email: string;
  companyName: string | null;
  authProvider: string;
  googleLinked: boolean;
  googlePicture?: string | null;
  passwordLinked?: boolean;
  isFakeUser: boolean;
  sampleUserId?: string | null;
  createdAt: string;
  lastLoginAt: string | null;
};

type PublicAuthState = {
  isAdmin: boolean;
  isSignedIn: boolean;
  onSignOut: () => void;
};

type UtilityFileType = "green_button_xml" | "green_button_csv" | "utility_pdf" | "unknown";
type UtilityCategory = "electric" | "gas" | "water_sewer" | "waste" | "unknown";
type UtilityUploadCategory = UtilityCategory | "auto_detect";

type UploadedUtilityFile = {
  fileId: string;
  clientIntakeId: string;
  siteId: string | null;
  originalFilename: string;
  fileType: UtilityFileType;
  utilityCategory: UtilityCategory;
  utilityProvider: string | null;
  s3Key: string;
  processingStatus: "uploaded" | "processing" | "processed" | "needs_review" | "failed";
  uploadedAt: string;
  processedAt: string | null;
  errorMessage: string | null;
};

type UtilityExtractedValue = {
  extractedValueId: string;
  clientIntakeId: string;
  fileId: string;
  fieldId: string;
  fieldDisplayName: string;
  value: string | number | null;
  unit: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  confidence: string | null;
  sourceType: UtilityFileType;
  sourceText: string | null;
  sourcePath: string | null;
};

type SiteEnergyProfile = {
  siteId: string;
  uploadedFileCount: number;
  processedFileCount: number;
  availableFieldIds: string[];
  latestUtilityProvider: string | null;
  latestBillingPeriodStart: string | null;
  latestBillingPeriodEnd: string | null;
  annualKwh: number | null;
  annualElectricCost: number | null;
  averageCostPerKwh: number | null;
  monthlySummaries: Array<{
    periodStart: string | null;
    periodEnd: string | null;
    kwh: number | null;
    cost: number | null;
  }>;
  utilitySummaries: Array<{
    utilityCategory: UtilityCategory;
    uploadedFileCount: number;
    processedFileCount: number;
    availableFieldIds: string[];
    latestUtilityProvider: string | null;
    latestBillingPeriodStart: string | null;
    latestBillingPeriodEnd: string | null;
    annualUsage: number | null;
    annualCost: number | null;
    averageUnitCost: number | null;
    usageUnit: string | null;
    monthlySummaries: Array<{
      periodStart: string | null;
      periodEnd: string | null;
      usage: string | number | null;
      unit: string | null;
      cost: string | number | null;
    }>;
    lastUpdatedAt: string | null;
  }>;
  lastUpdatedAt: string | null;
};

type PreRetrofitFormAnswerValue = {
  questionId: string;
  catalogQuestionId?: string;
  canonicalInputKey?: string;
  retrofitId?: string;
  retrofitName?: string;
  opportunityId?: string;
  requirementId?: string;
  requirementType?: string;
  applicationSection?: string;
  questionKind?: string;
  collectionStage?: string;
  collectionSurface?: string;
  question: string;
  answerType: "text" | "number" | "select" | "boolean" | "file" | "date";
  value: string;
  options?: string[];
  updatedAt?: string;
};

type PreRetrofitFormRetrofitAnswers = {
  retrofitTypeId: string;
  retrofitName: string;
  updatedAt?: string;
  answerCount: number;
  answerOrder: string[];
  answers: Record<string, PreRetrofitFormAnswerValue>;
};

type PreRetrofitFormAnswers = {
  schemaVersion: "pre-retrofit-form-answers-v1";
  updatedAt?: string;
  retrofits: Record<string, PreRetrofitFormRetrofitAnswers>;
};

type IntakeRecord = {
  userId: string;
  submissionId: string;
  contact: {
    fullName: string | null;
    email: string;
    phone: string | null;
    roleTitle: string | null;
    contactPreference: string | null;
  };
  business: {
    companyName: string;
    website: string | null;
    industry: string;
    organizationType?: string;
    organizationSize: string;
    headquarters: string;
  };
  site?: {
    address: string;
    geography?: {
      schemaVersion?: string;
      status?: string;
      provider?: string | null;
      matchedAddress?: string | null;
      coordinates?: { lat: number; lng: number } | null;
      country?: string | null;
      stateCode?: string | null;
      stateFips?: string | null;
      countyFips?: string | null;
      countyName?: string | null;
      placeGeoid?: string | null;
      placeName?: string | null;
      censusTractGeoid?: string | null;
      censusBlockGeoid?: string | null;
      zip5?: string | null;
      notes?: string[];
    } | null;
    electricUtilityProvider: string;
    gasUtilityProvider?: string | null;
    ownershipStatus: string;
    buildingType: string;
    squareFootage: string;
    numberOfUnits?: string | null;
    derivedFieldsPlanned?: string[];
    derivedFieldsStatus?: string;
  };
  sustainability: {
    goals: string;
    currentChallenges: string;
    interestedImprovements?: string[];
    monthlyUtilitySpend: string | null;
    timeline: string;
    notes: string | null;
  };
  uploadedUtilityFiles: UploadedUtilityFile[];
  utilityExtractedValues: UtilityExtractedValue[];
  siteEnergyProfile: SiteEnergyProfile | null;
  preRetrofitFormAnswers?: PreRetrofitFormAnswers | null;
  createdAt: string;
  updatedAt: string;
};

type PortalPayload = {
  user: UserRecord;
  intake: IntakeRecord | null;
};
type AdminClientPortalProfilePayload = PortalPayload;

type PortalRetrofitRecommendationsResponse = PortalPayload & {
  generatedAt: string;
  source?: {
    kind?: string;
    sampleUserId?: string | null;
  };
  isProgressiveShell?: boolean;
  isPartialRecommendations?: boolean;
  dashboardPostImplementationDataset?: DashboardPostImplementationDataset | null;
  summary: {
    matchedRetrofitCount: number;
    matchedOpportunityCount: number;
    canShowOpportunities?: boolean;
    taxIntakeRequiredBeforeOpportunityDisplay?: boolean;
    requiredTaxInputCount?: number;
    calculatedTaxBenefitCents?: number;
    calculatedTaxLiabilityCents?: number;
    netTaxImpactCents?: number;
  };
  taxRuntimePreview?: TaxRuntimePreview | null;
  retrofits: SampleRetrofitGroup[];
};

type PreRetrofitFormSaveResponse = {
  intake: IntakeRecord;
  preRetrofitFormAnswers: PreRetrofitFormAnswers | null;
  savedRetrofit: PreRetrofitFormRetrofitAnswers | null;
};

type TaxRuntimeInputField = {
  inputKey: string;
  label?: string;
  questionPrompt?: string;
  helperText?: string;
  answerType?: "text" | "number" | "select" | "boolean";
  valueType?: string;
  options?: string[];
  unit?: string | null;
  collectionSurface?: string;
  collectionSurfaceLabel?: string;
  collectionSourceType?: string;
  fieldId?: string;
  requiredBeforeEstimate?: boolean;
  requiredBeforeOpportunitySelection?: boolean;
  collectionStage?: string;
};

type TaxRuntimePreview = {
  schemaVersion?: string;
  status?: string;
  opportunityDisplayBlocked?: boolean;
  readyForOpportunityFinancialEstimate?: boolean;
  requiresStructuredTaxModelWork?: boolean;
  requiredPreOpportunityInputs?: TaxRuntimeInputField[];
  totals?: {
    includedBenefitCents?: number;
    includedLiabilityCents?: number;
    includedAmountCents?: number;
  };
};

type DashboardPostImplementationDataset = {
  schemaVersion: "dashboard-post-implementation-v1";
  testCaseId: string;
  businessId?: string;
  userId?: string;
  isSynthetic: boolean;
  syntheticSource?: "admin_test_case_seed" | string;
  generatedAt: string;
  updatedAt: string;
  storageStatus?: string;
  reportingPeriod: { startDate: string; endDate: string; label: string };
  properties: Array<Record<string, unknown>>;
  implementedRetrofits: Array<Record<string, unknown>>;
  monthlyPerformanceRecords: Array<Record<string, unknown>>;
  incentivePerformanceRecords: Array<Record<string, unknown>>;
  documentRecords: Array<Record<string, unknown>>;
  certificationRecords: Array<Record<string, unknown>>;
  certificationRequirements: Array<Record<string, unknown>>;
  nextBestActions: Array<Record<string, unknown>>;
  dataQuality?: { status: string; notes: string[]; warnings: string[] };
};

type PortalPreviewHint = {
  clientName: string;
  companyName: string | null;
  email: string;
};

type EnergyDataUploadSession = {
  userId: string;
  submissionId: string;
  token: string;
  expiresAt: string;
};

type EnergyDataRegisterResponse = {
  intake: IntakeRecord;
  uploadedUtilityFile: UploadedUtilityFile;
  utilityExtractedValues: UtilityExtractedValue[];
  siteEnergyProfile: SiteEnergyProfile | null;
};

type EnergyDataSessionPayload = {
  intake: IntakeRecord | null;
  uploadSession: Omit<EnergyDataUploadSession, "token"> | null;
  uploadedUtilityFiles: UploadedUtilityFile[];
  utilityExtractedValues: UtilityExtractedValue[];
  siteEnergyProfile: SiteEnergyProfile | null;
};

type IntakeSubmissionPayload = PortalPayload & {
  uploadSession: EnergyDataUploadSession | null;
};

type AdminRow = {
  user: UserRecord;
  intake: IntakeRecord | null;
};

type BillFieldDictionaryEntry = {
  id: string;
  display_name: string;
  bill_type?: string;
  unit?: string;
};

type DatabaseTableSnapshot = {
  name: string;
  recordCount: number;
  loadedCount?: number;
  isTruncated?: boolean;
  note?: string | null;
  records: unknown[];
};

type MatchParameter = {
  values?: unknown;
  mode?: string;
  min?: number | null;
  max?: number | null;
  confidence?: string;
  method?: string;
  rationale?: string;
};

type OpportunityEvidence = {
  sourceName?: string;
  sourceUrl?: string;
  documentType?: string;
  sectionHeading?: string;
  sectionCategory?: string;
  retrievedAt?: string;
  extractedText?: string | null;
};

type OpportunitySourceRecord = {
  sourceKey?: string;
  sourceName?: string;
  sourceUrl?: string;
  externalId?: string;
  externalIdType?: string;
  ingestionMode?: string;
  ingestRunId?: string;
  evidence?: OpportunityEvidence[];
};

type OpportunityRecord = {
  opportunityId: string;
  IUID?: string;
  canonicalTitle?: string;
  normalizedTitle?: string;
  sourceKey?: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceRecords?: OpportunitySourceRecord[];
  externalId?: string;
  externalIdType?: string;
  ingestionMode?: string;
  ingestRunId?: string;
  origin?: {
    sourceKey?: string;
    sourceName?: string;
    sourceUrl?: string;
    sourceBaseUrl?: string;
    documentType?: string;
  };
  status?: string;
  sourceStatus?: string;
  reviewStatus?: string;
  reviewNotes?: string | null;
  duplicateOf?: string | null;
  reviewedAt?: string;
  reviewedBy?: {
    fullName?: string;
    email?: string;
  };
  category?: string;
  categoryId?: string;
  programType?: string;
  programTypeId?: string;
  summary?: string;
  summaryHtml?: string;
  state?: string;
  stateName?: string;
  geography?: unknown;
  administrator?: string;
  deliveryPartner?: string | null;
  applicationUrl?: string | null;
  websiteUrl?: string | null;
  technologies?: unknown;
  sectors?: unknown;
  details?: unknown;
  detailLabels?: unknown;
  dsire?: unknown;
  matchingParameters?: {
    zipCode?: MatchParameter;
    utilityProvider?: MatchParameter;
    businessClassification?: MatchParameter;
    squareFootage?: MatchParameter;
    demandKw?: MatchParameter;
    matchingWarnings?: unknown;
    [key: string]: unknown;
  };
  eligibilityRules?: unknown;
  evidence?: OpportunityEvidence[];
  dataQuality?: {
    status?: string;
    isWritable?: boolean;
    criticalIssues?: unknown;
    warnings?: unknown;
  };
  contentHash?: string;
  previousContentHash?: string | null;
  raw?: unknown;
  firstSeenAt?: string;
  createdAt?: string;
  updatedAt?: string;
  lastSeenAt?: string;
};

type OpportunityReviewResponse = {
  opportunity: OpportunityRecord;
};

type AdminPayload = {
  admin: UserRecord;
  users: AdminRow[];
  dataTables: DatabaseTableSnapshot[];
};

type AdminUsersResponse = {
  users: AdminRow[];
};

type AdminUserPreviewOptionsResponse = {
  options: UserPreviewOption[];
};

type GptProPromptFile = {
  batchId: string;
  displayName: string;
  outputExists: boolean;
  outputKey: string;
  outputLastModifiedAt: string | null;
  outputPath: string;
  outputSizeBytes: number;
  promptKey: string;
  promptLastModifiedAt: string | null;
  promptPath: string;
  promptSizeBytes: number;
};

type GptProBatch = {
  batchId: string;
  displayName: string;
  latestModifiedAt: string | null;
  objectCount: number;
  outputCount: number;
  promptCount: number;
  promptFiles: GptProPromptFile[];
  storageStatus: string;
  totalBytes: number;
};

type GptProWorkIndexResponse = {
  batches: GptProBatch[];
  bucket: string | null;
  currentBatchId: string | null;
  prefix: string;
  storageStatus: string;
  totals: {
    batchCount: number;
    objectCount: number;
    outputCount: number;
    promptCount: number;
    totalBytes: number;
  };
  warnings?: string[];
};

type GptProWorkContentResponse = {
  batchId: string;
  content: string;
  exists?: boolean;
  outputPath?: string;
  promptPath: string;
  storageStatus: string;
};

type GptProWorkSaveResponse = {
  batchId: string;
  outputPath: string;
  promptPath: string;
  savedAt: string;
  sizeBytes: number;
  storageStatus: string;
};

type FirstmateTaskState = "active" | "completed" | "blocked" | "queued";
type FirstmateTaskReportFeedbackMode = "live-window" | "follow-up-task";
type FirstmateTaskReportStatus = "none" | "final" | "review-ready" | "draft" | "previous" | "repair-ready";

type FirstmateTask = {
  id: string;
  title: string;
  kind: string;
  repo: string;
  project: string | null;
  state: FirstmateTaskState;
  blocked: boolean;
  blockedBy: string[];
  recentStatus: string | null;
  statusState: string | null;
  since: string | null;
  reportedAt: string | null;
  responseNeeded: boolean;
  canRespond: boolean;
  canAssign?: boolean;
  assignmentUnavailableReason?: string | null;
  hasReport: boolean;
  showReportAction?: boolean;
  reportUrl: string | null;
  reportStatus: FirstmateTaskReportStatus;
  reportActionLabel: string | null;
  reportStatusLabel: string | null;
  reportNote: string | null;
  reportIsFinal: boolean;
  reportReviewReady: boolean;
  reportFeedbackMode: FirstmateTaskReportFeedbackMode | null;
  reportFeedbackUnavailableReason: string | null;
  canSendReportFeedback: boolean;
  gptProRepairStatus: string | null;
  gptProRepairReady?: boolean;
  showGptProRepairAction?: boolean;
  gptProRepairUrl: string | null;
  gptProRepairLabel: string | null;
  gptProRepairFallback: boolean;
  gptProRepairUnavailableReason: string | null;
};

type FirstmateTasksResponse = {
  enabled: boolean;
  reason?: string;
  generatedAt: string;
  firstmateHome?: string;
  localAuthBypass?: boolean;
  authMode?: "admin" | "local-bypass";
  activeAgentCount: number;
  totalTaskCount: number;
  counts: Record<FirstmateTaskState, number> & { needsResponse: number };
  tasks: FirstmateTask[];
  warnings?: string[];
};

type FirstmateTaskReportResponse = {
  generatedAt: string;
  taskId: string;
  taskState: FirstmateTaskState | null;
  statusState: string | null;
  recentStatus: string | null;
  reportStatus: FirstmateTaskReportStatus;
  reportStatusLabel: string;
  reportNote: string | null;
  reportIsFinal: boolean;
  reportReviewReady: boolean;
  reportFeedbackMode: FirstmateTaskReportFeedbackMode | null;
  canSendReportFeedback: boolean;
  gptProRepairStatus: string | null;
  gptProRepairReady: boolean;
  markdown: string;
};

type FirstmateTaskRespondResponse = {
  generatedAt: string;
  taskId: string;
  sent: true;
};

type AdminTableResponse = {
  table: DatabaseTableSnapshot;
};

type ApplicationSourceType =
  | "webpage"
  | "pdf"
  | "portal"
  | "utility_portal"
  | "email"
  | "tax_guidance"
  | "contractor_submitted"
  | "unknown";

type ApplicationMethod =
  | "online_portal"
  | "online_form"
  | "pdf"
  | "email"
  | "grant_package"
  | "hybrid_email_online_portal"
  | "contractor_submitted"
  | "utility_portal"
  | "tax_accountant_filing"
  | "program_website_only"
  | "source_only"
  | "unreadable"
  | "needs_review"
  | "unknown";

type SourceExtractionStatus = "not_started" | "source_found" | "source_missing" | "needs_review";
type SourceConfidence = "High" | "Medium" | "Low" | "Needs review";
type ApplicationPathStatus =
  | "application_path_found"
  | "program_website_found"
  | "program_website_only"
  | "source_only"
  | "program_source_only"
  | "contact_only"
  | "needs_review"
  | "unreadable"
  | "source_unreadable"
  | "source_unreadable_or_js_required"
  | "needs_user_selection"
  | "not_attempted";
type ApplicationMethodStatus = "confirmed" | "inferred" | "unknown";
type ApplicationLinkDiscoveryStatus = "application_link_found" | "pdf_found" | "email_found" | "program_website_found" | "source_only" | "needs_review" | "source_unreadable" | "source_unreadable_or_js_required";
type ApplicationStatus =
  | "open"
  | "closed"
  | "funding_exhausted"
  | "future_round_expected"
  | "source_unreadable_or_js_required"
  | "needs_user_selection"
  | "needs_review"
  | "unknown";
type ApplicationLinkCandidateType =
  | "application_url"
  | "pdf_application"
  | "portal"
  | "program_website"
  | "contact_email"
  | "contractor_portal"
  | "tax_guidance"
  | "forms_page"
  | "application_instructions"
  | "unknown";

type ApplicationSourceChainItem = {
  role: string;
  url?: string;
  email?: string;
  sourceField?: string;
  status?: "candidate" | "selected" | "fallback" | "ignored";
  reason?: string;
};

type ApplicationArtifact = {
  type: string;
  label: string;
  url?: string;
  email?: string;
  evidenceSnippet?: string;
  sourceUrl?: string;
  confidence: SourceConfidence;
};

type ApplicationLinkCandidate = {
  url?: string;
  email?: string;
  linkType: ApplicationLinkCandidateType;
  label?: string;
  sourcePageUrl?: string;
  evidenceSnippet?: string;
  score: number;
  confidence: SourceConfidence;
  reason: string;
};

type ApplicationPageInspected = {
  url: string;
  role: "aggregator" | "program_website" | "candidate_page" | "application_candidate" | string;
  status: "fetched" | "failed" | "skipped";
  title?: string;
  error?: string;
};

type OpportunityApplicationSource = {
  opportunityId: string;
  opportunityName?: string;
  retrofitId?: string;
  retrofitName?: string;
  programSourceUrl?: string;
  programWebsiteUrl?: string;
  programWebsiteSource?: string;
  applicationUrl?: string;
  contactEmail?: string;
  applicationStatusHint?: ApplicationStatus;
  sourceChain?: ApplicationSourceChainItem[];
  sourceType: ApplicationSourceType;
  applicationMethod: ApplicationMethod;
  extractionStatus: SourceExtractionStatus;
  sourceConfidence: SourceConfidence;
  notes: string[];
};

type AdminApplicationSourcesResponse = {
  generatedAt: string;
  total: number;
  limit?: number;
  nextCursor?: string | null;
  note?: string | null;
  error?: string;
  sources: OpportunityApplicationSource[];
};

type ApplicationPathEvidence = {
  label: string;
  textSnippet?: string;
  url?: string;
  sourcePage?: string;
  sourceUrl?: string;
  linkText?: string;
  href?: string;
  nearbyText?: string;
  reason?: string;
};

type ApplicationPathProfile = {
  opportunityId: string;
  opportunityName?: string;
  originalSourceUrl?: string;
  isAggregatorSource?: boolean;
  aggregatorType?: "dsire" | "utility_database" | "other" | "unknown";
  programSourceUrl?: string;
  programWebsiteUrl?: string;
  programWebsiteSource?: string;
  discoveredApplicationUrl?: string;
  discoveredPdfUrl?: string;
  discoveredContactEmail?: string;
  bestApplicationUrl?: string;
  bestPdfUrl?: string;
  bestContactEmail?: string;
  pdfUrl?: string;
  contactEmail?: string;
  applicationUrl?: string;
  applicationArtifacts?: ApplicationArtifact[];
  applicationMethod?: ApplicationMethod;
  applicationStatus?: ApplicationStatus;
  linkDiscoveryStatus?: ApplicationLinkDiscoveryStatus;
  discoveryStatus?: ApplicationPathStatus;
  confidence?: SourceConfidence;
  confirmedApplicationMethod: ApplicationMethod;
  methodStatus: ApplicationMethodStatus;
  pathStatus: ApplicationPathStatus;
  candidates?: ApplicationLinkCandidate[];
  pagesInspected?: ApplicationPageInspected[];
  sourceChain?: ApplicationSourceChainItem[];
  evidence: ApplicationPathEvidence[];
  sourceFetchedAt?: string;
  sourceTitle?: string;
  error?: string;
  notes: string[];
};

type AdminApplicationPathDiscoverResponse = {
  generatedAt: string;
  profile: ApplicationPathProfile;
};

type RequirementExtractionStatus =
  | "requirements_extracted"
  | "partial"
  | "needs_review"
  | "source_unavailable"
  | "source_unreadable_or_js_required"
  | "needs_user_selection"
  | "not_attempted";
type RequirementValueStatus = boolean | "unknown";
type ApplicationRequirementType =
  | "field"
  | "document"
  | "eligibility"
  | "preapproval"
  | "contractor"
  | "tax"
  | "signature"
  | "contact"
  | "account_number"
  | "quote"
  | "bill"
  | "invoice"
  | "form"
  | "guidelines"
  | "checklist"
  | "other";

type ApplicationRequirement = {
  id: string;
  label: string;
  description?: string;
  requirementType: ApplicationRequirementType;
  required: boolean;
  sourceUrl?: string;
  evidenceSnippet?: string;
  confidence: SourceConfidence;
};

type ApplicationRequirementEvidence = {
  label: string;
  sourceUrl?: string;
  textSnippet?: string;
};

type ApplicationRequirementProfile = {
  opportunityId: string;
  opportunityName?: string;
  sourceUrl?: string;
  applicationUrl?: string;
  programWebsiteUrl?: string;
  applicationMethod: ApplicationMethod;
  applicationStatus?: ApplicationStatus;
  extractionStatus: RequirementExtractionStatus;
  requiredFields: ApplicationRequirement[];
  requiredDocuments: ApplicationRequirement[];
  optionalFields: ApplicationRequirement[];
  preApprovalRequired?: RequirementValueStatus;
  contractorRequired?: RequirementValueStatus;
  taxReviewRequired?: RequirementValueStatus;
  deadline?: string;
  estimatedTime?: string;
  applicationSteps: string[];
  applicationArtifacts?: ApplicationArtifact[];
  evidence: ApplicationRequirementEvidence[];
  diagnostics?: {
    officialWebsiteUsed: boolean;
    officialWebsiteSource?: string;
    dsireAggregatorSkipped: boolean;
    applicationPathFound: boolean;
    applicationSpecificSectionFound: boolean;
    extractionAllowed: boolean;
    reason?: string;
  };
  extractionDiagnostics?: {
    sourceUsed?: string;
    isAggregatorSource?: boolean;
    aggregatorType?: string;
    applicationPathFound?: boolean;
    applicationSpecificSectionFound?: boolean;
    extractionAllowed?: boolean;
    reason?: string;
  };
  notes: string[];
  error?: string;
};

type AdminApplicationRequirementExtractResponse = {
  generatedAt: string;
  profile: ApplicationRequirementProfile;
};

type ApplicationProfileReviewStatus =
  | "ai_extracted"
  | "needs_review"
  | "needs_targeted_cleanup"
  | "admin_reviewed"
  | "rejected"
  | "archived";

type ApplicationProfileRecord = {
  profileId: string;
  opportunityId: string;
  opportunityName?: string;
  retrofitId?: string;
  retrofitName?: string;
  programSourceUrl?: string;
  programWebsiteUrl?: string;
  programWebsiteSource?: string;
  applicationUrl?: string;
  pdfUrl?: string;
  contactEmail?: string;
  applicationMethod: ApplicationMethod;
  primaryMethod?: ApplicationMethod | string;
  secondaryMethods?: string[];
  applicationStatus: ApplicationStatus;
  profileQuality: string;
  reviewStatus: ApplicationProfileReviewStatus;
  applicationArtifacts?: ApplicationArtifact[];
  primaryApplicationArtifacts?: ApplicationArtifact[];
  requiredFields?: ApplicationRequirement[];
  requiredDocuments?: ApplicationRequirement[];
  optionalFields?: ApplicationRequirement[];
  applicationSteps?: string[];
  evidence?: ApplicationRequirementEvidence[];
  sourceChain?: ApplicationSourceChainItem[];
  artifactDiagnostics?: Record<string, unknown>;
  extractionDiagnostics?: Record<string, unknown>;
  diagnostics?: Record<string, unknown>;
  qualityWarnings?: string[];
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  requiredFieldCount?: number;
  requiredDocumentCount?: number;
  optionalFieldCount?: number;
  primaryArtifactCount?: number;
  qualityWarningCount?: number;
  approvedAsReferenceOnly?: boolean;
  notes?: string[];
};

type AdminApplicationProfilesResponse = {
  generatedAt: string;
  total: number;
  limit?: number;
  nextCursor?: string | null;
  note?: string | null;
  profiles: ApplicationProfileRecord[];
};

type AdminApplicationProfileDetailResponse = {
  generatedAt: string;
  profile: ApplicationProfileRecord;
  customerReady?: boolean;
};

type ApplicationProfileApprovalValidation = {
  allowed: boolean;
  errors: string[];
  warnings: string[];
};

type AdminApplicationProfileMutationResponse = {
  generatedAt: string;
  profile: ApplicationProfileRecord;
  customerReady?: boolean;
  approvalValidation?: ApplicationProfileApprovalValidation;
};

type AdminApplicationProfileImportResponse = {
  generatedAt: string;
  importedCount: number;
  skippedCount: number;
  errorCount?: number;
  errors?: Array<{ opportunityId?: string; opportunityName?: string; message: string }>;
  profiles: Array<{
    opportunityId: string;
    profileId: string;
    reviewStatus: ApplicationProfileReviewStatus;
    profileQuality: string;
    status?: string;
    reason?: string;
  }>;
  skippedProfiles?: Array<{
    opportunityId: string;
    profileId: string;
    reviewStatus: ApplicationProfileReviewStatus;
    profileQuality: string;
    status?: string;
    reason?: string;
  }>;
  skipped?: Array<{ profileId: string; opportunityId: string; reason: string }>;
  scannedCount?: number;
  sourceOpportunityCount?: number;
  note?: string | null;
};

type CustomerApplicationProfileRequirement = ApplicationRequirement & {
  audience?: "customer_facing" | "admin_only" | "contractor_or_installer" | "suspicious" | string;
};

type CustomerApplicationProfile = {
  opportunityId: string;
  programName: string;
  applicationMethod: string;
  applicationStatus: string;
  officialProgramWebsite?: string;
  programSourceUrl?: string;
  applicationUrl?: string;
  pdfUrl?: string;
  contactEmail?: string;
  applicationArtifacts: ApplicationArtifact[];
  requiredFields: CustomerApplicationProfileRequirement[];
  optionalFields: CustomerApplicationProfileRequirement[];
  requiredDocuments: CustomerApplicationProfileRequirement[];
  formQuestions?: RetrofitDetailQuestion[];
  applicationSteps: string[];
  eligibilityRequirements: CustomerApplicationProfileRequirement[];
  deadlinesOrFundingStatus: string[];
  fees: CustomerApplicationProfileRequirement[];
  evidence: ApplicationRequirementEvidence[];
  reviewedAt?: string;
  sourceLinks: Array<{ label: string; url: string }>;
};

type CustomerApplicationProfileResponse = {
  generatedAt: string;
  opportunityId: string;
  status: "customer_ready" | "reference_only" | "unavailable";
  customerReady: boolean;
  referenceOnly: boolean;
  profile: CustomerApplicationProfile | null;
  notice?: string | null;
};

type SampleMatchResult = {
  opportunityId: string;
  opportunityName: string;
  offerId?: string | null;
  retrofitTypeIds?: string[];
  retrofitTypes?: Array<{
    retrofitTypeId: string;
    displayName: string;
    parentCategory: string;
    isPhysicalRetrofit: boolean;
  }>;
  sourceUrl?: string | null;
  websiteUrl?: string | null;
  applicationUrl?: string | null;
  eligibilityStatus: string;
  rankScore: number;
  opportunityDataConfidence: number;
  userProfileCompleteness: number;
  matchedReasons: string[];
  unresolvedRequirements: string[];
  blockers: string[];
  nextQuestion?: {
    criterionId?: string;
    prompt?: string;
  } | null;
  sourceSummary?: {
    state?: string | null;
    sourceName?: string | null;
    programType?: string | null;
    administrator?: string | null;
  };
};

type SampleSavingsLedgerEntry = {
  id?: string;
  kind?: "upfront_cost" | "upfront_savings";
  category: string;
  label?: string;
  amountCents: number;
  source?: string;
  formula?: string | null;
};

type SampleRecurringSavingsEntry = {
  id?: string;
  kind?: "recurring_savings" | "recurring_expense";
  category: string;
  label?: string;
  amountCents: number;
  period: "monthly" | "annual";
  allowMonthlyProration?: boolean;
  annualizedAmountCents?: number;
  source?: string;
  formula?: string | null;
};

type SampleCalculationTraceStep = {
  id?: string;
  label: string;
  category: string;
  formula: string;
  result?: {
    value: number;
    unit: string;
  };
};

type IncentiveCalculationPackageSummary = {
  opportunityId: string;
  programName?: string;
  calculationStatus?: string;
  runtimeInclusionStatus?: string;
  includedInRuntimeTotals?: boolean;
  missingInputs?: Array<{ inputKey: string; effectId?: string | null; label?: string }>;
  requiredInputs?: string[];
  formInputFields?: Array<{
    inputKey: string;
    label?: string;
    collectionSurface?: string;
    collectionSurfaceLabel?: string;
    implementationStatus?: "implemented" | "planned" | string;
    uploadKind?: string | null;
  }>;
  resolvedInputs?: Array<{
    inputKey: string;
    canonicalInputKey?: string;
    source?: string;
    defaultIsPlaceholder?: boolean;
    defaultConfidence?: string | null;
    userOverrideAllowed?: boolean;
  }>;
  defaultedInputs?: Array<{
    inputKey: string;
    canonicalInputKey?: string;
    source?: string;
    defaultIsPlaceholder?: boolean;
    defaultConfidence?: string | null;
    userOverrideAllowed?: boolean;
  }>;
  totals?: {
    expectedOneTimeSavingsCents?: number;
    expectedGrantAmountCents?: number;
    expectedRecurringSavingsAnnualCents?: number;
    expectedRecurringExpensesAnnualCents?: number;
    annualNetRecurringBenefitCents?: number;
  };
};

type SampleSavingsPreview = {
  schemaVersion?: string;
  status: "calculated" | "blocked" | "unsupported";
  estimateKind: "test_fixture" | "not_modeled_v1" | string;
  modelCoverage: "retrofit_only" | "none" | string;
  retrofitTypeId: string;
  retrofitDisplayName: string;
  opportunityCount: number;
  calculationDate?: string | null;
  upfrontCostCents: number | null;
  upfrontSavingsCents: number | null;
  oneTimeSavingsCents?: number | null;
  upfrontCostAfterSavingsCents: number | null;
  monthlyRecurringSavingsCents?: number | null;
  annualRecurringSavingsCents?: number | null;
  monthlyRecurringExpensesCents?: number | null;
  annualRecurringExpensesCents?: number | null;
  netMonthlyRecurringSavingsCents?: number | null;
  netAnnualRecurringSavingsCents?: number | null;
  monthlySavingsCents: number | null;
  annualSavingsCents: number | null;
  costBreakdown: SampleSavingsLedgerEntry[];
  savingsBreakdown: SampleRecurringSavingsEntry[];
  billLineDeltas?: Array<{
    domain: string;
    canonicalField: string;
    deltaValue: number;
    unit: string;
    period: string;
    savingsCents?: number;
  }>;
  incentiveCalculationPackageSummaries?: IncentiveCalculationPackageSummary[];
  incentiveCalculationPackageCounts?: {
    matchedPackageCount?: number;
    runtimeRuleCount?: number;
    includedPackageCount?: number;
    missingInputPackageCount?: number;
    legacyPreferredPackageCount?: number;
    suppressedPackageCount?: number;
  };
  selectedIncentiveScenario?: {
    id?: string;
    name?: string;
    opportunityIds?: string[];
    incentiveRuleIds?: string[];
    status?: string;
    totalUpfrontSavingsCents?: number;
    firstYearRecurringSavingsCents?: number;
    firstYearRecurringExpensesCents?: number;
    firstYearNetRecurringSavingsCents?: number;
    firstYearTotalBenefitCents?: number;
    conflictExplanations?: Array<{ reason: string }>;
  } | null;
  alternativeScenarios?: unknown[];
  calculationTrace?: {
    summary?: string;
    steps?: SampleCalculationTraceStep[];
    assumptions?: Array<{ label?: string; value?: unknown }>;
  } | null;
  assumptions?: string[];
  unsupportedReason?: string | null;
};

type SavingsEquationLine = {
  id: string;
  amountCents: number;
  label: string;
};

type SampleCount = {
  value: string;
  count: number;
};

type SampleRetrofitGroup = {
  retrofitTypeId: string;
  displayName: string;
  parentCategory: string;
  isPhysicalRetrofit: boolean;
  typicalComponents?: string[];
  detailQuestions?: RetrofitDetailQuestion[];
  opportunityCount: number;
  opportunities: SampleMatchResult[];
  savingsPreview?: SampleSavingsPreview;
};

type SampleNormalizedProfile = {
  business?: {
    organizationTypes?: string[];
    naicsCodes?: string[];
    organizationSize?: string | null;
  };
  site?: {
    geo?: {
      stateCode?: string | null;
      zip5?: string | null;
      countyFips?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    };
    utility?: {
      electric?: {
        selfReportedName?: string | null;
        distributionUtilityId?: string | null;
        verificationStatus?: string | null;
        territoryCandidates?: string[];
        customerClass?: string | null;
      };
    };
    ownershipRelationship?: string | null;
    buildingTypes?: string[];
    squareFootage?: unknown;
  };
  project?: {
    stage?: string | null;
  };
};

type SampleMatchingTestCase = {
  sampleUserId: string;
  description: string;
  sourceForm: Record<string, unknown>;
  normalizedProfile: SampleNormalizedProfile;
  statusCounts: Record<string, number>;
  retrofits?: SampleRetrofitGroup[];
  topResults: SampleMatchResult[];
  commonQuestions: SampleCount[];
  blockers: SampleCount[];
  unresolved: SampleCount[];
};

type SampleMatchingTestCasesData = {
  generatedAt: string;
  matchingNow: string;
  opportunityCount: number;
  totalOpportunityRecordCount?: number;
  archivedOpportunityCount?: number;
  hiddenUpcomingOpportunityCount?: number;
  sampleUserCount: number;
  retrofitTaxonomyVersion?: string;
  testCases: SampleMatchingTestCase[];
};

type RetrofitIndexOpportunity = {
  opportunityId: string;
  opportunityName: string;
  sourceName?: string | null;
  sourceUrl?: string | null;
  websiteUrl?: string | null;
  applicationUrl?: string | null;
  state?: string | null;
  programType?: string | null;
  administrator?: string | null;
  confidence?: number;
  matchBasis?: string;
  matchedTerms?: string[];
};

type RetrofitIndexRow = {
  retrofitTypeId: string;
  displayName: string;
  parentCategory: string;
  isPhysicalRetrofit: boolean;
  typicalComponents?: string[];
  relatedSavingsModels?: string[];
  typicalBillTypes?: string[];
  opportunityCount: number;
  opportunities: RetrofitIndexOpportunity[];
};

type RetrofitOpportunityIndexData = {
  schemaVersion: string;
  taxonomyVersion: string;
  generatedAt: string;
  matchingNow: string;
  opportunityCount: number;
  totalOpportunityRecordCount?: number;
  archivedOpportunityCount?: number;
  retrofitCount: number;
  retrofits: RetrofitIndexRow[];
};

type AuthPayload = {
  dashboard: "client" | "admin";
  user: UserRecord;
  intake: IntakeRecord | null;
  adminDashboard: AdminPayload | null;
};

type DatabaseFacetOption = {
  id: string;
  label: string;
  value: string;
  count: number;
};

type DatabaseFacets = {
  states: DatabaseFacetOption[];
  categories: DatabaseFacetOption[];
  programTypes: DatabaseFacetOption[];
  implementingSectors: DatabaseFacetOption[];
  eligibleSectors: DatabaseFacetOption[];
  technologies: DatabaseFacetOption[];
};

type DatabaseLookup = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
  abbreviation?: string | null;
  category?: string | null;
};

type DatabaseProgram = {
  id: string;
  opportunityId: string;
  sourceKey?: string | null;
  sourceSystem: string;
  sourceUrl?: string | null;
  websiteUrl?: string | null;
  externalId?: string | null;
  externalIdType?: string | null;
  dsireProgramId?: string | number | null;
  code?: string | null;
  name: string;
  slug: string;
  state?: {
    id?: string | null;
    abbreviation?: string | null;
    name?: string | null;
    isTerritory?: boolean | null;
  };
  category?: DatabaseLookup;
  programType?: DatabaseLookup & { categoryId?: string | null };
  implementingSector?: DatabaseLookup;
  eligibleSectors: DatabaseLookup[];
  technologies: DatabaseLookup[];
  published?: boolean | null;
  status?: string;
  administrator?: string | null;
  fundingSource?: string | null;
  budget?: string | null;
  startDate?: string | null;
  startDateText?: string | null;
  endDate?: string | null;
  endDateText?: string | null;
  summaryText?: string | null;
  lastReviewedAt?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
  geography?: unknown;
  overviewDetails: Array<{
    id?: string | null;
    label?: string | null;
    value?: string | null;
    displayOrder?: number | null;
    templateId?: string | null;
  }>;
  parameterSets: Array<{
    id?: string | null;
    label?: string | null;
    displayOrder?: number | null;
    sectors: DatabaseLookup[];
    technologies: DatabaseLookup[];
    parameters: Array<{
      id?: string | null;
      source?: string | null;
      qualifier?: string | null;
      amount?: number | null;
      amountText?: string | null;
      units?: string | null;
      displayValue?: string | null;
    }>;
  }>;
  authorities: unknown[];
  contacts: unknown[];
  memos: unknown[];
};

type DatabaseProgramsBatchResponse = {
  generatedAt: string;
  programs: DatabaseProgram[];
  scannedCount: number;
  rawCount: number;
  matchedCount: number;
  estimatedTotal: number | null;
  nextCursor: string | null;
  isComplete: boolean;
};

type DatabaseLoadProgress = {
  scannedCount: number;
  loadedPrograms: number;
  estimatedTotal: number | null;
  isComplete: boolean;
};

type DatabaseProgramResponse = {
  program: DatabaseProgram;
};

type PasswordAuthPayload = AuthPayload & {
  sessionToken: string;
};

type OAuthRedirectResult = {
  payload: AuthPayload;
  credential: AuthCredential;
};

type IntakeFormState = {
  contactName: string;
  fullName: string;
  email: string;
  phone: string;
  roleTitle: string;
  contactPreference: string;
  siteAddress: string;
  electricUtilityProvider: string;
  gasUtilityProvider: string;
  companyName: string;
  website: string;
  industry: string;
  organizationType: string;
  organizationSize: string;
  headquarters: string;
  ownershipStatus: string;
  buildingType: string;
  squareFootage: string;
  numberOfUnits: string;
  interestedImprovements: string[];
  sustainabilityGoals: string;
  currentChallenges: string;
  monthlyUtilitySpend: string;
  timeline: string;
  notes: string;
};

const initialFormState: IntakeFormState = {
  contactName: "",
  fullName: "",
  email: "",
  phone: "",
  roleTitle: "",
  contactPreference: "Email",
  siteAddress: "",
  electricUtilityProvider: "",
  gasUtilityProvider: "",
  companyName: "",
  website: "",
  industry: "",
  organizationType: "",
  organizationSize: "",
  headquarters: "",
  ownershipStatus: "",
  buildingType: "",
  squareFootage: "",
  numberOfUnits: "",
  interestedImprovements: [],
  sustainabilityGoals: "",
  currentChallenges: "",
  monthlyUtilitySpend: "",
  timeline: "",
  notes: ""
};

const intakeFormDraftStorageKey = "retrofi.intakeFormDraft.v1";
const intakeFormStringFields = [
  "contactName",
  "fullName",
  "email",
  "phone",
  "roleTitle",
  "contactPreference",
  "siteAddress",
  "electricUtilityProvider",
  "gasUtilityProvider",
  "companyName",
  "website",
  "industry",
  "organizationType",
  "organizationSize",
  "headquarters",
  "ownershipStatus",
  "buildingType",
  "squareFootage",
  "numberOfUnits",
  "sustainabilityGoals",
  "currentChallenges",
  "monthlyUtilitySpend",
  "timeline",
  "notes"
] as const satisfies ReadonlyArray<Exclude<keyof IntakeFormState, "interestedImprovements">>;

const utilityProviderOptions = [
  "PG&E",
  "Southern California Edison",
  "San Diego Gas & Electric",
  "Silicon Valley Power",
  "LADWP",
  "SMUD",
  "Other / Not sure"
];
const organizationSizeOptions = [
  "1-10 employees",
  "11-50 employees",
  "51-250 employees",
  "251-1,000 employees",
  "1,000+ employees"
];
const electricUtilityStepOptions = [...utilityProviderOptions.filter((option) => option !== "Other / Not sure"), "I'm not sure"];
const gasUtilityStepOptions = [...electricUtilityStepOptions, "I don't have gas"];

type IntakeFlowId = "unselected" | "homeowner" | "multifamily" | "business" | "organization";

type StepOption = {
  description?: string;
  icon?: "building" | "factory" | "government" | "graduation" | "handHeart" | "home" | "leaf" | "more" | "store";
  label: string;
  value: string;
};

type ConversationalStep = {
  ctaLabel?: string;
  id: string;
  kind: "choice" | "input" | "textarea" | "review";
  question: string;
  description?: string;
  field?: keyof IntakeFormState;
  inputMode?: "email" | "numeric" | "tel" | "text" | "url";
  optional?: boolean;
  options?: StepOption[];
  placeholder?: string;
  section: string;
  validate?: (value: string) => string | null;
};

const organizationTypeChoices: StepOption[] = [
  { label: "Homeowner", description: "Own and live in a home", icon: "home", value: "homeowner" },
  { label: "Multifamily Property Owner / Manager", description: "Own or manage a residential property", icon: "building", value: "multifamily_property_owner_manager" },
  { label: "Business / Commercial", description: "Operate or own a commercial property", icon: "store", value: "business_commercial" },
  { label: "Nonprofit", description: "Mission-driven organization or association", icon: "handHeart", value: "nonprofit" },
  { label: "Government / Public Agency", description: "City, county, state, or federal agency", icon: "government", value: "government_public_agency" },
  { label: "School / Education", description: "K-12, college, university, or campus", icon: "graduation", value: "school_education" },
  { label: "Agriculture", description: "Farm, ranch, greenhouse, or ag operation", icon: "leaf", value: "agriculture" },
  { label: "Industrial / Manufacturing", description: "Production, fabrication, or processing site", icon: "factory", value: "industrial_manufacturing" },
  { label: "Other", description: "Something else not listed here", icon: "more", value: "other" }
];

const organizationTypeLabelByValue = Object.fromEntries(
  organizationTypeChoices.map((option) => [option.value, option.label])
) as Record<string, string>;

const homeownerBuildingTypeOptions: StepOption[] = [
  { label: "Single-family home", description: "Detached residence", value: "Single-family home" },
  { label: "Townhome", description: "Attached home with shared walls", value: "Townhome" },
  { label: "Condo", description: "Unit in a shared building", value: "Condo" },
  { label: "Duplex / triplex", description: "Small multi-unit property", value: "Duplex / triplex" },
  { label: "Other", description: "Another home type", value: "Other" }
];

const businessBuildingTypeOptions: StepOption[] = [
  { label: "Office", description: "Professional or administrative workspace", value: "Office" },
  { label: "Retail / storefront", description: "Storefront or customer-facing space", value: "Retail / Storefront" },
  { label: "Restaurant / commercial kitchen", description: "Food service or kitchen operation", value: "Restaurant / Commercial Kitchen" },
  { label: "Grocery / convenience / cold storage", description: "Food retail, convenience, or cold-storage site", value: "Grocery / Convenience / Cold Storage" },
  { label: "Warehouse / logistics", description: "Storage, logistics, or fulfillment space", value: "Warehouse / Logistics" },
  { label: "Industrial / manufacturing", description: "Production, fabrication, or processing site", value: "Industrial / Manufacturing" },
  { label: "Hospitality / lodging", description: "Hotel, lodging, or guest-serving property", value: "Hospitality / Lodging" },
  { label: "Medical / healthcare", description: "Healthcare, clinical, or dental facility", value: "Medical / Healthcare" },
  { label: "School / education campus", description: "K-12, college, university, or campus site", value: "School / Education Campus" },
  { label: "Multifamily / apartment building", description: "Apartment, condo, or shared residential property", value: "Multifamily / Apartment Building" },
  { label: "Agricultural / greenhouse", description: "Farm, ranch, greenhouse, or ag facility", value: "Agricultural / Greenhouse" },
  { label: "Data center / server facility", description: "Data center, server room, or compute facility", value: "Data Center / Server Facility" },
  { label: "Mixed-use", description: "Multiple uses in one property", value: "Mixed-use" },
  { label: "Other", description: "Another site or facility type", value: "Other" }
];

const organizationSizeStepOptions = organizationSizeOptions.map((option) => ({ label: option, value: option }));
const electricUtilityChoiceOptions = electricUtilityStepOptions.map((option) => ({ label: option, value: option }));
const gasUtilityChoiceOptions = gasUtilityStepOptions.map((option) => ({ label: option, value: option }));

function intakeFlowForOrganizationType(value: string): IntakeFlowId {
  switch (value) {
    case "homeowner":
      return "homeowner";
    case "multifamily_property_owner_manager":
      return "multifamily";
    case "business_commercial":
      return "business";
    case "nonprofit":
    case "government_public_agency":
    case "school_education":
    case "agriculture":
    case "industrial_manufacturing":
    case "other":
      return "organization";
    default:
      return "unselected";
  }
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isNumericEntry(value: string) {
  return /^\d[\d,\s.]*$/.test(value.trim());
}

function buildConversationalSteps(form: IntakeFormState): ConversationalStep[] {
  const steps: ConversationalStep[] = [
    {
      id: "organizationType",
      kind: "choice",
      question: "What best describes you?",
      description: "We'll personalize every recommendation automatically.",
      field: "organizationType",
      section: "Personalization",
      options: organizationTypeChoices,
      validate: (value) => (value ? null : "Choose the option that best matches you.")
    }
  ];

  const flow = intakeFlowForOrganizationType(form.organizationType);

  if (flow === "homeowner") {
    steps.push(
      {
        id: "siteAddress",
        kind: "textarea",
        question: "What is your property address?",
        field: "siteAddress",
        section: "Property",
        placeholder: "Street address, city, state, ZIP"
      },
      {
        id: "electricUtilityProvider",
        kind: "choice",
        question: "Who is your electric utility provider?",
        field: "electricUtilityProvider",
        section: "Utilities",
        options: electricUtilityChoiceOptions
      },
      {
        id: "gasUtilityProvider",
        kind: "choice",
        question: "Who is your gas utility provider?",
        field: "gasUtilityProvider",
        section: "Utilities",
        options: gasUtilityChoiceOptions,
        optional: true
      },
      {
        id: "buildingType",
        kind: "choice",
        question: "What type of home is it?",
        field: "buildingType",
        section: "Property",
        options: homeownerBuildingTypeOptions
      },
      {
        id: "squareFootage",
        kind: "input",
        question: "What is the approximate square footage?",
        field: "squareFootage",
        inputMode: "numeric",
        section: "Property",
        placeholder: "Approximate is fine",
        validate: (value) => (!value.trim() ? "Enter the approximate square footage." : isNumericEntry(value) ? null : "Square footage must be numeric.")
      },
      {
        id: "contactName",
        kind: "input",
        question: "What is your name?",
        field: "contactName",
        section: "Contact",
        placeholder: "Full name"
      },
      {
        id: "email",
        kind: "input",
        question: "What is your email?",
        field: "email",
        inputMode: "email",
        section: "Contact",
        placeholder: "name@example.com",
        validate: (value) => (!value.trim() ? "Enter your email address." : isEmail(value) ? null : "Email must be valid.")
      },
      {
        id: "phone",
        kind: "input",
        question: "What is your phone number?",
        field: "phone",
        inputMode: "tel",
        section: "Contact",
        placeholder: "(555) 555-5555",
        optional: true
      },
      {
        id: "notes",
        kind: "textarea",
        question: "Anything else we should know?",
        field: "notes",
        section: "Notes",
        placeholder: "Optional details",
        optional: true
      }
    );
  }

  if (flow === "multifamily") {
    steps.push(
      {
        id: "companyName",
        kind: "input",
        question: "What is the property name?",
        field: "companyName",
        section: "Property",
        placeholder: "Property name",
        optional: true
      },
      {
        id: "siteAddress",
        kind: "textarea",
        question: "What is the property address?",
        field: "siteAddress",
        section: "Property",
        placeholder: "Street address, city, state, ZIP"
      },
      {
        id: "electricUtilityProvider",
        kind: "choice",
        question: "Who is your electric utility provider?",
        field: "electricUtilityProvider",
        section: "Utilities",
        options: electricUtilityChoiceOptions
      },
      {
        id: "gasUtilityProvider",
        kind: "choice",
        question: "Who is your gas utility provider?",
        field: "gasUtilityProvider",
        section: "Utilities",
        options: gasUtilityChoiceOptions,
        optional: true
      },
      {
        id: "numberOfUnits",
        kind: "input",
        question: "How many units are in the property?",
        field: "numberOfUnits",
        inputMode: "numeric",
        section: "Property",
        placeholder: "Number of units",
        validate: (value) => (!value.trim() ? "Enter the number of units." : isNumericEntry(value) ? null : "Number of units must be numeric.")
      },
      {
        id: "squareFootage",
        kind: "input",
        question: "What is the approximate square footage?",
        field: "squareFootage",
        inputMode: "numeric",
        section: "Property",
        placeholder: "Approximate is fine",
        validate: (value) => (!value.trim() ? "Enter the approximate square footage." : isNumericEntry(value) ? null : "Square footage must be numeric.")
      },
      {
        id: "contactName",
        kind: "input",
        question: "What is your name?",
        field: "contactName",
        section: "Contact",
        placeholder: "Full name"
      },
      {
        id: "email",
        kind: "input",
        question: "What is your email?",
        field: "email",
        inputMode: "email",
        section: "Contact",
        placeholder: "name@example.com",
        validate: (value) => (!value.trim() ? "Enter your email address." : isEmail(value) ? null : "Email must be valid.")
      },
      {
        id: "phone",
        kind: "input",
        question: "What is your phone number?",
        field: "phone",
        inputMode: "tel",
        section: "Contact",
        placeholder: "(555) 555-5555",
        optional: true
      },
      {
        id: "notes",
        kind: "textarea",
        question: "Anything else we should know?",
        field: "notes",
        section: "Notes",
        placeholder: "Optional details",
        optional: true
      }
    );
  }

  if (flow === "business" || flow === "organization") {
    const isOrganizationFlow = flow === "organization";
    steps.push(
      {
        id: "companyName",
        kind: "input",
        question: isOrganizationFlow ? "What is your organization name?" : "What is your company name?",
        field: "companyName",
        section: "Organization",
        placeholder: isOrganizationFlow ? "Organization name" : "Company name"
      },
      {
        id: "website",
        kind: "input",
        question: "What is your website?",
        field: "website",
        inputMode: "url",
        section: "Organization",
        placeholder: "https://example.com",
        optional: true
      },
      {
        id: "organizationSize",
        kind: "choice",
        question: "What is your organization size?",
        field: "organizationSize",
        section: "Organization",
        options: organizationSizeStepOptions,
        optional: true
      },
      {
        id: "siteAddress",
        kind: "textarea",
        question: "What is your site address?",
        field: "siteAddress",
        section: "Property",
        placeholder: "Street address, city, state, ZIP"
      },
      {
        id: "electricUtilityProvider",
        kind: "choice",
        question: "Who is your electric utility provider?",
        field: "electricUtilityProvider",
        section: "Utilities",
        options: electricUtilityChoiceOptions
      },
      {
        id: "gasUtilityProvider",
        kind: "choice",
        question: "Who is your gas utility provider?",
        field: "gasUtilityProvider",
        section: "Utilities",
        options: gasUtilityChoiceOptions,
        optional: true
      },
      {
        id: "buildingType",
        kind: "choice",
        question: "What type of site or facility is it?",
        field: "buildingType",
        section: "Property",
        options: businessBuildingTypeOptions
      },
      {
        id: "squareFootage",
        kind: "input",
        question: "What is the approximate square footage?",
        field: "squareFootage",
        inputMode: "numeric",
        section: "Property",
        placeholder: "Approximate is fine",
        validate: (value) => (!value.trim() ? "Enter the approximate square footage." : isNumericEntry(value) ? null : "Square footage must be numeric.")
      },
      {
        id: "contactName",
        kind: "input",
        question: "What is your name?",
        field: "contactName",
        section: "Contact",
        placeholder: "Full name"
      },
      {
        id: "email",
        kind: "input",
        question: "What is your email?",
        field: "email",
        inputMode: "email",
        section: "Contact",
        placeholder: "name@example.com",
        validate: (value) => (!value.trim() ? "Enter your email address." : isEmail(value) ? null : "Email must be valid.")
      },
      {
        id: "phone",
        kind: "input",
        question: "What is your phone number?",
        field: "phone",
        inputMode: "tel",
        section: "Contact",
        placeholder: "(555) 555-5555",
        optional: true
      },
      {
        id: "notes",
        kind: "textarea",
        question: "Anything else we should know?",
        field: "notes",
        section: "Notes",
        placeholder: "Optional details",
        optional: true
      }
    );
  }

  if (flow !== "unselected") {
    steps.push({
      id: "review",
      kind: "review",
      question: "Review and submit",
      description: "Use Back to make changes before you submit."
      ,
      ctaLabel: "Submit",
      section: "Review"
    });
  }

  return steps;
}

function normalizeIntakeFormDraft(value: unknown): IntakeFormState | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const storedDraft = value as Partial<Record<keyof IntakeFormState, unknown>>;
  const draft: IntakeFormState = { ...initialFormState };

  for (const field of intakeFormStringFields) {
    const fieldValue = storedDraft[field];
    if (typeof fieldValue === "string") {
      draft[field] = fieldValue;
    }
  }

  if (Array.isArray(storedDraft.interestedImprovements)) {
    draft.interestedImprovements = storedDraft.interestedImprovements.filter(
      (option): option is string => typeof option === "string"
    );
  }

  if (!draft.contactName && draft.fullName) {
    draft.contactName = draft.fullName;
  }

  if (!draft.fullName && draft.contactName) {
    draft.fullName = draft.contactName;
  }

  return draft;
}

function readStoredIntakeFormDraft(): IntakeFormState {
  if (typeof window === "undefined") {
    return initialFormState;
  }

  try {
    const rawDraft = window.localStorage.getItem(intakeFormDraftStorageKey);
    if (!rawDraft) {
      return initialFormState;
    }

    return normalizeIntakeFormDraft(JSON.parse(rawDraft)) ?? initialFormState;
  } catch {
    return initialFormState;
  }
}

function storeIntakeFormDraft(form: IntakeFormState) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(intakeFormDraftStorageKey, JSON.stringify(form));
  } catch {
    // Ignore local storage failures so the form remains usable in private or restricted browsers.
  }
}

function clearStoredIntakeFormDraft() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(intakeFormDraftStorageKey);
  } catch {
    // Ignore local storage failures so successful submission can continue.
  }
}

function readStoredEnergyDataUploadSession(): EnergyDataUploadSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(ENERGY_DATA_UPLOAD_SESSION_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<EnergyDataUploadSession>;
    if (
      typeof parsed.userId === "string" &&
      typeof parsed.submissionId === "string" &&
      typeof parsed.token === "string" &&
      typeof parsed.expiresAt === "string"
    ) {
      return {
        userId: parsed.userId,
        submissionId: parsed.submissionId,
        token: parsed.token,
        expiresAt: parsed.expiresAt
      };
    }
  } catch {
    return null;
  }

  return null;
}

function storeEnergyDataUploadSession(session: EnergyDataUploadSession | null) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!session) {
      window.localStorage.removeItem(ENERGY_DATA_UPLOAD_SESSION_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(ENERGY_DATA_UPLOAD_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage failures so upload flow can still continue in-memory.
  }
}

function clearStoredEnergyDataUploadSession() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(ENERGY_DATA_UPLOAD_SESSION_STORAGE_KEY);
  } catch {
    // Ignore storage failures so reset actions still work.
  }
}

function adminAuthBody(credential: AuthCredential) {
  if (credential.provider === "password") {
    return { passwordSessionToken: credential.value };
  }

  return { credential: credential.value };
}

function adminAuthHeaders(credential: AuthCredential): HeadersInit {
  if (credential.provider === "password") {
    return { "x-gbs-password-session": credential.value };
  }

  return { Authorization: `Bearer ${credential.value}` };
}

function readStoredAuthCredential(): AuthCredential | null {
  if (typeof window === "undefined") {
    return null;
  }

  let rawValue: string | null = null;
  try {
    rawValue = window.localStorage.getItem(AUTH_CREDENTIAL_STORAGE_KEY);
  } catch {
    return null;
  }

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<AuthCredential>;
    if (parsed.provider === "password" && typeof parsed.value === "string" && parsed.value) {
      return {
        provider: "password",
        value: parsed.value
      };
    }
  } catch {
    return null;
  }

  return null;
}

function storeAuthCredential(credential: AuthCredential) {
  if (typeof window === "undefined") {
    return;
  }

  if (credential.provider === "password" && credential.value) {
    try {
      window.localStorage.setItem(AUTH_CREDENTIAL_STORAGE_KEY, JSON.stringify(credential));
    } catch {
      // Session restore is a convenience; sign-in should still succeed if browser storage is blocked.
    }
  }
}

function clearStoredAuthCredential() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(AUTH_CREDENTIAL_STORAGE_KEY);
  } catch {
    // Ignore storage failures so sign-out can still clear in-memory auth state.
  }
}

function refreshStoredAuthPayload(credential: AuthCredential) {
  if (credential.provider !== "password") {
    throw new Error("Only server-backed sessions can be restored.");
  }

  return apiPost<AuthPayload>("/api/auth/password/session", { sessionToken: credential.value });
}

function takeSessionStorageItem(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.sessionStorage.getItem(key);
  window.sessionStorage.removeItem(key);
  return value;
}

function takeOAuthRedirectResult(): OAuthRedirectResult | null {
  const rawValue = takeSessionStorageItem(OAUTH_REDIRECT_RESULT_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<OAuthRedirectResult>;
    if (parsed.payload?.dashboard && parsed.credential?.provider && parsed.credential.value) {
      return parsed as OAuthRedirectResult;
    }
  } catch {
    return null;
  }

  return null;
}

function takeOAuthRedirectError() {
  return takeSessionStorageItem(OAUTH_REDIRECT_ERROR_KEY);
}

function PasswordAuthPanel({
  initialUsername = "",
  onAuthSuccess
}: {
  initialUsername?: string;
  onAuthSuccess: (payload: AuthPayload, credential: AuthCredential) => void;
}) {
  const [mode, setMode] = useState<"signup" | "login">("login");
  const isSignup = mode === "signup";

  return (
    <div className="password-auth-panel">
      <h1>{isSignup ? "Create account" : "Log in"}</h1>
      <PasswordAuthForm
        initialUsername={initialUsername}
        mode={mode}
        onAuthSuccess={onAuthSuccess}
      />
      <div className="auth-switch-row">
        <span>{isSignup ? "Already have an account?" : "Don't have an account?"}</span>
        <button
          className="link-button auth-inline-link"
          onClick={() => setMode(isSignup ? "login" : "signup")}
          type="button"
        >
          {isSignup ? "Log in" : "Sign up"}
        </button>
      </div>
    </div>
  );
}

function PasswordAuthForm({
  initialUsername,
  mode,
  onAuthSuccess
}: {
  initialUsername: string;
  mode: "signup" | "login";
  onAuthSuccess: (payload: AuthPayload, credential: AuthCredential) => void;
}) {
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isSignup = mode === "signup";

  useEffect(() => {
    setUsername(initialUsername);
    setPassword("");
    setError(null);
    setIsPasswordVisible(false);
  }, [initialUsername, mode]);

  async function submitPasswordAuth(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const endpoint = isSignup ? "/api/auth/password/signup" : "/api/auth/password/login";
      const payload = await apiPost<PasswordAuthPayload>(endpoint, { username, password });
      onAuthSuccess(payload, { provider: "password", value: payload.sessionToken });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Password sign-in failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="password-auth-form" onSubmit={submitPasswordAuth}>
      <label className="field">
        <span>Email</span>
        <input
          autoComplete="username"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Email"
          required
          type="email"
          value={username}
        />
      </label>
      <label className="field">
        <span>Password</span>
        <span className="password-input-shell">
          <input
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            type={isPasswordVisible ? "text" : "password"}
            value={password}
          />
          <button
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="password-visibility-button"
            onClick={() => setIsPasswordVisible((current) => !current)}
            type="button"
          >
            <EyeIcon />
          </button>
        </span>
      </label>
      {error ? <p className="error-message">{error}</p> : null}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : isSignup ? "Create account" : "Log in"}
      </button>
    </form>
  );
}

function formatDate(value: string | null) {
  if (!value) return "Not recorded";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => (typeof item === "string" ? item : "")).filter(Boolean);
}

function valuesFromParameter(parameter: MatchParameter | undefined) {
  return toStringArray(parameter?.values);
}

function asOpportunityRecords(records: unknown[]) {
  return records.filter((record): record is OpportunityRecord => {
    if (!isPlainRecord(record)) return false;
    return typeof record.opportunityId === "string" && typeof record.sourceKey === "string";
  });
}

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function getOpportunityTitle(opportunity: OpportunityRecord) {
  return opportunity.canonicalTitle || opportunity.normalizedTitle || opportunity.opportunityId;
}

function getOpportunityReviewStatus(opportunity: OpportunityRecord) {
  return opportunity.reviewStatus || "needs_review";
}

function getOpportunityWarnings(opportunity: OpportunityRecord) {
  return [
    ...toStringArray(opportunity.dataQuality?.warnings),
    ...toStringArray(opportunity.matchingParameters?.matchingWarnings)
  ];
}

function getOpportunityBusinessClassifications(opportunity: OpportunityRecord) {
  const fromMatching = valuesFromParameter(opportunity.matchingParameters?.businessClassification);
  return fromMatching.length > 0 ? fromMatching : toStringArray(opportunity.sectors);
}

function getOpportunityTechnologies(opportunity: OpportunityRecord) {
  return toStringArray(opportunity.technologies);
}

function compactJson(value: unknown) {
  return JSON.stringify(value ?? null, null, 2);
}

function formatProgramDate(value?: string | null) {
  if (!value) return "Not listed";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(parsed);
}

function lookupLabel(value?: DatabaseLookup | null) {
  return value?.name || value?.abbreviation || "Not listed";
}

function joinLookupLabels(values: DatabaseLookup[]) {
  return values.map((value) => lookupLabel(value)).filter(Boolean).join(", ");
}

function formatParameterValue(parameter: DatabaseProgram["parameterSets"][number]["parameters"][number]) {
  const amount = parameter.displayValue || [parameter.qualifier, parameter.amountText ?? parameter.amount, parameter.units]
    .filter((part) => part != null && part !== "")
    .join(" ");

  if (parameter.source && amount) return `${parameter.source}: ${amount}`;
  return parameter.source || amount || "Parameter listed";
}

function normalizeDatabaseFilterValue(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

function databaseLookupMatches(lookup: DatabaseLookup | null | undefined, filter: string) {
  if (!filter) return true;
  const normalizedFilter = normalizeDatabaseFilterValue(filter);
  return [lookup?.id, lookup?.name, lookup?.slug, lookup?.abbreviation]
    .map(normalizeDatabaseFilterValue)
    .includes(normalizedFilter);
}

function databaseLookupListMatches(lookups: DatabaseLookup[], filter: string) {
  if (!filter) return true;
  return lookups.some((lookup) => databaseLookupMatches(lookup, filter));
}

function databaseProgramMatchesFilters(
  program: DatabaseProgram,
  filters: {
    category: string;
    implementingSector: string;
    q: string;
    sector: string;
    state: string;
    technology: string;
    type: string;
  }
) {
  const query = normalizeDatabaseFilterValue(filters.q);

  return (
    (!query || databaseProgramMatchesSearch(program, query)) &&
    databaseLookupMatches(program.state, filters.state) &&
    databaseLookupMatches(program.category, filters.category) &&
    databaseLookupMatches(program.programType, filters.type) &&
    databaseLookupMatches(program.implementingSector, filters.implementingSector) &&
    databaseLookupListMatches(program.technologies, filters.technology) &&
    databaseLookupListMatches(program.eligibleSectors, filters.sector)
  );
}

function sortDatabasePrograms(programs: DatabaseProgram[]) {
  return [...programs].sort(
    (a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")) || a.name.localeCompare(b.name)
  );
}

function buildDatabaseFacet(values: Array<DatabaseLookup | null | undefined>, labelKey: "name" | "abbreviation" = "name") {
  const map = new Map<string, DatabaseFacetOption>();

  for (const value of values) {
    if (!value) continue;
    const id = value.id ?? value.abbreviation ?? value.slug ?? value[labelKey];
    const label = value[labelKey] || value.name || value.abbreviation || id;
    if (!id || !label) continue;

    const key = normalizeDatabaseFilterValue(value.slug || value.abbreviation || label || id);
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, {
        id: key,
        label: String(label),
        value: value.slug || value.abbreviation || String(label),
        count: 1
      });
    }
  }

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

function buildClientDatabaseFacets(programs: DatabaseProgram[]): DatabaseFacets {
  return {
    states: buildDatabaseFacet(programs.map((program) => program.state), "name"),
    categories: buildDatabaseFacet(programs.map((program) => program.category), "name"),
    programTypes: buildDatabaseFacet(programs.map((program) => program.programType), "name"),
    implementingSectors: buildDatabaseFacet(programs.map((program) => program.implementingSector), "name"),
    eligibleSectors: buildDatabaseFacet(programs.flatMap((program) => program.eligibleSectors), "name"),
    technologies: buildDatabaseFacet(programs.flatMap((program) => program.technologies), "name")
  };
}

function databaseProgressPercent(progress: DatabaseLoadProgress) {
  if (progress.isComplete) return 100;
  if (!progress.estimatedTotal || progress.estimatedTotal <= 0) {
    return progress.scannedCount > 0 ? 12 : 4;
  }

  return Math.min(99, Math.max(4, Math.round((progress.scannedCount / progress.estimatedTotal) * 100)));
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
  placeholder
}: {
  label: string;
  name: keyof IntakeFormState;
  value: string;
  onChange: (name: keyof IntakeFormState, value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? <b aria-label="required"> *</b> : null}
      </span>
      <input
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  required,
  placeholder
}: {
  label: string;
  name: keyof IntakeFormState;
  value: string;
  onChange: (name: keyof IntakeFormState, value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="field field-wide">
      <span>
        {label}
        {required ? <b aria-label="required"> *</b> : null}
      </span>
      <textarea
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required
}: {
  label: string;
  name: keyof IntakeFormState;
  value: string;
  onChange: (name: keyof IntakeFormState, value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? <b aria-label="required"> *</b> : null}
      </span>
      <select
        name={name}
        onChange={(event) => onChange(name, event.target.value)}
        required={required}
        value={value}
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckboxGroup({
  label,
  values,
  onChange,
  options,
  selectAllOption,
  required
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
  selectAllOption?: string;
  required?: boolean;
}) {
  const selectableOptions = selectAllOption ? options.filter((option) => option !== selectAllOption) : options;
  const allOptionsSelected = Boolean(selectAllOption) && selectableOptions.every((option) => values.includes(option));

  function toggle(option: string) {
    if (option === selectAllOption) {
      onChange(allOptionsSelected ? [] : selectableOptions);
      return;
    }

    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
      return;
    }

    onChange([...values, option]);
  }

  function isChecked(option: string) {
    return option === selectAllOption ? allOptionsSelected : values.includes(option);
  }

  return (
    <fieldset className="field field-wide checkbox-group">
      <legend>
        {label}
        {required ? <b aria-label="required"> *</b> : null}
      </legend>
      <div className="checkbox-grid">
        {options.map((option) => (
          <label key={option}>
            <input
              checked={isChecked(option)}
              onChange={() => toggle(option)}
              type="checkbox"
              value={option}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function StepperOptionIcon({ icon }: { icon?: StepOption["icon"] }) {
  switch (icon) {
    case "home":
      return <HomeOutlineIcon />;
    case "building":
      return <BuildingOutlineIcon />;
    case "store":
      return <StoreOutlineIcon />;
    case "handHeart":
      return <HandHeartOutlineIcon />;
    case "government":
      return <LandmarkOutlineIcon />;
    case "graduation":
      return <GraduationCapOutlineIcon />;
    case "leaf":
      return <LeafOutlineIcon />;
    case "factory":
      return <FactoryOutlineIcon />;
    case "more":
      return <MoreHorizontalOutlineIcon />;
    default:
      return <MoreHorizontalOutlineIcon />;
  }
}

function OptionCard({
  isSelected,
  onClick,
  option
}: {
  isSelected: boolean;
  onClick: () => void;
  option: StepOption;
}) {
  return (
    <button
      className={isSelected ? "choice-card is-selected" : "choice-card"}
      onClick={onClick}
      type="button"
    >
      <span className="choice-card-icon" aria-hidden="true">
        <span className="choice-card-icon-circle">
          <StepperOptionIcon icon={option.icon} />
        </span>
      </span>
      <span className="choice-card-copy">
        <strong>{option.label}</strong>
        {option.description ? <small>{option.description}</small> : null}
      </span>
      <span className="choice-card-check" aria-hidden="true">
        {isSelected ? <CheckIcon /> : null}
      </span>
    </button>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const width = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="conversational-progress">
      <div
        aria-label="Intake progress"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={width}
        className="conversational-progress-track"
        role="progressbar"
      >
        <span style={{ width: `${width}%` }} />
      </div>
      <p className="conversational-progress-label">{`Step ${current} of ${total}`}</p>
    </div>
  );
}

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button className="brand-link" onClick={onClick} type="button">
      <img alt="" aria-hidden="true" className="brand-symbol" src="/retrofi-logo.png" />
      <span>RetroFi</span>
    </button>
  );
}

function FeatureIcon({
  icon
}: {
  icon: "incentives" | "savings" | "roadmap" | "mission" | "team" | "trust" | "contact";
}) {
  const icons = {
    incentives: (
      <path
        d="M12 4v16M7 9.5c0-1.9 1.8-3.5 4-3.5s4 1.6 4 3.5-1.6 2.8-4 3.4-4 1.5-4 3.6 1.8 3.5 4 3.5 4-1.6 4-3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
    savings: (
      <>
        <path d="M5 16l4-4 3 3 7-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M14 8h5v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </>
    ),
    roadmap: (
      <>
        <path d="M5 7h6l2 3 2-3h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M5 17h5l2-3 2 3h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </>
    ),
    mission: (
      <>
        <circle cx="12" cy="12" fill="none" r="7" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </>
    ),
    team: (
      <>
        <circle cx="9" cy="10" fill="none" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16" cy="11" fill="none" r="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.5 18c.8-2.2 2.6-3.4 5-3.4 2.3 0 4.2 1.2 5 3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </>
    ),
    trust: (
      <>
        <path d="M12 4l6 2.5v5.7c0 3.8-2.3 6.2-6 7.8-3.7-1.6-6-4-6-7.8V6.5L12 4z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M9.6 12.2l1.7 1.7 3.3-3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </>
    ),
    contact: (
      <>
        <rect fill="none" height="12" rx="2" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" width="16" x="4" y="6" />
        <path d="M5.5 8l6.5 5 6.5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </>
    )
  };

  return (
    <span aria-hidden="true" className="feature-icon">
      <svg fill="none" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
    </span>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" className="arrow-icon" fill="none" viewBox="0 0 20 20">
      <path d="M6 14L14 6M8 6h6v6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function PublicNav({
  canStartScan = true,
  isSignedIn = false,
  navigate,
  onHowItWorksClick,
  onSignOut
}: {
  canStartScan?: boolean;
  isSignedIn?: boolean;
  navigate: (route: Route) => void;
  onHowItWorksClick?: () => void;
  onSignOut?: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const isMenuOpenRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const isNavVisibleRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const downThreshold = 12;
    const upThreshold = 3;
    let animationFrame = 0;

    const updateNavVisibility = () => {
      const nextScrollY = Math.max(0, window.scrollY);
      const delta = nextScrollY - lastScrollYRef.current;
      const shouldAlwaysShow = nextScrollY < 24 || isMenuOpenRef.current;
      let nextVisible = isNavVisibleRef.current;

      if (shouldAlwaysShow || delta < -upThreshold) {
        nextVisible = true;
      } else if (delta > downThreshold) {
        nextVisible = false;
      }

      if (nextVisible !== isNavVisibleRef.current) {
        isNavVisibleRef.current = nextVisible;
        setIsNavVisible(nextVisible);
      }

      lastScrollYRef.current = nextScrollY;
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateNavVisibility);
      }
    };

    lastScrollYRef.current = Math.max(0, window.scrollY);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("touchmove", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("touchmove", requestUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;

    if (isMenuOpen && !isNavVisibleRef.current) {
      isNavVisibleRef.current = true;
      setIsNavVisible(true);
    }
  }, [isMenuOpen]);

  function go(route: Route) {
    setIsMenuOpen(false);
    setIsAboutOpen(false);
    navigate(route);
  }

  function signOutFromNav() {
    setIsMenuOpen(false);
    setIsAboutOpen(false);
    onSignOut?.();
  }

  function openHowItWorks() {
    setIsMenuOpen(false);
    setIsAboutOpen(false);
    if (onHowItWorksClick) {
      onHowItWorksClick();
      return;
    }
    navigate("how-it-works");
  }

  function renderAuthAction() {
    return isSignedIn ? (
      <button className="link-button" onClick={signOutFromNav} type="button">
        Sign Out
      </button>
    ) : (
      <button className="link-button" onClick={() => go("sign-in")} type="button">
        Sign In
      </button>
    );
  }

  return (
    <header className={["site-header", isNavVisible ? "site-header-visible" : "site-header-hidden"].join(" ")}>
      <div className="navbar-inner">
        <Brand onClick={() => go("home")} />
        <nav aria-label="Primary" className="site-nav">
          <button className="link-button" onClick={openHowItWorks} type="button">
            How It Works
          </button>
          <button className="link-button" onClick={() => go("pricing")} type="button">
            Pricing
          </button>
          <div
            className="nav-dropdown"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              aria-expanded={isAboutOpen}
              aria-haspopup="menu"
              className="link-button dropdown-trigger"
              onBlur={(event) => {
                if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node | null)) {
                  setIsAboutOpen(false);
                }
              }}
              onFocus={() => setIsAboutOpen(true)}
              onClick={() => setIsAboutOpen((current) => !current)}
              type="button"
            >
              About
              <span aria-hidden="true" className="dropdown-caret">
                ▾
              </span>
            </button>
            {isAboutOpen ? (
              <div className="dropdown-panel-wrap">
                <div className="dropdown-panel" role="menu">
                  {aboutLinks.map((item) => (
                    <button className="dropdown-link" key={item.route} onClick={() => go(item.route)} role="menuitem" type="button">
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </nav>
        <div className="nav-actions">
          {renderAuthAction()}
          {canStartScan ? (
            <button className="nav-cta" onClick={() => go("scan")} type="button">
              Find my incentives
            </button>
          ) : null}
        </div>
        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          className="menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        {canStartScan ? (
          <button className="mobile-cta" onClick={() => go("scan")} type="button">
            Find incentives
          </button>
        ) : null}
        {isMenuOpen ? (
          <div className="mobile-menu-panel">
            <button className="link-button" onClick={openHowItWorks} type="button">
              How It Works
            </button>
            <button className="link-button" onClick={() => go("pricing")} type="button">
              Pricing
            </button>
            <div className="mobile-about-group">
              <span>About</span>
              {aboutLinks.map((item) => (
                <button className="mobile-sub-link" key={item.route} onClick={() => go(item.route)} type="button">
                  {item.label}
                </button>
              ))}
            </div>
            {renderAuthAction()}
            {canStartScan ? (
              <button className="nav-cta" onClick={() => go("scan")} type="button">
                Find my incentives
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}

function Footer({
  canStartScan = true,
  navigate
}: {
  canStartScan?: boolean;
  navigate: (route: Route) => void;
}) {
  const siteLinks: Array<[string, Route]> = [
    ["How It Works", "how-it-works"],
    ["Pricing", "pricing"]
  ];

  if (canStartScan) {
    siteLinks.push(["Get Started", "scan"]);
  }

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Brand onClick={() => navigate("home")} />
        <p>Helping you identify, fund, and plan high-value sustainability retrofits.</p>
      </div>
      <nav aria-label="Site links" className="footer-links">
        <span className="footer-heading">Site</span>
        {siteLinks.map(([label, route]) => (
          <button className="footer-link" key={route} onClick={() => navigate(route)} type="button">
            {label}
          </button>
        ))}
      </nav>
      <nav aria-label="Company links" className="footer-links">
        <span className="footer-heading">Company</span>
        {aboutLinks.map((item) => (
          <button className="footer-link" key={item.route} onClick={() => navigate(item.route)} type="button">
            {item.label}
          </button>
        ))}
      </nav>
      <div className="footer-meta">
        <span className="footer-heading">Contact</span>
        <a href="mailto:hello@retrofi.org">hello@retrofi.org</a>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </footer>
  );
}

function PublicShell({
  children,
  navigate,
  onHowItWorksClick,
  pageClassName,
  publicAuth,
  showFooter = false
}: {
  children: ReactNode;
  navigate: (route: Route) => void;
  onHowItWorksClick?: () => void;
  pageClassName?: string;
  publicAuth?: PublicAuthState;
  showFooter?: boolean;
}) {
  const canStartScan = true;

  return (
    <main className={["public-page", pageClassName].filter(Boolean).join(" ")}>
      <PublicNav
        canStartScan={canStartScan}
        isSignedIn={Boolean(publicAuth?.isSignedIn)}
        navigate={navigate}
        onHowItWorksClick={onHowItWorksClick}
        onSignOut={publicAuth?.onSignOut}
      />
      {children}
      {showFooter ? <Footer canStartScan={canStartScan} navigate={navigate} /> : null}
    </main>
  );
}

function CTAButton({
  children,
  navigate,
  route,
  variant = "primary"
}: {
  children: ReactNode;
  navigate: (route: Route) => void;
  route: Route;
  variant?: "primary" | "secondary";
}) {
  return (
    <button className={variant === "secondary" ? "secondary-button" : undefined} onClick={() => navigate(route)} type="button">
      {children}
    </button>
  );
}

function ScanStartButton({
  children,
  navigate,
  publicAuth,
  variant = "primary"
}: {
  children: ReactNode;
  navigate: (route: Route) => void;
  publicAuth?: PublicAuthState;
  variant?: "primary" | "secondary";
}) {
  return (
    <CTAButton navigate={navigate} route="scan" variant={variant}>
      {children}
    </CTAButton>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "section-heading-block center" : "section-heading-block"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function AboutSubnav({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <div className="about-subnav">
      <button className="about-subnav-link" onClick={() => navigate("about")} type="button">
        Overview
      </button>
      {aboutLinks.map((item) => (
        <button className="about-subnav-link" key={item.route} onClick={() => navigate(item.route)} type="button">
          {item.label}
        </button>
      ))}
    </div>
  );
}

function AboutHubCard({
  copy,
  icon,
  label,
  navigate,
  route,
  title
}: {
  copy: string;
  icon: "mission" | "team" | "trust" | "contact";
  label: string;
  navigate: (route: Route) => void;
  route: Route;
  title: string;
}) {
  return (
    <article className="hub-card">
      <FeatureIcon icon={icon} />
      <div>
        <p className="eyebrow">{label}</p>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      <button className="text-link with-icon" onClick={() => navigate(route)} type="button">
        Learn more
        <ArrowUpRightIcon />
      </button>
    </article>
  );
}

const scannerDashboardImage = "/home/final-4-cards-page.png";
const scannerDashboardStartMotion = { scale: 2.34, x: 0, y: -18 };
const scannerDashboardEndMotion = { scale: 1, x: 0, y: 0 };

function PlanetScanHero({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <ScrollFrameScanner ariaLabelledBy="planet-scan-heading" className="planet-scan-section" frames={scannerFrames}>
      <div className="planet-scan-content">
        <div className="planet-scan-copy">
          <div className="planet-scan-message planet-scan-message-static planet-scan-message-primary">
            <h1 className="planet-scan-title planet-scan-title--before" id="planet-scan-heading">
              <span>Find the money</span>
              <span>behind your next</span>
              <span className="planet-scan-title-accent">retrofit.</span>
            </h1>
            <p className="planet-scan-subhead">Billions in retrofit incentives exist while building owners lose billions to operating expenses.</p>
            <div className="planet-scan-action">
              <button className="planet-scan-cta planet-scan-primary" onClick={() => navigate("scan")} type="button">
                Find my incentives
                <ArrowUpRightIcon />
              </button>
              <p>Free property scan · No commitment</p>
            </div>
          </div>
          <div className="planet-scan-message planet-scan-message-static planet-scan-message-next">
            <h2 className="planet-scan-next-headline">RetroFi helps businesses find, compare, claim, and implement retrofit incentives.</h2>
            <p className="planet-scan-emphasis">Sustainable. Profitable. Practical.</p>
          </div>
        </div>
      </div>
    </ScrollFrameScanner>
  );
}

function LegacyPlanetScanHero({ navigate }: { navigate: (route: Route) => void }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let targetProgress = 0;
    let displayProgress = 0;
    let hasMeasuredProgress = false;
    let isDisposed = false;
    let autoTransitionActive = false;
    let autoTransitionSettledSide: "before" | "after" | null = null;
    let autoTransitionDirection: "forward" | "reverse" | null = null;
    let autoTransitionStartProgress = 0;
    let autoTransitionEndProgress = 1;
    let autoTransitionStartTime = 0;
    let pendingAutoTransitionDirection: "forward" | "reverse" | null = null;
    let dashboardScrollLockActive = false;
    let dashboardScrollLockConsumed = 0;
    let touchStartY: number | null = null;
    let dashboardImageLoaded = false;
    let dashboardImage: HTMLImageElement | null = null;
    const scannerEnd = 0.68;
    const resultClearStart = 0.7;
    const resultClearEnd = 0.76;
    const transitionStart = 0.78;
    const transitionEnd = 1;
    const forwardAutoTrigger = transitionStart + 0.006;
    const reverseAutoTrigger = 0.995;
    const autoTransitionDuration = 680;
    const dashboardScrollLockDistance = 520;
    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;
    const smootherstep = (value: number) => {
      const clamped = clamp(value);
      return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
    };
    const easeOutCubic = (value: number) => {
      const clamped = clamp(value);
      return 1 - Math.pow(1 - clamped, 3);
    };
    const smoothstep = (start: number, end: number, value: number) => {
      if (start === end) return value >= end ? 1 : 0;
      const clamped = clamp((value - start) / (end - start));
      return clamped * clamped * (3 - 2 * clamped);
    };
    const setDashboardMotion = (motion: { scale: number; x: number; y: number }) => {
      section?.style.setProperty("--scanner-dashboard-scale", motion.scale.toFixed(4));
      section?.style.setProperty("--scanner-dashboard-x", `${motion.x.toFixed(2)}vw`);
      section?.style.setProperty("--scanner-dashboard-y", `${motion.y.toFixed(2)}vh`);
    };

    const measureScrollProgress = () => {
      if (!section) {
        return 0;
      }

      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      return clamp(-section.getBoundingClientRect().top / scrollDistance);
    };

    const getScrollYForProgress = (progress: number) => {
      if (!section) {
        return window.scrollY;
      }

      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      return sectionTop + scrollDistance * clamp(progress);
    };

    const startAutoTransition = (direction: "forward" | "reverse", timestamp: number) => {
      autoTransitionActive = true;
      autoTransitionDirection = direction;
      pendingAutoTransitionDirection = null;
      dashboardScrollLockActive = false;
      dashboardScrollLockConsumed = 0;
      autoTransitionStartTime = timestamp;
      autoTransitionStartProgress =
        direction === "forward"
          ? clamp(Math.max(targetProgress, transitionStart), transitionStart, 1)
          : clamp(targetProgress, transitionStart, 1);
      autoTransitionEndProgress = direction === "forward" ? 1 : transitionStart;
      targetProgress = autoTransitionStartProgress;
      displayProgress = autoTransitionStartProgress;
      window.scrollTo(0, getScrollYForProgress(displayProgress));
    };

    const updateScan = (timestamp = window.performance.now()) => {
      animationFrame = 0;

      if (!section) {
        return;
      }

      if (reducedMotionQuery.matches) {
        section.style.setProperty("--planet-scan-position", "100%");
        section.style.setProperty("--planet-scan-ray-opacity", "0");
        section.style.setProperty("--planet-scan-hint-opacity", "0");
        section.style.setProperty("--planet-scan-erase", "1");
        section.style.setProperty("--planet-scan-reveal", "1");
        section.style.setProperty("--planet-scan-result-copy-opacity", "0");
        section.style.setProperty("--planet-scan-magic-opacity", "0");
        section.style.setProperty("--planet-scan-layer-opacity", "0");
        section.style.setProperty("--scanner-dashboard-opacity", "1");
        setDashboardMotion(scannerDashboardEndMotion);
        return;
      }

      if (!hasMeasuredProgress) {
        targetProgress = measureScrollProgress();
        displayProgress = targetProgress;
        hasMeasuredProgress = true;
      }

      if (pendingAutoTransitionDirection && dashboardImageLoaded && !autoTransitionActive) {
        startAutoTransition(pendingAutoTransitionDirection, timestamp);
      }

      if (autoTransitionActive) {
        const autoProgress = clamp((timestamp - autoTransitionStartTime) / autoTransitionDuration);
        const easedAutoProgress = easeOutCubic(autoProgress);
        targetProgress = lerp(autoTransitionStartProgress, autoTransitionEndProgress, easedAutoProgress);
        displayProgress = targetProgress;
        window.scrollTo(0, getScrollYForProgress(displayProgress));

        if (autoProgress >= 1) {
          const settledProgress = autoTransitionEndProgress;
          autoTransitionActive = false;
          autoTransitionSettledSide = autoTransitionDirection === "forward" ? "after" : "before";
          dashboardScrollLockActive = autoTransitionDirection === "forward";
          dashboardScrollLockConsumed = 0;
          autoTransitionDirection = null;
          targetProgress = settledProgress;
          displayProgress = settledProgress;
          window.scrollTo(0, getScrollYForProgress(settledProgress));
        }
      } else {
        const animationTargetProgress = dashboardImageLoaded ? targetProgress : Math.min(targetProgress, transitionStart);
        const progressDelta = animationTargetProgress - displayProgress;
        displayProgress = Math.abs(progressDelta) < 0.0006 ? animationTargetProgress : displayProgress + progressDelta * 0.12;
      }

      const rawProgress = displayProgress;
      const scannerProgress = clamp(rawProgress / scannerEnd);
      const easedProgress = smootherstep(scannerProgress);
      const transitionProgress = clamp((rawProgress - transitionStart) / (transitionEnd - transitionStart));
      const dashboardOpacity = smoothstep(0.03, 0.2, transitionProgress);
      const scannerLayerOpacity = 1 - smoothstep(0.12, 0.42, transitionProgress);
      const edgeFade = Math.min(1, scannerProgress * 10, (1 - scannerProgress) * 10);
      const eraseProgress = Math.min(1, Math.max(0, (easedProgress - 0.08) / 0.34));
      const revealProgress = Math.min(1, Math.max(0, (easedProgress - 0.54) / 0.3));
      const resultCopyOpacity = 1 - smoothstep(resultClearStart, resultClearEnd, rawProgress);
      const magicOpacity = Math.min(1, edgeFade, Math.max(0, (easedProgress - 0.06) / 0.12), Math.max(0, (0.96 - easedProgress) / 0.18));
      const dashboardMotionProgress = smootherstep(transitionProgress);
      const dashboardMotion = {
        scale: lerp(scannerDashboardStartMotion.scale, scannerDashboardEndMotion.scale, dashboardMotionProgress),
        x: lerp(scannerDashboardStartMotion.x, scannerDashboardEndMotion.x, dashboardMotionProgress),
        y: lerp(scannerDashboardStartMotion.y, scannerDashboardEndMotion.y, dashboardMotionProgress)
      };
      const safeDashboardOpacity = dashboardImageLoaded ? dashboardOpacity : 0;
      const safeScannerLayerOpacity = dashboardImageLoaded ? scannerLayerOpacity : 1;

      section.style.setProperty("--planet-scan-position", `${easedProgress * 100}%`);
      section.style.setProperty("--planet-scan-ray-opacity", `${Math.max(0, edgeFade)}`);
      section.style.setProperty("--planet-scan-hint-opacity", `${Math.max(0, 1 - rawProgress * 6)}`);
      section.style.setProperty("--planet-scan-erase", String(eraseProgress));
      section.style.setProperty("--planet-scan-reveal", String(revealProgress));
      section.style.setProperty("--planet-scan-result-copy-opacity", String(resultCopyOpacity));
      section.style.setProperty("--planet-scan-magic-opacity", String(magicOpacity));
      section.style.setProperty("--planet-scan-layer-opacity", String(safeScannerLayerOpacity));
      section.style.setProperty("--scanner-dashboard-opacity", String(safeDashboardOpacity));
      setDashboardMotion(dashboardMotion);

      const shouldContinueSmoothing =
        autoTransitionActive ||
        Math.abs((dashboardImageLoaded ? targetProgress : Math.min(targetProgress, transitionStart)) - displayProgress) > 0.0006;

      if (shouldContinueSmoothing) {
        scheduleScanUpdate();
      }
    };

    const scheduleScanUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateScan);
      }
    };

    const handleScrollProgressChange = () => {
      const measuredProgress = measureScrollProgress();

      if (autoTransitionActive) {
        return;
      }

      if (!hasMeasuredProgress) {
        targetProgress = measuredProgress;
        displayProgress = measuredProgress;
        autoTransitionSettledSide = measuredProgress >= reverseAutoTrigger ? "after" : "before";
        hasMeasuredProgress = true;
      }

      if (autoTransitionSettledSide === "after" && measuredProgress < reverseAutoTrigger) {
        pendingAutoTransitionDirection = "reverse";
        targetProgress = measuredProgress;
      } else if (autoTransitionSettledSide !== "after" && measuredProgress >= forwardAutoTrigger) {
        pendingAutoTransitionDirection = "forward";
        targetProgress = Math.max(measuredProgress, transitionStart);
      } else {
        pendingAutoTransitionDirection = null;
        targetProgress = measuredProgress;
        if (measuredProgress < transitionStart - 0.04) {
          autoTransitionSettledSide = "before";
        } else if (measuredProgress >= reverseAutoTrigger) {
          autoTransitionSettledSide = "after";
        }
      }

      scheduleScanUpdate();
    };

    const holdDashboardScrollLock = (scrollAmount: number) => {
      if (!section || scrollAmount <= 0 || autoTransitionSettledSide !== "after") {
        return false;
      }

      const measuredProgress = measureScrollProgress();
      if (measuredProgress < reverseAutoTrigger) {
        return false;
      }

      if (!dashboardScrollLockActive) {
        return false;
      }

      dashboardScrollLockConsumed += scrollAmount;
      window.scrollTo(0, getScrollYForProgress(1));

      if (dashboardScrollLockConsumed >= dashboardScrollLockDistance) {
        dashboardScrollLockActive = false;
        dashboardScrollLockConsumed = 0;
      }

      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (autoTransitionActive) {
        event.preventDefault();
        return;
      }

      if (holdDashboardScrollLock(event.deltaY)) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (autoTransitionActive) {
        event.preventDefault();
        return;
      }

      const currentY = event.touches[0]?.clientY;
      if (touchStartY == null || currentY == null) {
        return;
      }

      const scrollAmount = touchStartY - currentY;
      if (holdDashboardScrollLock(scrollAmount)) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (autoTransitionActive) {
        event.preventDefault();
        return;
      }

      const scrollKeys: Record<string, number> = {
        " ": window.innerHeight * 0.8,
        ArrowDown: 80,
        PageDown: window.innerHeight * 0.8,
        End: dashboardScrollLockDistance
      };
      const scrollAmount = scrollKeys[event.key] ?? 0;

      if (holdDashboardScrollLock(scrollAmount)) {
        event.preventDefault();
      }
    };

    dashboardImage = new Image();
    dashboardImage.decoding = "async";
    dashboardImage.onload = () => {
      const markDashboardLoaded = () => {
        if (isDisposed) {
          return;
        }

        dashboardImageLoaded = true;
        scheduleScanUpdate();
      };

      if (dashboardImage?.decode) {
        void dashboardImage.decode().then(markDashboardLoaded).catch(markDashboardLoaded);
        return;
      }

      markDashboardLoaded();
    };
    dashboardImage.src = scannerDashboardImage;

    handleScrollProgressChange();
    window.addEventListener("scroll", handleScrollProgressChange, { passive: true });
    window.addEventListener("resize", handleScrollProgressChange);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    reducedMotionQuery.addEventListener("change", scheduleScanUpdate);

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrame);
      if (dashboardImage) {
        dashboardImage.onload = null;
      }
      window.removeEventListener("scroll", handleScrollProgressChange);
      window.removeEventListener("resize", handleScrollProgressChange);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      reducedMotionQuery.removeEventListener("change", scheduleScanUpdate);
    };
  }, []);

  return (
    <section aria-labelledby="planet-scan-heading" className="planet-scan-section" ref={sectionRef}>
      <div className="planet-scan-sticky">
        <div aria-hidden="true" className="planet-scan-visual">
          <img
            alt=""
            className="planet-scan-image planet-scan-image-before"
            decoding="async"
            fetchPriority="high"
            loading="eager"
            src="/home/planet-before.jpg"
          />
          <div className="planet-scan-after-reveal">
            <img
              alt=""
              className="planet-scan-image planet-scan-image-after"
              decoding="async"
              fetchPriority="high"
              loading="eager"
              src="/home/planet-after.jpg"
            />
          </div>
          <span className="planet-scan-ray" />
          <div aria-hidden="true" className="planet-scan-magic-trail">
            {Array.from({ length: 7 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="planet-scan-shade" />

        <div aria-hidden="true" className="scanner-dashboard-layer">
          <img
            alt=""
            className="scanner-dashboard-panel"
            decoding="async"
            loading="eager"
            src={scannerDashboardImage}
          />
        </div>

        <div className="planet-scan-content">
          <div className="planet-scan-copy">
            <div className="planet-scan-message planet-scan-message-before">
              <h1 className="planet-scan-title planet-scan-title--before" id="planet-scan-heading">
                <span>Find the money</span>
                <span>behind your next</span>
                <span className="planet-scan-title-accent">retrofit.</span>
              </h1>
              <p className="planet-scan-subhead">Billions in retrofit incentives exist while building owners lose billions to operating expenses.</p>
            </div>
          </div>

          <div className="planet-scan-result-copy">
            <h2 className="planet-scan-title planet-scan-title--after">
              <span>Find, compare, and claim</span>
              <span>retrofit incentives.</span>
            </h2>
            <p className="planet-scan-emphasis">Sustainable. Profitable. Practical.</p>
            <button className="planet-scan-cta planet-scan-primary planet-scan-cta--after" onClick={() => navigate("scan")} type="button">
              Get Started
            </button>
          </div>
        </div>

        <div aria-hidden="true" className="planet-scan-scroll-cue">
          <span />
          Scroll to scan
        </div>
      </div>
    </section>
  );
}

const homeRankedRetrofits = [
  {
    impact: "2.41 tCO2e/yr",
    name: "Insulation",
    savings: "$61K/yr",
    scope: "Improve building envelope efficiency over time.",
    spend: "$280K",
    timeline: "4.6 yrs"
  },
  {
    impact: "3.11 tCO2e/yr",
    name: "EV chargers",
    savings: "$8.5K/yr",
    scope: "Add charging capability for residents and tenants.",
    spend: "$54K",
    timeline: "6.4 yrs"
  }
];

const homeSavingsBars = [28, 44, 58, 74, 92];
const homeImpactPoints = [
  { label: "Year 1", value: 46 },
  { label: "Year 2", value: 125 },
  { label: "Year 3", value: 319 },
  { label: "Year 4", value: 558 },
  { label: "Year 5", value: 618 },
  { label: "Year 7", value: 818 },
  { label: "Year 8", value: 926 },
  { label: "Year 9", value: 938 },
  { label: "Year 10", value: 1247 }
];

const homeApplicationSteps = [
  {
    detail: "Set up profile and property details.",
    label: "Create account",
    time: "5-10 min"
  },
  {
    detail: "View matching grants and incentive recommendations.",
    label: "Explore grants",
    time: "5-10 min"
  },
  {
    detail: "Submit your application and documents securely online.",
    label: "Submit application",
    time: "15-20 min"
  },
  {
    detail: "Track status and receive your incentives.",
    label: "Get approved",
    time: "2-6 weeks"
  }
];

function HomeInfographicSection({ navigate }: { navigate: (route: Route) => void }) {
  const impactPolyline = homeImpactPoints
    .map((point, index) => {
      const x = 24 + index * 32;
      const y = 150 - (point.value / 1300) * 112;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section aria-labelledby="home-infographics-heading" className="home-infographics-section">
      <div aria-hidden="true" className="home-greenery home-greenery--top-left">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div aria-hidden="true" className="home-greenery home-greenery--top-right">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div aria-hidden="true" className="home-greenery home-greenery--lower-left">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="home-infographics-inner">
        <header className="home-infographics-header">
          <p>Retrofit intelligence</p>
          <h2 id="home-infographics-heading">Know what to upgrade—and what it could be worth.</h2>
          <span>RetroFi turns property details into prioritized projects, financial estimates, and a clear path to available incentives.</span>
        </header>

        <div className="home-infographic-stage home-infographic-stage--primary">
          <article className="home-infographic-card home-infographic-card--ranked">
            <div className="home-infographic-card-heading">
              <span>01</span>
              <div>
                <h3>TOP RETROFITS RANKED</h3>
                <p>Top retrofit rankings by impact and costs.</p>
              </div>
            </div>
            <div className="home-ranked-retrofits">
              {homeRankedRetrofits.map((retrofit) => (
                <div className="home-ranked-retrofit" key={retrofit.name}>
                  <span className="home-ranked-icon">
                    {retrofit.name === "Insulation" ? <HomeOutlineIcon /> : <FeatureIcon icon="roadmap" />}
                  </span>
                  <div className="home-ranked-body">
                    <h4>{retrofit.name}</h4>
                    <p>{retrofit.scope}</p>
                    <dl>
                      <div>
                        <dt>Savings</dt>
                        <dd>{retrofit.savings}</dd>
                      </div>
                      <div>
                        <dt>Cost</dt>
                        <dd>{retrofit.spend}</dd>
                      </div>
                      <div>
                        <dt>Payback</dt>
                        <dd>{retrofit.timeline}</dd>
                      </div>
                    </dl>
                    <div className="home-impact-row">
                      <LeafOutlineIcon />
                      <span>Environmental impact</span>
                      <strong>{retrofit.impact}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="home-infographic-card home-infographic-card--savings">
            <div className="home-infographic-card-heading">
              <span>02</span>
              <div>
                <h3>FINANCIAL SAVINGS</h3>
                <p>Estimated annual savings</p>
              </div>
            </div>
            <div className="home-savings-figure">
              <strong>$1.42M</strong>
              <span>+13% vs. current spend</span>
            </div>
            <div aria-label="Five year annual savings growth" className="home-bar-chart" role="img">
              {homeSavingsBars.map((height, index) => (
                <i key={index} style={{ "--bar-height": `${height}%` } as CSSProperties}>
                  <span>{`YR ${index + 1}`}</span>
                </i>
              ))}
            </div>
          </article>
        </div>

        <div className="home-infographic-stage home-infographic-stage--secondary">
          <article className="home-infographic-card home-infographic-card--impact">
            <div className="home-infographic-card-heading">
              <span>03</span>
              <div>
                <h3>CUMULATIVE CO2e AVOIDED</h3>
                <p>Total cumulative CO2e avoided this retrofit over time.</p>
              </div>
            </div>
            <div className="home-impact-total">
              <span>10-year total</span>
              <strong>1,247 tCO2e</strong>
              <small>Cumulative CO2e avoided</small>
            </div>
            <svg aria-label="Cumulative CO2e avoided over 10 years" className="home-line-chart" role="img" viewBox="0 0 300 170">
              <g className="home-line-grid">
                <path d="M24 38h252M24 76h252M24 114h252M24 152h252" />
              </g>
              <polyline points={impactPolyline} />
              {homeImpactPoints.map((point, index) => {
                const cx = 24 + index * 32;
                const cy = 150 - (point.value / 1300) * 112;
                return (
                  <g key={point.label}>
                    <circle cx={cx} cy={cy} r="3.6" />
                    <text x={cx} y={cy - 8}>
                      {point.value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </article>

          <article className="home-infographic-card home-infographic-card--process">
            <div className="home-infographic-card-heading">
              <span>04</span>
              <div>
                <h3>APPLICATION PROCESS</h3>
                <p>Apply for grants and incentives on retrofi.org in 4 simple steps.</p>
              </div>
            </div>
            <div className="home-process-steps">
              {homeApplicationSteps.map((step, index) => (
                <div className="home-process-step" key={step.label}>
                  <span className="home-process-number">{index + 1}</span>
                  <span className="home-process-icon">{index === 3 ? <CheckIcon /> : <FeatureIcon icon={index === 0 ? "contact" : index === 1 ? "savings" : "roadmap"} />}</span>
                  <h4>{step.label}</h4>
                  <strong>{step.time}</strong>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="home-infographics-cta">
          <div>
            <p>Ready to find opportunities for your property?</p>
            <span>Start with a free scan. Add utility data later for more precise estimates.</span>
          </div>
          <button onClick={() => navigate("scan")} type="button">
            Find my incentives
            <ArrowUpRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

function HowItWorksJourneySection({
  sectionId,
  withDashboardHandoff = false
}: {
  sectionId?: string;
  withDashboardHandoff?: boolean;
}) {
  const transitionStart = 0.38;
  const transitionEnd = 0.62;
  const journeyRef = useRef<HTMLElement | null>(null);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );
  const stages = [
    {
      title: "Create your account",
      copy: "Sign up and add your basic property details to get started.",
      accent: "Account",
      image: "/how-it-works/transformation-stage-01.jpg"
    },
    {
      title: "Discover opportunities",
      copy: "RetroFi analyzes your property and identifies the most impactful retrofit opportunities.",
      accent: "Discovery",
      image: "/how-it-works/transformation-stage-02.jpg"
    },
    {
      title: "Refine your estimates",
      copy: "Add utility data and answer a few project-specific questions to improve accuracy.",
      accent: "Estimates",
      image: "/how-it-works/transformation-stage-03.jpg"
    },
    {
      title: "Review recommendations",
      copy: "Compare projected savings, costs, incentives, and environmental impact.",
      accent: "Review",
      image: "/how-it-works/transformation-stage-04.jpg"
    },
    {
      title: "Choose your retrofits",
      copy: "Select the upgrades that best fit your goals and budget.",
      accent: "Choose",
      image: "/how-it-works/transformation-stage-05.jpg"
    },
    {
      title: "Automate paperwork",
      copy: "Generate and complete the required forms and documentation for your selected projects.",
      accent: "Forms",
      image: "/how-it-works/transformation-stage-06.jpg"
    },
    {
      title: "Track your impact",
      copy: "Monitor savings, impact, certification progress, and project status over time.",
      accent: "Impact",
      image: "/how-it-works/transformation-stage-07-retrofi.jpg"
    }
  ];
  const cloudLayers = [
    {
      className: "journey-cloud-object journey-cloud-object-ambient",
      left: "-14vw",
      top: "-13vh",
      width: "128vw",
      height: "78vh",
      exitX: 0,
      exitY: -32,
      speed: 0.82,
      opacity: 0.78,
      baseScale: 1,
      exitScale: 1.08,
      blur: 1.6,
      exitBlur: 4
    },
    {
      className: "journey-cloud-object journey-cloud-object-back",
      left: "9vw",
      top: "-8vh",
      width: "82vw",
      height: "48vh",
      exitX: 0,
      exitY: -34,
      speed: 0.92,
      opacity: 0.72,
      baseScale: 1,
      exitScale: 1.04,
      blur: 1.1,
      exitBlur: 3
    },
    {
      className: "journey-cloud-object journey-cloud-object-mid",
      left: "-10vw",
      top: "13vh",
      width: "72vw",
      height: "58vh",
      exitX: -42,
      exitY: -16,
      speed: 1.06,
      opacity: 0.88,
      baseScale: 1.02,
      exitScale: 1.12,
      blur: 0.4,
      exitBlur: 2.8
    },
    {
      className: "journey-cloud-object journey-cloud-object-mid",
      left: "42vw",
      top: "10vh",
      width: "74vw",
      height: "60vh",
      exitX: 43,
      exitY: -14,
      speed: 1.02,
      opacity: 0.9,
      baseScale: 1.02,
      exitScale: 1.1,
      blur: 0.3,
      exitBlur: 2.5
    },
    {
      className: "journey-cloud-object journey-cloud-object-front",
      left: "-18vw",
      top: "52vh",
      width: "68vw",
      height: "47vh",
      exitX: -34,
      exitY: 28,
      speed: 1.18,
      opacity: 0.94,
      baseScale: 1.04,
      exitScale: 1.16,
      blur: 0,
      exitBlur: 2.2
    },
    {
      className: "journey-cloud-object journey-cloud-object-front",
      left: "50vw",
      top: "51vh",
      width: "70vw",
      height: "48vh",
      exitX: 34,
      exitY: 30,
      speed: 1.2,
      opacity: 0.94,
      baseScale: 1.04,
      exitScale: 1.16,
      blur: 0,
      exitBlur: 2.2
    },
    {
      className: "journey-cloud-object journey-cloud-object-front",
      left: "15vw",
      top: "37vh",
      width: "72vw",
      height: "44vh",
      exitX: 0,
      exitY: 26,
      speed: 1.1,
      opacity: 0.82,
      baseScale: 1.02,
      exitScale: 1.12,
      blur: 0.2,
      exitBlur: 2.8
    },
    {
      className: "journey-cloud-object journey-cloud-object-edge",
      left: "-28vw",
      top: "2vh",
      width: "48vw",
      height: "88vh",
      exitX: -42,
      exitY: 2,
      speed: 0.98,
      opacity: 0.72,
      baseScale: 1,
      exitScale: 1.08,
      blur: 0.9,
      exitBlur: 3
    },
    {
      className: "journey-cloud-object journey-cloud-object-edge",
      left: "80vw",
      top: "4vh",
      width: "48vw",
      height: "86vh",
      exitX: 42,
      exitY: 0,
      speed: 1,
      opacity: 0.72,
      baseScale: 1,
      exitScale: 1.08,
      blur: 0.9,
      exitBlur: 3
    }
  ];

  const revealScrollUnits = 1.2;
  const journeyScrollUnits = stages.length - 1;
  const revealShare = revealScrollUnits / (revealScrollUnits + journeyScrollUnits);
  const clampProgress = (value: number) => Math.min(1, Math.max(0, value));
  const smootherstep = (value: number) => {
    const clamped = clampProgress(value);
    return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
  };
  const smoothstep = (start: number, end: number, value: number) => {
    if (start === end) return value >= end ? 1 : 0;
    const clamped = clampProgress((value - start) / (end - start));
    return clamped * clamped * (3 - 2 * clamped);
  };
  const dashboardHandoffEnabled = withDashboardHandoff && !prefersReducedMotion;
  const dashboardHandoffShare = dashboardHandoffEnabled ? revealShare * 0.82 : 0;
  const journeySectionProgress = dashboardHandoffEnabled
    ? clampProgress((sectionProgress - dashboardHandoffShare) / (1 - dashboardHandoffShare))
    : sectionProgress;
  const revealProgress = Math.min(1, Math.max(0, journeySectionProgress / revealShare));
  const continuousJourneyProgress =
    Math.min(1, Math.max(0, (journeySectionProgress - revealShare) / (1 - revealShare))) * journeyScrollUnits;
  const journeyProgress = prefersReducedMotion
    ? Math.round(continuousJourneyProgress)
    : continuousJourneyProgress;
  const activeStageIndex = Math.min(stages.length - 1, Math.max(0, Math.round(journeyProgress)));
  const activeStage = stages[activeStageIndex];
  const easedRevealProgress = revealProgress * revealProgress * (3 - 2 * revealProgress);
  const cloudTravelProgress = prefersReducedMotion ? 0 : easedRevealProgress;
  const cloudHazeOpacity = prefersReducedMotion
    ? revealProgress < 1
      ? 0.32
      : 0
    : Math.max(0, 0.32 * (1 - easedRevealProgress));
  const cloudSkyOpacity = prefersReducedMotion
    ? revealProgress < 1
      ? 0.78
      : 0
    : Math.max(0, 0.78 * (1 - easedRevealProgress));
  const dashboardHandoffProgress = dashboardHandoffEnabled ? clampProgress(sectionProgress / dashboardHandoffShare) : 1;
  const dashboardHandoffCloudReveal = dashboardHandoffEnabled ? smoothstep(0.12, 0.8, dashboardHandoffProgress) : 1;
  const dashboardHandoffSceneReveal = dashboardHandoffEnabled ? smoothstep(0.72, 1, dashboardHandoffProgress) : 1;
  const dashboardHandoffOverlayOpacity = dashboardHandoffEnabled
    ? smoothstep(0.22, 0.72, dashboardHandoffProgress) * (1 - smoothstep(0.84, 1, dashboardHandoffProgress))
    : 0;
  const dashboardHandoffDarkCloudOpacity =
    dashboardHandoffEnabled
      ? smoothstep(0.26, 0.72, dashboardHandoffProgress) * (1 - smoothstep(0.72, 1, dashboardHandoffProgress))
      : 0;
  const dashboardHandoffHazeOpacity = dashboardHandoffEnabled ? smoothstep(0.58, 0.96, dashboardHandoffProgress) : 0;
  const introHandoffGate = dashboardHandoffEnabled ? smoothstep(0.86, 1, dashboardHandoffProgress) : 1;
  const showIntro = prefersReducedMotion ? revealProgress < 1 : revealProgress < 0.7;
  const baseIntroOpacity = prefersReducedMotion ? 1 : Math.max(0, 1 - revealProgress / 0.55);
  const introOpacity = baseIntroOpacity * introHandoffGate;
  const visualProgress = (() => {
    if (prefersReducedMotion) {
      return activeStageIndex;
    }

    const clamped = Math.min(stages.length - 1, Math.max(0, journeyProgress));
    const whole = Math.floor(clamped);

    if (whole >= stages.length - 1) {
      return stages.length - 1;
    }

    const local = clamped - whole;

    if (local <= transitionStart) {
      return whole;
    }

    if (local >= transitionEnd) {
      return whole + 1;
    }

    const normalized = (local - transitionStart) / (transitionEnd - transitionStart);
    const eased = normalized * normalized * (3 - 2 * normalized);
    return whole + eased;
  })();

  useEffect(() => {
    const journey = journeyRef.current;

    if (!journey) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let autoHandoffActive = false;
    let autoHandoffSettled = false;
    let autoHandoffReturned = false;
    let autoHandoffDirection: "forward" | "reverse" = "forward";
    let touchStartY: number | null = null;
    let autoHandoffStartProgress = 0;
    let autoHandoffStartTime = 0;
    let lastNormalizedProgress = 0;
    let dashboardHandoffDeadzoneConsumed = 0;
    let dashboardHandoffDeadzoneReady = false;
    const autoHandoffDuration = 860;
    const dashboardHandoffDeadzoneDistance = 780;
    const handoffEndProgress = revealShare * 0.82;
    const revealEndProgress = handoffEndProgress + revealShare * (1 - handoffEndProgress);
    const reverseCatchProgress = handoffEndProgress + (revealEndProgress - handoffEndProgress) * 0.78;
    const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;
    const easeOutCubic = (value: number) => {
      const clamped = clampProgress(value);
      return 1 - Math.pow(1 - clamped, 3);
    };
    const resetDashboardHandoff = () => {
      const scanner = document.querySelector<HTMLElement>(".planet-scan-section");

      if (!scanner) {
        return;
      }

      scanner.classList.remove("planet-scan-section--cloud-handoff");
      scanner.style.removeProperty("--scanner-dashboard-handoff-scale");
      scanner.style.removeProperty("--scanner-dashboard-handoff-y");
    };
    const resetDashboardHandoffDeadzone = () => {
      dashboardHandoffDeadzoneConsumed = 0;
      dashboardHandoffDeadzoneReady = false;
    };
    const getScrollYForProgress = (progress: number) => {
      const scrollDistance = Math.max(1, journey.offsetHeight - window.innerHeight);
      const sectionTop = window.scrollY + journey.getBoundingClientRect().top;
      return sectionTop + scrollDistance * clampProgress(progress);
    };
    const startAutoHandoff = (direction: "forward" | "reverse", normalizedProgress: number, timestamp: number) => {
      autoHandoffActive = true;
      autoHandoffDirection = direction;
      const maxStartProgress = direction === "forward" ? handoffEndProgress : reverseCatchProgress;
      autoHandoffStartProgress = clampProgress(Math.min(Math.max(normalizedProgress, 0), maxStartProgress));
      autoHandoffStartTime = timestamp;
      window.scrollTo(0, getScrollYForProgress(autoHandoffStartProgress));
    };
    const holdDashboardHandoffDeadzone = (scrollAmount: number, normalizedProgress: number) => {
      if (scrollAmount <= 0 || dashboardHandoffDeadzoneReady || normalizedProgress > handoffEndProgress + 0.01) {
        return false;
      }

      dashboardHandoffDeadzoneConsumed += scrollAmount;
      window.scrollTo(0, getScrollYForProgress(0));

      if (dashboardHandoffDeadzoneConsumed >= dashboardHandoffDeadzoneDistance) {
        dashboardHandoffDeadzoneReady = true;
        startAutoHandoff("forward", 0, window.performance.now());
        requestProgressUpdate();
      }

      return true;
    };
    const syncDashboardHandoff = (normalizedProgress: number, isAtHandoffStart: boolean) => {
      const scanner = document.querySelector<HTMLElement>(".planet-scan-section");

      if (!scanner || !withDashboardHandoff || mediaQuery.matches || !isAtHandoffStart) {
        resetDashboardHandoff();
        return;
      }

      const handoffProgress = clampProgress(normalizedProgress / handoffEndProgress);
      const handoffActive = handoffProgress < 0.995;

      if (!handoffActive) {
        resetDashboardHandoff();
        return;
      }

      const handoffScale = 1 + 1.48 * smootherstep(handoffProgress);
      const handoffY = 9 * smootherstep((handoffProgress - 0.24) / 0.56);

      scanner.classList.add("planet-scan-section--cloud-handoff");
      scanner.style.setProperty("--scanner-dashboard-handoff-scale", handoffScale.toFixed(4));
      scanner.style.setProperty("--scanner-dashboard-handoff-y", `${handoffY.toFixed(2)}vh`);
    };

    const updateProgress = () => {
      const timestamp = window.performance.now();
      const bounds = journey.getBoundingClientRect();
      const scrollDistance = Math.max(1, journey.offsetHeight - window.innerHeight);
      let normalizedProgress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));
      const progressDelta = normalizedProgress - lastNormalizedProgress;
      const canAutoHandoff = withDashboardHandoff && !mediaQuery.matches;

      if (canAutoHandoff && bounds.top > 1) {
        autoHandoffActive = false;
        autoHandoffSettled = false;
        autoHandoffReturned = false;
        lastNormalizedProgress = 0;
        resetDashboardHandoffDeadzone();
      }

      if (
        canAutoHandoff &&
        !autoHandoffActive &&
        !autoHandoffSettled &&
        !autoHandoffReturned &&
        bounds.top <= 1 &&
        normalizedProgress < handoffEndProgress - 0.001
      ) {
        if (dashboardHandoffDeadzoneReady) {
          startAutoHandoff("forward", normalizedProgress, timestamp);
        } else {
          normalizedProgress = 0;
          window.scrollTo(0, getScrollYForProgress(0));
        }
      } else if (
        canAutoHandoff &&
        !autoHandoffActive &&
        !autoHandoffSettled &&
        bounds.top <= 1 &&
        normalizedProgress >= handoffEndProgress
      ) {
        autoHandoffSettled = true;
        autoHandoffReturned = false;
      } else if (
        canAutoHandoff &&
        !autoHandoffActive &&
        autoHandoffSettled &&
        bounds.top <= 1 &&
        normalizedProgress < reverseCatchProgress &&
        progressDelta < -0.0005
      ) {
        startAutoHandoff("reverse", normalizedProgress, timestamp);
      } else if (
        canAutoHandoff &&
        !autoHandoffActive &&
        autoHandoffReturned &&
        bounds.top <= 1 &&
        normalizedProgress > 0.001 &&
        progressDelta > 0.0005
      ) {
        if (dashboardHandoffDeadzoneReady) {
          startAutoHandoff("forward", normalizedProgress, timestamp);
        } else {
          normalizedProgress = 0;
          window.scrollTo(0, getScrollYForProgress(0));
        }
      }

      if (autoHandoffActive) {
        const autoProgress = clampProgress((timestamp - autoHandoffStartTime) / autoHandoffDuration);
        const autoTargetProgress = autoHandoffDirection === "forward" ? handoffEndProgress : 0;
        normalizedProgress = lerp(autoHandoffStartProgress, autoTargetProgress, easeOutCubic(autoProgress));
        window.scrollTo(0, getScrollYForProgress(normalizedProgress));

        if (autoProgress >= 1) {
          autoHandoffActive = false;
          autoHandoffSettled = autoHandoffDirection === "forward";
          autoHandoffReturned = autoHandoffDirection === "reverse";
          resetDashboardHandoffDeadzone();
          normalizedProgress = autoTargetProgress;
          window.scrollTo(0, getScrollYForProgress(autoTargetProgress));
        }
      }

      syncDashboardHandoff(normalizedProgress, bounds.top <= 1 || autoHandoffActive);
      setSectionProgress(normalizedProgress);
      lastNormalizedProgress = normalizedProgress;
      animationFrame = 0;

      if (autoHandoffActive) {
        requestProgressUpdate();
      }
    };

    const requestProgressUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      requestProgressUpdate();
    };
    const getCurrentProgress = () => {
      const bounds = journey.getBoundingClientRect();
      const scrollDistance = Math.max(1, journey.offsetHeight - window.innerHeight);

      return {
        bounds,
        normalizedProgress: Math.min(1, Math.max(0, -bounds.top / scrollDistance))
      };
    };
    const startOrLockHandoff = (event: WheelEvent | TouchEvent | KeyboardEvent, scrollDirection: number) => {
      if (!withDashboardHandoff || mediaQuery.matches) {
        return;
      }

      const { bounds, normalizedProgress } = getCurrentProgress();

      if (autoHandoffActive) {
        event.preventDefault();
        return;
      }

      if (
        !autoHandoffSettled &&
        (autoHandoffReturned || normalizedProgress < handoffEndProgress) &&
        bounds.top <= 1 &&
        scrollDirection > 0 &&
        holdDashboardHandoffDeadzone(scrollDirection, normalizedProgress)
      ) {
        event.preventDefault();
        return;
      }

      if (autoHandoffSettled) {
        if (scrollDirection < 0 && bounds.top <= 1 && normalizedProgress <= reverseCatchProgress) {
          event.preventDefault();
          startAutoHandoff("reverse", normalizedProgress, window.performance.now());
          requestProgressUpdate();
        }

        return;
      }

      if (autoHandoffReturned) {
        if (scrollDirection > 0 && bounds.top <= 1 && normalizedProgress < handoffEndProgress + 0.01) {
          event.preventDefault();
          startAutoHandoff("forward", normalizedProgress, window.performance.now());
          requestProgressUpdate();
        }

        return;
      }

      if (bounds.top <= 1 && normalizedProgress < handoffEndProgress && scrollDirection >= 0) {
        event.preventDefault();
        startAutoHandoff("forward", normalizedProgress, window.performance.now());
        requestProgressUpdate();
      }
    };
    const handleWheel = (event: WheelEvent) => {
      startOrLockHandoff(event, event.deltaY);
    };
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      const scrollDirection = touchStartY == null || currentY == null ? 0 : touchStartY - currentY;
      startOrLockHandoff(event, scrollDirection);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      const scrollKeys = new Set([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"]);

      if (!scrollKeys.has(event.key)) {
        return;
      }

      const scrollDirection = event.key === "ArrowUp" || event.key === "PageUp" || event.key === "Home" ? -1 : 1;
      startOrLockHandoff(event, scrollDirection);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.cancelAnimationFrame(animationFrame);
      resetDashboardHandoff();
    };
  }, [stages.length, withDashboardHandoff, revealShare]);

  return (
    <section
      className={`how-it-works-journey-section${withDashboardHandoff ? " how-it-works-journey-section--home-handoff" : ""}`}
      id={sectionId}
      ref={journeyRef}
    >
      <div
        className="journey-canvas"
        aria-label="RetroFi business transformation journey"
        style={
          dashboardHandoffEnabled
            ? { backgroundColor: `rgba(22, 32, 27, ${dashboardHandoffSceneReveal.toFixed(4)})` }
            : undefined
        }
      >
        <div className="journey-image-stack" aria-hidden="true" style={{ opacity: dashboardHandoffSceneReveal }}>
          {stages.map((stage, index) => (
            <img
              alt=""
              className="journey-scene-image"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              key={stage.image}
              loading={index < 2 ? "eager" : "lazy"}
              src={stage.image}
              style={{
                opacity:
                  visualProgress >= index
                    ? 1
                    : visualProgress > index - 1
                      ? visualProgress - (index - 1)
                      : 0
              }}
            />
          ))}
        </div>
        <div className="journey-vignette" aria-hidden="true" style={{ opacity: dashboardHandoffSceneReveal }} />
        <div className="journey-cloud-reveal" aria-hidden="true" style={{ opacity: dashboardHandoffCloudReveal }}>
          <div
            className="journey-cloud-sky"
            style={{
              opacity: cloudSkyOpacity,
              transform: `translate3d(${4 * cloudTravelProgress}vw, ${-5 * cloudTravelProgress}vh, 0) scale(${1 + 0.03 * cloudTravelProgress})`
            }}
          />
          <div className="journey-cloud-haze" style={{ opacity: cloudHazeOpacity }} />
          {cloudLayers.map((cloud, index) => {
            const cloudProgress = prefersReducedMotion ? 0 : Math.min(1, cloudTravelProgress * cloud.speed);
            const opacityProgress = Math.min(1, Math.max(0, (cloudProgress - 0.08) / 0.92));
            const layerOpacity = prefersReducedMotion
              ? revealProgress < 1
                ? cloud.opacity * 0.38
                : 0
              : Math.max(0, cloud.opacity * 0.38 * (1 - opacityProgress * opacityProgress));
            const scale = cloud.baseScale + (cloud.exitScale - cloud.baseScale) * cloudProgress;
            const blur = cloud.blur + 8 + cloud.exitBlur * cloudProgress;

            return (
              <div
                className={cloud.className}
                key={`journey-cloud-${index}`}
                style={{
                  filter: `blur(${blur}px)`,
                  height: cloud.height,
                  left: cloud.left,
                  opacity: layerOpacity,
                  top: cloud.top,
                  transform: `translate3d(${cloud.exitX * cloudProgress}vw, ${cloud.exitY * cloudProgress}vh, 0) scale(${scale})`,
                  width: cloud.width
                }}
              />
            );
          })}
        </div>
        {withDashboardHandoff ? (
          <div aria-hidden="true" className="journey-dashboard-handoff" style={{ opacity: dashboardHandoffOverlayOpacity }}>
            <div className="journey-dashboard-handoff-clouds" style={{ opacity: dashboardHandoffDarkCloudOpacity }} />
            <div className="journey-dashboard-handoff-haze" style={{ opacity: dashboardHandoffHazeOpacity }} />
          </div>
        ) : null}
        {showIntro ? (
          <header
            className="journey-intro-copy"
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, calc(-50% - ${32 * cloudTravelProgress}px), 0)`
            }}
          >
            <p className="journey-intro-eyebrow">How it works</p>
            <h1>From outdated building to high-performing business</h1>
          </header>
        ) : (
          <div className="journey-story-shell">
            <article aria-live="polite" className="journey-story-copy" key={activeStage.title}>
              <p className="journey-step-label">
                Step {String(activeStageIndex + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
                <span aria-hidden="true">·</span>
                {activeStage.accent}
              </p>
              <h2>{activeStage.title}</h2>
              <p>{activeStage.copy}</p>
            </article>
            <div className="journey-progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${visualProgress / (stages.length - 1)})` }} />
              <div className="journey-progress-dots">
                {stages.map((stage) => (
                  <i className={stage.title === activeStage.title ? "active" : undefined} key={stage.title} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HomePage({
  navigate,
  onHowItWorksClick,
  publicAuth
}: {
  navigate: (route: Route) => void;
  onHowItWorksClick: () => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} onHowItWorksClick={onHowItWorksClick} pageClassName="home-page" publicAuth={publicAuth} showFooter>
      <PlanetScanHero navigate={navigate} />
      <HomeInfographicSection navigate={navigate} />
      <HowItWorksJourneySection sectionId="home-how-it-works" />
    </PublicShell>
  );
}

function HowItWorksPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} pageClassName="how-it-works-page" publicAuth={publicAuth}>
      <HowItWorksJourneySection />
    </PublicShell>
  );
}

function PricingPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  const cards = [
    ["Free Scan", "$0", "Exploring potential opportunities", ["Basic opportunity preview", "Estimated value range", "General retrofit categories", "Prompt to upload utility bills"], "Get Started"],
    ["Opportunity Report", "$950/site", "Businesses ready to evaluate real projects", ["Exact matching incentives", "Eligibility analysis", "Utility bill review", "Savings estimates", "ROI/payback", "Prioritized roadmap", "Financing options", "Required documents", "Deadlines", "Downloadable report"], "Start with Free Scan"],
    ["Implementation Support", "Starting at $3,500", "Businesses ready to move forward", ["Application preparation support", "Document collection guidance", "Contractor quote review", "Financing guidance", "Incentive tracking", "60-90 days of support"], "Contact Us"],
    ["Multi-Site", "Custom", "Franchisees, regional operators, and multi-location businesses", ["Site-by-site scans", "Portfolio prioritization", "Centralized incentive tracking", "Standardized recommendations"], "Contact Us"]
  ];

  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <PageHero
        compact
        eyebrow="Pricing"
        title="Simple project-based pricing"
        copy="Start with a free scan, then upgrade only if there is enough potential value to justify a deeper analysis."
      />
      <section className="pricing-note">
        <span>No subscription and no success fee initially.</span>
      </section>
      <section className="pricing-grid">
        {cards.map(([name, price, bestFor, includes, cta], index) => (
          <article className={index === 1 ? "pricing-card recommended" : "pricing-card"} key={name as string}>
            {index === 1 ? <span className="recommended-badge">Recommended</span> : null}
            <h2>{name}</h2>
            <strong>{price}</strong>
            <p>Best for: {bestFor}</p>
            <ul>
              {(includes as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button onClick={() => navigate(cta === "Contact Us" ? "about-contact" : "scan")} type="button">
              {cta}
            </button>
          </article>
        ))}
      </section>
      <section className="faq-grid faq-section">
        {[
          ["Why is the scan free?", "The scan helps identify whether a deeper analysis is likely to be worth it."],
          ["When do I pay?", "Only when you choose to upgrade to an Opportunity Report or implementation support."],
          ["Do I need utility bills?", "Not for the free scan. Utility bills are needed for detailed savings and ROI."],
          ["Is this a subscription?", "V1 is not a subscription."],
          ["Do you charge a success fee?", "No success fee initially."],
          ["Can I use this for multiple sites?", "Yes. Multi-site pricing is custom based on portfolio size."]
        ].map(([question, answer]) => (
          <article className="feature-card" key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </section>
    </PublicShell>
  );
}

function AboutPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <PageHero
        compact
        eyebrow="About RetroFi"
        title="RetroFi helps homeowners make smarter retrofit decisions faster"
        copy="We turn messy home and utility data into clear guidance so people can understand upgrades, incentives, and next steps without the usual research burden."
      />
      <AboutSubnav navigate={navigate} />
      <section className="split-section about-story-section">
        <div>
          <p className="eyebrow">Mission</p>
          <h2>Clear retrofit guidance should be easier to get.</h2>
        </div>
        <p className="about-story-copy">
          RetroFi is built to reduce confusion around home upgrades. Instead of asking homeowners to piece together savings estimates,
          incentives, and retrofit options across disconnected sources, the product brings those inputs into one clearer report.
        </p>
      </section>
      <section className="card-grid three about-principles-grid">
        {[
          ["Simple to use", "A lightweight flow gets homeowners from account setup to useful insight quickly.", "roadmap"],
          ["Designed for clarity", "Recommendations are meant to be readable, personalized, and easy to act on.", "savings"],
          ["Built to save time", "RetroFi reduces research overhead by organizing complex utility and retrofit information.", "mission"]
        ].map(([title, copy, icon]) => (
          <article className="feature-card" key={title}>
            <FeatureIcon icon={icon as "roadmap" | "savings" | "mission"} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <section className="card-grid two about-hub-grid">
        <AboutHubCard
          copy="Learn why RetroFi is focused on making home upgrade decisions clearer and more practical."
          icon="mission"
          label="Mission"
          navigate={navigate}
          route="about-mission"
          title="Why RetroFi exists"
        />
        <AboutHubCard
          copy="Meet the people building the product, research workflows, and homeowner experience."
          icon="team"
          label="Team"
          navigate={navigate}
          route="about-team"
          title="Meet the team"
        />
        <AboutHubCard
          copy="Understand how home and utility data are used to prepare recommendations responsibly."
          icon="trust"
          label="Trust & Data"
          navigate={navigate}
          route="about-trust"
          title="How we handle data"
        />
        <AboutHubCard
          copy="Talk to us if you want to understand the product before creating an account or uploading bills."
          icon="contact"
          label="Contact"
          navigate={navigate}
          route="about-contact"
          title="Questions before you start?"
        />
      </section>
      <section className="final-cta">
        <h2>RetroFi is built to make home upgrade choices easier to understand.</h2>
        <p>Start with a lightweight account and see how fast home and utility data can turn into clearer retrofit guidance.</p>
        <ScanStartButton navigate={navigate} publicAuth={publicAuth}>Get Started</ScanStartButton>
      </section>
    </PublicShell>
  );
}

function MissionPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <PageHero
        compact
        eyebrow="Mission"
        title="Making sustainability upgrades financially practical."
        copy="RetroFi is building a cleaner path from incentive discovery to confident retrofit decisions."
      />
      <AboutSubnav navigate={navigate} />
      <section className="two-column-section">
        <article className="feature-card">
          <h2>The problem</h2>
          <p>
            Businesses often want to reduce operating costs and improve efficiency, but incentive
            programs are fragmented across utilities, agencies, tax rules, and financing providers.
          </p>
        </article>
        <article className="feature-card">
          <h2>Our mission</h2>
          <p>
            RetroFi exists to help businesses identify relevant opportunities, estimate savings, and
            move toward practical facility upgrades with more confidence.
          </p>
        </article>
      </section>
      <section className="content-section">
        <SectionHeading eyebrow="What we believe" title="RetroFi should turn complexity into clear next steps" />
        <div className="card-grid three">
          {[
            "Sustainability should be financially practical",
            "Incentives should be easier to navigate",
            "Businesses need clear next steps, not just links"
          ].map((belief) => (
            <article className="feature-card belief-card" key={belief}>
              <FeatureIcon icon="mission" />
              <h3>{belief}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="final-cta">
        <h2>Start with a free scan and evaluate where a real project may exist.</h2>
        <ScanStartButton navigate={navigate} publicAuth={publicAuth}>Get Started</ScanStartButton>
      </section>
    </PublicShell>
  );
}

function TeamPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <PageHero
        compact
        eyebrow="Team"
        title="Meet the team"
        copy="RetroFi is built by a small team focused on product, data systems, retrofit research, and customer workflow."
      />
      <AboutSubnav navigate={navigate} />
      <section className="team-grid">
        {[
          [
            "Neer Kuchlous",
            "Founder",
            "Focuses on business development, customer workflow, and market validation."
          ],
          [
            "Rajvansh Gupta",
            "Founder",
            "Leads product, data systems, and retrofit opportunity research."
          ],
          [
            "Ryan Shen",
            "Product & Engineering",
            "Drives frontend iteration, production deployment, and admin and customer workflow improvements across RetroFi."
          ]
        ].map(([name, role, copy]) => (
          <article className="team-card" key={name}>
            <span>{name.split(" ").map((part) => part[0]).join("")}</span>
            <div className="team-copy">
              <h3>{name}</h3>
              <strong>{role}</strong>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </section>
    </PublicShell>
  );
}

function TrustPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <PageHero
        compact
        eyebrow="Trust & Data"
        title="Trust & Data"
        copy="RetroFi uses business and utility information only to prepare recommendations, estimate savings, and identify relevant opportunities."
      />
      <AboutSubnav navigate={navigate} />
      <section className="card-grid two trust-grid">
        <article className="feature-card list-card">
          <h2>What we collect</h2>
          <ul>
            {[
              "Business name and contact information",
              "Site address",
              "Utility provider",
              "Organization and building type",
              "Approximate square footage",
              "Utility bills if uploaded later"
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="feature-card list-card">
          <h2>Why we collect it</h2>
          <ul>
            {[
              "To identify likely incentives",
              "To estimate savings and ROI",
              "To prioritize retrofit opportunities",
              "To prepare reports and recommendations"
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="feature-card list-card">
          <h2>What we do not do</h2>
          <ul>
            {[
              "Do not sell business information",
              "Do not use utility bills for unrelated purposes",
              "Do not share sensitive information without permission"
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="feature-card utility-note-card">
          <h2>Utility bill note</h2>
          <p>
            Utility bills are only needed for detailed savings, ROI, payback, and prioritization.
            The free scan can be started without uploading bills.
          </p>
        </article>
      </section>
      <section className="final-cta">
        <h2>Start with a free scan and share more only when deeper analysis is useful.</h2>
        <ScanStartButton navigate={navigate} publicAuth={publicAuth}>Get Started</ScanStartButton>
      </section>
    </PublicShell>
  );
}

function ContactPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  function submitContactForm(event: FormEvent) {
    event.preventDefault();

    const subject = contactForm.company
      ? `RetroFi inquiry from ${contactForm.company}`
      : `RetroFi inquiry from ${contactForm.name || "website visitor"}`;
    const body = [
      `Name: ${contactForm.name}`,
      `Email: ${contactForm.email}`,
      `Company: ${contactForm.company}`,
      "",
      contactForm.message
    ].join("\n");

    window.location.href = `mailto:hello@retrofi.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <PageHero
        compact
        eyebrow="Contact"
        title="Contact RetroFi"
        copy="Have questions before starting a scan or uploading business information? Reach out to us."
      />
      <AboutSubnav navigate={navigate} />
      <section className="two-column-section contact-layout">
        <article className="feature-card contact-card">
          <h2>Contact email</h2>
          <p>
            <a href="mailto:hello@retrofi.org">hello@retrofi.org</a>
          </p>
          <p>Reach out before creating a scan or sending any business information.</p>
        </article>
        <form className="feature-card contact-form-card" onSubmit={submitContactForm}>
          <h2>Contact form</h2>
          <div className="field-grid">
            <label className="field">
              <span>
                Name<b aria-label="required"> *</b>
              </span>
              <input
                name="name"
                onChange={(event) =>
                  setContactForm((current) => ({ ...current, name: event.target.value }))
                }
                required
                value={contactForm.name}
              />
            </label>
            <label className="field">
              <span>
                Email<b aria-label="required"> *</b>
              </span>
              <input
                name="email"
                onChange={(event) =>
                  setContactForm((current) => ({ ...current, email: event.target.value }))
                }
                required
                type="email"
                value={contactForm.email}
              />
            </label>
            <label className="field">
              <span>Company</span>
              <input
                name="company"
                onChange={(event) =>
                  setContactForm((current) => ({ ...current, company: event.target.value }))
                }
                value={contactForm.company}
              />
            </label>
            <label className="field field-wide">
              <span>
                Message<b aria-label="required"> *</b>
              </span>
              <textarea
                name="message"
                onChange={(event) =>
                  setContactForm((current) => ({ ...current, message: event.target.value }))
                }
                required
                value={contactForm.message}
              />
            </label>
          </div>
          <div className="hero-actions">
            <button type="submit">Email RetroFi</button>
            <ScanStartButton navigate={navigate} publicAuth={publicAuth} variant="secondary">
              Get Started
            </ScanStartButton>
          </div>
        </form>
      </section>
    </PublicShell>
  );
}

function DatabaseBrowser({
  credential,
  embedded = false
}: {
  credential: AuthCredential;
  embedded?: boolean;
}) {
  const [filters, setFilters] = useState({
    q: "",
    state: "",
    category: "",
    type: "",
    implementingSector: "",
    technology: "",
    sector: ""
  });
  const [page, setPage] = useState(1);
  const [loadedPrograms, setLoadedPrograms] = useState<DatabaseProgram[]>([]);
  const [loadProgress, setLoadProgress] = useState<DatabaseLoadProgress>({
    scannedCount: 0,
    loadedPrograms: 0,
    estimatedTotal: null,
    isComplete: false
  });
  const [selectedProgramId, setSelectedProgramId] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<DatabaseProgram | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  function updateFilter(name: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  }

  useEffect(() => {
    let isMounted = true;

    async function loadProgramBatches() {
      let cursor: string | null = null;
      let scannedCount = 0;
      let accumulatedPrograms: DatabaseProgram[] = [];

      setLoadedPrograms([]);
      setSelectedProgramId("");
      setSelectedProgram(null);
      setError(null);
      setLoadProgress({
        scannedCount: 0,
        loadedPrograms: 0,
        estimatedTotal: null,
        isComplete: false
      });

      try {
        do {
          const params = new URLSearchParams({ limit: "100" });
          if (cursor) params.set("cursor", cursor);

          const payload = await apiGet<DatabaseProgramsBatchResponse>(`/api/database/programs/batch?${params}`, {
            headers: adminAuthHeaders(credential)
          });

          if (!isMounted) return;

          accumulatedPrograms = sortDatabasePrograms([...accumulatedPrograms, ...payload.programs]);
          scannedCount += payload.scannedCount || 0;
          cursor = payload.nextCursor;

          setLoadedPrograms(accumulatedPrograms);
          setLoadProgress({
            scannedCount,
            loadedPrograms: accumulatedPrograms.length,
            estimatedTotal: payload.estimatedTotal,
            isComplete: payload.isComplete
          });
        } while (cursor);

        if (isMounted) {
          setLoadProgress((current) => ({ ...current, isComplete: true }));
        }
      } catch (requestError) {
        if (!isMounted) return;
        setError(requestError instanceof Error ? requestError.message : "Could not load database programs.");
        setLoadProgress((current) => ({
          ...current,
          isComplete: false
        }));
      }
    }

    void loadProgramBatches();

    return () => {
      isMounted = false;
    };
  }, [credential.provider, credential.value]);

  const filteredPrograms = useMemo(
    () => loadedPrograms.filter((program) => databaseProgramMatchesFilters(program, filters)),
    [
      filters.category,
      filters.implementingSector,
      filters.q,
      filters.sector,
      filters.state,
      filters.technology,
      filters.type,
      loadedPrograms
    ]
  );
  const total = filteredPrograms.length;
  const perPage = 25;
  const maxPage = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const programs = filteredPrograms.slice(start, start + perPage);
  const facets = useMemo(() => buildClientDatabaseFacets(loadedPrograms), [loadedPrograms]);
  const isLoading = !loadProgress.isComplete && !error;

  useEffect(() => {
    if (!loadProgress.isComplete) {
      return;
    }

    setSelectedProgramId((currentProgramId) => {
      const stillVisible = filteredPrograms.some((program) => program.opportunityId === currentProgramId);
      if ((!currentProgramId || !stillVisible) && filteredPrograms[0]) {
        return filteredPrograms[0].opportunityId;
      }
      if (currentProgramId && filteredPrograms.length === 0) {
        return "";
      }
      return currentProgramId;
    });
  }, [filteredPrograms, loadProgress.isComplete]);

  useEffect(() => {
    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [maxPage, page]);

  useEffect(() => {
    if (!selectedProgramId) {
      setSelectedProgram(null);
      return;
    }

    let isMounted = true;
    setIsDetailLoading(true);
    apiGet<DatabaseProgramResponse>(`/api/database/programs/${encodeURIComponent(selectedProgramId)}`, {
      headers: adminAuthHeaders(credential)
    })
      .then((payload) => {
        if (isMounted) setSelectedProgram(payload.program);
      })
      .catch(() => {
        if (isMounted) setSelectedProgram(null);
      })
      .finally(() => {
        if (isMounted) setIsDetailLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [credential.provider, credential.value, selectedProgramId]);

  return (
    <section className={embedded ? "database-shell admin-database-shell" : "database-shell"}>
      <div className="database-toolbar">
        <div>
          <p className="eyebrow">DSIRE-sourced clone</p>
          <h1>Incentive and policy database</h1>
          <p>
            Browse normalized DSIRE program records before we connect them to business-profile matching.
          </p>
        </div>
        <div className="database-stats">
          <strong>{total.toLocaleString()}</strong>
          <span>{error ? "loaded before error" : isLoading ? "loaded matches so far" : "matching programs"}</span>
        </div>
      </div>

      <div className="database-filters">
        <label className="field database-search">
          <span>Search</span>
          <input
            onChange={(event) => updateFilter("q", event.target.value)}
            placeholder="Search title, ID, administrator, or technology"
            type="search"
            value={filters.q}
          />
        </label>
        <DatabaseFilterSelect label="State" onChange={(value) => updateFilter("state", value)} options={facets?.states || []} value={filters.state} />
        <DatabaseFilterSelect label="Category" onChange={(value) => updateFilter("category", value)} options={facets?.categories || []} value={filters.category} />
        <DatabaseFilterSelect label="Program type" onChange={(value) => updateFilter("type", value)} options={facets?.programTypes || []} value={filters.type} />
        <DatabaseFilterSelect
          label="Implementing sector"
          onChange={(value) => updateFilter("implementingSector", value)}
          options={facets?.implementingSectors || []}
          value={filters.implementingSector}
        />
        <DatabaseFilterSelect label="Technology" onChange={(value) => updateFilter("technology", value)} options={facets?.technologies || []} value={filters.technology} />
        <DatabaseFilterSelect label="Eligible sector" onChange={(value) => updateFilter("sector", value)} options={facets?.eligibleSectors || []} value={filters.sector} />
        <DatabaseDisabledFilterButton label="Date" note="Planned" />
        <DatabaseDisabledFilterButton label="Coverage area" note="Planned" />
        <DatabaseDisabledFilterButton label="Square footage" note="Planned" />
      </div>

      <DatabaseLoadingProgress hasError={Boolean(error)} progress={loadProgress} />

      {error ? <p className="error-message">{error}</p> : null}

      <div className="database-layout">
        <section className="database-list-panel" aria-label="DSIRE clone programs">
          <div className="database-list-header">
            <span>{isLoading ? `${programs.length} shown while loading` : `${programs.length} shown`}</span>
            <span>Page {page} of {maxPage}</span>
          </div>
          <div className="database-list">
            {programs.length === 0 && !isLoading ? (
              <p className="empty-state">No DSIRE programs match the current filters.</p>
            ) : null}
            {programs.map((program) => (
              <button
                aria-current={program.opportunityId === selectedProgramId ? "true" : undefined}
                className="database-list-item"
                key={program.opportunityId}
                onClick={() => setSelectedProgramId(program.opportunityId)}
                type="button"
              >
                <span>
                  <strong>{program.name}</strong>
                  <small>{lookupLabel(program.state)} / {lookupLabel(program.programType)}</small>
                </span>
                <mark>{program.category?.name || "Uncategorized"}</mark>
              </button>
            ))}
          </div>
          <div className="database-pagination">
            <button className="secondary-button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} type="button">
              Previous
            </button>
            <button className="secondary-button" disabled={page >= maxPage} onClick={() => setPage((current) => current + 1)} type="button">
              Next
            </button>
          </div>
        </section>

        <DatabaseProgramDetail isLoading={isDetailLoading} program={selectedProgram} />
      </div>
    </section>
  );
}

function DatabaseLoadingProgress({
  hasError,
  progress
}: {
  hasError: boolean;
  progress: DatabaseLoadProgress;
}) {
  const percent = databaseProgressPercent(progress);
  const scannedLabel = progress.estimatedTotal
    ? `${progress.scannedCount.toLocaleString()} of about ${progress.estimatedTotal.toLocaleString()} records scanned`
    : `${progress.scannedCount.toLocaleString()} records scanned`;
  const statusLabel = hasError
    ? "Opportunity database load stopped"
    : progress.isComplete
      ? "Opportunity database loaded"
      : "Loading opportunity database";

  return (
    <section className="database-load-progress" aria-live="polite">
      <RetroFiProgressLoader
        indeterminate={!progress.estimatedTotal && !progress.isComplete && !hasError}
        label={statusLabel}
        progress={percent}
        sublabel={scannedLabel}
      />
      <p>
        {scannedLabel}. {progress.loadedPrograms.toLocaleString()} opportunities available so far.
      </p>
    </section>
  );
}

function DatabaseFilterSelect({
  label,
  onChange,
  options,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  options: DatabaseFacetOption[];
  value: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label} ({option.count})
          </option>
        ))}
      </select>
    </label>
  );
}

function DatabaseDisabledFilterButton({ label, note }: { label: string; note: string }) {
  return (
    <label className="field database-disabled-filter">
      <span>{label}</span>
      <button aria-disabled="true" disabled type="button">
        {note}
      </button>
    </label>
  );
}

function DatabaseProgramDetail({ isLoading, program }: { isLoading: boolean; program: DatabaseProgram | null }) {
  if (isLoading) {
    return (
      <section className="database-detail-panel">
        <RetroFiSkeleton variant="card" label="Loading program details" />
      </section>
    );
  }

  if (!program) {
    return (
      <section className="database-detail-panel">
        <p className="empty-state">Select a program to inspect its cloned DSIRE fields.</p>
      </section>
    );
  }

  return (
    <section className="database-detail-panel">
      <div className="database-detail-header">
        <p className="eyebrow">{program.sourceSystem} Program {program.id}</p>
        <h2>{program.name}</h2>
        <div className="database-chip-row">
          <span>{lookupLabel(program.state)}</span>
          <span>{lookupLabel(program.category)}</span>
          <span>{lookupLabel(program.programType)}</span>
        </div>
      </div>

      <div className="database-summary-grid">
        <DetailItem label="Implementing sector" value={lookupLabel(program.implementingSector)} />
        <DetailItem label="Administrator" value={program.administrator || "Not listed"} />
        <DetailItem label="Start date" value={formatProgramDate(program.startDate || program.startDateText)} />
        <DetailItem label="End date" value={formatProgramDate(program.endDate || program.endDateText)} />
        <DetailItem label="Last reviewed" value={formatProgramDate(program.lastReviewedAt)} />
        <DetailItem label="Published" value={program.published === false ? "No" : "Yes"} />
      </div>

      <section className="database-detail-section">
        <h3>Program Overview</h3>
        {program.overviewDetails.length > 0 ? (
          <dl className="database-definition-list">
            {program.overviewDetails.map((detail) => (
              <div key={`${detail.id}-${detail.label}`}>
                <dt>{detail.label || "Detail"}</dt>
                <dd>{detail.value || "Not listed"}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p>No overview details were available in the source record.</p>
        )}
      </section>

      <section className="database-detail-section">
        <h3>Incentives</h3>
        {program.parameterSets.length > 0 ? (
          <div className="parameter-set-list">
            {program.parameterSets.map((parameterSet, index) => (
              <article className="parameter-set" key={parameterSet.id || index}>
                <h4>{parameterSet.label || `Parameter set ${index + 1}`}</h4>
                <p>{joinLookupLabels(parameterSet.technologies) || "No technology listed"}</p>
                <small>{joinLookupLabels(parameterSet.sectors) || "No eligible sector listed"}</small>
                <ul>
                  {parameterSet.parameters.map((parameter, parameterIndex) => (
                    <li key={parameter.id || parameterIndex}>{formatParameterValue(parameter)}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <p>No machine-readable incentive parameter sets were available in the source record.</p>
        )}
      </section>

      <section className="database-detail-section">
        <h3>Summary</h3>
        <p>{program.summaryText || "No summary listed."}</p>
      </section>

      <section className="database-detail-section">
        <h3>Eligible Sectors and Technologies</h3>
        <div className="database-chip-row">
          {(program.eligibleSectors.length > 0 ? program.eligibleSectors : [{ name: "No eligible sector listed" }]).map((sector) => (
            <span key={sector.id || sector.name || "sector"}>{lookupLabel(sector)}</span>
          ))}
        </div>
        <div className="database-chip-row">
          {(program.technologies.length > 0 ? program.technologies : [{ name: "No technology listed" }]).map((technology) => (
            <span key={technology.id || technology.name || "technology"}>{lookupLabel(technology)}</span>
          ))}
        </div>
      </section>

      <section className="database-detail-section">
        <h3>Authorities, Contacts, and Memos</h3>
        <div className="database-summary-grid">
          <DetailItem label="Authorities" value={String(program.authorities.length)} />
          <DetailItem label="Contacts" value={String(program.contacts.length)} />
          <DetailItem label="Memos" value={String(program.memos.length)} />
        </div>
      </section>

      <section className="database-detail-section">
        <h3>Source Links</h3>
        <div className="link-list">
          {program.sourceUrl ? <a href={program.sourceUrl} rel="noreferrer" target="_blank">DSIRE source</a> : null}
          {program.websiteUrl ? <a href={program.websiteUrl} rel="noreferrer" target="_blank">Program website</a> : null}
        </div>
      </section>
    </section>
  );
}

const energyDataSourceTypeLabels: Record<UtilityFileType, string> = {
  utility_pdf: "Utility bill PDF",
  green_button_xml: "Green Button XML",
  green_button_csv: "Utility export CSV",
  unknown: "Unknown utility file"
};
const utilityCategoryLabels: Record<UtilityUploadCategory, string> = {
  auto_detect: "Auto-detect",
  electric: "Electric",
  gas: "Gas",
  water_sewer: "Water / Sewer",
  waste: "Waste / Recycling / Organics",
  unknown: "Unknown"
};
const utilityCategoryDisplayOrder: UtilityCategory[] = ["electric", "gas", "water_sewer", "waste", "unknown"];
const utilityCategoryUsageLabels: Partial<Record<UtilityCategory, string>> = {
  electric: "Annual usage",
  gas: "Annual usage",
  water_sewer: "Annual usage",
  waste: "Annual cost"
};
function formatProcessingStatus(status: UploadedUtilityFile["processingStatus"]) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatUtilityCategory(category: UtilityUploadCategory) {
  return utilityCategoryLabels[category] || "Unknown";
}

function formatUtilityFieldValue(value: UtilityExtractedValue) {
  if (value.value == null || value.value === "") {
    return "Missing";
  }

  const base = typeof value.value === "number" ? value.value.toLocaleString() : String(value.value);
  return value.unit ? `${base} ${value.unit}` : base;
}

function formatUtilityPeriod(start: string | null, end: string | null) {
  if (!start && !end) {
    return "Not provided";
  }

  if (start && end) {
    return formatEnergyCoverage(start, end);
  }

  return start || end || "Not provided";
}

function formatEnergyCoverage(start: string | null, end: string | null) {
  if (!start && !end) {
    return "Pending";
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const startLabel = start ? formatter.format(new Date(start)) : "Unknown";
  const endLabel = end ? formatter.format(new Date(end)) : "Unknown";
  return `${startLabel} to ${endLabel}`;
}

async function uploadFileToSignedUrl(uploadUrl: string, file: File) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: file.type ? { "Content-Type": file.type } : undefined,
    body: file
  });

  if (!response.ok) {
    throw new Error(`File upload failed with HTTP ${response.status}.`);
  }
}

function ScanResultsPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  const [sessionPayload, setSessionPayload] = useState<EnergyDataSessionPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = readStoredEnergyDataUploadSession();
    if (!storedSession) {
      setSessionPayload(null);
      return;
    }

    let isMounted = true;
    apiPost<EnergyDataSessionPayload>("/api/energy-data/session", {
      userId: storedSession.userId,
      uploadToken: storedSession.token
    })
      .then((payload) => {
        if (!isMounted) return;
        setSessionPayload(payload);
        setError(null);
      })
      .catch((requestError) => {
        if (!isMounted) return;
        clearStoredEnergyDataUploadSession();
        setSessionPayload(null);
        setError(requestError instanceof Error ? requestError.message : "Could not load your upload session.");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const latestRecord = sessionPayload?.uploadedUtilityFiles?.[0] || null;
  const nextStepValue = latestRecord
    ? latestRecord.processingStatus === "processed"
      ? "Energy data uploaded. Detailed analysis can begin."
      : latestRecord.processingStatus === "failed"
        ? "Upload another file or review the failed import."
        : latestRecord.processingStatus === "needs_review"
          ? "File uploaded and queued for manual review."
          : "Energy data uploaded and awaiting review."
    : "Upload utility bills or a Green Button export for detailed savings and ROI";

  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <section className="results-panel">
        <p className="eyebrow">Free scan</p>
        <h1>Your free scan is being prepared</h1>
        <p>
          RetroFi is reviewing your business and site information to identify likely incentive and
          retrofit opportunities.
        </p>
        <div className="card-grid three compact-cards">
          {[
            ["Estimated opportunity range", "Coming soon"],
            ["Likely categories", "Pending analysis"],
            ["Recommended next step", nextStepValue]
          ].map(([label, value]) => (
            <article className="feature-card" key={label}>
              <span className="eyebrow">{label}</span>
              <h3>{value}</h3>
            </article>
          ))}
        </div>
        {latestRecord ? (
          <article className="feature-card energy-status-card">
            <span className="eyebrow">Latest energy data</span>
            <h3>{latestRecord.originalFilename}</h3>
            <p>
              {energyDataSourceTypeLabels[latestRecord.fileType]} · {formatUtilityCategory(latestRecord.utilityCategory)} · {formatProcessingStatus(latestRecord.processingStatus)}
            </p>
            <p>
              Coverage:{" "}
              {formatUtilityPeriod(
                sessionPayload?.siteEnergyProfile?.latestBillingPeriodStart || null,
                sessionPayload?.siteEnergyProfile?.latestBillingPeriodEnd || null
              )}
            </p>
          </article>
        ) : null}
        {error ? <p className="error-message">{error}</p> : null}
        <div className="hero-actions">
          <CTAButton navigate={navigate} route="home" variant="secondary">Back to Home</CTAButton>
          <button onClick={() => navigate("scan-energy-data")} type="button">
            Upload Energy Data
          </button>
        </div>
      </section>
    </PublicShell>
  );
}

function EnergyDataUploadPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  const [storedSession, setStoredSession] = useState<EnergyDataUploadSession | null>(() => readStoredEnergyDataUploadSession());
  const [sessionPayload, setSessionPayload] = useState<EnergyDataSessionPayload | null>(null);
  const [selectedSourceType, setSelectedSourceType] = useState<UtilityFileType>("green_button_xml");
  const [selectedUtilityCategory, setSelectedUtilityCategory] = useState<UtilityUploadCategory>("auto_detect");
  const [utilityName, setUtilityName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  async function refreshSession(session = storedSession) {
    if (!session) {
      setSessionPayload(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const payload = await apiPost<EnergyDataSessionPayload>("/api/energy-data/session", {
        userId: session.userId,
        uploadToken: session.token
      });
      setSessionPayload(payload);
      setError(null);
    } catch (requestError) {
      clearStoredEnergyDataUploadSession();
      setStoredSession(null);
      setSessionPayload(null);
      setError(requestError instanceof Error ? requestError.message : "Could not load the energy data upload session.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshSession();
  }, []);

  async function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!storedSession || files.length === 0) {
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      for (const file of files) {
        const uploadDescriptor = await apiPost<{
          energyDataId: string;
          s3Key: string;
          uploadUrl: string;
          sourceType: UtilityFileType;
          contentType: string;
          expiresAt: string;
        }>("/api/energy-data/upload-url", {
          userId: storedSession.userId,
          uploadToken: storedSession.token,
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          sourceType: selectedSourceType,
          utilityCategory: selectedUtilityCategory
        });

        await uploadFileToSignedUrl(uploadDescriptor.uploadUrl, file);

        await apiPost<EnergyDataRegisterResponse>("/api/energy-data/register", {
          userId: storedSession.userId,
          uploadToken: storedSession.token,
          energyDataId: uploadDescriptor.energyDataId,
          s3Key: uploadDescriptor.s3Key,
          fileName: file.name,
          contentType: file.type || uploadDescriptor.contentType,
          sourceType: selectedSourceType,
          utilityCategory: selectedUtilityCategory,
          utilityName
        });
      }

      await refreshSession(storedSession);
      event.target.value = "";
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not upload the selected files.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <section className="results-panel energy-upload-page">
        <p className="eyebrow">Detailed analysis</p>
        <h1>Upload energy data</h1>
        <p>
          Add utility bills, Green Button XML, or a utility-export CSV so RetroFi can estimate
          savings, ROI, payback, and project priority with real usage data.
        </p>
        {!storedSession ? (
          <article className="feature-card energy-empty-state">
            <h3>No active upload session</h3>
            <p>Start with a free scan in this browser first, then return here to upload your utility data.</p>
            <div className="hero-actions">
              <CTAButton navigate={navigate} route="scan">Start Free Scan</CTAButton>
            </div>
          </article>
        ) : (
          <>
            <div className="card-grid two energy-upload-grid">
              <article className="feature-card energy-upload-form-card">
                <span className="eyebrow">1. Choose data type</span>
                <label className="field">
                  <span>Energy data format</span>
                  <select
                    onChange={(event) => setSelectedSourceType(event.target.value as UtilityFileType)}
                    value={selectedSourceType}
                  >
                    <option value="green_button_xml">Green Button XML</option>
                    <option value="green_button_csv">Utility export CSV</option>
                    <option value="utility_pdf">Utility bill PDF</option>
                  </select>
                </label>
                <label className="field">
                  <span>Utility name</span>
                  <input
                    onChange={(event) => setUtilityName(event.target.value)}
                    placeholder="PG&E, SCE, SVP, or leave blank"
                    type="text"
                    value={utilityName}
                  />
                </label>
                <label className="field">
                  <span>Utility category</span>
                  <select
                    onChange={(event) => setSelectedUtilityCategory(event.target.value as UtilityUploadCategory)}
                    value={selectedUtilityCategory}
                  >
                    <option value="auto_detect">Auto-detect</option>
                    <option value="electric">Electric</option>
                    <option value="gas">Gas</option>
                    <option value="water_sewer">Water / Sewer</option>
                    <option value="waste">Waste / Recycling / Organics</option>
                  </select>
                </label>
                <label className="field upload-field">
                  <span>Upload one or more files</span>
                  <input
                    accept={
                      selectedSourceType === "green_button_xml"
                        ? ".xml,application/xml,text/xml,application/atom+xml"
                        : selectedSourceType === "green_button_csv"
                          ? ".csv,text/csv,application/csv"
                          : ".pdf,application/pdf"
                    }
                    disabled={isUploading}
                    multiple
                    onChange={handleFilesSelected}
                    type="file"
                  />
                </label>
                <p className="field-note">
                  Green Button XML and CSV files are parsed by utility category when possible. PDFs are accepted for
                  any utility category and stored with a manual-review placeholder until extraction is implemented.
                </p>
              </article>
              <article className="feature-card energy-upload-form-card">
                <span className="eyebrow">2. Current session</span>
                <h3>{sessionPayload?.intake?.business.companyName || "Recent free scan"}</h3>
                <p>Address: {sessionPayload?.intake?.site?.address || "Not available"}</p>
                <p>Upload access expires: {new Date(storedSession.expiresAt).toLocaleString()}</p>
                <p>Latest next step: detailed savings and ROI analysis once usable energy data is attached.</p>
              </article>
            </div>
            {error ? <p className="error-message">{error}</p> : null}
            {isLoading ? <RetroFiLogoLoader label="Loading your uploaded files..." size="md" tone="card" /> : null}
            <section className="energy-upload-results">
              <div className="energy-upload-header">
                <h2>Uploaded files</h2>
                <p>
                  {isUploading
                    ? "Uploading and processing files…"
                    : `${sessionPayload?.uploadedUtilityFiles.length || 0} file(s) stored`}
                </p>
              </div>
              <div className="energy-upload-records">
                {isUploading ? <RetroFiSkeleton variant="card" label="Uploading and processing files" /> : null}
                {(sessionPayload?.uploadedUtilityFiles || []).map((record) => {
                  const extractedValues = (sessionPayload?.utilityExtractedValues || []).filter(
                    (value) => value.fileId === record.fileId
                  );
                  const billingStart = extractedValues.find((value) => value.fieldId === "billing_period_start");
                  const billingEnd = extractedValues.find((value) => value.fieldId === "billing_period_end");

                  return (
                    <article className="feature-card energy-upload-record" key={record.fileId}>
                      <span className="eyebrow">{energyDataSourceTypeLabels[record.fileType]}</span>
                      <h3>{record.originalFilename}</h3>
                      <p>Category: {formatUtilityCategory(record.utilityCategory)}</p>
                      <p>Status: {formatProcessingStatus(record.processingStatus)}</p>
                      <p>Utility: {record.utilityProvider || "Not detected"}</p>
                      <p>Coverage: {formatUtilityPeriod((billingStart?.value as string | null) || null, (billingEnd?.value as string | null) || null)}</p>
                      <p>Extracted fields: {extractedValues.length}</p>
                      {record.errorMessage ? <p className="error-message">{record.errorMessage}</p> : null}
                    </article>
                  );
                })}
                {sessionPayload && sessionPayload.uploadedUtilityFiles.length === 0 ? (
                  <article className="feature-card energy-empty-state">
                    <h3>No files uploaded yet</h3>
                    <p>Start with a Green Button XML or utility export and choose the utility category if you want to override auto-detect.</p>
                  </article>
                ) : null}
              </div>
            </section>
            <section className="energy-upload-results">
              <div className="energy-upload-header">
                <h2>Extracted utility fields</h2>
                <p>{`${sessionPayload?.utilityExtractedValues.length || 0} field value(s) extracted`}</p>
              </div>
              <div className="energy-upload-records">
                {(sessionPayload?.utilityExtractedValues || []).map((value) => (
                  <article className="feature-card energy-upload-record" key={value.extractedValueId}>
                    <span className="eyebrow">{value.fieldDisplayName}</span>
                    <h3>{formatUtilityFieldValue(value)}</h3>
                    <p>Category: {formatUtilityCategory((billFieldDictionaryById.get(value.fieldId)?.bill_type as UtilityCategory) || "unknown")}</p>
                    <p>Field ID: {value.fieldId}</p>
                    <p>Period: {formatUtilityPeriod(value.periodStart, value.periodEnd)}</p>
                    <p>Confidence: {value.confidence || "Not scored"}</p>
                  </article>
                ))}
                {sessionPayload && sessionPayload.utilityExtractedValues.length === 0 ? (
                  <article className="feature-card energy-empty-state">
                    <h3>No extracted values yet</h3>
                    <p>XML and CSV uploads will populate bill and usage fields here when they are processed successfully.</p>
                  </article>
                ) : null}
              </div>
            </section>
            <section className="energy-upload-results">
              <div className="energy-upload-header">
                <h2>Site energy profile</h2>
                <p>Aggregated from the utility files attached to this intake record.</p>
              </div>
              <div className="energy-upload-records">
                <article className="feature-card energy-upload-record">
                  <span className="eyebrow">Summary</span>
                  <h3>{sessionPayload?.siteEnergyProfile?.latestUtilityProvider || "Utility pending"}</h3>
                  <p>
                    Billing period:{" "}
                    {formatUtilityPeriod(
                      sessionPayload?.siteEnergyProfile?.latestBillingPeriodStart || null,
                      sessionPayload?.siteEnergyProfile?.latestBillingPeriodEnd || null
                    )}
                  </p>
                  <p>
                    Annual usage:{" "}
                    {sessionPayload?.siteEnergyProfile?.annualKwh != null
                      ? `${sessionPayload.siteEnergyProfile.annualKwh.toLocaleString()} kWh`
                      : "Not available"}
                  </p>
                  <p>
                    Annual cost:{" "}
                    {sessionPayload?.siteEnergyProfile?.annualElectricCost != null
                      ? `$${sessionPayload.siteEnergyProfile.annualElectricCost.toLocaleString()}`
                      : "Not available"}
                  </p>
                </article>
                {(sessionPayload?.siteEnergyProfile?.utilitySummaries || [])
                  .sort(
                    (left, right) =>
                      utilityCategoryDisplayOrder.indexOf(left.utilityCategory) -
                      utilityCategoryDisplayOrder.indexOf(right.utilityCategory)
                  )
                  .map((summary) => (
                    <article className="feature-card energy-upload-record" key={summary.utilityCategory}>
                      <span className="eyebrow">{formatUtilityCategory(summary.utilityCategory)}</span>
                      <h3>{summary.latestUtilityProvider || "Provider pending"}</h3>
                      <p>
                        Billing period:{" "}
                        {formatUtilityPeriod(summary.latestBillingPeriodStart, summary.latestBillingPeriodEnd)}
                      </p>
                      <p>
                        {utilityCategoryUsageLabels[summary.utilityCategory] || "Annual usage"}:{" "}
                        {summary.annualUsage != null
                          ? `${Number(summary.annualUsage).toLocaleString()}${summary.usageUnit ? ` ${summary.usageUnit}` : ""}`
                          : "Not available"}
                      </p>
                      <p>
                        Annual cost:{" "}
                        {summary.annualCost != null ? `$${Number(summary.annualCost).toLocaleString()}` : "Not available"}
                      </p>
                      <p>Available fields: {summary.availableFieldIds.length}</p>
                    </article>
                  ))}
              </div>
            </section>
            <div className="hero-actions">
              <CTAButton navigate={navigate} route="scan-results" variant="secondary">Back to Scan Results</CTAButton>
            </div>
          </>
        )}
      </section>
    </PublicShell>
  );
}

function PageHero({
  compact = false,
  copy,
  eyebrow,
  title
}: {
  compact?: boolean;
  copy: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className={compact ? "page-hero compact" : "page-hero"}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}

function IntakePage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  const [form, setForm] = useState<IntakeFormState>(() => readStoredIntakeFormDraft());
  const steps = useMemo(() => buildConversationalSteps(form), [form]);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    storeIntakeFormDraft(form);
  }, [form]);

  useEffect(() => {
    setStepIndex((current) => Math.min(current, Math.max(steps.length - 1, 0)));
  }, [steps.length]);

  const currentStep = steps[stepIndex];
  const flow = intakeFlowForOrganizationType(form.organizationType);
  const displayStepTotal = flow === "unselected" ? 12 : steps.length;
  const displayStepCurrent = Math.min(stepIndex + 1, displayStepTotal);
  const isLastVisibleStep = displayStepCurrent === displayStepTotal;
  const currentChoiceValue =
    currentStep?.field && typeof form[currentStep.field] === "string" ? form[currentStep.field] : "";

  const reviewRows = useMemo(() => {
    const rows: Array<{ label: string; value: string }> = [
      { label: "User type", value: organizationTypeLabelByValue[form.organizationType] || "Not provided" }
    ];

    if (form.companyName.trim()) {
      rows.push({
        label:
          flow === "multifamily"
            ? "Property name"
            : flow === "organization"
              ? "Organization name"
              : "Company name",
        value: form.companyName.trim()
      });
    }

    if (form.contactName.trim()) {
      rows.push({ label: "Name", value: form.contactName.trim() });
    }

    rows.push({ label: "Address", value: form.siteAddress.trim() || "Not provided" });
    rows.push({ label: "Electric utility", value: form.electricUtilityProvider.trim() || "Not provided" });

    if (form.gasUtilityProvider.trim()) {
      rows.push({ label: "Gas utility", value: form.gasUtilityProvider.trim() });
    }

    if (form.website.trim()) {
      rows.push({ label: "Website", value: form.website.trim() });
    }

    if (form.organizationSize.trim()) {
      rows.push({ label: "Organization size", value: form.organizationSize.trim() });
    }

    if (form.buildingType.trim()) {
      rows.push({
        label: flow === "homeowner" ? "Home type" : "Building type",
        value: form.buildingType.trim()
      });
    }

    if (form.numberOfUnits.trim()) {
      rows.push({ label: "Number of units", value: form.numberOfUnits.trim() });
    }

    rows.push({ label: "Square footage", value: form.squareFootage.trim() || "Not provided" });
    rows.push({ label: "Email", value: form.email.trim() || "Not provided" });

    if (form.phone.trim()) {
      rows.push({ label: "Phone", value: form.phone.trim() });
    }

    if (form.notes.trim()) {
      rows.push({ label: "Notes", value: form.notes.trim() });
    }

    return rows;
  }, [flow, form]);

  function updateField(name: keyof IntakeFormState, value: string) {
    setForm((current) => {
      if (name === "contactName") {
        return { ...current, contactName: value, fullName: value };
      }

      if (name === "fullName") {
        return { ...current, fullName: value, contactName: value };
      }

      return { ...current, [name]: value };
    });
  }

  function resetPathSpecificFields(nextOrganizationType: string) {
    const nextFlow = intakeFlowForOrganizationType(nextOrganizationType);

    setForm((current) => {
      const nextForm = {
        ...current,
        organizationType: nextOrganizationType,
        buildingType: ""
      };

      if (nextFlow === "homeowner") {
        nextForm.companyName = "";
        nextForm.website = "";
        nextForm.organizationSize = "";
        nextForm.numberOfUnits = "";
      } else if (nextFlow === "multifamily") {
        nextForm.website = "";
        nextForm.organizationSize = "";
      } else if (nextFlow === "business" || nextFlow === "organization") {
        nextForm.numberOfUnits = "";
      }

      return nextForm;
    });
  }

  function validateCurrentStep() {
    if (!currentStep?.field) {
      return null;
    }

    const value = form[currentStep.field];
    if (typeof value !== "string") {
      return null;
    }

    if (!currentStep.optional && !value.trim()) {
      return "This question is required before continuing.";
    }

    return currentStep.validate?.(value) ?? null;
  }

  function canAdvanceCurrentStep() {
    if (!currentStep) return false;
    if (currentStep.kind === "review") return true;
    if (currentStep.kind === "choice") return currentStep.optional ? true : Boolean(currentChoiceValue);
    if (!currentStep.field) return false;
    const value = form[currentStep.field];
    if (typeof value !== "string") return false;
    if (currentStep.optional && !value.trim()) return true;
    return validateCurrentStep() === null;
  }

  function goBack() {
    setError(null);
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function goNext() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  }

  function handleChoiceSelection(field: keyof IntakeFormState, value: string) {
    setError(null);
    const currentValue = form[field];
    const nextValue = currentValue === value ? "" : value;

    if (field === "organizationType") {
      resetPathSpecificFields(nextValue);
      return;
    }

    updateField(field, nextValue);
  }

  async function submitForm(event: FormEvent) {
    event.preventDefault();

    if (currentStep?.kind !== "review") {
      goNext();
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const payload = await apiPost<IntakeSubmissionPayload>("/api/intake", {
        fullName: form.contactName,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        roleTitle: "",
        contactPreference: "Email",
        siteAddress: form.siteAddress,
        electricUtilityProvider: form.electricUtilityProvider,
        gasUtilityProvider: form.gasUtilityProvider,
        companyName: form.companyName,
        website: form.website,
        industry: "",
        organizationType: form.organizationType,
        organizationSize: form.organizationSize,
        headquarters: "",
        ownershipStatus: "",
        buildingType: form.buildingType,
        squareFootage: form.squareFootage,
        numberOfUnits: form.numberOfUnits,
        interestedImprovements: [],
        sustainabilityGoals: "",
        currentChallenges: "",
        monthlyUtilitySpend: "",
        timeline: "",
        notes: form.notes
      });
      clearStoredIntakeFormDraft();
      storeEnergyDataUploadSession(payload.uploadSession);
      safeStorageSet("session", INTAKE_JUST_COMPLETED_KEY, "true");
      navigate("scan-results");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function renderStepBody() {
    if (!currentStep) {
      return null;
    }

    if (currentStep.kind === "choice" && currentStep.field && currentStep.options) {
      const selectedValue = form[currentStep.field];
      return (
        <div className="conversational-choice-grid">
          {currentStep.options.map((option) => (
            <OptionCard
              isSelected={selectedValue === option.value}
              key={option.value}
              onClick={() => handleChoiceSelection(currentStep.field as keyof IntakeFormState, option.value)}
              option={option}
            />
          ))}
        </div>
      );
    }

    if (currentStep.kind === "review") {
      return (
        <div className="review-panel">
          <div className="review-grid">
            {reviewRows.map((row) => (
              <article className="review-item" key={row.label}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (!currentStep.field) {
      return null;
    }

    const value = form[currentStep.field];
    if (typeof value !== "string") {
      return null;
    }

    if (currentStep.kind === "textarea") {
      return (
        <label className="conversational-input-shell">
          <textarea
            name={currentStep.field}
            onChange={(event) => updateField(currentStep.field as keyof IntakeFormState, event.target.value)}
            placeholder={currentStep.placeholder}
            value={value}
          />
        </label>
      );
    }

    return (
      <label className="conversational-input-shell">
        <input
          inputMode={currentStep.inputMode === "numeric" ? "numeric" : undefined}
          name={currentStep.field}
          onChange={(event) => updateField(currentStep.field as keyof IntakeFormState, event.target.value)}
          placeholder={currentStep.placeholder}
          type={currentStep.inputMode === "email" ? "email" : currentStep.inputMode === "tel" ? "tel" : currentStep.inputMode === "url" ? "url" : "text"}
          value={value}
        />
      </label>
    );
  }

  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <section className="scan-page form-shell">
        <form className="intake-form conversational-intake-form" onSubmit={submitForm}>
          <div className="intake-shell">
            <section className="step-question-area" key={currentStep?.id}>
              <h2>{currentStep?.question}</h2>
              {currentStep?.description ? <p>{currentStep.description}</p> : null}
              {currentStep?.optional ? <p className="required-note">Optional</p> : null}
            </section>
            <div className="step-body">
              {renderStepBody()}
            </div>
            {error ? <p className="error-message intake-error">{error}</p> : null}
            <div className="step-bottom-area">
              <div className="bottom-controls">
                {stepIndex > 0 ? (
                  <button className="step-back-button" disabled={isSubmitting} onClick={goBack} type="button">
                    ← Back
                  </button>
                ) : (
                  <span className="step-back-button-placeholder" aria-hidden="true" />
                )}
                <div className="conversational-action-group">
                  {currentStep?.kind === "choice" && currentStep.optional ? (
                    <button className="secondary-button" disabled={isSubmitting} onClick={goNext} type="button">
                      Skip for now
                    </button>
                  ) : null}
                  {currentStep && currentStep.kind !== "review" ? (
                    <button className="step-next-button" disabled={isSubmitting} type="submit">
                      {isLastVisibleStep ? "Submit" : "Next →"}
                    </button>
                  ) : null}
                  {currentStep?.kind === "review" ? (
                    <button className="step-next-button" disabled={isSubmitting} type="submit">
                      {isSubmitting ? "Submitting..." : currentStep.ctaLabel || "Submit"}
                    </button>
                  ) : null}
                </div>
              </div>
              <ProgressBar current={displayStepCurrent} total={displayStepTotal} />
              <div className="privacy-line">
                <LockIcon />
                <span>Your information is kept private and used only to prepare your recommendations.</span>
              </div>
            </div>
          </div>
        </form>
      </section>
    </PublicShell>
  );
}

function SignInPage({
  navigate,
  message,
  onAuthSuccess,
  publicAuth
}: {
  navigate: (route: Route) => void;
  message: string | null;
  onAuthSuccess: (payload: AuthPayload, credential: AuthCredential) => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} pageClassName="sign-in-page" publicAuth={publicAuth} showFooter={false}>
      <section className="sign-in-panel">
        {message ? <p className="muted-message">{message}</p> : null}
        <PasswordAuthPanel onAuthSuccess={onAuthSuccess} />
        <div className="auth-divider" role="presentation">
          <span>Or</span>
        </div>
        <GoogleSignInButton />
      </section>
    </PublicShell>
  );
}

function SessionRestoringPage() {
  return (
    <RetroFiPageLoader
      label="Checking your signed-in session..."
      mode="spinner"
      variant="default"
    />
  );
}

function AppSessionRestoringPage() {
  return (
    <RetroFiPageLoader
      label="Preparing your retrofit workspace..."
      mode="spinner"
      variant="retrofit"
    />
  );
}

function isAppChromeRoute(route: Route) {
  return (
    route === "portal" ||
    route === "portal-preview" ||
    route === "user-preview" ||
    route === "chats" ||
    route === "admin" ||
    route === "admin-dashboard-performance-data" ||
    route === "admin-application-sources" ||
    route === "admin-application-profiles" ||
    route === "tasks" ||
    route === "task-report" ||
    route === "testcases"
  );
}

function UserDashboard({
  credential,
  payload,
  onSignOut
}: {
  credential: AuthCredential | null;
  payload: AuthPayload;
  onSignOut: () => void;
}) {
  const [activeTab, setActiveTab] = useState("My information");

  return (
    <WorkspaceLayout
      activeNavItem={activeTab}
      navItems={["My information", "Retrofit estimates"]}
      onNavItemChange={setActiveTab}
      onSignOut={onSignOut}
      title="User portal"
      user={payload.user}
    >
      {activeTab === "Retrofit estimates" ? (
        <CustomerRetrofitEstimatesPanel
          credential={credential}
          emptyMessage="We don't have any eligible retrofit matches for this profile yet. Add more site details or utility context, then check back."
          endpoint="/api/portal/retrofit-recommendations"
          eyebrow="Retrofit estimates"
          intro="These recommendations are matched from your current profile, site details, and live opportunity data."
          loadingMessage="Matching your profile to live retrofit opportunities..."
          profileFormWriteEndpoint="/api/portal/pre-retrofit-form-answers"
          title="Retrofit Recommendations"
        />
      ) : (
        <ProfilePanel intake={payload.intake} user={payload.user} />
      )}
    </WorkspaceLayout>
  );
}

function mergePortalRetrofitRecommendationsPayload(
  currentPayload: PortalRetrofitRecommendationsResponse | null,
  detailPayload: PortalRetrofitRecommendationsResponse
): PortalRetrofitRecommendationsResponse {
  if (!detailPayload.isPartialRecommendations || !currentPayload) {
    return detailPayload;
  }

  const detailRetrofitsById = new Map(detailPayload.retrofits.map((retrofit) => [retrofit.retrofitTypeId, retrofit]));
  const seenRetrofitIds = new Set<string>();
  const retrofits = currentPayload.retrofits.map((retrofit) => {
    seenRetrofitIds.add(retrofit.retrofitTypeId);
    return detailRetrofitsById.get(retrofit.retrofitTypeId) || retrofit;
  });
  for (const retrofit of detailPayload.retrofits) {
    if (!seenRetrofitIds.has(retrofit.retrofitTypeId)) {
      retrofits.push(retrofit);
    }
  }

  return {
    ...currentPayload,
    generatedAt: detailPayload.generatedAt || currentPayload.generatedAt,
    retrofits,
    summary: {
      matchedRetrofitCount: Math.max(currentPayload.summary.matchedRetrofitCount, retrofits.length),
      matchedOpportunityCount: Math.max(currentPayload.summary.matchedOpportunityCount, detailPayload.summary.matchedOpportunityCount)
    }
  };
}

function CustomerRetrofitEstimatesPanel({
  credential,
  emptyMessage,
  endpoint,
  eyebrow,
  initialPayload = null,
  intro,
  loadingMessage,
  onPayloadLoaded,
  profileFormWriteEndpoint,
  summaryEndpoint,
  title,
  hideBillData = false,
  hideFormDetails = true,
  enableSeededFormDetails = false
}: {
  credential: AuthCredential | null;
  emptyMessage: string;
  endpoint: string;
  eyebrow: string;
  initialPayload?: PortalRetrofitRecommendationsResponse | null;
  intro: string;
  loadingMessage: string;
  onPayloadLoaded?: (payload: PortalRetrofitRecommendationsResponse) => void;
  profileFormWriteEndpoint?: string;
  summaryEndpoint?: string;
  title: string;
  hideBillData?: boolean;
  hideFormDetails?: boolean;
  enableSeededFormDetails?: boolean;
}) {
  const [payload, setPayload] = useState<PortalRetrofitRecommendationsResponse | null>(initialPayload);
  const [isLoading, setIsLoading] = useState(!initialPayload);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [loadingRetrofitDetailIds, setLoadingRetrofitDetailIds] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const requestKey = `${summaryEndpoint || ""}|${endpoint}`;
  const requestedRetrofitDetailIdsRef = useRef<Set<string>>(new Set());
  const initialPayloadRef = useRef({ payload: initialPayload, requestKey });
  if (initialPayloadRef.current.requestKey !== requestKey) {
    initialPayloadRef.current = { payload: initialPayload, requestKey };
  }

  useEffect(() => {
    requestedRetrofitDetailIdsRef.current = new Set();
    setLoadingRetrofitDetailIds({});
  }, [requestKey]);

  useEffect(() => {
    let isMounted = true;

    if (!credential) {
      setPayload(null);
      setError("Sign in again to load retrofit estimates.");
      setIsLoading(false);
      setIsDetailLoading(false);
      return () => {
        isMounted = false;
      };
    }
    const authCredential = credential;

    async function loadProgressivePayload() {
      const warmPayload = initialPayloadRef.current.payload;
      let hasRenderablePayload = Boolean(warmPayload);

      if (warmPayload) {
        setPayload(warmPayload);
        setError(null);
        setIsLoading(false);
      } else {
        setPayload(null);
        setIsLoading(true);
        setIsDetailLoading(false);
        setError(null);
      }

      if (!warmPayload && summaryEndpoint) {
        try {
          const summaryPayload = await apiGet<PortalRetrofitRecommendationsResponse>(summaryEndpoint, {
            headers: adminAuthHeaders(authCredential)
          });
          if (!isMounted) return;
          hasRenderablePayload = true;
          setPayload(summaryPayload);
          setError(null);
          setIsLoading(false);
          onPayloadLoaded?.(summaryPayload);
        } catch {
          if (!isMounted) return;
        }
      }

      if (warmPayload && !warmPayload.isProgressiveShell) {
        setIsDetailLoading(false);
        return;
      }

      try {
        setIsDetailLoading(true);
        const detailPayload = await apiGet<PortalRetrofitRecommendationsResponse>(endpoint, {
          headers: adminAuthHeaders(authCredential)
        });
        if (!isMounted) return;
        setPayload(detailPayload);
        setError(null);
        onPayloadLoaded?.(detailPayload);
      } catch (requestError) {
        if (!isMounted) return;
        if (!hasRenderablePayload) {
          setError(requestError instanceof Error ? requestError.message : "Could not load retrofit estimates.");
        } else {
          setError(requestError instanceof Error ? `Detailed estimates could not load: ${requestError.message}` : "Detailed estimates could not load.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsDetailLoading(false);
        }
      }
    }

    void loadProgressivePayload();

    return () => {
      isMounted = false;
    };
  }, [credential, endpoint, onPayloadLoaded, summaryEndpoint]);

  const loadRetrofitDetailsFirst = useCallback((retrofitId: string) => {
    if (!credential || !retrofitId || requestedRetrofitDetailIdsRef.current.has(retrofitId)) {
      return;
    }
    requestedRetrofitDetailIdsRef.current.add(retrofitId);
    setLoadingRetrofitDetailIds((current) => ({ ...current, [retrofitId]: true }));
    const separator = endpoint.includes("?") ? "&" : "?";
    const detailEndpoint = `${endpoint}${separator}retrofitTypeId=${encodeURIComponent(retrofitId)}`;
    void apiGet<PortalRetrofitRecommendationsResponse>(detailEndpoint, {
      headers: adminAuthHeaders(credential)
    })
      .then((detailPayload) => {
        setPayload((currentPayload) => mergePortalRetrofitRecommendationsPayload(currentPayload, detailPayload));
        setError(null);
      })
      .catch((requestError) => {
        setError(requestError instanceof Error ? `Detailed retrofit data could not load: ${requestError.message}` : "Detailed retrofit data could not load.");
      })
      .finally(() => {
        setLoadingRetrofitDetailIds((current) => ({ ...current, [retrofitId]: false }));
      });
  }, [credential, endpoint]);

  const handleProfileFormSaved = useCallback((response: PreRetrofitFormSaveResponse) => {
    setPayload((currentPayload) => currentPayload ? { ...currentPayload, intake: response.intake } : currentPayload);
  }, []);

  return (
      <RetrofitRecommendationsPreview
        credential={credential}
        emptyMessage={emptyMessage}
        error={error}
        eyebrow={eyebrow}
        intro={intro}
        isDetailLoading={isDetailLoading}
        isLoading={isLoading}
        loadingRetrofitDetailIds={loadingRetrofitDetailIds}
        loadingMessage={loadingMessage}
        onPrioritizeRetrofit={loadRetrofitDetailsFirst}
        hideBillData={hideBillData}
        hideFormDetails={hideFormDetails}
        enableSeededFormDetails={enableSeededFormDetails}
        onProfileFormSaved={handleProfileFormSaved}
        payload={payload}
        profileFormWriteEndpoint={profileFormWriteEndpoint}
        title={title}
      />
  );
}

function CustomerRetrofitCard({ retrofit }: { retrofit: SampleRetrofitGroup }) {
  const preview = retrofit.savingsPreview || null;
  const matchedPrograms = retrofit.opportunities.slice(0, 3);
  const extraProgramCount = Math.max(0, retrofit.opportunityCount - matchedPrograms.length);
  const monthlySavings =
    preview?.status === "calculated"
      ? preview.netMonthlyRecurringSavingsCents ?? preview.monthlySavingsCents ?? null
      : null;
  const annualSavings = preview?.status === "calculated" ? preview.annualSavingsCents : null;
  const upfrontCostAfterSavings = preview?.status === "calculated" ? preview.upfrontCostAfterSavingsCents : null;

  return (
    <article className="customer-retrofit-card">
      <div className="customer-retrofit-card-header">
        <div>
          <p className="eyebrow">{customerRetrofitCategoryLabel(retrofit)}</p>
          <h2>{customerRetrofitUiName(retrofit)}</h2>
          <p>{customerRetrofitDescription(retrofit)}</p>
        </div>
        <div className="customer-retrofit-count-pill">
          <strong>{retrofit.opportunityCount.toLocaleString()}</strong>
          <span>{retrofit.opportunityCount === 1 ? "matched program" : "matched programs"}</span>
        </div>
      </div>

      <div className="customer-retrofit-metrics">
        <CustomerRetrofitMetric label="Estimated monthly impact" value={formatUsdAmount(monthlySavings)} />
        <CustomerRetrofitMetric label="Estimated annual impact" value={formatUsdAmount(annualSavings)} />
        <CustomerRetrofitMetric label="Estimated upfront after savings" value={formatUsdAmount(upfrontCostAfterSavings)} />
      </div>

      <div className="customer-retrofit-content">
        <section>
          <p className="eyebrow">Matched opportunities</p>
          <div className="customer-retrofit-program-list">
            {matchedPrograms.map((opportunity) => (
              <article className="customer-retrofit-program-item" key={`${retrofit.retrofitTypeId}:${opportunity.opportunityId}`}>
                <div>
                  <h3>{opportunity.opportunityName}</h3>
                  <p>{customerOpportunitySourceLabel(opportunity)}</p>
                </div>
                <div className="link-list match-link-list">
                  {opportunity.sourceUrl ? <a href={opportunity.sourceUrl} rel="noreferrer" target="_blank">Source</a> : null}
                  {opportunity.websiteUrl ? <a href={opportunity.websiteUrl} rel="noreferrer" target="_blank">Website</a> : null}
                  {opportunity.applicationUrl ? <a href={opportunity.applicationUrl} rel="noreferrer" target="_blank">Apply</a> : null}
                </div>
              </article>
            ))}
            {extraProgramCount > 0 ? (
              <p className="muted-message">Plus {extraProgramCount.toLocaleString()} more matched program{extraProgramCount === 1 ? "" : "s"}.</p>
            ) : null}
          </div>
        </section>

        <section>
          <p className="eyebrow">Next step</p>
          <div className="customer-retrofit-next-step">
            <strong>{customerRetrofitNextStep(retrofit)}</strong>
            {preview?.status === "unsupported" && preview.unsupportedReason ? (
              <p>{preview.unsupportedReason}</p>
            ) : preview?.status === "blocked" ? (
              <p>We found a likely match, but the current estimate still needs more inputs before it can be calculated.</p>
            ) : preview?.status === "calculated" ? (
              <p>Use these figures as a first-pass planning estimate before requesting bids or final incentive confirmation.</p>
            ) : (
              <p>Review the matched programs to confirm fit, timing, and application requirements.</p>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}

function CustomerRetrofitMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="customer-retrofit-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function customerRetrofitCategoryLabel(retrofit: SampleRetrofitGroup) {
  const id = retrofit.retrofitTypeId.toLowerCase();
  const parent = retrofit.parentCategory.toLowerCase();
  if (id.includes("led") || id.includes("lighting")) return "Lighting";
  if (id.includes("hvac") || id.includes("heat_pump") || id.includes("space")) return "HVAC";
  if (id.includes("solar")) return "Solar";
  if (id.includes("ev") || id.includes("charger")) return "EV charging";
  if (id.includes("water") || id.includes("plumb")) return "Water efficiency";
  if (id.includes("insulation") || id.includes("envelope") || id.includes("roof") || id.includes("window")) return "Building envelope";
  if (!retrofit.isPhysicalRetrofit) return "Planning & compliance";
  if (parent.includes("energy_efficiency")) return "Industrial efficiency";
  if (parent.includes("renewable")) return "Solar";
  return capitalizeLabel(parent);
}

function customerRetrofitDescription(retrofit: SampleRetrofitGroup) {
  if (!retrofit.isPhysicalRetrofit) {
    return planningRetrofitExplanation(retrofit.retrofitTypeId);
  }
  return customerFriendlyRetrofitDescription({
    category: customerRetrofitCategoryLabel(retrofit),
    fallback: retrofit.displayName,
    id: retrofit.retrofitTypeId,
    name: customerRetrofitUiName(retrofit)
  });
}

function customerOpportunitySourceLabel(opportunity: SampleMatchResult) {
  return [
    opportunity.sourceSummary?.administrator,
    opportunity.sourceSummary?.programType,
    opportunity.sourceSummary?.sourceName
  ]
    .filter(Boolean)
    .join(" • ") || "Live matched program";
}

function customerRetrofitNextStep(retrofit: SampleRetrofitGroup) {
  const topOpportunity = retrofit.opportunities[0];
  if (topOpportunity?.nextQuestion?.prompt) return topOpportunity.nextQuestion.prompt;
  if (topOpportunity?.unresolvedRequirements?.[0]) return topOpportunity.unresolvedRequirements[0];
  if (retrofit.savingsPreview?.status === "calculated") {
    return "Review the estimate and confirm project scope before requesting bids.";
  }
  return "Review the matched program details and confirm your project fit.";
}

type EstimateBasisValue = "initial_form" | "uploaded_bills" | "confirmed_details" | "quote" | "tax_info" | "mixed";

type RetrofitScenarioPreview = {
  id: string;
  retrofitId: string;
  name: string;
  description: string;
  selectedOpportunityIds: string[];
  deselectedOpportunityIds: string[];
  metrics: {
    estimatedUpfrontProjectCost?: number | null;
    upfrontFinancialIncentive?: number | null;
    recurringOperationalSavingsAnnual?: number | null;
    recurringOperationalSavingsMonthly?: number | null;
    paybackPeriodYears?: number | null;
    totalSavings?: number | null;
    roiPercent?: number | null;
    certificationBoost?: string;
    environmentalImpactContribution?: string;
  };
  missingInfo: string[];
  estimateNotes: string[];
};

type EditableEstimateAssumption = {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  source: "industry_standard" | "user_entered" | "bill_uploaded" | "quote_uploaded" | "unknown";
  sourceLabel?: string;
  confidenceLabel?: "High" | "Medium" | "Low" | "Needs review";
  affects?: string[];
  confirmed: boolean;
};

type RetrofitOpportunityPreview = {
  id: string;
  retrofitId: string;
  name: string;
  description: string;
  type: string;
  timing: "upfront" | "recurring" | "both" | "tax_time" | "reimbursement" | "unknown";
  eligibilityStatus: "confirmed" | "likely" | "unknown" | "needs review";
  requiredInfo: string[];
  applicationProcess?: string;
  applicationMethod:
    | "online portal"
    | "PDF"
    | "email"
    | "contractor-submitted"
    | "utility portal"
    | "tax/accountant filing"
    | "unknown";
  difficulty?: "easy" | "medium" | "hard" | "unknown";
  length?: string;
  helpAvailable?: string;
  deadline?: string;
  environmentalImpactContribution?: string;
  certificationBoost?: string;
  sourceUrl?: string | null;
  programWebsiteUrl?: string | null;
  applicationUrl?: string | null;
  pdfUrl?: string | null;
  contactEmail?: string | null;
  estimatedValue?: number | null;
  valueRule?: string;
  valueCap?: string;
  eligibleCostBasis?: string;
  includedState:
    | "Included in current estimate"
    | "Not included in current estimate"
    | "Not included yet — needs more information"
    | "Possible additional value";
  selected: boolean;
  whySelected?: string;
  whyNotSelected?: string;
};

type AddedRetrofitPlanSnapshot = {
  scenarioId: string;
  opportunityIds: string[];
  includedOpportunityIds: string[];
  pendingOpportunityIds: string[];
  financialSnapshot: {
    netCostBeforeTaxBenefits?: number | null;
    upfrontFinancialIncentive?: number | null;
    recurringOperationalSavingsAnnual?: number | null;
    paybackPeriodYears?: number | null;
  };
  missingInfo: string[];
  nextStep: string;
  recalculationStatus: "Recalculation pending" | "Recalculation not available yet" | "Updated after selected retrofit";
  addedAt: string;
};

type OperatingSavingsPreview = {
  id: string;
  retrofitId: string;
  name: string;
  annualSavings?: number | null;
  monthlySavings?: number | null;
  includedIn: "Recurring Operational Savings";
  eligibilityStatus: "confirmed" | "likely" | "unknown";
  requiredInfo: string[];
  confidencePercent?: number;
  confidenceLabel?: "High" | "Medium" | "Low" | "Needs review";
  assumptions?: string[];
  customerFacingBasis?: string;
};

type EnvironmentalImpactConfidence = "High" | "Medium" | "Low" | "Needs data";

type RetrofitEnvironmentalImpact = {
  overall: {
    label: string;
    displayValue: string;
    unit: "tCO2e/year";
    fallback?: string;
    impactType:
      | "avoided_emissions"
      | "potential_identified"
      | "impact_supported"
      | "certification_progress"
      | "not_estimated";
    confidence: EnvironmentalImpactConfidence;
    subtext: string;
    basis: string[];
  };
  resources: Array<{
    label: string;
    displayValue: string;
    unit: string;
    fallback?: string;
    confidence: EnvironmentalImpactConfidence;
    basis: string;
  }>;
  certificationContribution: Array<{
    program: string;
    status: "Supports" | "May support" | "Needs review" | "Not evaluated yet";
    detail: string;
  }>;
  missingInfo: string[];
};

type RetrofitDetailQuestion = {
  id: string;
  questionId?: string;
  retrofitId?: string;
  retrofitName?: string;
  opportunityId?: string;
  requirementId?: string;
  requirementType?: string;
  applicationSection?: string;
  questionKind?: string;
  question: string;
  whyItMatters?: string;
  affects?: string[];
  answerType: "text" | "number" | "select" | "boolean" | "file" | "date";
  options?: string[];
  answer?: string | number | boolean;
  canonicalInputKey?: string;
  collectionStage?: string;
  collectionSurface?: string;
  required?: boolean;
  sourceUrl?: string;
  evidenceSnippet?: string;
  confidence?: string;
  audience?: string;
  visibleIf?: FormCondition;
  requiredIf?: FormCondition;
  clearsWhenHidden?: boolean;
};

type FormCondition =
  | { field: string; op: "equals" | "not_equals" | ">" | ">=" | "<" | "<=" | "in" | "exists"; value?: string | number | boolean | string[] | number[] | boolean[] }
  | { all: FormCondition[] }
  | { any: FormCondition[] }
  | { not: FormCondition };

type NextBestAction = {
  id: string;
  text: string;
  relatedRetrofitName?: string;
  relatedOpportunityName?: string;
  priority: "High" | "Medium" | "Low";
  status: "Not started" | "In progress" | "Done";
};

type RetrofitPreviewCard = {
  id: string;
  rank: number;
  name: string;
  category?: string;
  description: string;
  whyRecommended: string[];
  confidenceLabel?: "High" | "Medium" | "Low" | "Needs review";
  confidencePercent?: number;
  estimateBasis: EstimateBasisValue;
  missingInfo: string[];
  recommendedNextStep?: string;
  tabSummary: {
    primaryMetricLabel: string;
    primaryMetricValue?: string | number;
    fallback?: string;
    selectedOpportunityCount: number;
    missingInfoCount: number;
  };
  metrics: {
    estimatedUpfrontProjectCost?: number | null;
    upfrontFinancialIncentive?: number | null;
    recurringOperationalSavingsAnnual?: number | null;
    recurringOperationalSavingsMonthly?: number | null;
    paybackPeriodYears?: number | null;
    taxBenefits?: string | number | null;
    roi?: string | number | null;
    netCostBeforeTaxBenefits?: number | null;
    effectiveCostAfterOneTimeBenefits?: number | null;
  };
  editableAssumptions: EditableEstimateAssumption[];
  scenarios: RetrofitScenarioPreview[];
  opportunities: RetrofitOpportunityPreview[];
  operatingSavings: OperatingSavingsPreview[];
  environmentalImpact: RetrofitEnvironmentalImpact;
  detailQuestions: RetrofitDetailQuestion[];
};

export type UserRetrofitPreviewResult = {
  profileId?: string;
  intakeId?: string;
  customerName?: string;
  taxRuntimePreview?: TaxRuntimePreview | null;
  estimateBasis: EstimateBasisValue;
  estimateCompletenessPercent?: number;
  missingInputs: string[];
  topRecommendation?: {
    retrofitId: string;
    retrofitName: string;
    reason: string;
    nextStep: string;
  };
  retrofits: RetrofitPreviewCard[];
  nextActions: NextBestAction[];
  generatedAt?: string;
  dataSourceLabel: string;
};

const SCENARIO_NAMES = {
  lowUpfront: "Scenario A: Low upfront cost",
  bestPayback: "Scenario B: Best payback",
  highestSavings: "Scenario C: Highest total savings",
  certification: "Scenario D: Certification-focused"
} as const;

const INSTRUCTIONS_ONBOARDING_SEEN_KEY = "retrofi.instructionsOnboardingSeen";
const INTAKE_JUST_COMPLETED_KEY = "retrofi.intakeJustCompleted";

const PROCESS_ONBOARDING_LINES = [
  { id: "title", text: "The Process" },
  { id: "step1", text: "Step 1: Upload your bills" },
  { id: "step2", text: "Step 2: Choose a retrofit and answer a few questions" },
  { id: "step3", text: "Step 3: Get your opportunities, metrics, and more" },
  { id: "step4", text: "Step 4: Receive implementation and application support" },
  { id: "step5", text: "Step 5: View your dashboard" },
  {
    id: "note",
    text: "Note: Once you proceed with a retrofit and confirm, other retrofit data will adjust accordingly for future selection."
  }
] as const;

type BillUploadStepId = "electric" | "water" | "gas" | "waste";
type BillUploadStatus = "pending" | "uploaded" | "skipped";

type BillUploadStep = {
  completedLabel: string;
  id: BillUploadStepId;
  subtitle: string;
  title: string;
  utilityLabel: string;
};

type BillUploadFileRecord = {
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
};

type BillUploadState = {
  flowComplete: boolean;
  files: Partial<Record<BillUploadStepId, BillUploadFileRecord>>;
  statuses: Record<BillUploadStepId, BillUploadStatus>;
};

type RetrofitReadiness = {
  billsComplete: boolean;
  questionsComplete: boolean;
  estimateComplete: boolean;
};

export const BILL_UPLOAD_STEPS: BillUploadStep[] = [
  {
    id: "electric",
    utilityLabel: "Electric",
    title: "Upload your electric bill",
    subtitle: "Upload your latest electric utility bill to begin unlocking eligible retrofits.",
    completedLabel: "Electric bill uploaded"
  },
  {
    id: "water",
    utilityLabel: "Water",
    title: "Upload your water bill",
    subtitle: "Upload your latest water utility bill to continue unlocking eligible retrofits.",
    completedLabel: "Water bill uploaded"
  },
  {
    id: "gas",
    utilityLabel: "Gas",
    title: "Upload your gas bill",
    subtitle: "Upload your latest gas utility bill to continue unlocking eligible retrofits.",
    completedLabel: "Gas bill uploaded"
  },
  {
    id: "waste",
    utilityLabel: "Additional utility",
    title: "Upload your waste or other utility bill",
    subtitle: "Upload any remaining utility bill to complete your estimate inputs.",
    completedLabel: "Additional utility bill uploaded"
  }
];

function safeStorageGet(kind: "local" | "session", key: string) {
  if (typeof window === "undefined") return null;
  try {
    const storage = kind === "local" ? window.localStorage : window.sessionStorage;
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(kind: "local" | "session", key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    const storage = kind === "local" ? window.localStorage : window.sessionStorage;
    storage.setItem(key, value);
  } catch {
    // Local/session storage can be unavailable in private modes; React state still lets the user continue.
  }
}

function safeStorageRemove(kind: "local" | "session", key: string) {
  if (typeof window === "undefined") return;
  try {
    const storage = kind === "local" ? window.localStorage : window.sessionStorage;
    storage.removeItem(key);
  } catch {
    // Ignore storage failures so onboarding never blocks recommendations.
  }
}

export function getBillUploadStorageKey(profileId: string | null | undefined, intakeId: string | null | undefined) {
  return `retrofi.billUploadModalState:${profileId || "unknown"}:${intakeId || "unknown"}`;
}

export function getDefaultBillUploadState(): BillUploadState {
  return {
    flowComplete: false,
    files: {},
    statuses: {
      electric: "pending",
      water: "pending",
      gas: "pending",
      waste: "pending"
    }
  };
}

function normalizeBillUploadStepId(value: string | null | undefined): BillUploadStepId | null {
  if (value === "electric" || value === "water" || value === "gas" || value === "waste") return value;
  if (value === "other") return "waste";
  return null;
}

function normalizeUtilityCategoryToBillUploadStepId(value: UtilityCategory | string | null | undefined): BillUploadStepId | null {
  if (value === "electric" || value === "gas" || value === "waste") return value;
  if (value === "water_sewer" || value === "water") return "water";
  return null;
}

export function hydrateBillUploadStateFromIntake(intake: IntakeRecord | null, baseState: BillUploadState) {
  if (!intake) return baseState;
  const nextState: BillUploadState = {
    ...baseState,
    files: { ...baseState.files },
    statuses: { ...baseState.statuses }
  };
  intake.uploadedUtilityFiles.forEach((file) => {
    const stepId = normalizeUtilityCategoryToBillUploadStepId(file.utilityCategory);
    if (!stepId || nextState.files[stepId]) return;
    nextState.files[stepId] = {
      name: file.originalFilename || `${formatUtilityCategory(file.utilityCategory)} bill`,
      size: 0,
      type: file.fileType || "unknown",
      uploadedAt: file.uploadedAt
    };
  });
  const uploadedCategories = billUploadStepIdsFromIntake(intake);
  for (const step of BILL_UPLOAD_STEPS) {
    if (uploadedCategories.has(step.id)) {
      nextState.statuses[step.id] = "uploaded";
    }
  }
  nextState.flowComplete = nextState.flowComplete || BILL_UPLOAD_STEPS.every((step) => nextState.statuses[step.id] === "uploaded");
  return nextState;
}

function billUploadStepIdsFromIntake(intake: IntakeRecord) {
  const stepIds = new Set<BillUploadStepId>();
  const addStepId = (value: UtilityCategory | string | null | undefined) => {
    const stepId = normalizeUtilityCategoryToBillUploadStepId(value);
    if (stepId) stepIds.add(stepId);
  };
  const addFieldId = (fieldId: string | null | undefined) => {
    if (!fieldId) return;
    addStepId((billFieldDictionaryById.get(fieldId)?.bill_type as UtilityCategory | undefined) || null);
  };

  intake.uploadedUtilityFiles.forEach((file) => addStepId(file.utilityCategory));
  intake.utilityExtractedValues.forEach((value) => addFieldId(value.fieldId));
  intake.siteEnergyProfile?.availableFieldIds?.forEach(addFieldId);
  intake.siteEnergyProfile?.utilitySummaries?.forEach((summary) => {
    if (summary.uploadedFileCount || summary.processedFileCount || summary.availableFieldIds.length) {
      addStepId(summary.utilityCategory);
      summary.availableFieldIds.forEach(addFieldId);
    }
  });

  return stepIds;
}

function intakeHasUtilityBillData(intake: IntakeRecord | null | undefined) {
  return Boolean(
    intake?.uploadedUtilityFiles?.length ||
    intake?.utilityExtractedValues?.length ||
    intake?.siteEnergyProfile?.uploadedFileCount ||
    intake?.siteEnergyProfile?.processedFileCount ||
    intake?.siteEnergyProfile?.availableFieldIds?.length ||
    intake?.siteEnergyProfile?.utilitySummaries?.some((summary) => summary.uploadedFileCount || summary.processedFileCount || summary.availableFieldIds.length)
  );
}

function getBillUploadStepIndex(stepId: BillUploadStepId | null | undefined) {
  if (!stepId) return 0;
  const index = BILL_UPLOAD_STEPS.findIndex((step) => step.id === stepId);
  return index >= 0 ? index : 0;
}

export function getRequiredBillTypesForRetrofit(
  retrofit: Pick<RetrofitPreviewCard, "id" | "name" | "category"> & { requiredBillTypes?: string[] }
): BillUploadStepId[] {
  const explicitTypes = (retrofit.requiredBillTypes || [])
    .map((type) => normalizeBillUploadStepId(type))
    .filter((type): type is BillUploadStepId => Boolean(type));
  if (explicitTypes.length > 0) {
    return [...new Set(explicitTypes)];
  }

  const key = `${retrofit.id} ${retrofit.name} ${retrofit.category || ""}`.toLowerCase();
  if (key.includes("water")) return ["water"];
  if (key.includes("ev") || key.includes("charger")) return ["electric"];
  if (key.includes("solar")) return ["electric"];
  if (key.includes("refrigeration")) return ["electric"];
  if (key.includes("lighting") || key.includes("led")) return ["electric"];
  if (key.includes("heat pump") || key.includes("hvac") || key.includes("boiler") || key.includes("furnace") || key.includes("heating")) {
    return ["electric", "gas"];
  }
  if (key.includes("insulation") || key.includes("envelope") || key.includes("weatherization") || key.includes("window") || key.includes("roof")) {
    return ["electric"];
  }
  if (key.includes("waste") || key.includes("recycling") || key.includes("organics")) return ["waste"];
  return ["electric"];
}

export function areBillsCompleteForRetrofit(
  retrofit: Pick<RetrofitPreviewCard, "id" | "name" | "category"> & { requiredBillTypes?: string[] },
  billUploadState: BillUploadState
) {
  const requiredBillTypes = getRequiredBillTypesForRetrofit(retrofit);
  return requiredBillTypes.every((billType) => billUploadState.statuses[billType] === "uploaded");
}

export function areRetrofitQuestionsComplete(
  retrofit: Pick<RetrofitPreviewCard, "detailQuestions">,
  detailAnswers: Record<string, string>
) {
  const questions = getRetrofitFormQuestions(retrofit, detailAnswers).filter((question) =>
    isRetrofitQuestionRequired(question, detailAnswers)
  );
  if (questions.length === 0) return true;
  return questions.every((question) => {
    const answer = detailAnswers[question.id];
    return typeof answer === "string" ? answer.trim().length > 0 : false;
  });
}

export function getRetrofitFormQuestions(
  retrofit: Pick<RetrofitPreviewCard, "detailQuestions"> & Partial<Pick<RetrofitPreviewCard, "id" | "name" | "opportunities">>,
  answers: Record<string, string> = {}
): RetrofitDetailQuestion[] {
  const questions = [...retrofit.detailQuestions];
  const existingQuestionIds = new Set(questions.map((question) => question.id));
  const existingPrompts = new Set(questions.map((question) => question.question.trim().toLowerCase()));
  const opportunityInfoItems = [...new Set((retrofit.opportunities || []).flatMap((opportunity) => opportunity.requiredInfo || []))]
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);

  for (const item of opportunityInfoItems) {
    const normalizedPrompt = `Confirm ${item}.`.toLowerCase();
    if (existingPrompts.has(normalizedPrompt)) continue;
    const questionId = `${retrofit.id || "retrofit"}:opportunity:${slugify(item)}`;
    if (existingQuestionIds.has(questionId)) continue;
    questions.push({
      id: questionId,
      retrofitId: retrofit.id || "retrofit",
      question: `Confirm ${item}.`,
      answerType: "text",
      whyItMatters: "Some programs need this information before incentive value and eligibility can be finalized.",
      affects: ["Opportunity eligibility", "Application overview"]
    });
    existingQuestionIds.add(questionId);
    existingPrompts.add(normalizedPrompt);
  }

  return questions.filter((question) => isRetrofitQuestionVisible(question, answers));
}

function isRetrofitQuestionVisible(question: RetrofitDetailQuestion, answers: Record<string, string>) {
  return evaluateFormCondition(question.visibleIf, answers, true);
}

function isRetrofitQuestionRequired(question: RetrofitDetailQuestion, answers: Record<string, string>) {
  if (question.requiredIf) return evaluateFormCondition(question.requiredIf, answers, true);
  return question.required !== false;
}

function evaluateFormCondition(condition: FormCondition | undefined, answers: Record<string, string>, defaultValue: boolean): boolean {
  if (!condition) return defaultValue;
  if ("all" in condition) return condition.all.every((item) => evaluateFormCondition(item, answers, true));
  if ("any" in condition) return condition.any.some((item) => evaluateFormCondition(item, answers, false));
  if ("not" in condition) return !evaluateFormCondition(condition.not, answers, false);

  const answer = answers[condition.field] ?? answers[canonicalAnswerKey(condition.field, answers)] ?? "";
  const normalizedAnswer = String(answer).trim();
  const normalizedValue = String(condition.value ?? "").trim();
  const numericAnswer = Number(normalizedAnswer);
  const numericValue = Number(condition.value);

  switch (condition.op) {
    case "exists":
      return normalizedAnswer.length > 0;
    case "equals":
      return normalizedAnswer === normalizedValue;
    case "not_equals":
      return normalizedAnswer !== normalizedValue;
    case "in":
      return Array.isArray(condition.value) && condition.value.map(String).includes(normalizedAnswer);
    case ">":
      return Number.isFinite(numericAnswer) && Number.isFinite(numericValue) && numericAnswer > numericValue;
    case ">=":
      return Number.isFinite(numericAnswer) && Number.isFinite(numericValue) && numericAnswer >= numericValue;
    case "<":
      return Number.isFinite(numericAnswer) && Number.isFinite(numericValue) && numericAnswer < numericValue;
    case "<=":
      return Number.isFinite(numericAnswer) && Number.isFinite(numericValue) && numericAnswer <= numericValue;
    default:
      return defaultValue;
  }
}

function canonicalAnswerKey(inputKey: string, answers: Record<string, string>) {
  const normalized = inputKey.toLowerCase();
  return Object.keys(answers).find((key) => key.toLowerCase().endsWith(`:${normalized}`)) || inputKey;
}

function firstAvailableFormValue(...values: Array<string | number | boolean | null | undefined>) {
  for (const value of values) {
    if (value == null) continue;
    const stringValue = String(value).trim();
    if (stringValue.length > 0) return stringValue;
  }
  return "";
}

function annualUtilityCostForCategory(intake: IntakeRecord | null | undefined, category: UtilityCategory) {
  const summary = intake?.siteEnergyProfile?.utilitySummaries.find((item) => item.utilityCategory === category);
  if (summary?.annualCost != null) return String(summary.annualCost);
  return "";
}

function monthlyUtilityCostForCategory(intake: IntakeRecord | null | undefined, category: UtilityCategory) {
  const annualCost = Number(annualUtilityCostForCategory(intake, category));
  if (Number.isFinite(annualCost) && annualCost > 0) return String(Math.round(annualCost / 12));
  return "";
}

function seededSelectAnswer(question: RetrofitDetailQuestion, intake: IntakeRecord | null | undefined) {
  const options = question.options || [];
  const lowerQuestion = question.question.toLowerCase();
  const findOption = (needle: string) => options.find((option) => option.toLowerCase().includes(needle));
  if (lowerQuestion.includes("tax included")) return findOption("estimate") || options[0] || "";
  if (lowerQuestion.includes("quote")) return findOption("in progress") || findOption("yes") || options[0] || "";
  if (lowerQuestion.includes("fuel type")) {
    const hasGas = Boolean(intake?.site?.gasUtilityProvider);
    const hasElectric = Boolean(intake?.site?.electricUtilityProvider);
    if (hasGas && hasElectric) return findOption("mixed") || findOption("gas") || options[0] || "";
    if (hasGas) return findOption("gas") || options[0] || "";
    return findOption("electric") || options[0] || "";
  }
  if (lowerQuestion.includes("roof") && lowerQuestion.includes("control")) {
    const ownership = intake?.site?.ownershipStatus?.toLowerCase() || "";
    if (ownership.includes("own")) return findOption("yes") || options[0] || "";
    if (ownership.includes("lease")) return findOption("shared") || findOption("unknown") || options[0] || "";
  }
  if (lowerQuestion.includes("lighting") || lowerQuestion.includes("controls") || lowerQuestion.includes("panel") || lowerQuestion.includes("permit")) {
    return findOption("not sure") || findOption("unknown") || options[0] || "";
  }
  return options[0] || "";
}

function seededNumberAnswer(question: RetrofitDetailQuestion, intake: IntakeRecord | null | undefined) {
  const lowerQuestion = question.question.toLowerCase();
  if (lowerQuestion.includes("annual kwh")) return firstAvailableFormValue(intake?.siteEnergyProfile?.annualKwh, "0");
  if (lowerQuestion.includes("water bill")) return firstAvailableFormValue(monthlyUtilityCostForCategory(intake, "water_sewer"), intake?.sustainability.monthlyUtilitySpend, "0");
  if (lowerQuestion.includes("area") || lowerQuestion.includes("square")) return firstAvailableFormValue(intake?.site?.squareFootage, "0");
  if (lowerQuestion.includes("hours")) return "8";
  if (lowerQuestion.includes("age")) return "10";
  if (lowerQuestion.includes("charger")) return firstAvailableFormValue(intake?.site?.numberOfUnits, "1");
  if (lowerQuestion.includes("fixture") || lowerQuestion.includes("bulb") || lowerQuestion.includes("unit") || lowerQuestion.includes("count") || lowerQuestion.includes("many")) {
    return firstAvailableFormValue(intake?.site?.numberOfUnits, "1");
  }
  if (lowerQuestion.includes("system size")) return "0";
  return "1";
}

function seededTextAnswer(question: RetrofitDetailQuestion, intake: IntakeRecord | null | undefined) {
  const lowerQuestion = question.question.toLowerCase();
  if (lowerQuestion.includes("system") && lowerQuestion.includes("currently")) return firstAvailableFormValue(intake?.site?.buildingType, "Provided in profile");
  if (lowerQuestion.includes("area") || lowerQuestion.includes("scope")) return firstAvailableFormValue(intake?.site?.squareFootage, "Provided in profile");
  if (lowerQuestion.includes("fuel") || lowerQuestion.includes("baseline")) {
    return firstAvailableFormValue(intake?.site?.gasUtilityProvider ? "Gas utility present" : "Electric utility present", intake?.site?.electricUtilityProvider);
  }
  if (lowerQuestion.includes("utility territory")) return firstAvailableFormValue(intake?.site?.electricUtilityProvider, intake?.site?.gasUtilityProvider, intake?.business.headquarters);
  if (lowerQuestion.includes("tax") || lowerQuestion.includes("entity")) return firstAvailableFormValue(intake?.business.organizationType, "Provided in profile");
  if (lowerQuestion.includes("usage")) return firstAvailableFormValue(intake?.siteEnergyProfile?.annualKwh, annualUtilityCostForCategory(intake, "electric"), "Provided in profile");
  if (lowerQuestion.includes("water")) return firstAvailableFormValue(monthlyUtilityCostForCategory(intake, "water_sewer"), intake?.sustainability.monthlyUtilitySpend, "Provided in profile");
  if (lowerQuestion.includes("current") || lowerQuestion.includes("installed")) return firstAvailableFormValue(intake?.sustainability.currentChallenges, intake?.site?.buildingType, "Provided in profile");
  return firstAvailableFormValue(question.answer, intake?.sustainability.notes, intake?.sustainability.goals, "Provided in profile");
}

export function buildSeededRetrofitDetailAnswers(retrofits: RetrofitPreviewCard[], intake: IntakeRecord | null | undefined) {
  const answers: Record<string, string> = {};
  for (const retrofit of retrofits) {
    for (const question of getRetrofitFormQuestions(retrofit)) {
      if (question.answer != null) {
        answers[question.id] = String(question.answer);
      } else if (question.answerType === "select") {
        answers[question.id] = seededSelectAnswer(question, intake);
      } else if (question.answerType === "number") {
        answers[question.id] = seededNumberAnswer(question, intake);
      } else if (question.answerType === "boolean") {
        answers[question.id] = "Yes";
      } else {
        answers[question.id] = seededTextAnswer(question, intake);
      }
    }
  }
  return answers;
}

export function answersFromSavedPreRetrofitRecord(record: PreRetrofitFormRetrofitAnswers | null | undefined) {
  const answers: Record<string, string> = {};
  if (!record?.answers) return answers;
  const orderedQuestionIds = [
    ...(record.answerOrder || []),
    ...Object.keys(record.answers).filter((questionId) => !(record.answerOrder || []).includes(questionId))
  ];

  for (const questionId of orderedQuestionIds) {
    const value = record.answers[questionId]?.value;
    if (typeof value === "string" && value.trim().length > 0) {
      answers[questionId] = value;
    }
  }

  return answers;
}

export function buildPersistedRetrofitDetailAnswers(retrofits: RetrofitPreviewCard[], intake: IntakeRecord | null | undefined) {
  const savedRetrofits = intake?.preRetrofitFormAnswers?.retrofits || {};
  const answers: Record<string, string> = {};
  for (const retrofit of retrofits) {
    const record = savedRetrofits[retrofit.id];
    Object.assign(answers, answersFromSavedPreRetrofitRecord(record));
  }
  return answers;
}

export function isEstimateCompleteForRetrofit(retrofit: RetrofitPreviewCard) {
  const hasNumericValue = (value: number | null | undefined) => typeof value === "number" && Number.isFinite(value);
  const hasValidRoi =
    retrofit.metrics.roi == null
      ? true
      : typeof retrofit.metrics.roi === "number"
        ? Number.isFinite(retrofit.metrics.roi)
        : typeof retrofit.metrics.roi === "string"
          ? Number.isFinite(parsePercentMetric(retrofit.metrics.roi) ?? Number.NaN)
          : false;
  return (
    hasNumericValue(retrofit.metrics.estimatedUpfrontProjectCost) &&
    hasNumericValue(retrofit.metrics.recurringOperationalSavingsAnnual) &&
    hasNumericValue(retrofit.metrics.paybackPeriodYears) &&
    hasValidRoi
  );
}

export function getRetrofitReadiness(
  retrofit: RetrofitPreviewCard,
  billUploadState: BillUploadState,
  detailAnswers: Record<string, string>
): RetrofitReadiness {
  const billsComplete = areBillsCompleteForRetrofit(retrofit, billUploadState);
  const questionsComplete = areRetrofitQuestionsComplete(retrofit, detailAnswers);
  const estimateComplete = billsComplete && questionsComplete && isEstimateCompleteForRetrofit(retrofit);
  return {
    billsComplete,
    questionsComplete,
    estimateComplete
  };
}

function readinessSortGroup(readiness: RetrofitReadiness) {
  if (readiness.estimateComplete) return 0;
  if (readiness.billsComplete && readiness.questionsComplete) return 1;
  if (readiness.billsComplete) return 2;
  return 3;
}

export function sanitizeBillUploadState(parsed: unknown): BillUploadState {
  const fallback = getDefaultBillUploadState();
  if (!parsed || typeof parsed !== "object") return fallback;

  const candidate = parsed as Partial<BillUploadState> & {
    flowComplete?: unknown;
    files?: Partial<Record<BillUploadStepId, BillUploadFileRecord>>;
    statuses?: Partial<Record<BillUploadStepId, BillUploadStatus>>;
  };
  const statuses = {
    electric: candidate.statuses?.electric === "uploaded" || candidate.statuses?.electric === "skipped" ? candidate.statuses.electric : "pending",
    water: candidate.statuses?.water === "uploaded" || candidate.statuses?.water === "skipped" ? candidate.statuses.water : "pending",
    gas: candidate.statuses?.gas === "uploaded" || candidate.statuses?.gas === "skipped" ? candidate.statuses.gas : "pending",
    waste: candidate.statuses?.waste === "uploaded" || candidate.statuses?.waste === "skipped" ? candidate.statuses.waste : "pending"
  } as Record<BillUploadStepId, BillUploadStatus>;

  const files: BillUploadState["files"] = {};
  for (const step of BILL_UPLOAD_STEPS) {
    const record = candidate.files?.[step.id];
    if (record && typeof record.name === "string" && typeof record.size === "number" && typeof record.type === "string") {
      files[step.id] = {
        name: record.name,
        size: record.size,
        type: record.type,
        uploadedAt: typeof record.uploadedAt === "string" ? record.uploadedAt : new Date().toISOString()
      };
    }
  }

  return {
    flowComplete: candidate.flowComplete === true,
    files,
    statuses
  };
}

export function loadBillUploadState(storageKey: string) {
  const rawValue = safeStorageGet("local", storageKey);
  if (!rawValue) return getDefaultBillUploadState();
  try {
    return sanitizeBillUploadState(JSON.parse(rawValue));
  } catch {
    return getDefaultBillUploadState();
  }
}

export function storeBillUploadState(storageKey: string, state: BillUploadState) {
  safeStorageSet("local", storageKey, JSON.stringify(state));
}

export function isSupportedBillUploadFile(file: File) {
  const normalizedName = file.name.toLowerCase();
  const extension = normalizedName.slice(normalizedName.lastIndexOf("."));
  const acceptedExtensions = new Set([".pdf", ".png", ".jpg", ".jpeg"]);
  const acceptedTypes = new Set(["application/pdf", "image/png", "image/jpeg"]);
  return acceptedExtensions.has(extension) || acceptedTypes.has(file.type);
}

export function getBillUploadResumeIndex(state: BillUploadState) {
  const firstIncomplete = BILL_UPLOAD_STEPS.findIndex((step) => state.statuses[step.id] !== "uploaded");
  return firstIncomplete >= 0 ? firstIncomplete : BILL_UPLOAD_STEPS.length - 1;
}

export function getBillUploadStepSummary(state: BillUploadState) {
  return BILL_UPLOAD_STEPS.filter((step) => state.statuses[step.id] === "uploaded");
}

function getFirstIncompleteBillUploadStepId(state: BillUploadState) {
  return BILL_UPLOAD_STEPS.find((step) => state.statuses[step.id] !== "uploaded")?.id || null;
}

export const CUSTOMER_RETROFIT_UI_NAMES: Record<string, string> = {
  led_lighting_retrofit: "LED lighting",
  lighting_controls_retrofit: "Lighting controls",
  exterior_site_lighting_retrofit: "Exterior lighting",

  high_efficiency_hvac_replacement: "High-efficiency HVAC",
  heat_pump_hvac_retrofit: "Heat pump HVAC",
  smart_thermostat_zoning_retrofit: "Smart thermostat & zoning",
  hvac_controls_retrofit: "HVAC controls",
  energy_recovery_ventilation_retrofit: "Energy recovery ventilation",
  high_efficiency_furnace_retrofit: "High-efficiency furnace",
  high_efficiency_boiler_retrofit: "High-efficiency boiler",
  boiler_controls_burner_retrofit: "Boiler controls & burner",
  duct_sealing_and_insulation: "Duct sealing & insulation",
  ground_source_geothermal_heat_pump: "Geothermal heat pump",

  heat_pump_water_heater: "Heat pump water heater",
  high_efficiency_gas_water_heater: "High-efficiency gas water heater",
  solar_water_heating_system: "Solar water heating",
  water_heating_controls_recirculation: "Water-heating controls",

  high_efficiency_refrigeration_equipment: "High-efficiency refrigeration",
  walk_in_cooler_freezer_upgrade: "Walk-in cooler/freezer",
  refrigeration_controls_retrofit: "Refrigeration controls",
  refrigeration_ec_motor_retrofit: "Refrigeration EC motors",
  anti_sweat_heater_controls: "Anti-sweat controls",
  door_gasket_strip_curtain_night_cover: "Door gaskets & night covers",
  efficient_ice_machine: "Efficient ice machine",

  insulation_upgrade: "Insulation",
  air_sealing_weatherization: "Air sealing & weatherization",
  window_replacement: "Windows",
  exterior_door_replacement: "Exterior doors",
  cool_roof_reflective_roof: "Cool roof",
  window_film_shading_retrofit: "Window film & shading",

  building_automation_system: "Building automation",
  energy_management_system: "Energy management",
  submetering_energy_monitoring: "Submetering & energy monitoring",
  automated_demand_response_controls: "Automated demand response",

  rooftop_solar_pv: "Rooftop solar",
  ground_mounted_solar_pv: "Ground-mounted solar",
  solar_carport: "Solar carport",
  community_solar_subscription: "Community solar",
  small_wind_turbine: "Small wind",
  fuel_cell_system: "Fuel cell",
  combined_heat_and_power_system: "Combined heat and power",
  biomass_biogas_energy_system: "Biomass & biogas",

  battery_storage_system: "Battery storage",
  solar_plus_storage_system: "Solar + storage",
  thermal_energy_storage: "Thermal storage",
  microgrid_system: "Microgrid",
  resilience_backup_power_system: "Backup power",

  ev_charger_installation: "EV chargers",
  level_2_ev_charger_installation: "Level 2 EV chargers",
  dc_fast_charger_installation: "DC fast chargers",
  fleet_charging_infrastructure: "Fleet charging",
  ev_make_ready_electrical_upgrade: "EV make-ready electrical",
  electric_vehicle_purchase: "Electric vehicles",
  electric_forklift_material_handling: "Electric forklifts & material handling",
  fleet_telematics_charging_management: "Fleet telematics & charging management",

  low_flow_fixture_retrofit: "Low-flow fixtures",
  high_efficiency_toilet_urinal: "High-efficiency toilets & urinals",
  smart_irrigation_controller: "Smart irrigation",
  efficient_irrigation_retrofit: "Drip irrigation",
  leak_detection_system: "Leak detection",
  high_efficiency_laundry_equipment: "High-efficiency laundry",
  cooling_tower_controls_optimization: "Cooling tower controls",

  high_efficiency_commercial_dishwasher: "High-efficiency dishwasher",
  high_efficiency_fryer: "High-efficiency fryer",
  high_efficiency_oven: "High-efficiency oven",
  high_efficiency_steamer: "High-efficiency steamer",
  induction_cooking_equipment: "Induction cooking",
  demand_controlled_kitchen_ventilation: "Demand-controlled kitchen ventilation",

  high_efficiency_motor_replacement: "High-efficiency motors",
  variable_frequency_drive_retrofit: "Variable frequency drives",
  efficient_pump_replacement: "Efficient pumps",
  efficient_fan_blower_replacement: "Efficient fans & blowers",
  pump_fan_controls_retrofit: "Pump/fan controls",

  efficient_air_compressor: "Efficient air compressor",
  compressed_air_leak_repair: "Compressed air leak repair",
  compressed_air_controls: "Compressed air controls",
  waste_heat_recovery: "Waste heat recovery",
  industrial_heat_pump: "Industrial heat pump",
  process_electrification_equipment: "Process electrification",
  steam_trap_replacement: "Steam traps",

  efficient_ventilation_system: "Efficient ventilation",
  air_filtration_system: "Air filtration",
  demand_controlled_ventilation: "Demand-controlled ventilation",

  energy_audit: "Energy audit",
  water_audit: "Water audit",
  retro_commissioning_study: "Retro-commissioning",
  engineering_feasibility_study: "Feasibility study",
  solar_feasibility_study: "Solar feasibility",
  ev_charging_site_assessment: "EV charging site assessment",

  energy_star_certification: "ENERGY STAR certification",
  leed_certification: "LEED certification",
  building_benchmarking_compliance: "Benchmarking compliance"
};

export function customerRetrofitUiName(retrofit: Pick<SampleRetrofitGroup, "retrofitTypeId" | "displayName">) {
  return CUSTOMER_RETROFIT_UI_NAMES[retrofit.retrofitTypeId] || shortenRetrofitUiName(retrofit.displayName);
}

function shortenRetrofitUiName(displayName: string) {
  return displayName
    .replace(/\s+(retrofit|upgrade|replacement|installation|system)$/i, "")
    .replace(/\s+equipment$/i, "")
    .replace(/\s+study$/i, " study")
    .trim();
}

export function buildUserRetrofitPreviewResult(
  payload: PortalRetrofitRecommendationsResponse | null
): UserRetrofitPreviewResult {
  const estimateBasis = estimateBasisFromPayload(payload);
  const retrofits = (payload?.retrofits || []).map((retrofit, index) =>
    buildRetrofitPreviewCard(retrofit, index, estimateBasis, payload)
  );
  const missingInputs = estimateMissingInputs(payload, retrofits[0]);

  return {
    profileId: payload?.user?.userId,
    intakeId: payload?.intake?.submissionId,
    customerName: payload?.user?.fullName ?? payload?.intake?.contact?.fullName ?? undefined,
    estimateBasis,
    estimateCompletenessPercent: estimateCompletenessFromPayload(payload, retrofits, missingInputs),
    missingInputs,
    topRecommendation: retrofits[0]
      ? {
          retrofitId: retrofits[0].id,
          retrofitName: retrofits[0].name,
          reason: retrofits[0].whyRecommended[0] || "Best fit from current information.",
          nextStep: retrofits[0].recommendedNextStep || "Review this retrofit and confirm project scope."
        }
      : undefined,
    retrofits,
    nextActions: buildNextBestActions(retrofits, missingInputs),
    taxRuntimePreview: payload?.taxRuntimePreview || null,
    generatedAt: payload?.generatedAt,
    dataSourceLabel: payload
      ? "Live/API backend recommendation data"
      : "Live/API backend recommendation data pending"
  };
}

function buildRetrofitPreviewCard(
  retrofit: SampleRetrofitGroup,
  index: number,
  estimateBasis: EstimateBasisValue,
  payload: PortalRetrofitRecommendationsResponse | null
): RetrofitPreviewCard {
  const preview = retrofit.savingsPreview || null;
  const isCalculated = preview?.status === "calculated";
  const annualRecurringSavings =
    isCalculated ? preview.netAnnualRecurringSavingsCents ?? preview.annualSavingsCents ?? null : null;
  const monthlyRecurringSavings =
    isCalculated ? preview.netMonthlyRecurringSavingsCents ?? preview.monthlySavingsCents ?? null : null;
  const estimatedUpfrontCost = isCalculated ? preview.upfrontCostCents ?? null : null;
  const upfrontFinancialIncentive = isCalculated ? preview.upfrontSavingsCents ?? null : null;
  const taxBenefitAmount = estimateTaxBenefits(retrofit, preview);
  const netCostBeforeTaxBenefits =
    estimatedUpfrontCost != null && upfrontFinancialIncentive != null
      ? Math.max(0, estimatedUpfrontCost - upfrontFinancialIncentive)
      : null;
  const effectiveCostAfterOneTimeBenefits =
    netCostBeforeTaxBenefits != null && typeof taxBenefitAmount === "number"
      ? Math.max(0, netCostBeforeTaxBenefits - taxBenefitAmount)
      : null;
  const paybackPeriodYears =
    effectiveCostAfterOneTimeBenefits != null && annualRecurringSavings != null && annualRecurringSavings > 0
      ? effectiveCostAfterOneTimeBenefits / annualRecurringSavings
      : null;
  const roi =
    effectiveCostAfterOneTimeBenefits != null && effectiveCostAfterOneTimeBenefits > 0 && annualRecurringSavings != null
      ? `${Math.round((annualRecurringSavings / effectiveCostAfterOneTimeBenefits) * 100)}%`
      : null;
  const missingInfo = missingInfoForRetrofit(retrofit, preview, payload);
  const confidencePercent = retrofitConfidencePercent(retrofit);
  const confidenceLabel = confidenceLabelFromRetrofit(retrofit, confidencePercent, missingInfo, payload);
  const scenarioMetrics = {
    estimatedUpfrontProjectCost: estimatedUpfrontCost,
    upfrontFinancialIncentive,
    recurringOperationalSavingsAnnual: annualRecurringSavings,
    recurringOperationalSavingsMonthly: monthlyRecurringSavings,
    paybackPeriodYears,
    roi
  };

  return {
    id: retrofit.retrofitTypeId,
    rank: index + 1,
    name: customerRetrofitUiName(retrofit),
    category: customerRetrofitCategoryLabel(retrofit),
    description: customerRetrofitDescription(retrofit),
    whyRecommended: whyRetrofitRecommended(retrofit),
    confidenceLabel,
    confidencePercent,
    estimateBasis,
    missingInfo,
    recommendedNextStep: customerRetrofitNextStep(retrofit),
    tabSummary: buildRetrofitTabSummary(retrofit, {
      annualRecurringSavings,
      paybackPeriodYears,
      effectiveCostAfterOneTimeBenefits,
      selectedOpportunityCount: retrofit.opportunities.filter((opportunity) => includedOpportunityIdsForRetrofit(retrofit).has(opportunity.opportunityId)).length,
      missingInfoCount: missingInfo.length
    }),
    metrics: {
      estimatedUpfrontProjectCost: estimatedUpfrontCost,
      upfrontFinancialIncentive,
      recurringOperationalSavingsAnnual: annualRecurringSavings,
      recurringOperationalSavingsMonthly: monthlyRecurringSavings,
      paybackPeriodYears,
      taxBenefits: taxBenefitAmount == null ? "Needs tax review" : taxBenefitAmount,
      roi,
      netCostBeforeTaxBenefits,
      effectiveCostAfterOneTimeBenefits
    },
    editableAssumptions: buildEditableAssumptions(retrofit),
    scenarios: buildRetrofitScenarios(retrofit, scenarioMetrics, missingInfo),
    opportunities: retrofit.opportunities.map((opportunity) => buildOpportunityPreview(opportunity, preview, payload)),
    operatingSavings: buildOperatingSavingsPreview(retrofit, payload),
    environmentalImpact: buildRetrofitEnvironmentalImpactPreview(retrofit, missingInfo, preview),
    detailQuestions: [
      ...baseDetailQuestionsForRetrofit(retrofit),
      ...taxRuntimeQuestionsForRetrofit(payload?.taxRuntimePreview || null, retrofit.retrofitTypeId)
    ]
  };
}

export function buildRetrofitEnvironmentalImpactPreview(
  retrofit: Pick<SampleRetrofitGroup, "retrofitTypeId" | "parentCategory" | "isPhysicalRetrofit">,
  missingInfo: string[] = [],
  preview: SampleSavingsPreview | null = null
): RetrofitEnvironmentalImpact {
  const id = retrofit.retrofitTypeId.toLowerCase();
  const parent = retrofit.parentCategory.toLowerCase();
  const isCertification = parent.includes("certification") || id.includes("certification") || id.includes("compliance") || id.includes("benchmarking");
  const isPlanning = !retrofit.isPhysicalRetrofit && !isCertification;
  const modeledImpact = buildModeledEnvironmentalImpactFromSavings(retrofit, preview);
  const resources = modeledImpact?.resources || environmentalResourceFallbackRows(retrofit);
  const missingInputs = environmentalMissingInputsForRetrofit(retrofit, missingInfo);
  const overallLabel = isCertification
    ? "Certification progress supported"
    : isPlanning
      ? "Potential emissions reduction identified"
      : "Estimated annual emissions avoided";
  const impactType: RetrofitEnvironmentalImpact["overall"]["impactType"] = isCertification
    ? "certification_progress"
    : isPlanning
      ? "potential_identified"
      : modeledImpact
        ? "avoided_emissions"
      : "not_estimated";
  const subtext = isCertification
    ? "Certification impact is not quantified until certification requirements are reviewed."
    : isPlanning
      ? "Planning items can identify impact potential, but avoided emissions depend on follow-on retrofit work."
      : modeledImpact
        ? "Estimated from stored savings-model utility deltas for this test case."
      : "Estimated climate impact from completing this retrofit.";

  return {
    overall: {
      label: overallLabel,
      displayValue: modeledImpact?.overallDisplayValue || "?",
      unit: "tCO2e/year",
      fallback: modeledImpact ? undefined : isCertification ? "Not evaluated yet" : isPlanning ? "Needs audit scope" : "Needs bills and retrofit-specific details",
      impactType,
      confidence: modeledImpact ? "Medium" : "Needs data",
      subtext,
      basis: modeledImpact?.basis || ["Needs bills and retrofit-specific details"]
    },
    resources,
    certificationContribution: certificationContributionForRetrofit(retrofit),
    missingInfo: modeledImpact ? missingInputs.filter((item) => item !== "Upload bills").slice(0, 6) : missingInputs
  };
}

const GENERIC_ELECTRIC_TCO2E_PER_KWH = 0.00039;

function buildModeledEnvironmentalImpactFromSavings(
  retrofit: Pick<SampleRetrofitGroup, "retrofitTypeId" | "parentCategory" | "isPhysicalRetrofit">,
  preview: SampleSavingsPreview | null
) {
  if (preview?.status !== "calculated" || !preview.billLineDeltas?.length) return null;
  const id = retrofit.retrofitTypeId.toLowerCase();
  const fallbackRows = environmentalResourceFallbackRows(retrofit);
  const electricKwhAvoided = sumBillLineDeltaAbs(preview.billLineDeltas, "annual_kwh_delta", { onlyNegative: true });
  const exportedKwh = sumBillLineDeltaAbs(preview.billLineDeltas, "export_kwh");
  const modeledKwh = id.includes("solar") || id.includes("renewable")
    ? electricKwhAvoided + exportedKwh
    : electricKwhAvoided;

  if (!modeledKwh || modeledKwh <= 0) return null;

  const estimatedTco2e = modeledKwh * GENERIC_ELECTRIC_TCO2E_PER_KWH;
  const resources = fallbackRows.map((resource) => {
    const label = resource.label.toLowerCase();
    if (label.includes("electricity") || label.includes("renewable") || resource.unit.toLowerCase().includes("kwh")) {
      return {
        ...resource,
        displayValue: formatImpactQuantity(modeledKwh),
        confidence: "Medium" as const,
        basis: "From stored annual kWh delta in the savings preview."
      };
    }
    if (label.includes("emissions") || resource.unit.toLowerCase().includes("tco2")) {
      return {
        ...resource,
        displayValue: formatImpactQuantity(estimatedTco2e, 1),
        confidence: "Medium" as const,
        basis: "Estimated from stored annual kWh delta using a generic electric-grid emissions factor."
      };
    }
    return resource;
  });

  return {
    overallDisplayValue: formatImpactQuantity(estimatedTco2e, 1),
    resources,
    basis: [
      "Stored savingsPreview.billLineDeltas supplied the annual kWh delta.",
      "CO2e is estimated with a generic electric-grid emissions factor until geography-specific factors are available."
    ]
  };
}

function sumBillLineDeltaAbs(
  billLineDeltas: NonNullable<SampleSavingsPreview["billLineDeltas"]>,
  canonicalField: string,
  options: { onlyNegative?: boolean } = {}
) {
  return billLineDeltas
    .filter((delta) => delta.canonicalField === canonicalField)
    .filter((delta) => !options.onlyNegative || Number(delta.deltaValue) < 0)
    .reduce((sum, delta) => sum + Math.abs(Number(delta.deltaValue) || 0), 0);
}

function formatImpactQuantity(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits > 0 && value < 10 ? 1 : 0
  }).format(value);
}

function stripAnnualUnitSuffix(unit: string) {
  return unit.replace(/\s*\/\s*(year|yr)\b/gi, "").trim();
}

function formatAnnualImpactUnitLabel(unit: string, action = "avoided") {
  const baseUnit = stripAnnualUnitSuffix(unit);
  return baseUnit ? `${baseUnit} ${action}/year` : `${action}/year`;
}

function expandedImpactUnitLabel(unit: string) {
  const normalized = stripAnnualUnitSuffix(unit).replace(/\s+/g, "").toLowerCase();
  if (normalized === "tco2e") return "metric tons of carbon dioxide equivalent";
  if (normalized === "kwh") return "kilowatt-hours";
  if (normalized === "therms") return "therms";
  if (normalized === "gallons") return "gallons";
  if (normalized === "mmbtu") return "MMBtu";
  if (normalized === "gge") return "gasoline gallon equivalents";
  return stripAnnualUnitSuffix(unit) || unit;
}

function impactPlainLanguageSentence(impact: RetrofitEnvironmentalImpact["overall"]) {
  if (impact.displayValue === "?") return impact.subtext;
  const action = impact.impactType === "potential_identified" ? "identified" : "avoided";
  const cadence = /\/\s*(year|yr)\b/i.test(impact.unit) ? " every year" : "";
  return `${impact.displayValue} ${expandedImpactUnitLabel(impact.unit)} ${action}${cadence}.`;
}

function maskEnvironmentalImpactForNoBillData(impact: RetrofitEnvironmentalImpact): RetrofitEnvironmentalImpact {
  return {
    ...impact,
    overall: {
      ...impact.overall,
      displayValue: "?",
      fallback: "Needs bills",
      confidence: "Needs data",
      subtext: "Upload bills to unlock bill-dependent environmental impact estimates.",
      basis: ["Needs bills", "Needs retrofit-specific details"]
    },
    resources: impact.resources.map((resource) => ({
      ...resource,
      displayValue: resource.displayValue === "Not evaluated yet" ? "Not evaluated yet" : "Needs bills",
      confidence: "Needs data",
      basis: resource.basis || "Needs bills"
    })),
    missingInfo: [...new Set(["Upload bills", "Answer retrofit-specific questions", ...impact.missingInfo])].slice(0, 6)
  };
}

function environmentalResourceFallbackRows(
  retrofit: Pick<SampleRetrofitGroup, "retrofitTypeId" | "parentCategory" | "isPhysicalRetrofit">
): RetrofitEnvironmentalImpact["resources"] {
  const id = retrofit.retrofitTypeId.toLowerCase();
  const parent = retrofit.parentCategory.toLowerCase();
  const row = (label: string, unit: string, fallback: string, basis = fallback) => ({
    label,
    displayValue: fallback,
    unit,
    fallback,
    confidence: "Needs data" as const,
    basis
  });

  if (parent.includes("certification") || id.includes("certification") || id.includes("compliance") || id.includes("benchmarking")) {
    return [row("Certification contribution", "status", "Not evaluated yet", "Needs certification review")];
  }
  if (!retrofit.isPhysicalRetrofit || parent.includes("audits") || id.includes("audit") || id.includes("study") || id.includes("assessment")) {
    return [row("Reduction potential identified", "tCO2e/year", "Needs audit scope", "Needs audit scope")];
  }
  if (id.includes("ev") || id.includes("charger") || id.includes("vehicle") || parent.includes("transportation")) {
    return [
      row("Fuel displaced", "GGE/year", "Needs utilization estimate"),
      row("Net emissions avoided", "tCO2e/year", "Needs fuel baseline")
    ];
  }
  if (id.includes("solar") || id.includes("wind") || id.includes("renewable") || parent.includes("solar_renewable")) {
    return [
      row("Renewable electricity generated", "kWh/year", "Needs system size"),
      row("Emissions avoided", "tCO2e/year", "Needs system size and usage baseline")
    ];
  }
  if (id.includes("storage") || id.includes("microgrid") || id.includes("backup") || parent.includes("storage")) {
    return [
      row("Peak demand reduction", "kW", "Needs load profile"),
      row("Emissions impact", "tCO2e/year", "Needs dispatch model")
    ];
  }
  if (id.includes("water") || id.includes("irrigation") || id.includes("toilet") || id.includes("urinal") || id.includes("leak") || parent.includes("water")) {
    return [
      row("Potable water avoided", "gallons/year", "Needs water bill"),
      row("Emissions avoided", "tCO2e/year", "Needs water bill")
    ];
  }
  if (id.includes("heat_pump") || id.includes("electrification")) {
    return [
      row("Net emissions avoided", "tCO2e/year", "Needs gas/electric baseline"),
      row("Thermal load reduction", "MMBtu/year", "Needs retrofit details")
    ];
  }
  if (parent.includes("refrigeration") || id.includes("refrigeration") || id.includes("cooler") || id.includes("freezer")) {
    return [
      row("Electricity avoided", "kWh/year", "Needs bills"),
      row("Refrigerant leakage avoided", "tCO2e/year", "Needs equipment details")
    ];
  }
  if (parent.includes("lighting") || id.includes("lighting") || id.includes("led")) {
    return [
      row("Electricity avoided", "kWh/year", "Needs bills"),
      row("Emissions avoided", "tCO2e/year", "Needs bills")
    ];
  }
  if (parent.includes("building_envelope") || id.includes("insulation") || id.includes("weatherization") || id.includes("window") || id.includes("roof")) {
    return [
      row("Thermal load reduction", "MMBtu/year", "Needs bills and retrofit details"),
      row("Emissions avoided", "tCO2e/year", "Needs bills")
    ];
  }
  if (parent.includes("hvac") || id.includes("hvac") || id.includes("boiler") || id.includes("furnace")) {
    return [
      row("Site energy avoided", "kWh or therms/year", "Needs bills and system details"),
      row("Emissions avoided", "tCO2e/year", "Needs bills")
    ];
  }
  if (id.includes("waste_heat")) {
    return [
      row("Thermal load reduction", "MMBtu/year", "Needs process baseline"),
      row("Emissions avoided", "tCO2e/year", "Needs bills")
    ];
  }
  return [
    row("Electricity avoided", "kWh/year", "Needs bills"),
    row("Emissions avoided", "tCO2e/year", "Needs retrofit details")
  ];
}

function environmentalMissingInputsForRetrofit(
  retrofit: Pick<SampleRetrofitGroup, "retrofitTypeId" | "parentCategory" | "isPhysicalRetrofit">,
  missingInfo: string[]
) {
  const id = retrofit.retrofitTypeId.toLowerCase();
  const parent = retrofit.parentCategory.toLowerCase();
  const missing = new Set<string>();
  for (const item of missingInfo) {
    const normalized = item.toLowerCase();
    if (normalized.includes("bill")) missing.add("Upload bills");
    if (normalized.includes("utility")) missing.add("Confirm utility");
    if (normalized.includes("quote") || normalized.includes("size") || normalized.includes("area") || normalized.includes("r-value")) {
      missing.add("Answer retrofit-specific questions");
    }
  }

  if (parent.includes("certification") || id.includes("certification") || id.includes("compliance")) {
    missing.add("Review certification requirements");
  } else if (!retrofit.isPhysicalRetrofit || id.includes("audit") || id.includes("study") || id.includes("assessment")) {
    missing.add("Confirm audit scope");
  } else {
    missing.add("Upload bills");
    missing.add("Answer retrofit-specific questions");
  }
  if (id.includes("solar")) missing.add("Add system size");
  if (id.includes("ev") || id.includes("charger")) {
    missing.add("Add utilization estimate");
    missing.add("Add fuel baseline");
  }
  if (id.includes("water") || parent.includes("water")) missing.add("Add water bill");

  return [...missing].slice(0, 6);
}

function certificationContributionForRetrofit(
  retrofit: Pick<SampleRetrofitGroup, "retrofitTypeId" | "parentCategory" | "isPhysicalRetrofit">
): RetrofitEnvironmentalImpact["certificationContribution"] {
  const id = retrofit.retrofitTypeId.toLowerCase();
  const isCertification = retrofit.parentCategory.toLowerCase().includes("certification") || id.includes("certification") || id.includes("benchmarking");
  const energyDetail = isCertification
    ? "Certification pathway support can be reviewed after requirements are confirmed."
    : "May support Energy & Atmosphere or equivalent efficiency criteria after impact is estimated.";
  return [
    {
      program: "LEED",
      status: isCertification ? "Needs review" : "May support",
      detail: energyDetail
    },
    {
      program: "ENERGY STAR",
      status: "Needs review",
      detail: "May improve ENERGY STAR score after utility data is uploaded."
    },
    {
      program: "Green Business certification",
      status: retrofit.isPhysicalRetrofit ? "May support" : "Needs review",
      detail: retrofit.isPhysicalRetrofit ? "May support energy-efficiency or resource-conservation requirements." : "Certification contribution needs program review."
    }
  ];
}

function buildOpportunityPreview(
  opportunity: SampleMatchResult,
  preview: SampleSavingsPreview | null,
  payload: PortalRetrofitRecommendationsResponse | null
): RetrofitOpportunityPreview {
  const includedOpportunityIds = new Set(preview?.selectedIncentiveScenario?.opportunityIds || []);
  const isIncluded = includedOpportunityIds.has(opportunity.opportunityId);
  const incentivePackage = preview?.incentiveCalculationPackageSummaries?.find(
    (summary) => summary.opportunityId === opportunity.opportunityId
  );
  const programType = normalizeOpportunityType(opportunity.sourceSummary?.programType);
  const needsUtilityConfirmation = opportunityNeedsUtilityTerritoryConfirmation(opportunity, payload);
  const sourceMissing = !(opportunity.sourceUrl || opportunity.websiteUrl || opportunity.applicationUrl);
  const packageMissingInputs = incentivePackageMissingInputs(incentivePackage);
  const packageNeedsMoreInfo = incentivePackageNeedsMoreInfo(incentivePackage);
  const needsMoreInfo = opportunity.unresolvedRequirements.length > 0 || packageNeedsMoreInfo || needsUtilityConfirmation || sourceMissing;
  const eligibilityStatus = needsUtilityConfirmation || sourceMissing
    ? "needs review"
    : opportunityEligibilityStatus(opportunity.eligibilityStatus);
  const requiredInfo = [
    ...(needsUtilityConfirmation ? ["utility territory confirmation"] : []),
    ...packageMissingInputs,
    ...opportunity.unresolvedRequirements.slice(0, 4)
  ];
  const includedState = includedStateFromOpportunity(isIncluded, needsMoreInfo);
  const packageEstimatedValue = incentivePackageEstimatedValue(incentivePackage);
  return {
    id: sampleOpportunityKey(opportunity),
    retrofitId: preview?.retrofitTypeId || "",
    name: opportunity.opportunityName,
    description:
      opportunity.matchedReasons[0] ||
      [opportunity.sourceSummary?.administrator, capitalizeLabel(programType)].filter(Boolean).join(" program from ") ||
      "External program or benefit connected to this retrofit.",
    type: programType,
    timing: opportunityTiming(programType),
    eligibilityStatus,
    requiredInfo: [...new Set(requiredInfo)].slice(0, 5),
    applicationProcess: opportunityApplicationProcess(opportunity),
    applicationMethod: opportunityApplicationMethod(opportunity, programType),
    difficulty: opportunityDifficulty(opportunity, programType),
    length: opportunityLengthLabel(opportunity),
    helpAvailable: "Full application help available in next step",
    deadline: opportunityDeadlineLabel(opportunity),
    environmentalImpactContribution: environmentalImpactLabel(programType),
    certificationBoost: certificationBoostLabel(programType),
    sourceUrl: opportunity.sourceUrl || null,
    programWebsiteUrl: opportunity.websiteUrl || null,
    applicationUrl: opportunity.applicationUrl || null,
    pdfUrl: null,
    contactEmail: null,
    estimatedValue: includedState === "Included in current estimate" ? packageEstimatedValue ?? preview?.upfrontSavingsCents ?? null : null,
    valueRule: incentivePackageValueRule(incentivePackage),
    valueCap: incentivePackageValueCap(incentivePackage),
    eligibleCostBasis: incentivePackageEligibleCostBasis(incentivePackage),
    includedState,
    selected: isIncluded,
    whySelected: isIncluded
      ? includedState === "Included in current estimate"
        ? `Selected because it reduces upfront cost${packageEstimatedValue || preview?.upfrontSavingsCents ? ` by an estimated ${formatCents(packageEstimatedValue ?? preview?.upfrontSavingsCents ?? 0)}` : ""}.`
        : needsUtilityConfirmation
          ? "Needs utility territory confirmation before this can be included."
          : sourceMissing
            ? "Needs source review before this can be included."
            : packageNeedsMoreInfo
              ? `Not included yet — needs ${packageMissingInputs.slice(0, 2).join(" and ")}.`
            : `Not included yet — needs ${opportunity.unresolvedRequirements.slice(0, 2).join(" and ")}.`
      : undefined,
    whyNotSelected: !isIncluded
      ? needsUtilityConfirmation
        ? "Needs review because utility territory is unclear."
        : sourceMissing
          ? "Needs source review before selection."
        : packageNeedsMoreInfo
          ? `Not selected because ${packageMissingInputs.slice(0, 2).join(" and ")} is needed to estimate value.`
        : opportunity.unresolvedRequirements.length
          ? `Not selected because ${opportunity.unresolvedRequirements.slice(0, 2).join(" and ")} is missing.`
        : "Not selected for this scenario."
      : undefined
  };
}

function incentivePackageMissingInputs(summary?: IncentiveCalculationPackageSummary) {
  if (!incentivePackageNeedsMoreInfo(summary)) return [];
  if (!summary) return [];
  const fieldLabels = (summary?.formInputFields || [])
    .map((field) => field.collectionSurfaceLabel || field.label || field.inputKey)
    .filter(Boolean)
    .map((value) => value.replace(/_/g, " "));
  if (fieldLabels.length) return [...new Set(fieldLabels)].slice(0, 4);

  const labels = (summary.missingInputs || [])
    .map((input) => input.label || input.inputKey)
    .filter(Boolean)
    .map((value) => value.replace(/_/g, " "));
  if (labels.length) return labels.slice(0, 4);

  if (summary.runtimeInclusionStatus === "needs_quote") return ["project quote or invoice"];
  if (summary.runtimeInclusionStatus === "needs_project_scope") return ["retrofit scope"];
  return ["project quote"];
}

function incentivePackageNeedsMoreInfo(summary?: IncentiveCalculationPackageSummary) {
  return ["missing_inputs", "needs_quote", "needs_project_scope", "custom_quote_estimate"].includes(
    summary?.runtimeInclusionStatus || ""
  );
}

function incentivePackageEstimatedValue(summary?: IncentiveCalculationPackageSummary) {
  if (!summary?.includedInRuntimeTotals) return null;
  const totals = summary.totals || {};
  return (
    totals.expectedOneTimeSavingsCents ||
    totals.expectedGrantAmountCents ||
    totals.expectedRecurringSavingsAnnualCents ||
    null
  );
}

function incentivePackageValueRule(summary?: IncentiveCalculationPackageSummary) {
  if (!summary) return undefined;
  if (summary.includedInRuntimeTotals) return "Source-backed v2 incentive calculation included in estimate.";
  if (summary.runtimeInclusionStatus === "missing_inputs") return "Source-backed value exists, but project inputs are needed before estimating.";
  if (summary.runtimeInclusionStatus === "needs_quote") return "Source-backed value exists, but a project quote, invoice, or program document is needed before estimating.";
  if (summary.runtimeInclusionStatus === "needs_project_scope") return "Source-backed value exists, but retrofit scope or equipment details are needed before estimating.";
  if (summary.runtimeInclusionStatus === "needs_funding_check") return "Formula is source-backed, but current funding availability needs refresh before inclusion.";
  if (summary.runtimeInclusionStatus === "legacy_rule_preferred") return "Legacy-safe extracted rule is used for this opportunity while v2 data is retained for review.";
  if (summary.runtimeInclusionStatus === "custom_quote_estimate") return "Amount depends on a custom quote or program review.";
  if (summary.runtimeInclusionStatus === "not_user_facing_default") return "Not included in totals by default under conservative estimate rules.";
  return undefined;
}

function incentivePackageValueCap(summary?: IncentiveCalculationPackageSummary) {
  if (!summary) return "No cap stored";
  const totals = (summary?.totals || {}) as Record<string, unknown>;
  const cap = totals.maxBenefitCents || totals.maximumBenefitCents || totals.capCents;
  return typeof cap === "number" && Number.isFinite(cap) ? formatCents(cap) : "Needs source review";
}

function incentivePackageEligibleCostBasis(summary?: IncentiveCalculationPackageSummary) {
  if (!summary) return "Not stored for this opportunity";
  if (summary.runtimeInclusionStatus === "custom_quote_estimate") return "Project quote or contractor estimate";
  if (summary.runtimeInclusionStatus === "needs_quote") return "Project quote, invoice, or program document";
  if (summary.runtimeInclusionStatus === "needs_project_scope") return "Retrofit scope and equipment details";
  if (summary.includedInRuntimeTotals) return "Eligible project cost from current estimate";
  if (summary.runtimeInclusionStatus === "missing_inputs") return "Needs project scope, quantity, or quote";
  return "Needs source review";
}

function opportunityApplicationMethod(
  opportunity: SampleMatchResult,
  programType: string
): RetrofitOpportunityPreview["applicationMethod"] {
  const sourceText = [
    opportunity.applicationUrl,
    opportunity.websiteUrl,
    opportunity.sourceUrl,
    opportunity.sourceSummary?.programType,
    opportunity.sourceSummary?.sourceName,
    opportunity.sourceSummary?.administrator
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (programType.includes("tax")) return "tax/accountant filing";
  if (sourceText.includes(".pdf")) return "PDF";
  if (sourceText.includes("contractor")) return "contractor-submitted";
  if (sourceText.includes("utility") || sourceText.includes("rebate")) return "utility portal";
  if (sourceText.includes("mailto:") || sourceText.includes("email")) return "email";
  if (opportunity.applicationUrl) return "online portal";
  return "unknown";
}

function opportunityHasAnyUrl(opportunity: RetrofitOpportunityPreview | null | undefined) {
  return Boolean(opportunity?.sourceUrl || opportunity?.programWebsiteUrl || opportunity?.applicationUrl || opportunity?.pdfUrl);
}

function opportunityAffectsMetric(
  opportunity: RetrofitOpportunityPreview,
  selected: boolean,
  includedLabel: RetrofitOpportunityPreview["includedState"]
) {
  if (!selected) return "None right now";
  if (includedLabel === "Included in current estimate") {
    if (opportunity.type.includes("tax")) return "Tax benefits";
    if (opportunity.type.includes("financing")) return "Financing";
    if (opportunity.type.includes("certification")) return "Certification boost";
    return "Upfront financial incentive";
  }
  if (opportunity.type.includes("certification")) return "Certification boost, pending review";
  if (opportunity.type.includes("financing")) return "Financing, pending review";
  return "Possible financial value, pending inputs";
}

function applicationRequiredDocuments(opportunity: RetrofitOpportunityPreview) {
  const docs = new Set<string>();
  for (const item of opportunity.requiredInfo) {
    const normalized = item.toLowerCase();
    if (normalized.includes("bill") || normalized.includes("utility")) docs.add("Utility bill");
    if (normalized.includes("quote") || normalized.includes("cost")) docs.add("Contractor quote");
    if (normalized.includes("tax") || normalized.includes("entity")) docs.add("Tax/entity documentation");
    if (normalized.includes("territory")) docs.add("Utility territory confirmation");
    if (normalized.includes("permit")) docs.add("Permit or interconnection documentation");
  }
  if (docs.size === 0) return "Requirements not extracted yet";
  return [...docs].join(", ");
}

function includedOpportunityIdsForRetrofit(retrofit: SampleRetrofitGroup) {
  return new Set(retrofit.savingsPreview?.selectedIncentiveScenario?.opportunityIds || []);
}

function buildEditableAssumptions(retrofit: SampleRetrofitGroup): EditableEstimateAssumption[] {
  const preview = retrofit.savingsPreview || null;
  const traceAssumptions = preview?.calculationTrace?.assumptions || [];
  const fromTrace = traceAssumptions
    .filter((assumption) => assumption.label)
    .slice(0, 5)
    .map((assumption, index) => ({
      id: `${retrofit.retrofitTypeId}:trace:${index}`,
      label: String(assumption.label),
      value: assumption.value == null ? "Not estimated yet" : String(assumption.value),
      unit: assumptionUnit(String(assumption.label)),
      source: "industry_standard" as const,
      sourceLabel: "Based on uploaded bills and industry assumptions",
      confidenceLabel: "Medium" as const,
      affects: assumptionAffects(String(assumption.label)),
      confirmed: false
    }));

  if (fromTrace.length > 0) return fromTrace;

  const labels = assumptionsForRetrofit(retrofit.retrofitTypeId);
  return labels.map((label, index) => ({
    id: `${retrofit.retrofitTypeId}:estimate:${index}`,
    label,
    value: "Not estimated yet",
    unit: assumptionUnit(label),
    source: "industry_standard",
    sourceLabel: "Industry estimate",
    confidenceLabel: "Low",
    affects: assumptionAffects(label),
    confirmed: false
  }));
}

function buildOperatingSavingsPreview(
  retrofit: SampleRetrofitGroup,
  payload: PortalRetrofitRecommendationsResponse | null
): OperatingSavingsPreview[] {
  const preview = retrofit.savingsPreview || null;
  const savingsEntries = preview?.status === "calculated" ? preview.savingsBreakdown || [] : [];
  const isEvCharging = retrofit.retrofitTypeId.includes("ev") || retrofit.retrofitTypeId.includes("charger");
  const hasNegativeSavings =
    (preview?.netAnnualRecurringSavingsCents ?? preview?.annualSavingsCents ?? 0) < 0 ||
    savingsEntries.some((entry) => entry.amountCents < 0);
  if (isEvCharging && hasNegativeSavings) {
    return [
      {
        id: `${retrofit.retrofitTypeId}:operating-cost:added-electricity`,
        retrofitId: retrofit.retrofitTypeId,
        name: "Added electricity cost",
        annualSavings: preview?.netAnnualRecurringSavingsCents ?? preview?.annualSavingsCents ?? null,
        monthlySavings: preview?.netMonthlyRecurringSavingsCents ?? preview?.monthlySavingsCents ?? null,
        includedIn: "Recurring Operational Savings",
        eligibilityStatus: "unknown",
        requiredInfo: ["electric bill", "charger count", "expected utilization"],
        confidenceLabel: "Needs review",
        assumptions: ["Added electricity cost is not treated as operating savings."],
        customerFacingBasis: "Needs utilization estimate"
      },
      {
        id: `${retrofit.retrofitTypeId}:operating-savings:fuel-displacement`,
        retrofitId: retrofit.retrofitTypeId,
        name: "Fuel displacement",
        annualSavings: null,
        monthlySavings: null,
        includedIn: "Recurring Operational Savings",
        eligibilityStatus: "unknown",
        requiredInfo: ["fuel baseline", "fleet or transportation usage"],
        confidenceLabel: "Needs review",
        assumptions: ["Fuel savings require a transportation or fuel baseline."],
        customerFacingBasis: "Needs fuel baseline"
      },
      {
        id: `${retrofit.retrofitTypeId}:operating-savings:charging-revenue`,
        retrofitId: retrofit.retrofitTypeId,
        name: "Charging revenue",
        annualSavings: null,
        monthlySavings: null,
        includedIn: "Recurring Operational Savings",
        eligibilityStatus: "unknown",
        requiredInfo: ["expected utilization", "charging price"],
        confidenceLabel: "Needs review",
        assumptions: ["Revenue impact requires utilization and pricing inputs."],
        customerFacingBasis: "Needs utilization/pricing"
      },
      {
        id: `${retrofit.retrofitTypeId}:operating-savings:net-impact`,
        retrofitId: retrofit.retrofitTypeId,
        name: "Net recurring operational impact",
        annualSavings: null,
        monthlySavings: null,
        includedIn: "Recurring Operational Savings",
        eligibilityStatus: "unknown",
        requiredInfo: ["fuel baseline", "expected utilization", "electric bill"],
        confidenceLabel: "Needs review",
        assumptions: ["Net impact is not estimated until cost, fuel displacement, and utilization inputs are confirmed."],
        customerFacingBasis: "Not estimated yet"
      }
    ];
  }
  if (savingsEntries.length === 0) {
    return [
      {
        id: `${retrofit.retrofitTypeId}:operating-savings:pending`,
        retrofitId: retrofit.retrofitTypeId,
        name: operatingSavingsNameForRetrofit(retrofit.retrofitTypeId),
        annualSavings: null,
        monthlySavings: null,
        includedIn: "Recurring Operational Savings",
        eligibilityStatus: "unknown",
        requiredInfo: ["electric bill", "fixture details", "operating hours"],
        confidenceLabel: confidenceLabelFromRetrofit(retrofit, retrofitConfidencePercent(retrofit), missingInfoForRetrofit(retrofit, preview, payload), payload),
        assumptions: ["Operating savings not estimated yet. Upload a utility bill or answer retrofit-specific questions."],
        customerFacingBasis: "Needs bill"
      }
    ];
  }

  return savingsEntries.slice(0, 4).map((entry, index) => {
    const monthly = recurringEntryMonthlyAmount(entry);
    return {
      id: entry.id || `${retrofit.retrofitTypeId}:operating-savings:${index}`,
      retrofitId: retrofit.retrofitTypeId,
      name: entry.label || formatSavingsCategory(entry.category),
      annualSavings: entry.period === "annual" ? entry.amountCents : monthly * 12,
      monthlySavings: monthly,
      includedIn: "Recurring Operational Savings",
      eligibilityStatus: "likely",
      requiredInfo: ["uploaded bills", "confirmed retrofit details"],
      confidencePercent: retrofitConfidencePercent(retrofit),
      confidenceLabel: confidenceLabelFromRetrofit(retrofit, retrofitConfidencePercent(retrofit), missingInfoForRetrofit(retrofit, preview, payload), payload),
      assumptions: ["Based on uploaded bills and industry assumptions."],
      customerFacingBasis: "Based on uploaded bills and industry assumptions"
    };
  });
}

function buildRetrofitScenarios(
  retrofit: SampleRetrofitGroup,
  metrics: {
    estimatedUpfrontProjectCost?: number | null;
    upfrontFinancialIncentive?: number | null;
    recurringOperationalSavingsAnnual?: number | null;
    recurringOperationalSavingsMonthly?: number | null;
    paybackPeriodYears?: number | null;
    roi?: string | number | null;
  },
  missingInfo: string[]
): RetrofitScenarioPreview[] {
  const opportunities = retrofit.opportunities.map((opportunity) => ({
    id: sampleOpportunityKey(opportunity),
    type: normalizeOpportunityType(opportunity.sourceSummary?.programType),
    certificationBoost: certificationBoostLabel(normalizeOpportunityType(opportunity.sourceSummary?.programType))
  }));
  const selectedNow = opportunities.filter((opportunity) => {
    const includedOpportunityIds = new Set(retrofit.savingsPreview?.selectedIncentiveScenario?.opportunityIds || []);
    return includedOpportunityIds.has(opportunity.id.split(":")[0]);
  }).map((opportunity) => opportunity.id);
  const allIds = opportunities.map((opportunity) => opportunity.id);
  const incentiveIds = opportunities.filter((opportunity) => opportunity.type !== "tax incentive").map((opportunity) => opportunity.id);
  const certificationIds = opportunities
    .filter((opportunity) => opportunity.certificationBoost.includes("Supports"))
    .map((opportunity) => opportunity.id);

  return [
    makeRetrofitScenario(retrofit.retrofitTypeId, "low-upfront", SCENARIO_NAMES.lowUpfront, "Goal: minimize immediate out-of-pocket cost.", incentiveIds.length ? incentiveIds : selectedNow, allIds, metrics, missingInfo),
    makeRetrofitScenario(retrofit.retrofitTypeId, "best-payback", SCENARIO_NAMES.bestPayback, "Goal: fastest cost recovery.", selectedNow.length ? selectedNow : incentiveIds, allIds, metrics, missingInfo),
    makeRetrofitScenario(retrofit.retrofitTypeId, "highest-savings", SCENARIO_NAMES.highestSavings, "Goal: maximize long-term financial value.", allIds, allIds, metrics, missingInfo),
    makeRetrofitScenario(
      retrofit.retrofitTypeId,
      "certification",
      SCENARIO_NAMES.certification,
      "Goal: improve green certification or environmental score.",
      certificationIds.length ? certificationIds : selectedNow,
      allIds,
      {
        ...metrics,
        paybackPeriodYears: null,
        roi: null
      },
      missingInfo,
      {
        certificationBoost: "Supports certification-related review",
        environmentalImpactContribution: "Supports impact documentation where source data applies"
      }
    )
  ];
}

function makeRetrofitScenario(
  retrofitId: string,
  id: string,
  name: string,
  description: string,
  selectedOpportunityIds: string[],
  allOpportunityIds: string[],
  metrics: {
    estimatedUpfrontProjectCost?: number | null;
    upfrontFinancialIncentive?: number | null;
    recurringOperationalSavingsAnnual?: number | null;
    recurringOperationalSavingsMonthly?: number | null;
    paybackPeriodYears?: number | null;
    roi?: string | number | null;
  },
  missingInfo: string[],
  extraMetrics: Partial<RetrofitScenarioPreview["metrics"]> = {}
): RetrofitScenarioPreview {
  return {
    id,
    retrofitId,
    name,
    description,
    selectedOpportunityIds,
    deselectedOpportunityIds: allOpportunityIds.filter((opportunityId) => !selectedOpportunityIds.includes(opportunityId)),
    metrics: {
      estimatedUpfrontProjectCost: metrics.estimatedUpfrontProjectCost,
      upfrontFinancialIncentive: selectedOpportunityIds.length > 0 ? metrics.upfrontFinancialIncentive : null,
      recurringOperationalSavingsAnnual: metrics.recurringOperationalSavingsAnnual,
      recurringOperationalSavingsMonthly: metrics.recurringOperationalSavingsMonthly,
      paybackPeriodYears: selectedOpportunityIds.length > 0 ? metrics.paybackPeriodYears : null,
      totalSavings: metrics.recurringOperationalSavingsAnnual,
      roiPercent: parsePercentMetric(metrics.roi),
      ...extraMetrics
    },
    missingInfo,
    estimateNotes: ["Estimate will update when enough confirmed inputs are available."]
  };
}

function buildRetrofitTabSummary(
  retrofit: SampleRetrofitGroup,
  values: {
    annualRecurringSavings?: number | null;
    paybackPeriodYears?: number | null;
    effectiveCostAfterOneTimeBenefits?: number | null;
    selectedOpportunityCount: number;
    missingInfoCount: number;
  }
) {
  if (values.paybackPeriodYears != null) {
    return {
      primaryMetricLabel: "Payback",
      primaryMetricValue: formatPayback(values.paybackPeriodYears),
      selectedOpportunityCount: values.selectedOpportunityCount,
      missingInfoCount: values.missingInfoCount
    };
  }
  if (values.annualRecurringSavings != null) {
    if (values.annualRecurringSavings < 0) {
      return {
        primaryMetricLabel: "Net impact",
        primaryMetricValue: undefined,
        fallback: retrofit.retrofitTypeId.includes("ev") || retrofit.retrofitTypeId.includes("charger")
          ? "Needs fuel baseline"
          : "Net impact pending",
        selectedOpportunityCount: values.selectedOpportunityCount,
        missingInfoCount: values.missingInfoCount
      };
    }
    return {
      primaryMetricLabel: "Savings",
      primaryMetricValue: formatCents(values.annualRecurringSavings),
      selectedOpportunityCount: values.selectedOpportunityCount,
      missingInfoCount: values.missingInfoCount
    };
  }
  return {
    primaryMetricLabel: "Net cost",
    primaryMetricValue: values.effectiveCostAfterOneTimeBenefits != null ? formatCents(values.effectiveCostAfterOneTimeBenefits) : undefined,
    fallback: primaryMetricFallbackForRetrofit(retrofit),
    selectedOpportunityCount: values.selectedOpportunityCount,
    missingInfoCount: values.missingInfoCount
  };
}

function primaryMetricFallbackForRetrofit(retrofit: SampleRetrofitGroup) {
  if (retrofit.retrofitTypeId.includes("ev") || retrofit.retrofitTypeId.includes("charger")) return "Needs transportation baseline";
  if (retrofit.retrofitTypeId.includes("solar")) return "Needs bill";
  return "Needs quote";
}

function buildNextBestActions(retrofits: RetrofitPreviewCard[], missingInputs: string[]): NextBestAction[] {
  const topRetrofit = retrofits[0];
  const topOpportunity = topRetrofit?.opportunities[0];
  const actions: NextBestAction[] = [];
  if (topOpportunity) {
    actions.push({
      id: "apply-first",
      text: `Review ${topOpportunity.name} source requirements before applying.`,
      relatedRetrofitName: topRetrofit.name,
      relatedOpportunityName: topOpportunity.name,
      priority: "High",
      status: "Not started"
    });
  }
  actions.push({
    id: "documents",
    text: `Gather documents: ${missingInputs.length ? missingInputs.join(", ") : "utility bills, project quote, and tax/entity information"}.`,
    relatedRetrofitName: topRetrofit?.name,
    priority: "High",
    status: "Not started"
  });
  actions.push({
    id: "price-upgrade",
    text: topRetrofit ? `Price out ${topRetrofit.name} scope with a contractor or vendor.` : "Price out the highest-fit upgrade once recommendations exist.",
    relatedRetrofitName: topRetrofit?.name,
    priority: "Medium",
    status: "Not started"
  });
  actions.push({
    id: "contact",
    text: "Contact the utility or program administrator shown in source links before final budgeting.",
    relatedRetrofitName: topRetrofit?.name,
    relatedOpportunityName: topOpportunity?.name,
    priority: "Medium",
    status: "Not started"
  });
  actions.push({
    id: "deadlines",
    text: "Check deadlines and reservation windows on each source page.",
    relatedOpportunityName: topOpportunity?.name,
    priority: "Low",
    status: "Not started"
  });
  return actions;
}

type DashboardPageId = "summary" | "financial" | "environmental" | "certifications";
type UserPreviewPrimaryView = "profile" | "retrofits" | "dashboard";
type FinancialDashboardTabId = "overview" | "cash-flow" | "savings-by-retrofit";
type EnvironmentalDashboardTabId = "overview" | "outlook";
type CertificationDashboardTabId = "progress" | "gaps" | "next-actions";
type DashboardTone = "green" | "blue" | "purple" | "orange" | "red" | "gray";

type DashboardMetric = {
  label: string;
  value: string;
  subtext?: string;
  tone?: DashboardTone;
  unavailable?: boolean;
};

type DashboardTimePoint = {
  label: string;
  actual?: number | null;
  projected?: number | null;
};

type DashboardImplementedRetrofit = {
  id: string;
  name: string;
  propertyName: string;
  category: string;
  installedDate?: string | null;
  implementationStatus: "operational" | "installed" | "tracking" | "completed" | "implemented";
  sourceStatus?: string | null;
  projectCostCents?: number | null;
  incentivesReceivedCents?: number | null;
  incentivesApprovedCents?: number | null;
  incentivesPendingCents?: number | null;
  incentivesNotClaimedCents?: number | null;
  netCostCents?: number | null;
  estimatedAnnualSavingsCents?: number | null;
  actualAnnualSavingsCents?: number | null;
  actualMonthlySavingsCents?: number | null;
  paybackYears?: number | null;
  roiPercent?: number | null;
  projectedFiveYearSavingsCents?: number | null;
  projectedTenYearSavingsCents?: number | null;
  co2eReducedPerYear?: number | null;
  kwhSavedPerYear?: number | null;
  thermsReducedPerYear?: number | null;
  waterSavedPerYear?: number | null;
  wasteReducedPerYear?: number | null;
  certificationsSupported: RetrofitEnvironmentalImpact["certificationContribution"];
  documentReadiness: DashboardDocumentReadiness[];
};

type DashboardDocumentReadiness = {
  category: string;
  ready: number;
  inReview: number;
  missing: number;
};

type DashboardCertificationProgram = {
  id: string;
  name: string;
  progressPercent: number | null;
  documentReadinessPercent: number | null;
  creditsEarned?: number | null;
  creditsRemaining?: number | null;
  status: string;
  projectedStatus: string;
};

type DashboardNextBestAction = {
  id: string;
  title: string;
  category: "financial" | "impact" | "certification" | "document" | "implementation" | "incentive" | "operations" | "measurement";
  whyItMatters: string;
  relatedRetrofitId?: string;
  estimatedCostCents?: number | null;
  estimatedSavingsCents?: number | null;
  estimatedCO2eImpact?: number | null;
  certificationImpact?: string;
  creditsUnlocked?: number | null;
  documentsNeeded?: number | null;
  difficulty?: "easy" | "medium" | "hard" | "moderate" | "complex";
  timeRequired?: string;
  priorityScore: number;
  projectedOutcome: string;
};

type DashboardFinancialData = {
  totalProjectCostCents: number | null;
  incentivesReceivedCents: number | null;
  incentivesApprovedCents: number | null;
  incentivesPendingCents: number | null;
  incentivesNotClaimedCents: number | null;
  netProjectCostCents: number | null;
  totalAnnualSavingsCents: number | null;
  totalMonthlySavingsCents: number | null;
  averagePaybackYears: number | null;
  roiPercent: number | null;
  totalRecoveredSoFarCents: number | null;
  projectedFiveYearSavingsCents: number | null;
  projectedTenYearSavingsCents: number | null;
  paybackDateLabel: string;
  realized: DashboardMetric[];
  current: DashboardMetric[];
  projected: DashboardMetric[];
  cashFlowSeries: DashboardTimePoint[];
  topSavingsRetrofits: Array<{ label: string; value: number }>;
};

type DashboardEnvironmentalData = {
  totalCO2eReducedPerYear: number | null;
  totalKwhSavedPerYear: number | null;
  totalThermsReducedPerYear: number | null;
  totalWaterSavedPerYear: number | null;
  totalWasteReducedPerYear: number | null;
  projectedFiveYearCO2e: number | null;
  projectedTenYearCO2e: number | null;
  realized: DashboardMetric[];
  current: DashboardMetric[];
  projected: DashboardMetric[];
  impactSeries: DashboardTimePoint[];
  impactByRetrofit: Array<{ label: string; value: number }>;
  basis: string[];
  equivalencies: DashboardMetric[];
};

type DashboardCertificationData = {
  progressPercent: number | null;
  applicationReadinessPercent: number | null;
  programs: DashboardCertificationProgram[];
  documentReadiness: DashboardDocumentReadiness[];
  nextActions: DashboardNextBestAction[];
  gaps: Array<{ id: string; label: string; count: number; subtext: string; tone: DashboardTone }>;
  milestones: Array<{ label: string; dateLabel: string; status: string }>;
};

export type DashboardViewModel = {
  summary: {
    kpis: DashboardMetric[];
    realized: DashboardMetric[];
    current: DashboardMetric[];
    projected: DashboardMetric[];
  };
  financial: DashboardFinancialData;
  environmental: DashboardEnvironmentalData;
  certifications: DashboardCertificationData;
  implementedRetrofits: DashboardImplementedRetrofit[];
  properties: string[];
  selectedProperty: string;
  periodLabel: string;
  generatedAt: string;
  dataQuality: {
    hasImplementedRetrofits: boolean;
    basisLabel: "actual" | "modeled" | "mixed" | "unavailable";
    notes: string[];
  };
};

const DASHBOARD_MAIN_PAGES: Array<{ id: DashboardPageId; label: string }> = [
  { id: "summary", label: "Summary" },
  { id: "financial", label: "Financial Performance" },
  { id: "environmental", label: "Environmental Impact" },
  { id: "certifications", label: "Certifications" }
];

const FINANCIAL_DASHBOARD_TABS: Array<{ id: FinancialDashboardTabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "cash-flow", label: "Cash Flow & Incentives" },
  { id: "savings-by-retrofit", label: "Savings by Retrofit" }
];

const ENVIRONMENTAL_DASHBOARD_TABS: Array<{ id: EnvironmentalDashboardTabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "outlook", label: "Outlook & Equivalencies" }
];

const CERTIFICATION_DASHBOARD_TABS: Array<{ id: CertificationDashboardTabId; label: string }> = [
  { id: "progress", label: "Progress" },
  { id: "gaps", label: "Gaps & Readiness" },
  { id: "next-actions", label: "Next Best Actions" }
];

const DASHBOARD_IMPLEMENTED_STATUSES = new Set(["implemented", "installed", "operational", "completed", "tracking", "implementationcomplete"]);

function readLooseString(source: unknown, keys: string[]) {
  if (!isPlainRecord(source)) return null;
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function readLooseNumber(source: unknown, keys: string[]) {
  if (!isPlainRecord(source)) return null;
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const parsed = Number(value.replace(/[$,%]/g, ""));
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

function normalizeDashboardImplementationStatus(retrofit: RetrofitPreviewCard, sourceRetrofit?: SampleRetrofitGroup | null) {
  const sourceStatus =
    readLooseString(sourceRetrofit, ["implementationStatus", "projectStatus", "status", "stage"]) ||
    readLooseString(sourceRetrofit?.savingsPreview, ["implementationStatus", "projectStatus", "status", "stage"]) ||
    readLooseString(retrofit, ["implementationStatus", "projectStatus", "status", "stage"]);
  const normalized = (sourceStatus || "").replace(/[_\s-]/g, "").toLowerCase();

  // Dashboard should only count post-implementation records. Current recommendation
  // payloads often omit this field; those records are intentionally excluded instead
  // of being silently treated as implemented.
  if (!DASHBOARD_IMPLEMENTED_STATUSES.has(normalized)) return null;
  if (normalized === "implementationcomplete") return "completed" as const;
  if (normalized === "implemented") return "completed" as const;
  if (normalized === "operational") return "operational" as const;
  if (normalized === "installed") return "installed" as const;
  return "tracking" as const;
}

function sumNullableNumbers(values: Array<number | null | undefined>) {
  const defined = values.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  return defined.length ? defined.reduce((sum, value) => sum + value, 0) : null;
}

function averageNullableNumbers(values: Array<number | null | undefined>) {
  const defined = values.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  return defined.length ? defined.reduce((sum, value) => sum + value, 0) / defined.length : null;
}

function divideCents(value: number | null | undefined, divisor: number) {
  if (value == null || !Number.isFinite(value)) return null;
  return Math.round(value / divisor);
}

function formatDashboardCurrencyCents(value: number | null | undefined, fallback = "Unavailable") {
  if (value == null || !Number.isFinite(value)) return fallback;
  const amount = value / 100;
  if (Math.abs(amount) >= 1000000) return `$${(amount / 1000000).toFixed(amount >= 10000000 ? 1 : 2)}M`;
  if (Math.abs(amount) >= 1000) return `$${Math.round(amount / 1000)}K`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

function formatDashboardNumber(value: number | null | undefined, unit = "", fallback = "Unavailable") {
  if (value == null || !Number.isFinite(value)) return fallback;
  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: value < 10 ? 1 : 0 }).format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}

function formatDashboardPercent(value: number | null | undefined, fallback = "Unavailable") {
  if (value == null || !Number.isFinite(value)) return fallback;
  return `${value.toFixed(value < 10 && value % 1 ? 1 : 0)}%`;
}

function dashboardMetric(label: string, value: string, subtext?: string, tone: DashboardTone = "green", unavailable = false): DashboardMetric {
  return { label, value, subtext, tone, unavailable };
}

function parseImpactValue(value: string | number | null | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (!value) return null;
  const parsed = Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function buildDashboardDocumentReadiness(retrofit: RetrofitPreviewCard, index: number): DashboardDocumentReadiness[] {
  const missing = Math.min(4, retrofit.missingInfo.length);
  const selected = retrofit.opportunities.filter((opportunity) => opportunity.selected).length;
  const baseReady = selected + Math.max(1, retrofit.opportunities.length - missing);
  return [
    { category: "Invoices", ready: baseReady, inReview: selected, missing },
    { category: "Photos", ready: baseReady + 1, inReview: index % 2, missing: Math.max(0, missing - 1) },
    { category: "Utility Bills", ready: retrofit.estimateBasis === "uploaded_bills" ? 1 : 0, inReview: 0, missing: retrofit.estimateBasis === "uploaded_bills" ? 0 : 1 }
  ];
}

function buildImplementedRetrofitPerformance(retrofit: RetrofitPreviewCard, sourceRetrofit: SampleRetrofitGroup | undefined, index: number): DashboardImplementedRetrofit | null {
  const implementationStatus = normalizeDashboardImplementationStatus(retrofit, sourceRetrofit);
  if (!implementationStatus) return null;
  const sourceStatus =
    readLooseString(sourceRetrofit, ["implementationStatus", "projectStatus", "status", "stage"]) ||
    readLooseString(sourceRetrofit?.savingsPreview, ["implementationStatus", "projectStatus", "status", "stage"]);
  const projectCostCents = retrofit.metrics.estimatedUpfrontProjectCost ?? sourceRetrofit?.savingsPreview?.upfrontCostCents ?? null;
  const incentivesReceivedCents =
    retrofit.metrics.upfrontFinancialIncentive ??
    sourceRetrofit?.savingsPreview?.upfrontSavingsCents ??
    null;
  const netCostCents =
    retrofit.metrics.effectiveCostAfterOneTimeBenefits ??
    retrofit.metrics.netCostBeforeTaxBenefits ??
    sourceRetrofit?.savingsPreview?.upfrontCostAfterSavingsCents ??
    (projectCostCents != null && incentivesReceivedCents != null ? projectCostCents - incentivesReceivedCents : null);
  const estimatedAnnualSavingsCents =
    retrofit.metrics.recurringOperationalSavingsAnnual ??
    sourceRetrofit?.savingsPreview?.netAnnualRecurringSavingsCents ??
    sourceRetrofit?.savingsPreview?.annualSavingsCents ??
    null;
  const actualAnnualSavingsCents = readLooseNumber(sourceRetrofit?.savingsPreview, ["actualAnnualSavingsCents", "actualAnnualSavings"]) ?? null;
  const annualSavingsForProjection = actualAnnualSavingsCents ?? estimatedAnnualSavingsCents;
  const co2eReducedPerYear = parseImpactValue(retrofit.environmentalImpact.overall.displayValue);
  const kwhSavedPerYear = parseImpactValue(retrofit.environmentalImpact.resources.find((resource) => /kwh|electricity/i.test(resource.label + resource.unit))?.displayValue);
  const thermsReducedPerYear = parseImpactValue(retrofit.environmentalImpact.resources.find((resource) => /therm|gas/i.test(resource.label + resource.unit))?.displayValue);
  const waterSavedPerYear = parseImpactValue(retrofit.environmentalImpact.resources.find((resource) => /water|gallon/i.test(resource.label + resource.unit))?.displayValue);
  const wasteReducedPerYear = parseImpactValue(retrofit.environmentalImpact.resources.find((resource) => /waste/i.test(resource.label + resource.unit))?.displayValue);

  return {
    id: retrofit.id,
    name: retrofit.name,
    propertyName: "Primary property",
    category: retrofit.category || "Retrofit",
    installedDate: readLooseString(sourceRetrofit, ["installedDate", "implementationDate", "completedAt"]) || null,
    implementationStatus,
    sourceStatus,
    projectCostCents,
    incentivesReceivedCents,
    incentivesApprovedCents: incentivesReceivedCents,
    incentivesPendingCents: null,
    incentivesNotClaimedCents: null,
    netCostCents,
    estimatedAnnualSavingsCents,
    actualAnnualSavingsCents,
    actualMonthlySavingsCents: divideCents(actualAnnualSavingsCents, 12),
    paybackYears: retrofit.metrics.paybackPeriodYears ?? null,
    roiPercent: parsePercentMetric(retrofit.metrics.roi) ?? null,
    projectedFiveYearSavingsCents: annualSavingsForProjection == null ? null : annualSavingsForProjection * 5,
    projectedTenYearSavingsCents: annualSavingsForProjection == null ? null : annualSavingsForProjection * 10,
    co2eReducedPerYear,
    kwhSavedPerYear,
    thermsReducedPerYear,
    waterSavedPerYear,
    wasteReducedPerYear,
    certificationsSupported: retrofit.environmentalImpact.certificationContribution,
    documentReadiness: buildDashboardDocumentReadiness(retrofit, index)
  };
}

function buildDashboardSeries(total: number | null, labels: string[]): DashboardTimePoint[] {
  if (total == null || !Number.isFinite(total) || total === 0) {
    return labels.map((label) => ({ label, actual: null, projected: null }));
  }
  return labels.map((label, index) => {
    const ratio = (index + 1) / labels.length;
    const value = Math.round(total * ratio);
    return index < Math.ceil(labels.length * 0.65)
      ? { label, actual: value, projected: null }
      : { label, actual: index === Math.ceil(labels.length * 0.65) ? value : null, projected: value };
  });
}

function buildDashboardCertificationPrograms(implementedRetrofits: DashboardImplementedRetrofit[]): DashboardCertificationProgram[] {
  const programNames = new Set<string>();
  implementedRetrofits.forEach((retrofit) => {
    retrofit.certificationsSupported.forEach((item) => programNames.add(item.program));
  });
  const names = Array.from(programNames);
  if (!names.length) return [];
  return names.slice(0, 5).map((name, index) => {
    const related = implementedRetrofits.filter((retrofit) => retrofit.certificationsSupported.some((item) => item.program === name));
    const readinessValues = related.flatMap((retrofit) => retrofit.documentReadiness.map((record) => {
      const total = record.ready + record.inReview + record.missing;
      return total ? Math.round((record.ready / total) * 100) : null;
    })).filter((value): value is number => value != null);
    const readiness = averageNullableNumbers(readinessValues);
    const progress = Math.min(95, Math.max(25, Math.round((readiness ?? 45) + related.length * 5)));
    return {
      id: slugify(name) || `program-${index + 1}`,
      name,
      progressPercent: progress,
      documentReadinessPercent: readiness,
      creditsEarned: related.length * 8,
      creditsRemaining: Math.max(0, 40 - related.length * 8),
      status: progress >= 80 ? "On Track" : "In Progress",
      projectedStatus: progress >= 80 ? "Ready to Apply" : "Needs next actions"
    };
  });
}

function buildDashboardNextBestActions(implementedRetrofits: DashboardImplementedRetrofit[], certifications: DashboardCertificationProgram[]): DashboardNextBestAction[] {
  const actions: DashboardNextBestAction[] = [];
  const topImpact = [...implementedRetrofits].sort((a, b) => (b.co2eReducedPerYear ?? 0) - (a.co2eReducedPerYear ?? 0))[0];
  if (topImpact) {
    actions.push({
      id: `impact-${topImpact.id}`,
      title: `Optimize ${topImpact.name}`,
      category: "impact",
      whyItMatters: "Improves measured savings and strengthens environmental performance.",
      relatedRetrofitId: topImpact.id,
      estimatedCO2eImpact: topImpact.co2eReducedPerYear,
      difficulty: "medium",
      timeRequired: "2-4 weeks",
      priorityScore: 86,
      projectedOutcome: topImpact.co2eReducedPerYear ? `+${formatDashboardNumber(topImpact.co2eReducedPerYear, "MT CO2e / yr")}` : "Impact tracking improvement"
    });
  }
  const missingDocuments = implementedRetrofits.reduce((sum, retrofit) => sum + retrofit.documentReadiness.reduce((recordSum, record) => recordSum + record.missing, 0), 0);
  if (missingDocuments > 0) {
    actions.push({
      id: "documents",
      title: "Upload missing certification documents",
      category: "document",
      whyItMatters: "Missing evidence can block certification readiness even after retrofits are operational.",
      documentsNeeded: missingDocuments,
      difficulty: "easy",
      timeRequired: "1-2 weeks",
      priorityScore: 92,
      projectedOutcome: `${missingDocuments} document gaps reduced`
    });
  }
  const topSavings = [...implementedRetrofits].sort((a, b) => (b.actualAnnualSavingsCents ?? b.estimatedAnnualSavingsCents ?? 0) - (a.actualAnnualSavingsCents ?? a.estimatedAnnualSavingsCents ?? 0))[0];
  if (topSavings) {
    actions.push({
      id: `financial-${topSavings.id}`,
      title: `Verify savings for ${topSavings.name}`,
      category: "financial",
      whyItMatters: "Actual utility tracking keeps ROI and payback projections current.",
      relatedRetrofitId: topSavings.id,
      estimatedSavingsCents: topSavings.actualAnnualSavingsCents ?? topSavings.estimatedAnnualSavingsCents,
      difficulty: "easy",
      timeRequired: "1 week",
      priorityScore: 78,
      projectedOutcome: "Updated actual-vs-estimated performance"
    });
  }
  certifications.slice(0, 1).forEach((program) => {
    actions.push({
      id: `cert-${program.id}`,
      title: `Complete next step for ${program.name}`,
      category: "certification",
      whyItMatters: "Certification progress depends on both credits earned and application readiness.",
      certificationImpact: program.projectedStatus,
      creditsUnlocked: program.creditsRemaining ? Math.min(8, program.creditsRemaining) : null,
      difficulty: "medium",
      timeRequired: "2-3 weeks",
      priorityScore: 74,
      projectedOutcome: program.projectedStatus
    });
  });
  return actions.sort((a, b) => b.priorityScore - a.priorityScore);
}

export function buildDashboardPerformanceData(payload: PortalRetrofitRecommendationsResponse | null, preview: UserRetrofitPreviewResult): DashboardViewModel {
  const sourceRetrofits = payload?.retrofits || [];
  const sourceById = new Map(sourceRetrofits.map((retrofit) => [retrofit.retrofitTypeId, retrofit]));
  const postImplementationDataset = payload?.dashboardPostImplementationDataset || null;
  const hasPostImplementationDataset = Boolean(postImplementationDataset);
  const implementedRetrofits = postImplementationDataset
    ? buildImplementedRetrofitsFromDashboardDataset(postImplementationDataset)
    : preview.retrofits
      .map((retrofit, index) => buildImplementedRetrofitPerformance(retrofit, sourceById.get(retrofit.id), index))
      .filter((retrofit): retrofit is DashboardImplementedRetrofit => Boolean(retrofit));

  const projectCost = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.projectCostCents));
  const incentivesReceived = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.incentivesReceivedCents));
  const incentivesApproved = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.incentivesApprovedCents));
  const incentivesPending = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.incentivesPendingCents));
  const incentivesNotClaimed = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.incentivesNotClaimedCents));
  const netProjectCost = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.netCostCents)) ?? (projectCost != null && incentivesReceived != null ? projectCost - incentivesReceived : null);
  const annualSavings = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.actualAnnualSavingsCents ?? retrofit.estimatedAnnualSavingsCents));
  const monthlySavings = divideCents(annualSavings, 12);
  const averagePayback = averageNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.paybackYears));
  const roiPercent = netProjectCost && annualSavings ? (annualSavings / netProjectCost) * 100 : averageNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.roiPercent));
  const projectedFiveYearSavings = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.projectedFiveYearSavingsCents));
  const projectedTenYearSavings = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.projectedTenYearSavingsCents));
  const recoveredSoFar = sumNullableNumbers([incentivesReceived, annualSavings]);
  const co2e = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.co2eReducedPerYear));
  const kwh = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.kwhSavedPerYear));
  const therms = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.thermsReducedPerYear));
  const water = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.waterSavedPerYear));
  const waste = sumNullableNumbers(implementedRetrofits.map((retrofit) => retrofit.wasteReducedPerYear));
  const financialLabels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const certifications = postImplementationDataset
    ? buildDashboardCertificationProgramsFromDataset(postImplementationDataset)
    : buildDashboardCertificationPrograms(implementedRetrofits);
  const nextActions = postImplementationDataset
    ? buildDashboardNextBestActionsFromDataset(postImplementationDataset)
    : buildDashboardNextBestActions(implementedRetrofits, certifications);
  const documentRows = postImplementationDataset
    ? aggregateDashboardDocumentReadinessFromDataset(postImplementationDataset)
    : aggregateDashboardDocumentReadiness(implementedRetrofits);
  const missingDocumentCount = documentRows.reduce((sum, row) => sum + row.missing, 0);
  const readinessTotal = documentRows.reduce((sum, row) => sum + row.ready + row.inReview + row.missing, 0);
  const readinessReady = documentRows.reduce((sum, row) => sum + row.ready, 0);
  const applicationReadiness = readinessTotal ? Math.round((readinessReady / readinessTotal) * 100) : null;
  const certificationProgress = averageNullableNumbers(certifications.map((program) => program.progressPercent));
  const basisLabel = postImplementationDataset
    ? dashboardBasisLabelFromDataset(postImplementationDataset)
    : implementedRetrofits.length
      ? implementedRetrofits.some((retrofit) => retrofit.actualAnnualSavingsCents != null)
        ? implementedRetrofits.some((retrofit) => retrofit.estimatedAnnualSavingsCents != null && retrofit.actualAnnualSavingsCents == null)
          ? "mixed"
          : "actual"
        : "modeled"
      : "unavailable";
  const periodLabel = postImplementationDataset?.reportingPeriod?.label || "May 1, 2024 - Apr 30, 2025";
  const cashFlowSeries = postImplementationDataset ? buildDashboardCashFlowSeriesFromDataset(postImplementationDataset) : buildDashboardSeries(annualSavings, financialLabels);
  const impactSeries = postImplementationDataset ? buildDashboardImpactSeriesFromDataset(postImplementationDataset) : buildDashboardSeries(co2e, financialLabels);

  const financial: DashboardFinancialData = {
    totalProjectCostCents: projectCost,
    incentivesReceivedCents: incentivesReceived,
    incentivesApprovedCents: incentivesApproved,
    incentivesPendingCents: incentivesPending,
    incentivesNotClaimedCents: incentivesNotClaimed,
    netProjectCostCents: netProjectCost,
    totalAnnualSavingsCents: annualSavings,
    totalMonthlySavingsCents: monthlySavings,
    averagePaybackYears: averagePayback,
    roiPercent,
    totalRecoveredSoFarCents: recoveredSoFar,
    projectedFiveYearSavingsCents: projectedFiveYearSavings,
    projectedTenYearSavingsCents: projectedTenYearSavings,
    paybackDateLabel: averagePayback ? `${new Date().getFullYear() + Math.ceil(averagePayback)} est.` : "Unavailable",
    realized: [
      dashboardMetric("Cost incurred", formatDashboardCurrencyCents(projectCost), "Implemented project cost", "green", projectCost == null),
      dashboardMetric("Incentives received", formatDashboardCurrencyCents(incentivesReceived), "Received or approved", "green", incentivesReceived == null),
      dashboardMetric("Annual savings", formatDashboardCurrencyCents(annualSavings), basisLabel === "actual" ? "Actual savings" : "Estimated or modeled", "green", annualSavings == null)
    ],
    current: [
      dashboardMetric("Current savings", formatDashboardCurrencyCents(divideCents(annualSavings, 2)), "Current period estimate", "blue", annualSavings == null),
      dashboardMetric("Current incentives", formatDashboardCurrencyCents(incentivesPending), "Pending or in review", "blue", incentivesPending == null),
      dashboardMetric("Current ROI", formatDashboardPercent(roiPercent), "Across implemented retrofits", "blue", roiPercent == null)
    ],
    projected: [
      dashboardMetric("Projected 5-year savings", formatDashboardCurrencyCents(projectedFiveYearSavings), "Future value", "purple", projectedFiveYearSavings == null),
      dashboardMetric("Projected 10-year savings", formatDashboardCurrencyCents(projectedTenYearSavings), "Future value", "purple", projectedTenYearSavings == null),
      dashboardMetric("Remaining before payback", formatDashboardCurrencyCents(netProjectCost != null && recoveredSoFar != null ? Math.max(netProjectCost - recoveredSoFar, 0) : null), "Projected recovery", "purple", netProjectCost == null || recoveredSoFar == null)
    ],
    cashFlowSeries,
    topSavingsRetrofits: implementedRetrofits
      .map((retrofit) => ({ label: retrofit.name, value: (retrofit.actualAnnualSavingsCents ?? retrofit.estimatedAnnualSavingsCents ?? 0) / 100 }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
  };

  const environmental: DashboardEnvironmentalData = {
    totalCO2eReducedPerYear: co2e,
    totalKwhSavedPerYear: kwh,
    totalThermsReducedPerYear: therms,
    totalWaterSavedPerYear: water,
    totalWasteReducedPerYear: waste,
    projectedFiveYearCO2e: co2e == null ? null : co2e * 5,
    projectedTenYearCO2e: co2e == null ? null : co2e * 10,
    realized: [
      dashboardMetric("CO2e reduced", formatDashboardNumber(co2e, "MT"), "Implemented impact", "green", co2e == null),
      dashboardMetric("kWh saved", formatDashboardNumber(kwh, "kWh"), "Electricity savings", "green", kwh == null),
      dashboardMetric("Therms reduced", formatDashboardNumber(therms, "therms"), "Natural gas savings", "green", therms == null)
    ],
    current: [
      dashboardMetric("YTD CO2e reduced", formatDashboardNumber(co2e == null ? null : co2e / 2, "MT"), "Current period", "blue", co2e == null),
      dashboardMetric("Water saved", formatDashboardNumber(water, "gal"), "Current tracked water", "blue", water == null),
      dashboardMetric("Waste reduced", formatDashboardNumber(waste, "MT"), "Current tracked waste", "blue", waste == null)
    ],
    projected: [
      dashboardMetric("Projected 5-year CO2e", formatDashboardNumber(co2e == null ? null : co2e * 5, "MT"), "Future impact", "purple", co2e == null),
      dashboardMetric("Projected 10-year CO2e", formatDashboardNumber(co2e == null ? null : co2e * 10, "MT"), "Future impact", "purple", co2e == null),
      dashboardMetric("Next-action impact", nextActions.find((action) => action.estimatedCO2eImpact)?.projectedOutcome || "Unavailable", "Highest impact action", "purple", !nextActions.some((action) => action.estimatedCO2eImpact))
    ],
    impactSeries,
    impactByRetrofit: implementedRetrofits
      .map((retrofit) => ({ label: retrofit.name, value: retrofit.co2eReducedPerYear ?? 0 }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6),
    basis: [
      basisLabel === "actual" ? "Based on uploaded bills and actual utility changes." : basisLabel === "unavailable" ? "Impact tracking will appear after implemented retrofit data is available." : "Based on modeled retrofit methodology until actual utility changes are available.",
      `Last updated: ${payload?.generatedAt ? new Date(payload.generatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Not available"}.`
    ],
    equivalencies: [
      dashboardMetric("Cars removed", formatDashboardNumber(co2e == null ? null : co2e / 4.6), "Cars off the road for one year", "green", co2e == null),
      dashboardMetric("Trees planted", formatDashboardNumber(co2e == null ? null : co2e * 16), "Approximate seedlings grown", "green", co2e == null),
      dashboardMetric("Homes powered", formatDashboardNumber(kwh == null ? null : kwh / 10632), "Homes powered for one year", "green", kwh == null),
      dashboardMetric("Gallons gasoline avoided", formatDashboardNumber(co2e == null ? null : co2e * 112), "Gallons not consumed", "blue", co2e == null)
    ]
  };

  const certificationData: DashboardCertificationData = {
    progressPercent: certificationProgress,
    applicationReadinessPercent: applicationReadiness,
    programs: certifications,
    documentReadiness: documentRows,
    nextActions,
    gaps: [
      { id: "actions", label: "Missing Actions", count: nextActions.length, subtext: "Tasks and actions that need to be completed.", tone: "red" },
      { id: "documents", label: "Missing Documents", count: missingDocumentCount, subtext: "Documents that are required but not yet uploaded.", tone: "red" },
      { id: "operational", label: "Operational Gaps", count: implementedRetrofits.filter((retrofit) => retrofit.implementationStatus !== "operational").length, subtext: "Operational items that must be addressed.", tone: "orange" },
      { id: "verification", label: "Verification Steps", count: certifications.filter((program) => program.projectedStatus !== "Ready to Apply").length, subtext: "Verification or approval steps still pending.", tone: "green" }
    ],
    milestones: nextActions.slice(0, 4).map((action, index) => ({
      label: action.title,
      dateLabel: `In ${index * 14 + 14} days`,
      status: action.category
    }))
  };

  return {
    summary: {
      kpis: [
        dashboardMetric("Total Project Cost", formatDashboardCurrencyCents(projectCost), "Across implemented retrofits", "green", projectCost == null),
        dashboardMetric("Incentives Received", formatDashboardCurrencyCents(incentivesReceived), "Received or approved", "green", incentivesReceived == null),
        dashboardMetric("Net Project Cost", formatDashboardCurrencyCents(netProjectCost), "After incentives", "green", netProjectCost == null),
        dashboardMetric("Total Annual Savings", formatDashboardCurrencyCents(annualSavings), basisLabel === "actual" ? "Actual savings" : "Estimated/modelled", "green", annualSavings == null),
        dashboardMetric("Total CO2e Reduced / Year", formatDashboardNumber(co2e, "MT"), "Metric tons CO2e", "green", co2e == null),
        dashboardMetric("Certification Progress", formatDashboardPercent(certificationProgress), "Average across programs", "green", certificationProgress == null)
      ],
      realized: financial.realized,
      current: financial.current,
      projected: financial.projected
    },
    financial,
    environmental,
    certifications: certificationData,
    implementedRetrofits,
    properties: ["All properties", "Primary property"],
    selectedProperty: "All properties",
    periodLabel,
    generatedAt: payload?.generatedAt || preview.generatedAt || new Date().toISOString(),
    dataQuality: {
      hasImplementedRetrofits: implementedRetrofits.length > 0,
      basisLabel,
      notes: implementedRetrofits.length
        ? [`Dashboard includes ${implementedRetrofits.length} implemented/tracking retrofit record(s).${hasPostImplementationDataset ? " Synthetic admin/test-case performance data is shown for preview only." : ""}`]
        : ["No post-implementation retrofit records were found in the current payload. Dashboard sections render unavailable states until implementation data is connected."]
    }
  };
}

function aggregateDashboardDocumentReadiness(implementedRetrofits: DashboardImplementedRetrofit[]): DashboardDocumentReadiness[] {
  const rows = new Map<string, DashboardDocumentReadiness>();
  implementedRetrofits.forEach((retrofit) => {
    retrofit.documentReadiness.forEach((record) => {
      const current = rows.get(record.category) || { category: record.category, ready: 0, inReview: 0, missing: 0 };
      current.ready += record.ready;
      current.inReview += record.inReview;
      current.missing += record.missing;
      rows.set(record.category, current);
    });
  });
  return Array.from(rows.values());
}

function dashboardDatasetRecords(dataset: DashboardPostImplementationDataset | null | undefined, key: keyof DashboardPostImplementationDataset) {
  const value = dataset?.[key];
  return Array.isArray(value) ? value.filter(isPlainRecord) : [];
}

function dashboardRecordString(record: Record<string, unknown>, key: string) {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

function dashboardRecordNumber(record: Record<string, unknown>, key: string) {
  const value = record[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function normalizeDatasetImplementationStatus(value: string): DashboardImplementedRetrofit["implementationStatus"] | null {
  const normalized = value.replace(/[_\s-]/g, "").toLowerCase();
  if (!DASHBOARD_IMPLEMENTED_STATUSES.has(normalized)) return null;
  if (normalized === "operational") return "operational";
  if (normalized === "installed") return "installed";
  if (normalized === "tracking") return "tracking";
  if (normalized === "implemented") return "implemented";
  return "completed";
}

function normalizeDashboardCertificationStatus(value: string): RetrofitEnvironmentalImpact["certificationContribution"][number]["status"] {
  const normalized = value.replace(/[_\s-]/g, "").toLowerCase();
  if (normalized === "supports" || normalized === "supported") return "Supports";
  if (normalized === "maysupport" || normalized === "conditional") return "May support";
  if (normalized === "needsreview" || normalized === "review") return "Needs review";
  return "Not evaluated yet";
}

function buildImplementedRetrofitsFromDashboardDataset(dataset: DashboardPostImplementationDataset): DashboardImplementedRetrofit[] {
  const properties = new Map(dashboardDatasetRecords(dataset, "properties").map((property) => [dashboardRecordString(property, "id"), property]));
  const documents = dashboardDatasetRecords(dataset, "documentRecords");
  return dashboardDatasetRecords(dataset, "implementedRetrofits")
    .map((record): DashboardImplementedRetrofit | null => {
      const status = normalizeDatasetImplementationStatus(dashboardRecordString(record, "status"));
      if (!status) return null;
      const property = properties.get(dashboardRecordString(record, "propertyId"));
      const retrofitDocuments = documents.filter((document) => dashboardRecordString(document, "relatedRetrofitId") === dashboardRecordString(record, "id"));
      return {
        id: dashboardRecordString(record, "id"),
        name: dashboardRecordString(record, "name") || dashboardRecordString(record, "retrofitId"),
        propertyName: dashboardRecordString(property || {}, "name") || "Primary property",
        category: dashboardRecordString(record, "category") || "Retrofit",
        installedDate: dashboardRecordString(record, "installedDate") || null,
        implementationStatus: status,
        sourceStatus: dashboardRecordString(record, "status"),
        projectCostCents: dashboardRecordNumber(record, "actualProjectCostCents"),
        incentivesReceivedCents: dashboardRecordNumber(record, "incentivesReceivedCents"),
        incentivesApprovedCents: dashboardRecordNumber(record, "incentivesApprovedCents"),
        incentivesPendingCents: dashboardRecordNumber(record, "incentivesPendingCents"),
        incentivesNotClaimedCents: dashboardRecordNumber(record, "incentivesNotClaimedCents"),
        netCostCents: dashboardRecordNumber(record, "actualNetCostCents"),
        estimatedAnnualSavingsCents: dashboardRecordNumber(record, "estimatedAnnualSavingsCents"),
        actualAnnualSavingsCents: dashboardRecordNumber(record, "actualAnnualSavingsCents"),
        actualMonthlySavingsCents: dashboardRecordNumber(record, "actualMonthlySavingsCents"),
        paybackYears: dashboardRecordNumber(record, "actualPaybackYears"),
        roiPercent: dashboardRecordNumber(record, "actualROI"),
        projectedFiveYearSavingsCents: (dashboardRecordNumber(record, "actualAnnualSavingsCents") ?? dashboardRecordNumber(record, "estimatedAnnualSavingsCents")) == null
          ? null
          : (dashboardRecordNumber(record, "actualAnnualSavingsCents") ?? dashboardRecordNumber(record, "estimatedAnnualSavingsCents") ?? 0) * 5,
        projectedTenYearSavingsCents: (dashboardRecordNumber(record, "actualAnnualSavingsCents") ?? dashboardRecordNumber(record, "estimatedAnnualSavingsCents")) == null
          ? null
          : (dashboardRecordNumber(record, "actualAnnualSavingsCents") ?? dashboardRecordNumber(record, "estimatedAnnualSavingsCents") ?? 0) * 10,
        co2eReducedPerYear: divideNumber(dashboardRecordNumber(record, "actualCO2eReducedKgPerYear"), 1000),
        kwhSavedPerYear: dashboardRecordNumber(record, "actualKwhSavedPerYear"),
        thermsReducedPerYear: dashboardRecordNumber(record, "actualThermsSavedPerYear"),
        waterSavedPerYear: dashboardRecordNumber(record, "actualWaterSavedGallonsPerYear"),
        wasteReducedPerYear: dashboardRecordNumber(record, "actualWasteReducedPerYear"),
        certificationsSupported: Array.isArray(record.certificationContributions)
          ? record.certificationContributions.filter(isPlainRecord).map((item) => ({
              program: dashboardRecordString(item, "program"),
              status: normalizeDashboardCertificationStatus(dashboardRecordString(item, "status")),
              detail: dashboardRecordString(item, "detail")
            }))
          : [],
        documentReadiness: buildDashboardDocumentReadinessFromRecords(retrofitDocuments)
      };
    })
    .filter((retrofit): retrofit is DashboardImplementedRetrofit => retrofit !== null);
}

function buildDashboardDocumentReadinessFromRecords(documents: Record<string, unknown>[]): DashboardDocumentReadiness[] {
  const rows = new Map<string, DashboardDocumentReadiness>();
  documents.forEach((document) => {
    const category = capitalizeLabel(dashboardRecordString(document, "documentType") || dashboardRecordString(document, "requiredFor") || "Document");
    const current = rows.get(category) || { category, ready: 0, inReview: 0, missing: 0 };
    const status = dashboardRecordString(document, "status");
    if (status === "verified" || status === "uploaded") current.ready += 1;
    else if (status === "requested" || status === "needs_update") current.inReview += 1;
    else current.missing += 1;
    rows.set(category, current);
  });
  return Array.from(rows.values());
}

function aggregateDashboardDocumentReadinessFromDataset(dataset: DashboardPostImplementationDataset) {
  return buildDashboardDocumentReadinessFromRecords(dashboardDatasetRecords(dataset, "documentRecords"));
}

function buildDashboardCashFlowSeriesFromDataset(dataset: DashboardPostImplementationDataset): DashboardTimePoint[] {
  const byMonth = new Map<string, number>();
  dashboardDatasetRecords(dataset, "monthlyPerformanceRecords").forEach((record) => {
    const month = dashboardRecordString(record, "month");
    if (!month) return;
    byMonth.set(month, (byMonth.get(month) || 0) + (dashboardRecordNumber(record, "cumulativeNetBenefitCents") || 0));
  });
  return Array.from(byMonth.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, cents], index, all) => ({
      label: monthLabel(month),
      actual: index < all.length - 2 ? Math.round(cents / 100) : null,
      projected: index >= all.length - 2 ? Math.round(cents / 100) : null
    }));
}

function buildDashboardImpactSeriesFromDataset(dataset: DashboardPostImplementationDataset): DashboardTimePoint[] {
  let cumulativeKg = 0;
  const monthlyKg = new Map<string, number>();
  dashboardDatasetRecords(dataset, "monthlyPerformanceRecords").forEach((record) => {
    const month = dashboardRecordString(record, "month");
    if (!month) return;
    monthlyKg.set(month, (monthlyKg.get(month) || 0) + (dashboardRecordNumber(record, "actualCO2eReducedKg") || 0));
  });
  return Array.from(monthlyKg.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, kg], index, all) => {
      cumulativeKg += kg;
      const mt = cumulativeKg / 1000;
      return {
        label: monthLabel(month),
        actual: index < all.length - 2 ? mt : null,
        projected: index >= all.length - 2 ? mt : null
      };
    });
}

function monthLabel(month: string) {
  const date = new Date(`${month}-01T12:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? month : date.toLocaleDateString("en-US", { month: "short" });
}

function buildDashboardCertificationProgramsFromDataset(dataset: DashboardPostImplementationDataset): DashboardCertificationProgram[] {
  const requirements = dashboardDatasetRecords(dataset, "certificationRequirements");
  return dashboardDatasetRecords(dataset, "certificationRecords").map((record) => {
    const id = dashboardRecordString(record, "id");
    const related = requirements.filter((requirement) => dashboardRecordString(requirement, "certificationId") === id);
    const earned = sumNullableNumbers(related.map((requirement) => dashboardRecordNumber(requirement, "pointsEarned"))) ?? dashboardRecordNumber(record, "creditsEarned");
    const possible = sumNullableNumbers(related.map((requirement) => dashboardRecordNumber(requirement, "pointsPossible")));
    return {
      id,
      name: dashboardRecordString(record, "certificationName"),
      progressPercent: dashboardRecordNumber(record, "progressPercent"),
      documentReadinessPercent: dashboardRecordNumber(record, "readinessPercent"),
      creditsEarned: earned,
      creditsRemaining: possible == null || earned == null ? null : Math.max(0, possible - earned),
      status: capitalizeLabel(dashboardRecordString(record, "status") || "in_progress"),
      projectedStatus: (dashboardRecordNumber(record, "readinessPercent") || 0) >= 82 ? "Ready to Apply" : "Needs next actions"
    };
  });
}

function buildDashboardNextBestActionsFromDataset(dataset: DashboardPostImplementationDataset): DashboardNextBestAction[] {
  return dashboardDatasetRecords(dataset, "nextBestActions")
    .map((record) => {
      const co2eKg = dashboardRecordNumber(record, "estimatedCO2eImpactKg");
      const savings = dashboardRecordNumber(record, "estimatedSavingsCents") ?? dashboardRecordNumber(record, "estimatedValueCents");
      return {
        id: dashboardRecordString(record, "id"),
        title: dashboardRecordString(record, "title"),
        category: dashboardRecordString(record, "category") as DashboardNextBestAction["category"],
        whyItMatters: dashboardRecordString(record, "description") || dashboardRecordString(record, "reason"),
        relatedRetrofitId: dashboardRecordString(record, "relatedRetrofitId") || undefined,
        estimatedCostCents: dashboardRecordNumber(record, "estimatedCostCents"),
        estimatedSavingsCents: savings,
        estimatedCO2eImpact: co2eKg == null ? null : co2eKg / 1000,
        certificationImpact: dashboardRecordString(record, "certificationImpact") || undefined,
        creditsUnlocked: dashboardRecordNumber(record, "creditsUnlocked"),
        difficulty: (dashboardRecordString(record, "difficulty") || "moderate") as DashboardNextBestAction["difficulty"],
        timeRequired: dashboardRecordString(record, "timeRequired") || undefined,
        priorityScore: dashboardRecordNumber(record, "priorityScore") ?? 50,
        projectedOutcome: co2eKg
          ? `+${formatDashboardNumber(co2eKg / 1000, "MT CO2e / yr")}`
          : savings
            ? formatDashboardCurrencyCents(savings)
            : dashboardRecordString(record, "certificationImpact") || "Readiness improved"
      };
    })
    .sort((left, right) => right.priorityScore - left.priorityScore);
}

function dashboardBasisLabelFromDataset(dataset: DashboardPostImplementationDataset): DashboardViewModel["dataQuality"]["basisLabel"] {
  if (!dataset.implementedRetrofits?.length) return "unavailable";
  if (dataset.implementedRetrofits.some((record) => record.dataSource === "mixed")) return "mixed";
  if (dataset.implementedRetrofits.some((record) => record.dataSource === "actual")) return "actual";
  return "modeled";
}

export function RetrofitRecommendationsPreview({
  credential = null,
  emptyMessage,
  error,
  eyebrow,
  intro,
  isDetailLoading = false,
  isLoading,
  loadingRetrofitDetailIds = {},
  loadingMessage,
  onPrioritizeRetrofit,
  onProfileFormSaved,
  enableSeededFormDetails = false,
  hideBillData = false,
  hideFormDetails = true,
  payload,
  profileFormWriteEndpoint,
  title
}: {
  credential?: AuthCredential | null;
  emptyMessage: string;
  error: string | null;
  eyebrow: string;
  intro: string;
  isDetailLoading?: boolean;
  isLoading: boolean;
  loadingRetrofitDetailIds?: Record<string, boolean>;
  loadingMessage: string;
  onPrioritizeRetrofit?: (retrofitId: string) => void;
  onProfileFormSaved?: (response: PreRetrofitFormSaveResponse) => void;
  enableSeededFormDetails?: boolean;
  hideBillData?: boolean;
  hideFormDetails?: boolean;
  payload: PortalRetrofitRecommendationsResponse | null;
  profileFormWriteEndpoint?: string;
  title: string;
}) {
  const preview = useMemo(() => buildUserRetrofitPreviewResult(payload), [payload]);
  const hasUploadedBills = intakeHasUtilityBillData(payload?.intake);
  const billUploadStorageKey = useMemo(() => getBillUploadStorageKey(preview.profileId, preview.intakeId), [preview.intakeId, preview.profileId]);
  const [billUploadModalOpen, setBillUploadModalOpen] = useState(false);
  const [billUploadState, setBillUploadState] = useState<BillUploadState>(() => loadBillUploadState(billUploadStorageKey));
  const [billUploadFocusStepId, setBillUploadFocusStepId] = useState<BillUploadStepId | null>(null);
  const intakeHydratedBillUploadState = useMemo(
    () => hydrateBillUploadStateFromIntake(payload?.intake || null, billUploadState),
    [billUploadState, payload?.intake]
  );
  const hiddenBillUploadState = useMemo(() => getDefaultBillUploadState(), []);
  const effectiveBillUploadState = hideBillData ? hiddenBillUploadState : intakeHydratedBillUploadState;
  const uploadedBillStepCount = getBillUploadStepSummary(effectiveBillUploadState).length;
  const isShowingUploadedBillData = !hideBillData && uploadedBillStepCount > 0;
  const shouldMaskBillDerivedMetrics = hideBillData || (!hasUploadedBills && !effectiveBillUploadState.flowComplete);
  const topRetrofit = preview.retrofits[0];
  const initialScenarioIds = useMemo(() => {
    const ids: Record<string, string> = {};
    for (const retrofit of preview.retrofits) {
      if (retrofit.scenarios[0]) ids[retrofit.id] = retrofit.scenarios[0].id;
    }
    return ids;
  }, [preview]);
  const initialSelectedOpportunityIds = useMemo(() => {
    const ids: Record<string, boolean> = {};
    for (const retrofit of preview.retrofits) {
      for (const opportunity of retrofit.opportunities) ids[opportunity.id] = opportunity.selected;
    }
    return ids;
  }, [preview]);
  const [sortBy, setSortBy] = useState("recommended");
  const [basisFilter, setBasisFilter] = useState("all");
  const [confidenceFilter, setConfidenceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [missingInfoFilter, setMissingInfoFilter] = useState("all");
  const [activePrimaryView, setActivePrimaryView] = useState<UserPreviewPrimaryView>("retrofits");
  const [activeDashboardPage, setActiveDashboardPage] = useState<DashboardPageId>("summary");
  const [activeRetrofitId, setActiveRetrofitId] = useState<string>("");
  const [selectedScenarioIds, setSelectedScenarioIds] = useState<Record<string, string>>(initialScenarioIds);
  const [selectedOpportunityIds, setSelectedOpportunityIds] = useState<Record<string, boolean>>(initialSelectedOpportunityIds);
  const [detailAnswers, setDetailAnswers] = useState<Record<string, string>>({});
  const [activeFormRetrofitId, setActiveFormRetrofitId] = useState<string | null>(null);
  const [formSaveError, setFormSaveError] = useState<string | null>(null);
  const [savingFormRetrofitId, setSavingFormRetrofitId] = useState<string | null>(null);
  const [nextActionStatuses, setNextActionStatuses] = useState<Record<string, NextBestAction["status"]>>({});
  const [financingRetrofit, setFinancingRetrofit] = useState<RetrofitPreviewCard | null>(null);
  const [refinementMessage, setRefinementMessage] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [addedRetrofitPlans, setAddedRetrofitPlans] = useState<Record<string, AddedRetrofitPlanSnapshot>>({});
  const [dirtyRetrofitIds, setDirtyRetrofitIds] = useState<Record<string, boolean>>({});
  const [pendingTabRetrofitId, setPendingTabRetrofitId] = useState<string | null>(null);
  const [planMessage, setPlanMessage] = useState<string | null>(null);
  const [lastAddedRetrofitId, setLastAddedRetrofitId] = useState<string | null>(null);
  const [pickerViewMode, setPickerViewMode] = useState<"grid" | "panel">("grid");
  const [pickerVisibleCount, setPickerVisibleCount] = useState(6);
  const [activeRetrofitInitialWorkspaceTab, setActiveRetrofitInitialWorkspaceTab] = useState<"overview">("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [instructionsOpenedFromNav, setInstructionsOpenedFromNav] = useState(false);
  const [instructionsPulse, setInstructionsPulse] = useState(false);
  const seededDetailAnswers = useMemo(
    () => (enableSeededFormDetails && !hideFormDetails ? buildSeededRetrofitDetailAnswers(preview.retrofits, payload?.intake || null) : {}),
    [enableSeededFormDetails, hideFormDetails, payload?.intake, preview.retrofits]
  );
  const persistedDetailAnswers = useMemo(
    () => (profileFormWriteEndpoint ? buildPersistedRetrofitDetailAnswers(preview.retrofits, payload?.intake || null) : {}),
    [payload?.intake, preview.retrofits, profileFormWriteEndpoint]
  );
  const effectiveDetailAnswers = useMemo(
    () => ({
      ...persistedDetailAnswers,
      ...seededDetailAnswers,
      ...detailAnswers
    }),
    [detailAnswers, persistedDetailAnswers, seededDetailAnswers]
  );
  const dashboardViewModel = useMemo(() => buildDashboardPerformanceData(payload, preview), [payload, preview]);

  useEffect(() => {
    setSelectedOpportunityIds(initialSelectedOpportunityIds);
    setSelectedScenarioIds(initialScenarioIds);
  }, [initialScenarioIds, initialSelectedOpportunityIds]);

  useEffect(() => {
    setActiveRetrofitId("");
    setAddedRetrofitPlans({});
    setDirtyRetrofitIds({});
    setPendingTabRetrofitId(null);
    setPlanMessage(null);
    setLastAddedRetrofitId(null);
    setPickerVisibleCount(6);
    setActiveRetrofitInitialWorkspaceTab("overview");
    setBillUploadFocusStepId(null);
    setActiveFormRetrofitId(null);
    setFormSaveError(null);
    setSavingFormRetrofitId(null);
    setDetailAnswers({});
    setActivePrimaryView("retrofits");
    setActiveDashboardPage("summary");
  }, [preview.intakeId, preview.profileId]);

  useEffect(() => {
    setBillUploadState(loadBillUploadState(billUploadStorageKey));
    setBillUploadModalOpen(false);
    setBillUploadFocusStepId(null);
  }, [billUploadStorageKey]);

  useEffect(() => {
    storeBillUploadState(billUploadStorageKey, billUploadState);
  }, [billUploadState, billUploadStorageKey]);

  useEffect(() => {
    const postFormPreviewParam =
      typeof window !== "undefined" && new URLSearchParams(window.location.search).get("postFormPreview") === "1";
    const intakeJustCompleted = safeStorageGet("session", INTAKE_JUST_COMPLETED_KEY) === "true";
    const instructionsSeen = safeStorageGet("local", INSTRUCTIONS_ONBOARDING_SEEN_KEY) === "true";
    if (postFormPreviewParam || (intakeJustCompleted && !instructionsSeen)) {
      if (postFormPreviewParam) safeStorageRemove("local", INSTRUCTIONS_ONBOARDING_SEEN_KEY);
      setInstructionsOpenedFromNav(false);
      setShowInstructionsModal(true);
    } else if (intakeJustCompleted && instructionsSeen) {
      safeStorageRemove("session", INTAKE_JUST_COMPLETED_KEY);
    }
  }, []);

  const retrofitReadinessById = useMemo(() => {
    const readinessById = new Map<string, RetrofitReadiness>();
    for (const retrofit of preview.retrofits) {
      readinessById.set(retrofit.id, getRetrofitReadiness(retrofit, effectiveBillUploadState, effectiveDetailAnswers));
    }
    return readinessById;
  }, [effectiveBillUploadState, effectiveDetailAnswers, preview.retrofits]);

  const displayedRetrofits = useMemo(() => {
    return preview.retrofits
      .filter((retrofit) => {
        if (basisFilter !== "all" && retrofit.estimateBasis !== basisFilter) return false;
        if (categoryFilter !== "all" && slugify(retrofit.category || "") !== categoryFilter) return false;
        if (confidenceFilter !== "all") {
          const confidence = (retrofit.confidenceLabel || "Needs review").toLowerCase();
          if (confidenceFilter === "high" && confidence !== "high") return false;
          if (confidenceFilter === "medium" && confidence !== "medium") return false;
          if (confidenceFilter === "low" && confidence !== "low") return false;
        }
        if (missingInfoFilter === "needs_info" && retrofit.missingInfo.length === 0) return false;
        if (missingInfoFilter === "ready" && retrofit.missingInfo.length > 0) return false;
        return true;
      })
      .sort((a, b) => comparePreviewRetrofits(a, b, sortBy, retrofitReadinessById));
  }, [basisFilter, categoryFilter, confidenceFilter, missingInfoFilter, preview.retrofits, retrofitReadinessById, sortBy]);

  const activeRetrofit = activePrimaryView === "retrofits" && activeRetrofitId
    ? displayedRetrofits.find((retrofit) => retrofit.id === activeRetrofitId) || null
    : null;
  const isProgressiveDetailLoading = Boolean(payload?.isProgressiveShell && isDetailLoading);
  const activeRetrofitDetailsLoading = Boolean(activeRetrofit && (loadingRetrofitDetailIds[activeRetrofit.id] || (isProgressiveDetailLoading && activeRetrofit.opportunities.length === 0)));
  const activeFormRetrofit = activeFormRetrofitId
    ? preview.retrofits.find((retrofit) => retrofit.id === activeFormRetrofitId) || null
    : null;
  const topRecommendationStatus = topRetrofit
    ? topRetrofit.metrics.effectiveCostAfterOneTimeBenefits != null
      ? `Net cost ${formatCents(topRetrofit.metrics.effectiveCostAfterOneTimeBenefits)}`
      : topRetrofit.tabSummary.fallback || "Preliminary estimate"
    : "Not estimated yet";
  const topRecommendationMissing = topRetrofit?.missingInfo[0] || preview.missingInputs[0] || "Not enough information yet";
  const readinessMissingItems = preview.missingInputs.length
    ? preview.missingInputs
    : topRetrofit?.missingInfo || [];
  const readinessMissingPreview = readinessMissingItems.slice(0, 3);
  const readinessMoreCount = Math.max(0, readinessMissingItems.length - readinessMissingPreview.length);
  const activeDraftName = activeRetrofit ? activeRetrofit.name : "None";
  const addedPlanCount = Object.keys(addedRetrofitPlans).length;
  const confirmedRetrofit = lastAddedRetrofitId
    ? preview.retrofits.find((retrofit) => retrofit.id === lastAddedRetrofitId)
    : undefined;
  const confirmedRetrofitName = confirmedRetrofit?.name;
  const recalculationStatus = addedPlanCount === 0 ? "No retrofit added yet" : "Recalculation pending";
  const totalMatchedRetrofits = payload?.summary.matchedRetrofitCount || preview.retrofits.length;
  const shownFirstCount = Math.min(5, totalMatchedRetrofits || displayedRetrofits.length);

  useEffect(() => {
    if (activeRetrofitId && !displayedRetrofits.some((retrofit) => retrofit.id === activeRetrofitId)) {
      setActiveRetrofitId("");
    }
  }, [activeRetrofitId, displayedRetrofits]);

  useEffect(() => {
    if (!payload?.isProgressiveShell || !activeRetrofitId) return;
    onPrioritizeRetrofit?.(activeRetrofitId);
  }, [activeRetrofitId, onPrioritizeRetrofit, payload?.isProgressiveShell]);

  useEffect(() => {
    if (typeof document === "undefined" || !activeRetrofitId) return;
    const activeTab = document.querySelector(`[data-retrofit-tab-id="${activeRetrofitId}"]`);
    activeTab?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeRetrofitId]);

  useEffect(() => {
    if (typeof document === "undefined" || !activeRetrofitId) return;
    window.requestAnimationFrame(() => {
      document.querySelector(".retrofit-selected-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [activeRetrofitId]);

  function handleUploadBills() {
    setBillUploadFocusStepId(getFirstIncompleteBillUploadStepId(effectiveBillUploadState) || null);
    setBillUploadModalOpen(true);
    setRefinementMessage(
      isShowingUploadedBillData
        ? "Review the utility bill data currently available for retrofit estimates."
        : "Upload your utility bills to unlock detailed retrofit estimates."
    );
  }

  function handleUploadBillsForRetrofit(retrofit: RetrofitPreviewCard) {
    const firstMissingRequiredBill = getRequiredBillTypesForRetrofit(retrofit).find(
      (billType) => effectiveBillUploadState.statuses[billType] !== "uploaded"
    );
    setBillUploadFocusStepId(firstMissingRequiredBill || null);
    setBillUploadModalOpen(true);
    setRefinementMessage(`Upload bills to unlock ${retrofit.name} estimates.`);
  }

  function toggleOpportunity(opportunityId: string) {
    const owningRetrofit = preview.retrofits.find((retrofit) =>
      retrofit.opportunities.some((opportunity) => opportunity.id === opportunityId)
    );
    setSelectedOpportunityIds((current) => ({
      ...current,
      [opportunityId]: !current[opportunityId]
    }));
    if (owningRetrofit) markRetrofitDirty(owningRetrofit.id);
  }

  function selectScenario(retrofit: RetrofitPreviewCard, scenarioId: string) {
    const scenario = retrofit.scenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;
    setSelectedScenarioIds((current) => ({
      ...current,
      [retrofit.id]: scenarioId
    }));
    setSelectedOpportunityIds((current) => {
      const next = { ...current };
      retrofit.opportunities.forEach((opportunity) => {
        next[opportunity.id] = scenario.selectedOpportunityIds.includes(opportunity.id);
      });
      return next;
    });
    markRetrofitDirty(retrofit.id);
  }

  function markRetrofitDirty(retrofitId: string) {
    setDirtyRetrofitIds((current) => ({ ...current, [retrofitId]: true }));
    setPlanMessage("Draft selection in progress. Add this retrofit to your plan before moving on.");
  }

  function selectedOpportunityIdsForRetrofit(retrofit: RetrofitPreviewCard) {
    return retrofit.opportunities.filter((opportunity) => selectedOpportunityIds[opportunity.id]).map((opportunity) => opportunity.id);
  }

  function addRetrofitToPlan(retrofit: RetrofitPreviewCard, nextRetrofitId?: string) {
    const scenarioId = selectedScenarioIds[retrofit.id] || retrofit.scenarios[0]?.id || "";
    const opportunityIds = selectedOpportunityIdsForRetrofit(retrofit);
    const scenario = retrofit.scenarios.find((item) => item.id === scenarioId);
    const includedOpportunityIds = getIncludedOpportunitiesForCurrentEstimate(retrofit, scenario, selectedOpportunityIds).map((opportunity) => opportunity.id);
    const pendingOpportunityIds = opportunityIds.filter((id) => !includedOpportunityIds.includes(id));
    setAddedRetrofitPlans((current) => ({
      ...current,
      [retrofit.id]: {
        scenarioId,
        opportunityIds,
        includedOpportunityIds,
        pendingOpportunityIds,
        financialSnapshot: {
          netCostBeforeTaxBenefits: retrofit.metrics.netCostBeforeTaxBenefits ?? null,
          upfrontFinancialIncentive: retrofit.metrics.upfrontFinancialIncentive ?? null,
          recurringOperationalSavingsAnnual: retrofit.metrics.recurringOperationalSavingsAnnual ?? null,
          paybackPeriodYears: retrofit.metrics.paybackPeriodYears ?? null
        },
        missingInfo: retrofit.missingInfo,
        nextStep: retrofit.recommendedNextStep || "Prepare applications or review the next retrofit.",
        recalculationStatus: "Recalculation not available yet",
        addedAt: new Date().toISOString()
      }
    }));
    setDirtyRetrofitIds((current) => ({ ...current, [retrofit.id]: false }));
    setLastAddedRetrofitId(retrofit.id);
    setPlanMessage(`${retrofit.name} added to your plan. Other retrofit estimates may change after this retrofit is added. Recalculation support is not available yet.`);
    if (nextRetrofitId) {
      setActiveRetrofitId(nextRetrofitId);
      setSidebarCollapsed(true);
      setPendingTabRetrofitId(null);
    }
  }

  function handleBillUploadComplete(state: BillUploadState) {
    setBillUploadState(state);
    setBillUploadFocusStepId(null);
    setBillUploadModalOpen(false);
    setRefinementMessage("Uploaded bills are now available for retrofit estimates.");
  }

  function resetRetrofitDraft(retrofit: RetrofitPreviewCard) {
    setSelectedScenarioIds((current) => ({
      ...current,
      [retrofit.id]: initialScenarioIds[retrofit.id] || retrofit.scenarios[0]?.id || ""
    }));
    setSelectedOpportunityIds((current) => {
      const next = { ...current };
      for (const opportunity of retrofit.opportunities) {
        next[opportunity.id] = initialSelectedOpportunityIds[opportunity.id] || false;
      }
      return next;
    });
    setDirtyRetrofitIds((current) => ({ ...current, [retrofit.id]: false }));
  }

  function openRetrofitWorkspace(retrofitId: string) {
    setActivePrimaryView("retrofits");
    setActiveRetrofitInitialWorkspaceTab("overview");
    if (retrofitId === activeRetrofitId) return;
    if (activeRetrofit && dirtyRetrofitIds[activeRetrofit.id] && !addedRetrofitPlans[activeRetrofit.id]) {
      setPendingTabRetrofitId(retrofitId);
      return;
    }
    setActiveRetrofitId(retrofitId);
    setSidebarCollapsed(true);
  }

  function handleRetrofitTabClick(retrofitId: string) {
    const retrofit = preview.retrofits.find((item) => item.id === retrofitId);
    if (!retrofit) return;
    const readiness = retrofitReadinessById.get(retrofit.id) || getRetrofitReadiness(retrofit, effectiveBillUploadState, effectiveDetailAnswers);
    if (!readiness.billsComplete) {
      handleUploadBillsForRetrofit(retrofit);
      return;
    }
    if (!readiness.questionsComplete) {
      setActiveFormRetrofitId(retrofit.id);
      setFormSaveError(null);
      setRefinementMessage(`Answer project details to unlock ${retrofit.name}.`);
      return;
    }
    openRetrofitWorkspace(retrofitId);
  }

  async function handleRetrofitFormSubmit(retrofit: RetrofitPreviewCard, answers: Record<string, string>) {
    const questions = getRetrofitFormQuestions(retrofit, answers);
    const scopedAnswers = Object.fromEntries(questions.map((question) => [question.id, answers[question.id] || ""]));
    let nextAnswers = scopedAnswers;
    setFormSaveError(null);

    if (profileFormWriteEndpoint && credential) {
      setSavingFormRetrofitId(retrofit.id);
      try {
        const response = await apiPost<PreRetrofitFormSaveResponse>(profileFormWriteEndpoint, {
          ...adminAuthBody(credential),
          retrofitTypeId: retrofit.id,
          retrofitName: retrofit.name,
          answers: scopedAnswers,
          questions
        });
        onProfileFormSaved?.(response);
        nextAnswers = answersFromSavedPreRetrofitRecord(response.savedRetrofit);
        if (Object.keys(nextAnswers).length === 0) nextAnswers = scopedAnswers;
      } catch (requestError) {
        setFormSaveError(requestError instanceof Error ? requestError.message : "Could not save project details.");
        return;
      } finally {
        setSavingFormRetrofitId(null);
      }
    }

    setDetailAnswers((current) => ({
      ...current,
      ...nextAnswers
    }));
    setActiveFormRetrofitId(null);
    setRefinementMessage(`${retrofit.name} project details saved.`);
    openRetrofitWorkspace(retrofit.id);
  }

  function discardActiveDraftAndSwitch() {
    if (activeRetrofit) resetRetrofitDraft(activeRetrofit);
    if (pendingTabRetrofitId) {
      setActiveRetrofitId(pendingTabRetrofitId);
      setSidebarCollapsed(true);
    }
    setPendingTabRetrofitId(null);
  }

  function handleSidebarRetrofitSelect(retrofitId: string) {
    setActivePrimaryView("retrofits");
    handleRetrofitTabClick(retrofitId);
    setMobileSidebarOpen(false);
  }

  function handleProfileSelect() {
    setActivePrimaryView("profile");
    setActiveRetrofitId("");
    setSidebarCollapsed(false);
    setMobileSidebarOpen(false);
  }

  function handleDashboardPageSelect(pageId: DashboardPageId) {
    setActivePrimaryView("dashboard");
    setActiveDashboardPage(pageId);
    setActiveRetrofitId("");
    setSidebarCollapsed(false);
    setMobileSidebarOpen(false);
  }

  function openInstructionsFromNav() {
    setInstructionsOpenedFromNav(true);
    setShowInstructionsModal(true);
    setMobileSidebarOpen(false);
  }

  function handleInstructionsDismiss() {
    safeStorageSet("local", INSTRUCTIONS_ONBOARDING_SEEN_KEY, "true");
    safeStorageRemove("session", INTAKE_JUST_COMPLETED_KEY);
    setShowInstructionsModal(false);
    setInstructionsPulse(true);
    if (typeof window !== "undefined") {
      window.setTimeout(() => setInstructionsPulse(false), 1100);
    }
  }

  if (isLoading && !payload) {
    const isPreviewCaseLoad = loadingMessage.toLowerCase().includes("client") || loadingMessage.toLowerCase().includes("preview");
    return (
      <RetroFiPageLoader
        label={isPreviewCaseLoad ? "Loading preview case..." : "Preparing your dashboard..."}
        sublabel={isPreviewCaseLoad ? "Preparing dashboard data for this test case" : "Building savings, incentive, impact, and certification views"}
        variant="dashboard"
      />
    );
  }

  return (
    <div
      className={`user-preview-shell${mobileSidebarOpen ? " is-mobile-sidebar-open" : ""}${sidebarCollapsed ? " is-sidebar-collapsed" : ""}`}
      data-testid="retrofit-recommendations-preview"
    >
      <UserPreviewSidebar
        activeRetrofitId={activeRetrofit?.id || ""}
        activeDashboardPage={activeDashboardPage}
        activeView={activePrimaryView}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onOpenDashboardPage={handleDashboardPageSelect}
        onOpenInstructions={openInstructionsFromNav}
        onOpenProfile={handleProfileSelect}
        onSelectRetrofit={handleSidebarRetrofitSelect}
        onShowAllRetrofits={() => {
          setActivePrimaryView("retrofits");
          setActiveRetrofitId("");
          setSidebarCollapsed(false);
          setMobileSidebarOpen(false);
        }}
        onToggleCollapsed={() => setSidebarCollapsed((current) => !current)}
        instructionsPulse={instructionsPulse}
        retrofits={displayedRetrofits}
      />
      <main className="user-preview-main">
        <section className="retrofit-preview-page">
          <button className="user-preview-mobile-menu-button user-preview-inline-menu-button" onClick={() => setMobileSidebarOpen(true)} type="button">
            <ViewPanelIcon />
            <span>{activePrimaryView === "profile" ? "Profile" : activePrimaryView === "dashboard" ? "Dashboard" : "Retrofits"}</span>
          </button>
          {error ? <p className="error-message">{error}</p> : null}
          {isProgressiveDetailLoading ? (
            <section className="retrofit-detail-loading-banner">
              <strong>Loading detailed opportunities and calculations...</strong>
              <span>The retrofit workspace is available now; source-backed details will fill in as they finish loading.</span>
            </section>
          ) : null}

          {activePrimaryView === "dashboard" ? (
            <DashboardPerformanceHub
              activePage={activeDashboardPage}
              onPageChange={setActiveDashboardPage}
              viewModel={dashboardViewModel}
            />
          ) : activePrimaryView === "profile" ? (
            <UserPreviewProfileView
              billUploadState={effectiveBillUploadState}
              detailAnswers={effectiveDetailAnswers}
              hideBillData={hideBillData}
              hideFormDetails={hideFormDetails}
              isDetailLoading={isDetailLoading}
              payload={payload}
              preview={preview}
              seededDetailAnswers={seededDetailAnswers}
            />
          ) : activeRetrofit ? (
            <>
              <div className="retrofit-preview-list retrofit-selected-workspace">
                <RetrofitPreviewCardView
                  key={activeRetrofit.id}
                  initialWorkspaceTab={activeRetrofitInitialWorkspaceTab}
                  onAddToPlan={() => addRetrofitToPlan(activeRetrofit)}
                  onExploreFinancing={() => setFinancingRetrofit(activeRetrofit)}
                  onSelectScenario={(scenarioId) => selectScenario(activeRetrofit, scenarioId)}
                  onToggleOpportunity={toggleOpportunity}
                  credential={credential}
                  retrofit={activeRetrofit}
                  selectedScenarioId={selectedScenarioIds[activeRetrofit.id] || activeRetrofit.scenarios[0]?.id || ""}
                  selectedOpportunityIds={selectedOpportunityIds}
                  hideBillData={shouldMaskBillDerivedMetrics}
                  isDetailLoading={activeRetrofitDetailsLoading}
                />
              </div>
            </>
          ) : (
            <RetrofitPickerView
              activeRetrofitId=""
              displayedRetrofits={displayedRetrofits}
              emptyMessage={emptyMessage}
              isLoading={isLoading}
              loadingMessage={loadingMessage}
              hideBillData={shouldMaskBillDerivedMetrics}
              uploadedBillStepCount={isShowingUploadedBillData ? uploadedBillStepCount : 0}
              retrofitReadinessById={retrofitReadinessById}
              onCloseDetails={() => setActiveRetrofitId("")}
              onSelectRetrofit={handleRetrofitTabClick}
              onSetViewMode={setPickerViewMode}
              onShowMore={() => setPickerVisibleCount((current) => Math.min(current + 6, displayedRetrofits.length))}
              onShowLess={() => setPickerVisibleCount(6)}
              onSortChange={(value) => {
                setSortBy(value);
                setPickerVisibleCount(6);
              }}
              onUploadBills={handleUploadBills}
              pickerViewMode={pickerViewMode}
              pickerVisibleCount={pickerVisibleCount}
              sortBy={sortBy}
            />
          )}

          {financingRetrofit ? (
            <FinancingPreviewDrawer retrofit={financingRetrofit} onClose={() => setFinancingRetrofit(null)} />
          ) : null}

          {pendingTabRetrofitId && activeRetrofit ? (
            <UnconfirmedRetrofitModal
              onConfirm={() => addRetrofitToPlan(activeRetrofit, pendingTabRetrofitId)}
              onDiscard={discardActiveDraftAndSwitch}
              retrofitName={activeRetrofit.name}
            />
          ) : null}

        </section>
      </main>

      <BillUploadModal
        initialState={effectiveBillUploadState}
        initialStepId={billUploadFocusStepId}
        isOpen={billUploadModalOpen}
        onClose={() => {
          setBillUploadModalOpen(false);
          setBillUploadFocusStepId(null);
        }}
        onComplete={handleBillUploadComplete}
        onStateChange={setBillUploadState}
        storageKey={billUploadStorageKey}
      />
      {activeFormRetrofit ? (
        <RetrofitDetailFormModal
          initialAnswers={effectiveDetailAnswers}
          isSubmitting={savingFormRetrofitId === activeFormRetrofit.id}
          onClose={() => {
            setActiveFormRetrofitId(null);
            setFormSaveError(null);
          }}
          onSubmit={(answers) => handleRetrofitFormSubmit(activeFormRetrofit, answers)}
          retrofit={activeFormRetrofit}
          submitError={formSaveError}
        />
      ) : null}
      {showInstructionsModal ? (
        <ProcessOnboardingModal
          animateText={!instructionsOpenedFromNav}
          onClose={handleInstructionsDismiss}
        />
      ) : null}
    </div>
  );
}

type UserPreviewProfileDetailRow = {
  label: string;
  value: ReactNode;
};

type UserPreviewProfileListItem = {
  title: string;
  meta?: ReactNode;
  detail?: ReactNode;
};

export function UserPreviewProfileView({
  billUploadState,
  detailAnswers,
  hideBillData,
  hideFormDetails,
  isDetailLoading,
  payload,
  preview,
  seededDetailAnswers
}: {
  billUploadState: BillUploadState;
  detailAnswers: Record<string, string>;
  hideBillData: boolean;
  hideFormDetails: boolean;
  isDetailLoading: boolean;
  payload: PortalRetrofitRecommendationsResponse | null;
  preview: UserRetrofitPreviewResult;
  seededDetailAnswers: Record<string, string>;
}) {
  const user = payload?.user || null;
  const intake = payload?.intake || null;
  const site = intake?.site || null;
  const geography = site?.geography || null;
  const summary = payload?.summary || null;
  const taxRuntime = payload?.taxRuntimePreview || null;
  const topRetrofit = preview.retrofits[0] || null;
  const dashboardDataset = payload?.dashboardPostImplementationDataset || null;
  const uploadedBillSteps = getBillUploadStepSummary(billUploadState);
  const answerRows = hideFormDetails
    ? []
    : buildUserPreviewProfileAnswerRows(preview.retrofits, detailAnswers, seededDetailAnswers);
  const headerName = profileText(user?.fullName || intake?.contact.fullName || preview.customerName);
  const headerCompany = profileText(user?.companyName || intake?.business.companyName);

  return (
    <div className="user-preview-profile-view" data-testid="user-preview-profile-view">
      <header className="user-preview-profile-header">
        <div>
          <p className="eyebrow">Profile info</p>
          <h1>{headerName}</h1>
          <p>{headerCompany}</p>
        </div>
        <div className="user-preview-profile-badges" aria-label="Profile view status">
          <span>Read-only</span>
          {user?.isFakeUser || dashboardDataset?.isSynthetic || payload?.source?.kind ? <span>Test/demo data</span> : null}
          {summary ? <span>{profileCount(summary.matchedRetrofitCount, "retrofit")} matched</span> : null}
        </div>
      </header>

      <div className="user-preview-profile-grid">
        <UserPreviewProfileCard title="Account">
          <UserPreviewProfileDetails
            rows={[
              { label: "User ID", value: profileText(user?.userId || preview.profileId) },
              { label: "Sample user ID", value: profileText(payload?.source?.sampleUserId) },
              { label: "Role", value: profileText(user?.role) },
              { label: "Status", value: profileText(user?.status) },
              { label: "Auth provider", value: profileText(user?.authProvider) },
              { label: "Google linked", value: profileBoolean(user?.googleLinked) },
              { label: "Password linked", value: profileBoolean(user?.passwordLinked) },
              { label: "Created", value: profileDate(user?.createdAt) },
              { label: "Last login", value: profileDate(user?.lastLoginAt) }
            ]}
          />
        </UserPreviewProfileCard>

        <UserPreviewProfileCard title="Contact">
          <UserPreviewProfileDetails
            rows={[
              { label: "Name", value: profileText(intake?.contact.fullName || user?.fullName) },
              { label: "Email", value: profileText(intake?.contact.email || user?.email) },
              { label: "Phone", value: profileText(intake?.contact.phone) },
              { label: "Role title", value: profileText(intake?.contact.roleTitle) },
              { label: "Preference", value: profileText(intake?.contact.contactPreference) },
              { label: "Submission ID", value: profileText(intake?.submissionId || preview.intakeId) },
              { label: "Submitted", value: profileDate(intake?.createdAt) },
              { label: "Updated", value: profileDate(intake?.updatedAt) }
            ]}
          />
        </UserPreviewProfileCard>

        <UserPreviewProfileCard title="Business">
          <UserPreviewProfileDetails
            rows={[
              { label: "Company", value: profileText(intake?.business.companyName || user?.companyName) },
              { label: "Website", value: profileWebsite(intake?.business.website) },
              { label: "Industry", value: profileText(intake?.business.industry) },
              { label: "Organization type", value: profileText(intake?.business.organizationType) },
              { label: "Organization size", value: profileText(intake?.business.organizationSize) },
              { label: "Headquarters", value: profileText(intake?.business.headquarters) }
            ]}
          />
        </UserPreviewProfileCard>

        <UserPreviewProfileCard title="Site and building" wide>
          <UserPreviewProfileDetails
            rows={[
              { label: "Address", value: profileText(site?.address) },
              { label: "Matched address", value: profileText(geography?.matchedAddress) },
              { label: "Geography status", value: profileText(geography?.status) },
              { label: "State", value: profileText(geography?.stateCode) },
              { label: "County", value: profileText(geography?.countyName) },
              { label: "Place", value: profileText(geography?.placeName) },
              { label: "ZIP", value: profileText(geography?.zip5) },
              { label: "Census tract", value: profileText(geography?.censusTractGeoid) },
              { label: "Electric utility", value: profileText(site?.electricUtilityProvider) },
              { label: "Gas utility", value: profileText(site?.gasUtilityProvider) },
              { label: "Ownership", value: profileText(site?.ownershipStatus) },
              { label: "Building type", value: profileText(site?.buildingType) },
              { label: "Square footage", value: profileText(site?.squareFootage) },
              { label: "Units", value: profileText(site?.numberOfUnits) },
              { label: "Derived fields", value: profileText(site?.derivedFieldsStatus) },
              { label: "Planned derived fields", value: profileList(site?.derivedFieldsPlanned) }
            ]}
          />
        </UserPreviewProfileCard>

        <UserPreviewProfileCard title="Sustainability">
          <UserPreviewProfileDetails
            rows={[
              { label: "Goals", value: profileText(intake?.sustainability.goals) },
              { label: "Challenges", value: profileText(intake?.sustainability.currentChallenges) },
              { label: "Interested improvements", value: profileList(intake?.sustainability.interestedImprovements) },
              { label: "Monthly utility spend", value: profileText(intake?.sustainability.monthlyUtilitySpend) },
              { label: "Timeline", value: profileText(intake?.sustainability.timeline) },
              { label: "Notes", value: profileText(intake?.sustainability.notes) }
            ]}
          />
        </UserPreviewProfileCard>

        <UserPreviewProfileCard title="Utility data" wide>
          {hideBillData ? (
            <p className="user-preview-profile-muted">Bill data is hidden in this admin preview.</p>
          ) : (
            <>
              <UserPreviewProfileDetails
                rows={[
                  { label: "Bill upload status", value: uploadedBillSteps.length ? profileList(uploadedBillSteps.map((step) => step.utilityLabel)) : "No uploaded bills in the active preview state" },
                  { label: "Uploaded files", value: profileCount(intake?.uploadedUtilityFiles.length, "file") },
                  { label: "Processed files", value: profileCount(intake?.siteEnergyProfile?.processedFileCount, "file") },
                  { label: "Available fields", value: profileCount(intake?.siteEnergyProfile?.availableFieldIds.length, "field") },
                  { label: "Latest provider", value: profileText(intake?.siteEnergyProfile?.latestUtilityProvider) },
                  { label: "Latest period", value: formatUtilityPeriod(intake?.siteEnergyProfile?.latestBillingPeriodStart || null, intake?.siteEnergyProfile?.latestBillingPeriodEnd || null) },
                  { label: "Annual kWh", value: profileNumber(intake?.siteEnergyProfile?.annualKwh, "kWh") },
                  { label: "Annual electric cost", value: profileCurrencyDollars(intake?.siteEnergyProfile?.annualElectricCost) },
                  { label: "Average cost per kWh", value: profileRate(intake?.siteEnergyProfile?.averageCostPerKwh, "kWh") },
                  { label: "Last updated", value: profileDate(intake?.siteEnergyProfile?.lastUpdatedAt) }
                ]}
              />
              <UserPreviewUtilitySummaries summaries={intake?.siteEnergyProfile?.utilitySummaries || []} />
              <UserPreviewUtilityFiles files={intake?.uploadedUtilityFiles || []} />
              <UserPreviewExtractedValues values={intake?.utilityExtractedValues || []} />
            </>
          )}
        </UserPreviewProfileCard>

        <UserPreviewProfileCard title="Recommendation profile" wide>
          <UserPreviewProfileDetails
            rows={[
              { label: "Generated", value: profileDate(payload?.generatedAt || preview.generatedAt) },
              { label: "Data source", value: profileText(payload?.source?.kind || preview.dataSourceLabel) },
              { label: "Estimate basis", value: estimateBasisLabel(preview.estimateBasis) },
              { label: "Completeness", value: preview.estimateCompletenessPercent == null ? "Not scored" : `${preview.estimateCompletenessPercent}%` },
              { label: "Matched retrofits", value: profileCount(summary?.matchedRetrofitCount ?? preview.retrofits.length, "retrofit") },
              { label: "Matched opportunities", value: profileCount(summary?.matchedOpportunityCount, "opportunity", "opportunities") },
              { label: "Opportunity display", value: summary?.canShowOpportunities === false ? "Blocked until required data is collected" : "Available for current payload" },
              { label: "Required tax inputs", value: profileCount(summary?.requiredTaxInputCount ?? taxRuntime?.requiredPreOpportunityInputs?.length, "input") },
              { label: "Top recommendation", value: profileText(topRetrofit?.name || preview.topRecommendation?.retrofitName) },
              { label: "Missing inputs", value: preview.missingInputs.length ? profileList(preview.missingInputs.slice(0, 8)) : "No missing inputs in the current preview" }
            ]}
          />
          {isDetailLoading ? <p className="user-preview-profile-muted">Detailed recommendation records are still loading.</p> : null}
          <UserPreviewTopRetrofits retrofits={preview.retrofits} />
        </UserPreviewProfileCard>

        <UserPreviewProfileCard title="Tax runtime">
          <UserPreviewProfileDetails
            rows={[
              { label: "Status", value: profileText(taxRuntime?.status) },
              { label: "Ready for opportunity estimate", value: profileBoolean(taxRuntime?.readyForOpportunityFinancialEstimate) },
              { label: "Opportunity display blocked", value: profileBoolean(taxRuntime?.opportunityDisplayBlocked) },
              { label: "Structured tax model work", value: profileBoolean(taxRuntime?.requiresStructuredTaxModelWork) },
              { label: "Included benefits", value: formatCents(taxRuntime?.totals?.includedBenefitCents) },
              { label: "Included liabilities", value: formatCents(taxRuntime?.totals?.includedLiabilityCents) },
              { label: "Included net amount", value: formatCents(taxRuntime?.totals?.includedAmountCents) },
              { label: "Summary tax benefit", value: formatCents(summary?.calculatedTaxBenefitCents) },
              { label: "Summary tax liability", value: formatCents(summary?.calculatedTaxLiabilityCents) },
              { label: "Summary net tax impact", value: formatCents(summary?.netTaxImpactCents) }
            ]}
          />
          <UserPreviewProfileList
            emptyMessage="No required tax inputs are listed in this payload."
            items={(taxRuntime?.requiredPreOpportunityInputs || []).slice(0, 8).map((field) => ({
              title: field.label || field.questionPrompt || field.inputKey,
              meta: profileList([
                field.collectionSurfaceLabel || field.collectionSurface,
                field.answerType,
                field.requiredBeforeOpportunitySelection ? "Required before opportunities" : field.requiredBeforeEstimate ? "Required before estimate" : null
              ]),
              detail: field.helperText || field.inputKey
            }))}
          />
        </UserPreviewProfileCard>

        <UserPreviewProfileCard title="Pre-retrofit form values" wide>
          {hideFormDetails ? (
            <p className="user-preview-profile-muted">Pre-retrofit form values are hidden in this admin preview.</p>
          ) : (
            <UserPreviewProfileList
              emptyMessage="No pre-retrofit form values are available in this preview yet."
              items={answerRows.map((row) => ({
                title: row.label,
                meta: row.value,
                detail: row.source
              }))}
            />
          )}
        </UserPreviewProfileCard>

        {dashboardDataset ? (
          <UserPreviewProfileCard title="Synthetic dashboard data" wide>
            <UserPreviewProfileDetails
              rows={[
                { label: "Dataset test case", value: profileText(dashboardDataset.testCaseId) },
                { label: "Synthetic source", value: profileText(dashboardDataset.syntheticSource) },
                { label: "Reporting period", value: profileText(dashboardDataset.reportingPeriod?.label) },
                { label: "Properties", value: profileCount(dashboardDataset.properties.length, "property", "properties") },
                { label: "Implemented retrofits", value: profileCount(dashboardDataset.implementedRetrofits.length, "retrofit") },
                { label: "Monthly performance records", value: profileCount(dashboardDataset.monthlyPerformanceRecords.length, "record") },
                { label: "Incentive records", value: profileCount(dashboardDataset.incentivePerformanceRecords.length, "record") },
                { label: "Document records", value: profileCount(dashboardDataset.documentRecords.length, "record") },
                { label: "Certification records", value: profileCount(dashboardDataset.certificationRecords.length, "record") },
                { label: "Next best actions", value: profileCount(dashboardDataset.nextBestActions.length, "action") }
              ]}
            />
          </UserPreviewProfileCard>
        ) : null}
      </div>
    </div>
  );
}

function UserPreviewProfileCard({ children, title, wide = false }: { children: ReactNode; title: string; wide?: boolean }) {
  return (
    <section className={`user-preview-profile-card${wide ? " user-preview-profile-card-wide" : ""}`}>
      <h2 className="user-preview-profile-card-heading">{title}</h2>
      {children}
    </section>
  );
}

function UserPreviewProfileDetails({ rows }: { rows: UserPreviewProfileDetailRow[] }) {
  return (
    <dl className="user-preview-profile-details">
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value ?? "Not recorded"}</dd>
        </div>
      ))}
    </dl>
  );
}

function UserPreviewProfileList({
  emptyMessage,
  items
}: {
  emptyMessage: string;
  items: UserPreviewProfileListItem[];
}) {
  if (items.length === 0) return <p className="user-preview-profile-muted">{emptyMessage}</p>;
  return (
    <div className="user-preview-profile-list">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`}>
          <strong>{item.title}</strong>
          {item.meta ? <span>{item.meta}</span> : null}
          {item.detail ? <p>{item.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}

function UserPreviewUtilitySummaries({ summaries }: { summaries: SiteEnergyProfile["utilitySummaries"] }) {
  const items = summaries.map((summary) => ({
    title: formatUtilityCategory(summary.utilityCategory),
    meta: profileList([
      summary.latestUtilityProvider,
      profileCount(summary.uploadedFileCount, "file"),
      profileCount(summary.processedFileCount, "processed file")
    ]),
    detail: profileList([
      summary.annualUsage == null ? null : `${profileNumber(summary.annualUsage, summary.usageUnit || undefined)} annual usage`,
      summary.annualCost == null ? null : `${profileCurrencyDollars(summary.annualCost)} annual cost`,
      summary.averageUnitCost == null ? null : `${profileRate(summary.averageUnitCost, summary.usageUnit || undefined)} average rate`,
      formatUtilityPeriod(summary.latestBillingPeriodStart, summary.latestBillingPeriodEnd),
      summary.lastUpdatedAt ? `Updated ${profileDate(summary.lastUpdatedAt)}` : null
    ])
  }));
  return (
    <div className="user-preview-profile-subsection">
      <h3>Utility summaries</h3>
      <UserPreviewProfileList emptyMessage="No utility summaries are available." items={items} />
    </div>
  );
}

function UserPreviewUtilityFiles({ files }: { files: UploadedUtilityFile[] }) {
  const items = files.map((file) => ({
    title: file.originalFilename || `${formatUtilityCategory(file.utilityCategory)} bill`,
    meta: profileList([
      formatUtilityCategory(file.utilityCategory),
      energyDataSourceTypeLabels[file.fileType] || "Unknown utility file",
      formatProcessingStatus(file.processingStatus)
    ]),
    detail: profileList([
      file.utilityProvider,
      file.uploadedAt ? `Uploaded ${profileDate(file.uploadedAt)}` : null,
      file.processedAt ? `Processed ${profileDate(file.processedAt)}` : null
    ])
  }));
  return (
    <div className="user-preview-profile-subsection">
      <h3>Uploaded files</h3>
      <UserPreviewProfileList emptyMessage="No uploaded utility files are available." items={items} />
    </div>
  );
}

function UserPreviewExtractedValues({ values }: { values: UtilityExtractedValue[] }) {
  const items = values.slice(0, 12).map((value) => ({
    title: value.fieldDisplayName || value.fieldId,
    meta: profileList([
      formatUtilityFieldValue(value),
      value.confidence ? `${capitalizeLabel(value.confidence)} confidence` : null,
      energyDataSourceTypeLabels[value.sourceType] || "Unknown source"
    ]),
    detail: formatUtilityPeriod(value.periodStart, value.periodEnd)
  }));
  return (
    <div className="user-preview-profile-subsection">
      <h3>Extracted values</h3>
      <UserPreviewProfileList emptyMessage="No extracted utility values are available." items={items} />
    </div>
  );
}

function UserPreviewTopRetrofits({ retrofits }: { retrofits: RetrofitPreviewCard[] }) {
  const items = retrofits.slice(0, 6).map((retrofit) => ({
    title: retrofit.name,
    meta: profileList([
      retrofit.confidenceLabel,
      estimateBasisLabel(retrofit.estimateBasis),
      profileCount(retrofit.opportunities.length, "opportunity", "opportunities")
    ]),
    detail: profileList([
      retrofit.tabSummary.primaryMetricValue == null ? null : `${retrofit.tabSummary.primaryMetricLabel}: ${retrofit.tabSummary.primaryMetricValue}`,
      retrofit.metrics.effectiveCostAfterOneTimeBenefits == null ? null : `Net cost ${formatCents(retrofit.metrics.effectiveCostAfterOneTimeBenefits)}`,
      retrofit.missingInfo.length ? `${retrofit.missingInfo.length} missing input(s)` : "No missing inputs listed"
    ])
  }));
  return (
    <div className="user-preview-profile-subsection">
      <h3>Top retrofits</h3>
      <UserPreviewProfileList emptyMessage="No retrofits are available." items={items} />
    </div>
  );
}

function buildUserPreviewProfileAnswerRows(
  retrofits: RetrofitPreviewCard[],
  detailAnswers: Record<string, string>,
  seededDetailAnswers: Record<string, string>
) {
  const rows: Array<UserPreviewProfileDetailRow & { source: string }> = [];
  const seenQuestionIds = new Set<string>();
  for (const retrofit of retrofits) {
    for (const question of getRetrofitFormQuestions(retrofit, detailAnswers)) {
      if (seenQuestionIds.has(question.id)) continue;
      seenQuestionIds.add(question.id);
      const answer = detailAnswers[question.id] ?? seededDetailAnswers[question.id] ?? question.answer;
      if (answer == null || String(answer).trim() === "") continue;
      const seeded = seededDetailAnswers[question.id] != null && String(seededDetailAnswers[question.id]) === String(answer);
      rows.push({
        label: `${retrofit.name}: ${question.question}`,
        value: String(answer),
        source: seeded ? "Seeded preview value" : "Current preview session value"
      });
    }
  }
  return rows.slice(0, 18);
}

function profileText(value: string | number | boolean | null | undefined) {
  if (value == null) return "Not recorded";
  const text = String(value).trim();
  return text || "Not recorded";
}

function profileBoolean(value: boolean | null | undefined) {
  if (value == null) return "Not recorded";
  return value ? "Yes" : "No";
}

function profileDate(value: string | null | undefined) {
  return value ? formatDate(value) : "Not recorded";
}

function profileNumber(value: number | null | undefined, unit?: string) {
  if (value == null || !Number.isFinite(value)) return "Not recorded";
  const formatted = new Intl.NumberFormat("en-US", { maximumFractionDigits: value < 10 ? 2 : 0 }).format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}

function profileCurrencyDollars(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "Not recorded";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function profileRate(value: number | null | undefined, unit?: string) {
  if (value == null || !Number.isFinite(value)) return "Not recorded";
  const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 4 }).format(value);
  return unit ? `${formatted} / ${unit}` : formatted;
}

function profileCount(count: number | null | undefined, singular: string, plural?: string) {
  if (count == null || !Number.isFinite(count)) return "Not recorded";
  return `${count.toLocaleString()} ${count === 1 ? singular : plural || `${singular}s`}`;
}

function profileList(values: Array<string | number | boolean | null | undefined> | null | undefined) {
  const items = (values || [])
    .map((value) => (value == null ? "" : String(value).trim()))
    .filter(Boolean);
  return items.length ? items.join(", ") : "Not recorded";
}

function profileWebsite(value: string | null | undefined) {
  const text = value?.trim();
  if (!text) return "Not recorded";
  const href = /^https?:\/\//i.test(text) ? text : `https://${text}`;
  return (
    <a href={href} rel="noreferrer" target="_blank">
      {text}
    </a>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

function useTypewriterSequence(
  lines: ReadonlyArray<{ id: string; text: string }>,
  {
    enabled,
    characterDelayMs = 20,
    getCharacterDelayMs,
    linePauseMs = 120
  }: {
    enabled: boolean;
    characterDelayMs?: number;
    getCharacterDelayMs?: (line: { id: string; text: string }) => number;
    linePauseMs?: number;
  }
) {
  const [displayedLines, setDisplayedLines] = useState<Record<string, string>>(() =>
    Object.fromEntries(lines.map((line) => [line.id, enabled ? "" : line.text]))
  );
  const [isComplete, setIsComplete] = useState(!enabled);
  const completeNow = useCallback(() => {
    setDisplayedLines(Object.fromEntries(lines.map((line) => [line.id, line.text])));
    setIsComplete(true);
  }, [lines]);

  useEffect(() => {
    if (!enabled) {
      completeNow();
      return;
    }

    let cancelled = false;
    let timeoutId = 0;
    setDisplayedLines(Object.fromEntries(lines.map((line) => [line.id, ""])));
    setIsComplete(false);

    function typeLine(lineIndex: number, characterIndex: number) {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setIsComplete(true);
        return;
      }
      const line = lines[lineIndex];
      setDisplayedLines((current) => ({
        ...current,
        [line.id]: line.text.slice(0, characterIndex)
      }));
      if (characterIndex <= line.text.length) {
        timeoutId = window.setTimeout(
          () => typeLine(lineIndex, characterIndex + 1),
          getCharacterDelayMs?.(line) ?? characterDelayMs
        );
        return;
      }
      timeoutId = window.setTimeout(() => typeLine(lineIndex + 1, 0), linePauseMs);
    }

    timeoutId = window.setTimeout(() => typeLine(0, 0), 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [characterDelayMs, completeNow, enabled, getCharacterDelayMs, linePauseMs, lines]);

  return { completeNow, displayedLines, isComplete };
}

function ProcessOnboardingModal({
  animateText,
  onClose
}: {
  animateText: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimateText = animateText && !prefersReducedMotion;
  const getProcessTypingDelay = useCallback((line: { id: string; text: string }) => (
    line.id.startsWith("step") ? 34 : 20
  ), []);
  const { completeNow, displayedLines, isComplete } = useTypewriterSequence(PROCESS_ONBOARDING_LINES, {
    enabled: shouldAnimateText,
    getCharacterDelayMs: getProcessTypingDelay
  });
  const [flightStyle, setFlightStyle] = useState<CSSProperties | null>(null);
  const [flightActive, setFlightActive] = useState(false);

  useEffect(() => {
    nextButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        completeOnboarding();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function completeOnboarding() {
    if (shouldAnimateText && !isComplete) {
      completeNow();
      window.setTimeout(startFlightToNav, 30);
      return;
    }
    startFlightToNav();
  }

  function startFlightToNav() {
    if (prefersReducedMotion) {
      onClose();
      return;
    }

    const modalRect = modalRef.current?.getBoundingClientRect();
    const targetRect = document.querySelector<HTMLElement>("[data-instructions-nav-item='true']")?.getBoundingClientRect();
    if (!modalRect || !targetRect) {
      onClose();
      return;
    }

    const scale = Math.max(0.16, Math.min(0.24, targetRect.width / modalRect.width));
    setFlightStyle({
      "--process-flight-left": `${modalRect.left}px`,
      "--process-flight-top": `${modalRect.top}px`,
      "--process-flight-width": `${modalRect.width}px`,
      "--process-flight-height": `${modalRect.height}px`,
      "--process-flight-x": `${targetRect.left + targetRect.width / 2 - (modalRect.left + modalRect.width / 2)}px`,
      "--process-flight-y": `${targetRect.top + targetRect.height / 2 - (modalRect.top + modalRect.height / 2)}px`,
      "--process-flight-scale": String(scale)
    } as CSSProperties);
    window.requestAnimationFrame(() => setFlightActive(true));
    window.setTimeout(onClose, 820);
  }

  const title = displayedLines.title || "";
  const step1 = visibleProcessStepText(displayedLines.step1 || "", "Step 1: ");
  const step2 = visibleProcessStepText(displayedLines.step2 || "", "Step 2: ");
  const step3 = visibleProcessStepText(displayedLines.step3 || "", "Step 3: ");
  const step4 = visibleProcessStepText(displayedLines.step4 || "", "Step 4: ");
  const step5 = visibleProcessStepText(displayedLines.step5 || "", "Step 5: ");
  const note = displayedLines.note || "";
  const activeLineId = PROCESS_ONBOARDING_LINES.find((line) => displayedLines[line.id] !== line.text)?.id;

  return (
    <div className="process-onboarding-backdrop" data-testid="process-onboarding-modal">
      <div className="sr-only" aria-live="off">
        The Process. Step 1: Upload your bills. Step 2: Choose a retrofit and answer a few questions. Step 3: Get your opportunities, metrics, and more. Step 4: Receive implementation and application support. Step 5: View your dashboard. Note: Once you proceed with a retrofit and confirm, other retrofit data will adjust accordingly for future selection.
      </div>
      <section
        aria-labelledby="process-onboarding-title"
        aria-modal="true"
        className={`process-onboarding-modal${flightStyle ? " is-original-hidden" : ""}`}
        ref={modalRef}
        role="dialog"
      >
        <h2 className="sr-only" id="process-onboarding-title">The Process</h2>
        <div aria-hidden="true" className="process-editor-content">
          <div className="process-editor-body">
            <h2 className="process-editor-title">
              <ProcessAccentText text={title} accent="The Process" />
              <TypewriterCaret show={shouldAnimateText && activeLineId === "title"} />
            </h2>
            <div className="process-step-list">
              <ProcessStep
                active={shouldAnimateText && activeLineId === "step1"}
                accent="Upload"
                number="1"
                text={step1}
              />
              <ProcessStep
                active={shouldAnimateText && activeLineId === "step2"}
                accent="Choose"
                number="2"
                text={step2}
              />
            <ProcessStep
              active={shouldAnimateText && activeLineId === "step3"}
              accent="Get"
              number="3"
              text={step3}
            />
            <ProcessStep
              active={shouldAnimateText && activeLineId === "step4"}
              accent="Receive"
              number="4"
              text={step4}
            />
            <ProcessStep
              active={shouldAnimateText && activeLineId === "step5"}
              accent="View"
              number="5"
              text={step5}
            />
          </div>
          <div className="process-note">
            <ProcessAccentText text={note} accent="Note:" />
            <TypewriterCaret show={shouldAnimateText && activeLineId === "note"} />
          </div>
          </div>
          <div className="process-modal-footer">
            <button className="process-next-button" onClick={completeOnboarding} ref={nextButtonRef} type="button">
              Next
            </button>
          </div>
        </div>
      </section>
      {flightStyle ? (
        <section
          aria-hidden="true"
          className={`process-onboarding-flight${flightActive ? " is-active" : ""}`}
          style={flightStyle}
        >
          <div className="process-editor-content">
          <h2 className="process-editor-title"><ProcessAccentText text="The Process" accent="The Process" /></h2>
          <div className="process-step-list">
            <ProcessStep number="1" text="Upload your bills" accent="Upload" />
            <ProcessStep number="2" text="Choose a retrofit and answer a few questions" accent="Choose" />
            <ProcessStep number="3" text="Get your opportunities, metrics, and more" accent="Get" />
            <ProcessStep number="4" text="Receive implementation and application support" accent="Receive" />
            <ProcessStep number="5" text="View your dashboard" accent="View" />
          </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function TypewriterCaret({ show }: { show: boolean }) {
  return show ? <span className="typewriter-caret" aria-hidden="true" /> : null;
}

function visibleProcessStepText(text: string, prefix: string) {
  if (!text) return "";
  if (prefix.startsWith(text)) return "";
  if (text.startsWith(prefix)) return text.slice(prefix.length);
  return text;
}

function ProcessAccentText({ accent, text }: { accent: string; text: string }) {
  if (!text) return null;
  const accentIndex = text.indexOf(accent);
  if (accentIndex === -1 && accent.startsWith(text)) return <span className="code-accent">{text}</span>;
  if (accentIndex === -1) return <span>{text}</span>;
  const before = text.slice(0, accentIndex);
  const highlighted = text.slice(accentIndex, accentIndex + accent.length);
  const after = text.slice(accentIndex + accent.length);
  return (
    <>
      {before}
      <span className="code-accent">{highlighted}</span>
      {after}
    </>
  );
}

function ProcessStep({ accent, active = false, number, text }: { accent: string; active?: boolean; number: string; text: string }) {
  return (
    <div className={`process-step-row${active ? " is-active" : ""}`}>
      <span className="process-number">{number}.</span>
      <p>{text ? <ProcessAccentText text={text} accent={accent} /> : "\u00a0"}{active ? <TypewriterCaret show /> : null}</p>
    </div>
  );
}

function UserPreviewSidebar({
  activeDashboardPage,
  activeRetrofitId,
  activeView,
  collapsed,
  instructionsPulse,
  mobileOpen,
  onCloseMobile,
  onOpenDashboardPage,
  onOpenInstructions,
  onOpenProfile,
  onSelectRetrofit,
  onShowAllRetrofits,
  onToggleCollapsed,
  retrofits
}: {
  activeDashboardPage: DashboardPageId;
  activeRetrofitId: string;
  activeView: UserPreviewPrimaryView;
  collapsed: boolean;
  instructionsPulse: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenDashboardPage: (pageId: DashboardPageId) => void;
  onOpenInstructions: () => void;
  onOpenProfile: () => void;
  onSelectRetrofit: (retrofitId: string) => void;
  onShowAllRetrofits: () => void;
  onToggleCollapsed: () => void;
  retrofits: RetrofitPreviewCard[];
}) {
  const [retrofitsOpen, setRetrofitsOpen] = useState(false);
  const activeNavRetrofitId = activeRetrofitId;
  const dashboardOpen = activeView === "dashboard";
  useEffect(() => {
    if (activeRetrofitId) setRetrofitsOpen(true);
  }, [activeRetrofitId]);
  return (
    <>
      {mobileOpen ? <button aria-label="Close retrofit navigation" className="user-preview-sidebar-scrim" onClick={onCloseMobile} type="button" /> : null}
      <aside className={`user-preview-sidebar${mobileOpen ? " is-mobile-open" : ""}`} aria-label="RetroFi navigation">
        <button
          aria-label={collapsed ? "Expand retrofit navigation" : "Collapse retrofit navigation"}
          className="user-preview-sidebar-collapse"
          onClick={onToggleCollapsed}
          type="button"
        >
          <ChevronDownIcon />
        </button>
        <nav className="user-preview-sidebar-nav" aria-label="Retrofit navigation">
          <button
            aria-expanded={retrofitsOpen}
            className={`sidebar-nav-row sidebar-section-trigger${activeView === "retrofits" ? " is-active" : ""}`}
            onClick={() => {
              if (activeRetrofitId) {
                onShowAllRetrofits();
                return;
              }
              setRetrofitsOpen((current) => !current);
            }}
            type="button"
          >
            <HomeOutlineIcon />
            <span className="sidebar-label">Retrofits</span>
            <ChevronDownIcon />
          </button>
          {retrofitsOpen ? (
            <div className="sidebar-retrofit-list">
              {retrofits.map((retrofit) => (
                <button
                  className={`sidebar-retrofit-item${activeNavRetrofitId === retrofit.id ? " is-active" : ""}`}
                  key={retrofit.id}
                  onClick={() => onSelectRetrofit(retrofit.id)}
                  type="button"
                >
                  <SidebarRetrofitIcon retrofit={retrofit} />
                  <span className="sidebar-label">{retrofit.name}</span>
                </button>
              ))}
            </div>
          ) : null}
          <div className="user-preview-sidebar-secondary" role="group" aria-label="Profile navigation">
            <button
              className={`sidebar-nav-row sidebar-secondary-item sidebar-profile-item${activeView === "profile" ? " is-active" : ""}`}
              onClick={onOpenProfile}
              type="button"
            >
              <ProfileInfoIcon />
              <span className="sidebar-label">Profile info</span>
            </button>
            <button
              aria-expanded={dashboardOpen}
              className={`sidebar-nav-row sidebar-secondary-item sidebar-dashboard-item${dashboardOpen ? " is-active" : ""}`}
              onClick={() => onOpenDashboardPage(activeDashboardPage || "summary")}
              type="button"
            >
              <DashboardIcon />
              <span className="sidebar-label">Dashboard</span>
              <ChevronDownIcon />
            </button>
            {dashboardOpen ? (
              <div className="sidebar-dashboard-subnav" aria-label="Dashboard sections">
                {DASHBOARD_MAIN_PAGES.map((page) => (
                  <button
                    className={`sidebar-dashboard-subitem${activeDashboardPage === page.id ? " is-active" : ""}`}
                    key={page.id}
                    onClick={() => onOpenDashboardPage(page.id)}
                    type="button"
                  >
                    <span aria-hidden="true" />
                    <span className="sidebar-label">{page.label}</span>
                  </button>
                ))}
              </div>
            ) : null}
            <button
              className={`sidebar-nav-row sidebar-secondary-item sidebar-instructions-item${instructionsPulse ? " is-pulsing" : ""}`}
              data-instructions-nav-item="true"
              onClick={onOpenInstructions}
              type="button"
            >
              <InstructionsIcon />
              <span className="sidebar-label">Instructions</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

function DashboardPerformanceHub({
  activePage,
  onPageChange,
  viewModel
}: {
  activePage: DashboardPageId;
  onPageChange: (page: DashboardPageId) => void;
  viewModel: DashboardViewModel;
}) {
  const [financialTab, setFinancialTab] = useState<FinancialDashboardTabId>("overview");
  const [environmentalTab, setEnvironmentalTab] = useState<EnvironmentalDashboardTabId>("overview");
  const [certificationTab, setCertificationTab] = useState<CertificationDashboardTabId>("progress");
  const [selectedPeriod, setSelectedPeriod] = useState(viewModel.periodLabel);
  const [selectedProperty, setSelectedProperty] = useState(viewModel.selectedProperty);
  const pageCopy: Record<DashboardPageId, { title: string; subtitle: string }> = {
    summary: {
      title: "Performance Dashboard",
      subtitle: "Cross-portfolio overview of implemented retrofits."
    },
    financial: {
      title: "Financial Performance",
      subtitle: financialTab === "savings-by-retrofit"
        ? "Performance across individual implemented retrofits."
        : "Realized, current, and projected financial value across implemented retrofits."
    },
    environmental: {
      title: environmentalTab === "outlook" ? "Impact Outlook & Equivalencies" : "Environmental Impact",
      subtitle: environmentalTab === "outlook"
        ? "Understand environmental impact, equivalent benefits, and future potential."
        : "Measured and projected sustainability performance across implemented retrofits."
    },
    certifications: {
      title: certificationTab === "gaps" ? "Certification Gaps & Readiness" : certificationTab === "next-actions" ? "Next Best Actions" : "Certification Progress",
      subtitle: certificationTab === "gaps"
        ? "See what is missing and what is already prepared."
        : certificationTab === "next-actions"
          ? "Move faster toward certification and stronger portfolio performance."
          : "Track readiness, earned credits, and remaining gaps."
    }
  };

  return (
    <div className="dashboard-hub" data-testid="post-implementation-dashboard">
      <DashboardPageHeader
        activePage={activePage}
        onPageChange={onPageChange}
        periodLabel={selectedPeriod}
        properties={viewModel.properties}
        selectedProperty={selectedProperty}
        subtitle={pageCopy[activePage].subtitle}
        title={pageCopy[activePage].title}
        onPeriodChange={setSelectedPeriod}
        onPropertyChange={setSelectedProperty}
      />
      {!viewModel.dataQuality.hasImplementedRetrofits ? (
        <DashboardEmptyNotice notes={viewModel.dataQuality.notes} />
      ) : null}
      {activePage === "summary" ? <DashboardSummaryPage viewModel={viewModel} /> : null}
      {activePage === "financial" ? (
        <DashboardFinancialPage activeTab={financialTab} onTabChange={setFinancialTab} viewModel={viewModel} />
      ) : null}
      {activePage === "environmental" ? (
        <DashboardEnvironmentalPage activeTab={environmentalTab} onTabChange={setEnvironmentalTab} viewModel={viewModel} />
      ) : null}
      {activePage === "certifications" ? (
        <DashboardCertificationsPage activeTab={certificationTab} onTabChange={setCertificationTab} viewModel={viewModel} />
      ) : null}
    </div>
  );
}

function DashboardPageHeader({
  activePage,
  onPageChange,
  onPeriodChange,
  onPropertyChange,
  periodLabel,
  properties,
  selectedProperty,
  subtitle,
  title
}: {
  activePage: DashboardPageId;
  onPageChange: (page: DashboardPageId) => void;
  onPeriodChange: (value: string) => void;
  onPropertyChange: (value: string) => void;
  periodLabel: string;
  properties: string[];
  selectedProperty: string;
  subtitle: string;
  title: string;
}) {
  return (
    <header className="dashboard-page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="dashboard-header-controls">
        <label>
          <span className="sr-only">Date range</span>
          <select value={periodLabel} onChange={(event) => onPeriodChange(event.target.value)}>
            <option>{periodLabel}</option>
            <option>Year to date</option>
            <option>Lifetime</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Portfolio or property</span>
          <select value={selectedProperty} onChange={(event) => onPropertyChange(event.target.value)}>
            {properties.map((property) => <option key={property}>{property}</option>)}
          </select>
        </label>
      </div>
      <nav className="dashboard-main-tabs" aria-label="Dashboard pages">
        {DASHBOARD_MAIN_PAGES.map((page) => (
          <button
            className={activePage === page.id ? "is-active" : ""}
            key={page.id}
            onClick={() => onPageChange(page.id)}
            type="button"
          >
            {page.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function DashboardEmptyNotice({ notes }: { notes: string[] }) {
  return (
    <section className="dashboard-empty-state">
      <strong>No implemented retrofits yet</strong>
      <p>{notes[0] || "Performance tracking will appear after implementation data is available."}</p>
    </section>
  );
}

function DashboardSummaryPage({ viewModel }: { viewModel: DashboardViewModel }) {
  return (
    <div className="dashboard-page-stack">
      <DashboardKpiGrid metrics={viewModel.summary.kpis} />
      <DashboardThreeStateCards realized={viewModel.summary.realized} current={viewModel.summary.current} projected={viewModel.summary.projected} />
      <div className="dashboard-two-column">
        <DashboardCard title="Financial Snapshot">
          <DashboardLineChart data={viewModel.financial.cashFlowSeries} valuePrefix="$" />
          <DashboardDonutChart
            centerLabel={formatDashboardCurrencyCents(viewModel.financial.incentivesReceivedCents)}
            segments={[
              { label: "Received", value: viewModel.financial.incentivesReceivedCents ?? 0, tone: "green" },
              { label: "Pending", value: viewModel.financial.incentivesPendingCents ?? 0, tone: "blue" },
              { label: "Not Yet Claimed", value: viewModel.financial.incentivesNotClaimedCents ?? 0, tone: "gray" }
            ]}
          />
          <DashboardInlineAction label="View financial details" />
        </DashboardCard>
        <DashboardCard title="Environmental Snapshot">
          <DashboardLineChart data={viewModel.environmental.impactSeries} valueSuffix=" MT" />
          <div className="dashboard-mini-metric-list">
            <DashboardMetricMini metric={dashboardMetric("kWh Saved", formatDashboardNumber(viewModel.environmental.totalKwhSavedPerYear, "kWh"), "Electricity savings", "green", viewModel.environmental.totalKwhSavedPerYear == null)} />
            <DashboardMetricMini metric={dashboardMetric("Therms Reduced", formatDashboardNumber(viewModel.environmental.totalThermsReducedPerYear, "therms"), "Natural gas", "green", viewModel.environmental.totalThermsReducedPerYear == null)} />
            <DashboardMetricMini metric={dashboardMetric("Water Saved", formatDashboardNumber(viewModel.environmental.totalWaterSavedPerYear, "gal"), "Water savings", "blue", viewModel.environmental.totalWaterSavedPerYear == null)} />
          </div>
          <DashboardInlineAction label="View environmental details" />
        </DashboardCard>
      </div>
      <div className="dashboard-three-column">
        <DashboardCertificationPreview programs={viewModel.certifications.programs} />
        <DashboardNextActionsPreview actions={viewModel.certifications.nextActions.slice(0, 3)} />
        <DashboardImplementedRetrofitsTable retrofits={viewModel.implementedRetrofits.slice(0, 5)} compact />
      </div>
    </div>
  );
}

function DashboardFinancialPage({
  activeTab,
  onTabChange,
  viewModel
}: {
  activeTab: FinancialDashboardTabId;
  onTabChange: (tab: FinancialDashboardTabId) => void;
  viewModel: DashboardViewModel;
}) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="dashboard-page-stack">
      <div className="dashboard-financial-toolbar">
        <DashboardSubTabs tabs={FINANCIAL_DASHBOARD_TABS} activeTab={activeTab} onTabChange={onTabChange} />
        <button onClick={() => setQuoteModalOpen(true)} type="button">
          Add quote
        </button>
      </div>
      {activeTab === "overview" ? <FinancialOverview viewModel={viewModel} /> : null}
      {activeTab === "cash-flow" ? <FinancialCashFlow viewModel={viewModel} /> : null}
      {activeTab === "savings-by-retrofit" ? <FinancialSavingsByRetrofit viewModel={viewModel} /> : null}
      {quoteModalOpen ? <AddQuotePlaceholderModal onClose={() => setQuoteModalOpen(false)} /> : null}
    </div>
  );
}

function AddQuotePlaceholderModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop quote-modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="save-results-modal quote-placeholder-modal" role="dialog" aria-modal="true" aria-labelledby="quote-placeholder-title">
        <button className="modal-close-button" onClick={onClose} type="button">Close</button>
        <div className="modal-copy">
          <p className="eyebrow">Project quote</p>
          <h2 id="quote-placeholder-title">Quote capture is coming soon</h2>
          <p>
            RetroFi is not changing this financial model yet. Keep contractor quotes with the project record for now, and quote entry will replace modeled project costs when the form is ready.
          </p>
        </div>
        {/* TODO: Replace this placeholder with the project quote capture form once quote storage is defined. */}
      </section>
    </div>
  );
}

function FinancialOverview({ viewModel }: { viewModel: DashboardViewModel }) {
  const financial = viewModel.financial;
  return (
    <>
      <DashboardKpiGrid metrics={[
        dashboardMetric("Total Project Cost", formatDashboardCurrencyCents(financial.totalProjectCostCents), "Across implemented retrofits", "green", financial.totalProjectCostCents == null),
        dashboardMetric("Incentives Received", formatDashboardCurrencyCents(financial.incentivesReceivedCents), "Received or approved", "green", financial.incentivesReceivedCents == null),
        dashboardMetric("Net Project Cost", formatDashboardCurrencyCents(financial.netProjectCostCents), "After incentives", "green", financial.netProjectCostCents == null),
        dashboardMetric("Annual Savings", formatDashboardCurrencyCents(financial.totalAnnualSavingsCents), "Recurring savings", "green", financial.totalAnnualSavingsCents == null),
        dashboardMetric("Monthly Savings", formatDashboardCurrencyCents(financial.totalMonthlySavingsCents), "Average monthly", "green", financial.totalMonthlySavingsCents == null),
        dashboardMetric("ROI", formatDashboardPercent(financial.roiPercent), "Average across portfolio", "green", financial.roiPercent == null),
        dashboardMetric("Payback Date", financial.paybackDateLabel, "Estimated", "green", financial.paybackDateLabel === "Unavailable")
      ]} />
      <DashboardThreeStateCards realized={financial.realized} current={financial.current} projected={financial.projected} />
      <div className="dashboard-three-column">
        <DashboardCard title="Cumulative Cash Flow">
          <DashboardLineChart data={financial.cashFlowSeries} valuePrefix="$" />
          <DashboardInlineAction label="View cash flow details" />
        </DashboardCard>
        <DashboardCard title="One-Time Cost">
          <DashboardWaterfallChart
            items={[
              { label: "Total Project Cost", value: financial.totalProjectCostCents ?? 0 },
              { label: "Incentives Received", value: -(financial.incentivesReceivedCents ?? 0) },
              { label: "Other Credits", value: 0 },
              { label: "Net Project Cost", value: financial.netProjectCostCents ?? 0 }
            ]}
          />
          <DashboardInlineAction label="View cost breakdown" />
        </DashboardCard>
        <DashboardCard title="Incentive Tracking">
          <DashboardDonutChart
            centerLabel={formatDashboardCurrencyCents(financial.incentivesReceivedCents)}
            segments={[
              { label: "Approved", value: financial.incentivesApprovedCents ?? 0, tone: "green" },
              { label: "Received", value: financial.incentivesReceivedCents ?? 0, tone: "blue" },
              { label: "Pending", value: financial.incentivesPendingCents ?? 0, tone: "purple" },
              { label: "Not Yet Claimed", value: financial.incentivesNotClaimedCents ?? 0, tone: "gray" }
            ]}
          />
          <DashboardInlineAction label="View incentives" />
        </DashboardCard>
      </div>
      <div className="dashboard-three-column">
        <DashboardCard title="Recurring Savings Breakdown">
          <DashboardStackedBar segments={[
            { label: "Energy Savings", value: financial.totalAnnualSavingsCents ?? 0, tone: "green" },
            { label: "Maintenance/O&M", value: 0, tone: "blue" },
            { label: "Tax benefits", value: 0, tone: "gray" }
          ]} totalLabel={formatDashboardCurrencyCents(financial.totalAnnualSavingsCents)} />
        </DashboardCard>
        <DashboardCard title="Actual vs. Estimated Performance">
          <DashboardInfoRows rows={[
            ["Annual Savings", formatDashboardCurrencyCents(financial.totalAnnualSavingsCents)],
            ["Estimated Annual Savings", formatDashboardCurrencyCents(financial.totalAnnualSavingsCents)],
            ["Performance Status", viewModel.dataQuality.basisLabel === "actual" ? "Actual" : viewModel.dataQuality.basisLabel === "unavailable" ? "Unavailable" : "Modeled / tracking pending"]
          ]} />
          <DashboardInlineAction label="View performance details" />
        </DashboardCard>
        <DashboardCard title="Key Takeaways">
          <ul className="dashboard-check-list">
            <li>Portfolio performance appears after implemented retrofit data is available.</li>
            <li>Incentive progress is separated from operating savings.</li>
            <li>Projected values are kept separate from realized/current values.</li>
          </ul>
          <DashboardInlineAction label="View recommendations" />
        </DashboardCard>
      </div>
    </>
  );
}

function FinancialCashFlow({ viewModel }: { viewModel: DashboardViewModel }) {
  return (
    <div className="dashboard-two-column">
      <DashboardCard title="Cumulative Cash Flow Details">
        <DashboardLineChart data={viewModel.financial.cashFlowSeries} valuePrefix="$" large />
        <DashboardInlineAction label="View full cash flow trend" />
      </DashboardCard>
      <DashboardCard title="Pending Claims Requiring Action">
        <DashboardActionList actions={viewModel.certifications.nextActions.filter((action) => action.category === "financial" || action.category === "document")} />
        <DashboardInlineAction label="View action plan" />
      </DashboardCard>
      <DashboardCard title="Expected Incentive Payout Dates">
        <DashboardInfoRows rows={[
          ["Approved", formatDashboardCurrencyCents(viewModel.financial.incentivesApprovedCents)],
          ["Pending", formatDashboardCurrencyCents(viewModel.financial.incentivesPendingCents)],
          ["Not Yet Claimed", formatDashboardCurrencyCents(viewModel.financial.incentivesNotClaimedCents)]
        ]} />
      </DashboardCard>
      <DashboardCard title="Projected Remaining Incentive Value">
        <strong className="dashboard-large-value">{formatDashboardCurrencyCents(sumNullableNumbers([viewModel.financial.incentivesPendingCents, viewModel.financial.incentivesNotClaimedCents]))}</strong>
        <p>Pending, not-yet-claimed, or in-review incentive value.</p>
      </DashboardCard>
    </div>
  );
}

function FinancialSavingsByRetrofit({ viewModel }: { viewModel: DashboardViewModel }) {
  return (
    <>
      <DashboardKpiGrid metrics={[
        dashboardMetric("Total Implemented Retrofits", String(viewModel.implementedRetrofits.length || 0), "Post-implementation records", "green"),
        dashboardMetric("Total Annual Savings", formatDashboardCurrencyCents(viewModel.financial.totalAnnualSavingsCents), "Across implemented retrofits", "green", viewModel.financial.totalAnnualSavingsCents == null),
        dashboardMetric("Average Payback", viewModel.financial.averagePaybackYears == null ? "Unavailable" : `${viewModel.financial.averagePaybackYears.toFixed(1)} yrs`, "Across implemented retrofits", "green", viewModel.financial.averagePaybackYears == null),
        dashboardMetric("Total Recovered So Far", formatDashboardCurrencyCents(viewModel.financial.totalRecoveredSoFarCents), "Savings plus incentives", "green", viewModel.financial.totalRecoveredSoFarCents == null),
        dashboardMetric("Projected 10-Year Savings", formatDashboardCurrencyCents(viewModel.financial.projectedTenYearSavingsCents), "Future value", "green", viewModel.financial.projectedTenYearSavingsCents == null)
      ]} />
      <DashboardImplementedRetrofitsTable retrofits={viewModel.implementedRetrofits} />
      <div className="dashboard-three-column">
        <DashboardCard title="Top Performing Retrofits">
          <DashboardHorizontalBars data={viewModel.financial.topSavingsRetrofits} valuePrefix="$" />
        </DashboardCard>
        <DashboardCard title="Payback Status">
          <DashboardDonutChart
            centerLabel={`${viewModel.implementedRetrofits.length || 0} Retrofits`}
            segments={[
              { label: "Paid Back", value: viewModel.implementedRetrofits.filter((retrofit) => (retrofit.paybackYears ?? 99) <= 3).length, tone: "green" },
              { label: "Recovering", value: viewModel.implementedRetrofits.filter((retrofit) => (retrofit.paybackYears ?? 99) > 3).length, tone: "gray" }
            ]}
          />
        </DashboardCard>
        <DashboardCard title="Future Upside">
          <strong className="dashboard-large-value">{formatDashboardCurrencyCents(viewModel.financial.projectedTenYearSavingsCents)}</strong>
          <p>Projected 10-year savings from implemented retrofit families.</p>
          <DashboardInlineAction label="View all retrofit families" />
        </DashboardCard>
      </div>
    </>
  );
}

function DashboardEnvironmentalPage({
  activeTab,
  onTabChange,
  viewModel
}: {
  activeTab: EnvironmentalDashboardTabId;
  onTabChange: (tab: EnvironmentalDashboardTabId) => void;
  viewModel: DashboardViewModel;
}) {
  return (
    <div className="dashboard-page-stack">
      <DashboardSubTabs tabs={ENVIRONMENTAL_DASHBOARD_TABS} activeTab={activeTab} onTabChange={onTabChange} />
      {activeTab === "overview" ? <EnvironmentalOverview viewModel={viewModel} /> : <EnvironmentalOutlook viewModel={viewModel} />}
    </div>
  );
}

function EnvironmentalOverview({ viewModel }: { viewModel: DashboardViewModel }) {
  const environmental = viewModel.environmental;
  return (
    <>
      <DashboardKpiGrid metrics={[
        dashboardMetric("Total CO2e Reduced / Year", formatDashboardNumber(environmental.totalCO2eReducedPerYear, "MT"), "Annual reduction", "green", environmental.totalCO2eReducedPerYear == null),
        dashboardMetric("kWh Saved", formatDashboardNumber(environmental.totalKwhSavedPerYear, "kWh"), "Electricity savings", "green", environmental.totalKwhSavedPerYear == null),
        dashboardMetric("Therms Reduced", formatDashboardNumber(environmental.totalThermsReducedPerYear, "therms"), "Natural gas savings", "green", environmental.totalThermsReducedPerYear == null),
        dashboardMetric("Water Saved", formatDashboardNumber(environmental.totalWaterSavedPerYear, "gal"), "Water reduction", "blue", environmental.totalWaterSavedPerYear == null),
        dashboardMetric("Waste Reduced", formatDashboardNumber(environmental.totalWasteReducedPerYear, "MT"), "Waste reduction", "green", environmental.totalWasteReducedPerYear == null),
        dashboardMetric("Projected 10-Year CO2e Avoided", formatDashboardNumber(environmental.projectedTenYearCO2e, "MT"), "Projection", "purple", environmental.projectedTenYearCO2e == null)
      ]} />
      <DashboardThreeStateCards realized={environmental.realized} current={environmental.current} projected={environmental.projected} />
      <div className="dashboard-two-column">
        <DashboardCard title="Cumulative CO2e Reduced Over Time">
          <DashboardLineChart data={environmental.impactSeries} valueSuffix=" MT" large />
        </DashboardCard>
        <DashboardCard title="Next Best Impact Actions">
          <DashboardActionList actions={viewModel.certifications.nextActions.filter((action) => action.category === "impact")} />
          <DashboardInlineAction label="View all recommended actions" />
        </DashboardCard>
      </div>
      <div className="dashboard-three-column">
        <DashboardCard title="Impact Metrics">
          <div className="dashboard-mini-metric-list">
            {environmental.current.map((metric) => <DashboardMetricMini key={metric.label} metric={metric} />)}
          </div>
        </DashboardCard>
        <DashboardCard title="Impact by Retrofit">
          <DashboardHorizontalBars data={environmental.impactByRetrofit} valueSuffix=" MT" />
        </DashboardCard>
        <DashboardCard title="Impact Data & Methodology">
          <ul className="dashboard-check-list">
            {environmental.basis.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <DashboardInlineAction label="Learn more about our methodology" />
        </DashboardCard>
      </div>
    </>
  );
}

function EnvironmentalOutlook({ viewModel }: { viewModel: DashboardViewModel }) {
  return (
    <>
      <DashboardKpiGrid metrics={[
        dashboardMetric("This Month's Impact", formatDashboardNumber(divideNumber(viewModel.environmental.totalCO2eReducedPerYear, 12), "MT"), "Current month estimate", "green", viewModel.environmental.totalCO2eReducedPerYear == null),
        dashboardMetric("Year-to-Date Impact", formatDashboardNumber(divideNumber(viewModel.environmental.totalCO2eReducedPerYear, 2), "MT"), "Current period", "green", viewModel.environmental.totalCO2eReducedPerYear == null),
        dashboardMetric("Lifetime Impact", formatDashboardNumber(viewModel.environmental.projectedFiveYearCO2e, "MT"), "Since portfolio inception", "green", viewModel.environmental.projectedFiveYearCO2e == null),
        dashboardMetric("Projected 5-Year Impact", formatDashboardNumber(viewModel.environmental.projectedFiveYearCO2e, "MT"), "Future impact", "purple", viewModel.environmental.projectedFiveYearCO2e == null)
      ]} />
      <div className="dashboard-two-column">
        <DashboardCard title="Impact Over Time">
          <DashboardLineChart data={viewModel.environmental.impactSeries} valueSuffix=" MT" large />
        </DashboardCard>
        <DashboardCard title="Equivalencies">
          <div className="dashboard-equivalency-grid">
            {viewModel.environmental.equivalencies.map((metric) => <DashboardMetricMini key={metric.label} metric={metric} />)}
          </div>
          <DashboardInlineAction label="Explore all equivalencies" />
        </DashboardCard>
      </div>
      <div className="dashboard-four-column">
        {["Electricity Use", "Gas Use", "Water Use"].map((label) => (
          <DashboardCard title={label} key={label}>
            <DashboardMiniSparkline />
            <DashboardInlineAction label="View trend details" />
          </DashboardCard>
        ))}
        <DashboardCard title="Projected Impact if Next Action is Completed">
          <strong className="dashboard-large-value">{viewModel.certifications.nextActions.find((action) => action.estimatedCO2eImpact)?.projectedOutcome || "Unavailable"}</strong>
          <p>Recommended next action impact.</p>
          <DashboardInlineAction label="View Recommended Next Actions" />
        </DashboardCard>
      </div>
    </>
  );
}

function DashboardCertificationsPage({
  activeTab,
  onTabChange,
  viewModel
}: {
  activeTab: CertificationDashboardTabId;
  onTabChange: (tab: CertificationDashboardTabId) => void;
  viewModel: DashboardViewModel;
}) {
  return (
    <div className="dashboard-page-stack">
      <DashboardSubTabs tabs={CERTIFICATION_DASHBOARD_TABS} activeTab={activeTab} onTabChange={onTabChange} />
      {activeTab === "progress" ? <CertificationsProgress viewModel={viewModel} /> : null}
      {activeTab === "gaps" ? <CertificationsGaps viewModel={viewModel} /> : null}
      {activeTab === "next-actions" ? <CertificationsNextActions viewModel={viewModel} /> : null}
    </div>
  );
}

function CertificationsProgress({ viewModel }: { viewModel: DashboardViewModel }) {
  const certification = viewModel.certifications;
  return (
    <>
      <DashboardKpiGrid metrics={[
        dashboardMetric("Overall Certification Progress", formatDashboardPercent(certification.progressPercent), "Across all programs", "green", certification.progressPercent == null),
        dashboardMetric("Programs Tracked", String(certification.programs.length), "Active programs", "green"),
        dashboardMetric("Credits Earned", formatDashboardNumber(sumNullableNumbers(certification.programs.map((program) => program.creditsEarned))), "Total credits earned", "green"),
        dashboardMetric("Credits Remaining", formatDashboardNumber(sumNullableNumbers(certification.programs.map((program) => program.creditsRemaining))), "To next milestones", "gray"),
        dashboardMetric("Ready to Apply", String(certification.programs.filter((program) => program.projectedStatus === "Ready to Apply").length), "Programs ready", "green"),
        dashboardMetric("Estimated Time to Next Milestone", certification.milestones[0]?.dateLabel || "Unavailable", "Across all programs", "green", !certification.milestones.length)
      ]} />
      <div className="dashboard-two-column is-wide-left">
        <DashboardCard title="Multi-Program Progress">
          <DashboardProgramsTable programs={certification.programs} />
          <DashboardInlineAction label="View all programs" />
        </DashboardCard>
        <DashboardCard title="Future Certification Pathway">
          <DashboardPathway current={certification.progressPercent} next={certification.progressPercent == null ? null : Math.min(100, certification.progressPercent + 10)} milestone={certification.milestones[0]?.dateLabel || "Unavailable"} />
          <DashboardInlineAction label="View pathway details" />
        </DashboardCard>
      </div>
      <DashboardCard title="Retrofit Contribution to Certification">
        <DashboardContributionTable retrofits={viewModel.implementedRetrofits} />
        <DashboardInlineAction label="View all retrofit contributions" />
      </DashboardCard>
    </>
  );
}

function CertificationsGaps({ viewModel }: { viewModel: DashboardViewModel }) {
  const certification = viewModel.certifications;
  return (
    <>
      <DashboardKpiGrid metrics={[
        dashboardMetric("Document Readiness %", formatDashboardPercent(certification.applicationReadinessPercent), "Documentation readiness", "green", certification.applicationReadinessPercent == null),
        dashboardMetric("Missing Actions", String(certification.nextActions.length), "Require attention", "red"),
        dashboardMetric("Missing Documents", String(certification.documentReadiness.reduce((sum, row) => sum + row.missing, 0)), "Need to be collected", "red"),
        dashboardMetric("Verification Steps", String(certification.gaps.find((gap) => gap.id === "verification")?.count ?? 0), "Pending completion", "green"),
        dashboardMetric("Likely Ready Programs", String(certification.programs.filter((program) => (program.documentReadinessPercent ?? 0) >= 80).length), "80%+ readiness", "green")
      ]} />
      <div className="dashboard-two-column">
        <DashboardCard title="Certification Document Readiness">
          <DashboardDocumentReadinessTable rows={certification.documentReadiness} />
          <DashboardInlineAction label="View all documents" />
        </DashboardCard>
        <DashboardCard title="Remaining Certification Gaps">
          <div className="dashboard-gap-list">
            {certification.gaps.map((gap) => (
              <article className={`dashboard-gap-row is-${gap.tone}`} key={gap.id}>
                <div>
                  <strong>{gap.label}</strong>
                  <p>{gap.subtext}</p>
                </div>
                <b>{gap.count}</b>
                <DashboardInlineAction label="View details" />
              </article>
            ))}
          </div>
          <DashboardInlineAction label="View all gaps" />
        </DashboardCard>
      </div>
      <DashboardCard title="Application Readiness by Program">
        <div className="dashboard-program-card-grid">
          {certification.programs.length ? certification.programs.map((program) => (
            <DashboardProgramCard key={program.id} program={program} />
          )) : <DashboardUnavailable label="Certification progress will appear after a program is selected." />}
        </div>
      </DashboardCard>
    </>
  );
}

function CertificationsNextActions({ viewModel }: { viewModel: DashboardViewModel }) {
  const actions = viewModel.certifications.nextActions;
  const highestImpact = actions.find((action) => action.estimatedCO2eImpact);
  const lowestCost = [...actions].filter((action) => action.estimatedCostCents != null).sort((a, b) => (a.estimatedCostCents ?? 0) - (b.estimatedCostCents ?? 0))[0];
  const fastest = [...actions].find((action) => action.timeRequired);
  return (
    <>
      <DashboardKpiGrid metrics={[
        dashboardMetric("Open Actions", String(actions.length), "Across certifications", "green"),
        dashboardMetric("Highest Impact Action", highestImpact?.projectedOutcome || "Unavailable", "CO2e reduced/year", "green", !highestImpact),
        dashboardMetric("Lowest Cost Action", lowestCost ? formatDashboardCurrencyCents(lowestCost.estimatedCostCents) : "Unavailable", "Total investment", "green", !lowestCost),
        dashboardMetric("Fastest Timeline Action", fastest?.timeRequired || "Unavailable", "Time to complete", "green", !fastest),
        dashboardMetric("Documents Ready %", formatDashboardPercent(viewModel.certifications.applicationReadinessPercent), "Documents ready to submit", "green", viewModel.certifications.applicationReadinessPercent == null)
      ]} />
      <DashboardCard title="Recommended Next Best Actions">
        <DashboardNextBestActionsTable actions={actions} />
        <DashboardInlineAction label="View all actions" />
      </DashboardCard>
      <div className="dashboard-three-column">
        <DashboardCard title="Upcoming Milestones">
          <DashboardMilestoneList milestones={viewModel.certifications.milestones} />
          <DashboardInlineAction label="View full timeline" />
        </DashboardCard>
        <DashboardCard title="Best Path Options">
          <div className="dashboard-path-option-grid">
            {["Fastest Path", "Lowest-Cost Path", "Highest-Certification-Impact Path"].map((label, index) => (
              <article className="dashboard-path-option" key={label}>
                <strong>{label}</strong>
                <span>Time to decision</span>
                <b>{index + 2} weeks</b>
                <button type="button">View plan</button>
              </article>
            ))}
          </div>
          <DashboardInlineAction label="Compare all paths" />
        </DashboardCard>
        <DashboardCard title="Document Readiness Summary">
          <strong className="dashboard-large-value">{formatDashboardPercent(viewModel.certifications.applicationReadinessPercent)}</strong>
          <DashboardDocumentReadinessTable rows={viewModel.certifications.documentReadiness.slice(0, 5)} compact />
          <DashboardInlineAction label="View all certifications" />
        </DashboardCard>
      </div>
    </>
  );
}

function DashboardSubTabs<T extends string>({
  activeTab,
  onTabChange,
  tabs
}: {
  activeTab: T;
  onTabChange: (tab: T) => void;
  tabs: Array<{ id: T; label: string }>;
}) {
  return (
    <nav className="dashboard-sub-tabs" aria-label="Dashboard sub-tabs">
      {tabs.map((tab) => (
        <button className={activeTab === tab.id ? "is-active" : ""} key={tab.id} onClick={() => onTabChange(tab.id)} type="button">
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

function DashboardKpiGrid({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <section className="dashboard-kpi-grid">
      {metrics.map((metric) => <DashboardKpiCard key={metric.label} metric={metric} />)}
    </section>
  );
}

function DashboardKpiCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article className={`dashboard-kpi-card is-${metric.tone || "green"}${metric.unavailable ? " is-unavailable" : ""}`}>
      <span className="dashboard-kpi-icon"><LeafOutlineIcon /></span>
      <div>
        <small>{metric.label}</small>
        <strong>{metric.value}</strong>
        {metric.subtext ? <p>{metric.subtext}</p> : null}
      </div>
    </article>
  );
}

function DashboardThreeStateCards({
  current,
  projected,
  realized
}: {
  current: DashboardMetric[];
  projected: DashboardMetric[];
  realized: DashboardMetric[];
}) {
  return (
    <section className="dashboard-three-state-grid">
      <DashboardStateCard title="Realized" subtitle="Past performance (cumulative)" tone="green" metrics={realized} />
      <DashboardStateCard title="Current" subtitle="Current performance to date" tone="blue" metrics={current} />
      <DashboardStateCard title="Projected" subtitle="Future performance (forecast)" tone="purple" metrics={projected} />
    </section>
  );
}

function DashboardStateCard({ metrics, subtitle, title, tone }: { metrics: DashboardMetric[]; subtitle: string; title: string; tone: DashboardTone }) {
  return (
    <article className={`dashboard-state-card is-${tone}`}>
      <div>
        <strong>{title}</strong>
        <p>{subtitle}</p>
      </div>
      <div className="dashboard-state-metrics">
        {metrics.map((metric) => (
          <span key={metric.label}>
            <b>{metric.value}</b>
            <small>{metric.label}</small>
          </span>
        ))}
      </div>
    </article>
  );
}

function DashboardCard({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="dashboard-card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function DashboardMetricMini({ metric }: { metric: DashboardMetric }) {
  return (
    <article className={`dashboard-mini-metric is-${metric.tone || "green"}${metric.unavailable ? " is-unavailable" : ""}`}>
      <span><LeafOutlineIcon /></span>
      <div>
        <small>{metric.label}</small>
        <strong>{metric.value}</strong>
        {metric.subtext ? <p>{metric.subtext}</p> : null}
      </div>
    </article>
  );
}

function DashboardLineChart({
  data,
  large = false,
  valuePrefix = "",
  valueSuffix = ""
}: {
  data: DashboardTimePoint[];
  large?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}) {
  const values = data.flatMap((point) => [point.actual, point.projected]).filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (!values.length) return <DashboardUnavailable label="Chart unavailable until tracking data is connected." />;
  const max = Math.max(...values, 1);
  const width = 640;
  const height = large ? 220 : 150;
  const xStep = data.length > 1 ? width / (data.length - 1) : width;
  const pointFor = (value: number, index: number) => `${index * xStep},${height - (value / max) * (height - 28) - 14}`;
  const actualPath = data.map((point, index) => point.actual == null ? null : pointFor(point.actual, index)).filter(Boolean).join(" L ");
  const projectedPath = data.map((point, index) => point.projected == null ? null : pointFor(point.projected, index)).filter(Boolean).join(" L ");
  const last = values[values.length - 1];
  return (
    <div className={`dashboard-chart dashboard-line-chart${large ? " is-large" : ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Dashboard line chart">
        {[0, 1, 2, 3].map((line) => <line key={line} x1="0" x2={width} y1={14 + line * ((height - 28) / 3)} y2={14 + line * ((height - 28) / 3)} />)}
        {actualPath ? <path d={`M ${actualPath}`} className="dashboard-line-actual" /> : null}
        {projectedPath ? <path d={`M ${projectedPath}`} className="dashboard-line-projected" /> : null}
      </svg>
      <span className="dashboard-chart-callout">{valuePrefix}{formatDashboardNumber(last)}{valueSuffix}</span>
    </div>
  );
}

function DashboardDonutChart({
  centerLabel,
  segments
}: {
  centerLabel: string;
  segments: Array<{ label: string; value: number; tone: DashboardTone }>;
}) {
  const total = segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0);
  if (!total) return <DashboardUnavailable label="No values available yet." />;
  let offset = 25;
  return (
    <div className="dashboard-donut-wrap">
      <svg className="dashboard-donut-chart" viewBox="0 0 42 42" role="img" aria-label="Dashboard donut chart">
        <circle className="dashboard-donut-bg" cx="21" cy="21" r="15.9" />
        {segments.map((segment) => {
          const dash = (Math.max(0, segment.value) / total) * 100;
          const currentOffset = offset;
          offset -= dash;
          return <circle key={segment.label} className={`dashboard-donut-segment is-${segment.tone}`} cx="21" cy="21" r="15.9" strokeDasharray={`${dash} ${100 - dash}`} strokeDashoffset={currentOffset} />;
        })}
      </svg>
      <strong>{centerLabel}</strong>
      <div className="dashboard-chart-legend">
        {segments.map((segment) => <span key={segment.label}><i className={`is-${segment.tone}`} />{segment.label}</span>)}
      </div>
    </div>
  );
}

function DashboardHorizontalBars({ data, valuePrefix = "", valueSuffix = "" }: { data: Array<{ label: string; value: number }>; valuePrefix?: string; valueSuffix?: string }) {
  if (!data.length) return <DashboardUnavailable label="No retrofit performance values available yet." />;
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="dashboard-horizontal-bars">
      {data.map((item) => (
        <div className="dashboard-horizontal-bar-row" key={item.label}>
          <span>{item.label}</span>
          <div><i style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }} /></div>
          <b>{valuePrefix}{formatDashboardNumber(item.value)}{valueSuffix}</b>
        </div>
      ))}
    </div>
  );
}

function DashboardWaterfallChart({ items }: { items: Array<{ label: string; value: number }> }) {
  const max = Math.max(...items.map((item) => Math.abs(item.value)), 1);
  return (
    <div className="dashboard-waterfall">
      {items.map((item) => (
        <span key={item.label}>
          <i style={{ height: `${Math.max(8, (Math.abs(item.value) / max) * 100)}%` }} className={item.value < 0 ? "is-negative" : ""} />
          <b>{formatDashboardCurrencyCents(item.value)}</b>
          <small>{item.label}</small>
        </span>
      ))}
    </div>
  );
}

function DashboardStackedBar({ segments, totalLabel }: { segments: Array<{ label: string; value: number; tone: DashboardTone }>; totalLabel: string }) {
  const total = segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0);
  if (!total) return <DashboardUnavailable label="Savings breakdown unavailable." />;
  return (
    <div className="dashboard-stacked-bar-wrap">
      <div className="dashboard-stacked-bar">
        {segments.map((segment) => <i className={`is-${segment.tone}`} key={segment.label} style={{ width: `${(Math.max(0, segment.value) / total) * 100}%` }} />)}
      </div>
      <strong>{totalLabel}</strong>
      <div className="dashboard-chart-legend">
        {segments.map((segment) => <span key={segment.label}><i className={`is-${segment.tone}`} />{segment.label}</span>)}
      </div>
    </div>
  );
}

function DashboardMiniSparkline() {
  return (
    <svg className="dashboard-mini-sparkline" viewBox="0 0 180 58" aria-hidden="true">
      <path d="M2 22 C22 38, 32 12, 52 26 S82 34, 100 24 S132 40, 178 18" />
    </svg>
  );
}

function DashboardInfoRows({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="dashboard-info-rows">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DashboardCertificationPreview({ programs }: { programs: DashboardCertificationProgram[] }) {
  return (
    <DashboardCard title="Certification Progress">
      {programs.length ? programs.slice(0, 4).map((program) => <DashboardProgramCard key={program.id} program={program} />) : <DashboardUnavailable label="Certification progress will appear after a program is selected." />}
      <DashboardInlineAction label="View all certifications" />
    </DashboardCard>
  );
}

function DashboardNextActionsPreview({ actions }: { actions: DashboardNextBestAction[] }) {
  return (
    <DashboardCard title="Next Best Action">
      <DashboardActionList actions={actions} />
      <DashboardInlineAction label="View all actions" />
    </DashboardCard>
  );
}

function DashboardActionList({ actions }: { actions: DashboardNextBestAction[] }) {
  if (!actions.length) return <DashboardUnavailable label="No next actions are available from current implemented data." />;
  return (
    <ol className="dashboard-action-list">
      {actions.map((action) => (
        <li key={action.id}>
          <strong>{action.title}</strong>
          <p>{action.whyItMatters}</p>
          <span>{action.projectedOutcome}</span>
        </li>
      ))}
    </ol>
  );
}

function DashboardImplementedRetrofitsTable({ compact = false, retrofits }: { compact?: boolean; retrofits: DashboardImplementedRetrofit[] }) {
  return (
    <DashboardCard title="Implemented Retrofits">
      {retrofits.length ? (
        <div className="dashboard-table-scroll">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Retrofit Name</th>
                <th>Installed Date</th>
                {!compact ? <th>Project Cost</th> : null}
                <th>Annual Savings</th>
                <th>CO2e Reduced / Year</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {retrofits.map((retrofit) => (
                <tr key={retrofit.id}>
                  <td>{retrofit.name}</td>
                  <td>{retrofit.installedDate || "Not listed"}</td>
                  {!compact ? <td>{formatDashboardCurrencyCents(retrofit.projectCostCents)}</td> : null}
                  <td>{formatDashboardCurrencyCents(retrofit.actualAnnualSavingsCents ?? retrofit.estimatedAnnualSavingsCents)}</td>
                  <td>{formatDashboardNumber(retrofit.co2eReducedPerYear, "MT")}</td>
                  <td><span className="dashboard-status-pill is-green">{capitalizeLabel(retrofit.implementationStatus)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <DashboardUnavailable label="No implemented retrofit records are available yet." />}
      <DashboardInlineAction label="View all retrofits" />
    </DashboardCard>
  );
}

function DashboardProgramsTable({ programs }: { programs: DashboardCertificationProgram[] }) {
  if (!programs.length) return <DashboardUnavailable label="No certification programs are tracked yet." />;
  return (
    <div className="dashboard-table-scroll">
      <table className="dashboard-table">
        <thead>
          <tr><th>Program</th><th>Certification Progress</th><th>Current Status</th><th>Credits Earned</th><th>Credits Remaining</th><th>Projected Status</th></tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.id}>
              <td>{program.name}</td>
              <td><DashboardProgressBar value={program.progressPercent} /></td>
              <td><span className="dashboard-status-pill is-green">{program.status}</span></td>
              <td>{formatDashboardNumber(program.creditsEarned)}</td>
              <td>{formatDashboardNumber(program.creditsRemaining)}</td>
              <td>{program.projectedStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DashboardDocumentReadinessTable({ compact = false, rows }: { compact?: boolean; rows: DashboardDocumentReadiness[] }) {
  if (!rows.length) return <DashboardUnavailable label="No document readiness records are available yet." />;
  return (
    <div className="dashboard-table-scroll">
      <table className="dashboard-table">
        <thead>
          <tr><th>Document Category</th><th>Ready</th><th>In Review</th><th>Missing</th>{!compact ? <th>Total</th> : null}<th>Status</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const total = row.ready + row.inReview + row.missing;
            const status = total && row.missing / total > 0.35 ? "Poor" : row.missing ? "Fair" : "Good";
            return (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>{row.ready}</td>
                <td>{row.inReview}</td>
                <td>{row.missing}</td>
                {!compact ? <td>{total}</td> : null}
                <td><span className={`dashboard-status-pill ${status === "Poor" ? "is-red" : status === "Fair" ? "is-orange" : "is-green"}`}>{status}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DashboardContributionTable({ retrofits }: { retrofits: DashboardImplementedRetrofit[] }) {
  const rows = retrofits.flatMap((retrofit) => retrofit.certificationsSupported.map((certification) => ({ retrofit, certification })));
  if (!rows.length) return <DashboardUnavailable label="Certification contribution data is not available yet." />;
  return (
    <div className="dashboard-table-scroll">
      <table className="dashboard-table">
        <thead><tr><th>Retrofit Name</th><th>Certification Program Affected</th><th>Contribution</th><th>Documentation Status</th></tr></thead>
        <tbody>
          {rows.map(({ certification, retrofit }) => (
            <tr key={`${retrofit.id}-${certification.program}`}>
              <td>{retrofit.name}</td>
              <td>{certification.program}</td>
              <td>{certification.detail}</td>
              <td><span className="dashboard-status-pill is-green">{certification.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DashboardNextBestActionsTable({ actions }: { actions: DashboardNextBestAction[] }) {
  if (!actions.length) return <DashboardUnavailable label="No ranked actions are available yet." />;
  return (
    <div className="dashboard-table-scroll">
      <table className="dashboard-table">
        <thead><tr><th>Rank</th><th>Action</th><th>Why It Matters</th><th>Cert. Impact</th><th>Cost</th><th>Difficulty</th><th>Time Required</th><th>Projected Outcome</th></tr></thead>
        <tbody>
          {actions.map((action, index) => (
            <tr key={action.id}>
              <td>{index + 1}</td>
              <td>{action.title}</td>
              <td>{action.whyItMatters}</td>
              <td>{action.certificationImpact || "Not applicable"}</td>
              <td>{formatDashboardCurrencyCents(action.estimatedCostCents)}</td>
              <td>{action.difficulty || "Needs review"}</td>
              <td>{action.timeRequired || "Not estimated"}</td>
              <td>{action.projectedOutcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DashboardProgramCard({ program }: { program: DashboardCertificationProgram }) {
  return (
    <article className="dashboard-program-card">
      <strong>{program.name}</strong>
      <b>{formatDashboardPercent(program.documentReadinessPercent ?? program.progressPercent)}</b>
      <DashboardProgressBar value={program.documentReadinessPercent ?? program.progressPercent} />
      <span>{program.documentReadinessPercent == null ? program.status : "Application readiness"}</span>
    </article>
  );
}

function DashboardPathway({ current, milestone, next }: { current: number | null; milestone: string; next: number | null }) {
  return (
    <div className="dashboard-pathway">
      <span><b>{formatDashboardPercent(current)}</b><small>Current readiness</small></span>
      <span><b>{formatDashboardPercent(next)}</b><small>After next action</small></span>
      <span><b>{milestone}</b><small>Ready to apply milestone</small></span>
    </div>
  );
}

function DashboardMilestoneList({ milestones }: { milestones: DashboardCertificationData["milestones"] }) {
  if (!milestones.length) return <DashboardUnavailable label="No upcoming milestones are available yet." />;
  return (
    <ul className="dashboard-milestone-list">
      {milestones.map((milestone) => (
        <li key={`${milestone.label}-${milestone.dateLabel}`}>
          <strong>{milestone.label}</strong>
          <span>{milestone.dateLabel}</span>
        </li>
      ))}
    </ul>
  );
}

function DashboardProgressBar({ value }: { value: number | null | undefined }) {
  const percent = value == null || !Number.isFinite(value) ? 0 : Math.max(0, Math.min(100, value));
  return <span className="dashboard-progress-bar"><i style={{ width: `${percent}%` }} /></span>;
}

function DashboardInlineAction({ label }: { label: string }) {
  return <button className="dashboard-inline-action" type="button">{label} <span aria-hidden="true">→</span></button>;
}

function DashboardUnavailable({ label }: { label: string }) {
  return <p className="dashboard-unavailable">{label}</p>;
}

function divideNumber(value: number | null | undefined, divisor: number) {
  if (value == null || !Number.isFinite(value)) return null;
  return value / divisor;
}

function RetrofitPickerView({
  activeRetrofitId,
  displayedRetrofits,
  emptyMessage,
  isLoading,
  loadingMessage,
  hideBillData,
  uploadedBillStepCount,
  retrofitReadinessById,
  onCloseDetails,
  onSelectRetrofit,
  onSetViewMode,
  onShowMore,
  onShowLess,
  onSortChange,
  onUploadBills,
  pickerViewMode,
  pickerVisibleCount,
  sortBy
}: {
  activeRetrofitId: string;
  displayedRetrofits: RetrofitPreviewCard[];
  emptyMessage: string;
  isLoading: boolean;
  loadingMessage: string;
  hideBillData: boolean;
  uploadedBillStepCount: number;
  retrofitReadinessById: Map<string, RetrofitReadiness>;
  onCloseDetails: () => void;
  onSelectRetrofit: (retrofitId: string) => void;
  onSetViewMode: (mode: "grid" | "panel") => void;
  onShowMore: () => void;
  onShowLess: () => void;
  onSortChange: (value: string) => void;
  onUploadBills: () => void;
  pickerViewMode: "grid" | "panel";
  pickerVisibleCount: number;
  sortBy: string;
}) {
  const collapsedRetrofitCount = 6;
  const visibleRetrofits = displayedRetrofits.slice(0, pickerVisibleCount);
  const hasMoreRetrofits = displayedRetrofits.length > visibleRetrofits.length;
  const hasCollapsedRetrofits = pickerVisibleCount > collapsedRetrofitCount && displayedRetrofits.length > collapsedRetrofitCount;
  const moreRetrofitsLabel = hasMoreRetrofits ? "Show more retrofits" : hasCollapsedRetrofits ? "Show less retrofits" : "";
  const hasUploadedBillData = uploadedBillStepCount > 0;
  const billUploadProgressLabel =
    uploadedBillStepCount >= BILL_UPLOAD_STEPS.length
      ? "All utility bill types are available for estimates."
      : `${uploadedBillStepCount} of ${BILL_UPLOAD_STEPS.length} utility bill types are available for estimates.`;

  function handleMoreRetrofitsClick() {
    if (hasMoreRetrofits) {
      onShowMore();
      return;
    }
    if (hasCollapsedRetrofits) {
      onShowLess();
    }
  }

  return (
    <section className="retrofit-picker-shell" aria-label="Available retrofits">
      <section className={`estimate-accuracy-banner${hasUploadedBillData ? " has-bill-data" : ""}`}>
        <div className="estimate-accuracy-icon" aria-hidden="true">
          {hasUploadedBillData ? <CheckIcon /> : <UploadCloudIcon />}
        </div>
        <div>
          <h1>{hasUploadedBillData ? "Utility bills loaded" : "Retrieve your estimates"}</h1>
          <p>{hasUploadedBillData ? billUploadProgressLabel : "Upload your electric, water, gas, and waste bills to continue"}</p>
        </div>
        <button onClick={onUploadBills} type="button">{hasUploadedBillData ? "Review bills" : "Upload bills"}</button>
      </section>

      <section className="retrofit-picker-controls" aria-label="Sort and view controls">
        <label className="picker-sort-control">
          <span>Sort by</span>
          <select onChange={(event) => onSortChange(event.target.value)} value={sortBy}>
            <option value="recommended">Recommended</option>
            <option value="total_savings">Savings</option>
            <option value="payback">Payback</option>
            <option value="upfront_cost">Cost</option>
          </select>
        </label>
        <div className="picker-view-toggle" aria-label="View mode">
          <button
            aria-label="Grid view"
            aria-pressed={pickerViewMode === "grid"}
            className={`picker-view-button${pickerViewMode === "grid" ? " is-active" : ""}`}
            onClick={() => onSetViewMode("grid")}
            type="button"
          >
            <ViewGridIcon />
            <span>Grid</span>
          </button>
          <button
            aria-label="Panel view"
            aria-pressed={pickerViewMode === "panel"}
            className={`picker-view-button${pickerViewMode === "panel" ? " is-active" : ""}`}
            onClick={() => onSetViewMode("panel")}
            type="button"
          >
            <ViewPanelIcon />
            <span>Panel</span>
          </button>
        </div>
      </section>

      {isLoading ? (
        <section className="retrofit-picker-grid" aria-label={loadingMessage}>
          {Array.from({ length: 6 }).map((_, index) => (
            <RetroFiSkeleton key={index} variant="retrofit-card" label="Loading retrofit recommendation" />
          ))}
        </section>
      ) : visibleRetrofits.length ? (
        <>
          <section className={`retrofit-picker-grid${pickerViewMode === "panel" ? " is-panel" : ""}`}>
            {visibleRetrofits.map((retrofit) => (
              <button
                className={`retrofit-picker-card${activeRetrofitId === retrofit.id ? " is-selected" : ""}`}
                data-retrofit-tab-id={retrofit.id}
                key={retrofit.id}
                onClick={() => onSelectRetrofit(retrofit.id)}
                type="button"
              >
                <div className="retrofit-picker-card-top">
                  <RetrofitPickerIcon retrofit={retrofit} />
                  <div>
                    <h3>{retrofit.name}</h3>
                    <p>{retrofitPickerDescription(retrofit)}</p>
                  </div>
                </div>
                <div className="retrofit-picker-card-metrics" aria-label={`${retrofit.name} summary metrics`}>
                  <PickerMetric kind="savings" label="Savings" value={retrofitPickerSavings(retrofit, hideBillData)} />
                  <PickerMetric kind="cost" label="Cost" value={retrofitPickerCost(retrofit, hideBillData)} />
                  <PickerMetric kind="payback" label="Payback" value={retrofitPickerPayback(retrofit, hideBillData)} />
                </div>
                <div className="retrofit-picker-card-impact" aria-label={`${retrofit.name} environmental impact`}>
                  <PickerMetric kind="impact" label="Environmental impact" value={retrofitPickerEnvironmentalImpact()} />
                </div>
                <RetrofitReadinessRow {...(retrofitReadinessById.get(retrofit.id) || { billsComplete: false, questionsComplete: false, estimateComplete: false })} />
              </button>
            ))}
          </section>
          {hasMoreRetrofits ? (
            <div className="retrofit-picker-more-row">
              <button className="secondary-button" onClick={handleMoreRetrofitsClick} type="button">
                {moreRetrofitsLabel}
              </button>
            </div>
          ) : hasCollapsedRetrofits ? (
            <div className="retrofit-picker-more-row">
              <button className="secondary-button" onClick={handleMoreRetrofitsClick} type="button">
                {moreRetrofitsLabel}
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <section className="retrofit-picker-empty">
          <h3>No retrofit recommendations yet.</h3>
          <p>{emptyMessage || "Complete the intake form or select a test profile to generate recommendations."}</p>
        </section>
      )}
    </section>
  );
}

function RetrofitDetailFormModal({
  initialAnswers,
  isSubmitting = false,
  onClose,
  onSubmit,
  retrofit,
  submitError = null
}: {
  initialAnswers: Record<string, string>;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (answers: Record<string, string>) => void | Promise<void>;
  retrofit: RetrofitPreviewCard;
  submitError?: string | null;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(getRetrofitFormQuestions(retrofit, initialAnswers).map((question) => [question.id, initialAnswers[question.id] || ""]))
  );
  const questions = useMemo(() => getRetrofitFormQuestions(retrofit, answers), [answers, retrofit]);

  useEffect(() => {
    setAnswers(Object.fromEntries(getRetrofitFormQuestions(retrofit, initialAnswers).map((question) => [question.id, initialAnswers[question.id] || ""])));
  }, [initialAnswers, retrofit]);

  const answeredCount = questions.filter((question) => (answers[question.id] || "").trim().length > 0).length;
  const requiredQuestions = questions.filter((question) => isRetrofitQuestionRequired(question, answers));
  const canSubmit = !isSubmitting && (requiredQuestions.length === 0 || requiredQuestions.every((question) => (answers[question.id] || "").trim().length > 0));

  function handleAnswerChange(questionId: string, value: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    void onSubmit(answers);
  }

  function renderQuestionInput(question: RetrofitDetailQuestion) {
    const value = answers[question.id] || "";
    const required = isRetrofitQuestionRequired(question, answers);
    if (question.answerType === "select") {
      return (
        <select
          onChange={(event) => handleAnswerChange(question.id, event.target.value)}
          required={required}
          value={value}
        >
          <option value="">Select</option>
          {(question.options || []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
    if (question.answerType === "boolean") {
      return (
        <select
          onChange={(event) => handleAnswerChange(question.id, event.target.value)}
          required={required}
          value={value}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      );
    }
    if (question.answerType === "file") {
      return (
        <input
          onChange={(event) => handleAnswerChange(question.id, event.target.files?.[0]?.name || "")}
          required={required}
          type="file"
        />
      );
    }
    return (
      <input
        inputMode={question.answerType === "number" ? "decimal" : undefined}
        onChange={(event) => handleAnswerChange(question.id, event.target.value)}
        required={required}
        type={question.answerType === "number" ? "number" : question.answerType === "date" ? "date" : "text"}
        value={value}
      />
    );
  }

  return (
    <div className="retrofit-form-backdrop" role="presentation">
      <form aria-label={`${retrofit.name} project details`} className="retrofit-form-modal" onSubmit={handleSubmit}>
        <button aria-label="Close project details form" className="retrofit-form-close-button" onClick={onClose} type="button">
          x
        </button>
        <header className="retrofit-form-header">
          <span className="soft-badge">Project details</span>
          <div>
            <h2>{retrofit.name}</h2>
            <p>{answeredCount} of {questions.length} answered</p>
          </div>
        </header>
        <div className="retrofit-form-question-list">
          {questions.map((question) => (
            <label className="retrofit-form-question" key={question.id}>
              <span>{question.question}</span>
              {question.whyItMatters ? <small>{question.whyItMatters}</small> : null}
              {renderQuestionInput(question)}
              {question.affects?.length ? (
                <span className="retrofit-form-affects">
                  {question.affects.map((item) => (
                    <em key={item}>{item}</em>
                  ))}
                </span>
              ) : null}
            </label>
          ))}
        </div>
        {submitError ? <p className="error-message">{submitError}</p> : null}
        <footer className="retrofit-form-footer">
          <button className="secondary-button" disabled={isSubmitting} onClick={onClose} type="button">
            Back
          </button>
          <button className="primary-button" disabled={!canSubmit} type="submit">
            {isSubmitting ? "Saving..." : "Save and review retrofit"}
          </button>
        </footer>
      </form>
    </div>
  );
}

function BillUploadModal({
  initialState,
  isOpen,
  initialStepId,
  onClose,
  onComplete,
  onStateChange,
  storageKey
}: {
  initialState: BillUploadState;
  isOpen: boolean;
  initialStepId?: BillUploadStepId | null;
  onClose: () => void;
  onComplete: (state: BillUploadState) => void;
  onStateChange?: (state: BillUploadState) => void;
  storageKey: string;
}) {
  const [uploadState, setUploadState] = useState<BillUploadState>(() => initialState);
  const [currentStepIndex, setCurrentStepIndex] = useState(() =>
    initialStepId != null ? getBillUploadStepIndex(initialStepId) : getBillUploadResumeIndex(initialState)
  );
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalSeedRef = useRef({ isOpen: false, storageKey });

  useEffect(() => {
    const shouldSeedState = isOpen && (!modalSeedRef.current.isOpen || modalSeedRef.current.storageKey !== storageKey);
    if (shouldSeedState) {
      setUploadState(initialState);
      setCurrentStepIndex(initialStepId != null ? getBillUploadStepIndex(initialStepId) : getBillUploadResumeIndex(initialState));
      setShowSkipWarning(false);
      setFileError(null);
    }
    modalSeedRef.current = { isOpen, storageKey };
  }, [initialState, initialStepId, isOpen, storageKey]);

  useEffect(() => {
    if (isOpen) {
      storeBillUploadState(storageKey, uploadState);
      onStateChange?.(uploadState);
    }
  }, [isOpen, onStateChange, storageKey, uploadState]);

  const currentStep = BILL_UPLOAD_STEPS[Math.min(currentStepIndex, BILL_UPLOAD_STEPS.length - 1)];
  const currentStatus = uploadState.statuses[currentStep.id];
  const uploadedStepSummaries = getBillUploadStepSummary(uploadState);
  const currentStepUploaded = currentStatus === "uploaded";
  const isFinalStep = currentStepIndex >= BILL_UPLOAD_STEPS.length - 1;
  const canContinue = currentStepUploaded;

  function completeWithState(nextState: BillUploadState, nextIndex: number) {
    storeBillUploadState(storageKey, nextState);
    setUploadState(nextState);
    onStateChange?.(nextState);
    setCurrentStepIndex(nextIndex);
  }

  function handleFileUpload(file: File) {
    if (!isSupportedBillUploadFile(file)) {
      setFileError("Please upload a PDF, PNG, JPG, or JPEG file.");
      return;
    }

    setFileError(null);
    const uploadedRecord: BillUploadFileRecord = {
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      uploadedAt: new Date().toISOString()
    };
    const nextState = {
      ...uploadState,
      files: { ...uploadState.files, [currentStep.id]: uploadedRecord },
      statuses: { ...uploadState.statuses, [currentStep.id]: "uploaded" as BillUploadStatus }
    };
    storeBillUploadState(storageKey, nextState);
    setUploadState(nextState);
    onStateChange?.(nextState);
  }

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFileUpload(file);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    handleFileUpload(file);
  }

  function handleStepTabClick(index: number) {
    setCurrentStepIndex(index);
    setShowSkipWarning(false);
    setFileError(null);
  }

  function handleRemoveBillUpload(stepId: BillUploadStepId) {
    const nextFiles = { ...uploadState.files };
    delete nextFiles[stepId];
    const nextState: BillUploadState = {
      ...uploadState,
      files: nextFiles,
      flowComplete: false,
      statuses: {
        ...uploadState.statuses,
        [stepId]: "pending"
      }
    };
    completeWithState(nextState, currentStepIndex);
    setFileError(null);
  }

  function handleContinue() {
    if (!canContinue) return;
    const allUploaded = BILL_UPLOAD_STEPS.every((step) => uploadState.statuses[step.id] === "uploaded");
    if (isFinalStep) {
      const nextState = {
        ...uploadState,
        flowComplete: allUploaded
      };
      completeWithState(nextState, getBillUploadResumeIndex(nextState));
      onComplete(nextState);
      onClose();
      return;
    }

    const nextIndex = Math.min(currentStepIndex + 1, BILL_UPLOAD_STEPS.length - 1);
    setShowSkipWarning(false);
    setFileError(null);
    setCurrentStepIndex(nextIndex);
  }

  function handleSkipStart() {
    setShowSkipWarning(true);
  }

  function handleSkipConfirm() {
    const nextStatuses = {
      ...uploadState.statuses,
      [currentStep.id]: "skipped"
    } as Record<BillUploadStepId, BillUploadStatus>;
    const nextState = {
      ...uploadState,
      flowComplete: false,
      statuses: nextStatuses
    };
    const nextIndex = Math.min(currentStepIndex + 1, BILL_UPLOAD_STEPS.length - 1);
    completeWithState(nextState, nextIndex);
    if (isFinalStep) {
      onComplete(nextState);
      onClose();
    }
    setShowSkipWarning(false);
    setFileError(null);
  }

  function handleClose() {
    setShowSkipWarning(false);
    setFileError(null);
    storeBillUploadState(storageKey, uploadState);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      className={`bill-upload-backdrop${showSkipWarning ? " is-warning-open" : ""}`}
      data-testid="bill-upload-modal"
      role="dialog"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <section className={`bill-upload-modal${showSkipWarning ? " is-dimmed" : ""}`} aria-labelledby="bill-upload-modal-title">
        <button aria-label="Close upload modal" className="bill-upload-close-button" onClick={handleClose} type="button">
          <CloseIcon />
        </button>

        <div className="bill-upload-progress" aria-label="Bill upload progress">
          {BILL_UPLOAD_STEPS.map((step, index) => {
            const status = uploadState.statuses[step.id];
            const isCurrent = index === currentStepIndex && status !== "uploaded";
            return (
              <button
                aria-current={index === currentStepIndex ? "step" : undefined}
                aria-label={`Go to ${step.utilityLabel.toLowerCase()} bill upload`}
                className={`bill-upload-progress-segment is-${status}${isCurrent ? " is-current" : ""}${index === currentStepIndex && status === "uploaded" ? " is-current-uploaded" : ""}`}
                key={step.id}
                onClick={() => handleStepTabClick(index)}
                type="button"
              >
                <span className="sr-only">{step.utilityLabel} bill</span>
              </button>
            );
          })}
        </div>

        <div className="bill-upload-header">
          <h2 id="bill-upload-modal-title">{currentStepUploaded ? `${currentStep.utilityLabel} bill uploaded` : currentStep.title}</h2>
          <p>{currentStepUploaded ? "This utility bill data is available for retrofit estimates." : currentStep.subtitle}</p>
        </div>

        <div
          className={`bill-upload-dropzone${currentStepUploaded ? " is-complete" : ""}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
            aria-label="Choose file"
            className="sr-only"
            onChange={handleFilesSelected}
            ref={fileInputRef}
            type="file"
          />
          <div className="bill-upload-dropzone-icon" aria-hidden="true">
            {currentStepUploaded ? <CheckIcon /> : <UploadCloudIcon />}
          </div>
          <strong>{currentStepUploaded ? `${currentStep.utilityLabel} bill data loaded` : "Drag and drop your file here"}</strong>
          <span>{currentStepUploaded ? "Used in current estimates" : "or"}</span>
          <button
            className="bill-upload-file-button"
            onClick={(event) => {
              event.stopPropagation();
              fileInputRef.current?.click();
            }}
            type="button"
          >
            {currentStepUploaded ? "Replace file" : "Choose file"}
          </button>
          <small>{currentStepUploaded ? "Upload a replacement file to update this bill." : "Accepted formats: PDF, PNG, JPG"}</small>
        </div>

        {fileError ? <p className="bill-upload-error" role="alert">{fileError}</p> : null}

        <div className="bill-upload-summary-list" aria-label="Uploaded bill summary">
          {uploadedStepSummaries.map((step) => {
            const file = uploadState.files[step.id];
            return (
              <article className="bill-upload-summary-row" key={step.id}>
                <div>
                  <span className="bill-upload-summary-title">
                    <CheckIcon />
                    {step.completedLabel}
                  </span>
                  <p>{file?.name || step.utilityLabel}</p>
                </div>
                <div className="bill-upload-summary-actions">
                  <span className="bill-upload-complete-badge">Complete</span>
                  <button
                    aria-label={`Remove ${step.utilityLabel.toLowerCase()} bill`}
                    className="bill-upload-remove-button"
                    onClick={() => handleRemoveBillUpload(step.id)}
                    type="button"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="bill-upload-footer">
          <button className="bill-upload-skip-button" onClick={handleSkipStart} type="button">
            Skip for now
          </button>
          <button className="bill-upload-continue-button" disabled={!canContinue} onClick={handleContinue} type="button">
            Continue
          </button>
        </footer>
      </section>

      {showSkipWarning ? (
        <section className="bill-upload-warning-backdrop" aria-label="Skip upload warning" role="dialog">
          <div className="bill-upload-warning-modal" aria-labelledby="bill-upload-warning-title">
            <div className="bill-upload-warning-icon" aria-hidden="true">
              <WarningIcon />
            </div>
            <h3 id="bill-upload-warning-title">
              Warning: if you skip this bill, you won't be able to see eligible retrofits until the bill has been uploaded.
            </h3>
            <p>Are you sure you want to skip?</p>
            <div className="bill-upload-warning-actions">
              <button className="bill-upload-warning-secondary" onClick={() => setShowSkipWarning(false)} type="button">
                No
              </button>
              <button className="bill-upload-warning-primary" onClick={handleSkipConfirm} type="button">
                Yes
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg className="bill-upload-close-icon" fill="none" viewBox="0 0 20 20">
      <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="bill-upload-warning-icon-svg" fill="none" viewBox="0 0 24 24">
      <path d="M12 4.5 21 20H3L12 4.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M12 9v4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M12 16.4h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
    </svg>
  );
}

type PickerMetricKind = "savings" | "cost" | "payback" | "impact";

function PickerMetric({ kind, label, value }: { kind: PickerMetricKind; label: string; value: string }) {
  const Icon = kind === "savings" ? MetricSavingsIcon : kind === "cost" ? MetricCostIcon : kind === "payback" ? MetricPaybackIcon : MetricImpactIcon;
  const placeholderState = getPickerMetricPlaceholderState(kind, value);
  const isFallback = value === "?" || /needs|pending|not/i.test(value);
  return (
    <div className={`retrofit-picker-metric is-${kind}${isFallback ? " is-fallback" : ""}${placeholderState.className}`}>
      <span className="retrofit-picker-metric-label">
        <Icon />
        <span>{label}</span>
      </span>
      <strong
        aria-label={placeholderState.accessibleLabel || undefined}
        className="retrofit-picker-metric-value"
      >
        {value}
      </strong>
    </div>
  );
}

function getPickerMetricPlaceholderState(kind: PickerMetricKind, value: string) {
  if (value !== "?") {
    return { accessibleLabel: "", className: "" };
  }
  if (kind === "savings") {
    return {
      className: " metric-placeholder--bill",
      accessibleLabel: "Upload bills to estimate savings."
    };
  }
  if (kind === "cost") {
    return {
      className: " metric-placeholder--question",
      accessibleLabel: "Answer retrofit-specific questions to estimate cost."
    };
  }
  if (kind === "impact") {
    return {
      className: " metric-placeholder--both",
      accessibleLabel: "Upload bills and answer retrofit-specific questions to estimate environmental impact."
    };
  }
  return {
    className: " metric-placeholder--both",
    accessibleLabel: "Upload bills and answer retrofit-specific questions to estimate payback."
  };
}

function RetrofitReadinessRow({
  billsComplete,
  estimateComplete,
  questionsComplete
}: RetrofitReadiness) {
  const items = [
    { complete: billsComplete, label: "Bills" },
    { complete: questionsComplete, label: "Questions" },
    { complete: estimateComplete, label: "Estimate" }
  ];

  return (
    <div
      aria-label={`Retrofit readiness: ${items.map((item) => `${item.label} ${item.complete ? "complete" : "incomplete"}`).join(", ")}`}
      className="retrofit-readiness-row"
    >
      {items.map((item) => (
        <div className="retrofit-readiness-item" key={item.label}>
          <span aria-hidden="true" className={`retrofit-readiness-dot${item.complete ? " is-complete" : ""}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function UploadCloudIcon() {
  return (
    <svg className="upload-cloud-icon" fill="none" viewBox="0 0 48 48">
      <path
        d="M17.2 35.6H14a9.4 9.4 0 0 1-1.6-18.7A12.8 12.8 0 0 1 36.5 20a7.8 7.8 0 0 1-1.9 15.4h-3.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path d="m24 17.8-7.2 7.2M24 17.8l7.2 7.2M24 17.8v24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="chevron-down-icon" fill="none" viewBox="0 0 20 20">
      <path d="m5.8 7.6 4.2 4.2 4.2-4.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function ProfileInfoIcon() {
  return (
    <svg className="sidebar-line-icon" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M5.8 20c.8-3.4 3-5.2 6.2-5.2s5.4 1.8 6.2 5.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg className="sidebar-line-icon" fill="none" viewBox="0 0 24 24">
      <path d="M4.5 19.5h15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
      <path d="M6.5 17V9.5M12 17V5M17.5 17v-4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
      <path d="m6.5 9.5 3.2 3.1 3.8-5.1 4 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function InstructionsIcon() {
  return (
    <svg className="sidebar-line-icon" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M12 10.8v5.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
      <path d="M12 7.8h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
    </svg>
  );
}

function ViewGridIcon() {
  return (
    <svg className="picker-view-icon" fill="none" viewBox="0 0 24 24">
      <rect height="5" rx="1.2" stroke="currentColor" strokeWidth="2" width="5" x="4" y="4" />
      <rect height="5" rx="1.2" stroke="currentColor" strokeWidth="2" width="5" x="15" y="4" />
      <rect height="5" rx="1.2" stroke="currentColor" strokeWidth="2" width="5" x="4" y="15" />
      <rect height="5" rx="1.2" stroke="currentColor" strokeWidth="2" width="5" x="15" y="15" />
    </svg>
  );
}

function ViewPanelIcon() {
  return (
    <svg className="picker-view-icon" fill="none" viewBox="0 0 24 24">
      <path d="M5 6.5h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M5 17.5h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function MetricSavingsIcon() {
  return (
    <svg className="metric-icon metric-savings-icon" fill="none" viewBox="0 0 20 20">
      <path
        d="M14.8 3.4c-4.2.3-8.5 2.2-9.8 5.5-1 2.5.2 5 2.8 5.7 4.2 1.1 7.7-2.7 8.3-9.7.1-.8-.4-1.5-1.3-1.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M4.3 16.2c2.2-3.8 5-6.4 8.6-7.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function MetricCostIcon() {
  return (
    <svg className="metric-icon metric-cost-icon" fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="7.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M10 5.7v8.6M12.2 7.1c-.5-.5-1.2-.8-2-.8-1.3 0-2.2.6-2.2 1.6 0 2.2 4.4 1.1 4.4 3.4 0 1-.9 1.8-2.4 1.8-1 0-1.9-.3-2.5-.9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function MetricPaybackIcon() {
  return (
    <svg className="metric-icon metric-payback-icon" fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="7.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M10 5.8v4.5l3 1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function MetricImpactIcon() {
  return (
    <svg className="metric-icon metric-impact-icon" fill="none" viewBox="0 0 20 20">
      <path
        d="M10 17.2c3.5-1.4 5.8-4.8 5.8-8.6V4.9L10 2.8 4.2 4.9v3.7c0 3.8 2.3 7.2 5.8 8.6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M7.2 10.1 9.2 12l3.8-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function MetricComplexityIcon() {
  return (
    <svg className="metric-icon metric-complexity-icon" fill="none" viewBox="0 0 20 20">
      <path
        d="M7.2 3.3h3.3v2.8h2.8v3.2h-2.8v2.8H7.2V9.3H4.4V6.1h2.8V3.3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M13.3 9.3h2.3v3.3h-2.8v4.1H9.4v-4.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function RetrofitPickerIcon({ retrofit }: { retrofit: RetrofitPreviewCard }) {
  const Icon = iconForRetrofit(retrofit);
  return (
    <div className="retrofit-picker-icon" aria-hidden="true">
      <Icon />
    </div>
  );
}

function SidebarRetrofitIcon({ retrofit }: { retrofit: RetrofitPreviewCard }) {
  // TODO: replace these temporary category-derived icons with a proper retrofit icon set.
  const Icon = iconForRetrofit(retrofit);
  return (
    <span className="sidebar-retrofit-icon" aria-hidden="true">
      <Icon />
    </span>
  );
}

function iconForRetrofit(retrofit: RetrofitPreviewCard) {
  const category = `${retrofit.category || ""} ${retrofit.name}`.toLowerCase();
  return (
    category.includes("insulation") || category.includes("envelope")
      ? HomeOutlineIcon
      : category.includes("solar")
        ? LeafOutlineIcon
        : category.includes("water")
          ? LeafOutlineIcon
          : category.includes("ev") || category.includes("charger")
            ? BuildingOutlineIcon
            : category.includes("hvac") || category.includes("heat pump")
              ? FactoryOutlineIcon
              : category.includes("lighting") || category.includes("led")
                ? LeafOutlineIcon
                : BuildingOutlineIcon
  );
}

function retrofitPickerDescription(retrofit: RetrofitPreviewCard) {
  return customerFriendlyRetrofitDescription({
    category: retrofit.category,
    fallback: retrofit.description,
    id: retrofit.id,
    name: retrofit.name
  });
}

function customerFriendlyRetrofitDescription({
  category,
  fallback,
  id,
  name
}: {
  category?: string;
  fallback?: string;
  id?: string;
  name?: string;
}) {
  const key = `${id || ""} ${name || ""} ${category || ""}`.toLowerCase();

  if (key.includes("insulation") || key.includes("envelope")) return "Improve building envelope efficiency and comfort.";
  if (key.includes("ev") || key.includes("charger")) return "Add EV charging capability for residents or tenants.";
  if (key.includes("heat_pump") || key.includes("heat pump")) return "Upgrade to high-efficiency heat pump systems.";
  if (key.includes("hvac")) return "Replace existing HVAC with high-efficiency equipment.";
  if (key.includes("solar_water") || key.includes("solar thermal") || key.includes("water heating")) return "Use solar energy to heat water efficiently.";
  if (key.includes("solar") || key.includes("pv")) return "Generate clean renewable energy on-site.";
  if (key.includes("led") || key.includes("lighting")) return "Replace existing lights with high-efficiency LEDs.";
  if (key.includes("water") || key.includes("plumb")) return "Reduce water usage with efficient fixtures.";
  if (key.includes("waste_heat") || key.includes("waste heat")) return "Capture and reuse waste heat for efficiency.";
  if (key.includes("refrigeration")) return "Improve refrigeration performance and reduce energy use.";
  if (key.includes("battery") || key.includes("storage")) return "Store energy for resilience and load management.";
  if (key.includes("biomass") || key.includes("biogas")) return "Use organic waste or fuel streams for clean energy.";
  if (key.includes("roof")) return "Improve roof performance and energy efficiency.";
  if (key.includes("window") || key.includes("glazing")) return "Upgrade windows to reduce heat loss and improve comfort.";
  if (key.includes("motor") || key.includes("drive")) return "Improve motor efficiency and control energy use.";
  if (key.includes("compressed_air")) return "Reduce compressed-air leaks and system waste.";
  if (key.includes("audit") || key.includes("study") || key.includes("assessment")) return "Identify savings opportunities and next-step requirements.";

  const cleanedFallback = (fallback || "").replace(/\s+/g, " ").trim();
  if (!cleanedFallback || /^Programs related to/i.test(cleanedFallback) || /^Live programs currently matched/i.test(cleanedFallback)) {
    return "Review matched programs, savings, and next steps for this retrofit.";
  }
  return cleanedFallback.replace(/\.$/, ".").slice(0, 110);
}

function retrofitPickerSavings(retrofit: RetrofitPreviewCard, hideBillData: boolean) {
  if (hideBillData) return "?";
  const annual = retrofit.metrics.recurringOperationalSavingsAnnual;
  if (annual == null) return "Needs bill";
  if (annual < 0) return "Net impact pending";
  return `${formatCompactCents(annual)}/yr`;
}

function retrofitPickerCost(retrofit: RetrofitPreviewCard, hideBillData: boolean) {
  if (hideBillData) return "?";
  const cost =
    retrofit.metrics.effectiveCostAfterOneTimeBenefits ??
    retrofit.metrics.netCostBeforeTaxBenefits ??
    retrofit.metrics.estimatedUpfrontProjectCost;
  return cost == null ? "?" : formatCompactCents(cost);
}

function retrofitPickerPayback(retrofit: RetrofitPreviewCard, hideBillData: boolean) {
  if (hideBillData) return "?";
  return formatPayback(retrofit.metrics.paybackPeriodYears, "?");
}

function retrofitPickerEnvironmentalImpact() {
  return "?";
}

function formatCompactCents(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "Not calculated";
  const amount = value / 100;
  const absolute = Math.abs(amount);
  if (absolute >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `$${millions.toFixed(absolute >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`;
  }
  if (absolute >= 1_000) {
    const thousands = amount / 1_000;
    return `$${thousands.toFixed(absolute >= 10_000 ? 0 : 1).replace(/\.0$/, "")}k`;
  }
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency"
  }).format(amount);
}

function EstimateProgressStepper() {
  const steps = [
    { id: "bills", label: "Bills", complete: true, number: 1 },
    { id: "questions", label: "Questions", complete: true, number: 2 },
    { id: "estimate", label: "Estimate", active: true, number: 3 },
    { id: "implementation", label: "Implementation", number: 4 },
    { id: "application", label: "Application", number: 5 },
    { id: "dashboard", label: "Dashboard", number: 6 }
  ];

  return (
    <nav aria-label="Retrofit workflow progress" className="estimate-progress-stepper">
      {steps.map((step, index) => (
        <div className={`estimate-progress-step${step.complete ? " is-complete" : ""}${step.active ? " is-active" : ""}`} key={step.id}>
          <span className="estimate-progress-circle">{step.complete ? "✓" : step.number}</span>
          <span>{step.label}</span>
          {index < steps.length - 1 ? <i aria-hidden="true" /> : null}
        </div>
      ))}
    </nav>
  );
}

function EstimateMetricCard({
  icon,
  label,
  subtitle,
  value
}: {
  icon: ReactNode;
  label: string;
  subtitle: string;
  value: string;
}) {
  return (
    <article className="estimate-metric-card">
      <span className="estimate-card-icon" aria-hidden="true">{icon}</span>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{subtitle}</small>
      </div>
    </article>
  );
}

function EstimateInfoRow({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="estimate-info-row">
      {icon ? <span className="estimate-info-icon" aria-hidden="true">{icon}</span> : null}
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

function EstimateMiniIcon({ children }: { children: ReactNode }) {
  return <span className="estimate-mini-icon" aria-hidden="true">{children}</span>;
}

function EstimateImpactIllustration() {
  return (
    <svg className="estimate-impact-illustration" fill="none" viewBox="0 0 360 150" aria-hidden="true">
      <path d="M14 132c40-42 79-48 117-18 26-34 67-42 112-21 33 15 65 17 103 4v35H14Z" fill="#dceee0" />
      <path d="M157 75 207 32l50 43v57H157V75Z" fill="#98c995" />
      <path d="M178 82h19v23h-19zM217 82h19v50h-19z" fill="#f7fbf8" />
      <path d="M281 132V82" stroke="#79b879" strokeLinecap="round" strokeWidth="4" />
      <path d="M281 85c20-11 30-1 27 15-3 16-16 24-27 24s-24-8-27-24c-3-16 7-26 27-15Z" fill="#a9d7a9" />
      <path d="M111 132V91" stroke="#7ebd84" strokeLinecap="round" strokeWidth="4" />
      <path d="M111 91c14 11 19 22 13 33-12 0-20-9-13-33ZM111 91c-14 11-19 22-13 33 12 0 20-9 13-33Z" fill="#a8d5a6" />
      <path d="M39 64c18-11 35-9 49 6M266 41c15-7 28-5 40 5M78 42c21-15 45-13 61 6" stroke="#d2ead6" strokeLinecap="round" strokeWidth="12" />
    </svg>
  );
}

function EstimateImpactProjectionChart() {
  const years = Array.from({ length: 10 }, (_, index) => index + 1);
  const width = 920;
  const height = 360;
  const plot = { left: 76, right: 28, top: 36, bottom: 58 };
  const plotWidth = width - plot.left - plot.right;
  const plotHeight = height - plot.top - plot.bottom;
  const yTicks = Array.from({ length: 5 }, (_, index) => index);
  const xForYear = (year: number) => plot.left + ((year - 1) / (years.length - 1)) * plotWidth;

  return (
    <section className="estimate-impact-projection-card" aria-labelledby="impact-projection-title">
      <div className="estimate-impact-projection-header">
        <span className="estimate-impact-leaf" aria-hidden="true"><MetricSavingsIcon /></span>
        <div>
          <h3 id="impact-projection-title">Cumulative CO2e avoided <span aria-label="Projection details">ⓘ</span></h3>
          <p>Total cumulative CO2e avoided by this retrofit over time.</p>
        </div>
        <aside aria-label="Ten year cumulative impact estimate">
          <small>10-year total</small>
          <strong>Unknown</strong>
          <span>Cumulative CO2e avoided</span>
        </aside>
      </div>
      <div className="estimate-impact-projection-chart">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Cumulative CO2e avoided forecast chart. Projection values are unknown.">
          <defs>
            <linearGradient id="impactProjectionEmptyGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#dff0e5" stopOpacity="0.68" />
              <stop offset="100%" stopColor="#f7fbf8" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <text className="estimate-impact-chart-unit" x="0" y={plot.top - 14}>tCO2e</text>
          {yTicks.map((tick) => {
            const y = plot.top + tick * (plotHeight / (yTicks.length - 1));
            return (
              <g key={`impact-y:${tick}`}>
                <text className="estimate-impact-chart-y-label" x={plot.left - 16} y={y + 5} textAnchor="end">{tick === yTicks.length - 1 ? "0" : "Unknown"}</text>
                <line className="estimate-impact-chart-grid" x1={plot.left} x2={width - plot.right} y1={y} y2={y} />
              </g>
            );
          })}
          <line className="estimate-impact-chart-axis" x1={plot.left} x2={width - plot.right} y1={height - plot.bottom} y2={height - plot.bottom} />
          <line className="estimate-impact-chart-axis" x1={plot.left} x2={plot.left} y1={plot.top} y2={height - plot.bottom} />
          <rect className="estimate-impact-chart-empty-area" x={plot.left} y={plot.top} width={plotWidth} height={plotHeight} />
          {years.map((year) => (
            <text className="estimate-impact-chart-x-label" key={`impact-x:${year}`} x={xForYear(year)} y={height - 20} textAnchor="middle">
              {`Year ${year}`}
            </text>
          ))}
        </svg>
        <div className="estimate-impact-projection-empty">
          <strong>Unknown</strong>
          <span>Cumulative impact forecast will appear after backend sustainability projections are available.</span>
        </div>
      </div>
    </section>
  );
}

type ProjectFundingSegmentTone = "utility" | "tax" | "grant" | "financing" | "user";

type ProjectFundingSegment = {
  id: string;
  label: string;
  amountCents: number | null;
  tone: ProjectFundingSegmentTone;
};

function nonNegativeCents(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.max(0, value);
}

function opportunityFundingTone(opportunity: RetrofitOpportunityPreview): Exclude<ProjectFundingSegmentTone, "financing" | "user"> {
  const fundingText = `${opportunity.type} ${opportunity.name} ${opportunity.description}`.toLowerCase();
  if (opportunity.timing === "tax_time" || fundingText.includes("tax")) return "tax";
  if (fundingText.includes("grant")) return "grant";
  return "utility";
}

function formatProjectFundingPercent(value: number | null) {
  if (value == null || !Number.isFinite(value)) return "Unknown";
  return `${value.toFixed(value < 10 && value % 1 !== 0 ? 1 : 0)}%`;
}

function EstimateProjectFundingChart({
  segments,
  totalCostCents
}: {
  segments: ProjectFundingSegment[];
  totalCostCents: number | null;
}) {
  const knownTotal = segments.reduce((sum, segment) => sum + (segment.amountCents || 0), 0);
  const denominator =
    totalCostCents != null && totalCostCents > 0
      ? Math.max(totalCostCents, knownTotal)
      : knownTotal > 0
        ? knownTotal
        : null;
  const chartSegments = denominator == null ? [] : segments.filter((segment) => (segment.amountCents || 0) > 0);

  return (
    <section className="estimate-project-funding-card" aria-labelledby="project-funding-title">
      <header className="estimate-project-funding-header">
        <span className="estimate-project-funding-icon" aria-hidden="true"><MetricCostIcon /></span>
        <div>
          <h3 id="project-funding-title">How your project is funded</h3>
          <p>Total project cost: {formatEstimateCents(totalCostCents, "Unknown")}</p>
        </div>
      </header>

      <div className="estimate-project-funding-bar" aria-label="Project funding mix">
        {chartSegments.length ? (
          chartSegments.map((segment) => {
            const percent = denominator ? ((segment.amountCents || 0) / denominator) * 100 : null;
            return (
              <div
                className={`estimate-project-funding-segment is-${segment.tone}`}
                key={segment.id}
                style={{ "--funding-width": `${Math.max(percent || 0, 3)}%` } as CSSProperties}
              >
                <strong>{formatProjectFundingPercent(percent)}</strong>
                <span>{formatEstimateCents(segment.amountCents, "Unknown")}</span>
              </div>
            );
          })
        ) : (
          <div className="estimate-project-funding-empty">Unknown</div>
        )}
      </div>

      <div className="estimate-project-funding-legend">
        {segments.map((segment) => {
          const percent = denominator && segment.amountCents != null ? (segment.amountCents / denominator) * 100 : null;
          const amountLabel =
            segment.amountCents == null
              ? "Unknown"
              : denominator == null
                ? formatEstimateCents(segment.amountCents, "$0")
                : `${formatProjectFundingPercent(percent)} (${formatEstimateCents(segment.amountCents, "$0")})`;
          return (
            <div className="estimate-project-funding-legend-item" key={segment.id}>
              <span className={`estimate-project-funding-swatch is-${segment.tone}`} aria-hidden="true" />
              <div>
                <strong>{segment.label}</strong>
                <small>{amountLabel}</small>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

type OneTimeCostWaterfallInput = {
  projectCostCents: number | null;
  upfrontIncentiveCents: number | null;
  selectedRebatesCents: number | null;
  oneTimeTaxBenefitsCents: number | null;
  effectiveCostCents: number | null;
};

type CashFlowChartInput = {
  initialInvestmentCents: number | null;
  annualCashFlowCents: number | null;
  paybackYears: number | null;
};

function formatFinancialChartCurrency(value: number | null | undefined, fallback = "Unknown") {
  if (value == null || !Number.isFinite(value)) return fallback;
  return formatEstimateCents(value, fallback);
}

function formatFinancialChartSignedCurrency(value: number | null | undefined, fallback = "Unknown") {
  if (value == null || !Number.isFinite(value)) return fallback;
  if (value === 0) return "$0";
  return `${value < 0 ? "-" : ""}${formatEstimateCents(Math.abs(value), fallback)}`;
}

function formatFinancialChartCompactCurrency(value: number | null | undefined, fallback = "Unknown") {
  if (value == null || !Number.isFinite(value)) return fallback;
  const dollars = value / 100;
  const absDollars = Math.abs(dollars);
  const sign = dollars < 0 ? "-" : "";
  if (absDollars >= 1_000_000) {
    const compact = absDollars / 1_000_000;
    return `${sign}$${compact.toFixed(compact >= 10 || compact % 1 === 0 ? 0 : 1)}M`;
  }
  if (absDollars >= 1_000) {
    const compact = absDollars / 1_000;
    return `${sign}$${compact.toFixed(compact >= 10 || compact % 1 === 0 ? 0 : 1)}K`;
  }
  return formatFinancialChartSignedCurrency(value, fallback);
}

function formatFinancialChartNegativeAxis(value: number) {
  if (value < 0) return `(${formatFinancialChartCompactCurrency(Math.abs(value))})`;
  return formatFinancialChartCompactCurrency(value);
}

function financialChartNiceMax(value: number) {
  const dollars = Math.max(1, value / 100);
  const magnitude = 10 ** Math.floor(Math.log10(dollars));
  const normalized = dollars / magnitude;
  const nice = normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return nice * magnitude * 100;
}

function splitFinancialChartText(value: string, maxLength: number) {
  return value.split(" ").reduce<string[]>((lines, word) => {
    const current = lines[lines.length - 1] || "";
    if (`${current} ${word}`.trim().length > maxLength) return [...lines, word];
    return [...lines.slice(0, -1), `${current} ${word}`.trim()];
  }, [""]);
}

function EstimateChartUnknownState({ children }: { children: ReactNode }) {
  return (
    <div className="estimate-financial-chart-unknown">
      <strong>Unknown</strong>
      <span>{children}</span>
    </div>
  );
}

function EstimateOneTimeCostWaterfallChart({
  projectCostCents,
  upfrontIncentiveCents,
  selectedRebatesCents,
  oneTimeTaxBenefitsCents,
  effectiveCostCents
}: OneTimeCostWaterfallInput) {
  const width = 960;
  const height = 430;
  const plot = { left: 76, right: 36, top: 40, bottom: 120 };
  const plotWidth = width - plot.left - plot.right;
  const plotHeight = height - plot.top - plot.bottom;
  const reductions = [
    {
      id: "upfront-incentive",
      label: "Upfront financial incentive",
      description: "Instant savings at time of purchase",
      valueCents: upfrontIncentiveCents
    },
    {
      id: "selected-rebates",
      label: "Selected rebates / grants",
      description: "Rebates and grants you qualify for",
      valueCents: selectedRebatesCents
    },
    {
      id: "one-time-tax-benefits",
      label: "One-time tax benefits",
      description: "Tax credits and deductions",
      valueCents: oneTimeTaxBenefitsCents
    }
  ];
  const allReductionsKnown = reductions.every((step) => step.valueCents != null);
  const computedEffectiveCost =
    projectCostCents != null && allReductionsKnown
      ? Math.max(0, projectCostCents - reductions.reduce((sum, step) => sum + (step.valueCents || 0), 0))
      : null;
  const finalCostCents = effectiveCostCents ?? computedEffectiveCost;
  const valuesForScale = [
    projectCostCents,
    finalCostCents,
    ...reductions.map((step) => step.valueCents)
  ].filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const maxCents = valuesForScale.length ? financialChartNiceMax(Math.max(...valuesForScale, projectCostCents || 0)) : null;
  const yForValue = (value: number) => {
    if (!maxCents || maxCents <= 0) return plot.top + plotHeight;
    return plot.top + (1 - value / maxCents) * plotHeight;
  };
  const xPositions = [0, 1, 2, 3, 4].map((index) => plot.left + index * (plotWidth / 4));
  const barWidth = 92;
  const tickValues = maxCents == null ? [] : Array.from({ length: 6 }, (_, index) => Math.round((maxCents / 5) * index));

  let runningCents = projectCostCents ?? 0;
  const reductionBars = reductions.map((step, index) => {
    const startCents = runningCents;
    const valueCents = nonNegativeCents(step.valueCents);
    const endCents = valueCents == null ? runningCents : Math.max(0, runningCents - valueCents);
    runningCents = endCents;
    return {
      ...step,
      x: xPositions[index + 1],
      startCents,
      endCents,
      valueCents
    };
  });

  return (
    <section className="estimate-financial-visual-card" aria-labelledby="one-time-cost-waterfall-title">
      <header className="estimate-financial-chart-header">
        <span className="estimate-project-funding-icon" aria-hidden="true"><MetricCostIcon /></span>
        <div>
          <h3 id="one-time-cost-waterfall-title">One-time cost waterfall</h3>
          <p>How one-time benefits reduce the upfront project cost.</p>
        </div>
        <aside>
          <small>You save</small>
          <strong>{projectCostCents != null && finalCostCents != null ? formatFinancialChartCurrency(projectCostCents - finalCostCents) : "Unknown"}</strong>
          <span>
            {projectCostCents != null && finalCostCents != null && projectCostCents > 0
              ? `${formatProjectFundingPercent(((projectCostCents - finalCostCents) / projectCostCents) * 100)} lower cost`
              : "Cost reduction unknown"}
          </span>
        </aside>
      </header>

      {projectCostCents == null || maxCents == null ? (
        <EstimateChartUnknownState>Project cost is needed before the waterfall can be drawn.</EstimateChartUnknownState>
      ) : (
        <div className="estimate-financial-chart-scroll">
          <svg className="estimate-financial-waterfall-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="One-time cost waterfall chart">
            {tickValues.map((tick) => {
              const y = yForValue(tick);
              return (
                <g key={`waterfall-tick:${tick}`}>
                  <line className="estimate-financial-grid-line" x1={plot.left} x2={width - plot.right} y1={y} y2={y} />
                  <text className="estimate-financial-axis-label" x={plot.left - 12} y={y + 4} textAnchor="end">
                    {formatFinancialChartCompactCurrency(tick)}
                  </text>
                </g>
              );
            })}
            <line className="estimate-financial-axis-line" x1={plot.left} x2={width - plot.right} y1={yForValue(0)} y2={yForValue(0)} />
            <text className="estimate-financial-axis-title" x="18" y={plot.top + plotHeight / 2} transform={`rotate(-90 18 ${plot.top + plotHeight / 2})`}>
              Dollars (USD)
            </text>

            <rect
              className="estimate-waterfall-bar is-total"
              height={yForValue(0) - yForValue(projectCostCents)}
              rx="3"
              width={barWidth}
              x={xPositions[0] - barWidth / 2}
              y={yForValue(projectCostCents)}
            />
            <text className="estimate-waterfall-value is-total" x={xPositions[0]} y={yForValue(projectCostCents) - 12} textAnchor="middle">
              {formatFinancialChartCurrency(projectCostCents)}
            </text>

            {reductionBars.map((step, index) => {
              const currentY = yForValue(step.startCents);
              const nextY = yForValue(step.endCents);
              const previousRight = (index === 0 ? xPositions[0] : reductionBars[index - 1].x) + barWidth / 2;
              const currentLeft = step.x - barWidth / 2;
              return (
                <g key={step.id}>
                  <line className="estimate-waterfall-connector" x1={previousRight} x2={currentLeft} y1={currentY} y2={currentY} />
                  {step.valueCents == null ? (
                    <text className="estimate-waterfall-value" x={step.x} y={currentY - 12} textAnchor="middle">Unknown</text>
                  ) : (
                    <>
                      <rect
                        className="estimate-waterfall-bar is-reduction"
                        height={Math.max(4, Math.abs(nextY - currentY))}
                        rx="3"
                        width={barWidth}
                        x={currentLeft}
                        y={Math.min(currentY, nextY)}
                      />
                      <text className="estimate-waterfall-value is-reduction" x={step.x} y={Math.max(currentY, nextY) + 22} textAnchor="middle">
                        {formatFinancialChartSignedCurrency(-step.valueCents)}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            <line className="estimate-waterfall-connector" x1={reductionBars[2].x + barWidth / 2} x2={xPositions[4] - barWidth / 2} y1={yForValue(runningCents)} y2={yForValue(runningCents)} />
            {finalCostCents == null ? (
              <text className="estimate-waterfall-value is-final" x={xPositions[4]} y={yForValue(runningCents) - 12} textAnchor="middle">Unknown</text>
            ) : (
              <>
                <rect
                  className="estimate-waterfall-bar is-final"
                  height={yForValue(0) - yForValue(finalCostCents)}
                  rx="3"
                  width={barWidth}
                  x={xPositions[4] - barWidth / 2}
                  y={yForValue(finalCostCents)}
                />
                <text className="estimate-waterfall-value is-final" x={xPositions[4]} y={yForValue(finalCostCents) - 12} textAnchor="middle">
                  {formatFinancialChartCurrency(finalCostCents)}
                </text>
              </>
            )}

            {[
              { label: "Project cost", description: "Total cost before any benefits" },
              ...reductions.map((step) => ({ label: step.label, description: step.description })),
              { label: "Effective project cost after one-time benefits", description: "Your out-of-pocket cost after one-time benefits" }
            ].map((step, index) => (
              <text className={`estimate-waterfall-label${index === 4 ? " is-final" : ""}`} key={`waterfall-label:${step.label}`} x={xPositions[index]} y={height - 74} textAnchor="middle">
                {splitFinancialChartText(step.label, 22).map((line, lineIndex) => (
                  <tspan key={`${step.label}:line:${lineIndex}`} x={xPositions[index]} dy={lineIndex === 0 ? 0 : 16}>{line}</tspan>
                ))}
                {splitFinancialChartText(step.description, 24).map((line, lineIndex) => (
                  <tspan className="estimate-waterfall-description" key={`${step.label}:description:${lineIndex}`} x={xPositions[index]} dy={lineIndex === 0 ? 26 : 15}>{line}</tspan>
                ))}
              </text>
            ))}
          </svg>
        </div>
      )}
    </section>
  );
}

function cashFlowValueAtYear(initialInvestmentCents: number, annualCashFlowCents: number, year: number) {
  return -initialInvestmentCents + annualCashFlowCents * year;
}

function normalizedPaybackYears(input: CashFlowChartInput) {
  if (typeof input.paybackYears === "number" && Number.isFinite(input.paybackYears) && input.paybackYears >= 0) return input.paybackYears;
  if (input.initialInvestmentCents == null || input.annualCashFlowCents == null || input.annualCashFlowCents <= 0) return null;
  return input.initialInvestmentCents / input.annualCashFlowCents;
}

function EstimatePaybackTimelineChart({ initialInvestmentCents, annualCashFlowCents, paybackYears }: CashFlowChartInput) {
  const width = 960;
  const height = 390;
  const plot = { left: 92, right: 42, top: 52, bottom: 58 };
  const plotWidth = width - plot.left - plot.right;
  const plotHeight = height - plot.top - plot.bottom;
  const payback = normalizedPaybackYears({ initialInvestmentCents, annualCashFlowCents, paybackYears });
  const canPlot = initialInvestmentCents != null && annualCashFlowCents != null && annualCashFlowCents > 0;
  const endYear = Math.max(5, Math.ceil((payback ?? 4) + 1));
  const pointYears = Array.from(new Set([0, 1, 3, ...(payback != null && payback <= endYear ? [payback] : []), endYear])).sort((a, b) => a - b);
  const values = canPlot ? pointYears.map((year) => cashFlowValueAtYear(initialInvestmentCents, annualCashFlowCents, year)) : [];
  const minValue = values.length ? Math.min(...values, 0) : -1;
  const maxValue = values.length ? Math.max(...values, 0) : 1;
  const padding = Math.max((maxValue - minValue) * 0.12, 10000);
  const yMin = minValue - padding;
  const yMax = maxValue + padding;
  const xForYear = (year: number) => plot.left + (year / endYear) * plotWidth;
  const yForValue = (value: number) => plot.top + ((yMax - value) / (yMax - yMin)) * plotHeight;
  const zeroY = yForValue(0);
  const points = canPlot ? pointYears.map((year) => ({ year, value: cashFlowValueAtYear(initialInvestmentCents, annualCashFlowCents, year), x: xForYear(year), y: yForValue(cashFlowValueAtYear(initialInvestmentCents, annualCashFlowCents, year)) })) : [];
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const paybackX = payback == null ? null : xForYear(Math.min(payback, endYear));

  return (
    <section className="estimate-financial-visual-card" aria-labelledby="payback-timeline-title">
      <header className="estimate-financial-chart-header">
        <span className="estimate-project-funding-icon" aria-hidden="true"><MetricPaybackIcon /></span>
        <div>
          <h3 id="payback-timeline-title">Payback timeline</h3>
          <p>Cumulative cash flow over time.</p>
        </div>
        <aside>
          <small>{payback == null ? "Payback unknown" : "Payback achieved"}</small>
          <strong>{payback == null ? "Unknown" : formatPayback(payback)}</strong>
          <span>{payback == null ? "Needs cost and annual savings" : `Positive cash flow from Year ${Math.ceil(payback)}`}</span>
        </aside>
      </header>

      {!canPlot ? (
        <EstimateChartUnknownState>Annual cash-flow and effective cost are needed before payback can be plotted.</EstimateChartUnknownState>
      ) : (
        <div className="estimate-financial-chart-scroll">
          <svg className="estimate-payback-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Payback timeline chart">
            <rect className="estimate-payback-positive-zone" x={plot.left} y={plot.top} width={plotWidth} height={Math.max(0, zeroY - plot.top)} />
            <rect className="estimate-payback-negative-zone" x={plot.left} y={zeroY} width={plotWidth} height={Math.max(0, plot.top + plotHeight - zeroY)} />
            <line className="estimate-financial-axis-line is-zero" x1={plot.left} x2={width - plot.right} y1={zeroY} y2={zeroY} />
            <line className="estimate-financial-axis-line" x1={plot.left} x2={plot.left} y1={plot.top} y2={plot.top + plotHeight} />
            <line className="estimate-financial-axis-line" x1={plot.left} x2={width - plot.right} y1={plot.top + plotHeight} y2={plot.top + plotHeight} />
            <text className="estimate-payback-zone-label is-positive" x={plot.left - 12} y={zeroY - 120} textAnchor="end">Net positive</text>
            <text className="estimate-payback-zone-label is-negative" x={plot.left - 12} y={zeroY + 120} textAnchor="end">Net negative</text>
            <text className="estimate-financial-axis-label" x={plot.left - 12} y={zeroY + 5} textAnchor="end">$0</text>
            {points.map((point) => (
              <line className="estimate-payback-point-guide" key={`payback-guide:${point.year}`} x1={point.x} x2={point.x} y1={point.y} y2={plot.top + plotHeight} />
            ))}
            <path className="estimate-cashflow-line" d={linePath} />
            {points.map((point) => (
              <circle className="estimate-cashflow-point" cx={point.x} cy={point.y} key={`payback-point:${point.year}`} r={6} />
            ))}
            {payback != null && paybackX != null ? (
              <>
                <line className="estimate-payback-marker-line" x1={paybackX} x2={paybackX} y1={zeroY} y2={plot.top + plotHeight} />
                <circle className="estimate-payback-marker" cx={paybackX} cy={zeroY} r={10} />
                <g className="estimate-payback-callout" transform={`translate(${Math.min(paybackX + 16, width - 310)} ${Math.max(plot.top + 22, zeroY - 118)})`}>
                  <rect height="70" rx="10" width="250" />
                  <text x="18" y="30">Payback: {formatPayback(payback)}</text>
                  <text className="estimate-payback-callout-subtitle" x="18" y="54">Investment recovered</text>
                </g>
              </>
            ) : null}
            {[0, 1, 3, endYear].map((year) => (
              <text className="estimate-financial-x-label" key={`payback-x:${year}`} x={xForYear(year)} y={height - 16} textAnchor="middle">
                {year === 0 ? "Today" : `Year ${year}`}
              </text>
            ))}
          </svg>
        </div>
      )}
    </section>
  );
}

function EstimateCumulativeCashFlowChart({ initialInvestmentCents, annualCashFlowCents, paybackYears }: CashFlowChartInput) {
  const width = 960;
  const height = 430;
  const plot = { left: 96, right: 34, top: 38, bottom: 70 };
  const plotWidth = width - plot.left - plot.right;
  const plotHeight = height - plot.top - plot.bottom;
  const canPlot = initialInvestmentCents != null && annualCashFlowCents != null && annualCashFlowCents > 0;
  const payback = normalizedPaybackYears({ initialInvestmentCents, annualCashFlowCents, paybackYears });
  const years = Array.from({ length: 11 }, (_, index) => index);
  const values = canPlot ? years.map((year) => cashFlowValueAtYear(initialInvestmentCents, annualCashFlowCents, year)) : [];
  const minValue = values.length ? Math.min(...values, 0) : -1;
  const maxValue = values.length ? Math.max(...values, 0) : 1;
  const padding = Math.max((maxValue - minValue) * 0.12, 10000);
  const yMin = minValue - padding;
  const yMax = maxValue + padding;
  const xForYear = (year: number) => plot.left + (year / 10) * plotWidth;
  const yForValue = (value: number) => plot.top + ((yMax - value) / (yMax - yMin)) * plotHeight;
  const zeroY = yForValue(0);
  const points = canPlot ? years.map((year) => ({ year, value: cashFlowValueAtYear(initialInvestmentCents, annualCashFlowCents, year), x: xForYear(year), y: yForValue(cashFlowValueAtYear(initialInvestmentCents, annualCashFlowCents, year)) })) : [];
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = points.length ? `${linePath} L ${points[points.length - 1].x} ${zeroY} L ${points[0].x} ${zeroY} Z` : "";
  const tickValues = Array.from({ length: 5 }, (_, index) => yMin + ((yMax - yMin) / 4) * index);
  const yearTenValue = values.length ? values[values.length - 1] : null;
  const paybackX = payback == null ? null : xForYear(Math.min(payback, 10));

  return (
    <section className="estimate-financial-visual-card" aria-labelledby="cumulative-cashflow-title">
      <header className="estimate-financial-chart-header">
        <span className="estimate-project-funding-icon" aria-hidden="true"><MetricSavingsIcon /></span>
        <div>
          <h3 id="cumulative-cashflow-title">Cumulative cash flow over 10 years</h3>
          <p>Total cumulative cash flow (USD).</p>
        </div>
        <aside>
          <small>10-year total</small>
          <strong>{formatFinancialChartCurrency(yearTenValue)}</strong>
          <span>Cumulative cash flow</span>
        </aside>
      </header>

      {!canPlot ? (
        <EstimateChartUnknownState>Annual cash-flow and effective cost are needed before the 10-year forecast can be plotted.</EstimateChartUnknownState>
      ) : (
        <div className="estimate-financial-chart-scroll">
          <svg className="estimate-cumulative-cashflow-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Cumulative cash flow over ten years chart">
            <defs>
              <linearGradient id="cashFlowPositiveGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#98d4a8" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#f7fbf8" stopOpacity="0.06" />
              </linearGradient>
              <linearGradient id="cashFlowNegativeGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fff6f4" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#f7b4a7" stopOpacity="0.32" />
              </linearGradient>
            </defs>
            {tickValues.map((tick) => {
              const y = yForValue(tick);
              return (
                <g key={`cashflow-y:${tick}`}>
                  <line className="estimate-financial-grid-line" x1={plot.left} x2={width - plot.right} y1={y} y2={y} />
                  <text className={`estimate-financial-axis-label${tick < 0 ? " is-negative" : ""}`} x={plot.left - 12} y={y + 5} textAnchor="end">
                    {formatFinancialChartNegativeAxis(Math.round(tick))}
                  </text>
                </g>
              );
            })}
            <rect className="estimate-cashflow-negative-area" x={plot.left} y={zeroY} width={plotWidth} height={Math.max(0, plot.top + plotHeight - zeroY)} />
            <path className="estimate-cashflow-area" d={areaPath} />
            <line className="estimate-financial-axis-line is-zero" x1={plot.left} x2={width - plot.right} y1={zeroY} y2={zeroY} />
            <line className="estimate-financial-axis-line" x1={plot.left} x2={plot.left} y1={plot.top} y2={plot.top + plotHeight} />
            <line className="estimate-financial-axis-line" x1={plot.left} x2={width - plot.right} y1={plot.top + plotHeight} y2={plot.top + plotHeight} />
            <text className="estimate-financial-axis-title" x="22" y={plot.top + plotHeight / 2} transform={`rotate(-90 22 ${plot.top + plotHeight / 2})`}>
              Cumulative Cash Flow (USD)
            </text>
            <path className="estimate-cashflow-line" d={linePath} />
            {points.map((point) => (
              <circle className="estimate-cashflow-point" cx={point.x} cy={point.y} key={`cashflow-point:${point.year}`} r={5} />
            ))}
            {payback != null && payback <= 10 && paybackX != null ? (
              <>
                <line className="estimate-payback-marker-line" x1={paybackX} x2={paybackX} y1={zeroY} y2={plot.top + plotHeight} />
                <circle className="estimate-payback-marker" cx={paybackX} cy={zeroY} r={9} />
                <g className="estimate-payback-callout" transform={`translate(${Math.max(plot.left + 12, Math.min(paybackX - 115, width - 270))} ${Math.max(plot.top + 24, zeroY - 88)})`}>
                  <rect height="58" rx="9" width="230" />
                  <text x="18" y="35">Pays back in {formatPayback(payback)}</text>
                </g>
              </>
            ) : null}
            {years.map((year) => (
              <text className="estimate-financial-x-label" key={`cashflow-x:${year}`} x={xForYear(year)} y={height - 22} textAnchor="middle">{year}</text>
            ))}
            <g className="estimate-cashflow-legend" transform={`translate(${width - 260} 20)`}>
              <line x1="0" x2="36" y1="0" y2="0" />
              <text x="48" y="5">Cumulative cash flow</text>
            </g>
          </svg>
        </div>
      )}
    </section>
  );
}

function RetrofitPreviewCardView({
  credential,
  initialWorkspaceTab = "overview",
  onAddToPlan,
  onExploreFinancing,
  onSelectScenario,
  onToggleOpportunity,
  retrofit,
  hideBillData,
  isDetailLoading = false,
  selectedScenarioId,
  selectedOpportunityIds
}: {
  credential?: AuthCredential | null;
  initialWorkspaceTab?: "overview";
  onAddToPlan: () => void;
  onExploreFinancing: () => void;
  onSelectScenario: (scenarioId: string) => void;
  onToggleOpportunity: (opportunityId: string) => void;
  retrofit: RetrofitPreviewCard;
  hideBillData: boolean;
  isDetailLoading?: boolean;
  selectedScenarioId: string;
  selectedOpportunityIds: Record<string, boolean>;
}) {
  type EstimateWorkspaceTab = "overview" | "financials" | "scenariosOpportunities" | "environmental" | "application";
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<EstimateWorkspaceTab>(initialWorkspaceTab);
  const [financialPeriod, setFinancialPeriod] = useState<"monthly" | "annual">("annual");
  const [showCalculationBreakdown, setShowCalculationBreakdown] = useState(true);
  const [scenarioOpportunityDetailIdByRetrofit, setScenarioOpportunityDetailIdByRetrofit] = useState<Record<string, string>>({});
  const [applicationPrepOpportunity, setApplicationPrepOpportunity] = useState<RetrofitOpportunityPreview | null>(null);
  const [applicationPrepProfiles, setApplicationPrepProfiles] = useState<Record<string, CustomerApplicationProfileResponse>>({});
  const billDataLocked = hideBillData;
  useEffect(() => {
    setActiveWorkspaceTab(initialWorkspaceTab);
  }, [initialWorkspaceTab, retrofit.id]);
  const selectedCount = retrofit.opportunities.filter((opportunity) => selectedOpportunityIds[opportunity.id]).length;
  const selectedScenario = retrofit.scenarios.find((scenario) => scenario.id === selectedScenarioId) || retrofit.scenarios[0];
  const selectedScenarioOpportunities = getSelectedOpportunitiesForScenario(retrofit, selectedScenario, selectedOpportunityIds);
  const deselectedScenarioOpportunityIds = [
    ...(selectedScenario?.deselectedOpportunityIds || []),
    ...((selectedScenario?.selectedOpportunityIds || []).filter((id) => selectedOpportunityIds[id] === false))
  ];
  const deselectedScenarioOpportunities = retrofit.opportunities.filter((opportunity) => deselectedScenarioOpportunityIds.includes(opportunity.id));
  const selectedIncludedOpportunities = getIncludedOpportunitiesForCurrentEstimate(retrofit, selectedScenario, selectedOpportunityIds);
  const selectedPendingOpportunities = selectedScenarioOpportunities.filter((opportunity) => {
    const selected = selectedOpportunityIds[opportunity.id] !== false;
    return selected && getOpportunityIncludedLabel(opportunity, selected) !== "Included in current estimate";
  });
  const unselectedOpportunities = retrofit.opportunities.filter((opportunity) => !selectedOpportunityIds[opportunity.id]);
  const needsReviewOpportunities = unselectedOpportunities.filter((opportunity) =>
    !opportunity.sourceUrl ||
    opportunity.eligibilityStatus === "unknown" ||
    opportunity.eligibilityStatus === "needs review" ||
    opportunity.requiredInfo.includes("utility territory confirmation")
  );
  const environmentalImpact = retrofit.environmentalImpact;
  const displayedEnvironmentalImpact = billDataLocked
    ? maskEnvironmentalImpactForNoBillData(environmentalImpact)
    : environmentalImpact;
  const displayedUpfrontFinancialIncentive = billDataLocked ? null : retrofit.metrics.upfrontFinancialIncentive ?? null;
  const displayedNetCostBeforeTaxBenefits =
    billDataLocked
      ? null
      : retrofit.metrics.estimatedUpfrontProjectCost != null
      ? Math.max(0, retrofit.metrics.estimatedUpfrontProjectCost - (displayedUpfrontFinancialIncentive || 0))
      : null;
  const financialBreakdown = [
    {
      id: "project-cost",
      label: "Project cost",
      value: billDataLocked ? "?" : formatMaybeCents(retrofit.metrics.estimatedUpfrontProjectCost, "Needs quote"),
      basis: billDataLocked ? "Upload bills to unlock savings, payback, and detailed retrofit recommendations." : retrofit.metrics.estimatedUpfrontProjectCost != null ? "Based on current estimate" : "Needs confirmed quote"
    },
    {
      id: "incentives",
      label: "Less selected upfront rebates or grants",
      value: billDataLocked ? "?" : formatMaybeCents(displayedUpfrontFinancialIncentive, selectedCount ? "Not included yet" : "No selected incentives"),
      basis: billDataLocked ? "Upload bills to unlock savings, payback, and detailed retrofit recommendations." : displayedUpfrontFinancialIncentive != null ? "Based on selected and included opportunities" : "Selected opportunities need validation before they affect this estimate"
    },
    {
      id: "net-cost",
      label: "Net cost before tax benefits",
      value: billDataLocked ? "?" : formatMaybeCents(displayedNetCostBeforeTaxBenefits, "Not estimated yet"),
      basis: billDataLocked ? "Upload bills to unlock savings, payback, and detailed retrofit recommendations." : displayedNetCostBeforeTaxBenefits != null ? "Project cost minus selected incentives" : "Needs project cost and selected opportunities"
    },
    {
      id: "tax-benefits",
      label: "Potential one-time tax benefits",
      value:
        billDataLocked
          ? "?"
          : retrofit.metrics.taxBenefits == null
          ? "Needs tax review"
          : typeof retrofit.metrics.taxBenefits === "number"
            ? formatCents(retrofit.metrics.taxBenefits)
            : String(retrofit.metrics.taxBenefits),
      basis: billDataLocked ? "Upload bills to unlock savings, payback, and detailed retrofit recommendations." : retrofit.metrics.taxBenefits == null ? "Needs tax or entity information" : "Based on current tax inputs"
    },
    {
      id: "effective-cost",
      label: "Effective cost after one-time benefits",
      value: billDataLocked ? "?" : formatMaybeCents(retrofit.metrics.effectiveCostAfterOneTimeBenefits, "Needs tax review"),
      basis:
        billDataLocked ? "Upload bills to unlock savings, payback, and detailed retrofit recommendations." : retrofit.metrics.effectiveCostAfterOneTimeBenefits != null
          ? "Includes selected incentives and one-time benefits"
          : "Needs selected incentives and tax review"
    },
    {
      id: "annual-savings",
      label: "Annual operating savings",
      value:
        billDataLocked || retrofit.metrics.recurringOperationalSavingsAnnual == null
          ? "Needs bill"
          : retrofit.metrics.recurringOperationalSavingsAnnual >= 0
            ? formatCents(retrofit.metrics.recurringOperationalSavingsAnnual)
            : "Estimated operating cost change",
      basis:
        billDataLocked ? "Upload bills to unlock savings, payback, and detailed retrofit recommendations." : retrofit.metrics.recurringOperationalSavingsAnnual != null
          ? "Based on uploaded bills and industry assumptions"
          : "Needs bill or confirmed operating details"
    },
    {
      id: "monthly-savings",
      label: "Monthly operating savings",
      value:
        billDataLocked || retrofit.metrics.recurringOperationalSavingsMonthly == null
          ? "Needs bill"
          : retrofit.metrics.recurringOperationalSavingsMonthly >= 0
            ? formatCents(retrofit.metrics.recurringOperationalSavingsMonthly)
            : "Estimated operating cost change",
      basis:
        billDataLocked ? "Upload bills to unlock savings, payback, and detailed retrofit recommendations." : retrofit.metrics.recurringOperationalSavingsMonthly != null
          ? "Based on uploaded bills and industry assumptions"
          : "Needs bill or confirmed operating details"
    },
    {
      id: "payback-roi",
      label: "Payback / ROI",
      value:
        billDataLocked
          ? "?"
          : retrofit.metrics.paybackPeriodYears == null
            ? "Needs quote"
            : `${formatPayback(retrofit.metrics.paybackPeriodYears)}${retrofit.metrics.roi == null ? "" : ` · ${String(retrofit.metrics.roi)}`}`,
      basis: billDataLocked ? "Upload bills to unlock savings, payback, and detailed retrofit recommendations." : retrofit.metrics.paybackPeriodYears != null ? "Based on current cost and savings inputs" : "Needs quote and savings validation"
    }
  ];
  const workspaceTabs = [
    { key: "overview", label: "Overview" },
    { key: "scenariosOpportunities", label: "Scenarios" },
    { key: "financials", label: "Financials" },
    { key: "environmental", label: "Impact" },
    { key: "application", label: "Application Overview" }
  ] as const;
  const opportunityIdsKey = retrofit.opportunities.map((opportunity) => opportunity.id).join("|");
  const readyApplicationPrepOpportunity =
    selectedIncludedOpportunities.find((opportunity) => applicationPrepProfiles[opportunity.id]?.status === "customer_ready") ||
    selectedPendingOpportunities.find((opportunity) => applicationPrepProfiles[opportunity.id]?.status === "customer_ready") ||
    retrofit.opportunities.find((opportunity) => applicationPrepProfiles[opportunity.id]?.status === "customer_ready") ||
    null;
  const referenceOnlyApplicationOpportunity = retrofit.opportunities.find((opportunity) => applicationPrepProfiles[opportunity.id]?.status === "reference_only") || null;
  const readyApplicationProfile = readyApplicationPrepOpportunity ? applicationPrepProfiles[readyApplicationPrepOpportunity.id]?.profile || null : null;
  const applicationOverviewOpportunity = readyApplicationPrepOpportunity || referenceOnlyApplicationOpportunity || selectedScenarioOpportunities[0] || retrofit.opportunities[0] || null;
  const applicationOverviewStatus = applicationOverviewOpportunity ? applicationPrepProfiles[applicationOverviewOpportunity.id] : undefined;
  const applicationOverviewProfile = applicationOverviewStatus?.profile || null;
  const applicationOverviewIsReady = applicationOverviewStatus?.status === "customer_ready" && Boolean(applicationOverviewProfile);
  const applicationOverviewReferenceOnly = applicationOverviewStatus?.status === "reference_only";
  const selectedOpportunitiesTotalValue = billDataLocked
    ? null
    : selectedCount === 0
      ? 0
      : sumDefinedCents(selectedScenarioOpportunities.map((opportunity) => opportunity.estimatedValue));
  const upfrontSavingsValue = billDataLocked ? null : displayedUpfrontFinancialIncentive ?? selectedOpportunitiesTotalValue;
  const oneTimeTaxBenefits = typeof retrofit.metrics.taxBenefits === "number" ? retrofit.metrics.taxBenefits : null;
  const projectCostValue = billDataLocked ? null : retrofit.metrics.estimatedUpfrontProjectCost ?? null;
  const netCostBeforeTaxValue = billDataLocked ? null : displayedNetCostBeforeTaxBenefits;
  const effectiveProjectCostValue = billDataLocked ? null : retrofit.metrics.effectiveCostAfterOneTimeBenefits ?? null;
  const annualOperatingSavingsValue = billDataLocked ? null : retrofit.metrics.recurringOperationalSavingsAnnual;
  const monthlyOperatingSavingsValue = billDataLocked ? null : retrofit.metrics.recurringOperationalSavingsMonthly ?? centsPerMonth(annualOperatingSavingsValue);
  const annualIncentiveSavingsValue = billDataLocked
    ? null
    : selectedIncludedOpportunities.length === 0
      ? 0
      : sumDefinedCents(
          selectedIncludedOpportunities
            .filter((opportunity) => opportunity.timing === "recurring" || opportunity.timing === "both")
            .map((opportunity) => opportunity.estimatedValue)
        );
  const monthlyIncentiveSavingsValue = centsPerMonth(annualIncentiveSavingsValue);
  const monthlyTaxBenefitsValue = centsPerMonth(oneTimeTaxBenefits);
  const oneTimeOpportunityFunding = selectedIncludedOpportunities.reduce(
    (totals, opportunity) => {
      if (opportunity.timing === "recurring") return totals;
      const value = nonNegativeCents(opportunity.estimatedValue);
      if (value == null) return totals;
      const tone = opportunityFundingTone(opportunity);
      return { ...totals, [tone]: totals[tone] + value };
    },
    { utility: 0, grant: 0, tax: 0 }
  );
  const knownRebateGrantCents = oneTimeOpportunityFunding.utility + oneTimeOpportunityFunding.grant;
  const upfrontFundingRemainder =
    displayedUpfrontFinancialIncentive != null
      ? Math.max(0, displayedUpfrontFinancialIncentive - knownRebateGrantCents)
      : 0;
  const utilityRebateFundingCents = oneTimeOpportunityFunding.utility + upfrontFundingRemainder;
  const grantFundingCents = oneTimeOpportunityFunding.grant;
  const taxCreditFundingCents = oneTimeTaxBenefits ?? oneTimeOpportunityFunding.tax;
  const knownProjectFundingCents =
    utilityRebateFundingCents +
    grantFundingCents +
    (taxCreditFundingCents || 0);
  const userCoveredFundingCents =
    projectCostValue != null
      ? Math.max(0, projectCostValue - knownProjectFundingCents)
      : null;
  const projectFundingSegments: ProjectFundingSegment[] = [
    { id: "utility-rebates", label: "Utility rebates", amountCents: billDataLocked ? null : utilityRebateFundingCents, tone: "utility" },
    { id: "tax-credits", label: "Tax credits", amountCents: billDataLocked ? null : taxCreditFundingCents, tone: "tax" },
    { id: "grants", label: "Grants", amountCents: billDataLocked ? null : grantFundingCents, tone: "grant" },
    { id: "financing-benefit", label: "Financing benefit", amountCents: null, tone: "financing" },
    { id: "you-cover", label: "You cover", amountCents: billDataLocked ? null : userCoveredFundingCents, tone: "user" }
  ];
  const unknownRecurringOpportunityValue = selectedIncludedOpportunities.some(
    (opportunity) =>
      (opportunity.timing === "recurring" || opportunity.timing === "both") &&
      opportunity.estimatedValue == null
  );
  const annualCashFlowValue =
    billDataLocked || annualOperatingSavingsValue == null || unknownRecurringOpportunityValue
      ? null
      : annualOperatingSavingsValue + (annualIncentiveSavingsValue || 0);
  const initialCashFlowInvestmentValue = billDataLocked ? null : effectiveProjectCostValue ?? userCoveredFundingCents;
  const selectedPaybackYears =
    billDataLocked
      ? null
      : typeof retrofit.metrics.paybackPeriodYears === "number" && Number.isFinite(retrofit.metrics.paybackPeriodYears)
        ? retrofit.metrics.paybackPeriodYears
        : initialCashFlowInvestmentValue != null && annualCashFlowValue != null && annualCashFlowValue > 0
          ? initialCashFlowInvestmentValue / annualCashFlowValue
          : null;
  const selectedScenarioLabel = selectedScenario ? formatScenarioTabLabel(selectedScenario.name) : "Balanced";
  const overviewApplicationProfile = readyApplicationProfile || applicationOverviewProfile;
  const overviewApplicationOpportunity = readyApplicationPrepOpportunity || applicationOverviewOpportunity;
  const overviewApplicationUnavailable = !overviewApplicationProfile && !overviewApplicationOpportunity;
  useEffect(() => {
    let isMounted = true;
    const opportunities = retrofit.opportunities;
    if (!credential || opportunities.length === 0) {
      setApplicationPrepProfiles({});
      return () => {
        isMounted = false;
      };
    }

    void Promise.all(
      opportunities.map(async (opportunity) => {
        try {
          const response = await apiGet<CustomerApplicationProfileResponse>(
            `/api/application-profiles/approved?opportunityId=${encodeURIComponent(opportunity.id)}`,
            { headers: adminAuthHeaders(credential) }
          );
          return [opportunity.id, response] as const;
        } catch {
          return [
            opportunity.id,
            {
              generatedAt: new Date().toISOString(),
              opportunityId: opportunity.id,
              status: "unavailable",
              customerReady: false,
              referenceOnly: false,
              profile: null,
              notice: "Application prep not available yet."
            } satisfies CustomerApplicationProfileResponse
          ] as const;
        }
      })
    ).then((entries) => {
      if (!isMounted) return;
      setApplicationPrepProfiles(Object.fromEntries(entries));
    });

    return () => {
      isMounted = false;
    };
  }, [credential, opportunityIdsKey, retrofit.opportunities]);

  function openWorkspaceTab(tab: EstimateWorkspaceTab) {
    setActiveWorkspaceTab(tab);
  }

  const kwhImpactResource = displayedEnvironmentalImpact.resources.find((resource) =>
    /electricity|renewable/i.test(resource.label)
  );
  const thermImpactResource = displayedEnvironmentalImpact.resources.find((resource) =>
    /gas|therm|thermal/i.test(resource.label)
  );
  const reductionImpactResource = displayedEnvironmentalImpact.resources.find((resource) =>
    /energy|load/i.test(resource.label)
  );
  const certificationRows = [
    {
      program: "LEED O+M",
      description: "Supports emissions reduction and energy performance.",
      value:
        displayedEnvironmentalImpact.certificationContribution.find((item) => /leed/i.test(item.program))?.detail ||
        displayedEnvironmentalImpact.certificationContribution.find((item) => /leed/i.test(item.program))?.status ||
        "May support"
    },
    {
      program: "ENERGY STAR readiness",
      description: "Improves operational efficiency and tracking capabilities.",
      value:
        displayedEnvironmentalImpact.certificationContribution.find((item) => /energy star/i.test(item.program))?.detail ||
        "Supports score improvement"
    },
    {
      program: "Green Business certification",
      description: "Advances sustainability and environmental leadership.",
      value:
        displayedEnvironmentalImpact.certificationContribution.find((item) => /green business/i.test(item.program))?.detail ||
        "Potential contribution"
    }
  ];
  const financialPeriodLabel = financialPeriod === "monthly" ? "Monthly" : "Annual";
  const operatingSavingsPeriodValue = financialPeriod === "monthly" ? monthlyOperatingSavingsValue : annualOperatingSavingsValue;
  const incentiveSavingsPeriodValue = financialPeriod === "monthly" ? monthlyIncentiveSavingsValue : annualIncentiveSavingsValue;
  const taxBenefitsPeriodValue = financialPeriod === "monthly" ? monthlyTaxBenefitsValue : oneTimeTaxBenefits;
  const recurringSavingsPeriodValue = sumDefinedCents([operatingSavingsPeriodValue, incentiveSavingsPeriodValue, taxBenefitsPeriodValue]);
  const oneTimeEquationTotalCents = -(effectiveProjectCostValue ?? netCostBeforeTaxValue ?? projectCostValue ?? 0);
  const oneTimeEquationLines: SavingsEquationLine[] = [
    projectCostValue != null
      ? { id: "selected-retrofit-project-cost", amountCents: -Math.abs(projectCostValue), label: "Project cost" }
      : null,
    upfrontSavingsValue != null && upfrontSavingsValue > 0
      ? { id: "selected-retrofit-upfront-incentive", amountCents: Math.abs(upfrontSavingsValue), label: "Upfront financial incentive" }
      : null,
    oneTimeTaxBenefits != null && oneTimeTaxBenefits > 0
      ? { id: "selected-retrofit-one-time-tax-benefits", amountCents: Math.abs(oneTimeTaxBenefits), label: "One-time tax benefits" }
      : null
  ].filter((line): line is SavingsEquationLine => Boolean(line));
  const recurringMonthlyEquationTotalCents = sumDefinedCents([monthlyOperatingSavingsValue, monthlyIncentiveSavingsValue]) ?? 0;
  const recurringMonthlyEquationLines: SavingsEquationLine[] = [
    monthlyOperatingSavingsValue != null
      ? { id: "selected-retrofit-monthly-operating-savings", amountCents: monthlyOperatingSavingsValue, label: "Avoided utility cost / annual" }
      : null,
    monthlyIncentiveSavingsValue != null && monthlyIncentiveSavingsValue > 0
      ? { id: "selected-retrofit-monthly-incentive-savings", amountCents: monthlyIncentiveSavingsValue, label: "Recurring incentive value / annual" }
      : null
  ].filter((line): line is SavingsEquationLine => Boolean(line));
  const scenarioCards = retrofit.scenarios.slice(0, 3);
  const scenarioOpportunityDetailSelection = scenarioOpportunityDetailIdByRetrofit[retrofit.id];
  const scenarioOpportunityDetail = scenarioOpportunityDetailSelection
    ? retrofit.opportunities.find((opportunity) => opportunity.id === scenarioOpportunityDetailSelection) || null
    : null;

  function opportunityValueLabel(opportunity: RetrofitOpportunityPreview | null | undefined, fallback = "Unknown") {
    if (!opportunity) return fallback;
    if (opportunity.estimatedValue == null) {
      return opportunity.requiredInfo.includes("utility territory confirmation") ? "Needs utility confirmation" : fallback;
    }
    if (opportunity.timing === "recurring") return `${formatEstimateCents(opportunity.estimatedValue)}/yr`;
    return formatEstimateCents(opportunity.estimatedValue);
  }

  function opportunityIncludedInCurrentScenario(opportunity: RetrofitOpportunityPreview) {
    return Boolean(selectedOpportunityIds[opportunity.id]);
  }

  function opportunityDetailSummary(opportunity: RetrofitOpportunityPreview | null) {
    if (!opportunity) return "Select an opportunity to review details.";
    return opportunity.description || opportunity.whySelected || opportunity.whyNotSelected || "Program details are available from the matched source.";
  }

  function getScenarioOpportunityIds(scenario: RetrofitScenarioPreview) {
    return scenario.selectedOpportunityIds.filter((id) => selectedOpportunityIds[id] !== false);
  }

  function getScenarioOneTimeSavingsCents(scenario: RetrofitScenarioPreview) {
    if (billDataLocked) return null;
    const selectedIds = getScenarioOpportunityIds(scenario);
    if (!selectedIds.length) return 0;

    const scenarioOpportunities = retrofit.opportunities.filter((opportunity) => selectedIds.includes(opportunity.id));
    const oneTimeOpportunities = scenarioOpportunities.filter((opportunity) => opportunity.timing !== "recurring");
    if (!oneTimeOpportunities.length) return 0;

    const estimatedValues = oneTimeOpportunities.map((opportunity) => opportunity.estimatedValue);
    const numericEstimatedValues = estimatedValues.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
    if (numericEstimatedValues.length === estimatedValues.length) {
      return numericEstimatedValues.reduce((sum, value) => sum + value, 0);
    }

    const allCurrentlyIncluded = oneTimeOpportunities.every(
      (opportunity) => getOpportunityIncludedLabel(opportunity, true) === "Included in current estimate"
    );
    if (allCurrentlyIncluded && scenario.metrics.upfrontFinancialIncentive != null) {
      return scenario.metrics.upfrontFinancialIncentive;
    }

    return null;
  }

  function getScenarioAnnualOperatingSavingsCents(scenario: RetrofitScenarioPreview) {
    if (billDataLocked) return null;
    return scenario.metrics.recurringOperationalSavingsAnnual ?? retrofit.metrics.recurringOperationalSavingsAnnual ?? null;
  }

  function getScenarioEffectiveCostCents(scenario: RetrofitScenarioPreview) {
    const oneTimeSavings = getScenarioOneTimeSavingsCents(scenario);
    const taxBenefits = typeof retrofit.metrics.taxBenefits === "number" ? retrofit.metrics.taxBenefits : null;
    if (projectCostValue == null || oneTimeSavings == null || taxBenefits == null) return null;
    return Math.max(0, projectCostValue - oneTimeSavings - taxBenefits);
  }

  function getScenarioUpfrontCostForComparisonCents(scenario: RetrofitScenarioPreview) {
    const effectiveCost = getScenarioEffectiveCostCents(scenario);
    if (effectiveCost != null) return effectiveCost;
    const oneTimeSavings = getScenarioOneTimeSavingsCents(scenario);
    if (projectCostValue != null && oneTimeSavings != null) {
      return Math.max(0, projectCostValue - oneTimeSavings);
    }
    return projectCostValue ?? null;
  }

  function getScenarioPaybackYears(scenario: RetrofitScenarioPreview) {
    if (billDataLocked) return null;
    const oneTimeSavings = getScenarioOneTimeSavingsCents(scenario);
    if (oneTimeSavings == null) return null;
    const annualSavings = getScenarioAnnualOperatingSavingsCents(scenario);
    const effectiveCost = getScenarioEffectiveCostCents(scenario);
    if (effectiveCost == null || annualSavings == null || annualSavings <= 0) {
      return scenario.metrics.paybackPeriodYears ?? null;
    }
    return effectiveCost / annualSavings;
  }

  const scenarioPresentationProfiles = scenarioCards.map((scenario, index) => {
    const included = getSelectedOpportunitiesForScenario(retrofit, scenario, selectedOpportunityIds);
    const excludedIds = new Set([
      ...(scenario.deselectedOpportunityIds || []),
      ...scenario.selectedOpportunityIds.filter((id) => selectedOpportunityIds[id] === false)
    ]);
    const excluded = retrofit.opportunities.filter((opportunity) => excludedIds.has(opportunity.id));
    const upfrontCost = getScenarioUpfrontCostForComparisonCents(scenario);
    const incentives = getScenarioOneTimeSavingsCents(scenario);
    const annualSavings = getScenarioAnnualOperatingSavingsCents(scenario);
    const payback = getScenarioPaybackYears(scenario);
    const incentiveShare =
      projectCostValue != null && projectCostValue > 0 && incentives != null
        ? `${Math.round((Math.max(0, incentives) / projectCostValue) * 100)}% of cost`
        : null;
    return {
      scenario,
      index,
      included,
      excluded,
      upfrontCost,
      incentives,
      annualSavings,
      payback,
      incentiveShare,
      selected: selectedScenario?.id === scenario.id
    };
  });
  const selectedScenarioProfile = scenarioPresentationProfiles.find((profile) => profile.selected) || scenarioPresentationProfiles[0] || null;
  const opportunityReviewRows = retrofit.opportunities;
  const includedOpportunityRows = opportunityReviewRows.filter((opportunity) => opportunityIncludedInCurrentScenario(opportunity));
  const excludedOpportunityRows = opportunityReviewRows.filter((opportunity) => !opportunityIncludedInCurrentScenario(opportunity));

  function renderScenarioOpportunityDetailPanel(opportunity: RetrofitOpportunityPreview) {
    const selected = opportunityIncludedInCurrentScenario(opportunity);
    const includedLabel = getOpportunityIncludedLabel(opportunity, selected);
    const appStatus = applicationPrepProfiles[opportunity.id];
    const appReady = appStatus?.status === "customer_ready" && Boolean(appStatus.profile);
    const oneTimeValue = opportunity.timing === "recurring" ? null : opportunity.estimatedValue ?? null;
    const recurringValue = opportunity.timing === "recurring" || opportunity.timing === "both" ? opportunity.estimatedValue ?? null : null;
    const difficulty = capitalizeLabel(opportunity.difficulty || "unknown");
    return (
      <aside className="scenario-opportunity-detail-panel" aria-label={`${opportunity.name} details`}>
        <div className="scenario-opportunity-detail-header">
          <span className="estimate-card-icon" aria-hidden="true"><MetricSavingsIcon /></span>
          <div>
            <small>Opportunity</small>
            <h3>{opportunity.name}</h3>
            <span className="soft-badge">{capitalizeLabel(opportunity.type)}</span>
          </div>
          <button
            aria-label="Close opportunity details"
            className="estimate-row-chevron"
            onClick={() => setScenarioOpportunityDetailIdByRetrofit((current) => ({ ...current, [retrofit.id]: "" }))}
            type="button"
          >
            x
          </button>
        </div>

        <section className="scenario-opportunity-detail-section">
          <h4>Overview</h4>
          <p>{opportunityDetailSummary(opportunity)}</p>
        </section>

        <div className="scenario-opportunity-detail-list">
          <EstimateInfoRow label="Program type" value={capitalizeLabel(opportunity.type)} />
          <EstimateInfoRow label="Deadline" value={opportunity.deadline || "Not listed in source data"} />
          <EstimateInfoRow label="Difficulty" value={difficulty} />
          <EstimateInfoRow label="Application process" value={opportunity.applicationProcess || capitalizeLabel(opportunity.applicationMethod)} />
        </div>

        <section className="scenario-opportunity-value-card">
          <small>Estimated value (one-time)</small>
          <strong>{formatEstimateCents(oneTimeValue, opportunity.timing === "recurring" ? "Not one-time" : "Unknown")}</strong>
          <span>{oneTimeValue == null ? includedLabel : "Upfront incentive you can receive"}</span>
        </section>

        <section className="scenario-opportunity-value-card">
          <small>Estimated value (recurring)</small>
          <strong>{formatEstimateCentsPerPeriod(recurringValue, "yr", recurringValue == null ? "Not recurring" : "Unknown")}</strong>
          <span>{recurringValue == null ? "No recurring value stored" : "Estimated annual savings"}</span>
        </section>

        <section className="scenario-opportunity-detail-list">
          <EstimateInfoRow label="Eligibility" value={opportunityEligibleDisplayLabel(opportunity.eligibilityStatus)} />
          <EstimateInfoRow label="Affects metric" value={opportunityAffectsMetric(opportunity, selected, includedLabel)} />
          <EstimateInfoRow label="Impact summary" value={opportunity.environmentalImpactContribution || "Impact estimate not stored yet"} />
        </section>

        <button
          className={`scenario-opportunity-detail-toggle${selected ? " is-danger" : ""}`}
          onClick={() => onToggleOpportunity(opportunity.id)}
          type="button"
        >
          {selected ? "Exclude from scenario" : "Include in scenario"}
        </button>
        <p className="scenario-opportunity-detail-note">
          {selected ? "Excluding this opportunity will update scenario metrics and recommendations." : "Including this opportunity will update scenario metrics and recommendations."}
        </p>
        {opportunity.sourceUrl ? (
          <a className="secondary-button scenario-opportunity-source-link" href={opportunity.sourceUrl} rel="noreferrer" target="_blank">View program details</a>
        ) : null}
        {appReady ? (
          <button className="secondary-button scenario-opportunity-source-link" onClick={() => setApplicationPrepOpportunity(opportunity)} type="button">Prepare application</button>
        ) : null}
      </aside>
    );
  }

  return (
    <article className={`estimate-workspace-shell${activeWorkspaceTab === "scenariosOpportunities" ? " is-scenarios-opportunities" : ""}`}>
      {activeWorkspaceTab === "scenariosOpportunities" ? null : <EstimateProgressStepper />}

      <div className="estimate-workspace-layout">
        <section className={`estimate-main-card${activeWorkspaceTab === "scenariosOpportunities" ? " is-scenarios-opportunities" : ""}`}>
          {activeWorkspaceTab === "scenariosOpportunities" ? null : (
            <header className="estimate-header">
              <div className="estimate-header-left">
                <RetrofitPickerIcon retrofit={retrofit} />
                <div>
                  <h2>{retrofit.name}</h2>
                  <p>{retrofit.description}</p>
                </div>
              </div>
              <div className="estimate-header-actions" aria-label="Estimate actions">
                <button className="estimate-primary-action" onClick={onAddToPlan} type="button">Confirm & move to next step</button>
                <button className="estimate-secondary-action" type="button">Discard changes</button>
              </div>
            </header>
          )}

          <nav aria-label="Estimate workspace tabs" className={`estimate-tabs retrofit-workspace-tabs${activeWorkspaceTab === "scenariosOpportunities" ? " is-scenarios-opportunities" : ""}`}>
            {workspaceTabs.map((item) => (
              <button
                key={item.key}
                aria-current={activeWorkspaceTab === item.key ? "true" : undefined}
                className={`estimate-tab workspace-tab${activeWorkspaceTab === item.key ? " is-active" : ""}`}
                data-workspace-tab={item.key}
                onClick={() => openWorkspaceTab(item.key)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {activeWorkspaceTab === "overview" ? (
            <section className="estimate-tab-panel estimate-overview-tab" data-workspace-panel="overview">
              <div className="estimate-metric-grid">
                <EstimateMetricCard
                  icon={<MetricCostIcon />}
                  label="One-time savings"
                  value={formatEstimateCents(upfrontSavingsValue, billDataLocked ? "?" : "Estimate unavailable")}
                  subtitle="Upfront incentives & rebates"
                />
                <EstimateMetricCard
                  icon={<MetricSavingsIcon />}
                  label="Annual operating savings"
                  value={formatEstimateCentsPerPeriod(annualOperatingSavingsValue, "yr", billDataLocked ? "?" : "Needs bill")}
                  subtitle="Lower energy costs"
                />
                <EstimateMetricCard
                  icon={<MetricPaybackIcon />}
                  label="Payback period"
                  value={billDataLocked ? "?" : formatPayback(retrofit.metrics.paybackPeriodYears, "Needs quote")}
                  subtitle="Simple payback"
                />
                <EstimateMetricCard
                  icon={<MetricImpactIcon />}
                  label="ROI"
                  value={billDataLocked ? "?" : formatEstimatePercent(retrofit.metrics.roi, "Estimate unavailable")}
                  subtitle="Average annual return"
                />
              </div>

              <section className="estimate-split-summary">
                <div>
                  <span className="estimate-summary-check" aria-hidden="true">✓</span>
                  <div>
                    <strong>Selected opportunities</strong>
                    <p><b>{selectedCount}</b></p>
                  </div>
                </div>
                <div>
                  <span className="estimate-summary-check is-document" aria-hidden="true">▤</span>
                  <div>
                    <strong>Current scenario</strong>
                    <p><b>{selectedScenarioLabel}</b></p>
                  </div>
                </div>
              </section>

              <div className="estimate-overview-lower-grid">
                <section className="estimate-overview-card estimate-why-card">
                  <h3>Why this is recommended</h3>
                  <p>{retrofit.whyRecommended.join(" ") || `${retrofit.name} can improve operations while supporting your sustainability goals.`}</p>
                  <div className="estimate-benefit-row">
                    <span><EstimateMiniIcon>☘</EstimateMiniIcon><b>Lower monthly bills</b><small>Reduce energy use year-round.</small></span>
                    <span><EstimateMiniIcon>◒</EstimateMiniIcon><b>Cleaner energy</b><small>Cut emissions and environmental impact.</small></span>
                    <span><EstimateMiniIcon>⌂</EstimateMiniIcon><b>Better comfort</b><small>More consistent operation.</small></span>
                  </div>
                </section>

                <section className="estimate-overview-card">
                  <div className="estimate-card-title-row">
                    <h3>Application overview</h3>
                    <span className="estimate-preview-pill">preview</span>
                  </div>
                  {overviewApplicationUnavailable ? (
                    <p className="compact-empty">Application support not available yet.</p>
                  ) : (
                    <div className="estimate-info-list">
                      <EstimateInfoRow label="Opportunity name" value={overviewApplicationProfile?.programName || overviewApplicationOpportunity?.name || "Application support not available yet"} />
                      <EstimateInfoRow label="Related retrofit" value={retrofit.name} />
                      <EstimateInfoRow label="Pre-approval required" value={inferApplicationPreApproval(overviewApplicationProfile, overviewApplicationOpportunity)} />
                      <EstimateInfoRow label="Deadline" value={applicationDeadlineLabel(overviewApplicationProfile, overviewApplicationOpportunity)} />
                      <EstimateInfoRow label="Estimated time" value={applicationEstimatedTimeLabel(overviewApplicationProfile, overviewApplicationOpportunity)} />
                      <EstimateInfoRow label="Difficulty" value={applicationDifficultyLabel(overviewApplicationProfile, overviewApplicationOpportunity)} />
                      <EstimateInfoRow label="Level of support" value={overviewApplicationProfile ? "Guided" : "Needs review"} />
                    </div>
                  )}
                </section>

                <section className="estimate-overview-card">
                  <div className="estimate-card-title-row">
                    <h3>Impact overview</h3>
                    <span className="estimate-preview-pill">preview</span>
                  </div>
                  <div className="estimate-info-list">
                    <EstimateInfoRow label="CO₂e avoided per year" value={displayedEnvironmentalImpact.overall.displayValue === "?" ? displayedEnvironmentalImpact.overall.fallback || "Needs bills" : `${displayedEnvironmentalImpact.overall.displayValue} ${displayedEnvironmentalImpact.overall.unit}`} />
                    <EstimateInfoRow label="kWh saved per year" value={kwhImpactResource?.displayValue || "Needs bill"} />
                    <EstimateInfoRow label="LEED O+M" value={certificationRows[0].value} />
                    <EstimateInfoRow label="Green Business" value={certificationRows[2].value} />
                  </div>
                </section>
              </div>

              <section className="estimate-financing-strip">
                <EstimateMiniIcon>▥</EstimateMiniIcon>
                <div>
                  <strong>Financing options available</strong>
                  <p>Explore loans and financing that can help make this upgrade more affordable.</p>
                </div>
                <button className="secondary-button" onClick={onExploreFinancing} type="button">View financing options ↗</button>
              </section>
            </section>
          ) : null}

          {activeWorkspaceTab === "financials" ? (
            <section className="estimate-tab-panel estimate-financials-tab" data-workspace-panel="financials">
              <div className="estimate-panel-title-row">
                <h3>Financials snapshot <span aria-label="Financial information">ⓘ</span></h3>
                <div className="financial-toggle" role="group" aria-label="Financial period">
                  <button className={financialPeriod === "monthly" ? "is-active" : ""} onClick={() => setFinancialPeriod("monthly")} type="button">Monthly</button>
                  <button className={financialPeriod === "annual" ? "is-active" : ""} onClick={() => setFinancialPeriod("annual")} type="button">Annual</button>
                </div>
              </div>
              <div className="estimate-financial-metric-grid">
                <EstimateMetricCard icon={<MetricCostIcon />} label="One-time savings" value={formatEstimateCents(upfrontSavingsValue, "Estimate unavailable")} subtitle="Upfront incentives & rebates" />
                <EstimateMetricCard icon={<MetricSavingsIcon />} label={`${financialPeriodLabel} operating savings`} value={formatEstimateCentsPerPeriod(operatingSavingsPeriodValue, financialPeriod === "monthly" ? "mo" : "yr", "Needs bill")} subtitle="Lower energy costs" />
                <EstimateMetricCard icon={<MetricImpactIcon />} label={`${financialPeriodLabel} incentive savings`} value={formatEstimateCentsPerPeriod(incentiveSavingsPeriodValue, financialPeriod === "monthly" ? "mo" : "yr", "Estimate unavailable")} subtitle="Ongoing incentives" />
                <EstimateMetricCard icon={<MetricPaybackIcon />} label="Payback period" value={formatPayback(retrofit.metrics.paybackPeriodYears, "Needs quote")} subtitle="Simple payback" />
                <EstimateMetricCard icon={<MetricImpactIcon />} label="ROI" value={formatEstimatePercent(retrofit.metrics.roi, "Estimate unavailable")} subtitle="Average annual return" />
              </div>

              <section className="estimate-financing-strip">
                <EstimateMiniIcon>▥</EstimateMiniIcon>
                <div>
                  <strong>Financing options available</strong>
                  <p>Explore loans and financing that can help make this upgrade more affordable.</p>
                </div>
                <button className="secondary-button" onClick={onExploreFinancing} type="button">View financing options ↗</button>
              </section>

              <div className="estimate-financial-equation-grid">
                <SavingsEquationCard
                  title="One-time equation"
                  lines={oneTimeEquationLines}
                  totalAmountCents={oneTimeEquationTotalCents}
                  totalLabel={oneTimeEquationTotalCents >= 0 ? "One-time gain" : "Upfront cost"}
                  emptyMessage="No one-time costs or savings calculated."
                />
                <SavingsEquationCard
                  title="Recurring monthly equation"
                  lines={recurringMonthlyEquationLines}
                  totalAmountCents={recurringMonthlyEquationTotalCents}
                  totalLabel={recurringMonthlyEquationTotalCents >= 0 ? "Net recurring savings" : "Net recurring fee"}
                  emptyMessage="No recurring savings or expenses calculated."
                  amountSuffix="/month"
                />
              </div>

              <EstimateProjectFundingChart segments={projectFundingSegments} totalCostCents={projectCostValue} />
              <EstimateOneTimeCostWaterfallChart
                effectiveCostCents={effectiveProjectCostValue}
                oneTimeTaxBenefitsCents={billDataLocked ? null : taxCreditFundingCents}
                projectCostCents={projectCostValue}
                selectedRebatesCents={billDataLocked ? null : knownRebateGrantCents}
                upfrontIncentiveCents={billDataLocked || displayedUpfrontFinancialIncentive == null ? null : upfrontFundingRemainder}
              />
              <EstimatePaybackTimelineChart
                annualCashFlowCents={annualCashFlowValue}
                initialInvestmentCents={initialCashFlowInvestmentValue}
                paybackYears={selectedPaybackYears}
              />
              <EstimateCumulativeCashFlowChart
                annualCashFlowCents={annualCashFlowValue}
                initialInvestmentCents={initialCashFlowInvestmentValue}
                paybackYears={selectedPaybackYears}
              />
            </section>
          ) : null}

          {activeWorkspaceTab === "scenariosOpportunities" ? (
            <section className="scenario-opportunity-workspace" data-workspace-panel="scenariosOpportunities">
              <main className="scenario-opportunity-main">
                <section className="scenario-opportunity-hero">
                  <h3>Choose your scenario</h3>
                  <p>Compare different combinations of opportunities and choose the one that best fits your goals. The recommended scenario is preselected.</p>
                </section>

                {scenarioPresentationProfiles.length ? (
                  <>
                    <div className="scenario-opportunity-card-grid">
                      {scenarioPresentationProfiles.map((profile) => (
                        <button
                          aria-pressed={profile.selected}
                          className={`scenario-opportunity-card${profile.selected ? " is-selected" : ""}`}
                          key={profile.scenario.id}
                          onClick={() => onSelectScenario(profile.scenario.id)}
                          type="button"
                        >
                          <div className="scenario-opportunity-card-title">
                            <strong>{scenarioDisplayName(profile.index)}</strong>
                            {profile.index === 0 ? <span className="estimate-preview-pill">Recommended</span> : null}
                            <span className="scenario-opportunity-card-check" aria-hidden="true">{profile.selected ? "✓" : ""}</span>
                          </div>
                          <small>Best for</small>
                          <h4>{scenarioBestForLabel(profile.index)}</h4>
                          <div className="scenario-opportunity-card-metrics">
                            <span><MetricCostIcon /> One-time cost <b>{formatEstimateCents(profile.upfrontCost, "Unknown")}</b></span>
                            <span><MetricImpactIcon /> Total incentives <b>{formatEstimateCents(profile.incentives, "Unknown")}</b></span>
                            <span><MetricSavingsIcon /> Annual savings <b>{formatEstimateCentsPerPeriod(profile.annualSavings, "yr", "Unknown")}</b></span>
                            <span><MetricPaybackIcon /> Simple payback <b>{formatPayback(profile.payback, "Unknown")}</b></span>
                          </div>
                          <em>{profile.included.length} included · {profile.excluded.length} excluded</em>
                        </button>
                      ))}
                    </div>

                    <div className="scenario-opportunity-mini-table" role="table" aria-label="Scenario and opportunity comparison">
                      {([
                        ["One-time cost (net)", (profile: typeof scenarioPresentationProfiles[number]) => formatEstimateCents(profile.upfrontCost, "Unknown")],
                        ["Annual savings", (profile: typeof scenarioPresentationProfiles[number]) => formatEstimateCentsPerPeriod(profile.annualSavings, "yr", "Unknown")],
                        ["Simple payback", (profile: typeof scenarioPresentationProfiles[number]) => formatPayback(profile.payback, "Unknown")]
                      ] as const).map(([label, value]) => (
                        <div className="scenario-opportunity-mini-row" role="row" key={label}>
                          <strong role="rowheader">{label}</strong>
                          {scenarioPresentationProfiles.map((profile) => (
                            <span className={profile.selected ? "is-selected" : ""} role="cell" key={`${profile.scenario.id}:${label}`}>{value(profile)}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="compact-empty">No scenarios available yet.</p>
                )}

                <section className="scenario-opportunity-review">
                  <div className="scenario-opportunity-review-heading">
                    <div>
                      <h3>Review opportunities in this scenario</h3>
                      <p>Exclude any opportunity you definitely do not want, and scenario metrics will update automatically.</p>
                    </div>
                    <span className="estimate-preview-pill">{includedOpportunityRows.length} included</span>
                  </div>
                  <div className="scenario-opportunity-table" role="table" aria-label="Scenario opportunities">
                    <div className="scenario-opportunity-table-head" role="row">
                      <span role="columnheader">#</span>
                      <span role="columnheader">Opportunity</span>
                      <span role="columnheader">Included</span>
                      <span role="columnheader">Impact summary</span>
                      <span role="columnheader">Details</span>
                    </div>
                    {opportunityReviewRows.length ? opportunityReviewRows.map((opportunity, index) => {
                      const selected = opportunityIncludedInCurrentScenario(opportunity);
                      const includedLabel = getOpportunityIncludedLabel(opportunity, selected);
                      const active = scenarioOpportunityDetail?.id === opportunity.id;
                      const estimatedValueLabel = opportunityValueLabel(opportunity, "Value unavailable");
                      return (
                        <article className={`scenario-opportunity-table-row${selected ? " is-included" : " is-excluded"}${active ? " is-active" : ""}`} role="row" key={opportunity.id}>
                          <span className="scenario-opportunity-index" role="cell">{index + 1}</span>
                          <button
                            className="scenario-opportunity-name-button"
                            onClick={() => setScenarioOpportunityDetailIdByRetrofit((current) => ({ ...current, [retrofit.id]: opportunity.id }))}
                            role="cell"
                            type="button"
                          >
                            <strong>{opportunity.name}</strong>
                            <small>{capitalizeLabel(opportunity.type)}</small>
                          </button>
                          <label className="scenario-opportunity-switch" role="cell">
                            <input checked={selected} onChange={() => onToggleOpportunity(opportunity.id)} type="checkbox" />
                            <span aria-hidden="true" />
                            <b>{selected ? "Included" : "Excluded"}</b>
                          </label>
                          <div className="scenario-opportunity-impact-summary" role="cell">
                            <span><MetricImpactIcon /> {opportunity.environmentalImpactContribution || opportunityAffectsMetric(opportunity, selected, includedLabel)}</span>
                            <span><MetricCostIcon /> {estimatedValueLabel}{opportunity.timing === "recurring" ? "/yr" : ""}</span>
                          </div>
                          <button
                            className="secondary-button small-action-button"
                            onClick={() => setScenarioOpportunityDetailIdByRetrofit((current) => ({ ...current, [retrofit.id]: opportunity.id }))}
                            role="cell"
                            type="button"
                          >
                            Details
                          </button>
                        </article>
                      );
                    }) : (
                      <p className="compact-empty">
                        {isDetailLoading ? "Loading external opportunities for this retrofit..." : "No external opportunities found yet for this retrofit."}
                      </p>
                    )}
                  </div>
                  <p className="scenario-opportunity-note">Changes to included opportunities will automatically recalculate scenario metrics and recommendations.</p>
                </section>
              </main>

              {scenarioOpportunityDetail ? renderScenarioOpportunityDetailPanel(scenarioOpportunityDetail) : null}
            </section>
          ) : null}

          {activeWorkspaceTab === "environmental" ? (
            <section className="estimate-tab-panel estimate-impact-tab" data-workspace-panel="environmental">
              <h3>Impact overview</h3>
              <section className="estimate-impact-hero">
                <span className="estimate-impact-leaf" aria-hidden="true"><MetricSavingsIcon /></span>
                <div className="estimate-impact-copy">
                  <span className="estimate-impact-kicker">Main impact estimate</span>
                  <div className="estimate-impact-value-row">
                    <strong>{displayedEnvironmentalImpact.overall.displayValue}</strong>
                    <b>{displayedEnvironmentalImpact.overall.displayValue === "?" ? displayedEnvironmentalImpact.overall.fallback || "Needs bills" : formatAnnualImpactUnitLabel(displayedEnvironmentalImpact.overall.unit)}</b>
                  </div>
                  <p>{impactPlainLanguageSentence(displayedEnvironmentalImpact.overall)}</p>
                </div>
                <EstimateImpactIllustration />
              </section>
              <h3>Additional impact metrics</h3>
              <div className="estimate-impact-metric-grid">
                <EstimateMetricCard icon={<MetricSavingsIcon />} label="kWh saved per year" value={kwhImpactResource?.displayValue || "Needs bill"} subtitle={kwhImpactResource?.unit || "kWh/yr"} />
                <EstimateMetricCard icon={<MetricImpactIcon />} label="Reduction in energy use" value={reductionImpactResource?.displayValue || "Needs bill"} subtitle="Compared to baseline" />
                <EstimateMetricCard icon={<MetricSavingsIcon />} label="Therms avoided per year" value={thermImpactResource?.displayValue || "Needs gas baseline"} subtitle={thermImpactResource?.unit || "therms/yr"} />
                <EstimateMetricCard icon={<MetricCostIcon />} label="Utility cost savings per year" value={formatEstimateCentsPerPeriod(annualOperatingSavingsValue, "yr", "Needs bill")} subtitle="USD/yr" />
              </div>
              <h3>Certification contribution</h3>
              <div className="estimate-certification-list">
                {certificationRows.map((row) => (
                  <article className="estimate-certification-row" key={row.program}>
                    <span className="estimate-card-icon"><MetricImpactIcon /></span>
                    <div>
                      <strong>{row.program}</strong>
                      <p>{row.description}</p>
                    </div>
                    <b>{row.value}</b>
                  </article>
                ))}
              </div>
              <EstimateImpactProjectionChart />
            </section>
          ) : null}

          {activeWorkspaceTab === "application" ? (
            <section className="estimate-tab-panel estimate-application-tab" data-workspace-panel="application">
              <section className="application-overview-card">
                <div className="estimate-card-title-row">
                  <span className="estimate-card-icon"><MetricImpactIcon /></span>
                  <div>
                    <h3>Application Overview <span className="estimate-preview-pill">Preview</span></h3>
                    <p>Here’s a preview of the program and support available for this retrofit.</p>
                  </div>
                </div>
                {applicationOverviewReferenceOnly ? <p className="application-prep-reference-notice">Funding exhausted — reference only</p> : null}
                <div className="application-overview-rows">
                  <EstimateInfoRow label="Opportunity name" value={applicationOverviewProfile?.programName || applicationOverviewOpportunity?.name || "Application support not available yet"} />
                  <EstimateInfoRow label="Related retrofit" value={retrofit.name} />
                  <EstimateInfoRow label="Pre-approval required" value={inferApplicationPreApproval(applicationOverviewProfile, applicationOverviewOpportunity)} />
                  <EstimateInfoRow label="Deadline" value={applicationDeadlineLabel(applicationOverviewProfile, applicationOverviewOpportunity)} />
                  <EstimateInfoRow label="Estimated time" value={applicationEstimatedTimeLabel(applicationOverviewProfile, applicationOverviewOpportunity)} />
                  <EstimateInfoRow label="Difficulty" value={applicationDifficultyLabel(applicationOverviewProfile, applicationOverviewOpportunity)} />
                  <EstimateInfoRow label="Level of support" value={applicationOverviewIsReady ? "Guided" : "Needs review"} />
                </div>
                <div className="application-overview-footer">
                  <span>ⓘ Application support and step-by-step guidance come later in the application workflow.</span>
                  {applicationOverviewIsReady && applicationOverviewOpportunity ? (
                    <button className="secondary-button" onClick={() => setApplicationPrepOpportunity(applicationOverviewOpportunity)} type="button">View full application details ↗</button>
                  ) : (
                    <button className="secondary-button" disabled type="button">
                      {applicationOverviewReferenceOnly ? "Funding exhausted — reference only" : "Application support not available yet"}
                    </button>
                  )}
                </div>
              </section>
            </section>
          ) : null}
        </section>

      </div>

      {applicationPrepOpportunity ? (
        <ApplicationPrepDrawer
          opportunity={applicationPrepOpportunity}
          onClose={() => setApplicationPrepOpportunity(null)}
          profile={applicationPrepProfiles[applicationPrepOpportunity.id]?.profile || null}
          retrofitName={retrofit.name}
        />
      ) : null}
    </article>
  );
}

function ApplicationPrepDrawer({
  onClose,
  opportunity,
  profile,
  retrofitName
}: {
  onClose: () => void;
  opportunity: RetrofitOpportunityPreview;
  profile: CustomerApplicationProfile | null;
  retrofitName: string;
}) {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const sourceLinks = profile?.sourceLinks || [];
  const applicationLinks = [
    profile?.applicationUrl ? { label: "Application link", url: profile.applicationUrl } : null,
    profile?.pdfUrl ? { label: "PDF/form", url: profile.pdfUrl } : null,
    ...((profile?.applicationArtifacts || [])
      .filter((artifact) => artifact.url)
      .map((artifact) => ({ label: artifact.label, url: artifact.url as string })))
  ].filter((item): item is { label: string; url: string } => Boolean(item));
  const uniqueApplicationLinks = applicationLinks.filter((item, index, list) => list.findIndex((candidate) => candidate.url === item.url) === index);

  async function copyChecklist() {
    if (!profile || typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyMessage("Copy is not available in this browser.");
      return;
    }
    try {
      await navigator.clipboard.writeText(applicationPrepChecklistText(profile));
      setCopyMessage("Checklist copied.");
    } catch {
      setCopyMessage("Could not copy checklist.");
    }
  }

  return (
    <div className="modal-backdrop retrofit-financing-backdrop" onClick={onClose}>
      <aside className="retrofit-financing-drawer application-prep-drawer" onClick={(event) => event.stopPropagation()}>
        <button aria-label="Close application prep" className="modal-close-button" onClick={onClose} type="button">Close</button>
        <p className="eyebrow">Prepare application</p>
        <h2>{profile?.programName || opportunity.name}</h2>
        <p>Reviewed by RetroFi. Use this as an application checklist before opening the official source.</p>
        {!profile ? <p className="compact-empty">Application prep is not available yet.</p> : null}
        {profile ? (
          <>
            <div className="application-prep-status-grid">
              <DetailItem label="Related retrofit" value={retrofitName} />
              <DetailItem label="Application method" value={formatApplicationMethodLabel(profile.applicationMethod as ApplicationMethod)} />
              <DetailItem label="Status" value={formatApplicationStatusLabel(profile.applicationStatus as ApplicationStatus)} />
              <DetailItem label="Reviewed" value={profile.reviewedAt ? formatProgramDate(profile.reviewedAt) : "Reviewed by RetroFi"} />
            </div>

            <section className="application-prep-section">
              <h3>Application source</h3>
              <div className="application-prep-link-list">
                {sourceLinks.map((link) => (
                  <a className="secondary-button link-button" href={link.url} key={`${link.label}:${link.url}`} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                ))}
                {uniqueApplicationLinks.map((link) => (
                  <a className="secondary-button link-button" href={link.url} key={`${link.label}:${link.url}`} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                ))}
                {profile.contactEmail ? <span className="application-prep-contact">Contact email: {profile.contactEmail}</span> : null}
              </div>
            </section>

            <section className="application-prep-section">
              <h3>Checklist</h3>
              <ApplicationPrepRequirementList items={profile.requiredFields} title="Required fields" />
              <ApplicationPrepRequirementList items={profile.requiredDocuments} title="Required documents" />
              <ApplicationPrepRequirementList emptyMessage="No optional fields were identified in the reviewed profile." items={profile.optionalFields} title="Optional fields" />
              <ApplicationPrepRequirementList emptyMessage="No separate eligibility items were identified." items={profile.eligibilityRequirements} title="Eligibility notes" />
              <ApplicationPrepRequirementList emptyMessage="No separate fee was identified." items={profile.fees} title="Fees" />
              {profile.deadlinesOrFundingStatus.length ? (
                <div className="application-prep-subsection">
                  <h4>Deadlines / funding notes</h4>
                  <ul>
                    {profile.deadlinesOrFundingStatus.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
            </section>

            <section className="application-prep-section">
              <h3>Steps</h3>
              {profile.applicationSteps.length ? (
                <ol className="application-prep-steps">
                  {profile.applicationSteps.map((step, index) => <li key={`${index}:${step}`}>{step}</li>)}
                </ol>
              ) : (
                <p className="compact-empty">No ordered steps were identified in the reviewed profile.</p>
              )}
            </section>

            <section className="application-prep-section">
              <h3>Application form questions</h3>
              <ApplicationPrepFormQuestionList questions={profile.formQuestions || []} />
            </section>

            {profile.evidence.length ? (
              <details className="application-prep-section application-prep-evidence">
                <summary>Source evidence</summary>
                <ul>
                  {profile.evidence.map((item, index) => (
                    <li key={`${item.label || "evidence"}:${index}`}>
                      <strong>{item.label || "Evidence"}</strong>
                      {item.textSnippet ? <span>{item.textSnippet}</span> : null}
                      {item.sourceUrl ? <a href={item.sourceUrl} rel="noreferrer" target="_blank">Open source</a> : null}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}

            <div className="retrofit-badge-row application-prep-actions">
              {profile.officialProgramWebsite ? <a className="secondary-button link-button" href={profile.officialProgramWebsite} rel="noreferrer" target="_blank">Open official source</a> : null}
              {profile.programSourceUrl ? <a className="secondary-button link-button" href={profile.programSourceUrl} rel="noreferrer" target="_blank">Open program source</a> : null}
              {profile.applicationUrl ? <a className="secondary-button link-button" href={profile.applicationUrl} rel="noreferrer" target="_blank">Open application link</a> : null}
              {profile.pdfUrl ? <a className="secondary-button link-button" href={profile.pdfUrl} rel="noreferrer" target="_blank">Open PDF/form</a> : null}
              <button className="secondary-button" onClick={() => void copyChecklist()} type="button">Copy checklist</button>
              <button className="secondary-button" onClick={onClose} type="button">Close</button>
            </div>
            {copyMessage ? <p className="muted-message">{copyMessage}</p> : null}
            <p className="application-prep-disclaimer">RetroFi helps prepare your application checklist. No application is submitted automatically.</p>
          </>
        ) : null}
      </aside>
    </div>
  );
}

function ApplicationPrepRequirementList({
  emptyMessage = "No items were identified in the reviewed profile.",
  items,
  title
}: {
  emptyMessage?: string;
  items: CustomerApplicationProfileRequirement[];
  title: string;
}) {
  return (
    <div className="application-prep-subsection">
      <h4>{title}</h4>
      {items.length ? (
        <ul className="application-prep-requirement-list">
          {items.map((item) => (
            <li key={`${title}:${item.id}:${item.label}`}>
              <div>
                <strong>{customerRequirementLabel(item)}</strong>
                {item.description ? <p>{item.description}</p> : null}
                <small>{item.confidence} confidence{item.audience && item.audience !== "customer_facing" ? ` · ${capitalizeLabel(item.audience.replaceAll("_", " "))}` : ""}</small>
              </div>
              {item.evidenceSnippet ? (
                <details>
                  <summary>Why we ask for this</summary>
                  <p>{item.evidenceSnippet}</p>
                  {item.sourceUrl ? <a href={item.sourceUrl} rel="noreferrer" target="_blank">Open source</a> : null}
                </details>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="compact-empty">{emptyMessage}</p>
      )}
    </div>
  );
}

function customerRequirementLabel(item: CustomerApplicationProfileRequirement) {
  if (item.requirementType === "bill") return `Needs bill: ${item.label}`;
  if (item.requirementType === "quote") return `Needs quote: ${item.label}`;
  if (item.requirementType === "contractor") return `Needs contractor info: ${item.label}`;
  if (item.requirementType === "tax") return `Needs tax/accountant review: ${item.label}`;
  return item.label;
}

function ApplicationPrepFormQuestionList({ questions }: { questions: RetrofitDetailQuestion[] }) {
  if (!questions.length) {
    return <p className="compact-empty">No normalized application questions were identified in the reviewed profile.</p>;
  }

  return (
    <ul className="application-prep-requirement-list">
      {questions.map((question) => (
        <li key={question.id}>
          <div>
            <strong>{question.question}</strong>
            <p>{formatApplicationQuestionCollection(question)}</p>
            <small>{question.required === false ? "Optional" : "Required"} · {formatAnswerTypeLabel(question.answerType)}</small>
          </div>
          {question.evidenceSnippet || question.sourceUrl ? (
            <details>
              <summary>Why we ask for this</summary>
              {question.evidenceSnippet ? <p>{question.evidenceSnippet}</p> : null}
              {question.sourceUrl ? <a href={question.sourceUrl} rel="noreferrer" target="_blank">Open source</a> : null}
            </details>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function formatApplicationQuestionCollection(question: RetrofitDetailQuestion) {
  const stage = question.collectionStage === "pre_opportunity_estimate" ? "Before opportunity estimate" : "After scenario selection";
  const surface = capitalizeLabel(String(question.collectionSurface || "application form").replaceAll("_", " "));
  return `${stage} · ${surface}`;
}

function formatAnswerTypeLabel(answerType: RetrofitDetailQuestion["answerType"]) {
  if (answerType === "file") return "Document upload";
  if (answerType === "boolean") return "Yes/no";
  return capitalizeLabel(answerType);
}

function applicationPrepChecklistText(profile: CustomerApplicationProfile) {
  const lines = [
    profile.programName,
    `Application method: ${formatApplicationMethodLabel(profile.applicationMethod as ApplicationMethod)}`,
    "",
    "Required fields:",
    ...listForClipboard(profile.requiredFields),
    "",
    "Required documents:",
    ...listForClipboard(profile.requiredDocuments),
    "",
    "Application steps:",
    ...profile.applicationSteps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "Source links:",
    ...profile.sourceLinks.map((link) => `- ${link.label}: ${link.url}`)
  ];
  if (profile.applicationUrl) lines.push(`- Application link: ${profile.applicationUrl}`);
  if (profile.pdfUrl) lines.push(`- PDF/form: ${profile.pdfUrl}`);
  if (profile.contactEmail) lines.push(`- Contact email: ${profile.contactEmail}`);
  lines.push("", "RetroFi helps prepare your application checklist. No application is submitted automatically.");
  return lines.join("\n");
}

function listForClipboard(items: CustomerApplicationProfileRequirement[]) {
  return items.length ? items.map((item) => `- ${item.label}`) : ["- None identified"];
}

function UnconfirmedRetrofitModal({
  onConfirm,
  onDiscard,
  retrofitName
}: {
  onConfirm: () => void;
  onDiscard: () => void;
  retrofitName: string;
}) {
  return (
    <div className="modal-backdrop retrofit-financing-backdrop">
      <section className="unconfirmed-retrofit-modal">
        <p className="eyebrow">{retrofitName}</p>
        <h2>You have unconfirmed changes</h2>
        <p>You have changes that are not yet finalized for this retrofit. What would you like to do before moving forward?</p>
        <div className="retrofit-badge-row">
          <button onClick={onConfirm} type="button">Confirm and move to next step</button>
          <button className="secondary-button" onClick={onDiscard} type="button">Discard changes</button>
        </div>
      </section>
    </div>
  );
}

function FinancingPreviewDrawer({ onClose, retrofit }: { onClose: () => void; retrofit: RetrofitPreviewCard }) {
  return (
    <div className="modal-backdrop retrofit-financing-backdrop" onClick={onClose}>
      <aside className="retrofit-financing-drawer" onClick={(event) => event.stopPropagation()}>
        <button aria-label="Close financing preview" className="modal-close-button" onClick={onClose} type="button">Close</button>
        <p className="eyebrow">Financing preview</p>
        <h2>{retrofit.name}</h2>
        <p>Full financing optimization is coming later.</p>
        <div className="financing-field-grid">
          <DetailItem label="Financing model" value="Loan or program financing" />
          <DetailItem label="Loan amount" value={formatMaybeCents(retrofit.metrics.estimatedUpfrontProjectCost, "Needs quote")} />
          <DetailItem label="Interest rate" value="Not estimated yet" />
          <DetailItem label="Term length" value="Not estimated yet" />
          <DetailItem label="Down payment" value="Not estimated yet" />
          <DetailItem label="Monthly payment estimate" value="Calculation unavailable" />
        </div>
      </aside>
    </div>
  );
}

function estimateBasisFromPayload(payload: PortalRetrofitRecommendationsResponse | null): EstimateBasisValue {
  if (!payload?.intake) return "initial_form";
  const hasProcessedBills = payload.intake.uploadedUtilityFiles.some((file) => file.processingStatus === "processed");
  const hasUploadedBills = payload.intake.uploadedUtilityFiles.length > 0 || payload.intake.utilityExtractedValues.length > 0;
  if (hasProcessedBills || hasUploadedBills) return "uploaded_bills";
  return "initial_form";
}

function estimateCompletenessFromPayload(
  payload: PortalRetrofitRecommendationsResponse | null,
  retrofits: RetrofitPreviewCard[],
  missingInputs: string[]
) {
  if (!payload?.intake) return undefined;
  const hasBill = payload.intake.uploadedUtilityFiles.length > 0 || payload.intake.utilityExtractedValues.length > 0;
  let score = 20;
  if (payload.intake.site?.electricUtilityProvider) score += 10;
  if (payload.intake.site?.squareFootage) score += 5;
  if (payload.intake.site?.buildingType) score += 10;
  if (payload.intake.uploadedUtilityFiles.length > 0) score += 15;
  if (payload.intake.utilityExtractedValues.length > 0) score += 15;
  if (retrofits.some((retrofit) => retrofit.metrics.estimatedUpfrontProjectCost != null)) score += 5;
  if (!hasBill) return Math.min(40, score);
  if (
    missingInputs.some((item) =>
      ["project quote", "fixture count", "retrofit quantity", "tax/entity information", "insulation area", "fuel baseline", "expected utilization"].includes(item)
    )
  ) {
    return Math.min(65, score);
  }
  return Math.min(85, score);
}

function estimateMissingInputs(payload: PortalRetrofitRecommendationsResponse | null, topRetrofit?: RetrofitPreviewCard) {
  const missing: string[] = [];
  if (!payload?.intake?.uploadedUtilityFiles?.length) missing.push("electric bill");
  if (!payload?.intake?.site?.squareFootage) missing.push("square footage");
  if (payload?.taxRuntimePreview?.opportunityDisplayBlocked) {
    const requiredTaxInputs = (payload.taxRuntimePreview.requiredPreOpportunityInputs || [])
      .map((field) => field.label || field.inputKey.replaceAll("_", " "))
      .slice(0, 3);
    missing.push(...requiredTaxInputs);
  }
  if (topRetrofit?.missingInfo.length) missing.push(...topRetrofit.missingInfo);
  if (!topRetrofit) missing.push("project quote", "retrofit quantity", "tax/entity information");
  return [...new Set(missing)].slice(0, 5);
}

function retrofitConfidencePercent(retrofit: SampleRetrofitGroup) {
  const opportunities = retrofit.opportunities || [];
  if (opportunities.length === 0) return undefined;
  const total = opportunities.reduce((sum, opportunity) => {
    const opportunityConfidence = Number.isFinite(opportunity.opportunityDataConfidence)
      ? opportunity.opportunityDataConfidence
      : 0;
    const profileCompleteness = Number.isFinite(opportunity.userProfileCompleteness)
      ? opportunity.userProfileCompleteness
      : 0;
    return sum + (opportunityConfidence + profileCompleteness) / 2;
  }, 0);
  return Math.round((total / opportunities.length) * 100);
}

function confidenceLabelFromRetrofit(
  retrofit: SampleRetrofitGroup,
  percent?: number,
  missingInfo: string[] = missingInfoForRetrofit(retrofit, retrofit.savingsPreview || null, null),
  payload: PortalRetrofitRecommendationsResponse | null = null
) {
  if (retrofit.opportunities.length === 0) return "Needs review" as const;
  if (retrofit.savingsPreview?.status === "blocked" || retrofit.savingsPreview?.status === "unsupported") return "Needs review" as const;
  const sourceMissing = retrofit.opportunities.some((opportunity) => !(opportunity.sourceUrl || opportunity.websiteUrl || opportunity.applicationUrl));
  const utilityUnclear = retrofit.opportunities.some((opportunity) => opportunityNeedsUtilityTerritoryConfirmation(opportunity, payload));
  const hasMajorBlockers = missingInfo.some((item) =>
    ["project quote", "fixture count", "retrofit quantity", "tax/entity information", "utility territory confirmation", "fuel baseline", "expected utilization"].includes(item)
  );
  if (sourceMissing || utilityUnclear) return "Needs review" as const;
  if (percent == null) return retrofit.savingsPreview?.status === "calculated" ? "Medium" as const : "Low" as const;
  if (hasMajorBlockers) return percent >= 55 ? "Medium" as const : "Low" as const;
  if (percent >= 85 && retrofit.savingsPreview?.status === "calculated") return "High" as const;
  if (percent >= 55) return "Medium" as const;
  if (percent >= 30) return "Low" as const;
  return "Needs review" as const;
}

function whyRetrofitRecommended(retrofit: SampleRetrofitGroup) {
  const name = retrofit.displayName.toLowerCase();
  if (name.includes("lighting") || retrofit.retrofitTypeId.includes("led")) {
    return [
      "Strong fit for businesses with long operating hours or high electricity usage.",
      "Connected utility or state opportunities may reduce upfront cost.",
      "Recurring bill savings can be refined with fixture count and operating hours."
    ];
  }
  if (name.includes("hvac")) {
    return [
      "Relevant if the profile indicates HVAC equipment, high electric or gas usage, or comfort needs.",
      "May qualify for utility rebates or tax benefits depending on equipment and building type.",
      "Savings can be refined with equipment age, quote, and utility bills."
    ];
  }
  if (name.includes("water")) {
    return [
      "Relevant for businesses with high water usage or eligible fixtures and equipment.",
      "May qualify for local water district rebates.",
      "Savings can be refined with water bills and fixture counts."
    ];
  }
  const reasons = [
    `Strong fit for ${retrofit.parentCategory.replaceAll("_", " ")} based on current profile and opportunity matches.`,
    retrofit.opportunityCount > 0
      ? `Likely eligible for ${retrofit.opportunityCount.toLocaleString()} external opportunities.`
      : "External opportunities need more data before eligibility can be confirmed.",
    retrofit.savingsPreview?.status === "calculated"
      ? "Savings estimate can improve as quote and retrofit details are confirmed."
      : "Good candidate for refinement once bills, quote, and retrofit details are available."
  ];
  return reasons;
}

function assumptionsForRetrofit(retrofitTypeId: string) {
  if (retrofitTypeId.includes("lighting") || retrofitTypeId.includes("led")) {
    return ["Fixture count", "Existing wattage", "Replacement wattage", "Operating hours/day", "Unit cost", "Labor cost", "Utility rate", "Estimated kWh reduction"];
  }
  if (retrofitTypeId.includes("hvac")) {
    return ["Equipment size", "Current fuel type", "Equipment age", "Operating hours", "Installed cost", "Gas rate", "Electric rate"];
  }
  if (retrofitTypeId.includes("insulation") || retrofitTypeId.includes("envelope")) {
    return ["Insulation area", "Current R-value", "Target R-value", "Installed cost per sq ft", "Heating/cooling load estimate"];
  }
  if (retrofitTypeId.includes("solar")) {
    return ["System size kW", "Annual kWh generation", "Installed cost/W", "Utility rate", "Roof area", "Roof condition"];
  }
  if (retrofitTypeId.includes("ev") || retrofitTypeId.includes("charger")) {
    return ["Charger count", "Charger level", "Installation cost", "Expected utilization", "Electricity rate", "Fuel baseline", "Charging price/revenue assumption"];
  }
  if (retrofitTypeId.includes("refrigeration")) {
    return ["Equipment count", "Estimated project cost", "Operating hours", "Estimated annual energy reduction"];
  }
  if (retrofitTypeId.includes("water")) {
    return ["Fixture count", "Monthly water cost", "Estimated water reduction", "Estimated project cost", "Labor/human resource fee"];
  }
  return ["Quantity", "Estimated project cost", "Labor/human resource fee", "Operating hours", "Estimated annual usage reduction"];
}

function baseDetailQuestionsForRetrofit(retrofit: SampleRetrofitGroup): RetrofitDetailQuestion[] {
  return (retrofit.detailQuestions || [])
    .filter((question) => question?.id && question.question && question.answerType)
    .map((question) => ({
      ...question,
      retrofitId: question.retrofitId || retrofit.retrofitTypeId,
      whyItMatters: question.whyItMatters || detailQuestionGuidance(question.question).reason,
      affects: question.affects || detailQuestionGuidance(question.question).affects
    }));
}

function taxRuntimeQuestionsForRetrofit(
  taxRuntimePreview: TaxRuntimePreview | null,
  retrofitId: string
): RetrofitDetailQuestion[] {
  const fields = taxRuntimePreview?.requiredPreOpportunityInputs || [];
  if (!taxRuntimePreview?.opportunityDisplayBlocked || fields.length === 0) return [];
  return fields.slice(0, 12).map((field) => ({
    id: `${retrofitId}:tax:${slugify(field.inputKey)}`,
    retrofitId,
    question: field.questionPrompt || field.label || field.inputKey.replaceAll("_", " "),
    answerType: retrofitQuestionAnswerType(field),
    options: retrofitQuestionOptions(field),
    whyItMatters:
      field.helperText ||
      "This tax input is required before RetroFi can show opportunity financial estimates for this profile.",
    affects: ["Tax estimates", "Opportunity financials", "Scenario math"]
  }));
}

function retrofitQuestionAnswerType(field: TaxRuntimeInputField): RetrofitDetailQuestion["answerType"] {
  if (field.answerType === "number" || field.valueType === "number" || field.valueType === "money_cents") return "number";
  if (field.answerType === "select" || (field.options || []).length > 0) return "select";
  if (field.answerType === "boolean" || field.valueType === "boolean_or_enum") return "boolean";
  return "text";
}

function retrofitQuestionOptions(field: TaxRuntimeInputField) {
  return (field.options || []).length > 0 ? field.options : undefined;
}

function operatingSavingsNameForRetrofit(retrofitTypeId: string) {
  if (retrofitTypeId.includes("water")) return "Water Savings";
  if (retrofitTypeId.includes("fleet") || retrofitTypeId.includes("vehicle")) return "Fuel Savings";
  if (retrofitTypeId.includes("maintenance")) return "Maintenance Savings";
  if (retrofitTypeId.includes("gas")) return "Gas Bill Savings";
  return "Electricity Bill Savings";
}

function opportunityTiming(programType: string): RetrofitOpportunityPreview["timing"] {
  const value = programType.toLowerCase();
  if (value.includes("tax")) return "tax_time";
  if (value.includes("loan") || value.includes("financ")) return "both";
  if (value.includes("rebate") || value.includes("grant")) return "upfront";
  return "unknown";
}

function opportunityEligibilityStatus(status: string): RetrofitOpportunityPreview["eligibilityStatus"] {
  if (status === "confirmed") return "confirmed";
  if (status === "eligible") return "likely";
  if (status === "unknown") return "unknown";
  return "unknown";
}

function opportunityEligibleDisplayLabel(status: RetrofitOpportunityPreview["eligibilityStatus"]) {
  if (status === "confirmed" || status === "likely") return "Yes";
  if (status === "needs review") return "Needs review";
  return "Unknown";
}

function opportunityEligibilitySummaryLabel(status: RetrofitOpportunityPreview["eligibilityStatus"]) {
  if (status === "confirmed" || status === "likely") return "Eligible";
  if (status === "needs review") return "Eligibility needs review";
  return "Eligibility unknown";
}

function opportunityNeedsUtilityTerritoryConfirmation(
  opportunity: SampleMatchResult,
  payload: PortalRetrofitRecommendationsResponse | null
) {
  const sourceText = [
    opportunity.sourceSummary?.administrator,
    opportunity.sourceSummary?.sourceName,
    opportunity.sourceSummary?.state
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (!sourceText) return true;
  const profileTerms = [
    payload?.intake?.site?.electricUtilityProvider,
    payload?.intake?.site?.gasUtilityProvider,
    payload?.intake?.business?.headquarters,
    payload?.intake?.site?.address
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const specificUtilityTerms = [
    "richland",
    "seattle city light",
    "tacoma",
    "snohomish",
    "pse",
    "puget sound energy",
    "pg&e",
    "pacific gas",
    "ladwp",
    "con edison",
    "duke energy"
  ];
  const hasSpecificUtilityTerm = specificUtilityTerms.some((term) => sourceText.includes(term));
  if (!hasSpecificUtilityTerm) return false;
  return !specificUtilityTerms.some((term) => sourceText.includes(term) && profileTerms.includes(term));
}

function normalizeOpportunityType(programType?: string | null) {
  const value = (programType || "").toLowerCase();
  if (value.includes("tax")) return "tax incentive";
  if (value.includes("grant")) return "grant";
  if (value.includes("rebate")) return "rebate";
  if (value.includes("loan") || value.includes("financ")) return "financing";
  if (value.includes("utility")) return "utility program";
  if (value.includes("certification") || value.includes("audit")) return "certification/audit/special opportunity";
  if (value.includes("state") || value.includes("local")) return "state/local incentive";
  return "utility program";
}

function estimateTaxBenefits(retrofit: SampleRetrofitGroup, preview: SampleSavingsPreview | null) {
  const selectedTaxOpportunities = retrofit.opportunities.filter((opportunity) =>
    normalizeOpportunityType(opportunity.sourceSummary?.programType).includes("tax")
  );
  if (selectedTaxOpportunities.length === 0) return null;
  if (preview?.status !== "calculated") return null;
  const taxOpportunityIds = new Set(selectedTaxOpportunities.map((opportunity) => opportunity.opportunityId));
  const includedTaxBenefits = (preview.incentiveCalculationPackageSummaries || [])
    .filter((summary) => summary.includedInRuntimeTotals && taxOpportunityIds.has(summary.opportunityId))
    .reduce((total, summary) => total + Number(summary.totals?.expectedOneTimeSavingsCents || 0), 0);
  return includedTaxBenefits > 0 ? includedTaxBenefits : null;
}

function missingInfoForRetrofit(
  retrofit: SampleRetrofitGroup,
  preview: SampleSavingsPreview | null,
  payload: PortalRetrofitRecommendationsResponse | null
) {
  const missing: string[] = [];
  if (preview?.status !== "calculated") missing.push("electric bill");
  if (!retrofit.opportunities.length) missing.push("selected opportunity");
  if (retrofit.opportunities.some((opportunity) => opportunity.unresolvedRequirements.includes("project quote"))) missing.push("project quote");
  if (retrofit.opportunities.some((opportunity) => opportunityNeedsUtilityTerritoryConfirmation(opportunity, payload))) {
    missing.push("utility territory confirmation");
  }
  if (retrofit.retrofitTypeId.includes("led") || retrofit.retrofitTypeId.includes("lighting")) {
    missing.push("fixture count", "operating hours");
  } else if (retrofit.retrofitTypeId.includes("insulation") || retrofit.retrofitTypeId.includes("envelope")) {
    missing.push("insulation area", "current R-value", "target R-value");
  } else if (retrofit.retrofitTypeId.includes("ev") || retrofit.retrofitTypeId.includes("charger")) {
    missing.push("charger count", "charger level", "expected utilization", "fuel baseline");
  } else if (retrofit.retrofitTypeId.includes("solar")) {
    missing.push("annual kWh usage", "roof area", "project quote");
  } else if (retrofit.retrofitTypeId.includes("hvac")) {
    missing.push("equipment age", "current fuel type", "project quote");
  } else if (retrofit.retrofitTypeId.includes("water")) {
    missing.push("fixture count", "water bill");
  }
  if (retrofit.opportunities.some((opportunity) => normalizeOpportunityType(opportunity.sourceSummary?.programType).includes("tax"))) {
    missing.push("tax/entity information");
  }
  if (payload?.taxRuntimePreview?.opportunityDisplayBlocked) {
    missing.push(
      ...(payload.taxRuntimePreview.requiredPreOpportunityInputs || [])
        .map((field) => field.label || field.inputKey.replaceAll("_", " "))
        .slice(0, 3)
    );
  }
  return [...new Set(missing)].slice(0, 6);
}

function assumptionUnit(label: string) {
  const value = label.toLowerCase();
  if (value.includes("hour")) return "hours/day";
  if (value.includes("month")) return "USD/month";
  if (value.includes("annual")) return "%/year";
  if (value.includes("cost") || value.includes("fee")) return "USD";
  if (value.includes("square footage")) return "sq ft";
  if (value.includes("fixture") || value.includes("count") || value.includes("quantity")) return "count";
  return "Unit pending";
}

function opportunityApplicationProcess(opportunity: SampleMatchResult) {
  const programType = normalizeOpportunityType(opportunity.sourceSummary?.programType);
  if (programType.includes("tax")) return "Tax filing / accountant review";
  if (opportunity.blockers.length > 0) return "Longer review expected";
  if (opportunity.unresolvedRequirements.length > 2) return "Moderate review timeline";
  if (opportunity.applicationUrl) {
    const firstRequirement = opportunity.unresolvedRequirements[0];
    return firstRequirement
      ? `Apply through the source program after confirming ${firstRequirement}.`
      : "Apply through the source program link.";
  }
  if (opportunity.websiteUrl || opportunity.sourceUrl) {
    return "Review the source program page to confirm application steps.";
  }
  return "Application process: Needs source review";
}

function opportunityDifficulty(opportunity: SampleMatchResult, programType: string): RetrofitOpportunityPreview["difficulty"] {
  if (opportunity.blockers.length > 0) return "hard";
  if (opportunity.unresolvedRequirements.length > 2) return "medium";
  if (programType.includes("tax")) return "medium";
  if (opportunity.applicationUrl || opportunity.websiteUrl || opportunity.sourceUrl) return "medium";
  return "unknown";
}

function opportunityLengthLabel(opportunity: SampleMatchResult) {
  if (opportunity.blockers.length > 0) return "Longer review expected";
  if (opportunity.unresolvedRequirements.length > 2) return "Moderate review timeline";
  const programType = normalizeOpportunityType(opportunity.sourceSummary?.programType);
  if (programType.includes("tax")) return "Tax filing / accountant review";
  if (opportunity.applicationUrl) return "Source application timeline";
  if (opportunity.websiteUrl || opportunity.sourceUrl) return "Source review timeline";
  return "Timeline unavailable from current source data";
}

function opportunityDeadlineLabel(opportunity: SampleMatchResult) {
  const sourceText = [
    opportunity.matchedReasons.join(" "),
    opportunity.sourceSummary?.programType,
    opportunity.sourceSummary?.sourceName
  ].join(" ");
  const deadlineMatch = sourceText.match(/\b(?:deadline|due|through)\s*:?\s*([A-Z][A-Za-z]+\.?\s+\d{1,2},?\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{2,4})/i);
  if (deadlineMatch?.[1]) return deadlineMatch[1];
  if (opportunity.sourceUrl || opportunity.websiteUrl || opportunity.applicationUrl) return "Not listed in source data";
  return "Source unavailable";
}

function environmentalImpactLabel(programType: string) {
  if (programType.includes("water")) return "Helps reduce water use.";
  if (programType.includes("tax incentive")) return "Supports qualifying clean-energy or efficiency upgrades.";
  return "Helps reduce electricity use or related operating impacts where the retrofit applies.";
}

function certificationBoostLabel(programType: string) {
  if (programType.includes("certification")) return "Supports Green Business Network readiness.";
  return "May support LEED or ENERGY STAR-related criteria.";
}

export function comparePreviewRetrofits(
  a: RetrofitPreviewCard,
  b: RetrofitPreviewCard,
  sortBy: string,
  readinessById: Map<string, RetrofitReadiness> = new Map()
) {
  const aReadiness = readinessById.get(a.id) || { billsComplete: false, questionsComplete: false, estimateComplete: false };
  const bReadiness = readinessById.get(b.id) || { billsComplete: false, questionsComplete: false, estimateComplete: false };
  const readinessDelta = readinessSortGroup(aReadiness) - readinessSortGroup(bReadiness);
  if (readinessDelta !== 0) return readinessDelta;
  if (sortBy === "total_savings") return compareNullableNumber(b.metrics.recurringOperationalSavingsAnnual, a.metrics.recurringOperationalSavingsAnnual) || a.rank - b.rank;
  if (sortBy === "monthly_savings") return compareNullableNumber(b.metrics.recurringOperationalSavingsMonthly, a.metrics.recurringOperationalSavingsMonthly) || a.rank - b.rank;
  if (sortBy === "payback") return compareNullableNumber(a.metrics.paybackPeriodYears, b.metrics.paybackPeriodYears) || a.rank - b.rank;
  if (sortBy === "upfront_cost") return compareNullableNumber(a.metrics.estimatedUpfrontProjectCost, b.metrics.estimatedUpfrontProjectCost) || a.rank - b.rank;
  if (sortBy === "percentage_profit" || sortBy === "roi") return compareNullableNumber(parsePercentMetric(b.metrics.roi), parsePercentMetric(a.metrics.roi)) || a.rank - b.rank;
  return a.rank - b.rank;
}

function compareUpfrontCost(a: RetrofitPreviewCard, b: RetrofitPreviewCard) {
  return compareNullableNumber(a.metrics.estimatedUpfrontProjectCost, b.metrics.estimatedUpfrontProjectCost) || a.rank - b.rank;
}

function comparePayback(a: RetrofitPreviewCard, b: RetrofitPreviewCard) {
  return compareNullableNumber(a.metrics.paybackPeriodYears, b.metrics.paybackPeriodYears) || a.rank - b.rank;
}

function compareTotalSavings(a: RetrofitPreviewCard, b: RetrofitPreviewCard) {
  return compareNullableNumber(b.metrics.recurringOperationalSavingsAnnual, a.metrics.recurringOperationalSavingsAnnual) || a.rank - b.rank;
}

function compareNullableNumber(a: number | null | undefined, b: number | null | undefined) {
  const aValue = a == null || !Number.isFinite(a) ? Number.POSITIVE_INFINITY : a;
  const bValue = b == null || !Number.isFinite(b) ? Number.POSITIVE_INFINITY : b;
  return aValue - bValue;
}

function parsePercentMetric(value: string | number | null | undefined) {
  if (typeof value === "number") return value;
  if (!value) return null;
  const parsed = Number(String(value).replace("%", ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatMaybeCents(value: number | null | undefined, fallback: string) {
  if (value == null || !Number.isFinite(value)) return fallback;
  return formatCents(value);
}

function formatMaybeRecurringSavings(retrofit: RetrofitPreviewCard) {
  const annual = retrofit.metrics.recurringOperationalSavingsAnnual;
  const monthly = retrofit.metrics.recurringOperationalSavingsMonthly;
  if (annual == null && monthly == null) return "Needs bill";
  if ((annual ?? 0) < 0 || (monthly ?? 0) < 0) return "Estimated operating cost change";
  return `${formatMaybeCents(annual, "Not estimated yet")}/year · ${formatMaybeCents(monthly, "Needs bill")}/month`;
}

function formatPayback(value: number | null | undefined, fallback = "Not estimated yet") {
  if (value == null || !Number.isFinite(value)) return fallback;
  return `${value.toFixed(value < 10 ? 1 : 0)} years`;
}

function formatEstimateCents(value: number | null | undefined, fallback = "Estimate unavailable") {
  if (value == null || !Number.isFinite(value)) return fallback;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value / 100);
}

function formatEstimateCentsPerPeriod(value: number | null | undefined, period: "mo" | "yr", fallback = "Estimate unavailable") {
  const formatted = formatEstimateCents(value, fallback);
  return formatted === fallback ? fallback : `${formatted}/${period}`;
}

function centsPerMonth(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return null;
  return Math.round(value / 12);
}

function sumDefinedCents(values: Array<number | null | undefined>) {
  const definedValues = values.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (!definedValues.length) return null;
  return definedValues.reduce((sum, value) => sum + value, 0);
}

function formatEstimatePercent(value: string | number | null | undefined, fallback = "Estimate unavailable") {
  const parsed = parsePercentMetric(value);
  if (parsed == null || !Number.isFinite(parsed)) return fallback;
  return `${parsed.toFixed(parsed < 10 && parsed % 1 !== 0 ? 1 : 0)}%`;
}

function scenarioBestForLabel(index: number) {
  if (index === 0) return "Lowest upfront cost";
  if (index === 1) return "Fastest payback";
  return "Highest one-time & recurring savings";
}

function scenarioDisplayName(index: number) {
  return `Scenario ${index + 1}`;
}

function inferApplicationPreApproval(profile: CustomerApplicationProfile | null, opportunity?: RetrofitOpportunityPreview | null) {
  const text = [
    ...(profile?.requiredFields || []).map((item) => `${item.label} ${item.description || ""}`),
    ...(profile?.requiredDocuments || []).map((item) => `${item.label} ${item.description || ""}`),
    ...(profile?.applicationSteps || []),
    opportunity?.applicationProcess || "",
    opportunity?.description || ""
  ].join(" ").toLowerCase();
  if (!text.trim()) return opportunityHasAnyUrl(opportunity || null) ? "Not listed in source data" : "Needs review";
  if (text.includes("pre-approval") || text.includes("preapproval") || text.includes("pre approval")) return "Yes";
  if (opportunity?.applicationMethod === "tax/accountant filing" || opportunityHasAnyUrl(opportunity || null)) return "Not listed in source data";
  return "Needs review";
}

function applicationDeadlineLabel(profile: CustomerApplicationProfile | null, opportunity?: RetrofitOpportunityPreview | null) {
  return profile?.deadlinesOrFundingStatus[0] || opportunity?.deadline || "Not listed";
}

function applicationEstimatedTimeLabel(profile: CustomerApplicationProfile | null, opportunity?: RetrofitOpportunityPreview | null) {
  return opportunity?.length || (profile?.applicationSteps.length ? "20–30 minutes" : "Varies");
}

function applicationDifficultyLabel(profile: CustomerApplicationProfile | null, opportunity?: RetrofitOpportunityPreview | null) {
  return capitalizeLabel(opportunity?.difficulty || (profile ? "needs review" : "needs review"));
}

function formatScenarioRecurringSavings(scenario: RetrofitScenarioPreview) {
  if (scenario.metrics.recurringOperationalSavingsAnnual == null && scenario.metrics.recurringOperationalSavingsMonthly == null) {
    return "Needs bill";
  }
  if ((scenario.metrics.recurringOperationalSavingsAnnual ?? 0) < 0 || (scenario.metrics.recurringOperationalSavingsMonthly ?? 0) < 0) {
    return "Estimated operating cost change";
  }
  return `${formatMaybeCents(scenario.metrics.recurringOperationalSavingsAnnual, "Not estimated yet")}/year`;
}

function estimateBasisLabel(value: EstimateBasisValue) {
  if (value === "uploaded_bills") return "Uploaded bills";
  if (value === "confirmed_details") return "Bills + confirmed retrofit details";
  if (value === "quote") return "Bills + quote";
  if (value === "tax_info") return "Bills + quote + tax info";
  if (value === "mixed") return "Mixed";
  return "Initial form information";
}

function capitalizeLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function slugify(value: string) {
  return value.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/^-+|-+$/g, "");
}

function estimateSourceLabel(source: EditableEstimateAssumption["source"]) {
  if (source === "industry_standard") return "Industry estimate";
  if (source === "user_entered") return "User entered";
  if (source === "bill_uploaded") return "Uploaded bill";
  if (source === "quote_uploaded") return "Quote uploaded";
  return "Unknown";
}

export function confirmSingleEstimateState(current: Record<string, boolean>, assumptionId: string) {
  return {
    ...current,
    [assumptionId]: true
  };
}

export function confirmAllEstimateState(current: Record<string, boolean>, assumptions: EditableEstimateAssumption[]) {
  const next = { ...current };
  assumptions.forEach((assumption) => {
    next[assumption.id] = true;
  });
  return next;
}

export function countScenarioSelectedOpportunities(
  scenario: RetrofitScenarioPreview,
  selectedOpportunityIds: Record<string, boolean>
) {
  return scenario.selectedOpportunityIds.filter((id) => selectedOpportunityIds[id] !== false).length;
}

export function getScenarioSelectedOpportunityCount(
  scenario: RetrofitScenarioPreview,
  selectedOpportunityIds: Record<string, boolean> = {}
) {
  return countScenarioSelectedOpportunities(scenario, selectedOpportunityIds);
}

export function getSelectedOpportunitiesForScenario(
  retrofit: RetrofitPreviewCard,
  scenario: RetrofitScenarioPreview | undefined,
  selectedOpportunityIds: Record<string, boolean> = {}
) {
  if (!scenario) return [];
  return retrofit.opportunities.filter(
    (opportunity) =>
      scenario.selectedOpportunityIds.includes(opportunity.id) &&
      selectedOpportunityIds[opportunity.id] !== false
  );
}

export function getIncludedOpportunitiesForCurrentEstimate(
  retrofit: RetrofitPreviewCard,
  selectedScenario: RetrofitScenarioPreview | undefined,
  selectedOpportunityIds: Record<string, boolean> = {}
) {
  const scenarioOpportunityIds = new Set(selectedScenario?.selectedOpportunityIds || []);
  return retrofit.opportunities.filter((opportunity) => {
    const isSelected = Boolean(selectedOpportunityIds[opportunity.id]);
    const isInScenario = !selectedScenario || scenarioOpportunityIds.has(opportunity.id);
    return isSelected && isInScenario && getOpportunityIncludedLabel(opportunity, isSelected) === "Included in current estimate";
  });
}

export function getOpportunityIncludedLabel(opportunity: RetrofitOpportunityPreview, selected: boolean) {
  if (selected) {
    if (opportunity.includedState === "Included in current estimate") return "Included in current estimate";
    if (opportunity.includedState === "Possible additional value") return "Possible additional value";
    if (opportunity.includedState === "Not included in current estimate") return "Not included in current estimate";
    return "Not included yet — needs more information";
  }
  if (opportunity.includedState === "Included in current estimate") return "Not included in current estimate";
  return opportunity.includedState;
}

function includedStateFromOpportunity(isIncluded: boolean, needsMoreInfo: boolean): RetrofitOpportunityPreview["includedState"] {
  if (isIncluded && !needsMoreInfo) return "Included in current estimate";
  if (isIncluded && needsMoreInfo) return "Not included yet — needs more information";
  if (needsMoreInfo) return "Not included yet — needs more information";
  return "Not included in current estimate";
}

function AdminClientPortalPreviewPage({
  credential,
  onSignOut,
  previewHint,
  userId,
  viewer
}: {
  credential: AuthCredential | null;
  onSignOut: () => void;
  previewHint: PortalPreviewHint | null;
  userId: string;
  viewer: UserRecord;
}) {
  const [profilePayload, setProfilePayload] = useState<AdminClientPortalProfilePayload | null>(null);
  const [activeTab, setActiveTab] = useState("My information");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const previewUser = profilePayload?.user || {
    ...viewer,
    role: "client" as const,
    fullName: previewHint?.clientName || "Selected client",
    email: previewHint?.email || viewer.email,
    companyName: previewHint?.companyName || viewer.companyName
  };

  useEffect(() => {
    let isMounted = true;

    if (!credential || !userId) {
      setProfileError("Admin sign-in is required to preview a client portal.");
      setIsProfileLoading(false);
      return () => {
        isMounted = false;
      };
    }

    setIsProfileLoading(true);
    setProfileError(null);

    apiGet<AdminClientPortalProfilePayload>(`/api/admin/client-portal-profile/${encodeURIComponent(userId)}`, {
      headers: adminAuthHeaders(credential)
    })
      .then((response) => {
        if (!isMounted) return;
        setProfilePayload(response);
      })
      .catch((requestError) => {
        if (!isMounted) return;
        setProfileError(requestError instanceof Error ? requestError.message : "Could not load the client portal preview.");
      })
      .finally(() => {
        if (isMounted) setIsProfileLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [credential, userId]);

  return (
    <WorkspaceLayout
      activeNavItem={activeTab}
      navItems={["My information", "Retrofit estimates"]}
      onNavItemChange={setActiveTab}
      onSignOut={onSignOut}
      title="Client portal preview"
      user={previewUser}
    >
      {activeTab === "Retrofit estimates" ? (
        <CustomerRetrofitEstimatesPanel
          credential={credential}
          emptyMessage="This client does not have any eligible retrofit matches yet."
          endpoint={`/api/admin/client-retrofit-recommendations/${encodeURIComponent(userId)}`}
          eyebrow="Admin-only portal preview"
          intro={`This is the customer-facing retrofit view for user ID \`${userId}\`, powered by the same live matcher used elsewhere in the app.`}
          loadingMessage="Loading live retrofit recommendations for this client..."
          title={`${previewUser.fullName || "Client"}'s retrofit estimates`}
        />
      ) : (
        <section className="database-shell retrofit-results-shell">
          <div className="database-toolbar">
            <div>
              <p className="eyebrow">Admin-only portal preview</p>
              <h1>{previewUser.fullName || "Client portal preview"}</h1>
              <p>This is a temporary admin view of the client portal for user ID `{userId}`.</p>
            </div>
            <div className="database-stats">
              <strong>{profilePayload?.intake ? "Loaded" : "..."}</strong>
              <span>profile</span>
            </div>
          </div>

          {profileError ? <p className="error-message">{profileError}</p> : null}

          {isProfileLoading ? (
          <section className="database-detail-panel">
            <RetroFiLogoLoader label="Loading the client portal preview..." size="lg" tone="card" />
          </section>
          ) : (
            <ProfilePanel intake={profilePayload?.intake || null} user={previewUser} />
          )}
        </section>
      )}
    </WorkspaceLayout>
  );
}

const ADMIN_OPPORTUNITIES_TAB = "Opportunities";
const ADMIN_APPLICATION_SOURCES_TAB = "Application Sources";
const ADMIN_APPLICATION_PROFILES_TAB = "Application Profiles";
const ADMIN_RETROFITS_TAB = "Retrofits";
const ADMIN_TEST_CASES_TAB = "Test Cases";
const ADMIN_USER_PREVIEW_TAB = "User Preview";
const ADMIN_POST_FORM_PREVIEW_TAB = "Post Form Preview";
const ADMIN_TASKS_TAB = "Tasks";
const ADMIN_DASHBOARD_PERFORMANCE_TAB = "Dashboard Performance Data";
const ADMIN_HIDDEN_DATA_TABLE_NAMES = new Set([
  "gbs-application-profiles",
  "gbs-api-runtime-state",
  "gbs-client-intake",
  "gbs-dashboard-performance",
  "gbs-retrofit-recommendation-cache",
  "gbs-users"
]);
const ADMIN_TEST_CASES_DATA_PATH = "/sample_matching_test_cases.json";
const ADMIN_RETROFIT_DATABASE_DATA_PATH = "/retrofit_opportunity_index.json";
const SAMPLE_MATCH_STATUS_ORDER = [
  "eligible",
  "ineligible"
];
const SPECIAL_PLANNING_RETROFIT_IDS = new Set([
  "energy_audit",
  "leed_certification",
  "engineering_feasibility_study",
  "building_benchmarking_compliance"
]);
const billFieldDictionaryEntries = billFieldDictionary as BillFieldDictionaryEntry[];
const billFieldDictionaryById = new Map(billFieldDictionaryEntries.map((field) => [field.id, field]));

function adminSectionKey(tab: string) {
  if (tab === ADMIN_OPPORTUNITIES_TAB) return "database:opportunities";
  if (tab === ADMIN_APPLICATION_SOURCES_TAB) return "application-sources";
  if (tab === ADMIN_APPLICATION_PROFILES_TAB) return "application-profiles";
  if (tab === ADMIN_RETROFITS_TAB) return "database:retrofits";
  if (tab === ADMIN_TEST_CASES_TAB) return "test-cases";
  if (tab === ADMIN_DASHBOARD_PERFORMANCE_TAB) return "dashboard-performance-data";
  return tab === "Users" ? "users" : `table:${tab}`;
}

function formatBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let amount = value;
  let unitIndex = 0;
  while (amount >= 1024 && unitIndex < units.length - 1) {
    amount /= 1024;
    unitIndex += 1;
  }
  return `${amount >= 10 || unitIndex === 0 ? amount.toFixed(0) : amount.toFixed(1)} ${units[unitIndex]}`;
}

function AdminGptProChatsPage({
  credential,
  navigate,
  onSignOut,
  viewer
}: {
  credential: AuthCredential | null;
  navigate: (route: Route) => void;
  onSignOut: () => void;
  viewer: UserRecord;
}) {
  function handleWorkspaceNav(item: string) {
    if (item === "Admin") {
      navigate("admin");
    }
  }

  return (
    <WorkspaceLayout
      activeNavItem="GPT Pro chats"
      navItems={["GPT Pro chats", "Admin"]}
      onNavItemChange={handleWorkspaceNav}
      onSignOut={onSignOut}
      title="Chats"
      user={viewer}
    >
      <GptProChatsPanel credential={credential} />
    </WorkspaceLayout>
  );
}

function LocalGptProChatsStandalonePage() {
  return (
    <main className="tasks-standalone-page">
      <GptProChatsPanel credential={null} />
    </main>
  );
}

function GptProChatsPanel({ credential }: { credential: AuthCredential | null }) {
  const [indexResponse, setIndexResponse] = useState<GptProWorkIndexResponse | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedPromptPath, setSelectedPromptPath] = useState("");
  const [promptContent, setPromptContent] = useState("");
  const [outputContent, setOutputContent] = useState("");
  const [savedOutputContent, setSavedOutputContent] = useState("");
  const [outputExists, setOutputExists] = useState(false);
  const [isLoadingIndex, setIsLoadingIndex] = useState(true);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const batches = indexResponse?.batches || [];
  const selectedBatch = batches.find((batch) => batch.batchId === selectedBatchId) || null;
  const selectedPrompt = selectedBatch?.promptFiles.find((prompt) => prompt.promptPath === selectedPromptPath) || null;
  const isOutputDirty = outputContent !== savedOutputContent;
  const storageIsWritable = indexResponse?.storageStatus === "s3";

  const loadIndex = useCallback(async () => {
    setIsLoadingIndex(true);
    setError(null);
    setMessage(null);

    try {
      const payload = await apiGet<GptProWorkIndexResponse>("/api/admin/gpt-pro-work/batches", {
        ...(credential ? { headers: adminAuthHeaders(credential) } : {})
      });
      setIndexResponse(payload);
      setSelectedBatchId((currentBatchId) =>
        payload.batches.some((batch) => batch.batchId === currentBatchId)
          ? currentBatchId
          : payload.currentBatchId || payload.batches[0]?.batchId || ""
      );
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load GPT Pro work batches.");
    } finally {
      setIsLoadingIndex(false);
    }
  }, [credential]);

  useEffect(() => {
    void loadIndex();
  }, [loadIndex]);

  useEffect(() => {
    if (!selectedBatch) {
      setSelectedPromptPath("");
      return;
    }

    setSelectedPromptPath((currentPath) =>
      selectedBatch.promptFiles.some((prompt) => prompt.promptPath === currentPath)
        ? currentPath
        : selectedBatch.promptFiles[0]?.promptPath || ""
    );
  }, [selectedBatch]);

  useEffect(() => {
    if (!selectedBatch || !selectedPromptPath) {
      setPromptContent("");
      setOutputContent("");
      setSavedOutputContent("");
      setOutputExists(false);
      return undefined;
    }

    let isMounted = true;
    setIsLoadingFile(true);
    setError(null);
    setMessage(null);
    setCopyMessage(null);

    const params = new URLSearchParams({
      batch: selectedBatch.batchId,
      path: selectedPromptPath
    });
    const requestInit = {
      ...(credential ? { headers: adminAuthHeaders(credential) } : {})
    };

    Promise.all([
      apiGet<GptProWorkContentResponse>(`/api/admin/gpt-pro-work/prompt?${params.toString()}`, requestInit),
      apiGet<GptProWorkContentResponse>(`/api/admin/gpt-pro-work/output?${params.toString()}`, requestInit)
    ])
      .then(([promptPayload, outputPayload]) => {
        if (!isMounted) return;
        setPromptContent(promptPayload.content);
        setOutputContent(outputPayload.content);
        setSavedOutputContent(outputPayload.content);
        setOutputExists(Boolean(outputPayload.exists));
      })
      .catch((requestError) => {
        if (!isMounted) return;
        setError(requestError instanceof Error ? requestError.message : "Could not load the selected GPT Pro file.");
        setPromptContent("");
        setOutputContent("");
        setSavedOutputContent("");
        setOutputExists(false);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingFile(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [credential, selectedBatch, selectedPromptPath]);

  async function copyPrompt() {
    if (!promptContent) return;
    setCopyMessage(null);
    try {
      await navigator.clipboard.writeText(promptContent);
      setCopyMessage("Prompt copied.");
    } catch {
      setCopyMessage("Clipboard access failed.");
    }
  }

  async function saveOutput() {
    if (!selectedBatch || !selectedPrompt) {
      setError("Select a prompt before saving output.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setMessage(null);
    try {
      const saved = await apiPut<GptProWorkSaveResponse>("/api/admin/gpt-pro-work/output", {
        ...(credential ? adminAuthBody(credential) : {}),
        batchId: selectedBatch.batchId,
        content: outputContent,
        promptPath: selectedPrompt.promptPath
      });
      setSavedOutputContent(outputContent);
      setOutputExists(true);
      setMessage(`Saved ${formatBytes(saved.sizeBytes)} to ${saved.outputPath}.`);
      await loadIndex();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not save GPT Pro output.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="gpt-pro-chats">
      <div className="gpt-pro-chats-header">
        <div>
          <p className="eyebrow">GPT Pro repair batches</p>
          <h1>Chats</h1>
        </div>
        <div className="gpt-pro-chats-actions">
          <span className="soft-badge">Storage: {indexResponse?.storageStatus || "checking"}</span>
          <button className="secondary-button" disabled={isLoadingIndex} onClick={() => void loadIndex()} type="button">
            Refresh
          </button>
        </div>
      </div>

      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p className="success-message">{message}</p> : null}
      {copyMessage ? <p className="success-message">{copyMessage}</p> : null}
      {indexResponse?.warnings?.length ? (
        <div className="gpt-pro-chats-warning">
          {indexResponse.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      ) : null}

      <div className="gpt-pro-chats-summary">
        <article>
          <span>Batches</span>
          <strong>{indexResponse?.totals.batchCount.toLocaleString() || "0"}</strong>
        </article>
        <article>
          <span>Prompts</span>
          <strong>{indexResponse?.totals.promptCount.toLocaleString() || "0"}</strong>
        </article>
        <article>
          <span>Outputs</span>
          <strong>{indexResponse?.totals.outputCount.toLocaleString() || "0"}</strong>
        </article>
        <article>
          <span>Size</span>
          <strong>{formatBytes(indexResponse?.totals.totalBytes || 0)}</strong>
        </article>
      </div>

      <div className="gpt-pro-batch-toolbar">
        <label className="field">
          <span>Batch</span>
          <select
            disabled={isLoadingIndex || batches.length === 0}
            onChange={(event) => setSelectedBatchId(event.target.value)}
            value={selectedBatchId}
          >
            {batches.map((batch) => (
              <option key={batch.batchId} value={batch.batchId}>
                {batch.displayName}{batch.batchId === indexResponse?.currentBatchId ? " (current)" : ""}
              </option>
            ))}
          </select>
        </label>
        <div className="gpt-pro-batch-meta">
          <span>{selectedBatch?.promptCount.toLocaleString() || "0"} prompts</span>
          <span>{selectedBatch?.objectCount.toLocaleString() || "0"} objects</span>
          <span>{selectedBatch?.latestModifiedAt ? formatDate(selectedBatch.latestModifiedAt) : "No date"}</span>
        </div>
      </div>

      <div className="gpt-pro-chats-layout">
        <aside className="gpt-pro-prompt-list-panel" aria-label="GPT Pro prompts">
          <div className="gpt-pro-prompt-list-header">
            <strong>{selectedBatch?.displayName || "No batch selected"}</strong>
            {selectedBatch?.batchId === indexResponse?.currentBatchId ? <span className="soft-badge">Current</span> : null}
          </div>
          <div className="gpt-pro-prompt-list">
            {isLoadingIndex ? <p className="empty-state">Loading batches...</p> : null}
            {!isLoadingIndex && selectedBatch?.promptFiles.length === 0 ? (
              <p className="empty-state">No prompt files found in this batch.</p>
            ) : null}
            {selectedBatch?.promptFiles.map((prompt) => (
              <button
                aria-current={prompt.promptPath === selectedPromptPath ? "true" : undefined}
                className="gpt-pro-prompt-row"
                key={prompt.promptPath}
                onClick={() => setSelectedPromptPath(prompt.promptPath)}
                type="button"
              >
                <span>
                  <strong>{prompt.displayName}</strong>
                  <small>{prompt.promptPath}</small>
                </span>
                <mark>{prompt.outputExists ? "Saved" : "Empty"}</mark>
              </button>
            ))}
          </div>
        </aside>

        <section className="gpt-pro-editor-panel">
          {selectedPrompt ? (
            <>
              <div className="gpt-pro-file-header">
                <div>
                  <p className="eyebrow">Current file</p>
                  <h2>{selectedPrompt.displayName}</h2>
                  <p>{selectedPrompt.promptPath}</p>
                </div>
                <div className="gpt-pro-file-actions">
                  <button className="secondary-button" disabled={!promptContent || isLoadingFile} onClick={() => void copyPrompt()} type="button">
                    Copy prompt
                  </button>
                  <button
                    disabled={!storageIsWritable || !isOutputDirty || isSaving || isLoadingFile}
                    onClick={() => void saveOutput()}
                    type="button"
                  >
                    {isSaving ? "Saving..." : "Save output"}
                  </button>
                </div>
              </div>

              <div className="gpt-pro-file-context">
                <div>
                  <span>Prompt object</span>
                  <strong>{selectedPrompt.promptKey}</strong>
                </div>
                <div>
                  <span>Output object</span>
                  <strong>{selectedPrompt.outputKey}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{outputExists ? "Output saved" : "Output empty"}{isOutputDirty ? " - unsaved edits" : ""}</strong>
                </div>
              </div>

              <div className="gpt-pro-editor-grid">
                <label className="gpt-pro-editor-field">
                  <span>Prompt</span>
                  <textarea readOnly value={isLoadingFile ? "Loading prompt..." : promptContent} />
                </label>
                <label className="gpt-pro-editor-field">
                  <span>Output</span>
                  <textarea
                    disabled={!storageIsWritable}
                    onChange={(event) => setOutputContent(event.target.value)}
                    value={isLoadingFile ? "Loading output..." : outputContent}
                  />
                </label>
              </div>
            </>
          ) : (
            <p className="empty-state">Select a prompt file to open its workspace.</p>
          )}
        </section>
      </div>
    </section>
  );
}

function AdminDashboard({
  credential,
  initialTab,
  onSignOut,
  payload
}: {
  credential: AuthCredential | null;
  initialTab?: string;
  onSignOut: () => void;
  payload: AdminPayload;
}) {
  const [adminPayload, setAdminPayload] = useState(payload);
  const [activeTab, setActiveTab] = useState(initialTab || "Users");
  const [error, setError] = useState<string | null>(null);
  const [loadedSections, setLoadedSections] = useState<string[]>([]);
  const [loadingSectionKey, setLoadingSectionKey] = useState<string | null>(null);
  const { admin, users: rows, dataTables } = adminPayload;
  const navItems = [
    "Users",
    ADMIN_USER_PREVIEW_TAB,
    ADMIN_POST_FORM_PREVIEW_TAB,
    ADMIN_TASKS_TAB,
    ADMIN_DASHBOARD_PERFORMANCE_TAB,
    ADMIN_TEST_CASES_TAB,
    ADMIN_APPLICATION_SOURCES_TAB,
    ADMIN_APPLICATION_PROFILES_TAB,
    ...dataTables
      .filter((table) => table.name !== OPPORTUNITIES_TABLE_NAME && !ADMIN_HIDDEN_DATA_TABLE_NAMES.has(table.name))
      .map((table) => table.name),
    ADMIN_OPPORTUNITIES_TAB,
    ADMIN_RETROFITS_TAB
  ];
  const selectedDataTable =
    activeTab === ADMIN_OPPORTUNITIES_TAB ||
    activeTab === ADMIN_RETROFITS_TAB ||
    activeTab === ADMIN_TEST_CASES_TAB
      ? null
      : dataTables.find((table) => table.name === activeTab) || null;
  const activeSectionKey = adminSectionKey(activeTab);
  const isCurrentSectionLoading = loadingSectionKey === activeSectionKey;

  function handleOpportunityUpdated(updatedOpportunity: OpportunityRecord) {
    setAdminPayload((currentPayload) => ({
      ...currentPayload,
      dataTables: currentPayload.dataTables.map((table) => {
        if (table.name !== OPPORTUNITIES_TABLE_NAME) {
          return table;
        }

        return {
          ...table,
          records: table.records.map((record) => {
            if (!isPlainRecord(record) || record.opportunityId !== updatedOpportunity.opportunityId) {
              return record;
            }
            return updatedOpportunity;
          })
        };
      })
    }));
  }

  function markSectionLoaded(sectionKey: string) {
    setLoadedSections((currentSections) =>
      currentSections.includes(sectionKey) ? currentSections : [...currentSections, sectionKey]
    );
  }

  async function loadDashboardSection(tab: string, { force = false }: { force?: boolean } = {}) {
    const sectionKey = adminSectionKey(tab);

    if (!force && loadedSections.includes(sectionKey)) {
      return;
    }

    setError(null);

    if (
      tab === ADMIN_TEST_CASES_TAB ||
      tab === ADMIN_APPLICATION_SOURCES_TAB ||
      tab === ADMIN_APPLICATION_PROFILES_TAB ||
      tab === ADMIN_DASHBOARD_PERFORMANCE_TAB ||
      tab === ADMIN_OPPORTUNITIES_TAB ||
      tab === ADMIN_RETROFITS_TAB
    ) {
      markSectionLoaded(sectionKey);
      return;
    }

    if (tab === ADMIN_APPLICATION_SOURCES_TAB || tab === ADMIN_APPLICATION_PROFILES_TAB) {
      markSectionLoaded(sectionKey);
      return;
    }

    if (!credential) {
      setError("Sign in again to refresh the admin dashboard.");
      return;
    }

    setLoadingSectionKey(sectionKey);

    try {
      if (tab === "Users") {
        const response = await apiGet<AdminUsersResponse>("/api/admin/users", {
          headers: adminAuthHeaders(credential)
        });
        setAdminPayload((currentPayload) => ({
          ...currentPayload,
          users: response.users
        }));
      } else {
        const response = await apiGet<AdminTableResponse>(`/api/admin/tables/${encodeURIComponent(tab)}`, {
          headers: adminAuthHeaders(credential)
        });
        setAdminPayload((currentPayload) => ({
          ...currentPayload,
          dataTables: currentPayload.dataTables.some((table) => table.name === response.table.name)
            ? currentPayload.dataTables.map((table) =>
                table.name === response.table.name ? response.table : table
              )
            : [...currentPayload.dataTables, response.table]
        }));
      }
      markSectionLoaded(sectionKey);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Admin refresh failed.");
    } finally {
      setLoadingSectionKey((currentSectionKey) => (currentSectionKey === sectionKey ? null : currentSectionKey));
    }
  }

  async function refreshDashboard() {
    await loadDashboardSection(activeTab, { force: true });
  }

  useEffect(() => {
    setAdminPayload(payload);
    setActiveTab(initialTab || "Users");
    setLoadedSections([]);
    setLoadingSectionKey(null);
  }, [initialTab, payload]);

  useEffect(() => {
    const isVisibleDataTable =
      activeTab !== OPPORTUNITIES_TABLE_NAME &&
      !ADMIN_HIDDEN_DATA_TABLE_NAMES.has(activeTab) &&
      dataTables.some((table) => table.name === activeTab);

    if (
      activeTab !== "Users" &&
      activeTab !== ADMIN_POST_FORM_PREVIEW_TAB &&
      activeTab !== ADMIN_DASHBOARD_PERFORMANCE_TAB &&
      activeTab !== ADMIN_TEST_CASES_TAB &&
      activeTab !== ADMIN_APPLICATION_SOURCES_TAB &&
      activeTab !== ADMIN_APPLICATION_PROFILES_TAB &&
      activeTab !== ADMIN_OPPORTUNITIES_TAB &&
      activeTab !== ADMIN_RETROFITS_TAB &&
      !isVisibleDataTable
    ) {
      setActiveTab("Users");
    }
  }, [activeTab, dataTables]);

  useEffect(() => {
    void loadDashboardSection(activeTab);
  }, [activeTab, credential, loadedSections]);

  function handleAdminNavItemChange(item: string) {
    if (item === ADMIN_USER_PREVIEW_TAB) {
      window.open(pathForRoute("user-preview"), "_blank", "noopener,noreferrer");
      return;
    }
    if (item === ADMIN_POST_FORM_PREVIEW_TAB) {
      const params = new URLSearchParams({ postFormPreview: "1" });
      window.open(`${pathForRoute("user-preview")}?${params.toString()}`, "_blank", "noopener,noreferrer");
      return;
    }
    if (item === ADMIN_TEST_CASES_TAB) {
      window.open(pathForRoute("testcases"), "_blank", "noopener,noreferrer");
      return;
    }
    if (item === ADMIN_TASKS_TAB) {
      window.open(pathForRoute("tasks"), "_blank", "noopener,noreferrer");
      return;
    }
    const nextPath =
      item === ADMIN_APPLICATION_SOURCES_TAB
        ? pathForRoute("admin-application-sources")
        : item === ADMIN_DASHBOARD_PERFORMANCE_TAB
          ? pathForRoute("admin-dashboard-performance-data")
        : item === ADMIN_APPLICATION_PROFILES_TAB
          ? pathForRoute("admin-application-profiles")
          : pathForRoute("admin");
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setActiveTab(item);
  }

  return (
    <WorkspaceLayout
      activeNavItem={activeTab}
      navItems={navItems}
      onNavItemChange={handleAdminNavItemChange}
      onSignOut={onSignOut}
      title="Admin"
      user={admin}
    >
      {error ? <p className="error-message">{error}</p> : null}
      {activeTab === "Users" ? (
        <AdminUsersPanel isLoading={isCurrentSectionLoading} onRefresh={() => void refreshDashboard()} rows={rows} />
      ) : activeTab === ADMIN_APPLICATION_SOURCES_TAB ? (
        <AdminApplicationSourcesPanel credential={credential} />
      ) : activeTab === ADMIN_APPLICATION_PROFILES_TAB ? (
        <AdminApplicationProfilesPanel credential={credential} />
      ) : activeTab === ADMIN_DASHBOARD_PERFORMANCE_TAB ? (
        <AdminDashboardPerformanceDataPanel credential={credential} />
      ) : activeTab === ADMIN_TEST_CASES_TAB ? (
        <AdminTestCasesPanel />
      ) : activeTab === ADMIN_OPPORTUNITIES_TAB ? (
        <AdminDatabasePanel credential={credential} />
      ) : activeTab === ADMIN_RETROFITS_TAB ? (
        <AdminRetrofitDatabasePanel />
      ) : (
        <AdminDataPanel
          credential={credential}
          dataTable={selectedDataTable}
          isLoading={isCurrentSectionLoading}
          onOpportunityUpdated={handleOpportunityUpdated}
          onRefresh={() => void refreshDashboard()}
        />
      )}
    </WorkspaceLayout>
  );
}

function AdminTestCasesStandalonePage() {
  return (
    <main className="testcases-standalone-page">
      <AdminTestCasesPanel />
    </main>
  );
}

const FIRSTMATE_TASK_SECTIONS: Array<{ state: FirstmateTaskState; label: string }> = [
  { state: "active", label: "Active" },
  { state: "blocked", label: "Blocked" },
  { state: "queued", label: "Queued" },
  { state: "completed", label: "Completed" }
];

function AdminTasksStandalonePage({
  credential,
  onSignOut,
  viewer
}: {
  credential: AuthCredential | null;
  onSignOut: () => void;
  viewer: UserRecord;
}) {
  return (
    <WorkspaceLayout
      activeNavItem={ADMIN_TASKS_TAB}
      navItems={[ADMIN_TASKS_TAB]}
      onSignOut={onSignOut}
      title="Tasks"
      user={viewer}
    >
      <FirstmateTasksPanel credential={credential} />
    </WorkspaceLayout>
  );
}

function LocalFirstmateTasksStandalonePage() {
  return (
    <main className="tasks-standalone-page">
      <FirstmateTasksPanel credential={null} />
    </main>
  );
}

function firstmateTasksAccessErrorMessage(error: unknown, fallback: string) {
  if (!(error instanceof Error)) {
    return fallback;
  }

  if (/admin sign-in is required/i.test(error.message)) {
    return "Firstmate tasks require admin sign-in unless the local Firstmate tasks auth bypass is enabled.";
  }

  return error.message;
}

function FirstmateTasksPanel({ credential }: { credential: AuthCredential | null }) {
  const [response, setResponse] = useState<FirstmateTasksResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadTasks = useCallback(async (options?: { preserveNotice?: boolean }) => {
    setIsLoading(true);
    setError(null);
    if (!options?.preserveNotice) {
      setNotice(null);
    }
    try {
      const nextResponse = await apiGet<FirstmateTasksResponse>("/api/admin/firstmate/tasks", {
        ...(credential ? { headers: adminAuthHeaders(credential) } : {})
      });
      setResponse(nextResponse);
    } catch (requestError) {
      setError(firstmateTasksAccessErrorMessage(requestError, "Could not load Firstmate tasks."));
    } finally {
      setIsLoading(false);
    }
  }, [credential]);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const refreshAfterStaleResponse = useCallback(async (serverMessage: string) => {
    setNotice(`${serverMessage} The agent has already moved on, so the task list was refreshed.`);
    await loadTasks({ preserveNotice: true });
  }, [loadTasks]);

  const counts = response?.counts || {
    active: 0,
    blocked: 0,
    queued: 0,
    completed: 0,
    needsResponse: 0
  };
  const responseNeededTasks = response?.tasks.filter((task) => task.responseNeeded) || [];
  const localAuthBypass = Boolean(response?.localAuthBypass);

  return (
    <section className="tasks-page-panel">
      <div className="tasks-page-header">
        <div>
          <p className="eyebrow">Firstmate operations</p>
          <h1>Tasks</h1>
          <p>Current and completed agent work across local Firstmate task state.</p>
        </div>
        <button className="secondary-button" disabled={isLoading} onClick={() => void loadTasks()} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {notice ? <p className="tasks-notice-message">{notice}</p> : null}
      {error ? <p className="error-message">{error}</p> : null}

      <div className="tasks-stats">
        <article>
          <span>Active agents</span>
          <strong>{response?.activeAgentCount ?? 0}</strong>
        </article>
        <article>
          <span>Total tasks</span>
          <strong>{response?.totalTaskCount ?? 0}</strong>
        </article>
        <article>
          <span>Blocked</span>
          <strong>{counts.blocked}</strong>
        </article>
        <article className={counts.needsResponse ? "tasks-needs-response-stat" : undefined}>
          <span>Needs response</span>
          <strong>{counts.needsResponse}</strong>
        </article>
        <article>
          <span>Completed</span>
          <strong>{counts.completed}</strong>
        </article>
      </div>

      {isLoading && !response ? (
        <section className="tasks-empty-state">
          <RetroFiLogoLoader label="Loading Firstmate tasks..." size="lg" tone="card" />
        </section>
      ) : null}

      {response && !response.enabled ? (
        <section className="tasks-empty-state">
          <strong>Firstmate tasks disabled</strong>
          <p>{response.reason || "Firstmate task data is not enabled in this environment."}</p>
        </section>
      ) : null}

      {response?.enabled ? (
        <div className="tasks-section-stack">
          {responseNeededTasks.length ? (
            <FirstmateNeedsResponseSection
              credential={credential}
              localAuthBypass={localAuthBypass}
              onResponded={() => void loadTasks({ preserveNotice: true })}
              onStaleResponse={refreshAfterStaleResponse}
              tasks={responseNeededTasks}
            />
          ) : null}
          {FIRSTMATE_TASK_SECTIONS.map((section) => (
            <FirstmateTaskSection
              count={counts[section.state] || 0}
              key={section.state}
              label={section.label}
              state={section.state}
              tasks={response.tasks.filter((task) => task.state === section.state)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function FirstmateNeedsResponseSection({
  credential,
  localAuthBypass,
  onResponded,
  onStaleResponse,
  tasks
}: {
  credential: AuthCredential | null;
  localAuthBypass: boolean;
  onResponded: () => void;
  onStaleResponse: (serverMessage: string) => Promise<void>;
  tasks: FirstmateTask[];
}) {
  return (
    <section className="tasks-response-section">
      <div className="tasks-section-heading">
        <h2>Needs response</h2>
        <span className="task-state-pill is-needs-response">{tasks.length}</span>
      </div>
      <div className="tasks-response-list">
        {tasks.map((task) => (
          <FirstmateTaskResponseCard
            credential={credential}
            key={task.id}
            localAuthBypass={localAuthBypass}
            onResponded={onResponded}
            onStaleResponse={onStaleResponse}
            task={task}
          />
        ))}
      </div>
    </section>
  );
}

function FirstmateTaskResponseCard({
  credential,
  localAuthBypass,
  onResponded,
  onStaleResponse,
  task
}: {
  credential: AuthCredential | null;
  localAuthBypass: boolean;
  onResponded: () => void;
  onStaleResponse: (serverMessage: string) => Promise<void>;
  task: FirstmateTask;
}) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const trimmedMessage = message.trim();
  const canSubmit = Boolean((credential || localAuthBypass) && task.canRespond && trimmedMessage.length > 0 && trimmedMessage.length <= 4000 && !isSending);

  async function sendResponse() {
    if ((!credential && !localAuthBypass) || !task.canRespond || !trimmedMessage) return;

    setIsSending(true);
    setError(null);
    try {
      await apiPost<FirstmateTaskRespondResponse>(
        `/api/admin/firstmate/tasks/${encodeURIComponent(task.id)}/respond`,
        credential
          ? {
              ...adminAuthBody(credential),
              message: trimmedMessage
            }
          : {
              message: trimmedMessage
            }
      );
      setMessage("");
      onResponded();
    } catch (requestError) {
      const serverMessage = requestError instanceof Error ? requestError.message : "Could not send response.";
      if (/task is not waiting for a captain response/i.test(serverMessage)) {
        setError(`${serverMessage} The agent has already moved on. Refreshing tasks.`);
        await onStaleResponse(serverMessage);
      } else {
        setError(serverMessage);
      }
    } finally {
      setIsSending(false);
    }
  }

  return (
    <article className="tasks-response-card">
      <div className="tasks-response-card-main">
        <div>
          <strong>{task.title}</strong>
          <span>{task.id} / {task.kind} / {task.repo}</span>
        </div>
        <p>{task.recentStatus || "This task is waiting for captain input."}</p>
      </div>
      {task.canRespond ? (
        <div className="tasks-response-form">
          <label>
            <span className="sr-only">Response for {task.id}</span>
            <textarea
              maxLength={4000}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type captain response..."
              rows={2}
              value={message}
            />
          </label>
          <button disabled={!canSubmit} onClick={() => void sendResponse()} type="button">
            {isSending ? "Sending..." : "Respond"}
          </button>
          {error ? <p className="error-message">{error}</p> : null}
        </div>
      ) : (
        <p className="tasks-muted">No live response window is available for this task.</p>
      )}
    </article>
  );
}

function FirstmateTaskSection({
  count,
  label,
  state,
  tasks
}: {
  count: number;
  label: string;
  state: FirstmateTaskState;
  tasks: FirstmateTask[];
}) {
  return (
    <section className="tasks-section">
      <div className="tasks-section-heading">
        <h2>{label}</h2>
        <span className={`task-state-pill is-${state}`}>{count}</span>
      </div>
      <div className="tasks-table-wrap">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Task</th>
              <th>Kind</th>
              <th>Repo / project</th>
              <th>Blocked</th>
              <th>Recent status</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length ? (
              tasks.map((task) => (
                <FirstmateTaskRow
                  key={task.id}
                  task={task}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7}>No {label.toLowerCase()} tasks.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function FirstmateTaskRow({
  task
}: {
  task: FirstmateTask;
}) {
  const showGptProRepairAction = Boolean(task.showGptProRepairAction ?? task.gptProRepairReady);
  const showReportAction = Boolean(
    !showGptProRepairAction && (task.showReportAction ?? Boolean(task.hasReport && task.reportUrl))
  );

  return (
    <tr className={task.responseNeeded ? "is-response-needed" : undefined}>
      <td>
        <span className={`task-status-indicator is-${task.state}`} title={formatFirstmateTaskState(task.state)}>
          {task.state === "completed" ? <CheckIcon /> : <span aria-hidden="true" />}
        </span>
      </td>
      <td>
        <strong>{task.title}</strong>
        <span>{task.id}</span>
      </td>
      <td>{task.kind}</td>
      <td>
        <strong>{task.repo}</strong>
        <span>{task.project || "Project path unavailable"}</span>
      </td>
      <td>{task.blocked ? task.blockedBy.length ? `Yes: ${task.blockedBy.join(", ")}` : "Yes" : "No"}</td>
      <td>
        {task.responseNeeded ? <span className="task-response-needed-badge">Needs response</span> : null}
        {task.recentStatus || "No recent status"}
      </td>
      <td>
        <div className="task-report-actions">
          {showGptProRepairAction ? (
            task.gptProRepairUrl ? (
              <a className="button-link secondary-button" href={task.gptProRepairUrl} rel="noreferrer" target="_blank">
                {task.gptProRepairLabel || "Go To Pro Repair Batch"}
              </a>
            ) : (
              <span className="tasks-muted">{task.gptProRepairUnavailableReason || "GPT Pro repair workspace URL is not configured."}</span>
            )
          ) : (
            <>
              {showReportAction ? (
                <a
                  className={`button-link secondary-button ${task.reportIsFinal ? "" : "is-report-draft"}`.trim()}
                  href={task.reportUrl || ""}
                  rel="noreferrer"
                  target="_blank"
                >
                  {task.reportActionLabel || "View Report"}
                </a>
              ) : (
                <span className="tasks-muted">No report</span>
              )}
            </>
          )}
        </div>
        {showReportAction && task.reportNote && !task.reportIsFinal ? (
          <p className="task-report-note">{task.reportNote}</p>
        ) : null}
      </td>
    </tr>
  );
}

function AdminTaskReportStandalonePage({
  credential,
  onSignOut,
  viewer
}: {
  credential: AuthCredential | null;
  onSignOut: () => void;
  viewer: UserRecord;
}) {
  return (
    <WorkspaceLayout
      activeNavItem={ADMIN_TASKS_TAB}
      navItems={[ADMIN_TASKS_TAB]}
      onSignOut={onSignOut}
      title="Task report"
      user={viewer}
    >
      <FirstmateTaskReportPanel credential={credential} taskId={taskReportIdFromPath()} />
    </WorkspaceLayout>
  );
}

function LocalFirstmateTaskReportStandalonePage() {
  return (
    <main className="tasks-standalone-page">
      <FirstmateTaskReportPanel credential={null} taskId={taskReportIdFromPath()} />
    </main>
  );
}

function FirstmateTaskReportPanel({ credential, taskId }: { credential: AuthCredential | null; taskId: string }) {
  const [report, setReport] = useState<FirstmateTaskReportResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!taskId) {
      setError("Report task id is missing.");
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);
    setError(null);
    apiGet<FirstmateTaskReportResponse>(`/api/admin/firstmate/tasks/${encodeURIComponent(taskId)}/report`, {
      ...(credential ? { headers: adminAuthHeaders(credential) } : {})
    })
      .then((nextReport) => {
        if (!isMounted) return;
        setReport(nextReport);
      })
      .catch((requestError) => {
        if (!isMounted) return;
        setError(firstmateTasksAccessErrorMessage(requestError, "Could not load the Firstmate report."));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [credential, taskId]);

  return (
    <section className="task-report-panel">
      <div className="task-report-header">
        <div>
          <p className="eyebrow">Firstmate report</p>
          <h1>{taskId || "Task report"}</h1>
        </div>
        <a className="button-link secondary-button" href={pathForRoute("tasks")}>
          Back to Tasks
        </a>
      </div>
      {isLoading ? (
        <RetroFiLogoLoader label="Loading report..." size="lg" tone="card" />
      ) : null}
      {error ? <p className="error-message">{error}</p> : null}
      {report?.reportNote && !report.reportIsFinal ? (
        <section className="task-report-status-note">
          <strong>{report.reportStatusLabel}</strong>
          <p>{report.reportNote}</p>
          {report.taskState ? <span>Task state: {formatFirstmateTaskState(report.taskState)}</span> : null}
        </section>
      ) : null}
      {report ? <MarkdownReport markdown={report.markdown} /> : null}
    </section>
  );
}

type MarkdownBlock =
  | { kind: "heading"; level: number; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "code"; text: string }
  | { kind: "rule" };

function MarkdownReport({ markdown }: { markdown: string }) {
  const blocks = useMemo(() => parseSimpleMarkdown(markdown), [markdown]);

  return (
    <article className="task-report-markdown">
      {blocks.map((block, index) => renderMarkdownBlock(block, index))}
    </article>
  );
}

function parseSimpleMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const paragraphLines: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;
  let codeLines: string[] = [];
  let inCode = false;

  function flushParagraph() {
    if (!paragraphLines.length) return;
    blocks.push({ kind: "paragraph", text: paragraphLines.join(" ").trim() });
    paragraphLines.length = 0;
  }

  function flushList() {
    if (!listItems.length) return;
    blocks.push({ kind: "list", ordered: listOrdered, items: listItems });
    listItems = [];
    listOrdered = false;
  }

  for (const line of markdown.split(/\r?\n/)) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        blocks.push({ kind: "code", text: codeLines.join("\n") });
        codeLines = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "heading", level: heading[1].length, text: heading[2].trim() });
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "rule" });
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (bullet || ordered) {
      flushParagraph();
      const nextOrdered = Boolean(ordered);
      if (listItems.length && listOrdered !== nextOrdered) {
        flushList();
      }
      listOrdered = nextOrdered;
      listItems.push((bullet?.[1] || ordered?.[1] || "").trim());
      continue;
    }

    flushList();
    paragraphLines.push(trimmed);
  }

  if (inCode) {
    blocks.push({ kind: "code", text: codeLines.join("\n") });
  }
  flushParagraph();
  flushList();

  return blocks;
}

function renderMarkdownBlock(block: MarkdownBlock, index: number) {
  if (block.kind === "heading") {
    const content = renderMarkdownInline(block.text, `heading-${index}`);
    if (block.level === 1) return <h1 key={index}>{content}</h1>;
    if (block.level === 2) return <h2 key={index}>{content}</h2>;
    if (block.level === 3) return <h3 key={index}>{content}</h3>;
    return <h4 key={index}>{content}</h4>;
  }

  if (block.kind === "paragraph") {
    return <p key={index}>{renderMarkdownInline(block.text, `paragraph-${index}`)}</p>;
  }

  if (block.kind === "list") {
    const ListTag = block.ordered ? "ol" : "ul";
    return (
      <ListTag key={index}>
        {block.items.map((item, itemIndex) => (
          <li key={`${index}-${itemIndex}`}>{renderMarkdownInline(item, `list-${index}-${itemIndex}`)}</li>
        ))}
      </ListTag>
    );
  }

  if (block.kind === "code") {
    return <pre key={index}><code>{block.text}</code></pre>;
  }

  return <hr key={index} />;
}

function renderMarkdownInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const label = match[1] || match[3];
    const href = match[2] || match[3];
    nodes.push(
      <a href={href} key={`${keyPrefix}-${match.index}`} rel="noreferrer" target="_blank">
        {label}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function taskReportIdFromPath(pathname = typeof window === "undefined" ? "" : window.location.pathname) {
  const prefix = "/tasks/reports/";
  if (!pathname.startsWith(prefix)) return "";
  const encoded = pathname.slice(prefix.length).split("/")[0] || "";
  try {
    return decodeURIComponent(encoded);
  } catch {
    return "";
  }
}

function formatFirstmateTaskState(state: FirstmateTaskState) {
  if (state === "active") return "Active";
  if (state === "completed") return "Completed";
  if (state === "blocked") return "Blocked";
  return "Queued";
}

type DashboardPerformanceSummary = {
  testCaseId: string;
  businessName?: string;
  businessType?: string;
  archetype?: string;
  location?: string;
  reportingPeriod?: { label?: string };
  implementedRetrofitCount: number;
  monthlyRecordCount: number;
  incentiveRecordCount: number;
  documentRecordCount: number;
  certificationRecordCount: number;
  certificationRequirementCount: number;
  nextBestActionCount: number;
  dataQuality?: { status?: string; notes?: string[]; warnings?: string[] };
  storageStatus?: string;
  updatedAt?: string | null;
};

type DashboardPerformanceListResponse = {
  summaries: DashboardPerformanceSummary[];
  totals: {
    testCases: number;
    withPostInstallData: number;
    emptyCases: number;
    implementedRetrofits: number;
    monthlyRecords: number;
    incentives: number;
    documents: number;
    certifications: number;
    nextBestActions: number;
  };
  storageStatus?: string;
  warnings?: string[];
};

type DashboardPerformanceDetailResponse = {
  dataset: DashboardPostImplementationDataset;
  summary: DashboardPerformanceSummary;
  storageStatus?: string;
  validation?: { valid?: boolean; errors?: string[]; warnings?: string[] };
};

function AdminDashboardPerformanceDataPanel({ credential }: { credential: AuthCredential | null }) {
  const [response, setResponse] = useState<DashboardPerformanceListResponse | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<DashboardPerformanceDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const summaries = response?.summaries || [];
  const totals =
    response?.totals || {
      testCases: 0,
      withPostInstallData: 0,
      emptyCases: 0,
      implementedRetrofits: 0,
      monthlyRecords: 0,
      incentives: 0,
      documents: 0,
      certifications: 0,
      nextBestActions: 0
    };

  const loadSummaries = useCallback(async () => {
    if (!credential) {
      setError("Sign in again to manage dashboard performance data.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const nextResponse = await apiGet<DashboardPerformanceListResponse>("/api/admin/dashboard-performance/test-cases", {
        headers: adminAuthHeaders(credential)
      });
      setResponse(nextResponse);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load dashboard performance data.");
    } finally {
      setIsLoading(false);
    }
  }, [credential]);

  useEffect(() => {
    void loadSummaries();
  }, [loadSummaries]);

  async function viewDataset(testCaseId: string) {
    if (!credential) {
      setError("Sign in again to inspect dashboard performance data.");
      return;
    }

    setError(null);
    setMessage(null);
    try {
      const detail = await apiGet<DashboardPerformanceDetailResponse>(
        `/api/admin/dashboard-performance/test-cases/${encodeURIComponent(testCaseId)}`,
        { headers: adminAuthHeaders(credential) }
      );
      setSelectedDetail(detail);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load the selected dataset.");
    }
  }

  async function seedOne(testCaseId: string) {
    if (!credential) {
      setError("Sign in again to seed dashboard performance data.");
      return;
    }

    setIsMutating(true);
    setError(null);
    setMessage(null);
    try {
      const detail = await apiPost<DashboardPerformanceDetailResponse>(
        `/api/admin/dashboard-performance/test-cases/${encodeURIComponent(testCaseId)}/seed`,
        adminAuthBody(credential)
      );
      setSelectedDetail(detail);
      setMessage(`Seeded dashboard performance data for ${testCaseId}.`);
      await loadSummaries();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not seed dashboard performance data.");
    } finally {
      setIsMutating(false);
    }
  }

  async function seedAll() {
    if (!credential) {
      setError("Sign in again to seed dashboard performance data.");
      return;
    }

    setIsMutating(true);
    setError(null);
    setMessage(null);
    try {
      const nextResponse = await apiPost<DashboardPerformanceListResponse>(
        "/api/admin/dashboard-performance/seed-all",
        adminAuthBody(credential)
      );
      setResponse(nextResponse);
      setMessage(`Seeded ${nextResponse.totals.withPostInstallData} populated dashboard performance datasets.`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not seed dashboard performance data.");
    } finally {
      setIsMutating(false);
    }
  }

  async function deleteOne(testCaseId: string) {
    if (!credential) {
      setError("Sign in again to delete dashboard performance data.");
      return;
    }
    if (!window.confirm(`Delete synthetic dashboard performance data for ${testCaseId}?`)) return;

    setIsMutating(true);
    setError(null);
    setMessage(null);
    try {
      await apiDelete(`/api/admin/dashboard-performance/test-cases/${encodeURIComponent(testCaseId)}`, {
        headers: adminAuthHeaders(credential)
      });
      if (selectedDetail?.summary.testCaseId === testCaseId) {
        setSelectedDetail(null);
      }
      setMessage(`Deleted synthetic dashboard performance data for ${testCaseId}.`);
      await loadSummaries();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not delete dashboard performance data.");
    } finally {
      setIsMutating(false);
    }
  }

  async function deleteAll() {
    if (!credential) {
      setError("Sign in again to delete dashboard performance data.");
      return;
    }
    if (!window.confirm("Delete all synthetic dashboard performance datasets?")) return;

    setIsMutating(true);
    setError(null);
    setMessage(null);
    try {
      await apiDelete("/api/admin/dashboard-performance", {
        headers: adminAuthHeaders(credential)
      });
      setSelectedDetail(null);
      setMessage("Deleted all synthetic dashboard performance data.");
      await loadSummaries();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not delete dashboard performance data.");
    } finally {
      setIsMutating(false);
    }
  }

  function openDashboardPreview(testCaseId: string) {
    const params = new URLSearchParams({ sampleUserId: testCaseId });
    window.open(`${pathForRoute("user-preview")}?${params.toString()}`, "_blank", "noopener,noreferrer");
  }

  async function validateAllGeneratedData() {
    await loadSummaries();
    setMessage("Validated generated dashboard performance dataset summaries.");
  }

  async function copySelectedDatasetJson() {
    if (!selectedDetail?.dataset || !navigator?.clipboard) return;
    await navigator.clipboard.writeText(JSON.stringify(selectedDetail.dataset, null, 2));
    setMessage("Copied selected dataset JSON.");
  }

  const selectedDataset = selectedDetail?.dataset || null;
  const selectedValidationErrors = selectedDetail?.validation?.errors || [];
  const selectedValidationWarnings = selectedDetail?.validation?.warnings || selectedDataset?.dataQuality?.warnings || [];
  const monthlyCoverage = selectedDataset?.monthlyPerformanceRecords?.length
    ? new Set(
        selectedDataset.monthlyPerformanceRecords
          .map((record) => (isPlainRecord(record) ? String(record.month || "") : ""))
          .filter(Boolean)
      ).size
    : 0;

  return (
    <section className="admin-dashboard-performance">
      <div className="admin-dashboard-performance-header">
        <div>
          <p className="eyebrow">Admin test data</p>
          <h2>Dashboard Performance Test Data</h2>
          <p>Seed and inspect post-implementation performance records used by admin preview dashboards.</p>
        </div>
        <span className="soft-badge">Storage: {response?.storageStatus || "checking"}</span>
      </div>

      {error ? <p className="error-message">{error}</p> : null}
      {message ? <p className="success-message">{message}</p> : null}
      {response?.warnings?.length ? (
        <div className="admin-dashboard-performance-warning">
          {response.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      ) : null}

      <div className="admin-dashboard-performance-stats">
        <article><span>Total test cases</span><strong>{totals.testCases}</strong></article>
        <article><span>With post-install data</span><strong>{totals.withPostInstallData}</strong></article>
        <article><span>Empty/new-user cases</span><strong>{totals.emptyCases}</strong></article>
        <article><span>Implemented retrofits</span><strong>{totals.implementedRetrofits}</strong></article>
        <article><span>Monthly records</span><strong>{totals.monthlyRecords}</strong></article>
        <article><span>Incentives</span><strong>{totals.incentives}</strong></article>
        <article><span>Documents</span><strong>{totals.documents}</strong></article>
        <article><span>Certifications</span><strong>{totals.certifications}</strong></article>
        <article><span>Next actions</span><strong>{totals.nextBestActions}</strong></article>
      </div>

      <div className="admin-dashboard-performance-actions">
        <button className="secondary-button" disabled={isLoading || isMutating} onClick={() => void validateAllGeneratedData()} type="button">
          Validate all generated data
        </button>
        <button className="secondary-button" disabled={isLoading || isMutating} onClick={() => void loadSummaries()} type="button">
          Refresh from backend
        </button>
        <button disabled={isLoading || isMutating} onClick={() => void seedAll()} type="button">
          {isMutating ? "Working..." : "Seed all test cases"}
        </button>
        <button className="secondary-button" disabled={isLoading || isMutating} onClick={() => void seedAll()} type="button">
          Reseed all synthetic data
        </button>
        <button className="danger-button" disabled={isLoading || isMutating} onClick={() => void deleteAll()} type="button">
          Delete all synthetic dashboard data
        </button>
      </div>

      <div className="admin-dashboard-performance-table-wrap">
        <table className="admin-dashboard-performance-table">
          <thead>
            <tr>
              <th>Test case</th>
              <th>Business type / archetype</th>
              <th>Location</th>
              <th>Retrofits</th>
              <th>Monthly</th>
              <th>Incentives</th>
              <th>Documents</th>
              <th>Certifications</th>
              <th>Actions</th>
              <th>Quality</th>
              <th>Updated</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={12}>Loading dashboard performance data...</td></tr>
            ) : summaries.length ? (
              summaries.map((summary) => (
                <tr key={summary.testCaseId}>
                  <td>
                    <strong>{summary.businessName || summary.testCaseId}</strong>
                    <span>{summary.testCaseId}</span>
                  </td>
                  <td>{[summary.businessType, summary.archetype].filter(Boolean).join(" / ") || "Unknown"}</td>
                  <td>{summary.location || "Not provided"}</td>
                  <td>{summary.implementedRetrofitCount}</td>
                  <td>{summary.monthlyRecordCount}</td>
                  <td>{summary.incentiveRecordCount}</td>
                  <td>{summary.documentRecordCount}</td>
                  <td>{summary.certificationRecordCount}</td>
                  <td>{summary.nextBestActionCount}</td>
                  <td><span className={`soft-badge quality-${summary.dataQuality?.status || "empty"}`}>{summary.dataQuality?.status || "empty"}</span></td>
                  <td>{summary.updatedAt ? new Date(summary.updatedAt).toLocaleDateString() : "Not seeded"}</td>
                  <td>
                    <div className="admin-dashboard-performance-row-actions">
                      <button className="secondary-button" onClick={() => void viewDataset(summary.testCaseId)} type="button">View</button>
                      <button className="secondary-button" disabled={isMutating} onClick={() => void seedOne(summary.testCaseId)} type="button">Seed</button>
                      <button className="secondary-button" onClick={() => openDashboardPreview(summary.testCaseId)} type="button">Open dashboard preview</button>
                      <button className="danger-button" disabled={isMutating || summary.implementedRetrofitCount === 0} onClick={() => void deleteOne(summary.testCaseId)} type="button">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={12}>No sample test cases were found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedDetail && selectedDataset ? (
        <aside className="admin-dashboard-performance-detail">
          <div className="admin-dashboard-performance-detail-header">
            <div>
              <p className="eyebrow">Dataset detail</p>
              <h3>{selectedDetail.summary.businessName || selectedDetail.summary.testCaseId}</h3>
              <p>{selectedDataset.reportingPeriod?.label || "Reporting period unavailable"}</p>
            </div>
            <button className="secondary-button" onClick={() => setSelectedDetail(null)} type="button">Close</button>
          </div>

          <div className="admin-dashboard-performance-detail-grid">
            <article>
              <span>Implemented retrofits</span>
              <strong>{selectedDataset.implementedRetrofits?.length || 0}</strong>
            </article>
            <article>
              <span>Monthly coverage</span>
              <strong>{monthlyCoverage} months</strong>
            </article>
            <article>
              <span>Documents</span>
              <strong>{selectedDataset.documentRecords?.length || 0}</strong>
            </article>
            <article>
              <span>Next actions</span>
              <strong>{selectedDataset.nextBestActions?.length || 0}</strong>
            </article>
          </div>

          <div className="admin-dashboard-performance-detail-section">
            <h4>Implemented retrofits</h4>
            <div className="admin-dashboard-performance-mini-table-wrap">
              <table className="admin-dashboard-performance-mini-table">
                <thead><tr><th>Name</th><th>Status</th><th>Actual cost</th><th>Annual savings</th><th>Payback</th></tr></thead>
                <tbody>
                  {(selectedDataset.implementedRetrofits || []).slice(0, 8).map((record) => {
                    const retrofit = isPlainRecord(record) ? record : {};
                    return (
                      <tr key={String(retrofit.id || retrofit.retrofitId)}>
                        <td>{String(retrofit.name || retrofit.retrofitId || "Retrofit")}</td>
                        <td>{String(retrofit.status || "unknown")}</td>
                        <td>{formatDashboardCurrencyCents(Number(retrofit.actualProjectCostCents) || null)}</td>
                        <td>{formatDashboardCurrencyCents(Number(retrofit.actualAnnualSavingsCents) || null)}</td>
                        <td>{typeof retrofit.actualPaybackYears === "number" ? `${retrofit.actualPaybackYears.toFixed(1)} yrs` : "Unavailable"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-dashboard-performance-detail-section">
            <h4>Validation</h4>
            {selectedValidationErrors.length || selectedValidationWarnings.length ? (
              <ul>
                {selectedValidationErrors.map((validationError) => <li key={validationError}>{validationError}</li>)}
                {selectedValidationWarnings.map((warning) => <li key={warning}>{warning}</li>)}
              </ul>
            ) : (
              <p>No validation warnings for this dataset.</p>
            )}
          </div>

          <div className="admin-dashboard-performance-detail-section">
            <div className="admin-dashboard-performance-section-heading">
              <h4>Raw JSON preview</h4>
              <button className="secondary-button" onClick={() => void copySelectedDatasetJson()} type="button">Copy JSON</button>
            </div>
            <pre className="admin-dashboard-performance-json">{JSON.stringify(selectedDataset, null, 2)}</pre>
          </div>
        </aside>
      ) : null}
    </section>
  );
}

type UserPreviewOption = {
  userId: string;
  sampleUserId?: string | null;
  clientName: string;
  companyName: string | null;
  email: string;
  hasIntake: boolean;
};

function AdminUserPreviewStandalonePage({
  credential,
  initialRows,
  onSignOut,
  viewer
}: {
  credential: AuthCredential | null;
  initialRows: AdminRow[];
  onSignOut: () => void;
  viewer: UserRecord;
}) {
  const [previewOptions, setPreviewOptions] = useState(() => buildUserPreviewOptions(initialRows));
  const [payloadCache, setPayloadCache] = useState<Record<string, PortalRetrofitRecommendationsResponse>>({});
  const [adminControlsOpen, setAdminControlsOpen] = useState(false);
  const [customerPreviewMode, setCustomerPreviewMode] = useState(false);
  const [hideBillData, setHideBillData] = useState(false);
  const [hideFormDetails, setHideFormDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("userId") || "";
  });
  const requestedSampleUserId =
    typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("sampleUserId") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectedOption =
    previewOptions.find((option) => option.userId === selectedUserId) ||
    previewOptions.find((option) => option.sampleUserId === requestedSampleUserId) ||
    previewOptions.find((option) => option.hasIntake) ||
    previewOptions[0] ||
    null;
  const selectedPayload = selectedOption ? payloadCache[selectedOption.userId] || null : null;

  const cacheSelectedPayload = useCallback((payload: PortalRetrofitRecommendationsResponse) => {
    setPayloadCache((currentCache) => ({
      ...currentCache,
      [payload.user.userId]: payload
    }));
  }, []);

  useEffect(() => {
    if (!selectedOption || selectedUserId === selectedOption.userId) return;
    setSelectedUserId(selectedOption.userId);
  }, [selectedOption, selectedUserId]);

  useEffect(() => {
    let isActive = true;

    async function loadPreviewOptions() {
      if (!credential) {
        setError("Sign in again to load user previews.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await apiGet<AdminUserPreviewOptionsResponse>("/api/admin/fake-client-options", {
          headers: adminAuthHeaders(credential)
        });
        if (isActive) {
          setPreviewOptions(response.options);
          queueAdminRecommendationPrecompute(credential, response.options);
        }
      } catch (requestError) {
        if (isActive) {
          setError(requestError instanceof Error ? requestError.message : "Could not load user previews.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadPreviewOptions();

    return () => {
      isActive = false;
    };
  }, [credential]);

  useEffect(() => {
    if (!selectedOption || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("userId", selectedOption.userId);
    if (selectedOption.sampleUserId) {
      params.set("sampleUserId", selectedOption.sampleUserId);
    } else {
      params.delete("sampleUserId");
    }
    params.set("clientName", selectedOption.clientName);
    params.set("email", selectedOption.email);
    if (selectedOption.companyName) {
      params.set("companyName", selectedOption.companyName);
    } else {
      params.delete("companyName");
    }
    window.history.replaceState({}, "", `${pathForRoute("user-preview")}?${params.toString()}`);
  }, [selectedOption]);

  async function refreshUsers() {
    if (!credential) {
      setError("Sign in again to refresh user previews.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await apiGet<AdminUserPreviewOptionsResponse>("/api/admin/fake-client-options", {
        headers: adminAuthHeaders(credential)
      });
      setPreviewOptions(response.options);
      queueAdminRecommendationPrecompute(credential, response.options);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not refresh user previews.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectionChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUserId(event.target.value);
  }

  return (
    <main className={`user-preview-standalone-page${customerPreviewMode ? " is-customer-preview" : ""}`}>
      <header className={`user-preview-toolbar user-preview-toolbar-collapsed${customerPreviewMode ? " is-customer-preview" : ""}`}>
        {customerPreviewMode ? (
          <div className="customer-preview-strip">
            <div>
              <strong>Customer preview</strong>
              <span>{selectedOption ? selectedOption.clientName : "No test profile selected"}</span>
            </div>
            <button className="secondary-button" onClick={() => setCustomerPreviewMode(false)} type="button">
              Exit customer preview
            </button>
          </div>
        ) : (
          <>
            <div className="user-preview-admin-row">
              <div className="brand-block user-preview-admin-summary">
                <img alt="RetroFi" className="workspace-logo" src="/retrofi-logo.png" />
                <div className="user-preview-admin-title">
                  <span>Admin preview</span>
                  <small>
                    {selectedOption ? `${selectedOption.clientName}${selectedOption.companyName ? ` · ${selectedOption.companyName}` : ""}` : "No test profile selected"}
                  </small>
                </div>
              </div>
              <div className="user-preview-toolbar-buttons">
                <button
                  className="secondary-button user-preview-customer-mode-button"
                  onClick={() => {
                    setCustomerPreviewMode(true);
                    setAdminControlsOpen(false);
                  }}
                  type="button"
                >
                  Preview as customer
                </button>
                <button
                  aria-pressed={hideBillData}
                  className={`secondary-button user-preview-bill-toggle${hideBillData ? " is-active" : ""}`}
                  onClick={() => setHideBillData((current) => !current)}
                  type="button"
                >
                  {hideBillData ? "Show bill data" : "Hide bill data"}
                </button>
                <button
                  aria-pressed={hideFormDetails}
                  className={`secondary-button user-preview-form-toggle${hideFormDetails ? " is-active" : ""}`}
                  onClick={() => setHideFormDetails((current) => !current)}
                  type="button"
                >
                  {hideFormDetails ? "Show form details" : "Hide form details"}
                </button>
                <button
                  aria-expanded={adminControlsOpen}
                  className="secondary-button user-preview-admin-controls-button"
                  onClick={() => setAdminControlsOpen((current) => !current)}
                  type="button"
                >
                  Admin controls
                  <span aria-hidden="true">{adminControlsOpen ? "v" : ">"}</span>
                </button>
                {hideBillData ? <span className="soft-badge user-preview-admin-badge">Bill data hidden</span> : null}
                {hideFormDetails ? <span className="soft-badge user-preview-admin-badge">Form details hidden</span> : null}
              </div>
            </div>
            {adminControlsOpen ? (
          <div className="user-preview-actions user-preview-admin-panel">
            <label>
              <span>Preview test case</span>
              <select disabled={previewOptions.length === 0} onChange={handleSelectionChange} value={selectedOption?.userId || ""}>
                {previewOptions.length === 0 ? (
                  <option value="">{isLoading ? "Loading fake test users..." : "No fake test users available"}</option>
                ) : (
                  previewOptions.map((option) => (
                    <option key={option.userId} value={option.userId}>
                      {[option.clientName, option.companyName, option.email].filter(Boolean).join(" · ")}
                    </option>
                  ))
                )}
              </select>
            </label>
            <button className="secondary-button" disabled={isLoading} onClick={() => void refreshUsers()} type="button">
              {isLoading ? "Refreshing..." : "Refresh users"}
            </button>
            <button className="secondary-button" onClick={onSignOut} type="button">
              Sign out
            </button>
          </div>
            ) : null}
          </>
        )}
      </header>

      {error ? <p className="error-message">{error}</p> : null}

      {selectedOption ? (
          <CustomerRetrofitEstimatesPanel
            credential={credential}
            emptyMessage="This client does not have any eligible retrofit matches yet."
            endpoint={`/api/admin/client-retrofit-recommendations/${encodeURIComponent(selectedOption.userId)}`}
            eyebrow="Admin user preview"
            initialPayload={selectedPayload}
            intro={`Customer-facing preview for ${selectedOption.clientName}, powered by live profile and opportunity data.`}
            key={selectedOption.userId}
            loadingMessage="Loading live retrofit recommendations for this client..."
            onPayloadLoaded={cacheSelectedPayload}
            summaryEndpoint={`/api/admin/client-retrofit-preview/${encodeURIComponent(selectedOption.userId)}`}
            hideBillData={hideBillData}
            hideFormDetails={hideFormDetails}
            enableSeededFormDetails={true}
            title="Retrofit Recommendations"
          />
      ) : (
        <section className="retrofit-preview-page">
          <article className="retrofit-preview-card">
            {isLoading ? (
              <RetroFiLogoLoader label="Loading preview cases..." size="lg" tone="card" />
            ) : (
              <>
                <h2>No fake test users available</h2>
                <p>The 50 promoted test-case users will appear in the dropdown after the admin user list loads.</p>
              </>
            )}
          </article>
        </section>
      )}
      <span className="sr-only">Signed in as {viewer.email}</span>
    </main>
  );
}

function buildUserPreviewOptions(rows: AdminRow[]): UserPreviewOption[] {
  return rows
    .filter((row) => row.user.role === "client" && row.user.isFakeUser)
    .map((row) => ({
      userId: row.user.userId,
      sampleUserId: row.user.sampleUserId || null,
      clientName: row.user.fullName || row.intake?.contact.fullName || row.user.email,
      companyName: row.user.companyName || row.intake?.business.companyName || null,
      email: row.user.email,
      hasIntake: Boolean(row.intake)
    }))
    .sort((left, right) => Number(right.hasIntake) - Number(left.hasIntake) || left.clientName.localeCompare(right.clientName));
}

function queueAdminRecommendationPrecompute(credential: AuthCredential | null, options: UserPreviewOption[]) {
  if (!credential || !options.length) return;
  void apiPost<{ queuedUserCount: number }>("/api/admin/client-retrofit-recommendations/precompute", {
    ...adminAuthBody(credential),
    userIds: options.map((option) => option.userId)
  }).catch(() => {
    // Background warming should never block the admin preview.
  });
}

function AdminTestCasesPanel() {
  const [dataset, setDataset] = useState<SampleMatchingTestCasesData | null>(null);
  const [selectedTestCaseId, setSelectedTestCaseId] = useState("");
  const [selectedRetrofitTypeId, setSelectedRetrofitTypeId] = useState("");
  const [selectedOpportunityResult, setSelectedOpportunityResult] = useState<SampleMatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const testCases = dataset?.testCases || [];
  const selectedTestCase = testCases.find((testCase) => testCase.sampleUserId === selectedTestCaseId) || testCases[0];
  const retrofitGroups = selectedTestCase?.retrofits || [];
  const normalRetrofitGroups = retrofitGroups.filter((retrofit) => !isSpecialPlanningRetrofit(retrofit));
  const specialRetrofitGroups = retrofitGroups.filter(isSpecialPlanningRetrofit);
  const selectedRetrofit =
    normalRetrofitGroups.find((retrofit) => retrofit.retrofitTypeId === selectedRetrofitTypeId) ||
    normalRetrofitGroups[0] ||
    null;

  useEffect(() => {
    let isActive = true;

    async function loadTestCases() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(ADMIN_TEST_CASES_DATA_PATH, { cache: "no-cache" });
        if (!response.ok) {
          throw new Error(`Could not load test cases (${response.status}).`);
        }
        const nextDataset = (await response.json()) as SampleMatchingTestCasesData;
        if (isActive) {
          setDataset(nextDataset);
          setSelectedTestCaseId((currentId) =>
            nextDataset.testCases.some((testCase) => testCase.sampleUserId === currentId)
              ? currentId
              : nextDataset.testCases[0]?.sampleUserId || ""
          );
        }
      } catch (requestError) {
        if (isActive) {
          setError(requestError instanceof Error ? requestError.message : "Could not load test cases.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadTestCases();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedTestCase) return;
    const retrofits = (selectedTestCase.retrofits || []).filter((retrofit) => !isSpecialPlanningRetrofit(retrofit));
    if (retrofits.length === 0) {
      setSelectedRetrofitTypeId("");
      return;
    }
    if (!retrofits.some((retrofit) => retrofit.retrofitTypeId === selectedRetrofitTypeId)) {
      setSelectedRetrofitTypeId(retrofits[0].retrofitTypeId);
    }
  }, [selectedTestCase, selectedRetrofitTypeId]);

  useEffect(() => {
    if (!selectedOpportunityResult) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedOpportunityResult(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedOpportunityResult]);

  function selectTestCase(nextTestCaseId: string) {
    setSelectedTestCaseId(nextTestCaseId);
    setSelectedOpportunityResult(null);
  }

  function selectRetrofit(nextRetrofitTypeId: string) {
    setSelectedRetrofitTypeId(nextRetrofitTypeId);
    setSelectedOpportunityResult(null);
  }

  if (isLoading) {
    return (
      <section className="admin-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Matching test cases</p>
            <h2>Loading sample profile results</h2>
          </div>
        </div>
        <RetroFiLogoLoader label="Loading generated matching results..." size="lg" tone="card" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Matching test cases</p>
            <h2>Test cases unavailable</h2>
          </div>
        </div>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  if (!selectedTestCase) {
    return (
      <section className="admin-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Matching test cases</p>
            <h2>No generated test cases</h2>
          </div>
        </div>
        <p className="muted-message">Run the sample matching script to generate admin-visible test case results.</p>
      </section>
    );
  }

  const sourceForm = selectedTestCase.sourceForm;
  const profileStatusRows = [
    { label: "Eligible", count: selectedTestCase.statusCounts.eligible || 0 },
    { label: "Ineligible", count: selectedTestCase.statusCounts.ineligible || 0 }
  ];

  return (
    <section className="admin-section">
      <div className="test-case-layout">
        <article className="data-card test-site-profile-card">
          <div className="test-site-profile-header">
            <div>
              <p className="eyebrow">Test site profile</p>
            </div>
            <label className="field test-case-profile-select">
              <span>Test case</span>
              <select onChange={(event) => selectTestCase(event.target.value)} value={selectedTestCase.sampleUserId}>
                {testCases.map((testCase) => (
                  <option key={testCase.sampleUserId} value={testCase.sampleUserId}>
                    {sampleValue(testCase.sourceForm?.companyName, testCase.sampleUserId)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="test-site-profile-metrics" aria-label="Opportunity matching status counts">
            {profileStatusRows.map(({ label, count }) => (
              <div className="test-site-profile-metric" key={label}>
                <span>{label}</span>
                <strong>{count.toLocaleString()}</strong>
              </div>
            ))}
          </div>
          <div className="opportunity-summary-grid test-case-profile-grid">
            <DetailItem label="Organization" value={sampleValue(sourceForm.organizationType)} />
            <DetailItem label="Size" value={sampleValue(sourceForm.organizationSize)} />
            <DetailItem label="Site" value={sampleValue(sourceForm.siteAddress)} />
            <DetailItem label="Utility" value={sampleValue(sourceForm.electricUtilityProvider)} />
            <DetailItem label="Gas utility" value={sampleValue(sourceForm.gasUtilityProvider)} />
            <DetailItem label="Ownership" value={sampleValue(sourceForm.ownershipStatus)} />
            <DetailItem label="Building" value={sampleValue(sourceForm.buildingType)} />
            <DetailItem label="Square feet" value={sampleValue(sourceForm.squareFootage)} />
          </div>
        </article>

        <div className="test-case-results">
          <TestCaseRelationshipGraph
            onSelectOpportunity={setSelectedOpportunityResult}
            onSelectRetrofit={selectRetrofit}
            retrofits={normalRetrofitGroups}
            selectedRetrofitTypeId={selectedRetrofit?.retrofitTypeId || ""}
          />

          <SavingsPreviewCard preview={selectedRetrofit?.savingsPreview || null} />
          <SpecialPlanningRetrofitsPanel onSelectOpportunity={setSelectedOpportunityResult} retrofits={specialRetrofitGroups} />
        </div>
      </div>
      {selectedOpportunityResult ? (
        <SampleOpportunityModal onClose={() => setSelectedOpportunityResult(null)} result={selectedOpportunityResult} />
      ) : null}
    </section>
  );
}

function isSpecialPlanningRetrofit(retrofit: Pick<SampleRetrofitGroup, "retrofitTypeId">) {
  return SPECIAL_PLANNING_RETROFIT_IDS.has(retrofit.retrofitTypeId);
}

function SpecialPlanningRetrofitsPanel({
  onSelectOpportunity,
  retrofits
}: {
  onSelectOpportunity: (opportunity: SampleMatchResult) => void;
  retrofits: SampleRetrofitGroup[];
}) {
  if (retrofits.length === 0) return null;

  return (
    <article className="data-card special-retrofit-card">
      <div>
        <p className="eyebrow">Planning, certification, and compliance</p>
        <h3>{retrofits.length.toLocaleString()} service categories</h3>
        <p className="muted-message">
          These are shown separately because they do not directly create utility-bill savings.
        </p>
      </div>

      <div className="special-retrofit-grid">
        {retrofits.map((retrofit) => (
          <section className="special-retrofit-item" key={retrofit.retrofitTypeId}>
            <div>
              <h4>{customerRetrofitUiName(retrofit)}</h4>
              <p>{planningRetrofitExplanation(retrofit.retrofitTypeId)}</p>
            </div>
            <strong>{retrofit.opportunityCount.toLocaleString()} opportunities</strong>
            {retrofit.opportunities.length > 0 ? (
              <button
                className="secondary-button"
                onClick={() => onSelectOpportunity(retrofit.opportunities[0])}
                type="button"
              >
                View top opportunity
              </button>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}

function planningRetrofitExplanation(retrofitTypeId: string) {
  if (retrofitTypeId === "energy_audit") {
    return "Audit funding or audit requirements; modeled as service cost support only when the program pays for the audit.";
  }
  if (retrofitTypeId === "leed_certification") {
    return "Certification, permit, tax, or green-building benefits; not a standalone utility savings measure.";
  }
  if (retrofitTypeId === "engineering_feasibility_study") {
    return "Predevelopment engineering support before an implementation project is selected.";
  }
  if (retrofitTypeId === "building_benchmarking_compliance") {
    return "Measurement, reporting, or compliance support used to establish or verify performance.";
  }
  return "Planning or compliance support.";
}

function SavingsPreviewCard({ preview }: { preview: SampleSavingsPreview | null }) {
  if (!preview) {
    return (
      <article className="data-card savings-preview-card">
        <div>
          <p className="eyebrow">Savings estimate</p>
          <h3>No retrofit selected</h3>
        </div>
        <p className="empty-state">Select a retrofit type to inspect savings output.</p>
      </article>
    );
  }

  if (preview.status === "unsupported") {
    return (
      <article className="data-card savings-preview-card">
        <div>
          <p className="eyebrow">Savings estimate</p>
          <h3>{preview.retrofitDisplayName}</h3>
          <p className="muted-message">{preview.unsupportedReason || "No V1 savings model is connected for this retrofit type yet."}</p>
        </div>
      </article>
    );
  }

  const recurringEntries = preview.savingsBreakdown || [];
  const upfrontCostEntries = (preview.costBreakdown || []).filter((entry) => entry.kind === "upfront_cost");
  const upfrontSavingsEntries = (preview.costBreakdown || []).filter((entry) => entry.kind === "upfront_savings");
  const upfrontEquationLines = buildUpfrontEquationLines(upfrontCostEntries, upfrontSavingsEntries);
  const upfrontNetCents = -(preview.upfrontCostAfterSavingsCents ?? 0);
  const recurringEquationLines = buildRecurringEquationLines(recurringEntries);
  const recurringNetCents = preview.netMonthlyRecurringSavingsCents ?? preview.monthlySavingsCents ?? 0;
  const traceSteps = preview.calculationTrace?.steps || [];

  return (
    <article className="data-card savings-preview-card">
      <div>
        <p className="eyebrow">Savings estimate</p>
        <h3>{preview.retrofitDisplayName}</h3>
        <p className="muted-message">
          {preview.modelCoverage === "retrofit_only"
            ? "Admin test-fixture estimate using source-backed incentive rules where matched."
            : "Savings estimate generated from the available test-case data."}
        </p>
      </div>

      <div className="savings-equation-grid">
        <SavingsEquationCard
          title="One-time equation"
          lines={upfrontEquationLines}
          totalAmountCents={upfrontNetCents}
          totalLabel={upfrontNetCents >= 0 ? "One-time gain" : "Upfront cost"}
          emptyMessage="No one-time costs or savings calculated."
        />
        <SavingsEquationCard
          title="Recurring monthly equation"
          lines={recurringEquationLines}
          totalAmountCents={recurringNetCents}
          totalLabel={recurringNetCents >= 0 ? "Net recurring savings" : "Net recurring fee"}
          emptyMessage="No recurring savings or expenses calculated."
          amountSuffix="/month"
        />
      </div>

      {preview.assumptions?.length ? (
        <section className="savings-assumption-list">
          <h4>Assumptions</h4>
          <ul>
            {preview.assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {traceSteps.length > 0 ? (
        <details className="savings-trace">
          <summary>Show calculations</summary>
          <div className="savings-trace-list">
            {traceSteps.map((step) => (
              <section key={step.id || `${step.category}:${step.label}`}>
                <h4>{step.label}</h4>
                <p>{step.formula}</p>
                {step.result ? (
                  <strong>
                    {formatTraceResult(step.result.value, step.result.unit)}
                  </strong>
                ) : null}
              </section>
            ))}
          </div>
        </details>
      ) : null}
    </article>
  );
}

function buildUpfrontEquationLines(
  upfrontCostEntries: SampleSavingsLedgerEntry[],
  upfrontSavingsEntries: SampleSavingsLedgerEntry[]
): SavingsEquationLine[] {
  return [
    ...upfrontCostEntries.map((entry) => ({
      id: entry.id || `cost:${entry.category}:${entry.amountCents}`,
      amountCents: -Math.abs(entry.amountCents || 0),
      label: entry.label || formatSavingsCategory(entry.category)
    })),
    ...upfrontSavingsEntries.map((entry) => ({
      id: entry.id || `savings:${entry.category}:${entry.amountCents}`,
      amountCents: Math.abs(entry.amountCents || 0),
      label: entry.label || formatSavingsCategory(entry.category)
    }))
  ];
}

function recurringEntryMonthlyAmount(entry: SampleRecurringSavingsEntry) {
  const rawAmount =
    entry.period === "monthly"
      ? entry.amountCents
      : Math.round((entry.annualizedAmountCents ?? entry.amountCents ?? 0) / 12);
  const magnitude = Math.abs(rawAmount || 0);
  return entry.kind === "recurring_expense" || entry.amountCents < 0 ? -magnitude : magnitude;
}

function buildRecurringEquationLines(entries: SampleRecurringSavingsEntry[]): SavingsEquationLine[] {
  return entries.map((entry) => ({
    id: entry.id || `recurring:${entry.category}:${entry.period}:${entry.amountCents}`,
    amountCents: recurringEntryMonthlyAmount(entry),
    label: `${entry.label || formatSavingsCategory(entry.category)} / ${entry.period}`
  }));
}

function SavingsEquationCard({
  amountSuffix = "",
  emptyMessage,
  lines,
  title,
  totalAmountCents,
  totalLabel
}: {
  amountSuffix?: string;
  emptyMessage: string;
  lines: SavingsEquationLine[];
  title: string;
  totalAmountCents: number;
  totalLabel: string;
}) {
  return (
    <section className="savings-equation-card">
      <h4>{title}</h4>
      {lines.length > 0 ? (
        <>
          <ul className="savings-equation-list">
            {lines.map((line) => (
              <li key={line.id}>
                <strong className={line.amountCents >= 0 ? "savings-positive" : "savings-negative"}>
                  {formatSignedCents(line.amountCents)}
                  {amountSuffix}
                </strong>
                <span>{line.label}</span>
              </li>
            ))}
          </ul>
          <div className="savings-equation-total">
            <strong className={totalAmountCents >= 0 ? "savings-positive" : "savings-negative"}>
              {formatSignedCents(totalAmountCents)}
              {amountSuffix}
            </strong>
            <span>{totalLabel}</span>
          </div>
        </>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </section>
  );
}

function formatSignedCents(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "Not calculated";
  if (value === 0) return formatCents(0);
  const sign = value > 0 ? "+" : "-";
  return `${sign}${formatCents(Math.abs(value))}`;
}

type RelationshipGraphOpportunity = SampleMatchResult & {
  graphKey: string;
  retrofitCount: number;
};

type RelationshipGraphData = {
  opportunities: RelationshipGraphOpportunity[];
  edges: Array<{
    retrofitTypeId: string;
    opportunityKey: string;
  }>;
  edgeCount: number;
};

function TestCaseRelationshipGraph({
  onSelectOpportunity,
  onSelectRetrofit,
  retrofits,
  selectedRetrofitTypeId
}: {
  onSelectOpportunity: (opportunity: SampleMatchResult) => void;
  onSelectRetrofit: (retrofitTypeId: string) => void;
  retrofits: SampleRetrofitGroup[];
  selectedRetrofitTypeId: string;
}) {
  const graph = useMemo(() => buildRelationshipGraph(retrofits), [retrofits]);
  const activeRetrofitId = selectedRetrofitTypeId || retrofits[0]?.retrofitTypeId || "";
  const activeRetrofit = retrofits.find((retrofit) => retrofit.retrofitTypeId === activeRetrofitId) || null;
  const selectedOpportunityKeys = new Set(
    graph.edges.filter((edge) => edge.retrofitTypeId === activeRetrofitId).map((edge) => edge.opportunityKey)
  );
  const bestScenarioOpportunityIds = bestScenarioOpportunityIdsForRetrofit(activeRetrofit);
  const graphWidth = 920;
  const leftX = 24;
  const leftWidth = 286;
  const rightX = 560;
  const rightWidth = 336;
  const topOffset = 50;
  const rowHeight = 42;
  const rectHeight = 30;
  const graphHeight = Math.max(260, topOffset + Math.max(retrofits.length, graph.opportunities.length) * rowHeight + 32);
  const retrofitYById = new Map(retrofits.map((retrofit, index) => [retrofit.retrofitTypeId, topOffset + index * rowHeight]));
  const opportunityYByKey = new Map(graph.opportunities.map((opportunity, index) => [opportunity.graphKey, topOffset + index * rowHeight]));

  return (
    <article className="data-card relationship-graph-card">
      <div>
        <p className="eyebrow">Retrofit and opportunity map</p>
        <h3>
          {retrofits.length.toLocaleString()} retrofits, {graph.opportunities.length.toLocaleString()} opportunities
        </h3>
        <p className="muted-message">{graph.edgeCount.toLocaleString()} retrofit-opportunity connections.</p>
      </div>

      {retrofits.length === 0 || graph.opportunities.length === 0 ? (
        <p className="empty-state">No relationship graph is available for this test case.</p>
      ) : (
        <div className="relationship-graph-shell">
          <svg
            aria-label="Retrofit types connected to matching opportunities"
            className="relationship-graph"
            role="img"
            style={{ height: graphHeight }}
            viewBox={`0 0 ${graphWidth} ${graphHeight}`}
          >
            <text className="relationship-graph-column-label" x={leftX} y="24">
              Retrofit types
            </text>
            <text className="relationship-graph-column-label" textAnchor="end" x={leftX + leftWidth} y="24">
              Connections
            </text>
            <text className="relationship-graph-column-label" x={rightX} y="24">
              Opportunities
            </text>
            <text className="relationship-graph-column-label" textAnchor="end" x={rightX + rightWidth} y="24">
              Retrofits
            </text>

            <g className="relationship-edges">
              {graph.edges.map((edge) => {
                const retrofitY = retrofitYById.get(edge.retrofitTypeId);
                const opportunityY = opportunityYByKey.get(edge.opportunityKey);
                if (retrofitY === undefined || opportunityY === undefined) return null;
                const isActive = edge.retrofitTypeId === activeRetrofitId;
                const opportunity = graph.opportunities.find((item) => item.graphKey === edge.opportunityKey);
                const scenarioClass =
                  isActive && opportunity ? relationshipOpportunityScenarioClass(opportunity, bestScenarioOpportunityIds) : "";
                return (
                  <line
                    className={`relationship-edge${isActive ? " is-active" : ""}${scenarioClass ? ` ${scenarioClass}` : ""}`}
                    key={`${edge.retrofitTypeId}:${edge.opportunityKey}`}
                    x1={leftX + leftWidth}
                    x2={rightX}
                    y1={retrofitY + rectHeight / 2}
                    y2={opportunityY + rectHeight / 2}
                  />
                );
              })}
            </g>

            <g className="relationship-retrofits">
              {retrofits.map((retrofit, index) => {
                const y = topOffset + index * rowHeight;
                const isActive = retrofit.retrofitTypeId === activeRetrofitId;
                return (
                  <g
                    className={`relationship-node relationship-retrofit-node${isActive ? " is-active" : ""}`}
                    key={retrofit.retrofitTypeId}
                    onClick={() => onSelectRetrofit(retrofit.retrofitTypeId)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelectRetrofit(retrofit.retrofitTypeId);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <title>
                      {retrofit.displayName}: {retrofit.opportunityCount.toLocaleString()} opportunities
                    </title>
                    <rect height={rectHeight} rx="6" width={leftWidth} x={leftX} y={y} />
                    <text x={leftX + 12} y={y + 19}>
                      {truncateGraphLabel(retrofit.displayName, 30)}
                    </text>
                    <text className="relationship-node-count" textAnchor="end" x={leftX + leftWidth - 12} y={y + 19}>
                      {retrofit.opportunityCount.toLocaleString()}
                    </text>
                  </g>
                );
              })}
            </g>

            <g className="relationship-opportunities">
              {graph.opportunities.map((opportunity, index) => {
                const y = topOffset + index * rowHeight;
                const isConnected = selectedOpportunityKeys.has(opportunity.graphKey);
                const scenarioClass = isConnected ? relationshipOpportunityScenarioClass(opportunity, bestScenarioOpportunityIds) : "";
                return (
                  <g
                    className={`relationship-node relationship-opportunity-node${isConnected ? " is-connected" : ""}${
                      scenarioClass ? ` ${scenarioClass}` : ""
                    }`}
                    key={opportunity.graphKey}
                    onClick={() => onSelectOpportunity(opportunity)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelectOpportunity(opportunity);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <title>
                      {relationshipOpportunityTitle(opportunity, isConnected, bestScenarioOpportunityIds)}
                    </title>
                    <rect height={rectHeight} rx="6" width={rightWidth} x={rightX} y={y} />
                    <text x={rightX + 12} y={y + 19}>
                      {truncateGraphLabel(opportunity.opportunityName, 38)}
                    </text>
                    <text className="relationship-node-count" textAnchor="end" x={rightX + rightWidth - 12} y={y + 19}>
                      {opportunity.retrofitCount.toLocaleString()}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      )}
    </article>
  );
}

function bestScenarioOpportunityIdsForRetrofit(retrofit: SampleRetrofitGroup | null): Set<string> | null {
  const opportunityIds = retrofit?.savingsPreview?.selectedIncentiveScenario?.opportunityIds;
  if (!Array.isArray(opportunityIds) || opportunityIds.length === 0) return null;
  return new Set(opportunityIds.filter((opportunityId) => typeof opportunityId === "string" && opportunityId.length > 0));
}

function relationshipOpportunityScenarioClass(
  opportunity: RelationshipGraphOpportunity,
  bestScenarioOpportunityIds: Set<string> | null
) {
  if (!bestScenarioOpportunityIds) return "is-compatible";
  return bestScenarioOpportunityIds.has(opportunity.opportunityId) ? "is-compatible" : "is-excluded";
}

function relationshipOpportunityTitle(
  opportunity: RelationshipGraphOpportunity,
  isConnectedToSelectedRetrofit: boolean,
  bestScenarioOpportunityIds: Set<string> | null
) {
  const baseTitle = `${opportunity.opportunityName}: connected to ${opportunity.retrofitCount.toLocaleString()} retrofit types`;
  if (!isConnectedToSelectedRetrofit) return baseTitle;
  if (!bestScenarioOpportunityIds) {
    return `${baseTitle}. Connected to the selected retrofit; no conflicting incentive scenario is modeled for this retrofit yet.`;
  }
  if (bestScenarioOpportunityIds.has(opportunity.opportunityId)) {
    return `${baseTitle}. Included in the selected best-case incentive scenario.`;
  }
  return `${baseTitle}. Not included in the selected best-case incentive scenario.`;
}

function buildRelationshipGraph(retrofits: SampleRetrofitGroup[]): RelationshipGraphData {
  const opportunityMap = new Map<string, RelationshipGraphOpportunity>();
  const retrofitCountByOpportunity = new Map<string, number>();
  const edgeKeys = new Set<string>();
  const edges: RelationshipGraphData["edges"] = [];

  for (const retrofit of retrofits) {
    const seenInRetrofit = new Set<string>();
    for (const opportunity of retrofit.opportunities) {
      const opportunityKey = sampleOpportunityKey(opportunity);
      if (seenInRetrofit.has(opportunityKey)) continue;
      seenInRetrofit.add(opportunityKey);

      if (!opportunityMap.has(opportunityKey)) {
        opportunityMap.set(opportunityKey, {
          ...opportunity,
          graphKey: opportunityKey,
          retrofitCount: 0
        });
      }

      const edgeKey = `${retrofit.retrofitTypeId}:${opportunityKey}`;
      if (edgeKeys.has(edgeKey)) continue;
      edgeKeys.add(edgeKey);
      edges.push({ retrofitTypeId: retrofit.retrofitTypeId, opportunityKey });
      retrofitCountByOpportunity.set(opportunityKey, (retrofitCountByOpportunity.get(opportunityKey) || 0) + 1);
    }
  }

  const opportunities = [...opportunityMap.values()]
    .map((opportunity) => ({
      ...opportunity,
      retrofitCount: retrofitCountByOpportunity.get(opportunity.graphKey) || 0
    }))
    .sort(compareRelationshipOpportunities);

  return {
    opportunities,
    edges,
    edgeCount: edges.length
  };
}

function compareRelationshipOpportunities(a: RelationshipGraphOpportunity, b: RelationshipGraphOpportunity) {
  return (
    sampleStatusRank(a.eligibilityStatus) - sampleStatusRank(b.eligibilityStatus) ||
    b.rankScore - a.rankScore ||
    b.retrofitCount - a.retrofitCount ||
    a.opportunityName.localeCompare(b.opportunityName)
  );
}

function sampleOpportunityKey(result: SampleMatchResult) {
  return `${result.opportunityId}:${result.offerId || "opportunity"}`;
}

function sampleStatusRank(status: string) {
  const index = SAMPLE_MATCH_STATUS_ORDER.indexOf(status);
  return index === -1 ? SAMPLE_MATCH_STATUS_ORDER.length : index;
}

function truncateGraphLabel(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, Math.max(0, maxLength - 3))}...` : value;
}

function SampleOpportunityModal({
  onClose,
  result
}: {
  onClose: () => void;
  result: SampleMatchResult;
}) {
  return (
    <div className="modal-backdrop opportunity-modal-backdrop" onClick={onClose}>
      <div
        aria-label={`Opportunity details for ${result.opportunityName}`}
        aria-modal="true"
        className="opportunity-match-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Close opportunity details" className="modal-close-button" onClick={onClose} type="button">
          Close
        </button>
        <SampleMatchCard result={result} />
      </div>
    </div>
  );
}

function SampleMatchCard({ result }: { result: SampleMatchResult }) {
  const sourceSummary = result.sourceSummary || {};
  const sourceLinkLabel = sourceSummary.sourceName === "DSIRE" ? "DSIRE source" : "Source page";
  const retrofitLabels = (result.retrofitTypes || []).map((retrofit) => retrofit.displayName).slice(0, 5);
  const nextQuestion = result.nextQuestion?.prompt
    ? [`${result.nextQuestion.prompt}${result.nextQuestion.criterionId ? ` (${result.nextQuestion.criterionId})` : ""}`]
    : [];

  return (
    <article className="match-result-card">
      <div className="match-result-header">
        <div>
          <p className="eyebrow">{result.opportunityId}</p>
          <h3>{result.opportunityName}</h3>
        </div>
        <div className="status-stack">
          <mark>{sampleStatusLabel(result.eligibilityStatus)}</mark>
          <small>Score {result.rankScore}</small>
        </div>
      </div>

      <div className="opportunity-summary-grid test-case-profile-grid">
        <DetailItem label="Source" value={sampleValue(sourceSummary.sourceName)} />
        <DetailItem label="Program type" value={sampleValue(sourceSummary.programType)} />
        <DetailItem label="State" value={sampleValue(sourceSummary.state)} />
        <DetailItem label="Confidence" value={`${Math.round(result.opportunityDataConfidence * 100)}% data / ${Math.round(result.userProfileCompleteness * 100)}% profile`} />
      </div>

      {retrofitLabels.length > 0 ? (
        <div className="pill-row match-retrofit-list">
          {retrofitLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}

      {result.sourceUrl || result.applicationUrl || (result.websiteUrl && result.websiteUrl !== result.sourceUrl) ? (
        <div className="link-list match-link-list">
          {result.sourceUrl ? (
            <a href={result.sourceUrl} rel="noreferrer" target="_blank">
              {sourceLinkLabel}
            </a>
          ) : null}
          {result.applicationUrl ? (
            <a href={result.applicationUrl} rel="noreferrer" target="_blank">
              Application
            </a>
          ) : null}
          {result.websiteUrl && result.websiteUrl !== result.sourceUrl ? (
            <a href={result.websiteUrl} rel="noreferrer" target="_blank">
              Program website
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="match-detail-grid">
        <SampleTextList title="Matched reasons" values={result.matchedReasons} emptyMessage="No matched reasons generated." />
        <SampleTextList title="Unresolved" values={result.unresolvedRequirements} emptyMessage="No unresolved requirements." />
        <SampleTextList title="Blockers" values={result.blockers} emptyMessage="No hard blockers." />
        <SampleTextList title="Next question" values={nextQuestion} emptyMessage="No follow-up question." />
      </div>
    </article>
  );
}

function SampleTextList({
  emptyMessage,
  title,
  values
}: {
  emptyMessage: string;
  title: string;
  values: string[];
}) {
  return (
    <section className="match-detail-section">
      <h4>{title}</h4>
      {values.length > 0 ? (
        <ul>
          {values.slice(0, 4).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </section>
  );
}

function sampleValue(value: unknown, fallback = "Not listed") {
  if (typeof value === "string") return value.trim() || fallback;
  if (typeof value === "number") return value.toLocaleString();
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return fallback;
}

function sampleList(values: string[] | undefined) {
  return values && values.length > 0 ? values.join(", ") : "Not listed";
}

function sampleSquareFootage(value: unknown) {
  if (isPlainRecord(value)) {
    const parsedValue = sampleValue(value.value);
    const status = sampleValue(value.parsingStatus, "");
    return status ? `${parsedValue} (${status})` : parsedValue;
  }
  return sampleValue(value);
}

function formatCents(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return "Not calculated";
  const amount = value / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(amount);
}

function formatUsdAmount(value: number | null | undefined) {
  return formatCents(value);
}

function formatTraceResult(value: number, unit: string) {
  if (unit.includes("cent")) return formatCents(value);
  return `${Number(value).toLocaleString()} ${unit}`;
}

function formatSavingsCategory(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function sampleStatusLabel(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function AdminUsersPanel({
  isLoading,
  onRefresh,
  rows
}: {
  isLoading: boolean;
  onRefresh: () => void;
  rows: AdminRow[];
}) {
  const realRows = rows.filter(({ user }) => !user.isFakeUser);
  const fakeRows = rows.filter(({ user }) => user.isFakeUser);

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Google-authenticated users</p>
          <h2>Users</h2>
        </div>
        <button className="secondary-button" disabled={isLoading} onClick={onRefresh} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <AdminUsersTable
        emptyMessage={isLoading ? "Loading real users..." : "No real users loaded."}
        emptyNote={isLoading ? "This tab is loading after sign-in." : "Admins and future verified real users will appear here."}
        isLoading={isLoading}
        rows={realRows}
        title="Real users"
      />
      <AdminUsersTable
        emptyMessage={isLoading ? "Loading fake users..." : "No fake users loaded."}
        emptyNote={isLoading ? "This tab is loading after sign-in." : "Seeded/demo users will appear here."}
        isLoading={isLoading}
        rows={fakeRows}
        title="Fake users"
      />
    </section>
  );
}

function AdminUsersTable({
  emptyMessage,
  emptyNote,
  isLoading,
  rows,
  title
}: {
  emptyMessage: string;
  emptyNote: string;
  isLoading: boolean;
  rows: AdminRow[];
  title: string;
}) {
  return (
    <section className="admin-subsection">
      <div className="section-heading compact-heading">
        <div>
          <p className="eyebrow">{title}</p>
          <h3>{rows.length.toLocaleString()} record{rows.length === 1 ? "" : "s"}</h3>
        </div>
      </div>
      <div className="admin-table" role="table" aria-label={title}>
        <div className="admin-row admin-head" role="row">
          <span role="columnheader">Name</span>
          <span role="columnheader">Company</span>
          <span role="columnheader">Site</span>
          <span role="columnheader">Building</span>
          <span role="columnheader">Utility data</span>
          <span role="columnheader">Created</span>
        </div>
        {isLoading && rows.length === 0 ? (
          <div className="admin-row admin-empty-row" role="row">
            <span role="cell">
              <RetroFiSkeleton variant="table" rows={5} label={`Loading ${title}`} />
            </span>
          </div>
        ) : rows.length === 0 ? (
          <div className="admin-row admin-empty-row" role="row">
            <span role="cell">
              <strong>{emptyMessage}</strong>
              <small>{emptyNote}</small>
            </span>
          </div>
        ) : rows.map(({ user, intake }) => (
          <div className="admin-row" role="row" key={user.userId}>
            <span role="cell">
              <strong>{user.fullName}</strong>
              <small>{user.email}</small>
              <small>{intake?.contact.roleTitle || user.role}</small>
            </span>
            <span role="cell">
              <strong>{user.companyName || intake?.business.companyName || "Internal admin"}</strong>
              <small>{intake?.business.organizationType || "No organization type"}</small>
              <small>{user.googleLinked ? "Google linked" : "Google pending"}</small>
            </span>
            <span role="cell">
              {intake?.site?.address || "No site address"}
              <small>
                {[intake?.site?.electricUtilityProvider, intake?.site?.gasUtilityProvider].filter(Boolean).join(" / ") || "No utility provider"}
              </small>
            </span>
            <span role="cell">
              {intake?.site
                ? [intake.site.buildingType, intake.site.ownershipStatus].filter(Boolean).join(" / ") || "No building profile"
                : "No building profile"}
              <small>{[intake?.site?.numberOfUnits ? `${intake.site.numberOfUnits} units` : "", intake?.site?.squareFootage].filter(Boolean).join(" / ") || "No size details"}</small>
            </span>
            <span role="cell">
              {intake?.uploadedUtilityFiles?.length
                ? `${intake.uploadedUtilityFiles.length} file(s), ${intake.utilityExtractedValues.length} extracted field(s)`
                : "No utility data uploaded"}
              <small>
                {intake?.siteEnergyProfile?.latestUtilityProvider
                  ? `${intake.siteEnergyProfile.latestUtilityProvider} · ${(intake.siteEnergyProfile.utilitySummaries || []).map((summary) => formatUtilityCategory(summary.utilityCategory)).join(", ") || "No categories"} · ${intake.siteEnergyProfile.availableFieldIds.length} field types available`
                  : intake?.sustainability.goals || "Conversational intake"}
              </small>
            </span>
            <span role="cell">{formatDate(user.createdAt)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AdminDatabasePanel({ credential }: { credential: AuthCredential | null }) {
  if (!credential) {
    return (
      <section className="admin-section">
        <p className="error-message">Sign in again to view the database.</p>
      </section>
    );
  }

  return <DatabaseBrowser credential={credential} embedded />;
}

function AdminRetrofitDatabasePanel() {
  const [dataset, setDataset] = useState<RetrofitOpportunityIndexData | null>(null);
  const [selectedRetrofitId, setSelectedRetrofitId] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);
    apiGet<RetrofitOpportunityIndexData>(ADMIN_RETROFIT_DATABASE_DATA_PATH)
      .then((payload) => {
        if (!isMounted) return;
        setDataset(payload);
        setSelectedRetrofitId(payload.retrofits[0]?.retrofitTypeId || "");
      })
      .catch((requestError) => {
        if (!isMounted) return;
        setError(requestError instanceof Error ? requestError.message : "Could not load retrofit database.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRetrofits = useMemo(() => {
    const retrofits = dataset?.retrofits || [];
    const normalizedQuery = normalizeDatabaseFilterValue(query);
    if (!normalizedQuery) return retrofits;
    return retrofits.filter((retrofit) => {
      const haystack = normalizeDatabaseFilterValue(
        [
          retrofit.displayName,
          retrofit.retrofitTypeId,
          retrofit.parentCategory,
          ...(retrofit.typicalComponents || []),
          ...(retrofit.relatedSavingsModels || []),
          ...(retrofit.typicalBillTypes || []),
          ...retrofit.opportunities.flatMap((opportunity) => [
            opportunity.opportunityName,
            opportunity.opportunityId,
            opportunity.sourceName,
            opportunity.state,
            opportunity.programType,
            opportunity.administrator
          ])
        ].filter(Boolean).join(" ")
      );
      return haystack.includes(normalizedQuery);
    });
  }, [dataset, query]);

  const selectedRetrofit =
    filteredRetrofits.find((retrofit) => retrofit.retrofitTypeId === selectedRetrofitId) ||
    filteredRetrofits[0] ||
    null;

  useEffect(() => {
    if (filteredRetrofits.length === 0) {
      if (selectedRetrofitId) setSelectedRetrofitId("");
      return;
    }
    if (!filteredRetrofits.some((retrofit) => retrofit.retrofitTypeId === selectedRetrofitId)) {
      setSelectedRetrofitId(filteredRetrofits[0].retrofitTypeId);
    }
  }, [filteredRetrofits, selectedRetrofitId]);

  return (
    <section className="database-shell admin-database-shell">
      <div className="database-toolbar">
        <div>
          <p className="eyebrow">Retrofit database</p>
          <h1>Retrofit opportunity index</h1>
          <p>Browse each retrofit type and the opportunities currently connected to it.</p>
        </div>
        <div className="database-stats">
          <strong>{(dataset?.retrofitCount || filteredRetrofits.length).toLocaleString()}</strong>
          <span>{isLoading ? "loading retrofit types" : "retrofit types"}</span>
        </div>
      </div>

      <div className="database-filters">
        <label className="field database-search">
          <span>Search</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search retrofit, category, or opportunity"
            type="search"
            value={query}
          />
        </label>
      </div>

      {dataset ? (
        <p className="muted-message">
          Generated {formatDate(dataset.generatedAt)} from {dataset.opportunityCount.toLocaleString()} visible opportunities.
        </p>
      ) : null}
      {error ? <p className="error-message">{error}</p> : null}

      <div className="database-layout">
        <section className="database-list-panel" aria-label="Retrofit types">
          <div className="database-list-header">
            <span>{isLoading ? "Loading" : `${filteredRetrofits.length} shown`}</span>
            <span>{dataset?.taxonomyVersion || "Taxonomy"}</span>
          </div>
          <div className="database-list">
            {isLoading && filteredRetrofits.length === 0 ? (
              <RetroFiSkeleton variant="list" rows={5} label="Loading retrofit types" />
            ) : filteredRetrofits.length === 0 ? (
              <p className="empty-state">No retrofit types match the current search.</p>
            ) : null}
            {filteredRetrofits.map((retrofit) => (
              <button
                aria-current={retrofit.retrofitTypeId === selectedRetrofit?.retrofitTypeId ? "true" : undefined}
                className="database-list-item"
                key={retrofit.retrofitTypeId}
                onClick={() => setSelectedRetrofitId(retrofit.retrofitTypeId)}
                type="button"
              >
                <span>
                  <strong>{retrofit.displayName}</strong>
                  <small>{retrofit.parentCategory.replaceAll("_", " ")}</small>
                </span>
                <mark>{retrofit.opportunityCount.toLocaleString()}</mark>
              </button>
            ))}
          </div>
        </section>

        {isLoading && !selectedRetrofit ? (
          <section className="database-detail-panel">
            <RetroFiSkeleton variant="card" label="Loading retrofit database details" />
          </section>
        ) : (
          <RetrofitDatabaseDetail retrofit={selectedRetrofit} />
        )}
      </div>
    </section>
  );
}

function RetrofitDatabaseDetail({ retrofit }: { retrofit: RetrofitIndexRow | null }) {
  if (!retrofit) {
    return (
      <section className="database-detail-panel">
        <p className="empty-state">Select a retrofit type to inspect related opportunities.</p>
      </section>
    );
  }

  return (
    <section className="database-detail-panel">
      <div className="database-detail-header">
        <p className="eyebrow">{retrofit.retrofitTypeId}</p>
        <h2>{retrofit.displayName}</h2>
        <div className="database-chip-row">
          <span>{retrofit.parentCategory.replaceAll("_", " ")}</span>
          <span>{retrofit.isPhysicalRetrofit ? "Physical retrofit" : "Service or product"}</span>
          <span>{retrofit.opportunityCount.toLocaleString()} opportunities</span>
        </div>
      </div>

      <div className="database-summary-grid">
        <DetailItem label="Typical bill types" value={(retrofit.typicalBillTypes || []).join(", ") || "Not listed"} />
        <DetailItem label="Savings models" value={(retrofit.relatedSavingsModels || []).join(", ") || "Not listed"} />
        <DetailItem label="Components" value={String((retrofit.typicalComponents || []).length)} />
      </div>

      <section className="database-detail-section">
        <h3>Typical Components</h3>
        <div className="database-chip-row">
          {(retrofit.typicalComponents?.length ? retrofit.typicalComponents : ["No typical components listed"]).map((component) => (
            <span key={component}>{component}</span>
          ))}
        </div>
      </section>

      <section className="database-detail-section">
        <h3>Connected Opportunities</h3>
        {retrofit.opportunities.length === 0 ? (
          <p>No opportunities are currently connected to this retrofit type.</p>
        ) : (
          <div className="parameter-set-list">
            {retrofit.opportunities.map((opportunity) => (
              <article className="parameter-set" key={opportunity.opportunityId}>
                <h4>{opportunity.opportunityName}</h4>
                <p>{[opportunity.sourceName, opportunity.state, opportunity.programType].filter(Boolean).join(" / ") || "No source summary"}</p>
                <small>
                  Confidence {Math.round((opportunity.confidence || 0) * 100)}%
                  {opportunity.matchedTerms?.length ? ` via ${opportunity.matchedTerms.slice(0, 3).join(", ")}` : ""}
                </small>
                <div className="link-list">
                  {opportunity.sourceUrl ? <a href={opportunity.sourceUrl} rel="noreferrer" target="_blank">Source</a> : null}
                  {opportunity.websiteUrl ? <a href={opportunity.websiteUrl} rel="noreferrer" target="_blank">Program website</a> : null}
                  {opportunity.applicationUrl ? <a href={opportunity.applicationUrl} rel="noreferrer" target="_blank">Application</a> : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

function AdminDataPanel({
  credential,
  dataTable,
  isLoading,
  onOpportunityUpdated,
  onRefresh
}: {
  credential: AuthCredential | null;
  dataTable: DatabaseTableSnapshot | null;
  isLoading: boolean;
  onOpportunityUpdated: (opportunity: OpportunityRecord) => void;
  onRefresh: () => void;
}) {
  if (dataTable?.name === OPPORTUNITIES_TABLE_NAME) {
    return (
      <OpportunityReviewPanel
        credential={credential}
        dataTable={dataTable}
        isLoading={isLoading}
        onOpportunityUpdated={onOpportunityUpdated}
        onRefresh={onRefresh}
      />
    );
  }

  const isInitialLoad = isLoading && (!dataTable || dataTable.records.length === 0);

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Database inspection</p>
          <h2>{dataTable?.name || "Table data"}</h2>
        </div>
        <button className="secondary-button" disabled={isLoading} onClick={onRefresh} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="data-grid">
        {isInitialLoad ? (
          <article className="data-card">
            <RetroFiSkeleton variant="table" rows={6} label={`Loading ${dataTable?.name || "table data"}`} />
          </article>
        ) : dataTable ? (
          <article className="data-card">
            <div className="data-card-header">
              <div>
                <p className="eyebrow">{dataTable.name}</p>
                <h3>{dataTable.recordCount} records</h3>
                {dataTable.isTruncated ? (
                  <small>{dataTable.loadedCount || dataTable.records.length} loaded in this dashboard preview</small>
                ) : null}
              </div>
            </div>
            {dataTable.note ? <p className="muted-message">{dataTable.note}</p> : null}
            <pre>{JSON.stringify(dataTable.records, null, 2)}</pre>
          </article>
        ) : (
          <article className="data-card">
            <p>No database table selected.</p>
          </article>
        )}
      </div>
    </section>
  );
}

function AdminApplicationProfilesPanel({ credential }: { credential: AuthCredential | null }) {
  const [payload, setPayload] = useState<AdminApplicationProfilesResponse | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ApplicationProfileRecord | null>(null);
  const [profileDetailMode, setProfileDetailMode] = useState<"view" | "edit">("view");
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importSummary, setImportSummary] = useState<string | null>(null);
  const [reviewStatusFilter, setReviewStatusFilter] = useState("");
  const [qualityFilter, setQualityFilter] = useState("");
  const [opportunityIdInput, setOpportunityIdInput] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [approveAsReferenceOnly, setApproveAsReferenceOnly] = useState(false);
  const [editor, setEditor] = useState({
    applicationMethod: "unknown",
    applicationStatus: "unknown",
    profileQuality: "needs_manual_review",
    requiredFields: "[]",
    requiredDocuments: "[]",
    optionalFields: "[]",
    applicationSteps: "[]",
    applicationArtifacts: "[]",
    primaryApplicationArtifacts: "[]"
  });
  const profileDetailRef = useRef<HTMLElement | null>(null);

  async function loadProfiles() {
    if (!credential) {
      setError("Sign in again to load ApplicationProfiles.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (reviewStatusFilter) params.set("reviewStatus", reviewStatusFilter);
      if (qualityFilter) params.set("profileQuality", qualityFilter);
      const response = await apiGet<AdminApplicationProfilesResponse>(`/api/admin/application-profiles?${params.toString()}`, {
        headers: adminAuthHeaders(credential)
      });
      setPayload(response);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load ApplicationProfiles.");
    } finally {
      setIsLoading(false);
    }
  }

  function setProfileForReview(profile: ApplicationProfileRecord, mode: "view" | "edit" = "view") {
    setSelectedProfile(profile);
    setProfileDetailMode(mode);
    setAdminNote(profile.adminNotes || "");
    setApproveAsReferenceOnly(profile.approvedAsReferenceOnly || ["closed", "funding_exhausted"].includes(profile.applicationStatus || ""));
    setEditor({
      applicationMethod: profile.applicationMethod || "unknown",
      applicationStatus: profile.applicationStatus || "unknown",
      profileQuality: profile.profileQuality || "needs_manual_review",
      requiredFields: JSON.stringify(profile.requiredFields || [], null, 2),
      requiredDocuments: JSON.stringify(profile.requiredDocuments || [], null, 2),
      optionalFields: JSON.stringify(profile.optionalFields || [], null, 2),
      applicationSteps: JSON.stringify(profile.applicationSteps || [], null, 2),
      applicationArtifacts: JSON.stringify(profile.applicationArtifacts || [], null, 2),
      primaryApplicationArtifacts: JSON.stringify(profile.primaryApplicationArtifacts || [], null, 2)
    });
  }

  async function viewProfile(profileId: string, mode: "view" | "edit" = "view") {
    if (!credential) return;
    setError(null);
    try {
      const response = await apiGet<AdminApplicationProfileDetailResponse>(`/api/admin/application-profiles/${encodeURIComponent(profileId)}`, {
        headers: adminAuthHeaders(credential)
      });
      setProfileForReview(response.profile, mode);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load ApplicationProfile detail.");
    }
  }

  async function importFirstTenProfiles() {
    if (!credential) {
      setError("Sign in again to import profiles.");
      return;
    }
    setIsImporting(true);
    setError(null);
    setImportSummary(null);
    try {
      const response = await apiPost<AdminApplicationProfileImportResponse>("/api/admin/application-profiles/import-first10", adminAuthBody(credential));
      const errorSummary = response.errors?.map((item) => [item.opportunityName || item.opportunityId, item.message].filter(Boolean).join(": ")).join(" ");
      const skippedSummary = response.skippedProfiles?.length
        ? `Skipped ${response.skippedCount}: ${response.skippedProfiles.slice(0, 3).map((item) => item.reason || item.opportunityId).join("; ")}${response.skippedProfiles.length > 3 ? "..." : ""}`
        : "";
      const summary = [
        `Imported ${response.importedCount}.`,
        `Skipped ${response.skippedCount}.`,
        response.sourceOpportunityCount != null ? `Source opportunities checked: ${response.sourceOpportunityCount}.` : "",
        response.note || "",
        skippedSummary,
        errorSummary || ""
      ].filter(Boolean).join(" ");
      setImportSummary(summary || "Import completed.");
      if (response.importedCount === 0 && response.skippedCount === 0 && response.errors?.length) {
        setError(errorSummary || "Import source unavailable. Generate drafts from production opportunities or check server logs.");
      }
      await loadProfiles();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not import first-10 profiles.");
    } finally {
      setIsImporting(false);
    }
  }

  async function generateDraftProfile() {
    if (!credential) {
      setError("Sign in again to generate a draft profile.");
      return;
    }
    const opportunityId = opportunityIdInput.trim();
    if (!opportunityId) {
      setError("Enter an opportunity ID before generating a draft.");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const response = await apiPost<AdminApplicationProfileMutationResponse>("/api/admin/application-profiles/generate-draft", {
        ...adminAuthBody(credential),
        opportunityId
      });
      await loadProfiles();
      setProfileForReview(response.profile);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not generate draft profile.");
    } finally {
      setIsSaving(false);
    }
  }

  function parseEditorArray(field: keyof typeof editor) {
    const parsed = JSON.parse(editor[field]);
    if (!Array.isArray(parsed)) {
      throw new Error(`${field} must be a JSON array.`);
    }
    return parsed;
  }

  async function saveProfileEdits() {
    if (!credential || !selectedProfile) return;
    setIsSaving(true);
    setError(null);
    try {
      const profilePatch = {
        applicationMethod: editor.applicationMethod,
        applicationStatus: editor.applicationStatus,
        profileQuality: editor.profileQuality,
        adminNotes: adminNote,
        requiredFields: parseEditorArray("requiredFields"),
        requiredDocuments: parseEditorArray("requiredDocuments"),
        optionalFields: parseEditorArray("optionalFields"),
        applicationSteps: parseEditorArray("applicationSteps"),
        applicationArtifacts: parseEditorArray("applicationArtifacts"),
        primaryApplicationArtifacts: parseEditorArray("primaryApplicationArtifacts")
      };
      const response = await apiPatch<AdminApplicationProfileMutationResponse>(
        `/api/admin/application-profiles/${encodeURIComponent(selectedProfile.profileId)}`,
        {
          ...adminAuthBody(credential),
          profilePatch
        }
      );
      setProfileForReview(response.profile);
      await loadProfiles();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not save profile edits.");
    } finally {
      setIsSaving(false);
    }
  }

  async function approveSelectedProfile() {
    if (!credential || !selectedProfile) return;
    setIsSaving(true);
    setError(null);
    try {
      const response = await apiPost<AdminApplicationProfileMutationResponse>(
        `/api/admin/application-profiles/${encodeURIComponent(selectedProfile.profileId)}/approve`,
        {
          ...adminAuthBody(credential),
          adminNote,
          confirmation: true,
          approveAsReferenceOnly
        }
      );
      setProfileForReview(response.profile);
      await loadProfiles();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Approval was blocked.");
    } finally {
      setIsSaving(false);
    }
  }

  async function approveProfileFromList(profile: ApplicationProfileRecord) {
    if (!credential) return;
    const confirmed = window.confirm(`Approve ${profile.opportunityName || profile.opportunityId} for future customer application prep?`);
    if (!confirmed) return;
    setIsSaving(true);
    setError(null);
    try {
      const response = await apiPost<AdminApplicationProfileMutationResponse>(
        `/api/admin/application-profiles/${encodeURIComponent(profile.profileId)}/approve`,
        {
          ...adminAuthBody(credential),
          adminNote: "Approved from ApplicationProfiles list after admin confirmation.",
          confirmation: true,
          approveAsReferenceOnly: ["closed", "funding_exhausted"].includes(profile.applicationStatus || "")
        }
      );
      setProfileForReview(response.profile);
      await loadProfiles();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Approval was blocked.");
    } finally {
      setIsSaving(false);
    }
  }

  async function rejectSelectedProfile() {
    if (!credential || !selectedProfile) return;
    const reason = adminNote.trim();
    if (!reason) {
      setError("Enter an admin note/rejection reason before rejecting.");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const response = await apiPost<AdminApplicationProfileMutationResponse>(
        `/api/admin/application-profiles/${encodeURIComponent(selectedProfile.profileId)}/reject`,
        {
          ...adminAuthBody(credential),
          reason
        }
      );
      setProfileForReview(response.profile);
      await loadProfiles();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not reject profile.");
    } finally {
      setIsSaving(false);
    }
  }

  async function rejectProfileFromList(profile: ApplicationProfileRecord) {
    if (!credential) return;
    const reason = window.prompt(`Reject ${profile.opportunityName || profile.opportunityId}. Enter a reason:`);
    if (!reason?.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const response = await apiPost<AdminApplicationProfileMutationResponse>(
        `/api/admin/application-profiles/${encodeURIComponent(profile.profileId)}/reject`,
        {
          ...adminAuthBody(credential),
          reason
        }
      );
      setProfileForReview(response.profile);
      await loadProfiles();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not reject profile.");
    } finally {
      setIsSaving(false);
    }
  }

  async function archiveSelectedProfile() {
    if (!credential || !selectedProfile) return;
    setIsSaving(true);
    setError(null);
    try {
      const response = await apiPost<AdminApplicationProfileMutationResponse>(
        `/api/admin/application-profiles/${encodeURIComponent(selectedProfile.profileId)}/archive`,
        {
          ...adminAuthBody(credential),
          adminNote: adminNote || "Archived from admin ApplicationProfile review."
        }
      );
      setProfileForReview(response.profile);
      await loadProfiles();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not archive profile.");
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    void loadProfiles();
  }, [credential, reviewStatusFilter, qualityFilter]);

  useEffect(() => {
    if (!selectedProfile || typeof window === "undefined") return;
    const animationFrame = window.requestAnimationFrame(() => {
      profileDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      profileDetailRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, [selectedProfile?.profileId, profileDetailMode]);

  const rows = payload?.profiles || [];
  const reviewStatuses = uniqueSorted(rows.map((row) => row.reviewStatus));
  const qualityOptions = uniqueSorted(rows.map((row) => row.profileQuality));

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Application profile registry</p>
          <h2>{payload?.total ?? rows.length} draft ApplicationProfiles</h2>
          <p>AI-extracted profiles remain drafts until an admin approves them.</p>
        </div>
        <button className="secondary-button" disabled={isLoading} onClick={() => void loadProfiles()} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="review-filters application-source-filters">
        <ReviewSelect label="Review status" onChange={setReviewStatusFilter} options={reviewStatuses} value={reviewStatusFilter} />
        <ReviewSelect label="Profile quality" onChange={setQualityFilter} options={qualityOptions} value={qualityFilter} />
        <label className="field">
          <span>Generate draft by opportunity ID</span>
          <input
            onChange={(event) => setOpportunityIdInput(event.target.value)}
            placeholder="SOURCE_DSIRE:..."
            type="text"
            value={opportunityIdInput}
          />
        </label>
        <button className="secondary-button" disabled={isSaving} onClick={() => void generateDraftProfile()} type="button">
          {isSaving ? "Working..." : "Generate draft"}
        </button>
        <button className="secondary-button" disabled={isImporting} onClick={() => void importFirstTenProfiles()} type="button">
          {isImporting ? "Importing..." : "Import first 10"}
        </button>
      </div>

      {payload?.note ? <p className="muted-message">{payload.note}</p> : null}
      {importSummary ? <p className="success-message">{importSummary}</p> : null}
      {error ? <p className="error-message">{error}</p> : null}

      <section className="application-source-table-shell">
        {isLoading && rows.length === 0 ? (
          <RetroFiSkeleton variant="table" rows={7} label="Loading ApplicationProfiles" />
        ) : rows.length === 0 ? (
          <p className="empty-state">No ApplicationProfiles are saved yet.</p>
        ) : (
          <div className="application-source-table-wrap">
            <table className="application-source-table application-profile-table">
              <thead>
                <tr>
                  <th>Opportunity</th>
                  <th>Method</th>
                  <th>Application status</th>
                  <th>Profile quality</th>
                  <th>Review status</th>
                  <th>Fields</th>
                  <th>Documents</th>
                  <th>Primary artifacts</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((profile) => (
                  <tr className={selectedProfile?.profileId === profile.profileId ? "is-selected" : undefined} key={profile.profileId}>
                    <td>
                      <div className="application-source-cell">
                        <strong>{profile.opportunityName || profile.opportunityId}</strong>
                        <small>{profile.opportunityId}</small>
                      </div>
                    </td>
                    <td>{formatApplicationMethodLabel(profile.primaryMethod as ApplicationMethod || profile.applicationMethod)}</td>
                    <td>{formatApplicationStatusLabel(profile.applicationStatus)}</td>
                    <td>{formatProfileQualityLabel(profile.profileQuality)}</td>
                    <td>
                      <span className={`application-source-status-pill ${profileReviewStatusClassName(profile.reviewStatus)}`}>
                        {formatProfileReviewStatus(profile.reviewStatus)}
                      </span>
                    </td>
                    <td>{profile.requiredFieldCount ?? profile.requiredFields?.length ?? 0}</td>
                    <td>{profile.requiredDocumentCount ?? profile.requiredDocuments?.length ?? 0}</td>
                    <td>{profile.primaryArtifactCount ?? profile.primaryApplicationArtifacts?.length ?? 0}</td>
                    <td>{profile.updatedAt ? formatProgramDate(profile.updatedAt) : "Unknown"}</td>
                    <td>
                      <div className="application-source-actions">
                        <button className="secondary-button" onClick={() => void viewProfile(profile.profileId, "view")} type="button">View</button>
                        <button className="secondary-button" onClick={() => void viewProfile(profile.profileId, "edit")} type="button">Edit</button>
                        <button className="secondary-button" disabled={isSaving} onClick={() => void approveProfileFromList(profile)} type="button">Approve</button>
                        <button className="secondary-button" disabled={isSaving} onClick={() => void rejectProfileFromList(profile)} type="button">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedProfile ? (
        <section className="application-profile-detail" ref={profileDetailRef} tabIndex={-1}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">{profileDetailMode === "edit" ? "Edit draft ApplicationProfile" : "Requirement preview"}</p>
              <h2>{selectedProfile.opportunityName || selectedProfile.opportunityId}</h2>
              <p>Approve only after the extracted requirements and evidence are reviewed.</p>
            </div>
            <button className="secondary-button" onClick={() => setSelectedProfile(null)} type="button">
              Close
            </button>
          </div>

          <dl className="application-profile-summary">
            <div><dt>Official website</dt><dd>{selectedProfile.programWebsiteUrl ? renderApplicationSourceLink(selectedProfile.programWebsiteUrl) : "Not found"}</dd></div>
            <div><dt>Application URL</dt><dd>{selectedProfile.applicationUrl ? renderApplicationSourceLink(selectedProfile.applicationUrl) : "Not found"}</dd></div>
            <div><dt>PDF URL</dt><dd>{selectedProfile.pdfUrl ? renderApplicationSourceLink(selectedProfile.pdfUrl) : "Not found"}</dd></div>
            <div><dt>Contact email</dt><dd>{selectedProfile.contactEmail || "Not found"}</dd></div>
            <div><dt>Review status</dt><dd>{formatProfileReviewStatus(selectedProfile.reviewStatus)}</dd></div>
            <div><dt>Profile quality</dt><dd>{formatProfileQualityLabel(selectedProfile.profileQuality)}</dd></div>
          </dl>

          <div className="application-profile-actions">
            <label className="field">
              <span>Admin notes / approval or rejection reason</span>
              <textarea onChange={(event) => setAdminNote(event.target.value)} rows={4} value={adminNote} />
            </label>
            <label className="checkbox-row">
              <input
                checked={approveAsReferenceOnly}
                onChange={(event) => setApproveAsReferenceOnly(event.target.checked)}
                type="checkbox"
              />
              Approve closed/funding-exhausted profile as reference only
            </label>
            <div className="button-row">
              <button className="primary-button" disabled={isSaving} onClick={() => void approveSelectedProfile()} type="button">
                Approve for future customer application prep
              </button>
              <button className="secondary-button" disabled={isSaving} onClick={() => void rejectSelectedProfile()} type="button">
                Reject
              </button>
              <button className="secondary-button" disabled={isSaving} onClick={() => void archiveSelectedProfile()} type="button">
                Archive
              </button>
            </div>
          </div>

          <div className="application-requirement-section">
            <strong>Primary application artifacts</strong>
            {renderProfileArtifactList(selectedProfile.primaryApplicationArtifacts || [])}
          </div>
          <div className="application-requirement-section">
            <strong>Source chain</strong>
            {renderProfileSourceChain(selectedProfile.sourceChain || [])}
          </div>
          {renderRequirementList("Required fields", selectedProfile.requiredFields || [])}
          {renderRequirementList("Required documents", selectedProfile.requiredDocuments || [])}
          {renderRequirementList("Optional fields", selectedProfile.optionalFields || [])}
          {selectedProfile.applicationSteps?.length ? (
            <div className="application-requirement-section">
              <strong>Application steps</strong>
              <ol className="application-requirement-steps">
                {selectedProfile.applicationSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          ) : null}
          {selectedProfile.qualityWarnings?.length ? (
            <div className="application-requirement-section">
              <strong>Quality warnings</strong>
              <ul className="application-requirement-evidence">
                {selectedProfile.qualityWarnings.map((warning) => <li key={warning}><small>{warning}</small></li>)}
              </ul>
            </div>
          ) : null}
          <details className="application-profile-diagnostics">
            <summary>Filtered artifact diagnostics</summary>
            <pre>{JSON.stringify(selectedProfile.artifactDiagnostics || {}, null, 2)}</pre>
          </details>
          <details className="application-profile-diagnostics">
            <summary>Extraction diagnostics</summary>
            <pre>{JSON.stringify(selectedProfile.extractionDiagnostics || selectedProfile.diagnostics || {}, null, 2)}</pre>
          </details>
          <details className="application-profile-editor" key={`${selectedProfile.profileId}:${profileDetailMode}`} open={profileDetailMode === "edit"}>
            <summary>Edit extracted profile fields</summary>
            <div className="application-profile-editor-grid">
              <label className="field"><span>Application method</span><input value={editor.applicationMethod} onChange={(event) => setEditor((current) => ({ ...current, applicationMethod: event.target.value }))} /></label>
              <label className="field"><span>Application status</span><input value={editor.applicationStatus} onChange={(event) => setEditor((current) => ({ ...current, applicationStatus: event.target.value }))} /></label>
              <label className="field"><span>Profile quality</span><input value={editor.profileQuality} onChange={(event) => setEditor((current) => ({ ...current, profileQuality: event.target.value }))} /></label>
              <label className="field"><span>Required fields JSON</span><textarea rows={8} value={editor.requiredFields} onChange={(event) => setEditor((current) => ({ ...current, requiredFields: event.target.value }))} /></label>
              <label className="field"><span>Required documents JSON</span><textarea rows={8} value={editor.requiredDocuments} onChange={(event) => setEditor((current) => ({ ...current, requiredDocuments: event.target.value }))} /></label>
              <label className="field"><span>Optional fields JSON</span><textarea rows={8} value={editor.optionalFields} onChange={(event) => setEditor((current) => ({ ...current, optionalFields: event.target.value }))} /></label>
              <label className="field"><span>Application steps JSON</span><textarea rows={6} value={editor.applicationSteps} onChange={(event) => setEditor((current) => ({ ...current, applicationSteps: event.target.value }))} /></label>
              <label className="field"><span>Artifacts JSON</span><textarea rows={6} value={editor.applicationArtifacts} onChange={(event) => setEditor((current) => ({ ...current, applicationArtifacts: event.target.value }))} /></label>
              <label className="field"><span>Primary artifacts JSON</span><textarea rows={6} value={editor.primaryApplicationArtifacts} onChange={(event) => setEditor((current) => ({ ...current, primaryApplicationArtifacts: event.target.value }))} /></label>
            </div>
            <button className="secondary-button" disabled={isSaving} onClick={() => void saveProfileEdits()} type="button">
              {isSaving ? "Saving..." : "Save edits"}
            </button>
          </details>
        </section>
      ) : null}
    </section>
  );
}

function AdminApplicationSourcesPanel({ credential }: { credential: AuthCredential | null }) {
  const [payload, setPayload] = useState<AdminApplicationSourcesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceTypeFilter, setSourceTypeFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [pathProfiles, setPathProfiles] = useState<Record<string, ApplicationPathProfile>>({});
  const [pathLoading, setPathLoading] = useState<Record<string, boolean>>({});
  const [pathErrors, setPathErrors] = useState<Record<string, string>>({});
  const [requirementProfiles, setRequirementProfiles] = useState<Record<string, ApplicationRequirementProfile>>({});
  const [requirementLoading, setRequirementLoading] = useState<Record<string, boolean>>({});
  const [requirementErrors, setRequirementErrors] = useState<Record<string, string>>({});
  const batchLimit = 100;

  async function loadSources(options?: { cursor?: string | null; append?: boolean }) {
    if (!credential) {
      setError("Sign in again to load application sources.");
      setIsLoading(false);
      return;
    }

    const append = Boolean(options?.append);
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const params = new URLSearchParams({ limit: String(batchLimit) });
      if (options?.cursor) {
        params.set("cursor", options.cursor);
      }
      const response = await apiGet<AdminApplicationSourcesResponse>(`/api/admin/application-sources?${params.toString()}`, {
        headers: adminAuthHeaders(credential)
      });
      setPayload((current) => {
        if (!append || !current) {
          return response;
        }

        const mergedSources = [...current.sources, ...response.sources.filter((row) => !current.sources.some((existing) => existing.opportunityId === row.opportunityId))];
        return {
          ...response,
          total: mergedSources.length,
          sources: mergedSources
        };
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not load application sources.");
    } finally {
      if (append) {
        setIsLoadingMore(false);
      } else {
        setIsLoading(false);
      }
    }
  }

  async function discoverPath(row: OpportunityApplicationSource) {
    if (!credential) {
      setPathErrors((current) => ({
        ...current,
        [row.opportunityId]: "Sign in again to discover application paths."
      }));
      return;
    }

    setPathLoading((current) => ({ ...current, [row.opportunityId]: true }));
    setPathErrors((current) => {
      const next = { ...current };
      delete next[row.opportunityId];
      return next;
    });

    try {
      const response = await apiPost<AdminApplicationPathDiscoverResponse>("/api/admin/application-paths/discover", {
        ...adminAuthBody(credential),
        sourceProfile: row
      });
      setPathProfiles((current) => ({
        ...current,
        [row.opportunityId]: response.profile
      }));
      setRequirementProfiles((current) => {
        const next = { ...current };
        delete next[row.opportunityId];
        return next;
      });
    } catch (requestError) {
      setPathErrors((current) => ({
        ...current,
        [row.opportunityId]: requestError instanceof Error ? requestError.message : "Could not discover application path."
      }));
    } finally {
      setPathLoading((current) => ({ ...current, [row.opportunityId]: false }));
    }
  }

  async function extractRequirements(row: OpportunityApplicationSource, pathProfile: ApplicationPathProfile) {
    if (!credential) {
      setRequirementErrors((current) => ({
        ...current,
        [row.opportunityId]: "Sign in again to extract application requirements."
      }));
      return;
    }

    setRequirementLoading((current) => ({ ...current, [row.opportunityId]: true }));
    setRequirementErrors((current) => {
      const next = { ...current };
      delete next[row.opportunityId];
      return next;
    });

    try {
      const response = await apiPost<AdminApplicationRequirementExtractResponse>("/api/admin/application-requirements/extract", {
        ...adminAuthBody(credential),
        sourceProfile: row,
        pathProfile
      });
      setRequirementProfiles((current) => ({
        ...current,
        [row.opportunityId]: response.profile
      }));
    } catch (requestError) {
      setRequirementErrors((current) => ({
        ...current,
        [row.opportunityId]: requestError instanceof Error ? requestError.message : "Could not extract application requirements."
      }));
    } finally {
      setRequirementLoading((current) => ({ ...current, [row.opportunityId]: false }));
    }
  }

  useEffect(() => {
    void loadSources();
  }, [credential]);

  const rows = payload?.sources || [];
  const statusOptions = uniqueSorted(rows.map((row) => row.extractionStatus));
  const sourceTypeOptions = uniqueSorted(rows.map((row) => row.sourceType));
  const methodOptions = uniqueSorted(rows.map((row) => row.applicationMethod));
  const normalizedSearch = search.trim().toLowerCase();
  const filteredRows = rows.filter((row) => {
    const haystack = [
      row.opportunityName,
      row.retrofitName,
      row.programSourceUrl,
      row.applicationUrl,
      row.contactEmail,
      row.sourceType,
      row.applicationMethod,
      row.extractionStatus,
      row.sourceConfidence,
      row.notes.join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!normalizedSearch || haystack.includes(normalizedSearch)) &&
      (!statusFilter || row.extractionStatus === statusFilter) &&
      (!sourceTypeFilter || row.sourceType === sourceTypeFilter) &&
      (!methodFilter || row.applicationMethod === methodFilter)
    );
  });
  const discoveredPathProfiles = Object.values(pathProfiles);
  const pathDiscoverySummary = {
    applicationPathsFound: discoveredPathProfiles.filter((profile) => applicationPathDiscoveryStatus(profile) === "application_path_found").length,
    programWebsitesFound: discoveredPathProfiles.filter((profile) => Boolean(profile.programWebsiteUrl)).length,
    pdfsFound: discoveredPathProfiles.filter((profile) => Boolean(applicationPathPdfUrl(profile))).length,
    contactEmailsFound: discoveredPathProfiles.filter((profile) => Boolean(applicationPathContactEmail(profile))).length,
    programWebsiteOnly: discoveredPathProfiles.filter((profile) => ["program_website_only", "program_website_found"].includes(applicationPathDiscoveryStatus(profile))).length,
    sourceOnly: discoveredPathProfiles.filter((profile) => applicationPathDiscoveryStatus(profile) === "source_only").length,
    unreadable: discoveredPathProfiles.filter((profile) => ["unreadable", "source_unreadable", "source_unreadable_or_js_required"].includes(applicationPathDiscoveryStatus(profile))).length,
    needsUserSelection: discoveredPathProfiles.filter((profile) => applicationPathDiscoveryStatus(profile) === "needs_user_selection" || profile.applicationStatus === "needs_user_selection").length,
    closedOrExhausted: discoveredPathProfiles.filter((profile) => ["closed", "funding_exhausted"].includes(profile.applicationStatus || "")).length,
    needsReview: discoveredPathProfiles.filter((profile) => ["needs_review", "not_attempted"].includes(applicationPathDiscoveryStatus(profile))).length
  };

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Application source audit</p>
          <h2>{payload?.total ?? rows.length} opportunity source profiles</h2>
        </div>
        <button className="secondary-button" disabled={isLoading || isLoadingMore} onClick={() => void loadSources()} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="review-filters application-source-filters">
        <label className="field">
          <span>Search</span>
          <input
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Opportunity, retrofit, URL, notes"
            type="search"
            value={search}
          />
        </label>
        <ReviewSelect label="Status" onChange={setStatusFilter} options={statusOptions} value={statusFilter} />
        <ReviewSelect label="Source type" onChange={setSourceTypeFilter} options={sourceTypeOptions} value={sourceTypeFilter} />
        <ReviewSelect label="Method" onChange={setMethodFilter} options={methodOptions} value={methodFilter} />
      </div>

      <div className="review-count-row">
        <strong>{filteredRows.length} shown</strong>
        <span>{payload?.generatedAt ? `Generated ${formatProgramDate(payload.generatedAt)}` : "Source resolver audit"}</span>
      </div>

      <div className="application-path-summary" aria-label="Application path discovery summary">
        <span><strong>{pathDiscoverySummary.applicationPathsFound}</strong> application paths found</span>
        <span><strong>{pathDiscoverySummary.programWebsitesFound}</strong> program websites found</span>
        <span><strong>{pathDiscoverySummary.pdfsFound}</strong> PDFs found</span>
        <span><strong>{pathDiscoverySummary.contactEmailsFound}</strong> contact emails found</span>
        <span><strong>{pathDiscoverySummary.programWebsiteOnly}</strong> program website only</span>
        <span><strong>{pathDiscoverySummary.sourceOnly}</strong> source only</span>
        <span><strong>{pathDiscoverySummary.needsUserSelection}</strong> needs user selection</span>
        <span><strong>{pathDiscoverySummary.closedOrExhausted}</strong> closed/funding exhausted</span>
        <span><strong>{pathDiscoverySummary.unreadable}</strong> unreadable</span>
        <span><strong>{pathDiscoverySummary.needsReview}</strong> needs review</span>
      </div>

      {payload?.note ? <p className="muted-message">{payload.note}</p> : null}
      {error ? <p className="error-message">{error}</p> : null}

      <section className="application-source-table-shell">
        {isLoading && rows.length === 0 ? (
          <RetroFiSkeleton variant="table" rows={7} label="Loading application source audit" />
        ) : error && rows.length === 0 ? (
          <div className="empty-state">
            <p>Could not load the application source audit.</p>
            <button className="secondary-button" onClick={() => void loadSources()} type="button">
              Retry
            </button>
          </div>
        ) : rows.length === 0 ? (
          <p className="empty-state">{payload?.note || "No application source rows are available yet."}</p>
        ) : filteredRows.length === 0 ? (
          <p className="empty-state">No application source rows match the current filters.</p>
        ) : (
          <div className="application-source-table-wrap">
            <table className="application-source-table">
              <thead>
                <tr>
                  <th>Opportunity</th>
                  <th>Related retrofit</th>
                  <th>Program/source URL</th>
                  <th>Application URL</th>
                  <th>Contact email</th>
                  <th>Source type</th>
                  <th>Application method</th>
                  <th>Status</th>
                  <th>Confidence</th>
                  <th>Notes</th>
                  <th>Path discovery</th>
                  <th>Open</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.opportunityId}>
                    <td>
                      <div className="application-source-cell">
                        <strong>{row.opportunityName || row.opportunityId}</strong>
                        <small>{row.opportunityId}</small>
                      </div>
                    </td>
                    <td>{row.retrofitName || "Not mapped"}</td>
                    <td>{renderApplicationSourceLink(row.programSourceUrl)}</td>
                    <td>{renderApplicationSourceLink(row.applicationUrl)}</td>
                    <td>{row.contactEmail || "Not listed"}</td>
                    <td>{formatApplicationSourceLabel(row.sourceType)}</td>
                    <td>{formatApplicationMethodLabel(row.applicationMethod)}</td>
                    <td>
                      <span className={`application-source-status-pill ${applicationSourceStatusClassName(row.extractionStatus)}`}>
                        {formatExtractionStatusLabel(row.extractionStatus)}
                      </span>
                    </td>
                    <td>{row.sourceConfidence}</td>
                    <td>
                      <ul className="application-source-notes">
                        {row.notes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {renderApplicationPathDiscovery({
                        row,
                        profile: pathProfiles[row.opportunityId],
                        isLoading: Boolean(pathLoading[row.opportunityId]),
                        error: pathErrors[row.opportunityId],
                        requirementProfile: requirementProfiles[row.opportunityId],
                        requirementLoading: Boolean(requirementLoading[row.opportunityId]),
                        requirementError: requirementErrors[row.opportunityId],
                        onDiscover: () => void discoverPath(row),
                        onExtractRequirements: (pathProfile) => void extractRequirements(row, pathProfile)
                      })}
                    </td>
                    <td>
                      <div className="application-source-actions">
                        {row.programSourceUrl ? (
                          <a href={row.programSourceUrl} rel="noreferrer" target="_blank">
                            Source
                          </a>
                        ) : null}
                        {row.applicationUrl ? (
                          <a href={row.applicationUrl} rel="noreferrer" target="_blank">
                            Apply
                          </a>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {payload?.nextCursor ? (
        <div className="review-count-row">
          <span>Additional opportunity source rows are available.</span>
          <button
            className="secondary-button"
            disabled={isLoading || isLoadingMore}
            onClick={() => void loadSources({ cursor: payload.nextCursor || null, append: true })}
            type="button"
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </button>
        </div>
      ) : null}
    </section>
  );
}

function renderApplicationSourceLink(url?: string) {
  if (!url) return "Not listed";
  return (
    <a href={url} rel="noreferrer" target="_blank">
      {truncateLinkLabel(url)}
    </a>
  );
}

function applicationPathDiscoveryStatus(profile: ApplicationPathProfile): ApplicationPathStatus {
  return profile.discoveryStatus || profile.pathStatus;
}

function applicationPathMethod(profile: ApplicationPathProfile): ApplicationMethod {
  return profile.applicationMethod || profile.confirmedApplicationMethod;
}

function applicationPathPdfUrl(profile: ApplicationPathProfile) {
  return profile.bestPdfUrl || profile.pdfUrl || profile.discoveredPdfUrl;
}

function applicationPathContactEmail(profile: ApplicationPathProfile) {
  return profile.bestContactEmail || profile.contactEmail || profile.discoveredContactEmail;
}

function applicationPathBestApplicationUrl(profile: ApplicationPathProfile) {
  return profile.bestApplicationUrl || profile.discoveredApplicationUrl;
}

function canExtractRequirementsFromPath(profile: ApplicationPathProfile) {
  if (profile.applicationStatus === "source_unreadable_or_js_required" || profile.applicationStatus === "needs_user_selection") return false;
  const method = applicationPathMethod(profile);
  if (applicationPathBestApplicationUrl(profile) || applicationPathPdfUrl(profile)) return true;
  if (method === "email" && applicationPathContactEmail(profile) && profile.methodStatus === "confirmed") return true;
  if ((method === "contractor_submitted" || method === "tax_accountant_filing") && profile.methodStatus === "confirmed") return true;
  if (profile.applicationArtifacts?.some((artifact) => ["application_portal", "online_form", "pdf", "email_submission", "grant_package", "pre_approval_form", "post_install_form"].includes(artifact.type))) return true;
  return Boolean(profile.candidates?.some((candidate) => candidate.linkType === "application_instructions" && candidate.score >= 65));
}

function renderApplicationPathDiscovery({
  row,
  profile,
  isLoading,
  error,
  requirementProfile,
  requirementLoading,
  requirementError,
  onDiscover,
  onExtractRequirements
}: {
  row: OpportunityApplicationSource;
  profile?: ApplicationPathProfile;
  isLoading: boolean;
  error?: string;
  requirementProfile?: ApplicationRequirementProfile;
  requirementLoading: boolean;
  requirementError?: string;
  onDiscover: () => void;
  onExtractRequirements: (pathProfile: ApplicationPathProfile) => void;
}) {
  const canDiscover = Boolean(row.programSourceUrl || row.applicationUrl);
  const discoveryStatus = profile ? applicationPathDiscoveryStatus(profile) : undefined;
  const applicationMethod = profile ? applicationPathMethod(profile) : undefined;
  const bestApplicationUrl = profile ? applicationPathBestApplicationUrl(profile) : undefined;
  const pdfUrl = profile ? applicationPathPdfUrl(profile) : undefined;
  const contactEmail = profile ? applicationPathContactEmail(profile) : undefined;
  const canExtractRequirements = profile ? canExtractRequirementsFromPath(profile) : false;
  return (
    <div className="application-path-discovery">
      <button className="secondary-button" disabled={!canDiscover || isLoading} onClick={onDiscover} type="button">
        {isLoading ? "Discovering..." : profile ? "Refresh path" : "Discover path"}
      </button>
      {!canDiscover ? <small>No source URL</small> : null}
      {error ? <small className="application-path-error">{error}</small> : null}
      {profile ? (
        <div className="application-path-result">
          <div className="application-path-pill-row">
            <span className={`application-source-status-pill ${applicationPathStatusClassName(discoveryStatus || profile.pathStatus)}`}>
              {formatApplicationPathStatusLabel(discoveryStatus || profile.pathStatus)}
            </span>
            <span className="application-path-method">
              {formatApplicationMethodLabel(applicationMethod || profile.confirmedApplicationMethod)} · {formatApplicationMethodStatusLabel(profile.methodStatus)}
            </span>
            {profile.confidence ? <span className="application-path-method">{profile.confidence}</span> : null}
          </div>
          {profile.sourceTitle ? <small>{profile.sourceTitle}</small> : null}
          <dl className="application-path-links">
            {profile.programSourceUrl ? (
              <div>
                <dt>Program source</dt>
                <dd>{renderApplicationSourceLink(profile.programSourceUrl)}</dd>
              </div>
            ) : null}
            {profile.programWebsiteUrl ? (
              <div>
                <dt>Program website</dt>
                <dd>{renderApplicationSourceLink(profile.programWebsiteUrl)}</dd>
              </div>
            ) : null}
            {profile.programWebsiteSource ? (
              <div>
                <dt>Website source</dt>
                <dd>{profile.programWebsiteSource}</dd>
              </div>
            ) : null}
            <div>
              <dt>Application URL</dt>
              <dd>{bestApplicationUrl ? renderApplicationSourceLink(bestApplicationUrl) : "Application URL not found."}</dd>
            </div>
            <div>
              <dt>PDF URL</dt>
              <dd>{pdfUrl ? renderApplicationSourceLink(pdfUrl) : "PDF URL not found."}</dd>
            </div>
            <div>
              <dt>Contact email</dt>
              <dd>{contactEmail || "Contact email not found."}</dd>
            </div>
            <div>
              <dt>Application method</dt>
              <dd>{formatApplicationMethodLabel(applicationMethod || profile.confirmedApplicationMethod)}</dd>
            </div>
            <div>
              <dt>Discovery status</dt>
              <dd>{profile.linkDiscoveryStatus ? formatApplicationLinkDiscoveryStatus(profile.linkDiscoveryStatus) : formatApplicationPathStatusLabel(discoveryStatus || profile.pathStatus)}</dd>
            </div>
            <div>
              <dt>Application status</dt>
              <dd>{formatApplicationStatusLabel(profile.applicationStatus)}</dd>
            </div>
            <div>
              <dt>Aggregator</dt>
              <dd>{profile.isAggregatorSource ? (profile.aggregatorType || "aggregator") : "No"}</dd>
            </div>
            {profile.confidence ? (
              <div>
                <dt>Confidence</dt>
                <dd>{profile.confidence}</dd>
              </div>
            ) : null}
          </dl>
          <small>{applicationPathResultSummary(profile)}</small>
          {profile.sourceChain?.length ? (
            <div className="application-requirement-section">
              <strong>Source chain</strong>
              <ul className="application-link-candidates">
                {profile.sourceChain.slice(0, 5).map((item, index) => (
                  <li key={`${item.role}:${item.url || item.email || index}`}>
                    <span>{item.role.replaceAll("_", " ")} · {item.status || "candidate"}</span>
                    {item.url ? renderApplicationSourceLink(item.url) : item.email ? <small>{item.email}</small> : null}
                    {item.sourceField ? <small>{item.sourceField}</small> : null}
                    {item.reason ? <small>{item.reason}</small> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="application-requirement-discovery">
            {canExtractRequirements ? (
              <button
                className="secondary-button"
                disabled={requirementLoading}
                onClick={() => onExtractRequirements(profile)}
                type="button"
              >
                {requirementLoading ? "Extracting..." : requirementProfile ? "Refresh requirements" : "Extract requirements"}
              </button>
            ) : (
              <div className="application-requirement-blocked">
                <strong>Requirements not extracted</strong>
                <small>Reason: source only / no reliable application path found.</small>
                <small>Next: open program source or review manually.</small>
              </div>
            )}
            {requirementError ? <small className="application-path-error">{requirementError}</small> : null}
            {requirementProfile ? renderApplicationRequirementPreview(requirementProfile) : null}
          </div>
          {profile.candidates?.length ? (
            <div className="application-requirement-section">
              <strong>Ranked application link candidates</strong>
              <ul className="application-link-candidates">
                {profile.candidates.slice(0, 5).map((candidate, index) => (
                  <li key={`${candidate.linkType}:${candidate.url || candidate.email || index}`}>
                    <span>{formatApplicationLinkCandidateType(candidate.linkType)} · score {candidate.score}</span>
                    {candidate.url ? renderApplicationSourceLink(candidate.url) : candidate.email ? <small>{candidate.email}</small> : null}
                    {candidate.evidenceSnippet ? <small>{candidate.evidenceSnippet}</small> : null}
                    <small>{candidate.reason}</small>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {profile.applicationArtifacts?.length ? (
            <div className="application-requirement-section">
              <strong>Application artifacts</strong>
              <ul className="application-link-candidates">
                {profile.applicationArtifacts.slice(0, 6).map((artifact, index) => (
                  <li key={`${artifact.type}:${artifact.url || artifact.email || index}`}>
                    <span>{artifact.type.replaceAll("_", " ")} · {artifact.confidence}</span>
                    {artifact.url ? renderApplicationSourceLink(artifact.url) : artifact.email ? <small>{artifact.email}</small> : null}
                    {artifact.evidenceSnippet ? <small>{artifact.evidenceSnippet}</small> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {profile.pagesInspected?.length ? (
            <div className="application-requirement-section">
              <strong>Pages inspected</strong>
              <ul className="application-link-candidates">
                {profile.pagesInspected.slice(0, 4).map((page) => (
                  <li key={`${page.role}:${page.url}`}>
                    <span>{page.role.replaceAll("_", " ")} · {page.status}</span>
                    {renderApplicationSourceLink(page.url)}
                    {page.title ? <small>{page.title}</small> : null}
                    {page.error ? <small>{page.error}</small> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {profile.evidence.length ? (
            <ul className="application-path-evidence">
              {profile.evidence.slice(0, 3).map((item, index) => (
                <li key={`${item.label}:${index}`}>
                  <strong>{item.label}</strong>
                  {item.sourcePage || item.sourceUrl ? (
                    <span>{[item.sourcePage, item.sourceUrl ? truncateLinkLabel(item.sourceUrl, 56) : ""].filter(Boolean).join(" · ")}</span>
                  ) : null}
                  {item.textSnippet ? <span>{item.textSnippet}</span> : null}
                  {item.reason ? <span>{item.reason}</span> : null}
                  {item.url ? renderApplicationSourceLink(item.url) : null}
                </li>
              ))}
            </ul>
          ) : null}
          {profile.error ? <small className="application-path-error">{profile.error}</small> : null}
        </div>
      ) : null}
    </div>
  );
}

function renderApplicationRequirementPreview(profile: ApplicationRequirementProfile) {
  const rules = [
    `Pre-approval: ${formatRequirementValue(profile.preApprovalRequired)}`,
    `Contractor: ${formatRequirementValue(profile.contractorRequired)}`,
    `Tax review: ${formatRequirementValue(profile.taxReviewRequired)}`
  ];
  const hasExtractedRequirements =
    profile.requiredFields.length + profile.requiredDocuments.length + profile.optionalFields.length + profile.applicationSteps.length > 0 ||
    profile.preApprovalRequired === true ||
    profile.contractorRequired === true ||
    profile.taxReviewRequired === true ||
    Boolean(profile.deadline);
  return (
    <div className="application-requirement-result">
      <div className="application-path-pill-row">
        <span className={`application-source-status-pill ${requirementStatusClassName(profile.extractionStatus)}`}>
          {formatRequirementExtractionStatus(profile.extractionStatus)}
        </span>
        <span className="application-path-method">{formatApplicationMethodLabel(profile.applicationMethod)}</span>
        <span className="application-path-method">{formatApplicationStatusLabel(profile.applicationStatus)}</span>
      </div>
      {!hasExtractedRequirements && profile.extractionStatus === "needs_review" ? (
        <div className="application-requirement-blocked">
          <strong>Requirements not extracted</strong>
          <small>{profile.extractionDiagnostics?.reason || "No reliable application path or explicit application section was found."}</small>
        </div>
      ) : null}
      <dl className="application-requirement-summary">
        <div>
          <dt>Source used</dt>
          <dd>{profile.sourceUrl ? renderApplicationSourceLink(profile.sourceUrl) : "Source unavailable"}</dd>
        </div>
        <div>
          <dt>Required fields</dt>
          <dd>{profile.requiredFields.length}</dd>
        </div>
        <div>
          <dt>Required documents</dt>
          <dd>{profile.requiredDocuments.length}</dd>
        </div>
        <div>
          <dt>Optional fields</dt>
          <dd>{profile.optionalFields.length}</dd>
        </div>
        <div>
          <dt>Deadline</dt>
          <dd>{profile.deadline || "Not found"}</dd>
        </div>
        <div>
          <dt>Application status</dt>
          <dd>{formatApplicationStatusLabel(profile.applicationStatus)}</dd>
        </div>
        {profile.estimatedTime ? (
          <div>
            <dt>Estimated time</dt>
            <dd>{profile.estimatedTime}</dd>
          </div>
        ) : null}
      </dl>
      <div className="application-requirement-rule-row">
        {rules.map((rule) => (
          <span key={rule}>{rule}</span>
        ))}
      </div>
      {profile.extractionDiagnostics ? (
        <div className="application-requirement-section application-diagnostics">
          <strong>Extraction diagnostics</strong>
          <dl>
            <div>
              <dt>Source used</dt>
              <dd>{profile.extractionDiagnostics.sourceUsed ? renderApplicationSourceLink(profile.extractionDiagnostics.sourceUsed) : "Not available"}</dd>
            </div>
            <div>
              <dt>Aggregator source</dt>
              <dd>{profile.extractionDiagnostics.isAggregatorSource ? (profile.extractionDiagnostics.aggregatorType || "Yes") : "No"}</dd>
            </div>
            {profile.diagnostics ? (
              <>
                <div>
                  <dt>Official website used</dt>
                  <dd>{profile.diagnostics.officialWebsiteUsed ? profile.diagnostics.officialWebsiteSource || "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt>DSIRE skipped</dt>
                  <dd>{profile.diagnostics.dsireAggregatorSkipped ? "Yes" : "No"}</dd>
                </div>
              </>
            ) : null}
            <div>
              <dt>Application path found</dt>
              <dd>{profile.extractionDiagnostics.applicationPathFound ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt>Application section found</dt>
              <dd>{profile.extractionDiagnostics.applicationSpecificSectionFound ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt>Extraction allowed</dt>
              <dd>{profile.extractionDiagnostics.extractionAllowed ? "Yes" : "No"}</dd>
            </div>
          </dl>
          {profile.extractionDiagnostics.reason ? <small>{profile.extractionDiagnostics.reason}</small> : null}
        </div>
      ) : null}
      {profile.diagnostics && !profile.extractionDiagnostics ? (
        <div className="application-requirement-section application-diagnostics">
          <strong>Extraction diagnostics</strong>
          <dl>
            <div>
              <dt>Official website</dt>
              <dd>{profile.diagnostics.officialWebsiteUsed ? profile.diagnostics.officialWebsiteSource || "Yes" : "No"}</dd>
            </div>
            <div>
              <dt>DSIRE skipped</dt>
              <dd>{profile.diagnostics.dsireAggregatorSkipped ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt>Application path found</dt>
              <dd>{profile.diagnostics.applicationPathFound ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt>Extraction allowed</dt>
              <dd>{profile.diagnostics.extractionAllowed ? "Yes" : "No"}</dd>
            </div>
          </dl>
          {profile.diagnostics.reason ? <small>{profile.diagnostics.reason}</small> : null}
        </div>
      ) : null}
      {profile.applicationSteps.length ? (
        <div className="application-requirement-section">
          <strong>Application steps</strong>
          <ol className="application-requirement-steps">
            {profile.applicationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ) : null}
      {renderRequirementList("Required fields", profile.requiredFields)}
      {renderRequirementList("Required documents", profile.requiredDocuments)}
      {renderRequirementList("Optional fields", profile.optionalFields)}
      {profile.evidence.length ? (
        <div className="application-requirement-section">
          <strong>Evidence</strong>
          <ul className="application-requirement-evidence">
            {profile.evidence.slice(0, 5).map((item, index) => (
              <li key={`${item.label}:${index}`}>
                <span>{item.label}</span>
                {item.textSnippet ? <small>{item.textSnippet}</small> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {profile.notes.length ? (
        <div className="application-requirement-section">
          <strong>Notes</strong>
          <ul className="application-requirement-evidence">
            {profile.notes.slice(0, 3).map((note) => (
              <li key={note}><small>{note}</small></li>
            ))}
          </ul>
        </div>
      ) : null}
      {profile.error ? <small className="application-path-error">{profile.error}</small> : null}
    </div>
  );
}

function renderRequirementList(title: string, requirements: ApplicationRequirement[]) {
  if (!requirements.length) return null;
  return (
    <div className="application-requirement-section">
      <strong>{title}</strong>
      <ul className="application-requirement-list">
        {requirements.map((item) => (
          <li key={item.id}>
            <span>{item.label}</span>
            <small>{formatRequirementTypeLabel(item.requirementType)} · {item.confidence}</small>
            {item.evidenceSnippet ? <small>{item.evidenceSnippet}</small> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderProfileArtifactList(artifacts: ApplicationArtifact[]) {
  if (!artifacts.length) return <p className="muted-message">No primary application artifacts retained.</p>;
  return (
    <ul className="application-link-candidates">
      {artifacts.map((artifact, index) => (
        <li key={`${artifact.type}:${artifact.url || artifact.email || index}`}>
          <span>{artifact.type.replaceAll("_", " ")} · {artifact.confidence || "Needs review"}</span>
          {artifact.url ? renderApplicationSourceLink(artifact.url) : artifact.email ? <small>{artifact.email}</small> : null}
          {artifact.evidenceSnippet ? <small>{artifact.evidenceSnippet}</small> : null}
        </li>
      ))}
    </ul>
  );
}

function renderProfileSourceChain(sourceChain: ApplicationSourceChainItem[]) {
  if (!sourceChain.length) return <p className="muted-message">No source chain captured.</p>;
  return (
    <ul className="application-link-candidates">
      {sourceChain.map((item, index) => (
        <li key={`${item.role}:${item.url || item.email || index}`}>
          <span>{item.role.replaceAll("_", " ")} · {item.status || "candidate"}</span>
          {item.url ? renderApplicationSourceLink(item.url) : item.email ? <small>{item.email}</small> : null}
          {item.sourceField ? <small>{item.sourceField}</small> : null}
          {item.reason ? <small>{item.reason}</small> : null}
        </li>
      ))}
    </ul>
  );
}

function applicationPathResultSummary(profile: ApplicationPathProfile) {
  const discoveryStatus = applicationPathDiscoveryStatus(profile);
  const hasEmailPath = applicationPathMethod(profile) === "email" && Boolean(applicationPathContactEmail(profile));
  if (profile.applicationStatus === "source_unreadable_or_js_required" || discoveryStatus === "source_unreadable_or_js_required") {
    return "Requirements not extracted: source blocked, unreadable, or JavaScript required.";
  }
  if (profile.applicationStatus === "needs_user_selection" || discoveryStatus === "needs_user_selection") {
    return "Requirements not extracted: official page requires user selection.";
  }
  if (profile.applicationStatus === "closed") {
    return "Application currently closed.";
  }
  if (profile.applicationStatus === "funding_exhausted") {
    return "Application currently closed/funding exhausted.";
  }
  if (profile.discoveredApplicationUrl || applicationPathPdfUrl(profile) || hasEmailPath) {
    return "Application path found.";
  }
  if (discoveryStatus === "program_website_only" || discoveryStatus === "program_website_found") {
    return "Program website found; no direct application path found yet.";
  }
  if (discoveryStatus === "source_only") {
    return "Source only. Application URL not found.";
  }
  if (profile.programWebsiteUrl) {
    return "Program website found, application URL not found.";
  }
  if (discoveryStatus === "unreadable" || profile.pathStatus === "source_unreadable" || profile.pathStatus === "source_unreadable_or_js_required") {
    return "Source unreadable.";
  }
  if (profile.pathStatus === "program_source_only") {
    return "Source only. Application URL not found.";
  }
  return profile.notes[0] || "Needs review.";
}

function truncateLinkLabel(value: string, maxLength = 44) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}...`;
}

function formatApplicationSourceLabel(value: ApplicationSourceType) {
  if (value === "utility_portal") return "Utility portal";
  if (value === "tax_guidance") return "Tax guidance";
  if (value === "contractor_submitted") return "Contractor-submitted";
  return value.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatApplicationMethodLabel(value: ApplicationMethod) {
  if (value === "online_portal") return "Online portal";
  if (value === "online_form") return "Online form";
  if (value === "utility_portal") return "Utility portal";
  if (value === "grant_package") return "Grant package";
  if (value === "hybrid_email_online_portal") return "Hybrid email + online portal";
  if (value === "tax_accountant_filing") return "Tax/accountant filing";
  if (value === "contractor_submitted") return "Contractor-submitted";
  if (value === "program_website_only") return "Program website only";
  if (value === "source_only") return "Source only";
  if (value === "needs_review") return "Needs review";
  if (value === "unreadable") return "Unreadable";
  return value.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatApplicationLinkDiscoveryStatus(value: ApplicationLinkDiscoveryStatus) {
  if (value === "application_link_found") return "Application link found";
  if (value === "pdf_found") return "PDF found";
  if (value === "email_found") return "Email application found";
  if (value === "program_website_found") return "Program website found";
  if (value === "source_only") return "Source only";
  if (value === "source_unreadable") return "Source unreadable";
  if (value === "source_unreadable_or_js_required") return "Source unreadable/JS required";
  if (value === "needs_review") return "Needs review";
  return (value as string).replace(/_/g, " ").replace(/\b\w/g, (character: string) => character.toUpperCase());
}

function formatApplicationLinkCandidateType(value: ApplicationLinkCandidateType) {
  if (value === "application_url") return "Application URL";
  if (value === "pdf_application") return "PDF application";
  if (value === "program_website") return "Program website";
  if (value === "contact_email") return "Contact email";
  if (value === "contractor_portal") return "Contractor portal";
  if (value === "tax_guidance") return "Tax guidance";
  if (value === "forms_page") return "Forms page";
  if (value === "application_instructions") return "Application instructions";
  return value.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatExtractionStatusLabel(value: SourceExtractionStatus) {
  if (value === "source_found") return "Source found";
  if (value === "source_missing") return "Source missing";
  if (value === "needs_review") return "Needs review";
  return "Not started";
}

function formatApplicationPathStatusLabel(value: ApplicationPathStatus) {
  if (value === "application_path_found") return "Path found";
  if (value === "program_website_found") return "Program website found";
  if (value === "program_website_only") return "Program website only";
  if (value === "source_only") return "Source only";
  if (value === "program_source_only") return "Source only";
  if (value === "contact_only") return "Contact only";
  if (value === "unreadable") return "Unreadable";
  if (value === "source_unreadable") return "Unreadable";
  if (value === "source_unreadable_or_js_required") return "Unreadable/JS required";
  if (value === "needs_user_selection") return "Needs user selection";
  if (value === "not_attempted") return "Not attempted";
  return "Needs review";
}

function formatRequirementExtractionStatus(value: RequirementExtractionStatus) {
  if (value === "requirements_extracted") return "Requirements extracted";
  if (value === "source_unavailable") return "Source unavailable";
  if (value === "source_unreadable_or_js_required") return "Source unreadable/JS required";
  if (value === "needs_user_selection") return "Needs user selection";
  if (value === "not_attempted") return "Not attempted";
  if (value === "partial") return "Partial";
  return "Needs review";
}

function formatRequirementValue(value: RequirementValueStatus | undefined) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Unknown";
}

function formatRequirementTypeLabel(value: ApplicationRequirementType) {
  if (value === "account_number") return "Account number";
  return value.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatApplicationStatusLabel(value?: ApplicationStatus) {
  if (value === "open") return "Open";
  if (value === "closed") return "Closed";
  if (value === "funding_exhausted") return "Funding exhausted";
  if (value === "future_round_expected") return "Future round expected";
  if (value === "source_unreadable_or_js_required") return "Source unreadable/JS required";
  if (value === "needs_user_selection") return "Needs user selection";
  if (value === "needs_review") return "Needs review";
  return "Unknown";
}

function formatProfileReviewStatus(value?: ApplicationProfileReviewStatus) {
  if (value === "ai_extracted") return "AI extracted";
  if (value === "needs_review") return "Needs review";
  if (value === "needs_targeted_cleanup") return "Needs targeted cleanup";
  if (value === "admin_reviewed") return "Admin reviewed";
  if (value === "rejected") return "Rejected";
  if (value === "archived") return "Archived";
  return "Unknown";
}

function formatProfileQualityLabel(value?: string) {
  const text = value || "unknown";
  return text.replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatApplicationMethodStatusLabel(value: ApplicationMethodStatus) {
  if (value === "confirmed") return "confirmed";
  if (value === "inferred") return "inferred";
  return "unknown";
}

function applicationSourceStatusClassName(value: SourceExtractionStatus) {
  if (value === "source_found") return "is-found";
  if (value === "source_missing") return "is-missing";
  if (value === "needs_review") return "is-review";
  return "is-pending";
}

function applicationPathStatusClassName(value: ApplicationPathStatus) {
  if (value === "application_path_found") return "is-found";
  if (value === "unreadable") return "is-missing";
  if (value === "source_unreadable") return "is-missing";
  if (value === "source_unreadable_or_js_required") return "is-missing";
  if (value === "program_website_found" || value === "program_website_only" || value === "source_only" || value === "program_source_only" || value === "contact_only" || value === "needs_review" || value === "needs_user_selection") return "is-review";
  return "is-pending";
}

function requirementStatusClassName(value: RequirementExtractionStatus) {
  if (value === "requirements_extracted") return "is-found";
  if (value === "source_unavailable" || value === "source_unreadable_or_js_required") return "is-missing";
  if (value === "partial" || value === "needs_review" || value === "needs_user_selection") return "is-review";
  return "is-pending";
}

function profileReviewStatusClassName(value?: ApplicationProfileReviewStatus) {
  if (value === "admin_reviewed") return "is-found";
  if (value === "rejected" || value === "archived") return "is-missing";
  if (value === "needs_review" || value === "needs_targeted_cleanup") return "is-review";
  return "is-pending";
}

function OpportunityReviewPanel({
  credential,
  dataTable,
  isLoading,
  onOpportunityUpdated,
  onRefresh
}: {
  credential: AuthCredential | null;
  dataTable: DatabaseTableSnapshot;
  isLoading: boolean;
  onOpportunityUpdated: (opportunity: OpportunityRecord) => void;
  onRefresh: () => void;
}) {
  const records = asOpportunityRecords(dataTable.records);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [programTypeFilter, setProgramTypeFilter] = useState("");
  const [reviewStatusFilter, setReviewStatusFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [warningFilter, setWarningFilter] = useState("");
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(records[0]?.opportunityId || "");

  const sourceOptions = uniqueSorted(records.map((record) => record.sourceName || record.sourceKey || ""));
  const statusOptions = uniqueSorted(records.map((record) => record.status || ""));
  const programTypeOptions = uniqueSorted(records.map((record) => record.programType || ""));
  const reviewStatusOptions = uniqueSorted(records.map(getOpportunityReviewStatus));
  const stateOptions = uniqueSorted(records.map((record) => record.stateName || record.state || ""));
  const warningOptions = uniqueSorted(records.flatMap(getOpportunityWarnings));
  const normalizedSearch = search.trim().toLowerCase();
  const filteredRecords = records.filter((record) => {
    const sourceValue = record.sourceName || record.sourceKey || "";
    const stateValue = record.stateName || record.state || "";
    const haystack = [
      getOpportunityTitle(record),
      record.summary,
      record.sourceName,
      record.sourceKey,
      record.status,
      record.programType,
      record.category,
      record.stateName,
      record.state,
      record.administrator,
      getOpportunityTechnologies(record).join(" "),
      getOpportunityBusinessClassifications(record).join(" "),
      getOpportunityWarnings(record).join(" ")
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!normalizedSearch || haystack.includes(normalizedSearch)) &&
      (!sourceFilter || sourceValue === sourceFilter) &&
      (!statusFilter || record.status === statusFilter) &&
      (!programTypeFilter || record.programType === programTypeFilter) &&
      (!reviewStatusFilter || getOpportunityReviewStatus(record) === reviewStatusFilter) &&
      (!stateFilter || stateValue === stateFilter) &&
      (!warningFilter || getOpportunityWarnings(record).includes(warningFilter))
    );
  });
  const selectedOpportunity =
    filteredRecords.find((record) => record.opportunityId === selectedOpportunityId) || filteredRecords[0] || null;

  useEffect(() => {
    if (!selectedOpportunity && filteredRecords.length > 0) {
      setSelectedOpportunityId(filteredRecords[0].opportunityId);
    }
  }, [filteredRecords, selectedOpportunity]);

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Opportunity review</p>
          <h2>{dataTable.recordCount} opportunity candidates</h2>
        </div>
        <button className="secondary-button" disabled={isLoading} onClick={onRefresh} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="review-filters">
        <label className="field">
          <span>Search</span>
          <input
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Title, source, warning, technology"
            type="search"
            value={search}
          />
        </label>
        <ReviewSelect label="Source" onChange={setSourceFilter} options={sourceOptions} value={sourceFilter} />
        <ReviewSelect label="Status" onChange={setStatusFilter} options={statusOptions} value={statusFilter} />
        <ReviewSelect
          label="Program type"
          onChange={setProgramTypeFilter}
          options={programTypeOptions}
          value={programTypeFilter}
        />
        <ReviewSelect
          label="Review status"
          onChange={setReviewStatusFilter}
          options={reviewStatusOptions}
          value={reviewStatusFilter}
        />
        <ReviewSelect label="State" onChange={setStateFilter} options={stateOptions} value={stateFilter} />
        <ReviewSelect label="Warning" onChange={setWarningFilter} options={warningOptions} value={warningFilter} />
      </div>

      <div className="review-count-row">
        <strong>{filteredRecords.length} shown</strong>
        <span>
          {dataTable.isTruncated
            ? `${records.length} loaded of ${dataTable.recordCount} DynamoDB records`
            : `${records.length} loaded from DynamoDB`}
        </span>
      </div>

      {dataTable.note ? <p className="muted-message">{dataTable.note}</p> : null}

      <div className="opportunity-review-layout">
        <div className="opportunity-list" aria-label="Opportunity candidates">
          {isLoading && filteredRecords.length === 0 ? (
            <RetroFiSkeleton variant="list" rows={6} label="Loading opportunity candidates" />
          ) : filteredRecords.length === 0 ? (
            <p className="empty-state">No opportunities match the current filters.</p>
          ) : (
            filteredRecords.map((record) => (
              <button
                aria-current={record.opportunityId === selectedOpportunity?.opportunityId ? "true" : undefined}
                className="opportunity-list-item"
                key={record.opportunityId}
                onClick={() => setSelectedOpportunityId(record.opportunityId)}
                type="button"
              >
                <span>
                  <strong>{getOpportunityTitle(record)}</strong>
                  <small>{record.sourceName || record.sourceKey || "Unknown source"}</small>
                </span>
                <span className="status-stack">
                  <mark>{getOpportunityReviewStatus(record)}</mark>
                  <small>{record.status || "unknown"} / {record.programType || "unknown"}</small>
                </span>
              </button>
            ))
          )}
        </div>

        <OpportunityDetailPanel
          credential={credential}
          opportunity={selectedOpportunity}
          onOpportunityUpdated={onOpportunityUpdated}
        />
      </div>
    </section>
  );
}

function ReviewSelect({
  label,
  onChange,
  options,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function OpportunityDetailPanel({
  credential,
  opportunity,
  onOpportunityUpdated
}: {
  credential: AuthCredential | null;
  opportunity: OpportunityRecord | null;
  onOpportunityUpdated: (opportunity: OpportunityRecord) => void;
}) {
  const [notes, setNotes] = useState("");
  const [duplicateOf, setDuplicateOf] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setNotes(opportunity?.reviewNotes || "");
    setDuplicateOf(opportunity?.duplicateOf || "");
    setError(null);
    setMessage(null);
  }, [opportunity?.opportunityId, opportunity?.reviewNotes, opportunity?.duplicateOf]);

  if (!opportunity) {
    return (
      <article className="opportunity-detail">
        <p className="empty-state">Select an opportunity to review.</p>
      </article>
    );
  }

  const warnings = getOpportunityWarnings(opportunity);
  const businessClassifications = getOpportunityBusinessClassifications(opportunity);
  const technologies = getOpportunityTechnologies(opportunity);
  const evidence = Array.isArray(opportunity.evidence) ? opportunity.evidence : [];
  const sourceLinkLabel = opportunity.sourceName === "DSIRE" || opportunity.sourceKey === "SOURCE_DSIRE" ? "DSIRE source" : "Source page";
  const dsireMetadata = {
    IUID: opportunity.IUID,
    sourceRecords: opportunity.sourceRecords,
    externalId: opportunity.externalId,
    externalIdType: opportunity.externalIdType,
    ingestionMode: opportunity.ingestionMode,
    ingestRunId: opportunity.ingestRunId,
    dsire: opportunity.dsire,
    geography: opportunity.geography,
    detailLabels: opportunity.detailLabels,
    contentHash: opportunity.contentHash,
    previousContentHash: opportunity.previousContentHash
  };

  async function submitReview(status: string) {
    const currentOpportunity = opportunity;
    if (!currentOpportunity) {
      setError("Select an opportunity before saving review changes.");
      return;
    }

    if (!credential) {
      setError("Sign in again before saving review changes.");
      return;
    }

    if (status === "duplicate" && !duplicateOf.trim()) {
      setError("Enter the opportunity ID this record duplicates.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setMessage(null);
    try {
      const opportunityId = currentOpportunity.opportunityId;
      const response = await apiPost<OpportunityReviewResponse>(
        `/api/admin/opportunities/${encodeURIComponent(opportunityId)}/review`,
        {
          ...adminAuthBody(credential),
          status,
          notes,
          duplicateOf
        }
      );
      onOpportunityUpdated(response.opportunity);
      setMessage("Review saved.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not save review.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <article className="opportunity-detail">
      <div className="opportunity-detail-header">
        <div>
          <p className="eyebrow">{opportunity.sourceName || opportunity.sourceKey || "Opportunity"}</p>
          <h3>{getOpportunityTitle(opportunity)}</h3>
        </div>
        <div className="status-stack">
          <mark>{getOpportunityReviewStatus(opportunity)}</mark>
          <small>{opportunity.status || "unknown"} / {opportunity.programType || "unknown"}</small>
        </div>
      </div>

      <div className="review-actions">
        <div className="review-button-row">
          <button disabled={isSaving} onClick={() => void submitReview("approved")} type="button">
            Approve
          </button>
          <button
            className="secondary-button"
            disabled={isSaving}
            onClick={() => void submitReview("needs_review")}
            type="button"
          >
            Needs review
          </button>
          <button
            className="danger-button"
            disabled={isSaving}
            onClick={() => void submitReview("rejected")}
            type="button"
          >
            Reject
          </button>
          <button
            className="secondary-button"
            disabled={isSaving}
            onClick={() => void submitReview("duplicate")}
            type="button"
          >
            Mark duplicate
          </button>
        </div>

        <label className="field">
          <span>Duplicate of</span>
          <input
            onChange={(event) => setDuplicateOf(event.target.value)}
            placeholder="Opportunity ID"
            value={duplicateOf}
          />
        </label>

        <label className="field field-wide">
          <span>Review notes</span>
          <textarea onChange={(event) => setNotes(event.target.value)} value={notes} />
        </label>

        <button
          className="secondary-button"
          disabled={isSaving}
          onClick={() => void submitReview(getOpportunityReviewStatus(opportunity))}
          type="button"
        >
          {isSaving ? "Saving..." : "Save notes"}
        </button>
        {message ? <p className="success-message">{message}</p> : null}
        {error ? <p className="error-message">{error}</p> : null}
      </div>

      <div className="opportunity-summary-grid">
        <DetailItem label="Source" value={opportunity.sourceName || opportunity.sourceKey || "Unknown"} />
        <DetailItem label="Program type" value={opportunity.programType || "Unknown"} />
        <DetailItem label="Category" value={opportunity.category || "Unknown"} />
        <DetailItem label="State" value={opportunity.stateName || opportunity.state || "Unknown"} />
        <DetailItem label="Administrator" value={opportunity.administrator || "Unknown"} />
        <DetailItem label="Sectors" value={businessClassifications.join(", ") || "Not specified"} />
        <DetailItem label="Technologies" value={technologies.join(", ") || "Not classified"} />
        <DetailItem label="External ID" value={opportunity.externalId || "Unknown"} />
      </div>

      <section className="detail-section">
        <h4>Summary</h4>
        <p>{opportunity.summary || "No summary stored."}</p>
      </section>

      <section className="detail-section">
        <h4>Source links</h4>
        <div className="link-list">
          {opportunity.sourceUrl ? (
            <a href={opportunity.sourceUrl} rel="noreferrer" target="_blank">
              {sourceLinkLabel}
            </a>
          ) : null}
          {opportunity.applicationUrl ? (
            <a href={opportunity.applicationUrl} rel="noreferrer" target="_blank">
              Application
            </a>
          ) : null}
          {opportunity.websiteUrl && opportunity.websiteUrl !== opportunity.sourceUrl ? (
            <a href={opportunity.websiteUrl} rel="noreferrer" target="_blank">
              Website
            </a>
          ) : null}
        </div>
      </section>

      <section className="detail-section">
        <h4>Warnings</h4>
        {warnings.length > 0 ? (
          <div className="pill-row">
            {warnings.map((warning) => (
              <span key={warning}>{warning}</span>
            ))}
          </div>
        ) : (
          <p>No warnings.</p>
        )}
      </section>

      <section className="detail-section">
        <h4>Evidence</h4>
        <pre>{compactJson(evidence)}</pre>
      </section>

      <section className="detail-section">
        <h4>DSIRE metadata</h4>
        <pre>{compactJson(dsireMetadata)}</pre>
      </section>

      <section className="detail-section">
        <h4>Raw record</h4>
        <pre>{compactJson(opportunity.raw ?? opportunity)}</pre>
      </section>
    </article>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatScenarioTabLabel(name?: string) {
  if (!name) return "Scenario not selected";
  if (name.includes("Scenario A")) return "Scenario A";
  if (name.includes("Scenario B")) return "Scenario B";
  if (name.includes("Scenario C")) return "Scenario C";
  if (name.includes("Scenario D")) return "Scenario D";
  return name;
}

function assumptionAffects(label: string) {
  const value = label.toLowerCase();
  if (value.includes("cost") || value.includes("quote") || value.includes("labor")) return ["Project cost", "Net cost", "Payback"];
  if (value.includes("tax")) return ["Tax benefits", "Effective cost"];
  if (value.includes("rate") || value.includes("kwh") || value.includes("watt") || value.includes("hour")) return ["Operating savings", "Payback", "ROI"];
  if (value.includes("charger") || value.includes("utilization") || value.includes("fuel")) return ["Net recurring operational impact", "Payback"];
  if (value.includes("r-value") || value.includes("insulation") || value.includes("area")) return ["Operating savings", "Project scope"];
  return ["Estimate completeness"];
}

function detailQuestionGuidance(question: string) {
  const value = question.toLowerCase();
  if (value.includes("quote")) {
    return {
      reason: "Confirms project cost and incentive caps.",
      affects: ["Project cost", "Payback", "ROI"]
    };
  }
  if (value.includes("utility") || value.includes("panel") || value.includes("fuel") || value.includes("baseline")) {
    return {
      reason: "Validates eligibility and recurring impact assumptions.",
      affects: ["Eligibility", "Operating savings", "Payback"]
    };
  }
  if (value.includes("how many") || value.includes("count") || value.includes("area") || value.includes("roof")) {
    return {
      reason: "Sets the retrofit quantity used in the estimate.",
      affects: ["Project cost", "Incentives", "Savings"]
    };
  }
  if (value.includes("hours") || value.includes("utilization") || value.includes("usage")) {
    return {
      reason: "Improves recurring savings and payback estimates.",
      affects: ["Operating savings", "Payback", "ROI"]
    };
  }
  return {
    reason: "Improves the estimate and eligibility review.",
    affects: ["Estimate completeness", "Eligibility"]
  };
}

function missingInfoGuidance(item: string) {
  const value = item.toLowerCase();
  if (value.includes("quote")) {
    return {
      reason: "Needed to confirm upfront cost, incentive caps, payback, and ROI.",
      affects: "Project cost, net cost, payback, ROI",
      action: "Add quote"
    };
  }
  if (value.includes("tax")) {
    return {
      reason: "Needed to estimate one-time and recurring tax benefits.",
      affects: "Tax benefits and effective cost",
      action: "Add tax profile"
    };
  }
  if (value.includes("utility") || value.includes("territory")) {
    return {
      reason: "Needed to confirm program eligibility.",
      affects: "Opportunity eligibility",
      action: "Confirm utility"
    };
  }
  if (value.includes("bill")) {
    return {
      reason: "Needed to estimate electricity, gas, or water savings.",
      affects: "Operating savings, payback, ROI",
      action: "Upload bill"
    };
  }
  if (value.includes("fuel") || value.includes("utilization")) {
    return {
      reason: "Needed to estimate fuel displacement, charging revenue, and net recurring operational impact.",
      affects: "Operating savings, payback, ROI",
      action: "Enter details"
    };
  }
  if (value.includes("insulation") || value.includes("r-value")) {
    return {
      reason: "Needed to confirm project scope and weatherization savings.",
      affects: "Project cost, operating savings, payback",
      action: "Enter details"
    };
  }
  if (value.includes("charger") || value.includes("roof") || value.includes("equipment") || value.includes("fixture") || value.includes("operating hours")) {
    return {
      reason: "Needed to confirm retrofit quantity, scope, and savings assumptions.",
      affects: "Project cost, incentives, operating savings, payback",
      action: "Enter details"
    };
  }
  return {
    reason: "Needed to improve this retrofit estimate.",
    affects: "Estimate completeness and eligibility",
    action: "Enter details"
  };
}

function WorkspaceLayout({
  activeNavItem,
  children,
  navItems,
  onNavItemChange,
  onSignOut,
  title,
  user
}: {
  activeNavItem?: string;
  children: ReactNode;
  navItems: string[];
  onNavItemChange?: (item: string) => void;
  onSignOut: () => void;
  title: string;
  user: UserRecord;
}) {
  const currentNavItem = activeNavItem || navItems[0];

  return (
    <div className="workspace-layout">
      <aside className="workspace-sidebar">
        <div className="brand-block">
          <img alt="RetroFi" className="workspace-logo" src="/retrofi-logo.png" />
          <div>
            <strong>{user.role === "admin" ? "Admin Workspace" : "User Workspace"}</strong>
          </div>
        </div>
        <nav className="workspace-nav" aria-label={`${title} sections`}>
          {navItems.map((item) => (
            <button
              aria-current={item === currentNavItem ? "page" : undefined}
              key={item}
              onClick={() => onNavItemChange?.(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="workspace-account" title={`${user.fullName} (${user.email})`}>
          <span className="workspace-avatar" aria-hidden="true">
            {user.googlePicture ? (
              <img alt="" src={user.googlePicture} />
            ) : (
              <span>{workspaceUserInitials(user)}</span>
            )}
          </span>
          <button onClick={onSignOut} type="button">
            Sign out
          </button>
        </div>
      </aside>
      <main className="workspace-main">
        {children}
      </main>
    </div>
  );
}

function workspaceUserInitials(user: UserRecord) {
  const source = user.fullName || user.email || "User";
  const parts = source
    .replace(/@.*/, "")
    .split(/\s+|[._-]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
  return initials || "U";
}

function ProfilePanel({ intake, user }: { intake: IntakeRecord | null; user: UserRecord }) {
  if (!intake) {
    return (
      <section className="profile-grid">
        <article>
          <p className="eyebrow">Account</p>
          <h2>{user.role === "admin" ? "Admin account" : "No intake record found"}</h2>
          <p>This Google account is active, but it is not attached to a client intake submission.</p>
        </article>
      </section>
    );
  }

  return (
    <section className="profile-grid">
      <article>
        <p className="eyebrow">Google account</p>
        <h2>{user.email}</h2>
        <p>This profile opens when you sign in with the matching Google account.</p>
      </article>
      <article>
        <p className="eyebrow">Contact</p>
        <dl>
          <dt>Name</dt>
          <dd>{intake.contact.fullName || "Not provided"}</dd>
          <dt>Email</dt>
          <dd>{intake.contact.email}</dd>
          <dt>Phone</dt>
          <dd>{intake.contact.phone || "Not provided"}</dd>
          <dt>Role/title</dt>
          <dd>{intake.contact.roleTitle || "Not provided"}</dd>
        </dl>
      </article>
      <article>
        <p className="eyebrow">Business</p>
        <dl>
          <dt>Company</dt>
          <dd>{intake.business.companyName || "Not provided"}</dd>
          <dt>Organization type</dt>
          <dd>{intake.business.organizationType || "Not provided"}</dd>
          <dt>Size</dt>
          <dd>{intake.business.organizationSize || "Not provided"}</dd>
          <dt>Region</dt>
          <dd>{intake.business.headquarters || "Not provided"}</dd>
        </dl>
      </article>
      <article>
        <p className="eyebrow">Site and building</p>
        <dl>
          <dt>Site address</dt>
          <dd>{intake.site?.address || "Not provided"}</dd>
          <dt>Electric utility provider</dt>
          <dd>{intake.site?.electricUtilityProvider || "Not provided"}</dd>
          <dt>Gas utility provider</dt>
          <dd>{intake.site?.gasUtilityProvider || "Not provided"}</dd>
          <dt>Ownership status</dt>
          <dd>{intake.site?.ownershipStatus || "Not provided"}</dd>
          <dt>Building type</dt>
          <dd>{intake.site?.buildingType || "Not provided"}</dd>
          <dt>Number of units</dt>
          <dd>{intake.site?.numberOfUnits || "Not provided"}</dd>
          <dt>Square footage</dt>
          <dd>{intake.site?.squareFootage || "Not provided"}</dd>
        </dl>
      </article>
      <article className="profile-wide">
        <p className="eyebrow">Sustainability priorities</p>
        <dl>
          <dt>Goals</dt>
          <dd>{intake.sustainability.goals}</dd>
          <dt>Current challenges</dt>
          <dd>{intake.sustainability.currentChallenges}</dd>
          <dt>Timeline</dt>
          <dd>{intake.sustainability.timeline}</dd>
          <dt>Notes</dt>
          <dd>{intake.sustainability.notes || "No additional notes"}</dd>
        </dl>
      </article>
      <article className="profile-wide">
        <p className="eyebrow">Utility Data</p>
        <dl>
          <dt>Uploaded files</dt>
          <dd>{intake.uploadedUtilityFiles.length ? `${intake.uploadedUtilityFiles.length} file(s)` : "None uploaded"}</dd>
          <dt>Processed files</dt>
          <dd>{intake.siteEnergyProfile?.processedFileCount ?? 0}</dd>
          <dt>Latest utility</dt>
          <dd>{intake.siteEnergyProfile?.latestUtilityProvider || "Not detected"}</dd>
          <dt>Utility categories</dt>
          <dd>
            {intake.siteEnergyProfile?.utilitySummaries?.length
              ? intake.siteEnergyProfile.utilitySummaries.map((summary) => formatUtilityCategory(summary.utilityCategory)).join(", ")
              : "None detected"}
          </dd>
          <dt>Billing period</dt>
          <dd>{formatUtilityPeriod(intake.siteEnergyProfile?.latestBillingPeriodStart || null, intake.siteEnergyProfile?.latestBillingPeriodEnd || null)}</dd>
          <dt>Available bill fields</dt>
          <dd>{intake.siteEnergyProfile?.availableFieldIds.join(", ") || "None extracted yet"}</dd>
        </dl>
        <div className="card-grid three compact-cards">
          {intake.uploadedUtilityFiles.map((file) => (
            <article className="feature-card" key={file.fileId}>
              <span className="eyebrow">{energyDataSourceTypeLabels[file.fileType]}</span>
              <h3>{file.originalFilename}</h3>
              <p>Category: {formatUtilityCategory(file.utilityCategory)}</p>
              <p>Status: {formatProcessingStatus(file.processingStatus)}</p>
              <p>{file.utilityProvider || "Utility pending"}</p>
              {file.errorMessage ? <p className="error-message">{file.errorMessage}</p> : null}
            </article>
          ))}
          {intake.uploadedUtilityFiles.length === 0 ? (
            <article className="feature-card">
              <span className="eyebrow">Uploads</span>
              <h3>No utility files</h3>
              <p>Green Button XML, CSV, and utility PDF uploads will appear here.</p>
            </article>
          ) : null}
        </div>
        <div className="card-grid three compact-cards">
          {intake.utilityExtractedValues.map((value) => (
            <article className="feature-card" key={value.extractedValueId}>
              <span className="eyebrow">{value.fieldDisplayName}</span>
              <h3>{formatUtilityFieldValue(value)}</h3>
              <p>Period: {formatUtilityPeriod(value.periodStart, value.periodEnd)}</p>
              <p>Confidence: {value.confidence || "Not scored"}</p>
            </article>
          ))}
          {intake.utilityExtractedValues.length === 0 ? (
            <article className="feature-card">
              <span className="eyebrow">Extracted values</span>
              <h3>No values extracted</h3>
              <p>Processed Green Button files will populate bill and usage values here.</p>
            </article>
          ) : null}
        </div>
      </article>
    </section>
  );
}

export function App() {
  const [route, setRoute] = useState<Route>(routeFromPath);
  const [authPayload, setAuthPayload] = useState<AuthPayload | null>(null);
  const [authCredential, setAuthCredential] = useState<AuthCredential | null>(null);
  const [signInMessage, setSignInMessage] = useState<string | null>(null);
  const [isAuthRestoring, setIsAuthRestoring] = useState(true);
  const pendingPublicScrollTargetRef = useRef<string | null>(null);
  const isAdminSignedIn = authPayload?.dashboard === "admin";

  useEffect(() => {
    function syncRoute() {
      const nextRoute = routeFromPath();
      if (window.location.pathname === "/database") {
        window.history.replaceState({}, "", pathForRoute(nextRoute));
      } else if (shouldCanonicalizeUnknownHomeFallback()) {
        window.history.replaceState({}, "", pathForRoute("home"));
      }
      setRoute(nextRoute);
    }
    syncRoute();
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    for (const key of STALE_SESSION_KEYS) {
      window.localStorage.removeItem(key);
    }
  }, []);

  useEffect(() => {
    if (route !== "home") {
      return undefined;
    }

    const targetFromHash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
    const targetId = pendingPublicScrollTargetRef.current || targetFromHash;

    if (!targetId) {
      return undefined;
    }

    let animationFrame = 0;
    let attempts = 0;

    const scrollToTarget = (behavior: ScrollBehavior) => {
      const section = document.getElementById(targetId);

      if (!section) {
        return false;
      }

      const headerOffset = 96;
      const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerOffset);
      window.scrollTo({ behavior, top });
      return true;
    };

    const tryScroll = () => {
      attempts += 1;
      if (scrollToTarget(pendingPublicScrollTargetRef.current ? "smooth" : "auto")) {
        pendingPublicScrollTargetRef.current = null;
        return;
      }

      if (attempts < 12) {
        animationFrame = window.requestAnimationFrame(tryScroll);
      }
    };

    animationFrame = window.requestAnimationFrame(tryScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [route]);

  useEffect(() => {
    let isMounted = true;
    const redirectResult = takeOAuthRedirectResult();
    if (redirectResult) {
      storeAuthCredential(redirectResult.credential);
      setAuthPayload(redirectResult.payload);
      setAuthCredential(redirectResult.credential);
      setSignInMessage(null);
      setIsAuthRestoring(false);
      return;
    }

    const redirectError = takeOAuthRedirectError();
    if (redirectError) {
      setSignInMessage(redirectError);
    }

    const storedCredential = readStoredAuthCredential();
    if (!storedCredential) {
      setIsAuthRestoring(false);
      return;
    }

    refreshStoredAuthPayload(storedCredential)
      .then((payload) => {
        if (!isMounted) return;
        setAuthPayload(payload);
        setAuthCredential(storedCredential);
        setSignInMessage(null);
      })
      .catch(() => {
        if (!isMounted) return;
        clearStoredAuthCredential();
        setSignInMessage("Your session expired. Sign in again.");
      })
      .finally(() => {
        if (isMounted) {
          setIsAuthRestoring(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function navigate(nextRoute: Route) {
    const path = pathForRoute(nextRoute);
    window.history.pushState({}, "", path);
    setRoute(nextRoute);
  }

  function openHomeHowItWorks() {
    const sectionId = "home-how-it-works";
    pendingPublicScrollTargetRef.current = sectionId;

    if (route !== "home") {
      window.history.pushState({}, "", `${pathForRoute("home")}#${sectionId}`);
      setRoute("home");
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 96;
      const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerOffset);
      window.history.replaceState({}, "", `${pathForRoute("home")}#${sectionId}`);
      window.scrollTo({ behavior: "smooth", top });
      pendingPublicScrollTargetRef.current = null;
    }
  }

  function handleAuthSuccess(payload: AuthPayload, credential: AuthCredential) {
    storeAuthCredential(credential);
    setAuthPayload(payload);
    setAuthCredential(credential);
    setSignInMessage(null);
    navigate(
      payload.dashboard === "admin"
        ? route === "testcases" ||
          route === "user-preview" ||
          route === "chats" ||
          route === "admin-dashboard-performance-data" ||
          route === "admin-application-sources" ||
          route === "admin-application-profiles" ||
          route === "tasks" ||
          route === "task-report"
          ? route
          : "admin"
        : "portal"
    );
  }

  function signOut() {
    clearStoredAuthCredential();
    clearStoredEnergyDataUploadSession();
    setAuthPayload(null);
    setAuthCredential(null);
    setSignInMessage(null);
    navigate("home");
  }

  if (isAuthRestoring) {
    if (isAppChromeRoute(route)) {
      return <AppSessionRestoringPage />;
    }

    return <SessionRestoringPage />;
  }

  const publicAuth: PublicAuthState = {
    isAdmin: isAdminSignedIn,
    isSignedIn: Boolean(authPayload),
    onSignOut: signOut
  };
  const effectiveRoute = route;
  const portalPreviewSearchParams =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const portalPreviewUserId = portalPreviewSearchParams.get("userId") || "";
  const portalPreviewHint =
    portalPreviewUserId
      ? {
          clientName: portalPreviewSearchParams.get("clientName") || "Selected client",
          companyName: portalPreviewSearchParams.get("companyName"),
          email: portalPreviewSearchParams.get("email") || ""
        }
      : null;

  if (effectiveRoute === "how-it-works") {
    return <HowItWorksPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "pricing") {
    return <PricingPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "about") {
    return <AboutPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "about-mission") {
    return <MissionPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "about-team") {
    return <TeamPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "about-trust") {
    return <TrustPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "about-contact") {
    return <ContactPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "scan") {
    return <IntakePage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "scan-results") {
    return <ScanResultsPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "scan-energy-data") {
    return <EnergyDataUploadPage navigate={navigate} publicAuth={publicAuth} />;
  }

  if (effectiveRoute === "sign-in") {
    return (
      <SignInPage
        navigate={navigate}
        message={signInMessage}
        onAuthSuccess={handleAuthSuccess}
        publicAuth={publicAuth}
      />
    );
  }

  if (effectiveRoute === "testcases") {
    if (authPayload?.dashboard === "admin" && authPayload.adminDashboard) {
      return <AdminTestCasesStandalonePage />;
    }

    return (
      <SignInPage
        navigate={navigate}
        message={signInMessage}
        onAuthSuccess={handleAuthSuccess}
        publicAuth={publicAuth}
      />
    );
  }

  if (effectiveRoute === "tasks") {
    if (authPayload?.dashboard === "admin" && authPayload.adminDashboard) {
      return (
        <AdminTasksStandalonePage
          credential={authCredential}
          onSignOut={signOut}
          viewer={authPayload.user}
        />
      );
    }

    return <LocalFirstmateTasksStandalonePage />;
  }

  if (effectiveRoute === "chats") {
    if (authPayload?.dashboard === "admin" && authPayload.adminDashboard) {
      return (
        <AdminGptProChatsPage
          credential={authCredential}
          navigate={navigate}
          onSignOut={signOut}
          viewer={authPayload.user}
        />
      );
    }

    return <LocalGptProChatsStandalonePage />;
  }

  if (effectiveRoute === "task-report") {
    if (authPayload?.dashboard === "admin" && authPayload.adminDashboard) {
      return (
        <AdminTaskReportStandalonePage
          credential={authCredential}
          onSignOut={signOut}
          viewer={authPayload.user}
        />
      );
    }

    return <LocalFirstmateTaskReportStandalonePage />;
  }

  if (effectiveRoute === "user-preview") {
    if (authPayload?.dashboard === "admin" && authPayload.adminDashboard) {
      return (
        <AdminUserPreviewStandalonePage
          credential={authCredential}
          initialRows={authPayload.adminDashboard.users}
          onSignOut={signOut}
          viewer={authPayload.user}
        />
      );
    }

    return (
      <SignInPage
        navigate={navigate}
        message={signInMessage}
        onAuthSuccess={handleAuthSuccess}
        publicAuth={publicAuth}
      />
    );
  }

  if (effectiveRoute === "portal-preview") {
    if (!authPayload) {
      return (
        <SignInPage
          navigate={navigate}
          message={signInMessage}
          onAuthSuccess={handleAuthSuccess}
          publicAuth={publicAuth}
        />
      );
    }

    if (authPayload.dashboard !== "admin") {
      return <HomePage navigate={navigate} onHowItWorksClick={openHomeHowItWorks} publicAuth={publicAuth} />;
    }

    return (
      <AdminClientPortalPreviewPage
        credential={authCredential}
        onSignOut={signOut}
        previewHint={portalPreviewHint}
        userId={portalPreviewUserId}
        viewer={authPayload.user}
      />
    );
  }

  if (
    effectiveRoute === "portal" ||
    effectiveRoute === "admin" ||
    effectiveRoute === "admin-dashboard-performance-data" ||
    effectiveRoute === "admin-application-sources" ||
    effectiveRoute === "admin-application-profiles"
  ) {
    if (!authPayload) {
      return (
        <SignInPage
          navigate={navigate}
          message={signInMessage}
          onAuthSuccess={handleAuthSuccess}
          publicAuth={publicAuth}
        />
      );
    }

    if (authPayload.dashboard === "admin" && authPayload.adminDashboard) {
      return (
        <AdminDashboard
          credential={authCredential}
          initialTab={
            effectiveRoute === "admin-application-sources"
              ? ADMIN_APPLICATION_SOURCES_TAB
              : effectiveRoute === "admin-dashboard-performance-data"
                ? ADMIN_DASHBOARD_PERFORMANCE_TAB
              : effectiveRoute === "admin-application-profiles"
                ? ADMIN_APPLICATION_PROFILES_TAB
                : "Users"
          }
          onSignOut={signOut}
          payload={authPayload.adminDashboard}
        />
      );
    }

    return <UserDashboard credential={authCredential} onSignOut={signOut} payload={authPayload} />;
  }

  return <HomePage navigate={navigate} onHowItWorksClick={openHomeHowItWorks} publicAuth={publicAuth} />;
}
