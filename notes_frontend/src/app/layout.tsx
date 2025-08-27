import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import ClientBoundary from "@/components/ClientBoundary";
import AuthStatus from "@/components/AuthStatus";

export const metadata: Metadata = {
  title: "Personal Notes Manager",
  description: "Create, edit, search and manage your personal notes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <header className="w-full border-b border-[var(--color-border)] bg-white sticky top-0 z-40">
          <div className="container px-4 py-3 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-[var(--color-secondary)]">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
              <span>Notes</span>
            </Link>
            <nav className="flex items-center gap-2">
              <Link href="/" className="btn btn-secondary text-sm">Home</Link>
              <Link href="/notes" className="btn btn-secondary text-sm">My Notes</Link>
              <ClientBoundary>
                <AuthStatus />
              </ClientBoundary>
            </nav>
          </div>
        </header>
        <main className="container px-4 py-6">
          {children}
        </main>
        <footer className="container px-4 py-10 text-sm text-gray-500">
          <div className="border-t border-[var(--color-border)] pt-6">
            Built with Next.js • Modern, minimal, light theme
          </div>
        </footer>
      </body>
    </html>
  );
}
