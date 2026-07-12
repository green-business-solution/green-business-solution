import type { CSSProperties } from "react";
import { isLocalDevelopmentHost } from "../../../../api";
import { ArrowUpRightIcon, FeatureIcon } from "../../../../components/public/PublicIcons";
import { CheckIcon, HomeOutlineIcon, LeafOutlineIcon } from "../../../../icons";
import type { Route } from "../../../../routes";
import { HOME_INSIGHTS_SECTION_ID } from "../../homeSections";
import {
  homeApplicationSteps,
  homeImpactPoints,
  homeRankedRetrofits,
  homeSavingsBars,
} from "./insights.data";

export function HomeInfographicSection({ navigate }: { navigate: (route: Route) => void }) {
  const impactPolyline = homeImpactPoints
    .map((point, index) => {
      const x = 24 + index * 32;
      const y = 150 - (point.value / 1300) * 112;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section aria-labelledby="home-infographics-heading" className="home-infographics-section" id={HOME_INSIGHTS_SECTION_ID}>
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
          <h2 id="home-infographics-heading">Know what to upgrade—and what it could be worth.</h2>
          <span>RetroFi turns property details into prioritized projects, financial estimates, and a clear path to available incentives.</span>
          <ul className="home-proof-points" aria-label="RetroFi platform benefits">
            <li><CheckIcon /> Property-specific matches</li>
            <li><CheckIcon /> Implementation Support</li>
            <li><CheckIcon /> Application-ready guidance</li>
          </ul>
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
              {homeSavingsBars.map((bar, index) => (
                <button
                  aria-label={`Year ${index + 1} estimated annual savings: ${bar.amount}`}
                  className="home-chart-bar"
                  key={bar.amount}
                  style={{ "--bar-height": `${bar.height}%` } as CSSProperties}
                  type="button"
                >
                  <strong>{bar.amount}</strong>
                  <span>{`YR ${index + 1}`}</span>
                </button>
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
          <button className={isLocalDevelopmentHost() ? "is-local-development" : undefined} onClick={() => navigate("scan")} type="button">
            Get Started
            <ArrowUpRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
