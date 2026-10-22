import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isCigaretteSurfacePath, SHOW_CIGARETTES, VAPE_PAGE } from "./app/lib/showCigarettes";

export function middleware(request: NextRequest) {
  if (SHOW_CIGARETTES) return NextResponse.next();
  if (!isCigaretteSurfacePath(request.nextUrl.pathname)) return NextResponse.next();
  // A configured manifest lets the page choose: coded redirect, or 200 unavailable when webOn is false.
  if (process.env.FLEET_CONTENT_MANIFEST_URL?.trim()) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = VAPE_PAGE;
  url.search = "";
  return NextResponse.redirect(url, 302);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|webp|svg|ico|txt|xml)$).*)"],
};
