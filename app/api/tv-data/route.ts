import { NextResponse } from "next/server";
import { getCigaretteSnapshot, snapshotHeaders } from "../../lib/cigaretteFeed";
import { allFlowers, allItems } from "../../lib/products";
import { getTvData } from "../../lib/tvStock";

export const runtime = "nodejs";

// Always run the handler. Upstream Apps Script reads are cached for ~300s
// inside getTvData; this response itself is not cached (Cache-Control: no-store).
export const revalidate = 0;

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "flowers";
  const [payload, snap] = await Promise.all([
    getTvData({
      type,
      staticFlowers: allFlowers,
      staticItems: allItems,
    }),
    getCigaretteSnapshot(),
  ]);
  const cigHeaders = snapshotHeaders(snap);

  if (type === "cig") {
    return NextResponse.json(
      {
        on: snap.tv.show,
        tvOn: snap.tv.show,
        webOn: snap.web.show,
        wording: snap.wording,
        live: snap.live,
      },
      { headers: { ...cigHeaders, "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(payload.body, { headers: { ...payload.headers, ...cigHeaders } });
}
