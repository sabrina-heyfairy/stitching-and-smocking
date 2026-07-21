"use client";

import { useState } from "react";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  FinishedRunningStitchAppearance,
  RunningStitchConstructionAnimation,
  RunningStitchMistakeDiagrams,
  RunningStitchNeedlePath,
  RunningStitchTensionDiagram,
  RunningStitchTheoryDiagram,
  RunningStitchWithSmockingDiagram,
} from "@/components/illustrations/RunningStitchEmbroidery";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

const troubleshooting = [
  {
    problem: "The dashes are uneven",
    fix: "Mark small dots or use the weave as a spacing guide. Match both the surface dash length and the hidden gap length.",
  },
  {
    problem: "The fabric puckers",
    fix: "Tension is too tight. Ease the last few stitches and draw the thread only until each dash lies flat.",
  },
  {
    problem: "The line wanders",
    fix: "Use a light removable guideline and bring each up-and-down point back to that path.",
  },
  {
    problem: "Stitches snag during wear",
    fix: "Your dashes are too long or too loose for the area. Shorten the stitch and keep it close to the fabric surface.",
  },
  {
    problem: "Temporary guidelines are hard to remove",
    fix: "Use a contrasting basting thread and avoid splitting the permanent embroidery threads when running the guide line.",
  },
];

const variations = [
  { name: "Standard running", note: "Even dashes and spaces for guides, basting, and light outlines." },
  { name: "Tiny running", note: "Small bites for delicate texture or precise temporary marks." },
  { name: "Long running", note: "Longer dashes for quick basting where snagging is not a concern." },
  { name: "Double running", note: "A return pass fills the gaps and can resemble back stitch." },
  { name: "Seeded running", note: "Short scattered dashes create light texture rather than a strict line." },
  { name: "Whipped running", note: "A second thread wraps through the dashes for a decorative cord." },
];

export function RunningStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <EmbroideryChapterLayout
      toc={EMBROIDERY_TOC}
      prev={{ href: "/embroidery/outline-embroidery/", label: "Outline embroidery" }}
      next={{ href: "/embroidery/", label: "Embroidery index" }}
      sources="Running stitch mechanics follow standard hand-embroidery and sewing instruction: the needle alternates in and out of the fabric to create even surface dashes separated by hidden under-fabric travel. It is a beginner utility stitch for guidelines, basting, and light decorative texture."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Beginner in-and-out stitch.</strong> Running stitch makes
            a broken line from even straight dashes and gaps. Link slug:{" "}
            <span className="font-mono text-xs">/embroidery/running-stitch/</span>.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Running stitch appears as small, even dashes on the fabric surface. It is lighter than back
          stitch because the gaps between dashes remain visible.
        </p>
        <FinishedRunningStitchAppearance />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          The animation shows the simple rhythm: come up, go down one dash length ahead, travel under
          the fabric, and come up again after a matching gap.
        </p>
        <RunningStitchConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path controls</h2>
        <p className="mt-3 text-ink-muted">
          Step through each visible dash. The green dashed curve shows the hidden travel between one
          surface stitch and the next.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through even in-and-out stitches."
          controls={
            <>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setShowLabels((value) => !value)}>
                {showLabels ? "Hide labels" : "Show labels"}
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.max(1, value - 1))}>
                Prev stitch
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.min(6, value + 1))}>
                Next stitch
              </button>
              <span className="self-center text-xs text-ink-faint">Stitch {pathStep}/6</span>
            </>
          }
        >
          <RunningStitchNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Running stitch should lie flat. It is a light line, so extra pull does not improve the
          stitch; it only puckers the fabric.
        </p>
        <RunningStitchTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Most running stitch problems are visible at a glance: uneven dash lengths, wandering off
          the guide, long floats, or puckered tension.
        </p>
        <RunningStitchMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">Correct running stitch by checking spacing first, then tension, then whether the line follows the guide.</p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">Running stitch can stay practical or become decorative by changing scale, return passes, or wrapping.</p>
        <VariationGrid variants={variations} />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Use running stitch for temporary guidelines, motif placement, or subtle flat texture near a
          smocked panel. Keep utility rows removable when they are only construction marks.
        </p>
        <RunningStitchWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why running stitch works</h2>
        <p className="mt-3 text-ink-muted">
          Running stitch is quick because the needle alternates over and under the fabric. Equal
          visible dashes and equal hidden gaps make the broken line look intentional.
        </p>
        <RunningStitchTheoryDiagram />
      </section>
    </EmbroideryChapterLayout>
  );
}
