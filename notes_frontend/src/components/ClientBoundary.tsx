"use client";

import type { ReactNode } from "react";

// PUBLIC_INTERFACE
export default function ClientBoundary({ children }: { children: ReactNode }) {
  /** Renders its children on the client only. Useful for client-only UI in server layouts. */
  return <>{children}</>;
}
