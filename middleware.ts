import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isHiddenCigarettePath, SHOW_CIGARETTES, VAPE_PAGE } from "./app/lib/showCigarettes";

export function middleware(request: NextRequest) {
  if (SHOW_CIGARETTES) return NextResponse.next();
  if (!isHiddenCigarettePath(request.nextUrl.pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = VAPE_PAGE;
  url.search = "";
  return NextResponse.redirect(url, 302);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|webp|svg|ico|txt|xml)$).*)"],
};
