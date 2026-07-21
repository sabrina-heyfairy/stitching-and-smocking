"use client";

import { useState } from "react";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "./IllustrationFrame";

const PARTS = [
  { n: 1, name: "Needle bar", desc: "Holds the 16 needles in fixed spacing" },
  { n: 2, name: "Needles (16)", desc: "Fine pleating needles; spaced ~3/16\" on classic Read" },
  { n: 3, name: "Upper roller", desc: "Feeds fabric into the needles from above" },
  { n: 4, name: "Lower roller", desc: "Supports fabric and helps advance the pleats" },
  { n: 5, name: "Hooks / thread carriers", desc: "Carry gathering threads through each needle eye" },
  { n: 6, name: "Thread guides", desc: "Lead spool thread to each hook path" },
  { n: 7, name: "Spool pins / rack", desc: "Hold spools of gathering thread (often 16)" },
  { n: 8, name: "Crank / handle", desc: "Hand crank that advances rollers and needles" },
  { n: 9, name: "Adjustment screws", desc: "Roller pressure and alignment controls" },
  { n: 10, name: "Frame / chassis", desc: "Cast or stamped body that keeps timing true" },
];

/**
 * Numbered schematic of a Read-style 16-needle pleater.
 * Note: Exact castings vary by year/model. This diagram teaches functional anatomy
 * verified against common Read 16 layouts; confirm against your machine's manual
 * for screw positions and casting numbers.
 */
