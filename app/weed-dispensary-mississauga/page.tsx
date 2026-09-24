import { Metadata } from "next";
import { GBPLandingPage } from "@/app/components/GBPLandingPage";
import { gbpLocation } from "@/app/lib/gbp-location";
import { resolveDocumentTitle, STORE_NAP } from "@/app/lib/localSeo";
import { PATHS } from "@/app/lib/organicPaths";

export const metadata: Metadata = {
  title: resolveDocumentTitle(gbpLocation.seoTitle),
  description: gbpLocation.metaDescription,
  alternates: {
    canonical: `${STORE_NAP.canonicalHost}${PATHS.weedDispensaryLp}`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <GBPLandingPage />;
}
