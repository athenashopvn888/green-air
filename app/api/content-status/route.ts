import { NextResponse } from "next/server";
import { getCigaretteSnapshot, toPublicCigaretteState } from "../../lib/cigaretteFeed";
import { getFleetContent } from "../../lib/fleetContent";
import { FLEET_STORE_CODE } from "../../lib/fleet/types";
import { SHOW_CIGARETTES } from "../../lib/showCigarettes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnostic only. Version, manifest ok/err, and mode. No secrets and no env values. */
export async function GET() {
  const [fleet, cig] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  const cigarettes = toPublicCigaretteState(cig);
  return NextResponse.json({
    storeCode: FLEET_STORE_CODE,
    version: fleet.version,
    contentVersion: fleet.contentVersion,
    manifest: fleet.manifest,
    mode: fleet.mode,
    cig: { web: SHOW_CIGARETTES ? cigarettes.web : false, tv: cigarettes.tv, guides: cig.guides.show },
  }, { headers: { "Cache-Control": "no-store" } });
}
