"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { Needle, DirectionArrow } from "@/components/illustrations/Needle";

const BACK_POINTS = [
  { x: 100, y: 168 },
  { x: 146, y: 142 },
  { x: 194, y: 132 },
  { x: 244, y: 140 },
  { x: 294, y: 122 },
  { x: 344, y: 118 },
  { x: 394, y: 136 },
  { x: 444, y: 112 },
  { x: 498, y: 118 },
] as const;

const BACK_STEPS = [
  {
    title: "Mark the line",
    body: "Back stitch follows a drawn line with short straight segments. The shorter the segment, the smoother the curve.",
    pathStep: 1,
  },
  {
    title: "Come up one stitch ahead",
    body: "Bring the needle up at the next hole rather than at the previous hole. This forward emergence sets up the backward motion.",
    pathStep: 2,
  },
  {
    title: "Stitch backward",
    body: "Insert the needle back into the previous hole. This is the defining rule: backward into the last hole for an unbroken line.",
    pathStep: 3,
  },
  {
    title: "Advance under the fabric",
    body: "Travel on the back to the next open hole, then repeat the backward stitch on the surface.",
    pathStep: 5,
  },
  {
    title: "Keep holes shared",
    body: "Each segment touches the previous one at a shared hole so the front reads as a solid drawn line.",
    pathStep: 8,
  },
] as const;

function BackGuide({ showLabels = true }: { showLabels?: boolean }) {
  const d = `M ${BACK_POINTS[0].x} ${BACK_POINTS[0].y}
    C 150 130, 206 132, 244 140
    C 294 150, 316 98, 394 136
    C 438 158, 450 100, 498 118`;

  return (
    <g>
      <path d={d} fill="none" stroke={ILLUSTRATION.dustyBlue} strokeWidth="1.1" strokeDasharray="5 5" opacity="0.5" />
      {showLabels && (
        <text x="104" y="190" fontSize="10" fill={ILLUSTRATION.dustyBlue} fontFamily="var(--font-body), sans-serif">
          traced line
        </text>
      )}
    </g>
  );
}

function BackSegments({
  count = BACK_POINTS.length - 1,
  active = -1,
  color = ILLUSTRATION.thread,
}: {
  count?: number;
  active?: number;
  color?: string;
}) {
  return (
    <g>
      {BACK_POINTS.slice(0, count).map((point, index) => {
        const next = BACK_POINTS[index + 1];
        return (
          <g key={index}>
            <line
              x1={point.x}
              y1={point.y}
              x2={next.x}
              y2={next.y}
              stroke={index === active ? ILLUSTRATION.gold : color}
              strokeWidth={index === active ? 4.3 : 3.4}
              strokeLinecap="round"
              opacity={active === -1 || index === active ? 1 : 0.38}
            />
            <circle cx={point.x} cy={point.y} r="3" fill={index === active ? ILLUSTRATION.gold : color} opacity="0.8" />
            {index === count - 1 && <circle cx={next.x} cy={next.y} r="3" fill={index === active ? ILLUSTRATION.gold : color} opacity="0.8" />}
          </g>
        );
      })}
    </g>
  );
}

