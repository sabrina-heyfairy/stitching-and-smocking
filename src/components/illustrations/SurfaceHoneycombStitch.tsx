"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ILLUSTRATION,
  IllustrationFrame,
  SvgRoot,
} from "@/components/illustrations/IllustrationFrame";
import { PleatFabric } from "@/components/illustrations/PleatFabric";
import { DirectionArrow, Needle } from "@/components/illustrations/Needle";
import { honeycombBindPoints } from "@/components/illustrations/HoneycombStitch";

type BindPoint = ReturnType<typeof honeycombBindPoints>[number];

function SurfaceRows({
  startX,
  width,
  upperY,
  lowerY,
  showLabels = true,
}: {
  startX: number;
  width: number;
  upperY: number;
  lowerY: number;
  showLabels?: boolean;
}) {
  return (
    <g fontFamily="var(--font-body), sans-serif">
      {[{ y: upperY, label: "Upper surface row" }, { y: lowerY, label: "Lower surface row" }].map(
        (row) => (
          <g key={row.label}>
            <line
              x1={startX}
              y1={row.y}
              x2={startX + width}
              y2={row.y}
              stroke={ILLUSTRATION.dustyBlue}
              strokeWidth="1"
              strokeDasharray="5 4"
              opacity="0.42"
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
        ),
      )}
    </g>
  );
}

