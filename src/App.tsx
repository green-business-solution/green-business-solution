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

type Route =
  | "home"
  | "how-it-works"
  | "pricing"
  | "for-businesses"
  | "about"
  | "about-mission"
  | "about-team"
  | "about-trust"
  | "about-contact"
  | "scan"
  | "scan-results"
  | "sign-in"
  | "portal"
  | "admin";

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

type AuthCredential = {
  provider: "google" | "password";
  value: string;
};

type PasswordAuthPayload = AuthPayload & {
  sessionToken: string;
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

const utilityProviderOptions = [
  "PG&E",
  "Southern California Edison",
  "San Diego Gas & Electric",
  "Silicon Valley Power",
  "LADWP",
  "SMUD",
  "Other / Not sure"
];
const organizationTypeOptions = [
  "Commercial Business",
  "Industrial Facility",
  "Agricultural Operation",
  "Multifamily Property",
  "Nonprofit Organization",
  "Government / Public Agency",
  "Other"
];
const organizationSizeOptions = [
  "1-10 employees",
  "11-50 employees",
  "51-250 employees",
  "251-1,000 employees",
  "1,000+ employees"
];
const ownershipStatusOptions = ["Own", "Lease", "Manage property", "Not sure"];
const buildingTypeOptions = [
  "Restaurant / Commercial Kitchen",
  "Grocery / Convenience Store",
  "Hotel / Hospitality",
  "Warehouse / Industrial Space",
  "Medical / Dental Office",
  "Office",
  "Retail",
  "Multifamily",
  "Other"
];
const improvementOptions = [
  "LED lighting",
  "HVAC",
  "Refrigeration",
  "Solar",
  "Battery storage",
  "EV charging",
  "Water efficiency",
  "Building controls",
  "Commercial kitchen equipment",
  "Not sure yet"
];

const aboutLinks: Array<{ label: string; route: Route }> = [
  { label: "Mission", route: "about-mission" },
  { label: "Team", route: "about-team" },
  { label: "Trust & Data", route: "about-trust" },
  { label: "Contact", route: "about-contact" }
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
  if (window.location.pathname === "/how-it-works") return "how-it-works";
  if (window.location.pathname === "/pricing") return "pricing";
  if (window.location.pathname === "/for-businesses") return "for-businesses";
  if (window.location.pathname === "/about") return "about";
  if (window.location.pathname === "/about/mission") return "about-mission";
  if (window.location.pathname === "/about/team") return "about-team";
  if (window.location.pathname === "/about/trust") return "about-trust";
  if (window.location.pathname === "/about/contact") return "about-contact";
  if (window.location.pathname === "/scan" || window.location.pathname === "/get-started") return "scan";
  if (window.location.pathname === "/scan/results") return "scan-results";
  if (window.location.pathname === "/sign-in") return "sign-in";
  if (window.location.pathname === "/portal") return "portal";
  if (window.location.pathname === "/admin") return "admin";
  return "home";
}

function pathForRoute(route: Route) {
  if (route === "home") return "/";
  if (route === "about-mission") return "/about/mission";
  if (route === "about-team") return "/about/team";
  if (route === "about-trust") return "/about/trust";
  if (route === "about-contact") return "/about/contact";
  if (route === "scan-results") return "/scan/results";
  return `/${route}`;
}

function isLocalDevelopmentHost() {
  return ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
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
      isLocalDevelopmentHost()
        ? "Could not reach the local API. Run `npm run dev` from the repo root and confirm the API is running at http://127.0.0.1:8787."
        : "Could not reach the server. Refresh the page and try again."
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
        ? isLocalDevelopmentHost()
          ? "The local API returned an error. Check the terminal running `npm run dev`; if AWS credentials are mentioned, run `aws sso login --profile gbs` and restart the dev server."
          : "The server returned an error. Try again in a minute."
        : `Request failed with HTTP ${response.status}.`;
    throw new Error(payload.error || fallback);
  }

  return payload as T;
}

function adminAuthBody(credential: AuthCredential) {
  if (credential.provider === "password") {
    return { passwordSessionToken: credential.value };
  }

  return { credential: credential.value };
}

function refreshAuthPayload(credential: AuthCredential) {
  if (credential.provider === "password") {
    return apiPost<AuthPayload>("/api/auth/password/session", { sessionToken: credential.value });
  }

  return apiPost<AuthPayload>("/api/auth/google", { credential: credential.value });
}

