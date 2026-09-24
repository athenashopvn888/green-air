import Link from "next/link";
import styles from "./Footer.module.css";
import { storeClaimsOpen24Hours } from "../lib/localSeo";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Column 1 — Store Description */}
          <div className={styles.col}>
            <div className={styles.brand}>
              GREEN AIR CANNABIS
            </div>
            <p className={styles.desc}>
              24-hour walk-in on Airport Road in Malton — 7060 Airport Rd,
              Mississauga, ON L4T 2G8. Flower, edibles, vapes, and more at the
              Pearson / Derry corridor counter.
            </p>
            <div className={styles.buttons}>
            </div>
          </div>

          {/* Column 2 — Contact Info */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>7060 Airport Rd</span>
              <span>Malton · Mississauga, ON L4T 2G8</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span><a href="tel:+12895149467" style={{color: "inherit"}}>+1 (289) 514-9467</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>Open 24 Hours</span>
            </div>
          </div>

          {/* Column 3 — Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/visit">Visit · Malton / Airport Rd</Link>
              <Link href="/hours">Store Hours</Link>
              <Link href="/weed-dispensary-malton">Weed Dispensary Airport Rd</Link>
              {storeClaimsOpen24Hours() ? (
                <Link href="/24-hour-malton-dispensary">24-Hour Malton / Airport Rd</Link>
              ) : null}
              <Link href="/cannabis-delivery-malton">Cannabis Delivery Malton</Link>
              <Link href="/native-cigarettes-malton">Native Cigarettes Airport Rd</Link>
              <Link href="/nicotine-vape-malton">Nicotine Vapes Airport Rd</Link>
              <Link href="/exotic-weed">Exotic Weed</Link>
              <Link href="/premium-weed">Premium Weed</Link>
              <Link href="/aaa-weed">AAA+ Weed</Link>
              <Link href="/aa-weed">AA Weed</Link>
              <Link href="/budget-weed">Budget Weed</Link>
              <Link href="/items/edibles">Edibles</Link>
              <Link href="/items/cigarettes">Cigarettes</Link>
              <Link href="/items/vapes">Nicotine Vape</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/delivery">Delivery Menu</Link>
              <Link href="/info/mississauga-weed-dispensary">Mississauga Dispensary</Link>
              <Link href="/info/cheap-weed-mississauga">Cheap Weed Mississauga</Link>
              <Link href="/info/native-cigarettes-mississauga">Native Cigarettes</Link>
              <Link href="/info/nicotine-vapes-mississauga">Nicotine Vapes Mississauga</Link>
              <Link href="/info/weed-store-near-malton-airport">Weed Store Near Malton / Airport</Link>
              <Link href="/contact">Contact Us</Link>
              <a
                href="https://www.google.com/maps/search/?api=1&query=7060+Airport+Rd%2C+Mississauga%2C+ON+L4T+2G8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} Green Air Cannabis. Must be 19+ to
            enter. Adults 19+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}
