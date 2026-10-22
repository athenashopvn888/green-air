import HomePageClient from "./HomePageClient";
import { bannersMatchCoded } from "./lib/fleet/resolve";
import { getFleetContent } from "./lib/fleetContent";
import { getLiveMenu } from "./lib/liveMenu";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [{ flowers }, fleet] = await Promise.all([getLiveMenu(), getFleetContent()]);
  const sheetBanners = fleet.active && fleet.banners.length > 0 && !bannersMatchCoded(fleet.banners) ? fleet.banners : undefined;
  return <HomePageClient initialFlowers={flowers} sheetBanners={sheetBanners} />;
}
