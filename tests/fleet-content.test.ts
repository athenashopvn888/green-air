import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { cigaretteAccessFrom } from "../app/lib/cigDecision.ts";
import { CODED_BANNERS, CODED_NAP, CODED_PAGES, codedBannerFor, fleetVersion, nextBannerSrc } from "../app/lib/fleet/coded.ts";
import { defaultManifestUrl, TV2_CARDS, TV_FULLSCREEN_SPOTS } from "../app/lib/fleet/config.ts";
import { inPromoWindow, pickTv2Sheet, resolveFullscreenPromos, resolveTvCards } from "../app/lib/fleet/tv.ts";
import {
  TV_MANIFEST_CACHE_CONTROL,
  readEmergencyCoded,
  readFleetContent,
  resetFleetContentCache,
  tvManifestDecision,
} from "../app/lib/fleet/read.ts";
import { bannerMatchesCoded, bannersMatchCoded, phoneToTel, resolveBanners, resolveModeValue, resolveNap, resolvePages } from "../app/lib/fleet/resolve.ts";
import { revalidateAuthorized } from "../app/lib/fleet/secret.ts";
import { FLEET_AFFECTED_PATHS } from "../app/lib/fleet/routes.ts";
import { FLEET_MAX_BUNDLE_BYTES, type ContentBundle } from "../app/lib/fleet/types.ts";
import { parseBundle, parseManifest, rejectHttp } from "../app/lib/fleet/validate.ts";

const MANIFEST_URL = "https://fixture.test/GAC01/manifest.json";
const BUNDLE_URL = "https://fixture.test/GAC01/content-v1.json";
const manifest = JSON.parse(readFileSync(new URL("../fixtures/fleet/manifest.json", import.meta.url), "utf8"));
const bundle = JSON.parse(readFileSync(new URL("../fixtures/fleet/content-v1.json", import.meta.url), "utf8")) as ContentBundle;

function responseFor(body: string, status = 200, headers: Record<string, string> = {}) {
  return new Response(body, { status, headers });
}

function fetchServing(bodies: Record<string, { body: string; status?: number; headers?: Record<string, string> }>) {
  const calls: string[] = [];
  const fetchImpl = async (url: string | URL) => {
    const key = String(url);
    calls.push(key);
    const hit = bodies[key];
    if (!hit) return responseFor("missing", 404);
    return responseFor(hit.body, hit.status ?? 200, hit.headers);
  };
  return { fetchImpl: fetchImpl as typeof fetch, calls };
}

async function acceptFixture() {
  resetFleetContentCache();
  const { fetchImpl, calls } = fetchServing({
    [MANIFEST_URL]: { body: JSON.stringify(manifest), headers: { etag: '"GAC01-1"' } },
    [BUNDLE_URL]: { body: JSON.stringify(bundle) },
  });
  const state = await readFleetContent({
    manifestUrl: MANIFEST_URL,
    fetchImpl,
    emergencyCoded: false,
    renderedAt: "2026-10-22T12:00:01.000Z",
  });
  return { state, calls };
}

test("a valid bundle is accepted and a missing manifest stays on coded content", async () => {
  const coded = await readFleetContent({ manifestUrl: "", emergencyCoded: false, renderedAt: "2026-10-22T00:00:00.000Z" });
  assert.equal(coded.active, false);
  assert.equal(coded.version, "GAC01:coded");
  assert.equal(coded.mode, "coded");
  assert.equal(coded.manifest, "absent");
  assert.equal(coded.nap.city, "Mississauga");
  assert.equal(coded.nap.area, "Malton");
  assert.equal(coded.nap.street, CODED_NAP.street);
  assert.equal(coded.pages.Home.description, CODED_PAGES.Home.description);

  const { state: live, calls } = await acceptFixture();
  assert.equal(live.active, true);
  assert.equal(live.version, fleetVersion(1));
  assert.equal(live.contentVersion, 1);
  assert.equal(live.mode, "bundle");
  assert.equal(live.manifest, "ok");
  assert.equal(live.bundleUrl, BUNDLE_URL);
  assert.deepEqual(calls, [MANIFEST_URL, BUNDLE_URL]);
  assert.equal(live.banners.map((banner) => banner.id).join(","), "weed,vapes,cigarettes,premium-cigarettes,welcome");
  assert.equal(live.banners[0].textBar, "Sheet weed text bar");
  assert.equal(live.banners[0].render, "image");
  assert.equal(live.nap.hours, "Open 24 Hours Daily");
  assert.equal(live.nap.city, "Mississauga");
});

