import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceView from "../ResourceView";
import { getResourcePage, RESOURCE_PAGES } from "../resourceData";
import { resolveDocumentTitle } from "../../lib/localSeo";
import { redirectToVape } from "../../lib/cigaretteRedirect";
import { isHiddenCigarettePath, publicCopy } from "../../lib/showCigarettes";

type ResourceRouteProps = {
  params: Promise<{ slug?: string[] }>;
};

function routeSlug(slug?: string[]) {
  return (slug || []).join("/");
}

export function generateStaticParams() {
  return RESOURCE_PAGES.filter((page) => page.slug).map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: ResourceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getResourcePage(routeSlug(slug));
  if (page && isHiddenCigarettePath(`/resources/${page.slug}`)) redirectToVape();
  if (!page) return {};
  return {
    title: resolveDocumentTitle(publicCopy(page.seoTitle)),
    description: publicCopy(page.description),
    alternates: { canonical: "https://www.greenaircannabis.com/resources/" + page.slug },
  };
}

export default async function ResourcePage({ params }: ResourceRouteProps) {
  const { slug } = await params;
  const page = getResourcePage(routeSlug(slug));
  if (page && isHiddenCigarettePath(`/resources/${page.slug}`)) redirectToVape();
  if (!page) notFound();
  return <ResourceView page={page} />;
}
