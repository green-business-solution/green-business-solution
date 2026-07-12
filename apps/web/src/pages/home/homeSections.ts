import { pathForRoute } from "../../routes";

export const HOME_HOW_IT_WORKS_SECTION_ID = "home-how-it-works";
export const HOME_INSIGHTS_SECTION_ID = "home-insights";
export const HOME_DASHBOARD_SECTION_ID = "home-dashboard";
export const HOME_PRICING_SECTION_ID = "home-pricing";

export function scrollToHomeSectionFallback(sectionId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const homeSectionPath = `${pathForRoute("home")}#${sectionId}`;

  if (window.location.pathname !== pathForRoute("home")) {
    window.history.pushState({}, "", homeSectionPath);
    window.dispatchEvent(new Event("popstate"));
    return;
  }

  const section = document.getElementById(sectionId);
  window.history.replaceState({}, "", homeSectionPath);

  if (!section) {
    return;
  }

  const headerOffset = 96;
  const top = Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerOffset);
  window.scrollTo({ behavior: "smooth", top });
}

export function scrollToHomeHowItWorksFallback() {
  scrollToHomeSectionFallback(HOME_HOW_IT_WORKS_SECTION_ID);
}
