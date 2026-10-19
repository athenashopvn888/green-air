import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parseArticle, parseInline } from "../app/resources/flying-from-pearson-with-cannabis/articleModel.ts";
import {
  ARTICLE_CANONICAL,
  ARTICLE_DESCRIPTION,
  ARTICLE_H1,
  ARTICLE_MARKDOWN,
  ARTICLE_PATH,
  ARTICLE_TITLE,
} from "../app/resources/flying-from-pearson-with-cannabis/content.ts";

const pageSource = readFileSync(new URL("../app/resources/flying-from-pearson-with-cannabis/page.tsx", import.meta.url), "utf8");
const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const blocks = parseArticle(ARTICLE_MARKDOWN);

test("article metadata is the approved heading, a short title, and the first useful paragraph", () => {
  assert.equal(ARTICLE_MARKDOWN.startsWith(`# ${ARTICLE_H1}\n`), true);
  assert.equal(ARTICLE_H1.startsWith(ARTICLE_TITLE), true);
  assert.ok(ARTICLE_TITLE.length <= 60);
  assert.ok(ARTICLE_TITLE.length >= 45);
  assert.equal(ARTICLE_DESCRIPTION.startsWith("Green Air Cannabis sits at 7060 Airport Rd"), true);
  assert.equal(ARTICLE_MARKDOWN.includes(ARTICLE_DESCRIPTION), true);
  assert.equal(ARTICLE_CANONICAL, `https://www.greenaircannabis.com${ARTICLE_PATH}`);
});

test("published body keeps the last-checked line and renders every source line", () => {
  const first = blocks[0];
  assert.equal(first?.type, "p");
  if (first?.type !== "p") return;
  assert.equal(first.lines[0], "Last checked: October 19, 2026");
  assert.equal(first.lines[1], ARTICLE_DESCRIPTION);

  const rendered = JSON.stringify(blocks);
  for (const line of ARTICLE_MARKDOWN.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("|---")) continue;
    if (trimmed.startsWith("# ")) {
      assert.equal(trimmed, `# ${ARTICLE_H1}`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      assert.equal(rendered.includes(JSON.stringify(trimmed.slice(3))), true);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      assert.equal(rendered.includes(JSON.stringify(trimmed.slice(4))), true);
      continue;
    }
    if (trimmed.startsWith("- ")) {
      assert.equal(rendered.includes(JSON.stringify(trimmed.slice(2))), true);
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      assert.equal(rendered.includes(JSON.stringify(trimmed.replace(/^\d+\.\s+/, ""))), true);
      continue;
    }
    if (trimmed.startsWith("|")) {
      for (const cell of trimmed.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim())) {
        assert.equal(rendered.includes(JSON.stringify(cell)), true);
      }
      continue;
    }
    assert.equal(rendered.includes(JSON.stringify(trimmed)), true);
  }
});

test("comparison table, checklist, and the existing visit link stay intact", () => {
  const table = blocks.find((block) => block.type === "table");
  assert.ok(table && table.type === "table");
  if (!table || table.type !== "table") return;
  assert.deepEqual(table.header, ["", "Flight stays inside Canada", "Flight leaves Canada (including to the U.S.)"]);
  assert.equal(table.rows.length, 5);

  const checklist = blocks.find((block) => block.type === "ol");
  assert.ok(checklist && checklist.type === "ol" && checklist.items.length === 5);

  const visit = parseInline("see our [visit page](/visit).").find((token) => token.type === "link");
  assert.deepEqual(visit, { type: "link", text: "visit page", href: "/visit" });
  assert.equal(ARTICLE_MARKDOWN.includes("](/visit)"), true);
  assert.equal(ARTICLE_MARKDOWN.includes("](http"), false);
});

test("page and sitemap publish this path only as an addition", () => {
  assert.match(pageSource, /title: \{ absolute: ARTICLE_TITLE \}/);
  assert.match(pageSource, /canonical: ARTICLE_CANONICAL/);
  assert.match(pageSource, /index: true/);
  assert.match(pageSource, /follow: true/);
  assert.match(pageSource, /"@type": "Article"/);
  assert.match(pageSource, /<h1>\{ARTICLE_H1\}<\/h1>/);
  assert.match(sitemapSource, /\/resources\/flying-from-pearson-with-cannabis/);
  assert.doesNotMatch(ARTICLE_MARKDOWN, /3\.5/);
  assert.doesNotMatch(pageSource, /3\.5/);
  assert.doesNotMatch(ARTICLE_MARKDOWN, /store_code|editor_fixes|notes_for_reviewer/);
});
