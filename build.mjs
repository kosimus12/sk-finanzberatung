/**
 * Statischer Site-Generator (nur Node-Bordmittel, keine Abhaengigkeiten).
 *
 * Ablauf:
 *  1. Alle Seiten sammeln (statische + datengetriebene Detailseiten).
 *  2. Jede Seite mit dem Basis-Layout rendern.
 *  3. Nach dist/<pfad>/index.html schreiben.
 *  4. public/ kopieren, styles.css & main.js bereitstellen.
 *  5. sitemap.xml generieren.
 *
 * Aufruf: `npm run build`
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { renderPage } from "./src/lib/layout.mjs";
import { SITE_URL } from "./src/data/site.mjs";
import { services } from "./src/data/services.mjs";
import { ratgeber } from "./src/data/ratgeber.mjs";

import { home } from "./src/pages/home.mjs";
import { leistungenIndex, serviceDetail } from "./src/pages/leistungen.mjs";
import { ratgeberIndex, ratgeberDetail } from "./src/pages/ratgeber.mjs";
import { vergleicheIndex, vergleicheDetail, vergleiche } from "./src/pages/vergleiche.mjs";
import { rechner } from "./src/pages/rechner.mjs";
import { lexikon } from "./src/pages/lexikon.mjs";
import { ueberUns } from "./src/pages/ueber-uns.mjs";
import { kontakt } from "./src/pages/kontakt.mjs";
import { impressum, datenschutz, vorabinformation } from "./src/pages/legal.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const PUBLIC = path.join(__dirname, "public");

/** Alle Seiten als Liste von Render-Funktionen sammeln. */
export function collectPages() {
  const pages = [
    home(),
    leistungenIndex(),
    ratgeberIndex(),
    vergleicheIndex(),
    rechner(),
    lexikon(),
    ueberUns(),
    kontakt(),
    impressum(),
    datenschutz(),
    vorabinformation(),
  ];

  // Datengetriebene Detailseiten
  for (const s of services) pages.push(serviceDetail(s.slug));
  for (const a of ratgeber) pages.push(ratgeberDetail(a.slug));
  for (const v of vergleiche) pages.push(vergleicheDetail(v.key));

  return pages;
}

/** Aus einem Routenpfad den Ziel-Dateipfad ableiten ("/" -> index.html). */
function outputFileFor(routePath) {
  const clean = routePath.replace(/^\/+|\/+$/g, "");
  if (clean === "") return path.join(DIST, "index.html");
  return path.join(DIST, clean, "index.html");
}

/** Eine Datei robust kopieren (mit Retry; toleriert sporadische Mount-Fehler). */
async function copyFileSafe(src, dest) {
  for (let i = 0; i < 4; i++) {
    try {
      const buf = await fs.readFile(src);
      await fs.writeFile(dest, buf);
      return true;
    } catch (err) {
      if (i === 3) {
        console.warn(`[build] uebersprungen (Kopieren fehlgeschlagen): ${path.basename(src)} - ${err.code || err.message}`);
        return false;
      }
      await new Promise((r) => setTimeout(r, 250));
    }
  }
}

/** Verzeichnis rekursiv kopieren (public -> dist). */
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await copyFileSafe(s, d);
  }
}

async function main() {
  const start = Date.now();

  // dist/ leeren
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });

  // public/ kopieren (Bilder, robots.txt, downloads ...)
  try {
    await copyDir(PUBLIC, DIST);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    console.warn("[build] Kein public/-Ordner gefunden - wird uebersprungen.");
  }

  // CSS und Client-JS bereitstellen
  await copyFileSafe(path.join(__dirname, "src/styles/styles.css"), path.join(DIST, "styles.css"));
  await copyFileSafe(path.join(__dirname, "src/client/main.js"), path.join(DIST, "main.js"));

  // Seiten rendern
  const pages = collectPages();
  const routes = [];
  for (const page of pages) {
    const html = renderPage(page);
    const outFile = outputFileFor(page.path);
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, html, "utf8");
    routes.push(page.path);
  }

  // sitemap.xml
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((r) => {
      const loc = SITE_URL + (r === "/" ? "/" : r);
      const priority = r === "/" ? "1.0" : "0.7";
      return `  <url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
    }),
    "</urlset>",
    "",
  ].join("\n");
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

  const ms = Date.now() - start;
  console.log(`[build] ${pages.length} Seiten generiert in ${ms} ms -> dist/`);
  for (const r of routes) console.log(`         ${r}`);
}

// Nur ausfuehren, wenn das Skript direkt gestartet wird (nicht beim Import in Tests).
const invokedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (invokedDirectly) {
  main().catch((err) => {
    console.error("[build] Fehler:", err);
    process.exit(1);
  });
}
