/**
 * Schema.org JSON-LD Generatoren (strukturierte Daten für SEO & LLMO).
 * Unterstützt: Organization, Person, Service, FAQPage, BreadcrumbList, Article, WebSite.
 */
import { SITE_URL, site } from "../data/site.mjs";
import { absUrl } from "./seo.mjs";
import { photo, mascot } from "../data/images.mjs";

const ORG_ID = SITE_URL + "/#organization";
const PERSON_ID = SITE_URL + "/#person";

/** JSON-LD in ein <script>-Tag verpacken. */
export function jsonLd(data) {
  // Sicheres Einbetten: </script> in Strings neutralisieren.
  const json = JSON.stringify(data).replace(/<\/script>/gi, "<\\/script>");
  return `<script type="application/ld+json">${json}</script>`;
}

/** Organisation (ProfessionalService - lokaler Finanzdienstleister). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    image: absUrl("/images/og-default.png"),
    logo: absUrl("/images/logo.png"),
    description: site.description,
    founder: { "@id": PERSON_ID },
    foundingDate: String(site.founded),
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "AdministrativeArea", name: "Ostfriesland" },
      { "@type": "AdministrativeArea", name: "Emsland" },
      { "@type": "City", name: "Papenburg" },
      { "@type": "City", name: "Leer" },
      { "@type": "City", name: "Emden" },
    ],
    knowsAbout: [
      "Dienstunfähigkeitsversicherung für Beamte",
      "Berufsunfähigkeitsversicherung",
      "Beihilfekonforme private Krankenversicherung",
      "Altersvorsorge und Versorgungslücke für Beamte",
      "ETF-Vermögensaufbau",
      "Diensthaftpflicht",
      "Honorarberatung für den öffentlichen Dienst",
    ],
    email: site.contact.email,
    telephone: site.contact.phoneIntl,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      postalCode: site.contact.address.zip,
      addressLocality: site.contact.address.city,
      addressRegion: site.contact.address.region,
      addressCountry: site.contact.address.country,
    },
    priceRange: "Honorarbasis",
    sameAs: [site.trust.googleProfileUrl, site.social.instagram, site.social.tiktok].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.trust.googleRating,
      reviewCount: site.trust.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

/** Person (Inhaber Simon Kuper). */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.owner.name,
    jobTitle: site.owner.role,
    description: site.owner.qualifications,
    worksFor: { "@id": ORG_ID },
    url: absUrl("/ueber-uns/"),
    image: photo("hero"),
  };
}

/** WebSite (mit potentieller Suche). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: site.name,
    inLanguage: "de-DE",
    publisher: { "@id": ORG_ID },
  };
}

/** Service-Schema für eine Dienstleistungs-Detailseite. */
export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.shortTitle,
    url: absUrl(`/${service.slug}/`),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Deutschland" },
  };
}

/** FAQPage-Schema aus einer FAQ-Liste [{q,a}]. */
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList aus [{label,href}]. */
export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absUrl(c.href),
    })),
  };
}

/** Article-Schema für Ratgeber-Artikel. */
export function articleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: mascot(article.icon),
    url: absUrl(`/ratgeber/${article.slug}/`),
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "de-DE",
  };
}
