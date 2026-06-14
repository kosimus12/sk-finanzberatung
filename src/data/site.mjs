/**
 * Zentrale Geschäfts- und Seitendaten (Stand: aktuelle Angaben von Simon Kuper).
 * Hier alles an einer Stelle pflegen - wird überall in der Website verwendet.
 */

export const SITE_URL = (process.env.PUBLIC_SITE_URL || "https://www.sk-finanzberatung.de").replace(/\/$/, "");

// Calendly-Link (mit Google Calendar verbunden)
export const CALENDLY_URL =
  process.env.PUBLIC_CALENDLY_URL || "https://calendly.com/sk-finanzberatung/finanzkonzept";

export const site = {
  name: "SK-Finanzberatung",
  legalName: "SK-Finanzberatung - Simon Kuper",
  tagline: "Finanzielle Sicherheit - planbar gemacht",
  description:
    "Unabhängige Finanz- und Versicherungsberatung für Beamte, Referendare und den öffentlichen Dienst. Digital, auf Augenhöhe, deutschlandweit per Video.",
  founded: 2016, // ~10 Jahre Erfahrung (2026)
  get yearsExperience() {
    return 10;
  },
  consultations: 400, // über 400 durchgeführte Onlineberatungen
  language: "de",
  locale: "de_DE",

  owner: {
    name: "Simon Kuper",
    role: "Inhaber, Finanzanlagen- & Versicherungsfachmann",
    qualifications:
      "Finanzanlagen- und Versicherungsfachmann, Master of Science, freiberuflicher Dozent",
    focus: "Fokus auf digitale Beratung - deutschlandweit und weltweit per Video",
  },

  contact: {
    email: "skfinanzberatung@gmail.com",
    phone: "0176 55506385",
    phoneIntl: "+4917655506385",
    whatsapp: "+4917655506385",
    hours: "Mo-Fr, 9-18 Uhr",
    whatsappNote: "Schnelle Antwort, oft auch am Wochenende",
    address: {
      street: "Großwolder Straße 167",
      zip: "26810",
      city: "Westoverledingen",
      region: "Niedersachsen",
      country: "DE",
    },
  },

  trust: {
    googleRating: 5.0,
    googleReviewCount: 9,
    googleProfileUrl: "https://www.google.com/search?q=sk-finanzberatung",
    vdhMember: false,
    vdhNote: "",
  },

  // Rechtliches (Impressum) - echte Angaben
  legal: {
    fullName: "Simon Kuper",
    addressLine: "Großwolder Straße 167, 26810 Westoverledingen",
    phone: "0176 55506385",
    email: "skfinanzberatung@gmail.com",
    taxNumber: "in Bearbeitung",
    // Versicherungsmakler nach § 34d Abs. 1 GewO
    regInsurance: "D-K3TA-L9PPF-26",
    // Finanzanlagenfachmann nach § 34f Abs. 1 GewO
    regInvestment: "D-F-121-HKA5-07",
    supervisoryAuthority: "Industrie- und Handelskammer Emden (IHK Emden)",
    registerCheck: "https://www.vermittlerregister.info/",
    ombudsman: "Versicherungsombudsmann e. V., Berlin",
    ombudsmanUrl: "https://www.versicherungsombudsmann.de/",
    liabilityInsurer: "ERGO Group AG, Victoriaplatz 2, 40198 Düsseldorf",
    bafinNote: "Unabhängiger Finanz- und Versicherungsmakler.",
  },

  social: {
    instagram: "https://www.instagram.com/finanzenmitwaschbaer/",
    instagramHandle: "finanzenmitwaschbaer",
    tiktok: "https://www.tiktok.com/@finanzenmitwaschbaer",
    tiktokHandle: "finanzenmitwaschbaer",
    youtube: "",
  },
};

// Hauptnavigation
export const nav = [
  { label: "Start", href: "/" },
  { label: "Leistungen", href: "/leistungen/" },
  { label: "Vergleiche", href: "/vergleiche/" },
  { label: "Ratgeber", href: "/ratgeber/" },
  { label: "Rechner", href: "/rechner/" },
  { label: "Über mich", href: "/ueber-uns/" },
  { label: "Kontakt", href: "/kontakt/" },
];

export const legalNav = [
  { label: "Impressum", href: "/impressum/" },
  { label: "Datenschutz", href: "/datenschutz/" },
  { label: "Vorabinformation", href: "/vorabinformation/" },
];

export const primaryCta = {
  label: "Kostenloses Erstgespräch sichern",
  href: "/kontakt/#termin",
};
