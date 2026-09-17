import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  STORE_NAP,
  faqPageJsonLd,
} from "../lib/localSeo";
import styles from "./visit.module.css";

const VISIT_FAQS = [
  {
    q: "What is the exact address for Green Air Cannabis?",
    a: "7060 Airport Rd, Mississauga, ON L4T 2G8 — on Airport Road through Malton, on the Pearson / Derry corridor.",
  },
  {
    q: "Where should I park?",
    a: STORE_NAP.parkingNote,
  },
  {
    q: "Which buses serve the store?",
    a: STORE_NAP.transitNote,
  },
  {
    q: "Can I walk in after midnight?",
    a: "Yes. The Malton counter is open 24 hours daily. Adults 19+ with valid photo ID can walk in without an appointment.",
  },
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "Visit Green Air Cannabis | Malton Airport Rd Walk-In",
  },
  description:
    "How to reach Green Air Cannabis at 7060 Airport Rd in Malton, Mississauga: plaza parking, MiWay along Airport Road, Pearson / Derry orientation, 24-hour walk-in hours, and the store phone.",
  alternates: {
    canonical: `${STORE_NAP.canonicalHost}/visit`,
  },
  openGraph: {
    title: "Visit Green Air Cannabis on Airport Rd in Malton",
    description:
      "Supporting directions for 7060 Airport Rd. The homepage remains the NAP hub for hours, phone, and the map.",
    url: `${STORE_NAP.canonicalHost}/visit`,
  },
};

export default function VisitPage() {
  const jsonLd = faqPageJsonLd(VISIT_FAQS, `${STORE_NAP.canonicalHost}/visit`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <Navbar />
        <article className={styles.article}>
          <p className={styles.kicker}>Malton · Airport Road · Pearson corridor</p>
          <h1 className={styles.h1}>How to reach 7060 Airport Rd</h1>
          <p className={styles.lede}>
            Green Air Cannabis sits on Airport Road in Malton, the north-east
            Mississauga strip that feeds Pearson cargo, airport hotels, and the
            Derry Road industrial basin. This page is a supporting how-to-reach
            guide. Name, address, phone, hours, and the map stay on the{" "}
            <Link href="/">homepage</Link> — that remains the visit hub.
          </p>

          <section className={styles.nap} aria-label="Store name, address, and phone">
            <div>
              <h2>Store NAP</h2>
              <p>
                <strong>{STORE_NAP.brand}</strong>
                <br />
                {STORE_NAP.streetAddress}
                <br />
                {STORE_NAP.addressLocality}, {STORE_NAP.addressRegion}{" "}
                {STORE_NAP.postalCode}
              </p>
              <p>
                Phone:{" "}
                <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>
                <br />
                Hours: {STORE_NAP.hoursDaily}
                <br />
                Website: <a href={STORE_NAP.website}>{STORE_NAP.website}</a>
              </p>
            </div>
            <div className={styles.mapWrap}>
              <iframe
                title="Map of Green Air Cannabis at 7060 Airport Rd, Malton"
                src={STORE_NAP.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          <section>
            <h2>From Pearson and the airport employment belt</h2>
            <p>
              If you are coming off a shift at Pearson, from an Airport Road
              hotel, or from the cargo yards west of the runways, stay on Airport
              Road itself rather than dropping into the 427/401 maze. 7060
              Airport Rd is a plaza storefront on that same north-south spine
              through Malton — the road you already use to move between the
              terminal area, Derry Road, and Goreway Drive. Pull into the plaza
              lot; you do not need a reservation at the counter.
            </p>
          </section>

          <section>
            <h2>From Derry Road, Goreway, and the Malton grid</h2>
            <p>
              Derry Road is the east-west cross street most Malton drivers use.
              Turn onto Airport Road and watch for 7060 on the plaza row — not a
              downtown Mississauga mall, not Square One, and not a Brampton
              address. Goreway Drive shoppers usually cut across to Airport Road
              rather than hunting side streets. If a GPS pin looks like a
              residential crescent off Victory Crescent or Morning Star, you are
              off the commercial strip; get back onto Airport Road and look for
              the 7060 plaza.
            </p>
          </section>

          <section>
            <h2>Parking at the plaza</h2>
            <p>{STORE_NAP.parkingNote} Keep the stall short if you are only grabbing a listed menu item; the lot is shared with neighbouring retail bays.</p>
          </section>

          <section>
            <h2>MiWay and walking the strip</h2>
            <p>
              {STORE_NAP.transitNote} Airport Road is a wide suburban arterial,
              so treat the last block as a roadside walk, not a downtown sidewalk
              grid. If you are carrying bags from a flight, a short taxi or rideshare
              along Airport Road is usually simpler than transferring across the
              terminal bus loop.
            </p>
          </section>

          <section>
            <h2>Walk-in rules for a 24-hour Malton counter</h2>
            <p>
              Adults 19+ with valid government-issued photo ID can walk in any
              hour. Staff will not guess stock from an old screenshot — check the{" "}
              <Link href="/">current menu categories on the homepage</Link> or
              ask at the counter. Delivery, when the dispatcher accepts an order,
              is a separate Malton / Mississauga-radius service and is not a
              substitute for this walk-in address.
            </p>
            <p>
              <Link href="/info/weed-store-near-malton-airport">
                Neighbourhood notes for a weed store near Malton / Airport
              </Link>
              {" · "}
              <a href={STORE_NAP.mapUrl} rel="noopener noreferrer" target="_blank">
                Open in Google Maps
              </a>
            </p>
          </section>

          <section className={styles.faq}>
            <h2>Visit questions</h2>
            {VISIT_FAQS.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </section>
        </article>
        <Footer />
      </main>
    </>
  );
}
