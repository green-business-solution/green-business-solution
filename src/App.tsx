const initiatives = [
  {
    name: "Energy efficiency audit",
    owner: "Operations",
    status: "In review",
    impact: "18% utility reduction"
  },
  {
    name: "Supplier sustainability scorecard",
    owner: "Procurement",
    status: "Drafting",
    impact: "42 vendors mapped"
  },
  {
    name: "Waste diversion tracking",
    owner: "Facilities",
    status: "Active",
    impact: "63% diversion rate"
  }
];

const metrics = [
  { label: "Open initiatives", value: "12", tone: "green" },
  { label: "Monthly savings", value: "$8.4k", tone: "blue" },
  { label: "CO2e avoided", value: "31.7t", tone: "amber" }
];

export function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            G
          </div>
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>Green Business Solution</h1>
          </div>
        </div>

        <nav className="nav-list" aria-label="Sections">
          <a href="#overview" aria-current="page">Overview</a>
          <a href="#initiatives">Initiatives</a>
          <a href="#reports">Reports</a>
          <a href="#settings">Settings</a>
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Operating dashboard</p>
            <h2>Track sustainability work from idea to measurable result.</h2>
          </div>
          <button type="button">New initiative</button>
        </header>

        <section className="metric-grid" aria-label="Key metrics">
          {metrics.map((metric) => (
            <article className={`metric-card metric-card-${metric.tone}`} key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </section>

        <section className="work-section" id="initiatives">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Current work</p>
              <h2>Initiatives</h2>
            </div>
            <button type="button" className="secondary-button">Export</button>
          </div>

          <div className="initiative-table" role="table" aria-label="Initiatives">
            <div className="table-row table-head" role="row">
              <span role="columnheader">Name</span>
              <span role="columnheader">Owner</span>
              <span role="columnheader">Status</span>
              <span role="columnheader">Impact</span>
            </div>

            {initiatives.map((initiative) => (
              <div className="table-row" role="row" key={initiative.name}>
                <span role="cell">{initiative.name}</span>
                <span role="cell">{initiative.owner}</span>
                <span role="cell">
                  <mark>{initiative.status}</mark>
                </span>
                <span role="cell">{initiative.impact}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
