import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

const LockIcon = () => (
  <svg aria-hidden="true" className="lock-icon" fill="none" viewBox="0 0 24 24">
    <path
      d="M7 10V8a5 5 0 0 1 10 0v2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <rect
      height="10"
      rx="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      width="14"
      x="5"
      y="10"
    />
  </svg>
);

type Route = "home" | "get-started" | "portal" | "admin";

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
    ownershipStatus: string;
    buildingType: string;
    squareFootage: string;
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

type OpportunityRecord = {
  opportunityId: string;
  canonicalTitle?: string;
  normalizedTitle?: string;
  sourceKey?: string;
  sourceName?: string;
  sourceUrl?: string;
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
  programType?: string;
  summary?: string;
  administrator?: string;
  deliveryPartner?: string | null;
  applicationUrl?: string | null;
  websiteUrl?: string | null;
  technologies?: unknown;
  sectors?: unknown;
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
  raw?: unknown;
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

type AuthPayload = {
  dashboard: "client" | "admin";
  user: UserRecord;
  intake: IntakeRecord | null;
  adminDashboard: AdminPayload | null;
};

type GoogleCredentialResponse = {
  credential?: string;
  select_by?: string;
};

type GoogleButtonOptions = {
  logo_alignment?: "left" | "center";
  shape?: "rectangular" | "pill" | "circle" | "square";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  theme?: "outline" | "filled_blue" | "filled_black";
  width?: number;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            callback: (response: GoogleCredentialResponse) => void;
            cancel_on_tap_outside?: boolean;
            client_id: string;
          }) => void;
          renderButton: (parent: HTMLElement, options: GoogleButtonOptions) => void;
        };
      };
    };
  }
}

type IntakeFormState = {
  fullName: string;
  email: string;
  phone: string;
  roleTitle: string;
  contactPreference: string;
  siteAddress: string;
  electricUtilityProvider: string;
  companyName: string;
  website: string;
  industry: string;
  organizationType: string;
  organizationSize: string;
  headquarters: string;
  ownershipStatus: string;
  buildingType: string;
  squareFootage: string;
  interestedImprovements: string[];
  sustainabilityGoals: string;
  currentChallenges: string;
  monthlyUtilitySpend: string;
  timeline: string;
  notes: string;
};

const initialFormState: IntakeFormState = {
  fullName: "",
  email: "",
  phone: "",
  roleTitle: "",
  contactPreference: "Email",
  siteAddress: "",
  electricUtilityProvider: "",
  companyName: "",
  website: "",
  industry: "",
  organizationType: "",
  organizationSize: "",
  headquarters: "",
  ownershipStatus: "",
  buildingType: "",
  squareFootage: "",
  interestedImprovements: [],
  sustainabilityGoals: "",
  currentChallenges: "",
  monthlyUtilitySpend: "",
  timeline: "",
  notes: ""
};

const metrics = [
  { label: "Open initiatives", value: "12", tone: "green" },
  { label: "Monthly savings tracked", value: "$8.4k", tone: "blue" },
  { label: "CO2e avoided", value: "31.7t", tone: "amber" }
];

const initiatives = [
  ["Energy efficiency audit", "18% utility reduction"],
  ["Supplier sustainability scorecard", "42 vendors mapped"],
  ["Waste diversion tracking", "63% diversion rate"]
];

const utilityProviderOptions = ["PG&E", "SCE", "SDG&E", "SVP", "Other"];
const organizationTypeOptions = [
  "Commercial Business",
  "Industrial Facility",
  "Agricultural Operation",
  "Multifamily Property",
  "Nonprofit Organization",
  "Government / Public Agency",
  "Other"
];
const ownershipStatusOptions = ["Own", "Lease", "Manage"];
const buildingTypeOptions = [
  "Office",
  "Retail",
  "Restaurant",
  "Warehouse",
  "Manufacturing",
  "Grocery",
  "Hospitality",
  "Healthcare",
  "Education",
  "Other"
];
const improvementOptions = [
  "LED",
  "HVAC",
  "Refrigeration",
  "Solar",
  "EV Charging",
  "Water Efficiency",
  "Building Controls",
  "Show Me Everything"
];

