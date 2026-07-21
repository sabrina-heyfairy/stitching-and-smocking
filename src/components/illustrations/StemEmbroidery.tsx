"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { Needle, DirectionArrow } from "@/components/illustrations/Needle";

const STEM_POINTS = [
  { x: 112, y: 172 },
  { x: 160, y: 138 },
  { x: 212, y: 120 },
  { x: 266, y: 126 },
  { x: 320, y: 104 },
  { x: 374, y: 118 },
  { x: 426, y: 92 },
  { x: 488, y: 96 },
] as const;

const STEM_STEPS = [
  {
    title: "Draw the surface line",
    body: "Work on flat fabric over a traced stem or curve. This is surface embroidery, not a pleat-to-pleat smocking row.",
    pathStep: 1,
  },
  {
    title: "Bring the thread to one side",
    body: "Lay the working thread consistently below the needle when working left-to-right. Left-handed or mirrored work may reverse the side, but it must stay consistent.",
    pathStep: 2,
  },
  {
    title: "Take a short forward bite",
    body: "Insert ahead on the line and emerge halfway back beside the previous stitch. The new stitch overlaps just enough to make a rope.",
    pathStep: 3,
  },
  {
    title: "Repeat the same-side rule",
    body: "Every new bite keeps the thread on the same side. One reversal creates a kink that is very visible in stem stitch.",
    pathStep: 5,
  },
  {
    title: "Follow the curve smoothly",
    body: "Shorter stitches round curves better. Keep the surface line even and avoid digging deeply into the fabric.",
    pathStep: 7,
  },
] as const;

function stemCurvePath() {
  return `M ${STEM_POINTS[0].x} ${STEM_POINTS[0].y}
    C 150 132, 190 122, 230 126
    C 274 130, 300 96, 340 108
    C 380 120, 410 86, 488 96`;
}

function StemSegment({
  index,
  color = ILLUSTRATION.thread,
  opacity = 1,
  strokeWidth = 3,
}: {
  index: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  const a = STEM_POINTS[index];
  const b = STEM_POINTS[index + 1];
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2 + 8;

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

function StemSurfaceGuide({ showLabels = true }: { showLabels?: boolean }) {
  return (
    <g>
      <path
        d={stemCurvePath()}
        fill="none"
        stroke={ILLUSTRATION.dustyBlue}
        strokeWidth="1.2"
        strokeDasharray="5 5"
        opacity="0.5"
      />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.dustyBlue} fontFamily="var(--font-body), sans-serif">
          <text x="116" y="190">traced surface line</text>
          <text x="366" y="152">thread stays below needle</text>
        </g>
      )}
    </g>
  );
}

