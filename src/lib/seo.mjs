/**
 * SEO-Helfer: erzeugt die <meta>-Tags für <head>.
 * Title max. 60 Zeichen, Description max. 160 Zeichen (siehe Brief).
 */
import { esc } from "./html.mjs";
import { SITE_URL, site } from "../data/site.mjs";

const DEFAULT_OG_IMAGE = "/images/og-default.png";

/** Absoluten URL aus einem Pfad bauen. */
export function absUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return SITE_URL + (path.startsWith("/") ? path : "/" + path);
}

/** Title auf max. 60, Description auf max. 160 Zeichen begrenzen (mit Warnung im Build-Log). */
function clamp(value, max, field) {
  if (value && value.length > max) {
    console.warn(`[SEO] ${field} ist ${value.length} Zeichen lang (max ${max}): "${value}"`);
  }
  return value;
}

/**
 * Meta-Tags rendern.
 * @param {{title:string,description:string,path:string,ogImage?:string,noindex?:boolean,type?:string}} page
 */
export function renderMeta(page) {
  const title = clamp(page.title, 60, "Title");
  const description = clamp(page.description, 160, "Description");
  const canonical = absUrl(page.path);
  const ogImage = absUrl(page.ogImage || DEFAULT_OG_IMAGE);
  const type = page.type || "website";

  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    page.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow" />`,
    // Open Graph (Shareability)
    `<meta property="og:type" content="${esc(type)}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta property="og:locale" content="${esc(site.locale)}" />`,
    // Twitter
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`,
  ].join("\n    ");
}
