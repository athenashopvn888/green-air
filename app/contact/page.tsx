import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { STORE_NAP } from "../lib/localSeo";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us — Green Air Cannabis | 7060 Airport Rd, Malton",
  description:
    "Call or walk into Green Air Cannabis at 7060 Airport Rd, Malton, Mississauga, ON L4T 2G8. Open 24 hours daily. Phone +1 (289) 514-9467.",
  alternates: {
    canonical: "https://www.greenaircannabis.com/contact",
  },
  openGraph: {
    title: "Contact Green Air Cannabis — Malton / Airport Rd",
    description:
      "7060 Airport Rd, Malton. Open 24 hours daily. Call +1 (289) 514-9467.",
  },
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero} style={{ paddingTop: "92px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h1 className={styles.heroTitle}>Contact Green Air Cannabis on Airport Rd</h1>
          <img src="/banners/08_Contact_Us.webp" alt="Contact Us" style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-lg)" }} />
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {/* Location */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <h2 className={styles.infoTitle}>Location</h2>
              <p className={styles.infoText}>
                {STORE_NAP.streetAddress}
                <br />
                Malton · {STORE_NAP.addressLocality}, {STORE_NAP.addressRegion} {STORE_NAP.postalCode}
                <br />
                <span className={styles.infoMuted}>Airport Road / Pearson / Derry corridor</span>
              </p>
              <p className={styles.infoText}>
                <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>
              </p>
            </div>

            {/* Hours */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕒</div>
              <h2 className={styles.infoTitle}>Hours</h2>
              <div className={styles.hoursTable}>
                <div className={styles.hoursRow}><span>Monday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Tuesday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Wednesday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Thursday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Friday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Saturday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
                <div className={styles.hoursRow}><span>Sunday</span><span className={styles.hoursTime}>Open 24 Hours</span></div>
              </div>
              <div className={styles.openBadge}>
                <div className={styles.openDot} />
                Open 24 Hours
              </div>
            </div>

            {/* Walk-in */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🔥</div>
              <h2 className={styles.infoTitle}>Walk In</h2>
              <p className={styles.infoText}>
                No appointment needed.
                <br />
                Just walk in and our staff will
                <br />
                help you browse the menu categories.
              </p>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Flower tiers and cannabis categories
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Adult 19+ store information
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Knowledgeable budtenders
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Debit &amp; cash accepted
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapSection}>
            <iframe
              title="Map of Green Air Cannabis at 7060 Airport Rd, Malton"
              src={STORE_NAP.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ width: "100%", height: "360px", border: 0, display: "block" }}
            />
            <p className={styles.infoMuted} style={{ padding: "12px 8px 0" }}>
              Homepage remains the NAP hub. <Link href="/visit">How to reach the plaza</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}