function SurfaceBind({
  bind,
  color = ILLUSTRATION.sage,
  opacity = 1,
  strokeWidth = 2.7,
  showSeat = true,
}: {
  bind: BindPoint;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  showSeat?: boolean;
}) {
  const mid = (bind.x1 + bind.x2) / 2;
  const archLift = bind.row === "upper" ? -3.5 : -4.5;

  return (
    <g opacity={opacity}>
      {showSeat && (
        <path
          d={`M ${bind.x1 - 7} ${bind.y + 4} C ${mid - 10} ${bind.y + 7}, ${
            mid + 10
          } ${bind.y + 7}, ${bind.x2 + 7} ${bind.y + 4}`}
          fill="none"
          stroke={ILLUSTRATION.fabricShadow}
          strokeWidth="1"
          opacity="0.6"
        />
      )}
      <path
        d={`M ${bind.x1} ${bind.y} C ${bind.x1 + 8} ${bind.y + archLift}, ${
          bind.x2 - 8
        } ${bind.y + archLift}, ${bind.x2} ${bind.y}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <ellipse cx={bind.x1} cy={bind.y + 0.6} rx="3.4" ry="2" fill={color} opacity="0.9" />
      <ellipse cx={bind.x2} cy={bind.y + 0.6} rx="3.4" ry="2" fill={color} opacity="0.9" />
      <path
        d={`M ${bind.x1 + 4} ${bind.y - 2} C ${mid - 4} ${bind.y - 5}, ${
          mid + 4
        } ${bind.y - 5}, ${bind.x2 - 4} ${bind.y - 2}`}
        fill="none"
        stroke="white"
        strokeWidth="0.7"
        opacity="0.45"
      />
    </g>
  );
}

function SurfaceTravel({
  x,
  y1,
  y2,
  color = ILLUSTRATION.sage,
  opacity = 0.55,
  dashed = true,
}: {
  x: number;
  y1: number;
  y2: number;
  color?: string;
  opacity?: number;
  dashed?: boolean;
}) {
  const curve = y2 < y1 ? -8 : 8;

  return (
    <path
      d={`M ${x} ${y1} C ${x + curve} ${(y1 + y2) / 2}, ${x + curve} ${
        (y1 + y2) / 2
      }, ${x} ${y2}`}
      fill="none"
      stroke={color}
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeDasharray={dashed ? "3 2" : undefined}
      opacity={opacity}
    />
  );
}

function SurfaceCells({
  startX,
  pleatW,
  upperY,
  lowerY,
  cells,
  openness = 0.55,
  color = ILLUSTRATION.dustyBlue,
}: {
  startX: number;
  pleatW: number;
  upperY: number;
  lowerY: number;
  cells: number;
  openness?: number;
  color?: string;
}) {
  const midY = (upperY + lowerY) / 2;
  const halfH = ((lowerY - upperY) / 2) * openness;
  const halfW = pleatW * 0.48 * openness;

  return (
    <g opacity="0.48">
      {Array.from({ length: cells }).map((_, i) => {
        const cx = startX + (i + 1.5) * pleatW;
        return (
          <path
            key={i}
            d={`M ${cx - halfW} ${midY}
                C ${cx - halfW * 0.72} ${midY - halfH}, ${cx + halfW * 0.72} ${
                  midY - halfH
                }, ${cx + halfW} ${midY}
                C ${cx + halfW * 0.72} ${midY + halfH}, ${cx - halfW * 0.72} ${
                  midY + halfH
                }, ${cx - halfW} ${midY} Z`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        );
      })}
    </g>
  );
}

function DrawSurfaceRepeat({
  bindCount,
  startX,
  width,
  upperY,
  lowerY,
  color = ILLUSTRATION.sage,
  activeIndex = null,
  visibleCount,
  showTravels = true,
}: {
  bindCount: number;
  startX: number;
  width: number;
  upperY: number;
  lowerY: number;
  color?: string;
  activeIndex?: number | null;
  visibleCount?: number;
  showTravels?: boolean;
}) {
  const pleatW = width / (bindCount + 2);
  const binds = honeycombBindPoints(bindCount, startX, pleatW, lowerY, upperY);
  const visible = typeof visibleCount === "number" ? binds.slice(0, visibleCount) : binds;

  return (
    <g>
      {visible.map((bind, i) => (
        <g key={`${bind.row}-${i}`}>
          <SurfaceBind
            bind={bind}
            color={activeIndex === i ? ILLUSTRATION.gold : color}
            opacity={activeIndex === null || activeIndex === i ? 1 : 0.34}
            strokeWidth={activeIndex === i ? 3.4 : 2.7}
          />
          {showTravels && i < visible.length - 1 && (
            <SurfaceTravel
              x={bind.x2}
              y1={bind.y}
              y2={visible[i + 1].y}
              color={activeIndex === i ? ILLUSTRATION.gold : color}
              opacity={activeIndex === i ? 0.85 : 0.42}
            />
          )}
        </g>
      ))}
    </g>
  );
}

export function FinishedSurfaceHoneycombAppearance() {
  const startX = 46;
  const width = 500;
  const count = 12;
  const pleatW = width / count;
  const upperY = 116;
  const lowerY = 154;
  const binds = honeycombBindPoints(10, startX, pleatW, lowerY, upperY);

  return (
    <IllustrationFrame caption="Finished surface honeycomb - shallow pair-binds sit on top of the pleats, making low decorative cells with limited stretch.">
      <SvgRoot viewBox="0 0 600 270" aria-label="Finished surface honeycomb stitch">
        <PleatFabric count={count} startX={startX} y={50} width={width} height={150} showLabels={false} />
        <SurfaceRows startX={startX} width={width} upperY={upperY} lowerY={lowerY} showLabels />
        <SurfaceCells startX={startX} pleatW={pleatW} upperY={upperY} lowerY={lowerY} cells={9} />
        {binds.map((bind, i) => (
          <g key={i}>
            <SurfaceBind bind={bind} />
            {i < binds.length - 1 && (
              <SurfaceTravel x={bind.x2} y1={bind.y} y2={binds[i + 1].y} />
            )}
          </g>
        ))}
        <g transform="translate(72 210)">
          <rect
            x="0"
            y="0"
            width="456"
            height="32"
            rx="16"
            fill="var(--cream)"
            stroke={ILLUSTRATION.creamDeeper}
          />
          <text
            x="228"
            y="20"
            textAnchor="middle"
            fontSize="11"
            fill={ILLUSTRATION.inkMuted}
            fontFamily="var(--font-body), sans-serif"
          >
            Surface version: flatter cells, visible decorative tacks, less elastic recovery than classic honeycomb
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SurfaceHoneycombPleatDiagram() {
  const startX = 56;
  const width = 480;
  const count = 8;
  const pleatW = width / count;
  const upperY = 102;
  const lowerY = 142;
  const binds = honeycombBindPoints(5, startX, pleatW, lowerY, upperY);

  return (
    <IllustrationFrame caption="Pleat diagram - same stagger as classic honeycomb, but rows sit closer and each bind skims the surface.">
      <SvgRoot viewBox="0 0 600 255" aria-label="Surface honeycomb pleat and bind diagram">
        <PleatFabric
          count={count}
          startX={startX}
          y={42}
          width={width}
          height={140}
          showLabels
          showNeedleNumbers
        />
        <SurfaceRows startX={startX} width={width} upperY={upperY} lowerY={lowerY} showLabels />
        <SurfaceCells startX={startX} pleatW={pleatW} upperY={upperY} lowerY={lowerY} cells={4} openness={0.5} />
        {binds.map((bind, i) => (
          <g key={i}>
            <SurfaceBind bind={bind} color={ILLUSTRATION.gold} strokeWidth={2.9} />
            <text
              x={(bind.x1 + bind.x2) / 2}
              y={bind.y - 9}
              textAnchor="middle"
              fontSize="8"
              fill={ILLUSTRATION.inkMuted}
              fontFamily="var(--font-body), sans-serif"
            >
              surface bind {i + 1}
            </text>
            {i < binds.length - 1 && (
              <SurfaceTravel x={bind.x2} y1={bind.y} y2={binds[i + 1].y} color={ILLUSTRATION.gold} />
            )}
          </g>
        ))}
        <DirectionArrow
          x1={binds[0].x2 + 10}
          y1={binds[0].y + 8}
          x2={binds[1].x1 - 5}
          y2={binds[1].y + 8}
          color={ILLUSTRATION.burgundy}
          label="travel up on the same surface path"
        />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SurfaceHoneycombNeedlePath({
  showLabels = true,
  step = 4,
}: {
  showLabels?: boolean;
  step?: number;
}) {
  const startX = 56;
  const width = 488;
  const count = 10;
  const pleatW = width / count;
  const upperY = 108;
  const lowerY = 150;
  const binds = honeycombBindPoints(8, startX, pleatW, lowerY, upperY);
  const visible = Math.min(Math.max(step, 1), binds.length);
  const current = binds[visible - 1];
  const next = binds[Math.min(visible, binds.length - 1)];

  return (
    <SvgRoot viewBox="0 0 600 275" aria-label="Surface honeycomb needle path">
      <PleatFabric
        count={count}
        startX={startX}
        y={46}
        width={width}
        height={150}
        showLabels={false}
        highlightPleat={visible + 1}
      />
      <SurfaceRows startX={startX} width={width} upperY={upperY} lowerY={lowerY} showLabels={showLabels} />
      <SurfaceCells startX={startX} pleatW={pleatW} upperY={upperY} lowerY={lowerY} cells={7} openness={0.44} />
      {binds.slice(0, visible).map((bind, i) => (
        <g key={i}>
          <SurfaceBind
            bind={bind}
            color={i === visible - 1 ? ILLUSTRATION.gold : ILLUSTRATION.sage}
            opacity={i === visible - 1 ? 1 : 0.35}
            strokeWidth={i === visible - 1 ? 3.3 : 2.5}
          />
          {i < visible - 1 && (
            <SurfaceTravel x={bind.x2} y1={bind.y} y2={binds[i + 1].y} opacity={0.3} />
          )}
        </g>
      ))}
      {visible < binds.length && current && next && (
        <>
          <SurfaceTravel
            x={current.x2}
            y1={current.y}
            y2={next.y}
            color={ILLUSTRATION.burgundy}
            opacity={0.9}
            dashed={false}
          />
          <DirectionArrow
            x1={current.x2 + 4}
            y1={current.y}
            x2={next.x1 - 4}
            y2={next.y}
            color={ILLUSTRATION.burgundy}
            label={next.y < current.y ? "shallow travel up" : "shallow travel down"}
          />
          <Needle
            x={next.x1 - 18}
            y={next.y - 24}
            angle={next.y < current.y ? 28 : -18}
            length={50}
            label="needle skims surface"
          />
        </>
      )}
      {showLabels && (
        <>
          <text
            x="300"
            y="28"
            textAnchor="middle"
            fontSize="10"
            fill={ILLUSTRATION.inkMuted}
            fontFamily="var(--font-body), sans-serif"
          >
            Gold = active surface bind; burgundy = next shallow travel; blue lozenges = low cells
          </text>
          <text
            x="300"
            y="230"
            textAnchor="middle"
            fontSize="10"
            fill={ILLUSTRATION.inkMuted}
            fontFamily="var(--font-body), sans-serif"
          >
            Step {visible}: bind mountains {visible} and {visible + 1} on the{" "}
            {current.row === "upper" ? "upper" : "lower"} row
          </text>
        </>
      )}
    </SvgRoot>
  );
}

const CONSTRUCTION_STEPS = [
  {
    title: "Set a shallow lower bind",
    body: "Bring the needle up on the lower surface row and catch only the crown of mountain 1 and mountain 2. The thread should lie visibly on top, not pull the valley closed.",
    pathStep: 1,
  },
  {
    title: "Travel to the upper row",
    body: "Carry the working thread along the face of the same pleat path with a short, controlled rise. Keep the carry neat and close so it reads as part of the surface pattern.",
    pathStep: 1,
  },
  {
    title: "Bind the offset upper pair",
    body: "Bind mountains 2 and 3 on the upper row. This is the classic honeycomb stagger, but the row gap is smaller and the stitch is not cinched into a deep cell.",
    pathStep: 2,
  },
  {
    title: "Return to the lower row",
    body: "Travel down from mountain 3 and bind mountains 3 and 4. The repeated offset creates decorative low lozenges instead of springy hexagonal openings.",
    pathStep: 4,
  },
  {
    title: "Check surface tension",
    body: "Stroke the panel flat after every few binds. If the pleat ridges pinch into deep pockets, you are drifting back toward classic honeycomb tension.",
    pathStep: 6,
  },
  {
    title: "Continue the surface lattice",
    body: "Repeat lower, upper, lower, upper. The finished line should sparkle with surface tacks and stay flatter against the garment than classic honeycomb.",
    pathStep: 8,
  },
];

export function SurfaceHoneycombConstructionAnimation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        if (current >= CONSTRUCTION_STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2600);

    return () => window.clearInterval(id);
  }, [playing, reduce]);

  const current = CONSTRUCTION_STEPS[step];

  return (
    <IllustrationFrame
      caption={`Step ${step + 1} of ${CONSTRUCTION_STEPS.length}: ${current.title}`}
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
            onClick={() => setStep((value) => Math.min(CONSTRUCTION_STEPS.length - 1, value + 1))}
          >
            Next
          </button>
          <button
            type="button"
            className="rounded border border-dusty-blue/40 bg-dusty-blue/10 px-3 py-1 text-xs text-dusty-blue-deep hover:bg-dusty-blue/20"
            onClick={() => {
              if (step >= CONSTRUCTION_STEPS.length - 1) setStep(0);
              setPlaying((value) => !value);
            }}
          >
            {playing ? "Pause" : "Play animation"}
          </button>
          <span className="text-xs text-ink-faint">
            {step + 1}/{CONSTRUCTION_STEPS.length}
          </span>
        </>
      }
    >
      <SurfaceHoneycombNeedlePath step={current.pathStep} showLabels={step > 0} />
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        {current.body}
      </p>
    </IllustrationFrame>
  );
}

export function SurfaceHoneycombFrontBackCross() {
  return (
    <IllustrationFrame caption="Front, back, and cross-section - surface honeycomb decorates the ridge crowns without the deep honeycomb pull.">
      <SvgRoot viewBox="0 0 620 305" aria-label="Surface honeycomb front back and cross-section">
        <text x="104" y="24" textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Front
        </text>
        <g transform="translate(8 34) scale(0.34)">
          <PleatFabric count={8} startX={38} y={34} width={420} height={132} showLabels={false} />
          <SurfaceCells startX={38} pleatW={52.5} upperY={86} lowerY={126} cells={5} openness={0.5} />
          <DrawSurfaceRepeat bindCount={6} startX={38} width={420} upperY={86} lowerY={126} />
        </g>
        <text
          x="104"
          y="186"
          textAnchor="middle"
          fontSize="9"
          fill={ILLUSTRATION.inkMuted}
          fontFamily="var(--font-body), sans-serif"
        >
          Low decorative lattice
        </text>

        <text x="310" y="24" textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Back
        </text>
        <g transform="translate(222 42)">
          <rect x="0" y="0" width="176" height="108" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          <path d="M 0 0 H 176 V 108 H 0 Z" fill="url(#fabric-weave)" opacity="0.45" />
          {[22, 55, 88, 121].map((x, i) => (
            <g key={x}>
              <path
                d={`M ${x} ${38 + (i % 2) * 26} C ${x + 12} ${35 + (i % 2) * 26}, ${
                  x + 25
                } ${35 + (i % 2) * 26}, ${x + 36} ${38 + (i % 2) * 26}`}
                fill="none"
                stroke={ILLUSTRATION.sage}
                strokeWidth="1.6"
                opacity="0.55"
              />
              <circle cx={x + 2} cy={38 + (i % 2) * 26} r="1.8" fill={ILLUSTRATION.sage} opacity="0.5" />
            </g>
          ))}
          <text
            x="88"
            y="132"
            textAnchor="middle"
            fontSize="9"
            fill={ILLUSTRATION.inkMuted}
            fontFamily="var(--font-body), sans-serif"
          >
            Small back nips, no heavy ridges
          </text>
        </g>

        <text x="516" y="24" textAnchor="middle" fontSize="12" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Cross-section
        </text>
        <g transform="translate(426 44)">
          <line x1="0" y1="42" x2="178" y2="42" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" opacity="0.45" />
          <line x1="0" y1="78" x2="178" y2="78" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" opacity="0.45" />
          {[8, 42, 76, 110, 144].map((x) => (
            <path
              key={x}
              d={`M ${x} 92 C ${x + 8} 36, ${x + 18} 36, ${x + 26} 92`}
              fill="none"
              stroke={ILLUSTRATION.fabricShadow}
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.9"
            />
          ))}
          <path d="M 21 78 C 36 74, 48 74, 63 78" fill="none" stroke={ILLUSTRATION.sage} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 63 78 C 71 66, 71 55, 63 42" fill="none" stroke={ILLUSTRATION.sage} strokeWidth="1.4" strokeDasharray="3 2" />
          <path d="M 63 42 C 78 38, 90 38, 105 42" fill="none" stroke={ILLUSTRATION.sage} strokeWidth="2.6" strokeLinecap="round" />
          <DirectionArrow
            x1={112}
            y1={26}
            x2={112}
            y2={48}
            color={ILLUSTRATION.burgundy}
            label="on surface"
          />
          <text
            x="89"
            y="126"
            textAnchor="middle"
            fontSize="9"
            fill={ILLUSTRATION.inkMuted}
            fontFamily="var(--font-body), sans-serif"
          >
            Binds sit proud of the pleat crowns
          </text>
        </g>
        <line x1="206" y1="20" x2="206" y2="185" stroke={ILLUSTRATION.creamDeeper} />
        <line x1="414" y1="20" x2="414" y2="185" stroke={ILLUSTRATION.creamDeeper} />
      </SvgRoot>
    </IllustrationFrame>
  );
}

function TensionMini({
  x,
  title,
  kind,
}: {
  x: number;
  title: string;
  kind: "tight" | "right" | "loose" | "deep";
}) {
  const upperY = 47;
  const lowerY = 78;
  const startX = 12;
  const pleatW = 24;
  const binds = honeycombBindPoints(4, startX, pleatW, lowerY, upperY);
  const color = kind === "right" ? ILLUSTRATION.sage : kind === "deep" ? ILLUSTRATION.burgundy : ILLUSTRATION.gold;
  const cellOpen = kind === "right" ? 0.58 : kind === "tight" ? 0.18 : kind === "loose" ? 0.78 : 0.95;

  return (
    <g transform={`translate(${x} 12)`}>
      <text x="70" y="10" textAnchor="middle" fontSize="11" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
        {title}
      </text>
      <rect x="0" y="20" width="140" height="88" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={i}
          x1={20 + i * 18}
          y1="26"
          x2={20 + i * 18}
          y2="101"
          stroke={kind === "deep" ? ILLUSTRATION.fabricShadow : ILLUSTRATION.inkFaint}
          strokeWidth={kind === "deep" ? 2 : 0.8}
          opacity={kind === "loose" ? 0.2 : 0.35}
        />
      ))}
      <SurfaceCells startX={startX} pleatW={pleatW} upperY={upperY} lowerY={lowerY} cells={3} openness={cellOpen} />
      {binds.map((bind, i) => (
        <g key={i}>
          <SurfaceBind
            bind={bind}
            color={color}
            strokeWidth={kind === "loose" ? 1.8 : kind === "deep" ? 3.6 : 2.5}
            opacity={kind === "loose" ? 0.72 : 1}
            showSeat={kind !== "loose"}
          />
          {i < binds.length - 1 && (
            <SurfaceTravel
              x={bind.x2}
              y1={bind.y}
              y2={binds[i + 1].y}
              color={color}
              opacity={kind === "loose" ? 0.25 : 0.5}
            />
          )}
        </g>
      ))}
      {kind === "tight" && (
        <path d="M 30 101 C 54 88, 85 88, 110 101" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.3" strokeDasharray="3 2" />
      )}
      {kind === "loose" && (
        <path d="M 24 50 C 45 32, 82 100, 112 65" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1.4" strokeDasharray="4 3" />
      )}
      {kind === "deep" && (
        <text x="70" y="123" textAnchor="middle" fontSize="8" fill={ILLUSTRATION.burgundy} fontFamily="var(--font-body), sans-serif">
          slipping into classic pull
        </text>
      )}
    </g>
  );
}

export function SurfaceHoneycombTensionDiagram() {
  return (
    <IllustrationFrame caption="Surface honeycomb tension - flatter than classic, firm enough to hold but never cinched into deep pockets.">
      <SvgRoot viewBox="0 0 640 160" aria-label="Surface honeycomb tension examples">
        <TensionMini x={0} title="Too tight" kind="tight" />
        <TensionMini x={160} title="Balanced surface" kind="right" />
        <TensionMini x={320} title="Too loose" kind="loose" />
        <TensionMini x={480} title="Too deep" kind="deep" />
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SurfaceHoneycombMistakeDiagrams() {
  const mistakes = [
    {
      title: "Deep classic pull",
      note: "Thread dives into the cells and the surface sparkle disappears.",
      kind: "deep",
    },
    {
      title: "Long surface carry",
      note: "Travel becomes a slash across the face instead of a short rise.",
      kind: "carry",
    },
    {
      title: "Stacked pair",
      note: "Binding the same pair on both rows removes the honeycomb offset.",
      kind: "stack",
    },
    {
      title: "Buried bite",
      note: "A deep needle bite drags the fabric valley into the stitch.",
      kind: "buried",
    },
  ] as const;

  return (
    <IllustrationFrame caption="Common surface honeycomb mistakes - the variant fails when it becomes too deep, too long, or loses the stagger.">
      <div className="grid gap-4 sm:grid-cols-2">
        {mistakes.map((mistake) => (
          <div key={mistake.title} className="rounded border border-border bg-cream/50 p-3">
            <SvgRoot viewBox="0 0 230 120" aria-label={mistake.title} className="max-w-full">
              <rect x="10" y="14" width="210" height="80" rx="5" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              {[32, 66, 100, 134, 168, 202].map((x) => (
                <line key={x} x1={x} y1="20" x2={x} y2="88" stroke={ILLUSTRATION.inkFaint} strokeWidth="0.8" opacity="0.32" />
              ))}
              <line x1="20" y1="42" x2="210" y2="42" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" opacity="0.35" />
              <line x1="20" y1="70" x2="210" y2="70" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" opacity="0.35" />

              {mistake.kind === "deep" && (
                <>
                  <path d="M 40 72 Q 62 50 84 72" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="4" strokeLinecap="round" />
                  <ellipse cx="62" cy="56" rx="18" ry="24" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="1" opacity="0.5" />
                  <path d="M 84 72 C 91 60, 91 53, 84 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2" strokeDasharray="3 2" />
                  <path d="M 84 42 Q 106 20 128 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="4" strokeLinecap="round" />
                </>
              )}
              {mistake.kind === "carry" && (
                <>
                  <path d="M 40 70 C 52 66, 66 66, 78 70" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                  <line x1="78" y1="70" x2="132" y2="42" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                  <path d="M 132 42 C 144 38, 158 38, 170 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                </>
              )}
              {mistake.kind === "stack" && (
                <>
                  <path d="M 44 70 C 56 66, 70 66, 82 70" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                  <path d="M 44 42 C 56 38, 70 38, 82 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3" />
                  <rect x="38" y="34" width="52" height="44" fill="none" stroke={ILLUSTRATION.burgundy} strokeDasharray="4 3" />
                </>
              )}
              {mistake.kind === "buried" && (
                <>
                  <path d="M 42 70 C 58 78, 74 78, 90 70" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.4" />
                  <path d="M 48 50 C 70 84, 92 84, 114 50" fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="2" opacity="0.8" />
                  <Needle x={92} y={46} angle={72} length={46} />
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

export function SurfaceHoneycombTroubleshootingDiagram() {
  return (
    <IllustrationFrame caption="Troubleshooting map - diagnose whether the problem is depth, spacing, stagger, or travel length.">
      <SvgRoot viewBox="0 0 620 210" aria-label="Surface honeycomb troubleshooting map">
        {[
          { x: 24, title: "Cells too deep", fix: "Ease tension" },
          { x: 178, title: "Surface slashes", fix: "Shorten travel" },
          { x: 332, title: "No low lozenges", fix: "Restore stagger" },
          { x: 486, title: "Loose loops", fix: "Seat the bind" },
        ].map((item, i) => (
          <g key={item.title} transform={`translate(${item.x} 28)`}>
            <rect width="112" height="112" rx="8" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
            <line x1="16" y1="42" x2="96" y2="42" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
            <line x1="16" y1="72" x2="96" y2="72" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="3 3" opacity="0.35" />
            {i === 0 && (
              <>
                <path d="M 18 72 Q 36 50 54 72" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="3.4" />
                <ellipse cx="36" cy="57" rx="15" ry="22" fill="none" stroke={ILLUSTRATION.burgundy} opacity="0.45" />
              </>
            )}
            {i === 1 && (
              <>
                <path d="M 16 72 C 28 68, 40 68, 52 72" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
                <line x1="52" y1="72" x2="90" y2="42" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
              </>
            )}
            {i === 2 && (
              <>
                <path d="M 20 72 C 32 68, 46 68, 58 72" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
                <path d="M 20 42 C 32 38, 46 38, 58 42" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2.8" />
              </>
            )}
            {i === 3 && (
              <>
                <path d="M 18 70 C 38 34, 74 104, 96 56" fill="none" stroke={ILLUSTRATION.burgundy} strokeWidth="2" strokeDasharray="5 3" />
                <circle cx="18" cy="70" r="2.4" fill={ILLUSTRATION.burgundy} />
                <circle cx="96" cy="56" r="2.4" fill={ILLUSTRATION.burgundy} />
              </>
            )}
            <text x="56" y="136" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
              {item.title}
            </text>
            <text x="56" y="151" textAnchor="middle" fontSize="8.5" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
              {item.fix}
            </text>
          </g>
        ))}
        {[145, 299, 453].map((x) => (
          <DirectionArrow key={x} x1={x} y1={84} x2={x + 22} y2={84} color={ILLUSTRATION.dustyBlue} />
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SurfaceHoneycombVariationsDiagram() {
  return (
    <IllustrationFrame caption="Surface honeycomb variations - keep the shallow bind; vary row spacing, thread color, and repeat scale.">
      <SvgRoot viewBox="0 0 620 190" aria-label="Surface honeycomb variation examples">
        {[
          { x: 16, label: "Fine surface", upper: 56, lower: 78, color: ILLUSTRATION.sage },
          { x: 170, label: "Wide decorative", upper: 46, lower: 86, color: ILLUSTRATION.gold },
          { x: 324, label: "Two-color", upper: 52, lower: 82, color: ILLUSTRATION.burgundy },
          { x: 478, label: "Border band", upper: 58, lower: 82, color: ILLUSTRATION.dustyBlue },
        ].map((variant) => {
          const binds = honeycombBindPoints(4, 10, 25, variant.lower, variant.upper);
          return (
            <g key={variant.label} transform={`translate(${variant.x} 22)`}>
              <rect width="126" height="104" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              <SurfaceCells startX={10} pleatW={25} upperY={variant.upper} lowerY={variant.lower} cells={3} openness={0.5} color={variant.color} />
              {variant.label === "Border band" && (
                <>
                  <path d="M 12 34 L 28 28 L 44 34 L 60 28 L 76 34 L 92 28 L 108 34" fill="none" stroke={ILLUSTRATION.thread} strokeWidth="1.8" />
                  <path d="M 12 94 L 28 88 L 44 94 L 60 88 L 76 94 L 92 88 L 108 94" fill="none" stroke={ILLUSTRATION.thread} strokeWidth="1.8" />
                </>
              )}
              {binds.map((bind, i) => (
                <g key={i}>
                  <SurfaceBind bind={bind} color={variant.label === "Two-color" && i % 2 ? ILLUSTRATION.gold : variant.color} strokeWidth={2.2} />
                  {i < binds.length - 1 && (
                    <SurfaceTravel
                      x={bind.x2}
                      y1={bind.y}
                      y2={binds[i + 1].y}
                      color={variant.label === "Two-color" && i % 2 ? ILLUSTRATION.gold : variant.color}
                      opacity={0.45}
                    />
                  )}
                </g>
              ))}
              <text x="63" y="138" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
                {variant.label}
              </text>
            </g>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SurfaceHoneycombGarmentsDiagram() {
  return (
    <IllustrationFrame caption="Garment placements - surface honeycomb works best where decoration should lie flatter than an elastic honeycomb field.">
      <SvgRoot viewBox="0 0 620 220" aria-label="Surface honeycomb garment placements">
        {[
          { x: 20, label: "Yoke accent", kind: "yoke" },
          { x: 170, label: "Bishop band", kind: "bishop" },
          { x: 320, label: "Cuff trim", kind: "cuff" },
          { x: 470, label: "Heirloom inset", kind: "inset" },
        ].map((garment) => (
          <g key={garment.label} transform={`translate(${garment.x} 28)`}>
            <rect width="126" height="126" rx="6" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
            {garment.kind === "yoke" && (
              <>
                <path d="M 18 24 C 44 46, 82 46, 108 24" fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="2" />
                <rect x="20" y="54" width="86" height="34" rx="4" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
              </>
            )}
            {garment.kind === "bishop" && (
              <>
                <path d="M 26 18 C 40 40, 86 40, 100 18" fill="none" stroke={ILLUSTRATION.fabricShadow} strokeWidth="2" />
                <rect x="18" y="50" width="90" height="42" rx="4" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
              </>
            )}
            {garment.kind === "cuff" && (
              <>
                <rect x="24" y="30" width="78" height="70" rx="18" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
                <rect x="18" y="72" width="90" height="28" rx="4" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              </>
            )}
            {garment.kind === "inset" && (
              <>
                <rect x="22" y="20" width="82" height="82" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
                <rect x="34" y="34" width="58" height="54" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
              </>
            )}
            <g transform="translate(16 48) scale(0.75)">
              <DrawSurfaceRepeat bindCount={4} startX={8} width={108} upperY={34} lowerY={58} color={ILLUSTRATION.sage} />
            </g>
            <text x="63" y="155" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
              {garment.label}
            </text>
          </g>
        ))}
      </SvgRoot>
    </IllustrationFrame>
  );
}

export function SurfaceHoneycombTheoryDiagram() {
  return (
    <IllustrationFrame caption="Theory - surface honeycomb preserves the staggered pair-bind logic while reducing row depth and pull.">
      <SvgRoot viewBox="0 0 620 260" aria-label="Surface honeycomb theory comparison">
        <text x="155" y="24" textAnchor="middle" fontSize="13" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Classic honeycomb
        </text>
        <g transform="translate(28 42)">
          <rect width="254" height="132" rx="7" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          <line x1="24" y1="36" x2="230" y2="36" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" opacity="0.45" />
          <line x1="24" y1="100" x2="230" y2="100" stroke={ILLUSTRATION.dustyBlue} strokeDasharray="4 3" opacity="0.45" />
          {honeycombBindPoints(5, 24, 38, 100, 36).map((bind, i, arr) => (
            <g key={i}>
              <path
                d={`M ${bind.x1} ${bind.y} Q ${(bind.x1 + bind.x2) / 2} ${bind.y - 9} ${bind.x2} ${bind.y}`}
                fill="none"
                stroke={ILLUSTRATION.sage}
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {i < arr.length - 1 && (
                <line x1={bind.x2} y1={bind.y} x2={bind.x2} y2={arr[i + 1].y} stroke={ILLUSTRATION.sage} strokeWidth="1.8" strokeDasharray="3 2" />
              )}
            </g>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={82 + i * 38} cy="68" rx="17" ry="28" fill="none" stroke={ILLUSTRATION.burgundy} opacity="0.38" />
          ))}
          <text x="127" y="157" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Deeper row spacing plus stronger pull opens elastic cells
          </text>
        </g>

        <text x="465" y="24" textAnchor="middle" fontSize="13" fill={ILLUSTRATION.ink} fontFamily="var(--font-display), serif">
          Surface honeycomb
        </text>
        <g transform="translate(338 42)">
          <rect width="254" height="132" rx="7" fill={ILLUSTRATION.fabric} stroke={ILLUSTRATION.fabricShadow} />
          <SurfaceRows startX={24} width={206} upperY={52} lowerY={84} showLabels={false} />
          <SurfaceCells startX={24} pleatW={38} upperY={52} lowerY={84} cells={4} openness={0.52} color={ILLUSTRATION.burgundy} />
          {honeycombBindPoints(5, 24, 38, 84, 52).map((bind, i, arr) => (
            <g key={i}>
              <SurfaceBind bind={bind} color={ILLUSTRATION.sage} strokeWidth={2.7} />
              {i < arr.length - 1 && (
                <SurfaceTravel x={bind.x2} y1={bind.y} y2={arr[i + 1].y} opacity={0.5} />
              )}
            </g>
          ))}
          <text x="127" y="157" textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Closer rows plus shallow binds make flat decorative lozenges
          </text>
        </g>

        <g transform="translate(112 216)">
          <text x="0" y="0" fontSize="10" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            Elasticity
          </text>
          <rect x="70" y="-10" width="170" height="10" rx="5" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
          <rect x="70" y="-10" width="132" height="10" rx="5" fill={ILLUSTRATION.sage} opacity="0.65" />
          <rect x="380" y="-10" width="170" height="10" rx="5" fill="var(--cream)" stroke={ILLUSTRATION.creamDeeper} />
          <rect x="380" y="-10" width="62" height="10" rx="5" fill={ILLUSTRATION.sage} opacity="0.65" />
          <text x="155" y="18" textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            classic: high give
          </text>
          <text x="465" y="18" textAnchor="middle" fontSize="9" fill={ILLUSTRATION.inkMuted} fontFamily="var(--font-body), sans-serif">
            surface: lower give
          </text>
        </g>
      </SvgRoot>
    </IllustrationFrame>
  );
}
