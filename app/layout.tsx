import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import { cannabisStoreJsonLd, renderedDocumentTitle, STORE_NAP } from "./lib/localSeo";

export const metadata: Metadata = {
  metadataBase: new URL(STORE_NAP.canonicalHost),
  title: {
    default: renderedDocumentTitle("Malton Airport Rd Dispensary"),
    // Child titles that already include the brand must use resolveDocumentTitle()
    // so this template does not append "Green Air Cannabis" a second time.
    template: "%s | Green Air Cannabis",
  },
  description:
    "24-hour walk-in cannabis dispensary at 7060 Airport Rd in Malton, Mississauga. Adults 19+ shop flower, pre-rolls, vapes, edibles, and concentrates on the Pearson / Derry corridor. Call +1 (289) 514-9467.",
  keywords: [
    "Malton dispensary",
    "Airport Road cannabis",
    "weed store Malton",
    "cannabis dispensary Mississauga",
    "weed near Pearson",
    "Derry and Airport Road",
    "Green Air Cannabis",
    "24 hour dispensary Malton",
    "7060 Airport Rd",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: STORE_NAP.website,
    siteName: STORE_NAP.brand,
    title: "Green Air Cannabis — Malton / Airport Rd Walk-In",
    description:
      "24-hour cannabis counter at 7060 Airport Rd, Malton. Pearson-corridor walk-in for adults 19+.",
    images: [
      {
        url: STORE_NAP.schemaImage,
        width: 1200,
        height: 630,
        alt: "Green Air Cannabis on Airport Road in Malton, Mississauga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Air Cannabis — Malton Airport Rd Dispensary",
    description: "24-hour walk-in at 7060 Airport Rd, Malton / Mississauga. Call +1 (289) 514-9467.",
    images: [STORE_NAP.schemaImage],
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
    canonical: STORE_NAP.canonicalHost,
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

const jsonLd = cannabisStoreJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Malton, Mississauga" />
        <meta name="geo.position" content="43.704554;-79.6443735" />
        <meta name="ICBM" content="43.704554, -79.6443735" />
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8K2Y4H8ZR6"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8K2Y4H8ZR6');
            `
          }}
        />
      </head>
      <body>
        <Link className="deliveryAnnouncement" href="/delivery">
          NEW DELIVERY MENU IS HERE — CLICK TO EXPLORE
        </Link>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
