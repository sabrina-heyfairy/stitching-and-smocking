"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";
import { PleatFabric } from "./PleatFabric";
import { DirectionArrow, Needle } from "./Needle";

/**
 * English smocking honeycomb:
 * Bind two mountains on the lower row → travel up inside the second mountain →
 * bind the next pair on the upper row → travel down → repeat.
 * Gaps between bindings open into hexagonal cells when the fabric stretches.
 */

export function honeycombBindPoints(
  pairCount: number,
  startX: number,
  pleatW: number,
  lowerY: number,
  upperY: number,
): { x1: number; x2: number; y: number; row: "lower" | "upper"; pairIndex: number }[] {
  const binds: {
    x1: number;
    x2: number;
    y: number;
    row: "lower" | "upper";
    pairIndex: number;
  }[] = [];
  // pairIndex 0: mountains 1-2 on lower; 1: mountains 2-3 on upper; 2: 3-4 lower; …
  for (let p = 0; p < pairCount; p++) {
    const leftMountain = p + 1; // 1-based left of the bound pair
    const x1 = startX + (leftMountain - 1) * pleatW + pleatW / 2;
    const x2 = startX + leftMountain * pleatW + pleatW / 2;
    const row: "lower" | "upper" = p % 2 === 0 ? "lower" : "upper";
    binds.push({
      x1,
      x2,
      y: row === "lower" ? lowerY : upperY,
      row,
      pairIndex: p,
    });
  }
  return binds;
}

function DualRows({
  startX,
  width,
  lowerY,
  upperY,
  showLabels,
}: {
  startX: number;
  width: number;
  lowerY: number;
  upperY: number;
  showLabels?: boolean;
}) {
  return (
    <g fontFamily="var(--font-body), sans-serif">
      <line
        x1={startX}
        y1={upperY}
        x2={startX + width}
        y2={upperY}
        stroke={ILLUSTRATION.dustyBlue}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
      />
      <line
        x1={startX}
        y1={lowerY}
        x2={startX + width}
        y2={lowerY}
        stroke={ILLUSTRATION.dustyBlue}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.5"
      />
      {showLabels && (
        <>
          <text x={startX - 6} y={upperY + 3} textAnchor="end" fontSize="8" fill={ILLUSTRATION.dustyBlue}>
            Upper
          </text>
          <text x={startX - 6} y={lowerY + 3} textAnchor="end" fontSize="8" fill={ILLUSTRATION.dustyBlue}>
            Lower
          </text>
        </>
      )}
    </g>
  );
}

function HoneycombCells({
  startX,
  pleatW,
  lowerY,
  upperY,
  cells,
  open = 1,
}: {
  startX: number;
  pleatW: number;
  lowerY: number;
  upperY: number;
  cells: number;
  open?: number;
}) {
  // Hex-like cells between alternating binds
  return (
    <g opacity={0.35}>
      {Array.from({ length: cells }).map((_, i) => {
        const mx = startX + (i + 1.5) * pleatW;
        const midY = (lowerY + upperY) / 2;
        const rx = pleatW * 0.55 * open;
        const ry = ((lowerY - upperY) / 2) * 0.85 * open;
        return (
          <ellipse
            key={i}
            cx={mx}
            cy={midY}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={ILLUSTRATION.sage}
            strokeWidth="1.2"
            strokeDasharray={open > 0.7 ? undefined : "2 2"}
          />
        );
      })}
    </g>
  );
}

