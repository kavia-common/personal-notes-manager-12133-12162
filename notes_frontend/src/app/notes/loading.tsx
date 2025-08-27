export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6">
      <aside className="card p-4 h-fit">
        <div className="h-8 w-28 bg-[var(--color-subtle)] rounded-md animate-pulse" />
        <div className="mt-3 h-10 bg-[var(--color-subtle)] rounded-md animate-pulse" />
        <div className="mt-3 flex gap-2">
          <div className="h-7 w-14 bg-[var(--color-subtle)] rounded-md animate-pulse" />
          <div className="h-7 w-16 bg-[var(--color-subtle)] rounded-md animate-pulse" />
          <div className="h-7 w-12 bg-[var(--color-subtle)] rounded-md animate-pulse" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-12 bg-[var(--color-subtle)] rounded-md animate-pulse" />
          <div className="h-12 bg-[var(--color-subtle)] rounded-md animate-pulse" />
          <div className="h-12 bg-[var(--color-subtle)] rounded-md animate-pulse" />
        </div>
      </aside>
      <section className="card p-6">
        <div className="h-10 w-1/2 bg-[var(--color-subtle)] rounded-md animate-pulse" />
        <div className="mt-4 h-8 w-1/3 bg-[var(--color-subtle)] rounded-md animate-pulse" />
        <div className="mt-4 h-64 bg-[var(--color-subtle)] rounded-md animate-pulse" />
      </section>
    </div>
  );
}
