"use client";

import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";
import { PleatFabric } from "./PleatFabric";
import { honeycombBindPoints } from "./HoneycombStitch";

function CellLattice({
  open,
  label,
  x,
}: {
  open: number;
  label: string;
  x: number;
}) {
  const startX = 12;
  const pleatW = 28;
  const lowerY = 85;
  const upperY = 40;
  const binds = honeycombBindPoints(5, startX, pleatW, lowerY, upperY);

  return (
    <g transform={`translate(${x}, 8)`}>
      <text x={90} y={8} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      {Array.from({ length: 6 }).map((_, i) => {
        const px = startX + i * pleatW;
        const flatten = open < 0.5 ? 8 : 0;
        return (
          <path
            key={i}
            d={`M ${px} ${30 + flatten}
                L ${px + pleatW / 2} ${22}
                L ${px + pleatW} ${30 + flatten}
                L ${px + pleatW} ${100}
                L ${px + pleatW / 2} ${92 - flatten}
                L ${px} ${100} Z`}
            fill={ILLUSTRATION.fabric}
            stroke={ILLUSTRATION.fabricShadow}
            strokeWidth="0.5"
            opacity="0.9"
          />
        );
      })}
      {binds.map((b, i) => (
        <g key={i}>
          <path
            d={`M ${b.x1} ${b.y} Q ${(b.x1 + b.x2) / 2} ${b.y - 4} ${b.x2} ${b.y}`}
            fill="none"
            stroke={ILLUSTRATION.sage}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {i < binds.length - 1 && (
            <line
              x1={b.x2}
              y1={b.y}
              x2={b.x2}
              y2={binds[i + 1].y}
              stroke={ILLUSTRATION.sage}
              strokeWidth="1.2"
              strokeDasharray="2 2"
              opacity="0.5"
            />
          )}
        </g>
      ))}
      {/* cell openness cue */}
      {[1, 2, 3].map((i) => (
        <ellipse
          key={i}
          cx={startX + (i + 0.5) * pleatW}
          cy={(lowerY + upperY) / 2}
          rx={10 * open}
          ry={14 * open}
          fill="none"
          stroke={ILLUSTRATION.dustyBlue}
          strokeWidth="1"
          opacity={0.45 + open * 0.4}
        />
      ))}
    </g>
  );
}

export function HoneycombTensionDiagram() {
  return (
    <IllustrationFrame caption="Honeycomb tension — cells need room to open; over-tight binds kill the elasticity">
      <SvgRoot viewBox="0 0 640 130" aria-label="Honeycomb tension examples">
        <CellLattice x={0} open={0.35} label="Too tight" />
        <CellLattice x={160} open={1} label="Ideal" />
        <CellLattice x={320} open={0.55} label="Too loose" />
        <CellLattice x={480} open={0.2} label="No stagger" />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too tight:</strong> Cells sealed; panel cups; stretch disappears.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> Clear hex openings; mountains stay round; fabric springs.
        </li>
        <li>
          <strong className="text-ink">Too loose:</strong> Pairs don&rsquo;t hold; lattice looks floppy and uneven.
        </li>
        <li>
          <strong className="text-ink">No stagger:</strong> Binds stacked on both rows — tubes, not honeycombs.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function HoneycombMistakeDiagrams() {
  const mistakes = [
    {
      title: "Stacked binds (no travel)",
      desc: "Binding the same two mountains on both rows closes a tube instead of opening a cell.",
      kind: "stack" as const,
    },
    {
      title: "Surface carry",
      desc: "Traveling across the face between rows instead of inside the mountain leaves a visible bar.",
      kind: "carry" as const,
    },
    {
      title: "Skipped mountain",
      desc: "Jumping a pleat shifts the lattice and leaves a stretched, empty gap.",
      kind: "skip" as const,
    },
    {
      title: "Cable instead of pairs",
      desc: "Working continuous over/under on one row makes cable — no hexagonal cells.",
      kind: "cable" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common honeycomb mistakes — check the stagger after every two binds">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((m) => (
          <div key={m.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 110" aria-label={m.title} className="max-w-full">
              <PleatFabric count={6} startX={10} y={12} width={200} height={78} showLabels={false} />
              <line x1={10} y1={38} x2={210} y2={38} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.45" />
              <line x1={10} y1={68} x2={210} y2={68} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.45" />
              {m.kind === "stack" && (
                <>
                  <path d="M 35 68 Q 52 62 70 68" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
                  <path d="M 35 38 Q 52 32 70 38" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
                </>
              )}
              {m.kind === "carry" && (
                <>
                  <path d="M 35 68 Q 52 62 70 68" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
                  <line x1={70} y1={68} x2={105} y2={38} stroke={ILLUSTRATION.burgundy} strokeWidth="2.2" />
                  <path d="M 105 38 Q 122 32 140 38" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
                </>
              )}
              {m.kind === "skip" && (
                <>
                  <path d="M 35 68 Q 52 62 70 68" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
                  <path d="M 105 38 Q 140 30 175 38" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
                </>
              )}
              {m.kind === "cable" && (
                <path
                  d="M 35 68 L 70 58 L 105 68 L 140 58 L 175 68"
                  fill="none"
                  stroke={ILLUSTRATION.burgundy}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              )}
            </SvgRoot>
            <p className="mt-1 font-serif text-base text-ink">{m.title}</p>
            <p className="text-sm text-ink-muted">{m.desc}</p>
          </div>
        ))}
      </div>
    </IllustrationFrame>
  );
}

export function HoneycombVariations() {
  const variants = [
    { name: "Classic honeycomb", note: "Alternating-row pair binds — full elastic lattice" },
    { name: "Wide cell", note: "More space between gathering rows; larger hex openings" },
    { name: "Narrow / baby", note: "Closer rows; denser lattice for small yokes" },
    { name: "Double honeycomb", note: "Two stacked honeycomb bands with a cable separator" },
    { name: "Surface honeycomb", note: "Flatter variant without deep cell pull — see its own chapter" },
    { name: "Partial field", note: "Honeycomb center with cable borders for structure" },
  ];

  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((v) => (
        <div key={v.name} className="rounded border border-border bg-paper px-4 py-3">
          <p className="font-serif text-lg text-ink">{v.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{v.note}</p>
        </div>
      ))}
    </div>
  );
}

