"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";
import { PleatFabric } from "./PleatFabric";
import { DirectionArrow, Needle } from "./Needle";
import { wavePoints } from "@/components/illustrations/WaveStitch";

type Point = { x: number; y: number };

const TRELLIS_COUNT = 17;
const TRELLIS_START_X = 40;
const TRELLIS_WIDTH = 520;
const TRELLIS_PLEAT_W = TRELLIS_WIDTH / TRELLIS_COUNT;
const TRELLIS_MID_Y = 150;
const TRELLIS_AMP = 44;
const TRELLIS_TOP_Y = TRELLIS_MID_Y - TRELLIS_AMP;
const TRELLIS_BOTTOM_Y = TRELLIS_MID_Y + TRELLIS_AMP;

function pathD(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function trellisPoints(count = TRELLIS_COUNT) {
  const upper = wavePoints(count, TRELLIS_START_X, TRELLIS_PLEAT_W, TRELLIS_MID_Y, TRELLIS_TOP_Y);
  const lower = upper.map((p) => ({ x: p.x, y: TRELLIS_MID_Y * 2 - p.y }));
  return { upper, lower };
}

function RowGuides({
  startX = TRELLIS_START_X,
  width = TRELLIS_WIDTH,
  topY = TRELLIS_TOP_Y,
  midY = TRELLIS_MID_Y,
  bottomY = TRELLIS_BOTTOM_Y,
  showLabels = false,
}: {
  startX?: number;
  width?: number;
  topY?: number;
  midY?: number;
  bottomY?: number;
  showLabels?: boolean;
}) {
  return (
    <g fontFamily="var(--font-body), sans-serif">
      {[
        { y: topY, label: "upper rail" },
        { y: midY, label: "shared vertices" },
        { y: bottomY, label: "lower rail" },
      ].map((row) => (
        <g key={row.label}>
          <line
            x1={startX}
            y1={row.y}
            x2={startX + width}
            y2={row.y}
            stroke={ILLUSTRATION.dustyBlue}
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity={row.label === "shared vertices" ? 0.7 : 0.45}
          />
          {showLabels && (
            <text
              x={startX - 8}
              y={row.y + 3}
              textAnchor="end"
              fontSize="8"
              fill={ILLUSTRATION.dustyBlue}
            >
              {row.label}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

function TrellisPath({
  points,
  color,
  opacity = 1,
  strokeWidth = 3,
}: {
  points: Point[];
  color: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  if (points.length < 2) return null;
  return (
    <path
      d={pathD(points)}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

function VertexDots({ points, color }: { points: Point[]; color: string }) {
  return (
    <g>
      {points.map((p, i) => (
        <circle
          key={`${p.x}-${i}`}
          cx={p.x}
          cy={p.y}
          r={i % 8 === 0 ? 4 : 2.6}
          fill={i % 8 === 0 ? ILLUSTRATION.gold : color}
          stroke={ILLUSTRATION.fabric}
          strokeWidth="0.8"
        />
      ))}
    </g>
  );
}

export function FinishedTrellisAppearance() {
  const { upper, lower } = trellisPoints();

  return (
    <IllustrationFrame caption="Finished trellis — mirror-image waves share center vertices and close into diamond lattice units.">
      <SvgRoot viewBox="0 0 600 280" aria-label="Finished trellis stitch on pleated fabric">
        <PleatFabric
          count={TRELLIS_COUNT}
          startX={TRELLIS_START_X}
          y={48}
          width={TRELLIS_WIDTH}
          height={190}
          showLabels={false}
        />
        <RowGuides showLabels />
        <TrellisPath points={upper} color={ILLUSTRATION.threadAlt} opacity={0.28} strokeWidth={5} />
        <TrellisPath points={lower} color={ILLUSTRATION.thread} opacity={0.25} strokeWidth={5} />
        <TrellisPath points={upper} color={ILLUSTRATION.threadAlt} />
        <TrellisPath points={lower} color={ILLUSTRATION.thread} />
        <VertexDots points={upper} color={ILLUSTRATION.threadAlt} />
        <VertexDots points={lower} color={ILLUSTRATION.thread} />
        {[0, 8, 16].map((i) => (
          <text
            key={i}
            x={upper[i].x}
            y={TRELLIS_MID_Y + 18}
            textAnchor="middle"
            fontSize="8"
            fill={ILLUSTRATION.inkMuted}
            fontFamily="var(--font-body), sans-serif"
          >
            meet
          </text>
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function TrellisPleatRowsDiagram() {
  const { upper, lower } = trellisPoints();
  const detailUpper = upper.slice(0, 9);
  const detailLower = lower.slice(0, 9);

  return (
    <IllustrationFrame caption="Trellis row diagram — work an upper wave and its inverted mate so their troughs meet on the center row.">
      <SvgRoot viewBox="0 0 600 270" aria-label="Pleat and row diagram for trellis stitch">
        <PleatFabric
          count={TRELLIS_COUNT}
          startX={TRELLIS_START_X}
          y={42}
          width={TRELLIS_WIDTH}
          height={185}
          showLabels
          showNeedleNumbers
        />
        <RowGuides showLabels />
        <TrellisPath points={detailUpper} color={ILLUSTRATION.threadAlt} strokeWidth={3.2} />
        <TrellisPath points={detailLower} color={ILLUSTRATION.thread} strokeWidth={3.2} />
        <DirectionArrow
          x1={detailUpper[1].x}
          y1={detailUpper[1].y - 8}
          x2={detailUpper[4].x}
          y2={detailUpper[4].y - 8}
          color={ILLUSTRATION.burgundy}
          label="upper wave"
        />
        <DirectionArrow
          x1={detailLower[1].x}
          y1={detailLower[1].y + 10}
          x2={detailLower[4].x}
          y2={detailLower[4].y + 10}
          color={ILLUSTRATION.dustyBlue}
          label="inverted lower wave"
        />
        <text
          x={detailUpper[0].x}
          y={TRELLIS_MID_Y - 14}
          textAnchor="middle"
          fontSize="9"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          shared start
        </text>
        <text
          x={detailUpper[8].x}
          y={TRELLIS_MID_Y - 14}
          textAnchor="middle"
          fontSize="9"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          shared close
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function TrellisNeedlePath({
  showLabels = true,
  step = 8,
}: {
  showLabels?: boolean;
  step?: number;
}) {
  const { upper, lower } = trellisPoints();
  const visible = Math.min(Math.max(step, 1), 16);
  const upperCount = Math.min(visible + 1, 9);
  const lowerCount = visible <= 8 ? 1 : Math.min(visible - 7, 9);
  const onUpper = visible <= 8;
  const activePoints = onUpper ? upper : lower;
  const activeIndex = onUpper ? visible - 1 : visible - 9;
  const current = activePoints[Math.max(activeIndex, 0)];
  const next = activePoints[Math.min(activeIndex + 1, 8)];

  return (
    <SvgRoot viewBox="0 0 600 280" aria-label="Trellis stitch needle path diagram">
      <PleatFabric
        count={TRELLIS_COUNT}
        startX={TRELLIS_START_X}
        y={48}
        width={TRELLIS_WIDTH}
        height={190}
        showLabels={false}
        highlightPleat={Math.min(Math.max(activeIndex + 1, 1), TRELLIS_COUNT)}
      />
      <RowGuides showLabels={showLabels} />
      <TrellisPath points={upper.slice(0, upperCount)} color={ILLUSTRATION.threadAlt} opacity={0.35} />
      {lowerCount > 1 && (
        <TrellisPath points={lower.slice(0, lowerCount)} color={ILLUSTRATION.thread} opacity={0.35} />
      )}
      {current && next && (
        <>
          <TrellisPath
            points={[current, next]}
            color={ILLUSTRATION.gold}
            strokeWidth={4}
          />
          <DirectionArrow
            x1={current.x}
            y1={current.y}
            x2={next.x}
            y2={next.y}
            color={ILLUSTRATION.burgundy}
            label={onUpper ? "upper wave" : "mirror row"}
          />
          <Needle
            x={next.x - 8}
            y={next.y + (onUpper ? -28 : 22)}
            angle={next.y < current.y ? -30 : 30}
            length={54}
          />
        </>
      )}
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x={300} y={28} textAnchor="middle">
            Step the upper wave first; return to the shared vertex, then mirror the lower wave.
          </text>
          <text x={TRELLIS_START_X + TRELLIS_WIDTH - 8} y={TRELLIS_MID_Y - 10} textAnchor="end">
            gold dots = shared diamond vertices
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

const TRELLIS_STEPS = [
  {
    title: "Mark the shared vertex row",
    body: "Trellis is easiest when the center gathering row is visible. The upper wave starts on that row, climbs to the upper rail, and returns to the same center row.",
  },
  {
    title: "Work the upper rising slope",
    body: "Use the same wave-of-4 rhythm you already know: one pleat to the right, one measured height step upward. Keep every bite in the top third of the mountain.",
  },
  {
    title: "Close the upper wave at the center",
    body: "Descend evenly back to the shared row. This point is not decorative; it is the hinge that the lower mirror row must share.",
  },
  {
    title: "Invert the lower wave",
    body: "From the same center point, work downward in mirror image. The lower row is not offset; it shares the same starting and closing vertices.",
  },
  {
    title: "Complete the diamond",
    body: "The upper and lower waves now enclose one diamond. Ease the thread until the sides are crisp but the pleats remain round.",
  },
  {
    title: "Repeat and center the lattice",
    body: "Continue from shared vertex to shared vertex. If the field is for a yoke or bishop, plan the repeats so a diamond or a shared vertex lands at center front.",
  },
];

export function TrellisConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= TRELLIS_STEPS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2500);
    return () => clearInterval(id);
  }, [playing, reduce]);

  const pathStep = [1, 4, 8, 10, 13, 16][step] ?? 8;

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${TRELLIS_STEPS.length}: ${TRELLIS_STEPS[step].title}`}
      controls={
        <>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setStep((s) => Math.min(TRELLIS_STEPS.length - 1, s + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= TRELLIS_STEPS.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{TRELLIS_STEPS.length}
          </span>
        </>
      }
    >
      <TrellisNeedlePath step={pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {TRELLIS_STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

export function TrellisFrontBackCross() {
  const { upper, lower } = trellisPoints();

  return (
    <IllustrationFrame caption="Front, back, and cross-section — trellis is a front-face diamond lattice with diagonal reverse carries.">
      <SvgRoot viewBox="0 0 600 315" aria-label="Trellis stitch front, back, and cross-section">
        <text x={100} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Front
        </text>
        <g transform="translate(5,28) scale(0.34)">
          <PleatFabric count={9} startX={20} y={30} width={360} height={150} showLabels={false} />
          <path d={pathD(upper.slice(0, 9).map((p) => ({ x: p.x - 20, y: p.y - 40 })))} fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={pathD(lower.slice(0, 9).map((p) => ({ x: p.x - 20, y: p.y - 40 })))} fill="none" stroke={ILLUSTRATION.thread} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <text x={300} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Back
        </text>
        <g transform="translate(210,38)">
          <rect x={0} y={0} width={180} height={112} rx={4} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          {[15, 42, 69, 96, 123, 150].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={i % 2 === 0 ? 76 : 35}
              x2={x + 22}
              y2={i % 2 === 0 ? 35 : 76}
              stroke={i % 2 === 0 ? ILLUSTRATION.threadAlt : ILLUSTRATION.thread}
              strokeWidth="2"
              opacity="0.72"
            />
          ))}
          <text x={90} y={134} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Reverse carries zigzag; they should not cinch the diamonds.
          </text>
        </g>

        <text x={500} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Cross-section
        </text>
        <g transform="translate(420,42)">
          <line x1={0} y1={24} x2={144} y2={24} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          <line x1={0} y1={60} x2={144} y2={60} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          <line x1={0} y1={96} x2={144} y2={96} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          {[10, 36, 62, 88, 114].map((x) => (
            <path
              key={x}
              d={`M ${x} 18 Q ${x + 8} 58 ${x + 16} 18`}
              fill="none"
              stroke={ILLUSTRATION.fabricShadow}
              strokeWidth="7"
              strokeLinecap="round"
            />
          ))}
          <path d="M 18 60 L 44 42 L 70 24 L 96 42 L 122 60" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 18 60 L 44 78 L 70 96 L 96 78 L 122 60" fill="none" stroke={ILLUSTRATION.thread} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <text x={70} y={128} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Two mirrored surface paths share the center row.
          </text>
        </g>

        <line x1={200} y1={18} x2={200} y2={170} stroke={ILLUSTRATION.creamDeeper} />
        <line x1={400} y1={18} x2={400} y2={170} stroke={ILLUSTRATION.creamDeeper} />
        <text x={300} y={245} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          If the center vertices drift, the lattice stops reading as diamonds and becomes two unrelated waves.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

function TensionMini({
  label,
  squeeze,
  color,
  x,
}: {
  label: string;
  squeeze: number;
  color: string;
  x: number;
}) {
  const mid = 72;
  const amp = 26 * squeeze;
  const points = [
    { x: 12, y: mid },
    { x: 38, y: mid - amp },
    { x: 64, y: mid },
    { x: 90, y: mid + amp },
    { x: 116, y: mid },
  ];
  const lower = points.map((p) => ({ x: p.x, y: mid * 2 - p.y }));

  return (
    <g transform={`translate(${x}, 8)`}>
      <text x={70} y={10} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      {Array.from({ length: 5 }).map((_, i) => (
        <path
          key={i}
          d={`M ${12 + i * 26} 42 L ${25 + i * 26} 35 L ${38 + i * 26} 42 L ${38 + i * 26} 102 L ${25 + i * 26} 95 L ${12 + i * 26} 102 Z`}
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
          strokeWidth="0.5"
        />
      ))}
      <path d={pathD(points)} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={pathD(lower)} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </g>
  );
}

export function TrellisTensionDiagram() {
  return (
    <IllustrationFrame caption="Trellis tension — diamonds need matched upper and lower tension, not just even individual wave stitches.">
      <SvgRoot viewBox="0 0 640 140" aria-label="Trellis stitch tension examples">
        <TensionMini x={0} label="Too loose" squeeze={0.65} color={ILLUSTRATION.burgundySoft} />
        <TensionMini x={160} label="Ideal" squeeze={1} color={ILLUSTRATION.threadAlt} />
        <TensionMini x={320} label="Too tight" squeeze={0.42} color={ILLUSTRATION.burgundy} />
        <TensionMini x={480} label="Unequal rows" squeeze={1} color={ILLUSTRATION.gold} />
        <path
          d="M 492 80 L 518 48 L 544 72 L 570 44 L 596 80"
          fill="none"
          stroke={ILLUSTRATION.burgundy}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 2"
        />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Too loose:</strong> diamonds collapse into lazy curves; vertices do not look locked.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> shared points meet, sides stay straight, pleats remain rounded.
        </li>
        <li>
          <strong className="text-ink">Too tight:</strong> lattice pinches and cups; the center row pulls into a ridge.
        </li>
        <li>
          <strong className="text-ink">Unequal rows:</strong> one wave dominates; diamonds lean or twist.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function TrellisMistakeDiagrams() {
  const mistakes = [
    {
      title: "Missed shared vertex",
      desc: "The mirror row starts one pleat late, so diamonds never close cleanly.",
      kind: "missed" as const,
    },
    {
      title: "Upper row over-tall",
      desc: "A larger upper amplitude makes kite shapes instead of balanced diamonds.",
      kind: "tall" as const,
    },
    {
      title: "Center too tight",
      desc: "Pulling hard at meeting points pinches the fabric into a ridge.",
      kind: "pinch" as const,
    },
    {
      title: "Two waves, no mirror",
      desc: "Repeating the same wave direction below produces parallel waves, not trellis.",
      kind: "parallel" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common trellis mistakes — the problem is usually in the relationship between the two waves.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((m) => (
          <div key={m.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={m.title} className="max-w-full">
              <PleatFabric count={6} startX={10} y={16} width={200} height={82} showLabels={false} />
              <line x1={10} y1={40} x2={210} y2={40} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.45" />
              <line x1={10} y1={62} x2={210} y2={62} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.55" />
              <line x1={10} y1={84} x2={210} y2={84} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.45" />
              {m.kind === "missed" && (
                <>
                  <path d="M 28 62 L 62 40 L 96 62 L 130 40 L 164 62" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 45 62 L 79 84 L 113 62 L 147 84 L 181 62" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
              {m.kind === "tall" && (
                <>
                  <path d="M 28 62 L 62 30 L 96 62 L 130 30 L 164 62" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 28 62 L 62 82 L 96 62 L 130 82 L 164 62" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
              {m.kind === "pinch" && (
                <>
                  <path d="M 28 62 L 62 40 L 96 62 L 130 40 L 164 62" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 28 62 L 62 84 L 96 62 L 130 84 L 164 62" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                  {[28, 96, 164].map((x) => (
                    <circle key={x} cx={x} cy={62} r="7" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.4" strokeDasharray="2 1" />
                  ))}
                </>
              )}
              {m.kind === "parallel" && (
                <>
                  <path d="M 28 62 L 62 40 L 96 62 L 130 40 L 164 62" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 28 84 L 62 62 L 96 84 L 130 62 L 164 84" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </SvgRoot>
            <p className="mt-1 font-serif text-base text-ink">{m.title}</p>
            <p className="text-sm text-ink-muted">{m.desc}</p>
          </div>
        ))}
      </div>
    </IllustrationFrame>
  );
}
