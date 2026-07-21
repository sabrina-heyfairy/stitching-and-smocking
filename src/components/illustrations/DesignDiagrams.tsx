"use client";

import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";

const LABEL = "var(--font-display), serif";
const BODY = "var(--font-body), sans-serif";

/**
 * Repeat math — a panel of pleats broken into border pleats + whole motif
 * repeats. Shows why garment width should be (border) + N × (repeat).
 */
export function RepeatMathDiagram() {
  const total = 20;
  const border = 2; // each side
  const repeat = 4;
  const cell = 26;
  const startX = 300 - (total * cell) / 2;
  const fieldStart = border;
  const fieldEnd = total - border;

  return (
    <IllustrationFrame caption="Panel width = border pleats + a whole number of motif repeats (here 2 + 4×4 + 2 = 20)">
      <SvgRoot viewBox="0 0 600 190" aria-label="Repeat math across a pleat panel">
        {Array.from({ length: total }).map((_, i) => {
          const x = startX + i * cell;
          const inField = i >= fieldStart && i < fieldEnd;
          const repeatIndex = Math.floor((i - fieldStart) / repeat);
          const isBorder = !inField;
          const fill = isBorder
            ? ILLUSTRATION.creamDeeper
            : repeatIndex % 2 === 0
              ? ILLUSTRATION.burgundySoft
              : ILLUSTRATION.dustyBlue;
          return (
            <g key={i}>
              <rect x={x} y={70} width={cell - 3} height={44} rx={2} fill={fill} opacity={isBorder ? 0.5 : 0.75} stroke={ILLUSTRATION.border} />
              <text x={x + (cell - 3) / 2} y={130} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkFaint} fontFamily={BODY}>
                {i + 1}
              </text>
            </g>
          );
        })}
        {/* border brackets */}
        <text x={startX + border * cell - cell} y={55} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily={LABEL}>
          border
        </text>
        <text x={startX + fieldEnd * cell + cell} y={55} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily={LABEL}>
          border
        </text>
        {/* repeat groups */}
        {Array.from({ length: (fieldEnd - fieldStart) / repeat }).map((_, r) => {
          const gx = startX + (fieldStart + r * repeat) * cell;
          const gw = repeat * cell - 3;
          return (
            <text key={r} x={gx + gw / 2} y={155} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.ink} fontFamily={BODY}>
              repeat {r + 1}
            </text>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}

/**
 * Centering — odd repeat centers on a single pleat; even repeat straddles the
 * two center pleats. Shows the center line and symmetric build-out.
 */
export function CenteringDiagram() {
  const cell = 30;

  const row = (count: number, y: number, straddle: boolean) => {
    const startX = 300 - (count * cell) / 2;
    const centerLine = 300;
    return (
      <g>
        {Array.from({ length: count }).map((_, i) => {
          const x = startX + i * cell;
          const mid = (count - 1) / 2;
          const isCenter = straddle ? i === Math.floor(mid) || i === Math.ceil(mid) : i === mid;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={cell - 3}
              height={38}
              rx={2}
              fill={isCenter ? ILLUSTRATION.gold : ILLUSTRATION.creamDeeper}
              opacity={isCenter ? 0.85 : 0.5}
              stroke={ILLUSTRATION.border}
            />
          );
        })}
        <line x1={centerLine} y1={y - 10} x2={centerLine} y2={y + 48} stroke={ILLUSTRATION.burgundy} strokeWidth={1.4} strokeDasharray="4 3" />
      </g>
    );
  };

  return (
    <IllustrationFrame caption="Odd repeat centers on one pleat; even repeat straddles the two middle pleats — then build outward symmetrically">
      <SvgRoot viewBox="0 0 600 210" aria-label="Centering odd and even repeats on the center line">
        <text x={300} y={26} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily={LABEL}>
          Odd repeat — center pleat (gold)
        </text>
        {row(9, 40, false)}
        <text x={300} y={130} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily={LABEL}>
          Even repeat — straddle two center pleats
        </text>
        {row(8, 144, true)}
      </SvgRoot>
    </IllustrationFrame>
  );
}
