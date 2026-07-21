"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";
import { PleatFabric } from "./PleatFabric";
import { DirectionArrow, Needle } from "./Needle";

/** Wave of 4: 4 ascending stitches + 4 descending between two gathering rows. */
export const WAVE_UP = 4;
export const WAVE_DOWN = 4;
export const WAVE_CYCLE = WAVE_UP + WAVE_DOWN;

/**
 * Y positions for a wave-of-4 across consecutive mountains.
 * Index 0 = start on lower row; climbs to upper; returns to lower.
 */
export function waveY(i: number, lowerY: number, upperY: number): number {
  const pos = i % WAVE_CYCLE;
  if (pos < WAVE_UP) {
    // Ascend: 0 → lower, 1 → 1/4, 2 → 1/2, 3 → 3/4 toward upper; peak at next
    const t = pos / WAVE_UP;
    return lowerY + (upperY - lowerY) * t;
  }
  // Descend: pos 4 at upper, then down to lower
  const t = (pos - WAVE_UP) / WAVE_DOWN;
  return upperY + (lowerY - upperY) * t;
}

export function wavePoints(
  count: number,
  startX: number,
  pleatW: number,
  lowerY: number,
  upperY: number,
): { x: number; y: number }[] {
  return Array.from({ length: count }, (_, i) => ({
    x: startX + i * pleatW + pleatW / 2,
    y: waveY(i, lowerY, upperY),
  }));
}

