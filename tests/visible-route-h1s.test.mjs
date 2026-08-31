import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const contactPage = await readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8");
const categoryPage = await readFile(new URL("../app/items/[category]/page.tsx", import.meta.url), "utf8");

test("contact page renders one store-specific Mississauga H1", () => {
  assert.match(contactPage, /<h1 className=\{styles\.heroTitle\}>Contact Green Air Cannabis in Mississauga<\/h1>/);
  assert.equal((contactPage.match(/<h1\b/g) ?? []).length, 1);
});

test("category template renders one visible city-qualified H1 in both banner branches", () => {
  assert.equal((categoryPage.match(/<h1\b/g) ?? []).length, 2);
  assert.equal((categoryPage.match(/\{config\.name\} in Mississauga/g) ?? []).length, 2);
  assert.doesNotMatch(categoryPage, /visuallyHidden|srOnly/);
});

