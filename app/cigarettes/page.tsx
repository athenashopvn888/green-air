import { redirect } from "next/navigation";
import CigaretteUnavailablePage from "../components/CigaretteUnavailablePage";
import { getCigaretteAccess } from "../lib/cigaretteAccess";

export const dynamic = "force-dynamic";

/** /cigarettes stays put when webOn is off. Coded mode still redirects before this renders. */
export default async function CigarettesPage() {
  const access = await getCigaretteAccess();
  if (access === "redirect") redirect("/vape-shop-malton");
  if (access === "show") redirect("/items/cigarettes");
  return <CigaretteUnavailablePage />;
}
