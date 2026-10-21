import { redirect } from "next/navigation";
import { SHOW_CIGARETTES, VAPE_PAGE } from "./showCigarettes";

/** Temporary recallable redirect used when cigarette and Grabba URLs are hidden. */
export function redirectToVape(): never {
  redirect(VAPE_PAGE);
}

export function redirectCigarettesIfHidden(): void {
  if (!SHOW_CIGARETTES) redirectToVape();
}