const staleSessionKeys = ["gbs-user-session", "gbs-admin-session"];
const googleClientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "754037986401-dgklhhhtjr2k8u9jcj47fdf1jrf9baep.apps.googleusercontent.com";
const googleIdentityScriptUrl = "https://accounts.google.com/gsi/client";
const opportunitiesTableName = "gbs-opportunity-candidates";
let googleIdentityScriptPromise: Promise<void> | null = null;

function loadGoogleIdentityScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (!googleIdentityScriptPromise) {
    googleIdentityScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${googleIdentityScriptUrl}"]`
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener("error", () => reject(new Error("Google sign-in failed to load.")), {
          once: true
        });
        return;
      }

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = googleIdentityScriptUrl;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Google sign-in failed to load."));
      document.head.appendChild(script);
    });
  }

  return googleIdentityScriptPromise;
}

function routeFromPath(): Route {
  if (window.location.pathname === "/get-started") return "get-started";
  if (window.location.pathname === "/portal") return "portal";
  if (window.location.pathname === "/admin") return "admin";
  return "home";
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch {
    throw new Error(
      "Could not reach the local API. Run `npm run dev` from the repo root and confirm the API is running at http://127.0.0.1:8787."
    );
  }

  const text = await response.text();
  let payload: { error?: string } = {};

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = {};
    }
  }

  if (!response.ok) {
    const fallback =
      response.status >= 500
        ? "The local API returned an error. Check the terminal running `npm run dev`; if AWS credentials are mentioned, run `aws sso login --profile gbs` and restart the dev server."
        : `Request failed with HTTP ${response.status}.`;
    throw new Error(payload.error || fallback);
  }

  return payload as T;
}

