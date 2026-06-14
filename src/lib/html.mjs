/**
 * Winzige HTML-Helfer (keine externen Abhängigkeiten).
 * Sorgt für sicheres Escaping und bequemes Zusammensetzen von Markup.
 */

/** HTML-Sonderzeichen escapen (gegen kaputtes Markup / XSS in Texten). */
export function esc(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Attribut-Wert escapen (für Werte in Anführungszeichen). */
export function escAttr(value) {
  return esc(value);
}

/**
 * Array von HTML-Strings (oder Falsy-Werten) zu einem String verbinden.
 * Falsy-Einträge werden übersprungen -> bequeme Bedingungen im Markup.
 */
export function join(parts, separator = "\n") {
  return parts.filter(Boolean).join(separator);
}

/** Klassenliste aus Strings/Bedingungen bauen. */
export function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

/** Mehrzeiligen Text in <p>-Absätze umwandeln (max. 3-4 Sätze pro Absatz). */
export function paragraphs(text) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => `<p>${esc(p.trim())}</p>`)
    .join("\n");
}
