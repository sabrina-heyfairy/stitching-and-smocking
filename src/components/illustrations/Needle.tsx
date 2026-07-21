"use client";

import { ILLUSTRATION } from "./IllustrationFrame";

export interface NeedleProps {
  x: number;
  y: number;
  /** degrees, 0 = pointing right */
  angle?: number;
  length?: number;
  showEye?: boolean;
  opacity?: number;
  label?: string;
}

/**
 * Technical embroidery needle with eye, shaft, and point.
 */
export function Needle({
  x,
  y,
  angle = -25,
  length = 70,
  showEye = true,
  opacity = 1,
  label,
}: NeedleProps) {
  const eyeX = 8;
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle})`}
      opacity={opacity}
      filter="url(#soft-shadow)"
    >
      {/* Shaft */}
      <rect
        x={eyeX + 6}
        y={-2.2}
        width={length - 18}
        height={4.4}
        rx={1.2}
        fill="url(#needle-grad)"
      />
      {/* Point */}
      <polygon
        points={`${length},0 ${length - 12},-2.4 ${length - 12},2.4`}
        fill={ILLUSTRATION.needle}
      />
      {/* Eye */}
      {showEye && (
        <>
          <ellipse
            cx={eyeX}
            cy={0}
            rx={7}
            ry={3.2}
            fill="none"
            stroke={ILLUSTRATION.needle}
            strokeWidth="2"
          />
          <ellipse cx={eyeX} cy={0} rx={4} ry={1.4} fill={ILLUSTRATION.fabric} opacity="0.3" />
        </>
      )}
      {label && (
        <text
          x={length / 2}
          y={-10}
          textAnchor="middle"
          fontSize="9"
          fill={ILLUSTRATION.inkMuted}
          transform={`rotate(${-angle})`}
          fontFamily="var(--font-body), sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function DirectionArrow({
  x1,
  y1,
  x2,
  y2,
  color = ILLUSTRATION.dustyBlue,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  label?: string;
}) {
  const id = `arrow-${x1}-${y1}-${x2}-${y2}`.replace(/\./g, "");
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 8;
  return (
    <g>
      <defs>
        <marker
          id={id}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill={color} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1.5"
        markerEnd={`url(#${id})`}
      />
      {label && (
        <text
          x={mx}
          y={my}
          textAnchor="middle"
          fontSize="9"
          fill={color}
          fontFamily="var(--font-body), sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
}
