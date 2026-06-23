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
        <svg aria-hidden="true" className="google-loading-logo" focusable="false" viewBox="0 0 48 48">
          <path
            d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"
            fill="#FFC107"
          />
          <path
            d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            fill="#FF3D00"
          />
          <path
            d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.1 35.1 26.6 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
            fill="#4CAF50"
          />
          <path
            d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C37 39.1 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"
            fill="#1976D2"
          />
        </svg>
        <span>{isRedirecting ? "Opening Google..." : "Continue with Google"}</span>
      </button>
    </div>
  );
}
