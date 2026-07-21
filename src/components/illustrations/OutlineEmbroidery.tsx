"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { Needle, DirectionArrow } from "@/components/illustrations/Needle";

const OUTLINE_POINTS = [
  { x: 104, y: 168 },
  { x: 154, y: 140 },
  { x: 206, y: 128 },
  { x: 260, y: 134 },
  { x: 314, y: 112 },
  { x: 370, y: 122 },
  { x: 424, y: 98 },
  { x: 492, y: 104 },
] as const;

const OUTLINE_STEPS = [
  {
    title: "Trace a flat surface line",
    body: "Outline embroidery is worked on flat fabric, not across smocking pleats. Begin with a smooth traced line.",
    pathStep: 1,
  },
  {
    title: "Bring the thread below the needle",
    body: "Working left to right, keep the working thread below the needle. The side rule is what makes the cord smooth.",
    pathStep: 2,
  },
  {
    title: "Insert ahead and emerge halfway back",
    body: "Take a short forward bite on the line, then bring the needle up halfway back beside the last stitch.",
    pathStep: 3,
  },
  {
    title: "Repeat without switching sides",
    body: "Keep the thread below the needle every time. Switching sides creates a kink and changes the cord direction.",
    pathStep: 5,
  },
  {
    title: "Shorten stitches on curves",
    body: "A curve stays round when each stitch is short enough for the line. Long bites make outline stitch look angular.",
    pathStep: 7,
  },
] as const;

function outlineCurvePath() {
  return `M ${OUTLINE_POINTS[0].x} ${OUTLINE_POINTS[0].y}
    C 150 132, 196 126, 238 132
    C 282 140, 306 100, 350 116
    C 390 132, 414 90, 492 104`;
}

function OutlineGuide({ showLabels = true }: { showLabels?: boolean }) {
  return (
    <g>
      <path d={outlineCurvePath()} fill="none" stroke={ILLUSTRATION.dustyBlue} strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.dustyBlue} fontFamily="var(--font-body), sans-serif">
          <text x="108" y="190">flat traced line</text>
          <text x="334" y="154">working thread stays below needle</text>
        </g>
      )}
    </g>
  );
}