function GoogleSignInButton<T>({
  endpoint,
  onSuccess
}: {
  endpoint: string;
  onSuccess: (payload: T, credential: AuthCredential) => void;
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
            onSuccessRef.current(payload, { provider: "google", value: credential });
          } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Google sign-in failed.");
          } finally {
            setIsSigningIn(false);
          }
        }
      });

      const buttonWidth = Math.min(
        400,
        Math.max(300, Math.floor(buttonRef.current.getBoundingClientRect().width || 400))
      );

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        logo_alignment: "left",
        shape: "rectangular",
        size: "large",
        text: "continue_with",
        theme: "outline",
        width: buttonWidth
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
  const isSignup = mode === "signup";

  useEffect(() => {
    setUsername(initialUsername);
    setPassword("");
    setError(null);
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
        <input
          autoComplete={isSignup ? "new-password" : "current-password"}
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
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

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button className="brand-link" onClick={onClick} type="button">
      <span className="brand-mark" aria-hidden="true">
        R
      </span>
      <span>Retrofi</span>
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

function PublicNav({ navigate }: { navigate: (route: Route) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  function go(route: Route) {
    setIsMenuOpen(false);
    setIsAboutOpen(false);
    navigate(route);
  }

  return (
    <header className="site-header">
      <Brand onClick={() => go("home")} />
      <nav aria-label="Primary" className="site-nav">
        <button className="link-button" onClick={() => go("how-it-works")} type="button">
          How It Works
        </button>
        <button className="link-button" onClick={() => go("pricing")} type="button">
          Pricing
        </button>
        <button className="link-button" onClick={() => go("for-businesses")} type="button">
          For Businesses
        </button>
        <div className="nav-dropdown" onMouseLeave={() => setIsAboutOpen(false)}>
          <button
            aria-expanded={isAboutOpen}
            className="link-button dropdown-trigger"
            onClick={() => setIsAboutOpen((current) => !current)}
            type="button"
          >
            About
            <span aria-hidden="true" className="dropdown-caret">
              ▾
            </span>
          </button>
          {isAboutOpen ? (
            <div className="dropdown-panel" role="menu">
              {aboutLinks.map((item) => (
                <button className="dropdown-link" key={item.route} onClick={() => go(item.route)} role="menuitem" type="button">
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </nav>
      <div className="nav-actions">
        <button className="link-button" onClick={() => go("sign-in")} type="button">
          Sign In
        </button>
        <button onClick={() => go("scan")} type="button">
          Create Free Scan
        </button>
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
      <button className="mobile-cta" onClick={() => go("scan")} type="button">
        Create Free Scan
      </button>
      {isMenuOpen ? (
        <div className="mobile-menu-panel">
          <button className="link-button" onClick={() => go("how-it-works")} type="button">
            How It Works
          </button>
          <button className="link-button" onClick={() => go("pricing")} type="button">
            Pricing
          </button>
          <button className="link-button" onClick={() => go("for-businesses")} type="button">
            For Businesses
          </button>
          <div className="mobile-about-group">
            <span>About</span>
            {aboutLinks.map((item) => (
              <button className="mobile-sub-link" key={item.route} onClick={() => go(item.route)} type="button">
                {item.label}
              </button>
            ))}
          </div>
          <button className="link-button" onClick={() => go("sign-in")} type="button">
            Sign In
          </button>
          <button onClick={() => go("scan")} type="button">
            Create Free Scan
          </button>
        </div>
      ) : null}
    </header>
  );
}

function Footer({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Brand onClick={() => navigate("home")} />
        <p>Helping businesses identify, fund, and plan high-value sustainability retrofits.</p>
      </div>
      <nav aria-label="Site links" className="footer-links">
        <span className="footer-heading">Site</span>
        {[
          ["How It Works", "how-it-works"],
          ["Pricing", "pricing"],
          ["For Businesses", "for-businesses"],
          ["Create Free Scan", "scan"]
        ].map(([label, route]) => (
          <button className="footer-link" key={route} onClick={() => navigate(route as Route)} type="button">
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
  showFooter = false
}: {
  children: ReactNode;
  navigate: (route: Route) => void;
  showFooter?: boolean;
}) {
  return (
    <main className="public-page">
      <PublicNav navigate={navigate} />
      {children}
      {showFooter ? <Footer navigate={navigate} /> : null}
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

function HomePage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <PublicShell navigate={navigate} showFooter>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Retrofit advisory for business facilities</p>
          <h1>Find funding and savings for your next facility upgrade.</h1>
          <p>
            Retrofi helps businesses identify eligible sustainability incentives, estimate savings,
            and build a clear roadmap for high-value retrofits.
          </p>
          <div className="hero-actions">
            <CTAButton navigate={navigate} route="scan">Create Free Scan</CTAButton>
            <CTAButton navigate={navigate} route="how-it-works" variant="secondary">
              See How It Works
            </CTAButton>
          </div>
        </div>
        <div className="scan-preview" aria-label="Sample Retrofi scan report">
          <div className="preview-topline">
            <span>Free scan preview</span>
            <strong>Ready</strong>
          </div>
          <div className="preview-stack">
            <div className="report-card">
              <span>Site</span>
              <strong>Ninth Street Market</strong>
            </div>
            <div className="opportunity-range">
              <span>Estimated Opportunity Range</span>
              <strong>$18k-$75k</strong>
            </div>
          </div>
          <div className="category-pills">
            <span>HVAC</span>
            <span>Lighting</span>
            <span>Refrigeration</span>
          </div>
          <div className="report-status">
            <div>
              <span>Report Status</span>
              <strong>Free Scan Ready</strong>
            </div>
            <div>
              <span>Next Step</span>
              <strong>Upload utility bills</strong>
            </div>
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
          providers. Retrofi turns scattered information into a clear business roadmap.
        </p>
      </section>

      <section className="content-section">
        <SectionHeading
          copy="Retrofi connects program matching, savings context, and a decision-ready path forward."
          eyebrow="Platform focus"
          title="What Retrofi helps with"
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
          title="How Retrofi works"
        />
        <div className="step-grid">
          {["Tell us about your business", "Get a free opportunity preview", "Unlock a detailed retrofit roadmap"].map(
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

      <section className="content-section">
        <SectionHeading eyebrow="Best fit" title="Built for businesses with real facility costs" />
        <div className="card-grid three compact-cards">
          {[
            "Restaurants & commercial kitchens",
            "Grocery & convenience stores",
            "Hotels & hospitality",
            "Warehouses & industrial spaces",
            "Medical & dental offices",
            "Multi-location businesses"
          ].map((business) => (
            <article className="business-preview-card" key={business}>
              <h3>{business}</h3>
              <button className="text-link with-icon" onClick={() => navigate("for-businesses")} type="button">
                See business types
                <ArrowUpRightIcon />
              </button>
            </article>
          ))}
        </div>
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
        <CTAButton navigate={navigate} route="scan">Create Free Scan</CTAButton>
      </section>
    </PublicShell>
  );
}

function HowItWorksPage({ navigate }: { navigate: (route: Route) => void }) {
  const steps = [
    ["Complete the free scan", "Share your business address, utility provider, organization type, and basic facility information."],
    ["Receive an opportunity preview", "See estimated value range, likely retrofit categories, and whether your facility appears to have meaningful opportunities."],
    ["Upload utility bills", "Utility bills help Retrofi estimate savings, ROI, payback, and project priority."],
    ["Unlock the Opportunity Report", "Get exact programs, eligibility analysis, savings estimates, financing options, required documents, and deadlines."],
    ["Get implementation support", "For businesses ready to move forward, Retrofi can help organize documents, review quotes, and track next steps."]
  ];

  return (
    <PublicShell navigate={navigate}>
      <PageHero
        compact
        eyebrow="Process"
        title="How Retrofi Works"
        copy="From a quick business scan to a detailed retrofit roadmap, Retrofi helps you move from opportunity discovery to implementation."
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
        <CTAButton navigate={navigate} route="scan">Create Free Scan</CTAButton>
      </section>
    </PublicShell>
  );
}

function PricingPage({ navigate }: { navigate: (route: Route) => void }) {
  const cards = [
    ["Free Scan", "$0", "Exploring potential opportunities", ["Basic opportunity preview", "Estimated value range", "General retrofit categories", "Prompt to upload utility bills"], "Create Free Scan"],
    ["Opportunity Report", "$950/site", "Businesses ready to evaluate real projects", ["Exact matching incentives", "Eligibility analysis", "Utility bill review", "Savings estimates", "ROI/payback", "Prioritized roadmap", "Financing options", "Required documents", "Deadlines", "Downloadable report"], "Start with Free Scan"],
    ["Implementation Support", "Starting at $3,500", "Businesses ready to move forward", ["Application preparation support", "Document collection guidance", "Contractor quote review", "Financing guidance", "Incentive tracking", "60-90 days of support"], "Contact Us"],
    ["Multi-Site", "Custom", "Franchisees, regional operators, and multi-location businesses", ["Site-by-site scans", "Portfolio prioritization", "Centralized incentive tracking", "Standardized recommendations"], "Contact Us"]
  ];

  return (
    <PublicShell navigate={navigate}>
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

function ForBusinessesPage({ navigate }: { navigate: (route: Route) => void }) {
  const businessTypes = [
    ["Restaurants & Commercial Kitchens", "Cooking equipment, refrigeration, HVAC, water heating, lighting."],
    ["Grocery & Convenience Stores", "Refrigeration, lighting, HVAC, controls, backup power."],
    ["Hotels & Hospitality", "HVAC, water heating, laundry, smart controls, lighting."],
    ["Warehouses & Industrial Spaces", "Lighting, HVAC, motors, fleet/EV charging, solar."],
    ["Medical & Dental Offices", "HVAC, lighting, equipment efficiency, utility cost reduction."],
    ["Multi-Location Businesses", "Repeatable scans, portfolio prioritization, standardized recommendations."]
  ];

  return (
    <PublicShell navigate={navigate}>
      <PageHero
        compact
        eyebrow="For businesses"
        title="Built for businesses with real facility costs"
        copy="Retrofi is designed for businesses where energy, equipment, water, refrigeration, HVAC, lighting, or facility upgrades can meaningfully affect operating costs."
      />
      <section className="card-grid two business-type-grid">
        {businessTypes.map(([title, copy]) => (
          <article className="feature-card" key={title}>
            <h3>{title}</h3>
            <p>Likely upgrade areas: {copy}</p>
          </article>
        ))}
      </section>
      <section className="two-column-section">
        <article className="feature-card list-card">
          <h2>Retrofi is most useful if your business has:</h2>
          <ul>
            {["A physical location", "Monthly utility bills", "Equipment, HVAC, refrigeration, lighting, or water usage", "Interest in reducing operating costs", "Possible upgrade plans in the next 3-12 months"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="feature-card muted-card list-card">
          <h2>Retrofi may be less useful for:</h2>
          <ul>
            {["Homeowners", "Very small home-based businesses", "Businesses with no physical facility", "Businesses not considering upgrades", "Businesses outside supported regions"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
      <section className="final-cta">
        <h2>See if Retrofi fits your business.</h2>
        <CTAButton navigate={navigate} route="scan">Create Free Scan</CTAButton>
      </section>
    </PublicShell>
  );
}

function AboutPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <PublicShell navigate={navigate}>
      <PageHero
        compact
        eyebrow="About Retrofi"
        title="About Retrofi"
        copy="Retrofi helps businesses turn fragmented incentive programs and facility data into clear, actionable retrofit decisions."
      />
      <AboutSubnav navigate={navigate} />
      <section className="card-grid two about-hub-grid">
        <AboutHubCard
          copy="Learn how we’re making sustainability upgrades financially practical for businesses."
          icon="mission"
          label="Mission"
          navigate={navigate}
          route="about-mission"
          title="Why Retrofi exists"
        />
        <AboutHubCard
          copy="See who is building Retrofi and the roles behind the product."
          icon="team"
          label="Team"
          navigate={navigate}
          route="about-team"
          title="Meet the team"
        />
        <AboutHubCard
          copy="Understand how Retrofi uses business information and utility bills to prepare recommendations."
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

function MissionPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <PublicShell navigate={navigate}>
      <PageHero
        compact
        eyebrow="Mission"
        title="Making sustainability upgrades financially practical."
        copy="Retrofi is building a cleaner path from incentive discovery to confident retrofit decisions."
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
            Retrofi exists to help businesses identify relevant opportunities, estimate savings, and
            move toward practical facility upgrades with more confidence.
          </p>
        </article>
      </section>
      <section className="content-section">
        <SectionHeading eyebrow="What we believe" title="Retrofi should turn complexity into clear next steps" />
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
        <CTAButton navigate={navigate} route="scan">Create Free Scan</CTAButton>
      </section>
    </PublicShell>
  );
}

function TeamPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <PublicShell navigate={navigate}>
      <PageHero
        compact
        eyebrow="Team"
        title="Meet the team"
        copy="Retrofi is built by a small team focused on product, data systems, retrofit research, and customer workflow."
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

function TrustPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <PublicShell navigate={navigate}>
      <PageHero
        compact
        eyebrow="Trust & Data"
        title="Trust & Data"
        copy="Retrofi uses business and utility information only to prepare recommendations, estimate savings, and identify relevant opportunities."
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
        <CTAButton navigate={navigate} route="scan">Create Free Scan</CTAButton>
      </section>
    </PublicShell>
  );
}

function ContactPage({ navigate }: { navigate: (route: Route) => void }) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  function submitContactForm(event: FormEvent) {
    event.preventDefault();

    const subject = contactForm.company
      ? `Retrofi inquiry from ${contactForm.company}`
      : `Retrofi inquiry from ${contactForm.name || "website visitor"}`;
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
    <PublicShell navigate={navigate}>
      <PageHero
        compact
        eyebrow="Contact"
        title="Contact Retrofi"
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
            <button type="submit">Email Retrofi</button>
            <CTAButton navigate={navigate} route="scan" variant="secondary">
              Create Free Scan
            </CTAButton>
          </div>
        </form>
      </section>
    </PublicShell>
  );
}

function ScanResultsPage({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <PublicShell navigate={navigate}>
      <section className="results-panel">
        <p className="eyebrow">Free scan</p>
        <h1>Your free scan is being prepared</h1>
        <p>
          Retrofi is reviewing your business and site information to identify likely incentive and
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

function IntakePage({ navigate }: { navigate: (route: Route) => void }) {
  const [form, setForm] = useState<IntakeFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(name: keyof IntakeFormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitForm(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await apiPost<PortalPayload>("/api/intake", form);
      navigate("scan-results");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PublicShell navigate={navigate}>
      <section className="scan-page form-shell">
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
            <Field
              label="Website"
              name="website"
              onChange={updateField}
              placeholder="https://example.com"
              value={form.website}
            />
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
              options={organizationSizeOptions}
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
            <TextArea
              label="Anything else we should know?"
              name="notes"
              onChange={updateField}
              value={form.notes}
            />
          </div>

          <h2>Contact Information</h2>
          <div className="field-grid">
            <Field label="Contact name" name="fullName" onChange={updateField} required value={form.fullName} />
            <Field label="Email" name="email" onChange={updateField} required type="email" value={form.email} />
            <Field label="Phone" name="phone" onChange={updateField} value={form.phone} />
          </div>

          {error ? <p className="error-message">{error}</p> : null}
          <div className="privacy-line">
            <LockIcon />
            <span>Your information is kept private and used only to prepare your recommendations.</span>
          </div>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              "Submitting..."
            ) : (
              "Create Free Scan"
            )}
          </button>
        </form>
      </section>
    </PublicShell>
  );
}

function SignInPage({
  navigate,
  message,
  onAuthSuccess
}: {
  navigate: (route: Route) => void;
  message: string | null;
  onAuthSuccess: (payload: AuthPayload, credential: AuthCredential) => void;
}) {
  return (
    <PublicShell navigate={navigate} showFooter={false}>
      <section className="sign-in-panel">
        {message ? <p className="muted-message">{message}</p> : null}
        <PasswordAuthPanel onAuthSuccess={onAuthSuccess} />
        <div className="auth-divider" role="presentation">
          <span>Or</span>
        </div>
        <GoogleSignInButton<AuthPayload> endpoint="/api/auth/google" onSuccess={onAuthSuccess} />
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

function AdminDashboard({
  credential,
  onAuthSuccess,
  onSignOut,
  payload
}: {
  credential: AuthCredential | null;
  onAuthSuccess: (payload: AuthPayload, credential: AuthCredential) => void;
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
      const nextPayload = await refreshAuthPayload(credential);
      if (!nextPayload.adminDashboard) {
        throw new Error("This account does not have admin access.");
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
  credential: AuthCredential | null;
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
  const [authCredential, setAuthCredential] = useState<AuthCredential | null>(null);
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
    const path = pathForRoute(nextRoute);
    window.history.pushState({}, "", path);
    setRoute(nextRoute);
  }

  function handleAuthSuccess(payload: AuthPayload, credential: AuthCredential) {
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

  if (route === "how-it-works") {
    return <HowItWorksPage navigate={navigate} />;
  }

  if (route === "pricing") {
    return <PricingPage navigate={navigate} />;
  }

  if (route === "for-businesses") {
    return <ForBusinessesPage navigate={navigate} />;
  }

  if (route === "about") {
    return <AboutPage navigate={navigate} />;
  }

  if (route === "about-mission") {
    return <MissionPage navigate={navigate} />;
  }

  if (route === "about-team") {
    return <TeamPage navigate={navigate} />;
  }

  if (route === "about-trust") {
    return <TrustPage navigate={navigate} />;
  }

  if (route === "about-contact") {
    return <ContactPage navigate={navigate} />;
  }

  if (route === "scan") {
    return <IntakePage navigate={navigate} />;
  }

  if (route === "scan-results") {
    return <ScanResultsPage navigate={navigate} />;
  }

  if (route === "sign-in") {
    return <SignInPage navigate={navigate} message={signInMessage} onAuthSuccess={handleAuthSuccess} />;
  }

  if (route === "portal" || route === "admin") {
    if (!authPayload) {
      return <SignInPage navigate={navigate} message={signInMessage} onAuthSuccess={handleAuthSuccess} />;
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
