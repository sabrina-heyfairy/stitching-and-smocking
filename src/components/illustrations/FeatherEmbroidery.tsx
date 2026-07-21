"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { Needle, DirectionArrow } from "@/components/illustrations/Needle";

const FEATHER_STITCHES = [
  { center: { x: 292, y: 72 }, wing: { x: 226, y: 96 }, side: "left" },
  { center: { x: 304, y: 96 }, wing: { x: 376, y: 122 }, side: "right" },
  { center: { x: 292, y: 120 }, wing: { x: 218, y: 148 }, side: "left" },
  { center: { x: 306, y: 146 }, wing: { x: 386, y: 174 }, side: "right" },
  { center: { x: 292, y: 172 }, wing: { x: 224, y: 198 }, side: "left" },
  { center: { x: 304, y: 198 }, wing: { x: 374, y: 220 }, side: "right" },
] as const;

const FEATHER_STEPS = [
  {
    title: "Mark a light vine",
    body: "Draw or visualize a center guide. Feather stitch branches from this guide; the guide does not need to be pierced deeply.",
    pathStep: 1,
  },
  {
    title: "Open the first left branch",
    body: "Bring the needle up on the center line, move out to the left, and return toward the next center point with the working thread under the needle to form a small open V.",
    pathStep: 1,
  },
  {
    title: "Alternate to the right",
    body: "Take the next branch to the right. The rhythm is left, right, left, right; do not stack two branches on the same side.",
    pathStep: 2,
  },
  {
    title: "Keep the center airy",
    body: "Let each new stitch catch the previous center loop lightly. The center should look like a vine, not a tight rope.",
    pathStep: 4,
  },
  {
    title: "Finish with even diagonals",
    body: "Match angle, length, and tension so the feathered edges read as a balanced decorative border.",
    pathStep: 6,
  },
] as const;

