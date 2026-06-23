import { useEffect, useRef, useState } from "react";
import { apiPost } from "./api";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_IDENTITY_SCRIPT_URL,
  googleOriginSetupMessage
} from "./config";
import type { AuthCredential } from "./authTypes";

type GoogleCredentialResponse = {
  credential?: string;
  select_by?: string;
};

type GoogleButtonOptions = {
  logo_alignment?: "left" | "center";
  shape?: "rectangular" | "pill" | "circle" | "square";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  theme?: "outline" | "filled_blue" | "filled_black";
  width?: number;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            callback: (response: GoogleCredentialResponse) => void;
            cancel_on_tap_outside?: boolean;
            client_id: string;
          }) => void;
          renderButton: (parent: HTMLElement, options: GoogleButtonOptions) => void;
        };
      };
    };
  }
}

let googleIdentityScriptPromise: Promise<void> | null = null;

function loadGoogleIdentityScript() {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (!googleIdentityScriptPromise) {
    googleIdentityScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        `script[src="${GOOGLE_IDENTITY_SCRIPT_URL}"]`
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener("error", () => reject(new Error("Google sign-in failed to load.")), {
          once: true
        });
        return;
      }

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = GOOGLE_IDENTITY_SCRIPT_URL;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Google sign-in failed to load."));
      document.head.appendChild(script);
    });
  }

  return googleIdentityScriptPromise;
}

function googleSetupError(reason: string) {
  return `${reason} ${googleOriginSetupMessage()}`;
}

export function GoogleSignInButton<T>({
  endpoint,
  onSuccess
}: {
  endpoint: string;
  onSuccess: (payload: T, credential: AuthCredential) => void;
}) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const onSuccessRef = useRef(onSuccess);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    let isMounted = true;

    async function renderGoogleButton() {
      if (!GOOGLE_CLIENT_ID) {
        setError(googleSetupError("Google sign-in is not configured."));
        setIsLoading(false);
        return;
      }

      try {
        await loadGoogleIdentityScript();
      } catch (scriptError) {
        if (!isMounted) return;
        const message = scriptError instanceof Error ? scriptError.message : "Google sign-in failed to load.";
        setError(googleSetupError(message));
        setIsLoading(false);
        return;
      }

      if (!isMounted || !buttonRef.current) {
        return;
      }

      if (!window.google?.accounts?.id) {
        setError(googleSetupError("Google sign-in loaded without the expected browser API."));
        setIsLoading(false);
        return;
      }

      // Google Identity Services returns an ID token to this callback; it is not an OAuth redirect-code flow.
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        cancel_on_tap_outside: true,
        callback: async (response) => {
          const credential = response.credential;
          if (!credential) {
            setError("Google did not return a sign-in credential.");
            return;
          }

          setError(null);
          setIsSigningIn(true);
          try {
            const payload = await apiPost<T>(endpoint, { credential });
            onSuccessRef.current(payload, { provider: "google", value: credential });
          } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Google sign-in failed.");
          } finally {
            setIsSigningIn(false);
          }
        }
      });

      const buttonWidth = Math.max(300, Math.floor(buttonRef.current.getBoundingClientRect().width || 480));

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        logo_alignment: "left",
        shape: "rectangular",
        size: "large",
        text: "continue_with",
        theme: "outline",
        width: buttonWidth
      });
      setIsLoading(false);
    }

    void renderGoogleButton();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return (
    <div className={["google-auth", isLoading ? "is-loading" : ""].filter(Boolean).join(" ")} aria-busy={isLoading}>
      {isLoading ? (
        <div aria-hidden="true" className="google-loading-button">
          <span className="google-loading-logo">G</span>
          <span>Continue with Google</span>
        </div>
      ) : null}
      <div className="google-button-slot" ref={buttonRef} />
      {isSigningIn ? <p className="muted-message">Signing in...</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
    </div>
  );
}
