"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";

function FrenchKnotDot({
  x,
  y,
  wraps = 2,
  color = ILLUSTRATION.burgundy,
  opacity = 1,
}: {
  x: number;
  y: number;
  wraps?: number;
  color?: string;
  opacity?: number;
}) {
  const radius = 4 + wraps * 1.7;

  return (
    <g opacity={opacity} filter="url(#soft-shadow)">
      <circle cx={x} cy={y} r={radius} fill={color} />
      <path
        d={`M ${x - radius * 0.55} ${y + 1} C ${x - radius * 0.15} ${y - radius * 0.72} ${x + radius * 0.64} ${y - radius * 0.38} ${x + radius * 0.3} ${y + radius * 0.36}`}
        fill="none"
        stroke={ILLUSTRATION.burgundySoft}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      {wraps > 1 && (
        <path
          d={`M ${x - radius * 0.55} ${y + radius * 0.28} C ${x - radius * 0.08} ${y + radius * 0.78} ${x + radius * 0.62} ${y + radius * 0.1} ${x + radius * 0.28} ${y - radius * 0.5}`}
          fill="none"
          stroke={ILLUSTRATION.creamDeeper}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
      )}
    </g>
  );
}

function ScatterKnots() {
  const knots = [
    { x: 116, y: 118, wraps: 1, color: ILLUSTRATION.burgundy },
    { x: 156, y: 148, wraps: 2, color: ILLUSTRATION.threadAlt },
    { x: 206, y: 105, wraps: 3, color: ILLUSTRATION.burgundy },
    { x: 280, y: 154, wraps: 1, color: ILLUSTRATION.threadAlt },
    { x: 338, y: 111, wraps: 2, color: ILLUSTRATION.burgundySoft },
    { x: 412, y: 145, wraps: 3, color: ILLUSTRATION.burgundy },
    { x: 468, y: 104, wraps: 2, color: ILLUSTRATION.threadAlt },
  ];

  return (
    <g>
      {knots.map((knot) => (
        <FrenchKnotDot key={`${knot.x}-${knot.y}`} {...knot} />
      ))}
    </g>
  );
}

