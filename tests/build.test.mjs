/**
 * Build-Smoke-Test: rendert jede Seite und prueft die Grundstruktur des
 * HTML-Dokuments (doctype, lang, viewport, Stylesheet, Skip-Link).
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { collectPages } from "../build.mjs";
import { renderPage } from "../src/lib/layout.mjs";

const pages = collectPages();

test("es werden alle erwarteten Seiten erzeugt", () => {
  assert.ok(pages.length >= 18, `Zu wenige Seiten: ${pages.length}`);
  const must = ["/", "/leistungen/", "/ratgeber/", "/vergleiche/", "/rechner/", "/ueber-uns/", "/kontakt/", "/impressum/", "/datenschutz/", "/vorabinformation/"];
  const routes = new Set(pages.map((p) => p.path));
  for (const m of must) assert.ok(routes.has(m), `Pflichtseite fehlt: ${m}`);
});

test("jedes Dokument hat die Grundstruktur", () => {
  for (const p of pages) {
    const html = renderPage(p);
    assert.match(html, /^<!doctype html>/i, `doctype fehlt auf ${p.path}`);
    assert.match(html, /<html lang="de">/, `lang-Attribut fehlt auf ${p.path}`);
    assert.match(html, /name="viewport"/, `viewport fehlt auf ${p.path}`);
    assert.match(html, /<link rel="stylesheet" href="\/styles.css"/, `Stylesheet fehlt auf ${p.path}`);
    assert.match(html, /class="skip-link"/, `Skip-Link fehlt auf ${p.path}`);
    assert.match(html, /<main id="main">/, `Main-Landmark fehlt auf ${p.path}`);
  }
});

test("kein unaufgeloester Template-Platzhalter im Output", () => {
  for (const p of pages) {
    const html = renderPage(p);
    assert.ok(!html.includes("undefined"), `'undefined' im Output auf ${p.path}`);
    assert.ok(!/\$\{/.test(html), `Unaufgeloestes Template auf ${p.path}`);
  }
});
