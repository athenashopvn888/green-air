import { isKeptSmokeName } from "./cigMarkers.ts";

/**
 * Site-wide recall switch for cigarette and tobacco pages.
 * Default is hidden. Set NEXT_PUBLIC_SHOW_CIGARETTES=true to restore the previous site.
 * Backwoods, cigarillos, and rolling papers stay visible in both states.
 * Grabba is hidden with cigarettes.
 */
export const VAPE_PAGE = "/vape-shop-malton";

export const SHOW_CIGARETTES = process.env.NEXT_PUBLIC_SHOW_CIGARETTES === "true";

/**
 * Explicit false / 0 / no / off forces cigarettes off. Unset is not that override.
 * webOn is folded in by cigaretteAccess: coded content keeps this switch.
 */
export function cigaretteEnvHardOff(raw: string | undefined = process.env.SHOW_CIGARETTES ?? process.env.NEXT_PUBLIC_SHOW_CIGARETTES): boolean {
  if (raw == null) return false;
  return /^(0|false|no|off)$/i.test(raw.trim());
}

const KEPT_GUIDE_SLUGS = new Set(["backwoods", "backwoods-delivery-malton"]);

const HIDDEN_GUIDE_SLUGS = new Set([
  "canadian-classics",
  "nexus-cigarettes",
  "canadian-goose",
  "putters",
  "time-cigarettes",
  "rolled-gold",
  "canadian-cigarettes",
  "grabba",
  "playfares",
  "bb-cigarettes",
  "dks-cigarettes",
  "belmont-king-size",
  "bb-delivery-malton",
  "bb-full-delivery-malton",
  "bb-light-delivery-malton",
  "belmont-delivery-malton",
  "canadian-classics-delivery-malton",
  "canadian-classics-original-delivery-malton",
  "canadian-classics-silver-delivery-malton",
  "canadian-goose-delivery-malton",
  "canadian-goose-full-delivery-malton",
  "canadian-goose-light-delivery-malton",
  "canadian-delivery-malton",
  "canadian-full-delivery-malton",
  "canadian-light-delivery-malton",
  "rolled-gold-delivery-malton",
  "rolled-gold-full-delivery-malton",
  "rolled-gold-light-delivery-malton",
  "nexus-delivery-malton",
  "nexus-full-delivery-malton",
  "nexus-light-delivery-malton",
  "putters-delivery-malton",
  "time-delivery-malton",
  "time-full-delivery-malton",
  "time-light-delivery-malton",
  "playfare-delivery-malton",
  "playfare-ultra-light-delivery-malton",
  "grabba-delivery-malton",
]);

const HIDDEN_ITEM_SLUGS = new Set([
  "canadian-lights",
  "canadian-full",
  "putters",
  "canadian-goose-full",
  "canadian-goose-lights",
  "canadian-menthol",
  "canadian-classics-original",
  "canadian-classics-silver",
  "rolled-gold-lights",
  "nexus-full",
  "nexus-lights",
  "time-full",
  "grabba",
  "grabba-shaker-redrose-red-herring",
  "grabba-redrose-redherring",
  "grabba-shaker-redrose-red-herring-x2-available",
  "bb-full-carton",
  "bb-lights-carton",
  "10-x-premium-mix-cigarettes",
]);

const EXACT_REPLACEMENTS: Array<[string, string]> = [
  [
    "Equal corridor pages own those queries: Native cigarettes in Malton and nicotine vapes in Malton. Current shelves stay on /items/cigarettes and /items/vapes.",
    "Nicotine vapes in Malton have a corridor page. Current shelves stay on /items/vapes.",
  ],
  [
    "Where do Native cigarettes and nicotine vapes sit on this site?",
    "Where do nicotine vapes sit on this site?",
  ],
  [
    "The weed-dispensary owner, the 24-hour page, delivery, Native cigarettes, and nicotine vapes each have a corridor URL.",
    "The weed-dispensary owner, the 24-hour page, delivery, and nicotine vapes each have a corridor URL.",
  ],
  [
    "AA is cannabis flower. Native cigarettes and nicotine vapes have their own Airport Rd pages and their own shelves.",
    "AA is cannabis flower. Nicotine vapes have their own Airport Rd page and their own shelf.",
  ],
  [
    "Equal corridor page with delivery, Native cigarettes, and nicotine vapes.",
    "Equal corridor page with delivery and nicotine vapes.",
  ],
  [
    "The generic weed-dispensary owner, delivery, Native cigarettes, and nicotine vapes have equal neighbourhood pages",
    "The generic weed-dispensary owner, delivery, and nicotine vapes have equal neighbourhood pages",
  ],
  ["Browse every Green Air Cannabis strain, Native Cigarettes, Nicotine Vape, and THC Vape guide.", "Browse every Green Air Cannabis strain, Nicotine Vape, and THC Vape guide."],
  ["strain, Native Cigarettes, Nicotine Vape, and THC Vape", "strain, Nicotine Vape, and THC Vape"],
  ["Where do flower, delivery, cigarettes, and nicotine vapes sit?", "Where do flower, delivery, and nicotine vapes sit?"],
  ["Same store as cigarettes, nicotine vapes, and flower", "Same store as nicotine vapes and flower"],
  ["people who smoke cigarettes or vape", "people who vape"],
  ["delivery, Native cigarettes, and nicotine vapes", "delivery and nicotine vapes"],
  ["Delivery, Native cigarettes, and nicotine vapes", "Delivery and nicotine vapes"],
  ["Native cigarettes, and nicotine vapes", "nicotine vapes"],
  [", or cigarettes where listed", ""],
  [", and cigarettes where listed", ""],
  [" and cigarettes where listed", ""],
  [", and listed cigarettes", ""],
  [" and listed cigarettes", ""],
  [", and Native smokes where listed", ""],
  [" and Native smokes where listed", ""],
  ["including flower, value, pre-rolls, and Native smokes where listed", "including flower, value, and pre-rolls"],
];

