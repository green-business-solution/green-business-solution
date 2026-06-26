import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "./api";
import type { AuthCredential } from "./authTypes";
import {
  AUTH_CREDENTIAL_STORAGE_KEY,
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

type UserRecord = {
  userId: string;
  role: "client" | "admin";
  status: string;
  fullName: string;
  email: string;
  companyName: string | null;
  authProvider: string;
  googleLinked: boolean;
  createdAt: string;
  lastLoginAt: string | null;
};

type PublicAuthState = {
  isAdmin: boolean;
  isSignedIn: boolean;
  onSignOut: () => void;
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
  createdAt: string;
  updatedAt: string;
};

type PortalPayload = {
  user: UserRecord;
  intake: IntakeRecord | null;
};

type AdminRow = {
  user: UserRecord;
  intake: IntakeRecord | null;
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

type SampleCount = {
  value: string;
  count: number;
};

type SampleRetrofitGroup = {
  retrofitTypeId: string;
  displayName: string;
  parentCategory: string;
  isPhysicalRetrofit: boolean;
  opportunityCount: number;
  opportunities: SampleMatchResult[];
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
    technologyIds?: string[];
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
  sampleUserCount: number;
  retrofitTaxonomyVersion?: string;
  testCases: SampleMatchingTestCase[];
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
  { label: "Retail", description: "Storefront or customer-facing space", value: "Retail" },
  { label: "Restaurant / commercial kitchen", description: "Food service or kitchen operation", value: "Restaurant / Commercial Kitchen" },
  { label: "Grocery / convenience store", description: "Food retail or convenience format", value: "Grocery / Convenience Store" },
  { label: "Warehouse", description: "Storage, logistics, or fulfillment space", value: "Warehouse" },
  { label: "Industrial", description: "Manufacturing or heavy-use facility", value: "Industrial" },
  { label: "Hospitality", description: "Hotel, lodging, or guest-serving property", value: "Hospitality" },
  { label: "Medical / dental office", description: "Healthcare or clinical office", value: "Medical / Dental Office" },
  { label: "Mixed-use", description: "Multiple uses in one property", value: "Mixed-use" },
  { label: "Other", description: "Another building type", value: "Other" }
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
        question: "What type of building is it?",
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
      ctaLabel: "Get Started",
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
    ["Complete the free scan", "Share your business address, utility provider, organization type, and basic facility information."],
    ["Receive an opportunity preview", "See estimated value range, likely retrofit categories, and whether your facility appears to have meaningful opportunities."],
    ["Upload utility bills", "Utility bills help RetroFi estimate savings, ROI, payback, and project priority."],
    ["Unlock the Opportunity Report", "Get exact programs, eligibility analysis, savings estimates, financing options, required documents, and deadlines."],
    ["Get implementation support", "For businesses ready to move forward, RetroFi can help organize documents, review quotes, and track next steps."]
  ];

  return (
    <PublicShell navigate={navigate} publicAuth={publicAuth}>
      <PageHero
        compact
        eyebrow="Process"
        title="How RetroFi Works"
        copy="From a quick business scan to a detailed retrofit roadmap, RetroFi helps you move from opportunity discovery to implementation."
      />
      <section className="timeline-section">
        {steps.map(([title, copy], index) => (
          <article className="timeline-step" key={title}>
            <span>{index + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="two-column-section">
        <article className="feature-card list-card">
          <h2>What you need to start</h2>
          <ul>
            {[
              "Business address",
              "Utility provider",
              "Organization type",
              "Business/building type",
              "Approximate square footage",
              "Recent utility bills for detailed analysis"
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="comparison-card list-card">
          <h2>Free scan vs full report</h2>
          <div className="comparison-grid">
            <div>
              <h3>Free Scan</h3>
              <ul>
                <li>Estimated value range</li>
                <li>General opportunity categories</li>
                <li>Basic eligibility preview</li>
              </ul>
            </div>
            <div>
              <h3>Opportunity Report</h3>
              <ul>
                <li>Exact program details</li>
                <li>ROI/payback estimates</li>
                <li>Document checklist</li>
                <li>Deadlines</li>
                <li>Prioritized roadmap</li>
              </ul>
            </div>
          </div>
        </article>
      </section>
      <section className="final-cta">
        <h2>Move from discovery to a practical retrofit decision path.</h2>
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
              "Interested improvements",
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

function ScanResultsPage({
  navigate,
  publicAuth
}: {
  navigate: (route: Route) => void;
  publicAuth: PublicAuthState;
}) {
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
            ["Recommended next step", "Upload utility bills for detailed savings and ROI"]
          ].map(([label, value]) => (
            <article className="feature-card" key={label}>
              <span className="eyebrow">{label}</span>
              <h3>{value}</h3>
            </article>
          ))}
        </div>
        <div className="hero-actions">
          <CTAButton navigate={navigate} route="home" variant="secondary">Back to Home</CTAButton>
          <button disabled type="button">Upload Utility Bills</button>
        </div>
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
      await apiPost<PortalPayload>("/api/intake", {
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
          <div className="conversational-step-shell">
            <div className="conversational-step-header">
              <div className="conversational-step-meta">
                {stepIndex > 0 ? (
                  <button className="step-back-link" disabled={isSubmitting} onClick={goBack} type="button">
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <span className="step-chip">
                  <span className="step-chip-label">{`STEP ${displayStepCurrent}`}</span>
                  <span className="step-chip-dot" />
                  <span className="step-chip-section">{currentStep?.section}</span>
                </span>
              </div>
            </div>
            <div className="conversational-step-body" key={currentStep?.id}>
              <h2>{currentStep?.question}</h2>
              {currentStep?.description ? <p>{currentStep.description}</p> : null}
              {currentStep?.optional ? <p className="required-note">Optional</p> : null}
              {renderStepBody()}
            </div>
          </div>
          {error ? <p className="error-message">{error}</p> : null}
          <div className="conversational-footer">
            <div className="privacy-line">
              <LockIcon />
              <span>Your information is kept private and used only to prepare your recommendations.</span>
            </div>
            <div className="conversational-actions">
              <div className="conversational-action-group">
                {currentStep?.kind === "choice" && currentStep.optional ? (
                  <button className="secondary-button" disabled={isSubmitting} onClick={goNext} type="button">
                    Skip for now
                  </button>
                ) : null}
                {currentStep?.kind === "choice" && canAdvanceCurrentStep() ? (
                  <button className="step-next-button" disabled={isSubmitting} type="submit">
                    Next →
                  </button>
                ) : null}
                {(currentStep?.kind === "input" || currentStep?.kind === "textarea") && canAdvanceCurrentStep() ? (
                  <button className="step-next-button" disabled={isSubmitting} type="submit">
                    Next →
                  </button>
                ) : null}
                {currentStep?.kind === "review" ? (
                  <button className="step-next-button" disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Submitting..." : currentStep.ctaLabel || "Get Started"}
                  </button>
                ) : null}
              </div>
            </div>
            <ProgressBar current={displayStepCurrent} total={displayStepTotal} />
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
  payload,
  onSignOut
}: {
  payload: AuthPayload;
  onSignOut: () => void;
}) {
  return (
    <WorkspaceLayout navItems={["My information"]} onSignOut={onSignOut} title="User portal" user={payload.user}>
      <ProfilePanel intake={payload.intake} user={payload.user} />
    </WorkspaceLayout>
  );
}

const ADMIN_DATABASE_TAB = "Database";
const ADMIN_TEST_CASES_TAB = "Test Cases";
const ADMIN_TEST_CASES_DATA_PATH = "/sample_matching_test_cases.json";
const SAMPLE_MATCH_STATUS_ORDER = [
  "eligible_active",
  "likely_eligible",
  "needs_information",
  "upcoming",
  "manual_review",
  "ineligible",
  "unavailable"
];

function adminSectionKey(tab: string) {
  if (tab === ADMIN_DATABASE_TAB) return "database";
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
    ADMIN_TEST_CASES_TAB,
    ...dataTables.filter((table) => table.name !== OPPORTUNITIES_TABLE_NAME).map((table) => table.name),
    ADMIN_DATABASE_TAB
  ];
  const selectedDataTable =
    activeTab === ADMIN_DATABASE_TAB || activeTab === ADMIN_TEST_CASES_TAB
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

    if (tab === ADMIN_TEST_CASES_TAB) {
      markSectionLoaded(sectionKey);
      return;
    }

    if (!credential) {
      setError("Sign in again to refresh the admin dashboard.");
      return;
    }

    if (tab === ADMIN_DATABASE_TAB) {
      markSectionLoaded(sectionKey);
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
      dataTables.some((table) => table.name === activeTab);

    if (
      activeTab !== "Users" &&
      activeTab !== ADMIN_TEST_CASES_TAB &&
      activeTab !== ADMIN_DATABASE_TAB &&
      !isVisibleDataTable
    ) {
      setActiveTab("Users");
    }
  }, [activeTab, dataTables]);

  useEffect(() => {
    void loadDashboardSection(activeTab);
  }, [activeTab, credential, loadedSections]);

  return (
    <WorkspaceLayout
      activeNavItem={activeTab}
      navItems={navItems}
      onNavItemChange={setActiveTab}
      onSignOut={onSignOut}
      title="Admin"
      user={admin}
    >
      {error ? <p className="error-message">{error}</p> : null}
      {activeTab === "Users" ? (
        <AdminUsersPanel isLoading={isCurrentSectionLoading} onRefresh={() => void refreshDashboard()} rows={rows} />
      ) : activeTab === ADMIN_TEST_CASES_TAB ? (
        <AdminTestCasesPanel />
      ) : activeTab === ADMIN_DATABASE_TAB ? (
        <AdminDatabasePanel credential={credential} />
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

function AdminTestCasesPanel() {
  const [dataset, setDataset] = useState<SampleMatchingTestCasesData | null>(null);
  const [selectedTestCaseId, setSelectedTestCaseId] = useState("");
  const [selectedRetrofitTypeId, setSelectedRetrofitTypeId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const testCases = dataset?.testCases || [];
  const selectedTestCase = testCases.find((testCase) => testCase.sampleUserId === selectedTestCaseId) || testCases[0];
  const selectedRetrofit =
    selectedTestCase?.retrofits?.find((retrofit) => retrofit.retrofitTypeId === selectedRetrofitTypeId) ||
    selectedTestCase?.retrofits?.[0] ||
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
    const retrofits = selectedTestCase.retrofits || [];
    if (retrofits.length === 0) {
      setSelectedRetrofitTypeId("");
      return;
    }
    if (!retrofits.some((retrofit) => retrofit.retrofitTypeId === selectedRetrofitTypeId)) {
      setSelectedRetrofitTypeId(retrofits[0].retrofitTypeId);
    }
  }, [selectedTestCase, selectedRetrofitTypeId]);

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
  const normalizedProfile = selectedTestCase.normalizedProfile;
  const business = normalizedProfile.business || {};
  const site = normalizedProfile.site || {};
  const geo = site.geo || {};
  const utility = site.utility?.electric || {};
  const project = normalizedProfile.project || {};
  const retrofitGroups = selectedTestCase.retrofits || [];
  const statusRows = SAMPLE_MATCH_STATUS_ORDER.map((status) => ({
    status,
    count: selectedTestCase.statusCounts[status] || 0
  }));

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Matching test cases</p>
          <h2>Sample profile results</h2>
          <p className="muted-message">
            Generated {formatDate(dataset?.generatedAt || null)} from {dataset?.opportunityCount.toLocaleString() || "0"} opportunities.
          </p>
        </div>
      </div>

      <div className="test-case-controls">
        <label className="field">
          <span>Test case</span>
          <select onChange={(event) => setSelectedTestCaseId(event.target.value)} value={selectedTestCase.sampleUserId}>
            {testCases.map((testCase) => (
              <option key={testCase.sampleUserId} value={testCase.sampleUserId}>
                {testCase.sampleUserId}
              </option>
            ))}
          </select>
        </label>
        <p>{selectedTestCase.description}</p>
      </div>

      <div className="test-case-layout">
        <article className="data-card">
          <div>
            <p className="eyebrow">Form profile</p>
            <h3>{sampleValue(sourceForm.companyName, "Sample user")}</h3>
          </div>
          <div className="opportunity-summary-grid test-case-profile-grid">
            <DetailItem label="Organization" value={sampleValue(sourceForm.organizationType)} />
            <DetailItem label="Size" value={sampleValue(sourceForm.organizationSize)} />
            <DetailItem label="Site" value={sampleValue(sourceForm.siteAddress)} />
            <DetailItem label="Utility" value={sampleValue(sourceForm.electricUtilityProvider)} />
            <DetailItem label="Ownership" value={sampleValue(sourceForm.ownershipStatus)} />
            <DetailItem label="Building" value={sampleValue(sourceForm.buildingType)} />
            <DetailItem label="Square feet" value={sampleValue(sourceForm.squareFootage)} />
            <DetailItem label="Improvements" value={sampleList(toStringArray(sourceForm.interestedImprovements))} />
          </div>
          <section className="detail-section">
            <h4>Normalized matcher profile</h4>
            <div className="opportunity-summary-grid test-case-profile-grid">
              <DetailItem label="Applicant types" value={sampleList(business.organizationTypes)} />
              <DetailItem label="State / ZIP" value={`${sampleValue(geo.stateCode)} / ${sampleValue(geo.zip5)}`} />
              <DetailItem label="Utility ID" value={sampleValue(utility.distributionUtilityId)} />
              <DetailItem label="Utility status" value={sampleValue(utility.verificationStatus)} />
              <DetailItem label="Site control" value={sampleValue(site.ownershipRelationship)} />
              <DetailItem label="Building types" value={sampleList(site.buildingTypes)} />
              <DetailItem label="Square feet" value={sampleSquareFootage(site.squareFootage)} />
              <DetailItem label="Technologies" value={sampleList(project.technologyIds)} />
            </div>
          </section>
        </article>

        <div className="test-case-results">
          <div className="test-case-stat-grid">
            {statusRows.map(({ status, count }) => (
              <article className="data-card test-case-stat-card" key={status}>
                <span>{sampleStatusLabel(status)}</span>
                <strong>{count.toLocaleString()}</strong>
              </article>
            ))}
          </div>

          <TestCaseRelationshipGraph
            onSelectRetrofit={setSelectedRetrofitTypeId}
            retrofits={retrofitGroups}
            selectedRetrofitTypeId={selectedRetrofit?.retrofitTypeId || ""}
          />

          <article className="data-card">
            <div>
              <p className="eyebrow">Retrofits from matched opportunities</p>
              <h3>{retrofitGroups.length} retrofit types</h3>
            </div>
            <div className="retrofit-button-grid">
              {retrofitGroups.length === 0 ? (
                <p className="empty-state">No retrofit types were inferred for this test case.</p>
              ) : (
                retrofitGroups.map((retrofit) => (
                  <button
                    aria-pressed={retrofit.retrofitTypeId === selectedRetrofit?.retrofitTypeId}
                    className="retrofit-filter-button"
                    key={retrofit.retrofitTypeId}
                    onClick={() => setSelectedRetrofitTypeId(retrofit.retrofitTypeId)}
                    type="button"
                  >
                    <span>{retrofit.displayName}</span>
                    <small>
                      {retrofit.opportunityCount.toLocaleString()} {retrofit.opportunityCount === 1 ? "opportunity" : "opportunities"}
                    </small>
                  </button>
                ))
              )}
            </div>
          </article>

          <article className="data-card">
            <div>
              <p className="eyebrow">Opportunities for selected retrofit</p>
              <h3>{selectedRetrofit ? selectedRetrofit.displayName : "No retrofit selected"}</h3>
              {selectedRetrofit ? (
                <p className="muted-message">
                  {selectedRetrofit.opportunityCount.toLocaleString()} matching opportunities for this test case.
                </p>
              ) : null}
            </div>
            <div className="match-result-list">
              {!selectedRetrofit ? (
                <p className="empty-state">Select a retrofit type to see related opportunities.</p>
              ) : selectedRetrofit.opportunities.length === 0 ? (
                <p className="empty-state">No opportunities were generated for this retrofit type.</p>
              ) : (
                selectedRetrofit.opportunities.map((result) => (
                  <SampleMatchCard key={`${selectedRetrofit.retrofitTypeId}:${result.opportunityId}:${result.offerId || "offer"}`} result={result} />
                ))
              )}
            </div>
          </article>

          <div className="test-case-insight-grid">
            <SampleCountCard title="Common next questions" values={selectedTestCase.commonQuestions} />
            <SampleCountCard title="Common unresolved requirements" values={selectedTestCase.unresolved} />
            <SampleCountCard title="Common blockers" values={selectedTestCase.blockers} />
          </div>
        </div>
      </div>
    </section>
  );
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
  onSelectRetrofit,
  retrofits,
  selectedRetrofitTypeId
}: {
  onSelectRetrofit: (retrofitTypeId: string) => void;
  retrofits: SampleRetrofitGroup[];
  selectedRetrofitTypeId: string;
}) {
  const graph = useMemo(() => buildRelationshipGraph(retrofits), [retrofits]);
  const activeRetrofitId = selectedRetrofitTypeId || retrofits[0]?.retrofitTypeId || "";
  const selectedOpportunityKeys = new Set(
    graph.edges.filter((edge) => edge.retrofitTypeId === activeRetrofitId).map((edge) => edge.opportunityKey)
  );
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
                return (
                  <line
                    className={`relationship-edge${isActive ? " is-active" : ""}`}
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
                return (
                  <g
                    className={`relationship-node relationship-opportunity-node${isConnected ? " is-connected" : ""}`}
                    key={opportunity.graphKey}
                  >
                    <title>
                      {opportunity.opportunityName}: connected to {opportunity.retrofitCount.toLocaleString()} retrofit types
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

function SampleCountCard({ title, values }: { title: string; values: SampleCount[] }) {
  return (
    <article className="data-card sample-count-card">
      <h3>{title}</h3>
      {values.length > 0 ? (
        <ol>
          {values.slice(0, 5).map((item) => (
            <li key={item.value}>
              <span>{item.value}</span>
              <strong>{item.count.toLocaleString()}</strong>
            </li>
          ))}
        </ol>
      ) : (
        <p>No values reported.</p>
      )}
    </article>
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
  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Google-authenticated users</p>
          <h2>Client intake records</h2>
        </div>
        <button className="secondary-button" disabled={isLoading} onClick={onRefresh} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="admin-table" role="table" aria-label="Client intake records">
        <div className="admin-row admin-head" role="row">
          <span role="columnheader">Name</span>
          <span role="columnheader">Company</span>
          <span role="columnheader">Site</span>
          <span role="columnheader">Building</span>
          <span role="columnheader">Improvements and goals</span>
          <span role="columnheader">Created</span>
        </div>
        {rows.length === 0 ? (
          <div className="admin-row admin-empty-row" role="row">
            <span role="cell">
              <strong>{isLoading ? "Loading client records..." : "No client records loaded."}</strong>
              <small>{isLoading ? "This tab is loading after sign-in." : "Use Refresh to load the latest records."}</small>
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
              {intake?.sustainability.interestedImprovements?.join(", ") || intake?.sustainability.notes || "No notes provided"}
              <small>{intake?.sustainability.goals || "Conversational intake"}</small>
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
          <div className="brand-mark" aria-hidden="true">
            G
          </div>
          <div>
            <p className="eyebrow">Workspace</p>
            <strong>Green Business Solution</strong>
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
      </aside>
      <main className="workspace-main">
        <header className="workspace-topbar">
          <div>
            <p className="eyebrow">{title}</p>
            <h1>{user.fullName}</h1>
          </div>
          <div className="session-chip">
            <span>{user.email}</span>
            <button className="secondary-button" onClick={onSignOut} type="button">
              Sign out
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
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
          <dt>Interested improvements</dt>
          <dd>{intake.sustainability.interestedImprovements?.join(", ") || "Not provided"}</dd>
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
    navigate(payload.dashboard === "admin" ? "admin" : "portal");
  }

  function signOut() {
    clearStoredAuthCredential();
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

    return <UserDashboard onSignOut={signOut} payload={authPayload} />;
  }

  return <HomePage navigate={navigate} publicAuth={publicAuth} />;
}
