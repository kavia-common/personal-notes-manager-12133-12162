"use client";

import { getCurrentUser, logout } from "@/lib/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function AuthStatus() {
  /** Displays current auth status with quick sign-out option. */
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    setEmail(u?.email ?? null);
  }, []);

  if (!email) {
    return <Link href="/auth" className="btn btn-primary text-sm">Sign In</Link>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">Hi, {email}</span>
      <button
        className="btn btn-secondary text-sm"
        onClick={() => {
          logout();
          location.reload();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
