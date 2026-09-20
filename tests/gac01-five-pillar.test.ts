import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PATHS, ORGANIC_HUB_CARDS } from "../app/lib/organicPaths.ts";
import { HOMEPAGE_FAQS } from "../app/lib/localSeo.ts";

const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const visit = readFileSync(new URL("../app/visit/page.tsx", import.meta.url), "utf8");
const twentyFour = readFileSync(
  new URL("../app/24-hour-malton-dispensary/page.tsx", import.meta.url),
  "utf8",
);
const weedLp = readFileSync(
  new URL("../app/weed-dispensary-malton/page.tsx", import.meta.url),
  "utf8",
);
const deliveryLp = readFileSync(
  new URL("../app/cannabis-delivery-malton/page.tsx", import.meta.url),
  "utf8",
);
const nativeCigsLp = readFileSync(
  new URL("../app/native-cigarettes-malton/page.tsx", import.meta.url),
  "utf8",
);
const nicotineLp = readFileSync(
  new URL("../app/nicotine-vape-malton/page.tsx", import.meta.url),
  "utf8",
);
const footer = readFileSync(new URL("../app/components/Footer.tsx", import.meta.url), "utf8");
const navbar = readFileSync(new URL("../app/components/Navbar.tsx", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const mesh = readFileSync(
  new URL("../app/components/LocalSeoMesh.tsx", import.meta.url),
  "utf8",
);
const faq = readFileSync(new URL("../app/faq/page.tsx", import.meta.url), "utf8");
const deliveryCatalog = readFileSync(
  new URL("../app/delivery/DeliveryContent.tsx", import.meta.url),
  "utf8",
);

const BUNDLE = [
  home,
  visit,
  weedLp,
  twentyFour,
  deliveryLp,
  nativeCigsLp,
  nicotineLp,
  footer,
  navbar,
  faq,
  deliveryCatalog,
].join("\n");

test("five equal pillar paths are first-class neighbourhood owners", () => {
  assert.equal(PATHS.weedDispensaryLp, "/weed-dispensary-malton");
  assert.equal(PATHS.twentyFour, "/24-hour-malton-dispensary");
  assert.equal(PATHS.deliveryLp, "/cannabis-delivery-malton");
  assert.equal(PATHS.nativeCigarettesLp, "/native-cigarettes-malton");
  assert.equal(PATHS.nicotineVapeLp, "/nicotine-vape-malton");
  assert.equal(ORGANIC_HUB_CARDS.length, 5);
  assert.deepEqual(
    ORGANIC_HUB_CARDS.map((card) => card.href),
    [
      PATHS.weedDispensaryLp,
      PATHS.twentyFour,
      PATHS.deliveryLp,
      PATHS.nativeCigarettesLp,
      PATHS.nicotineVapeLp,
    ],
  );
});

test("homepage hub cards and FAQ mesh the five pillars", () => {
  assert.match(home, /ORGANIC_HUB_CARDS/);
  assert.match(home, /hubCard/);
  assert.match(home, /PATHS\.weedDispensaryLp/);
  assert.match(home, /TWENTY_FOUR_HOUR_HREF/);
  assert.match(home, /PATHS\.deliveryLp/);
  assert.match(home, /PATHS\.nativeCigarettesLp/);
  assert.match(home, /PATHS\.nicotineVapeLp/);
  assert.match(home, /LocalSeoMesh/);
  assert.ok(HOMEPAGE_FAQS.some((item) => /weed dispensary Malton/i.test(item.a)));
  assert.ok(HOMEPAGE_FAQS.some((item) => /24-hour Malton dispensary/i.test(item.a)));
  assert.ok(HOMEPAGE_FAQS.some((item) => /cannabis delivery Malton/i.test(item.a)));
});

test("weed-dispensary LP owns generic neighbourhood intent with unique H1 and FAQ", () => {
  assert.match(weedLp, /Weed Dispensary on Airport Rd/);
  assert.match(weedLp, /7060 Airport Rd/);
  assert.match(weedLp, /Malton/);
  assert.match(weedLp, /faqPageJsonLd\(WEED_DISPENSARY_FAQS/);
  assert.match(weedLp, /Adults 19\+/);
  assert.match(weedLp, /not a[\s\n]+city-wide Mississauga dispensary list/i);
  assert.doesNotMatch(weedLp, /Mississauga-wide weed dispensary directory/i);
  assert.doesNotMatch(weedLp, /medical cannabis|prescription|doctor/i);
  assert.match(weedLp, /does not steal those jobs/);
});

test("24h LP owns open-now intent with unique H1 and on-page FAQ", () => {
  assert.match(twentyFour, /24-Hour Dispensary Open Now on Airport Rd/);
  assert.match(twentyFour, /7060 Airport Rd/);
  assert.match(twentyFour, /Malton/);
  assert.match(twentyFour, /Open 24 Hours/);
  assert.match(twentyFour, /faqPageJsonLd\(TWENTY_FOUR_FAQS/);
  assert.match(twentyFour, /Adults 19\+/);
  assert.doesNotMatch(twentyFour, /Mississauga-wide 24-hour directory/i);
  assert.doesNotMatch(twentyFour, /medical cannabis|prescription|doctor/i);
});

test("delivery LP stays dispatcher-true and does not invent hours or zones", () => {
  assert.match(deliveryLp, /Cannabis Delivery in Malton \/ Airport Rd/);
  assert.match(deliveryLp, /\$60 product minimum/);
  assert.match(deliveryLp, /dispatcher/i);
  assert.match(deliveryLp, /faqPageJsonLd\(DELIVERY_FAQS/);
  assert.match(deliveryLp, /does not invent a zone map/);
  assert.match(deliveryLp, /does not invent a delivery window/);
  assert.doesNotMatch(deliveryLp, /24-hour delivery/i);
  assert.match(deliveryLp, /not a Toronto delivery menu/i);
  assert.match(deliveryCatalog, /cannabis-delivery-malton/);
});

test("Native cigarette and nicotine vape LPs do not invent inventory", () => {
  assert.match(nativeCigsLp, /Native Cigarettes on Airport Rd/);
  assert.match(nativeCigsLp, /does not invent stock/);
  assert.match(nativeCigsLp, /\/items\/cigarettes/);
  assert.match(nativeCigsLp, /faqPageJsonLd\(NATIVE_CIG_FAQS/);
  assert.match(nicotineLp, /Nicotine Vapes on Airport Rd/);
  assert.match(nicotineLp, /does not invent puff counts/);
  assert.match(nicotineLp, /\/items\/vapes/);
  assert.match(nicotineLp, /Nicotine is addictive/);
  assert.match(nicotineLp, /\/items\/vape-disposables/);
  assert.match(nicotineLp, /faqPageJsonLd\(NICOTINE_FAQS/);
});

test("sitemap, footer, and FAQ list the fifth pillar with the verticals", () => {
  assert.match(sitemap, /\/weed-dispensary-malton/);
  assert.match(sitemap, /\/24-hour-malton-dispensary/);
  assert.match(sitemap, /\/cannabis-delivery-malton/);
  assert.match(sitemap, /\/native-cigarettes-malton/);
  assert.match(sitemap, /\/nicotine-vape-malton/);
  assert.match(sitemap, /priority: 0\.8/);
  assert.match(footer, /Weed Dispensary Airport Rd/);
  assert.match(footer, /24-Hour Malton \/ Airport Rd/);
  assert.match(footer, /Cannabis Delivery Malton/);
  assert.match(footer, /Native Cigarettes Airport Rd/);
  assert.match(footer, /Nicotine Vapes Airport Rd/);
  assert.match(faq, /\/weed-dispensary-malton/);
  assert.match(faq, /\/24-hour-malton-dispensary/);
  assert.match(faq, /\/cannabis-delivery-malton/);
});

test("menu swimlane stays untouched — no fifth-pillar nav pill", () => {
  assert.match(navbar, /Open Now \/ 24h/);
  assert.doesNotMatch(navbar, /weed-dispensary-malton/);
  assert.doesNotMatch(navbar, /href: "\/weed-dispensary/);
});

test("internal mesh links homepage, visit, weed dispensary, 24h, and Big Three", () => {
  assert.match(mesh, /PATHS\.home/);
  assert.match(mesh, /PATHS\.visit/);
  assert.match(mesh, /PATHS\.weedDispensaryLp/);
  assert.match(mesh, /PATHS\.twentyFour/);
  assert.match(mesh, /PATHS\.deliveryLp/);
  assert.match(mesh, /PATHS\.nativeCigarettesLp/);
  assert.match(mesh, /PATHS\.nicotineVapeLp/);
  assert.match(visit, /PATHS\.weedDispensaryLp/);
  assert.match(visit, /TWENTY_FOUR_HOUR_HREF/);
  assert.match(twentyFour, /href="\/exotic-weed"/);
});

test("five-pillar copy stays 19+, corridor-true, and menu-swimlane clean", () => {
  assert.match(BUNDLE, /Adults 19\+/);
  assert.doesNotMatch(BUNDLE, /sister store|our other locations|After Dark|Cafe Value|Gas City|Athena/i);
  assert.doesNotMatch(BUNDLE, /medical marijuana|prescription|doctor's note/i);
  assert.doesNotMatch(BUNDLE, /we deliver (to|across) (Toronto|Brampton)/i);
  assert.doesNotMatch(twentyFour, /Jane Street|Eglinton West|Queen West/i);
  assert.doesNotMatch(weedLp, /Jane Street|Eglinton West|Queen West/i);
});
