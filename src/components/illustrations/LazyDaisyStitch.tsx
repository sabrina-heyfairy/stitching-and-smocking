"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";

function LazyDaisyPetal({
  cx,
  cy,
  length = 64,
  width = 30,
  angle = 0,
  color = ILLUSTRATION.burgundy,
  tackColor = ILLUSTRATION.gold,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  length?: number;
  width?: number;
  angle?: number;
  color?: string;
  tackColor?: string;
  opacity?: number;
}) {
  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`} opacity={opacity}>
      <path
        d={`M ${cx} ${cy} C ${cx - width} ${cy - length * 0.34} ${cx - width * 0.5} ${cy - length} ${cx} ${cy - length} C ${cx + width * 0.5} ${cy - length} ${cx + width} ${cy - length * 0.34} ${cx} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#soft-shadow)"
      />
      <path
        d={`M ${cx} ${cy - length} L ${cx} ${cy - length - 18}`}
        fill="none"
        stroke={tackColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="3.5" fill={color} />
      <circle cx={cx} cy={cy - length} r="3.2" fill={tackColor} />
    </g>
  );
}

function DaisyFlower({ x = 300, y = 164 }: { x?: number; y?: number }) {
  const petals = [
    { angle: 0, color: ILLUSTRATION.burgundy },
    { angle: 45, color: ILLUSTRATION.threadAlt },
    { angle: 90, color: ILLUSTRATION.burgundy },
    { angle: 135, color: ILLUSTRATION.threadAlt },
    { angle: 180, color: ILLUSTRATION.burgundySoft },
    { angle: 225, color: ILLUSTRATION.threadAlt },
    { angle: 270, color: ILLUSTRATION.burgundy },
    { angle: 315, color: ILLUSTRATION.burgundySoft },
  ];

  return (
    <g>
      {petals.map((petal) => (
        <LazyDaisyPetal key={petal.angle} cx={x} cy={y} length={50} width={22} angle={petal.angle} color={petal.color} />
      ))}
      <circle cx={x} cy={y} r="10" fill={ILLUSTRATION.gold} filter="url(#soft-shadow)" />
    </g>
  );
}

