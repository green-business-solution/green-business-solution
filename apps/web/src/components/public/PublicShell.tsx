import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { aboutLinks, aboutMenuLinks, type Route } from "../../routes";
import {
  HOME_DASHBOARD_SECTION_ID,
  HOME_INSIGHTS_SECTION_ID,
  scrollToHomeHowItWorksFallback,
  scrollToHomePricingFallback,
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
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const activeAboutTriggerRef = useRef<HTMLButtonElement | null>(null);
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
    isMenuOpenRef.current = isMenuOpen || isAboutMenuOpen;

    if ((isMenuOpen || isAboutMenuOpen) && !isNavVisibleRef.current) {
      isNavVisibleRef.current = true;
      setIsNavVisible(true);
    }
  }, [isAboutMenuOpen, isMenuOpen]);

  useEffect(() => {
    if (!isAboutMenuOpen || typeof document === "undefined") {
      return undefined;
    }

    const closeFromOutside = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-about-menu-root]")) {
        return;
      }
      setIsAboutMenuOpen(false);
    };

    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      setIsAboutMenuOpen(false);
      activeAboutTriggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, [isAboutMenuOpen]);

  function go(route: Route) {
    setIsAboutMenuOpen(false);
    setIsMenuOpen(false);
    navigate(route);
  }

  function signOutFromNav() {
    setIsAboutMenuOpen(false);
    setIsMenuOpen(false);
    onSignOut?.();
  }

  function openHowItWorks() {
    setIsAboutMenuOpen(false);
    setIsMenuOpen(false);
    if (onHowItWorksClick) {
      onHowItWorksClick();
      return;
    }
    scrollToHomeHowItWorksFallback();
  }

  function openPricing() {
    setIsAboutMenuOpen(false);
    setIsMenuOpen(false);
    scrollToHomePricingFallback();
  }

  function toggleMobileMenu() {
    setIsAboutMenuOpen(false);
    setIsMenuOpen((current) => !current);
  }

  function toggleAboutMenu(trigger: HTMLButtonElement) {
    activeAboutTriggerRef.current = trigger;
    setIsAboutMenuOpen((current) => !current);
  }

  function openAboutMenuFromKeyboard(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    menuId: string,
    edge: "first" | "last",
  ) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    event.preventDefault();
    activeAboutTriggerRef.current = event.currentTarget;
    setIsAboutMenuOpen(true);
    window.requestAnimationFrame(() => {
      const items = document.querySelectorAll<HTMLButtonElement>(
        `#${menuId} [role="menuitem"]`,
      );
      const item = edge === "first" ? items[0] : items[items.length - 1];
      item?.focus();
    });
  }

  function handleAboutMenuKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'),
    );
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);
    let nextIndex = currentIndex;

    if (event.key === "ArrowDown") {
      nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === "ArrowUp") {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsAboutMenuOpen(false);
      activeAboutTriggerRef.current?.focus();
      return;
    } else {
      return;
    }

    event.preventDefault();
    items[nextIndex]?.focus();
  }

  function renderAboutMenu(menuId: string, className: string) {
    if (!isAboutMenuOpen) {
      return null;
    }

    return (
      <div
        aria-label="About RetroFi"
        className={className}
        id={menuId}
        onKeyDown={handleAboutMenuKeyDown}
        role="menu"
      >
        {aboutMenuLinks.map((item) => (
          <button
            className="link-button about-menu-item"
            key={item.route}
            onClick={() => go(item.route)}
            role="menuitem"
            type="button"
          >
            <span>{item.label}</span>
            <span aria-hidden="true" className="about-menu-item-arrow">↗</span>
          </button>
        ))}
      </div>
    );
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
            onClick={openPricing}
            type="button"
          >
            Pricing
          </button>
          <div className="about-menu-root" data-about-menu-root>
            <button
              aria-controls="desktop-about-menu"
              aria-expanded={isAboutMenuOpen}
              aria-haspopup="menu"
              className="link-button about-menu-trigger"
              onClick={(event) => toggleAboutMenu(event.currentTarget)}
              onKeyDown={(event) =>
                openAboutMenuFromKeyboard(
                  event,
                  "desktop-about-menu",
                  event.key === "ArrowUp" ? "last" : "first",
                )
              }
              type="button"
            >
              About
              <span aria-hidden="true" className="about-menu-chevron" />
            </button>
            {renderAboutMenu("desktop-about-menu", "about-menu-popover")}
          </div>
          <button
            className="link-button"
            onClick={() => go("about-contact")}
            type="button"
          >
            Contact Us
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
          onClick={toggleMobileMenu}
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
              onClick={openPricing}
              type="button"
            >
              Pricing
            </button>
            <div className="about-menu-root about-menu-root-mobile" data-about-menu-root>
              <button
                aria-controls="mobile-about-menu"
                aria-expanded={isAboutMenuOpen}
                aria-haspopup="menu"
                className="link-button about-menu-trigger"
                onClick={(event) => toggleAboutMenu(event.currentTarget)}
                onKeyDown={(event) =>
                  openAboutMenuFromKeyboard(
                    event,
                    "mobile-about-menu",
                    event.key === "ArrowUp" ? "last" : "first",
                  )
                }
                type="button"
              >
                About
                <span aria-hidden="true" className="about-menu-chevron" />
              </button>
              {renderAboutMenu("mobile-about-menu", "about-mobile-submenu")}
            </div>
            <button
              className="link-button"
              onClick={() => go("about-contact")}
              type="button"
            >
              Contact Us
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
        <button className="footer-link" onClick={scrollToHomePricingFallback} type="button">
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
