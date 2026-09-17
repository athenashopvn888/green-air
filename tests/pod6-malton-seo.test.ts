import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { cannabisStoreJsonLd, faqPageJsonLd, HOMEPAGE_FAQS, STORE_NAP } from "../app/lib/localSeo.ts";
import { SEO_PAGES, getSeoPageBySlug } from "../app/lib/seoPages.ts";
import { LEGACY_SEO_SLUGS } from "../app/lib/seoRouteAliases.ts";

const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const visit = readFileSync(new URL("../app/visit/page.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../app/components/Footer.tsx", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const cityPage = readFileSync(new URL("../app/weed-dispensary-mississauga/page.tsx", import.meta.url), "utf8");
const delivery = readFileSync(new URL("../app/delivery/DeliveryContent.tsx", import.meta.url), "utf8");
const gbpLanding = readFileSync(new URL("../app/components/GBPLandingPage.tsx", import.meta.url), "utf8");

const publicCopy = [layout, home, visit, footer, delivery, gbpLanding].join("\n");

test("FMD NAP is locked to 7060 Airport Rd and +12895149467", () => {
  assert.equal(STORE_NAP.streetAddress, "7060 Airport Rd");
  assert.equal(STORE_NAP.addressLocality, "Mississauga");
  assert.equal(STORE_NAP.postalCode, "L4T 2G8");
  assert.equal(STORE_NAP.phoneIntl, "+12895149467");
  assert.equal(STORE_NAP.phoneFmd, "+1 289 514 9467");
  assert.equal(STORE_NAP.website, "https://www.greenaircannabis.com/");
});

test("homepage schema graph is CannabisStore + FAQPage with unique image", () => {
  const store = cannabisStoreJsonLd();
  const graph = store["@graph"];
  assert.equal(graph[0]["@type"], "CannabisStore");
  assert.equal(graph[0].telephone, "+12895149467");
  assert.equal(graph[0].address.streetAddress, "7060 Airport Rd");
  assert.equal(graph[0].image.includes("7Clmh.jpg"), false);
  assert.match(graph[0].image, /welcome_banner\.webp/);
  assert.match(layout, /cannabisStoreJsonLd/);
  assert.doesNotMatch(layout, /7Clmh\.jpg/);

  const faq = faqPageJsonLd(HOMEPAGE_FAQS, STORE_NAP.website);
  assert.equal(faq["@type"], "FAQPage");
  assert.ok(faq.mainEntity.length >= 4);
  assert.match(home, /faqPageJsonLd/);
  assert.match(home, /HOMEPAGE_FAQS/);
});

test("/visit is a unique Malton / Airport Rd reach page with full NAP", () => {
  assert.match(visit, /How to reach 7060 Airport Rd/);
  assert.match(visit, /Malton/);
  assert.match(visit, /Airport Road/);
  assert.match(visit, /7060 Airport Rd/);
  assert.match(visit, /STORE_NAP\.phoneDisplay/);
  assert.match(visit, /plaza/);
  assert.match(visit, /MiWay/);
  assert.match(visit, /Pearson/);
  assert.match(visit, /homepage remains the NAP hub|homepage.*visit hub/i);
  assert.doesNotMatch(visit, /Jane Street|After Dark|Cafe Value|Gas City|Athena|sister/i);
});

test("corridor titles and homepage hub mention Malton / Airport Rd", () => {
  assert.match(layout, /Malton Airport Rd Dispensary/);
  assert.match(home, /Malton \/ Airport Rd/);
  assert.match(home, /Visit hub — Malton NAP/);
  assert.match(footer, /\/visit/);
  assert.match(footer, /Malton \/ Airport/);
});

test("thin city spam is demoted; delivery stays Malton / Mississauga", () => {
  assert.match(cityPage, /index:\s*false/);
  assert.match(sitemap, /\/visit/);
  assert.doesNotMatch(sitemap, /weed-dispensary-mississauga/);
  assert.equal(getSeoPageBySlug("mississauga-weed-dispensary")?.indexable, false);
  assert.equal(getSeoPageBySlug("dispensary-near-me-mississauga")?.indexable, false);
  const malton = getSeoPageBySlug("weed-store-near-malton-airport");
  assert.notEqual(malton?.indexable, false);
  assert.match(malton?.title ?? "", /Malton \/ Airport Rd/);
  assert.match(delivery, /Malton/);
  assert.match(delivery, /Mississauga/);
  assert.doesNotMatch(delivery, /GTA catalog|Toronto delivery/i);
});

test("public local-SEO copy is standalone Green Air only", () => {
  assert.doesNotMatch(publicCopy, /After Dark|Cafe Value|Gas City|Athena|sister store|our other locations|Jane Street/i);
  for (const page of SEO_PAGES.filter((p) => !LEGACY_SEO_SLUGS.has(p.slug))) {
    const blob = `${page.title} ${page.metaDescription} ${page.sections.map((s) => s.body).join(" ")}`;
    assert.doesNotMatch(blob, /After Dark|Cafe Value|Gas City|Athena/i);
  }
});
