import Link from "next/link";
import {
  FiberBehaviorDiagram,
  GrainDiagram,
  PrewashDiagram,
} from "@/components/illustrations/FabricDiagrams";

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

const pleatingLegend = [
  {
    label: "Excellent",
    description: "Feeds cleanly and forms crisp, reliable mountains.",
    className: "border-dusty-blue/30 bg-dusty-blue/10 text-dusty-blue-deep",
  },
  {
    label: "Good",
    description: "Pleats well with grain checks and steady support.",
    className: "border-sage/30 bg-sage/10 text-sage",
  },
  {
    label: "Fair",
    description: "Usable, but needs sharp needles and extra cleanup.",
    className: "border-burgundy/30 bg-burgundy/10 text-burgundy",
  },
  {
    label: "Advanced",
    description: "Test first; slippery or variable fabrics need experience.",
    className: "border-gold/40 bg-gold/10 text-ink-muted",
  },
];

export const metadata = {
  title: "Fabric Guide",
  description: "Fabrics for English smocking and Read 16 pleating — weight, quality, threads, garments.",
};

function FabricStrip({ fabricId }: { fabricId: string }) {
  const patternId = `fabric-strip-${fabricId}`;

  if (fabricId === "gingham") {
    return (
      <svg className="h-16 w-full" viewBox="0 0 320 72" aria-hidden="true">
        <rect width="320" height="72" fill="var(--paper)" />
        <defs>
          <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="var(--cream)" />
            <rect width="16" height="32" fill="var(--dusty-blue)" opacity="0.13" />
            <rect width="32" height="16" fill="var(--burgundy)" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="320" height="72" fill={`url(#${patternId})`} />
        <path d="M0 70H320" stroke="var(--cream-deeper)" />
      </svg>
    );
  }

  if (fabricId === "linen") {
    return (
      <svg className="h-16 w-full" viewBox="0 0 320 72" aria-hidden="true">
        <rect width="320" height="72" fill="var(--cream)" />
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`warp-${i}`}
            d={`M${i * 28 - 8} 0C${i * 28} 18 ${i * 28 - 4} 36 ${i * 28 + 5} 72`}
            stroke={i % 2 ? "var(--dusty-blue)" : "var(--sage)"}
            strokeWidth="1.4"
            opacity="0.32"
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <path
            key={`weft-${i}`}
            d={`M0 ${12 + i * 12}C70 ${8 + i * 12} 120 ${18 + i * 12} 190 ${12 + i * 12}S280 ${8 + i * 12} 320 ${14 + i * 12}`}
            stroke="var(--burgundy)"
            strokeWidth="1"
            opacity="0.18"
          />
        ))}
        <path d="M0 70H320" stroke="var(--cream-deeper)" />
      </svg>
    );
  }

  if (fabricId === "flannel") {
    return (
      <svg className="h-16 w-full" viewBox="0 0 320 72" aria-hidden="true">
        <rect width="320" height="72" fill="var(--cream)" />
        {Array.from({ length: 26 }).map((_, i) => (
          <circle
            key={`nap-${i}`}
            cx={(i * 37) % 320}
            cy={10 + ((i * 19) % 52)}
            r={2 + (i % 4)}
            fill={i % 3 === 0 ? "var(--burgundy)" : i % 3 === 1 ? "var(--dusty-blue)" : "var(--sage)"}
            opacity="0.18"
          />
        ))}
        <path d="M0 70H320" stroke="var(--cream-deeper)" />
      </svg>
    );
  }

  if (fabricId === "silk" || fabricId === "voile") {
    return (
      <svg className="h-16 w-full" viewBox="0 0 320 72" aria-hidden="true">
        <rect width="320" height="72" fill="var(--paper)" />
        <path
          d="M-20 47C30 20 70 23 118 42S204 60 254 31S336 18 360 34"
          fill="none"
          stroke={fabricId === "silk" ? "var(--burgundy)" : "var(--dusty-blue)"}
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.13"
        />
        <path
          d="M-10 30C38 49 83 50 128 30S213 10 260 30S334 49 352 36"
          fill="none"
          stroke="var(--sage)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.32"
        />
        <path d="M0 70H320" stroke="var(--cream-deeper)" />
      </svg>
    );
  }

  if (fabricId === "liberty" || fabricId === "pima") {
    return (
      <svg className="h-16 w-full" viewBox="0 0 320 72" aria-hidden="true">
        <rect width="320" height="72" fill="var(--cream)" />
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={`sprig-${i}`} transform={`translate(${20 + i * 36} ${18 + (i % 2) * 18})`}>
            <path d="M0 18C8 8 12 2 18 0" fill="none" stroke="var(--sage)" strokeWidth="1.5" opacity="0.55" />
            <ellipse cx="4" cy="12" rx="5" ry="2.8" fill="var(--dusty-blue)" opacity="0.2" />
            <ellipse cx="14" cy="5" rx="4.5" ry="2.5" fill="var(--burgundy)" opacity="0.2" />
          </g>
        ))}
        <path d="M0 70H320" stroke="var(--cream-deeper)" />
      </svg>
    );
  }

  return (
    <svg className="h-16 w-full" viewBox="0 0 320 72" aria-hidden="true">
      <rect width="320" height="72" fill="var(--paper)" />
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={`pleat-${i}`}
          d={`M${i * 22 - 8} 0L${i * 22 + 4} 72M${i * 22 + 8} 0L${i * 22 + 20} 72`}
          stroke={i % 2 ? "var(--sage)" : "var(--dusty-blue)"}
          strokeWidth="1.2"
          opacity="0.24"
        />
      ))}
      <path
        d="M0 35C40 25 70 25 110 35S182 45 224 35S286 25 320 34"
        fill="none"
        stroke="var(--burgundy)"
        strokeWidth="2"
        opacity="0.22"
      />
      <path d="M0 70H320" stroke="var(--cream-deeper)" />
    </svg>
  );
}