export function FinishedStemEmbroideryAppearance() {
  return (
    <IllustrationFrame caption="Finished surface stem stitch - a raised rope follows a traced line on flat fabric.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished surface stem embroidery stitch">
        <FlatFabric x={46} y={34} width={508} height={210} />
        <StemSurfaceGuide />
        {STEM_POINTS.slice(0, -1).map((_, index) => (
          <StemSegment key={index} index={index} />
        ))}
        <text
          x="300"
          y="264"
          textAnchor="middle"
          fontSize="11"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          Surface stem embroidery is worked on flat fabric; it is not the across-pleats smocking stitch.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function StemEmbroideryNeedlePath({ showLabels = true, step = 4 }: { showLabels?: boolean; step?: number }) {
  const visible = Math.min(Math.max(step, 1), STEM_POINTS.length - 1);
  const activeIndex = visible - 1;
  const activeA = STEM_POINTS[activeIndex];
  const activeB = STEM_POINTS[activeIndex + 1];
  const emergeX = (activeA.x + activeB.x) / 2;
  const emergeY = (activeA.y + activeB.y) / 2 + 8;

  return (
    <SvgRoot viewBox="0 0 600 285" aria-label="Surface stem stitch needle path">
      <FlatFabric x={46} y={34} width={508} height={214} />
      <StemSurfaceGuide showLabels={showLabels} />
      {STEM_POINTS.slice(0, visible).map((_, index) => (
        <StemSegment
          key={index}
          index={index}
          color={index === activeIndex ? ILLUSTRATION.gold : ILLUSTRATION.thread}
          opacity={index === activeIndex ? 1 : 0.35}
          strokeWidth={index === activeIndex ? 3.8 : 2.8}
        />
      ))}
      <DirectionArrow
        x1={activeA.x}
        y1={activeA.y - 16}
        x2={activeB.x}
        y2={activeB.y - 16}
        color={ILLUSTRATION.burgundy}
        label="needle moves forward"
      />
      <DirectionArrow
        x1={activeB.x - 4}
        y1={activeB.y}
        x2={emergeX}
        y2={emergeY}
        color={ILLUSTRATION.dustyBlue}
        label="emerge halfway back"
      />
      <path
        d={`M ${activeA.x + 2} ${activeA.y + 18} C ${emergeX - 8} ${emergeY + 28}, ${activeB.x - 10} ${
          activeB.y + 28
        }, ${activeB.x} ${activeB.y + 12}`}
        fill="none"
        stroke={ILLUSTRATION.sage}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Needle x={activeB.x - 42} y={activeB.y - 30} angle={16} length={60} label="same side" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x="300" y="24" textAnchor="middle">
            Gold = active surface stitch; green working thread remains on the same side of the needle.
          </text>
          <text x="300" y="268" textAnchor="middle">
            Step {visible}: insert ahead, emerge back along the line, keep the thread below.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

export function StemEmbroideryConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= STEM_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2400);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = STEM_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${STEM_STEPS.length}: ${current.title}`}
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
            onClick={() => setStep((value) => Math.min(STEM_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= STEM_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
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
      <StemEmbroideryNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{current.body}</p>
    </IllustrationFrame>
  );
}

function StemTensionSample({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "loose" | "balanced" | "tight" | "reversed";
}) {
  const color = kind === "balanced" ? ILLUSTRATION.thread : ILLUSTRATION.burgundy;

  return (
    <g transform={`translate(${x} 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="16" width="140" height="108" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      <path d="M 18 78 C 42 48, 72 54, 104 42" fill="none" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.4" />
      {[0, 1, 2, 3].map((i) => {
        const x1 = 18 + i * 24;
        const y1 = 78 - i * 9 + (kind === "loose" ? (i % 2) * 5 : 0);
        const x2 = x1 + 28;
        const y2 = y1 - 11 + (kind === "reversed" && i === 2 ? 16 : 0);
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} C ${x1 + 12} ${y1 + (kind === "tight" ? 0 : 9)}, ${x2 - 10} ${
              y2 + (kind === "tight" ? 0 : 9)
            }, ${x2} ${y2}`}
            fill="none"
            stroke={color}
            strokeWidth={kind === "loose" ? 2 : kind === "tight" ? 4.3 : 3}
            strokeLinecap="round"
            opacity={kind === "loose" ? 0.72 : 1}
          />
        );
      })}
      {kind === "tight" && <path d="M 28 102 C 52 88, 82 86, 112 100" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.5" />}
      {kind === "reversed" && <circle cx="82" cy="56" r="12" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.2" />}
    </g>
  );
}

export function StemEmbroideryTensionDiagram() {
  return (
    <IllustrationFrame caption="Surface stem tension - the rope is smooth when stitch length, pull, and thread side stay consistent.">
      <SvgRoot viewBox="0 0 640 165" aria-label="Surface stem stitch tension examples">
        <StemTensionSample x={0} title="Too loose" kind="loose" />
        <StemTensionSample x={160} title="Balanced" kind="balanced" />
        <StemTensionSample x={320} title="Too tight" kind="tight" />
        <StemTensionSample x={480} title="Side reversed" kind="reversed" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function StemEmbroideryMistakeDiagrams() {
  const mistakes = [
    { title: "Thread switches side", note: "One reversal breaks the rope and forms a kink.", kind: "side" },
    { title: "Too long on curve", note: "Long stitches make corners instead of a smooth stem.", kind: "long" },
    { title: "Piercing pleats", note: "This surface stitch should not be worked across smocking pleats.", kind: "pleat" },
    { title: "Pulled too tight", note: "The line sinks into the fabric instead of sitting raised.", kind: "tight" },
  ] as const;

  return (
    <IllustrationFrame caption="Common surface stem mistakes - distinguish side placement, scale, flat fabric, and tension.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="12" width="200" height="82" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <path d="M 28 74 C 70 38, 112 58, 182 42" fill="none" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
              {mistake.kind === "side" && (
                <>
                  <path d="M 28 74 C 50 84, 62 58, 78 62 C 94 46, 112 76, 128 52 C 144 60, 158 38, 182 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />
                  <circle cx="118" cy="61" r="10" fill="none" stroke={ILLUSTRATION.burgundy} />
                </>
              )}
              {mistake.kind === "long" && (
                <path d="M 28 74 L 80 52 L 132 58 L 182 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />
              )}
              {mistake.kind === "pleat" && (
                <>
                  {[42, 70, 98, 126, 154, 182].map((x) => (
                    <path key={x} d={`M ${x} 22 C ${x + 7} 44, ${x + 7} 70, ${x} 92`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="3" opacity="0.6" />
                  ))}
                  <path d="M 36 66 C 72 46, 104 80, 158 50" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                </>
              )}
              {mistake.kind === "tight" && (
                <>
                  <path d="M 28 74 C 70 44, 112 58, 182 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M 36 92 C 78 78, 126 80, 172 90" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.5" />
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

export function StemEmbroideryWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="With smocking - surface stem embroidery can outline motifs around a smocked area; it is separate from stem stitch smocking across pleats.">
      <SvgRoot viewBox="0 0 620 235" aria-label="Surface stem embroidery beside smocking">
        <FlatFabric x={24} y={28} width={572} height={160} />
        <g transform="translate(42 28)">
          {[24, 52, 80, 108, 136, 164, 192].map((x) => (
            <path key={x} d={`M ${x} 22 C ${x + 7} 62, ${x + 7} 100, ${x} 138`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="4" strokeLinecap="round" opacity="0.55" />
          ))}
          <path d="M 28 64 Q 44 76 60 64 Q 76 52 92 64 Q 108 76 124 64 Q 140 52 156 64 Q 172 76 188 64" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" />
          <text x="106" y="178" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            smocking stem: across pleats
          </text>
        </g>
        <g transform="translate(62 24)">
          {STEM_POINTS.slice(0, -1).map((_, index) => (
            <StemSegment key={index} index={index} color={ILLUSTRATION.sage} />
          ))}
        </g>
        <DirectionArrow x1={274} y1={112} x2={340} y2={112} color={ILLUSTRATION.dustyBlue} label="separate zones" />
        <text x="442" y="206" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          surface stem: flat fabric line, same side of thread
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function StemEmbroideryTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why surface stem works - each stitch overlaps the last and rolls to the same side, building a continuous rope.">
      <SvgRoot viewBox="0 0 620 245" aria-label="Surface stem stitch theory">
        <FlatFabric x={38} y={28} width={544} height={148} />
        <StemSurfaceGuide />
        {STEM_POINTS.slice(0, -1).map((_, index) => (
          <StemSegment key={index} index={index} color={ILLUSTRATION.gold} strokeWidth={3.2} />
        ))}
        <path d="M 118 198 H 502" stroke={ILLUSTRATION.creamDeeper} strokeWidth="16" strokeLinecap="round" />
        <text x="310" y="202" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Same-side thread placement stacks small overlaps into one smooth, raised surface rope.
        </text>
        <DirectionArrow x1={250} y1={134} x2={304} y2={112} color={ILLUSTRATION.burgundy} label="overlap" />
        <DirectionArrow x1={360} y1={145} x2={412} y2={112} color={ILLUSTRATION.dustyBlue} label="same side" />
      </SvgRoot>
    </IllustrationFrame>
  );
}
