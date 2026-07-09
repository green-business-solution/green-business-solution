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
  | "tasks"
  | "task-report"
  | "testcases";

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
  if (pathname === "/scan/energy-data") return "scan-energy-data";
  if (pathname === "/sign-in") return "sign-in";
  if (pathname === "/portal") return "portal";
  if (pathname === "/portal-preview") return "portal-preview";
  if (pathname === "/user-preview") return "user-preview";
  if (pathname === "/chats") return "chats";
  if (pathname === "/admin/dashboard-performance-data") return "admin-dashboard-performance-data";
  if (pathname === "/admin/application-sources") return "admin-application-sources";
  if (pathname === "/admin/application-profiles") return "admin-application-profiles";
  if (pathname === "/admin") return "admin";
  if (pathname === "/tasks") return "tasks";
  if (pathname.startsWith("/tasks/reports/")) return "task-report";
  if (pathname === "/testcases") return "testcases";
  return "home";
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
  if (route === "task-report") return "/tasks/reports";
  if (route === "scan-results") return "/scan/results";
  if (route === "scan-energy-data") return "/scan/energy-data";
  return `/${route}`;
}
