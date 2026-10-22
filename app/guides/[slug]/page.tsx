import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { DELIVERY_GUIDE_REGISTRY, getDeliveryGuide } from "../../lib/deliveryGuideRegistry";
import { GUIDE_REGISTRY, GUIDE_STORE, getGuide, resolveGuideProduct, type GuideEntry } from "../../lib/guideRegistry";
import GuideBody, { stripMarkdown } from "./GuideBody";
import CigaretteUnavailablePage from "../../components/CigaretteUnavailablePage";
import { openCigaretteSurface } from "../../lib/cigaretteRedirect";
import { isCigaretteSurfaceGuideSlug, isHiddenCigarettePath, isHiddenGuideSlug, SHOW_CIGARETTES, visibleCategoryHref, visibleGuideMarkdown } from "../../lib/showCigarettes";
import DeliveryGuidePage from "./DeliveryGuidePage";
import styles from "./guide.module.css";

const BASE = `https://${GUIDE_STORE.domain}`;
type GuidePageProps = { params: Promise<{ slug: string }> };
const laneCopy = {
  strain: { label: "Strain name", category: "Cannabis flower" },
  native_cig: { label: "Native Cigarettes", category: "Native Cigarettes" },
  nic_vape: { label: "Nicotine Vape", category: "Nicotine Vape" },
  thc_vape: { label: "THC Vape", category: "THC Vape" },
} as const;

export const dynamicParams = false;
export function generateStaticParams() { return [...GUIDE_REGISTRY, ...DELIVERY_GUIDE_REGISTRY].map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const slug = (await params).slug;
  if (isCigaretteSurfaceGuideSlug(slug) && (await openCigaretteSurface(true)) === "unavailable") {
    return { title: "Cigarettes", robots: { index: false, follow: true } };
  }
  const deliveryGuide = getDeliveryGuide(slug);
  if (deliveryGuide) return { title: { absolute: deliveryGuide.title }, description: deliveryGuide.description, alternates: { canonical: `${BASE}/guides/${deliveryGuide.slug}` }, robots: { index: true, follow: true }, openGraph: { title: deliveryGuide.title, description: deliveryGuide.description, url: `${BASE}/guides/${deliveryGuide.slug}`, type: "website" } };
  const guide = getGuide(slug);
  if (!guide) return {};
  const description = stripMarkdown(visibleGuideMarkdown(guide.description));
  return {
    title: { absolute: guide.title },
    description,
    keywords: guide.primaryKeywords,
    alternates: { canonical: `${BASE}/guides/${guide.slug}` },
    robots: { index: true, follow: true },
    openGraph: { title: guide.title, description, url: `${BASE}/guides/${guide.slug}`, type: "website" },
  };
}

const relatedEntries = (guide: GuideEntry) => guide.relatedSlugs.map(getGuide).filter((entry): entry is GuideEntry => Boolean(entry)).filter((entry) => !isHiddenGuideSlug(entry.slug));

export default async function GuidePage({ params }: GuidePageProps) {
  const slug = (await params).slug;
  if (isCigaretteSurfaceGuideSlug(slug) && (await openCigaretteSurface(true)) === "unavailable") {
    return <CigaretteUnavailablePage />;
  }
  const deliveryGuide = getDeliveryGuide(slug);
  if (deliveryGuide) return <DeliveryGuidePage guide={deliveryGuide} />;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const product = resolveGuideProduct(guide);
  const productHref = product && !isHiddenCigarettePath(`${guide.lane === "strain" ? "/flower" : "/item"}/${product.slug}`) ? `${guide.lane === "strain" ? "/flower" : "/item"}/${product.slug}` : undefined;
  const categoryPath = visibleCategoryHref(guide.preferredCategoryPath);
  const canonical = `${BASE}/guides/${guide.slug}`;
  const lane = laneCopy[guide.lane];
  const graph: Record<string, unknown>[] = [{
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE}/guides` },
      { "@type": "ListItem", position: 3, name: guide.name, item: canonical },
    ],
  }];
  if (guide.schema.types.includes("WebPage")) graph.push({ "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: guide.title, description: stripMarkdown(visibleGuideMarkdown(guide.description)) });
  if (guide.schema.types.includes("FAQPage")) graph.push({
    "@type": "FAQPage",
    mainEntity: guide.schema.faq_items.filter((faq) => SHOW_CIGARETTES || !/\bgrabba\b/i.test(`${faq.question} ${faq.answer}`)).map((faq) => ({ "@type": "Question", name: stripMarkdown(visibleGuideMarkdown(faq.question)), acceptedAnswer: { "@type": "Answer", text: stripMarkdown(visibleGuideMarkdown(faq.answer)) } })),
  });
  const laneLabel = !SHOW_CIGARETTES && guide.lane === "native_cig" ? "Backwoods" : lane.label;
  const laneCategory = !SHOW_CIGARETTES && guide.lane === "native_cig" ? "Backwoods" : lane.category;
  if (guide.schema.types.includes("Product")) graph.push({
    "@type": "Product",
    name: guide.name,
    brand: { "@type": "Brand", name: guide.name },
    description: stripMarkdown(visibleGuideMarkdown(guide.description)),
    category: laneCategory,
    url: canonical,
  });
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>{guide.name}</span></nav>
        <header className={styles.hero}>
          <span className={styles.lane}>{laneLabel}</span>
          <h1>{guide.title}</h1>
          <p className={styles.lede}>{stripMarkdown(visibleGuideMarkdown(guide.description))}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={productHref ?? categoryPath}>{productHref ? `Open the ${guide.name} menu listing` : "Check today’s board"}</Link>
            <Link className={styles.secondary} href={categoryPath}>Browse {SHOW_CIGARETTES ? lane.category : guide.lane === "native_cig" ? "wraps" : lane.category}</Link>
          </div>
        </header>
        <section className={styles.section} aria-label={`${guide.name} guide`}><GuideBody markdown={guide.bodyMd} /></section>
        <section className={styles.section} aria-labelledby="related-guides-heading">
          <h2 id="related-guides-heading">Related {laneLabel} guides</h2>
          <div className={styles.related}>{relatedEntries(guide).map((entry) => <Link key={entry.slug} href={`/guides/${entry.slug}`}>{entry.name}<span>{laneCopy[entry.lane].label}</span></Link>)}</div>
        </section>
        <aside className={styles.finalCta}>
          <h2>Check today&apos;s board</h2>
          <p>Use the current menu path for the latest posted listing and format details.</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={productHref ?? categoryPath}>Open today&apos;s menu path</Link>
            <Link className={styles.secondary} href="/visit">Visit {GUIDE_STORE.brand}</Link>
          </div>
        </aside>
      </article>
      <Footer />
    </main>
  );
}
