import Link from "next/link";
import { PleaterExplodedDiagram, ThreadingPathDiagram } from "@/components/illustrations/PleaterDiagram";
import { pleaterNav } from "@/lib/navigation";

export const metadata = {
  title: "Read 16-Needle Pleater",
  description:
    "Complete encyclopedia for the vintage Read 16-needle smocking pleater: history, parts, threading, pleating, troubleshooting, and maintenance.",
};

export default function PleaterPage() {
  return (
    <article className="pb-20">
      <header className="border-b border-border bg-paper/40">
        <div className="site-container py-12 md:py-16">
          <p className="label-caps mb-3 text-dusty-blue">Machine encyclopedia</p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl lg:text-6xl">
            Read 16-Needle Pleater
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            History, anatomy, threading, fabric prep, troubleshooting, lubrication, and
            replacement parts — written for someone who has never used a pleater before.
          </p>
          <nav className="no-print mt-8 flex flex-wrap gap-2" aria-label="Pleater sections">
            {pleaterNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded border border-border bg-paper px-3 py-1.5 text-sm text-ink-muted no-underline hover:bg-cream-deep hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="site-container max-w-3xl prose-guide py-12">
        <section id="overview" className="scroll-mt-24">
          <h2>Overview</h2>
          <p>
            A smocking pleater gathers fabric into uniform, parallel pleats and simultaneously
            runs gathering threads through those pleats. The vintage{" "}
            <strong className="text-ink">Read 16-needle pleater</strong> does this with sixteen
            fixed needles, rollers that feed the fabric, and hooks that carry gathering thread
            through each needle eye.
          </p>
          <p>
            Once pleated, the fabric is ready for English smocking stitches — cable, wave,
            honeycomb, and the rest — worked by hand across the mountains of the pleats.
          </p>
          <div className="callout">
            <p className="text-sm">
              <strong className="text-ink">Safety:</strong> Needles are sharp and closely spaced.
              Work slowly when loading fabric. Unplug nothing (these are hand-cranked) but keep
              fingers clear of the needle line while cranking.
            </p>
          </div>
        </section>

        <section id="history" className="scroll-mt-24">
          <h2>History &amp; models</h2>
          <p>
            Read pleaters were produced in the mid-to-late twentieth century for home and cottage
            heirloom sewing. The 16-needle model became a favorite for children&rsquo;s clothing
            because the needle count and spacing suit bishop yokes and bonnet widths without
            excessive bulk.
          </p>
          <p>
            Exact production dates, serial systems, and casting variations differ by year. Some
            machines were sold under distributor names; needle bars and spool racks were updated
            over time. When identifying your machine:
          </p>
          <ul>
            <li>Count the needles (this guide assumes 16).</li>
            <li>Note whether the spool rack is integral or attached.</li>
            <li>Photograph any stamped model/patent marks on the chassis.</li>
            <li>Compare roller style (smooth vs. lightly textured) to known Read photos.</li>
          </ul>
          <div className="callout-warn callout">
            <p className="text-sm">
              <strong className="text-ink">Uncertainty:</strong> We do not invent model years or
              patent claims. If your casting differs from the diagrams, trust the functional
              path (spool → guide → hook → needle) and your machine&rsquo;s physical layout.
            </p>
          </div>
        </section>

        <section id="parts" className="scroll-mt-24">
          <h2>Parts diagram</h2>
          <p>
            Click numbered callouts or the parts list to highlight each system. This is an
            exploded teaching diagram — not a scale engineering drawing.
          </p>
        </section>
      </div>

      <div className="site-container">
        <PleaterExplodedDiagram />
      </div>

      <div className="site-container max-w-3xl prose-guide">
        <section id="threading" className="scroll-mt-24">
          <h2>Threading guide</h2>
          <p>
            Each of the sixteen needles needs its own gathering thread. Traditional gathering
            thread is a smooth, strong cotton or polyester that will be removed after smocking
            (or left in and hidden, depending on the project).
          </p>
          <ol>
            <li>
              <strong className="text-ink">Mount spools</strong> on the rack so each can unwind
              freely without crossing neighbors.
            </li>
            <li>
              <strong className="text-ink">Lead each thread</strong> through its guide (every
              hole / eyelet in sequence — do not skip).
            </li>
            <li>
              <strong className="text-ink">Engage the hook</strong> so it can carry the thread
              through the corresponding needle eye.
            </li>
            <li>
              <strong className="text-ink">Verify the eye</strong> — thread must pass cleanly
              through the needle eye before fabric is loaded.
            </li>
            <li>
              <strong className="text-ink">Check tension</strong> — threads should be even; one
              tight spool will drag fabric off-grain.
            </li>
          </ol>
        </section>
      </div>

      <div className="site-container">
        <ThreadingPathDiagram />
      </div>

      <div className="site-container max-w-3xl prose-guide">
        <section id="pleating" className="scroll-mt-24">
          <h2>Pleating fabric</h2>
          <h3>Best fabrics</h3>
          <ul>
            <li>Cotton batiste and cotton lawn — clean pleats, heirloom standard</li>
            <li>Lightweight linen and linen blends — crisp, with more finger-pressing needed</li>
            <li>Voile — soft hand; support carefully so it doesn&rsquo;t collapse off needles</li>
            <li>Fine gingham — pattern helps visual grain checks</li>
            <li>Liberty-weight cottons — beautiful but watch for bias stretch</li>
          </ul>
          <h3>Difficult or poor candidates</h3>
          <ul>
            <li>Heavy denim, canvas, or coating weights — needle stress and poor pleat memory</li>
            <li>Loose gauze / cheesecloth — tears and uneven gathers</li>
            <li>Thick fleece or knits — needles skip; fabric recovers unpredictably</li>
            <li>Very stiff organza — can shatter or bend needles if forced</li>
          </ul>
          <h3>Grainline &amp; preparation</h3>
          <ol>
            <li>Identify the lengthwise grain. Pleat with the grain unless a pattern specifies bias (rare for classic English smocking panels).</li>
            <li>Press fabric smooth. Remove sizing if it feels stiff or sticky.</li>
            <li>Trim a clean leading edge, square to the grain.</li>
            <li>Optional: stay-stitch or pink the leading edge to reduce fray in the rollers.</li>
            <li>Mark the smocking depth (how far into the fabric the needles will travel) per your pattern.</li>
          </ol>
          <h3>Loading &amp; cranking</h3>
          <ol>
            <li>Raise or position rollers per your model so the leading edge can meet the needles squarely.</li>
            <li>Feed the edge evenly — left and right must enter together.</li>
            <li>Crank slowly. Watch that all sixteen needles pierce; stop immediately if fabric bunches.</li>
            <li>Continue until the required depth is pleated. Leave long thread tails.</li>
            <li>Ease the pleated piece off the needles carefully without twisting the block of pleats.</li>
          </ol>
        </section>

        <section id="troubleshooting" className="scroll-mt-24">
          <h2>Pleating troubleshooting</h2>
          <div className="not-prose space-y-3">
            {[
              {
                issue: "Twisted pleats",
                cause: "Fabric entered off-square, or one side advanced faster.",
                fix: "Remove, repress, square the edge, and reload with even hand pressure on both sides of the leading edge.",
              },
              {
                issue: "Skipped needles",
                cause: "Bent needle, clogged eye, missing thread, or fabric too thick locally (seam/selvage).",
                fix: "Inspect each needle point and eye. Replace bent needles. Avoid feeding seams into the needle line.",
              },
              {
                issue: "Broken or bent needles",
                cause: "Forcing thick fabric, hitting a pin, or misaligned rollers.",
                fix: "Stop. Replace the needle with the correct Read-compatible size. Check roller pressure screws before retrying.",
              },
              {
                issue: "Gathering thread breaking",
                cause: "Rough guides, over-tensioned spool, or weak thread.",
                fix: "Polish/clean guides, loosen spool tension, switch to stronger gathering thread.",
              },
              {
                issue: "Fabric bunching at rollers",
                cause: "Uneven roller pressure or feeding too fast.",
                fix: "Adjust pressure screws equally; crank slower; support the fabric’s weight behind the feed.",
              },
              {
                issue: "Fabric pulling off needles",
                cause: "Insufficient roller engagement or very slippery fabric.",
                fix: "Increase roller contact slightly; use tissue or stabilizer under ultra-slick fabrics (test first).",
              },
              {
                issue: "Needle alignment looks uneven",
                cause: "Bar shifted, or individual needle not seated.",
                fix: "Power is hand-driven — still treat alignment seriously. Reseat needles; do not smock on a skewed set.",
              },
            ].map((row) => (
              <div key={row.issue} className="rounded border border-border bg-paper/70 p-4">
                <p className="font-medium text-ink">{row.issue}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  <span className="text-ink-faint">Cause:</span> {row.cause}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  <span className="text-ink-faint">Fix:</span> {row.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="maintenance" className="scroll-mt-24">
          <h2>Maintenance</h2>
          <h3>Cleaning schedule</h3>
          <ul>
            <li>
              <strong className="text-ink">After every session:</strong> Brush lint from needles,
              hooks, and rollers. Wipe with a dry cloth.
            </li>
            <li>
              <strong className="text-ink">Monthly (active use):</strong> Check needle straightness;
              clean thread guides; inspect crank smoothness.
            </li>
            <li>
              <strong className="text-ink">Seasonally:</strong> Light lubrication at manufacturer
              oil points only — never flood the needle bar with oil that could stain fabric.
            </li>
          </ul>
          <h3>Oil locations</h3>
          <p>
            Typical oil points on Read-style machines include the crank shaft bearings, roller
            ends, and any metal-on-metal pivot marked by the original manual. Use a high-quality
            sewing-machine oil sparingly. Keep oil away from needle tips and fabric path.
          </p>
          <h3>Storage</h3>
          <ul>
            <li>Cover to exclude dust.</li>
            <li>Store in a dry room — humidity corrodes needles and pits rollers.</li>
            <li>Leave needles installed if protected; otherwise store labeled in a needle case.</li>
            <li>Do not stack heavy objects on the spool rack.</li>
          </ul>
          <h3>Disassembly &amp; reassembly</h3>
          <p>
            Only disassemble as far as needed for cleaning or needle replacement. Photograph each
            stage. Bag screws by location. Reassemble in reverse order and test-crank with scrap
            batiste before committing project fabric.
          </p>
        </section>

        <section id="parts-list" className="scroll-mt-24">
          <h2>Replacement parts</h2>
          <ul>
            <li>Pleater needles (match length, diameter, and eye to your bar)</li>
            <li>Hooks / thread carriers</li>
            <li>Rollers (if cracked or worn smooth beyond grip)</li>
            <li>Adjustment screws and springs</li>
            <li>Spool pins</li>
            <li>Crank handle knobs</li>
          </ul>
          <p>
            Source parts from specialty heirloom sewing suppliers and vintage-machine communities.
            Bring measurements (needle length, shank style, bar spacing) — “Read 16 needle” alone
            is not always enough.
          </p>
        </section>

        <section className="mt-16">
          <h2>Next steps</h2>
          <p>Once you can pleat a clean strip of batiste:</p>
          <ol>
            <li>
              Use the <Link href="/calculator/">fabric calculator</Link> to size length for your
              finished width before you cut a garment.
            </li>
            <li>
              <Link href="/stitches/cable-stitch/">Learn the Cable Stitch</Link> on your sample.
            </li>
            <li>
              Read <Link href="/theory/">Smocking Theory</Link> to understand compression and tension.
            </li>
            <li>
              Choose fabric and thread from the{" "}
              <Link href="/fabrics/">Fabric</Link> and <Link href="/threads/">Thread</Link> guides.
            </li>
          </ol>
        </section>
      </div>
    </article>
  );
}
