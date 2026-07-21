"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { PleatFabric } from "@/components/illustrations/PleatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";

function mountainX(startX: number, pleatW: number, index: number) {
  return startX + index * pleatW + pleatW / 2;
}

function stemSegmentPath(x1: number, x2: number, y: number, rise = 14) {
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y + 7} C ${mid - 10} ${y - rise} ${mid + 10} ${y - rise} ${x2} ${y + 7}`;
}

function StemThreadPath({
  startX,
  pleatW,
  count,
  y,
  opacity = 1,
  color = ILLUSTRATION.threadAlt,
  strokeWidth = 3,
}: {
  startX: number;
  pleatW: number;
  count: number;
  y: number;
  opacity?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: count - 1 }).map((_, i) => {
        const x1 = mountainX(startX, pleatW, i);
        const x2 = mountainX(startX, pleatW, i + 1);
        const mid = (x1 + x2) / 2;
        return (
          <g key={i}>
            <path
              d={stemSegmentPath(x1, x2, y)}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M ${mid - 10} ${y + 9} Q ${mid} ${y - 10} ${mid + 10} ${y + 9}`}
              fill="none"
              stroke={ILLUSTRATION.burgundySoft}
              strokeWidth={Math.max(1.2, strokeWidth - 1.2)}
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        );
      })}
    </g>
  );
}

function StemPickupMarks({
  startX,
  pleatW,
  count,
  y,
  color = ILLUSTRATION.threadAlt,
  opacity = 1,
}: {
  startX: number;
  pleatW: number;
  count: number;
  y: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }).map((_, i) => {
        const x = mountainX(startX, pleatW, i);
        return (
          <g key={i}>
            <circle cx={x} cy={y + 7} r={3} fill={color} />
            <line x1={x - 7} y1={y - 10} x2={x + 7} y2={y - 10} stroke={ILLUSTRATION.dustyBlue} strokeWidth="0.8" opacity="0.42" />
          </g>
        );
      })}
    </g>
  );
}

