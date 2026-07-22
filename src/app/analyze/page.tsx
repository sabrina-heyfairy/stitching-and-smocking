import Link from "next/link";
import { PlatePhotoAnalyzer } from "@/components/PlatePhotoAnalyzer";

export const metadata = {
  title: "Smocking Plate Photo Analyzer",
  description: "Upload a smocking plate picture and receive a beginner-friendly explanation of rows, pleats, repeats, stitches, preparation, and stitch order.",
};

export default function AnalyzePlatePage() {
  return <article className="pb-20">
    <header className="border-b border-border bg-paper/60">
      <div className="site-container py-12 md:py-16">
        <nav className="mb-5 text-sm text-ink-faint"><Link href="/plates/">Plates</Link><span className="mx-2">/</span>Photo analyzer</nav>
        <p className="label-caps text-dusty-blue">From picture to plan</p>
        <h1 className="mt-2 max-w-4xl font-serif text-4xl leading-tight text-ink md:text-6xl">Upload a smocking plate. Learn how to stitch it.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-muted">Get a beginner-friendly plan for how many rows and pleats to prepare, which stitches appear on each row, where the repeat begins, and what to do step by step.</p>
      </div>
    </header>
    <div className="site-container max-w-5xl py-10 md:py-14">
      <PlatePhotoAnalyzer />
      <aside className="mt-8 rounded-lg border border-border bg-cream/60 p-5 text-sm leading-6 text-ink-muted">
        <strong className="text-ink">For best results:</strong> Photograph the plate straight-on in bright, even light. Include its row numbers, stitch key, written notes, and at least one complete repeat. If the design spans multiple pages, analyze each page separately.
      </aside>
    </div>
  </article>;
}
