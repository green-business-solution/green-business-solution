import { ScrollVideoScanner } from "../../../../components/ScrollVideoScanner";
import { ArrowUpRightIcon } from "../../../../components/public/PublicIcons";
import { heroScrollVideo } from "../../../../lib/homeScrollMedia";
import { scannerFrames } from "../../../../lib/scannerFrames";
import type { Route } from "../../../../routes";

export function PlanetScanHero({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <ScrollVideoScanner
      ariaLabelledBy="planet-scan-heading"
      className="planet-scan-section"
      frames={scannerFrames}
      videoAsset={heroScrollVideo}
    >
      <div className="planet-scan-content">
        <div className="planet-scan-copy">
          <div className="planet-scan-message planet-scan-message-static planet-scan-message-primary">
            <h1 className="planet-scan-title planet-scan-title--before" id="planet-scan-heading">
              <span>Find the money</span>
              <span>behind your next</span>
              <span className="planet-scan-title-accent">retrofit.</span>
            </h1>
            <p className="planet-scan-subhead">Billions in retrofit incentives exist while building owners lose billions to operating expenses.</p>
            <div className="planet-scan-action">
              <button className="planet-scan-cta planet-scan-primary" onClick={() => navigate("scan")} type="button">
                Get Started
                <ArrowUpRightIcon />
              </button>
              <p>Free property scan · No commitment</p>
            </div>
          </div>
          <div className="planet-scan-message planet-scan-message-static planet-scan-message-next">
            <h2 className="planet-scan-next-headline">RetroFi helps businesses find, compare, claim, and implement retrofit incentives.</h2>
            <p className="planet-scan-emphasis">Sustainable. Profitable. Practical.</p>
            <button className="planet-scan-cta planet-scan-primary" onClick={() => navigate("scan")} type="button">
              Get Started
              <ArrowUpRightIcon />
            </button>
          </div>
        </div>
      </div>
      <p aria-hidden="true" className="planet-scan-scroll-cue">
        Scroll to explore
        <span />
      </p>
    </ScrollVideoScanner>
  );
}
