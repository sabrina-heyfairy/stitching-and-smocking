"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { Needle, DirectionArrow } from "@/components/illustrations/Needle";

const EDGE_Y = 178;
const STITCH_Y = 106;

const BLANKET_POINTS = [92, 146, 200, 254, 308, 362, 416, 470] as const;

const BLANKET_STEPS = [
  {
    title: "Bring the thread up on the edge",
    body: "Start on the edge line where the baseline will form. This edge line may be a hem fold, applique edge, or felt motif edge.",
    pathStep: 1,
  },
  {
    title: "Insert at the stitch height",
    body: "Take the needle down into the fabric above the edge. The distance from edge to insertion sets the height of the upright leg.",
    pathStep: 2,
  },
  {
    title: "Come up on the edge through the loop",
    body: "Bring the needle up on the edge line at the next spacing mark, keeping the working thread under the needle so the loop is caught.",
    pathStep: 3,
  },
  {
    title: "Settle the loop into an L shape",
    body: "Pull gently until the thread forms a vertical leg and a baseline along the edge. Do not cinch the edge into a pucker.",
    pathStep: 4,
  },
  {
    title: "Repeat evenly along the edge",
    body: "Each new stitch shares the edge baseline and adds one upright leg. Keep height, spacing, and loop tension consistent.",
    pathStep: 7,
  },
] as const;

function BlanketGuide({ showLabels = true }: { showLabels?: boolean }) {
  return (
    <g>
      <line x1="72" y1={EDGE_Y} x2="500" y2={EDGE_Y} stroke={ILLUSTRATION.dustyBlue} strokeWidth="1.2" strokeDasharray="5 5" opacity="0.55" />
      <line x1="72" y1={STITCH_Y} x2="500" y2={STITCH_Y} stroke={ILLUSTRATION.dustyBlue} strokeWidth="1" strokeDasharray="4 6" opacity="0.28" />
      <path d={`M 70 ${EDGE_Y + 12} H 502`} stroke={ILLUSTRATION.fabricShadow} strokeWidth="8" strokeLinecap="round" opacity="0.45" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.dustyBlue} fontFamily="var(--font-body), sans-serif">
          <text x="76" y={EDGE_Y + 28}>edge line / hem fold</text>
          <text x="372" y={STITCH_Y - 10}>stitch height</text>
        </g>
      )}
    </g>
  );
}

