import { type ReactNode, useEffect, useRef, useState } from "react";
import { aboutLinks, type Route } from "../../routes";
import {
  HOME_DASHBOARD_SECTION_ID,
  HOME_INSIGHTS_SECTION_ID,
  scrollToHomeHowItWorksFallback,
  scrollToHomeSectionFallback,
} from "../../pages/home/homeSections";

export type PublicAuthState = {
  isAdmin: boolean;
  isSignedIn: boolean;
  onSignOut: () => void;
};

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <button className="brand-link" onClick={onClick} type="button">
      <img alt="" aria-hidden="true" className="brand-symbol" src="/retrofi-logo.png" />
      <span>RetroFi</span>
    </button>
  );
}

function PublicNav({
  canStartScan = true,
  isSignedIn = false,
  navigate,
  onHowItWorksClick,
  onSignOut
}: {
  canStartScan?: boolean;
  isSignedIn?: boolean;
  navigate: (route: Route) => void;
  onHowItWorksClick?: () => void;
  onSignOut?: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const isMenuOpenRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const isNavVisibleRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const downThreshold = 12;
    const upThreshold = 3;
    let animationFrame = 0;

    const updateNavVisibility = () => {
      const nextScrollY = Math.max(0, window.scrollY);
      const delta = nextScrollY - lastScrollYRef.current;
      const homeInfographics = document.querySelector<HTMLElement>(".home-infographics-section");
      const infographicsBounds = homeInfographics?.getBoundingClientRect();
      const isInsideHomeHero = Boolean(infographicsBounds && infographicsBounds.top > 96);
      const homeHowItWorks = document.getElementById("home-how-it-works");
      const howItWorksBounds = homeHowItWorks?.getBoundingClientRect();
      const isInsideHomeHowItWorks = Boolean(
        howItWorksBounds && howItWorksBounds.top <= 96 && howItWorksBounds.bottom > 0
      );
      const shouldAlwaysShow = nextScrollY < 24 || isMenuOpenRef.current;
      let nextVisible = isNavVisibleRef.current;

      if (isInsideHomeHowItWorks) {
        nextVisible = false;
      } else if (isInsideHomeHero) {
        nextVisible = true;
      } else if (shouldAlwaysShow || delta < -upThreshold) {
        nextVisible = true;
      } else if (delta > downThreshold) {
        nextVisible = false;
      }

      if (nextVisible !== isNavVisibleRef.current) {
        isNavVisibleRef.current = nextVisible;
        setIsNavVisible(nextVisible);
      }

      lastScrollYRef.current = nextScrollY;
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateNavVisibility);
      }
    };

    lastScrollYRef.current = Math.max(0, window.scrollY);
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;

    if (isMenuOpen && !isNavVisibleRef.current) {
      isNavVisibleRef.current = true;
      setIsNavVisible(true);
    }
  }, [isMenuOpen]);

  function go(route: Route) {
    setIsMenuOpen(false);
    navigate(route);
  }

  function signOutFromNav() {
    setIsMenuOpen(false);
    onSignOut?.();
  }

  function openHowItWorks() {
    setIsMenuOpen(false);
    if (onHowItWorksClick) {
      onHowItWorksClick();
      return;
    }
    scrollToHomeHowItWorksFallback();
  }

  function openHomeSection(sectionId: string) {
    setIsMenuOpen(false);
    scrollToHomeSectionFallback(sectionId);
  }

  function renderAuthAction() {
    return isSignedIn ? (
      <button className="link-button" onClick={signOutFromNav} type="button">
        Sign Out
      </button>
    ) : (
      <button className="link-button" onClick={() => go("sign-in")} type="button">
        Sign In
      </button>
    );
  }

  return (
    <header className={["site-header", isNavVisible ? "site-header-visible" : "site-header-hidden"].join(" ")}>
      <div className="navbar-inner">
        <Brand onClick={() => go("home")} />
        <nav aria-label="Primary" className="site-nav">
          <button
            className="link-button"
            onClick={openHowItWorks}
            type="button"
          >
            How It Works
          </button>
          <button
            className="link-button"
            onClick={() => openHomeSection(HOME_DASHBOARD_SECTION_ID)}
            type="button"
          >
            Dashboard
          </button>
          <button
            className="link-button"
            onClick={() => go("pricing")}
            type="button"
          >
            Pricing
          </button>
          <button
            className="link-button"
            onClick={() => go("about")}
            type="button"
          >
            About
          </button>
        </nav>
        <div className="nav-actions">
          {renderAuthAction()}
          {canStartScan ? (
            <button className="nav-cta" onClick={() => go("scan")} type="button">
              Get Started
            </button>
          ) : null}
        </div>
        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          className="menu-button"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        {canStartScan ? (
          <button className="mobile-cta" onClick={() => go("scan")} type="button">
            Get Started
          </button>
        ) : null}
        {isMenuOpen ? (
          <div className="mobile-menu-panel">
            <button
              className="link-button"
              onClick={openHowItWorks}
              type="button"
            >
              How It Works
            </button>
            <button
              className="link-button"
              onClick={() => openHomeSection(HOME_DASHBOARD_SECTION_ID)}
              type="button"
            >
              Dashboard
            </button>
            <button
              className="link-button"
              onClick={() => go("pricing")}
              type="button"
            >
              Pricing
            </button>
            <button
              className="link-button"
              onClick={() => go("about")}
              type="button"
            >
              About
            </button>
            {renderAuthAction()}
            {canStartScan ? (
              <button className="nav-cta" onClick={() => go("scan")} type="button">
                Get Started
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}

function Footer({
  canStartScan = true,
  navigate
}: {
  canStartScan?: boolean;
  navigate: (route: Route) => void;
}) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Brand onClick={() => navigate("home")} />
        <p>Helping you identify, fund, and plan high-value sustainability retrofits.</p>
      </div>
      <nav aria-label="Site links" className="footer-links">
        <span className="footer-heading">Site</span>
        <button className="footer-link" onClick={() => scrollToHomeSectionFallback("home-overview")} type="button">
          Overview
        </button>
        <button className="footer-link" onClick={() => scrollToHomeSectionFallback(HOME_INSIGHTS_SECTION_ID)} type="button">
          Insights
        </button>
        <button className="footer-link" onClick={scrollToHomeHowItWorksFallback} type="button">
          How It Works
        </button>
        <button className="footer-link" onClick={() => scrollToHomeSectionFallback(HOME_DASHBOARD_SECTION_ID)} type="button">
          Dashboard
        </button>
        <button className="footer-link" onClick={() => navigate("pricing")} type="button">
          Pricing
        </button>
        {canStartScan ? <button className="footer-link" onClick={() => navigate("scan")} type="button">Get Started</button> : null}
      </nav>
      <nav aria-label="Company links" className="footer-links">
        <span className="footer-heading">Company</span>
        {aboutLinks.map((item) => (
          <button className="footer-link" key={item.route} onClick={() => navigate(item.route)} type="button">
            {item.label}
          </button>
        ))}
      </nav>
      <div className="footer-meta">
        <span className="footer-heading">Contact</span>
        <a href="mailto:hello@retrofi.org">hello@retrofi.org</a>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </footer>
  );
}

export function PublicShell({
  children,
  navigate,
  onHowItWorksClick,
  pageClassName,
  publicAuth,
  showFooter = false
}: {
  children: ReactNode;
  navigate: (route: Route) => void;
  onHowItWorksClick?: () => void;
  pageClassName?: string;
  publicAuth?: PublicAuthState;
  showFooter?: boolean;
}) {
  const canStartScan = true;

  return (
    <main className={["public-page", pageClassName].filter(Boolean).join(" ")}>
      <PublicNav
        canStartScan={canStartScan}
        isSignedIn={Boolean(publicAuth?.isSignedIn)}
        navigate={navigate}
        onHowItWorksClick={onHowItWorksClick}
        onSignOut={publicAuth?.onSignOut}
      />
      {children}
      {showFooter ? <Footer canStartScan={canStartScan} navigate={navigate} /> : null}
    </main>
  );
}
