import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-3xl text-center py-16">
        <h1 className="text-4xl font-semibold text-[var(--color-secondary)]">
          Personal Notes Manager
        </h1>
        <p className="mt-4 text-gray-600">
          Create, edit, and manage your notes with a fast and minimalist interface.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/notes" className="btn btn-primary">Go to Notes</Link>
          <Link href="/auth" className="btn btn-secondary">Sign In</Link>
        </div>
      </div>
    </section>
  );
}
