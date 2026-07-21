import Link from "next/link";
import { FabricCalculator } from "@/components/calculator/FabricCalculator";
import { READ16 } from "@/lib/fabric-calculator";

export const metadata = {
  title: "Fabric Calculator",
  description:
    "Calculate how much fabric to pleat on a Read 16-needle pleater for a target finished smocked width.",
};

export default function CalculatorPage() {
  return (
    <article className="pb-20">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <p className="label-caps mb-3 text-dusty-blue">Read 16 tool</p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl lg:text-6xl">
            Fabric Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            Enter the finished smocked width you need — for example a 3T bishop band — and get the
            flat fabric length to feed through your vintage Read {READ16.needleCount}-needle
            pleater, plus strip depth for the number of gathering rows you thread.
          </p>
        </div>
      </header>

      <div className="site-container py-10">
        <FabricCalculator />
      </div>

      <div className="site-container max-w-3xl prose-guide pb-8">
        <h2>What this calculates</h2>
        <p>
          On a Read pleater, <strong className="text-ink">fabric length</strong> through the
          rollers becomes the across-garment width after you pull up the gathers.{" "}
          <strong className="text-ink">Fabric depth</strong> across the needles becomes the
          smocked band depth (one gathering row per threaded needle).
        </p>
        <p>
          Heirloom teaching and vintage Read guidance commonly start at{" "}
          <strong className="text-ink">3:1</strong> — three units of flat fabric for one unit of
          finished smocked width. Fine batiste and voile often want more; heavier linen or some
          knits want less. Patterns assume a ratio; your fabric may not.
        </p>

        <h2>Read 16 specifics</h2>
        <ul>
          <li>Up to {READ16.needleCount} gathering rows (needles).</li>
          <li>
            Default spacing {READ16.defaultNeedleSpacingIn}&quot; (3/16&quot;) tip-to-tip — common
            on classic castings, but <em>measure yours</em> and override in the calculator.
          </li>
          <li>
            Thread only the needles you need for your plate depth; unused needles can stay
            unthreaded.
          </li>
        </ul>

        <h2>Example</h2>
        <p>
          Finished band 13.5&quot; (a typical 3T starting width) × 3:1 lawn ratio = 40.5&quot; of
          fabric in the gathered field. Add a couple of inches of safety, pleat the strip, then
          pull the gathering threads until the piece measures 13.5&quot;. Trim only after the
          density looks right.
        </p>

        <div className="callout">
          <p className="text-sm">
            Uncertainty is labeled on purpose: size presets and needle pitch are starting points.
            Your pattern and your machine win. When in doubt, pleat a little extra — you can remove
            fullness more easily than you can add it.
          </p>
        </div>

        <p className="text-sm text-ink-faint">
          Related: <Link href="/pleater/">Read 16 encyclopedia</Link> ·{" "}
          <Link href="/fabrics/">Fabrics</Link> · <Link href="/design/">Design planning</Link> ·{" "}
          <Link href="/garments/">Garments</Link> · <Link href="/learn/">Practice Path</Link>
        </p>
      </div>
    </article>
  );
}
