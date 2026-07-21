"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { Needle, DirectionArrow } from "@/components/illustrations/Needle";

const SATIN_STITCHES = [
  { x: 238, y1: 142, y2: 162 },
  { x: 252, y1: 126, y2: 176 },
  { x: 266, y1: 116, y2: 186 },
  { x: 280, y1: 109, y2: 193 },
  { x: 294, y1: 106, y2: 196 },
  { x: 308, y1: 106, y2: 196 },
  { x: 322, y1: 110, y2: 192 },
  { x: 336, y1: 118, y2: 184 },
  { x: 350, y1: 130, y2: 172 },
  { x: 364, y1: 146, y2: 158 },
] as const;

const SATIN_STEPS = [
  {
    title: "Choose a small shape",
    body: "Satin stitch shines on small petals, dots, leaves, and monograms. Keep the span short so the surface thread does not snag.",
    pathStep: 1,
  },
  {
    title: "Outline the edge mentally",
    body: "Bring the needle up exactly on one edge and take it down exactly on the opposite edge. The edge line controls the whole fill.",
    pathStep: 2,
  },
  {
    title: "Lay stitches side by side",
    body: "Place each stitch parallel to the last. Do not split the previous stitch and do not leave fabric showing between stitches.",
    pathStep: 5,
  },
  {
    title: "Keep tension smooth",
    body: "Draw the thread flat against the fabric without cinching the ground. Satin should gleam, not pucker.",
    pathStep: 8,
  },
  {
    title: "Close the final edge",
    body: "Finish with narrow edge stitches that fill the shape cleanly. If the shape is too wide, divide it or choose long-and-short instead.",
    pathStep: 10,
  },
] as const;

function SatinShape({ showGuide = true }: { showGuide?: boolean }) {
  return (
    <g>
      <path
        d="M 226 154 C 238 112, 274 88, 308 100 C 344 112, 374 132, 374 154 C 374 176, 342 202, 306 206 C 270 202, 238 184, 226 154 Z"
        fill={showGuide ? "var(--cream)" : "none"}
        stroke={ILLUSTRATION.dustyBlue}
        strokeWidth="1.1"
        strokeDasharray={showGuide ? "4 3" : undefined}
        opacity={showGuide ? 0.85 : 0}
      />
    </g>
  );
}

function SatinFill({
  count = SATIN_STITCHES.length,
  active = -1,
  color = ILLUSTRATION.thread,
}: {
  count?: number;
  active?: number;
  color?: string;
}) {
  return (
    <g>
      {SATIN_STITCHES.slice(0, count).map((stitch, index) => (
        <line
          key={stitch.x}
          x1={stitch.x}
          y1={stitch.y1}
          x2={stitch.x}
          y2={stitch.y2}
          stroke={index === active ? ILLUSTRATION.gold : color}
          strokeWidth={index === active ? 7.2 : 6.2}
          strokeLinecap="round"
          opacity={active === -1 || index === active ? 1 : 0.42}
        />
      ))}
    </g>
  );
}

export function FinishedSatinAppearance() {
  return (
    <IllustrationFrame caption="Finished satin stitch - short parallel fill stitches cover the shape completely with no fabric showing.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished satin stitch on flat fabric">
        <FlatFabric x={50} y={34} width={500} height={210} />
        <SatinShape />
        <SatinFill />
        <text
          x="300"
          y="264"
          textAnchor="middle"
          fontSize="11"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          Best satin fill: short span, parallel stitches, smooth edges, even tension.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SatinNeedlePath({ showLabels = true, step = 5 }: { showLabels?: boolean; step?: number }) {
  const visible = Math.min(Math.max(step, 1), SATIN_STITCHES.length);
  const active = SATIN_STITCHES[visible - 1];

  return (
    <SvgRoot viewBox="0 0 600 285" aria-label="Satin stitch needle path">
      <FlatFabric x={50} y={34} width={500} height={214} />
      <SatinShape />
      <SatinFill count={visible} active={visible - 1} />
      <DirectionArrow
        x1={active.x - 24}
        y1={active.y1}
        x2={active.x - 24}
        y2={active.y2}
        color={ILLUSTRATION.burgundy}
        label="edge to edge"
      />
      <DirectionArrow
        x1={active.x + 10}
        y1={active.y2 + 14}
        x2={SATIN_STITCHES[Math.min(visible, SATIN_STITCHES.length - 1)].x + 10}
        y2={SATIN_STITCHES[Math.min(visible, SATIN_STITCHES.length - 1)].y1 - 12}
        color={ILLUSTRATION.dustyBlue}
        label="return on back"
      />
      <Needle x={active.x - 18} y={active.y1 - 42} angle={78} length={62} label="parallel" />
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x="300" y="24" textAnchor="middle">
            Gold = active stitch; each stitch crosses the shape once and lies beside the previous one.
          </text>
          <text x="300" y="268" textAnchor="middle">
            Step {visible}: fill from one edge to the opposite edge without leaving a gap.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

export function SatinConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= SATIN_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2400);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = SATIN_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${SATIN_STEPS.length}: ${current.title}`}
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
            onClick={() => setStep((value) => Math.min(SATIN_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= SATIN_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{SATIN_STEPS.length}
          </span>
        </>
      }
    >
      <SatinNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{current.body}</p>
    </IllustrationFrame>
  );
}

function SatinTensionSample({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "gap" | "balanced" | "tight" | "long";
}) {
  const spacing = kind === "gap" ? 15 : 10;
  const top = kind === "long" ? 28 : 44;
  const bottom = kind === "long" ? 112 : 96;

  return (
    <g transform={`translate(${x} 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="16" width="140" height="108" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      <ellipse cx="70" cy="70" rx="42" ry={kind === "tight" ? 25 : 34} fill="var(--cream)" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.72" />
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={i}
          x1={40 + i * spacing}
          y1={top + Math.abs(i - 3) * 4}
          x2={40 + i * spacing}
          y2={bottom - Math.abs(i - 3) * 4}
          stroke={kind === "balanced" ? ILLUSTRATION.thread : ILLUSTRATION.burgundy}
          strokeWidth={kind === "gap" ? 4.4 : kind === "tight" ? 7 : 5.5}
          strokeLinecap="round"
          opacity={kind === "gap" ? 0.78 : 1}
        />
      ))}
      {kind === "tight" && <path d="M 24 108 C 54 92, 86 92, 116 108" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.5" />}
    </g>
  );
}

