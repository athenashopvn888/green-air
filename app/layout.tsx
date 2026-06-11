import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://greenaircannabis.com"),
  title: {
    default: "Green Air Cannabis — Premium Cannabis Dispensary, Mississauga",
    template: "%s | Green Air Cannabis",
  },
  description:
    "Shop 200+ premium cannabis strains at Green Air Cannabis. Exotic, Premium, AAA+, AA & Budget flower from $3/g. Mississauga's uplifting dispensary at 7060 Airport Rd. Open Daily: 10:00 AM - 02:00 AM.",
  keywords: [
    "cannabis dispensary Mississauga",
    "weed store Mississauga",
    "exotic flower Mississauga",
    "premium cannabis",
    "Green Air Cannabis",
    "cheap weed Mississauga",
    "dispensary near me",
    "THC flower",
    "indica sativa hybrid",
    "edibles Mississauga",
    "vapes",
    "pre-rolls",
    "native cigarettes Mississauga",
    "weed store Mississauga",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://greenaircannabis.com",
    siteName: "Green Air Cannabis",
    title: "Green Air Cannabis — Premium Mississauga Cannabis Dispensary",
    description:
      "200+ strains from $3/g. Exotic to Budget. Mississauga's uplifting dispensary at 7060 Airport Rd. Open Daily: 10:00 AM - 02:00 AM.",
    images: [
      {
        url: "https://greenaircannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "Green Air Cannabis — Premium Cannabis Dispensary Mississauga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Air Cannabis — Mississauga's Uplifting Dispensary",
    description: "200+ strains from $3/g. Open Daily: 10:00 AM - 02:00 AM at 7060 Airport Rd, Mississauga.",
    images: ["https://greenaircannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://greenaircannabis.com",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://greenaircannabis.com",
  name: "Green Air Cannabis",
  description: "Cannabis dispensary at 7060 Airport Rd in Mississauga, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open Daily: 10:00 AM - 02:00 AM.",
  url: "https://greenaircannabis.com",
  telephone: "+14377071207",
  image: "https://greenaircannabis.com/wp-content/uploads/2026/04/7Clmh.jpg",
  priceRange: "$3 - $12/g",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7060 Airport Rd",
    addressLocality: "Mississauga",
    addressRegion: "ON",
    postalCode: "L4T 2G8",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6532,
    longitude: -79.3832,
  },
  openingHoursSpecification: [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "10:00",
    "closes": "02:00"
  }
],
  sameAs: [
    "https://greenaircannabis.com/",
    "https://greenaircannabis.com/",
  ],
  hasMap: "https://greenaircannabis.com/",
  areaServed: {
    "@type": "City",
    name: "Mississauga",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "15",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Mississauga" />
        <meta name="geo.position" content="43.6532;-79.3832" />
        <meta name="ICBM" content="43.6532, -79.3832" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
