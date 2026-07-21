"use client";

import type { ReactNode } from "react";
import { ILLUSTRATION, SvgRoot } from "./IllustrationFrame";

/** Flat heirloom fabric ground for surface embroidery diagrams (not pleated). */
export function FlatFabric({
  x = 40,
  y = 40,
  width = 520,
  height = 200,
  showGrain = true,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  showGrain?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        fill={ILLUSTRATION.fabric}
        stroke={ILLUSTRATION.fabricShadow}
        strokeWidth="1"
        filter="url(#soft-shadow)"
      />
      {showGrain && (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={3}
          fill="url(#fabric-weave)"
          opacity="0.45"
        />
      )}
    </g>
  );
}

export function EmbroiderySvg({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <SvgRoot viewBox="0 0 600 280" aria-label={label}>
      {children}
    </SvgRoot>
  );
}
