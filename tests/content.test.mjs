/**
 * Inhalts- & Struktur-Tests: Permalinks ohne Umlaute, interne Links aufloesbar,
 * referenzierte Avatar-Bilder existieren, Pflicht-Komponenten vorhanden.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { collectPages } from "../build.mjs";
import { renderPage } from "../src/lib/layout.mjs";
import { services } from "../src/data/services.mjs";
import { ratgeber } from "../src/data/ratgeber.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const pages = collectPages();
const routes = new Set(pages.map((p) => p.path));

test("alle Permalinks sind lowercase und ohne Umlaute/Sonderzeichen", () => {
  for (const p of pages) {
    assert.ok(/^\/[a-z0-9\-/]*\/?$/.test(p.path), `Ungueltiger Permalink: ${p.path}`);
    assert.ok(!/[äöüß]/.test(p.path), `Umlaut im Permalink: ${p.path}`);
  }
});

test("interne Links zeigen auf existierende Seiten oder erlaubte Ziele", () => {
  // Erlaubte Nicht-Seiten-Ziele (Assets, Anker, externe/Spezial-Schemata)
  const allowExternal = (href) =>
    /^(https?:|mailto:|tel:|#)/.test(href) ||
    href.startsWith("/downloads/") ||
    href.startsWith("/images/") ||
    /\.(svg|png|jpg|jpeg|webp|ico|xml|pdf|css|js)$/.test(href);

  for (const p of pages) {
    const html = renderPage(p);
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      if (allowExternal(href)) continue;
      // Anker abtrennen (/kontakt/#termin -> /kontakt/)
      const clean = href.split("#")[0];
      if (clean === "") continue;
      assert.ok(routes.has(clean), `Toter interner Link auf ${p.path}: ${href}`);
    }
  }
});

test("jede Service- und Ratgeber-Seite existiert als Route", () => {
  for (const s of services) assert.ok(routes.has(`/${s.slug}/`), `Service-Route fehlt: ${s.slug}`);
  for (const a of ratgeber) assert.ok(routes.has(`/ratgeber/${a.slug}/`), `Ratgeber-Route fehlt: ${a.slug}`);
});

test("alle referenzierten Maskottchen-Posen sind aufloesbar (URL vorhanden)", async () => {
  const { mascot } = await import("../src/data/images.mjs");
  const keys = new Set();
  for (const s of services) keys.add(s.icon);
  for (const a of ratgeber) keys.add(a.icon);
  for (const key of keys) {
    const url = mascot(key);
    assert.ok(url && /^(https?:|\/)/.test(url), `Maskottchen-Pose nicht aufloesbar: ${key}`);
  }
});

test("Pflicht-Komponenten sind vorhanden (Cookie-Banner, WhatsApp, Footer-Legal)", () => {
  const home = renderPage(pages.find((p) => p.path === "/"));
  assert.match(home, /id="cookie-banner"/, "Cookie-Banner fehlt");
  assert.match(home, /whatsapp-fab/, "WhatsApp-Button fehlt");
  assert.match(home, /href="\/impressum\/"/, "Impressum-Link fehlt");
  assert.match(home, /href="\/datenschutz\/"/, "Datenschutz-Link fehlt");
  assert.match(home, /href="\/vorabinformation\/"/, "Vorabinformation-Link fehlt");
});

test("Kontaktseite enthaelt Formular und Terminbuchungs-Bereich (Fallback)", () => {
  const kontakt = renderPage(pages.find((p) => p.path === "/kontakt/"));
  assert.match(kontakt, /<form/, "Kontaktformular fehlt");
  assert.match(kontakt, /id="termin"/, "Terminbuchungs-Anker fehlt");
  assert.match(kontakt, /booking__widget/, "Booking-Widget fehlt");
});

test("jede Seite hat eine FAQ- oder Legal-Struktur (LLMO/Inhalt)", () => {
  // Inhaltsseiten sollten mindestens eine FAQ enthalten; Legalseiten sind ausgenommen.
  const legal = new Set(["/impressum/", "/datenschutz/", "/vorabinformation/", "/lexikon/"]);
  for (const p of pages) {
    if (legal.has(p.path)) continue;
    const html = renderPage(p);
    assert.match(html, /class="section faq"|faq__list/, `FAQ-Section fehlt auf ${p.path}`);
  }
});
