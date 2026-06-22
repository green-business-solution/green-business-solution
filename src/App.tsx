import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

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
    fullName: string;
    email: string;
    phone: string | null;
    roleTitle: string;
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

type AdminTab = "Users" | "Data";

type DatabaseTableSnapshot = {
  name: string;
  recordCount: number;
  records: unknown[];
};

type AdminPayload = {
  admin: UserRecord;
  users: AdminRow[];
  dataTables: DatabaseTableSnapshot[];
};

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
const organizationTypeOptions = ["Business", "Nonprofit", "Government", "School", "Hospital"];
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

const sessionKey = "gbs-user-session";
const adminSessionKey = "gbs-admin-session";

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

function formatDate(value: string | null) {
  if (!value) return "Not recorded";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
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
            User portal
          </button>
          <button className="link-button" onClick={() => navigate("admin")} type="button">
            Admin
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
              Enter temporary code
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
          <p>New users complete a required questionnaire and receive a six-digit temporary code.</p>
        </article>
        <article>
          <h2>User portal</h2>
          <p>Each temporary code opens a portal showing only that user&apos;s submitted information.</p>
        </article>
        <article>
          <h2>Admin view</h2>
          <p>Admin codes for Neer and Rajvansh unlock the shared DynamoDB-backed intake table.</p>
        </article>
      </section>
    </main>
  );
}

function IntakePage({
  navigate,
  setPortalPayload
}: {
  navigate: (route: Route) => void;
  setPortalPayload: (payload: PortalPayload) => void;
}) {
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
      const payload = await apiPost<PortalPayload>("/api/intake", form);
      window.localStorage.setItem(sessionKey, payload.user.userId);
      setPortalPayload(payload);
      navigate("portal");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="form-page">
      <button className="back-button" onClick={() => navigate("home")} type="button">
        Back
      </button>
      <section className="form-shell">
        <div className="form-intro">
          <p className="eyebrow">Get started</p>
          <h1>Tell us about your business</h1>
          <p>
            Required fields are marked with an asterisk. After submission, you&apos;ll receive a
            six-digit temporary code that opens your user portal.
          </p>
        </div>

        <form className="intake-form" onSubmit={submitForm}>
          <h2>Contact Information</h2>
          <div className="field-grid">
            <Field label="Full name" name="fullName" onChange={updateField} required value={form.fullName} />
            <Field label="Email" name="email" onChange={updateField} required type="email" value={form.email} />
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

          <h2>Top 7 Most Important Questions</h2>
          <div className="field-grid">
            <TextArea
              label="Site address"
              name="siteAddress"
              onChange={updateField}
              placeholder="Street address, city, state, ZIP"
              required
              value={form.siteAddress}
            />
            <p className="field-note field-wide">
              Site address will be used later to derive state, county, city, ZIP, and utility
              territory.
            </p>
            <SelectField
              label="Electric utility provider"
              name="electricUtilityProvider"
              onChange={updateField}
              options={utilityProviderOptions}
              required
              value={form.electricUtilityProvider}
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

          <h2>Other Questions</h2>
          <div className="field-grid">
            <Field
              label="Company name"
              name="companyName"
              onChange={updateField}
              required
              value={form.companyName}
            />
            <Field label="Website" name="website" onChange={updateField} value={form.website} />
            <Field label="Industry" name="industry" onChange={updateField} required value={form.industry} />
            <SelectField
              label="Organization size"
              name="organizationSize"
              onChange={updateField}
              options={["1-10", "11-50", "51-200", "201-1,000", "1,001+"]}
              required
              value={form.organizationSize}
            />
            <Field
              label="Primary operating region"
              name="headquarters"
              onChange={updateField}
              required
              value={form.headquarters}
            />
            <SelectField
              label="Monthly utility spend"
              name="monthlyUtilitySpend"
              onChange={updateField}
              options={["Under $2,500", "$2,500-$10,000", "$10,000-$50,000", "$50,000+"]}
              value={form.monthlyUtilitySpend}
            />
            <TextArea
              label="What sustainability goals are you trying to achieve?"
              name="sustainabilityGoals"
              onChange={updateField}
              placeholder="Energy savings, supplier scoring, waste diversion, emissions tracking..."
              required
              value={form.sustainabilityGoals}
            />
            <TextArea
              label="What is difficult about tracking this today?"
              name="currentChallenges"
              onChange={updateField}
              required
              value={form.currentChallenges}
            />
            <SelectField
              label="Timeline"
              name="timeline"
              onChange={updateField}
              options={["Immediately", "This quarter", "Next 6 months", "Exploring only"]}
              required
              value={form.timeline}
            />
            <TextArea label="Additional notes" name="notes" onChange={updateField} value={form.notes} />
          </div>

          {error ? <p className="error-message">{error}</p> : null}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Create My Plan"}
          </button>
        </form>
      </section>
    </main>
  );
}

