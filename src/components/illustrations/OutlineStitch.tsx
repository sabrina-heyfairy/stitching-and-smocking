"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { PleatFabric } from "@/components/illustrations/PleatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";

function mountainX(startX: number, pleatW: number, index: number) {
  return startX + index * pleatW + pleatW / 2;
}

function outlineSegmentPath(x1: number, x2: number, y: number, drop = 15) {
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y} Q ${mid} ${y + drop} ${x2} ${y}`;
}

function OutlineThreadPath({
  startX,
  pleatW,
  count,
  y,
  opacity = 1,
  color = ILLUSTRATION.thread,
  strokeWidth = 3.2,
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
        return (
          <path
            key={i}
            d={outlineSegmentPath(x1, x2, y)}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </g>
  );
}

function OutlinePickupMarks({
  startX,
  pleatW,
  count,
  y,
  color = ILLUSTRATION.thread,
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
            <circle cx={x} cy={y} r={3.2} fill={color} />
            <line
              x1={x - 8}
              y1={y - 9}
              x2={x + 8}
              y2={y - 9}
              stroke={ILLUSTRATION.dustyBlue}
              strokeWidth="0.8"
              opacity="0.45"
            />
          </g>
        );
      })}
    </g>
  );
}

export function FinishedOutlineAppearance() {
  const startX = 40;
  const width = 520;
  const count = 10;
  const pleatW = width / count;
  const rowY = 150;

  return (
    <IllustrationFrame caption="Finished outline stitch - a smooth cord on one gathering row with the working thread kept below the needle.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished outline stitch on pleated fabric">
        <PleatFabric count={count} startX={startX} y={60} width={width} height={160} showLabels={false} />
        <line
          x1={startX}
          y1={rowY - 9}
          x2={startX + width}
          y2={rowY - 9}
          stroke={ILLUSTRATION.dustyBlue}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.5"
        />
        <OutlineThreadPath startX={startX} pleatW={pleatW} count={count} y={rowY - 9} opacity={0.35} strokeWidth={5} />
        <OutlineThreadPath startX={startX} pleatW={pleatW} count={count} y={rowY - 9} />
        <OutlinePickupMarks startX={startX} pleatW={pleatW} count={count} y={rowY - 9} />
        <text x={300} y={244} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Each bite takes the top third of the mountain; the thread remains below the needle for the whole row.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function OutlinePleatDiagram() {
  const startX = 50;
  const width = 480;
  const count = 8;
  const pleatW = width / count;
  const stitchY = 136;

  return (
    <IllustrationFrame caption="Outline is worked continuously along a single gathering row. Bites stay shallow and high on each mountain.">
      <SvgRoot viewBox="0 0 600 260" aria-label="Outline stitch pleat diagram">
        <PleatFabric count={count} startX={startX} y={40} width={width} height={160} showLabels showNeedleNumbers />
        <OutlineThreadPath startX={startX} pleatW={pleatW} count={count} y={stitchY} color={ILLUSTRATION.gold} strokeWidth={2.8} />
        <OutlinePickupMarks startX={startX} pleatW={pleatW} count={count} y={stitchY} color={ILLUSTRATION.gold} />
        <g fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x={startX + width / 2} y={24} textAnchor="middle">
            One row only - no alternating above/below and no second gathering row
          </text>
          <text x={startX + width - 6} y={stitchY + 30} textAnchor="end">
            working thread below needle
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function OutlineNeedlePath({
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
    <SvgRoot viewBox="0 0 600 280" aria-label="Outline stitch needle path diagram">
      <PleatFabric
        count={count}
        startX={startX}
        y={55}
        width={width}
        height={155}
        showLabels={false}
        highlightPleat={current + 2}
      />
      <OutlineThreadPath startX={startX} pleatW={pleatW} count={visible + 1} y={stitchY} opacity={0.32} />
      <OutlineThreadPath startX={startX + current * pleatW} pleatW={pleatW} count={2} y={stitchY} color={ILLUSTRATION.gold} strokeWidth={4} />
      <OutlinePickupMarks startX={startX} pleatW={pleatW} count={visible + 1} y={stitchY} opacity={0.85} />
      <path
        d={`M ${x1} ${stitchY - 17} L ${x2} ${stitchY - 17}`}
        fill="none"
        stroke={ILLUSTRATION.burgundy}
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />
      <DirectionArrow x1={x1 + 6} y1={stitchY - 17} x2={x2 - 6} y2={stitchY - 17} color={ILLUSTRATION.dustyBlue} label="needle" />
      <Needle x={x2 - 18} y={stitchY - 36} angle={18} length={58} label="above thread" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x={300} y={28} textAnchor="middle">
            Gold = current stitch; dashed burgundy = needle line; cord sits below it
          </text>
          <text x={startX} y={248}>
            Same rule every time: needle above, thread below, top-third bite on the next mountain.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

const OUTLINE_STEPS = [
  {
    title: "Anchor on the first mountain",
    body: "Bring the needle up on mountain 1 at the upper third of the pleat, aligned with one gathering row. Secure the thread on the wrong side without crushing the pleat.",
  },
  {
    title: "Place the working thread below",
    body: "Before taking the next bite, lay the working thread consistently below the needle. This single habit is what makes outline read as a smooth cord rather than a braid.",
  },
  {
    title: "Take the next mountain",
    body: "Insert and emerge through mountain 2 at the same depth. The needle travels left-to-right along the row while the thread stays below the needle path.",
  },
  {
    title: "Repeat without alternating",
    body: "Continue across consecutive mountains on the same gathering row. Do not alternate above and below as for cable; outline keeps the same thread position every stitch.",
  },
  {
    title: "Set border tension",
    body: "Draw each stitch snug enough to control the border or neckline, but leave the mountains round. The finished row should guide the pleats, not flatten them.",
  },
];

export function OutlineConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= OUTLINE_STEPS.length - 1) {
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
      caption={`Step ${step + 1} of ${OUTLINE_STEPS.length}: ${OUTLINE_STEPS[step].title}`}
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
            onClick={() => setStep((s) => Math.min(OUTLINE_STEPS.length - 1, s + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= OUTLINE_STEPS.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{OUTLINE_STEPS.length}
          </span>
        </>
      }
    >
      <OutlineNeedlePath step={pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {OUTLINE_STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

export function OutlineFrontBackCross() {
  return (
    <IllustrationFrame caption="Front, back, and cross-section of outline stitch">
      <SvgRoot viewBox="0 0 600 320" aria-label="Outline stitch front back and cross-section">
        <text x={100} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Front
        </text>
        <g transform="translate(0,12) scale(0.35)">
          <PleatFabric count={6} startX={40} y={40} width={300} height={120} showLabels={false} />
          <OutlineThreadPath startX={40} pleatW={50} count={6} y={100} />
          <OutlinePickupMarks startX={40} pleatW={50} count={6} y={100} />
        </g>

        <text x={300} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Back
        </text>
        <g transform="translate(210,34)">
          <rect x={0} y={0} width={180} height={95} rx={4} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          {[22, 52, 82, 112, 142].map((x) => (
            <path
              key={x}
              d={`M ${x} 50 q 11 -9 22 0`}
              fill="none"
              stroke={ILLUSTRATION.thread}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />
          ))}
          <text x={90} y={115} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Short even carries, no long floats
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
            d="M 6 30 Q 20 44 34 30 Q 48 44 62 30 Q 76 44 90 30"
            fill="none"
            stroke={ILLUSTRATION.thread}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <text x={50} y={95} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Cord rides high on the folds
          </text>
        </g>

        <line x1={200} y1={20} x2={200} y2={155} stroke={ILLUSTRATION.creamDeeper} />
        <line x1={400} y1={20} x2={400} y2={155} stroke={ILLUSTRATION.creamDeeper} />
        <text x={300} y={215} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Outline gives border control by linking consecutive mountains with one smooth surface cord.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

function OutlineTensionSample({
  label,
  drop,
  spacing,
  flatten,
  x,
}: {
  label: string;
  drop: number;
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
            d={outlineSegmentPath(x1, x2, y, drop)}
            fill="none"
            stroke={ILLUSTRATION.thread}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

export function OutlineTensionDiagram() {
  return (
    <IllustrationFrame caption="Outline tension examples - the cord should control the edge without pinching it flat">
      <SvgRoot viewBox="0 0 640 145" aria-label="Outline stitch tension examples">
        <OutlineTensionSample label="Too loose" drop={22} spacing={7} flatten={0} x={0} />
        <OutlineTensionSample label="Ideal" drop={14} spacing={2} flatten={0.12} x={160} />
        <OutlineTensionSample label="Too tight" drop={7} spacing={0} flatten={0.75} x={320} />
        <OutlineTensionSample label="Uneven" drop={18} spacing={4} flatten={0.35} x={480} />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too loose:</strong> Cord sags below the gathering row; border loses control.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> Smooth, even cord; pleats remain rounded.
        </li>
        <li>
          <strong className="text-ink">Too tight:</strong> Neckline cups and mountains flatten.
        </li>
        <li>
          <strong className="text-ink">Uneven:</strong> Cord thickness changes from stitch to stitch.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function OutlineMistakeDiagrams() {
  const mistakes = [
    {
      title: "Thread slips above",
      desc: "One stitch was made with the thread above the needle, breaking the smooth cord.",
      kind: "above" as const,
    },
    {
      title: "Cable alternation",
      desc: "Alternating above and below makes a cable-like braid, not outline.",
      kind: "cable" as const,
    },
    {
      title: "Deep bite",
      desc: "Taking the valley instead of the top third flattens the row.",
      kind: "deep" as const,
    },
    {
      title: "Skipped mountain",
      desc: "A long bridge weakens border control and leaves a visible sag.",
      kind: "skip" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common outline mistakes - unique checks for the smooth-cord row">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((m) => (
          <div key={m.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 110" aria-label={m.title} className="max-w-full">
              <PleatFabric count={5} startX={15} y={14} width={190} height={75} showLabels={false} />
              {m.kind === "above" && (
                <>
                  <path d="M 34 51 Q 53 66 72 51 Q 91 36 110 51 Q 129 66 148 51 Q 167 66 186 51" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
                  <circle cx={110} cy={51} r={5} fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.4" />
                </>
              )}
              {m.kind === "cable" && (
                <path d="M 34 45 L 72 60 L 110 45 L 148 60 L 186 45" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
              )}
              {m.kind === "deep" && (
                <>
                  <path d="M 34 66 Q 53 83 72 66 Q 91 83 110 66 Q 129 83 148 66 Q 167 83 186 66" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
                  <text x={110} y={102} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.burgundy} fontFamily="var(--font-body), sans-serif">
                    too low in the pleat
                  </text>
                </>
              )}
              {m.kind === "skip" && (
                <path d="M 34 51 Q 53 66 72 51 M 72 51 Q 129 78 186 51" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" />
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

export function OutlineGarmentExamples() {
  return (
    <IllustrationFrame caption="Where outline stitch typically appears on smocked garments">
      <SvgRoot viewBox="0 0 560 210" aria-label="Garment placement examples for outline stitch">
        {[
          { x: 20, label: "Neckline rail", y1: 38, y2: 38 },
          { x: 150, label: "Bishop border", y1: 34, y2: 96 },
          { x: 280, label: "Cuff edge", y1: 94, y2: 94 },
          { x: 410, label: "Bonnet casing", y1: 48, y2: 78 },
        ].map((g) => (
          <g key={g.label} transform={`translate(${g.x}, 30)`}>
            <rect width="120" height="120" rx="4" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
            <path d={`M 14 ${g.y1} Q 28 ${g.y1 + 10} 42 ${g.y1} Q 56 ${g.y1 + 10} 70 ${g.y1} Q 84 ${g.y1 + 10} 98 ${g.y1}`} fill="none" stroke={ILLUSTRATION.thread} strokeWidth="2.3" strokeLinecap="round" />
            {g.y2 !== g.y1 && (
              <path d={`M 14 ${g.y2} Q 28 ${g.y2 + 10} 42 ${g.y2} Q 56 ${g.y2 + 10} 70 ${g.y2} Q 84 ${g.y2 + 10} 98 ${g.y2}`} fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.1" strokeLinecap="round" />
            )}
            <text x="60" y="150" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
              {g.label}
            </text>
          </g>
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}
