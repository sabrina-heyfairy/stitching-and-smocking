import Link from "next/link";

export const metadata = {
  title: "Decorative Motifs",
  description:
    "Flower, leaf, bow, animal, monogram, and border motifs built from embroidery stitches for smocked garments.",
};

const families = [
  {
    name: "Flowers & leaves",
    stitches: [
      { href: "/embroidery/bullion/", label: "Bullion roses & buds" },
      { href: "/embroidery/lazy-daisy/", label: "Lazy daisy petals" },
      { href: "/embroidery/french-knot/", label: "French knot centers" },
      { href: "/embroidery/satin-stitch/", label: "Satin petal fills" },
      { href: "/embroidery/stem-embroidery/", label: "Stem stitch stems" },
    ],
    note: "The classic heirloom spray: stem lines, daisy petals, knot centers, optional bullion rose.",
  },
  {
    name: "Bows & ribbons",
    stitches: [
      { href: "/embroidery/satin-stitch/", label: "Satin loops" },
      { href: "/embroidery/stem-embroidery/", label: "Ribbon outlines" },
      { href: "/embroidery/back-stitch/", label: "Back stitch structure" },
    ],
    note: "Keep bow loops small so satin stays smooth on batiste.",
  },
  {
    name: "Vines & borders",
    stitches: [
      { href: "/embroidery/feather-stitch/", label: "Feather vines" },
      { href: "/embroidery/chain-stitch/", label: "Chain borders" },
      { href: "/embroidery/lazy-daisy/", label: "Leaf accents" },
    ],
    note: "Frame a smocked panel or climb from the yoke into the skirt.",
  },
  {
    name: "Monograms & alphabet",
    stitches: [
      { href: "/embroidery/back-stitch/", label: "Back stitch skeleton" },
      { href: "/embroidery/stem-embroidery/", label: "Stem fill lines" },
      { href: "/embroidery/satin-stitch/", label: "Satin capitals (small)" },
    ],
    note: "Place monograms on flat fabric — never across active pleats.",
  },
  {
    name: "Animals & holiday",
    stitches: [
      { href: "/embroidery/back-stitch/", label: "Outline shapes" },
      { href: "/embroidery/satin-stitch/", label: "Small fills" },
      { href: "/embroidery/french-knot/", label: "Eyes & berries" },
      { href: "/embroidery/lazy-daisy/", label: "Ears & petals" },
    ],
    note: "Simple silhouettes read best at heirloom scale; detail comes from knots and tiny daisy accents.",
  },
];

export default function MotifsPage() {
  return (
    <article className="site-container py-12 md:py-16">
      <nav className="mb-4 text-sm text-ink-faint">
        <Link href="/embroidery/" className="no-underline hover:text-ink">
          Embroidery
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-muted">Motifs</span>
      </nav>
      <p className="label-caps mb-3 text-dusty-blue">Design combinations</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">Decorative Motifs</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Motifs are recipes: which companion stitches to combine, and where they sit relative to the
        smocked field. Work embroidery on flat fabric above or beside the smocking — not through
        active pleats.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {families.map((f) => (
          <section key={f.name} className="rounded border border-border bg-paper/70 p-5">
            <h2 className="font-serif text-2xl text-ink">{f.name}</h2>
            <p className="mt-2 text-sm text-ink-muted">{f.note}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {f.stitches.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-dusty-blue-deep no-underline hover:text-burgundy">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="callout mt-10 max-w-2xl">
        <p className="text-sm text-ink-muted">
          <strong className="text-ink">Placement rule:</strong> Finish smocking first (or isolate
          the embroidery area), press gently, then embroider on the stable flat ground so needle
          work does not distort your cables and waves.
        </p>
      </div>
    </article>
  );
}