function OutlineSegment({
  index,
  color = ILLUSTRATION.thread,
  opacity = 1,
  strokeWidth = 3,
  side = "below",
}: {
  index: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  side?: "below" | "above";
}) {
  const a = OUTLINE_POINTS[index];
  const b = OUTLINE_POINTS[index + 1];
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2 + (side === "below" ? 9 : -9);

  return (
    <path
      d={`M ${a.x} ${a.y} C ${midX} ${midY}, ${midX} ${midY}, ${b.x} ${b.y}`}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

function OutlineLine({
  count = OUTLINE_POINTS.length - 1,
  active = -1,
  color = ILLUSTRATION.thread,
}: {
  count?: number;
  active?: number;
  color?: string;
}) {
  return (
    <g>
      {OUTLINE_POINTS.slice(0, count).map((_, index) => (
        <OutlineSegment
          key={index}
          index={index}
          color={index === active ? ILLUSTRATION.gold : color}
          opacity={active === -1 || index === active ? 1 : 0.38}
          strokeWidth={index === active ? 3.8 : 3}
        />
      ))}
    </g>
  );
}

export function FinishedOutlineEmbroideryAppearance() {
  return (
    <IllustrationFrame caption="Finished outline embroidery - a smooth cord follows a traced line on flat fabric.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished outline embroidery stitch">
        <FlatFabric x={46} y={34} width={508} height={210} />
        <OutlineGuide />
        <OutlineLine />
        <text x="300" y="264" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          This surface outline stitch is flat-fabric embroidery; it is not the outline stitch worked across pleats.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function OutlineEmbroideryNeedlePath({ showLabels = true, step = 4 }: { showLabels?: boolean; step?: number }) {
  const visible = Math.min(Math.max(step, 1), OUTLINE_POINTS.length - 1);
  const activeIndex = visible - 1;
  const activeA = OUTLINE_POINTS[activeIndex];
  const activeB = OUTLINE_POINTS[activeIndex + 1];
  const emergeX = (activeA.x + activeB.x) / 2;
  const emergeY = (activeA.y + activeB.y) / 2 + 9;

  return (
    <SvgRoot viewBox="0 0 600 285" aria-label="Outline embroidery needle path">
      <FlatFabric x={46} y={34} width={508} height={214} />
      <OutlineGuide showLabels={showLabels} />
      <OutlineLine count={visible} active={activeIndex} />
      <DirectionArrow x1={activeA.x} y1={activeA.y - 18} x2={activeB.x} y2={activeB.y - 18} color={ILLUSTRATION.burgundy} label="needle moves forward" />
      <DirectionArrow x1={activeB.x - 2} y1={activeB.y + 2} x2={emergeX} y2={emergeY} color={ILLUSTRATION.dustyBlue} label="emerge halfway back" />
      <path
        d={`M ${activeA.x + 2} ${activeA.y + 22} C ${emergeX - 10} ${emergeY + 32}, ${activeB.x - 12} ${
          activeB.y + 32
        }, ${activeB.x} ${activeB.y + 14}`}
        fill="none"
        stroke={ILLUSTRATION.sage}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Needle x={activeB.x - 44} y={activeB.y - 30} angle={18} length={62} label="thread below" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x="300" y="24" textAnchor="middle">
            Gold = active outline stitch; green working thread stays below the needle when moving left to right.
          </text>
          <text x="300" y="268" textAnchor="middle">
            Step {visible}: insert ahead, emerge halfway back, and keep the thread below.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

export function OutlineEmbroideryConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= OUTLINE_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2400);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = OUTLINE_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${OUTLINE_STEPS.length}: ${current.title}`}
      controls={
        <>
          <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setStep((value) => Math.max(0, value - 1))}>
            Previous
          </button>
          <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setStep((value) => Math.min(OUTLINE_STEPS.length - 1, value + 1))}>
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= OUTLINE_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
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
      <OutlineEmbroideryNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{current.body}</p>
    </IllustrationFrame>
  );
}

function OutlineTensionSample({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "loose" | "balanced" | "tight" | "switched";
}) {
  const color = kind === "balanced" ? ILLUSTRATION.thread : ILLUSTRATION.burgundy;

  return (
    <g transform={`translate(${x} 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="16" width="140" height="108" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      <path d="M 18 78 C 42 50, 76 54, 122 42" fill="none" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.4" />
      {[0, 1, 2, 3].map((i) => {
        const x1 = 18 + i * 25;
        const y1 = 78 - i * 9;
        const x2 = x1 + 30;
        const y2 = y1 - 10 + (kind === "switched" && i === 2 ? 18 : 0);
        const side = kind === "switched" && i === 2 ? -8 : 8;
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} C ${x1 + 12} ${y1 + side}, ${x2 - 10} ${y2 + side}, ${x2} ${y2}`}
            fill="none"
            stroke={color}
            strokeWidth={kind === "tight" ? 4.5 : kind === "loose" ? 2.1 : 3}
            strokeLinecap="round"
            opacity={kind === "loose" ? 0.72 : 1}
          />
        );
      })}
      {kind === "tight" && <path d="M 28 102 C 54 88, 88 86, 114 100" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.55" />}
      {kind === "switched" && <circle cx="86" cy="57" r="12" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.2" />}
    </g>
  );
}

export function OutlineEmbroideryTensionDiagram() {
  return (
    <IllustrationFrame caption="Outline embroidery tension - a smooth cord needs light pull, short bites, and a consistent below-needle thread side.">
      <SvgRoot viewBox="0 0 640 165" aria-label="Outline embroidery tension examples">
        <OutlineTensionSample x={0} title="Too loose" kind="loose" />
        <OutlineTensionSample x={160} title="Balanced" kind="balanced" />
        <OutlineTensionSample x={320} title="Too tight" kind="tight" />
        <OutlineTensionSample x={480} title="Side switched" kind="switched" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function OutlineEmbroideryMistakeDiagrams() {
  const mistakes = [
    { title: "Worked across pleats", note: "That is smocking outline stitch, not this flat surface stitch.", kind: "pleats" },
    { title: "Thread above needle", note: "The cord mirrors into stem-style placement instead of outline placement.", kind: "stem" },
    { title: "Side switches", note: "One inconsistent stitch creates a visible kink in the cord.", kind: "switch" },
    { title: "Stitches too long", note: "Long bites make curves angular and weak.", kind: "long" },
  ] as const;

  return (
    <IllustrationFrame caption="Common outline embroidery mistakes - keep it flat, below the needle, and consistent.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="12" width="200" height="82" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <path d="M 28 74 C 70 38, 112 58, 182 42" fill="none" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
              {mistake.kind === "pleats" && (
                <>
                  {[40, 68, 96, 124, 152, 180].map((x) => (
                    <path key={x} d={`M ${x} 22 C ${x + 7} 44, ${x + 7} 70, ${x} 92`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="3" opacity="0.6" />
                  ))}
                  <path d="M 36 68 Q 52 78 68 68 Q 84 58 100 68 Q 116 78 132 68 Q 148 58 164 68" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                </>
              )}
              {mistake.kind === "stem" && (
                <>
                  <path d="M 28 74 C 70 30, 112 52, 182 36" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />
                  <text x="110" y="105" textAnchor="middle" fontSize="9" fill={ILLUSTRATION.burgundy} fontFamily="var(--font-body), sans-serif">
                    above-side mirror
                  </text>
                </>
              )}
              {mistake.kind === "switch" && (
                <>
                  <path d="M 28 74 C 50 84, 62 58, 78 62 C 94 78, 112 42, 128 58 C 144 46, 158 38, 182 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />
                  <circle cx="112" cy="58" r="11" fill="none" stroke={ILLUSTRATION.burgundy} />
                </>
              )}
              {mistake.kind === "long" && (
                <path d="M 28 74 L 84 50 L 132 58 L 182 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.2" strokeLinecap="round" />
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

export function OutlineEmbroideryWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="With smocking - use outline embroidery as a flat motif cord beside smocking; use the smocking outline chapter for pleats.">
      <SvgRoot viewBox="0 0 620 235" aria-label="Outline embroidery beside smocking">
        <FlatFabric x={24} y={28} width={572} height={160} />
        <g transform="translate(42 28)">
          {[24, 52, 80, 108, 136, 164, 192].map((x) => (
            <path key={x} d={`M ${x} 22 C ${x + 7} 62, ${x + 7} 100, ${x} 138`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="4" strokeLinecap="round" opacity="0.55" />
          ))}
          <path d="M 28 64 Q 44 76 60 64 Q 76 52 92 64 Q 108 76 124 64 Q 140 52 156 64 Q 172 76 188 64" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" />
          <text x="106" y="178" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            smocking outline: across pleats
          </text>
        </g>
        <g transform="translate(64 22)">
          <OutlineLine color={ILLUSTRATION.sage} />
        </g>
        <DirectionArrow x1={272} y1={112} x2={340} y2={112} color={ILLUSTRATION.dustyBlue} label="separate uses" />
        <text x="446" y="206" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          outline embroidery: flat fabric, thread below needle
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function OutlineEmbroideryTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why outline embroidery works - repeated below-needle thread placement stacks overlaps into one smooth surface cord.">
      <SvgRoot viewBox="0 0 620 245" aria-label="Outline embroidery theory">
        <FlatFabric x={38} y={28} width={544} height={148} />
        <OutlineGuide />
        <OutlineLine color={ILLUSTRATION.gold} />
        <DirectionArrow x1={248} y1={142} x2={304} y2={120} color={ILLUSTRATION.burgundy} label="overlap" />
        <DirectionArrow x1={362} y1={154} x2={414} y2={130} color={ILLUSTRATION.dustyBlue} label="thread below" />
        <rect x="82" y="194" width="456" height="28" rx="14" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
        <text x="310" y="213" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Outline embroidery is the flat-fabric cord whose side rule mirrors stem embroidery.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