export function SatinTensionDiagram() {
  return (
    <IllustrationFrame caption="Satin stitch tension - cover the shape fully without spreading the fabric or leaving channels.">
      <SvgRoot viewBox="0 0 640 165" aria-label="Satin stitch tension examples">
        <SatinTensionSample x={0} title="Gaps" kind="gap" />
        <SatinTensionSample x={160} title="Balanced" kind="balanced" />
        <SatinTensionSample x={320} title="Too tight" kind="tight" />
        <SatinTensionSample x={480} title="Too long" kind="long" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SatinMistakeDiagrams() {
  const mistakes = [
    { title: "Fabric showing", note: "Parallel stitches are too far apart.", kind: "gaps" },
    { title: "Long satin span", note: "The thread will snag and loosen with wear.", kind: "long" },
    { title: "Uneven edge", note: "Entry and exit points miss the outline.", kind: "edge" },
    { title: "Puckered ground", note: "Tension is too tight for the fabric.", kind: "pucker" },
  ] as const;

  return (
    <IllustrationFrame caption="Common satin mistakes - check coverage, span length, edge accuracy, and tension.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="12" width="200" height="82" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <ellipse cx="110" cy="54" rx={mistake.kind === "long" ? 70 : 46} ry="28" fill="var(--cream)" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.75" />
              {mistake.kind === "gaps" &&
                [78, 96, 114, 132, 150].map((x) => (
                  <line key={x} x1={x} y1="32" x2={x} y2="76" stroke={ILLUSTRATION.burgundy} strokeWidth="5" strokeLinecap="round" />
                ))}
              {mistake.kind === "long" &&
                [56, 78, 100, 122, 144, 166].map((x) => (
                  <line key={x} x1={x} y1="30" x2={x} y2="78" stroke={ILLUSTRATION.burgundy} strokeWidth="4.8" strokeLinecap="round" />
                ))}
              {mistake.kind === "edge" &&
                [78, 92, 106, 120, 134, 148].map((x, i) => (
                  <line key={x} x1={x} y1={28 + (i % 2) * 9} x2={x} y2={78 - (i % 3) * 6} stroke={ILLUSTRATION.burgundy} strokeWidth="5.2" strokeLinecap="round" />
                ))}
              {mistake.kind === "pucker" && (
                <>
                  {[82, 96, 110, 124, 138].map((x) => (
                    <line key={x} x1={x} y1="30" x2={x} y2="78" stroke={ILLUSTRATION.burgundy} strokeWidth="7" strokeLinecap="round" />
                  ))}
                  <path d="M 54 90 C 84 76, 136 76, 166 90" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" opacity="0.6" />
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

export function SatinWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="With smocking - small satin accents sit on flat spaces, yoke corners, collars, and bands beside smocking.">
      <SvgRoot viewBox="0 0 620 230" aria-label="Satin stitch used with smocking">
        <FlatFabric x={24} y={28} width={572} height={160} />
        {[58, 86, 114, 142, 170, 198, 226].map((x) => (
          <path key={x} d={`M ${x} 48 C ${x + 7} 82, ${x + 7} 122, ${x} 158`} fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        ))}
        <path d="M 60 82 L 88 96 L 116 82 L 144 96 L 172 82 L 200 96 L 228 82" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" />
        {[330, 390, 450, 510].map((cx, i) => (
          <g key={cx} transform={`translate(${cx - 300} ${i % 2 ? 14 : 0}) scale(0.48)`}>
            <SatinShape />
            <SatinFill color={i % 2 ? ILLUSTRATION.sage : ILLUSTRATION.gold} />
          </g>
        ))}
        <text x="144" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          smocked field
        </text>
        <text x="426" y="206" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          short satin motifs on flat fabric
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SatinTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why satin works - many short parallel threads act like a smooth fill, but only while the span stays modest.">
      <SvgRoot viewBox="0 0 620 245" aria-label="Satin stitch theory diagram">
        <FlatFabric x={38} y={28} width={544} height={150} />
        <SatinShape />
        <SatinFill color={ILLUSTRATION.gold} />
        <DirectionArrow x1={232} y1={126} x2={232} y2={176} color={ILLUSTRATION.burgundy} label="short span" />
        <DirectionArrow x1={386} y1={152} x2={430} y2={152} color={ILLUSTRATION.dustyBlue} label="parallel packing" />
        <rect x="98" y="194" width="424" height="28" rx="14" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
        <text x="310" y="213" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Good satin balances coverage and length: no gaps, no pulled fabric, no long exposed floats.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
