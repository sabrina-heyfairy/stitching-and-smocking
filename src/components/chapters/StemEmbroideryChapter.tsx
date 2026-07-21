"use client";

import Link from "next/link";
import { useState } from "react";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  FinishedStemEmbroideryAppearance,
  StemEmbroideryConstructionAnimation,
  StemEmbroideryMistakeDiagrams,
  StemEmbroideryNeedlePath,
  StemEmbroideryTensionDiagram,
  StemEmbroideryTheoryDiagram,
  StemEmbroideryWithSmockingDiagram,
} from "@/components/illustrations/StemEmbroidery";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

const troubleshooting = [
  {
    problem: "The rope kinks at one stitch",
    fix: "The working thread switched sides. Unpick to the kink and resume with the thread kept consistently below the needle when working left-to-right.",
  },
  {
    problem: "The curve looks angular",
    fix: "Your stitches are too long for the curve. Shorten each bite and let the overlap follow the drawn line gradually.",
  },
  {
    problem: "The line sinks into the fabric",
    fix: "Tension is too tight or the needle bite is too deep. Work on the surface and draw the thread just snug enough to lie raised.",
  },
  {
    problem: "It looks like outline stitch instead",
    fix: "Stem and outline are close relatives. Check which side of the thread you are using and keep that side consistent for the intended rope direction.",
  },
  {
    problem: "You are crossing pleats instead of flat fabric",
    fix: "Stop and move to the smocking stem-stitch chapter. Surface stem embroidery is worked on flat fabric, not as an across-pleats control stitch.",
  },
];

const variations = [
  { name: "Standard stem", note: "Raised surface rope with the thread kept on one side." },
  { name: "Fine stem", note: "Short stitches and fine floss for delicate flower stems and lettering." },
  { name: "Heavy stem", note: "More strands for bold outlines; keep curves short to avoid kinks." },
  { name: "Whipped stem", note: "A second thread wraps the completed stem row for extra body." },
  { name: "Two-color stem", note: "Work adjacent rows or whipped wraps in a contrasting color." },
  { name: "Curved stem", note: "Shorten stitch length on curves while preserving same-side thread placement." },
];

export function StemEmbroideryChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <EmbroideryChapterLayout
      toc={EMBROIDERY_TOC}
      prev={{ href: "/embroidery/feather-stitch/", label: "Feather stitch" }}
      next={{ href: "/embroidery/satin-stitch/", label: "Satin stitch" }}
      sources="Surface stem stitch mechanics follow standard hand-embroidery teaching: short overlapping stitches on a flat traced line, with the working thread consistently held on the same side of the needle. This chapter intentionally separates surface stem embroidery from smocking stem stitch, which is worked across pleats and belongs under the smocking stitch catalog."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Flat surface embroidery.</strong> This stem stitch is worked
            on flat fabric with the needle always on the same side of the thread. It is different from{" "}
            <Link href="/stitches/stem-stitch-smocking/" className="text-dusty-blue-deep">
              stem stitch smocking
            </Link>
            , which travels across pleats. Link slug:{" "}
            <span className="font-mono text-xs">/embroidery/stem-embroidery/</span>.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Surface stem stitch forms a smooth raised rope along a traced line. The stitches overlap
          slightly, and the working thread stays on the same side so the rope rolls consistently.
        </p>
        <FinishedStemEmbroideryAppearance />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          Watch the same-side rule repeat. The needle advances along the line, emerges partway back,
          and the working thread remains below the needle in this right-handed diagram.
        </p>
        <StemEmbroideryConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path controls</h2>
        <p className="mt-3 text-ink-muted">
          Step through the rope one segment at a time. The active gold segment shows the forward bite
          and halfway-back emergence that creates the overlap.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through the surface stem rope."
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
          <StemEmbroideryNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Stem tension should be firm enough to make a rope but light enough to sit on the fabric
          surface. Too much pull makes the line sink or pucker.
        </p>
        <StemEmbroideryTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          The most visible error is changing thread side. The second is using long stitches on curves,
          which turns a smooth stem into a series of angles.
        </p>
        <StemEmbroideryMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Diagnose surface stem by looking for a continuous rope and confirming it is being worked on
          flat fabric, not over pleat mountains.
        </p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">Keep the side rule stable, then vary weight, color, and scale.</p>
        <VariationGrid variants={variations} />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Surface stem embroidery can outline motifs near smocking, but it should not be confused
          with the smocking stem stitch across pleats. The two stitches share a name, not a fabric
          geometry.
        </p>
        <StemEmbroideryWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why surface stem works</h2>
        <p className="mt-3 text-ink-muted">
          Each new stitch overlaps the previous one and rolls to the same side of the line. That
          repeated overlap turns short surface bites into a smooth rope.
        </p>
        <StemEmbroideryTheoryDiagram />
      </section>
    </EmbroideryChapterLayout>
  );
}
