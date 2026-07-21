import Link from "next/link";
import {
  AssemblyOrderDiagram,
  BishopConstructionDiagram,
  BonnetDiagram,
  SleeveBandDiagram,
  YokeInsertDiagram,
} from "@/components/illustrations/GarmentDiagrams";

export const metadata = {
  title: "Garment Construction",
  description:
    "How English smocking fits into bishop dresses, yokes, bonnets, sleeves, rompers, and more — with visual assembly guides.",
};

export default function GarmentsPage() {
  return (
    <article className="pb-16">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <p className="label-caps mb-3 text-dusty-blue">Construction</p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl lg:text-6xl">
            Garment Construction
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            Smocking is structural — worked on a panel that becomes part of the garment. Plan seam
            allowances and neckline finishes <em>before</em> you pleat.
          </p>
        </div>
      </header>

      <div className="site-container max-w-3xl prose-guide py-12">
        <section id="order" className="scroll-mt-24">
          <h2>Assembly order</h2>
          <p>
            Complete smocking and embroidery on the panel first, then sew major seams. Never force
            a finished sleeve or assembled bodice through a pleater.
          </p>
        </section>
      </div>

      <div className="site-container">
        <AssemblyOrderDiagram />
      </div>

      <div className="site-container max-w-3xl prose-guide">
        <section id="bishop" className="scroll-mt-24">
          <h2>Bishop dresses</h2>
          <p>
            Smocking at the neckline/chest replaces a separate yoke. Pleat a wide rectangle (often
            3–4× the finished neck width), work your{" "}
            <Link href="/plates/">plate</Link>, then set the compressed upper edge into the neck
            binding. Sleeves may include their own smocked bands.
          </p>
          <ul>
            <li>Sample compression with your chosen plate before cutting the dress length.</li>
            <li>Center the plate on the center front pleat.</li>
            <li>
              Embroider sprays on the flat fabric above the smocking when the pattern allows —
              see <Link href="/embroidery/motifs/">motifs</Link>.
            </li>
            <li>
              Starter plate:{" "}
              <Link href="/plates/baby-bishop-starter/">Baby Bishop Starter</Link> or{" "}
              <Link href="/plates/wave-between-cables/">Wave Between Cables</Link>.
            </li>
          </ul>
        </section>
      </div>

      <div className="site-container">
        <BishopConstructionDiagram />
      </div>

      <div className="site-container max-w-3xl prose-guide">
        <section id="yokes" className="scroll-mt-24">
          <h2>Yokes</h2>
          <p>
            A smocked insert set into a bodice yoke opening. Cable borders often frame a wave,
            trellis, or honeycomb field. Match the <em>compressed</em> pleat width to the opening —
            not the pre-smocked width.
          </p>
          <ul>
            <li>Leave seam allowance beyond the smocked field on all sides.</li>
            <li>
              Honeycomb centers give comfort stretch —{" "}
              <Link href="/plates/honeycomb-yoke/">Honeycomb Yoke</Link> plate.
            </li>
            <li>Stabilize raw edges of the insert before setting if the fabric frays.</li>
          </ul>
        </section>
      </div>

      <div className="site-container">
        <YokeInsertDiagram />
      </div>

      <div className="site-container max-w-3xl prose-guide">
        <section id="sleeves" className="scroll-mt-24">
          <h2>Sleeves &amp; cuffs</h2>
          <p>
            Short smocked bands control fullness into the armseye or cuff. Pleat only the band
            depth you need; leave plain fabric for seams.
          </p>
          <ul>
            <li>Keep bands shallow (3–5 gathering rows) so the sleeve still hangs softly.</li>
            <li>Cable or outline edges prevent the band from spreading.</li>
            <li>Do not smock through the underarm seam allowance.</li>
          </ul>
        </section>
      </div>

      <div className="site-container">
        <SleeveBandDiagram />
      </div>

      <div className="site-container max-w-3xl prose-guide">
        <section id="bonnets" className="scroll-mt-24">
          <h2>Bonnets</h2>
          <p>
            Horizontal rows across the brim or crown. Tension must stay gentle — over-tight
            smocking fights the head curve and makes the bonnet cup oddly.
          </p>
          <ul>
            <li>Baby waves and soft cables suit newborn bonnets.</li>
            <li>Work the smocked strip flat, then shape and bind.</li>
            <li>Tie or elastic finishes belong outside the smocked field.</li>
          </ul>
        </section>
      </div>

      <div className="site-container">
        <BonnetDiagram />
      </div>

      <div className="site-container max-w-3xl prose-guide">
        <section id="rompers" className="scroll-mt-24">
          <h2>Jon jons, rompers &amp; bubbles</h2>
          <p>
            Chest panels and pant straps take more stress than a dress yoke. Prefer durable
            structural stitches (cable, outline) at edges; save open honeycomb for areas that need
            give without load.
          </p>
          <ul>
            <li>Reinforce strap joins with bar tacks or small back-stitch triangles.</li>
            <li>Avoid fragile bullion clusters on high-wear strap faces.</li>
          </ul>
        </section>

        <section id="gowns" className="scroll-mt-24">
          <h2>Nightgowns &amp; day gowns</h2>
          <p>
            Neckline smocking for softness and a little stretch. Batiste and voile dominate.
            Shallower plates (3–4 rows) keep the neckline comfortable for sleep.
          </p>
        </section>

        <section id="decor" className="scroll-mt-24">
          <h2>Aprons &amp; home decor</h2>
          <p>
            Pillow inserts, towel bands, and lampshade strips are ideal practice grounds for new{" "}
            <Link href="/plates/">plates</Link> before committing heirloom yardage.
          </p>
        </section>

        <section id="checklist" className="scroll-mt-24">
          <h2>Pre-pleat checklist</h2>
          <ol>
            <li>Grain straight; leading edge squared.</li>
            <li>Finished neck/yoke width known; compression sampled.</li>
            <li>Plate chosen and centered on paper first.</li>
            <li>Seam allowances marked outside the smocking depth.</li>
            <li>Embroidery zones planned on flat fabric (not across active pleats).</li>
          </ol>
        </section>

        <div className="callout mt-10">
          <p className="text-sm">
            Pair this chapter with the{" "}
            <Link href="/pleater/">Read 16 pleater</Link> guide for fabric feed, the{" "}
            <Link href="/calculator/">fabric calculator</Link> for how much length to pleat for your
            size, and the <Link href="/stitches/">stitch encyclopedia</Link> for the stitches named
            in your plate.
          </p>
        </div>
      </div>
    </article>
  );
}
