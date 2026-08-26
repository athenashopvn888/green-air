import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SEO_PAGES } from "../app/lib/seoPages.ts";
import {
  LEGACY_SEO_SLUGS,
  SEO_ROUTE_REDIRECTS,
} from "../app/lib/seoRouteAliases.ts";

const footerSource = readFileSync(new URL("../app/components/Footer.tsx", import.meta.url), "utf8");

test("legacy SEO aliases permanently map to the approved canonical routes", () => {
  assert.deepEqual(SEO_ROUTE_REDIRECTS, [
    { source: "/info/cheap-weed-york", destination: "/info/cheap-weed-mississauga" },
    { source: "/info/dispensary-near-me-york", destination: "/info/dispensary-near-me-mississauga" },
    { source: "/info/native-cigarettes-york", destination: "/info/native-cigarettes-mississauga" },
    { source: "/info/york-weed-dispensary", destination: "/info/mississauga-weed-dispensary" },
    { source: "/info/weed-store-near-brampton", destination: "/info/weed-store-near-malton-airport" },
    { source: "/info/weed-store-near-mississauga", destination: "/info/weed-store-near-malton-airport" },
  ]);
});

test("every alias destination is an existing canonical SEO page", () => {
  const canonicalSlugs = new Set(
    SEO_PAGES.filter((page) => !LEGACY_SEO_SLUGS.has(page.slug)).map((page) => page.slug),
  );

  for (const { destination } of SEO_ROUTE_REDIRECTS) {
    assert.equal(canonicalSlugs.has(destination.replace("/info/", "")), true);
  }
});

test("footer links directly to canonical Mississauga and Malton routes", () => {
  const canonicalFooterLinks = [
    "/info/mississauga-weed-dispensary",
    "/info/cheap-weed-mississauga",
    "/info/native-cigarettes-mississauga",
    "/info/weed-store-near-malton-airport",
  ];

  for (const href of canonicalFooterLinks) {
    assert.match(footerSource, new RegExp(`href=["']${href}["']`));
  }

  for (const { source } of SEO_ROUTE_REDIRECTS) {
    assert.doesNotMatch(footerSource, new RegExp(`href=["']${source}["']`));
  }
});
