import { useState } from "react";
import { GOOGLE_SIGN_IN_START_PATH } from "./config";

export function GoogleSignInButton({ startPath = GOOGLE_SIGN_IN_START_PATH }: { startPath?: string }) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  function startGoogleRedirect() {
    setIsRedirecting(true);
    window.location.assign(startPath);
  }

  return (
    <div className="google-auth" aria-busy={isRedirecting}>
      <button
        className="google-loading-button google-redirect-button"
        disabled={isRedirecting}
        onClick={startGoogleRedirect}
        type="button"
      >
        <span aria-hidden="true" className="google-loading-logo">G</span>
        <span>{isRedirecting ? "Opening Google..." : "Continue with Google"}</span>
      </button>
    </div>
  );
}
