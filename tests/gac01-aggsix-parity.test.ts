import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { TIER_SEO } from "../app/lib/tierSeoContent.ts";
import { ORGANIC_HUB_CARDS, PATHS } from "../app/lib/organicPaths.ts";
import {
  DOCUMENT_TITLE_BRAND,
  renderedDocumentTitle,
  storeClaimsOpen24Hours,
} from "../app/lib/localSeo.ts";

const read = (relativePath: string) =>
  fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

const CORRIDOR = /Airport Rd|Airport Road|Malton/;
const WEIGHT_FAIL = /(?<![0-9.])(?:3\.5|7)\s?g\b/i;

/** Distinctive Planets 59 (Peel) cig/vape sentences. GAC01 must not reuse them. */
const P59_CIG_VAPE_SENTENCES = [
  "PLANETS 59 at 8500 Torbram Rd Unit 59 lists Native cigarettes in the cigarette category.",
  "Neighbours on Torbram Road, Airport Road, and Steeles Avenue East can walk in at the numbered bay.",
  "After you park in the Torbram-facing lot at civic 8500, walk the unit numbers until the bay marked 59.",
  "Airport Road gets you to Steeles Avenue East; it does not host a second PLANETS 59 cigarette counter.",
  "Open the cigarette category first. Listings may include carton-style Native smoke names such as BB Lights, BB Full, Canadian Lights, Canadian Full, or Canadian Classics Silver when those lines are posted.",
  "Cigarette walk-in is 24 hours at Unit 59. Delivery is a separate 10 a.m.–10 p.m. courier and is not a 24-hour smoke drop-off.",
  "Yes. PLANETS 59 lists Native cigarettes in the cigarette category at 8500 Torbram Rd Unit 59.",
  "The walk-in counter is PLANETS 59 at 8500 Torbram Rd Unit 59, Brampton, ON L6T 5C6.",
  "Yes. Nicotine vapes have a dedicated category, separate from THC vapes. Open /items/vapes for current names, then walk in at 8500 Torbram Rd Unit 59.",
  "Use this neighbourhood page for Torbram / Airport Road intent, then the nicotine vape menu for listings.",
  "No. Nicotine vapes stay under /items/vapes. THC and cannabis vapes stay under /items/vape-disposables.",
  "Those names appear on the live nicotine vape menu when posted. This page does not promise stock, puff-count performance, or a price.",
];

function brandCount(title: string) {
  return title.split(DOCUMENT_TITLE_BRAND).length - 1;
}

function sentencesOf(text: string) {
  const plain = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ");
  return plain
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 60);
}

function wordGrams(text: string, size: number) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const grams = new Set<string>();
  for (let index = 0; index <= words.length - size; index += 1) {
    grams.add(words.slice(index, index + size).join(" "));
  }
  return grams;
}

function jaccard(left: Set<string>, right: Set<string>) {
  let overlap = 0;
  for (const gram of left) {
    if (right.has(gram)) overlap += 1;
  }
  const union = left.size + right.size - overlap;
  return union === 0 ? 0 : overlap / union;
}

test("G1 corridor tokens are in every flower tier title and H1", () => {
  for (const [key, tier] of Object.entries(TIER_SEO)) {
    assert.match(tier.seoTitle, CORRIDOR, `${key} title missing corridor token`);
    assert.match(tier.h1, CORRIDOR, `${key} H1 missing corridor token`);
    assert.doesNotMatch(tier.seoTitle, /\bToronto\b/, `${key} title uses Toronto as an owner`);
    assert.doesNotMatch(tier.h1, /\bToronto\b/, `${key} H1 uses Toronto as an owner`);
    assert.equal(brandCount(renderedDocumentTitle(tier.seoTitle)), 1, tier.seoTitle);
  }

  const tierPage = read("app/[tier]/page.tsx");
  assert.match(tierPage, /seo\?\.h1 \|\| config\.name/);

  const cig = read("app/native-cigarettes-malton/page.tsx");
  const vape = read("app/nicotine-vape-malton/page.tsx");
  assert.match(cig, /Native Cigarettes on Airport Rd \| Green Air Cannabis/);
  assert.match(cig, /<h1 className=\{styles\.h1\}>Native Cigarettes on Airport Rd<\/h1>/);
  assert.match(vape, /Nicotine Vapes on Airport Rd \| Green Air Cannabis/);
  assert.match(vape, /<h1 className=\{styles\.h1\}>Nicotine Vapes on Airport Rd<\/h1>/);
  assert.doesNotMatch(cig, /<h1[^>]*>\s*Native [Cc]igarettes\s*</);
  assert.doesNotMatch(vape, /<h1[^>]*>\s*Nicotine Vape\s*</);
});

