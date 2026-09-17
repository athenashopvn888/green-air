import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";
import menu from "./delivery-menu.json";

export const metadata: Metadata = {
  title: {
    absolute: "Malton / Mississauga Delivery Menu | Green Air Cannabis",
  },
  description:
    "Green Air Cannabis delivery for Malton, Airport Road, and nearby Mississauga addresses confirmed by the dispatcher. Browse the catalog, then confirm radius before an order is accepted.",
  alternates: { canonical: "https://www.greenaircannabis.com/delivery" },
};

export default function DeliveryPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Green Air Cannabis Delivery Menu", url: "https://www.greenaircannabis.com/delivery", mainEntity: { "@type": "ItemList", numberOfItems: menu.products.length, itemListElement: menu.products.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><DeliveryContent /></>;
}
