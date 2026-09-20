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

const PAGE_URL = `${STORE_NAP.canonicalHost}${PATHS.deliveryLp}`;

const DELIVERY_FAQS = [
  {
    q: "Does Green Air Cannabis deliver in Malton / Airport Rd?",
    a: "Delivery is offered for Malton, Airport Road, and nearby Mississauga addresses when the dispatcher confirms the drop. This page owns that neighbourhood query. The live catalog stays on /delivery. Eligibility is not a city-wide Mississauga promise.",
  },
  {
    q: "What is the delivery minimum?",
    a: "The delivery catalog lists a $60 product minimum. The dispatcher confirms the current minimum, availability, and whether your address is in range before an order is accepted.",
  },
  {
    q: "Are delivery hours the same as the 24-hour walk-in?",
    a: "No. The walk-in at 7060 Airport Rd is open 24 hours daily. Delivery is a separate dispatcher-confirmed service. This page does not invent a delivery window. Ask in LIVE ORDER chat before you assume an overnight drop.",
  },
  {
    q: "How do I place a delivery order?",
    a: "Browse the /delivery catalog, note product names and weights, then open LIVE ORDER Web Chat. New customers complete a private selfie-with-ID step. The dispatcher confirms availability and next steps.",
  },
  {
    q: "Is this Toronto or Brampton delivery?",
    a: "No. This neighbourhood page covers Malton / Airport Road and nearby Mississauga addresses the dispatcher accepts. It is not a Toronto delivery menu and not a Brampton zone map.",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "Cannabis Delivery in Malton / Airport Rd | Green Air Cannabis",
  },
  description:
    "Weed delivery from Green Air Cannabis for Malton, Airport Road, and nearby Mississauga addresses the dispatcher confirms. $60 product minimum. Catalog on /delivery. Adults 19+.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Cannabis Delivery in Malton / Airport Rd",
    description:
      "Dispatcher-confirmed delivery for Malton / Airport Rd. Browse /delivery, then confirm radius. Adults 19+.",
    url: PAGE_URL,
  },
  robots: { index: true, follow: true },
};

export default function CannabisDeliveryMaltonPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cannabis Delivery in Malton / Airport Rd",
    url: PAGE_URL,
    description:
      "Neighbourhood cannabis delivery notes for Green Air Cannabis on the Malton / Airport Rd corridor.",
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
          __html: stringifyJsonLd(faqPageJsonLd(DELIVERY_FAQS, PAGE_URL)),
        }}
      />
      <Navbar />

      <article className={styles.article}>
        <p className={styles.kicker}>
          Weed delivery · Malton / Airport Rd · Dispatcher-confirmed · Adults
          19+
        </p>
        <h1 className={styles.h1}>Cannabis Delivery in Malton / Airport Rd</h1>
        <p className={styles.lede}>
          Green Air Cannabis takes dispatcher-confirmed delivery orders for
          Malton, Airport Road, and nearby Mississauga addresses. This page
          owns that neighbourhood query. The live catalog stays on{" "}
          <Link href={PATHS.deliveryCatalog}>/delivery</Link>. Walk-in NAP —
          address, phone {STORE_NAP.phoneDisplay}, 24-hour hours, and the map
          — stays on the{" "}
          <Link href="/#contact">homepage visit hub</Link>. Adults 19+.
        </p>

        <section className={styles.nap} aria-label="Store name, address, hours, and phone">
          <div>
            <h2>Walk-in pin vs delivery drop</h2>
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
              Walk-in hours: {STORE_NAP.hoursDaily}
              <br />
              Delivery: dispatcher confirms address and timing
            </p>
          </div>
        </section>

        <section>
          <h2>What is already true on the delivery catalog</h2>
          <p>
            The catalog lists a <strong>$60 product minimum</strong>. Browse
            names and weights on{" "}
            <Link href={PATHS.deliveryCatalog}>/delivery</Link>, then open
            LIVE ORDER Web Chat. New customers complete a private
            selfie-with-ID step. The dispatcher confirms availability,
            whether your address is in range, and next steps before an order
            is accepted.
          </p>
          <p>
            This neighbourhood page does not invent a zone map, a fee table,
            or a delivery clock. If a listing on an old screenshot is the
            only reason you want a drop, ask in chat first — posted names
            move.
          </p>
        </section>

        <section>
          <h2>Malton / Airport Rd only — not a city-wide promise</h2>
          <p>
            If you searched weed delivery near Malton, Airport Road, Pearson,
            Derry Road, or Goreway Drive, this is the Green Air corridor
            page. Nearby Mississauga addresses can be accepted when the
            dispatcher says so. It is not a Toronto delivery menu and not a
            Brampton coverage claim.
          </p>
          <p>
            Prefer the counter? The walk-in at 7060 Airport Rd is open 24
            hours. Overnight and open-now intent lives on the equal{" "}
            <Link href={PATHS.twentyFour}>
              24-hour dispensary on Airport Rd
            </Link>{" "}
            page. Plaza parking and MiWay stay on{" "}
            <Link href={PATHS.visit}>/visit</Link>.
          </p>
        </section>

        <section>
          <h2>Same store as cigarettes, nicotine vapes, and flower</h2>
          <p>
            Delivery is one lane, not a second shop. The generic{" "}
            <Link href={PATHS.weedDispensaryLp}>
              weed dispensary on Airport Rd
            </Link>{" "}
            owner, neighbourhood{" "}
            <Link href={PATHS.nativeCigarettesLp}>
              Native cigarettes on Airport Rd
            </Link>{" "}
            and{" "}
            <Link href={PATHS.nicotineVapeLp}>
              nicotine vapes on Airport Rd
            </Link>{" "}
            have their own URLs. Flower comparison stays on{" "}
            <Link href="/exotic-weed">Exotic</Link>,{" "}
            <Link href="/premium-weed">Premium</Link>,{" "}
            <Link href="/aaa-weed">AAA+</Link>,{" "}
            <Link href="/aa-weed">AA</Link>, and{" "}
            <Link href="/budget-weed">Budget</Link>. No medical claims.
          </p>
        </section>

        <LocalSeoMesh currentPath={PATHS.deliveryLp} />

        <div className={styles.mapWrap}>
          <iframe
            title="Map of Green Air Cannabis at 7060 Airport Rd, Malton"
            src={STORE_NAP.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className={styles.mapNote}>
          Map preview for the walk-in pin. Delivery eligibility is still
          dispatcher-confirmed — this map is not a zone boundary.
        </p>

        <section className={styles.faq}>
          <h2>Malton / Airport Rd delivery — quick answers</h2>
          {DELIVERY_FAQS.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>

        <p className={styles.ctaRow}>
          <Link href={PATHS.deliveryCatalog} className={styles.primary}>
            Browse delivery catalog
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
