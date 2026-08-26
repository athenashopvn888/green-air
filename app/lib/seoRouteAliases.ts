export const SEO_ROUTE_REDIRECTS = [
  { source: "/info/cheap-weed-york", destination: "/info/cheap-weed-mississauga" },
  { source: "/info/dispensary-near-me-york", destination: "/info/dispensary-near-me-mississauga" },
  { source: "/info/native-cigarettes-york", destination: "/info/native-cigarettes-mississauga" },
  { source: "/info/york-weed-dispensary", destination: "/info/mississauga-weed-dispensary" },
  { source: "/info/weed-store-near-brampton", destination: "/info/weed-store-near-malton-airport" },
  { source: "/info/weed-store-near-mississauga", destination: "/info/weed-store-near-malton-airport" },
] as const;

export const LEGACY_SEO_SLUGS = new Set(
  SEO_ROUTE_REDIRECTS.map(({ source }) => source.replace("/info/", "")),
);
