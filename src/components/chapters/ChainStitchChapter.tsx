"use client";

import { useState } from "react";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  ChainStitchConstructionAnimation,
  ChainStitchMistakeDiagrams,
  ChainStitchNeedlePath,
  ChainStitchTensionDiagram,
  ChainStitchTheoryDiagram,
  ChainStitchWithSmockingDiagram,
  FinishedChainStitchAppearance,
} from "@/components/illustrations/ChainStitchEmbroidery";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

const troubleshooting = [
  {
    problem: "Loops pull open",
    fix: "The needle did not emerge inside the loop or the final loop was not anchored. Rework from the loose loop and secure the end with a tiny straight stitch.",
  },
  {
    problem: "The chain looks like knots",
    fix: "Tension is too tight. Pull only until each loop settles into an oval; stop before it collapses around the exit point.",
  },
  {
    problem: "Loop sizes vary",
    fix: "Keep stitch length and hand tension consistent. Mark dots on the line while practicing if your spacing wanders.",
  },
  {
    problem: "The line twists off the guide",
    fix: "Bring each needle exit back to the drawn line and keep the working thread centered under the needle point.",
  },
  {
    problem: "The chain snags",
    fix: "Loops are too loose or too large for the garment area. Shorten the stitch length and seat each loop closer to the ground.",
  },
];

const variations = [
  { name: "Standard chain", note: "Linked oval loops for stems, borders, and outlines." },
  { name: "Detached chain", note: "Single anchored loops, often used as lazy-daisy petals." },
  { name: "Heavy chain", note: "More strands or closer loops for a bolder raised line." },
  { name: "Open chain", note: "Wider loop spacing for a lighter decorative border." },
  { name: "Whipped chain", note: "A second thread wraps the completed chain for color or sheen." },
  { name: "Zigzag chain", note: "Alternating exits create a decorative sawtooth line." },
];

export function ChainStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <EmbroideryChapterLayout
      toc={EMBROIDERY_TOC}
      prev={{ href: "/embroidery/back-stitch/", label: "Back stitch" }}
      next={{ href: "/embroidery/", label: "Embroidery index" }}
      sources="Chain stitch mechanics follow standard surface-embroidery teaching: each loop is formed by returning near the previous exit, bringing the needle out ahead with the working thread under the point, then anchoring the final loop. Variants change spacing, direction, or wrapping, but the linked-loop structure remains the defining feature."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Linked-loop embroidery.</strong> Chain stitch builds a
            flexible line from loops that catch one another. Keep the loops even and always anchor the
            last link. Link slug: <span className="font-mono text-xs">/embroidery/chain-stitch/</span>.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Chain stitch reads as a series of linked oval loops. It is more textured than back stitch
          and more flexible than a satin bar, making it useful for decorative lines and stems.
        </p>
        <FinishedChainStitchAppearance />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          The animation shows how the working thread sits under the needle so the exit point catches
          a loop. Each new loop holds the previous loop.
        </p>
        <ChainStitchConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path controls</h2>
        <p className="mt-3 text-ink-muted">
          Step through the links and watch the active loop form around the needle. The final link is
          secured by a small straight anchor stitch.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through linked chain loops."
          controls={
            <>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setShowLabels((value) => !value)}>
                {showLabels ? "Hide labels" : "Show labels"}
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.max(1, value - 1))}>
                Prev loop
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.min(7, value + 1))}>
                Next loop
              </button>
              <span className="self-center text-xs text-ink-faint">Loop {pathStep}/7</span>
            </>
          }
        >
          <ChainStitchNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Chain tension should keep loops even and secure without collapsing them. A good loop is
          seated, oval, and flexible.
        </p>
        <ChainStitchTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Chain stitch usually fails when the loop is missed, pulled too tight, made uneven, or left
          without a final anchor.
        </p>
        <ChainStitchMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">Check each link in order. One missed loop can loosen everything after it.</p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">Vary chain stitch by scale, spacing, wrapping, or whether loops are linked or detached.</p>
        <VariationGrid variants={variations} />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Chain stitch works well as a flat embroidered stem, border, or motif outline beside smocked
          texture. Keep loops modest where the garment will be handled often.
        </p>
        <ChainStitchWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why chain stitch works</h2>
        <p className="mt-3 text-ink-muted">
          Chain stitch is stable because each loop traps the previous loop at the next exit point.
          The final anchor is essential because no later loop exists to hold the end.
        </p>
        <ChainStitchTheoryDiagram />
      </section>
    </EmbroideryChapterLayout>
  );
}
