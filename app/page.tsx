import type { Metadata, ResolvingMetadata } from "next";
import HomePageClient from "./HomePageClient";
import { bannerMatchesCoded, bannersMatchCoded } from "./lib/fleet/resolve";
import { getFleetContent } from "./lib/fleetContent";
import { HOME_PAGE_DOC_TITLE } from "./lib/homeDelivery";
import { getLiveMenu } from "./lib/liveMenu";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolved = await parent;
  return {
    title: { absolute: HOME_PAGE_DOC_TITLE },
    openGraph: {
      ...resolved.openGraph,
      title: { absolute: HOME_PAGE_DOC_TITLE },
    },
    twitter: {
      ...resolved.twitter,
      title: { absolute: HOME_PAGE_DOC_TITLE },
    },
  };
}

export default async function Page() {
  const [{ flowers }, fleet] = await Promise.all([getLiveMenu(), getFleetContent()]);
  const coreBanners = fleet.banners.filter((banner) => banner.id !== "welcome");
  const welcome = fleet.banners.find((banner) => banner.id === "welcome");
  const sheetBanners = fleet.active && coreBanners.length > 0 && !bannersMatchCoded(coreBanners) ? coreBanners : undefined;
  const welcomeBanner = fleet.active && welcome && !bannerMatchesCoded(welcome) ? welcome : undefined;
  return <HomePageClient initialFlowers={flowers} sheetBanners={sheetBanners} welcomeBanner={welcomeBanner} />;
}
