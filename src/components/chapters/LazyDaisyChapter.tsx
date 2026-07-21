"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LazyDaisyConstructionAnimation,
  LazyDaisyFinishedAppearance,
  LazyDaisyMistakeDiagrams,
  LazyDaisyNeedlePath,
  LazyDaisyTensionDiagram,
  LazyDaisyTheoryDiagram,
  LazyDaisyWithSmockingDiagram,
} from "@/components/illustrations/LazyDaisyStitch";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";
import {
  EmbroideryChapterLayout,
  TroubleshootList,
  VariationGrid,
  EMBROIDERY_TOC,
} from "@/components/chapters/EmbroideryChapterLayout";

function LazyDaisyPetalKey() {
  return (
    <IllustrationFrame caption="Lazy daisy mechanics key - one loop becomes one petal when the tip is tacked.">
      <SvgRoot viewBox="0 0 600 190" aria-label="Lazy daisy petal mechanics key">
        <FlatFabric x={42} y={34} width={516} height={116} />
        <path
          d="M 300 124 C 236 78 266 50 300 54 C 334 50 364 78 300 124"
          fill="none"
          stroke={ILLUSTRATION.burgundy}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="300" cy="124" r="5" fill={ILLUSTRATION.gold} />
        <path d="M 300 54 L 300 28" stroke={ILLUSTRATION.gold} strokeWidth="3" strokeLinecap="round" />
        <Needle x={344} y={65} angle={-70} length={72} />
        <DirectionArrow x1={220} y1={112} x2={292} y2={62} color={ILLUSTRATION.dustyBlue} label="hold loop open" />
        <DirectionArrow x1={378} y1={45} x2={310} y2={39} color={ILLUSTRATION.sage} label="tiny tack" />
        <text x={300} y={172} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          The base stays soft; the tack is small enough to secure the tip without crushing it.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function LazyDaisyChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(3);

  return (
    <EmbroideryChapterLayout
      toc={[...EMBROIDERY_TOC]}
      prev={{ href: "/embroidery/french-knot/", label: "French Knot" }}
      next={{ href: "/embroidery/bullion/", label: "Bullion" }}
      sources="Lazy daisy mechanics here follow standard detached-chain embroidery teaching: bring the needle up at the petal base, form a loop, take the needle down near the same hole while holding the loop, come up inside the loop at the tip, and secure that tip with a tiny tack stitch. Exact petal length, flower count, and thread scale vary by design; the loop-and-tack structure is the defining invariant."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Beginner surface embroidery.</strong> Lazy daisy is a
            detached chain petal: up, form a loop, down near the same hole, come up inside the loop
            tip, and secure it with a tiny tack.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Lazy daisy makes soft looped petals and leaves. A single stitch looks like a teardrop
          leaf; several stitches worked from one center become a flower. The tack at each tip should
          be visible but small.
        </p>
        <LazyDaisyFinishedAppearance />
        <LazyDaisyPetalKey />
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          The animation separates the loop from the tack. A good petal is made before the tack is
          taken; the tack only preserves the shape you already formed.
        </p>
        <LazyDaisyConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path with controls</h2>
        <p className="mt-3 text-ink-muted">
          Step through the loop-and-tack sequence. The working thread must stay under control while
          the needle comes up inside the loop at the petal tip.
        </p>
        <IllustrationFrame
          caption="Needle path - toggle labels and step through the lazy daisy petal"
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
          <LazyDaisyNeedlePath step={pathStep} showLabels={showLabels} />
        </IllustrationFrame>
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Tension</h2>
        <p className="mt-3 text-ink-muted">
          Lazy daisy tension is generous at the loop and precise at the tack. Pulling the loop too
          tight turns the petal into a narrow spear; leaving it too loose makes it snag.
        </p>
        <LazyDaisyTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Most mistakes come from losing the loop before the tack is made. Hold the working thread
          in a loop until the needle emerges at the tip.
        </p>
        <LazyDaisyMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Diagnose lazy daisy by looking at the tip. A clean tip means the needle came up inside the
          loop and the tack is short enough to hold without dominating the petal.
        </p>
        <TroubleshootList
          items={[
            {
              problem: "Petal collapses into a straight stitch",
              fix: "The loop was pulled too tight or the needle missed the inside of the loop. Rework with a softer loop and bring the needle up inside it.",
            },
            {
              problem: "Loop comes loose",
              fix: "The tack is missing, too shallow, or too far from the tip. Take a tiny stitch over the loop tip to anchor it.",
            },
            {
              problem: "Petal snags above the fabric",
              fix: "The loop is too loose. Seat it gently before making the tack, leaving a rounded shape rather than a floating loop.",
            },
            {
              problem: "Flower is uneven",
              fix: "Mark petal length and direction lightly or stitch opposite petals first. Keep each tack length consistent.",
            },
            {
              problem: "Tack overwhelms the petal",
              fix: "Shorten the tack and use a finer thread if needed. The tack should secure the tip, not become a second petal.",
            },
          ]}
        />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">
          Once the detached-chain structure is reliable, vary direction, spacing, and petal count.
          The loop stays the feature; the tack stays small.
        </p>
        <VariationGrid
          variants={[
            { name: "Single leaf", note: "One lazy daisy angled off a stem for a simple sprig." },
            { name: "Five-petal flower", note: "Beginner floral motif worked around one center." },
            { name: "Eight-petal daisy", note: "Fuller flower with smaller, evenly spaced loops." },
            { name: "Open lazy daisy", note: "Longer loop with a fine thread for airy heirloom motifs." },
            { name: "Filled flower", note: "French knots or seed stitches added in the center." },
            { name: "Two-color petals", note: "Alternate burgundy and dusty blue loops for muted vintage shading." },
          ]}
        />
      </section>

      <section id="with-smocking" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">With smocking</h2>
        <p className="mt-3 text-ink-muted">
          Lazy daisy motifs sit above cable or trellis rows as surface embroidery. Let the smocking
          establish the fabric rhythm first, then place petals where they can float on the face
          without being pulled into the structural stitches.
        </p>
        <LazyDaisyWithSmockingDiagram />
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Theory</h2>
        <p className="mt-3 text-ink-muted">
          Lazy daisy is a detached chain. The base hole forms a loop of thread on the surface, and
          the needle comes up inside that loop to catch it at the tip. The tack turns a temporary
          loop into a stable petal by preventing the loop from slipping back toward the base.
        </p>
        <LazyDaisyTheoryDiagram />
        <div className="callout mt-4">
          <p className="text-sm text-ink-muted">
            Add{" "}
            <Link href="/embroidery/french-knot/" className="text-dusty-blue-deep">
              French Knots
            </Link>{" "}
            for flower centers, or compare raised petal texture with{" "}
            <Link href="/embroidery/bullion/" className="text-dusty-blue-deep">
              Bullion
            </Link>
            .
          </p>
        </div>
      </section>
    </EmbroideryChapterLayout>
  );
}
