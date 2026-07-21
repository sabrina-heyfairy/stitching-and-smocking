"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FinishedVanDykeAppearance,
  VanDykeConstructionAnimation,
  VanDykeFrontBackCross,
  VanDykeMistakeDiagrams,
  VanDykeNeedlePath,
  VanDykePleatRowsDiagram,
  VanDykeTensionDiagram,
} from "@/components/illustrations/VanDykeStitch";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { PleatFabric } from "@/components/illustrations/PleatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";
import {
  StitchChapterLayout,
  TroubleshootList,
  VariationGrid,
  STANDARD_TOC,
} from "@/components/chapters/StitchChapterLayout";

const toc = STANDARD_TOC.map((item) => {
  if (item.id === "pleats") return { ...item, label: "Pleat & bind diagram" };
  if (item.id === "theory") return { ...item, label: "Why Van Dyke chevrons hold" };
  return item;
});

const troubleshooting = [
  {
    problem: "Looks like plain wave",
    fix: "The peak and valley turns were not bound as pairs. Unpick to the first turn that lacks a two-pleat bind, catch both neighboring mountains, then resume the diagonal travel.",
  },
  {
    problem: "Peaks twist or lean sideways",
    fix: "Usually a single-pleat catch or uneven depth across the pair. Bind two adjacent mountains at the same height and top-third depth before leaving the peak.",
  },
  {
    problem: "Chevron is too shallow",
    fix: "The diagonal travel is not climbing far enough between rows. Increase row spacing or count the travel pleats so each peak reaches the upper rail and each valley reaches the lower rail.",
  },
  {
    problem: "Tips pucker into knots",
    fix: "The pair bind is too tight. Ease the bind first, then the outgoing diagonal. The bind should mark the point without collapsing the two pleats.",
  },
  {
    problem: "Repeat spacing becomes irregular",
    fix: "Peak-to-valley travel lengths are inconsistent. Mark the next peak and valley pleat pairs on a sample; do not decide turn points by eye mid-row.",
  },
];

