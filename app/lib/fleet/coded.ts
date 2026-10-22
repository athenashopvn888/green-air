export { CODED_BANNERS, CODED_NAP, CODED_PAGES, FLEET_STORE_CODE } from "./config.ts";
import { CODED_BANNERS, FLEET_STORE_CODE } from "./config.ts";
import type { ResolvedBanner } from "./types.ts";

export function fleetVersion(contentVersion: number | null): string {
  return contentVersion == null ? `${FLEET_STORE_CODE}:coded` : `${FLEET_STORE_CODE}:${contentVersion}`;
}

export function codedBannerFor(id: ResolvedBanner["id"]): ResolvedBanner | undefined {
  return CODED_BANNERS.find((entry) => entry.id === id);
}

/**
 * Browser onError for a sheet image. Try this slot's coded image once.
 * A second failure, or no coded image, returns null so the caller paints the
 * category name. Never a different slot's graphic.
 */
export function nextBannerSrc(currentSrc: string, codedSrc: string | undefined): string | null {
  const coded = codedSrc?.trim() ?? "";
  if (!coded || currentSrc === coded) return null;
  return coded;
}
