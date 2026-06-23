export const DEFAULT_GOOGLE_CLIENT_ID =
  "754037986401-dgklhhhtjr2k8u9jcj47fdf1jrf9baep.apps.googleusercontent.com";

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID;

export const GOOGLE_IDENTITY_SCRIPT_URL = "https://accounts.google.com/gsi/client";

export const GOOGLE_AUTHORIZED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://retrofi.org",
  "https://www.retrofi.org"
];

export const OPPORTUNITIES_TABLE_NAME = "gbs-opportunity-candidates";

export const STALE_SESSION_KEYS = ["gbs-user-session", "gbs-admin-session"];

export function currentBrowserOrigin() {
  return typeof window === "undefined" ? "" : window.location.origin;
}

export function googleOriginSetupMessage(origin = currentBrowserOrigin()) {
  const targetOrigin = origin || "the current browser origin";
  return `Confirm ${targetOrigin} is listed as an Authorized JavaScript origin in the Google OAuth Web client. Expected origins: ${GOOGLE_AUTHORIZED_ORIGINS.join(", ")}. This app uses a browser ID-token flow, so it does not need a redirect URI.`;
}
