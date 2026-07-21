"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FinishedStemAppearance,
  StemComparisonDiagram,
  StemConstructionAnimation,
  StemFrontBackCross,
  StemGarmentExamples,
  StemMistakeDiagrams,
  StemNeedlePath,
  StemPleatDiagram,
  StemTensionDiagram,
} from "@/components/illustrations/StemStitch";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  StitchChapterLayout,
  TroubleshootList,
  VariationGrid,
  STANDARD_TOC,
} from "@/components/chapters/StitchChapterLayout";

export function StemStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(3);

  return (
    <StitchChapterLayout
      toc={[...STANDARD_TOC]}
      prev={{ href: "/stitches/outline-stitch/", label: "Outline Stitch" }}
      next={{ href: "/stitches/trellis/", label: "Trellis" }}
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Publication-quality chapter.</strong> Stem stitch is the
            same single-row family as cable, but the needle stays on the same side of the working
            thread every time. That consistency makes a twisted rope, not an alternating braid.
          </p>
        </div>
      }
      sources="Stem stitch mechanics here follow standard English smocking teaching for a same-side, single-gathering-row rope stitch. Manuals may describe either needle-above-thread or needle-below-thread orientation; both are valid mirror forms. The important distinction from cable is no alternation, and the distinction from outline is the visible same-leaning twist."
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          A well-worked stem row looks like a small twisted rope riding on consecutive mountains.
          It is not cable: cable alternates sides and braids. It is not outline: outline settles
          into a smooth cord. Stem keeps the needle on one side of the thread so every surface ridge
          leans the same direction.
        </p>
        <FinishedStemAppearance />
        <StemComparisonDiagram />
      </section>

      <section id="pleats" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Pleat diagram</h2>
        <p className="mt-3 text-ink-muted">
          Work along one gathering row on consecutive mountain tops. Choose the side relationship
          before you begin: needle always above the thread, or needle always below the thread. Do
          not alternate sides unless you intend to make cable.
        </p>
        <StemPleatDiagram />
        <ul className="mt-2 space-y-2 text-sm text-ink-muted">
          <li>
            <strong className="text-ink">One row:</strong> stem stays on a single gathering row.
          </li>
          <li>
            <strong className="text-ink">Same side:</strong> the needle remains above or below the
            thread for the entire row.
          </li>
          <li>
            <strong className="text-ink">Twist, not braid:</strong> same-side leverage makes a
            rope; alternating leverage makes cable.
          </li>
          <li>
            <strong className="text-ink">Top third:</strong> the needle takes shallow bites on
            mountain crests, not deep valleys.
          </li>
        </ul>
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          The animation uses the needle-above-thread version. Mirror it if your hand preference
          requires, but keep the same side for the whole row.
        </p>
        <StemConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path diagram</h2>
        <p className="mt-3 text-ink-muted">
          Step through the row and watch the side relationship. Gold marks the current stitch; the
          labels call out the same-side rule that prevents accidental cable.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through the stem row"
          controls={
            <>
              <button
                type="button"
                className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                onClick={() => setShowLabels((v) => !v)}
              >
                {showLabels ? "Hide labels" : "Show labels"}
              </button>
              <button
                type="button"
                className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                onClick={() => setPathStep((s) => Math.max(1, s - 1))}
              >
                Prev stitch
              </button>
              <button
                type="button"
                className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                onClick={() => setPathStep((s) => Math.min(7, s + 1))}
              >
                Next stitch
              </button>
            </>
          }
        >
          <StemNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
        <div className="callout-tip callout">
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Memory aid:</strong> stem is stubborn. Pick a side and
            stay there; cable is the stitch that changes its mind.
          </p>
        </div>
      </section>

      <section id="front-back" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Front / Back / Cross-section</h2>
        <p className="mt-3 text-ink-muted">
          On the front, the rope ridges lean consistently. On the back, short carries lean in the
          same direction. Cross-section shows the same-side pull rolling the surface thread around
          the mountain tops.
        </p>
        <StemFrontBackCross />
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Stem tension defines the rope. Too little pull leaves a weak, stringy line; too much pull
          narrows the rope and cups the pleats.
        </p>
        <StemTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Stem mistakes usually announce themselves as another stitch: cable if you alternate,
          outline if the twist disappears.
        </p>
        <StemMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Diagnose first by asking whether the row is braided, smooth, or twisted.
        </p>
        <TroubleshootList
          items={[
            {
              problem: "Stem looks like cable",
              fix: "You alternated needle sides. Unpick to the first reversal and keep the needle on the same side of the thread every stitch.",
            },
            {
              problem: "Stem looks like smooth outline",
              fix: "The rope ridges are not forming. Check that the thread is being held to the same side as the needle passes, then tighten just enough to roll the loop.",
            },
            {
              problem: "Rope direction reverses mid-row",
              fix: "You changed from needle-above-thread to needle-below-thread, or reversed working direction without mirroring intentionally. Rework from the reversal.",
            },
            {
              problem: "Pleats flatten under the rope",
              fix: "Bites are too deep or tension is too hard. Use top-third bites and ease the last few stitches before continuing.",
            },
            {
              problem: "Twists are uneven",
              fix: "Spacing, bite depth, or pull changed between mountains. Slow down and use the gathering row as a rail for consistent height.",
            },
          ]}
        />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">
          Stem variations mostly change scale or orientation. The same-side rule remains the
          identity of the stitch.
        </p>
        <VariationGrid
          variants={[
            { name: "Needle-above stem", note: "Shown here; all ridges lean consistently one way" },
            { name: "Needle-below stem", note: "Mirror orientation with the rope leaning the other way" },
            { name: "Fine stem", note: "Small rope for baby yokes and delicate picture smocking" },
            { name: "Heavy stem", note: "Stronger rope border in perle cotton or multiple strands" },
            { name: "Paired stem", note: "Two rows mirrored to frame a band or motif" },
            { name: "Stem accent", note: "Used sparingly among cable and wave rows for texture contrast" },
          ]}
        />
      </section>

      <section id="garments" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Garment examples</h2>
        <p className="mt-3 text-ink-muted">
          Stem adds raised texture where a smooth outline would be too quiet and a cable would be
          too braided.
        </p>
        <StemGarmentExamples />
        <ul className="mt-4 space-y-2 text-sm text-ink-muted">
          <li>Accent borders - rope texture between smoother control rows</li>
          <li>Picture smocking - stems, vines, and motif outlines on pleated fabric</li>
          <li>Cuffs and collars - narrow trim rows where a twisted edge is desired</li>
          <li>Bonnets - small decorative ropes along brim or casing details</li>
        </ul>
        <p className="mt-4 text-sm text-ink-faint">
          See also:{" "}
          <Link href="/garments/" className="text-dusty-blue-deep">
            Garment construction
          </Link>
        </p>
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why stem works</h2>
        <p className="mt-3 text-ink-muted">
          Stem works because every stitch applies leverage from the same side of the working
          thread. That repeated same-side pull rolls each loop over the previous one in a consistent
          direction, creating a rope. Cable alternates leverage from side to side, so it braids.
          Outline settles the thread into a smoother cord, so it does not show the same pronounced
          twist.
        </p>
        <div className="callout mt-4">
          <p className="text-sm text-ink-muted">
            For more on how thread placement changes surface geometry, see{" "}
            <Link href="/theory/" className="text-dusty-blue-deep">
              Smocking Theory
            </Link>
            .
          </p>
        </div>
      </section>
    </StitchChapterLayout>
  );
}
