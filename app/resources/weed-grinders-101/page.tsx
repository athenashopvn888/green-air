import type { Metadata } from "next";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { STORE_NAP } from "../../lib/localSeo";
import ArticleBody from "../flying-from-pearson-with-cannabis/ArticleBody";
import styles from "../flying-from-pearson-with-cannabis/article.module.css";
import { ARTICLE_CANONICAL, ARTICLE_DESCRIPTION, ARTICLE_H1, ARTICLE_MARKDOWN } from "./content";

const PUBLISHED = "2026-10-26";

export const metadata: Metadata = {
  title: { absolute: ARTICLE_H1 },
  description: ARTICLE_DESCRIPTION,
  alternates: { canonical: ARTICLE_CANONICAL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "article",
    locale: "en_CA",
    url: ARTICLE_CANONICAL,
    siteName: STORE_NAP.brand,
    title: ARTICLE_H1,
    description: ARTICLE_DESCRIPTION,
    publishedTime: `${PUBLISHED}T00:00:00.000Z`,
    modifiedTime: `${PUBLISHED}T00:00:00.000Z`,
    images: [
      {
        url: STORE_NAP.schemaImage,
        width: 1200,
        height: 630,
        alt: "Green Air Cannabis on Airport Road in Malton, Mississauga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_H1,
    description: ARTICLE_DESCRIPTION,
    images: [STORE_NAP.schemaImage],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: ARTICLE_H1,
  description: ARTICLE_DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: "en-CA",
  author: {
    "@type": "Organization",
    name: STORE_NAP.brand,
    url: STORE_NAP.canonicalHost,
  },
  publisher: {
    "@type": "Organization",
    name: STORE_NAP.brand,
    url: STORE_NAP.canonicalHost,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": ARTICLE_CANONICAL,
  },
  url: ARTICLE_CANONICAL,
};

export default function WeedGrindersArticlePage() {
  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <article>
        <header className={styles.hero}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>Resources</p>
            <h1>{ARTICLE_H1}</h1>
          </div>
        </header>
        <div className={styles.body}>
          <ArticleBody markdown={ARTICLE_MARKDOWN} />
        </div>
      </article>
      <Footer />
    </main>
  );
}
