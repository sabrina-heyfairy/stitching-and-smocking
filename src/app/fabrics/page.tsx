const fabrics = [
  {
    id: "batiste",
    name: "Batiste",
    weight: "Lightweight (approx. 60–100 gsm typical)",
    pleating: "Excellent — crisp mountains, classic heirloom choice",
    thread: "Floche, #8–12 perle, 2–3 strands stranded cotton",
    garments: "Bishop dresses, day gowns, christening, bonnets",
  },
  {
    id: "lawn",
    name: "Cotton Lawn",
    weight: "Lightweight, smooth, tightly woven",
    pleating: "Excellent — clean feed on Read 16",
    thread: "Floche or #8 perle",
    garments: "Yokes, sleeves, blouses, children’s wear",
  },
  {
    id: "voile",
    name: "Voile",
    weight: "Very light, soft drape",
    pleating: "Good with care — support fabric; gentle tension",
    thread: "Finer perle (#12) or floche",
    garments: "Soft nightgowns, lightweight dresses",
  },
  {
    id: "linen",
    name: "Linen (fine)",
    weight: "Light to mid; more body than batiste",
    pleating: "Good — finger-press mountains after pleating",
    thread: "Perle #8, linen embroidery thread",
    garments: "Aprons, home decor, summer yokes",
  },
  {
    id: "pima",
    name: "Pima cotton",
    weight: "Varies; choose shirting/lawn weights",
    pleating: "Very good when finely woven",
    thread: "Floche, stranded cotton",
    garments: "Heirloom and everyday children’s clothes",
  },
  {
    id: "liberty",
    name: "Liberty-weight Tana Lawn",
    weight: "Light, dense print cotton",
    pleating: "Good — watch bias; prints hide or showcase stitches",
    thread: "Colors matched to print; #8 perle or floche",
    garments: "Dresses, rompers, modern heirloom",
  },
  {
    id: "gingham",
    name: "Gingham (fine)",
    weight: "Light to mid",
    pleating: "Good — checks help verify grain",
    thread: "Contrast or tone-on-tone perle",
    garments: "Jon jons, rompers, aprons",
  },
  {
    id: "flannel",
    name: "Cotton flannel (fine)",
    weight: "Mid; napped",
    pleating: "Fair — lint; use sharp needles; clean often",
    thread: "Heavier perle; bold designs",
    garments: "Winter nightgowns, cozy children’s wear",
  },
  {
    id: "silk",
    name: "Silk (lightweight)",
    weight: "Varies widely",
    pleating: "Advanced — slippery; tissue aids; test first",
    thread: "Silk embroidery thread, fine perle",
    garments: "Christening, special occasion (experienced hands)",
  },
];

export const metadata = {
  title: "Fabric Guide",
  description: "Fabrics for English smocking and Read 16 pleating — weight, quality, threads, garments.",
};

export default function FabricsPage() {
  return (
    <article className="site-container py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="label-caps mb-3 text-dusty-blue">Materials</p>
        <h1 className="font-serif text-4xl text-ink md:text-5xl">Fabric Guide</h1>
        <p className="mt-4 text-ink-muted">
          Choose fabric for how it pleats and how it wears — not only how it looks on the bolt.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {fabrics.map((f) => (
          <section
            key={f.id}
            id={f.id}
            className="scroll-mt-24 rounded border border-border bg-paper/70 p-5"
          >
            <h2 className="font-serif text-2xl text-ink">{f.name}</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="label-caps">Weight</dt>
                <dd className="text-ink-muted">{f.weight}</dd>
              </div>
              <div>
                <dt className="label-caps">Pleating quality</dt>
                <dd className="text-ink-muted">{f.pleating}</dd>
              </div>
              <div>
                <dt className="label-caps">Thread recommendations</dt>
                <dd className="text-ink-muted">{f.thread}</dd>
              </div>
              <div>
                <dt className="label-caps">Best garments</dt>
                <dd className="text-ink-muted">{f.garments}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>
    </article>
  );
}
