"use client";

import { useState } from "react";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  BlanketStitchConstructionAnimation,
  BlanketStitchMistakeDiagrams,
  BlanketStitchNeedlePath,
  BlanketStitchTensionDiagram,
  BlanketStitchTheoryDiagram,
  BlanketStitchWithSmockingDiagram,
  FinishedBlanketStitchAppearance,
} from "@/components/illustrations/BlanketStitchEmbroidery";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

const troubleshooting = [
  {
    problem: "The edge thread floats away",
    fix: "The needle did not come up inside the loop on the edge line. Unpick to the loose loop and bring the needle up with the working thread under the point.",
  },
  {
    problem: "The fabric edge puckers",
    fix: "Tension is too tight. Pull only until the loop sits on the edge; the hem or applique edge should remain smooth.",
  },
  {
    problem: "Upright legs lean",
    fix: "Keep the entry at stitch height directly above the edge exit. Mark paired dots while practicing if the angle wanders.",
  },
  {
    problem: "Stitch heights vary",
    fix: "Use a light guideline for the upper insertion line. Consistent height is what makes blanket stitch read as a neat border.",
  },
  {
    problem: "The border catches on wear",
    fix: "Loops are too loose or too tall for the garment area. Shorten the height and seat each baseline loop closer to the edge.",
  },
];

const variations = [
  { name: "Standard blanket", note: "Even upright legs and a continuous edge baseline for hems and applique." },
  { name: "Buttonhole edge", note: "Closer spacing and firmer tension for a compact finished edge." },
  { name: "Open blanket", note: "Wider spacing for decorative felt motifs and light borders." },
  { name: "Long-and-short blanket", note: "Alternating leg heights create a scalloped or grassy edge." },
  { name: "Grouped blanket", note: "Small clusters separated by gaps for a vintage border rhythm." },
  { name: "Whipped blanket", note: "A second thread wraps the baseline after stitching for color or body." },
];

export function BlanketChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <EmbroideryChapterLayout
      toc={EMBROIDERY_TOC}
      prev={{ href: "/embroidery/chain-stitch/", label: "Chain stitch" }}
      next={{ href: "/embroidery/outline-embroidery/", label: "Outline embroidery" }}
      sources="Blanket stitch mechanics follow standard surface-embroidery and edge-finishing instruction: the needle comes up on the edge, goes down at the stitch height, then comes up on the edge again while catching the working thread loop. The caught loop produces both an upright leg and a baseline, making the stitch useful for hems, applique, and felt motifs near smocked garments."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Beginner edge loop stitch.</strong> Blanket stitch turns a
            caught loop into upright legs and a firm baseline along an edge. Link slug:{" "}
            <span className="font-mono text-xs">/embroidery/blanket-stitch/</span>.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Blanket stitch looks like evenly spaced upright legs joined by a thread baseline on the
          edge. It is especially readable on hems, applique edges, and small felt motifs.
        </p>
        <FinishedBlanketStitchAppearance />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          The animation follows the loop-edge rhythm: up on the edge, down at stitch height, then up
          on the edge again while the thread loop sits under the needle.
        </p>
        <BlanketStitchConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path controls</h2>
        <p className="mt-3 text-ink-muted">
          Step through the border one loop at a time. Gold marks the active unit that creates one
          vertical leg and one section of edge baseline.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through the edge loops."
          controls={
            <>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setShowLabels((value) => !value)}>
                {showLabels ? "Hide labels" : "Show labels"}
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.max(1, value - 1))}>
                Prev stitch
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.min(7, value + 1))}>
                Next stitch
              </button>
              <span className="self-center text-xs text-ink-faint">Stitch {pathStep}/7</span>
            </>
          }
        >
          <BlanketStitchNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Good blanket tension seats the baseline on the edge without cinching the fabric. The loop
          should be caught, visible, and relaxed.
        </p>
        <BlanketStitchTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Most errors come from missing the loop, pulling too hard, or losing the paired relationship
          between the stitch-height insertion and the edge exit.
        </p>
        <BlanketStitchMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">Check the loop before tightening. Once it is missed, the baseline cannot form correctly.</p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">Vary blanket stitch by spacing, height, grouping, or wrapping the finished baseline.</p>
        <VariationGrid variants={variations} />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Use blanket stitch to secure applique, felt shapes, or small hems near a smocked garment.
          Keep it on the flat edge area so the looped border does not fight the pleat texture.
        </p>
        <BlanketStitchWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why blanket stitch works</h2>
        <p className="mt-3 text-ink-muted">
          The stitch is stable because the needle emerges on the edge while the working thread loop
          is still open. Tightening that caught loop locks the upright leg to the baseline.
        </p>
        <BlanketStitchTheoryDiagram />
      </section>
    </EmbroideryChapterLayout>
  );
}
