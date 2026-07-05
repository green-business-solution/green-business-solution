import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { resolveOpportunityApplicationSource } from "./ApplicationSourceResolver.mjs";
import { discoverOpportunityApplicationLinks } from "./ApplicationPathFinder.mjs";
import { extractOpportunityApplicationRequirements } from "./ApplicationRequirementExtractor.mjs";
import { composeDraftApplicationProfile, validateApplicationProfile } from "./ApplicationProfile.mjs";

async function loadFirstTenRawOpportunities() {
  const parsed = JSON.parse(await fs.readFile("APPLICATION_PREP_FIRST_10_EXPORT.json", "utf8"));
  return parsed.opportunities.slice(0, 10).map((item) => item.rawOpportunity);
}

function mockFetchByUrl(responses) {
  return async (url) => {
    const response = responses[String(url)];
    if (!response) throw new Error(`No mocked response for ${url}`);
    const config = typeof response === "string" ? { html: response } : response;
    const status = config.status || 200;
    const contentType = config.contentType || (String(url).endsWith(".pdf") ? "application/pdf" : "text/html; charset=utf-8");
    return {
      ok: status >= 200 && status < 300,
      status,
      headers: {
        get(name) {
          return name.toLowerCase() === "content-type" ? contentType : "";
        }
      },
      async text() {
        return config.html || "";
      }
    };
  };
}

function responsesForFirstTen() {
  return {
    "https://www.tmlp.com/182/Heat-Pump-Zero-Interest-Loan-Residential": `
      <html><body>
        <a href="https://www.tmlp.com/forms/home-energy-assessment.pdf">Home Energy Assessment Form</a>
        <a href="https://www.tmlp.com/forms/pre-approval-form.pdf">Pre-Approval Form</a>
        <a href="https://www.tmlp.com/forms/tmlp-saves-application-form.pdf">TMLP Saves application form</a>
        <p>Applications require customer name, contact email, phone, project address, contractor info, heat pump proposal, existing heating fuel, and Manual J for whole-home projects.</p>
        <p>Find a participating heat pump contractor before installation.</p>
      </body></html>
    `,
    "https://www.tmlp.com/forms/tmlp-saves-application-form.pdf": {
      contentType: "application/pdf",
      html: `
        TMLP Saves Application Form
        Applicants must provide contact name, contact email, phone, project address, contractor name, project cost.
        Required documents include itemized quote and energy audit.
        Pre-approval is required before installation when using financing.
      `
    },

    "https://www.duke-energy.com/home/products/ev-complete/off-peak-credit": { status: 403, html: "" },

    "https://idot.illinois.gov/transportation-system/environment/drive-electric.html": `
      <html><body>
        <a href="https://idot.illinois.gov/nevi/nofo.pdf">NOFO</a>
        <a href="https://idot.illinois.gov/nevi/application-checklist.pdf">Application submission checklist</a>
        <p>Email completed NEVI application package to DOT.NEVIApplication@illinois.gov.</p>
        <p>Required documents include Form 1 Compliance Checklist, Form 2 Technical Application, Form 3 Detailed Cost Proposal, Form 4 Detailed Project Schedule, Form 5 Utility Form, Form 6 Site Host Letter, and Form 7 NEPA documentation.</p>
      </body></html>
    `,

    "https://www.efficiencymaine.com/c-pace/": `
      <html><body>
        <a href="https://portal.efficiencymaine.com/cpace">C-PACE Application Portal</a>
        <a href="https://www.efficiencymaine.com/docs/cpace-project-application-guide.pdf">Project Application Guide PDF</a>
        <p>Application requirements include applicant legal name, Tax ID, property owner, participating municipality, registered capital provider, project scope, technical reviewer, SIR certification, lender consent if applicable, title report, and tax assessor property card.</p>
        <p>A $1,000 application fee is required.</p>
      </body></html>
    `,
    "https://portal.efficiencymaine.com/cpace": `
      <html><body>
        <h1>Application Requirements</h1>
        <p>Applicants must provide business legal name, Tax ID, project cost, service address, and contact email.</p>
        <p>Required documents include project application guide, title report, and tax assessor statement.</p>
      </body></html>
    `,

    "https://www.forestgrove-or.gov/213/Net-Metering-Residential-Solar": `
      <html><body>
        <a href="https://www.forestgrove-or.gov/forms/level-i-interconnection-application.pdf">Level I Interconnection Application</a>
        <a href="https://www.forestgrove-or.gov/forms/solar-interconnection-checklist.pdf">Solar Interconnection Checklist</a>
        <p>Installation only after application approval. Customer provides 12 months usage and cost/kWh.</p>
      </body></html>
    `,
    "https://www.forestgrove-or.gov/forms/level-i-interconnection-application.pdf": {
      contentType: "application/pdf",
      html: `
        Level I Interconnection Application
        Applicants must provide contact name, phone, email address, service address, utility account number, project type, equipment specification sheet, contractor name, installation date, and authorized signature.
      `
    },

    "https://nextzero.org/": `
      <html><body>
        <p>Select your municipal light plant to view available rebates and submit online applications.</p>
        <a href="https://rebates.nextzero.org/">Rebate portal</a>
      </body></html>
    `,
    "https://rebates.nextzero.org/": `
      <html><body><p>Select your town or municipal light plant before applying.</p></body></html>
    `,

    "https://wmgld.com/residential/solar-rebate-form/": `
      <html><body>
        <a href="https://nextzero.org/wakefield/solar-rebates/">Submit Online Application</a>
        <p>Email interconnection documents to solar@wmgld.com and final processing questions to help@nextzero.org.</p>
        <p>Required documents include one-line diagram stamped by MA Professional Engineer, panel and inverter spec sheets, proof of property ownership, signed participant agreement, installation invoice, Permission to Operate letter, and Certificate of Completion.</p>
      </body></html>
    `,
    "https://nextzero.org/wakefield/solar-rebates/": `
      <html><body>
        <h1>Application Requirements</h1>
        <p>Applicants must provide applicant name, contact email, phone, project address, system location, PV module manufacturer, inverter manufacturer, panel count, system capacity, total installed cost, and installer vendor.</p>
        <p>Upload equipment specification sheet and invoice.</p>
      </body></html>
    `,

    "https://energy.maryland.gov/business/Pages/Commercial-Solar.aspx": `
      <html><body>
        <p>As of February 24, 2025, this program has closed for applications; approximately 100% of funding has been awarded for FY 2025.</p>
        <a href="https://energy.maryland.gov/business/commercial-solar-foa.pdf">FOA</a>
        <a href="https://form.jotform.com/closed-solar">Jotform application portal</a>
        <p>Required documents include IRS Form W-9, good standing documentation, facility control evidence, project budget workbook, site map, solar contract or letter of intent, and tenant synopsis form if multifamily.</p>
      </body></html>
    `,
    "https://form.jotform.com/closed-solar": `
      <html><body><p>Applications closed. Not accepting applications.</p></body></html>
    `,

    "https://dced.pa.gov/programs/solar-for-schools-grant-program-s4s/": `
      <html><body>
        <a href="https://grants.pa.gov/Login.aspx">Apply</a>
        <a href="https://dced.pa.gov/download/solar-for-schools-guidelines.pdf">Guidelines</a>
        <a href="https://dced.pa.gov/download/solar-for-schools-preparation-checklist.pdf">Preparation Checklist</a>
        <form><label>Newsletter signup email</label></form>
      </body></html>
    `,
    "https://grants.pa.gov/Login.aspx": `
      <html><body>
        <h1>Application Requirements</h1>
        <p>Applicants must provide applicant entity, eligible school entity type, project facility address, project type, project cost, requested grant amount, and region.</p>
      </body></html>
    `,

    "https://vgsvt.com/savings/equipment-leases/": `
      <html><body>
        <a href="https://vgsvt.com/savings/equipment-leases/interest-form/">Interest Form</a>
      </body></html>
    `,
    "https://vgsvt.com/savings/equipment-leases/interest-form/": `
      <html><body>
        <h1>Application Requirements</h1>
        <p>Applicants must provide name, property address, VGS customer status, daytime phone number, email address, products interested in, heating equipment type, electric provider, water heater type, electric panel upgrade status, currently working with electrician, home heating method, furnace in basement, dwelling type, and income qualification question.</p>
        <p>Optional fields include VGS account number, water heater age, square footage, electric panel photo, and furnace photo.</p>
      </body></html>
    `
  };
}

