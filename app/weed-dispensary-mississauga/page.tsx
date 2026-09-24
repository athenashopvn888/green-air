import { Metadata } from "next";
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

export default function Page() {
  return <GBPLandingPage />;
}
