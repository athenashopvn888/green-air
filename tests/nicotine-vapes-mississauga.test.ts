import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  getSeoPageBySlug,
  NICOTINE_VAPES_MISSISSAUGA_PRODUCTS,
} from "../app/lib/seoPages.ts";

const expectedSlugs = [
  "geek-universe-25k-puffs",
  "level-x-g2-pod",
  "nexa-pix-30k-puffs-many-flavors",
  "ovns-disposable-5-8ml-many-flavors",
  "ovns-pioneer-5-22k-puffs",
];

test("Mississauga nicotine guide uses exactly five audited cards", () => {
  assert.deepEqual(
    NICOTINE_VAPES_MISSISSAUGA_PRODUCTS.map((product) => product.slug),
    expectedSlugs,
  );
  assert.ok(
    NICOTINE_VAPES_MISSISSAUGA_PRODUCTS.every((product) =>
      product.image.startsWith("https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/"),
    ),
  );
});

test("guide stays scoped to nicotine category and guarded evidence copy", () => {
  const page = getSeoPageBySlug("nicotine-vapes-mississauga");
  assert.ok(page?.heroPreview);
  assert.equal(page.heroPreview.menuHref, "/items/vapes");
  assert.equal(page.heroPreview.products.length, 5);
  assert.match(page.heroPreview.warning ?? "", /Adults 19\+\. Nicotine is addictive\./);
  assert.match(page.heroPreview.disclosure, /not a complete selection/i);
  assert.equal(page.showTierGrid, false);
  assert.equal(page.showVisitSection, false);
  assert.equal(page.relatedLink?.href, "/info/native-cigarettes-mississauga");
  assert.match(page.sections.map((section) => section.body).join(" "), /\/items\/vape-disposables.*THC/i);
});

test("renderer and footer discover the approved route without excluded products", () => {
  const renderer = fs.readFileSync(path.join(process.cwd(), "app/info/[seoPage]/page.tsx"), "utf8");
  const footer = fs.readFileSync(path.join(process.cwd(), "app/components/Footer.tsx"), "utf8");
  const serialized = JSON.stringify(getSeoPageBySlug("nicotine-vapes-mississauga"));

  assert.match(renderer, /data-product-slug/);
  assert.match(renderer, /hideThcVape/);
  assert.match(footer, /\/info\/nicotine-vapes-mississauga/);
  for (const excluded of [
    "geek-promax-5-30k-puffs",
    "ovns-10000-5-10k-puffs",
    "ovns-2500-5-25k-puffs",
    "gas-gang-dispo-vape-1g",
    "drizzle-switch-3in1-2g",
  ]) {
    assert.equal(serialized.includes(excluded), false, excluded);
  }
});
