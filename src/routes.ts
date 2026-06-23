export type Route =
  | "home"
  | "how-it-works"
  | "pricing"
  | "about"
  | "about-mission"
  | "about-team"
  | "about-trust"
  | "about-contact"
  | "scan"
  | "scan-results"
  | "sign-in"
  | "portal"
  | "admin";

export const aboutLinks: Array<{ label: string; route: Route }> = [
  { label: "Mission", route: "about-mission" },
  { label: "Team", route: "about-team" },
  { label: "Trust & Data", route: "about-trust" },
  { label: "Contact", route: "about-contact" }
];

export function routeFromPath(pathname = typeof window === "undefined" ? "/" : window.location.pathname): Route {
  if (pathname === "/how-it-works") return "how-it-works";
  if (pathname === "/pricing") return "pricing";
  if (pathname === "/database") return "admin";
  if (pathname === "/for-businesses") return "home";
  if (pathname === "/about") return "about";
  if (pathname === "/about/mission") return "about-mission";
  if (pathname === "/about/team") return "about-team";
  if (pathname === "/about/trust") return "about-trust";
  if (pathname === "/about/contact") return "about-contact";
  if (pathname === "/scan" || pathname === "/get-started") return "scan";
  if (pathname === "/scan/results") return "scan-results";
  if (pathname === "/sign-in") return "sign-in";
  if (pathname === "/portal") return "portal";
  if (pathname === "/admin") return "admin";
  return "home";
}

export function pathForRoute(route: Route) {
  if (route === "home") return "/";
  if (route === "about-mission") return "/about/mission";
  if (route === "about-team") return "/about/team";
  if (route === "about-trust") return "/about/trust";
  if (route === "about-contact") return "/about/contact";
  if (route === "scan-results") return "/scan/results";
  return `/${route}`;
}
