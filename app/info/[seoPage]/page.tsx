import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SEO_PAGES, getSeoPageBySlug } from "../../lib/seoPages";
import { LEGACY_SEO_SLUGS } from "../../lib/seoRouteAliases";
import { TIER_CONFIG } from "../../lib/products";
import styles from "./seo.module.css";

/* ── Generate all SEO pages ── */
export function generateStaticParams() {
  return SEO_PAGES.filter((p) => !LEGACY_SEO_SLUGS.has(p.slug)).map((p) => ({
    seoPage: p.slug,
  }));
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ seoPage: string }>;
}): Promise<Metadata> {
  const { seoPage: slug } = await params;
  const page = getSeoPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `https://www.greenaircannabis.com/info/${slug}`,
    },
  };
}

/* ── Page ── */
export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ seoPage: string }>;
}) {
  const { seoPage: slug } = await params;
  const page = getSeoPageBySlug(slug);
  if (!page) notFound();

  const tiers = Object.values(TIER_CONFIG);
  const heroMenuHref = page.heroPreview?.menuHref ?? "/items/cigarettes";

  // Check if banner file exists in the public folder
  const bannerExists = page.banner
    ? fs.existsSync(path.join(process.cwd(), "public", page.banner))
    : false;

  return (
    <main className={styles.main}>
      <Navbar hideThcVape={slug === "nicotine-vapes-mississauga"} />

      {/* Banner Image */}
      {page.banner && bannerExists && !page.heroPreview && (
        <section className={styles.bannerSection}>
          <img
            src={page.banner}
            alt={page.h1}
            className={styles.bannerImg}
          />
        </section>
      )}

      {/* Hero */}
      {page.heroPreview ? (
        <section className={styles.productHero}>
          <div className={styles.productHeroInner}>
            <div className={styles.productHeroCopy}>
              <span className={styles.productHeroKicker}>{page.heroPreview.eyebrow}</span>
              <h1>{page.h1}</h1>
              <p>{page.heroPreview.intro}</p>
              <div className={styles.productHeroActions}>
                <Link href={heroMenuHref} className={styles.productHeroPrimary}>
                  {page.heroPreview.primaryLabel ?? "Check the cigarette menu"}
                </Link>
                <Link href={heroMenuHref} className={styles.productHeroSecondary}>
                  {page.heroPreview.secondaryLabel ?? "See the current selection"}
                </Link>
              </div>
            </div>
            <div className={styles.productPreviewStage} aria-label={page.heroPreview.stageLabel ?? `${page.h1} brand preview`}>
              {page.heroPreview.products.map((product, index) => (
                <Link
                  key={product.name}
                  href={heroMenuHref}
                  className={styles.productPreviewCard}
                  data-product-slug={product.slug}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} brand preview`}
                    width={800}
                    height={800}
                    priority={index === 0}
                    unoptimized={product.image.startsWith("http")}
                    sizes="(max-width: 720px) 42vw, (max-width: 980px) 46vw, 220px"
                  />
                  <span>{product.name}</span>
                </Link>
              ))}
              <p className={styles.productHeroDisclosure}>{page.heroPreview.disclosure}</p>
            </div>
          </div>
          {page.heroPreview.warning && (
            <p className={styles.productHeroWarning}>{page.heroPreview.warning}</p>
          )}
        </section>
      ) : (
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.heroIcon}>{page.icon}</span>
            <h1 className={styles.heroH1}>{page.h1}</h1>
            <p className={styles.heroTagline}>{page.heroTagline}</p>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className={styles.content}>
        <div className={styles.container}>
          {page.sections.map((s, i) => (
            <div key={i} className={styles.section}>
              <h2 className={styles.sectionTitle}>{s.heading}</h2>
              <p className={styles.sectionBody}>{s.body}</p>
            </div>
          ))}

          {page.relatedLink && (
            <div className={styles.relatedLinkCard}>
              <p>{page.relatedLink.intro}</p>
              <Link href={page.relatedLink.href}>{page.relatedLink.label}</Link>
            </div>
          )}

          {/* Tier Grid */}
          {page.showTierGrid !== false && <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Cannabis Menu — Five Tiers of Quality</h2>
            <div className={styles.tierGrid}>
              {tiers.map((tier) => (
                <Link
                  key={tier.slug}
                  href={`/${tier.slug}`}
                  className={styles.tierCard}
                  style={{ "--tier-color": tier.color } as React.CSSProperties}
                >
                  <div className={styles.tierLabel} style={{ color: tier.color }}>
                    {tier.icon} {tier.name}
                  </div>
                  <div className={styles.tierPrice}>${tier.unitPrice}/g</div>
                  <p className={styles.tierDesc}>{tier.tagline}</p>
                  <span className={styles.tierLink}>Browse {tier.name} →</span>
                </Link>
              ))}
            </div>
          </div>}

          {/* Map */}
          {page.showVisitSection !== false && <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Find Us</h2>
            <div className={styles.mapWrap}>
            </div>
            <div className={styles.visitBtns}>
            </div>
          </div>}

          {/* FAQ */}
          {page.faqs.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              {page.faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{faq.q}</summary>
                  <p className={styles.faqA}>{faq.a}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