function PortalPage({
  payload,
  setPortalPayload
}: {
  payload: PortalPayload | null;
  setPortalPayload: (payload: PortalPayload | null) => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function login(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const nextPayload = await apiPost<PortalPayload>("/api/login", { userId: code });
      window.localStorage.setItem(sessionKey, nextPayload.user.userId);
      setPortalPayload(nextPayload);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!payload) {
    return (
      <main className="center-page">
        <form className="code-card" onSubmit={login}>
          <p className="eyebrow">User portal</p>
          <h1>Enter your six-digit temporary code.</h1>
          <input
            inputMode="numeric"
            maxLength={6}
            onChange={(event) => setCode(event.target.value)}
            placeholder="123456"
            value={code}
          />
          {error ? <p className="error-message">{error}</p> : null}
          <button disabled={isLoading} type="submit">
            {isLoading ? "Opening..." : "Open portal"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <WorkspaceLayout
      navItems={["My information"]}
      onSignOut={() => {
        window.localStorage.removeItem(sessionKey);
        setPortalPayload(null);
      }}
      title="User portal"
      user={payload.user}
    >
      <ProfilePanel intake={payload.intake} user={payload.user} />
    </WorkspaceLayout>
  );
}

function AdminPage() {
  const [adminCode, setAdminCode] = useState(window.localStorage.getItem(adminSessionKey) || "");
  const [admin, setAdmin] = useState<UserRecord | null>(null);
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [dataTables, setDataTables] = useState<DatabaseTableSnapshot[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>("Users");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loadUsers(code: string) {
    setError(null);
    setIsLoading(true);
    try {
      const payload = await apiPost<AdminPayload>("/api/admin/users", {
        adminUserId: code
      });
      window.localStorage.setItem(adminSessionKey, code);
      setAdmin(payload.admin);
      setRows(payload.users);
      setDataTables(payload.dataTables || []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Admin login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (adminCode.length === 6 && !admin) {
      void loadUsers(adminCode);
    }
  }, []);

  if (!admin) {
    return (
      <main className="center-page">
        <form
          className="code-card"
          onSubmit={(event) => {
            event.preventDefault();
            void loadUsers(adminCode);
          }}
        >
          <p className="eyebrow">Admin</p>
          <h1>Enter an admin temporary code.</h1>
          <input
            inputMode="numeric"
            maxLength={6}
            onChange={(event) => setAdminCode(event.target.value)}
            placeholder="123456"
            value={adminCode}
          />
          {error ? <p className="error-message">{error}</p> : null}
          <button disabled={isLoading} type="submit">
            {isLoading ? "Checking..." : "Open admin"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <WorkspaceLayout
      activeNavItem={activeTab}
      navItems={["Users", "Data"]}
      onNavItemChange={(item) => setActiveTab(item as AdminTab)}
      onSignOut={() => {
        window.localStorage.removeItem(adminSessionKey);
        setAdmin(null);
        setRows([]);
        setDataTables([]);
        setActiveTab("Users");
      }}
      title="Admin"
      user={admin}
    >
      {activeTab === "Users" ? (
        <AdminUsersPanel isLoading={isLoading} onRefresh={() => void loadUsers(adminCode)} rows={rows} />
      ) : (
        <AdminDataPanel dataTables={dataTables} isLoading={isLoading} onRefresh={() => void loadUsers(adminCode)} />
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
          <p className="eyebrow">Temporary and linked users</p>
          <h2>Client intake records</h2>
        </div>
        <button className="secondary-button" disabled={isLoading} onClick={onRefresh} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="admin-table" role="table" aria-label="Client intake records">
        <div className="admin-row admin-head" role="row">
          <span role="columnheader">Code</span>
          <span role="columnheader">Name</span>
          <span role="columnheader">Company</span>
          <span role="columnheader">Site</span>
          <span role="columnheader">Building</span>
          <span role="columnheader">Improvements and goals</span>
          <span role="columnheader">Created</span>
        </div>
        {rows.map(({ user, intake }) => (
          <div className="admin-row" role="row" key={user.userId}>
            <span role="cell">{user.userId}</span>
            <span role="cell">
              <strong>{user.fullName}</strong>
              <small>{user.email}</small>
              <small>{intake?.contact.roleTitle || user.role}</small>
            </span>
            <span role="cell">
              <strong>{user.companyName || intake?.business.companyName || "Internal admin"}</strong>
              <small>{intake?.business.organizationType || "No organization type"}</small>
              <small>{user.googleLinked ? "Google linked" : "Temporary code"}</small>
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
  dataTables,
  isLoading,
  onRefresh
}: {
  dataTables: DatabaseTableSnapshot[];
  isLoading: boolean;
  onRefresh: () => void;
}) {
  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Database inspection</p>
          <h2>Data</h2>
        </div>
        <button className="secondary-button" disabled={isLoading} onClick={onRefresh} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="data-grid">
        {dataTables.length > 0 ? (
          dataTables.map((table) => (
            <article className="data-card" key={table.name}>
              <div className="data-card-header">
                <div>
                  <p className="eyebrow">{table.name}</p>
                  <h3>{table.recordCount} records</h3>
                </div>
              </div>
              <pre>{JSON.stringify(table.records, null, 2)}</pre>
            </article>
          ))
        ) : (
          <article className="data-card">
            <p>No database snapshot loaded.</p>
          </article>
        )}
      </div>
    </section>
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
            <span>{user.userId}</span>
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
          <p>This temporary code is active, but it is not attached to a client intake submission.</p>
        </article>
      </section>
    );
  }

  return (
    <section className="profile-grid">
      <article>
        <p className="eyebrow">Temporary code</p>
        <h2>{user.userId}</h2>
        <p>Save this code. It opens this portal until Google account linking is added.</p>
      </article>
      <article>
        <p className="eyebrow">Contact</p>
        <dl>
          <dt>Name</dt>
          <dd>{intake.contact.fullName}</dd>
          <dt>Email</dt>
          <dd>{intake.contact.email}</dd>
          <dt>Phone</dt>
          <dd>{intake.contact.phone || "Not provided"}</dd>
          <dt>Role/title</dt>
          <dd>{intake.contact.roleTitle}</dd>
        </dl>
      </article>
      <article>
        <p className="eyebrow">Business</p>
        <dl>
          <dt>Company</dt>
          <dd>{intake.business.companyName}</dd>
          <dt>Organization type</dt>
          <dd>{intake.business.organizationType || "Not provided"}</dd>
          <dt>Industry</dt>
          <dd>{intake.business.industry}</dd>
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
  const [portalPayload, setPortalPayload] = useState<PortalPayload | null>(null);
  const storedCode = useMemo(() => window.localStorage.getItem(sessionKey), []);

  useEffect(() => {
    function syncRoute() {
      setRoute(routeFromPath());
    }
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  useEffect(() => {
    if (!storedCode || portalPayload) return;
    void apiPost<PortalPayload>("/api/portal", { userId: storedCode })
      .then(setPortalPayload)
      .catch(() => {
        window.localStorage.removeItem(sessionKey);
      });
  }, [portalPayload, storedCode]);

  function navigate(nextRoute: Route) {
    const path = nextRoute === "home" ? "/" : `/${nextRoute}`;
    window.history.pushState({}, "", path);
    setRoute(nextRoute);
  }

  if (route === "get-started") {
    return <IntakePage navigate={navigate} setPortalPayload={setPortalPayload} />;
  }

  if (route === "portal") {
    return <PortalPage payload={portalPayload} setPortalPayload={setPortalPayload} />;
  }

  if (route === "admin") {
    return <AdminPage />;
  }

  return <HomePage navigate={navigate} />;
}
