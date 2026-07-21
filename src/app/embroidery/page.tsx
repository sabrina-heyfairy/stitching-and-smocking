const stitches = [
  { name: "Bullion", use: "Roses and buds on bishop yokes and bonnets" },
  { name: "French knots", use: "Flower centers, filler texture, berry clusters" },
  { name: "Lazy Daisy", use: "Petals and leaves combined with smocked grounds" },
  { name: "Feather stitch", use: "Vines climbing beside smocked panels" },
  { name: "Stem stitch", use: "Outlines and stems (distinct from smocking stem cable)" },
  { name: "Outline stitch", use: "Smooth lines; related family to stem" },
  { name: "Back stitch", use: "Structural outlines, lettering bases" },
  { name: "Satin stitch", use: "Solid petals, bows, small motifs" },
  { name: "Blanket stitch", use: "Edges, appliqué on garments with smocked inserts" },
  { name: "Chain stitch", use: "Decorative borders framing smocking" },
  { name: "Running stitch", use: "Guidelines, light texture, utility" },
];

export const metadata = {
  title: "Embroidery Companion",
  description: "Surface embroidery stitches commonly combined with English smocking.",
};

export default function EmbroideryPage() {
  return (
    <article className="site-container max-w-3xl prose-guide py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Companion skills</p>
      <h1 className="font-serif text-4xl text-ink md:!text-5xl">Embroidery</h1>
      <p>
        Smocking often shares the garment with surface embroidery. Master these companions so
        motifs sit gracefully above a cable or trellis field.
      </p>
      <p className="text-sm text-ink-faint">
        Full animated construction for each embroidery stitch will follow the same publication
        standard as Cable Stitch. Below is the working index and design intent.
      </p>

      <div className="not-prose mt-8 grid gap-3 sm:grid-cols-2">
        {stitches.map((s) => (
          <div key={s.name} className="rounded border border-border bg-paper/70 p-4">
            <h2 className="font-serif text-xl text-ink">{s.name}</h2>
            <p className="mt-1 text-sm text-ink-muted">{s.use}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12">Decorative motifs</h2>
      <p>Common motif families on smocked garments:</p>
      <ul>
        <li>Flowers &amp; leaves (bullion roses, lazy daisy sprays)</li>
        <li>Bows and ribbons</li>
        <li>Animals for children’s wear</li>
        <li>Monograms and alphabets</li>
        <li>Holiday motifs</li>
        <li>Border repeats framing the smocked panel</li>
      </ul>
    </article>
  );
}
