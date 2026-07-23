import Link from "next/link";

export const metadata = {
  title: "Bullion Roses & Decorative Stitch Guide",
  description:
    "Make a bullion rose step by step, then combine the decorative embroidery stitches used with English smocking.",
};

const roseSteps = [
  ["Mark the center", "Draw a tiny dot and a loose 8–10 mm circle on stable, flat fabric. The circle is a boundary, not a line you must cover."],
  ["Make the heart", "Work one short bullion across the center with about 5–7 wraps. Seat it gently without pulling the fabric."],
  ["Wrap the heart", "Add two short, slightly curved bullions on opposite sides. Angle their ends so they cup the center rather than forming parallel bars."],
  ["Build the middle ring", "Add three or four medium bullions around the first cluster. Use about 7–10 wraps, adjusting the count so each coil matches its stitch span."],
  ["Add outer petals", "Work four or five longer curved bullions around the outside. Overlap the gaps in the middle ring and vary the angles for a natural flower."],
  ["Add the calyx and leaves", "Use three tiny straight stitches beneath the rose, then add lazy-daisy leaves or satin-stitch leaves beside a stem-stitch line."],
  ["Inspect from arm’s length", "The rose should read as a round cluster, not a wheel. Add one petal only where a visible gap needs it; do not fill every space."],
] as const;

const decorativeStitches = [
  { href: "/embroidery/bullion/", name: "Bullion", level: "Advanced", job: "Raised roses, buds, seeds, and dimensional petals." },
  { href: "/embroidery/french-knot/", name: "French knot", level: "Beginner", job: "Flower centers, berries, eyes, and dotted texture." },
  { href: "/embroidery/lazy-daisy/", name: "Lazy daisy", level: "Beginner", job: "Detached-chain petals, leaves, and quick flower sprays." },
  { href: "/embroidery/feather-stitch/", name: "Feather stitch", level: "Intermediate", job: "Branching vines and open borders beside a smocked panel." },
  { href: "/embroidery/stem-embroidery/", name: "Stem stitch", level: "Beginner", job: "Curved stems, vines, lettering, and botanical outlines." },
  { href: "/embroidery/outline-embroidery/", name: "Outline stitch", level: "Beginner", job: "Fine flowing outlines where a lighter line is wanted." },
  { href: "/embroidery/satin-stitch/", name: "Satin stitch", level: "Intermediate", job: "Small smooth leaves, petals, bows, and filled shapes." },
  { href: "/embroidery/back-stitch/", name: "Back stitch", level: "Beginner", job: "Firm outlines, lettering skeletons, and small motif details." },
  { href: "/embroidery/chain-stitch/", name: "Chain stitch", level: "Beginner", job: "Bold looped outlines and decorative borders." },
  { href: "/embroidery/blanket-stitch/", name: "Blanket stitch", level: "Beginner", job: "Appliqué edges, hems, and decorative boundaries." },
  { href: "/embroidery/running-stitch/", name: "Running stitch", level: "Beginner", job: "Guidelines, light texture, and delicate dashed borders." },
] as const;

const motifRecipes = [
  { name: "Heirloom rose spray", order: "Stem stitch stems → lazy-daisy leaves → bullion rose → French-knot accents." },
  { name: "Beginner flower border", order: "Running-stitch guide → lazy-daisy flowers → French-knot centers." },
  { name: "Vine beside a yoke", order: "Feather-stitch vine → lazy-daisy leaves → French-knot berries." },
  { name: "Small bow", order: "Back-stitch outline → satin-stitch loops → stem-stitch tails." },
  { name: "Appliqué picture", order: "Secure shape → blanket-stitch edge → back-stitch details → French-knot eyes." },
  { name: "Decorative neckline echo", order: "Mark a curve → chain or outline stitch → evenly spaced knot accents." },
] as const;

