"use client";

import { useMemo, useState } from "react";

export function PlateRepeatPlanner() {
  const [pleats, setPleats] = useState(33);
  const [repeat, setRepeat] = useState(8);
  const plan = useMemo(() => {
    const intervals = Math.max(0, pleats - 1);
    const complete = Math.floor(intervals / repeat);
    const remainder = intervals % repeat;
    const markers = Array.from({ length: complete + 1 }, (_, index) => 1 + index * repeat);
    return { complete, remainder, markers };
  }, [pleats, repeat]);

  return <section className="min-w-0 rounded-xl border border-border bg-paper p-5 print:break-inside-avoid">
    <p className="label-caps text-dusty-blue">Try it yourself</p>
    <h2 className="mt-1 font-serif text-3xl text-ink">Repeat-marker planner</h2>
    <p className="mt-2 text-sm leading-6 text-ink-muted">A repeat measured across adjacent pleats shares its last boundary with the next repeat. That means 33 pleats contain 32 stitch intervals.</p>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 no-print">
      <label className="text-sm font-semibold text-ink">Pleats across the panel
        <input className="mt-2 w-full rounded border border-border bg-cream px-3 py-2" type="number" min="3" max="200" value={pleats} onChange={(event) => setPleats(Math.max(3, Number(event.target.value) || 3))}/>
      </label>
      <label className="text-sm font-semibold text-ink">Pleats in one repeat
        <input className="mt-2 w-full rounded border border-border bg-cream px-3 py-2" type="number" min="1" max="32" value={repeat} onChange={(event) => setRepeat(Math.max(1, Number(event.target.value) || 1))}/>
      </label>
    </div>
    <div className="mt-5 rounded-lg bg-cream-deep/40 p-4" aria-live="polite">
      <p className="font-serif text-xl text-ink">{plan.complete} complete repeat{plan.complete === 1 ? "" : "s"}{plan.remainder ? ` + ${plan.remainder} unused interval${plan.remainder === 1 ? "" : "s"}` : ""}</p>
      <p className="mt-2 text-sm text-ink-muted"><strong>Place removable markers on pleats:</strong> {plan.markers.join(", ")}</p>
      <p className="mt-2 text-xs leading-5 text-ink-faint">Stop at the last complete boundary. Do not squeeze an incomplete repeat into the remaining pleats.</p>
    </div>
  </section>;
}
