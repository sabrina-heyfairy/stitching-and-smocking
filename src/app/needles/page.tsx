import Link from "next/link";
import {
  NeedleComparisonDiagram,
  NeedleDepthDiagram,
} from "@/components/illustrations/MaterialsDiagrams";

export const metadata = {
  title: "Needle Guide",
  description: "Crewel, milliner, chenille, and embroidery needles for hand smocking.",
};

const needles = [
  {
    name: "Milliner (straw)",
    when: "Preferred by many smockers — long shaft, round eye, easy to manipulate between pleats.",
    sizes: "#3–9 common; #7–9 for fine batiste cables",
    pair: "Floche and perle #8–12",
  },
  {
    name: "Crewel (embroidery)",
    when: "Sharp point, elongated eye. Excellent all-rounder for smocking and surface embroidery.",
    sizes: "#5–9; match eye to thread thickness",
    pair: "Stranded cotton and floche",
  },
  {
    name: "Chenille",
    when: "Sharp, larger eye — helpful with perle #5 or multi-strand work. Shorter than milliner.",
    sizes: "#18–24 (larger number = finer)",
    pair: "Heavier perle and silk",
  },
  {
    name: "Embroidery / sharp",
    when: "General hand sewing sharps in a pinch; less ideal eye for thicker embroidery threads.",
    sizes: "#7–10",
    pair: "Utility basting and fine outlines",
  },
];

export default function NeedlesPage() {
  return (
    <article className="pb-16">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <p className="label-caps mb-3 text-dusty-blue">Materials</p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">Needle Guide</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            The needle must pass through the top third of a mountain without chewing the fabric,
            and the eye must spare your thread. When in doubt, go slightly finer for batiste and
            lawn.
          </p>
        </div>
      </header>

      <div className="site-container">
        <NeedleComparisonDiagram />
        <NeedleDepthDiagram />
      </div>

      <div className="site-container max-w-3xl">
        <div className="mt-4 space-y-4">
          {needles.map((n) => (
            <div key={n.name} className="rounded border border-border bg-paper/70 p-5">
              <h2 className="font-serif text-2xl text-ink">{n.name}</h2>
              <p className="mt-2 text-sm text-ink-muted">{n.when}</p>
              <p className="mt-2 text-sm text-ink-faint">Sizes: {n.sizes}</p>
              <p className="mt-1 text-sm text-ink-faint">Pairs well with: {n.pair}</p>
            </div>
          ))}
        </div>

        <div className="prose-guide mt-12">
          <h2>How needle sizing works</h2>
          <p>
            Needle numbers are counter-intuitive: within a type, a{" "}
            <strong className="text-ink">higher number means a finer, shorter needle</strong>. A
            #9 milliner is thinner than a #3. Match the eye to the thread — the eye should carry the
            thread without fraying it, but not punch a hole so large it leaves a visible channel in
            fine batiste.
          </p>
          <p>Two forces are in tension when you choose a size:</p>
          <ul>
            <li>
              <strong className="text-ink">Shaft vs. fabric:</strong> a finer shaft parts a tight
              weave cleanly; too thick a shaft chews the mountain and leaves puncture marks.
            </li>
            <li>
              <strong className="text-ink">Eye vs. thread:</strong> too small an eye shreds floche
              and silk on every pass; too large an eye drags and enlarges the hole.
            </li>
          </ul>

          <h2>Choosing by fabric weight</h2>
          <ul>
            <li>
              <strong className="text-ink">Batiste / lawn (fine):</strong> milliner #8–9 or crewel
              #9, paired with floche or perle #12.
            </li>
            <li>
              <strong className="text-ink">Broadcloth / poplin (medium):</strong> milliner #5–7 or
              crewel #7, with perle #8 or 2–3 strands.
            </li>
            <li>
              <strong className="text-ink">Linen / heavier (bold):</strong> chenille #22–24 for
              perle #5 — the larger eye spares the heavier thread.
            </li>
          </ul>

          <h2>Care &amp; longevity</h2>
          <p>
            A smooth needle is half of good tension. Nickel-plated needles dull and pit over time;
            platinum or gold-plated eyes stay slick longer and are worth it for silk work. Draw a
            suspect needle through a scrap — if it catches or squeaks, retire it. Burrs from
            striking a pin are invisible but will fray thread on every stitch.
          </p>

          <h2>Practice tip</h2>
          <p>
            Keep a dedicated “smocking needle” in a felt book labeled with the thread it pairs with.
            Burrs from fabric pins ruin fine thread — retire damaged needles early.
          </p>
          <p className="text-sm text-ink-faint">
            See also <Link href="/threads/">Thread Guide</Link> ·{" "}
            <Link href="/stitches/cable-stitch/#tension">Cable tension</Link>
          </p>
        </div>
      </div>
    </article>
  );
}
