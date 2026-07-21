import Link from "next/link";
import {
  GatheringVsSmockingThread,
  ThreadComparisonDiagram,
} from "@/components/illustrations/MaterialsDiagrams";

export const metadata = {
  title: "Thread Guide",
  description: "Floche, perle cotton, stranded cotton, silk — sizes and when to use each for smocking.",
};

const threads = [
  {
    id: "floche",
    name: "Floche",
    notes:
      "Soft, loosely twisted cotton with a gentle sheen. The classic English smocking thread. Covers mountains smoothly without harsh cordiness.",
    sizes: "Typically used as-is (not stranded like mouliné).",
    colors: "DMC and specialty ranges; soft pastels dominate heirloom work.",
    best: "Cables, waves, and heirloom bishops on batiste",
  },
  {
    id: "perle",
    name: "Perle / Pearl Cotton",
    notes:
      "Non-divisible twisted cotton. Holds a round cord profile — excellent for crisp cables and waves.",
    sizes: "#3 (heavy), #5, #8 (most common for smocking), #12 (fine detail).",
    colors: "Full DMC perle ranges; #8 in dusty blue, rose, sage for vintage palettes.",
    best: "Crisp structural rows; #12 for fine trellis",
  },
  {
    id: "stranded",
    name: "Stranded Cotton (Mouliné)",
    notes:
      "Divisible six-strand. Use 2–3 strands for most smocking; more for bold work. Slightly flatter than perle.",
    sizes: "Strand count is your ‘size’ control.",
    colors: "Widest color range — ideal for matching Liberty prints.",
    best: "Color-matched motifs and blended fields",
  },
  {
    id: "silk",
    name: "Silk embroidery thread",
    notes: "Luminous on batiste and silk grounds. More delicate; shorter lengths recommended.",
    sizes: "Follow manufacturer weight; test tension on scraps.",
    colors: "Soft ivories, blush, gold for christening work.",
    best: "Christening and special-occasion accents",
  },
];

export default function ThreadsPage() {
  return (
    <article className="pb-16">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <p className="label-caps mb-3 text-dusty-blue">Materials</p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">Thread Guide</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            Gathering threads (for the pleater) and smocking threads (for the stitches) are
            different jobs. Choose each for strength or beauty — not both from one spool.
          </p>
        </div>
      </header>

      <div className="site-container">
        <GatheringVsSmockingThread />
        <ThreadComparisonDiagram />
      </div>

      <div className="site-container max-w-3xl prose-guide">
        {threads.map((t) => (
          <section key={t.id} id={t.id} className="scroll-mt-24">
            <h2>{t.name}</h2>
            <p>{t.notes}</p>
            <ul>
              <li>
                <strong className="text-ink">Sizes:</strong> {t.sizes}
              </li>
              <li>
                <strong className="text-ink">Color notes:</strong> {t.colors}
              </li>
              <li>
                <strong className="text-ink">Best for:</strong> {t.best}
              </li>
            </ul>
          </section>
        ))}

        <h2>Choosing weight to match the stitch</h2>
        <p>
          Thread weight is really a <strong className="text-ink">coverage</strong> decision: it
          sets how much of each mountain the stitch hides and how proud the cord sits. Too heavy
          and structural rows look clumsy on fine batiste; too light and they disappear.
        </p>
        <ul>
          <li>
            <strong className="text-ink">Cable &amp; outline (structural):</strong> want a defined
            cord — perle #8 or floche read crisply.
          </li>
          <li>
            <strong className="text-ink">Trellis &amp; fine diamonds:</strong> want delicacy —
            perle #12 or 2 strands so the lattice does not overwhelm the ground.
          </li>
          <li>
            <strong className="text-ink">Honeycomb:</strong> a slightly softer thread (floche or
            2–3 strands) lets cells open without stiffening the elastic.
          </li>
        </ul>

        <h2>Stranded cotton in practice</h2>
        <p>
          With mouliné, strand count is your dial. Always{" "}
          <strong className="text-ink">separate and recombine</strong> strands — pull each strand
          out singly, then lay them back together — so they sit flat and parallel instead of
          twisting into an uneven cord. Two strands is the common smocking default; drop to one for
          the finest lawn, rise to three or four for folk-weight boldness.
        </p>

        <h2>Handling &amp; length</h2>
        <ul>
          <li>
            <strong className="text-ink">Keep lengths short:</strong> ~18 inches. Longer thread
            abrades against the fabric on every pass and starts to fuzz — worst with floche and
            silk.
          </li>
          <li>
            <strong className="text-ink">Mind the twist:</strong> let the needle dangle
            periodically to unwind accumulated twist, which otherwise kinks and knots.
          </li>
          <li>
            <strong className="text-ink">Colorfastness:</strong> test any strong color on a damp
            scrap before committing it to a christening piece that may be washed.
          </li>
        </ul>

        <h2>Quick recommendations</h2>
        <ul>
          <li>Learning cable on batiste → floche or perle #8</li>
          <li>Fine trellis on lawn → perle #12 or 2 strands mouliné</li>
          <li>Bold folk smocking → perle #5</li>
          <li>
            Pleater gathering → strong cotton/poly; remove after smocking unless the pattern says
            otherwise — see <Link href="/pleater/#threading">threading</Link>
          </li>
        </ul>

        <p className="text-sm text-ink-faint">
          Pair with the <Link href="/needles/">Needle Guide</Link> and{" "}
          <Link href="/fabrics/">Fabric Guide</Link>.
        </p>
      </div>
    </article>
  );
}
