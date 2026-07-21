import Link from "next/link";
import type { EmbroideryMeta } from "@/lib/embroidery";

const templateSections = [
  "Finished appearance on flat fabric",
  "Animated construction sequence",
  "Needle path diagram",
  "Thread tension examples",
  "Common mistakes",
  "Troubleshooting",
  "Variations",
  "How it combines with smocking",
];

export function PlannedEmbroideryChapter({ stitch }: { stitch: EmbroideryMeta }) {
  return (
    <div className="site-container max-w-3xl py-12">
      <div className="callout-warn callout">
        <p className="text-sm text-ink-muted">
          <strong className="text-ink">Chapter planned.</strong> This embroidery stitch will be
          completed to the same standard as{" "}
          <Link href="/embroidery/bullion/" className="text-dusty-blue-deep">
            Bullion
          </Link>
          ,{" "}
          <Link href="/embroidery/lazy-daisy/" className="text-dusty-blue-deep">
            Lazy Daisy
          </Link>
          , and the other finished companion chapters.
        </p>
      </div>
      <h2 className="mt-10 font-serif text-2xl text-ink">What you&rsquo;ll learn</h2>
      <p className="mt-3 text-ink-muted">{stitch.description}</p>
      <p className="mt-3 text-sm text-ink-muted">
        <strong className="text-ink">With smocking:</strong> {stitch.withSmocking}
      </p>
      <h2 className="mt-10 font-serif text-2xl text-ink">Chapter checklist</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink-muted">
        {templateSections.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <div className="mt-10">
        <Link
          href="/embroidery/"
          className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
        >
          Back to embroidery index
        </Link>
      </div>
    </div>
  );
}
