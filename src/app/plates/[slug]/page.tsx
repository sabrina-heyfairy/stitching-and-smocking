import Link from "next/link";
import { notFound } from "next/navigation";
import { DifficultyBadge } from "@/components/Badge";
import { getPlate, plates } from "@/lib/plates";
import { PlateFinishedPreview, PlateGraph } from "@/components/plates/PlateGraph";

export function generateStaticParams() {
  return plates.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const plate = getPlate(slug);
    if (!plate) return { title: "Plate" };
    return { title: plate.title, description: plate.description };
  });
}

const stitchLinks: Record<string, string> = {
  "cable-stitch": "/stitches/cable-stitch/",
  "wave-stitch": "/stitches/wave-stitch/",
  honeycomb: "/stitches/honeycomb/",
  "outline-stitch": "/stitches/outline-stitch/",
  trellis: "/stitches/trellis/",
  "stem-stitch-smocking": "/stitches/stem-stitch-smocking/",
  "van-dyke": "/stitches/van-dyke/",
  "surface-honeycomb": "/stitches/surface-honeycomb/",
};

export default async function PlateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plate = getPlate(slug);
  if (!plate) notFound();

  const idx = plates.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? plates[idx - 1] : null;
  const next = idx < plates.length - 1 ? plates[idx + 1] : null;

  return (
    <article className="pb-20">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <nav className="mb-4 text-sm text-ink-faint">
            <Link href="/plates/" className="no-underline hover:text-ink">
              Plates
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{plate.title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={plate.difficulty} />
            <span className="rounded border border-border px-2 py-0.5 text-xs text-ink-faint">
              {plate.rows} rows × {plate.pleats} pleats
            </span>
          </div>
          <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">{plate.title}</h1>
          <p className="mt-3 max-w-2xl text-xl text-ink-muted">{plate.subtitle}</p>
          <p className="mt-4 max-w-2xl text-ink-muted">{plate.description}</p>
        </div>
      </header>

      <div className="site-container max-w-3xl py-10">
        <section id="graph" className="scroll-mt-24">
          <h2 className="font-serif text-3xl text-ink">Graph</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Rows are gathering rows (R1 at the top). Columns are pleats numbered left to right.
            Hover a cell for coordinates. Gold dashed line marks one repeat when applicable.
          </p>
          <PlateGraph plate={plate} />
        </section>

        <section id="finished" className="mt-12 scroll-mt-24">
          <h2 className="font-serif text-3xl text-ink">Finished example</h2>
          <PlateFinishedPreview plate={plate} />
        </section>

        <section id="threads" className="mt-12 scroll-mt-24">
          <h2 className="font-serif text-3xl text-ink">Thread colors</h2>
          <ul className="mt-4 space-y-3">
            {plate.threads.map((t) => (
              <li
                key={t.id}
                className="flex items-start gap-3 rounded border border-border bg-paper/60 px-4 py-3"
              >
                <span
                  className="mt-1 inline-block h-5 w-5 shrink-0 rounded-full border border-border"
                  style={{ background: t.hex }}
                />
                <div>
                  <p className="font-medium text-ink">{t.name}</p>
                  {t.note && <p className="text-sm text-ink-muted">{t.note}</p>}
                  <p className="text-xs text-ink-faint">{t.hex}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="instructions" className="mt-12 scroll-mt-24">
          <h2 className="font-serif text-3xl text-ink">Instructions</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-ink-muted">
            {plate.instructions.map((step) => (
              <li key={step} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section id="tips" className="mt-12 scroll-mt-24">
          <h2 className="font-serif text-3xl text-ink">Tips</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
            {plate.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section id="stitches" className="mt-12 scroll-mt-24">
          <h2 className="font-serif text-3xl text-ink">Stitches used</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {plate.stitchesUsed.map((s) => (
              <li key={s}>
                <Link
                  href={stitchLinks[s] ?? "/stitches/"}
                  className="rounded border border-border bg-paper px-3 py-1.5 text-sm text-dusty-blue-deep no-underline hover:bg-cream-deep"
                >
                  {s.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="garments" className="mt-12 scroll-mt-24">
          <h2 className="font-serif text-3xl text-ink">Suggested garments</h2>
          <p className="mt-3 text-ink-muted">{plate.garments.join(" · ")}</p>
        </section>

        <div className="mt-16 flex flex-wrap gap-3">
          {prev && (
            <Link
              href={`/plates/${prev.slug}/`}
              className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
            >
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link
              href={`/plates/${next.slug}/`}
              className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
            >
              {next.title} →
            </Link>
          )}
          <Link
            href="/plates/"
            className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
          >
            All plates
          </Link>
        </div>
      </div>
    </article>
  );
}
