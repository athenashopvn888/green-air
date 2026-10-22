import Footer from "./Footer";
import Navbar from "./Navbar";
import CigaretteUnavailable from "./CigaretteUnavailable";

/** Same-URL 200 shell used when webOn is explicitly off. */
export default function CigaretteUnavailablePage() {
  return (
    <main>
      <Navbar />
      <CigaretteUnavailable />
      <Footer />
    </main>
  );
}