function VanDykeGarmentExamples() {
  const placements = [
    { x: 20, label: "Picture smock" },
    { x: 150, label: "Yoke accent" },
    { x: 280, label: "Bishop center" },
    { x: 410, label: "Collar band" },
  ];

  return (
    <IllustrationFrame caption="Van Dyke placements — use as a bold accent where the chevron can breathe">
      <SvgRoot viewBox="0 0 560 205" aria-label="Garment placement examples for Van Dyke stitch">
        {placements.map((g) => (
          <g key={g.label} transform={`translate(${g.x}, 28)`}>
            <rect
              width="120"
              height="124"
              rx="4"
              fill={ILLUSTRATION.fabric}
              stroke={ILLUSTRATION.fabricShadow}
            />
            <path
              d="M 14 36 L 28 30 L 42 36 L 56 30 L 70 36 L 84 30 L 98 36 L 110 30"
              fill="none"
              stroke={ILLUSTRATION.thread}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 20 96 Q 30 103 40 96 L 62 58 Q 72 50 82 58 L 104 96"
              fill="none"
              stroke={ILLUSTRATION.burgundy}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 20 76 Q 30 83 40 76 L 62 108 Q 72 116 82 108 L 104 76"
              fill="none"
              stroke={ILLUSTRATION.burgundySoft}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.75"
            />
            <text
              x="60"
              y="154"
              textAnchor="middle"
              fontSize="11"
              fill={ILLUSTRATION.inkMuted}
              fontFamily="var(--font-body), sans-serif"
            >
              {g.label}
            </text>
          </g>
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}

function VanDykeTheoryDiagram() {
  return (
    <IllustrationFrame caption="Van Dyke versus plain wave — same diagonal travel, different turn mechanics.">
      <SvgRoot viewBox="0 0 600 270" aria-label="Comparison of Van Dyke and plain wave mechanics">
        <text x={170} y={28} textAnchor="middle" fontSize="13" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Plain wave
        </text>
        <g transform="translate(35,42)">
          <PleatFabric count={8} startX={0} y={0} width={270} height={145} showLabels={false} />
          <line x1={0} y1={42} x2={270} y2={42} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" strokeWidth="1" opacity="0.45" />
          <line x1={0} y1={110} x2={270} y2={110} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" strokeWidth="1" opacity="0.45" />
          <path d="M 20 110 L 55 80 L 90 42 L 125 80 L 160 110 L 195 80 L 230 42" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={90} cy={42} r="4" fill={ILLUSTRATION.threadAlt} />
          <text x={135} y={168} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            changes direction on a single point
          </text>
        </g>

        <text x={430} y={28} textAnchor="middle" fontSize="13" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Van Dyke
        </text>
        <g transform="translate(325,42)">
          <PleatFabric count={8} startX={0} y={0} width={270} height={145} showLabels={false} />
          <line x1={0} y1={42} x2={270} y2={42} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" strokeWidth="1" opacity="0.45" />
          <line x1={0} y1={110} x2={270} y2={110} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" strokeWidth="1" opacity="0.45" />
          <path d="M 20 110 Q 32 118 44 110 L 92 42 Q 104 34 116 42 L 164 110 Q 176 118 188 110 L 236 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <DirectionArrow x1={76} y1={74} x2={103} y2={42} color={ILLUSTRATION.dustyBlue} label="bind two" />
          <Needle x={112} y={18} angle={25} length={54} />
          <text x={135} y={168} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            locks two pleats at each peak and valley
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function VanDykeStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(4);

  return (
    <StitchChapterLayout
      toc={toc}
      prev={{ href: "/stitches/trellis/", label: "Trellis" }}
      next={{ href: "/stitches/outline-stitch/", label: "Outline" }}
      sources="Van Dyke mechanics here follow standard English smocking usage: the stitch travels diagonally like wave, but each peak and valley is secured by binding two adjacent pleats together. Manuals vary in exact repeat width and starting direction; the essential invariant is pair-binding at every turn."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Publication-quality chapter.</strong> Van Dyke is an
            advanced English smocking stitch. It borrows the diagonal travel of{" "}
            <Link href="/stitches/wave-stitch/" className="text-dusty-blue-deep">
              Wave Stitch
            </Link>{" "}
            but adds a two-pleat bind at every peak and valley, creating a bold locked chevron.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Van Dyke makes dramatic V-shaped chevrons. The diagonals are broad like wave, but the
          tips are heavier and more deliberate because each peak and valley catches two pleats
          together.
        </p>
        <FinishedVanDykeAppearance />
      </section>

      <section id="pleats" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Pleat &amp; bind diagram</h2>
        <p className="mt-3 text-ink-muted">
          Think of the repeat as <strong className="text-ink">bind pair, travel, bind pair</strong>.
          Peaks and valleys are not just turning points; they are compact two-pleat locks. The
          diagonal between them behaves like wave.
        </p>
        <VanDykePleatRowsDiagram />
        <ul className="mt-2 space-y-2 text-sm text-ink-muted">
          <li>
            <strong className="text-ink">Peak bind:</strong> catch two neighboring mountains
            together on the upper row before descending.
          </li>
          <li>
            <strong className="text-ink">Valley bind:</strong> catch two neighboring mountains
            together on the lower row before ascending.
          </li>
          <li>
            <strong className="text-ink">Diagonal travel:</strong> move between peak and valley
            like a wave, keeping slope and stitch depth even.
          </li>
          <li>
            <strong className="text-ink">Advanced control:</strong> binds and diagonals require
            different tension; do not pull them with the same force.
          </li>
        </ul>
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          Follow the rhythm slowly: bind the valley pair, travel to the peak, bind the peak pair,
          then travel down to the next valley.
        </p>
        <VanDykeConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path diagram</h2>
        <p className="mt-3 text-ink-muted">
          The active operation is gold. Odd steps travel diagonally; even steps lock a peak or
          valley pair.
        </p>
        <IllustrationFrame
          caption="Needle path — step through bind and travel operations"
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
                Prev operation
              </button>
              <button
                type="button"
                className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
                onClick={() => setPathStep((s) => Math.min(9, s + 1))}
              >
                Next operation
              </button>
            </>
          }
        >
          <VanDykeNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
        <div className="callout-tip callout">
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Memory aid:</strong> “Lock the tip, sweep the side.” If
            you only sweep the side, you are stitching wave, not Van Dyke.
          </p>
        </div>
      </section>

      <section id="front-back" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Front · Back · Cross-section</h2>
        <p className="mt-3 text-ink-muted">
          The front shows compact locked tips and broad diagonals. The back shows longer diagonal
          carries plus small bind backs. In cross-section, only the turn points pull two mountains
          together.
        </p>
        <VanDykeFrontBackCross />
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Bind tension and travel tension are separate skills. The bind should secure a pair; the
          diagonal should remain smooth and long enough to make the chevron dramatic.
        </p>
        <VanDykeTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Van Dyke mistakes usually happen at the turns. Check every peak and valley before the
          next diagonal hides the problem.
        </p>
        <VanDykeMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Repair locally from the last correct bind. A clean tip gives the next diagonal a stable
          launch point.
        </p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">
          Keep the pair-bind rule intact; variations should change scale, spacing, or placement,
          not remove the defining turn.
        </p>
        <VariationGrid
          variants={[
            { name: "Narrow Van Dyke", note: "Shorter diagonal travel for small collars or baby bands." },
            { name: "Wide Van Dyke", note: "Tall, dramatic chevrons for central yoke accents." },
            { name: "Double Van Dyke", note: "Two chevron rows stacked or mirrored around a center line." },
            { name: "Two-color Van Dyke", note: "Contrast bind tips with diagonal travel for teaching or emphasis." },
            { name: "Van Dyke with cable", note: "Cable borders stabilize the bold diagonal field." },
            { name: "Alternating Van Dyke", note: "Advanced repeat with chevrons flipped between bands." },
          ]}
        />
      </section>

      <section id="garments" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Garment examples</h2>
        <p className="mt-3 text-ink-muted">
          Use Van Dyke where the chevron can be seen. It is often too assertive for dense filler,
          but excellent as a focal band.
        </p>
        <VanDykeGarmentExamples />
        <ul className="mt-4 space-y-2 text-sm text-ink-muted">
          <li>Picture-smocked panels — bold chevron separators</li>
          <li>Bishop centers — a single dramatic band framed by cable</li>
          <li>Yokes — accent rows below the neckline or above honeycomb fields</li>
          <li>Collars and bonnets — narrow versions with shorter travel</li>
        </ul>
        <p className="mt-4 text-sm text-ink-faint">
          See also:{" "}
          <Link href="/garments/" className="text-dusty-blue-deep">
            Garment construction
          </Link>
        </p>
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why Van Dyke chevrons hold</h2>
        <p className="mt-3 text-ink-muted">
          Plain wave changes direction by stepping from one height to another. Van Dyke turns with
          a bind: two adjacent pleats are caught together at the point before the thread travels
          away diagonally. That small lock gives each peak and valley visual weight, so the repeat
          reads as a deliberate chevron rather than a flowing wave.
        </p>
        <VanDykeTheoryDiagram />
        <div className="callout mt-4">
          <p className="text-sm text-ink-muted">
            Deeper fabric physics:{" "}
            <Link href="/theory/" className="text-dusty-blue-deep">
              Smocking Theory
            </Link>
            . Review diagonal travel in{" "}
            <Link href="/stitches/wave-stitch/" className="text-dusty-blue-deep">
              Wave Stitch
            </Link>
            , then add the pair-bind discipline shown here.
          </p>
        </div>
      </section>
    </StitchChapterLayout>
  );
}