test("G2 every tier route builds CollectionPage and a stocked ItemList plus FAQ", () => {
  const tierPage = read("app/[tier]/page.tsx");
  assert.match(tierPage, /"@type": "CollectionPage"/);
  assert.match(tierPage, /"@type": "ItemList"/);
  assert.match(tierPage, /itemListElement: flowers\.map/);
  assert.match(tierPage, /faqPageJsonLd\(seo\.faqs, pageUrl\)/);
  assert.match(tierPage, /"@id": `\$\{STORE_NAP\.canonicalHost\}\/#store`/);
  for (const tier of Object.values(TIER_SEO)) {
    assert.ok(tier.faqs.length >= 3, tier.h1);
  }
  assert.match(read("app/lib/localSeo.ts"), /"@type": "CannabisStore"/);
});

test("G3 homepage hub cards follow the site's own 24-hour claim", () => {
  const home = read("app/page.tsx");
  const hoursPage = read("app/24-hour-malton-dispensary/page.tsx");
  assert.equal(storeClaimsOpen24Hours(), true);
  assert.match(home, /className=\{styles\.hubCard\}/);
  assert.match(home, /onlyWhen24h \|\| storeClaimsOpen24Hours\(\)/);
  for (const href of [
    PATHS.weedDispensaryLp,
    PATHS.twentyFour,
    PATHS.deliveryLp,
    PATHS.nativeCigarettesLp,
    PATHS.nicotineVapeLp,
    PATHS.visit,
  ]) {
    assert.equal(ORGANIC_HUB_CARDS.some((card) => card.href === href), true, href);
  }
  assert.equal(
    ORGANIC_HUB_CARDS.find((card) => card.href === PATHS.twentyFour)?.onlyWhen24h,
    true,
  );
  assert.match(hoursPage, /if \(!storeClaimsOpen24Hours\(\)\) notFound\(\)/);
  assert.doesNotMatch(hoursPage, /notFound\(\);\s*notFound\(\)/);
});

test("G4 Malton cig and vape copy does not reuse Planets 59 sentences", () => {
  const corpus = [
    read("app/native-cigarettes-malton/page.tsx"),
    read("app/nicotine-vape-malton/page.tsx"),
  ].join("\n");
  const gacSentences = sentencesOf(corpus);
  let shared = 0;
  for (const sentence of P59_CIG_VAPE_SENTENCES) {
    assert.ok(sentence.length >= 60, sentence);
    const hit = corpus.includes(sentence) || gacSentences.some((line) => line.includes(sentence));
    if (hit) shared += 1;
  }
  assert.ok(shared < 4, `shared Planets 59 sentences: ${shared}`);
  assert.equal(shared, 0);

  const gacGrams = wordGrams(corpus, 8);
  const peerGrams = wordGrams(P59_CIG_VAPE_SENTENCES.join(" "), 8);
  const score = jaccard(gacGrams, peerGrams);
  assert.ok(score < 0.05, `8-gram Jaccard ${score}`);
  assert.doesNotMatch(corpus, /PLANETS 59|Torbram|Unit 59|8500 Torbram/);
});

test("G5 document title guard keeps the brand to one occurrence", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /template: "%s \| Green Air Cannabis"/);
  assert.match(layout, /renderedDocumentTitle\(/);

  const samples = [
    "FAQ | Green Air Cannabis",
    "Cannabis Edibles Mississauga | Green Air Cannabis",
    "Native Cigarettes on Airport Rd | Green Air Cannabis",
    "Foo | Green Air Cannabis | Green Air Cannabis",
    "Green Air Cannabis | Green Air Cannabis",
    "Exotic Weed on Airport Rd in Malton | Green Air Cannabis",
  ];
  for (const sample of samples) {
    assert.equal(brandCount(renderedDocumentTitle(sample)), 1, sample);
  }
  assert.equal(
    renderedDocumentTitle("Malton Airport Rd Dispensary"),
    "Malton Airport Rd Dispensary | Green Air Cannabis",
  );

  for (const file of [
    "app/faq/page.tsx",
    "app/contact/page.tsx",
    "app/flower/[slug]/page.tsx",
    "app/item/[slug]/page.tsx",
    "app/items/[category]/page.tsx",
    "app/info/[seoPage]/page.tsx",
    "app/[tier]/page.tsx",
  ]) {
    if (file.endsWith("contact/page.tsx")) {
      assert.doesNotMatch(read(file), /title: "Contact Us — 7060 Airport Rd, Malton \| Green Air Cannabis"/);
      continue;
    }
    assert.match(read(file), /resolveDocumentTitle\(/, file);
  }
});

