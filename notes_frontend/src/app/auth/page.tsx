"use client";

import { useState } from "react";
import { login, logout, getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

// PUBLIC_INTERFACE
export default function AuthPage() {
  /** Auth page providing a minimal demo sign-in/out flow. */
  const router = useRouter();
  const existing = getCurrentUser();

  const [email, setEmail] = useState(existing?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/notes");
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Failed to sign in";
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => {
    logout();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-[var(--color-secondary)]">Sign In</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Demo authentication stored locally for this exercise.
        </p>

        {existing && (
          <div className="mt-4 p-3 border border-[var(--color-border)] rounded-md bg-[var(--color-subtle)]">
            <div className="text-sm text-gray-700">Signed in as {existing.email}</div>
            <button className="btn btn-secondary mt-3" onClick={handleLogout}>Sign out</button>
          </div>
        )}

        {!existing && (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {error && <div className="text-sm text-red-600">{error}</div>}
            <div>
              <label className="block text-sm mb-1 text-gray-700">Email</label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Password</label>
              <input
                className="input"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center justify-end">
              <button className="btn btn-primary" disabled={busy} type="submit">
                {busy ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
