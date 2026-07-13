import { useState } from "react";
import { HOME_PRICING_SECTION_ID } from "../../homeSections";
import {
  calculateEstimatedReportPrice,
  type ReportPricingTrack,
  type UtilitySpendBand,
} from "./pricing";

type CustomerPricingIntake = {
  site?: {
    address?: string | null;
  } | null;
};

export function CustomerPricingSection({ intake = null }: { intake?: CustomerPricingIntake | null }) {
  const [utilitySpend, setUtilitySpend] = useState<UtilitySpendBand | null>(null);
  const [address, setAddress] = useState(intake?.site?.address || "");
  const [businessType, setBusinessType] = useState<ReportPricingTrack | null>(null);
  const estimate = utilitySpend && address.trim() && businessType
    ? calculateEstimatedReportPrice({ location: "normal", propertySize: "normal", track: businessType, utilitySpend })
    : null;

  return (
    <section className="customer-pricing-section" aria-labelledby="customer-pricing-title" id={HOME_PRICING_SECTION_ID}>
      <div aria-hidden="true" className="customer-pricing-vines">
        <svg className="customer-pricing-vine customer-pricing-vine--left" viewBox="0 0 260 760">
          <path d="M48 760C13 650 142 620 104 504S8 387 72 280C128 187 72 103 172 0" />
          <path d="M48 760C92 672 34 622 104 504S188 394 72 280C8 180 130 116 172 0" className="customer-pricing-tendril" />
          <g className="customer-pricing-leaves">
            <ellipse cx="78" cy="666" rx="18" ry="36" transform="rotate(42 78 666)" />
            <ellipse cx="79" cy="552" rx="17" ry="34" transform="rotate(-47 79 552)" />
            <ellipse cx="47" cy="402" rx="18" ry="36" transform="rotate(46 47 402)" />
            <ellipse cx="106" cy="307" rx="16" ry="34" transform="rotate(-48 106 307)" />
            <ellipse cx="102" cy="151" rx="18" ry="37" transform="rotate(44 102 151)" />
            <ellipse cx="164" cy="56" rx="15" ry="32" transform="rotate(-45 164 56)" />
          </g>
        </svg>
        <svg className="customer-pricing-vine customer-pricing-vine--right" viewBox="0 0 260 760">
          <path d="M48 760C13 650 142 620 104 504S8 387 72 280C128 187 72 103 172 0" />
          <path d="M48 760C92 672 34 622 104 504S188 394 72 280C8 180 130 116 172 0" className="customer-pricing-tendril" />
          <g className="customer-pricing-leaves">
            <ellipse cx="78" cy="666" rx="18" ry="36" transform="rotate(42 78 666)" />
            <ellipse cx="79" cy="552" rx="17" ry="34" transform="rotate(-47 79 552)" />
            <ellipse cx="47" cy="402" rx="18" ry="36" transform="rotate(46 47 402)" />
            <ellipse cx="106" cy="307" rx="16" ry="34" transform="rotate(-48 106 307)" />
            <ellipse cx="102" cy="151" rx="18" ry="37" transform="rotate(44 102 151)" />
            <ellipse cx="164" cy="56" rx="15" ry="32" transform="rotate(-45 164 56)" />
          </g>
        </svg>
      </div>
      <div className="customer-pricing-heading">
        <p className="eyebrow">Pricing</p>
        <h2 id="customer-pricing-title">Pricing, made clear</h2>
        <p>A straightforward estimate now. Your final price after bill upload.</p>
      </div>

      <div className="customer-pricing-layout">
        <article className="pricing-journey-card" aria-label="How RetroFi report pricing works">
          <PricingJourneyStep icon="01" text="Start with an estimate" description="See a clear, rounded report price range before you upload bills." />
          <PricingJourneyStep icon="02" text="Confirm after bill upload" description="We confirm your final detailed report price using verified utility costs and your retrofit plan." />
          <PricingJourneyStep icon="03" text="Move forward with confidence" description="You will always see the price before deciding what to do next." />
        </article>

        <div className="pricing-estimate-column">
          <article className="pricing-estimator-card">
            <div>
              <p className="eyebrow">Quick estimate</p>
              <h2>Get your estimated report price</h2>
              <p>Answer three quick questions (~30s)</p>
            </div>
            <label className="pricing-address-field">
              <span>Property address</span>
              <input
                autoComplete="street-address"
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Enter your property address"
                type="text"
                value={address}
              />
              <small>We use this to confirm local program availability.</small>
            </label>
            <PricingChoiceGroup
              label="Business type"
              onChange={setBusinessType}
              options={[
                ["homeowner", "Homeowner"],
                ["business", "Business / commercial"],
                ["multifamily", "Multifamily"],
                ["nonprofit", "Nonprofit / school / government"],
                ["agriculture", "Agriculture"],
                ["industrial", "Industrial / manufacturing"]
              ] as Array<[ReportPricingTrack, string]>}
              value={businessType}
            />
            <PricingChoiceGroup
              label="Monthly utility spend"
              onChange={setUtilitySpend}
              options={[
                ["under_250", "Under $250"],
                ["250_750", "$250–$750"],
                ["750_2000", "$750–$2,000"],
                ["2000_10000", "$2,000–$10,000"],
                ["10000_50000", "$10,000–$50,000"],
                ["over_50000", "$50,000+"]
              ] as Array<[UtilitySpendBand, string]>}
              value={utilitySpend}
            />
          </article>
          <div className="pricing-estimate-result-slot">
            {estimate ? (
              <div aria-live="polite" className="pricing-estimate-result is-ready">
                <span>Estimated detailed report price</span>
                <strong>${Math.round(estimate.midpoint).toLocaleString()}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <article className="funding-activation-fee-card">
        <div>
          <p className="eyebrow">Implementation support</p>
          <h2>Commission Fee</h2>
          <p>If you choose to proceed with the retrofit, RetroFi charges a prepaid fee based on a conservative estimate of the incentive value in your selected retrofit.</p>
          <small>Your operating savings are not included in incentive value, and if you receive less than incentive value, we will fully refund that portion's charged commission.</small>
        </div>
        <div className="funding-activation-rate-table" aria-label="Commission Fee rates">
          <div><span>Confidence-adjusted incentive value</span><span>Upfront fee rate</span></div>
          <div><span>$0–$2,500</span><strong>6%</strong></div>
          <div><span>$2,500–$10,000</span><strong>5%</strong></div>
          <div><span>$10,000–$50,000</span><strong>4%</strong></div>
          <div><span>$50,000+</span><strong>3%</strong></div>
        </div>
      </article>
    </section>
  );
}

function PricingJourneyStep({ description, icon, text }: { description: string; icon: string; text: string }) {
  return (
    <div className="pricing-journey-step">
      <span aria-hidden="true" className="pricing-journey-icon">{icon}</span>
      <div>
        <h2>{text}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function PricingChoiceGroup<T extends string>({
  label,
  onChange,
  options,
  value
}: {
  label: string;
  onChange: (value: T | null) => void;
  options: Array<[T, string]>;
  value: T | null;
}) {
  const fieldId = `pricing-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <fieldset className={`pricing-choice-group${label === "Monthly utility spend" ? " pricing-choice-group--utility" : ""}${label === "Business type" ? " pricing-choice-group--business" : ""}`}>
      <legend>{label}</legend>
      <div>
        {options.map(([optionValue, optionLabel]) => (
          <label className="pricing-choice" key={optionValue}>
            <input
              checked={value === optionValue}
              name={fieldId}
              onChange={() => onChange(optionValue)}
              onClick={() => {
                if (value === optionValue) onChange(null);
              }}
              type="radio"
              value={optionValue}
            />
            <span>{optionLabel}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
