import { ARTICLE_PATH, ARTICLE_TITLE } from "../../resources/flying-from-pearson-with-cannabis/content.ts";
import { RESOURCE_PAGES } from "../../resources/resourceData.ts";

export type CodedArticleLink = { slug: string; title: string; href: string };

/** Coded resource URLs. A fleet article with the same slug is omitted. */
export function codedArticleLinks(): CodedArticleLink[] {
  const links = RESOURCE_PAGES.filter((page) => page.slug).map((page) => ({
    slug: page.slug,
    title: page.title,
    href: `/resources/${page.slug}`,
  }));
  links.push({
    slug: ARTICLE_PATH.slice("/resources/".length),
    title: ARTICLE_TITLE,
    href: ARTICLE_PATH,
  });
  return links;
}

export function codedArticleSlugs(): Set<string> {
  return new Set(codedArticleLinks().map((link) => link.slug));
}
