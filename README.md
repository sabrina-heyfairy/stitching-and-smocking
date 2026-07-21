# Sabrina's Guide to Smocking & Stitching

The complete visual encyclopedia for the vintage **Read 16-needle smocking pleater** and hand smocking.

Interactive reference website + ebook-quality chapters. Built so a beginner can complete a stitch without watching YouTube.

## Stack

- Next.js 15 (App Router) · TypeScript · Tailwind CSS v4
- Framer Motion · SVG illustration system
- Fuse.js search · Static export · PWA · GitHub Pages

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # static export to /out
npm run lint
```

## What’s complete

| Area | Status |
|------|--------|
| Design system (palette, typography, layout) | Complete |
| Reusable pleat / needle / thread illustrations | Complete |
| Read 16 pleater encyclopedia | Complete |
| **Cable Stitch** chapter | Complete |
| **Wave Stitch** chapter | Complete |
| **Honeycomb Stitch** chapter | Complete |
| **Outline Stitch** chapter | Complete |
| **Trellis** chapter | Complete |
| **Stem Stitch (Smocking)** chapter | Complete |
| **Van Dyke Stitch** chapter | Complete |
| **Surface Honeycomb** chapter | Complete |
| **Embroidery companion** (11 stitches + motifs guide) | Complete |
| **Smocking Plate Library** (12 teaching plates) | Complete |
| **Garment construction** (visual assembly guides) | Complete |
| **Practice Path** curriculum + materials visuals | Complete |
| Stitch index + filters + search | Complete |
| Theory, fabrics, threads, needles, garments, design | Foundation chapters |

## Project structure

```
src/
  app/                  # Routes (stitches, pleater, theory, …)
  components/
    illustrations/      # SVG system (pleats, needles, pleater diagrams)
    chapters/           # Full stitch chapter compositions
  lib/                  # Types, stitch registry, search index, nav
public/                 # PWA manifest, service worker, icons
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Quality over speed: finish one chapter to publication standard before starting the next.

## Deploy

Push to `main` runs `.github/workflows/deploy.yml` (GitHub Pages static export). Enable Pages in repo settings → Source: GitHub Actions.

## License

Content and code for this guide — see repository license when published.
