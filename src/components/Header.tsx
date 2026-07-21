"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav } from "@/lib/navigation";
import { useTheme } from "./ThemeProvider";
import { clsx } from "clsx";

export function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border/80 bg-paper/90 backdrop-blur-md">
      <div className="site-container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex min-w-0 flex-col no-underline">
          <span className="font-serif text-lg leading-tight text-ink transition group-hover:text-burgundy md:text-xl">
            Sabrina&rsquo;s Guide
          </span>
          <span className="hidden text-[0.65rem] tracking-[0.12em] text-ink-faint uppercase sm:block">
            Smocking &amp; Stitching
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {mainNav.slice(0, 6).map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded px-2.5 py-1.5 text-sm no-underline transition",
                  active
                    ? "bg-cream-deep text-ink"
                    : "text-ink-muted hover:bg-cream-deep/60 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/search/"
            className="ml-1 rounded px-2.5 py-1.5 text-sm text-ink-muted no-underline hover:bg-cream-deep/60 hover:text-ink"
          >
            Search
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="theme-toggle rounded border border-border px-2.5 py-1.5 text-xs text-ink-muted hover:bg-cream-deep"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <button
            type="button"
            className="rounded border border-border px-2.5 py-1.5 text-xs text-ink-muted lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-paper px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded px-3 py-2 text-sm text-ink no-underline hover:bg-cream-deep"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
