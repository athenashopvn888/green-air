import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("city spam title does not duplicate the brand before the template runs", () => {
  const location = read("app/lib/gbp-location.ts");
  assert.ok(location.includes('seoTitle: "Weed Dispensary in Malton / Airport Rd"'));
  assert.doesNotMatch(location, /seoTitle: "Green Air Cannabis \|/);
});

test("generic Mississauga city URL is demoted away from itself", () => {
  const page = read("app/weed-dispensary-mississauga/page.tsx");
  const component = read("app/components/GBPLandingPage.tsx");
  const sitemap = read("app/sitemap.ts");
  const footer = read("app/components/Footer.tsx");
  assert.match(page, /index:\s*false/);
  assert.match(page, /canonical: `\$\{STORE_NAP\.canonicalHost\}\$\{PATHS\.weedDispensaryLp\}`/);
  assert.doesNotMatch(page, /canonical: `https:\/\/\$\{gbpLocation\.domain\}\/\$\{gbpLocation\.slug\}`/);
  assert.match(component, /"url": `https:\/\/\$\{gbpLocation\.domain\}`/);
  assert.doesNotMatch(sitemap, /\/weed-dispensary-mississauga/);
  assert.doesNotMatch(footer, /href="\/weed-dispensary-mississauga"/);
  for (const source of [page, component, sitemap, footer]) {
    assert.doesNotMatch(source, /weed-dispensary-mississauga\//);
  }
});

test("delivery and protected store truth remain untouched", () => {
  const delivery = read("app/delivery/page.tsx") + read("app/delivery/DeliveryContent.tsx");
  const location = read("app/lib/gbp-location.ts");
  assert.ok(delivery.includes('absolute: "Malton / Mississauga Delivery Menu | Green Air Cannabis"'));
  assert.ok(location.includes('address: "7060 Airport Rd, Mississauga, ON L4T 2G8"'));
  assert.ok(location.includes('phoneIntl: "+12895149467"'));
  assert.ok(location.includes('hours: ["Open 24 Hours"]'));
});
