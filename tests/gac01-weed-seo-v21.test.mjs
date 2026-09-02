import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const tiers = [
  ["exotic", "Exotic Weed"],
  ["premium", "Premium Weed"],
  ["aaa", "AAA+ Weed"],
  ["aa", "AA Weed"],
  ["budget", "Budget Weed"],
];

test("all five tiers use tier-first Weed canonicals and customer-facing labels", () => {
  const products = read("app/lib/products.ts");
  const seo = read("app/lib/tierSeoContent.ts");
  const navbar = read("app/components/Navbar.tsx");
  const footer = read("app/components/Footer.tsx");
  const home = read("app/page.tsx");
  for (const [slug, label] of tiers) {
    assert.match(products, new RegExp(`name: "${label.replace("+", "\\+")}"[\\s\\S]{0,40}slug: "${slug}-weed"`));
    assert.ok(seo.includes(`${label} & Cannabis Flower Mississauga`));
    assert.ok(navbar.includes(`href: "/${slug}-weed", label: "${label}"`));
    assert.ok(footer.includes(`href="/${slug}-weed">${label}<`));
    assert.ok(home.includes(`slug: "${slug}-weed"`));
  }
});

test("legacy tier routes redirect directly and internal links contain no bare tier href", () => {
  const redirects = read("next.config.ts");
  const internal = [read("app/components/Navbar.tsx"), read("app/components/Footer.tsx"), read("app/resources/resourceData.ts")].join("\n");
  for (const [slug] of tiers) {
    assert.ok(redirects.includes(`source: "/${slug}", destination: "/${slug}-weed", permanent: true`));
    assert.doesNotMatch(internal, new RegExp(`href[:=] ["']/${slug}["']`));
  }
});

test("nicotine and THC vape categories are explicitly separated without route changes", () => {
  const products = read("app/lib/products.ts");
  const navbar = read("app/components/Navbar.tsx");
  const home = read("app/page.tsx");
  assert.ok(products.includes('name: "Nicotine Vape", slug: "vapes"'));
  assert.ok(products.includes('seoTitle: "Nicotine Vapes Mississauga"'));
  assert.ok(products.includes('name: "THC Vape", slug: "vape-disposables"'));
  assert.ok(products.includes('seoTitle: "THC Vapes Mississauga"'));
  assert.ok(navbar.includes('{ href: "/items/vapes", label: "Nicotine Vape" }'));
  assert.ok(navbar.includes('{ href: "/items/vape-disposables", label: "THC Vape" }'));
  assert.ok(home.includes('{ name: "Nicotine Vape", slug: "items/vapes"'));
  assert.ok(home.includes('{ name: "THC Vape", slug: "items/vape-disposables"'));
});

test("protected owner, delivery and hour-bearing files are not rewritten by the campaign", () => {
  const sitemap = read("app/sitemap.ts");
  const navbar = read("app/components/Navbar.tsx");
  const delivery = read("app/delivery/page.tsx") + read("app/delivery/DeliveryContent.tsx");
  assert.ok(sitemap.includes("/weed-dispensary-mississauga"));
  assert.ok(navbar.includes('{ href: "/delivery", label: "🚗 Delivery" }'));
  assert.ok(delivery.includes('title: "Delivery Menu | Green Air Cannabis"'));
  assert.ok(delivery.includes("DeliveryContent"));
});

test("flower metadata uses the new tier label without volatile THC or duplicate brand", () => {
  const source = read("app/flower/[slug]/page.tsx");
  assert.ok(source.includes('canonical: `https://www.greenaircannabis.com/flower/${slug}`'));
  const titleLine = source.split("\n").find((line) => line.trim().startsWith("title: `${flower.name}"));
  assert.ok(titleLine);
  assert.doesNotMatch(titleLine, /THC|Green Air Cannabis/);
});
