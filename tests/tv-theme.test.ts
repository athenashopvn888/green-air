import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { getTvTheme, TV_THEMES } from "../app/tv-theme/theme.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("GAC01 exposes the complete reusable TV theme entry", () => {
  assert.deepEqual(TV_THEMES.GAC01, {
    headerImage: "/tv-theme/gac01/header.webp",
    backgroundImage: "/tv-theme/gac01/background.webp",
    cornerLeft: "/tv-theme/gac01/corner-left.png",
    cornerRight: "/tv-theme/gac01/corner-right.png",
    primary: "#0B3D2E",
    accent: "#D4A73A",
    glow: "rgba(212, 167, 58, 0.42)",
    cardBorder: "rgba(212, 167, 58, 0.78)",
    headerText: "#FFF8DC",
    sloganLeft: "HIGHER STANDARDS",
    sloganRight: "FLY HIGHER",
    footerLeft: "LANDED LOCALLY · HIGHER DAILY",
    footerRight: "GREEN AIR CANNABIS · FLY HIGHER",
  });
});

test("stores without a theme entry stay on the existing fallback path", () => {
  assert.equal(getTvTheme("NO_THEME"), undefined);
  assert.equal(getTvTheme(null), undefined);
});

test("all GAC01 theme art stays below 500 KB", async () => {
  for (const file of ["header.webp", "background.webp", "corner-left.png", "corner-right.png"]) {
    const info = await stat(path.join(repoRoot, "public", "tv-theme", "gac01", file));
    assert.ok(info.size < 500 * 1024, `${file} is ${info.size} bytes`);
  }
});
