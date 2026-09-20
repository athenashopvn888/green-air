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

const PAGE_URL = `${STORE_NAP.canonicalHost}${PATHS.weedDispensaryLp}`;

const WEED_DISPENSARY_FAQS = [
  {
    q: "Is Green Air Cannabis the weed dispensary on Airport Rd in Malton?",
    a: "Yes. The walk-in is at 7060 Airport Rd, Mississauga, ON L4T 2G8 — Airport Road through Malton on the Pearson / Derry corridor. This page owns that neighbourhood weed-dispensary query. Hours, phone, and the map stay on the homepage.",
  },
  {
    q: "Is this a Mississauga-wide weed dispensary list?",
    a: "No. This URL covers one storefront on Airport Road through Malton. Square One, downtown Mississauga, and Brampton pins are the wrong hunt. City-wide Mississauga pages on this site are extra context, not this owner.",
  },
  {
    q: "How is this different from the 24-hour / open-now page?",
    a: "This page owns “weed dispensary” / “weed store near me” for the Malton / Airport Rd corridor. Overnight and open-now intent lives on /24-hour-malton-dispensary. Both are equal neighbourhood pages. Adults 19+ with photo ID.",
  },
  {
    q: "Can adults 19+ walk in without an appointment?",
    a: "Yes. Bring government-issued photo ID. The listed hours on the homepage are Open 24 Hours. If one product is the only reason for the trip, call +1 (289) 514-9467 first — posted names change.",
  },
  {
    q: "Where do flower, delivery, cigarettes, and nicotine vapes sit?",
    a: "Flower comparison starts on the Exotic, Premium, AAA+, AA, and Budget tier pages. Delivery, Native cigarettes, and nicotine vapes have their own equal corridor URLs. This page does not invent stock or steal those lanes.",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "Weed Dispensary on Airport Rd | Green Air Cannabis",
  },
  description:
    "Weed dispensary at Green Air Cannabis, 7060 Airport Rd on the Malton / Pearson / Derry corridor. Adults 19+. Equal neighbourhood owner — not a city-wide Mississauga list. Homepage keeps the map hub.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Weed Dispensary on Airport Rd",
    description:
      "Neighbourhood weed-dispensary notes for 7060 Airport Rd, Malton. Adults 19+. Not a city-wide Mississauga directory.",
    url: PAGE_URL,
  },
  robots: { index: true, follow: true },
};

export default function WeedDispensaryMaltonPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Weed Dispensary on Airport Rd",
    url: PAGE_URL,
    description:
      "Neighbourhood weed-dispensary notes for Green Air Cannabis at 7060 Airport Rd on Airport Road through Malton.",
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
          __html: stringifyJsonLd(faqPageJsonLd(WEED_DISPENSARY_FAQS, PAGE_URL)),
        }}
      />
      <Navbar />

      <article className={styles.article}>
        <p className={styles.kicker}>
          Weed dispensary · Malton / Airport Rd only · Adults 19+
        </p>
        <h1 className={styles.h1}>Weed Dispensary on Airport Rd</h1>
        <p className={styles.lede}>
          Green Air Cannabis is the walk-in weed dispensary at{" "}
          <strong>{STORE_NAP.addressLine}</strong>. This page owns that
          neighbourhood query for the Malton stretch of Airport Road — not a
          city-wide Mississauga dispensary list. Hours, phone{" "}
          {STORE_NAP.phoneDisplay}, and the map pin stay on the{" "}
          <Link href="/#contact">homepage visit hub</Link>. Use{" "}
          <Link href={PATHS.visit}>how to reach 7060</Link> for plaza parking,
          MiWay, and Pearson-side approach.
        </p>

        <section className={styles.nap} aria-label="Store name, address, hours, and phone">
          <div>
            <h2>Weed-dispensary NAP on Airport Road</h2>
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
          <h2>Neighbourhood weed-dispensary owner — not a city list</h2>
          <p>
            If you searched “weed dispensary near me,” “weed store Malton,” or
            “cannabis dispensary Airport Rd” around Pearson, Derry Road, or
            Goreway Drive, this is the 7060 door. Stay on Airport Road and
            match the civic number. It is not a Square One mall kiosk and not
            a Brampton or Toronto-wide directory.
          </p>
          <p>
            The homepage remains the live NAP hub. This URL is the
            neighbourhood owner for the generic dispensary query on this
            corridor, on equal footing with the other four pages. Adults 19+
            with government-issued photo ID.
          </p>
        </section>

        <section>
          <h2>What to browse at the 7060 counter</h2>
          <p>
            Flower comparison starts on one tier page —{" "}
            <Link href="/exotic-weed">Exotic</Link>,{" "}
            <Link href="/premium-weed">Premium</Link>,{" "}
            <Link href="/aaa-weed">AAA+</Link>,{" "}
            <Link href="/aa-weed">AA</Link>, or{" "}
            <Link href="/budget-weed">Budget</Link> — then the live card in
            store. Pre-rolls, edibles, THC vapes, concentrates, and
            accessories each have their own category. Names and posted prices
            move; call{" "}
            <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>{" "}
            if one item is the only reason to come out. No medical claims —
            adult retail only.
          </p>
          <p>
            This page does not invent stock, a sale price, or a second shop.
            Supporting neighbourhood notes also live on{" "}
            <Link href={PATHS.maltonNeighbourhood}>
              weed store near Malton / Airport
            </Link>
            {" "}under /info — that guide does not replace this owner.
          </p>
        </section>

        <section>
          <h2>Equal corridor pages, different jobs</h2>
          <p>
            Overnight and “open now” walk-ins use the{" "}
            <Link href={PATHS.twentyFour}>
              24-hour dispensary on Airport Rd
            </Link>
            . Dispatcher-confirmed drops sit on{" "}
            <Link href={PATHS.deliveryLp}>
              cannabis delivery in Malton / Airport Rd
            </Link>
            . Listed{" "}
            <Link href={PATHS.nativeCigarettesLp}>
              Native cigarettes on Airport Rd
            </Link>{" "}
            and{" "}
            <Link href={PATHS.nicotineVapeLp}>
              nicotine vapes on Airport Rd
            </Link>{" "}
            keep their own URLs. This page does not steal those jobs.
          </p>
        </section>

        <LocalSeoMesh currentPath={PATHS.weedDispensaryLp} />

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
          <h2>Weed dispensary on this corridor — quick answers</h2>
          {WEED_DISPENSARY_FAQS.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>

        <p className={styles.ctaRow}>
          <Link href="/#contact" className={styles.primary}>
            Homepage map &amp; hours
          </Link>
          <Link href={PATHS.visit} className={styles.secondary}>
            How to reach 7060
          </Link>
          <Link href={PATHS.twentyFour} className={styles.secondary}>
            Open now / 24-hour
          </Link>
        </p>
      </article>

      <Footer />
    </main>
  );
}