export function LazyDaisyFinishedAppearance() {
  return (
    <IllustrationFrame caption="Finished lazy daisy - detached chain loops held by tiny tack stitches.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished lazy daisy stitch on flat batiste fabric">
        <FlatFabric x={38} y={42} width={524} height={184} />
        <path
          d="M 90 190 C 144 148 186 136 235 162 C 304 197 363 126 506 102"
          fill="none"
          stroke={ILLUSTRATION.sage}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <DaisyFlower x={202} y={148} />
        <LazyDaisyPetal cx={376} cy={174} length={68} width={26} angle={-28} color={ILLUSTRATION.threadAlt} />
        <LazyDaisyPetal cx={432} cy={164} length={58} width={24} angle={18} color={ILLUSTRATION.burgundy} />
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          <text x={203} y={240} textAnchor="middle">
            petals radiate from one center
          </text>
          <text x={415} y={240} textAnchor="middle">
            single leaves or sprigs
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function LazyDaisyNeedlePath({
  step = 2,
  showLabels = true,
}: {
  step?: number;
  showLabels?: boolean;
}) {
  const current = Math.min(Math.max(step, 1), 5);
  const baseX = 300;
  const baseY = 184;
  const tipY = 92;

  return (
    <SvgRoot viewBox="0 0 600 300" aria-label="Lazy daisy stitch needle path diagram">
      <FlatFabric x={42} y={48} width={516} height={194} />
      <circle cx={baseX} cy={baseY} r="5" fill={ILLUSTRATION.gold} />
      {current >= 1 && (
        <path
          d={`M ${baseX} 242 C ${baseX - 10} 220 ${baseX - 6} 204 ${baseX} ${baseY}`}
          fill="none"
          stroke={ILLUSTRATION.threadAlt}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}
      {current >= 2 && (
        <>
          <path
            d={`M ${baseX} ${baseY} C ${baseX - 70} 130 ${baseX - 42} ${tipY} ${baseX} ${tipY} C ${baseX + 42} ${tipY} ${baseX + 70} 130 ${baseX} ${baseY}`}
            fill="none"
            stroke={ILLUSTRATION.burgundy}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={current < 4 ? "7 4" : undefined}
          />
          <Needle x={baseX - 54} y={baseY - 12} angle={-36} length={116} label={showLabels ? "down near same hole" : undefined} />
        </>
      )}
      {current >= 3 && (
        <>
          <DirectionArrow x1={baseX - 34} y1={baseY - 20} x2={baseX - 2} y2={tipY + 18} color={ILLUSTRATION.dustyBlue} label="hold loop" />
          <circle cx={baseX} cy={tipY} r="5" fill={ILLUSTRATION.gold} />
        </>
      )}
      {current >= 4 && (
        <>
          <Needle x={baseX - 22} y={tipY + 28} angle={-78} length={76} label={showLabels ? "come up inside loop" : undefined} />
          <path d={`M ${baseX} ${tipY} L ${baseX} ${tipY - 25}`} stroke={ILLUSTRATION.gold} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {current >= 5 && (
        <>
          <LazyDaisyPetal cx={baseX} cy={baseY} length={92} width={36} angle={0} color={ILLUSTRATION.burgundy} />
          <DirectionArrow x1={baseX + 58} y1={tipY - 8} x2={baseX + 18} y2={tipY - 18} color={ILLUSTRATION.sage} label="tiny tack" />
        </>
      )}
      {showLabels && (
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          <text x={300} y={32} textAnchor="middle">
            Up, make a loop, go down near the same hole, come up inside the loop tip, then tack it.
          </text>
          <text x={baseX - 16} y={baseY + 24} textAnchor="end">
            shared base
          </text>
          <text x={baseX + 14} y={tipY - 30}>
            tack point
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

const LAZY_DAISY_STEPS = [
  {
    title: "Bring the needle up",
    body: "Come up at the base of the petal or leaf. This point will also be the down point for the loop.",
  },
  {
    title: "Form the loop",
    body: "Lay the thread in a soft loop, then put the needle down close to the same hole while holding the loop open with your finger.",
  },
  {
    title: "Catch the loop tip",
    body: "Bring the needle up inside the loop at the petal tip. The loop should sit around the needle, not under it.",
  },
  {
    title: "Make the tiny tack",
    body: "Take a small straight stitch over the loop tip. The tack anchors the detached chain without flattening the petal.",
  },
  {
    title: "Repeat for petals",
    body: "Work each new loop from the flower center or along a stem. Keep tack length and petal scale consistent.",
  },
];

export function LazyDaisyConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => {
      setStep((value) => {
        if (value >= LAZY_DAISY_STEPS.length - 1) {
          setPlaying(false);
          return value;
        }
        return value + 1;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [playing, reduce]);

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${LAZY_DAISY_STEPS.length}: ${LAZY_DAISY_STEPS[step].title}`}
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
            onClick={() => setStep((value) => Math.min(LAZY_DAISY_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= LAZY_DAISY_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{LAZY_DAISY_STEPS.length}
          </span>
        </>
      }
    >
      <LazyDaisyNeedlePath step={step + 1} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {LAZY_DAISY_STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

function TensionPetalSample({
  x,
  label,
  kind,
}: {
  x: number;
  label: string;
  kind: "loose" | "ideal" | "tight" | "long-tack";
}) {
  return (
    <g transform={`translate(${x}, 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      <rect x="0" y="16" width="140" height="92" rx="4" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      {kind === "loose" && (
        <path d="M 70 92 C 20 54 48 35 70 42 C 92 35 120 54 70 92" fill="none" stroke={ILLUSTRATION.burgundySoft} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="6 3" />
      )}
      {kind === "ideal" && <LazyDaisyPetal cx={70} cy={94} length={56} width={24} color={ILLUSTRATION.burgundy} />}
      {kind === "tight" && (
        <>
          <LazyDaisyPetal cx={70} cy={94} length={64} width={12} color={ILLUSTRATION.burgundy} />
          <path d="M 45 98 C 60 112 82 112 96 98" fill="none" stroke={ILLUSTRATION.sage} strokeDasharray="3 2" />
        </>
      )}
      {kind === "long-tack" && (
        <>
          <path d="M 70 94 C 38 58 50 40 70 40 C 90 40 102 58 70 94" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 70 40 L 70 12" stroke={ILLUSTRATION.gold} strokeWidth="2.6" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

export function LazyDaisyTensionDiagram() {
  return (
    <IllustrationFrame caption="Lazy daisy tension - leave the loop rounded and secure it with a tiny tack.">
      <SvgRoot viewBox="0 0 640 160" aria-label="Lazy daisy tension examples">
        <TensionPetalSample x={0} label="Too loose" kind="loose" />
        <TensionPetalSample x={160} label="Ideal" kind="ideal" />
        <TensionPetalSample x={320} label="Too tight" kind="tight" />
        <TensionPetalSample x={480} label="Long tack" kind="long-tack" />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too loose:</strong> loop snags and loses petal shape.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> rounded loop with a short visible tack.
        </li>
        <li>
          <strong className="text-ink">Too tight:</strong> loop narrows into a split straight stitch.
        </li>
        <li>
          <strong className="text-ink">Long tack:</strong> the anchor dominates the petal tip.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function LazyDaisyMistakeDiagrams() {
  const mistakes = [
    {
      title: "Loop not held",
      desc: "The working thread slips under the needle and the petal collapses.",
      kind: "held" as const,
    },
    {
      title: "No tack stitch",
      desc: "The detached chain opens because nothing anchors the tip.",
      kind: "no-tack" as const,
    },
    {
      title: "Pulled too tight",
      desc: "The petal becomes a narrow spear instead of a rounded loop.",
      kind: "tight" as const,
    },
    {
      title: "Uneven petals",
      desc: "Different loop sizes make a flower look off-center.",
      kind: "uneven" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common lazy daisy mistakes - control the loop first, then make the tack.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 126" aria-label={mistake.title} className="max-w-full">
              <FlatFabric x={12} y={14} width={196} height={78} showGrain={false} />
              {mistake.kind === "held" && (
                <path d="M 110 84 C 72 42 98 34 110 54 C 122 34 148 42 110 84" fill="none" stroke={ILLUSTRATION.burgundySoft} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="5 3" />
              )}
              {mistake.kind === "no-tack" && (
                <>
                  <path d="M 110 84 C 78 48 92 30 110 30 C 128 30 142 48 110 84" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="110" cy="30" r="6" fill="none" stroke={ILLUSTRATION.gold} strokeDasharray="2 2" />
                </>
              )}
              {mistake.kind === "tight" && <LazyDaisyPetal cx={110} cy={88} length={62} width={10} color={ILLUSTRATION.burgundy} />}
              {mistake.kind === "uneven" && (
                <>
                  <LazyDaisyPetal cx={110} cy={70} length={48} width={18} angle={0} color={ILLUSTRATION.burgundy} />
                  <LazyDaisyPetal cx={110} cy={70} length={28} width={24} angle={85} color={ILLUSTRATION.threadAlt} />
                  <LazyDaisyPetal cx={110} cy={70} length={60} width={16} angle={190} color={ILLUSTRATION.burgundySoft} />
                </>
              )}
            </SvgRoot>
            <p className="mt-1 font-serif text-base text-ink">{mistake.title}</p>
            <p className="text-sm text-ink-muted">{mistake.desc}</p>
          </div>
        ))}
      </div>
    </IllustrationFrame>
  );
}

export function LazyDaisyWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="Lazy daisy with smocking - petals sit as surface embroidery above cable or trellis scaffolding.">
      <SvgRoot viewBox="0 0 600 250" aria-label="Lazy daisy petals placed above smocking rows">
        <FlatFabric x={38} y={36} width={524} height={170} />
        <path
          d="M 78 168 L 110 152 L 142 168 L 174 152 L 206 168 L 238 152 L 270 168 L 302 152 L 334 168 L 366 152 L 398 168 L 430 152 L 462 168 L 494 152 L 526 168"
          fill="none"
          stroke={ILLUSTRATION.dustyBlue}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 92 130 L 132 94 L 172 130 L 212 94 L 252 130 L 292 94 L 332 130 L 372 94 L 412 130 L 452 94 L 492 130"
          fill="none"
          stroke={ILLUSTRATION.sage}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.72"
        />
        <DaisyFlower x={206} y={104} />
        <DaisyFlower x={396} y={104} />
        <DirectionArrow x1={302} y1={154} x2={302} y2={105} color={ILLUSTRATION.gold} label="petals on face" />
        <text x={300} y={230} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Use lazy daisy motifs as surface accents after the smocking row spacing is stable.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function LazyDaisyTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why lazy daisy works - a detached chain becomes a petal when the tip is tacked.">
      <SvgRoot viewBox="0 0 600 230" aria-label="Theory diagram for lazy daisy stitch">
        <FlatFabric x={42} y={44} width={516} height={142} />
        <path
          d="M 300 164 C 232 105 266 72 300 76 C 334 72 368 105 300 164"
          fill="none"
          stroke={ILLUSTRATION.burgundy}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 300 76 L 300 50" stroke={ILLUSTRATION.gold} strokeWidth="3" strokeLinecap="round" />
        <DirectionArrow x1={220} y1={124} x2={288} y2={83} color={ILLUSTRATION.dustyBlue} label="loop holds shape" />
        <DirectionArrow x1={384} y1={75} x2={310} y2={63} color={ILLUSTRATION.sage} label="tack prevents escape" />
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          <text x={300} y={26} textAnchor="middle">
            The base hole creates the loop; the tiny tack turns that loop into a stable detached chain.
          </text>
          <text x={300} y={210} textAnchor="middle">
            Tension must preserve loop volume while the tack controls the petal tip.
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}
