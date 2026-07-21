"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { TroubleshootList, VariationGrid } from "@/components/chapters/StitchChapterLayout";

export const EMBROIDERY_TOC = [
  { id: "appearance", label: "Finished appearance" },
  { id: "construction", label: "Animated construction" },
  { id: "needle-path", label: "Needle path" },
  { id: "tension", label: "Thread tension" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "variations", label: "Variations" },
  { id: "with-smocking", label: "With smocking" },
  { id: "theory", label: "Why it works" },
] as const;

export function EmbroideryChapterLayout({
  toc = EMBROIDERY_TOC,
  children,
  callout,
  prev,
  next,
  sources,
}: {
  toc?: readonly { id: string; label: string }[];
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
            <Link
              href="/embroidery/"
              className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
            >
              Embroidery index
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TroubleshootList, VariationGrid };
