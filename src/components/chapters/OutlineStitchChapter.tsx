"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FinishedOutlineAppearance,
  OutlineConstructionAnimation,
  OutlineFrontBackCross,
  OutlineGarmentExamples,
  OutlineMistakeDiagrams,
  OutlineNeedlePath,
  OutlinePleatDiagram,
  OutlineTensionDiagram,
} from "@/components/illustrations/OutlineStitch";
import { IllustrationFrame } from "@/components/illustrations/IllustrationFrame";
import {
  StitchChapterLayout,
  TroubleshootList,
  VariationGrid,
  STANDARD_TOC,
} from "@/components/chapters/StitchChapterLayout";

export function OutlineStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(3);

  return (
    <StitchChapterLayout
      toc={[...STANDARD_TOC]}
      prev={{ href: "/stitches/honeycomb-stitch/", label: "Honeycomb Stitch" }}
      next={{ href: "/stitches/stem-stitch/", label: "Stem Stitch" }}
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Publication-quality chapter.</strong> Outline stitch is
            the smooth-cord control row of English smocking: one gathering row, shallow mountain
            bites, and the working thread kept below the needle when working left-to-right.
          </p>
        </div>
      }
      sources="Outline mechanics here follow standard English smocking teaching for continuous single-row control stitches: shallow top-third mountain bites, consistent thread placement below the needle, and moderate tension for borders and necklines. Direction may be mirrored for left-handed work; the invariant is consistent thread position."
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          A clean outline row reads as a smooth cord lying along one gathering row. It is more
          settled than cable: no alternating braid, no high-low rhythm, and no second row. Its job is
          structural as much as decorative, especially at borders, necklines, bishop yokes, and cuff
          edges where the pleats must stay disciplined.
        </p>
        <FinishedOutlineAppearance />
      </section>

      <section id="pleats" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Pleat diagram</h2>
        <p className="mt-3 text-ink-muted">
          Work on consecutive mountains across a single gathering row. Each stitch catches only the
          top third of the mountain so the pleat remains rounded. When working left-to-right, keep
          the working thread below the needle for every stitch.
        </p>
        <OutlinePleatDiagram />
        <ul className="mt-2 space-y-2 text-sm text-ink-muted">
          <li>
            <strong className="text-ink">One row:</strong> outline does not climb to another
            gathering row.
          </li>
          <li>
            <strong className="text-ink">One side:</strong> thread position stays consistent below
            the needle for the whole row.
          </li>
          <li>
            <strong className="text-ink">Top third:</strong> shallow bites hold the surface cord
            without collapsing valleys.
          </li>
        </ul>
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          Use Play to watch the same-side thread rule repeat. The animation emphasizes what matters:
          needle path above, working thread below, and equal depth on each mountain.
        </p>
        <OutlineConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path diagram</h2>
        <p className="mt-3 text-ink-muted">
          Step through the row one stitch at a time. The gold stitch is current; labels identify the
          needle line and the thread position that forms the cord.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through the outline row"
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
          <OutlineNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
        <div className="callout-tip callout">
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Rule:</strong> if one stitch lets the thread slip above
            the needle, stop and fix it. A single reversal breaks the smooth cord.
          </p>
        </div>
      </section>

      <section id="front-back" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Front / Back / Cross-section</h2>
        <p className="mt-3 text-ink-muted">
          The front shows the smooth cord. The back shows short, even carries between adjacent
          mountains. In cross-section, the thread rides high on the folds rather than pulling deep
          into the valleys.
        </p>
        <OutlineFrontBackCross />
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Outline tension should control the edge without turning it rigid. Too loose looks like a
          sagging running stitch; too tight cups the neckline or border.
        </p>
        <OutlineTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Most outline problems are side-position problems. Check the first few stitches before the
          cord gets long.
        </p>
        <OutlineMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Fix the local error as soon as the cord stops reading smoothly.
        </p>
        <TroubleshootList
          items={[
            {
              problem: "Outline turns into a braid",
              fix: "You alternated thread position as for cable. Unpick to the first alternating stitch, then resume with the thread below the needle every time.",
            },
            {
              problem: "Cord looks lumpy or knotted",
              fix: "Thread likely jumped above the needle for one stitch or tension changed suddenly. Back up to the lump and rework with the same hand motion.",
            },
            {
              problem: "Border cups or neckline draws in",
              fix: "Tension is too tight for a control row. Ease the last several stitches, finger-round the mountains, and continue with less pull.",
            },
            {
              problem: "Cord sags below the gathering row",
              fix: "Bites are too deep or tension is too loose. Rework shallow top-third bites and draw the thread just snug.",
            },
            {
              problem: "Skipped pleat leaves a long bridge",
              fix: "Unpick to the skip and catch the missing mountain. Do not hide the bridge with extra tension; it will distort the border.",
            },
          ]}
        />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">
          Keep the same mechanics and vary thread, placement, or pairing with adjacent rows.
        </p>
        <VariationGrid
          variants={[
            { name: "Standard outline", note: "One row; thread below needle working left-to-right" },
            { name: "Mirror outline", note: "Reverse direction or hand orientation; keep side placement consistent" },
            { name: "Double outline", note: "Two parallel control rows for firm borders" },
            { name: "Fine outline", note: "Finer thread for tiny heirloom yokes and baby garments" },
            { name: "Contrast outline", note: "Use a darker thread to frame a decorative field" },
            { name: "Outline plus wave", note: "Smooth control rows above and below a wave band" },
          ]}
        />
      </section>

      <section id="garments" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Garment examples</h2>
        <p className="mt-3 text-ink-muted">
          Outline is a practical border stitch: it stabilizes edges and frames more decorative
          smocking without calling attention away from the field.
        </p>
        <OutlineGarmentExamples />
        <ul className="mt-4 space-y-2 text-sm text-ink-muted">
          <li>Bishop necklines - smooth control just below the neck binding</li>
          <li>Yoke borders - upper and lower rails around decorative stitch fields</li>
          <li>Sleeve cuffs - firm rows that keep narrow pleats aligned</li>
          <li>Bonnets - casing and brim edges that need soft structure</li>
        </ul>
        <p className="mt-4 text-sm text-ink-faint">
          See also:{" "}
          <Link href="/garments/" className="text-dusty-blue-deep">
            Garment construction
          </Link>
        </p>
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why outline works</h2>
        <p className="mt-3 text-ink-muted">
          Outline works by converting small, consistent mountain bites into a continuous surface
          cord. Because the thread remains below the needle, each new stitch settles into the same
          lower edge of the previous loop. The cord applies even lateral control to adjacent
          mountains, useful for borders and necklines, while the shallow top-third bite preserves
          pleat volume.
        </p>
        <div className="callout mt-4">
          <p className="text-sm text-ink-muted">
            For deeper fabric geometry and border compression, see{" "}
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
