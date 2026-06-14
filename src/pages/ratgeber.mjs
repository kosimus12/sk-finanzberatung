/** Ratgeber: Übersichtsseite + Artikel-Detailseiten. */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import {
  ratgeberCard,
  sectionHeader,
  breadcrumbs,
  faqSection,
  button,
  waschbaer,
  ctaBanner,
} from "../lib/components.mjs";
import {
  articleSchema,
  faqSchema,
  breadcrumbSchema,
} from "../lib/schema.mjs";
import { ratgeber, getArticle } from "../data/ratgeber.mjs";

const ratgeberFaqs = [
  {
    q: "Sind die Ratgeber kostenlos?",
    a: "Ja, alle Ratgeber sind frei zugänglich und kostenlos. Sie sollen dir helfen, deine Finanzen besser zu verstehen - ganz ohne Fachjargon.",
  },
  {
    q: "Wie oft kommen neue Ratgeber dazu?",
    a: "Wir erweitern die Ratgeber regelmäßig um aktuelle Themen rund um Geldanlage, Versicherungen und Vorsorge. Schau also gern öfter vorbei.",
  },
  {
    q: "An wen richten sich die Ratgeber?",
    a: "An alle, die ihre Finanzen verstehen wollen - mit besonderem Fokus auf Beamte, Referendare und den öffentlichen Dienst. Wir erklären auch komplexe Themen einfach und ohne Fachjargon.",
  },
  {
    q: "Ersetzen die Ratgeber eine persönliche Beratung?",
    a: "Sie geben dir einen guten Überblick und beantworten viele Fragen. Für deine individuelle Situation - etwa die genaue Höhe deiner Versorgungslücke - ist ein persönliches Gespräch aber durch nichts zu ersetzen.",
  },
];

/** Uebersicht /ratgeber/ */
export function ratgeberIndex() {
  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Ratgeber", href: "/ratgeber/" },
  ];
  const body = `
    ${breadcrumbs(crumbs)}
    <section class="section page-intro">
      <div class="container">
        ${sectionHeader("Unsere Ratgeber", "Informationen, Tipps und Empfehlungen, auf den Punkt gebracht und ohne Fachjargon!", { eyebrow: "Wissen, das dir hilft", as: "h1" })}
        <div class="grid grid--guides">
          ${ratgeber.map(ratgeberCard).join("\n          ")}
        </div>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="container">
        <article class="card card--compare" style="text-align:center">
          <div class="card__icon card__icon--svg" style="margin-inline:auto">${icon("compass", { size: 30 })}</div>
          <h3 class="card__title">Beamten-Finanzlexikon</h3>
          <p class="card__text">Dienstunfähigkeit, Beihilfe, Versorgungslücke, ETF &amp; mehr - alle wichtigen Begriffe einfach erklärt.</p>
          <a class="card__link" href="/lexikon/">Zum Lexikon ${icon("arrowRight", { size: 16 })}</a>
        </article>
      </div>
    </section>

    ${faqSection(ratgeberFaqs)}
    ${ctaBanner({ title: "Lieber direkt fragen?" })}
  `;
  return {
    title: "Ratgeber: Finanzen & Versicherungen einfach erklärt",
    description:
      "Finanz-Ratgeber ohne Fachjargon: investieren lernen, Gebühren sparen, Versicherungen verstehen. Praktische Tipps für deine finanzielle Selbstbestimmtheit.",
    path: "/ratgeber/",
    schema: [breadcrumbSchema(crumbs), faqSchema(ratgeberFaqs)],
    body,
  };
}

/** Artikel-Detail /ratgeber/[slug]/ */
export function ratgeberDetail(slug) {
  const a = getArticle(slug);
  if (!a) throw new Error(`Artikel nicht gefunden: ${slug}`);

  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Ratgeber", href: "/ratgeber/" },
    { label: a.title, href: `/ratgeber/${a.slug}/` },
  ];

  const sections = a.sections
    .map(
      (sec) => `
      <section class="article__section">
        <h2>${esc(sec.heading)}</h2>
        ${sec.body
          .split(/\n\s*\n/)
          .map((p) => `<p>${esc(p.trim())}</p>`)
          .join("\n        ")}
      </section>`,
    )
    .join("");

  const related = (a.related || [])
    .map((r) => getArticle(r))
    .filter(Boolean)
    .map(
      (ra) =>
        `<a class="related__link" href="/ratgeber/${esc(ra.slug)}/">${esc(ra.title)} ${icon("arrowRight", { size: 16 })}</a>`,
    )
    .join("");

  const body = `
    ${breadcrumbs(crumbs)}
    <article class="article">
      <div class="container container--narrow">
        <header class="article__head">
          ${waschbaer(a.icon, a.iconAlt, { width: 160, height: 160, className: "article__avatar", eager: true })}
          <div>
            <h1>${esc(a.title)}</h1>
            <p class="article__meta">${icon("clock", { size: 16 })} ca. ${a.readingMinutes} Min. Lesezeit</p>
          </div>
        </header>
        <div class="article__intro">${a.intro
          .split(/\n\s*\n/)
          .map((p) => `<p>${esc(p.trim())}</p>`)
          .join("")}</div>
        ${sections}
      </div>
    </article>

    ${faqSection(a.faqs, { title: "Häufige Fragen" })}

    ${
      related
        ? `<section class="section related"><div class="container container--narrow">
            <h2 class="section-head section-head--center">Weiterlesen</h2>
            <div class="related__links">${related}</div>
          </div></section>`
        : ""
    }

    ${ctaBanner({ title: "Noch Fragen? Lass uns sprechen." })}
  `;

  return {
    title: truncate(a.title, 60),
    description: a.metaDescription,
    path: `/ratgeber/${a.slug}/`,
    type: "article",
    schema: [breadcrumbSchema(crumbs), articleSchema(a), faqSchema(a.faqs)],
    body,
  };
}

function truncate(str, max) {
  return str.length <= max ? str : str.slice(0, max - 1).trimEnd() + "…";
}
