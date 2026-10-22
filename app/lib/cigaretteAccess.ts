import { cache } from "react";
import { cigaretteAccessFrom, CIG_WORDING_FALLBACK, type CigaretteAccess, type CigaretteWording } from "./cigDecision";
import { getCigaretteSnapshot } from "./cigaretteFeed";
import { getFleetContent } from "./fleetContent";
import { SHOW_CIGARETTES } from "./showCigarettes";

export type { CigaretteAccess };
export { cigaretteAccessFrom };

export const getCigaretteAccess = cache(async (): Promise<CigaretteAccess> => {
  const fleet = await getFleetContent();
  if (!fleet.active) return SHOW_CIGARETTES ? "show" : "redirect";
  const snap = await getCigaretteSnapshot();
  return cigaretteAccessFrom({ fleetActive: true, decision: snap.web });
});

export type PublicCigaretteFlags = {
  web: boolean;
  tv: boolean;
  wording: CigaretteWording;
};

/** Web follows the access gate. TV follows tvOn once a bundle is active, otherwise the coded switch. */
export const getPublicCigaretteFlags = cache(async (): Promise<PublicCigaretteFlags> => {
  const fleet = await getFleetContent();
  if (!fleet.active) {
    return { web: SHOW_CIGARETTES, tv: SHOW_CIGARETTES, wording: CIG_WORDING_FALLBACK };
  }
  const snap = await getCigaretteSnapshot();
  const access = cigaretteAccessFrom({ fleetActive: true, decision: snap.web });
  const tvCoded = snap.tv.reason === "error" || snap.tv.reason === "missing" || snap.tv.reason === "env";
  return {
    web: access === "show",
    tv: tvCoded ? SHOW_CIGARETTES : snap.tv.show,
    wording: snap.wording,
  };
});
