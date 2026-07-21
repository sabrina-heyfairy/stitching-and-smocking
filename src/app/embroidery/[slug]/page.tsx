import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { DifficultyBadge, StatusBadge } from "@/components/Badge";
import { embroideryStitches, getEmbroidery } from "@/lib/embroidery";
import { BullionChapter } from "@/components/chapters/BullionChapter";
import { FrenchKnotChapter } from "@/components/chapters/FrenchKnotChapter";
import { LazyDaisyChapter } from "@/components/chapters/LazyDaisyChapter";
import { FeatherChapter } from "@/components/chapters/FeatherChapter";
import { StemEmbroideryChapter } from "@/components/chapters/StemEmbroideryChapter";
import { SatinChapter } from "@/components/chapters/SatinChapter";
import { BackStitchChapter } from "@/components/chapters/BackStitchChapter";
import { ChainStitchChapter } from "@/components/chapters/ChainStitchChapter";
import { BlanketChapter } from "@/components/chapters/BlanketChapter";
import { OutlineEmbroideryChapter } from "@/components/chapters/OutlineEmbroideryChapter";
import { RunningStitchChapter } from "@/components/chapters/RunningStitchChapter";
import { PlannedEmbroideryChapter } from "@/components/chapters/PlannedEmbroideryChapter";

const chapters: Record<string, ComponentType> = {
  bullion: BullionChapter,
  "french-knot": FrenchKnotChapter,
  "lazy-daisy": LazyDaisyChapter,
  "feather-stitch": FeatherChapter,
  "stem-embroidery": StemEmbroideryChapter,
  "satin-stitch": SatinChapter,
  "back-stitch": BackStitchChapter,
  "chain-stitch": ChainStitchChapter,
  "blanket-stitch": BlanketChapter,
  "outline-embroidery": OutlineEmbroideryChapter,
  "running-stitch": RunningStitchChapter,
};

export function generateStaticParams() {
  return embroideryStitches.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const stitch = getEmbroidery(slug);
    if (!stitch) return { title: "Embroidery" };
    return { title: stitch.title, description: stitch.description };
  });
}

export default async function EmbroideryStitchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stitch = getEmbroidery(slug);
  if (!stitch) notFound();

  const Chapter = chapters[stitch.slug];

  return (
    <article className="pb-20">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <nav className="mb-4 text-sm text-ink-faint">
            <Link href="/embroidery/" className="no-underline hover:text-ink">
              Embroidery
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{stitch.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={stitch.difficulty} />
            <StatusBadge status={stitch.status} />
            <span className="rounded border border-border px-2 py-0.5 text-xs text-ink-faint">
              Surface embroidery
            </span>
          </div>
          <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl lg:text-6xl">
            {stitch.title}
          </h1>
          {stitch.subtitle && (
            <p className="mt-3 max-w-2xl text-xl text-ink-muted">{stitch.subtitle}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div>
              <p className="label-caps mb-1">Uses</p>
              <p className="text-ink-muted">{stitch.uses.join(" · ")}</p>
            </div>
            <div>
              <p className="label-caps mb-1">With smocking</p>
              <p className="max-w-md text-ink-muted">{stitch.withSmocking}</p>
            </div>
          </div>
        </div>
      </header>

      {Chapter ? <Chapter /> : <PlannedEmbroideryChapter stitch={stitch} />}
    </article>
  );
}
