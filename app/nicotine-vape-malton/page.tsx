import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LocalSeoMesh from "../components/LocalSeoMesh";
import { PATHS } from "../lib/organicPaths";
import {
  STORE_NAP,
  faqPageJsonLd,
  stringifyJsonLd,
} from "../lib/localSeo";
import styles from "../visit/visit.module.css";

const PAGE_URL = `${STORE_NAP.canonicalHost}${PATHS.nicotineVapeLp}`;

const NICOTINE_FAQS = [
  {
    q: "Where should I check nicotine vapes at Green Air Cannabis on Airport Rd?",
    a: "Use /items/vapes for the current nicotine vape category at 7060 Airport Rd. This neighbourhood page explains the Malton / Airport Rd shelf. It does not replace the live category listing.",
  },
  {
    q: "Does this neighbourhood page guarantee stock or prices?",
    a: "No. Names, formats, and posted prices change. This page does not invent puff counts, flavours, or a sale price. Compare the current /items/vapes cards, then ask staff or call +1 (289) 514-9467 before travelling for one device.",
  },
  {
    q: "Are nicotine vapes the same as the THC vape shelf?",
    a: "No. Nicotine vapes live under /items/vapes. THC and cannabis vape products sit under /items/vape-disposables. Keep those lanes separate. Adults 19+. Nicotine is addictive.",
  },
  {
    q: "Can I look at nicotine vapes if I walk in overnight?",
    a: "Yes, when the homepage lists Open 24 Hours. Bring photo ID. Overnight corridor notes sit on the 24-hour Malton dispensary page. This URL stays the nicotine vape neighbourhood owner.",
  },
  {
    q: "Is this a city-wide Mississauga vape directory?",
    a: "No. This page covers the Green Air counter on Airport Road through Malton. Square One and Brampton pins are the wrong hunt.",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "Nicotine Vapes on Airport Rd | Green Air Cannabis",
  },
  description:
    "Nicotine vapes at Green Air Cannabis, 7060 Airport Rd on the Malton / Pearson / Derry corridor. Adults 19+. Current shelf at /items/vapes. Nicotine is addictive. No stock or price promises.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Nicotine Vapes on Airport Rd",
    description:
      "Neighbourhood notes for the nicotine vape shelf at 7060 Airport Rd. Adults 19+. Check /items/vapes. Nicotine is addictive.",
    url: PAGE_URL,
  },
  robots: { index: true, follow: true },
};

