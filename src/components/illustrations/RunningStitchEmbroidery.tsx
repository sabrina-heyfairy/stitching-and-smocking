"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { Needle, DirectionArrow } from "@/components/illustrations/Needle";

const RUNNING_POINTS = [
  { x: 88, y: 150 },
  { x: 126, y: 138 },
  { x: 164, y: 148 },
  { x: 202, y: 134 },
  { x: 240, y: 144 },
  { x: 278, y: 132 },
  { x: 316, y: 142 },
  { x: 354, y: 130 },
  { x: 392, y: 140 },
  { x: 430, y: 128 },
  { x: 468, y: 138 },
  { x: 506, y: 126 },
] as const;

const RUNNING_STEPS = [
  {
    title: "Mark a light guideline",
    body: "Running stitch follows a line with small straight stitches. Use it for utility guidelines, basting, or light texture.",
    pathStep: 1,
  },
  {
    title: "Come up at the first point",
    body: "Bring the needle up at the start of the first dash. The surface length sets the visible rhythm.",
    pathStep: 2,
  },
  {
    title: "Go down at the end of the dash",
    body: "Insert the needle one stitch length ahead. The thread travels under the fabric through the next gap.",
    pathStep: 3,
  },
  {
    title: "Come up after the gap",
    body: "Bring the needle up after an even space and make the next dash. Keep stitches and gaps consistent.",
    pathStep: 5,
  },
  {
    title: "Continue in and out",
    body: "Running stitch is quick because the needle alternates in and out. Several small bites can be loaded on the needle if the fabric allows.",
    pathStep: 6,
  },
] as const;

function RunningGuide({ showLabels = true }: { showLabels?: boolean }) {
  const d = `M ${RUNNING_POINTS[0].x} ${RUNNING_POINTS[0].y}
    C 160 130, 224 150, 282 132
    C 346 112, 408 144, 506 126`;

  return (
    <g>
      <path d={d} fill="none" stroke={ILLUSTRATION.dustyBlue} strokeWidth="1.2" strokeDasharray="5 5" opacity="0.5" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.dustyBlue} fontFamily="var(--font-body), sans-serif">
          <text x="92" y="174">light guideline</text>
          <text x="370" y="160">even in-and-out rhythm</text>
        </g>
      )}
    </g>
  );
}

