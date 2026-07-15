import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Coming Soon — Green Air Cannabis | Mississauga",
  description: "Get notified when Green Air Cannabis launches same-day weed delivery across Mississauga and surrounding areas.",
  alternates: {
    canonical: "https://greenaircannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