function WavePath({
  points,
  opacity = 1,
  color = ILLUSTRATION.threadAlt,
  strokeWidth = 3.2,
}: {
  points: { x: number; y: number }[];
  opacity?: number;
  color?: string;
  strokeWidth?: number;
}) {
  if (points.length < 2) return null;
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

function DualGatheringRows({
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
        opacity="0.55"
      />
      <line
        x1={startX}
        y1={lowerY}
        x2={startX + width}
        y2={lowerY}
        stroke={ILLUSTRATION.dustyBlue}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.55"
      />
      {showLabels && (
        <>
          <text x={startX - 6} y={upperY + 3} textAnchor="end" fontSize="8" fill={ILLUSTRATION.dustyBlue}>
            Upper row
          </text>
          <text x={startX - 6} y={lowerY + 3} textAnchor="end" fontSize="8" fill={ILLUSTRATION.dustyBlue}>
            Lower row
          </text>
        </>
      )}
    </g>
  );
}

export function FinishedWaveAppearance() {
  const startX = 40;
  const width = 520;
  const count = 16;
  const pleatW = width / count;
  const lowerY = 175;
  const upperY = 115;
  const points = wavePoints(count, startX, pleatW, lowerY, upperY);

  return (
    <IllustrationFrame caption="Finished wave stitch — front view. A wave of 4 climbs to the upper gathering row, then descends; the cycle repeats.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished wave stitch on pleated fabric">
        <PleatFabric count={count} startX={startX} y={50} width={width} height={170} showLabels={false} />
        <DualGatheringRows startX={startX} width={width} lowerY={lowerY} upperY={upperY} showLabels />
        <WavePath points={points} opacity={0.3} strokeWidth={5} />
        <WavePath points={points} />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3.2}
            fill={ILLUSTRATION.threadAlt}
            stroke={ILLUSTRATION.dustyBlue}
            strokeWidth="0.7"
          />
        ))}
        {/* Peak / valley markers for one cycle */}
        <text x={startX + 4 * pleatW + pleatW / 2} y={upperY - 14} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          peak
        </text>
        <text x={startX + 8 * pleatW + pleatW / 2} y={lowerY + 18} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          trough
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function WavePleatRowsDiagram() {
  return (
    <IllustrationFrame caption="Wave uses two gathering rows. Stitches travel diagonally across mountains between the lower and upper rails.">
      <SvgRoot viewBox="0 0 600 260" aria-label="Two gathering rows for wave stitch">
        <PleatFabric count={8} startX={50} y={40} width={480} height={150} showLabels showNeedleNumbers />
        <DualGatheringRows startX={50} width={480} lowerY={155} upperY={95} showLabels />
        <WavePath
          points={wavePoints(8, 50, 60, 155, 95)}
          color={ILLUSTRATION.gold}
          strokeWidth={2.5}
        />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function WaveNeedlePath({
  showLabels = true,
  step = 4,
}: {
  showLabels?: boolean;
  step?: number;
}) {
  const startX = 50;
  const width = 480;
  const count = 12;
  const pleatW = width / count;
  const lowerY = 170;
  const upperY = 110;
  const all = wavePoints(count, startX, pleatW, lowerY, upperY);
  const visible = Math.min(Math.max(step, 1), count);
  const faded = all.slice(0, visible);
  const currentIdx = visible - 1;
  const nextIdx = Math.min(visible, count - 1);

  return (
    <SvgRoot viewBox="0 0 600 280" aria-label="Wave stitch needle path diagram">
      <PleatFabric
        count={count}
        startX={startX}
        y={45}
        width={width}
        height={165}
        showLabels={false}
        highlightPleat={currentIdx + 1}
      />
      <DualGatheringRows startX={startX} width={width} lowerY={lowerY} upperY={upperY} showLabels={showLabels} />
      <WavePath points={faded} opacity={0.35} />
      {visible < count && (
        <>
          <WavePath
            points={[all[currentIdx], all[nextIdx]]}
            color={ILLUSTRATION.gold}
            strokeWidth={4}
          />
          <DirectionArrow
            x1={all[currentIdx].x}
            y1={all[currentIdx].y}
            x2={all[nextIdx].x}
            y2={all[nextIdx].y}
            color={ILLUSTRATION.burgundy}
            label={all[nextIdx].y < all[currentIdx].y ? "ascend" : all[nextIdx].y > all[currentIdx].y ? "descend" : "level"}
          />
          <Needle
            x={all[nextIdx].x - 4}
            y={all[nextIdx].y - 22}
            angle={35}
            length={50}
          />
        </>
      )}
      {showLabels && (
        <text
          x={300}
          y={30}
          textAnchor="middle"
          fontSize="10"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          Current stitch in gold — climb toward upper row, then descend to lower
        </text>
      )}
    </SvgRoot>
  );
}

const STEPS = [
  {
    title: "Anchor on the lower row",
    body: "Bring the needle up through mountain 1 on the lower gathering row. Take only the top third of the mountain — same depth rule as cable. This trough is where each wave cycle begins and ends.",
  },
  {
    title: "Begin the ascent",
    body: "Stitch into mountain 2 slightly above the lower row — about one-quarter of the distance toward the upper row. Keep the stitch length even across the pleat. You are building the rising slope of the wave.",
  },
  {
    title: "Continue climbing",
    body: "Mountains 3 and 4 step halfway, then three-quarters of the way to the upper row. Each stitch is one mountain to the right and one vertical step up. Do not jump a pleat to “catch up” in height.",
  },
  {
    title: "Reach the peak",
    body: "Mountain 5 (for a wave of 4) lands on the upper gathering row. This is the crest. Keep tension identical to the ascent stitches — a tight peak will pull the whole wave upward and distort the panel.",
  },
  {
    title: "Descend the wave",
    body: "Mountains 6–8 step back down: three-quarters, half, quarter. Mountain 9 returns to the lower row (trough). From here the next cycle begins — ascend again. The rhythm is: climb, crest, fall, trough, repeat.",
  },
  {
    title: "Keep the amplitude even",
    body: "Every peak should hit the same upper row; every trough the same lower row. Count stitches in the ascent and descent — a wave of 4 means four steps up and four steps down. Uneven counts make lopsided chevrons.",
  },
];

export function WaveConstructionAnimation() {
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
    }, 2400);
    return () => clearInterval(id);
  }, [playing, reduce]);

  // Map narrative steps to needle-path progress through one wave cycle
  const pathStep = [1, 2, 4, 5, 8, 10][step] ?? 8;

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
      <WaveNeedlePath step={pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

export function WaveFrontBackCross() {
  return (
    <IllustrationFrame caption="Front shows the flowing wave; back shows short carries; cross-section shows stitches spanning two row levels">
      <SvgRoot viewBox="0 0 600 300" aria-label="Wave stitch front, back, and cross-section">
        <text x={100} y={22} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Front
        </text>
        <g transform="translate(10,20) scale(0.32)">
          <PleatFabric count={8} startX={40} y={40} width={400} height={140} showLabels={false} />
          <WavePath points={wavePoints(8, 40, 50, 145, 85)} />
        </g>

        <text x={300} y={22} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Back
        </text>
        <g transform="translate(210,35)">
          <rect x={0} y={0} width={180} height={100} rx={4} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          {[15, 40, 65, 90, 115, 140].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={30 + (i % 4) * 8}
              x2={x + 18}
              y2={45 - (i % 3) * 6}
              stroke={ILLUSTRATION.threadAlt}
              strokeWidth="2"
              opacity="0.75"
            />
          ))}
          <text x={90} y={120} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Diagonal carries follow the slope
          </text>
        </g>

        <text x={500} y={22} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Cross-section
        </text>
        <g transform="translate(420,40)">
          <line x1={0} y1={30} x2={140} y2={30} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          <line x1={0} y1={70} x2={140} y2={70} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          <text x={145} y={33} fontSize="7" fill={ILLUSTRATION.dustyBlue}>upper</text>
          <text x={145} y={73} fontSize="7" fill={ILLUSTRATION.dustyBlue}>lower</text>
          {[10, 35, 60, 85, 110].map((x) => (
            <path
              key={x}
              d={`M ${x} 25 Q ${x + 8} 55 ${x + 16} 25`}
              fill="none"
              stroke={ILLUSTRATION.fabricShadow}
              strokeWidth="6"
              strokeLinecap="round"
            />
          ))}
          <path
            d="M 18 68 L 43 55 L 68 42 L 93 30 L 118 42"
            fill="none"
            stroke={ILLUSTRATION.threadAlt}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x={70} y={100} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Top ⅓ of each fold, stepped in height
          </text>
        </g>

        <line x1={200} y1={18} x2={200} y2={160} stroke={ILLUSTRATION.creamDeeper} />
        <line x1={400} y1={18} x2={400} y2={160} stroke={ILLUSTRATION.creamDeeper} />

        <text x={300} y={210} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Unlike cable (one row), wave deliberately changes height between two gathering rails.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
