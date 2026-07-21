"use client";

import { useState } from "react";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  FinishedSatinAppearance,
  SatinConstructionAnimation,
  SatinMistakeDiagrams,
  SatinNeedlePath,
  SatinTensionDiagram,
  SatinTheoryDiagram,
  SatinWithSmockingDiagram,
} from "@/components/illustrations/SatinStitch";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

const troubleshooting = [
  {
    problem: "Fabric shows between stitches",
    fix: "Place each stitch closer to the last and keep the stitch angle parallel. If the fabric still shows, use more strands or a smaller needle hole.",
  },
  {
    problem: "The shape puckers",
    fix: "Ease the tension. Satin stitch should lie flat on top of the fabric, not pull the outline inward.",
  },
  {
    problem: "The edges look ragged",
    fix: "Bring the needle up and down exactly on the shape outline. A split outline underneath can help stabilize difficult edges.",
  },
  {
    problem: "Threads snag after stitching",
    fix: "The satin span is too long for the garment area. Divide the shape, pad it lightly, or choose long-and-short stitch instead.",
  },
  {
    problem: "The surface looks dull or twisted",
    fix: "Let floss untwist, lay the strands flat with a laying tool or needle, and avoid piercing previous satin stitches.",
  },
];

const variations = [
  { name: "Flat satin", note: "Unpadded smooth fill for small petals, dots, and monograms." },
  { name: "Padded satin", note: "A small foundation gives raised heirloom dots and initials." },
  { name: "Slanted satin", note: "Parallel stitches angled across leaves or petals for directional shine." },
  { name: "Satin bars", note: "Narrow bars for ladders, drawn-thread details, or tiny borders." },
  { name: "Seeded satin accents", note: "Small satin ovals scattered between smocking or embroidery motifs." },
  { name: "Two-tone satin", note: "Adjacent small shapes in related colors; avoid blending within a wide span." },
];

export function SatinChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(5);

  return (
    <EmbroideryChapterLayout
      toc={EMBROIDERY_TOC}
      prev={{ href: "/embroidery/stem-embroidery/", label: "Stem embroidery" }}
      next={{ href: "/embroidery/back-stitch/", label: "Back stitch" }}
      sources="Satin stitch guidance follows standard surface-embroidery practice: short parallel stitches laid edge-to-edge across a small shape, with smooth tension and full coverage. Larger shapes are traditionally divided, padded carefully, or filled with long-and-short stitch because long satin floats are vulnerable to snagging and distortion."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Smooth filled embroidery.</strong> Satin stitch covers a
            small shape with parallel edge-to-edge stitches. Keep the span short, tension even, and
            coverage complete. Link slug:{" "}
            <span className="font-mono text-xs">/embroidery/satin-stitch/</span>.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Satin stitch should look smooth and solid, with no fabric showing through the fill. The
          edges define the quality: clean entry and exit points make the shape crisp.
        </p>
        <FinishedSatinAppearance />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          Build the fill one parallel stitch at a time. The animation emphasizes edge-to-edge
          placement, short span length, and enough density to hide the ground fabric.
        </p>
        <SatinConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path controls</h2>
        <p className="mt-3 text-ink-muted">
          Step across the fill. Gold marks the current stitch crossing from one edge of the shape to
          the opposite edge.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step across the satin fill."
          controls={
            <>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setShowLabels((value) => !value)}>
                {showLabels ? "Hide labels" : "Show labels"}
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.max(1, value - 1))}>
                Prev stitch
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.min(10, value + 1))}>
                Next stitch
              </button>
              <span className="self-center text-xs text-ink-faint">Stitch {pathStep}/10</span>
            </>
          }
        >
          <SatinNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Satin tension is a balance between coverage and ease. Pull enough to lay the thread flat,
          then stop before the fabric dimples at the edge.
        </p>
        <SatinTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Satin stitch magnifies small errors: a tiny gap, a ragged edge, or a long float is easy to
          see because the surface is meant to be smooth.
        </p>
        <SatinMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">Judge satin stitch by coverage, edge accuracy, thread shine, and fabric behavior.</p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">Use satin stitch for small accents first; scale up only with padding or divided fills.</p>
        <VariationGrid variants={variations} />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Satin stitch pairs well with smocking as tiny flowers, initials, dots, or collar accents on
          flat fabric. Avoid long satin spans over pleat movement.
        </p>
        <SatinWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why satin stitch works</h2>
        <p className="mt-3 text-ink-muted">
          Satin stitch turns parallel thread spans into a continuous reflective surface. The method
          works while spans are short; once a shape becomes wide, exposed floats lose stability.
        </p>
        <SatinTheoryDiagram />
      </section>
    </EmbroideryChapterLayout>
  );
}
