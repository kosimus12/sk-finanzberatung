# Higgsfield – Prompts & Modelle (zum Nachbauen in der Webapp)

**Modelle**
- Standbilder (Fotos & Maskottchen): **Nano Banana Pro** (`nano_banana_pro`)
- Video: **Seedance 2.0** (`seedance_2_0`)
- Freistellen (transparenter Hintergrund): Higgsfield **Remove Background**

**Referenzbilder (in der Webapp als „Reference image" hochladen)**
- Dein **Über-mich-Foto** (für alle Fotos von dir)
- 3–4 **Waschbär-Avatare** (Frontansicht) als Charakter-Referenz für alle Maskottchen
- Dein **Logo** (für die Schild-Pose)

---

## A) Fotos von Simon (Modell: nano_banana_pro · Referenz: Über-mich-Foto)

**Hero-Porträt** · 4:5
> Photorealistic professional portrait of the same man from the reference photo, keep his exact facial features and identity. Friendly, approachable and confident expression with a warm natural smile, looking directly at the camera. He wears a smart casual light blue dress shirt. Clean modern studio background in soft navy-to-white gradient. Soft flattering studio lighting, plenty of clean negative space on one side for website text. Hyperrealistic, 4k detail.

**Am MacBook** · 3:2
> Photorealistic candid lifestyle photo of the same man from the reference photo, keep his exact facial features and identity. He sits at a clean modern desk working on a MacBook laptop, next to the laptop lays an iPad flat on the table with an Apple Pen on its side, focused friendly expression, one hand on the trackpad. He wears an elegant black dress shirt. Bright airy home-office, soft natural window light, shallow depth of field. Authentic, hyperrealistic.

**Flipchart (Zinseszins)** · 4:5
> Photorealistic photo of the same man from the reference photo, keep his exact facial features and identity. He wears an elegant dark navy business suit with a white shirt without a tie. He stands next to a flipchart and points at a hand-drawn financial growth chart explaining the "Zinseszins Effekt" by comparing a passive index fund called "FTSE All World" with a normal interest based checking account called "Sparbuch", mid-presentation, confident friendly expression, audience not visible. Bright modern seminar room, white wall with a window in the background, soft professional lighting. Hyperrealistic face and posture.

---

## B) Finanzwaschbär – Maskottchen (Modell: nano_banana_pro · Referenz: Avatar-Bilder · danach Hintergrund entfernen)

**Basis-Stil (immer voranstellen):**
> 3D Pixar-style cartoon raccoon mascot character, identical character to the reference images (same raccoon face, mask markings, big friendly eyes, round black-rimmed glasses). He wears a tailored navy-blue business suit with matching trousers (always fully clothed, trousers covering the legs), dark dress shoes, a very small subtle polo-player emblem on the chest. Full body head-to-toe, centered, plain solid pure white background, soft studio lighting, glossy high-quality 3D render. **Pose:** …

Pose je Bild (an „Pose:" anhängen) · Format 1:1
- **Begrüßung (Hero):** standing, friendly waving hello with one paw, warm welcoming smile.
- **ETF/Tablet:** holding a tablet displaying a rising green stock chart, pointing at the screen, confident encouraging smile.
- **Handschlag:** extending one paw forward offering a friendly handshake, welcoming smile.
- **Dienstunfähigkeit:** plus a bright yellow construction safety helmet and an orange high-visibility vest over the suit; giving a reassuring thumbs up.
- **PKV/Beihilfe:** wearing an open white doctor's coat over the suit, a stethoscope around the neck, friendly caring smile.
- **Referendar:** wearing a black graduation cap (mortarboard), holding a small stack of books, proud encouraging smile, thumbs up.
- **Pension/Ruhestand:** relaxing leaning back on a wooden beach lounge chair, small sunglasses, a cute pink piggy bank beside him, content happy smile.
- **Newsletter:** holding up a white paper envelope, pointing at it, friendly inviting smile.
- **Rechner:** holding a calculator in one paw, the other paw raised as if explaining.
- **Vertragscheck:** holding a clipboard with a checklist and a pen, ticking off items, focused friendly smile.
- **Schutz/Schild (zusätzlich Logo als Referenz):** holding a glossy rounded shield with both paws; the shield prominently shows the provided SK logo emblem (white chess knight on a navy background) centered; confident protective stance.
- **Sach/Hausrat:** holding a small cute model house in both paws, warm caring smile.
- **Beratungs-CTA (mit Charakter):** confident and energetic, leaning forward slightly, pointing directly at the viewer with one paw, giving a friendly wink and a big enthusiastic encouraging smile, the other paw giving a thumbs up.

---

## C) Kundenstimmen-Porträts (Modell: nano_banana_pro · keine Referenz) · 1:1
Allgemein: „Photorealistic friendly headshot portrait …, warm genuine smile, looking at camera, soft neutral light-grey studio background, soft lighting, authentic, approachable. High quality, realistic."
- German woman early 30s (Lehrerin-Typ)
- German man late 20s (öffentlicher Dienst)
- German woman mid 30s with glasses
- German man early 30s with short beard
- International man early 30s (neu in Deutschland)
- German woman early 40s, smart casual blazer
- German man late 30s

---

## D) Video (Modell: seedance_2_0 · Start-Bild: Begrüßungs-Pose) · 1:1 · 5 Sek
> The friendly 3D cartoon raccoon mascot smiles warmly and waves hello with one paw in a welcoming greeting gesture, gentle natural movement, subtle bouncy idle motion, eyes blinking once, clean white background, high quality 3D animation.

---

### So bindest du neue Bilder ein
Speichere die fertigen PNGs in `sk-finanzberatung/public/images/generated/` mit den Namen aus `src/data/images.mjs`
(z. B. `waschbaer-du.png`, `simon-hero.png`) und setze in `.env` `PUBLIC_USE_LOCAL_IMAGES=true`. Oder sende sie mir – ich binde sie ein.
