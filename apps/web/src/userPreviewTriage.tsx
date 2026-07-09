import { createContext, useContext } from "react";
import type { CSSProperties, ReactNode } from "react";

export type UserPreviewTriageTone = "red" | "yellow" | "orange";

type UserPreviewTriageIssue = {
  label: string;
  note: string;
  tone: UserPreviewTriageTone;
};

export const USER_PREVIEW_TRIAGE_TONES = {
  red: {
    label: "Remove review",
    description: "Likely low-value or useless content that may be removed after review."
  },
  yellow: {
    label: "Implement or repair",
    description: "Unimplemented, placeholder, zeroed, stale, or logically suspect data or functionality."
  },
  orange: {
    label: "Rendering repair",
    description: "Rendered poorly, cramped, wrapped badly, misaligned, or hard to read."
  }
} as const satisfies Record<UserPreviewTriageTone, { label: string; description: string }>;

export const USER_PREVIEW_TRIAGE_ISSUES = {
  "sidebar.profile-info.inactive": {
    tone: "red",
    label: "Inactive nav",
    note: "Profile info renders as a nav button but has no click handler in this preview. Decision needed: wire it to profile details or remove it from the preview nav."
  },
  "sidebar.dashboard.stage": {
    tone: "yellow",
    label: "Future-stage surface",
    note: "Dashboard is a post-implementation surface and can show mostly unavailable cards before implementation data exists. Decision needed: keep it visible here or gate it until data is ready."
  },
  "picker.environmental-impact.placeholder": {
    tone: "yellow",
    label: "Hardcoded unknown",
    note: "The picker impact metric is returned by retrofitPickerEnvironmentalImpact(), which currently returns '?' for every retrofit. Decision needed: implement a real summary or remove this metric."
  },
  "workspace.tabs.scenarios-opportunities.label": {
    tone: "orange",
    label: "Dense label",
    note: "The Scenarios+Opportunities tab label is dense and can wrap awkwardly on narrow widths. Decision needed: pick a shorter label or responsive treatment."
  },
  "workspace.stepper.future-steps": {
    tone: "yellow",
    label: "Unwired progress",
    note: "Implementation, Application, and Dashboard steps are displayed without persisted workflow state. Decision needed: wire real progress or simplify this stepper."
  },
  "workspace.actions.confirm-local-only": {
    tone: "yellow",
    label: "Local-only action",
    note: "Confirm and move to next step only records local preview state and says recalculation is not available yet. Decision needed: define persistence and recalculation behavior."
  },
  "workspace.actions.discard-no-handler": {
    tone: "red",
    label: "No-op action",
    note: "Discard changes is rendered as an active button but has no handler. Decision needed: implement reset behavior or remove the button."
  },
  "overview.application-card.duplicate": {
    tone: "red",
    label: "Duplicate surface",
    note: "This card duplicates the dedicated Application Overview tab and can add little value when support is unavailable. Decision needed: keep as a summary, combine it, or remove it."
  },
  "overview.application-card.placeholder": {
    tone: "yellow",
    label: "Needs data",
    note: "Application details often fall back to Needs review or not available until a customer-ready profile exists. Decision needed: gate the card or wire a stronger data basis."
  },
  "overview.impact-card.fallback": {
    tone: "yellow",
    label: "Needs evidence",
    note: "Impact summary can show fallback certification contribution text when source impact data is missing. Decision needed: verify the copy or hide unsupported claims."
  },
  "workspace.financing.placeholder": {
    tone: "yellow",
    label: "Placeholder drawer",
    note: "Financing opens a drawer that says full optimization is coming later and leaves core terms unestimated. Decision needed: implement financing logic or remove the CTA."
  },
  "scenarios.opportunity-table.dense": {
    tone: "orange",
    label: "Dense table",
    note: "The opportunity review table uses five dense columns and can be hard to scan. Decision needed: decide whether it needs a responsive or simpler layout."
  },
  "impact.certification-fallback": {
    tone: "yellow",
    label: "Fallback claims",
    note: "Certification rows include generic fallback values such as May support when source-specific impact data is missing. Decision needed: verify basis before exposing as evidence."
  },
  "application.overview-disabled": {
    tone: "yellow",
    label: "Disabled support",
    note: "Application Overview can render a disabled support button and Needs review fields. Decision needed: hide the tab until a customer-ready profile exists or implement the workflow."
  },
  "dashboard.empty-post-implementation": {
    tone: "yellow",
    label: "Unavailable data",
    note: "Dashboard empty state confirms there are no implemented retrofits yet. Decision needed: keep this future-stage dashboard visible or gate it behind implementation data."
  },
  "dashboard.inline-actions.inactive": {
    tone: "red",
    label: "Inactive buttons",
    note: "Dashboard inline View actions render as buttons without navigation or handlers. Decision needed: wire the actions or remove them from review surfaces."
  },
  "dashboard.best-path-options.static": {
    tone: "yellow",
    label: "Static plan options",
    note: "Best Path Options uses static week estimates and local buttons. Decision needed: implement path planning logic or remove this card until supported."
  }
} as const satisfies Record<string, UserPreviewTriageIssue>;

