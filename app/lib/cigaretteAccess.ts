import { cache } from "react";
import { cigaretteAccessFrom, type CigaretteAccess, type CigaretteWording } from "./cigDecision";
import { getCigaretteSnapshot, toPublicCigaretteState } from "./cigaretteFeed";
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

/** Website flag is SHOW_CIGARETTES ? feed.web : false. TV follows the feed, including a saved tvOn. */
export const getPublicCigaretteFlags = cache(async (): Promise<PublicCigaretteFlags> => {
  const snap = await getCigaretteSnapshot();
  const state = toPublicCigaretteState(snap);
  return {
    web: SHOW_CIGARETTES ? state.web : false,
    tv: state.tv,
    wording: state.wording,
  };
});
