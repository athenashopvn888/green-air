"use client";

import Link from "next/link";
import { useState } from "react";
import { codedBannerFor, nextBannerSrc } from "../lib/fleet/coded";
import type { ResolvedBanner } from "../lib/fleet/types";
import { useCigaretteState } from "./CigaretteStateProvider";

const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const captionStyle = { margin: 0, padding: "10px 14px", background: "#111827", color: "#ffffff", textAlign: "center" as const, fontWeight: 800, lineHeight: 1.35 };
const STORE_BANNER = { background: "#04150c", color: "#22c55e" } as const;

function BannerFigure({ banner }: { banner: ResolvedBanner }) {
  const coded = codedBannerFor(banner.id);
  const [src, setSrc] = useState(banner.render === "text" ? "" : banner.image);
  const [imageFailed, setImageFailed] = useState(banner.render === "text" || !banner.image);
  const showText = imageFailed || !src;
  return (
    <figure data-core-banner={banner.id} style={figureStyle}>
      {showText ? (
        <div data-fleet-text-banner="" role="img" aria-label={banner.alt} title={banner.title} style={{ ...imageStyle, minHeight: banner.imageHeight || coded?.imageHeight || 180, display: "flex", alignItems: "center", justifyContent: "center", background: STORE_BANNER.background, color: STORE_BANNER.color, fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", boxShadow: "inset 0 0 0 3px #22c55e" }}>{banner.categoryName}</div>
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
              const next = nextBannerSrc(src, coded?.image);
              if (next) setSrc(next);
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
