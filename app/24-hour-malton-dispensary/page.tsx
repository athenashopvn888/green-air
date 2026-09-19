import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LocalSeoMesh from "../components/LocalSeoMesh";
import { PATHS, TWENTY_FOUR_HOUR_HREF } from "../lib/organicPaths";
import {
  STORE_NAP,
  faqPageJsonLd,
  stringifyJsonLd,
} from "../lib/localSeo";
import styles from "../visit/visit.module.css";

const PAGE_URL = `${STORE_NAP.canonicalHost}${TWENTY_FOUR_HOUR_HREF}`;

const TWENTY_FOUR_FAQS = [
  {
    q: "Is Green Air Cannabis open now near me on Airport Rd?",
    a: "Yes, if you mean the Malton stretch of Airport Road near Pearson and Derry Road. The walk-in at 7060 Airport Rd is open 24 hours daily, matching the homepage hours card. Adults 19+ with photo ID. This is the open-now / 24h-near-me page for this corridor only.",
  },
  {
    q: "Is Green Air Cannabis a 24-hour dispensary in Malton?",
    a: "Yes. 7060 Airport Rd, Mississauga, ON L4T 2G8 is open 24 hours, seven days a week. That is the same listing as the homepage hub. This page is not a city-wide Mississauga 24-hour directory.",
  },
  {
    q: "Can adults 19+ walk in after midnight at 7060 Airport Rd?",
    a: "Yes, with government-issued photo ID. No appointment is required at 3 a.m. or 3 p.m. Staff still check ID at the door. If one product is the only reason for the trip, call +1 (289) 514-9467 first; posted names change.",
  },
  {
    q: "Is this a Mississauga-wide 24-hour dispensary list?",
    a: "No. This page covers one storefront: Green Air Cannabis on Airport Road through Malton. Square One, downtown Mississauga, and Brampton pins are the wrong hunt.",
  },
  {
    q: "How do I reach the 24-hour door from Pearson or Derry Road?",
    a: "Stay on Airport Road and match civic number 7060. Use a car, taxi, or rideshare along Airport Road rather than a Square One pin. The /visit page has plaza parking and MiWay notes; night surface service can change, so do not treat a bus number as a guarantee.",
  },
  {
    q: "If I searched “24 hour dispensary near me,” is this the Malton door?",
    a: "Only if you mean Airport Road through Malton on the Pearson / Derry corridor. Match 7060 Airport Rd, then use the homepage map if neighbouring retail hides the plaza. Delivery, Native cigarettes, and nicotine vapes have equal neighbourhood pages — they do not replace this open-now URL.",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "24-Hour Dispensary Open Now on Airport Rd | Green Air Cannabis",
  },
  description:
    "Open now: Green Air Cannabis at 7060 Airport Rd is open 24 hours on the Malton / Pearson / Derry corridor. Adults 19+. Equal corridor page with delivery, Native cigarettes, and nicotine vapes. Homepage keeps the map hub.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "24-Hour Dispensary Open Now on Airport Rd",
    description:
      "Open now / 24h near me at 7060 Airport Rd, Malton. Adults 19+. Open 24 Hours.",
    url: PAGE_URL,
  },
  robots: { index: true, follow: true },
};

export default function TwentyFourHourMaltonPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "24-Hour Dispensary Open Now on Airport Rd",
    url: PAGE_URL,
    description:
      "Open now / 24-hour near-me notes for Green Air Cannabis at 7060 Airport Rd on Airport Road through Malton.",
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
          __html: stringifyJsonLd(faqPageJsonLd(TWENTY_FOUR_FAQS, PAGE_URL)),
        }}
      />
      <Navbar />

      <article className={styles.article}>
        <p className={styles.kicker}>
          Open now / 24h near me · Malton / Airport Rd only · Adults 19+
        </p>
        <h1 className={styles.h1}>
          24-Hour Dispensary Open Now on Airport Rd
        </h1>
        <p className={styles.lede}>
          Green Air Cannabis lists <strong>{STORE_NAP.hoursDaily}</strong> at{" "}
          <strong>{STORE_NAP.addressLine}</strong>. This is a first-class
          corridor page — equal to neighbourhood delivery, Native cigarettes,
          and nicotine vapes — and it owns “open now” / 24-hour-near-me
          intent for Malton / Airport Road. It is not a city-wide
          Mississauga 24-hour list. Hours, phone {STORE_NAP.phoneDisplay}, and
          the map pin stay on the{" "}
          <Link href="/#contact">homepage visit hub</Link>. Use{" "}
          <Link href="/visit">how to reach 7060</Link> for plaza parking,
          MiWay, and Pearson-side approach.
        </p>

        <section className={styles.nap} aria-label="Store name, address, hours, and phone">
          <div>
            <h2>Open-now NAP on Airport Road</h2>
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
          <h2>Open now / 24h near me on this block</h2>
          <p>
            If you searched “dispensary open now,” “24 hour weed near me,” or
            “24-hour dispensary near me” around Malton, Airport Road, Pearson,
            Derry Road, or Goreway Drive, this is the 7060 door — not a
            city-wide Mississauga open-now directory. Stay on Airport Road
            and match the civic number. The homepage hours card is the live
            listing; this URL is the open-now / 24h-near-me owner for this
            corridor, on equal footing with the other neighbourhood pages.
          </p>
          <p>
            Adults 19+ can walk in without an appointment at any hour we
            list as open. Staff still check photo ID after midnight. If you
            are not on this stretch, do not treat a generic near-me result as
            this storefront.
          </p>
        </section>

        <section>
          <h2>What “open 24 hours” means at 7060</h2>
          <p>
            The listed hours are the same night and day: open 24 hours, seven
            days a week. Adults 19+ can walk in without an appointment. Bring
            government-issued photo ID even after midnight. This is still a
            retail counter — not a medical office, and not a second shop
            somewhere else in Mississauga.
          </p>
          <p>
            If you searched “dispensary open now” or “24 hour weed near
            Airport Rd,” confirm civic number <strong>7060</strong> on
            Airport Road before you leave. Derry Road is the east-west
            handle; Goreway Drive shoppers usually cut across to the same
            plaza strip. Pearson cargo and airport-hotel traffic already use
            this arterial.
          </p>
        </section>

        <section>
          <h2>After midnight on this corridor</h2>
          <p>
            Night visits use the same geometry as daytime: Airport Road is
            the frontage. From Pearson, stay on Airport Road rather than
            dropping into the 427/401 maze. From Derry Road, turn onto
            Airport Road and watch for 7060 on the plaza row. Do not follow a
            Square One or Brampton pin.
          </p>
          <p>
            Plaza parking at 7060 is usually simpler overnight than at midday
            shift change. Evening street parking along this stretch of
            Airport Road is also commonly used — read the signs on the stall
            you actually use. If you are being dropped off, use the plaza
            curb in front of 7060.
          </p>
          <p>
            MiWay along Airport Road is the usual daytime transit story on{" "}
            <Link href="/visit">/visit</Link>. Overnight surface service can
            change; if the last bus has stopped, stay on Airport Road by car,
            taxi, or rideshare and match 7060. Do not treat a bus number on
            this page as a night-service guarantee.
          </p>
        </section>

        <section>
          <h2>What to browse when the door is open</h2>
          <p>
            The overnight counter is the same menu lanes as daytime: flower
            tiers, pre-rolls, edibles, vapes, concentrates, accessories, and
            listed cigarettes. Names and posted prices move; call{" "}
            <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a> if
            one item is the only reason to come out. No medical claims —
            adult retail only.
          </p>
          <p>
            Flower comparison still starts on one tier page —{" "}
            <Link href="/exotic-weed">Exotic</Link>,{" "}
            <Link href="/premium-weed">Premium</Link>,{" "}
            <Link href="/aaa-weed">AAA+</Link>,{" "}
            <Link href="/aa-weed">AA</Link>, or{" "}
            <Link href="/budget-weed">Budget</Link> — then the live card in
            store. Neighbourhood notes for{" "}
            <Link href={PATHS.deliveryLp}>
              cannabis delivery in Malton / Airport Rd
            </Link>
            ,{" "}
            <Link href={PATHS.nativeCigarettesLp}>
              Native cigarettes on Airport Rd
            </Link>
            , and{" "}
            <Link href={PATHS.nicotineVapeLp}>
              nicotine vapes on Airport Rd
            </Link>{" "}
            have their own equal URLs. This page does not steal those jobs.
          </p>
        </section>

        <LocalSeoMesh currentPath={PATHS.twentyFour} />

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
          <h2>24-hour Malton / Airport Rd — quick answers</h2>
          {TWENTY_FOUR_FAQS.map((faq) => (
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
          <Link href={PATHS.deliveryLp} className={styles.secondary}>
            Malton delivery
          </Link>
        </p>
      </article>

      <Footer />
    </main>
  );
}
