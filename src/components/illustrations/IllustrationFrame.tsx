"use client";

import { clsx } from "clsx";
import type { ReactNode, SVGProps } from "react";

export const ILLUSTRATION = {
  fabric: "var(--fabric)",
  fabricShadow: "var(--fabric-shadow)",
  mountain: "var(--pleat-mountain)",
  valley: "var(--pleat-valley)",
  thread: "var(--thread)",
  threadAlt: "var(--thread-alt)",
  needle: "var(--needle)",
  needleShine: "var(--needle-shine)",
  ink: "var(--ink)",
  inkMuted: "var(--ink-muted)",
  inkFaint: "var(--ink-faint)",
  gold: "var(--gold)",
  dustyBlue: "var(--dusty-blue)",
  sage: "var(--sage)",
  burgundy: "var(--burgundy)",
  burgundySoft: "var(--burgundy-soft)",
  creamDeeper: "var(--cream-deeper)",
  paper: "var(--paper)",
  border: "var(--border)",
  teal: "var(--muted-teal)",
} as const;

export function IllustrationFrame({
  children,
  caption,
  className,
  controls,
}: {
  children: ReactNode;
  caption?: string;
  className?: string;
  controls?: ReactNode;
}) {
  return (
    <figure className={clsx("illustration-frame my-6", className)}>
      {controls && <div className="stitch-controls mb-3 flex flex-wrap gap-2">{controls}</div>}
      <div className="overflow-x-auto">{children}</div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-ink-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

export function SvgRoot({
  children,
  viewBox,
  className,
  ...props
}: SVGProps<SVGSVGElement> & { viewBox: string }) {
  return (
    <svg
      viewBox={viewBox}
      className={clsx("mx-auto h-auto w-full max-w-3xl", className)}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <pattern id="fabric-weave" width="4" height="4" patternUnits="userSpaceOnUse">
          <path
            d="M0 2h4M2 0v4"
            stroke={ILLUSTRATION.fabricShadow}
            strokeWidth="0.3"
            opacity="0.35"
          />
        </pattern>
        <linearGradient id="needle-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={ILLUSTRATION.needle} />
          <stop offset="45%" stopColor={ILLUSTRATION.needleShine} />
          <stop offset="100%" stopColor={ILLUSTRATION.needle} />
        </linearGradient>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodOpacity="0.18" />
        </filter>
      </defs>
      {children}
    </svg>
  );
}
