import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

import {
  CIGARETTE_OFFER_CYCLE_MS,
  CIGARETTE_OFFER_VISIBLE_MS,
  CIGARETTE_PROMOS,
  getCigaretteOfferPromo,
  isCigaretteOfferVisible,
} from "../app/tv2/tv2Promos.ts";

test("cigarette promos alternate for five seconds every thirty seconds", () => {
  assert.equal(CIGARETTE_OFFER_CYCLE_MS, 30_000);
  assert.equal(CIGARETTE_OFFER_VISIBLE_MS, 5_000);
  assert.equal(isCigaretteOfferVisible(4_999), true);
  assert.equal(isCigaretteOfferVisible(5_000), false);
  assert.equal(getCigaretteOfferPromo(0)?.src, CIGARETTE_PROMOS[0].src);
  assert.equal(getCigaretteOfferPromo(30_000)?.src, CIGARETTE_PROMOS[1].src);
  assert.equal(getCigaretteOfferPromo(60_000)?.src, CIGARETTE_PROMOS[0].src);
});

test("both supplied promo images and the GAC01 review QR are packaged", async () => {
  for (const path of [
    "public/banners/luxury_mix_match_600_web.webp",
    "public/banners/marlboro_belmont_600x600.webp",
    "public/tv-review-gac01.png",
  ]) {
    assert.ok((await stat(path)).size > 0, `${path} must not be empty`);
  }
});

test("TV layouts carry the labeled review QR and ticker source has no cigarette flash", async () => {
  const [tvLayout, tv2Layout, qr, ribbon] = await Promise.all([
    readFile("app/tv/layout.tsx", "utf8"),
    readFile("app/tv2/layout.tsx", "utf8"),
    readFile("app/TvReviewQr.tsx", "utf8"),
    readFile("app/components/HiringRibbon.tsx", "utf8"),
  ]);
  assert.match(tvLayout, /<TvReviewQr \/>/);
  assert.match(tv2Layout, /<TvReviewQr \/>/);
  assert.match(qr, /SCAN FOR REVIEW/);
  assert.doesNotMatch(ribbon, /CIGARETTE_FLASH_MESSAGE|2 PACK \$5/);
});
