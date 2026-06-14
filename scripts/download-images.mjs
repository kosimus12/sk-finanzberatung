/**
 * Spiegelt die KI-generierten Bilder/Videos (Higgsfield-CDN) nach
 * public/images/generated/, damit die Seite die Assets selbst hostet
 * (empfohlen fuer Produktion / Cloudflare).
 *
 * Voraussetzung: Internetzugang. Aufruf:  npm run download-images
 * Danach in .env setzen:  PUBLIC_USE_LOCAL_IMAGES=true
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "images", "generated");

const gen = JSON.parse(await fs.readFile(path.join(ROOT, "src", "data", "generated-images.json"), "utf8"));

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  console.log("->", path.relative(ROOT, dest), `(${Math.round(buf.length / 1024)} KB)`);
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const jobs = [];
  for (const [key, url] of Object.entries(gen.waschbaer)) jobs.push([url, `waschbaer-${key}.png`]);
  for (const [key, url] of Object.entries(gen.simon)) jobs.push([url, `simon-${key}.png`]);
  for (const [key, url] of Object.entries(gen.testimonials)) jobs.push([url, `testimonial-${key}.png`]);
  for (const [key, url] of Object.entries(gen.video || {})) jobs.push([url, `video-${key}.mp4`]);
  if (gen.logo && gen.logo.white_transparent) jobs.push([gen.logo.white_transparent, "logo-white.png"]);

  for (const [url, name] of jobs) {
    try {
      await download(url, path.join(OUT, name));
    } catch (err) {
      console.warn("[download] Fehler:", name, "-", err.message);
    }
  }
  console.log(`\nFertig. ${jobs.length} Assets nach public/images/generated/.`);
  console.log("Tipp: jetzt in .env  PUBLIC_USE_LOCAL_IMAGES=true  setzen und neu bauen.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
