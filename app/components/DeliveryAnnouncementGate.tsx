"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** In-store boards are full-bleed. The site-wide delivery bar stays on every other page. */
export default function DeliveryAnnouncementGate({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/tv")) return null;
  return children;
}
