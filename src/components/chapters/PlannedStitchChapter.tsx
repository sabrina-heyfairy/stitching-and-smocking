import Link from "next/link";
import type { StitchMeta } from "@/lib/types";

const templateSections = [
  "Finished appearance (full-color rendering)",
  "Realistic fabric / pleat illustration",
  "Animated construction sequence",
  "Needle path diagram",
  "Front · Back · Cross-section",
  "Pleat diagram with labels",
  "Thread tension examples",
  "Common mistakes",
  "Troubleshooting without full rip-out",
  "Variations",
  "Garment examples",
];

export function PlannedStitchChapter({ stitch }: { stitch: StitchMeta }) {
  return (
    <div className="site-container max-w-3xl py-12">
      <div className="callout-warn callout">
        <p className="text-sm text-ink-muted">
          <strong className="text-ink">Chapter planned.</strong> This stitch is listed in the
          encyclopedia and will be completed to the same publication standard as{" "}
          <Link href="/stitches/cable-stitch/" className="text-dusty-blue-deep">
            Cable Stitch
          </Link>
          . No placeholder diagrams are shown — quality over speed.
        </p>
      </div>

      <h2 className="mt-10 font-serif text-2xl text-ink">What you&rsquo;ll learn</h2>
      <p className="mt-3 text-ink-muted">{stitch.description}</p>

      <h2 className="mt-10 font-serif text-2xl text-ink">Chapter checklist (template)</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Every stitch chapter must include all of the following before it is marked complete:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink-muted">
        {templateSections.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/stitches/cable-stitch/"
          className="rounded bg-burgundy px-4 py-2 text-sm text-paper no-underline hover:bg-burgundy-soft"
        >
          Study the Cable Stitch template
        </Link>
        <Link
          href="/stitches/"
          className="rounded border border-border px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
        >
          Back to stitch index
        </Link>
      </div>
    </div>
  );
}
