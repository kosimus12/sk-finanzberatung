/**
 * Wiederverwendbare UI-Komponenten als reine Render-Funktionen (HTML-Strings).
 * Werden in den Seiten-Modulen zusammengesetzt.
 */
import { esc, join, cls } from "./html.mjs";
import { icon } from "./icons.mjs";
import { site, CALENDLY_URL } from "../data/site.mjs";
import { mascot, avatarPhoto } from "../data/images.mjs";

const NEWSLETTER_ACTION = process.env.PUBLIC_NEWSLETTER_ACTION || "";

/** Button / Link-Button. variant: cta | primary | ghost | outline */
export function button(label, href, { variant = "cta", classes = "", icon: ic, external = false } = {}) {
  const rel = external ? ' target="_blank" rel="noopener"' : "";
  const iconHtml = ic ? icon(ic, { size: 20 }) : "";
  return `<a class="${cls("btn", `btn--${variant}`, classes)}" href="${esc(href)}"${rel}>${esc(label)}${iconHtml}</a>`;
}

/** Breadcrumb-Navigation (sichtbar; Schema kommt separat über schema.mjs). */
export function breadcrumbs(crumbs) {
  const items = crumbs
    .map((c, i) => {
      const last = i === crumbs.length - 1;
      if (last) return `<li aria-current="page">${esc(c.label)}</li>`;
      return `<li><a href="${esc(c.href)}">${esc(c.label)}</a>${icon("chevronRight", { size: 14, class: "crumb__sep" })}</li>`;
    })
    .join("");
  return `<nav class="breadcrumbs" aria-label="Brotkrumen"><div class="container"><ol>${items}</ol></div></nav>`;
}

/** Sektions-Ueberschrift mit optionaler Subline. `as` wählt das Heading-Level. */
export function sectionHeader(title, subline, { center = true, eyebrow, as = "h2" } = {}) {
  const tag = as === "h1" ? "h1" : "h2";
  return `
    <header class="${cls("section-head", center && "section-head--center")}">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
      <${tag}>${esc(title)}</${tag}>
      ${subline ? `<p class="section-head__sub">${esc(subline)}</p>` : ""}
    </header>`;
}

/** Maskottchen-Bild (Finanzwaschbär). `key` = Pose (z. B. "du", "pkv", "tablet"). */
export function waschbaer(key, alt, { width = 320, height = 320, className = "", eager = false } = {}) {
  return `<img class="${cls("waschbaer", className)}" src="${esc(mascot(key))}"
    width="${width}" height="${height}" alt="${esc(alt)}"
    loading="${eager ? "eager" : "lazy"}" decoding="async" />`;
}

/** Sterne-Bewertung. */
export function stars(rating = 5) {
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += icon("star", { size: 18, filled: i < Math.round(rating), class: i < Math.round(rating) ? "star star--on" : "star" });
  }
  return `<span class="stars" aria-label="${esc(rating)} von 5 Sternen" role="img">${out}</span>`;
}

/** Dienstleistungs-Karte. */
export function serviceCard(service) {
  return `
    <article class="card card--service">
      <div class="card__icon">
        ${waschbaer(service.icon, service.iconAlt, { width: 120, height: 120, className: "card__avatar" })}
      </div>
      <h3 class="card__title">${esc(service.shortTitle)}</h3>
      <p class="card__text">${esc(service.excerpt)}</p>
      <a class="card__link" href="/${esc(service.slug)}/">Mehr erfahren ${icon("arrowRight", { size: 16 })}</a>
    </article>`;
}

/** Ratgeber-Karte. */
export function ratgeberCard(article) {
  return `
    <article class="card card--guide">
      <a class="card__media" href="/ratgeber/${esc(article.slug)}/" aria-hidden="true" tabindex="-1">
        ${waschbaer(article.icon, article.iconAlt, { width: 160, height: 160 })}
      </a>
      <div class="card__body">
        <h3 class="card__title"><a href="/ratgeber/${esc(article.slug)}/">${esc(article.title)}</a></h3>
        <p class="card__text">${esc(article.excerpt)}</p>
        <a class="card__link" href="/ratgeber/${esc(article.slug)}/">Weiterlesen ${icon("arrowRight", { size: 16 })}</a>
      </div>
    </article>`;
}