export type MenuItemLike = { name?: string; slug?: string; category?: string };

const GRABBA_RE = /\bgrabba\b/i;
const KEPT_WRAP_RE = /\b(backwoods?|cigarillos?|rolling papers?|raw papers?)\b/i;
const HIDDEN_COPY_RE = /\b(cigarettes?|marlboro|belmont|native smokes?|native cigarettes?)\b/i;

const HIDDEN_EXACT_PATHS = [
  "/cigarettes",
  "/items/cigarettes",
  "/native-cigarettes-malton",
  "/info/native-cigarettes-mississauga",
  "/info/native-cigarettes-york",
  "/resources/native-smokes",
  "/resources/native-smokes/native-cigarettes-guide",
  ...[...HIDDEN_GUIDE_SLUGS].map((slug) => `/guides/${slug}`),
  ...[...HIDDEN_ITEM_SLUGS].map((slug) => `/item/${slug}`),
];

export function cigaretteHideRedirects(): { source: string; destination: string; statusCode: 302 }[] {
  if (SHOW_CIGARETTES) return [];
  return HIDDEN_EXACT_PATHS.map((source) => ({
    source,
    destination: VAPE_PAGE,
    statusCode: 302 as const,
  }));
}

export function isCigaretteSurfaceGuideSlug(slug: string): boolean {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  if (KEPT_GUIDE_SLUGS.has(clean)) return false;
  return HIDDEN_GUIDE_SLUGS.has(clean);
}

export function isHiddenGuideSlug(slug: string): boolean {
  if (SHOW_CIGARETTES) return false;
  return isCigaretteSurfaceGuideSlug(slug);
}

export function isGrabbaItem(item: MenuItemLike): boolean {
  return GRABBA_RE.test(`${item.name || ""} ${item.slug || ""}`);
}

export function isKeptWrapItem(item: MenuItemLike): boolean {
  return KEPT_WRAP_RE.test(`${item.name || ""} ${item.slug || ""}`);
}

/** Real cigarette shelf rows, ignoring the coded env switch. Wraps, papers, pouches, Zyn, and Velo stay. */
export function isCigaretteSurfaceItem(item: MenuItemLike): boolean {
  if (isGrabbaItem(item)) return true;
  if (isKeptSmokeName(item.name, item.slug) || isKeptWrapItem(item)) return false;
  if (HIDDEN_ITEM_SLUGS.has(item.slug || "")) return true;
  const category = (item.category || "").toUpperCase();
  if (category !== "CIGARETTES") return false;
  if (/\bpouches?\b/i.test(item.name || "")) return false;
  return true;
}

export function isHiddenCigaretteItem(item: MenuItemLike): boolean {
  if (SHOW_CIGARETTES) return false;
  return isCigaretteSurfaceItem(item);
}

function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0].split("#")[0];
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

export function isCigaretteSurfacePath(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (HIDDEN_EXACT_PATHS.includes(path) || path.startsWith("/resources/native-smokes/")) return true;
  if (path.startsWith("/guides/")) return isCigaretteSurfaceGuideSlug(path.slice("/guides/".length));
  if (path.startsWith("/item/")) return HIDDEN_ITEM_SLUGS.has(path.slice("/item/".length));
  return false;
}

export function isHiddenCigarettePath(pathname: string): boolean {
  if (SHOW_CIGARETTES) return false;
  return isCigaretteSurfacePath(pathname);
}

export function visibleCategoryHref(path: string, item?: MenuItemLike): string {
  if (SHOW_CIGARETTES || !isHiddenCigarettePath(path)) return path;
  if (item && !isHiddenCigaretteItem(item)) return "/items/add-ons";
  return "/items/add-ons";
}

/** Visible shelf name. The stored category stays CIGARETTES so the switch can restore it. */
export function visibleCategoryLabel(category: string, item?: MenuItemLike): string {
  if (SHOW_CIGARETTES || category.toUpperCase() !== "CIGARETTES") return category;
  if (/\bpouches?\b/i.test(item?.name || "")) return "POUCHES";
  return "WRAPS";
}

function applyExact(text: string): string {
  let next = text;
  for (const [from, to] of EXACT_REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function sentenceIsHidden(sentence: string): boolean {
  if (GRABBA_RE.test(sentence)) return true;
  if (KEPT_WRAP_RE.test(sentence)) return false;
  return HIDDEN_COPY_RE.test(sentence);
}

export function publicCopy(text: string): string {
  if (SHOW_CIGARETTES || !text) return text;
  const replaced = applyExact(text);
  if (replaced.includes("\n")) return replaced;
  const kept = replaced
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => sentence && !sentenceIsHidden(sentence));
  return kept.join(" ").replace(/\s{2,}/g, " ").trim();
}

export function visibleFaqs<T extends { q: string; a: string }>(faqs: readonly T[]): T[] {
  if (SHOW_CIGARETTES) return [...faqs];
  return faqs.flatMap((faq) => {
    const q = publicCopy(faq.q);
    const a = publicCopy(faq.a);
    if (!q || !a || sentenceIsHidden(q) || sentenceIsHidden(a)) return [];
    return [{ ...faq, q, a }];
  });
}

export function visibleGuideMarkdown(markdown: string): string {
  if (SHOW_CIGARETTES) return markdown;
  return markdown
    .split("\n")
    .filter((line) => !GRABBA_RE.test(line))
    .map((line) => line.split("/items/cigarettes").join("/items/add-ons"))
    .join("\n");
}
