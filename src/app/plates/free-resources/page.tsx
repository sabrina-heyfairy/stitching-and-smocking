import Link from "next/link";
import { externalSmockingResources, roundupLinks } from "@/lib/external-smocking-resources";

const categories = ["Christmas", "Babies", "Girls", "Boys"] as const;

const statusStyle = {
  "Live chart": "border-sage/40 bg-sage/10 text-sage",
  Newsletter: "border-gold/40 bg-gold/10 text-ink-muted",
  "Reference only": "border-dusty-blue/40 bg-dusty-blue/10 text-dusty-blue-deep",
  Unavailable: "border-border bg-cream-deep text-ink-faint",
};

export default function FreeSmockingResourcesPage() {
  return (
    <main className="site-container py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">External pattern directory</p>
      <h1 className="font-serif text-4xl text-ink md:text-5xl">Free Picture-Smocking Resources</h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">
        This directory covers every design named in the four Pink Hollybush roundups requested for
        the library. Exact charts remain on their designers’ sites so attribution, instructions,
        updates, and usage terms stay with the original publisher.
      </p>
      <div className="mt-6 rounded border border-gold/35 bg-gold/10 p-4 text-sm leading-relaxed text-ink-muted">
        <strong className="text-ink">“Free” describes access, not copyright.</strong>{" "}
        No source reviewed grants permission to mirror or bundle its chart files. Entries marked
        reference-only or unavailable are included for completeness and are not reconstructed from
        photographs.
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {roundupLinks.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="rounded border border-border bg-paper px-3 py-2 text-sm text-dusty-blue-deep no-underline hover:bg-cream-deep">
            {link.label} ↗
          </a>
        ))}
        <Link href="/plates/" className="rounded border border-border px-3 py-2 text-sm text-ink no-underline hover:bg-cream-deep">
          Original plate library
        </Link>
      </div>

      {categories.map((category) => {
        const entries = externalSmockingResources.filter((resource) => resource.category === category);
        return (
          <section key={category} className="mt-12">
            <h2 className="font-serif text-3xl text-ink">{category}</h2>
            <p className="mt-1 text-sm text-ink-faint">{entries.length} resources</p>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {entries.map((resource) => (
                <li key={`${category}-${resource.title}`} className="rounded border border-border bg-paper/70 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded border px-2 py-0.5 text-xs ${statusStyle[resource.status]}`}>
                      {resource.status}
                    </span>
                    <span className="text-xs text-ink-faint">{resource.designer}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-ink">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{resource.note}</p>
                  <a href={resource.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm text-dusty-blue-deep">
                    Open original source ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
