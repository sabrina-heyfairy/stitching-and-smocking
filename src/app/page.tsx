import Link from "next/link";
import { sections } from "@/lib/navigation";
import { stitches } from "@/lib/stitches";
import { DifficultyBadge } from "@/components/Badge";

export default function HomePage() {
  const stitchGuides = stitches.filter((s) => s.status === "complete");

  return (
    <>
      {/* Hero — brand first, one composition */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(107,138,158,0.15), transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(122,63,69,0.08), transparent 35%),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 47px,
                rgba(106,99,90,0.04) 47px,
                rgba(106,99,90,0.04) 48px
              )
            `,
          }}
        />
        <div className="site-container relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24 lg:py-28">
          <div>
            <p className="label-caps mb-4 text-dusty-blue">Vintage Read 16 · Hand Smocking</p>
            <h1 className="font-serif text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              Sabrina&rsquo;s Guide to Smocking &amp; Stitching
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
              The complete visual encyclopedia for learning vintage English smocking — from
              pleater to finished garment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/learn/"
                className="rounded bg-burgundy px-5 py-2.5 text-sm font-medium text-paper no-underline transition hover:bg-burgundy-soft"
              >
                Start the Practice Path
              </Link>
              <Link
                href="/calculator/"
                className="rounded border border-border bg-paper/80 px-5 py-2.5 text-sm font-medium text-ink no-underline transition hover:bg-cream-deep"
              >
                Fabric Calculator
              </Link>
              <Link
                href="/pleater/"
                className="rounded border border-border bg-paper/80 px-5 py-2.5 text-sm font-medium text-ink no-underline transition hover:bg-cream-deep"
              >
                Read 16 Pleater
              </Link>
            </div>
          </div>

          {/* Dominant visual — pleated fabric atmosphere */}
          <div className="relative mx-auto w-full max-w-lg" aria-hidden>
            <svg viewBox="0 0 480 360" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="hero-fabric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f3ebe0" />
                  <stop offset="100%" stopColor="#cfc3ae" />
                </linearGradient>
              </defs>
              <rect x="20" y="40" width="440" height="280" rx="4" fill="url(#hero-fabric)" opacity="0.9" />
              {Array.from({ length: 14 }).map((_, i) => {
                const x = 40 + i * 30;
                return (
                  <g key={i}>
                    <path
                      d={`M ${x} 60 L ${x + 14} 100 L ${x + 28} 60 L ${x + 28} 300 L ${x + 14} 260 L ${x} 300 Z`}
                      fill={i % 2 === 0 ? "#e8dfd0" : "#d4c8b4"}
                      stroke="#b8aa96"
                      strokeWidth="0.5"
                      opacity="0.95"
                    />
                  </g>
                );
              })}
              {/* Cable stitch row */}
              <path
                d="M 54 180 L 84 168 L 114 180 L 144 168 L 174 180 L 204 168 L 234 180 L 264 168 L 294 180 L 324 168 L 354 180 L 384 168 L 414 180"
                fill="none"
                stroke="#7a3f45"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 54 200 L 84 212 L 114 200 L 144 212 L 174 200 L 204 212 L 234 200 L 264 212 L 294 200 L 324 212 L 354 200 L 384 212 L 414 200"
                fill="none"
                stroke="#6b8a9e"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="site-container py-16">
        <p className="label-caps mb-3">Could you complete the stitch without YouTube?</p>
        <h2 className="font-serif text-3xl text-ink md:text-4xl">Visual-first reference</h2>
        <p className="prose-guide mt-4 text-ink-muted">
          Every finished chapter shows where the needle goes, how the thread travels, what the
          fabric is doing, how tension changes the stitch, and what the front and back look like.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={section.href}
              className="group rounded border border-border bg-paper/70 p-5 no-underline transition hover:border-dusty-blue/40 hover:bg-paper"
            >
              <h3 className="font-serif text-xl text-ink group-hover:text-burgundy">
                {section.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-paper/50 py-16">
        <div className="site-container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-caps mb-3">Learn the core techniques</p>
              <h2 className="font-serif text-3xl text-ink">Smocking stitch guides</h2>
            </div>
            <Link href="/stitches/" className="text-sm text-dusty-blue-deep no-underline hover:text-burgundy">
              Full stitch index →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stitchGuides.map((s) => (
              <Link
                key={s.slug}
                href={`/stitches/${s.slug}/`}
                className="rounded border border-border bg-cream p-6 no-underline transition hover:border-dusty-blue/50"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <DifficultyBadge difficulty={s.difficulty} />
                </div>
                <h3 className="mt-3 font-serif text-2xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{s.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-4 rounded border border-dashed border-border bg-cream/40 p-6">
            <p className="label-caps mb-2">Stitch encyclopedia</p>
            <p className="text-sm leading-relaxed text-ink-muted">
              Learn the eight core English smocking stitches with illustrations, animations,
              tension studies, common mistakes, and troubleshooting.
            </p>
            <p className="mt-3 text-sm text-ink-faint">{stitchGuides.length} step-by-step stitch guides</p>
          </div>
        </div>
      </section>

      <section className="site-container py-16">
        <h2 className="font-serif text-3xl text-ink">For the Read 16 owner</h2>
        <p className="mt-4 max-w-xl text-ink-muted">
          Assume nothing. Machine history, exploded diagrams, threading every guide and hole,
          fabric prep, needle spacing, lubrication, and troubleshooting — so you can pleat with
          confidence.
        </p>
        <Link
          href="/pleater/"
          className="mt-6 inline-flex rounded border border-border bg-paper px-5 py-2.5 text-sm font-medium text-ink no-underline hover:bg-cream-deep"
        >
          Open the pleater encyclopedia
        </Link>
      </section>
    </>
  );
}
