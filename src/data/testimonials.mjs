/**
 * Kundenbewertungen für die Testimonials-Section.
 * Hinweis: Beispiel-Stimmen mit KI-generierten Portraitfotos (photo = Key aus
 * images.mjs). Vor dem Live-Gang bitte durch echte, freigegebene Kundenstimmen
 * ersetzen (DSGVO beachten).
 */

export const testimonials = [
  {
    name: "Lena, 27",
    location: "Referendarin (Lehramt)",
    rating: 5,
    photo: "person1",
    text: "Simon hat mir als Referendarin endlich erklärt, warum die Dienstunfähigkeit so wichtig ist - verständlich, ohne Druck. Jetzt bin ich ruhig abgesichert.",
  },
  {
    name: "Daniel, 29",
    location: "Beamter auf Probe",
    rating: 5,
    photo: "person2",
    text: "Beihilfe und PKV waren für mich ein Buch mit sieben Siegeln. Die Online-Beratung war unkompliziert und genau auf meine Situation zugeschnitten.",
  },
  {
    name: "Sandra, 34",
    location: "Verwaltung, öffentlicher Dienst",
    rating: 5,
    photo: "person3",
    text: "Wir haben meine alten Verträge gecheckt und dabei richtig Geld gespart. Transparent, freundlich und komplett unabhängig. Absolute Empfehlung!",
  },
  {
    name: "Raj, 31",
    location: "Expat in Deutschland",
    rating: 5,
    photo: "person5",
    text: "Zuerst hatte ich etwas Angst, weil ich neu in Deutschland bin, kein Deutsch spreche und mich mit Versicherungen nicht auskenne. Aber er war ein sehr freundlicher und kluger Mann, der sehr gut Englisch spricht, sodass wir meine finanzielle Situation klären konnten.",
  },
  {
    name: "Claudia, 42",
    location: "Privatkundin",
    rating: 5,
    photo: "person6",
    text: "Danke für die angenehme, kompetente und zuverlässige Beratung. Ich freue mich auf eine langfristige Zusammenarbeit.",
  },
  {
    name: "Andreas, 39",
    location: "Öffentlicher Dienst",
    rating: 5,
    photo: "person7",
    text: "Man kann ihn nur weiterempfehlen. Sehr nettes und freundliches Auftreten, gute Beratung ... Top.",
  },
];

export const ratingSummary = {
  value: 5.0,
  count: testimonials.length,
};
