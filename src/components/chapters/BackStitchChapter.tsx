"use client";

import { useState } from "react";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  BackStitchConstructionAnimation,
  BackStitchMistakeDiagrams,
  BackStitchNeedlePath,
  BackStitchTensionDiagram,
  BackStitchTheoryDiagram,
  BackStitchWithSmockingDiagram,
  FinishedBackStitchAppearance,
} from "@/components/illustrations/BackStitchEmbroidery";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

const troubleshooting = [
  {
    problem: "Small gaps appear in the line",
    fix: "You are not inserting exactly into the previous hole. Share the endpoint of the last stitch before advancing underneath.",
  },
  {
    problem: "Curves look angular",
    fix: "Shorten the stitch length around curves. Back stitch is made of straight segments, so small segments draw smoother curves.",
  },
  {
    problem: "The fabric puckers along the outline",
    fix: "Tension is too tight or the back carries are pulling. Ease the last few stitches and draw each segment only until it lies flat.",
  },
  {
    problem: "The line looks like running stitch",
    fix: "You are stitching forward on the surface. Come up ahead, then stitch backward into the previous hole.",
  },
  {
    problem: "The back is bulky",
    fix: "Use a shorter needle path and avoid doubling thread in the same back channel more than necessary.",
  },
];

const variations = [
  { name: "Standard back stitch", note: "Solid outline for motifs, lettering, and construction marks." },
  { name: "Tiny back stitch", note: "Very short segments for tight curves and heirloom monograms." },
  { name: "Whipped back stitch", note: "A second thread wraps the completed line for a corded finish." },
  { name: "Laced back stitch", note: "A decorative thread passes under the back stitches without piercing fabric." },
  { name: "Double back stitch", note: "Two parallel rows for heavier borders or shadow outlines." },
  { name: "Seeded outline", note: "Broken back-stitch sections around small floral motifs." },
];

export function BackStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <EmbroideryChapterLayout
      toc={EMBROIDERY_TOC}
      prev={{ href: "/embroidery/satin-stitch/", label: "Satin stitch" }}
      next={{ href: "/embroidery/chain-stitch/", label: "Chain stitch" }}
      sources="Back stitch mechanics follow standard surface-embroidery instruction: the needle comes up one stitch length ahead, then returns backward into the previous hole, creating a continuous surface line with forward travel on the back. Segment length is adjusted to line curvature and fabric weight."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Essential outline stitch.</strong> Back stitch creates a
            solid line because each stitch goes backward into the previous hole. Link slug:{" "}
            <span className="font-mono text-xs">/embroidery/back-stitch/</span>.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          A well-worked back stitch looks like a continuous drawn line. The front segments touch at
          shared holes, so there are no running-stitch gaps.
        </p>
        <FinishedBackStitchAppearance />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          The animation shows the signature rhythm: come up ahead, stitch backward into the previous
          hole, then travel forward on the back.
        </p>
        <BackStitchConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path controls</h2>
        <p className="mt-3 text-ink-muted">
          Gold marks the current segment. The burgundy arrow points backward on the fabric face; the
          blue arrow shows the forward travel underneath.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through backward surface stitches."
          controls={
            <>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setShowLabels((value) => !value)}>
                {showLabels ? "Hide labels" : "Show labels"}
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.max(1, value - 1))}>
                Prev stitch
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.min(8, value + 1))}>
                Next stitch
              </button>
              <span className="self-center text-xs text-ink-faint">Stitch {pathStep}/8</span>
            </>
          }
        >
          <BackStitchNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Back stitch tension should seat the line without puckering the fabric. Shared holes matter
          more than extra pull.
        </p>
        <BackStitchTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          If the line has gaps, angles, or puckers, check endpoint sharing, stitch length, and the
          backward surface motion.
        </p>
        <BackStitchMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">Back stitch is easiest to fix one segment at a time because each segment has a visible endpoint.</p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">After the base line is solid, back stitch can be whipped, laced, doubled, or scaled down.</p>
        <VariationGrid variants={variations} />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Use back stitch for lettering, motif outlines, and neat borders near a smocked panel. It
          belongs on flatter areas where a crisp drawn line is useful.
        </p>
        <BackStitchWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why back stitch works</h2>
        <p className="mt-3 text-ink-muted">
          The front line is continuous because every new stitch shares the endpoint of the last one.
          The cost is a slightly longer back carry, which is usually acceptable for outlines.
        </p>
        <BackStitchTheoryDiagram />
      </section>
    </EmbroideryChapterLayout>
  );
}
