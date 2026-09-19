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

const PAGE_URL = `${STORE_NAP.canonicalHost}${PATHS.nativeCigarettesLp}`;

const NATIVE_CIG_FAQS = [
  {
    q: "Does the Airport Rd counter list Native cigarettes?",
    a: "The cigarette shelf at 7060 Airport Rd includes Native cigarettes as a merchandise category when those items are listed. That is retail category language only. Confirm the current card on /items/cigarettes or ask staff before you travel for one brand.",
  },
  {
    q: "What does “Native cigarettes” mean on this page?",
    a: "It means the cigarette merchandise category already used on this site — retail shelf language only, not a medical claim, and not a second shop. The brand name of the store stays Green Air Cannabis.",
  },
  {
    q: "Where do I check the current cigarette shelf at 7060?",
    a: "Open /items/cigarettes for the listed cigarette category, then match the package at the Malton / Airport Rd counter. This neighbourhood page does not invent stock, carton counts, or prices. Call +1 (289) 514-9467 if one label is the only reason for the trip.",
  },
  {
    q: "Are $25 cartons guaranteed?",
    a: "No. Where $25 carton-style listings are shown on the cigarette category, confirm current price and listings through the menu or staff. This page does not lock a carton price.",
  },
  {
    q: "Can adults 19+ buy listed cigarettes after midnight on this corridor?",
    a: "Yes, when the homepage still lists Open 24 Hours. Bring government-issued photo ID. Overnight geometry sits on the 24-hour Malton dispensary page. This URL stays the Native cigarettes neighbourhood owner — not the open-now page.",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "Native Cigarettes on Airport Rd | Green Air Cannabis",
  },
  description:
    "Native cigarettes as a listed merchandise category at Green Air Cannabis, 7060 Airport Rd on the Malton / Pearson / Derry corridor. Adults 19+. Check the current cigarette shelf. No medical claims.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Native Cigarettes on Airport Rd",
    description:
      "Retail category notes for listed Native cigarettes at 7060 Airport Rd. Adults 19+. Current shelf at /items/cigarettes.",
    url: PAGE_URL,
  },
  robots: { index: true, follow: true },
};

export default function NativeCigarettesMaltonPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Native Cigarettes on Airport Rd",
    url: PAGE_URL,
    description:
      "Neighbourhood notes for listed Native cigarettes at Green Air Cannabis, 7060 Airport Rd on Airport Road through Malton.",
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
          __html: stringifyJsonLd(faqPageJsonLd(NATIVE_CIG_FAQS, PAGE_URL)),
        }}
      />
      <Navbar />

      <article className={styles.article}>
        <p className={styles.kicker}>
          Cigarette category · Malton / Airport Rd · Adults 19+
        </p>
        <h1 className={styles.h1}>Native Cigarettes on Airport Rd</h1>
        <p className={styles.lede}>
          Green Air Cannabis lists Native cigarettes as a merchandise
          category on the cigarette shelf at{" "}
          <strong>{STORE_NAP.addressLine}</strong>. This page owns that
          neighbourhood query for the Malton stretch of Airport Road. Retail
          category language only — no medical claims. Hours, phone{" "}
          {STORE_NAP.phoneDisplay}, and the map pin stay on the{" "}
          <Link href="/#contact">homepage visit hub</Link>.
        </p>

        <section className={styles.nap} aria-label="Store name, address, hours, and phone">
          <div>
            <h2>The shelf is at 7060 Airport Rd</h2>
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
          <h2>Retail category language only</h2>
          <p>
            On this site, “Native cigarettes” means the cigarette merchandise
            category — the same wording already used on the homepage and
            cigarette lane. The store brand stays Green Air Cannabis. This
            page does not add ownership stories or medical claims. Adults
            19+ with photo ID.
          </p>
          <p>
            Brand names, carton notes, and posted prices change. The
            cigarette category may show names such as Canadian Lights,
            Canadian Full, Putters, Canadian Goose, Canadian Menthol, and
            Canadian Classics where listed. This URL does not lock a carton
            price, a pack deal, or a guaranteed brand. Open the{" "}
            <Link href={PATHS.itemsCigarettes}>current cigarette category</Link>{" "}
            and match the package at the counter.
          </p>
        </section>

        <section>
          <h2>How to use this page on an Airport Rd stop</h2>
          <p>
            If the visit is about listed cigarettes, start here for the
            neighbourhood note, then finish on{" "}
            <Link href={PATHS.itemsCigarettes}>/items/cigarettes</Link>. If
            one exact label is the only reason to come out, call{" "}
            <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>{" "}
            first. Neighbourhood notes live here, not on a city-wide
            Mississauga page.
          </p>
          <p>
            Finding the door is still a how-to-reach job: use{" "}
            <Link href={PATHS.visit}>/visit</Link> for plaza parking, MiWay
            along Airport Road, Pearson, Derry, and Goreway. Overnight
            walk-ins use the{" "}
            <Link href={PATHS.twentyFour}>24-hour Malton dispensary</Link>{" "}
            page.
          </p>
        </section>

        <section>
          <h2>Same counter as flower, delivery, and nicotine vapes</h2>
          <p>
            Cigarettes are one lane at the same 7060 counter. Flower
            comparison stays on{" "}
            <Link href="/exotic-weed">Exotic</Link>,{" "}
            <Link href="/premium-weed">Premium</Link>,{" "}
            <Link href="/aaa-weed">AAA+</Link>,{" "}
            <Link href="/aa-weed">AA</Link>, and{" "}
            <Link href="/budget-weed">Budget</Link>. Neighbourhood{" "}
            <Link href={PATHS.deliveryLp}>
              cannabis delivery in Malton
            </Link>{" "}
            and{" "}
            <Link href={PATHS.nicotineVapeLp}>
              nicotine vapes on Airport Rd
            </Link>{" "}
            (current nicotine shelf at{" "}
            <Link href={PATHS.itemsVapes}>/items/vapes</Link>) have their own
            URLs. This page does not replace those lanes. The 24-hour /
            open-now page is equal, not a side note.
          </p>
        </section>

        <LocalSeoMesh currentPath={PATHS.nativeCigarettesLp} />

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
          <h2>Native cigarettes on this corridor — quick answers</h2>
          {NATIVE_CIG_FAQS.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>

        <p className={styles.ctaRow}>
          <Link href={PATHS.itemsCigarettes} className={styles.primary}>
            Current cigarette shelf
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