function BindStitch({
  x1,
  x2,
  y,
  color = ILLUSTRATION.sage,
  opacity = 1,
  strokeWidth = 3.2,
}: {
  x1: number;
  x2: number;
  y: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  const mid = (x1 + x2) / 2;
  return (
    <g opacity={opacity}>
      <path
        d={`M ${x1} ${y} Q ${mid} ${y - 6} ${x2} ${y}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx={x1} cy={y} r={3} fill={color} />
      <circle cx={x2} cy={y} r={3} fill={color} />
    </g>
  );
}

function TravelStitch({
  x,
  y1,
  y2,
  color = ILLUSTRATION.sage,
  opacity = 0.55,
}: {
  x: number;
  y1: number;
  y2: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <line
      x1={x}
      y1={y1}
      x2={x}
      y2={y2}
      stroke={color}
      strokeWidth="1.8"
      strokeDasharray="3 2"
      opacity={opacity}
    />
  );
}

export function FinishedHoneycombAppearance() {
  const startX = 40;
  const width = 520;
  const count = 12;
  const pleatW = width / count;
  const lowerY = 175;
  const upperY = 115;
  const binds = honeycombBindPoints(10, startX, pleatW, lowerY, upperY);

  return (
    <IllustrationFrame caption="Finished honeycomb — paired binds on alternating rows; cells open between bindings when the fabric stretches.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished honeycomb stitch on pleated fabric">
        <PleatFabric count={count} startX={startX} y={50} width={width} height={170} showLabels={false} />
        <DualRows startX={startX} width={width} lowerY={lowerY} upperY={upperY} showLabels />
        <HoneycombCells startX={startX} pleatW={pleatW} lowerY={lowerY} upperY={upperY} cells={9} open={1} />
        {binds.map((b, i) => (
          <g key={i}>
            <BindStitch x1={b.x1} x2={b.x2} y={b.y} />
            {i < binds.length - 1 && (
              <TravelStitch
                x={b.x2}
                y1={b.y}
                y2={binds[i + 1].y}
              />
            )}
          </g>
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function HoneycombPleatDiagram() {
  const startX = 50;
  const width = 480;
  const pleatW = width / 8;
  const lowerY = 155;
  const upperY = 95;
  const binds = honeycombBindPoints(5, startX, pleatW, lowerY, upperY);

  return (
    <IllustrationFrame caption="Honeycomb uses two gathering rows. Bind pairs on the lower row, travel up, bind on the upper, travel down.">
      <SvgRoot viewBox="0 0 600 260" aria-label="Honeycomb pleat and row diagram">
        <PleatFabric count={8} startX={startX} y={40} width={width} height={150} showLabels showNeedleNumbers />
        <DualRows startX={startX} width={width} lowerY={lowerY} upperY={upperY} showLabels />
        {binds.map((b, i) => (
          <g key={i}>
            <BindStitch x1={b.x1} x2={b.x2} y={b.y} color={ILLUSTRATION.gold} strokeWidth={2.8} />
            <text
              x={(b.x1 + b.x2) / 2}
              y={b.y - 10}
              textAnchor="middle"
              fontSize="8"
              fill={ILLUSTRATION.inkMuted}
              fontFamily="var(--font-body), sans-serif"
            >
              bind {i + 1}
            </text>
            {i < binds.length - 1 && (
              <TravelStitch x={b.x2} y1={b.y} y2={binds[i + 1].y} color={ILLUSTRATION.gold} />
            )}
          </g>
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function HoneycombNeedlePath({
  showLabels = true,
  step = 3,
}: {
  showLabels?: boolean;
  step?: number;
}) {
  const startX = 50;
  const width = 480;
  const count = 10;
  const pleatW = width / count;
  const lowerY = 170;
  const upperY = 110;
  const binds = honeycombBindPoints(8, startX, pleatW, lowerY, upperY);
  const visible = Math.min(Math.max(step, 1), binds.length);
  const current = binds[visible - 1];
  const next = binds[Math.min(visible, binds.length - 1)];

  return (
    <SvgRoot viewBox="0 0 600 280" aria-label="Honeycomb needle path diagram">
      <PleatFabric
        count={count}
        startX={startX}
        y={45}
        width={width}
        height={165}
        showLabels={false}
        highlightPleat={visible + 1}
      />
      <DualRows startX={startX} width={width} lowerY={lowerY} upperY={upperY} showLabels={showLabels} />
      {binds.slice(0, visible).map((b, i) => (
        <g key={i}>
          <BindStitch x1={b.x1} x2={b.x2} y={b.y} opacity={i < visible - 1 ? 0.35 : 1} color={i === visible - 1 ? ILLUSTRATION.gold : ILLUSTRATION.sage} />
          {i < visible - 1 && (
            <TravelStitch x={b.x2} y1={b.y} y2={binds[i + 1].y} opacity={0.3} />
          )}
        </g>
      ))}
      {visible < binds.length && current && (
        <>
          <TravelStitch x={current.x2} y1={current.y} y2={next.y} color={ILLUSTRATION.burgundy} opacity={0.9} />
          <DirectionArrow
            x1={current.x2}
            y1={current.y}
            x2={current.x2}
            y2={next.y}
            color={ILLUSTRATION.burgundy}
            label={next.y < current.y ? "travel up" : "travel down"}
          />
          <Needle x={next.x2 - 2} y={next.y - 20} angle={40} length={48} />
        </>
      )}
      {showLabels && (
        <text
          x={300}
          y={28}
          textAnchor="middle"
          fontSize="10"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          Gold = current bind · Dashed = travel inside the mountain between rows
        </text>
      )}
    </SvgRoot>
  );
}

const STEPS = [
  {
    title: "Bind the first pair — lower row",
    body: "Bring the needle up through mountain 1 on the lower gathering row. Take mountain 2 on the same row and draw the two mountains together with a firm but not crushing stitch. This is bind 1 — the floor of the first cell.",
  },
  {
    title: "Travel up inside the mountain",
    body: "Without ending the thread, slide the needle up inside mountain 2 (between the fabric layers of that pleat) until you reach the upper gathering row. Come out on mountain 2 at the upper row. Do not make a long surface carry across the face of the work.",
  },
  {
    title: "Bind the next pair — upper row",
    body: "On the upper row, take mountain 3 and draw it to mountain 2. This upper bind is the ceiling of the first cell and the start of the next. Keep stitch depth to the top third of each mountain — same rule as cable.",
  },
  {
    title: "Travel down and continue",
    body: "Travel down inside mountain 3 to the lower row. Bind mountains 3 and 4 on the lower row. Alternate: bind lower → travel up → bind upper → travel down. The lattice grows as paired binds stagger between rows.",
  },
  {
    title: "Let the cells open",
    body: "After several binds, gently ease the panel sideways. Hexagonal cells should appear between bindings. If cells stay sealed, tension is too tight or binds were placed on consecutive mountains without the alternating-row travel.",
  },
  {
    title: "Keep the stagger true",
    body: "Every lower bind should sit under a cell; every upper bind above one. If two binds stack on the same two mountains on both rows, you have made a closed tube — unpick and restore the stagger.",
  },
];

export function HoneycombConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2500);
    return () => clearInterval(id);
  }, [playing, reduce]);

  const pathStep = [1, 1, 2, 4, 5, 6][step] ?? 4;

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].title}`}
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
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= STEPS.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{STEPS.length}
          </span>
        </>
      }
    >
      <HoneycombNeedlePath step={pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

export function HoneycombFrontBackCross() {
  return (
    <IllustrationFrame caption="Front shows the lattice; back shows short pair stitches; cross-section shows binds at alternating heights">
      <SvgRoot viewBox="0 0 600 300" aria-label="Honeycomb front, back, and cross-section">
        <text x={100} y={22} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Front
        </text>
        <g transform="translate(5,25) scale(0.33)">
          <PleatFabric count={8} startX={40} y={40} width={400} height={140} showLabels={false} />
          {honeycombBindPoints(6, 40, 50, 145, 85).map((b, i, arr) => (
            <g key={i}>
              <BindStitch x1={b.x1} x2={b.x2} y={b.y} strokeWidth={4} />
              {i < arr.length - 1 && <TravelStitch x={b.x2} y1={b.y} y2={arr[i + 1].y} />}
            </g>
          ))}
        </g>

        <text x={300} y={22} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Back
        </text>
        <g transform="translate(210,35)">
          <rect x={0} y={0} width={180} height={100} rx={4} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          {[20, 55, 90, 125].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={35 + (i % 2) * 25}
              x2={x + 28}
              y2={35 + (i % 2) * 25}
              stroke={ILLUSTRATION.sage}
              strokeWidth="2.5"
              opacity="0.8"
            />
          ))}
          <text x={90} y={120} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Short binds; travels stay inside pleats
          </text>
        </g>

        <text x={500} y={22} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Cross-section
        </text>
        <g transform="translate(420,40)">
          <line x1={0} y1={28} x2={140} y2={28} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          <line x1={0} y1={72} x2={140} y2={72} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          {[8, 36, 64, 92, 120].map((x) => (
            <path
              key={x}
              d={`M ${x} 22 Q ${x + 8} 50 ${x + 16} 22`}
              fill="none"
              stroke={ILLUSTRATION.fabricShadow}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
          {/* lower bind between fold 1-2, upper between 2-3 */}
          <path d="M 16 72 Q 30 66 44 72" fill="none" stroke={ILLUSTRATION.sage} strokeWidth="2.5" />
          <line x1={44} y1={72} x2={44} y2={28} stroke={ILLUSTRATION.sage} strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M 44 28 Q 58 22 72 28" fill="none" stroke={ILLUSTRATION.sage} strokeWidth="2.5" />
          <text x={70} y={100} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Alternating bind heights
          </text>
        </g>

        <line x1={200} y1={18} x2={200} y2={160} stroke={ILLUSTRATION.creamDeeper} />
        <line x1={400} y1={18} x2={400} y2={160} stroke={ILLUSTRATION.creamDeeper} />

        <text x={300} y={210} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Elasticity comes from unbound spans between staggered pair-binds — not from stretchy thread.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
