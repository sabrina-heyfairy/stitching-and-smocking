import Link from "next/link";

export function Footer() {
  return (
    <footer className="no-print mt-24 border-t border-border bg-cream-deep/40">
      <div className="site-container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-ink">Sabrina&rsquo;s Guide</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
            The complete visual encyclopedia for the vintage Read 16-needle smocking
            pleater and hand smocking.
          </p>
        </div>
        <div>
          <p className="label-caps mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/learn/" className="text-ink-muted no-underline hover:text-ink">
                Practice Path
              </Link>
            </li>
            <li>
              <Link href="/stitches/" className="text-ink-muted no-underline hover:text-ink">
                Stitch encyclopedia
              </Link>
            </li>
            <li>
              <Link href="/plates/" className="text-ink-muted no-underline hover:text-ink">
                Plate library
              </Link>
            </li>
            <li>
              <Link href="/pleater/" className="text-ink-muted no-underline hover:text-ink">
                Read 16 pleater
              </Link>
            </li>
            <li>
              <Link href="/stitches/cable-stitch/" className="text-ink-muted no-underline hover:text-ink">
                Cable stitch (complete chapter)
              </Link>
            </li>
            <li>
              <Link href="/search/" className="text-ink-muted no-underline hover:text-ink">
                Search
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-caps mb-3">Standards</p>
          <p className="text-sm leading-relaxed text-ink-muted">
            Facts are verified against vintage Read manuals, historical smocking
            references, and recognized embroidery sources. Uncertainty is marked
            rather than guessed.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-ink-faint">
        Built as an interactive ebook &amp; reference website · Print-friendly pages
      </div>
    </footer>
  );
}