describe("first-10 application prep regression", () => {
  it("uses structured official websites and produces honest first-10 path/profile states", async () => {
    const opportunities = await loadFirstTenRawOpportunities();
    const fetchFn = mockFetchByUrl(responsesForFirstTen());
    const results = [];

    for (const opportunity of opportunities) {
      const sourceProfile = resolveOpportunityApplicationSource(opportunity);
      const pathProfile = await discoverOpportunityApplicationLinks({ opportunity, sourceProfile }, { fetchFn });
      const requirementProfile = await extractOpportunityApplicationRequirements({ opportunity, sourceProfile, pathProfile }, { fetchFn });
      const draftProfile = composeDraftApplicationProfile({ opportunity, applicationPathProfile: pathProfile, applicationRequirementProfile: requirementProfile });
      const validation = validateApplicationProfile(draftProfile, { extractionStatus: requirementProfile.extractionStatus, createdAutomatically: true });
      results.push({ opportunity, sourceProfile, pathProfile, requirementProfile, draftProfile, validation });
    }

    expect(results.every((result) => result.sourceProfile.programWebsiteUrl)).toBe(true);
    expect(results.every((result) => result.pathProfile.programWebsiteUrl)).toBe(true);
    expect(results.every((result) => result.pathProfile.pathStatus !== "program_source_only" && result.pathProfile.discoveryStatus !== "source_only")).toBe(true);

    const byTitle = (fragment) => results.find((result) => result.opportunity.canonicalTitle.includes(fragment));
    expect(byTitle("Taunton")?.pathProfile.applicationArtifacts.length).toBeGreaterThan(0);
    expect(byTitle("C-PACE")?.requirementProfile.requiredFields.length).toBeGreaterThan(0);
    expect(byTitle("Forest Grove")?.pathProfile.bestPdfUrl).toMatch(/level-i-interconnection/i);
    expect(byTitle("Wakefield")?.pathProfile.bestApplicationUrl).toBe("https://nextzero.org/wakefield/solar-rebates/");
    expect(byTitle("Solar for Schools")?.pathProfile.bestApplicationUrl).toBe("https://grants.pa.gov/Login.aspx");
    expect(byTitle("Vermont Gas")?.pathProfile.bestApplicationUrl).toBe("https://vgsvt.com/savings/equipment-leases/interest-form/");
    expect(byTitle("Duke Energy")?.pathProfile.applicationStatus).toBe("source_unreadable_or_js_required");
    expect(byTitle("NextZero")?.pathProfile.applicationStatus).toBe("needs_user_selection");
    expect(byTitle("Commercial Solar")?.pathProfile.applicationStatus).toBe("funding_exhausted");

    const fakeText = JSON.stringify(results.map((result) => result.requirementProfile));
    expect(fakeText).not.toMatch(/\{\{ contact\.contact\.email \}\}/i);
    expect(fakeText).not.toMatch(/Get free, expert advice/i);
    expect(fakeText).not.toMatch(/Expiration Date:\s*"/i);
  });
});