function GoogleSignInButton<T>({
  endpoint,
  onSuccess
}: {
  endpoint: string;
  onSuccess: (payload: T, credential: string) => void;
}) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const onSuccessRef = useRef(onSuccess);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    let isMounted = true;

    async function renderGoogleButton() {
      if (!googleClientId) {
        setError("Google sign-in is not configured.");
        setIsLoading(false);
        return;
      }

      try {
        await loadGoogleIdentityScript();
      } catch (scriptError) {
        if (!isMounted) return;
        setError(scriptError instanceof Error ? scriptError.message : "Google sign-in failed to load.");
        setIsLoading(false);
        return;
      }

      if (!isMounted || !buttonRef.current || !window.google?.accounts?.id) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        cancel_on_tap_outside: true,
        callback: async (response) => {
          const credential = response.credential;
          if (!credential) {
            setError("Google did not return a sign-in credential.");
            return;
          }

          setError(null);
          setIsSigningIn(true);
          try {
            const payload = await apiPost<T>(endpoint, { credential });
            onSuccessRef.current(payload, credential);
          } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Google sign-in failed.");
          } finally {
            setIsSigningIn(false);
          }
        }
      });

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        logo_alignment: "left",
        shape: "rectangular",
        size: "large",
        text: "continue_with",
        theme: "outline",
        width: 320
      });
      setIsLoading(false);
    }

    void renderGoogleButton();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return (
    <div className="google-auth">
      <div className="google-button-slot" ref={buttonRef} />
      {isLoading ? <p className="muted-message">Loading Google...</p> : null}
      {isSigningIn ? <p className="muted-message">Signing in...</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
    </div>
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

function getOpportunityUtilityProviders(opportunity: OpportunityRecord) {
  return valuesFromParameter(opportunity.matchingParameters?.utilityProvider);
}

function getOpportunityBusinessClassifications(opportunity: OpportunityRecord) {
  const fromMatching = valuesFromParameter(opportunity.matchingParameters?.businessClassification);
  return fromMatching.length > 0 ? fromMatching : toStringArray(opportunity.sectors);
}

function getOpportunityTechnologies(opportunity: OpportunityRecord) {
  return toStringArray(opportunity.technologies);
}

function formatSquareFootage(parameter: MatchParameter | undefined) {
  if (!parameter) return "Not specified";
  if (parameter.min == null && parameter.max == null) return parameter.mode || "Not specified";
  if (parameter.min != null && parameter.max != null) return `${parameter.min} - ${parameter.max} sq ft`;
  if (parameter.min != null) return `At least ${parameter.min} sq ft`;
  return `Up to ${parameter.max} sq ft`;
}

function compactJson(value: unknown) {
  return JSON.stringify(value ?? null, null, 2);
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
  required
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: string[];
  required?: boolean;
}) {
  function toggle(option: string) {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
      return;
    }

    onChange([...values, option]);
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
              checked={values.includes(option)}
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

function HomePage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <main className="landing-page">
      <header className="site-header">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            G
          </div>
          <strong>Green Business Solution</strong>
        </div>
        <nav aria-label="Primary">
          <button className="link-button" onClick={() => navigate("portal")} type="button">
            Sign in
          </button>
        </nav>
      </header>

      <section className="hero-band">
        <div className="hero-copy">
          <p className="eyebrow">Sustainability operations</p>
          <h1>Turn green business ideas into tracked savings, supplier actions, and measurable impact.</h1>
          <p>
            Version 1 focuses on the workflow already sketched for this project: energy efficiency
            audits, supplier sustainability scorecards, waste diversion tracking, monthly savings,
            and CO2e avoided.
          </p>
          <div className="hero-actions">
            <button onClick={() => navigate("get-started")} type="button">
              Get started
            </button>
            <button className="secondary-button" onClick={() => navigate("portal")} type="button">
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="Green Business Solution preview">
          <div className="dashboard-preview">
            <div className="preview-topline">
              <span>Operating dashboard</span>
              <strong>Active</strong>
            </div>
            <div className="preview-metrics">
              {metrics.map((metric) => (
                <div className={`preview-metric preview-${metric.tone}`} key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>
            <div className="preview-list">
              {initiatives.map(([name, result]) => (
                <div key={name}>
                  <span>{name}</span>
                  <strong>{result}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="value-grid" aria-label="What the first version supports">
        <article>
          <h2>Client intake</h2>
          <p>New users complete a required questionnaire and then sign in with Google.</p>
        </article>
        <article>
          <h2>User portal</h2>
          <p>Each client sees only the intake and sustainability information tied to their email.</p>
        </article>
        <article>
          <h2>Admin view</h2>
          <p>Neer and Rajvansh are routed to the shared DynamoDB-backed admin dashboard.</p>
        </article>
      </section>
    </main>
  );
}

function IntakePage({
  navigate,
  onAuthSuccess,
  onIntakeCreated
}: {
  navigate: (route: Route) => void;
  onAuthSuccess: (payload: AuthPayload, credential: string) => void;
  onIntakeCreated: (email: string) => void;
}) {
  const [form, setForm] = useState<IntakeFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingSignInEmail, setPendingSignInEmail] = useState<string | null>(null);

  function updateField(name: keyof IntakeFormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitForm(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = await apiPost<PortalPayload>("/api/intake", form);
      setPendingSignInEmail(payload.user.email);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function continueWithSignInPage(email: string) {
    onIntakeCreated(email);
    setPendingSignInEmail(null);
    navigate("portal");
  }

  return (
    <main className="form-page">
      <button className="back-button" onClick={() => navigate("home")} type="button">
        Back
      </button>
      <section className="form-shell">
        <div className="form-intro">
          <h1>Tell us about your business</h1>
          <p>We&apos;ll use this information to tailor your recommendations.</p>
        </div>

        <form className="intake-form" onSubmit={submitForm}>
          <div className="form-section-heading">
            <h2>Business Information</h2>
            <p className="required-note">
              Required fields are marked with <span aria-hidden="true">*</span>
            </p>
          </div>
          <div className="field-grid">
            <Field
              label="Company name"
              name="companyName"
              onChange={updateField}
              required
              value={form.companyName}
            />
            <Field label="Website" name="website" onChange={updateField} value={form.website} />
            <SelectField
              label="Organization type"
              name="organizationType"
              onChange={updateField}
              options={organizationTypeOptions}
              required
              value={form.organizationType}
            />
            <SelectField
              label="Organization size"
              name="organizationSize"
              onChange={updateField}
              options={["1-10", "11-50", "51-200", "201-1,000", "1,001+"]}
              value={form.organizationSize}
            />
          </div>

          <h2>Site Information</h2>
          <div className="field-grid">
            <TextArea
              label="Site address"
              name="siteAddress"
              onChange={updateField}
              placeholder="Street address, city, state, ZIP"
              required
              value={form.siteAddress}
            />
            <SelectField
              label="Electric utility provider"
              name="electricUtilityProvider"
              onChange={updateField}
              options={utilityProviderOptions}
              required
              value={form.electricUtilityProvider}
            />
            <SelectField
              label="Ownership status"
              name="ownershipStatus"
              onChange={updateField}
              options={ownershipStatusOptions}
              required
              value={form.ownershipStatus}
            />
            <SelectField
              label="Building type"
              name="buildingType"
              onChange={updateField}
              options={buildingTypeOptions}
              required
              value={form.buildingType}
            />
            <Field
              label="Square footage"
              name="squareFootage"
              onChange={updateField}
              placeholder="Approximate is fine"
              required
              value={form.squareFootage}
            />
            <CheckboxGroup
              label="Interested improvements"
              onChange={(values) =>
                setForm((current) => ({
                  ...current,
                  interestedImprovements: values
                }))
              }
              options={improvementOptions}
              required
              values={form.interestedImprovements}
            />
          </div>

          <h2>Contact Information</h2>
          <div className="field-grid">
            <Field label="Email" name="email" onChange={updateField} required type="email" value={form.email} />
            <Field label="Full name" name="fullName" onChange={updateField} value={form.fullName} />
            <Field label="Phone" name="phone" onChange={updateField} value={form.phone} />
            <Field label="Role/title" name="roleTitle" onChange={updateField} value={form.roleTitle} />
            <SelectField
              label="Preferred contact"
              name="contactPreference"
              onChange={updateField}
              options={["Email", "Phone", "Text"]}
              value={form.contactPreference}
            />
          </div>

          {error ? <p className="error-message">{error}</p> : null}
          <div
            aria-describedby="privacy-tooltip"
            className="privacy-cue"
            tabIndex={0}
          >
            <LockIcon />
            <span>Private &amp; Secure</span>
            <span className="privacy-tooltip" id="privacy-tooltip" role="tooltip">
              Your information stays private. We use it only to personalize your recommendations.
            </span>
          </div>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              "Submitting..."
            ) : (
              "Create My Plan"
            )}
          </button>
        </form>
      </section>

      {pendingSignInEmail ? (
        <div className="modal-backdrop" role="presentation">
          <section
            aria-labelledby="save-results-title"
            aria-modal="true"
            className="save-results-modal"
            role="dialog"
          >
            <div className="modal-copy">
              <p className="eyebrow">Save results</p>
              <h2 id="save-results-title">Sign in to save your results</h2>
              <p>
                Link your Google account so your plan, recommendations, and next steps stay connected
                to your business profile.
              </p>
            </div>
            <GoogleSignInButton<AuthPayload>
              endpoint="/api/auth/google"
              onSuccess={onAuthSuccess}
            />
            <button
              className="secondary-button"
              onClick={() => continueWithSignInPage(pendingSignInEmail)}
              type="button"
            >
              Continue with temporary code
            </button>
          </section>
        </div>
      ) : null}
    </main>
  );
}

function SignInPage({
  message,
  onAuthSuccess
}: {
  message: string | null;
  onAuthSuccess: (payload: AuthPayload, credential: string) => void;
}) {
  return (
    <main className="center-page">
      <section className="auth-card">
        <div>
          <p className="eyebrow">Sign in</p>
          <h1>Continue to your dashboard.</h1>
          {message ? <p className="muted-message">{message}</p> : null}
        </div>
        <GoogleSignInButton<AuthPayload> endpoint="/api/auth/google" onSuccess={onAuthSuccess} />
      </section>
    </main>
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

function AdminDashboard({
  credential,
  onAuthSuccess,
  onSignOut,
  payload
}: {
  credential: string | null;
  onAuthSuccess: (payload: AuthPayload, credential: string) => void;
  onSignOut: () => void;
  payload: AdminPayload;
}) {
  const [adminPayload, setAdminPayload] = useState(payload);
  const [activeTab, setActiveTab] = useState("Users");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { admin, users: rows, dataTables } = adminPayload;
  const navItems = ["Users", ...dataTables.map((table) => table.name)];
  const selectedDataTable = dataTables.find((table) => table.name === activeTab) || null;

  function handleOpportunityUpdated(updatedOpportunity: OpportunityRecord) {
    setAdminPayload((currentPayload) => ({
      ...currentPayload,
      dataTables: currentPayload.dataTables.map((table) => {
        if (table.name !== opportunitiesTableName) {
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

  async function refreshDashboard() {
    if (!credential) {
      setError("Sign in again to refresh the admin dashboard.");
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const nextPayload = await apiPost<AuthPayload>("/api/auth/google", { credential });
      if (!nextPayload.adminDashboard) {
        throw new Error("This Google account does not have admin access.");
      }
      setAdminPayload(nextPayload.adminDashboard);
      onAuthSuccess(nextPayload, credential);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Admin refresh failed.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setAdminPayload(payload);
  }, [payload]);

  useEffect(() => {
    if (activeTab !== "Users" && dataTables.length > 0 && !dataTables.some((table) => table.name === activeTab)) {
      setActiveTab("Users");
    }
  }, [activeTab, dataTables]);

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
        <AdminUsersPanel isLoading={isLoading} onRefresh={() => void refreshDashboard()} rows={rows} />
      ) : (
        <AdminDataPanel
          credential={credential}
          dataTable={selectedDataTable}
          isLoading={isLoading}
          onOpportunityUpdated={handleOpportunityUpdated}
          onRefresh={() => void refreshDashboard()}
        />
      )}
    </WorkspaceLayout>
  );
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
        {rows.map(({ user, intake }) => (
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
              <small>{intake?.site?.electricUtilityProvider || "No utility provider"}</small>
            </span>
            <span role="cell">
              {intake?.site
                ? `${intake.site.buildingType} / ${intake.site.ownershipStatus}`
                : "No building profile"}
              <small>{intake?.site?.squareFootage || "No square footage"}</small>
            </span>
            <span role="cell">
              {intake?.sustainability.interestedImprovements?.join(", ") || "No improvements selected"}
              <small>{intake?.sustainability.goals || "No intake form"}</small>
            </span>
            <span role="cell">{formatDate(user.createdAt)}</span>
          </div>
        ))}
      </div>
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
  credential: string | null;
  dataTable: DatabaseTableSnapshot | null;
  isLoading: boolean;
  onOpportunityUpdated: (opportunity: OpportunityRecord) => void;
  onRefresh: () => void;
}) {
  if (dataTable?.name === opportunitiesTableName) {
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
        {dataTable ? (
          <article className="data-card">
            <div className="data-card-header">
              <div>
                <p className="eyebrow">{dataTable.name}</p>
                <h3>{dataTable.recordCount} records</h3>
              </div>
            </div>
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
  credential: string | null;
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
  const [utilityFilter, setUtilityFilter] = useState("");
  const [businessFilter, setBusinessFilter] = useState("");
  const [warningFilter, setWarningFilter] = useState("");
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(records[0]?.opportunityId || "");

  const sourceOptions = uniqueSorted(records.map((record) => record.sourceName || record.sourceKey || ""));
  const statusOptions = uniqueSorted(records.map((record) => record.status || ""));
  const programTypeOptions = uniqueSorted(records.map((record) => record.programType || ""));
  const reviewStatusOptions = uniqueSorted(records.map(getOpportunityReviewStatus));
  const utilityOptions = uniqueSorted(records.flatMap(getOpportunityUtilityProviders));
  const businessOptions = uniqueSorted(records.flatMap(getOpportunityBusinessClassifications));
  const warningOptions = uniqueSorted(records.flatMap(getOpportunityWarnings));
  const normalizedSearch = search.trim().toLowerCase();
  const filteredRecords = records.filter((record) => {
    const sourceValue = record.sourceName || record.sourceKey || "";
    const haystack = [
      getOpportunityTitle(record),
      record.summary,
      record.sourceName,
      record.sourceKey,
      record.status,
      record.programType,
      record.category,
      record.administrator,
      getOpportunityTechnologies(record).join(" "),
      getOpportunityUtilityProviders(record).join(" "),
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
      (!utilityFilter || getOpportunityUtilityProviders(record).includes(utilityFilter)) &&
      (!businessFilter || getOpportunityBusinessClassifications(record).includes(businessFilter)) &&
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
        <ReviewSelect label="Utility" onChange={setUtilityFilter} options={utilityOptions} value={utilityFilter} />
        <ReviewSelect
          label="Business"
          onChange={setBusinessFilter}
          options={businessOptions}
          value={businessFilter}
        />
        <ReviewSelect label="Warning" onChange={setWarningFilter} options={warningOptions} value={warningFilter} />
      </div>

      <div className="review-count-row">
        <strong>{filteredRecords.length} shown</strong>
        <span>{records.length} loaded from DynamoDB</span>
      </div>

      <div className="opportunity-review-layout">
        <div className="opportunity-list" aria-label="Opportunity candidates">
          {filteredRecords.length === 0 ? (
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
  credential: string | null;
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
  const utilityProviders = getOpportunityUtilityProviders(opportunity);
  const businessClassifications = getOpportunityBusinessClassifications(opportunity);
  const technologies = getOpportunityTechnologies(opportunity);
  const evidence = Array.isArray(opportunity.evidence) ? opportunity.evidence : [];

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
          credential,
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
        <DetailItem label="Administrator" value={opportunity.administrator || "Unknown"} />
        <DetailItem label="Utility" value={utilityProviders.join(", ") || "Not classified"} />
        <DetailItem label="Business" value={businessClassifications.join(", ") || "Not classified"} />
        <DetailItem label="Square footage" value={formatSquareFootage(opportunity.matchingParameters?.squareFootage)} />
        <DetailItem label="Technologies" value={technologies.join(", ") || "Not classified"} />
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
              Source page
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
        <h4>Matching parameters</h4>
        <pre>{compactJson(opportunity.matchingParameters)}</pre>
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
          <dd>{intake.business.companyName}</dd>
          <dt>Organization type</dt>
          <dd>{intake.business.organizationType || "Not provided"}</dd>
          <dt>Size</dt>
          <dd>{intake.business.organizationSize}</dd>
          <dt>Region</dt>
          <dd>{intake.business.headquarters}</dd>
        </dl>
      </article>
      <article>
        <p className="eyebrow">Site and building</p>
        <dl>
          <dt>Site address</dt>
          <dd>{intake.site?.address || "Not provided"}</dd>
          <dt>Electric utility provider</dt>
          <dd>{intake.site?.electricUtilityProvider || "Not provided"}</dd>
          <dt>Ownership status</dt>
          <dd>{intake.site?.ownershipStatus || "Not provided"}</dd>
          <dt>Building type</dt>
          <dd>{intake.site?.buildingType || "Not provided"}</dd>
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
  const [authCredential, setAuthCredential] = useState<string | null>(null);
  const [signInMessage, setSignInMessage] = useState<string | null>(null);

  useEffect(() => {
    function syncRoute() {
      setRoute(routeFromPath());
    }
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    for (const key of staleSessionKeys) {
      window.localStorage.removeItem(key);
    }
  }, []);

  function navigate(nextRoute: Route) {
    const path = nextRoute === "home" ? "/" : `/${nextRoute}`;
    window.history.pushState({}, "", path);
    setRoute(nextRoute);
  }

  function handleAuthSuccess(payload: AuthPayload, credential: string) {
    setAuthPayload(payload);
    setAuthCredential(credential);
    setSignInMessage(null);
    navigate(payload.dashboard === "admin" ? "admin" : "portal");
  }

  function signOut() {
    setAuthPayload(null);
    setAuthCredential(null);
    setSignInMessage(null);
    navigate("home");
  }

  if (route === "get-started") {
    return (
      <IntakePage
        navigate={navigate}
        onAuthSuccess={handleAuthSuccess}
        onIntakeCreated={(email) => {
          setSignInMessage(`Your profile is ready. Sign in with Google using ${email}.`);
        }}
      />
    );
  }

  if (route === "portal" || route === "admin") {
    if (!authPayload) {
      return <SignInPage message={signInMessage} onAuthSuccess={handleAuthSuccess} />;
    }

    if (authPayload.dashboard === "admin" && authPayload.adminDashboard) {
      return (
        <AdminDashboard
          credential={authCredential}
          onAuthSuccess={handleAuthSuccess}
          onSignOut={signOut}
          payload={authPayload.adminDashboard}
        />
      );
    }

    return <UserDashboard onSignOut={signOut} payload={authPayload} />;
  }

  return <HomePage navigate={navigate} />;
}
