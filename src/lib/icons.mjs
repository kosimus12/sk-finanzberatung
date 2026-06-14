/**
 * Inline-SVG-Icons (skalierbar, ohne externe Abhängigkeit, schnelles Rendering).
 * Verwendung: icon("chart", { class: "...", size: 28 })
 * Alle Icons nutzen currentColor, damit sie sich per CSS einfärben lassen.
 */

const PATHS = {
  // UI
  menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
  close: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  chevronRight: '<polyline points="9 6 15 12 9 18"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  // Kontakt
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/>',
  whatsapp: '<path d="M20.5 3.5A11.94 11.94 0 0 0 12 0 12 12 0 0 0 1.6 17.9L0 24l6.3-1.65A12 12 0 0 0 12 24a12 12 0 0 0 8.5-20.5zM12 21.8a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.74.98 1-3.65-.23-.37A9.82 9.82 0 1 1 12 21.8zm5.5-7.36c-.3-.15-1.77-.87-2.04-.97s-.47-.15-.67.15-.77.96-.94 1.16-.35.22-.65.07a8 8 0 0 1-2.36-1.45 8.9 8.9 0 0 1-1.63-2.03c-.17-.3 0-.46.13-.6s.3-.35.45-.52a2 2 0 0 0 .3-.5.55.55 0 0 0 0-.52c-.07-.15-.67-1.62-.92-2.21s-.49-.5-.67-.51h-.57a1.1 1.1 0 0 0-.8.37 3.35 3.35 0 0 0-1.04 2.48 5.8 5.8 0 0 0 1.22 3.09 13.3 13.3 0 0 0 5.1 4.5c.71.3 1.27.49 1.7.63a4.1 4.1 0 0 0 1.88.12 3.07 3.07 0 0 0 2-1.42 2.5 2.5 0 0 0 .17-1.41c-.07-.13-.27-.2-.57-.35z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
  location: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>',
  // Vergleiche / Services
  wallet: '<path d="M21 7H5a2 2 0 0 1 0-4h14v4z"/><path d="M3 5v14a2 2 0 0 0 2 2h16V7"/><circle cx="17" cy="14" r="1.3"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  piggy: '<path d="M19 10c.7 0 1 .8 1 1.5S19.7 13 19 13M5 11a6 6 0 0 1 6-5h2a6 6 0 0 1 6 6 6 6 0 0 1-2 4.5V20h-3v-2h-4v2H7v-3a6 6 0 0 1-2-4.5z"/><circle cx="9.5" cy="11" r="1"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  chart: '<line x1="4" y1="20" x2="20" y2="20"/><rect x="6" y="12" width="3" height="6"/><rect x="11" y="8" width="3" height="10"/><rect x="16" y="4" width="3" height="14"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"/>',
  robot: '<rect x="5" y="8" width="14" height="11" rx="2"/><line x1="12" y1="4" x2="12" y2="8"/><circle cx="12" cy="3.5" r="1.5"/><circle cx="9" cy="13" r="1.2"/><circle cx="15" cy="13" r="1.2"/>',
  health: '<path d="M19 13.5C16.5 16 12 20 12 20s-4.5-4-7-6.5A4.5 4.5 0 1 1 12 7a4.5 4.5 0 1 1 7 6.5z"/><polyline points="8.5 12 11 12 12 10 13 14 14 12 16 12"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/>',
  // USP
  hand: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V6a1.5 1.5 0 0 1 3 0v5M16 8.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4.5 14a1.6 1.6 0 0 1 2.4-2L8 13"/>',
  compass: '<circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 11 11 8.5 15.5 13 13"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
};

/**
 * Inline-SVG erzeugen.
 * @param {string} name  Schlüssel aus PATHS
 * @param {{class?:string,size?:number,filled?:boolean,title?:string}} opts
 */
export function icon(name, opts = {}) {
  const body = PATHS[name];
  if (!body) return "";
  const size = opts.size || 24;
  const className = opts.class ? ` class="${opts.class}"` : "";
  const filled = opts.filled === true;
  const titleEl = opts.title ? `<title>${opts.title}</title>` : "";
  const role = opts.title ? ' role="img"' : ' aria-hidden="true"';
  return (
    `<svg${className} xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
    `viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" ` +
    `stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${role}>${titleEl}${body}</svg>`
  );
}

export function hasIcon(name) {
  return Boolean(PATHS[name]);
}
