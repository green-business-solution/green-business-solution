import type { CSSProperties } from "react";
import { ArrowUpRightIcon } from "../../../../components/public/PublicIcons";
import { LeafOutlineIcon } from "../../../../icons";
import { homeJourneyFinalFrame } from "../../../../lib/homeJourneyFrames";
import { HOME_DASHBOARD_SECTION_ID } from "../../homeSections";
import { CustomerPricingSection } from "../pricing/CustomerPricingSection";
import {
  homeDashboardEnvironmentalPoints,
  homeDashboardStatusStrip,
  homeDashboardSummaryMetrics,
} from "./dashboard.data";

function HomeDashboardMetricCard({ label, note, value }: { label: string; note: string; value: string }) {
  return (
    <article className="home-dashboard-preview-metric" tabIndex={0}>
      <span className="home-dashboard-preview-icon"><LeafOutlineIcon /></span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
    </article>
  );
}

function HomeDashboardStatusStrip() {
  return (
    <div
      aria-label="Performance forecast cards. Scroll horizontally to explore."
      className="home-dashboard-preview-status-strip"
      tabIndex={0}
    >
      {homeDashboardStatusStrip.map((group) => (
        <article className={`home-dashboard-preview-status is-${group.accent}`} key={group.label} tabIndex={0}>
          <div className="home-dashboard-preview-status-heading">
            <span className="home-dashboard-preview-status-icon"><LeafOutlineIcon /></span>
            <div>
              <h4>{group.label}</h4>
              <p>{group.note}</p>
            </div>
          </div>
          <dl>
            {group.values.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

export function HomeDashboardPreviewSection({
  embeddedInJourney = false,
  includePricing = true,
}: {
  embeddedInJourney?: boolean;
  includePricing?: boolean;
}) {
  return (
    <section
      aria-labelledby="home-dashboard-preview-heading"
      className={`home-dashboard-preview-section home-dashboard-preview-stage${embeddedInJourney ? " home-dashboard-preview-stage--journey-embedded" : ""}`}
      id={HOME_DASHBOARD_SECTION_ID}
      style={{ "--home-journey-final-frame": `url("${homeJourneyFinalFrame}")` } as CSSProperties}
    >
      <div className="home-dashboard-preview-inner">
        <header className="home-dashboard-preview-intro">
          <p>Performance dashboard</p>
          <h2 id="home-dashboard-preview-heading">See every retrofit pay off in one place.</h2>
          <span>
            RetroFi turns project costs, incentives, savings, emissions reductions, and certification progress into a clear performance dashboard for every property.
          </span>
        </header>

        <div className="home-dashboard-preview-shell">
          <div className="home-dashboard-preview-topbar">
            <div>
              <p>Performance Dashboard</p>
              <span>Cross-portfolio overview of implemented retrofits.</span>
            </div>
            <div aria-label="Dashboard preview filters" className="home-dashboard-preview-filters">
              <button className="home-dashboard-preview-filter" type="button">Jul 1, 2025 – Jun 30, 2026 <span aria-hidden="true">⌄</span></button>
              <button className="home-dashboard-preview-filter" type="button">All properties <span aria-hidden="true">⌄</span></button>
            </div>
          </div>

          <div aria-label="Dashboard sections" className="home-dashboard-preview-tabs">
            <span className="home-dashboard-preview-tab-label is-current">Summary</span>
            <span className="home-dashboard-preview-tab-label">Financial Performance</span>
            <span className="home-dashboard-preview-tab-label">Environmental Impact</span>
            <span className="home-dashboard-preview-tab-label">Certifications</span>
          </div>

          <div className="home-dashboard-preview-panel" id="home-dashboard-summary">
            <div
              aria-label="Dashboard key metrics. Scroll horizontally to explore."
              className="home-dashboard-preview-metrics"
              tabIndex={0}
            >
              {homeDashboardSummaryMetrics.map((metric) => (
                <HomeDashboardMetricCard key={metric.label} {...metric} />
              ))}
            </div>
            <HomeDashboardStatusStrip />
          </div>

          <div className="home-dashboard-preview-detail-grid">
            <article className="home-dashboard-preview-card home-dashboard-preview-card--donut" id="home-dashboard-financial" tabIndex={0}>
              <div className="home-dashboard-preview-card-heading">
                <h3>Financial Snapshot</h3>
                <span>+$83,213</span>
              </div>
              <div className="home-dashboard-preview-donut-row">
                <div aria-label="$6K incentives received" className="home-dashboard-preview-donut" role="img">
                  <span>$6K</span>
                  <small>Incentives received</small>
                </div>
                <dl className="home-dashboard-preview-legend">
                  <div><dt>Received</dt><dd>$6K</dd></div>
                  <div><dt>Pending</dt><dd>$36K</dd></div>
                  <div><dt>Not Yet Claimed</dt><dd>$41K</dd></div>
                </dl>
              </div>
              <button className="home-dashboard-preview-link" type="button">View financial details <ArrowUpRightIcon /></button>
            </article>

            <article className="home-dashboard-preview-card home-dashboard-preview-card--environment" id="home-dashboard-environmental" tabIndex={0}>
              <div className="home-dashboard-preview-card-heading">
                <h3>Environmental Snapshot</h3>
                <span>9.2 MT</span>
              </div>
              <svg aria-label="Environmental savings trend" className="home-dashboard-preview-line" role="img" viewBox="0 0 324 140">
                <g className="home-dashboard-preview-line-grid"><path d="M24 36h276M24 72h276M24 108h276" /></g>
                <polyline points={homeDashboardEnvironmentalPoints} />
                {homeDashboardEnvironmentalPoints.split(" ").map((point) => {
                  const [cx, cy] = point.split(",");
                  return <circle cx={cx} cy={cy} key={point} r="3" />;
                })}
              </svg>
              <div className="home-dashboard-preview-impact-row">
                <span><strong>111,520 kWh</strong>Electricity savings</span>
                <span><strong>1,032 therms</strong>Natural gas</span>
                <span><strong>69,694 gal</strong>Water savings</span>
              </div>
              <button className="home-dashboard-preview-link" type="button">View environmental details <ArrowUpRightIcon /></button>
            </article>

            <article className="home-dashboard-preview-card home-dashboard-preview-card--certifications" id="home-dashboard-certifications" tabIndex={0}>
              <div className="home-dashboard-preview-card-heading"><h3>Certification Progress</h3></div>
              <div className="home-dashboard-preview-progress">
                <div><span><strong>ENERGY STAR</strong><b>42%</b></span><i><em style={{ width: "42%" }} /></i></div>
                <div><span><strong>LEED O+M readiness</strong><b>43%</b></span><i><em style={{ width: "43%" }} /></i></div>
              </div>
              <button className="home-dashboard-preview-link" type="button">View all certifications <ArrowUpRightIcon /></button>
            </article>

            <article className="home-dashboard-preview-card home-dashboard-preview-card--actions" tabIndex={0}>
              <div className="home-dashboard-preview-card-heading"><h3>Next Best Action</h3></div>
              <button className="home-dashboard-preview-action" type="button"><span>Claim WSHFC Sustainable Energy Program<small>Finish the rebate claim package.</small></span><ArrowUpRightIcon /></button>
              <button className="home-dashboard-preview-action" type="button"><span>Upload post-install utility bill<small>Unlock incentive measurement.</small></span><ArrowUpRightIcon /></button>
              <button className="home-dashboard-preview-action" type="button"><span>Verify post-install utility bills<small>Compare measured performance.</small></span><ArrowUpRightIcon /></button>
            </article>

            <article className="home-dashboard-preview-card home-dashboard-preview-card--retrofits" tabIndex={0}>
              <div className="home-dashboard-preview-card-heading"><h3>Implemented Retrofits</h3></div>
              <div className="home-dashboard-preview-table" role="table" aria-label="Implemented retrofits">
                <div role="row"><strong role="columnheader">Retrofit</strong><strong role="columnheader">Installed</strong><strong role="columnheader">Savings</strong></div>
                <div role="row"><span role="cell">Community solar</span><span role="cell">Jul 2025</span><span role="cell">$6K</span></div>
                <div role="row"><span role="cell">Low-flow fixtures</span><span role="cell">Aug 2025</span><span role="cell">$1K</span></div>
                <div role="row"><span role="cell">Air sealing</span><span role="cell">Sep 2025</span><span role="cell">$537</span></div>
              </div>
              <button className="home-dashboard-preview-link" type="button">View all retrofits <ArrowUpRightIcon /></button>
            </article>
          </div>
        </div>
        {includePricing ? <CustomerPricingSection /> : null}
      </div>
    </section>
  );
}