export function FinishedStemAppearance() {
  const startX = 40;
  const width = 520;
  const count = 10;
  const pleatW = width / count;
  const rowY = 150;

  return (
    <IllustrationFrame caption="Finished stem stitch - a twisted rope on one gathering row because the needle stays on the same side of the thread.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished stem stitch on pleated fabric">
        <PleatFabric count={count} startX={startX} y={60} width={width} height={160} showLabels={false} />
        <line
          x1={startX}
          y1={rowY}
          x2={startX + width}
          y2={rowY}
          stroke={ILLUSTRATION.dustyBlue}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.5"
        />
        <StemThreadPath startX={startX} pleatW={pleatW} count={count} y={rowY} opacity={0.3} strokeWidth={5} />
        <StemThreadPath startX={startX} pleatW={pleatW} count={count} y={rowY} />
        <StemPickupMarks startX={startX} pleatW={pleatW} count={count} y={rowY} />
        <text x={300} y={244} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Same-side thread placement makes every ridge lean the same direction: rope, not alternating cable.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function StemPleatDiagram() {
  const startX = 50;
  const width = 480;
  const count = 8;
  const pleatW = width / count;
  const stitchY = 142;

  return (
    <IllustrationFrame caption="Stem is worked on one gathering row. The thread stays on one chosen side of the needle for the entire row.">
      <SvgRoot viewBox="0 0 600 260" aria-label="Stem stitch pleat diagram">
        <PleatFabric count={count} startX={startX} y={40} width={width} height={160} showLabels showNeedleNumbers />
        <StemThreadPath startX={startX} pleatW={pleatW} count={count} y={stitchY} color={ILLUSTRATION.gold} strokeWidth={2.8} />
        <StemPickupMarks startX={startX} pleatW={pleatW} count={count} y={stitchY} color={ILLUSTRATION.gold} />
        <g fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x={startX + width / 2} y={24} textAnchor="middle">
            Choose one side - needle always above the thread, or always below it
          </text>
          <text x={startX + width - 4} y={stitchY + 34} textAnchor="end">
            same side every stitch
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function StemNeedlePath({
  showLabels = true,
  step = 3,
}: {
  showLabels?: boolean;
  step?: number;
}) {
  const startX = 50;
  const width = 480;
  const count = 8;
  const pleatW = width / count;
  const stitchY = 145;
  const visible = Math.min(Math.max(step, 1), count - 1);
  const current = visible - 1;
  const x1 = mountainX(startX, pleatW, current);
  const x2 = mountainX(startX, pleatW, current + 1);

  return (
    <SvgRoot viewBox="0 0 600 280" aria-label="Stem stitch needle path diagram">
      <PleatFabric
        count={count}
        startX={startX}
        y={55}
        width={width}
        height={155}
        showLabels={false}
        highlightPleat={current + 2}
      />
      <StemThreadPath startX={startX} pleatW={pleatW} count={visible + 1} y={stitchY} opacity={0.3} />
      <StemThreadPath startX={startX + current * pleatW} pleatW={pleatW} count={2} y={stitchY} color={ILLUSTRATION.gold} strokeWidth={4} />
      <StemPickupMarks startX={startX} pleatW={pleatW} count={visible + 1} y={stitchY} opacity={0.85} />
      <path
        d={`M ${x1} ${stitchY - 18} L ${x2} ${stitchY - 18}`}
        fill="none"
        stroke={ILLUSTRATION.burgundy}
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />
      <DirectionArrow x1={x1 + 6} y1={stitchY - 18} x2={x2 - 6} y2={stitchY - 18} color={ILLUSTRATION.dustyBlue} label="needle" />
      <Needle x={x2 - 17} y={stitchY - 38} angle={18} length={58} label="same side" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x={300} y={28} textAnchor="middle">
            Gold = current stitch; needle remains on the same side of the thread
          </text>
          <text x={startX} y={248}>
            Cable alternates sides. Stem does not; every twist leans the same way.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

const STEM_STEPS = [
  {
    title: "Anchor on the first mountain",
    body: "Bring the needle up at the top third of mountain 1 on a single gathering row. Decide which side of the working thread the needle will stay on for the whole row.",
  },
  {
    title: "Set the same-side rule",
    body: "For this demonstration the needle stays above the thread. You may work the mirror version with the needle below, but do not alternate sides in the same row.",
  },
  {
    title: "Take the next mountain",
    body: "Insert and emerge through mountain 2 at the same height, with the thread still on the chosen side. The previous loop rolls into the first rope ridge.",
  },
  {
    title: "Continue the twist",
    body: "Repeat across consecutive mountains. Because every stitch is pulled from the same side, the surface line twists like a rope instead of braiding like cable.",
  },
  {
    title: "Check against outline",
    body: "Stem has visible twist ridges. If the row looks completely smooth, your tension or thread placement is making outline rather than stem.",
  },
];

export function StemConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= STEM_STEPS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2300);
    return () => clearInterval(id);
  }, [playing, reduce]);

  const pathStep = [1, 2, 3, 5, 7][step] ?? 3;

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${STEM_STEPS.length}: ${STEM_STEPS[step].title}`}
      controls={
        <>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setStep((s) => Math.min(STEM_STEPS.length - 1, s + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= STEM_STEPS.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{STEM_STEPS.length}
          </span>
        </>
      }
    >
      <StemNeedlePath step={pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {STEM_STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

export function StemFrontBackCross() {
  return (
    <IllustrationFrame caption="Front, back, and cross-section of stem stitch">
      <SvgRoot viewBox="0 0 600 320" aria-label="Stem stitch front back and cross-section">
        <text x={100} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Front
        </text>
        <g transform="translate(0,12) scale(0.35)">
          <PleatFabric count={6} startX={40} y={40} width={300} height={120} showLabels={false} />
          <StemThreadPath startX={40} pleatW={50} count={6} y={100} />
          <StemPickupMarks startX={40} pleatW={50} count={6} y={100} />
        </g>

        <text x={300} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Back
        </text>
        <g transform="translate(210,34)">
          <rect x={0} y={0} width={180} height={95} rx={4} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          {[22, 52, 82, 112, 142].map((x) => (
            <line
              key={x}
              x1={x}
              y1={48}
              x2={x + 22}
              y2={38}
              stroke={ILLUSTRATION.threadAlt}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />
          ))}
          <text x={90} y={115} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Reverse carries lean consistently
          </text>
        </g>

        <text x={500} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Cross-section
        </text>
        <g transform="translate(415,40)">
          {[0, 28, 56, 84].map((x) => (
            <path
              key={x}
              d={`M ${x} 20 Q ${x + 10} 70 ${x + 20} 20`}
              fill="none"
              stroke={ILLUSTRATION.fabricShadow}
              strokeWidth="8"
              strokeLinecap="round"
            />
          ))}
          <path
            d="M 6 38 C 18 16 32 16 44 38 C 56 16 70 16 82 38 C 94 16 108 16 120 38"
            fill="none"
            stroke={ILLUSTRATION.threadAlt}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x={62} y={95} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Same-side pull creates twist
          </text>
        </g>

        <line x1={200} y1={20} x2={200} y2={155} stroke={ILLUSTRATION.creamDeeper} />
        <line x1={400} y1={20} x2={400} y2={155} stroke={ILLUSTRATION.creamDeeper} />
        <text x={300} y={215} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Stem controls the same row as cable, but its same-side leverage forms a rope.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

function StemTensionSample({
  label,
  rise,
  spacing,
  flatten,
  x,
}: {
  label: string;
  rise: number;
  spacing: number;
  flatten: number;
  x: number;
}) {
  const count = 5;
  const pleatW = 30 + spacing;
  const y = 64;

  return (
    <g transform={`translate(${x}, 18)`}>
      <text x={82} y={0} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      {Array.from({ length: count }).map((_, i) => {
        const left = 12 + i * pleatW;
        const peak = 30 + flatten * 12;
        return (
          <path
            key={i}
            d={`M ${left} 48 L ${left + 14} ${peak} L ${left + 28} 48 L ${left + 28} 92 L ${left + 14} ${82 - flatten * 8} L ${left} 92 Z`}
            fill={ILLUSTRATION.fabric}
            stroke={ILLUSTRATION.fabricShadow}
            strokeWidth="0.6"
          />
        );
      })}
      {Array.from({ length: count - 1 }).map((_, i) => {
        const x1 = 12 + i * pleatW + 14;
        const x2 = 12 + (i + 1) * pleatW + 14;
        return (
          <path
            key={i}
            d={stemSegmentPath(x1, x2, y, rise)}
            fill="none"
            stroke={ILLUSTRATION.threadAlt}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

export function StemTensionDiagram() {
  return (
    <IllustrationFrame caption="Stem tension examples - the rope needs enough pull to twist, not enough to flatten">
      <SvgRoot viewBox="0 0 640 145" aria-label="Stem stitch tension examples">
        <StemTensionSample label="Too loose" rise={7} spacing={7} flatten={0} x={0} />
        <StemTensionSample label="Ideal" rise={14} spacing={2} flatten={0.15} x={160} />
        <StemTensionSample label="Too tight" rise={19} spacing={0} flatten={0.75} x={320} />
        <StemTensionSample label="Uneven" rise={11} spacing={4} flatten={0.35} x={480} />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too loose:</strong> Twists do not define; row looks stringy.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> Even rope ridges with round pleats.
        </li>
        <li>
          <strong className="text-ink">Too tight:</strong> Rope narrows and pleats cup inward.
        </li>
        <li>
          <strong className="text-ink">Uneven:</strong> Alternating fat and thin twists.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function StemMistakeDiagrams() {
  const mistakes = [
    {
      title: "Accidental cable",
      desc: "Alternating needle sides creates a braid instead of a same-leaning rope.",
      kind: "cable" as const,
    },
    {
      title: "Outline flattening",
      desc: "Thread placement is too low and smooth; the row loses visible twist.",
      kind: "outline" as const,
    },
    {
      title: "Changed side mid-row",
      desc: "Switching from above to below reverses the rope direction at one point.",
      kind: "switch" as const,
    },
    {
      title: "Deep bite",
      desc: "A low bite drags valleys together and makes the rope lumpy.",
      kind: "deep" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common stem mistakes - check side consistency before the row grows long">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((m) => (
          <div key={m.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 110" aria-label={m.title} className="max-w-full">
              <PleatFabric count={5} startX={15} y={14} width={190} height={75} showLabels={false} />
              {m.kind === "cable" && (
                <path d="M 34 45 L 72 60 L 110 45 L 148 60 L 186 45" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
              )}
              {m.kind === "outline" && (
                <path d="M 34 52 Q 53 65 72 52 Q 91 65 110 52 Q 129 65 148 52 Q 167 65 186 52" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
              )}
              {m.kind === "switch" && (
                <>
                  <path d="M 34 59 C 48 35 58 35 72 59 C 86 35 96 35 110 59" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
                  <path d="M 110 45 C 124 69 134 69 148 45 C 162 69 172 69 186 45" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
                  <circle cx={110} cy={52} r={5} fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.4" />
                </>
              )}
              {m.kind === "deep" && (
                <>
                  <path d="M 34 72 C 48 50 58 50 72 72 C 86 50 96 50 110 72 C 124 50 134 50 148 72 C 162 50 172 50 186 72" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
                  <text x={110} y={102} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.burgundy} fontFamily="var(--font-body), sans-serif">
                    too deep
                  </text>
                </>
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

export function StemComparisonDiagram() {
  return (
    <IllustrationFrame caption="Cable alternates, outline smooths, stem twists on one side">
      <SvgRoot viewBox="0 0 600 150" aria-label="Comparison of cable outline and stem stitch behavior">
        {[
          { x: 20, label: "Cable: alternating", kind: "cable" as const },
          { x: 215, label: "Outline: smooth", kind: "outline" as const },
          { x: 410, label: "Stem: same side", kind: "stem" as const },
        ].map((item) => (
          <g key={item.label} transform={`translate(${item.x}, 22)`}>
            <rect width="170" height="90" rx="4" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
            {item.kind === "cable" && (
              <path d="M 18 50 L 44 36 L 70 50 L 96 36 L 122 50 L 148 36" fill="none" stroke={ILLUSTRATION.thread} strokeWidth="2.5" strokeLinecap="round" />
            )}
            {item.kind === "outline" && (
              <path d="M 18 46 Q 31 59 44 46 Q 57 59 70 46 Q 83 59 96 46 Q 109 59 122 46 Q 135 59 148 46" fill="none" stroke={ILLUSTRATION.thread} strokeWidth="2.5" strokeLinecap="round" />
            )}
            {item.kind === "stem" && (
              <>
                <path d="M 18 55 C 31 30 57 30 70 55 C 83 30 109 30 122 55 C 135 30 151 30 160 55" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 36 57 Q 44 35 52 57 M 88 57 Q 96 35 104 57 M 140 57 Q 148 35 156 57" fill="none" stroke={ILLUSTRATION.burgundySoft} strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
            <text x="85" y="120" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
              {item.label}
            </text>
          </g>
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function StemGarmentExamples() {
  return (
    <IllustrationFrame caption="Where stem stitch appears on smocked garments and samples">
      <SvgRoot viewBox="0 0 560 210" aria-label="Garment placement examples for stem stitch">
        {[
          { x: 20, label: "Accent border", y: 44 },
          { x: 150, label: "Picture stem", y: 70 },
          { x: 280, label: "Cuff rope", y: 94 },
          { x: 410, label: "Bonnet trim", y: 52 },
        ].map((g) => (
          <g key={g.label} transform={`translate(${g.x}, 30)`}>
            <rect width="120" height="120" rx="4" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
            <path d={`M 14 ${g.y + 6} C 26 ${g.y - 16} 42 ${g.y - 16} 54 ${g.y + 6} C 66 ${g.y - 16} 82 ${g.y - 16} 94 ${g.y + 6} C 102 ${g.y - 8} 110 ${g.y - 8} 116 ${g.y + 3}`} fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.3" strokeLinecap="round" />
            <path d={`M 30 ${g.y + 8} Q 36 ${g.y - 8} 42 ${g.y + 8} M 70 ${g.y + 8} Q 76 ${g.y - 8} 82 ${g.y + 8}`} fill="none" stroke={ILLUSTRATION.burgundySoft} strokeWidth="1.4" strokeLinecap="round" />
            <text x="60" y="150" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
              {g.label}
            </text>
          </g>
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}