export function FrenchKnotFinishedAppearance() {
  return (
    <IllustrationFrame caption="Finished French knots - small raised dots, from tiny seed texture to bold centers.">
      <SvgRoot viewBox="0 0 600 270" aria-label="Finished French knots on flat batiste fabric">
        <FlatFabric x={38} y={42} width={524} height={184} />
        <path
          d="M 82 186 C 140 126 190 124 248 176 C 302 226 388 116 512 150"
          fill="none"
          stroke={ILLUSTRATION.sage}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.65"
        />
        <ScatterKnots />
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          <text x={180} y={240} textAnchor="middle">
            one wrap: tiny seed dot
          </text>
          <text x={420} y={240} textAnchor="middle">
            two or three wraps: larger accent
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function FrenchKnotNeedlePath({
  step = 2,
  showLabels = true,
}: {
  step?: number;
  showLabels?: boolean;
}) {
  const current = Math.min(Math.max(step, 1), 5);
  const knotX = 300;
  const knotY = 151;
  const reinsertionX = 318;

  return (
    <SvgRoot viewBox="0 0 600 290" aria-label="French knot needle path diagram">
      <FlatFabric x={42} y={48} width={516} height={188} />
      <circle cx={knotX} cy={knotY} r="5" fill={ILLUSTRATION.gold} />
      <circle cx={reinsertionX} cy={knotY + 4} r="4" fill={ILLUSTRATION.burgundy} opacity="0.64" />
      {current >= 1 && (
        <path
          d={`M ${knotX} 230 C ${knotX - 26} 196 ${knotX - 20} 174 ${knotX} ${knotY}`}
          fill="none"
          stroke={ILLUSTRATION.threadAlt}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}
      {current >= 2 && (
        <>
          <Needle x={238} y={122} angle={10} length={138} label={showLabels ? "wrap near fabric" : undefined} />
          {[0, 1, 2].slice(0, current >= 3 ? 3 : 2).map((index) => (
            <ellipse
              key={index}
              cx={304 + index * 7}
              cy={134 - index}
              rx="7"
              ry="14"
              fill="none"
              stroke={index === 2 ? ILLUSTRATION.burgundySoft : ILLUSTRATION.burgundy}
              strokeWidth="2.4"
              transform={`rotate(-24 ${304 + index * 7} ${134 - index})`}
            />
          ))}
        </>
      )}
      {current >= 4 && (
        <>
          <DirectionArrow x1={360} y1={132} x2={reinsertionX + 6} y2={knotY + 2} color={ILLUSTRATION.dustyBlue} label="reinsert close" />
          <path
            d={`M ${318} ${151} C ${360} ${190} ${342} 218 ${310} 230`}
            fill="none"
            stroke={ILLUSTRATION.threadAlt}
            strokeWidth="2"
            strokeDasharray="5 4"
            opacity="0.56"
          />
        </>
      )}
      {current >= 5 && <FrenchKnotDot x={knotX + 6} y={knotY + 2} wraps={2} color={ILLUSTRATION.burgundy} />}
      {showLabels && (
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          <text x={300} y={32} textAnchor="middle">
            Come up, wrap one to three times, reinsert close to the exit, and pull wraps down into a dot.
          </text>
          <text x={knotX - 14} y={knotY + 26} textAnchor="end">
            exit
          </text>
          <text x={reinsertionX + 14} y={knotY + 30}>
            close re-entry
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

const FRENCH_KNOT_STEPS = [
  {
    title: "Bring the needle up",
    body: "Come up exactly where the dot belongs. Keep the fabric flat and leave enough thread slack to wrap comfortably.",
  },
  {
    title: "Wrap near the fabric",
    body: "Wrap the thread around the needle one to three times close to the fabric surface. One wrap is tiny; three wraps are bold.",
  },
  {
    title: "Hold the wraps down",
    body: "Use your non-stitching hand to guide the wraps down the needle so they sit against the fabric instead of floating in the air.",
  },
  {
    title: "Reinsert close to the exit",
    body: "Put the needle back down very close to the original hole, but not inside the same hole. The small offset keeps the knot anchored.",
  },
  {
    title: "Pull into a dot",
    body: "Pull the needle and thread to the back while holding the wraps steady. Stop as soon as the knot seats as a rounded dot.",
  },
];

export function FrenchKnotConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => {
      setStep((value) => {
        if (value >= FRENCH_KNOT_STEPS.length - 1) {
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
      caption={`Step ${step + 1} of ${FRENCH_KNOT_STEPS.length}: ${FRENCH_KNOT_STEPS[step].title}`}
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
            onClick={() => setStep((value) => Math.min(FRENCH_KNOT_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= FRENCH_KNOT_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{FRENCH_KNOT_STEPS.length}
          </span>
        </>
      }
    >
      <FrenchKnotNeedlePath step={step + 1} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {FRENCH_KNOT_STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

function TensionKnotSample({
  x,
  label,
  kind,
}: {
  x: number;
  label: string;
  kind: "loose" | "ideal" | "tight" | "same-hole";
}) {
  return (
    <g transform={`translate(${x}, 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      <rect x="0" y="16" width="140" height="82" rx="4" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      {kind === "loose" && (
        <>
          <circle cx="70" cy="58" r="12" fill="none" stroke={ILLUSTRATION.burgundySoft} strokeWidth="2.4" />
          <path d="M 64 74 C 84 88 105 80 113 64" fill="none" stroke={ILLUSTRATION.burgundySoft} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {kind === "ideal" && <FrenchKnotDot x={70} y={58} wraps={2} color={ILLUSTRATION.burgundy} />}
      {kind === "tight" && (
        <>
          <FrenchKnotDot x={70} y={58} wraps={2} color={ILLUSTRATION.burgundy} />
          <path d="M 34 78 C 58 92 86 92 110 78" fill="none" stroke={ILLUSTRATION.sage} strokeDasharray="3 2" strokeWidth="1.4" />
        </>
      )}
      {kind === "same-hole" && (
        <>
          <circle cx="70" cy="58" r="10" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.8" strokeDasharray="2 2" />
          <DirectionArrow x1={70} y1={48} x2={70} y2={78} color={ILLUSTRATION.burgundy} label="falls through" />
        </>
      )}
    </g>
  );
}

export function FrenchKnotTensionDiagram() {
  return (
    <IllustrationFrame caption="French knot tension - snug wraps make a dot; hard pulling puckers or buries it.">
      <SvgRoot viewBox="0 0 640 150" aria-label="French knot tension examples">
        <TensionKnotSample x={0} label="Too loose" kind="loose" />
        <TensionKnotSample x={160} label="Ideal" kind="ideal" />
        <TensionKnotSample x={320} label="Too tight" kind="tight" />
        <TensionKnotSample x={480} label="Same hole" kind="same-hole" />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too loose:</strong> wraps float into a loop instead of a bead.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> a round dot sits on the fabric without puckering.
        </li>
        <li>
          <strong className="text-ink">Too tight:</strong> the fabric dimples around the knot.
        </li>
        <li>
          <strong className="text-ink">Same hole:</strong> the knot can pull through to the back.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function FrenchKnotMistakeDiagrams() {
  const mistakes = [
    {
      title: "Re-entered same hole",
      desc: "The knot disappears or loosens because it has no fabric bridge to anchor it.",
      kind: "hole" as const,
    },
    {
      title: "Wraps too high",
      desc: "Wrapping far from the fabric lets the thread tangle before it seats.",
      kind: "high" as const,
    },
    {
      title: "Too many wraps",
      desc: "A beginner knot becomes bulky and irregular when wraps pile up.",
      kind: "many" as const,
    },
    {
      title: "Thread not controlled",
      desc: "Letting go while pulling creates a tail or noose around the dot.",
      kind: "tail" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common French knot mistakes - keep wraps low, close, and controlled.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 126" aria-label={mistake.title} className="max-w-full">
              <FlatFabric x={12} y={14} width={196} height={78} showGrain={false} />
              {mistake.kind === "hole" && (
                <>
                  <circle cx="110" cy="54" r="10" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.8" strokeDasharray="2 2" />
                  <DirectionArrow x1={110} y1={39} x2={110} y2={75} color={ILLUSTRATION.burgundy} label="same hole" />
                </>
              )}
              {mistake.kind === "high" && (
                <>
                  <Needle x={62} y={34} angle={14} length={110} />
                  <ellipse cx="112" cy="45" rx="10" ry="17" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.2" transform="rotate(-25 112 45)" />
                  <line x1="112" y1="64" x2="112" y2="84" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" />
                </>
              )}
              {mistake.kind === "many" && (
                <>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <FrenchKnotDot key={index} x={92 + index * 9} y={56 + (index % 2) * 3} wraps={2} color={ILLUSTRATION.burgundySoft} />
                  ))}
                </>
              )}
              {mistake.kind === "tail" && (
                <>
                  <FrenchKnotDot x={100} y={58} wraps={2} color={ILLUSTRATION.burgundy} />
                  <path d="M 108 58 C 146 44 160 70 132 82" fill="none" stroke={ILLUSTRATION.burgundySoft} strokeWidth="2" strokeLinecap="round" />
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

export function FrenchKnotWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="French knots with smocking - dots sit on the face above cable or trellis lines as flower centers, seeds, or accents.">
      <SvgRoot viewBox="0 0 600 250" aria-label="French knots placed above smocking rows">
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
        {[132, 212, 292, 372, 452].map((x) => (
          <FrenchKnotDot key={x} x={x} y={82} wraps={2} color={x % 3 === 0 ? ILLUSTRATION.threadAlt : ILLUSTRATION.burgundy} />
        ))}
        <DirectionArrow x1={302} y1={152} x2={302} y2={92} color={ILLUSTRATION.gold} label="surface dots" />
        <text x={300} y={230} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Work knots after the smocking band is stable so the dots remain round and visible.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function FrenchKnotTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why French knots hold - a tiny fabric bridge traps the wrapped thread into a bead.">
      <SvgRoot viewBox="0 0 600 230" aria-label="Theory diagram for French knot stitch">
        <FlatFabric x={42} y={44} width={516} height={142} />
        <circle cx="266" cy="118" r="5" fill={ILLUSTRATION.gold} />
        <circle cx="326" cy="122" r="5" fill={ILLUSTRATION.burgundy} opacity="0.65" />
        <path d="M 266 118 C 286 93 308 93 326 122" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.2" strokeLinecap="round" />
        <FrenchKnotDot x={296} y={112} wraps={2} color={ILLUSTRATION.burgundy} />
        <DirectionArrow x1={235} y1={82} x2={267} y2={112} color={ILLUSTRATION.dustyBlue} label="exit" />
        <DirectionArrow x1={360} y1={84} x2={326} y2={118} color={ILLUSTRATION.sage} label="near re-entry" />
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          <text x={300} y={26} textAnchor="middle">
            The knot is not tied in air; it is anchored by a tiny bridge of fabric between two holes.
          </text>
          <text x={300} y={210} textAnchor="middle">
            Wrap count changes scale, but close re-entry and controlled tension make the dot reliable.
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}
