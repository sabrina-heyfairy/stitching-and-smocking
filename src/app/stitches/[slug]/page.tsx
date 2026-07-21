import Link from "next/link";
import { notFound } from "next/navigation";
import { DifficultyBadge, StatusBadge } from "@/components/Badge";
import { getStitch, stitches } from "@/lib/stitches";
import { CableStitchChapter } from "@/components/chapters/CableStitchChapter";
import { WaveStitchChapter } from "@/components/chapters/WaveStitchChapter";
import { PlannedStitchChapter } from "@/components/chapters/PlannedStitchChapter";

export function generateStaticParams() {
  return stitches.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const stitch = getStitch(slug);
    if (!stitch) return { title: "Stitch" };
    return {
      title: stitch.title,
      description: stitch.description,
    };
  });
}

export default async function StitchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stitch = getStitch(slug);
  if (!stitch) notFound();

  return (
    <article className="pb-20">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <nav className="mb-4 text-sm text-ink-faint">
            <Link href="/stitches/" className="no-underline hover:text-ink">
              Stitches
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{stitch.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={stitch.difficulty} />
            <StatusBadge status={stitch.status} />
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
            {stitch.threadCount && (
              <div>
                <p className="label-caps mb-1">Thread</p>
                <p className="text-ink-muted">{stitch.threadCount}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {stitch.slug === "cable-stitch" ? (
        <CableStitchChapter />
      ) : stitch.slug === "wave-stitch" ? (
        <WaveStitchChapter />
      ) : (
        <PlannedStitchChapter stitch={stitch} />
      )}
    </article>
  );
}
