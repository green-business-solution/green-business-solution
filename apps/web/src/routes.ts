export type Route =
  | "home"
  | "about"
  | "about-mission"
  | "about-team"
  | "about-trust"
  | "about-contact"
  | "scan"
  | "scan-results"
  | "scan-energy-data"
  | "sign-in"
  | "portal"
  | "portal-preview"
  | "user-preview"
  | "chats"
  | "admin"
  | "admin-dashboard-performance-data"
  | "admin-application-sources"
  | "admin-application-profiles"
  | "testcases";

export const aboutLinks: Array<{ label: string; route: Route }> = [
  { label: "Mission", route: "about-mission" },
  { label: "Team", route: "about-team" },
  { label: "Trust & Data", route: "about-trust" },
  { label: "Contact", route: "about-contact" }
];

export type RoutePathMatch = {
  isKnownPath: boolean;
  route: Route;
};

export function routePathMatchFromPath(
  pathname = typeof window === "undefined" ? "/" : window.location.pathname
): RoutePathMatch {
  if (pathname === "/" || pathname === "/for-businesses") return { isKnownPath: true, route: "home" };
  if (pathname === "/how-it-works") return { isKnownPath: true, route: "home" };
  if (pathname === "/pricing") return { isKnownPath: true, route: "home" };
  if (pathname === "/database") return { isKnownPath: true, route: "admin" };
  if (pathname === "/about") return { isKnownPath: true, route: "about" };
  if (pathname === "/about/mission") return { isKnownPath: true, route: "about-mission" };
  if (pathname === "/about/team") return { isKnownPath: true, route: "about-team" };
  if (pathname === "/about/trust") return { isKnownPath: true, route: "about-trust" };
  if (pathname === "/about/contact") return { isKnownPath: true, route: "about-contact" };
  if (pathname === "/scan" || pathname === "/get-started") return { isKnownPath: true, route: "scan" };
  if (pathname === "/scan/results") return { isKnownPath: true, route: "scan-results" };
  if (pathname === "/scan/energy-data") return { isKnownPath: true, route: "scan-energy-data" };
  if (pathname === "/sign-in") return { isKnownPath: true, route: "sign-in" };
  if (pathname === "/portal") return { isKnownPath: true, route: "portal" };
  if (pathname === "/portal-preview") return { isKnownPath: true, route: "portal-preview" };
  if (pathname === "/user-preview") return { isKnownPath: true, route: "user-preview" };
  if (pathname === "/chats") return { isKnownPath: true, route: "chats" };
  if (pathname === "/admin/dashboard-performance-data") {
    return { isKnownPath: true, route: "admin-dashboard-performance-data" };
  }
  if (pathname === "/admin/application-sources") return { isKnownPath: true, route: "admin-application-sources" };
  if (pathname === "/admin/application-profiles") return { isKnownPath: true, route: "admin-application-profiles" };
  if (pathname === "/admin") return { isKnownPath: true, route: "admin" };
  if (pathname === "/testcases") return { isKnownPath: true, route: "testcases" };
  return { isKnownPath: false, route: "home" };
}

export function routeFromPath(pathname = typeof window === "undefined" ? "/" : window.location.pathname): Route {
  return routePathMatchFromPath(pathname).route;
}

function isServerHandledPath(pathname: string) {
  return pathname === "/api" || pathname.startsWith("/api/");
}

export function shouldCanonicalizeUnknownHomeFallback(
  pathname = typeof window === "undefined" ? "/" : window.location.pathname
) {
  const match = routePathMatchFromPath(pathname);
  return match.route === "home" && !match.isKnownPath && !isServerHandledPath(pathname);
}

export function pathForRoute(route: Route) {
  if (route === "home") return "/";
  if (route === "about-mission") return "/about/mission";
  if (route === "about-team") return "/about/team";
  if (route === "about-trust") return "/about/trust";
  if (route === "about-contact") return "/about/contact";
  if (route === "admin-application-sources") return "/admin/application-sources";
  if (route === "admin-dashboard-performance-data") return "/admin/dashboard-performance-data";
  if (route === "admin-application-profiles") return "/admin/application-profiles";
  if (route === "scan-results") return "/scan/results";
  if (route === "scan-energy-data") return "/scan/energy-data";
  return `/${route}`;
}
