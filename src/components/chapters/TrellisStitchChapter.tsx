"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FinishedTrellisAppearance,
  TrellisConstructionAnimation,
  TrellisFrontBackCross,
  TrellisMistakeDiagrams,
  TrellisNeedlePath,
  TrellisPleatRowsDiagram,
  TrellisTensionDiagram,
} from "@/components/illustrations/TrellisStitch";
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
  if (item.id === "pleats") return { ...item, label: "Pleat & row diagram" };
  if (item.id === "theory") return { ...item, label: "Why diamonds form" };
  return item;
});

const troubleshooting = [
  {
    problem: "Diamonds do not close at the center row",
    fix: "The lower wave is offset or the upper wave did not return to the shared vertex. Unpick back to the last clean meeting point, then restart the mirror row from the exact same mountain and height.",
  },
  {
    problem: "Trellis looks like two separate waves",
    fix: "The rows are parallel instead of mirrored. Keep the lower row inverted: when the upper wave climbs, the lower row should descend from the same shared point.",
  },
  {
    problem: "One side of each diamond is longer",
    fix: "Ascent and descent counts are mismatched. Mark peak and meeting pleats on a sample, and keep the same wave count on both upper and lower rows.",
  },
  {
    problem: "Center line puckers into a ridge",
    fix: "Meeting points are over-tightened. Ease the shared vertices first, then the side stitches; the diamonds should hold shape without crushing the pleats.",
  },
  {
    problem: "Pattern drifts off center on a yoke",
    fix: "The repeat was not planned from center front. Before stitching a garment, mark either a central diamond or a central shared vertex and work outward symmetrically.",
  },
];

