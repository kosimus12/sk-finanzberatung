/**
 * Zentrale Bild-/Video-Quellen.
 *
 * Die KI-generierten Assets (Higgsfield) liegen aktuell auf dem Higgsfield-CDN.
 * Für das finale Self-Hosting auf Cloudflare: `npm run download-images` spiegelt
 * sie nach public/images/generated/ und setzt USE_LOCAL=true.
 *
 * Umschalten: Umgebungsvariable PUBLIC_USE_LOCAL_IMAGES=true  -> lokale Pfade.
 */
import gen from "./generated-images.json" with { type: "json" };

const USE_LOCAL = process.env.PUBLIC_USE_LOCAL_IMAGES === "true";

// Lokaler Zielpfad-Bauer (nach Download)
function local(kind, key, ext = "webp") {
  return `/images/generated/${kind}-${key}.${ext}`;
}

/** URL für ein Maskottchen-Bild (transparent). key z. B. "du", "pkv", "tablet". */
export function mascot(key) {
  if (USE_LOCAL) return local("waschbaer", key, "png");
  return gen.waschbaer[key] || gen.waschbaer.greeting;
}

/** Foto von Simon. key: hero | hero_b | macbook | flipchart */
export function photo(key) {
  if (USE_LOCAL) return local("simon", key, "png");
  return gen.simon[key] || gen.simon.hero;
}

/** Testimonial-Portrait. key: person1..person4 */
export function avatarPhoto(key) {
  if (USE_LOCAL) return local("testimonial", key, "png");
  return gen.testimonials[key];
}

/** Logo (weißer Springer, transparent). */
export function logo() {
  if (USE_LOCAL) return "/images/generated/logo-white.png";
  return gen.logo.white_transparent;
}

/** Video (Waschbär winkt). */
export function video(key = "waschbaer_winkt") {
  if (USE_LOCAL) return `/images/generated/video-${key}.mp4`;
  return gen.video[key];
}

export const images = gen;
