import type { Metadata } from "next";
import ResourceView from "./ResourceView";
import { RESOURCE_HOME } from "./resourceData";
import { resolveDocumentTitle } from "../lib/localSeo";
import { publicCopy } from "../lib/showCigarettes";

export const metadata: Metadata = {
  title: resolveDocumentTitle(RESOURCE_HOME.seoTitle),
  description: publicCopy(RESOURCE_HOME.description),
  alternates: { canonical: "https://www.greenaircannabis.com/resources" },
};

export default function ResourcesPage() {
  return <ResourceView page={RESOURCE_HOME} />;
}
