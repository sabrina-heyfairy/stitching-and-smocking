import Link from "next/link";
import { CenteringDiagram, RepeatMathDiagram } from "@/components/illustrations/DesignDiagrams";

export const metadata = {
  title: "Design Planning",
  description: "Design smocking plates: pleat counts, repeats, centering, borders, and mirror layouts.",
};

export default function DesignPage() {
  return (
    <article className="site-container max-w-3xl prose-guide py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Design</p>
      <h1 className="font-serif text-4xl text-ink md:!text-5xl">Design Planning</h1>
      <p>
        A smocking plate is a charted design for stitches across numbered pleats and gathering
        rows. Designing your own means controlling repeat size, centering, and border behavior.
      </p>

      <h2>How many pleats?</h2>
      <p>
        Start from the finished width you need after smocking. Compression ratio varies by stitch
        density and tension — sample. A common teaching approach: pleat a test strip, work your
        stitch pattern, measure finished width, then scale pleat count for the garment.
      </p>

      <h2>Repeat size</h2>
      <p>
        Count the pleats in one full motif repeat (for example, a trellis diamond might span 6 or
        8 pleats). Garment width in pleats should be a multiple of the repeat, plus any border
        pleats.
      </p>
      <RepeatMathDiagram />

      <h2>Centering motifs</h2>
      <ol>
        <li>Find the center pleat of the panel.</li>
        <li>Place the motif center on that pleat (or straddling two center pleats for even repeats).</li>
        <li>Work outward symmetrically.</li>
      </ol>
      <CenteringDiagram />

      <h2>Border spacing</h2>
      <p>
        Cable or outline rows often frame a decorative field. Leave a consistent number of empty
        gathering rows between border and field so the design can breathe.
      </p>

      <h2>Mirror layouts</h2>
      <p>
        Mirror at the center line for bishop yokes and bonnets. Graph half the design, then flip.
        Watch stitch direction: cables must maintain their over/under logic when mirrored.
      </p>

      <h2>Plate library</h2>
      <p>
        Digitized teaching plates live in the{" "}
        <Link href="/plates/">Smocking Plate Library</Link> — each with an interactive graph, thread
        colors, finished schematic, instructions, and links to the stitch chapters you need.
      </p>
      <p>
        <Link href="/plates/cable-borders/">Start with Cable Borders</Link>, then{" "}
        <Link href="/plates/wave-between-cables/">Wave Between Cables</Link>, then{" "}
        <Link href="/plates/classic-trellis/">Classic Trellis</Link>.
      </p>

      <div className="callout mt-8">
        <p className="text-sm text-ink-muted">
          Need yardage before you chart? Use the{" "}
          <Link href="/calculator/">Read 16 fabric calculator</Link> to convert finished smocked
          width into fabric length to pleat — then size your plate to that pleat count.
        </p>
      </div>
    </article>
  );
}
