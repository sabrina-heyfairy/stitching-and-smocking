import Link from "next/link";
import { PlateRepeatPlanner } from "@/components/PlateRepeatPlanner";

export const metadata = {
  title: "How to Read a Smocking Plate — Absolute Beginner Guide",
  description: "A step-by-step beginner guide to rows, pleats, repeats, tracking, thread changes, mistakes, and finishing a smocking plate.",
};

const terms = [
  ["Pleat", "One raised fabric fold. Count the raised mountains, not the valleys between them."],
  ["Gathering row", "A horizontal guide thread left by the pleater. Row 1 is normally the top row."],
  ["Stitch interval", "The space traveled from one pleat to the next. Thirty-three pleats contain thirty-two intervals."],
  ["Repeat", "The smallest block that begins again. Its ending boundary is often the next repeat’s starting boundary."],
  ["Course", "One continuous stitched path across the fabric. Finish a course before starting the next one unless the plate says otherwise."],
  ["Front / wrong side", "Solid paths are usually visible on the front; dashed travel is hidden inside a pleat or worked on the wrong side."],
] as const;

const trackingMethods = [
  ["Pleat markers", "Place removable thread tails or fine pins at every repeat boundary before stitching."],
  ["Paper window", "Cover the unworked part of the graph with two sticky notes so only the current course and repeat show."],
  ["Tick marks", "Make one pencil tick after each completed repeat—not after every stitch."],
  ["Course card", "Write: course number, direction, current repeat, last verified pleat. Leave it with the work."],
  ["Color parking", "For picture smocking, wind each color on a separate card labeled with its next chart row."],
] as const;

