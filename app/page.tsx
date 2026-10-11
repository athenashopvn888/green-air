import HomePageClient from "./HomePageClient";
import { getLiveMenu } from "./lib/liveMenu";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { flowers } = await getLiveMenu();
  return <HomePageClient initialFlowers={flowers} />;
}
