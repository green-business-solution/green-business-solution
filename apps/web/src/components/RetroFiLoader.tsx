import type { CSSProperties } from "react";

const LOGO_SRC = "/retrofi-logo.png";

type LoaderSize = "sm" | "md" | "lg";
type LoaderTone = "page" | "card" | "modal";
type SkeletonVariant = "card" | "chart" | "table" | "list" | "kpi" | "text" | "retrofit-card" | "application";
type SkeletonWidth = "short" | "medium" | "long" | "full";

export function clampRetroFiProgress(progress: number | null | undefined) {
  if (progress == null || !Number.isFinite(progress)) return 0;
  return Math.max(0, Math.min(100, Math.round(progress)));
}

function progressWidth(progress: number | null | undefined, indeterminate?: boolean) {
  if (indeterminate) return undefined;
  const clamped = clampRetroFiProgress(progress);
  if (clamped > 0 && clamped < 8) return 8;
  return clamped;
}

function LogoImage({ className = "retrofi-loader-logo" }: { className?: string }) {
  return <img alt="" aria-hidden="true" className={className} src={LOGO_SRC} />;
}

export function RetroFiLogoLoader({
  size = "md",
  label = "Loading...",
  tone = "card",
  showLabel = true
}: {
  size?: LoaderSize;
  label?: string;
  tone?: LoaderTone;
  showLabel?: boolean;
}) {
  return (
    <div
      aria-label={showLabel ? undefined : label || "Loading RetroFi content"}
      aria-live="polite"
      className={`retrofi-logo-loader retrofi-logo-loader--${size} retrofi-logo-loader--${tone}`}
      role="status"
    >
      <span className="retrofi-logo-spinner">
        <span className="retrofi-logo-spinner-ring" aria-hidden="true" />
        <LogoImage className="retrofi-logo-spinner-mark" />
      </span>
      {showLabel ? <p>{label}</p> : <span className="sr-only">{label || "Loading RetroFi content"}</span>}
    </div>
  );
}

export function RetroFiProgressLoader({
  label = "Preparing your retrofit workspace...",
  sublabel = "Checking incentives, savings, and next steps",
  progress,
  steps,
  currentStep,
  indeterminate = progress == null,
  fullPage = false
}: {
  label?: string;
  sublabel?: string;
  progress?: number;
  steps?: string[];
  currentStep?: number;
  indeterminate?: boolean;
  fullPage?: boolean;
}) {
  const clamped = clampRetroFiProgress(progress);
  const width = progressWidth(progress, indeterminate);
  const stepLabel =
    steps && steps.length
      ? steps[Math.max(0, Math.min(steps.length - 1, currentStep ?? 0))]
      : sublabel;
  const fillStyle: CSSProperties | undefined = indeterminate ? undefined : { width: `${width}%` };

  return (
    <section
      aria-live="polite"
      className={`retrofi-progress-loader${fullPage ? " retrofi-progress-loader--full-page" : ""}`}
      role="status"
    >
      <div className="retrofi-loader-shell">
        <LogoImage />
        <h1>{label}</h1>
        {stepLabel ? <p>{stepLabel}</p> : null}
        <div
          aria-label={label}
          aria-valuemax={indeterminate ? undefined : 100}
          aria-valuemin={indeterminate ? undefined : 0}
          aria-valuenow={indeterminate ? undefined : clamped}
          className="retrofi-progress-track"
          role={indeterminate ? undefined : "progressbar"}
        >
          <span
            className={`retrofi-progress-fill${indeterminate ? " retrofi-progress-fill--indeterminate" : ""}`}
            style={fillStyle}
          />
        </div>
        {!indeterminate ? <strong className="retrofi-progress-percent">{clamped}%</strong> : null}
      </div>
    </section>
  );
}

export function RetroFiPageLoader({
  label,
  sublabel,
  progress,
  mode = "progress",
  variant = "default"
}: {
  label?: string;
  sublabel?: string;
  progress?: number;
  mode?: "progress" | "spinner";
  variant?: "dashboard" | "retrofit" | "application" | "default";
}) {
  const defaultLabel =
    variant === "dashboard"
      ? "Preparing your dashboard..."
      : variant === "application"
        ? "Preparing application checklist..."
        : "Preparing your retrofit workspace...";
  const defaultSublabel =
    variant === "dashboard"
      ? "Building savings, incentive, impact, and certification views"
      : variant === "application"
        ? "Reviewing required documents and incentive steps"
        : "Checking incentives, savings, and next steps";

  return (
    <main className={`retrofi-loader-page retrofi-loader-page--${variant}`} aria-busy="true">
      {mode === "spinner" ? (
        <RetroFiLogoLoader
          label={label || defaultLabel}
          size="lg"
          tone="page"
        />
      ) : (
        <RetroFiProgressLoader
          fullPage
          indeterminate={progress == null}
          label={label || defaultLabel}
          progress={progress}
          sublabel={sublabel || defaultSublabel}
        />
      )}
    </main>
  );
}

export function RetroFiSkeleton({
  variant = "text",
  rows,
  width = "full",
  label = "Loading content"
}: {
  variant?: SkeletonVariant;
  rows?: number;
  width?: SkeletonWidth;
  label?: string;
}) {
  if (variant === "text") {
    return <span aria-label={label} className={`retrofi-skeleton retrofi-skeleton-line retrofi-skeleton-line--${width}`} role="status" />;
  }

  const rowCount = rows ?? (variant === "table" ? 6 : variant === "list" ? 4 : 3);

  return (
    <div
      aria-label={label}
      aria-live="polite"
      className={`retrofi-skeleton retrofi-skeleton-${variant}`}
      role="status"
    >
      {variant === "kpi" ? (
        <>
          <span className="retrofi-skeleton-line retrofi-skeleton-line--medium" />
          <span className="retrofi-skeleton-value" />
          <span className="retrofi-skeleton-line retrofi-skeleton-line--long" />
        </>
      ) : variant === "chart" ? (
        <>
          <span className="retrofi-skeleton-line retrofi-skeleton-line--medium" />
          <span className="retrofi-skeleton-chart-body" />
        </>
      ) : (
        Array.from({ length: rowCount }).map((_, index) => (
          <span className="retrofi-skeleton-row" key={index} />
        ))
      )}
    </div>
  );
}