export default function ReadSmockingPlatesPage() {
  return <article className="pb-20">
    <header className="border-b border-border bg-paper/50">
      <div className="site-container py-12 md:py-16">
        <nav className="mb-5 text-sm text-ink-faint no-print"><Link href="/learn/">Practice Path</Link> <span className="mx-2">/</span> Reading plates</nav>
        <p className="label-caps text-dusty-blue">Absolute beginner guide</p>
        <h1 className="mt-2 max-w-4xl font-serif text-4xl leading-tight text-ink md:text-6xl">How to read a smocking plate when you have never read one before</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-muted">Start here before your first stitch. You will learn what every line means, how to count pleats and repeats, how to know exactly where you are, and how to stop and restart without losing the pattern.</p>
        <div className="mt-7 flex flex-wrap gap-3 no-print"><a className="rounded bg-burgundy px-4 py-3 text-sm font-semibold text-white no-underline" href="#quick-start">Start the walkthrough</a><span className="rounded border border-border bg-paper px-4 py-3 text-sm">Use your browser’s Print command for the checklist</span></div>
      </div>
    </header>

    <div className="site-container grid min-w-0 max-w-4xl gap-10 py-12 [&>*]:min-w-0">
      <section className="callout">
        <h2 className="font-serif text-2xl text-ink">The one rule that prevents most mistakes</h2>
        <p className="mt-2 leading-7 text-ink-muted"><strong className="text-ink">Do not stitch while searching the graph.</strong> Stop with the needle parked safely, find the current row and pleat on the plate, say the next move aloud, then stitch it.</p>
      </section>

      <section id="quick-start">
        <p className="label-caps text-dusty-blue">1 · Before threading the needle</p>
        <h2 className="mt-1 font-serif text-3xl text-ink">Set up the fabric and the graph</h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {["Identify the top of the garment and mark it.", "Find Row 1 on the graph; it is normally the top gathering row.", "Count and label every fifth pleat along the fabric edge.", "Mark the center pleat or center valley named by the plate.", "Find the repeat width and mark every repeat boundary.", "Choose the first course and confirm its starting side.", "Cut a comfortable thread length—about forearm length, not the whole skein.", "Test three stitches on scrap and check that the pleats still spread."].map((item, index) => <li key={item} className="flex gap-3 rounded-lg border border-border bg-paper p-4 text-sm leading-6 text-ink-muted"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-burgundy-soft font-semibold text-white">{index + 1}</span><span>{item}</span></li>)}
        </ol>
      </section>

      <section>
        <p className="label-caps text-dusty-blue">2 · Plate vocabulary</p>
        <h2 className="mt-1 font-serif text-3xl text-ink">Know what you are counting</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">{terms.map(([term, meaning]) => <div key={term} className="rounded-lg border border-border bg-paper p-4"><dt className="font-serif text-xl text-ink">{term}</dt><dd className="mt-1 text-sm leading-6 text-ink-muted">{meaning}</dd></div>)}</dl>
        <figure className="mt-6 overflow-x-auto rounded-lg border border-border bg-cream p-4"><svg viewBox="0 0 760 220" role="img" aria-label="Eight numbered pleats crossed by four gathering rows and one six-pleat repeat"><rect width="760" height="220" rx="12" fill="#fffaf4"/>{Array.from({length:9},(_,i)=><path key={i} d={`M${85+i*72} 25 Q${103+i*72} 110 ${85+i*72} 195`} fill="none" stroke="#d5b9a5" strokeWidth="14" opacity=".55"/>)}{[1,2,3,4].map((row)=><g key={row}><line x1="64" x2="700" y1={35+row*36} y2={35+row*36} stroke="#7d766f" strokeDasharray="5 5"/><text x="50" y={40+row*36} textAnchor="end" fontSize="13">R{row}</text></g>)}{Array.from({length:8},(_,i)=><text key={i} x={85+i*72} y="213" textAnchor="middle" fontSize="13">P{i+1}</text>)}<rect x="82" y="22" width="432" height="176" rx="8" fill="none" stroke="#7a3f45" strokeWidth="3"/><text x="298" y="17" textAnchor="middle" fontSize="13" fill="#7a3f45">ONE 6-PLEAT REPEAT: P1 → P7 BOUNDARY</text></svg><figcaption className="mt-3 text-sm text-ink-faint">Count pleat mountains left to right. A six-pleat repeat beginning at P1 reaches the shared next boundary at P7.</figcaption></figure>
      </section>

      <PlateRepeatPlanner />

      <section>
        <p className="label-caps text-dusty-blue">3 · Read one movement</p>
        <h2 className="mt-1 font-serif text-3xl text-ink">Translate the graph into a sentence</h2>
        <p className="mt-3 leading-7 text-ink-muted">Before moving the needle, say: <strong className="text-ink">“I am on Row 3, Pleat 5. I travel down one row and right one pleat. My next insertion is Row 4, Pleat 6.”</strong> This separates reading from stitching and catches reversed directions early.</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2"><li className="rounded-lg border border-border p-4"><strong>Horizontal path</strong><p className="mt-1 text-sm text-ink-muted">A level stitch such as cable, outline, or a turn closure.</p></li><li className="rounded-lg border border-border p-4"><strong>Diagonal path</strong><p className="mt-1 text-sm text-ink-muted">Move to another gathering row while advancing to the next pleat.</p></li><li className="rounded-lg border border-border p-4"><strong>Solid line</strong><p className="mt-1 text-sm text-ink-muted">Thread meant to be visible on the front.</p></li><li className="rounded-lg border border-border p-4"><strong>Dashed line</strong><p className="mt-1 text-sm text-ink-muted">Travel inside a pleat or work on the wrong side.</p></li></ul>
      </section>

      <section>
        <p className="label-caps text-dusty-blue">4 · Stitch the first repeat</p>
        <h2 className="mt-1 font-serif text-3xl text-ink">Use the stop–check–continue rhythm</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-7 text-ink-muted"><li>Start at the declared row, pleat, and direction. Leave a secure tail on the wrong side.</li><li>Work slowly to the first repeat marker.</li><li>Stop. Count the actual pleats you used; do not judge only by appearance.</li><li>Compare the ending row, direction, and thread position with the graph.</li><li>Gently spread the fabric. The repeat should open without puckering.</li><li>Only after all five checks pass should you continue into repeat two.</li></ol>
      </section>

      <section>
        <p className="label-caps text-dusty-blue">5 · Never lose your place</p>
        <h2 className="mt-1 font-serif text-3xl text-ink">Pick two tracking methods</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{trackingMethods.map(([title, text]) => <article key={title} className="rounded-lg border border-border bg-paper p-4"><h3 className="font-serif text-xl text-ink">{title}</h3><p className="mt-1 text-sm leading-6 text-ink-muted">{text}</p></article>)}</div>
        <div className="mt-5 rounded-lg bg-gold-soft/20 p-4 text-sm leading-6 text-ink-muted"><strong className="text-ink">When interrupted:</strong> finish the current stitch, park the needle vertically through the last verified pleat, and write “Course __, Repeat __, stopped at R__ / P__, next move ___.” Never rely on memory.</div>
      </section>

      <section>
        <p className="label-caps text-dusty-blue">6 · Starting, changing, and ending thread</p>
        <h2 className="mt-1 font-serif text-3xl text-ink">Make the join invisible and flexible</h2>
        <div className="mt-5 space-y-3">
          <details open className="rounded-lg border border-border bg-paper p-4"><summary className="cursor-pointer font-serif text-xl text-ink">Start a new thread</summary><p className="mt-3 text-sm leading-6 text-ink-muted">On the wrong side, take two or three tiny backstitches through the pleat fold outside the visible design. Leave a short tail. Bring the needle out at the exact charted starting point. Do not knot the front and do not anchor through a gathering thread.</p></details>
          <details className="rounded-lg border border-border bg-paper p-4"><summary className="cursor-pointer font-serif text-xl text-ink">Change thread mid-course</summary><p className="mt-3 text-sm leading-6 text-ink-muted">Stop at a repeat boundary or hidden travel point whenever possible. Finish the old thread on the wrong side with tiny backstitches in the same pleat fold. Start the new thread in that fold and emerge at the next insertion. Match tension by spreading the last old stitch and first new stitch together before securing.</p></details>
          <details className="rounded-lg border border-border bg-paper p-4"><summary className="cursor-pointer font-serif text-xl text-ink">Change color</summary><p className="mt-3 text-sm leading-6 text-ink-muted">End isolated colors instead of carrying long floats behind pale fabric. Label the parked color with its next row and pleat. In picture smocking, complete one color block within the current bottom-up chart row before moving to the next block.</p></details>
          <details className="rounded-lg border border-border bg-paper p-4"><summary className="cursor-pointer font-serif text-xl text-ink">End a course</summary><p className="mt-3 text-sm leading-6 text-ink-muted">Check the final row and pleat first. Turn to the wrong side and take two or three tiny backstitches through a pleat fold without catching the gathering thread. Trim the tail only after the panel spreads correctly.</p></details>
        </div>
      </section>

      <section>
        <p className="label-caps text-dusty-blue">7 · Fix errors early</p>
        <h2 className="mt-1 font-serif text-3xl text-ink">What to do when the count is wrong</h2>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[42rem] border-collapse text-left text-sm"><thead><tr className="border-b-2 border-border"><th className="p-3">What you see</th><th className="p-3">Likely cause</th><th className="p-3">Safest correction</th></tr></thead><tbody className="text-ink-muted"><tr className="border-b border-border"><td className="p-3">Repeat ends one pleat early</td><td className="p-3">Skipped pleat or counted a valley</td><td className="p-3">Unpick to the last verified boundary; never stretch the next repeat.</td></tr><tr className="border-b border-border"><td className="p-3">Wave peak misses its row</td><td className="p-3">Wrong vertical depth or step count</td><td className="p-3">Return to the previous turn and remeasure each diagonal.</td></tr><tr className="border-b border-border"><td className="p-3">Pleats will not spread</td><td className="p-3">Working thread pulled too tightly</td><td className="p-3">Ease stitches one by one with the needle tip before they lock.</td></tr><tr><td className="p-3">Pattern suddenly reverses</td><td className="p-3">Thread switched sides of the needle</td><td className="p-3">Unpick the first reversed stitch and restate the stitch rule aloud.</td></tr></tbody></table></div>
      </section>

      <section className="rounded-xl border-2 border-burgundy/30 bg-paper p-6 print:break-before-page">
        <p className="label-caps text-burgundy">Printable bench checklist</p>
        <h2 className="mt-1 font-serif text-3xl text-ink">Before every stitching session</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">{["Top of garment marked", "Row 1 identified", "Pleats numbered every five", "Center reference marked", "Repeat boundaries marked", "Correct thread and needle", "Course and direction confirmed", "Starting row and pleat confirmed", "First repeat checked", "Last verified position written down", "Tension tested by spreading", "Thread tails secured on wrong side"].map((item)=><li key={item} className="flex gap-3 border-b border-border pb-2 text-sm text-ink"><span aria-hidden="true">□</span>{item}</li>)}</ul>
        <p className="mt-6 text-sm leading-6 text-ink-muted"><strong>My stop note:</strong> Course ______ · Repeat ______ · Last verified R____ / P____ · Next movement ______________________________</p>
      </section>

      <section className="no-print">
        <h2 className="font-serif text-3xl text-ink">Ready for a real plate?</h2>
        <p className="mt-2 text-ink-muted">Begin with one color and a short repeat. Use the interactive sequence only after you can identify the same movement on the full graph.</p>
        <div className="mt-5 flex flex-wrap gap-3"><Link className="rounded border border-border bg-paper px-4 py-3 no-underline" href="/plates/cable-borders/">Cable Borders</Link><Link className="rounded border border-border bg-paper px-4 py-3 no-underline" href="/plates/narrow-trellis-ribbon/">Narrow Trellis Ribbon</Link><Link className="rounded border border-border bg-paper px-4 py-3 no-underline" href="/learn/">Return to Practice Path</Link></div>
      </section>
    </div>
  </article>;
}
