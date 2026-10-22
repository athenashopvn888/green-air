import { STORE_NAP } from "../localSeo.ts";
import type { Nap, ResolvedBanner, ResolvedPage } from "./types.ts";

/**
 * The only store-specific fleet file. Other stores replace this module
 * and leave the rest of app/lib/fleet and app/components/fleet as-is.
 */
export const FLEET_STORE_CODE = "GAC01";
export const FLEET_STORE_NAME = "Green Air Cannabis";
export const FLEET_AREA = "Malton";
export const FLEET_DOMAIN = "www.greenaircannabis.com";
export const FLEET_DOMAINS = ["www.greenaircannabis.com", "greenaircannabis.com"] as const;
export const FLEET_ORIGIN = "https://www.greenaircannabis.com";

/** Public blob origin. Objects live at /{storeCode}/manifest.json and /{storeCode}/articles/. */
export const FLEET_BLOB_ORIGIN = "https://dhaah0upvlpukv56.public.blob.vercel-storage.com";

export const FLEET_COLORS = {
  banner: "#111827",
  bannerText: "#ffffff",
} as const;

/** Digits or formatted numbers. An article containing any of these is dropped. */
export const FLEET_BLOCKED_PHONES: readonly string[] = [];

export const FLEET_ARTICLES_PATH = "/articles";

/** Page and spot names for the six TV2 category cards. Spot is the card name. */
export const TV2_PAGE = "TV2";
export const TV2_CARDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export const TV_PAGE = "TV";
export const TV_FULLSCREEN_SPOTS = [
  "Fullscreen promo 1",
  "Fullscreen promo 2",
  "Fullscreen promo 3",
] as const;

/** Fort York Cannabis takeover defaults: 5s on screen, once a minute, 5s first preview, 650ms slide. */
export const TV_PROMO_SHOW_SECONDS = 5;
export const TV_PROMO_EVERY_MINUTES = 1;
export const TV_PROMO_INITIAL_DELAY_MS = 5_000;
export const TV_PROMO_SLIDE_MS = 650;

export function defaultManifestUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/manifest.json`;
}

export function articlesIndexUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/index.json`;
}

export function articleBodyUrl(slug: string, storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/${encodeURIComponent(slug)}.json`;
}

const STORE_NAME = STORE_NAP.brand;

/**
 * Coded homepage banners. Copy and art match app/components/FleetAnnouncementBanner.tsx
 * and the category images in app/lib/corePromotionBanners.ts.
 */
export const CODED_BANNERS: ResolvedBanner[] = [
  {
    id: "weed",
    page: "Home",
    spot: "Top banner",
    href: "/exotic-weed",
    categoryName: "Exotic Weed",
    hidden: false,
    render: "image",
    image: "/banners/core-top-weed.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${STORE_NAME} Exotic, Premium and AAA+ flower tiers`,
    title: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
    textBar: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
    caption: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
  },
  {
    id: "vapes",
    page: "Home",
    spot: "Promo banner 2",
    href: "/items/vapes",
    categoryName: "Nicotine Vapes",
    hidden: false,
    render: "image",
    image: "/banners/core-vapes-nicotine-thc.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${STORE_NAME} nicotine and THC vape categories`,
    title: "Nicotine + THC vapes",
    textBar: "Nicotine + THC vapes",
    caption: "Nicotine + THC vapes",
  },
  {
    id: "cigarettes",
    page: "Home",
    // Not a sheet row. The sheet's "Promo banner 3" is the welcome image below the core stack.
    spot: "Coded cigarette banner",
    href: "/items/cigarettes",
    categoryName: "Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-cigarette-mix-match.webp",
    imageWidth: 2048,
    imageHeight: 768,
    alt: `${STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`,
    title: "2 PACKS $5 / $25 CARTON",
    textBar: "2 PACKS $5 / $25 CARTON",
    caption: "2 PACKS $5 / $25 CARTON",
  },
  {
    id: "premium-cigarettes",
    page: "Home",
    spot: "Promo banner 4",
    href: "/items/cigarettes",
    categoryName: "Premium Cigarettes",
    hidden: false,
    render: "image",
    image: "/banners/core-premium-cigarettes.webp",
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`,
    title: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    textBar: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    caption: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
  },
  {
    id: "welcome",
    page: "Home",
    spot: "Promo banner 3",
    href: "/",
    categoryName: "Welcome",
    hidden: false,
    render: "image",
    image: "/banners/welcome_banner.webp",
    alt: "Green Air Cannabis Dispensary Weed Delivery",
    title: "Green Air Cannabis Dispensary Weed Delivery",
    textBar: "",
    caption: "",
  },
];

/** City stays Mississauga. Malton is the neighbourhood, not a replacement city. */
export const CODED_NAP: Nap = {
  name: STORE_NAP.brand,
  street: STORE_NAP.streetAddress,
  city: STORE_NAP.addressLocality,
  province: STORE_NAP.addressRegion,
  postalCode: STORE_NAP.postalCode,
  cityLine: `${STORE_NAP.addressLocality}, ${STORE_NAP.addressRegion} ${STORE_NAP.postalCode}`,
  area: STORE_NAP.neighborhood,
  intersection: STORE_NAP.corridor,
  areaLine: `${STORE_NAP.neighborhood} · ${STORE_NAP.addressLocality}`,
  phoneDisplay: STORE_NAP.phoneDisplay,
  phoneTel: STORE_NAP.phoneIntl,
  hours: STORE_NAP.hoursLabel,
  mapsSearchUrl: STORE_NAP.mapUrl,
  mapsEmbedUrl: STORE_NAP.mapEmbedUrl,
  lat: String(STORE_NAP.latitude),
  lng: String(STORE_NAP.longitude),
  schemaName: "Green Air Cannabis Dispensary Weed Delivery",
  website: STORE_NAP.canonicalHost,
};

export const CODED_PAGES: Record<string, ResolvedPage> = {
  Home: {
    description:
      "24-hour walk-in cannabis dispensary at 7060 Airport Rd in Malton, Mississauga. Adults 19+ shop flower, pre-rolls, vapes, edibles, and concentrates on the Pearson / Derry corridor. Call +1 (289) 514-9467.",
    metaTitle: "",
    metaDescription:
      "24-hour walk-in cannabis dispensary at 7060 Airport Rd in Malton, Mississauga. Adults 19+ shop flower, pre-rolls, vapes, edibles, and concentrates on the Pearson / Derry corridor. Call +1 (289) 514-9467.",
  },
  Contact: {
    description:
      "Call or walk into Green Air Cannabis at 7060 Airport Rd, Malton, Mississauga, ON L4T 2G8. Open 24 hours daily. Phone +1 (289) 514-9467.",
    metaTitle: "Contact Us — 7060 Airport Rd, Malton",
    metaDescription:
      "Call or walk into Green Air Cannabis at 7060 Airport Rd, Malton, Mississauga, ON L4T 2G8. Open 24 hours daily. Phone +1 (289) 514-9467.",
  },
};
