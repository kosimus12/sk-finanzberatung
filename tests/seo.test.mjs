/**
 * SEO- & LLMO-Tests: Title-/Description-Laengen, Canonical, genau eine H1,
 * Schema.org-JSON-LD ist valides JSON, FAQPage vorhanden.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { collectPages } from "../build.mjs";
import { renderPage } from "../src/lib/layout.mjs";

const pages = collectPages();

test("jede Seite hat einen eindeutigen Title (max. 60 Zeichen)", () => {
  const titles = new Set();
  for (const p of pages) {
    assert.ok(p.title, `Title fehlt fuer ${p.path}`);
    assert.ok(p.title.length <= 60, `Title zu lang (${p.title.length}) auf ${p.path}: ${p.title}`);
    assert.ok(!titles.has(p.title), `Title nicht eindeutig: ${p.title}`);
    titles.add(p.title);
  }
});

test("jede Seite hat eine Description (max. 160 Zeichen)", () => {
  for (const p of pages) {
    assert.ok(p.description, `Description fehlt fuer ${p.path}`);
    assert.ok(
      p.description.length <= 160,
      `Description zu lang (${p.description.length}) auf ${p.path}`,
    );
  }
});

test("jede gerenderte Seite hat genau eine <h1>", () => {
  for (const p of pages) {
    const html = renderPage(p);
    const count = (html.match(/<h1[\s>]/g) || []).length;
    assert.equal(count, 1, `Seite ${p.path} hat ${count} H1 (erwartet 1)`);
  }
});

test("jede Seite enthaelt einen Canonical-Link und Meta-Description", () => {
  for (const p of pages) {
    const html = renderPage(p);
    assert.match(html, /<link rel="canonical"/, `Canonical fehlt auf ${p.path}`);
    assert.match(html, /<meta name="description"/, `Meta-Description fehlt auf ${p.path}`);
    assert.match(html, /<meta property="og:title"/, `Open-Graph fehlt auf ${p.path}`);
  }
});

test("alle JSON-LD-Bloecke sind valides JSON", () => {
  for (const p of pages) {
    const html = renderPage(p);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.ok(blocks.length >= 1, `Kein JSON-LD auf ${p.path}`);
    for (const b of blocks) {
      assert.doesNotThrow(() => JSON.parse(b[1]), `Ungueltiges JSON-LD auf ${p.path}`);
    }
  }
});

test("Startseite enthaelt Organization-, Person- und FAQPage-Schema", () => {
  const home = pages.find((p) => p.path === "/");
  const html = renderPage(home);
  assert.match(html, /"@type":"FinancialService"/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"@type":"FAQPage"/);
});