export function FinishedBackStitchAppearance() {
  return (
    <IllustrationFrame caption="Finished back stitch - short joined segments make a crisp solid line on flat fabric.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished back stitch on flat fabric">
        <FlatFabric x={48} y={34} width={504} height={210} />
        <BackGuide />
        <BackSegments />
        <text x="300" y="264" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Each surface stitch enters the previous hole, so no gaps appear between segments.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BackStitchNeedlePath({ showLabels = true, step = 4 }: { showLabels?: boolean; step?: number }) {
  const visible = Math.min(Math.max(step, 1), BACK_POINTS.length - 1);
  const activeIndex = visible - 1;
  const previous = BACK_POINTS[activeIndex];
  const ahead = BACK_POINTS[activeIndex + 1];
  const nextAhead = BACK_POINTS[Math.min(activeIndex + 2, BACK_POINTS.length - 1)];

  return (
    <SvgRoot viewBox="0 0 600 285" aria-label="Back stitch needle path">
      <FlatFabric x={48} y={34} width={504} height={214} />
      <BackGuide showLabels={showLabels} />
      <BackSegments count={visible} active={activeIndex} />
      <DirectionArrow
        x1={ahead.x}
        y1={ahead.y - 16}
        x2={previous.x}
        y2={previous.y - 16}
        color={ILLUSTRATION.burgundy}
        label="stitch backward"
      />
      <DirectionArrow
        x1={ahead.x + 6}
        y1={ahead.y + 18}
        x2={nextAhead.x}
        y2={nextAhead.y + 18}
        color={ILLUSTRATION.dustyBlue}
        label="advance on back"
      />
      <path
        d={`M ${ahead.x} ${ahead.y + 15} C ${(ahead.x + nextAhead.x) / 2} ${ahead.y + 44}, ${
          (ahead.x + nextAhead.x) / 2
        } ${nextAhead.y + 44}, ${nextAhead.x} ${nextAhead.y + 15}`}
        fill="none"
        stroke={ILLUSTRATION.sage}
        strokeWidth="1.7"
        strokeDasharray="4 3"
        strokeLinecap="round"
      />
      <Needle x={ahead.x - 58} y={ahead.y - 40} angle={168} length={64} label="into previous hole" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x="300" y="24" textAnchor="middle">
            Gold = active stitch; burgundy arrow shows the backward surface motion.
          </text>
          <text x="300" y="268" textAnchor="middle">
            Step {visible}: come up ahead, insert back into the last hole, advance underneath.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

export function BackStitchConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= BACK_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2400);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = BACK_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${BACK_STEPS.length}: ${current.title}`}
      controls={
        <>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setStep((value) => Math.max(0, value - 1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setStep((value) => Math.min(BACK_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= BACK_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{BACK_STEPS.length}
          </span>
        </>
      }
    >
      <BackStitchNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{current.body}</p>
    </IllustrationFrame>
  );
}

function BackTensionSample({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "gap" | "balanced" | "tight" | "long";
}) {
  const points = [
    { x: 18, y: 78 },
    { x: 44, y: 58 },
    { x: 72, y: 60 },
    { x: 100, y: 44 },
    { x: 124, y: 52 },
  ];

  return (
    <g transform={`translate(${x} 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="16" width="140" height="108" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      {points.slice(0, -1).map((point, i) => {
        const next = points[i + 1];
        const shrink = kind === "gap" ? 5 : 0;
        return (
          <line
            key={i}
            x1={point.x + shrink}
            y1={point.y}
            x2={next.x - shrink}
            y2={next.y}
            stroke={kind === "balanced" ? ILLUSTRATION.thread : ILLUSTRATION.burgundy}
            strokeWidth={kind === "tight" ? 4.8 : kind === "long" ? 3 : 3.2}
            strokeLinecap="round"
          />
        );
      })}
      {kind === "tight" && <path d="M 20 102 C 50 88, 88 88, 118 102" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.5" />}
      {kind === "long" && <line x1="22" y1="88" x2="126" y2="34" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.45" />}
    </g>
  );
}

export function BackStitchTensionDiagram() {
  return (
    <IllustrationFrame caption="Back stitch tension - joined segments need shared holes and enough slack to avoid puckering.">
      <SvgRoot viewBox="0 0 640 165" aria-label="Back stitch tension examples">
        <BackTensionSample x={0} title="Gapped" kind="gap" />
        <BackTensionSample x={160} title="Balanced" kind="balanced" />
        <BackTensionSample x={320} title="Too tight" kind="tight" />
        <BackTensionSample x={480} title="Too long" kind="long" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BackStitchMistakeDiagrams() {
  const mistakes = [
    { title: "Not into last hole", note: "Tiny gaps break the drawn-line effect.", kind: "gap" },
    { title: "Segments too long", note: "A curve becomes angular and loose.", kind: "long" },
    { title: "Forward stitch habit", note: "Running stitch leaves spaces instead of a solid line.", kind: "forward" },
    { title: "Tension puckers", note: "The fabric ripples along the outline.", kind: "tight" },
  ] as const;

  return (
    <IllustrationFrame caption="Common back stitch mistakes - the backward shared-hole rule prevents most problems.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="12" width="200" height="82" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <path d="M 28 74 C 64 42, 104 58, 182 42" fill="none" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
              {mistake.kind === "gap" &&
                [
                  [30, 72, 58, 54],
                  [68, 52, 96, 58],
                  [108, 58, 136, 46],
                  [148, 44, 178, 42],
                ].map(([x1, y1, x2, y2], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />)}
              {mistake.kind === "long" && <path d="M 28 74 L 82 48 L 132 58 L 182 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.2" strokeLinecap="round" />}
              {mistake.kind === "forward" && (
                <path d="M 30 74 L 54 56 M 76 52 L 100 58 M 122 56 L 146 48 M 166 44 L 188 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.2" strokeLinecap="round" />
              )}
              {mistake.kind === "tight" && (
                <>
                  <path d="M 28 74 C 64 42, 104 58, 182 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 36 92 C 74 78, 132 82, 172 90" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.55" />
                </>
              )}
            </SvgRoot>
            <p className="mt-1 font-serif text-base text-ink">{mistake.title}</p>
            <p className="text-sm text-ink-muted">{mistake.note}</p>
          </div>
        ))}
      </div>
    </IllustrationFrame>
  );
}

export function BackStitchWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="With smocking - back stitch is a flat embroidered outline for motifs, lettering, and edges beside a smocked panel.">
      <SvgRoot viewBox="0 0 620 230" aria-label="Back stitch used with smocking">
        <FlatFabric x={24} y={28} width={572} height={160} />
        {[58, 86, 114, 142, 170, 198, 226].map((x) => (
          <path key={x} d={`M ${x} 48 C ${x + 7} 82, ${x + 7} 122, ${x} 158`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        ))}
        <path d="M 60 84 Q 74 96 88 84 Q 102 72 116 84 Q 130 96 144 84 Q 158 72 172 84 Q 186 96 200 84" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" />
        <g transform="translate(110 -8)">
          <BackSegments color={ILLUSTRATION.sage} />
        </g>
        <text x="144" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          smocked texture
        </text>
        <text x="436" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          back stitch outlines a flat motif
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BackStitchTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why back stitch works - the front line is continuous because each stitch shares the previous endpoint.">
      <SvgRoot viewBox="0 0 620 245" aria-label="Back stitch theory diagram">
        <FlatFabric x={38} y={28} width={544} height={150} />
        <BackGuide />
        <BackSegments color={ILLUSTRATION.gold} />
        <DirectionArrow x1={270} y1={100} x2={224} y2={116} color={ILLUSTRATION.burgundy} label="backward on front" />
        <DirectionArrow x1={294} y1={148} x2={344} y2={144} color={ILLUSTRATION.dustyBlue} label="forward on back" />
        <rect x="96" y="194" width="428" height="28" rx="14" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
        <text x="310" y="213" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Back stitch trades a longer back carry for an unbroken, controlled surface line.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
