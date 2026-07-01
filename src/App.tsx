import { CSSProperties, ChangeEvent, FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { apiGet, apiPost } from "./api";
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
import { aboutLinks, pathForRoute, routeFromPath, type Route } from "./routes";
import billFieldDictionary from "../data/bill_field_dictionary.json";

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
  isFakeUser: boolean;
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
    electricUtilityProvider: string;
    gasUtilityProvider?: string | null;
    ownershipStatus: string;
    buildingType: string;
    squareFootage: string;
    numberOfUnits?: string | null;
    derivedFieldsPlanned?: string[];
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
  summary: {
    matchedRetrofitCount: number;
    matchedOpportunityCount: number;
  };
  retrofits: SampleRetrofitGroup[];
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

type AdminTableResponse = {
  table: DatabaseTableSnapshot;
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
  kind?: "upfront_cost" | "upfront_savings" | "possible_grant";
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
  possibleGrantMoneyCents?: number | null;
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
  selectedIncentiveScenario?: {
    id?: string;
    name?: string;
    opportunityIds?: string[];
    incentiveRuleIds?: string[];
    status?: string;
    totalUpfrontSavingsCents?: number;
    possibleGrantMoneyCents?: number;
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
  onSignOut
}: {
  canStartScan?: boolean;
  isSignedIn?: boolean;
  navigate: (route: Route) => void;
  onSignOut?: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
    <header className="site-header">
      <div className="navbar-inner">
        <Brand onClick={() => go("home")} />
        <nav aria-label="Primary" className="site-nav">
          <button className="link-button" onClick={() => go("how-it-works")} type="button">
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
              Get Started
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
            Get Started
          </button>
        ) : null}
        {isMenuOpen ? (
          <div className="mobile-menu-panel">
            <button className="link-button" onClick={() => go("how-it-works")} type="button">
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
                Get Started
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
        <p>Helping businesses identify, fund, and plan high-value sustainability retrofits.</p>
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
  pageClassName,
  publicAuth,
  showFooter = false
}: {
  children: ReactNode;
  navigate: (route: Route) => void;
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

function HomePage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth} showFooter>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="hero-eyebrow">Sustainable. Profitable. Practical.</p>
          <h1>Maximize the value of every upgrade.</h1>
          <p className="hero-subheadline">
            RetroFi delivers your personalized retrofit implementation plan with funding opportunities, savings estimates, and
            prioritized next steps from start to finish.
          </p>
          <div className="hero-actions">
            <ScanStartButton navigate={navigate} publicAuth={publicAuth}>Get Started</ScanStartButton>
          </div>
        </div>
      </section>

      <section className="split-section problem-section">
        <div>
          <p className="eyebrow">The problem</p>
          <h2>Retrofit incentives are valuable, but hard to navigate.</h2>
        </div>
        <p>
          Programs are spread across utilities, government agencies, tax rules, and financing
          providers. RetroFi turns scattered information into a clear business roadmap.
        </p>
      </section>

      <section className="content-section">
        <SectionHeading
          copy="RetroFi connects program matching, savings context, and a decision-ready path forward."
          eyebrow="Platform focus"
          title="What RetroFi helps with"
        />
        <div className="card-grid three">
          {[
            [
              "Identify incentives",
              "Find rebates, tax incentives, grants, and financing options that may apply to your facility.",
              "incentives"
            ],
            ["Estimate savings", "Use business and utility data to estimate savings, ROI, and payback.", "savings"],
            ["Plan implementation", "Prioritize upgrades and understand the next steps to move forward.", "roadmap"]
          ].map(([title, copy, icon]) => (
            <article className="feature-card" key={title}>
              <FeatureIcon icon={icon as "incentives" | "savings" | "roadmap"} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section compact">
        <SectionHeading
          copy="The first step stays lightweight. The detailed work only starts when a site looks worth pursuing."
          eyebrow="Process"
          title="How RetroFi works"
        />
        <div className="step-grid">
          {["Tell us about your facility", "Get a free opportunity preview", "Unlock a detailed retrofit roadmap"].map(
            (step, index) => (
              <article className="step-card" key={step}>
                <span>{index + 1}</span>
                <h3>{step}</h3>
              </article>
            )
          )}
        </div>
        <button className="text-link with-icon" onClick={() => navigate("how-it-works")} type="button">
          View full process
          <ArrowUpRightIcon />
        </button>
      </section>

      <section className="trust-strip" aria-label="Trust commitments">
        {[
          "Your information is kept private",
          "Utility bills are used only for analysis",
          "Built for businesses, not consumers",
          "Recommendations are based on facility and program data"
        ].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="final-cta">
        <h2>See what opportunities your business may qualify for.</h2>
        <p>Start with a free scan. Upgrade only if deeper analysis is worth it.</p>
        <ScanStartButton navigate={navigate} publicAuth={publicAuth}>Get Started</ScanStartButton>
      </section>
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
  const steps = [
    {
      title: "Sign in and get started",
      copy: "Create your account in minutes, with no utility paperwork needed to begin.",
      shortTitle: "Sign in",
      icon: <LockIcon />,
      badge: "Easy first step"
    },
    {
      title: "Tell us about the property",
      copy: "Share a few basics so RetroFi can tailor the upgrade search to your home or building.",
      shortTitle: "Property info",
      icon: <BuildingOutlineIcon />,
      badge: null
    },
    {
      title: "Add utility bills or usage",
      copy: "Upload recent bills or enter usage data to sharpen the savings analysis.",
      shortTitle: "Bills or usage",
      icon: <StoreOutlineIcon />,
      badge: null
    },
    {
      title: "RetroFi runs the analysis",
      copy: "We match incentives, estimate savings, and rank the strongest retrofit opportunities.",
      shortTitle: "Analysis",
      icon: <LeafOutlineIcon />,
      badge: null
    },
    {
      title: "Review your results",
      copy: "See personalized recommendations, expected value, and clear next steps in one place.",
      shortTitle: "Results",
      icon: <EyeIcon />,
      badge: "Most valuable step"
    }
  ];
  const maxStepIndex = Math.max(steps.length - 1, 1);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);
  const timelineTrackRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = Math.round(timelineProgress * maxStepIndex);

  function clampTimelineProgress(value: number) {
    return Math.max(0, Math.min(1, value));
  }

  function updateTimelineProgressFromClientX(clientX: number) {
    const track = timelineTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return;
    setTimelineProgress(clampTimelineProgress((clientX - rect.left) / rect.width));
  }

  useEffect(() => {
    if (!isDraggingTimeline) return;

    function handlePointerMove(event: PointerEvent) {
      updateTimelineProgressFromClientX(event.clientX);
    }

    function handlePointerUp() {
      setIsDraggingTimeline(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDraggingTimeline]);

  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <section className="how-it-works-timeline-section">
        <div className="how-it-works-timeline-copy">
          <p className="eyebrow">How it works</p>
          <h1>Five quick steps to retrofit results</h1>
          <p>Drag through the process from sign-in to matched results.</p>
        </div>
        <div className="how-it-works-timeline-shell" aria-label="RetroFi step timeline">
          <div
            aria-label="Interactive timeline for the RetroFi process"
            aria-valuemax={steps.length}
            aria-valuemin={1}
            aria-valuenow={currentStepIndex + 1}
            className={isDraggingTimeline ? "how-it-works-timeline-track is-dragging" : "how-it-works-timeline-track"}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                setTimelineProgress((value) => clampTimelineProgress(value + 1 / maxStepIndex));
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                setTimelineProgress((value) => clampTimelineProgress(value - 1 / maxStepIndex));
              } else if (event.key === "Home") {
                event.preventDefault();
                setTimelineProgress(0);
              } else if (event.key === "End") {
                event.preventDefault();
                setTimelineProgress(1);
              }
            }}
            onPointerDown={(event) => {
              updateTimelineProgressFromClientX(event.clientX);
              setIsDraggingTimeline(true);
            }}
            ref={timelineTrackRef}
            role="slider"
            tabIndex={0}
          >
            <div className="how-it-works-timeline-line" />
            <div
              className="how-it-works-timeline-progress"
              style={{ width: `${timelineProgress * 100}%` }}
            />
            <div
              className="how-it-works-timeline-character"
              style={{ left: `calc(${timelineProgress * 100}% - 28px)` }}
            >
              <div className="timeline-character-head" />
              <div className="timeline-character-body" />
            </div>
          </div>
          <div className="how-it-works-timeline-steps">
            {steps.map((step, index) => {
              const stepProgress = index / maxStepIndex;
              const isReached = timelineProgress >= stepProgress;
              const isCurrent = currentStepIndex === index;
              return (
              <div
                className={
                  isCurrent
                    ? "how-it-works-timeline-step is-current"
                    : isReached
                      ? "how-it-works-timeline-step is-complete"
                      : "how-it-works-timeline-step"
                }
                key={step.title}
                style={{ "--timeline-step-scale": isCurrent ? 1.12 : isReached ? 1.04 : 0.96 } as CSSProperties}
              >
                <div className="how-it-works-timeline-step-box">
                  <span>{index + 1}</span>
                  <strong>{step.shortTitle}</strong>
                  <small>{step.copy}</small>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="final-cta">
        <h2>Start light, then decide if the deeper analysis is worth it.</h2>
        <p>RetroFi helps you get to personalized retrofit results without a long or intimidating setup.</p>
        <ScanStartButton navigate={navigate} publicAuth={publicAuth}>Get Started</ScanStartButton>
      </section>
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
        title="About RetroFi"
        copy="RetroFi helps businesses turn fragmented incentive programs and facility data into clear, actionable retrofit decisions."
      />
      <AboutSubnav navigate={navigate} />
      <section className="card-grid two about-hub-grid">
        <AboutHubCard
          copy="Learn how we’re making sustainability upgrades financially practical for businesses."
          icon="mission"
          label="Mission"
          navigate={navigate}
          route="about-mission"
          title="Why RetroFi exists"
        />
        <AboutHubCard
          copy="See who is building RetroFi and the roles behind the product."
          icon="team"
          label="Team"
          navigate={navigate}
          route="about-team"
          title="Meet the team"
        />
        <AboutHubCard
          copy="Understand how RetroFi uses business information and utility bills to prepare recommendations."
          icon="trust"
          label="Trust & Data"
          navigate={navigate}
          route="about-trust"
          title="How we handle business data"
        />
        <AboutHubCard
          copy="Reach out before creating a scan or uploading business information."
          icon="contact"
          label="Contact"
          navigate={navigate}
          route="about-contact"
          title="Questions before starting?"
        />
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
      <div className="database-load-progress-header">
        <span>{statusLabel}</span>
        <strong>{percent}%</strong>
      </div>
      <div
        aria-label={statusLabel}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        className="database-progress-track"
        role="progressbar"
      >
        <span style={{ width: `${percent}%` }} />
      </div>
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
        <p className="empty-state">Loading program details...</p>
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
            {isLoading ? <p>Loading your uploaded files…</p> : null}
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

function SessionRestoringPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <PublicShell navigate={navigate} pageClassName="sign-in-page" showFooter={false}>
      <section className="sign-in-panel session-restoring-panel">
        <p className="eyebrow">Session</p>
        <h1>Loading</h1>
        <p className="muted-message">Checking your signed-in session...</p>
      </section>
    </PublicShell>
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
          title="Retrofit Recommendations"
        />
      ) : (
        <ProfilePanel intake={payload.intake} user={payload.user} />
      )}
    </WorkspaceLayout>
  );
}

function CustomerRetrofitEstimatesPanel({
  credential,
  emptyMessage,
  endpoint,
  eyebrow,
  intro,
  loadingMessage,
  title
}: {
  credential: AuthCredential | null;
  emptyMessage: string;
  endpoint: string;
  eyebrow: string;
  intro: string;
  loadingMessage: string;
  title: string;
}) {
  const [payload, setPayload] = useState<PortalRetrofitRecommendationsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!credential) {
      setError("Sign in again to load retrofit estimates.");
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);
    setError(null);

    apiGet<PortalRetrofitRecommendationsResponse>(endpoint, {
      headers: adminAuthHeaders(credential)
    })
      .then((response) => {
        if (!isMounted) return;
        setPayload(response);
      })
      .catch((requestError) => {
        if (!isMounted) return;
        setError(requestError instanceof Error ? requestError.message : "Could not load retrofit estimates.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [credential, endpoint]);

  return (
    <RetrofitRecommendationsPreview
      emptyMessage={emptyMessage}
      error={error}
      eyebrow={eyebrow}
      intro={intro}
      isLoading={isLoading}
      loadingMessage={loadingMessage}
      payload={payload}
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
  const possibleGrantMoney = preview?.status === "calculated" ? preview.possibleGrantMoneyCents ?? null : null;

  return (
    <article className="customer-retrofit-card">
      <div className="customer-retrofit-card-header">
        <div>
          <p className="eyebrow">{customerRetrofitCategoryLabel(retrofit)}</p>
          <h2>{retrofit.displayName}</h2>
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
        <CustomerRetrofitMetric label="Possible grant money" value={formatUsdAmount(possibleGrantMoney)} />
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
  return retrofit.isPhysicalRetrofit ? retrofit.parentCategory.replaceAll("_", " ") : "Planning and compliance";
}

function customerRetrofitDescription(retrofit: SampleRetrofitGroup) {
  if (retrofit.typicalComponents && retrofit.typicalComponents.length > 0) {
    return `Programs related to ${retrofit.typicalComponents.slice(0, 3).join(", ").toLowerCase()}.`;
  }
  if (!retrofit.isPhysicalRetrofit) {
    return planningRetrofitExplanation(retrofit.retrofitTypeId);
  }
  return "Live programs currently matched to this retrofit category for the selected profile.";
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
  confirmed: boolean;
};

type RetrofitOpportunityPreview = {
  id: string;
  retrofitId: string;
  name: string;
  description: string;
  type: string;
  timing: "upfront" | "recurring" | "both" | "tax_time" | "reimbursement" | "unknown";
  eligibilityStatus: "confirmed" | "likely" | "unknown";
  requiredInfo: string[];
  applicationProcess?: string;
  difficulty?: "easy" | "medium" | "hard" | "unknown";
  length?: string;
  helpAvailable?: string;
  deadline?: string;
  environmentalImpactContribution?: string;
  certificationBoost?: string;
  sourceUrl?: string | null;
  estimatedValue?: number | null;
  valueRule?: string;
  includedState:
    | "Included in current estimate"
    | "Not included in current estimate"
    | "Not included yet — needs more information"
    | "Possible additional value";
  selected: boolean;
  whySelected?: string;
  whyNotSelected?: string;
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

type RetrofitDetailQuestion = {
  id: string;
  retrofitId: string;
  question: string;
  answerType: "text" | "number" | "select" | "boolean";
  options?: string[];
  answer?: string | number | boolean;
};

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
  detailQuestions: RetrofitDetailQuestion[];
};

export type UserRetrofitPreviewResult = {
  profileId?: string;
  intakeId?: string;
  customerName?: string;
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

export function buildUserRetrofitPreviewResult(
  payload: PortalRetrofitRecommendationsResponse | null
): UserRetrofitPreviewResult {
  const estimateBasis = estimateBasisFromPayload(payload);
  const missingInputs = estimateMissingInputs(payload);
  const retrofits = (payload?.retrofits || []).map((retrofit, index) =>
    buildRetrofitPreviewCard(retrofit, index, estimateBasis)
  );

  return {
    profileId: payload?.user?.userId,
    intakeId: payload?.intake?.submissionId,
    customerName: payload?.user?.fullName ?? payload?.intake?.contact?.fullName ?? undefined,
    estimateBasis,
    estimateCompletenessPercent: estimateCompletenessFromPayload(payload, retrofits),
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
    generatedAt: payload?.generatedAt,
    dataSourceLabel: payload
      ? "Live/API backend recommendation data"
      : "Live/API backend recommendation data pending"
  };
}

function buildRetrofitPreviewCard(
  retrofit: SampleRetrofitGroup,
  index: number,
  estimateBasis: EstimateBasisValue
): RetrofitPreviewCard {
  const preview = retrofit.savingsPreview || null;
  const isCalculated = preview?.status === "calculated";
  const annualRecurringSavings =
    isCalculated ? preview.netAnnualRecurringSavingsCents ?? preview.annualSavingsCents ?? null : null;
  const monthlyRecurringSavings =
    isCalculated ? preview.netMonthlyRecurringSavingsCents ?? preview.monthlySavingsCents ?? null : null;
  const estimatedUpfrontCost = isCalculated ? preview.upfrontCostCents ?? null : null;
  const upfrontFinancialIncentive = isCalculated
    ? preview.upfrontSavingsCents ?? preview.possibleGrantMoneyCents ?? null
    : null;
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
  const confidencePercent = retrofitConfidencePercent(retrofit);
  const confidenceLabel = confidenceLabelFromRetrofit(retrofit, confidencePercent);
  const missingInfo = missingInfoForRetrofit(retrofit, preview);
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
    name: retrofit.displayName,
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
    opportunities: retrofit.opportunities.map((opportunity) => buildOpportunityPreview(opportunity, preview)),
    operatingSavings: buildOperatingSavingsPreview(retrofit),
    detailQuestions: detailQuestionsForRetrofit(retrofit)
  };
}

function buildOpportunityPreview(
  opportunity: SampleMatchResult,
  preview: SampleSavingsPreview | null
): RetrofitOpportunityPreview {
  const includedOpportunityIds = new Set(preview?.selectedIncentiveScenario?.opportunityIds || []);
  const isIncluded = includedOpportunityIds.has(opportunity.opportunityId);
  const programType = normalizeOpportunityType(opportunity.sourceSummary?.programType);
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
    eligibilityStatus: opportunityEligibilityStatus(opportunity.eligibilityStatus),
    requiredInfo: opportunity.unresolvedRequirements.length
      ? opportunity.unresolvedRequirements.slice(0, 4)
      : ["bills", "retrofit-specific information", "quote", "tax/entity information"],
    applicationProcess: opportunityApplicationProcess(opportunity),
    difficulty: opportunity.blockers.length > 0 ? "hard" : opportunity.unresolvedRequirements.length > 2 ? "medium" : "unknown",
    length: opportunityLengthLabel(opportunity),
    helpAvailable: "Full application help available in next step",
    deadline: "Source unavailable",
    environmentalImpactContribution: environmentalImpactLabel(programType),
    certificationBoost: certificationBoostLabel(programType),
    sourceUrl: opportunity.sourceUrl || opportunity.websiteUrl || opportunity.applicationUrl || null,
    estimatedValue: preview?.upfrontSavingsCents ?? null,
    valueRule: opportunity.matchedReasons[0] || undefined,
    includedState: includedStateFromOpportunity(isIncluded, opportunity.unresolvedRequirements.length > 0),
    selected: isIncluded,
    whySelected: isIncluded ? "Selected for the current scenario based on available eligibility and estimate fit." : undefined,
    whyNotSelected: !isIncluded
      ? opportunity.unresolvedRequirements.length
        ? `Not included yet — needs ${opportunity.unresolvedRequirements.slice(0, 2).join(" and ")}.`
        : "Not selected for this scenario."
      : undefined
  };
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
    confirmed: false
  }));
}

function buildOperatingSavingsPreview(retrofit: SampleRetrofitGroup): OperatingSavingsPreview[] {
  const preview = retrofit.savingsPreview || null;
  const savingsEntries = preview?.status === "calculated" ? preview.savingsBreakdown || [] : [];
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
        confidenceLabel: confidenceLabelFromRetrofit(retrofit, retrofitConfidencePercent(retrofit)),
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
      confidenceLabel: confidenceLabelFromRetrofit(retrofit, retrofitConfidencePercent(retrofit)),
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
    makeRetrofitScenario(retrofit.retrofitTypeId, "low-upfront", SCENARIO_NAMES.lowUpfront, "Minimize upfront cost for this retrofit.", incentiveIds.length ? incentiveIds : selectedNow, allIds, metrics, missingInfo),
    makeRetrofitScenario(retrofit.retrofitTypeId, "best-payback", SCENARIO_NAMES.bestPayback, "Best payback path for this retrofit.", selectedNow.length ? selectedNow : incentiveIds, allIds, metrics, missingInfo),
    makeRetrofitScenario(retrofit.retrofitTypeId, "highest-savings", SCENARIO_NAMES.highestSavings, "Highest recurring savings path for this retrofit.", allIds, allIds, metrics, missingInfo),
    makeRetrofitScenario(
      retrofit.retrofitTypeId,
      "certification",
      SCENARIO_NAMES.certification,
      "Best fit for certification or impact goals for this retrofit.",
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
    return {
      primaryMetricLabel: "Annual savings",
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

export function RetrofitRecommendationsPreview({
  emptyMessage,
  error,
  eyebrow,
  intro,
  isLoading,
  loadingMessage,
  payload,
  title
}: {
  emptyMessage: string;
  error: string | null;
  eyebrow: string;
  intro: string;
  isLoading: boolean;
  loadingMessage: string;
  payload: PortalRetrofitRecommendationsResponse | null;
  title: string;
}) {
  const preview = useMemo(() => buildUserRetrofitPreviewResult(payload), [payload]);
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRetrofitId, setActiveRetrofitId] = useState<string>(preview.retrofits[0]?.id || "");
  const [selectedScenarioIds, setSelectedScenarioIds] = useState<Record<string, string>>(initialScenarioIds);
  const [confirmedAssumptionIds, setConfirmedAssumptionIds] = useState<Record<string, boolean>>({});
  const [selectedOpportunityIds, setSelectedOpportunityIds] = useState<Record<string, boolean>>(initialSelectedOpportunityIds);
  const [detailAnswers, setDetailAnswers] = useState<Record<string, string>>({});
  const [nextActionStatuses, setNextActionStatuses] = useState<Record<string, NextBestAction["status"]>>({});
  const [financingRetrofit, setFinancingRetrofit] = useState<RetrofitPreviewCard | null>(null);
  const [refinementMessage, setRefinementMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOpportunityIds(initialSelectedOpportunityIds);
    setSelectedScenarioIds(initialScenarioIds);
    setActiveRetrofitId(preview.retrofits[0]?.id || "");
  }, [initialScenarioIds, initialSelectedOpportunityIds, preview.generatedAt, preview.intakeId, preview.profileId, preview.retrofits]);

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
        const search = searchQuery.trim().toLowerCase();
        if (!search) return true;
        return (
          retrofit.name.toLowerCase().includes(search) ||
          retrofit.opportunities.some((opportunity) => opportunity.name.toLowerCase().includes(search))
        );
      })
      .sort((a, b) => comparePreviewRetrofits(a, b, sortBy));
  }, [basisFilter, categoryFilter, confidenceFilter, missingInfoFilter, preview.retrofits, searchQuery, sortBy]);

  const activeRetrofit =
    displayedRetrofits.find((retrofit) => retrofit.id === activeRetrofitId) ||
    displayedRetrofits[0] ||
    null;

  useEffect(() => {
    if (activeRetrofit && activeRetrofit.id !== activeRetrofitId) {
      setActiveRetrofitId(activeRetrofit.id);
    }
  }, [activeRetrofit, activeRetrofitId]);

  function handleUploadBills() {
    if (typeof window !== "undefined") {
      window.open(pathForRoute("scan-energy-data"), "_blank", "noopener,noreferrer");
    }
    setRefinementMessage("Upload bills to improve savings, eligibility, and payback estimates.");
  }

  function handleEnterDetails() {
    setRefinementMessage("Confirmed details in this preview help explain what inputs still need review.");
    const element = typeof document !== "undefined" ? document.querySelector(".retrofit-detail-questions") : null;
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleOpportunity(opportunityId: string) {
    setSelectedOpportunityIds((current) => ({
      ...current,
      [opportunityId]: !current[opportunityId]
    }));
  }

  function toggleAssumption(assumptionId: string) {
    setConfirmedAssumptionIds((current) => confirmSingleEstimateState(current, assumptionId));
  }

  function confirmAll(retrofit: RetrofitPreviewCard) {
    setConfirmedAssumptionIds((current) => confirmAllEstimateState(current, retrofit.editableAssumptions));
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
  }

  return (
    <section className="retrofit-preview-page" data-testid="retrofit-recommendations-preview">
      <header className="retrofit-preview-header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <div className="retrofit-preview-title-row">
            <h1>{title}</h1>
            <span className="soft-badge">Estimate basis: {estimateBasisLabel(preview.estimateBasis)}</span>
          </div>
          <p>{intro || "Review recommended retrofits, eligible opportunities, operating savings, and next steps based on the information provided."}</p>
          {eyebrow.toLowerCase().includes("admin") ? (
            <p className="retrofit-preview-source-note">{preview.dataSourceLabel}{payload?.generatedAt ? ` · Updated ${formatDate(payload.generatedAt)}` : ""}</p>
          ) : null}
        </div>
        <div className="retrofit-preview-header-meta">
          <strong>{Math.min(5, payload?.summary.matchedRetrofitCount || 0)}</strong>
          <span>{isLoading ? "loading matches" : "top retrofits shown first"}</span>
        </div>
      </header>

      {error ? <p className="error-message">{error}</p> : null}

      {preview.topRecommendation ? (
        <section className="top-recommendation-panel">
          <div>
            <p className="eyebrow">Top recommendation</p>
            <h2>{preview.topRecommendation.retrofitName}</h2>
            <p>{preview.topRecommendation.reason}</p>
          </div>
          <div className="top-recommendation-meta">
            <span className="soft-badge">Estimate basis: {estimateBasisLabel(preview.estimateBasis)}</span>
            <p>{preview.topRecommendation.nextStep}</p>
          </div>
        </section>
      ) : null}

      <section className="retrofit-refinement-panel">
        <div>
          <h2>Improve your estimates</h2>
          <p>Upload utility bills or answer retrofit-specific questions to unlock more accurate savings, eligibility, and payback estimates.</p>
          <p className="muted-message">
            Estimate completeness: {preview.estimateCompletenessPercent == null ? "Not enough information yet" : `${preview.estimateCompletenessPercent}%`}
            {preview.missingInputs.length ? ` · Missing: ${preview.missingInputs.join(", ")}` : ""}
          </p>
          {refinementMessage ? <p className="preview-local-note">{refinementMessage}</p> : null}
        </div>
        <div className="retrofit-refinement-actions">
          <button onClick={handleUploadBills} type="button">Upload bills</button>
          <button className="secondary-button" onClick={handleEnterDetails} type="button">Enter details</button>
        </div>
      </section>

      <section className="ranking-control-bar" aria-label="Ranking controls">
        <label>
          <span>Sort by</span>
          <select onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
            <option value="recommended">Recommended</option>
            <option value="total_savings">Total savings</option>
            <option value="payback">Payback period</option>
            <option value="monthly_savings">Monthly savings</option>
            <option value="upfront_cost">Upfront cost</option>
            <option value="percentage_profit">Percentage profit</option>
            <option value="roi">ROI</option>
          </select>
        </label>
        <label>
          <span>Estimate basis</span>
          <select onChange={(event) => setBasisFilter(event.target.value)} value={basisFilter}>
            <option value="all">All</option>
            <option value="initial_form">Initial</option>
            <option value="uploaded_bills">Bills uploaded</option>
            <option value="confirmed_details">Confirmed details</option>
          </select>
        </label>
        <label>
          <span>Category</span>
          <select onChange={(event) => setCategoryFilter(event.target.value)} value={categoryFilter}>
            <option value="all">All</option>
            {Array.from(new Set(preview.retrofits.map((retrofit) => slugify(retrofit.category || ""))))
              .filter(Boolean)
              .map((value) => (
                <option key={value} value={value}>{capitalizeLabel(value)}</option>
              ))}
          </select>
        </label>
        <label>
          <span>Confidence</span>
          <select onChange={(event) => setConfidenceFilter(event.target.value)} value={confidenceFilter}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label>
          <span>Missing info</span>
          <select onChange={(event) => setMissingInfoFilter(event.target.value)} value={missingInfoFilter}>
            <option value="all">All</option>
            <option value="needs_info">Needs info</option>
            <option value="ready">Fewer blockers</option>
          </select>
        </label>
        <label>
          <span>Search retrofits</span>
          <input onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search retrofits" value={searchQuery} />
        </label>
        <p>Pre-ranked from initial information. Re-ranking will update as more confirmed data is available.</p>
      </section>

      {displayedRetrofits.length ? (
        <section className="retrofit-tab-shell" aria-label="Retrofit tabs">
          <div className="retrofit-tab-bar">
            {displayedRetrofits.map((retrofit) => {
              const selectedScenarioName = retrofit.scenarios.find((scenario) => scenario.id === (selectedScenarioIds[retrofit.id] || retrofit.scenarios[0]?.id))?.name || "Scenario A";
              return (
                <button
                  key={retrofit.id}
                  type="button"
                  className={`retrofit-tab${activeRetrofit?.id === retrofit.id ? " is-active" : ""}`}
                  onClick={() => setActiveRetrofitId(retrofit.id)}
                >
                  <div className="retrofit-tab-top">
                    <span className="rank-pill">#{retrofit.rank}</span>
                    <strong>{retrofit.name}</strong>
                  </div>
                  <span className="retrofit-tab-category">{retrofit.category || "Retrofit"}</span>
                  <span className="retrofit-tab-metric">
                    {retrofit.tabSummary.primaryMetricLabel}: {retrofit.tabSummary.primaryMetricValue || retrofit.tabSummary.fallback || "Not estimated yet"}
                  </span>
                  <div className="retrofit-tab-meta">
                    <span>{retrofit.tabSummary.selectedOpportunityCount} opportunities</span>
                    <span>{retrofit.confidenceLabel || "Needs review"}</span>
                    <span>Missing: {retrofit.tabSummary.missingInfoCount}</span>
                    <span>{selectedScenarioName.replace("Scenario ", "")}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {isLoading ? (
        <section className="retrofit-preview-card">
          <p className="empty-state">{loadingMessage}</p>
        </section>
      ) : preview.retrofits.length === 0 ? (
        <section className="retrofit-preview-card">
          <h2>No retrofit recommendations yet.</h2>
          <p>{emptyMessage || "Complete the intake form or select a test profile to generate recommendations."}</p>
        </section>
      ) : activeRetrofit ? (
        <div className="retrofit-preview-list">
          <RetrofitPreviewCardView
            confirmedAssumptionIds={confirmedAssumptionIds}
            detailAnswers={detailAnswers}
            key={activeRetrofit.id}
            onConfirmAll={() => confirmAll(activeRetrofit)}
            onConfirmAssumption={toggleAssumption}
            onDetailAnswerChange={(questionId, value) => setDetailAnswers((current) => ({ ...current, [questionId]: value }))}
            onExploreFinancing={() => setFinancingRetrofit(activeRetrofit)}
            onSelectScenario={(scenarioId) => selectScenario(activeRetrofit, scenarioId)}
            onToggleOpportunity={toggleOpportunity}
            retrofit={activeRetrofit}
            selectedScenarioId={selectedScenarioIds[activeRetrofit.id] || activeRetrofit.scenarios[0]?.id || ""}
            selectedOpportunityIds={selectedOpportunityIds}
          />
        </div>
      ) : null}

      <section className="next-actions-panel">
        <div>
          <h2>Next-best-action checklist</h2>
          <p>Preview of what to apply for first, documents needed, contacts, upgrades to price out, and deadline checks.</p>
        </div>
        <div className="next-action-list">
          {preview.nextActions.map((action) => (
            <article className="next-action-item" key={action.id}>
              <div>
                <span className={`priority-badge ${action.priority.toLowerCase()}`}>{action.priority}</span>
                <h3>{action.text}</h3>
                <p>
                  {action.relatedRetrofitName ? `Related retrofit: ${action.relatedRetrofitName}` : "Related retrofit: General"}
                  {action.relatedOpportunityName ? ` · Related opportunity: ${action.relatedOpportunityName}` : ""}
                </p>
              </div>
              <select
                aria-label={`Status for ${action.text}`}
                onChange={(event) => setNextActionStatuses((current) => ({ ...current, [action.id]: event.target.value as NextBestAction["status"] }))}
                value={nextActionStatuses[action.id] || action.status}
              >
                <option>Not started</option>
                <option>In progress</option>
                <option>Done</option>
              </select>
            </article>
          ))}
        </div>
      </section>

      {financingRetrofit ? (
        <FinancingPreviewDrawer retrofit={financingRetrofit} onClose={() => setFinancingRetrofit(null)} />
      ) : null}
    </section>
  );
}

function RetrofitPreviewCardView({
  confirmedAssumptionIds,
  detailAnswers,
  onConfirmAll,
  onConfirmAssumption,
  onDetailAnswerChange,
  onExploreFinancing,
  onSelectScenario,
  onToggleOpportunity,
  retrofit,
  selectedScenarioId,
  selectedOpportunityIds
}: {
  confirmedAssumptionIds: Record<string, boolean>;
  detailAnswers: Record<string, string>;
  onConfirmAll: () => void;
  onConfirmAssumption: (assumptionId: string) => void;
  onDetailAnswerChange: (questionId: string, value: string) => void;
  onExploreFinancing: () => void;
  onSelectScenario: (scenarioId: string) => void;
  onToggleOpportunity: (opportunityId: string) => void;
  retrofit: RetrofitPreviewCard;
  selectedScenarioId: string;
  selectedOpportunityIds: Record<string, boolean>;
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    why: true,
    financial: true,
    included: true,
    scenarios: true,
    opportunities: true,
    operatingSavings: false,
    assumptions: false,
    details: false,
    missing: retrofit.missingInfo.length > 0,
    nextActions: false
  });
  const [expandedOpportunityIds, setExpandedOpportunityIds] = useState<Record<string, boolean>>({});
  const selectedCount = retrofit.opportunities.filter((opportunity) => selectedOpportunityIds[opportunity.id]).length;
  const selectedScenario = retrofit.scenarios.find((scenario) => scenario.id === selectedScenarioId) || retrofit.scenarios[0];
  const selectedScenarioOpportunities = retrofit.opportunities.filter((opportunity) => selectedScenario?.selectedOpportunityIds.includes(opportunity.id));
  const deselectedScenarioOpportunities = retrofit.opportunities.filter((opportunity) => selectedScenario?.deselectedOpportunityIds.includes(opportunity.id));
  const selectedIncludedOpportunities = retrofit.opportunities.filter((opportunity) => {
    const selected = Boolean(selectedOpportunityIds[opportunity.id]);
    return selected && getOpportunityIncludedLabel(opportunity, selected) === "Included in current estimate";
  });
  const selectedPendingOpportunities = retrofit.opportunities.filter((opportunity) => {
    const selected = Boolean(selectedOpportunityIds[opportunity.id]);
    return selected && getOpportunityIncludedLabel(opportunity, selected) !== "Included in current estimate";
  });
  const unselectedOpportunities = retrofit.opportunities.filter((opportunity) => !selectedOpportunityIds[opportunity.id]);
  const needsReviewOpportunities = retrofit.opportunities.filter((opportunity) => !opportunity.sourceUrl || opportunity.eligibilityStatus === "unknown");
  const opportunityGroups = [
    { key: "selected-included", title: "Selected and included in estimate", opportunities: selectedIncludedOpportunities },
    { key: "selected-pending", title: "Selected but not included yet", opportunities: selectedPendingOpportunities },
    { key: "available", title: "Available but not selected", opportunities: unselectedOpportunities },
    {
      key: "needs-review",
      title: "Needs review / source unavailable",
      opportunities: needsReviewOpportunities.filter((opportunity, index, array) => array.findIndex((item) => item.id === opportunity.id) === index)
    }
  ].filter((group) => group.opportunities.length > 0);
  const includedOperatingSavings = retrofit.operatingSavings.filter((item) => item.annualSavings != null || item.monthlySavings != null);
  const pendingOperatingSavings = retrofit.operatingSavings.filter((item) => item.annualSavings == null && item.monthlySavings == null);
  const financialBreakdown = [
    {
      id: "project-cost",
      label: "Project cost",
      value: formatMaybeCents(retrofit.metrics.estimatedUpfrontProjectCost, "Needs quote"),
      basis: retrofit.metrics.estimatedUpfrontProjectCost != null ? "Based on current estimate" : "Needs confirmed quote"
    },
    {
      id: "incentives",
      label: "Less selected upfront rebates or grants",
      value: formatMaybeCents(retrofit.metrics.upfrontFinancialIncentive, "Needs selected opportunity"),
      basis: retrofit.metrics.upfrontFinancialIncentive != null ? "Based on selected opportunities" : "Select or validate opportunities"
    },
    {
      id: "net-cost",
      label: "Net cost before tax benefits",
      value: formatMaybeCents(retrofit.metrics.netCostBeforeTaxBenefits, "Not estimated yet"),
      basis: retrofit.metrics.netCostBeforeTaxBenefits != null ? "Project cost minus selected incentives" : "Needs project cost and selected opportunities"
    },
    {
      id: "tax-benefits",
      label: "Potential one-time tax benefits",
      value:
        retrofit.metrics.taxBenefits == null
          ? "Needs tax review"
          : typeof retrofit.metrics.taxBenefits === "number"
            ? formatCents(retrofit.metrics.taxBenefits)
            : String(retrofit.metrics.taxBenefits),
      basis: retrofit.metrics.taxBenefits == null ? "Needs tax or entity information" : "Based on current tax inputs"
    },
    {
      id: "effective-cost",
      label: "Effective cost after one-time benefits",
      value: formatMaybeCents(retrofit.metrics.effectiveCostAfterOneTimeBenefits, "Needs tax review"),
      basis:
        retrofit.metrics.effectiveCostAfterOneTimeBenefits != null
          ? "Includes selected incentives and one-time benefits"
          : "Needs selected incentives and tax review"
    },
    {
      id: "annual-savings",
      label: "Annual operating savings",
      value:
        retrofit.metrics.recurringOperationalSavingsAnnual == null
          ? "Needs bill"
          : retrofit.metrics.recurringOperationalSavingsAnnual >= 0
            ? formatCents(retrofit.metrics.recurringOperationalSavingsAnnual)
            : "Estimated operating cost change",
      basis:
        retrofit.metrics.recurringOperationalSavingsAnnual != null
          ? "Based on uploaded bills and industry assumptions"
          : "Needs bill or confirmed operating details"
    },
    {
      id: "monthly-savings",
      label: "Monthly operating savings",
      value:
        retrofit.metrics.recurringOperationalSavingsMonthly == null
          ? "Needs bill"
          : retrofit.metrics.recurringOperationalSavingsMonthly >= 0
            ? formatCents(retrofit.metrics.recurringOperationalSavingsMonthly)
            : "Estimated operating cost change",
      basis:
        retrofit.metrics.recurringOperationalSavingsMonthly != null
          ? "Based on uploaded bills and industry assumptions"
          : "Needs bill or confirmed operating details"
    },
    {
      id: "payback-roi",
      label: "Payback / ROI",
      value:
        retrofit.metrics.paybackPeriodYears == null
          ? "Needs quote"
          : `${formatPayback(retrofit.metrics.paybackPeriodYears)}${retrofit.metrics.roi == null ? "" : ` · ${String(retrofit.metrics.roi)}`}`,
      basis: retrofit.metrics.paybackPeriodYears != null ? "Based on current cost and savings inputs" : "Needs quote and savings validation"
    }
  ];

  function toggleSection(section: string) {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  }

  return (
    <article className="retrofit-preview-card retrofit-preview-card-active">
      <div className="retrofit-card-top-row">
        <div>
          <div className="retrofit-card-title-line">
            <span className="rank-pill">#{retrofit.rank}</span>
            <h2>{retrofit.name}</h2>
          </div>
          <p>{retrofit.description}</p>
          <div className="retrofit-badge-row">
            <span className="soft-badge">{retrofit.category || "Retrofit"}</span>
            <span className="soft-badge">Confidence: {retrofit.confidenceLabel || "Needs review"}</span>
            <span className="soft-badge">Estimate basis: {estimateBasisLabel(retrofit.estimateBasis)}</span>
            <span className="soft-badge">Selected scenario: {selectedScenario?.name || "Scenario A: Low upfront cost"}</span>
            <span className="soft-badge">{selectedCount.toLocaleString()} opportunities selected</span>
          </div>
        </div>
        <div className="retrofit-card-actions">
          <button className="secondary-button" onClick={onExploreFinancing} type="button">Explore financing</button>
        </div>
      </div>

      <div className="retrofit-count-row">
        <span>Opportunities: {selectedCount.toLocaleString()} selected / {retrofit.opportunities.length.toLocaleString()} found</span>
        <span>Operating Savings: {retrofit.operatingSavings.length.toLocaleString()} estimates</span>
        <span>{retrofit.missingInfo.length ? `Missing: ${retrofit.missingInfo.join(", ")}` : "No major missing inputs flagged"}</span>
        <span>Next step: {retrofit.recommendedNextStep || "Review this retrofit with a contractor or vendor."}</span>
      </div>

      <PreviewAccordionSection defaultOpen={openSections.why} onToggle={() => toggleSection("why")} title="Why this is recommended">
        <section className="why-recommended">
          <ul>
            {retrofit.whyRecommended.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </section>
      </PreviewAccordionSection>

      <PreviewAccordionSection defaultOpen={openSections.financial} onToggle={() => toggleSection("financial")} title="Financial breakdown">
        <div className="retrofit-metric-grid">
          <PreviewMetric label="Estimated upfront project cost" value={formatMaybeCents(retrofit.metrics.estimatedUpfrontProjectCost, "Needs quote")} />
          <PreviewMetric label="Upfront financial incentive" value={formatMaybeCents(retrofit.metrics.upfrontFinancialIncentive, "Needs selected opportunity")} />
          <PreviewMetric label="Net cost before tax benefits" value={formatMaybeCents(retrofit.metrics.netCostBeforeTaxBenefits, "Not estimated yet")} />
          <PreviewMetric label="Tax benefits" value={retrofit.metrics.taxBenefits == null ? "Needs tax review" : typeof retrofit.metrics.taxBenefits === "number" ? formatCents(retrofit.metrics.taxBenefits) : String(retrofit.metrics.taxBenefits)} />
          <PreviewMetric label="Effective cost after one-time benefits" value={formatMaybeCents(retrofit.metrics.effectiveCostAfterOneTimeBenefits, "Needs tax review")} />
          <PreviewMetric label="Recurring Operational Savings" value={formatMaybeRecurringSavings(retrofit)} />
          <PreviewMetric label="Payback Period" value={formatPayback(retrofit.metrics.paybackPeriodYears)} />
          <PreviewMetric label="ROI" value={retrofit.metrics.roi == null ? "Not estimated yet" : String(retrofit.metrics.roi)} />
        </div>
        <div className="financial-breakdown-list">
          {financialBreakdown.map((item) => (
            <article className="financial-breakdown-item" key={item.id}>
              <div>
                <strong>{item.label}</strong>
                <p>{item.basis}</p>
              </div>
              <span>{item.value}</span>
            </article>
          ))}
        </div>
      </PreviewAccordionSection>

      <PreviewAccordionSection defaultOpen={openSections.included} onToggle={() => toggleSection("included")} title="What is included in this estimate">
        <div className="selected-scenario-grid">
          <DetailItem
            label="Included in current estimate"
            value={selectedIncludedOpportunities.length ? selectedIncludedOpportunities.map((opportunity) => opportunity.name).join(", ") : "No selected opportunities included yet"}
          />
          <DetailItem
            label="Not included yet — needs more information"
            value={selectedPendingOpportunities.length ? selectedPendingOpportunities.map((opportunity) => opportunity.name).join(", ") : "No pending selected opportunities"}
          />
          <DetailItem
            label="Operating savings included"
            value={includedOperatingSavings.length ? includedOperatingSavings.map((item) => item.name).join(", ") : "Operating savings not estimated yet"}
          />
          <DetailItem
            label="Operating savings pending"
            value={pendingOperatingSavings.length ? pendingOperatingSavings.map((item) => item.name).join(", ") : "No pending operating savings flagged"}
          />
          <DetailItem
            label="Excluded opportunities"
            value={deselectedScenarioOpportunities.length ? deselectedScenarioOpportunities.map((opportunity) => opportunity.name).join(", ") : "No excluded opportunities for this scenario."}
          />
          <DetailItem
            label="Missing inputs blocking calculation"
            value={retrofit.missingInfo.length ? retrofit.missingInfo.join(", ") : "No major blocking inputs flagged"}
          />
        </div>
      </PreviewAccordionSection>

      <PreviewAccordionSection
        defaultOpen={openSections.scenarios}
        onToggle={() => toggleSection("scenarios")}
        subtitle={`Compare opportunity bundles and estimate states for ${retrofit.name}.`}
        title="Scenario comparison for this retrofit"
      >
        <section className="retrofit-scenario-panel">
          <div className="scenario-grid retrofit-scenario-grid">
            {retrofit.scenarios.map((scenario) => (
              <button
                aria-pressed={selectedScenario?.id === scenario.id}
                className={`scenario-card${selectedScenario?.id === scenario.id ? " is-selected" : ""}`}
                key={`${retrofit.id}:${scenario.id}`}
                onClick={() => onSelectScenario(scenario.id)}
                type="button"
              >
                <span>{scenario.name}</span>
                <p>{scenario.description}</p>
                <div className="scenario-opportunity-chip-row">
                  {scenario.selectedOpportunityIds.slice(0, 2).map((opportunityId) => {
                    const match = retrofit.opportunities.find((opportunity) => opportunity.id === opportunityId);
                    return <small className="scenario-chip" key={opportunityId}>{match?.name || "Selected opportunity"}</small>;
                  })}
                </div>
                <div className="scenario-metrics">
                  <ScenarioMetric label="Selected opportunities for this scenario" value={`${countScenarioSelectedOpportunities(scenario, selectedOpportunityIds)}`} />
                  <ScenarioMetric label="Project cost for this retrofit" value={formatMaybeCents(scenario.metrics.estimatedUpfrontProjectCost, "Needs quote")} />
                  <ScenarioMetric label="Upfront incentives for this retrofit" value={formatMaybeCents(scenario.metrics.upfrontFinancialIncentive, "Needs selected opportunity")} />
                  <ScenarioMetric label={scenario.id === "certification" ? "Certification boost" : "Payback for this retrofit"} value={scenario.id === "certification" ? (scenario.metrics.certificationBoost || "Needs review") : formatPayback(scenario.metrics.paybackPeriodYears, "Needs quote")} />
                </div>
                <small>{selectedScenario?.id === scenario.id ? "Viewing scenario" : "View scenario"}</small>
              </button>
            ))}
          </div>
        </section>

        {selectedScenario ? (
          <section className="selected-scenario-panel">
            <div className="section-title-row">
              <div>
                <h3>{selectedScenario.name}</h3>
                <p>{selectedScenario.description}</p>
              </div>
            </div>
            <div className="selected-scenario-grid">
              <DetailItem
                label="Selected opportunities for this scenario"
                value={selectedScenarioOpportunities.length ? selectedScenarioOpportunities.map((opportunity) => opportunity.name).join(", ") : "No selected opportunities yet"}
              />
              <DetailItem
                label="Not included yet"
                value={deselectedScenarioOpportunities.length ? deselectedScenarioOpportunities.map((opportunity) => opportunity.name).join(", ") : "No excluded opportunities for this scenario."}
              />
              <DetailItem
                label="Missing information needed to validate"
                value={selectedScenario.missingInfo.length ? selectedScenario.missingInfo.join(", ") : "No missing information flagged"}
              />
              <DetailItem label="Estimate notes" value={selectedScenario.estimateNotes.join(" ")} />
            </div>
          </section>
        ) : null}
      </PreviewAccordionSection>

      <PreviewAccordionSection
        defaultOpen={openSections.opportunities}
        onToggle={() => toggleSection("opportunities")}
        subtitle="External programs and incentives connected to this retrofit."
        title="Opportunities"
      >
        <div className="opportunity-preview-list">
          {retrofit.opportunities.length === 0 ? (
            <p className="empty-state">No external opportunities found yet for this retrofit.</p>
          ) : (
            opportunityGroups.map((group) => (
              <section className="opportunity-group" key={group.key}>
                <div className="opportunity-group-header">
                  <h4>{group.title}</h4>
                  <span>{group.opportunities.length}</span>
                </div>
                <div className="opportunity-group-list">
                  {group.opportunities.map((opportunity) => (
                    <OpportunityPreviewRow
                      expanded={Boolean(expandedOpportunityIds[opportunity.id])}
                      key={opportunity.id}
                      onToggle={() => onToggleOpportunity(opportunity.id)}
                      onToggleExpanded={() => setExpandedOpportunityIds((current) => ({ ...current, [opportunity.id]: !current[opportunity.id] }))}
                      opportunity={opportunity}
                      selected={Boolean(selectedOpportunityIds[opportunity.id])}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </PreviewAccordionSection>

      <PreviewAccordionSection
        defaultOpen={openSections.operatingSavings}
        onToggle={() => toggleSection("operatingSavings")}
        subtitle="Estimated recurring savings from the retrofit itself."
        title="Operating Savings"
      >
        <div className="operating-savings-list">
          {retrofit.operatingSavings.map((savings) => {
            const annualLabel =
              savings.annualSavings == null
                ? "Not estimated yet"
                : savings.annualSavings >= 0
                  ? `${formatCents(savings.annualSavings)}/year`
                  : "Estimated operating cost change";
            const monthlyLabel =
              savings.monthlySavings == null
                ? "Needs bill"
                : savings.monthlySavings >= 0
                  ? `${formatCents(savings.monthlySavings)}/month`
                  : "Estimated operating cost change";
            return (
              <article className="operating-savings-item" key={savings.id}>
                <div>
                  <h4>{savings.name}</h4>
                  <p>Recurring impact · {annualLabel} · {monthlyLabel}</p>
                </div>
                <DetailItem label="Included in" value={savings.includedIn} />
                <DetailItem label="Eligibility" value={capitalizeLabel(savings.eligibilityStatus)} />
                <DetailItem label="Requires" value={savings.requiredInfo.join(", ")} />
                <DetailItem label="Confidence" value={savings.confidenceLabel || "Needs review"} />
                <DetailItem label="Basis" value={savings.customerFacingBasis || "Needs bill"} />
                <DetailItem label="Assumptions" value={savings.assumptions?.join(" · ") || "Operating savings not estimated yet. Upload a utility bill or answer retrofit-specific questions."} />
              </article>
            );
          })}
        </div>
      </PreviewAccordionSection>

      <PreviewAccordionSection
        defaultOpen={openSections.assumptions}
        onToggle={() => toggleSection("assumptions")}
        subtitle="Review or confirm the assumptions used for this retrofit estimate."
        title="Estimate assumptions"
      >
        <section className="editable-estimates-panel">
          <div className="section-title-row">
            <div />
            <button className="secondary-button" onClick={onConfirmAll} type="button">Confirm all estimates</button>
          </div>
          <div className="editable-estimate-grid">
            {retrofit.editableAssumptions.map((assumption) => {
              const confirmed = confirmedAssumptionIds[assumption.id] || assumption.confirmed;
              return (
                <label className="editable-estimate-box" key={assumption.id}>
                  <span>{assumption.label}</span>
                  <input aria-label={assumption.label} defaultValue={String(assumption.value)} />
                  <div className="editable-estimate-meta">
                    <small>{assumption.unit || "Value"}</small>
                    <span className="soft-badge">{assumption.sourceLabel || estimateSourceLabel(assumption.source)}</span>
                  </div>
                  <button className="secondary-button" onClick={() => onConfirmAssumption(assumption.id)} type="button">
                    {confirmed ? "Confirmed for this preview" : "Confirm"}
                  </button>
                </label>
              );
            })}
          </div>
        </section>
      </PreviewAccordionSection>

      <PreviewAccordionSection
        defaultOpen={openSections.details}
        onToggle={() => toggleSection("details")}
        subtitle="Answer a few questions to improve this retrofit estimate."
        title="Enter details"
      >
        <section className="retrofit-detail-questions">
          <div className="detail-question-grid">
            {retrofit.detailQuestions.map((question) => (
              <label className="detail-question" key={question.id}>
                <span>{question.question}</span>
                {question.answerType === "select" ? (
                  <select onChange={(event) => onDetailAnswerChange(question.id, event.target.value)} value={detailAnswers[question.id] || ""}>
                    <option value="">Select</option>
                    {(question.options || []).map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    onChange={(event) => onDetailAnswerChange(question.id, event.target.value)}
                    type={question.answerType === "number" ? "number" : "text"}
                    value={detailAnswers[question.id] || ""}
                  />
                )}
              </label>
            ))}
          </div>
        </section>
      </PreviewAccordionSection>

      <PreviewAccordionSection defaultOpen={openSections.missing} onToggle={() => toggleSection("missing")} title="Missing information and next step">
        <section>
          <p>{retrofit.missingInfo.length ? `Missing: ${retrofit.missingInfo.join(", ")}` : "No missing information flagged in the current estimate."}</p>
          <p>Next step: {retrofit.recommendedNextStep || "Review this retrofit with a contractor or vendor."}</p>
          <p>Estimate will update when enough confirmed inputs are available.</p>
        </section>
      </PreviewAccordionSection>

      <PreviewAccordionSection defaultOpen={openSections.nextActions} onToggle={() => toggleSection("nextActions")} title="Retrofit-specific next actions">
        <div className="retrofit-count-row">
          <span>Upload missing bills or utility data</span>
          <span>Confirm project scope and quote</span>
          <span>Validate tax or entity information</span>
        </div>
      </PreviewAccordionSection>
    </article>
  );
}

function OpportunityPreviewRow({
  expanded,
  onToggle,
  onToggleExpanded,
  opportunity,
  selected
}: {
  expanded: boolean;
  onToggle: () => void;
  onToggleExpanded: () => void;
  opportunity: RetrofitOpportunityPreview;
  selected: boolean;
}) {
  const includedLabel = getOpportunityIncludedLabel(opportunity, selected);
  return (
    <article className="opportunity-preview-row">
      <div className="opportunity-preview-header">
        <div className="opportunity-preview-main">
          <label className="selection-toggle">
            <input checked={selected} onChange={onToggle} type="checkbox" />
            <span>{selected ? "Selected" : "Not selected"}</span>
          </label>
          <div>
            <h4>{opportunity.name}</h4>
            <p>{opportunity.description}</p>
            <div className="opportunity-preview-tags">
              <span className={selected ? "included-label" : "not-included-label"}>{includedLabel}</span>
              <span className="soft-badge">{capitalizeLabel(opportunity.type)}</span>
              <span className="soft-badge">{capitalizeLabel(opportunity.timing)}</span>
              <span className="soft-badge">Eligibility: {capitalizeLabel(opportunity.eligibilityStatus)}</span>
            </div>
          </div>
        </div>
        <div className="opportunity-preview-actions">
          {opportunity.sourceUrl ? <a href={opportunity.sourceUrl} rel="noreferrer" target="_blank">Open program source</a> : <span>Source unavailable</span>}
          <button className="secondary-button" onClick={onToggleExpanded} type="button">{expanded ? "Hide details" : "View details"}</button>
        </div>
      </div>
      {expanded ? (
        <>
          <div className="opportunity-preview-details">
            <DetailItem label="Type" value={capitalizeLabel(opportunity.type)} />
            <DetailItem label="Timing" value={capitalizeLabel(opportunity.timing)} />
            <DetailItem label="Eligibility" value={capitalizeLabel(opportunity.eligibilityStatus)} />
            <DetailItem label="Requires" value={opportunity.requiredInfo.join(", ")} />
            <DetailItem label="Application process" value={opportunity.applicationProcess || "Needs source review"} />
            <DetailItem label="Difficulty" value={capitalizeLabel(opportunity.difficulty || "unknown")} />
            <DetailItem label="Length" value={opportunity.length || "Source unavailable"} />
            <DetailItem label="Help available" value={opportunity.helpAvailable || "Review available next steps"} />
            <DetailItem label="Deadline" value={opportunity.deadline || "Source unavailable"} />
            <DetailItem label="Environmental impact contribution" value={opportunity.environmentalImpactContribution || "Source unavailable"} />
            <DetailItem label="Certification boost" value={opportunity.certificationBoost || "Source unavailable"} />
            <DetailItem label="Estimated value" value={opportunity.estimatedValue != null ? formatCents(opportunity.estimatedValue) : "Value not estimated yet"} />
            <DetailItem label="Value rule" value={opportunity.valueRule || "Requirements not extracted yet"} />
            <DetailItem label="Selected state" value={selected ? opportunity.whySelected || "Selected for this scenario." : opportunity.whyNotSelected || "Not selected for this scenario."} />
          </div>
          <div className="opportunity-preview-footer">
            <small>Estimate will update when enough confirmed inputs are available.</small>
          </div>
        </>
      ) : null}
    </article>
  );
}

function PreviewAccordionSection({
  children,
  defaultOpen,
  onToggle,
  subtitle,
  title
}: {
  children: ReactNode;
  defaultOpen: boolean;
  onToggle: () => void;
  subtitle?: string;
  title: string;
}) {
  return (
    <section className="preview-accordion-section">
      <button aria-expanded={defaultOpen} className="preview-accordion-trigger" onClick={onToggle} type="button">
        <div>
          <h3>{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <span>{defaultOpen ? "Hide" : "Show"}</span>
      </button>
      {defaultOpen ? <div className="preview-accordion-body">{children}</div> : null}
    </section>
  );
}

function FinancingPreviewDrawer({ onClose, retrofit }: { onClose: () => void; retrofit: RetrofitPreviewCard }) {
  return (
    <div className="modal-backdrop retrofit-financing-backdrop" onClick={onClose}>
      <aside className="retrofit-financing-drawer" onClick={(event) => event.stopPropagation()}>
        <button aria-label="Close financing preview" className="modal-close-button" onClick={onClose} type="button">Close</button>
        <p className="eyebrow">Financing preview</p>
        <h2>{retrofit.name}</h2>
        <p>Financing preview is not fully implemented yet.</p>
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

function ScenarioMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function PreviewMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="preview-metric">
      <span>{label}</span>
      <strong>{value}</strong>
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

function estimateCompletenessFromPayload(payload: PortalRetrofitRecommendationsResponse | null, retrofits: RetrofitPreviewCard[]) {
  if (!payload?.intake) return undefined;
  const pageMissing = estimateMissingInputs(payload);
  const hasBill = payload.intake.uploadedUtilityFiles.length > 0 || payload.intake.utilityExtractedValues.length > 0;
  let score = 20;
  if (payload.intake.site?.electricUtilityProvider) score += 10;
  if (payload.intake.site?.squareFootage) score += 5;
  if (payload.intake.site?.buildingType) score += 10;
  if (payload.intake.uploadedUtilityFiles.length > 0) score += 15;
  if (payload.intake.utilityExtractedValues.length > 0) score += 15;
  if (retrofits.some((retrofit) => retrofit.metrics.estimatedUpfrontProjectCost != null)) score += 5;
  if (!hasBill) return Math.min(40, score);
  if (pageMissing.includes("project quote") || pageMissing.includes("fixture count") || pageMissing.includes("tax/entity information")) {
    return Math.min(65, score);
  }
  return Math.min(85, score);
}

function estimateMissingInputs(payload: PortalRetrofitRecommendationsResponse | null) {
  const missing: string[] = [];
  if (!payload?.intake?.uploadedUtilityFiles?.length) missing.push("electric bill");
  if (!payload?.intake?.site?.squareFootage) missing.push("square footage");
  missing.push("project quote", "fixture count", "tax/entity information");
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

function confidenceLabelFromRetrofit(retrofit: SampleRetrofitGroup, percent?: number) {
  if (retrofit.opportunities.length === 0) return "Needs review" as const;
  if (retrofit.savingsPreview?.status === "blocked" || retrofit.savingsPreview?.status === "unsupported") return "Needs review" as const;
  if (percent == null) return retrofit.savingsPreview?.status === "calculated" ? "Medium" as const : "Low" as const;
  if (percent >= 80) return "High" as const;
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
    return ["Fixture/bulb count", "Estimated cost per fixture/bulb", "Labor/human resource fee", "Operating hours per day", "Estimated monthly bill savings"];
  }
  if (retrofitTypeId.includes("hvac")) {
    return ["Equipment age", "Estimated project cost", "Building square footage", "Operating hours", "Estimated annual energy reduction", "Labor/human resource fee"];
  }
  if (retrofitTypeId.includes("refrigeration")) {
    return ["Equipment count", "Estimated project cost", "Operating hours", "Estimated annual energy reduction"];
  }
  if (retrofitTypeId.includes("water")) {
    return ["Fixture count", "Monthly water cost", "Estimated water reduction", "Estimated project cost", "Labor/human resource fee"];
  }
  return ["Quantity", "Estimated project cost", "Labor/human resource fee", "Operating hours", "Estimated annual usage reduction"];
}

function withRetrofitId(retrofitId: string, questions: Omit<RetrofitDetailQuestion, "retrofitId">[]): RetrofitDetailQuestion[] {
  return questions.map((question) => ({
    ...question,
    retrofitId
  }));
}

function detailQuestionsForRetrofit(retrofit: SampleRetrofitGroup): RetrofitDetailQuestion[] {
  const id = retrofit.retrofitTypeId;
  if (id.includes("lighting") || id.includes("led")) {
    return withRetrofitId(id, [
      { id: `${id}:fixtures`, question: "How many fixtures or bulbs are being replaced?", answerType: "number" },
      { id: `${id}:type`, question: "What type of lighting is currently installed?", answerType: "select", options: ["Fluorescent", "Incandescent", "Halogen", "Mixed", "Unknown"] },
      { id: `${id}:hours`, question: "How many hours per day are the lights used?", answerType: "number" },
      { id: `${id}:controls`, question: "Are lighting controls or occupancy sensors included?", answerType: "select", options: ["Yes", "No", "Not sure"] },
      { id: `${id}:quote`, question: "Do you already have a project quote?", answerType: "select", options: ["Yes", "No", "In progress"] }
    ]);
  }
  if (id.includes("hvac")) {
    return withRetrofitId(id, [
      { id: `${id}:system`, question: "What type of HVAC system is currently installed?", answerType: "text" },
      { id: `${id}:age`, question: "Approximate age of current equipment?", answerType: "number" },
      { id: `${id}:ductwork`, question: "Is ductwork replacement needed?", answerType: "select", options: ["Yes", "No", "Unknown"] },
      { id: `${id}:quote`, question: "Do you have a quote?", answerType: "select", options: ["Yes", "No", "In progress"] },
      { id: `${id}:controls`, question: "Are controls or smart thermostats included?", answerType: "select", options: ["Yes", "No", "Unknown"] }
    ]);
  }
  if (id.includes("refrigeration")) {
    return withRetrofitId(id, [
      { id: `${id}:units`, question: "How many refrigeration units?", answerType: "number" },
      { id: `${id}:age`, question: "Approximate age of current equipment?", answerType: "number" },
      { id: `${id}:controls`, question: "Are night curtains, doors, controls, or ECM motors included?", answerType: "text" },
      { id: `${id}:hours`, question: "Average operating hours?", answerType: "number" },
      { id: `${id}:quote`, question: "Do you already have a project quote?", answerType: "select", options: ["Yes", "No", "In progress"] }
    ]);
  }
  if (id.includes("ev") || id.includes("charger")) {
    return withRetrofitId(id, [
      { id: `${id}:chargers`, question: "How many chargers?", answerType: "number" },
      { id: `${id}:level`, question: "Charger level?", answerType: "select", options: ["Level 2", "DC fast", "Mixed", "Unknown"] },
      { id: `${id}:use`, question: "Public, employee, fleet, or customer use?", answerType: "select", options: ["Public", "Employee", "Fleet", "Customer", "Mixed"] },
      { id: `${id}:panel`, question: "Is existing panel capacity known?", answerType: "select", options: ["Yes", "No", "Not sure"] },
      { id: `${id}:utilization`, question: "Expected utilization?", answerType: "text" }
    ]);
  }
  if (id.includes("solar")) {
    return withRetrofitId(id, [
      { id: `${id}:roof-control`, question: "Do you control the roof?", answerType: "select", options: ["Yes", "No", "Shared", "Unknown"] },
      { id: `${id}:roof-condition`, question: "What is the roof condition?", answerType: "select", options: ["Good", "Fair", "Needs work", "Unknown"] },
      { id: `${id}:roof-area`, question: "Approximate roof area?", answerType: "number" },
      { id: `${id}:usage`, question: "Approximate annual kWh usage?", answerType: "number" },
      { id: `${id}:quote`, question: "Do you already have a project quote?", answerType: "select", options: ["Yes", "No", "In progress"] }
    ]);
  }
  if (id.includes("water")) {
    return withRetrofitId(id, [
      { id: `${id}:fixtures`, question: "What fixtures or equipment are being upgraded?", answerType: "text" },
      { id: `${id}:bill`, question: "Approximate monthly water bill?", answerType: "number" },
      { id: `${id}:count`, question: "How many fixtures are being replaced?", answerType: "number" },
      { id: `${id}:quote`, question: "Do you already have a project quote?", answerType: "select", options: ["Yes", "No", "In progress"] }
    ]);
  }
  return withRetrofitId(id, [
    { id: `${id}:quantity`, question: "What quantity or scope is being upgraded?", answerType: "text" },
    { id: `${id}:current`, question: "What equipment or process is currently installed?", answerType: "text" },
    { id: `${id}:hours`, question: "How often is it used?", answerType: "text" },
    { id: `${id}:quote`, question: "Do you already have a project quote?", answerType: "select", options: ["Yes", "No", "In progress"] }
  ]);
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
  return preview.possibleGrantMoneyCents ?? null;
}

function missingInfoForRetrofit(retrofit: SampleRetrofitGroup, preview: SampleSavingsPreview | null) {
  const missing: string[] = [];
  if (preview?.status !== "calculated") missing.push("electric bill");
  if (!retrofit.opportunities.length) missing.push("selected opportunity");
  if (retrofit.opportunities.some((opportunity) => opportunity.unresolvedRequirements.includes("project quote"))) missing.push("project quote");
  if (retrofit.retrofitTypeId.includes("led") || retrofit.retrofitTypeId.includes("lighting")) missing.push("fixture count");
  if (retrofit.opportunities.some((opportunity) => normalizeOpportunityType(opportunity.sourceSummary?.programType).includes("tax"))) {
    missing.push("tax/entity information");
  }
  return [...new Set(missing)];
}

function assumptionUnit(label: string) {
  const value = label.toLowerCase();
  if (value.includes("hour")) return "hours/day";
  if (value.includes("month")) return "USD/month";
  if (value.includes("annual")) return "%/year";
  if (value.includes("cost") || value.includes("fee")) return "USD";
  if (value.includes("square footage")) return "sq ft";
  if (value.includes("fixture") || value.includes("count") || value.includes("quantity")) return "count";
  return "Value";
}

function opportunityApplicationProcess(opportunity: SampleMatchResult) {
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

function opportunityLengthLabel(opportunity: SampleMatchResult) {
  if (opportunity.blockers.length > 0) return "Longer review expected";
  if (opportunity.unresolvedRequirements.length > 2) return "Moderate review timeline";
  return "Timeline unavailable from current source data";
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

function comparePreviewRetrofits(a: RetrofitPreviewCard, b: RetrofitPreviewCard, sortBy: string) {
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
  return scenario.selectedOpportunityIds.filter((id) => selectedOpportunityIds[id]).length;
}

export function getOpportunityIncludedLabel(opportunity: RetrofitOpportunityPreview, selected: boolean) {
  if (selected) return "Included in current estimate";
  return opportunity.includedState;
}

function includedStateFromOpportunity(isIncluded: boolean, needsMoreInfo: boolean): RetrofitOpportunityPreview["includedState"] {
  if (isIncluded) return "Included in current estimate";
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
            <p className="empty-state">Loading the client portal preview...</p>
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
const ADMIN_RETROFITS_TAB = "Retrofits";
const ADMIN_TEST_CASES_TAB = "Test Cases";
const ADMIN_USER_PREVIEW_TAB = "User Preview";
const ADMIN_HIDDEN_DATA_TABLE_NAMES = new Set(["gbs-client-intake", "gbs-energy-data", "gbs-users"]);
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
  if (tab === ADMIN_RETROFITS_TAB) return "database:retrofits";
  if (tab === ADMIN_TEST_CASES_TAB) return "test-cases";
  return tab === "Users" ? "users" : `table:${tab}`;
}

function AdminDashboard({
  credential,
  onSignOut,
  payload
}: {
  credential: AuthCredential | null;
  onSignOut: () => void;
  payload: AdminPayload;
}) {
  const [adminPayload, setAdminPayload] = useState(payload);
  const [activeTab, setActiveTab] = useState("Users");
  const [error, setError] = useState<string | null>(null);
  const [loadedSections, setLoadedSections] = useState<string[]>([]);
  const [loadingSectionKey, setLoadingSectionKey] = useState<string | null>(null);
  const { admin, users: rows, dataTables } = adminPayload;
  const navItems = [
    "Users",
    ADMIN_USER_PREVIEW_TAB,
    ADMIN_TEST_CASES_TAB,
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

    if (tab === ADMIN_TEST_CASES_TAB || tab === ADMIN_OPPORTUNITIES_TAB || tab === ADMIN_RETROFITS_TAB) {
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
    setLoadedSections([]);
    setLoadingSectionKey(null);
  }, [payload]);

  useEffect(() => {
    const isVisibleDataTable =
      activeTab !== OPPORTUNITIES_TABLE_NAME &&
      !ADMIN_HIDDEN_DATA_TABLE_NAMES.has(activeTab) &&
      dataTables.some((table) => table.name === activeTab);

    if (
      activeTab !== "Users" &&
      activeTab !== ADMIN_TEST_CASES_TAB &&
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
    if (item === ADMIN_TEST_CASES_TAB) {
      window.open(pathForRoute("testcases"), "_blank", "noopener,noreferrer");
      return;
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

type UserPreviewOption = {
  userId: string;
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
  const [rows, setRows] = useState(initialRows);
  const [selectedUserId, setSelectedUserId] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("userId") || "";
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previewOptions = useMemo(() => buildUserPreviewOptions(rows), [rows]);
  const selectedOption =
    previewOptions.find((option) => option.userId === selectedUserId) ||
    previewOptions.find((option) => option.hasIntake) ||
    previewOptions[0] ||
    null;

  useEffect(() => {
    if (!selectedOption || selectedUserId === selectedOption.userId) return;
    setSelectedUserId(selectedOption.userId);
  }, [selectedOption, selectedUserId]);

  useEffect(() => {
    let isActive = true;

    async function loadPreviewUsers() {
      if (!credential) {
        setError("Sign in again to load user previews.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await apiGet<AdminUsersResponse>("/api/admin/users", {
          headers: adminAuthHeaders(credential)
        });
        if (isActive) {
          setRows(response.users);
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

    void loadPreviewUsers();

    return () => {
      isActive = false;
    };
  }, [credential]);

  useEffect(() => {
    if (!selectedOption || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("userId", selectedOption.userId);
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
      const response = await apiGet<AdminUsersResponse>("/api/admin/users", {
        headers: adminAuthHeaders(credential)
      });
      setRows(response.users);
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
    <main className="user-preview-standalone-page">
      <header className="user-preview-toolbar">
        <div className="brand-block">
          <img alt="RetroFi" className="workspace-logo" src="/retrofi-logo.png" />
          <div>
            <p className="eyebrow">Admin workspace</p>
            <h1>User Preview</h1>
          </div>
        </div>
        <div className="user-preview-actions">
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
      </header>

      {error ? <p className="error-message">{error}</p> : null}

      {selectedOption ? (
        <CustomerRetrofitEstimatesPanel
          credential={credential}
          emptyMessage="This client does not have any eligible retrofit matches yet."
          endpoint={`/api/admin/client-retrofit-recommendations/${encodeURIComponent(selectedOption.userId)}`}
          eyebrow="Admin user preview"
          intro={`Customer-facing preview for ${selectedOption.clientName}, powered by live profile and opportunity data.`}
          key={selectedOption.userId}
          loadingMessage="Loading live retrofit recommendations for this client..."
          title="Retrofit Recommendations"
        />
      ) : (
        <section className="retrofit-preview-page">
          <article className="retrofit-preview-card">
            <h2>{isLoading ? "Loading fake test users..." : "No fake test users available"}</h2>
            <p>The 50 promoted test-case users will appear in the dropdown after the admin user list loads.</p>
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
      clientName: row.user.fullName || row.intake?.contact.fullName || row.user.email,
      companyName: row.user.companyName || row.intake?.business.companyName || null,
      email: row.user.email,
      hasIntake: Boolean(row.intake)
    }))
    .sort((left, right) => Number(right.hasIntake) - Number(left.hasIntake) || left.clientName.localeCompare(right.clientName));
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
        <p className="muted-message">Loading generated matching results...</p>
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
              <h4>{retrofit.displayName}</h4>
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
  const possibleGrantEntries = (preview.costBreakdown || []).filter((entry) => entry.kind === "possible_grant");
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
        <PossibleGrantCard entries={possibleGrantEntries} totalAmountCents={preview.possibleGrantMoneyCents ?? 0} />
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

function PossibleGrantCard({ entries, totalAmountCents }: { entries: SampleSavingsLedgerEntry[]; totalAmountCents: number }) {
  return (
    <section className="savings-equation-card">
      <h4>Possible grant money</h4>
      {entries.length > 0 ? (
        <>
          <ul className="savings-equation-list">
            {entries.map((entry) => (
              <li key={entry.id || `${entry.category}:${entry.amountCents}`}>
                <strong className="savings-positive">{formatSignedCents(Math.abs(entry.amountCents || 0))}</strong>
                <span>{entry.label || formatSavingsCategory(entry.category)}</span>
              </li>
            ))}
          </ul>
          <div className="savings-equation-total">
            <strong className="savings-positive">{formatSignedCents(totalAmountCents)}</strong>
            <span>Total possible grant money</span>
          </div>
        </>
      ) : (
        <p>No possible grant money modeled.</p>
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
        {rows.length === 0 ? (
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
            {filteredRetrofits.length === 0 && !isLoading ? (
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

        <RetrofitDatabaseDetail retrofit={selectedRetrofit} />
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
            <p>Loading {dataTable?.name || "table data"}...</p>
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
          {filteredRecords.length === 0 ? (
            <p className="empty-state">
              {isLoading ? "Loading opportunity candidates..." : "No opportunities match the current filters."}
            </p>
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
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
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
  const isAdminSignedIn = authPayload?.dashboard === "admin";

  useEffect(() => {
    function syncRoute() {
      const nextRoute = routeFromPath();
      if (window.location.pathname === "/database") {
        window.history.replaceState({}, "", pathForRoute(nextRoute));
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

  function handleAuthSuccess(payload: AuthPayload, credential: AuthCredential) {
    storeAuthCredential(credential);
    setAuthPayload(payload);
    setAuthCredential(credential);
    setSignInMessage(null);
    navigate(
      payload.dashboard === "admin"
        ? route === "testcases" || route === "user-preview"
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
    return <SessionRestoringPage navigate={navigate} />;
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
      return <HomePage navigate={navigate} publicAuth={publicAuth} />;
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

  if (effectiveRoute === "portal" || effectiveRoute === "admin") {
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
          onSignOut={signOut}
          payload={authPayload.adminDashboard}
        />
      );
    }

    return <UserDashboard credential={authCredential} onSignOut={signOut} payload={authPayload} />;
  }

  return <HomePage navigate={navigate} publicAuth={publicAuth} />;
}
