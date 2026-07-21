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
  },
  {
    id: "perle",
    name: "Perle / Pearl Cotton",
    notes:
      "Non-divisible twisted cotton. Holds a round cord profile — excellent for crisp cables and waves.",
    sizes: "#3 (heavy), #5, #8 (most common for smocking), #12 (fine detail).",
    colors: "Full DMC perle ranges; #8 in dusty blue, rose, sage for vintage palettes.",
  },
  {
    id: "stranded",
    name: "Stranded Cotton (Mouliné)",
    notes:
      "Divisible six-strand. Use 2–3 strands for most smocking; more for bold work. Slightly flatter than perle.",
    sizes: "Strand count is your ‘size’ control.",
    colors: "Widest color range — ideal for matching Liberty prints.",
  },
  {
    id: "silk",
    name: "Silk embroidery thread",
    notes: "Luminous on batiste and silk grounds. More delicate; shorter lengths recommended.",
    sizes: "Follow manufacturer weight; test tension on scraps.",
    colors: "Soft ivories, blush, gold for christening work.",
  },
];

export default function ThreadsPage() {
  return (
    <article className="site-container max-w-3xl prose-guide py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Materials</p>
      <h1 className="font-serif text-4xl text-ink md:!text-5xl">Thread Guide</h1>
      <p>
        Gathering threads (for the pleater) and smocking threads (for the stitches) are different
        jobs. Gathering thread should be strong and smooth; smocking thread is chosen for look and
        hand.
      </p>

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
          </ul>
        </section>
      ))}

      <h2>Quick recommendations</h2>
      <ul>
        <li>Learning cable on batiste → floche or perle #8</li>
        <li>Fine trellis on lawn → perle #12 or 2 strands mouliné</li>
        <li>Bold folk smocking → perle #5</li>
        <li>Pleater gathering → strong cotton/poly; remove after smocking unless pattern says otherwise</li>
      </ul>
    </article>
  );
}
