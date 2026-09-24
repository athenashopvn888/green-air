import { Metadata } from "next";
import Link from "next/link";
import { GBPLandingPage } from "@/app/components/GBPLandingPage";
import { gbpLocation } from "@/app/lib/gbp-location";
import { resolveDocumentTitle, STORE_NAP } from "@/app/lib/localSeo";

export const metadata: Metadata = {
  title: resolveDocumentTitle(gbpLocation.seoTitle),
  description: gbpLocation.metaDescription,
  alternates: {
    canonical: `${STORE_NAP.canonicalHost}/weed-dispensary-mississauga`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Store-specific city-page enrichment (FLEET-CITY-UNIQUE-0925). Facts from STORE_NAP / gbpLocation only. */
function MaltonAirportVisitNotes() {
  return (
    <section
      aria-labelledby="gac-city-visit-notes"
      style={{ maxWidth: 980, margin: "0 auto", padding: "28px 24px 72px", lineHeight: 1.55 }}
    >
      <h2 id="gac-city-visit-notes">Malton walk-in on Airport Road</h2>
      <p>
        Green Air Cannabis is the walk-in counter at{" "}
        <strong>{STORE_NAP.addressLine}</strong> in the Malton / Airport Road
        retail strip of Mississauga — not a downtown Toronto shop. Adults 19+
        with government-issued photo ID. Phone{" "}
        <a href={`tel:${STORE_NAP.phoneIntl}`}>{STORE_NAP.phoneDisplay}</a>.
      </p>
      <h3>Hours</h3>
      <p>
        {STORE_NAP.hoursDaily}. Published hours match the live store listing;
        see the dedicated <Link href="/hours">/hours</Link> page for the weekly
        board.
      </p>
      <h3>Getting to 7060 Airport Rd</h3>
      <p>
        The plaza sits on Airport Road through Malton, with common approaches
        from Derry Road, Goreway Drive, and the Pearson Airport side of the
        corridor. {STORE_NAP.parkingNote} {STORE_NAP.transitNote}
      </p>
      <h3>Neighbourhoods this door serves</h3>
      <p>
        Walk-in traffic for Malton, Airport Road, Pearson-adjacent Mississauga,
        and nearby Derry / Goreway routes. For the neighbourhood owner page use{" "}
        <Link href="/weed-dispensary-malton">/weed-dispensary-malton</Link>. For
        street-level wayfinding use <Link href="/visit">/visit</Link>.
      </p>
      <p>
        <Link href="/weed-dispensary-malton">Malton / Airport Rd dispensary</Link>
        {" · "}
        <Link href="/visit">How to reach Airport Rd</Link>
        {" · "}
        <Link href="/hours">Store hours</Link>
        {" · "}
        <Link href="/">Homepage NAP and menu</Link>
      </p>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <GBPLandingPage />
      <MaltonAirportVisitNotes />
    </>
  );
}