import HomePageClient from "./HomePageClient";
import { bannerMatchesCoded, bannersMatchCoded } from "./lib/fleet/resolve";
import { getFleetContent } from "./lib/fleetContent";
import { getLiveMenu } from "./lib/liveMenu";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [{ flowers }, fleet] = await Promise.all([getLiveMenu(), getFleetContent()]);
  const coreBanners = fleet.banners.filter((banner) => banner.id !== "welcome");
  const welcome = fleet.banners.find((banner) => banner.id === "welcome");
  const sheetBanners = fleet.active && coreBanners.length > 0 && !bannersMatchCoded(coreBanners) ? coreBanners : undefined;
  const welcomeBanner = fleet.active && welcome && !bannerMatchesCoded(welcome) ? welcome : undefined;
  return <HomePageClient initialFlowers={flowers} sheetBanners={sheetBanners} welcomeBanner={welcomeBanner} />;
}
