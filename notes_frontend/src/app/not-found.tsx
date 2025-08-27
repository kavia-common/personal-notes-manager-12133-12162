import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl text-center py-24">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-subtle)] text-gray-700">
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
        <span className="text-sm font-medium">404</span>
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-[var(--color-secondary)]">Page not found</h1>
      <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist or has been moved.</p>
      <Link href="/" className="btn btn-primary mt-6">Back to Home</Link>
    </div>
  );
}
