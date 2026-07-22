import Link from "next/link";
import { PracticeCheckbox } from "@/components/PracticeCheckbox";

export const metadata = {
  title: "Practice Path",
  description:
    "A beginner-to-advanced learning path through Sabrina’s Guide — stitches, plates, embroidery, and first garments.",
};

type Step = {
  title: string;
  body: string;
  links: { href: string; label: string }[];
};

const phases: { name: string; goal: string; steps: Step[] }[] = [
  {
    name: "Phase 1 — Machine & materials",
    goal: "Pleat a clean batiste strip before you stitch.",
    steps: [
      {
        title: "Meet the Read 16",
        body: "Learn parts, threading, and a careful first crank on scrap.",
        links: [
          { href: "/pleater/", label: "Pleater encyclopedia" },
          { href: "/pleater/#threading", label: "Threading" },
        ],
      },
      {
        title: "Choose fabric & thread",
        body: "Batiste + floche or perle #8 is the classic teaching combo.",
        links: [
          { href: "/fabrics/#batiste", label: "Batiste" },
          { href: "/threads/#floche", label: "Floche" },
          { href: "/needles/", label: "Needles" },
        ],
      },
      {
        title: "Calculate fabric for your size",
        body: "Before cutting a dress: finished width X → fabric length Y for the Read 16.",
        links: [
          { href: "/calculator/", label: "Fabric calculator" },
          { href: "/design/", label: "Design planning" },
        ],
      },
    ],
  },
  {
    name: "Phase 2 — Foundation stitches",
    goal: "Cable and outline until tension is automatic.",
    steps: [
      {
        title: "Read a smocking plate from zero",
        body: "Rows, pleats, repeats, centering, tracking, thread changes, corrections, and a printable bench checklist.",
        links: [{ href: "/learn/read-smocking-plates/", label: "Absolute beginner plate-reading guide" }],
      },
      {
        title: "Cable Stitch",
        body: "The gold-standard first chapter — braid, tension, mistakes.",
        links: [{ href: "/stitches/cable-stitch/", label: "Cable Stitch" }],
      },
      {
        title: "Outline & Stem",
        body: "Feel smooth cord vs twisted rope on single rows.",
        links: [
          { href: "/stitches/outline-stitch/", label: "Outline" },
          { href: "/stitches/stem-stitch-smocking/", label: "Stem (smocking)" },
          { href: "/plates/outline-and-stem-bands/", label: "Practice plate" },
        ],
      },
      {
        title: "First plate",
        body: "Two cables with an open field — calibrate before decorating. Or stitch the five-row sampler strip.",
        links: [
          { href: "/plates/cable-borders/", label: "Cable Borders plate" },
          { href: "/plates/sampler-five-row/", label: "Five-Row Sampler" },
        ],
      },
    ],
  },
  {
    name: "Phase 3 — Traveling stitches",
    goal: "Add vertical motion, then diamonds.",
    steps: [
      {
        title: "Wave",
        body: "Climb and descend between two gathering rows (wave of 4).",
        links: [
          { href: "/stitches/wave-stitch/", label: "Wave Stitch" },
          { href: "/plates/wave-between-cables/", label: "Wave Between Cables" },
        ],
      },
      {
        title: "Trellis",
        body: "Mirror a second wave to close diamonds.",
        links: [
          { href: "/stitches/trellis/", label: "Trellis" },
          { href: "/plates/classic-trellis/", label: "Classic Trellis plate" },
        ],
      },
    ],
  },
  {
    name: "Phase 4 — Elastic & advanced",
    goal: "Honeycomb for give; Van Dyke for drama.",
    steps: [
      {
        title: "Honeycomb",
        body: "Staggered pair-binds that open into cells.",
        links: [
          { href: "/stitches/honeycomb/", label: "Honeycomb" },
          { href: "/plates/honeycomb-yoke/", label: "Honeycomb Yoke plate" },
        ],
      },
      {
        title: "Surface Honeycomb & Van Dyke",
        body: "Flatter lattice, then chevron catches at peaks and troughs.",
        links: [
          { href: "/stitches/surface-honeycomb/", label: "Surface Honeycomb" },
          { href: "/stitches/van-dyke/", label: "Van Dyke" },
          { href: "/plates/van-dyke-accent/", label: "Van Dyke Accent plate" },
        ],
      },
    ],
  },
  {
    name: "Phase 5 — Embroidery companions",
    goal: "Add sprays above the smocked field.",
    steps: [
      {
        title: "Core flower set",
        body: "Lazy daisy, French knots, then bullion roses when ready.",
        links: [
          { href: "/embroidery/lazy-daisy/", label: "Lazy Daisy" },
          { href: "/embroidery/french-knot/", label: "French Knot" },
          { href: "/embroidery/bullion/", label: "Bullion" },
          { href: "/embroidery/motifs/", label: "Motif recipes" },
        ],
      },
      {
        title: "Lines & fills",
        body: "Stem, satin, feather, and borders for vines and bows.",
        links: [
          { href: "/embroidery/stem-embroidery/", label: "Stem (embroidery)" },
          { href: "/embroidery/satin-stitch/", label: "Satin" },
          { href: "/embroidery/feather-stitch/", label: "Feather" },
        ],
      },
    ],
  },
  {
    name: "Phase 6 — First garment",
    goal: "Put a plate into a real neckline.",
    steps: [
      {
        title: "Construction order",
        body: "Pleat → smock → embroider → assemble. Never reverse that for sleeves.",
        links: [
          { href: "/garments/", label: "Garment construction" },
          { href: "/garments/#bishop", label: "Bishop dresses" },
          { href: "/plates/baby-bishop-starter/", label: "Baby Bishop plate" },
        ],
      },
      {
        title: "Design your own",
        body: "Once samplers feel easy, plan repeats and centering yourself.",
        links: [
          { href: "/design/", label: "Design planning" },
          { href: "/theory/", label: "Smocking theory" },
        ],
      },
    ],
  },
];

