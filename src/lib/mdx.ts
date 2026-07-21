/**
 * MDX content helpers for chapter prose.
 * Interactive illustrations stay as React components; long-form verified prose
 * can live under /content as .mdx and be composed into pages.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export function getMdxSlugs(subdir: string): string[] {
  const dir = path.join(contentRoot, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function readMdxFile(subdir: string, slug: string): {
  frontmatter: Record<string, unknown>;
  content: string;
} | null {
  const file = path.join(contentRoot, subdir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}