/** Vergleichsrechner-Karte. */
export function vergleichCard(item) {
  return `
    <article class="card card--compare">
      <div class="card__icon card__icon--svg">${icon(item.icon, { size: 30 })}</div>
      <h3 class="card__title">${esc(item.title)}</h3>
      <p class="card__text">${esc(item.description)}</p>
      <a class="card__link" href="${esc(item.href)}">Jetzt vergleichen ${icon("arrowRight", { size: 16 })}</a>
    </article>`;
}

/** Testimonial-Karte (mit Portraitfoto, falls vorhanden). */
export function testimonialCard(t) {
  const avatar = t.photo
    ? `<img class="testimonial__avatar" src="${esc(avatarPhoto(t.photo))}" width="56" height="56"
         alt="Portrait von ${esc(t.name)}" loading="lazy" decoding="async" />`
    : "";
  return `
    <figure class="card card--testimonial">
      ${stars(t.rating)}
      <blockquote><p>${esc(t.text)}</p></blockquote>
      <figcaption class="testimonial__by">${avatar}<span><strong>${esc(t.name)}</strong>${t.location ? `<br/><small>${esc(t.location)}</small>` : ""}</span></figcaption>
    </figure>`;
}

/** FAQ-Section (LLMO). Nutzt native <details> für Zugänglichkeit ohne JS. */
export function faqSection(faqs, { title = "Häufige Fragen", id = "faq" } = {}) {
  if (!faqs || !faqs.length) return "";
  const items = faqs
    .map(
      (f) => `
        <details class="faq__item">
          <summary class="faq__q">${esc(f.q)}${icon("chevronRight", { size: 18, class: "faq__chevron" })}</summary>
          <div class="faq__a"><p>${esc(f.a)}</p></div>
        </details>`,
    )
    .join("");
  return `
    <section class="section faq" id="${esc(id)}" aria-labelledby="${esc(id)}-title">
      <div class="container container--narrow">
        <h2 class="faq__title" id="${esc(id)}-title">${esc(title)}</h2>
        <div class="faq__list">${items}</div>
      </div>
    </section>`;
}

/** Vertrauens-Badge-Leiste (Google-Bewertung, Erfahrung, VDH). */
export function trustBadges() {
  return `
    <div class="trust-badges">
      <a class="trust-badge" href="${esc(site.trust.googleProfileUrl)}" target="_blank" rel="noopener">
        ${stars(site.trust.googleRating)}
        <span><strong>${site.trust.googleRating.toFixed(1)}</strong> bei Google &middot; ${site.trust.googleReviewCount} Rezensionen</span>
      </a>
      <span class="trust-badge">${icon("clock", { size: 20 })}<span><strong>${site.yearsExperience} Jahre</strong> Erfahrung</span></span>
      <span class="trust-badge">${icon("shield", { size: 20 })}<span>${esc(site.trust.vdhNote)}</span></span>
    </div>`;
}

/** Großer Closing-CTA-Banner (Footer-CTA). */
export function ctaBanner({
  title = "Bereit für eine finanzielle Zukunft?",
  bullets = [
    "Komplettberatung: Von A-Z, abgestimmt auf deine Lebenssituation",
    "Unabhängigkeit: Neutraler Vergleich aller führenden Anbieter",
    "Volle Transparenz: Jeder Schritt für dich nachvollziehbar",
  ],
  cta = { label: "Sicher dir deine persönliche Beratung!", href: "/kontakt/#termin" },
} = {}) {
  const list = bullets
    .map((b) => `<li>${icon("check", { size: 20, class: "check" })}<span>${esc(b)}</span></li>`)
    .join("");
  return `
    <section class="section cta-banner">
      <div class="container cta-banner__inner">
        <div class="cta-banner__text">
          <h2>${esc(title)}</h2>
          <ul class="cta-banner__list">${list}</ul>
          <p class="cta-banner__note">Unverbindlich und ohne Risiko - die Erstberatung ist kostenfrei.</p>
        </div>
        <div class="cta-banner__action">
          ${button(cta.label, cta.href, { variant: "cta", classes: "btn--lg" })}
          ${waschbaer("cta", "Finanzwaschbär lädt dich zur kostenlosen Beratung ein", { width: 240, height: 240, className: "cta-banner__mascot" })}
        </div>
      </div>
    </section>`;
}

/**
 * Calendly-Terminbuchung. Lädt erst nach Cookie-Zustimmung (Datenschutz).
 * Fallback: deutlicher Hinweis + Kontaktmoeglichkeiten, falls kein Link gesetzt.
 */