export default function NicotineVapeMaltonPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Nicotine Vapes on Airport Rd",
    url: PAGE_URL,
    description:
      "Neighbourhood nicotine vape notes for Green Air Cannabis at 7060 Airport Rd on Airport Road through Malton.",
    isPartOf: { "@id": `${STORE_NAP.canonicalHost}/#store` },
    about: { "@id": `${STORE_NAP.canonicalHost}/#store` },
    primaryImageOfPage: STORE_NAP.schemaImage,
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(faqPageJsonLd(NICOTINE_FAQS, PAGE_URL)),
        }}
      />
      <Navbar />

      <article className={styles.article}>
        <p className={styles.kicker}>
          Nicotine vape · Malton / Airport Rd · Adults 19+ · Nicotine is
          addictive
        </p>
        <h1 className={styles.h1}>Nicotine Vapes on Airport Rd</h1>
        <p className={styles.lede}>
          Green Air Cannabis keeps a nicotine vape lane at{" "}
          <strong>{STORE_NAP.addressLine}</strong> on the Malton stretch of
          Airport Road. This page owns that neighbourhood query. The current
          category is <Link href={PATHS.itemsVapes}>/items/vapes</Link> —
          open that shelf for listed names, then confirm the device at the
          counter. Adults 19+. Nicotine is addictive. Hours, phone{" "}
          {STORE_NAP.phoneDisplay}, and the map pin stay on the{" "}
          <Link href="/#contact">homepage visit hub</Link>.
        </p>

        <section className={styles.nap} aria-label="Store name, address, hours, and phone">
          <div>
            <h2>Nicotine shelf at the 7060 walk-in</h2>
            <p>
              <strong>{STORE_NAP.brand}</strong>
              <br />
              {STORE_NAP.streetAddress}
              <br />
              {STORE_NAP.addressLocality}, {STORE_NAP.addressRegion}{" "}
              {STORE_NAP.postalCode}
              <br />
              Canada
            </p>
            <p>
              Phone:{" "}
              <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>
              <br />
              Hours: {STORE_NAP.hoursDaily}
              <br />
              Corridor: {STORE_NAP.neighborhood} / {STORE_NAP.corridor}
            </p>
          </div>
        </section>

        <section>
          <h2>Use /items/vapes — do not treat this page as a stock list</h2>
          <p>
            Formats, flavours, and posted prices move. This neighbourhood
            page does not invent puff counts, a featured six-pack, or a sale
            price. Compare the live cards on{" "}
            <Link href={PATHS.itemsVapes}>/items/vapes</Link>, then ask staff
            before you travel for one device. If a single listing is the only
            reason for the trip, call{" "}
            <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>.
          </p>
          <p>
            Keep nicotine and cannabis vape routes separate. THC vape
            products live under{" "}
            <Link href="/items/vape-disposables">/items/vape-disposables</Link>.
            Do not relabel one lane as the other.
          </p>
        </section>

        <section>
          <h2>Near-me nicotine vapes on this corridor only</h2>
          <p>
            If you searched nicotine vape near me around Malton, Airport
            Road, Pearson, Derry Road, or Goreway Drive, this is the 7060
            door — not a city-wide Mississauga vape directory. Square One and
            Brampton are the wrong hunt.
          </p>
          <p>
            Last-block parking and MiWay stay on{" "}
            <Link href={PATHS.visit}>how to reach 7060</Link>. Overnight and
            “open now” walk-ins use the equal{" "}
            <Link href={PATHS.twentyFour}>
              24-hour / open-now Airport Rd
            </Link>{" "}
            page. This URL does not steal that job.
          </p>
        </section>

        <section>
          <h2>Other neighbourhood lanes at the same counter</h2>
          <p>
            The generic{" "}
            <Link href={PATHS.weedDispensaryLp}>
              weed dispensary on Airport Rd
            </Link>{" "}
            owner stays on its own URL. Flower tiers stay on{" "}
            <Link href="/exotic-weed">Exotic</Link>,{" "}
            <Link href="/premium-weed">Premium</Link>,{" "}
            <Link href="/aaa-weed">AAA+</Link>,{" "}
            <Link href="/aa-weed">AA</Link>, and{" "}
            <Link href="/budget-weed">Budget</Link>. Neighbourhood{" "}
            <Link href={PATHS.deliveryLp}>
              cannabis delivery in Malton
            </Link>{" "}
            and{" "}
            <Link href={PATHS.nativeCigarettesLp}>
              Native cigarettes on Airport Rd
            </Link>{" "}
            have their own pages. The cigarette shelf is{" "}
            <Link href={PATHS.itemsCigarettes}>/items/cigarettes</Link>. A
            five-card evidence set also lives on{" "}
            <Link href="/info/nicotine-vapes-mississauga">
              the Mississauga nicotine guide
            </Link>
            — that guide is not a complete stock list.
          </p>
        </section>

        <LocalSeoMesh currentPath={PATHS.nicotineVapeLp} />

        <div className={styles.mapWrap}>
          <iframe
            title="Map of Green Air Cannabis at 7060 Airport Rd, Malton"
            src={STORE_NAP.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className={styles.mapNote}>
          Map preview for the Airport Rd pin. The homepage remains the
          visit hub for name, address, phone, and hours.
        </p>

        <section className={styles.faq}>
          <h2>Nicotine vapes on Airport Rd — quick answers</h2>
          {NICOTINE_FAQS.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>

        <p className={styles.ctaRow}>
          <Link href={PATHS.itemsVapes} className={styles.primary}>
            Current nicotine vape shelf
          </Link>
          <Link href={PATHS.twentyFour} className={styles.secondary}>
            Open now / 24-hour
          </Link>
          <Link href="/#contact" className={styles.secondary}>
            Homepage map &amp; hours
          </Link>
        </p>
      </article>

      <Footer />
    </main>
  );
}
