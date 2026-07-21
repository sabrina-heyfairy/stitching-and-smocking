export const metadata = {
  title: "Needle Guide",
  description: "Crewel, milliner, chenille, and embroidery needles for hand smocking.",
};

const needles = [
  {
    name: "Milliner (straw)",
    when: "Preferred by many smockers — long shaft, round eye, easy to manipulate between pleats.",
    sizes: "#3–9 common; #7–9 for fine batiste cables",
  },
  {
    name: "Crewel (embroidery)",
    when: "Sharp point, elongated eye. Excellent all-rounder for smocking and surface embroidery.",
    sizes: "#5–9; match eye to thread thickness",
  },
  {
    name: "Chenille",
    when: "Sharp, larger eye — helpful with perle #5 or multi-strand work. Shorter than milliner.",
    sizes: "#18–24 (larger number = finer)",
  },
  {
    name: "Embroidery / sharp",
    when: "General hand sewing sharps in a pinch; less ideal eye for thicker embroidery threads.",
    sizes: "#7–10",
  },
];

export default function NeedlesPage() {
  return (
    <article className="site-container max-w-3xl prose-guide py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Materials</p>
      <h1 className="font-serif text-4xl text-ink md:!text-5xl">Needle Guide</h1>
      <p>
        The needle must pass through the top third of a mountain without chewing the fabric, and
        the eye must spare your thread. When in doubt, go slightly finer for batiste and lawn.
      </p>

      <div className="not-prose mt-8 space-y-4">
        {needles.map((n) => (
          <div key={n.name} className="rounded border border-border bg-paper/70 p-5">
            <h2 className="font-serif text-2xl text-ink">{n.name}</h2>
            <p className="mt-2 text-sm text-ink-muted">{n.when}</p>
            <p className="mt-2 text-sm text-ink-faint">Sizes: {n.sizes}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12">Practice tip</h2>
      <p>
        Keep a dedicated “smocking needle” in a felt book labeled with the thread it pairs with.
        Burrs from fabric pins ruin fine thread — retire damaged needles early.
      </p>
    </article>
  );
}
