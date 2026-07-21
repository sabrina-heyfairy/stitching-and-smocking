"use client";

import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";

const LABEL = "var(--font-display), serif";
const BODY = "var(--font-body), sans-serif";

/**
 * Compression — a relaxed pleat strip vs the same strip after a stitch row
 * pulls neighboring mountains together. Shows the lateral force that turns
 * loose pleats into stable fabric.
 */
export function CompressionDiagram() {
  // A simple accordion profile, drawn twice at different horizontal scales.
  const peaks = 7;
  const strip = (scale: number, y: number) => {
    const step = 34 * scale;
    const startX = 300 - (peaks * step) / 2;
    let d = `M ${startX} ${y + 30}`;
    for (let i = 0; i < peaks; i++) {
      const x = startX + i * step;
      d += ` L ${x + step / 2} ${y} L ${x + step} ${y + 30}`;
    }
    return d;
  };

  return (
    <IllustrationFrame caption="A stitch row pulls mountains together — loose pleats (top) become compressed, stable fabric (bottom)">
      <SvgRoot viewBox="0 0 600 240" aria-label="Compression before and after a stitch row">
        <text x={300} y={22} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>
          Relaxed pleats
        </text>
        <path d={strip(1, 40)} fill="none" stroke={ILLUSTRATION.mountain} strokeWidth={2.5} strokeLinejoin="round" />

        <text x={300} y={150} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>
          After a compressing stitch row
        </text>
        <path d={strip(0.62, 170)} fill="none" stroke={ILLUSTRATION.mountain} strokeWidth={2.5} strokeLinejoin="round" />
        {/* stitch line + inward arrows */}
        <line x1={190} y1={185} x2={410} y2={185} stroke={ILLUSTRATION.thread} strokeWidth={2.5} strokeLinecap="round" />
        <g stroke={ILLUSTRATION.burgundy} strokeWidth={1.6} fill="none">
          <path d="M 150 185 L 185 185 M 178 180 L 185 185 L 178 190" />
          <path d="M 450 185 L 415 185 M 422 180 L 415 185 L 422 190" />
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

/**
 * Fabric geometry — a correct shallow bite (top third of the mountain) vs a
 * too-deep bite that collapses the accordion and flattens the ribbed surface.
 */
export function BiteDepthDiagram() {
  const mountain = (x: number) => `M ${x} 110 L ${x + 30} 40 L ${x + 60} 110`;
  return (
    <IllustrationFrame caption="Bite depth — shallow stitches keep mountains round; deep bites collapse the accordion">
      <SvgRoot viewBox="0 0 600 200" aria-label="Correct shallow bite versus too-deep bite">
        {/* GOOD */}
        <g transform="translate(30, 0)">
          <text x={110} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.sage} fontFamily={LABEL}>
            Shallow bite — mountains stay round
          </text>
          {[0, 60, 120].map((x) => (
            <path key={x} d={mountain(x + 40)} fill="none" stroke={ILLUSTRATION.mountain} strokeWidth={2.4} strokeLinejoin="round" />
          ))}
          {/* stitch across top third */}
          <line x1={70} y1={62} x2={190} y2={62} stroke={ILLUSTRATION.thread} strokeWidth={2.4} strokeLinecap="round" />
          <line x1={40} y1={62} x2={220} y2={62} stroke={ILLUSTRATION.sage} strokeWidth={0.8} strokeDasharray="3 3" opacity={0.6} />
        </g>
        {/* BAD */}
        <g transform="translate(320, 0)">
          <text x={110} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.burgundy} fontFamily={LABEL}>
            Deep bite — mountains flatten
          </text>
          {[0, 60, 120].map((x) => (
            <path key={x} d={mountain(x + 40)} fill="none" stroke={ILLUSTRATION.mountain} strokeWidth={2.4} strokeLinejoin="round" opacity={0.5} />
          ))}
          {/* stitch dragged deep into valley */}
          <line x1={70} y1={98} x2={190} y2={98} stroke={ILLUSTRATION.burgundy} strokeWidth={2.4} strokeLinecap="round" />
          <line x1={40} y1={98} x2={220} y2={98} stroke={ILLUSTRATION.burgundy} strokeWidth={0.8} strokeDasharray="3 3" opacity={0.6} />
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

/**
 * Why cables roll — alternating needle position (above / below the thread)
 * stacks into a braided cord, versus always-one-side which twists into stem.
 */
export function CableVsStemDiagram() {
  return (
    <IllustrationFrame caption="Alternating above/below the thread braids a cable; staying on one side twists a stem rope">
      <SvgRoot viewBox="0 0 600 200" aria-label="Cable braid versus stem twist">
        {/* Cable — alternating */}
        <g transform="translate(0, 0)">
          <text x={150} y={30} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily={LABEL}>
            Cable — needle alternates
          </text>
          <line x1={40} y1={100} x2={260} y2={100} stroke={ILLUSTRATION.inkFaint} strokeWidth={0.8} strokeDasharray="4 4" />
          {Array.from({ length: 6 }).map((_, i) => {
            const x = 55 + i * 35;
            const up = i % 2 === 0;
            return (
              <path
                key={i}
                d={`M ${x} 100 Q ${x + 17} ${up ? 72 : 128} ${x + 35} 100`}
                fill="none"
                stroke={up ? ILLUSTRATION.burgundySoft : ILLUSTRATION.dustyBlue}
                strokeWidth={4}
                strokeLinecap="round"
              />
            );
          })}
          <text x={150} y={170} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>
            up · down · up · down → braid
          </text>
        </g>
        {/* Stem — one side */}
        <g transform="translate(300, 0)">
          <text x={150} y={30} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily={LABEL}>
            Stem — needle stays one side
          </text>
          <line x1={40} y1={100} x2={260} y2={100} stroke={ILLUSTRATION.inkFaint} strokeWidth={0.8} strokeDasharray="4 4" />
          {Array.from({ length: 6 }).map((_, i) => {
            const x = 55 + i * 35;
            return (
              <path
                key={i}
                d={`M ${x} 100 Q ${x + 17} 74 ${x + 35} 100`}
                fill="none"
                stroke={ILLUSTRATION.burgundySoft}
                strokeWidth={4}
                strokeLinecap="round"
              />
            );
          })}
          <text x={150} y={170} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>
            up · up · up · up → twisted rope
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

/**
 * Why waves curve — even step height reads as a smooth curve; uneven steps
 * break into a ragged zigzag.
 */
export function WaveStepDiagram() {
  const lower = 130;
  const upper = 60;
  const evenPath = () => {
    const xs = [50, 85, 120, 155, 190, 225, 260];
    const ys = [lower, 106, 83, upper, 83, 106, lower];
    return "M " + xs.map((x, i) => `${x} ${ys[i]}`).join(" L ");
  };
  const unevenPath = () => {
    const xs = [50, 85, 120, 155, 190, 225, 260];
    const ys = [lower, 95, 100, upper, 118, 90, lower];
    return "M " + xs.map((x, i) => `${x} ${ys[i]}`).join(" L ");
  };
  return (
    <IllustrationFrame caption="Even step height blends into a wave; uneven steps read as a broken zigzag">
      <SvgRoot viewBox="0 0 600 200" aria-label="Even wave steps versus uneven zigzag">
        <g transform="translate(0, 0)">
          <text x={155} y={30} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.sage} fontFamily={LABEL}>
            Even steps → smooth wave
          </text>
          <line x1={40} y1={upper} x2={270} y2={upper} stroke={ILLUSTRATION.inkFaint} strokeWidth={0.7} strokeDasharray="4 4" />
          <line x1={40} y1={lower} x2={270} y2={lower} stroke={ILLUSTRATION.inkFaint} strokeWidth={0.7} strokeDasharray="4 4" />
          <path d={evenPath()} fill="none" stroke={ILLUSTRATION.thread} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" />
        </g>
        <g transform="translate(300, 0)">
          <text x={155} y={30} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.burgundy} fontFamily={LABEL}>
            Uneven steps → ragged zigzag
          </text>
          <line x1={40} y1={upper} x2={270} y2={upper} stroke={ILLUSTRATION.inkFaint} strokeWidth={0.7} strokeDasharray="4 4" />
          <line x1={40} y1={lower} x2={270} y2={lower} stroke={ILLUSTRATION.inkFaint} strokeWidth={0.7} strokeDasharray="4 4" />
          <path d={unevenPath()} fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" />
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

/**
 * Thread tension as a control surface — loose / ideal / tight shown as three
 * states of the same short stitch row.
 */
export function TensionScaleDiagram() {
  const states = [
    {
      label: "Loose",
      note: "under-compressed, stringy",
      color: ILLUSTRATION.inkFaint,
      amp: 6,
      gap: 40,
    },
    {
      label: "Ideal",
      note: "mountains round, design clear",
      color: ILLUSTRATION.sage,
      amp: 18,
      gap: 30,
    },
    {
      label: "Tight",
      note: "over-compressed, cups & bows",
      color: ILLUSTRATION.burgundy,
      amp: 26,
      gap: 20,
    },
  ];
  return (
    <IllustrationFrame caption="Tension is a dial on compression — loose leaves pleats stringy, tight cups the work">
      <SvgRoot viewBox="0 0 600 200" aria-label="Loose, ideal, and tight tension states">
        {states.map((s, i) => {
          const cx = 100 + i * 200;
          const peaks = 5;
          const startX = cx - (peaks * s.gap) / 2;
          let d = `M ${startX} 120`;
          for (let p = 0; p < peaks; p++) {
            const x = startX + p * s.gap;
            d += ` L ${x + s.gap / 2} ${120 - s.amp} L ${x + s.gap} 120`;
          }
          return (
            <g key={s.label}>
              <text x={cx} y={40} textAnchor="middle" fontSize="13" fill={s.color} fontFamily={LABEL}>
                {s.label}
              </text>
              <path d={d} fill="none" stroke={ILLUSTRATION.mountain} strokeWidth={2.2} strokeLinejoin="round" />
              <line
                x1={startX}
                y1={120 - s.amp + 4}
                x2={startX + peaks * s.gap}
                y2={120 - s.amp + 4}
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
              />
              <text x={cx} y={165} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>
                {s.note}
              </text>
            </g>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}
