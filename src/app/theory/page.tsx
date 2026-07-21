import Link from "next/link";

export const metadata = {
  title: "Smocking Theory",
  description:
    "Why English smocking stitches work: compression, fabric geometry, pleat physics, and thread tension.",
};

export default function TheoryPage() {
  return (
    <article className="site-container max-w-3xl prose-guide py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Understanding before stitching</p>
      <h1 className="font-serif text-4xl text-ink md:!text-5xl">Smocking Theory</h1>
      <p className="lead mt-4 text-lg text-ink-muted">
        Teach why stitches work — not only how. When you understand compression and geometry,
        tension stops being a mystery.
      </p>

      <h2>Compression</h2>
      <p>
        Every smocking stitch pulls neighboring mountains toward each other. That lateral
        compression is what transforms a strip of accordion pleats into a stable, decorated,
        semi-elastic fabric. Structural stitches (cable, outline) compress steadily along a row.
        Elastic stitches (honeycomb) compress in pairs and release between pairs, creating cells
        that stretch.
      </p>

      <h2>Fabric geometry</h2>
      <p>
        A pleated strip is a series of folds with a roughly sinusoidal or accordion cross-section.
        The gathering threads lock the fold spacing temporarily. Smocking stitches replace that
        temporary lock with decorative structure. If stitches bite too deep into the valley, they
        collapse the accordion — mountains flatten and the surface loses its characteristic
        ribbed light-and-shadow.
      </p>

      <h2>Pleat physics</h2>
      <ul>
        <li>
          <strong className="text-ink">Memory:</strong> Fine, tightly woven cotton holds crisp
          mountains. Soft voile needs gentler tension.
        </li>
        <li>
          <strong className="text-ink">Spring-back:</strong> After smocking, fabric tries to open.
          Stitches resist. Balance = soft hand without sagging.
        </li>
        <li>
          <strong className="text-ink">Bias drag:</strong> Off-grain panels stretch under roller
          pressure and later skew the design.
        </li>
      </ul>

      <h2>Why cables roll</h2>
      <p>
        Cable alternates leverage above and below the gathering line. Each stitch torques the
        working thread slightly, stacking into a braided cord. If you never alternate (always
        needle on the same side of the thread), you get stem stitch — a twisted rope, not a
        braid. That is geometry, not preference.
      </p>

      <h2>Why waves curve</h2>
      <p>
        Wave stitches climb and descend between gathering rows. The diagonal travel creates a
        visual curve; paired waves form diamonds (trellis). The curve is the eye reading stepped
        diagonals on a corrugated surface — keep step height even or the “wave” breaks into
        zigzags of uneven amplitude.
      </p>

      <h2>Why honeycomb opens</h2>
      <p>
        Honeycomb stitches bind two mountains, skip, bind two, skip. Between bindings the fabric
        can open into hexagonal cells when the garment stretches. That openness is intentional
        elasticity. Cable across the same area would lock it shut.
      </p>

      <h2>Thread tension as a control surface</h2>
      <p>
        Think of tension as a dial on compression:
      </p>
      <ul>
        <li>Loose → under-compressed, unstable pleats, stringy stitches</li>
        <li>Ideal → mountains remain round; design reads clearly</li>
        <li>Tight → over-compressed; cups the work; gathering rows bow</li>
      </ul>
      <p>
        Practice on a 6&quot; sample until your hand knows ideal tension without looking. Then
        move to the garment.
      </p>

      <div className="callout">
        <p className="text-sm">
          Apply this theory next on the{" "}
          <Link href="/stitches/cable-stitch/">Cable Stitch</Link> chapter, where tension and needle
          depth are illustrated stitch-by-stitch.
        </p>
      </div>
    </article>
  );
}
