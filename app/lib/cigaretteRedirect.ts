import { redirect } from "next/navigation";
import { getCigaretteAccess } from "./cigaretteAccess";
import { VAPE_PAGE } from "./showCigarettes";

/** Temporary recallable redirect used when cigarette and Grabba URLs are hidden. */
export function redirectToVape(): never {
  redirect(VAPE_PAGE);
}

/**
 * Coded content still redirects. An explicit webOn false does not:
 * the caller renders the unavailable block at the same URL.
 */
export async function openCigaretteSurface(isSurface: boolean): Promise<"open" | "unavailable"> {
  if (!isSurface) return "open";
  const access = await getCigaretteAccess();
  if (access === "redirect") redirectToVape();
  if (access === "unavailable") return "unavailable";
  return "open";
}

export async function redirectCigarettesIfHidden(): Promise<void> {
  await openCigaretteSurface(true);
}
