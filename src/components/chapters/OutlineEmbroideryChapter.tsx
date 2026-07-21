"use client";

import Link from "next/link";
import { useState } from "react";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  FinishedOutlineEmbroideryAppearance,
  OutlineEmbroideryConstructionAnimation,
  OutlineEmbroideryMistakeDiagrams,
  OutlineEmbroideryNeedlePath,
  OutlineEmbroideryTensionDiagram,
  OutlineEmbroideryTheoryDiagram,
  OutlineEmbroideryWithSmockingDiagram,
} from "@/components/illustrations/OutlineEmbroidery";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

const troubleshooting = [
  {
    problem: "The cord kinks suddenly",
    fix: "The working thread switched sides. Unpick to the kink and resume with the thread kept below the needle while working left to right.",
  },
  {
    problem: "The line looks like stem embroidery",
    fix: "Outline and stem are mirror relatives. For this outline chapter, keep the working thread below the needle; use the stem embroidery chapter for the opposite-side cord.",
  },
  {
    problem: "The curve becomes angular",
    fix: "Shorten the stitch length on curves. Outline stitch is built from small overlapping bites, so long bites flatten the curve.",
  },
  {
    problem: "The stitch is crossing pleats",
    fix: "Stop and use the smocking outline stitch chapter instead. This chapter is surface embroidery on flat fabric.",
  },
  {
    problem: "The line sinks into the fabric",
    fix: "Ease the tension and take shallower surface bites. The cord should sit on top of the fabric rather than being pulled into it.",
  },
];

const variations = [
  { name: "Standard outline", note: "A smooth surface cord with the thread kept below the needle." },
  { name: "Fine outline", note: "Short stitches and fewer strands for tiny stems, letters, and heirloom details." },
  { name: "Heavy outline", note: "More strands or closer spacing for a bolder corded line." },
  { name: "Curved outline", note: "Shortened bites on curves so the cord rolls smoothly." },
  { name: "Whipped outline", note: "A second thread wraps the completed row without piercing the fabric." },
  { name: "Two-color outline", note: "Adjacent or whipped rows add contrast while preserving the side rule." },
];

export function OutlineEmbroideryChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <EmbroideryChapterLayout
      toc={EMBROIDERY_TOC}
      prev={{ href: "/embroidery/blanket-stitch/", label: "Blanket stitch" }}
      next={{ href: "/embroidery/running-stitch/", label: "Running stitch" }}
      sources="Outline embroidery mechanics follow standard surface-embroidery teaching: on flat fabric, work left to right with short overlapping stitches while keeping the working thread consistently below the needle. This chapter intentionally distinguishes surface outline embroidery from outline stitch smocking across pleats and from stem embroidery, whose side rule mirrors the cord direction."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Beginner flat-fabric outline.</strong> This is surface
            outline embroidery, worked left to right with the thread below the needle. It is not{" "}
            <Link href="/stitches/outline-stitch/" className="text-dusty-blue-deep">
              smocking outline stitch
            </Link>{" "}
            and it is the mirror-side relative of{" "}
            <Link href="/embroidery/stem-embroidery/" className="text-dusty-blue-deep">
              surface stem embroidery
            </Link>
            . Link slug: <span className="font-mono text-xs">/embroidery/outline-embroidery/</span>.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Outline embroidery forms a smooth cord on a traced line. The fabric stays flat, and the
          line reads as a raised surface outline rather than a pleat-control stitch.
        </p>
        <FinishedOutlineEmbroideryAppearance />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          The animation repeats the side rule: insert ahead, emerge halfway back, and keep the
          working thread below the needle while moving left to right.
        </p>
        <OutlineEmbroideryConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path controls</h2>
        <p className="mt-3 text-ink-muted">
          Step through each overlap and watch how the below-needle thread placement builds the
          surface cord. Gold marks the active stitch.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through below-needle outline stitches."
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
          <OutlineEmbroideryNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Outline tension should be firm enough to show a cord but relaxed enough to avoid puckering.
          Consistent side placement matters as much as pull.
        </p>
        <OutlineEmbroideryTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          The main risks are confusing this with smocking outline stitch, switching thread side, or
          using long bites around a curve.
        </p>
        <OutlineEmbroideryMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Diagnose outline embroidery by checking fabric geometry first, then thread side, then
          stitch length and tension.
        </p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">Once the below-needle side rule is stable, vary scale, weight, wrapping, and color.</p>
        <VariationGrid variants={variations} />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Surface outline embroidery can draw flat motifs near smocked panels. If the needle is
          traveling across pleat peaks and valleys, use the smocking outline stitch instead.
        </p>
        <OutlineEmbroideryWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why outline embroidery works</h2>
        <p className="mt-3 text-ink-muted">
          Each stitch overlaps the previous stitch and rolls to the same side. Keeping the thread
          below the needle stacks those overlaps into a continuous surface cord.
        </p>
        <OutlineEmbroideryTheoryDiagram />
      </section>
    </EmbroideryChapterLayout>
  );
}