test("G6 mobile age gate stays inside the viewport and the menu has a hamburger label", () => {
  const ageCss = read("app/components/AgeGate.module.css");
  const ageGate = read("app/components/AgeGate.tsx");
  const nav = read("app/components/Navbar.tsx");
  assert.match(ageCss, /max-width:\s*100vw/);
  assert.match(ageCss, /max-height:\s*calc\(100dvh - 32px\)/);
  assert.match(ageCss, /overscroll-behavior:\s*contain/);
  assert.match(ageCss, /\.btnRow > \*/);
  assert.match(ageGate, /document\.body\.style\.overflow = "hidden"/);
  assert.match(nav, /aria-label=\{menuOpen \? "Close menu" : "Open menu"\}/);
  assert.match(nav, /aria-controls="mobile-store-menu"/);
  assert.match(nav, /d="M4 6h16M4 12h16M4 18h16"/);
});

test("G7 flower copy does not use 3.5g or 7g", () => {
  const root = new URL("../app", import.meta.url);
  const files: string[] = [];
  const walk = (directory: string) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (!/\.(tsx|ts)$/.test(entry.name)) continue;
      if (/flowers\.json|items\.json|delivery-menu\.json/.test(entry.name)) continue;
      files.push(fullPath);
    }
  };
  walk(root.pathname);
  assert.ok(files.length > 20);
  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal(WEIGHT_FAIL.test(source), false, file);
  }
});

test("G8 apex redirects to www and visit canonical plus NAP stay on the current hours", () => {
  const config = read("next.config.ts");
  const visit = read("app/visit/page.tsx");
  const footer = read("app/components/Footer.tsx");
  const layout = read("app/layout.tsx");
  const local = read("app/lib/localSeo.ts");
  assert.match(config, /type: "host", value: "greenaircannabis\.com"/);
  assert.match(config, /destination: "https:\/\/www\.greenaircannabis\.com\/:path\*"/);
  assert.match(layout, /canonical: STORE_NAP\.canonicalHost/);
  assert.match(visit, /canonical: `\$\{STORE_NAP\.canonicalHost\}\/visit`/);
  assert.match(visit, /MiWay/);
  assert.match(visit, /Parking at the plaza/);
  assert.match(footer, /\+1 \(289\) 514-9467/);
  assert.match(footer, /7060 Airport Rd/);
  assert.match(footer, /Open 24 Hours/);
  assert.match(local, /opens: STORE_SCHEMA_HOURS\.opens/);
  assert.match(local, /closes: STORE_SCHEMA_HOURS\.closes/);
  assert.equal(storeClaimsOpen24Hours(), true);
});

test("G9 generic Mississauga city page is noindex with a canonical away from itself", () => {
  const city = read("app/weed-dispensary-mississauga/page.tsx");
  const robots = read("app/robots.ts");
  const sitemap = read("app/sitemap.ts");
  assert.match(city, /index:\s*false/);
  assert.match(city, /follow:\s*true/);
  assert.match(city, /canonical: `\$\{STORE_NAP\.canonicalHost\}\$\{PATHS\.weedDispensaryLp\}`/);
  assert.doesNotMatch(city, /canonical: `https:\/\/\$\{gbpLocation\.domain\}\/\$\{gbpLocation\.slug\}`/);
  assert.match(robots, /allow: "\/"/);
  assert.match(robots, /disallow: \["\/api\/", "\/staff-photo", "\/staff-photo\/"\]/);
  assert.match(robots, /sitemap: "https:\/\/www\.greenaircannabis\.com\/sitemap\.xml"/);
  assert.doesNotMatch(sitemap, /\/weed-dispensary-mississauga/);
  assert.match(sitemap, /STORE_NAP\.canonicalHost/);
});

test("G10 public pages stay one brand, adults 19+, and free of sister-store language", () => {
  const publicFiles = [
    "app/page.tsx",
    "app/visit/page.tsx",
    "app/components/Footer.tsx",
    "app/components/Navbar.tsx",
    "app/native-cigarettes-malton/page.tsx",
    "app/nicotine-vape-malton/page.tsx",
    "app/weed-dispensary-malton/page.tsx",
    "app/24-hour-malton-dispensary/page.tsx",
    "app/lib/tierSeoContent.ts",
    "app/lib/organicPaths.ts",
    "app/lib/localSeo.ts",
  ];
  const banned =
    /Athena|sister store|our other locations|fleet of stores|our fleet|PLANETS 59|Queen Lansdowne|Gas Junction|Kensington Green|King Rock|Green Pentagon|Ottawa|Gatineau|ByWard|Jane Finch|First Nation|healing ceremony|on reserve/i;
  for (const file of publicFiles) {
    assert.doesNotMatch(read(file), banned, file);
  }
  const corridorCopy = [
    "app/page.tsx",
    "app/visit/page.tsx",
    "app/lib/tierSeoContent.ts",
    "app/native-cigarettes-malton/page.tsx",
    "app/nicotine-vape-malton/page.tsx",
  ]
    .map(read)
    .join("\n");
  assert.match(corridorCopy, /Adults 19\+/);
  assert.match(corridorCopy, /Airport Rd/);
});
