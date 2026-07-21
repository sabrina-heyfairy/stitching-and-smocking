"use client";

import { useState } from "react";
import type { PlateCell, PlateMeta } from "@/lib/plate-types";
import { getPlateCell } from "@/lib/plate-types";
import { ILLUSTRATION, IllustrationFrame, SvgRoot } from "@/components/illustrations/IllustrationFrame";

const KIND_LABEL: Record<PlateCell["kind"], string> = {
  empty: "Empty",
  cable: "Cable",
  outline: "Outline",
  stem: "Stem",
  "wave-up": "Wave ↑",
  "wave-down": "Wave ↓",
  honeycomb: "Honeycomb",
  trellis: "Trellis",
  "van-dyke": "Van Dyke",
};

function cellSymbol(kind: PlateCell["kind"]): string {
  switch (kind) {
    case "cable":
      return "C";
    case "outline":
      return "O";
    case "stem":
      return "S";
    case "wave-up":
      return "↗";
    case "wave-down":
      return "↘";
    case "honeycomb":
      return "H";
    case "trellis":
      return "T";
    case "van-dyke":
      return "V";
    default:
      return "";
  }
}

export function PlateGraph({ plate }: { plate: PlateMeta }) {
  const [showLabels, setShowLabels] = useState(true);
  const [hover, setHover] = useState<{ row: number; pleat: number } | null>(null);
  const cellW = Math.min(28, 520 / plate.pleats);
  const cellH = 28;
  const originX = 48;
  const originY = 36;
  const width = originX + plate.pleats * cellW + 16;
  const height = originY + plate.rows * cellH + 40;

  const hovered = hover ? getPlateCell(plate, hover.row, hover.pleat) : null;

  return (
    <IllustrationFrame
      caption={`${plate.rows} gathering rows × ${plate.pleats} pleats · repeat every ${plate.repeatPleats} pleat${plate.repeatPleats === 1 ? "" : "s"}`}
      controls={
        <>
          <button
            type="button"
            className="rounded border border-border bg-paper px-3 py-1 text-xs text-ink-muted hover:bg-cream-deep"
            onClick={() => setShowLabels((v) => !v)}
          >
            {showLabels ? "Hide labels" : "Show labels"}
          </button>
          {hover && (
            <span className="text-xs text-ink-faint">
              Row {hover.row}, Pleat {hover.pleat}
              {hovered && hovered.kind !== "empty" ? ` · ${KIND_LABEL[hovered.kind]}` : " · empty"}
            </span>
          )}
        </>
      }
    >
      <SvgRoot
        viewBox={`0 0 ${width} ${height}`}
        aria-label={`Smocking plate graph for ${plate.title}`}
        className="max-w-full"
      >
        {/* Column headers — pleat numbers */}
        {showLabels &&
          Array.from({ length: plate.pleats }, (_, i) => (
            <text
              key={`p-${i}`}
              x={originX + i * cellW + cellW / 2}
              y={originY - 10}
              textAnchor="middle"
              fontSize="8"
              fill={ILLUSTRATION.inkFaint}
              fontFamily="var(--font-body), sans-serif"
            >
              {i + 1}
            </text>
          ))}
        {Array.from({ length: plate.rows }, (_, r) => {
          const row = r + 1;
          return (
            <g key={`row-${row}`}>
              {showLabels && (
                <text
                  x={originX - 8}
                  y={originY + r * cellH + cellH / 2 + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill={ILLUSTRATION.dustyBlue}
                  fontFamily="var(--font-body), sans-serif"
                >
                  R{row}
                </text>
              )}
              {Array.from({ length: plate.pleats }, (_, p) => {
                const pleat = p + 1;
                const cell = getPlateCell(plate, row, pleat);
                const x = originX + p * cellW;
                const y = originY + r * cellH;
                const active = hover?.row === row && hover?.pleat === pleat;
                const color = cell.kind === "empty" ? "transparent" : (cell.color ?? ILLUSTRATION.thread);
                return (
                  <g
                    key={`${row}-${pleat}`}
                    onMouseEnter={() => setHover({ row, pleat })}
                    onMouseLeave={() => setHover(null)}
                    className="cursor-crosshair"
                  >
                    <rect
                      x={x}
                      y={y}
                      width={cellW}
                      height={cellH}
                      fill={cell.kind === "empty" ? ILLUSTRATION.fabric : `${color}33`}
                      stroke={active ? ILLUSTRATION.gold : ILLUSTRATION.fabricShadow}
                      strokeWidth={active ? 1.5 : 0.6}
                    />
                    {cell.kind !== "empty" && (
                      <>
                        <circle
                          cx={x + cellW / 2}
                          cy={y + cellH / 2}
                          r={Math.min(6, cellW / 3)}
                          fill={color}
                          opacity="0.9"
                        />
                        {showLabels && cellW >= 18 && (
                          <text
                            x={x + cellW / 2}
                            y={y + cellH / 2 + 3}
                            textAnchor="middle"
                            fontSize="7"
                            fill="#fff"
                            fontFamily="var(--font-body), sans-serif"
                            fontWeight="600"
                          >
                            {cellSymbol(cell.kind)}
                          </text>
                        )}
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* Repeat marker */}
        {plate.repeatPleats > 1 && showLabels && (
          <line
            x1={originX + plate.repeatPleats * cellW}
            y1={originY - 4}
            x2={originX + plate.repeatPleats * cellW}
            y2={originY + plate.rows * cellH + 4}
            stroke={ILLUSTRATION.gold}
            strokeWidth="1"
            strokeDasharray="3 2"
          />
        )}
      </SvgRoot>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-muted">
        {Object.entries(KIND_LABEL)
          .filter(([k]) => k !== "empty")
          .filter(([k]) =>
            Object.values(plate.cells).some((c) => c.kind === k),
          )
          .map(([k, label]) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm bg-cream-deep text-[9px] font-semibold text-ink">
                {cellSymbol(k as PlateCell["kind"])}
              </span>
              {label}
            </span>
          ))}
      </div>
    </IllustrationFrame>
  );
}

/** Simplified finished rendering of the plate on stylized pleats. */
export function PlateFinishedPreview({ plate }: { plate: PlateMeta }) {
  const startX = 30;
  const width = 540;
  const count = Math.min(plate.pleats, 20);
  const pleatW = width / count;
  const top = 50;
  const rowGap = 140 / Math.max(plate.rows - 1, 1);

  return (
    <IllustrationFrame caption="Finished appearance (schematic) — stitch colors match the plate thread key">
      <SvgRoot viewBox="0 0 600 240" aria-label={`Finished preview of ${plate.title}`}>
        {/* Pleat background */}
        {Array.from({ length: count }).map((_, i) => {
          const x = startX + i * pleatW;
          return (
            <path
              key={i}
              d={`M ${x} 40 L ${x + pleatW / 2} 70 L ${x + pleatW} 40 L ${x + pleatW} 210 L ${x + pleatW / 2} 180 L ${x} 210 Z`}
              fill={i % 2 === 0 ? ILLUSTRATION.fabric : ILLUSTRATION.mountain}
              stroke={ILLUSTRATION.fabricShadow}
              strokeWidth="0.5"
              opacity="0.95"
            />
          );
        })}
        {/* Draw stitches per row as connected paths where consecutive cells share a kind */}
        {Array.from({ length: plate.rows }, (_, r) => {
          const row = r + 1;
          const y = top + r * rowGap;
          const pts: { x: number; color: string; kind: string }[] = [];
          for (let p = 1; p <= count; p++) {
            const cell = getPlateCell(plate, row, p);
            if (cell.kind !== "empty") {
              pts.push({
                x: startX + (p - 1) * pleatW + pleatW / 2,
                color: cell.color ?? ILLUSTRATION.thread,
                kind: cell.kind,
              });
            }
          }
          if (pts.length < 2) {
            return pts.map((pt, i) => (
              <circle key={`${row}-${i}`} cx={pt.x} cy={y} r={3} fill={pt.color} />
            ));
          }
          // Group consecutive
          const d = pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${y}`).join(" ");
          return (
            <g key={row}>
              <path
                d={d}
                fill="none"
                stroke={pts[0].color}
                strokeWidth={pts[0].kind.includes("wave") || pts[0].kind === "trellis" || pts[0].kind === "van-dyke" ? 2.4 : 3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {pts.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={y} r={2.5} fill={pt.color} />
              ))}
            </g>
          );
        })}
      </SvgRoot>
    </IllustrationFrame>
  );
}