export function bookingWidget({ id = "termin" } = {}) {
  const hasUrl = Boolean(CALENDLY_URL);
  const fallback = `
      <div class="booking__fallback">
        <p>Die Online-Terminbuchung ist gleich für dich da. Du erreichst uns jederzeit direkt:</p>
        <div class="booking__fallback-actions">
          ${button("Anrufen", `tel:${site.contact.phoneIntl}`, { variant: "outline", icon: "phone" })}
          ${button("E-Mail schreiben", `mailto:${site.contact.email}`, { variant: "outline", icon: "mail" })}
        </div>
      </div>`;

  return `
    <section class="section booking" id="${esc(id)}" aria-labelledby="booking-title">
      <div class="container">
        <h2 class="booking__title" id="booking-title">Termin direkt online buchen</h2>
        <p class="booking__sub">Wähle einen freien Slot aus meinem Kalender - du bekommst sofort eine Bestätigung per E-Mail.</p>
        <div class="booking__widget"
             data-calendly="${hasUrl ? esc(CALENDLY_URL) : ""}"
             aria-live="polite">
          ${hasUrl ? `<noscript><p>Bitte aktiviere JavaScript oder <a href="${esc(CALENDLY_URL)}" target="_blank" rel="noopener">öffne den Kalender direkt</a>.</p></noscript>` : fallback}
        </div>
      </div>
    </section>`;
}

/**
 * Newsletter-Anmeldung (Lead-Magnet). Bindet ein Double-Opt-in-Formular ein.
 * Action-URL kommt aus .env (PUBLIC_NEWSLETTER_ACTION, z. B. Brevo-Formular).
 * Ohne URL: Fallback über das Kontaktformular bzw. mailto.
 */
export function newsletterSection() {
  const hasAction = Boolean(NEWSLETTER_ACTION);
  const formAttrs = hasAction
    ? `action="${esc(NEWSLETTER_ACTION)}" method="post" target="_blank"`
    : `action="mailto:${esc(site.contact.email)}" method="post" enctype="text/plain"`;
  return `
    <section class="section newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div class="container newsletter__inner">
        <div class="newsletter__media">
          ${waschbaer("newsletter", "Finanzwaschbär mit Briefumschlag - Newsletter", { width: 220, height: 220 })}
        </div>
        <div class="newsletter__content">
          <p class="eyebrow eyebrow--light">Newsletter</p>
          <h2 id="newsletter-title">Finanz-Tipps für den öffentlichen Dienst</h2>
          <p>Alle paar Wochen die wichtigsten Tipps zu Absicherung, Vorsorge und Vermögensaufbau -
             verständlich, ehrlich und kostenlos. Jederzeit abbestellbar.</p>
          <form class="newsletter__form" ${formAttrs} novalidate>
            <div class="newsletter__row">
              <label class="sr-only" for="nl-name">Vorname</label>
              <input id="nl-name" name="VORNAME" type="text" placeholder="Vorname" autocomplete="given-name" />
              <label class="sr-only" for="nl-email">E-Mail</label>
              <input id="nl-email" name="EMAIL" type="email" placeholder="deine@email.de" autocomplete="email" required />
              <button class="btn btn--cta" type="submit">Abonnieren</button>
            </div>
            <label class="newsletter__consent">
              <input type="checkbox" name="OPT_IN" value="1" required />
              <span>Ich möchte den Newsletter erhalten und habe die <a href="/datenschutz/">Datenschutzerklärung</a> gelesen.</span>
            </label>
          </form>
        </div>
      </div>
    </section>`;
}

/**
 * Social-Media-Embeds (YouTube/TikTok/Instagram).
 * Datenschutzfreundlich: laedt erst nach Klick/Zustimmung (data-Attribute).
 * Fallback: statische Karten mit Profil-Links.
 */
export function socialEmbeds() {
  // Aktuell nur Instagram (kein TikTok-/YouTube-Content vorhanden).
  return `
    <section class="section social" aria-labelledby="social-title">
      <div class="container">
        <h2 id="social-title" class="section-head section-head--center">Folge dem Finanzwaschbär</h2>
        <p class="section-head__sub section-head--center">Tipps, Erklärungen und News - kurz und auf den Punkt, auf Instagram.</p>
        <div class="social__grid social__grid--single">
          <a class="social-card social-card--instagram" href="${esc(site.social.instagram)}" target="_blank" rel="noopener">
            <span class="social-card__badge">Instagram</span>
            <span class="social-card__handle">@${esc(site.social.instagramHandle)}</span>
            <span class="social-card__cta">Profil ansehen ${icon("arrowRight", { size: 16 })}</span>
          </a>
        </div>
      </div>
    </section>`;
}
