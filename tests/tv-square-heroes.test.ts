import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

for (const path of ["app/tv/tv.module.css", "app/tv2/tv2.module.css"]) {
  test(`${path} keeps full square feature images visible without cropping`, async () => {
    const css = await readFile(path, "utf8");

    assert.match(css, /\.budImg\s*\{[\s\S]*?object-fit:\s*contain;/);
  });
}
