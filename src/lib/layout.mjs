/**
 * Basis-Layout: rendert das komplette HTML-Dokument inkl. <head> (SEO, Schema),
 * Skip-Link, Header (Navigation), Footer, Cookie-Banner und WhatsApp-Button.
 *
 * renderPage(page) erwartet:
 *  {
 *    title, description, path,        // SEO
 *    ogImage?, type?, noindex?,
 *    schema: [ ...JSON-LD-Objekte ],  // strukturierte Daten
 *    breadcrumbs?: [{label,href}],    // optional (Schema + Anzeige übernimmt die Seite)
 *    bodyClass?, body                 // Inhalt (HTML-String)
 *  }
 */
import { esc, join } from "./html.mjs";
import { renderMeta } from "./seo.mjs";
import { jsonLd, websiteSchema } from "./schema.mjs";
import { icon } from "./icons.mjs";
import { site, nav, legalNav, primaryCta } from "../data/site.mjs";
import { logo } from "../data/images.mjs";

// Google Analytics 4 Mess-ID (aus .env). Wird erst nach Cookie-Zustimmung geladen.
const GA_ID = process.env.PUBLIC_GA4_ID || "";

// Logo (echtes SK-Logo, transparent freigestellt).
function brandMark(size = 40) {
  return `<img class="brand__logo" src="${esc(logo())}" width="${size}" height="${size}"
    alt="${esc(site.name)} Logo" loading="eager" decoding="async" />`;
}

function header() {
  const links = nav
    .map(
      (item) =>
        `<li><a class="nav__link" href="${esc(item.href)}" data-path="${esc(item.href)}">${esc(item.label)}</a></li>`,
    )
    .join("\n          ");

  return `
  <header class="site-header" id="top">
    <div class="container site-header__inner">
      <a class="brand" href="/" aria-label="${esc(site.name)} - Startseite">
        ${brandMark(40)}
        <span class="brand__name">${esc(site.name)}</span>
      </a>

      <button class="nav-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false"
              aria-controls="primary-nav">
        ${icon("menu", { class: "nav-toggle__open" })}
        ${icon("close", { class: "nav-toggle__close" })}
      </button>

      <nav class="nav" id="primary-nav" aria-label="Hauptnavigation">
        <ul class="nav__list">
          ${links}
        </ul>
        <a class="btn btn--cta nav__cta" href="${esc(primaryCta.href)}">${esc("Beratung sichern")}</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  const c = site.contact;
  const navCols = nav
    .filter((n) => n.href !== "/")
    .map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`)
    .join("\n            ");
  const legalCols = legalNav
    .map((n) => `<li><a href="${esc(n.href)}">${esc(n.label)}</a></li>`)
    .join("\n            ");

  return `
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        ${brandMark(48)}
        <p class="site-footer__claim">Unabhängige Beratung für den öffentlichen Dienst.<br/>Digital, ehrlich, auf Augenhöhe.</p>
        <p class="site-footer__vdh">${icon("shield", { size: 18 })} ${esc(site.yearsExperience)} Jahre Erfahrung &middot; ${esc(site.consultations)}+ Beratungen</p>
      </div>

      <nav class="site-footer__col" aria-label="Seiten">
        <h2 class="site-footer__title">Navigation</h2>
        <ul>
            ${navCols}
            <li><a href="/lexikon/">Lexikon</a></li>
        </ul>
      </nav>

      <nav class="site-footer__col" aria-label="Rechtliches">
        <h2 class="site-footer__title">Rechtliches</h2>
        <ul>
            ${legalCols}
        </ul>
      </nav>

      <div class="site-footer__col">
        <h2 class="site-footer__title">Kontakt</h2>
        <ul class="site-footer__contact">
          <li>${icon("phone", { size: 18 })} <a href="tel:${esc(c.phoneIntl)}">${esc(c.phone)}</a></li>
          <li>${icon("mail", { size: 18 })} <a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
          <li>${icon("clock", { size: 18 })} <span>${esc(c.hours)}</span></li>
          <li>${icon("location", { size: 18 })} <span>${esc(c.address.street)}, ${esc(c.address.zip)} ${esc(c.address.city)}</span></li>
        </ul>
      </div>
    </div>

    <div class="container site-footer__bottom">
      <p>&copy; ${new Date().getFullYear()} ${esc(site.name)} &middot; ${esc(site.owner.name)}</p>
      <p class="site-footer__region">Unabhängige Finanzberatung deutschlandweit per Video &middot; persönlich in Ostfriesland, im Emsland und Umgebung (Papenburg, Leer, Emden)</p>
      <p class="site-footer__bafin">${esc(site.legal.bafinNote)}</p>
    </div>
  </footer>`;
}

function cookieBanner() {
  return `
  <div class="cookie-banner" id="cookie-banner" role="dialog" aria-live="polite"
       aria-label="Cookie-Einwilligung" hidden>
    <div class="cookie-banner__inner container">
      <div class="cookie-banner__text">
        <strong>Wir respektieren deine Privatsphäre.</strong>
        <p>Wir nutzen nur technisch notwendige Cookies. Optionale Inhalte (z. B. Videos, Social Media)
           werden erst nach deiner Zustimmung geladen.
           Mehr dazu in der <a href="/datenschutz/">Datenschutzerklärung</a>.</p>
      </div>
      <div class="cookie-banner__actions">
        <button class="btn btn--ghost" type="button" data-cookie="reject">Ablehnen</button>
        <button class="btn btn--ghost" type="button" data-cookie="customize">Einstellungen</button>
        <button class="btn btn--cta" type="button" data-cookie="accept">Akzeptieren</button>
      </div>
    </div>
  </div>`;
}

function whatsappButton() {
  const wa = site.contact.whatsapp.replace(/[^0-9]/g, "");
  const msg = encodeURIComponent("Hallo Simon, ich interessiere mich für eine unabhängige Beratung.");
  return `
  <a class="whatsapp-fab" href="https://wa.me/${wa}?text=${msg}" target="_blank" rel="noopener"
     aria-label="Per WhatsApp Kontakt aufnehmen">
    ${icon("whatsapp", { size: 28, filled: true })}
    <span class="whatsapp-fab__label">WhatsApp</span>
  </a>`;
}

export function renderPage(page) {
  const schema = [websiteSchema(), ...(page.schema || [])].map(jsonLd).join("\n    ");

  return `<!doctype html>
<html lang="${esc(site.language)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0A1A5C" />
    ${renderMeta(page)}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.png" sizes="any" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" />
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap"
      media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" /></noscript>
    <link rel="stylesheet" href="/styles.css" />
    ${schema}
  </head>
  <body class="${esc(page.bodyClass || "")}">
    <a class="skip-link" href="#main">Zum Inhalt springen</a>
    ${header()}
    <main id="main">
${page.body}
    </main>
    ${footer()}
    ${whatsappButton()}
    <div class="mobile-cta" aria-label="Schnellkontakt">
      <a class="btn btn--cta" href="${esc(primaryCta.href)}">${icon("calendar", { size: 18 })} Kostenloses Erstgespräch</a>
    </div>
    ${cookieBanner()}
    <script>window.SK_CONFIG = { gaId: ${JSON.stringify(GA_ID)} };</script>
    <script src="/main.js" defer></script>
  </body>
</html>`;
}
