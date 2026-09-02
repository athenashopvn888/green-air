import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("protected Weed owner title lets the root template append the brand once", () => {
  const location = read("app/lib/gbp-location.ts");
  assert.ok(location.includes('seoTitle: "Weed Dispensary in Mississauga"'));
  assert.doesNotMatch(location, /seoTitle: "Green Air Cannabis \|/);
});

test("protected owner canonical, schema, sitemap and footer use one no-slash form", () => {
  const page = read("app/weed-dispensary-mississauga/page.tsx");
  const component = read("app/components/GBPLandingPage.tsx");
  const sitemap = read("app/sitemap.ts");
  const footer = read("app/components/Footer.tsx");
  assert.ok(page.includes('canonical: `https://${gbpLocation.domain}/${gbpLocation.slug}`'));
  assert.ok(component.includes('"url": `https://${gbpLocation.domain}/${gbpLocation.slug}`'));
  assert.ok(sitemap.includes('`${BASE}/weed-dispensary-mississauga`'));
  assert.ok(footer.includes('href="/weed-dispensary-mississauga"'));
  for (const source of [page, component, sitemap, footer]) {
    assert.doesNotMatch(source, /weed-dispensary-mississauga\//);
  }
});

test("delivery and protected store truth remain untouched", () => {
  const delivery = read("app/delivery/page.tsx") + read("app/delivery/DeliveryContent.tsx");
  const location = read("app/lib/gbp-location.ts");
  assert.ok(delivery.includes('title: "Delivery Menu | Green Air Cannabis"'));
  assert.ok(location.includes('address: "7060 Airport Rd, Mississauga, ON L4T 2G8"'));
  assert.ok(location.includes('phoneIntl: "+12895149467"'));
  assert.ok(location.includes('hours: ["Open 24 Hours"]'));
});
