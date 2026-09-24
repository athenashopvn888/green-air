"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { storeClaimsOpen24Hours } from "../lib/localSeo";
import { PATHS } from "../lib/organicPaths";
import styles from "./Navbar.module.css";

const ALL_LINKS: { href: string; label: string; featured?: boolean }[] = [
  { href: "/exotic-weed", label: "Exotic Weed" },
  { href: "/premium-weed", label: "Premium Weed" },
  { href: "/aaa-weed", label: "AAA+ Weed" },
  { href: "/aa-weed", label: "AA Weed" },
  { href: "/budget-weed", label: "Budget Weed" },
  { href: "/items/edibles", label: "Edibles" },
  { href: "/items/prerolls", label: "Pre-Rolls" },
  { href: "/items/vapes", label: "Nicotine Vape" },
  { href: "/items/vape-disposables", label: "THC Vape" },
  { href: "/items/concentrates", label: "Concentrates" },
  { href: "/items/magic", label: "Magic Stuff" },
  { href: "/items/cigarettes", label: "Cigarettes" },
  { href: "/items/add-ons", label: "Accessories" },
  { href: "/delivery", label: "🚗 Delivery" },
  { href: "/24-hour-malton-dispensary", label: "Open Now / 24h" },
  { href: "/careers/budtender", label: "Join Team", featured: true },
  { href: "/visit", label: "Visit" },
  { href: "/hours", label: "Hours" },
  { href: "/faq", label: "FAQ" },
  { href: "/resources", label: "Resources" },
];

export default function Navbar({ hideThcVape = false }: { hideThcVape?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ALL_LINKS.filter((link) => {
    if (hideThcVape && link.href === "/items/vape-disposables") return false;
    if (link.href === PATHS.twentyFour && !storeClaimsOpen24Hours()) return false;
    return true;
  });
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const [canAdvance, setCanAdvance] = useState(false);
  const updateScrollState = useCallback(() => { const scrollBar = scrollBarRef.current; if (!scrollBar) return; setCanAdvance(scrollBar.scrollWidth - scrollBar.clientWidth - scrollBar.scrollLeft > 2); }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => { const scrollBar = scrollBarRef.current; if (!scrollBar) return; updateScrollState(); scrollBar.addEventListener("scroll", updateScrollState, { passive: true }); window.addEventListener("resize", updateScrollState); const resizeObserver = new ResizeObserver(updateScrollState); resizeObserver.observe(scrollBar); if (scrollBar.firstElementChild) resizeObserver.observe(scrollBar.firstElementChild); return () => { scrollBar.removeEventListener("scroll", updateScrollState); window.removeEventListener("resize", updateScrollState); resizeObserver.disconnect(); }; }, [pathname, updateScrollState]);
  const advanceScrollBar = () => { const scrollBar = scrollBarRef.current; if (!scrollBar) return; const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; scrollBar.scrollBy({ left: Math.max(180, scrollBar.clientWidth * 0.75), behavior: reduceMotion ? "auto" : "smooth" }); };

  return (
    <nav className={styles.navbar} id="main-nav">
      {/* Top bar — logo + open now */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo} aria-label="GREEN AIR CANNABIS" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <img src="/storeFavicon.webp" alt="Green Air Cannabis Logo" style={{ height: "30px", width: "30px", objectFit: "contain", borderRadius: "4px" }} />
          <span className={styles.brandName} style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "18px",
            letterSpacing: "0.04em",
            color: "white",
            textShadow: "0 0 12px rgba(255,255,255,0.2)"
          }}>
            GREEN AIR CANNABIS
          </span>
        </Link>
        <button
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-store-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className={styles.menuToggleIcon} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className={styles.topBarRight}>
          <span className={styles.open}>
            <span className={styles.dot}></span>
            Open Now
          </span>
        </div>
      </div>

      {/* Scrollable link bar */}
      <div className={styles.scrollShell}>
        <div ref={scrollBarRef} id="store-menu-scrollbar" className={styles.scrollBar}>
          <div className={styles.scrollInner}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.pill} ${link.featured ? styles.pillHiring : ""} ${isActive ? styles.pillActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          </div>
        </div>
        {canAdvance && <button type="button" className={styles.scrollAdvance} aria-label="Show more navigation links" aria-controls="store-menu-scrollbar" onClick={advanceScrollBar}><span aria-hidden="true">›</span></button>}
      </div>
      <div id="mobile-store-menu" className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`} hidden={!menuOpen}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={styles.mobileLink} aria-current={pathname === link.href ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
