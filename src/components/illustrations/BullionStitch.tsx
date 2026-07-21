"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";
import { FlatFabric } from "@/components/illustrations/FlatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";

const BASE_Y = 150;
const START_X = 145;
const END_X = 455;

function BullionCoil({
  x,
  y,
  length = 110,
  wraps = 10,
  color = ILLUSTRATION.burgundy,
  opacity = 1,
  strokeWidth = 3,
}: {
  x: number;
  y: number;
  length?: number;
  wraps?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  const spacing = length / wraps;

  return (
    <g opacity={opacity}>
      <path
        d={`M ${x} ${y} C ${x + length * 0.25} ${y - 16} ${x + length * 0.75} ${y - 16} ${x + length} ${y}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth + 1.4}
        strokeLinecap="round"
        filter="url(#soft-shadow)"
      />
      {Array.from({ length: wraps }).map((_, index) => {
        const cx = x + index * spacing + spacing / 2;
        return (
          <ellipse
            key={index}
            cx={cx}
            cy={y - 6}
            rx={spacing * 0.38}
            ry="10"
            fill="none"
            stroke={index % 2 === 0 ? ILLUSTRATION.burgundySoft : color}
            strokeWidth={strokeWidth}
            transform={`rotate(-8 ${cx} ${y - 6})`}
          />
        );
      })}
    </g>
  );
}

function RoseCluster({ x = 325, y = 142 }: { x?: number; y?: number }) {
  return (
    <g>
      <BullionCoil x={x - 76} y={y - 9} length={92} wraps={9} color={ILLUSTRATION.burgundy} />
      <BullionCoil x={x - 28} y={y - 44} length={88} wraps={9} color={ILLUSTRATION.threadAlt} />
      <BullionCoil x={x + 20} y={y - 4} length={90} wraps={9} color={ILLUSTRATION.burgundySoft} />
      <BullionCoil x={x - 20} y={y + 24} length={92} wraps={9} color={ILLUSTRATION.burgundy} />
      <circle cx={x + 8} cy={y - 5} r="13" fill={ILLUSTRATION.gold} opacity="0.28" />
    </g>
  );
}

export function BullionFinishedAppearance() {
  return (
    <IllustrationFrame caption="Finished bullion stitch - a raised wrapped coil, often clustered into roses or petals.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished bullion stitch on flat batiste fabric">
        <FlatFabric x={34} y={44} width={532} height={190} />
        <path
          d="M 92 196 C 146 156 176 116 234 140 C 282 159 306 111 360 126 C 416 142 442 101 512 82"
          fill="none"
          stroke={ILLUSTRATION.sage}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.72"
        />
        <BullionCoil x={88} y={166} length={118} wraps={11} color={ILLUSTRATION.burgundy} />
        <BullionCoil x={220} y={131} length={104} wraps={10} color={ILLUSTRATION.threadAlt} />
        <RoseCluster x={388} y={148} />
        <g fontFamily="var(--font-body), sans-serif" fill={ILLUSTRATION.inkMuted} fontSize="10">
          <text x={151} y={210} textAnchor="middle">
            single worm
          </text>
          <text x={397} y={220} textAnchor="middle">
            clustered bullions form a rose
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BullionNeedlePath({
  step = 3,
  showLabels = true,
}: {
  step?: number;
  showLabels?: boolean;
}) {
  const current = Math.min(Math.max(step, 1), 6);
  const wrapCount = current >= 4 ? 11 : current >= 3 ? 6 : 0;

  return (
    <SvgRoot viewBox="0 0 600 300" aria-label="Bullion stitch needle path diagram">
      <FlatFabric x={42} y={52} width={516} height={194} />
      <line
        x1={START_X}
        y1={BASE_Y}
        x2={END_X}
        y2={BASE_Y}
        stroke={ILLUSTRATION.dustyBlue}
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.42"
      />
      <circle cx={START_X} cy={BASE_Y} r="5" fill={ILLUSTRATION.gold} />
      <circle cx={END_X} cy={BASE_Y} r="5" fill={ILLUSTRATION.burgundy} opacity="0.72" />

      {current >= 2 && (
        <path
          d={`M ${END_X} ${BASE_Y} C 393 86 206 86 ${START_X} ${BASE_Y}`}
          fill="none"
          stroke={ILLUSTRATION.threadAlt}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray={current < 5 ? "6 4" : undefined}
          opacity={current < 5 ? 0.62 : 1}
        />
      )}

      {current >= 3 && (
        <g>
          <Needle x={160} y={BASE_Y - 7} angle={0} length={260} label={showLabels ? "needle held through fabric" : undefined} />
          {Array.from({ length: wrapCount }).map((_, index) => {
            const cx = 198 + index * 18;
            return (
              <ellipse
                key={index}
                cx={cx}
                cy={BASE_Y - 7}
                rx="7"
                ry="16"
                fill="none"
                stroke={current === 3 ? ILLUSTRATION.gold : ILLUSTRATION.burgundy}
                strokeWidth="2.5"
                transform={`rotate(-18 ${cx} ${BASE_Y - 7})`}
              />
            );
          })}
        </g>
      )}

      {current >= 5 && <BullionCoil x={204} y={BASE_Y + 1} length={194} wraps={11} color={ILLUSTRATION.burgundy} />}
      {current === 6 && (
        <>
          <DirectionArrow x1={424} y1={BASE_Y - 10} x2={458} y2={BASE_Y - 2} color={ILLUSTRATION.sage} label="seat coil" />
          <path
            d="M 218 179 C 270 202 336 202 388 178"
            fill="none"
            stroke={ILLUSTRATION.sage}
            strokeWidth="1.6"
            strokeDasharray="3 3"
            opacity="0.6"
          />
        </>
      )}

      {showLabels && (
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          <text x={START_X} y={BASE_Y + 25} textAnchor="middle">
            up
          </text>
          <text x={END_X} y={BASE_Y + 25} textAnchor="middle">
            reinsert nearby
          </text>
          <text x={300} y={34} textAnchor="middle">
            Leave a loop, wrap the needle many times, then pull the needle through the wraps.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

const BULLION_STEPS = [
  {
    title: "Bring the needle up",
    body: "Come up where the coil will begin. Bullion needs room: mark both ends before wrapping so the finished worm has a destination.",
  },
  {
    title: "Reinsert near the entry",
    body: "Put the needle down at the far end and bring the point back out at the first hole, leaving the thread as a large working loop on the surface.",
  },
  {
    title: "Wrap the needle",
    body: "Wrap the thread around the needle until the wraps match the distance between the entry and exit points. Keep the wraps touching but not strangling the needle.",
  },
  {
    title: "Pull through slowly",
    body: "Pinch the wraps with your non-stitching hand and draw the needle through. This is the advanced part: pull steadily so the coil does not snarl.",
  },
  {
    title: "Seat the worm",
    body: "Lay the wrapped coil down on the fabric and ease the final thread through until the bullion is firm, rounded, and even from end to end.",
  },
  {
    title: "Cluster for roses",
    body: "Repeat short bullions around a center to build rose petals. Change length and curve so the flower looks natural rather than stacked.",
  },
];

export function BullionConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => {
      setStep((value) => {
        if (value >= BULLION_STEPS.length - 1) {
          setPlaying(false);
          return value;
        }
        return value + 1;
      });
    }, 2500);
    return () => clearInterval(id);
  }, [playing, reduce]);

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${BULLION_STEPS.length}: ${BULLION_STEPS[step].title}`}
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
            onClick={() => setStep((value) => Math.min(BULLION_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= BULLION_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{BULLION_STEPS.length}
          </span>
        </>
      }
    >
      <BullionNeedlePath step={step + 1} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {BULLION_STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

function TensionSample({
  label,
  x,
  kind,
}: {
  label: string;
  x: number;
  kind: "loose" | "ideal" | "tight" | "uneven";
}) {
  const wraps = kind === "loose" ? 6 : kind === "tight" ? 14 : kind === "uneven" ? 9 : 10;
  const length = kind === "tight" ? 84 : kind === "loose" ? 126 : 104;

  return (
    <g transform={`translate(${x}, 18)`}>
      <text x="70" y="0" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      <rect x="0" y="16" width="140" height="82" rx="4" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      <BullionCoil
        x={18}
        y={62}
        length={length}
        wraps={wraps}
        color={kind === "ideal" ? ILLUSTRATION.burgundy : ILLUSTRATION.burgundySoft}
        opacity={kind === "uneven" ? 0.86 : 1}
        strokeWidth={kind === "loose" ? 2 : 2.6}
      />
      {kind === "tight" && <path d="M 28 75 C 58 94 88 94 118 75" fill="none" stroke={ILLUSTRATION.sage} strokeWidth="1.2" strokeDasharray="3 2" />}
      {kind === "uneven" && <circle cx="76" cy="55" r="12" fill="none" stroke={ILLUSTRATION.gold} strokeWidth="1.4" strokeDasharray="3 2" />}
    </g>
  );
}

export function BullionTensionDiagram() {
  return (
    <IllustrationFrame caption="Bullion tension - wraps must slide over the needle but still pack into a firm coil.">
      <SvgRoot viewBox="0 0 640 150" aria-label="Bullion stitch tension examples">
        <TensionSample x={0} label="Too loose" kind="loose" />
        <TensionSample x={160} label="Ideal" kind="ideal" />
        <TensionSample x={320} label="Too tight" kind="tight" />
        <TensionSample x={480} label="Uneven" kind="uneven" />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too loose:</strong> wraps open into beads instead of one coil.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> wraps touch, slide, and seat into a smooth worm.
        </li>
        <li>
          <strong className="text-ink">Too tight:</strong> the needle drags, snarls, or puckers fabric.
        </li>
        <li>
          <strong className="text-ink">Uneven:</strong> inconsistent wrap pressure makes a fat spot.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function BullionMistakeDiagrams() {
  const mistakes = [
    {
      title: "Not enough wraps",
      desc: "The coil cannot cover the stitch length, so the end thread shows.",
      kind: "short" as const,
    },
    {
      title: "Wraps strangled",
      desc: "Tight wraps grip the needle and kink as the needle is pulled through.",
      kind: "tight" as const,
    },
    {
      title: "Loop lost",
      desc: "Without a surface loop, the wraps have no controlled path to settle onto.",
      kind: "loop" as const,
    },
    {
      title: "Rose petals stacked",
      desc: "All bullions have the same length and angle, so the rose looks mechanical.",
      kind: "rose" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common bullion mistakes - most happen before the needle is pulled through.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 126" aria-label={mistake.title} className="max-w-full">
              <FlatFabric x={12} y={14} width={196} height={78} showGrain={false} />
              {mistake.kind === "short" && (
                <>
                  <BullionCoil x={42} y={54} length={82} wraps={5} color={ILLUSTRATION.burgundySoft} />
                  <line x1="124" y1="54" x2="178" y2="54" stroke={ILLUSTRATION.burgundy} strokeWidth="2.4" strokeLinecap="round" />
                </>
              )}
              {mistake.kind === "tight" && (
                <>
                  <BullionCoil x={54} y={58} length={82} wraps={13} color={ILLUSTRATION.burgundy} />
                  <path d="M 64 78 C 88 98 120 98 146 78" fill="none" stroke={ILLUSTRATION.sage} strokeWidth="1.2" strokeDasharray="3 2" />
                </>
              )}
              {mistake.kind === "loop" && (
                <>
                  <Needle x={46} y={51} angle={0} length={118} />
                  <path d="M 52 70 L 168 70" stroke={ILLUSTRATION.burgundy} strokeWidth="2" strokeLinecap="round" />
                  <text x="110" y="85" textAnchor="middle" fontSize="8" fill={ILLUSTRATION.burgundy} fontFamily="var(--font-body), sans-serif">
                    no working loop
                  </text>
                </>
              )}
              {mistake.kind === "rose" && (
                <>
                  <BullionCoil x={58} y={38} length={72} wraps={8} color={ILLUSTRATION.burgundy} />
                  <BullionCoil x={58} y={56} length={72} wraps={8} color={ILLUSTRATION.burgundy} />
                  <BullionCoil x={58} y={74} length={72} wraps={8} color={ILLUSTRATION.burgundy} />
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

export function BullionWithSmockingDiagram() {
  return (
    <IllustrationFrame caption="Bullions with smocking - raised roses sit above cable or trellis rows, not inside the pleat control stitches.">
      <SvgRoot viewBox="0 0 600 260" aria-label="Bullion roses placed above smocking rows">
        <FlatFabric x={38} y={38} width={524} height={178} />
        <path
          d="M 74 176 L 106 160 L 138 176 L 170 160 L 202 176 L 234 160 L 266 176 L 298 160 L 330 176 L 362 160 L 394 176 L 426 160 L 458 176 L 490 160 L 522 176"
          fill="none"
          stroke={ILLUSTRATION.dustyBlue}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 88 132 L 126 96 L 164 132 L 202 96 L 240 132 L 278 96 L 316 132 L 354 96 L 392 132 L 430 96 L 468 132"
          fill="none"
          stroke={ILLUSTRATION.sage}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.72"
        />
        <RoseCluster x={190} y={92} />
        <RoseCluster x={386} y={90} />
        <DirectionArrow x1={300} y1={170} x2={300} y2={120} color={ILLUSTRATION.gold} label="above the control row" />
        <text x={300} y={238} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Keep the bullion embroidery on the fabric face after smocking tension is settled.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function BullionTheoryDiagram() {
  return (
    <IllustrationFrame caption="Why bullion works - packed wraps convert a straight stitch into a raised spring-like coil.">
      <SvgRoot viewBox="0 0 600 235" aria-label="Theory diagram for bullion stitch">
        <FlatFabric x={42} y={44} width={516} height={146} />
        <DirectionArrow x1={112} y1={154} x2={218} y2={104} color={ILLUSTRATION.dustyBlue} label="thread loop" />
        <Needle x={236} y={119} angle={0} length={146} />
        <BullionCoil x={220} y={134} length={160} wraps={12} color={ILLUSTRATION.burgundy} />
        <DirectionArrow x1={390} y1={116} x2={466} y2={141} color={ILLUSTRATION.sage} label="pull through" />
        <g fontFamily="var(--font-body), sans-serif" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          <text x={300} y={26} textAnchor="middle">
            Each wrap becomes one ridge. More wraps create a longer, denser bullion.
          </text>
          <text x={300} y={214} textAnchor="middle">
            The stitch fails when the wraps cannot slide, or when they slide with different tension.
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}