function FeatherBranch({
  stitch,
  color = ILLUSTRATION.thread,
  opacity = 1,
  strokeWidth = 3,
}: {
  stitch: (typeof FEATHER_STITCHES)[number];
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  const nextY = stitch.center.y + 24;
  const innerX = stitch.side === "left" ? stitch.center.x + 12 : stitch.center.x - 12;

  return (
    <g opacity={opacity}>
      <path
        d={`M ${stitch.center.x} ${stitch.center.y} L ${stitch.wing.x} ${stitch.wing.y} Q ${innerX} ${
          stitch.wing.y + 4
        } ${stitch.center.x} ${nextY}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={stitch.center.x} cy={stitch.center.y} r="3" fill={color} />
      <circle cx={stitch.center.x} cy={nextY} r="2.6" fill={color} opacity="0.78" />
    </g>
  );
}

function FeatherGuide({ showLabels = true }: { showLabels?: boolean }) {
  return (
    <g>
      <line
        x1="300"
        y1="58"
        x2="300"
        y2="228"
        stroke={ILLUSTRATION.dustyBlue}
        strokeWidth="1.2"
        strokeDasharray="5 5"
        opacity="0.55"
      />
      {showLabels && (
        <text
          x="312"
          y="66"
          fontSize="10"
          fill={ILLUSTRATION.dustyBlue}
          fontFamily="var(--font-body), sans-serif"
        >
          center vine
        </text>
      )}
    </g>
  );
}

export function FinishedFeatherAppearance() {
  return (
    <IllustrationFrame caption="Finished feather stitch - alternating open diagonal branches grow from a light center vine.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished feather stitch on flat fabric">
        <FlatFabric x={52} y={34} width={496} height={210} />
        <FeatherGuide />
        {FEATHER_STITCHES.map((stitch) => (
          <FeatherBranch key={`${stitch.side}-${stitch.center.y}`} stitch={stitch} />
        ))}
        <text
          x="300"
          y="264"
          textAnchor="middle"
          fontSize="11"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          Alternation is the identity: left branch, right branch, left branch, right branch.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function FeatherNeedlePath({ showLabels = true, step = 3 }: { showLabels?: boolean; step?: number }) {
  const visible = Math.min(Math.max(step, 1), FEATHER_STITCHES.length);
  const active = FEATHER_STITCHES[visible - 1];
  const nextCenter = { x: active.center.x, y: active.center.y + 24 };

  return (
    <SvgRoot viewBox="0 0 600 285" aria-label="Feather stitch needle path">
      <FlatFabric x={54} y={34} width={492} height={215} />
      <FeatherGuide showLabels={showLabels} />
      {FEATHER_STITCHES.slice(0, visible).map((stitch, index) => (
        <FeatherBranch
          key={`${stitch.side}-${stitch.center.y}`}
          stitch={stitch}
          color={index === visible - 1 ? ILLUSTRATION.gold : ILLUSTRATION.thread}
          opacity={index === visible - 1 ? 1 : 0.34}
          strokeWidth={index === visible - 1 ? 3.8 : 2.8}
        />
      ))}
      <DirectionArrow
        x1={active.center.x}
        y1={active.center.y}
        x2={active.wing.x}
        y2={active.wing.y}
        color={ILLUSTRATION.burgundy}
        label={`${active.side} branch`}
      />
      <DirectionArrow
        x1={active.wing.x}
        y1={active.wing.y + 8}
        x2={nextCenter.x}
        y2={nextCenter.y}
        color={ILLUSTRATION.dustyBlue}
        label="return to vine"
      />
      <Needle
        x={active.wing.x + (active.side === "left" ? 12 : -64)}
        y={active.wing.y - 12}
        angle={active.side === "left" ? 26 : 154}
        length={58}
        label="thread under needle"
      />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x="300" y="24" textAnchor="middle">
            Gold = active branch; the needle returns to the center loop before alternating sides.
          </text>
          <text x="300" y="268" textAnchor="middle">
            Step {visible}: work the {active.side} diagonal, catch the center, then switch sides.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

export function FeatherConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= FEATHER_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2400);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = FEATHER_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${FEATHER_STEPS.length}: ${current.title}`}
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
            onClick={() => setStep((value) => Math.min(FEATHER_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= FEATHER_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{FEATHER_STEPS.length}
          </span>
        </>
      }
    >
      <FeatherNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{current.body}</p>
    </IllustrationFrame>
  );
}

function FeatherTensionSample({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "loose" | "balanced" | "tight" | "uneven";
}) {
  const color = kind === "balanced" ? ILLUSTRATION.thread : ILLUSTRATION.burgundy;
  const width = kind === "loose" ? 1.9 : kind === "tight" ? 4.2 : 2.8;
  const opacity = kind === "loose" ? 0.72 : 1;

  return (
    <g transform={`translate(${x} 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="16" width="140" height="112" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      <line x1="70" y1="26" x2="70" y2="118" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.4" />
      {[0, 1, 2].map((i) => {
        const y = 36 + i * 26;
        const left = kind === "uneven" && i === 1 ? 30 : 20;
        const right = kind === "tight" ? 106 : 118;
        return (
          <path
            key={i}
            d={`M 70 ${y} L ${i % 2 ? right : left} ${y + 12} Q 70 ${y + 20} 70 ${y + 26}`}
            fill="none"
            stroke={color}
            strokeWidth={kind === "uneven" && i === 1 ? 4.4 : width}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacity}
          />
        );
      })}
      {kind === "tight" && <path d="M 48 32 C 58 122, 82 122, 92 32" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.45" />}
      {kind === "loose" && <path d="M 18 88 C 42 58, 96 130, 122 82" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.7" />}
    </g>
  );
}

export function FeatherTensionDiagram() {
  return (
    <IllustrationFrame caption="Feather stitch tension - branches should stay open, even, and lightly seated on the fabric.">
      <SvgRoot viewBox="0 0 640 170" aria-label="Feather stitch tension examples">
        <FeatherTensionSample x={0} title="Too loose" kind="loose" />
        <FeatherTensionSample x={160} title="Balanced" kind="balanced" />
        <FeatherTensionSample x={320} title="Too tight" kind="tight" />
        <FeatherTensionSample x={480} title="Uneven" kind="uneven" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function FeatherMistakeDiagrams() {
  const mistakes = [
    { title: "Two lefts in a row", note: "The alternating vine rhythm disappears.", kind: "repeat" },
    { title: "Center pulled tight", note: "The open feather becomes a corded knot.", kind: "tight" },
    { title: "Branches too long", note: "Long floats catch on fingers and laundering.", kind: "long" },
    { title: "Uneven angles", note: "The border wanders instead of framing evenly.", kind: "angle" },
  ] as const;

  return (
    <IllustrationFrame caption="Common feather stitch mistakes - diagnose alternation, center tension, length, and angle.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="12" width="200" height="82" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <line x1="110" y1="20" x2="110" y2="86" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
              {mistake.kind === "repeat" && (
                <path d="M 110 28 L 58 44 Q 110 52 110 56 L 54 72 Q 110 80 110 84" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />
              )}
              {mistake.kind === "tight" && (
                <>
                  <path d="M 110 28 L 72 45 Q 110 50 110 55 L 148 70 Q 110 75 110 82" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="4.2" strokeLinecap="round" />
                  <ellipse cx="110" cy="56" rx="12" ry="34" fill="none" stroke={ILLUSTRATION.burgundy} opacity="0.45" />
                </>
              )}
              {mistake.kind === "long" && (
                <path d="M 110 28 L 24 48 Q 110 54 110 58 L 196 78 Q 110 86 110 90" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />
              )}
              {mistake.kind === "angle" && (
                <path d="M 110 28 L 76 40 Q 110 58 110 58 L 176 78 Q 110 74 110 88" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" strokeLinecap="round" />
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

export function FeatherWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="With smocking - feather stitch is best used as a flat embroidered vine beside or between smocked bands, not as a pleat-control stitch.">
      <SvgRoot viewBox="0 0 620 230" aria-label="Feather stitch used with smocking">
        <FlatFabric x={24} y={26} width={572} height={160} />
        {[64, 94, 124, 154, 184, 214, 244, 274].map((x) => (
          <path key={x} d={`M ${x} 54 C ${x + 7} 88, ${x + 7} 122, ${x} 156`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="4" strokeLinecap="round" opacity="0.55" />
        ))}
        <path d="M 62 84 L 92 100 L 122 84 L 152 100 L 182 84 L 212 100 L 242 84" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" />
        <g transform="translate(132 -10)">
          <FeatherGuide showLabels={false} />
          {FEATHER_STITCHES.slice(0, 5).map((stitch) => (
            <FeatherBranch key={`${stitch.side}-${stitch.center.y}`} stitch={stitch} color={ILLUSTRATION.sage} strokeWidth={2.7} />
          ))}
        </g>
        <DirectionArrow x1={292} y1={112} x2={356} y2={112} color={ILLUSTRATION.dustyBlue} label="leave breathing room" />
        <text x="158" y="204" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          smocked band controls pleats
        </text>
        <text x="454" y="204" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          feather vine decorates flat fabric
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function FeatherTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why feather stitch works - alternating diagonal vectors share a light center catch and distribute tension outward.">
      <SvgRoot viewBox="0 0 620 240" aria-label="Feather stitch theory diagram">
        <FlatFabric x={36} y={28} width={548} height={150} />
        <FeatherGuide />
        {FEATHER_STITCHES.slice(0, 5).map((stitch) => (
          <FeatherBranch key={`${stitch.side}-${stitch.center.y}`} stitch={stitch} color={ILLUSTRATION.gold} strokeWidth={3.1} />
        ))}
        <DirectionArrow x1={300} y1={88} x2={228} y2={112} color={ILLUSTRATION.burgundy} label="outward pull" />
        <DirectionArrow x1={300} y1={116} x2={374} y2={142} color={ILLUSTRATION.burgundy} label="balanced pull" />
        <rect x="112" y="192" width="396" height="28" rx="14" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
        <text x="310" y="211" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          The center line is stable because each side alternates and the loop is not cinched.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
