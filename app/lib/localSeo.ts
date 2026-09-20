export const STORE_NAP = {
  brand: "Green Air Cannabis",
  streetAddress: "7060 Airport Rd",
  addressLocality: "Mississauga",
  addressRegion: "ON",
  postalCode: "L4T 2G8",
  addressCountry: "CA",
  addressLine: "7060 Airport Rd, Mississauga, ON L4T 2G8",
  phoneDisplay: "+1 (289) 514-9467",
  phoneIntl: "+12895149467",
  phoneFmd: "+1 289 514 9467",
  website: "https://www.greenaircannabis.com/",
  canonicalHost: "https://www.greenaircannabis.com",
  hoursLabel: "Open 24 Hours",
  hoursDaily: "Open 24 Hours daily",
  neighborhood: "Malton",
  corridor: "Airport Rd",
  latitude: 43.704554,
  longitude: -79.6443735,
  schemaImage: "https://www.greenaircannabis.com/banners/welcome_banner.webp",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=7060+Airport+Rd,+Mississauga,+ON+L4T+2G8&z=16&output=embed",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=7060+Airport+Rd%2C+Mississauga%2C+ON+L4T+2G8",
  parkingNote:
    "Free customer parking is in the retail plaza lot at 7060 Airport Rd. Evening street parking along this stretch of Airport Road is also commonly used.",
  transitNote:
    "MiWay buses run along Airport Road through Malton, with connections toward Derry Road, Goreway Drive, and Pearson Airport. Confirm the current route board before you leave.",
} as const;

export const HOMEPAGE_FAQS = [
  {
    q: "Where is Green Air Cannabis in Malton?",
    a: "Green Air Cannabis is a walk-in dispensary at 7060 Airport Rd, Mississauga, ON L4T 2G8, on the Airport Road corridor through Malton. Call +1 (289) 514-9467 if you need a landmark check before you roll up.",
  },
  {
    q: "Is Green Air Cannabis open 24 hours?",
    a: "Yes. The Airport Rd counter at 7060 Airport Rd is open 24 hours daily. Adults 19+ can walk in any time — no appointment. Open-now / 24h-near-me notes live on the 24-hour Malton dispensary page.",
  },
  {
    q: "Is there parking at 7060 Airport Rd?",
    a: "Yes. Use the retail plaza lot at 7060 Airport Rd. Evening street parking on this stretch of Airport Road is also commonly used.",
  },
  {
    q: "How do I reach Green Air Cannabis from Pearson or Derry Road?",
    a: "Stay on Airport Road through Malton. The store sits at 7060 Airport Rd, south of the Derry & Airport area and on the Pearson employment corridor. MiWay buses serve Airport Road; the homepage and /visit page have the full NAP and a map.",
  },
  {
    q: "Do I need ID to shop at Green Air Cannabis?",
    a: "Yes. This is an adults 19+ cannabis store. Bring valid government-issued photo ID for every visit.",
  },
  {
    q: "What is the phone number for Green Air Cannabis?",
    a: "Call +1 (289) 514-9467. That is the store line for 7060 Airport Rd in Malton / Mississauga.",
  },
  {
    q: "Does Green Air Cannabis deliver in Malton / Airport Rd?",
    a: "Delivery is dispatcher-confirmed for Malton, Airport Road, and nearby Mississauga addresses. Browse the delivery catalog, then confirm eligibility before an order is accepted. Neighbourhood delivery notes live on the cannabis delivery Malton page.",
  },
  {
    q: "Where is the Malton / Airport Rd weed dispensary?",
    a: "Green Air Cannabis is the walk-in weed dispensary at 7060 Airport Rd on Airport Road through Malton. Neighbourhood notes live on the weed dispensary Malton page. Hours and the map stay on this homepage. Adults 19+.",
  },
  {
    q: "Where do Native cigarettes and nicotine vapes sit on this site?",
    a: "Equal corridor pages own those queries: Native cigarettes in Malton and nicotine vapes in Malton. Current shelves stay on /items/cigarettes and /items/vapes. Adults 19+. Nicotine is addictive. This is not a medical shop.",
  },
] as const;

export function cannabisStoreJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CannabisStore",
        "@id": `${STORE_NAP.canonicalHost}/#store`,
        name: STORE_NAP.brand,
        description:
          "24-hour cannabis dispensary on Airport Road in Malton, Mississauga. Walk-in flower, pre-rolls, vapes, edibles, concentrates, and accessories at 7060 Airport Rd, near Pearson and Derry Road.",
        url: STORE_NAP.website,
        telephone: STORE_NAP.phoneIntl,
        image: STORE_NAP.schemaImage,
        priceRange: "$3 - $12/g",
        address: {
          "@type": "PostalAddress",
          streetAddress: STORE_NAP.streetAddress,
          addressLocality: STORE_NAP.addressLocality,
          addressRegion: STORE_NAP.addressRegion,
          postalCode: STORE_NAP.postalCode,
          addressCountry: STORE_NAP.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: STORE_NAP.latitude,
          longitude: STORE_NAP.longitude,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
        hasMap: STORE_NAP.mapUrl,
        areaServed: [
          { "@type": "Place", name: "Malton" },
          { "@type": "Place", name: "Airport Road" },
          { "@type": "City", name: "Mississauga" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${STORE_NAP.canonicalHost}/#website`,
        url: STORE_NAP.website,
        name: STORE_NAP.brand,
        publisher: { "@id": `${STORE_NAP.canonicalHost}/#store` },
      },
    ],
  };
}

export function faqPageJsonLd(
  faqs: readonly { q: string; a: string }[],
  pageUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function stringifyJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
