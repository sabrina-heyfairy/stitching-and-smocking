"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BullionConstructionAnimation,
  BullionFinishedAppearance,
  BullionMistakeDiagrams,
  BullionNeedlePath,
  BullionTensionDiagram,
  BullionTheoryDiagram,
  BullionWithSmockingDiagram,
} from "@/components/illustrations/BullionStitch";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

function BullionMechanicsKey() {
  return (
    <IllustrationFrame caption="Bullion mechanics key - a loop and wrapped needle become one raised coil.">
      <SvgRoot viewBox="0 0 600 190" aria-label="Key mechanics for bullion stitch">
        <FlatFabric x={42} y={34} width={516} height={116} />
        <circle cx="156" cy="94" r="5" fill={ILLUSTRATION.gold} />
        <circle cx="444" cy="94" r="5" fill={ILLUSTRATION.burgundy} />
        <path
          d="M 444 94 C 382 45 220 45 156 94"
          fill="none"
          stroke={ILLUSTRATION.threadAlt}
          strokeWidth="2.2"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />
        <Needle x={182} y={82} angle={0} length={216} label="wrap needle before pulling through" />
        <DirectionArrow x1={450} y1={72} x2={414} y2={90} color={ILLUSTRATION.dustyBlue} label="reinsert" />
        <text x={300} y={172} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          The coil succeeds when the wraps can slide along the needle without changing order.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BullionChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <EmbroideryChapterLayout
      toc={[...EMBROIDERY_TOC]}
      prev={{ href: "/embroidery/lazy-daisy/", label: "Lazy Daisy" }}
      next={{ href: "/embroidery/french-knot/", label: "French Knot" }}
      sources="Bullion mechanics here follow standard hand-embroidery teaching: bring the needle up, reinsert near the entry while keeping a surface loop, wrap the needle enough times to cover the stitch span, then draw the needle through the wrapped coil and seat it. Wrap counts, thread sizes, and rose layouts vary by tradition; the invariant is controlled wraps that slide into one raised coil."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Advanced surface embroidery.</strong> Bullion stitch is
            a wrapped coil, not a knot. It rewards slow hands: the wraps must be even, the loop must
            stay open, and the final pull must be steady enough to form a tight worm or rose petal.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          A finished bullion looks like a raised little worm: ridged, rounded, and compact from end
          to end. Short bullions make seeds and texture. Longer curved bullions become rose petals,
          especially when clustered around a center.
        </p>
        <BullionFinishedAppearance />
        <BullionMechanicsKey />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          Step through the whole motion before stitching on a garment. Bullion is advanced because
          the stitch can fail while the needle is still inside the wraps; control the wraps before
          you pull.
        </p>
        <BullionConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path with controls</h2>
        <p className="mt-3 text-ink-muted">
          Use the controls to isolate each operation. Gold marks the current working point; the
          dashed loop shows the thread path that feeds the wrapped coil.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through the bullion sequence"
          controls={
            <>
              <button
                type="button"
                className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                onClick={() => setShowLabels((value) => !value)}
              >
                {showLabels ? "Hide labels" : "Show labels"}
              </button>
              <button
                type="button"
                className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                onClick={() => setPathStep((value) => Math.max(1, value - 1))}
              >
                Previous step
              </button>
              <button
                type="button"
                className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                onClick={() => setPathStep((value) => Math.min(6, value + 1))}
              >
                Next step
              </button>
              <span className="self-center text-xs text-ink-faint">Step {pathStep}/6</span>
            </>
          }
        >
          <BullionNeedlePath step={pathStep} showLabels={showLabels} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Tension</h2>
        <p className="mt-3 text-ink-muted">
          Bullion tension has two moments: wrapping tension and seating tension. Wrap snugly enough
          that the coils touch, but loosely enough that the needle can pass through without dragging
          the wrap order out of shape.
        </p>
        <BullionTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Most bullion errors begin before the final pull. Count wraps against the stitch length,
          keep the surface loop open, and pause if the needle starts to bind.
        </p>
        <BullionMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Repair bullion by fixing the coil, not by forcing it flatter. If the wraps are out of
          order, unpick and rewrap; a distorted bullion rarely blocks nicely.
        </p>
        <TroubleshootList
          items={[
            {
              problem: "Coil is shorter than the stitch span",
              fix: "Add more wraps or shorten the entry-to-exit distance. The wrapped length should match the fabric span before you pull through.",
            },
            {
              problem: "Needle will not pull through",
              fix: "The wraps are too tight or twisted around the eye. Ease them with a fingernail, then rework with lighter wrap pressure if needed.",
            },
            {
              problem: "Bullion has a fat knot at one end",
              fix: "The wraps bunched while seating. Pinch the wraps evenly as the needle comes through and draw the thread straight along the coil.",
            },
            {
              problem: "Fabric puckers under the worm",
              fix: "The final pull is too hard or the stitch span is too short for the wrap count. Ease the thread and use a longer span for heavy bullions.",
            },
            {
              problem: "Rose petals look stiff and identical",
              fix: "Vary bullion length, curve, and angle. Cluster petals around a center instead of stacking parallel worms.",
            },
          ]}
        />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">
          Vary bullion by length, wrap count, curve, thread, and placement. Keep the core mechanics
          intact even when building complex floral clusters.
        </p>
        <VariationGrid
          variants={[
            { name: "Straight bullion", note: "A compact worm for stems, seeds, and raised texture." },
            { name: "Curved bullion", note: "Seat the coil in a slight arc for petals and leaves." },
            { name: "Bullion rose", note: "Cluster short and medium bullions around a center point." },
            { name: "Fine bullion", note: "Use fine thread and fewer wraps for heirloom scale." },
            { name: "Heavy bullion", note: "Use perle cotton or more strands for dramatic raised petals." },
            { name: "Two-color rose", note: "Alternate burgundy and dusty blue petals for vintage shading." },
          ]}
        />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Bullions sit above smocking rather than replacing it. Work cable or trellis first to
          stabilize the fabric, then add bullion roses on the surface where the raised petals can
          remain round.
        </p>
        <BullionWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Theory</h2>
        <p className="mt-3 text-ink-muted">
          Bullion works because the needle temporarily acts as a mandrel. The thread wraps around
          that mandrel, slides off in order, and becomes a spring-like coil held between two fabric
          points. If the wraps cross, tighten unevenly, or cannot slide, the raised form collapses.
        </p>
        <BullionTheoryDiagram />
        <div className="callout mt-4">
          <p className="text-sm text-ink-muted">
            For placement around smocking, compare the control-row logic in{" "}
            <Link href="/embroidery/french-knot/" className="text-dusty-blue-deep">
              French Knot
            </Link>{" "}
            and the petal-building logic in{" "}
            <Link href="/embroidery/lazy-daisy/" className="text-dusty-blue-deep">
              Lazy Daisy
            </Link>
            .
          </p>
        </div>
      </section>
    </EmbroideryChapterLayout>
  );
}