test("invalid-200 responses are rejected before they replace the last good bundle", async () => {
  const badImage = {
    ...bundle,
    contentVersion: 2,
    publishedAt: "2026-10-23T00:00:00.000Z",
    slots: [{ ...bundle.slots![0], image: "javascript:alert(1)" }],
  };
  const cases: Array<{ name: string; body: string; status?: number }> = [
    { name: "http", body: JSON.stringify(bundle), status: 500 },
    { name: "invalid-json", body: "{not json" },
    { name: "schema-version", body: JSON.stringify({ ...bundle, schemaVersion: 2, contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "wrong-store", body: JSON.stringify({ ...bundle, storeCode: "GJC01", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z", slots: [{ ...bundle.slots![0], textBar: "SHOULD NOT RENDER" }] }) },
    { name: "wrong-domain", body: JSON.stringify({ ...bundle, domain: "example.com", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "missing-identity", body: JSON.stringify({ ...bundle, jobId: "", contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
    { name: "oversized", body: JSON.stringify({ ...bundle, sourceHash: "x".repeat(FLEET_MAX_BUNDLE_BYTES) }) },
    { name: "bad-image-url", body: JSON.stringify(badImage) },
    { name: "published-at-older", body: JSON.stringify({ ...bundle, contentVersion: 2, publishedAt: "2020-01-01T00:00:00.000Z" }) },
    { name: "duplicate-version", body: JSON.stringify({ ...bundle, publishedAt: "2026-10-23T00:00:00.000Z", slots: [{ ...bundle.slots![0], textBar: "SHOULD NOT RENDER" }] }) },
    { name: "decreasing-version", body: JSON.stringify({ ...bundle, contentVersion: 0, publishedAt: "2026-10-23T00:00:00.000Z" }) },
  ];

  for (const item of cases) {
    const direct = item.status && item.status !== 200
      ? rejectHttp(item.status)
      : parseBundle(item.body, bundle);
    assert.equal(direct?.ok, false, item.name);
    if (direct && !direct.ok) assert.equal(direct.reason, item.name);

    await acceptFixture();
    const { fetchImpl } = fetchServing({
      [MANIFEST_URL]: { body: JSON.stringify({ ...manifest, contentVersion: 2, publishedAt: "2026-10-23T00:00:00.000Z" }) },
      [BUNDLE_URL]: { body: item.body, status: item.status ?? 200 },
    });
    const kept = await readFleetContent({
      manifestUrl: MANIFEST_URL,
      fetchImpl,
      emergencyCoded: false,
      renderedAt: "2026-10-23T00:00:01.000Z",
    });
    assert.equal(kept.contentVersion, 1, item.name);
    assert.equal(kept.banners[0].textBar, "Sheet weed text bar", item.name);
    assert.equal(kept.version, "GAC01:1", item.name);
    assert.equal(kept.manifest, "err", item.name);
  }
});

test("a blank cell keeps coded copy and a missing image becomes the bold category banner", async () => {
  const { state: live } = await acceptFixture();
  assert.equal(live.banners[1].textBar, CODED_BANNERS[1].textBar);
  assert.equal(live.banners[1].alt, CODED_BANNERS[1].alt);
  assert.equal(live.nap.street, CODED_NAP.street);
  assert.equal(live.nap.phoneDisplay, CODED_NAP.phoneDisplay);
  assert.equal(live.pages.Contact.metaDescription, CODED_PAGES.Contact.metaDescription);
  assert.equal(live.banners[3].hidden, true);

  const broken = structuredClone(bundle);
  broken.slots![0].image = "";
  const banners = resolveBanners(broken);
  assert.equal(banners[0].render, "text");
  assert.equal(banners[0].image, "");
  assert.equal(banners[0].categoryName, "Exotic Weed");
  assert.equal(banners[0].textBar, "Sheet weed text bar");

  broken.slots![0].image = "https://example.public.blob.vercel-storage.com/weed.webp";
  const kept = resolveBanners(broken);
  assert.equal(kept[0].render, "image");
  assert.equal(kept[0].image, "https://example.public.blob.vercel-storage.com/weed.webp");
  const bannerSource = readFileSync(new URL("../app/components/FleetSheetBanners.tsx", import.meta.url), "utf8");
  const welcomeSource = readFileSync(new URL("../app/HomePageClient.tsx", import.meta.url), "utf8");
  assert.match(bannerSource, /nextBannerSrc\(src, coded\?\.image\)/);
  assert.match(bannerSource, /data-fleet-text-banner/);
  assert.match(welcomeSource, /nextBannerSrc\(src, coded\)/);
  const weed = CODED_BANNERS.find((banner) => banner.id === "weed")!;
  const welcome = CODED_BANNERS.find((banner) => banner.id === "welcome")!;
  assert.equal(nextBannerSrc("https://sheet.example/custom.webp", weed.image), weed.image);
  assert.equal(nextBannerSrc(weed.image, weed.image), null);
  assert.equal(nextBannerSrc("https://sheet.example/custom.webp", ""), null);
  assert.equal(nextBannerSrc("https://sheet.example/custom.webp", "  "), null);
  assert.equal(nextBannerSrc("https://sheet.example/welcome.webp", welcome.image), welcome.image);
  assert.notEqual(welcome.image, weed.image);
  assert.equal(codedBannerFor("welcome")?.image, welcome.image);
  assert.equal(codedBannerFor("weed")?.id, "weed");
  assert.match(bannerSource, /#04150c/);
  assert.match(bannerSource, /#22c55e/);
  assert.match(bannerSource, /aria-label=\{banner\.alt\}/);
  assert.match(bannerSource, /title=\{banner\.title\}/);
  assert.match(bannerSource, /\{banner\.textBar\}/);
  assert.match(welcomeSource, /#04150c/);
  assert.match(welcomeSource, /aria-label=\{banner\.alt\}/);
  assert.match(welcomeSource, /data-fleet-welcome-bar/);
  assert.doesNotMatch(welcomeSource, /if \(failed\) return null/);
});

test("Follow ALL, Custom, Coded and Hidden each resolve on their own", () => {
  assert.deepEqual(resolveModeValue("Follow ALL", "ignored", "coded", "all value"), { hidden: false, value: "all value" });
  assert.deepEqual(resolveModeValue("Follow ALL", "ignored", "coded", "  "), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Custom", "custom value", "coded"), { hidden: false, value: "custom value" });
  assert.deepEqual(resolveModeValue("Custom", "", "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Custom", "call 3.5", "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Custom", "telnyx desk", "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Coded", "custom value", "coded"), { hidden: false, value: "coded" });
  assert.deepEqual(resolveModeValue("Hidden", "custom value", "coded"), { hidden: true, value: "coded" });

  const follow = structuredClone(bundle);
  follow.slots![0].mode = "Follow ALL";
  assert.equal(resolveBanners(follow)[0].textBar, "ALL weed text bar");
  follow.slots![0].mode = "Coded";
  assert.equal(resolveBanners(follow)[0].textBar, CODED_BANNERS[0].textBar);
  assert.equal(resolveBanners(follow)[0].image, CODED_BANNERS[0].image);
  assert.equal(resolveNap(null).name, CODED_NAP.name);
  assert.equal(resolveNap(null).city, "Mississauga");
  assert.equal(resolvePages(bundle).Home.metaDescription, CODED_PAGES.Home.metaDescription);

  const withMeta = structuredClone(bundle);
  withMeta.slots!.push({
    page: "Home",
    spot: "Page meta",
    mode: "Custom",
    metaTitle: "Sheet home title",
    metaDescription: "Sheet home description",
    description: "Sheet home description",
  });
  withMeta.slots!.push({
    page: "Home",
    spot: "Top banner",
    mode: "Coded",
    metaTitle: "",
    metaDescription: "",
    description: "",
  });
  const pages = resolvePages(withMeta);
  assert.equal(pages.Home.metaTitle, "Sheet home title");
  assert.equal(pages.Home.metaDescription, "Sheet home description");
  withMeta.slots!.find((slot) => slot.spot === "Page meta")!.mode = "Coded";
  assert.equal(resolvePages(withMeta).Home.metaDescription, CODED_PAGES.Home.metaDescription);

  assert.equal(phoneToTel("2895149467", CODED_NAP.phoneTel), "+12895149467");
  assert.equal(phoneToTel("(289) 514-9467", CODED_NAP.phoneTel), "+12895149467");
  assert.equal(phoneToTel("1 (289) 514-9467", CODED_NAP.phoneTel), "+12895149467");
  assert.equal(phoneToTel("+1 289-514-9467", CODED_NAP.phoneTel), "+12895149467");
  assert.equal(phoneToTel("not a phone", CODED_NAP.phoneTel), CODED_NAP.phoneTel);
});

test("Home sheet spots hide or override without moving the coded fallback", () => {
  const welcome = CODED_BANNERS.find((banner) => banner.id === "welcome");
  const cigarettes = CODED_BANNERS.find((banner) => banner.id === "cigarettes");
  assert.equal(welcome?.spot, "Promo banner 3");
  assert.equal(cigarettes?.spot, "Coded cigarette banner");
  assert.equal(CODED_BANNERS.map((banner) => banner.spot).filter((spot) => spot.startsWith("Promo") || spot === "Top banner").join(","), "Top banner,Promo banner 2,Promo banner 4,Promo banner 3");

  const coded = resolveBanners(null);
  assert.equal(coded.find((banner) => banner.id === "welcome")?.image, "/banners/welcome_banner.webp");
  assert.equal(coded.find((banner) => banner.id === "welcome")?.alt, "Green Air Cannabis Dispensary Weed Delivery");
  assert.equal(coded.find((banner) => banner.id === "welcome")?.hidden, false);
  assert.equal(bannerMatchesCoded(coded.find((banner) => banner.id === "welcome")!), true);
  assert.equal(bannersMatchCoded(coded.filter((banner) => banner.id !== "welcome")), true);

  const hiddenWelcome = structuredClone(bundle);
  hiddenWelcome.slots!.find((slot) => slot.spot === "Promo banner 3")!.mode = "Hidden";
  hiddenWelcome.slots!.find((slot) => slot.spot === "Promo banner 3")!.image = "/banners/other.webp";
  hiddenWelcome.slots!.find((slot) => slot.spot === "Promo banner 3")!.textBar = "do not show";
  const hidden = resolveBanners(hiddenWelcome);
  assert.equal(hidden.find((banner) => banner.id === "welcome")?.hidden, true);
  assert.equal(hidden.find((banner) => banner.id === "cigarettes")?.hidden, false);
  assert.equal(hidden.find((banner) => banner.id === "weed")?.hidden, false);
  assert.equal(hidden.find((banner) => banner.id === "vapes")?.hidden, false);
  assert.equal(bannerMatchesCoded(hidden.find((banner) => banner.id === "cigarettes")!), true);

  const customWelcome = structuredClone(bundle);
  const promo3 = customWelcome.slots!.find((slot) => slot.spot === "Promo banner 3")!;
  promo3.mode = "Custom";
  promo3.image = "/banners/sheet-welcome.webp";
  promo3.alt = "Sheet welcome alt";
  promo3.title = "Sheet welcome title";
  promo3.textBar = "Sheet welcome bar";
  promo3.caption = "Sheet welcome caption";
  const custom = resolveBanners(customWelcome).find((banner) => banner.id === "welcome")!;
  assert.equal(custom.hidden, false);
  assert.equal(custom.render, "image");
  assert.equal(custom.image, "/banners/sheet-welcome.webp");
  assert.equal(custom.alt, "Sheet welcome alt");
  assert.equal(custom.title, "Sheet welcome title");
  assert.equal(custom.textBar, "Sheet welcome bar");
  assert.equal(custom.caption, "Sheet welcome caption");
  assert.equal(bannerMatchesCoded(custom), false);

  const blankImage = structuredClone(bundle);
  const blank = blankImage.slots!.find((slot) => slot.spot === "Promo banner 3")!;
  blank.mode = "Custom";
  blank.image = "";
  blank.textBar = "";
  blank.alt = "";
  blank.title = "";
  blank.caption = "";
  const textWelcome = resolveBanners(blankImage).find((banner) => banner.id === "welcome")!;
  assert.equal(textWelcome.render, "text");
  assert.equal(textWelcome.categoryName, "Welcome");
  assert.equal(textWelcome.alt, "Green Air Cannabis Dispensary Weed Delivery");

  const top = resolveBanners(bundle).find((banner) => banner.spot === "Top banner")!;
  assert.equal(top.image, "/banners/core-top-weed.webp");
  assert.equal(top.alt, "Sheet weed alt");
  assert.equal(top.title, "Sheet weed title");
  assert.equal(top.textBar, "Sheet weed text bar");
  assert.equal(top.caption, "Sheet weed caption");
  const vapes = resolveBanners(bundle).find((banner) => banner.spot === "Promo banner 2")!;
  assert.equal(vapes.textBar, CODED_BANNERS.find((banner) => banner.id === "vapes")!.textBar);
  assert.equal(vapes.image, CODED_BANNERS.find((banner) => banner.id === "vapes")!.image);

  const promo1 = structuredClone(bundle);
  promo1.slots!.push({ page: "Home", spot: "Promo banner 1", mode: "Hidden", image: "/banners/extra.webp", textBar: "extra" });
  const withPromo1 = resolveBanners(promo1);
  assert.equal(withPromo1.some((banner) => banner.spot === "Promo banner 1"), false);
  assert.equal(withPromo1.length, CODED_BANNERS.length);

  const meta = structuredClone(bundle);
  meta.slots!.push({
    page: "Home",
    spot: "Page meta",
    mode: "Hidden",
    metaTitle: "Hidden title",
    metaDescription: "Hidden description",
    description: "Hidden description",
  });
  assert.equal(resolvePages(meta).Home.metaTitle, CODED_PAGES.Home.metaTitle);
  assert.equal(resolvePages(meta).Home.metaDescription, CODED_PAGES.Home.metaDescription);
  assert.equal(resolvePages(meta).Home.description, CODED_PAGES.Home.description);
  meta.slots!.find((slot) => slot.spot === "Page meta")!.mode = "Custom";
  assert.equal(resolvePages(meta).Home.metaDescription, "Hidden description");

  const home = readFileSync(new URL("../app/HomePageClient.tsx", import.meta.url), "utf8");
  const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(home, /welcomeBanner\.hidden \? null/);
  assert.match(home, /src=\{welcomeBannerSrc\}/);
  assert.match(home, /alt="Green Air Cannabis Dispensary Weed Delivery"/);
  assert.match(home, /data-fleet-welcome-bar/);
  assert.match(page, /banner\.id !== "welcome"/);
  assert.match(page, /welcomeBanner=\{welcomeBanner\}/);
});

test("the version marker, tv manifest 304, emergency coded flag, and revalidate secret stay in their lanes", async () => {
  assert.equal(fleetVersion(null), "GAC01:coded");
  assert.equal(fleetVersion(4), "GAC01:4");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /<meta name="fleet-content-version" content=\{fleet\.version\} \/>/);
  assert.match(readFileSync(new URL("../app/api/revalidate/route.ts", import.meta.url), "utf8"), /revalidateTag\(FLEET_CONTENT_TAG, "max"\)/);
  const manifestRoute = readFileSync(new URL("../app/api/tv-manifest/route.ts", import.meta.url), "utf8");
  assert.match(manifestRoute, /s-maxage=60/);
  assert.match(manifestRoute, /stale-while-revalidate=300/);
  assert.equal(TV_MANIFEST_CACHE_CONTROL, "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
  const statusRoute = readFileSync(new URL("../app/api/content-status/route.ts", import.meta.url), "utf8");
  assert.match(statusRoute, /manifest: fleet\.manifest/);
  assert.match(statusRoute, /mode: fleet\.mode/);
  assert.doesNotMatch(statusRoute, /process\.env|FLEET_REVALIDATE_SECRET|EDGE_CONFIG/);
  assert.ok(FLEET_AFFECTED_PATHS.includes("/items/cigarettes"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/cigarettes"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/tv"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/tv2"));
  assert.ok(FLEET_AFFECTED_PATHS.includes("/articles"));
  assert.doesNotMatch(manifestRoute, /export const dynamic = "force-dynamic"/);
  assert.doesNotMatch(manifestRoute, /from ["']next\/headers["']/);

  const coded = await readFleetContent({ manifestUrl: "", emergencyCoded: false, renderedAt: "2026-10-22T00:00:00.000Z" });
  const miss = tvManifestDecision(coded, '"other"');
  assert.equal(miss.status, 200);
  assert.equal(miss.etag, '"GAC01-coded"');
  assert.equal(tvManifestDecision(coded, miss.etag).status, 304);

  const { state: live } = await acceptFixture();
  assert.equal(tvManifestDecision(live, '"GAC01-1"').status, 304);
  const manifestBody = tvManifestDecision(live, null).body;
  assert.equal(manifestBody?.bundleUrl, BUNDLE_URL);
  assert.equal(manifestBody?.contentVersion, 1);
  assert.equal((await readFleetContent({ manifestUrl: MANIFEST_URL, emergencyCoded: true, renderedAt: "2026-10-22T00:00:00.000Z" })).version, "GAC01:coded");

  assert.equal(revalidateAuthorized("right-secret", "right-secret"), true);
  assert.equal(revalidateAuthorized("wrong-secret", "right-secret"), false);
  assert.equal(revalidateAuthorized(null, "right-secret"), false);
  assert.equal(revalidateAuthorized("right-secret", ""), false);
  const secretSource = readFileSync(new URL("../app/lib/fleet/secret.ts", import.meta.url), "utf8");
  assert.match(secretSource, /FLEET_REVALIDATE_ENV/);
  assert.doesNotMatch(secretSource, /right-secret/);

  const previous = process.env.EDGE_CONFIG;
  const previousMode = process.env.contentMode;
  delete process.env.contentMode;
  process.env.EDGE_CONFIG = "https://edge-config.vercel.com/ecfg-test?token=test-token";
  let requestUrl = "";
  const fetchImpl = async (url: string | URL, init?: RequestInit) => {
    requestUrl = String(url);
    const auth = new Headers(init?.headers).get("authorization") || "";
    assert.equal(auth.startsWith("Bearer "), true);
    assert.equal(auth.includes(" "), true);
    return responseFor(JSON.stringify("coded"));
  };
  try {
    assert.equal(await readEmergencyCoded(fetchImpl as typeof fetch), true);
    assert.equal(requestUrl.includes("token"), false);
    process.env.contentMode = "coded";
    assert.equal(await readEmergencyCoded(fetchImpl as typeof fetch), true);
  } finally {
    if (previous == null) delete process.env.EDGE_CONFIG;
    else process.env.EDGE_CONFIG = previous;
    if (previousMode == null) delete process.env.contentMode;
    else process.env.contentMode = previousMode;
  }
});

test("manifest identity failures and a wrong-store manifest do not publish", () => {
  assert.equal(parseManifest(JSON.stringify({ ...manifest, storeCode: "GJC01" })).ok, false);
  assert.equal(parseManifest("{").ok, false);
  const missing = parseBundle(JSON.stringify({ schemaVersion: 1 }), null);
  assert.equal(missing.ok, false);
  if (!missing.ok) assert.equal(missing.reason, "missing-identity");
});

test("TV2 card slots and fullscreen promos stay empty unless a Custom row is inside its window", () => {
  assert.deepEqual(resolveTvCards(bundle, new Date("2026-10-22T12:00:00.000Z")), {});
  assert.deepEqual(resolveFullscreenPromos(bundle, new Date("2026-10-22T12:00:00.000Z")), []);
  assert.equal(inPromoWindow("2026-10-22T12:00:00.000Z", "2026-10-22T13:00:00.000Z", new Date("2026-10-22T12:30:00.000Z")), true);
  assert.equal(inPromoWindow("not-a-date", "2026-10-22T13:00:00.000Z", new Date("2026-10-22T12:30:00.000Z")), false);

  const withTv = structuredClone(bundle);
  withTv.slots!.push(
    { page: "TV2", spot: "CIGARETTES", mode: "Custom", image: "/promo.webp", offImage: "/off.webp", alt: "Cig promo", promoStart: "2026-10-22T12:00:00.000Z", promoEnd: "2026-10-22T13:00:00.000Z" },
    { page: "TV2", spot: "VAPES", mode: "Coded", image: "/should-not.webp", offImage: "/nope.webp", promoStart: "2026-10-22T12:00:00.000Z", promoEnd: "2026-10-22T13:00:00.000Z" },
    { page: "TV", spot: "Fullscreen promo 1", mode: "Custom", image: "/full.webp", alt: "Full", promoStart: "2026-10-22T12:00:00.000Z", promoEnd: "2026-10-22T13:00:00.000Z", showSeconds: 8, everyMinutes: 2 },
    { page: "TV", spot: "Fullscreen promo 2", mode: "Custom", image: "/late.webp", promoStart: "2026-10-22T18:00:00.000Z", promoEnd: "2026-10-22T19:00:00.000Z" },
    { page: "TV", spot: "Fullscreen promo 3", mode: "Hidden", image: "/hidden.webp", promoStart: "2026-10-22T12:00:00.000Z", promoEnd: "2026-10-22T13:00:00.000Z" },
  );
  const now = new Date("2026-10-22T12:30:00.000Z");
  const cards = resolveTvCards(withTv, now);
  assert.equal(cards.CIGARETTES.promoImage, "/promo.webp");
  assert.equal(cards.CIGARETTES.offImage, "/off.webp");
  assert.equal(cards.VAPES, undefined);
  assert.equal(resolveTvCards(withTv, new Date("2026-10-22T14:00:00.000Z")).CIGARETTES.promoImage, null);
  assert.equal(resolveTvCards(withTv, new Date("2026-10-22T14:00:00.000Z")).CIGARETTES.offImage, "/off.webp");
  const full = resolveFullscreenPromos(withTv, now);
  assert.equal(full.length, 1);
  assert.equal(full[0].spot, "Fullscreen promo 1");
  assert.equal(full[0].showSeconds, 8);
  assert.equal(full[0].everyMinutes, 2);
  assert.deepEqual(resolveFullscreenPromos(withTv, new Date("2026-10-22T18:30:00.000Z")).map((promo) => promo.spot), ["Fullscreen promo 2"]);
  assert.equal(resolveFullscreenPromos(withTv, new Date("2026-10-22T18:30:00.000Z"))[0].showSeconds, 5);
  assert.equal(resolveFullscreenPromos(withTv, new Date("2026-10-22T18:30:00.000Z"))[0].everyMinutes, 1);

  const cig = cards.CIGARETTES;
  assert.equal(pickTv2Sheet(cig, { categoryOff: false, noItems: false, promoBroken: false, offBroken: false })?.kind, "promo");
  assert.equal(pickTv2Sheet(cig, { categoryOff: true, noItems: false, promoBroken: false, offBroken: false })?.kind, "off");
  assert.equal(pickTv2Sheet(cig, { categoryOff: false, noItems: true, promoBroken: true, offBroken: false })?.kind, "off");
  assert.equal(pickTv2Sheet(cig, { categoryOff: false, noItems: false, promoBroken: true, offBroken: false }), null);
  assert.deepEqual(TV2_CARDS, ["PREROLLS_ADDONS", "VAPES", "EDIBLES", "CONCENTRATES", "CIGARETTES", "MAGIC"]);
  assert.deepEqual(TV_FULLSCREEN_SPOTS, ["Fullscreen promo 1", "Fullscreen promo 2", "Fullscreen promo 3"]);

  const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
  assert.match(tv2, /pickTv2Sheet/);
  assert.match(tv2, /onError=\{markBroken\}/);
  assert.match(tv2, /naturalWidth === 0/);
  assert.match(tv2, /useFleetTvManifest/);
  assert.match(tv, /FleetTvTakeover/);
  const tvLayout = readFileSync(new URL("../app/tv/layout.tsx", import.meta.url), "utf8");
  const tv2Layout = readFileSync(new URL("../app/tv2/layout.tsx", import.meta.url), "utf8");
  assert.match(tvLayout, /Green Air Cannabis In-Store Flower Display/);
  assert.match(tv2Layout, /Green Air Cannabis In-Store Accessories Display/);
  assert.match(tvLayout, /robots: \{ index: false, follow: false \}/);
  assert.match(tv2Layout, /robots: \{ index: false, follow: false \}/);
  assert.match(readFileSync(new URL("../app/components/fleet/TvPromoTakeover.tsx", import.meta.url), "utf8"), /TV_PROMO_INITIAL_DELAY_MS/);
  assert.match(readFileSync(new URL("../app/api/tv-manifest/route.ts", import.meta.url), "utf8"), /s-maxage=60, stale-while-revalidate=300/);
});

test("the page meta version equals the manifest version, and the env URL still wins", async () => {
  const previous = process.env.FLEET_CONTENT_MANIFEST_URL;
  assert.match(readFileSync(new URL("../app/contact/page.tsx", import.meta.url), "utf8"), /export const dynamic = "force-dynamic"/);
  assert.match(readFileSync(new URL("../app/tv/layout.tsx", import.meta.url), "utf8"), /export const dynamic = "force-dynamic"/);
  assert.match(readFileSync(new URL("../app/tv2/layout.tsx", import.meta.url), "utf8"), /export const dynamic = "force-dynamic"/);
  assert.equal(defaultManifestUrl(), "https://dhaah0upvlpukv56.public.blob.vercel-storage.com/GAC01/manifest.json");

  delete process.env.FLEET_CONTENT_MANIFEST_URL;
  resetFleetContentCache();
  const blobUrl = defaultManifestUrl();
  const served = fetchServing({
    [blobUrl]: { body: JSON.stringify(manifest), headers: { etag: '"GAC01-1"' } },
    [BUNDLE_URL]: { body: JSON.stringify(bundle) },
  });
  try {
    const state = await readFleetContent({
      fetchImpl: served.fetchImpl,
      emergencyCoded: false,
      renderedAt: "2026-10-22T12:00:01.000Z",
    });
    assert.deepEqual(served.calls, [blobUrl, BUNDLE_URL]);
    assert.equal(state.active, true);
    assert.equal(state.contentVersion, manifest.contentVersion);
    assert.equal(state.version, `GAC01:${manifest.contentVersion}`);
    assert.deepEqual(state.tvCards, {});
    assert.deepEqual(state.fullscreenPromos, []);

    const missing = fetchServing({});
    resetFleetContentCache();
    const coded = await readFleetContent({
      fetchImpl: missing.fetchImpl,
      emergencyCoded: false,
      renderedAt: "2026-10-22T00:00:00.000Z",
    });
    assert.deepEqual(missing.calls, [blobUrl]);
    assert.equal(coded.version, "GAC01:coded");
    assert.equal(coded.mode, "coded");

    resetFleetContentCache();
    process.env.FLEET_CONTENT_MANIFEST_URL = MANIFEST_URL;
    const fromEnv = fetchServing({
      [MANIFEST_URL]: { body: JSON.stringify(manifest), headers: { etag: '"GAC01-1"' } },
      [BUNDLE_URL]: { body: JSON.stringify(bundle) },
    });
    const envState = await readFleetContent({
      fetchImpl: fromEnv.fetchImpl,
      emergencyCoded: false,
      renderedAt: "2026-10-22T12:00:01.000Z",
    });
    assert.deepEqual(fromEnv.calls, [MANIFEST_URL, BUNDLE_URL]);
    assert.equal(envState.version, `GAC01:${manifest.contentVersion}`);
  } finally {
    if (previous == null) delete process.env.FLEET_CONTENT_MANIFEST_URL;
    else process.env.FLEET_CONTENT_MANIFEST_URL = previous;
    resetFleetContentCache();
  }
});

test("coded content keeps the redirect and an explicit web off stays on the URL", () => {
  assert.equal(cigaretteAccessFrom({ fleetActive: false, decision: { show: false, reason: "off" }, codedShow: false }), "redirect");
  assert.equal(cigaretteAccessFrom({ fleetActive: true, decision: { show: false, reason: "off" }, codedShow: false }), "unavailable");
  assert.equal(cigaretteAccessFrom({ fleetActive: true, decision: { show: false, reason: "error" }, codedShow: false }), "redirect");
  assert.equal(cigaretteAccessFrom({ fleetActive: true, decision: { show: true, reason: "error" }, codedShow: true }), "redirect");
  assert.equal(cigaretteAccessFrom({ fleetActive: true, decision: { show: true, reason: "missing" }, codedShow: true }), "redirect");
  assert.equal(cigaretteAccessFrom({ fleetActive: true, decision: { show: true, reason: "on" }, codedShow: false }), "show");
  assert.equal(cigaretteAccessFrom({ fleetActive: false, decision: { show: true, reason: "on" }, codedShow: true }), "show");
});
