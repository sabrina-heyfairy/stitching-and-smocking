"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FrenchKnotConstructionAnimation,
  FrenchKnotFinishedAppearance,
  FrenchKnotMistakeDiagrams,
  FrenchKnotNeedlePath,
  FrenchKnotTensionDiagram,
  FrenchKnotTheoryDiagram,
  FrenchKnotWithSmockingDiagram,
} from "@/components/illustrations/FrenchKnotStitch";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

function FrenchKnotScaleKey() {
  return (
    <IllustrationFrame caption="French knot scale key - wrap count changes dot size, not the anchoring rule.">
      <SvgRoot viewBox="0 0 600 185" aria-label="French knot scale key">
        <FlatFabric x={42} y={34} width={516} height={112} />
        {[1, 2, 3].map((wraps, index) => {
          const x = 170 + index * 130;
          const r = 6 + wraps * 2;
          return (
            <g key={wraps}>
              <circle cx={x} cy="86" r={r} fill={index === 1 ? ILLUSTRATION.burgundy : ILLUSTRATION.threadAlt} filter="url(#soft-shadow)" />
              <path
                d={`M ${x - r * 0.6} 88 C ${x - r * 0.1} ${78 - wraps} ${x + r * 0.62} ${80 + wraps} ${x + r * 0.2} 92`}
                fill="none"
                stroke={ILLUSTRATION.burgundySoft}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <text x={x} y="128" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
                {wraps} {wraps === 1 ? "wrap" : "wraps"}
              </text>
            </g>
          );
        })}
        <Needle x={248} y={52} angle={12} length={122} />
        <DirectionArrow x1={392} y1={66} x2={318} y2={88} color={ILLUSTRATION.dustyBlue} label="reinsert close" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function FrenchKnotChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(3);

  return (
    <EmbroideryChapterLayout
      toc={[...EMBROIDERY_TOC]}
      prev={{ href: "/embroidery/bullion/", label: "Bullion" }}
      next={{ href: "/embroidery/lazy-daisy/", label: "Lazy Daisy" }}
      sources="French knot instructions here follow standard hand-embroidery teaching: bring the needle up, wrap the thread one to three times around the needle near the fabric, reinsert close to but not in the exit hole, hold the wraps as the thread is drawn through, and seat the knot as a raised dot. Manuals differ on exact wrap count by thread size; the anchoring principle is consistent."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Beginner surface embroidery.</strong> French knot is the
            classic raised dot: up, wrap one to three times, reinsert close to the exit, and pull the
            wraps down to the fabric.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          A French knot is a tiny bead of thread on the fabric face. One wrap makes a seed dot; two
          or three wraps make a stronger accent for flower centers, scattered texture, and picture
          embroidery.
        </p>
        <FrenchKnotFinishedAppearance />
        <FrenchKnotScaleKey />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          The animation shows the essential beginner rhythm. The knot is controlled by the hand
          holding the wraps, not by yanking the working thread after the needle goes down.
        </p>
        <FrenchKnotConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path with controls</h2>
        <p className="mt-3 text-ink-muted">
          Step through the dot slowly. The exit and re-entry points are close neighbors; putting the
          needle back into the same hole gives the knot a path to disappear.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through the French knot"
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
                onClick={() => setPathStep((value) => Math.min(5, value + 1))}
              >
                Next step
              </button>
              <span className="self-center text-xs text-ink-faint">Step {pathStep}/5</span>
            </>
          }
        >
          <FrenchKnotNeedlePath step={pathStep} showLabels={showLabels} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Tension</h2>
        <p className="mt-3 text-ink-muted">
          French knot tension is small and precise. Keep the wraps snug against the needle, guide
          them to the fabric, and stop pulling when the dot seats.
        </p>
        <FrenchKnotTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          French knot mistakes are usually anchoring mistakes: the re-entry is too close, too far,
          or uncontrolled while the wraps are pulled through.
        </p>
        <FrenchKnotMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Start by checking the fabric bridge. A reliable French knot needs a tiny bridge between
          the exit and re-entry holes.
        </p>
        <TroubleshootList
          items={[
            {
              problem: "Knot disappears to the back",
              fix: "You probably reinserted in the same hole. Rework with the needle a thread or two away from the exit point.",
            },
            {
              problem: "Knot has a loose tail",
              fix: "The wraps were released while pulling through. Hold the wraps against the fabric until the thread is nearly seated.",
            },
            {
              problem: "Dot is too bulky",
              fix: "Use fewer wraps or a finer thread. Most French knots need only one to three wraps.",
            },
            {
              problem: "Fabric dimples around the dot",
              fix: "Final tension is too hard. Seat the knot as soon as it rounds up, then stop pulling.",
            },
            {
              problem: "Knot sits far from the intended spot",
              fix: "The re-entry point is too far away or the wraps were not guided down before pulling. Keep both holes close and controlled.",
            },
          ]}
        />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">
          Change scale and spacing without changing the anchoring rule. French knots are most useful
          when the dots are deliberate rather than randomly bulky.
        </p>
        <VariationGrid
          variants={[
            { name: "One-wrap seed", note: "Tiny dots for delicate sprays and heirloom texture." },
            { name: "Two-wrap standard", note: "Balanced dot for flower centers and small accents." },
            { name: "Three-wrap accent", note: "Bolder bead for heavier thread or focal points." },
            { name: "Scattered knots", note: "Random-looking texture placed with controlled spacing." },
            { name: "Clustered centers", note: "Several knots grouped into a flower center." },
            { name: "Two-color dots", note: "Alternate burgundy and dusty blue for vintage floral shading." },
          ]}
        />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          French knots sit as surface dots above smocking. Place them after cable or trellis rows
          are stable so each dot remains round instead of being stretched by later pleat handling.
        </p>
        <FrenchKnotWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Theory</h2>
        <p className="mt-3 text-ink-muted">
          A French knot holds because wrapped thread is trapped over a tiny bridge of fabric. The
          exit hole feeds the wrap; the nearby re-entry hole anchors it. Too much distance turns the
          knot into a little stitch, while the same hole lets the knot pull through.
        </p>
        <FrenchKnotTheoryDiagram />
        <div className="callout mt-4">
          <p className="text-sm text-ink-muted">
            Compare raised dots with the wrapped coil in{" "}
            <Link href="/embroidery/bullion/" className="text-dusty-blue-deep">
              Bullion
            </Link>{" "}
            and with the loop-and-tack petal in{" "}
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
