"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";
import { PleatFabric } from "./PleatFabric";
import { DirectionArrow, Needle } from "./Needle";

type BindPoint = {
  x1: number;
  x2: number;
  y: number;
  kind: "valley" | "peak";
  motion: "up" | "down";
  label: string;
};

const VAN_DYKE_START_X = 42;
const VAN_DYKE_WIDTH = 516;
const VAN_DYKE_COUNT = 18;
const VAN_DYKE_PLEAT_W = VAN_DYKE_WIDTH / VAN_DYKE_COUNT;
const VAN_DYKE_UPPER_Y = 92;
const VAN_DYKE_LOWER_Y = 190;

function vanDykeBinds({
  startX = VAN_DYKE_START_X,
  pleatW = VAN_DYKE_PLEAT_W,
  upperY = VAN_DYKE_UPPER_Y,
  lowerY = VAN_DYKE_LOWER_Y,
  bindCount = 9,
}: {
  startX?: number;
  pleatW?: number;
  upperY?: number;
  lowerY?: number;
  bindCount?: number;
} = {}): BindPoint[] {
  return Array.from({ length: bindCount }, (_, i) => {
    // A right-handed Van Dyke course works right-to-left. Each new pair
    // overlaps the previous pair: old pleat + one new pleat.
    const pairStart = VAN_DYKE_COUNT - 2 - i;
    const x1 = startX + pairStart * pleatW + pleatW / 2;
    const x2 = x1 + pleatW;
    const phase = i % 8;
    const motion: BindPoint["motion"] = phase < 4 ? "up" : "down";
    const verticalStep = (lowerY - upperY) / 4;
    const y = phase <= 4
      ? lowerY - phase * verticalStep
      : upperY + (phase - 4) * verticalStep;
    const kind: BindPoint["kind"] = y === upperY ? "peak" : y === lowerY ? "valley" : motion === "up" ? "valley" : "peak";
    return {
      x1,
      x2,
      y,
      kind,
      motion,
      label: kind === "peak" ? "LOCK same pair" : "LOCK same pair",
    };
  });
}

