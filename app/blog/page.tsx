import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Cannabis Blog & Guides — Green Air Cannabis | Mississauga",
  description: "Read the latest strain reviews, dosing guides, and cannabis news from Green Air Cannabis in Mississauga.",
  alternates: {
    canonical: "https://greenaircannabis.com/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
