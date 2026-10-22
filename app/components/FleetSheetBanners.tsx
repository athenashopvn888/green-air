"use client";

import Link from "next/link";
import { useState } from "react";
import { codedBannerFor } from "../lib/fleet/coded";
import type { ResolvedBanner } from "../lib/fleet/types";
import { useCigaretteState } from "./CigaretteStateProvider";

const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const captionStyle = { margin: 0, padding: "10px 14px", background: "#111827", color: "#ffffff", textAlign: "center" as const, fontWeight: 800, lineHeight: 1.35 };

function BannerFigure({ banner }: { banner: ResolvedBanner }) {
  const coded = codedBannerFor(banner.id);
  const [src, setSrc] = useState(banner.render === "text" ? "" : banner.image);
  const [imageFailed, setImageFailed] = useState(banner.render === "text" || !banner.image);
  const showText = imageFailed || !src;
  return (
    <figure data-core-banner={banner.id} style={figureStyle}>
      {showText ? (
        <div data-fleet-text-banner="" style={{ ...imageStyle, minHeight: banner.imageHeight || coded.imageHeight || 180, display: "flex", alignItems: "center", justifyContent: "center", background: "#111827", color: "#ffffff", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)" }}>{banner.categoryName}</div>
      ) : (
        <Link href={banner.href} aria-label={banner.alt} style={{ display: "block", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={banner.alt}
            title={banner.title}
            width={banner.imageWidth}
            height={banner.imageHeight}
            style={imageStyle}
            onError={() => {
              if (coded.image && src !== coded.image) setSrc(coded.image);
              else setImageFailed(true);
            }}
          />
        </Link>
      )}
      <figcaption style={captionStyle}>{banner.textBar}{banner.caption && banner.caption !== banner.textBar ? ` ${banner.caption}` : ""}</figcaption>
    </figure>
  );
}

/** Sheet banners. A broken image swaps back to the coded image. */
export default function FleetSheetBanners({ banners }: { banners: ResolvedBanner[] }) {
  const cigarettes = useCigaretteState();
  const visible = banners.filter((banner) => !banner.hidden && (cigarettes.web || (banner.id !== "cigarettes" && banner.id !== "premium-cigarettes")));
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store promotions" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%" }}>
      {visible.map((banner) => <BannerFigure key={banner.id} banner={banner} />)}
    </aside>
  );
}