const heirloomExtras = [
  { name: "Cast-on rose", kind: "Dimensional flower", note: "Looped cast-on petals make a softer, frillier rose than the coiled bullion rose." },
  { name: "Granito", kind: "Raised detached stitch", note: "Several straight stitches share the same holes to form a smooth grain, tiny leaf, bud, or petal." },
  { name: "Woven-wheel rose", kind: "Woven flower", note: "Thread weaves over and under an odd number of spokes to build a round, low-profile rose." },
  { name: "Colonial knot", kind: "Knot", note: "A figure-eight wrapped knot used as a compact alternative to the French knot for dots and flower centers." },
  { name: "Pistil stitch", kind: "Elongated knot", note: "A French-knot-like tip with a straight tail for stamens, sprays, and radiating flower centers." },
  { name: "Fly stitch", kind: "Open loop", note: "A small Y-shaped catch that makes calyxes, fern-like borders, and tiny leaves." },
  { name: "Fishbone and raised fishbone", kind: "Leaf fill", note: "Overlapping diagonal stitches form a central vein and a dense, shaped leaf." },
  { name: "Seed stitch", kind: "Texture", note: "Scattered small straight stitches add delicate, controlled fill without a solid block of color." },
  { name: "Worked eyelet", kind: "Whitework opening", note: "A pierced or pulled opening ringed with stitches; useful for flowers, dots, and airy borders." },
  { name: "Shadow work", kind: "Sheer-fabric technique", note: "Herringbone worked mainly on the back shows as a soft shaded shape through batiste or organdy." },
] as const;

const heirloomConstruction = [
  ["Entredeux", "A narrow openwork ladder used between fabric and lace or between heirloom-sewn sections."],
  ["Lace insertion and edging", "Lace joined between fabric sections or along an edge, usually with tiny machine or hand joining stitches."],
  ["Decorative featherstitching", "Hand feather stitch covers and decorates fine joins, often with knots or tiny flowers added at the branches."],
  ["Pin tucks and released tucks", "Very narrow stitched folds add linear texture above, below, or beside a smocked area."],
  ["Hemstitching and fagoting", "Open joining and drawn-thread effects create airy seams and borders between stable sections."],
  ["Madeira-style appliqué", "Fine appliqué shapes and scalloped edges are secured with close satin or blanket-style stitching."],
] as const;

function BullionRoseMap() {
  const petals = [
    { x1: 111, y1: 76, x2: 149, y2: 76, n: 1 },
    { x1: 104, y1: 66, x2: 134, y2: 55, n: 2 },
    { x1: 126, y1: 96, x2: 155, y2: 84, n: 3 },
    { x1: 83, y1: 83, x2: 112, y2: 101, n: 4 },
    { x1: 83, y1: 51, x2: 119, y2: 35, n: 5 },
    { x1: 140, y1: 39, x2: 174, y2: 61, n: 6 },
    { x1: 145, y1: 105, x2: 177, y2: 86, n: 7 },
    { x1: 82, y1: 111, x2: 124, y2: 116, n: 8 },
  ];
  return (
    <figure className="mt-6 rounded border border-border bg-paper/70 p-4">
      <svg viewBox="0 0 380 150" role="img" aria-label="Bullion rose petal placement order" className="h-auto w-full">
        <rect width="380" height="150" rx="12" fill="#fffaf4" />
        <circle cx="130" cy="76" r="52" fill="none" stroke="#d8c9bc" strokeDasharray="4 5" />
        {petals.map((petal) => (
          <g key={petal.n}>
            <line x1={petal.x1} y1={petal.y1} x2={petal.x2} y2={petal.y2} stroke="#9b425d" strokeWidth={petal.n < 4 ? 9 : 11} strokeLinecap="round" />
            <text x={(petal.x1 + petal.x2) / 2} y={(petal.y1 + petal.y2) / 2 + 3} textAnchor="middle" fontSize="8" fill="white">{petal.n}</text>
          </g>
        ))}
        <path d="M184 119 C218 105 219 74 244 62 C267 51 285 68 299 51" fill="none" stroke="#66836a" strokeWidth="4" strokeLinecap="round" />
        <path d="M234 72 C250 72 258 84 256 99 C242 97 233 88 234 72 Z" fill="#8ea88e" stroke="#66836a" strokeWidth="2" />
        <path d="M276 61 C279 43 294 35 310 40 C306 55 294 64 276 61 Z" fill="#8ea88e" stroke="#66836a" strokeWidth="2" />
        <text x="250" y="130" textAnchor="middle" fontSize="11" fill="#625850">Work from the center outward</text>
      </svg>
      <figcaption className="mt-2 text-xs text-ink-faint">A placement map, not an exact tracing pattern. Vary petal length and angle.</figcaption>
    </figure>
  );
}

