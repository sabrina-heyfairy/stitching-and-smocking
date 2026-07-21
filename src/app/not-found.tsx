import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-container py-24 text-center">
      <p className="label-caps mb-3">404</p>
      <h1 className="font-serif text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-ink-muted">
        That chapter may not exist yet — try the{" "}
        <Link href="/stitches/" className="text-dusty-blue-deep">
          stitch index
        </Link>{" "}
        or{" "}
        <Link href="/search/" className="text-dusty-blue-deep">
          search
        </Link>
        .
      </p>
    </div>
  );
}
