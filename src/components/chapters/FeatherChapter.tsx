"use client";

import { useState } from "react";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  FeatherConstructionAnimation,
  FeatherMistakeDiagrams,
  FeatherNeedlePath,
  FeatherTensionDiagram,
  FeatherTheoryDiagram,
  FeatherWithSmockingDiagram,
  FinishedFeatherAppearance,
} from "@/components/illustrations/FeatherEmbroidery";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

const troubleshooting = [
  {
    problem: "The vine looks knotted down the center",
    fix: "The center catch is too tight. Unpick to the tight point and redraw the thread only until the loop seats; do not cinch the center line.",
  },
  {
    problem: "The stitch leans heavily to one side",
    fix: "Check the left-right rhythm and branch length. Feather stitch needs one left branch followed by one right branch with similar diagonals.",
  },
  {
    problem: "Branches snag during handling",
    fix: "The diagonals are too long or too loose for the fabric area. Shorten the span and keep the branch lightly seated.",
  },
  {
    problem: "The vine wanders off the marked line",
    fix: "Use a finer center guide and place each return point back on that guide before making the next branch.",
  },
  {
    problem: "The edge looks stiff instead of feathery",
    fix: "Reduce pull and open the angle slightly. The stitch should branch softly, not form a compressed cord.",
  },
];

const variations = [
  { name: "Single feather", note: "One alternating vine for collars, hems, and sample borders." },
  { name: "Double feather", note: "Two mirrored feather rows sharing or flanking a center guide." },
  { name: "Closed feather", note: "Shorter branches with a narrower angle for compact borders." },
  { name: "Open feather", note: "Wider spacing and airy branches for heirloom panels." },
  { name: "Laced feather", note: "A second thread is woven through the branches after stitching." },
  { name: "Floral feather", note: "Tiny lazy daisies or satin buds can sit at the branch tips." },
];

export function FeatherChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <EmbroideryChapterLayout
      toc={EMBROIDERY_TOC}
      prev={{ href: "/embroidery/", label: "Embroidery index" }}
      next={{ href: "/embroidery/stem-embroidery/", label: "Stem embroidery" }}
      sources="Feather stitch mechanics follow standard surface-embroidery instruction: an alternating left-right open chain worked from a center guide, with the working thread held under the needle so each branch catches lightly at the vine. Names and decorative variants vary by school; the invariant is alternating diagonal branches with balanced, moderate tension."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Intermediate embroidery companion.</strong> Feather stitch
            is an airy vine: diagonal branches alternate left and right from a center line. Use the
            slug <span className="font-mono text-xs">/embroidery/feather-stitch/</span> when linking
            to this chapter.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Feather stitch reads as a light branching vine. The center line is visible as rhythm rather
          than a heavy cord, and the branches alternate left and right with similar angle and length.
        </p>
        <FinishedFeatherAppearance />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          Step through the sequence to see how each branch returns to the center before switching
          sides. The important habits are alternation, light center catches, and open tension.
        </p>
        <FeatherConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path controls</h2>
        <p className="mt-3 text-ink-muted">
          Use the controls to isolate one branch at a time. Gold marks the current branch; arrows
          show the outward diagonal and the return to the vine.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through alternating feather branches."
          controls={
            <>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setShowLabels((value) => !value)}>
                {showLabels ? "Hide labels" : "Show labels"}
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.max(1, value - 1))}>
                Prev branch
              </button>
              <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setPathStep((value) => Math.min(6, value + 1))}>
                Next branch
              </button>
              <span className="self-center text-xs text-ink-faint">Branch {pathStep}/6</span>
            </>
          }
        >
          <FeatherNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Feather stitch needs enough tension to seat each branch, but not enough to pinch the center.
          The vine should stay open and flexible.
        </p>
        <FeatherTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Most feather problems are rhythm or tension problems: repeated sides, a cinched center, long
          floats, or uneven branch angles.
        </p>
        <FeatherMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">Correct feather stitch early, before the vine length makes small rhythm errors look intentional.</p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">Once the alternating vine is even, vary scale, density, color, or added floral details.</p>
        <VariationGrid variants={variations} />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Use feather stitch as surface embroidery beside smocked panels, on collars, or on flat yoke
          spaces. It decorates; it does not replace control rows across pleats.
        </p>
        <FeatherWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why feather stitch works</h2>
        <p className="mt-3 text-ink-muted">
          Alternating branches distribute pull to both sides of a center guide. Because the center
          catch is light, the line remains supple while the diagonal stitches create movement.
        </p>
        <FeatherTheoryDiagram />
      </section>
    </EmbroideryChapterLayout>
  );
}
