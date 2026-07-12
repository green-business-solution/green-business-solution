import type { PublicAuthState } from "../../components/public/PublicShell";
import { PublicShell } from "../../components/public/PublicShell";
import type { Route } from "../../routes";
import { HOME_HOW_IT_WORKS_SECTION_ID } from "./homeSections";
import { PlanetScanHero } from "./sections/hero/PlanetScanHero";
import { HomeInfographicSection } from "./sections/insights/HomeInfographicSection";
import {
  HomeJourneyFrameSection,
  HomeJourneyTransition,
  HowItWorksJourneySection,
} from "./sections/journey/HomeJourneySections";

export function HomePage({
  navigate,
  onHowItWorksClick,
  publicAuth
}: {
  navigate: (route: Route) => void;
  onHowItWorksClick: () => void;
  publicAuth: PublicAuthState;
}) {
  return (
    <PublicShell navigate={navigate} onHowItWorksClick={onHowItWorksClick} pageClassName="home-page" publicAuth={publicAuth} showFooter>
      <div id="home-overview">
        <PlanetScanHero navigate={navigate} />
      </div>
      <HomeInfographicSection navigate={navigate} />
      <div className="home-cloud-bridge">
        <HomeJourneyTransition />
        <div className="home-how-it-works-atmosphere">
          <HowItWorksJourneySection embedded sectionId={HOME_HOW_IT_WORKS_SECTION_ID} />
        </div>
      </div>
      <HomeJourneyFrameSection />
    </PublicShell>
  );
}