export function HoneycombStretchDemo() {
  return (
    <IllustrationFrame caption="Same stitching: relaxed vs gently stretched — cells open because binds are staggered">
      <SvgRoot viewBox="0 0 600 160" aria-label="Honeycomb relaxed versus stretched">
        <text x={150} y={18} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Relaxed
        </text>
        <g transform="translate(20,25)">
          <PleatFabric count={7} startX={0} y={0} width={280} height={100} showLabels={false} />
          {honeycombBindPoints(5, 0, 40, 70, 35).map((b, i, arr) => (
            <g key={i}>
              <path
                d={`M ${b.x1} ${b.y} Q ${(b.x1 + b.x2) / 2} ${b.y - 4} ${b.x2} ${b.y}`}
                fill="none"
                stroke={ILLUSTRATION.sage}
                strokeWidth="2.5"
              />
              {i < arr.length - 1 && (
                <line x1={b.x2} y1={b.y} x2={b.x2} y2={arr[i + 1].y} stroke={ILLUSTRATION.sage} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
              )}
            </g>
          ))}
        </g>

        <text x={450} y={18} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Stretched
        </text>
        <g transform="translate(320,25)">
          {/* Wider spacing to suggest stretch */}
          {Array.from({ length: 7 }).map((_, i) => {
            const pleatW = 38;
            const x = i * pleatW;
            return (
              <path
                key={i}
                d={`M ${x} 20 L ${x + 12} 8 L ${x + 24} 20 L ${x + 24} 95 L ${x + 12} 82 L ${x} 95 Z`}
                fill={ILLUSTRATION.fabric}
                stroke={ILLUSTRATION.fabricShadow}
                strokeWidth="0.6"
              />
            );
          })}
          {[0, 1, 2, 3, 4].map((p) => {
            const pleatW = 38;
            const x1 = p * pleatW + 12;
            const x2 = (p + 1) * pleatW + 12;
            const y = p % 2 === 0 ? 70 : 35;
            return (
              <g key={p}>
                <path
                  d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y - 5} ${x2} ${y}`}
                  fill="none"
                  stroke={ILLUSTRATION.sage}
                  strokeWidth="2.5"
                />
                <ellipse
                  cx={(x1 + x2) / 2 + pleatW / 4}
                  cy={52}
                  rx={14}
                  ry={16}
                  fill="none"
                  stroke={ILLUSTRATION.dustyBlue}
                  strokeWidth="1"
                  opacity="0.5"
                />
              </g>
            );
          })}
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}
