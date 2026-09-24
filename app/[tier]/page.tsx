import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlowerCard from "../components/FlowerCard";
import {
  getFlowersByTier,
  getTierFromSlug,
  TIER_CONFIG,
} from "../lib/products";
import { TIER_SEO } from "../lib/tierSeoContent";
import LocalSeoMesh from "../components/LocalSeoMesh";
import {
  STORE_NAP,
  faqPageJsonLd,
  resolveDocumentTitle,
  stringifyJsonLd,
} from "../lib/localSeo";
import styles from "./tier.module.css";

/* -- Generate all tier pages at build -- */
export function generateStaticParams() {
  return Object.values(TIER_CONFIG).map((t) => ({ tier: t.slug }));
}

/* -- Dynamic SEO metadata -- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier: tierSlug } = await params;
  const tierInfo = getTierFromSlug(tierSlug);
  if (!tierInfo) return {};
  const flowers = getFlowersByTier(tierInfo.key);
  const seo = TIER_SEO[tierInfo.key];

  const title =
    seo?.seoTitle ||
    `${tierInfo.config.name} on Airport Rd in Malton — ${flowers.length} Strains`;

  return {
    title: resolveDocumentTitle(title),
    description:
      seo?.metaDescription ||
      seo?.seoIntro ||
      `Shop ${flowers.length} ${tierInfo.config.name.toLowerCase()} cannabis strains at Green Air Cannabis on Airport Rd in Malton.`,
    alternates: {
      canonical: `${STORE_NAP.canonicalHost}/${tierSlug}`,
    },
    openGraph: {
      title: seo?.h1 || title,
      description:
        seo?.metaDescription ||
        `Browse the ${tierInfo.config.name.toLowerCase()} flower tier at 7060 Airport Rd in Malton.`,
    },
  };
}

/* -- Page component -- */
export default async function TierPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier: tierSlug } = await params;
  const tierInfo = getTierFromSlug(tierSlug);
  if (!tierInfo) notFound();

  const flowers = getFlowersByTier(tierInfo.key);
  const { config } = tierInfo;
  const seo = TIER_SEO[tierInfo.key];

  const saleFlowers = flowers.filter((f) => f.isSale);
  const regularFlowers = flowers.filter((f) => !f.isSale);
  const hotFlowers = flowers.filter((f) => f.isHot);

  // Check if banner file exists in the public folder
  const bannerExists = config.banner
    ? fs.existsSync(path.join(process.cwd(), "public", config.banner))
    : false;

  const pageUrl = `${STORE_NAP.canonicalHost}/${tierSlug}`;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo?.h1 || config.name,
    description:
      seo?.metaDescription ||
      `${config.name} flower at Green Air Cannabis on Airport Rd in Malton.`,
    isPartOf: { "@type": "WebSite", "@id": `${STORE_NAP.canonicalHost}/#website` },
    about: { "@id": `${STORE_NAP.canonicalHost}/#store` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: flowers.length,
      itemListElement: flowers.map((flower, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: flower.name,
        url: `${STORE_NAP.canonicalHost}/flower/${flower.slug}`,
      })),
    },
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(collectionJsonLd) }}
      />
      {seo?.faqs?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: stringifyJsonLd(faqPageJsonLd(seo.faqs, pageUrl)),
          }}
        />
      ) : null}
      <Navbar />

      {/* ── Banner Image (standalone, no overlay text) ── */}
      {bannerExists && (
        <section className={styles.bannerSection}>
          <img
            src={config.banner}
            alt={`${config.name} Cannabis Flower — ${config.tagline}`}
            className={styles.bannerImg}
          />
        </section>
      )}

      {/* ── Hero Content BELOW banner ── */}
      <section
        className={styles.heroInfo}
        style={{ "--tier-color": config.color } as React.CSSProperties}
      >
        <div className={styles.heroInfoInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroTitleRow}>
              <span className={styles.heroIcon}>{config.icon}</span>
              <h1 className={styles.heroTitle}>
                <span style={{ color: config.color }}>{seo?.h1 || config.name}</span>
              </h1>
            </div>
            <p className={styles.heroTagline}>{config.tagline}</p>
            <div className={styles.heroStats}>
              <span className={styles.stat}>
                <strong>{flowers.length}</strong> strains
              </span>
              {saleFlowers.length > 0 && (
                <span className={styles.statSale}>
                  🔥 {saleFlowers.length} on sale
                </span>
              )}
              {hotFlowers.length > 0 && (
                <span className={styles.statHot}>
                  ⚡ {hotFlowers.length} hot picks
                </span>
              )}
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.unitPriceBox}>
              <span className={styles.unitPriceLabel}>Starting at</span>
              <span className={styles.unitPriceValue}>${config.unitPrice}/g</span>
            </div>

            {(config.deal3g || config.deal6g) && (
            <div className={styles.dealRow}>
              {config.deal3g && (
              <div className={styles.dealBox}>
                <div className={styles.dealLabel}>🎁 {config.deal3g.label}</div>
                <div className={styles.dealPrice}>
                  = <strong>${config.deal3g.price}</strong> / {config.deal3g.total}
                </div>
              </div>
              )}
              {config.deal6g && (
                <div className={styles.dealBox}>
                  <div className={styles.dealLabel}>🎁 {config.deal6g.label}</div>
                  <div className={styles.dealPrice}>
                    = <strong>${config.deal6g.price}</strong> / {config.deal6g.total}
                  </div>
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section className={styles.products}>
        <div className={styles.container}>
          {saleFlowers.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                🔥 <span style={{ color: "#f43f5e" }}>On Sale</span>
              </h2>
              <div className={styles.grid}>
                {saleFlowers.map((f) => (
                  <FlowerCard
                    key={`${f.sku}-${f.slug}`}
                    flower={f}
                    tierKey={tierInfo.key}
                  />
                ))}
              </div>
            </>
          )}

          <h2 className={styles.sectionTitle}>
            All{" "}
            <span style={{ color: config.color }}>{config.name}</span>{" "}
            Strains
          </h2>
          <div className={styles.grid}>
            {regularFlowers.map((f) => (
              <FlowerCard
                key={`${f.sku}-${f.slug}`}
                flower={f}
                tierKey={tierInfo.key}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO Content ── */}
      {seo && (
        <section className={styles.seoSection}>
          <div className={styles.container}>
            <h2 className={styles.seoMainTitle}>{seo.h1}</h2>
            <p className={styles.seoIntro}>{seo.seoIntro}</p>

            {seo.sections.map((s, i) => (
              <div key={i} className={styles.seoBlock}>
                <h3 className={styles.seoHeading}>{s.heading}</h3>
                <p className={styles.seoBody}>{s.body}</p>
              </div>
            ))}

            {/* FAQ Accordion */}
            {seo.faqs.length > 0 && (
              <div className={styles.faqSection}>
                <h3 className={styles.seoHeading}>Frequently Asked Questions</h3>
                {seo.faqs.map((faq, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>{faq.q}</summary>
                    <p className={styles.faqAnswer}>{faq.a}</p>
                  </details>
                ))}
              </div>
            )}
            <LocalSeoMesh currentPath={`/${tierSlug}`} />
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