export function PleaterExplodedDiagram() {
  const [active, setActive] = useState<number | null>(1);
  const [showLabels, setShowLabels] = useState(true);

  return (
    <IllustrationFrame
      caption="Read 16-needle pleater — numbered parts. Click a number or list item to highlight."
      controls={
        <>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setShowLabels((v) => !v)}
          >
            {showLabels ? "Hide labels" : "Show labels"}
          </button>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setActive(null)}
          >
            Clear highlight
          </button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <SvgRoot viewBox="0 0 520 340" aria-label="Exploded diagram of Read 16-needle pleater">
          {/* Chassis */}
          <rect
            x={60}
            y={80}
            width={380}
            height={180}
            rx={8}
            fill={active === 10 ? "rgba(107,138,158,0.25)" : ILLUSTRATION.fabric}
            stroke={ILLUSTRATION.fabricShadow}
            strokeWidth="2"
          />
          {/* Spool rack */}
          <rect
            x={80}
            y={40}
            width={340}
            height={28}
            rx={4}
            fill={active === 7 ? "rgba(196,163,90,0.35)" : ILLUSTRATION.mountain}
            stroke={ILLUSTRATION.inkFaint}
          />
          {Array.from({ length: 16 }).map((_, i) => (
            <circle
              key={`spool-${i}`}
              cx={95 + i * 20}
              cy={54}
              r={5}
              fill={ILLUSTRATION.burgundySoft}
              opacity="0.7"
            />
          ))}
          {/* Thread guides */}
          <line
            x1={95}
            y1={68}
            x2={95}
            y2={100}
            stroke={active === 6 ? ILLUSTRATION.gold : ILLUSTRATION.inkFaint}
            strokeWidth={active === 6 ? 2 : 1}
          />
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={`tg-${i}`}
              x1={95 + i * 20}
              y1={68}
              x2={95 + i * 20}
              y2={105}
              stroke={active === 6 ? ILLUSTRATION.gold : ILLUSTRATION.threadAlt}
              strokeWidth={active === 6 ? 1.5 : 0.6}
              opacity="0.8"
            />
          ))}
          {/* Upper roller */}
          <rect
            x={100}
            y={110}
            width={300}
            height={22}
            rx={11}
            fill={active === 3 ? "rgba(107,138,158,0.4)" : ILLUSTRATION.needle}
            stroke={ILLUSTRATION.inkMuted}
          />
          {/* Needle bar */}
          <rect
            x={100}
            y={145}
            width={300}
            height={16}
            rx={2}
            fill={active === 1 ? "rgba(196,163,90,0.45)" : ILLUSTRATION.dustyBlue}
            opacity="0.85"
          />
          {/* Needles */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={`n-${i}`}
              x1={112 + i * 18}
              y1={161}
              x2={112 + i * 18}
              y2={195}
              stroke={active === 2 ? ILLUSTRATION.gold : ILLUSTRATION.needleShine}
              strokeWidth={active === 2 ? 2 : 1.2}
            />
          ))}
          {/* Hooks */}
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`h-${i}`}
              d={`M ${112 + i * 18} 200 q 4 8 0 14`}
              fill="none"
              stroke={active === 5 ? ILLUSTRATION.burgundy : ILLUSTRATION.inkMuted}
              strokeWidth={active === 5 ? 1.8 : 1}
            />
          ))}
          {/* Lower roller */}
          <rect
            x={100}
            y={220}
            width={300}
            height={22}
            rx={11}
            fill={active === 4 ? "rgba(107,138,158,0.4)" : ILLUSTRATION.needle}
            stroke={ILLUSTRATION.inkMuted}
          />
          {/* Crank */}
          <g opacity={active === 8 ? 1 : 0.85}>
            <circle cx={430} cy={170} r={18} fill={ILLUSTRATION.fabricShadow} stroke={ILLUSTRATION.inkMuted} />
            <line
              x1={430}
              y1={170}
              x2={455}
              y2={145}
              stroke={active === 8 ? ILLUSTRATION.gold : ILLUSTRATION.ink}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx={455} cy={145} r={6} fill={ILLUSTRATION.inkMuted} />
          </g>
          {/* Adjustment screws */}
          {[120, 380].map((x) => (
            <circle
              key={x}
              cx={x}
              cy={250}
              r={6}
              fill={active === 9 ? ILLUSTRATION.gold : ILLUSTRATION.inkFaint}
              stroke={ILLUSTRATION.inkMuted}
            />
          ))}

          {/* Number callouts */}
          {showLabels &&
            [
              { n: 7, x: 250, y: 28 },
              { n: 6, x: 50, y: 90 },
              { n: 3, x: 50, y: 122 },
              { n: 1, x: 50, y: 155 },
              { n: 2, x: 50, y: 180 },
              { n: 5, x: 50, y: 208 },
              { n: 4, x: 50, y: 232 },
              { n: 9, x: 120, y: 270 },
              { n: 8, x: 470, y: 170 },
              { n: 10, x: 250, y: 300 },
            ].map((c) => (
              <g
                key={c.n}
                className="cursor-pointer"
                onClick={() => setActive(c.n)}
              >
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={10}
                  fill={active === c.n ? ILLUSTRATION.burgundy : ILLUSTRATION.dustyBlue}
                />
                <text
                  x={c.x}
                  y={c.y + 3.5}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#fff"
                  fontFamily="var(--font-body), sans-serif"
                  fontWeight="600"
                >
                  {c.n}
                </text>
              </g>
            ))}
        </SvgRoot>

        <ol className="space-y-1.5 text-sm">
          {PARTS.map((p) => (
            <li key={p.n}>
              <button
                type="button"
                onClick={() => setActive(p.n)}
                className={`w-full rounded border px-3 py-2 text-left transition ${
                  active === p.n
                    ? "border-dusty-blue bg-dusty-blue/10"
                    : "border-transparent hover:bg-cream-deep/60"
                }`}
              >
                <span className="font-medium text-ink">
                  {p.n}. {p.name}
                </span>
                <span className="mt-0.5 block text-ink-muted">{p.desc}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-4 text-xs text-ink-faint">
        Uncertainty note: Roller diameter, spool-rack style, and exact screw placement vary by Read
        production year. Use this as functional anatomy; match fasteners to your casting.
      </p>
    </IllustrationFrame>
  );
}

export function ThreadingPathDiagram() {
  return (
    <IllustrationFrame caption="Gathering-thread path: spool → guide → hook → needle eye → fabric">
      <SvgRoot viewBox="0 0 560 200" aria-label="Pleater threading path">
        {/* Spool */}
        <rect x={30} y={30} width={36} height={50} rx={4} fill={ILLUSTRATION.burgundySoft} />
        <text x={48} y={100} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          1 Spool
        </text>
        {/* Guide */}
        <circle cx={140} cy={55} r={8} fill="none" stroke={ILLUSTRATION.dustyBlue} strokeWidth="2" />
        <text x={140} y={100} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          2 Guide
        </text>
        {/* Hook */}
        <path
          d="M 230 40 q 20 20 0 40"
          fill="none"
          stroke={ILLUSTRATION.ink}
          strokeWidth="2.5"
        />
        <text x={240} y={100} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          3 Hook
        </text>
        {/* Needle eye */}
        <line x1={320} y1={30} x2={320} y2={90} stroke={ILLUSTRATION.needle} strokeWidth="2" />
        <ellipse cx={320} cy={55} rx={5} ry={3} fill="none" stroke={ILLUSTRATION.gold} strokeWidth="2" />
        <text x={320} y={115} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          4 Needle eye
        </text>
        {/* Fabric */}
        <path
          d="M 400 40 L 430 55 L 460 40 L 490 55 L 520 40 L 520 90 L 490 75 L 460 90 L 430 75 L 400 90 Z"
          fill={ILLUSTRATION.fabric}
          stroke={ILLUSTRATION.fabricShadow}
        />
        <text x={460} y={115} textAnchor="middle" fontSize="10" fill={ILLUSTRATION.inkMuted}>
          5 Through fabric
        </text>
        {/* Thread path */}
        <path
          d="M 48 40 C 90 20, 110 20, 140 55 C 170 85, 200 85, 235 60 C 270 40, 295 40, 320 55 C 360 75, 390 50, 430 55"
          fill="none"
          stroke={ILLUSTRATION.thread}
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        <text x={280} y={160} textAnchor="middle" fontSize="11" fill={ILLUSTRATION.inkMuted}>
          Repeat for each of the 16 needles. Keep threads untangled and evenly tensioned.
        </text>
      </SvgRoot>
    </IllustrationFrame>
  );
}