function BlanketSegments({
  count = BLANKET_POINTS.length - 1,
  active = -1,
  color = ILLUSTRATION.thread,
}: {
  count?: number;
  active?: number;
  color?: string;
}) {
  return (
    <g>
      {BLANKET_POINTS.slice(0, count).map((x, index) => {
        const nextX = BLANKET_POINTS[index + 1];
        return (
          <path
            key={x}
            d={`M ${x} ${STITCH_Y} L ${x} ${EDGE_Y} L ${nextX} ${EDGE_Y}`}
            fill="none"
            stroke={index === active ? ILLUSTRATION.gold : color}
            strokeWidth={index === active ? 4 : 3.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={active === -1 || index === active ? 1 : 0.38}
          />
        );
      })}
      {count >= BLANKET_POINTS.length - 1 && (
        <line x1={BLANKET_POINTS[BLANKET_POINTS.length - 1]} y1={EDGE_Y} x2="492" y2={EDGE_Y} stroke={color} strokeWidth="3.1" strokeLinecap="round" />
      )}
    </g>
  );
}

export function FinishedBlanketStitchAppearance() {
  return (
    <IllustrationFrame caption="Finished blanket stitch - upright legs are caught by a continuous baseline along the edge.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished blanket stitch embroidery on a fabric edge">
        <FlatFabric x={48} y={34} width={504} height={210} />
        <BlanketGuide />
        <BlanketSegments />
        <text x="300" y="264" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          The needle catches each loop on the edge so the line has both upright legs and a firm baseline.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BlanketStitchNeedlePath({ showLabels = true, step = 4 }: { showLabels?: boolean; step?: number }) {
  const visible = Math.min(Math.max(step, 1), BLANKET_POINTS.length - 1);
  const activeIndex = visible - 1;
  const x = BLANKET_POINTS[activeIndex];
  const nextX = BLANKET_POINTS[activeIndex + 1];

  return (
    <SvgRoot viewBox="0 0 600 285" aria-label="Blanket stitch needle path">
      <FlatFabric x={48} y={34} width={504} height={214} />
      <BlanketGuide showLabels={showLabels} />
      <BlanketSegments count={visible} active={activeIndex} />
      <path
        d={`M ${x - 2} ${EDGE_Y + 10} C ${x + 20} ${EDGE_Y + 44}, ${nextX - 20} ${EDGE_Y + 44}, ${nextX} ${EDGE_Y + 10}`}
        fill="none"
        stroke={ILLUSTRATION.sage}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 3"
      />
      <DirectionArrow x1={x - 24} y1={EDGE_Y + 18} x2={x} y2={EDGE_Y + 1} color={ILLUSTRATION.dustyBlue} label="up on edge" />
      <DirectionArrow x1={x} y1={EDGE_Y - 8} x2={x} y2={STITCH_Y + 4} color={ILLUSTRATION.burgundy} label="down at height" />
      <DirectionArrow x1={x + 12} y1={EDGE_Y + 16} x2={nextX - 2} y2={EDGE_Y + 2} color={ILLUSTRATION.dustyBlue} label="up catching loop" />
      <Needle x={nextX - 34} y={EDGE_Y - 34} angle={72} length={62} label="thread under point" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x="300" y="24" textAnchor="middle">
            Gold = active blanket stitch; keep the loop under the needle as it emerges on the edge.
          </text>
          <text x="300" y="270" textAnchor="middle">
            Step {visible}: up on edge, down at height, up on edge again to catch the loop.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

export function BlanketStitchConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= BLANKET_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2400);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = BLANKET_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${BLANKET_STEPS.length}: ${current.title}`}
      controls={
        <>
          <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setStep((value) => Math.max(0, value - 1))}>
            Previous
          </button>
          <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setStep((value) => Math.min(BLANKET_STEPS.length - 1, value + 1))}>
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= BLANKET_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{BLANKET_STEPS.length}
          </span>
        </>
      }
    >
      <BlanketStitchNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{current.body}</p>
    </IllustrationFrame>
  );
}

function BlanketTensionSample({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "loose" | "balanced" | "tight" | "uneven";
}) {
  const color = kind === "balanced" ? ILLUSTRATION.thread : ILLUSTRATION.burgundy;

  return (
    <g transform={`translate(${x} 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="16" width="140" height="108" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      <line x1="14" y1="92" x2="126" y2="92" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
      {[22, 50, 78, 106].map((legX, index) => {
        const top = kind === "uneven" && index === 1 ? 42 : kind === "uneven" && index === 2 ? 68 : 52;
        const baseY = kind === "loose" ? 96 + (index % 2) * 4 : 92;
        return (
          <path
            key={legX}
            d={`M ${legX} ${top} L ${legX} ${baseY} L ${Math.min(126, legX + 28)} ${baseY}`}
            fill="none"
            stroke={color}
            strokeWidth={kind === "tight" ? 4.5 : kind === "loose" ? 2.4 : 3}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={kind === "loose" ? 0.75 : 1}
          />
        );
      })}
      {kind === "tight" && <path d="M 22 105 C 50 94, 88 94, 118 105" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.55" />}
    </g>
  );
}

export function BlanketStitchTensionDiagram() {
  return (
    <IllustrationFrame caption="Blanket stitch tension - the edge baseline should sit firm while the fabric edge remains smooth.">
      <SvgRoot viewBox="0 0 640 165" aria-label="Blanket stitch tension examples">
        <BlanketTensionSample x={0} title="Too loose" kind="loose" />
        <BlanketTensionSample x={160} title="Balanced" kind="balanced" />
        <BlanketTensionSample x={320} title="Too tight" kind="tight" />
        <BlanketTensionSample x={480} title="Uneven" kind="uneven" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BlanketStitchMistakeDiagrams() {
  const mistakes = [
    { title: "Loop not caught", note: "The baseline floats away because the needle missed the loop.", kind: "miss" },
    { title: "Legs lean", note: "Spacing shifts or the needle exits off the edge line.", kind: "lean" },
    { title: "Pulled edge", note: "Tension cinches the hem or applique edge into scallops.", kind: "tight" },
    { title: "Heights vary", note: "Inconsistent insertion height makes the border uneven.", kind: "height" },
  ] as const;

  return (
    <IllustrationFrame caption="Common blanket stitch mistakes - catch the loop, keep the edge line straight, and match the height.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="12" width="200" height="82" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <line x1="24" y1="82" x2="196" y2="82" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
              {mistake.kind === "miss" && (
                <>
                  <path d="M 42 40 L 42 82 L 82 82 M 92 40 L 92 82" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />
                  <path d="M 98 92 C 124 112, 164 108, 186 88" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" />
                </>
              )}
              {mistake.kind === "lean" && (
                <path d="M 40 42 L 54 82 L 92 82 M 88 42 L 100 82 L 136 82 M 142 42 L 130 82 L 176 82" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {mistake.kind === "tight" && (
                <>
                  <path d="M 36 40 L 36 82 L 78 82 M 78 40 L 78 82 L 120 82 M 120 40 L 120 82 L 166 82" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M 30 96 C 62 80, 104 104, 150 86 C 168 80, 184 86, 194 96" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.5" />
                </>
              )}
              {mistake.kind === "height" && (
                <path d="M 38 34 L 38 82 L 80 82 M 80 58 L 80 82 L 122 82 M 122 28 L 122 82 L 164 82 M 164 50 L 164 82 L 190 82" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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

export function BlanketStitchWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="With smocking - blanket stitch finishes hems, applique edges, and felt motifs near smocked garments without crossing pleats.">
      <SvgRoot viewBox="0 0 620 235" aria-label="Blanket stitch used with smocking">
        <FlatFabric x={24} y={28} width={572} height={160} />
        {[58, 86, 114, 142, 170, 198, 226].map((x) => (
          <path key={x} d={`M ${x} 48 C ${x + 7} 82, ${x + 7} 122, ${x} 158`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        ))}
        <path d="M 60 84 Q 74 96 88 84 Q 102 72 116 84 Q 130 96 144 84 Q 158 72 172 84 Q 186 96 200 84" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" />
        <rect x="298" y="66" width="182" height="92" rx="12" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} strokeWidth="1.2" />
        <g transform="translate(236 -10)">
          <BlanketSegments count={5} color={ILLUSTRATION.sage} />
        </g>
        <text x="144" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          smocked panel
        </text>
        <text x="392" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          blanket stitch around applique edge
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BlanketStitchTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why blanket stitch works - the caught loop converts one needle motion into both an upright leg and an edge baseline.">
      <SvgRoot viewBox="0 0 620 245" aria-label="Blanket stitch theory diagram">
        <FlatFabric x={38} y={28} width={544} height={150} />
        <BlanketGuide />
        <BlanketSegments color={ILLUSTRATION.gold} />
        <DirectionArrow x1={170} y1={120} x2={170} y2={176} color={ILLUSTRATION.burgundy} label="upright leg" />
        <DirectionArrow x1={206} y1={194} x2={258} y2={194} color={ILLUSTRATION.dustyBlue} label="caught baseline" />
        <rect x="88" y="194" width="444" height="28" rx="14" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
        <text x="310" y="213" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          The edge exit catches the loop before it tightens, locking a vertical leg into a stable border.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
