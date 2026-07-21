"use client";

import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";

const LABEL = "var(--font-display), serif";
const BODY = "var(--font-body), sans-serif";

/**
 * Grain & bias — shows warp (lengthwise), weft (crosswise), and the 45° bias
 * on a swatch, with the rule that pleats must run parallel to a grain line.
 */
export function GrainDiagram() {
  const x0 = 40;
  const y0 = 30;
  const size = 130;
  return (
    <IllustrationFrame caption="Pleat on-grain — warp or weft. The 45° bias stretches and will skew a smocked panel.">
      <SvgRoot viewBox="0 0 600 200" aria-label="Fabric grain, weft, and bias directions">
        {/* swatch with weave */}
        <rect x={x0} y={y0} width={size} height={size} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
        <rect x={x0} y={y0} width={size} height={size} fill="url(#fabric-weave)" />
        {/* warp arrow (down) */}
        <line x1={x0 + size / 2} y1={y0} x2={x0 + size / 2} y2={y0 + size} stroke={ILLUSTRATION.dustyBlue} strokeWidth={2.4} />
        <path d={`M ${x0 + size / 2 - 5} ${y0 + size - 8} L ${x0 + size / 2} ${y0 + size} L ${x0 + size / 2 + 5} ${y0 + size - 8}`} fill="none" stroke={ILLUSTRATION.dustyBlue} strokeWidth={2.4} />
        {/* weft arrow (across) */}
        <line x1={x0} y1={y0 + size / 2} x2={x0 + size} y2={y0 + size / 2} stroke={ILLUSTRATION.sage} strokeWidth={2.4} />
        <path d={`M ${x0 + size - 8} ${y0 + size / 2 - 5} L ${x0 + size} ${y0 + size / 2} L ${x0 + size - 8} ${y0 + size / 2 + 5}`} fill="none" stroke={ILLUSTRATION.sage} strokeWidth={2.4} />
        {/* bias line */}
        <line x1={x0} y1={y0} x2={x0 + size} y2={y0 + size} stroke={ILLUSTRATION.burgundy} strokeWidth={2} strokeDasharray="5 4" />

        <text x={x0 + size / 2} y={y0 - 8} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.dustyBlue} fontFamily={LABEL}>warp (lengthwise grain)</text>
        <text x={x0 + size + 10} y={y0 + size / 2 + 4} fontSize="11" fill={ILLUSTRATION.sage} fontFamily={LABEL}>weft</text>
        <text x={x0 + size + 10} y={y0 + size + 4} fontSize="11" fill={ILLUSTRATION.burgundy} fontFamily={LABEL}>bias (45°)</text>

        {/* rule panel */}
        <g transform="translate(340, 40)">
          <text x={0} y={0} fontSize="12" fill={ILLUSTRATION.ink} fontFamily={LABEL}>The rule</text>
          <text x={0} y={22} fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>Pleats run parallel to warp or weft —</text>
          <text x={0} y={40} fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>never on the bias.</text>
          <text x={0} y={68} fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>Bias-cut panels stretch under the</text>
          <text x={0} y={86} fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>roller and skew the finished design.</text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

/**
 * Prewash — before/after showing shrinkage so pleat spacing stays true after
 * the garment is washed. A raw panel shrinks; a prewashed one holds.
 */
export function PrewashDiagram() {
  const grid = (x: number, cols: number, cellW: number, label: string, color: string) => {
    const y = 50;
    const rows = 5;
    const cellH = 16;
    return (
      <g transform={`translate(${x}, 0)`}>
        <text x={(cols * cellW) / 2} y={38} textAnchor="middle" fontSize="12" fill={color} fontFamily={LABEL}>{label}</text>
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * cellW}
              y={y + r * cellH}
              width={cellW - 2}
              height={cellH - 2}
              fill={ILLUSTRATION.fabric}
              stroke={ILLUSTRATION.fabricShadow}
              strokeWidth={0.6}
            />
          )),
        )}
      </g>
    );
  };
  return (
    <IllustrationFrame caption="Prewash first — raw fabric shrinks unevenly, throwing off pleat spacing you already smocked">
      <SvgRoot viewBox="0 0 600 190" aria-label="Prewashed versus raw fabric shrinkage">
        {grid(60, 10, 22, "Prewashed — stays true", ILLUSTRATION.sage)}
        {grid(360, 10, 17, "Washed after smocking — shrinks", ILLUSTRATION.burgundy)}
        <text x={300} y={175} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily={BODY}>
          Same 10 pleats — raw cotton can lose 3–8% on first wash
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

/**
 * Fiber behavior — how different weights hold a pleat mountain, from crisp
 * batiste through soft voile to napped flannel and slippery silk.
 */
export function FiberBehaviorDiagram() {
  const fibers = [
    { label: "Crisp (batiste)", crisp: 1, color: ILLUSTRATION.dustyBlue },
    { label: "Soft (voile)", crisp: 0.55, color: ILLUSTRATION.sage },
    { label: "Napped (flannel)", crisp: 0.4, color: ILLUSTRATION.burgundy },
    { label: "Slippery (silk)", crisp: 0.7, color: ILLUSTRATION.gold },
  ];
  return (
    <IllustrationFrame caption="How weight holds a mountain — crisp cottons peak sharply; soft or napped cloth rounds off">
      <SvgRoot viewBox="0 0 600 180" aria-label="Pleat mountain sharpness by fiber type">
        {fibers.map((f, i) => {
          const cx = 75 + i * 150;
          const peaks = 4;
          const step = 26;
          const startX = cx - (peaks * step) / 2;
          const peakY = 120 - 55 * f.crisp;
          const round = (1 - f.crisp) * 8;
          let d = `M ${startX} 120`;
          for (let p = 0; p < peaks; p++) {
            const x = startX + p * step;
            // rounded peak via quadratic when soft; sharp when crisp
            d += ` Q ${x + step / 4} ${peakY + round} ${x + step / 2} ${peakY} Q ${x + (3 * step) / 4} ${peakY + round} ${x + step} 120`;
          }
          return (
            <g key={f.label}>
              <text x={cx} y={30} textAnchor="middle" fontSize="11" fill={f.color} fontFamily={LABEL}>{f.label}</text>
              <path d={d} fill="none" stroke={ILLUSTRATION.mountain} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
              <line x1={startX - 6} y1={120} x2={startX + peaks * step + 6} y2={120} stroke={ILLUSTRATION.inkFaint} strokeWidth={0.8} />
            </g>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}
