"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export function StitchChapterLayout({
  toc,
  children,
  callout,
  prev,
  next,
  sources,
}: {
  toc: { id: string; label: string }[];
  children: ReactNode;
  callout?: ReactNode;
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
  sources: string;
}) {
  return (
    <div className="site-container">
      <div className="grid gap-10 py-10 lg:grid-cols-[220px_1fr]">
        <aside className="no-print lg:sticky lg:top-24 lg:self-start">
          <p className="label-caps mb-3">On this page</p>
          <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="whitespace-nowrap text-sm text-ink-muted no-underline hover:text-burgundy lg:whitespace-normal"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 max-w-3xl">
          {callout}
          {children}
          <section className="mt-16 rounded border border-border bg-cream-deep/30 p-6">
            <p className="label-caps mb-2">Sources &amp; verification</p>
            <p className="text-sm leading-relaxed text-ink-muted">{sources}</p>
          </section>
          <div className="mt-10 flex flex-wrap gap-3">
            {prev && (
              <Link
                href={prev.href}
                className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
              >
                ← {prev.label}
              </Link>
            )}
            {next && (
              <Link
                href={next.href}
                className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
              >
                {next.label} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TroubleshootList({
  items,
}: {
  items: { problem: string; fix: string }[];
}) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((item) => (
        <div key={item.problem} className="rounded border border-border bg-paper/60 p-4">
          <p className="font-medium text-ink">{item.problem}</p>
          <p className="mt-1 text-sm text-ink-muted">{item.fix}</p>
        </div>
      ))}
    </div>
  );
}

export function VariationGrid({
  variants,
}: {
  variants: { name: string; note: string }[];
}) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((v) => (
        <div key={v.name} className="rounded border border-border bg-paper px-4 py-3">
          <p className="font-serif text-lg text-ink">{v.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{v.note}</p>
        </div>
      ))}
    </div>
  );
}

export const STANDARD_TOC = [
  { id: "appearance", label: "Finished appearance" },
  { id: "pleats", label: "Pleat diagram" },
  { id: "construction", label: "Animated construction" },
  { id: "needle-path", label: "Needle path" },
  { id: "front-back", label: "Front · Back · Cross-section" },
  { id: "tension", label: "Thread tension" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "variations", label: "Variations" },
  { id: "garments", label: "Garment examples" },
  { id: "theory", label: "Why it works" },
] as const;