function RowGuides({
  startX = VAN_DYKE_START_X,
  width = VAN_DYKE_WIDTH,
  upperY = VAN_DYKE_UPPER_Y,
  lowerY = VAN_DYKE_LOWER_Y,
  showLabels = false,
}: {
  startX?: number;
  width?: number;
  upperY?: number;
  lowerY?: number;
  showLabels?: boolean;
}) {
  return (
    <g fontFamily="var(--font-body), sans-serif">
      {[
        { y: upperY, label: "peak row" },
        { y: lowerY, label: "valley row" },
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
            opacity="0.5"
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

function BindStitch({
  bind,
  color = ILLUSTRATION.burgundy,
  opacity = 1,
  strokeWidth = 3.2,
  showLabel = false,
}: {
  bind: BindPoint;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}) {
  const mid = (bind.x1 + bind.x2) / 2;
  const lift = bind.kind === "peak" ? -8 : 8;

  return (
    <g opacity={opacity} fontFamily="var(--font-body), sans-serif">
      <path
        d={`M ${bind.x1} ${bind.y} Q ${mid} ${bind.y + lift} ${bind.x2} ${bind.y}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx={bind.x1} cy={bind.y} r={3.2} fill={color} />
      <circle cx={bind.x2} cy={bind.y} r={3.2} fill={color} />
      <path
        d={`M ${bind.x1 - 3} ${bind.y + lift * 0.2} Q ${mid} ${bind.y + lift * 1.15} ${bind.x2 + 3} ${bind.y + lift * 0.2}`}
        fill="none"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.55"
      />
      {showLabel && (
        <text
          x={mid}
          y={bind.kind === "peak" ? bind.y - 16 : bind.y + 24}
          textAnchor="middle"
          fontSize="9"
          fill={ILLUSTRATION.inkMuted}
        >
          {bind.label}
        </text>
      )}
    </g>
  );
}

function TravelLine({
  from,
  to,
  color = ILLUSTRATION.threadAlt,
  opacity = 1,
  strokeWidth = 3,
}: {
  from: BindPoint;
  to: BindPoint;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
}) {
  const controlY = from.motion === "up" ? from.y - 18 : from.y + 18;
  const d = `M ${from.x1} ${from.y} Q ${(from.x1 + to.x1) / 2} ${controlY} ${to.x1} ${to.y}`;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

function VanDykePath({
  binds,
  upto = binds.length * 2 - 1,
  activeOp = null,
}: {
  binds: BindPoint[];
  upto?: number;
  activeOp?: number | null;
}) {
  const maxOp = Math.max(0, Math.min(upto, binds.length * 2 - 2));

  return (
    <g>
      {binds.map((bind, i) => {
        const opIndex = i * 2;
        if (opIndex > maxOp) return null;
        return (
          <BindStitch
            key={`bind-${i}`}
            bind={bind}
            color={activeOp === opIndex ? ILLUSTRATION.gold : ILLUSTRATION.burgundy}
            opacity={activeOp === null || activeOp === opIndex ? 1 : 0.36}
            strokeWidth={activeOp === opIndex ? 4 : 3.2}
          />
        );
      })}
      {binds.slice(0, -1).map((bind, i) => {
        const opIndex = i * 2 + 1;
        if (opIndex > maxOp) return null;
        return (
          <TravelLine
            key={`travel-${i}`}
            from={bind}
            to={binds[i + 1]}
            color={activeOp === opIndex ? ILLUSTRATION.gold : ILLUSTRATION.threadAlt}
            opacity={activeOp === null || activeOp === opIndex ? 1 : 0.36}
            strokeWidth={activeOp === opIndex ? 4 : 3}
          />
        );
      })}
    </g>
  );
}

export function FinishedVanDykeAppearance() {
  const binds = vanDykeBinds();

  return (
    <IllustrationFrame caption="Finished Van Dyke — every traveling stitch catches an old pleat and one new pleat, then a lock repeats through that same pair.">
      <SvgRoot viewBox="0 0 600 300" aria-label="Finished Van Dyke stitch on pleated fabric">
        <PleatFabric
          count={VAN_DYKE_COUNT}
          startX={VAN_DYKE_START_X}
          y={48}
          width={VAN_DYKE_WIDTH}
          height={205}
          showLabels={false}
        />
        <RowGuides showLabels />
        <VanDykePath binds={binds} />
        {binds.map((bind) => (
          <BindStitch key={bind.label + bind.x1} bind={bind} color={ILLUSTRATION.gold} opacity={0.28} strokeWidth={7} />
        ))}
        <text
          x={300}
          y={278}
          textAnchor="middle"
          fontSize="10"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          Every adjacent pair is stitched twice: travel through old + new, then lock through that same pair.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function VanDykePleatRowsDiagram() {
  const binds = vanDykeBinds({ bindCount: 5 });

  return (
    <IllustrationFrame caption="Van Dyke row diagram — neighboring pairs overlap continuously; no pleat is skipped between locks.">
      <SvgRoot viewBox="0 0 600 285" aria-label="Pleat and row diagram for Van Dyke stitch">
        <PleatFabric
          count={VAN_DYKE_COUNT}
          startX={VAN_DYKE_START_X}
          y={44}
          width={VAN_DYKE_WIDTH}
          height={198}
          showLabels
          showNeedleNumbers
        />
        <RowGuides showLabels />
        {binds.map((bind, i) => (
          <BindStitch key={i} bind={bind} color={ILLUSTRATION.gold} showLabel />
        ))}
        {binds.slice(0, -1).map((bind, i) => (
          <TravelLine key={i} from={bind} to={binds[i + 1]} color={ILLUSTRATION.threadAlt} />
        ))}
        <DirectionArrow
          x1={binds[0].x1 - 4}
          y1={binds[0].y - 8}
          x2={binds[1].x1 + 4}
          y2={binds[1].y + 8}
          color={ILLUSTRATION.dustyBlue}
          label="right to left"
        />
        <text
          x={300}
          y={30}
          textAnchor="middle"
          fontSize="10"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          TRAVEL through old + new pleat, then LOCK through the same pair. Repeat with one new pleat.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function VanDykeNeedlePath({
  showLabels = true,
  step = 4,
}: {
  showLabels?: boolean;
  step?: number;
}) {
  const binds = vanDykeBinds();
  const maxOps = binds.length * 2 - 2;
  const activeOp = Math.min(Math.max(step, 1), maxOps + 1) - 1;
  const activeBindIndex = Math.min(Math.floor(activeOp / 2), binds.length - 1);
  const activeBind = binds[activeBindIndex];
  const nextBind = binds[Math.min(activeBindIndex + 1, binds.length - 1)];
  const isTravel = activeOp % 2 === 1;

  return (
    <SvgRoot viewBox="0 0 600 300" aria-label="Van Dyke stitch needle path diagram">
      <PleatFabric
        count={VAN_DYKE_COUNT}
        startX={VAN_DYKE_START_X}
        y={48}
        width={VAN_DYKE_WIDTH}
        height={205}
        showLabels={false}
        highlightPleat={Math.max(VAN_DYKE_COUNT - activeBindIndex - 1, 1)}
      />
      <RowGuides showLabels={showLabels} />
      <VanDykePath binds={binds} upto={activeOp} activeOp={activeOp} />
      {isTravel ? (
        <>
          <DirectionArrow
            x1={activeBind.x1}
            y1={activeBind.y}
            x2={nextBind.x1}
            y2={nextBind.y}
            color={ILLUSTRATION.burgundy}
            label={nextBind.motion === "up" ? "move up" : "move down"}
          />
          <Needle
            x={nextBind.x1 + 10}
            y={nextBind.y + (nextBind.motion === "up" ? 24 : -34)}
            angle={nextBind.motion === "up" ? -42 : 42}
            length={56}
          />
        </>
      ) : (
        <>
          <DirectionArrow
            x1={activeBind.x1}
            y1={activeBind.y + (activeBind.kind === "peak" ? -10 : 10)}
            x2={activeBind.x2}
            y2={activeBind.y + (activeBind.kind === "peak" ? -10 : 10)}
            color={ILLUSTRATION.burgundy}
            label="lock same pair"
          />
          <Needle
            x={activeBind.x2 - 8}
            y={activeBind.y + (activeBind.kind === "peak" ? -34 : 22)}
            angle={activeBind.kind === "peak" ? 20 : -20}
            length={54}
          />
        </>
      )}
      {showLabels && (
        <g fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          <text x={300} y={30} textAnchor="middle">
            Gold operation: traveling stitch through old + new, followed by a lock through the same pair.
          </text>
          <text x={VAN_DYKE_START_X + VAN_DYKE_WIDTH} y={270} textAnchor="end">
            Right-handed demonstration: work right to left; no empty pleats between locks.
          </text>
        </g>
      )}
    </SvgRoot>
  );
}

const VAN_DYKE_STEPS = [
  {
    title: "Set up the first pair",
    body: "At the right edge, come up between the first two working pleats and pass through the second pleat halfway down. Lock the first and second pleats, exiting from the same hole.",
  },
  {
    title: "Travel through old + new",
    body: "Move left and up one step. Pass horizontally through two pleats: the old pleat from the first lock and one new pleat. Keep the floss below the needle while moving upward.",
  },
  {
    title: "Lock the same pair",
    body: "Pass through those exact same two pleats again, exiting from the same hole and angling the needle toward the next downward step. The traveling thread stays between the locks.",
  },
  {
    title: "Travel down through old + new",
    body: "Move left and down one step through the old pleat plus one new pleat. Keep the floss above the needle while moving downward.",
  },
  {
    title: "Lock that same pair",
    body: "Repeat the locking stitch through the same two pleats used for the downward traveling stitch. Only a traveling stitch introduces a new pleat.",
  },
  {
    title: "Repeat without gaps",
    body: "Continue travel then lock, moving right to left. The horizontal locks should meet edge to edge—there are no unused pleats between them.",
  },
];

export function VanDykeConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= VAN_DYKE_STEPS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2500);
    return () => clearInterval(id);
  }, [playing, reduce]);

  const pathStep = [1, 2, 3, 4, 5, 7][step] ?? 5;

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${VAN_DYKE_STEPS.length}: ${VAN_DYKE_STEPS[step].title}`}
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
            onClick={() => setStep((s) => Math.min(VAN_DYKE_STEPS.length - 1, s + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= VAN_DYKE_STEPS.length - 1) setStep(0);
              setPlaying((p) => !p);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{VAN_DYKE_STEPS.length}
          </span>
        </>
      }
    >
      <VanDykeNeedlePath step={pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {VAN_DYKE_STEPS[step].body}
      </p>
    </IllustrationFrame>
  );
}

export function VanDykeFrontBackCross() {
  const binds = vanDykeBinds({ bindCount: 3 });

  return (
    <IllustrationFrame caption="Front, back, and cross-section — every overlapping pair receives a traveling pass and a locking pass.">
      <SvgRoot viewBox="0 0 600 320" aria-label="Van Dyke stitch front, back, and cross-section">
        <text x={100} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Front
        </text>
        <g transform="translate(0,28) scale(0.34)">
          <PleatFabric count={10} startX={34} y={28} width={360} height={170} showLabels={false} />
          <VanDykePath binds={binds} />
        </g>

        <text x={300} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Back
        </text>
        <g transform="translate(210,38)">
          <rect x={0} y={0} width={180} height={115} rx={4} fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          <path d="M 18 85 L 55 28 L 92 85 L 129 28 L 166 85" fill="none" stroke={ILLUSTRATION.threadAlt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          {[18, 55, 92, 129, 166].map((x, i) => (
            <path
              key={x}
              d={`M ${x - 7} ${i % 2 === 0 ? 85 : 28} Q ${x} ${i % 2 === 0 ? 92 : 20} ${x + 7} ${i % 2 === 0 ? 85 : 28}`}
              fill="none"
              stroke={ILLUSTRATION.burgundy}
              strokeWidth="1.8"
              opacity="0.8"
            />
          ))}
          <text x={90} y={137} textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Back shows a short locking return for every traveling pair.
          </text>
        </g>

        <text x={500} y={24} textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Cross-section
        </text>
        <g transform="translate(420,42)">
          <line x1={0} y1={28} x2={144} y2={28} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          <line x1={0} y1={92} x2={144} y2={92} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="1" />
          {[8, 34, 60, 86, 112].map((x) => (
            <path
              key={x}
              d={`M ${x} 22 Q ${x + 8} 62 ${x + 16} 22`}
              fill="none"
              stroke={ILLUSTRATION.fabricShadow}
              strokeWidth="7"
              strokeLinecap="round"
            />
          ))}
          <path d="M 17 92 Q 30 101 43 92 L 69 28 Q 82 19 95 28 L 121 92" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x={70} y={128} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Every step joins two neighboring mountains.
          </text>
        </g>

        <line x1={200} y1={18} x2={200} y2={175} stroke={ILLUSTRATION.creamDeeper} />
        <line x1={400} y1={18} x2={400} y2={175} stroke={ILLUSTRATION.creamDeeper} />
        <text x={300} y={248} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
          Seat each lock neatly; do not skip a pleat between overlapping pairs.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}

function TensionMini({
  label,
  bindSize,
  diagonal,
  color,
  x,
}: {
  label: string;
  bindSize: number;
  diagonal: number;
  color: string;
  x: number;
}) {
  const points = [
    { x: 18, y: 88 },
    { x: 50, y: 88 },
    { x: 90, y: 28 + diagonal },
    { x: 122, y: 28 + diagonal },
    { x: 162, y: 88 },
  ];
  return (
    <g transform={`translate(${x}, 8)`}>
      <text x={90} y={10} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {label}
      </text>
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d={`M ${12 + i * 26} 38 L ${25 + i * 26} 31 L ${38 + i * 26} 38 L ${38 + i * 26} 105 L ${25 + i * 26} 98 L ${12 + i * 26} 105 Z`}
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
          strokeWidth="0.5"
        />
      ))}
      <path
        d={`M ${points[0].x} ${points[0].y} Q ${points[0].x + 16} ${points[0].y + bindSize} ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Q ${points[2].x + 16} ${points[2].y - bindSize} ${points[3].x} ${points[3].y} L ${points[4].x} ${points[4].y}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function VanDykeTensionDiagram() {
  return (
    <IllustrationFrame caption="Van Dyke tension — seat the traveling stitch, then secure the same pair without crushing it.">
      <SvgRoot viewBox="0 0 720 145" aria-label="Van Dyke stitch tension examples">
        <TensionMini x={0} label="Loose binds" bindSize={3} diagonal={10} color={ILLUSTRATION.burgundySoft} />
        <TensionMini x={180} label="Ideal" bindSize={9} diagonal={0} color={ILLUSTRATION.burgundy} />
        <TensionMini x={360} label="Tight tips" bindSize={16} diagonal={16} color={ILLUSTRATION.burgundy} />
        <TensionMini x={540} label="Flat chevron" bindSize={7} diagonal={34} color={ILLUSTRATION.gold} />
      </SvgRoot>
      <ul className="mx-auto mt-4 grid max-w-2xl gap-2 text-sm text-ink-muted sm:grid-cols-2">
        <li>
          <strong className="text-ink">Loose locks:</strong> the two passes separate and the continuous chain looks unfinished.
        </li>
        <li>
          <strong className="text-ink">Ideal:</strong> each overlapping pair is secure while the pleats remain round.
        </li>
        <li>
          <strong className="text-ink">Tight tips:</strong> pair-binds pucker and drag the diagonals inward.
        </li>
        <li>
          <strong className="text-ink">Flat chevron:</strong> diagonal travel is too shallow; the stitch reads like ordinary wave.
        </li>
      </ul>
    </IllustrationFrame>
  );
}

export function VanDykeMistakeDiagrams() {
  const mistakes = [
    {
      title: "No pair bind at turn",
      desc: "A plain wave point changes direction but does not lock two pleats together.",
      kind: "plain" as const,
    },
    {
      title: "Single-pleat tip",
      desc: "Catching only one mountain makes a weak point that twists under tension.",
      kind: "single" as const,
    },
    {
      title: "Over-tight bind",
      desc: "Pulling the pair hard creates a knot and shortens the chevron.",
      kind: "tight" as const,
    },
    {
      title: "Uneven diagonal spacing",
      desc: "Different travel lengths make the V shapes march off rhythm.",
      kind: "uneven" as const,
    },
  ];

  return (
    <IllustrationFrame caption="Common Van Dyke mistakes — check that every traveling pair is repeated by a lock through the same two pleats.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((m) => (
          <div key={m.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 220 120" aria-label={m.title} className="max-w-full">
              <PleatFabric count={7} startX={10} y={14} width={200} height={88} showLabels={false} />
              <line x1={10} y1={40} x2={210} y2={40} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.45" />
              <line x1={10} y1={86} x2={210} y2={86} stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 2" strokeWidth="0.8" opacity="0.45" />
              {m.kind === "plain" && (
                <path d="M 30 86 L 75 40 L 120 86 L 165 40" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {m.kind === "single" && (
                <>
                  <path d="M 30 86 L 75 40 L 120 86 L 165 40" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={75} cy={40} r={5} fill={ILLUSTRATION.gold} opacity="0.8" />
                  <text x={75} y={31} textAnchor="middle" fontSize="8" fill={ILLUSTRATION.burgundy}>one</text>
                </>
              )}
              {m.kind === "tight" && (
                <>
                  <path d="M 30 86 Q 45 94 60 86 L 96 42 Q 111 20 126 42 L 165 86" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={111} cy={40} r={9} fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.4" strokeDasharray="2 1" />
                </>
              )}
              {m.kind === "uneven" && (
                <path d="M 25 86 Q 40 94 55 86 L 82 40 Q 97 31 112 40 L 165 86 Q 180 94 195 86" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
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
