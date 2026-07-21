"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";
import { PleatFabric } from "./PleatFabric";
import { DirectionArrow, Needle } from "./Needle";

/** Cable stitch: consecutive up/down stitches across pleat tops, forming a braid. */
function CableThreadPath({
  startX,
  midY,
  pleatW,
  count,
  opacity = 1,
  color = ILLUSTRATION.thread,
  strokeWidth = 3.2,
}: {
  startX: number;
  midY: number;
  pleatW: number;
  count: number;
  opacity?: number;
  color?: string;
  strokeWidth?: number;
}) {
  // Cable alternates: stitch over (above gathering line) then under (below)
  const points: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = startX + i * pleatW + pleatW / 2;
    const y = i % 2 === 0 ? midY - 10 : midY + 10;
    points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
  }
  return (
    <path
      d={points.join(" ")}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

export function FinishedCableAppearance() {
  const startX = 40;
  const width = 520;
  const count = 10;
  const pleatW = width / count;
  const midY = 150;

  return (
    <IllustrationFrame caption="Finished cable stitch — front view. Alternating over/under stitches create the braided cable.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished cable stitch on pleated fabric">
        <PleatFabric count={count} startX={startX} y={60} width={width} height={160} showLabels={false} />
        {/* Slightly offset second pass for braid thickness */}
        <CableThreadPath startX={startX} midY={midY} pleatW={pleatW} count={count} opacity={0.35} strokeWidth={4} />
        <CableThreadPath startX={startX} midY={midY} pleatW={pleatW} count={count} />
        {/* Highlight stitch beads on each mountain */}
        {Array.from({ length: count }).map((_, i) => {
          const x = startX + i * pleatW + pleatW / 2;
          const y = i % 2 === 0 ? midY - 10 : midY + 10;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={3.5}
              fill={ILLUSTRATION.thread}
              stroke={ILLUSTRATION.burgundySoft}
              strokeWidth="0.8"
            />
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function CableNeedlePath({
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
  const midY = 145;
  const fadedCount = Math.max(0, step - 1);
  const current = Math.min(step, count) - 1;

  return (
    <SvgRoot viewBox="0 0 600 280" aria-label="Cable stitch needle path diagram">
      <PleatFabric
        count={count}
        startX={startX}
        y={55}
        width={width}
        height={155}
        showLabels={false}
        highlightPleat={current + 1}
      />
      {/* Previous stitches faded */}
      {fadedCount > 0 && (
        <CableThreadPath
          startX={startX}
          midY={midY}
          pleatW={pleatW}
          count={fadedCount + 1}
          opacity={0.35}
        />
      )}
      {/* Current stitch highlighted */}
      {current >= 0 && current < count - 1 && (
        <>
          <CableThreadPath
            startX={startX + current * pleatW}
            midY={midY}
            pleatW={pleatW}
            count={2}
            color={ILLUSTRATION.gold}
            strokeWidth={4}
          />
          <DirectionArrow
            x1={startX + current * pleatW + pleatW / 2}
            y1={current % 2 === 0 ? midY - 10 : midY + 10}
            x2={startX + (current + 1) * pleatW + pleatW / 2}
            y2={(current + 1) % 2 === 0 ? midY - 10 : midY + 10}
            color={ILLUSTRATION.dustyBlue}
            label="next"
          />
          <Needle
            x={startX + (current + 1) * pleatW + pleatW / 2 - 5}
            y={(current + 1) % 2 === 0 ? midY - 28 : midY + 28}
            angle={(current + 1) % 2 === 0 ? 40 : -40}
            length={55}
          />
        </>
      )}
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x={300} y={30} textAnchor="middle">
            Needle path — current stitch in gold; previous stitches faded
          </text>
          <text x={startX} y={250} fontSize="9">
            Entry: take ⅓ of mountain top · Exit: next mountain, opposite side of gathering line
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

const STEPS = [
  {
    title: "Anchor in the first pleat",
    body: "Bring the needle up through the first mountain (pleat 1), about one-third of the way down from the top of the pleat, just above the gathering row. Leave a small tail on the wrong side to secure later, or use a waste knot.",
  },
  {
    title: "Travel to the next mountain — below the line",
    body: "Insert the needle into the next mountain (pleat 2) at the same depth, this time just below the gathering row. Keep the working thread below the needle (for a cable that rolls “down”). Take only the top third of the pleat — do not plunge deep into the valley.",
  },
  {
    title: "Alternate above the line",
    body: "Come up through pleat 3 just above the gathering row. The thread now lies above the needle path. This over/under alternation is what creates the cable’s braid.",
  },
  {
    title: "Continue the rhythm",
    body: "Repeat: below, above, below, above… across the row. Keep stitch depth and spacing identical. The cable should sit centered on the gathering row like a braided cord.",
  },
  {
    title: "Tension and finish",
    body: "Draw each stitch snug enough to hold the pleats but not so tight that mountains flatten. End by taking the needle to the wrong side and weaving through the backs of several stitches.",
  },
];

export function CableConstructionAnimation() {
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
    }, 2200);
    return () => clearInterval(id);
  }, [playing, reduce]);

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
      <CableNeedlePath step={Math.min(step + 2, 7)} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

export function CableFrontBackCross() {
  return (
    <IllustrationFrame caption="Front, back, and cross-section of a cable stitch row">
      <SvgRoot viewBox="0 0 600 320" aria-label="Cable stitch front, back, and cross-section">
        {/* Front */}
        <text x={100} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Front
        </text>
        <g transform="translate(0,10) scale(0.35)">
          <PleatFabric count={6} startX={40} y={40} width={300} height={120} showLabels={false} />
          <CableThreadPath startX={40} midY={100} pleatW={50} count={6} />
        </g>

        {/* Back */}
        <text x={300} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Back
        </text>
        <g transform="translate(200,30)">
          <rect x={0} y={0} width={180} height={90} rx={4} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          {/* Short traveling stitches on reverse */}
          {[20, 50, 80, 110, 140].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={40 + (i % 2) * 8}
              x2={x + 22}
              y2={48 - (i % 2) * 8}
              stroke={ILLUSTRATION.thread}
              strokeWidth="2"
              opacity="0.7"
            />
          ))}
          <text x={90} y={110} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted}>
            Short carries between mountains
          </text>
        </g>

        {/* Cross-section */}
        <text x={500} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Cross-section
        </text>
        <g transform="translate(410,40)">
          {/* Pleat folds as U shapes */}
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
          {/* Thread catching top third */}
          <path
            d="M 5 28 L 25 28 L 35 38 L 55 28 L 65 38 L 85 28"
            fill="none"
            stroke={ILLUSTRATION.thread}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <text x={50} y={95} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkMuted}>
            Needle takes top ⅓ of each fold
          </text>
        </g>

        <line x1={200} y1={20} x2={200} y2={150} stroke={ILLUSTRATION.creamDeeper} />
        <line x1={400} y1={20} x2={400} y2={150} stroke={ILLUSTRATION.creamDeeper} />

        {/* Tension note */}
        <text x={300} y={200} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted}>
          The cable rides on the surface of the mountains; deep valley stitches flatten pleats.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