export default function MotifsPage() {
  return (
    <article className="site-container py-12 md:py-16">
      <nav className="mb-4 text-sm text-ink-faint"><Link href="/stitches/" className="no-underline hover:text-ink">Stitches</Link><span className="mx-2">/</span><span className="text-ink-muted">Decorative stitches</span></nav>
      <p className="label-caps mb-3 text-dusty-blue">Step-by-step motif guide</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">Bullion Roses & Decorative Stitches</h1>
      <p className="mt-4 max-w-3xl text-ink-muted">Start with one complete bullion rose, then use the stitch library below to build sprays, vines, bows, borders, monograms, and appliqué details around English smocking.</p>

      <div className="callout mt-8 max-w-3xl"><p className="text-sm text-ink-muted"><strong className="text-ink">Placement rule:</strong> Finish the structural smocking first. Add decorative embroidery only to stable flat fabric above, below, or beside the pleated field unless the plate explicitly marks a surface motif on the pleats.</p></div>

      <section className="mt-14 max-w-4xl" id="bullion-rose">
        <p className="label-caps mb-2 text-burgundy">Featured technique</p>
        <h2 className="font-serif text-3xl text-ink">How to make a bullion rose</h2>
        <p className="mt-3 text-ink-muted">Practice a plain bullion first. A milliner’s needle helps because its shaft and eye are nearly the same width, allowing the wraps to slide through. Use one or two strands for fine heirloom work or more strands for a fuller rose.</p>
        <BullionRoseMap />
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {roseSteps.map(([title, body], index) => <li key={title} className="rounded border border-border bg-paper/70 p-4"><p className="label-caps text-burgundy">Step {index + 1}</p><h3 className="mt-1 font-serif text-xl text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p></li>)}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/embroidery/bullion/" className="rounded border border-border bg-paper px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep">Learn the bullion mechanics</Link><Link href="/plates/bullion-rose-arbor/" className="rounded border border-border bg-paper px-4 py-2 text-sm text-ink no-underline hover:bg-cream-deep">Practice the Bullion Rose Arbor plate</Link></div>
      </section>

      <section className="mt-14 max-w-4xl" id="practice-order">
        <h2 className="font-serif text-3xl text-ink">Best order for a complete beginner</h2>
        <ol className="mt-4 space-y-2 text-ink-muted"><li><strong className="text-ink">1. Lines:</strong> running stitch, back stitch, then stem or outline stitch.</li><li><strong className="text-ink">2. Loops and dots:</strong> lazy daisy, chain stitch, then French knots.</li><li><strong className="text-ink">3. Edges and fills:</strong> blanket stitch, feather stitch, then small satin-stitch shapes.</li><li><strong className="text-ink">4. Dimension:</strong> straight bullions, curved bullions, then a complete bullion rose.</li></ol>
      </section>

      <section className="mt-14" id="stitch-library">
        <h2 className="font-serif text-3xl text-ink">Decorative stitch library</h2>
        <p className="mt-3 max-w-3xl text-ink-muted">These are all of the surface-embroidery stitches currently taught in the encyclopedia. Open any chapter for its needle path, tension, mistakes, variations, and use with smocking.</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{decorativeStitches.map((stitch) => <li key={stitch.href}><Link href={stitch.href} className="block h-full rounded border border-border bg-paper/70 p-4 no-underline hover:border-dusty-blue/50"><p className="label-caps text-dusty-blue">{stitch.level}</p><h3 className="mt-1 font-serif text-xl text-ink">{stitch.name}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{stitch.job}</p></Link></li>)}</ul>
      </section>

      <section className="mt-14 max-w-4xl" id="recipes">
        <h2 className="font-serif text-3xl text-ink">Motif recipes and working order</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">{motifRecipes.map((recipe) => <div key={recipe.name} className="rounded border border-border bg-paper/70 p-4"><h3 className="font-serif text-xl text-ink">{recipe.name}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{recipe.order}</p></div>)}</div>
      </section>

      <section className="mt-14" id="more-heirloom-stitches">
        <h2 className="font-serif text-3xl text-ink">More decorative stitches used in heirloom work</h2>
        <p className="mt-3 max-w-3xl text-ink-muted">These techniques belong in the broader heirloom vocabulary but do not yet have full interactive chapters in this encyclopedia. They are excellent candidates after the core 11-stitch library.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{heirloomExtras.map((item) => <div key={item.name} className="rounded border border-border bg-paper/70 p-4"><p className="label-caps text-dusty-blue">{item.kind}</p><h3 className="mt-1 font-serif text-xl text-ink">{item.name}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.note}</p></div>)}</div>
      </section>

      <section className="mt-14 max-w-4xl" id="heirloom-construction">
        <h2 className="font-serif text-3xl text-ink">Decorative heirloom construction</h2>
        <p className="mt-3 text-ink-muted">Not every embellishment is a surface-embroidery stitch. These structural details are often combined with smocking on christening gowns, bishop dresses, bonnets, yokes, and heirloom linens.</p>
        <dl className="mt-5 grid gap-3 md:grid-cols-2">{heirloomConstruction.map(([name, note]) => <div key={name} className="rounded border border-border bg-paper/70 p-4"><dt className="font-serif text-xl text-ink">{name}</dt><dd className="mt-2 text-sm leading-relaxed text-ink-muted">{note}</dd></div>)}</dl>
      </section>

      <section className="mt-14 max-w-3xl" id="bullion-troubleshooting">
        <h2 className="font-serif text-3xl text-ink">Bullion rose checkpoints</h2>
        <ul className="mt-4 space-y-2 text-ink-muted"><li><strong className="text-ink">Needle will not pass:</strong> loosen the wraps with a fingernail; never force the eye through.</li><li><strong className="text-ink">Petal is shorter than its span:</strong> add wraps or shorten the distance between the two fabric points.</li><li><strong className="text-ink">Fabric puckers:</strong> reduce seating tension and support very light fabric with removable stabilizer.</li><li><strong className="text-ink">Rose looks like a wheel:</strong> stagger petal ends, vary lengths, and overlap gaps instead of spacing every petal evenly.</li><li><strong className="text-ink">Rose overwhelms the smocking:</strong> use finer thread, fewer outer petals, and leave breathing room above the cable border.</li></ul>
      </section>

      <section className="mt-14 max-w-3xl border-t border-border pt-8 text-sm text-ink-faint" aria-label="Further stitch references">
        <p>For the wider embroidery vocabulary, compare the <a href="https://royal-needlework.org.uk/rsn-stitch-bank/" className="text-dusty-blue-deep">Royal School of Needlework Stitch Bank</a> and <a href="https://www.needlenthread.com/videos" className="text-dusty-blue-deep">Needle ’n Thread stitch tutorials</a>. The guide above selects the techniques most relevant to heirloom-smocked garments rather than attempting to list every embroidery stitch.</p>
      </section>
    </article>
  );
}
