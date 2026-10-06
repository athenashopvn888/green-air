import Image from "next/image";

import reviewQr from "../public/tv-review-gac01.png";
import styles from "./TvReviewQr.module.css";

export default function TvReviewQr() {
  return (
    <aside className={styles.card} aria-label="Review Green Air Cannabis on Google">
      <Image
        className={styles.image}
        src={reviewQr}
        alt="QR code to review Green Air Cannabis on Google"
        sizes="116px"
        priority
      />
      <strong className={styles.label}>SCAN FOR REVIEW</strong>
    </aside>
  );
}