export default function FabricsPage() {
  return (
    <article className="site-container py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="label-caps mb-3 text-dusty-blue">Materials</p>
        <h1 className="font-serif text-4xl text-ink md:text-5xl">Fabric Guide</h1>
        <p className="mt-4 text-ink-muted leading-relaxed">
          Choose fabric for how it pleats and how it wears — not only how it looks on the bolt.
        </p>
        <p className="mt-3 text-ink-muted leading-relaxed">
          The Read 16 rewards cloth that feeds evenly under all sixteen needles, holds a rounded
          mountain, and still feels soft once the threads are drawn. Start with a small test strip
          whenever fiber, weave, or finish is unfamiliar.
        </p>
      </div>

      <section className="mt-8 rounded border border-border bg-paper/80 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="label-caps mb-2 text-dusty-blue">Pleating quality</p>
            <h2 className="font-serif text-2xl text-ink">How to read the ratings</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pleatingLegend.map((item) => (
              <div key={item.label} className="rounded border border-border bg-cream/60 p-3">
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide uppercase ${item.className}`}
                >
                  {item.label}
                </span>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {fabrics.map((f) => (
          <section
            key={f.id}
            id={f.id}
            className="scroll-mt-24 overflow-hidden rounded border border-border bg-paper/70"
          >
            <FabricStrip fabricId={f.id} />
            <div className="p-5">
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
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 max-w-3xl prose-guide">
        <h2>Grain &amp; bias</h2>
        <p>
          Woven fabric has three directions, and smocking cares about all of them. The{" "}
          <strong className="text-ink">warp</strong> runs the length of the bolt (parallel to the
          selvage) and is the most stable. The <strong className="text-ink">weft</strong> runs
          across it and gives slightly more. The <strong className="text-ink">bias</strong> — 45°
          to both — stretches the most.
        </p>
        <p>
          Pleat <strong className="text-ink">on-grain</strong>: your pleats and gathering rows
          should run parallel to the warp or the weft. A panel cut or fed on the bias stretches
          unevenly under the Read 16 roller, and the finished smocking will pull crooked no matter
          how even your stitching is. Checked fabrics like gingham are a gift here — the grid lets
          you verify grain at a glance before pleating.
        </p>
      </div>
      <GrainDiagram />

      <div className="mt-12 max-w-3xl prose-guide">
        <h2>Prepare before you pleat</h2>
        <p>
          Fabric preparation is not optional for a garment that will be washed. Do it once, at the
          start, and the smocking holds its geometry for the life of the piece.
        </p>
        <ol>
          <li>
            <strong className="text-ink">Prewash and dry</strong> the same way the finished garment
            will be laundered. Raw cotton can shrink 3–8% on the first wash; if you smock first and
            wash later, the pleats crowd and the design distorts.
          </li>
          <li>
            <strong className="text-ink">Straighten the grain</strong> — pull a weft thread and cut
            along the gap, or tug gently on the bias to square a skewed weave before cutting.
          </li>
          <li>
            <strong className="text-ink">Press flat</strong> with no folds or creases through the
            pleating zone; a pressed crease feeds unevenly through the pleater.
          </li>
          <li>
            <strong className="text-ink">Test a strip</strong> whenever the fiber, weave, or finish
            is unfamiliar — pleat it, smock a cable row, and measure the compression before
            committing heirloom yardage.
          </li>
        </ol>
      </div>
      <PrewashDiagram />

      <div className="mt-12 max-w-3xl prose-guide">
        <h2>Why fiber and weave matter</h2>
        <p>
          The pleating ratings above come down to one question: does the cloth hold a{" "}
          <strong className="text-ink">round, defined mountain</strong> after the gathering threads
          are drawn? A crisp, tightly woven cotton like batiste peaks sharply and keeps the ribbed
          light-and-shadow that makes smocking read. Softer, more open weaves round off — still
          workable, but the pattern reads gentler and needs a lighter tension.
        </p>
        <ul>
          <li>
            <strong className="text-ink">Thread count &amp; weave:</strong> higher, tighter weaves
            (batiste, lawn) form crisper mountains; open or loose weaves slump.
          </li>
          <li>
            <strong className="text-ink">Finish:</strong> a little sizing helps a fabric feed and
            peak; heavy permanent-press finishes resist pleating and should be avoided.
          </li>
          <li>
            <strong className="text-ink">Nap &amp; slip:</strong> napped flannel sheds lint into
            the pleater and needs frequent cleaning; slippery silk shifts under the needles and is
            an experienced-hands fabric — tissue-backing it while pleating helps.
          </li>
        </ul>
      </div>
      <FiberBehaviorDiagram />

      <nav className="mt-14 rounded border border-border bg-paper/80 p-5 text-sm text-ink-muted">
        <p className="label-caps mb-2 text-dusty-blue">Next steps</p>
        <p>
          Review{" "}
          <Link href="/pleater/#pleating" className="text-dusty-blue-deep">
            Read 16 pleating setup
          </Link>{" "}
          and the{" "}
          <Link href="/calculator/" className="text-dusty-blue-deep">
            fabric calculator
          </Link>{" "}
          before cutting heirloom yardage, then choose a design from the{" "}
          <Link href="/plates/" className="text-dusty-blue-deep">
            smocking plate library
          </Link>
          .
        </p>
      </nav>
    </article>
  );
}
