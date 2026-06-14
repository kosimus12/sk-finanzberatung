/**
 * Bild-Optimierung: erzeugt aus den Originaldateien (Logo, Avatare, Foto)
 * schlanke, responsive WebP-/PNG-Versionen in public/images/.
 *
 * Nutzt ImageMagick ("convert"). Aufruf: `npm run images`
 *
 * Quelle: Eltern-Ordner des Projekts ("Claude - Website 2.0") mit den Ordnern
 *   Avatar-referenzbilder/, Logo/, aboutme/.
 */
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const SRC = path.resolve(PROJECT, ".."); // Ordner mit den Original-Assets
const OUT = path.join(PROJECT, "public", "images");
const OUT_AVATARE = path.join(OUT, "avatare");

/** Dateinamen zu sauberem Slug (ohne Umlaute/Sonderzeichen). */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[äàá]/g, "a")
    .replace(/[öòó]/g, "o")
    .replace(/[üùú]/g, "u")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function convert(args) {
  execFileSync("convert", args, { stdio: "inherit" });
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(OUT_AVATARE, { recursive: true });

  // --- Avatare ---
  const avatarDir = path.join(SRC, "Avatar-referenzbilder");
  if (await fileExists(avatarDir)) {
    const files = (await fs.readdir(avatarDir)).filter((f) => /\.(png|jpe?g)$/i.test(f));
    for (const f of files) {
      const slug = slugify(f);
      const out = path.join(OUT_AVATARE, `${slug}.webp`);
      try {
        convert([
          "-limit", "memory", "256MiB",
          path.join(avatarDir, f),
          "-resize", "600x600>",
          "-strip",
          "-quality", "80",
          out,
        ]);
        console.log("avatar ->", path.relative(PROJECT, out));
      } catch (err) {
        console.warn("[images] uebersprungen (Konvertierung fehlgeschlagen):", f);
      }
    }
  } else {
    console.warn("[images] Avatar-Ordner nicht gefunden:", avatarDir);
  }

  // --- Logo (weiss, transparent) fuer Header/Footer ---
  const logoWhite = path.join(SRC, "Logo", "Logo Weiß.png");
  if (await fileExists(logoWhite)) {
    convert([logoWhite, "-resize", "200x200>", "-strip", "-quality", "90", path.join(OUT, "logo-white.webp")]);
    console.log("logo  -> public/images/logo-white.webp");
  }

  // --- Logo (farbig) fuer Schema/Favicon ---
  const logoColor = path.join(SRC, "Logo", "Logo.jpg");
  if (await fileExists(logoColor)) {
    convert([logoColor, "-resize", "256x256", "-strip", path.join(OUT, "logo.png")]);
    convert([logoColor, "-resize", "64x64", "-strip", path.join(PROJECT, "public", "favicon.png")]);
    convert([logoColor, "-resize", "180x180", "-strip", path.join(PROJECT, "public", "apple-touch-icon.png")]);
    // Open-Graph-Bild 1200x630: Logo auf Navy-Hintergrund zentriert
    convert([
      "-size", "1200x630", "xc:#0A1A5C",
      "(", logoColor, "-resize", "360x360", ")",
      "-gravity", "center", "-composite",
      "-strip", path.join(OUT, "og-default.png"),
    ]);
    console.log("logo  -> public/images/logo.png, favicon.png, apple-touch-icon.png, og-default.png");
  }

  // --- Foto Simon (Ueber uns) ---
  const photo = path.join(SRC, "aboutme", "Über mich : Profilbild.JPG");
  if (await fileExists(photo)) {
    convert([photo, "-resize", "840x", "-strip", "-quality", "82", path.join(OUT, "simon-kuper.webp")]);
    console.log("photo -> public/images/simon-kuper.webp");
  } else {
    console.warn("[images] Profilbild nicht gefunden:", photo);
  }

  console.log("[images] fertig.");
}

main().catch((err) => {
  console.error("[images] Fehler:", err);
  process.exit(1);
});