export type UserPreviewTriageIssueId = keyof typeof USER_PREVIEW_TRIAGE_ISSUES;

export const USER_PREVIEW_TRIAGE_SURFACES = {
  "sidebar.profile-info": ["sidebar.profile-info.inactive"],
  "sidebar.dashboard": ["sidebar.dashboard.stage"],
  "picker.environmental-impact": ["picker.environmental-impact.placeholder"],
  "workspace.tabs.scenarios-opportunities": ["workspace.tabs.scenarios-opportunities.label"],
  "workspace.stepper": ["workspace.stepper.future-steps"],
  "workspace.actions": ["workspace.actions.confirm-local-only", "workspace.actions.discard-no-handler"],
  "overview.application-card": ["overview.application-card.duplicate", "overview.application-card.placeholder"],
  "overview.impact-card": ["overview.impact-card.fallback"],
  "workspace.financing-strip": ["workspace.financing.placeholder"],
  "scenarios.opportunity-table": ["scenarios.opportunity-table.dense"],
  "impact.certification-list": ["impact.certification-fallback"],
  "application.overview-card": ["application.overview-disabled"],
  "dashboard.empty-notice": ["dashboard.empty-post-implementation"],
  "dashboard.inline-action": ["dashboard.inline-actions.inactive"],
  "dashboard.best-path-options": ["dashboard.best-path-options.static"]
} as const satisfies Record<string, readonly UserPreviewTriageIssueId[]>;

export type UserPreviewTriageSurfaceId = keyof typeof USER_PREVIEW_TRIAGE_SURFACES;

const USER_PREVIEW_TRIAGE_CONTEXT = createContext(false);

const TRIAGE_TONE_COLORS: Record<UserPreviewTriageTone, string> = {
  red: "#b42318",
  yellow: "#b7791f",
  orange: "#c2410c"
};

type UserPreviewTriageTargetProps = {
  className?: string;
  style?: CSSProperties;
  "data-review-triage-count"?: number;
  "data-review-triage-surface"?: UserPreviewTriageSurfaceId;
  "data-review-triage-tones"?: string;
};