function TrellisGarmentExamples() {
  const placements = [
    { x: 20, label: "Bishop yoke" },
    { x: 150, label: "Yoke panel" },
    { x: 280, label: "Sleeve band" },
    { x: 410, label: "Bonnet brim" },
  ];

  return (
    <IllustrationFrame caption="Typical trellis placements — lattice fields framed by cable or wave borders">
      <SvgRoot viewBox="0 0 560 205" aria-label="Garment placement examples for trellis stitch">
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
              d="M 14 34 L 28 28 L 42 34 L 56 28 L 70 34 L 84 28 L 98 34 L 110 28"
              fill="none"
              stroke={ILLUSTRATION.thread}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 18 74 L 34 56 L 50 74 L 66 56 L 82 74 L 98 56"
              fill="none"
              stroke={ILLUSTRATION.threadAlt}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 18 74 L 34 92 L 50 74 L 66 92 L 82 74 L 98 92"
              fill="none"
              stroke={ILLUSTRATION.thread}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 14 108 L 28 102 L 42 108 L 56 102 L 70 108 L 84 102 L 98 108 L 110 102"
              fill="none"
              stroke={ILLUSTRATION.thread}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
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

function TrellisTheoryDiagram() {
  return (
    <IllustrationFrame caption="Trellis geometry — a wave plus its inverted mate shares vertices and encloses a diamond.">
      <SvgRoot viewBox="0 0 600 250" aria-label="Trellis stitch geometry diagram">
        <PleatFabric count={9} startX={90} y={40} width={360} height={150} showLabels={false} />
        <line x1={90} y1={82} x2={450} y2={82} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" strokeWidth="1" opacity="0.5" />
        <line x1={90} y1={130} x2={450} y2={130} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" strokeWidth="1" opacity="0.7" />
        <line x1={90} y1={178} x2={450} y2={178} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" strokeWidth="1" opacity="0.5" />
        <path d="M 110 130 L 150 82 L 190 130 L 230 82 L 270 130" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 110 130 L 150 178 L 190 130 L 230 178 L 270 130" fill="none" stroke={ILLUSTRATION.thread} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {[110, 190, 270].map((x) => (
          <circle key={x} cx={x} cy={130} r="4" fill={ILLUSTRATION.gold} />
        ))}
        <DirectionArrow x1={300} y1={95} x2={370} y2={130} color={ILLUSTRATION.burgundy} label="mirror" />
        <Needle x={382} y={108} angle={25} length={58} label="same count" />
        <text
          x={300}
          y={222}
          textAnchor="middle"
          fontSize="11"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          The diamond is an invariant: same pleat count up, same pleat count down, same shared vertex.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function TrellisStitchChapter() {
  const [showLabels, setShowLabels] = useState(true);
  const [pathStep, setPathStep] = useState(8);

  return (
    <StitchChapterLayout
      toc={toc}
      prev={{ href: "/stitches/stem-stitch-smocking/", label: "Stem Stitch" }}
      next={{ href: "/stitches/van-dyke/", label: "Van Dyke" }}
      sources="Trellis mechanics here follow standard English smocking teaching: matched wave rows are mirrored so shared vertices close into diamonds. Exact wave counts and row spacing vary by manual, fabric, and pleater setup; this chapter uses a wave-of-4 base because it directly extends the Wave Stitch chapter."
      callout={
        <div className="callout">
          <p className="text-sm leading-relaxed text-ink-muted">
            <strong className="text-ink">Before you begin.</strong> Trellis is an
            intermediate stitch built directly on{" "}
            <Link href="/stitches/wave-stitch/" className="text-dusty-blue-deep">
              Wave Stitch
            </Link>
            . Work a clean wave first; trellis asks you to mirror that wave so two rows meet and
            form diamonds.
          </p>
        </div>
      }
    >
      <section id="appearance" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Finished appearance</h2>
        <p className="mt-3 text-ink-muted">
          Trellis reads as a diamond lattice across the pleated field. The eye sees crisp upper and
          lower diagonals, but mechanically it is two wave rows: an upper wave and an inverted lower
          wave sharing the same vertices on the center row.
        </p>
        <FinishedTrellisAppearance />
      </section>

      <section id="pleats" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Pleat &amp; row diagram</h2>
        <p className="mt-3 text-ink-muted">
          Use three visual rails: upper rail, shared vertex row, and lower rail. The upper wave
          climbs and returns to the shared row; the lower wave mirrors it below. Shared vertices
          must land on the same pleats or the diamonds will not close.
        </p>
        <TrellisPleatRowsDiagram />
        <ul className="mt-2 space-y-2 text-sm text-ink-muted">
          <li>
            <strong className="text-ink">Shared vertices:</strong> the meeting points that close
            each diamond, usually on a center gathering row.
          </li>
          <li>
            <strong className="text-ink">Upper wave:</strong> a normal wave climbing toward the
            upper rail and returning to center.
          </li>
          <li>
            <strong className="text-ink">Lower wave:</strong> the same count inverted below the
            shared row.
          </li>
          <li>
            <strong className="text-ink">Repeat planning:</strong> center a diamond or a shared
            vertex before stitching garment panels.
          </li>
        </ul>
      </section>

      <section id="construction" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Animated construction</h2>
        <p className="mt-3 text-ink-muted">
          Follow one diamond: mark the shared row, work the upper wave, then mirror the lower wave
          from the same vertices.
        </p>
        <TrellisConstructionAnimation />
      </section>

      <section id="needle-path" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Needle path diagram</h2>
        <p className="mt-3 text-ink-muted">
          Previous stitches fade; the active stitch is gold. Step through the upper wave first, then
          the inverted lower wave.
        </p>
        <IllustrationFrame
          caption="Needle path — toggle labels and step through the mirrored wave rows"
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
                onClick={() => setPathStep((s) => Math.min(16, s + 1))}
              >
                Next stitch
              </button>
            </>
          }
        >
          <TrellisNeedlePath showLabels={showLabels} step={pathStep} />
        </IllustrationFrame>
        <div className="callout-tip callout">
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Counting tip:</strong> Say “up four, down four; mirror
            four, return four.” The words are less important than keeping the two counts identical.
          </p>
        </div>
      </section>

      <section id="front-back" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Front · Back · Cross-section</h2>
        <p className="mt-3 text-ink-muted">
          On the front, trellis forms diamonds. On the back, the carries zigzag behind the pleats.
          In cross-section, both rows remain shallow surface stitches; the difference is their
          mirrored height.
        </p>
        <TrellisFrontBackCross />
      </section>

      <section id="tension" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Thread tension</h2>
        <p className="mt-3 text-ink-muted">
          Trellis tension is relational. A single wave may look even, but if the mirror row is
          tighter or looser the diamonds lean, cup, or fail to close.
        </p>
        <TrellisTensionDiagram />
      </section>

      <section id="mistakes" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Common mistakes</h2>
        <p className="mt-3 text-ink-muted">
          Most trellis errors are mirror errors: the two wave rows stop agreeing about where the
          shared vertices live.
        </p>
        <TrellisMistakeDiagrams />
      </section>

      <section id="troubleshooting" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Troubleshooting</h2>
        <p className="mt-3 text-ink-muted">
          Fix from the last correct shared vertex. Once a diamond closes cleanly, the next repeat
          has a trustworthy anchor.
        </p>
        <TroubleshootList items={troubleshooting} />
      </section>

      <section id="variations" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Variations</h2>
        <p className="mt-3 text-ink-muted">
          Change count, spacing, and color only after the mirrored geometry is reliable.
        </p>
        <VariationGrid
          variants={[
            { name: "Trellis of 2", note: "Small diamonds for baby garments and narrow bands." },
            { name: "Trellis of 4", note: "Standard teaching size; clear diamonds without excessive height." },
            { name: "Wide trellis", note: "More row spacing and longer slopes for dramatic yokes." },
            { name: "Stacked trellis", note: "Multiple lattice bands separated by cable or outline rows." },
            { name: "Two-color trellis", note: "Upper and lower waves in different colors to teach the mirror." },
            { name: "Offset trellis", note: "Advanced placement where adjacent bands shift by half a diamond." },
          ]}
        />
      </section>

      <section id="garments" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Garment examples</h2>
        <p className="mt-3 text-ink-muted">
          Trellis is decorative but orderly, so it works well in yoke fields and bands where the
          repeat can be centered.
        </p>
        <TrellisGarmentExamples />
        <ul className="mt-4 space-y-2 text-sm text-ink-muted">
          <li>Bishop dresses — centered trellis diamonds between cable borders</li>
          <li>Yoke panels — a controlled lattice field below a neckline</li>
          <li>Sleeve bands — short repeats where a full diamond can fit</li>
          <li>Bonnets and collars — narrow trellis of 2 or 4 for scale</li>
        </ul>
        <p className="mt-4 text-sm text-ink-faint">
          See also:{" "}
          <Link href="/garments/" className="text-dusty-blue-deep">
            Garment construction
          </Link>
        </p>
      </section>

      <section id="theory" className="scroll-mt-24">
        <h2 className="font-serif text-3xl text-ink">Why diamonds form</h2>
        <p className="mt-3 text-ink-muted">
          A wave alone is an open curve. Mirroring a second wave around a shared row turns the open
          curve into closed lattice cells. The shared vertex is the invariant: same pleat, same
          height, same tension. Lose that invariant and the lattice becomes a pair of unrelated
          waves.
        </p>
        <TrellisTheoryDiagram />
        <div className="callout mt-4">
          <p className="text-sm text-ink-muted">
            Deeper fabric physics:{" "}
            <Link href="/theory/" className="text-dusty-blue-deep">
              Smocking Theory
            </Link>
            . Review the base geometry in{" "}
            <Link href="/stitches/wave-stitch/" className="text-dusty-blue-deep">
              Wave Stitch
            </Link>
            .
          </p>
        </div>
      </section>
    </StitchChapterLayout>
  );
}