function RunningSegments({
  count = 6,
  active = -1,
  color = ILLUSTRATION.thread,
  showBackTravel = false,
}: {
  count?: number;
  active?: number;
  color?: string;
  showBackTravel?: boolean;
}) {
  return (
    <g>
      {Array.from({ length: Math.min(count, 6) }).map((_, index) => {
        const pointIndex = index * 2;
        const a = RUNNING_POINTS[pointIndex];
        const b = RUNNING_POINTS[pointIndex + 1];
        const next = RUNNING_POINTS[pointIndex + 2];
        const activeColor = index === active ? ILLUSTRATION.gold : color;

        return (
          <g key={pointIndex}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={activeColor}
              strokeWidth={index === active ? 4.2 : 3.2}
              strokeLinecap="round"
              opacity={active === -1 || index === active ? 1 : 0.38}
            />
            {showBackTravel && next && (
              <path
                d={`M ${b.x} ${b.y + 12} C ${(b.x + next.x) / 2} ${b.y + 34}, ${(b.x + next.x) / 2} ${
                  next.y + 34
                }, ${next.x} ${next.y + 12}`}
                fill="none"
                stroke={ILLUSTRATION.sage}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="4 3"
                opacity={active === -1 || index === active ? 0.85 : 0.28}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

export function FinishedRunningStitchAppearance() {
  return (
    <IllustrationFrame caption="Finished running stitch - small even dashes make a light line or temporary guide.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished running stitch embroidery on flat fabric">
        <FlatFabric x={48} y={34} width={504} height={210} />
        <RunningGuide />
        <RunningSegments />
        <text x="300" y="264" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Running stitch alternates visible surface dashes with hidden under-fabric gaps.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function RunningStitchNeedlePath({ showLabels = true, step = 4 }: { showLabels?: boolean; step?: number }) {
  const visible = Math.min(Math.max(step, 1), 6);
  const activeIndex = visible - 1;
  const pointIndex = activeIndex * 2;
  const up = RUNNING_POINTS[pointIndex];
  const down = RUNNING_POINTS[pointIndex + 1];
  const nextUp = RUNNING_POINTS[Math.min(pointIndex + 2, RUNNING_POINTS.length - 1)];

  return (
    <SvgRoot viewBox="0 0 600 285" aria-label="Running stitch needle path">
      <FlatFabric x={48} y={34} width={504} height={214} />
      <RunningGuide showLabels={showLabels} />
      <RunningSegments count={visible} active={activeIndex} showBackTravel />
      <DirectionArrow x1={up.x - 24} y1={up.y + 22} x2={up.x - 2} y2={up.y + 4} color={ILLUSTRATION.dustyBlue} label="up" />
      <DirectionArrow x1={up.x + 2} y1={up.y - 16} x2={down.x - 2} y2={down.y - 16} color={ILLUSTRATION.burgundy} label="surface dash" />
      <DirectionArrow x1={down.x + 4} y1={down.y + 20} x2={nextUp.x - 4} y2={nextUp.y + 20} color={ILLUSTRATION.dustyBlue} label="under gap" />
      <Needle x={nextUp.x - 34} y={nextUp.y - 34} angle={18} length={62} label="next up" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x="300" y="24" textAnchor="middle">
            Gold = active surface dash; green dashed line shows the hidden travel under the fabric.
          </text>
          <text x="300" y="268" textAnchor="middle">
            Step {visible}: up, down one dash length ahead, travel under the gap, then come up again.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

export function RunningStitchConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= RUNNING_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2200);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = RUNNING_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${RUNNING_STEPS.length}: ${current.title}`}
      controls={
        <>
          <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setStep((value) => Math.max(0, value - 1))}>
            Previous
          </button>
          <button type="button" className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep" onClick={() => setStep((value) => Math.min(RUNNING_STEPS.length - 1, value + 1))}>
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= RUNNING_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{RUNNING_STEPS.length}
          </span>
        </>
      }
    >
      <RunningStitchNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{current.body}</p>
    </IllustrationFrame>
  );
}

function RunningTensionSample({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "loose" | "balanced" | "tight" | "uneven";
}) {
  const color = kind === "balanced" ? ILLUSTRATION.thread : ILLUSTRATION.burgundy;
  const starts = kind === "uneven" ? [16, 54, 84, 126] : [16, 48, 80, 112];
  const lengths = kind === "uneven" ? [24, 12, 30, 16] : [22, 22, 22, 22];

  return (
    <g transform={`translate(${x} 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="16" width="140" height="108" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      <line x1="14" y1="70" x2="126" y2="70" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
      {starts.map((start, index) => (
        <line
          key={start}
          x1={start}
          y1={kind === "loose" ? 70 + (index % 2) * 5 : 70}
          x2={Math.min(128, start + lengths[index])}
          y2={kind === "loose" ? 70 + (index % 2) * 5 : 70}
          stroke={color}
          strokeWidth={kind === "tight" ? 4.5 : kind === "loose" ? 2.2 : 3}
          strokeLinecap="round"
          opacity={kind === "loose" ? 0.75 : 1}
        />
      ))}
      {kind === "tight" && <path d="M 22 100 C 50 86, 90 86, 118 100" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.55" />}
    </g>
  );
}

export function RunningStitchTensionDiagram() {
  return (
    <IllustrationFrame caption="Running stitch tension - even dashes should lie flat without puckering or drooping.">
      <SvgRoot viewBox="0 0 640 165" aria-label="Running stitch tension examples">
        <RunningTensionSample x={0} title="Too loose" kind="loose" />
        <RunningTensionSample x={160} title="Balanced" kind="balanced" />
        <RunningTensionSample x={320} title="Too tight" kind="tight" />
        <RunningTensionSample x={480} title="Uneven" kind="uneven" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function RunningStitchMistakeDiagrams() {
  const mistakes = [
    { title: "Uneven dashes", note: "Irregular lengths make guidelines hard to read.", kind: "uneven" },
    { title: "Pulled too tight", note: "The fabric puckers along the light line.", kind: "tight" },
    { title: "Long floats", note: "Oversized stitches snag and lose control on curves.", kind: "long" },
    { title: "Off the guide", note: "The line wanders instead of marking a clean path.", kind: "wander" },
  ] as const;

  return (
    <IllustrationFrame caption="Common running stitch mistakes - keep stitches small, even, and relaxed.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="12" width="200" height="82" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <path d="M 28 64 C 70 46, 112 70, 186 48" fill="none" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
              {mistake.kind === "uneven" && (
                <path d="M 30 64 L 56 54 M 76 52 L 86 54 M 108 62 L 146 56 M 164 52 L 180 48" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.2" strokeLinecap="round" />
              )}
              {mistake.kind === "tight" && (
                <>
                  <path d="M 30 64 L 54 54 M 74 52 L 98 58 M 118 62 L 142 56 M 162 52 L 186 48" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="4.4" strokeLinecap="round" />
                  <path d="M 34 88 C 70 72, 112 92, 176 78" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.55" />
                </>
              )}
              {mistake.kind === "long" && (
                <path d="M 28 64 L 104 54 M 126 58 L 190 46" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.2" strokeLinecap="round" />
              )}
              {mistake.kind === "wander" && (
                <path d="M 30 78 L 56 42 M 76 70 L 100 76 M 120 48 L 146 58 M 166 72 L 190 38" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.2" strokeLinecap="round" />
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

export function RunningStitchWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="With smocking - running stitch can mark guidelines, baste motifs, or add light texture beside smocked panels.">
      <SvgRoot viewBox="0 0 620 235" aria-label="Running stitch used with smocking">
        <FlatFabric x={24} y={28} width={572} height={160} />
        {[58, 86, 114, 142, 170, 198, 226].map((x) => (
          <path key={x} d={`M ${x} 48 C ${x + 7} 82, ${x + 7} 122, ${x} 158`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        ))}
        <path d="M 60 84 Q 74 96 88 84 Q 102 72 116 84 Q 130 96 144 84 Q 158 72 172 84 Q 186 96 200 84" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" />
        <g transform="translate(104 -10)">
          <RunningSegments color={ILLUSTRATION.sage} />
        </g>
        <text x="144" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          smocked texture
        </text>
        <text x="438" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          running stitch for temporary marks or light texture
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function RunningStitchTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why running stitch works - the needle alternates over and under the fabric, making a fast broken line.">
      <SvgRoot viewBox="0 0 620 245" aria-label="Running stitch theory diagram">
        <FlatFabric x={38} y={28} width={544} height={150} />
        <RunningGuide />
        <RunningSegments color={ILLUSTRATION.gold} showBackTravel />
        <DirectionArrow x1={150} y1={122} x2={188} y2={122} color={ILLUSTRATION.burgundy} label="visible dash" />
        <DirectionArrow x1={204} y1={174} x2={238} y2={174} color={ILLUSTRATION.dustyBlue} label="hidden gap" />
        <rect x="92" y="194" width="436" height="28" rx="14" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
        <text x="310" y="213" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Even surface dashes plus even under-fabric gaps create a quick guide line or subtle texture.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
