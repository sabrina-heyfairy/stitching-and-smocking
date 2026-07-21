# Contributing to Sabrina’s Guide

## Principles

1. **Could a beginner complete this stitch without YouTube?** If not, the page isn’t done.
2. **No placeholder diagrams** for unfinished chapters — list them as planned and link the Cable Stitch template.
3. **Verify facts** against vintage Read manuals, historical smocking references, and recognized embroidery sources. Mark uncertainty instead of guessing.
4. **Custom artwork per stitch** — never reuse generic icons or copy another stitch’s diagrams wholesale.

## Adding a stitch chapter

1. Add metadata in `src/lib/stitches.ts` (`status: "planned"` until complete).
2. Add search entries in `src/lib/search-index.ts` as needed.
3. Create illustration components under `src/components/illustrations/` (dedicated artwork).
4. Create a chapter component (see `CableStitchChapter.tsx`) covering:

   - Title, difficulty, uses  
   - Finished appearance  
   - Realistic pleat/fabric illustration  
   - Animated construction  
   - Needle path (previous faded, current highlighted)  
   - Front / back / cross-section  
   - Pleat diagram (mountain, valley, numbers)  
   - Tension examples  
   - Common mistakes + troubleshooting  
   - Variations + garment examples  

5. Wire it in `src/app/stitches/[slug]/page.tsx`.
6. Set `status: "complete"` only when the checklist is truly done.

## Design system

- CSS variables in `src/app/globals.css`
- Cream grounds, warm gray text, dusty blue / muted teal / sage / burgundy / soft gold
- Cormorant Garamond (headings) + Source Sans 3 (body)
- Prefer full-bleed section art via SVG; avoid card-heavy layouts except for interactive controls

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Pull requests

- One stitch chapter or one coherent subsystem per PR when possible
- Include screenshots of new illustrations
- Note any unverified / model-dependent claims in the chapter’s Sources section