export default function PracticePathPage() {
  return (
    <article className="pb-20">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <p className="label-caps mb-3 text-dusty-blue">Curriculum</p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl lg:text-6xl">Practice Path</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            A guided route through the encyclopedia — from first pleat to first bishop. Checkmarks
            are saved on this device, or print the page for a paper checklist.
          </p>
          <p className="mt-3 text-sm text-ink-faint no-print">
            Tip: use your browser’s print dialog — navigation hides automatically on print.
          </p>
        </div>
      </header>

      <div className="site-container max-w-3xl py-12">
        <div className="callout mb-10">
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Sampler rule:</strong> Every new stitch gets a 6–8&quot;
            batiste strip before it touches a garment. Keep strips labeled with thread and tension
            notes.
          </p>
        </div>

        <ol className="space-y-12">
          {phases.map((phase, pi) => (
            <li key={phase.name} className="print:break-inside-avoid">
              <p className="label-caps text-dusty-blue">
                {pi + 1} of {phases.length}
              </p>
              <h2 className="mt-1 font-serif text-3xl text-ink">{phase.name}</h2>
              <p className="mt-2 text-ink-muted">{phase.goal}</p>
              <ul className="mt-6 space-y-4">
                {phase.steps.map((step) => (
                  <li
                    key={step.title}
                    className="rounded border border-border bg-paper/70 p-5 print:border-cream-deeper"
                  >
                    <div className="flex items-start gap-2">
                      <PracticeCheckbox id={`${pi}-${step.title}`} label={step.title} />
                      <span className="min-w-0">
                        <span className="font-serif text-xl text-ink">{step.title}</span>
                        <span className="mt-1 block text-sm text-ink-muted">{step.body}</span>
                        <span className="mt-3 flex flex-wrap gap-2">
                          {step.links.map((l) => (
                            <Link
                              key={l.href}
                              href={l.href}
                              className="inline-flex min-h-11 items-center rounded border border-border bg-cream px-3 py-2 text-sm text-dusty-blue-deep no-underline hover:bg-cream-deep"
                            >
                              {l.label}
                            </Link>
                          ))}
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <section className="mt-16 rounded border border-border bg-cream-deep/30 p-6 print:break-inside-avoid">
          <h2 className="font-serif text-2xl text-ink">Quick links</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            <li>
              <Link href="/calculator/">Fabric calculator</Link>
            </li>
            <li>
              <Link href="/stitches/">All stitches</Link>
            </li>
            <li>
              <Link href="/plates/">All plates</Link>
            </li>
            <li>
              <Link href="/embroidery/">Embroidery</Link>
            </li>
            <li>
              <Link href="/search/">Search</Link>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