export function UserPreviewTriageProvider({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  return (
    <USER_PREVIEW_TRIAGE_CONTEXT.Provider value={enabled}>
      {children}
    </USER_PREVIEW_TRIAGE_CONTEXT.Provider>
  );
}

export function useUserPreviewTriageMode() {
  return useContext(USER_PREVIEW_TRIAGE_CONTEXT);
}

export function isUserPreviewTriageModeEnabled(search: string) {
  const params = new URLSearchParams(search);
  const value = params.get("triage") || "";
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export function getUserPreviewTriageIssues(surfaceId: UserPreviewTriageSurfaceId) {
  return USER_PREVIEW_TRIAGE_SURFACES[surfaceId].map((issueId) => ({
    id: issueId,
    ...USER_PREVIEW_TRIAGE_ISSUES[issueId]
  }));
}

export function getUserPreviewTriageTargetProps({
  className,
  enabled,
  style,
  surfaceId
}: {
  className?: string;
  enabled: boolean;
  style?: CSSProperties;
  surfaceId: UserPreviewTriageSurfaceId;
}): UserPreviewTriageTargetProps {
  if (!enabled) {
    return { className, style };
  }
  const issues = getUserPreviewTriageIssues(surfaceId);
  const tones = uniqueTones(issues.map((issue) => issue.tone));
  return {
    className: [
      className,
      "review-triage-target",
      ...tones.map((tone) => `is-review-triage-${tone}`)
    ].filter(Boolean).join(" "),
    style: {
      ...style,
      "--review-triage-stripe": triageStripeForTones(tones)
    } as CSSProperties,
    "data-review-triage-count": issues.length,
    "data-review-triage-surface": surfaceId,
    "data-review-triage-tones": tones.join(" ")
  };
}

export function UserPreviewTriageBadges({
  as = "div",
  compact = false,
  enabled,
  surfaceId
}: {
  as?: "div" | "span";
  compact?: boolean;
  enabled?: boolean;
  surfaceId: UserPreviewTriageSurfaceId;
}) {
  const contextEnabled = useUserPreviewTriageMode();
  const active = enabled ?? contextEnabled;
  if (!active) return null;
  const issues = getUserPreviewTriageIssues(surfaceId);
  const Component = as;
  return (
    <Component
      aria-label={`Review triage notes for ${surfaceId}`}
      className={`review-triage-badges${compact ? " is-compact" : ""}`}
    >
      {issues.map((issue) => (
        <span className={`review-triage-badge is-${issue.tone}`} key={issue.id}>
          <strong>{USER_PREVIEW_TRIAGE_TONES[issue.tone].label}: {issue.label}</strong>
          <span>{issue.note}</span>
        </span>
      ))}
    </Component>
  );
}

export function UserPreviewTriagePanel({ enabled }: { enabled?: boolean }) {
  const contextEnabled = useUserPreviewTriageMode();
  const active = enabled ?? contextEnabled;
  if (!active) return null;
  const issueCount = Object.keys(USER_PREVIEW_TRIAGE_ISSUES).length;
  return (
    <section className="review-triage-panel" aria-label="Review triage overlay legend">
      <div>
        <strong>Review triage overlay</strong>
        <p>Enabled by ?triage=1 for admin review only. Normal user preview traffic does not see these annotations.</p>
      </div>
      <div className="review-triage-legend" aria-label={`${issueCount} seeded review targets`}>
        {(["red", "yellow", "orange"] as const).map((tone) => (
          <span className={`review-triage-legend-item is-${tone}`} key={tone}>
            <i aria-hidden="true" />
            <b>{USER_PREVIEW_TRIAGE_TONES[tone].label}</b>
            <small>{USER_PREVIEW_TRIAGE_TONES[tone].description}</small>
          </span>
        ))}
      </div>
    </section>
  );
}

function uniqueTones(tones: UserPreviewTriageTone[]) {
  return Array.from(new Set(tones));
}

function triageStripeForTones(tones: UserPreviewTriageTone[]) {
  const colors = tones.map((tone) => TRIAGE_TONE_COLORS[tone]);
  if (colors.length <= 1) return colors[0] || TRIAGE_TONE_COLORS.yellow;
  const step = 100 / colors.length;
  return `linear-gradient(to bottom, ${colors
    .map((color, index) => `${color} ${index * step}% ${(index + 1) * step}%`)
    .join(", ")})`;
}
